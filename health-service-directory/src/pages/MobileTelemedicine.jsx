import React, { useState } from 'react';
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

export default function MobileTelemedicine() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showConsultation, setShowConsultation] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
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
            <button className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg flex items-center justify-center">
              <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
              Message
            </button>
          </>
        ) : (
          <>
            <button className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg flex items-center justify-center">
              <UserIcon className="h-4 w-4 mr-1" />
              Doctor Profile
            </button>
            <Link 
              to={`/appointments/new?doctor=${consultation.id}`}
              className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg flex items-center justify-center"
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
  const renderVideoConsultation = () => (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <button 
          onClick={endConsultation}
          className="p-2 rounded-full bg-gray-800"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="text-center">
          <h3 className="font-medium">{selectedDoctor.doctorName}</h3>
          <p className="text-xs text-gray-400">{selectedDoctor.specialty}</p>
        </div>
        <div className="w-9"></div> {/* Spacer for alignment */}
      </div>
      
      {/* Video area */}
      <div className="flex-1 relative">
        {/* Doctor video (placeholder) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={selectedDoctor.image} 
            alt={selectedDoctor.doctorName} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400?text=Video';
            }}
          />
        </div>
        
        {/* Self video (placeholder) */}
        <div className="absolute bottom-4 right-4 w-1/3 aspect-video bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
          <div className="w-full h-full flex items-center justify-center text-white">
            <UserIcon className="h-8 w-8" />
          </div>
        </div>
        
        {/* Call duration */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full">
          00:05:32
        </div>
      </div>
      
      {/* Controls */}
      <div className="bg-gray-900 text-white p-4">
        <div className="flex justify-around">
          <button className="p-3 rounded-full bg-gray-800">
            <MicrophoneIcon className="h-6 w-6" />
          </button>
          <button className="p-3 rounded-full bg-gray-800">
            <VideoCameraIcon className="h-6 w-6" />
          </button>
          <button className="p-3 rounded-full bg-gray-800">
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
          </button>
          <button 
            onClick={endConsultation}
            className="p-3 rounded-full bg-red-600"
          >
            <PhoneIcon className="h-6 w-6 transform rotate-135" />
          </button>
        </div>
      </div>
      
      {/* Chat overlay */}
      <div className="absolute bottom-20 right-4 w-2/3 bg-white rounded-t-xl shadow-lg">
        <div className="p-3 border-b flex justify-between items-center">
          <h4 className="font-medium text-sm">Chat</h4>
          <button className="p-1">
            <XMarkIcon className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <div className="p-3 h-40 overflow-y-auto">
          <div className="mb-2">
            <p className="text-xs text-gray-500">Dr. Ngono Marie</p>
            <div className="bg-gray-100 p-2 rounded-lg text-sm inline-block">
              Hello, how are you feeling today?
            </div>
          </div>
          <div className="mb-2 text-right">
            <p className="text-xs text-gray-500">You</p>
            <div className="bg-blue-100 p-2 rounded-lg text-sm inline-block">
              I've been having chest pain since yesterday.
            </div>
          </div>
        </div>
        <div className="p-2 border-t flex">
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 p-2 text-sm border rounded-l-lg focus:outline-none"
          />
          <button className="bg-blue-600 text-white p-2 rounded-r-lg">
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
  
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
    </>
  );
}
