'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiUbisoftSun } from 'react-icons/gi';
import { IoMoonSharp } from 'react-icons/io5';
import { TbError404 } from 'react-icons/tb';

// Helper function to get initial theme
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemDark ? 'dark' : 'light';
  }
  return 'light';
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');
  const [showNavigation, setShowNavigation] = useState(false);

  // Initialize theme after mount
  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  // Update theme when it changes
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
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 transition-colors duration-200">
      <div className="max-w-2xl w-full mx-auto px-4">
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleTheme}
            className="p-2 text-black dark:text-white transition-colors text-lg"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <GiUbisoftSun /> : <IoMoonSharp />}
          </button>
        </div>

        <h1 className="text-2xl font-medium mb-6 tracking-wider text-gray-900 dark:text-gray-100">Sajda Kabir</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 -mt-4 mb-6">she/her</p>

        <div className="space-y-4 text-[14px] leading-relaxed text-gray-800 dark:text-gray-200">
          <p className="max-w-xl">I grew up in <Link href="https://en.wikipedia.org/wiki/Palashi" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Plassey</Link> and studied Computer Science in Calcutta.</p>

          <p className="max-w-xl">Now I live in hacker hostels and Airbnbs like a <Link href="https://x.com/levelsio/status/1934737739787678197" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">slowmad</Link>.</p>

          <p className="max-w-xl">I prefer clean code over clever one-liners, and I can spend hours automating 10 minutes of manual work.</p>

          <p className="max-w-xl">When I'm not coding, you can find me reading books, biking, playing badminton, trying new food, or cooking it in the kitchen (yeah, I can cook both code and food).</p>

          {/* <p className="max-w-xl">To know more about me, take a look at my <Link href="/history" className="underline hover:no-underline">history</Link>.</p> */}

          <div className="pt-1">
            <a
              href="mailto:sajda.kbir@gmail.com"
              className="text-[14px] text-gray-600 dark:text-gray-300 hover:underline"
            >
              sajda [dot] kbir [at] gmail [dot] com
            </a>
          </div>

          <div className="flex space-x-3 pt-3">
            <Link
              href="https://x.com/sajdakabir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </Link>
            <Link
              href="https://github.com/sajdakabir" target="_blank" rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/404" rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              aria-label="404 Page"
            >
              <TbError404 className="w-5 h-5" />
            </Link>
          </div>

          <div className="pt-3">
            <button
              onClick={toggleNavigation}
              className="text-[14px] text-gray-600 dark:text-gray-300 hover:underline cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              see my notes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
