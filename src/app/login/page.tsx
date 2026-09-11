'use client';

import React from 'react';
import Link from 'next/link';
import { ClerkAuthCard } from '@/components/auth/ClerkAuthCard';

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle ambient light aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full">
        <ClerkAuthCard />
      </div>

      {/* Trust & compliance badge */}
      <div className="mt-8 text-center text-xs text-slate-400">
        <span>Protected by SkillSense Identity • FERPA & COPPA Compliant</span>
      </div>
    </div>
  );
}
