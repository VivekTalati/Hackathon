'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ArrowRight, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';

export default function StudentJoinPage() {
  const router = useRouter();
  const { classes, drills } = useApp();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    const matchedClass = classes.find((c) => c.code.toUpperCase() === cleanCode);

    if (!matchedClass) {
      setError('Classroom code not recognized. Check with your teacher.');
      return;
    }

    // Direct to the class active drill or default demo drill
    const targetDrill = drills.find((d) => d.classId === matchedClass.id) || drills[0];
    router.push(`/student/drills/${targetDrill.id}`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xs space-y-8">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Enter Classroom Code
          </h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Ask your teacher for the 6-letter room code (e.g. <strong className="text-indigo-600 font-bold">MATH6A</strong>)
          </p>
        </div>

        <form onSubmit={handleJoin} className="space-y-5">
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              maxLength={8}
              placeholder="MATH6A"
              className="w-full text-center text-3xl font-mono uppercase tracking-widest px-4 py-4 rounded-2xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
            />
            {error && (
              <p className="mt-2.5 text-xs text-rose-500 font-medium flex items-center gap-1 justify-center">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!code.trim()}
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-base shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2"
          >
            <span>Join Practice Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-500">Available demo classes ready to join:</p>
          <div className="flex justify-center gap-2 pt-1">
            {classes.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCode(c.code)}
                className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-indigo-600 hover:border-indigo-400 shadow-xs transition-all"
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
