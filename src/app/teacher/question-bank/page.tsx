'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, Plus, Check, Filter, Search, BookOpen, Layers } from 'lucide-react';
import { Question, SubjectId } from '@/types';

export default function QuestionBankPage() {
  const { questions, subjects, addGeneratedQuestion } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('math');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | 'all'>('all');

  // AI Generator Form Modal State
  const [showAiModal, setShowAiModal] = useState(false);
  const [genTopic, setGenTopic] = useState('fractions');
  const [genSkill, setGenSkill] = useState('skill-unlike-denominators');
  const [genDifficulty, setGenDifficulty] = useState(3);
  const [genGrade, setGenGrade] = useState(6);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<Question | null>(null);

  const filteredQuestions = questions.filter((q) => {
    if (selectedSubject && q.subjectId !== selectedSubject) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim()) {
      const match =
        q.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  const handleGenerateAIQuestion = () => {
    setIsGenerating(true);
    // Simulate high-performance validated educational AI generation
    setTimeout(() => {
      const sampleAIQuestion: Question = {
        id: `ai-q-${Date.now()}`,
        subjectId: selectedSubject,
        topicId: genTopic,
        skillId: genSkill,
        gradeLevel: genGrade,
        difficulty: genDifficulty,
        type: 'multiple_choice',
        prompt: `In a science lab, a beaker has 3/8 L of saline and another has 1/6 L. What is the total volume combined?`,
        options: [
          { id: 'a', text: '13/24 L' },
          { id: 'b', text: '4/14 L' },
          { id: 'c', text: '5/12 L' },
          { id: 'd', text: '7/24 L' },
        ],
        correctAnswer: 'a',
        explanation:
          'Least common denominator for 8 and 6 is 24. 3/8 = 9/24, 1/6 = 4/24. 9/24 + 4/24 = 13/24 L.',
        hint: 'Find the lowest common denominator between 8 and 6 (which is 24).',
        estimatedSeconds: 24,
        misconceptionTags: ['adds_denominators_directly'],
        reasoningPrompt: 'How did you determine the denominator?',
        reasoningOptions: [
          'Found LCD of 8 and 6 (24)',
          'Multiplied 8 by 6 (48) and simplified',
          'Added bottom numbers 8 + 6',
        ],
      };

      setGeneratedPreview(sampleAIQuestion);
      setIsGenerating(false);
    }, 1200);
  };

  const handleSaveAIQuestion = () => {
    if (generatedPreview) {
      addGeneratedQuestion(generatedPreview);
      setGeneratedPreview(null);
      setShowAiModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Curriculum Question Bank
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Data-driven question repository across Mathematics, Logic, Science, Language & CS.
          </p>
        </div>

        <button
          onClick={() => setShowAiModal(true)}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate with Educational AI</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Subject tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubject === sub.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Search & Difficulty filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) =>
              setSelectedDifficulty(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="text-xs py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
          >
            <option value="all">All Difficulties</option>
            <option value="1">Level 1 (Beginner)</option>
            <option value="2">Level 2 (Core)</option>
            <option value="3">Level 3 (Application)</option>
            <option value="4">Level 4 (Advanced)</option>
            <option value="5">Level 5 (Challenge)</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                  Grade {q.gradeLevel} • Lvl {q.difficulty}
                </span>
                <span className="text-xs text-slate-400 capitalize">{q.type.replace('_', ' ')}</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-base leading-snug">
                {q.prompt}
              </h3>
              {q.options && (
                <div className="mt-3 space-y-1">
                  {q.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`text-xs px-3 py-1.5 rounded-lg flex items-center justify-between ${
                        opt.id === q.correctAnswer
                          ? 'bg-emerald-50 text-emerald-800 font-semibold'
                          : 'text-slate-600 bg-slate-50'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {opt.id === q.correctAnswer && <Check className="w-3.5 h-3.5" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-medium text-slate-700">Explanation:</span> {q.explanation}
            </div>
          </div>
        ))}
      </div>

      {/* AI Question Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200/90 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  AI Question Generator & Validator
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowAiModal(false);
                  setGeneratedPreview(null);
                }}
                className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {!generatedPreview ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specify topic, grade, and target difficulty. The AI engine synthesizes curriculum-aligned questions equipped with explanations and misconception tags.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Grade Level
                    </label>
                    <select
                      value={genGrade}
                      onChange={(e) => setGenGrade(Number(e.target.value))}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="5">Grade 5</option>
                      <option value="6">Grade 6</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Target Difficulty
                    </label>
                    <select
                      value={genDifficulty}
                      onChange={(e) => setGenDifficulty(Number(e.target.value))}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="1">Level 1 (Foundations)</option>
                      <option value="2">Level 2 (Core)</option>
                      <option value="3">Level 3 (Application)</option>
                      <option value="4">Level 4 (Advanced)</option>
                      <option value="5">Level 5 (Challenge)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={handleGenerateAIQuestion}
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGenerating ? 'Generating & Validating…' : 'Synthesize Candidate Question'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    Validated Candidate Preview
                  </span>
                  <p className="font-bold text-slate-900 text-sm">
                    {generatedPreview.prompt}
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-800">Explanation:</strong> {generatedPreview.explanation}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setGeneratedPreview(null)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={handleSaveAIQuestion}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                  >
                    Approve & Save to Question Bank
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
