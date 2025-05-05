import { useState, useEffect } from 'react';
import { 
  UserCircleIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../../../lib/supabase';

export default function DoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchDoctors();
  }, []);
  
  async function fetchDoctors() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          id,
          profiles (id, name, email),
          specialty,
          license_number,
          education,
          years_experience
        `);
      
      if (error) throw error;
      
      // Transform the data to match our component's expected format
      const formattedDoctors = data.map(doctor => ({
        id: doctor.id,
        name: doctor.profiles.name,
        email: doctor.profiles.email,
        specialty: doctor.specialty || 'General',
        status: 'active', // You might want to add a status field to your database
        patients: 0 // This would need to be calculated from appointments or another table
      }));
      
      setDoctors(formattedDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error.message);
    } finally {
      setLoading(false);
    }
  }

  const [showNewDoctorModal, setShowNewDoctorModal] = useState(false);
  const [showEditDoctorModal, setShowEditDoctorModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    specialty: '',
    status: 'active',
    patients: 0
  });
  const [editDoctor, setEditDoctor] = useState({
    id: null,
    name: '',
    email: '',
    specialty: '',
    status: 'active',
    patients: 0
  });

  const handleNewDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      // First, create a user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newDoctor.email,
        password: 'tempPassword123', // You'd want to generate this or have the user set it
        email_confirm: true,
        user_metadata: {
          name: newDoctor.name,
          role: 'doctor'
        }
      });
      
      if (authError) throw authError;
      
      // Create a profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ 
          id: authData.user.id,
          name: newDoctor.name,
          role: 'doctor',
          email: newDoctor.email
        }]);
      
      if (profileError) throw profileError;
      
      // Create a doctor record
      const { error: doctorError } = await supabase
        .from('doctors')
        .insert([{ 
          id: authData.user.id,
          specialty: newDoctor.specialty,
          license_number: '',
          education: '',
          years_experience: 0
        }]);
      
      if (doctorError) throw doctorError;
      
      // Refresh the doctors list
      fetchDoctors();
      
      // Reset form and close modal
      setShowNewDoctorModal(false);
      setNewDoctor({
        name: '',
        email: '',
        specialty: '',
        status: 'active',
        patients: 0
      });
    } catch (error) {
      console.error('Error adding doctor:', error.message);
      alert('Failed to add doctor: ' + error.message);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      // Delete the doctor record
      const { error: doctorError } = await supabase
        .from('doctors')
        .delete()
        .eq('id', doctorId);
      
      if (doctorError) throw doctorError;
      
      // Note: In a real application, you might want to handle deleting the profile and auth user as well,
      // but that requires admin privileges and careful consideration of data integrity
      
      // Refresh the doctors list
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error.message);
      alert('Failed to delete doctor: ' + error.message);
    }
  };

  const handleEditClick = (doctor) => {
    setEditDoctor({
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      status: doctor.status,
      patients: doctor.patients
    });
    setShowEditDoctorModal(true);
  };

  const handleEditDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setEditDoctor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    try {
      // Update the doctor record
      const { error: doctorError } = await supabase
        .from('doctors')
        .update({ 
          specialty: editDoctor.specialty
          // Add other doctor-specific fields here
        })
        .eq('id', editDoctor.id);
      
      if (doctorError) throw doctorError;
      
      // Update the profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          name: editDoctor.name
          // Add other profile fields here
        })
        .eq('id', editDoctor.id);
      
      if (profileError) throw profileError;
      
      // Refresh the doctors list
      fetchDoctors();
      setShowEditDoctorModal(false);
    } catch (error) {
      console.error('Error updating doctor:', error.message);
      alert('Failed to update doctor: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Doctors Management</h2>
        <button 
          onClick={() => setShowNewDoctorModal(true)}
          className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Doctor
        </button>
      </div>

      {/* New Doctor Modal */}
      {showNewDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Doctor</h3>
              <button
                onClick={() => setShowNewDoctorModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newDoctor.name}
                  onChange={handleNewDoctorInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newDoctor.email}
                  onChange={handleNewDoctorInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialty</label>
                <select
                  name="specialty"
                  value={newDoctor.specialty}
                  onChange={handleNewDoctorInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Psychiatry">Psychiatry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newDoctor.status}
                  onChange={handleNewDoctorInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewDoctorModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Doctor Modal */}
      {showEditDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Doctor</h3>
              <button
                onClick={() => setShowEditDoctorModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateDoctor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editDoctor.name}
                  onChange={handleEditDoctorInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editDoctor.email}
                  onChange={handleEditDoctorInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialty</label>
                <select
                  name="specialty"
                  value={editDoctor.specialty}
                  onChange={handleEditDoctorInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Psychiatry">Psychiatry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={editDoctor.status}
                  onChange={handleEditDoctorInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Patients</label>
                <input
                  type="number"
                  name="patients"
                  value={editDoctor.patients}
                  onChange={handleEditDoctorInputChange}
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditDoctorModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Doctor
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
          <p className="mt-4 text-gray-500">Loading doctors...</p>
        </div>
      ) : doctors.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <UserCircleIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No doctors found</h3>
          <p className="text-gray-500">Add your first doctor to get started.</p>
          <button 
            onClick={() => setShowNewDoctorModal(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Doctor
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <UserCircleIcon className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                        <div className="text-sm text-gray-500">{doctor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doctor.specialty || 'Not specified'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doctor.patients || 0}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      doctor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {doctor.status || 'active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEditClick(doctor)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteDoctor(doctor.id)}
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