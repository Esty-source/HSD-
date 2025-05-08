import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

// This is a very direct component that forces access to the admin dashboard
// It bypasses all normal checks and directly sets the admin role
export default function DirectAdminAccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const forceAdminAccess = async () => {
      try {
        console.log('DIRECT ADMIN ACCESS: Forcing admin role and access');
        
        // Force admin data in localStorage
        const userData = {
          id: 'admin-user',
          email: 'admin@healthdirectory.com',
          name: 'System Administrator',
          role: 'admin'
        };
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', 'admin-token');
        
        // Verify data was set
        const verifyData = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('DIRECT ADMIN ACCESS: Verified user data:', verifyData);
        
        // Redirect directly to admin dashboard
        console.log('DIRECT ADMIN ACCESS: Redirecting to admin dashboard');
        toast.success('Direct admin access granted!');
        navigate('/dashboard/admin');
      } catch (error) {
        console.error('Error in direct admin access:', error);
        toast.error('Failed to access admin dashboard: ' + error.message);
      }
    };
    
    forceAdminAccess();
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Direct Admin Access</h2>
        <p className="text-center text-gray-600 mb-8">Bypassing normal authentication flow...</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
}
