'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useData } from '@/lib/data-context';

export default function TeamsPage() {
  const { teams } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter teams based on search term
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-900">Teams</h1>
      
      {/* Search Bar */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
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
      
      {/* Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTeams.map(team => (
          <Link 
            key={team.id} 
            href={`/teams/${team.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6 flex flex-col items-center">
              <div className="relative h-24 w-24 mb-4">
                <Image 
                  src={team.logo || '/images/team-placeholder.png'} 
                  alt={team.name} 
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-center text-blue-900 mb-1">{team.name}</h3>
              <p className="text-sm text-gray-600 text-center">{team.country}</p>
              <div className="mt-3 text-xs text-gray-500">Founded: {team.founded}</div>
              {team.stadium && (
                <div className="text-xs text-gray-500">Stadium: {team.stadium}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No teams found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
