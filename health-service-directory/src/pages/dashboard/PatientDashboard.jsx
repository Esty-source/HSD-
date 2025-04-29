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

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    const token = localStorage.getItem('token');

    if (!token || !storedUserData || storedUserData.role !== 'patient') {
      // Clear any existing data and redirect to auth
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      navigate('/auth');
      return;
    }

    setUserData(storedUserData);
  }, [navigate]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
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
    <div className="flex h-screen bg-gray-50">
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
        
        <nav className="mt-6 flex-1 overflow-y-auto px-3">
          <div className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</div>
          {sidebarItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 mb-1 rounded-xl text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}`} />
              <span>{item.name}</span>
              {item.count && (
                <span className="ml-auto bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
          
          <div className="my-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Other</div>
          {sidebarItems.slice(4).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 mb-1 rounded-xl text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}`} />
              <span>{item.name}</span>
              {item.count && (
                <span className="ml-auto bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {sidebarItems.find(item => item.id === activeTab)?.name}
              </h1>
              <div className="ml-6 relative max-w-xs hidden md:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setActiveTab('notifications')}
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Notifications"
                title="View Notifications"
              >
                <BellIconSolid className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">3</span>
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Settings"
                title="View Settings"
              >
                <Cog6ToothIcon className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-sm hover:shadow-md transition-all duration-200"
                  aria-label="Profile"
                  title="View Profile"
                >
                  <span className="text-sm font-medium">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <HomeIcon className="h-4 w-4 mr-1" />
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">
              {sidebarItems.find(item => item.id === activeTab)?.name}
            </span>
          </div>
          
          {activeTab === 'overview' && <OverviewSection setActiveTab={setActiveTab} />}
          {activeTab === 'appointments' && <AppointmentsSection />}
          {activeTab === 'telemedicine' && <TelemedicineSection />}
          {activeTab === 'records' && <MedicalRecordsSection />}
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'notifications' && <NotificationsSection />}
          {activeTab === 'payments' && <PaymentsSection />}
          {activeTab === 'settings' && <SettingsSection />}
        </div>
      </div>
    </div>
  );
}