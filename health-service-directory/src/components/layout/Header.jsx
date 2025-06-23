import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';

// Base navigation items that are always visible
const baseNavigation = [
  { name: 'Home', to: '/' },
  { name: 'Find Doctors', to: '/find-doctors' },
  { name: 'Telemedicine', to: '/telemedicine' },
  { name: 'Pharmacies', to: '/pharmacies' },
  { name: 'Resources', to: '/resources' },
  { name: 'Contact', to: '/contact' },
];

// Navigation items that require authentication
const authNavigation = [
  { name: 'Dashboard', to: '/dashboard/patient' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 bg-white shadow-sm hover:bg-gray-50 hover:text-blue-600 transition-all duration-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
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

        {/* Mobile menu */}
        {mobileMenuOpen && createPortal(
          <div className="fixed inset-0 z-[9999] lg:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            
            {/* Menu panel */}
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transform transition-all duration-300 ease-in-out">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Health Service Directory</span>
                  <span className="text-xl font-bold">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Health</span>
                    <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">Connect</span>
                  </span>
                </Link>
                <button
                  type="button"
                  className="rounded-lg p-2.5 text-gray-700 bg-white shadow-sm hover:bg-gray-50 hover:text-blue-600 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 ${
                          isActive(item.to)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-900 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6 space-y-4">
                    <Link
                      to="/login"
                      className="-mx-3 flex items-center gap-x-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="-mx-3 flex items-center gap-x-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-blue-600 hover:bg-blue-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserPlusIcon className="h-5 w-5" />
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </nav>
    </header>
  );
}
