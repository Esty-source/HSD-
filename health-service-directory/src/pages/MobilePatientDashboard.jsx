import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  HeartIcon,
  ChartBarIcon,
  UserIcon,
  DocumentTextIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import MobileLayout from '../components/responsive/MobileLayout';

export default function MobilePatientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock patient data
  const patientData = {
    name: 'John Doe',
    age: 35,
    bloodType: 'O+',
    nextAppointment: {
      doctor: 'Dr. Ngono Marie',
      specialty: 'Cardiologist',
      date: '2024-05-15',
      time: '09:00 AM',
    },
    upcomingMedications: [
      { name: 'Lisinopril', dosage: '10mg', schedule: 'Once daily', remaining: 7 },
      { name: 'Metformin', dosage: '500mg', schedule: 'Twice daily', remaining: 14 },
    ],
    recentVitals: {
      bloodPressure: '120/80 mmHg',
      heartRate: '72 bpm',
      temperature: '36.5°C',
      bloodSugar: '5.5 mmol/L',
      lastUpdated: '2024-05-01',
    },
    notifications: [
      { id: 1, title: 'Appointment Reminder', message: 'Your appointment with Dr. Ngono is tomorrow at 9:00 AM', time: '1 day ago', read: false },
      { id: 2, title: 'Medication Refill', message: 'Your Lisinopril prescription needs to be refilled', time: '2 days ago', read: true },
    ]
  };
  
  // Render the overview tab
  const renderOverview = () => (
    <div className="space-y-4">
      {/* Welcome card */}
      <div className="bg-blue-50 rounded-xl p-4">
        <h2 className="font-medium text-blue-800">Welcome back, {patientData.name}</h2>
        <p className="text-sm text-blue-600 mt-1">Here's your health summary</p>
      </div>
      
      {/* Next appointment */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">Next Appointment</h3>
          <Link to="/appointments" className="text-xs text-blue-600 flex items-center">
            View all <ArrowRightIcon className="h-3 w-3 ml-1" />
          </Link>
        </div>
        
        {patientData.nextAppointment ? (
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-lg p-2 mr-3">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{patientData.nextAppointment.doctor}</p>
              <p className="text-xs text-gray-500">{patientData.nextAppointment.specialty}</p>
              <div className="flex items-center mt-1 text-xs text-gray-700">
                <CalendarIcon className="h-3 w-3 mr-1" />
                <span>{patientData.nextAppointment.date}</span>
                <ClockIcon className="h-3 w-3 ml-2 mr-1" />
                <span>{patientData.nextAppointment.time}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-3">
            <p className="text-sm text-gray-500">No upcoming appointments</p>
            <Link 
              to="/doctor-search"
              className="mt-2 inline-flex items-center text-xs font-medium text-blue-600"
            >
              Schedule an appointment <PlusIcon className="ml-1 h-3 w-3" />
            </Link>
          </div>
        )}
      </div>
      
      {/* Medications */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">Medications</h3>
          <Link to="/medications" className="text-xs text-blue-600 flex items-center">
            View all <ArrowRightIcon className="h-3 w-3 ml-1" />
          </Link>
        </div>
        
        {patientData.upcomingMedications.length > 0 ? (
          <div className="space-y-3">
            {patientData.upcomingMedications.map((med, index) => (
              <div key={index} className="flex items-start">
                <div className={`bg-${med.remaining <= 7 ? 'orange' : 'green'}-100 rounded-lg p-2 mr-3`}>
                  <HeartIcon className={`h-5 w-5 text-${med.remaining <= 7 ? 'orange' : 'green'}-600`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-900">{med.name}</p>
                    <span className="text-xs text-gray-500">{med.remaining} days left</span>
                  </div>
                  <p className="text-xs text-gray-500">{med.dosage} • {med.schedule}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-3">No current medications</p>
        )}
      </div>
      
      {/* Recent vitals */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-900">Recent Vitals</h3>
          <Link to="/health-records" className="text-xs text-blue-600 flex items-center">
            View all <ArrowRightIcon className="h-3 w-3 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-2 rounded-lg">
            <p className="text-xs text-gray-500">Blood Pressure</p>
            <p className="font-medium text-gray-900">{patientData.recentVitals.bloodPressure}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <p className="text-xs text-gray-500">Heart Rate</p>
            <p className="font-medium text-gray-900">{patientData.recentVitals.heartRate}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <p className="text-xs text-gray-500">Temperature</p>
            <p className="font-medium text-gray-900">{patientData.recentVitals.temperature}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <p className="text-xs text-gray-500">Blood Sugar</p>
            <p className="font-medium text-gray-900">{patientData.recentVitals.bloodSugar}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Last updated: {patientData.recentVitals.lastUpdated}
        </p>
      </div>
      
      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/telemedicine" className="bg-white rounded-xl p-4 shadow-sm text-center">
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600 mx-auto" />
          <p className="mt-1 text-sm font-medium text-gray-900">Telemedicine</p>
        </Link>
        <Link to="/health-records" className="bg-white rounded-xl p-4 shadow-sm text-center">
          <DocumentTextIcon className="h-6 w-6 text-blue-600 mx-auto" />
          <p className="mt-1 text-sm font-medium text-gray-900">Health Records</p>
        </Link>
      </div>
    </div>
  );
  
  // Render the appointments tab
  const renderAppointments = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">Upcoming Appointments</h3>
        
        {patientData.nextAppointment ? (
          <div className="border-l-4 border-blue-500 pl-3 py-2">
            <p className="font-medium text-gray-900">{patientData.nextAppointment.doctor}</p>
            <p className="text-xs text-gray-500">{patientData.nextAppointment.specialty}</p>
            <div className="flex items-center mt-1 text-xs text-gray-700">
              <CalendarIcon className="h-3 w-3 mr-1" />
              <span>{patientData.nextAppointment.date}</span>
              <ClockIcon className="h-3 w-3 ml-2 mr-1" />
              <span>{patientData.nextAppointment.time}</span>
            </div>
            <div className="mt-2 flex space-x-2">
              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-full">
                Reschedule
              </button>
              <button className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded-full">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-3">No upcoming appointments</p>
        )}
        
        <div className="mt-4 flex justify-center">
          <Link 
            to="/doctor-search"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Book New Appointment
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">Past Appointments</h3>
        <div className="border-l-4 border-gray-300 pl-3 py-2">
          <p className="font-medium text-gray-900">Dr. Fon Peter</p>
          <p className="text-xs text-gray-500">Pediatrician</p>
          <div className="flex items-center mt-1 text-xs text-gray-700">
            <CalendarIcon className="h-3 w-3 mr-1" />
            <span>2024-05-01</span>
            <ClockIcon className="h-3 w-3 ml-2 mr-1" />
            <span>14:30 PM</span>
          </div>
          <div className="mt-2">
            <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
              View Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render the health records tab
  const renderHealthRecords = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">Vital Statistics</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Blood Type</span>
            <span className="font-medium text-gray-900">{patientData.bloodType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Blood Pressure</span>
            <span className="font-medium text-gray-900">{patientData.recentVitals.bloodPressure}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Heart Rate</span>
            <span className="font-medium text-gray-900">{patientData.recentVitals.heartRate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Temperature</span>
            <span className="font-medium text-gray-900">{patientData.recentVitals.temperature}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Blood Sugar</span>
            <span className="font-medium text-gray-900">{patientData.recentVitals.bloodSugar}</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">
          Last updated: {patientData.recentVitals.lastUpdated}
        </p>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-3">Medical Records</h3>
        <div className="space-y-3">
          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
            <DocumentTextIcon className="h-5 w-5 text-blue-600 mr-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Annual Checkup Report</p>
              <p className="text-xs text-gray-500">2024-04-15</p>
            </div>
            <button className="text-xs text-blue-600">View</button>
          </div>
          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
            <DocumentTextIcon className="h-5 w-5 text-blue-600 mr-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Blood Test Results</p>
              <p className="text-xs text-gray-500">2024-04-10</p>
            </div>
            <button className="text-xs text-blue-600">View</button>
          </div>
          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
            <DocumentTextIcon className="h-5 w-5 text-blue-600 mr-2" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Vaccination Record</p>
              <p className="text-xs text-gray-500">2024-03-22</p>
            </div>
            <button className="text-xs text-blue-600">View</button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render the profile tab
  const renderProfile = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <UserIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{patientData.name}</h3>
            <p className="text-sm text-gray-500">Patient ID: 12345678</p>
            <p className="text-sm text-gray-500">Age: {patientData.age}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <h3 className="font-medium text-gray-900">Personal Information</h3>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-xs text-gray-500">Full Name</label>
            <p className="text-sm text-gray-900">John Doe</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Date of Birth</label>
            <p className="text-sm text-gray-900">1989-05-15</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Gender</label>
            <p className="text-sm text-gray-900">Male</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Phone Number</label>
            <p className="text-sm text-gray-900">+237 677-234-567</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Email</label>
            <p className="text-sm text-gray-900">john.doe@example.com</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Address</label>
            <p className="text-sm text-gray-900">123 Main Street, Yaoundé, Cameroon</p>
          </div>
        </div>
        <div className="p-4 flex justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>
      
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
          <button className="w-full mt-2 text-sm text-red-600 py-2">
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
      case 'health-records':
        return renderHealthRecords();
      case 'profile':
        return renderProfile();
      default:
        return renderOverview();
    }
  };
  
  return (
    <MobileLayout title="Patient Dashboard">
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
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'health-records' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('health-records')}
        >
          Health Records
        </button>
        <button
          className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>
      
      {/* Main content */}
      <div className="p-4">
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
