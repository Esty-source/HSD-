import React, { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon, 
  QuestionMarkCircleIcon 
} from '@heroicons/react/24/outline';

export default function Support() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form after closing modal
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  const supportOptions = [
    {
      title: 'Phone Support',
      description: 'Speak directly with our healthcare support team',
      icon: PhoneIcon,
      contact: '+237 653835533',
      availability: 'Available 24/7',
      color: 'bg-blue-600',
    },
    {
      title: 'Email Support',
      description: 'Send us your questions or concerns',
      icon: EnvelopeIcon,
      contact: 'support@hsd.com',
      availability: 'Response within 24 hours',
      color: 'bg-indigo-600',
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: ChatBubbleLeftRightIcon,
      contact: 'Click to start a chat',
      availability: 'Available 8AM - 8PM',
      color: 'bg-purple-600',
    },
    {
      title: 'FAQ',
      description: 'Find answers to common questions',
      icon: QuestionMarkCircleIcon,
      contact: 'Browse our knowledge base',
      availability: 'Available 24/7',
      color: 'bg-blue-600',
    },
  ];

  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment by navigating to the Find Doctors page, selecting a doctor, and clicking the "Book Appointment" button. Follow the prompts to select a date and time that works for you.',
    },
    {
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, you can cancel or reschedule your appointment by going to the Appointments page, finding your upcoming appointment, and clicking the "Cancel" or "Reschedule" button.',
    },
    {
      question: 'How do I access my health records?',
      answer: 'You can access your health records by navigating to the Health Records page. You will need to be logged in to view your personal health information.',
    },
    {
      question: 'Is my information secure?',
      answer: 'Yes, we take your privacy and security seriously. All your personal and health information is encrypted and stored securely in compliance with HIPAA regulations.',
    },
    {
      question: 'How do I update my personal information?',
      answer: 'You can update your personal information by going to your Profile page and clicking the "Edit Profile" button. From there, you can update your contact information, insurance details, and other personal information.',
    },
  ];

  return (
    <div className="w-full max-w-none">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-24">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 800">
            <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" stroke="#fff" strokeWidth="100" fill="none" />
          </svg>
        </div>
        <div className="relative w-full px-4 py-8 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            We're Here to Help
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
            Our support team is available to assist you with any questions or concerns you may have about our services.
          </p>
        </div>
      </div>

      {/* Support Options */}
      <div className="w-full px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-900">
            Contact Us
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Choose the support option that works best for you
          </p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8 lg:grid-cols-4">
          {supportOptions.map((option) => (
            <div 
              key={option.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px]"
            >
              <div className="relative z-10">
                <div className={`inline-flex rounded-xl ${option.color} p-3 text-white shadow-lg`}>
                  <option.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-8 text-xl font-bold text-gray-900">{option.title}</h3>
                <p className="mt-3 text-gray-600">{option.description}</p>
                <div className="mt-6 font-medium text-gray-900">{option.contact}</div>
                <div className="mt-1 text-sm text-gray-500">{option.availability}</div>
              </div>
              <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-blue-50 transition-all duration-300 group-hover:scale-150"></div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full bg-gray-50 py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="mx-auto max-w-4xl divide-y divide-gray-200 rounded-2xl bg-white shadow-xl overflow-hidden">
            {faqs.map((faq, index) => (
              <div key={index} className="p-8 hover:bg-blue-50 transition-colors duration-300">
                <h3 className="text-xl font-medium text-gray-900">{faq.question}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full px-4 py-20 sm:px-6 lg:px-8 bg-white">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-900">
            Send Us a Message
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            We'd love to hear from you
          </p>
        </div>

        <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <PhoneIcon className="h-6 w-6 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="mt-1">+237 653835533</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <EnvelopeIcon className="h-6 w-6 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="mt-1">support@hsd.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="mt-1">Available 8AM - 8PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-3/5 p-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-xl border border-transparent bg-blue-600 py-3 px-6 text-base font-medium text-white shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out, {formData.name}. Our support team will get back to you within 24 hours at {formData.email}.
              </p>
              <div className="mt-6">
                <button
                  onClick={closeModal}
                  className="w-full inline-flex justify-center rounded-xl border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
