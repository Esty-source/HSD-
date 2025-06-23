import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const SimpleTest = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTest = async () => {
      try {
        setLoading(true);
        // 1. Test basic connection
        const { error: connectionError } = await supabase.from('profiles').select('*', { head: true });
        
        if (connectionError && connectionError.message.includes('relation "public.profiles" does not exist')) {
          setTestResult('Connection to Supabase is successful, but the "profiles" table is missing. Please apply the schema from supabase/schema.sql.');
          return;
        }

        if (connectionError) {
          setTestResult(`An error occurred: ${connectionError.message}`);
          return;
        }

        // 2. If connection is fine, confirm table exists
        setTestResult('Backend check complete. The "profiles" table exists and the connection is successful. Your backend is ready!');

      } catch (err) {
        setTestResult(`An unexpected error occurred: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    runTest();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl p-8 rounded-lg shadow-lg bg-gray-800 text-center">
        <h1 className="text-2xl font-bold mb-4">Backend Status Check</h1>
        {loading ? (
          <p className="text-lg">Running checks...</p>
        ) : (
          <p className="text-lg p-4 bg-gray-700 rounded-md">{testResult}</p>
        )}
      </div>
    </div>
  );
};

export default SimpleTest;
