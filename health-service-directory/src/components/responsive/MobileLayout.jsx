import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useViewport } from './ViewportProvider';

/**
 * MobileLayout - A consistent layout wrapper for mobile pages
 * This component provides a standard header, content area, and navigation
 * for all mobile pages to ensure consistency and proper rendering
 */
export default function MobileLayout({ children, title, showBackButton = false, showSearch = false }) {
  const location = useLocation();
  const { isMobile } = useViewport();
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  // Don't render on desktop
  if (!isMobile) return children;
  
  // Navigation items for the bottom bar
  const navItems = [
    { name: 'Home', icon: HomeIcon, to: '/' },
    { name: 'Search', icon: MagnifyingGlassIcon, to: '/doctors' },
    { name: 'Appointments', icon: CalendarIcon, to: '/appointments' },
    { name: 'Profile', icon: UserIcon, to: '/profile' }
  ];
  
  // Check if a path is active
  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16">
      {/* Mobile Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {showBackButton ? (
            <button 
              onClick={() => window.history.back()}
              className="p-1 -ml-1 rounded-full text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <Link to="/" className="flex items-center">
              <span className="text-lg font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Health</span>
                <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">Connect</span>
              </span>
            </Link>
          )}
          
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          
          <button
            className="p-1 rounded-full text-gray-500"
            onClick={() => setMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Search bar (optional) */}
        {showSearch && (
          <div className="px-4 pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`flex flex-col items-center py-2 px-3 ${
                isActive(item.to) 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
      
      {/* Full-screen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-lg font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Health</span>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">Connect</span>
            </span>
            <button
              className="p-1 rounded-full text-gray-500"
              onClick={() => setMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/doctors" 
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link 
                  to="/appointments" 
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link 
                  to="/telemedicine" 
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Telemedicine
                </Link>
              </li>
              <li>
                <Link 
                  to="/pharmacies" 
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Pharmacies
                </Link>
              </li>
              <li>
                <Link 
                  to="/health-records" 
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Health Records
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/auth" 
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In / Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
