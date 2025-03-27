'use client';

import React from 'react';
import { Article } from '@/types';
import Link from 'next/link';
import { formatDate } from '@/utils/helpers';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  variant = 'default' 
}) => {
  const { id, title, slug, excerpt, author, publishDate, categories, featuredImage } = article;
  
  // Featured variant (large card with image and excerpt)
  if (variant === 'featured') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-64 bg-gray-200">
          {featuredImage ? (
            <img 
              src={featuredImage} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-100">
              <span className="text-blue-900 font-medium">Ayuursport</span>
            </div>
          )}
          {categories && categories.length > 0 && (
            <div className="absolute top-4 left-4">
              <Link 
                href={`/news/${categories[0].toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-full"
              >
                {categories[0]}
              </Link>
            </div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-blue-900 hover:text-amber-500 transition-colors">
            <Link href={`/news/${slug}`}>
              {title}
            </Link>
          </h2>
          <p className="text-gray-600 mb-4">{excerpt}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{author}</span>
            <span>{formatDate(publishDate)}</span>
          </div>
        </div>
      </div>
    );
  }
  
  // Compact variant (small card with minimal info)
  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors">
        <h3 className="text-base font-medium mb-1 text-blue-900 hover:text-amber-500 transition-colors">
          <Link href={`/news/${slug}`}>
            {title}
          </Link>
        </h3>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{formatDate(publishDate)}</span>
          {categories && categories.length > 0 && (
            <Link 
              href={`/news/${categories[0].toLowerCase().replace(/\s+/g, '-')}`}
              className="text-blue-600 hover:underline"
            >
              {categories[0]}
            </Link>
          )}
        </div>
      </div>
    );
  }
  
  // Default variant (medium card with image)
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {featuredImage ? (
          <img 
            src={featuredImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-100">
            <span className="text-blue-900 font-medium">Ayuursport</span>
          </div>
        )}
        {categories && categories.length > 0 && (
          <div className="absolute top-3 left-3">
            <Link 
              href={`/news/${categories[0].toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              {categories[0]}
            </Link>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 text-blue-900 hover:text-amber-500 transition-colors">
          <Link href={`/news/${slug}`}>
            {title}
          </Link>
        </h3>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{author}</span>
          <span>{formatDate(publishDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
