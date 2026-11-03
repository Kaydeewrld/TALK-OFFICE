import React from 'react';

/**
 * Authentic BrandLogo Component for The Talk Office
 * Uses the official integrated brand lockup image (Emblem + Divider + "THE TALK OFFICE")
 * with NO separate HTML text writeup.
 */
export default function BrandLogo({
  variant = 'default', // 'default' (teal for light bg) | 'light' (white for dark bg) | 'original-green' | 'original-white'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = ''
}) {
  const isLight = variant === 'light';

  // Responsive height definitions to maintain natural ~5:1 aspect ratio
  const heightClasses = {
    sm: 'h-7 sm:h-8',
    md: 'h-8 sm:h-10',
    lg: 'h-11 sm:h-14'
  }[size] || 'h-8 sm:h-10';

  let logoSrc = '/images/logo/talk-office-full-teal.png';
  if (variant === 'light') {
    logoSrc = '/images/logo/talk-office-full-white.png';
  } else if (variant === 'original-green') {
    logoSrc = '/images/logo/tto-logo-green.jpeg';
  } else if (variant === 'original-white') {
    logoSrc = '/images/logo/tto-logo-white.jpeg';
  }

  return (
    <div className={`inline-flex items-center select-none group shrink-0 ${className}`}>
      <img
        src={logoSrc}
        alt="The Talk Office"
        className={`${heightClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] filter drop-shadow-xs`}
        onError={(e) => {
          // Fallback to original image if transparent version fails
          e.currentTarget.src = isLight
            ? '/images/logo/tto-logo-white.jpeg'
            : '/images/logo/tto-logo-green.jpeg';
        }}
      />
    </div>
  );
}
