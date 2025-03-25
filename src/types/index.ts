// Define core data types for the application

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  publishDate: string;
  categories: string[];
  tags: string[];
  isFeatured: boolean;
  viewCount: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'canceled';
  matchWeek?: number;
  highlights?: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  country: string;
  founded: number;
  stadium?: string;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  nationality: string;
  dateOfBirth: string;
  teamId: string;
  image?: string;
  jerseyNumber?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  name?: string;
}
