import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import BinaryThankYou from './BinaryThankYou';
import { useTheme } from '../ThemeContext';

export default function ContactSection({ setActiveTab }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-6 space-y-8 animate-fadeIn">
      {/* Back to home & Header */}
      <div className={`space-y-3 border-b pb-6 transition-colors duration-300 ${
        isDark ? 'border-zinc-900' : 'border-zinc-100'
      }`}>
        <h1 className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Contact Me
        </h1>
        <p className={`text-base leading-relaxed max-w-xl font-normal transition-colors duration-300 ${
          isDark ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          Whether you want to start a new project, collaborate on ideas, or just say hello, my inbox is always open.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-code text-xs">
        <div className={`p-4 rounded-xl border space-y-1 transition-colors duration-300 ${
          isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-white'
        }`}>
          <div className={`flex items-center space-x-2 font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            <Mail className={`w-4 h-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <span>Email</span>
          </div>
          <p className={`truncate ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>soumya1874@gmail.com</p>
        </div>

        <div className={`p-4 rounded-xl border space-y-1 transition-colors duration-300 ${
          isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-white'
        }`}>
          <div className={`flex items-center space-x-2 font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            <MapPin className={`w-4 h-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <span>Location</span>
          </div>
          <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Bhubaneswar, India</p>
        </div>

        <div className={`p-4 rounded-xl border space-y-1 transition-colors duration-300 ${
          isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-white'
        }`}>
          <div className={`flex items-center space-x-2 font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            <MessageSquare className={`w-4 h-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <span>Social Profiles</span>
          </div>
          <div className={`flex flex-wrap items-center gap-2 pt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <a href="https://github.com/Soumya1974" target="_blank" rel="noopener noreferrer" className={isDark ? 'hover:text-white' : 'hover:text-black'}>GitHub</a>
            <span>·</span>
            <a href="https://www.linkedin.com/in/soumya1974" target="_blank" rel="noopener noreferrer" className={isDark ? 'hover:text-white' : 'hover:text-black'}>LinkedIn</a>
            <span>·</span>
            <a href="https://x.com/S0umya1974" target="_blank" rel="noopener noreferrer" className={isDark ? 'hover:text-white' : 'hover:text-black'}>X</a>
          </div>
        </div>
      </div>

      {/* Interactive Contact Form */}
      <div className={`p-6 rounded-xl border space-y-5 transition-colors duration-300 ${
        isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-white'
      }`}>
        <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
          Send a Message
        </h2>

        {submitted ? (
          <div className={`p-6 rounded-lg border text-center space-y-2 ${
            isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-black'
          }`}>
            <CheckCircle2 className={`w-8 h-8 mx-auto ${isDark ? 'text-white' : 'text-black'}`} />
            <h3 className="font-bold text-base">Message Sent!</h3>
            <p className={`text-xs font-mono-code ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Thanks for reaching out. I will get back to you as soon as possible.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
              className={`mt-3 text-xs font-mono-code underline cursor-pointer ${
                isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-black'
              }`}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono-code text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Hello World"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors text-xs focus:outline-none ${
                    isDark 
                      ? 'border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 focus:bg-black focus:border-white' 
                      : 'border-zinc-200 bg-zinc-50/50 text-black placeholder-zinc-400 focus:bg-white focus:border-black'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className={`font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="hello@world.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border transition-colors text-xs focus:outline-none ${
                    isDark 
                      ? 'border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 focus:bg-black focus:border-white' 
                      : 'border-zinc-200 bg-zinc-50/50 text-black placeholder-zinc-400 focus:bg-white focus:border-black'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Message</label>
              <textarea
                required
                rows={4}
                placeholder="Hey Soumya, I'd like to talk about..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border transition-colors text-xs resize-none focus:outline-none ${
                  isDark 
                    ? 'border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 focus:bg-black focus:border-white' 
                    : 'border-zinc-200 bg-zinc-50/50 text-black placeholder-zinc-400 focus:bg-white focus:border-black'
                }`}
              />
            </div>

            <button
              type="submit"
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex items-center space-x-2 ${
                isDark 
                  ? 'bg-white text-black hover:bg-zinc-200' 
                  : 'bg-zinc-900 text-white hover:bg-black'
              }`}
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>

      {/* Thank You Note with Binary Matrix Decode Effect */}
      <BinaryThankYou />
    </div>
  );
}


