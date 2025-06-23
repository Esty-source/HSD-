import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon, HomeIcon, UserIcon, PhoneIcon, BuildingStorefrontIcon, BookOpenIcon, BellIcon } from '@heroicons/react/24/outline';
import { useViewport } from './ViewportProvider';

export default function MobileNavigation({ isAuthenticated = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isMobile } = useViewport();
  
  // Don't render on non-mobile devices
  if (!isMobile) return null;

  // Base navigation items
  const baseNavItems = [
    { name: 'Home', to: '/', icon: HomeIcon },
    { name: 'Find Doctors', to: '/find-doctors', icon: UserIcon },
    { name: 'Telemedicine', to: '/telemedicine', icon: PhoneIcon },
    { name: 'Pharmacies', to: '/pharmacies', icon: BuildingStorefrontIcon },
    { name: 'Resources', to: '/resources', icon: BookOpenIcon },
  ];

  // Auth navigation items
  const authNavItems = [
    { name: 'Dashboard', to: '/dashboard/patient', icon: UserIcon },
  ];

  // Combine navigation items based on authentication status
  const navItems = isAuthenticated 
    ? [...baseNavItems, ...authNavItems]
    : baseNavItems;

  // Check if a path is active
  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  // Bottom tab bar navigation (always visible on mobile)
  const tabBarItems = [
    { name: 'Home', to: '/', icon: HomeIcon },
    { name: 'Doctors', to: '/find-doctors', icon: UserIcon },
    { name: 'Resources', to: '/resources', icon: BookOpenIcon },
    { name: 'Profile', to: isAuthenticated ? '/dashboard/patient' : '/auth', icon: UserIcon },
  ];

  return (
    <>
      {/* Full screen mobile menu (when open) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <span className="flex items-center text-xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Health</span>
                <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">Connect</span>
              </span>
            </Link>
            <button
              type="button"
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Navigation links */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`flex items-center px-3 py-3 text-base font-medium rounded-md ${
                    isActive(item.to)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-4 h-6 w-6 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Authentication button */}
          <div className="border-t border-gray-200 p-4">
            <Link
              to="/auth"
              className={`flex w-full items-center justify-center rounded-md px-3 py-3 text-base font-medium ${
                isAuthenticated
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {isAuthenticated ? 'Sign Out' : 'Sign In'}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
