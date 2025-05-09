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
                React.createElement(resourceCategories.find(cat => cat.id === selectedCategory).icon, { className: "h-3 w-3 mr-1" })}
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
                          {React.createElement(resourceCategories.find(cat => cat.id === resource.category).icon, { className: "h-3 w-3" })}
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
      
      {/* All Resources */}
      <div className="p-4 pb-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          {selectedCategory === 'all' 
            ? 'All Resources' 
            : `${resourceCategories.find(cat => cat.id === selectedCategory)?.name}`}
        </h2>
        
        {filteredResources.length > 0 ? (
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <Link
                key={resource.id}
                to={`/resources/${resource.id}`}
                className="block"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex">
                  <div className="w-1/3 h-24">
                    <div className="relative h-full">
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
                          <div className="bg-white bg-opacity-80 rounded-full p-1.5">
                            <VideoCameraIcon className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-2/3 p-3">
                    <div className="flex items-center mb-1">
                      {resourceCategories.find(cat => cat.id === resource.category)?.icon && (
                        <div className={`p-1 rounded-full ${resourceCategories.find(cat => cat.id === resource.category)?.color} mr-1.5`}>
                          {React.createElement(resourceCategories.find(cat => cat.id === resource.category).icon, { className: "h-3 w-3" })}
                        </div>
                      )}
                      <span className="text-xs text-gray-600">
                        {resourceCategories.find(cat => cat.id === resource.category)?.name}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{resource.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{resource.date}</span>
                      <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <BookOpenIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-base font-medium text-gray-900">No resources found</h3>
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
      
      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full p-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filter Resources</h3>
              <button onClick={() => setShowFilterModal(false)} className="p-1">
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setShowFilterModal(false);
                }}
                className={`w-full flex items-center p-3 rounded-lg transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'bg-gray-50 text-gray-700'
                }`}
              >
                <BookOpenIcon className="h-5 w-5 mr-3" />
                <span>All Resources</span>
              </button>
              
              {resourceCategories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowFilterModal(false);
                    }}
                    className={`w-full flex items-center p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? `${category.color} shadow-sm`
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    <CategoryIcon className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <span className="block font-medium">{category.name}</span>
                      <span className="text-xs">{category.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Add styles for animations */}
      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </MobileLayout>
  );
}
