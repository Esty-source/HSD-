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
} from '@heroicons/react/24/outline';

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
      setError('Unable to access camera or microphone. Please check your permissions.');
      setConnectionStatus('disconnected');
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
    <div className="w-full max-w-none">
      <div className="w-full bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Telemedicine</h1>
          <p className="mt-2 text-sm text-gray-700">
            Connect with healthcare providers through video consultations
          </p>
        </div>
      </div>
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        {/* Doctor Info Card */}
        <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex items-center">
                <div className="h-16 w-16 flex-shrink-0">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={appointment?.doctor?.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}
                    alt={appointment?.doctor?.name || 'Doctor'}
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {appointment?.doctor?.name || 'Dr. Sarah Johnson'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {appointment?.doctor?.specialty || 'General Practitioner'}
                  </p>
                  <div className="mt-1 flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${
                      connectionStatus === 'connected' ? 'bg-green-400' : 
                      connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`} />
                    <span className="ml-2 text-sm text-gray-500">
                      {connectionStatus === 'connected' ? 'Online' : 
                       connectionStatus === 'connecting' ? 'Connecting...' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex md:ml-4 md:mt-0">
                {!isCallActive ? (
                  <button
                    onClick={startCall}
                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <VideoCameraIcon className="mr-2 h-5 w-5" />
                    Start Video Call
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={toggleVideo}
                      className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                        isVideoEnabled 
                          ? 'bg-gray-600 text-white hover:bg-gray-500' 
                          : 'bg-red-600 text-white hover:bg-red-500'
                      }`}
                    >
                      <VideoCameraIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={toggleAudio}
                      className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                        isAudioEnabled 
                          ? 'bg-gray-600 text-white hover:bg-gray-500' 
                          : 'bg-red-600 text-white hover:bg-red-500'
                      }`}
                    >
                      <MicrophoneIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={toggleScreenShare}
                      className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                        isScreenSharing 
                          ? 'bg-blue-600 text-white hover:bg-blue-500' 
                          : 'bg-gray-600 text-white hover:bg-gray-500'
                      }`}
                    >
                      <ComputerDesktopIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={endCall}
                      className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                    >
                      <PhoneXMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Video Section */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-lg bg-gray-900 shadow">
              <div className="relative aspect-video">
                {isCallActive ? (
                  <>
                    <video
                      ref={remoteVideoRef}
                      autoPlay
                      playsInline
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 h-32 w-48 overflow-hidden rounded-lg bg-black">
                      <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-800">
                    <div className="text-center">
                      <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-semibold text-gray-200">
                        No video call in progress
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Click "Start Video Call" to begin your consultation
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Call Quality Indicator */}
            {isCallActive && (
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${
                    callQuality === 'good' ? 'bg-green-400' :
                    callQuality === 'fair' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`} />
                  <span className="ml-2 text-sm text-gray-600">
                    {callQuality === 'good' ? 'Excellent Connection' :
                     callQuality === 'fair' ? 'Fair Connection' :
                     'Poor Connection'}
                  </span>
                </div>
                {isScreenSharing && (
                  <span className="flex items-center text-sm text-blue-600">
                    <ComputerDesktopIcon className="mr-1 h-4 w-4" />
                    Screen Sharing Active
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-1">
            <div className="flex h-[calc(100vh-16rem)] flex-col overflow-hidden rounded-lg bg-white shadow">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900">Chat</h3>
                <span className="text-sm text-gray-500">
                  {messages.length} messages
                </span>
              </div>
              <div className="h-96 overflow-y-auto p-4">
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

        {/* Quick Responses */}
        <div className="relative mt-4">
          <button
            onClick={() => setShowQuickResponses(!showQuickResponses)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Quick Responses
          </button>
          {showQuickResponses && (
            <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg bg-white p-2 shadow-lg">
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

        {/* Shared Files */}
        {sharedFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900">Shared Files</h4>
            <div className="mt-2 space-y-2">
              {sharedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-2"
                >
                  <div className="flex items-center">
                    <DocumentDuplicateIcon className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                  </div>
                  <a
                    href={file.url}
                    download={file.name}
                    className="text-sm text-blue-600 hover:text-blue-500"
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
  );
}
