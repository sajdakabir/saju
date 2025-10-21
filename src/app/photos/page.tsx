'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiUbisoftSun } from 'react-icons/gi';
import { IoMoonSharp } from 'react-icons/io5';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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

export default function Photos() {
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

  const photoCollections = [
    { 
      title: '', 
      description: '',
      count: '',
      date: ''
    },
    // { 
    //   title: 'Nature & Landscapes', 
    //   description: 'Beautiful scenes from travels and hikes',
    //   count: 8,
    //   date: '2023-2024'
    // },
    // { 
    //   title: 'Architecture', 
    //   description: 'Interesting buildings and structures',
    //   count: 15,
    //   date: '2023'
    // },
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
          <h1 className="text-2xl font-medium mb-6 tracking-wider text-gray-900 dark:text-gray-100">Photos</h1>
          <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
            {/* A collection of photographs capturing moments, places, and perspectives through my lens. */}

            coming soon..
          </p>
        </div>

          <div className="space-y-8">
          {photoCollections.map((collection, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {collection.title}
                </h3>
                {/* <span className="text-sm text-gray-500 dark:text-gray-400">
                  {collection.count} photos
                </span> */}
              </div>
              <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                {collection.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {collection.date}
              </p>
            </div>
          ))}
          </div>

          <Footer />
        </div>
      </div>
    </main>
  );
}