import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`} suppressHydrationWarning>
      <head>
        <title>Sajda Kabir</title>
        <meta name="description" content="Personal website of Sajda Kabir" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
