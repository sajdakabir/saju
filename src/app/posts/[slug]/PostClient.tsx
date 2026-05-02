'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ThemeWave from '@/components/ThemeWave';
import { useTheme } from '@/hooks/useTheme';
import type { Post } from '@/lib/posts';

interface PostClientProps {
  post: Post;
}

function PostActions({ slug }: { slug: string }) {
  const likedKey = `liked-${slug}`;
  const countKey = `likes-${slug}`;

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [popped, setPopped] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(likedKey) === '1');
    setCount(parseInt(localStorage.getItem(countKey) ?? '0', 10));
  }, [likedKey, countKey]);

  const handleLike = () => {
    const next = !liked;
    const nextCount = next ? count + 1 : Math.max(0, count - 1);
    setLiked(next);
    setCount(nextCount);
    localStorage.setItem(likedKey, next ? '1' : '0');
    localStorage.setItem(countKey, String(nextCount));
    if (next) {
      setPopped(true);
      setTimeout(() => setPopped(false), 500);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={handleLike}
        className="flex items-center gap-1.5 group select-none -ml-1 px-1 py-1 rounded-full transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
        aria-label={liked ? 'unlike' : 'like'}
      >
        <span
          className="relative flex items-center justify-center w-8 h-8"
          style={{
            transform: popped ? 'scale(0.85)' : 'scale(1)',
            transition: 'transform 100ms ease',
          }}
        >
          {/* pop ring */}
          {popped && (
            <span
              className="absolute inset-0 rounded-full bg-red-400/20"
              style={{ animation: 'heartRing 400ms ease-out forwards' }}
            />
          )}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            style={{ transition: 'transform 150ms cubic-bezier(0.34,1.56,0.64,1)' }}
          >
            {liked ? (
              <path
                fill="#f91880"
                d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
              />
            ) : (
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500 dark:text-gray-400 group-hover:text-red-400"
                d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
              />
            )}
          </svg>
        </span>
        <span className={`text-sm tabular-nums transition-colors min-w-[1ch] ${liked ? 'text-[#f91880]' : 'text-gray-400 dark:text-gray-500'}`}>
          {count > 0 ? count : ''}
        </span>
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            copied
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            share
          </>
        )}
      </button>
    </div>
  );
}

export default function PostClient({ post }: PostClientProps) {
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
        theme={theme as 'light' | 'dark'}
        onClose={() => setShowNavigation(false)}
      />

      <main
        className="h-full overflow-y-auto pl-0 md:pl-24"
        style={{ transition: 'padding-left 300ms ease-out' }}
      >
        <div className="min-h-full flex justify-center p-4 sm:p-6 pt-10 sm:pt-16">
          <div className="max-w-2xl w-full mx-auto px-4">
            <ThemeToggle onClick={toggleTheme} theme={theme} />

            <div className="mb-6">
              <span className="text-xs text-gray-500 dark:text-gray-500">{post.date}</span>
              <h1 className="text-2xl font-medium mt-1 text-gray-900 dark:text-gray-100">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  {post.description}
                </p>
              )}
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none
              prose-headings:font-medium prose-headings:text-gray-900 dark:prose-headings:text-gray-100
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-gray-900 dark:prose-a:text-gray-100 prose-a:underline
              prose-code:text-gray-800 dark:prose-code:text-gray-200
              prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
              prose-strong:text-gray-900 dark:prose-strong:text-gray-100
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            <PostActions slug={post.slug} />

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
