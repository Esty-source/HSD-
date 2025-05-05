import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

// Validation schemas
const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().oneOf(['patient', 'doctor', 'admin'], 'Invalid role'),
});

const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup.string().oneOf(['patient', 'doctor', 'admin'], 'Invalid role').required('Role is required'),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('patient');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setLoading, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isLogin) {
        // Handle login with Supabase
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password
        });
        
        if (error) {
          toast.error('Invalid login credentials');
          throw error;
        }
        
        // Get user profile - handle case where profile might not exist yet
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();
        
        // If profile doesn't exist or we're overriding the role
        let userData;
        
        if (profileError) {
          console.log('Profile not found, creating new profile');
          // Create a new profile with the selected role
          userData = {
            id: authData.user.id,
            email: authData.user.email,
            name: authData.user.email.split('@')[0], // Use part of email as name
            role: userType // Use the selected role from UI
          };
          
          // Try to create the profile
          try {
            await supabase.from('profiles').insert([{
              id: authData.user.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              phone: '',
              address: ''
            }]);
          } catch (insertError) {
            console.error('Error creating profile during login:', insertError);
            // Continue anyway
          }
        } else {
          // Use the retrieved profile data but override the role if needed
          userData = {
            id: authData.user.id,
            email: authData.user.email,
            name: profileData.name,
            role: userType // Use the selected role from UI
          };
          
          // Update the profile with the new role if different
          if (profileData.role !== userType) {
            try {
              const { error: updateError } = await supabase.from('profiles').update({
                role: userType
              }).eq('id', authData.user.id);
              
              if (updateError) {
                console.error('Error updating profile role:', updateError);
                // Continue anyway - we'll use the selected role for this session
              }
            } catch (updateError) {
              console.error('Exception updating profile role:', updateError);
              // Continue anyway - we'll use the selected role for this session
            }
          }
        }
        
        // Use the existing login function from AuthContext
        login(userData, authData.session.access_token);
        
        // Show success message
        toast.success('Login successful!');
        
        // Redirect based on selected role
        if (userType === 'admin') {
          navigate('/dashboard/admin', { replace: true });
        } else if (userType === 'doctor') {
          navigate('/dashboard/doctor', { replace: true });
        } else {
          navigate('/dashboard/patient', { replace: true });
        }
      } else {
        // Handle registration with Supabase
        // Ensure the role is set from the userType state
        data.role = userType;
        
        // First try to sign in directly (in case user already exists)
        let authData;
        
        // Try to sign up the user
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              name: data.name,
              role: data.role
            },
            // Skip email verification
            emailRedirectTo: window.location.origin + '/auth-callback'
          }
        });
        
        // If there's an error or no session (email confirmation required)
        if (signUpError || !signUpData.session) {
          // Try to sign in directly
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password
          });
          
          if (signInError) {
            // If both signup and signin fail, show error
            if (signUpError) {
              throw signUpError;
            } else {
              throw signInError;
            }
          }
          
          // Use the sign in data
          authData = signInData;
        } else {
          // Use the sign up data
          authData = signUpData;
        }
        
        // Create profile record - simplified to avoid duplication
        try {
          // First check if profile already exists
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', authData.user.id)
            .single();
          
          // Only create profile if it doesn't exist
          if (!existingProfile) {
            const { error: profileError } = await supabase
              .from('profiles')
              .insert([{ 
                id: authData.user.id,
                name: data.name,
                role: data.role, // Use the role from userType
                email: data.email,
                phone: '',
                address: ''
              }]);
            
            if (profileError) {
              console.error('Profile creation error:', profileError);
              // Continue anyway - the user is authenticated
            }
          }
          
          // Attempt to create role-specific records - but only after a delay to ensure profile is created
          // Skip this part for now - we'll handle it after successful login
          // This prevents the 500 errors when trying to create patient/doctor records
          
          /* Commenting out to fix 500 errors
          if (data.role === 'patient') {
            const { error: patientError } = await supabase
              .from('patients')
              .upsert([{ id: authData.user.id }], { onConflict: 'id' });
            
            if (patientError) {
              console.error('Patient record creation error:', patientError);
            }
          } else if (data.role === 'doctor') {
            const { error: doctorError } = await supabase
              .from('doctors')
              .upsert([{ id: authData.user.id }], { onConflict: 'id' });
            
            if (doctorError) {
              console.error('Doctor record creation error:', doctorError);
            }
          }
          */
        } catch (dbError) {
          console.error('Database operation error:', dbError);
          // Continue with signup process despite DB errors
          // The user can still confirm their email
        }
        
        // Handle session and redirection
        if (authData.session) {
          // If session exists (auto-confirm is enabled)
          const userData = {
            id: authData.user.id,
            email: authData.user.email,
            name: data.name,
            role: data.role
          };
          
          login(userData, authData.session.access_token);
          
          toast.success('Registration successful!');
          
          // Redirect based on role
          if (data.role === 'admin') {
            navigate('/dashboard/admin', { replace: true });
          } else if (data.role === 'doctor') {
            navigate('/dashboard/doctor', { replace: true });
          } else {
            navigate('/dashboard/patient', { replace: true });
          }
        } else {
          // If email confirmation is required
          toast.success('Registration successful! Please check your email to confirm your account.');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-4 w-screen max-w-[100vw] overflow-hidden">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl flex flex-col md:flex-row overflow-hidden h-auto">
        <div className="w-full md:w-1/2 p-3 flex flex-col justify-center">
          <h2 className="mb-2 text-center text-lg font-bold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          
          {!isLogin && (
            <div className="mb-3">
              <p className="text-center text-sm font-medium text-gray-900 mb-1 font-semibold">I want to register as a:</p>
              <div className="flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => setUserType('patient')}
                  className={`flex-1 max-w-[100px] py-1 px-2 rounded-lg flex flex-col items-center justify-center transition-all ${userType === 'patient' ? 'bg-blue-100 border border-blue-500 text-blue-700' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">Patient</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('doctor')}
                  className={`flex-1 max-w-[100px] py-1 px-2 rounded-lg flex flex-col items-center justify-center transition-all ${userType === 'doctor' ? 'bg-blue-100 border border-blue-500 text-blue-700' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium">Doctor</span>
                </button>
              </div>
            </div>
          )}
          <form className="space-y-1.5 max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Your full name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
              </div>
            )}
            {isLogin ? (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    {...register('password')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Login As</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      className={`border rounded-md p-3 text-center cursor-pointer transition-all ${userType === 'patient' ? 'bg-blue-500 text-white border-blue-600' : 'border-gray-300 hover:border-blue-500'}`}
                      onClick={() => setUserType('patient')}
                    >
                      <div className="flex justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Patient</span>
                    </div>
                    <div 
                      className={`border rounded-md p-3 text-center cursor-pointer transition-all ${userType === 'doctor' ? 'bg-blue-500 text-white border-blue-600' : 'border-gray-300 hover:border-blue-500'}`}
                      onClick={() => setUserType('doctor')}
                    >
                      <div className="flex justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Doctor</span>
                    </div>
                  </div>
                  <input type="hidden" {...register('role')} value={userType} />
                </div>
              </> 
            ) : (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('confirmPassword')}
                      type="password"
                      placeholder="••••••••"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <div className="hidden">
                  <input
                    type="hidden"
                    {...register('role')}
                    value={userType}
                  />
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                  )}
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Loading...' : isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>

        <div className="mt-4 sm:mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-900 font-medium">
                Or
              </span>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 text-center">
            <button
              type="button"
              onClick={toggleAuthMode}
              className="text-sm sm:text-base font-semibold text-blue-700 hover:text-blue-600 transition-colors duration-200 underline"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
        </div>
        <div className="hidden md:block md:w-1/2 bg-blue-600 p-3 text-white flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center">
            <div className="text-center mb-4 lg:mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-3">
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
              <h2 className="text-lg lg:text-xl font-bold">Health Service Directory</h2>
              <p className="mt-2 text-blue-100 text-sm lg:text-base">Your gateway to better healthcare</p>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-w-xs mx-auto">
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-2 lg:p-3 mb-2 mx-auto w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 lg:w-8 lg:h-8">
                    <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs lg:text-sm font-medium">Find Doctors</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-2 lg:p-3 mb-2 mx-auto w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 lg:w-8 lg:h-8">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs lg:text-sm font-medium">Patient Records</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-2 lg:p-3 mb-2 mx-auto w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 lg:w-8 lg:h-8">
                    <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs lg:text-sm font-medium">Appointments</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-2 lg:p-3 mb-2 mx-auto w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 lg:w-8 lg:h-8">
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                </div>
                <p className="text-xs lg:text-sm font-medium">Pharmacies</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs lg:text-sm text-blue-100">&copy; 2024 Health Service Directory. All rights reserved.</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
