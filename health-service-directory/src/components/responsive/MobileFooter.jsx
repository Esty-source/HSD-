import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, LifebuoyIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function MobileFooter() {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-4 border-t border-blue-100 shadow-inner">
      <div className="flex flex-col items-center space-y-2">
        {/* Logo and App Name */}
        <Link to="/" className="flex items-center space-x-2 mb-1">
          <span className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Health</span>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">Connect</span>
        </Link>
        {/* Quick Links */}
        <nav className="flex justify-center space-x-6 mb-1">
          <Link to="/" className="flex flex-col items-center text-xs hover:text-blue-200 transition">
            <HomeIcon className="h-5 w-5 mb-0.5" />
            Home
          </Link>
          <Link to="/doctors" className="flex flex-col items-center text-xs hover:text-blue-200 transition">
            <UserGroupIcon className="h-5 w-5 mb-0.5" />
            Doctors
          </Link>
          <Link to="/support" className="flex flex-col items-center text-xs hover:text-blue-200 transition">
            <LifebuoyIcon className="h-5 w-5 mb-0.5" />
            Support
          </Link>
          <Link to="/about" className="flex flex-col items-center text-xs hover:text-blue-200 transition">
            <InformationCircleIcon className="h-5 w-5 mb-0.5" />
            About
          </Link>
        </nav>
        {/* Copyright */}
        <div className="text-xs text-blue-100 mt-1">&copy; {new Date().getFullYear()} HealthConnect. All rights reserved.</div>
      </div>
    </footer>
  );
} 