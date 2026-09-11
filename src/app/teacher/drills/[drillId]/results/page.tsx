'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  Award,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Lightbulb,
  CheckCircle2,
  Users,
  Repeat,
} from 'lucide-react';

export default function TeacherDrillResultsPage() {
  const params = useParams();
  const drillId = params?.drillId as string;
  const { drills, getTeacherDrillInsight } = useApp();

  const drill = drills.find((d) => d.id === drillId) || drills[0];
  const insight = getTeacherDrillInsight(drill?.id || 'drill-math-demo');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Practice Session Completed</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {drill?.title} Results & Diagnostics
          </h1>
          <p className="text-slate-500 text-base">
            Automated pedagogical summary and recommended follow-up classroom intervention.
          </p>
        </div>

        <Link
          href="/teacher/drills/new"
          className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 shrink-0"
        >
          <Repeat className="w-4 h-4" />
          <span>Launch Next Drill</span>
        </Link>
      </div>

      {/* Aggregate Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Class Overall Accuracy</p>
          <p className="text-4xl font-extrabold text-slate-900">
            {insight.averageAccuracy}%
          </p>
          <p className="text-sm text-emerald-700 font-medium">
            ↑ Above class baseline of 72%
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Questions Solved</p>
          <p className="text-4xl font-extrabold text-slate-900">
            {insight.totalQuestionsAnswered}
          </p>
          <p className="text-sm text-slate-500 font-medium">Across participating students</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Rapid Guess Checks</p>
          <p className="text-4xl font-extrabold text-indigo-600">
            {insight.rapidGuessingCount}
          </p>
          <p className="text-sm text-indigo-700 font-medium">Scaffolded with reasoning prompts</p>
        </div>
      </div>

      {/* Actionable Misconceptions & AI Recommendation */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Formative Classroom Diagnostics
            </h2>
            <p className="text-xs text-slate-500">
              Generated in real time by the SkillSense pedagogical reasoner
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strongest */}
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Demonstrated Strength</span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {insight.strongestSkill.name}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {insight.strongestSkill.accuracy}% class accuracy. Students readily recognized common denominator multiples.
            </p>
          </div>

          {/* Needs Attention */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Skill Needing Attention</span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {insight.needsAttentionSkill.name}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {insight.needsAttentionSkill.accuracy}% class accuracy. Systematic stumbling when converting unlike denominators.
            </p>
          </div>
        </div>

        {/* Misconceptions Breakdown */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Identified Student Misconceptions
          </h3>
          <div className="space-y-3">
            {insight.commonMisconceptions.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-base text-slate-900">
                    {m.description}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                    {m.studentCount} Students
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Pedagogical Tag: <code className="text-indigo-600 font-mono font-bold">{m.tag}</code>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Intervention */}
        <div className="p-6 sm:p-8 rounded-2xl bg-indigo-50/70 border border-indigo-200/90 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
            <span>Recommended 3-Minute Mini-Lesson</span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {insight.recommendedIntervention}
          </p>
        </div>
      </div>
    </div>
  );
}
