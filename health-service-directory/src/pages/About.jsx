import React from 'react';
import {
  UserGroupIcon,
  HeartIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ClockIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Patient-Centered Care',
    description: 'Our platform prioritizes your health needs with personalized care solutions and easy access to medical professionals.',
    icon: HeartIcon,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    name: 'Secure & Private',
    description: 'Your health information is protected with state-of-the-art security measures and full HIPAA compliance.',
    icon: ShieldCheckIcon,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Available 24/7',
    description: 'Access healthcare services, book appointments, and view your records anytime, anywhere.',
    icon: ClockIcon,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'Nationwide Network',
    description: 'Connect with thousands of healthcare providers and pharmacies across the country.',
    icon: GlobeAltIcon,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Expert Team',
    description: 'Our platform is supported by experienced healthcare professionals and technical experts.',
    icon: UserGroupIcon,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    name: 'Partner Facilities',
    description: 'We collaborate with leading hospitals and clinics to provide comprehensive healthcare services.',
    icon: BuildingOfficeIcon,
    color: 'bg-indigo-100 text-indigo-600',
  },
];

const stats = [
  { label: 'Active Users', value: '50k+', color: 'from-blue-400 to-blue-600' },
  { label: 'Healthcare Providers', value: '1000+', color: 'from-purple-400 to-purple-600' },
  { label: 'Partner Pharmacies', value: '2500+', color: 'from-green-400 to-green-600' },
  { label: 'Patient Satisfaction', value: '98%', color: 'from-pink-400 to-pink-600' },
];

const team = [
  {
    name: 'Dr. Ngono Marie',
    role: 'Chief Medical Officer',
    image: 'https://img.freepik.com/premium-photo/portrait-african-female-doctor-wearing-white-coat-stethoscope-standing-hospital-corridor_916899-1347.jpg',
    bio: 'Leading our medical strategy with over 20 years of experience in Cameroonian healthcare.',
  },
  {
    name: 'Dr. Fon Peter',
    role: 'Chief of Telemedicine',
    image: 'https://img.freepik.com/premium-photo/portrait-male-african-doctor-wearing-white-coat-stethoscope-standing-hospital_916899-1344.jpg',
    bio: 'Pioneering digital health solutions to improve healthcare accessibility across Cameroon.',
  },
  {
    name: 'Dr. Biya Rose',
    role: 'Head of Patient Care',
    image: 'https://img.freepik.com/premium-photo/portrait-female-african-doctor-wearing-white-coat-stethoscope-standing-hospital-corridor_916899-1349.jpg',
    bio: 'Specializing in patient-centered care with focus on rural healthcare access.',
  },
  {
    name: 'Dr. Kamga Jean',
    role: 'Medical Director',
    image: 'https://img.freepik.com/premium-photo/portrait-male-african-doctor-wearing-white-coat-stethoscope-standing-hospital-corridor_916899-1346.jpg',
    bio: 'Expert in healthcare management with extensive experience in public health systems.',
  },
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <h2 className="text-base font-semibold leading-8 text-blue-600">About Us</h2>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transforming Healthcare Access
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're on a mission to make healthcare more accessible, efficient, and patient-centered.
              Our platform connects you with quality healthcare providers, manages your health records,
              and provides convenient telehealth services.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-center sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Features Section */}
      <div className="mx-auto mt-32 w-screen max-w-[100vw] px-0 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Comprehensive Platform</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for your healthcare journey
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform offers a complete suite of features designed to make managing your health easier and more efficient.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3 mx-0 px-0">
            {features.map((feature) => (
              <div key={feature.name} className="group relative transform transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-500 hover:shadow-lg transition-all duration-300">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className={`rounded-lg ${feature.color} p-2`}>
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Team Section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Leadership</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Meet the experienced team behind our mission to transform healthcare delivery.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {team.map((person) => (
            <li key={person.name} className="group relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  src={person.image} 
                  alt={person.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm">{person.bio}</p>
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
              <p className="text-base leading-7 text-gray-600">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20 rounded-3xl">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get in Touch</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Have questions about our platform? We're here to help.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl space-y-6 text-base leading-7 text-gray-600">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                <p>support@healthservicedirectory.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-6 w-6 text-blue-600" />
                <p>1-800-HEALTH-DIR</p>
              </div>
              <div className="flex items-center space-x-3">
                <ClockIcon className="h-6 w-6 text-blue-600" />
                <p>24/7 Support Available</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
            <div
              className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-32" />
    </div>
  );
}
