'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

// TypeScript interfaces for component props
interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

interface NavigationProps {
  isVisible: boolean;
  theme: 'light' | 'dark';
  onNavigate?: (section: string) => void;
  onClose?: () => void;
}

// Navigation items configuration
const navigationItems: NavigationItem[] = [
  { label: 'home', href: '/' },
  { label: 'history', href: '/history' },
  { label: 'oss/acc', href: '/contributions' },
  { label: 'projects', href: '/projects' },
  { label: 'posts', href: '/notes' },
  { label: 'love', href: '/photos' },
];

export default function Navigation({ isVisible, theme, onNavigate, onClose }: NavigationProps) {
  const pathname = usePathname();

  // Memoized event handlers
  const handleNavigationClick = useCallback((section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  }, [onNavigate]);

  return (
    <>
      {/* Floating Left Sidebar Navigation */}
      <div
        className={`
          ${isVisible
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
          }
        `}
        style={{
          position: 'fixed',
          top: '50vh',
          left: '16px',
          zIndex: 9999,
          transform: isVisible
            ? 'translateY(-50%) translateX(0)'
            : 'translateY(-50%) translateX(-16px)',
          transition: 'opacity 300ms ease-out, transform 300ms ease-out',
          width: 'auto',
          background: 'transparent',
          backdropFilter: 'none',
          borderRadius: '24px',
          border: 'none',
          boxShadow: 'none',
          padding: '12px'
        }}
      >
        <nav
          aria-label="Main navigation"
          role="navigation"
          id="main-navigation"
        >
          {/* Navigation Items */}
          <div className="flex flex-col items-start space-y-3">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavigationClick(item.label)}
                  className={`
                  nav-item
                  text-sm
                  transition-all duration-200 ease-out
                  ${isActive
                      ? theme === 'dark'
                        ? 'text-white'
                        : 'text-gray-900'
                      : theme === 'dark'
                        ? 'text-white/50 hover:text-white/80'
                        : 'text-gray-500 hover:text-gray-900'
                    }
                `}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}