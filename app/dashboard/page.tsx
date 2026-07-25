'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IEEELogo } from '@/components/ieee-logo';
import {
  User,
  ShieldCheck,
  QrCode,
  Calendar,
  Clock,
  Award,
  RotateCw,
  CheckCircle2,
  Download,
  ExternalLink,
  MapPin,
  Camera,
  Upload,
  Sparkles,
} from 'lucide-react';

export default function MemberDashboard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState<'attendance' | 'hours' | 'certificates'>('attendance');
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Profile State with Avatar Upload
  const [memberProfile, setMemberProfile] = useState({
    fullName: 'Justin Andre De Leon',
    studentNumber: '2022109876',
    program: 'CpE', // Computer Engineering (EECE)
    yearLevel: '4th Year',
    ieeeMembershipNo: 'IEEE-99887766',
    status: 'Active',
    role: 'Admin / Web Developer',
    committee: 'Research and Development',
    volunteerHours: 120.5,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JustinDeLeon',
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setMemberProfile({ ...memberProfile, avatarUrl: newUrl });
    }
  };

  const attendanceLogs = [
    {
      id: 'att-1',
      eventName: 'IEEE-MUSB Mini-MSDT 2026 Bootcamp',
      date: '2026-07-22',
      checkInTime: '08:45 AM',
      venue: 'Mapúa AV Hall, Intramuros',
      hoursGranted: 6.0,
    },
    {
      id: 'att-2',
      eventName: 'Hands-On KiCAD PCB Design Workshop',
      date: '2026-07-10',
      checkInTime: '01:15 PM',
      venue: 'ECE Simulation Lab 304',
      hoursGranted: 4.0,
    },
    {
      id: 'att-3',
      eventName: 'IEEE Student Summit 2026',
      date: '2026-06-18',
      checkInTime: '09:00 AM',
      venue: 'Mapúa Gymnasium',
      hoursGranted: 8.0,
    },
  ];

  const certificates = [
    {
      id: 'cert-1',
      title: 'Certificate of Completion: KiCAD PCB Design',
      issuedDate: '2026-07-10',
      issuer: 'IEEE-MUSB Research & Development Committee',
      code: 'CERT-IEEE-2026-0941',
    },
    {
      id: 'cert-2',
      title: 'Certificate of Leadership: Mini-MSDT Facilitator',
      issuedDate: '2026-07-22',
      issuer: 'IEEE-MUSB Executive Committee',
      code: 'CERT-IEEE-2026-1182',
    },
  ];

  return (
    <div className="min-h-screen bg-grid-pattern py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="flex items-center gap-4">
            {/* Avatar with Upload Camera Hover Overlay */}
            <div className="relative group w-16 h-16 rounded-2xl bg-[#00629B]/10 p-1 border border-[#00629B]/30 overflow-hidden shrink-0">
              <img
                src={memberProfile.avatarUrl}
                alt={memberProfile.fullName}
                className="w-full h-full object-cover rounded-xl"
              />
              <label
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity text-[9px] font-bold"
                title="Upload Profile Photo"
              >
                <Camera className="w-4 h-4 mb-0.5" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {memberProfile.fullName}
                </h1>
                <span className="badge-mapua px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  {memberProfile.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Mapúa School of EECE ({memberProfile.program}) • {memberProfile.committee}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/recommendations"
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Activity Matcher</span>
            </Link>

            <label className="px-3.5 py-2 rounded-xl text-xs font-semibold glass-panel border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Upload className="w-3.5 h-3.5 text-[#00629B] dark:text-blue-400" />
              <span>Change Avatar</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>

            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl text-xs font-bold btn-ieee-primary flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Workspace</span>
            </Link>
          </div>
        </div>

        {/* Top Grid: Digital Flip Card ID & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Interactive 3D Digital Membership Flip Card */}
          <div className="lg:col-span-1 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Digital Membership Card</span>
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="text-[#00629B] dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Flip Card (QR Code)</span>
              </button>
            </div>

            {/* 3D Card Container */}
            <div className="relative w-full h-64 perspective-1000">
              <div
                className={`relative w-full h-full duration-700 transform-style-3d transition-transform cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* FRONT SIDE */}
                <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 via-[#00629B] to-slate-950 p-6 text-white shadow-2xl backface-hidden border border-slate-700 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#C41E3A]/20 blur-3xl rounded-full pointer-events-none" />

                  {/* Card Top Row */}
                  <div className="flex items-start justify-between relative z-10">
                    <IEEELogo size="sm" showText={true} />
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ACTIVE MEMBER
                    </span>
                  </div>

                  {/* Card Center Info */}
                  <div className="relative z-10 flex items-center gap-3">
                    <img
                      src={memberProfile.avatarUrl}
                      alt={memberProfile.fullName}
                      className="w-12 h-12 rounded-xl border border-white/20 object-cover bg-slate-800 shrink-0"
                    />
                    <div className="space-y-0.5">
                      <div className="text-base font-extrabold tracking-wide text-white">
                        {memberProfile.fullName}
                      </div>
                      <div className="text-[11px] text-blue-200 font-mono">
                        Student No: {memberProfile.studentNumber}
                      </div>
                      <div className="text-[11px] text-slate-300 font-semibold">
                        Mapúa EECE ({memberProfile.program})
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Row */}
                  <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/10 text-[10px] font-mono text-slate-300">
                    <div>
                      <div className="text-[9px] uppercase text-slate-400">IEEE Member ID</div>
                      <div className="font-bold text-white text-xs">{memberProfile.ieeeMembershipNo}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] uppercase text-slate-400">Campus HQ</div>
                      <div>Mapúa Intramuros</div>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 w-full h-full rounded-3xl bg-slate-900 p-6 text-white shadow-2xl backface-hidden rotate-y-180 border border-slate-700 flex flex-col items-center justify-between">
                  <div className="text-center space-y-1">
                    <div className="text-xs font-bold text-blue-400">Event Check-In QR Code</div>
                    <div className="text-[10px] text-slate-400">Scan at IEEE-MUSB event counters</div>
                  </div>

                  {/* Dynamic High-Res SVG QR Code */}
                  <div className="p-3 bg-white rounded-2xl shadow-inner">
                    <svg className="w-24 h-24 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,0 h10 v20 h-10 z M50,20 h20 v10 h-20 z M40,40 h20 v20 h-20 z M70,40 h20 v10 h-20 z M10,40 h20 v20 h-20 z M70,70 h10 v20 h-10 z M90,80 h10 v20 h-10 z" />
                    </svg>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 text-center">
                    ID: {memberProfile.ieeeMembershipNo} • Verified EECE
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Stats & Volunteer Hours Counter */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Volunteer Hours Box */}
            <div className="sm:col-span-3 p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-widest text-[#00629B] dark:text-blue-400">
                    Official Volunteer Hours Counter
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {memberProfile.volunteerHours} Total Hours Granted
                  </h3>
                </div>
                <div className="p-3 rounded-2xl bg-blue-500/10 text-[#00629B] dark:text-blue-400">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              {/* Hours Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500 font-semibold">
                  <span>Leadership Recognition Goal (150 hrs)</span>
                  <span>{Math.round((memberProfile.volunteerHours / 150) * 100)}% Completed</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00629B] via-blue-500 to-[#C41E3A] rounded-full"
                    style={{ width: `${(memberProfile.volunteerHours / 150) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Stat 1 */}
            <div className="p-5 rounded-2xl glass-panel space-y-1">
              <div className="text-xs text-slate-500">Attended Events</div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">3 Events</div>
            </div>

            {/* Quick Stat 2 */}
            <div className="p-5 rounded-2xl glass-panel space-y-1">
              <div className="text-xs text-slate-500">Certificates Earned</div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">2 Issued</div>
            </div>

            {/* Quick Stat 3 */}
            <div className="p-5 rounded-2xl glass-panel space-y-1">
              <div className="text-xs text-slate-500">Mapúa EECE Status</div>
              <div className="text-2xl font-bold font-mono text-emerald-500">Active Member</div>
            </div>
          </div>
        </div>

        {/* Tabbed Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'attendance'
                  ? 'bg-[#00629B] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Attendance History
            </button>

            <button
              onClick={() => setActiveTab('hours')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'hours'
                  ? 'bg-[#00629B] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Volunteer Hours Breakdown
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'certificates'
                  ? 'bg-[#00629B] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Earned Certificates
            </button>
          </div>

          {/* TAB 1: Attendance History */}
          {activeTab === 'attendance' && (
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Scanned Attendance Logs
              </h3>

              <div className="space-y-3">
                {attendanceLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {log.eventName}
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#C41E3A]" />
                          {log.venue}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#00629B]" />
                          Check-in: {log.checkInTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full font-mono text-[11px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        +{log.hoursGranted} Volunteer Hrs
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Volunteer Hours Breakdown */}
          {activeTab === 'hours' && (
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Committee &amp; Activity Hours Breakdown
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Research &amp; Development Web Platform Build
                  </div>
                  <div className="text-slate-500">60.0 Hours • Lead Developer</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Mini-MSDT 2026 Event Facilitation
                  </div>
                  <div className="text-slate-500">30.5 Hours • Technical Lead</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white">
                    KiCAD Workshop Technical Setup
                  </div>
                  <div className="text-slate-500">30.0 Hours • Lab Assistant</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Earned Certificates */}
          {activeTab === 'certificates' && (
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Official Digital Certificates
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="p-2.5 rounded-xl bg-blue-500/10 text-[#00629B]">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-500/10 text-emerald-500">
                        VERIFIED
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-slate-500">{cert.issuer}</p>
                      <div className="text-[10px] font-mono text-slate-400">
                        Issued: {cert.issuedDate} • {cert.code}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCert(cert.code)}
                      className="w-full py-2 rounded-xl text-xs font-bold btn-ieee-primary flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Certificate PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
