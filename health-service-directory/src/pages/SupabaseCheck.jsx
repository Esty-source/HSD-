import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function SupabaseCheck() {
  const [tables, setTables] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking');

  // Initial connection check
  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log('Checking Supabase connection...');
        // Simple ping test to see if Supabase is reachable
        const { data, error } = await supabase.from('profiles').select('count()', { count: 'exact', head: true });
        
        if (error) {
          console.error('Failed to connect to Supabase:', error);
          setConnectionStatus('failed');
          setError(`Connection error: ${error.message}`);
          toast.error(`Supabase connection failed: ${error.message}`);
        } else {
          console.log('Successfully connected to Supabase');
          setConnectionStatus('connected');
          toast.success('Connected to Supabase!');
          // Only try to check tables if we have a connection
          checkTables();
        }
      } catch (err) {
        console.error('Exception during connection check:', err);
        setConnectionStatus('failed');
        setError(`Connection error: ${err.message}`);
        toast.error(`Supabase connection error: ${err.message}`);
        setLoading(false);
      }
    };
    
    checkConnection();
  }, []);

  const checkTables = async () => {
    try {
      console.log('Checking Supabase tables...');
      const results = {};
      const tableNames = ['profiles', 'doctors', 'patients', 'appointments', 'telemedicine', 'resources', 'pharmacies'];
      
      // Check each table with a simpler approach
      for (const table of tableNames) {
        try {
          console.log(`Checking table: ${table}`);
          // Just query a count with no data return
          const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });
          
          results[table] = {
            exists: !error,
            error: error?.message,
            count: count || 0
          };
          
          console.log(`Table ${table} check result:`, results[table]);
        } catch (tableError) {
          console.error(`Error checking table ${table}:`, tableError);
          results[table] = {
            exists: false,
            error: tableError.message,
            count: 0
          };
        }
      }
      
      setTables(results);
    } catch (err) {
      console.error('Exception during table checks:', err);
      setError(`Error checking tables: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-700 text-center">
          {connectionStatus === 'checking' ? 'Checking connection to Supabase...' : 'Checking database tables...'}
        </p>
      </div>
    );
  }

  if (connectionStatus === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-xl font-bold text-red-600 mb-4">Connection Failed</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-gray-600 mb-6">
            There might be an issue with your Supabase URL or API key, or the Supabase service might be unavailable.
          </p>
          <div className="flex flex-col space-y-3">
            <Link 
              to="/supabase-test" 
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-center"
            >
              Try Detailed Debug Page
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-xl font-bold text-red-600 mb-4">Error Checking Supabase</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="flex justify-between">
            <Link 
              to="/supabase-test" 
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Try Detailed Debug Page
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-blue-600">
            <h1 className="text-xl font-bold text-white">Supabase Tables Check</h1>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700">
                Connection status: 
                <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Connected
                </span>
              </p>
              
              <Link 
                to="/supabase-test" 
                className="bg-blue-600 text-white py-1 px-3 text-sm rounded hover:bg-blue-700"
              >
                Advanced Testing
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Table Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(tables).map(([tableName, info]) => (
                    <tr key={tableName}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tableName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {info.exists ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Exists
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Not Found
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {info.exists ? (
                          `Table exists`
                        ) : (
                          <span className="text-red-500">{info.error}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {Object.keys(tables).length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                        No table information available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
