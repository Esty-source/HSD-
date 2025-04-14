import React, { useState } from 'react';
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
} from '@heroicons/react/24/outline';

const categories = [
  {
    id: 'articles',
    name: 'Medical Articles',
    icon: DocumentTextIcon,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'videos',
    name: 'Educational Videos',
    icon: VideoCameraIcon,
    color: 'bg-red-100 text-red-700',
  },
  {
    id: 'news',
    name: 'Health News',
    icon: NewspaperIcon,
    color: 'bg-green-100 text-green-700',
  },
  {
    id: 'research',
    name: 'Research Papers',
    icon: AcademicCapIcon,
    color: 'bg-purple-100 text-purple-700',
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
    <div className="w-full max-w-none">
      <div className="w-full bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Health Resources</h1>
          <p className="mt-2 text-sm text-gray-700">
            Access educational materials and health information
          </p>
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-blue-600 py-16">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Health Resources & Education
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-blue-100">
                Discover comprehensive health information, medical guides, and wellness tips from trusted healthcare professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Categories */}
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="relative mx-auto max-w-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm"
              placeholder="Search health topics, articles, and resources..."
            />
          </div>

          {/* Categories */}
          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                  className={`group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 shadow-sm ring-1 ring-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:ring-blue-200'
                  }`}
                >
                  <category.icon 
                    className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                      selectedCategory === category.id ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'
                    }`} 
                  />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Topics */}
          <div className="mt-12">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              Featured Health Topics
            </h2>
            <p className="mt-4 text-center text-lg text-gray-600">
              Explore our curated collection of health resources and educational materials
            </p>
          </div>

          {/* Resources Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              >
                {/* Resource Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const category = categories.find((cat) => cat.id === resource.category);
                      return category?.icon ? (
                        <category.icon className="h-5 w-5 text-gray-400" />
                      ) : null;
                    })()}
                    <span className="text-sm text-gray-500">
                      {categories.find((cat) => cat.id === resource.category)?.name}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    {resource.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-gray-600">{resource.description}</p>

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

                  {/* Read More Link */}
                  <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                    Read More
                    <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
