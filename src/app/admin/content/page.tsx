'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BookOpen, Plus, Layers, Sparkles, Check } from 'lucide-react';
import { SubjectId } from '@/types';

export default function AdminContentPage() {
  const { subjects } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('math');

  const activeSub = subjects.find((s) => s.id === selectedSubject) || subjects[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Curriculum & Academic Subjects
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Standardize topics, skills, and formative competency frameworks across the institution.
          </p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add Custom Subject</span>
        </button>
      </div>

      {/* Subject switcher tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {subjects.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSelectedSubject(sub.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              selectedSubject === sub.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* Active Subject Breakdown */}
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {activeSub.name} Topics & Core Competencies
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">{activeSub.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeSub.topics.map((top) => (
            <div
              key={top.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">
                  {top.name}
                </h3>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  Grades {top.gradeLevels.join(', ')}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{top.description}</p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Skills & Adaptive Rubric:
                </p>
                {top.skills.map((sk) => (
                  <div
                    key={sk.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{sk.name}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">{sk.description}</p>
                    </div>
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded ml-2">
                      Lvl {sk.defaultDifficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
