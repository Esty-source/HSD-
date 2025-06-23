import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  PhoneIcon,
  VideoCameraIcon,
  FunnelIcon,
  XMarkIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const FindDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    availability: 'all',
    rating: 'all',
    consultationType: 'all',
  });

  // Mock data for specialties
  const specialties = [
    'All Specialties',
    'General Medicine',
    'Pediatrics',
    'Obstetrics & Gynecology',
    'Dermatology',
    'Cardiology',
    'Dentistry',
    'Ophthalmology',
    'Orthopedics',
    'Traditional Medicine',
  ];

  // Mock data for doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Mbah",
      specialty: "General Medicine",
      rating: 4.9,
      reviews: 128,
      experience: "15 years",
      location: "Central Hospital, Yaoundé",
      availability: "Mon-Fri, 9AM-5PM",
      languages: ["English", "French", "Pidgin"],
      consultationTypes: ["In-person", "Telemedicine"],
      image: "/images/doctors/portrait-happy-african-american-woman-surgeon-standing-operating-room-ready-work-patient-female-medical-worker-surgical-uniform-operation-theater.jpg"
    },
    {
      id: 2,
      name: "Dr. Emmanuel Nkeng",
      specialty: "Cardiology",
      rating: 4.8,
      reviews: 95,
      experience: "12 years",
      location: "Laquintinie Hospital, Douala",
      availability: "Mon-Sat, 8AM-4PM",
      languages: ["English", "French", "Duala"],
      consultationTypes: ["In-person", "Telemedicine"],
      image: "/images/doctors/african-american-doctor-man-standing-corridor-hospital.jpg"
    },
    {
      id: 3,
      name: "Dr. Marie Tchokouani",
      specialty: "Pediatrics",
      rating: 4.9,
      reviews: 156,
      experience: "10 years",
      location: "Bamenda Regional Hospital",
      availability: "Mon-Fri, 8AM-6PM",
      languages: ["English", "French", "Pidgin"],
      consultationTypes: ["In-person", "Telemedicine"],
      image: "/images/doctors/front-view-black-nurses-work.jpg"
    },
    {
      id: 4,
      name: "Dr. Pierre Ndifor",
      specialty: "Traditional Medicine",
      rating: 4.7,
      reviews: 82,
      experience: "20 years",
      location: "Traditional Healing Center, Bafoussam",
      availability: "Mon-Sat, 7AM-7PM",
      languages: ["French", "Bamileke", "Pidgin"],
      consultationTypes: ["In-person"],
      image: "/images/doctors/cheerful-ethnic-doctor-with-arms-crossed.jpg"
    },
    {
      id: 5,
      name: "Dr. Aisha Bello",
      specialty: "Obstetrics & Gynecology",
      rating: 4.9,
      reviews: 112,
      experience: "8 years",
      location: "Garoua Regional Hospital",
      availability: "Mon-Fri, 8AM-5PM",
      languages: ["French", "Fulfulde", "English"],
      consultationTypes: ["In-person", "Telemedicine"],
      image: "/images/doctors/portrait-african-american-man-working-hospital-ward-desk.jpg"
    },
    {
      id: 6,
      name: "Dr. Jean Kamga",
      specialty: "Orthopedics",
      rating: 4.8,
      reviews: 94,
      experience: "14 years",
      location: "Buea Regional Hospital",
      availability: "Mon-Sat, 9AM-4PM",
      languages: ["English", "French", "Pidgin"],
      consultationTypes: ["In-person", "Telemedicine"],
      image: "/images/doctors/front-view-smiley-man-wearing-lab-coat.jpg"
    }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      availability: 'all',
      rating: 'all',
      consultationType: 'all',
    });
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialty === selectedSpecialty;
    const matchesLocation = filters.location === '' || doctor.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesConsultationType = filters.consultationType === 'all' || doctor.consultationTypes.includes(filters.consultationType);
    const matchesRating = filters.rating === 'all' || doctor.rating >= parseInt(filters.rating);

    return matchesSearch && matchesSpecialty && matchesLocation && matchesConsultationType && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 pt-24">
      <div className="w-screen max-w-[100vw] mx-0 px-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Find Healthcare Professionals in Cameroon
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              Connect with qualified doctors and traditional healers across Cameroon
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name or specialty..."
                    className="w-full pl-10 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="w-full md:w-64 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty === 'All Specialties' ? '' : specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FunnelIcon className="h-5 w-5 mr-2" />
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Enter location..."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <select
                    name="rating"
                    value={filters.rating}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="all">All Ratings</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Consultation Type</label>
                  <select
                    name="consultationType"
                    value={filters.consultationType}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="In-person">In-person</option>
                    <option value="Video">Video</option>
                    <option value="Phone">Phone</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <XMarkIcon className="h-5 w-5 mr-2 text-gray-400" />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Doctors List Section */}
          <div className="w-full mx-0 px-0 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-0 px-4">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-56 object-cover rounded-t-xl" onError={e => { e.target.onerror = null; e.target.src = '/images/doctors/african-american-doctor-man-standing-corridor-hospital.jpg'; }} />
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800 border border-blue-200 shadow-sm">
                          {doctor.specialty}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-xl text-xs font-medium bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-200 shadow-sm">
                          <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
                          {doctor.rating}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{doctor.location}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {doctor.languages.map((lang, idx) => (
                          <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-medium bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 shadow-sm">
                            {lang}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {doctor.consultationTypes.map((type, idx) => (
                          <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-medium bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border border-purple-200 shadow-sm">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        className="w-full flex justify-center items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-base shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
                      >
                        <CalendarIcon className="h-5 w-5 mr-1" />
                        Book Appointment
                      </button>
                      <button
                        className="w-full flex justify-center items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-base shadow-md hover:from-green-600 hover:to-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
                      >
                        <PhoneIcon className="h-5 w-5 mr-1" />
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No doctors found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindDoctors; 