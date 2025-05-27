import React, { useState, useEffect } from 'react';
import './style/adminPanel.css';

const AdminPanel: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'applications' | 'reviews'>('applications');
  const [visibleFields, setVisibleFields] = useState({
    name: true,
    carModel: true,
    service: true,
    email: true,
    phone: true,
    dateTime: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching applications...');
        const appResponse = await fetch('http://localhost:5000/api/applications');
        if (!appResponse.ok) {
          const errorText = await appResponse.text();
          console.error('Application fetch error:', appResponse.status, errorText);
          throw new Error(`Ошибка при загрузке заявок: ${appResponse.status} ${errorText}`);
        }
        const appData = await appResponse.json();
        setApplications(appData);

        console.log('Fetching reviews...');
        const reviewResponse = await fetch('http://localhost:5000/api/reviews');
        if (!reviewResponse.ok) {
          const errorText = await reviewResponse.text();
          console.error('Reviews fetch error:', reviewResponse.status, errorText);
          throw new Error(`Ошибка при загрузке отзывов: ${reviewResponse.status} ${errorText}`);
        }
        const reviewData = await reviewResponse.json();
        setReviews(reviewData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteApplication = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту заявку?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        setApplications(applications.filter(app => app._id !== id));
        alert('Заявка удалена');
      } else {
        alert(`Ошибка: ${result.message || 'Проверь консоль'}`);
      }
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Ошибка при удалении, проверь консоль');
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот отзыв?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        setReviews(reviews.filter(review => review._id !== id));
        alert('Отзыв удален');
      } else {
        alert(`Ошибка: ${result.message || 'Проверь консоль'}`);
      }
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Ошибка при удалении, проверь консоль');
    }
  };

  const toggleField = (field: keyof typeof visibleFields) => {
    setVisibleFields(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (loading) return <div className="admin-panel">Загрузка...</div>;
  if (error) return <div className="admin-panel">Ошибка: {error}</div>;

  return (
    <div className="admin-panel">
      <h2>Админ-панель</h2>
      <div className="tabs">
        <button
          className={`tab-button ${tab === 'applications' ? 'active' : ''}`}
          onClick={() => setTab('applications')}
        >
          Заявки
        </button>
        <button
          className={`tab-button ${tab === 'reviews' ? 'active' : ''}`}
          onClick={() => setTab('reviews')}
        >
          Отзывы
        </button>
      </div>

      {tab === 'applications' && (
        <>
          <h3>Заявки</h3>
          <div className="filter-controls">
            <label>
              <input
                type="checkbox"
                checked={visibleFields.name}
                onChange={() => toggleField('name')}
              />
              Имя
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleFields.carModel}
                onChange={() => toggleField('carModel')}
              />
              Автомобиль
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleFields.service}
                onChange={() => toggleField('service')}
              />
              Услуга
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleFields.email}
                onChange={() => toggleField('email')}
              />
              Email
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleFields.phone}
                onChange={() => toggleField('phone')}
              />
              Телефон
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleFields.dateTime}
                onChange={() => toggleField('dateTime')}
              />
              Дата и время
            </label>
          </div>
          {applications.length === 0 ? (
            <p>Нет заявок.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  {visibleFields.name && <th>Имя</th>}
                  {visibleFields.carModel && <th>Автомобиль</th>}
                  {visibleFields.service && <th>Услуга</th>}
                  {visibleFields.email && <th>Email</th>}
                  {visibleFields.phone && <th>Телефон</th>}
                  {visibleFields.dateTime && <th>Дата и время</th>}
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={index}>
                    {visibleFields.name && <td>{app.name}</td>}
                    {visibleFields.carModel && <td>{app.carModel}</td>}
                    {visibleFields.service && <td>{app.service}</td>}
                    {visibleFields.email && <td>{app.email}</td>}
                    {visibleFields.phone && <td>{app.phone}</td>}
                    {visibleFields.dateTime && <td>{new Date(app.dateTime).toLocaleString()}</td>}
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteApplication(app._id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {tab === 'reviews' && (
        <>
          <h3>Отзывы</h3>
          {reviews.length === 0 ? (
            <p>Нет отзывов.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Текст</th>
                  <th>Дата</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={index}>
                    <td>{review.name}</td>
                    <td>{review.text}</td>
                    <td>{new Date(review.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteReview(review._id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPanel;