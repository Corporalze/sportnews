'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { DataProvider } from '@/lib/data-context';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <DataProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </DataProvider>
  );
};

export default RootLayout;
