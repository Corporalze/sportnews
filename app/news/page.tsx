'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/data-context';
import ArticleCard from '@/components/ui/ArticleCard';
import { getArticlesByCategory, getRecentArticles } from '@/utils/helpers';

export default function NewsPage() {
  const { articles, categories } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Filter articles based on active category
  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : getArticlesByCategory(articles, activeCategory);
  
  // Get featured articles for the top section
  const featuredArticles = filteredArticles
    .filter(article => article.isFeatured)
    .slice(0, 1);
  
  // Get the rest of the articles
  const regularArticles = filteredArticles
    .filter(article => !featuredArticles.some(fa => fa.id === article.id))
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-blue-900">Latest News</h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            activeCategory === 'all'
              ? 'bg-blue-900 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All News
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === category.name
                ? 'bg-blue-900 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Featured Article */}
      {featuredArticles.length > 0 && (
        <div className="mb-8">
          <ArticleCard article={featuredArticles[0]} variant="featured" />
        </div>
      )}
      
      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      
      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600">No articles found</h3>
          <p className="text-gray-500 mt-2">Try selecting a different category or check back later.</p>
        </div>
      )}
      
      {/* Load More Button */}
      {filteredArticles.length > 10 && (
        <div className="text-center mt-8">
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
