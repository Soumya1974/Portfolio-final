import React from 'react';
import { GithubIcon, YoutubeIcon, LinkedinIcon, InstagramIcon, XIcon } from './SocialIcons';
import { useTheme } from '../ThemeContext';

export default function SocialLinks() {
  const { isDark } = useTheme();

  const links = [
    { name: 'GitHub', url: 'https://github.com', icon: GithubIcon, iconSize: 'w-3.5 h-3.5 sm:w-4 sm:h-4' },
    { name: 'X (Twitter)', url: 'https://x.com', icon: XIcon, iconSize: 'w-3 h-3 sm:w-3.5 sm:h-3.5' },
    { name: 'YouTube', url: 'https://youtube.com', icon: YoutubeIcon, iconSize: 'w-3.5 h-3.5 sm:w-4 sm:h-4' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: LinkedinIcon, iconSize: 'w-3.5 h-3.5 sm:w-4 sm:h-4' },
    { name: 'Instagram', url: 'https://instagram.com', icon: InstagramIcon, iconSize: 'w-3.5 h-3.5 sm:w-4 sm:h-4' },
  ];

  return (
    <div className={`flex items-center space-x-1.5 sm:space-x-2 backdrop-blur-md px-2 py-1 rounded-lg transition-colors duration-300 ${
      isDark 
        ? 'text-zinc-400' 
        : 'text-zinc-600'
    }`}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-1 rounded transition-all duration-200 transform hover:scale-125 active:scale-95 ${
              isDark ? 'hover:text-white hover:bg-zinc-800/80' : 'hover:text-black hover:bg-zinc-100/80'
            }`}
            title={link.name}
          >
            <Icon className={link.iconSize} />
          </a>
        );
      })}
    </div>
  );
}
