import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-hot-toast';

export default function SupabaseTest() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('admin@healthdirectory.com');
  const [password, setPassword] = useState('AdminAccess2025!');

  const addResult = (label, status, details) => {
    setResults(prev => [
      { id: Date.now(), timestamp: new Date().toLocaleTimeString(), label, status, details },
      ...prev
    ]);
  };

  // Test Supabase connection
  const testConnection = async () => {
    setIsLoading(true);
    try {
      addResult('Testing connection', 'pending', 'Connecting to Supabase...');
      
      const { data, error } = await supabase.from('profiles').select('count()', { count: 'exact' }).limit(0);
      
      if (error) {
        addResult('Connection test', 'failed', error.message);
        console.error('Supabase connection failed:', error);
      } else {
        addResult('Connection test', 'success', 'Connected to Supabase database');
        console.log('Supabase connection successful:', data);
      }
    } catch (err) {
      addResult('Connection test', 'error', err.message || 'Unknown error');
      console.error('Error during connection test:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Test login
  const testLogin = async () => {
    setIsLoading(true);
    try {
      addResult('Testing login', 'pending', `Attempting to login with ${email}`);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        addResult('Login test', 'failed', error.message);
        console.error('Login failed:', error);
      } else if (data?.user) {
        addResult('Login test', 'success', `Logged in as ${data.user.email}`);
        console.log('Login successful:', data);
      } else {
        addResult('Login test', 'warning', 'No error but no user returned');
        console.warn('Login returned no user:', data);
      }
    } catch (err) {
      addResult('Login test', 'error', err.message || 'Unknown error');
      console.error('Error during login test:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get current session
  const checkSession = async () => {
    setIsLoading(true);
    try {
      addResult('Checking session', 'pending', 'Getting current session...');
      
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        addResult('Session check', 'failed', error.message);
        console.error('Session check failed:', error);
      } else if (data?.session) {
        addResult('Session check', 'success', `Active session for ${data.session.user.email}`);
        console.log('Session exists:', data);
      } else {
        addResult('Session check', 'warning', 'No active session found');
        console.log('No session:', data);
      }
    } catch (err) {
      addResult('Session check', 'error', err.message || 'Unknown error');
      console.error('Error checking session:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    setIsLoading(true);
    try {
      addResult('Signing out', 'pending', 'Attempting to sign out...');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        addResult('Sign out', 'failed', error.message);
        console.error('Sign out failed:', error);
      } else {
        addResult('Sign out', 'success', 'Successfully signed out');
        console.log('Sign out successful');
      }
    } catch (err) {
      addResult('Sign out', 'error', err.message || 'Unknown error');
      console.error('Error during sign out:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Check Supabase details
  const checkSupabaseConfig = () => {
    try {
      const url = supabase.supabaseUrl;
      const keyFragment = supabase.supabaseKey ? 
        `${supabase.supabaseKey.substring(0, 5)}...${supabase.supabaseKey.substring(supabase.supabaseKey.length - 5)}` : 
        'Not available';
      
      addResult('Supabase config', 'info', `URL: ${url}, Key: ${keyFragment}`);
    } catch (err) {
      addResult('Supabase config', 'error', err.message || 'Failed to get Supabase config');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Supabase Debugging</h1>
      
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Test Connection</h2>
        <div className="flex gap-2 mb-4">
          <button 
            onClick={testConnection}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Test Database Connection
          </button>
          
          <button 
            onClick={checkSupabaseConfig}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Check Config
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-3">Test Authentication</h2>
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-2 rounded"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="border p-2 rounded"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={testLogin}
              disabled={isLoading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              Test Login
            </button>
            
            <button 
              onClick={checkSession}
              disabled={isLoading}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
            >
              Check Session
            </button>
            
            <button 
              onClick={signOut}
              disabled={isLoading}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Results</h2>
        
        <div className="overflow-auto max-h-96">
          {results.length === 0 ? (
            <p className="text-gray-500 italic">No results yet. Run a test to see results here.</p>
          ) : (
            <div className="space-y-2">
              {results.map(result => (
                <div key={result.id} className="border p-3 rounded">
                  <div className="flex justify-between">
                    <span className="font-medium">{result.label}</span>
                    <span className="text-xs text-gray-500">{result.timestamp}</span>
                  </div>
                  <div className={`text-sm mt-1 ${
                    result.status === 'success' ? 'text-green-600' :
                    result.status === 'failed' ? 'text-red-600' :
                    result.status === 'pending' ? 'text-blue-600' : 
                    result.status === 'warning' ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {result.status.toUpperCase()}: {result.details}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 