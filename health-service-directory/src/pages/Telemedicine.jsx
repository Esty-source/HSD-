import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  VideoCameraIcon,
  MicrophoneIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  XMarkIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  ComputerDesktopIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

export default function Telemedicine() {
  const location = useLocation();
  const navigate = useNavigate();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [appointment, setAppointment] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [callQuality, setCallQuality] = useState('good');

  useEffect(() => {
    // Handle appointment state
    if (location.state?.appointment) {
      setAppointment(location.state.appointment);
      const storedMessages = localStorage.getItem(`chat_${location.state.appointment.doctor.id}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
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
      // Redirect to appointments page after a short delay
      setTimeout(() => {
        navigate('/appointments');
      }, 3000);
    }

    // Cleanup function
    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      stopMediaTracks();
    };
  }, [location.state, navigate]);

  const stopMediaTracks = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const initializePeerConnection = () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ]
    };

    peerConnection.current = new RTCPeerConnection(configuration);

    peerConnection.current.onicecandidate = event => {
      if (event.candidate) {
        // Send candidate to signaling server
        console.log('New ICE candidate:', event.candidate);
      }
    };

    peerConnection.current.ontrack = event => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peerConnection.current.onconnectionstatechange = () => {
      setConnectionStatus(peerConnection.current.connectionState);
    };
  };

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: isVideoEnabled, 
        audio: isAudioEnabled 
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      initializePeerConnection();

      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream);
      });

      setIsCallActive(true);
      setError('');
      
      // Monitor call quality
      setInterval(() => {
        if (peerConnection.current) {
          peerConnection.current.getStats().then(stats => {
            stats.forEach(report => {
              if (report.type === 'media-source') {
                const bitrate = report.bitrate;
                if (bitrate < 1000000) setCallQuality('poor');
                else if (bitrate < 2500000) setCallQuality('fair');
                else setCallQuality('good');
              }
            });
          });
        }
      }, 5000);

    } catch (err) {
      setError('Unable to access camera or microphone. Please check your permissions.');
      console.error('Error starting call:', err);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true,
          audio: true
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }

        screenStream.getTracks().forEach(track => {
          const sender = peerConnection.current.getSenders().find(s => 
            s.track.kind === track.kind
          );
          if (sender) {
            sender.replaceTrack(track);
          }
        });

        setIsScreenSharing(true);
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: isVideoEnabled, 
          audio: isAudioEnabled 
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        stream.getTracks().forEach(track => {
          const sender = peerConnection.current.getSenders().find(s => 
            s.track.kind === track.kind
          );
          if (sender) {
            sender.replaceTrack(track);
          }
        });

        setIsScreenSharing(false);
      }
    } catch (err) {
      console.error('Error toggling screen share:', err);
      setError('Unable to share screen. Please check your permissions.');
    }
  };

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

  const endCall = () => {
    setIsCallActive(false);
    setIsVideoEnabled(true);
    setIsAudioEnabled(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {error ? (
          <div className="rounded-md bg-red-50 p-4 mt-16">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  <p className="mt-1">Redirecting to appointments page...</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Connection Status Banner */}
            <div className={`mb-4 rounded-md p-4 ${
              connectionStatus === 'connected' ? 'bg-green-50' : 
              connectionStatus === 'connecting' ? 'bg-yellow-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-2 ${
                  connectionStatus === 'connected' ? 'bg-green-400' :
                  connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <p className={`text-sm ${
                  connectionStatus === 'connected' ? 'text-green-700' :
                  connectionStatus === 'connecting' ? 'text-yellow-700' : 'text-red-700'
                }`}>
                  {connectionStatus === 'connected' ? 'Connected' :
                   connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
                </p>
                {callQuality !== 'good' && connectionStatus === 'connected' && (
                  <p className="ml-4 text-sm text-yellow-700">
                    Call quality: {callQuality}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Video Area */}
              <div className="lg:col-span-2">
                <div className="rounded-lg bg-white p-6 shadow">
                  {isCallActive ? (
                    <div className="relative aspect-video w-full rounded-lg bg-gray-900">
                      <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover rounded-lg"
                      />
                      <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute bottom-4 right-20 h-32 w-48 rounded-lg object-cover shadow-lg"
                      />
                      {!isVideoEnabled && !isScreenSharing && (
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
                          title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
                        >
                          <VideoCameraIcon className="h-6 w-6 text-white" />
                        </button>
                        <button
                          onClick={toggleAudio}
                          className={`rounded-full p-2 ${
                            isAudioEnabled ? 'bg-gray-700' : 'bg-red-600'
                          }`}
                          title={isAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
                        >
                          <MicrophoneIcon className="h-6 w-6 text-white" />
                        </button>
                        <button
                          onClick={toggleScreenShare}
                          className={`rounded-full p-2 ${
                            isScreenSharing ? 'bg-blue-600' : 'bg-gray-700'
                          }`}
                          title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
                        >
                          <ComputerDesktopIcon className="h-6 w-6 text-white" />
                        </button>
                        <button
                          onClick={endCall}
                          className="rounded-full bg-red-600 p-2 hover:bg-red-700"
                          title="End call"
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
          </>
        )}
      </div>
    </div>
  );
}
