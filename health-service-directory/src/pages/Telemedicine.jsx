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
  PhoneXMarkIcon,
  ExclamationCircleIcon,
  PaperAirplaneIcon,
  ClockIcon,
  ArrowPathIcon,
  UserCircleIcon,
  CogIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  FaceSmileIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { VideoCameraIcon as VideoCameraSolid, MicrophoneIcon as MicrophoneSolid } from '@heroicons/react/24/solid';

const mockDoctor = {
  id: 'mock-doctor',
  name: 'Dr. Sarah Johnson',
  specialty: 'General Practitioner',
  image: 'https://randomuser.me/api/portraits/women/76.jpg',
};

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
  const [callDuration, setCallDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [quickResponses] = useState([
    "I'm experiencing technical difficulties.",
    "Could you please speak louder?",
    "Could you please repeat that?",
    "One moment please.",
    "I understand, thank you.",
  ]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [showQuickResponses, setShowQuickResponses] = useState(false);

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
      // Use mock data instead of showing error
      setAppointment({
        doctor: mockDoctor,
        date: new Date(),
        time: '10:00 AM',
      });
      const storedMessages = localStorage.getItem(`chat_${mockDoctor.id}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        const initialMessage = {
          id: 1,
          sender: 'doctor',
          message: "Welcome to the demo consultation! I'm Dr. Sarah Johnson. How can I help you today?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([initialMessage]);
        localStorage.setItem(
          `chat_${mockDoctor.id}`,
          JSON.stringify([initialMessage])
        );
      }
    }

    // Initialize WebRTC
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(() => {
          setError('');
        })
        .catch((err) => {
          if (err.name === 'NotAllowedError') {
            setError('Please allow camera and microphone access to use video consultation.');
          } else if (err.name === 'NotFoundError') {
            setError('No camera or microphone found. Please check your devices.');
          } else {
            setError('Unable to access media devices. Please check your permissions.');
          }
        });
    } else {
      setError('Your browser does not support video calls. Please use a modern browser.');
    }

    // Cleanup function
    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      stopMediaTracks();
    };
  }, [location.state]);

  useEffect(() => {
    let timer;
    if (isCallActive) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCallActive]);

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
      setConnectionStatus('connecting');
      // Check permissions before requesting
      if (navigator.permissions) {
        const camPerm = await navigator.permissions.query({ name: 'camera' });
        const micPerm = await navigator.permissions.query({ name: 'microphone' });
        if (camPerm.state === 'denied' || micPerm.state === 'denied') {
          setError('Camera or microphone access has been denied. Please enable permissions in your browser settings and reload the page.');
          setConnectionStatus('disconnected');
          return;
        }
      }
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Your browser does not support video calls.');
        setConnectionStatus('disconnected');
        return;
      }
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
      setConnectionStatus('connected');
      
      // Simulate remote video for demo
      setTimeout(async () => {
        try {
          const remoteStream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
          });
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        } catch (err) {
          console.error('Error simulating remote video:', err);
        }
      }, 1000);

    } catch (err) {
      if (err && err.name === 'NotAllowedError') {
        setError('Camera or microphone access was denied. Please enable permissions in your browser settings (often a lock icon near the address bar) and reload the page.');
      } else {
        setError('Unable to access camera or microphone. Please check your permissions.');
      }
      setConnectionStatus('disconnected');
      console.error('Error starting call:', err);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        setError('Your browser does not support screen sharing.');
        return;
      }
      if (!isScreenSharing) {
        try {
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
        } catch (err) {
          if (err && err.name === 'NotAllowedError') {
            setError('Screen sharing was denied. Please enable permissions in your browser settings and try again.');
          } else {
            setError('Unable to share screen. Please check your permissions.');
          }
          return;
        }
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
      if (err && err.name === 'NotAllowedError') {
        setError('Screen sharing was denied. Please enable permissions in your browser settings and try again.');
      } else {
        setError('Unable to share screen. Please check your permissions.');
      }
      console.error('Error toggling screen share:', err);
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

      // Simulate doctor's response
      setTimeout(() => {
        const responses = [
          "I understand. Could you tell me more about your symptoms?",
          "How long have you been experiencing this?",
          "Have you taken any medication for this condition?",
          "I recommend we discuss this further in our video consultation. Shall we start the call?",
          "That's helpful information. Let me make a note of that.",
          "Have you noticed any other symptoms?",
          "I'll help you address this concern. First, let me ask you a few questions.",
        ];

        const doctorMessage = {
          id: messages.length + 2,
          sender: 'doctor',
          message: responses[Math.floor(Math.random() * responses.length)],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedMessagesWithResponse = [...updatedMessages, doctorMessage];
        setMessages(updatedMessagesWithResponse);

        if (appointment) {
          localStorage.setItem(
            `chat_${appointment.doctor.id}`,
            JSON.stringify(updatedMessagesWithResponse)
          );
        }
      }, 2000);
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

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileShare = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const newFile = {
        id: sharedFiles.length + 1,
        name: file.name,
        url: fileUrl,
        type: file.type,
        size: file.size,
        sender: 'patient',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setSharedFiles([...sharedFiles, newFile]);
      
      // Send file info in chat
      const fileMessage = {
        id: messages.length + 1,
        sender: 'patient',
        message: `Shared file: ${file.name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFile: true,
        file: newFile,
      };
      const updatedMessages = [...messages, fileMessage];
      setMessages(updatedMessages);
      if (appointment) {
        localStorage.setItem(
          `chat_${appointment.doctor.id}`,
          JSON.stringify(updatedMessages)
        );
      }
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Start recording logic here
    } else {
      setIsRecording(false);
      // Stop recording logic here
    }
  };

  const sendQuickResponse = (response) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'patient',
      message: response,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setShowQuickResponses(false);
    if (appointment) {
      localStorage.setItem(
        `chat_${appointment.doctor.id}`,
        JSON.stringify(updatedMessages)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-full max-w-none">
      {/* Header with appointment info */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img 
                  src={appointment?.doctor?.image || mockDoctor.image} 
                  alt={appointment?.doctor?.name || mockDoctor.name}
                  className="h-12 w-12 rounded-full border-2 border-white/50 object-cover"
                />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold">{appointment?.doctor?.name || mockDoctor.name}</h2>
                <p className="text-blue-100">{appointment?.doctor?.specialty || mockDoctor.specialty}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center rounded-full bg-white/20 px-4 py-1.5">
                <ClockIcon className="mr-2 h-5 w-5" />
                <span className="text-sm">
                  {isCallActive ? formatDuration(callDuration) : 'Appointment: ' + (appointment?.time || '10:00 AM')}
                </span>
              </div>
              <div className="flex items-center rounded-full bg-white/20 px-4 py-1.5">
                <div className={`h-2 w-2 rounded-full mr-2 ${connectionStatus === 'connected' ? 'bg-green-400' : connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'}`} />
                <span className="text-sm capitalize">{connectionStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Error alert */}
      {error && (
        <div className="w-full px-4 py-3 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-red-50 p-4 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="rounded-md bg-red-50 px-3.5 py-2 text-sm font-semibold text-red-800 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-100"
                  >
                    <ArrowPathIcon className="inline-block mr-1.5 h-4 w-4" /> Refresh Connection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        {/* Main Telemedicine Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Call Section - Takes 2/3 of the space on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Call Container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gray-900 overflow-hidden">
                {/* Remote Video (Doctor) */}
                <video
                  ref={remoteVideoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted={false}
                ></video>
                
                {/* Local Video (Patient) - Small overlay */}
                <div className="absolute bottom-4 right-4 w-1/4 aspect-video rounded-lg overflow-hidden border-2 border-white shadow-lg">
                  <video
                    ref={localVideoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    muted
                  ></video>
                  {!isVideoEnabled && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Call Quality Indicator */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/30 text-white text-sm flex items-center">
                  <div className={`h-2 w-2 rounded-full mr-2 ${
                    callQuality === 'good' ? 'bg-green-400' :
                    callQuality === 'fair' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                  <span>{callQuality === 'good' ? 'Good Connection' : callQuality === 'fair' ? 'Fair Connection' : 'Poor Connection'}</span>
                </div>
                
                {/* Call Duration */}
                {isCallActive && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/30 text-white text-sm flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1.5" />
                    {formatDuration(callDuration)}
                  </div>
                )}
                
                {/* Call Status Overlay */}
                {!isCallActive && (
                  <div className="absolute inset-0 bg-gray-900/80 flex flex-col items-center justify-center text-white">
                    <UserCircleIcon className="h-20 w-20 text-white/70 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Ready to connect with {appointment?.doctor?.name || 'Dr. Sarah Johnson'}</h3>
                    <p className="text-blue-200 mb-6">Click the button below to start your video consultation</p>
                    <button
                      onClick={startCall}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <VideoCameraIcon className="-ml-1 mr-2 h-5 w-5" />
                      Start Video Consultation
                    </button>
                  </div>
                )}
              </div>
              
              {/* Video Call Controls */}
              <div className="bg-gray-800 px-6 py-4">
                <div className="flex items-center justify-center space-x-6">
                  <button
                    onClick={toggleVideo}
                    className={`p-3 rounded-full ${isVideoEnabled ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'} hover:opacity-90 transition-colors`}
                  >
                    {isVideoEnabled ? <VideoCameraIcon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
                  </button>
                  
                  <button
                    onClick={toggleAudio}
                    className={`p-3 rounded-full ${isAudioEnabled ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'} hover:opacity-90 transition-colors`}
                  >
                    {isAudioEnabled ? <MicrophoneIcon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
                  </button>
                  
                  <button
                    onClick={toggleScreenShare}
                    className={`p-3 rounded-full ${isScreenSharing ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'} hover:opacity-90 transition-colors`}
                  >
                    <ComputerDesktopIcon className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className={`p-3 rounded-full ${isChatOpen ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'} hover:opacity-90 transition-colors`}
                  >
                    <ChatBubbleLeftIcon className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={endCall}
                    className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    <PhoneXMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Consultation Tools */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">Consultation Tools</h3>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <div className="flex flex-col h-full bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-500" />
                      Medical Notes
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">Access and share medical documents during your consultation.</p>
                    <div className="mt-auto">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileShare}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex w-full justify-center items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                      >
                        <DocumentDuplicateIcon className="mr-2 h-5 w-5 text-gray-500" />
                        Upload Document
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 sm:col-span-1">
                  <div className="flex flex-col h-full bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <VideoCameraIcon className="h-5 w-5 mr-2 text-blue-500" />
                      Recording
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">Record your consultation for future reference (with permission).</p>
                    <div className="mt-auto">
                      <button
                        onClick={toggleRecording}
                        className={`inline-flex w-full justify-center items-center rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm ${isRecording ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'}`}
                      >
                        {isRecording ? (
                          <>
                            <div className="relative mr-2">
                              <div className="h-2 w-2 rounded-full bg-white">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                              </div>
                            </div>
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <VideoCameraIcon className="mr-2 h-5 w-5 text-gray-500" />
                            Start Recording
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shared Files */}
              {sharedFiles.length > 0 && (
                <div className="border-t p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Shared Documents</h4>
                  <div className="space-y-2">
                    {sharedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                      >
                        <div className="flex items-center">
                          <DocumentDuplicateIcon className="h-5 w-5 text-blue-500" />
                          <span className="ml-2 text-sm font-medium text-gray-900">{file.name}</span>
                        </div>
                        <a
                          href={file.url}
                          download={file.name}
                          className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Chat Section - Takes 1/3 of the space on large screens */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900">Chat with {appointment?.doctor?.name || 'Dr. Sarah Johnson'}</h3>
                <span className="text-sm text-gray-500">
                  {messages.length} messages
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === 'patient' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg px-4 py-2 ${
                          msg.sender === 'patient'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p
                          className={`mt-1 text-xs ${
                            msg.sender === 'patient'
                              ? 'text-blue-200'
                              : 'text-gray-500'
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    Send
                  </button>
                </form>
              </div>
              
              {/* Quick Responses */}
              <div className="relative border-t p-3">
                <button
                  onClick={() => setShowQuickResponses(!showQuickResponses)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <FaceSmileIcon className="h-4 w-4 mr-1.5" />
                  Quick Responses
                  {showQuickResponses ? <ChevronUpIcon className="h-4 w-4 ml-1" /> : <ChevronDownIcon className="h-4 w-4 ml-1" />}
                </button>
                {showQuickResponses && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg bg-white p-2 shadow-lg border border-gray-200">
                    <div className="space-y-1">
                      {quickResponses.map((response, index) => (
                        <button
                          key={index}
                          onClick={() => sendQuickResponse(response)}
                          className="block w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {response}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Call Controls */}
        {isCallActive && (
          <div className="mt-4 flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-2" />
                <span className="text-sm font-medium">{formatDuration(callDuration)}</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileShare}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                >
                  <DocumentDuplicateIcon className="h-5 w-5" />
                </label>
                <button
                  onClick={toggleRecording}
                  className={`rounded-md p-2 ${
                    isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  } hover:bg-gray-200`}
                >
                  <div className="relative">
                    <VideoCameraIcon className="h-5 w-5" />
                    {isRecording && (
                      <div className="absolute -right-1 -top-1 h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
