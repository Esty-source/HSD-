import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize state with safe parsing of localStorage data
  const [user, setUser] = useState(() => {
    try {
      const data = localStorage.getItem('user');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('user'); // Clear corrupted data
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return !!localStorage.getItem('user') && !!localStorage.getItem('token');
    } catch (error) {
      return false;
    }
  });
  const [loading, setLoading] = useState(false);

  // Safely update localStorage when state changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }, [user, token]);

  const login = (userDataOrEmail, tokenValueOrPassword) => {
    console.log('Login called with:', { userDataOrEmail, tokenValueOrPassword });
    
    // Check if we're dealing with email/password login or direct user data
    if (typeof userDataOrEmail === 'string' && typeof tokenValueOrPassword === 'string') {
      // This is email/password login - we need to get the user data from localStorage or create it
      console.log('Email/password login detected');
      
      // Special case for admin email
      const isAdminEmail = userDataOrEmail === 'admin@healthdirectory.com';
      if (isAdminEmail) {
        console.log('ADMIN EMAIL DETECTED in login function');
      }
      
      // Try to get existing user data from localStorage
      try {
        const existingUserData = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Create a proper user object
        const userData = {
          ...existingUserData,
          email: userDataOrEmail,
          // Ensure role is set (prefer existing role if available)
          // Force admin role if admin email is used
          role: isAdminEmail ? 'admin' : (existingUserData.role || 'patient')
        };
        
        console.log('Created user data from email/password:', userData);
        
        // Set the user and token
        setUser(userData);
        setToken(tokenValueOrPassword); // Use password as token for now
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', tokenValueOrPassword);
        
        return;
      } catch (error) {
        console.error('Error handling email/password login:', error);
        // Continue with regular login flow as fallback
      }
    }
    
    // Regular object-based login flow
    // Validate and ensure the user data has the required fields
    if (!userDataOrEmail) {
      console.error('Invalid user data provided to login function');
      return;
    }
    
    const userData = userDataOrEmail;
    const tokenValue = tokenValueOrPassword;
    
    // Make sure the role is explicitly set and valid
    if (!userData.role) {
      console.warn('No role provided in user data, defaulting to patient');
      userData.role = 'patient';
    }
    
    // Log the user data for debugging
    console.log('Login with user data:', userData);
    console.log('User role:', userData.role);
    
    // Ensure we have the latest user data with the correct role
    setUser(userData);
    setToken(tokenValue);
    
    // Store in localStorage for persistence
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', tokenValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    
    setIsAuthenticated(true);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
