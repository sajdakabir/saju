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
              <div className="space-y-5">
                {posts.map((post) => (
                  <div key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-5 last:border-b-0">
                    <div className="flex items-start justify-between mb-1">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="text-[15px] font-medium text-gray-900 dark:text-gray-100 hover:underline"
                      >
                        {post.title}
                      </Link>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                        {post.date}
                      </span>
                    </div>
                    {post.description && (
                      <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
                        {post.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
