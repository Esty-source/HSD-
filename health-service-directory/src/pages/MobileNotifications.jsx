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
  TrashIcon,
  CheckIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import MobileLayout from '../components/responsive/MobileLayout';

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
      return <CalendarIcon className="h-5 w-5 text-blue-500" />;
    case 'pharmacy':
      return <BeakerIcon className="h-5 w-5 text-green-500" />;
    case 'resource':
      return <DocumentTextIcon className="h-5 w-5 text-purple-500" />;
    case 'health-record':
      return <HeartIcon className="h-5 w-5 text-pink-500" />;
    case 'system':
      return <CogIcon className="h-5 w-5 text-gray-500" />;
    case 'emergency':
      return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
    default:
      return <BellIcon className="h-5 w-5 text-blue-500" />;
  }
};

const NotificationItem = ({ notification, onMarkAsRead }) => {
  return (
    <div
      className={`p-4 mb-3 rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50 border-l-4 border-blue-500'}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{timeAgo(notification.date)}</span>
          </div>
          <p className="mt-1 text-xs text-gray-600">{notification.message}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-blue-50 text-blue-700">
              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
            </span>
            {!notification.read && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="text-xs text-blue-600"
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

export default function MobileNotifications() {
  const { notifications, markAsRead, clearNotifications, markAllAsRead } = useNotifications();
  const [filter, setFilter] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const notificationTypes = [
    { value: 'all', label: 'All', icon: BellIcon, color: 'bg-blue-100 text-blue-700' },
    { value: 'unread', label: 'Unread', icon: BellIcon, color: 'bg-red-100 text-red-700' },
    { value: 'appointment', label: 'Appointments', icon: CalendarIcon, color: 'bg-indigo-100 text-indigo-700' },
    { value: 'pharmacy', label: 'Pharmacy', icon: BeakerIcon, color: 'bg-green-100 text-green-700' },
    { value: 'health-record', label: 'Health Records', icon: HeartIcon, color: 'bg-pink-100 text-pink-700' },
    { value: 'resource', label: 'Resources', icon: DocumentTextIcon, color: 'bg-purple-100 text-purple-700' },
    { value: 'system', label: 'System', icon: CogIcon, color: 'bg-gray-100 text-gray-700' },
    { value: 'emergency', label: 'Emergency', icon: ExclamationTriangleIcon, color: 'bg-red-100 text-red-700' },
  ];

  return (
    <MobileLayout title="Notifications">
      {/* Action buttons */}
      <div className="px-4 py-3 bg-white border-b flex justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700">
            {unreadCount > 0 ? `${unreadCount} unread` : 'No unread notifications'}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilterModal(true)}
            className="p-2 rounded-full bg-gray-100 text-gray-700"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="p-2 rounded-full bg-blue-100 text-blue-700"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={clearNotifications}
            className="p-2 rounded-full bg-red-100 text-red-700"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Current filter indicator */}
      <div className="px-4 py-2 bg-white border-b">
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-2">Showing:</span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            notificationTypes.find(t => t.value === filter)?.color || 'bg-blue-100 text-blue-700'
          }`}>
            {notificationTypes.find(t => t.value === filter)?.icon && 
              React.createElement(notificationTypes.find(t => t.value === filter).icon, { className: "h-3 w-3 mr-1" })}
            <span>{notificationTypes.find(t => t.value === filter)?.label || 'All'}</span>
          </div>
        </div>
      </div>
      
      {/* Notifications List */}
      <div className="p-4 pb-20">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <BellIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-base font-medium text-gray-900">No notifications</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              {filter === 'all'
                ? "You're all caught up! We'll notify you when there's something new."
                : `No ${filter} notifications at the moment. Check back later or try a different filter.`}
            </p>
          </div>
        )}
      </div>
      
      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filter Notifications</h3>
              <button onClick={() => setShowFilterModal(false)} className="p-1">
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {notificationTypes.map((type) => {
                const TypeIcon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => {
                      setFilter(type.value);
                      setShowFilterModal(false);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                      filter === type.value
                        ? `${type.color} shadow-sm`
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    <TypeIcon className="h-5 w-5" />
                    <span className="text-sm">{type.label}</span>
                    {type.value === 'unread' && unreadCount > 0 && (
                      <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Add styles for animations */}
      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </MobileLayout>
  );
}
