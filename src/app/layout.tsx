import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sajdakabir.com'),
  title: 'Sajda Kabir',
  description: 'Personal website of Sajda Kabir',
  openGraph: {
    title: 'Sajda Kabir',
    description: 'Personal website of Sajda Kabir',
    url: 'https://sajdakabir.com',
    siteName: 'Sajda Kabir',
    images: [
      {
        url: '/loves/dsh.jpeg',
        width: 1200,
        height: 630,
        alt: 'Sajda Kabir',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sajda Kabir',
    description: 'Personal website of Sajda Kabir',
    images: ['/loves/dsh.jpeg'],
  },
};

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
        <link rel="icon" href="/saju.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-white text-gray-900 dark:bg-[#1B1B1B] dark:text-gray-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
