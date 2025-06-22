import React from 'react';
import NewsItem from './NewsItem';
import { useNews } from '../context/NewsContext';

const NewsList: React.FC = () => {
  const { news } = useNews();

  if (!news.length) {
    return <p className="text-center text-gray-500">Новостей пока нет.</p>;
  }

  return (
    <div className="mt-6">
      {news.map((news) => (
        <NewsItem key={news.id} newsItem={news} />
      ))}
    </div>
  );
};

export default NewsList;
