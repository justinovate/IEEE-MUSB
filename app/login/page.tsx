'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IEEELogo } from '@/components/ieee-logo';
import { Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      // Verify Superadmin account
      if (email === 'webdev.ieeemusb@gmail.com' && password === 'ItripsMUSB2026') {
        router.push('/admin');
      } else if (email && password) {
        router.push('/dashboard');
      } else {
        setErrorMsg('Please enter valid email and password.');
      }
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-grid-pattern">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl space-y-6 shadow-xl border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <IEEELogo size="lg" showText={false} />
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            IEEE-MUSB Portal Login
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Sign in with your official IEEE-MUSB student or officer credentials
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ieeemapuasb@gmail.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00629B]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <a href="#" className="text-[11px] text-[#00629B] dark:text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00629B]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider btn-ieee-primary flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
          Need an account?{' '}
          <Link href="/about" className="text-[#00629B] dark:text-blue-400 font-medium hover:underline">
            Contact IEEE-MUSB Officer Roster
          </Link>
        </div>
      </div>
    </div>
  );
}
