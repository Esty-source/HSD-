import { useState } from 'react';
import { DocumentIcon, FolderIcon, CloudArrowUpIcon, DocumentArrowDownIcon, DocumentTextIcon, CalendarIcon, UserIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export default function MedicalRecordsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [newRecord, setNewRecord] = useState({
    name: '',
    category: '',
    file: null
  });

  // Mock data - will be replaced with real API data
  const categories = [
    { id: 'all', name: 'All Records', icon: FolderIcon },
    { id: 'lab', name: 'Lab Results', icon: DocumentTextIcon },
    { id: 'prescriptions', name: 'Prescriptions', icon: DocumentIcon },
    { id: 'imaging', name: 'Imaging', icon: DocumentIcon },
    { id: 'reports', name: 'Medical Reports', icon: DocumentTextIcon },
  ];

  const records = [
    {
      id: 1,
      name: "Blood Test Results",
      category: "lab",
      date: "2024-03-10",
      doctor: "Dr. Sarah Wilson",
      fileSize: "2.4 MB",
      fileType: "PDF"
    },
    {
      id: 2,
      name: "Chest X-Ray",
      category: "imaging",
      date: "2024-02-15",
      doctor: "Dr. Michael Chen",
      fileSize: "5.1 MB",
      fileType: "DICOM"
    },
    {
      id: 3,
      name: "Annual Check-up Report",
      category: "reports",
      date: "2024-01-20",
      doctor: "Dr. Emily Brown",
      fileSize: "1.8 MB",
      fileType: "PDF"
    },
    {
      id: 4,
      name: "Prescription - Antibiotics",
      category: "prescriptions",
      date: "2024-03-05",
      doctor: "Dr. Emily Brown",
      fileSize: "0.5 MB",
      fileType: "PDF"
    }
  ];

  const filteredRecords = records.filter(record => 
    activeCategory === 'all' || record.category === activeCategory
  );

  const handleUploadRecord = () => {
    if (newRecord.name && newRecord.category) {
      // Check if file is selected
      if (!newRecord.file) {
        toast.error('Please select a file to upload', {
          duration: 3000,
          position: 'top-center',
        });
        return;
      }
      
      // Create new record with file info
      const fileType = newRecord.file.name.split('.').pop().toUpperCase();
      const fileSizeMB = (newRecord.file.size / (1024 * 1024)).toFixed(1);
      
      const newRecordItem = {
        id: records.length + 1,
        name: newRecord.name,
        category: newRecord.category,
        date: new Date().toISOString().split('T')[0],
        doctor: "Dr. Sarah Wilson", // This would come from the current user's doctor
        fileSize: `${fileSizeMB} MB`,
        fileType: fileType
      };
      
      // Add to records array (in a real app, this would be an API call)
      records.push(newRecordItem);
      
      // Reset form and close modal
      setShowUploadModal(false);
      setNewRecord({ name: '', category: '', file: null });
      
      // Show success message
      toast.success('Record uploaded successfully!', {
        duration: 3000,
        position: 'top-center',
      });
    } else {
      // Show error if required fields are missing
      toast.error('Please fill in all required fields', {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  const handleDownloadClick = (record) => {
    setSelectedRecord(record);
    setShowDownloadModal(true);
  };

  // Use a ref to track if a toast has been shown to prevent duplicates
  const [hasShownToast, setHasShownToast] = useState(false);

  const simulateDownload = () => {
    // Reset the toast flag at the start of a new download
    setHasShownToast(false);
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setShowDownloadModal(false);
            
            // Only show toast if it hasn't been shown yet for this download
            if (!hasShownToast) {
              setHasShownToast(true);
              toast.success(`${selectedRecord.name} downloaded successfully!`, {
                duration: 3000,
                position: 'top-center',
                icon: '📄',
              });
            }
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Medical Records</h2>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
        >
          <CloudArrowUpIcon className="h-5 w-5 mr-2" />
          <span className="font-medium">Upload New Record</span>
        </button>
      </div>

      {/* Upload Record Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Upload New Record</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Record Name
                </label>
                <input
                  type="text"
                  value={newRecord.name}
                  onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                  placeholder="e.g., Blood Test Results"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newRecord.category}
                  onChange={(e) => setNewRecord({ ...newRecord, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="lab">Lab Results</option>
                  <option value="prescriptions">Prescriptions</option>
                  <option value="imaging">Imaging</option>
                  <option value="reports">Medical Reports</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File <span className="text-red-500">*</span>
                </label>
                <div 
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${newRecord.file ? 'border-green-300 bg-green-50' : 'border-gray-300'} border-dashed rounded-lg hover:bg-gray-50 transition-colors duration-200`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      setNewRecord({ ...newRecord, file: e.dataTransfer.files[0] });
                    }
                  }}
                >
                  <div className="space-y-1 text-center">
                    {newRecord.file ? (
                      <>
                        <DocumentIcon className="mx-auto h-12 w-12 text-green-500" />
                        <p className="text-sm font-medium text-green-700">{newRecord.file.name}</p>
                        <p className="text-xs text-green-600">
                          {(newRecord.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <button 
                          type="button"
                          onClick={() => setNewRecord({ ...newRecord, file: null })}
                          className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Remove file
                        </button>
                      </>
                    ) : (
                      <>
                        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.doc,.docx,.dicom,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setNewRecord({ ...newRecord, file: e.target.files[0] });
                                }
                              }}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, DICOM up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
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
                onClick={handleUploadRecord}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                Upload Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex space-x-4 mb-8 w-full overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl whitespace-nowrap transition-colors duration-200 ${
              activeCategory === category.id 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <category.icon className="h-5 w-5" />
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Records List */}
      <div className="w-full space-y-4">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center">
                  <DocumentIcon className="h-5 w-5 text-blue-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">{record.name}</h3>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{new Date(record.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{record.doctor}</span>
                  </div>
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{record.fileSize} • {record.fileType}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleDownloadClick(record)}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
                title="Download record"
              >
                <DocumentArrowDownIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No records found</h3>
          <p className="mt-1 text-gray-500">
            {activeCategory === 'all'
              ? "You don't have any medical records yet."
              : `No records found in ${categories.find(c => c.id === activeCategory)?.name}.`}
          </p>
          <div className="mt-6">
            <button 
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <CloudArrowUpIcon className="h-5 w-5 mr-2" />
              Upload First Record
            </button>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Download Medical Record</h3>
              <button 
                onClick={() => {
                  if (!isDownloading) {
                    setShowDownloadModal(false);
                  }
                }}
                className="text-gray-400 hover:text-gray-500"
                disabled={isDownloading}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <DocumentIcon className="h-8 w-8 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">{selectedRecord.name}</h4>
                  <p className="text-sm text-gray-500">{selectedRecord.fileSize} • {selectedRecord.fileType}</p>
                  <p className="text-sm text-gray-500 mt-1">Uploaded on {new Date(selectedRecord.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            {isDownloading && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Downloading...</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  if (!isDownloading) {
                    setShowDownloadModal(false);
                  }
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                disabled={isDownloading}
              >
                Cancel
              </button>
              {!isDownloading ? (
                <button
                  onClick={simulateDownload}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  Download
                </button>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 text-white bg-green-600 rounded-lg transition-colors duration-200 flex items-center opacity-90"
                >
                  <CheckIcon className="h-5 w-5 mr-2" />
                  Downloading...
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}