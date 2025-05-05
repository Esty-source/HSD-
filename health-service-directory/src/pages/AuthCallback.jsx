import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export default function AuthCallback() {
  const [message, setMessage] = useState('Verifying your account...');
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the URL hash parameters
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        
        // Check if we have an access_token (user is already authenticated)
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        
        if (accessToken) {
          // Set the session manually
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) throw error;
          
          // Get the user data
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError) throw userError;
          
          // Get the user's profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userData.user.id)
            .single();
          
          if (profileError) {
            // Profile doesn't exist yet, create it
            const userMetadata = userData.user.user_metadata;
            
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{
                id: userData.user.id,
                name: userMetadata.name || userData.user.email.split('@')[0],
                role: userMetadata.role || 'patient',
                email: userData.user.email
              }]);
              
            if (insertError) throw insertError;
            
            // Create role-specific record
            if (userMetadata.role === 'doctor') {
              await supabase
                .from('doctors')
                .insert([{ id: userData.user.id }]);
            } else if (userMetadata.role === 'patient' || !userMetadata.role) {
              await supabase
                .from('patients')
                .insert([{ id: userData.user.id }]);
            }
            
            // Fetch the profile again
            const { data: newProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', userData.user.id)
              .single();
              
            if (newProfile) {
              setMessage('Account verified successfully! Redirecting to dashboard...');
              toast.success('Account verified successfully!');
              
              // Redirect based on role
              setTimeout(() => {
                if (newProfile.role === 'admin') {
                  navigate('/dashboard/admin');
                } else if (newProfile.role === 'doctor') {
                  navigate('/dashboard/doctor');
                } else {
                  navigate('/dashboard/patient');
                }
              }, 2000);
            }
          } else {
            // Profile exists, redirect based on role
            setMessage('Account verified successfully! Redirecting to dashboard...');
            toast.success('Account verified successfully!');
            
            setTimeout(() => {
              if (profileData.role === 'admin') {
                navigate('/dashboard/admin');
              } else if (profileData.role === 'doctor') {
                navigate('/dashboard/doctor');
              } else {
                navigate('/dashboard/patient');
              }
            }, 2000);
          }
        } else {
          // No access token found, redirect to login
          setMessage('Verification link is invalid or expired. Please try logging in.');
          toast.error('Verification link is invalid or expired.');
          setTimeout(() => navigate('/auth'), 3000);
        }
      } catch (error) {
        console.error('Error during email confirmation:', error);
        setMessage('An error occurred during verification. Please try logging in.');
        toast.error('An error occurred during verification.');
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    handleEmailConfirmation();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            {message.includes('success') ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">Email Verification</h2>
        <p className="text-center text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center">
          {message.includes('invalid') && (
            <button
              onClick={() => navigate('/auth')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
