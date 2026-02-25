'use client';

interface ThemeWaveProps {
  isAnimating: boolean;
  incomingTheme: 'light' | 'dark' | null;
}

export default function ThemeWave({ isAnimating, incomingTheme }: ThemeWaveProps) {
  if (!isAnimating || !incomingTheme) return null;

  return (
    <div
      className="theme-wave-overlay"
      style={{
        backgroundColor: incomingTheme === 'dark' ? '#1B1B1B' : '#ffffff',
      }}
    />
  );
}
