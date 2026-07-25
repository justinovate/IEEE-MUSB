'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { IEEELogo } from '@/components/ieee-logo';
import {
  Sun,
  Moon,
  Menu,
  X,
  LogIn,
  Bell,
  Calendar,
  FolderGit2,
  Users,
  Info,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Announcements', href: '/announcements', icon: Bell },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'Officers', href: '/officers', icon: Users },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Portal', href: '/portal', icon: ShieldCheck },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform hover:scale-[1.01]"
        >
          <IEEELogo size="md" showText={true} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-200/70 dark:bg-slate-800 text-[#00629B] dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 opacity-70" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors relative"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {mounted ? (
              theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 scale-100" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform rotate-0 scale-100" />
              )
            ) : (
              <div className="w-4 h-4" />
            )}
          </button>

          {/* Login CTA */}
          <Link
            href="/portal"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider btn-ieee-primary cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Member Login</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-[#00629B] dark:text-blue-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#00629B] dark:text-blue-400" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider btn-ieee-primary"
            >
              <LogIn className="w-4 h-4" />
              <span>Member Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
