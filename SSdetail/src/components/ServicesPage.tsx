import React from 'react';
import ServiceCards from './ServiceCards';
import './style/services.css';

const ServicesPage: React.FC = () => {
  const services = [
    { id: 1, category: 'polishing', name: 'Полировка кузова', description: 'Профессиональная полировка с использованием 3M и Menzerna. Удаление мелких царапин, восстановление блеска.', materials: '3M, Menzerna', equipment: 'Орбитальные полировальные машины', price: 5000 },
    { id: 2, category: 'cleaning', name: 'Химчистка салона', description: 'Глубокая очистка с экстрактором и натуральными средствами. Удаление пятен и запахов.', materials: 'NaturClean', equipment: 'Karcher экстрактор', price: 3000 },
    { id: 3, category: 'coating', name: 'Нанесение керамики', description: 'Защитное покрытие до 24 месяцев. Гидрофобный эффект и защита от UV.', materials: 'Gyeon Q2', equipment: 'Инфракрасная лампа', price: 8000 },
    { id: 4, category: 'toning', name: 'Тонировка', description: 'Профессиональная тонировка с защитной плёнкой.', materials: '3M Tinting Film', equipment: 'Тонировочные станки', price: 6000 },
    { id: 5, category: 'engineClean', name: 'Мойка двигателя', description: 'Глубокая очистка двигателя с защитными составами.', materials: 'Engine Cleaner', equipment: 'Высокое давление', price: 2500 },
    { id: 6, category: 'brone', name: 'Бронепленка', description: 'Защита кузова от царапин и сколов.', materials: 'XPEL', equipment: 'Калибровочные станки', price: 10000 },
    { id: 7, category: 'electrika', name: 'Электрика', description: 'Диагностика и ремонт электрики автомобиля.', materials: 'Проводка и инструменты', equipment: 'Мультиметр', price: 4000 },
    { id: 8, category: 'diagnost', name: 'Диагностика', description: 'Компьютерная диагностика автомобиля.', materials: 'Диагностическое ПО', equipment: 'Сканер OBD-II', price: 1500 },
    { id: 9, category: 'moikaDna', name: 'Мойка дна', description: 'Очистка днища с антикоррозийной обработкой.', materials: 'Антикор', equipment: 'Эстакада', price: 3500 },
    { id: 10, category: 'predprodazha', name: 'Предпродажная подготовка', description: 'Комплексная подготовка авто к продаже.', materials: 'Разные', equipment: 'Все оборудование', price: 7000 },
  ];

  return (
    <div className="services-page">
      <div className="container">
        <h1 className="services-title">Наши услуги</h1>
        <div className="services-grid">
          <ServiceCards services={services} />
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