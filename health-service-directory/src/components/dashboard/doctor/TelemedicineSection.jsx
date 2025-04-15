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
  MicrophoneOffIcon,
  VideoCameraSlashIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function TelemedicineSection() {
  const [activeFilter, setActiveFilter] = useState('upcoming');
  const [selectedSession, setSelectedSession] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isInCall, setIsInCall] = useState(false);

  const filters = [
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'completed', name: 'Completed' },
    { id: 'cancelled', name: 'Cancelled' },
  ];

  // Mock consultation data
  const consultations = [
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-04-20',
      time: '10:00 AM',
      duration: '30 minutes',
      status: 'Scheduled',
      type: 'Follow-up',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-04-20',
      time: '11:30 AM',
      duration: '45 minutes',
      status: 'Scheduled',
      type: 'Initial Consultation',
      phone: '+1 (555) 987-6543',
      email: 'jane.smith@example.com'
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      date: '2024-04-19',
      time: '02:00 PM',
      duration: '30 minutes',
      status: 'Completed',
      type: 'Follow-up',
      phone: '+1 (555) 456-7890',
      email: 'robert.johnson@example.com'
    },
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

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Video Consultations</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <VideoCameraIcon className="h-5 w-5 mr-2" />
          Start New Consultation
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6">
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

      {/* Consultations List */}
      <div className="space-y-4">
        {consultations.map((consultation) => (
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
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                consultation.status === 'Scheduled'
                  ? 'bg-blue-100 text-blue-800'
                  : consultation.status === 'Completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
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
              {consultation.status === 'Scheduled' ? (
                <>
                  <button
                    onClick={() => handleJoinSession(consultation)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Join Call
                  </button>
                  <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                    Cancel
                  </button>
                </>
              ) : (
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {consultations.length === 0 && (
        <div className="text-center py-12">
          <VideoCameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No consultations found</h3>
          <p className="text-gray-500 mt-1">There are no video consultations matching your selected filter.</p>
        </div>
      )}

      {/* Session Details Modal */}
      {showDetailsModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
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
        <div className="fixed inset-0 bg-black flex flex-col">
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
                } text-white hover:bg-opacity-80 transition-colors duration-200`}
              >
                {isMuted ? (
                  <MicrophoneOffIcon className="h-6 w-6" />
                ) : (
                  <MicrophoneIcon className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${
                  isVideoOff ? 'bg-red-500' : 'bg-gray-700'
                } text-white hover:bg-opacity-80 transition-colors duration-200`}
              >
                {isVideoOff ? (
                  <VideoCameraSlashIcon className="h-6 w-6" />
                ) : (
                  <VideoCameraIcon className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={handleEndCall}
                className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 