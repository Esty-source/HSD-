import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function AdminAccess() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState('Initializing admin access...');
  const [error, setError] = useState(null);
  
  // Admin credentials
  const adminEmail = 'admin@healthdirectory.com';
  const adminPassword = 'AdminAccess2025!';

  useEffect(() => {
    const loginAsAdmin = async () => {
      try {
        setStatus('Checking authentication status...');
        
        // Check if already logged in as admin
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: userData, error: userError } = await supabase.auth.getUser();
          
          if (userError) {
            throw userError;
          }
          
          if (userData && userData.user) {
            // Check if the user has admin metadata
            const userRole = userData.user.user_metadata?.role;
            
            if (userRole === 'admin') {
              setStatus('Already logged in as admin, redirecting...');
              // Use the login function from AuthContext to set local state
              await login(adminEmail, adminPassword);
              navigate('/dashboard/admin');
              return;
            }
            
            // Not an admin, sign out and continue with admin login
            setStatus('Current user is not an admin, signing out...');
            await supabase.auth.signOut();
          }
        }
        
        // Proceed with admin login
        setStatus('Logging in as admin...');
        let authData;
        let userId;
        
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: adminEmail,
            password: adminPassword
          });
          
          if (error) {
            // If the admin user doesn't exist, try to create it
            if (error.message.includes('Invalid login credentials')) {
              setStatus('Admin user does not exist, creating admin user...');
              
              // Create admin user
              const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: adminEmail,
                password: adminPassword,
                options: {
                  data: {
                    name: 'System Administrator',
                    role: 'admin'
                  }
                }
              });
              
              if (signUpError) {
                throw new Error(`Failed to create admin user: ${signUpError.message}`);
              }
              
              if (!signUpData || !signUpData.user) {
                throw new Error('No user data returned from signup');
              }
              
              // Sign in with the newly created admin user
              setStatus('Admin user created, logging in...');
              const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                email: adminEmail,
                password: adminPassword
              });
              
              if (loginError) {
                throw loginError;
              }
              
              if (!loginData || !loginData.user) {
                throw new Error('No user data returned from login');
              }
              
              // Use this data for the rest of the function
              authData = loginData;
            } else {
              throw error;
            }
          } else {
            // Use the successful login data
            authData = data;
          }
          
          if (!authData || !authData.user) {
            throw new Error('No user data returned from login');
          }
          
          // Store the user ID for later use
          userId = authData.user.id;
        } catch (loginError) {
          console.error('Error during admin login:', loginError);
          throw loginError;
        }
        
        setStatus('Admin login successful, checking profiles table...');
        
        // First, check if the profiles table exists by attempting a simple query
        const { data: tableCheck, error: tableCheckError } = await supabase
          .from('profiles')
          .select('count')
          .limit(1);
          
        // If the table doesn't exist or has schema issues, create it
        if (tableCheckError) {
          setStatus('Profiles table issue detected, attempting to fix...');
          console.log('Table check error:', tableCheckError);
          
          // Try to create the profiles table with a simple structure
          try {
            const { error: createTableError } = await supabase.rpc(
              'execute_sql',
              { 
                sql: `
                  CREATE TABLE IF NOT EXISTS profiles (
                    id UUID PRIMARY KEY REFERENCES auth.users(id),
                    name TEXT,
                    role TEXT,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                  );
                `
              }
            );
            
            if (createTableError) {
              console.error('Error creating profiles table:', createTableError);
              // Continue anyway - the table might actually exist but have different columns
            } else {
              setStatus('Profiles table created successfully');
            }
          } catch (sqlError) {
            console.error('SQL execution error:', sqlError);
            // Continue anyway - we'll try to create the profile directly
          }
        }
        
        // Check if admin profile exists
        setStatus('Checking for admin profile...');
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();
          
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error checking admin profile:', profileError);
        }
        
        if (!profileData) {
          // Create a default admin profile if one doesn't exist
          setStatus('Creating admin profile...');
          
          // Try with minimal fields first
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: userId,
              name: 'System Administrator',
              role: 'admin'
            }]);
            
          if (insertError) {
            console.error('Error creating admin profile:', insertError);
            
            // If that fails, try with just id and role
            const { error: minimalInsertError } = await supabase
              .from('profiles')
              .insert([{
                id: userId,
                role: 'admin'
              }]);
              
            if (minimalInsertError) {
              console.error('Error creating minimal admin profile:', minimalInsertError);
              
              // Try one last approach - use upsert instead of insert
              const { error: upsertError } = await supabase
                .from('profiles')
                .upsert({
                  id: userId,
                  role: 'admin'
                });
                
              if (upsertError) {
                console.error('Error upserting admin profile:', upsertError);
                setError(`Failed to create admin profile: ${upsertError.message}`);
                return;
              }
            }
          }
          
          setStatus('Admin profile created successfully');
        } else {
          setStatus('Admin profile exists, ensuring role is set...');
          
          // Ensure the profile has the admin role
          if (profileData.role !== 'admin') {
            const { error: updateProfileError } = await supabase
              .from('profiles')
              .update({ role: 'admin' })
              .eq('id', userId);
              
            if (updateProfileError) {
              console.error('Error updating admin role in profile:', updateProfileError);
            }
          }
        }
        
        // Ensure user metadata has admin role - handle with try/catch to avoid errors
        try {
          // First check if the user already has metadata
          const { data: userData } = await supabase.auth.getUser();
          
          if (userData && userData.user) {
            // Only update if needed
            if (!userData.user.user_metadata || userData.user.user_metadata.role !== 'admin') {
              const { error: updateError } = await supabase.auth.updateUser({
                data: { role: 'admin' }
              });
              
              if (updateError) {
                console.error('Error updating user metadata:', updateError);
                // Continue anyway - we'll use localStorage as a fallback
              }
            }
          }
        } catch (metadataError) {
          console.error('Error handling user metadata:', metadataError);
          // Continue anyway - we'll use localStorage as a fallback
        }
        
        // Use the login function from AuthContext to set local state
        setStatus('Setting up admin session...');
        await login(adminEmail, adminPassword);
        
        // Force admin role in localStorage to ensure proper redirection
        try {
          // First, ensure we have the latest user data
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          
          // Force admin role and update other fields if needed
          userData.role = 'admin';
          userData.email = userData.email || adminEmail;
          userData.name = userData.name || 'System Administrator';
          
          // Save back to localStorage
          localStorage.setItem('user', JSON.stringify(userData));
          console.log('Forced admin role in localStorage:', userData);
          
          // Double-check that the role is set correctly
          const verifyData = JSON.parse(localStorage.getItem('user') || '{}');
          console.log('Verified user data in localStorage:', verifyData);
          
          if (verifyData.role !== 'admin') {
            console.warn('WARNING: Admin role not properly saved to localStorage!');
          }
        } catch (e) {
          console.error('Error updating localStorage:', e);
        }
        
        // Redirect to admin dashboard
        setStatus('Redirecting to admin dashboard...');
        navigate('/dashboard/admin');
      } catch (error) {
        console.error('Admin access error:', error);
        setError(`Admin access error: ${error.message}`);
      }
    };
    
    loginAsAdmin();
  }, [navigate, login]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Accessing Admin Dashboard</h2>
        
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
            <button 
              onClick={() => navigate('/auth')} 
              className="mt-2 w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded transition-colors"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-600 mb-4">{status}</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
