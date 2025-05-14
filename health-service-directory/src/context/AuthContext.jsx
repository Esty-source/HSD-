import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from Supabase session
  useEffect(() => {
    // Get the current session
    const fetchSession = async () => {
      try {
        setLoading(true);
        console.log('AuthProvider: Fetching session from Supabase...');
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('AuthProvider: getSession result:', session, error);
        if (error) {
          throw error;
        }
        if (session) {
          setSession(session);
          setIsAuthenticated(true);
          // Get user profile data
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          console.log('AuthProvider: profile fetch result:', profile, profileError);
          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching user profile:', profileError);
          }
          // Combine auth data with profile data
          const userData = {
            ...session.user,
            ...profile,
            role: profile?.role || 'patient' // Default to patient if no role specified
          };
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
        console.log('AuthProvider: fetchSession finished, loading:', false);
      }
    };
    fetchSession();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setIsAuthenticated(!!session);
        console.log('AuthProvider: onAuthStateChange event:', event, session);
        if (session) {
          // Get user profile data when auth state changes
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          console.log('AuthProvider: profile fetch result (onAuthStateChange):', profile, profileError);
          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching user profile:', profileError);
          }
          // Combine auth data with profile data
          const userData = {
            ...session.user,
            ...profile,
            role: profile?.role || 'patient' // Default to patient if no role specified
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
        console.log('AuthProvider: onAuthStateChange finished, loading:', false);
      }
    );
    
    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log('AuthContext: Logging in with:', email, password);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      console.log('AuthContext: Supabase login response:', data, error);
      if (error) {
        toast.error(error.message);
        throw error;
      }
      // Success - the session will be picked up by the auth listener
      toast.success('Logged in successfully');
      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
      console.log('AuthContext: login finished, loading:', false);
    }
  };
  
  // Sign up with email and password
  const signup = async (email, password, userData = {}) => {
    try {
      setLoading(true);
      console.log('AuthContext: Signing up with:', email, password, userData);
      // Create the auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName || '',
            avatar_url: userData.avatarUrl || ''
          }
        }
      });
      console.log('AuthContext: Supabase signup response:', data, error);
      if (error) {
        toast.error(error.message);
        throw error;
      }
      // If signup was successful, create a profile record
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: email,
              full_name: userData.fullName || '',
              avatar_url: userData.avatarUrl || '',
              role: userData.role || 'patient',
              created_at: new Date().toISOString()
            }
          ]);
        console.log('AuthContext: Supabase profile insert response:', profileError);
        if (profileError) {
          console.error('Error creating user profile:', profileError);
          toast.error('Account created but profile setup failed');
        } else {
          toast.success('Account created successfully');
        }
      }
      return { success: true, data };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
      console.log('AuthContext: signup finished, loading:', false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      setLoading(true);
      
      // Update the profile in the database
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
      
      if (error) {
        toast.error(error.message);
        throw error;
      }
      
      // Update the local user state
      setUser({ ...user, ...profileData });
      
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isAuthenticated,
      login,
      signup,
      logout,
      updateProfile,
      loading,
      setLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
