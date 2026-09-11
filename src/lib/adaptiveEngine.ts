import { Question, QuestionAttempt, StudentSkillMastery, MasteryLevel } from '@/types';

export interface AdaptiveEvaluationResult {
  nextDifficulty: number; // 1 to 5
  updatedMastery: number; // 0.00 to 1.00
  isRapidGuess: boolean;
  recommendReasoningCheck: boolean;
  feedbackMessage: string;
  consecutiveWrongCount: number;
}

export interface AdaptiveEngineConfig {
  rapidGuessThresholdMs: number; // e.g. 3500ms
  streakBonusThreshold: number; // 3 in a row
  wrongStreakScaffoldThreshold: number; // 2 wrong in a row
}

export const DEFAULT_ADAPTIVE_CONFIG: AdaptiveEngineConfig = {
  rapidGuessThresholdMs: 3500,
  streakBonusThreshold: 3,
  wrongStreakScaffoldThreshold: 2,
};

/**
 * Validates that a question has all required fields to safely render in the drill UI.
 */
export function validateQuestion(q: unknown): q is Question {
  if (!q || typeof q !== 'object') return false;
  const item = q as Partial<Question>;
  if (!item.id || typeof item.id !== 'string') return false;
  if (!item.prompt || typeof item.prompt !== 'string') return false;
  if (!item.type || typeof item.type !== 'string') return false;
  if (item.correctAnswer === undefined || item.correctAnswer === null) return false;
  if (item.difficulty === undefined || typeof item.difficulty !== 'number') return false;
  if ((item.type === 'multiple_choice' || item.type === 'ordering') && (!item.options || item.options.length < 2)) {
    return false;
  }
  return true;
}

/**
 * Deterministic Adaptive Difficulty & Mastery calculation
 */
export function evaluateStudentAnswer(
  currentDifficulty: number,
  currentMastery: number,
  isCorrect: boolean,
  responseTimeMs: number,
  recentAttempts: QuestionAttempt[],
  config: AdaptiveEngineConfig = DEFAULT_ADAPTIVE_CONFIG
): AdaptiveEvaluationResult {
  const isRapidGuess = responseTimeMs < config.rapidGuessThresholdMs;
  
  // Calculate recent streaks
  let currentStreak = 0;
  let consecutiveWrong = 0;

  if (isCorrect) {
    currentStreak = 1;
    for (let i = recentAttempts.length - 1; i >= 0; i--) {
      if (recentAttempts[i].isCorrect) {
        currentStreak++;
      } else {
        break;
      }
    }
  } else {
    consecutiveWrong = 1;
    for (let i = recentAttempts.length - 1; i >= 0; i--) {
      if (!recentAttempts[i].isCorrect) {
        consecutiveWrong++;
      } else {
        break;
      }
    }
  }

  let nextDifficulty = currentDifficulty;
  let masteryDelta = 0;

  if (isCorrect) {
    if (isRapidGuess) {
      // Rapid guess that was correct - do not over-reward, request reasoning check
      masteryDelta = 0.02;
      nextDifficulty = currentDifficulty;
    } else if (responseTimeMs < 12000) {
      // Correct + fast
      masteryDelta = 0.05 + currentDifficulty * 0.01;
      if (currentStreak >= config.streakBonusThreshold) {
        nextDifficulty = Math.min(5, currentDifficulty + 1);
      } else {
        nextDifficulty = Math.min(5, currentDifficulty + 1);
      }
    } else if (responseTimeMs <= 25000) {
      // Correct + normal pace
      masteryDelta = 0.04;
      if (currentStreak >= 2) {
        nextDifficulty = Math.min(5, currentDifficulty + 1);
      }
    } else {
      // Correct + slow
      masteryDelta = 0.025;
      nextDifficulty = currentDifficulty;
    }
  } else {
    // Incorrect logic
    if (consecutiveWrong >= config.wrongStreakScaffoldThreshold) {
      // Scaffold down
      nextDifficulty = Math.max(1, currentDifficulty - 1);
      masteryDelta = -0.05;
    } else {
      nextDifficulty = Math.max(1, currentDifficulty - 1);
      masteryDelta = -0.03;
    }
  }

  const updatedMastery = Math.min(1.0, Math.max(0.1, Number((currentMastery + masteryDelta).toFixed(3))));
  const recommendReasoningCheck = isRapidGuess || currentStreak === 3 || nextDifficulty >= 4;

  let feedbackMessage = 'Nice work!';
  if (!isCorrect) {
    feedbackMessage = "Not quite. Let's look at how it works.";
  } else if (isRapidGuess) {
    feedbackMessage = 'Quick answer! Let’s make sure of the steps.';
  } else if (currentStreak >= 3) {
    feedbackMessage = 'Superb accuracy! Leveling up challenge.';
  }

  return {
    nextDifficulty: Math.round(nextDifficulty),
    updatedMastery,
    isRapidGuess,
    recommendReasoningCheck,
    feedbackMessage,
    consecutiveWrongCount: consecutiveWrong,
  };
}

/**
 * Select next question with progressive fallbacks so it NEVER returns null or undefined.
 * Fallback order:
 * 1. Matching skill & target difficulty (unserved)
 * 2. Matching skill & any difficulty (unserved)
 * 3. Matching topic (unserved)
 * 4. Matching subject (unserved)
 * 5. Matching skill (served, if question pool exhausted)
 * 6. Entire pool fallback
 */
export function selectAdaptiveQuestion(
  availableQuestions: Question[],
  targetSkillIds: string[],
  targetDifficulty: number,
  servedQuestionIds: string[],
  subjectId?: string,
  topicId?: string
): Question | null {
  // Filter only valid questions
  const validQuestions = availableQuestions.filter(validateQuestion);
  if (validQuestions.length === 0) return null;

  const servedSet = new Set(servedQuestionIds);

  // Helper to sort by difficulty proximity
  const sortByDifficulty = (list: Question[]) =>
    [...list].sort((a, b) => {
      const diffA = Math.abs(a.difficulty - targetDifficulty);
      const diffB = Math.abs(b.difficulty - targetDifficulty);
      return diffA - diffB;
    });

  // 1. Unserved questions in target skills
  const unservedSkillQuestions = validQuestions.filter(
    (q) => targetSkillIds.includes(q.skillId) && !servedSet.has(q.id)
  );
  if (unservedSkillQuestions.length > 0) {
    return sortByDifficulty(unservedSkillQuestions)[0];
  }

  // 2. Unserved questions in same topic
  if (topicId) {
    const unservedTopicQuestions = validQuestions.filter(
      (q) => q.topicId === topicId && !servedSet.has(q.id)
    );
    if (unservedTopicQuestions.length > 0) {
      return sortByDifficulty(unservedTopicQuestions)[0];
    }
  }

  // 3. Unserved questions in same subject
  if (subjectId) {
    const unservedSubjectQuestions = validQuestions.filter(
      (q) => q.subjectId === subjectId && !servedSet.has(q.id)
    );
    if (unservedSubjectQuestions.length > 0) {
      return sortByDifficulty(unservedSubjectQuestions)[0];
    }
  }

  // 4. Any unserved question in bank
  const anyUnserved = validQuestions.filter((q) => !servedSet.has(q.id));
  if (anyUnserved.length > 0) {
    return sortByDifficulty(anyUnserved)[0];
  }

  // 5. If all questions in the bank have been answered once, gracefully recycle from target skill
  const skillPool = validQuestions.filter((q) => targetSkillIds.includes(q.skillId));
  if (skillPool.length > 0) {
    return sortByDifficulty(skillPool)[0];
  }

  // 6. Absolute last resort
  return validQuestions[0] || null;
}

export function calculateMasteryLevel(score: number): MasteryLevel {
  if (score >= 0.85) return 'Mastered';
  if (score >= 0.7) return 'Strong';
  if (score >= 0.45) return 'Developing';
  return 'Getting Started';
}
