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
  ChevronRightIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import FloatingNotifications from '../components/home/FloatingNotifications';
import MobileLayout from '../components/responsive/MobileLayout';

export default function MobileHome() {
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
    <MobileLayout title="Home">
      <FloatingNotifications />
      {/* Hero Section */}
      <div className="relative w-full min-h-[400px]">
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
        <div className="relative w-full px-4 py-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Your Health, Our Priority
          </h1>
          <p className="mt-4 max-w-xs mx-auto text-base text-gray-100">
            Find and book appointments with qualified healthcare providers. Access emergency services
            and locate nearby pharmacies all in one place.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3">
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
      <div className="w-full mx-0 px-0 py-10 bg-gradient-to-b from-white to-blue-50">
        <div className="mb-10">
          <h2 className="font-serif text-center text-2xl font-bold tracking-tight text-gray-900">
            Our Services
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <p className="mx-auto mt-4 max-w-xs text-center text-base leading-relaxed text-gray-600">
            Everything you need to manage your healthcare journey in one place.
          </p>
        </div>

        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 mx-0 px-0">
          {features.map((feature) => (
            <Link
              key={feature.name}
              to={feature.to}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-3px]"
            >
              <div className="relative z-10">
                <div
                  className={`inline-flex rounded-xl ${feature.color} p-3 text-white shadow-lg`}
                >
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-gray-600 text-sm">{feature.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  <span>Learn more</span>
                  <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-50 transition-all duration-300 group-hover:scale-150"></div>
            </Link>
          ))}
        </div>

        {/* Additional Services */}
        <div className="my-12">
          <h2 className="font-serif text-center text-2xl font-bold tracking-tight text-gray-900">
            Additional Services
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          <p className="mx-auto mt-4 max-w-xs text-center text-base leading-relaxed text-gray-600">
            Comprehensive healthcare solutions to support your well-being.
          </p>
        </div>

        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 mx-0 px-0">
          {additionalServices.map((service) => (
            <Link
              key={service.name}
              to={service.to}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-3px]"
            >
              <div className="relative z-10">
                <div
                  className={`inline-flex rounded-xl ${service.color} p-3 text-white shadow-lg`}
                >
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-gray-900">{service.name}</h3>
                <p className="mt-2 text-gray-600 text-sm">{service.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  <span>Explore</span>
                  <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-indigo-50 transition-all duration-300 group-hover:scale-150"></div>
            </Link>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
