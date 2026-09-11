'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BarChart3,
  Users,
  CheckCircle2,
  BookOpen,
  Play,
} from 'lucide-react';
import { MiniLessonModal } from '@/components/MiniLessonModal';

export default function TeacherInsightsPage() {
  const { classes, studentMasteries, studentAttempts, drills, getTeacherDrillInsight } = useApp();
  const [isMiniLessonOpen, setIsMiniLessonOpen] = useState(false);
  const primaryDrill = drills[0];
  const insight = getTeacherDrillInsight(primaryDrill?.id || 'drill-math-demo');

  const topMisconception = insight.commonMisconceptions[0] || {
    tag: 'adds_denominators_directly',
    studentCount: 9,
    description:
      'Students added denominators directly without finding the common denominator (e.g. 1/3 + 1/6 = 2/9).',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
      {/* Page Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Formative AI Diagnostics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Classroom Insights & Pedagogical Interventions
        </h1>
        <p className="text-slate-500 text-base max-w-2xl leading-relaxed">
          SkillSense identifies specific conceptual bottlenecks across student attempts and generates immediate 60-second classroom interventions.
        </p>
      </div>

      {/* Primary Insight Card: Standard Form (What happened / Why / What should I do) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-amber-200 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-100">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-100">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Mathematics • Grade 6A Formative Signal
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                {insight.needsAttentionSkill.name} Challenge
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {insight.isDemoBaseline && (
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-slate-100 text-slate-600 border border-slate-200">
                Baseline Benchmark
              </span>
            )}
            <span className="text-xs px-3.5 py-1.5 rounded-full font-bold bg-amber-50 text-amber-900 border border-amber-200 shrink-0">
              Affecting {topMisconception.studentCount} Student{topMisconception.studentCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Structured Grid: What Happened / Why / What Should I Do */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* What happened */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              1. What happened?
            </span>
            <p className="text-base font-bold text-slate-900">
              {topMisconception.studentCount} students struggled with {insight.needsAttentionSkill.name}.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Observed across {insight.totalQuestionsAnswered} practice attempts ({insight.averageAccuracy}% average cohort accuracy).
            </p>
          </div>

          {/* Why */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              2. Why?
            </span>
            <p className="text-base font-bold text-slate-900">
              {topMisconception.description}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tagged pattern: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800 text-[11px]">{topMisconception.tag}</code>.
            </p>
          </div>

          {/* What should I do */}
          <div className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>3. What should I do?</span>
            </span>
            <p className="text-base font-bold text-indigo-950">
              60-Second Whiteboard Mini-Lesson
            </p>
            <p className="text-xs text-indigo-900 leading-relaxed">
              {insight.recommendedIntervention}
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-400">
            Detected from 186 recent telemetry attempts • Zero grading required
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMiniLessonOpen(true)}
              className="px-6 py-3 min-h-[44px] rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Start Mini-Lesson (60s)</span>
            </button>
            <Link
              href={`/teacher/drills/${primaryDrill?.id || 'drill-math-demo'}/live`}
              className="px-6 py-3 min-h-[44px] rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Drill</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Subject-Wise Skill Mastery Matrix */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Class Mastery Matrix
            </h2>
            <p className="text-xs text-slate-500">
              Aggregated student progression across syllabus learning targets
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {studentMasteries.map((m, idx) => (
            <div
              key={idx}
              className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                  {m.subjectId.toUpperCase()}
                </span>
                <p className="font-bold text-base text-slate-900 capitalize mt-0.5">
                  {m.skillId.replace('skill-', '').replace(/-/g, ' ')}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {m.attemptsCount} attempts recorded • Avg response {Math.round(m.averageResponseTimeMs / 1000)}s
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-44">
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-600">{m.level}</span>
                    <span className="font-bold text-slate-900">{Math.round(m.masteryScore * 100)}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        m.masteryScore >= 0.8
                          ? 'bg-emerald-500'
                          : m.masteryScore >= 0.6
                          ? 'bg-indigo-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${m.masteryScore * 100}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMiniLessonOpen(true)}
                  className="px-4 py-2 min-h-[44px] rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
                >
                  Mini-Lesson
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mini-Lesson Guided Modal */}
      <MiniLessonModal
        isOpen={isMiniLessonOpen}
        onClose={() => setIsMiniLessonOpen(false)}
        drillId={primaryDrill?.id}
      />
    </div>
  );
}
