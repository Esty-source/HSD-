import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  ClockIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  HeartIcon,
  PhoneIcon,
  BookmarkIcon,
  StarIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function Home() {
  const features = [
    {
      name: 'Find Doctors',
      description: 'Search and connect with qualified healthcare professionals.',
      icon: UserGroupIcon,
      to: '/doctors',
      color: 'bg-blue-600',
    },
    {
      name: 'Book Appointments',
      description: 'Schedule visits with your preferred healthcare providers.',
      icon: ClockIcon,
      to: '/appointments',
      color: 'bg-indigo-600',
    },
    {
      name: 'Telemedicine',
      description: 'Virtual consultations from the comfort of your home.',
      icon: VideoCameraIcon,
      to: '/telemedicine',
      color: 'bg-purple-600',
    },
    {
      name: 'Health Records',
      description: 'Access and manage your medical history securely.',
      icon: DocumentTextIcon,
      to: '/health-records',
      color: 'bg-blue-600',
    },
  ];

  const additionalServices = [
    {
      name: 'Find Pharmacies',
      description: 'Locate nearby pharmacies and check medication availability.',
      icon: BuildingOffice2Icon,
      to: '/pharmacies',
      color: 'bg-indigo-600',
    },
    {
      name: 'Emergency Care',
      description: '24/7 emergency services and urgent care locations.',
      icon: HeartIcon,
      to: '/emergency',
      color: 'bg-blue-600',
    },
    {
      name: 'Health Resources',
      description: 'Educational materials and health tips.',
      icon: BookmarkIcon,
      to: '/resources',
      color: 'bg-purple-600',
    },
    {
      name: 'Support',
      description: '24/7 customer support for all your healthcare needs.',
      icon: PhoneIcon,
      to: '/support',
      color: 'bg-indigo-600',
    },
  ];

  return (
    <div className="w-full max-w-none">
      {/* Hero Section */}
      <div className="relative w-full min-h-[600px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Medical background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/75 mix-blend-multiply" />
        </div>

        {/* Content */}
        <div className="relative w-full px-4 py-32 sm:px-6 sm:py-40 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Health, Our Priority
          </h1>
          <p className="mt-6 max-w-xl text-xl text-gray-100">
            Find and book appointments with qualified healthcare providers. Access emergency services
            and locate nearby pharmacies all in one place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-x-6">
            <Link
              to="/doctors"
              className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Find a Doctor
            </Link>
            <Link
              to="/appointments"
              className="rounded-xl bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="w-full px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="mb-16">
          <h2 className="font-serif text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Our Services
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-gray-600">
            Everything you need to manage your healthcare journey in one place.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Link
              key={feature.name}
              to={feature.to}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px]"
            >
              <div className="relative z-10">
                <div
                  className={`inline-flex rounded-xl ${feature.color} p-3 text-white shadow-lg`}
                >
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-8 text-xl font-bold text-gray-900">{feature.name}</h3>
                <p className="mt-3 text-gray-600">{feature.description}</p>
                <div className="mt-6 flex items-center text-sm font-medium text-blue-600">
                  <span>Learn more</span>
                  <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-blue-50 transition-all duration-300 group-hover:scale-150"></div>
            </Link>
          ))}
        </div>

        {/* Additional Services */}
        <div className="my-20">
          <h2 className="font-serif text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Additional Services
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-gray-600">
            Comprehensive healthcare solutions to support your well-being.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {additionalServices.map((service) => (
            <Link
              key={service.name}
              to={service.to}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px]"
            >
              <div className="relative z-10">
                <div
                  className={`inline-flex rounded-xl ${service.color} p-3 text-white shadow-lg`}
                >
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-8 text-xl font-bold text-gray-900">{service.name}</h3>
                <p className="mt-3 text-gray-600">{service.description}</p>
                <div className="mt-6 flex items-center text-sm font-medium text-blue-600">
                  <span>Explore</span>
                  <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-blue-50 transition-all duration-300 group-hover:scale-150"></div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="w-full bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              What Our Patients Say
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-gray-600">
              Hear from people who have experienced our healthcare services.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-6">
                "Finding the right doctor has never been easier. The platform is intuitive and the booking process is seamless. I was able to schedule an appointment with a specialist within minutes."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                  alt="Patient" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Patient since 2023</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-6">
                "The telemedicine feature saved me so much time. I had a virtual consultation with a doctor who provided excellent care and advice. Highly recommend this service!"
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                  alt="Patient" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Michael Thompson</h4>
                  <p className="text-sm text-gray-600">Patient since 2022</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-6">
                "Having all my health records in one place has been a game-changer. I can easily share my medical history with new doctors, making transitions between providers smooth and efficient."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                  alt="Patient" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Jennifer Williams</h4>
                  <p className="text-sm text-gray-600">Patient since 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">10k+</div>
              <p className="mt-2 text-gray-600">Registered Patients</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600">500+</div>
              <p className="mt-2 text-gray-600">Healthcare Providers</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600">98%</div>
              <p className="mt-2 text-gray-600">Patient Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">24/7</div>
              <p className="mt-2 text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-full overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 800">
            <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" stroke="#fff" strokeWidth="100" fill="none" />
          </svg>
        </div>
        <div className="w-full px-4 py-24 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to take control of your health?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100">
              Join thousands of satisfied patients who trust us with their healthcare needs.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link
                to="/doctors"
                className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl hover:translate-y-[-2px] flex items-center justify-center"
              >
                Get Started
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/resources"
                className="rounded-xl border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-blue-600 hover:shadow-xl hover:translate-y-[-2px] flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
