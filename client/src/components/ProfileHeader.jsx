import React from 'react';
import YouTubeBanner from './YouTubeBanner';
import { useTheme } from '../ThemeContext';

export default function ProfileHeader() {
  const { isDark } = useTheme();

  return (
    <div className="w-full pt-4 sm:pt-6">
      {/* Banner at top, under Navbar */}
      <YouTubeBanner />

      {/* Circular Avatar overlapping bottom of Banner */}
      <div className="relative z-10 -mt-12 sm:-mt-16 ml-6 sm:ml-8 inline-block">
        <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 shadow-md transition-all duration-300 hover:scale-105 ${
          isDark ? 'border-zinc-800 bg-black ring-4 ring-black' : 'border-zinc-200 bg-white ring-4 ring-white'
        }`}>
          <img
            src="/images/SoumyaPfp.jpeg"
            alt="Soumya Avatar"
            className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
            onError={(e) => {
              e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Soumya";
            }}
          />
        </div>
        {/* Status indicator */}
        <span 
          className={`absolute bottom-1 right-2 w-4 h-4 rounded-full border-2 shadow-xs transition-colors duration-300 ${
            isDark ? 'bg-zinc-400 border-black' : 'bg-green-200 border-white'
          }`} 
          title="Online / Available"
        ></span>
      </div>
    </div>
  );
}
