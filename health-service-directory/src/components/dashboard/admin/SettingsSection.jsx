import { useState } from 'react';
import { Cog6ToothIcon, BellIcon, ShieldCheckIcon, ServerIcon } from '@heroicons/react/24/outline';

export default function SettingsSection() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    twoFactorAuth: false,
    maintenanceMode: false
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-8 px-2 sm:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-6 drop-shadow">System Settings</h2>
        <div className="bg-white rounded-2xl shadow-xl divide-y divide-gray-100">
          {/* Notification Settings */}
          <div className="flex items-center justify-between px-8 py-6 group hover:bg-blue-50 transition">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center shadow group-hover:scale-105 transition-transform">
                <BellIcon className="h-7 w-7 text-blue-600" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-500">Enable or disable system notifications</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifications')}
              className={`relative inline-flex h-7 w-14 items-center rounded-full focus:outline-none ring-2 ring-transparent focus:ring-blue-400 transition-all duration-200 ${settings.notifications ? 'bg-blue-600' : 'bg-gray-200'}`}
              aria-pressed={settings.notifications}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-all duration-200 ${settings.notifications ? 'translate-x-7' : 'translate-x-1'}`}
              />
            </button>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between px-8 py-6 group hover:bg-green-50 transition">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center shadow group-hover:scale-105 transition-transform">
                <BellIcon className="h-7 w-7 text-green-600" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`relative inline-flex h-7 w-14 items-center rounded-full focus:outline-none ring-2 ring-transparent focus:ring-green-400 transition-all duration-200 ${settings.emailNotifications ? 'bg-green-600' : 'bg-gray-200'}`}
              aria-pressed={settings.emailNotifications}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-all duration-200 ${settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'}`}
              />
            </button>
          </div>

          {/* Security Settings */}
          <div className="flex items-center justify-between px-8 py-6 group hover:bg-purple-50 transition">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center shadow group-hover:scale-105 transition-transform">
                <ShieldCheckIcon className="h-7 w-7 text-purple-600" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('twoFactorAuth')}
              className={`relative inline-flex h-7 w-14 items-center rounded-full focus:outline-none ring-2 ring-transparent focus:ring-purple-400 transition-all duration-200 ${settings.twoFactorAuth ? 'bg-purple-600' : 'bg-gray-200'}`}
              aria-pressed={settings.twoFactorAuth}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-all duration-200 ${settings.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'}`}
              />
            </button>
          </div>

          {/* System Settings */}
          <div className="flex items-center justify-between px-8 py-6 group hover:bg-yellow-50 transition">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center shadow group-hover:scale-105 transition-transform">
                <ServerIcon className="h-7 w-7 text-yellow-600" />
              </div>
              <div className="ml-5">
                <h3 className="text-lg font-semibold text-gray-900">Maintenance Mode</h3>
                <p className="text-sm text-gray-500">Put the system in maintenance mode</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('maintenanceMode')}
              className={`relative inline-flex h-7 w-14 items-center rounded-full focus:outline-none ring-2 ring-transparent focus:ring-yellow-400 transition-all duration-200 ${settings.maintenanceMode ? 'bg-yellow-600' : 'bg-gray-200'}`}
              aria-pressed={settings.maintenanceMode}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-all duration-200 ${settings.maintenanceMode ? 'translate-x-7' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-400 text-center mt-8">&copy; {new Date().getFullYear()} Health Service Directory Admin</div>
    </div>
  );
}