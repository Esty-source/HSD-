
import React, { useState } from 'react';
import {
  UserCircleIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  XMarkIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

export default function Profile() {
  const [user, setUser] = useState({
    // Common information
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+237 677-123-456',
    dateOfBirth: '1990-01-01',
    address: 'Rue 1.890, Bastos, Yaoundé, Cameroon',
    profileImage: null,
    gender: 'Male',
    nationality: 'Cameroonian',
    languages: ['English', 'French'],
    role: 'provider', // or 'patient'

    // Patient specific information
    emergencyContact: 'Jane Doe (+237 699-987-654)',
    bloodType: 'O+',
    allergies: 'None',
    medications: 'None',
    chronicConditions: 'None',
    pastSurgeries: 'None',
    familyHistory: 'No significant history',
    lifestyle: {
      smoking: 'Non-smoker',
      alcohol: 'Occasional',
      exercise: 'Regular',
      diet: 'Balanced',
    },
    insuranceProvider: 'CNAM',
    insuranceNumber: 'INS123456',
    lastCheckup: '2023-01-15',
    preferredHospital: 'Central Hospital of Yaoundé',

    // Provider specific information
    specialization: 'General Practitioner',
    subSpecialties: ['Family Medicine', 'Preventive Care'],
    licenseNumber: 'MD12345',
    yearsOfExperience: '15',
    education: [
      {
        degree: 'Doctor of Medicine',
        institution: 'University of Yaoundé Faculty of Medicine',
        year: '2005',
      },
      {
        degree: 'Residency in Family Medicine',
        institution: 'Central Hospital of Yaoundé',
        year: '2008',
      },
    ],
    certifications: [
      {
        name: 'Board Certification in Family Medicine',
        issuer: 'Cameroon Medical Board',
        year: '2010',
      },
    ],
    hospitalAffiliation: 'Central Hospital of Yaoundé',
    clinicAddress: 'Medical Plaza, Floor 3, Yaoundé',
    consultationHours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 3:00 PM',
    },
    consultationFee: '25000 FCFA',
    onlineConsultationFee: '15000 FCFA',
    acceptedInsurance: ['CNAM', 'CNPS', 'Sanlam'],
    services: [
      'General Consultations',
      'Preventive Care',
      'Chronic Disease Management',
      'Vaccinations',
      'Health Screenings',
    ],
    expertise: [
      'Diabetes Management',
      'Hypertension',
      'Pediatric Care',
      'Geriatric Medicine',
    ],
    publications: [
      {
        title: 'Healthcare Accessibility in Rural Cameroon',
        journal: 'African Medical Journal',
        year: '2018',
      },
    ],
    languages: ['English', 'French'],
    telemedAvailable: true,
    homeVisitsAvailable: true,
    rating: 4.8,
    reviewCount: 156,
    achievements: [
      'Best Family Physician Award 2020',
      'Community Health Excellence Award 2019',
    ],
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [showEditPersonal, setShowEditPersonal] = useState(false);
  const [showEditMedical, setShowEditMedical] = useState(false);
  const [showEditProvider, setShowEditProvider] = useState(false);
  const [showEditLifestyle, setShowEditLifestyle] = useState(false);
  const [showEditEducation, setShowEditEducation] = useState(false);
  const [showEditServices, setShowEditServices] = useState(false);
  const [editData, setEditData] = useState({ ...user });

  const handleEditPersonal = () => {
    setEditData({ ...user });
    setShowEditPersonal(true);
  };

  const handleEditMedical = () => {
    setEditData({ ...user });
    setShowEditMedical(true);
  };

  const handleEditProvider = () => {
    setEditData({ ...user });
    setShowEditProvider(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPersonal = (e) => {
    e.preventDefault();
    setUser((prev) => ({
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
    setUser((prev) => ({
      ...prev,
      bloodType: editData.bloodType,
      allergies: editData.allergies,
      medications: editData.medications,
      emergencyContact: editData.emergencyContact,
    }));
    setShowEditMedical(false);
  };

  const handleSubmitProvider = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      specialization: editData.specialization,
      licenseNumber: editData.licenseNumber,
      yearsOfExperience: editData.yearsOfExperience,
      education: editData.education,
      hospitalAffiliation: editData.hospitalAffiliation,
      languages: editData.languages,
      consultationFee: editData.consultationFee,
      availability: editData.availability,
      services: editData.services,
    }));
    setShowEditProvider(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUser((prev) => ({ ...prev, profileImage: URL.createObjectURL(file) }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <UserCircleIcon className="h-12 w-12 text-blue-600" />
                </div>
              )}
              <button
                className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow-lg"
                onClick={() => document.getElementById('profile-image').click()}
              >
                <PencilIcon className="h-4 w-4 text-gray-600" />
              </button>
              <input
                type="file"
                id="profile-image"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-500">
                {user.role === 'provider' ? user.specialization : 'Patient'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
              {user.role === 'provider' ? 'Medical Provider' : 'Patient'}
            </span>
            <button
              onClick={handleEditPersonal}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('personal')}
              className={`${
                activeTab === 'personal'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
            >
              Personal Information
            </button>
            {user.role === 'patient' ? (
              <>
                <button
                  onClick={() => setActiveTab('medical')}
                  className={`${
                    activeTab === 'medical'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
                >
                  Medical History
                </button>
                <button
                  onClick={() => setActiveTab('lifestyle')}
                  className={`${
                    activeTab === 'lifestyle'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
                >
                  Lifestyle & Preferences
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('professional')}
                  className={`${
                    activeTab === 'professional'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
                >
                  Professional Info
                </button>
                <button
                  onClick={() => setActiveTab('practice')}
                  className={`${
                    activeTab === 'practice'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
                >
                  Practice Details
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`${
                    activeTab === 'achievements'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
                >
                  Achievements
                </button>
              </>
            )}
            <button
              onClick={() => setActiveTab('settings')}
              className={`${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Profile Information */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserCircleIcon className="h-6 w-6 text-blue-600" />
                <h2 className="ml-2 text-xl font-semibold text-gray-900">
                  Personal Information
                </h2>
              </div>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {user.role === 'provider' ? 'Medical Provider' : 'Patient'}
              </span>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <p className="mt-1 text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <p className="mt-1 text-gray-900">{user.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <p className="mt-1 text-gray-900">{user.dateOfBirth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <p className="mt-1 text-gray-900">{user.address}</p>
              </div>
            </div>
            <button
              onClick={handleEditPersonal}
              className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Edit Information
            </button>
          </div>

          {/* Medical Information */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              <h2 className="ml-2 text-xl font-semibold text-gray-900">
                Medical Information
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Blood Type
                </label>
                <p className="mt-1 text-gray-900">{user.bloodType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allergies
                </label>
                <p className="mt-1 text-gray-900">{user.allergies}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Medications
                </label>
                <p className="mt-1 text-gray-900">{user.medications}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact
                </label>
                <p className="mt-1 text-gray-900">{user.emergencyContact}</p>
              </div>
            </div>
            <button
              onClick={handleEditMedical}
              className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Update Medical Info
            </button>
          </div>

          {/* Medical Provider Information */}
          {user.role === 'provider' && (
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <UserCircleIcon className="h-6 w-6 text-green-600" />
                <h2 className="ml-2 text-xl font-semibold text-gray-900">
                  Provider Information
                </h2>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Specialization
                  </label>
                  <p className="mt-1 text-gray-900">{user.specialization}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    License Number
                  </label>
                  <p className="mt-1 text-gray-900">{user.licenseNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Years of Experience
                  </label>
                  <p className="mt-1 text-gray-900">{user.yearsOfExperience}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Education
                  </label>
                  <p className="mt-1 text-gray-900">{user.education}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Hospital Affiliation
                  </label>
                  <p className="mt-1 text-gray-900">{user.hospitalAffiliation}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Languages
                  </label>
                  <p className="mt-1 text-gray-900">{user.languages}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Consultation Fee
                  </label>
                  <p className="mt-1 text-gray-900">{user.consultationFee}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <p className="mt-1 text-gray-900">{user.availability}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Services
                  </label>
                  <p className="mt-1 text-gray-900">{user.services}</p>
                </div>
              </div>
              <button
                onClick={handleEditProvider}
                className="mt-6 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
              >
                Edit Provider Info
              </button>
            </div>
          )}

          {/* Security Settings */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
              <h2 className="ml-2 text-xl font-semibold text-gray-900">
                Security
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              <button className="flex w-full items-center justify-between rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">
                    Change Password
                  </span>
                </div>
                <span className="text-sm text-blue-600">Update</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg border border-gray-300 p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <BellIcon className="h-5 w-5 text-gray-400" />
                  <span className="ml-3 text-sm text-gray-900">
                    Notification Settings
                  </span>
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
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Edit Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={editData.dateOfBirth}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
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
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Update Medical Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Blood Type
                      </label>
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
                      <label className="block text-sm font-medium text-gray-700">
                        Allergies
                      </label>
                      <textarea
                        name="allergies"
                        value={editData.allergies}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Current Medications
                      </label>
                      <textarea
                        name="medications"
                        value={editData.medications}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Emergency Contact
                      </label>
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

        {/* Edit Provider Information Modal */}
        {showEditProvider && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    onClick={() => setShowEditProvider(false)}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleSubmitProvider}>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Edit Provider Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Specialization
                      </label>
                      <input
                        type="text"
                        name="specialization"
                        value={editData.specialization}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        License Number
                      </label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={editData.licenseNumber}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Years of Experience
                      </label>
                      <input
                        type="text"
                        name="yearsOfExperience"
                        value={editData.yearsOfExperience}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Education
                      </label>
                      <input
                        type="text"
                        name="education"
                        value={editData.education}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Hospital Affiliation
                      </label>
                      <input
                        type="text"
                        name="hospitalAffiliation"
                        value={editData.hospitalAffiliation}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Languages
                      </label>
                      <input
                        type="text"
                        name="languages"
                        value={editData.languages}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Consultation Fee
                      </label>
                      <input
                        type="text"
                        name="consultationFee"
                        value={editData.consultationFee}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Availability
                      </label>
                      <input
                        type="text"
                        name="availability"
                        value={editData.availability}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Services
                      </label>
                      <textarea
                        name="services"
                        value={editData.services}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
