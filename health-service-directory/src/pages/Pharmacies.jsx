import React, { useState, useEffect } from 'react';
import { 
  MapPinIcon, 
  AdjustmentsHorizontalIcon, 
  ClockIcon, 
  PhoneIcon, 
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  StarIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  BeakerIcon,
  ShieldCheckIcon,
  HeartIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
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
  { name: '24/7 Service', value: '24-7', icon: ClockIcon, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Drive-thru Available', value: 'drive-thru', icon: TruckIcon, color: 'bg-green-100 text-green-800' },
  { name: 'Vaccination Services', value: 'vaccination', icon: ShieldCheckIcon, color: 'bg-blue-100 text-blue-800' },
  { name: 'Health Screening', value: 'screening', icon: HeartIcon, color: 'bg-pink-100 text-pink-800' },
  { name: 'Specialty Medications', value: 'specialty', icon: BeakerIcon, color: 'bg-purple-100 text-purple-800' },
  { name: 'Compounding', value: 'compounding', icon: BeakerIcon, color: 'bg-yellow-100 text-yellow-800' },
];

const serviceIcons = {
  'Prescription Filling': BuildingStorefrontIcon,
  'Drive-thru': TruckIcon,
  'Vaccination': ShieldCheckIcon,
  'Health Screening': HeartIcon,
  'Medical Supplies': BuildingStorefrontIcon,
  'Health Consultation': HeartIcon,
  'Specialty Medications': BeakerIcon,
  'Compounding': BeakerIcon
};

export default function Pharmacies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [showEmergency, setShowEmergency] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (value) => {
    setActiveFilters(prev => 
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

  // Filter pharmacies based on search and filters
  const filteredPharmacies = mockPharmacies.filter(pharmacy => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by active filters
    const matchesFilters = activeFilters.length === 0 || activeFilters.every(filter => {
      switch(filter) {
        case '24-7':
          return pharmacy.type.includes('24/7');
        case 'drive-thru':
          return pharmacy.services.includes('Drive-thru');
        case 'vaccination':
          return pharmacy.services.includes('Vaccination');
        case 'screening':
          return pharmacy.services.includes('Health Screening');
        case 'specialty':
          return pharmacy.services.includes('Specialty Medications');
        case 'compounding':
          return pharmacy.services.includes('Compounding');
        default:
          return true;
      }
    });
    
    return matchesSearch && matchesFilters;
  });

  // Sort pharmacies
  const sortedPharmacies = [...filteredPharmacies].sort((a, b) => {
    if (sortBy === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  // View pharmacy details
  const viewPharmacyDetails = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowModal(true);
  };

  return (
    <div className="w-full max-w-none bg-gradient-to-b from-blue-50 to-white min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 py-16 shadow-xl w-full">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay'
        }}></div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 text-center max-w-none">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">Find Nearby Pharmacies</h1>
          <p className="text-lg text-blue-100 max-w-xl mx-auto mb-8">
            Locate pharmacies in your area, check medication availability, and get directions or order online.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-full shadow-lg overflow-hidden">
              <input
                type="text"
                className="w-full py-4 pl-6 pr-12 text-gray-900 bg-white/95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-600"
                placeholder="Search by pharmacy name, address, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setMapView(!mapView)}
              className="inline-flex items-center rounded-full bg-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/30 transition-colors"
            >
              <MapPinIcon className="mr-2 h-5 w-5" />
              {mapView ? 'List View' : 'Map View'}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center rounded-full bg-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/30 transition-colors"
            >
              <AdjustmentsHorizontalIcon className="mr-2 h-5 w-5" />
              Filter Options
            </button>
            <button
              onClick={() => setShowEmergency(!showEmergency)}
              className="inline-flex items-center rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition-colors"
            >
              <ExclamationTriangleIcon className="mr-2 h-5 w-5" />
              Emergency
            </button>
          </div>
        </div>
      </div>
      
      {/* Filter Section */}
      {showFilters && (
        <div className="bg-white shadow-md rounded-lg mx-4 sm:mx-8 -mt-6 mb-8 overflow-hidden w-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Filter Pharmacies</h2>
              <button 
                onClick={() => setActiveFilters([])} 
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filters.map((filter) => {
                const FilterIcon = filter.icon;
                return (
                  <button
                    key={filter.value}
                    onClick={() => toggleFilter(filter.value)}
                    className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ${activeFilters.includes(filter.value) 
                      ? filter.color + ' ring-2 ring-offset-2 ring-blue-500' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
                  >
                    <div className={`p-2 rounded-full ${activeFilters.includes(filter.value) ? 'bg-white/50' : 'bg-white'}`}>
                      <FilterIcon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{filter.name}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <div className="flex rounded-lg overflow-hidden border border-gray-200">
                    <button 
                      onClick={() => setSortBy('distance')} 
                      className={`px-4 py-2 text-sm ${sortBy === 'distance' ? 'bg-blue-50 text-blue-700 font-medium' : 'bg-white text-gray-700'}`}
                    >
                      Nearest
                    </button>
                    <button 
                      onClick={() => setSortBy('rating')} 
                      className={`px-4 py-2 text-sm ${sortBy === 'rating' ? 'bg-blue-50 text-blue-700 font-medium' : 'bg-white text-gray-700'}`}
                    >
                      Top Rated
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-900">{sortedPharmacies.length}</span> of {mockPharmacies.length} pharmacies
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Section Modal */}
      {showEmergency && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={() => setShowEmergency(false)}></div>
            
            {/* Modal container */}
            <div className="inline-block transform overflow-hidden rounded-lg text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:align-middle">
              {/* Close button */}
              <div className="absolute right-0 top-0 z-50 block pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md bg-white/10 text-white hover:bg-white/20 focus:outline-none"
                  onClick={() => setShowEmergency(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              {/* Emergency content */}
              <div className="relative">
                <Emergency />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pharmacy List */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Pharmacies
              <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                {sortedPharmacies.length} locations
              </span>
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {activeFilters.length > 0 
                ? `Filtered by: ${activeFilters.map(f => filters.find(filter => filter.value === f)?.name).join(', ')}`
                : 'Showing all pharmacies within 5 miles of your location'}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium text-blue-600">{sortedPharmacies.filter(p => p.type === '24/7 Pharmacy').length}</span>
            <span>24/7 pharmacies available</span>
          </div>
        </div>

        {sortedPharmacies.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedPharmacies.map((pharmacy) => (
              <div key={pharmacy.id} className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={pharmacy.image}
                    alt={pharmacy.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/0" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white">{pharmacy.name}</h3>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                        Open
                      </span>
                    </div>
                    <p className="text-sm text-white/90">{pharmacy.type}</p>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid key={i} className={`h-4 w-4 ${i < Math.floor(pharmacy.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{pharmacy.rating} ({pharmacy.reviews} reviews)</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                      <span>{pharmacy.address} • <span className="font-medium text-blue-700">{pharmacy.distance}</span></span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                      <span>{pharmacy.hours}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <PhoneIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                      <span>{pharmacy.phone}</span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                      {pharmacy.services.slice(0, 3).map((service, index) => {
                        const ServiceIcon = serviceIcons[service] || BuildingStorefrontIcon;
                        return (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                          >
                            <ServiceIcon className="mr-1 h-3 w-3" />
                            {service}
                          </span>
                        );
                      })}
                      {pharmacy.services.length > 3 && (
                        <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
                          +{pharmacy.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => viewPharmacyDetails(pharmacy)}
                      className="col-span-3 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleOrderOnline(pharmacy)}
                      className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-blue-700 shadow-sm ring-1 ring-inset ring-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      Order
                    </button>
                    <button
                      onClick={() => handleGetDirections(pharmacy)}
                      className="col-span-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <MapPinIcon className="inline-block mr-1 h-4 w-4 text-gray-500" />
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-blue-100">
              <BuildingStorefrontIcon className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No pharmacies found</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              We couldn't find any pharmacies matching your search criteria. Try adjusting your filters or search term.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveFilters([]);
              }}
              className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Pharmacy Details Modal */}
      {showModal && selectedPharmacy && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)}></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={selectedPharmacy.image}
                  alt={selectedPharmacy.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/0" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 mb-2">
                    {selectedPharmacy.type}
                  </span>
                  <h2 className="text-3xl font-bold text-white">{selectedPharmacy.name}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid key={i} className={`h-5 w-5 ${i < Math.floor(selectedPharmacy.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-700">{selectedPharmacy.rating} ({selectedPharmacy.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      <ClockIcon className="mr-1.5 h-4 w-4" />
                      Open Now
                    </span>
                    <span className="text-sm text-gray-500">{selectedPharmacy.hours}</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Services</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPharmacy.services.map((service, index) => {
                          const ServiceIcon = serviceIcons[service] || BuildingStorefrontIcon;
                          return (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                            >
                              <ServiceIcon className="mr-1.5 h-4 w-4" />
                              {service}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                      <p className="text-gray-600">
                        {selectedPharmacy.name} is a {selectedPharmacy.type.toLowerCase()} located at {selectedPharmacy.address}, {selectedPharmacy.distance} from your location. 
                        We offer a wide range of pharmaceutical services including {selectedPharmacy.services.slice(0, 3).join(', ')}, and more.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Hours of Operation</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monday - Friday</span>
                          <span className="font-medium">{selectedPharmacy.type.includes('24/7') ? 'Open 24 hours' : '8:00 AM - 9:00 PM'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saturday</span>
                          <span className="font-medium">{selectedPharmacy.type.includes('24/7') ? 'Open 24 hours' : '9:00 AM - 7:00 PM'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sunday</span>
                          <span className="font-medium">{selectedPharmacy.type.includes('24/7') ? 'Open 24 hours' : '10:00 AM - 6:00 PM'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                          <span className="font-medium">Address</span>
                        </div>
                        <p className="text-gray-800 pl-6">{selectedPharmacy.address}</p>
                      </div>
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <PhoneIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                          <span className="font-medium">Phone</span>
                        </div>
                        <p className="text-gray-800 pl-6">{selectedPharmacy.phone}</p>
                      </div>
                      <div className="pt-4">
                        <button
                          onClick={() => handleGetDirections(selectedPharmacy)}
                          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                        >
                          Get Directions
                        </button>
                        <button
                          onClick={() => handleOrderOnline(selectedPharmacy)}
                          className="w-full mt-3 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-inset ring-blue-200 hover:bg-blue-50 transition-colors"
                        >
                          Order Online
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
