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
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { useViewport } from '../components/responsive/ViewportProvider';
import MobileResources from './MobileResources';

// Mock data for resources
const resourceCategories = [
  {
    id: 'health-tips',
    name: 'Health Tips',
    description: 'General health advice and wellness tips',
    icon: HeartIcon,
    color: 'bg-red-100 text-red-700',
  },
  {
    id: 'medical-guides',
    name: 'Medical Guides',
    description: 'Comprehensive guides on medical conditions',
    icon: DocumentTextIcon,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'educational-videos',
    name: 'Educational Videos',
    description: 'Video content on health topics',
    icon: VideoCameraIcon,
    color: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'news',
    name: 'Health News',
    description: 'Latest health news and updates',
    icon: NewspaperIcon,
    color: 'bg-green-100 text-green-700',
  },
  {
    id: 'research',
    name: 'Research Papers',
    description: 'Academic research and studies',
    icon: AcademicCapIcon,
    color: 'bg-yellow-100 text-yellow-700',
  },
];

const mockResources = [
  {
    id: 1,
    title: 'Preventing Malaria: Essential Tips',
    category: 'health-tips',
    description: 'Learn how to protect yourself and your family from malaria with these essential prevention tips.',
    date: '2024-04-15',
    author: 'Dr. Ngono Marie',
    imageUrl: 'https://images.unsplash.com/photo-1584118624012-df056829fbd0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true,
  },
  {
    id: 2,
    title: 'Understanding Diabetes Management',
    category: 'medical-guides',
    description: 'A comprehensive guide to managing diabetes, including diet, exercise, and medication.',
    date: '2024-04-10',
    author: 'Dr. Fon Peter',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: false,
  },
  {
    id: 3,
    title: 'Nutrition for Pregnant Women',
    category: 'health-tips',
    description: 'Essential nutritional advice for expectant mothers to ensure a healthy pregnancy.',
    date: '2024-04-05',
    author: 'Dr. Biya Rose',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: true,
  },
  {
    id: 4,
    title: 'COVID-19 Vaccination: What You Need to Know',
    category: 'medical-guides',
    description: 'Important information about COVID-19 vaccines, including efficacy, side effects, and availability.',
    date: '2024-03-28',
    author: 'Dr. Kamto James',
    imageUrl: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: false,
  },
  {
    id: 5,
    title: 'Understanding Hypertension',
    category: 'educational-videos',
    description: 'A video guide explaining hypertension, its causes, symptoms, and management strategies.',
    date: '2024-03-20',
    author: 'Dr. Ngono Marie',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: false,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 6,
    title: 'New Breakthrough in Malaria Treatment',
    category: 'news',
    description: 'Recent research shows promising results for a new malaria treatment approach.',
    date: '2024-03-15',
    author: 'Health Service Directory Team',
    imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: false,
  },
  {
    id: 7,
    title: 'Effects of Climate Change on Public Health in Cameroon',
    category: 'research',
    description: 'Academic research on how climate change is affecting public health outcomes in Cameroon.',
    date: '2024-03-10',
    author: 'Dr. Fon Peter',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: false,
  },
  {
    id: 8,
    title: 'Healthy Eating on a Budget',
    category: 'health-tips',
    description: 'Practical tips for maintaining a nutritious diet while managing costs.',
    date: '2024-03-05',
    author: 'Nutritionist Sarah Nkeng',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: false,
  },
];

export default function Resources() {
  // Use viewport hook to determine if we're on mobile
  const { isMobile } = useViewport();
  
  // If on mobile, render the mobile-optimized version
  if (isMobile) {
    return <MobileResources />;
  }
  
  // Desktop version continues below
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
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
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl shadow-xl p-6 text-white">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Health Resources</h1>
              <p className="mt-2 text-blue-100">
                Educational materials and health information to help you stay informed
              </p>
            </div>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search resources by title, description, or author..."
                  className="block w-full rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Resources
              </button>
              
              {resourceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                    selectedCategory === category.id
                      ? `${category.color} shadow-sm`
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Featured Resources */}
        {selectedCategory === 'all' && searchTerm === '' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
                >
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={resource.imageUrl}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=Health+Resource';
                      }}
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center mb-2">
                      {resourceCategories.find(cat => cat.id === resource.category)?.icon && (
                        <div className={`p-2 rounded-full ${resourceCategories.find(cat => cat.id === resource.category)?.color} mr-2`}>
                          {React.createElement(resourceCategories.find(cat => cat.id === resource.category).icon, { className: "h-5 w-5" })}
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-600">
                        {resourceCategories.find(cat => cat.id === resource.category)?.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-sm text-gray-500">
                        By {resource.author} • {resource.date}
                      </div>
                      <Link
                        to={`/resources/${resource.id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        Read more <ChevronRightIcon className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* All Resources */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {selectedCategory === 'all' 
              ? 'All Resources' 
              : `${resourceCategories.find(cat => cat.id === selectedCategory)?.name}`}
          </h2>
          
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full"
                >
                  <div className="h-48 relative">
                    <img
                      src={resource.imageUrl}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=Health+Resource';
                      }}
                    />
                    {resource.category === 'educational-videos' && (
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="bg-white bg-opacity-80 rounded-full p-3">
                          <VideoCameraIcon className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center mb-2">
                      {resourceCategories.find(cat => cat.id === resource.category)?.icon && (
                        <div className={`p-1.5 rounded-full ${resourceCategories.find(cat => cat.id === resource.category)?.color} mr-2`}>
                          {React.createElement(resourceCategories.find(cat => cat.id === resource.category).icon, { className: "h-4 w-4" })}
                        </div>
                      )}
                      <span className="text-xs font-medium text-gray-600">
                        {resourceCategories.find(cat => cat.id === resource.category)?.name}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">{resource.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-xs text-gray-500">
                        {resource.date}
                      </div>
                      <div className="flex space-x-2">
                        <button className="inline-flex items-center text-gray-600 hover:text-gray-800">
                          <ArrowDownTrayIcon className="h-4 w-4" />
                        </button>
                        <Link
                          to={`/resources/${resource.id}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          Read more <ChevronRightIcon className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
                <BookOpenIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No resources found</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                {searchTerm
                  ? `No resources match your search for "${searchTerm}". Try different keywords or clear your search.`
                  : `No resources found in the selected category. Try selecting a different category.`}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
