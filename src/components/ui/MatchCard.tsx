'use client';

import React from 'react';
import { Match } from '@/types';
import { formatMatchTime, getMatchStatusText } from '@/utils/helpers';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { 
    homeTeam, 
    awayTeam, 
    date, 
    time, 
    competition, 
    venue, 
    status, 
    homeScore, 
    awayScore 
  } = match;
  
  // Format date
  const matchDate = new Date(date);
  const formattedDate = matchDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  
  // Format time
  const formattedTime = formatMatchTime(time);
  
  // Get status text
  const statusText = getMatchStatusText(match);
  
  // Status color
  const getStatusColor = () => {
    switch (status) {
      case 'live':
        return 'bg-red-600 text-white';
      case 'completed':
        return 'bg-green-600 text-white';
      case 'scheduled':
        return 'bg-blue-600 text-white';
      case 'postponed':
        return 'bg-yellow-600 text-white';
      case 'canceled':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Competition & Date */}
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-700">{competition}</div>
        <div className="text-sm text-gray-600">{formattedDate}</div>
      </div>
      
      {/* Match Details */}
      <div className="p-4">
        {/* Status */}
        <div className="flex justify-between items-center mb-4">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor()}`}>
            {statusText}
          </span>
          <span className="text-sm text-gray-600">{formattedTime}</span>
        </div>
        
        {/* Teams */}
        <div className="space-y-3">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                {homeTeam.logo ? (
                  <img 
                    src={homeTeam.logo} 
                    alt={homeTeam.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100">
                    <span className="text-xs text-blue-900 font-bold">
                      {homeTeam.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <span className="font-medium">{homeTeam.name}</span>
            </div>
            <span className="text-xl font-bold">
              {status !== 'scheduled' && homeScore !== undefined ? homeScore : '-'}
            </span>
          </div>
          
          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                {awayTeam.logo ? (
                  <img 
                    src={awayTeam.logo} 
                    alt={awayTeam.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100">
                    <span className="text-xs text-blue-900 font-bold">
                      {awayTeam.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <span className="font-medium">{awayTeam.name}</span>
            </div>
            <span className="text-xl font-bold">
              {status !== 'scheduled' && awayScore !== undefined ? awayScore : '-'}
            </span>
          </div>
        </div>
        
        {/* Venue */}
        <div className="mt-4 text-xs text-gray-500">
          {venue}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
