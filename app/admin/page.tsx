import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  Layers,
  Bell,
  Calendar,
  Database,
  PlusCircle,
  FolderLock,
  CheckCircle2,
  ExternalLink,
  UserPlus,
  FolderGit2,
  QrCode,
  Upload,
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#00629B]/30 to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00629B]/30 text-blue-300 border border-[#00629B]/50">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>SUPERADMIN ACCESS GRANTED</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, Justin Andre De Leon!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Sole Superadmin &amp; Web Developer • Research and Development Committee
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/announcements"
              className="px-4 py-2.5 rounded-xl text-xs font-bold btn-ieee-primary flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              <span>Manage Announcements</span>
            </Link>

            <Link
              href="/admin/events"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Manage Events</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Members */}
        <Link href="/admin/members" className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Branch Members</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">128</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            <span>Manage &amp; Export CSV</span>
          </div>
        </Link>

        {/* Stat 2: Active Committees */}
        <Link href="/admin/officers" className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-[#C41E3A]/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Branch Officers</span>
            <Layers className="w-4 h-4 text-[#C41E3A]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">7 Committees</div>
          <div className="text-[11px] text-slate-400 font-medium">
            Assign Roles &amp; Archive
          </div>
        </Link>

        {/* Stat 3: Storage Buckets */}
        <Link href="/admin/upload" className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Supabase Storage</span>
            <Database className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">3 Buckets</div>
          <div className="text-[11px] text-amber-400 font-medium">
            Photo Upload Hub
          </div>
        </Link>

        {/* Stat 4: Attendance Scanner */}
        <Link href="/admin/scanner" className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Attendance Scanner</span>
            <QrCode className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">QR Check-in</div>
          <div className="text-[11px] text-slate-400 font-medium">
            Live Digital ID Scanner
          </div>
        </Link>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Management Quick Links */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Interactive Admin CRUD Workspace</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/admin/announcements"
                className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between font-bold text-white text-sm">
                  <span>Announcements Manager</span>
                  <Bell className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-xs text-slate-400">
                  Post new announcements, edit title &amp; content, toggle pinned posts, or remove old news.
                </p>
              </Link>

              <Link
                href="/admin/events"
                className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between font-bold text-white text-sm">
                  <span>Events &amp; Workshops</span>
                  <Calendar className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400">
                  Schedule upcoming summits, set dates/venues, edit capacity, update statuses (`Upcoming`, `Ongoing`, `Completed`).
                </p>
              </Link>

              <Link
                href="/admin/projects"
                className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between font-bold text-white text-sm">
                  <span>Engineering Projects</span>
                  <FolderGit2 className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-xs text-slate-400">
                  Add student research prototypes across AI, Robotics, IoT, EE, and ECE with tech tags.
                </p>
              </Link>

              <Link
                href="/admin/officers"
                className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between font-bold text-white text-sm">
                  <span>Officer Roster Manager</span>
                  <Users className="w-4 h-4 text-[#C41E3A]" />
                </div>
                <p className="text-xs text-slate-400">
                  Add new officers, edit position titles, assign committees, update terms, and archive past leadership.
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Superadmin Profile Details */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Superadmin Profile Details</span>
            </h3>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex justify-between">
                <span className="text-slate-400">Name:</span>
                <span className="font-bold text-white">Justin Andre De Leon</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex justify-between">
                <span className="text-slate-400">Role:</span>
                <span className="badge-mapua px-1.5 py-0.5 rounded font-bold text-[10px]">Admin</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex justify-between">
                <span className="text-slate-400">Committee:</span>
                <span className="text-slate-200">Research &amp; Development</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex justify-between">
                <span className="text-slate-400">Position:</span>
                <span className="text-slate-200">Web Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
