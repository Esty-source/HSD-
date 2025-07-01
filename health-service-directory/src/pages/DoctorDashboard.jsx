import React, { useState } from 'react';
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import OverviewSection from '../components/dashboard/doctor/OverviewSection';
import AppointmentsSection from '../components/dashboard/doctor/AppointmentsSection';
import PatientsSection from '../components/dashboard/doctor/PatientsSection';
import MedicalRecordsSection from '../components/dashboard/doctor/MedicalRecordsSection';
import PrescriptionsSection from '../components/dashboard/doctor/PrescriptionsSection';
import TelemedicineSection from '../components/dashboard/doctor/TelemedicineSection';
import NotificationsSection from '../components/dashboard/doctor/NotificationsSection';
import ProfileSection from '../components/dashboard/doctor/ProfileSection';
import SettingsSection from '../components/dashboard/doctor/SettingsSection';

export default function DoctorDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [userData] = useState({
    name: 'Dr. Jane Doe',
    email: 'dr.jane@example.com',
    role: 'doctor'
  });

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: HomeIcon },
    { id: 'appointments', name: 'Appointments', icon: CalendarIcon },
    { id: 'patients', name: 'Patients', icon: UserGroupIcon },
    { id: 'medical-records', name: 'Medical Records', icon: ClipboardDocumentListIcon },
    { id: 'prescriptions', name: 'Prescriptions', icon: DocumentTextIcon },
    { id: 'telemedicine', name: 'Telemedicine', icon: VideoCameraIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
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
        return <OverviewSection />;
      case 'appointments':
        return <AppointmentsSection />;
      case 'patients':
        return <PatientsSection />;
      case 'medical-records':
        return <MedicalRecordsSection />;
      case 'prescriptions':
        return <PrescriptionsSection />;
      case 'telemedicine':
        return <TelemedicineSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'profile':
        return <ProfileSection />;
      case 'settings':
        return <SettingsSection />;
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
            <span className="text-lg font-bold text-white">DR</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">HealthConnect</h2>
            <p className="text-xs text-gray-500">Doctor Portal</p>
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
              <p className="text-xs text-gray-500">Doctor</p>
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
              Welcome, {userData.name}
            </p>
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