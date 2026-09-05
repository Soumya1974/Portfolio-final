import React from 'react';
import { useTheme } from '../ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`mt-16 py-8 border-t text-center font-mono-code text-xs transition-colors duration-300 ${
      isDark ? 'border-zinc-900 text-zinc-500' : 'border-zinc-100 text-zinc-400'
    }`}>
      <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} soumya. all rights reserved.</p>
        <p className="flex items-center space-x-1">
          <span>Inspired by Piyush Garg</span>
        </p>
      </div>
    </footer>
  );
}
