import React from 'react';
import { YoutubeIcon, GithubIcon, BlenderIcon } from './SocialIcons';
import { Code, Code2 } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function StatsSection() {
  const { isDark } = useTheme();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2 font-mono-code">
      {/* Project Made Stat */}
      <div className={`p-3 sm:p-4 transition-all duration-300 flex items-center space-x-3 ${
        isDark 
          ? 'text-zinc-300' 
          : 'text-zinc-800'
      }`}>
        <div className={`p-2 rounded-sm ${
          isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black border border-zinc-200'
        }`}>
          <Code2 className="w-4 h-4" />
        </div>
        <div>
          <span className={`block text-[13px] font-semibold ${
            isDark ? 'text-zinc-500' : 'text-zinc-400'
          }`}>
            Developement
          </span>
          <span className={`text-sm sm:text-base font-bold ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            6+ Web
          </span>
        </div>
      </div>

      {/* Happy Coding Stat */}
      <div className={`p-3 sm:p-4 transition-all duration-300 flex items-center space-x-3 ${
        isDark 
          ? 'text-zinc-300' 
          : 'text-zinc-800'
      }`}>
        <div className={`p-2 rounded-sm ${
          isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black border border-zinc-200'
        }`}>
          <BlenderIcon className="w-4 h-4" />
        </div>
        <div>
          <span className={`block text-[13px] font-semibold ${
            isDark ? 'text-zinc-500' : 'text-zinc-400'
          }`}>
            Blender 3D
          </span>
          <span className={`text-sm sm:text-base font-bold ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            15+ Projects
          </span>
        </div>
      </div>


      <div className={`p-3 sm:p-4 transition-all duration-300 flex items-center space-x-3 ${
        isDark 
          ? 'text-zinc-300' 
          : 'text-zinc-800'
      }`}>
        <div className={`p-2 rounded-sm ${
          isDark ? 'bg-zinc-900 text-white' : 'bg-white text-black border border-zinc-200'
        }`}>
          <GithubIcon className="w-4 h-4" />
        </div>
        <div>
          <span className={`block text-[13px] font-semibold ${
            isDark ? 'text-zinc-500' : 'text-zinc-400'
          }`}>
            Happy coding
          </span>
          <span className={`text-sm sm:text-base font-bold ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            201+ Commits
          </span>
        </div>
      </div>
    </div>
  );
}
