'use client';

import React from 'react';
import { useData } from '@/lib/data-context';
import HeroSlider from '@/components/ui/HeroSlider';
import ArticleCard from '@/components/ui/ArticleCard';
import MatchCard from '@/components/ui/MatchCard';
import PollWidget from '@/components/ui/PollWidget';
import { getFeaturedArticles, getRecentArticles, getMostViewedArticles, getUpcomingMatches, getRecentResults, getLiveMatches } from '@/utils/helpers';

export default function Home() {
  const { articles, matches, polls } = useData();
  
  const featuredArticles = getFeaturedArticles(articles, 5);
  const recentArticles = getRecentArticles(articles.filter(a => !a.isFeatured), 6);
  const mostViewedArticles = getMostViewedArticles(articles, 5);
  const upcomingMatches = getUpcomingMatches(matches, 3);
  const recentResults = getRecentResults(matches, 3);
  const liveMatches = getLiveMatches(matches);
  
  return (
    <div className="space-y-10">
      {/* Hero Slider */}
      <section>
        <HeroSlider articles={featuredArticles} />
      </section>
      
      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Latest News - 8 columns on large screens */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-900 border-b-2 border-amber-500 pb-2">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          
          {/* Live Matches Section (if any) */}
          {liveMatches.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-blue-900 border-b-2 border-amber-500 pb-2">
                <span className="inline-block animate-pulse mr-2">🔴</span> 
                Live Matches
              </h2>
              <div className="space-y-4">
                {liveMatches.map(match => (
                  <MatchCard key={match.id} match={match} variant="live" />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar - 4 columns on large screens */}
        <div className="lg:col-span-4 space-y-8">
          {/* Upcoming Matches */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold mb-4 text-blue-900 border-b border-gray-200 pb-2">Upcoming Matches</h3>
            <div className="space-y-4">
              {upcomingMatches.map(match => (
                <MatchCard key={match.id} match={match} variant="compact" />
              ))}
            </div>
            <div className="mt-4 text-center">
              <a href="/matches" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Fixtures
              </a>
            </div>
          </div>
          
          {/* Recent Results */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold mb-4 text-blue-900 border-b border-gray-200 pb-2">Recent Results</h3>
            <div className="space-y-4">
              {recentResults.map(match => (
                <MatchCard key={match.id} match={match} variant="compact" />
              ))}
            </div>
            <div className="mt-4 text-center">
              <a href="/matches" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Results
              </a>
            </div>
          </div>
          
          {/* Poll Widget */}
          {polls.length > 0 && (
            <PollWidget poll={polls[0]} />
          )}
          
          {/* Most Read Articles */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold mb-4 text-blue-900 border-b border-gray-200 pb-2">Most Read</h3>
            <div className="space-y-4">
              {mostViewedArticles.map(article => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
