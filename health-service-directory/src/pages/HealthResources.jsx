import React, { useState, useEffect } from 'react';
import {
  BookOpenIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  NewspaperIcon,
  AcademicCapIcon,
  HeartIcon,
  BoltIcon,
  BeakerIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const categories = [
  {
    id: 'articles',
    name: 'Medical Articles',
    icon: DocumentTextIcon,
    color: 'bg-blue-100 text-blue-700',
    gradient: 'from-blue-500 to-blue-700',
    description: 'In-depth articles on health topics written by medical professionals',
  },
  {
    id: 'videos',
    name: 'Educational Videos',
    icon: VideoCameraIcon,
    color: 'bg-red-100 text-red-700',
    gradient: 'from-red-500 to-red-700',
    description: 'Visual guides and educational content on health and wellness',
  },
  {
    id: 'news',
    name: 'Health News',
    icon: NewspaperIcon,
    color: 'bg-green-100 text-green-700',
    gradient: 'from-green-500 to-green-700',
    description: 'Latest updates and developments in healthcare and medicine',
  },
  {
    id: 'research',
    name: 'Research Papers',
    icon: AcademicCapIcon,
    color: 'bg-purple-100 text-purple-700',
    gradient: 'from-purple-500 to-purple-700',
    description: 'Academic research and scientific studies on medical advancements',
  },
];

const mockResources = [
  {
    id: 1,
    title: 'Understanding Heart Health: A Comprehensive Guide',
    category: 'articles',
    author: 'Dr. Sarah Johnson',
    date: '2024-02-01',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Learn about the latest research in cardiovascular health and preventive measures.',
    tags: ['Cardiology', 'Prevention', 'Lifestyle'],
  },
  {
    id: 2,
    title: 'Latest Breakthroughs in Cancer Research',
    category: 'research',
    author: 'Dr. Michael Chen',
    date: '2024-01-28',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Exploring new treatment methods and promising research in oncology.',
    tags: ['Cancer', 'Research', 'Treatment'],
  },
  {
    id: 3,
    title: 'Mental Health in the Digital Age',
    category: 'videos',
    author: 'Dr. Emily Wilson',
    date: '2024-01-25',
    duration: '12 minutes',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Understanding the impact of technology on mental wellness.',
    tags: ['Mental Health', 'Technology', 'Wellness'],
  },
  {
    id: 4,
    title: 'COVID-19: Latest Updates and Guidelines',
    category: 'news',
    author: 'Health Organization',
    date: '2024-02-02',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Stay informed about the latest developments in COVID-19 research and guidelines.',
    tags: ['COVID-19', 'Public Health', 'Guidelines'],
  },
];

const featuredTopics = [
  { name: 'Heart Health', icon: HeartIcon },
  { name: 'Mental Wellness', icon: BoltIcon },
  { name: 'Medical Research', icon: BeakerIcon },
  { name: 'Healthcare News', icon: NewspaperIcon },
];

export default function HealthResources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  
  const handleViewResource = (resource) => {
    setSelectedResource(resource);
    setShowResourceModal(true);
  };

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === '' || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-none bg-gradient-to-b from-blue-50 to-white min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 py-16 shadow-xl">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,117.3C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Health Resources
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
              Access trusted health information, educational materials, and the latest research to support your health journey.
            </p>
            
            {/* Search Bar */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="flex rounded-full shadow-lg">
                <div className="relative flex flex-grow items-stretch">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-full border-0 py-4 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-white sm:text-sm"
                    placeholder="Search for health resources..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
        {/* Categories Section */}
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div 
                key={category.id}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? '' : category.id)}
                className={`group cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl ${selectedCategory === category.id ? 'ring-4 ring-blue-500' : ''}`}
              >
                <div className={`bg-gradient-to-r ${category.gradient} p-6`}>
                  <category.icon className="h-8 w-8 text-white" />
                  <h3 className="mt-3 text-lg font-semibold text-white">{category.name}</h3>
                  <p className="mt-2 text-sm text-white/80">{category.description}</p>
                </div>
                <div className="bg-white p-4">
                  <span className="inline-flex items-center text-sm font-medium text-blue-600">
                    {selectedCategory === category.id ? 'Selected' : 'Browse Resources'}
                    <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Featured Topics */}
          <div className="mt-16">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Featured Health Topics
              </h2>
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory('')}
                  className="flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                >
                  <XMarkIcon className="mr-1 h-4 w-4" />
                  Clear Filter
                </button>
              )}
            </div>
            <p className="mt-4 text-lg text-gray-600">
              Explore our curated collection of health resources and educational materials
            </p>
          </div>

          {/* Resources Grid */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => {
                const category = categories.find((cat) => cat.id === resource.category);
                return (
                  <div
                    key={resource.id}
                    className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                  >
                    {/* Resource Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={resource.image}
                        alt={resource.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                      <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
                        {category?.name}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                        {resource.title}
                      </h3>
                      
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <UserIcon className="mr-1 h-4 w-4 text-gray-400" />
                          {resource.author}
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="mr-1 h-4 w-4 text-gray-400" />
                          {resource.date}
                        </div>
                      </div>
                      
                      <p className="mt-3 flex-grow line-clamp-2 text-gray-600">{resource.description}</p>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More Button */}
                      <button
                        onClick={() => handleViewResource(resource)}
                        className="mt-5 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Read More
                        <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No resources found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resource Modal */}
      {showResourceModal && selectedResource && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowResourceModal(false)}></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                  onClick={() => setShowResourceModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={selectedResource.image}
                  alt={selectedResource.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/0" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const category = categories.find((cat) => cat.id === selectedResource.category);
                      return category?.icon ? (
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${category.color}`}>
                          <category.icon className="mr-1 h-4 w-4" />
                          {category.name}
                        </span>
                      ) : null;
                    })()}
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-white">{selectedResource.title}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <UserIcon className="mr-1 h-4 w-4 text-gray-400" />
                      <span className="font-medium">{selectedResource.author}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-1 h-4 w-4 text-gray-400" />
                      {selectedResource.date}
                    </div>
                    {selectedResource.readTime && (
                      <div className="flex items-center">
                        <ClockIcon className="mr-1 h-4 w-4 text-gray-400" />
                        {selectedResource.readTime}
                      </div>
                    )}
                    {selectedResource.duration && (
                      <div className="flex items-center">
                        <ClockIcon className="mr-1 h-4 w-4 text-gray-400" />
                        {selectedResource.duration}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 prose prose-blue max-w-none">
                  <p className="text-gray-700">{selectedResource.description}</p>
                  
                  {/* Sample content based on resource type */}
                  {selectedResource.category === 'articles' && (
                    <>
                      <h3>Key Highlights</h3>
                      <ul>
                        <li>Understanding the importance of heart health in overall wellness</li>
                        <li>Latest research findings on cardiovascular disease prevention</li>
                        <li>Lifestyle modifications that can significantly improve heart health</li>
                        <li>Dietary recommendations from leading cardiologists</li>
                      </ul>
                      <p>This comprehensive guide provides evidence-based information on maintaining optimal heart health through preventive measures and lifestyle adjustments.</p>
                    </>
                  )}
                  
                  {selectedResource.category === 'videos' && (
                    <>
                      <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-gray-100">
                        <div className="flex h-full items-center justify-center">
                          <VideoCameraIcon className="h-16 w-16 text-gray-400" />
                          <span className="ml-2 text-gray-500">Video player placeholder</span>
                        </div>
                      </div>
                      <h3 className="mt-4">Video Transcript Highlights</h3>
                      <p>In this educational video, Dr. Emily Wilson discusses the complex relationship between digital technology usage and mental health outcomes...</p>
                    </>
                  )}
                  
                  {selectedResource.category === 'research' && (
                    <>
                      <h3>Abstract</h3>
                      <p className="italic">Recent advancements in cancer treatment methodologies have shown promising results in clinical trials. This paper reviews the latest breakthroughs in oncology research and their potential implications for patient care.</p>
                      <h3>Methodology</h3>
                      <p>A systematic review of clinical trials published between 2020-2024 was conducted, focusing on novel treatment approaches for various cancer types.</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Save to Favorites
                </button>
                <button
                  type="button"
                  onClick={() => setShowResourceModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
