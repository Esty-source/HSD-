import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { 
  CalendarIcon, 
  UserGroupIcon, 
  ClipboardDocumentListIcon, 
  UserCircleIcon, 
  ChartBarIcon, 
  VideoCameraIcon,
  DocumentTextIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import OverviewSection from '../../components/dashboard/doctor/OverviewSection';
import AppointmentsSection from '../../components/dashboard/doctor/AppointmentsSection';
import PatientsSection from '../../components/dashboard/doctor/PatientsSection';
import MedicalRecordsSection from '../../components/dashboard/doctor/MedicalRecordsSection';
import TelemedicineSection from '../../components/dashboard/doctor/TelemedicineSection';
import PrescriptionsSection from '../../components/dashboard/doctor/PrescriptionsSection';
import ProfileSection from '../../components/dashboard/doctor/ProfileSection';
import NotificationsSection from '../../components/dashboard/doctor/NotificationsSection';
import SettingsSection from '../../components/dashboard/doctor/SettingsSection';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    const token = localStorage.getItem('token');

    if (!token || !storedUserData || storedUserData.role !== 'doctor') {
      // Clear any existing data and redirect to auth
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      navigate('/auth');
      return;
    }

    setUserData(storedUserData);

    // Set active tab from URL search params
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [navigate, location, searchParams]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/auth');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/dashboard/doctor?tab=${tab}`);
  };

  const sidebarItems = [
    { name: 'Overview', icon: ChartBarIcon, id: 'overview' },
    { name: 'Appointments', icon: CalendarIcon, id: 'appointments' },
    { name: 'Patients', icon: UserGroupIcon, id: 'patients' },
    { name: 'Medical Records', icon: ClipboardDocumentListIcon, id: 'records' },
    { name: 'Telemedicine', icon: VideoCameraIcon, id: 'telemedicine' },
    { name: 'Prescriptions', icon: DocumentTextIcon, id: 'prescriptions' },
    { name: 'Profile', icon: UserCircleIcon, id: 'profile' },
    { name: 'Notifications', icon: BellIcon, id: 'notifications' },
    { name: 'Settings', icon: Cog6ToothIcon, id: 'settings' },
  ];

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
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
            <p className="text-xs text-gray-500">Doctor Portal</p>
          </div>
        </div>
        
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-sm font-medium text-indigo-600">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{userData.name}</h3>
              <p className="text-xs text-gray-500">Doctor ID: {userData.id || 'D-12345'}</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-6 flex-1 overflow-y-auto px-3">
          <div className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</div>
          {sidebarItems.slice(0, 6).map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center px-4 py-3 mb-1 rounded-xl text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${activeTab === item.id ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span>{item.name}</span>
              {item.id === 'notifications' && unreadCount > 0 && (
                <span className="ml-auto bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
          
          <div className="mt-6 mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</div>
          {sidebarItems.slice(6).map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center px-4 py-3 mb-1 rounded-xl text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${activeTab === item.id ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span>{item.name}</span>
              {item.id === 'notifications' && unreadCount > 0 && (
                <span className="ml-auto bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                  {unreadCount}
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleTabChange('notifications')}
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <BellIconSolid className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">{unreadCount || 0}</span>
              </button>
              <button 
                onClick={() => handleTabChange('settings')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Cog6ToothIcon className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
                <button
                  onClick={() => handleTabChange('profile')}
                  className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm hover:shadow-md transition-shadow duration-200"
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
        <div className="p-6 w-full max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <HomeIcon className="h-4 w-4 mr-1" />
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">
              {sidebarItems.find(item => item.id === activeTab)?.name}
            </span>
          </div>
          
          {activeTab === 'overview' && <OverviewSection onTabChange={handleTabChange} />}
          {activeTab === 'appointments' && <AppointmentsSection />}
          {activeTab === 'patients' && <PatientsSection />}
          {activeTab === 'records' && <MedicalRecordsSection />}
          {activeTab === 'telemedicine' && <TelemedicineSection />}
          {activeTab === 'prescriptions' && <PrescriptionsSection />}
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'notifications' && <NotificationsSection />}
          {activeTab === 'settings' && <SettingsSection />}
        </div>
      </div>
    </div>
  );
}