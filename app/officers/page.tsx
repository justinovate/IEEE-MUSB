'use client';

import React, { useState } from 'react';
import { useData } from '@/components/data-provider';
import { Users, Layers, Award, ShieldCheck, Mail } from 'lucide-react';

export default function PublicOfficersPage() {
  const { officers } = useData();
  const [activeTab, setActiveTab] = useState<'current' | 'archived'>('current');
  const [selectedCommittee, setSelectedCommittee] = useState('All');

  const committees = [
    'All',
    'Executive Committee',
    'Board of Directors',
    'Finance Committee',
    'Membership Committee',
    'Program Committee',
    'Publicity Committee',
    'Research & Development Committee',
  ];

  const displayedOfficers = officers.filter((off) => {
    const matchesTab = activeTab === 'current' ? off.isCurrent : !off.isCurrent;
    const matchesComm = selectedCommittee === 'All' || off.committee === selectedCommittee;
    return matchesTab && matchesComm;
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-3">
          <Users className="w-8 h-8 text-[#C41E3A]" />
          <span>IEEE-MUSB Officer Roster</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Official leadership across all 7 committees of IEEE - Mapúa University Student Branch (AY 2025–2026).
        </p>
      </div>

      {/* Term & Committee Filter Tabs */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'current'
                ? 'bg-[#00629B] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Active Officers (AY 2025–2026)
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'archived'
                ? 'bg-[#00629B] text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Past Officers Archive
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          {committees.map((comm) => (
            <button
              key={comm}
              onClick={() => setSelectedCommittee(comm)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedCommittee === comm
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {comm}
            </button>
          ))}
        </div>
      </div>

      {/* Officers Roster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedOfficers.map((officer) => (
          <div
            key={officer.id}
            className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-lg hover:shadow-xl transition-all relative group"
          >
            <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#00629B] to-[#C41E3A] shadow-md overflow-hidden">
              <img
                src={officer.photoUrl}
                alt={officer.name}
                className="w-full h-full rounded-full object-cover bg-slate-800"
              />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                {officer.name}
              </h3>
              <div className="text-xs font-bold text-[#00629B] dark:text-blue-400">
                {officer.position}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {officer.committee}
              </div>
              {officer.program && (
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {officer.program}
                </span>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-slate-400">
              Term: {officer.term}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
