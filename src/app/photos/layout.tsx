import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What I Love — Sajda Kabir',
  description: 'Stuff that makes me smile',
  openGraph: {
    title: 'What I Love — Sajda Kabir',
    description: 'Stuff that makes me smile',
    images: [
      {
        url: '/loves/dsh.jpeg',
        width: 1200,
        height: 630,
        alt: 'Coding at a cafe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What I Love — Sajda Kabir',
    description: 'Stuff that makes me smile',
    images: ['/loves/dsh.jpeg'],
  },
};

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
