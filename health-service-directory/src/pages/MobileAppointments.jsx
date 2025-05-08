import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  PhoneIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronRightIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import MobileLayout from '../components/responsive/MobileLayout';

export default function MobileAppointments() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data for appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: 'Dr. Ngono Marie',
      specialty: 'General Medicine',
      date: '2025-05-15',
      time: '09:30 AM',
      location: 'Yaoundé General Hospital',
      type: 'in-person',
      status: 'confirmed',
      image: 'https://randomuser.me/api/portraits/women/76.jpg'
    },
    {
      id: 2,
      doctorName: 'Dr. Fon Peter',
      specialty: 'Cardiology',
      date: '2025-05-20',
      time: '02:15 PM',
      location: 'Laquintinie Hospital',
      type: 'video',
      status: 'pending',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  ];
  
  const pastAppointments = [
    {
      id: 3,
      doctorName: 'Dr. Biya Rose',
      specialty: 'Pediatrics',
      date: '2025-04-28',
      time: '11:00 AM',
      location: 'Mother and Child Hospital',
      type: 'in-person',
      status: 'completed',
      image: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    {
      id: 4,
      doctorName: 'Dr. Tchamba Paul',
      specialty: 'Internal Medicine',
      date: '2025-04-15',
      time: '10:30 AM',
      location: 'Regional Hospital Bamenda',
      type: 'video',
      status: 'cancelled',
      image: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    {
      id: 5,
      doctorName: 'Dr. Eyenga Sarah',
      specialty: 'Obstetrics & Gynecology',
      date: '2025-04-05',
      time: '09:45 AM',
      location: 'Gyneco-Obstetric Hospital',
      type: 'in-person',
      status: 'completed',
      image: 'https://randomuser.me/api/portraits/women/22.jpg'
    }
  ];
  
  // Get appointments based on active tab
  const appointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;
  
  // Function to format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Function to get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get appointment type icon
  const getAppointmentTypeIcon = (type) => {
    return type === 'video' ? (
      <VideoCameraIcon className="h-4 w-4 text-purple-500" />
    ) : (
      <UserIcon className="h-4 w-4 text-blue-500" />
    );
  };
  
  return (
    <MobileLayout title="Appointments">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-center text-sm font-medium ${
            activeTab === 'upcoming'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`flex-1 py-3 text-center text-sm font-medium ${
            activeTab === 'past'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>
      
      {/* Appointment List */}
      <div className="divide-y">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} className="p-4">
              <div className="flex items-start">
                {/* Doctor Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                  <img
                    src={appointment.image}
                    alt={appointment.doctorName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/48?text=Dr';
                    }}
                  />
                </div>
                
                {/* Appointment Details */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">{appointment.specialty}</p>
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <ClockIcon className="h-3.5 w-3.5 mr-1" />
                      <span>{appointment.time}</span>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPinIcon className="h-3.5 w-3.5 mr-1" />
                      <span>{appointment.location}</span>
                    </div>
                    
                    <div className="flex items-center text-xs font-medium">
                      {getAppointmentTypeIcon(appointment.type)}
                      <span className="ml-1">
                        {appointment.type === 'video' ? 'Video Consultation' : 'In-person Visit'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              {activeTab === 'upcoming' && (
                <div className="mt-3 flex space-x-2">
                  {appointment.type === 'video' && appointment.status === 'confirmed' && (
                    <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg flex items-center justify-center">
                      <VideoCameraIcon className="h-4 w-4 mr-1" />
                      Join Call
                    </button>
                  )}
                  
                  <button className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg">
                    Reschedule
                  </button>
                  
                  <button className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg">
                    Cancel
                  </button>
                </div>
              )}
              
              {activeTab === 'past' && appointment.status === 'completed' && (
                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg">
                    View Summary
                  </button>
                  
                  <button className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg">
                    Book Again
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No {activeTab} appointments found.</p>
          </div>
        )}
      </div>
      
      {/* Floating Action Button */}
      <Link
        to="/book-appointment"
        className="fixed right-4 bottom-20 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        <PlusIcon className="h-6 w-6" />
      </Link>
    </MobileLayout>
  );
}
