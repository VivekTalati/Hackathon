'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { TrendingUp, Award, Calendar, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

export default function StudentProgressPage() {
  const { studentMasteries } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Your Learning Progress & Growth
        </h1>
        <p className="text-slate-500 text-base">
          SkillSense measures your adaptive performance so you always know what to practice next.
        </p>
      </div>

      {/* Recommended Next Practice Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-indigo-50/70 border border-indigo-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
            Recommended Practice For You
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Adding Unlike Fractions: Common Denominators
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            You are currently at 65% mastery. Just 1 or 2 quick drills will unlock the "Strong" mastery badge!
          </p>
        </div>

        <Link
          href="/student/drills/drill-math-demo"
          className="px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm whitespace-nowrap shadow-md shadow-indigo-100 transition-all shrink-0"
        >
          Practice 5 Mins →
        </Link>
      </div>

      {/* Skill Mastery List */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">
            Detailed Skill Breakdown
          </h2>
          <p className="text-xs text-slate-500">
            Continuous mastery estimation computed by our formative model
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {studentMasteries.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-base font-semibold text-slate-800">
                No practice data recorded yet
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Complete your first 5-minute practice session to see your personalized mastery trajectory and recommendations.
              </p>
              <div className="pt-2">
                <Link
                  href="/student/drills/drill-math-demo"
                  className="px-6 py-2.5 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs"
                >
                  Start Your First Drill →
                </Link>
              </div>
            </div>
          ) : (
            studentMasteries.map((m, idx) => (
              <div key={idx} className="py-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                      {m.subjectId.toUpperCase()}
                    </span>
                    <p className="font-bold text-base text-slate-900 capitalize mt-0.5">
                      {m.skillId.replace('skill-', '').replace(/-/g, ' ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        m.level === 'Mastered'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : m.level === 'Strong'
                          ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {m.level}
                    </span>
                    <span className="font-mono font-extrabold text-base text-slate-900">
                      {Math.round(m.masteryScore * 100)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      m.masteryScore >= 0.85
                        ? 'bg-emerald-500'
                        : m.masteryScore >= 0.7
                        ? 'bg-indigo-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${m.masteryScore * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-0.5">
                  <span>{m.attemptsCount} questions practiced</span>
                  <span className="font-medium text-slate-600">Accuracy: {m.accuracy}%</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
