import React from 'react';
import Link from 'next/link';
import { IEEELogo } from '@/components/ieee-logo';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Bell,
  Calendar,
  Layers,
  QrCode,
  Upload,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo & Badge */}
          <div className="pt-2 pb-4 border-b border-slate-800 space-y-3">
            <Link href="/admin">
              <IEEELogo size="sm" showText={true} />
            </Link>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#00629B]/30 text-blue-300 border border-[#00629B]/50 w-full">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span>SUPERADMIN COMMAND CENTER</span>
            </div>
          </div>

          {/* Superadmin Card */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Logged in Superadmin
            </div>
            <div className="text-xs font-bold text-white">Justin Andre De Leon</div>
            <div className="text-[11px] text-blue-400 font-mono">
              Web Developer (R&amp;D)
            </div>
          </div>

          {/* Admin Navigation */}
          <nav className="space-y-1 text-xs">
            <Link
              href="/admin"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-blue-400" />
                <span>Overview</span>
              </div>
            </Link>

            <Link
              href="/admin/members"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Members &amp; Roles</span>
              </div>
            </Link>

            <Link
              href="/admin/officers"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#C41E3A]" />
                <span>Officer Roster</span>
              </div>
            </Link>

            <Link
              href="/admin/scanner"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <QrCode className="w-4 h-4 text-cyan-400" />
                <span>QR Scanner</span>
              </div>
            </Link>

            <Link
              href="/admin/upload"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Photo Upload Hub</span>
              </div>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Return to Public Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 bg-slate-950 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
