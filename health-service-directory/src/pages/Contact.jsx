import React, { useState } from 'react';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  UserIcon,
  PaperAirplaneIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

const offices = [
  {
    city: 'Yaoundé',
    address: '1234 Avenue Kennedy, Quartier Bastos, Yaoundé, Cameroon',
    phone: '+237 222-234-567',
    email: 'yaounde@healthservicedirectory.com',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM WAT',
  },
  {
    city: 'Douala',
    address: '789 Boulevard de la Liberté, Akwa, Douala, Cameroon',
    phone: '+237 233-456-789',
    email: 'douala@healthservicedirectory.com',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM WAT',
  },
  {
    city: 'Bamenda',
    address: '456 Commercial Avenue, Old Town, Bamenda, Cameroon',
    phone: '+237 233-789-012',
    email: 'bamenda@healthservicedirectory.com',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM WAT',
  },
];

const departments = [
  {
    name: 'Technical Support',
    description: 'Get help with platform-related issues',
    email: 'support@healthservicedirectory.com',
    phone: '1-800-HEALTH-1',
  },
  {
    name: 'Patient Care',
    description: 'Assistance with medical services and appointments',
    email: 'care@healthservicedirectory.com',
    phone: '1-800-HEALTH-2',
  },
  {
    name: 'Provider Relations',
    description: 'For healthcare providers and partnerships',
    email: 'providers@healthservicedirectory.com',
    phone: '1-800-HEALTH-3',
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700" style={{ backgroundImage: "url('/images/doctors/group-african-doctors-students-near-medical-university-outdoor.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 mix-blend-multiply" />
        <div className="relative z-10 max-w-3xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 drop-shadow mb-6">We're here to help. Reach out and our team will get back to you as soon as possible.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto -mt-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 pb-24">
        {/* Contact Form */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-blue-100 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2"><ChatBubbleLeftRightIcon className="h-7 w-7 text-blue-500" /> Send a Message</h2>
          {submitted ? (
            <div className="text-green-600 text-lg font-semibold">Thank you for reaching out! We'll get back to you soon.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <span className="absolute left-3 top-1/2 -translate-y-1/2"><UserIcon className="h-5 w-5 text-blue-400" /></span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-10 py-3 bg-white/80"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <span className="absolute left-3 top-1/2 -translate-y-1/2"><EnvelopeIcon className="h-5 w-5 text-blue-400" /></span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-10 py-3 bg-white/80"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <span className="absolute left-3 top-1/2 -translate-y-1/2"><PencilIcon className="h-5 w-5 text-blue-400" /></span>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-10 py-3 bg-white/80"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <span className="absolute left-3 top-6"><ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-400" /></span>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-10 py-3 bg-white/80"
                  required
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Details */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-blue-100 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2"><EnvelopeIcon className="h-7 w-7 text-blue-500" /> Contact Information</h2>
          <div className="flex items-center mb-6">
            <EnvelopeIcon className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-gray-700 text-lg">info@healthconnect.com</span>
          </div>
          <div className="flex items-center mb-6">
            <PhoneIcon className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-gray-700 text-lg">+237 123 456 789</span>
          </div>
          <div className="flex items-center mb-10">
            <MapPinIcon className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-gray-700 text-lg">123 Health St, Douala, Cameroon</span>
          </div>
          <div className="flex gap-4 mt-4 justify-center">
            <a href="#" className="text-blue-600 hover:text-blue-800 bg-white/80 rounded-full p-3 shadow-md transition-all duration-200"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.65 0-1.28-.04-1.9-.11A12.13 12.13 0 0 0 6.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z"/></svg></a>
            <a href="#" className="text-blue-600 hover:text-blue-800 bg-white/80 rounded-full p-3 shadow-md transition-all duration-200"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93v-6.32h-2.48v-2.61h2.48v-2c0-2.45 1.49-3.8 3.68-3.8 1.07 0 2.19.19 2.19.19v2.41h-1.24c-1.22 0-1.6.76-1.6 1.54v1.86h2.72l-.44 2.61h-2.28v6.32c4.64-.86 8.24-4.52 8.24-8.93 0-5.5-4.46-9.96-9.96-9.96z"/></svg></a>
            <a href="#" className="text-blue-600 hover:text-blue-800 bg-white/80 rounded-full p-3 shadow-md transition-all duration-200"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
