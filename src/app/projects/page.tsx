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
  }
  return 'light';
};

interface Challenge {
  problem: string;
  solution: string;
}

interface ProjectLink {
  title: string;
  url: string;
}

interface GitHubStats {
  stars?: number;
  forks?: number;
  contributors?: number;
}

interface Project {
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  links?: ProjectLink[];
  challenges: Challenge[];
  githubStats?: GitHubStats;
  date: string;
  image?: string;
}

export default function Projects() {
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

  const projects: Project[] = [
    {
      name: 'Orbit',
      description: "Your second brain, powered by voice. Journal, take notes, and dictate in any app—all powered by your voice. One workspace to replace multiple apps.",
      techStack: ['Rust', 'Postgres', 'MCP', 'Composio', 'Voice Dictation'],
      githubUrl: 'https://github.com/sajdakabir/orbit',
      liveUrl: 'https://orbit.sajdakabir.com/',
      challenges: [

      ],
      date: '2026',
    },
    {
      name: 'march',
      description: "March brings tasks, meetings, bookmarks, and issues from all your tools into a single actionable workflow. One place to see what matters and get things done.",
      techStack: ['Nextjs', 'Node.js', 'TypeScript', 'Redis', 'mongodb', 'websockets'],
      githubUrl: 'https://github.com/martian-st/march',
      liveUrl: 'https://march.cat/',
      githubStats: {
        stars: 48,
        forks: 53,
        contributors: 17
      },
      challenges: [

      ],
      date: '2024',
      image: '/project/march.png'
    },
   {
      name: 'webToMd',
      description: "Web to Markdown converts any website URL into a clean, readable Markdown file. Built to scrape, clean, and prepare content for LLMs",
      techStack: ['Nextjs', 'Flask', 'python', 'BeautifulSoup', 'Playwright', 'ZenRows', 'openAi'],
      githubUrl: 'https://github.com/sajdakabir/webToMd',
      liveUrl: 'https://webtomd.sajdakabir.com/',

      challenges: [
   
      ],
      date: '2025',
      image: '/project/webtomd.png'
    },
       {
      name: 'userArray',
      description: "userArray is a Linear companion for open-source and user-facing teams. It syncs your Linear workspace to collect feedback, share progress, and keep users updated.",
      techStack: ['Nextjs', 'Nodejs', 'Webhooks', 'websockets', 'Redis', 'MongoDB'],
      githubUrl: 'https://github.com/sajdakabir/userarray',
      liveUrl: 'https://userarray.sajdakabir.com/',

      challenges: [
   
      ],
      date: '2025',
      image: '/project/userarray.png'
    },
  ];

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
          <div className="min-h-full flex justify-center p-4 sm:p-6 pt-16 sm:pt-16">
            <div className="max-w-2xl w-full mx-auto px-0 sm:px-4">
              <ThemeToggle onClick={toggleTheme} theme={theme as 'light' | 'dark'} />

              <div className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6 tracking-wider text-gray-900 dark:text-gray-100">i love building things</h1>

              </div>

              <div className="space-y-6 sm:space-y-8">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 pb-5 sm:pb-6 last:border-b-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 flex-1">
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {project.name}
                        </Link>
                      </h3>
                      <span className="sm:ml-4 text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                        {project.date}
                      </span>
                    </div>

                    <p className="text-[13px] sm:text-[14px] leading-relaxed text-gray-600 dark:text-gray-400 mb-3">
                      {project.description}
                    </p>

                    {/* GitHub Stats */}
                    {project.githubStats && (
                      <div className="mb-4 flex flex-wrap gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                        {project.githubStats.stars !== undefined && (
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span>{project.githubStats.stars} stars</span>
                          </div>
                        )}
                        {project.githubStats.forks !== undefined && (
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4" />
                            </svg>
                            <span>{project.githubStats.forks} forks</span>
                          </div>
                        )}
                        {project.githubStats.contributors !== undefined && (
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span>{project.githubStats.contributors} contributors</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </Link>
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Link
                        </Link>
                      )}
                      {project.image && (
                        <Link
                          href={project.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Screenshot
                        </Link>
                      )}
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