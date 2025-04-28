import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationsContext';
import { format } from 'date-fns';
import {
  BellIcon,
  CalendarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  BeakerIcon,
  CogIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const timeAgo = (date) => {
  const now = new Date();
  const notificationDate = new Date(date);
  const diffInHours = Math.floor((now - notificationDate) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - notificationDate) / (1000 * 60));
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    return format(notificationDate, 'MMM d, yyyy');
  }
};

const getNotificationIcon = (type) => {
  switch (type) {
    case 'appointment':
      return <CalendarIcon className="h-6 w-6 text-blue-500" />;
    case 'pharmacy':
      return <BeakerIcon className="h-6 w-6 text-green-500" />;
    case 'resource':
      return <DocumentTextIcon className="h-6 w-6 text-purple-500" />;
    case 'health-record':
      return <HeartIcon className="h-6 w-6 text-pink-500" />;
    case 'system':
      return <CogIcon className="h-6 w-6 text-gray-500" />;
    case 'emergency':
      return <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />;
    default:
      return <BellIcon className="h-6 w-6 text-blue-500" />;
  }
};

const NotificationItem = ({ notification, onMarkAsRead }) => {
  return (
    <div
      className={`p-5 mb-3 rounded-xl shadow-sm ${notification.read ? 'bg-white/60' : 'bg-white border-l-4 border-blue-500'} 
      hover:shadow-md transition-all duration-200 ease-in-out`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-full ${!notification.read ? 'bg-blue-50' : 'bg-gray-50'} flex-shrink-0`}>
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
            <div className="flex items-center bg-gray-50 rounded-full px-3 py-1">
              <ClockIcon className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
              <p className="text-xs text-gray-500">{timeAgo(notification.date)}</p>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
          <div className="mt-3 flex justify-between items-center">
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700">
              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
            </span>
            {!notification.read && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-blue-200 hover:bg-blue-50 transition-colors"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Notifications() {
  const { notifications, markAsRead, clearNotifications } = useNotifications();
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const notificationTypes = [
    { value: 'all', label: 'All', icon: BellIcon, color: 'bg-blue-100 text-blue-700' },
    { value: 'unread', label: 'Unread', icon: BellIcon, color: 'bg-red-100 text-red-700' },
    { value: 'appointment', label: 'Appointments', icon: CalendarIcon, color: 'bg-indigo-100 text-indigo-700' },
    { value: 'pharmacy', label: 'Pharmacy', icon: BeakerIcon, color: 'bg-green-100 text-green-700' },
    { value: 'resource', label: 'Resources', icon: DocumentTextIcon, color: 'bg-purple-100 text-purple-700' },
    { value: 'health-record', label: 'Health Records', icon: HeartIcon, color: 'bg-pink-100 text-pink-700' },
    { value: 'system', label: 'System', icon: CogIcon, color: 'bg-gray-100 text-gray-700' },
    { value: 'emergency', label: 'Emergency', icon: ExclamationTriangleIcon, color: 'bg-red-100 text-red-700' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllAsRead = () => {
    notifications.filter(n => !n.read).forEach(n => markAsRead(n.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 w-full">
      <div className="w-full max-w-none">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl px-6 sm:px-8 py-6 mb-8 text-white w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <BellIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="mt-1 text-sm text-blue-100">Stay updated with your healthcare activities</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-3 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 rounded-full transition-colors whitespace-nowrap"
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={clearNotifications}
                className="px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-full transition-colors whitespace-nowrap"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
        
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 w-full">
          <div className="p-4 sm:p-6 border-b border-gray-100 w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Filter Notifications</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <BellIcon className="h-6 w-6 text-blue-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <p className="text-sm font-medium text-gray-700">
                    {unreadCount} unread
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 overflow-x-hidden">
              {notificationTypes.map((type) => {
                const TypeIcon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setFilter(type.value)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-all duration-200 ${filter === type.value
                      ? `${type.color} shadow-sm`
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                  >
                    <TypeIcon className="h-4 w-4" />
                    <span>{type.label}</span>
                    {type.value === 'unread' && unreadCount > 0 && (
                      <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Notifications List */}
          <div className="p-4 sm:p-6 w-full">
            <div className="w-full space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                  />
                ))
              ) : (
                <div className="w-full text-center py-12 bg-gray-50 rounded-xl">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
                    <BellIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications</h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                    {filter === 'all'
                      ? "You're all caught up! We'll notify you when there's something new."
                      : `No ${filter} notifications at the moment. Check back later or try a different filter.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-400 text-center mt-8">&copy; {new Date().getFullYear()} Health Service Directory</div>
      </div>
    </div>
  );
}
