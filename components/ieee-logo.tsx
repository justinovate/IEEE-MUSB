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
    sm: 34,
    md: 44,
    lg: 56,
    xl: 80,
  };

  const px = sizePixelMap[size];

  // Text colors
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
    <div className={`flex items-center gap-2.5 whitespace-nowrap select-none ${className}`}>
      {/* Official IEEE-MUSB Seal Emblem */}
      <div className="relative flex items-center justify-center rounded-full bg-white border border-slate-200 p-0.5 shadow-sm shrink-0 overflow-hidden">
        <Image
          src="/ieee-musb-logo.jpg"
          alt="IEEE - Mapúa University Student Branch Logo"
          width={px}
          height={px}
          className="object-contain rounded-full"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className={`font-extrabold tracking-tight text-base sm:text-lg font-sans ${titleColor}`}>
              IEEE-MUSB
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 whitespace-nowrap">
              EST. 2002
            </span>
          </div>
          <span className={`text-[11px] font-bold tracking-tight ${subtitleColor} whitespace-nowrap`}>
            Mapúa University Student Branch
          </span>
        </div>
      )}
    </div>
  );
}
