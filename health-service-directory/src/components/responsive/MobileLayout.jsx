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
  const { isMobile, deviceType, isTouchDevice } = useViewport();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Always render the mobile layout on mobile devices, but also render it on desktop if we're testing
  // This ensures we can still test the mobile layout on desktop browsers
  if (!isMobile && !isTouchDevice && process.env.NODE_ENV !== 'development') {
    return children;
  }
  
  // Ensure proper viewport settings for mobile
  React.useEffect(() => {
    // Set viewport meta tag to ensure proper scaling
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);
  
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
    <div className="flex flex-col min-h-screen bg-gray-50 pb-16 max-w-[100vw] overflow-x-hidden">
      {/* Mobile Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {showBackButton ? (
            <button 
              onClick={() => window.history.back()}
              className="p-1 -ml-1 rounded-full text-gray-500 active:bg-gray-100"
              aria-label="Go back"
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
          
          <h1 className="text-lg font-semibold text-gray-800 truncate max-w-[150px]">{title}</h1>
          
          <button
            className="p-1 rounded-full text-gray-500 active:bg-gray-100"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              {searchQuery && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`flex flex-col items-center py-2 px-3 ${
                isActive(item.to) 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              aria-label={item.name}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
      
      {/* Full-screen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
            <span className="text-lg font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Health</span>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">Connect</span>
            </span>
            <button
              className="p-1 rounded-full text-gray-500 active:bg-gray-100"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-4 pb-20">
            {/* User profile section if authenticated */}
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-medium">Welcome</h3>
                  <p className="text-sm text-gray-600">Access your health services</p>
                </div>
              </div>
              <Link 
                to="/auth" 
                className="mt-3 block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Sign In / Sign Up
              </Link>
            </div>

            {/* Main navigation */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-4">Main Menu</h3>
              <ul className="space-y-1 bg-white rounded-xl overflow-hidden shadow-sm">
                <li>
                  <Link 
                    to="/" 
                    className="flex items-center px-4 py-3 hover:bg-gray-50 active:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <HomeIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/doctors" 
                    className="flex items-center px-4 py-3 hover:bg-gray-50 active:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <UserIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Find Doctors</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/appointments" 
                    className="flex items-center px-4 py-3 hover:bg-gray-50 active:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <CalendarIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Appointments</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/telemedicine" 
                    className="flex items-center px-4 py-3 hover:bg-gray-50 active:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Telemedicine</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-4">Services</h3>
              <ul className="space-y-1 bg-white rounded-xl overflow-hidden shadow-sm">
                <li>
                  <Link 
                    to="/pharmacies" 
                    className="flex items-center px-4 py-3 hover:bg-gray-50 active:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Pharmacies</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/health-records" 
                    className="flex items-center px-4 py-3 hover:bg-gray-50 active:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Health Records</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/resources" 
                    className="flex items-center px-4 py-3 hover:bg-gray-50 active:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Resources</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-4">Account</h3>
              <ul className="space-y-1 bg-white rounded-xl overflow-hidden shadow-sm">
                <li>
                  <Link 
                    to="/profile" 
                    className="flex items-center px-4 py-3 hover:bg-gray-50 active:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <UserIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/settings" 
                    className="flex items-center px-4 py-3 hover:bg-gray-50 active:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
