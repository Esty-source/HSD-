import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rvljxumyxbrjtlqkcmnj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGp4dW15eGJyanRscWtjbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzQ2NTksImV4cCI6MjA2MjAxMDY1OX0.bL9W2dAt-nUy0MDng6S6Cq5mVY84zDHV9Rc8tSSy8Cw';

// Create a fresh client instance 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DirectTest() {
  const [status, setStatus] = useState('waiting');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('Click a button to run a test');
  const [loginEmail, setLoginEmail] = useState('admin@healthdirectory.com');
  const [loginPassword, setLoginPassword] = useState('AdminAccess2025!');

  const testConnection = async () => {
    setStatus('testing');
    setMessage('Testing Supabase connection...');
    
    try {
      // Simple health check
      const { error } = await supabase.from('_config').select('*', { head: true });
      
      if (error) {
        console.error('Connection test failed:', error);
        setStatus('error');
        setMessage(`Connection failed: ${error.message}`);
        setResult(error);
      } else {
        console.log('Connection test successful');
        setStatus('success');
        setMessage('Connection successful!');
        setResult({ success: true });
      }
    } catch (err) {
      console.error('Connection error:', err);
      setStatus('error');
      setMessage(`Connection error: ${err.message}`);
      setResult(err);
    }
  };

  const testAuth = async () => {
    setStatus('testing');
    setMessage(`Testing login with ${loginEmail}...`);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword
      });
      
      if (error) {
        console.error('Auth test failed:', error);
        setStatus('error');
        setMessage(`Authentication failed: ${error.message}`);
        setResult(error);
      } else if (data?.user) {
        console.log('Auth test successful:', data.user);
        setStatus('success');
        setMessage(`Logged in as ${data.user.email}`);
        setResult(data);
      } else {
        console.warn('Auth test warning: No error but no user', data);
        setStatus('warning');
        setMessage('Authentication successful but no user returned');
        setResult(data);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setStatus('error');
      setMessage(`Authentication error: ${err.message}`);
      setResult(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Direct Supabase Test</h1>
        
        <div className="mb-6 p-4 rounded bg-gray-50">
          <div className="text-sm text-gray-500 mb-1">Supabase URL:</div>
          <div className="font-mono text-xs break-all">{supabaseUrl}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={testConnection}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          >
            Test Connection
          </button>
          <button
            onClick={testAuth}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
          >
            Test Authentication
          </button>
        </div>
        
        <div className="mb-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className={`p-4 rounded ${
          status === 'waiting' ? 'bg-gray-100 text-gray-600' :
          status === 'testing' ? 'bg-blue-100 text-blue-700' :
          status === 'success' ? 'bg-green-100 text-green-700' :
          status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          <div className="font-medium mb-2">{message}</div>
          {result && (
            <pre className="text-xs overflow-auto max-h-32">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
} 