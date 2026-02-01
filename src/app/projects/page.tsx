'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Github } from 'lucide-react';

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
      date: '2024'
    },
   {
      name: 'webToMd',
      description: "Web to Markdown converts any website URL into a clean, readable Markdown file. Built to scrape, clean, and prepare content for LLMs",
      techStack: ['Nextjs', 'Flask', 'python', 'BeautifulSoup', 'Playwright', 'ZenRows', 'openAi'],
      githubUrl: 'https://github.com/sajdakabir/webToMd',
      liveUrl: 'https://webtomd.sajdakabir.com/',

      challenges: [
   
      ],
      date: '2025'
    },
       {
      name: 'userArray',
      description: "userArray is a Linear companion for open-source and user-facing teams. It syncs your Linear workspace to collect feedback, share progress, and keep users updated.",
      techStack: ['Nextjs', 'Nodejs', 'Webhooks', 'websockets', 'Redis', 'MongoDB'],
      githubUrl: 'https://github.com/sajdakabir/userarray',
      liveUrl: 'https://userarray.sajdakabir.com/',

      challenges: [
   
      ],
      date: '2025'
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
          <div className="min-h-full flex justify-center p-6 pt-6">
            <div className="max-w-2xl w-full mx-auto px-4">
              <ThemeToggle onClick={toggleTheme} theme={theme as 'light' | 'dark'} />

              <div className="mb-6">
                <h1 className="text-2xl font-medium mb-6 tracking-wider text-gray-900 dark:text-gray-100">Projects</h1>
                <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
                  A collection of projects I've built over time.
                </p>
              </div>

              <div className="space-y-8">
                {projects.length === 0 ? (
                  <p className="text-[14px] text-gray-500 dark:text-gray-500">Coming soon...</p>
                ) : (
                  projects.map((project, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                    >
                      {/* Header with Title and Date */}
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex-1">
                          {project.githubUrl ? (
                            <Link 
                              href={project.githubUrl}
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
                        <span className="ml-4 text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                          {project.date}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[14px] leading-relaxed text-gray-600 dark:text-gray-400 mb-4">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.techStack.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="inline-block px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* GitHub Stats */}
                      {project.githubStats && (
                        <div className="mb-5 flex gap-4 text-xs text-gray-600 dark:text-gray-400">
                          {project.githubStats.stars !== undefined && (
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                              <span>{project.githubStats.stars} stars</span>
                            </div>
                          )}
                          {project.githubStats.forks !== undefined && (
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4" />
                              </svg>
                              <span>{project.githubStats.forks} forks</span>
                            </div>
                          )}
                          {project.githubStats.contributors !== undefined && (
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                              <span>{project.githubStats.contributors} contributors</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex flex-wrap gap-4  ">
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[13px] text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                        >
                             <Github size={16}/>
                          GitHub
                        </Link>
                        {project.liveUrl && (
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[13px] text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Link
                          </Link>
                        )}
                        {project.links && project.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[13px] text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Footer />
            </div>
          </div>
        </main>
      </div>
  );
}