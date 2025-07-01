import React, { useState, useEffect } from 'react';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  KeyIcon,
  ShieldCheckIcon,
  BellIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

export default function ProfileSection() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    role: '',
    joinDate: '',
    lastActive: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    let storedUserData = {};
    try {
      storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
    } catch (e) {
      storedUserData = {};
    }
    // Provide safe defaults if missing
    const enhancedUserData = {
      id: storedUserData.id || 'admin-id',
      name: storedUserData.name || 'Admin User',
      email: storedUserData.email || 'admin@healthconnect.com',
      role: storedUserData.role || 'admin',
      phone: storedUserData.phone || '+237 677-123-456',
      address: storedUserData.address || 'Yaoundé, Cameroon',
      bio: storedUserData.bio || 'System administrator for the Health Service Directory platform. Responsible for managing users, security, and system maintenance.',
      joinDate: storedUserData.joinDate || '2024-01-15',
      lastActive: storedUserData.lastActive || new Date().toISOString().split('T')[0]
    };
    setUserData(enhancedUserData);
    setFormData(enhancedUserData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to an API
    // For this demo, we'll just update the local state
    setUserData(formData);
    
    // Update the basic user data in localStorage
    const basicUserData = {
      id: userData.id,
      name: formData.name,
      email: formData.email,
      role: formData.role
    };
    localStorage.setItem('userData', JSON.stringify(basicUserData));
    
    setIsEditing(false);
  };

  if (!userData) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 flex items-center justify-center relative">
            <div className="absolute -bottom-12 w-24 h-24 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center relative">
                <span className="text-2xl font-bold text-white">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </span>
                <button className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1 shadow-md hover:bg-gray-700 transition-colors">
                  <CameraIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-14 pb-6 px-6">
            <h2 className="text-xl font-bold text-center text-gray-900">{userData.name}</h2>
            <p className="text-sm text-center text-gray-500 mt-1 capitalize">{userData.role}</p>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center text-gray-700">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm">{userData.email}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm">{userData.phone}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm">{userData.address}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-500">Joined</p>
                  <p className="font-medium text-gray-900">{new Date(userData.joinDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Last active</p>
                  <p className="font-medium text-gray-900">{new Date(userData.lastActive).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Details */}
        <div className="w-full md:w-2/3 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea 
                      name="bio" 
                      value={formData.bio} 
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">About</h4>
                  <p className="text-sm text-gray-700">{userData.bio}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Account Settings</h4>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <KeyIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-700">Change Password</span>
                      </div>
                      <span className="text-xs text-gray-500">Last changed 30 days ago</span>
                    </a>
                    
                    <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <ShieldCheckIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                      </div>
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Not enabled</span>
                    </a>
                    
                    <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <BellIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-700">Notification Preferences</span>
                      </div>
                      <span className="text-xs text-gray-500">5 active alerts</span>
                    </a>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Session Information</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-gray-500">Current Session</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <p className="text-xs text-gray-500">Last login: {new Date().toLocaleString()}</p>
                    <p className="text-xs text-gray-500">IP Address: 192.168.1.1</p>
                    <p className="text-xs text-gray-500">Device: Chrome on Windows</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
