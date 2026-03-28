'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationProps {
  isVisible: boolean;
  theme: 'light' | 'dark';
  onNavigate?: (section: string) => void;
  onClose?: () => void;
}

const navigationItems: NavigationItem[] = [
  { label: 'home', href: '/' },
  { label: 'history', href: '/history' },
  { label: 'oss/acc', href: '/oss-acc' },
  { label: 'projects', href: '/projects' },
  { label: 'posts', href: '/posts' },
  { label: 'love', href: '/photos' },
];

export default function Navigation({ isVisible, theme, onNavigate }: NavigationProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigationClick = useCallback((section: string) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(section);
    }
  }, [onNavigate]);

  const linkClasses = (isActive: boolean) => `
    transition-all duration-200 ease-out
    ${isActive
      ? theme === 'dark'
        ? 'text-white underline underline-offset-4'
        : 'text-gray-900 underline underline-offset-4'
      : theme === 'dark'
        ? 'text-white/50 hover:text-white/80'
        : 'text-gray-500 hover:text-gray-900'
    }
  `;

  return (
    <>
      {/* Desktop: Left Sidebar */}
      <div
        className={`hidden md:block fixed z-[9999] ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{
          top: '50vh',
          left: '16px',
          transform: isVisible
            ? 'translateY(-50%) translateX(0)'
            : 'translateY(-50%) translateX(-16px)',
          transition: 'opacity 300ms ease-out, transform 300ms ease-out',
          padding: '12px'
        }}
      >
        <nav aria-label="Main navigation">
          <div className="flex flex-col items-start space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleNavigationClick(item.label)}
                className={`nav-item text-sm ${linkClasses(pathname === item.href)}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile: Hamburger Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`
          md:hidden fixed top-5 left-5 z-[10000] p-2 rounded-full
          transition-all duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="w-[18px] flex flex-col items-center justify-center gap-[4px]">
          <span
            className={`block w-full h-[1.5px] transition-all duration-300 origin-center
              ${menuOpen ? 'rotate-45 translate-y-[5.5px]' : ''}
              ${menuOpen
                ? 'bg-gray-900 dark:bg-white'
                : 'bg-gray-600 dark:bg-gray-400'
              }
            `}
          />
          <span
            className={`block w-full h-[1.5px] transition-all duration-300
              ${menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}
              ${menuOpen
                ? 'bg-gray-900 dark:bg-white'
                : 'bg-gray-600 dark:bg-gray-400'
              }
            `}
          />
          <span
            className={`block w-full h-[1.5px] transition-all duration-300 origin-center
              ${menuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}
              ${menuOpen
                ? 'bg-gray-900 dark:bg-white'
                : 'bg-gray-600 dark:bg-gray-400'
              }
            `}
          />
        </div>
      </button>

      {/* Mobile: Menu Panel — slides down from top */}
      <div
        className={`
          md:hidden fixed top-0 left-0 right-0 z-[9999]
          bg-white dark:bg-[#1B1B1B]
          border-b border-gray-100 dark:border-gray-800
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${menuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
          }
        `}
      >
        <nav aria-label="Main navigation" className="px-7 pt-16 pb-8">
          <div className="flex flex-col space-y-5">
            {navigationItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleNavigationClick(item.label)}
                className={`text-[15px] ${linkClasses(pathname === item.href)}`}
                style={{
                  transition: `opacity 300ms ${index * 50}ms, transform 300ms ${index * 50}ms`,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile: Backdrop */}
      <div
        className={`
          md:hidden fixed inset-0 z-[9998]
          bg-black/20 dark:bg-black/40
          transition-opacity duration-300
          ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
}
