import React from 'react';
import { useViewport } from '../components/responsive/ViewportProvider';

export default function MobileTest() {
  const { width, height, isMobile, isTablet, isDesktop } = useViewport();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Device Test Page</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Viewport Information</h2>
        <p><strong>Width:</strong> {width}px</p>
        <p><strong>Height:</strong> {height}px</p>
        <p><strong>Is Mobile:</strong> {isMobile ? 'Yes' : 'No'}</p>
        <p><strong>Is Tablet:</strong> {isTablet ? 'Yes' : 'No'}</p>
        <p><strong>Is Desktop:</strong> {isDesktop ? 'Yes' : 'No'}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Device-Specific Content</h2>
        {isMobile && (
          <div className="bg-blue-100 p-3 rounded">
            <p className="text-blue-800">This content is only visible on mobile devices.</p>
          </div>
        )}
        
        {isTablet && (
          <div className="bg-green-100 p-3 rounded">
            <p className="text-green-800">This content is only visible on tablet devices.</p>
          </div>
        )}
        
        {isDesktop && (
          <div className="bg-purple-100 p-3 rounded">
            <p className="text-purple-800">This content is only visible on desktop devices.</p>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Navigation Test</h2>
        <div className="grid grid-cols-2 gap-3">
          <a href="/" className="bg-blue-500 text-white p-3 rounded text-center">
            Home
          </a>
          <a href="/auth" className="bg-green-500 text-white p-3 rounded text-center">
            Auth Page
          </a>
        </div>
      </div>
    </div>
  );
}
