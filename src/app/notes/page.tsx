'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiUbisoftSun } from 'react-icons/gi';
import { IoMoonSharp } from 'react-icons/io5';
import Navigation from '@/components/Navigation';

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

export default function Notes() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');
  const [showNavigation, setShowNavigation] = useState(true);

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

  const notes = [
    { date: '23-01-2025', title: 'distributed living' },
    { date: '09-10-2023', title: 'my productivity set up' },
  ];

  return (
    <main className="min-h-screen flex flex-col transition-colors duration-200">
      <Navigation
        isVisible={showNavigation}
        theme={theme as 'light' | 'dark'}
        onClose={() => setShowNavigation(false)}
      />

      <div className={`flex-1 p-6 transition-all duration-500 ${showNavigation ? 'sm:pt-24' : 'pt-6'}`}>
        <div className="max-w-2xl w-full mx-auto px-4">
          <div className={`absolute right-6 transition-all duration-500 ${showNavigation ? 'sm:top-24' : 'top-6'}`}>
            <button
              onClick={toggleTheme}
              className="p-2 text-black dark:text-white transition-colors text-lg"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <GiUbisoftSun /> : <IoMoonSharp />}
            </button>
          </div>

          <div className="mb-12">
          <h2 className="text-lg font-medium mb-6 text-gray-900 dark:text-gray-100">latest</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400 w-20">23-01-2025</span>
              <Link 
                href="/notes/distributed-living" 
                className="text-[15px] text-gray-900 dark:text-gray-100 hover:underline"
              >
                distributed living
              </Link>
            </div>
          </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-6 text-gray-900 dark:text-gray-100">posts</h2>
            <div className="space-y-3">
              {notes.map((note, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-20">{note.date}</span>
                  <Link 
                    href={`/notes/${note.title.replace(/\s+/g, '-')}`}
                    className="text-[15px] text-gray-900 dark:text-gray-100 hover:underline"
                  >
                    {note.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sajda kabir <Link href="https://x.com/sajdakabir" target="_blank" rel="noopener noreferrer" className="hover:underline">@sajdakabr</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 