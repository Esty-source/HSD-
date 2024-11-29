import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { useNotifications } from '../../context/NotificationsContext';

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Find Doctors', to: '/doctors' },
  { name: 'Appointments', to: '/appointments' },
  { name: 'Telemedicine', to: '/telemedicine' },
  { name: 'Pharmacies', to: '/pharmacies' },
  { name: 'Health Records', to: '/health-records' },
  { name: 'Resources', to: '/resources' },
  { name: 'Notifications', to: '/notifications' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { unreadCount } = useNotifications();

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
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
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item, index) => (
            <React.Fragment key={item.name}>
              {item.name === 'Notifications' ? (
                <Link
                  to={item.to}
                  className={`group relative text-sm font-semibold leading-6 transition-all duration-300 ${
                    isActive(item.to)
                      ? 'text-blue-600'
                      : 'text-gray-900 hover:text-blue-600'
                  }`}
                >
                  <BellIcon className="h-6 w-6 transition-colors duration-200" />
                  <span className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 -bottom-8 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Notifications
                  </span>
                </Link>
              ) : (
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
                  ></span>
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Desktop right section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <Link
            to="/profile"
            className="flex items-center gap-x-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-md"
          >
            <UserCircleIcon className="h-5 w-5" />
            Profile
          </Link>
          <div className="hidden lg:flex lg:items-center">
            <Link
              to="/auth"
              className="text-yellow-400 hover:text-yellow-300 transition duration-150 ease-in-out bg-yellow-500/20 p-1.5 rounded-full hover:bg-yellow-500/30"
              title="Sign in"
            >
              <UserIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <div className="fixed inset-y-0 right-0 w-full overflow-y-auto bg-white px-6 py-6 shadow-2xl transition-transform duration-300 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="text-xl font-bold text-blue-600">HealthConnect</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
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
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                          isActive(item.to)
                            ? 'bg-gray-50 text-blue-600'
                            : 'text-gray-900 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      to="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </div>
                  <div className="py-6">
                    <Link
                      to="/auth"
                      className="-mx-3 block px-3 py-1.5 text-sm font-semibold leading-7 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 flex items-center"
                    >
                      <UserIcon className="h-5 w-5 mr-2" />
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
