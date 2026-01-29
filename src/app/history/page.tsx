'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
// import PageTransition from '@/components/PageTransition';
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

const history = [
  // {
  //   year: '2025',
  //   event: 'On June 29th, I won the Digital Country Hackathon Bhutan 2025 with my team project "The Residents". We built an innovative solution that earned us first place among all participants.',
  //   links: [
  //     { text: 'Project Repository', url: 'https://github.com/ZerraHQ/digital-country-hackathon-bhutan-2025/tree/main/the-residents' },
  //     { text: 'Demo Video', url: 'https://www.loom.com/share/4e04841cfa3648248967972fe110a6d8?sid=cb69eaa4-6bc8-40be-889b-201ef74f14ec' },
  //     { text: 'Winners Announcement', url: 'https://x.com/dsh_india/status/1941068196376969463?s=20' }
  //   ]
  // },
  // {
  //   year: '2024',
  //   event: 'i start march ',
  // },
  // {
  //   year: '2023',
  //   event: 'I found my interest in Backend developmet and backend architecture i learnd it within 2 months and build 7+ projects around backend development. and in this year i i contributed full to open source projects – Meilisearch, Amplication,  ToolJet, Firezone',
  // },
  // {
  //   year: '2022',
  //   event: 'nothing special this year after lockdown back to college writing assignments , attandance and DSA .I got so much intersted in DSA in that time of period , some of my favirite topic was  graph, recuursion and dynamic programming',
  // },
  // {
  //   year: '2021',
  //   event: 'in nov i landed my frist intership at  Invade(automated security startup) and moved to bangalore for 6 months where i get the intersted in buidling for people',
  // },
  // {
  //   year: '2021',
  //   event: 'in 27th of june i create my github account and started learning coding using laptop',
  // },
  // {
  //   year: '2020',
  //   event: 'I got my frist ever laptop in my life. and for an year i dont touched my laptop i did code in pen and paper 😂',
  // },
  // {
  //   year: '2019',
  //   event: 'In university i saw some students writting some meaning-less english words and that turn into beatiful websites/games. I got inspersided by it. so i took engineering admission test without telling my parents, and got into it.',
  // },
  // {
  //   year: '2018',
  //   event: 'i gave my 12th board exam and got 93 in math. So i took admission in mathemetics honours. And got my first ever phone and access to the internet.',
  // },
  // {
  //   year: '2001',
  //   event: 'Born in Plassy, Calcutta, India.',
  // },
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
    // <PageTransition>
      <div className="h-screen overflow-hidden transition-colors duration-200">
        <Navigation
          isVisible={showNavigation}
          theme={theme as 'light' | 'dark'}
          onClose={() => setShowNavigation(false)}
        />

        {/* Scrollable Content Area */}
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
                my <Link href="/history" className="hover:no-underline">history</Link>
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
                    {item.links && item.links.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {item.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 underline hover:no-underline transition-colors"
                          >
                            {link.text}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Footer />
            </div>
          </div>
        </main>
      </div>
    // </PageTransition>
  );
}
