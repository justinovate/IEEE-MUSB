'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, FileText, Share2, ArrowRight } from 'lucide-react';
import { generateAnnouncementFromNotes } from '@/lib/ai-service';

export default function AIAnnouncementGeneratorPage() {
  const [rawNotes, setRawNotes] = useState(
    `IEEE-MUSB Mini-MSDT 2026 Leadership Bootcamp
Date: August 30, 2026 at 10:00 AM
Venue: Mapúa AV Hall (Admin Building, 2nd Floor)
Topics: Executive Leadership, Event Operations, Finance & Sponsorships, R&D Project Planning
Open to: EE, ECE, CpE students`
  );

  const [generatedMarkdown, setGeneratedMarkdown] = useState('');
  const [facebookCaption, setFacebookCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedFb, setCopiedFb] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawNotes.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const res = generateAnnouncementFromNotes(rawNotes);
      setGeneratedMarkdown(res.markdown);
      setFacebookCaption(res.facebookCaption);
      setIsGenerating(false);
    }, 600);
  };

  const copyToClipboard = (text: string, type: 'md' | 'fb') => {
    navigator.clipboard.writeText(text);
    if (type === 'md') {
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    } else {
      setCopiedFb(true);
      setTimeout(() => setCopiedFb(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <span>AI Announcement &amp; Social Media Caption Generator</span>
        </h1>
        <p className="text-xs text-slate-400">
          Transform raw officer meeting notes into formatted Markdown announcements &amp; Facebook captions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Input Notes */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Raw Meeting Notes / Draft Outline</span>
            </h2>
            <span className="text-[10px] font-mono text-slate-400">Paste officer bullet points</span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 text-xs">
            <textarea
              rows={10}
              value={rawNotes}
              onChange={(e) => setRawNotes(e.target.value)}
              placeholder="Paste event title, date, venue, agenda bullet points..."
              className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 text-white font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#00629B]"
            />

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 rounded-2xl font-bold text-xs btn-ieee-primary flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isGenerating ? 'AI Generating Formatted Captions...' : 'Generate Markdown & Facebook Caption'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: AI Output Captions */}
        <div className="space-y-6">
          {/* Generated Markdown Bulletin */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-xs text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Website Markdown Bulletin</span>
              </span>

              {generatedMarkdown && (
                <button
                  onClick={() => copyToClipboard(generatedMarkdown, 'md')}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-mono text-[10px] flex items-center gap-1 border border-slate-700"
                >
                  {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMd ? 'Copied!' : 'Copy Markdown'}</span>
                </button>
              )}
            </div>

            <textarea
              readOnly
              rows={6}
              value={generatedMarkdown || 'Click "Generate" above to create website Markdown format.'}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs leading-relaxed"
            />
          </div>

          {/* Generated Facebook Caption */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-xs text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-400" />
                <span>Facebook Social Media Caption</span>
              </span>

              {facebookCaption && (
                <button
                  onClick={() => copyToClipboard(facebookCaption, 'fb')}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-mono text-[10px] flex items-center gap-1 border border-slate-700"
                >
                  {copiedFb ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedFb ? 'Copied!' : 'Copy FB Caption'}</span>
                </button>
              )}
            </div>

            <textarea
              readOnly
              rows={6}
              value={facebookCaption || 'Click "Generate" above to create Facebook social post.'}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
