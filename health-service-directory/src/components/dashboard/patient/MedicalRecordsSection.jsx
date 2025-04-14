import { useState } from 'react';
import { DocumentIcon, FolderIcon, CloudArrowUpIcon, DocumentArrowDownIcon, DocumentTextIcon, CalendarIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function MedicalRecordsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
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
    if (newRecord.name && newRecord.category && newRecord.file) {
      const newRecordItem = {
        id: records.length + 1,
        date: new Date().toISOString().split('T')[0],
        doctor: "Dr. Sarah Wilson", // This would come from the current user's doctor
        fileSize: "2.4 MB", // This would be calculated from the actual file
        fileType: "PDF", // This would be determined from the file extension
        ...newRecord
      };
      records.push(newRecordItem);
      setShowUploadModal(false);
      setNewRecord({ name: '', category: '', file: null });
    }
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
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
                  File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
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
                          onChange={(e) => setNewRecord({ ...newRecord, file: e.target.files[0] })}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, DICOM up to 10MB</p>
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
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
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
              <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
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
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <CloudArrowUpIcon className="h-5 w-5 mr-2" />
              Upload First Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 