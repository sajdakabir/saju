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

type HistoryLink = {
  text: string;
  url: string;
};

type HistoryItem = {
  year: string;
  event: string | React.ReactNode;
  links?: HistoryLink[];
};

const history: HistoryItem[] = [
  {
    year: '2026',
    event: 'coming soon',
    links: [],
  },
{
  year: '2025',
  event: 'On June 29, we won the Digital Country Hackathon Bhutan 2025 with our team project "The Residents". We built an innovative solution that earned first place among all participants. It was my first hackathon — I initially joined just for the free food 😄',
  links: [
    { text: 'Project Repository', url: 'https://github.com/ZerraHQ/digital-country-hackathon-bhutan-2025/tree/main/the-residents' },
    { text: 'Demo Video', url: 'https://www.loom.com/share/4e04841cfa3648248967972fe110a6d8?sid=cb69eaa4-6bc8-40be-889b-201ef74f14ec' },
    { text: 'Winners Announcement', url: 'https://x.com/dsh_india/status/1941068196376969463?s=20' }
  ]
},

{
  year: '2024',
  event: (
    <>
      We started building{' '}
      <Link
        href="https://github.com/martian-st/march"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:no-underline"
      >
        March
      </Link>
      {' '}. We pivoted twice to make the product sharper and more useful. We open-sourced it and received real user contributions. I learned that building is one thing — scaling and improving user experience is another. We spent sleepless nights shipping features and deploying on AWS. It was one of the best years.
    </>
  ),
},

{
  year: '2023',
event: 'I found my interest in backend development and backend architecture. Within two months, I built 7+ backend-focused projects. This was also the year I started contributing to open source.', links: [ { text: 'See all contributions', url: '/contributions' } ] },

 { year: '2022',
  event: 'Nothing special this year. After lockdown, it was back to college — assignments, attendance, and DSA. I became deeply interested in DSA during this time. Some of my favorite topics were graphs, recursion, and dynamic programming.',
},

{
  year: '2021',
  event: 'On June 27, I created my GitHub account and started learning to code using my laptop.',
},

  {
    year: '2021',
    event: 'in 27th of june i create my github account and started learning coding using laptop',
  },
{
  year: '2020',
  event: 'I got my first-ever laptop. For almost a year, I didn’t even touch it — I practiced coding on pen and paper 😂',
},
{
  year: '2019',
  event: 'In university, I saw students typing strange English words that turned into beautiful websites and games. I was fascinated. Without telling my parents, I borrowed ₹500 from a friend to register for the engineering entrance exam in the same university. I ranked 66 and switched to Engineering. I told my dad only when I needed ₹8,000 for admission.',
},

{
  year: '2018',
  event: (
    <>
      I scored 93 in Mathematics in my 12th board exams. I ranked 13 in the Mathematics entrance exam and joined{' '}
      <Link
        href="https://www.aliah.ac.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:no-underline"
      >
        Aliah University
      </Link>{' '}
      for Mathematics Honours. This was also the year I got my first phone and access to the internet.
    </>
  ),
},

  {
    year: '2017',
    event: 'After a year, I left the mission and came back to my hometown for Class 12. I’ve never been someone who likes staying in a closed room. I love reading books, but I prefer learning by doing rather than just reading like a robot. ',
  },
  {
    year: '2016',
    event: (   <>
      I gave my 10th board exams, and my mom enrolled me for the{' '}
      <Link href="https://alameenmission.org/alameencms/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
        Al-Ameen Mission
      </Link>{' '}
      entrance exam. I got selected and moved there .
    </>)
  },
  {
    year: '2001',
    event: (
      <>
        Born in <Link href="https://en.wikipedia.org/wiki/Palashi" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Plassy</Link>, Calcutta, India.
      </>
    ),
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
