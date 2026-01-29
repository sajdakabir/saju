'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

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

const contributions = [
  {
    name: 'Meilisearch',
    description: 'Open source search engine',
    prs: [
      { title: 'PR Title 1', url: '#' },
      { title: 'PR Title 2', url: '#' },
    ],
    date: '2023'
  },
  {
    name: 'MindsDB',
    description: 'Machine learning database',
    prs: [
      { title: 'PR Title 1', url: '#' },
    ],
    date: '2023'
  },
];

export default function ContributionsPage() {
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

  return (
    <div className="h-screen overflow-hidden transition-colors duration-200">
      <Navigation
        isVisible={showNavigation}
        theme={theme as 'light' | 'dark'}
        onClose={() => setShowNavigation(false)}
      />

      <main
        className="h-full overflow-y-auto"
        style={{
          paddingLeft: showNavigation ? '96px' : '0px',
          transition: 'padding-left 300ms ease-out'
        }}
      >
        <div className="min-h-full flex justify-center p-6 pt-6">
          <div className="max-w-2xl w-full mx-auto px-4">
            <ThemeToggle onClick={toggleTheme} theme={theme as 'light' | 'dark'} />

            <h1 className="text-2xl font-medium mb-12 tracking-wider text-gray-900 dark:text-gray-100">
              open source contributions
            </h1>

            <div className="space-y-8">
              {contributions.map((project, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {project.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                      {project.date}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {project.prs.map((pr, prIndex) => (
                      <Link
                        key={prIndex}
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[14px] text-gray-600 dark:text-gray-300 hover:underline transition-colors"
                      >
                        → {pr.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
