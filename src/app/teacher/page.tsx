'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Brain,
  Zap,
  Play,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  Sparkles,
  BarChart3,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { MiniLessonModal } from '@/components/MiniLessonModal';

export default function TeacherDashboard() {
  const [isMiniLessonOpen, setIsMiniLessonOpen] = useState(false);
  const {
    currentUser,
    classes,
    drills,
    startLiveDrill,
    activeLiveDrill,
    subjects,
    getTeacherDrillInsight,
  } = useApp();

  const currentClass = classes[0]; // e.g. Grade 6A
  const primaryDrill = drills[0];
  const drillInsight = getTeacherDrillInsight(primaryDrill?.id || 'drill-math-demo');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 w-full space-y-10">
      {/* Welcome & Launch Hero Banner - Light, Sophisticated & Spacious */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-50/50 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              <span>{currentClass.name}</span>
              <span>•</span>
              <span>{currentClass.studentCount} Students Enrolled</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Good morning, {currentUser.name}
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Ready for today’s 5-minute practice session? The adaptive engine has prepped fractions practice based on yesterday’s misconception signals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/teacher/drills/new"
              className="px-6 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-semibold text-sm transition-all shadow-xs"
            >
              Configure Custom Drill
            </Link>
            {primaryDrill && (
              <Link
                href={`/teacher/drills/${primaryDrill.id}/live`}
                onClick={() => startLiveDrill(primaryDrill.id)}
                className="px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2.5 group"
              >
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>Start Recommended 5-Min Drill</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Live Drill Alert if active */}
      {activeLiveDrill && activeLiveDrill.status === 'LIVE' && (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-xs flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 animate-ping" />
            <div>
              <p className="font-bold text-base text-emerald-900">Drill Currently Live: {activeLiveDrill.title}</p>
              <p className="text-xs text-emerald-700 mt-0.5">Students are connected and solving questions right now.</p>
            </div>
          </div>
          <Link
            href={`/teacher/drills/${activeLiveDrill.id}/live`}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 shadow-xs"
          >
            Open Live Monitor →
          </Link>
        </div>
      )}

      {/* Summary KPI Cards with dynamic formative telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Class Accuracy</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">{drillInsight.averageAccuracy}%</p>
          <p className="text-xs text-slate-500 font-medium">
            {drillInsight.isDemoBaseline ? (
              <span className="text-slate-400">Baseline benchmark ({drillInsight.totalQuestionsAnswered} attempts)</span>
            ) : (
              <span className="text-emerald-600 font-semibold">Live class telemetry ({drillInsight.totalQuestionsAnswered} answered)</span>
            )}
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pacing</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {drillInsight.rapidGuessingCount > 0 ? `${drillInsight.rapidGuessingCount} Rapid` : 'Normal'}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            {drillInsight.rapidGuessingCount > 0
              ? 'Reasoning checks active'
              : 'Deliberate reasoning pace'}
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Top Strength</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-900 truncate">
            {drillInsight.strongestSkill.name}
          </p>
          <p className="text-xs text-slate-500 font-medium">
            {drillInsight.strongestSkill.accuracy}% cohort mastery
          </p>
        </div>

        <div className="p-7 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-3 bg-gradient-to-b from-amber-50/30 to-white">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-xs font-bold uppercase tracking-wider">Needs Attention</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <p className="text-xl font-extrabold text-slate-900 truncate">
            {drillInsight.needsAttentionSkill.name}
          </p>
          <p className="text-xs text-amber-700 font-semibold">
            {drillInsight.commonMisconceptions[0]?.studentCount || 1} students flagged for misconception
          </p>
        </div>
      </div>

      {/* Main Grid: Recommended Action & Quick Drill Launcher */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: AI Insights & Interventions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Teacher Insight & Recommended Intervention
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                AI Diagnostic
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Detected Common Misconception: Direct Denominator Addition</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  During the last drill on <em>Adding Unlike Fractions</em>, 38% of incorrect responses were answering <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-xs text-slate-800">1/3 + 1/6 = 2/9</code>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
                <h3 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Actionable Classroom Intervention</span>
                </h3>
                <p className="text-sm text-indigo-900 leading-relaxed">
                  Spend 2 minutes on the whiteboard before the next drill: visually show that adding thirds and sixths is like adding quarters and dimes — they must be converted into common unit sizes first.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-xs text-slate-400">Generated from 186 recent student attempts</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMiniLessonOpen(true)}
                    className="px-4 py-2 min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Start 60s Mini-Lesson</span>
                  </button>
                  <Link
                    href="/teacher/insights"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <span>Full Diagnostics</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Launch Drill Selector */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Quick Drill Launcher
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Launch a standardized 5-minute adaptive drill in 1 click across any academic subject:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subjects.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="font-bold text-sm text-slate-900">
                      {sub.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {sub.topics.length} Topics • Adaptive Ready
                    </p>
                  </div>
                  <Link
                    href={`/teacher/drills/new?subject=${sub.id}`}
                    className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs"
                    title={`Start ${sub.name} Drill`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Classes & Recent Drills */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
            <h2 className="text-lg font-extrabold text-slate-900">
              My Classes
            </h2>
            <div className="space-y-3">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                >
                  <div>
                    <p className="font-bold text-sm text-slate-900">
                      {cls.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">Join Code: <strong className="font-mono font-bold text-indigo-600">{cls.code}</strong></p>
                  </div>
                  <Link
                    href={`/teacher/classes`}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    Manage
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
            <h2 className="text-lg font-extrabold text-slate-900">
              Recent Drills
            </h2>
            <div className="space-y-3">
              {drills.map((d) => (
                <div
                  key={d.id}
                  className="p-4 rounded-2xl border border-slate-200 space-y-2 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      {d.subjectId.toUpperCase()}
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                      {d.durationMinutes} mins
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {d.title}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-400 capitalize">{d.status.toLowerCase()}</span>
                    <Link
                      href={`/teacher/drills/${d.id}/results`}
                      className="text-xs font-bold text-indigo-600 hover:underline"
                    >
                      View Results →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MiniLessonModal
        isOpen={isMiniLessonOpen}
        onClose={() => setIsMiniLessonOpen(false)}
        drillId={primaryDrill?.id}
      />
    </div>
  );
}
