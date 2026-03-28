'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ThemeWave from '@/components/ThemeWave';
import { useTheme } from '@/hooks/useTheme';

const contributions = [
  {
    name: 'BerriAI (YC)',
    description: 'Python SDK to call 100+ LLM providers with unified APIs, cost tracking, and guardrails',
    prs: [
      { title: 'Fix: Gemini Flash 2.0 implementation is not returning the logprobs', url: 'https://github.com/BerriAI/litellm/pull/9713' }
    ],
    date: '2025'
  },
    {
    name: 'Stylelint',
    description: 'A mighty CSS linter that helps you avoid errors and enforce conventions',
    prs: [
      { title: 'Fix: custom-property-no-missing-var-function false positives for style query in if() function', url: 'https://github.com/stylelint/stylelint/pull/8813' }
    ],
    date: '2025'
  },
  {
    name: 'Ecma TC39',
    description: 'Ecma TC39 is the standards committee that designs and maintains the official JavaScript language specification',
    prs: [
      { title: 'Editorial: use typical phrasing for Agent Record field access', url:"https://github.com/tc39/ecma262/pull/3704"}
    ] ,
     date: '2025'

},
    {
    name: 'Andromeda',
    description: 'JavaScript and TypeScript runtime, written in Rust and powered by the Nova engine',
    prs: [
      { title: 'Feat: implement missing store verbose/strict in compiled binary', url: 'https://github.com/tryandromeda/andromeda/pull/172' },
      { title: 'Feat: implement profile, profileEnd and timeStamp console methods', url: 'https://github.com/tryandromeda/andromeda/pull/184' }
    ],
    date: '2025'
  },
  {
    name: 'Meilisearch',
    description: 'Powerful, fast, and an easy to use search engine',
    prs: [
      { title: 'Added updateDocumentsCsv(string docs, string primaryKey)', url: 'https://github.com/meilisearch/meilisearch-python/pull/654' },
    ],
    date: '2023'
  },
  {
    name: 'ToolJet',
    description: 'Open-source low-code application development platform for building and deploying business applications',
    prs: [
      { title: 'Documentation bug fix', url: 'https://github.com/ToolJet/ToolJet/pull/5376' },
    ],
    date: '2023'
  },
    {
    name: 'Amplication',
    description: 'Open-source backend development platform. Build production-ready services without wasting time on repetitive coding',
    prs: [
      { title: 'Docs: grammatical errors in the readme', url: 'https://github.com/amplication/amplication/pull/7154' },
    ],
    date: '2023'
  },
        {
    name: 'Litefy',
    description: 'A lightweight Spotify client',
    prs: [
      { title: 'Added Bengali language support', url: 'https://github.com/mathkruger/litefy/pull/100' },
    ],
    date: '2023'
  },
];

export default function ContributionsPage() {
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
    <div className="h-screen overflow-hidden transition-colors duration-200">
      <ThemeWave isAnimating={isAnimating} incomingTheme={incomingTheme} />
      <Navigation
        isVisible={showNavigation}
        theme={theme}
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

            <h1 className="text-2xl font-medium mb-8 tracking-wider text-gray-900 dark:text-gray-100">
              open source contributions
            </h1>

            <div className="space-y-6">
              {contributions.map((project, index) => (
                <div 
                  key={index} 
                  className="border-b border-gray-200 dark:border-gray-700 pb-5 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {project.name}
                    </h3>
                    <span className="ml-4 text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                      {project.date}
                    </span>
                  </div>
                  
                  <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400 mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-col gap-1.5">
                    {project.prs.map((pr, prIndex) => (
                      <Link
                        key={prIndex}
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[13px] text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group/link"
                      >
                        <svg className="w-3 h-3 opacity-50 group-hover/link:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="group-hover/link:underline">{pr.title}</span>
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
