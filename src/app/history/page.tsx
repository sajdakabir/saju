'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ThemeWave from '@/components/ThemeWave';
import { useTheme } from '@/hooks/useTheme';

type HistoryLink = {
  text: string;
  url: string;
};

type HistoryItem = {
  year: string;
  title: string;
  body: string | React.ReactNode;
  links?: HistoryLink[];
};

const history: HistoryItem[] = [
  {
    year: '2026',
    title: 'coming soon.',
    body: 'A fresh chapter — still being written.',
  },
  {
    year: '2025',
    title: 'Won my first hackathon.',
    body: 'On June 29 we won the Digital Country Hackathon Bhutan with our team project The Residents. It was my first hackathon — I initially joined for the free food.',
    links: [
      { text: 'Project repo', url: 'https://github.com/ZerraHQ/digital-country-hackathon-bhutan-2025/tree/main/the-residents' },
      { text: 'Demo video', url: 'https://www.loom.com/share/4e04841cfa3648248967972fe110a6d8?sid=cb69eaa4-6bc8-40be-889b-201ef74f14ec' },
      { text: 'Winners', url: 'https://x.com/dsh_india/status/1941068196376969463?s=20' },
    ],
  },
  {
    year: '2024',
    title: 'Started building March.',
    body: 'Pivoted twice to make the product sharper. Open-sourced it, got real contributors, learned that shipping and scaling are different sports. Sleepless nights on AWS. One of the best years.',
    links: [
      { text: 'march →', url: 'https://march.cat/' },
      { text: 'Changelog', url: 'https://github.com/martian-st/march' },
    ],
  },
  {
    year: '2023',
    title: 'Fell for the backend.',
    body: 'Found my interest in backend architecture. Built 7+ backend-focused projects in two months. Started contributing to open source.',
    links: [{ text: 'All contributions', url: '/oss-acc' }],
  },
  {
    year: '2022',
    title: 'Deep into DSA.',
    body: 'Back to college after lockdown — assignments, attendance, and DSA. Became deeply interested in data structures. Favourite topics: graphs, recursion, dynamic programming.',
  },
  {
    year: '2021',
    title: 'Created my GitHub.',
    body: 'On June 27 I created my GitHub account and started learning to code on my laptop, properly.',
  },
  {
    year: '2020',
    title: 'First-ever laptop.',
    body: 'Got my first laptop. For almost a year I didn’t even touch it — I practiced coding on pen and paper 😄',
  },
  {
    year: '2019',
    title: 'Sneaked into engineering.',
    body: 'In university I saw students typing strange English words that turned into beautiful websites and games. I was fascinated. I borrowed ₹500 from a friend — without telling my parents — to register for the entrance exam. Ranked 66 and switched to Engineering. Told my dad only when I needed ₹8,000 for admission.',
  },
  {
    year: '2018',
    title: 'Math Honours @ Aliah.',
    body: (
      <>
        Scored 93 in Mathematics in the 12th board exams. Ranked 13 in the Mathematics entrance and joined{' '}
        <Link
          href="https://www.aliah.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          Aliah University
        </Link>{' '}
        for Mathematics Honours. Also the year I got my first phone and access to the internet.
      </>
    ),
  },
  {
    year: '2017',
    title: 'Came home for Class 12.',
    body: "Left the mission after a year and came back to my hometown. I've never been someone who likes staying in a closed room. I love reading, but I prefer learning by doing rather than just reading like a robot.",
  },
  {
    year: '2016',
    title: 'Al-Ameen Mission.',
    body: 'Gave my 10th board exams. Mom enrolled me for the Al-Ameen Mission entrance exam — I got selected and moved there.',
    links: [{ text: 'Al-Ameen Mission', url: 'https://alameenmission.org/alameencms/' }],
  },
  {
    year: '2001',
    title: 'Born in Plassy.',
    body: 'Born in Plassy, Calcutta, India. The story starts here.',
  },
];

export default function HistoryPage() {
  const { theme, mounted, toggleTheme, isAnimating, incomingTheme } = useTheme();
  const [showNavigation, setShowNavigation] = useState(true);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-200">
      <ThemeWave isAnimating={isAnimating} incomingTheme={incomingTheme} />
      <Navigation
        isVisible={showNavigation}
        theme={theme}
        onClose={() => setShowNavigation(false)}
      />

      <main className="pl-0 md:pl-24">
        <div className="min-h-screen flex justify-center p-4 sm:p-6 pt-10 sm:pt-16">
          <div className="max-w-2xl w-full mx-auto px-4">
            <ThemeToggle onClick={toggleTheme} theme={theme} />

            <div className="mb-16">
              <div className="text-[11px] font-mono text-gray-400 dark:text-gray-600 mb-1">
                sajdakabir.com / history
              </div>
              <h1 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                history
              </h1>
            </div>

            <div>
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-6 sm:gap-10 py-7 border-b border-gray-100 dark:border-gray-800"
                >
                  <div className="w-10 shrink-0 pt-0.5 text-[11px] font-mono tabular-nums text-gray-400 dark:text-gray-600">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {item.title}
                      </span>{' '}
                      {item.body}
                    </p>
                    {item.links && item.links.length > 0 && (
                      <div className="flex flex-wrap gap-4 mt-3">
                        {item.links.map((link, linkIndex) => {
                          const external = link.url.startsWith('http');
                          return (
                            <Link
                              key={linkIndex}
                              href={link.url}
                              {...(external
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {})}
                              className="text-xs text-gray-500 dark:text-gray-500 underline hover:no-underline transition-colors"
                            >
                              {link.text}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 mb-16 text-[11px] font-mono text-gray-300 dark:text-gray-700">
              — end —
            </div>

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
