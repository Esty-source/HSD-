import React, { useState } from 'react';
import {
  UserCircleIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+237 677-123-456',
    dateOfBirth: '1990-01-01',
    address: 'Rue 1.890, Bastos, Yaoundé, Cameroon',
    emergencyContact: 'Jane Doe (+237 699-987-654)',
    bloodType: 'O+',
    allergies: 'None',
    medications: 'None',
  });

  const [showEditPersonal, setShowEditPersonal] = useState(false);
  const [showEditMedical, setShowEditMedical] = useState(false);
  const [editData, setEditData] = useState({ ...user });

  const handleEditPersonal = () => {
    setEditData({ ...user });
    setShowEditPersonal(true);
  };

  const handleEditMedical = () => {
    setEditData({ ...user });
    setShowEditMedical(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPersonal = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: editData.name,
      email: editData.email,
      phone: editData.phone,
      dateOfBirth: editData.dateOfBirth,
      address: editData.address,
    }));
    setShowEditPersonal(false);
  };

  const handleSubmitMedical = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      bloodType: editData.bloodType,
      allergies: editData.allergies,
      medications: editData.medications,
      emergencyContact: editData.emergencyContact,
    }));
    setShowEditMedical(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        
        {/* Profile Information */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <UserCircleIcon className="h-6 w-6 text-blue-600" />
              <h2 className="ml-2 text-xl font-semibold text-gray-900">Personal Information</h2>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-gray-900">{user.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <p className="mt-1 text-gray-900">{user.dateOfBirth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="mt-1 text-gray-900">{user.address}</p>
              </div>
            </div>
            <button 
              onClick={handleEditPersonal}
              className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition duration-150 ease-in-out"
            >
              Edit Information
            </button>
          </div>

          {/* Medical Information */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              <h2 className="ml-2 text-xl font-semibold text-gray-900">Medical Information</h2>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                <p className="mt-1 text-gray-900">{user.bloodType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Allergies</label>
                <p className="mt-1 text-gray-900">{user.allergies}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Medications</label>
                <p className="mt-1 text-gray-900">{user.medications}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <p className="mt-1 text-gray-900">{user.emergencyContact}</p>
              </div>
            </div>
            <button 
              onClick={handleEditMedical}
              className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition duration-150 ease-in-out"
            >
              Update Medical Info
            </button>
          </div>

          {/* Security Settings */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
              <h2 className="ml-2 text-xl font-semibold text-gray-900">Security</h2>
            </div>
            <div className="mt-4 space-y-4">
              <button className="flex w-full items-center justify-between rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">Change Password</span>
                </div>
                <span className="text-sm text-blue-600">Update</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <BellIcon className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">Notification Settings</span>
                </div>
                <span className="text-sm text-blue-600">Configure</span>
              </button>
            </div>
          </div>
        </div>

        {/* Edit Personal Information Modal */}
        {showEditPersonal && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    onClick={() => setShowEditPersonal(false)}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleSubmitPersonal}>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={editData.dateOfBirth}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={editData.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowEditPersonal(false)}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Medical Information Modal */}
        {showEditMedical && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    onClick={() => setShowEditMedical(false)}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleSubmitMedical}>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Update Medical Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                      <select
                        name="bloodType"
                        value={editData.bloodType}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Allergies</label>
                      <textarea
                        name="allergies"
                        value={editData.allergies}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Current Medications</label>
                      <textarea
                        name="medications"
                        value={editData.medications}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={editData.emergencyContact}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowEditMedical(false)}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
