import React, { useState, useRef } from 'react';
import {
  FolderIcon,
  DocumentTextIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const mockRecords = {
  medicalHistory: [
    {
      id: 1,
      title: 'Annual Physical Examination',
      date: '2023-12-15',
      doctor: 'Dr. Ngono Marie',
      type: 'Examination',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'COVID-19 Vaccination',
      date: '2023-11-20',
      doctor: 'Dr. Fon Peter',
      type: 'Immunization',
      status: 'Completed',
    },
  ],
  labResults: [
    {
      id: 1,
      title: 'Blood Work Analysis',
      date: '2023-12-15',
      type: 'Blood Test',
      status: 'Normal',
    },
    {
      id: 2,
      title: 'Malaria Test',
      date: '2023-12-10',
      type: 'Blood Test',
      status: 'Review Required',
    },
  ],
  medications: [
    {
      id: 1,
      name: 'Coartem',
      dosage: '80/480mg',
      frequency: 'Twice daily',
      startDate: '2023-12-10',
      endDate: '2023-12-16',
      refills: 1,
      pharmacy: 'Pharmacie de la Cité, Douala',
    },
    {
      id: 2,
      name: 'Paracetamol',
      dosage: '500mg',
      frequency: 'Every 6 hours as needed',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      refills: 2,
      pharmacy: 'Pharmacie de la Paix, Yaoundé',
    },
    {
      id: 3,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      startDate: '2023-12-01',
      endDate: '2024-02-28',
      refills: 3,
      pharmacy: 'Pharmacie Santa Barbara, Bamenda',
    },
  ],
};

const tabs = [
  { name: 'Medical History', icon: FolderIcon },
  { name: 'Lab Results', icon: ChartBarIcon },
  { name: 'Medications', icon: DocumentTextIcon },
];

export default function HealthRecords() {
  const [activeTab, setActiveTab] = useState('Medical History');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [newRecord, setNewRecord] = useState({
    title: '',
    date: '',
    doctor: '',
    type: '',
    status: 'Pending',
  });
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showMedicalHistoryModal, setShowMedicalHistoryModal] = useState(false);
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to your server
      // For now, we'll just show an alert
      alert(`File "${file.name}" selected. In a real app, this would be uploaded to a server.`);
    }
  };

  const handleAddRecord = () => {
    if (!newRecord.title || !newRecord.date) {
      alert('Please fill in all required fields');
      return;
    }

    // Add the new record to the appropriate section
    const recordWithId = {
      ...newRecord,
      id: Math.random().toString(36).substr(2, 9),
    };

    switch (activeTab) {
      case 'Medical History':
        mockRecords.medicalHistory.unshift(recordWithId);
        break;
      case 'Lab Results':
        mockRecords.labResults.unshift(recordWithId);
        break;
      case 'Medications':
        mockRecords.medications.unshift(recordWithId);
        break;
      default:
        break;
    }

    setShowAddModal(false);
    setNewRecord({
      title: '',
      date: '',
      doctor: '',
      type: '',
      status: 'Pending',
    });
  };

  const handleRefill = (medication) => {
    setSelectedMedication(medication);
    setShowRefillModal(true);
  };

  const submitRefillRequest = () => {
    // In a real app, this would send a request to the backend
    alert(`Refill request sent to ${selectedMedication.pharmacy} for ${selectedMedication.name}`);
    setShowRefillModal(false);
    setSelectedMedication(null);
  };

  const handleViewResults = (result) => {
    setSelectedResult(result);
    setShowResultModal(true);
  };

  const handleDownloadPDF = (result) => {
    // In a real app, this would trigger a download of the lab result PDF
    alert(`Downloading PDF for ${result.title}...`);
    
    // Simulate download delay
    setTimeout(() => {
      alert(`${result.title} PDF has been downloaded successfully.`);
    }, 1500);
  };

  const handleViewMedicalHistory = (record) => {
    setSelectedMedicalRecord(record);
    setShowMedicalHistoryModal(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Medical History':
        return (
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockRecords.medicalHistory.map((record) => (
                <div key={record.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-5 sm:p-3 md:p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{record.title}</h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          record.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : record.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {record.status}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {record.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {record.doctor}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {record.type}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <button 
                      onClick={() => handleViewMedicalHistory(record)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Lab Results':
        return (
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockRecords.labResults.map((result) => (
                <div key={result.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-5 sm:p-3 md:p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          result.status === 'Normal'
                            ? 'bg-green-100 text-green-800'
                            : result.status === 'Review Required'
                            ? 'bg-yellow-100 text-yellow-800'
                            : result.status === 'Abnormal'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {result.status}
                      </span>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {result.date}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        {result.type}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-5 py-3 flex justify-between">
                    <button 
                      onClick={() => handleViewResults(result)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Results
                    </button>
                    <button 
                      onClick={() => handleDownloadPDF(result)}
                      className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Medications':
        return (
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockRecords.medications.map((medication) => (
                <div key={medication.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-5 sm:p-3 md:p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{medication.name}</h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          medication.refills > 2
                            ? 'bg-green-100 text-green-800'
                            : medication.refills > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {medication.refills} refills left
                      </span>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        {medication.dosage}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {medication.frequency}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {medication.startDate} to {medication.endDate}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {medication.pharmacy}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-5 py-3">
                    {medication.refills > 0 ? (
                      <button 
                        onClick={() => handleRefill(medication)}
                        className="w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Request Refill
                      </button>
                    ) : (
                      <p className="text-center text-sm text-gray-500">No refills remaining</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-none">
      <div className="w-full bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Health Records</h1>
          <p className="mt-2 text-sm text-gray-700">
            Access and manage your medical history securely
          </p>
        </div>
      </div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                  onClick={() => setShowAddModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">Add New Record</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={newRecord.title}
                        onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        value={newRecord.date}
                        onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                        Doctor
                      </label>
                      <input
                        type="text"
                        id="doctor"
                        value={newRecord.doctor}
                        onChange={(e) => setNewRecord({ ...newRecord, doctor: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Type
                      </label>
                      <input
                        type="text"
                        id="type"
                        value={newRecord.type}
                        onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddRecord}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Add Record
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Medical History Modal */}
      {showMedicalHistoryModal && selectedMedicalRecord && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                  onClick={() => setShowMedicalHistoryModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">{selectedMedicalRecord.title}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        selectedMedicalRecord.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : selectedMedicalRecord.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {selectedMedicalRecord.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Date:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedMedicalRecord.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Doctor:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedMedicalRecord.doctor}</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Type:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedMedicalRecord.type}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Diagnosis & Treatment</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {selectedMedicalRecord.type === 'Consultation' 
                          ? 'Initial consultation and evaluation of symptoms. Recommended follow-up tests and provided preliminary diagnosis.'
                          : selectedMedicalRecord.type === 'Surgery'
                          ? 'Surgical procedure performed to address the diagnosed condition. Recovery progressing as expected.'
                          : selectedMedicalRecord.type === 'Follow-up'
                          ? 'Follow-up appointment to monitor progress and adjust treatment plan as necessary.'
                          : 'Routine check-up and preventive care visit.'}
                      </p>
                      
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Diagnosis:</h5>
                      <p className="text-sm text-gray-600 mb-4">
                        {selectedMedicalRecord.title.includes('Annual') 
                          ? 'No significant health issues detected. All vital signs within normal ranges.'
                          : selectedMedicalRecord.title.includes('Cardiology') 
                          ? 'Mild hypertension (140/90 mmHg). No evidence of structural heart disease.'
                          : selectedMedicalRecord.title.includes('Orthopedic')
                          ? 'Grade II ankle sprain with partial ligament tear. No fracture detected on X-ray.'
                          : 'Diagnosis information not available for this record type.'}
                      </p>
                      
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Treatment Plan:</h5>
                      <p className="text-sm text-gray-600">
                        {selectedMedicalRecord.title.includes('Annual') 
                          ? 'Continue current health maintenance. Recommended lifestyle modifications include increased physical activity and reduced sodium intake.'
                          : selectedMedicalRecord.title.includes('Cardiology') 
                          ? 'Prescribed lisinopril 10mg daily. Recommended DASH diet and 30 minutes of moderate exercise 5 days per week.'
                          : selectedMedicalRecord.title.includes('Orthopedic')
                          ? 'RICE protocol (Rest, Ice, Compression, Elevation). Prescribed physical therapy 2x weekly for 6 weeks. Follow-up in 3 weeks.'
                          : 'Treatment information not available for this record type.'}
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-md font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-600">
                        {selectedMedicalRecord.status === 'Completed' 
                          ? 'This medical event has been completed. All documentation has been finalized.'
                          : selectedMedicalRecord.status === 'Pending'
                          ? 'This medical event is pending. Additional information or follow-up may be required.'
                          : 'Additional notes not available for this record.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowMedicalHistoryModal(false)}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Lab Results Modal */}
      {showResultModal && selectedResult && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                  onClick={() => setShowResultModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">{selectedResult.title}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        selectedResult.status === 'Normal'
                          ? 'bg-green-100 text-green-800'
                          : selectedResult.status === 'Review Required'
                          ? 'bg-yellow-100 text-yellow-800'
                          : selectedResult.status === 'Abnormal'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {selectedResult.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Date:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedResult.date}</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Type:</span>
                        <span className="ml-2 text-sm text-gray-600">{selectedResult.type}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-md font-medium text-gray-900 mb-3">Test Results</h4>
                      
                      {/* Mock test results based on the type */}
                      {selectedResult.type === 'Blood Test' && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Hemoglobin</span>
                            <span className="text-sm font-medium text-gray-900">14.2 g/dL</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">White Blood Cells</span>
                            <span className="text-sm font-medium text-gray-900">7.5 x10^9/L</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Platelets</span>
                            <span className="text-sm font-medium text-gray-900">250 x10^9/L</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Glucose</span>
                            <span className="text-sm font-medium text-gray-900">95 mg/dL</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-md font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-600">
                        {selectedResult.status === 'Normal' 
                          ? 'All test results are within normal ranges. No further action required.'
                          : selectedResult.status === 'Review Required'
                          ? 'Some values require further review. Please consult with your healthcare provider.'
                          : 'Abnormal results detected. Please contact your healthcare provider as soon as possible.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleDownloadPDF(selectedResult)}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={() => setShowResultModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Refill Modal */}
      {showRefillModal && selectedMedication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900">Confirm Medication Refill</h3>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Would you like to request a refill for {selectedMedication.name} ({selectedMedication.dosage})?
                    </p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Pharmacy: {selectedMedication.pharmacy}</p>
                      <p className="text-sm text-gray-600">Refills remaining: {selectedMedication.refills}</p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={submitRefillRequest}
                    >
                      Confirm Refill
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setShowRefillModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-4 py-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl shadow-xl p-6 text-white">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Health Records</h1>
              <p className="mt-2 text-blue-100">
                View and manage your personal health information securely
              </p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:mt-0">
              <button
                onClick={handleUploadClick}
                className="inline-flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-white hover:bg-white/30 transition-all duration-200 border border-white/30"
              >
                <ArrowUpTrayIcon className="mr-2 h-5 w-5" />
                Upload Records
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 transition-all duration-200"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Add Record
              </button>
            </div>
          </div>
        </div>

        {/* Search and Tabs Container */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search records by title, doctor, or type..."
                className="block w-full rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.name
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <tab.icon
                    className={`mr-2 h-5 w-5 ${
                      activeTab === tab.name ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}
