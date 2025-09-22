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
        transition-all duration-500 ease-out
        motion-reduce:transition-none motion-reduce:duration-0
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-4 scale-95'
        }
        pt-6 mt-4 border-t border-gray-200 dark:border-gray-700
        transform-gpu will-change-transform
        overflow-hidden
      `}
      style={{
        transitionProperty: 'opacity, transform, max-height',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        maxHeight: isVisible ? '128px' : '0px',
      }}
      aria-label="Main navigation"
      aria-hidden={!isVisible}
    >
      <div className="flex space-x-6">
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