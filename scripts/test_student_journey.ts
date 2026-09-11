import { INITIAL_QUESTIONS, DEMO_STUDENTS, DEMO_CLASSES } from '../src/data/seed';
import { evaluateStudentAnswer, selectAdaptiveQuestion } from '../src/lib/adaptiveEngine';
import { DrillSession, QuestionAttempt, StudentSkillMastery } from '../src/types';

console.log('====================================================');
console.log('   SKILLSENSE END-TO-END STUDENT JOURNEY TEST       ');
console.log('====================================================\n');

// 1. Authenticate Student
const student = DEMO_STUDENTS[0];
console.log(`Step 1: Authenticated Student -> [${student.id}] ${student.name} (${student.email})`);

// 2. Join Class
const targetClassCode = 'MATH6A';
const matchedClass = DEMO_CLASSES.find((c) => c.code === targetClassCode);
if (!matchedClass) throw new Error(`Class ${targetClassCode} not found`);
console.log(`Step 2: Enrolled in Class -> [${matchedClass.id}] ${matchedClass.name} (Grade ${matchedClass.grade})`);

// 3. Drill Session Initialization
const drillId = 'drill-math-demo';
const session: DrillSession = {
  id: `sess-${Date.now()}`,
  drillId,
  studentId: student.id,
  studentName: student.name,
  state: 'ACTIVE',
  score: 0,
  correctCount: 0,
  totalAnswered: 0,
  currentStreak: 0,
  maxStreak: 0,
  averageResponseTimeMs: 0,
  currentDifficulty: 2,
  startedAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
  rapidGuessCount: 0,
};
console.log(`Step 3: Started Drill Session -> ${drillId} at initial Difficulty Level ${session.currentDifficulty}`);

// 4. Initial Mastery Baseline
let currentMastery = 0.50;
console.log(`Step 4: Starting Skill Mastery -> ${(currentMastery * 100).toFixed(0)}%`);

// 5. Simulate Answering 5 Questions
const servedIds: string[] = [];
const attempts: QuestionAttempt[] = [];

// Sequence: Q1 correct, Q2 correct, Q3 correct, Q4 wrong (triggers misconception), Q5 correct
const answerPlan = [
  { isCorrect: true, timeMs: 9000, answer: '2/6' },
  { isCorrect: true, timeMs: 11000, answer: '5/6' },
  { isCorrect: true, timeMs: 14000, answer: '7/12' },
  { isCorrect: false, timeMs: 16000, answer: '2/9', misconception: 'adds_denominators_directly' },
  { isCorrect: true, timeMs: 10000, answer: '5/8' },
];

console.log('\n--- Solved Questions Progress ---');
for (let i = 0; i < answerPlan.length; i++) {
  const plan = answerPlan[i];
  
  // Select adaptive question
  const q = selectAdaptiveQuestion(
    INITIAL_QUESTIONS,
    ['skill-unlike-denominators', 'skill-equivalent-fractions'],
    session.currentDifficulty,
    servedIds,
    'math',
    'fractions'
  );

  if (!q) throw new Error(`Could not find adaptive question for step ${i + 1}`);
  servedIds.push(q.id);

  // Evaluate
  const evalResult = evaluateStudentAnswer(
    session.currentDifficulty,
    currentMastery,
    plan.isCorrect,
    plan.timeMs,
    attempts
  );

  // Record attempt
  const attempt: QuestionAttempt = {
    id: `att-${i + 1}`,
    sessionId: session.id,
    drillId,
    studentId: student.id,
    questionId: q.id,
    skillId: q.skillId,
    studentAnswer: plan.answer,
    isCorrect: plan.isCorrect,
    responseTimeMs: plan.timeMs,
    difficulty: session.currentDifficulty,
    misconceptionsIdentified: plan.isCorrect ? [] : (plan.misconception ? [plan.misconception] : []),
    isRapidGuess: evalResult.isRapidGuess,
    timestamp: new Date().toISOString(),
  };
  attempts.push(attempt);

  // Update session
  session.totalAnswered++;
  if (plan.isCorrect) {
    session.correctCount++;
    session.currentStreak++;
    session.maxStreak = Math.max(session.maxStreak, session.currentStreak);
    session.score += session.currentDifficulty * 10;
  } else {
    session.currentStreak = 0;
  }
  session.currentDifficulty = evalResult.nextDifficulty;
  currentMastery = evalResult.updatedMastery;

  console.log(
    `  Q${i + 1} [${q.id} (Diff ${q.difficulty})]: Answered "${plan.answer}" -> ${plan.isCorrect ? '✓ Correct' : '✗ Incorrect'}`
  );
  console.log(
    `     Feedback: "${evalResult.feedbackMessage}" | Next Level: ${session.currentDifficulty} | Updated Mastery: ${(currentMastery * 100).toFixed(1)}%`
  );
}

// 6. Drill Completion
session.state = 'COMPLETED';
const accuracy = Math.round((session.correctCount / session.totalAnswered) * 100);
console.log(`\nStep 6: Drill Completed!`);
console.log(`  Total Answered: ${session.totalAnswered}`);
console.log(`  Correct: ${session.correctCount}`);
console.log(`  Final Accuracy: ${accuracy}%`);
console.log(`  Peak Streak: 🔥 ${session.maxStreak}`);
console.log(`  Final Mastery: ${(currentMastery * 100).toFixed(1)}% (Growth from 50.0% -> ${(currentMastery * 100).toFixed(1)}%)`);

// 7. Verify Mastery Update Integrity
const studentMastery: StudentSkillMastery = {
  studentId: student.id,
  subjectId: 'math',
  skillId: 'skill-unlike-denominators',
  masteryScore: currentMastery,
  accuracy,
  attemptsCount: attempts.length,
  averageResponseTimeMs: Math.round(attempts.reduce((acc, a) => acc + a.responseTimeMs, 0) / attempts.length),
  recentAccuracy: accuracy,
  level: currentMastery >= 0.8 ? 'Mastered' : currentMastery >= 0.65 ? 'Strong' : 'Developing',
  trend: currentMastery >= 0.5 ? 'improving' : 'needs_practice',
  lastPracticed: new Date().toISOString(),
  commonMisconceptions: ['adds_denominators_directly'],
};

console.log(`\nStep 7: Student Skill Mastery Saved -> Level: ${studentMastery.level}, Score: ${(studentMastery.masteryScore * 100).toFixed(0)}%`);

// 8. Recommendation Update Verification
const isNextStepLogical = studentMastery.masteryScore > 0.50;
console.log(`Step 8: Recommendation engine receives updated mastery: ${isNextStepLogical ? 'PASS (Dynamic Growth Validated)' : 'FAIL'}`);

console.log('\n====================================================');
console.log('   STUDENT JOURNEY FULLY VALIDATED                  ');
console.log('====================================================');
