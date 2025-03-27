'use client';

import React from 'react';
import RootLayout from '@/components/layout/RootLayout';
import HeroSlider from '@/components/ui/HeroSlider';
import ArticleCard from '@/components/ui/ArticleCard';
import MatchCard from '@/components/ui/MatchCard';
import PollWidget from '@/components/ui/PollWidget';
import { useData } from '@/lib/data-context';
import { getRecentArticles, getFeaturedArticles, getUpcomingMatches, getRecentResults } from '@/utils/helpers';

export default function HomePage() {
  const { articles, matches, polls, loading } = useData();
  
  // Get featured articles for hero slider
  const featuredArticles = getFeaturedArticles(articles).slice(0, 5);
  
  // Get recent articles for the main content
  const recentArticles = getRecentArticles(articles).slice(0, 6);
  
  // Get upcoming matches
  const upcomingMatches = getUpcomingMatches(matches).slice(0, 3);
  
  // Get recent results
  const recentResults = getRecentResults(matches).slice(0, 3);
  
  // Get active poll
  const activePoll = polls.find(poll => poll.isActive);
  
  // Get most read articles
  const mostReadArticles = [...articles]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 5);
  
  if (loading) {
    return (
      <RootLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-xl text-gray-500">Loading...</div>
        </div>
      </RootLayout>
    );
  }
  
  return (
    <RootLayout>
      {/* Hero Slider */}
      <div className="mb-8">
        <HeroSlider />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-8">
          {/* Latest News Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-900">Latest News</h2>
              <a href="/news" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          
          {/* Matches Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-900">Matches</h2>
              <a href="/matches" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upcoming Matches */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Upcoming Fixtures</h3>
                <div className="space-y-4">
                  {upcomingMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
              
              {/* Recent Results */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Results</h3>
                <div className="space-y-4">
                  {recentResults.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Most Read Articles */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Most Read</h3>
            <div className="space-y-4">
              {mostReadArticles.map((article, index) => (
                <div key={article.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <a 
                      href={`/news/${article.slug}`}
                      className="font-medium text-gray-800 hover:text-blue-600 line-clamp-2"
                    >
                      {article.title}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(article.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Poll Widget */}
          {activePoll && (
            <div className="bg-white rounded-lg shadow p-4">
              <PollWidget poll={activePoll} />
            </div>
          )}
          
          {/* Ad Space */}
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-gray-500 text-sm mb-2">Advertisement</p>
            <div className="h-60 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-400">Ad Space</p>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
