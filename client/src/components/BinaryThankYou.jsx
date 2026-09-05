import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

export default function BinaryThankYou() {
  const targetText = "Thank you for visiting my page. Have a good day!";
  const { isDark } = useTheme();

  // Start with scrambled binary text before scrolling into view
  const getInitialBinary = () =>
    targetText
      .split("")
      .map((char) => (char === " " || char === "." || char === "!" ? char : Math.random() > 0.5 ? "1" : "0"))
      .join("");

  const [text, setText] = useState(getInitialBinary);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  const triggerEffect = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " " || char === "." || char === "!") return char;
            if (index < iteration) {
              return targetText[index];
            }
            return Math.random() > 0.5 ? "1" : "0";
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 0.8;
    }, 20);
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            triggerEffect();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className={`mt-16 pt-8 border-t text-center select-none transition-colors duration-300 ${
      isDark ? 'border-zinc-900' : 'border-zinc-200'
    }`}>
      <p
        onMouseEnter={triggerEffect}
        className={`mt-10 font-mono-code font-bold text-sm sm:text-xl transition-colors cursor-pointer inline-block tracking-tight ${
          isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-900 hover:text-black'
        }`}
        title="Hover to trigger binary decode effect"
      >
        {text}
      </p>
    </div>
  );
}

