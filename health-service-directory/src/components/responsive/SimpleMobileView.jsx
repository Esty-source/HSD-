import React from 'react';
import MobileLayout from './MobileLayout';

export default function SimpleMobileView() {
  return (
    <MobileLayout title="Mobile Test">
      <div className="p-4">
        <p className="mb-4">This is a simple mobile test page.</p>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Mobile Test</h2>
          <p>If you can see this, the mobile view is working correctly!</p>
        </div>
        
        <button 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={() => alert('Button clicked!')}
        >
          Test Button
        </button>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Mobile Layout Features</h3>
          <ul className="list-disc pl-5 space-y-1 text-blue-700">
            <li>Consistent header with title</li>
            <li>Bottom navigation bar</li>
            <li>Full-screen menu</li>
            <li>Proper spacing and padding</li>
            <li>Mobile-optimized touch targets</li>
          </ul>
        </div>
      </div>
    </MobileLayout>
  );
}
