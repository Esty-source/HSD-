import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { 
  ClipboardDocumentListIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function MedicalRecordsSection() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
    fetchRecords();
    fetchPatientsAndDoctors();
  }, []);
  
  async function fetchRecords() {
    try {
      setLoading(true);
      
      // Try to fetch all medical records from Supabase
      try {
        const { data, error } = await supabase
          .from('medical_records')
          .select(`
            id,
            patient_id,
            doctor_id,
            date,
            type,
            status,
            diagnosis,
            treatment,
            notes,
            patients:patient_id(id, name),
            doctors:doctor_id(id, name)
          `);
        
        if (error) {
          console.warn('Error fetching medical records:', error);
          throw error;
        }
        
        // Transform the data to match our component's expected format
        const formattedRecords = data.map(record => ({
          id: record.id,
          patientId: record.patient_id,
          doctorId: record.doctor_id,
          patientName: record.patients?.name || 'Unknown Patient',
          doctorName: record.doctors?.name || 'Unknown Doctor',
          date: record.date || new Date().toISOString().split('T')[0],
          type: record.type || 'Consultation',
          status: record.status || 'pending',
          diagnosis: record.diagnosis || '',
          treatment: record.treatment || '',
          notes: record.notes || ''
        }));
        
        setRecords(formattedRecords);
      } catch (recordsError) {
        console.warn('Medical records table may not exist or has an error:', recordsError);
        // If there's an error, set empty records
        setRecords([]);
      }
    } catch (error) {
      console.error('Error fetching medical records:', error.message);
    } finally {
      setLoading(false);
    }
  }
  
  async function fetchPatientsAndDoctors() {
    // Fetch patients
    try {
      // First try to get patients from the patients table with joined profiles
      try {
        const { data: patientsData, error: patientsError } = await supabase
          .from('patients')
          .select(`
            id,
            profiles(id, name)
          `);
        
        if (patientsError) throw patientsError;
        
        const formattedPatients = patientsData.map(patient => ({
          id: patient.id,
          name: patient.profiles?.name || 'Unknown Patient'
        }));
        
        setPatients(formattedPatients);
      } catch (patientsTableError) {
        console.warn('Patients table may not exist, falling back to profiles:', patientsTableError);
        
        // Fall back to profiles table for patients
        try {
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, name, role')
            .eq('role', 'patient');
            
          if (profilesError) throw profilesError;
          
          const formattedPatients = profilesData.map(profile => ({
            id: profile.id,
            name: profile.name || 'Unknown Patient'
          }));
          
          setPatients(formattedPatients);
        } catch (profilesError) {
          console.error('Error fetching patient profiles:', profilesError);
          setPatients([]);
        }
      }
      
      // Fetch doctors
      try {
        // First try to get doctors from the doctors table with joined profiles
        const { data: doctorsData, error: doctorsError } = await supabase
          .from('doctors')
          .select(`
            id,
            profiles(id, name)
          `);
        
        if (doctorsError) throw doctorsError;
        
        const formattedDoctors = doctorsData.map(doctor => ({
          id: doctor.id,
          name: doctor.profiles?.name || 'Unknown Doctor'
        }));
        
        setDoctors(formattedDoctors);
      } catch (doctorsTableError) {
        console.warn('Doctors table may not exist, falling back to profiles:', doctorsTableError);
        
        // Fall back to profiles table for doctors
        try {
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, name, role')
            .eq('role', 'doctor');
            
          if (profilesError) throw profilesError;
          
          const formattedDoctors = profilesData.map(profile => ({
            id: profile.id,
            name: profile.name || 'Unknown Doctor'
          }));
          
          setDoctors(formattedDoctors);
        } catch (profilesError) {
          console.error('Error fetching doctor profiles:', profilesError);
          setDoctors([]);
        }
      }
    } catch (error) {
      console.error('Error in fetchPatientsAndDoctors:', error.message);
      setPatients([]);
      setDoctors([]);
    }
  }

  const [showNewRecordModal, setShowNewRecordModal] = useState(false);
  const [showEditRecordModal, setShowEditRecordModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    patientId: '',
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Consultation',
    status: 'pending'
  });
  const [editRecord, setEditRecord] = useState({
    id: null,
    patientId: '',
    doctorId: '',
    date: '',
    type: '',
    status: ''
  });

  const handleNewRecordInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!newRecord.patientId || !newRecord.doctorId) {
        alert('Please select both a patient and a doctor.');
        return;
      }
      
      // Check if the medical_records table exists by attempting a simple query
      try {
        // First, try to create the medical_records table if it doesn't exist
        // This is a simplified approach - in a production app, you'd use migrations
        const { error: createTableError } = await supabase.rpc('create_medical_records_if_not_exists');
        
        if (createTableError) {
          console.warn('Error creating medical_records table:', createTableError);
          // Continue anyway and try to insert
        }
      } catch (tableCheckError) {
        console.warn('Error checking/creating medical_records table:', tableCheckError);
        // Continue anyway and try to insert
      }
      
      // Insert the new record into Supabase
      const { data, error } = await supabase
        .from('medical_records')
        .insert([
          {
            patient_id: newRecord.patientId,
            doctor_id: newRecord.doctorId,
            date: newRecord.date,
            type: newRecord.type,
            status: newRecord.status,
            diagnosis: newRecord.diagnosis || '',
            treatment: newRecord.treatment || '',
            notes: newRecord.notes || ''
          }
        ])
        .select();
      
      if (error) {
        console.error('Error adding medical record:', error);
        throw error;
      }
      
      // Show success message
      alert('Medical record has been successfully added.');
      
      // Refresh the records list
      fetchRecords();
      
      // Reset form and close modal
      setShowNewRecordModal(false);
      setNewRecord({
        patientId: '',
        doctorId: '',
        date: new Date().toISOString().split('T')[0],
        type: 'Consultation',
        status: 'pending'
      });
    } catch (error) {
      console.error('Error adding medical record:', error.message);
      alert('Failed to add medical record: ' + error.message);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    if (!confirm('Are you sure you want to delete this medical record? This action cannot be undone.')) {
      return;
    }
    
    try {
      // Delete the record from Supabase
      const { error } = await supabase
        .from('medical_records')
        .delete()
        .eq('id', recordId);
      
      if (error) {
        console.error('Error deleting medical record:', error);
        throw error;
      }
      
      // Show success message
      alert('Medical record has been successfully deleted.');
      
      // Refresh the records list
      fetchRecords();
    } catch (error) {
      console.error('Error deleting medical record:', error.message);
      alert('Failed to delete medical record: ' + error.message);
    }
  };

  const handleEditClick = (record) => {
    setEditRecord({
      id: record.id,
      patientId: record.patientId,
      doctorId: record.doctorId,
      date: record.date,
      type: record.type,
      status: record.status
    });
    setShowEditRecordModal(true);
  };

  const handleEditRecordInputChange = (e) => {
    const { name, value } = e.target;
    setEditRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateRecord = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!editRecord.patientId || !editRecord.doctorId) {
        alert('Please select both a patient and a doctor.');
        return;
      }
      
      // Update the record in Supabase
      const { error } = await supabase
        .from('medical_records')
        .update({
          patient_id: editRecord.patientId,
          doctor_id: editRecord.doctorId,
          date: editRecord.date,
          type: editRecord.type,
          status: editRecord.status,
          diagnosis: editRecord.diagnosis || '',
          treatment: editRecord.treatment || '',
          notes: editRecord.notes || ''
        })
        .eq('id', editRecord.id);
      
      if (error) {
        console.error('Error updating medical record:', error);
        throw error;
      }
      
      // Show success message
      alert('Medical record has been successfully updated.');
      
      // Refresh the records list
      fetchRecords();
      
      // Close modal
      setShowEditRecordModal(false);
    } catch (error) {
      console.error('Error updating medical record:', error.message);
      alert('Failed to update medical record: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
        <button 
          onClick={() => setShowNewRecordModal(true)}
          className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Record
        </button>
      </div>

      {/* New Record Modal */}
      {showNewRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Medical Record</h3>
              <button
                onClick={() => setShowNewRecordModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddRecord} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <select
                  name="patientId"
                  value={newRecord.patientId}
                  onChange={handleNewRecordInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor</label>
                <select
                  name="doctorId"
                  value={newRecord.doctorId}
                  onChange={handleNewRecordInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newRecord.date}
                  onChange={handleNewRecordInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={newRecord.type}
                  onChange={handleNewRecordInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Initial Visit">Initial Visit</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Specialist">Specialist</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={newRecord.status}
                  onChange={handleNewRecordInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewRecordModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Record Modal */}
      {showEditRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Medical Record</h3>
              <button
                onClick={() => setShowEditRecordModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateRecord} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <select
                  name="patientId"
                  value={editRecord.patientId}
                  onChange={handleEditRecordInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor</label>
                <select
                  name="doctorId"
                  value={editRecord.doctorId}
                  onChange={handleEditRecordInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                >
                  <option value="">Select a doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={editRecord.date}
                  onChange={handleEditRecordInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={editRecord.type}
                  onChange={handleEditRecordInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Initial Visit">Initial Visit</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Specialist">Specialist</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={editRecord.status}
                  onChange={handleEditRecordInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditRecordModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Record
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
          <p className="mt-4 text-gray-500">Loading medical records...</p>
        </div>
      ) : records.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <ClipboardDocumentListIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No medical records found</h3>
          <p className="text-gray-500">Add your first medical record to get started.</p>
          <button 
            onClick={() => setShowNewRecordModal(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Medical Record
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.patientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.doctorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEditClick(record)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteRecord(record.id)}
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