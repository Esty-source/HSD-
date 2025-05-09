import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useViewport } from '../responsive/ViewportProvider';

export default function Layout() {
  const location = useLocation();
  const { isMobile } = useViewport();
  const isDashboard = location.pathname.includes('/dashboard');

  // Add padding to the bottom on mobile to account for the fixed navigation bar
  const mobilePadding = isMobile ? 'pb-16' : '';

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${mobilePadding}`}>
      {/* Only show header if not on dashboard and not on mobile */}
      {!isDashboard && (!isMobile || (isMobile && location.pathname === '/')) && <Header />}
      
      {/* Main content area */}
      <main className={`flex-grow w-full ${isDashboard ? 'h-screen' : ''} ${isMobile ? 'pt-2' : 'pt-4'}`}>
        {/* Full width content area */}
        <div className="w-full max-w-full px-4">
          <Outlet />
        </div>
      </main>
      
      {/* Only show footer if not on dashboard and not on mobile */}
      {!isDashboard && !isMobile && <Footer />}
    </div>
  );
}
