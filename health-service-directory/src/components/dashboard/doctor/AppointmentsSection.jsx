import { useState } from 'react';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  MapPinIcon, 
  CheckIcon, 
  XMarkIcon,
  PencilIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function AppointmentsSection() {
  const [activeFilter, setActiveFilter] = useState('today');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleCancelAppointment = (appointmentId) => {
    // Update the appointment status to cancelled
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status: 'Cancelled' }
        : appointment
    );
    setAppointments(updatedAppointments);
  };

  const handleConfirmAppointment = (appointmentId) => {
    // Update the appointment status to confirmed
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status: 'Confirmed' }
        : appointment
    );
    setAppointments(updatedAppointments);
  };

  const handleRescheduleSubmit = (newDate, newTime) => {
    // Update the appointment with new date and time
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === selectedAppointment.id 
        ? { ...appointment, date: newDate, time: newTime }
        : appointment
    );
    setAppointments(updatedAppointments);
    setShowRescheduleModal(false);
  };

  const filters = [
    { id: 'today', name: 'Today' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'past', name: 'Past' },
    { id: 'cancelled', name: 'Cancelled' },
  ];

  // Mock appointment data
  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      time: '09:00 AM',
      date: '2024-04-15',
      type: 'Regular Checkup',
      status: 'scheduled',
      location: 'Room 101',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      time: '10:30 AM',
      date: '2024-04-15',
      type: 'Follow-up',
      status: 'scheduled',
      location: 'Room 102',
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      time: '02:00 PM',
      date: '2024-04-15',
      type: 'Consultation',
      status: 'cancelled',
      location: 'Room 103',
    },
  ];

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="mt-6 space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{appointment.patientName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{appointment.date}</span>
                  <ClockIcon className="h-5 w-5 text-gray-400 ml-2" />
                  <span className="text-gray-600">{appointment.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{appointment.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'Scheduled' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {appointment.status}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewDetails(appointment)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleReschedule(appointment)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  {appointment.status === 'Scheduled' && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                  {appointment.status === 'Cancelled' && (
                    <button
                      onClick={() => handleConfirmAppointment(appointment.id)}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Patient Information</h4>
                <p className="text-gray-600">{selectedAppointment.patientName}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Appointment Details</h4>
                <p className="text-gray-600">Date: {selectedAppointment.date}</p>
                <p className="text-gray-600">Time: {selectedAppointment.time}</p>
                <p className="text-gray-600">Type: {selectedAppointment.type}</p>
                <p className="text-gray-600">Location: {selectedAppointment.location}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Status</h4>
                <p className="text-gray-600">{selectedAppointment.status}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reschedule Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Time</label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRescheduleSubmit(newDate, newTime)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {appointments.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No appointments found</h3>
          <p className="text-gray-500 mt-1">There are no appointments scheduled for this period.</p>
        </div>
      )}
    </div>
  );
} 