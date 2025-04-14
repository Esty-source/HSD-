import React, { useState } from 'react';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate bg-gradient-to-b from-blue-100/20">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Get in Touch
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Have questions about our healthcare services? We're here to help you 24/7.
              Reach out to us through any of our contact channels.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-full px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Our Offices</h3>
            <dl className="mt-8 space-y-6">
              {offices.map((office) => (
                <div key={office.city} className="rounded-lg bg-gray-50 p-6">
                  <dt className="text-lg font-semibold text-gray-900">{office.city}</dt>
                  <dd className="mt-4 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-x-3">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
                      <span>{office.hours}</span>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Departments</h3>
            <dl className="mt-8 space-y-6">
              {departments.map((dept) => (
                <div key={dept.name} className="rounded-lg bg-gray-50 p-6">
                  <dt className="text-lg font-semibold text-gray-900">{dept.name}</dt>
                  <dd className="mt-2 text-sm text-gray-600">{dept.description}</dd>
                  <dd className="mt-4 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-x-3">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <span>{dept.phone}</span>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      <span>{dept.email}</span>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contact Form */}
          <div className="lg:pl-8">
            <div className="mx-auto max-w-xl lg:mx-0">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Send us a message</h3>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                      Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                      Phone
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-semibold leading-6 text-gray-900">
                      Department
                    </label>
                    <div className="mt-2.5">
                      <select
                        name="department"
                        id="department"
                        required
                        value={formData.department}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select a department</option>
                        {departments.map((dept) => (
                          <option key={dept.name} value={dept.name}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                      Message
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Send message
                  </button>
                </div>
              </form>
              {submitted && (
                <div className="mt-4 rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
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

      {/* Map Section */}
      <div className="mt-24 h-96 w-full bg-gray-900">
        <iframe
          title="Office Locations"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254374.6851754311!2d11.4071485!3d3.8480225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf7a309a7977%3A0x7e563358978fd58!2zWWFvdW5kw6k!5e0!3m2!1sen!2scm!4v1689927064053!5m2!1sen!2scm"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Bottom Spacing */}
      <div className="h-24" />
    </div>
  );
}
