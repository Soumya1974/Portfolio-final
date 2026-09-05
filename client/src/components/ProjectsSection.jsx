import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { useTheme } from '../ThemeContext';

const projects = [
  {
    title: 'Constant: 3D Marketplace',
    description: '3D model & animation platform inspired by Mixamo & Sketchfab with WebGL previews.',
    tags: ['React', 'Three.js', 'Node.js', 'MongoDB', 'AWS S3'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    badge: '3D Graphics'
  },
  {
    title: 'Food Label Intelligence',
    description: 'AI & Computer Vision system scanning packaging to extract consumer rule violance via PaddleOCR & LLMs.',
    tags: ['React', 'Python', 'OpenCV', 'PaddleOCR', 'LLM'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    badge: 'AI & Vision'
  },
  {
    title: 'SprintLab',
    description: 'Collaborative workspace with drag-and-drop task boards and Socket.IO real-time feeds.',
    tags: ['React', 'Tailwind', 'Socket.IO', 'Node.js', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    badge: 'Full Stack'
  },
  {
    title: 'Cashflow',
    description: 'Personal finance application tracking income, expenses, and structured budget analytics.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    badge: 'Fintech'
  }
];

export default function ProjectsSection() {
  const { isDark } = useTheme();

  return (
    <section className={`pt-6 pb-10 border-t transition-colors duration-300 ${
      isDark ? 'border-zinc-900' : 'border-zinc-100'
    }`}>
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
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between group min-h-[140px] ${
              isDark 
                ? 'border-zinc-900 bg-zinc-950/80 hover:border-zinc-700 hover:bg-zinc-900/60' 
                : 'border-zinc-200 bg-white hover:border-black'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className={`font-bold text-sm group-hover:underline underline-offset-4 flex items-center gap-1 leading-snug transition-colors ${
                  isDark ? 'text-white' : 'text-black'
                }`}>
                  {project.title}
                  <ArrowUpRight className={`w-3.5 h-3.5 transition-colors flex-shrink-0 ${
                    isDark ? 'text-zinc-500 group-hover:text-white' : 'text-zinc-400 group-hover:text-black'
                  }`} />
                </h3>
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
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-1 transition-colors ${
                    isDark ? 'hover:text-white' : 'hover:text-black'
                  }`}
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Live</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
