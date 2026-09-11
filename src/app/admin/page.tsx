'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  ShieldCheck,
  Plus,
  ArrowRight,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const { classes, subjects, questions } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>School Administration Console</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          SkillSense Academy — District & Campus Overview
        </h1>
        <p className="text-slate-500 text-base max-w-2xl leading-relaxed">
          Curriculum standards coverage, cohort tracking, and adaptive item bank management.
        </p>
      </div>

      {/* High level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Classes</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900">{classes.length}</p>
          <p className="text-xs text-slate-500">Grade 6A, 6B, 7A active cohorts</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enrolled Students</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900">72</p>
          <p className="text-xs text-emerald-700 font-medium">Active daily practicing learners</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Subjects</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900">{subjects.length}</p>
          <p className="text-xs text-slate-500">Math, Logic, Science, English, CS</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Question Bank</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900">{questions.length}</p>
          <p className="text-xs text-slate-500">Verified formative items</p>
        </div>
      </div>

      {/* Curriculum & School Cohorts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Campus Academic Subjects
              </h2>
              <p className="text-xs text-slate-500">Active curricula and topic hierarchies</p>
            </div>
            <Link
              href="/admin/content"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Manage Curriculum →
            </Link>
          </div>

          <div className="space-y-3.5">
            {subjects.map((sub) => (
              <div
                key={sub.id}
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-base text-slate-900">
                    {sub.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{sub.topics.length} Topics configured</p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Adaptive Engine Ready
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">
              Classroom Cohort Status
            </h2>
            <p className="text-xs text-slate-500">Active class rosters and join codes</p>
          </div>

          <div className="space-y-3.5">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-base text-slate-900">
                    {cls.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Grade {cls.grade} • Join Code: <strong className="font-mono text-indigo-600 font-bold">{cls.code}</strong>
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
                  {cls.studentCount} Students
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
