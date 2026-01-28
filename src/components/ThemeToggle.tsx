'use client';

import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonSharp } from 'react-icons/io5';

interface ThemeToggleProps {
  onClick: () => void;
  theme: 'light' | 'dark';
}

export default function ThemeToggle({ onClick, theme }: ThemeToggleProps) {
  return (
    <div className="absolute right-6 top-6">
      <button
        onClick={onClick}
        className="p-2 text-black dark:text-white transition-colors text-lg"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <IoSunnyOutline/> : <IoMoonSharp />}
      </button>
    </div>
  );
}
