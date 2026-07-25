'use client';

import React, { useState } from 'react';
import { useData } from '@/components/data-provider';
import { FolderGit2, Search, ExternalLink, Code2 } from 'lucide-react';

export default function PublicProjectsPage() {
  const { projects } = useData();
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const domains = [
    'All',
    'AI & Machine Learning',
    'Robotics & Automation',
    'IoT & Smart Cities',
    'Electrical Power Systems',
    'Telecommunications & ECE',
  ];

  const filtered = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(search.toLowerCase()) ||
      proj.description.toLowerCase().includes(search.toLowerCase()) ||
      proj.leadStudent.toLowerCase().includes(search.toLowerCase());
    const matchesDomain = selectedDomain === 'All' || proj.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-3">
          <FolderGit2 className="w-8 h-8 text-[#00629B] dark:text-blue-400" />
          <span>Mapúa EECE Engineering Projects</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Innovative research prototypes developed by Mapúa Electrical, Electronics, and Computer Engineering students.
        </p>
      </div>

      {/* Domain Filters & Search */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects or lead students..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00629B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedDomain === dom
                  ? 'bg-[#00629B] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="glass-panel rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-lg space-y-4 hover:shadow-xl transition-all"
          >
            <div className="space-y-3">
              <div className="h-48 w-full bg-slate-900 relative overflow-hidden">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00629B] text-white">
                  {proj.domain}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                  {proj.description}
                </p>

                <div className="text-xs font-mono text-[#00629B] dark:text-blue-400 font-semibold">
                  Lead Student: {proj.leadStudent}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
