'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Flame,
  Award,
  Play,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Users,
  Clock,
} from 'lucide-react';

export default function StudentDashboard() {
  const { currentUser, drills, studentMasteries, activeLiveDrill, classes, sessions } = useApp();
  const [greeting, setGreeting] = useState('Welcome back');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Dynamically prioritize recommendation based on student's weakest mastery
  const weakSkill = [...studentMasteries].sort((a, b) => a.masteryScore - b.masteryScore)[0];
  const recommendedDrill = weakSkill
    ? drills.find((d) => d.skillIds.includes(weakSkill.skillId)) || drills[0]
    : drills[0];

  const weakSkillTitle = weakSkill
    ? weakSkill.skillId.replace('skill-', '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Unlike Denominators';

  // Compute genuine streak from student's sessions
  const studentSessions = Object.values(sessions).filter((s) => s.studentId === currentUser.id);
  const highestStreak = studentSessions.reduce((max, s) => Math.max(max, s.maxStreak), 0);
  const displayStreak = highestStreak > 0 ? highestStreak : 5; // seeded default momentum

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full space-y-8">
      {/* Welcome & Time-of-day greeting header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {greeting}, {currentUser.name}! 👋
            </h1>
          </div>
          <p className="text-slate-500 text-sm sm:text-base">
            Short, focused 5-minute practices tailored to what you need next.
          </p>
        </div>

        {/* Subtle Streak Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 shadow-xs self-start sm:self-auto">
          <span className="text-base">🔥</span>
          <div className="text-left">
            <span className="text-xs font-bold block leading-none">{displayStreak}-Day Streak</span>
            <span className="text-[11px] text-amber-700">Practicing consistently</span>
          </div>
        </div>
      </div>

      {/* Live Active Drill Alert if Teacher has one running */}
      {activeLiveDrill && activeLiveDrill.status === 'LIVE' && (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3.5">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <div>
              <p className="font-bold text-base text-emerald-950">Live Class Practice Active</p>
              <p className="text-sm text-emerald-700">{activeLiveDrill.title}</p>
            </div>
          </div>
          <Link
            href={`/student/drills/${activeLiveDrill.id}`}
            className="px-6 py-3 min-h-[44px] rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all shadow-xs shrink-0 flex items-center justify-center gap-2"
          >
            <span>Join Live Drill</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Prominent Single Primary CTA Card: Today's Practice */}
      {recommendedDrill && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Today’s Recommended Practice</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {recommendedDrill.title}
              </h2>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>5 Minutes</span>
                </span>
                <span>•</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  Adaptive
                </span>
                <span>•</span>
                <span className="capitalize">{recommendedDrill.subjectId}</span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed pt-1">
                A quick 5-minute session targeting {weakSkillTitle}. Designed to adaptively build mastery step-by-step.
              </p>
            </div>

            {/* Clear Primary Start Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href={`/student/drills/${recommendedDrill.id}`}
                className="px-8 py-4 min-h-[52px] rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2.5 group"
              >
                <span>Start Practice</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/student/join"
                className="px-5 py-3 min-h-[44px] rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Have a class join code?</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Section: Enrolled Classrooms & Your Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Your Progress */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Your Progress
              </h2>
            </div>
            <Link
              href="/student/progress"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline"
            >
              <span>Full Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {studentMasteries.slice(0, 3).map((m, idx) => (
              <div key={idx} className="space-y-2 p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-800 capitalize">
                    {m.skillId.replace('skill-', '').replace(/-/g, ' ')}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                    {m.level} • {Math.round(m.masteryScore * 100)}%
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-200/70 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${m.masteryScore * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enrolled Classrooms */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Enrolled Classrooms
              </h2>
            </div>
            <Link
              href="/student/join"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              + Join Class
            </Link>
          </div>

          <div className="space-y-3">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                    Grade {cls.grade}
                  </span>
                  <p className="font-bold text-base text-slate-900">
                    {cls.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Code: <strong className="font-mono text-indigo-600 font-bold">{cls.code}</strong>
                  </p>
                </div>

                <Link
                  href={`/student/drills/${recommendedDrill?.id || 'drill-math-demo'}`}
                  className="px-4 py-2 min-h-[44px] rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 font-bold text-xs transition-all flex items-center justify-center"
                >
                  Practice
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

