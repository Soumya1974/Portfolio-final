import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  const navItems = [
    { id: 'home', label: 'home' },
    { id: 'about', label: 'about' },
    { id: 'contact', label: 'contact' },
    { id: 'hobbies', label: 'hobbies' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isDark ? 'bg-black/90 border-zinc-900' : 'bg-white/90 border-zinc-100'
    }`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`font-mono-code text-lg sm:text-xl font-medium tracking-tight transition-opacity cursor-pointer hover:opacity-75 ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            soumya
          </button>
        </div>

        {/* Right side: Desktop Nav + Theme Toggle */}
        <div className="flex items-center space-x-5 sm:space-x-8">
          {/* Desktop Navigation Links */}
          <nav className={`hidden sm:flex items-center space-x-6 sm:space-x-8 font-mono-code text-sm ${
            isDark ? 'text-zinc-400' : 'text-zinc-500'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-1 cursor-pointer ${
                  isDark ? 'hover:text-white' : 'hover:text-black'
                } ${
                  activeTab === item.id 
                    ? (isDark ? 'text-white font-semibold underline underline-offset-4' : 'text-black font-semibold underline underline-offset-4')
                    : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/Soumya_Ranjan_Sahoo_CV.pdf"
              download="Soumya_Ranjan_Sahoo_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors py-1 cursor-pointer flex items-center gap-1 ${
                isDark ? 'hover:text-white' : 'hover:text-black'
              }`}
            >
              <span>cv</span>
            </a>
          </nav>

          {/* Desktop Text-Only Theme Toggle Button (Hidden on Mobile) */}
          <button
            onClick={toggleTheme}
            className={`hidden sm:inline-block font-mono-code text-xs px-2.5 py-1 transition-all cursor-pointer font-medium ${
              isDark
                ? 'text-zinc-400 hover:text-white'
                : 'text-zinc-500 hover:text-black'
            }`}
            aria-label="Toggle visual theme"
          >
            {isDark ? 'light' : 'dark'}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`sm:hidden p-2 rounded-lg transition-colors cursor-pointer ${
              isDark 
                ? 'text-zinc-300 hover:text-white hover:bg-zinc-900' 
                : 'text-zinc-700 hover:text-black hover:bg-zinc-100'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Drawer (Positions on top of Hero Section) */}
      {mobileMenuOpen && (
        <div className={`sm:hidden absolute top-full left-0 right-0 z-50 border-b backdrop-blur-xl px-4 py-3.5 font-mono-code text-sm space-y-2 shadow-2xl animate-fadeIn ${
          isDark ? 'border-zinc-800 bg-black/95 text-zinc-300' : 'border-zinc-200 bg-white/95 text-zinc-700'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left py-2.5 px-3.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === item.id
                  ? (isDark ? 'bg-white text-black font-semibold' : 'bg-zinc-900 text-white font-semibold')
                  : (isDark ? 'text-zinc-400 hover:bg-zinc-900 hover:text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-black')
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/Soumya_Ranjan_Sahoo_CV.pdf"
            download="Soumya_Ranjan_Sahoo_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className={`block w-full text-left py-2.5 px-3.5 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'text-zinc-400 hover:bg-zinc-900 hover:text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
            }`}
          >
            download cv
          </a>

          {/* Theme Toggle Button inside Hamburger Menu for Mobile */}
          <div className="pt-2 border-t mt-2" style={{ borderColor: isDark ? '#27272a' : '#e4e4e7' }}>
            <button
              onClick={() => {
                toggleTheme();
              }}
              className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-lg transition-colors cursor-pointer ${
                isDark 
                  ? 'text-zinc-400 hover:bg-zinc-900 hover:text-white' 
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
              }`}
            >
              <span>theme</span>
              <span className={`text-xs px-2.5 py-1 rounded border font-mono-code ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800 text-white' 
                  : 'bg-zinc-100 border-zinc-200 text-black'
              }`}>
                {isDark ? 'light' : 'dark'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

