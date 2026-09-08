import React, { useState } from 'react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDark 
        ? 'bg-black text-white selection:bg-white selection:text-black' 
        : 'bg-white text-black selection:bg-zinc-900 selection:text-white'
    }`}>
      {/* Top Navbar Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container matching Piyush Garg's centered narrow layout */}
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

