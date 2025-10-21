'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiUbisoftSun } from 'react-icons/gi';
import { IoMoonSharp } from 'react-icons/io5';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';

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

const history = [
  {
    year: '2024',
    event: 'i start march ',
  },
  {
    year: '2023',
    event: 'I found my interest in Backend developmet and backend architecture i learnd it within 2 months and build 7+ projects around backend development. and in this year i i contributed full to open source projects – Meilisearch,MindsDB, Amplication,  ToolJet, Firezone, CNCF (Cloud Native Computing Foundation).',
  },
  {
    year: '2022',
    event: 'nothing special this year after lockdown back to college writing assignments , attandance and DSA .I got so much intersted in DSA in that time of period , some of my favirite topic was  graph, recuursion and dynamic programming',
  },
  {
    year: '2021',
    event: 'in nov i landed my frist intership at  Invade(automated security startup) and moved to bangalore for 6 months where i get the intersted in buidling for people and the found my dream/goal/what i want from my life.(call it what ever you want)',
  },
  {
    year: '2021',
    event: 'in 27th of june i create my github account and started learning coding using laptop',
  },
  {
    year: '2020',
    event: 'I got my frist ever laptop in my life. and for an year i dont touched my laptop i did code in pen and paper 😂',
  },
  {
    year: '2019',
    event: 'In university i saw some students writting some meaning less english words and that turn into beatiful websites/games. I got inspersided by it. so i took engineering admission test without telling my parents, and got into it.',
  },
  {
    year: '2018',
    event: 'i gave my 12th board exam and got 93 in math. So i took admission in mathemetics honours. And got my first ever phone and access to internet.',
  },
  {
    year: '2001',
    event: 'Born in Plassy, Calcutta, India.',
  },
];

export default function HistoryPage() {
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
    <PageTransition>
      {/* Fixed Navigation */}
      <Navigation
        isVisible={showNavigation}
        theme={theme as 'light' | 'dark'}
        onClose={() => setShowNavigation(false)}
      />

      {/* Main Layout Container */}
      <div
        className="h-screen overflow-hidden transition-colors duration-200"
        style={{
          background: theme === 'dark' ? '#111' : '#ffffff'
        }}
      >
        {/* Scrollable Content Area */}
        <main
          className="h-full overflow-y-auto"
          style={{
            paddingLeft: showNavigation ? '96px' : '0px',
            transition: 'padding-left 300ms ease-out'
          }}
        >
          <div className="min-h-full flex items-center justify-center p-6">
            <div className="max-w-2xl w-full mx-auto px-4 content-fade-in">
              {/* Theme Toggle Button */}
              <div className="fixed right-6 top-6 z-40">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-black dark:text-white transition-colors text-lg"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <GiUbisoftSun /> : <IoMoonSharp />}
                </button>
              </div>

              <h1 className="text-2xl font-medium mb-12 tracking-wider text-gray-900 dark:text-gray-100">
                my <Link href="/history" className="underline hover:no-underline">history</Link>.
              </h1>

              <div className="relative border-l border-gray-200 dark:border-gray-700">
                {history.map((item, index) => (
                  <div key={index} className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-gray-800">
                      <svg className="w-2.5 h-2.5 text-gray-800 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                        <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {item.year}
                    </h3>
                    <p className="block mb-2 text-sm font-normal leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.event}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12">
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
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
