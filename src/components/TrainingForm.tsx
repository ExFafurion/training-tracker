import React, { useState } from 'react';

interface TrainingFormProps {
  onSubmit: (date: string, distance: number) => void;
  initialDate?: string;
  initialDistance?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

const TrainingForm: React.FC<TrainingFormProps> = ({
  onSubmit,
  initialDate = '',
  initialDistance = '',
  isEditing = false,
  onCancel,
}) => {
  const [date, setDate] = useState(initialDate);
  const [distance, setDistance] = useState(initialDistance);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !distance) return;
    onSubmit(date, parseFloat(distance));
    setDate('');
    setDistance('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Дата</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="distance">Пройдено км</label>
            <input
              type="number"
              id="distance"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="5.7"
              step="0.1"
              min="0"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {isEditing ? 'Сохранить' : 'OK'}
          </button>
          {isEditing && (
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Отмена
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TrainingForm;