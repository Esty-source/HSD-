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

export default function PrescriptionsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
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
    { id: 'active', name: 'Active' },
    { id: 'completed', name: 'Completed' },
    { id: 'expired', name: 'Expired' },
    { id: 'cancelled', name: 'Cancelled' },
  ];

  // Mock prescription data
  const prescriptions = [
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-04-15',
      time: '10:30 AM',
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
      time: '02:15 PM',
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
      time: '09:00 AM',
      medications: [
        { name: 'Atorvastatin', dosage: '20mg', frequency: 'once daily', duration: '30 days' }
      ],
      status: 'Completed',
      refills: 0,
      notes: 'Take at bedtime. Follow up in 3 months.'
    },
  ];

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setShowDetailsModal(true);
  };

  const handleEditPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setShowEditModal(true);
  };

  const handleDeletePrescription = (prescriptionId) => {
    // Remove the prescription from the list
    const updatedPrescriptions = prescriptions.filter(prescription => prescription.id !== prescriptionId);
    setPrescriptions(updatedPrescriptions);
  };

  const handlePrintPrescription = (prescription) => {
    // Open print dialog with prescription details
    const printWindow = window.open('', '_blank');
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
            <p>Age: ${prescription.patientAge}</p>
            <p>Gender: ${prescription.patientGender}</p>
          </div>
          <div class="medications">
            <h2>Medications</h2>
            <ul>
              ${prescription.medications.map(med => `
                <li>
                  ${med.name} - ${med.dosage}
                  <br>
                  Instructions: ${med.instructions}
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="footer">
            <p>Doctor: ${prescription.doctorName}</p>
            <p>License: ${prescription.doctorLicense}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
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
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
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
                    onClick={() => handlePrintPrescription(prescription)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  >
                    <PrinterIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeletePrescription(prescription.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Details Modal */}
      {showDetailsModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Prescription</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                <input
                  type="text"
                  defaultValue={selectedPrescription.patientName}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  defaultValue={selectedPrescription.date}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Medications</label>
                <div className="space-y-2">
                  {selectedPrescription.medications.map((medication, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        defaultValue={medication.name}
                        placeholder="Medication name"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        defaultValue={medication.dosage}
                        placeholder="Dosage"
                        className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        defaultValue={medication.instructions}
                        placeholder="Instructions"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePrescription(newPrescriptionData)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Prescription Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
              <div className="flex justify-end space-x-3 mt-6">
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
    </div>
  );
} 