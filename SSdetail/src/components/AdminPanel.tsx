import React, { useState, useEffect } from 'react';
import './style/adminPanel.css';

const AdminPanel: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'applications' | 'reviews'>('applications');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appResponse = await fetch('http://localhost:5000/api/applications');
        if (!appResponse.ok) throw new Error('Ошибка при загрузке заявок');
        const appData = await appResponse.json();
        setApplications(appData);

        const reviewResponse = await fetch('http://localhost:5000/api/reviews');
        if (!reviewResponse.ok) throw new Error('Ошибка при загрузке отзывов');
        const reviewData = await reviewResponse.json();
        setReviews(reviewData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteReview = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setReviews(reviews.filter(review => review._id !== id));
          alert('Отзыв удалён успешно!');
        } else {
          const result = await response.json();
          alert(`Ошибка: ${result.message || 'Проверь консоль'}`);
        }
      } catch (err) {
        console.error('Ошибка при удалении:', err);
        alert('Ошибка сервера, проверь консоль');
      }
    }
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
          {applications.length === 0 ? (
            <p>Нет заявок.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Автомобиль</th>
                  <th>Услуга</th>
                  <th>Email</th>
                  <th>Телефон</th>
                  <th>Дата и время</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={index}>
                    <td>{app.name}</td>
                    <td>{app.carModel}</td>
                    <td>{app.service}</td>
                    <td>{app.email}</td>
                    <td>{app.phone}</td>
                    <td>{new Date(app.dateTime).toLocaleString()}</td>
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
                        onClick={() => handleDeleteReview(review._id)}
                        style={{ background: '#ff0000', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
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