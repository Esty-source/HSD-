import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  StarIcon,
  ShoppingCartIcon,
  ArrowRightIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import MobileLayout from '../components/responsive/MobileLayout';

export default function MobilePharmacies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedService, setSelectedService] = useState('All Services');
  const [openNow, setOpenNow] = useState(false);
  const [hasDelivery, setHasDelivery] = useState(false);
  
  // Mock data for pharmacies
  const pharmacies = [
    {
      id: 1,
      name: 'Pharmacie Centrale',
      address: 'Avenue Kennedy, Yaoundé',
      area: 'Yaoundé Centre',
      phone: '+237 677-123-456',
      hours: '8:00 AM - 10:00 PM',
      rating: 4.8,
      reviewCount: 124,
      services: ['Prescription', 'OTC Drugs', 'First Aid'],
      isOpen: true,
      hasDelivery: true,
      distance: '0.8 km',
      image: 'https://images.unsplash.com/photo-1586015555751-63c29b8cd2eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Pharmacie du Marché',
      address: 'Marché Central, Douala',
      area: 'Douala',
      phone: '+237 699-234-567',
      hours: '7:30 AM - 9:00 PM',
      rating: 4.5,
      reviewCount: 98,
      services: ['Prescription', 'OTC Drugs', 'Medical Supplies'],
      isOpen: true,
      hasDelivery: false,
      distance: '1.2 km',
      image: 'https://images.unsplash.com/photo-1576602975754-fe2bea4fd8ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Pharmacie de la Paix',
      address: 'Rue de la Paix, Bamenda',
      area: 'Bamenda',
      phone: '+237 677-345-678',
      hours: '8:00 AM - 8:00 PM',
      rating: 4.7,
      reviewCount: 156,
      services: ['Prescription', 'OTC Drugs', 'Vaccinations'],
      isOpen: false,
      hasDelivery: true,
      distance: '2.0 km',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      name: 'Pharmacie Moderne',
      address: 'Boulevard de la Liberté, Douala',
      area: 'Douala',
      phone: '+237 699-456-789',
      hours: '24 hours',
      rating: 4.9,
      reviewCount: 215,
      services: ['Prescription', 'OTC Drugs', 'Medical Equipment'],
      isOpen: true,
      hasDelivery: true,
      distance: '1.5 km',
      image: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 5,
      name: 'Pharmacie Saint Joseph',
      address: 'Quartier Biyem-Assi, Yaoundé',
      area: 'Yaoundé',
      phone: '+237 677-567-890',
      hours: '8:00 AM - 9:00 PM',
      rating: 4.6,
      reviewCount: 87,
      services: ['Prescription', 'OTC Drugs', 'Health Consultations'],
      isOpen: true,
      hasDelivery: false,
      distance: '2.5 km',
      image: 'https://images.unsplash.com/photo-1583339793403-3d9b001b6008?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];
  
  // Filter pharmacies based on search and filters
  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === 'All Areas' || pharmacy.area.includes(selectedArea);
    const matchesService = selectedService === 'All Services' || pharmacy.services.includes(selectedService);
    const matchesOpenNow = !openNow || pharmacy.isOpen;
    const matchesDelivery = !hasDelivery || pharmacy.hasDelivery;
    
    return matchesSearch && matchesArea && matchesService && matchesOpenNow && matchesDelivery;
  });
  
  // Areas for filter
  const areas = ['All Areas', 'Yaoundé', 'Douala', 'Bamenda', 'Bafoussam', 'Limbe'];
  
  // Services for filter
  const services = [
    'All Services', 
    'Prescription', 
    'OTC Drugs', 
    'First Aid', 
    'Medical Supplies', 
    'Vaccinations', 
    'Medical Equipment', 
    'Health Consultations'
  ];
  
  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          i < Math.floor(rating) ? (
            <StarIconSolid key={i} className="h-3 w-3 text-yellow-400" />
          ) : (
            <StarIcon key={i} className="h-3 w-3 text-yellow-400" />
          )
        ))}
      </div>
    );
  };
  
  return (
    <MobileLayout title="Pharmacies" showSearch={true}>
      {/* Search bar - already provided by MobileLayout */}
      
      {/* Quick filter chips */}
      <div className="px-4 py-3 overflow-x-auto flex space-x-2 no-scrollbar">
        <button 
          className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${openNow ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setOpenNow(!openNow)}
        >
          Open Now {openNow && <span className="ml-1">×</span>}
        </button>
        <button 
          className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${hasDelivery ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => setHasDelivery(!hasDelivery)}
        >
          Delivery {hasDelivery && <span className="ml-1">×</span>}
        </button>
        <button 
          className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${selectedArea !== 'All Areas' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={toggleFilters}
        >
          {selectedArea !== 'All Areas' ? selectedArea : 'Area'} {selectedArea !== 'All Areas' && <span className="ml-1">×</span>}
        </button>
        <button 
          className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap bg-gray-100 text-gray-700"
          onClick={toggleFilters}
        >
          More Filters
        </button>
      </div>
      
      {/* Filter panel - slides up from bottom when active */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={toggleFilters} className="p-1">
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            {/* Area filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
            
            {/* Service filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            
            {/* Open Now checkbox */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={openNow}
                  onChange={() => setOpenNow(!openNow)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Open Now</span>
              </label>
            </div>
            
            {/* Delivery checkbox */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={hasDelivery}
                  onChange={() => setHasDelivery(!hasDelivery)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Offers Delivery</span>
              </label>
            </div>
            
            {/* Apply button */}
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
              onClick={toggleFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Results count */}
      <div className="px-4 py-2 border-b">
        <p className="text-sm text-gray-600">
          {filteredPharmacies.length} pharmacies found
        </p>
      </div>
      
      {/* Pharmacy list */}
      <div className="divide-y">
        {filteredPharmacies.length > 0 ? (
          filteredPharmacies.map(pharmacy => (
            <div 
              key={pharmacy.id} 
              className="p-4"
            >
              <div className="flex">
                {/* Pharmacy image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img 
                    src={pharmacy.image} 
                    alt={pharmacy.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/80?text=Pharmacy';
                    }}
                  />
                </div>
                
                {/* Pharmacy details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{pharmacy.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mt-1">
                    {renderStars(pharmacy.rating)}
                    <span className="text-xs text-gray-500 ml-1">
                      {pharmacy.rating} ({pharmacy.reviewCount})
                    </span>
                  </div>
                  
                  {/* Address and distance */}
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    <span>{pharmacy.address} • {pharmacy.distance}</span>
                  </div>
                  
                  {/* Hours */}
                  <div className="flex items-center mt-1 text-xs">
                    <ClockIcon className="h-3 w-3 mr-1 text-gray-500" />
                    <span className={pharmacy.isOpen ? 'text-green-600' : 'text-red-600'}>
                      {pharmacy.isOpen ? 'Open' : 'Closed'} • {pharmacy.hours}
                    </span>
                  </div>
                  
                  {/* Services */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pharmacy.services.slice(0, 2).map(service => (
                      <span key={service} className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                        {service}
                      </span>
                    ))}
                    {pharmacy.services.length > 2 && (
                      <span className="inline-block px-2 py-0.5 bg-gray-50 text-gray-700 text-xs rounded-full">
                        +{pharmacy.services.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="mt-3 flex space-x-2">
                <a 
                  href={`tel:${pharmacy.phone}`}
                  className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg flex items-center justify-center"
                >
                  <PhoneIcon className="h-4 w-4 mr-1" />
                  Call
                </a>
                
                <Link
                  to={`/pharmacies/${pharmacy.id}`}
                  className="flex-1 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg flex items-center justify-center"
                >
                  <ArrowRightIcon className="h-4 w-4 mr-1" />
                  Details
                </Link>
                
                {pharmacy.hasDelivery && (
                  <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg flex items-center justify-center">
                    <ShoppingCartIcon className="h-4 w-4 mr-1" />
                    Order
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No pharmacies found matching your criteria.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => {
                setSearchTerm('');
                setSelectedArea('All Areas');
                setSelectedService('All Services');
                setOpenNow(false);
                setHasDelivery(false);
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </MobileLayout>
  );
}
