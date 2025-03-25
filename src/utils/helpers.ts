import { Article, Match, Team } from '@/types';

// Utility functions for working with articles
export const getRecentArticles = (articles: Article[], count: number = 5): Article[] => {
  return [...articles]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, count);
};

export const getFeaturedArticles = (articles: Article[], count: number = 3): Article[] => {
  return [...articles]
    .filter(article => article.isFeatured)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, count);
};

export const getMostViewedArticles = (articles: Article[], count: number = 5): Article[] => {
  return [...articles]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, count);
};

export const getArticlesByCategory = (articles: Article[], category: string): Article[] => {
  return articles.filter(article => article.categories.includes(category));
};

export const getArticlesByTag = (articles: Article[], tag: string): Article[] => {
  return articles.filter(article => article.tags.includes(tag));
};

// Utility functions for working with matches
export const getUpcomingMatches = (matches: Match[], count: number = 5): Match[] => {
  return [...matches]
    .filter(match => match.status === 'scheduled')
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
    .slice(0, count);
};

export const getRecentResults = (matches: Match[], count: number = 5): Match[] => {
  return [...matches]
    .filter(match => match.status === 'completed')
    .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime())
    .slice(0, count);
};

export const getLiveMatches = (matches: Match[]): Match[] => {
  return matches.filter(match => match.status === 'live');
};

// Date formatting utilities
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatDateTime = (dateString: string, timeString: string): string => {
  const dateTime = new Date(`${dateString}T${timeString}`);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return dateTime.toLocaleDateString('en-US', options);
};

// Slug utilities
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
