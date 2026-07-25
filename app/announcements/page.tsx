'use client';

import React, { useState } from 'react';
import { useData } from '@/components/data-provider';
import { Bell, Search, Pin, Calendar, User, ArrowRight, X } from 'lucide-react';
import { AnnouncementData } from '@/data/announcements';

export default function PublicAnnouncementsPage() {
  const { announcements } = useData();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAnn, setSelectedAnn] = useState<AnnouncementData | null>(null);

  const categories = ['All', 'General', 'Workshops', 'Competitions', 'Membership Notices', 'Urgent'];

  const filtered = announcements.filter((ann) => {
    const matchesSearch =
      ann.title.toLowerCase().includes(search.toLowerCase()) ||
      ann.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || ann.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-3">
          <Bell className="w-8 h-8 text-[#00629B] dark:text-blue-400" />
          <span>IEEE-MUSB Announcement Feed</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Official notices, workshop registration deadlines, STEP events, and Mapúa EECE branch updates.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search announcements..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00629B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#00629B] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((ann) => (
          <div
            key={ann.id}
            onClick={() => setSelectedAnn(ann)}
            className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 cursor-pointer hover:border-[#00629B] transition-all relative group shadow-md"
          >
            {ann.isPinned && (
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-bold font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                <Pin className="w-3 h-3" />
                <span>PINNED</span>
              </div>
            )}

            <span className="badge-mapua px-2.5 py-0.5 rounded text-[10px] font-mono font-bold inline-block">
              {ann.category}
            </span>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#00629B] dark:group-hover:text-blue-400 transition-colors">
              {ann.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
              {ann.content}
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3 text-blue-400" />
                {ann.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {ann.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog Reader */}
      {selectedAnn && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="badge-mapua px-2.5 py-0.5 rounded text-[10px] font-mono font-bold">
                {selectedAnn.category}
              </span>
              <button
                onClick={() => setSelectedAnn(null)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {selectedAnn.title}
            </h2>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-2 whitespace-pre-line">
              {selectedAnn.content}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Published by {selectedAnn.author}</span>
              <span>{selectedAnn.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
