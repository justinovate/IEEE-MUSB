import React from 'react';
import Image from 'next/image';

interface IEEELogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'auto';
}

export function IEEELogo({
  className = '',
  showText = true,
  size = 'md',
  variant = 'auto',
}: IEEELogoProps) {
  const sizePixelMap = {
    sm: 36,
    md: 48,
    lg: 64,
    xl: 96,
  };

  const px = sizePixelMap[size];

  // Text color based on variant
  const titleColor =
    variant === 'dark'
      ? 'text-white'
      : variant === 'light'
      ? 'text-slate-900'
      : 'text-slate-900 dark:text-white';

  const subtitleColor =
    variant === 'dark'
      ? 'text-sky-300'
      : variant === 'light'
      ? 'text-[#00629B]'
      : 'text-[#00629B] dark:text-blue-300';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Authentic Official IEEE-MUSB Logo */}
      <div className="relative flex items-center justify-center rounded-full bg-white border border-slate-300 p-0.5 shadow-md shrink-0 overflow-hidden">
        <Image
          src="/ieee-musb-logo.jpg"
          alt="IEEE - Mapúa University Student Branch Official Logo"
          width={px}
          height={px}
          className="object-contain rounded-full"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-wider text-base sm:text-lg font-sans ${titleColor}`}>
              IEEE
            </span>
            <span className="h-3 w-[1px] bg-slate-400 dark:bg-slate-700" />
            <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded badge-mapua tracking-wide uppercase">
              MUSB EST. 2002
            </span>
          </div>
          <span className={`text-[10px] font-bold tracking-tight mt-0.5 ${subtitleColor}`}>
            Mapúa University Student Branch
          </span>
        </div>
      )}
    </div>
  );
}
