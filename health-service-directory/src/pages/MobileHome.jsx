import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  ClockIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  HeartIcon,
  PhoneIcon,
  BookmarkIcon,
  StarIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import FloatingNotifications from '../components/home/FloatingNotifications';
import { useViewport } from '../components/responsive/ViewportProvider';

export default function MobileHome() {
  // Features section data
  const features = [
    {
      name: 'Find Doctors',
      description: 'Search for qualified healthcare professionals',
      icon: UserGroupIcon,
      to: '/doctors',
      color: 'bg-blue-600',
    },
    {
      name: 'Book Appointments',
      description: 'Schedule visits with healthcare providers',
      icon: ClockIcon,
      to: '/appointments',
      color: 'bg-green-600',
    },
    {
      name: 'Telemedicine',
      description: 'Virtual consultations from anywhere',
      icon: VideoCameraIcon,
      to: '/telemedicine',
      color: 'bg-purple-600',
    },
    {
      name: 'Health Records',
      description: 'Access your medical history',
      icon: DocumentTextIcon,
      to: '/health-records',
      color: 'bg-red-600',
    },
  ];

  // Quick access buttons
  const quickAccess = [
    { name: 'Pharmacies', icon: BuildingOffice2Icon, to: '/pharmacies', color: 'bg-orange-500' },
    { name: 'Emergency', icon: PhoneIcon, to: '/emergency', color: 'bg-red-500' },
    { name: 'Resources', icon: BookmarkIcon, to: '/resources', color: 'bg-blue-500' },
    { name: 'Support', icon: HeartIcon, to: '/support', color: 'bg-green-500' },
  ];

  return (
    <div className="pb-16">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-8 text-white rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2">
          Health Service Directory
        </h1>
        <p className="text-blue-100 mb-6 text-sm">
          Find healthcare services in Cameroon
        </p>
        
        {/* Search bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search for doctors, services..."
            className="w-full py-3 px-4 pr-10 rounded-full text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        
        {/* Quick stats */}
        <div className="flex justify-between text-center text-xs">
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl">500+</span>
            <span className="text-blue-200">Doctors</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl">200+</span>
            <span className="text-blue-200">Clinics</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl">50+</span>
            <span className="text-blue-200">Specialties</span>
          </div>
        </div>
      </div>
      
      {/* Floating notifications */}
      <div className="mt-4 px-4">
        <FloatingNotifications />
      </div>
      
      {/* Main features */}
      <div className="px-4 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Services</h2>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature) => (
            <Link
              key={feature.name}
              to={feature.to}
              className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`${feature.color} p-3 rounded-full text-white mb-3`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">{feature.name}</h3>
              <p className="text-gray-500 text-xs mt-1 text-center">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Quick access section */}
      <div className="px-4 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Access</h2>
        <div className="grid grid-cols-4 gap-2">
          {quickAccess.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex flex-col items-center"
            >
              <div className={`${item.color} p-3 rounded-full text-white mb-2`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-xs text-gray-700">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Top doctors section */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Top Doctors</h2>
          <Link to="/doctors" className="text-blue-600 text-sm flex items-center">
            View all <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3].map((doctor) => (
            <div key={doctor} className="bg-white p-3 rounded-xl shadow-sm flex items-center">
              <div className="w-14 h-14 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Dr. John Smith</h3>
                <p className="text-gray-500 text-xs">Cardiologist</p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid key={i} className="h-3 w-3 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(120 reviews)</span>
                </div>
              </div>
              <Link to="/doctors/1" className="bg-blue-50 text-blue-600 p-2 rounded-full">
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Health tips section */}
      <div className="px-4 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Health Tips</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-2">Stay Hydrated</h3>
          <p className="text-gray-600 text-sm mb-3">
            Drink at least 8 glasses of water daily to maintain good health and boost your immune system.
          </p>
          <Link to="/resources" className="text-blue-600 text-sm font-medium flex items-center">
            More tips <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
