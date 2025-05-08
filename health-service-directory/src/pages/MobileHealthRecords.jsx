import React, { useState, useRef } from 'react';
import {
  FolderIcon,
  DocumentTextIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
  ChevronRightIcon,
  CalendarIcon,
  UserIcon,
  ClockIcon,
  DocumentIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowDownTrayIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import MobileLayout from '../components/responsive/MobileLayout';

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

export default function MobileHealthRecords() {
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
    alert(`Refill request submitted for ${selectedMedication.name}`);
    setShowRefillModal(false);
  };

  const handleViewResults = (result) => {
    setSelectedResult(result);
    setShowResultModal(true);
  };

  const handleViewMedicalHistory = (record) => {
    setSelectedMedicalRecord(record);
    setShowMedicalHistoryModal(true);
  };

  // Filter records based on search term
  const filteredRecords = {
    medicalHistory: mockRecords.medicalHistory.filter(
      (record) =>
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.type.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    labResults: mockRecords.labResults.filter(
      (record) =>
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.type.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    medications: mockRecords.medications.filter(
      (medication) =>
        medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medication.pharmacy.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  };

  // Render medical history records
  const renderMedicalHistory = () => (
    <div className="space-y-3">
      {filteredRecords.medicalHistory.length > 0 ? (
        filteredRecords.medicalHistory.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            onClick={() => handleViewMedicalHistory(record)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{record.title}</h3>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span>{record.date}</span>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <UserIcon className="h-3 w-3 mr-1" />
                  <span>{record.doctor}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  record.status === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {record.status}
                </span>
                <ChevronRightIcon className="h-4 w-4 text-gray-400 mt-2" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <DocumentIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No medical history records found</p>
        </div>
      )}
    </div>
  );

  // Render lab results
  const renderLabResults = () => (
    <div className="space-y-3">
      {filteredRecords.labResults.length > 0 ? (
        filteredRecords.labResults.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            onClick={() => handleViewResults(result)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{result.title}</h3>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span>{result.date}</span>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <DocumentIcon className="h-3 w-3 mr-1" />
                  <span>{result.type}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  result.status === 'Normal' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {result.status}
                </span>
                <ChevronRightIcon className="h-4 w-4 text-gray-400 mt-2" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <ChartBarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No lab results found</p>
        </div>
      )}
    </div>
  );

  // Render medications
  const renderMedications = () => (
    <div className="space-y-3">
      {filteredRecords.medications.length > 0 ? (
        filteredRecords.medications.map((medication) => (
          <div
            key={medication.id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{medication.name}</h3>
                <p className="text-sm text-gray-600">{medication.dosage} • {medication.frequency}</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span>{medication.startDate} to {medication.endDate}</span>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  <span>{medication.refills} refills remaining</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => handleRefill(medication)}
                className="flex-1 bg-blue-600 text-white text-xs py-2 rounded-lg flex items-center justify-center"
              >
                <BellIcon className="h-3 w-3 mr-1" />
                Request Refill
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No medications found</p>
        </div>
      )}
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Medical History':
        return renderMedicalHistory();
      case 'Lab Results':
        return renderLabResults();
      case 'Medications':
        return renderMedications();
      default:
        return null;
    }
  };

  return (
    <MobileLayout title="Health Records">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />
      
      {/* Search bar */}
      <div className="px-4 py-3 bg-white">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search records..."
            className="w-full py-2 pl-9 pr-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="px-4 py-2 bg-white border-b flex overflow-x-auto no-scrollbar">
        {['Medical History', 'Lab Results', 'Medications'].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-2 text-sm whitespace-nowrap ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="px-4 py-3 bg-white border-b flex space-x-2">
        <button
          onClick={handleUploadClick}
          className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg flex items-center justify-center"
        >
          <ArrowUpTrayIcon className="h-4 w-4 mr-1" />
          Upload
        </button>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg flex items-center justify-center"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Record
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {renderContent()}
      </div>
      
      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Record</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1">
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newRecord.title}
                  onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter record title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                <input
                  type="text"
                  value={newRecord.doctor || ''}
                  onChange={(e) => setNewRecord({ ...newRecord, doctor: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter doctor's name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <input
                  type="text"
                  value={newRecord.type}
                  onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter record type"
                />
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleAddRecord}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
                >
                  Add Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Refill Modal */}
      {showRefillModal && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Request Medication Refill</h3>
              <button onClick={() => setShowRefillModal(false)} className="p-1">
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-blue-800">{selectedMedication.name}</h4>
              <p className="text-sm text-blue-700">{selectedMedication.dosage} • {selectedMedication.frequency}</p>
              <p className="text-xs text-blue-600 mt-1">{selectedMedication.pharmacy}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Method</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Pickup at Pharmacy</option>
                  <option>Home Delivery</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows="3"
                  placeholder="Any special instructions for your refill"
                ></textarea>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setShowRefillModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRefillRequest}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Lab Result Modal */}
      {showResultModal && selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full p-4 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedResult.title}</h3>
              <button onClick={() => setShowResultModal(false)} className="p-1">
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-700">{selectedResult.date}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedResult.status === 'Normal' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedResult.status}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Test Details</h4>
                <p className="text-sm text-gray-700 mb-4">
                  This is a sample lab result for demonstration purposes. In a real application, this would contain detailed information about the test results, reference ranges, and interpretations.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-medium text-gray-800 mb-2">Sample Results</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hemoglobin</span>
                      <span className="text-sm font-medium text-gray-900">14.2 g/dL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">White Blood Cells</span>
                      <span className="text-sm font-medium text-gray-900">7.5 x10^9/L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Platelets</span>
                      <span className="text-sm font-medium text-gray-900">250 x10^9/L</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm flex items-center justify-center">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                  Download PDF
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm flex items-center justify-center">
                  Share with Doctor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Medical History Modal */}
      {showMedicalHistoryModal && selectedMedicalRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full p-4 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedMedicalRecord.title}</h3>
              <button onClick={() => setShowMedicalHistoryModal(false)} className="p-1">
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-700">{selectedMedicalRecord.date}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedMedicalRecord.status === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedMedicalRecord.status}
                </span>
              </div>
              
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-700">{selectedMedicalRecord.doctor}</span>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Visit Summary</h4>
                <p className="text-sm text-gray-700 mb-4">
                  This is a sample medical record for demonstration purposes. In a real application, this would contain detailed information about the visit, diagnosis, treatment plan, and follow-up instructions.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-medium text-gray-800 mb-2">Diagnosis</h5>
                  <p className="text-sm text-gray-700">
                    Regular checkup, no significant issues found. Patient is in good health.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mt-3">
                  <h5 className="font-medium text-gray-800 mb-2">Recommendations</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                      <span>Continue regular exercise routine</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                      <span>Maintain balanced diet</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                      <span>Follow up in 12 months for next annual exam</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm flex items-center justify-center">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                  Download PDF
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm flex items-center justify-center">
                  Schedule Follow-up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add styles for animations */}
      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </MobileLayout>
  );
}
