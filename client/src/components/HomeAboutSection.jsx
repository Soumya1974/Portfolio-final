import React from 'react';
import { useTheme } from '../ThemeContext';

export default function HomeAboutSection() {
  const { isDark } = useTheme();

  return (
    <section className={`pt-6 pb-6 border-t transition-colors duration-300 ${
      isDark ? 'border-zinc-900' : 'border-zinc-100'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          About Me
        </h2>
      </div>

      <div className="space-y-3 font-sans">
        <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
          isDark ? 'text-zinc-300' : 'text-zinc-700'
        }`}>
          I am a 2nd year MCA student and developer focused on building modern web applications, 
          cloud infrastructure, and interactive 3D graphics. When I'm not writing code, I create 3D animations 
          in Blender and solve data structures.
        </p>

        {/* Highlight Pills */}
        <div className="flex flex-wrap gap-2 pt-1 font-mono-code text-xs">
          <span className={`px-2.5 py-1 transition-colors ${
            isDark 
              ? 'border-zinc-800' 
              : 'border-zinc-200'
          }`}>
            Full Stack Web
          </span>
          <span className={`px-2.5 py-1 transition-colors ${
            isDark 
              ? 'border-zinc-800' 
              : 'border-zinc-200'
          }`}>
            3D Graphics & Blender
          </span>
          <span className={`px-2.5 py-1 transition-colors ${
            isDark 
              ? 'border-zinc-800' 
              : 'border-zinc-200'
          }`}>
            Cloud & Automation
          </span>
        </div>
      </div>
    </section>
  );
}
