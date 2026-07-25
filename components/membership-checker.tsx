'use client';

import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, XCircle, AlertCircle, ArrowRight, UserCheck, Sparkles } from 'lucide-react';

interface MemberRecord {
  studentNumber: string;
  fullName: string;
  program: string;
  status: 'Active' | 'Inactive' | 'Expiring';
  ieeeNo: string;
  role: string;
  validUntil: string;
}

const SAMPLE_DATABASE: MemberRecord[] = [
  {
    studentNumber: '2022109876',
    fullName: 'Justin Andre De Leon',
    program: 'Computer Engineering (CpE)',
    status: 'Active',
    ieeeNo: 'IEEE-99887766',
    role: 'Admin / Web Developer',
    validUntil: 'AY 2025–2026',
  },
  {
    studentNumber: '2022104321',
    fullName: 'Levie Yancy R. Cruz',
    program: 'Electrical Engineering (EE)',
    status: 'Active',
    ieeeNo: 'IEEE-99881122',
    role: 'Branch Chair',
    validUntil: 'AY 2025–2026',
  },
  {
    studentNumber: '2022105544',
    fullName: 'Olivia Faith P. Anore',
    program: 'Electronics Engineering (ECE)',
    status: 'Active',
    ieeeNo: 'IEEE-99883344',
    role: 'Vice-Chair Internal',
    validUntil: 'AY 2025–2026',
  },
  {
    studentNumber: '2023101122',
    fullName: 'Kirsten Freya A. Domingo',
    program: 'Computer Engineering (CpE)',
    status: 'Inactive',
    ieeeNo: 'IEEE-99885566',
    role: 'Student Member',
    validUntil: 'Expired AY 2024–2025',
  },
];

export function MembershipChecker() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<MemberRecord | null | undefined>(undefined);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const trimmed = query.trim();
    const found = SAMPLE_DATABASE.find(
      (m) => m.studentNumber === trimmed || m.studentNumber.includes(trimmed)
    );

    setResult(found || null);
    setSearched(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00629B]/10 text-[#00629B] dark:text-blue-400 border border-[#00629B]/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>IEEE-MUSB Membership Verification</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Check Your Membership Status
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Enter your Mapúa Student Number to verify your active student branch status.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Student Number (e.g. 2022109876)"
            className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#00629B]"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 rounded-2xl text-xs font-bold btn-ieee-primary shrink-0 flex items-center gap-1.5"
        >
          <span>Verify</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Sample Hint Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
        <span>Try sample Student IDs:</span>
        <button
          onClick={() => {
            setQuery('2022109876');
            setResult(SAMPLE_DATABASE[0]);
            setSearched(true);
          }}
          className="underline hover:text-[#00629B] dark:hover:text-blue-400"
        >
          2022109876
        </button>
        <span>•</span>
        <button
          onClick={() => {
            setQuery('2023101122');
            setResult(SAMPLE_DATABASE[3]);
            setSearched(true);
          }}
          className="underline hover:text-[#00629B] dark:hover:text-blue-400"
        >
          2023101122
        </button>
      </div>

      {/* Verification Result Card */}
      {searched && (
        <div className="animate-in zoom-in-95 duration-200 pt-2">
          {result ? (
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                result.status === 'Active'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                  : result.status === 'Inactive'
                  ? 'bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-200'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-500" />
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {result.fullName}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {result.program}
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 border ${
                    result.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                      : result.status === 'Inactive'
                      ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40'
                      : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40'
                  }`}
                >
                  {result.status === 'Active' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {result.status === 'Inactive' && <XCircle className="w-3.5 h-3.5" />}
                  {result.status === 'Expiring' && <AlertCircle className="w-3.5 h-3.5" />}
                  <span>{result.status.toUpperCase()} MEMBER</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                <div>
                  <span className="block text-[10px] uppercase text-slate-400">IEEE No.</span>
                  <span className="font-bold text-slate-900 dark:text-white">{result.ieeeNo}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-slate-400">Validity</span>
                  <span className="font-bold text-slate-900 dark:text-white">{result.validUntil}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2 text-slate-600 dark:text-slate-400">
              <AlertCircle className="w-6 h-6 text-amber-500 mx-auto" />
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                No Record Found for "{query}"
              </div>
              <p className="text-[11px] leading-relaxed">
                If you are a newly registered EE, ECE, or CpE student, please visit the IEEE-MUSB booth during Mapúa Org Week to verify your registration!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
