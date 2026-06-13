'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ThemeWave from '@/components/ThemeWave';
import { useTheme } from '@/hooks/useTheme';
import type { PostMeta } from '@/lib/posts';

interface PostsClientProps {
  posts: PostMeta[];
}

export default function PostsClient({ posts }: PostsClientProps) {
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
        theme={theme as 'light' | 'dark'}
        onClose={() => setShowNavigation(false)}
      />

      <main className="pl-0 md:pl-24">
        <div className="min-h-screen flex justify-center p-4 sm:p-6 pt-20 sm:pt-16">
          <div className="max-w-2xl w-full mx-auto px-4">
            <ThemeToggle onClick={toggleTheme} theme={theme} />

            <div className="mb-16">
              <div className="text-[11px] font-mono text-gray-400 dark:text-gray-600 mb-1">
                sajdakabir.com / writing
              </div>
              <h1 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                writing
              </h1>
            </div>

            {posts.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">nothing published yet.</p>
            ) : (
              <ul className="font-mono text-sm list-disc pl-5 space-y-2 text-gray-900 dark:text-gray-100 marker:text-gray-400 dark:marker:text-gray-600">
                {posts.map((post) => (
                  <li key={post.slug} className="leading-relaxed">
                    <span className="text-gray-500 dark:text-gray-500 tabular-nums">
                      {post.date}
                    </span>
                    <span className="mx-2 text-gray-400 dark:text-gray-600">›</span>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="underline hover:no-underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
