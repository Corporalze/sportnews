'use client';

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useData } from '@/lib/data-context';

export default function AdminDashboard() {
  const { articles, matches, teams, players } = useData();
  
  // Calculate some stats for the dashboard
  const totalArticles = articles.length;
  const featuredArticles = articles.filter(a => a.isFeatured).length;
  const upcomingMatches = matches.filter(m => m.status === 'scheduled').length;
  const liveMatches = matches.filter(m => m.status === 'live').length;
  
  // Get recent articles for the dashboard
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 5);
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-gray-600 text-sm">Total Articles</h2>
                <p className="text-2xl font-bold text-gray-800">{totalArticles}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 text-amber-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-gray-600 text-sm">Featured Articles</h2>
                <p className="text-2xl font-bold text-gray-800">{featuredArticles}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-gray-600 text-sm">Upcoming Matches</h2>
                <p className="text-2xl font-bold text-gray-800">{upcomingMatches}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-gray-600 text-sm">Live Matches</h2>
                <p className="text-2xl font-bold text-gray-800">{liveMatches}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Articles */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Recent Articles</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentArticles.map(article => (
              <div key={article.id} className="px-6 py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-blue-900">{article.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      By {article.author} • {new Date(article.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-xs">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 text-right">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All Articles
            </button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-lg text-sm font-medium">
              Create New Article
            </button>
            <button className="bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-lg text-sm font-medium">
              Add Match
            </button>
            <button className="bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-lg text-sm font-medium">
              Add Team
            </button>
            <button className="bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-lg text-sm font-medium">
              Create Poll
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
