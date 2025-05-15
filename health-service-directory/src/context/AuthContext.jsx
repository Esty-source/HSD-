import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    // Add a small delay to allow Supabase to recover session from storage
    setTimeout(() => {
      const fetchSession = async () => {
        try {
          if (!isMounted) return;
          setLoading(true);
          console.log('AuthProvider: Fetching session from Supabase...');
          const { data: { session }, error } = await supabase.auth.getSession();
          console.log('AuthProvider: getSession result:', session, error);
          if (error) {
            throw error;
          }
          if (session) {
            setSession(session);
            setIsAuthenticated(true);
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            console.log('AuthProvider: profile fetch result:', profile, profileError);
            if (profileError && profileError.code !== 'PGRST116') {
              console.error('Error fetching user profile:', profileError);
            }
            const userData = {
              ...session.user,
              ...profile,
              role: profile?.role || 'patient'
            };
            setUser(userData);
          } else {
            setSession(null);
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error fetching session:', error);
        } finally {
          if (isMounted) setLoading(false);
          console.log('AuthProvider: fetchSession finished, loading:', false);
        }
      };
      fetchSession();
    }, 100); // 100ms delay

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        setSession(session);
        setIsAuthenticated(!!session);
        console.log('AuthProvider: onAuthStateChange event:', event, session);
        if (session) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          console.log('AuthProvider: profile fetch result (onAuthStateChange):', profile, profileError);
          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching user profile:', profileError);
          }
          const userData = {
            ...session.user,
            ...profile,
            role: profile?.role || 'patient'
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
        console.log('AuthProvider: onAuthStateChange finished, loading:', false);
      }
    );

    return () => {
      isMounted = false;
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
        setLoading(false);
        throw error;
      }
      toast.success('Logged in successfully');
      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return { success: false, error };
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
        setLoading(false);
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
          setLoading(false);
        } else {
          toast.success('Account created successfully');
        }
      }
      if (!data?.user && !error) {
        // This case is tricky; usually signUp sends a confirmation email and onAuthStateChange fires upon confirmation.
        // For now, assume onAuthStateChange will handle it or initial loading state will resolve.
        // If immediate login is expected, this flow needs adjustment.
      }
      return { success: true, data };
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
      return { success: false, error };
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
