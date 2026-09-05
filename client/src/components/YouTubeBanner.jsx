import React, { useEffect, useRef, useState } from 'react';
import SocialLinks from './SocialLinks';
import { useTheme } from '../ThemeContext';

export default function YouTubeBanner() {
  const canvasRef = useRef(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const { isDark } = useTheme();

  // Dynamic time-based greeting calculation for 1st phrase
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning, Soumya this side.';
    if (hour >= 12 && hour < 17) return 'Good afternoon, Soumya this side.';
    if (hour >= 17 && hour < 22) return 'Good evening, Soumya this side.';
    return 'Good night, Soumya this side.';
  };

  const phrases = [
    getGreeting(),
    "Let's connect.",
    "Building Constant."
  ];

  const targetText = phrases[phraseIndex];

  // Hacker binary decoding animation for text
  useEffect(() => {
    if (!targetText) return;

    let iteration = 0;
    const binaryChars = '01';
    const totalLength = targetText.length;

    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            if (char === ' ' || char === '.' || char === "'") return char;
            return binaryChars[Math.floor(Math.random() * binaryChars.length)];
          })
          .join('')
      );

      if (iteration >= totalLength) {
        clearInterval(interval);
      }

      iteration += 1;
    }, 70);

    // Pause for ~3.5 seconds after completion before advancing to next phrase (4.2s total cycle)
    const timer = setTimeout(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 4200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [phraseIndex]);

  // Matrix Binary 0 and 1 Rain Canvas (Theme responsive)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let frameCount = 0;

    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 13;
    const columns = Math.max(1, Math.floor((canvas.width || 600) / fontSize));
    const drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * -25));

    const draw = () => {
      frameCount++;

      // Subtle background trail fade effect
      ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.35)' : 'rgba(244, 244, 245, 0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = Math.random() > 0.5 ? '1' : '0';

        // Low-opacity, subtle binary stream colors
        const isBright = Math.random() > 0.88;
        if (isDark) {
          ctx.fillStyle = isBright ? 'rgba(255, 255, 255, 0.42)' : 'rgba(161, 161, 170, 0.18)';
        } else {
          ctx.fillStyle = isBright ? 'rgba(113, 113, 122, 0.32)' : 'rgba(161, 161, 170, 0.16)';
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Slower rain movement: update drop positions every 5 frames
        if (frameCount % 5 === 0) {
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.96) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className={`relative w-full h-32 sm:h-40 rounded-lg overflow-hidden border shadow-xs transition-colors duration-300 ${
      isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
    }`}>
      {/* Falling Binary 0 & 1 Matrix Rain */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Glassmorphic overlay & text reveal */}
      <div className={`absolute inset-0 backdrop-blur-[1px] flex items-center justify-center p-4 text-center transition-colors duration-300 ${
        isDark ? 'bg-black/30' : 'bg-white/30'
      }`}>
        <div className="max-w-xl">
          {/* Hacker Decoded Changing Text */}
          <h2 className={`text-lg sm:text-2xl font-bold font-mono-code tracking-tight flex items-center justify-center ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            {displayText || targetText}
          </h2>
        </div>
      </div>

      {/* Relocated Social Links: Bottom-Right of Banner */}
      <div className="absolute bottom-2.5 right-2.5 z-20">
        <SocialLinks />
      </div>
    </div>
  );
}
