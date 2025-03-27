import { 
  fetchCompetitions, 
  fetchMatches, 
  fetchTeams, 
  fetchTeamDetails, 
  fetchFootballNews, 
  fetchTopHeadlines 
} from './api-service';
import { 
  mockArticles, 
  mockMatches, 
  mockTeams, 
  mockPlayers, 
  mockCategories, 
  mockPolls 
} from './mock-data';
import { Article, Match, Team, Player, Category, Poll } from '@/types';

// Convert API responses to our data models
const convertNewsToArticles = (newsData: any): Article[] => {
  if (!newsData || !newsData.articles) return [];
  
  return newsData.articles.map((article: any, index: number) => ({
    id: `news-${index}`,
    title: article.title,
    slug: article.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
    content: article.content || article.description,
    excerpt: article.description,
    author: article.author || 'Ayuursport Staff',
    publishDate: article.publishedAt,
    categories: ['News'],
    tags: ['Football', 'Morocco'],
    featuredImage: article.urlToImage,
    isFeatured: index < 3,
    viewCount: Math.floor(Math.random() * 1000)
  }));
};

const convertMatchesToOurFormat = (matchesData: any): Match[] => {
  if (!matchesData || !matchesData.matches) return [];
  
  return matchesData.matches.map((match: any) => ({
    id: match.id.toString(),
    date: match.utcDate.split('T')[0],
    time: match.utcDate.split('T')[1].substring(0, 5),
    competition: match.competition.name,
    matchWeek: match.matchday,
    homeTeam: {
      id: match.homeTeam.id.toString(),
      name: match.homeTeam.name,
      logo: match.homeTeam.crest
    },
    awayTeam: {
      id: match.awayTeam.id.toString(),
      name: match.awayTeam.name,
      logo: match.awayTeam.crest
    },
    venue: match.venue || 'TBD',
    status: convertStatus(match.status),
    homeScore: match.score.fullTime.home,
    awayScore: match.score.fullTime.away
  }));
};

const convertStatus = (apiStatus: string): 'scheduled' | 'live' | 'completed' | 'postponed' | 'canceled' => {
  switch (apiStatus) {
    case 'SCHEDULED':
      return 'scheduled';
    case 'LIVE':
    case 'IN_PLAY':
    case 'PAUSED':
      return 'live';
    case 'FINISHED':
      return 'completed';
    case 'POSTPONED':
      return 'postponed';
    case 'CANCELLED':
    case 'SUSPENDED':
      return 'canceled';
    default:
      return 'scheduled';
  }
};

const convertTeamsToOurFormat = (teamsData: any): Team[] => {
  if (!teamsData || !teamsData.teams) return [];
  
  return teamsData.teams.map((team: any) => ({
    id: team.id.toString(),
    name: team.name,
    shortName: team.shortName || team.tla,
    logo: team.crest,
    country: team.area.name,
    founded: team.founded,
    stadium: team.venue,
    coach: 'TBD' // Not provided in the API
  }));
};

// Data service functions
const fetchAndConvertNews = async (): Promise<Article[]> => {
  try {
    // Check if we should use mock data
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      return mockArticles;
    }
    
    // Fetch from API
    const moroccanFootballNews = await fetchFootballNews('football morocco', 10);
    const topSportsHeadlines = await fetchTopHeadlines('sports', 'ma', 5);
    
    // Convert and combine
    const newsArticles = convertNewsToArticles(moroccanFootballNews);
    const headlineArticles = convertNewsToArticles(topSportsHeadlines);
    
    return [...newsArticles, ...headlineArticles];
  } catch (error) {
    console.error('Error fetching news:', error);
    // Fallback to mock data
    return mockArticles;
  }
};

const fetchAndConvertMatches = async (): Promise<Match[]> => {
  try {
    // Check if we should use mock data
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      return mockMatches;
    }
    
    // Fetch from API - using Premier League as example
    const premierLeagueMatches = await fetchMatches('PL');
    
    // Convert
    return convertMatchesToOurFormat(premierLeagueMatches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    // Fallback to mock data
    return mockMatches;
  }
};

const fetchAndConvertTeams = async (): Promise<Team[]> => {
  try {
    // Check if we should use mock data
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
      return mockTeams;
    }
    
    // Fetch from API - using Premier League as example
    const premierLeagueTeams = await fetchTeams('PL');
    
    // Convert
    return convertTeamsToOurFormat(premierLeagueTeams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    // Fallback to mock data
    return mockTeams;
  }
};

export {
  fetchAndConvertNews,
  fetchAndConvertMatches,
  fetchAndConvertTeams,
  mockPlayers,
  mockCategories,
  mockPolls
};
