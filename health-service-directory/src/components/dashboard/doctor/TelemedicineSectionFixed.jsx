import { useState } from 'react';
import { 
  VideoCameraIcon,
  CalendarIcon,
  UserIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as ClockIconSolid,
  MicrophoneIcon,
  VideoCameraSlashIcon,
  XMarkIcon,
  CheckIcon,
  ChatBubbleLeftIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function TelemedicineSection() {
  const [activeFilter, setActiveFilter] = useState('upcoming');
  const [selectedSession, setSelectedSession] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showNewConsultationModal, setShowNewConsultationModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [consultations, setConsultations] = useState([
    // Upcoming consultations
    {
      id: 1,
      patientName: 'John Doe',
      date: '2025-05-05',
      time: '10:00 AM',
      duration: '30 minutes',
      status: 'scheduled',
      type: 'Follow-up',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2025-05-06',
      time: '11:30 AM',
      duration: '45 minutes',
      status: 'scheduled',
      type: 'Initial Consultation',
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@example.com'
    },
    {
      id: 3,
      patientName: 'Michael Brown',
      date: '2025-05-10',
      time: '09:15 AM',
      duration: '30 minutes',
      status: 'scheduled',
      type: 'Follow-up',
      phone: '+1 (555) 234-5678',
      email: 'michael.brown@example.com'
    },
    // Completed consultations
    {
      id: 4,
      patientName: 'Robert Johnson',
      date: '2025-04-19',
      time: '02:00 PM',
      duration: '30 minutes',
      status: 'completed',
      type: 'Follow-up',
      phone: '+1 (555) 456-7890',
      email: 'robert.johnson@example.com',
      notes: 'Patient reported improvement in symptoms. Continue current treatment plan.'
    },
    {
      id: 5,
      patientName: 'Emily Davis',
      date: '2025-04-15',
      time: '03:30 PM',
      duration: '45 minutes',
      status: 'completed',
      type: 'Initial Consultation',
      phone: '+1 (555) 345-6789',
      email: 'emily.davis@example.com',
      notes: 'New patient with chronic headaches. Prescribed medication and recommended lifestyle changes.'
    },
    // Cancelled consultations
    {
      id: 6,
      patientName: 'Sarah Wilson',
      date: '2025-04-25',
      time: '01:00 PM',
      duration: '30 minutes',
      status: 'cancelled',
      type: 'Follow-up',
      phone: '+1 (555) 567-8901',
      email: 'sarah.wilson@example.com',
      cancellationReason: 'Patient requested reschedule due to personal emergency'
    },
    {
      id: 7,
      patientName: 'David Lee',
      date: '2025-04-22',
      time: '11:00 AM',
      duration: '30 minutes',
      status: 'cancelled',
      type: 'Initial Consultation',
      phone: '+1 (555) 678-9012',
      email: 'david.lee@example.com',
      cancellationReason: 'Doctor unavailable due to emergency surgery'
    }
  ]);

  const [newConsultation, setNewConsultation] = useState({
    patientName: '',
    date: '',
    time: '',
    duration: '30 minutes',
    type: 'Initial Consultation',
    phone: '',
    email: ''
  });

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [consultationToReschedule, setConsultationToReschedule] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({
    date: '',
    time: '',
    duration: '30 minutes'
  });

  const filters = [
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'completed', name: 'Completed' },
    { id: 'cancelled', name: 'Cancelled' },
  ];

  const handleViewDetails = (session) => {
    setSelectedSession(session);
    setShowDetailsModal(true);
  };

  const handleJoinSession = (session) => {
    setSelectedSession(session);
    setShowJoinModal(true);
  };

  const handleStartCall = () => {
    setIsInCall(true);
    setShowJoinModal(false);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };

  const getSessionIcon = (type) => {
    switch (type) {
      case 'Video Call':
        return <VideoCameraIcon className="h-5 w-5" />;
      case 'Audio Call':
        return <PhoneIcon className="h-5 w-5" />;
      case 'Chat':
        return <ChatBubbleLeftIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // Get filtered consultations based on active filter
  const getFilteredConsultations = () => {
    switch(activeFilter) {
      case 'upcoming':
        return consultations.filter(consultation => consultation.status === 'scheduled');
      case 'completed':
        return consultations.filter(consultation => consultation.status === 'completed');
      case 'cancelled':
        return consultations.filter(consultation => consultation.status === 'cancelled');
      default:
        return consultations;
    }
  };

  const filteredConsultations = getFilteredConsultations();

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewConsultation = (e) => {
    e.preventDefault();
    const consultation = {
      id: Date.now(),
      ...newConsultation,
      status: 'scheduled'
    };
    setConsultations(prev => [...prev, consultation]);
    setNewConsultation({
      patientName: '',
      date: '',
      time: '',
      duration: '30 minutes',
      type: 'Initial Consultation',
      phone: '',
      email: ''
    });
    setShowNewConsultationModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConsultation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReschedule = (consultation) => {
    setConsultationToReschedule(consultation);
    setRescheduleData({
      date: consultation.date,
      time: consultation.time,
      duration: consultation.duration
    });
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    setConsultations(prev => prev.map(consultation => {
      if (consultation.id === consultationToReschedule.id) {
        return {
          ...consultation, 
          date: rescheduleData.date,
          time: rescheduleData.time,
          duration: rescheduleData.duration,
          status: 'scheduled' // Reset to scheduled if it was cancelled
        };
      }
      return consultation;
    }));
    setShowRescheduleModal(false);
    setConsultationToReschedule(null);
  };

  const handleRescheduleInputChange = (e) => {
    const { name, value } = e.target;
    setRescheduleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Video Consultations</h2>
        <button 
          onClick={() => setShowNewConsultationModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <VideoCameraIcon className="h-5 w-5 mr-2" />
          Start New Consultation
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6">
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
      </div>

      {/* Consultations List */}
      <div className="space-y-4">
        {filteredConsultations.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeFilter} consultations</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeFilter === 'upcoming' 
                ? 'You have no upcoming telemedicine consultations scheduled.'
                : activeFilter === 'completed'
                ? 'You have no completed telemedicine consultations.'
                : 'You have no cancelled telemedicine consultations.'}
            </p>
          </div>
        ) : (
          filteredConsultations.map((consultation) => (
            <div
              key={consultation.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{consultation.patientName}</h3>
                    <p className="text-sm text-gray-500">{consultation.type}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(consultation.status)}`}>
                  {consultation.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-sm font-medium text-gray-800">{consultation.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="text-sm font-medium text-gray-800">{consultation.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIconSolid className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-sm font-medium text-gray-800">{consultation.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="text-sm font-medium text-gray-800">{consultation.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                {consultation.status === 'scheduled' ? (
                  <>
                    <button
                      onClick={() => handleJoinSession(consultation)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Join Call
                    </button>
                    <button 
                      onClick={() => handleReschedule(consultation)}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Reschedule
                    </button>
                    <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleViewDetails(consultation)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Session Details Modal */}
      {showDetailsModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Session Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Patient Information</h4>
                <p className="text-gray-600">Name: {selectedSession.patientName}</p>
                <p className="text-gray-600">Phone: {selectedSession.phone}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Session Details</h4>
                <p className="text-gray-600">Date: {selectedSession.date}</p>
                <p className="text-gray-600">Time: {selectedSession.time}</p>
                <p className="text-gray-600">Status: {selectedSession.status}</p>
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

      {/* Join Session Modal */}
      {showJoinModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Join Session</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Patient</h4>
                <p className="text-gray-600">{selectedSession.patientName}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Scheduled Time</h4>
                <p className="text-gray-600">{selectedSession.date} at {selectedSession.time}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowJoinModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleStartCall}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Join Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call Interface */}
      {isInCall && (
        <div className="fixed inset-0 bg-black flex flex-col z-50">
          <div className="flex-1 relative">
            {/* Video streams would go here */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-white" />
                <span className="text-white">{selectedSession.patientName}</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-4">
            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full ${
                  isMuted ? 'bg-red-500' : 'bg-gray-700'
                } text-white`}
              >
                {isMuted ? (
                  <SpeakerXMarkIcon className="h-6 w-6" />
                ) : (
                  <MicrophoneIcon className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${
                  isVideoOff ? 'bg-red-500' : 'bg-gray-700'
                } text-white`}
              >
                {isVideoOff ? (
                  <VideoCameraSlashIcon className="h-6 w-6" />
                ) : (
                  <VideoCameraIcon className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={handleEndCall}
                className="p-3 rounded-full bg-red-600 text-white"
              >
                <PhoneIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Consultation Modal */}
      {showNewConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Schedule New Consultation</h3>
              <button
                onClick={() => setShowNewConsultationModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleNewConsultation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={newConsultation.patientName}
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
                  value={newConsultation.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={newConsultation.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newConsultation.date}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={newConsultation.time}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={newConsultation.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Initial Consultation">Initial Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <select
                  name="duration"
                  value={newConsultation.duration}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="15 minutes">15 minutes</option>
                  <option value="30 minutes">30 minutes</option>
                  <option value="45 minutes">45 minutes</option>
                  <option value="60 minutes">60 minutes</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewConsultationModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Reschedule Modal */}
      {showRescheduleModal && consultationToReschedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Reschedule Consultation</h3>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                <p className="mt-1 text-sm text-gray-500">{consultationToReschedule.patientName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={rescheduleData.date}
                  onChange={handleRescheduleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={rescheduleData.time}
                  onChange={handleRescheduleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <select
                  name="duration"
                  value={rescheduleData.duration}
                  onChange={handleRescheduleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="15 minutes">15 minutes</option>
                  <option value="30 minutes">30 minutes</option>
                  <option value="45 minutes">45 minutes</option>
                  <option value="60 minutes">60 minutes</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowRescheduleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
