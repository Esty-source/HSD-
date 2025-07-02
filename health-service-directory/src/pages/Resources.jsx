import React, { useState } from 'react';
import toast from 'react-hot-toast';
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
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import ResourceModal from '../components/resources/ResourceModal';

// Resource categories
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

// Mock resources data
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
    author: 'Prof. Nkengasong John',
    imageUrl: '/images/doctors/group-african-doctors-students-near-medical-university-outdoor.jpg',
    featured: false,
  },
  {
    id: 8,
    title: 'Healthy Eating on a Budget',
    category: 'health-tips',
    description: 'Tips for maintaining a nutritious diet without breaking the bank.',
    date: '2024-03-05',
    author: 'Nutritionist Sarah Nkeng',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    featured: false,
  },
];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter resources based on search term and selected category
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
                        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
                        
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const featuredResources = mockResources.filter(resource => resource.featured);
  
  const openResourceModal = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };
  
  const closeResourceModal = () => {
    setIsModalOpen(false);
  };
  
  const handleDownload = (resource) => {
    // Create a text file with the resource content
    const textContent = `
${resource.title}

Category: ${resourceCategories.find(cat => cat.id === resource.category)?.name || resource.category}
Author: ${resource.author}
Date: ${resource.date}

Description:
${resource.description}

For more information, please visit our Health Service Directory.
    `;
    
    // Create a blob and download it
    const element = document.createElement('a');
    const file = new Blob([textContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${resource.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success(`Downloaded "${resource.title}" as text file`);
  };
  
  // Function to render expanded content based on resource category
  const renderExpandedContent = (resource) => {
    return (
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <div className="prose prose-blue max-w-none">
          <h4 className="text-lg font-semibold">{resource.title}</h4>
          <p className="text-sm text-gray-600">By {resource.author} • {resource.date}</p>
          <p className="text-sm text-gray-600">By {resource.author} Ã¢â‚¬Â¢ {resource.date}</p>
          
          <p className="mt-4">{resource.description}</p>
          
          {resource.category === 'health-tips' && (
            <>
              <h5 className="font-medium mt-4">Key Health Tips:</h5>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Maintain a balanced diet rich in fruits and vegetables</li>
                <li>Stay hydrated by drinking at least 8 glasses of water daily</li>
                <li>Exercise regularly, aiming for at least 30 minutes of moderate activity most days</li>
                <li>Get adequate sleep, typically 7-9 hours for adults</li>
                <li>Manage stress through relaxation techniques like meditation or deep breathing</li>
              </ul>
            </>
          )}
          
          {resource.category === 'medical-guides' && (
            <>
              <h5 className="font-medium mt-4">Important Medical Information:</h5>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Always consult with a healthcare professional before starting any new treatment</li>
                <li>Keep a record of your symptoms and medication history</li>
                <li>Follow prescribed medication schedules strictly</li>
                <li>Be aware of potential side effects and when to seek emergency care</li>
                <li>Schedule regular check-ups for preventive care</li>
              </ul>
            </>
          )}
          
          {resource.category === 'educational-videos' && resource.videoUrl && (
            <div className="mt-4">
              <h5 className="font-medium">Watch Video:</h5>
              <div className="mt-2 aspect-w-16 aspect-h-9">
                <a 
                  href={resource.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <VideoCameraIcon className="h-5 w-5 mr-2" />
                  Open video in new tab
                </a>
              </div>
            </div>
          )}
          
          {resource.category === 'news' && (
            <>
              <h5 className="font-medium mt-4">Recent Developments:</h5>
              <p>The Ministry of Health has announced an expansion of healthcare services to include more rural areas. Mobile health units will be deployed to remote villages, ensuring that all citizens have access to basic healthcare regardless of their location.</p>
            </>
          )}
          
          {resource.category === 'research' && (
            <>
              <h5 className="font-medium mt-4">Key Findings:</h5>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>A 1.5Ã‚Â°C increase in average temperature was associated with a 12% rise in malaria cases in northern regions</li>
                <li>Changing rainfall patterns have led to increased breeding grounds for disease vectors in previously unaffected areas</li>
                <li>Heat-related illnesses have increased by 23% over the study period, particularly affecting elderly populations</li>
              </ul>
            </>
          )}
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handleDownload(resource)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Download Full Content
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Function to render a resource card
  const renderResourceCard = (resource) => {
    return (
      <div key={resource.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
        <div className="h-48 relative bg-gray-100">
          <img
            src={resource.imageUrl || '/images/resource-placeholder.png'}
            alt={resource.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/resource-placeholder.png';
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
              <button 
                onClick={() => handleDownload(resource)}
                className="inline-flex items-center text-gray-600 hover:text-gray-800"
                aria-label="Download resource"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => openResourceModal(resource)}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Read more
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const categories = [
    {
      title: 'Health Articles',
      description: 'Expert-written articles on various health topics',
      icon: BookOpenIcon,
      articles: [
        {
          title: 'Understanding Your Health Insurance',
          excerpt: 'A comprehensive guide to navigating your health insurance coverage.',
          readTime: '5 min read'
        },
        {
          title: 'Preventive Care Tips',
          excerpt: 'Learn about important preventive measures for maintaining good health.',
          readTime: '4 min read'
        },
        {
          title: 'Managing Chronic Conditions',
          excerpt: 'Expert advice on living well with chronic health conditions.',
          readTime: '6 min read'
        }
      ]
    },
    {
      title: 'Wellness Tips',
      description: 'Daily tips for maintaining a healthy lifestyle',
      icon: HeartIcon,
      articles: [
        {
          title: 'Healthy Eating Habits',
          excerpt: 'Simple changes to improve your diet and overall health.',
          readTime: '3 min read'
        },
        {
          title: 'Exercise Routines',
          excerpt: 'Effective workout routines for different fitness levels.',
          readTime: '4 min read'
        },
        {
          title: 'Stress Management',
          excerpt: 'Techniques for managing stress in your daily life.',
          readTime: '5 min read'
        }
      ]
    },
    {
      title: 'Safety Guidelines',
      description: 'Important health and safety information',
      icon: ShieldCheckIcon,
      articles: [
        {
          title: 'Emergency Preparedness',
          excerpt: 'How to prepare for medical emergencies.',
          readTime: '5 min read'
        },
        {
          title: 'Medication Safety',
          excerpt: 'Best practices for medication management.',
          readTime: '4 min read'
        },
        {
          title: 'Home Safety Tips',
          excerpt: 'Creating a safe environment for your family.',
          readTime: '3 min read'
        }
      ]
    },
    {
      title: 'Community Support',
      description: 'Resources for community health and support',
      icon: UserGroupIcon,
      articles: [
        {
          title: 'Support Groups',
          excerpt: 'Find local support groups for various health conditions.',
          readTime: '4 min read'
        },
        {
          title: 'Community Programs',
          excerpt: 'Health and wellness programs in your community.',
          readTime: '3 min read'
        },
        {
          title: 'Volunteer Opportunities',
          excerpt: 'Ways to get involved in community health initiatives.',
          readTime: '5 min read'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Health Resources
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Access reliable health information, wellness tips, and community resources to support your health journey.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources by title or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
              />
            </div>
            <select
              className="w-full md:w-64 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {resourceCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Resources Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredResources.map(resource => (
            <div key={resource.id} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img src={resource.imageUrl} alt={resource.title} className="w-full h-48 object-cover rounded-t-xl" onError={e => { e.target.onerror = null; e.target.src = '/images/resource-placeholder.png'; }} />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800 border border-blue-200 shadow-sm`}>
                    {resourceCategories.find(cat => cat.id === resource.category)?.name || resource.category}
                  </span>
                  <span className="text-xs text-gray-400">{resource.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                <button
                  onClick={() => openResourceModal(resource)}
                  className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Read More
                  <ChevronRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Resources Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
              <img src={resource.imageUrl} alt={resource.title} className="w-full h-40 object-cover rounded-t-xl" onError={e => { e.target.onerror = null; e.target.src = '/images/resource-placeholder.png'; }} />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm`}>
                    {resourceCategories.find(cat => cat.id === resource.category)?.name || resource.category}
                  </span>
                  <span className="text-xs text-gray-400">{resource.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                <button
                  onClick={() => openResourceModal(resource)}
                  className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Read More
                  <ChevronRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Stay informed about your health</span>
            <span className="block text-blue-200">Subscribe to our newsletter for the latest health tips and updates.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Modal */}
      <ResourceModal
        isOpen={isModalOpen}
        onClose={closeResourceModal}
        resource={selectedResource}
      />
    </div>
  );
};

export default Resources;

