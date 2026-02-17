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
    
    // {
    //   title: 'Cooking',
    //   why: 'I love experimenting in the kitchen — trying new recipes, new cuisines, and making food for people I care about.',
    //   image: '/loves/cooking.jpg',
    // },
    // {
    //   title: 'Trying new foods',
    //   why: 'Nothing beats discovering a dish you never knew existed. Street food, hole-in-the-wall spots, anything.',
    //   image: '/loves/food.jpg',
    // },
    {
      title: 'Makoto Shinkai',
      why: 'My favorite filmmaker. The stories, the silence, the skies. your name and the garden words are my most fav.',
      image: '/loves/Makoto.jpg',
    },
        {
      title: 'Frieren',
      why: 'one of my fav anime .',
      image: '/loves/frieren.jpg',
    },
    {
      title: 'Pizza',
      why: 'Fresh out of the wooden oven. Instant happiness.',
      image: '/loves/pizza1.jpeg',


    },
        {
      title: 'Iced Pour-Over Coffee',
      why: 'My kind of comfort.',
      image: '/loves/coffee.jpeg',
    },


    {
      title: 'Cafe hopping',
      why: 'I love cafe hopping — a quiet cafe and im set for a productive sunday.',
      image: '/loves/cafe.jpeg',
    },


    // {
    //   title: 'Calligraphy',
    //   why: 'Currently learning. There\'s something meditative about shaping letters with intention. Every stroke matters.',
    //   image: '/loves/calligraphy.jpg',
    // },
    // {
    //   title: 'Pencil drawing',
    //   why: 'I love sketching — it slows everything down and makes you really see things.',
    //   image: '/loves/drawing.jpg',
    // },
    {
      title: 'Pistachio Ice Cream Cone',
      why: 'take my heart',
      image: '/loves/fav-ic.jpeg',
    },

    {
      title: 'Late night walks + songs',
      why: 'My kinda love language',
      image: '/loves/late-night-walk.jpeg',
    },

        {
      title: 'Cats',
      why: 'Why shouldn\'t i love them?',
      image: '/loves/cat.jpeg',
    },

      //   {
      // title:'random doodles',
      // why: 'I like to draw random stuff when i\'m bored. It\'s fun and relaxing.',
      // image: '/loves/doodles.jpeg',

    // },
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

          <div className="columns-1 sm:columns-2 gap-4 space-y-4">
            {loves.map((item, index) => (
              <div
                key={index}
                className="group relative break-inside-avoid rounded-xl overflow-hidden cursor-default"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1200}
                  height={1200}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  quality={100}
                  style={{ width: '100%', height: 'auto' }}
                  className="block"
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