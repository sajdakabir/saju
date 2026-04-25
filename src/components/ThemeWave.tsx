'use client';

import { useEffect, useState } from 'react';

interface ThemeWaveProps {
  isAnimating: boolean;
  incomingTheme: 'light' | 'dark' | null;
}

// ease-out cubic to match cubic-bezier(0.25, 0.1, 0.25, 1) feel
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ThemeWave({ isAnimating, incomingTheme }: ThemeWaveProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAnimating) {
      setProgress(0);
      return;
    }

    const startTime = performance.now();
    const duration = 1000;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      setProgress(easeOutCubic(t));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isAnimating]);

  if (!isAnimating || !incomingTheme) return null;

  // Overlay shows the OLD theme color while the page underneath transitions to NEW.
  // The mask grows a transparent hole from top-right, revealing the NEW theme content.
  const oldThemeColor = incomingTheme === 'dark' ? '#ffffff' : '#1B1B1B';
  const wave = progress * 100;
  const mask = `radial-gradient(circle farthest-corner at calc(100% - 2rem) 2rem, transparent ${wave}%, black ${wave}%)`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        backgroundColor: oldThemeColor,
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    />
  );
}
