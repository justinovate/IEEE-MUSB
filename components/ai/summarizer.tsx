'use client';

import React, { useState } from 'react';
import { Sparkles, FileText, X } from 'lucide-react';
import { summarizeAnnouncementText } from '@/lib/ai-service';

interface AISummarizerProps {
  content: string;
  title: string;
}

export function AISummarizer({ content, title }: AISummarizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = () => {
    setLoading(true);
    setIsOpen(true);
    setTimeout(() => {
      setSummary(summarizeAnnouncementText(content));
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <button
        onClick={handleSummarize}
        className="px-3 py-1.5 rounded-xl text-[11px] font-bold font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-colors inline-flex items-center gap-1.5"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Summarize with AI</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI Announcement Executive Summary</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-sm text-slate-900 dark:text-white">{title}</div>
              {loading ? (
                <div className="p-4 text-xs font-mono text-slate-500 animate-pulse">
                  AI generating executive summary...
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                  {summary}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
