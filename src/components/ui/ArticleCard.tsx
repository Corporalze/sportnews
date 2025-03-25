'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { formatDate, truncateText } from '@/utils/helpers';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  variant = 'default' 
}) => {
  const { 
    title, 
    slug, 
    excerpt, 
    featuredImage, 
    author, 
    publishDate, 
    categories 
  } = article;

  if (variant === 'featured') {
    return (
      <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-lg group">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <Image
          src={featuredImage || '/images/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="flex space-x-2 mb-3">
            {categories.slice(0, 2).map((category) => (
              <Link 
                key={category} 
                href={`/news/category/${category.toLowerCase()}`}
                className="bg-amber-500 text-blue-900 text-xs font-bold px-2 py-1 rounded"
              >
                {category}
              </Link>
            ))}
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            <Link href={`/news/${slug}`} className="hover:text-amber-400">
              {title}
            </Link>
          </h2>
          <p className="text-gray-200 mb-4">{truncateText(excerpt, 150)}</p>
          <div className="flex items-center text-gray-300 text-sm">
            <span>By {author}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(publishDate)}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative h-20 w-20 flex-shrink-0">
          <Image
            src={featuredImage || '/images/placeholder.jpg'}
            alt={title}
            fill
            className="object-cover rounded"
          />
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-1">
            <Link href={`/news/${slug}`} className="hover:text-amber-500">
              {truncateText(title, 60)}
            </Link>
          </h3>
          <div className="text-xs text-gray-500">
            {formatDate(publishDate)}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={featuredImage || '/images/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex space-x-2 mb-2">
          {categories.slice(0, 1).map((category) => (
            <Link 
              key={category} 
              href={`/news/category/${category.toLowerCase()}`}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
            >
              {category}
            </Link>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">
          <Link href={`/news/${slug}`} className="hover:text-amber-600">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4">{truncateText(excerpt, 100)}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{author}</span>
          <span>{formatDate(publishDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
