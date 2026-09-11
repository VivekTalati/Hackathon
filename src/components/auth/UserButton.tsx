'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { AccountModal } from '@/components/auth/AccountModal';
import {
  LogOut,
  Settings,
  ChevronDown,
  ShieldCheck,
  GraduationCap,
  BookOpen,
} from 'lucide-react';

export function UserButton() {
  const router = useRouter();
  const { currentUser, logoutUser } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logoutUser();
    setIsOpen(false);
    // Remove session cookie
    document.cookie = 'skillsense_session=; path=/; max-age=0';
    document.cookie = 'skillsense_role=; path=/; max-age=0';
    router.push('/login');
  };

  const getRoleIcon = (role: string) => {
    if (role === 'teacher') return <BookOpen className="w-3.5 h-3.5 text-indigo-600" />;
    if (role === 'student') return <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />;
    return <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />;
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Clerk-Style Avatar Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        >
          {currentUser.avatarUrl ? (
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-xs"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {currentUser.name.charAt(0)}
            </div>
          )}

          <div className="hidden md:block text-left pr-1">
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {currentUser.name}
            </p>
            <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
              {currentUser.role}
            </span>
          </div>

          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-slate-700' : ''
            }`}
          />
        </button>

        {/* Clerk Dropdown Popover */}
        {isOpen && (
          <div className="absolute right-0 mt-3 w-72 bg-white rounded-3xl border border-slate-200/90 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Header Profile Info */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-indigo-700 shadow-xs">
                  {getRoleIcon(currentUser.role)}
                  <span>{currentUser.role}</span>
                </span>
                <span className="text-[11px] text-slate-400">SkillSense Academy</span>
              </div>
            </div>

            {/* Actions Menu */}
            <div className="p-2 space-y-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsAccountModalOpen(true);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 flex items-center gap-2.5 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Manage account</span>
              </button>
            </div>

            {/* Sign Out Footer */}
            <div className="p-2 border-t border-slate-100 bg-slate-50/40">
              <button
                onClick={handleLogout}
                className="w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Account Details Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />
    </>
  );
}
