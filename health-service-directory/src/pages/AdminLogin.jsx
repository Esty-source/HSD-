import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role === 'admin') {
      navigate('/dashboard/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Try to login with the auth context
      const { success, user, error: loginError } = await login(email, password);
      
      if (success && user) {
        // Check if user is an admin
        if (user.role === 'admin') {
          navigate('/dashboard/admin');
          return;
        } else {
          setError('Access denied. Admin privileges required.');
        }
      } else {
        // If login failed, show the error
        setError(loginError || 'Invalid admin credentials. Please check your email and password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen max-w-[100vw] flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 mx-0 px-0">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md mx-0 m-0 p-8 sm:p-8 px-8 py-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-indigo-700">Admin Login</h2>
          <p className="text-gray-600 mt-2">Access the admin dashboard</p>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: admin@example.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-colors"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-colors"
              placeholder="Enter password"
              required
            />
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
              {error}
            </div>
          )}
          <button
            type="submit"
            className={`w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </>
            ) : (
              'Login as Admin'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 