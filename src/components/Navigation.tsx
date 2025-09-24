'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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
}

// Navigation items configuration
const navigationItems: NavigationItem[] = [
  { label: 'projects', href: '/projects' },
  { label: 'notes', href: '/notes' },
  { label: 'photos', href: '/photos' }
];

export default function Navigation({ isVisible, theme, onNavigate }: NavigationProps) {
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

  const handleNavigationClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  // Don't render if not visible and not animating
  if (!shouldRender) return null;

  return (
    <nav 
      className={`
        ${animationClass}
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
      }}
      aria-label="Main navigation"
      aria-hidden={!isVisible}
    >
      <div className="max-w-2xl mx-auto flex justify-center space-x-8">
        {navigationItems.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => handleNavigationClick(item.label)}
            className="
              nav-item
              text-[14px] text-gray-600 dark:text-gray-300 
              hover:text-gray-900 dark:hover:text-gray-100 
              hover:underline hover:scale-105
              transition-all duration-200 ease-out
              motion-reduce:hover:scale-100 motion-reduce:transition-colors
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
              dark:focus:ring-gray-500 dark:focus:ring-offset-gray-800
              rounded-sm px-1 py-0.5
              transform-gpu will-change-transform
            "
            style={{
              transitionProperty: 'color, text-decoration, transform',
            }}
            aria-label={`Navigate to ${item.label} section`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}