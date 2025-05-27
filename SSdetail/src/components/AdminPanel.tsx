import React, { useState, useEffect } from 'react';
import './style/adminPanel.css';

// Функция для форматирования даты
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof any | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  const handleConfirmApplication = async (id: string) => {
    if (!confirm('Подтвердить эту заявку?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${id}/confirm`, {
        method: 'PUT',
      });
      const result = await response.json();
      if (response.ok) {
        setApplications(applications.map(app =>
          app._id === id ? result.application : app
        ));
        alert('Заявка подтверждена');
      } else {
        alert(`Ошибка: ${result.message || 'Проверь консоль'}`);
      }
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Ошибка при подтверждении, проверь консоль');
    }
  };

  const handleCancelApplication = async (id: string) => {
    if (!confirm('Отменить эту заявку?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${id}/cancel`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        setApplications(applications.filter(app => app._id !== id));
        alert('Заявка отменена');
      } else {
        alert(`Ошибка: ${result.message || 'Проверь консоль'}`);
      }
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Ошибка при отмене, проверь консоль');
    }
  };

  const handleApproveReview = async (id: string) => {
    if (!confirm('Подтвердить этот отзыв?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${id}/approve`, {
        method: 'PUT',
      });
      const result = await response.json();
      if (response.ok) {
        setReviews(reviews.map(review =>
          review._id === id ? result.review : review
        ));
        alert('Отзыв подтверждён');
      } else {
        alert(`Ошибка: ${result.message || 'Проверь консоль'}`);
      }
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Ошибка при подтверждении, проверь консоль');
    }
  };

  const handleRejectReview = async (id: string) => {
    if (!confirm('Отклонить этот отзыв?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${id}/reject`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        setReviews(reviews.filter(review => review._id !== id));
        alert('Отзыв отклонён');
      } else {
        alert(`Ошибка: ${result.message || 'Проверь консоль'}`);
      }
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Ошибка при отклонении, проверь консоль');
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

  // Функция сортировки
  const handleSort = (field: keyof any) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Фильтрация данных
  const filteredApplications = applications.filter(app =>
    Object.values(app).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredReviews = reviews.filter(review =>
    Object.values(review).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) return <div className="admin-panel">Загрузка...</div>;
  if (error) return <div className="admin-panel">Ошибка: {error}</div>;

  return (
    <div className="admin-panel">
      <h2>Админ-панель</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
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
          {sortedApplications.length === 0 ? (
            <p>Нет заявок.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  {visibleFields.name && (
                    <th onClick={() => handleSort('name')}>
                      Имя {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                  )}
                  {visibleFields.carModel && (
                    <th onClick={() => handleSort('carModel')}>
                      Автомобиль {sortField === 'carModel' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                  )}
                  {visibleFields.service && (
                    <th onClick={() => handleSort('service')}>
                      Услуга {sortField === 'service' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                  )}
                  {visibleFields.email && (
                    <th onClick={() => handleSort('email')}>
                      Email {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                  )}
                  {visibleFields.phone && (
                    <th onClick={() => handleSort('phone')}>
                      Телефон {sortField === 'phone' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                  )}
                  {visibleFields.dateTime && (
                    <th onClick={() => handleSort('dateTime')}>
                      Дата и время {sortField === 'dateTime' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                  )}
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {sortedApplications.map((app, index) => (
                  <tr key={index}>
                    {visibleFields.name && <td>{app.name}</td>}
                    {visibleFields.carModel && <td>{app.carModel}</td>}
                    {visibleFields.service && <td>{app.service}</td>}
                    {visibleFields.email && <td>{app.email}</td>}
                    {visibleFields.phone && <td>{app.phone}</td>}
                    {visibleFields.dateTime && (
                      <td className="date-cell">
                        <span className="date-icon">📅</span>
                        {formatDate(app.dateTime)}
                      </td>
                    )}
                    <td>
                      {!app.confirmed && (
                        <button
                          className="confirm-button"
                          onClick={() => handleConfirmApplication(app._id)}
                        >
                          Подтвердить
                        </button>
                      )}
                      <button
                        className="delete-button"
                        onClick={() => handleCancelApplication(app._id)}
                      >
                        Отменить
                      </button>
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
          {sortedReviews.length === 0 ? (
            <p>Нет отзывов.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')}>
                    Имя {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('text')}>
                    Текст {sortField === 'text' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('createdAt')}>
                    Дата {sortField === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('approved')}>
                    Статус {sortField === 'approved' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {sortedReviews.map((review, index) => (
                  <tr key={index}>
                    <td>{review.name}</td>
                    <td>{review.text}</td>
                    <td className="date-cell">
                      <span className="date-icon">📅</span>
                      {formatDate(review.createdAt)}
                    </td>
                    <td>{review.approved ? 'Подтверждён' : 'Ожидает'}</td>
                    <td>
                      {!review.approved ? (
                        <>
                          <button
                            className="confirm-button"
                            onClick={() => handleApproveReview(review._id)}
                          >
                            Подтвердить
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleRejectReview(review._id)}
                          >
                            Отклонить
                          </button>
                        </>
                      ) : (
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          Удалить
                        </button>
                      )}
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