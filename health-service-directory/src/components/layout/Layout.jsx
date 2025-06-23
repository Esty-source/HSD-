import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-screen max-w-[100vw] overflow-x-hidden">
      {/* Show header on all pages except dashboards */}
      {!isDashboard && <Header />}
      {/* Main content area */}
      <main className="flex-grow w-full mx-0 px-0">
        {/* Full width content area */}
        <div className="w-full mx-0 px-0">
          <Outlet />
        </div>
      </main>
      {/* Only show footer if not on dashboard */}
      {!isDashboard && <Footer />}
    </div>
  );
}
