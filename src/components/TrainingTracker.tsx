import React, { useState } from 'react';
import TrainingForm from './TrainingForm';
import TrainingTable from './TrainingTable';
import './TrainingTracker.css';

interface Training {
  date: string;
  distance: number;
}

const TrainingTracker: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [editDistance, setEditDistance] = useState<number | null>(null);

  const handleSubmit = (date: string, distance: number) => {
    if (editingDate !== null) {
      // Режим редактирования: удаляем старую запись, добавляем новую (суммируем при совпадении)
      setTrainings((prev) => {
        const filtered = prev.filter((t) => t.date !== editingDate);
        const existing = filtered.find((t) => t.date === date);
        if (existing) {
          return filtered.map((t) =>
            t.date === date ? { ...t, distance: t.distance + distance } : t
          );
        } else {
          return [...filtered, { date, distance }];
        }
      });
      setEditingDate(null);
      setEditDistance(null);
    } else {
      // Обычное добавление
      setTrainings((prev) => {
        const existing = prev.find((t) => t.date === date);
        if (existing) {
          return prev.map((t) =>
            t.date === date ? { ...t, distance: t.distance + distance } : t
          );
        } else {
          return [...prev, { date, distance }];
        }
      });
    }
  };

  const handleDelete = (date: string) => {
    setTrainings((prev) => prev.filter((t) => t.date !== date));
    if (editingDate === date) {
      setEditingDate(null);
      setEditDistance(null);
    }
  };

  const handleEdit = (training: Training) => {
    setEditingDate(training.date);
    setEditDistance(training.distance);
  };

  const handleCancelEdit = () => {
    setEditingDate(null);
    setEditDistance(null);
  };

  return (
    <div className="container">
      <TrainingForm
        onSubmit={handleSubmit}
        initialDate={editingDate || ''}
        initialDistance={editDistance !== null ? String(editDistance) : ''}
        isEditing={editingDate !== null}
        onCancel={handleCancelEdit}
      />
      <TrainingTable
        trainings={trainings}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default TrainingTracker;