export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  categories: string[];
  tags: string[];
  featuredImage?: string;
  isFeatured: boolean;
  viewCount?: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  country: string;
  founded: number;
  stadium?: string;
  coach?: string;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  nationality: string;
  birthDate: string;
  height?: number;
  weight?: number;
  teamId: string;
  jerseyNumber?: number;
  image?: string;
}

export interface Match {
  id: string;
  date: string;
  time: string;
  competition: string;
  matchWeek?: number;
  homeTeam: {
    id: string;
    name: string;
    logo?: string;
  };
  awayTeam: {
    id: string;
    name: string;
    logo?: string;
  };
  venue: string;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'canceled';
  homeScore?: number;
  awayScore?: number;
  stats?: {
    possession?: {
      home: number;
      away: number;
    };
    shots?: {
      home: number;
      away: number;
    };
    shotsOnTarget?: {
      home: number;
      away: number;
    };
    corners?: {
      home: number;
      away: number;
    };
    fouls?: {
      home: number;
      away: number;
    };
  };
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
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
  totalVotes: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
