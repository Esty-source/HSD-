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
  PlusIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';

export default function MedicalRecordsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [records, setRecords] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      recordType: 'Lab Results',
      date: '2024-03-15',
      description: 'Blood work analysis',
      attachments: ['blood_work.pdf'],
      status: 'completed'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      recordType: 'Prescription',
      date: '2024-03-10',
      description: 'Monthly medication prescription',
      attachments: ['prescription.pdf'],
      status: 'pending'
    }
  ]);

  const [newRecord, setNewRecord] = useState({
    patientName: '',
    recordType: '',
    date: '',
    description: '',
    file: null
  });

  const [newFile, setNewFile] = useState(null);
  const [newCategory, setNewCategory] = useState('Lab Results');
  const [newDescription, setNewDescription] = useState('');

  const filters = [
    { id: 'all', name: 'All Records' },
    { id: 'recent', name: 'Recent' },
    { id: 'lab', name: 'Lab Results' },
    { id: 'prescription', name: 'Prescriptions' },
    { id: 'imaging', name: 'Imaging' },
  ];

  const recordTypes = [
    'Lab Results',
    'Prescription',
    'Medical History',
    'Imaging Results',
    'Treatment Plan',
    'Progress Notes',
    'Discharge Summary'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewRecord(prev => ({
      ...prev,
      file: file
    }));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    
    // Create new record object
    const newRecordData = {
      id: records.length + 1,
      patientName: newRecord.patientName,
      recordType: newRecord.recordType,
      date: newRecord.date,
      description: newRecord.description,
      attachments: [newRecord.file?.name || 'uploaded_file.pdf'],
      status: 'completed'
    };

    // Add new record to the list
    setRecords(prev => [...prev, newRecordData]);

    // Reset form and close modal
    setNewRecord({
      patientName: '',
      recordType: '',
      date: '',
      description: '',
      file: null
    });
    setShowUploadModal(false);
  };

  const handleUploadSubmit = (file, category, description) => {
    // Handle the upload of the new file
    console.log('Uploading file:', file);
    console.log('Category:', category);
    console.log('Description:', description);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Upload New Record
        </button>
      </div>

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
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const newRecord = {
                        id: Date.now(),
                        fileName: file.name,
                        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
                        fileType: file.type,
                        category: 'Lab Results',
                        description: '',
                        uploadDate: new Date().toLocaleDateString(),
                        doctor: 'Dr. Smith',
                        fileUrl: URL.createObjectURL(file)
                      };
                      setRecords(prev => [...prev, newRecord]);
                      setShowUploadModal(false);
                    }
                  }}
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
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Records List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {records.map((record) => (
            <div key={record.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <DocumentTextIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{record.recordType}</h4>
                    <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                      <UserIcon className="h-4 w-4" />
                      <span>{record.patientName}</span>
                      <span className="text-gray-300">|</span>
                      <CalendarIcon className="h-4 w-4" />
                      <span>{record.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{record.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    record.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {record.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {records.length === 0 && (
        <div className="text-center py-12">
          <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No records</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by uploading a new medical record.</p>
        </div>
      )}
    </div>
  );
} 