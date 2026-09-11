'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Brain,
  WifiOff,
} from 'lucide-react';
import { UserButton } from '@/components/auth/UserButton';

export function NavigationHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logoutUser, isOnline } = useApp();

  const isTeacher = currentUser.role === 'teacher';
  const isStudent = currentUser.role === 'student';
  const isAdmin = currentUser.role === 'admin';

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-colors">
      {/* Offline banner if connection is lost */}
      {!isOnline && (
        <div className="bg-amber-500 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Connection interrupted. Your progress is safe and cached. Reconnecting…</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                Skill<span className="text-indigo-600">Sense</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 font-semibold -mt-1 tracking-wider uppercase">
                Know What to Practice Next
              </span>
            </div>
          </Link>

          {/* Role-based navigation links */}
          <nav className="hidden md:flex items-center gap-2 pl-6 border-l border-slate-200">
            {isTeacher && (
              <>
                <Link
                  href="/teacher"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === '/teacher'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/teacher/classes"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname.startsWith('/teacher/classes')
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  Classes
                </Link>
                <Link
                  href="/teacher/drills/new"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === '/teacher/drills/new'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  Launch Drill
                </Link>
                <Link
                  href="/teacher/question-bank"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === '/teacher/question-bank'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  Question Bank
                </Link>
                <Link
                  href="/teacher/insights"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === '/teacher/insights'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  Insights & Interventions
                </Link>
              </>
            )}

            {isStudent && (
              <>
                <Link
                  href="/student"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === '/student'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  Student Hub
                </Link>
                <Link
                  href="/student/join"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === '/student/join'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  Join Drill
                </Link>
                <Link
                  href="/student/progress"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === '/student/progress'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  My Growth
                </Link>
                <Link
                  href="/student/achievements"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === '/student/achievements'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  Milestones
                </Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link
                  href="/admin"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === '/admin'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  School Overview
                </Link>
                <Link
                  href="/admin/content"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === '/admin/content'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  Curriculum & Subjects
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Right side controls: Clerk-Style UserButton */}
        <div className="flex items-center gap-4">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
