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

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
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
