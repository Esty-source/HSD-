import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  BellIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

export default function Header({ onNotificationsClick, unreadCount }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, you'd toggle dark mode classes on the root html element
    // or use a theme context to manage dark/light themes
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real implementation, you'd perform the search here
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left - Search */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full p-2.5 pl-10 text-sm text-gray-900 bg-gray-50 dark:bg-slate-700/50 dark:text-white rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Search doctors, patients, records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={onNotificationsClick}
            className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors relative"
          >
            <BellIcon className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Quick info */}
          <div className="hidden md:flex text-right">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">June 30, 2025</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Updated 10 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
