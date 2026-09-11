'use client';

import React, { useState } from 'react';
import { X, Sparkles, Clock, CheckCircle2, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

interface MiniLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  misconceptionTitle?: string;
  drillId?: string;
}

export function MiniLessonModal({
  isOpen,
  onClose,
  misconceptionTitle = 'Adding Unlike Denominators Directly',
  drillId = 'drill-math-demo',
}: MiniLessonModalProps) {
  const [activeStep, setActiveStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>60-Second Classroom Mini-Lesson</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Remediation: {misconceptionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Quick 3-step teacher script to project or deliver to the board right now.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl">
          {[
            { step: 1, label: '1. The Real-World Hook (15s)' },
            { step: 2, label: '2. The Visual Model (30s)' },
            { step: 3, label: '3. Quick Check (15s)' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                activeStep === item.step
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[160px] flex flex-col justify-center p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
          {activeStep === 1 && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                Say to class:
              </span>
              <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed italic">
                &ldquo;If I have 1 dime and 1 quarter, do I have 2 nickels? No! Denominators name the coin or the slice size. You can’t just add the bottom numbers together.&rdquo;
              </p>
              <p className="text-xs text-slate-500 pt-1">
                Objective: Break the instinct to treat the denominator as an additive quantity.
              </p>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                Draw on board:
              </span>
              <div className="space-y-2 py-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
                  <div className="w-1/3 bg-indigo-200 text-indigo-900 text-center py-2 rounded-lg border border-indigo-300">
                    1/3
                  </div>
                  <span>=</span>
                  <div className="w-1/3 flex gap-1">
                    <div className="flex-1 bg-indigo-500 text-white text-center py-2 rounded-lg text-[10px]">
                      1/6
                    </div>
                    <div className="flex-1 bg-indigo-500 text-white text-center py-2 rounded-lg text-[10px]">
                      1/6
                    </div>
                  </div>
                  <span className="text-slate-500 font-sans text-xs">(2/6 total)</span>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                &ldquo;Convert 1/3 into 2/6 so all slices have the exact same size. Then: 2/6 + 1/6 = 3/6 = 1/2.&rdquo;
              </p>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                Quick Whole-Class Turn & Talk:
              </span>
              <p className="text-base font-bold text-slate-900 leading-snug">
                &ldquo;Before you calculate: What common denominator would you use to add 1/4 and 3/8? Give me a thumbs up when you have it.&rdquo;
              </p>
              <p className="text-xs text-slate-500 pt-1">
                Expected student response: <strong>Eighths (8)</strong>. Once 80%+ thumbs are up, class is ready to resume practice.
              </p>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => setActiveStep((prev) => prev - 1)}
                className="px-4 py-2 min-h-[44px] rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                ← Previous Step
              </button>
            )}
            {activeStep < 3 ? (
              <button
                type="button"
                onClick={() => setActiveStep((prev) => prev + 1)}
                className="px-5 py-2 min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
              >
                Next Step →
              </button>
            ) : null}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Done with Mini-Lesson
            </button>

            <Link
              href={`/teacher/drills/${drillId}/live`}
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume / Start Drill</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
