'use client';

import React, { useState } from 'react';
import { Poll } from '@/types';

interface PollWidgetProps {
  poll: Poll;
}

const PollWidget: React.FC<PollWidgetProps> = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [localPoll, setLocalPoll] = useState<Poll>(poll);
  
  // Calculate percentages
  const calculatePercentage = (votes: number) => {
    if (localPoll.totalVotes === 0) return 0;
    return Math.round((votes / localPoll.totalVotes) * 100);
  };
  
  // Handle vote
  const handleVote = () => {
    if (!selectedOption || hasVoted) return;
    
    // Update local poll data
    const updatedOptions = localPoll.options.map(option => {
      if (option.id === selectedOption) {
        return { ...option, votes: option.votes + 1 };
      }
      return option;
    });
    
    setLocalPoll({
      ...localPoll,
      options: updatedOptions,
      totalVotes: localPoll.totalVotes + 1
    });
    
    setHasVoted(true);
  };
  
  // Check if poll is active
  const isPollActive = () => {
    if (!localPoll.isActive) return false;
    
    const now = new Date();
    const startDate = new Date(localPoll.startDate);
    const endDate = new Date(localPoll.endDate);
    
    return now >= startDate && now <= endDate;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-blue-900 mb-4">{localPoll.question}</h3>
      
      <div className="space-y-3">
        {localPoll.options.map(option => (
          <div key={option.id} className="space-y-1">
            {/* Option with radio button (before voting) */}
            {!hasVoted && (
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`option-${option.id}`}
                  name="poll-option"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  disabled={!isPollActive()}
                  className="mr-2"
                />
                <label 
                  htmlFor={`option-${option.id}`}
                  className="text-gray-700 cursor-pointer"
                >
                  {option.text}
                </label>
              </div>
            )}
            
            {/* Results bar (after voting) */}
            {hasVoted && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{option.text}</span>
                  <span className="text-gray-600">{calculatePercentage(option.votes)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      selectedOption === option.id ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${calculatePercentage(option.votes)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {option.votes} {option.votes === 1 ? 'vote' : 'votes'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Vote button */}
      {!hasVoted && (
        <button
          onClick={handleVote}
          disabled={!selectedOption || !isPollActive()}
          className={`mt-4 w-full py-2 px-4 rounded-md font-medium ${
            selectedOption && isPollActive()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Vote
        </button>
      )}
      
      {/* Total votes */}
      <div className="mt-4 text-sm text-gray-500 text-center">
        {localPoll.totalVotes} {localPoll.totalVotes === 1 ? 'vote' : 'votes'} total
      </div>
      
      {/* Poll status */}
      {!isPollActive() && (
        <div className="mt-2 text-xs text-center text-red-500">
          {new Date() < new Date(localPoll.startDate)
            ? 'This poll has not started yet'
            : 'This poll has ended'}
        </div>
      )}
    </div>
  );
};

export default PollWidget;
