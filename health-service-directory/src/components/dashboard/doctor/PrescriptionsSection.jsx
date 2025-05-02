import { useState } from 'react';
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PrinterIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import EditPrescriptionModal from './EditPrescriptionModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function PrescriptionsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-04-15',
      time: '10:30',
      medications: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: '3 times daily', duration: '7 days' },
        { name: 'Ibuprofen', dosage: '400mg', frequency: 'as needed', duration: '5 days' }
      ],
      status: 'Active',
      refills: 2,
      notes: 'Take with food. Complete full course of antibiotics.'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-04-14',
      time: '14:15',
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'once daily', duration: '30 days' },
        { name: 'Metformin', dosage: '500mg', frequency: 'twice daily', duration: '30 days' }
      ],
      status: 'Active',
      refills: 3,
      notes: 'Monitor blood pressure. Take with meals.'
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      date: '2024-04-10',
      time: '09:00',
      medications: [
        { name: 'Atorvastatin', dosage: '20mg', frequency: 'once daily', duration: '30 days' }
      ],
      status: 'Completed',
      refills: 0,
      notes: 'Take at bedtime. Follow up in 3 months.'
    },
    {
      id: 4,
      patientName: 'Emily Davis',
      date: '2024-04-18',
      time: '11:45',
      medications: [
        { name: 'Paracetamol', dosage: '500mg', frequency: 'every 6 hours', duration: '3 days' }
      ],
      status: 'Expired',
      refills: 1,
      notes: 'For fever. Do not exceed 4g per day.'
    },
    {
      id: 5,
      patientName: 'Samuel Lee',
      date: '2024-04-12',
      time: '16:00',
      medications: [
        { name: 'Amlodipine', dosage: '5mg', frequency: 'once daily', duration: '60 days' },
        { name: 'Simvastatin', dosage: '10mg', frequency: 'once daily', duration: '60 days' }
      ],
      status: 'Cancelled',
      refills: 0,
      notes: 'Cancelled due to adverse reaction.'
    },
    {
      id: 6,
      patientName: 'Fatima Bello',
      date: '2024-04-17',
      time: '13:30',
      medications: [
        { name: 'Omeprazole', dosage: '20mg', frequency: 'twice daily', duration: '14 days' }
      ],
      status: 'Active',
      refills: 2,
      notes: 'Take before meals.'
    },
    {
      id: 7,
      patientName: 'Mohamed Traore',
      date: '2024-04-16',
      time: '08:30',
      medications: [
        { name: 'Salbutamol Inhaler', dosage: '2 puffs', frequency: 'as needed', duration: 'as needed' }
      ],
      status: 'Completed',
      refills: 1,
      notes: 'For asthma attacks.'
    },
    {
      id: 8,
      patientName: 'Chinwe Okafor',
      date: '2024-04-13',
      time: '15:10',
      medications: [
        { name: 'Hydrochlorothiazide', dosage: '25mg', frequency: 'once daily', duration: '30 days' }
      ],
      status: 'Active',
      refills: 2,
      notes: 'Monitor for dehydration.'
    },
    {
      id: 9,
      patientName: 'Pierre Nguema',
      date: '2024-04-11',
      time: '10:00',
      medications: [
        { name: 'Metoprolol', dosage: '50mg', frequency: 'twice daily', duration: '30 days' }
      ],
      status: 'Expired',
      refills: 0,
      notes: 'Expired prescription, needs renewal.'
    },
    {
      id: 10,
      patientName: 'Awa Diop',
      date: '2024-04-19',
      time: '12:00',
      medications: [
        { name: 'Azithromycin', dosage: '250mg', frequency: 'once daily', duration: '5 days' }
      ],
      status: 'Active',
      refills: 1,
      notes: 'Take on an empty stomach.'
    },
  ]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    date: '',
    time: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
    status: 'Active',
    refills: 0,
    notes: ''
  });

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'active', name: 'Active' },
    { id: 'completed', name: 'Completed' },
    { id: 'expired', name: 'Expired' },
    { id: 'cancelled', name: 'Cancelled' },
  ];

  // Filtering logic
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medications.some(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter =
      activeFilter === 'all' ||
      prescription.status.toLowerCase() === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setShowDetailsModal(true);
  };

  const handleEditPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setShowEditModal(true);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState(null);

  const handleDeleteClick = (prescription) => {
    setPrescriptionToDelete(prescription);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (prescriptionToDelete) {
      setPrescriptions(prev => prev.filter(p => p.id !== prescriptionToDelete.id));
      setShowDeleteModal(false);
      setPrescriptionToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setPrescriptionToDelete(null);
  };

  const handlePrintPrescription = (prescription) => {
    // Open print dialog with prescription details
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription - ${prescription.patientName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .details { margin-bottom: 20px; }
            .medications { margin-bottom: 20px; }
            .footer { margin-top: 50px; text-align: right; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Prescription</h1>
            <p>Date: ${prescription.date}</p>
          </div>
          <div class="details">
            <h2>Patient Details</h2>
            <p>Name: ${prescription.patientName}</p>
            <p>Age: ${prescription.patientAge || ''}</p>
            <p>Gender: ${prescription.patientGender || ''}</p>
          </div>
          <div class="medications">
            <h2>Medications</h2>
            <ul>
              ${prescription.medications.map(med => `
                <li>
                  ${med.name} - ${med.dosage}
                  <br>
                  Instructions: ${med.instructions || ''}
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="footer">
            <p>Doctor: ${prescription.doctorName || ''}</p>
            <p>License: ${prescription.doctorLicense || ''}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    // Wait for the window to load before printing
    printWindow.onload = function() {
      printWindow.focus();
      printWindow.print();
    };
    // Fallback in case onload doesn't fire
    setTimeout(() => {
      try {
        printWindow.focus();
        printWindow.print();
      } catch (e) {}
    }, 500);
  };

  const handleSavePrescription = (prescriptionData) => {
    if (selectedPrescription) {
      // Update existing prescription
      const updatedPrescriptions = prescriptions.map(prescription => 
        prescription.id === selectedPrescription.id 
          ? { ...prescription, ...prescriptionData }
          : prescription
      );
      setPrescriptions(updatedPrescriptions);
      setShowEditModal(false);
    } else {
      // Add new prescription
      const newPrescription = {
        id: Date.now(),
        ...prescriptionData
      };
      setPrescriptions([...prescriptions, newPrescription]);
      setShowNewModal(false);
    }
  };

  const handleAddMedication = () => {
    setNewPrescription(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', frequency: '', duration: '' }]
    }));
  };

  const handleRemoveMedication = (index) => {
    setNewPrescription(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const handleNewPrescriptionInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith('medication_')) {
      const field = name.split('_')[1];
      setNewPrescription(prev => ({
        ...prev,
        medications: prev.medications.map((med, i) => 
          i === index ? { ...med, [field]: value } : med
        )
      }));
    } else {
      setNewPrescription(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNewPrescriptionSubmit = (e) => {
    e.preventDefault();
    const prescriptionData = {
      ...newPrescription,
      id: Date.now(),
      medications: newPrescription.medications.filter(med => 
        med.name && med.dosage && med.frequency && med.duration
      )
    };
    setPrescriptions(prev => [...prev, prescriptionData]);
    setShowNewModal(false);
    setNewPrescription({
      patientName: '',
      date: '',
      time: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
      status: 'Active',
      refills: 0,
      notes: ''
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Prescriptions</h2>
        <button 
          onClick={() => setShowNewModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Prescription
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="mt-6 space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200 mb-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{prescription.patientName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Date: {prescription.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Medications: {prescription.medications.length}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  prescription.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {prescription.status}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewDetails(prescription)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEditPrescription(prescription)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePrintPrescription(prescription)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <PrinterIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(prescription)}
                    className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors duration-200 text-sm font-medium"
                  >
                    <TrashIcon className="h-5 w-5 mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Details Modal */}
      {showDetailsModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 relative z-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Prescription Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Patient Information</h4>
                <p className="text-gray-600">Name: {selectedPrescription.patientName}</p>
                <p className="text-gray-600">Age: {selectedPrescription.patientAge}</p>
                <p className="text-gray-600">Gender: {selectedPrescription.patientGender}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Prescription Details</h4>
                <p className="text-gray-600">Date: {selectedPrescription.date}</p>
                <p className="text-gray-600">Status: {selectedPrescription.status}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Medications</h4>
                <ul className="space-y-2">
                  {selectedPrescription.medications.map((medication, index) => (
                    <li key={index} className="text-gray-600">
                      {medication.name} - {medication.dosage}
                      <br />
                      Instructions: {medication.instructions}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Prescription Modal */}
      {showEditModal && selectedPrescription && (
        <EditPrescriptionModal
          prescription={selectedPrescription}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedPrescription) => {
            setPrescriptions((prev) => prev.map((p) => p.id === updatedPrescription.id ? updatedPrescription : p));
            setShowEditModal(false);
          }}
        />
      )}


      {/* New Prescription Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 relative z-50 max-h-screen overflow-y-auto flex flex-col">
            <button
              onClick={() => setShowNewModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              style={{ zIndex: 10 }}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">New Prescription</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleNewPrescriptionSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={newPrescription.patientName}
                  onChange={handleNewPrescriptionInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newPrescription.date}
                    onChange={handleNewPrescriptionInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={newPrescription.time}
                    onChange={handleNewPrescriptionInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Medications</label>
                {newPrescription.medications.map((medication, index) => (
                  <div key={index} className="mt-2 space-y-2 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-700">Medication {index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMedication(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500">Name</label>
                        <input
                          type="text"
                          name={`medication_name`}
                          value={medication.name}
                          onChange={(e) => handleNewPrescriptionInputChange(e, index)}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Dosage</label>
                        <input
                          type="text"
                          name={`medication_dosage`}
                          value={medication.dosage}
                          onChange={(e) => handleNewPrescriptionInputChange(e, index)}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500">Frequency</label>
                        <input
                          type="text"
                          name={`medication_frequency`}
                          value={medication.frequency}
                          onChange={(e) => handleNewPrescriptionInputChange(e, index)}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">Duration</label>
                        <input
                          type="text"
                          name={`medication_duration`}
                          value={medication.duration}
                          onChange={(e) => handleNewPrescriptionInputChange(e, index)}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddMedication}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add Another Medication
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Refills</label>
                <input
                  type="number"
                  name="refills"
                  value={newPrescription.refills}
                  onChange={handleNewPrescriptionInputChange}
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={newPrescription.notes}
                  onChange={handleNewPrescriptionInputChange}
                  rows="3"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <DeleteConfirmationModal
        open={showDeleteModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        prescription={prescriptionToDelete}
      />
    </div>
  );
}