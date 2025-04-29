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
    // Check if we're starting a session directly from the patient dashboard
    if (location.state?.startSession) {
      const consultationId = location.state.consultationId;
      console.log('Starting consultation session with ID:', consultationId);
      
      // Fetch consultation details from API or use mock data
      // For now, we'll use mock data
      setAppointment({
        id: consultationId,
        doctor: mockDoctor,
        date: new Date(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      
      // Auto-start the call after a short delay
      setTimeout(() => {
        startCall();
      }, 1000);
      
      // Initialize chat with a welcome message
      const initialMessage = {
        id: 1,
        sender: 'doctor',
        message: "Welcome to your scheduled consultation! I'm Dr. Sarah Johnson. I'll be with you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialMessage]);
    }
    // Handle regular appointment state
    else if (location.state?.appointment) {
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
    } else {
      // Reset call duration when call is not active
      setCallDuration(0);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCallActive]);

  const stopMediaTracks = () => {
    try {
      // Stop local video tracks
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => {
          try {
            track.stop();
          } catch (err) {
            console.error('Error stopping track:', err);
          }
        });
        localVideoRef.current.srcObject = null;
      }
      
      // Stop remote video tracks
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject.getTracks().forEach(track => {
          try {
            track.stop();
          } catch (err) {
            console.error('Error stopping remote track:', err);
          }
        });
        remoteVideoRef.current.srcObject = null;
      }
    } catch (err) {
      console.error('Error stopping media tracks:', err);
    }
  };

  const initializePeerConnection = () => {
    try {
      // Close existing connection if it exists
      if (peerConnection.current) {
        try {
          peerConnection.current.close();
        } catch (err) {
          console.error('Error closing existing peer connection:', err);
        }
      }
      
      // Create a new RTCPeerConnection with STUN servers
      peerConnection.current = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun4.l.google.com:19302' },
        ],
        iceCandidatePoolSize: 10,
      });
      
      // Set up event handlers for the peer connection
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          // In a real app, you would send this to the remote peer via signaling server
          console.log('New ICE candidate:', event.candidate);
        }
      };
      
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams && event.streams[0]) {
          console.log('Received remote track', event.streams[0]);
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      
      peerConnection.current.oniceconnectionstatechange = () => {
        console.log('ICE connection state:', peerConnection.current.iceConnectionState);
        if (peerConnection.current.iceConnectionState === 'disconnected' || 
            peerConnection.current.iceConnectionState === 'failed' || 
            peerConnection.current.iceConnectionState === 'closed') {
          setCallQuality('poor');
        } else if (peerConnection.current.iceConnectionState === 'connected') {
          setCallQuality('good');
        }
      };
      
      peerConnection.current.onconnectionstatechange = () => {
        console.log('Connection state:', peerConnection.current.connectionState);
        if (peerConnection.current.connectionState === 'connected') {
          setConnectionStatus('connected');
        } else if (peerConnection.current.connectionState === 'disconnected' || 
                  peerConnection.current.connectionState === 'failed' || 
                  peerConnection.current.connectionState === 'closed') {
          setConnectionStatus('disconnected');
        }
      };
      
      // Handle negotiation needed events
      peerConnection.current.onnegotiationneeded = async () => {
        try {
          console.log('Negotiation needed event');
          // In a real app, you would start the offer/answer process here
        } catch (err) {
          console.error('Error during negotiation:', err);
        }
      };
      
    } catch (err) {
      console.error('Error initializing peer connection:', err);
      setError('Failed to initialize video call connection: ' + (err.message || err));
    }
  };

  const startCall = async () => {
    try {
      console.log('Starting call...');
      setConnectionStatus('connecting');
      
      // Reset any previous error
      setError('');
      
      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Your browser does not support video calls.');
        setConnectionStatus('disconnected');
        return;
      }
      
      // Get user media with current video/audio settings
      console.log('Requesting media with video:', isVideoEnabled, 'audio:', isAudioEnabled);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: isVideoEnabled, 
        audio: isAudioEnabled 
      });
      
      console.log('Media stream obtained:', stream.getTracks().map(t => t.kind).join(', '));
      
      // Set local video stream
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        console.log('Local video stream set');
      }

      // Initialize WebRTC peer connection
      initializePeerConnection();
      console.log('Peer connection initialized');

      // Add tracks to peer connection
      if (peerConnection.current) {
        stream.getTracks().forEach(track => {
          try {
            peerConnection.current.addTrack(track, stream);
            console.log('Added track to peer connection:', track.kind);
          } catch (err) {
            console.error('Error adding track to peer connection:', err);
          }
        });
      }

      // Update UI state
      setIsCallActive(true);
      setConnectionStatus('connected');
      console.log('Call active, connection status set to connected');
      
      // Simulate remote video for demo purposes
      console.log('Simulating remote video in 1 second...');
      setTimeout(async () => {
        try {
          const remoteStream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
          });
          
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            console.log('Remote video stream set');
          }
        } catch (err) {
          console.error('Error simulating remote video:', err);
        }
      }, 1000);

      console.log('Call started successfully');
    } catch (err) {
      console.error('Error starting call:', err);
      
      // Handle specific permission errors
      if (err.name === 'NotAllowedError') {
        setError('Camera or microphone access was denied. Please enable permissions in your browser settings and reload the page.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera or microphone found. Please connect a device and try again.');
      } else if (err.name === 'NotReadableError') {
        setError('Your camera or microphone is already in use by another application.');
      } else {
        setError('Unable to start call: ' + (err.message || err));
      }
      
      setConnectionStatus('disconnected');
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        // Stop screen sharing and revert to camera
        if (localVideoRef.current && localVideoRef.current.srcObject) {
          // Stop only video tracks, keep audio if possible
          const videoTracks = localVideoRef.current.srcObject
            .getTracks()
            .filter(track => track.kind === 'video');
          
          videoTracks.forEach(track => track.stop());
        }
        
        // Get new camera stream
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: isVideoEnabled, 
          audio: isAudioEnabled 
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        setIsScreenSharing(false);
      } else {
        // Start screen sharing
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          setError('Your browser does not support screen sharing.');
          return;
        }
        
        // Save current audio track to add to screen share stream
        let audioTrack = null;
        if (localVideoRef.current && localVideoRef.current.srcObject) {
          audioTrack = localVideoRef.current.srcObject
            .getTracks()
            .find(track => track.kind === 'audio');
          
          // Stop only video tracks
          const videoTracks = localVideoRef.current.srcObject
            .getTracks()
            .filter(track => track.kind === 'video');
          
          videoTracks.forEach(track => track.stop());
        }
        
        // Get screen sharing stream
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
          video: {
            cursor: 'always',
            displaySurface: 'monitor'
          }
        });
        
        // If we had audio, add it to the screen sharing stream
        if (audioTrack) {
          try {
            screenStream.addTrack(audioTrack);
          } catch (err) {
            console.warn('Could not add audio track to screen sharing stream:', err);
            // If adding the track failed, get a new audio track
            try {
              const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
              const newAudioTrack = audioStream.getAudioTracks()[0];
              if (newAudioTrack) {
                screenStream.addTrack(newAudioTrack);
              }
            } catch (audioErr) {
              console.error('Could not get new audio track:', audioErr);
            }
          }
        }
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }
        
        // Listen for the end of screen sharing
        const videoTrack = screenStream.getVideoTracks()[0];
        if (videoTrack) {
          videoTrack.onended = async () => {
            try {
              const newStream = await navigator.mediaDevices.getUserMedia({ 
                video: isVideoEnabled, 
                audio: isAudioEnabled 
              });
              
              if (localVideoRef.current) {
                localVideoRef.current.srcObject = newStream;
              }
              
              setIsScreenSharing(false);
            } catch (err) {
              console.error('Error reverting from screen sharing:', err);
              setError('Error reverting from screen sharing. Please refresh the page.');
            }
          };
        }
        
        setIsScreenSharing(true);
      }
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('Screen sharing permission was denied.');
      } else {
        setError('An error occurred while trying to share your screen: ' + (err.message || err));
        console.error('Screen sharing error:', err);
      }
      setIsScreenSharing(false);
    }
  };

  const toggleVideo = () => {
    try {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const videoTrack = localVideoRef.current.srcObject
          .getTracks()
          .find(track => track.kind === 'video');
        
        if (videoTrack) {
          videoTrack.enabled = !isVideoEnabled;
          setIsVideoEnabled(!isVideoEnabled);
          console.log('Video toggled:', !isVideoEnabled ? 'on' : 'off');
        } else if (isCallActive) {
          // If no video track but call is active, try to add video
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
              const videoTrack = stream.getVideoTracks()[0];
              if (videoTrack && localVideoRef.current.srcObject) {
                localVideoRef.current.srcObject.addTrack(videoTrack);
                setIsVideoEnabled(true);
              }
            })
            .catch(err => {
              console.error('Could not add video track:', err);
              setError('Could not enable video: ' + err.message);
            });
        }
      } else {
        // Just toggle the state if not in a call yet
        setIsVideoEnabled(!isVideoEnabled);
      }
    } catch (err) {
      console.error('Error toggling video:', err);
      setError('Error toggling video: ' + err.message);
    }
  };

  const toggleAudio = () => {
    try {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const audioTrack = localVideoRef.current.srcObject
          .getTracks()
          .find(track => track.kind === 'audio');
        
        if (audioTrack) {
          audioTrack.enabled = !isAudioEnabled;
          setIsAudioEnabled(!isAudioEnabled);
          console.log('Audio toggled:', !isAudioEnabled ? 'on' : 'off');
        } else if (isCallActive) {
          // If no audio track but call is active, try to add audio
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
              const audioTrack = stream.getAudioTracks()[0];
              if (audioTrack && localVideoRef.current.srcObject) {
                localVideoRef.current.srcObject.addTrack(audioTrack);
                setIsAudioEnabled(true);
              }
            })
            .catch(err => {
              console.error('Could not add audio track:', err);
              setError('Could not enable audio: ' + err.message);
            });
        }
      } else {
        // Just toggle the state if not in a call yet
        setIsAudioEnabled(!isAudioEnabled);
      }
    } catch (err) {
      console.error('Error toggling audio:', err);
      setError('Error toggling audio: ' + err.message);
    }
  };

  const endCall = () => {
    try {
      console.log('Ending call...');
      
      // Clear call duration timer
      if (window.callDurationTimer) {
        clearInterval(window.callDurationTimer);
        window.callDurationTimer = null;
      }
      
      // Stop all media tracks
      stopMediaTracks();
      
      // Close peer connection
      if (peerConnection.current) {
        try {
          peerConnection.current.close();
        } catch (err) {
          console.error('Error closing peer connection:', err);
        }
        peerConnection.current = null;
      }
      
      // Update UI state
      setIsCallActive(false);
      setConnectionStatus('disconnected');
      setIsScreenSharing(false);
      setCallDuration(0);
      
      // Reset video and audio state for next call
      setIsVideoEnabled(true);
      setIsAudioEnabled(true);
      
      // Show confirmation message
      const confirmationMessage = {
        id: Date.now(),
        sender: 'system',
        message: 'Call ended. Thank you for using our telemedicine service.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, confirmationMessage]);

      // Save chat history
      if (appointment?.doctor?.id) {
        localStorage.setItem(
          `chat_${appointment.doctor.id}`,
          JSON.stringify([...messages, confirmationMessage])
        );
      }
      
      // Navigate back to patient dashboard if we came from there
      if (location.state?.returnTo) {
        navigate(location.state.returnTo);
      }
      
      console.log('Call ended successfully');
    } catch (err) {
      console.error('Error ending call:', err);
      setError('Error ending call: ' + err.message);
    }
  };

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSimulatedResponse = (message) => {
    const responses = [
      "I understand. Could you tell me more about your symptoms?",
      "How long have you been experiencing this?",
      "Have you taken any medication for this condition?",
      "I recommend we discuss this further in our video consultation. Shall we start the call?",
      "That's helpful information. Let me make a note of that.",
      "Have you noticed any other symptoms?",
      "I'll help you address this concern. First, let me ask you a few questions.",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMessage('');
    
    // Store messages in localStorage
    localStorage.setItem(
      `chat_${appointment?.doctor?.id || mockDoctor.id}`,
      JSON.stringify(updatedMessages)
    );
    
    // Simulate doctor response after a short delay
    setTimeout(() => {
      const responseMessage = {
        id: updatedMessages.length + 1,
        sender: 'doctor',
        message: getSimulatedResponse(message.trim()),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      const messagesWithResponse = [...updatedMessages, responseMessage];
      setMessages(messagesWithResponse);
      
      // Store updated messages in localStorage
      localStorage.setItem(
        `chat_${appointment?.doctor?.id || mockDoctor.id}`,
        JSON.stringify(messagesWithResponse)
      );
    }, 1500);
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




  ;

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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg mt-14">
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
