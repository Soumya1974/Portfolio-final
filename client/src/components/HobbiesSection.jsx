import React from 'react';
import { Box, Sparkles, Film, Layers } from 'lucide-react';
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

      {/* 3D Modeling & Animation Passion Card */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
        isDark 
          ? 'border-zinc-800/80 bg-zinc-950/80 text-zinc-300 hover:border-zinc-700' 
          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
      }`}>
        {/* Subtle accent backdrop glow */}
        <div className={`absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isDark ? 'bg-amber-500' : 'bg-orange-400'
        }`} />

        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl transition-colors ${
              isDark ? 'bg-zinc-900 text-amber-400 border border-zinc-800' : 'bg-amber-50 text-amber-600 border border-amber-100'
            }`}>
              <Box className="w-6 h-6" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                3D Modeling & Animation (Blender)
              </h2>
              <span className={`font-mono-code text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Blender • Rigging • Environments • Minecraft Animation
              </span>
            </div>
          </div>
          
          <span className={`px-2.5 py-1 rounded-full text-xs font-mono-code border ${
            isDark ? 'bg-zinc-900 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            Creative Passion
          </span>
        </div>

        <p className={`text-base sm:text-lg leading-relaxed mt-4 ${
          isDark ? 'text-zinc-300' : 'text-zinc-700'
        }`}>
          My Blender journey started with curiosity and gradually grew into a passion for 3D modeling and animation. I’ve been learning through experimentation, working with modeling, rigging, environments, and character animation, while spending a lot of time creating Minecraft animations and improving my workflow with every project.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-dashed transition-colors"
             style={{ borderColor: isDark ? '#27272a' : '#f4f4f5' }}>
          {[
            { label: '3D Modeling', icon: Box },
            { label: 'Character Rigging', icon: Layers },
            { label: 'Environment Design', icon: Sparkles },
            { label: 'Minecraft Animation', icon: Film },
          ].map((item, idx) => {
            const TagIcon = item.icon;
            return (
              <div 
                key={idx} 
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-mono-code transition-colors ${
                  isDark 
                    ? 'bg-zinc-900/50 border-zinc-800 text-zinc-400' 
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                }`}
              >
                <TagIcon className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
