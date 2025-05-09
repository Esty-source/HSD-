import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, DocumentTextIcon, HeartIcon, HomeIcon, CalendarIcon, UserIcon, MagnifyingGlassIcon, ChevronRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function SimpleResources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'tips', name: 'Health Tips' },
    { id: 'guides', name: 'Medical Guides' },
    { id: 'education', name: 'Education' }
  ];
  
  const filterResources = () => {
    // In a real app, this would filter based on the activeCategory and searchQuery
    return true;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center">
          <Link to="/simple" className="mr-3">
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-800">Health Resources</h1>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="px-4 pb-2 overflow-x-auto no-scrollbar">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${activeCategory === category.id ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-4">
        <p className="text-sm text-gray-600 mb-4">
          Access important health information, guides, and educational materials.
        </p>
        
        <div className="space-y-4 mb-6">
          {/* Health Tips Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-red-100 text-red-700 mr-3">
                  <HeartIcon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">Health Tips</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Essential tips for maintaining good health and preventing common illnesses.
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 mt-0.5 text-red-500">•</span>
                  <span>Preventing Malaria: Essential Tips</span>
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 mt-0.5 text-red-500">•</span>
                  <span>Nutrition for Pregnant Women</span>
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 mt-0.5 text-red-500">•</span>
                  <span>Staying Hydrated in Hot Weather</span>
                </li>
              </ul>
              <Link to="/health-tips" className="flex items-center justify-between p-2 bg-red-50 rounded-lg text-red-700 text-sm font-medium">
                <span>View all health tips</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Medical Guides Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-blue-100 text-blue-700 mr-3">
                  <DocumentTextIcon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">Medical Guides</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Comprehensive guides on medical conditions and treatments.
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 mt-0.5 text-blue-500">•</span>
                  <span>Understanding Diabetes Management</span>
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 mt-0.5 text-blue-500">•</span>
                  <span>COVID-19 Vaccination Guide</span>
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 mt-0.5 text-blue-500">•</span>
                  <span>Managing Hypertension</span>
                </li>
              </ul>
              <Link to="/medical-guides" className="flex items-center justify-between p-2 bg-blue-50 rounded-lg text-blue-700 text-sm font-medium">
                <span>View all medical guides</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Educational Resources Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-green-100 text-green-700 mr-3">
                  <BookOpenIcon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">Educational Resources</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Educational materials to help you better understand health topics.
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 mt-0.5 text-green-500">•</span>
                  <span>Understanding Your Medical Tests</span>
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 mt-0.5 text-green-500">•</span>
                  <span>First Aid Basics</span>
                </li>
                <li className="flex items-start text-sm text-gray-600">
                  <span className="mr-2 mt-0.5 text-green-500">•</span>
                  <span>Mental Health Awareness</span>
                </li>
              </ul>
              <Link to="/educational-resources" className="flex items-center justify-between p-2 bg-green-50 rounded-lg text-green-700 text-sm font-medium">
                <span>View all educational resources</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Featured Resource Card */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-sm overflow-hidden text-white">
            <div className="p-4">
              <h3 className="text-base font-semibold mb-2">Featured: COVID-19 Information</h3>
              <p className="text-sm text-blue-100 mb-3">
                Latest updates, vaccination information, and prevention guidelines for COVID-19.
              </p>
              <Link to="/covid-info" className="flex items-center justify-between p-2 bg-white/20 rounded-lg text-white text-sm font-medium">
                <span>View COVID-19 resources</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="flex justify-around">
          <Link to="/simple" className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-blue-600">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link to="/simple-resources" className="flex flex-col items-center py-2 px-3 text-blue-600 font-medium">
            <DocumentTextIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Resources</span>
          </Link>
          
          <Link to="/simple-appointments" className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-blue-600">
            <CalendarIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Appointments</span>
          </Link>
          
          <Link to="/profile" className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-blue-600">
            <UserIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
