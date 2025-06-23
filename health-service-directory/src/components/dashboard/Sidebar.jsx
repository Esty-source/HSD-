import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  UserCircleIcon,
  BuildingStorefrontIcon,
  BookOpenIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navLinks = [
  { name: 'Dashboard', to: '/dashboard', icon: HomeIcon },
  { name: 'Appointments', to: '/appointments', icon: CalendarIcon },
  { name: 'Doctors', to: '/doctors', icon: UserGroupIcon },
  { name: 'Profile', to: '/profile', icon: UserCircleIcon },
  { name: 'Pharmacies', to: '/pharmacies', icon: BuildingStorefrontIcon },
  { name: 'Resources', to: '/resources', icon: BookOpenIcon },
];

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Bars3Icon className="h-6 w-6 text-blue-700" />
      </button>
      {/* Overlay for mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpen(false)}></div>
      )}
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-50 flex flex-col transition-transform duration-200 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} lg:static lg:shadow-none lg:flex`}
      >
        {/* Close button on mobile */}
        <div className="flex items-center justify-between px-6 py-4 lg:hidden">
          <span className="font-bold text-xl text-blue-700">HealthConnect</span>
          <button onClick={() => setOpen(false)} aria-label="Close sidebar">
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        {/* Logo/Brand */}
        <div className="hidden lg:flex items-center px-6 py-6">
          <span className="font-bold text-2xl text-blue-700">HealthConnect</span>
        </div>
        {/* Navigation */}
        <nav className="flex-1 py-6 px-2 space-y-1">
          {navLinks.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.name}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors duration-150 ${
                  active ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
                onClick={() => setOpen(false)}
              >
                <link.icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        {/* Logout */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button className="flex items-center gap-3 text-red-600 font-medium hover:text-red-800 w-full">
            <ArrowLeftOnRectangleIcon className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 