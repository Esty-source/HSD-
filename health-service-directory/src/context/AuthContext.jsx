import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// IMPORTANT: For best performance, ensure the 'profiles' table has an index on the 'email' column.
// Example (run in Supabase SQL editor):
// CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles (email);

const AuthContext = createContext(null);
const API_URL = 'http://localhost:5001/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect could be used to verify a token from localStorage
    // For now, we'll just set loading to false
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Login failed');
        return { success: false, error: data.message };
      }

      localStorage.setItem('token', data.token);
      setUser(data.user);
      toast.success('Logged in successfully!');
      return { success: true };

    } catch (error) {
      toast.error('A network error occurred. Is the backend server running?');
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Registration failed');
        return { success: false, error: data.message };
      }

      toast.success(data.message || 'Registration successful!');
      return { success: true };

    } catch (error) {
      toast.error('A network error occurred. Is the backend server running?');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
