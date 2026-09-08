import React from 'react';
import { Box } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function HobbiesSection() {
  const { isDark } = useTheme();

  return (
    <div className="py-6 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className={`space-y-2 border-b pb-6 transition-colors duration-300 ${
        isDark ? 'border-zinc-900' : 'border-zinc-100'
      }`}>
        <span className={`font-mono-code text-xs uppercase tracking-widest ${
          isDark ? 'text-zinc-500' : 'text-zinc-400'
        }`}>
          // personal interests
        </span>
        <h1 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
          Hobbies & Passions
        </h1>
        <p className={`text-base max-w-xl ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          What keeps me inspired outside of software engineering and development.
        </p>
      </div>

      {/* 3D Modeling & Animation Card */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
        isDark 
          ? 'border-zinc-900 bg-zinc-950/80 text-zinc-300' 
          : 'border-zinc-200 bg-white text-zinc-700'
      }`}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border transition-colors ${
              isDark 
                ? 'bg-zinc-900 border-zinc-800 text-emerald-400' 
                : 'bg-zinc-100 border-zinc-200 text-emerald-600'
            }`}>
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                3D Modeling & Animation (Blender)
              </h2>
              <span className={`font-mono-code text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Modeling • Rigging • Environments • Minecraft Animation
              </span>
            </div>
          </div>
          
          <span className={`px-2.5 py-1 rounded-md text-xs font-mono-code border ${
            isDark 
              ? 'bg-zinc-900 text-zinc-300 border-zinc-800' 
              : 'bg-zinc-100 text-zinc-700 border-zinc-200'
          }`}>
            Blender 3D
          </span>
        </div>

        <p className={`text-base leading-relaxed mt-4 ${
          isDark ? 'text-zinc-300' : 'text-zinc-700'
        }`}>
          My Blender journey started with curiosity and gradually grew into a passion for 3D modeling and animation. I’ve been learning through experimentation, working with modeling, rigging, environments, and character animation, while spending a lot of time creating Minecraft animations and improving my workflow with every project.
        </p>
      </div>
    </div>
  );
}
