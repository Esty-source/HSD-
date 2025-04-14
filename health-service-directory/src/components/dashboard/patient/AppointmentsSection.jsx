import { useState } from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';

export default function AppointmentsSection() {
  const [filter, setFilter] = useState('upcoming');

  // Mock data - will be replaced with real API data
  const appointments = [
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
      type: "Telemedicine"
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
    }
  ];

  const filteredAppointments = appointments.filter(apt => 
    filter === 'all' || apt.status === filter
  );

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
              filter === filter.id 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <filter.icon className="h-5 w-5" />
            <span className="font-medium">{filter.name}</span>
          </button>
        ))}
      </div>

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
                    : 'bg-green-100 text-green-800'
                }`}>
                  {appointment.status}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {appointment.type}
                </span>
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
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Schedule New Appointment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 