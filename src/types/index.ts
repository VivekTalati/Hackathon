export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  schoolId: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
  logo?: string;
}

export interface ClassRoom {
  id: string;
  schoolId: string;
  name: string; // e.g. "Grade 6A"
  grade: number; // e.g. 6
  code: string; // 6-character join code e.g. "SKL-6A"
  teacherId: string;
  studentCount: number;
  activeDrillId?: string | null;
}

export type SubjectId = 'math' | 'logic' | 'science' | 'english' | 'cs';

export interface Subject {
  id: SubjectId;
  name: string;
  icon: string;
  description: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  subjectId: SubjectId;
  name: string;
  description: string;
  gradeLevels: number[];
  skills: Skill[];
}

export interface Skill {
  id: string;
  topicId: string;
  subjectId: SubjectId;
  name: string;
  description: string;
  defaultDifficulty: number; // 1 to 5
}

export type QuestionType =
  | 'multiple_choice'
  | 'numeric'
  | 'true_false'
  | 'ordering'
  | 'matching'
  | 'short_text';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  topicId: string;
  skillId: string;
  gradeLevel: number;
  difficulty: number; // 1 (beginner) to 5 (advanced mastery)
  type: QuestionType;
  prompt: string;
  options?: QuestionOption[]; // for multiple choice / ordering
  correctAnswer: string | string[]; // value or ID or ordered IDs
  explanation: string;
  hint: string;
  estimatedSeconds: number;
  misconceptionTags?: string[];
  reasoningPrompt?: string;
  reasoningOptions?: string[];
}

export type DrillStatus =
  | 'DRAFT'
  | 'READY'
  | 'LIVE'
  | 'PAUSED'
  | 'COMPLETED'
  | 'ARCHIVED';

export type DrillMode = 'quick' | 'custom';

export interface Drill {
  id: string;
  classId: string;
  teacherId: string;
  title: string;
  subjectId: SubjectId;
  topicId: string;
  skillIds: string[];
  durationMinutes: number; // e.g. 3, 5, 10
  isAdaptive: boolean;
  targetQuestionCount?: number;
  status: DrillStatus;
  startedAt?: string;
  endsAt?: string;
  createdAt: string;
  enableReasoningChecks: boolean;
  feedbackMode: 'immediate' | 'end_only';
}

export type SessionState =
  | 'WAITING'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'DISCONNECTED'
  | 'RECONNECTED';

export interface DrillSession {
  id: string;
  drillId: string;
  studentId: string;
  studentName: string;
  state: SessionState;
  score: number;
  correctCount: number;
  totalAnswered: number;
  currentStreak: number;
  maxStreak: number;
  averageResponseTimeMs: number;
  currentDifficulty: number;
  startedAt: string;
  lastActiveAt: string;
  rapidGuessCount: number;
}

export interface QuestionAttempt {
  id: string;
  sessionId: string;
  drillId: string;
  studentId: string;
  questionId: string;
  skillId: string;
  studentAnswer: string | string[];
  isCorrect: boolean;
  responseTimeMs: number;
  difficulty: number;
  reasoningChoice?: string;
  misconceptionsIdentified?: string[];
  isRapidGuess: boolean;
  timestamp: string;
}

export type MasteryLevel = 'Getting Started' | 'Developing' | 'Strong' | 'Mastered';

export interface StudentSkillMastery {
  studentId: string;
  subjectId: SubjectId;
  skillId: string;
  masteryScore: number; // 0.00 to 1.00
  accuracy: number; // 0 to 100%
  attemptsCount: number;
  averageResponseTimeMs: number;
  recentAccuracy: number; // rolling last 5-10
  level: MasteryLevel;
  trend: 'improving' | 'stable' | 'needs_practice';
  lastPracticed: string;
  commonMisconceptions: string[];
}

export interface TeacherDrillInsight {
  drillId: string;
  classId: string;
  totalParticipants: number;
  averageAccuracy: number;
  totalQuestionsAnswered: number;
  strongestSkill: {
    name: string;
    accuracy: number;
  };
  needsAttentionSkill: {
    name: string;
    accuracy: number;
  };
  commonMisconceptions: Array<{
    tag: string;
    studentCount: number;
    description: string;
  }>;
  recommendedIntervention: string;
  rapidGuessingCount: number;
  isDemoBaseline?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  badgeType: 'streak' | 'accuracy' | 'speed' | 'milestone' | 'reasoning';
  unlockedAt?: string;
}
