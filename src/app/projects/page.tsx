'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiUbisoftSun } from 'react-icons/gi';
import { IoMoonSharp } from 'react-icons/io5';

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

export default function Projects() {
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

  const projects = [
    { 
      name: 'Portfolio Website', 
      description: 'Personal portfolio built with Next.js and Tailwind CSS',
      tech: 'Next.js, TypeScript, Tailwind CSS',
      link: 'https://github.com/sajdakabir/portfolio'
    },
    { 
      name: 'Backend Architecture', 
      description: 'Scalable backend systems and API development',
      tech: 'Node.js, Express, PostgreSQL',
      link: '#'
    },
  ];

  return (
    <main className="min-h-screen p-6 transition-colors duration-200">
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

        <div className="mb-8">
          <Link 
            href="/" 
            className="text-[15px] text-gray-600 dark:text-gray-400 hover:underline"
          >
            back
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-2xl font-medium mb-6 tracking-wider text-gray-900 dark:text-gray-100">Projects</h1>
          <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
            A collection of projects I've worked on, from backend architecture to full-stack applications.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {project.link !== '#' ? (
                    <Link 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {project.name}
                    </Link>
                  ) : (
                    project.name
                  )}
                </h3>
              </div>
              <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                {project.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {project.tech}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sajda Kabir <Link href="https://x.com/sajdakabir" target="_blank" rel="noopener noreferrer" className="hover:underline">@sajdakabir</Link>
          </p>
        </div>
      </div>
    </main>
  );
}