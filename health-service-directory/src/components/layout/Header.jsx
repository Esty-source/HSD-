import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

// Base navigation items that are always visible
const baseNavigation = [
  { name: 'Home', to: '/' },
  { name: 'Find Doctors', to: '/find-doctors' },
  { name: 'Telemedicine', to: '/telemedicine' },
  { name: 'Pharmacies', to: '/pharmacies' },
  { name: 'Resources', to: '/resources' },
  { name: 'Emergency', to: '/emergency' },
  { name: 'Contact', to: '/contact' },
];

// Navigation items that require authentication
const authNavigation = [
  { name: 'Dashboard', to: '/dashboard/patient' },
];

export default function Header() {
  const location = useLocation();
  const isAuthenticated = false; // TODO: Replace with actual auth check

  // Combine navigation items based on authentication status
  const navigation = isAuthenticated 
    ? [...baseNavigation, ...authNavigation]
    : baseNavigation;

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out w-full">
      <nav className="mx-auto flex items-center justify-between p-4 lg:px-8 w-full" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 transition duration-300 ease-in-out hover:scale-105">
            <span className="flex items-center text-xl font-bold">
              <span className="sr-only">Health Service Directory</span>
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Health</span>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">Connect</span>
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className={`group relative text-sm font-semibold leading-6 transition-all duration-300 ${
                isActive(item.to)
                  ? 'text-blue-600'
                  : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              {item.name}
              <span 
                className={`absolute -bottom-4 left-0 h-0.5 w-full transform bg-blue-600 transition-all duration-300 ${
                  isActive(item.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Desktop right section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link
            to="/login"
            className="inline-flex items-center gap-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Sign In
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <UserPlusIcon className="h-5 w-5" />
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
