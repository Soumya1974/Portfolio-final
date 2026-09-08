import React, { useEffect, useRef } from 'react';
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from '../ThemeContext';

export default function GithubActivity() {
    const { isDark } = useTheme();
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeftPos = useRef(0);
    const dragMoved = useRef(false);

    const getScrollEl = () => {
        const el = containerRef.current;
        if (!el) return null;
        return (
            el.querySelector('.react-activity-calendar__scroll') ||
            el.querySelector('svg')?.parentElement ||
            el
        );
    };

    useEffect(() => {
        const scrollToRight = () => {
            const el = getScrollEl();
            if (el) {
                el.scrollLeft = el.scrollWidth;
            }
        };

        scrollToRight();

        const el = containerRef.current;
        if (!el) return;

        const observer = new ResizeObserver(scrollToRight);
        const svgEl = el.querySelector('svg');
        if (svgEl) observer.observe(svgEl);

        const timers = [100, 300, 800, 1800].map(ms => setTimeout(scrollToRight, ms));

        return () => {
            observer.disconnect();
            timers.forEach(clearTimeout);
        };
    }, []);

    const startDrag = (clientX) => {
        const el = getScrollEl();
        if (!el) return;
        isDragging.current = true;
        dragMoved.current = false;
        startX.current = clientX;
        scrollLeftPos.current = el.scrollLeft;
    };

    const moveDrag = (clientX, e) => {
        const el = getScrollEl();
        if (!isDragging.current || !el) return;
        const walk = (startX.current - clientX) * 1.5;
        if (Math.abs(walk) > 3) dragMoved.current = true;
        if (e && e.cancelable) e.preventDefault();
        el.scrollLeft = scrollLeftPos.current + walk;
    };

    const endDrag = () => {
        isDragging.current = false;
    };

    const handleMouseDown = (e) => {
        startDrag(e.clientX);
        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleWindowMouseUp);
    };

    const handleWindowMouseMove = (e) => moveDrag(e.clientX, e);

    const handleWindowMouseUp = () => {
        endDrag();
        window.removeEventListener('mousemove', handleWindowMouseMove);
        window.removeEventListener('mouseup', handleWindowMouseUp);
    };

    const handleClickCapture = (e) => {
        if (dragMoved.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleTouchStart = (e) => {
        if (e.touches.length === 1) startDrag(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (e.touches.length === 1) moveDrag(e.touches[0].clientX, e);
    };

    const handleWheel = (e) => {
        const el = getScrollEl();
        if (el) {
            el.scrollLeft += e.deltaY || e.deltaX;
        }
    };

    return (
        <section className={`pt-6 pb-6 border-t transition-colors duration-300 ${isDark ? 'border-zinc-900' : 'border-zinc-100'
            }`}>
            <style>{`
        .no-scrollbar,
        .no-scrollbar *,
        [class*="activity-calendar"],
        [class*="activity-calendar"] * {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .no-scrollbar::-webkit-scrollbar,
        .no-scrollbar *::-webkit-scrollbar,
        [class*="activity-calendar"]::-webkit-scrollbar,
        [class*="activity-calendar"] *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        /* Container & Article 100% full width of card */
        .github-calendar-wrapper,
        .github-calendar-wrapper article,
        .github-calendar-wrapper [class*="activity-calendar"] {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        /* SVG grid scroll container */
        .github-calendar-wrapper article > div:first-of-type,
        .github-calendar-wrapper [class*="scroll"] {
          overflow-x: auto !important;
          width: 100% !important;
          max-width: 100% !important;
          display: block !important;
        }

        /* SVG itself takes full SVG width */
        .github-calendar-wrapper svg {
          width: max-content !important;
          max-width: none !important;
          min-width: max-content !important;
        }

        /* Footer takes 100% width of card box with space-between */
        .github-calendar-wrapper footer,
        .github-calendar-wrapper [class*="footer"] {
          width: 100% !important;
          max-width: 100% !important;
          margin-top: 0.75rem !important;
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          align-items: center !important;
          justify-content: space-between !important;
          font-size: 0.75rem !important;
          box-sizing: border-box !important;
        }

        .github-calendar-wrapper [class*="footer"] > div,
        .github-calendar-wrapper [class*="footer"] > span,
        .github-calendar-wrapper [class*="legend"],
        .github-calendar-wrapper [class*="count"] {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.35rem !important;
          white-space: nowrap !important;
        }

        .github-calendar-wrapper [class*="legend"],
        .github-calendar-wrapper footer > div:last-child,
        .github-calendar-wrapper [class*="footer"] > div:last-child {
          margin-left: auto !important;
          justify-content: flex-end !important;
          gap: 0.15rem !important;
        }

        .github-calendar-wrapper [class*="legend"] svg,
        .github-calendar-wrapper [class*="legend"] rect {
          margin-left: 0.5px !important;
          margin-right: 0.5px !important;
        }
      `}</style>

            <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-black'
                    }`}>
                    GitHub Activity
                </h2>
                <span className={`font-mono-code text-xs transition-colors duration-300 ${isDark ? 'text-zinc-500' : 'text-zinc-400'
                    }`}>
                    @Soumya1974
                </span>
            </div>

            {/* Stationary Outer Card Container */}
            <div className={`p-4 sm:p-5 rounded-xl border transition-colors duration-300 ${isDark ? 'border-zinc-900 bg-zinc-950/80 text-zinc-300' : 'border-zinc-200 bg-white text-zinc-700'
                }`}>
                {/* Dynamic Wrapper */}
                <div
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={endDrag}
                    onTouchMove={handleTouchMove}
                    onWheel={handleWheel}
                    onClickCapture={handleClickCapture}
                    className="github-calendar-wrapper no-scrollbar cursor-grab active:cursor-grabbing select-none w-full"
                >
                    <GitHubCalendar
                        username="Soumya1974"
                        colorScheme={isDark ? 'dark' : 'light'}
                        blockSize={12}
                        blockMargin={2}
                        fontSize={12}
                        theme={{
                            light: ['#e5e7eb', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                        }}
                    />
                </div>
            </div>
        </section>
    );
}