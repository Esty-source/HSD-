import { useState, useRef } from 'react';
import { UserCircleIcon, IdentificationIcon, HeartIcon, PhoneIcon, ShieldExclamationIcon, PencilIcon, CheckIcon, XMarkIcon, CameraIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../ui/ConfirmationModal';

export default function ProfileSection() {
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+237612345678',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    address: '123 Main Street, Yaoundé',

    // Medical Information
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['None'],
    currentMedications: ['None'],

    // Emergency Contacts
    emergencyContacts: [
      {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+237687654321',
      }
    ],

    // Insurance Information
    insuranceProvider: 'National Health Insurance',
    policyNumber: 'NH123456789',
    expiryDate: '2024-12-31',
    
    // Preferences
    preferences: {
      theme: 'light',
      language: 'english',
      notifications: {
        email: true,
        sms: true,
        app: true,
        appointmentReminders: true,
        medicationReminders: true,
        healthTips: true,
        promotions: false
      }
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      toast.success('Profile image updated! Save changes to apply.', {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const startEditing = () => {
    // Save the original data for cancellation
    setOriginalData({...formData});
    setIsEditing(true);
    toast.success('You can now edit your profile', {
      duration: 2000,
      position: 'top-center',
    });
  };

  const cancelEditing = () => {
    // Restore the original data
    if (originalData) {
      setFormData(originalData);
    }
    setIsEditing(false);
    toast.info('Changes canceled', {
      duration: 2000,
      position: 'top-center',
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Show confirmation modal
    setShowConfirmation(true);
  };
  
  const saveChanges = () => {
    // TODO: API call to update profile
    setIsEditing(false);
    setShowConfirmation(false);
    
    // In a real app, this would be where you'd send the profile image to a server
    // and update the user's profile data
    
    toast.success('Profile updated successfully!', {
      duration: 3000,
      position: 'top-center',
    });
  };

  return (
    <div className="w-full">
      {/* Profile Image Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
        <div className="relative group">
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {isEditing && (
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200"
              onClick={triggerFileInput}
            >
              <div className="flex flex-col items-center text-white">
                <CameraIcon className="h-8 w-8 mb-1" />
                <span className="text-xs">Change Photo</span>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleProfileImageChange} 
              />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          {/* Header with Edit Button */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{formData.firstName} {formData.lastName}</h2>
              <p className="text-gray-500">{formData.email}</p>
            </div>
            {!isEditing ? (
              <button
                onClick={startEditing}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <PencilIcon className="h-5 w-5" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={cancelEditing}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  <XMarkIcon className="h-5 w-5" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <CheckIcon className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <PhoneIcon className="h-4 w-4 mr-1 text-blue-500" />
              <span>{formData.phone}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <IdentificationIcon className="h-4 w-4 mr-1 text-blue-500" />
              <span>Patient ID: P-12345</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <HeartIcon className="h-4 w-4 mr-1 text-blue-500" />
              <span>Blood Type: {formData.bloodType}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Profile sections">
          <button
            onClick={() => setActiveSection('personal')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeSection === 'personal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveSection('medical')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeSection === 'medical' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Medical Information
          </button>
          <button
            onClick={() => setActiveSection('preferences')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${activeSection === 'preferences' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Preferences
          </button>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Personal Information */}
        <div className={`lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${activeSection !== 'personal' ? 'hidden' : ''}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${activeSection !== 'personal' ? 'hidden' : ''}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContacts[0].name}
                onChange={(e) => {
                  const updatedContacts = [...formData.emergencyContacts];
                  updatedContacts[0] = { ...updatedContacts[0], name: e.target.value };
                  setFormData(prev => ({ ...prev, emergencyContacts: updatedContacts }));
                }}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
              <input
                type="text"
                name="emergencyContactRelationship"
                value={formData.emergencyContacts[0].relationship}
                onChange={(e) => {
                  const updatedContacts = [...formData.emergencyContacts];
                  updatedContacts[0] = { ...updatedContacts[0], relationship: e.target.value };
                  setFormData(prev => ({ ...prev, emergencyContacts: updatedContacts }));
                }}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContacts[0].phone}
                onChange={(e) => {
                  const updatedContacts = [...formData.emergencyContacts];
                  updatedContacts[0] = { ...updatedContacts[0], phone: e.target.value };
                  setFormData(prev => ({ ...prev, emergencyContacts: updatedContacts }));
                }}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Medical Information Section */}
      {activeSection === 'medical' && (
        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Medical History */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h3>
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Blood Type</h4>
                <div className="flex items-center space-x-4">
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(type => (
                    <div 
                      key={type}
                      onClick={() => isEditing && setFormData(prev => ({ ...prev, bloodType: type }))}
                      className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer ${formData.bloodType === type ? 'bg-red-100 text-red-800 border-2 border-red-300' : 'bg-gray-100 text-gray-700 border border-gray-200'} ${!isEditing && 'cursor-default'}`}
                    >
                      <span className="text-sm font-medium">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.allergies.map((allergy, index) => (
                    <div 
                      key={index}
                      className="bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      <span>{allergy}</span>
                      {isEditing && (
                        <button 
                          className="ml-2 text-yellow-600 hover:text-yellow-800"
                          onClick={() => {
                            const newAllergies = [...formData.allergies];
                            newAllergies.splice(index, 1);
                            setFormData(prev => ({ ...prev, allergies: newAllergies }));
                          }}
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center hover:bg-gray-200"
                      onClick={() => {
                        const newAllergy = prompt('Enter allergy:');
                        if (newAllergy && newAllergy.trim() !== '') {
                          setFormData(prev => ({ 
                            ...prev, 
                            allergies: [...prev.allergies, newAllergy.trim()]
                          }));
                        }
                      }}
                    >
                      + Add Allergy
                    </button>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Chronic Conditions</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.chronicConditions.map((condition, index) => (
                    <div 
                      key={index}
                      className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      <span>{condition}</span>
                      {isEditing && (
                        <button 
                          className="ml-2 text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            const newConditions = [...formData.chronicConditions];
                            newConditions.splice(index, 1);
                            setFormData(prev => ({ ...prev, chronicConditions: newConditions }));
                          }}
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center hover:bg-gray-200"
                      onClick={() => {
                        const newCondition = prompt('Enter chronic condition:');
                        if (newCondition && newCondition.trim() !== '') {
                          setFormData(prev => ({ 
                            ...prev, 
                            chronicConditions: [...prev.chronicConditions, newCondition.trim()]
                          }));
                        }
                      }}
                    >
                      + Add Condition
                    </button>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Medications</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.currentMedications.map((medication, index) => (
                    <div 
                      key={index}
                      className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      <span>{medication}</span>
                      {isEditing && (
                        <button 
                          className="ml-2 text-green-600 hover:text-green-800"
                          onClick={() => {
                            const newMedications = [...formData.currentMedications];
                            newMedications.splice(index, 1);
                            setFormData(prev => ({ ...prev, currentMedications: newMedications }));
                          }}
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center hover:bg-gray-200"
                      onClick={() => {
                        const newMedication = prompt('Enter medication:');
                        if (newMedication && newMedication.trim() !== '') {
                          setFormData(prev => ({ 
                            ...prev, 
                            currentMedications: [...prev.currentMedications, newMedication.trim()]
                          }));
                        }
                      }}
                    >
                      + Add Medication
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Health Metrics */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Metrics</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                <div className="flex">
                  <input
                    type="number"
                    name="height"
                    value={formData.height || 175}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))} 
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
                  />
                  <span className="ml-2 flex items-center text-gray-500">cm</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                <div className="flex">
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight || 70}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))} 
                    disabled={!isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
                  />
                  <span className="ml-2 flex items-center text-gray-500">kg</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BMI</label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  {formData.height && formData.weight ? 
                    (formData.weight / ((formData.height / 100) * (formData.height / 100))).toFixed(1) : 
                    'N/A'}
                </div>
                <p className="mt-1 text-xs text-gray-500">Body Mass Index (BMI)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex">
                    <input
                      type="number"
                      name="systolic"
                      placeholder="Systolic"
                      value={formData.bloodPressure?.systolic || ''}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        bloodPressure: { 
                          ...prev.bloodPressure, 
                          systolic: e.target.value 
                        } 
                      }))} 
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
                    />
                  </div>
                  <div className="flex">
                    <input
                      type="number"
                      name="diastolic"
                      placeholder="Diastolic"
                      value={formData.bloodPressure?.diastolic || ''}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        bloodPressure: { 
                          ...prev.bloodPressure, 
                          diastolic: e.target.value 
                        } 
                      }))} 
                      disabled={!isEditing}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
                    />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Last recorded: {formData.bloodPressure?.systolic || 120}/{formData.bloodPressure?.diastolic || 80} mmHg</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Preferences Section */}
      {activeSection === 'preferences' && (
        <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theme Preferences */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Theme & Display</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div 
                    className={`cursor-pointer rounded-lg border p-4 flex items-center ${formData.preferences.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => isEditing && setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        theme: 'light'
                      }
                    }))}
                  >
                    <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex-shrink-0 mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">Light</p>
                      <p className="text-xs text-gray-500">Default light theme</p>
                    </div>
                  </div>
                  <div 
                    className={`cursor-pointer rounded-lg border p-4 flex items-center ${formData.preferences.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => isEditing && setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        theme: 'dark'
                      }
                    }))}
                  >
                    <div className="h-10 w-10 rounded-full bg-gray-800 border border-gray-700 flex-shrink-0 mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">Dark</p>
                      <p className="text-xs text-gray-500">Easier on the eyes</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  name="language"
                  value={formData.preferences.language}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      language: e.target.value
                    }
                  }))}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'} ${!isEditing && 'cursor-not-allowed'}`}
                >
                  <option value="english">English</option>
                  <option value="french">French</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Notification Preferences */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Notification Channels</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      checked={formData.preferences.notifications.email}
                      onChange={() => isEditing && setFormData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          notifications: {
                            ...prev.preferences.notifications,
                            email: !prev.preferences.notifications.email
                          }
                        }
                      }))}
                      disabled={!isEditing}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sms-notifications"
                      checked={formData.preferences.notifications.sms}
                      onChange={() => isEditing && setFormData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          notifications: {
                            ...prev.preferences.notifications,
                            sms: !prev.preferences.notifications.sms
                          }
                        }
                      }))}
                      disabled={!isEditing}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">
                      SMS Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="app-notifications"
                      checked={formData.preferences.notifications.app}
                      onChange={() => isEditing && setFormData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          notifications: {
                            ...prev.preferences.notifications,
                            app: !prev.preferences.notifications.app
                          }
                        }
                      }))}
                      disabled={!isEditing}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="app-notifications" className="ml-2 block text-sm text-gray-700">
                      In-App Notifications
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Notification Types</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="appointment-reminders"
                      checked={formData.preferences.notifications.appointmentReminders}
                      onChange={() => isEditing && setFormData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          notifications: {
                            ...prev.preferences.notifications,
                            appointmentReminders: !prev.preferences.notifications.appointmentReminders
                          }
                        }
                      }))}
                      disabled={!isEditing}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="appointment-reminders" className="ml-2 block text-sm text-gray-700">
                      Appointment Reminders
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="medication-reminders"
                      checked={formData.preferences.notifications.medicationReminders}
                      onChange={() => isEditing && setFormData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          notifications: {
                            ...prev.preferences.notifications,
                            medicationReminders: !prev.preferences.notifications.medicationReminders
                          }
                        }
                      }))}
                      disabled={!isEditing}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="medication-reminders" className="ml-2 block text-sm text-gray-700">
                      Medication Reminders
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="health-tips"
                      checked={formData.preferences.notifications.healthTips}
                      onChange={() => isEditing && setFormData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          notifications: {
                            ...prev.preferences.notifications,
                            healthTips: !prev.preferences.notifications.healthTips
                          }
                        }
                      }))}
                      disabled={!isEditing}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="health-tips" className="ml-2 block text-sm text-gray-700">
                      Health Tips & Advice
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="promotions"
                      checked={formData.preferences.notifications.promotions}
                      onChange={() => isEditing && setFormData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          notifications: {
                            ...prev.preferences.notifications,
                            promotions: !prev.preferences.notifications.promotions
                          }
                        }
                      }))}
                      disabled={!isEditing}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="promotions" className="ml-2 block text-sm text-gray-700">
                      Promotions & Special Offers
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={saveChanges}
        title="Save Profile Changes"
        message="Are you sure you want to save these changes to your profile?"
        confirmText="Save Changes"
        type="primary"
      />
    </div>
  );
}