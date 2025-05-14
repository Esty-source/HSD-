import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CalendarIcon,
  UserIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  BookmarkIcon,
  VideoCameraIcon,
  HeartIcon,
  NewspaperIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { useViewport } from '../components/responsive/ViewportProvider';
import toast from 'react-hot-toast';
import { mockResources, resourceCategories } from '../lib/mockData';

// Map icon names to components
const iconMap = {
  HeartIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  NewspaperIcon,
  AcademicCapIcon,
};

export default function ResourceDetail() {
  const { resourceId } = useParams();
  const { isMobile } = useViewport();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching the resource
    setLoading(true);
    try {
      // Find the resource in our mock data
      const foundResource = mockResources.find(r => r.id.toString() === resourceId);
      
      if (foundResource) {
        setResource(foundResource);
        setLoading(false);
      } else {
        setError('Resource not found');
        setLoading(false);
      }
    } catch (err) {
      setError('Error loading resource');
      setLoading(false);
    }
  }, [resourceId]);

  const handleDownload = () => {
    // In a real app, this would download the actual resource file
    // For now, we'll just show a toast notification
    toast.success(`Downloading "${resource?.title}" as PDF`);
    
    // Create a dummy download for demo purposes
    const element = document.createElement('a');
    const file = new Blob(
      [resource?.description || 'Sample content for download'], 
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${resource?.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    // For now, we'll just copy the URL to clipboard
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success('Link copied to clipboard'))
      .catch(() => toast.error('Failed to copy link'));
  };

  const handleBookmark = () => {
    // In a real app, this would save the resource to bookmarks
    toast.success(`${resource?.title} added to bookmarks`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/resources" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
            <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Resources
          </Link>
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Resource Not Found</h2>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the resource you're looking for. It may have been moved or deleted.
            </p>
            <Link
              to="/resources"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse All Resources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Find the category for this resource
  const category = resourceCategories.find(cat => cat.id === resource.category);
  const IconComponent = category ? iconMap[category.icon] : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link to="/resources" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Resources
        </Link>
        
        {/* Main content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Resource header */}
          <div className="relative h-64 sm:h-80 bg-gray-900">
            <img
              src={resource.imageUrl}
              alt={resource.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/1200x600?text=Health+Resource';
              }}
            />
            {resource.category === 'educational-videos' && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <button className="bg-white bg-opacity-80 rounded-full p-6 hover:bg-opacity-100 transition-all">
                  <VideoCameraIcon className="h-12 w-12 text-blue-600" />
                </button>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              {category && IconComponent && (
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-full ${category.color} mr-2`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {category.name}
                  </span>
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{resource.title}</h1>
            </div>
          </div>
          
          {/* Resource metadata */}
          <div className="border-b border-gray-100">
            <div className="px-6 py-4 flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1.5" />
                <span>{resource.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <UserIcon className="h-4 w-4 mr-1.5" />
                <span>{resource.author}</span>
              </div>
            </div>
          </div>
          
          {/* Resource content */}
          <div className="px-6 py-8">
            <p className="text-gray-700 mb-8 leading-relaxed">
              {resource.description}
              {/* Extended content for the detail view */}
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
              nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia,
              nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
              <br /><br />
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
              <br /><br />
              {resource.category === 'health-tips' && (
                <>
                  <strong>Key Health Tips:</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
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
                  <strong>Important Medical Information:</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Always consult with a healthcare professional before starting any new treatment</li>
                    <li>Keep a record of your symptoms and medication history</li>
                    <li>Follow prescribed medication schedules strictly</li>
                    <li>Be aware of potential side effects and when to seek emergency care</li>
                    <li>Schedule regular check-ups for preventive care</li>
                  </ul>
                </>
              )}
            </p>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Download PDF
              </button>
              <button
                onClick={handleShare}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ShareIcon className="h-4 w-4 mr-2" />
                Share
              </button>
              <button
                onClick={handleBookmark}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
        
        {/* Related resources could be added here */}
      </div>
    </div>
  );
}
