import React from 'react';
import { VideoCameraIcon, PhoneIcon, ChatBubbleLeftRightIcon, ArrowRightIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/outline';

const Telemedicine = () => {
  const services = [
    {
      title: 'Video Consultations',
      description: 'Connect with healthcare providers through secure video calls',
      icon: VideoCameraIcon,
      features: [
        'High-quality video calls',
        'Secure and private',
        'Available 24/7',
        'Easy scheduling'
      ]
    },
    {
      title: 'Phone Consultations',
      description: 'Speak with doctors over the phone for quick medical advice',
      icon: PhoneIcon,
      features: [
        'Quick medical advice',
        'Prescription services',
        'Follow-up consultations',
        'Emergency support'
      ]
    },
    {
      title: 'Chat with Doctors',
      description: 'Get medical advice through secure messaging',
      icon: ChatBubbleLeftRightIcon,
      features: [
        'Text-based consultations',
        'Share medical reports',
        'Get written prescriptions',
        '24/7 availability'
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700" style={{ backgroundImage: "url('/images/doctors/portrait-happy-african-american-woman-surgeon-standing-operating-room-ready-work-patient-female-medical-worker-surgical-uniform-operation-theater.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-20 px-4 sm:py-28 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Telemedicine in Cameroon</h1>
            <p className="mb-8 text-lg text-blue-100">Access healthcare professionals from the comfort of your home through our secure telemedicine platform.</p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow hover:bg-blue-700 transition-all duration-200">Get Started</button>
          </div>
        </div>
        {/* Decorative SVG Wave */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="url(#wave-gradient)" fillOpacity="0.2" d="M0,80 C480,160 960,0 1440,80 L1440,100 L0,100 Z" /><defs><linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#2563eb" /><stop offset="1" stopColor="#6366f1" /></linearGradient></defs></svg>
      </div>

      {/* Why Telemedicine Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Telemedicine?</h2>
            <p className="mt-4 text-lg text-gray-600">Discover the benefits of virtual healthcare for you and your family</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8">
              <VideoCameraIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Convenience</h3>
              <p className="text-gray-600">See a doctor from anywhere, anytime—no travel needed.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8">
              <PhoneIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Access</h3>
              <p className="text-gray-600">Get fast medical advice and prescriptions when you need them.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8">
              <HeartIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Your privacy is protected with secure, encrypted consultations.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-8">
              <ClockIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Availability</h3>
              <p className="text-gray-600">Access healthcare professionals day or night, even on weekends.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-xl hover:shadow-2xl border border-white/60 backdrop-blur-md transition-all duration-300 overflow-hidden flex flex-col justify-between transform hover:scale-105"
            >
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600/90 shadow-lg mb-8">
                  <service.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{service.title}</h3>
                <p className="mb-4 text-base text-gray-600">{service.description}</p>
                <ul className="mt-2 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 px-10 py-6">
                <button
                  className="w-full flex justify-center items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-cyan-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 hover:brightness-110"
                >
                  Get Started
                  <ArrowRightIcon className="h-6 w-6 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl drop-shadow-lg">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Book your virtual consultation today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-xl shadow-lg">
              <button
                className="inline-flex items-center justify-center px-7 py-3 bg-white text-blue-700 font-semibold text-lg rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;
