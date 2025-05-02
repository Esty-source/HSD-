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
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [appointmentToConfirm, setAppointmentToConfirm] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [appointments, setAppointments] = useState([
    // Today's appointments
    {
      id: 1,
      patientName: 'John Doe',
      time: '09:00 AM',
      date: '2025-05-02',
      type: 'Regular Checkup',
      status: 'scheduled',
      location: 'Room 101',
      phone: '+237 675 123 456',
      email: 'john.doe@example.com',
      notes: 'Patient has history of hypertension'
    },
    {
      id: 4,
      patientName: 'Emily Davis',
      time: '11:15 AM',
      date: '2025-05-02',
      type: 'Annual Physical',
      status: 'scheduled',
      location: 'Room 104',
      phone: '+237 675 987 654',
      email: 'emily.davis@example.com',
      notes: 'First visit to the clinic'
    },
    {
      id: 9,
      patientName: 'Olivia Martin',
      time: '02:30 PM',
      date: '2025-05-02',
      type: 'Vaccination',
      status: 'scheduled',
      location: 'Room 103',
      phone: '+237 677 345 678',
      email: 'olivia.martin@example.com',
      notes: 'COVID-19 booster shot'
    },
    
    // Upcoming appointments
    {
      id: 2,
      patientName: 'Jane Smith',
      time: '10:30 AM',
      date: '2025-05-03',
      type: 'Follow-up',
      status: 'scheduled',
      location: 'Room 102',
      phone: '+237 676 234 567',
      email: 'jane.smith@example.com',
      notes: 'Follow-up for diabetes management'
    },
    {
      id: 6,
      patientName: 'Daniel Brown',
      time: '09:45 AM',
      date: '2025-05-04',
      type: 'Consultation',
      status: 'scheduled',
      location: 'Room 105',
      phone: '+237 678 456 789',
      email: 'daniel.brown@example.com',
      notes: 'New patient consultation'
    },
    {
      id: 8,
      patientName: 'Sophia Taylor',
      time: '01:15 PM',
      date: '2025-05-05',
      type: 'Prenatal Checkup',
      status: 'scheduled',
      location: 'Room 102',
      phone: '+237 679 234 567',
      email: 'sophia.taylor@example.com',
      notes: 'Second trimester checkup'
    },
    
    // Past appointments
    {
      id: 5,
      patientName: 'Michael Wilson',
      time: '03:45 PM',
      date: '2025-04-28',
      type: 'Follow-up',
      status: 'completed',
      location: 'Room 105',
      phone: '+237 675 567 890',
      email: 'michael.wilson@example.com',
      notes: 'Patient showing improvement, continue current treatment'
    },
    {
      id: 7,
      patientName: 'Sarah Johnson',
      time: '02:00 PM',
      date: '2025-04-29',
      type: 'Lab Results Review',
      status: 'completed',
      location: 'Room 101',
      phone: '+237 676 678 901',
      email: 'sarah.johnson@example.com',
      notes: 'All lab results normal, no further action needed'
    },
    
    // Cancelled appointments
    {
      id: 3,
      patientName: 'Robert Johnson',
      time: '02:00 PM',
      date: '2025-04-25',
      type: 'Consultation',
      status: 'cancelled',
      location: 'Room 103',
      phone: '+237 677 345 678',
      email: 'robert.johnson@example.com',
      notes: 'Cancelled by patient due to travel',
      cancellationReason: 'Patient traveling out of town'
    },
    {
      id: 10,
      patientName: 'William Clark',
      time: '11:30 AM',
      date: '2025-04-30',
      type: 'Dermatology Consult',
      status: 'cancelled',
      location: 'Room 104',
      phone: '+237 678 901 234',
      email: 'william.clark@example.com',
      notes: 'Rescheduling needed',
      cancellationReason: 'Doctor unavailable due to emergency'
    }
  ]);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(appointment.date);
    setNewTime(appointment.time.replace(' AM', '').replace(' PM', ''));
    setShowRescheduleModal(true);
  };

  const handleCancelAppointment = (appointmentId) => {
    const appointment = appointments.find(app => app.id === appointmentId);
    setAppointmentToCancel(appointment);
    setShowCancelConfirmModal(true);
  };

  const handleConfirmAppointment = (appointmentId) => {
    const appointment = appointments.find(app => app.id === appointmentId);
    setAppointmentToConfirm(appointment);
    setShowConfirmationModal(true);
  };

  const confirmCancellation = () => {
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentToCancel.id 
        ? { ...appointment, status: 'cancelled', cancellationReason: 'Cancelled by doctor' } 
        : appointment
    ));
    setShowCancelConfirmModal(false);
    setAppointmentToCancel(null);
  };

  const confirmAppointmentStatus = () => {
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentToConfirm.id 
        ? { ...appointment, status: 'confirmed' } 
        : appointment
    ));
    setShowConfirmationModal(false);
    setAppointmentToConfirm(null);
  };

  const handleRescheduleSubmit = () => {
    setAppointments(appointments.map(appointment => 
      appointment.id === selectedAppointment.id 
        ? { ...appointment, date: newDate, time: newTime }
        : appointment
    ));
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
  };

  const filters = [
    { id: 'today', name: 'Today' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'past', name: 'Past' },
    { id: 'cancelled', name: 'Cancelled' },
  ];

  // Function to filter appointments based on active filter
  const getFilteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    switch (activeFilter) {
      case 'today':
        return appointments.filter(appointment => appointment.date === today);
      case 'upcoming':
        return appointments.filter(appointment => 
          appointment.date > today && appointment.status !== 'cancelled'
        );
      case 'past':
        return appointments.filter(appointment => 
          appointment.date < today && appointment.status !== 'cancelled'
        );
      case 'cancelled':
        return appointments.filter(appointment => appointment.status === 'cancelled');
      default:
        return appointments;
    }
  };
  
  // Get filtered appointments based on current filter
  const filteredAppointments = getFilteredAppointments();

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
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
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
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">{appointment.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">{appointment.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {appointment.status}
                  </span>
                  <span className="text-sm text-gray-500">{appointment.type}</span>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleViewDetails(appointment)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    {appointment.status !== 'cancelled' && (
                      <button
                        onClick={() => handleReschedule(appointment)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors duration-200"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    )}
                    {appointment.status === 'scheduled' && (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                    {appointment.status === 'scheduled' && (
                      <button
                        onClick={() => handleConfirmAppointment(appointment.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No appointments found</h3>
            <p className="text-gray-500 mt-1">There are no appointments for the selected filter.</p>
          </div>
        )}
      </div>

      {/* Appointment Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative z-50">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative z-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reschedule Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Time</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
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
                onClick={handleRescheduleSubmit}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirmModal && appointmentToCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative z-50">
            <h3 className="text-lg font-medium text-red-600 mb-4">Cancel Appointment</h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to cancel the appointment with <span className="font-medium">{appointmentToCancel.patientName}</span> on {appointmentToCancel.date} at {appointmentToCancel.time}?
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelConfirmModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                No, Keep Appointment
              </button>
              <button
                onClick={confirmCancellation}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Yes, Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Appointment Modal */}
      {showConfirmationModal && appointmentToConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative z-50">
            <h3 className="text-lg font-medium text-green-600 mb-4">Confirm Appointment</h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to confirm the appointment with <span className="font-medium">{appointmentToConfirm.patientName}</span> on {appointmentToConfirm.date} at {appointmentToConfirm.time}?
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmAppointmentStatus}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Confirm Appointment
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