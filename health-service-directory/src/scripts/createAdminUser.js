// Script to create an admin user in Supabase
// Run this script with: node createAdminUser.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Admin user details - change these as needed
const adminEmail = 'admin@healthservice.com';
const adminPassword = 'Admin123!'; // Change this to a secure password
const adminName = 'System Administrator';

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', adminEmail)
      .eq('role', 'admin');
      
    if (checkError) {
      console.error('Error checking for existing admin:', checkError);
      return;
    }
    
    if (existingUsers && existingUsers.length > 0) {
      console.log('Admin user already exists:', existingUsers[0].email);
      return;
    }
    
    // Create user in Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        name: adminName,
        role: 'admin'
      }
    });
    
    if (authError) {
      console.error('Error creating admin auth user:', authError);
      return;
    }
    
    console.log('Admin auth user created:', authData.user.id);
    
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
    
    console.log('Admin profile created successfully!');
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

createAdminUser();
