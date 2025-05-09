import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, CalendarIcon, DocumentTextIcon, UserIcon } from '@heroicons/react/24/outline';

export default function SimpleTest() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });
  
  // Update time every second to show the component is live
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Get window dimensions and set viewport meta
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set viewport meta tag to ensure proper scaling on mobile
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-lg font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Health</span>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">Connect</span>
            </span>
          </div>
          <h1 className="text-lg font-semibold text-gray-800">Mobile Test</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Device Information</h2>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium text-gray-600">Device Type:</span> <span className="text-blue-600">{dimensions.width < 768 ? 'Mobile' : dimensions.width < 1024 ? 'Tablet' : 'Desktop'}</span></p>
            <p><span className="font-medium text-gray-600">Is Mobile:</span> <span className="text-blue-600">{dimensions.width < 768 ? 'Yes' : 'No'}</span></p>
            <p><span className="font-medium text-gray-600">Screen Size:</span> <span className="text-blue-600">{dimensions.width} × {dimensions.height}</span></p>
            <p><span className="font-medium text-gray-600">Current Time:</span> <span className="text-blue-600">{currentTime.toLocaleTimeString()}</span></p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Mobile Pages</h2>
          <p className="text-sm text-gray-600 mb-4">These simplified pages are optimized for mobile devices:</p>
          
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/simple-resources" 
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200"
            >
              <DocumentTextIcon className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-800">Resources</span>
            </Link>
            
            <Link 
              to="/simple-appointments" 
              className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl border border-purple-200"
            >
              <CalendarIcon className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-800">Appointments</span>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Interaction Test</h2>
          <p className="text-sm text-gray-600 mb-4">Test touch interactions and responsiveness:</p>
          
          <div className="flex flex-col space-y-3">
            <button 
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium active:bg-blue-700 transition-colors"
              onClick={() => alert('Button clicked!')}
            >
              Tap Me
            </button>
            
            <div className="flex space-x-2">
              <button 
                className="flex-1 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium active:bg-gray-200 transition-colors"
                onClick={() => alert('Option 1 selected')}
              >
                Option 1
              </button>
              <button 
                className="flex-1 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium active:bg-gray-200 transition-colors"
                onClick={() => alert('Option 2 selected')}
              >
                Option 2
              </button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="flex justify-around">
          <Link to="/" className="flex flex-col items-center py-2 px-3 text-blue-600 font-medium">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link to="/simple-resources" className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-blue-600">
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
