'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
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

export default function Photos() {
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

  const loves = [
    {
      title: 'Cooking',
      why: 'I love experimenting in the kitchen — trying new recipes, new cuisines, and making food for people I care about.',
      image: '/loves/cooking.jpg',
    },
    {
      title: 'Trying new foods',
      why: 'Nothing beats discovering a dish you never knew existed. Street food, hole-in-the-wall spots, anything.',
      image: '/loves/food.jpg',
    },
    {
      title: 'Your Name',
      why: 'Makoto Shinkai is a genius. Your Name hit me differently — the visuals, the music, the longing.',
      image: '/loves/your-name.jpg',
    },
    {
      title: 'The Garden of Words',
      why: 'Another Shinkai masterpiece. Rain has never looked more beautiful. The quiet intimacy of it stays with you.',
      image: '/loves/garden-of-words.jpg',
    },
    {
      title: 'Frieren',
      why: 'Currently watching and completely hooked. The way it handles time, memory, and what it means to understand someone.',
      image: '/loves/frieren.jpg',
    },
    {
      title: 'Cafe hopping',
      why: 'I love finding quiet working cafes — good coffee, ambient noise, a corner seat. That\'s my happy place.',
      image: '/loves/cafe.jpg',
    },
    {
      title: 'Cats',
      why: 'Cats just get it. Independent, curious, and they choose to love you. What more could you want.',
      image: '/loves/cats.jpg',
    },
    {
      title: 'Late night walks',
      why: 'There\'s something about the world at 2am — empty streets, cool air, your own thoughts. Pure peace.',
      image: '/loves/night-walk.jpg',
    },
    {
      title: 'Calligraphy',
      why: 'Currently learning. There\'s something meditative about shaping letters with intention. Every stroke matters.',
      image: '/loves/calligraphy.jpg',
    },
    {
      title: 'Pencil drawing',
      why: 'I love sketching — it slows everything down and makes you really see things.',
      image: '/loves/drawing.jpg',
    },
    {
      title: 'Writing with my left hand',
      why: 'A random hobby I picked up. It\'s frustrating and fun — like learning to write all over again.',
      image: '/loves/left-hand.jpg',
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
            <div className="max-w-3xl w-full mx-auto px-4">
              <ThemeToggle onClick={toggleTheme} theme={theme as 'light' | 'dark'} />

          <div className="mb-12">
          <h1 className="text-2xl font-medium mb-6 tracking-wider text-gray-900 dark:text-gray-100">What I love</h1>
          <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
            Stuff that makes me smile
          </p>
        </div>

          <div className="columns-2 sm:columns-3 gap-4 space-y-4">
            {loves.map((item, index) => (
              <div
                key={index}
                className="group relative break-inside-avoid rounded-xl overflow-hidden cursor-default"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={800}
                  className="w-full h-auto block"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white dark:bg-gray-900 rounded-lg p-3 sm:p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-sm sm:text-base mb-0.5">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-[13px] leading-relaxed">{item.why}</p>
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