import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ProfileHeader from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import HomeAboutSection from './components/HomeAboutSection';
import ProjectsSection from './components/ProjectsSection';
import HobbiesSection from './components/HobbiesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ConnectSection from './components/ConnectSection';
import TechStackPage from './components/TechStackPage';
import { useTheme } from './ThemeContext';
import GithubActivity from './components/GithubActivity';
import RecentCommits from './components/RecentCommits';

const PAGES = ['home', 'about', 'contact', 'hobbies'];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [pageLoading, setPageLoading] = useState(true);
  const { isDark } = useTheme();

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startPosRef = useRef({ x: 0, y: 0 });
  const isLockedRef = useRef(null);
  const containerRef = useRef(null);
  const lastWheelTimeRef = useRef(0);

  const activeIndex = Math.max(0, PAGES.indexOf(activeTab));

  useEffect(() => {
    // Preload key images & smooth transition from initial loader
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // Handle Touch Start
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    isLockedRef.current = null;
    setIsDragging(true);
    setDragOffset(0);
  };

  // Handle Touch Move
  const handleTouchMove = (e) => {
    if (!startPosRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPosRef.current.x;
    const deltaY = touch.clientY - startPosRef.current.y;

    if (!isLockedRef.current) {
      if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
        isLockedRef.current = 'horizontal';
      } else if (Math.abs(deltaY) > 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
        isLockedRef.current = 'vertical';
      }
    }

    if (isLockedRef.current === 'horizontal') {
      let effectiveDelta = deltaX;
      if ((activeIndex === 0 && deltaX > 0) || (activeIndex === PAGES.length - 1 && deltaX < 0)) {
        effectiveDelta = deltaX * 0.3;
      }
      setDragOffset(effectiveDelta);
    }
  };

  // Handle Touch End / Cancel
  const handleTouchEnd = () => {
    if (isLockedRef.current === 'horizontal') {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
      const threshold = Math.min(containerWidth * 0.15, 60);

      if (dragOffset < -threshold && activeIndex < PAGES.length - 1) {
        setActiveTab(PAGES[activeIndex + 1]);
      } else if (dragOffset > threshold && activeIndex > 0) {
        setActiveTab(PAGES[activeIndex - 1]);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    isLockedRef.current = null;
  };

  // Handle Mouse Drag (for desktop)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    isLockedRef.current = null;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !startPosRef.current) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    if (!isLockedRef.current) {
      if (Math.abs(deltaX) > 5 && Math.abs(deltaX) > Math.abs(deltaY)) {
        isLockedRef.current = 'horizontal';
      } else if (Math.abs(deltaY) > 5 && Math.abs(deltaY) > Math.abs(deltaX)) {
        isLockedRef.current = 'vertical';
      }
    }

    if (isLockedRef.current === 'horizontal') {
      let effectiveDelta = deltaX;
      if ((activeIndex === 0 && deltaX > 0) || (activeIndex === PAGES.length - 1 && deltaX < 0)) {
        effectiveDelta = deltaX * 0.3;
      }
      setDragOffset(effectiveDelta);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (isLockedRef.current === 'horizontal') {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
      const threshold = Math.min(containerWidth * 0.15, 60);

      if (dragOffset < -threshold && activeIndex < PAGES.length - 1) {
        setActiveTab(PAGES[activeIndex + 1]);
      } else if (dragOffset > threshold && activeIndex > 0) {
        setActiveTab(PAGES[activeIndex - 1]);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    isLockedRef.current = null;
  };

  // Handle Trackpad Horizontal Wheel Swiping
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > 30 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      const now = Date.now();
      if (now - lastWheelTimeRef.current > 400) {
        if (e.deltaX > 30 && activeIndex < PAGES.length - 1) {
          setActiveTab(PAGES[activeIndex + 1]);
          lastWheelTimeRef.current = now;
        } else if (e.deltaX < -30 && activeIndex > 0) {
          setActiveTab(PAGES[activeIndex - 1]);
          lastWheelTimeRef.current = now;
        }
      }
    }
  };

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
    <div className={`min-h-screen font-sans transition-colors duration-300 overflow-x-hidden ${
      isDark 
        ? 'bg-black text-white selection:bg-white selection:text-black' 
        : 'bg-white text-black selection:bg-zinc-900 selection:text-white'
    }`}>
      {/* Top Navbar Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Slider Container */}
      <main 
        ref={containerRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full overflow-x-hidden relative touch-pan-y ${isDragging ? 'select-none cursor-grabbing' : ''}`}
      >
        <div 
          className="flex flex-row w-[400%] h-full"
          style={{
            transform: `translateX(calc(-${activeIndex * 25}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 350ms cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* Page 0: Home */}
          <div className="w-1/4 shrink-0 px-4 sm:px-6 max-w-3xl mx-auto w-full">
            <div className="space-y-6 animate-fadeIn pb-12">
              <ProfileHeader />
              <ProfileInfo />
              <HomeAboutSection />
              <ProjectsSection />
              <TechStackPage />
              <GithubActivity />
              <RecentCommits />
              <ConnectSection setActiveTab={setActiveTab} />
            </div>
          </div>

          {/* Page 1: About */}
          <div className="w-1/4 shrink-0 px-4 sm:px-6 max-w-3xl mx-auto w-full">
            <div className="pb-12">
              <AboutSection />
            </div>
          </div>

          {/* Page 2: Contact */}
          <div className="w-1/4 shrink-0 px-4 sm:px-6 max-w-3xl mx-auto w-full">
            <div className="pb-12">
              <ContactSection setActiveTab={setActiveTab} />
            </div>
          </div>

          {/* Page 3: Hobbies */}
          <div className="w-1/4 shrink-0 px-4 sm:px-6 max-w-3xl mx-auto w-full">
            <div className="pb-12">
              <HobbiesSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
