import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  XMarkIcon,
  LightBulbIcon,
  CheckCircleIcon,
  BellIcon,
  UserIcon,
  VideoCameraIcon,
  ChevronRightIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import MobileAppointments from './MobileAppointments';
import { appointmentsAPI } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const mockAppointments = [
  {
    id: 1,
    doctorName: "Dr. Ngono Marie",
    specialty: "Cardiologist",
    date: "2024-02-15",
    time: "09:00",
    location: "Yaoundé General Hospital",
    status: "upcoming",
    phone: "+237 677-234-567",
  },
  {
    id: 2,
    doctorName: "Dr. Fon Peter",
    specialty: "Pediatrician",
    date: "2024-02-10",
    time: "14:30",
    location: "Douala Medical Center",
    status: "completed",
    phone: "+237 699-345-678",
  },
  {
    id: 3,
    doctorName: "Dr. Biya Rose",
    specialty: "Dermatologist",
    date: "2024-02-20",
    time: "11:15",
    location: "Bamenda Regional Hospital",
    status: "upcoming",
    phone: "+237 677-456-789",
  },
];

const specialties = [
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "General Medicine",
  "Gynecology",
  "Orthopedics",
  "Dentistry",
  "Ophthalmology",
];

const quickTips = [
  {
    id: 1,
    title: "Prepare for Your Visit",
    tips: [
      "Bring your ID and insurance information",
      "List your current medications",
      "Write down any questions for the doctor",
      "Arrive 15 minutes before your appointment"
    ]
  },
  {
    id: 2,
    title: "Scheduling Tips",
    tips: [
      "Morning appointments typically have shorter wait times",
      "Book follow-ups right after your visit",
      "Save emergency numbers in your phone",
      "Set reminders for your appointments"
    ]
  },
  {
    id: 3,
    title: "Cancellation Policy",
    tips: [
      "Cancel at least 24 hours in advance",
      "Reschedule through the app or phone",
      "Keep track of your appointment history",
      "Update contact information if changed"
    ]
  }
];

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState({
    upcoming: [],
    past: []
  });
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    // TODO: Fetch appointments from API
    // For now, using mock data
    setAppointments({
      upcoming: [
        {
          id: 1,
          doctorName: 'Dr. Sarah Johnson',
          specialty: 'Cardiology',
          date: '2024-03-20',
          time: '10:00 AM',
          type: 'In-person',
          location: '123 Medical Center Dr.',
          status: 'confirmed'
        },
        {
          id: 2,
          doctorName: 'Dr. Michael Chen',
          specialty: 'Dermatology',
          date: '2024-03-25',
          time: '2:30 PM',
          type: 'Video Consultation',
          location: 'Virtual',
          status: 'pending'
        }
      ],
      past: [
        {
          id: 3,
          doctorName: 'Dr. Emily Brown',
          specialty: 'Pediatrics',
          date: '2024-02-15',
          time: '11:00 AM',
          type: 'In-person',
          location: '456 Health Plaza',
          status: 'completed'
        }
      ]
    });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video Consultation':
        return <VideoCameraIcon className="h-5 w-5 text-blue-500" />;
      case 'Phone Consultation':
        return <PhoneIcon className="h-5 w-5 text-green-500" />;
      default:
        return <MapPinIcon className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <Link
            to="/find-doctors"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Book New Appointment
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`${
                activeTab === 'past'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Past
            </button>
          </nav>
        </div>

        {/* Appointments List */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {appointments[activeTab].map((appointment) => (
                <li key={appointment.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <UserCircleIcon className="h-10 w-10 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            {appointment.doctorName}
                          </h3>
                          <p className="text-sm text-gray-500">{appointment.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          {getTypeIcon(appointment.type)}
                          <span className="ml-1.5">{appointment.type}</span>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    {appointment.type !== 'Video Consultation' && (
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {appointment.location}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Empty State */}
        {appointments[activeTab].length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming appointments."
                : "You don't have any past appointments."}
            </p>
            {activeTab === 'upcoming' && (
              <div className="mt-6">
                <Link
                  to="/find-doctors"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Book New Appointment
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
