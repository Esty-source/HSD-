import React from 'react';
import { Link } from 'react-router-dom';

export default function BasicTest() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Basic Test Page</h1>
      <p className="mb-4">If you can see this page, the basic routing is working.</p>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Window Information</h2>
        <p>Window Width: {window.innerWidth}px</p>
        <p>Window Height: {window.innerHeight}px</p>
        <p>User Agent: {navigator.userAgent}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Test Links</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/" className="bg-blue-500 text-white p-3 rounded text-center">
            Home
          </Link>
          <Link to="/dashboard/patient" className="bg-green-500 text-white p-3 rounded text-center">
            Patient Dashboard
          </Link>
          <Link to="/dashboard/doctor" className="bg-purple-500 text-white p-3 rounded text-center">
            Doctor Dashboard
          </Link>
          <Link to="/dashboard/admin" className="bg-yellow-500 text-white p-3 rounded text-center">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
