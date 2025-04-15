import { useState } from 'react';
import { 
  BellIcon,
  CheckIcon,
  XMarkIcon,
  CalendarIcon,
  UserIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function NotificationsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'New Appointment Request',
      message: 'John Doe has requested an appointment for tomorrow at 10:00 AM',
      date: '2024-03-20',
      time: '09:30 AM',
      read: false,
      icon: CalendarIcon,
      color: 'blue'
    },
    {
      id: 2,
      type: 'patient',
      title: 'Patient Update',
      message: 'Sarah Johnson has updated her medical history',
      date: '2024-03-19',
      time: '02:15 PM',
      read: false,
      icon: UserIcon,
      color: 'green'
    },
    {
      id: 3,
      type: 'record',
      title: 'New Medical Record',
      message: 'A new lab result has been uploaded for Michael Brown',
      date: '2024-03-19',
      time: '11:45 AM',
      read: true,
      icon: DocumentTextIcon,
      color: 'purple'
    },
    {
      id: 4,
      type: 'telemedicine',
      title: 'Video Consultation Reminder',
      message: 'Your video consultation with Emily Davis starts in 30 minutes',
      date: '2024-03-18',
      time: '03:00 PM',
      read: true,
      icon: VideoCameraIcon,
      color: 'indigo'
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      message: 'The system will be undergoing maintenance tonight at 11:00 PM',
      date: '2024-03-18',
      time: '10:00 AM',
      read: false,
      icon: InformationCircleIcon,
      color: 'gray'
    }
  ]);

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  const handleDeleteNotification = (notificationId) => {
    const updatedNotifications = notifications.filter(
      notification => notification.id !== notificationId
    );
    setNotifications(updatedNotifications);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    return notification.type === activeFilter;
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
          >
            Mark all as read
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6">
        {['all', 'unread', 'appointment', 'patient', 'record', 'telemedicine', 'system'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 ${
                !notification.read ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className={`h-10 w-10 rounded-full bg-${notification.color}-100 flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 text-${notification.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{notification.date}</span>
                      <ClockIcon className="h-4 w-4 ml-2" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
          <p className="text-gray-500 mt-1">You're all caught up!</p>
        </div>
      )}
    </div>
  );
} 