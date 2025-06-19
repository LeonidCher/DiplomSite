import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import AdminPanel from './components/AdminPanel';
import ServicesPage from './components/ServicesPage';
import ContactsPage from './components/ContactsPage';
import AboutPage from './components/AboutPage';
import MainContent from './components/MainContent';
import ApplicationForm from './components/ApplicationForm';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/apply" element={<ApplicationForm />} />
        </Route>
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminPanel />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

const LoginPage: React.FC<{ onLogin: (username: string, password: string) => boolean }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', background: '#1a1a1a', color: '#fff', borderRadius: '8px' }}>
      <h2>Вход в админ-панель</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username">Логин:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
          />
        </div>
        {error && <p style={{ color: '#ff0000', marginBottom: '15px' }}>{error}</p>}
        <button
          type="submit"
          style={{ padding: '10px 20px', background: '#ff0000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default App;