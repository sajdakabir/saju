'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// TypeScript interfaces for component props
interface NavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
}

interface NavigationProps {
  isVisible: boolean;
  theme: 'light' | 'dark';
  onNavigate?: (section: string) => void;
  onClose?: () => void;
}

// Navigation items configuration with icons
const navigationItems: NavigationItem[] = [
  {
    label: 'home',
    href: '/',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    label: 'history',
    href: '/history',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
    {
    label: 'contributions',
    href: '/contributions',
    icon: (
     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
    )
  },
  {
    label: 'projects',
    href: '/projects',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    label: 'notes',
    href: '/notes',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  {
    label: 'photos',
    href: '/photos',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
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
          width: '64px',
          background: theme === 'dark' 
            ? 'rgba(0, 0, 0, 0.4)' 
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(24px)',
          borderRadius: '24px',
          border: theme === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: theme === 'dark' 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
          padding: '12px'
        }}
      >
        <nav
          aria-label="Main navigation"
          role="navigation"
          id="main-navigation"
        >
          {/* Navigation Items */}
          <div className="flex flex-col items-center space-y-3">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    onClick={() => handleNavigationClick(item.label)}
                    className={`
                    nav-item
                    flex items-center justify-center
                    w-10 h-10
                    rounded-2xl
                    transition-all duration-200 ease-out
                    transform-gpu will-change-transform
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
                    ${theme === 'dark' 
                      ? 'focus:ring-white/30' 
                      : 'focus:ring-gray-900/30'
                    }
                    ${isActive
                        ? theme === 'dark'
                          ? 'bg-white/90 text-gray-900 shadow-lg scale-105'
                          : 'bg-gray-900/90 text-white shadow-lg scale-105'
                        : theme === 'dark'
                          ? 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white hover:scale-105'
                          : 'bg-gray-900/10 text-gray-700 hover:bg-gray-900/20 hover:text-gray-900 hover:scale-105'
                      }
                    active:scale-95
                  `}
                    aria-label={`Navigate to ${item.label}`}
                    title={item.label}
                  >
                    {item.icon}
                  </Link>

                  {/* Tooltip */}
                  <div className={`
                  absolute left-full ml-3 top-1/2 -translate-y-1/2
                  px-3 py-2 backdrop-blur-sm
                  text-sm font-medium
                  rounded-lg shadow-xl
                  opacity-0 group-hover:opacity-100
                  pointer-events-none
                  transition-opacity duration-200
                  whitespace-nowrap
                  z-50
                  ${theme === 'dark' 
                    ? 'bg-black/80 text-white' 
                    : 'bg-white/90 text-gray-900 border border-gray-200'
                  }
                `}>
                    <span className="capitalize">{item.label}</span>
                    {/* Arrow */}
                    <div className={`absolute right-full top-1/2 -translate-y-1/2 
                                  border-4 border-transparent 
                                  ${theme === 'dark' 
                                    ? 'border-r-black/80' 
                                    : 'border-r-white/90'
                                  }`} />
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}