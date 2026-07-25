'use client';

import React from 'react';
import Link from 'next/link';
import { MembershipChecker } from '@/components/membership-checker';
import { LogIn, ShieldCheck, UserCheck, Key, ArrowRight } from 'lucide-react';

export default function PortalPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Top Banner Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00629B]/10 text-[#00629B] dark:text-blue-400 border border-[#00629B]/20">
          <ShieldCheck className="w-4 h-4" />
          <span>IEEE-MUSB Access Gateway</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Member Portal &amp; Verification Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Verify your active membership status or sign in to your authenticated IEEE-MUSB dashboard.
        </p>
      </div>

      {/* Main Grid: Membership Checker + Quick Sign In */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Public Student Membership Checker */}
        <MembershipChecker />

        {/* Right Column: Portal Sign-In Options */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Key className="w-6 h-6 text-[#00629B] dark:text-blue-400" />
              <span>Portal Sign In</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Access your digital membership card, event check-in QR code, and executive admin workspace.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs btn-ieee-primary flex items-center justify-between group shadow-md"
            >
              <div className="flex items-center gap-3">
                <LogIn className="w-4 h-4" />
                <span>Sign In to Member &amp; Admin Dashboard</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                <span>Superadmin Credentials</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Superadmin (Justin Andre De Leon) can access <code className="text-blue-500 font-mono">/admin</code> by logging in with official credentials. Fields are blank by default for security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
