import React from 'react';
import Link from 'next/link';
import { IEEELogo } from '@/components/ieee-logo';
import {
  MapPin,
  Mail,
  Globe,
  ExternalLink,
  MessageCircle,
  Heart,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 text-slate-200 border-t border-slate-800 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Organization Summary & Motto */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <IEEELogo size="lg" showText={true} variant="dark" />
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
              The official student branch of the Institute of Electrical and Electronics Engineers at Mapúa University, Intramuros, Manila (Est. 2002). Advancing technology for humanity through engineering excellence and student leadership.
            </p>

            <div className="pt-2">
              <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-1">
                Branch Motto &amp; Pillars
              </div>
              <p className="text-xs text-sky-400 font-mono font-medium leading-normal italic">
                &ldquo;Professionalism. Integrity. Leadership. Esprit de Corps. Remuneration.&rdquo;
              </p>
            </div>
          </div>

          {/* Column 2: Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Official Contact &amp; HQ
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C41E3A] shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Muralla St., Intramuros, Manila, 1002 Metro Manila, Philippines
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href="mailto:ieeemapuasb@gmail.com"
                  className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  ieeemapuasb@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://ieeemusb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  ieeemusb.org
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href="https://m.me/ieeemapuasb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Messenger: IEEE - MU Student Branch</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Official Socials */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              IEEE-MUSB Portal
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/announcements" className="hover:text-white transition-colors">
                  Announcements &amp; News
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Upcoming &amp; Past Events
                </Link>
              </li>
              <li>
                <Link href="/officers" className="hover:text-white transition-colors">
                  Executive Committee &amp; Board
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Mapúa Student Branch
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-white transition-colors text-sky-400 font-semibold flex items-center gap-1">
                  <span>Student &amp; Officer Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>

            {/* Official Social Links */}
            <div className="pt-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                Official Channels
              </h4>
              <div className="flex items-center gap-3">
                {/* Facebook Official */}
                <a
                  href="https://www.facebook.com/ieeemapuasb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-[#00629B] transition-colors"
                  aria-label="Facebook Page: ieeemapuasb"
                  title="Facebook: @ieeemapuasb"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* LinkedIn Official */}
                <a
                  href="https://www.linkedin.com/company/institute-of-electrical-and-electronics-engineers-inc-map%C3%BAa-university-student-branch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-[#00629B] transition-colors"
                  aria-label="LinkedIn Official Page"
                  title="LinkedIn: IEEE Mapúa University Student Branch"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* Messenger Direct Link */}
                <a
                  href="https://m.me/ieeemapuasb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-sky-600 transition-colors"
                  aria-label="Messenger Chat"
                  title="Messenger: IEEE - MU Student Branch"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                {/* Email Direct Link */}
                <a
                  href="mailto:ieeemapuasb@gmail.com"
                  className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-[#C41E3A] transition-colors"
                  aria-label="Email ieeemapuasb@gmail.com"
                  title="Email: ieeemapuasb@gmail.com"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} IEEE - Mapúa University Student Branch (Est. 2002). All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-[#C41E3A] fill-current" />
            <span>for Mapúa Engineers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
