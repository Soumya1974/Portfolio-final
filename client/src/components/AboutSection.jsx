import React from 'react';
import { Terminal, Award, Cpu, Mail, MapPin, Globe } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const skills = [
  'React.js', 'Three.js / WebGL', 'Node.js', 'Express.js', 
  'MongoDB', 'Python', 'OpenCV', 'PaddleOCR', 
  'Socket.IO', 'Tailwind CSS', 'AWS S3', 'Zustand', 
  'Cloudinary', 'JWT & OAuth', 'Blender', 'REST APIs'
];

const timeline = [
  {
    year: '2024 - Present',
    role: 'Senior Software Engineer & Content Creator',
    company: 'Independent / TechVerse',
    details: 'Building scalable web applications, open-source tools, and producing educational technical tutorials.'
  },
  {
    year: '2022 - 2024',
    role: 'Full Stack Engineer',
    company: 'Cloud Scale Inc.',
    details: 'Architected high-throughput microservices and responsive front-end applications for enterprise clients.'
  },
  {
    year: '2020 - 2022',
    role: 'Frontend Developer',
    company: 'Digital Craft Studio',
    details: 'Developed custom UI component systems and optimized web application load times and SEO performance.'
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
          Hello! I am Soumya, a passionate software engineer, educator, and digital creator. 
          I specialize in building elegant, minimal, and high-performance web applications while sharing 
          everything I learn along the way.
        </p>
      </div>

      {/* Quick Facts */}
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-code text-xs ${
        isDark ? 'text-zinc-400' : 'text-zinc-600'
      }`}>
        <div className={`p-4 rounded-xl border transition-colors duration-300 ${
          isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-white'
        }`}>
          <div className={`flex items-center space-x-2 font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
            <MapPin className={`w-4 h-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <span>Location</span>
          </div>
          <p>India · Remote Worldwide</p>
        </div>

        <div className={`p-4 rounded-xl border transition-colors duration-300 ${
          isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-white'
        }`}>
          <div className={`flex items-center space-x-2 font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
            <Globe className={`w-4 h-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <span>Experience</span>
          </div>
          <p>5+ Years Engineering</p>
        </div>

        <div className={`p-4 rounded-xl border transition-colors duration-300 ${
          isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-white'
        }`}>
          <div className={`flex items-center space-x-2 font-semibold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
            <Mail className={`w-4 h-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <span>Contact</span>
          </div>
          <p>soumya1874@gmail.com</p>
        </div>
      </div>

      {/* Philosophy */}
      <div className="space-y-3">
        <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          <Terminal className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-zinc-700'}`} />
          <span>Engineering Philosophy</span>
        </h2>
        <p className={`text-sm leading-relaxed max-w-2xl font-normal ${
          isDark ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          I believe software should be intuitive, visually refined, and built with maintainable codebases. 
          My approach prioritizes user experience, fast execution times, clean typography, and minimalist interfaces 
          that stay out of the user's way.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          <Cpu className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-zinc-700'}`} />
          <span>Technologies & Tools</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className={`font-mono-code text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                isDark 
                  ? 'bg-zinc-900 text-zinc-300 border-zinc-800' 
                  : 'bg-zinc-100 text-zinc-800 border-zinc-200'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Career Journey */}
      <div className={`space-y-4 pt-4 border-t transition-colors duration-300 ${
        isDark ? 'border-zinc-900' : 'border-zinc-100'
      }`}>
        <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          <Award className={`w-5 h-5 ${isDark ? 'text-zinc-400' : 'text-zinc-700'}`} />
          <span>Career Journey</span>
        </h2>

        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className={`p-4 rounded-xl border space-y-1 transition-colors duration-300 ${
              isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-white'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-black'}`}>
                  {item.role} <span className={`font-normal ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>@ {item.company}</span>
                </h3>
                <span className={`font-mono-code text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {item.year}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
