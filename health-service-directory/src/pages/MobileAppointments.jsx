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
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentsState, setAppointmentsState] = useState({
    upcoming: [
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
    ],
    past: [
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
    ]
  });
  const [rescheduleForm, setRescheduleForm] = useState({ date: '', time: '' });
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showBookAgainModal, setShowBookAgainModal] = useState(false);
  const [summaryAppointment, setSummaryAppointment] = useState(null);
  
  // Get appointments based on active tab
  const appointments = appointmentsState[activeTab];
  
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
  
  // Handlers for modals
  const openRescheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleForm({ date: appointment.date, time: appointment.time });
    setShowRescheduleModal(true);
  };
  const openCancelModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };
  const closeModals = () => {
    setShowRescheduleModal(false);
    setShowCancelModal(false);
    setSelectedAppointment(null);
  };
  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!rescheduleForm.date || !rescheduleForm.time) return; // Prevent empty values

    setAppointmentsState((prev) => ({
      ...prev,
      upcoming: prev.upcoming.map((apt) =>
        apt.id === selectedAppointment.id
          ? { ...apt, date: rescheduleForm.date, time: rescheduleForm.time }
          : apt
      ),
    }));
    setShowRescheduleModal(false);
    setShowCancelModal(false);
    setSelectedAppointment(null);
    setRescheduleForm({ date: '', time: '' });
  };
  const handleCancelConfirm = () => {
    setAppointmentsState((prev) => ({
      ...prev,
      upcoming: prev.upcoming.filter((apt) => apt.id !== selectedAppointment.id),
    }));
    closeModals();
  };
  const openSummaryModal = (appointment) => {
    setSummaryAppointment(appointment);
    setShowSummaryModal(true);
  };
  const openBookAgainModal = (appointment) => {
    setSummaryAppointment(appointment);
    setShowBookAgainModal(true);
  };
  const closeSummaryModal = () => {
    setShowSummaryModal(false);
    setSummaryAppointment(null);
  };
  const closeBookAgainModal = () => {
    setShowBookAgainModal(false);
    setSummaryAppointment(null);
  };
  const handleBookAgainConfirm = () => {
    // Set new date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const newDate = `${yyyy}-${mm}-${dd}`;

    setAppointmentsState((prev) => ({
      ...prev,
      upcoming: [
        {
          ...summaryAppointment,
          id: Date.now(),
          date: newDate,
          time: '09:00 AM',
          status: 'confirmed',
        },
        ...prev.upcoming,
      ],
    }));
    closeBookAgainModal();
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
                  <button
                    className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg"
                    onClick={() => openRescheduleModal(appointment)}
                  >
                    Reschedule
                  </button>
                  <button
                    className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg"
                    onClick={() => openCancelModal(appointment)}
                  >
                    Cancel
                  </button>
                </div>
              )}
              
              {activeTab === 'past' && appointment.status === 'completed' && (
                <div className="mt-3 flex space-x-2">
                  <button
                    className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg"
                    onClick={() => openSummaryModal(appointment)}
                  >
                    View Summary
                  </button>
                  <button
                    className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg"
                    onClick={() => openBookAgainModal(appointment)}
                  >
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
      
      {/* Modals */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-4 text-blue-700">Reschedule Appointment</h3>
            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Date</label>
                <input
                  type="date"
                  value={rescheduleForm.date}
                  onChange={e => setRescheduleForm(f => ({ ...f, date: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Time</label>
                <input
                  type="time"
                  value={rescheduleForm.time}
                  onChange={e => setRescheduleForm(f => ({ ...f, time: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  type="button"
                  onClick={closeModals}
                  className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-4 text-red-700">Cancel Appointment</h3>
            <p className="mb-6 text-gray-700">Are you sure you want to cancel your appointment with {selectedAppointment?.doctorName}?</p>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={closeModals}
                className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold"
              >
                Keep
              </button>
              <button
                type="button"
                onClick={handleCancelConfirm}
                className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
      {showSummaryModal && summaryAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-4 text-blue-700">Appointment Summary</h3>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <img src={summaryAppointment.image} alt={summaryAppointment.doctorName} className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">{summaryAppointment.doctorName}</div>
                  <div className="text-sm text-gray-600">{summaryAppointment.specialty}</div>
                </div>
              </div>
              <div className="text-sm text-gray-700 mb-1"><CalendarIcon className="inline h-4 w-4 mr-1" /> {formatDate(summaryAppointment.date)}</div>
              <div className="text-sm text-gray-700 mb-1"><ClockIcon className="inline h-4 w-4 mr-1" /> {summaryAppointment.time}</div>
              <div className="text-sm text-gray-700 mb-1"><MapPinIcon className="inline h-4 w-4 mr-1" /> {summaryAppointment.location}</div>
              <div className="text-sm text-gray-700 mb-1"><PhoneIcon className="inline h-4 w-4 mr-1" /> +237 000-000-000</div>
              <div className="text-sm text-gray-700 mb-1"><UserIcon className="inline h-4 w-4 mr-1" /> {summaryAppointment.type === 'video' ? 'Video Consultation' : 'In-person Visit'}</div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeSummaryModal}
                className="py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showBookAgainModal && summaryAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-4 text-blue-700">Book This Appointment Again?</h3>
            <p className="mb-6 text-gray-700">Would you like to book another appointment with {summaryAppointment.doctorName}?</p>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={closeBookAgainModal}
                className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBookAgainConfirm}
                className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-semibold"
              >
                Book Again
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  );
}
