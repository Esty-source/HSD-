import React, { useState } from 'react';
import { migrateAllData } from '../lib/dataMigration';

export default function RunMigration() {
  const [status, setStatus] = useState('idle');
  const [log, setLog] = useState([]);

  const runMigration = async () => {
    try {
      setStatus('running');
      setLog(prev => [...prev, 'Starting data migration...']);
      
      // Create admin user
      setLog(prev => [...prev, 'Creating admin user...']);
      await migrateAllData();
      
      setLog(prev => [...prev, 'Migration completed successfully!']);
      setStatus('completed');
    } catch (error) {
      console.error('Migration error:', error);
      setLog(prev => [...prev, `Error: ${error.message}`]);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-blue-600">
            <h1 className="text-xl font-bold text-white">Supabase Data Migration</h1>
          </div>
          
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              This page will migrate mock data to your Supabase database. This includes creating sample doctors, resources, and pharmacies.
            </p>
            
            <div className="mb-6">
              <button
                onClick={runMigration}
                disabled={status === 'running'}
                className={`px-4 py-2 rounded-md text-white font-medium ${
                  status === 'running' 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {status === 'running' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running Migration...
                  </span>
                ) : status === 'completed' ? (
                  'Migration Completed'
                ) : status === 'error' ? (
                  'Try Again'
                ) : (
                  'Run Data Migration'
                )}
              </button>
            </div>
            
            {log.length > 0 && (
              <div className="border rounded-md overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b">
                  <h3 className="font-medium">Migration Log</h3>
                </div>
                <div className="bg-black text-green-400 p-4 font-mono text-sm h-64 overflow-y-auto">
                  {log.map((entry, index) => (
                    <div key={index} className="mb-1">
                      &gt; {entry}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {status === 'completed' && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Migration Successful</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Your Supabase database has been populated with sample data. You can now use the application with real data from Supabase.</p>
                    </div>
                    <div className="mt-4">
                      <a
                        href="/"
                        className="text-sm font-medium text-green-600 hover:text-green-500"
                      >
                        Go to Home Page <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
