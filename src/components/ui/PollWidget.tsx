'use client';

import React from 'react';
import { Poll, PollOption } from '@/types';

interface PollWidgetProps {
  poll: Poll;
  onVote?: (pollId: string, optionId: string) => void;
}

const PollWidget: React.FC<PollWidgetProps> = ({ poll, onVote }) => {
  const { id, question, options, isActive } = poll;
  
  // Calculate total votes
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
  
  // Calculate percentage for each option
  const getPercentage = (votes: number): number => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };
  
  const handleVote = (optionId: string) => {
    if (onVote && isActive) {
      onVote(id, optionId);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-blue-900">Poll</h3>
        {isActive ? (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Active</span>
        ) : (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Closed</span>
        )}
      </div>
      
      <h4 className="text-md font-semibold mb-4">{question}</h4>
      
      <div className="space-y-3">
        {options.map((option: PollOption) => (
          <div key={option.id} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">{option.text}</span>
              <span className="text-sm font-medium">{getPercentage(option.votes)}%</span>
            </div>
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-amber-500"
                style={{ width: `${getPercentage(option.votes)}%` }}
              ></div>
            </div>
            {isActive && (
              <button 
                onClick={() => handleVote(option.id)}
                className="text-xs text-blue-600 hover:text-blue-800 mt-1"
              >
                Vote
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-500 mt-4 text-center">
        Total votes: {totalVotes}
      </div>
    </div>
  );
};

export default PollWidget;
