import React, { useState } from 'react';
import {
  UserCircleIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  IdentificationIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+237 677-123-456',
    dateOfBirth: '1990-01-01',
    address: 'Rue 1.890, Bastos, Yaoundé, Cameroon',
    profileImage: null,
    role: 'patient',
    // Patient Information
    bloodType: 'O+',
    allergies: 'Penicillin',
    medications: 'None',
    emergencyContact: 'Jane Doe (+237 699-987-654)',
    medicalHistory: 'No major surgeries',
    lastCheckup: '2023-12-15',
    insuranceProvider: 'CNAM',
    insuranceNumber: 'INS123456',
    // Provider Information
    specialization: 'General Practitioner',
    licenseNumber: 'MD12345',
    yearsOfExperience: '15',
    hospitalAffiliation: 'Central Hospital of Yaoundé',
    languages: ['English', 'French'],
    consultationFee: '25000 FCFA',
  });

  const [editMode, setEditMode] = useState({
    personal: false,
    medical: false,
    provider: false,
  });

  const [editedData, setEditedData] = useState({});
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleEdit = (section) => {
    setEditMode({ ...editMode, [section]: true });
    setEditedData({ ...user });
  };

  const handleCancel = (section) => {
    setEditMode({ ...editMode, [section]: false });
    setEditedData({});
  };

  const handleSave = async (section) => {
    try {
      // Here you would typically make an API call to update the user data
      // await updateUserProfile(editedData);
      setUser(editedData);
      setEditMode({ ...editMode, [section]: false });
      setEditedData({});
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (show notification, etc.)
    }
  };

  const handleChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleRoleSwitch = (newRole) => {
    setUser({ ...user, role: newRole });
    setShowRoleModal(false);
  };

  const EditableField = ({ label, field, value, type = 'text' }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );

  const DisplayField = ({ label, value }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <p className="mt-1 text-gray-900">{value}</p>
    </div>
  );

  // Role Switch Modal
  const RoleSwitchModal = () => (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
        <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                Switch Profile Type
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleRoleSwitch('patient')}
                  className={`flex flex-col items-center justify-center rounded-lg p-4 ${
                    user.role === 'patient' ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <UserCircleIcon className="h-8 w-8 text-blue-600" />
                  <span className="mt-2 font-medium text-gray-900">Patient</span>
                  <span className="mt-1 text-sm text-gray-500">Access your medical records</span>
                </button>
                <button
                  onClick={() => handleRoleSwitch('provider')}
                  className={`flex flex-col items-center justify-center rounded-lg p-4 ${
                    user.role === 'provider' ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <BuildingOffice2Icon className="h-8 w-8 text-blue-600" />
                  <span className="mt-2 font-medium text-gray-900">Healthcare Provider</span>
                  <span className="mt-1 text-sm text-gray-500">Manage your practice</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
              onClick={() => setShowRoleModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-8 text-center">
          <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-1 shadow-xl">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <UserCircleIcon className="h-20 w-20 text-gray-400" />
              </div>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">{user.name}</h1>
          <div className="mt-2 flex items-center justify-center">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              user.role === 'provider' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
            }`}>
              {user.role === 'provider' ? 'Healthcare Provider' : 'Patient'}
            </span>
            <button
              onClick={() => setShowRoleModal(true)}
              className="ml-2 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Switch Role
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid gap-8">
          {/* Personal Information */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
            <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <IdentificationIcon className="h-6 w-6 text-blue-600" />
                  <h2 className="ml-2 text-xl font-semibold text-gray-900">Personal Information</h2>
                </div>
                {!editMode.personal ? (
                  <button
                    onClick={() => handleEdit('personal')}
                    className="flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
                  >
                    <PencilSquareIcon className="mr-1 h-4 w-4" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave('personal')}
                      className="flex items-center rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-100"
                    >
                      <CheckIcon className="mr-1 h-4 w-4" />
                      Save
                    </button>
                    <button
                      onClick={() => handleCancel('personal')}
                      className="flex items-center rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      <XMarkIcon className="mr-1 h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {editMode.personal ? (
                  <>
                    <EditableField label="Full Name" field="name" value={editedData.name} />
                    <EditableField label="Email" field="email" value={editedData.email} type="email" />
                    <EditableField label="Phone" field="phone" value={editedData.phone} type="tel" />
                    <EditableField label="Date of Birth" field="dateOfBirth" value={editedData.dateOfBirth} type="date" />
                    <EditableField label="Address" field="address" value={editedData.address} />
                  </>
                ) : (
                  <>
                    <DisplayField label="Full Name" value={user.name} />
                    <DisplayField label="Email" value={user.email} />
                    <DisplayField label="Phone" value={user.phone} />
                    <DisplayField label="Date of Birth" value={user.dateOfBirth} />
                    <DisplayField label="Address" value={user.address} />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Patient Information */}
          {user.role === 'patient' && (
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
              <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                    <h2 className="ml-2 text-xl font-semibold text-gray-900">Medical Information</h2>
                  </div>
                  {!editMode.medical ? (
                    <button
                      onClick={() => handleEdit('medical')}
                      className="flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
                    >
                      <PencilSquareIcon className="mr-1 h-4 w-4" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave('medical')}
                        className="flex items-center rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-100"
                      >
                        <CheckIcon className="mr-1 h-4 w-4" />
                        Save
                      </button>
                      <button
                        onClick={() => handleCancel('medical')}
                        className="flex items-center rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        <XMarkIcon className="mr-1 h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {editMode.medical ? (
                    <>
                      <div className="rounded-lg bg-blue-50 p-4">
                        <EditableField label="Blood Type" field="bloodType" value={editedData.bloodType} />
                      </div>
                      <div className="rounded-lg bg-red-50 p-4">
                        <EditableField label="Allergies" field="allergies" value={editedData.allergies} />
                      </div>
                      <div className="rounded-lg bg-green-50 p-4">
                        <EditableField label="Current Medications" field="medications" value={editedData.medications} />
                      </div>
                      <div className="rounded-lg bg-yellow-50 p-4">
                        <EditableField label="Emergency Contact" field="emergencyContact" value={editedData.emergencyContact} />
                      </div>
                      <div className="col-span-2 rounded-lg bg-purple-50 p-4">
                        <EditableField label="Medical History" field="medicalHistory" value={editedData.medicalHistory} />
                      </div>
                      <div className="rounded-lg bg-indigo-50 p-4">
                        <EditableField label="Last Checkup" field="lastCheckup" value={editedData.lastCheckup} type="date" />
                      </div>
                      <div className="rounded-lg bg-pink-50 p-4">
                        <EditableField label="Insurance Provider" field="insuranceProvider" value={editedData.insuranceProvider} />
                        <EditableField label="Insurance Number" field="insuranceNumber" value={editedData.insuranceNumber} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="rounded-lg bg-blue-50 p-4">
                        <DisplayField label="Blood Type" value={user.bloodType} />
                      </div>
                      <div className="rounded-lg bg-red-50 p-4">
                        <DisplayField label="Allergies" value={user.allergies} />
                      </div>
                      <div className="rounded-lg bg-green-50 p-4">
                        <DisplayField label="Current Medications" value={user.medications} />
                      </div>
                      <div className="rounded-lg bg-yellow-50 p-4">
                        <DisplayField label="Emergency Contact" value={user.emergencyContact} />
                      </div>
                      <div className="col-span-2 rounded-lg bg-purple-50 p-4">
                        <DisplayField label="Medical History" value={user.medicalHistory} />
                      </div>
                      <div className="rounded-lg bg-indigo-50 p-4">
                        <DisplayField label="Last Checkup" value={user.lastCheckup} />
                      </div>
                      <div className="rounded-lg bg-pink-50 p-4">
                        <DisplayField label="Insurance Provider" value={user.insuranceProvider} />
                        <DisplayField label="Insurance Number" value={user.insuranceNumber} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Medical Provider Information */}
          {user.role === 'provider' && (
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
              <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BuildingOffice2Icon className="h-6 w-6 text-blue-600" />
                    <h2 className="ml-2 text-xl font-semibold text-gray-900">Professional Information</h2>
                  </div>
                  {!editMode.provider ? (
                    <button
                      onClick={() => handleEdit('provider')}
                      className="flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
                    >
                      <PencilSquareIcon className="mr-1 h-4 w-4" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave('provider')}
                        className="flex items-center rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-100"
                      >
                        <CheckIcon className="mr-1 h-4 w-4" />
                        Save
                      </button>
                      <button
                        onClick={() => handleCancel('provider')}
                        className="flex items-center rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-100"
                      >
                        <XMarkIcon className="mr-1 h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {editMode.provider ? (
                    <>
                      <div className="rounded-lg bg-blue-50 p-4">
                        <EditableField label="Specialization" field="specialization" value={editedData.specialization} />
                      </div>
                      <div className="rounded-lg bg-green-50 p-4">
                        <EditableField label="License Number" field="licenseNumber" value={editedData.licenseNumber} />
                      </div>
                      <div className="rounded-lg bg-yellow-50 p-4">
                        <EditableField label="Experience" field="yearsOfExperience" value={editedData.yearsOfExperience} />
                      </div>
                      <div className="rounded-lg bg-indigo-50 p-4">
                        <EditableField label="Hospital Affiliation" field="hospitalAffiliation" value={editedData.hospitalAffiliation} />
                      </div>
                      <div className="rounded-lg bg-purple-50 p-4">
                        <EditableField label="Languages" field="languages" value={editedData.languages.join(', ')} />
                      </div>
                      <div className="rounded-lg bg-pink-50 p-4">
                        <EditableField label="Consultation Fee" field="consultationFee" value={editedData.consultationFee} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="rounded-lg bg-blue-50 p-4">
                        <DisplayField label="Specialization" value={user.specialization} />
                      </div>
                      <div className="rounded-lg bg-green-50 p-4">
                        <DisplayField label="License Number" value={user.licenseNumber} />
                      </div>
                      <div className="rounded-lg bg-yellow-50 p-4">
                        <DisplayField label="Experience" value={user.yearsOfExperience} />
                      </div>
                      <div className="rounded-lg bg-indigo-50 p-4">
                        <DisplayField label="Hospital Affiliation" value={user.hospitalAffiliation} />
                      </div>
                      <div className="rounded-lg bg-purple-50 p-4">
                        <DisplayField label="Languages" value={user.languages.join(', ')} />
                      </div>
                      <div className="rounded-lg bg-pink-50 p-4">
                        <DisplayField label="Consultation Fee" value={user.consultationFee} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl">
            <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
                <h2 className="ml-2 text-xl font-semibold text-gray-900">Security Settings</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                <button className="flex items-center rounded-lg bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100">
                  <KeyIcon className="h-5 w-5 text-gray-600" />
                  <span className="ml-3 font-medium text-gray-900">Change Password</span>
                </button>
                <button className="flex items-center rounded-lg bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100">
                  <BellIcon className="h-5 w-5 text-gray-600" />
                  <span className="ml-3 font-medium text-gray-900">Notification Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Show Role Switch Modal */}
      {showRoleModal && <RoleSwitchModal />}
    </div>
  );
}
