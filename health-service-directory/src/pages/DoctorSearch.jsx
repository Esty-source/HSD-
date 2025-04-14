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
  'Sanlam Cameroon',
  'Activa Assurance',
  'Saham Assurance',
  'Beneficial General Insurance'
];

const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Ngono Marie',
    specialty: 'General Medicine',
    rating: 4.8,
    reviews: 128,
    image: 'https://img.freepik.com/premium-photo/portrait-african-american-female-doctor-wearing-white-coat-stethoscope_219728-5645.jpg',
    distance: '0.8',
    nextAvailable: '2024-02-10T09:00:00',
    education: 'Faculty of Medicine and Biomedical Sciences, University of Yaoundé I',
    experience: '15 years',
    languages: ['English', 'French', 'Ewondo'],
    insurance: ['CNPS', 'BEAC Health Insurance', 'Sanlam Cameroon'],
    location: 'Yaoundé General Hospital',
    address: 'Rue 1.814, Yaoundé',
  },
  {
    id: 2,
    name: 'Dr. Fon Peter',
    specialty: 'Cardiology',
    rating: 4.9,
    reviews: 256,
    image: 'https://img.freepik.com/premium-photo/portrait-confident-african-american-male-doctor-medical-office_625516-1474.jpg',
    distance: '1.2',
    nextAvailable: '2024-02-11T14:30:00',
    education: 'Faculty of Health Sciences, University of Buea',
    experience: '20 years',
    languages: ['English', 'French', 'Bamileke'],
    insurance: ['Activa Assurance', 'Saham Assurance', 'CNPS'],
    location: 'Laquintinie Hospital',
    address: 'Boulevard de la Liberté, Douala',
  },
  {
    id: 3,
    name: 'Dr. Biya Rose',
    specialty: 'Pediatrics',
    rating: 4.7,
    reviews: 189,
    image: 'https://img.freepik.com/premium-photo/portrait-african-female-doctor-wearing-white-coat-stethoscope_219728-5641.jpg',
    distance: '2.0',
    nextAvailable: '2024-02-10T11:15:00',
    education: 'Faculty of Medicine and Pharmaceutical Sciences, University of Douala',
    experience: '12 years',
    languages: ['French', 'English', 'Fulfulde'],
    insurance: ['CNPS', 'Beneficial General Insurance', 'Sanlam Cameroon'],
    location: 'Mother and Child Hospital',
    address: 'Avenue de l\'Indépendance, Yaoundé',
  },
  {
    id: 4,
    name: 'Dr. Nkeng John',
    specialty: 'Surgery',
    rating: 4.9,
    reviews: 215,
    image: 'https://img.freepik.com/premium-photo/portrait-african-male-doctor-wearing-white-coat-stethoscope_219728-5638.jpg',
    distance: '1.5',
    nextAvailable: '2024-02-12T10:00:00',
    education: 'Faculty of Medicine and Biomedical Sciences, University of Yaoundé I',
    experience: '18 years',
    languages: ['English', 'French', 'Duala'],
    insurance: ['BEAC Health Insurance', 'Activa Assurance', 'CNPS'],
    location: 'Central Hospital Yaoundé',
    address: 'Rue de l\'Hôpital, Yaoundé',
  },
  {
    id: 5,
    name: 'Dr. Tchamba Paul',
    specialty: 'Internal Medicine',
    rating: 4.8,
    reviews: 178,
    image: 'https://img.freepik.com/premium-photo/portrait-african-male-doctor-wearing-white-coat-stethoscope_219728-5639.jpg',
    distance: '2.5',
    nextAvailable: '2024-02-13T13:45:00',
    education: 'Faculty of Health Sciences, University of Bamenda',
    experience: '16 years',
    languages: ['French', 'English', 'Bamun'],
    insurance: ['Saham Assurance', 'CNPS', 'Beneficial General Insurance'],
    location: 'Regional Hospital Bamenda',
    address: 'Hospital Road, Bamenda',
  },
  {
    id: 6,
    name: 'Dr. Eyenga Sarah',
    specialty: 'Obstetrics & Gynecology',
    rating: 4.9,
    reviews: 234,
    image: 'https://img.freepik.com/premium-photo/portrait-african-female-doctor-wearing-white-coat-stethoscope_219728-5642.jpg',
    distance: '1.8',
    nextAvailable: '2024-02-14T09:30:00',
    education: 'Faculty of Medicine and Biomedical Sciences, University of Yaoundé I',
    experience: '22 years',
    languages: ['French', 'English', 'Beti'],
    insurance: ['CNPS', 'Sanlam Cameroon', 'BEAC Health Insurance'],
    location: 'Gyneco-Obstetric Hospital',
    address: 'Ngousso, Yaoundé',
  },
  {
    id: 7,
    name: 'Dr. Mbarga Antoine',
    specialty: 'Infectious Diseases',
    rating: 4.7,
    reviews: 156,
    image: 'https://img.freepik.com/premium-photo/portrait-african-male-doctor-wearing-white-coat-stethoscope_219728-5640.jpg',
    distance: '1.3',
    nextAvailable: '2024-02-15T15:00:00',
    education: 'Faculty of Medicine and Pharmaceutical Sciences, University of Douala',
    experience: '14 years',
    languages: ['French', 'English', 'Bafia'],
    insurance: ['Activa Assurance', 'CNPS', 'Saham Assurance'],
    location: 'Jamot Hospital',
    address: 'Rue de la Santé, Yaoundé',
  },
  {
    id: 8,
    name: 'Dr. Ndo Michel',
    specialty: 'Tropical Medicine',
    rating: 4.8,
    reviews: 198,
    image: 'https://img.freepik.com/premium-photo/portrait-african-male-doctor-wearing-white-coat-stethoscope_219728-5637.jpg',
    distance: '2.1',
    nextAvailable: '2024-02-16T10:30:00',
    education: 'Faculty of Health Sciences, University of Buea',
    experience: '17 years',
    languages: ['English', 'French', 'Bakweri'],
    insurance: ['CNPS', 'Beneficial General Insurance', 'BEAC Health Insurance'],
    location: 'Regional Hospital Buea',
    address: 'Hospital Hill, Buea',
  },
  {
    id: 9,
    name: 'Dr. Kouam Grace',
    specialty: 'Family Medicine',
    rating: 4.9,
    reviews: 245,
    image: 'https://img.freepik.com/premium-photo/portrait-african-female-doctor-wearing-white-coat-stethoscope_219728-5643.jpg',
    distance: '1.6',
    nextAvailable: '2024-02-17T11:45:00',
    education: 'Faculty of Medicine and Biomedical Sciences, University of Yaoundé I',
    experience: '19 years',
    languages: ['French', 'English', 'Bamileke'],
    insurance: ['Sanlam Cameroon', 'CNPS', 'Activa Assurance'],
    location: 'District Hospital Biyem-Assi',
    address: 'Biyem-Assi, Yaoundé',
  },
  {
    id: 10,
    name: 'Dr. Samba Pierre',
    specialty: 'General Medicine',
    rating: 4.7,
    reviews: 167,
    image: 'https://img.freepik.com/premium-photo/portrait-african-male-doctor-wearing-white-coat-stethoscope_219728-5636.jpg',
    distance: '2.3',
    nextAvailable: '2024-02-18T14:15:00',
    education: 'Faculty of Health Sciences, University of Bamenda',
    experience: '21 years',
    languages: ['English', 'French', 'Hausa'],
    insurance: ['BEAC Health Insurance', 'CNPS', 'Saham Assurance'],
    location: 'District Hospital Cite Verte',
    address: 'Cité Verte, Yaoundé',
  },
  {
    id: 11,
    name: 'Dr. Fokam Jeanne',
    specialty: 'Pediatrics',
    rating: 4.8,
    reviews: 189,
    image: 'https://img.freepik.com/premium-photo/portrait-african-female-doctor-wearing-white-coat-stethoscope_219728-5644.jpg',
    distance: '1.9',
    nextAvailable: '2024-02-19T09:45:00',
    education: 'Faculty of Medicine and Pharmaceutical Sciences, University of Douala',
    experience: '15 years',
    languages: ['French', 'English', 'Douala'],
    insurance: ['CNPS', 'Beneficial General Insurance', 'Sanlam Cameroon'],
    location: 'Mother and Child Hospital',
    address: 'Bonanjo, Douala',
  },
  {
    id: 12,
    name: 'Dr. Tamba Robert',
    specialty: 'Surgery',
    rating: 4.9,
    reviews: 212,
    image: 'https://img.freepik.com/premium-photo/portrait-african-male-doctor-wearing-white-coat-stethoscope_219728-5635.jpg',
    distance: '2.4',
    nextAvailable: '2024-02-20T13:30:00',
    education: 'Faculty of Medicine and Biomedical Sciences, University of Yaoundé I',
    experience: '18 years',
    languages: ['French', 'English', 'Ewondo'],
    insurance: ['CNPS', 'Activa Assurance', 'BEAC Health Insurance'],
    location: 'General Hospital Douala',
    address: 'Boulevard de la République, Douala',
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
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Search Section */}
      <div className="w-full bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Find a Doctor</h1>
          <p className="mt-2 text-sm text-gray-700">
            Search for healthcare providers in your area
          </p>
        </div>
      </div>

      {/* Search Header */}
      <div className="sticky top-16 z-10 bg-white/80 px-4 py-4 backdrop-blur-lg">
        <div className="w-full">
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
      <div className="w-full px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
