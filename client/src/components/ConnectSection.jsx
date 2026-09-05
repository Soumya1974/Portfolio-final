import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import BinaryThankYou from './BinaryThankYou';
import { useTheme } from '../ThemeContext';

export default function ConnectSection({ setActiveTab }) {
  const { isDark } = useTheme();

  return (
    <section className={`pt-6 pb-10 border-t space-y-4 transition-colors duration-300 ${
      isDark ? 'border-zinc-900' : 'border-zinc-100'
    }`}>
      <div>
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          We can stay connected
        </h2>
        <p className={`text-sm sm:text-base mt-1 leading-relaxed transition-colors duration-300 ${
          isDark ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          Feel free to reach out for collaborations, project inquiries, or just a friendly tech conversation.
        </p>
      </div>

      {/* Simple Text Links */}
      <div className="flex flex-wrap items-center gap-4 pt-1 font-mono-code text-sm">
        <button
          onClick={() => setActiveTab('contact')}
          className={`inline-flex items-center space-x-1.5 font-semibold underline underline-offset-4 transition-colors cursor-pointer ${
            isDark ? 'text-white hover:text-zinc-400' : 'text-black hover:text-zinc-600'
          }`}
        >
          <span>Contact Page</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        <a
          href="mailto:soumya@example.com"
          className={`inline-flex items-center space-x-1.5 underline underline-offset-4 transition-colors ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Direct Email</span>
        </a>

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center space-x-1.5 underline underline-offset-4 transition-colors ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
          }`}
        >
          <span>Twitter / X</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center space-x-1.5 underline underline-offset-4 transition-colors ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
          }`}
        >
          <span>GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Thank You Note with Binary Matrix Decode Effect */}
      <BinaryThankYou />
    </section>
  );
}
