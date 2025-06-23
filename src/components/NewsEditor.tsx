import React, { useEffect, useState } from 'react';
import { NewsItemType } from '../types';
import Button from '../components/Button';

interface NewsEditorProps {
  editableNews?: NewsItemType;
  onSubmit: (news: NewsItemType) => void;
  onCancel?: () => void;
}

const defaultState = {
  title: '',
  description: '',
  image: undefined,
  createdAt: new Date().toLocaleString(),
};

type FormState = {
  title: string;
  description: string;
  image?: string;
  createdAt?: string;
};

const NewsEditor: React.FC<NewsEditorProps> = ({ editableNews, onSubmit, onCancel }) => {
  const [form, setForm] = useState<FormState>(defaultState);
  const { title, description, image } = editableNews || defaultState;

  useEffect(() => {
    if (editableNews) {
      setForm({ title, description, image });
    }
  }, [editableNews]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleResetImage = () => {
    setForm((prev) => ({ ...prev, image: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date().toLocaleString();

    const news: NewsItemType = {
      id: editableNews?.id ?? Date.now(),
      createdAt: editableNews?.createdAt ?? now,
      editedAt: editableNews ? now : undefined,
      ...form,
    };

    onSubmit(news);

    if (!editableNews) {
      setForm(defaultState);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl font-bold mb-4">
        {!editableNews ? 'Добавить новость' : 'Редактировать новость'}
      </h2>

      <input
        name="title"
        type="text"
        placeholder="Заголовок"
        value={form.title}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
        required
      />

      <textarea
        name="description"
        placeholder="Текст новости"
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2 mb-4"
        required
      />

      <div className="flex items-center mb-4">
        <label className="mr-2 px-4 py-1 bg-gray-100 text-gray-800 rounded cursor-pointer hover:bg-gray-200 text-sm">
          {form.image ? 'Редактировать изображение' : 'Выберите изображение'}
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
        {form.image && (
          <Button
            icon={`${process.env.PUBLIC_URL}/icons/trash.png`}
            type="button"
            size="small"
            variant="danger"
            onClick={handleResetImage}
          />
        )}
      </div>

      <div className="flex gap-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Отмена
          </Button>
        )}
        <Button type="submit">{editableNews ? 'Сохранить' : 'Добавить'}</Button>
      </div>
    </form>
  );
};

export default NewsEditor;
