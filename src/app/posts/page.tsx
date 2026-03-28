'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ThemeWave from '@/components/ThemeWave';
import { useTheme } from '@/hooks/useTheme';

export default function Notes() {
  const { theme, mounted, toggleTheme, isAnimating, incomingTheme } = useTheme();
  const [showNavigation, setShowNavigation] = useState(true);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const notes = [
    { date: '21-10-2025', title: 'coming soon...' },
    // { date: '09-10-2023', title: 'my productivity set up' },
  ];

  return (
      <div className="h-screen overflow-hidden transition-colors duration-200">
        <ThemeWave isAnimating={isAnimating} incomingTheme={incomingTheme} />
        <Navigation
          isVisible={showNavigation}
          theme={theme as 'light' | 'dark'}
          onClose={() => setShowNavigation(false)}
        />

        <main
          className="h-full overflow-y-auto pl-0 md:pl-24"
          style={{
            transition: 'padding-left 300ms ease-out'
          }}
        >
          <div className="min-h-full flex justify-center p-4 sm:p-6 pt-10 sm:pt-16">
            <div className="max-w-2xl w-full mx-auto px-4">
              <ThemeToggle onClick={toggleTheme} theme={theme} />

          <div className="mb-12">
          <h2 className="text-lg font-medium mb-6 text-gray-900 dark:text-gray-100">latest</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400 w-20">21-10-2025</span>
              <Link 
                href="/posts/distributed-living" 
                className="text-[15px] text-gray-900 dark:text-gray-100 hover:underline"
              >
              coming soon...
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
                    href={`/posts/${note.title.replace(/\s+/g, '-')}`}
                    className="text-[15px] text-gray-900 dark:text-gray-100 hover:underline"
                  >
                    {note.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>

              <Footer />
            </div>
          </div>
        </main>
      </div>
  );
} 