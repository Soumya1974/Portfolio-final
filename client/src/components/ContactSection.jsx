import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import BinaryThankYou from './BinaryThankYou';
import { useTheme } from '../ThemeContext';

export default function ContactSection({ setActiveTab }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/soumya1874@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _captcha: "false"
        })
      });

      const data = await response.json();
      if (response.ok || data.success === "true" || data.success === true) {
        setSubmitted(true);
      } else {
        setError("Unable to deliver message automatically. Please click the button below to email directly.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Unable to connect to the email server. Please click the button below to email directly.");
    } finally {
      setLoading(false);
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
        <div className={`p-4 space-y-1 transition-colors duration-300 ${
          isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-white'
        }`}>
          <div className={`flex items-center space-x-2 font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            
            <span>Email</span>
          </div>
          <a 
            href="mailto:soumya1874@gmail.com" 
            className={`truncate block hover:underline ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}
          >
            soumya1874@gmail.com
          </a>
        </div>

        <div className={`p-4 space-y-1 transition-colors duration-300 ${
          isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-white'
        }`}>
          <div className={`flex items-center space-x-2 font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            <span>Location</span>
          </div>
          <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Bhubaneswar, India</p>
        </div>

        <div className={`p-4 space-y-1 transition-colors duration-300 ${
          isDark ? 'border-zinc-900 bg-zinc-950' : 'border-zinc-200 bg-white'
        }`}>
          <div className={`flex items-center space-x-2 font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
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
          <div className={`p-6 rounded-lg border text-center space-y-2 animate-fadeIn ${
            isDark ? 'bg-zinc-900/60 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-black'
          }`}>
            <CheckCircle2 className={`w-8 h-8 mx-auto ${isDark ? 'text-white' : 'text-black'}`} />
            <h3 className="font-bold text-base">Message Sent Successfully!</h3>
            <p className={`text-xs font-mono-code ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Thanks for reaching out! Your message has been sent to <strong>soumya1874@gmail.com</strong>. I will get back to you as soon as possible.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); setError(null); }}
              className={`mt-3 text-xs font-mono-code underline cursor-pointer inline-block ${
                isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-black'
              }`}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono-code text-xs">
            {error && (
              <div className={`p-3 rounded-lg border flex items-start space-x-2 text-xs ${
                isDark ? 'bg-red-950/40 border-red-900/50 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>{error}</p>
                  <a
                    href={`mailto:soumya1874@gmail.com?subject=Contact%20From%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`}
                    className="inline-block font-semibold underline hover:opacity-80"
                  >
                    Open Email Client Directly
                  </a>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>Your Name</label>
                <input
                  type="text"
                  required
                  disabled={loading}
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
                  disabled={loading}
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
                disabled={loading}
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
              disabled={loading}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex items-center space-x-2 disabled:opacity-50 ${
                isDark 
                  ? 'bg-white text-black hover:bg-zinc-200' 
                  : 'bg-zinc-900 text-white hover:bg-black'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Thank You Note with Binary Matrix Decode Effect */}
      <BinaryThankYou />
    </div>
  );
}
