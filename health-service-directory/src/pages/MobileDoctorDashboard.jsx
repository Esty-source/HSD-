import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CalendarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  ChartBarIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  PlusIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import MobileLayout from '../components/responsive/MobileLayout';

export default function MobileDoctorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    try {
      // Get user data from localStorage - use 'user' key to match AuthContext
      const storedUserData = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      
      console.log('MobileDoctorDashboard - Retrieved user data:', storedUserData);
      console.log('MobileDoctorDashboard - Token exists:', !!token);

      if (!token || !storedUserData || !storedUserData.role) {
        console.log('MobileDoctorDashboard - Missing auth data, redirecting to auth');
        // Clear any existing data and redirect to auth
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/auth');
        return;
      }
      
      // Allow both 'doctor' role and any user to access doctor dashboard for now
      // This helps with debugging - we can tighten security later
      setUserData(storedUserData);
      console.log('MobileDoctorDashboard - User data set successfully:', storedUserData);
    } catch (error) {
      console.error('MobileDoctorDashboard - Error loading user data:', error);
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    console.log('MobileDoctorDashboard - Logging out');
    // Clear authentication data - use 'user' key to match AuthContext
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };
  
  // Mock data for doctor dashboard
  const mockData = {
    doctor: {
      name: 'Dr. Ngono Marie',
      specialty: 'Cardiologist',
      hospital: 'Central Hospital Yaoundé',
      patients: 42,
      appointments: {
        today: 8,
        upcoming: 15,
        total: 120
      },
      recentPatients: [
        { id: 1, name: 'John Doe', age: 45, condition: 'Hypertension', lastVisit: '2024-05-01' },
        { id: 2, name: 'Alice Smith', age: 32, condition: 'Diabetes', lastVisit: '2024-05-03' },
        { id: 3, name: 'Robert Johnson', age: 58, condition: 'Coronary Artery Disease', lastVisit: '2024-05-05' }
      ],
      todayAppointments: [
        { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'Follow-up', status: 'Confirmed' },
        { id: 2, patient: 'Mary Williams', time: '10:30 AM', type: 'New Patient', status: 'Confirmed' },
        { id: 3, patient: 'David Brown', time: '01:00 PM', type: 'Consultation', status: 'Confirmed' },
        { id: 4, patient: 'Sarah Johnson', time: '02:30 PM', type: 'Follow-up', status: 'Confirmed' }
      ],
      upcomingTelemedicine: [
        { id: 1, patient: 'Alice Smith', date: '2024-05-10', time: '11:00 AM', status: 'Scheduled' },
        { id: 2, patient: 'Robert Johnson', date: '2024-05-12', time: '03:00 PM', status: 'Scheduled' }
      ],
      pendingPrescriptions: [
        { id: 1, patient: 'John Doe', medication: 'Lisinopril 10mg', status: 'Pending' },
        { id: 2, patient: 'Alice Smith', medication: 'Metformin 500mg', status: 'Pending' }
      ]
    }
  };
  
  // Render the overview tab
  const renderOverview = () => (
    <div className="space-y-4">
      {/* Welcome card */}
      <div className="bg-blue-50 rounded-xl p-4">
        <h2 className="font-medium text-blue-800">Welcome back, {userData?.name || mockData.doctor.name}</h2>
        <p className="text-sm text-blue-600 mt-1">{userData?.specialty || mockData.doctor.specialty} • {userData?.hospital || mockData.doctor.hospital}</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3 shadow-sm text-center">
          <div className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
            <UserGroupIcon className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="text-lg font-semibold text-gray-900">{mockData.doctor.patients}</p>
          <p className="text-xs text-gray-500">Patients</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm text-center">
          <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
            <CalendarIcon className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-lg font-semibold text-gray-900">{mockData.doctor.appointments.today}</p>
          <p className="text-xs text-gray-500">Today</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm text-center">
          <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
            <VideoCameraIcon className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-lg font-semibold text-gray-900">{mockData.doctor.upcomingTelemedicine.length}</p>
          <p className="text-xs text-gray-500">Telemedicine</p>
        </div>
      </div>
      
      {/* Today's appointments */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">Today's Appointments</h3>
          <button 
            onClick={() => setActiveTab('appointments')}
            className="text-xs text-blue-600 flex items-center"
          >
            View all <ArrowRightIcon className="h-3 w-3 ml-1" />
          </button>
        </div>
        
        <div className="space-y-3">
          {mockData.doctor.todayAppointments.slice(0, 3).map((appointment) => (
            <div key={appointment.id} className="flex items-center p-2 border border-gray-100 rounded-lg">
              <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <UserIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{appointment.time}</span>
                  <span className="mx-1">•</span>
                  <span>{appointment.type}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                appointment.status === 'Confirmed' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {appointment.status}
              </span>
            </div>
          ))}
        </div>
        
        {mockData.doctor.todayAppointments.length > 3 && (
          <p className="text-xs text-center text-gray-500 mt-3">
            +{mockData.doctor.todayAppointments.length - 3} more appointments today
          </p>
        )}
      </div>
      
      {/* Recent patients */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">Recent Patients</h3>
          <button 
            onClick={() => setActiveTab('patients')}
            className="text-xs text-blue-600 flex items-center"
          >
            View all <ArrowRightIcon className="h-3 w-3 ml-1" />
          </button>
        </div>
        
        <div className="space-y-3">
          {mockData.doctor.recentPatients.map((patient) => (
            <div key={patient.id} className="flex items-center p-2 border border-gray-100 rounded-lg">
              <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <UserIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{patient.age} years</span>
                  <span className="mx-1">•</span>
                  <span>{patient.condition}</span>
                </div>
              </div>
              <Link to={`/patients/${patient.id}`} className="text-blue-600">
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
          <button className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-3 border border-blue-100">
            <CalendarIcon className="h-5 w-5 text-blue-600 mb-1" />
            <span className="text-xs text-blue-700">Schedule Appointment</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-green-50 rounded-lg p-3 border border-green-100">
            <DocumentTextIcon className="h-5 w-5 text-green-600 mb-1" />
            <span className="text-xs text-green-700">Write Prescription</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-purple-50 rounded-lg p-3 border border-purple-100">
            <VideoCameraIcon className="h-5 w-5 text-purple-600 mb-1" />
            <span className="text-xs text-purple-700">Start Telemedicine</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-orange-50 rounded-lg p-3 border border-orange-100">
            <ClipboardDocumentListIcon className="h-5 w-5 text-orange-600 mb-1" />
            <span className="text-xs text-orange-700">Add Medical Record</span>
          </button>
        </div>
      </div>
    </div>
  );
  
  // Render the appointments tab
  const renderAppointments = () => (
    <div className="space-y-4">
      {/* Today's appointments */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">Today's Appointments</h3>
        
        <div className="space-y-3">
          {mockData.doctor.todayAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center p-3 border border-gray-100 rounded-lg">
              <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <UserIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{appointment.time}</span>
                  <span className="mx-1">•</span>
                  <span>{appointment.type}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  appointment.status === 'Confirmed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {appointment.status}
                </span>
                <div className="flex mt-1">
                  <button className="text-xs text-blue-600 mr-2">Start</button>
                  <button className="text-xs text-gray-500">Reschedule</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Upcoming telemedicine */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">Upcoming Telemedicine</h3>
        
        <div className="space-y-3">
          {mockData.doctor.upcomingTelemedicine.map((appointment) => (
            <div key={appointment.id} className="flex items-center p-3 border border-gray-100 rounded-lg">
              <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <VideoCameraIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{appointment.date}</span>
                  <span className="mx-1">•</span>
                  <span>{appointment.time}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {mockData.doctor.upcomingTelemedicine.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-4">No upcoming telemedicine appointments</p>
        )}
        
        <button className="w-full mt-3 flex items-center justify-center text-sm text-blue-600 py-2 border border-blue-200 rounded-lg">
          <PlusIcon className="h-4 w-4 mr-1" />
          Schedule Telemedicine
        </button>
      </div>
      
      {/* Schedule new appointment */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <button className="w-full flex items-center justify-center text-sm text-white py-3 bg-blue-600 rounded-lg">
          <PlusIcon className="h-4 w-4 mr-1" />
          New Appointment
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
            className="w-full py-2 pl-9 pr-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <h3 className="font-medium text-gray-900 mb-3">Your Patients</h3>
        
        <div className="space-y-3">
          {mockData.doctor.recentPatients.map((patient) => (
            <div key={patient.id} className="flex items-center p-3 border border-gray-100 rounded-lg">
              <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <UserIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{patient.age} years</span>
                  <span className="mx-1">•</span>
                  <span>{patient.condition}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Last visit: {patient.lastVisit}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-1.5 bg-blue-100 rounded-full">
                  <DocumentTextIcon className="h-4 w-4 text-blue-600" />
                </button>
                <button className="p-1.5 bg-green-100 rounded-full">
                  <CalendarIcon className="h-4 w-4 text-green-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-3 flex items-center justify-center text-sm text-blue-600 py-2 border border-blue-200 rounded-lg">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add New Patient
        </button>
      </div>
    </div>
  );
  
  // Render the profile tab
  const renderProfile = () => (
    <div className="space-y-4">
      {/* Profile card */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold mb-3">
            {userData?.name.split(' ').map(n => n[0]).join('') || 'NM'}
          </div>
          <h3 className="text-lg font-medium text-gray-900">{userData?.name || mockData.doctor.name}</h3>
          <p className="text-sm text-gray-500">{userData?.specialty || mockData.doctor.specialty}</p>
          <p className="text-sm text-gray-500">{userData?.hospital || mockData.doctor.hospital}</p>
        </div>
      </div>
      
      {/* Contact information */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500">Phone</label>
            <p className="text-sm text-gray-900">+237 677-234-567</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Email</label>
            <p className="text-sm text-gray-900">dr.ngono@example.com</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Office Address</label>
            <p className="text-sm text-gray-900">Central Hospital Yaoundé, Floor 3, Office 302</p>
          </div>
        </div>
        <div className="p-4 flex justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>
      
      {/* Settings */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">Settings</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Notifications</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input type="checkbox" id="toggle" defaultChecked className="sr-only" />
              <label htmlFor="toggle" className="block h-6 rounded-full bg-blue-600 cursor-pointer"></label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Dark Mode</span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input type="checkbox" id="toggle2" className="sr-only" />
              <label htmlFor="toggle2" className="block h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>
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
  
  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'appointments':
        return renderAppointments();
      case 'patients':
        return renderPatients();
      case 'profile':
        return renderProfile();
      default:
        return renderOverview();
    }
  };
  
  return (
    <MobileLayout title="Doctor Dashboard">
      {/* Tab navigation */}
      <div className="px-4 py-2 bg-white border-b flex overflow-x-auto no-scrollbar">
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'appointments' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'patients' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
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
