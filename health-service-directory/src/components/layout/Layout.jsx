import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isDashboard && <Header />}
      <main className={`flex-grow w-full${isDashboard ? ' h-screen' : ''}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}
