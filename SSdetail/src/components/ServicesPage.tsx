import React, { useState } from 'react';
import ServiceCards from './ServiceCards';
import './style/services.css';

const ServicesPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const services = [
    { id: 1, category: 'polishing', name: 'Полировка кузова', description: 'Профессиональная полировка с использованием 3M и Menzerna. Удаление мелких царапин, восстановление блеска.', materials: '3M, Menzerna', equipment: 'Орбитальные полировальные машины', price: 5000 },
    { id: 2, category: 'cleaning', name: 'Химчистка салона', description: 'Глубокая очистка с экстрактором и натуральными средствами. Удаление пятен и запахов.', materials: 'NaturClean', equipment: 'Karcher экстрактор', price: 3000 },
    { id: 3, category: 'coating', name: 'Нанесение керамики', description: 'Защитное покрытие до 24 месяцев. Гидрофобный эффект и защита от UV.', materials: 'Gyeon Q2', equipment: 'Инфракрасная лампа', price: 8000 },
  ];

  const filterMap = {
    all: services.map(s => s.id),
    polishing: services.filter(s => s.category === 'polishing').map(s => s.id),
    cleaning: services.filter(s => s.category === 'cleaning').map(s => s.id),
    coating: services.filter(s => s.category === 'coating').map(s => s.id),
  };

  return (
    <div className="services-page">
      <div className="container">
        <h1 className="services-title">Наши услуги</h1>
        <div className="filter-buttons">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Все</button>
          <button onClick={() => setFilter('polishing')} className={filter === 'polishing' ? 'active' : ''}>Полировка</button>
          <button onClick={() => setFilter('cleaning')} className={filter === 'cleaning' ? 'active' : ''}>Чистка</button>
          <button onClick={() => setFilter('coating')} className={filter === 'coating' ? 'active' : ''}>Покрытия</button>
        </div>
        <div className="services-grid">
          <ServiceCards filter={filterMap[filter]} />
        </div>
        <div className="price-table">
          <h2>Таблица цен</h2>
          <table>
            <thead>
              <tr>
                <th>Услуга</th>
                <th>Цена (руб.)</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{service.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;