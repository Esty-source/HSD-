import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  AdjustmentsHorizontalIcon,
  ClockIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  XMarkIcon,
  FunnelIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useViewport } from '../components/responsive/ViewportProvider';
import MobileLayout from '../components/responsive/MobileLayout';

// Same data as in DoctorSearch.jsx
const specialties = [
  'All Specialties',
  'General Medicine',
  'Pediatrics',
  'Obstetrics & Gynecology',
  'Surgery',
  'Cardiology',
  'Infectious Diseases',
  'Internal Medicine',
  'Family Medicine',
  'Tropical Medicine'
];

const insurances = [
  'All Insurance',
  'CNPS',
  'BEAC Health Insurance',
  'Sanlam',
  'Activa',
  'Chanas Assurance',
  'Beneficial Life',
  'Zenithe Insurance',
  'Atlantique Assurance'
];

const locations = [
  'All Locations',
  'Yaoundé',
  'Douala',
  'Bamenda',
  'Bafoussam',
  'Garoua',
  'Maroua',
  'Limbe',
  'Kumba',
  'Buea'
];

export default function MobileDoctorSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedInsurance, setSelectedInsurance] = useState('All Insurance');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  
  // Mock data for doctors
  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
    // Simulate fetching doctors data
    const mockDoctors = [
      {
        id: 1,
        name: 'Dr. John Smith',
        specialty: 'Cardiology',
        location: 'Yaoundé',
        rating: 4.8,
        reviewCount: 124,
        availability: 'Available today',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        insurance: ['CNPS', 'Sanlam'],
        fee: 15000,
        distance: '2.3 km'
      },
      {
        id: 2,
        name: 'Dr. Sarah Johnson',
        specialty: 'Pediatrics',
        location: 'Douala',
        rating: 4.9,
        reviewCount: 98,
        availability: 'Available tomorrow',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        insurance: ['BEAC Health Insurance', 'Activa'],
        fee: 12000,
        distance: '3.5 km'
      },
      {
        id: 3,
        name: 'Dr. Michael Wong',
        specialty: 'General Medicine',
        location: 'Yaoundé',
        rating: 4.7,
        reviewCount: 156,
        availability: 'Available today',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        insurance: ['CNPS', 'Beneficial Life'],
        fee: 10000,
        distance: '1.8 km'
      },
      {
        id: 4,
        name: 'Dr. Emily Chen',
        specialty: 'Obstetrics & Gynecology',
        location: 'Bamenda',
        rating: 4.6,
        reviewCount: 87,
        availability: 'Available in 2 days',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        insurance: ['Sanlam', 'Zenithe Insurance'],
        fee: 18000,
        distance: '4.2 km'
      },
      {
        id: 5,
        name: 'Dr. Robert Taylor',
        specialty: 'Surgery',
        location: 'Douala',
        rating: 4.9,
        reviewCount: 211,
        availability: 'Available today',
        image: 'https://randomuser.me/api/portraits/men/5.jpg',
        insurance: ['CNPS', 'Activa', 'Chanas Assurance'],
        fee: 25000,
        distance: '3.0 km'
      }
    ];
    
    setDoctors(mockDoctors);
  }, []);
  
  // Filter doctors based on search criteria
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'All Locations' || doctor.location === selectedLocation;
    const matchesInsurance = selectedInsurance === 'All Insurance' || doctor.insurance.includes(selectedInsurance);
    
    return matchesSearch && matchesSpecialty && matchesLocation && matchesInsurance;
  });
  
  // Sort doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
    if (sortBy === 'fee') return a.fee - b.fee;
    return 0;
  });
  
  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <MobileLayout title="Find Doctors" showSearch={false}>
      {/* Search header */}
      <div className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search doctors, specialties..."
            className="w-full py-2.5 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-50 p-1.5 rounded-full"
            onClick={toggleFilters}
          >
            <FunnelIcon className="h-4 w-4 text-blue-600" />
          </button>
        </div>
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
            
            {/* Specialty filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
            
            {/* Location filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            {/* Insurance filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurance</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={selectedInsurance}
                onChange={(e) => setSelectedInsurance(e.target.value)}
              >
                {insurances.map(insurance => (
                  <option key={insurance} value={insurance}>{insurance}</option>
                ))}
              </select>
            </div>
            
            {/* Sort by */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1.5 rounded-full text-sm ${sortBy === 'rating' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSortBy('rating')}
                >
                  Top Rated
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm ${sortBy === 'distance' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSortBy('distance')}
                >
                  Nearest
                </button>
                <button
                  className={`px-3 py-1.5 rounded-full text-sm ${sortBy === 'fee' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSortBy('fee')}
                >
                  Lowest Fee
                </button>
              </div>
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
      
      {/* Quick filter chips */}
      <div className="px-4 py-3 overflow-x-auto flex space-x-2 no-scrollbar">
        <button 
          className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${selectedSpecialty !== 'All Specialties' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={toggleFilters}
        >
          {selectedSpecialty !== 'All Specialties' ? selectedSpecialty : 'Specialty'} {selectedSpecialty !== 'All Specialties' && <span>×</span>}
        </button>
        <button 
          className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${selectedLocation !== 'All Locations' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={toggleFilters}
        >
          {selectedLocation !== 'All Locations' ? selectedLocation : 'Location'} {selectedLocation !== 'All Locations' && <span>×</span>}
        </button>
        <button 
          className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${selectedInsurance !== 'All Insurance' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          onClick={toggleFilters}
        >
          {selectedInsurance !== 'All Insurance' ? selectedInsurance : 'Insurance'} {selectedInsurance !== 'All Insurance' && <span>×</span>}
        </button>
        <button 
          className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap bg-gray-100 text-gray-700"
          onClick={toggleFilters}
        >
          More Filters
        </button>
      </div>
      
      {/* Results count */}
      <div className="px-4 py-2 border-b">
        <p className="text-sm text-gray-600">
          {sortedDoctors.length} doctors found
        </p>
      </div>
      
      {/* Doctor list */}
      <div className="divide-y">
        {sortedDoctors.length > 0 ? (
          sortedDoctors.map(doctor => (
            <div 
              key={doctor.id} 
              className="p-4 flex"
              onClick={() => navigate(`/doctors/${doctor.id}`)}
            >
              {/* Doctor image */}
              <div className="w-20 h-20 rounded-full overflow-hidden mr-3 flex-shrink-0">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150?text=Doctor';
                  }}
                />
              </div>
              
              {/* Doctor details */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                
                {/* Rating */}
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      i < Math.floor(doctor.rating) ? (
                        <StarIconSolid key={i} className="h-3 w-3 text-yellow-400" />
                      ) : (
                        <StarIcon key={i} className="h-3 w-3 text-yellow-400" />
                      )
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    {doctor.rating} ({doctor.reviewCount})
                  </span>
                </div>
                
                {/* Location and distance */}
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <MapPinIcon className="h-3 w-3 mr-1" />
                  <span>{doctor.location} • {doctor.distance}</span>
                </div>
                
                {/* Availability */}
                <div className="flex items-center mt-1 text-xs">
                  <ClockIcon className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-600">{doctor.availability}</span>
                </div>
              </div>
              
              {/* Fee */}
              <div className="flex flex-col items-end justify-between">
                <span className="text-sm font-semibold text-gray-900">{doctor.fee.toLocaleString()} FCFA</span>
                <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                  Book
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No doctors found matching your criteria.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('All Specialties');
                setSelectedLocation('All Locations');
                setSelectedInsurance('All Insurance');
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
