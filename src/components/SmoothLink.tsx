'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SmoothLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'aria-describedby'?: string;
  tabIndex?: number;
}

export default function SmoothLink({ href, children, className, target, rel, onClick, style, ...props }: SmoothLinkProps) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    // Call the custom onClick handler if provided
    if (onClick) {
      onClick(e);
    }

    // Don't intercept external links or links with target="_blank"
    if (href.startsWith('http') || href.startsWith('mailto:') || target === '_blank') {
      return;
    }

    e.preventDefault();
    
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Add a subtle loading state
    document.body.style.cursor = 'wait';
    
    // Small delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 100));
    
    router.push(href);
    
    // Reset cursor after navigation
    setTimeout(() => {
      document.body.style.cursor = 'default';
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <Link 
      href={href} 
      className={`
        ${className} 
        transition-all duration-200 ease-out
        ${isTransitioning ? 'opacity-75 scale-[0.98]' : 'opacity-100 scale-100'}
      `}
      onClick={handleClick}
      target={target}
      rel={rel}
      style={style}
      {...props}
    >
      {children}
    </Link>
  );
}