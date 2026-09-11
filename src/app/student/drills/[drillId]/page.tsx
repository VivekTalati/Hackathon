'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { QuestionRenderer } from '@/components/QuestionRenderer';
import { Question } from '@/types';
import { Clock, Pause, WifiOff, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StudentDrillSolvePage() {
  const params = useParams();
  const router = useRouter();
  const drillId = params?.drillId as string;

  const {
    drills,
    questions,
    currentUser,
    joinDrillSession,
    submitAttempt,
    sessions,
    isOnline,
  } = useApp();

  const drill = drills.find((d) => d.id === drillId) || drills[0];

  // Initialize or retrieve session
  const [session, setSession] = useState(() => joinDrillSession(drill.id, currentUser));

  // Determine initial question: prioritize drill's target skills
  const [currentQuestion, setCurrentQuestion] = useState<Question>(() => {
    const drillSkillIds = drill.skillIds || [];
    const matched = questions.find((q) => drillSkillIds.includes(q.skillId));
    return matched || questions[0];
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
    message: string;
  } | null>(null);
  const [pendingNextQuestion, setPendingNextQuestion] = useState<Question | null>(null);
  const [pendingIsFinished, setPendingIsFinished] = useState(false);
  const [recommendReasoning, setRecommendReasoning] = useState(false);

  // Authoritative timestamp-based timer to prevent resets during re-renders
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    return drill.durationMinutes * 60;
  });
  const timerEndRef = useRef<number>(Date.now() + drill.durationMinutes * 60 * 1000);
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isPaused = drill.status === 'PAUSED';

  // Sync Timer accurately using system clock timestamp, pausing when teacher pauses
  useEffect(() => {
    if (isPaused) {
      // Pause timer ticking
      return;
    }

    const interval = setInterval(() => {
      const remainingMs = timerEndRef.current - Date.now();
      const remainingSecs = Math.max(0, Math.ceil(remainingMs / 1000));
      setSecondsRemaining(remainingSecs);

      if (remainingSecs <= 0) {
        clearInterval(interval);
        router.push(`/student/drills/${drill.id}/complete?sessionId=${session.id}`);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, [drill.id, isPaused, router, session.id]);

  // Clean format MM:SS
  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Safe transition to next question or complete drill
  const advanceToNext = useCallback(() => {
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = null;
    }

    if (pendingIsFinished || !pendingNextQuestion) {
      router.push(`/student/drills/${drill.id}/complete?sessionId=${session.id}`);
      return;
    }

    setFeedback(null);
    setCurrentQuestion(pendingNextQuestion);
    setPendingNextQuestion(null);
    setIsSubmitting(false);

    // Refresh local session display state
    if (sessions[session.id]) {
      setSession(sessions[session.id]);
    }
  }, [drill.id, pendingIsFinished, pendingNextQuestion, router, session.id, sessions]);

  const handleAnswer = (
    answer: string | string[],
    responseTimeMs: number,
    reasoning?: string
  ) => {
    if (isSubmitting || isPaused) return;
    setIsSubmitting(true);

    try {
      const result = submitAttempt({
        sessionId: session.id,
        questionId: currentQuestion.id,
        answer,
        responseTimeMs,
        reasoningChoice: reasoning,
      });

      setFeedback({
        isCorrect: result.isCorrect,
        explanation: result.explanation,
        message: result.feedbackMessage,
      });

      setPendingNextQuestion(result.nextQuestion);
      setPendingIsFinished(result.isFinished);
      setRecommendReasoning(result.recommendReasoning);

      // Auto-advance after 2.4 seconds OR allow student to click "Next Question" immediately
      autoAdvanceTimeoutRef.current = setTimeout(() => {
        advanceToNext();
      }, 2400);
    } catch (e) {
      console.error('Error submitting answer:', e);
      setIsSubmitting(false);
    }
  };

  const isLowTime = secondsRemaining <= 60 && secondsRemaining > 0;

  return (
    <div className="min-h-[88vh] flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      {/* Top Practice Bar: Distraction-free, High Legibility */}
      <div className="w-full flex items-center justify-between gap-4 pb-5 border-b border-slate-200/90">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            {drill.title}
          </span>
          <p className="text-sm text-slate-500 mt-0.5">
            Question <strong className="text-slate-900 font-bold">{session.totalAnswered + 1}</strong>
            {session.totalAnswered > 0 && (
              <span className="text-slate-400"> • {session.correctCount} correct</span>
            )}
          </p>
        </div>

        {/* Real-time streak & calm timer */}
        <div className="flex items-center gap-2.5">
          {session.currentStreak > 1 && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <span>🔥</span>
              <span>{session.currentStreak} in a row</span>
            </span>
          )}

          {/* Calm Timer pill with subtle warmth when <60s */}
          <div
            className={`px-4 py-2 rounded-2xl border font-mono font-bold text-sm flex items-center gap-2 shadow-xs transition-colors ${
              isLowTime
                ? 'bg-amber-50/80 border-amber-300 text-amber-900'
                : 'bg-white border-slate-200/90 text-slate-800'
            }`}
          >
            <Clock className={`w-4 h-4 ${isLowTime ? 'text-amber-600' : 'text-indigo-600'}`} />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>
        </div>
      </div>

      {/* Main Question Display or Teacher Pause Overlay */}
      <div className="w-full flex-1 flex items-center justify-center my-auto py-6">
        {isPaused ? (
          /* Calm Teacher Pause Card */
          <div className="w-full max-w-lg mx-auto bg-white border border-amber-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
              <Pause className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Practice Paused
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Your progress is saved. Your teacher has paused the session and will continue when ready.
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-500 border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Listening for teacher resume…</span>
              </span>
            </div>
          </div>
        ) : (
          <QuestionRenderer
            question={currentQuestion}
            currentDifficulty={session.currentDifficulty}
            onAnswer={handleAnswer}
            isSubmitting={isSubmitting}
            feedback={feedback}
            onNextQuestion={advanceToNext}
            recommendReasoning={recommendReasoning}
          />
        )}
      </div>

      {/* Bottom State Notice */}
      <div className="w-full text-center text-xs text-slate-400 pt-4">
        {!isOnline ? (
          <span className="text-amber-600 font-medium">
            Offline mode active: Answers are safely recorded on your device and will sync seamlessly.
          </span>
        ) : (
          <span>SkillSense Adaptive Practice • Personalized to your current mastery</span>
        )}
      </div>
    </div>
  );
}

