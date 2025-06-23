import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const DashboardNavbar = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white flex items-center justify-between py-4 pl-8 pr-8 border-l border-gray-200 lg:border-l-0">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Welcome back, John!</h2>
        <p className="text-sm text-gray-500">Here's what's happening with your health today</p>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-blue-600 hover:text-blue-800">
          <BellIcon className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircleIcon className="h-9 w-9 text-blue-700" />
          <span className="font-medium text-gray-700 hidden md:inline">John</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar; 