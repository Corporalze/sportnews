'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article, Match, Team, Player, Category, Poll } from '@/types';
import { 
  fetchAndConvertNews, 
  fetchAndConvertMatches, 
  fetchAndConvertTeams, 
  mockPlayers, 
  mockCategories, 
  mockPolls 
} from './data-service';

// Define the context type
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

// Provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [polls, setPolls] = useState<Poll[]>(mockPolls);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch articles, matches, and teams
        const [articlesData, matchesData, teamsData] = await Promise.all([
          fetchAndConvertNews(),
          fetchAndConvertMatches(),
          fetchAndConvertTeams()
        ]);
        
        setArticles(articlesData);
        setMatches(matchesData);
        setTeams(teamsData);
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  // Refresh functions
  const refreshArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const articlesData = await fetchAndConvertNews();
      setArticles(articlesData);
    } catch (err) {
      console.error('Error refreshing articles:', err);
      setError('Failed to refresh articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const refreshMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const matchesData = await fetchAndConvertMatches();
      setMatches(matchesData);
    } catch (err) {
      console.error('Error refreshing matches:', err);
      setError('Failed to refresh matches. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // CRUD operations for articles
  const addArticle = (article: Article) => {
    setArticles(prev => [article, ...prev]);
  };

  const updateArticle = (article: Article) => {
    setArticles(prev => prev.map(a => a.id === article.id ? article : a));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  // CRUD operations for matches
  const addMatch = (match: Match) => {
    setMatches(prev => [match, ...prev]);
  };

  const updateMatch = (match: Match) => {
    setMatches(prev => prev.map(m => m.id === match.id ? match : m));
  };

  const deleteMatch = (id: string) => {
    setMatches(prev => prev.filter(m => m.id !== id));
  };

  // CRUD operations for categories
  const addCategory = (category: Category) => {
    setCategories(prev => [category, ...prev]);
  };

  const updateCategory = (category: Category) => {
    setCategories(prev => prev.map(c => c.id === category.id ? category : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Context value
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

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for using the context
export const useData = () => useContext(DataContext);
