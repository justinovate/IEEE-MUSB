'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IEEELogo } from '@/components/ieee-logo';
import { useData } from '@/components/data-provider';
import { MembershipChecker } from '@/components/membership-checker';
import {
  Bell,
  Calendar,
  FolderGit2,
  Users,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Pin,
  Search,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export default function HomePage() {
  const { announcements, events, projects } = useData();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter announcements
  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesSearch =
      ann.title.toLowerCase().includes(search.toLowerCase()) ||
      ann.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || ann.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredEvent = events.find((e) => e.status === 'Upcoming') || events[0];

  // Event Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isConcluded, setIsConcluded] = useState(false);

  useEffect(() => {
    if (!featuredEvent) return;

    const calculateRemainingTime = () => {
      const target = new Date(featuredEvent.targetDate).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsConcluded(true);
        return false; // Stop timer
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
        setIsConcluded(false);
        return true; // Continue timer
      }
    };

    const isRunning = calculateRemainingTime();
    if (!isRunning) return; // Do not start interval if event is already concluded

    const interval = setInterval(() => {
      const shouldContinue = calculateRemainingTime();
      if (!shouldContinue) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [featuredEvent?.targetDate]);

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 shadow-xl">
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00629B]/15 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C41E3A]/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00629B]/10 text-[#00629B] dark:text-blue-400 border border-[#00629B]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MAPÚA UNIVERSITY STUDENT BRANCH • EST. 2002</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Engineering Excellence &amp; Leadership at{' '}
            <span className="text-gradient-ieee">Mapúa University</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Official Management System and Member Portal for the IEEE - Mapúa University Student Branch (IEEE-MUSB). Empowering engineering students in Intramuros, Manila through technical innovation and student leadership.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/login"
              className="px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider btn-ieee-primary flex items-center gap-2 shadow-lg shadow-[#00629B]/20"
            >
              <span>Member Portal Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="px-6 py-3.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-300 dark:border-slate-800 flex items-center gap-2"
            >
              <span>Learn About IEEE-MUSB</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Public Student Membership Status Verification Widget */}
      <section className="space-y-4">
        <MembershipChecker />
      </section>

      {/* Featured Event Live Countdown */}
      {featuredEvent && (
        <section className="p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Calendar className="w-3.5 h-3.5" />
                <span>{isConcluded ? 'FEATURED EVENT' : 'UPCOMING FEATURED WORKSHOP'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {featuredEvent.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                {featuredEvent.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C41E3A]" />
                  {featuredEvent.venue}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  Capacity: {featuredEvent.capacity} seats
                </span>
              </div>
            </div>

            {/* Live Countdown Timer Grid */}
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                {isConcluded ? 'Event Status' : 'Event Starts In'}
              </div>

              {!isConcluded ? (
                <div className="grid grid-cols-4 gap-2 text-center font-mono">
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
                    <div className="text-[9px] text-slate-400">DAYS</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
                    <div className="text-[9px] text-slate-400">HRS</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
                    <div className="text-[9px] text-slate-400">MINS</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-2xl font-bold text-emerald-400">{timeLeft.seconds}</div>
                    <div className="text-[9px] text-slate-400">SECS</div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>EVENT CONCLUDED</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Registration for this event has closed.
                  </div>
                </div>
              )}

              <Link
                href="/events"
                className="w-full py-2.5 rounded-xl text-xs font-bold btn-ieee-primary block"
              >
                {isConcluded ? 'Browse Upcoming Events' : 'Register / RSVP Event'}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Announcements Feed Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-[#00629B] dark:text-blue-400" />
              <span>Official Announcement Feed</span>
            </h2>
            <p className="text-xs text-slate-500">
              Live updates directly synchronized from the IEEE-MUSB Admin Portal
            </p>
          </div>

          <Link
            href="/announcements"
            className="text-xs font-bold text-[#00629B] dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All Notices</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Announcements List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAnnouncements.slice(0, 4).map((ann) => (
            <div
              key={ann.id}
              className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 hover:shadow-lg transition-shadow relative"
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

              <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                {ann.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                {ann.content}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>By {ann.author}</span>
                <span>{ann.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FolderGit2 className="w-6 h-6 text-[#C41E3A]" />
              <span>Mapúa Engineering Research &amp; Projects</span>
            </h2>
            <p className="text-xs text-slate-500">
              Student engineering prototypes across AI, Robotics, IoT, EE, and ECE
            </p>
          </div>

          <Link
            href="/projects"
            className="text-xs font-bold text-[#00629B] dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 space-y-4 hover:shadow-xl transition-all"
            >
              <div className="h-44 w-full bg-slate-900 relative overflow-hidden">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00629B] text-white">
                  {proj.domain}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {proj.description}
                </p>
                <div className="text-[11px] font-mono text-[#00629B] dark:text-blue-400">
                  Lead: {proj.leadStudent}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
