import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../ui/ConfirmationModal';
import ChangePasswordModal from './ChangePasswordModal';
import { 
  Cog6ToothIcon, 
  BellIcon, 
  LockClosedIcon, 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  LanguageIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';

export default function SettingsSection() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'primary'
  });
  // Check for saved theme on component mount and apply it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setFormData(prev => ({ ...prev, theme: savedTheme }));
      
      // Apply the theme
      applyTheme(savedTheme);
      
      // Clean up event listener when component unmounts
      return () => {
        if (window._themeMediaQuery && window._handleThemeChange) {
          try {
            window._themeMediaQuery.removeEventListener('change', window._handleThemeChange);
          } catch (e) {
            // Fallback for older browsers
            window._themeMediaQuery.removeListener(window._handleThemeChange);
          }
        }
      };
    }
  }, []);
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    // General Settings
    language: 'english',
    theme: 'light',
    timeZone: 'Africa/Douala',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    medicationReminders: true,
    healthTips: true,
    
    // Privacy Settings
    profileVisibility: 'private',
    shareHealthData: false,
    allowResearch: false,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: '30',
    
    // Accessibility Settings
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: false,
  });

  // Function to check if system prefers dark mode
  const systemPrefersDark = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Function to apply theme to document
  const applyTheme = (theme) => {
    if (typeof window === 'undefined') return;
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Remove any existing event listener for system preference changes
    if (window._themeMediaQuery) {
      window._themeMediaQuery.removeEventListener('change', window._handleThemeChange);
      window._themeMediaQuery = null;
      window._handleThemeChange = null;
    }
    
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
      console.log('Dark theme applied');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900', 'text-white');
      console.log('Light theme applied');
    } else if (theme === 'system') {
      console.log('System theme selected, checking preference...');
      
      // Apply based on current system preference
      if (systemPrefersDark()) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('bg-gray-900', 'text-white');
        console.log('System prefers dark - dark theme applied');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('bg-gray-900', 'text-white');
        console.log('System prefers light - light theme applied');
      }
      
      // Set up listener for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        console.log('System preference changed:', e.matches ? 'dark' : 'light');
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };
      
      // Store references to remove listener later
      window._themeMediaQuery = mediaQuery;
      window._handleThemeChange = handleChange;
      
      // Add listener for system preference changes
      try {
        // Modern API
        mediaQuery.addEventListener('change', handleChange);
      } catch (e) {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Apply theme changes immediately for preview
    if (name === 'theme') {
      applyTheme(value);
    }
  };

  const showConfirmModal = (title, message, onConfirm, type = 'primary') => {
    setConfirmationData({ title, message, onConfirm, type });
    setShowConfirmation(true);
  };

  const saveSettings = () => {
    // TODO: API call to update settings
    
    // Apply theme changes (already applied on change, but ensure it's applied)
    applyTheme(formData.theme);
    
    // Show success toast instead of alert
    toast.success('Settings saved successfully!', {
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#10B981',
        color: '#fff',
        fontWeight: 'bold',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10B981',
      },
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show confirmation modal before saving
    showConfirmModal(
      'Save Settings',
      'Are you sure you want to save these settings? This will update your preferences across the platform.',
      saveSettings,
      'primary'
    );
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Cog6ToothIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon },
    { id: 'security', name: 'Security', icon: LockClosedIcon },
    { id: 'accessibility', name: 'Accessibility', icon: DocumentTextIcon },
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
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">General Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="english">English</option>
                    <option value="french">French</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time Zone
                  </label>
                  <select
                    name="timeZone"
                    value={formData.timeZone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Africa/Douala">Cameroon (GMT+1)</option>
                    <option value="Africa/Lagos">Nigeria (GMT+1)</option>
                    <option value="Africa/Accra">Ghana (GMT+0)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Theme
                </label>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div 
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400' : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    onClick={() => {
                      setFormData({...formData, theme: 'light'});
                      applyTheme('light');
                    }}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={formData.theme === 'light'}
                      onChange={() => {}} // Handled by the onClick above
                      className="sr-only"
                    />
                    <SunIcon className="h-6 w-6 text-yellow-500 mr-2" />
                    <span className="dark:text-white">Light</span>
                  </div>
                  
                  <div 
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400' : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    onClick={() => {
                      setFormData({...formData, theme: 'dark'});
                      applyTheme('dark');
                    }}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={formData.theme === 'dark'}
                      onChange={() => {}} // Handled by the onClick above
                      className="sr-only"
                    />
                    <MoonIcon className="h-6 w-6 text-indigo-500 dark:text-indigo-400 mr-2" />
                    <span className="dark:text-white">Dark</span>
                  </div>
                  
                  <div 
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.theme === 'system' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400' : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    onClick={() => {
                      setFormData({...formData, theme: 'system'});
                      applyTheme('system');
                    }}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value="system"
                      checked={formData.theme === 'system'}
                      onChange={() => {}} // Handled by the onClick above
                      className="sr-only"
                    />
                    <Cog6ToothIcon className="h-6 w-6 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="dark:text-white">System</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-800">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-800">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={formData.smsNotifications}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-800">Appointment Reminders</h4>
                    <p className="text-sm text-gray-500">Receive reminders for upcoming appointments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="appointmentReminders"
                      checked={formData.appointmentReminders}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-800">Medication Reminders</h4>
                    <p className="text-sm text-gray-500">Receive reminders to take your medications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="medicationReminders"
                      checked={formData.medicationReminders}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium text-gray-800">Health Tips</h4>
                    <p className="text-sm text-gray-500">Receive health tips and recommendations</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="healthTips"
                      checked={formData.healthTips}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Visibility
                  </label>
                  <select
                    name="profileVisibility"
                    value={formData.profileVisibility}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="private">Private - Only my healthcare providers can see my profile</option>
                    <option value="limited">Limited - Healthcare providers and selected contacts</option>
                    <option value="public">Public - Anyone in the healthcare system</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-800">Share Health Data</h4>
                    <p className="text-sm text-gray-500">Allow sharing of anonymized health data with healthcare providers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="shareHealthData"
                      checked={formData.shareHealthData}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium text-gray-800">Allow Research Use</h4>
                    <p className="text-sm text-gray-500">Allow anonymized data to be used for medical research</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="allowResearch"
                      checked={formData.allowResearch}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={formData.twoFactorAuth}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <select
                    name="sessionTimeout"
                    value={formData.sessionTimeout}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                
                <div className="mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Accessibility Settings */}
          {activeTab === 'accessibility' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Accessibility Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Size
                  </label>
                  <select
                    name="fontSize"
                    value={formData.fontSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="x-large">Extra Large</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-800">High Contrast Mode</h4>
                    <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="highContrast"
                      checked={formData.highContrast}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium text-gray-800">Reduced Motion</h4>
                    <p className="text-sm text-gray-500">Minimize animations and motion effects</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="reducedMotion"
                      checked={formData.reducedMotion}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm dark:shadow-blue-900/30"
            >
              Save Settings
            </button>
          </div>
          
          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onConfirm={confirmationData.onConfirm}
            title={confirmationData.title}
            message={confirmationData.message}
            type={confirmationData.type}
          />
          
          {/* Change Password Modal */}
          <ChangePasswordModal
            isOpen={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
            onSuccess={() => {
              toast.success('Password changed successfully!', {
                duration: 3000,
                position: 'top-center',
              });
            }}
          />
        </form>
      </div>
    </div>
  );
}
