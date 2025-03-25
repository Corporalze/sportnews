import axios from 'axios';

// Base API configuration
const apiClient = axios.create({
  baseURL: 'https://api.football-data.org/v4',
  headers: {
    'X-Auth-Token': process.env.NEXT_PUBLIC_FOOTBALL_API_KEY || 'YOUR_API_KEY_HERE',
  },
});

// Football API endpoints
export const FootballAPI = {
  // Competitions
  getCompetitions: async () => {
    try {
      const response = await apiClient.get('/competitions');
      return response.data;
    } catch (error) {
      console.error('Error fetching competitions:', error);
      return null;
    }
  },
  
  // Teams
  getTeams: async (competitionId: string) => {
    try {
      const response = await apiClient.get(`/competitions/${competitionId}/teams`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching teams for competition ${competitionId}:`, error);
      return null;
    }
  },
  
  getTeamById: async (teamId: string) => {
    try {
      const response = await apiClient.get(`/teams/${teamId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching team ${teamId}:`, error);
      return null;
    }
  },
  
  // Matches
  getMatches: async (competitionId: string, dateFrom?: string, dateTo?: string) => {
    try {
      let url = `/competitions/${competitionId}/matches`;
      const params = new URLSearchParams();
      
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching matches for competition ${competitionId}:`, error);
      return null;
    }
  },
  
  getMatchById: async (matchId: string) => {
    try {
      const response = await apiClient.get(`/matches/${matchId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching match ${matchId}:`, error);
      return null;
    }
  },
  
  // Standings
  getStandings: async (competitionId: string) => {
    try {
      const response = await apiClient.get(`/competitions/${competitionId}/standings`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching standings for competition ${competitionId}:`, error);
      return null;
    }
  },
  
  // Players
  getTeamPlayers: async (teamId: string) => {
    try {
      const response = await apiClient.get(`/teams/${teamId}`);
      return response.data.squad;
    } catch (error) {
      console.error(`Error fetching players for team ${teamId}:`, error);
      return null;
    }
  },
};

// News API configuration
const newsApiClient = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'X-Api-Key': process.env.NEXT_PUBLIC_NEWS_API_KEY || 'YOUR_NEWS_API_KEY_HERE',
  },
});

// News API endpoints
export const NewsAPI = {
  getFootballNews: async (query = 'football', pageSize = 10, page = 1) => {
    try {
      const response = await newsApiClient.get('/everything', {
        params: {
          q: query,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize,
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching football news:', error);
      return null;
    }
  },
  
  getMoroccanFootballNews: async (pageSize = 10, page = 1) => {
    try {
      const response = await newsApiClient.get('/everything', {
        params: {
          q: 'morocco football OR moroccan football OR botola',
          language: 'en',
          sortBy: 'publishedAt',
          pageSize,
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Moroccan football news:', error);
      return null;
    }
  },
};

// Fallback to mock data when API limits are reached or during development
export const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
