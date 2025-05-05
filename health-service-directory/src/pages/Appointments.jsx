import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  XMarkIcon,
  LightBulbIcon,
  CheckCircleIcon,
  BellIcon,
  UserIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

const mockAppointments = [
  {
    id: 1,
    doctorName: "Dr. Ngono Marie",
    specialty: "Cardiologist",
    date: "2024-02-15",
    time: "09:00",
    location: "Yaoundé General Hospital",
    status: "upcoming",
    phone: "+237 677-234-567",
  },
  {
    id: 2,
    doctorName: "Dr. Fon Peter",
    specialty: "Pediatrician",
    date: "2024-02-10",
    time: "14:30",
    location: "Douala Medical Center",
    status: "completed",
    phone: "+237 699-345-678",
  },
  {
    id: 3,
    doctorName: "Dr. Biya Rose",
    specialty: "Dermatologist",
    date: "2024-02-20",
    time: "11:15",
    location: "Bamenda Regional Hospital",
    status: "upcoming",
    phone: "+237 677-456-789",
  },
];

const specialties = [
  "Cardiology",
  "Pediatrics",
  "Dermatology",
  "General Medicine",
  "Gynecology",
  "Orthopedics",
  "Dentistry",
  "Ophthalmology",
];

const quickTips = [
  {
    id: 1,
    title: "Prepare for Your Visit",
    tips: [
      "Bring your ID and insurance information",
      "List your current medications",
      "Write down any questions for the doctor",
      "Arrive 15 minutes before your appointment"
    ]
  },
  {
    id: 2,
    title: "Scheduling Tips",
    tips: [
      "Morning appointments typically have shorter wait times",
      "Book follow-ups right after your visit",
      "Save emergency numbers in your phone",
      "Set reminders for your appointments"
    ]
  },
  {
    id: 3,
    title: "Cancellation Policy",
    tips: [
      "Cancel at least 24 hours in advance",
      "Reschedule through the app or phone",
      "Keep track of your appointment history",
      "Update contact information if changed"
    ]
  }
];

export default function Appointments() {
  const location = useLocation();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showConsultations, setShowConsultations] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [newAppointment, setNewAppointment] = useState({
    doctorName: "",
    specialty: "",
    date: "",
    time: "",
    location: "",
    phone: "",
  });

  // Handle incoming doctor data
  useEffect(() => {
    if (location.state?.doctor) {
      const { doctor } = location.state;
      setNewAppointment({
        ...newAppointment,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        location: doctor.location || "",
      });
      setShowModal(true);
    }
  }, [location.state]);

  // Initialize notifications
  useEffect(() => {
    // Get upcoming appointments for next 24 hours
    const upcomingNotifications = appointments
      .filter(apt => {
        const aptDate = new Date(apt.date);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return aptDate <= tomorrow && apt.status === "upcoming";
      })
      .map(apt => ({
        id: `apt-${apt.id}`,
        type: "upcoming",
        title: "Upcoming appointment tomorrow",
        message: `With ${apt.doctorName} at ${apt.time}`,
        timestamp: new Date(),
        read: false,
        icon: CalendarIcon,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600"
      }));

    // Add confirmation notifications for recently booked appointments
    const confirmations = appointments
      .filter(apt => apt.status === "upcoming")
      .slice(-2)
      .map(apt => ({
        id: `conf-${apt.id}`,
        type: "confirmation",
        title: "Appointment confirmed",
        message: `Your appointment with ${apt.doctorName} has been confirmed`,
        timestamp: new Date(),
        read: false,
        icon: CheckCircleIcon,
        iconBg: "bg-green-100",
        iconColor: "text-green-600"
      }));

    setNotifications([...upcomingNotifications, ...confirmations]);
    setUnreadCount(upcomingNotifications.length + confirmations.length);
  }, [appointments]);

  const handleNotificationClick = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Add notification when new appointment is created
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = appointments.length + 1;
    const newApt = {
      id: newId,
      ...newAppointment,
      status: "upcoming",
    };
    
    setAppointments([...appointments, newApt]);
    setShowModal(false);
    setNewAppointment({
      doctorName: "",
      specialty: "",
      date: "",
      time: "",
      location: "",
      phone: "",
    });

    // Add confirmation notification
    const newNotification = {
      id: `conf-new-${newId}`,
      type: "confirmation",
      title: "New appointment booked",
      message: `Appointment with ${newAppointment.doctorName} has been scheduled`,
      timestamp: new Date(),
      read: false,
      icon: CheckCircleIcon,
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    };
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (selectedAppointment) {
      setAppointments(appointments.filter(app => app.id !== selectedAppointment.id));
      setShowCancelModal(false);
      setSelectedAppointment(null);
    }
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    const updatedAppointments = appointments.map((apt) =>
      apt.id === selectedAppointment.id
        ? { ...apt, date: selectedAppointment.date, time: selectedAppointment.time }
        : apt
    );
    setAppointments(updatedAppointments);
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
  };

  const startTelemedicine = (appointment) => {
    const appointmentWithDoctor = {
      ...appointment,
      doctor: {
        id: appointment.id,
        name: appointment.doctorName,
        specialty: appointment.specialty,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      }
    };
    navigate('/telemedicine', { state: { appointment: appointmentWithDoctor } });
    setShowConsultations(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-screen max-w-[100vw] overflow-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white w-full mt-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                My Appointments
              </h1>
              <p className="mt-2 text-blue-100 max-w-2xl">
                Schedule, manage, and track your healthcare appointments in one place
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 border border-white/20"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Appointment
            </button>
          </div>
          
          {/* Stats Cards */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8 w-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-white/20">
                  <CalendarIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-100">Upcoming</p>
                  <p className="text-2xl font-bold">
                    {appointments.filter(apt => apt.status === 'upcoming').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-white/20">
                  <CheckCircleIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-100">Completed</p>
                  <p className="text-2xl font-bold">
                    {appointments.filter(apt => apt.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-white/20">
                  <VideoCameraIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-100">Available for Telemedicine</p>
                  <p className="text-2xl font-bold">
                    {appointments.filter(apt => apt.status === 'upcoming').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-white/20">
                  <BellIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-100">Notifications</p>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          {/* Tabs */}
          <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-4 sm:mb-0">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${activeTab === 'upcoming' ? 'bg-white shadow-sm' : 'hover:bg-white/60'} flex items-center rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-200`}
            >
              <CalendarIcon className={`mr-2 h-4 w-4 ${activeTab === 'upcoming' ? 'text-blue-600' : 'text-gray-500'}`} />
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`${activeTab === 'completed' ? 'bg-white shadow-sm' : 'hover:bg-white/60'} flex items-center rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-200`}
            >
              <CheckCircleIcon className={`mr-2 h-4 w-4 ${activeTab === 'completed' ? 'text-blue-600' : 'text-gray-500'}`} />
              Completed
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`${activeTab === 'all' ? 'bg-white shadow-sm' : 'hover:bg-white/60'} flex items-center rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-200`}
            >
              <UserIcon className={`mr-2 h-4 w-4 ${activeTab === 'all' ? 'text-blue-600' : 'text-gray-500'}`} />
              All
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
              {/* Notification Button */}
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 relative"
                >
                  <BellIcon className="h-6 w-6 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">{unreadCount}</span>
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
                            Mark all as read
                          </button>
                          <button
                            onClick={clearNotifications}
                            className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            Clear all
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="text-sm text-gray-500 text-center py-4">No new notifications</p>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              onClick={() => handleNotificationClick(notification.id)}
                              className={`flex items-start space-x-3 p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                                notification.read ? 'bg-white' : 'bg-blue-50 hover:bg-blue-100'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-full ${notification.iconBg} flex items-center justify-center flex-shrink-0`}>
                                <notification.icon className={`h-4 w-4 ${notification.iconColor}`} />
                              </div>
                              <div>
                                <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Consultations Button */}
              <div className="relative">
                <button
                  onClick={() => setShowConsultations(!showConsultations)}
                  className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                  title="Start Consultation"
                >
                  <VideoCameraIcon className="h-6 w-6" />
                  {appointments.filter(apt => apt.status === 'upcoming').length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                      {appointments.filter(apt => apt.status === 'upcoming').length}
                    </span>
                  )}
                </button>

                {/* Consultations Dropdown */}
                {showConsultations && (
                  <div className="absolute right-0 mt-2 w-80 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="px-4 py-2 border-b">
                    <h3 className="text-sm font-medium text-gray-900">Available Consultations</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {appointments
                      .filter(apt => apt.status === 'upcoming')
                      .map(apt => (
                        <div
                          key={apt.id}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                          onClick={() => startTelemedicine(apt)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{apt.doctorName}</p>
                              <p className="text-xs text-gray-500">{apt.specialty}</p>
                              <div className="mt-1 flex items-center text-xs text-gray-500">
                                <CalendarIcon className="mr-1 h-4 w-4" />
                                {format(new Date(apt.date), 'MMM d, yyyy')} at {apt.time}
                              </div>
                            </div>
                            <VideoCameraIcon className="h-5 w-5 text-blue-500" />
                          </div>
                        </div>
                      ))}
                    {appointments.filter(apt => apt.status === 'upcoming').length === 0 && (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No upcoming consultations available
                      </div>
                    )}
                  </div>
                </div>
                )}
              </div>

            </div>
          </div>

          {/* Main content wrapper with flex layout */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Appointments List */}
            <div className="flex-grow order-2 lg:order-1">
              {appointments.filter(appointment => 
                activeTab === 'all' ? true : 
                activeTab === appointment.status
              ).length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <CalendarIcon className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No {activeTab} appointments</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {activeTab === 'upcoming' ? 'Schedule a new appointment to get started.' : 
                     activeTab === 'completed' ? 'Your completed appointments will appear here.' : 
                     'You don\'t have any appointments yet.'}
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setShowModal(true)}
                      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                    >
                      <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                      Schedule Appointment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {appointments.filter(appointment => 
                    activeTab === 'all' ? true : 
                    activeTab === appointment.status
                  ).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="rounded-xl bg-white p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 relative overflow-hidden group"
                    >
                      {/* Status indicator */}
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                      
                      {/* Doctor avatar and info */}
                      <div className="flex items-start mb-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-3">
                          {appointment.doctorName.split(' ')[1][0]}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {appointment.doctorName}
                          </h3>
                          <p className="text-sm text-indigo-600 font-medium">{appointment.specialty}</p>
                        </div>
                        <span
                          className={`ml-auto rounded-full px-3 py-1 text-xs font-medium ${
                            appointment.status === "upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="h-px w-full bg-gray-100 my-4"></div>

                      {/* Appointment details with improved icons */}
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                            <CalendarIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium">{format(new Date(appointment.date), "MMMM d, yyyy")}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mr-3">
                            <ClockIcon className="h-4 w-4 text-indigo-600" />
                          </div>
                          <span className="font-medium">{appointment.time}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center mr-3">
                            <MapPinIcon className="h-4 w-4 text-purple-600" />
                          </div>
                          <span className="font-medium">{appointment.location}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      {appointment.status === "upcoming" && (
                        <div className="mt-6 grid grid-cols-3 gap-2">
                          <button
                            onClick={() => startTelemedicine(appointment)}
                            className="col-span-1 inline-flex items-center justify-center rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                          >
                            <VideoCameraIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowRescheduleModal(true);
                            }}
                            className="col-span-1 inline-flex items-center justify-center rounded-lg bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <CalendarIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowCancelModal(true);
                            }}
                            className="col-span-1 inline-flex items-center justify-center rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                      
                      {/* Call button for completed appointments */}
                      {appointment.status === "completed" && (
                        <div className="mt-6">
                          <button
                            onClick={() => alert('Feature coming soon: Call doctor for follow-up')}
                            className="w-full inline-flex items-center justify-center rounded-lg bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <PhoneIcon className="mr-2 h-5 w-5" />
                            Call for Follow-up
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Tips Section */}
            <div className="lg:w-96 xl:w-1/4 flex-shrink-0 order-1 lg:order-2">
              <div className="sticky top-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3">
                    <h2 className="text-base font-semibold text-white flex items-center">
                      <LightBulbIcon className="h-5 w-5 mr-2" />
                      Appointment Tips
                    </h2>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {quickTips.map((section) => (
                        <div key={section.id}>
                          <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            {section.id === 1 && <UserIcon className="h-4 w-4 mr-1.5 text-blue-500" />}
                            {section.id === 2 && <CalendarIcon className="h-4 w-4 mr-1.5 text-blue-500" />}
                            {section.id === 3 && <ClockIcon className="h-4 w-4 mr-1.5 text-blue-500" />}
                            {section.title}
                          </h3>
                          <ul className="space-y-2 pl-6">
                            {section.tips.map((tip, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircleIcon className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-gray-600">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Need help section */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                  <h3 className="text-sm font-medium text-indigo-900 mb-2">Need help?</h3>
                  <p className="text-xs text-indigo-700 mb-3">Contact our support team for assistance with your appointments.</p>
                  <button 
                    className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                    onClick={() => navigate('/contact')}
                  >
                    <PhoneIcon className="mr-2 h-4 w-4" />
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-screen items-center justify-center px-4 py-10 text-center sm:p-0">
                <div
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  onClick={() => setShowModal(false)}
                ></div>

                <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      onClick={() => setShowModal(false)}
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-xl font-semibold leading-6 text-gray-900">
                        Schedule New Appointment
                      </h3>
                      <form onSubmit={handleSubmit} className="mt-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Doctor Name
                            </label>
                            <input
                              type="text"
                              name="doctorName"
                              required
                              readOnly={location.state?.doctor}
                              value={newAppointment.doctorName}
                              onChange={handleInputChange}
                              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                location.state?.doctor ? 'bg-gray-50' : ''
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Specialty
                            </label>
                            <input
                              type="text"
                              name="specialty"
                              required
                              readOnly={location.state?.doctor}
                              value={newAppointment.specialty}
                              onChange={handleInputChange}
                              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                location.state?.doctor ? 'bg-gray-50' : ''
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Date
                            </label>
                            <input
                              type="date"
                              name="date"
                              required
                              value={newAppointment.date}
                              onChange={handleInputChange}
                              min={format(new Date(), "yyyy-MM-dd")}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Time
                            </label>
                            <input
                              type="time"
                              name="time"
                              required
                              value={newAppointment.time}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Location
                            </label>
                            <input
                              type="text"
                              name="location"
                              required
                              readOnly={location.state?.doctor}
                              value={newAppointment.location}
                              onChange={handleInputChange}
                              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                location.state?.doctor ? 'bg-gray-50' : ''
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Your Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={newAppointment.phone}
                              onChange={handleInputChange}
                              placeholder="+237 6XX-XXX-XXX"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                          >
                            Schedule
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showCancelModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-0">
              <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 my-auto">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Cancel Appointment</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to cancel your appointment with {selectedAppointment?.doctorName}? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    Keep Appointment
                  </button>
                  <button
                    onClick={confirmCancel}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-lg hover:from-red-600 hover:to-rose-600 transition-all duration-200"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showRescheduleModal && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-screen items-center justify-center px-4 py-10 text-center sm:p-0">
                <div
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  onClick={() => setShowRescheduleModal(false)}
                ></div>

                <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      onClick={() => setShowRescheduleModal(false)}
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-xl font-semibold leading-6 text-gray-900">
                        Reschedule Appointment
                      </h3>
                      <form onSubmit={handleRescheduleSubmit} className="mt-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              New Date
                            </label>
                            <input
                              type="date"
                              required
                              value={selectedAppointment?.date || ''}
                              onChange={(e) => setSelectedAppointment(prev => ({...prev, date: e.target.value}))}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              New Time
                            </label>
                            <input
                              type="time"
                              required
                              value={selectedAppointment?.time || ''}
                              onChange={(e) => setSelectedAppointment(prev => ({...prev, time: e.target.value}))}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                          >
                            Confirm Reschedule
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowRescheduleModal(false)}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
