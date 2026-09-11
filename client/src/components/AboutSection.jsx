import React from 'react';
import { useTheme } from '../ThemeContext';

const skills = [
  'React.js', 'Three.js / WebGL', 'Node.js', 'Express.js', 
  'MongoDB', 'Python', 'OpenCV', 'PaddleOCR', 
  'Socket.IO', 'Tailwind CSS', 'AWS S3', 'Zustand', 
  'Cloudinary', 'JWT & OAuth', 'Blender', 'REST APIs'
];

const journeyTimeline = [
  {
    title: 'Started with Development',
    details: 'I started learning programming out of curiosity and gradually moved into web development. I began with the basics and started building small projects to understand how things work beyond tutorials.'
  },
  {
    title: 'Getting into Full-Stack',
    details: 'I moved from frontend development into the MERN stack, learning how to build APIs, work with databases, authentication, and connect everything into a complete application. Projects became the main way I learned.'
  },
  {
    title: 'Discovering Blender',
    details: 'Alongside coding, I started experimenting with Blender. It began as a hobby and became another way for me to work with animation, 3D models, cameras, lighting, and rendering.'
  },
  {
    title: 'Combining Both',
    details: 'Over time, development and Blender became two parts of the same journey. I started exploring ideas where software and 3D could work together, while continuing to improve my development skills through different projects.'
  },
  {
    title: 'Still Building',
    details: 'I\'m still learning and experimenting — working on full-stack projects, exploring 3D, and trying different technologies along the way.'
  }
];

export default function AboutSection() {
  const { isDark } = useTheme();

  return (
    <div className="py-6 space-y-10 animate-fadeIn">
      {/* Bio Header */}
      <div className={`space-y-3 border-b pb-6 transition-colors duration-300 ${
        isDark ? 'border-zinc-900' : 'border-zinc-100'
      }`}>
        <h1 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
          About Soumya
        </h1>
        <p className={`text-base leading-relaxed max-w-2xl font-normal ${
          isDark ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          Hello! I am Soumya, a passionate software engineer and digital creator. 
          I specialize in building elegant, minimal, and high-performance web applications while sharing 
          everything I learn along the way.
        </p>
      </div>

      {/* Engineering Philosophy */}
      <div className="space-y-3">
        <h2 className={`text-xl font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Engineering Philosophy
        </h2>
        <p className={`text-sm leading-relaxed max-w-2xl font-normal ${
          isDark ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          I believe software should be intuitive, visually refined, and built with maintainable codebases. 
          My approach prioritizes user experience, fast execution times, clean typography, and minimalist interfaces 
          that stay out of the user's way.
        </p>
      </div>

      {/* Technologies & Tools */}
      <div className="space-y-4">
        <h2 className={`text-xl font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Technologies & Tools
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className={`font-mono-code text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                isDark 
                  ? 'bg-zinc-900/80 text-zinc-300 border-zinc-800' 
                  : 'bg-zinc-100 text-zinc-800 border-zinc-200'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Classic Simple Journey Timeline */}
      <div className={`space-y-6 pt-6 border-t transition-colors duration-300 ${
        isDark ? 'border-zinc-900' : 'border-zinc-100'
      }`}>
        <h2 className={`text-xl font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Journey Timeline
        </h2>

        <div className={`space-y-6 border-l pl-4 ml-1 transition-colors ${
          isDark ? 'border-zinc-800' : 'border-zinc-200'
        }`}>
          {journeyTimeline.map((item, index) => (
            <div key={index} className="space-y-1">
              <h3 className={`font-bold text-base tracking-tight transition-colors ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                {item.title}
              </h3>
              
              <p className={`text-sm leading-relaxed font-sans max-w-2xl transition-colors ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
