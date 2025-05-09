import React, { useState, useEffect } from 'react';
import { useViewport } from '../components/responsive/ViewportProvider';
import { Link } from 'react-router-dom';

export default function MobileDebug() {
  const viewport = useViewport();
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Mobile Debug Page</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Viewport Information</h2>
        <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm">
          {JSON.stringify(viewport, null, 2)}
        </pre>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Device Detection</h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className={`p-3 rounded ${viewport.isMobile ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
            <div className="font-bold">Mobile</div>
            <div>{viewport.isMobile ? 'Yes' : 'No'}</div>
          </div>
          <div className={`p-3 rounded ${viewport.isTablet ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
            <div className="font-bold">Tablet</div>
            <div>{viewport.isTablet ? 'Yes' : 'No'}</div>
          </div>
          <div className={`p-3 rounded ${viewport.isDesktop ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-500'}`}>
            <div className="font-bold">Desktop</div>
            <div>{viewport.isDesktop ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Device-Specific Content Test</h2>
        {viewport.isMobile && (
          <div className="bg-green-100 p-3 rounded mb-3">
            <p className="text-green-800">This content is only visible on mobile devices.</p>
          </div>
        )}
        
        {viewport.isTablet && (
          <div className="bg-blue-100 p-3 rounded mb-3">
            <p className="text-blue-800">This content is only visible on tablet devices.</p>
          </div>
        )}
        
        {viewport.isDesktop && (
          <div className="bg-purple-100 p-3 rounded mb-3">
            <p className="text-purple-800">This content is only visible on desktop devices.</p>
          </div>
        )}
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Test Links</h2>
        <div className="grid grid-cols-2 gap-3">
          <a href="/dashboard/patient" className="bg-blue-500 text-white p-3 rounded text-center">
            Patient Dashboard
          </a>
          <a href="/dashboard/doctor" className="bg-green-500 text-white p-3 rounded text-center">
            Doctor Dashboard
          </a>
          <a href="/dashboard/admin" className="bg-purple-500 text-white p-3 rounded text-center">
            Admin Dashboard
          </a>
          <a href="/notifications" className="bg-yellow-500 text-white p-3 rounded text-center">
            Notifications
          </a>
          <a href="/resources" className="bg-red-500 text-white p-3 rounded text-center">
            Resources
          </a>
          <a href="/" className="bg-gray-500 text-white p-3 rounded text-center">
            Home
          </a>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <p>If you're seeing this page correctly, the ViewportProvider is working.</p>
        <p>Check the device detection above to see if it's correctly identifying your device type.</p>
        <p>Use the test links to navigate to different pages and test the mobile versions.</p>
      </div>
    </div>
  );
}
