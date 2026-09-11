'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  School,
  ClassRoom,
  Drill,
  DrillSession,
  QuestionAttempt,
  StudentSkillMastery,
  TeacherDrillInsight,
  Subject,
  Question,
} from '@/types';
import {
  DEMO_SCHOOL,
  DEMO_TEACHERS,
  DEMO_STUDENTS,
  DEMO_ADMIN,
  DEMO_CLASSES,
  SUBJECTS,
  INITIAL_QUESTIONS,
  DEMO_ACHIEVEMENTS,
} from '@/data/seed';
import { EXPANDED_QUESTIONS } from '@/data/expandedQuestions';
import {
  evaluateStudentAnswer,
  selectAdaptiveQuestion,
  calculateMasteryLevel,
  validateQuestion,
} from '@/lib/adaptiveEngine';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  allUsers: User[];
  loginUser: (email: string) => User | null;
  registerUser: (name: string, email: string, role: UserRole, schoolId?: string) => User;
  switchUser: (userId: string) => User | null;
  logoutUser: () => void;
  classes: ClassRoom[];
  subjects: Subject[];
  questions: Question[];
  drills: Drill[];
  activeLiveDrill: Drill | null;
  sessions: Record<string, DrillSession>;
  studentMasteries: StudentSkillMastery[];
  startLiveDrill: (drillId: string) => void;
  pauseLiveDrill: (drillId: string) => void;
  stopLiveDrill: (drillId: string) => void;
  createDrill: (params: Partial<Drill>) => Drill;
  joinDrillSession: (drillId: string, student: User) => DrillSession;
  submitAttempt: (params: {
    sessionId: string;
    questionId: string;
    answer: string | string[];
    responseTimeMs: number;
    reasoningChoice?: string;
  }) => {
    isCorrect: boolean;
    explanation: string;
    feedbackMessage: string;
    nextQuestion: Question | null;
    isFinished: boolean;
    consecutiveWrongCount: number;
    recommendReasoning: boolean;
  };
  getTeacherDrillInsight: (drillId: string) => TeacherDrillInsight;
  studentAttempts: QuestionAttempt[];
  addGeneratedQuestion: (q: Question) => void;
  joinClassByCode: (code: string) => { success: boolean; classRoom?: ClassRoom; error?: string };
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY_USER = 'skillsense_auth_user_v3';
const STORAGE_KEY_SESSIONS = 'skillsense_sessions_v3';
const STORAGE_KEY_ATTEMPTS = 'skillsense_attempts_v3';
const STORAGE_KEY_DRILLS = 'skillsense_drills_v3';
const STORAGE_KEY_CLASSES = 'skillsense_classes_v3';
const STORAGE_KEY_MASTERIES = 'skillsense_masteries_v3';
const STORAGE_KEY_REGISTERED_USERS = 'skillsense_registered_users_v3';

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Deterministic initial states for SSR matching
  const [currentUser, setCurrentUser] = useState<User>(DEMO_TEACHERS[0]);
  const [allUsers, setAllUsers] = useState<User[]>([...DEMO_TEACHERS, ...DEMO_STUDENTS, DEMO_ADMIN]);
  const [classes, setClasses] = useState<ClassRoom[]>(DEMO_CLASSES);
  const [subjects] = useState<Subject[]>(SUBJECTS);
  const [questions, setQuestions] = useState<Question[]>(EXPANDED_QUESTIONS);
  const [drills, setDrills] = useState<Drill[]>([
    {
      id: 'drill-math-demo',
      classId: 'class-6a',
      teacherId: 'teacher-1',
      title: 'Fractions Mastery: Unlike Denominators',
      subjectId: 'math',
      topicId: 'fractions',
      skillIds: ['skill-unlike-denominators', 'skill-equivalent-fractions'],
      durationMinutes: 5,
      isAdaptive: true,
      targetQuestionCount: 8,
      status: 'READY',
      createdAt: '2026-09-10T12:00:00.000Z',
      enableReasoningChecks: true,
      feedbackMode: 'immediate',
    },
  ]);
  const [activeLiveDrill, setActiveLiveDrill] = useState<Drill | null>(null);
  const [sessions, setSessions] = useState<Record<string, DrillSession>>({});
  const [studentAttempts, setStudentAttempts] = useState<QuestionAttempt[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  const [studentMasteries, setStudentMasteries] = useState<StudentSkillMastery[]>([
    {
      studentId: 'student-1',
      subjectId: 'math',
      skillId: 'skill-equivalent-fractions',
      masteryScore: 0.88,
      accuracy: 88,
      attemptsCount: 16,
      averageResponseTimeMs: 14200,
      recentAccuracy: 90,
      level: 'Mastered',
      trend: 'improving',
      lastPracticed: '2026-09-10T12:00:00.000Z',
      commonMisconceptions: [],
    },
    {
      studentId: 'student-1',
      subjectId: 'math',
      skillId: 'skill-unlike-denominators',
      masteryScore: 0.65,
      accuracy: 64,
      attemptsCount: 14,
      averageResponseTimeMs: 21500,
      recentAccuracy: 60,
      level: 'Developing',
      trend: 'needs_practice',
      lastPracticed: '2026-09-10T18:00:00.000Z',
      commonMisconceptions: ['adds_denominators_directly'],
    },
    {
      studentId: 'student-1',
      subjectId: 'logic',
      skillId: 'skill-number-sequences',
      masteryScore: 0.82,
      accuracy: 85,
      attemptsCount: 10,
      averageResponseTimeMs: 16000,
      recentAccuracy: 85,
      level: 'Strong',
      trend: 'improving',
      lastPracticed: '2026-09-09T12:00:00.000Z',
      commonMisconceptions: [],
    },
  ]);

  // Hydrate client-side storage safely in useEffect after initial HTML mount
  useEffect(() => {
    try {
      const savedRegistered = localStorage.getItem(STORAGE_KEY_REGISTERED_USERS);
      if (savedRegistered) {
        const parsed: User[] = JSON.parse(savedRegistered);
        // Merge with defaults so demo users always exist
        const merged = [...parsed];
        for (const def of [...DEMO_TEACHERS, ...DEMO_STUDENTS, DEMO_ADMIN]) {
          if (!merged.some((u) => u.email.toLowerCase() === def.email.toLowerCase())) {
            merged.push(def);
          }
        }
        setAllUsers(merged);
      }

      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedClasses = localStorage.getItem(STORAGE_KEY_CLASSES);
      if (savedClasses) setClasses(JSON.parse(savedClasses));

      const savedDrills = localStorage.getItem(STORAGE_KEY_DRILLS);
      if (savedDrills) setDrills(JSON.parse(savedDrills));

      const savedSessions = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (savedSessions) setSessions(JSON.parse(savedSessions));

      const savedAttempts = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
      if (savedAttempts) setStudentAttempts(JSON.parse(savedAttempts));

      const savedMasteries = localStorage.getItem(STORAGE_KEY_MASTERIES);
      if (savedMasteries) setStudentMasteries(JSON.parse(savedMasteries));
    } catch (e) {
      console.error('Error hydrating state from storage:', e);
    }
    setHasHydrated(true);
  }, []);

  // Persist updates to localStorage only after hydration is complete
  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.error(e);
    }
  }, [sessions, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(studentAttempts));
    } catch (e) {
      console.error(e);
    }
  }, [studentAttempts, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_DRILLS, JSON.stringify(drills));
    } catch (e) {
      console.error(e);
    }
  }, [drills, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_CLASSES, JSON.stringify(classes));
    } catch (e) {
      console.error(e);
    }
  }, [classes, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_MASTERIES, JSON.stringify(studentMasteries));
    } catch (e) {
      console.error(e);
    }
  }, [studentMasteries, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_REGISTERED_USERS, JSON.stringify(allUsers));
    } catch (e) {
      console.error(e);
    }
  }, [allUsers, hasHydrated]);

  // Online / offline tracking
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Cross-tab real-time classroom telemetry & state sync
  useEffect(() => {
    const handleStorageSync = (e: StorageEvent) => {
      if (!e.newValue) return;
      try {
        if (e.key === STORAGE_KEY_SESSIONS) {
          setSessions(JSON.parse(e.newValue));
        } else if (e.key === STORAGE_KEY_DRILLS) {
          const updatedDrills: Drill[] = JSON.parse(e.newValue);
          setDrills(updatedDrills);
          setActiveLiveDrill((prev) => {
            if (!prev) return null;
            return updatedDrills.find((d) => d.id === prev.id) || prev;
          });
        } else if (e.key === STORAGE_KEY_ATTEMPTS) {
          setStudentAttempts(JSON.parse(e.newValue));
        } else if (e.key === STORAGE_KEY_CLASSES) {
          setClasses(JSON.parse(e.newValue));
        } else if (e.key === STORAGE_KEY_MASTERIES) {
          setStudentMasteries(JSON.parse(e.newValue));
        }
      } catch (err) {
        console.error('Cross-tab sync error:', err);
      }
    };

    window.addEventListener('storage', handleStorageSync);
    return () => window.removeEventListener('storage', handleStorageSync);
  }, []);

  // Multi-Device Server Realtime Stream (SSE)
  useEffect(() => {
    const activeDrillId = activeLiveDrill?.id || drills[0]?.id;
    if (!activeDrillId || typeof window === 'undefined') return;

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource(`/api/realtime/stream?drillId=${activeDrillId}`);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'DRILL_STARTED' || data.type === 'DRILL_PAUSED' || data.type === 'DRILL_RESUMED' || data.type === 'DRILL_ENDED') {
            const statusMap: Record<string, any> = {
              DRILL_STARTED: 'LIVE',
              DRILL_PAUSED: 'PAUSED',
              DRILL_RESUMED: 'LIVE',
              DRILL_ENDED: 'COMPLETED',
            };
            const newStatus = statusMap[data.type];
            if (newStatus) {
              setDrills((prev) =>
                prev.map((d) => (d.id === data.drillId ? { ...d, status: newStatus } : d))
              );
              setActiveLiveDrill((prev) =>
                prev && prev.id === data.drillId ? { ...prev, status: newStatus } : prev
              );
            }
          } else if (data.type === 'ATTEMPT_SUBMITTED' && data.payload) {
            // Update live telemetry session
            const sId = `session-${data.drillId}-${data.payload.studentId}`;
            setSessions((prev) => {
              const existing = prev[sId];
              if (!existing) return prev;
              return {
                ...prev,
                [sId]: {
                  ...existing,
                  score: data.payload.score,
                  totalAnswered: data.payload.totalAnswered,
                  correctCount: data.payload.correctCount,
                  lastActiveAt: new Date().toISOString(),
                  rapidGuessCount: existing.rapidGuessCount + (data.payload.rapidGuess ? 1 : 0),
                },
              };
            });
          }
        } catch (e) {
          console.error('Realtime SSE message parse error:', e);
        }
      };

      eventSource.onerror = () => {
        // SSE automatically handles reconnects
      };
    } catch (e) {
      console.error('SSE initialization error:', e);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [activeLiveDrill?.id, drills]);

  const loginUser = (email: string): User | null => {
    const normalized = email.trim().toLowerCase();
    const match = allUsers.find((u) => u.email.toLowerCase() === normalized);
    if (match) {
      setCurrentUser(match);
      return match;
    }
    // Fallback: If user enters demo shorthand
    if (normalized.includes('teacher')) {
      const teacher = allUsers.find((u) => u.role === 'teacher') || DEMO_TEACHERS[0];
      setCurrentUser(teacher);
      return teacher;
    }
    if (normalized.includes('student')) {
      const student = allUsers.find((u) => u.role === 'student') || DEMO_STUDENTS[0];
      setCurrentUser(student);
      return student;
    }
    if (normalized.includes('admin')) {
      const admin = allUsers.find((u) => u.role === 'admin') || DEMO_ADMIN;
      setCurrentUser(admin);
      return admin;
    }
    return null;
  };

  const registerUser = (
    name: string,
    email: string,
    role: UserRole,
    schoolId: string = 'school-1'
  ): User => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      schoolId,
    };
    setAllUsers((prev) => {
      // Don't add duplicate email
      const filtered = prev.filter((u) => u.email.toLowerCase() !== newUser.email);
      return [...filtered, newUser];
    });
    setCurrentUser(newUser);
    return newUser;
  };

  const switchUser = (userId: string): User | null => {
    const found = allUsers.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      return found;
    }
    return null;
  };

  const logoutUser = () => {
    setCurrentUser(DEMO_TEACHERS[0]);
  };

  const createDrill = (params: Partial<Drill>): Drill => {
    const newDrill: Drill = {
      id: `drill-${Date.now()}`,
      classId: params.classId || 'class-6a',
      teacherId: currentUser.id,
      title: params.title || 'Quick Practice Session',
      subjectId: params.subjectId || 'math',
      topicId: params.topicId || 'fractions',
      skillIds: params.skillIds || ['skill-unlike-denominators'],
      durationMinutes: params.durationMinutes || 5,
      isAdaptive: params.isAdaptive !== undefined ? params.isAdaptive : true,
      targetQuestionCount: params.targetQuestionCount || 8,
      status: 'READY',
      createdAt: new Date().toISOString(),
      enableReasoningChecks: params.enableReasoningChecks ?? true,
      feedbackMode: params.feedbackMode || 'immediate',
    };
    setDrills((prev) => [newDrill, ...prev]);
    return newDrill;
  };

  const startLiveDrill = (drillId: string) => {
    const now = new Date().toISOString();
    setDrills((prev) =>
      prev.map((d) => (d.id === drillId ? { ...d, status: 'LIVE', startedAt: now } : d))
    );
    const live = drills.find((d) => d.id === drillId);
    if (live) {
      setActiveLiveDrill({
        ...live,
        status: 'LIVE',
        startedAt: now,
      });
      DEMO_STUDENTS.slice(1, 4).forEach((stud, idx) => {
        const sId = `session-${drillId}-${stud.id}`;
        setSessions((prev) => ({
          ...prev,
          [sId]: {
            id: sId,
            drillId,
            studentId: stud.id,
            studentName: stud.name,
            state: 'ACTIVE',
            score: (idx + 1) * 20,
            correctCount: (idx + 1) * 2,
            totalAnswered: (idx + 1) * 2 + 1,
            currentStreak: 2,
            maxStreak: 3,
            averageResponseTimeMs: 14000 + idx * 2000,
            currentDifficulty: 3,
            startedAt: now,
            lastActiveAt: now,
            rapidGuessCount: idx === 1 ? 1 : 0,
          },
        }));
      });
    }
  };

  const pauseLiveDrill = (drillId: string) => {
    setDrills((prev) =>
      prev.map((d) => (d.id === drillId ? { ...d, status: 'PAUSED' } : d))
    );
    if (activeLiveDrill?.id === drillId) {
      setActiveLiveDrill((prev) => (prev ? { ...prev, status: 'PAUSED' } : null));
    }
  };

  const stopLiveDrill = (drillId: string) => {
    const now = new Date().toISOString();
    setDrills((prev) =>
      prev.map((d) => (d.id === drillId ? { ...d, status: 'COMPLETED', endsAt: now } : d))
    );
    if (activeLiveDrill?.id === drillId) {
      setActiveLiveDrill((prev) =>
        prev ? { ...prev, status: 'COMPLETED', endsAt: now } : null
      );
    }
  };

  const joinDrillSession = (drillId: string, student: User): DrillSession => {
    const sessionId = `session-${drillId}-${student.id}`;
    if (sessions[sessionId]) {
      return sessions[sessionId];
    }
    const newSession: DrillSession = {
      id: sessionId,
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
    setSessions((prev) => ({ ...prev, [sessionId]: newSession }));
    return newSession;
  };

  const submitAttempt = ({
    sessionId,
    questionId,
    answer,
    responseTimeMs,
    reasoningChoice,
  }: {
    sessionId: string;
    questionId: string;
    answer: string | string[];
    responseTimeMs: number;
    reasoningChoice?: string;
  }) => {
    const q = questions.find((item) => item.id === questionId);
    let session = sessions[sessionId];

    if (!session) {
      session = {
        id: sessionId,
        drillId: drills[0]?.id || 'drill-math-demo',
        studentId: currentUser.id,
        studentName: currentUser.name,
        state: 'ACTIVE',
        score: 0,
        correctCount: 0,
        totalAnswered: 0,
        currentStreak: 0,
        maxStreak: 0,
        averageResponseTimeMs: responseTimeMs,
        currentDifficulty: 2,
        startedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        rapidGuessCount: 0,
      };
    }

    if (!q) {
      throw new Error(`Question ${questionId} not found`);
    }

    // Accurate Answer Verification
    const isCorrect = Array.isArray(q.correctAnswer)
      ? JSON.stringify(q.correctAnswer) === JSON.stringify(answer)
      : String(q.correctAnswer).trim().toLowerCase() ===
        String(answer).trim().toLowerCase();

    const recent = studentAttempts.filter((a) => a.sessionId === sessionId);
    const existingMastery = studentMasteries.find(
      (m) => m.studentId === session.studentId && m.skillId === q.skillId
    );
    const currentScore = existingMastery ? existingMastery.masteryScore : 0.5;

    const evalResult = evaluateStudentAnswer(
      session.currentDifficulty,
      currentScore,
      isCorrect,
      responseTimeMs,
      recent
    );

    const attemptId = `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const attempt: QuestionAttempt = {
      id: attemptId,
      sessionId,
      drillId: session.drillId,
      studentId: session.studentId,
      questionId: q.id,
      skillId: q.skillId,
      studentAnswer: answer,
      isCorrect,
      responseTimeMs,
      difficulty: session.currentDifficulty,
      reasoningChoice,
      misconceptionsIdentified: isCorrect ? [] : q.misconceptionTags || [],
      isRapidGuess: evalResult.isRapidGuess,
      timestamp: new Date().toISOString(),
    };

    setStudentAttempts((prev) => [...prev, attempt]);

    // Dispatch background idempotent persistence to server API
    if (typeof window !== 'undefined') {
      fetch('/api/attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: attemptId,
          sessionId,
          drillId: session.drillId,
          questionId: q.id,
          answer,
          responseTimeMs,
          reasoningChoice,
        }),
      }).catch((err) => {
        console.warn('Background sync queued (offline/local fallback):', err);
      });
    }

    const newStreak = isCorrect ? session.currentStreak + 1 : 0;
    const newMaxStreak = Math.max(session.maxStreak, newStreak);
    const newTotal = session.totalAnswered + 1;
    const newCorrect = session.correctCount + (isCorrect ? 1 : 0);
    const newAvgTime = Math.round(
      (session.averageResponseTimeMs * session.totalAnswered + responseTimeMs) / newTotal
    );

    const updatedSession: DrillSession = {
      ...session,
      score: session.score + (isCorrect ? session.currentDifficulty * 10 : 0),
      correctCount: newCorrect,
      totalAnswered: newTotal,
      currentStreak: newStreak,
      maxStreak: newMaxStreak,
      averageResponseTimeMs: newAvgTime,
      currentDifficulty: evalResult.nextDifficulty,
      lastActiveAt: new Date().toISOString(),
      rapidGuessCount: session.rapidGuessCount + (evalResult.isRapidGuess ? 1 : 0),
    };

    setSessions((prev) => ({
      ...prev,
      [sessionId]: updatedSession,
    }));

    setStudentMasteries((prev) => {
      const idx = prev.findIndex(
        (m) => m.studentId === session.studentId && m.skillId === q.skillId
      );
      const newMasteryLevel = calculateMasteryLevel(evalResult.updatedMastery);
      if (idx >= 0) {
        const existing = prev[idx];
        const updatedList = [...prev];
        updatedList[idx] = {
          ...existing,
          masteryScore: evalResult.updatedMastery,
          attemptsCount: existing.attemptsCount + 1,
          accuracy: Math.round(
            (existing.accuracy * existing.attemptsCount + (isCorrect ? 100 : 0)) /
              (existing.attemptsCount + 1)
          ),
          level: newMasteryLevel,
          trend:
            evalResult.updatedMastery >= existing.masteryScore ? 'improving' : 'needs_practice',
          lastPracticed: new Date().toISOString(),
          commonMisconceptions: isCorrect
            ? existing.commonMisconceptions
            : Array.from(
                new Set([...existing.commonMisconceptions, ...(q.misconceptionTags || [])])
              ),
        };
        return updatedList;
      } else {
        return [
          ...prev,
          {
            studentId: session.studentId,
            subjectId: q.subjectId,
            skillId: q.skillId,
            masteryScore: evalResult.updatedMastery,
            accuracy: isCorrect ? 100 : 0,
            attemptsCount: 1,
            averageResponseTimeMs: responseTimeMs,
            recentAccuracy: isCorrect ? 100 : 0,
            level: newMasteryLevel,
            trend: isCorrect ? 'improving' : 'needs_practice',
            lastPracticed: new Date().toISOString(),
            commonMisconceptions: isCorrect ? [] : q.misconceptionTags || [],
          },
        ];
      }
    });

    const currentDrill = drills.find((d) => d.id === session.drillId);
    const targetSkillIds =
      currentDrill && currentDrill.skillIds.length > 0 ? currentDrill.skillIds : [q.skillId];

    const servedQuestionIds = [...recent.map((a) => a.questionId), q.id];

    const nextQuestion = selectAdaptiveQuestion(
      questions,
      targetSkillIds,
      evalResult.nextDifficulty,
      servedQuestionIds,
      q.subjectId,
      q.topicId
    );

    const isFinished = !nextQuestion;

    return {
      isCorrect,
      explanation: q.explanation,
      feedbackMessage: evalResult.feedbackMessage,
      nextQuestion,
      isFinished,
      consecutiveWrongCount: evalResult.consecutiveWrongCount,
      recommendReasoning: evalResult.recommendReasoningCheck,
    };
  };

  const getTeacherDrillInsight = (drillId: string): TeacherDrillInsight => {
    const drillSessions = Object.values(sessions).filter((s) => s.drillId === drillId);
    const attempts = studentAttempts.filter((a) => a.drillId === drillId);

    // If real attempts exist for this drill, calculate genuine data-driven insights
    if (attempts.length > 0) {
      const totalParticipants = drillSessions.length || 1;
      const totalQuestionsAnswered = attempts.length;
      const correctAttempts = attempts.filter((a) => a.isCorrect).length;
      const averageAccuracy = Math.round((correctAttempts / totalQuestionsAnswered) * 100);

      // Skill performance aggregation
      const skillMap: Record<string, { total: number; correct: number }> = {};
      for (const att of attempts) {
        if (!skillMap[att.skillId]) {
          skillMap[att.skillId] = { total: 0, correct: 0 };
        }
        skillMap[att.skillId].total++;
        if (att.isCorrect) skillMap[att.skillId].correct++;
      }

      const skillEntries = Object.entries(skillMap).map(([sId, stats]) => ({
        skillId: sId,
        name: sId.replace('skill-', '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        accuracy: Math.round((stats.correct / stats.total) * 100),
      }));

      // Sort by accuracy descending
      skillEntries.sort((a, b) => b.accuracy - a.accuracy);
      const strongest = skillEntries[0] || { name: 'Equivalent Fractions', accuracy: 86 };
      const needsAttention = skillEntries[skillEntries.length - 1] || {
        name: 'Adding Unlike Fractions',
        accuracy: 54,
      };

      // Misconception aggregation: count distinct students per misconception tag
      const tagStudents: Record<string, Set<string>> = {};
      for (const att of attempts) {
        if (!att.isCorrect && att.misconceptionsIdentified) {
          for (const tag of att.misconceptionsIdentified) {
            if (!tagStudents[tag]) tagStudents[tag] = new Set();
            tagStudents[tag].add(att.studentId);
          }
        }
      }

      const commonMisconceptions = Object.entries(tagStudents).map(([tag, studentSet]) => {
        let desc = 'Students encountered difficulty on this conceptual step.';
        if (tag === 'adds_denominators_directly') {
          desc = 'Students added denominators directly without finding the common denominator (e.g. 1/3 + 1/6 = 2/9).';
        } else if (tag === 'numerator_only_scale') {
          desc = 'Multiplied numerator without scaling denominator proportionally.';
        } else if (tag === 'cross_addition') {
          desc = 'Attempted cross-multiplication instead of finding lowest common denominator.';
        } else if (tag === 'confused_variables') {
          desc = 'Confused independent variable with dependent outcome variable.';
        } else if (tag === 'off_by_one') {
          desc = 'Boundary iteration error: loop counted one element too few or too many.';
        }
        return {
          tag,
          studentCount: studentSet.size,
          description: desc,
        };
      });

      let intervention =
        'Spend 2 minutes on the whiteboard with visual models before the next drill.';
      if (tagStudents['adds_denominators_directly']) {
        intervention =
          'Demonstrate fraction bars showing 1/3 alongside 2/6. Reinforce why denominator designates piece size (coin type), not piece count.';
      } else if (tagStudents['numerator_only_scale']) {
        intervention =
          'Demonstrate multiplying by 1 (e.g. 2/2) on the board to reinforce proportional scaling.';
      } else if (tagStudents['confused_variables']) {
        intervention =
          'Teach the variable anchor: "I change the Independent variable to measure the Data (Dependent)".';
      }

      return {
        drillId,
        classId: 'class-6a',
        totalParticipants,
        totalQuestionsAnswered,
        averageAccuracy,
        strongestSkill: {
          name: strongest.name,
          accuracy: strongest.accuracy,
        },
        needsAttentionSkill: {
          name: needsAttention.name,
          accuracy: needsAttention.accuracy,
        },
        commonMisconceptions:
          commonMisconceptions.length > 0
            ? commonMisconceptions
            : [
                {
                  tag: 'general_practice',
                  studentCount: 1,
                  description: 'Core concepts require reinforcement through repeated quick drills.',
                },
              ],
        recommendedIntervention: intervention,
        rapidGuessingCount: drillSessions.reduce((acc, s) => acc + s.rapidGuessCount, 0),
        isDemoBaseline: false,
      };
    }

    // Seeded demo baseline when no live attempts have occurred yet
    const drillSessionsCount = drillSessions.length || 1;
    return {
      drillId,
      classId: 'class-6a',
      totalParticipants: drillSessionsCount,
      totalQuestionsAnswered: 24,
      averageAccuracy: 78,
      strongestSkill: {
        name: 'Equivalent Fractions',
        accuracy: 86,
      },
      needsAttentionSkill: {
        name: 'Adding Unlike Fractions',
        accuracy: 54,
      },
      commonMisconceptions: [
        {
          tag: 'adds_denominators_directly',
          studentCount: 9,
          description:
            'Students added denominators directly without finding the common denominator (e.g. 1/3 + 1/6 = 2/9).',
        },
        {
          tag: 'numerator_only_scale',
          studentCount: 3,
          description: 'Multiplied numerator without scaling denominator proportionally.',
        },
      ],
      recommendedIntervention:
        'Demonstrate fraction bars showing 1/3 alongside 2/6. Reinforce why denominator designates piece size, not piece count.',
      rapidGuessingCount: drillSessions.reduce((acc, s) => acc + s.rapidGuessCount, 0),
      isDemoBaseline: true,
    };
  };

  const addGeneratedQuestion = (q: Question) => {
    setQuestions((prev) => [q, ...prev]);
  };

  const joinClassByCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    const matched = classes.find((c) => c.code.toUpperCase() === clean);
    if (!matched) {
      return { success: false, error: 'Invalid classroom code. Check with your teacher.' };
    }
    return { success: true, classRoom: matched };
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        allUsers,
        loginUser,
        registerUser,
        switchUser,
        logoutUser,
        classes,
        subjects,
        questions,
        drills,
        activeLiveDrill,
        sessions,
        studentMasteries,
        startLiveDrill,
        pauseLiveDrill,
        stopLiveDrill,
        createDrill,
        joinDrillSession,
        submitAttempt,
        getTeacherDrillInsight,
        studentAttempts,
        addGeneratedQuestion,
        joinClassByCode,
        isOnline,
        setIsOnline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
