import React from 'react';
import { NewsItemType } from '../types';
import { useNews } from '../context/NewsContext';
import Button from './Button';

interface NewsItemProps {
  newsItem: NewsItemType;
}

const NewsItem: React.FC<NewsItemProps> = ({ newsItem }) => {
  const { deleteNews, setEditingNewsId } = useNews();

  const { title, description, createdAt, editedAt, image, id } = newsItem;

  return (
    <div className="border border-gray-200 rounded-md p-4 mb-4">
      {image && (
        <img src={image} alt="Превью" className="w-full mb-3 rounded max-h-64 object-cover" />
      )}
      <h3 className="text-lg font-semibold mb-1 break-all whitespace-pre-wrap">{title}</h3>
      <p className="w-full text-gray-700 mb-3 break-all whitespace-pre-wrap">{description}</p>
      <p className={`text-sm text-gray-400 ${editedAt ? 'mb-1' : 'mb-3'}`}>{createdAt}</p>
      {editedAt && <p className="text-xs text-gray-400 mb-2">Изменено: {editedAt}</p>}
      <div className="flex gap-2 flex-wrap ">
        <Button
          icon="/icons/pencil.png"
          onClick={() => setEditingNewsId(id)}
          variant="secondary"
          size="small"
        >
          Редактировать
        </Button>
        <Button
          icon="/icons/trash.png"
          onClick={() => deleteNews(id)}
          variant="danger"
          size="small"
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default NewsItem;
