import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, Users, Loader2 } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function FollowButton() {
  const { isDark } = useTheme();
  const [followerCount, setFollowerCount] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Fetch initial follower count and status for this user's IP
  useEffect(() => {
    let isMounted = true;

    // Check localStorage cache for instant UI rendering
    const cachedFollowing = localStorage.getItem('has_followed_soumya') === 'true';
    if (cachedFollowing) {
      setIsFollowing(true);
    }

    const fetchFollowerStatus = async () => {
      try {
        const response = await fetch('/api/followers/status');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted && data.success) {
          setFollowerCount(typeof data.count === 'number' ? data.count : 0);
          if (data.hasFollowed) {
            setIsFollowing(true);
            localStorage.setItem('has_followed_soumya', 'true');
          }
        }
      } catch (err) {
        console.warn('Could not fetch follower status from server:', err.message);
        // Fallback default count if server is offline or not yet connected
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

    // Optimistic UI update
    const previousCount = followerCount ?? 0;
    setIsFollowing(true);
    setFollowerCount(previousCount + 1);
    localStorage.setItem('has_followed_soumya', 'true');

    try {
      const response = await fetch('/api/followers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (typeof data.count === 'number') {
          setFollowerCount(data.count);
        }
      } else if (data.alreadyFollowing) {
        if (typeof data.count === 'number') {
          setFollowerCount(data.count);
        }
      } else {
        throw new Error(data.error || 'Failed to follow');
      }
    } catch (err) {
      console.error('Error while following:', err.message);
      // Revert optimistic update only if not previously cached
      if (!localStorage.getItem('has_followed_soumya')) {
        setIsFollowing(false);
        setFollowerCount(previousCount);
      }
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
        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-xs select-none ${
          isFollowing
            ? isDark
              ? 'bg-zinc-900 border border-zinc-800 text-zinc-400 cursor-default opacity-90'
              : 'bg-zinc-100 border border-zinc-300 text-zinc-600 cursor-default opacity-90'
            : isDark
              ? 'bg-white text-black hover:bg-zinc-200 active:scale-95 cursor-pointer hover:shadow-md'
              : 'bg-zinc-900 text-white hover:bg-black active:scale-95 cursor-pointer hover:shadow-md'
        } ${isSubmitting ? 'opacity-80' : ''}`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Following...</span>
          </>
        ) : isFollowing ? (
          <>
            <UserCheck className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`} />
            <span>Following</span>
          </>
        ) : (
          <>
            <UserPlus className="w-3.5 h-3.5" />
            <span>Follow</span>
          </>
        )}
      </button>

      {/* Follower Count */}
      <div
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border transition-colors duration-300 ${
          isDark
            ? 'bg-zinc-950/80 border-zinc-800/80 text-zinc-400'
            : 'bg-zinc-50 border-zinc-200 text-zinc-600'
        }`}
      >
        <Users className="w-3.5 h-3.5 opacity-70" />
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
      </div>
    </div>
  );
}

