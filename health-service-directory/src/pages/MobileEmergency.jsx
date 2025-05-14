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
import MobileLayout from '../components/responsive/MobileLayout';

const emergencyContacts = [
  { id: 1, name: 'SAMU Cameroon', number: '119', description: 'Emergency Medical Services', priority: 'high' },
  { id: 2, name: 'Police', number: '117', description: 'Police Emergency Services', priority: 'high' },
  { id: 3, name: 'Fire Brigade', number: '118', description: 'Fire Emergency Services', priority: 'high' },
  { id: 4, name: 'National Emergency Number', number: '112', description: 'General Emergency Services', priority: 'high' },
  { id: 5, name: 'Red Cross Cameroon', number: '+237 222-22-31-69', description: 'Medical Emergency & Blood Services', priority: 'medium' },
  { id: 6, name: 'Anti-Poison Center', number: '+237 677-53-56-33', description: 'Poison Control Center', priority: 'medium' }
];

const emergencyFacilities = [
  { id: 1, name: 'Yaoundé Central Hospital', type: 'Emergency & Trauma Center', address: 'Rue Henri Dunant, Yaoundé', region: 'Centre Region', waitTime: '10-15 minutes', phone: '+237 222-23-10-25', services: ['Trauma Center', 'Emergency Surgery', 'Intensive Care'] },
  { id: 2, name: 'Laquintinie Hospital', type: 'Emergency Services', address: 'Boulevard de la Liberté, Douala', region: 'Littoral Region', waitTime: '15-20 minutes', phone: '+237 233-42-75-78', services: ['Emergency Room', 'Critical Care', 'Pediatric Emergency'] },
  { id: 3, name: 'Bamenda Regional Hospital', type: 'Emergency Department', address: 'Hospital Street, Bamenda', region: 'North West Region', waitTime: '10-15 minutes', phone: '+237 233-36-13-28', services: ['Emergency Care', 'Surgical Services', 'Ambulance'] }
];

const firstAidTips = [
  { id: 1, title: 'Heart Attack', icon: HeartIcon, steps: [ 'Call emergency services immediately (119)', 'Have the person sit or lie down', 'Loosen any tight clothing', 'Ask if they take heart medication', 'Monitor breathing and consciousness' ] },
  { id: 2, title: 'Severe Bleeding', icon: ShieldExclamationIcon, steps: [ 'Apply direct pressure to the wound', 'Use a clean cloth or sterile bandage', 'Keep the injured area elevated', 'Apply a tourniquet only as a last resort', 'Seek immediate medical attention' ] },
  { id: 3, title: 'Malaria Emergency', icon: TruckIcon, steps: [ 'Check for high fever and severe headache', 'Keep the person hydrated', 'Use fever reduction methods', 'Seek immediate medical attention', 'Prepare for emergency transport' ] }
];

export default function MobileEmergency() {
  const [selectedTip, setSelectedTip] = useState(null);

  return (
    <MobileLayout title="Emergency">
      <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-blue-50 pb-16">
        {/* Emergency Alert Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 shadow-lg px-4 py-4 flex items-center gap-3">
          <span className="flex rounded-lg bg-red-800 p-2 shadow-inner">
            <ExclamationTriangleIcon className="h-6 w-6 text-white animate-pulse" aria-hidden="true" />
          </span>
          <p className="font-medium text-white text-base flex-1">
            For emergencies, call <span className="font-bold">119</span>!
          </p>
          <a href="tel:119" className="rounded-md bg-white px-4 py-2 text-base font-semibold text-red-600 shadow hover:bg-red-50 active:scale-95 transition">Call</a>
        </div>

        {/* Emergency Contacts */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PhoneIcon className="h-6 w-6 text-red-600" /> Emergency Contacts
          </h2>
          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="rounded-xl bg-white p-4 shadow flex flex-col gap-2 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-xs text-gray-500">{contact.description}</p>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${contact.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{contact.priority === 'high' ? 'Emergency' : 'Important'}</span>
                </div>
                <a href={`tel:${contact.number}`} className="mt-2 flex items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-base font-semibold text-white shadow hover:from-red-500 hover:to-red-600 active:scale-95 transition">
                  <PhoneIcon className="mr-2 h-5 w-5" /> {contact.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Facilities */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPinIcon className="h-6 w-6 text-red-600" /> Emergency Facilities
          </h2>
          <div className="space-y-4">
            {emergencyFacilities.map((facility) => (
              <div key={facility.id} className="rounded-xl bg-white p-4 shadow border border-gray-100">
                <div className="border-b border-gray-100 pb-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
                  <p className="text-xs text-gray-500">{facility.type}</p>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center"><MapPinIcon className="mr-1 h-4 w-4 text-red-500" /> {facility.address}</div>
                  <div className="flex items-center"><ClockIcon className="mr-1 h-4 w-4 text-red-500" /> Estimated wait: {facility.waitTime}</div>
                  <div className="flex items-center"><PhoneIcon className="mr-1 h-4 w-4 text-red-500" /> {facility.phone}</div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {facility.services.map((service, idx) => (
                    <span key={idx.toString()} className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{String(service)}</span>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <a href={`tel:${facility.phone}`} className="flex-1 flex items-center justify-center rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-2 py-2 text-xs font-semibold text-white shadow hover:from-red-500 hover:to-red-600 active:scale-95 transition"><PhoneIcon className="mr-1 h-4 w-4" /> Call</a>
                  <button className="flex-1 flex items-center justify-center rounded-lg bg-white px-2 py-2 text-xs font-semibold text-gray-900 shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-50 active:scale-95 transition" onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(facility.address + ', Cameroon')}`, '_blank')}><MapPinIcon className="mr-1 h-4 w-4" /> Directions</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* First Aid Tips */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldExclamationIcon className="h-6 w-6 text-red-600" /> Emergency First Aid Tips
          </h2>
          <div className="space-y-4">
            {firstAidTips.map((tip) => (
              <div key={tip.id} className={`rounded-xl bg-white p-4 shadow border border-gray-100 cursor-pointer ${selectedTip === tip.id ? 'ring-2 ring-red-500' : ''}`} onClick={() => setSelectedTip(selectedTip === tip.id ? null : tip.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {tip.icon && React.createElement(tip.icon, { className: "h-6 w-6 text-red-600 mr-2" })}
                    <h3 className="text-base font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  {selectedTip === tip.id ? <ChevronUpIcon className="h-5 w-5 text-gray-400" /> : <ChevronDownIcon className="h-5 w-5 text-gray-400" />}
                </div>
                {selectedTip === tip.id && (
                  <div className="mt-3 bg-gray-50 rounded-lg p-3">
                    <ul className="space-y-2">
                      {tip.steps.map((step, idx) => (
                        <li key={idx.toString()} className="flex items-start">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-semibold text-red-600 ring-2 ring-red-500 ring-opacity-25">{idx + 1}</span>
                          <span className="ml-2 text-xs text-gray-700">{String(step)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedTip !== tip.id && <p className="mt-2 text-xs text-gray-500">Tap to view emergency steps</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
} 