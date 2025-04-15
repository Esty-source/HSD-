import { useState } from 'react';
import { 
  DocumentTextIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  UserIcon,
  CalendarIcon,
  DocumentArrowUpIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function MedicalRecordsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filters = [
    { id: 'all', name: 'All Records' },
    { id: 'recent', name: 'Recent' },
    { id: 'lab', name: 'Lab Results' },
    { id: 'prescription', name: 'Prescriptions' },
    { id: 'imaging', name: 'Imaging' },
  ];

  // Mock medical records data
  const records = [
    {
      id: 1,
      patientName: 'John Doe',
      type: 'Lab Results',
      date: '2024-04-15',
      doctor: 'Dr. Smith',
      fileSize: '2.5 MB',
      status: 'Completed',
      description: 'Complete Blood Count and Basic Metabolic Panel'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      type: 'Prescription',
      date: '2024-04-14',
      doctor: 'Dr. Smith',
      fileSize: '1.2 MB',
      status: 'Active',
      description: 'Antibiotics prescription for sinus infection'
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      type: 'Imaging',
      date: '2024-04-13',
      doctor: 'Dr. Smith',
      fileSize: '15.8 MB',
      status: 'Pending Review',
      description: 'Chest X-ray for persistent cough'
    },
  ];

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setShowDetailsModal(true);
  };

  const handleDownloadRecord = (record) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = record.fileUrl;
    link.download = record.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteRecord = (recordId) => {
    // Remove the record from the list
    const updatedRecords = records.filter(record => record.id !== recordId);
    setRecords(updatedRecords);
  };

  const handleUploadSubmit = (file, category, description) => {
    // Create a new record object
    const newRecord = {
      id: Date.now(),
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      fileType: file.type,
      category,
      description,
      uploadDate: new Date().toLocaleDateString(),
      doctor: 'Dr. Smith',
      fileUrl: URL.createObjectURL(file)
    };

    // Add the new record to the list
    setRecords([...records, newRecord]);
    setShowUploadModal(false);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Medical Records</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
          Upload New Record
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search records..."
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

      {/* Records List */}
      <div className="mt-6 space-y-4">
        {records.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{record.fileName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Uploaded: {record.uploadDate}</span>
                  <UserIcon className="h-5 w-5 text-gray-400 ml-2" />
                  <span className="text-gray-600">By: {record.doctor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Size: {record.fileSize}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-500">Type: {record.fileType}</span>
                </div>
                {record.description && (
                  <p className="text-sm text-gray-600 mt-2">{record.description}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewRecord(record)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDownloadRecord(record)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteRecord(record.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Record Details Modal */}
      {showDetailsModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Record Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">File Information</h4>
                <p className="text-gray-600">Name: {selectedRecord.fileName}</p>
                <p className="text-gray-600">Size: {selectedRecord.fileSize}</p>
                <p className="text-gray-600">Type: {selectedRecord.fileType}</p>
                <p className="text-gray-600">Category: {selectedRecord.category}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Upload Details</h4>
                <p className="text-gray-600">Date: {selectedRecord.uploadDate}</p>
                <p className="text-gray-600">Uploaded by: {selectedRecord.doctor}</p>
              </div>
              {selectedRecord.description && (
                <div>
                  <h4 className="font-medium text-gray-900">Description</h4>
                  <p className="text-gray-600">{selectedRecord.description}</p>
                </div>
              )}
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upload New Record</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">File</label>
                <input
                  type="file"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Lab Results</option>
                  <option>Imaging</option>
                  <option>Prescriptions</option>
                  <option>Notes</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add a description..."
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUploadSubmit(newFile, newCategory, newDescription)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {records.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No records found</h3>
          <p className="text-gray-500 mt-1">There are no medical records matching your search criteria.</p>
        </div>
      )}
    </div>
  );
} 