import { DataProvider } from '@/lib/data-context';
import RootLayout from '@/components/layout/RootLayout';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ayuursport - The Moon of Football',
  description: 'Your premier destination for football news with a focus on Moroccan and North African football.',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootLayout>
          {children}
        </RootLayout>
      </body>
    </html>
  );
}
