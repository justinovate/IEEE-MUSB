import React from 'react';
import Link from 'next/link';
import { IEEELogo } from '@/components/ieee-logo';
import {
  ShieldCheck,
  Target,
  Eye,
  Award,
  Users,
  Building2,
  Mail,
  MapPin,
  ExternalLink,
  BookOpen,
  Cpu,
  Zap,
  Radio,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00629B]/10 text-[#00629B] dark:text-blue-400 border border-[#00629B]/20">
          <Building2 className="w-3.5 h-3.5" />
          <span>ESTABLISHED 2002 • INTRAMUROS, MANILA</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          IEEE - Mapúa University <br />
          <span className="text-gradient-ieee">Student Branch (IEEE-MUSB)</span>
        </h1>

        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          The premier professional student organization of Mapúa University dedicated to advancing technical excellence, innovation, and leadership across Electrical Engineering, Electronics Engineering, Computer Engineering, and allied technical disciplines.
        </p>

        {/* Program Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-[#00629B]/30 flex items-center gap-2 text-xs font-bold text-[#00629B] dark:text-blue-400">
            <Zap className="w-4 h-4 text-[#C41E3A]" />
            <span>Electrical Engineering (EE)</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-[#00629B]/30 flex items-center gap-2 text-xs font-bold text-[#00629B] dark:text-blue-400">
            <Radio className="w-4 h-4 text-blue-500" />
            <span>Electronics Engineering (ECE)</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-[#00629B]/30 flex items-center gap-2 text-xs font-bold text-[#00629B] dark:text-blue-400">
            <Cpu className="w-4 h-4 text-emerald-500" />
            <span>Computer Engineering (CpE)</span>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-[#00629B] dark:text-blue-400 w-fit">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To foster technical ingenuity, professional integrity, and leadership among Mapúa engineering students by providing hands-on workshops, research opportunities, global IEEE networking, and community-driven technology initiatives.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="p-3 rounded-2xl bg-[#C41E3A]/10 text-[#C41E3A] w-fit">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To be recognized as the premier IEEE Student Branch in the Philippines, producing world-class Electrical, Electronics, and Computer Engineers empowered to solve global technological challenges with high ethical standards.
          </p>
        </div>
      </div>

      {/* 5 Core Pillars */}
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Our Core Pillars &amp; Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'Professionalism', desc: 'High standards of engineering rigor and ethics.' },
            { title: 'Integrity', desc: 'Unwavering accountability in research and practice.' },
            { title: 'Leadership', desc: 'Empowering future engineering directors & innovators.' },
            { title: 'Esprit de Corps', desc: 'Unbreakable fellowship among Mapúa engineering peers.' },
            { title: 'Remuneration', desc: 'Rewarding hard work, service, and technical impact.' },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 space-y-2 text-left hover:border-[#00629B] transition-colors"
            >
              <div className="text-xs font-mono font-bold text-[#00629B] dark:text-blue-400">
                PILLAR 0{idx + 1}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-500">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
