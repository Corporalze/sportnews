'use client';

import { createContext, useContext, type ReactNode, useState, useEffect } from 'react';
import type { Article, Match, Team, Player, Category, Poll } from '@/types';
import { mockArticles, mockMatches, mockTeams, mockPlayers, mockCategories, mockPolls } from '@/lib/mock-data';
import DataService from '@/lib/data-service';

// Define the shape of our data context
interface DataContextType {
  articles: Article[];
  matches: Match[];
  teams: Team[];
  players: Player[];
  categories: Category[];
  polls: Poll[];
  loading: boolean;
  error: string | null;
  // Methods for data operations
  refreshArticles: () => Promise<void>;
  refreshMatches: () => Promise<void>;
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  addMatch: (match: Match) => void;
  updateMatch: (match: Match) => void;
  deleteMatch: (id: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
}

// Create the context with default values
const DataContext = createContext<DataContextType>({
  articles: [],
  matches: [],
  teams: [],
  players: [],
  categories: [],
  polls: [],
  loading: false,
  error: null,
  refreshArticles: async () => {},
  refreshMatches: async () => {},
  addArticle: () => {},
  updateArticle: () => {},
  deleteArticle: () => {},
  addMatch: () => {},
  updateMatch: () => {},
  deleteMatch: () => {},
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
});

// Provider component that wraps the app and makes data available
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [polls, setPolls] = useState<Poll[]>(mockPolls);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await DataService.fetchAllData();
        
        setTeams(data.teams);
        setMatches(data.matches);
        setPlayers(data.players);
        setArticles(data.articles);
        setCategories(data.categories);
        setPolls(data.polls);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Refresh articles from API
  const refreshArticles = async () => {
    try {
      setLoading(true);
      const newArticles = await DataService.fetchArticles();
      setArticles(newArticles);
    } catch (err) {
      console.error('Error refreshing articles:', err);
      setError('Failed to refresh articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh matches from API
  const refreshMatches = async () => {
    try {
      setLoading(true);
      const newMatches = await DataService.fetchMatches(teams);
      setMatches(newMatches);
    } catch (err) {
      console.error('Error refreshing matches:', err);
      setError('Failed to refresh matches. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Admin functions for content management
  const addArticle = (article: Article) => {
    setArticles(prev => [article, ...prev]);
  };

  const updateArticle = (article: Article) => {
    setArticles(prev => prev.map(a => a.id === article.id ? article : a));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const addMatch = (match: Match) => {
    setMatches(prev => [match, ...prev]);
  };

  const updateMatch = (match: Match) => {
    setMatches(prev => prev.map(m => m.id === match.id ? match : m));
  };

  const deleteMatch = (id: string) => {
    setMatches(prev => prev.filter(m => m.id !== id));
  };

  // Add these functions to the DataProvider component
const addCategory = (category: Category) => {
  setCategories(prev => [category, ...prev]);
};

const updateCategory = (category: Category) => {
  setCategories(prev => prev.map(c => c.id === category.id ? category : c));
};

const deleteCategory = (id: string) => {
  setCategories(prev => prev.filter(c => c.id !== id));
};

// Make sure to include them in the value object
const value = {
  articles,
  matches,
  teams,
  players,
  categories,
  polls,
  loading,
  error,
  refreshArticles,
  refreshMatches,
  addArticle,
  updateArticle,
  deleteArticle,
  addMatch,
  updateMatch,
  deleteMatch,
  addCategory,
  updateCategory,
  deleteCategory,
};

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
