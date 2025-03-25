'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';

interface HeroSliderProps {
  articles: Article[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ articles }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % articles.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [articles.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  if (!articles.length) return null;
  
  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-lg shadow-xl">
      {/* Slides */}
      {articles.map((article, index) => (
        <div 
          key={article.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
          <Image
            src={article.featuredImage || '/images/placeholder.jpg'}
            alt={article.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
            <div className="flex space-x-2 mb-3">
              {article.categories.slice(0, 2).map((category) => (
                <Link 
                  key={category} 
                  href={`/news/category/${category.toLowerCase()}`}
                  className="bg-amber-500 text-blue-900 text-xs font-bold px-2 py-1 rounded"
                >
                  {category}
                </Link>
              ))}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              <Link href={`/news/${article.slug}`} className="hover:text-amber-400">
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-200 mb-4 max-w-3xl hidden md:block">
              {article.excerpt}
            </p>
            <div className="flex items-center text-gray-300 text-sm">
              <span>By {article.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(article.publishDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-amber-500' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
