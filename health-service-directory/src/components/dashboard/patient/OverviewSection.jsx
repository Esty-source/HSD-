import { CalendarIcon, ClipboardIcon, BellIcon, ChartBarIcon, CreditCardIcon } from '@heroicons/react/24/outline';

export default function OverviewSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {/* Upcoming Appointment Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Next Appointment</h3>
            <CalendarIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center text-gray-600">
            <span>No upcoming appointments</span>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium">
            Schedule Appointment
          </button>
        </div>

        {/* Recent Medical Records */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Medical Records</h3>
            <ClipboardIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center text-gray-600">
            <span>No recent records</span>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium">
            View All Records
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Notifications</h3>
            <BellIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center text-gray-600">
            <span>No new notifications</span>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium">
            View All Notifications
          </button>
        </div>

        {/* Health Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Health Metrics</h3>
            <ChartBarIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Blood Pressure</span>
              <span className="font-medium text-gray-800">--/-- mmHg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Heart Rate</span>
              <span className="font-medium text-gray-800">-- bpm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Weight</span>
              <span className="font-medium text-gray-800">-- kg</span>
            </div>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium">
            Update Metrics
          </button>
        </div>

        {/* Medications */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Current Medications</h3>
            <ClipboardIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center text-gray-600">
            <span>No active medications</span>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium">
            Manage Medications
          </button>
        </div>

        {/* Payment Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Payment Summary</h3>
            <CreditCardIcon className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex items-center text-gray-600">
            <span>No recent payments</span>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium">
            View Payment History
          </button>
        </div>
      </div>
    </div>
  );
} 