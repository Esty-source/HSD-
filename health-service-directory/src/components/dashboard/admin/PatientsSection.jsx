import { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
// import { supabase } from '../../../lib/supabase';

// Helper function to calculate age from date of birth
function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return 0;
  
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age;
}

export default function PatientsSection() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // TODO: Replace with mock data or new backend logic
    setPatients([]);
    setLoading(false);
    // fetchPatients();
  }, []);
  
  // async function fetchPatients() {
  //   ... (all supabase code commented out)
  // }

  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [showEditPatientModal, setShowEditPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'Male',
    lastVisit: new Date().toISOString().split('T')[0],
    status: 'active'
  });
  const [editPatient, setEditPatient] = useState({
    id: null,
    name: '',
    email: '',
    age: '',
    gender: 'Male',
    lastVisit: '',
    status: 'active'
  });

  const handleNewPatientInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Adding new patient:', newPatient);
      
      // Generate a random password for the new patient
      const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).toUpperCase().slice(-4) + '!1';
      
      // Calculate date of birth from age if provided
      let dateOfBirth = null;
      if (newPatient.age && !isNaN(parseInt(newPatient.age))) {
        const today = new Date();
        const birthYear = today.getFullYear() - parseInt(newPatient.age);
        dateOfBirth = new Date(birthYear, today.getMonth(), today.getDate()).toISOString().split('T')[0];
        console.log(`Calculated date of birth from age ${newPatient.age}: ${dateOfBirth}`);
      }
      
      // First, check if email is already in use
      const { data: existingUsers, error: checkError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', newPatient.email);
      
      if (checkError) {
        console.error('Error checking for existing user:', checkError);
      } else if (existingUsers && existingUsers.length > 0) {
        alert('A user with this email already exists');
        setLoading(false);
        return;
      }
      
      // Sign up the user with Supabase Auth
      console.log('Creating user account...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newPatient.email,
        password: tempPassword,
        options: {
          data: {
            name: newPatient.name,
            role: 'patient'
          }
        }
      });
      
      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }
      
      if (!authData || !authData.user) {
        throw new Error('Failed to create user account');
      }
      
      console.log('User created successfully, creating profile...');
      const userId = authData.user.id;
      
      // Create profile entry
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            name: newPatient.name,
            role: 'patient',
            ...(dateOfBirth && { date_of_birth: dateOfBirth }),
            gender: newPatient.gender || 'Male'
          }
        ]);
      
      if (profileError) {
        console.error('Error creating profile:', profileError);
        throw profileError;
      }
      
      console.log('Profile created, adding patient medical data...');
      // Create patient record with additional medical info
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .insert([
          {
            id: userId,
            gender: newPatient.gender || 'Unknown',
            date_of_birth: newPatient.date_of_birth || null,
            medical_history: newPatient.medical_history || '',
            allergies: newPatient.allergies || '',
            blood_type: newPatient.blood_type || 'Unknown'
          }
        ]);
      
      if (patientError) {
        console.error('Error creating patient record:', patientError);
        // We'll continue since we have the auth and profile records
        // but we should inform the user
        alert('Patient account created but medical data could not be saved. You can update this later.');
      }
      
      console.log('Patient added successfully');
      // Add to local state to avoid refetching
      setPatients(prev => [
        ...prev,
        {
          id: userId,
          name: newPatient.name,
          email: newPatient.email,
          age: newPatient.date_of_birth ? calculateAge(newPatient.date_of_birth) : 0,
          gender: newPatient.gender || 'Unknown',
          lastVisit: 'No visits',
          status: 'active',
          medical_history: newPatient.medical_history || '',
          allergies: newPatient.allergies || '',
          blood_type: newPatient.blood_type || 'Unknown',
          date_of_birth: newPatient.date_of_birth || null
        }
      ]);
      
      // Reset form and close modal
      setNewPatient({
        name: '',
        email: '',
        age: '',
        gender: 'Male',
        date_of_birth: '',
        phone: '',
        address: '',
        medical_history: '',
        allergies: '',
        blood_type: '',
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'active'
      });
      
      setShowNewPatientModal(false);
      
      // Show success message with password
      alert(`Patient added successfully. Temporary password: ${tempPassword}\n\nPlease share this with the patient securely.`);
    } catch (error) {
      console.error('Error adding patient:', error);
      alert(`Error adding patient: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async (patientId) => {
    // Find the patient's name for the confirmation message
    const patientToDelete = patients.find(p => p.id === patientId);
    const patientName = patientToDelete ? patientToDelete.name : 'this patient';
    
    if (!window.confirm(`Are you sure you want to delete ${patientName}? This action cannot be undone and will remove all patient data.`)) {
      return;
    }
    
    setLoading(true);
    console.log(`Deleting patient with ID: ${patientId}`);
    
    try {
      // First, check if there are any appointments for this patient
      const { data: appointmentData, error: appointmentCheckError } = await supabase
        .from('appointments')
        .select('id')
        .eq('patient_id', patientId);
      
      if (appointmentCheckError) {
        console.warn('Error checking appointments:', appointmentCheckError);
      } else if (appointmentData && appointmentData.length > 0) {
        console.log(`Deleting ${appointmentData.length} appointments for patient`);
        // Delete related appointments
        const { error: appointmentDeleteError } = await supabase
          .from('appointments')
          .delete()
          .eq('patient_id', patientId);
        
        if (appointmentDeleteError) {
          console.error('Error deleting appointments:', appointmentDeleteError);
        }
      }
      
      // Delete from patients table
      console.log('Deleting from patients table...');
      const { error: patientError } = await supabase
        .from('patients')
        .delete()
        .eq('id', patientId);
      
      if (patientError) {
        console.warn('Error deleting from patients table:', patientError);
        // Continue with profile deletion
      }
      
      // Delete from profiles table
      console.log('Deleting from profiles table...');
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', patientId);
      
      if (profileError) {
        console.error('Error deleting profile:', profileError);
        throw profileError;
      }
      
      // Try to delete the user from auth
      console.log('Attempting to delete user from auth...');
      try {
        // Note: This may require admin privileges and might not work in all environments
        const { error: authError } = await supabase.auth.admin.deleteUser(patientId);
        
        if (authError) {
          console.warn('Could not delete user from auth (may require admin privileges):', authError);
        } else {
          console.log('User successfully deleted from auth');
        }
      } catch (authError) {
        console.warn('Error deleting user from auth:', authError);
        // Continue anyway since we've deleted the profile
      }
      
      // Update local state
      setPatients(prev => prev.filter(patient => patient.id !== patientId));
      
      console.log('Patient deletion completed successfully');
      // Show success message
      alert(`Patient ${patientName} has been deleted successfully`);
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert(`Error deleting patient: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (patient) => {
    setEditPatient({
      id: patient.id,
      name: patient.name,
      email: patient.email,
      age: patient.age,
      gender: patient.gender,
      lastVisit: patient.lastVisit,
      status: patient.status
    });
    setShowEditPatientModal(true);
  };

  const handleEditPatientInputChange = (e) => {
    const { name, value } = e.target;
    setEditPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    
    // Enhanced validation
    if (!editPatient.name.trim()) {
      alert('Please enter a valid name');
      return;
    }
    
    if (!editPatient.email.trim() || !editPatient.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    console.log('Updating patient:', editPatient);
    
    try {
      // Handle date of birth calculation
      let dateOfBirth = null;
      if (editPatient.date_of_birth) {
        // If we have a direct date of birth, use it
        dateOfBirth = editPatient.date_of_birth;
      } else if (editPatient.age && !isNaN(parseInt(editPatient.age))) {
        // Calculate date of birth from age if provided
        const today = new Date();
        const birthYear = today.getFullYear() - parseInt(editPatient.age);
        dateOfBirth = new Date(birthYear, today.getMonth(), today.getDate()).toISOString().split('T')[0];
        console.log(`Calculated date of birth from age ${editPatient.age}: ${dateOfBirth}`);
      }
      
      // First, check if email has changed and if it's already in use
      const originalPatient = patients.find(p => p.id === editPatient.id);
      if (originalPatient && originalPatient.email !== editPatient.email) {
        console.log('Email has changed, checking if new email is available...');
        const { data: existingUsers, error: checkError } = await supabase
          .from('profiles')
          .select('email')
          .eq('email', editPatient.email)
          .neq('id', editPatient.id);
        
        if (checkError) {
          console.error('Error checking for existing user:', checkError);
        } else if (existingUsers && existingUsers.length > 0) {
          alert('A user with this email already exists');
          setLoading(false);
          return;
        }
      }
      
      console.log('Updating profile record...');
      // Update the profile record (this should always exist)
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({ 
          name: editPatient.name,
          email: editPatient.email,
          phone: editPatient.phone || '',
          address: editPatient.address || '',
          // Only update these if we have them in the profiles table
          ...(dateOfBirth && { date_of_birth: dateOfBirth }),
          ...(editPatient.gender && { gender: editPatient.gender })
        })
        .eq('id', editPatient.id)
        .select();
      
      if (profileError) {
        console.error('Error updating profile:', profileError);
        throw profileError;
      }
      
      console.log('Profile updated successfully');
      
      // Try to update the patient record in the patients table
      console.log('Updating patient medical data...');
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .update({ 
          medical_history: editPatient.medical_history || '',
          allergies: editPatient.allergies || '',
          blood_type: editPatient.blood_type || '',
          // Always update these in the patients table
          date_of_birth: dateOfBirth,
          gender: editPatient.gender || 'Unknown'
        })
        .eq('id', editPatient.id)
        .select();
      
      // Handle case where patient record doesn't exist
      if (patientError) {
        console.warn('Patient record update error:', patientError);
        console.log('Attempting to create patient record instead...');
        
        // Try to create the patient record
        const { data: newPatientData, error: insertError } = await supabase
          .from('patients')
          .insert([{ 
            id: editPatient.id,
            medical_history: editPatient.medical_history || '',
            allergies: editPatient.allergies || '',
            blood_type: editPatient.blood_type || '',
            date_of_birth: dateOfBirth,
            gender: editPatient.gender || 'Unknown'
          }])
          .select();
          
        if (insertError) {
          console.warn('Patient record creation error:', insertError);
          // We'll continue since we've updated the profile
          // but we should inform the user
          alert('Profile information updated, but medical data could not be saved. You can try again later.');
        } else {
          console.log('Patient record created successfully');
        }
      } else {
        console.log('Patient record updated successfully');
      }
      
      // Update the local state to reflect changes
      setPatients(prevPatients => {
        return prevPatients.map(patient => {
          if (patient.id === editPatient.id) {
            return {
              ...patient,
              name: editPatient.name,
              email: editPatient.email,
              age: dateOfBirth ? calculateAge(dateOfBirth) : patient.age,
              gender: editPatient.gender || patient.gender,
              medical_history: editPatient.medical_history || patient.medical_history,
              allergies: editPatient.allergies || patient.allergies,
              blood_type: editPatient.blood_type || patient.blood_type,
              date_of_birth: dateOfBirth || patient.date_of_birth
            };
          }
          return patient;
        });
      });
      
      // Show success message
      alert('Patient information has been successfully updated.');
      
      // Close the modal
      setShowEditPatientModal(false);
    } catch (error) {
      console.error('Error updating patient:', error);
      alert(`Failed to update patient: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Patients Management</h2>
        <button 
          onClick={() => setShowNewPatientModal(true)}
          className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Patient
        </button>
      </div>

      {/* New Patient Modal */}
      {showNewPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Patient</h3>
              <button
                onClick={() => setShowNewPatientModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newPatient.name}
                  onChange={handleNewPatientInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newPatient.email}
                  onChange={handleNewPatientInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={newPatient.age}
                    onChange={handleNewPatientInputChange}
                    required
                    min="0"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={newPatient.gender}
                    onChange={handleNewPatientInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Visit</label>
                <input
                  type="date"
                  name="lastVisit"
                  value={newPatient.lastVisit}
                  onChange={handleNewPatientInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newPatient.status}
                  onChange={handleNewPatientInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewPatientModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {showEditPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Patient</h3>
              <button
                onClick={() => setShowEditPatientModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleUpdatePatient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editPatient.name}
                  onChange={handleEditPatientInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editPatient.email}
                  onChange={handleEditPatientInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={editPatient.age}
                    onChange={handleEditPatientInputChange}
                    required
                    min="0"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={editPatient.gender}
                    onChange={handleEditPatientInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Visit</label>
                <input
                  type="date"
                  name="lastVisit"
                  value={editPatient.lastVisit}
                  onChange={handleEditPatientInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={editPatient.status}
                  onChange={handleEditPatientInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditPatientModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
            <div className="h-4 bg-blue-100 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-blue-50 rounded w-1/4"></div>
          </div>
          <p className="mt-4 text-gray-500">Loading patients...</p>
        </div>
      ) : patients.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <UserGroupIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No patients found</h3>
          <p className="text-gray-500">Add your first patient to get started.</p>
          <button 
            onClick={() => setShowNewPatientModal(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Patient
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <UserGroupIcon className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.age || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.gender || 'Unknown'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.lastVisit || 'Never'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      patient.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {patient.status || 'active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEditClick(patient)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeletePatient(patient.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 