import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoCameraIcon, ClockIcon, CalendarIcon, UserCircleIcon, ArrowRightIcon, BellIcon } from '@heroicons/react/24/outline';
import ConsultationDetailsModal from './ConsultationDetailsModal';
import { toast } from 'react-hot-toast';

export default function TelemedicineSection() {
  const navigate = useNavigate();
  const [upcomingConsultations, setUpcomingConsultations] = useState([]);
  const [pastConsultations, setPastConsultations] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock data - will be replaced with API calls
  useEffect(() => {
    // Get current date and time for creating immediate consultation
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    
    // Simulate API fetch
    setUpcomingConsultations([
      {
        id: 1,
        doctorName: 'Dr. Sarah Wilson',
        specialty: 'Cardiologist',
        date: '2025-04-30',
        time: '14:30',
        status: 'scheduled',
        duration: 30,
        notes: 'Follow-up appointment for heart condition'
      },
      {
        id: 2,
        doctorName: 'Dr. Michael Chen',
        specialty: 'Dermatologist',
        date: '2025-05-02',
        time: '10:15',
        status: 'scheduled',
        duration: 20,
        notes: 'Skin rash consultation'
      },
      {
        id: 3,
        doctorName: 'Dr. James Taylor',
        specialty: 'General Practitioner',
        date: currentDate,
        time: formattedTime,
        status: 'scheduled',
        duration: 15,
        notes: 'Urgent consultation for flu symptoms',
        isNow: true
      }
    ]);

    setPastConsultations([
      {
        id: 101,
        doctorName: 'Dr. Emily Brown',
        specialty: 'General Practitioner',
        date: '2025-04-15',
        time: '09:00',
        status: 'completed',
        duration: 25,
        notes: 'General check-up',
        summary: 'Patient reported mild symptoms of seasonal allergies. Prescribed antihistamines.'
      },
      {
        id: 102,
        doctorName: 'Dr. James Taylor',
        specialty: 'Neurologist',
        date: '2025-04-10',
        time: '16:45',
        status: 'completed',
        duration: 40,
        notes: 'Headache assessment',
        summary: 'Patient experiencing tension headaches. Recommended stress management techniques and prescribed pain relief.'
      }
    ]);
  }, []);

  const handleStartConsultation = (consultationId) => {
    // Show a loading toast
    toast.loading('Preparing your consultation...', { duration: 1500 });
    
    // Redirect to telemedicine page with consultation ID
    setTimeout(() => {
      navigate('/telemedicine', { 
        state: { 
          startSession: true,
          consultationId: consultationId,
          returnTo: '/dashboard/patient'
        } 
      });
    }, 1500);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const getTimeUntilConsultation = (dateString, timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const consultationDate = new Date(dateString);
    consultationDate.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    const diffMs = consultationDate - now;
    
    if (diffMs < 0) return 'Past';
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffHours > 24) {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} day${diffDays > 1 ? 's' : ''} away`;
    }
    
    if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} away`;
    }
    
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} away`;
  };

  const canStartConsultation = (dateString, timeString) => {
    if (!isToday(dateString)) return false;
    
    const [hours, minutes] = timeString.split(':').map(Number);
    const consultationTime = new Date();
    consultationTime.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    const diffMs = consultationTime - now;
    const diffMins = Math.floor(diffMs / 60000);
    
    // Can join 15 minutes before and up to 30 minutes after scheduled time
    return diffMins >= -15 && diffMins <= 30;
  };

  const openConsultationDetailsModal = (consultation) => {
    setSelectedConsultation(consultation);
    setShowDetailsModal(true);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Telemedicine</h2>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center px-6 py-3 rounded-xl transition-colors duration-200 ${
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <CalendarIcon className="h-5 w-5 mr-2" />
          <span>Upcoming Consultations</span>
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex items-center px-6 py-3 rounded-xl transition-colors duration-200 ${
            activeTab === 'past'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <ClockIcon className="h-5 w-5 mr-2" />
          <span>Past Consultations</span>
        </button>
      </div>

      {/* Upcoming Consultations */}
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          {upcomingConsultations.length > 0 ? (
            upcomingConsultations.map(consultation => (
              <div key={consultation.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {consultation.isNow && (
                  <div className="bg-red-50 px-6 py-3 border-b border-red-100 flex justify-between items-center">
                    <div className="flex items-center">
                      <BellIcon className="h-5 w-5 text-red-600 mr-2 animate-pulse" />
                      <p className="text-sm font-medium text-red-800">Consultation starting now!</p>
                    </div>
                    <span className="inline-flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800">{consultation.doctorName}</h3>
                      <p className="text-gray-600">{consultation.specialty}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{formatDate(consultation.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{consultation.time}</span>
                        </div>
                        <div className="flex items-center">
                          <UserCircleIcon className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{consultation.duration} minutes</span>
                        </div>
                      </div>
                      
                      {consultation.notes && (
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">Notes:</span> {consultation.notes}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      {consultation.isNow ? (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 animate-pulse">
                          Now
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {isToday(consultation.date) ? 'Today' : getTimeUntilConsultation(consultation.date, consultation.time)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => handleStartConsultation(consultation.id)}
                      disabled={!consultation.isNow && !canStartConsultation(consultation.date, consultation.time)}
                      className={`inline-flex items-center px-6 py-3 rounded-lg text-white font-medium transition-colors duration-200 ${
                        consultation.isNow || canStartConsultation(consultation.date, consultation.time)
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <VideoCameraIcon className={`h-5 w-5 mr-2 ${consultation.isNow ? 'animate-pulse' : ''}`} />
                      {consultation.isNow 
                        ? 'Join Now'
                        : canStartConsultation(consultation.date, consultation.time)
                          ? 'Start Consultation'
                          : 'Not Available Yet'}
                    </button>
                  </div>
                </div>
                
                {(consultation.isNow || canStartConsultation(consultation.date, consultation.time)) && (
                  <div className={`${consultation.isNow ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'} px-6 py-3 border-t`}>
                    <p className={`text-sm ${consultation.isNow ? 'text-red-800' : 'text-green-800'} flex items-center`}>
                      <span className="font-medium">{consultation.isNow ? 'Your doctor is waiting!' : 'Your consultation is ready!'}</span>
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                      <span className="ml-2">{consultation.isNow ? 'Join immediately' : 'Join now to avoid waiting'}</span>
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No upcoming consultations</h3>
              <p className="mt-1 text-gray-500">
                You don't have any telemedicine consultations scheduled.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/appointments')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Schedule a Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Past Consultations */}
      {activeTab === 'past' && (
        <div className="space-y-6">
          {pastConsultations.length > 0 ? (
            pastConsultations.map(consultation => (
              <div key={consultation.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800">{consultation.doctorName}</h3>
                      <p className="text-gray-600">{consultation.specialty}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{formatDate(consultation.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{consultation.time}</span>
                        </div>
                        <div className="flex items-center">
                          <UserCircleIcon className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{consultation.duration} minutes</span>
                        </div>
                      </div>
                      
                      {consultation.summary && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Consultation Summary:</span> {consultation.summary}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      onClick={() => {
                        setSelectedConsultation(consultation);
                        setShowDetailsModal(true);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        // Navigate to appointments page with pre-filled data for booking a follow-up
                        navigate('/appointments', { 
                          state: { 
                            bookFollowUp: true,
                            doctorName: consultation.doctorName,
                            specialty: consultation.specialty,
                            isFollowUp: true,
                            previousConsultation: consultation.id
                          } 
                        });
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Book Follow-up
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No past consultations</h3>
              <p className="mt-1 text-gray-500">
                You haven't had any telemedicine consultations yet.
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Consultation Details Modal */}
      <ConsultationDetailsModal 
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        consultation={selectedConsultation}
      />
    </div>
  );
}
