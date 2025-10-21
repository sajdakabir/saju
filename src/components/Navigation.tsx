'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  { label: 'projects', href: '/projects' },
  { label: 'notes', href: '/notes' },
  { label: 'photos', href: '/photos' }
];

export default function Navigation({ isVisible, theme, onNavigate, onClose }: NavigationProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [animationClass, setAnimationClass] = useState('');

  // Handle animation states
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Small delay to ensure DOM is ready for animation
      requestAnimationFrame(() => {
        setAnimationClass('nav-enter');
      });
    } else {
      setAnimationClass('nav-exit');
      // Remove from DOM after exit animation completes
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimationClass('');
      }, 300); // Match exit animation duration

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Enhanced keyboard navigation and focus management
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isVisible) return;

      switch (event.key) {
        case 'Escape':
          if (onClose) {
            onClose();
          }
          break;
        case 'Tab':
          // Let browser handle tab navigation, but ensure focus stays within navigation
          const focusableElements = document.querySelectorAll(
            'nav[aria-label="Main navigation"] a, nav[aria-label="Main navigation"] button, .mobile-nav a, .mobile-nav button'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
          break;
        case 'Enter':
        case ' ':
          // Handle Enter and Space for navigation items
          const target = event.target as HTMLElement;
          if (target.tagName === 'A' || target.tagName === 'BUTTON') {
            // Let the default behavior handle the click
            return;
          }
          break;
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isVisible, onClose]);

  // Focus management when navigation opens/closes
  useEffect(() => {
    if (isVisible) {
      // Store the previously focused element
      const previouslyFocused = document.activeElement as HTMLElement;

      // Focus the first navigation item after a short delay to allow animation
      const timer = setTimeout(() => {
        const firstNavItem = document.querySelector('nav[aria-label="Main navigation"] a, .mobile-nav a') as HTMLElement;
        firstNavItem?.focus();
      }, 100);

      return () => {
        clearTimeout(timer);
        // Return focus to the previously focused element when closing
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
          previouslyFocused.focus();
        }
      };
    }
  }, [isVisible]);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  }, [onClose]);

  const handleNavigationClick = useCallback((section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  }, [onNavigate]);

  // Don't render if not visible and not animating
  if (!shouldRender) return null;

  return (
    <>
      {/* Mobile Navigation - Full screen overlay */}
      <div
        className={`
          sm:hidden fixed inset-0 z-50 
          ${isVisible ? 'block' : 'hidden'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isVisible}
        id="main-navigation"
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-black/10 dark:bg-black/30 backdrop-blur-[2px]
            transition-opacity duration-300
            ${isVisible ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={onClose}
          aria-label="Close navigation menu"
        />

        {/* Mobile Menu */}
        <nav
          className={`
            mobile-nav
            ${animationClass}
            absolute top-0 left-0 right-0
            bg-white/98 dark:bg-[#1B1B1B]/98 backdrop-blur-md
            shadow-lg
            transition-transform duration-300 ease-out
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}
            px-6 py-8
            will-change-transform
          `}
          style={{ contain: 'layout style paint' }}
          aria-label="Mobile navigation"
          role="navigation"
        >
          {/* Close button - top right */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="
                p-3 text-gray-400 dark:text-gray-500
                hover:text-gray-600 dark:hover:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-800
                rounded-full transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                dark:focus:ring-gray-500 dark:focus:ring-offset-gray-800
                min-h-[48px] min-w-[48px] flex items-center justify-center
                active:scale-95
              "
              aria-label="Close navigation menu"
              type="button"
              tabIndex={0}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="img"
              >
                <title>Close menu</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation items - centered and spaced */}
          <ul className="flex flex-col items-center space-y-6 max-w-sm mx-auto" role="list">
            {navigationItems.map((item, index) => (
              <li key={item.label} role="listitem">
                <Link
                  href={item.href}
                  onClick={() => {
                    handleNavigationClick(item.label);
                    onClose?.();
                  }}
                  className="
                    nav-item
                    w-full text-center py-5 px-6
                    text-[20px] font-medium text-gray-800 dark:text-gray-200 
                    hover:text-gray-900 dark:hover:text-gray-100 
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    transition-all duration-300 ease-out
                    motion-reduce:transition-colors
                    focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                    dark:focus:ring-gray-500 dark:focus:ring-offset-gray-800
                    rounded-xl border border-gray-200 dark:border-gray-700
                    transform-gpu will-change-transform
                    active:scale-[0.96] active:bg-gray-200 dark:active:bg-gray-700
                    shadow-sm hover:shadow-md
                    min-h-[60px] flex items-center justify-center
                    block
                  "
                  style={{
                    transitionProperty: 'color, background-color, transform, box-shadow',
                  }}
                  aria-label={`Navigate to ${item.label} section`}
                  aria-describedby={`nav-item-${index}-desc`}
                  tabIndex={0}
                >
                  <span className="capitalize tracking-wide">{item.label}</span>
                  <span id={`nav-item-${index}-desc`} className="sr-only">
                    Navigate to {item.label} page
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Subtle hint text */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500" aria-live="polite">
              Tap outside to close or press Escape
            </p>
          </div>
        </nav>
      </div>

      {/* Desktop/Tablet Navigation - Top bar */}
      <nav
        className={`
          ${animationClass}
          hidden sm:block
          fixed top-0 left-0 right-0 z-50
          bg-white/95 dark:bg-[#1B1B1B]/95 backdrop-blur-sm
          border-b border-gray-200 dark:border-gray-700
          transition-all duration-500 ease-out
          motion-reduce:transition-none motion-reduce:duration-0
          ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full'
          }
          transform-gpu will-change-transform
          px-6 py-4
        `}
        style={{
          transitionProperty: 'opacity, transform',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          contain: 'layout style paint',
        }}
        aria-label="Main navigation"
        aria-hidden={!isVisible}
        role="navigation"
        id="main-navigation"
      >
        <ul className="max-w-2xl mx-auto flex justify-center space-x-6 md:space-x-8" role="list">
          {navigationItems.map((item, index) => (
            <li key={item.label} role="listitem">
              <Link
                href={item.href}
                onClick={() => handleNavigationClick(item.label)}
                className="
                  nav-item
                  text-[14px] md:text-[15px] text-gray-600 dark:text-gray-300 
                  hover:text-gray-900 dark:hover:text-gray-100 
                  hover:underline hover:scale-105
                  transition-all duration-200 ease-out
                  motion-reduce:hover:scale-100 motion-reduce:transition-colors
                  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                  dark:focus:ring-gray-500 dark:focus:ring-offset-gray-800
                  rounded-sm px-2 py-1
                  transform-gpu will-change-transform
                  min-h-[44px] flex items-center
                "
                style={{
                  transitionProperty: 'color, text-decoration, transform',
                }}
                aria-label={`Navigate to ${item.label} section`}
                aria-describedby={`desktop-nav-item-${index}-desc`}
                tabIndex={0}
              >
                {item.label}
                <span id={`desktop-nav-item-${index}-desc`} className="sr-only">
                  Navigate to {item.label} page
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}