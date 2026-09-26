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

// 6 Slides for Seamless Bi-Directional Infinite Looping:
// [Hobbies-Clone, Home, About, Contact, Hobbies, Home-Clone]
const SLIDES = [
  { id: 'hobbies-clone', page: 'hobbies', isClone: true },
  { id: 'home', page: 'home', isClone: false },
  { id: 'about', page: 'about', isClone: false },
  { id: 'contact', page: 'contact', isClone: false },
  { id: 'hobbies', page: 'hobbies', isClone: false },
  { id: 'home-clone', page: 'home', isClone: true },
];

const PAGES = ['home', 'about', 'contact', 'hobbies'];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [pageLoading, setPageLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(1);
  const { isDark } = useTheme();

  const scrollContainerRef = useRef(null);
  const pageRefs = useRef([]);
  const isInternalScrollRef = useRef(false);
  const isResettingRef = useRef(false);
  const scrollDebounceTimerRef = useRef(null);
  const targetScrollLeftRef = useRef(0);

  // Initial page load timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // Set initial scroll position to Primary Home (Index 1) on load
  useEffect(() => {
    if (pageLoading) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    if (width > 0) {
      const initialX = width * 1;
      container.scrollLeft = initialX;
      targetScrollLeftRef.current = initialX;
      setScrollProgress(1);
    }
  }, [pageLoading]);

  // Trick: toggling overflow off/on for one frame cancels the browser's
  // native momentum/inertial scrolling, so it can't fight our manual
  // scrollLeft change right after a teleport. This is the key fix for
  // the "scrolls back left after a moment on mobile" bug.
  const killMomentumScroll = (container) => {
    const prevOverflow = container.style.overflowX;
    container.style.overflowX = 'hidden';
    void container.offsetHeight; // force reflow
    container.style.overflowX = prevOverflow;
  };

  // Glitch-Free Infinite Boundary Teleporting (Only triggers after swipe settles)
  const checkInfiniteBoundary = () => {
    const container = scrollContainerRef.current;
    if (!container || isResettingRef.current) return;
    const width = container.clientWidth;
    if (width <= 0) return;

    const exactIndex = container.scrollLeft / width;
    const roundedIndex = Math.round(exactIndex);

    const teleportTo = (fromIdx, toIdx, pageName) => {
      isResettingRef.current = true;
      const cloneEl = pageRefs.current[fromIdx];
      const targetEl = pageRefs.current[toIdx];
      if (cloneEl && targetEl) {
        targetEl.scrollTop = cloneEl.scrollTop;
      }

      killMomentumScroll(container);
      container.classList.add('no-smooth-scroll');
      container.style.scrollBehavior = 'auto';
      const targetX = width * toIdx;
      container.scrollLeft = targetX;
      targetScrollLeftRef.current = targetX;
      void container.offsetHeight; // Force instant synchronous layout recalculation
      setScrollProgress(toIdx);
      setActiveTab(pageName);

      setTimeout(() => {
        if (Math.round(container.scrollLeft / width) !== toIdx) {
          container.style.scrollBehavior = 'auto';
          container.scrollLeft = targetX;
          targetScrollLeftRef.current = targetX;
          void container.offsetHeight;
        }
        requestAnimationFrame(() => {
          container.classList.remove('no-smooth-scroll');
          container.style.scrollBehavior = '';
          isResettingRef.current = false;
        });
      }, 150);
    };

    // Teleport left clone (0) -> Primary Hobbies (4)
    if (roundedIndex === 0 && Math.abs(exactIndex - 0) < 0.04) {
      teleportTo(0, 4, 'hobbies');
    } else if (roundedIndex === 5 && Math.abs(exactIndex - 5) < 0.04) {
      // Teleport right clone (5) -> Primary Home (1)
      teleportTo(5, 1, 'home');
    }
  };

  // 60fps Direct GPU 3D Swipe Tilt Animation (Synchronous while swiping/dragging)
  useEffect(() => {
    if (pageLoading) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;

    const update3DTransforms = () => {
      if (!container) return;
      const width = container.clientWidth;
      if (width <= 0) return;

      const progress = container.scrollLeft / width;
      setScrollProgress(progress);

      pageRefs.current.forEach((el, slideIdx) => {
        if (!el) return;
        const diff = slideIdx - progress;
        const absDiff = Math.abs(diff);

        // Dynamic 3D Y-axis tilt and smooth depth scaling
        const rotateY = Math.max(-10, Math.min(10, diff * -8));
        const scale = 1 - Math.min(0.04, absDiff * 0.035);
        const origin = diff > 0.01 ? 'left center' : diff < -0.01 ? 'right center' : 'center center';

        el.style.transform = `perspective(1200px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.transformOrigin = origin;
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update3DTransforms();
          ticking = false;
        });
        ticking = true;
      }

      if (scrollDebounceTimerRef.current) {
        clearTimeout(scrollDebounceTimerRef.current);
      }
      scrollDebounceTimerRef.current = setTimeout(() => {
        checkInfiniteBoundary();
      }, 60);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    update3DTransforms();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollDebounceTimerRef.current) clearTimeout(scrollDebounceTimerRef.current);
    };
  }, [pageLoading]);

  // IntersectionObserver to synchronize activeTab with Navbar when user swipes horizontally
  useEffect(() => {
    if (pageLoading) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isInternalScrollRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageName = entry.target.getAttribute('data-page');
            if (pageName && PAGES.includes(pageName)) {
              setActiveTab(pageName);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.55,
      }
    );

    pageRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pageLoading]);

  // Navigate to primary page smoothly when Navbar tab is clicked
  const handleNavClick = (pageName) => {
    setActiveTab(pageName);
    const primaryIndexMap = { home: 1, about: 2, contact: 3, hobbies: 4 };
    const targetIdx = primaryIndexMap[pageName] ?? 1;

    const container = scrollContainerRef.current;
    if (container) {
      isInternalScrollRef.current = true;
      const width = container.clientWidth;
      if (width > 0) {
        const targetX = width * targetIdx;
        targetScrollLeftRef.current = targetX;
        container.scrollTo({
          left: targetX,
          behavior: 'smooth',
        });
      }

      setTimeout(() => {
        isInternalScrollRef.current = false;
      }, 1000);
    }
  };

  // Liquid Inertial Coasting & Soft Magnetic Landing Engine
  useEffect(() => {
    if (pageLoading) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    let animFrameId = null;
    let wheelTimeout = null;

    const lerpToTarget = () => {
      if (!container || isResettingRef.current) return;
      const current = container.scrollLeft;
      const diff = targetScrollLeftRef.current - current;

      if (Math.abs(diff) > 0.4) {
        container.scrollLeft = current + diff * 0.12;
        animFrameId = requestAnimationFrame(lerpToTarget);
      } else {
        container.scrollLeft = targetScrollLeftRef.current;
        animFrameId = null;
      }
    };

    const settleOnNearestPage = () => {
      if (!container || isResettingRef.current) return;
      const width = container.clientWidth;
      if (width <= 0) return;

      const nearestIdx = Math.round(container.scrollLeft / width);
      targetScrollLeftRef.current = nearestIdx * width;
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(lerpToTarget);
      }
    };

    const handleWheel = (e) => {
      if (isResettingRef.current) return;
      // Check if user is scrolling inside a vertical inner container
      const target = e.target;
      const isInnerScrollable = target.closest('.overflow-y-auto, .react-activity-calendar');

      if (isInnerScrollable && isInnerScrollable !== container) {
        const { scrollTop, scrollHeight, clientHeight } = isInnerScrollable;
        const isScrollableVertically = scrollHeight > clientHeight + 4;
        const isAtTop = scrollTop <= 2;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 4;

        if (isScrollableVertically) {
          if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
            return; // Allow vertical scrolling inside current slide content
          }
        }
      }

      if (Math.abs(e.deltaY) > 0 || Math.abs(e.deltaX) > 0) {
        e.preventDefault();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        const width = container.clientWidth;

        if (width > 0) {
          targetScrollLeftRef.current = Math.max(0, Math.min(width * 5, targetScrollLeftRef.current + delta * 0.95));

          if (!animFrameId) {
            animFrameId = requestAnimationFrame(lerpToTarget);
          }

          if (wheelTimeout) clearTimeout(wheelTimeout);
          wheelTimeout = setTimeout(() => {
            settleOnNearestPage();
          }, 140);
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [pageLoading]);

  // Keyboard Left & Right Arrow Navigation for Desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const container = scrollContainerRef.current;
      if (!container) return;
      const width = container.clientWidth;
      if (width <= 0) return;

      const currentSlideIdx = Math.round(container.scrollLeft / width);

      if (e.key === 'ArrowRight') {
        const nextIdx = (currentSlideIdx + 1) % SLIDES.length;
        isInternalScrollRef.current = true;
        container.scrollTo({ left: nextIdx * width, behavior: 'smooth' });
        setTimeout(() => { isInternalScrollRef.current = false; }, 400);
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (currentSlideIdx - 1 + SLIDES.length) % SLIDES.length;
        isInternalScrollRef.current = true;
        container.scrollTo({ left: prevIdx * width, behavior: 'smooth' });
        setTimeout(() => { isInternalScrollRef.current = false; }, 400);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse Drag Swiping for Desktop
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    isMouseDownRef.current = true;
    isDraggingRef.current = false;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDownRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      isDraggingRef.current = true;
    }
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    const container = scrollContainerRef.current;
    if (!container) return;

    // Mobile layout (<640px) uses native touch snap like before
    if (window.innerWidth < 640) return;

    const width = container.clientWidth;
    if (width > 0 && isDraggingRef.current) {
      const nearestIdx = Math.round(container.scrollLeft / width);
      const targetX = nearestIdx * width;
      const startX = container.scrollLeft;
      let startTime = null;

      const animateLanding = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const duration = 380;
        const progress = Math.min(1, elapsed / duration);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        container.scrollLeft = startX + (targetX - startX) * easeOut;

        if (progress < 1) {
          requestAnimationFrame(animateLanding);
        }
      };

      requestAnimationFrame(animateLanding);
    }
  };

  // Glitch-Free 3D Perspective Tilt Transform Calculator (Responsive for Desktop & Mobile)
  const getPageStyle = (pageIndex) => {
    const diff = pageIndex - scrollProgress;
    const absDiff = Math.abs(diff);

    // Dynamic 3D Y-axis tilt and smooth depth scaling
    const rotateY = Math.max(-10, Math.min(10, diff * -8));
    const scale = 1 - Math.min(0.04, absDiff * 0.035);

    // Anchor transformOrigin to adjacent page edge so slides stay contiguous without opening background gaps
    const origin = diff > 0.01 ? 'left center' : diff < -0.01 ? 'right center' : 'center center';

    return {
      transform: `perspective(1200px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
      transformOrigin: origin,
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      willChange: 'transform',
    };
  };

  const renderPageContent = (pageName) => {
    switch (pageName) {
      case 'home':
        return (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full space-y-6 pb-12 pt-2">
            <ProfileHeader />
            <ProfileInfo />
            <HomeAboutSection />
            <ProjectsSection />
            <TechStackPage />
            <GithubActivity />
            <RecentCommits />
            <ConnectSection setActiveTab={handleNavClick} />
          </div>
        );
      case 'about':
        return (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full pb-12 pt-4">
            <AboutSection />
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full pb-12 pt-4">
            <ContactSection setActiveTab={handleNavClick} />
          </div>
        );
      case 'hobbies':
        return (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full pb-12 pt-4">
            <HobbiesSection />
          </div>
        );
      default:
        return null;
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
      <Navbar activeTab={activeTab} setActiveTab={handleNavClick} />

      {/* Infinite Horizontal Snap Page Container with Glitch-Free 3D Tilt */}
      <main 
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`snap-slider-container w-full h-[calc(100vh-4rem)] select-none cursor-grab active:cursor-grabbing border-0 p-0 m-0 outline-none ring-0 ${
          isDark ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        {SLIDES.map((slide, slideIdx) => (
          <div 
            key={slide.id}
            ref={(el) => (pageRefs.current[slideIdx] = el)}
            data-page={slide.page}
            style={getPageStyle(slideIdx)}
            className={`snap-slider-page h-full overflow-y-auto overflow-x-hidden box-border border-0 p-0 m-0 outline-none ring-0 ${
              isDark ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {renderPageContent(slide.page)}
          </div>
        ))}
      </main>
    </div>
  );
}