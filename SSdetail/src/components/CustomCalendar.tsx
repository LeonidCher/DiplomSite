import React, { useState, useEffect } from 'react';
import './style/customCalendar.css';

interface CustomCalendarProps {
  onSelect: (dateTime: string) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Доступные временные слоты (например, с 9:00 до 18:00 с шагом 1 час)
  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  ];

  // Получение занятых слотов
  useEffect(() => {
    const fetchOccupiedSlots = async () => {
      try {
        console.log('Fetching applications for occupied slots...');
        const response = await fetch('http://localhost:5000/api/applications');
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Fetch error:', response.status, errorText);
          throw new Error(`Ошибка при загрузке заявок: ${response.status} ${errorText}`);
        }
        const applications = await response.json();

        if (selectedDate) {
          // Фильтруем заявки по выбранной дате
          const selectedDateString = selectedDate.toISOString().split('T')[0];
          const occupied = applications
            .filter((app: any) => {
              const appDate = new Date(app.dateTime).toISOString().split('T')[0];
              return appDate === selectedDateString;
            })
            .map((app: any) => {
              const time = new Date(app.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return time;
            });
          setOccupiedSlots(occupied);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        console.error('Fetch error in CustomCalendar:', err);
      }
    };

    fetchOccupiedSlots();
  }, [selectedDate]);

  // Генерация дней для календаря (например, ближайшие 30 дней)
  const generateDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const days = generateDays();

  const handleDateSelect = (day: Date) => {
    setSelectedDate(day);
    setSelectedTime(null); // Сбрасываем выбранное время при смене даты
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      const dateTime = new Date(selectedDate);
      const [hours, minutes] = time.split(':');
      dateTime.setHours(parseInt(hours), parseInt(minutes));
      onSelect(dateTime.toISOString());
    }
  };

  if (error) return <div className="custom-calendar">Ошибка: {error}</div>;

  return (
    <div className="custom-calendar">
      <h3>Выберите дату и время</h3>
      <div className="calendar-days">
        {days.map((day, index) => (
          <button
            key={index}
            className={`calendar-day ${selectedDate?.toDateString() === day.toDateString() ? 'selected' : ''}`}
            onClick={() => handleDateSelect(day)}
          >
            {day.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })}
          </button>
        ))}
      </div>
      {selectedDate && (
        <div className="calendar-times">
          {availableTimes
            .filter(time => !occupiedSlots.includes(time)) // Фильтруем занятые слоты
            .map((time, index) => (
              <button
                key={index}
                className={`calendar-time ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          {availableTimes.every(time => occupiedSlots.includes(time)) && (
            <p>На эту дату нет свободных слотов.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;