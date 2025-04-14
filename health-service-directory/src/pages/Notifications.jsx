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
      className={`p-4 mb-2 rounded-lg ${
        notification.read ? 'bg-gray-50' : 'bg-white border-l-4 border-blue-500'
      } hover:bg-gray-50 transition-colors duration-150 ease-in-out`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 group relative">
          {getNotificationIcon(notification.type)}
          <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            {notification.title}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-sm text-gray-500">{notification.message}</p>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
              <p className="text-xs text-gray-500">{timeAgo(notification.date)}</p>
            </div>
          </div>
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Notifications() {
  const { notifications, markAsRead, clearNotifications } = useNotifications();
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const notificationTypes = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'appointment', label: 'Appointments' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'resource', label: 'Resources' },
    { value: 'health-record', label: 'Health Records' },
    { value: 'system', label: 'System' },
    { value: 'emergency', label: 'Emergency' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full bg-white shadow-sm">
        <div className="w-full px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notifications</h1>
          <p className="mt-2 text-sm text-gray-700">
            Stay updated with your healthcare activities
          </p>
        </div>
      </div>
      <div className="w-full px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="group relative">
              <BellIcon className="h-8 w-8 text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-2">
                {unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Notifications Center
              </div>
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button
            onClick={clearNotifications}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear all
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {notificationTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setFilter(type.value)}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === type.value
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

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
            <div className="w-full text-center py-8">
              <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'all'
                  ? "You're all caught up!"
                  : `No ${filter} notifications at the moment.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
