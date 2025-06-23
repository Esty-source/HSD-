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
  BuildingStorefrontIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  MapPinIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import FloatingNotifications from '../components/home/FloatingNotifications';
import { useViewport } from '../components/responsive/ViewportProvider';
import MobileHome from './MobileHome';

export default function Home() {
  // Use viewport hook to determine if we're on mobile
  const { isMobile } = useViewport();
  
  // If on mobile, render the mobile-optimized version
  if (isMobile) {
    return <MobileHome />;
  }
  
  // Desktop version continues below
  const features = [
    {
      name: 'Find Doctors',
      description: 'Connect with qualified healthcare providers in your area.',
      icon: UserGroupIcon,
      link: '/find-doctors'
    },
    {
      name: 'Telemedicine',
      description: 'Get medical consultations from the comfort of your home.',
      icon: PhoneIcon,
      link: '/telemedicine'
    },
    {
      name: 'Pharmacies',
      description: 'Locate nearby pharmacies and order medications online.',
      icon: BuildingStorefrontIcon,
      link: '/pharmacies'
    },
    {
      name: 'Health Resources',
      description: 'Access reliable health information and wellness tips.',
      icon: BookOpenIcon,
      link: '/resources'
    }
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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 mt-12" style={{ backgroundImage: "url('/images/doctors/portrait-happy-african-american-woman-surgeon-standing-operating-room-ready-work-patient-female-medical-worker-surgical-uniform-operation-theater.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-28 px-4 sm:py-36 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-lg">
            Your Health, Our Priority
          </h1>
          <p className="mt-8 text-2xl text-blue-100 max-w-3xl drop-shadow">
            Access quality healthcare services, connect with medical professionals, and manage your health journey all in one place.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              to="/find-doctors"
              className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold text-lg rounded-2xl shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Find a Doctor
              <ArrowRightIcon className="ml-2 h-6 w-6" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-7 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Comprehensive Healthcare Services
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need for your health and wellness journey
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Link
                  key={feature.name}
                  to={feature.link}
                  className="relative group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
                >
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white mb-6 shadow-md">
                    <feature.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    {feature.name}
                  </h3>
                  <p className="mt-3 text-base text-gray-600">
                    {feature.description}
                  </p>
                  <div className="mt-6">
                    <span className="inline-flex items-center text-base font-medium text-blue-600 group-hover:text-blue-700">
                      Learn more
                      <ArrowRightIcon className="ml-1 h-5 w-5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Get started with HealthConnect in just a few steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8">
              <UserGroupIcon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create an Account</h3>
              <p className="text-gray-600">Sign up for free and set up your profile in minutes.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8">
              <VideoCameraIcon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book a Service</h3>
              <p className="text-gray-600">Find doctors, book appointments, or start a telemedicine session.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8">
              <HeartIcon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Care</h3>
              <p className="text-gray-600">Receive quality care and manage your health with ease.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Choose HealthConnect?</h2>
            <p className="mt-4 text-lg text-gray-600">We're committed to making healthcare accessible, reliable, and personal.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8">
              <ShieldCheckIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Professionals</h3>
              <p className="text-gray-600">All providers are verified and highly qualified.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8">
              <ClockIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Access</h3>
              <p className="text-gray-600">Get care anytime, anywhere, even on weekends and holidays.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8">
              <MapPinIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nationwide Coverage</h3>
              <p className="text-gray-600">Access healthcare services across Cameroon.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8">
              <HeartIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Care</h3>
              <p className="text-gray-600">Your health journey is unique—so is our support.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600">Real stories from patients and providers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <UserCircleIcon className="h-12 w-12 text-blue-400 mb-4" />
              <p className="text-lg text-gray-700 mb-4">"HealthConnect made it so easy to find a doctor and book an appointment. The telemedicine feature is a lifesaver!"</p>
              <span className="font-semibold text-blue-700">— Marie T., Douala</span>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <UserCircleIcon className="h-12 w-12 text-blue-400 mb-4" />
              <p className="text-lg text-gray-700 mb-4">"I love the convenience and the quality of care. The platform is user-friendly and reliable."</p>
              <span className="font-semibold text-blue-700">— Dr. Jean K., Yaoundé</span>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
              <UserCircleIcon className="h-12 w-12 text-blue-400 mb-4" />
              <p className="text-lg text-gray-700 mb-4">"The resources and support are top-notch. I feel empowered to manage my health."</p>
              <span className="font-semibold text-blue-700">— Samuel N., Bamenda</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl drop-shadow-lg">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Join our healthcare community today.</span>
          </h2>
          <div className="mt-10 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-2xl shadow-lg">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-7 py-4 bg-white text-blue-700 font-bold text-lg rounded-2xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Get started
              </Link>
            </div>
            <div className="ml-4 inline-flex rounded-2xl shadow-lg">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-7 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg rounded-2xl hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
