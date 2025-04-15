import { useState } from 'react';
import { 
  UserCircleIcon,
  PencilIcon,
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock doctor profile data
  const profile = {
    name: 'Dr. Sarah Smith',
    title: 'Cardiologist',
    email: 'sarah.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Center Drive, Suite 456, New York, NY 10001',
    specialization: 'Cardiology',
    experience: '15 years',
    education: 'MD, Harvard Medical School',
    license: 'NY-123456',
    languages: ['English', 'Spanish', 'French'],
    availability: 'Monday - Friday, 9:00 AM - 5:00 PM',
    bio: 'Dr. Sarah Smith is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and has published numerous research papers in leading medical journals.'
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <PencilIcon className="h-5 w-5 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserCircleIcon className="h-24 w-24 text-blue-600" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                    <CameraIcon className="h-5 w-5 text-gray-600" />
                  </button>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{profile.name}</h3>
              <p className="text-gray-500">{profile.title}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{profile.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{profile.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{profile.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={profile.specialization}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.specialization}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={profile.experience}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.experience}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={profile.education}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.education}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={profile.license}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.license}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={profile.languages.join(', ')}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.languages.join(', ')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={profile.availability}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600">{profile.availability}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  defaultValue={profile.bio}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-600">{profile.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 