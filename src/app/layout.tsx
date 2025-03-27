import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Ayuursport - The Moon of Moroccan Football',
  description: 'Your premier source for Moroccan football news, match results, and analysis.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-gray-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
