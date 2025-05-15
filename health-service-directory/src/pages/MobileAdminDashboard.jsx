import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserGroupIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  PlusIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import MobileLayout from '../components/responsive/MobileLayout';
import UsersSection from '../components/dashboard/admin/UsersSection';
import MedicalRecordsSection from '../components/dashboard/admin/MedicalRecordsSection';
import AnalyticsSection from '../components/dashboard/admin/AnalyticsSection';
import SecuritySection from '../components/dashboard/admin/SecuritySection';
import NotificationsSection from '../components/dashboard/admin/NotificationsSection';

export default function MobileAdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    try {
      // Get user data from localStorage
      const storedUserData = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      
      console.log('MobileAdminDashboard - Retrieved user data:', storedUserData);

      if (!token || !storedUserData) {
        console.log('MobileAdminDashboard - Missing auth data, redirecting to admin-access');
        navigate('/admin-access');
        return;
      }
      
      // Ensure the user has the admin role
      if (!storedUserData.role || storedUserData.role !== 'admin') {
        console.log('MobileAdminDashboard - User is not an admin, forcing admin role');
        storedUserData.role = 'admin';
        localStorage.setItem('user', JSON.stringify(storedUserData));
      }
      
      setUserData(storedUserData);
    } catch (error) {
      console.error('MobileAdminDashboard - Error loading user data:', error);
      navigate('/admin-access');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };
  
  // Mock data for admin dashboard
  const mockData = {
    stats: {
      totalUsers: 1248,
      totalDoctors: 87,
      totalPatients: 1142,
      newUsers: 24,
      activeUsers: 756
    },
    recentDoctors: [
      { id: 1, name: 'Dr. Ngono Marie', specialty: 'Cardiologist', status: 'Active', joinDate: '2024-01-15' },
      { id: 2, name: 'Dr. Fon Peter', specialty: 'Pediatrician', status: 'Active', joinDate: '2024-02-10' },
      { id: 3, name: 'Dr. Biya Rose', specialty: 'Neurologist', status: 'Pending', joinDate: '2024-05-01' }
    ],
    recentPatients: [
      { id: 1, name: 'John Doe', age: 45, joinDate: '2024-04-15' },
      { id: 2, name: 'Alice Smith', age: 32, joinDate: '2024-04-18' },
      { id: 3, name: 'Robert Johnson', age: 58, joinDate: '2024-04-20' }
    ],
    notifications: [
      { id: 1, title: 'New Doctor Registration', message: 'Dr. Biya Rose has registered and is pending approval', time: '2 hours ago', read: false },
      { id: 2, title: 'System Update', message: 'The system will undergo maintenance tonight at 2 AM', time: '1 day ago', read: true }
    ]
  };
  
  // Render the overview tab
  const renderOverview = () => (
    <div className="space-y-4">
      {/* Welcome card */}
      <div className="bg-indigo-50 rounded-xl p-4">
        <h2 className="font-medium text-indigo-800">Welcome, {userData?.name || 'Admin'}</h2>
        <p className="text-sm text-indigo-600 mt-1">Health Service Directory Administrator</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
              <UserGroupIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{mockData.stats.totalUsers}</p>
              <p className="text-xs text-gray-500">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
              <UserCircleIcon className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{mockData.stats.totalDoctors}</p>
              <p className="text-xs text-gray-500">Doctors</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
              <UserGroupIcon className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{mockData.stats.totalPatients}</p>
              <p className="text-xs text-gray-500">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
              <ChartBarIcon className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{mockData.stats.activeUsers}</p>
              <p className="text-xs text-gray-500">Active Users</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent doctors */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">Recent Doctors</h3>
          <button 
            onClick={() => setActiveTab('doctors')}
            className="text-xs text-indigo-600 flex items-center"
          >
            View all <ArrowRightIcon className="h-3 w-3 ml-1" />
          </button>
        </div>
        
        <div className="space-y-3">
          {mockData.recentDoctors.map((doctor) => (
            <div key={doctor.id} className="flex items-center p-2 border border-gray-100 rounded-lg">
              <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <UserCircleIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{doctor.specialty}</span>
                  <span className="mx-1">•</span>
                  <span>Joined {doctor.joinDate}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                doctor.status === 'Active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {doctor.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent patients */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">Recent Patients</h3>
          <button 
            onClick={() => setActiveTab('patients')}
            className="text-xs text-indigo-600 flex items-center"
          >
            View all <ArrowRightIcon className="h-3 w-3 ml-1" />
          </button>
        </div>
        
        <div className="space-y-3">
          {mockData.recentPatients.map((patient) => (
            <div key={patient.id} className="flex items-center p-2 border border-gray-100 rounded-lg">
              <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <UserGroupIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{patient.age} years</span>
                  <span className="mx-1">•</span>
                  <span>Joined {patient.joinDate}</span>
                </div>
              </div>
              <Link to={`/admin/patients/${patient.id}`} className="text-indigo-600">
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center justify-center bg-indigo-50 rounded-lg p-3 border border-indigo-100">
            <UserCircleIcon className="h-5 w-5 text-indigo-600 mb-1" />
            <span className="text-xs text-indigo-700">Add Doctor</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-3 border border-blue-100">
            <UserGroupIcon className="h-5 w-5 text-blue-600 mb-1" />
            <span className="text-xs text-blue-700">Add Patient</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-green-50 rounded-lg p-3 border border-green-100">
            <DocumentTextIcon className="h-5 w-5 text-green-600 mb-1" />
            <span className="text-xs text-green-700">System Reports</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-red-50 rounded-lg p-3 border border-red-100">
            <ShieldCheckIcon className="h-5 w-5 text-red-600 mb-1" />
            <span className="text-xs text-red-700">Security Audit</span>
          </button>
        </div>
      </div>
    </div>
  );
  
  // Render the doctors tab
  const renderDoctors = () => (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full py-2 pl-9 pr-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex overflow-x-auto no-scrollbar space-x-2 px-4 py-2">
        <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs whitespace-nowrap">
          All Doctors
        </button>
        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs whitespace-nowrap">
          Active
        </button>
        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs whitespace-nowrap">
          Pending
        </button>
        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs whitespace-nowrap">
          Suspended
        </button>
      </div>
      
      {/* Doctor list */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">All Doctors</h3>
        
        <div className="space-y-3">
          {mockData.recentDoctors.concat(mockData.recentDoctors).map((doctor, index) => (
            <div key={`${doctor.id}-${index}`} className="flex items-center p-3 border border-gray-100 rounded-lg">
              <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <UserCircleIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{doctor.specialty}</span>
                  <span className="mx-1">•</span>
                  <span>Joined {doctor.joinDate}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  doctor.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {doctor.status}
                </span>
                <div className="flex mt-1">
                  <button className="text-xs text-indigo-600 mr-2">Edit</button>
                  <button className="text-xs text-gray-500">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-3 flex items-center justify-center text-sm text-indigo-600 py-2 border border-indigo-200 rounded-lg">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add New Doctor
        </button>
      </div>
    </div>
  );
  
  // Render the patients tab
  const renderPatients = () => (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full py-2 pl-9 pr-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Patient list */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">All Patients</h3>
        
        <div className="space-y-3">
          {mockData.recentPatients.concat(mockData.recentPatients).map((patient, index) => (
            <div key={`${patient.id}-${index}`} className="flex items-center p-3 border border-gray-100 rounded-lg">
              <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <UserGroupIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{patient.age} years</span>
                  <span className="mx-1">•</span>
                  <span>Joined {patient.joinDate}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-1.5 bg-indigo-100 rounded-full">
                  <DocumentTextIcon className="h-4 w-4 text-indigo-600" />
                </button>
                <button className="p-1.5 bg-blue-100 rounded-full">
                  <UserCircleIcon className="h-4 w-4 text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  // Render the settings tab
  const renderSettings = () => (
    <div className="space-y-4">
      {/* Profile card */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold mb-3">
            {userData?.name.split(' ').map(n => n[0]).join('') || 'A'}
          </div>
          <h3 className="text-lg font-medium text-gray-900">{userData?.name || 'Admin User'}</h3>
          <p className="text-sm text-gray-500">Administrator</p>
        </div>
      </div>
      
      {/* System settings */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">System Settings</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Maintenance Mode</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input type="checkbox" id="toggle" className="sr-only" />
              <label htmlFor="toggle" className="block h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Allow New Registrations</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input type="checkbox" id="toggle2" defaultChecked className="sr-only" />
              <label htmlFor="toggle2" className="block h-6 rounded-full bg-indigo-600 cursor-pointer"></label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Email Notifications</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input type="checkbox" id="toggle3" defaultChecked className="sr-only" />
              <label htmlFor="toggle3" className="block h-6 rounded-full bg-indigo-600 cursor-pointer"></label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Security settings */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">Security</h3>
        <div className="space-y-3">
          <button className="w-full text-left text-sm text-gray-700 py-2 px-3 bg-gray-50 rounded-lg flex justify-between items-center">
            <span>Change Password</span>
            <ArrowRightIcon className="h-4 w-4 text-gray-400" />
          </button>
          <button className="w-full text-left text-sm text-gray-700 py-2 px-3 bg-gray-50 rounded-lg flex justify-between items-center">
            <span>Two-Factor Authentication</span>
            <ArrowRightIcon className="h-4 w-4 text-gray-400" />
          </button>
          <button className="w-full text-left text-sm text-gray-700 py-2 px-3 bg-gray-50 rounded-lg flex justify-between items-center">
            <span>Activity Log</span>
            <ArrowRightIcon className="h-4 w-4 text-gray-400" />
          </button>
          <button 
            onClick={handleLogout}
            className="w-full mt-2 text-sm text-red-600 py-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
  
  // Add render functions for missing sections
  const renderUsers = () => (
    <UsersSection />
  );

  const renderMedicalRecords = () => (
    <MedicalRecordsSection />
  );

  const renderAnalytics = () => (
    <AnalyticsSection />
  );

  const renderSecurity = () => (
    <SecuritySection />
  );

  const renderNotifications = () => (
    <NotificationsSection />
  );
  
  // Update renderContent to include new tabs
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'users':
        return renderUsers();
      case 'doctors':
        return renderDoctors();
      case 'patients':
        return renderPatients();
      case 'records':
        return renderMedicalRecords();
      case 'analytics':
        return renderAnalytics();
      case 'security':
        return renderSecurity();
      case 'settings':
        return renderSettings();
      case 'notifications':
        return renderNotifications();
      default:
        return renderOverview();
    }
  };
  
  return (
    <MobileLayout title="Admin Dashboard">
      {/* Tab navigation */}
      <div className="px-4 py-2 bg-white border-b flex overflow-x-auto no-scrollbar">
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'users' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'doctors' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('doctors')}
        >
          Doctors
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'patients' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'records' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('records')}
        >
          Medical Records
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'analytics' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'security' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'notifications' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'settings' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>
      
      {/* Main content */}
      <div className="p-4 pb-20">
        {renderContent()}
      </div>
      
      {/* Add styles for no scrollbar */}
      <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </MobileLayout>
  );
}
