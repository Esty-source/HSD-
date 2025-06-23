import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import {
  CalendarIcon,
  CheckCircleIcon,
  HeartIcon,
  PillIcon,
  ArrowRightIcon,
  UserGroupIcon,
  PhoneIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Upcoming Appointments',
    value: '3',
    icon: CalendarIcon,
    color: 'from-blue-400 to-blue-600',
    text: 'text-blue-700',
    bg: 'bg-blue-50',
  },
  {
    name: 'Completed Visits',
    value: '12',
    icon: CheckCircleIcon,
    color: 'from-green-400 to-green-600',
    text: 'text-green-700',
    bg: 'bg-green-50',
  },
  {
    name: 'Health Score',
    value: '85%',
    icon: HeartIcon,
    color: 'from-pink-400 to-red-500',
    text: 'text-pink-700',
    bg: 'bg-pink-50',
  },
  {
    name: 'Active Medications',
    value: '2',
    icon: PillIcon,
    color: 'from-orange-400 to-orange-600',
    text: 'text-orange-700',
    bg: 'bg-orange-50',
  },
];

const quickActions = [
  {
    name: 'Book Appointment',
    icon: CalendarIcon,
    href: '/appointments',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Find Doctors',
    icon: UserGroupIcon,
    href: '/doctors',
    color: 'from-green-500 to-green-700',
  },
  {
    name: 'Telemedicine',
    icon: PhoneIcon,
    href: '/telemedicine',
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'Pharmacy',
    icon: BuildingStorefrontIcon,
    href: '/pharmacies',
    color: 'from-orange-500 to-orange-700',
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen ml-0 lg:ml-64">
        {/* Top Navbar */}
        <DashboardNavbar />
        {/* Dashboard Content */}
        <div className="flex-1 px-8 py-8">
          {/* Section Header */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 mb-8">Welcome to your health dashboard!</p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-10">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className={`relative rounded-2xl shadow-xl p-6 ${stat.bg} backdrop-blur-md bg-opacity-80 flex flex-col gap-2 overflow-hidden`}
                style={{ minHeight: '140px' }}
              >
                <div className={`absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br ${stat.color} opacity-20 z-0`} />
                <div className="flex items-center gap-3 z-10">
                  <span className={`inline-flex items-center justify-center rounded-lg bg-gradient-to-br ${stat.color} text-white h-10 w-10 shadow-lg`}>
                    <stat.icon className="h-6 w-6" />
                  </span>
                  <span className="font-semibold text-lg text-gray-800">{stat.name}</span>
                </div>
                <div className="mt-4 z-10">
                  <span className={`text-3xl font-extrabold ${stat.text}`}>{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className={`flex items-center gap-3 px-6 py-5 rounded-2xl font-semibold text-white bg-gradient-to-br ${action.color} shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200`}
                >
                  <action.icon className="h-6 w-6" />
                  <span>{action.name}</span>
                  <ArrowRightIcon className="h-5 w-5 ml-auto" />
                </Link>
              ))}
            </div>
          </div>

          {/* Example Health Tip Section (Cameroonian context) */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 shadow-inner flex flex-col md:flex-row items-center gap-6">
            <img src="/images/doctors/doctor-cameroon-1.jpg" alt="Cameroonian Doctor" className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-md" />
            <div>
              <h3 className="text-lg font-bold text-green-800 mb-1">Health Tip of the Day</h3>
              <p className="text-gray-700">Drink plenty of water and eat local fruits like papaya and mango for a healthy immune system. 🇨🇲</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 