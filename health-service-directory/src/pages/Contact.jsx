import React, { useState, useEffect } from 'react';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  UserIcon,
  PaperAirplaneIcon
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'locations'

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.department) errors.department = 'Please select a department';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsLoading(true);
    setFormErrors({});
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsLoading(false);
      setSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          department: '',
          message: '',
        });
      }, 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Reset errors when switching tabs
  useEffect(() => {
    setFormErrors({});
  }, [activeTab]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate mt-8 overflow-hidden w-full">
        {/* Background pattern */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" stroke="#d1d5db" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
          </svg>
        </div>
        
        {/* Hero content */}
        <div className="w-full px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Have questions about our healthcare services? We're here to help you 24/7.
              Reach out to us through any of our contact channels.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#contact-form"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 ease-in-out"
              >
                Contact Us Now
              </a>
              <a href="#locations" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-x-1">
                View Locations <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-full px-6 lg:px-8 py-12 bg-white">
        <div className="w-full">
          {/* Section tabs */}
          <div className="flex justify-center mb-12 border-b">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-3 text-lg font-medium transition-all duration-200 ease-in-out border-b-2 ${activeTab === 'form' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
            >
              <span className="flex items-center gap-x-2">
                <PaperAirplaneIcon className="h-5 w-5" />
                Contact Form
              </span>
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`px-6 py-3 text-lg font-medium transition-all duration-200 ease-in-out border-b-2 ${activeTab === 'locations' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
            >
              <span className="flex items-center gap-x-2">
                <BuildingOfficeIcon className="h-5 w-5" />
                Our Locations
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            {/* Contact Information */}
            <div
              className={`${activeTab === 'form' ? 'lg:order-2' : 'lg:order-1'}`}
              id="locations"
            >
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-x-2">
                <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                Our Offices
              </h3>
              <dl className="mt-8 space-y-6">
                {offices.map((office, index) => (
                  <div 
                    key={office.city} 
                    className="rounded-lg bg-white p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 ease-in-out"
                  >
                    <dt className="text-lg font-semibold text-gray-900 flex items-center gap-x-2">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                        {index + 1}
                      </span>
                      {office.city}
                    </dt>
                    <dd className="mt-4 space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-x-3">
                        <MapPinIcon className="h-5 w-5 text-blue-500" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <PhoneIcon className="h-5 w-5 text-blue-500" />
                        <a href={`tel:${office.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-blue-600 transition-colors">{office.phone}</a>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                        <a href={`mailto:${office.email}`} className="hover:text-blue-600 transition-colors">{office.email}</a>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <ClockIcon className="h-5 w-5 text-blue-500" />
                        <span>{office.hours}</span>
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-x-2">
                <UserIcon className="h-6 w-6 text-blue-600" />
                Departments
              </h3>
              <dl className="mt-8 space-y-6">
                {departments.map((dept, index) => (
                  <div 
                    key={dept.name} 
                    className="rounded-lg bg-white p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 ease-in-out"
                  >
                    <dt className="text-lg font-semibold text-gray-900 flex items-center gap-x-2">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                        {dept.name.charAt(0)}
                      </span>
                      {dept.name}
                    </dt>
                    <dd className="mt-2 text-sm text-gray-600 ml-10">{dept.description}</dd>
                    <dd className="mt-4 space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-x-3">
                        <PhoneIcon className="h-5 w-5 text-blue-500" />
                        <a href={`tel:${dept.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-blue-600 transition-colors">{dept.phone}</a>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                        <a href={`mailto:${dept.email}`} className="hover:text-blue-600 transition-colors">{dept.email}</a>
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Contact Form */}
            <div 
              className={`${activeTab === 'form' ? 'lg:order-1' : 'lg:order-2'} lg:pl-8`}
              id="contact-form"
            >
              <div className="mx-auto max-w-xl lg:mx-0">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-x-2">
                  <PaperAirplaneIcon className="h-6 w-6 text-blue-600" />
                  Send us a message
                </h3>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                <form onSubmit={handleSubmit} className="mt-8">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900 flex items-center gap-x-1">
                        Name
                        {formErrors.name && <span className="text-red-500 text-xs ml-1">*</span>}
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${formErrors.name ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-blue-600'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                        />
                      </div>
                      {formErrors.name && <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 flex items-center gap-x-1">
                        Email
                        {formErrors.email && <span className="text-red-500 text-xs ml-1">*</span>}
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${formErrors.email ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-blue-600'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                        />
                      </div>
                      {formErrors.email && <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                        Phone <span className="text-gray-400 text-xs">(optional)</span>
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          placeholder="+237 xxx-xxx-xxx"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="department" className="block text-sm font-semibold leading-6 text-gray-900 flex items-center gap-x-1">
                        Department
                        {formErrors.department && <span className="text-red-500 text-xs ml-1">*</span>}
                      </label>
                      <div className="mt-2.5">
                        <select
                          name="department"
                          id="department"
                          value={formData.department}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${formErrors.department ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-blue-600'} focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                        >
                          <option value="">Select a department</option>
                          {departments.map((dept) => (
                            <option key={dept.name} value={dept.name}>
                              {dept.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formErrors.department && <p className="mt-1 text-xs text-red-500">{formErrors.department}</p>}
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 flex items-center gap-x-1">
                        Message
                        {formErrors.message && <span className="text-red-500 text-xs ml-1">*</span>}
                      </label>
                      <div className="mt-2.5">
                        <textarea
                          name="message"
                          id="message"
                          rows={4}
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${formErrors.message ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-blue-600'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200`}
                        />
                      </div>
                      {formErrors.message && <p className="mt-1 text-xs text-red-500">{formErrors.message}</p>}
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`rounded-md px-4 py-3 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 flex items-center gap-x-2 ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <PaperAirplaneIcon className="h-4 w-4" />
                          Send message
                        </>
                      )}
                    </button>
                  </div>
                </form>
                {submitted && (
                  <div 
                    className="mt-6 rounded-md bg-green-50 p-4 border border-green-100 shadow-sm"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Thank you for your message! We'll get back to you soon.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16 w-full bg-gray-900 relative overflow-hidden rounded-lg shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-20 z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-gray-900 to-transparent">
          <h3 className="text-xl font-bold text-white">Our Locations</h3>
          <p className="text-gray-300 text-sm mt-2">Visit us at one of our offices across Cameroon</p>
        </div>
        <div className="h-96 w-full">
          <iframe
            title="Office Locations"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254374.6851754311!2d11.4071485!3d3.8480225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf7a309a7977%3A0x7e563358978fd58!2zWWFvdW5kw6k!5e0!3m2!1sen!2scm!4v1689927064053!5m2!1sen!2scm"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale-[30%] contrast-[1.1]"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600">Find answers to common questions about our healthcare services.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[
            { q: "How do I schedule an appointment?", a: "You can schedule an appointment through our Appointments page or by contacting our Patient Care department directly." },
            { q: "What insurance plans do you accept?", a: "We accept most major insurance plans. Please contact our office for specific information about your insurance coverage." },
            { q: "How can I access my health records?", a: "You can access your health records through our Health Records page after logging into your account." },
            { q: "What telemedicine services do you offer?", a: "We offer video consultations, prescription renewals, and follow-up appointments through our Telemedicine platform." },
          ].map((faq, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 ease-in-out"
            >
              <h3 className="text-lg font-semibold text-gray-900">{faq.q}</h3>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-16" />
    </div>
  );
}
