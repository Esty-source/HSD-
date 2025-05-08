import { createClient } from '@supabase/supabase-js';

// Supabase configuration from the user's credentials
const supabaseUrl = 'https://rvljxumyxbrjtlqkcmnj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGp4dW15eGJyanRscWtjbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzQ2NTksImV4cCI6MjA2MjAxMDY1OX0.bL9W2dAt-nUy0MDng6S6Cq5mVY84zDHV9Rc8tSSy8Cw';
const supabase = createClient(supabaseUrl, supabaseKey);

// Admin user details
const adminEmail = 'admin@healthdirectory.com';
const adminPassword = 'AdminAccess2025!';
const adminName = 'System Administrator';

async function setupDatabase() {
  try {
    console.log('Starting database setup...');
    
    // Step 1: Create admin user in auth system
    console.log('Creating admin user in auth system...');
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          name: adminName,
          role: 'admin'
        }
      }
    });
    
    if (signUpError) {
      if (signUpError.message.includes('already exists')) {
        console.log('Admin user already exists in auth system, signing in...');
        
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword
        });
        
        if (signInError) {
          console.error('Error signing in:', signInError);
          return;
        }
        
        console.log('Admin signed in successfully');
        
        // Use the signed in user data
        if (signInData && signInData.user) {
          authData = signInData;
        } else {
          console.error('No user data returned from sign in');
          return;
        }
      } else {
        console.error('Error creating admin user:', signUpError);
        return;
      }
    }
    
    if (!authData || !authData.user) {
      console.error('No user data returned');
      return;
    }
    
    const userId = authData.user.id;
    console.log('Admin user ID:', userId);
    
    // Step 2: Check if profiles table exists and create it if needed
    console.log('Checking profiles table...');
    
    // Try to get the structure of the profiles table
    const { data: tableInfo, error: tableError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
      
    if (tableError && tableError.code === 'PGRST116') {
      console.log('Profiles table does not exist or is empty, creating it...');
      
      // Create the profiles table with SQL
      const { error: createTableError } = await supabase.rpc('create_profiles_table');
      
      if (createTableError) {
        console.error('Error creating profiles table with RPC:', createTableError);
        console.log('Trying to create profile directly...');
      }
    } else if (tableError) {
      console.error('Error checking profiles table:', tableError);
    } else {
      console.log('Profiles table exists');
    }
    
    // Step 3: Create or update admin profile
    console.log('Creating/updating admin profile...');
    
    // Check if profile already exists
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('id, name, role')
      .eq('id', userId)
      .maybeSingle();
      
    if (profileCheckError && profileCheckError.code !== 'PGRST116') {
      console.error('Error checking for existing profile:', profileCheckError);
    }
    
    if (!existingProfile) {
      // Create new profile with minimal fields to avoid schema issues
      const { error: createProfileError } = await supabase
        .from('profiles')
        .insert([{
          id: userId,
          name: adminName,
          role: 'admin'
        }]);
        
      if (createProfileError) {
        console.error('Error creating profile:', createProfileError);
        
        // If there's an error about missing columns, let's try to determine the actual schema
        console.log('Attempting to determine actual schema...');
        const { data: schemaData, error: schemaError } = await supabase.rpc('get_table_schema', { table_name: 'profiles' });
        
        if (schemaError) {
          console.error('Error getting schema:', schemaError);
        } else if (schemaData) {
          console.log('Profiles table schema:', schemaData);
          
          // Try to create profile again with only id and name if those columns exist
          const { error: retryError } = await supabase
            .from('profiles')
            .insert([{
              id: userId,
              name: adminName
            }]);
            
          if (retryError) {
            console.error('Error creating minimal profile:', retryError);
          } else {
            console.log('Created minimal profile successfully');
          }
        }
      } else {
        console.log('Admin profile created successfully');
      }
    } else {
      // Update existing profile
      const { error: updateProfileError } = await supabase
        .from('profiles')
        .update({ 
          name: adminName,
          role: 'admin' 
        })
        .eq('id', userId);
        
      if (updateProfileError) {
        console.error('Error updating profile:', updateProfileError);
      } else {
        console.log('Admin profile updated successfully');
      }
    }
    
    // Step 4: Create necessary tables for the application
    console.log('Creating other necessary tables...');
    
    // Create doctors table if it doesn't exist
    const { error: doctorsTableError } = await supabase.rpc('create_doctors_table_if_not_exists');
    if (doctorsTableError) {
      console.error('Error creating doctors table:', doctorsTableError);
    } else {
      console.log('Doctors table created or already exists');
    }
    
    // Create patients table if it doesn't exist
    const { error: patientsTableError } = await supabase.rpc('create_patients_table_if_not_exists');
    if (patientsTableError) {
      console.error('Error creating patients table:', patientsTableError);
    } else {
      console.log('Patients table created or already exists');
    }
    
    // Create appointments table if it doesn't exist
    const { error: appointmentsTableError } = await supabase.rpc('create_appointments_table_if_not_exists');
    if (appointmentsTableError) {
      console.error('Error creating appointments table:', appointmentsTableError);
    } else {
      console.log('Appointments table created or already exists');
    }
    
    console.log('\nDatabase setup completed!');
    console.log('Admin credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('\nYou can now access the admin dashboard at /admin-access');
    
  } catch (error) {
    console.error('Unexpected error during database setup:', error);
  }
}

// Run the setup function
setupDatabase();
