'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import {
  Brain,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Info,
  X,
  ExternalLink,
} from 'lucide-react';
import { hasClerkConfigured } from '@/lib/clerkConfig';
import { DEMO_TEACHERS, DEMO_STUDENTS, DEMO_ADMIN } from '@/data/seed';

export function ClerkAuthCard() {
  const router = useRouter();
  const { loginUser, registerUser } = useApp();
  const isClerkReady = hasClerkConfigured();

  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');
  const [teacherSchoolCode, setTeacherSchoolCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dialog state for explaining unconfigured OAuth / Forgot Password
  const [infoModal, setInfoModal] = useState<{
    title: string;
    description: string;
    setupNote: string;
  } | null>(null);

  const routeByRole = (role: string) => {
    // Set cookies for server-side Next.js middleware route protection
    document.cookie = `skillsense_session=active_${Date.now()}; path=/; max-age=86400; SameSite=Lax`;
    document.cookie = `skillsense_role=${role}; path=/; max-age=86400; SameSite=Lax`;

    if (role === 'teacher') router.push('/teacher');
    else if (role === 'student') router.push('/student');
    else router.push('/admin');
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const user = loginUser(email);
      if (!user) {
        setError('Account not found with this email. Please check your credentials or register.');
        setLoading(false);
        return;
      }
      routeByRole(user.role);
    }, 400);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (selectedRole === 'teacher') {
      const cleanCode = teacherSchoolCode.trim().toUpperCase();
      if (!cleanCode || cleanCode !== 'MATH6A') {
        setError('Teacher registration requires a valid School Affiliation Code (e.g. MATH6A).');
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      const newUser = registerUser(name, email, selectedRole);
      routeByRole(newUser.role);
    }, 450);
  };

  // Google / Microsoft SSO handler: Honest behavior per specification
  const handleSSOClick = (providerName: 'Google Workspace' | 'Microsoft 365') => {
    if (!isClerkReady) {
      setInfoModal({
        title: `${providerName} Single Sign-On`,
        description: `${providerName} SSO requires an active Clerk configuration with OAuth credentials enabled.`,
        setupNote: `To enable real ${providerName} SSO:\n1. Obtain Clerk API keys from dashboard.clerk.com and save to .env.local\n2. Navigate to Clerk Dashboard → User & Authentication → Social Connections\n3. Enable ${providerName} and enter your OAuth Client ID & Secret.`,
      });
      return;
    }

    // In a live Clerk instance with OAuth enabled, Clerk will redirect to the OAuth URL
    window.location.href = `/api/auth/oauth/${providerName.toLowerCase().replace(' ', '_')}`;
  };

  const handleForgotPasswordClick = () => {
    if (!isClerkReady) {
      setInfoModal({
        title: 'Clerk Self-Service Password Recovery',
        description: 'Secure password reset requires a live identity provider to dispatch cryptographically verified one-time passwords (OTP) or magic reset links.',
        setupNote: 'To enable real password recovery, configure NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in .env.local. SkillSense will then execute Clerk\'s official password recovery flow.',
      });
      return;
    }
  };

  const handleDemoLogin = (demoUser: { email: string; role: UserRole }) => {
    setEmail(demoUser.email);
    setPassword('••••••••••••');
    setError('');
    setLoading(true);

    setTimeout(() => {
      const user = loginUser(demoUser.email);
      if (user) routeByRole(user.role);
    }, 300);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Clerk Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-200/50 p-8 sm:p-10 space-y-7 relative">
        {/* Environment Transparency Notice if Clerk keys are absent */}
        {!isClerkReady && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Clerk Keys Not Yet Configured</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Add your keys in <code className="bg-amber-100/70 px-1 py-0.5 rounded font-mono">.env.local</code> to activate live Clerk authentication. See <strong className="underline cursor-pointer" onClick={() => window.open('CLERK_SETUP.md')}>CLERK_SETUP.md</strong>. Running in local sandbox mode.
            </p>
          </div>
        )}

        {/* Top App Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
            <Brain className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {mode === 'sign-in' ? 'Sign in to SkillSense' : 'Create your account'}
          </h1>
          <p className="text-sm text-slate-500">
            {mode === 'sign-in'
              ? 'Welcome back! Enter your institutional credentials.'
              : 'Join your classroom adaptive practice portal.'}
          </p>
        </div>

        {/* Clerk Social / SSO Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleSSOClick('Google Workspace')}
            className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 font-semibold text-xs sm:text-sm text-slate-700 transition-all flex items-center justify-center gap-3 shadow-2xs"
          >
            {/* Google G SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google Workspace</span>
          </button>

          <button
            type="button"
            onClick={() => handleSSOClick('Microsoft 365')}
            className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 font-semibold text-xs sm:text-sm text-slate-700 transition-all flex items-center justify-center gap-3 shadow-2xs"
          >
            {/* Microsoft 4-Color Grid SVG */}
            <svg className="w-4 h-4" viewBox="0 0 21 21">
              <rect x="1" y="1" width="9" height="9" fill="#f25022" />
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
              <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
              <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
            </svg>
            <span>Continue with Microsoft 365</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-xs text-slate-400 font-medium tracking-wider uppercase shrink-0">
            or continue with email
          </span>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {mode === 'sign-in' ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Institutional Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@skillsense.edu"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating…' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maria Gonzalez"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Institutional Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maria@skillsense.edu"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    selectedRole === 'student'
                      ? 'bg-emerald-50/80 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <GraduationCap className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                  <span className="text-xs font-bold block">Student Learner</span>
                  <span className="text-[10px] text-slate-400 font-normal">Practice & master skills</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('teacher')}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    selectedRole === 'teacher'
                      ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 font-bold ring-2 ring-indigo-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                  <span className="text-xs font-bold block">Educator / Teacher</span>
                  <span className="text-[10px] text-slate-400 font-normal">Launch class drills</span>
                </button>
              </div>

              {/* Admin Registration Prohibition Notice */}
              <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-500 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Admin Notice:</strong> Administrator accounts cannot be self-registered. District administrators must be invited by an authorized system admin.
                </span>
              </div>
            </div>

            {/* Teacher School Affiliation Code Requirement */}
            {selectedRole === 'teacher' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1.5">
                  School Affiliation Code
                </label>
                <input
                  type="text"
                  required
                  value={teacherSchoolCode}
                  onChange={(e) => setTeacherSchoolCode(e.target.value)}
                  placeholder="e.g. MATH6A"
                  className="w-full font-mono uppercase px-4 py-3 rounded-xl border border-indigo-300 bg-indigo-50/30 text-indigo-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Provided by your campus coordinator (Demo code: <code className="font-bold text-indigo-600">MATH6A</code>)
                </span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-xs pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Registering…' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Switch Mode Footer */}
        <div className="pt-2 text-center text-xs text-slate-500">
          {mode === 'sign-in' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('sign-up');
                  setError('');
                }}
                className="font-bold text-indigo-600 hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('sign-in');
                  setError('');
                }}
                className="font-bold text-indigo-600 hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        {/* Development Demo Shortcut Drawer */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              🧪 Development Sandbox Shortcuts
            </span>
            <span className="text-[10px] text-slate-400">Local Testing</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemoLogin(DEMO_TEACHERS[0])}
              className="p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-indigo-50/60 hover:border-indigo-300 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 mb-1 text-indigo-600">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase">Teacher</span>
              </div>
              <p className="text-xs font-bold text-slate-800 truncate">Sarah J.</p>
              <p className="text-[10px] text-slate-400 truncate">Grade 6 Lead</p>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemoLogin(DEMO_STUDENTS[0])}
              className="p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-emerald-50/60 hover:border-emerald-300 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 mb-1 text-emerald-600">
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase">Student</span>
              </div>
              <p className="text-xs font-bold text-slate-800 truncate">Alex R.</p>
              <p className="text-[10px] text-slate-400 truncate">Student Hub</p>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemoLogin(DEMO_ADMIN)}
              className="p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-blue-50/60 hover:border-blue-300 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 mb-1 text-blue-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase">Admin</span>
              </div>
              <p className="text-xs font-bold text-slate-800 truncate">Dr. Vance</p>
              <p className="text-[10px] text-slate-400 truncate">Director</p>
            </button>
          </div>
        </div>
      </div>

      {/* Honest Informational Dialog for Unconfigured Features */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{infoModal.title}</h3>
              <button
                onClick={() => setInfoModal(null)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {infoModal.description}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-mono whitespace-pre-line leading-relaxed">
              {infoModal.setupNote}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInfoModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
