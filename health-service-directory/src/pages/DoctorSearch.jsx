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
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const specialties = [
  'All Specialties',
  'Primary Care',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Psychiatry',
  'Orthopedics',
];

const insurances = [
  'All Insurance',
  'Blue Cross',
  'Aetna',
  'UnitedHealth',
  'Cigna',
  'Medicare',
  'Medicaid',
];

const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Primary Care',
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    distance: '0.8',
    nextAvailable: '2024-02-10T09:00:00',
    education: 'Harvard Medical School',
    experience: '15 years',
    languages: ['English', 'Spanish'],
    insurance: ['Blue Cross', 'Aetna', 'Medicare'],
    location: 'Downtown Medical Center',
    address: '123 Medical Plaza, Suite 100',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    rating: 4.9,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    distance: '1.2',
    nextAvailable: '2024-02-11T14:30:00',
    education: 'Stanford Medical School',
    experience: '20 years',
    languages: ['English', 'Mandarin'],
    insurance: ['UnitedHealth', 'Cigna', 'Medicare'],
    location: 'Heart & Vascular Institute',
    address: '456 Cardiology Way, Suite 200',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    distance: '2.0',
    nextAvailable: '2024-02-10T11:15:00',
    education: 'Johns Hopkins School of Medicine',
    experience: '12 years',
    languages: ['English', 'Spanish'],
    insurance: ['Blue Cross', 'UnitedHealth', 'Medicaid'],
    location: 'Children\'s Medical Center',
    address: '789 Pediatric Lane, Suite 300',
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Dermatology',
    rating: 4.9,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    distance: '1.5',
    nextAvailable: '2024-02-12T10:00:00',
    education: 'Yale School of Medicine',
    experience: '18 years',
    languages: ['English', 'French'],
    insurance: ['Aetna', 'Cigna', 'Medicare'],
    location: 'Advanced Dermatology Center',
    address: '321 Skin Care Blvd, Suite 400',
  },
  {
    id: 5,
    name: 'Dr. Lisa Chang',
    specialty: 'Neurology',
    rating: 4.8,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    distance: '2.5',
    nextAvailable: '2024-02-13T13:45:00',
    education: 'Columbia University Medical Center',
    experience: '16 years',
    languages: ['English', 'Mandarin', 'Cantonese'],
    insurance: ['Blue Cross', 'UnitedHealth', 'Medicare'],
    location: 'Neurological Institute',
    address: '567 Brain Health Way, Suite 500',
  },
  {
    id: 6,
    name: 'Dr. Robert Martinez',
    specialty: 'Orthopedics',
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1637059824899-a441006a6875?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    distance: '1.8',
    nextAvailable: '2024-02-14T09:30:00',
    education: 'Mayo Clinic School of Medicine',
    experience: '22 years',
    languages: ['English', 'Spanish'],
    insurance: ['Cigna', 'Aetna', 'Medicare', 'Medicaid'],
    location: 'Sports Medicine & Orthopedics',
    address: '890 Joint Health Plaza, Suite 600',
  }
];

export default function DoctorSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedInsurance, setSelectedInsurance] = useState('All Insurance');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [doctors, setDoctors] = useState(mockDoctors);

  useEffect(() => {
    let filtered = [...mockDoctors];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply specialty filter
    if (selectedSpecialty !== 'All Specialties') {
      filtered = filtered.filter((doctor) => doctor.specialty === selectedSpecialty);
    }

    // Apply insurance filter
    if (selectedInsurance !== 'All Insurance') {
      filtered = filtered.filter((doctor) => doctor.insurance.includes(selectedInsurance));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'availability':
          return new Date(a.nextAvailable) - new Date(b.nextAvailable);
        default:
          return 0;
      }
    });

    setDoctors(filtered);
  }, [searchTerm, selectedSpecialty, selectedInsurance, sortBy]);

  const handleBookAppointment = (doctor) => {
    navigate('/appointments', { state: { selectedDoctor: doctor } });
  };

  const renderRatingStars = (rating) => {
    return [...Array(5)].map((_, index) => {
      const filled = index < Math.floor(rating);
      const halfFilled = !filled && index === Math.floor(rating) && rating % 1 > 0;
      return filled ? (
        <StarIconSolid key={index} className="h-5 w-5 text-yellow-400" />
      ) : halfFilled ? (
        <StarIcon key={index} className="h-5 w-5 text-yellow-400" />
      ) : (
        <StarIcon key={index} className="h-5 w-5 text-gray-300" />
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Search Header */}
      <div className="sticky top-16 z-10 bg-white/80 px-4 py-4 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="relative rounded-full shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  placeholder="Search by name, specialty, or location..."
                />
              </div>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 transition-all duration-300 hover:bg-gray-50 hover:shadow md:w-auto"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Filters Section */}
          <div className={`mt-4 transform transition-all duration-300 ease-in-out ${showFilters ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 md:hidden'}`}>
            <div className="grid gap-4 md:grid-cols-3">
              {/* Specialty Filter */}
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>

              {/* Insurance Filter */}
              <select
                value={selectedInsurance}
                onChange={(e) => setSelectedInsurance(e.target.value)}
                className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {insurances.map((insurance) => (
                  <option key={insurance} value={insurance}>
                    {insurance}
                  </option>
                ))}
              </select>

              {/* Sort By Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest</option>
                <option value="availability">Soonest Available</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              onClick={() => navigate(`/appointments/book/${doctor.id}`)}
            >
              {/* Doctor Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                  <p className="text-sm text-gray-200">{doctor.specialty}</p>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-4">
                {/* Rating and Reviews */}
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      index < Math.floor(doctor.rating) ? (
                        <StarIconSolid key={index} className="h-4 w-4 text-yellow-400" />
                      ) : (
                        <StarIcon key={index} className="h-4 w-4 text-gray-300" />
                      )
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                  <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                </div>

                {/* Location and Distance */}
                <div className="mb-3 flex items-start gap-2 text-sm text-gray-500">
                  <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{doctor.location}</p>
                    <p>{doctor.address}</p>
                    <p className="mt-1">{doctor.distance} miles away</p>
                  </div>
                </div>

                {/* Next Available */}
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                  <ClockIcon className="h-4 w-4" />
                  <span>Next available: {new Date(doctor.nextAvailable).toLocaleDateString()}</span>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    <UserGroupIcon className="h-3 w-3" />
                    {doctor.experience}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    <ChatBubbleLeftRightIcon className="h-3 w-3" />
                    {doctor.languages.join(', ')}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                    <CurrencyDollarIcon className="h-3 w-3" />
                    {doctor.insurance.length} insurances
                  </span>
                </div>
              </div>

              {/* Book Now Button */}
              <div className="absolute bottom-0 left-0 right-0 flex transform justify-center bg-gradient-to-t from-white p-4 pt-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <button className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
