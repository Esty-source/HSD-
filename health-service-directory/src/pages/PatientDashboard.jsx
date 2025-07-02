import React, { useState } from 'react';
import {
  HomeIcon,
  CalendarIcon,
  ClipboardIcon,
  UserCircleIcon,
  CreditCardIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  BellIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import OverviewSection from '../components/dashboard/patient/OverviewSection';
import AppointmentsSection from '../components/dashboard/patient/AppointmentsSection';
import TelemedicineSection from '../components/dashboard/patient/TelemedicineSection';
import MedicalRecordsSection from '../components/dashboard/patient/MedicalRecordsSection';
import ProfileSection from '../components/dashboard/patient/ProfileSection';
import NotificationsSection from '../components/dashboard/patient/NotificationsSection';
import PaymentsSection from '../components/dashboard/patient/PaymentsSection';
import SettingsSection from '../components/dashboard/patient/SettingsSection';
import { useAuth } from '../context/AuthContext';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: HomeIcon },
    { id: 'appointments', name: 'Appointments', icon: CalendarIcon },
    { id: 'telemedicine', name: 'Telemedicine', icon: VideoCameraIcon },
    { id: 'records', name: 'Medical Records', icon: ClipboardIcon },
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon, count: 3 },
    { id: 'payments', name: 'Payments', icon: CreditCardIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection userData={user} />;
      case 'appointments':
        return <AppointmentsSection userData={user} />;
      case 'telemedicine':
        return <TelemedicineSection userData={user} />;
      case 'records':
        return <MedicalRecordsSection userData={user} />;
      case 'profile':
        return <ProfileSection userData={user} />;
      case 'notifications':
        return <NotificationsSection userData={user} />;
      case 'payments':
        return <PaymentsSection userData={user} />;
      case 'settings':
        return <SettingsSection userData={user} />;
      default:
        return <OverviewSection userData={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden w-screen max-w-[100vw]">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
            <span className="text-lg font-bold text-white">HC</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">HealthConnect</h2>
            <p className="text-xs text-gray-500">Patient Portal</p>
          </div>
        </div>
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('') : ''}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{user?.name || ''}</h3>
              <p className="text-xs text-gray-500">Patient ID: {user?.patientId || user?.id || ''}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center px-4 py-2 rounded-lg text-left transition-colors duration-150 ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
              {item.count && (
                <span className="ml-auto bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-semibold">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800 font-medium"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white shadow-sm">
          <div className="flex items-center space-x-3">
            <HomeIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Patient Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <BellIconSolid className="h-6 w-6 text-blue-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold">3</span>
            </button>
          </div>
        </div>
        {/* Section Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {renderSection()}
        </div>
      </div>
    </div>
  );
} 