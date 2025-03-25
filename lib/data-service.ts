import type { Article, Match, Team, Player, Category, Poll } from '@/types';
import { mockArticles, mockMatches, mockTeams, mockPlayers, mockCategories, mockPolls } from './mock-data';
import { FootballAPI, NewsAPI, useMockData } from './api-service';

// Helper function to convert football-data.org team to our Team type
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const convertApiTeam = (apiTeam: any): Team => {
  return {
    id: apiTeam.id.toString(),
    name: apiTeam.name,
    shortName: apiTeam.shortName || apiTeam.tla || apiTeam.name.split(' ')[0],
    logo: apiTeam.crest || '/images/team-placeholder.png',
    country: apiTeam.area?.name || 'Unknown',
    founded: apiTeam.founded || 0,
    stadium: apiTeam.venue || undefined,
  };
};

// Helper function to convert football-data.org match to our Match type
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const convertApiMatch = (apiMatch: any, teams: Team[]): Match => {
  const homeTeam = teams.find(t => t.id === apiMatch.homeTeam.id.toString()) || {
    id: apiMatch.homeTeam.id.toString(),
    name: apiMatch.homeTeam.name,
    shortName: apiMatch.homeTeam.shortName || apiMatch.homeTeam.name.split(' ')[0],
    logo: '/images/team-placeholder.png',
    country: 'Unknown',
    founded: 0,
  };
  
  const awayTeam = teams.find(t => t.id === apiMatch.awayTeam.id.toString()) || {
    id: apiMatch.awayTeam.id.toString(),
    name: apiMatch.awayTeam.name,
    shortName: apiMatch.awayTeam.shortName || apiMatch.awayTeam.name.split(' ')[0],
    logo: '/images/team-placeholder.png',
    country: 'Unknown',
    founded: 0,
  };
  
  const [date, time] = apiMatch.utcDate.split('T');
  
  return {
    id: apiMatch.id.toString(),
    homeTeam,
    awayTeam,
    homeScore: apiMatch.score.fullTime.home,
    awayScore: apiMatch.score.fullTime.away,
    date,
    time: time.substring(0, 5),
    venue: apiMatch.venue || 'TBD',
    competition: apiMatch.competition.name,
    status: apiMatch.status === 'FINISHED' ? 'completed' : 
            apiMatch.status === 'IN_PLAY' || apiMatch.status === 'PAUSED' ? 'live' : 
            apiMatch.status === 'POSTPONED' ? 'postponed' : 
            apiMatch.status === 'CANCELLED' ? 'canceled' : 'scheduled',
    matchWeek: apiMatch.matchday,
    highlights: undefined,
  };
};

// Helper function to convert football-data.org player to our Player type
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const convertApiPlayer = (apiPlayer: any, teamId: string): Player => {
  return {
    id: apiPlayer.id.toString(),
    name: apiPlayer.name,
    position: apiPlayer.position || 'Unknown',
    nationality: apiPlayer.nationality,
    dateOfBirth: apiPlayer.dateOfBirth,
    teamId,
    image: undefined,
    jerseyNumber: apiPlayer.shirtNumber,
  };
};

// Helper function to convert News API article to our Article type
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const convertNewsArticle = (apiArticle: any, categories: string[] = ['News']): Article => {
  return {
    id: apiArticle.url, // Using URL as a unique ID
    title: apiArticle.title,
    slug: apiArticle.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
    content: apiArticle.content || apiArticle.description,
    excerpt: apiArticle.description,
    featuredImage: apiArticle.urlToImage || '/images/placeholder.jpg',
    author: apiArticle.author || 'Ayuursport Staff',
    publishDate: apiArticle.publishedAt,
    categories,
    tags: categories,
    isFeatured: false,
    viewCount: Math.floor(Math.random() * 1000) + 100, // Random view count for now
  };
};

// Data service class to fetch and manage data
class DataService {
  private competitionId = '2015'; // Default to French Ligue 1, can be changed
  
  // Fetch teams from API or use mock data
  async fetchTeams(): Promise<Team[]> {
    if (useMockData) {
      return mockTeams;
    }
    
    try {
      const teamsData = await FootballAPI.getTeams(this.competitionId);
      if (!teamsData || !teamsData.teams) {
        console.warn('Failed to fetch teams, using mock data');
        return mockTeams;
      }
      
      return teamsData.teams.map(convertApiTeam);
    } catch (error) {
      console.error('Error in fetchTeams:', error);
      return mockTeams;
    }
  }
  
  // Fetch matches from API or use mock data
  async fetchMatches(teams: Team[]): Promise<Match[]> {
    if (useMockData) {
      return mockMatches;
    }
    
    try {
      // Get date range for the next 30 days
      const today = new Date();
      const thirtyDaysLater = new Date();
      thirtyDaysLater.setDate(today.getDate() + 30);
      
      const dateFrom = today.toISOString().split('T')[0];
      const dateTo = thirtyDaysLater.toISOString().split('T')[0];
      
      const matchesData = await FootballAPI.getMatches(this.competitionId, dateFrom, dateTo);
      if (!matchesData || !matchesData.matches) {
        console.warn('Failed to fetch matches, using mock data');
        return mockMatches;
      }
      
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            return matchesData.matches.map((match: any) => convertApiMatch(match, teams));
    } catch (error) {
      console.error('Error in fetchMatches:', error);
      return mockMatches;
    }
  }
  
  // Fetch players from API or use mock data
  async fetchPlayers(teams: Team[]): Promise<Player[]> {
    if (useMockData) {
      return mockPlayers;
    }
    
    try {
      let allPlayers: Player[] = [];
      
      // Fetch players for each team
      for (const team of teams.slice(0, 5)) { // Limit to 5 teams to avoid rate limiting
        const playersData = await FootballAPI.getTeamPlayers(team.id);
        if (playersData) {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          const teamPlayers = playersData.map((player: any) => convertApiPlayer(player, team.id));
          allPlayers = [...allPlayers, ...teamPlayers];
        }
      }
      
      if (allPlayers.length === 0) {
        console.warn('Failed to fetch players, using mock data');
        return mockPlayers;
      }
      
      return allPlayers;
    } catch (error) {
      console.error('Error in fetchPlayers:', error);
      return mockPlayers;
    }
  }
  
  // Fetch news articles from API or use mock data
  async fetchArticles(): Promise<Article[]> {
    if (useMockData) {
      return mockArticles;
    }
    
    try {
      // Fetch general football news
      const footballNews = await NewsAPI.getFootballNews();
      
      // Fetch Moroccan football news
      const moroccanNews = await NewsAPI.getMoroccanFootballNews();
      
      if (!footballNews || !moroccanNews || !footballNews.articles || !moroccanNews.articles) {
        console.warn('Failed to fetch news, using mock data');
        return mockArticles;
      }
      
      // Convert and combine news articles
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  const generalArticles = footballNews.articles.map((article: any) => 
        convertNewsArticle(article, ['International', 'Football'])
      );
      
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            const moroccanArticles = moroccanNews.articles.map((article: any) => 
        convertNewsArticle(article, ['Morocco', 'Botola Pro'])
      );
      
      // Mark some Moroccan articles as featured
      if (moroccanArticles.length > 0) {
        moroccanArticles[0].isFeatured = true;
        if (moroccanArticles.length > 2) {
          moroccanArticles[1].isFeatured = true;
        }
      }
      
      return [...moroccanArticles, ...generalArticles];
    } catch (error) {
      console.error('Error in fetchArticles:', error);
      return mockArticles;
    }
  }
  
  // For categories and polls, we'll use mock data for now
  // These would typically come from a CMS or database
  getCategories(): Category[] {
    return mockCategories;
  }
  
  getPolls(): Poll[] {
    return mockPolls;
  }
  
  // Method to fetch all data
  async fetchAllData() {
    const teams = await this.fetchTeams();
    const matches = await this.fetchMatches(teams);
    const players = await this.fetchPlayers(teams);
    const articles = await this.fetchArticles();
    const categories = this.getCategories();
    const polls = this.getPolls();
    
    return {
      teams,
      matches,
      players,
      articles,
      categories,
      polls,
    };
  }
}

export default new DataService();
