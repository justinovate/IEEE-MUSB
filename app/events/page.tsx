'use client';

import React, { useState } from 'react';
import { useData } from '@/components/data-provider';
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { EventData } from '@/data/events';

export default function PublicEventsPage() {
  const { events } = useData();
  const [rsvpEvent, setRsvpEvent] = useState<EventData | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [studentNo, setStudentNo] = useState('');
  const [studentName, setStudentName] = useState('');

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpEvent(null);
      setStudentNo('');
      setStudentName('');
    }, 1500);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-3">
          <Calendar className="w-8 h-8 text-emerald-500" />
          <span>IEEE-MUSB Events &amp; Workshops</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Hands-on KiCAD PCB workshops, Mini-MSDT leadership bootcamps, and STEP technical summits.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="glass-panel rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-lg space-y-4 hover:shadow-xl transition-all"
          >
            <div className="space-y-3 p-6">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-[#00629B] dark:text-blue-400">
                  {evt.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                    evt.status === 'Upcoming'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  }`}
                >
                  {evt.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {evt.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                {evt.description}
              </p>

              <div className="space-y-1.5 text-xs text-slate-500 font-mono pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C41E3A]" />
                  <span>{evt.venue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00629B]" />
                  <span>{new Date(evt.targetDate).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Capacity: {evt.capacity} Mapúa EECE seats</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setRsvpEvent(evt)}
                className="w-full py-2.5 rounded-xl text-xs font-bold btn-ieee-primary flex items-center justify-center gap-2"
              >
                <span>RSVP &amp; Register Seat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RSVP Registration Modal */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                RSVP Registration
              </h3>
              <button
                onClick={() => setRsvpEvent(null)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {rsvpSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  RSVP Confirmed!
                </div>
                <div className="text-xs text-slate-500">
                  Your seat for <strong className="text-slate-900 dark:text-white">{rsvpEvent.title}</strong> is reserved.
                </div>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-[#00629B]/20 text-[#00629B] dark:text-blue-400 font-bold">
                  Event: {rsvpEvent.title}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    required
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Juan Dela Cruz"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Mapúa Student Number</label>
                  <input
                    required
                    type="text"
                    value={studentNo}
                    onChange={(e) => setStudentNo(e.target.value)}
                    placeholder="2023101234"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-bold btn-ieee-primary mt-2"
                >
                  Confirm Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
