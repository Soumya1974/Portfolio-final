import React from 'react';
import { useTheme } from '../ThemeContext';

export default function HobbiesSection() {
  const { isDark } = useTheme();

  return (
    <div className="py-6 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <h1 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
          Hobbies & Passions
        </h1>
        <p className={`text-base max-w-xl ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          What keeps me inspired outside of software engineering and development.
        </p>
      </div>

      {/* 3D Modeling & Animation Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              3D Modeling & Animation (Blender)
            </h2>
            <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Modeling, Rigging, Environments, Minecraft Animation
            </span>
          </div>
        </div>

        <p className={`text-base leading-relaxed ${
          isDark ? 'text-zinc-300' : 'text-zinc-700'
        }`}>
          My Blender journey started with curiosity and gradually grew into a passion for 3D modeling and animation. I’ve been learning through experimentation, working with modeling, rigging, environments, and character animation, while spending a lot of time creating Minecraft animations and improving my workflow with every project.
        </p>
      </div>

      {/* Hardware & Gear Section */}
      <div className="space-y-4 pt-2">
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            Gear & Gadgets
          </h2>
        </div>

        <div className="space-y-4 text-sm">
          {/* Laptop Specs */}
          <div className="space-y-1">
            <h3 className={`font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
              ASUS TUF Gaming F15 (2025)
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Intel Core i7-13620H, NVIDIA GeForce RTX 4060 Laptop GPU, 16 GB RAM, 1 TB SSD, 90 Wh Battery, 15.6" Gaming Display, Windows OS
            </p>
          </div>

          {/* Keyboard */}
          <div className="space-y-1">
            <h3 className={`font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
              Redragon Mechanical Keyboard
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Tactile mechanical switches for coding, 3D workflow, and gaming
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
