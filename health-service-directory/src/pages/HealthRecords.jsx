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

  const renderContent = () => {
    switch (activeTab) {
      case 'Medical History':
        return (
          <div className="mt-6">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <ul role="list" className="divide-y divide-gray-200">
                {mockRecords.medicalHistory.map((record) => (
                  <li key={record.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{record.title}</p>
                        <p className="text-sm text-gray-500">
                          {record.doctor} • {record.date}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          record.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {record.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'Lab Results':
        return (
          <div className="mt-6">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <ul role="list" className="divide-y divide-gray-200">
                {mockRecords.labResults.map((result) => (
                  <li key={result.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{result.title}</p>
                        <p className="text-sm text-gray-500">
                          {result.type} • {result.date}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          result.status === 'Normal'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {result.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'Medications':
        return (
          <div className="mt-6">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <ul role="list" className="divide-y divide-gray-200">
                {mockRecords.medications.map((medication) => (
                  <li key={medication.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{medication.name}</p>
                        <p className="text-sm text-gray-500">
                          {medication.dosage} • {medication.frequency}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {medication.startDate} to {medication.endDate}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Pharmacy: {medication.pharmacy}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleRefill(medication)}
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Refill ({medication.refills} left)
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
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

      <div className="w-full px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Health Records</h1>
              <p className="mt-2 text-sm text-gray-500">
                View and manage your personal health information
              </p>
            </div>
            <div className="mt-4 flex space-x-3 sm:mt-0">
              <button
                onClick={handleUploadClick}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <ArrowUpTrayIcon className="mr-2 h-5 w-5 text-gray-400" />
                Upload Records
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Add Record
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search records..."
              className="block w-full rounded-md border-0 py-1.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                className={`flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
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

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}
