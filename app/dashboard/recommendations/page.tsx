'use client';

import React, { useState } from 'react';
import { Sparkles, Target, Award, ArrowRight, CheckCircle2, Cpu, Zap, Wifi, ShieldCheck } from 'lucide-react';
import { matchStudentActivities } from '@/lib/ai-service';

export default function AIActivityMatcherPage() {
  const [major, setMajor] = useState('Computer Engineering (CpE)');
  const [interests, setInterests] = useState<string[]>(['Microcontrollers', 'AI/ML']);
  const [recommendations, setRecommendations] = useState<ReturnType<typeof matchStudentActivities>>([]);
  const [isMatching, setIsMatching] = useState(false);

  const interestOptions = [
    'Microcontrollers & Embedded',
    'AI & Machine Learning',
    'PCB Design & Circuit Layout',
    'Electrical Power & Smart Grids',
    'Telecommunications & Wireless',
    'Executive Leadership & Event Ops',
  ];

  const toggleInterest = (opt: string) => {
    if (interests.includes(opt)) {
      setInterests(interests.filter((i) => i !== opt));
    } else {
      setInterests([...interests, opt]);
    }
  };

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    setTimeout(() => {
      setRecommendations(matchStudentActivities(major, interests));
      setIsMatching(false);
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00629B]/10 text-[#00629B] dark:text-blue-400 border border-[#00629B]/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>IEEE-MUSB AI Activity &amp; R&amp;D Matcher</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Find Your Perfect Engineering Activity Match
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Select your Mapúa EECE major and technical interests to receive tailored workshop &amp; project recommendations.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
        <form onSubmit={handleMatch} className="space-y-6 text-xs">
          {/* Major Select */}
          <div className="space-y-2">
            <label className="font-bold text-slate-900 dark:text-white text-sm">
              Mapúa Engineering Program Track
            </label>
            <select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold"
            >
              <option value="Computer Engineering (CpE)">Computer Engineering (CpE)</option>
              <option value="Electrical Engineering (EE)">Electrical Engineering (EE)</option>
              <option value="Electronics Engineering (ECE)">Electronics Engineering (ECE)</option>
            </select>
          </div>

          {/* Technical Interests */}
          <div className="space-y-2">
            <label className="font-bold text-slate-900 dark:text-white text-sm">
              Technical &amp; Leadership Interests
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {interestOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleInterest(opt)}
                  className={`p-3 rounded-2xl border text-left font-medium transition-all ${
                    interests.includes(opt)
                      ? 'bg-[#00629B] text-white border-blue-400 font-bold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isMatching}
            className="w-full py-4 rounded-2xl font-bold text-xs btn-ieee-primary flex items-center justify-center gap-2 shadow-lg shadow-[#00629B]/20"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isMatching ? 'AI Calculating Optimal Activity Matches...' : 'Generate AI Tailored Activity Recommendations'}</span>
          </button>
        </form>
      </div>

      {/* Recommendations Output Grid */}
      {recommendations.length > 0 && (
        <div className="space-y-4 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" />
              <span>AI Recommended Activities &amp; R&amp;D Projects</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">Matched for {major}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      {item.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      {item.matchScore}% MATCH
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    💡 <span className="font-semibold text-slate-900 dark:text-white">Why AI Matched This:</span> {item.reason}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#00629B] dark:text-blue-400">
                  <span>IEEE-MUSB Project</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
