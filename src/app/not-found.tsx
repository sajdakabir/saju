'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Helper function to get initial theme (same as in your main page)
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemDark ? 'dark' : 'light';
  }
  return 'dark'; // Default to dark theme
};

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('dark'); // Default to dark theme

  // Initialize theme after mount
  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  // Update theme when it changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111] text-gray-100">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <main className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Starry background with multiple layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Small distant stars */}
        {[...Array(200)].map((_, i) => {
          const size = Math.random() * 1.5 + 0.5;
          return (
            <div
              key={`small-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: size + 'px',
                height: size + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.4 + 0.2,
                animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 5}s infinite`,
                boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.5)`,
              }}
            />
          );
        })}

        {/* Medium bright stars */}
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 2 + 1.5;
          return (
            <div
              key={`medium-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: size + 'px',
                height: size + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.6 + 0.4,
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 3}s infinite`,
                boxShadow: `0 0 ${size * 3}px rgba(255, 255, 255, 0.8)`,
              }}
            />
          );
        })}

        {/* Large sparkle stars */}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 3 + 2;
          return (
            <div
              key={`large-${i}`}
              className="absolute"
              style={{
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 4}s infinite`,
              }}
            >
              <div
                className="rounded-full bg-white"
                style={{
                  width: size + 'px',
                  height: size + 'px',
                  boxShadow: `
                    0 0 ${size * 4}px rgba(255, 255, 255, 0.9),
                    0 0 ${size * 8}px rgba(255, 255, 255, 0.5),
                    0 0 ${size * 12}px rgba(255, 255, 255, 0.3)
                  `,
                }}
              />
            </div>
          );
        })}

        {/* Crystal Astronaut Image - right side - clickable */}
        <Link
          href="/"
          className="absolute right-[10%] top-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-105"
          style={{
            animation: 'float 8s ease-in-out infinite',
          }}
        >
          <Image
            src="/Cool_Astronaut-removebg-preview.png"
            alt="Crystal Astronaut in Space - Click to return home"
            width={450}
            height={650}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Content - left side */}
      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 max-w-md z-10">
        <h1 className="text-6xl font-light text-white mb-4 tracking-wide">
          404
        </h1>
        <p className="text-xl text-gray-400 mb-2 font-light">
          Lost in space
        </p>
        <p className="text-sm text-gray-500 mb-8 font-light">
          This page drifted away into the void
        </p>
        <Link
          href="/"
          className="inline-block text-sm text-gray-400 hover:text-white transition-colors duration-300 border-b border-gray-600 hover:border-white pb-1"
        >
          Return to Earth →
        </Link>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.3);
          }
        }
        
        @keyframes sparkle {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1) rotate(0deg);
          }
          25% {
            opacity: 0.8;
            transform: scale(1.2) rotate(90deg);
          }
          50% { 
            opacity: 1;
            transform: scale(1.4) rotate(180deg);
          }
          75% {
            opacity: 0.8;
            transform: scale(1.2) rotate(270deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(-50%) translateY(0) rotate(-3deg);
          }
          33% {
            transform: translateY(-50%) translateY(-30px) rotate(2deg);
          }
          66% {
            transform: translateY(-50%) translateY(-15px) rotate(-2deg);
          }
        }
      `}</style>
    </main>
  );
}
