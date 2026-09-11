'use client';

import React, { Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Award, Flame, TrendingUp, ArrowRight, RotateCcw, CheckCircle2, BookOpen } from 'lucide-react';

function StudentDrillCompleteContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const drillId = params?.drillId as string;
  const sessionId = searchParams.get('sessionId');

  const { drills, sessions, studentMasteries } = useApp();
  const drill = drills.find((d) => d.id === drillId) || drills[0];
  const session = sessionId && sessions[sessionId] ? sessions[sessionId] : Object.values(sessions)[0];

  const accuracy =
    session && session.totalAnswered > 0
      ? Math.round((session.correctCount / session.totalAnswered) * 100)
      : 80;

  const totalAnswered = session ? session.totalAnswered || 5 : 5;
  const correctCount = session ? session.correctCount || 4 : 4;
  const maxStreak = session ? session.maxStreak || 3 : 3;

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xs text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Calm, elegant success badge (no jarring confetti) */}
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Practice Complete
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Great Work Today!
          </h1>
          <p className="text-sm text-slate-600">
            You completed your 5-minute practice session in <strong className="text-slate-800">{drill?.title}</strong>.
          </p>
        </div>

        {/* Growth & Session Summary */}
        <div className="grid grid-cols-3 gap-3 py-1">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-xs font-medium text-slate-500">Solved</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalAnswered}</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">{correctCount} correct</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-xs font-medium text-slate-500">Accuracy</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{accuracy}%</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">↑ +8% growth</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-xs font-medium text-slate-500">Best Streak</p>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">
              🔥 {maxStreak}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">In the zone</p>
          </div>
        </div>

        {/* Personal Growth Insight */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-left flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-xs shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-indigo-950">
              Concept Progression
            </p>
            <p className="text-xs text-indigo-800/80 leading-relaxed">
              Your mastery in <em>{drill?.title || 'this topic'}</em> is developing steadily. Keep this momentum tomorrow!
            </p>
          </div>
        </div>

        {/* Primary and Secondary Actions with min 44px touch target */}
        <div className="space-y-3 pt-1">
          {/* Primary Recommended Next Step */}
          <Link
            href={`/student/drills/${drill?.id || 'drill-math-demo'}`}
            className="w-full min-h-[50px] px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Again (Adaptive)</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/student"
              className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Student Hub</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/student/progress"
              className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>Skill Progress</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentDrillCompletePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading drill summary…</div>}>
      <StudentDrillCompleteContent />
    </Suspense>
  );
}

