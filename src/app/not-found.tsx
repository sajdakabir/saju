'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Helper function to get initial theme (same as in your main page)
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;
    
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemDark ? 'dark' : 'light';
  }
  return 'dark'; // Default to dark theme
};

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('dark'); // Default to dark theme

  // Initialize theme after mount
  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  // Update theme when it changes
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111] text-gray-100">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-200">
      <div className="max-w-2xl w-full mx-auto px-4 text-center">
        <div className="mb-8 relative w-full max-w-lg mx-auto">
          <Image
            src="/404 Error with a cute animal-pana.svg"
            alt="404 Error Illustration"
            width={500}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>
        
        {/* <h1 className="text-xl font-medium mb-4 tracking-wider text-gray-900 dark:text-gray-100">Either you're too naive, or we're being too smart. Either way, this page doesn't exist.</h1> */}
        {/* <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">either you are too nive or bing too smart.</p> */}
        <h1 className="text-lg font-medium mb-4 tracking-wider text-gray-700 dark:text-gray-100">I'm working hard so that my cat can have a better life.</h1>
        
        <Link 
          href="/" 
          className="text-[14px] text-gray-600 dark:text-gray-300 hover:underline transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
