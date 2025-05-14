import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  NewspaperIcon,
  AcademicCapIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import MobileLayout from '../components/responsive/MobileLayout';
import { mockResources, resourceCategories } from '../lib/mockData';

// Map icon names to components
const iconMap = {
  HeartIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  NewspaperIcon,
  AcademicCapIcon,
};

export default function MobileResources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Filter resources based on search term and selected category
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured resources
  const featuredResources = mockResources.filter(resource => resource.featured);
  
  return (
    <MobileLayout title="Health Resources">
      {/* Search bar */}
      <div className="px-4 py-3 bg-white">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resources..."
            className="w-full py-2 pl-9 pr-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <button 
            onClick={() => setShowFilterModal(true)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      {/* Current filter indicator */}
      {selectedCategory !== 'all' && (
        <div className="px-4 py-2 bg-white border-b">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">Filtered by:</span>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
              resourceCategories.find(cat => cat.id === selectedCategory)?.color || 'bg-blue-100 text-blue-700'
            }`}>
              {resourceCategories.find(cat => cat.id === selectedCategory)?.icon && 
                React.createElement(iconMap[resourceCategories.find(cat => cat.id === selectedCategory).icon], { className: "h-3 w-3 mr-1" })}
              <span>{resourceCategories.find(cat => cat.id === selectedCategory)?.name || 'All'}</span>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="ml-1"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Featured Resources Section */}
      {selectedCategory === 'all' && searchTerm === '' && (
        <div className="px-4 py-3 bg-white border-b">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Featured</h2>
          <div className="space-y-3">
            {featuredResources.map((resource) => (
              <Link
                key={resource.id}
                to={`/resources/${resource.id}`}
                className="block"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-32 relative bg-gray-100">
                    <img
                      src={resource.imageUrl || 'https://via.placeholder.com/300x200?text=Health+Resource'}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(resource.title);
                      }}
                    />
                    <div className="absolute top-0 left-0 bg-blue-600 text-white px-2 py-1 text-xs font-medium">
                      Featured
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center mb-1">
                      {resourceCategories.find(cat => cat.id === resource.category)?.icon && (
                        <div className={`p-1 rounded-full ${resourceCategories.find(cat => cat.id === resource.category)?.color} mr-1.5`}>
                          {React.createElement(iconMap[resourceCategories.find(cat => cat.id === resource.category).icon], { className: "h-3 w-3" })}
                        </div>
                      )}
                      <span className="text-xs text-gray-600">
                        {resourceCategories.find(cat => cat.id === resource.category)?.name}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{resource.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{resource.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* All Resources Section */}
      <div className="px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          {selectedCategory === 'all' ? 'All Resources' : `${resourceCategories.find(cat => cat.id === selectedCategory)?.name || 'Resources'}`}
        </h2>
        <div className="space-y-3">
          {filteredResources.map((resource) => (
            <Link
              key={resource.id}
              to={`/resources/${resource.id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-32 relative bg-gray-100">
                  <img
                    src={resource.imageUrl || 'https://via.placeholder.com/300x200?text=Health+Resource'}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(resource.title);
                    }}
                  />
                  {resource.featured && (
                    <div className="absolute top-0 left-0 bg-blue-600 text-white px-2 py-1 text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center mb-1">
                    {resourceCategories.find(cat => cat.id === resource.category)?.icon && (
                      <div className={`p-1 rounded-full ${resourceCategories.find(cat => cat.id === resource.category)?.color} mr-1.5`}>
                        {React.createElement(iconMap[resourceCategories.find(cat => cat.id === resource.category).icon], { className: "h-3 w-3" })}
                      </div>
                    )}
                    <span className="text-xs text-gray-600">
                      {resourceCategories.find(cat => cat.id === resource.category)?.name}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{resource.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{resource.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filter Resources</h3>
              <button onClick={() => setShowFilterModal(false)}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setShowFilterModal(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedCategory === 'all' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                All Resources
              </button>
              {resourceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setShowFilterModal(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    selectedCategory === category.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-1 rounded-full ${category.color} mr-2`}>
                    {React.createElement(iconMap[category.icon], { className: "h-4 w-4" })}
                  </div>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  );
}
