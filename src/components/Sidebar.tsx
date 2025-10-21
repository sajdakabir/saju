'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

// TypeScript interfaces for component props
interface NavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  theme: 'light' | 'dark';
}

// Navigation items configuration with icons
const navigationItems: NavigationItem[] = [
  { 
    label: 'Home', 
    href: '/', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    label: 'Projects', 
    href: '/projects', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  { 
    label: 'Notes', 
    href: '/notes', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  { 
    label: 'Photos', 
    href: '/photos', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    label: 'History', 
    href: '/history', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export default function Sidebar({ theme }: SidebarProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="fixed left-0 top-0 h-full z-50 flex items-center">
      {/* Sidebar Container */}
      <div className="
        ml-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
        rounded-2xl border border-gray-200/50 dark:border-gray-700/50
        shadow-2xl shadow-black/10 dark:shadow-black/30
        p-3 flex flex-col space-y-3
        transition-all duration-300 ease-out
      ">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredItem === item.href;
          
          return (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className={`
                  relative flex items-center justify-center
                  w-12 h-12 rounded-xl
                  transition-all duration-300 ease-out
                  transform-gpu will-change-transform
                  ${isActive 
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-110' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }
                  ${isHovered && !isActive ? 'scale-125 shadow-lg' : ''}
                  hover:scale-125 hover:shadow-lg
                  active:scale-105
                `}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                aria-label={`Navigate to ${item.label}`}
              >
                <div className={`
                  transition-all duration-300 ease-out
                  ${isActive ? 'scale-110' : ''}
                  ${isHovered && !isActive ? 'scale-110' : ''}
                `}>
                  {item.icon}
                </div>
              </Link>
              
              {/* Tooltip */}
              <div className={`
                absolute left-full ml-3 top-1/2 -translate-y-1/2
                px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900
                text-sm font-medium rounded-lg shadow-lg
                transition-all duration-200 ease-out
                pointer-events-none whitespace-nowrap
                ${isHovered 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-2'
                }
              `}>
                {item.label}
                {/* Arrow */}
                <div className="
                  absolute right-full top-1/2 -translate-y-1/2
                  border-4 border-transparent border-r-gray-900 dark:border-r-gray-100
                " />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}