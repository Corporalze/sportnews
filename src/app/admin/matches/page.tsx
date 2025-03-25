'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/lib/data-context';

export default function AdminMatches() {
  const { matches, deleteMatch } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  // Filter matches based on search term and status
  const filteredMatches = matches.filter(match => {
    const matchesSearch = 
      match.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.competition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || match.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort matches by date (newest first)
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Handle match deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this match? This action cannot be undone.')) {
      setIsDeleting(id);
      try {
        deleteMatch(id);
      } catch (error) {
        console.error('Error deleting match:', error);
        alert('Failed to delete match. Please try again.');
      } finally {
        setIsDeleting(null);
      }
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Matches</h1>
          <Link 
            href="/admin/matches/new"
            className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-lg text-sm font-medium"
          >
            Add New Match
          </Link>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search matches..."
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
          
          {/* Status Filter */}
          <div className="w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="live">Live</option>
              <option value="completed">Completed</option>
              <option value="postponed">Postponed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
        
        {/* Matches Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teams
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competition
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Venue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedMatches.map((match) => (
                <tr key={match.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        {match.homeTeam.name} {match.homeScore !== undefined ? match.homeScore : ''}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {match.awayTeam.name} {match.awayScore !== undefined ? match.awayScore : ''}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{match.date}</div>
                    <div className="text-sm text-gray-500">{match.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{match.competition}</div>
                    {match.matchWeek && (
                      <div className="text-xs text-gray-500">Week {match.matchWeek}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{match.venue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      match.status === 'live' 
                        ? 'bg-red-100 text-red-800' 
                        : match.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : match.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}>
                      {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/admin/matches/edit?id=${match.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(match.id)}
                      disabled={isDeleting === match.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {isDeleting === match.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {sortedMatches.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-600">No matches found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search criteria or create a new match.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
