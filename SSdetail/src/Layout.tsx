import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import { Link } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <Link to="/admin">
          <button style={{ padding: '10px 20px', background: '#ff0000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Админ-панель
          </button>
        </Link>
      </div>
    </>
  );
}

export default Layout;