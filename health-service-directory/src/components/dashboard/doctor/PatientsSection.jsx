import { useState } from 'react';
import { 
  UserIcon, 
  CalendarIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  UserPlusIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

export default function PatientsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const filters = [
    { id: 'all', name: 'All Patients' },
    { id: 'active', name: 'Active' },
    { id: 'new', name: 'New' },
    { id: 'followup', name: 'Follow-up Required' },
  ];

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      lastVisit: '2024-04-10',
      nextAppointment: '2024-04-20',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      address: '123 Main St, City, State',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      lastVisit: '2024-04-05',
      nextAppointment: null,
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@example.com',
      address: '456 Oak Ave, City, State',
      status: 'new',
    },
    {
      id: 3,
      name: 'Robert Johnson',
      age: 58,
      gender: 'Male',
      lastVisit: '2024-03-28',
      nextAppointment: '2024-04-15',
      phone: '+1 (555) 456-7890',
      email: 'robert.j@example.com',
      address: '789 Pine Rd, City, State',
      status: 'followup',
    },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewProfile = (patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  const handleScheduleVisit = (patient) => {
    setSelectedPatient(patient);
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = (date, time, type) => {
    // Add the new appointment to the patient's appointments
    const updatedPatients = patients.map(patient => 
      patient.id === selectedPatient.id 
        ? { 
            ...patient, 
            nextAppointment: {
              date,
              time,
              type
            }
          }
        : patient
    );
    setPatients(updatedPatients);
    setShowScheduleModal(false);
  };

  return (
    <div className="w-full">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-2">
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
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center">
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Add New Patient
        </button>
      </div>

      {/* Patients List */}
      <div className="mt-6 space-y-4">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{patient.name}</span>
                  <span className="text-sm text-gray-500">({patient.age} years, {patient.gender})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Last Visit: {patient.lastVisit}</span>
                  {patient.nextAppointment && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-blue-600">Next: {patient.nextAppointment.date} at {patient.nextAppointment.time}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{patient.phone}</span>
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 ml-2" />
                  <span className="text-gray-600">{patient.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{patient.address}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  patient.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : patient.status === 'New'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {patient.status}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewProfile(patient)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleScheduleVisit(patient)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <CalendarIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {patients.length === 0 && (
        <div className="text-center py-12">
          <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No patients found</h3>
          <p className="text-gray-500 mt-1">There are no patients matching your search criteria.</p>
        </div>
      )}

      {/* Patient Details Modal */}
      {showDetailsModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Profile</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Personal Information</h4>
                <p className="text-gray-600">Name: {selectedPatient.name}</p>
                <p className="text-gray-600">Age: {selectedPatient.age}</p>
                <p className="text-gray-600">Gender: {selectedPatient.gender}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Contact Information</h4>
                <p className="text-gray-600">Phone: {selectedPatient.phone}</p>
                <p className="text-gray-600">Email: {selectedPatient.email}</p>
                <p className="text-gray-600">Address: {selectedPatient.address}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Medical History</h4>
                <p className="text-gray-600">Last Visit: {selectedPatient.lastVisit}</p>
                {selectedPatient.nextAppointment && (
                  <p className="text-gray-600">
                    Next Appointment: {selectedPatient.nextAppointment.date} at {selectedPatient.nextAppointment.time}
                  </p>
                )}
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

      {/* Schedule Visit Modal */}
      {showScheduleModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Visit</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Visit Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Regular Checkup</option>
                  <option>Follow-up</option>
                  <option>Emergency</option>
                  <option>Consultation</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleScheduleSubmit(newDate, newTime, newType)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 