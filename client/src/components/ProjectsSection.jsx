import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, ArrowUpRight, X } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { useTheme } from '../ThemeContext';

const projects = [
  {
    title: 'Constant: 3D Marketplace',
    description: '3D model & animation platform inspired by Mixamo & Sketchfab with WebGL previews.',
    tags: ['React', 'Three.js', 'Node.js', 'MongoDB', 'AWS S3'],
    github: 'https://github.com/Soumya1974/Constant',
    liveUrl: null,
    status: 'under_development',
    badge: '3D Graphics'
  },
  {
    title: 'Food Label Intelligence',
    description: 'AI & Computer Vision system scanning packaging to extract legal metrology compliance & consumer rule violations via PaddleOCR & LLMs.',
    tags: ['React', 'Python', 'OpenCV', 'PaddleOCR', 'LLM'],
    github: 'https://github.com/AuroSampad2003/AI-POWERED-LEGAL-METROLOGY-COMPLIANCE-SYSTEM',
    liveUrl: null,
    status: 'under_development',
    badge: 'AI & Vision'
  },
  {
    title: 'SprintLab',
    description: 'MERN-stack collaborative project management platform engineered for scalable workspace management, RBAC, and dynamic workspace invitations.',
    tags: ['React', 'Tailwind', 'Socket.IO', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Soumya1974/SprintLab',
    liveUrl: 'https://sprint-lab-gamma.vercel.app/',
    status: 'in_progress_live',
    badge: 'Full Stack'
  },
  {
    title: 'Cashflow',
    description: 'Redux-powered personal finance application tracking income, expenses, and structured budget analytics with complete CRUD functionality.',
    tags: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/Soumya1974/CashFlow',
    liveUrl: 'https://cashflow-expensetracker.netlify.app/',
    status: 'live',
    badge: 'Fintech'
  }
];

export default function ProjectsSection() {
  const { isDark } = useTheme();
  const [activeIdx, setActiveIdx] = useState(null);
  const containerRef = useRef(null);

  const handleLiveClick = (e, project, idx) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.status === 'live') {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      setActiveIdx(activeIdx === idx ? null : idx);
    }
  };

  // Close desktop popover when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveIdx(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <section 
      ref={containerRef}
      className={`pt-6 pb-10 border-t transition-colors duration-300 ${
        isDark ? 'border-zinc-900' : 'border-zinc-100'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Projects By Me
        </h2>
        <span className={`font-mono-code text-xs transition-colors duration-300 ${
          isDark ? 'text-zinc-500' : 'text-zinc-400'
        }`}>
          selected ({projects.length})
        </span>
      </div>

      {/* Sleek Rectangular Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projects.map((project, idx) => {
          const isOpen = activeIdx === idx;

          return (
            <div
              key={idx}
              className={`relative p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between group min-h-[140px] ${
                isDark 
                  ? 'border-zinc-900 bg-zinc-950/80 hover:border-zinc-700 hover:bg-zinc-900/60' 
                  : 'border-zinc-200 bg-white hover:border-black'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-bold text-sm group-hover:underline underline-offset-4 flex items-center gap-1 leading-snug transition-colors ${
                      isDark ? 'text-white' : 'text-black'
                    }`}
                  >
                    {project.title}
                    <ArrowUpRight className={`w-3.5 h-3.5 transition-colors flex-shrink-0 ${
                      isDark ? 'text-zinc-500 group-hover:text-white' : 'text-zinc-400 group-hover:text-black'
                    }`} />
                  </a>
                  <span className={`font-mono-code text-[10px] px-1.5 py-0.5 rounded border flex-shrink-0 transition-colors ${
                    isDark 
                      ? 'bg-zinc-900 text-zinc-300 border-zinc-800' 
                      : 'bg-zinc-100 text-zinc-500 border-zinc-200/60'
                  }`}>
                    {project.badge}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed mb-3 transition-colors ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`font-mono-code text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                        isDark 
                          ? 'bg-zinc-900 text-zinc-300 border-zinc-800' 
                          : 'bg-zinc-50 text-zinc-600 border-zinc-200/50'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center space-x-3 font-mono-code text-[11px] pt-1.5 border-t transition-colors ${
                  isDark ? 'border-zinc-900 text-zinc-500' : 'border-zinc-100 text-zinc-400'
                }`}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-1 transition-colors ${
                      isDark ? 'hover:text-white' : 'hover:text-black'
                    }`}
                  >
                    <GithubIcon className="w-3 h-3" />
                    <span>Code</span>
                  </a>
                  <button
                    onClick={(e) => handleLiveClick(e, project, idx)}
                    className={`flex items-center space-x-1 cursor-pointer transition-colors ${
                      isOpen
                        ? (isDark ? 'text-white font-bold' : 'text-black font-bold')
                        : (isDark ? 'hover:text-white' : 'hover:text-black')
                    }`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Live</span>
                  </button>
                </div>
              </div>

              {/* -------------------- DESKTOP SIDE POPOVER (Attached next to card/button on sm+ screens) -------------------- */}
              {isOpen && (
                <div
                  className={`hidden sm:block absolute z-40 right-0 bottom-full mb-2 w-80 p-5 rounded-2xl border shadow-2xl backdrop-blur-xl animate-fadeIn transition-all ${
                    isDark 
                      ? 'bg-zinc-950/95 border-zinc-800 text-white shadow-black/80' 
                      : 'bg-white/95 border-zinc-200 text-black shadow-zinc-400/30'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setActiveIdx(null)}
                    className={`absolute top-3.5 right-3.5 p-1 rounded-lg transition-colors cursor-pointer ${
                      isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900' : 'text-zinc-500 hover:text-black hover:bg-zinc-100'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <h3 className="text-base font-bold tracking-tight pr-6 mb-2">
                    {project.title}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {project.status === 'under_development' ? (
                      <>
                        This project is currently <strong>under active development</strong> and does not have a live public deployment yet. You can check out the source code, architecture, and progress directly on GitHub.
                      </>
                    ) : (
                      <>
                        SprintLab is currently <strong>under active development</strong>. Core features are live on Vercel, though some upcoming real-time collaboration features are still being added. You can proceed to test the live preview or inspect the code on GitHub.
                      </>
                    )}
                  </p>

                  <div className="flex flex-col gap-2 font-mono-code text-xs">
                    {project.status === 'in_progress_live' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setActiveIdx(null)}
                        className="w-full py-2 px-3 rounded-lg font-semibold bg-white text-black hover:bg-zinc-200 dark:bg-white dark:text-black transition-all text-center flex items-center justify-center space-x-1.5 shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Proceed to Live Demo</span>
                      </a>
                    )}

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveIdx(null)}
                      className={`w-full py-2 px-3 rounded-lg font-semibold border transition-all text-center flex items-center justify-center space-x-1.5 ${
                        project.status === 'under_development'
                          ? (isDark ? 'bg-white text-black hover:bg-zinc-200 border-transparent' : 'bg-black text-white hover:bg-zinc-800 border-transparent')
                          : (isDark ? 'border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700' : 'border-zinc-200 text-zinc-700 hover:text-black hover:border-black')
                      }`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>See GitHub Repository</span>
                    </a>
                  </div>
                </div>
              )}

              {/* -------------------- MOBILE CENTERED OVERLAY MODAL (< sm screens) -------------------- */}
              {isOpen && (
                <div 
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm sm:hidden animate-fadeIn"
                  onClick={() => setActiveIdx(null)}
                >
                  <div
                    className={`relative w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 transition-colors ${
                      isDark ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setActiveIdx(null)}
                      className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900' : 'text-zinc-500 hover:text-black hover:bg-zinc-100'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <h3 className="text-lg font-bold tracking-tight pr-6">
                      {project.title}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {project.status === 'under_development' ? (
                        <>
                          This project is currently <strong>under active development</strong> and does not have a live public deployment yet. You can check out the source code, architecture, and progress directly on GitHub.
                        </>
                      ) : (
                        <>
                          SprintLab is currently <strong>under active development</strong>. Core features are live on Vercel, though some upcoming real-time collaboration features are still being added. You can proceed to test the live preview or inspect the code on GitHub.
                        </>
                      )}
                    </p>

                    <div className="pt-2 flex flex-col gap-2 font-mono-code text-xs">
                      {project.status === 'in_progress_live' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setActiveIdx(null)}
                          className="w-full py-2.5 px-4 rounded-lg font-semibold bg-white text-black hover:bg-zinc-200 dark:bg-white dark:text-black transition-all text-center flex items-center justify-center space-x-1.5 shadow-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Proceed to Live Demo</span>
                        </a>
                      )}

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setActiveIdx(null)}
                        className={`w-full py-2.5 px-4 rounded-lg font-semibold border transition-all text-center flex items-center justify-center space-x-1.5 ${
                          project.status === 'under_development'
                            ? (isDark ? 'bg-white text-black hover:bg-zinc-200 border-transparent' : 'bg-black text-white hover:bg-zinc-800 border-transparent')
                            : (isDark ? 'border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700' : 'border-zinc-200 text-zinc-700 hover:text-black hover:border-black')
                        }`}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>See GitHub Repository</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
