import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function SupabaseCheck() {
  const [tables, setTables] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkTables() {
      try {
        setLoading(true);
        const results = {};

        // Check profiles table
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)
          .single();
        
        results.profiles = {
          exists: !profilesError,
          error: profilesError?.message,
          count: profilesData?.count || 0
        };
        
        // Check doctors table
        const { data: doctorsData, error: doctorsError } = await supabase
          .from('doctors')
          .select('count')
          .limit(1)
          .single();
        
        results.doctors = {
          exists: !doctorsError,
          error: doctorsError?.message,
          count: doctorsData?.count || 0
        };
        
        // Check patients table
        const { data: patientsData, error: patientsError } = await supabase
          .from('patients')
          .select('count')
          .limit(1)
          .single();
        
        results.patients = {
          exists: !patientsError,
          error: patientsError?.message,
          count: patientsData?.count || 0
        };
        
        // Check appointments table
        const { data: appointmentsData, error: appointmentsError } = await supabase
          .from('appointments')
          .select('count')
          .limit(1)
          .single();
        
        results.appointments = {
          exists: !appointmentsError,
          error: appointmentsError?.message,
          count: appointmentsData?.count || 0
        };
        
        // Check telemedicine table
        const { data: telemedicineData, error: telemedicineError } = await supabase
          .from('telemedicine')
          .select('count')
          .limit(1)
          .single();
        
        results.telemedicine = {
          exists: !telemedicineError,
          error: telemedicineError?.message,
          count: telemedicineData?.count || 0
        };
        
        // Check resources table
        const { data: resourcesData, error: resourcesError } = await supabase
          .from('resources')
          .select('count')
          .limit(1)
          .single();
        
        results.resources = {
          exists: !resourcesError,
          error: resourcesError?.message,
          count: resourcesData?.count || 0
        };
        
        // Check pharmacies table
        const { data: pharmaciesData, error: pharmaciesError } = await supabase
          .from('pharmacies')
          .select('count')
          .limit(1)
          .single();
        
        results.pharmacies = {
          exists: !pharmaciesError,
          error: pharmaciesError?.message,
          count: pharmaciesData?.count || 0
        };

        setTables(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    checkTables();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-xl font-bold text-red-600 mb-4">Error Checking Supabase</h1>
          <p className="text-gray-700">{error}</p>
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
            <p className="text-gray-700 mb-4">
              This page checks your Supabase database for existing tables and their status.
            </p>
            
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
                          `Table has ${info.count} rows`
                        ) : (
                          <span className="text-red-500">{info.error}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
