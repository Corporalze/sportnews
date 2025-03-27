'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '@/types';
import { useData } from '@/lib/data-context';
import { getFeaturedArticles } from '@/utils/helpers';

const HeroSlider: React.FC = () => {
  const { articles } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  
  // Get featured articles
  useEffect(() => {
    const featured = getFeaturedArticles(articles).slice(0, 5);
    setFeaturedArticles(featured);
  }, [articles]);
  
  // Auto-rotate slides
  useEffect(() => {
    if (featuredArticles.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredArticles]);
  
  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? featuredArticles.length - 1 : prev - 1
    );
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      (prev + 1) % featuredArticles.length
    );
  };
  
  if (featuredArticles.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading featured articles...</div>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      {/* Slides */}
      {featuredArticles.map((article, index) => (
        <div
          key={article.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-gray-900">
            {article.featuredImage ? (
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover opacity-70"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-900 to-blue-700"></div>
            )}
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
              {article.categories && article.categories.length > 0 && (
                <span className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {article.categories[0]}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                <a href={`/news/${article.slug}`} className="hover:text-amber-400 transition-colors">
                  {article.title}
                </a>
              </h2>
              <p className="text-gray-200 text-sm md:text-base mb-2 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-300">
                <span>{article.author}</span>
                <span>{new Date(article.publishDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredArticles.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
