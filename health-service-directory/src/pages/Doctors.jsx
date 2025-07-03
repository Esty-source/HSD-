import React, { useState, useEffect } from 'react';
import { doctorsAPI } from '../lib/api';
import toast from 'react-hot-toast';

export default function Doctors() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await doctorsAPI.getAll();
      setDoctorsList(response.data);
    } catch (error) {
      toast.error('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Doctors</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsList.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{doctor.full_name}</h2>
                <p className="text-gray-600 mb-2">{doctor.specialization}</p>
                <p className="text-gray-500 mb-4">{doctor.contact}</p>
                <p className="text-gray-500">{doctor.address}</p>
                
                <div className="mt-4">
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {doctorsList.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No doctors available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
} 