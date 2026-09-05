import React from 'react';
import { GithubIcon, YoutubeIcon, LinkedinIcon, InstagramIcon, XIcon } from './SocialIcons';
import { useTheme } from '../ThemeContext';

export default function SocialLinks() {
  const { isDark } = useTheme();

  return (
    <div className={`flex items-center space-x-1.5 sm:space-x-2 backdrop-blur-md px-2 py-1 rounded-lg transition-colors duration-300 ${
      isDark 
        ? 'text-zinc-400' 
        : 'text-zinc-600'
    }`}>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors p-1 rounded ${
          isDark ? 'hover:text-white hover:bg-zinc-800/80' : 'hover:text-black hover:bg-zinc-100/80'
        }`}
        title="GitHub"
      >
        <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </a>
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors p-1 rounded ${
          isDark ? 'hover:text-white hover:bg-zinc-800/80' : 'hover:text-black hover:bg-zinc-100/80'
        }`}
        title="X (Twitter)"
      >
        <XIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors p-1 rounded ${
          isDark ? 'hover:text-white hover:bg-zinc-800/80' : 'hover:text-black hover:bg-zinc-100/80'
        }`}
        title="YouTube"
      >
        <YoutubeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors p-1 rounded ${
          isDark ? 'hover:text-white hover:bg-zinc-800/80' : 'hover:text-black hover:bg-zinc-100/80'
        }`}
        title="LinkedIn"
      >
        <LinkedinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors p-1 rounded ${
          isDark ? 'hover:text-white hover:bg-zinc-800/80' : 'hover:text-black hover:bg-zinc-100/80'
        }`}
        title="Instagram"
      >
        <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </a>
    </div>
  );
}
