import { useState, useEffect } from 'react';
import { 
  BellIcon, 
  CheckIcon, 
  XMarkIcon, 
  FunnelIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  TrashIcon,
  EnvelopeIcon,
  ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function NotificationsSection() {
  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Doctor Registration',
      message: 'Dr. Sarah Johnson has registered for the platform and is awaiting approval.',
      time: '2 hours ago',
      read: false,
      type: 'info',
      category: 'user'
    },
    {
      id: 2,
      title: 'System Update Available',
      message: 'A new system update (v2.4.1) is available with security improvements.',
      time: '5 hours ago',
      read: true,
      type: 'warning',
      category: 'system'
    },
    {
      id: 3,
      title: 'New Patient Record',
      message: 'A new medical record has been added for Robert Brown by Dr. James Wilson.',
      time: '1 day ago',
      read: false,
      type: 'success',
      category: 'medical'
    },
    {
      id: 4,
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected from IP 192.168.1.45.',
      time: '2 days ago',
      read: true,
      type: 'error',
      category: 'security'
    },
    {
      id: 5,
      title: 'Appointment Cancelled',
      message: 'Patient Emma Thompson has cancelled her appointment scheduled for tomorrow.',
      time: '2 days ago',
      read: false,
      type: 'warning',
      category: 'appointment'
    },
    {
      id: 6,
      title: 'Database Backup Complete',
      message: 'Weekly database backup completed successfully. Size: 2.4GB',
      time: '3 days ago',
      read: true,
      type: 'success',
      category: 'system'
    },
    {
      id: 7,
      title: 'New Feature Available',
      message: 'Telemedicine integration is now available. Check settings to enable.',
      time: '4 days ago',
      read: false,
      type: 'info',
      category: 'system'
    }
  ]);

  // Filter states
  const [activeFilter, setActiveFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered notifications
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);

  // Apply filters when dependencies change
  useEffect(() => {
    let result = [...notifications];
    
    // Filter by type
    if (activeFilter !== 'all') {
      result = result.filter(notification => notification.type === activeFilter);
    }
    
    // Filter by read status
    if (showUnreadOnly) {
      result = result.filter(notification => !notification.read);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(notification => 
        notification.title.toLowerCase().includes(query) || 
        notification.message.toLowerCase().includes(query)
      );
    }
    
    setFilteredNotifications(result);
  }, [notifications, activeFilter, showUnreadOnly, searchQuery]);

  // Get unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Action handlers
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get type-specific icon and colors
  const getTypeIcon = (type) => {
    switch (type) {
      case 'info':
        return <InformationCircleIcon className="h-5 w-5" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5" />;
      case 'success':
        return <CheckCircleIcon className="h-5 w-5" />;
      case 'error':
        return <ExclamationCircleIcon className="h-5 w-5" />;
      default:
        return <BellIcon className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'user': return 'User';
      case 'system': return 'System';
      case 'medical': return 'Medical';
      case 'security': return 'Security';
      case 'appointment': return 'Appointment';
      default: return 'General';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'user': return 'bg-indigo-100 text-indigo-800';
      case 'system': return 'bg-purple-100 text-purple-800';
      case 'medical': return 'bg-teal-100 text-teal-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'appointment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with title and actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {unreadCount} unread
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={`inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md ${unreadCount === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            <EyeIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
            Mark all read
          </button>
          
          <button 
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
            className={`inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md ${notifications.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            <TrashIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
            Clear all
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search input */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          {/* Type filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('info')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeFilter === 'info' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
            >
              Info
            </button>
            <button
              onClick={() => setActiveFilter('success')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeFilter === 'success' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
            >
              Success
            </button>
            <button
              onClick={() => setActiveFilter('warning')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeFilter === 'warning' ? 'bg-yellow-600 text-white' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}`}
            >
              Warning
            </button>
            <button
              onClick={() => setActiveFilter('error')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeFilter === 'error' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
            >
              Error
            </button>
          </div>
          
          {/* Unread filter */}
          <div className="flex items-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showUnreadOnly}
                onChange={() => setShowUnreadOnly(!showUnreadOnly)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Unread only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Notifications list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              {notifications.length === 0 
                ? 'You don\'t have any notifications at the moment.'
                : 'No notifications match your current filters.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${!notification.read ? 'border-l-4 border-indigo-500' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{notification.title}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(notification.category)}`}>
                          {getCategoryLabel(notification.category)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                      <div className="mt-1 flex items-center text-xs text-gray-500">
                        <ClockIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-gray-400" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        title="Mark as read"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                      title="Delete notification"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}