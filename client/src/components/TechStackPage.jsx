import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';

const fieldOptions = [
    {
        id: 1,
        title: 'All',
        code: 'ALL',
        languages: [
            { name: 'JavaScript', code: 'JS', type: 'Language' },
            { name: 'Node.js', code: 'NODE', type: 'Runtime' },
            { name: 'Python', code: 'PY', type: 'Language' },
            { name: 'C Language', code: 'C', type: 'Language' },
            { name: 'Java', code: 'JAVA', type: 'Language' },
            { name: 'HTML5', code: 'HTML', type: 'Markup' },
            { name: 'CSS3', code: 'CSS', type: 'Style' },
            { name: 'Tailwind CSS', code: 'TW', type: 'Framework' },
            { name: 'Express.js', code: 'EX', type: 'Framework' },
            { name: 'React.js', code: 'REACT', type: 'Library' },
            { name: 'Redux Toolkit', code: 'REDUX', type: 'State' },
            { name: 'AWS S3', code: 'S3', type: 'Cloud' },
            { name: 'Docker', code: 'DOCKER', type: 'DevOps' },
            { name: 'Blender', code: '3D', type: 'Media' },
            { name: 'DaVinci Resolve', code: 'EDIT', type: 'Media' },
            { name: 'MS Office', code: 'DOC', type: 'Tool' },
            { name: 'YouTube Tech', code: 'YT', type: 'Media' },
        ],
        concepts: ['Cloud Architecture', 'Containerization', 'Data Structures', 'REST APIs', 'State Management', '3D Graphics', 'Responsive Layouts'],
    },
    {
        id: 2,
        title: 'Languages',
        code: 'LANG',
        languages: [
            { name: 'JavaScript', code: 'JS', type: 'Language' },
            { name: 'Python', code: 'PY', type: 'Language' },
            { name: 'C Language', code: 'C', type: 'Language' },
            { name: 'Java', code: 'JAVA', type: 'Language' },
            { name: 'HTML5', code: 'HTML', type: 'Markup' },
            { name: 'CSS3', code: 'CSS', type: 'Style' },
            { name: 'C++', code: 'C++', type: 'Language' },
        ],
        concepts: ['OOP Principles', 'Promises & Async', 'Arrays & Trees', 'Data Structures', 'ES6+ Syntax', 'DOM Logic'],
    },
    {
        id: 3,
        title: 'Frameworks',
        code: 'FW',
        languages: [
            { name: 'Tailwind CSS', code: 'TW', type: 'Framework' },
            { name: 'Express.js', code: 'EX', type: 'Framework' },
        ],
        concepts: ['Routing', 'Middleware', 'Flexbox & Grid', 'REST Endpoints', 'Utility CSS', 'Microservices'],
    },
    {
        id: 4,
        title: 'Libraries',
        code: 'LIB',
        languages: [
            { name: 'React.js', code: 'REACT', type: 'Library' },
            { name: 'Redux Toolkit', code: 'REDUX', type: 'State' },
        ],
        concepts: ['Component State', 'Redux Store', 'React Hooks', 'Context API', 'Virtual DOM', 'Custom Hooks'],
    },
    {
        id: 5,
        title: 'Cloud & Tools',
        code: 'TOOLS',
        languages: [
            { name: 'AWS S3', code: 'S3', type: 'Cloud' },
            { name: 'Docker', code: 'DOCKER', type: 'DevOps' },
            { name: 'Blender', code: '3D', type: 'Media' },
            { name: 'DaVinci Resolve', code: 'EDIT', type: 'Media' },
            { name: 'MS Office', code: 'DOC', type: 'Tool' },
            { name: 'YouTube Tech', code: 'YT', type: 'Media' },
        ],
        concepts: ['S3 Buckets', 'Docker Containers', 'Cloud Storage', '3D Modeling', 'Video Production', 'DevOps Basics'],
    },
];

const timeline = [
    {
        unique: 1,
        year: '2025 - Present',
        desc: 'Full Stack & Cloud Architecture',
        para: 'Focusing on building full-stack web applications with React and Node.js, storing scalable assets on AWS S3, and containerizing services with Docker.'
    },
    {
        unique: 2,
        year: '2024 - 2025',
        desc: 'Core Computer Science & Logic',
        para: 'Started the coding journey mastering JavaScript, Python, C, and Java fundamentals along with data structures and OOP principles.'
    },
    {
        unique: 3,
        year: '2025 - Apr',
        desc: 'Modern CSS & Backend Frameworks',
        para: 'Adopted Tailwind CSS for rapid responsive design systems and Express.js for building scalable REST APIs and request middleware.'
    },
    {
        unique: 4,
        year: '2025 - 2026',
        desc: 'Frontend Component Architecture',
        para: 'Mastered React component state workflows, custom hooks, dynamic rendering, and predictable global state management using Redux.'
    },
    {
        unique: 5,
        year: '2025 - Present',
        desc: 'Cloud Infrastructure & Media Production',
        para: 'Utilizing AWS S3 for cloud object storage, Docker for reproducible environments, Blender for 3D assets, and DaVinci for technical video tutorials.'
    }
];

export default function TechStackPage() {
    const [stackId, setStackId] = useState(2);
    const { isDark } = useTheme();

    const active = fieldOptions.find(f => f.id === stackId) || fieldOptions[0];
    const activeTimeline = timeline[stackId - 1] || timeline[0];

    return (
        <section className={`pt-6 pb-10 border-t transition-colors duration-300 ${
            isDark ? 'border-zinc-900' : 'border-zinc-100'
        }`}>
            {/* Custom Keyframe Animations replacing framer-motion */}
            <style>{`
                @keyframes techFadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes techPop {
                    from { opacity: 0; transform: scale(0.96); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes techPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.35; }
                }
                .animate-tech-fade {
                    animation: techFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-tech-pop {
                    animation: techPop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-tech-pulse {
                    animation: techPulse 2s ease-in-out infinite;
                }
            `}</style>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                    <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2 transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-black'
                    }`}>
                        Tech Stack I Use
                    </h2>
                </div>
                <span className={`font-mono-code text-xs transition-colors duration-300 ${
                    isDark ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                    {active.languages.length} of {fieldOptions[0].languages.length}
                </span>
            </div>

            {/* Category Selector Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {fieldOptions.map(({ title, id, code }) => (
                    <button
                        key={id}
                        onClick={() => setStackId(id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-semibold transition-all duration-200 cursor-pointer border flex items-center gap-1.5 ${
                            stackId === id
                                ? (isDark ? 'bg-white text-black border-white shadow-xs scale-[1.02]' : 'bg-zinc-900 text-white border-zinc-900 shadow-xs scale-[1.02]')
                                : (isDark ? 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-900 hover:text-white' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-black')
                        }`}
                    >
                        <span className={`text-[10px] px-1 rounded ${
                            stackId === id 
                                ? (isDark ? 'bg-zinc-200 text-black' : 'bg-zinc-800 text-zinc-300') 
                                : (isDark ? 'bg-zinc-900 text-zinc-500' : 'bg-zinc-100 text-zinc-500')
                        }`}>
                            {code}
                        </span>
                        <span>{title}</span>
                    </button>
                ))}
            </div>

            {/* Main Grid Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                
                {/* Left Side: Learning Journey & Concepts (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                    {/* Journey / Milestone Box */}
                    <div key={`timeline-${stackId}`} className={`p-4 sm:p-5 rounded-xl border shadow-xs space-y-3 animate-tech-fade transition-colors duration-300 ${
                        isDark ? 'bg-zinc-950 text-white border-zinc-800' : 'bg-gray-50 text-black border-gray-200'
                    }`}>
                        <div>
                            <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                                {activeTimeline.desc}
                            </h3>
                            <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                {activeTimeline.para}
                            </p>
                        </div>
                    </div>

                    {/* Core Concepts */}
                    <div key={`concepts-${stackId}`} className={`p-4 rounded-xl border space-y-3 animate-tech-fade transition-colors duration-300 ${
                        isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-white'
                    }`}>
                        <div className="flex flex-wrap gap-1.5">
                            {active.concepts.map((concept, idx) => (
                                <span
                                    key={idx}
                                    style={{ animationDelay: `${idx * 35}ms` }}
                                    className={`font-mono-code text-[11px] px-2.5 py-1 rounded-md border transition-all duration-150 animate-tech-pop ${
                                        isDark 
                                            ? 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-white hover:text-white' 
                                            : 'bg-zinc-100 text-zinc-700 border-zinc-200/70 hover:border-zinc-900 hover:text-black'
                                    }`}
                                >
                                    {concept}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Technology Text Grid (7 Cols) */}
                <div key={`langs-${stackId}`} className="lg:col-span-7 animate-tech-fade">
                    <div className="p-3 max-h-80 overflow-y-auto pr-2">
                        <div className="grid grid-cols-3 gap-2">
                            {active.languages.map((lang, index) => (
                                <div
                                    key={index}
                                    style={{ animationDelay: `${index * 25}ms` }}
                                    className={`p-2.5 rounded-lg border transition-all duration-200 flex flex-col justify-between group transform hover:-translate-y-0.5 animate-tech-pop cursor-default min-h-[58px] ${
                                        isDark 
                                            ? 'border-zinc-900 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/60' 
                                            : 'border-zinc-200 bg-white hover:border-zinc-900'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-1 mb-1">
                                        <span className={`font-mono-code text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded border transition-colors ${
                                            isDark 
                                                ? 'bg-zinc-900 text-zinc-300 border-zinc-800 group-hover:bg-white group-hover:text-black' 
                                                : 'bg-zinc-100 text-zinc-900 border-zinc-200/80 group-hover:bg-zinc-900 group-hover:text-white'
                                        }`}>
                                            {lang.code}
                                        </span>
                                        <span className={`text-[9px] font-mono-code transition-colors ${
                                            isDark ? 'text-zinc-500 group-hover:text-zinc-400' : 'text-zinc-400 group-hover:text-zinc-600'
                                        }`}>
                                            {lang.type}
                                        </span>
                                    </div>
                                    <div className={`text-[11px] sm:text-xs font-semibold leading-tight truncate transition-colors ${
                                        isDark ? 'text-zinc-300 group-hover:text-white' : 'text-zinc-800 group-hover:text-black'
                                    }`}>
                                        {lang.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
