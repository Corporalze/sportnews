'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/data-context';
import MatchCard from '@/components/ui/MatchCard';
import { getUpcomingMatches, getRecentResults, getLiveMatches } from '@/utils/helpers';

export default function MatchesPage() {
  const { matches } = useData();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results' | 'live'>('upcoming');
  
  const liveMatches = getLiveMatches(matches);
  const upcomingMatches = getUpcomingMatches(matches);
  const recentResults = getRecentResults(matches);
  
  const displayMatches = activeTab === 'upcoming' 
    ? upcomingMatches 
    : activeTab === 'results' 
      ? recentResults 
      : liveMatches;
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-900">Matches</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-3 px-6 font-medium text-sm ${
            activeTab === 'upcoming'
              ? 'border-b-2 border-amber-500 text-blue-900'
              : 'text-gray-500 hover:text-blue-900'
          }`}
        >
          Upcoming Fixtures
        </button>
        
        <button
          onClick={() => setActiveTab('results')}
          className={`py-3 px-6 font-medium text-sm ${
            activeTab === 'results'
              ? 'border-b-2 border-amber-500 text-blue-900'
              : 'text-gray-500 hover:text-blue-900'
          }`}
        >
          Recent Results
        </button>
        
        {liveMatches.length > 0 && (
          <button
            onClick={() => setActiveTab('live')}
            className={`py-3 px-6 font-medium text-sm ${
              activeTab === 'live'
                ? 'border-b-2 border-amber-500 text-blue-900'
                : 'text-gray-500 hover:text-blue-900'
            }`}
          >
            <span className="inline-block animate-pulse mr-1">🔴</span> 
            Live Matches
          </button>
        )}
      </div>
      
      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayMatches.map(match => (
          <MatchCard 
            key={match.id} 
            match={match} 
            variant={activeTab === 'live' ? 'live' : 'default'} 
          />
        ))}
      </div>
      
      {/* Empty State */}
      {displayMatches.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">
            {activeTab === 'upcoming' 
              ? 'No upcoming matches scheduled' 
              : activeTab === 'results' 
                ? 'No recent match results available' 
                : 'No live matches at the moment'}
          </h3>
          <p className="text-gray-500 mt-2">Check back later for updates.</p>
        </div>
      )}
    </div>
  );
}
