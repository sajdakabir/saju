'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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

  return (
    <main className="min-h-screen flex items-center justify-center p-6 transition-colors duration-200">
      <div className="max-w-2xl w-full mx-auto px-4 text-left mt-[-3rem]">
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>

        <h1 className="text-4xl font-normal mb-6 tracking-tight">Sajda Kabir</h1>
        
        <div className="space-y-4 text-base leading-normal text-gray-800 dark:text-gray-300">
          <p className="max-w-xl">I am building something cool. Previously, I worked at xAI, scaleAI, and a YC backed startup.</p>
          
          <p className="max-w-xl">What I am interested in: Large Language Models, Data, AI research.</p>
          
          <p className="max-w-xl">I love engaging in Open Source, Product, Research, and Technical Communities. The best way to reach me is via email.</p>
          
          <div className="pt-1">
            <a 
              href="mailto:sajdakabir@gmail.com" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              sajdakabir [at] gmail [dot] com
            </a>
          </div>
          
          <div className="flex space-x-6 pt-5">
            <Link 
              href="https://x.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L19.401 1.154h-.5zM16.61 20.644h2.039L6.486 3.24H4.298L16.61 20.644z"/>
              </svg>
            </Link>
            <Link 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
