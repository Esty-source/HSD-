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
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import MobileLayout from '../components/responsive/MobileLayout';
import { Dialog } from '@headlessui/react';

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
];

export default function MobileDoctorSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedInsurance, setSelectedInsurance] = useState('All Insurance');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Use the same mock data as web
  const doctors = mockDoctors;

  // Filtering logic
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    const matchesInsurance = selectedInsurance === 'All Insurance' || doctor.insurance.includes(selectedInsurance);
    return matchesSearch && matchesSpecialty && matchesInsurance;
  });

  // Sorting logic
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
    return 0;
  });

  // Toggle filter panel
  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <MobileLayout title="Find Doctors">
      {/* Search and filter bar */}
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

      {/* Filter panel */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-end">
          <div className="bg-white rounded-t-2xl w-full p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={toggleFilters} className="p-1">
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Specialty</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2"
                value={selectedSpecialty}
                onChange={e => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Insurance</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2"
                value={selectedInsurance}
                onChange={e => setSelectedInsurance(e.target.value)}
              >
                {insurances.map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Sort By</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="rating">Rating</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Doctor list */}
      <div className="p-4 space-y-4">
        {sortedDoctors.length === 0 && (
          <div className="text-center text-gray-500 py-12">No doctors found.</div>
        )}
        {sortedDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl shadow-lg p-4 flex gap-4 items-center"
            onClick={() => setSelectedDoctor(doctor)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-xl object-cover border border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-gray-900 truncate">{doctor.name}</h3>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium ml-1">{doctor.specialty}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  i < Math.round(doctor.rating)
                    ? <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
                    : <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                ))}
                <span className="text-xs text-gray-500 ml-1">({doctor.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <MapPinIcon className="h-4 w-4" />
                <span>{doctor.location}</span>
                <span>•</span>
                <span>{doctor.distance} km</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <ClockIcon className="h-4 w-4" />
                <span>Next: {new Date(doctor.nextAvailable).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {doctor.insurance.map(ins => (
                  <span key={ins} className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium border border-green-100">{ins}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Details Modal */}
      <Dialog open={!!selectedDoctor} onClose={() => setSelectedDoctor(null)} className="fixed z-[99999] inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          {selectedDoctor && (
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto p-6 z-10">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={() => setSelectedDoctor(null)}>
                <XMarkIcon className="h-6 w-6" />
              </button>
              <div className="flex flex-col items-center">
                <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-28 h-28 rounded-xl object-cover border mb-3" />
                <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedDoctor.name}</h2>
                <span className="text-sm bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium mb-2">{selectedDoctor.specialty}</span>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    i < Math.round(selectedDoctor.rating)
                      ? <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
                      : <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({selectedDoctor.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{selectedDoctor.location}</span>
                  <span>•</span>
                  <span>{selectedDoctor.distance} km</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>Next: {new Date(selectedDoctor.nextAvailable).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedDoctor.insurance.map(ins => (
                    <span key={ins} className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium border border-green-100">{ins}</span>
                  ))}
                </div>
                <div className="w-full mt-2 text-left">
                  <div className="mb-1"><span className="font-semibold">Education:</span> {selectedDoctor.education}</div>
                  <div className="mb-1"><span className="font-semibold">Experience:</span> {selectedDoctor.experience}</div>
                  <div className="mb-1"><span className="font-semibold">Languages:</span> {selectedDoctor.languages.join(', ')}</div>
                  <div className="mb-1"><span className="font-semibold">Address:</span> {selectedDoctor.address}</div>
                </div>
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-base"
                  onClick={() => {
                    setSelectedDoctor(null);
                    navigate('/appointments');
                  }}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </MobileLayout>
  );
}
