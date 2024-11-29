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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">My Appointments</h1>
          <div className="flex items-center space-x-4">
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
                <div className="absolute right-0 mt-2 w-80 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
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

            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-md hover:from-blue-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 ease-in-out"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Schedule Appointment
            </button>
          </div>
        </div>

        {/* Main content wrapper with flex layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Appointments List */}
          <div className="flex-grow order-2 lg:order-1">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-xl bg-white p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 relative overflow-hidden group"
                >
                  {/* Decorative gradient element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 via-indigo-50 to-transparent opacity-60 rounded-bl-full -mr-8 -mt-8"></div>
                  
                  <div className="relative">
                    {/* Header with doctor name and status */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                          {appointment.doctorName}
                        </h3>
                        <p className="text-sm text-indigo-600 font-medium">{appointment.specialty}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold ${
                          appointment.status === "upcoming"
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                            : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>

                    {/* Appointment details with improved icons */}
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                          <CalendarIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">{format(new Date(appointment.date), "MMMM d, yyyy")}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mr-3">
                          <ClockIcon className="h-4 w-4 text-indigo-600" />
                        </div>
                        <span className="font-medium">{appointment.time}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center mr-3">
                          <MapPinIcon className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="font-medium">{appointment.location}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                        <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center mr-3">
                          <PhoneIcon className="h-4 w-4 text-pink-600" />
                        </div>
                        <span className="font-medium">{appointment.phone}</span>
                      </div>
                    </div>

                    {/* Action buttons with gradient backgrounds */}
                    {appointment.status === "upcoming" && (
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          onClick={() => startTelemedicine(appointment)}
                          className="rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
                        >
                          <VideoCameraIcon className="h-5 w-5 mr-2" />
                          Start Consultation
                        </button>
                        <button
                          onClick={() => handleReschedule(appointment)}
                          className="rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
                        >
                          <CalendarIcon className="h-5 w-5 mr-2" />
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleCancel(appointment)}
                          className="rounded-lg px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
                        >
                          <XMarkIcon className="h-5 w-5 mr-2" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips Section */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0 order-1 lg:order-2">
            <div className="sticky top-4">
              <h2 className="text-base font-bold flex items-center mb-3 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                <LightBulbIcon className="h-4 w-4 mr-2 text-purple-400" />
                Quick Tips
              </h2>
              <div className="space-y-2">
                {quickTips.map((section) => (
                  <div
                    key={section.id}
                    className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-2.5 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out border border-purple-100 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-transparent opacity-50 rounded-bl-full"></div>
                    <h3 className="text-xs font-semibold text-purple-900 mb-1.5 flex items-center">
                      {section.id === 1 && <UserIcon className="h-3 w-3 mr-1.5 text-purple-500" />}
                      {section.id === 2 && <CalendarIcon className="h-3 w-3 mr-1.5 text-purple-500" />}
                      {section.id === 3 && <ClockIcon className="h-3 w-3 mr-1.5 text-purple-500" />}
                      {section.title}
                    </h3>
                    <ul className="space-y-1">
                      {section.tips.map((tip, index) => (
                        <li key={index} className="flex items-start group cursor-pointer">
                          <CheckCircleIcon className="h-3 w-3 text-purple-400 mr-1 flex-shrink-0 mt-0.5 group-hover:text-purple-500 transition-colors duration-200" />
                          <span className="text-[10px] text-purple-700 leading-tight group-hover:text-purple-900 transition-colors duration-200">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
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
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
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
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowRescheduleModal(false)}
                          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                        >
                          Confirm Reschedule
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
