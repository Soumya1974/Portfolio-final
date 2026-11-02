import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { UserPlus, UserCheck, Users, Loader2, Info } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const BACKEND_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? ''
    : 'https://server-portfolio-8pqs.onrender.com');

export default function FollowButton() {
  const { isDark } = useTheme();
  const [followerCount, setFollowerCount] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const infoRef = useRef(null);

  // Close tooltip on tapping outside (especially on mobile)
  useEffect(() => {
    if (!showTooltip) return;

    const handlePointerDown = (e) => {
      if (infoRef.current && !infoRef.current.contains(e.target)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [showTooltip]);

  // Fetch initial follower count and status from backend DB by IP
  useEffect(() => {
    let isMounted = true;

    // Clean up any old localStorage key from previous attempts
    try {
      localStorage.removeItem('has_followed_soumya');
    } catch {
      // Ignore in case storage is restricted
    }

    const fetchFollowerStatus = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/followers/status`);
        if (isMounted && data.success) {
          setFollowerCount(typeof data.count === 'number' ? data.count : 0);
          setIsFollowing(Boolean(data.hasFollowed));
        }
      } catch (err) {
        console.warn('Could not fetch follower status from server:', err.response?.data?.error || err.message);
        if (isMounted && followerCount === null) {
          setFollowerCount(0);
        }
      } finally {
        if (isMounted) setHasLoaded(true);
      }
    };

    fetchFollowerStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFollow = async () => {
    // If already following or currently submitting, do nothing (users cannot unfollow)
    if (isFollowing || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/followers`);

      if (data.success || data.alreadyFollowing) {
        if (typeof data.count === 'number') {
          setFollowerCount(data.count);
        }
        // ONLY mark as Following if backend actually succeeded
        setIsFollowing(true);
      } else {
        throw new Error(data.error || 'Failed to follow');
      }
    } catch (err) {
      console.error('Error while following:', err.response?.data?.error || err.message);
      // Do NOT set following state on failure - keep button as Follow
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 font-mono-code text-xs sm:text-sm">
      {/* Follow / Following Button */}
      <button
        type="button"
        onClick={handleFollow}
        disabled={isFollowing || isSubmitting}
        title={isFollowing ? 'You are following Soumya' : 'Follow Soumya'}
        aria-label={isFollowing ? 'Following Soumya' : 'Follow Soumya'}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 font-semibold rounded-sm  transition-all duration-300 flex items-center gap-1.5 select-none ${
          isFollowing
            ? isDark
              ? 'bg-zinc-900 border border-zinc-800 text-zinc-400 cursor-default opacity-90'
              : 'bg-zinc-100 border border-zinc-300 text-zinc-600 cursor-default opacity-90'
            : isDark
              ? 'bg-white text-black hover:bg-zinc-200 active:scale-95 cursor-pointer'
              : 'bg-zinc-900 text-white hover:bg-black active:scale-95 cursor-pointer'
        } ${isSubmitting ? 'opacity-80' : ''}`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Following...</span>
          </>
        ) : isFollowing ? (
          <>
            <span>Following</span>
          </>
        ) : (
          <>
            <span>Follow</span>
          </>
        )}
      </button>

      {/* Follower Count & Info Tooltip */}
      <div
        ref={infoRef}
        className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-sm transition-colors duration-300 ${
          isDark
            ? 'bg-zinc-950/80 border-zinc-800/80 text-zinc-400'
            : 'bg-zinc-50 border-zinc-200 text-zinc-600'
        }`}
      >
        <span className={`font-semibold tracking-tight transition-colors duration-300 ${
          isDark ? 'text-zinc-200' : 'text-zinc-900'
        }`}>
          {!hasLoaded && followerCount === null ? (
            <span className="inline-block w-6 h-3.5 animate-pulse bg-zinc-700/40 rounded-sm"></span>
          ) : (
            (followerCount ?? 0).toLocaleString()
          )}
        </span>
        <span className="text-[11px] sm:text-xs">
          {followerCount === 1 ? 'follower' : 'followers'}
        </span>

        {/* Info Icon & Attached Dropdown Tooltip at bottom side */}
        <div className="relative inline-flex items-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip((prev) => !prev);
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            aria-label="Follower anonymity information"
            className={`ml-0.5 p-0.5 rounded-sm transition-colors cursor-pointer flex items-center justify-center ${
              isDark
                ? 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
                : 'text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200/50'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
          </button>

          {/* Attached Tooltip at bottom side of the i icon */}
          {showTooltip && (
            <div
              role="tooltip"
              className={`absolute top-full mt-2.5 right-0 sm:left-1/2 sm:-translate-x-1/2 w-60 sm:w-68 max-w-[85vw] p-2.5 sm:p-3 rounded-lg text-xs leading-relaxed z-[100] shadow-2xl border backdrop-blur-md select-none animate-fadeIn ${
                isDark
                  ? 'bg-zinc-900/95 border-zinc-800 text-zinc-300 shadow-black/80'
                  : 'bg-white/95 border-zinc-200 text-zinc-700 shadow-zinc-400/40'
              }`}
            >
              <p className="text-[11px] sm:text-xs leading-relaxed font-sans">
                You’ll remain anonymous. No personal data will be stored, and once you follow, you won’t be able to unfollow.
              </p>
              {/* Arrow on top pointing up to the i icon */}
              <div
                className={`absolute right-1.5 sm:left-1/2 sm:-translate-x-1/2 bottom-full w-2 h-2 rotate-45 border-l border-t ${
                  isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

