import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  VideoCameraIcon,
  MicrophoneIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  XMarkIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function Telemedicine() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [appointment, setAppointment] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);

  useEffect(() => {
    // Handle appointment state
    if (location.state?.appointment) {
      setAppointment(location.state.appointment);
      // Load chat messages from localStorage
      const storedMessages = localStorage.getItem(`chat_${location.state.appointment.doctor.id}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        // Initialize with a welcome message
        const initialMessage = {
          id: 1,
          sender: 'doctor',
          message: "Hello! I'll be with you shortly. Please let me know if you have any questions.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([initialMessage]);
        localStorage.setItem(
          `chat_${location.state.appointment.doctor.id}`,
          JSON.stringify([initialMessage])
        );
      }
    } else {
      setError('No appointment information found. Please schedule an appointment first.');
    }
  }, [location.state]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'patient',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setMessage('');

      // Store messages in localStorage
      if (appointment) {
        localStorage.setItem(
          `chat_${appointment.doctor.id}`,
          JSON.stringify(updatedMessages)
        );
      }
    }
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    if (!isVideoEnabled) {
      // Request video permissions
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
          setError('');
        })
        .catch((err) => {
          setError('Unable to access camera. Please check your permissions.');
          setIsVideoEnabled(false);
        });
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (!isAudioEnabled) {
      // Request audio permissions
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          setError('');
        })
        .catch((err) => {
          setError('Unable to access microphone. Please check your permissions.');
          setIsAudioEnabled(false);
        });
    }
  };

  const startCall = () => {
    // Request both video and audio permissions
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() => {
        setIsCallActive(true);
        setError('');
      })
      .catch((err) => {
        setError('Unable to access camera or microphone. Please check your permissions.');
      });
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsVideoEnabled(true);
    setIsAudioEnabled(true);
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
          <div className="flex items-center justify-center text-red-600">
            <ExclamationTriangleIcon className="h-12 w-12" />
          </div>
          <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">Error</h2>
          <p className="mt-2 text-center text-gray-600">{error}</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/appointments')}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              Return to Appointments
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Video Area */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow">
              {isCallActive ? (
                <div className="relative aspect-video w-full rounded-lg bg-gray-900">
                  {!isVideoEnabled && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-24 w-24 rounded-full bg-gray-700">
                        <div className="flex h-full items-center justify-center text-3xl text-white">
                          {appointment.doctor.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button
                      onClick={toggleVideo}
                      className={`rounded-full p-2 ${
                        isVideoEnabled ? 'bg-gray-700' : 'bg-red-600'
                      }`}
                    >
                      <VideoCameraIcon className="h-6 w-6 text-white" />
                    </button>
                    <button
                      onClick={toggleAudio}
                      className={`rounded-full p-2 ${
                        isAudioEnabled ? 'bg-gray-700' : 'bg-red-600'
                      }`}
                    >
                      <MicrophoneIcon className="h-6 w-6 text-white" />
                    </button>
                    <button
                      onClick={endCall}
                      className="rounded-full bg-red-600 p-2 hover:bg-red-700"
                    >
                      <PhoneIcon className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center rounded-lg bg-gray-100">
                  <VideoCameraIcon className="h-16 w-16 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Ready to start your consultation?
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Click the button below to begin your video call
                  </p>
                  <button
                    onClick={startCall}
                    className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                  >
                    <VideoCameraIcon className="mr-2 h-5 w-5" />
                    Start Video Call
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Chat and Info Sidebar */}
          <div className="space-y-6">
            {/* Doctor Info */}
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center space-x-4">
                <img
                  src={appointment.doctor.image}
                  alt={appointment.doctor.name}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{appointment.doctor.name}</h3>
                  <p className="text-sm text-gray-500">{appointment.doctor.specialty}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>Appointment Time: {appointment.time}</p>
                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Chat */}
            <div className="rounded-lg bg-white shadow">
              <div className="flex items-center justify-between border-b p-4">
                <h3 className="font-medium text-gray-900">Chat</h3>
                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="rounded-md p-1 hover:bg-gray-100"
                >
                  {isChatOpen ? (
                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChatBubbleLeftIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {isChatOpen && (
                <>
                  <div className="h-96 overflow-y-auto p-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`mb-4 flex ${
                          msg.sender === 'patient' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            msg.sender === 'patient'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p
                            className={`mt-1 text-xs ${
                              msg.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t p-4">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                      />
                      <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
