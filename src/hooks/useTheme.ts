'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemDark ? 'dark' : 'light';
  }
  return 'dark';
};

export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isAnimating, setIsAnimating] = useState(false);
  const [incomingTheme, setIncomingTheme] = useState<'light' | 'dark' | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize theme after mount
  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  // Update DOM when theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#111');
      }
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#ffffff');
      }
    }
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const toggleTheme = useCallback(() => {
    if (isAnimating) return;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    // Show overlay (OLD theme color) covering the page
    setIncomingTheme(nextTheme);
    setIsAnimating(true);

    // Switch the actual theme right away so the page underneath the overlay
    // is already in the NEW theme (text + bg). The mask reveal then shows the
    // NEW theme content as the wave expands.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const root = document.documentElement;
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (nextTheme === 'dark') {
          root.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          if (metaThemeColor) metaThemeColor.setAttribute('content', '#111');
        } else {
          root.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          if (metaThemeColor) metaThemeColor.setAttribute('content', '#ffffff');
        }
        setTheme(nextTheme);
      });
    });

    // Remove overlay after wave animation completes
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      setIncomingTheme(null);
    }, 1050);
  }, [theme, isAnimating]);

  return {
    theme,
    mounted,
    toggleTheme,
    isAnimating,
    incomingTheme,
  };
}
