import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProfileHeader from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import HomeAboutSection from './components/HomeAboutSection';
import ProjectsSection from './components/ProjectsSection';
import HobbiesSection from './components/HobbiesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ConnectSection from './components/ConnectSection';
import Footer from './components/Footer';
import TechStackPage from './components/TechStackPage';
import { useTheme } from './ThemeContext';
import GithubActivity from './components/GithubActivity';
import RecentCommits from './components/RecentCommits';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [pageLoading, setPageLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    // Preload key images & smooth transition from initial loader
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <style>{`
          @keyframes waveBounce {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: 0.3;
            }
            30% {
              transform: translateY(-10px);
              opacity: 1;
            }
          }
          .wave-dot-1 { animation: waveBounce 1.2s infinite ease-in-out 0s; }
          .wave-dot-2 { animation: waveBounce 1.2s infinite ease-in-out 0.2s; }
          .wave-dot-3 { animation: waveBounce 1.2s infinite ease-in-out 0.4s; }
        `}</style>
        <div className="flex items-center space-x-2.5">
          <div className={`w-2.5 h-2.5 rounded-full wave-dot-1 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
          <div className={`w-2.5 h-2.5 rounded-full wave-dot-2 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
          <div className={`w-2.5 h-2.5 rounded-full wave-dot-3 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDark 
        ? 'bg-black text-white selection:bg-white selection:text-black' 
        : 'bg-white text-black selection:bg-zinc-900 selection:text-white'
    }`}>
      {/* Top Navbar Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container matching centered narrow layout */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Avatar + YouTube Banner directly under avatar */}
            <ProfileHeader />

            {/* Profile Info, Social Links, and Stats */}
            <ProfileInfo />

            {/* Home About Section */}
            <HomeAboutSection />

            {/* Featured Projects Showcase */}
            <ProjectsSection />

            <TechStackPage />

            <GithubActivity />

            {/* Live Pushed GitHub Commits */}
            <RecentCommits />

            {/* Stay Connected section directly after TechStackPage */}
            <ConnectSection setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'hobbies' && (
          <HobbiesSection />
        )}

        {activeTab === 'about' && (
          <AboutSection />
        )}

        {activeTab === 'contact' && (
          <ContactSection setActiveTab={setActiveTab} />
        )}

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
