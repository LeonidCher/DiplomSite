import React, { useState, useEffect } from 'react';
import './style/customCalendar.css';

interface CalendarProps {
  onSelect: (dateTime: string) => void;
}

const CustomCalendar: React.FC<CalendarProps> = ({ onSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-05-27T14:17:00Z')); // Текущая дата: 27 мая 2025, 14:17 BST
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Имитация занятых слотов
  const occupiedSlots = [
    '2025-05-27T14:00:00Z',
    '2025-05-28T10:00:00Z',
    '2025-05-29T15:00:00Z',
  ];

  // Временные слоты с 10:00 до 16:00
  const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  useEffect(() => {
    const utcDate = new Date(currentDate.toISOString());
    setCurrentDate(utcDate);
  }, []);

  const getDaysInMonth = () => {
    const year = currentDate.getUTCFullYear();
    const month = currentDate.getUTCMonth();
    return new Date(year, month + 1, 0).getUTCDate();
  };

  const handleDateSelect = (day: number, time: string) => {
    const selected = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), day, parseInt(time.split(':')[0]), 0, 0));
    if (selected < new Date('2025-05-27T14:17:00Z')) return; // Блокируем прошедшие дни
    const dateTimeString = selected.toISOString();
    setSelectedDate(dateTimeString);
    onSelect(dateTimeString);
  };

  const isOccupied = (day: number, time: string) => {
    const dateTime = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), day, parseInt(time.split(':')[0]), 0, 0)).toISOString();
    return occupiedSlots.includes(dateTime);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1).getUTCDay() || 7;
    const weeks = Math.ceil((daysInMonth + firstDay - 1) / 7);
    const currentDay = new Date('2025-05-27T14:17:00Z').getUTCDate(); // 27 мая

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setCurrentDate(new Date(currentDate.setUTCMonth(currentDate.getUTCMonth() - 1)))}>Пред.</button>
          <h3>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
          <button onClick={() => setCurrentDate(new Date(currentDate.setUTCMonth(currentDate.getUTCMonth() + 1)))}>След.</button>
        </div>
        <div className="calendar-grid">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
          {Array.from({ length: weeks * 7 }, (_, i) => {
            const day = i - firstDay + 2;
            if (day > 0 && day <= daysInMonth) {
              const isPast = day < currentDay && currentDate.getUTCMonth() === 4 && currentDate.getUTCFullYear() === 2025;
              return (
                <div key={i} className="calendar-day">
                  <div className={`day-number ${isPast ? 'past' : ''}`}>{day}</div>
                  {!isPast && (
                    <div className="time-slots">
                      {timeSlots.map(time => {
                        const isBusy = isOccupied(day, time);
                        if (isBusy) return null; // Скрываем занятlavender занятое время
                        return (
                          <button
                            key={time}
                            type="button" // Предотвращаем отправку формы
                            className={`time-slot ${selectedDate === new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), day, parseInt(time.split(':')[0]), 0, 0)).toISOString() ? 'selected' : ''}`}
                            onClick={() => handleDateSelect(day, time)}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            return <div key={i} className="calendar-day"></div>;
          })}
        </div>
      </div>
    );
  };

  return <div>{renderCalendar()}</div>;
};

export default CustomCalendar;