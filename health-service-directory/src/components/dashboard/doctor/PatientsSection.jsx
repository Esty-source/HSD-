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
  PencilIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import ConfirmationModal from './ConfirmationModal';

export default function PatientsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState('add-patient');
  const [confirmationData, setConfirmationData] = useState(null);
  const [scheduledAppointment, setScheduledAppointment] = useState(null);
  const [patients, setPatients] = useState([
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
  ]);

  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
  });

  const filters = [
    { id: 'all', name: 'All Patients' },
    { id: 'active', name: 'Active' },
    { id: 'new', name: 'New' },
    { id: 'followup', name: 'Follow-up Required' },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter patients based on search query and active filter
  const getFilteredPatients = () => {
    // First filter by search query
    let filtered = patients;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = patients.filter(patient => 
        patient.name.toLowerCase().includes(query) || 
        patient.email.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query)
      );
    }
    
    // Then filter by status
    if (activeFilter !== 'all') {
      filtered = filtered.filter(patient => patient.status === activeFilter);
    }
    
    return filtered;
  };
  
  const filteredPatients = getFilteredPatients();

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
    
    // Prepare confirmation data
    setConfirmationType('schedule-visit');
    setConfirmationData({
      'Patient': selectedPatient.name,
      'Date': date,
      'Time': time,
      'Visit Type': type,
      'Location': 'Main Clinic'
    });
    
    // Show confirmation
    setShowConfirmation(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatientData = {
      id: patients.length + 1,
      ...newPatient,
      lastVisit: 'Not visited',
      nextAppointment: null,
      status: 'new',
    };
    
    setPatients(prev => [...prev, newPatientData]);
    
    // Prepare confirmation data
    setConfirmationType('add-patient');
    setConfirmationData({
      'Name': newPatient.name,
      'Age': newPatient.age,
      'Gender': newPatient.gender,
      'Phone': newPatient.phone,
      'Email': newPatient.email,
      'Status': 'New Patient'
    });
    
    // Reset form
    setNewPatient({
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
    });
    
    // Close modal and show confirmation
    setShowAddPatientModal(false);
    setShowConfirmation(true);
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
        <button 
          onClick={() => setShowAddPatientModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center"
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Add New Patient
        </button>
      </div>

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white z-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Add New Patient</h3>
              <button
                onClick={() => setShowAddPatientModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newPatient.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={newPatient.age}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={newPatient.gender}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={newPatient.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newPatient.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={newPatient.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowAddPatientModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patients List */}
      <div className="mt-6 space-y-4">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No patients match your search criteria.</p>
          </div>
        ) : (
          filteredPatients.map((patient) => (
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
          ))
        )}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full z-50">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full z-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Visit for {selectedPatient.name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  id="visitDate"
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <select 
                  id="visitTime"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Visit Type</label>
                <select 
                  id="visitType"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select visit type</option>
                  <option value="Regular Checkup">Regular Checkup</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const date = document.getElementById('visitDate').value;
                  const time = document.getElementById('visitTime').value;
                  const type = document.getElementById('visitType').value;
                  
                  if (date && time && type) {
                    handleScheduleSubmit(date, time, type);
                  } else {
                    // Show validation message
                    alert('Please fill all fields');
                  }
                }}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                type="button"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Legacy confirmation modal - replaced with ConfirmationModal component */}
      {/* Confirmation Modals */}
      {showConfirmation && (
        <ConfirmationModal
          show={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          title={confirmationType === 'add-patient' ? 'Patient Added Successfully' : 'Visit Scheduled Successfully'}
          message={confirmationType === 'add-patient' 
            ? 'The new patient has been added to your patient list.' 
            : 'The visit has been scheduled successfully.'}
          type="success"
          data={confirmationData}
        />
      )}
    </div>
  );
}