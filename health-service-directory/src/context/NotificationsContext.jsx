import React, { createContext, useState, useContext, useEffect } from 'react';

const NotificationsContext = createContext();

export const mockNotifications = [
  {
    id: 1,
    title: 'Appointment Confirmation',
    message: 'Your appointment with Dr. Ngono Marie at Yaoundé Central Hospital is confirmed for tomorrow at 10:00 AM',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'appointment',
  },
  {
    id: 2,
    title: 'Prescription Ready',
    message: 'Your prescription is ready for pickup at Pharmacie de la Cité in Douala',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'pharmacy',
  },
  {
    id: 3,
    title: 'Vaccination Reminder',
    message: 'Reminder: Your COVID-19 booster shot is due next week at Bamenda Regional Hospital',
    date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'appointment',
  },
  {
    id: 4,
    title: 'Test Results Available',
    message: 'Your laboratory test results from Clinique de l\'Aéroport are now available',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    type: 'appointment',
  },
  {
    id: 5,
    title: 'Medicine Refill Reminder',
    message: 'Your prescription at Pharmacie de la Paix will need to be refilled in 3 days',
    date: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    read: true,
    type: 'pharmacy',
  },
  {
    id: 6,
    title: 'New Health Resource Available',
    message: 'Check out our new guide on managing diabetes through diet and exercise',
    date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'resource',
  },
  {
    id: 7,
    title: 'Health Record Update',
    message: 'Your health records have been updated with recent blood test results',
    date: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'health-record',
  },
  {
    id: 8,
    title: 'System Maintenance',
    message: 'The system will be undergoing maintenance on Sunday from 2 AM to 4 AM',
    date: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    read: true,
    type: 'system',
  },
  {
    id: 9,
    title: 'New Feature Available',
    message: 'You can now share your health records securely with your healthcare providers',
    date: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
    read: true,
    type: 'system',
  },
  {
    id: 10,
    title: 'Emergency Alert',
    message: 'High pollution levels reported in Douala. Please take necessary precautions if you have respiratory conditions.',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: 'emergency',
  }
];

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const clearNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearNotifications,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}
