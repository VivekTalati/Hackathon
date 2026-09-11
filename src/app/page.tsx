'use client';

import React from 'react';
import Link from 'next/link';
import {
  Brain,
  Play,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Layers,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LandingPage() {
  const { currentUser } = useApp();

  const getPortalLink = () => {
    if (currentUser.role === 'teacher') return '/teacher';
    if (currentUser.role === 'student') return '/student';
    return '/admin';
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-28 sm:pb-36">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-indigo-700 border border-slate-200/90 shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Next-Gen Adaptive Formative Assessment for Schools</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 max-w-5xl mx-auto leading-tight">
            Know What to <span className="text-indigo-600">Practice Next.</span>
          </h1>

          {/* Tagline description */}
          <p className="text-lg sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Short, repeated 5-minute practice sessions across multiple subjects. Questions adapt in real time to each learner's current mastery level.
          </p>

          {/* Main Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={getPortalLink()}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2.5 group"
            >
              <span>Go to {currentUser.role === 'teacher' ? 'Teacher Dashboard' : currentUser.role === 'student' ? 'Student Hub' : 'Admin Console'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-base shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Institutional Sign In</span>
            </Link>
          </div>

          {/* Core Philosophy Banner */}
          <div className="pt-12 flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-xs sm:text-sm font-semibold text-slate-400">
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">Sense</span>
            <span>→</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">Adapt</span>
            <span>→</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">Practice</span>
            <span>→</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">Measure</span>
            <span>→</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">Understand</span>
            <span>→</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 shadow-xs text-indigo-700 font-bold">Improve</span>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-20 bg-white border-t border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/70 border border-slate-200/90 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Deterministic Adaptive Engine
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Adjusts difficulty in real time based on accuracy, response speed, and error streaks. Scaffolds struggling students without punishing them.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/70 border border-slate-200/90 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Reasoning & Misconception Insights
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Detects rapid guessing and identifies core conceptual misunderstandings, giving teachers actionable 3-minute mini-lessons.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/70 border border-slate-200/90 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Multi-Subject Architecture
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Built from the ground up for Mathematics, Logic & Reasoning, Science, English, and Computer Science with arbitrary subject extensibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200 text-center text-xs text-slate-400">
        <p>SkillSense — Commercial-grade EdTech Formative Assessment Platform.</p>
      </footer>
    </div>
  );
}
