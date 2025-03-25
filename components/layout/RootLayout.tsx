'use client';

import React from 'react';
import { DataProvider } from '@/lib/data-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <DataProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
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
