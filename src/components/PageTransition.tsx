'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Start exit animation
    setIsExiting(true);
    setIsVisible(false);

    // After a short delay, show the new page
    const timer = setTimeout(() => {
      setIsExiting(false);
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Initial load
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`
        page-transition
        ${isVisible ? 'page-enter' : ''}
        ${isExiting ? 'page-exit' : ''}
        transition-all duration-500 ease-out
        ${isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
}