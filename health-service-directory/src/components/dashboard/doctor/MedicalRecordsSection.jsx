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
  ArrowUpTrayIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import ConfirmationModal from './ConfirmationModal';

export default function MedicalRecordsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [records, setRecords] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      recordType: 'Lab Results',
      date: '2024-03-15',
      description: 'Complete blood count (CBC), Lipid panel, Liver function tests',
      doctor: 'Dr. Sarah Johnson',
      facility: 'Central Medical Lab',
      attachments: ['blood_work_john_doe.pdf'],
      notes: 'Cholesterol levels slightly elevated. Follow-up in 3 months recommended.',
      status: 'completed'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      recordType: 'Prescription',
      date: '2024-03-10',
      description: 'Lisinopril 10mg - Take once daily for hypertension',
      doctor: 'Dr. Michael Chen',
      facility: 'City General Hospital',
      attachments: ['prescription_jane_smith.pdf'],
      notes: 'Patient reported mild dizziness with previous dose. Reduced from 20mg to 10mg.',
      status: 'active'
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      recordType: 'Imaging Results',
      date: '2024-04-05',
      description: 'Chest X-ray and CT scan of lungs',
      doctor: 'Dr. Emily Williams',
      facility: 'Advanced Imaging Center',
      attachments: ['chest_xray.pdf', 'ct_scan_report.pdf'],
      notes: 'No significant abnormalities detected. Clear lung fields.',
      status: 'completed'
    },
    {
      id: 4,
      patientName: 'Maria Garcia',
      recordType: 'Treatment Plan',
      date: '2024-04-12',
      description: 'Physical therapy regimen for shoulder rehabilitation',
      doctor: 'Dr. James Wilson',
      facility: 'Rehabilitation Center',
      attachments: ['shoulder_rehab_plan.pdf', 'exercise_guide.pdf'],
      notes: 'Patient to attend PT sessions 2x weekly for 6 weeks. Home exercises provided.',
      status: 'active'
    },
    {
      id: 5,
      patientName: 'David Lee',
      recordType: 'Medical History',
      date: '2024-02-28',
      description: 'Comprehensive medical history compilation',
      doctor: 'Dr. Sarah Johnson',
      facility: 'Family Health Clinic',
      attachments: ['medical_history_david_lee.pdf'],
      notes: 'Family history of diabetes and heart disease noted. Preventive screening recommended.',
      status: 'completed'
    },
    {
      id: 6,
      patientName: 'John Doe',
      recordType: 'Progress Notes',
      date: '2024-04-20',
      description: 'Follow-up appointment for hypertension management',
      doctor: 'Dr. Sarah Johnson',
      facility: 'Family Health Clinic',
      attachments: ['progress_notes_john_doe.pdf'],
      notes: 'Blood pressure improved with current medication regimen. Continue current treatment.',
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
    setShowViewModal(true);
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
    
    // Get form values
    const fileInput = document.querySelector('input[type="file"]');
    const categorySelect = document.querySelector('select');
    const descriptionTextarea = document.querySelector('textarea[placeholder="Add a description..."]');
    
    const fileName = fileInput?.files[0]?.name || 'uploaded_file.pdf';
    const category = categorySelect?.value || 'Lab Results';
    const description = descriptionTextarea?.value || '';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Create new record object
    const newRecordData = {
      id: records.length + 1,
      patientName: 'John Doe', // This would normally come from a patient selection
      recordType: category,
      date: currentDate,
      description: description,
      attachments: [fileName],
      doctor: 'Dr. Sarah Johnson',
      facility: 'Central Medical Center',
      status: 'completed'
    };

    // Add new record to the list
    setRecords(prev => [...prev, newRecordData]);

    // Prepare confirmation data
    setConfirmationData({
      'Record Type': category,
      'Patient': 'John Doe',
      'Date': currentDate,
      'File': fileName,
      'Description': description || 'No description provided'
    });

    // Reset form and close modal
    setNewRecord({
      patientName: '',
      recordType: '',
      date: '',
      description: '',
      file: null
    });
    
    // Close modal and show confirmation
    setShowUploadModal(false);
    setShowConfirmation(true);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Upload New Record</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
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
                onClick={(e) => handleUpload(e)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <ArrowUpTrayIcon className="h-5 w-5 mr-1" />
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
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {record.recordType === 'Lab Results' && (
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <ClipboardDocumentListIcon className="h-8 w-8 text-blue-600" />
                      </div>
                    )}
                    {record.recordType === 'Prescription' && (
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <DocumentTextIcon className="h-8 w-8 text-purple-600" />
                      </div>
                    )}
                    {record.recordType === 'Imaging Results' && (
                      <div className="bg-green-100 p-2 rounded-lg">
                        <DocumentArrowUpIcon className="h-8 w-8 text-green-600" />
                      </div>
                    )}
                    {record.recordType === 'Treatment Plan' && (
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <DocumentTextIcon className="h-8 w-8 text-orange-600" />
                      </div>
                    )}
                    {record.recordType === 'Medical History' && (
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <DocumentTextIcon className="h-8 w-8 text-gray-600" />
                      </div>
                    )}
                    {record.recordType === 'Progress Notes' && (
                      <div className="bg-teal-100 p-2 rounded-lg">
                        <DocumentTextIcon className="h-8 w-8 text-teal-600" />
                      </div>
                    )}
                    {!['Lab Results', 'Prescription', 'Imaging Results', 'Treatment Plan', 'Medical History', 'Progress Notes'].includes(record.recordType) && (
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <DocumentTextIcon className="h-8 w-8 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="text-lg font-medium text-gray-900">{record.recordType}</h4>
                      <span className={`ml-3 px-2.5 py-0.5 text-xs font-medium rounded-full ${record.status === 'completed' ? 'bg-green-100 text-green-800' : record.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-1" />
                        <span className="font-medium">{record.patientName}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{record.date}</span>
                      </div>
                      {record.doctor && (
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-1" />
                          <span>{record.doctor}</span>
                        </div>
                      )}
                      {record.facility && (
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <span>{record.facility}</span>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{record.description}</p>
                    {record.notes && (
                      <div className="mt-2 bg-gray-50 p-2 rounded border-l-2 border-gray-300">
                        <p className="text-xs text-gray-500">Notes:</p>
                        <p className="text-sm text-gray-700">{record.notes}</p>
                      </div>
                    )}
                    {record.attachments && record.attachments.length > 0 && (
                      <div className="mt-2 flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Attachments:</span>
                        <div className="flex flex-wrap gap-2">
                          {record.attachments.map((attachment, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              <DocumentTextIcon className="h-3 w-3 mr-1" />
                              {attachment}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex md:flex-col items-center space-x-2 md:space-x-0 md:space-y-2">
                  <button 
                    onClick={() => handleViewRecord(record)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center"
                    title="View Record"
                  >
                    <EyeIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">View</span>
                  </button>
                  <button 
                    onClick={() => handleDownloadRecord(record)}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors duration-200 flex items-center"
                    title="Download Record"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">Download</span>
                  </button>
                  <button 
                    onClick={() => handleDeleteRecord(record.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center"
                    title="Delete Record"
                  >
                    <TrashIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">Delete</span>
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
      {/* View Record Modal */}
      {showViewModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto z-50">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                {selectedRecord.recordType === 'Lab Results' && (
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <ClipboardDocumentListIcon className="h-8 w-8 text-blue-600" />
                  </div>
                )}
                {selectedRecord.recordType === 'Prescription' && (
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <DocumentTextIcon className="h-8 w-8 text-purple-600" />
                  </div>
                )}
                {selectedRecord.recordType === 'Imaging Results' && (
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <DocumentArrowUpIcon className="h-8 w-8 text-green-600" />
                  </div>
                )}
                {selectedRecord.recordType === 'Treatment Plan' && (
                  <div className="bg-orange-100 p-2 rounded-lg mr-3">
                    <DocumentTextIcon className="h-8 w-8 text-orange-600" />
                  </div>
                )}
                {selectedRecord.recordType === 'Medical History' && (
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <DocumentTextIcon className="h-8 w-8 text-gray-600" />
                  </div>
                )}
                {selectedRecord.recordType === 'Progress Notes' && (
                  <div className="bg-teal-100 p-2 rounded-lg mr-3">
                    <DocumentTextIcon className="h-8 w-8 text-teal-600" />
                  </div>
                )}
                {!['Lab Results', 'Prescription', 'Imaging Results', 'Treatment Plan', 'Medical History', 'Progress Notes'].includes(selectedRecord.recordType) && (
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    <DocumentTextIcon className="h-8 w-8 text-gray-600" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedRecord.recordType}</h3>
                  <p className="text-sm text-gray-500">Record ID: #{selectedRecord.id}</p>
                </div>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Left column - Patient Information */}
              <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Patient Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-base font-medium text-gray-900">{selectedRecord.patientName}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${selectedRecord.status === 'completed' ? 'bg-green-100 text-green-800' : selectedRecord.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle column - Record Details */}
              <div className="md:col-span-2 bg-white border border-gray-200 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                  <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Record Details
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-base text-gray-900">{selectedRecord.date}</p>
                    </div>
                    {selectedRecord.doctor && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Doctor</p>
                        <p className="text-base text-gray-900">{selectedRecord.doctor}</p>
                      </div>
                    )}
                    {selectedRecord.facility && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Facility</p>
                        <p className="text-base text-gray-900">{selectedRecord.facility}</p>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-base text-gray-900 mt-1">{selectedRecord.description}</p>
                  </div>
                  {selectedRecord.notes && (
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm font-medium text-gray-500">Notes</p>
                      <div className="mt-2 bg-gray-50 p-3 rounded border-l-2 border-gray-300">
                        <p className="text-base text-gray-700">{selectedRecord.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <DocumentArrowUpIcon className="h-5 w-5 mr-2 text-gray-500" />
                Attachments
              </h4>
              {selectedRecord.attachments && selectedRecord.attachments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedRecord.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center overflow-hidden">
                        <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium text-gray-900 truncate">{attachment}</p>
                          <p className="text-xs text-gray-500">PDF Document</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownloadRecord(selectedRecord)}
                        className="ml-4 p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center flex-shrink-0"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
                        <span className="text-sm">Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No attachments</h3>
                  <p className="mt-1 text-sm text-gray-500">There are no attachments for this record.</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-3 border-t border-gray-200 pt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={() => handleDownloadRecord(selectedRecord)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
                Download All Attachments
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Record Uploaded Successfully"
        message="The medical record has been uploaded and is now available in the system."
        type="success"
        data={confirmationData}
      />
    </div>
  );
}