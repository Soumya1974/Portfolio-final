import React from 'react';
import { Code, BookOpen, Gamepad2, Camera, Coffee, Sparkles } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const hobbiesList = [
  {
    icon: Code,
    title: 'Open Source & Side Projects',
    category: 'Engineering',
    description: 'Building minimalist developer utilities, experimenting with web frameworks, and contributing to high-impact open-source repositories.'
  },
  {
    icon: BookOpen,
    title: 'Technical Writing & Content',
    category: 'Education',
    description: 'Drafting architecture guides, recording video tutorials for YouTube, and writing blogs about modern full-stack development.'
  },
  {
    icon: Gamepad2,
    title: 'PC Building & Gaming',
    category: 'Leisure',
    description: 'Assembling custom liquid-cooled PC rigs and enjoying strategy and indie games during downtime.'
  },
  {
    icon: Camera,
    title: 'Minimalist Photography',
    category: 'Creative',
    description: 'Capturing urban architecture, street photography, and aesthetic workspace setups in high contrast monochrome.'
  },
  {
    icon: Coffee,
    title: 'Specialty Coffee Brewing',
    category: 'Lifestyle',
    description: 'Exploring single-origin espresso beans and refining V60 pour-over technique for the perfect morning brew.'
  },
  {
    icon: Sparkles,
    title: 'UI/UX Craftsmanship',
    category: 'Design',
    description: 'Studying minimalist design systems, typography hierarchy, and subtle micro-animations for sleek web applications.'
  }
];

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
          What keeps me inspired outside of day-to-day software engineering and educational video production.
        </p>
      </div>

      {/* Grid of Hobbies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hobbiesList.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`p-5 rounded-xl border transition-all duration-300 group ${
                isDark 
                  ? 'border-zinc-900 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/60' 
                  : 'border-zinc-200 bg-white hover:border-black'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-zinc-900 group-hover:bg-white' 
                    : 'bg-zinc-100 group-hover:bg-black'
                }`}>
                  <Icon className={`w-5 h-5 transition-colors ${
                    isDark 
                      ? 'text-zinc-300 group-hover:text-black' 
                      : 'text-zinc-800 group-hover:text-white'
                  }`} />
                </div>
                <span className={`font-mono-code text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {item.category}
                </span>
              </div>
              <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
