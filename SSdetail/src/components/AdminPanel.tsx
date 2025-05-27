import React, { useState, useEffect } from 'react';
import './style/adminPanel.css';

const AdminPanel: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/applications');
        if (!response.ok) throw new Error('Ошибка при загрузке заявок');
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div className="admin-panel">Загрузка...</div>;
  if (error) return <div className="admin-panel">Ошибка: {error}</div>;

  return (
    <div className="admin-panel">
      <h2>Админ-панель: Заявки</h2>
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
                <td>{new Date(app.dateTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;