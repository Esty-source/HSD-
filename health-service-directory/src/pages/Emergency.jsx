import React, { useState } from 'react';
import { 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  HeartIcon,
  TruckIcon,
  ShieldExclamationIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

const emergencyContacts = [
  {
    id: 1,
    name: 'SAMU Cameroon',
    number: '119',
    description: 'Emergency Medical Services',
    priority: 'high',
  },
  {
    id: 2,
    name: 'Police',
    number: '117',
    description: 'Police Emergency Services',
    priority: 'high',
  },
  {
    id: 3,
    name: 'Fire Brigade',
    number: '118',
    description: 'Fire Emergency Services',
    priority: 'high',
  },
  {
    id: 4,
    name: 'National Emergency Number',
    number: '112',
    description: 'General Emergency Services',
    priority: 'high',
  },
  {
    id: 5,
    name: 'Red Cross Cameroon',
    number: '+237 222-22-31-69',
    description: 'Medical Emergency & Blood Services',
    priority: 'medium',
  },
  {
    id: 6,
    name: 'Anti-Poison Center',
    number: '+237 677-53-56-33',
    description: 'Poison Control Center',
    priority: 'medium',
  }
];

const emergencyFacilities = [
  {
    id: 1,
    name: 'Yaoundé Central Hospital',
    type: 'Emergency & Trauma Center',
    address: 'Rue Henri Dunant, Yaoundé',
    region: 'Centre Region',
    waitTime: '10-15 minutes',
    phone: '+237 222-23-10-25',
    services: ['Trauma Center', 'Emergency Surgery', 'Intensive Care'],
  },
  {
    id: 2,
    name: 'Laquintinie Hospital',
    type: 'Emergency Services',
    address: 'Boulevard de la Liberté, Douala',
    region: 'Littoral Region',
    waitTime: '15-20 minutes',
    phone: '+237 233-42-75-78',
    services: ['Emergency Room', 'Critical Care', 'Pediatric Emergency'],
  },
  {
    id: 3,
    name: 'Bamenda Regional Hospital',
    type: 'Emergency Department',
    address: 'Hospital Street, Bamenda',
    region: 'North West Region',
    waitTime: '10-15 minutes',
    phone: '+237 233-36-13-28',
    services: ['Emergency Care', 'Surgical Services', 'Ambulance'],
  }
];

const firstAidTips = [
  {
    id: 1,
    title: 'Heart Attack',
    icon: HeartIcon,
    steps: [
      'Call emergency services immediately (119)',
      'Have the person sit or lie down',
      'Loosen any tight clothing',
      'Ask if they take heart medication',
      'Monitor breathing and consciousness'
    ]
  },
  {
    id: 2,
    title: 'Severe Bleeding',
    icon: ShieldExclamationIcon,
    steps: [
      'Apply direct pressure to the wound',
      'Use a clean cloth or sterile bandage',
      'Keep the injured area elevated',
      'Apply a tourniquet only as a last resort',
      'Seek immediate medical attention'
    ]
  },
  {
    id: 3,
    title: 'Malaria Emergency',
    icon: TruckIcon,
    steps: [
      'Check for high fever and severe headache',
      'Keep the person hydrated',
      'Use fever reduction methods',
      'Seek immediate medical attention',
      'Prepare for emergency transport'
    ]
  }
];

export default function Emergency() {
  const [selectedTip, setSelectedTip] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 overflow-x-hidden pt-20">
      {/* Emergency Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 shadow-lg">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <span className="flex rounded-lg bg-red-800 p-2 shadow-inner">
                <ExclamationTriangleIcon className="h-6 w-6 text-white animate-pulse" aria-hidden="true" />
              </span>
              <p className="ml-3 truncate font-medium text-white">
                <span className="md:hidden text-lg">For emergencies, call 119!</span>
                <span className="hidden md:inline text-lg">
                  If you are experiencing a medical emergency, call SAMU (119) immediately!
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="tel:119"
                className="flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-red-600 shadow-md hover:bg-red-50 transform hover:scale-105 transition-all duration-200 ease-in-out"
              >
                <PhoneIcon className="h-5 w-5 mr-2" />
                Call SAMU (119)
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Contacts Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-8">
            <PhoneIcon className="h-8 w-8 mr-3 text-red-600" />
            Emergency Contacts
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="group rounded-xl bg-white p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-100 relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(contact.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-gradient-to-br from-red-500 to-red-600 transform rotate-45 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{contact.name}</h3>
                    <p className="mt-2 text-sm text-gray-600">{contact.description}</p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                      contact.priority === 'high'
                        ? 'bg-red-100 text-red-800 ring-2 ring-red-500 ring-opacity-50'
                        : 'bg-yellow-100 text-yellow-800 ring-2 ring-yellow-500 ring-opacity-50'
                    }`}
                  >
                    {contact.priority === 'high' ? 'Emergency' : 'Important'}
                  </span>
                </div>
                <div className="mt-6">
                  <a
                    href={`tel:${contact.number}`}
                    className="inline-flex items-center justify-center w-full text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 rounded-lg px-4 py-3 transform transition-all duration-200 ease-in-out hover:scale-[1.02] shadow-md"
                  >
                    <PhoneIcon className="mr-2 h-5 w-5" />
                    {contact.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Facilities Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-8">
            <MapPinIcon className="h-8 w-8 mr-3 text-red-600" />
            Emergency Facilities
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {emergencyFacilities.map((facility) => (
              <div
                key={facility.id}
                className="rounded-xl bg-white p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-100"
              >
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{facility.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{facility.type}</p>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    <MapPinIcon className="mr-2 h-5 w-5 text-red-500" />
                    <span>{facility.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    <ClockIcon className="mr-2 h-5 w-5 text-red-500" />
                    <span>Estimated wait: {facility.waitTime}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    <PhoneIcon className="mr-2 h-5 w-5 text-red-500" />
                    <span>{facility.phone}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {facility.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${facility.phone}`}
                    className="flex items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-red-500 hover:to-red-600 transform hover:scale-[1.02] transition-all duration-200 ease-in-out"
                  >
                    <PhoneIcon className="mr-2 h-4 w-4" />
                    Call Now
                  </a>
                  <button 
                    className="flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transform hover:scale-[1.02] transition-all duration-200 ease-in-out"
                    onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(facility.address + ', Cameroon')}`, '_blank')}
                  >
                    <MapPinIcon className="mr-2 h-4 w-4" />
                    Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* First Aid Tips Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-8">
            <ShieldExclamationIcon className="h-8 w-8 mr-3 text-red-600" />
            Emergency First Aid Tips
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {firstAidTips.map((tip) => (
              <div
                key={tip.id}
                className={`rounded-xl bg-white p-6 shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-100 cursor-pointer ${
                  selectedTip === tip.id ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => setSelectedTip(selectedTip === tip.id ? null : tip.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <tip.icon className="h-7 w-7 text-red-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  {selectedTip === tip.id ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                {selectedTip === tip.id && (
                  <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-4">
                      {tip.steps.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600 ring-2 ring-red-500 ring-opacity-25">
                            {index + 1}
                          </span>
                          <span className="ml-3 text-sm text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedTip !== tip.id && (
                  <p className="mt-3 text-sm text-gray-500">Click to view emergency steps</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
