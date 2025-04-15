import { CalendarIcon, UserGroupIcon, ClipboardDocumentListIcon, VideoCameraIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function OverviewSection({ onTabChange }) {
  const handleViewSchedule = () => {
    onTabChange('appointments');
  };

  const handleViewPatients = () => {
    onTabChange('patients');
  };

  const handleViewRecords = () => {
    onTabChange('records');
  };

  const handleViewSessions = () => {
    onTabChange('telemedicine');
  };

  const handleViewPrescriptions = () => {
    onTabChange('prescriptions');
  };

  const handleViewAnalytics = () => {
    onTabChange('analytics');
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {/* Today's Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Today's Appointments</h3>
            <CalendarIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center text-gray-600">
            <span>No appointments scheduled</span>
          </div>
          <button 
            onClick={handleViewSchedule}
            className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
          >
            View Schedule
          </button>
        </div>

        {/* Active Patients */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Active Patients</h3>
            <UserGroupIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center text-gray-600">
            <span>No active patients</span>
          </div>
          <button 
            onClick={handleViewPatients}
            className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
          >
            View Patients
          </button>
        </div>

        {/* Recent Medical Records */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Records</h3>
            <ClipboardDocumentListIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center text-gray-600">
            <span>No recent records</span>
          </div>
          <button 
            onClick={handleViewRecords}
            className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
          >
            View Records
          </button>
        </div>

        {/* Telemedicine Sessions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Telemedicine</h3>
            <VideoCameraIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center text-gray-600">
            <span>No upcoming sessions</span>
          </div>
          <button 
            onClick={handleViewSessions}
            className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
          >
            View Sessions
          </button>
        </div>

        {/* Pending Prescriptions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Pending Prescriptions</h3>
            <DocumentTextIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center text-gray-600">
            <span>No pending prescriptions</span>
          </div>
          <button 
            onClick={handleViewPrescriptions}
            className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
          >
            View Prescriptions
          </button>
        </div>

        {/* Analytics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Analytics</h3>
            <ChartBarIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Patients</span>
              <span className="font-medium text-gray-800">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Appointments</span>
              <span className="font-medium text-gray-800">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Prescriptions</span>
              <span className="font-medium text-gray-800">0</span>
            </div>
          </div>
          <button 
            onClick={handleViewAnalytics}
            className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium"
          >
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
} 