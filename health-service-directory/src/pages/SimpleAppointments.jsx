import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, MapPinIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';

export default function SimpleAppointments() {
  // Mock appointment data
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Ngono Marie",
      specialty: "Cardiologist",
      date: "2024-05-15",
      time: "09:00",
      location: "Yaoundé General Hospital",
      status: "upcoming",
      phone: "+237 677-234-567",
    },
    {
      id: 2,
      doctorName: "Dr. Fon Peter",
      specialty: "Pediatrician",
      date: "2024-05-20",
      time: "14:30",
      location: "Douala Medical Center",
      status: "upcoming",
      phone: "+237 699-345-678",
    },
    {
      id: 3,
      doctorName: "Dr. Biya Rose",
      specialty: "Dermatologist",
      date: "2024-05-10",
      time: "11:15",
      location: "Bamenda Regional Hospital",
      status: "completed",
      phone: "+237 677-456-789",
    },
  ];

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">My Appointments</h1>
        <p className="mb-6 text-gray-600">
          View and manage your upcoming and past medical appointments.
        </p>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {appointments
              .filter(apt => apt.status === "upcoming")
              .map(appointment => (
                <div key={appointment.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-700 mr-3">
                        <UserIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{appointment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{appointment.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{appointment.location}</span>
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{appointment.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Reschedule
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
          <div className="space-y-4">
            {appointments
              .filter(apt => apt.status === "completed")
              .map(appointment => (
                <div key={appointment.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-gray-100 text-gray-700 mr-3">
                        <UserIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      </div>
                      <div className="ml-auto bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        Completed
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{appointment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{appointment.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{appointment.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Book Follow-up
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/simple" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Back to Simple Test Page
          </Link>
        </div>
      </div>
    </div>
  );
}
