'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/lib/data-context';
import { Match } from '@/types';

export default function MatchForm({ match }: { match?: Match }) {
  const router = useRouter();
  const { teams, addMatch, updateMatch } = useData();
  const isEditing = !!match;

  // Form state
  const [homeTeamId, setHomeTeamId] = useState(match?.homeTeam.id || '');
  const [awayTeamId, setAwayTeamId] = useState(match?.awayTeam.id || '');
  const [homeScore, setHomeScore] = useState(match?.homeScore?.toString() || '');
  const [awayScore, setAwayScore] = useState(match?.awayScore?.toString() || '');
  const [date, setDate] = useState(match?.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(match?.time || '18:00');
  const [venue, setVenue] = useState(match?.venue || '');
  const [competition, setCompetition] = useState(match?.competition || '');
  const [status, setStatus] = useState(match?.status || 'scheduled');
  const [matchWeek, setMatchWeek] = useState(match?.matchWeek?.toString() || '');
  const [highlights, setHighlights] = useState(match?.highlights || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!homeTeamId) newErrors.homeTeam = 'Home team is required';
    if (!awayTeamId) newErrors.awayTeam = 'Away team is required';
    if (homeTeamId === awayTeamId) newErrors.teams = 'Home and away teams must be different';
    if (!date) newErrors.date = 'Date is required';
    if (!time) newErrors.time = 'Time is required';
    if (!venue) newErrors.venue = 'Venue is required';
    if (!competition) newErrors.competition = 'Competition is required';
    if (!status) newErrors.status = 'Status is required';
    
    // If status is completed, scores are required
    if (status === 'completed') {
      if (!homeScore) newErrors.homeScore = 'Home score is required for completed matches';
      if (!awayScore) newErrors.awayScore = 'Away score is required for completed matches';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const homeTeam = teams.find(t => t.id === homeTeamId);
      const awayTeam = teams.find(t => t.id === awayTeamId);
      
      if (!homeTeam || !awayTeam) {
        setErrors({ submit: 'Selected teams not found' });
        setIsSubmitting(false);
        return;
      }
      
      const matchData: Match = {
        id: match?.id || `match-${Date.now()}`,
        homeTeam,
        awayTeam,
        homeScore: homeScore ? parseInt(homeScore) : undefined,
        awayScore: awayScore ? parseInt(awayScore) : undefined,
        date,
        time,
        venue,
        competition,
        status: status as 'scheduled' | 'live' | 'completed' | 'postponed' | 'canceled',
        matchWeek: matchWeek ? parseInt(matchWeek) : undefined,
        highlights: highlights || undefined,
      };
      
      if (isEditing) {
        updateMatch(matchData);
      } else {
        addMatch(matchData);
      }
      
      router.push('/admin/matches');
    } catch (error) {
      console.error('Error saving match:', error);
      setErrors({ submit: 'Failed to save match. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Match' : 'Create New Match'}</h1>
          <button
            onClick={() => router.push('/admin/matches')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium"
          >
            Cancel
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Teams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Home Team */}
            <div>
              <label htmlFor="homeTeam" className="block text-sm font-medium text-gray-700 mb-1">
                Home Team *
              </label>
              <select
                id="homeTeam"
                value={homeTeamId}
                onChange={(e) => setHomeTeamId(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.homeTeam || errors.teams ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Home Team</option>
                {teams.map(team => (
                  <option key={`home-${team.id}`} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              {errors.homeTeam && <p className="mt-1 text-sm text-red-600">{errors.homeTeam}</p>}
            </div>
            
            {/* Away Team */}
            <div>
              <label htmlFor="awayTeam" className="block text-sm font-medium text-gray-700 mb-1">
                Away Team *
              </label>
              <select
                id="awayTeam"
                value={awayTeamId}
                onChange={(e) => setAwayTeamId(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.awayTeam || errors.teams ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Away Team</option>
                {teams.map(team => (
                  <option key={`away-${team.id}`} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
              {errors.awayTeam && <p className="mt-1 text-sm text-red-600">{errors.awayTeam}</p>}
            </div>
          </div>
          
          {errors.teams && <p className="mt-1 text-sm text-red-600">{errors.teams}</p>}
          
          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>
            
            {/* Time */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time *
              </label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.time ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>
          </div>
          
          {/* Venue and Competition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Venue */}
            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">
                Venue *
              </label>
              <input
                id="venue"
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.venue ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.venue && <p className="mt-1 text-sm text-red-600">{errors.venue}</p>}
            </div>
            
            {/* Competition */}
            <div>
              <label htmlFor="competition" className="block text-sm font-medium text-gray-700 mb-1">
                Competition *
              </label>
              <input
                id="competition"
                type="text"
                value={competition}
                onChange={(e) => setCompetition(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.competition ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.competition && <p className="mt-1 text-sm text-red-600">{errors.competition}</p>}
            </div>
          </div>
          
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status *
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.status ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="scheduled">Scheduled</option>
              <option value="live">Live</option>
              <option value="completed">Completed</option>
              <option value="postponed">Postponed</option>
              <option value="canceled">Canceled</option>
            </select>
            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
          </div>
          
          {/* Scores (shown only for live or completed matches) */}
          {(status === 'live' || status === 'completed') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Home Score */}
              <div>
                <label htmlFor="homeScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Home Score {status === 'completed' ? '*' : ''}
                </label>
                <input
                  id="homeScore"
                  type="number"
                  min="0"
                  value={homeScore}
                  onChange={(e) => setHomeScore(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.homeScore ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.homeScore && <p className="mt-1 text-sm text-red-600">{errors.homeScore}</p>}
              </div>
              
              {/* Away Score */}
              <div>
                <label htmlFor="awayScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Away Score {status === 'completed' ? '*' : ''}
                </label>
                <input
                  id="awayScore"
                  type="number"
                  min="0"
                  value={awayScore}
                  onChange={(e) => setAwayScore(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.awayScore ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.awayScore && <p className="mt-1 text-sm text-red-600">{errors.awayScore}</p>}
              </div>
            </div>
          )}
          
          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Match Week */}
            <div>
              <label htmlFor="matchWeek" className="block text-sm font-medium text-gray-700 mb-1">
                Match Week
              </label>
              <input
                id="matchWeek"
                type="number"
                min="1"
                value={matchWeek}
                onChange={(e) => setMatchWeek(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            
            {/* Highlights (for completed matches) */}
            {status === 'completed' && (
              <div>
                <label htmlFor="highlights" className="block text-sm font-medium text-gray-700 mb-1">
                  Highlights URL
                </label>
                <input
                  id="highlights"
                  type="text"
                  value={highlights}
                  onChange={(e) => setHighlights(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="https://example.com/highlights"
                />
              </div>
            )}
          </div>
          
          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
              {errors.submit}
            </div>
          )}
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-6 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Match' : 'Create Match'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
