import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CalendarIcon, 
  UserGroupIcon, 
  ClipboardDocumentListIcon, 
  UserCircleIcon, 
  ChartBarIcon, 
  VideoCameraIcon,
  DocumentTextIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import OverviewSection from '../../components/dashboard/doctor/OverviewSection';
import AppointmentsSection from '../../components/dashboard/doctor/AppointmentsSection';
import PatientsSection from '../../components/dashboard/doctor/PatientsSection';
import MedicalRecordsSection from '../../components/dashboard/doctor/MedicalRecordsSection';
import TelemedicineSection from '../../components/dashboard/doctor/TelemedicineSection';
import PrescriptionsSection from '../../components/dashboard/doctor/PrescriptionsSection';
import ProfileSection from '../../components/dashboard/doctor/ProfileSection';
import NotificationsSection from '../../components/dashboard/doctor/NotificationsSection';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
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

    // Set active tab from URL
    const pathParts = location.pathname.split('/');
    const tabFromUrl = pathParts[pathParts.length - 1];
    if (tabFromUrl && tabFromUrl !== 'doctor') {
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
    navigate(`/dashboard/doctor/${tab}`);
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
  ];

  if (!userData) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Welcome back, {userData.name}</p>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center px-6 py-4 text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}`} />
              {item.name}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-4 text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 mt-4"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3 text-gray-400" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {sidebarItems.find(item => item.id === activeTab)?.name}
            </h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleTabChange('notifications')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative"
              >
                <BellIcon className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">{userData.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'overview' && <OverviewSection onTabChange={handleTabChange} />}
          {activeTab === 'appointments' && <AppointmentsSection />}
          {activeTab === 'patients' && <PatientsSection />}
          {activeTab === 'records' && <MedicalRecordsSection />}
          {activeTab === 'telemedicine' && <TelemedicineSection />}
          {activeTab === 'prescriptions' && <PrescriptionsSection />}
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'notifications' && <NotificationsSection />}
        </div>
      </div>
    </div>
  );
} 