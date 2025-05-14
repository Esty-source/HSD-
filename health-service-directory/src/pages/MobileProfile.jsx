import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon, PencilSquareIcon, ArrowRightOnRectangleIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import MobileLayout from '../components/responsive/MobileLayout';

// Mock user data (replace with real user context or props as needed)
const initialUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+237 677-123-456',
  avatar: null,
};

export default function MobileProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(user);

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/auth');
  };

  const handleEdit = () => {
    setForm(user);
    setEditMode(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(form);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <MobileLayout title="Profile">
      <div className="flex flex-col items-center py-8 px-4">
        {/* Avatar */}
        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
          ) : (
            <UserCircleIcon className="h-20 w-20 text-white" />
          )}
        </div>
        {/* Name, Email, Phone */}
        {editMode ? (
          <form className="w-full flex flex-col items-center space-y-3 mb-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-blue-500"
              placeholder="Phone"
            />
            <div className="flex w-full space-x-2 mt-2">
              <button type="button" onClick={handleSave} className="flex-1 flex items-center justify-center py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
                <CheckIcon className="h-5 w-5 mr-1" /> Save
              </button>
              <button type="button" onClick={handleCancel} className="flex-1 flex items-center justify-center py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition">
                <XMarkIcon className="h-5 w-5 mr-1" /> Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-blue-900 mb-1">{user.name}</h2>
            <div className="text-gray-600 text-sm mb-1">{user.email}</div>
            <div className="text-gray-600 text-sm mb-4">{user.phone}</div>
          </>
        )}
        {/* Actions */}
        {!editMode && (
          <div className="w-full flex flex-col space-y-3 mt-6">
            <button
              className="flex items-center justify-center w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-base shadow hover:bg-blue-700 transition"
              onClick={handleEdit}
            >
              <PencilSquareIcon className="h-5 w-5 mr-2" /> Edit Profile
            </button>
            <button
              className="flex items-center justify-center w-full py-3 rounded-xl bg-red-500 text-white font-semibold text-base shadow hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
} 