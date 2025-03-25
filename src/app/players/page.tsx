'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useData } from '@/lib/data-context';

export default function PlayersPage() {
  const { players, teams } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  
  // Get unique positions for filter
  const positions = Array.from(new Set(players.map(player => player.position)));
  
  // Filter players based on search term and position
  const filteredPlayers = players.filter(player => {
    const matchesSearch = 
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
    
    return matchesSearch && matchesPosition;
  });
  
  // Get team name by id
  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : 'Unknown Team';
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-900">Players</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative max-w-md flex-grow">
          <input
            type="text"
            placeholder="Search players..."
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
        
        {/* Position Filter */}
        <div className="w-full md:w-auto">
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Positions</option>
            {positions.map(position => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPlayers.map(player => (
          <Link 
            key={player.id} 
            href={`/players/${player.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6 flex flex-col items-center">
              <div className="relative h-32 w-32 mb-4 rounded-full overflow-hidden bg-gray-100">
                <Image 
                  src={player.image || '/images/player-placeholder.png'} 
                  alt={player.name} 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-center text-blue-900 mb-1">{player.name}</h3>
              {player.jerseyNumber && (
                <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mb-2">
                  {player.jerseyNumber}
                </div>
              )}
              <p className="text-sm text-gray-600 text-center mb-1">{player.position}</p>
              <p className="text-sm text-gray-600 text-center">{player.nationality}</p>
              <div className="mt-3 text-xs text-gray-500">Team: {getTeamName(player.teamId)}</div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredPlayers.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No players found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria or position filter.</p>
        </div>
      )}
    </div>
  );
}
