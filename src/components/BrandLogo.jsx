import React from 'react';

/**
 * Authentic BrandLogo Component for The Talk Office
 * Features the official emblem and faithful typographic brand lockup:
 * - "THE" in warm gold/ochre
 * - "TALK OFFICE" in deep luxury teal
 */
export default function BrandLogo({
  variant = 'default', // 'default' | 'light' | 'compact'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = ''
}) {
  const isLight = variant === 'light';

  // Sizing definitions
  const dimensions = {
    sm: { img: 30, the: 'text-[10px]', talk: 'text-base' },
    md: { img: 40, the: 'text-xs', talk: 'text-xl' },
    lg: { img: 52, the: 'text-sm', talk: 'text-2xl' }
  }[size] || { img: 40, the: 'text-xs', talk: 'text-xl' };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none group whitespace-nowrap shrink-0 ${className}`}>
      {/* Brand Mark Emblem with Soft Aura */}
      <div className="relative flex items-center justify-center shrink-0">
        <div
          className={`relative rounded-xl overflow-hidden p-1 transition-all duration-300 group-hover:scale-105 ${
            isLight
              ? 'bg-[#182321] border border-white/10 shadow-sm'
              : 'bg-white border border-[#0C7C7B]/20 shadow-sm'
          }`}
          style={{ width: dimensions.img + 10, height: dimensions.img + 10 }}
        >
          <img
            src="/images/logo/talk-logo.png"
            alt="The Talk Office Emblem"
            className="w-full h-full object-contain filter drop-shadow-xs"
            onError={(e) => {
              // Fallback if path differs
              e.currentTarget.src = '/talk-logo.png';
            }}
          />
        </div>
      </div>

      {/* Typography Lockup */}
      <div className="flex items-baseline gap-1.5 whitespace-nowrap leading-none">
        <span
          className={`font-display uppercase tracking-widest font-semibold ${dimensions.the}`}
          style={{ color: '#D99B26' }}
        >
          THE
        </span>
        <span
          className={`font-display font-bold tracking-tight ${dimensions.talk}`}
          style={{ color: isLight ? '#2DD4BF' : '#0C7C7B' }}
        >
          TALK OFFICE
        </span>
      </div>
    </div>
  );
}
