// Simple script to add an admin user to Supabase
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Admin user details
const adminEmail = 'admin@healthservice.com';
const adminPassword = 'Admin123!';
const adminName = 'System Administrator';

async function createAdmin() {
  try {
    console.log('Creating admin user...');
    
    // Create user in Auth
    const { data, error } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          name: adminName,
          role: 'admin'
        }
      }
    });
    
    if (error) {
      console.error('Error creating admin user:', error.message);
      return;
    }
    
    console.log('Admin user created with ID:', data.user.id);
    
    // Create profile record
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        name: adminName,
        email: adminEmail,
        role: 'admin'
      });
      
    if (profileError) {
      console.error('Error creating admin profile:', profileError.message);
      return;
    }
    
    console.log('Admin profile created successfully!');
    console.log('-------------------------------------');
    console.log('Admin login credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('-------------------------------------');
    
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

createAdmin();
