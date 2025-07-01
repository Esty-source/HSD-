import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

// Mock Users Data
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    phone: '+1234567890'
  },
  {
    id: 2,
    email: 'doctor@example.com',
    password: 'doctor123',
    name: 'Dr. John Smith',
    role: 'doctor',
    phone: '+1234567891',
    specialty: 'Cardiology'
  },
  {
    id: 3,
    email: 'patient@example.com',
    password: 'patient123',
    name: 'Jane Doe',
    role: 'patient',
    phone: '+1234567892'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and user data on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user by email and password
      const foundUser = MOCK_USERS.find(u => 
        u.email === email && u.password === password
      );
      
      if (foundUser) {
        // Remove password from user object
        const { password, ...userWithoutPassword } = foundUser;
        
        // Create mock token
        const mockToken = `mock-token-${Date.now()}`;
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        toast.success('Logged in successfully!');
        return { success: true, user: userWithoutPassword };
      }
      
      toast.error('Invalid credentials');
      return { success: false, error: 'Invalid credentials' };

    } catch (error) {
      toast.error('An error occurred during login');
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === userData.email)) {
        toast.error('User already exists');
        return { 
          success: false, 
          error: 'User already exists'
        };
      }
      
      // Create new user with mock ID
      const newUser = {
        id: Math.floor(Math.random() * 1000) + 10,
        ...userData
      };
      
      // Just log the registration - in a real app we would add to database
      console.log('Registered new user:', newUser);
      
      toast.success('Registration successful!');
      return { success: true };

    } catch (error) {
      toast.error('An error occurred during registration');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
