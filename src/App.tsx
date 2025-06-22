import React from 'react';
import NewsList from './components/NewsList';
import Modal from './components/Modal';
import NewsEditor from './components/NewsEditor';
import { useNews } from './context/NewsContext';
import { NewsItemType } from './types';

const App = () => {
  const { news, addNews, updateNews, editingNewsId, setEditingNewsId } = useNews();

  const onModalSubmit = (news: NewsItemType) => {
    updateNews(news);
    setEditingNewsId(null);
  };

  const editableNews = news.find((n) => n.id === editingNewsId);

  return (
    <div className="min-h-screen px-4 py-6 flex flex-col lg:flex-row lg:items-start lg:justify-start">
      <div className="w-full max-w-xl lg:max-w-md">
        <NewsEditor onSubmit={addNews} />
        <NewsList />
      </div>
      {editingNewsId && (
        <Modal>
          <NewsEditor
            editableNews={editableNews}
            onSubmit={onModalSubmit}
            onCancel={() => setEditingNewsId(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
