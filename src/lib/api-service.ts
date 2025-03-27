import axios from 'axios';
import { Article, Match, Team, Player } from '@/types';

// API keys
const FOOTBALL_API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY || '';
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || '';

// Base URLs
const FOOTBALL_API_BASE_URL = 'https://api.football-data.org/v4';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Football API endpoints
const fetchCompetitions = async () => {
  try {
    const response = await axios.get(`${FOOTBALL_API_BASE_URL}/competitions`, {
      headers: {
        'X-Auth-Token': FOOTBALL_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching competitions:', error);
    throw error;
  }
};

const fetchMatches = async (competitionId: string) => {
  try {
    const response = await axios.get(`${FOOTBALL_API_BASE_URL}/competitions/${competitionId}/matches`, {
      headers: {
        'X-Auth-Token': FOOTBALL_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching matches for competition ${competitionId}:`, error);
    throw error;
  }
};

const fetchTeams = async (competitionId: string) => {
  try {
    const response = await axios.get(`${FOOTBALL_API_BASE_URL}/competitions/${competitionId}/teams`, {
      headers: {
        'X-Auth-Token': FOOTBALL_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching teams for competition ${competitionId}:`, error);
    throw error;
  }
};

const fetchTeamDetails = async (teamId: string) => {
  try {
    const response = await axios.get(`${FOOTBALL_API_BASE_URL}/teams/${teamId}`, {
      headers: {
        'X-Auth-Token': FOOTBALL_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for team ${teamId}:`, error);
    throw error;
  }
};

// News API endpoints
const fetchFootballNews = async (query: string = 'football morocco', pageSize: number = 10) => {
  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        q: query,
        apiKey: NEWS_API_KEY,
        language: 'en',
        pageSize,
        sortBy: 'publishedAt'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching football news:', error);
    throw error;
  }
};

const fetchTopHeadlines = async (category: string = 'sports', country: string = 'ma', pageSize: number = 5) => {
  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        category,
        country,
        apiKey: NEWS_API_KEY,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};

export {
  fetchCompetitions,
  fetchMatches,
  fetchTeams,
  fetchTeamDetails,
  fetchFootballNews,
  fetchTopHeadlines
};
