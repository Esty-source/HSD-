// Script to create a default admin user in Supabase
// Run this script with: node createDefaultAdmin.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';

// Initialize dotenv
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Default admin user details
const adminEmail = 'admin@healthservice.com';
const adminPassword = 'Admin123!'; // Change this to a secure password
const adminName = 'System Administrator';

async function createDefaultAdmin() {
  try {
    console.log('Creating default admin user...');
    
    // First, try to sign up the user directly with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          name: adminName,
          role: 'admin'
        }
      }
    });
    
    if (authError) {
      console.error('Auth error:', authError);
      
      // If the error is because the user already exists, try to update their role
      if (authError.message.includes('already exists')) {
        console.log('User already exists, trying to sign in...');
        
        // Try to sign in to get the user ID
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword
        });
        
        if (signInError) {
          console.error('Sign in error:', signInError);
          return;
        }
        
        // Update the profile to ensure admin role
        const { error: updateError } = await supabase
          .from('profiles')
          .upsert([{
            id: signInData.user.id,
            name: adminName,
            email: adminEmail,
            role: 'admin'
          }]);
        
        if (updateError) {
          console.error('Profile update error:', updateError);
        } else {
          console.log('Admin profile updated successfully!');
          console.log('-------------------------------------');
          console.log('Admin login credentials:');
          console.log('Email:', adminEmail);
          console.log('Password:', adminPassword);
          console.log('-------------------------------------');
        }
      }
      return;
    }
    
    // Create profile record
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: authData.user.id,
        name: adminName,
        email: adminEmail,
        role: 'admin',
        phone: '',
        address: ''
      }]);
      
    if (profileError) {
      console.error('Error creating admin profile:', profileError);
      return;
    }
    
    console.log('Admin user created successfully!');
    console.log('-------------------------------------');
    console.log('Admin login credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('-------------------------------------');
    console.log('Please change the password after first login.');
    
  } catch (error) {
    console.error('Unexpected error creating admin user:', error);
  }
}

createDefaultAdmin();
