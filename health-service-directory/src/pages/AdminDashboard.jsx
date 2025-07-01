import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  UsersIcon, 
  UserGroupIcon, 
  ClipboardDocumentListIcon,
  BellIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import OverviewSection from '../components/dashboard/admin/OverviewSection';
import UsersSection from '../components/dashboard/admin/UsersSection';
import DoctorsSection from '../components/dashboard/admin/DoctorsSection';
import PatientsSection from '../components/dashboard/admin/PatientsSection';
import MedicalRecordsSection from '../components/dashboard/admin/MedicalRecordsSection';
import NotificationsSection from '../components/dashboard/admin/NotificationsSection';
import SecuritySection from '../components/dashboard/admin/SecuritySection';
import SettingsSection from '../components/dashboard/admin/SettingsSection';
import ProfileSection from '../components/dashboard/admin/ProfileSection';
import AppointmentsSection from '../components/dashboard/admin/AppointmentsSection';
import BillingSection from '../components/dashboard/admin/BillingSection';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [userData, setUserData] = useState({
    name: 'Admin User',
    email: 'admin@healthconnect.com',
    role: 'admin'
  });

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'appointments', name: 'Appointments', icon: CalendarIcon },
    { id: 'billing', name: 'Billing', icon: CurrencyDollarIcon },
    { id: 'users', name: 'Users', icon: UsersIcon },
    { id: 'doctors', name: 'Doctors', icon: UserGroupIcon },
    { id: 'patients', name: 'Patients', icon: UsersIcon },
    { id: 'medical-records', name: 'Medical Records', icon: ClipboardDocumentListIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'appointments':
        return <AppointmentsSection />;
      case 'billing':
        return <BillingSection />;
      case 'users':
        return <UsersSection />;
      case 'doctors':
        return <DoctorsSection />;
      case 'patients':
        return <PatientsSection />;
      case 'medical-records':
        return <MedicalRecordsSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'security':
        return <SecuritySection />;
      case 'settings':
        return <SettingsSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
            <span className="text-lg font-bold text-white">HC</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">HealthConnect</h2>
            <p className="text-xs text-gray-500">Admin Portal</p>
          </div>
        </div>
        
        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{userData.name}</h3>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-150 ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-700 font-semibold border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800 font-medium w-full px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {sidebarItems.find(item => item.id === activeSection)?.name || 'Dashboard'}
            </h1>
            <p className="text-sm text-gray-500">
              Manage your health service platform
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold">3</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
} 