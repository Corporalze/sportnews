/**
 * Helper functions for the Ayuursport website
 */

import { Article, Match } from '@/types';

/**
 * Format a date string to a more readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Convert a string to a URL-friendly slug
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

/**
 * Truncate text to a specified length and add ellipsis
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

/**
 * Get recent articles sorted by publish date
 * @param articles - Array of articles
 * @returns Sorted array of recent articles
 */
export const getRecentArticles = (articles: Article[]): Article[] => {
  return [...articles].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
};

/**
 * Get featured articles
 * @param articles - Array of articles
 * @returns Array of featured articles
 */
export const getFeaturedArticles = (articles: Article[]): Article[] => {
  return articles.filter(article => article.isFeatured);
};

/**
 * Get upcoming matches
 * @param matches - Array of matches
 * @returns Array of upcoming matches
 */
export const getUpcomingMatches = (matches: Match[]): Match[] => {
  const now = new Date();
  return [...matches]
    .filter(match => match.status === 'scheduled')
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
};

/**
 * Get recent match results
 * @param matches - Array of matches
 * @returns Array of recent match results
 */
export const getRecentResults = (matches: Match[]): Match[] => {
  return [...matches]
    .filter(match => match.status === 'completed')
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });
};

/**
 * Get live matches
 * @param matches - Array of matches
 * @returns Array of live matches
 */
export const getLiveMatches = (matches: Match[]): Match[] => {
  return matches.filter(match => match.status === 'live');
};

/**
 * Format match time to 12-hour format
 * @param time - Time string in 24-hour format (HH:MM)
 * @returns Time string in 12-hour format
 */
export const formatMatchTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

/**
 * Calculate match status text
 * @param match - Match object
 * @returns Status text
 */
export const getMatchStatusText = (match: Match): string => {
  switch (match.status) {
    case 'scheduled':
      return 'Upcoming';
    case 'live':
      return 'Live';
    case 'completed':
      return 'Full Time';
    case 'postponed':
      return 'Postponed';
    case 'canceled':
      return 'Canceled';
    default:
      return '';
  }
};
