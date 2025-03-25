'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-amber-500 border-b-2 border-amber-500' : 'text-white hover:text-amber-300';
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <Image 
                  src="/logo-placeholder.png" 
                  alt="Ayuursport Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold">Ayuursport</span>
            </Link>
            <span className="ml-2 text-xs text-amber-300 italic">The Moon of Football</span>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link href="/" className={`${isActive('/')} py-2`}>
              Home
            </Link>
            <Link href="/news" className={`${isActive('/news')} py-2`}>
              News
            </Link>
            <Link href="/matches" className={`${isActive('/matches')} py-2`}>
              Matches
            </Link>
            <Link href="/teams" className={`${isActive('/teams')} py-2`}>
              Teams
            </Link>
            <Link href="/players" className={`${isActive('/players')} py-2`}>
              Players
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
            <button className="bg-amber-500 hover:bg-amber-600 text-blue-900 font-bold py-2 px-4 rounded">
              Sign In
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-blue-800 text-white border border-blue-700 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Live Match Ticker */}
      <div className="bg-blue-950 py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-amber-400 font-bold mx-2">LIVE:</span>
          <span className="mx-4">🇲🇦 Raja Casablanca 2-1 Wydad Casablanca 🇲🇦 (75')</span>
          <span className="text-amber-400 font-bold mx-2">UPCOMING:</span>
          <span className="mx-4">🇲🇦 Morocco vs. Senegal 🇸🇳 (Tomorrow, 20:00)</span>
          <span className="text-amber-400 font-bold mx-2">RESULT:</span>
          <span className="mx-4">🇲🇦 Morocco 2-0 Spain 🇪🇸 (FT)</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
