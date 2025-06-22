import React, { createContext, useContext, useState } from 'react';
import { NewsItemType } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface NewsContextInterface {
  news: NewsItemType[];
  addNews: (news: NewsItemType) => void;
  deleteNews: (id: number) => void;
  updateNews: (updated: NewsItemType) => void;
  editingNewsId: number | null;
  setEditingNewsId: (id: number | null) => void;
}

const NewsContext = createContext<NewsContextInterface | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useLocalStorage<NewsItemType[]>('news');
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);

  const addNews = (item: NewsItemType) => {
    setNews([item, ...news]);
  };

  const deleteNews = (id: number) => {
    setNews(news.filter((n) => n.id !== id));
  };

  const updateNews = (updated: NewsItemType) => {
    setNews(news.map((n) => (n.id === updated.id ? updated : n)));
  };

  return (
    <NewsContext.Provider
      value={{ news, addNews, deleteNews, updateNews, editingNewsId, setEditingNewsId }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error('useNews must be used within NewsProvider');
  return ctx;
};
