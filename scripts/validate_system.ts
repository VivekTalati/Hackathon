import { INITIAL_QUESTIONS, SUBJECTS } from '../src/data/seed';
import { EXPANDED_QUESTIONS } from '../src/data/expandedQuestions';
import { evaluateStudentAnswer, selectAdaptiveQuestion, validateQuestion } from '../src/lib/adaptiveEngine';
import { Question, QuestionAttempt } from '../src/types';

console.log('====================================================');
console.log('   SKILLSENSE COMPREHENSIVE SYSTEM & QA AUDIT      ');
console.log('====================================================\n');

// 1. QUESTION BANK VALIDATION
console.log('--- 1. QUESTION BANK VALIDATION ---');
const targetBank = EXPANDED_QUESTIONS || INITIAL_QUESTIONS;
const totalQuestions = targetBank.length;
console.log(`Total questions in bank: ${totalQuestions}`);

const allSubjectIds = new Set(SUBJECTS.map((s) => s.id));
const allTopicIds = new Set(SUBJECTS.flatMap((s) => s.topics.map((t) => t.id)));
const allSkillIds = new Set(
  SUBJECTS.flatMap((s) => s.topics.flatMap((t) => t.skills.map((sk) => sk.id)))
);

const seenQuestionIds = new Set<string>();
const duplicateIds: string[] = [];
const invalidQuestions: { id: string; reason: string }[] = [];
const subjectCounts: Record<string, number> = {};

for (const q of targetBank) {
  // Check duplicate IDs
  if (seenQuestionIds.has(q.id)) {
    duplicateIds.push(q.id);
  }
  seenQuestionIds.add(q.id);

  // Subject counts
  subjectCounts[q.subjectId] = (subjectCounts[q.subjectId] || 0) + 1;

  // Validate fields
  if (!validateQuestion(q)) {
    invalidQuestions.push({ id: q.id, reason: 'Failed validateQuestion schema check' });
    continue;
  }

  // Check subject validity
  if (!allSubjectIds.has(q.subjectId)) {
    invalidQuestions.push({ id: q.id, reason: `Unknown subjectId: ${q.subjectId}` });
  }

  // Check topic validity
  if (!allTopicIds.has(q.topicId)) {
    invalidQuestions.push({ id: q.id, reason: `Unknown topicId: ${q.topicId}` });
  }

  // Check skill validity
  if (!allSkillIds.has(q.skillId)) {
    invalidQuestions.push({ id: q.id, reason: `Unknown skillId: ${q.skillId}` });
  }

  // Check difficulty range (1-5)
  if (q.difficulty < 1 || q.difficulty > 5) {
    invalidQuestions.push({ id: q.id, reason: `Difficulty out of range [1-5]: ${q.difficulty}` });
  }

  // Check multiple choice options and answer key
  if (q.type === 'multiple_choice') {
    if (!q.options || q.options.length < 2) {
      invalidQuestions.push({ id: q.id, reason: `Multiple choice has < 2 options` });
    } else {
      const optionIds = new Set(q.options.map((o) => o.id));
      if (!optionIds.has(String(q.correctAnswer))) {
        invalidQuestions.push({
          id: q.id,
          reason: `correctAnswer '${q.correctAnswer}' not found in option IDs [${Array.from(optionIds).join(', ')}]`,
        });
      }
    }
  }

  // Check explanation and hint
  if (!q.explanation || q.explanation.trim().length === 0) {
    invalidQuestions.push({ id: q.id, reason: 'Missing explanation' });
  }
  if (!q.hint || q.hint.trim().length === 0) {
    invalidQuestions.push({ id: q.id, reason: 'Missing hint' });
  }
}

console.log('Subject distribution:', subjectCounts);
console.log(`Duplicate IDs: ${duplicateIds.length === 0 ? 'None (PASS)' : duplicateIds.join(', ')}`);
console.log(`Invalid questions: ${invalidQuestions.length === 0 ? 'None (PASS)' : JSON.stringify(invalidQuestions, null, 2)}`);

// 2. ADAPTIVE ENGINE VALIDATION
console.log('\n--- 2. ADAPTIVE ENGINE PATTERNS ---');

// Pattern A: Strong student (4 correct in a row)
console.log('\n[Pattern A: Strong Student - 4 Correct]');
let curDiff = 2;
let curMastery = 0.5;
let attempts: QuestionAttempt[] = [];

for (let i = 1; i <= 4; i++) {
  const res = evaluateStudentAnswer(curDiff, curMastery, true, 8000, attempts);
  console.log(
    `  Attempt ${i}: StartDiff=${curDiff}, Mastery=${curMastery.toFixed(2)} -> NextDiff=${res.nextDifficulty}, NextMastery=${res.updatedMastery.toFixed(2)}, RapidGuess=${res.isRapidGuess}`
  );
  attempts.push({
    id: `att-${i}`,
    sessionId: 'sess-1',
    drillId: 'drill-1',
    studentId: 'stud-1',
    questionId: `q-${i}`,
    skillId: 'skill-unlike-denominators',
    studentAnswer: 'opt-a',
    isCorrect: true,
    responseTimeMs: 8000,
    difficulty: curDiff,
    isRapidGuess: false,
    timestamp: new Date().toISOString(),
  });
  curDiff = res.nextDifficulty;
  curMastery = res.updatedMastery;
}
const patternAPass = curDiff > 2 && curMastery > 0.65;
console.log(`  Pattern A Result: ${patternAPass ? 'PASS (Difficulty increased smoothly to Level ' + curDiff + ')' : 'FAIL'}`);

// Pattern B: Struggling student (3 wrong in a row)
console.log('\n[Pattern B: Struggling Student - 3 Incorrect]');
curDiff = 3;
curMastery = 0.6;
attempts = [];

for (let i = 1; i <= 3; i++) {
  const res = evaluateStudentAnswer(curDiff, curMastery, false, 14000, attempts);
  console.log(
    `  Attempt ${i}: StartDiff=${curDiff}, Mastery=${curMastery.toFixed(2)} -> NextDiff=${res.nextDifficulty}, NextMastery=${res.updatedMastery.toFixed(2)}, ScaffoldedMsg="${res.feedbackMessage}"`
  );
  attempts.push({
    id: `att-b-${i}`,
    sessionId: 'sess-2',
    drillId: 'drill-1',
    studentId: 'stud-2',
    questionId: `q-${i}`,
    skillId: 'skill-unlike-denominators',
    studentAnswer: 'wrong-opt',
    isCorrect: false,
    responseTimeMs: 14000,
    difficulty: curDiff,
    isRapidGuess: false,
    timestamp: new Date().toISOString(),
  });
  curDiff = res.nextDifficulty;
  curMastery = res.updatedMastery;
}
const patternBPass = curDiff < 3;
console.log(`  Pattern B Result: ${patternBPass ? 'PASS (Scaffolded down to Level ' + curDiff + ')' : 'FAIL'}`);

// Pattern C: Mixed (Correct, Wrong, Correct, Wrong)
console.log('\n[Pattern C: Mixed Accuracy]');
curDiff = 2;
curMastery = 0.5;
attempts = [];
const mixedSequence = [true, false, true, false, true];

for (let i = 0; i < mixedSequence.length; i++) {
  const isCorrect = mixedSequence[i];
  const res = evaluateStudentAnswer(curDiff, curMastery, isCorrect, 12000, attempts);
  console.log(
    `  Attempt ${i + 1} (${isCorrect ? 'Correct' : 'Incorrect'}): Diff=${curDiff} -> NextDiff=${res.nextDifficulty}, Mastery=${res.updatedMastery.toFixed(2)}`
  );
  attempts.push({
    id: `att-c-${i}`,
    sessionId: 'sess-3',
    drillId: 'drill-1',
    studentId: 'stud-3',
    questionId: `q-${i}`,
    skillId: 'skill-unlike-denominators',
    studentAnswer: isCorrect ? 'correct' : 'wrong',
    isCorrect,
    responseTimeMs: 12000,
    difficulty: curDiff,
    isRapidGuess: false,
    timestamp: new Date().toISOString(),
  });
  curDiff = res.nextDifficulty;
  curMastery = res.updatedMastery;
}
const patternCPass = curDiff >= 1 && curDiff <= 3;
console.log(`  Pattern C Result: ${patternCPass ? 'PASS (Difficulty stayed stable)' : 'FAIL'}`);

// Pattern D: Rapid Guessing (< 3.5s)
console.log('\n[Pattern D: Rapid Guessing Detection]');
const rapidRes = evaluateStudentAnswer(3, 0.5, true, 1200, []);
console.log(`  Rapid response (1200ms): isRapidGuess=${rapidRes.isRapidGuess}, recommendReasoning=${rapidRes.recommendReasoningCheck}, Feedback="${rapidRes.feedbackMessage}"`);
const patternDPass = rapidRes.isRapidGuess === true && rapidRes.recommendReasoningCheck === true;
console.log(`  Pattern D Result: ${patternDPass ? 'PASS (Correctly flagged rapid guess and triggered reasoning check)' : 'FAIL'}`);

// 3. ADAPTIVE QUESTION SELECTION & PROGRESSIVE FALLBACK
console.log('\n--- 3. ADAPTIVE SELECTION & PROGRESSIVE FALLBACK ---');
const selectedQ1 = selectAdaptiveQuestion(INITIAL_QUESTIONS, ['skill-unlike-denominators'], 3, []);
console.log(`  Selected Question for target skill & level 3: ${selectedQ1 ? `${selectedQ1.id} (Diff ${selectedQ1.difficulty})` : 'None'}`);

// Exhaust target skill to test fallback
const servedAllTarget = INITIAL_QUESTIONS.filter((q) => q.skillId === 'skill-unlike-denominators').map((q) => q.id);
const fallbackQ = selectAdaptiveQuestion(
  INITIAL_QUESTIONS,
  ['skill-unlike-denominators'],
  3,
  servedAllTarget,
  'math',
  'fractions'
);
console.log(`  Fallback Question when primary skill pool exhausted: ${fallbackQ ? `${fallbackQ.id} (Skill ${fallbackQ.skillId})` : 'None'}`);
const fallbackPass = fallbackQ !== null;
console.log(`  Progressive Fallback Result: ${fallbackPass ? 'PASS (Zero null returns)' : 'FAIL'}`);

console.log('\n====================================================');
console.log('   AUDIT COMPLETE                                   ');
console.log('====================================================');
