import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  VideoCameraIcon,
  CalendarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  UserIcon,
  ArrowLeftIcon,
  PhoneIcon,
  MicrophoneIcon,
  XMarkIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import MobileLayout from '../components/responsive/MobileLayout';
import ChatComponent from '../components/chat/ChatComponent';
import { Modal } from '../components/common/Modal';

export default function MobileTelemedicine() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showConsultation, setShowConsultation] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageConsultation, setMessageConsultation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [chatVisible, setChatVisible] = useState(false);
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summaryConsultation, setSummaryConsultation] = useState(null);
  
  // Mock data for upcoming and past consultations
  const upcomingConsultations = [
    {
      id: 1,
      doctorName: 'Dr. Ngono Marie',
      specialty: 'Cardiologist',
      date: '2024-05-15',
      time: '09:00 AM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      doctorName: 'Dr. Fon Peter',
      specialty: 'Pediatrician',
      date: '2024-05-20',
      time: '02:30 PM',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      rating: 4.6,
      reviews: 98
    }
  ];
  
  const pastConsultations = [
    {
      id: 3,
      doctorName: 'Dr. Biya Rose',
      specialty: 'Dermatologist',
      date: '2024-05-01',
      time: '11:15 AM',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      rating: 4.9,
      reviews: 156,
      summary: 'Discussed skin rash treatment and prescribed medication. Follow-up in 2 weeks.'
    },
    {
      id: 4,
      doctorName: 'Dr. Kamto James',
      specialty: 'General Medicine',
      date: '2024-04-20',
      time: '10:00 AM',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      rating: 4.7,
      reviews: 112,
      summary: 'Reviewed blood test results. All values normal. Recommended vitamin D supplement.'
    }
  ];
  
  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          i < Math.floor(rating) ? (
            <StarIconSolid key={i} className="h-3 w-3 text-yellow-400" />
          ) : (
            <StarIcon key={i} className="h-3 w-3 text-yellow-400" />
          )
        ))}
      </div>
    );
  };
  
  // Start consultation
  const startConsultation = (doctor) => {
    setSelectedDoctor(doctor);
    setShowConsultation(true);
  };
  
  // End consultation
  const endConsultation = () => {
    setShowConsultation(false);
    setSelectedDoctor(null);
  };
  
  // Add handlers for mic, video, recording
  const handleToggleMic = () => setIsMicOn((v) => !v);
  const handleToggleVideo = () => setIsVideoOn((v) => !v);
  const handleToggleRecording = () => {
    if (!isRecording) {
      // Start recording (assume user video ref is available)
      if (window.stream) {
        const recorder = new window.MediaRecorder(window.stream);
        setMediaRecorder(recorder);
        setRecordedChunks([]);
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) setRecordedChunks((prev) => [...prev, e.data]);
        };
        recorder.start();
        setIsRecording(true);
      }
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setIsRecording(false);
      }
    }
  };
  
  const openMessageModal = (consultation) => {
    setMessageConsultation(consultation);
    setShowMessageModal(true);
    setMessageText('');
  };
  const closeMessageModal = () => {
    setShowMessageModal(false);
    setMessageConsultation(null);
    setMessageText('');
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    // For now, just close the modal and clear the message
    closeMessageModal();
    // Optionally, show a toast or feedback here
  };
  
  // Add handler to open summary modal
  const openSummaryModal = (consultation) => {
    setSummaryConsultation(consultation);
    setShowSummaryModal(true);
  };
  const closeSummaryModal = () => {
    setShowSummaryModal(false);
    setSummaryConsultation(null);
  };
  
  // Render consultation card
  const renderConsultationCard = (consultation, isPast = false) => (
    <div key={consultation.id} className="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div className="flex items-start">
        <img 
          src={consultation.image} 
          alt={consultation.doctorName} 
          className="w-16 h-16 rounded-full object-cover mr-3"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/64?text=Doctor';
          }}
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{consultation.doctorName}</h3>
          <p className="text-xs text-gray-500">{consultation.specialty}</p>
          
          <div className="flex items-center mt-1">
            {renderStars(consultation.rating)}
            <span className="text-xs text-gray-500 ml-1">
              {consultation.rating} ({consultation.reviews})
            </span>
          </div>
          
          <div className="flex items-center mt-2 text-xs text-gray-700">
            <CalendarIcon className="h-3 w-3 mr-1" />
            <span>{consultation.date}</span>
            <ClockIcon className="h-3 w-3 ml-2 mr-1" />
            <span>{consultation.time}</span>
          </div>
          
          {isPast && consultation.summary && (
            <div className="mt-2 text-xs text-gray-600 border-t pt-2">
              <p className="font-medium">Summary:</p>
              <p>{consultation.summary}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        {!isPast ? (
          <>
            <button 
              onClick={() => startConsultation(consultation)}
              className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg flex items-center justify-center"
            >
              <VideoCameraIcon className="h-4 w-4 mr-1" />
              Start Consultation
            </button>
            <button
              className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg flex items-center justify-center"
              onClick={() => openMessageModal(consultation)}
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
              Message
            </button>
          </>
        ) : (
          <>
            <Link
              to={`/doctor-profile/${consultation.id}`}
              className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg flex items-center justify-center"
            >
              <UserIcon className="h-4 w-4 mr-1" />
              Doctor Profile
            </Link>
            <button
              className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg flex items-center justify-center"
              onClick={() => openSummaryModal(consultation)}
            >
              View Summary
            </button>
            <Link 
              to={`/appointments/new?doctor=${consultation.id}`}
              className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg flex items-center justify-center"
            >
              <CalendarIcon className="h-4 w-4 mr-1" />
              Book Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
  
  // Render video consultation screen
  const renderVideoConsultation = () => {
    return (
      <div className="fixed inset-0 bg-black">
        {/* Video container */}
        <div className="relative h-full">
          {/* Remote video (full screen) */}
          <video
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            ref={remoteVideoRef}
          />
          
          {/* Local video (picture-in-picture) */}
          <div className="absolute bottom-20 right-4 w-1/4 aspect-video">
            <video
              className="w-full h-full object-cover rounded-lg border-2 border-white"
              autoPlay
              playsInline
              muted
              ref={localVideoRef}
            />
          </div>

          {/* Controls overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleToggleMic}
                className={`p-3 rounded-full ${
                  isMicOn ? 'bg-gray-600' : 'bg-red-600'
                }`}
              >
                <MicrophoneIcon className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={handleToggleVideo}
                className={`p-3 rounded-full ${
                  isVideoOn ? 'bg-gray-600' : 'bg-red-600'
                }`}
              >
                <VideoCameraIcon className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={() => setChatVisible(true)}
                className="p-3 rounded-full bg-gray-600"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={endConsultation}
                className="p-3 rounded-full bg-red-600"
              >
                <PhoneIcon className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>

          {/* Chat panel (slides up from bottom) */}
          <div
            className={`fixed inset-x-0 bottom-0 bg-white rounded-t-2xl transition-transform duration-300 transform ${
              chatVisible ? 'translate-y-0' : 'translate-y-full'
            }`}
            style={{ height: '70%', zIndex: 50 }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium">Chat</h3>
              <button
                onClick={() => setChatVisible(false)}
                className="p-2 text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="h-[calc(100%-4rem)]">
              <ChatComponent
                consultationId={selectedDoctor?.id}
                otherUserId={selectedDoctor?.id}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Main component render
  return (
    <>
      {showConsultation && selectedDoctor ? (
        renderVideoConsultation()
      ) : (
        <MobileLayout title="Telemedicine">
          {/* Tab navigation */}
          <div className="px-4 py-2 bg-white border-b flex">
            <button
              className={`px-4 py-2 text-sm ${activeTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-2 text-sm ${activeTab === 'past' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('past')}
            >
              Past
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4">
            {activeTab === 'upcoming' ? (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Consultations</h2>
                {upcomingConsultations.length > 0 ? (
                  upcomingConsultations.map(consultation => renderConsultationCard(consultation))
                ) : (
                  <div className="text-center py-8">
                    <VideoCameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No upcoming consultations</p>
                    <Link 
                      to="/doctor-search"
                      className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg"
                    >
                      Book a Consultation
                    </Link>
                  </div>
                )}
                
                {/* Quick tips */}
                <div className="mt-6 bg-blue-50 rounded-xl p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Telemedicine Tips</h3>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block h-4 w-4 rounded-full bg-blue-200 text-blue-800 text-xs flex items-center justify-center mr-2 mt-0.5">1</span>
                      Ensure you have a stable internet connection
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-4 w-4 rounded-full bg-blue-200 text-blue-800 text-xs flex items-center justify-center mr-2 mt-0.5">2</span>
                      Find a quiet, well-lit space for your consultation
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-4 w-4 rounded-full bg-blue-200 text-blue-800 text-xs flex items-center justify-center mr-2 mt-0.5">3</span>
                      Have your medical history and medication list ready
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-4 w-4 rounded-full bg-blue-200 text-blue-800 text-xs flex items-center justify-center mr-2 mt-0.5">4</span>
                      Test your camera and microphone before the call
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Past Consultations</h2>
                {pastConsultations.length > 0 ? (
                  pastConsultations.map(consultation => renderConsultationCard(consultation, true))
                ) : (
                  <div className="text-center py-8">
                    <VideoCameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No past consultations</p>
                  </div>
                )}
              </>
            )}
          </div>
        </MobileLayout>
      )}
      {/* Modals */}
      {showMessageModal && messageConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-4 text-blue-700">Message {messageConsultation.doctorName}</h3>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <textarea
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Type your message..."
                required
              />
              <div className="flex space-x-2 mt-4">
                <button
                  type="button"
                  onClick={closeMessageModal}
                  className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Summary Modal */}
      {showSummaryModal && summaryConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-4 text-blue-700">Consultation Summary</h3>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <img src={summaryConsultation.image} alt={summaryConsultation.doctorName} className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">{summaryConsultation.doctorName}</div>
                  <div className="text-sm text-gray-600">{summaryConsultation.specialty}</div>
                </div>
              </div>
              <div className="text-sm text-gray-700 mb-1"><CalendarIcon className="inline h-4 w-4 mr-1" /> {summaryConsultation.date}</div>
              <div className="text-sm text-gray-700 mb-1"><ClockIcon className="inline h-4 w-4 mr-1" /> {summaryConsultation.time}</div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
              <p className="text-sm text-gray-700 mb-4">
                {summaryConsultation.summary || 'No summary available for this consultation.'}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeSummaryModal}
                className="py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
