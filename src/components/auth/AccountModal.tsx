'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  X,
  ShieldCheck,
  User,
  CheckCircle2,
  Lock,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { hasClerkConfigured } from '@/lib/clerkConfig';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const isClerkReady = hasClerkConfigured();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center border border-indigo-100">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{currentUser.name}</h2>
              <p className="text-xs text-slate-500">SkillSense Institutional Profile & Security</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 px-6 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'security'
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security & Sessions</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</span>
                  <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Role</span>
                  <p className="text-sm font-bold text-indigo-700 capitalize">{currentUser.role}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Institutional Email</span>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{currentUser.email}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">School / District</span>
                <p className="text-sm font-semibold text-slate-900">SkillSense Academy District 4</p>
                <p className="text-xs text-slate-400">Campus ID: {currentUser.schoolId || 'school-1'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs text-indigo-950 space-y-1">
                  <p className="font-bold">Role-Based Access Control (RBAC) Active</p>
                  <p className="text-indigo-900/80">
                    Classroom permissions, drill creation, and student analytics are locked to this verified role.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Honest Security & 2FA Status */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">Two-Factor Authentication (2FA)</p>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                    Clerk Managed
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  2FA, SMS verification, and authenticator apps are managed through Clerk's identity layer.
                  {isClerkReady
                    ? ' Configure multi-factor rules in your Clerk user security dashboard.'
                    : ' Connect Clerk keys in .env.local to enforce institutional 2FA policies.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Device Session</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-semibold text-slate-900">Current Web Session</p>
                      <p className="text-xs text-slate-400">Authenticated Browser • Active</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Active Session
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Identity Provider</p>
                  <p className="text-xs text-slate-500">
                    {isClerkReady ? 'Clerk Enterprise Production' : 'SkillSense Sandbox Identity Provider'}
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono">v3.4</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
