'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { DEMO_ACHIEVEMENTS } from '@/data/seed';
import { Award, Flame, Rocket, Lightbulb, Zap, CheckCircle2 } from 'lucide-react';

export default function StudentAchievementsPage() {
  const { studentAttempts, sessions, currentUser } = useApp();

  const studentSessions = Object.values(sessions).filter((s) => s.studentId === currentUser.id);
  const totalAttempts = studentAttempts.filter((a) => a.studentId === currentUser.id).length;
  const maxStreak = studentSessions.reduce((max, s) => Math.max(max, s.maxStreak), 0);
  const hasHighScore = studentSessions.some((s) => s.totalAnswered >= 3 && (s.correctCount / s.totalAnswered) >= 0.75);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-500" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-indigo-500" />;
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-yellow-500" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-blue-500" />;
      default:
        return <Award className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Badges & Milestones
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Celebrating curiosity, effort, and continuous mathematical growth.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DEMO_ACHIEVEMENTS.map((ach) => {
          // Determine unlock status dynamically based on genuine user practice
          let isUnlocked = Boolean(ach.unlockedAt);
          if (ach.id === 'badge-first-drill') {
            isUnlocked = totalAttempts > 0 || isUnlocked;
          } else if (ach.id === 'badge-streak-3') {
            isUnlocked = maxStreak >= 3 || isUnlocked;
          } else if (ach.id === 'badge-accuracy-80') {
            isUnlocked = hasHighScore || isUnlocked;
          }

          return (
            <div
              key={ach.id}
              className={`p-5 rounded-3xl border transition-all flex items-start gap-4 ${
                isUnlocked
                  ? 'bg-white border-slate-200/90 shadow-xs'
                  : 'bg-slate-50/70 border-dashed border-slate-200 opacity-60'
              }`}
            >
              <div
                className={`p-3 rounded-2xl ${
                  isUnlocked ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {getIcon(ach.icon)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">
                    {ach.title}
                  </h3>
                  {isUnlocked && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{ach.description}</p>
                {isUnlocked ? (
                  <p className="text-[10px] text-emerald-600 font-semibold pt-1">
                    ✓ Unlocked through practice
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium pt-1">
                    Keep practicing to unlock
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

