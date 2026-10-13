import React from 'react';
import { useTheme } from '../ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`mt-8 py-4 border-t text-center font-mono-code text-xs tracking-wide transition-colors duration-300 ${
      isDark ? 'border-zinc-900 text-zinc-500' : 'border-zinc-100 text-zinc-400'
    }`}>
      <p>© {new Date().getFullYear()} Soumya. All rights reserved.</p>
    </footer>
  );
}

