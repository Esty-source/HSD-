import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
  BellIcon,
  KeyIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    notifications: {
      email: true,
      sms: true,
      appointmentReminders: true,
      healthTips: true
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('notification.')) {
      const notificationType = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationType]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      showToast('Profile updated successfully', 'success');
      setIsEditing(false);
    } catch (error) {
      showToast(error.message || 'Failed to update profile', 'error');
    }
  };

  const sections = [
    {
      title: 'Personal Information',
      icon: UserCircleIcon,
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email', icon: EnvelopeIcon },
        { name: 'phone', label: 'Phone', type: 'tel', icon: PhoneIcon },
        { name: 'address', label: 'Address', type: 'text', icon: MapPinIcon }
      ]
    },
    {
      title: 'Notification Preferences',
      icon: BellIcon,
      fields: [
        { name: 'notification.email', label: 'Email Notifications', type: 'checkbox' },
        { name: 'notification.sms', label: 'SMS Notifications', type: 'checkbox' },
        { name: 'notification.appointmentReminders', label: 'Appointment Reminders', type: 'checkbox' },
        { name: 'notification.healthTips', label: 'Health Tips', type: 'checkbox' }
      ]
    },
    {
      title: 'Security',
      icon: ShieldCheckIcon,
      fields: [
        { name: 'currentPassword', label: 'Current Password', type: 'password', icon: KeyIcon },
        { name: 'newPassword', label: 'New Password', type: 'password', icon: KeyIcon },
        { name: 'confirmPassword', label: 'Confirm New Password', type: 'password', icon: KeyIcon }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Settings</h3>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-8">
                {sections.map((section) => (
                  <div key={section.title} className="space-y-6">
                    <div className="flex items-center">
                      <section.icon className="h-6 w-6 text-gray-400" />
                      <h4 className="ml-2 text-lg font-medium text-gray-900">{section.title}</h4>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {section.fields.map((field) => (
                        <div key={field.name} className="col-span-1">
                          {field.type === 'checkbox' ? (
                            <div className="flex items-center">
                              <input
                                id={field.name}
                                name={field.name}
                                type="checkbox"
                                checked={formData.notifications[field.name.split('.')[1]]}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label htmlFor={field.name} className="ml-2 block text-sm text-gray-900">
                                {field.label}
                              </label>
                            </div>
                          ) : (
                            <div>
                              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                {field.label}
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                {field.icon && (
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <field.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                  </div>
                                )}
                                <input
                                  type={field.type}
                                  name={field.name}
                                  id={field.name}
                                  value={formData[field.name.split('.')[0]]}
                                  onChange={handleChange}
                                  disabled={!isEditing}
                                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                                    field.icon ? 'pl-10' : ''
                                  } ${!isEditing ? 'bg-gray-50' : ''}`}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
