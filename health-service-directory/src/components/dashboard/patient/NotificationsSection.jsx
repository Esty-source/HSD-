import { useState } from 'react';
import { BellIcon, CalendarIcon, DocumentTextIcon, CreditCardIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function NotificationsSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data - will be replaced with real API data
  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Appointment Reminder',
      message: 'Your appointment with Dr. Sarah Wilson is tomorrow at 10:00 AM',
      date: '2024-03-19T10:00:00',
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'medical',
      title: 'Lab Results Available',
      message: 'Your recent blood work results are now available for viewing',
      date: '2024-03-18T14:30:00',
      isRead: true,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Confirmation',
      message: 'Payment of XAF 50,000 for consultation has been processed',
      date: '2024-03-17T09:15:00',
      isRead: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'medical',
      title: 'Prescription Reminder',
      message: 'Remember to take your evening medication at 8:00 PM',
      date: '2024-03-19T20:00:00',
      isRead: false,
      priority: 'high'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Notifications', icon: BellIcon },
    { id: 'appointment', name: 'Appointments', icon: CalendarIcon },
    { id: 'medical', name: 'Medical Updates', icon: DocumentTextIcon },
    { id: 'payment', name: 'Payments', icon: CreditCardIcon }
  ];

  const filteredNotifications = notifications.filter(
    notification => activeFilter === 'all' || notification.type === activeFilter
  );

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment':
        return CalendarIcon;
      case 'medical':
        return DocumentTextIcon;
      case 'payment':
        return CreditCardIcon;
      default:
        return BellIcon;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        <div className="flex space-x-2">
          <button className="px-6 py-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <span className="font-medium">Mark all as read</span>
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            <span className="font-medium">Clear all</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-8 w-full overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl whitespace-nowrap transition-colors duration-200 ${
              activeFilter === filter.id 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <filter.icon className="h-5 w-5" />
            <span className="font-medium">{filter.name}</span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="w-full space-y-4">
        {filteredNotifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          return (
            <div
              key={notification.id}
              className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${
                !notification.isRead ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${
                  notification.priority === 'high'
                    ? 'bg-red-100'
                    : notification.priority === 'medium'
                    ? 'bg-yellow-100'
                    : 'bg-green-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    notification.priority === 'high'
                      ? 'text-red-600'
                      : notification.priority === 'medium'
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{notification.title}</h3>
                      <p className="mt-1 text-gray-600">{notification.message}</p>
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(notification.date)}</span>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    {!notification.isRead ? (
                      <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                        <span className="font-medium">Mark as read</span>
                      </button>
                    ) : (
                      <span className="flex items-center text-gray-500">
                        <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
                        <span>Read</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 