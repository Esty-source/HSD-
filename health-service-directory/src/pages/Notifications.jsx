import React from 'react';
import { useNotifications } from '../context/NotificationsContext';
import { format } from 'date-fns';
import {
  BellIcon,
  CalendarIcon,
  PillIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

const getNotificationIcon = (type) => {
  switch (type) {
    case 'appointment':
      return CalendarIcon;
    case 'pharmacy':
      return PillIcon;
    default:
      return BellIcon;
  }
};

export default function Notifications() {
  const { notifications, markAsRead, clearNotification, markAllAsRead } = useNotifications();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-12">
            <BellIcon className="h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No notifications</h3>
            <p className="mt-1 text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`relative rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md ${
                    !notification.read ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`rounded-full p-2 ${
                        !notification.read ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                      <p className="mt-1 text-gray-600">{notification.message}</p>
                      <p className="mt-2 text-sm text-gray-500">
                        {format(new Date(notification.date), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="rounded-full bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => clearNotification(notification.id)}
                        className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
