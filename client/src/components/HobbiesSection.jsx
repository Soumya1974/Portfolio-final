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
      <div className="space-y-4 pt-2">
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            3D Modeling & Animation (Blender)
          </h2>
          <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Modeling, Rigging, Environments, Minecraft Animation
          </span>
        </div>

        <p className={`text-base leading-relaxed ${
          isDark ? 'text-zinc-300' : 'text-zinc-700'
        }`}>
          My Blender journey started with curiosity and gradually grew into a passion for 3D modeling and animation. I’ve been learning through experimentation, working with modeling, rigging, environments, and character animation, while spending a lot of time creating Minecraft animations and improving my workflow with every project.
        </p>

        {/* Bento Grid: Some renders */}
        <div className="pt-2 space-y-3">
          <h3 className={`text-sm font-semibold tracking-wide ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>
            Some renders
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Bento Main Hero Render */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-xl h-56 sm:h-64 shadow-xs">
              <img 
                src="/renders/render1.webp" 
                alt="Minecraft Blender Render - Steve Selfie" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-medium">Steve takin a selfie</span>
              </div>
            </div>

            {/* Bento Stacked Secondary Renders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
              <div className="group relative overflow-hidden rounded-xl h-36 sm:h-30 md:h-[7.75rem] shadow-xs">
                <img 
                  src="/renders/render2.webp" 
                  alt="Minecraft Blender Render - Steve Low Angle" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                  <span className="text-white text-[11px] ">Low Angle zoom Steve</span>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl h-36 sm:h-30 md:h-[7.75rem] shadow-xs">
                <img 
                  src="/renders/render3.webp" 
                  alt="Minecraft Blender Render - Hobbit House Entrance" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                  <span className="text-white text-[11px]">The hobbit house</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
