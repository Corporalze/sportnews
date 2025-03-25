'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Match } from '@/types';
import { formatDateTime } from '@/utils/helpers';

interface MatchCardProps {
  match: Match;
  variant?: 'default' | 'compact' | 'live';
}

const MatchCard: React.FC<MatchCardProps> = ({ 
  match, 
  variant = 'default' 
}) => {
  const { 
    homeTeam, 
    awayTeam, 
    homeScore, 
    awayScore, 
    date, 
    time, 
    venue, 
    competition, 
    status 
  } = match;

  const isCompleted = status === 'completed';
  const isLive = status === 'live';
  const isScheduled = status === 'scheduled';

  const getStatusLabel = () => {
    switch (status) {
      case 'live':
        return <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">LIVE</span>;
      case 'completed':
        return <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs font-bold">FT</span>;
      case 'scheduled':
        return <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">UPCOMING</span>;
      case 'postponed':
        return <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-bold">POSTPONED</span>;
      case 'canceled':
        return <span className="bg-red-700 text-white px-2 py-1 rounded text-xs font-bold">CANCELED</span>;
      default:
        return null;
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Image 
            src={homeTeam.logo || '/images/team-placeholder.png'} 
            alt={homeTeam.name} 
            width={20} 
            height={20} 
          />
          <span className="text-sm">{homeTeam.shortName}</span>
        </div>
        
        <div className="text-center">
          {isCompleted ? (
            <div className="font-bold">{homeScore} - {awayScore}</div>
          ) : isLive ? (
            <div className="font-bold text-red-600">{homeScore} - {awayScore} <span className="text-xs">LIVE</span></div>
          ) : (
            <div className="text-xs text-gray-600">{time}</div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm">{awayTeam.shortName}</span>
          <Image 
            src={awayTeam.logo || '/images/team-placeholder.png'} 
            alt={awayTeam.name} 
            width={20} 
            height={20} 
          />
        </div>
      </div>
    );
  }

  if (variant === 'live') {
    return (
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg shadow-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-amber-400 font-bold">{competition}</span>
          {getStatusLabel()}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center w-2/5">
            <div className="relative h-16 w-16 mb-2">
              <Image 
                src={homeTeam.logo || '/images/team-placeholder.png'} 
                alt={homeTeam.name} 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-center font-bold">{homeTeam.name}</span>
          </div>
          
          <div className="text-center w-1/5">
            {isLive || isCompleted ? (
              <div className="text-3xl font-bold mb-1">{homeScore} - {awayScore}</div>
            ) : (
              <div className="text-xl font-bold mb-1">VS</div>
            )}
            <div className="text-sm text-gray-300">{isLive ? '75\'' : formatDateTime(date, time)}</div>
          </div>
          
          <div className="flex flex-col items-center w-2/5">
            <div className="relative h-16 w-16 mb-2">
              <Image 
                src={awayTeam.logo || '/images/team-placeholder.png'} 
                alt={awayTeam.name} 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-center font-bold">{awayTeam.name}</span>
          </div>
        </div>
        
        {isLive && (
          <div className="mt-4 pt-3 border-t border-blue-700">
            <div className="text-sm text-center">
              <span className="text-amber-400">Recent: </span>
              <span>Yellow card (70') - Hakimi (Morocco)</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-blue-900 text-white p-3 flex justify-between items-center">
        <span>{competition}</span>
        {getStatusLabel()}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-center w-2/5">
            <div className="relative h-12 w-12 mb-2">
              <Image 
                src={homeTeam.logo || '/images/team-placeholder.png'} 
                alt={homeTeam.name} 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-center font-medium text-sm">{homeTeam.name}</span>
          </div>
          
          <div className="text-center w-1/5">
            {isLive || isCompleted ? (
              <div className="text-xl font-bold">{homeScore} - {awayScore}</div>
            ) : (
              <div className="text-lg font-bold">VS</div>
            )}
          </div>
          
          <div className="flex flex-col items-center w-2/5">
            <div className="relative h-12 w-12 mb-2">
              <Image 
                src={awayTeam.logo || '/images/team-placeholder.png'} 
                alt={awayTeam.name} 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-center font-medium text-sm">{awayTeam.name}</span>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600 mb-2">
          {formatDateTime(date, time)}
        </div>
        
        <div className="text-center text-xs text-gray-500">
          {venue}
        </div>
        
        {isCompleted && match.highlights && (
          <div className="mt-3 text-center">
            <Link 
              href={match.highlights} 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              target="_blank"
            >
              Watch Highlights
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
