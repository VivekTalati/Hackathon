'use client';

import React, { useState, useEffect } from 'react';
import { Question } from '@/types';
import { CheckCircle2, AlertCircle, HelpCircle, ArrowRight, Lightbulb, Check } from 'lucide-react';

interface QuestionRendererProps {
  question: Question;
  currentDifficulty: number;
  onAnswer: (answer: string | string[], responseTimeMs: number, reasoning?: string) => void;
  isSubmitting?: boolean;
  feedback?: {
    isCorrect: boolean;
    explanation: string;
    message: string;
  } | null;
  onNextQuestion?: () => void;
  recommendReasoning?: boolean;
}

export function QuestionRenderer({
  question,
  currentDifficulty,
  onAnswer,
  isSubmitting = false,
  feedback,
  onNextQuestion,
  recommendReasoning = false,
}: QuestionRendererProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [selectedReasoning, setSelectedReasoning] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    // Reset inputs when question changes
    setSelectedOption('');
    setNumericAnswer('');
    setShowHint(false);
    setSelectedReasoning('');
    setStartTime(Date.now());
  }, [question.id]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting || feedback) return;

    const elapsedMs = Math.max(800, Date.now() - startTime);

    if (question.type === 'multiple_choice' || question.type === 'true_false') {
      if (!selectedOption) return;
      onAnswer(selectedOption, elapsedMs, selectedReasoning);
    } else if (question.type === 'numeric' || question.type === 'short_text') {
      if (!numericAnswer.trim()) return;
      onAnswer(numericAnswer.trim(), elapsedMs, selectedReasoning);
    }
  };

  const humanDifficultyPhrases = [
    'Building the Foundations',
    'Core Practice',
    'Applying Concepts',
    'Going Deeper',
    'Challenge Problem',
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white border border-slate-200/90 rounded-3xl shadow-xs p-6 sm:p-10 space-y-6">
      {/* Header: Human-friendly Adaptive Level & Subject / Grade */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 text-sm">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            {question.gradeLevel ? `Grade ${question.gradeLevel}` : 'Practice'}
          </span>
          <span className="text-slate-600 font-medium text-xs sm:text-sm">
            {humanDifficultyPhrases[currentDifficulty - 1] || `Level ${currentDifficulty}`}
          </span>
        </div>

        {/* Adaptive level dots */}
        <div className="flex items-center gap-1.5" title={`Adaptive Difficulty: Level ${currentDifficulty} of 5`}>
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className={`h-2 rounded-full transition-all duration-300 ${
                lvl <= currentDifficulty
                  ? 'w-5 bg-indigo-600'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Prompt - Clear, High Contrast, Legible */}
      <div className="py-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
          {question.prompt}
        </h2>
      </div>

      {/* Answer Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Multiple Choice & True/False Options */}
        {question.options && question.options.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, idx) => {
              const isChosen = selectedOption === option.id;
              const isCorrectAnswer = feedback && question.correctAnswer === option.id;
              const isWrongChoice = feedback && !feedback.isCorrect && isChosen;

              let optionClasses =
                'min-h-[58px] flex items-center gap-4 px-5 py-4 rounded-2xl border text-left font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 select-none ';

              if (feedback) {
                if (isCorrectAnswer) {
                  optionClasses +=
                    'bg-emerald-50/90 border-emerald-500 text-emerald-950 shadow-xs ring-1 ring-emerald-500';
                } else if (isWrongChoice) {
                  optionClasses +=
                    'bg-rose-50/90 border-rose-300 text-rose-950';
                } else {
                  optionClasses += 'opacity-40 border-slate-200 text-slate-400';
                }
              } else if (isChosen) {
                optionClasses +=
                  'bg-indigo-50/80 border-indigo-600 text-indigo-950 shadow-xs ring-2 ring-indigo-500/80';
              } else {
                optionClasses +=
                  'border-slate-200/90 hover:border-indigo-300 hover:bg-slate-50/80 text-slate-800';
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={Boolean(feedback) || isSubmitting}
                  onClick={() => setSelectedOption(option.id)}
                  className={optionClasses}
                >
                  {/* Letter badge */}
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-xl text-xs font-bold transition-colors shrink-0 ${
                      isChosen
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>

                  {/* Option Text */}
                  <span className="flex-1 text-base sm:text-lg leading-relaxed font-normal text-slate-900">
                    {option.text}
                  </span>

                  {/* Radio Indicator (○ vs ●) or Feedback Icon */}
                  {feedback ? (
                    isCorrectAnswer ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : isWrongChoice ? (
                      <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    ) : null
                  ) : (
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isChosen
                          ? 'border-indigo-600 bg-indigo-600'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChosen && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Numeric / Short text input */}
        {(!question.options || question.options.length === 0) && (
          <div className="mt-2 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Type your answer:
            </label>
            <input
              type={question.type === 'numeric' ? 'number' : 'text'}
              disabled={Boolean(feedback) || isSubmitting}
              value={numericAnswer}
              onChange={(e) => setNumericAnswer(e.target.value)}
              placeholder="e.g. 12"
              autoFocus
              className="w-full text-2xl font-bold tracking-wide px-6 py-4 min-h-[58px] rounded-2xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
            />
          </div>
        )}

        {/* Reasoning Check: Gentle and respectful phrasing */}
        {question.reasoningOptions &&
          question.reasoningOptions.length > 0 &&
          (recommendReasoning || selectedReasoning) &&
          !feedback && (
            <div className="mt-5 p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 animate-in fade-in duration-300 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wide uppercase text-indigo-700">
                <Lightbulb className="w-4 h-4 text-indigo-600" />
                <span>{question.reasoningPrompt || 'Show your thinking (optional):'}</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {question.reasoningOptions.map((reason, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedReasoning(reason)}
                    className={`text-left text-sm p-3.5 rounded-xl border transition-all ${
                      selectedReasoning === reason
                        ? 'bg-indigo-100/80 border-indigo-500 text-indigo-950 ring-1 ring-indigo-500 font-medium'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>
          )}

        {/* Immediate Feedback Card: Calm and Pedagogical */}
        {feedback && (
          <div
            className={`p-5 sm:p-6 rounded-2xl border animate-in fade-in slide-in-from-top-2 duration-300 space-y-3 ${
              feedback.isCorrect
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3.5">
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              )}
              <div className="space-y-1">
                <p className="font-bold text-base">{feedback.message}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{feedback.explanation}</p>
              </div>
            </div>

            {/* Explicit Continue Button */}
            {onNextQuestion && (
              <div className="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={onNextQuestion}
                  className="px-6 py-3 min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm flex items-center gap-2 transition-all"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hint toggle */}
        {question.hint && !feedback && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
            </button>
            {showHint && (
              <p className="mt-2 text-sm text-slate-700 bg-amber-50/70 border border-amber-200 p-4 rounded-xl leading-relaxed">
                💡 {question.hint}
              </p>
            )}
          </div>
        )}

        {/* Submit Action button */}
        <div className="pt-2">
          {!feedback ? (
            <button
              type="submit"
              disabled={
                isSubmitting ||
                (question.options && !selectedOption) ||
                (!question.options && !numericAnswer.trim())
              }
              className="w-full sm:w-auto px-9 py-4 min-h-[50px] rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-base transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Verifying…' : 'Submit Answer'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
