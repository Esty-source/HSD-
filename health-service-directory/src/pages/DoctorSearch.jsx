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
import { useViewport } from '../components/responsive/ViewportProvider';
import MobileDoctorSearch from './MobileDoctorSearch';

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
    image: '/images/doctors/front-view-black-nurses-work.jpg',
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
    image: '/images/doctors/african-american-black-doctor-man-with-stethoscope-isolated-white-background.jpg',
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
    image: '/images/doctors/portrait-happy-african-american-woman-surgeon-standing-operating-room-ready-work-patient-female-medical-worker-surgical-uniform-operation-theater.jpg',
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
    image: '/images/doctors/front-view-smiley-man-wearing-lab-coat.jpg',
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
    image: '/images/doctors/portrait-african-american-man-working-hospital-ward-desk.jpg',
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
    image: '/images/doctors/cheerful-ethnic-doctor-with-arms-crossed.jpg',
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
    image: '/images/doctors/african-american-doctor-man-standing-corridor-hospital.jpg',
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
    image: '/images/doctors/surgeon-holding-stethoscope_13339-295616.jpg',
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
    image: '/images/doctors/africa-humanitarian-aid-doctor-getting-ready-work.jpg',
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
    image: '/images/doctors/male-nurse-working-clinic.jpg',
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
    image: '/images/doctors/group-african-doctors-students-near-medical-university-outdoor.jpg',
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
    image: '/images/doctors/group-african-medical-students-posed-outdoor-against-university-door.jpg',
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
  // Use viewport hook to determine if we're on mobile
  const { isMobile } = useViewport();
  
  // If on mobile, render the mobile-optimized version
  if (isMobile) {
    return <MobileDoctorSearch />;
  }
  
  // Desktop version continues below
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
    // Format the doctor data to match what the Appointments page expects
    const formattedDoctor = {
      id: doctor.id,
      name: doctor.name,
      specialty: doctor.specialty,
      location: doctor.location,
      image: doctor.image
    };
    
    // Navigate to appointments page with the doctor information
    navigate('/appointments', { state: { doctor: formattedDoctor } });
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
    <div className="w-screen max-w-[100vw] min-h-screen bg-gradient-to-b from-blue-50 to-white mx-0 px-0">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white w-screen max-w-[100vw] mt-8 mx-0 px-0">
        <div className="w-full py-12 sm:py-16 max-w-[100vw] mx-0 px-0">
          <div className="flex flex-col items-center text-center w-full mx-0 px-0">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Find a Doctor
            </h1>
            <p className="mt-2 text-blue-100 max-w-2xl">
              Connect with trusted healthcare professionals for your medical needs
            </p>
          
            {/* Search Bar in Hero Section */}
            <div className="mt-8 w-full max-w-2xl mx-auto">
              <div className="relative rounded-full shadow-lg overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full border-0 py-4 pl-12 pr-4 bg-white/90 backdrop-blur-sm text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-white/50 sm:text-sm"
                  placeholder="Search by name, specialty, or location..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="w-screen max-w-[100vw] py-6 mx-0 px-0">
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full mx-0 px-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full mx-0 px-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${showFilters ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{doctors.length}</span> doctors
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                <button
                  onClick={() => setSortBy('rating')}
                  className={`px-3 py-1.5 text-sm font-medium ${sortBy === 'rating' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Top Rated
                </button>
                <button
                  onClick={() => setSortBy('distance')}
                  className={`px-3 py-1.5 text-sm font-medium ${sortBy === 'distance' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Nearest
                </button>
                <button
                  onClick={() => setSortBy('availability')}
                  className={`px-3 py-1.5 text-sm font-medium ${sortBy === 'availability' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Soonest Available
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters Section */}
          <div className={`transform transition-all duration-300 ease-in-out overflow-hidden ${showFilters ? 'max-h-96 border-t border-gray-200' : 'max-h-0'}`}>
            <div className="p-4 sm:p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Specialty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <div className="relative">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Insurance Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                <div className="relative">
                  <select
                    value={selectedInsurance}
                    onChange={(e) => setSelectedInsurance(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {insurances.map((insurance) => (
                      <option key={insurance} value={insurance}>
                        {insurance}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Additional Filter Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">
                    Today
                  </button>
                  <button className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200">
                    Tomorrow
                  </button>
                  <button className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200">
                    This Week
                  </button>
                  <button className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200">
                    Next Week
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="w-screen max-w-[100vw] py-8 mx-0 px-0">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full mx-0 px-0">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              onClick={() => handleBookAppointment(doctor)}
            >
              {/* Doctor Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-full w-full transform object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: 'center top' }}
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
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent onClick
                    handleBookAppointment(doctor);
                  }}
                  className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700"
                >
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
