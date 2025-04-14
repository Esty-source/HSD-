import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUserMd, FaPrescription, FaFileAlt, FaBell } from 'react-icons/fa';

const DashboardCard = ({ title, icon: Icon, value, linkTo, className }) => (
  <Link to={linkTo} className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold mt-2">{value}</p>
      </div>
      <Icon className="text-3xl text-primary-600" />
    </div>
  </Link>
);

const PatientDashboard = () => {
  // Mock data - replace with actual data from your backend
  const dashboardData = {
    upcomingAppointments: 2,
    prescriptions: 3,
    recentDoctors: 4,
    unreadNotifications: 1,
    recentDocuments: 2,
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Patient Dashboard</h1>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Upcoming Appointments"
            icon={FaCalendarAlt}
            value={dashboardData.upcomingAppointments}
            linkTo="/appointments"
          />
          <DashboardCard
            title="Active Prescriptions"
            icon={FaPrescription}
            value={dashboardData.prescriptions}
            linkTo="/health-records"
          />
          <DashboardCard
            title="Recent Doctors"
            icon={FaUserMd}
            value={dashboardData.recentDoctors}
            linkTo="/doctors"
          />
        </div>

        {/* Recent Activity and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Appointment with Dr. Smith</p>
                  <p className="text-sm text-gray-500">Cardiology Consultation</p>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">New Prescription Added</p>
                  <p className="text-sm text-gray-500">By Dr. Johnson</p>
                </div>
                <span className="text-sm text-gray-500">5 days ago</span>
              </div>
            </div>
            <Link to="/health-records" className="text-primary-600 text-sm font-medium mt-4 inline-block">
              View All Activity
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/appointments/new" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <FaCalendarAlt className="text-primary-600 mr-3" />
                <span>Book Appointment</span>
              </Link>
              <Link to="/telemedicine" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <FaUserMd className="text-primary-600 mr-3" />
                <span>Start Consultation</span>
              </Link>
              <Link to="/health-records" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <FaFileAlt className="text-primary-600 mr-3" />
                <span>View Records</span>
              </Link>
              <Link to="/notifications" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                <FaBell className="text-primary-600 mr-3" />
                <span>Notifications</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard; 