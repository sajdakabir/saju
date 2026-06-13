'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import ThemeWave from '@/components/ThemeWave';
import { useTheme } from '@/hooks/useTheme';
import type { Post } from '@/lib/posts';

function formatDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

interface PostClientProps {
  post: Post;
}

function PostActions({ slug }: { slug: string }) {
  const likedKey = `liked-${slug}`;

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [popped, setPopped] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(likedKey) === '1');
    fetch(`/api/likes/${slug}`)
      .then((r) => r.json())
      .then((d) => setCount(d.count));
  }, [slug, likedKey]);

  const handleLike = async () => {
    const next = !liked;
    setLiked(next);
    localStorage.setItem(likedKey, next ? '1' : '0');
    if (next) {
      setPopped(true);
      setTimeout(() => setPopped(false), 500);
    }
    const res = await fetch(`/api/likes/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: next ? 'like' : 'unlike' }),
    });
    const data = await res.json();
    setCount(data.count);
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
          {count === null ? '' : count > 0 ? count : ''}
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
        <div className="min-h-full flex justify-center p-4 sm:p-6 pt-20 sm:pt-16">
          <div className="max-w-2xl w-full mx-auto px-4">
            <ThemeToggle onClick={toggleTheme} theme={theme} />

            <div className="mb-14">
              <div className="text-[11px] font-mono text-gray-400 dark:text-gray-600 mb-6">
                writing&nbsp;&nbsp;/&nbsp;&nbsp;{post.slug}
              </div>
              <div className="text-[11px] font-mono tabular-nums text-gray-500 dark:text-gray-500">
                {formatDate(post.date)}
              </div>
              <h1 className="text-3xl sm:text-4xl font-medium mt-3 leading-[1.15] tracking-tight text-gray-900 dark:text-gray-100">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-base italic text-gray-500 dark:text-gray-400 mt-5 leading-relaxed">
                  {post.description}
                </p>
              )}
            </div>

            {post.toc.length > 0 && (
              <nav
                aria-label="Table of contents"
                className="mb-14 border-l-2 border-[#cc785c]/40 dark:border-[#e89a7d]/40 pl-5"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#cc785c] dark:text-[#e89a7d] mb-3">
                  contents
                </div>
                <ul className="space-y-1.5 text-sm">
                  {post.toc.map((item) => (
                    <li
                      key={item.slug}
                      style={{ paddingLeft: `${Math.max(0, item.level - 3) * 1}rem` }}
                    >
                      <a
                        href={`#${item.slug}`}
                        className="text-gray-500 dark:text-gray-500 hover:text-[#cc785c] dark:hover:text-[#e89a7d] hover:underline transition-colors"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <article className="prose prose-base dark:prose-invert max-w-none
              prose-headings:font-medium prose-headings:text-gray-900 dark:prose-headings:text-gray-100
              prose-headings:tracking-tight prose-headings:scroll-mt-24
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-14 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-3
              prose-h4:text-base prose-h4:mt-8 prose-h4:mb-2 prose-h4:text-gray-700 dark:prose-h4:text-gray-300
              prose-p:text-[15.5px] prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-[1.75]
              prose-a:text-gray-900 dark:prose-a:text-gray-100 prose-a:underline prose-a:underline-offset-2 prose-a:decoration-gray-300 dark:prose-a:decoration-gray-700 hover:prose-a:text-[#cc785c] dark:hover:prose-a:text-[#e89a7d] hover:prose-a:decoration-current
              prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
              prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[13.5px] prose-code:before:content-none prose-code:after:content-none
              prose-blockquote:border-l-2 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700 prose-blockquote:not-italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-blockquote:pl-5
              prose-ul:text-[15.5px] prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ul:leading-[1.75]
              prose-ol:text-[15.5px] prose-ol:text-gray-700 dark:prose-ol:text-gray-300 prose-ol:leading-[1.75]
              prose-li:marker:text-gray-400 dark:prose-li:marker:text-gray-600
              prose-hr:border-gray-200 dark:prose-hr:border-gray-800 prose-hr:my-14
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                {post.content}
              </ReactMarkdown>
            </article>

            <div className="mt-16 mb-2 text-center text-[11px] font-mono text-[#cc785c] dark:text-[#e89a7d]">
              — end —
            </div>

            <PostActions slug={post.slug} />

            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
