import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-grid-pattern">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl text-center space-y-6 border border-red-500/20 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/10 text-red-500 border border-red-500/20">
            <Lock className="w-3 h-3" />
            <span>ADMINISTRATOR RESTRICTED ACCESS</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Access Denied
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            You do not have the required <span className="font-mono text-[#00629B]">Admin</span> privileges to access the IEEE-MUSB Superadmin portal. If you are an authorized branch officer, please sign in with your Superadmin credentials.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/portal"
            className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider btn-ieee-primary flex items-center justify-center gap-2"
          >
            <span>Sign In to Superadmin Account</span>
          </Link>

          <Link
            href="/"
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
