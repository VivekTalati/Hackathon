'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { SubjectId } from '@/types';
import { Play, Sparkles, Sliders, ArrowRight, Clock, ShieldCheck, Check } from 'lucide-react';

function NewDrillContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSubject = (searchParams.get('subject') as SubjectId) || 'math';

  const { classes, subjects, createDrill, startLiveDrill } = useApp();

  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || 'class-6a');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>(initialSubject);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('fractions');
  const [durationMinutes, setDurationMinutes] = useState<number>(5);
  const [isAdaptive, setIsAdaptive] = useState<boolean>(true);
  const [enableReasoning, setEnableReasoning] = useState<boolean>(true);
  const [feedbackMode, setFeedbackMode] = useState<'immediate' | 'end_only'>('immediate');
  const [customTitle, setCustomTitle] = useState<string>('');

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  const currentTopics = currentSubject.topics;
  const activeTopic = currentTopics.find((t) => t.id === selectedTopicId) || currentTopics[0];

  const handleLaunch = () => {
    const drillTitle =
      customTitle.trim() ||
      `${activeTopic ? activeTopic.name : 'Targeted'} Practice (${durationMinutes} min)`;

    const newDrill = createDrill({
      classId: selectedClassId,
      subjectId: selectedSubjectId,
      topicId: activeTopic ? activeTopic.id : 'fractions',
      skillIds: activeTopic ? activeTopic.skills.map((s) => s.id) : [],
      durationMinutes,
      isAdaptive,
      enableReasoningChecks: enableReasoning,
      feedbackMode,
      title: drillTitle,
    });

    startLiveDrill(newDrill.id);
    router.push(`/teacher/drills/${newDrill.id}/live`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Classroom Drill Setup</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Configure Practice Drill
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Fast classroom workflow: Select class, topic, duration, and launch in seconds.
        </p>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-xs p-6 sm:p-10 space-y-8">
        {/* Step 1: Target Classroom */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            1. Target Classroom
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {classes.map((cls) => (
              <button
                key={cls.id}
                type="button"
                onClick={() => setSelectedClassId(cls.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedClassId === cls.id
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-500/20 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <p className="font-bold text-sm text-slate-900">{cls.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{cls.studentCount} Students • Code: {cls.code}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Subject */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            2. Academic Subject
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {subjects.map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  setSelectedSubjectId(sub.id);
                  if (sub.topics[0]) setSelectedTopicId(sub.topics[0].id);
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  selectedSubjectId === sub.id
                    ? 'border-indigo-600 bg-indigo-600 text-white font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <p className="text-sm font-semibold">{sub.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Topic */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            3. Topic & Skills
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentTopics.map((top) => (
              <button
                key={top.id}
                type="button"
                onClick={() => setSelectedTopicId(top.id)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  selectedTopicId === top.id
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <p className="font-bold text-sm text-slate-900">{top.name}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{top.description}</p>
                <div className="flex items-center gap-1 mt-2.5">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {top.skills.length} skills included
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Duration & Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Drill Duration
            </label>
            <div className="flex items-center gap-2">
              {[3, 5, 8, 10].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDurationMinutes(mins)}
                  className={`flex-1 py-3 rounded-2xl border text-sm font-bold transition-all ${
                    durationMinutes === mins
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Adaptive Intelligence
            </label>
            <div
              onClick={() => setIsAdaptive(!isAdaptive)}
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                isAdaptive
                  ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/10'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {isAdaptive ? 'Adaptive Engine Active' : 'Fixed Linear Pool'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {isAdaptive ? 'Adjusts difficulty real-time to each student' : 'Same questions to all'}
                </p>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isAdaptive ? 'bg-emerald-600 text-white' : 'bg-slate-200'
                }`}
              >
                {isAdaptive && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          </div>
        </div>

        {/* Step 5: Advanced Controls */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800">
                Lightweight Reasoning Checks
              </p>
              <p className="text-[11px] text-slate-500">
                Occasional "How did you solve this?" to catch lucky guesses without slowing the drill.
              </p>
            </div>
            <input
              type="checkbox"
              checked={enableReasoning}
              onChange={(e) => setEnableReasoning(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Launch Button */}
        <div className="pt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLaunch}
            className="px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Live Classroom Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewDrillPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading drill configuration…</div>}>
      <NewDrillContent />
    </Suspense>
  );
}
