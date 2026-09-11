'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';

export default function UnauthorizedPage() {
  const { currentUser } = useApp();

  const getAuthorizedPortal = () => {
    if (currentUser.role === 'teacher') return { name: 'Teacher Dashboard', href: '/teacher' };
    if (currentUser.role === 'student') return { name: 'Student Hub', href: '/student' };
    return { name: 'Admin Console', href: '/admin' };
  };

  const portal = getAuthorizedPortal();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xs text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            HTTP 403 • Access Restricted
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 pt-1">
            Unauthorized Portal Access
          </h1>
          <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            Your current account is authenticated as a{' '}
            <strong className="text-slate-900 capitalize font-bold">{currentUser.role}</strong> ({currentUser.email}), which does not have permission to view this workspace.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs text-slate-500 space-y-1">
          <p className="font-bold text-slate-700">Role-Based Access Control Policy:</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Student accounts can only access Student Hub and practice drills.</li>
            <li>Teacher accounts can manage class drills and live analytics.</li>
            <li>Administrator accounts manage school curriculum and district standards.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href={portal.href}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to {portal.name}</span>
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-slate-500" />
            <span>Switch Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
