'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Users,
  Clock,
  Square,
  Play,
  Pause,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Sparkles,
  QrCode,
  Share2,
} from 'lucide-react';

export default function TeacherLiveDrillPage() {
  const params = useParams();
  const router = useRouter();
  const drillId = params?.drillId as string;

  const {
    drills,
    classes,
    activeLiveDrill,
    sessions,
    startLiveDrill,
    pauseLiveDrill,
    stopLiveDrill,
    studentAttempts,
  } = useApp();

  const drill = drills.find((d) => d.id === drillId) || activeLiveDrill || drills[0];
  const currentClass = classes.find((c) => c.id === drill?.classId) || classes[0];

  // Time remaining calculation
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    (drill?.durationMinutes || 5) * 60
  );
  const isPaused = drill?.status === 'PAUSED';
  const isLive = drill?.status === 'LIVE';

  useEffect(() => {
    if (!isLive || isPaused || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          stopLiveDrill(drill.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isLive, isPaused, secondsRemaining, drill?.id]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleFinishDrill = () => {
    stopLiveDrill(drill.id);
    router.push(`/teacher/drills/${drill.id}/results`);
  };

  // Filter participants
  const participants = Object.values(sessions).filter((s) => s.drillId === drill?.id);
  const activeCount = participants.filter((p) => p.state === 'ACTIVE').length;
  const recentDrillAttempts = studentAttempts.filter((a) => a.drillId === drill?.id);
  const totalAnswersInDrill = recentDrillAttempts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Top Banner & Drill Control Bar */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isLive
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{drill?.status || 'LIVE'} SESSION</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {currentClass?.name} • Code: <strong className="font-mono text-indigo-600 font-bold">{currentClass?.code}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {drill?.title}
          </h1>
          <p className="text-sm text-slate-500">
            Real-time live telemetry stream • Adaptive formative practice
          </p>
        </div>

        {/* Live Timer & Stop/Pause Controls */}
        <div className="flex items-center gap-4">
          <div className="text-center px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200/90">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Time Remaining</p>
            <p className="text-3xl font-mono font-extrabold text-slate-900">
              {formatTime(secondsRemaining)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isPaused ? (
              <button
                onClick={() => startLiveDrill(drill.id)}
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={() => pauseLiveDrill(drill.id)}
                className="px-5 py-3 rounded-2xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-2 transition-all"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={handleFinishDrill}
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>End Drill & View Insights</span>
            </button>
          </div>
        </div>
      </div>

      {/* Classroom Status Aggregation Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Participating</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{participants.length || 3}</p>
          <p className="text-[11px] text-slate-500">In this session</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Active</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
            {participants.filter((p) => p.state === 'ACTIVE').length || 3}
          </p>
          <p className="text-[11px] text-emerald-600 font-medium">Solving questions</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Completed</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-700">
            {participants.filter((p) => p.state === 'COMPLETED').length}
          </p>
          <p className="text-[11px] text-slate-500">Finished drill</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Waiting</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-700">
            {participants.filter((p) => p.state === 'WAITING').length}
          </p>
          <p className="text-[11px] text-slate-500">In lobby</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1 col-span-2 sm:col-span-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Disconnected</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-400">
            {participants.filter((p) => p.state === 'DISCONNECTED').length}
          </p>
          <p className="text-[11px] text-slate-400">Offline</p>
        </div>
      </div>

      {/* Live Classroom Roster Monitor */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Live Student Practice Telemetry
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Formative progress stream • Non-punitive adaptive tracking
            </p>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Classroom Code: <strong className="font-mono text-indigo-600">{currentClass?.code}</strong>
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {participants.length === 0 ? (
            <div className="py-14 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-base text-slate-700 font-semibold">
                Waiting for students to join with code <strong className="text-indigo-600">{currentClass?.code}</strong>
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Students can log in to their student portal and click "Join Class Practice" using code <strong className="text-indigo-600">{currentClass?.code}</strong>.
              </p>
            </div>
          ) : (
            participants.map((s) => (
              <div
                key={s.id}
                className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 font-bold text-base flex items-center justify-center border border-indigo-100 shrink-0">
                    {s.studentName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-900">
                      {s.studentName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="font-medium text-indigo-600">Adaptive Level {s.currentDifficulty}</span>
                      <span>•</span>
                      <span>{s.totalAnswered} solved</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {/* Streak indicator */}
                  {s.currentStreak > 1 && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      🔥 {s.currentStreak} in a row
                    </span>
                  )}

                  {/* Rapid guess notice for teacher eyes only */}
                  {s.rapidGuessCount > 0 && (
                    <span
                      title="Rapid pacing detected — adaptive engine automatically triggered lightweight reasoning checks"
                      className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 font-medium"
                    >
                      Rapid Pace
                    </span>
                  )}

                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    {s.correctCount} Correct
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
