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
} from '@heroicons/react/24/outline';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative">
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
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Health, Our Priority
          </h1>
          <p className="mt-6 max-w-xl text-xl text-gray-100">
            Find and book appointments with qualified healthcare providers. Access emergency services
            and locate nearby pharmacies all in one place.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-20">
          <h2 className="font-serif text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Core Services
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-blue-600"></div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-gray-600">
            Everything you need to manage your healthcare journey in one place.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Link
              key={feature.name}
              to={feature.to}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition duration-300 hover:shadow-2xl"
            >
              <div className="relative z-10">
                <div
                  className={`inline-flex rounded-xl ${feature.color} p-3 text-white shadow-lg`}
                >
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-8 text-xl font-bold text-gray-900">{feature.name}</h3>
                <p className="mt-3 text-gray-600">{feature.description}</p>
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50 transition-all duration-300 group-hover:scale-150"></div>
            </Link>
          ))}
        </div>

        {/* Additional Services */}
        <div className="my-20">
          <h2 className="font-serif text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Additional Services
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded bg-blue-600"></div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-gray-600">
            Comprehensive healthcare solutions to support your well-being.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {additionalServices.map((service) => (
            <Link
              key={service.name}
              to={service.to}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition duration-300 hover:shadow-2xl"
            >
              <div className="relative z-10">
                <div
                  className={`inline-flex rounded-xl ${service.color} p-3 text-white shadow-lg`}
                >
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-8 text-xl font-bold text-gray-900">{service.name}</h3>
                <p className="mt-3 text-gray-600">{service.description}</p>
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50 transition-all duration-300 group-hover:scale-150"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to take control of your health?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100">
              Join thousands of satisfied patients who trust us with their healthcare needs.
            </p>
            <div className="mt-10 flex justify-center gap-6">
              <Link
                to="/doctors"
                className="rounded-md bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-lg transition duration-200 hover:bg-blue-50"
              >
                Get Started
              </Link>
              <Link
                to="/resources"
                className="rounded-md border-2 border-white bg-transparent px-8 py-4 text-base font-semibold text-white transition duration-200 hover:bg-white hover:text-blue-600"
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
