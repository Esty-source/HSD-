import React, { useState } from 'react';
import { MapPinIcon, AdjustmentsHorizontalIcon, ClockIcon, PhoneIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Emergency from './Emergency';

const mockPharmacies = [
  {
    id: 1,
    name: 'HealthCare Pharmacy',
    type: '24/7 Pharmacy',
    rating: 4.8,
    reviews: 156,
    address: '123 Medical Center Blvd',
    distance: '0.5 miles',
    hours: 'Open 24 hours',
    phone: '(555) 123-4567',
    services: ['Prescription Filling', 'Drive-thru', 'Vaccination', 'Health Screening'],
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 2,
    name: 'Community Drugstore',
    type: 'Retail Pharmacy',
    rating: 4.6,
    reviews: 89,
    address: '456 Health Street',
    distance: '0.8 miles',
    hours: '8:00 AM - 9:00 PM',
    phone: '(555) 234-5678',
    services: ['Prescription Filling', 'Health Consultation', 'Medical Supplies'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 3,
    name: 'MediCare Plus',
    type: '24/7 Pharmacy',
    rating: 4.9,
    reviews: 203,
    address: '789 Wellness Ave',
    distance: '1.2 miles',
    hours: 'Open 24 hours',
    phone: '(555) 345-6789',
    services: ['Prescription Filling', 'Drive-thru', 'Vaccination', 'Health Screening', 'Compounding'],
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 4,
    name: 'Family Care Pharmacy',
    type: 'Retail Pharmacy',
    rating: 4.7,
    reviews: 167,
    address: '321 Family Plaza',
    distance: '1.5 miles',
    hours: '8:00 AM - 10:00 PM',
    phone: '(555) 456-7890',
    services: ['Prescription Filling', 'Vaccination', 'Medical Supplies', 'Health Consultation'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 5,
    name: 'Wellness Pharmacy',
    type: 'Specialty Pharmacy',
    rating: 4.8,
    reviews: 142,
    address: '567 Wellness Drive',
    distance: '1.8 miles',
    hours: '9:00 AM - 8:00 PM',
    phone: '(555) 567-8901',
    services: ['Specialty Medications', 'Prescription Filling', 'Health Consultation', 'Compounding'],
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 6,
    name: 'City Health Pharmacy',
    type: 'Retail Pharmacy',
    rating: 4.5,
    reviews: 98,
    address: '890 Downtown Street',
    distance: '2.0 miles',
    hours: '8:30 AM - 9:00 PM',
    phone: '(555) 678-9012',
    services: ['Prescription Filling', 'Medical Supplies', 'Health Screening'],
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 7,
    name: 'Express Care Pharmacy',
    type: '24/7 Pharmacy',
    rating: 4.7,
    reviews: 178,
    address: '432 Express Way',
    distance: '2.3 miles',
    hours: 'Open 24 hours',
    phone: '(555) 789-0123',
    services: ['Prescription Filling', 'Drive-thru', 'Vaccination', 'Medical Supplies'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 8,
    name: 'Metro Pharmacy Plus',
    type: 'Specialty Pharmacy',
    rating: 4.9,
    reviews: 215,
    address: '765 Metro Center',
    distance: '2.5 miles',
    hours: '9:00 AM - 7:00 PM',
    phone: '(555) 890-1234',
    services: ['Specialty Medications', 'Prescription Filling', 'Compounding', 'Health Consultation'],
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  }
];

const filters = [
  { name: '24/7 Service', value: '24-7' },
  { name: 'Drive-thru Available', value: 'drive-thru' },
  { name: 'Vaccination Services', value: 'vaccination' },
  { name: 'Health Screening', value: 'screening' },
];

export default function Pharmacies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  const toggleFilter = (value) => {
    setSelectedFilters(prev => 
      prev.includes(value)
        ? prev.filter(f => f !== value)
        : [...prev, value]
    );
  };

  const handleOrderOnline = (pharmacy) => {
    window.open(`https://maps.google.com/maps?q=${encodeURIComponent(pharmacy.name + ' ' + pharmacy.address)}`, '_blank');
  };

  const handleGetDirections = (pharmacy) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pharmacy.address)}`, '_blank');
  };

  return (
    <div className="w-full max-w-none">
      <div className="w-full bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pharmacies</h1>
          <p className="mt-2 text-sm text-gray-700">
            Find pharmacies near you and check medication availability
          </p>
        </div>
      </div>
      {/* Search Header */}
      <div className="bg-white shadow">
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-md border-0 py-3 pl-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                  placeholder="Search pharmacies by name or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MapPinIcon className="absolute right-4 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <AdjustmentsHorizontalIcon className="mr-2 h-5 w-5" />
                Filters
              </button>
              <button
                onClick={() => setShowEmergency(!showEmergency)}
                className="inline-flex items-center rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition duration-150 ease-in-out"
              >
                <ExclamationTriangleIcon className="mr-2 h-5 w-5" />
                Emergency
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => toggleFilter(filter.value)}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      selectedFilters.includes(filter.value)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Section */}
      {showEmergency && (
        <div className="border-b border-gray-200">
          <Emergency />
        </div>
      )}

      {/* Pharmacy List */}
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Available Pharmacies
              <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                {mockPharmacies.length} locations
              </span>
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Showing all pharmacies within 5 miles of your location
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium text-blue-600">{mockPharmacies.filter(p => p.type === '24/7 Pharmacy').length}</span>
            <span>24/7 pharmacies available</span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mockPharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="overflow-hidden rounded-lg bg-white shadow">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={pharmacy.image}
                  alt={pharmacy.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{pharmacy.name}</h3>
                    <p className="text-sm text-gray-500">{pharmacy.type}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Open
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span>{pharmacy.address} • {pharmacy.distance}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span>{pharmacy.hours}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <PhoneIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span>{pharmacy.phone}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {pharmacy.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => handleOrderOnline(pharmacy)}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Order Online
                  </button>
                  <button
                    onClick={() => handleGetDirections(pharmacy)}
                    className="flex-1 rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
