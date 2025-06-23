import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  UserGroupIcon,
  UserIcon as DoctorIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!form.role) {
      newErrors.role = 'Please select a role';
    }

    if (!form.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const { success, error } = await register(form);

    setIsSubmitting(false);

    if (success) {
      setSubmitted(true);
    } 
    // Error is already handled by toast in AuthContext, but you could add more specific handling here if needed.
  };

  if (submitted) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-6">Your account has been successfully created. You can now log in.</p>
          <button
            onClick={() => navigate('/login')}
            className="inline-block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200"
          >
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/doctors/african-american-doctor-man-standing-corridor-hospital.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white mb-2">Create Your Account</h2>
          <p className="text-gray-300">Join HealthConnect and connect with healthcare professionals</p>
        </div>

        {/* Register Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/20 text-white placeholder-gray-400 border-gray-600 ${
                      errors.firstName ? 'border-red-400' : 'border-gray-600'
                    }`}
                    placeholder="John"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/20 text-white placeholder-gray-400 border-gray-600 ${
                      errors.lastName ? 'border-red-400' : 'border-gray-600'
                    }`}
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/20 text-white placeholder-gray-400 border-gray-600 ${
                    errors.email ? 'border-red-400' : 'border-gray-600'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/20 text-white placeholder-gray-400 border-gray-600 ${
                    errors.password ? 'border-red-400' : 'border-gray-600'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/20 text-white placeholder-gray-400 border-gray-600 ${
                    errors.confirmPassword ? 'border-red-400' : 'border-gray-600'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                I am a:
              </label>
              <div className="flex w-full rounded-full bg-black/50 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, role: 'patient' }));
                    if (errors.role) {
                      setErrors(prev => ({ ...prev, role: '' }));
                    }
                  }}
                  className={`w-1/2 flex items-center justify-center py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-300 focus:outline-none ${
                    form.role === 'patient'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-transparent text-gray-300 hover:text-white'
                  }`}
                >
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm(prev => ({ ...prev, role: 'doctor' }));
                    if (errors.role) {
                      setErrors(prev => ({ ...prev, role: '' }));
                    }
                  }}
                  className={`w-1/2 flex items-center justify-center py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-300 focus:outline-none ${
                    form.role === 'doctor'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-transparent text-gray-300 hover:text-white'
                  }`}
                >
                  <DoctorIcon className="h-5 w-5 mr-2" />
                  Doctor
                </button>
              </div>
              {errors.role && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                  {errors.role}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={form.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded bg-white/20"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600 flex items-center">
                <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                {errors.agreeToTerms}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 