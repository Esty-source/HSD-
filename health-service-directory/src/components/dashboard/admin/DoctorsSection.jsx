import { useState, useEffect } from 'react';
import { 
  UserCircleIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
// import { supabase } from '../../../lib/supabase';

export default function DoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // TODO: Replace with mock data or new backend logic
    setDoctors([]);
    setLoading(false);
    // fetchDoctors();
  }, []);
  
  // async function fetchDoctors() {
  //   ... (all supabase code commented out)
  // }

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
    status: '',
    patients: 0
  });

  const handleNewDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setEditDoctor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddDoctor = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ name: newDoctor.name, role: 'doctor' }])
        .select();
      
      if (error) throw error;
      
      setDoctors(prev => [...prev, { ...newDoctor, id: data[0].id }]);
      setShowNewDoctorModal(false);
      setNewDoctor({ name: '', email: '', specialty: '', status: 'active', patients: 0 });
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert(`Error adding doctor: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditDoctor = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({ name: editDoctor.name })
        .eq('id', editDoctor.id);
      
      if (error) throw error;
      
      setDoctors(prev => prev.map(doc => doc.id === editDoctor.id ? { ...doc, ...editDoctor } : doc));
      setShowEditDoctorModal(false);
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert(`Error updating doctor: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    const doctorToDelete = doctors.find(d => d.id === doctorId);
    const doctorName = doctorToDelete ? doctorToDelete.name : 'this doctor';
    
    if (!window.confirm(`Are you sure you want to remove ${doctorName} from the system? This action will mark the doctor as inactive and may affect related appointments and patient records.`)) {
      return;
    }
    
    setLoading(true);
    console.log(`Removing doctor with ID: ${doctorId}`);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ active: false, role: 'inactive_doctor', updated_at: new Date().toISOString() })
        .eq('id', doctorId);
      
      if (error) throw error;
      
      setDoctors(prev => prev.filter(doctor => doctor.id !== doctorId));
      alert(`${doctorName} has been successfully removed from the system.`);
    } catch (error) {
      console.error('Error removing doctor:', error);
      alert(`Failed to remove doctor: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Doctors</h2>
        <button
          onClick={() => setShowNewDoctorModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Doctor
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctors.map(doctor => (
                <tr key={doctor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserCircleIcon className="h-10 w-10 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                        <div className="text-sm text-gray-500">{doctor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.specialty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.hospital}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${doctor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doctor.patients}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(doctor)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
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
      
      {/* New Doctor Modal */}
      {showNewDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Doctor</h3>
            <input
              type="text"
              name="name"
              value={newDoctor.name}
              onChange={handleNewDoctorInputChange}
              placeholder="Doctor Name"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="email"
              name="email"
              value={newDoctor.email}
              onChange={handleNewDoctorInputChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="specialty"
              value={newDoctor.specialty}
              onChange={handleNewDoctorInputChange}
              placeholder="Specialty"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewDoctorModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDoctor}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Doctor Modal */}
      {showEditDoctorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Doctor</h3>
            <input
              type="text"
              name="name"
              value={editDoctor.name}
              onChange={handleEditDoctorInputChange}
              placeholder="Doctor Name"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="email"
              name="email"
              value={editDoctor.email}
              onChange={handleEditDoctorInputChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="specialty"
              value={editDoctor.specialty}
              onChange={handleEditDoctorInputChange}
              placeholder="Specialty"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditDoctorModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditDoctor}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}