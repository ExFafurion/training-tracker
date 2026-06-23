import React from 'react';

interface Training {
  date: string; // YYYY-MM-DD
  distance: number;
}

interface TrainingTableProps {
  trainings: Training[];
  onDelete: (date: string) => void;
  onEdit: (training: Training) => void;
}

const TrainingTable: React.FC<TrainingTableProps> = ({
  trainings,
  onDelete,
  onEdit,
}) => {
  const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  };

  const sortedTrainings = [...trainings].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <div className="data-table">
      <div className="table-header">
        <div className="col-date">Дата (ДД.ММ.ГГГГ)</div>
        <div className="col-distance">Пройдено км</div>
        <div className="col-actions">Действия</div>
      </div>
      <div className="table-body">
        {sortedTrainings.length === 0 ? (
          <div className="empty-state">Нет данных о тренировках</div>
        ) : (
          sortedTrainings.map((training) => (
            <div className="table-row" key={training.date}>
              <div className="col-date">{formatDate(training.date)}</div>
              <div className="col-distance">{training.distance}</div>
              <div className="col-actions">
                <button
                  className="action-btn edit-btn"
                  title="Редактировать"
                  onClick={() => onEdit(training)}
                >
                  ✎
                </button>
                <button
                  className="action-btn delete-btn"
                  title="Удалить"
                  onClick={() => onDelete(training.date)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrainingTable;