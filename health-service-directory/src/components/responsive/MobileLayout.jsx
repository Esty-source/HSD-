import React, { useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';
import { useViewport } from './ViewportProvider';
import MobileFooter from './MobileFooter';

/**
 * MobileLayout - A consistent layout wrapper for mobile pages
 * This component provides a standard header, content area, and navigation
 * for all mobile pages to ensure consistency and proper rendering
 */
export default function MobileLayout({ 
  children, 
  title, 
  showBackButton = false, 
  showSearch = false,
  fullScreen = false,
  transparentHeader = false,
  onBack = () => window.history.back(),
  searchPlaceholder = 'Search...',
  onSearch = () => {},
  className = ''
}) {
  const location = useLocation();
  const { isMobile, deviceType, isTouchDevice, orientation } = useViewport();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const headerRef = React.useRef(null);
  
  // Always render the mobile layout on mobile devices, but also render it on desktop if we're testing
  if (!isMobile && !isTouchDevice && process.env.NODE_ENV !== 'development') {
    return children;
  }
  
  // Update header height when orientation changes
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [orientation]);
  
  // Ensure proper viewport settings for mobile
  useEffect(() => {
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
  
  // Handle search submission
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);
  
  // Navigation items for the bottom bar
  const navItems = [
    { name: 'Home', icon: HomeIcon, to: '/' },
    { name: 'Search', icon: MagnifyingGlassIcon, to: '/doctors' },
    { name: 'Appointments', icon: CalendarIcon, to: '/appointments' },
    { name: 'Profile', icon: UserIcon, to: '/mobile-profile' }
  ];
  
  // Check if a path is active
  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };
  
  // Get header background based on transparency setting
  const headerBackground = transparentHeader 
    ? 'bg-transparent' 
    : 'bg-white shadow-sm';
  
  return (
    <div className="flex flex-col h-screen w-screen max-w-[100vw] overflow-x-hidden bg-gray-50" style={{background: '#f8fafc'}}>
      {/* Mobile Header */}
      <header 
        ref={headerRef}
        className={`sticky top-0 z-20 ${headerBackground} transition-all duration-200 w-full`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {showBackButton ? (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 rounded-full text-gray-500 active:bg-gray-100 touch-manipulation"
              aria-label="Go back"
            >
              <ChevronLeftIcon className="h-6 w-6" />
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
            className="p-2 rounded-full bg-white text-blue-600 shadow-md active:bg-gray-100 touch-manipulation"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Bars3Icon className="h-6 w-6 text-blue-600" />
          </button>
        </div>
        
        {/* Search bar (optional) */}
        {showSearch && (
          <div className="px-4 pb-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              {searchQuery && (
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </form>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-1 w-full overflow-x-hidden p-0 m-0" style={{background: '#e0e7ef'}}>
        {children}
      </main>
      
      {/* Footer for all mobile pages */}
      <div className="w-full m-0 p-0">
        <MobileFooter />
      </div>
      
      {/* Full-screen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
            <span className="text-lg font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Health</span>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">Connect</span>
            </span>
            <button
              className="p-2 rounded-full bg-white text-blue-600 shadow-md active:bg-gray-100 touch-manipulation"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6 text-blue-600" />
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
                className="mt-3 block w-full py-2 px-4 bg-blue-600 text-white text-center rounded-lg font-medium touch-manipulation"
                onClick={() => setMenuOpen(false)}
              >
                Sign In / Sign Up
              </Link>
            </div>

            {/* Main navigation */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-4">Main Menu</h3>
              <ul className="space-y-1 bg-white rounded-xl overflow-hidden shadow-sm">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.to} 
                      className="flex items-center px-4 py-3 hover:bg-gray-50 active:bg-gray-100 touch-manipulation"
                      onClick={() => setMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-blue-600 mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Add styles for touch optimization */}
      <style jsx>{`
        .touch-manipulation {
          touch-action: manipulation;
        }
        
        @media (hover: none) {
          .hover\\:bg-gray-50:hover {
            background-color: transparent;
          }
        }
      `}</style>
    </div>
  );
}
