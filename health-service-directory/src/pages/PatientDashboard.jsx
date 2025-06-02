import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BellIcon, 
  CalendarIcon, 
  ClipboardIcon, 
  UserCircleIcon, 
  ChartBarIcon, 
  CreditCardIcon, 
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import AppointmentsSection from '../../components/dashboard/patient/AppointmentsSection';
import MedicalRecordsSection from '../../components/dashboard/patient/MedicalRecordsSection';
import ProfileSection from '../../components/dashboard/patient/ProfileSection';
import PaymentsSection from '../../components/dashboard/patient/PaymentsSection';
import NotificationsSection from '../../components/dashboard/patient/NotificationsSection';
import OverviewSection from '../../components/dashboard/patient/OverviewSection';
import SettingsSection from '../../components/dashboard/patient/SettingsSection';
import TelemedicineSection from '../../components/dashboard/patient/TelemedicineSection';
import TestComponent from '../../components/dashboard/patient2/TestComponent';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      // Get user data from localStorage - use 'user' key to match AuthContext
      const storedUserData = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      
      console.log('PatientDashboard - Retrieved user data:', storedUserData);
      console.log('PatientDashboard - Token exists:', !!token);

      if (!token || !storedUserData || !storedUserData.role) {
        console.log('PatientDashboard - Missing auth data, redirecting to auth');
        // Clear any existing data and redirect to auth
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/auth');
        return;
      }
      
      // Allow both 'patient' role and any user to access patient dashboard for now
      // This helps with debugging - we can tighten security later
      setUserData(storedUserData);
      console.log('PatientDashboard - User data set successfully:', storedUserData);
    } catch (error) {
      console.error('PatientDashboard - Error loading user data:', error);
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    console.log('PatientDashboard - Logging out');
    // Clear authentication data - use 'user' key to match AuthContext
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const sidebarItems = [
    { name: 'Overview', icon: ChartBarIcon, id: 'overview' },
    { name: 'Appointments', icon: CalendarIcon, id: 'appointments' },
    { name: 'Telemedicine', icon: VideoCameraIcon, id: 'telemedicine' },
    { name: 'Medical Records', icon: ClipboardIcon, id: 'records' },
    { name: 'Profile', icon: UserCircleIcon, id: 'profile' },
    { name: 'Notifications', icon: BellIcon, id: 'notifications', count: 3 },
    { name: 'Payments', icon: CreditCardIcon, id: 'payments' },
    { name: 'Settings', icon: Cog6ToothIcon, id: 'settings' },
  ];

  if (!userData) {
    return null; // or a loading spinner
  }

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
                {userData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{userData.name}</h3>
              <p className="text-xs text-gray-500">Patient ID: {userData.id || 'P-12345'}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              className={`w-full flex items-center px-4 py-2 rounded-lg text-left transition-colors duration-150 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(item.id)}
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
            <button>
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Section Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <TestComponent />
          {activeTab === 'overview' && <OverviewSection userData={userData} />}
          {activeTab === 'appointments' && <AppointmentsSection userData={userData} />}
          {activeTab === 'telemedicine' && <TelemedicineSection userData={userData} />}
          {activeTab === 'records' && <MedicalRecordsSection userData={userData} />}
          {activeTab === 'profile' && <ProfileSection userData={userData} />}
          {activeTab === 'notifications' && <NotificationsSection userData={userData} />}
          {activeTab === 'payments' && <PaymentsSection userData={userData} />}
          {activeTab === 'settings' && <SettingsSection userData={userData} />}
        </div>
      </div>
    </div>
  );
}