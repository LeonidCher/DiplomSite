import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <>
      <Header isMainPage={isMainPage} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;