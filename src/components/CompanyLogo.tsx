import React from 'react';
// @ts-ignore
import logoImg from '../assets/images/company_logo_1781370195136.jpg';

interface CompanyLogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  theme?: 'dark' | 'light' | 'white'; // light = dark elements on light bg; dark = white elements on dark bg; white = raw theme
}

export default function CompanyLogo({ 
  className = 'w-24 h-24', 
  variant = 'full', 
  theme = 'light' 
}: CompanyLogoProps) {
  // Theme styling for the wrapper container
  const containerBg = theme === 'dark' 
    ? 'bg-white/95 ring-1 ring-white/20 shadow-md p-1.5 rounded-xl' 
    : 'bg-white shadow-sm p-1 border border-[#c4c6d0]/40 rounded-xl';

  // 1. Icon variant: Crop the image programmatically to focus on the elegant circular emblem
  if (variant === 'icon') {
    return (
      <div className={`overflow-hidden relative flex items-center justify-center select-none ${containerBg} ${className}`}>
        {/* We scale the image to ~142% and shift it top-left to extract only the beautiful circular yacht graphic */}
        <div className="w-full h-full relative overflow-hidden rounded-lg">
          <img 
            src={logoImg} 
            alt="SMART LAUNCH SERVICES" 
            className="absolute w-[142%] h-[142%] max-w-none -top-[5%] -left-[21%] object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  // 2. Full brand variant containing graphic, title and slogan
  return (
    <div className={`flex flex-col items-center justify-center select-none bg-white p-2 border border-[#c4c6d0]/50 rounded-2xl shadow-sm ${className}`}>
      <img 
        src={logoImg} 
        alt="SMART LAUNCH SERVICES" 
        className="w-full h-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

