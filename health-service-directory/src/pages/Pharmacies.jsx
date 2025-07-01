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
  XMarkIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Emergency from './Emergency';
import ConfirmationModal from '../components/ui/ConfirmationModal';

const mockPharmacies = [
  {
    id: 1,
    name: "Pharmacie Centrale",
    address: "123 Rue du Commerce, Douala",
    phone: "+237 233 123 456",
    rating: 4.8,
    reviews: 128,
    hours: "24/7",
    services: ["Prescription", "OTC", "Delivery", "Consultation"],
    image: "/images/pharmacy-default-_1_.png",
    directions: "https://maps.google.com",
    isOpen: true,
    hasDelivery: true
  },
  {
    id: 2,
    name: "Pharmacie de la Paix",
    address: "45 Avenue de la République, Yaoundé",
    phone: "+237 233 234 567",
    rating: 4.6,
    reviews: 95,
    hours: "Mon-Sat: 8AM-8PM",
    services: ["Prescription", "OTC", "Consultation"],
    image: "/images/pharmacy-default-_2_.png",
    directions: "https://maps.google.com",
    isOpen: true,
    hasDelivery: false
  },
  {
    id: 3,
    name: "Pharmacie du Marché",
    address: "78 Boulevard de l'Indépendance, Bamenda",
    phone: "+237 233 345 678",
    rating: 4.5,
    reviews: 82,
    hours: "Mon-Sun: 7AM-9PM",
    services: ["Prescription", "OTC", "Delivery"],
    image: "/images/pharmacy-default-_1_.png",
    directions: "https://maps.google.com",
    isOpen: true,
    hasDelivery: true
  },
  {
    id: 4,
    name: "Pharmacie Saint-Joseph",
    address: "12 Rue des Hôpitaux, Kribi",
    phone: "+237 233 456 789",
    rating: 4.7,
    reviews: 64,
    hours: "24/7",
    services: ["Prescription", "OTC", "Delivery", "Consultation"],
    image: "/images/pharmacy-default-_2_.png",
    directions: "https://maps.google.com",
    isOpen: true,
    hasDelivery: true
  },
  {
    id: 5,
    name: "Pharmacie de la Gare",
    address: "34 Avenue de la Gare, Bafoussam",
    phone: "+237 233 567 890",
    rating: 4.4,
    reviews: 56,
    hours: "Mon-Sat: 8AM-7PM",
    services: ["Prescription", "OTC"],
    image: "/images/pharmacy-default-_1_.png",
    directions: "https://maps.google.com",
    isOpen: true,
    hasDelivery: false
  },
  {
    id: 6,
    name: "Pharmacie du Quartier",
    address: "56 Rue Principale, Garoua",
    phone: "+237 233 678 901",
    rating: 4.3,
    reviews: 48,
    hours: "Mon-Sun: 7AM-8PM",
    services: ["Prescription", "OTC", "Delivery"],
    image: "/images/pharmacy-default-_2_.png",
    directions: "https://maps.google.com",
    isOpen: true,
    hasDelivery: true
  }
];

const filters = [
  { name: '24/7 Service', value: '24-7', icon: ClockIcon, color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Drive-thru Available', value: 'drive-thru', icon: TruckIcon, color: 'bg-green-100 text-green-800' },
  { name: 'Vaccination Services', value: 'vaccination', icon: ShieldCheckIcon, color: 'bg-blue-100 text-blue-800' },
  { name: 'Health Screening', value: 'screening', icon: HeartIcon, color: 'bg-pink-100 text-pink-800' },
  { name: 'Delivery Available', value: 'delivery', icon: TruckIcon, color: 'bg-purple-100 text-purple-800' }
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

const Pharmacies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [pharmacies, setPharmacies] = useState(mockPharmacies);

  const handleFilterToggle = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter.value)
        ? prev.filter(f => f !== filter.value)
        : [...prev, filter.value]
    );
  };

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.every(filter => {
        switch(filter) {
          case '24-7':
            return pharmacy.hours.includes('24 hours');
          case 'drive-thru':
            return pharmacy.services.includes('Drive-thru');
          case 'vaccination':
            return pharmacy.services.includes('Vaccination');
          case 'screening':
            return pharmacy.services.includes('Health Screening');
          case 'delivery':
            return pharmacy.hasDelivery;
          default:
            return true;
        }
      });
    return matchesSearch && matchesFilters;
  });

  const handleEmergencyClick = () => {
    setShowEmergencyModal(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pharmacies by name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filter Tags */}
          {selectedFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedFilters.map(filterValue => {
                const filter = filters.find(f => f.value === filterValue);
                return (
                  <button
                    key={filterValue}
                    onClick={() => handleFilterToggle(filter)}
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium ${filter.color} hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5`}
                  >
                    {filter.name}
                    <XMarkIcon className="h-4 w-4 ml-2" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white/70 border border-gray-200 rounded-xl backdrop-blur-sm">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handleFilterToggle(filter)}
                    className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedFilters.includes(filter.value)
                        ? filter.color
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                    }`}
                  >
                    <filter.icon className="h-5 w-5 mr-2" />
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Button */}
      <button
        onClick={() => setShowEmergencyModal(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3.5 rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center z-50 hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <ExclamationTriangleIcon className="h-6 w-6 mr-2" />
        Emergency
      </button>

      {/* Pharmacy List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
              <div className="relative h-48 w-full">
                <img
                  src={pharmacy.image || "/images/pharmacy-default-_1_.png"}
                  alt={pharmacy.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl text-sm font-medium text-gray-700 flex items-center shadow-md">
                  <StarIcon className="h-4 w-4 text-yellow-400 mr-1.5" />
                  {pharmacy.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{pharmacy.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{pharmacy.address}</p>
                  </div>
                  <button
                    onClick={() => window.location.href = `tel:${pharmacy.phone}`}
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    Call
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {pharmacy.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1.5" />
                    {pharmacy.hours}
                  </div>
                  <button
                    onClick={() => window.open(pharmacy.directions, '_blank')}
                    className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Modal */}
      <ConfirmationModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        title="Emergency Services"
        message="Please select the emergency service you need:"
      >
        <div className="mt-4 space-y-3">
          <button
            onClick={() => {
              window.location.href = 'tel:112';
              setShowEmergencyModal(false);
            }}
            className="w-full flex items-center justify-center px-5 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <PhoneIcon className="h-5 w-5 mr-2" />
            Call Emergency Services (112)
          </button>
          <button
            onClick={() => {
              window.location.href = 'tel:1510';
              setShowEmergencyModal(false);
            }}
            className="w-full flex items-center justify-center px-5 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <PhoneIcon className="h-5 w-5 mr-2" />
            Call Ambulance (1510)
          </button>
          <button
            onClick={() => {
              window.location.href = 'tel:1511';
              setShowEmergencyModal(false);
            }}
            className="w-full flex items-center justify-center px-5 py-3.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <PhoneIcon className="h-5 w-5 mr-2" />
            Call Fire Department (1511)
          </button>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default Pharmacies;
