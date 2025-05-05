import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  MagnifyingGlassIcon,
  HomeIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { ChartBarIcon as ChartBarIconSolid } from '@heroicons/react/24/solid';
import OverviewSection from '../../components/dashboard/admin/OverviewSection';
import UsersSection from '../../components/dashboard/admin/UsersSection';
import DoctorsSection from '../../components/dashboard/admin/DoctorsSection';
import PatientsSection from '../../components/dashboard/admin/PatientsSection';
import MedicalRecordsSection from '../../components/dashboard/admin/MedicalRecordsSection';
import SettingsSection from '../../components/dashboard/admin/SettingsSection';
import NotificationsSection from '../../components/dashboard/admin/NotificationsSection';
import AnalyticsSection from '../../components/dashboard/admin/AnalyticsSection';
import SecuritySection from '../../components/dashboard/admin/SecuritySection';
import ProfileSection from '../../components/dashboard/admin/ProfileSection';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(3);
  const [userData, setUserData] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    const token = localStorage.getItem('token');

    if (!token || !storedUserData || storedUserData.role !== 'admin') {
      // Clear any existing data and redirect to auth
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      navigate('/auth');
      return;
    }

    setUserData(storedUserData);

    // Set active tab from URL
    const pathParts = location.pathname.split('/');
    const tabFromUrl = pathParts[pathParts.length - 1];
    if (tabFromUrl && tabFromUrl !== 'admin') {
      setActiveTab(tabFromUrl);
    }
  }, [navigate, location]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/auth');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Don't navigate to a new URL, just update the state
    // This prevents the error when clicking on different sections
  };

  const sidebarItems = [
    { name: 'Overview', icon: ChartBarIcon, id: 'overview', badge: null },
    { name: 'Users', icon: UserGroupIcon, id: 'users', badge: '12' },
    { name: 'Doctors', icon: UserCircleIcon, id: 'doctors', badge: '2' },
    { name: 'Patients', icon: UserGroupIcon, id: 'patients', badge: null },
    { name: 'Medical Records', icon: ClipboardDocumentListIcon, id: 'records', badge: null },
    { name: 'Analytics', icon: ChartBarIconSolid, id: 'analytics', badge: 'New' },
    { name: 'Security', icon: ShieldCheckIcon, id: 'security', badge: null },
    { name: 'Settings', icon: Cog6ToothIcon, id: 'settings', badge: null },
    { name: 'Notifications', icon: BellIcon, id: 'notifications', badge: unreadCount > 0 ? unreadCount.toString() : null },
  ];

  if (!userData) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden w-screen max-w-[100vw]">
      {/* Sidebar */}
      {/* Sidebar - collapses to top bar on mobile */}
      <div className={`
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
        bg-white shadow-xl flex md:flex-col flex-row md:h-full h-16 md:overflow-hidden overflow-x-auto transition-all duration-300 ease-in-out z-30 border-r border-gray-200
        fixed md:static top-0 left-0 right-0 md:relative
        md:w-64 w-full
      `}>
        {/* Mobile menu button */}
        <button
          className="md:hidden absolute left-2 top-2 z-40 p-2 rounded-lg bg-indigo-600 text-white shadow"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div>
              <h2 className="text-xl font-bold text-white">Health Admin</h2>
              <p className="text-xs text-indigo-100 mt-1">Management Portal</p>
            </div>
          )}
          {sidebarCollapsed && <HomeIcon className="h-6 w-6 text-white mx-auto" />}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {sidebarCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>
        
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
                <span className="text-sm font-bold text-white">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                <p className="text-xs text-gray-500">System Administrator</p>
              </div>
            </div>
          </div>
        )}
        
        {sidebarCollapsed && (
          <div className="p-4 border-b border-gray-100 flex justify-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-white">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
        )}
        
        <nav className="mt-2 flex-1 overflow-y-auto">
          <div className="px-3 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'} ${activeTab === item.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full ${item.badge === 'New' ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : ''} px-3 py-3 text-left text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 mt-4 rounded-lg`}
            >
              <ArrowLeftOnRectangleIcon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'} text-red-400`} />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </nav>
        
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">Health Service Directory</div>
              <div className="text-xs font-medium text-indigo-600">v2.0</div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto md:ml-0 mt-16 md:mt-0 w-full pr-0 mr-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-2 md:p-4 shadow-sm sticky top-0 z-20">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                {sidebarItems.find(item => item.id === activeTab)?.name}
              </h1>
              <div className="hidden md:block h-6 w-px bg-gray-200 mx-4"></div>
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 border border-gray-200">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none focus:outline-none text-sm text-gray-700 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => handleTabChange('notifications')}
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 relative"
              >
                <BellIcon className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-3 border-l border-gray-200 pl-3">
                <div 
                  className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-all duration-200"
                  onClick={() => handleTabChange('profile')}
                  title="View Profile"
                >
                  <span className="text-sm font-bold text-white">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="hidden md:block cursor-pointer" onClick={() => handleTabChange('profile')}>
                  <span className="text-sm font-medium text-gray-900">{userData.name}</span>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-0 m-0 w-full overflow-hidden">
          {/* Breadcrumbs - hidden on overview page */}
          {activeTab !== 'overview' && (
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <HomeIcon className="h-4 w-4 mr-2" />
              <span className="mr-2">Dashboard</span>
              <span className="mx-2">/</span>
              <span className="font-medium text-indigo-600">{sidebarItems.find(item => item.id === activeTab)?.name}</span>
            </div>
          )}
          
          {activeTab === 'overview' ? (
            <div className="w-full m-0 p-0">
              <OverviewSection onTabChange={handleTabChange} />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {activeTab === 'users' && <UsersSection />}
              {activeTab === 'doctors' && <DoctorsSection />}
              {activeTab === 'patients' && <PatientsSection />}
              {activeTab === 'records' && <MedicalRecordsSection />}
              {activeTab === 'settings' && <SettingsSection />}
              {activeTab === 'notifications' && <NotificationsSection />}
              {activeTab === 'analytics' && <AnalyticsSection />}
              {activeTab === 'security' && <SecuritySection />}
              {activeTab === 'profile' && <ProfileSection />}
            </div>
          )}
          
          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>© 2025 Health Service Directory. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}