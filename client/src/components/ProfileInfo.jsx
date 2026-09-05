import React from 'react';
import StatsSection from './StatsSection';
import { useTheme } from '../ThemeContext';

export default function ProfileInfo() {
  const { isDark } = useTheme();

  return (
    <div className="space-y-4 py-2 font-mono-code ">
      <div className="space-y-3 leading-relaxed text-sm sm:text-base">

        <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Soumya ranjan sahoo
        </h1>

        <p className={`transition-colors duration-300 font-sans ${
          isDark ? 'text-zinc-300' : 'text-zinc-700'
        }`}>
          I build software with a focus on scalability, performance, and real-world impact. I also explore 3D animation and content creation in my free time, combining technology and creativity to bring ideas to life.
        </p>

        <p className={`text-xs font-mono-code transition-colors duration-300 ${
          isDark ? 'text-zinc-500' : 'text-zinc-500'
        }`}>
          Software Developer, 3D Animator, Farmer
        </p>
      </div>

      {/* Replaced Stats Section */}
      <StatsSection />
    </div>
  );
}
