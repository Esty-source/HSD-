import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';

// Validation schemas
const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
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
        // Simulate API call for login
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock successful login response
        const mockResponse = {
          token: 'mock-token',
          user: {
            id: 1,
            name: data.email.split('@')[0],
            email: data.email,
            role: data.email.toLowerCase().includes('admin') ? 'admin' : 
                  data.email.toLowerCase().includes('doctor') ? 'doctor' : 'patient',
          },
        };

        login(mockResponse.user, mockResponse.token);
        toast.success('Login successful!');
        
        // Redirect to the appropriate dashboard
        if (mockResponse.user.role === 'admin') {
          navigate('/dashboard/admin');
        } else if (mockResponse.user.role === 'doctor') {
          navigate('/dashboard/doctor');
        } else {
          navigate('/dashboard/patient');
        }
      } else {
        // Simulate API call for registration
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock successful registration response
        const mockResponse = {
          token: 'mock-token',
          user: {
            id: 2,
            name: data.name,
            email: data.email,
            role: data.role,
          },
        };

        login(mockResponse.user, mockResponse.token);
        toast.success('Registration successful!');
        
        // Redirect to the appropriate dashboard
        if (data.role === 'admin') {
          navigate('/dashboard/admin');
        } else if (data.role === 'doctor') {
          navigate('/dashboard/doctor');
        } else {
          navigate('/dashboard/patient');
        }
      }
    } catch (error) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4 w-full pt-24">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl mx-auto flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    {...register('name')}
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  type="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  {...register('password')}
                  type="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('confirmPassword')}
                      type="password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="mt-1">
                    <select
                      {...register('role')}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select a role</option>
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Admin</option>
                    </select>
                    {errors.role && (
                      <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {isLogin ? 'New to Health Service Directory?' : 'Already have an account?'}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={toggleAuthMode}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? 'Create an account' : 'Sign in instead'}
            </button>
          </div>
        </div>
          </div>
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50,20 L80,40 L80,80 L20,80 L20,40 Z" fill="#ffffff" />
              <circle cx="50" cy="30" r="10" fill="#ffffff" />
              <path d="M30,80 L30,60 L70,60 L70,80 Z" fill="#ffffff" />
            </svg>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-white">
            <div className="mb-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 mx-auto mb-4">
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
              </svg>
              <h2 className="text-2xl font-bold">Health Service Directory</h2>
              <p className="mt-2 text-blue-100">Your gateway to better healthcare</p>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-3 mb-2 mx-auto w-14 h-14 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Find Doctors</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-3 mb-2 mx-auto w-14 h-14 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Patient Records</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-3 mb-2 mx-auto w-14 h-14 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Appointments</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-3 mb-2 mx-auto w-14 h-14 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Pharmacies</p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-sm text-blue-100">Secure access to your health information</p>
              <p className="text-xs mt-1 text-blue-200">© 2024 HealthConnect. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
