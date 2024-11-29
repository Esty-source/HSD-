import React, { useState } from 'react';
import {
  UserCircleIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+237 677-123-456',
    dateOfBirth: '1990-01-01',
    address: 'Rue 1.890, Bastos, Yaoundé, Cameroon',
    role: 'patient',
    bloodType: 'O+',
    allergies: 'Penicillin',
    medications: 'None',
    emergencyContact: 'Jane Doe (+237 699-987-654)',
    medicalHistory: 'No major surgeries',
    lastCheckup: '2023-12-15',
    insuranceProvider: 'CNAM',
    insuranceNumber: 'INS123456',
    specialization: 'General Practitioner',
    licenseNumber: 'MD12345',
    yearsOfExperience: '15',
    hospitalAffiliation: 'Central Hospital of Yaoundé',
    languages: ['English', 'French'],
    consultationFee: '25000 FCFA',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
              <UserCircleIcon className="h-12 w-12 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.role === 'provider' ? user.specialization : 'Patient'}</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid gap-6">
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
          </div>

          {/* Patient Information */}
          {user.role === 'patient' && (
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medical History
                  </label>
                  <p className="mt-1 text-gray-900">{user.medicalHistory}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Checkup
                  </label>
                  <p className="mt-1 text-gray-900">{user.lastCheckup}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Insurance Provider
                  </label>
                  <p className="mt-1 text-gray-900">{user.insuranceProvider}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Insurance Number
                  </label>
                  <p className="mt-1 text-gray-900">{user.insuranceNumber}</p>
                </div>
              </div>
            </div>
          )}

          {/* Medical Provider Information */}
          {user.role === 'provider' && (
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-green-600" />
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
                    Hospital Affiliation
                  </label>
                  <p className="mt-1 text-gray-900">{user.hospitalAffiliation}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Languages
                  </label>
                  <p className="mt-1 text-gray-900">{user.languages.join(', ')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Consultation Fee
                  </label>
                  <p className="mt-1 text-gray-900">{user.consultationFee}</p>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
              <h2 className="ml-2 text-xl font-semibold text-gray-900">
                Security Settings
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
      </div>
    </div>
  );
}
