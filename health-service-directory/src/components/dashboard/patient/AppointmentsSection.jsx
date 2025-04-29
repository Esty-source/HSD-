import { useState } from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon, PlusCircleIcon, CheckCircleIcon, XCircleIcon, VideoCameraIcon, ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import BookAppointmentModal from './BookAppointmentModal';

export default function AppointmentsSection() {
  const [filter, setFilter] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      date: "2024-03-20",
      time: "10:00 AM",
      location: "Heart Care Center",
      status: "upcoming",
      type: "In-person"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "2024-03-15",
      time: "2:30 PM",
      location: "Skin Health Clinic",
      status: "completed",
      type: "Telemedicine",
      notes: "Follow-up on skin rash treatment"
    },
    {
      id: 3,
      doctor: "Dr. Emily Brown",
      specialty: "General Practitioner",
      date: "2024-03-25",
      time: "11:15 AM",
      location: "Family Health Center",
      status: "upcoming",
      type: "In-person"
    },
    {
      id: 4,
      doctor: "Dr. James Taylor",
      specialty: "Neurologist",
      date: "2024-02-10",
      time: "9:00 AM",
      location: "Neurology Center",
      status: "completed",
      type: "In-person",
      notes: "Initial consultation for headaches"
    },
    {
      id: 5,
      doctor: "Dr. Lisa Wong",
      specialty: "Psychiatrist",
      date: "2024-01-22",
      time: "3:45 PM",
      location: "Mental Health Clinic",
      status: "completed",
      type: "Telemedicine",
      notes: "Therapy session"
    },
    {
      id: 6,
      doctor: "Dr. Robert Johnson",
      specialty: "Orthopedist",
      date: "2023-12-05",
      time: "11:30 AM",
      location: "Orthopedic Specialists",
      status: "completed",
      type: "In-person",
      notes: "Follow-up on knee injury"
    },
    {
      id: 7,
      doctor: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      date: "2023-11-15",
      time: "10:15 AM",
      location: "Heart Care Center",
      status: "completed",
      type: "In-person",
      notes: "Annual heart checkup"
    }
  ]);

  const filteredAppointments = appointments.filter(apt => 
    filter === 'all' || apt.status === filter
  );

  const handleBookAppointment = (appointmentDetails) => {
    // Add the new appointment to the list
    setAppointments(prev => [...prev, appointmentDetails]);
    
    // Show success message
    toast.success('Appointment booked successfully!', {
      duration: 4000,
      position: 'top-center',
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
    });
  };
  
  const handleCancelAppointment = (id) => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      // Update the appointment status
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === id ? { ...apt, status: 'cancelled' } : apt
        )
      );
      
      // Show success message
      toast.success('Appointment cancelled successfully', {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  const filters = [
    { id: 'all', name: 'All', icon: UserIcon },
    { id: 'upcoming', name: 'Upcoming', icon: CalendarIcon },
    { id: 'completed', name: 'Completed', icon: ClockIcon },
  ];

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex space-x-4 mb-8 w-full overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setFilter(filter.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl whitespace-nowrap transition-colors duration-200 ${
              filter.id === filter 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <filter.icon className="h-5 w-5" />
            <span className="font-medium">{filter.name}</span>
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowSummary(!showSummary)}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200"
          >
            <ChartBarIcon className="h-5 w-5 mr-2" />
            <span className="font-medium">{showSummary ? 'Hide Summary' : 'View Summary'}</span>
          </button>
          <button 
            onClick={() => setShowBookingModal(true)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            <span className="font-medium">Book Appointment</span>
          </button>
        </div>
      </div>
      
      {/* Appointment Summary */}
      {showSummary && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Appointment History Summary</h3>
            <button 
              onClick={() => setShowSummary(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Appointments</p>
                  <p className="text-2xl font-bold text-blue-800 mt-1">{appointments.length}</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-green-600 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-800 mt-1">
                    {appointments.filter(apt => apt.status === 'completed').length}
                  </p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-purple-600 font-medium">In-person Visits</p>
                  <p className="text-2xl font-bold text-purple-800 mt-1">
                    {appointments.filter(apt => apt.type === 'In-person').length}
                  </p>
                </div>
                <UserIcon className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Telemedicine</p>
                  <p className="text-2xl font-bold text-indigo-800 mt-1">
                    {appointments.filter(apt => apt.type === 'Telemedicine').length}
                  </p>
                </div>
                <VideoCameraIcon className="h-8 w-8 text-indigo-500" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-700 mb-3">Appointment History Timeline</h4>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {[...appointments]
                .filter(apt => apt.status === 'completed')
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((apt, index) => (
                  <div key={apt.id} className="flex items-start">
                    <div className="flex-shrink-0 h-4 w-4 rounded-full mt-1.5 bg-gray-200 flex items-center justify-center">
                      <div className={`h-2 w-2 rounded-full ${apt.type === 'In-person' ? 'bg-purple-500' : 'bg-indigo-500'}`}></div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{apt.doctor}</p>
                        <p className="text-xs text-gray-500">{new Date(apt.date).toLocaleDateString()}</p>
                      </div>
                      <p className="text-sm text-gray-600">{apt.specialty}</p>
                      <div className="mt-1 flex items-center">
                        {apt.type === 'In-person' ? (
                          <MapPinIcon className="h-3.5 w-3.5 text-gray-400 mr-1" />
                        ) : (
                          <VideoCameraIcon className="h-3.5 w-3.5 text-gray-400 mr-1" />
                        )}
                        <span className="text-xs text-gray-500">
                          {apt.type === 'In-person' ? apt.location : 'Telemedicine'}
                        </span>
                      </div>
                      {apt.notes && (
                        <p className="text-xs text-gray-500 mt-1 italic">{apt.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Appointments List */}
      <div className="w-full space-y-4">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{appointment.doctor}</h3>
                <p className="text-gray-600">{appointment.specialty}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{appointment.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-800'
                    : appointment.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {appointment.status}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {appointment.type}
                </span>
                {appointment.status === 'upcoming' && (
                  <button 
                    onClick={() => handleCancelAppointment(appointment.id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200 ml-2"
                    title="Cancel appointment"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments found</h3>
            <p className="mt-1 text-gray-500">
              {filter === 'upcoming' 
                ? "You don't have any upcoming appointments scheduled."
                : filter === 'completed'
                ? "You don't have any completed appointments."
                : "No appointments found for the selected filter."}
            </p>
            {filter === 'upcoming' && (
              <div className="mt-6">
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Schedule New Appointment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Book Appointment Modal */}
      <BookAppointmentModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
}