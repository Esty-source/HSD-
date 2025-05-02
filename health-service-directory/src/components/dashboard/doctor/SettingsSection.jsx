import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { 
  Cog6ToothIcon, 
  BellIcon, 
  LockClosedIcon, 
  ShieldCheckIcon, 
  UserIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';

// Import modals
import ChangePasswordModal from './ChangePasswordModal';
import ConfirmationModal from '../../ui/ConfirmationModal';

export default function SettingsSection() {
  // Modal states
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'primary'
  });
  
  // Tab state
  const [activeTab, setActiveTab] = useState('general');
  
  // Form data state
  const [formData, setFormData] = useState({
    // General Settings
    language: 'english',
    theme: 'light',
    timeZone: 'Africa/Douala',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    patientUpdates: true,
    systemUpdates: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    shareAvailability: true,
    allowPatientReviews: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: '30',
    
    // Practice Settings
    clinicName: 'HealthConnect Medical Center',
    specialization: 'General Medicine',
    consultationFee: '50000',
    workingHours: {
      monday: { start: '08:00', end: '17:00', available: true },
      tuesday: { start: '08:00', end: '17:00', available: true },
      wednesday: { start: '08:00', end: '17:00', available: true },
      thursday: { start: '08:00', end: '17:00', available: true },
      friday: { start: '08:00', end: '17:00', available: true },
      saturday: { start: '09:00', end: '13:00', available: true },
      sunday: { start: '00:00', end: '00:00', available: false },
    }
  });

  // Check for saved theme on component mount and apply it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setFormData(prev => ({ ...prev, theme: savedTheme }));
      
      // Apply the theme
      applyTheme(savedTheme);
    }
  }, []);

  // Function to check if system prefers dark mode
  const systemPrefersDark = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Function to apply theme to document
  const applyTheme = (theme) => {
    if (typeof window === 'undefined') return;
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900', 'text-white');
    } else if (theme === 'system') {
      // Apply based on current system preference
      if (systemPrefersDark()) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('bg-gray-900', 'text-white');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('bg-gray-900', 'text-white');
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle working hours changes
  const handleWorkingHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: field === 'available' ? value : value
        }
      }
    }));
  };

  // Show confirmation modal
  const showConfirmModal = (title, message, onConfirm, type = 'primary') => {
    setConfirmationData({ title, message, onConfirm, type });
    setShowConfirmation(true);
  };

  // Save settings function
  const saveSettings = () => {
    // In a real app, this would make an API call to save settings
    
    // Simulate API call
    setTimeout(() => {
      // Close confirmation modal
      setShowConfirmation(false);
      
      // Show success message
      toast.success('Settings saved successfully!', {
        duration: 3000,
        position: 'top-center',
      });
    }, 1000);
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    let tabName = '';
    switch (activeTab) {
      case 'general': tabName = 'General'; break;
      case 'notifications': tabName = 'Notification'; break;
      case 'privacy': tabName = 'Privacy'; break;
      case 'security': tabName = 'Security'; break;
      case 'practice': tabName = 'Practice'; break;
      default: tabName = 'Settings';
    }
    showConfirmModal(
      `Save ${tabName} Settings`,
      `Are you sure you want to save changes to your ${tabName.toLowerCase()} settings?`,
      saveSettings,
      'primary'
    );
  };


  // Tabs configuration
  const tabs = [
    { id: 'general', name: 'General', icon: Cog6ToothIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon },
    { id: 'security', name: 'Security', icon: LockClosedIcon },
    { id: 'practice', name: 'Practice', icon: UserIcon },
  ];

  return (
    <div className="w-full">
      {/* Settings Tabs */}
      <div className="flex space-x-4 mb-8 w-full overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl whitespace-nowrap transition-colors duration-200 ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleSubmit}>
          {/* Content placeholder - we'll expand this later */}
          {activeTab === 'general' && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">General Settings</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          placeholder="Enter your email address"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          placeholder="Enter your phone number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Language</label>
        <select
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        >
          <option value="english">English</option>
          <option value="french">French</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Time Zone</label>
        <select
          name="timeZone"
          value={formData.timeZone}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        >
          <option value="Africa/Douala">Africa/Douala</option>
          <option value="Africa/Lagos">Africa/Lagos</option>
          <option value="Europe/London">Europe/London</option>
          <option value="America/New_York">America/New_York</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Theme</label>
        <select
          name="theme"
          value={formData.theme}
          onChange={e => {
            handleInputChange(e);
            applyTheme(e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Account Status</label>
        <input
          type="text"
          value="Active"
          readOnly
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
        />
      </div>
    </div>
  </div>
)}
{activeTab === 'notifications' && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Notification Settings</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">Email Notifications</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Receive important updates and alerts via email.</p>
        </div>
        <input
          type="checkbox"
          name="emailNotifications"
          checked={formData.emailNotifications}
          onChange={handleInputChange}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">SMS Notifications</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Get reminders and alerts on your mobile phone.</p>
        </div>
        <input
          type="checkbox"
          name="smsNotifications"
          checked={formData.smsNotifications}
          onChange={handleInputChange}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">Appointment Reminders</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Receive reminders for upcoming appointments.</p>
        </div>
        <input
          type="checkbox"
          name="appointmentReminders"
          checked={formData.appointmentReminders}
          onChange={handleInputChange}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">Patient Updates</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Be notified when patients update their information or records.</p>
        </div>
        <input
          type="checkbox"
          name="patientUpdates"
          checked={formData.patientUpdates}
          onChange={handleInputChange}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">System Updates</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Receive news and updates about the Health Service Directory platform.</p>
        </div>
        <input
          type="checkbox"
          name="systemUpdates"
          checked={formData.systemUpdates}
          onChange={handleInputChange}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
    </div>
  </div>
)}
{activeTab === 'privacy' && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Privacy Settings</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">Profile Visibility</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Control who can see your profile. Set to private to hide from public search.</p>
        </div>
        <select
          name="profileVisibility"
          value={formData.profileVisibility}
          onChange={handleInputChange}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">Share Availability</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Allow patients to see your available slots for appointments.</p>
        </div>
        <input
          type="checkbox"
          name="shareAvailability"
          checked={formData.shareAvailability}
          onChange={handleInputChange}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">Allow Patient Reviews</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enable or disable patient reviews on your profile.</p>
        </div>
        <input
          type="checkbox"
          name="allowPatientReviews"
          checked={formData.allowPatientReviews}
          onChange={handleInputChange}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
    </div>
  </div>
)}
{activeTab === 'security' && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Security Settings</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">Two-Factor Authentication</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
        </div>
        <input
          type="checkbox"
          name="twoFactorAuth"
          checked={formData.twoFactorAuth}
          onChange={handleInputChange}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">Session Timeout</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Set how long your session stays active without activity.</p>
        </div>
        <select
          name="sessionTimeout"
          value={formData.sessionTimeout}
          onChange={handleInputChange}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
        </select>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">Change Password</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password regularly for better security.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowPasswordModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Change Password
        </button>
      </div>
    </div>
  </div>
)}
{activeTab === 'practice' && (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Practice Settings</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Clinic Name</label>
        <input
          type="text"
          name="clinicName"
          value={formData.clinicName || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          placeholder="Enter your clinic name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Specialization</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          placeholder="e.g. General Medicine"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Consultation Fee (XAF)</label>
        <input
          type="number"
          name="consultationFee"
          value={formData.consultationFee || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          placeholder="e.g. 50000"
        />
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 mt-4">Working Hours</label>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Day</th>
              <th className="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Start</th>
              <th className="px-2 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">End</th>
              <th className="px-2 py-2 text-center font-semibold text-gray-700 dark:text-gray-200">Available</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(formData.workingHours).map(day => (
              <tr key={day} className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-2 py-2 capitalize text-gray-800 dark:text-gray-100">{day}</td>
                <td className="px-2 py-2">
                  <input
                    type="time"
                    value={formData.workingHours[day].start}
                    onChange={e => handleWorkingHoursChange(day, 'start', e.target.value)}
                    className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 w-28"
                    disabled={!formData.workingHours[day].available}
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="time"
                    value={formData.workingHours[day].end}
                    onChange={e => handleWorkingHoursChange(day, 'end', e.target.value)}
                    className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 w-28"
                    disabled={!formData.workingHours[day].available}
                  />
                </td>
                <td className="px-2 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={formData.workingHours[day].available}
                    onChange={e => handleWorkingHoursChange(day, 'available', e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
          
          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          title={confirmationData.title}
          message={confirmationData.message}
          onConfirm={confirmationData.onConfirm}
          onCancel={() => setShowConfirmation(false)}
          type={confirmationData.type}
        />
      )}
      
      {/* Change Password Modal */}
      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </div>
  );
}
