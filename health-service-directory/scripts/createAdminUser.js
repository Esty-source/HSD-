import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://rvljxumyxbrjtlqkcmnj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGp4dW15eGJyanRscWtjbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzQ2NTksImV4cCI6MjA2MjAxMDY1OX0.bL9W2dAt-nUy0MDng6S6Cq5mVY84zDHV9Rc8tSSy8Cw';
const supabase = createClient(supabaseUrl, supabaseKey);

// Admin user details
const adminEmail = 'admin@healthdirectory.com';
const adminPassword = 'AdminAccess2025!';
const adminName = 'System Administrator';

async function createAdminUser() {
  try {
    console.log('Starting admin user creation process...');
    
    // Step 1: Check if an admin user already exists in the profiles table
    const { data: existingProfiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, name, role')
      .eq('role', 'admin');
    
    if (profilesError) {
      console.error('Error checking for existing admin profiles:', profilesError);
      // Continue anyway to try creating a new admin
    } else if (existingProfiles && existingProfiles.length > 0) {
      console.log(`Found ${existingProfiles.length} existing admin profiles.`);
      console.log('You may already have admin access. Try logging in with your credentials.');
      // Continue anyway to create a new admin if needed
    }
    
    console.log('Creating new admin user...');
    
    // Step 2: Create the user in Supabase Auth
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
      console.error('Error creating auth user:', signUpError);
      
      // If the error is that the user already exists, try to sign in
      if (signUpError.message.includes('already exists')) {
        console.log('User already exists in auth system. Attempting to sign in...');
        
        // Try to sign in with the provided credentials
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword
        });
        
        if (signInError) {
          console.error('Error signing in:', signInError);
          console.log('If you already have an account with this email but forgot the password, please use the password reset feature on the login page.');
          return;
        }
        
        console.log('Successfully signed in!');
        
        // Update the user metadata to have admin role
        const { error: updateError } = await supabase.auth.updateUser({
          data: { role: 'admin' }
        });
        
        if (updateError) {
          console.error('Error updating user role:', updateError);
          // Continue anyway to check/update the profile
        } else {
          console.log('Updated user metadata with admin role');
        }
        
        // Check if profile exists for this user
        const { data: existingProfile, error: profileCheckError } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('id', signInData.user.id)
          .maybeSingle();
        
        if (profileCheckError && profileCheckError.code !== 'PGRST116') {
          console.error('Error checking for existing profile:', profileCheckError);
        }
        
        // Create or update profile
        if (!existingProfile) {
          console.log('Creating new profile for existing user...');
          const { error: createProfileError } = await supabase
            .from('profiles')
            .insert([{
              id: signInData.user.id,
              name: adminName,
              role: 'admin'
            }]);
          
          if (createProfileError) {
            console.error('Error creating profile for existing user:', createProfileError);
          } else {
            console.log('Created new profile for existing user');
          }
        } else if (existingProfile.role !== 'admin') {
          console.log('Updating existing profile to admin role...');
          const { error: updateProfileError } = await supabase
            .from('profiles')
            .update({ role: 'admin', name: adminName })
            .eq('id', signInData.user.id);
          
          if (updateProfileError) {
            console.error('Error updating existing profile:', updateProfileError);
          } else {
            console.log('Updated existing profile to admin role');
          }
        } else {
          console.log('User already has an admin profile');
        }
        
        console.log('\n===== ADMIN ACCESS DETAILS =====');
        console.log('Email:', adminEmail);
        console.log('Password: [As provided]');
        console.log('You can now log in with these credentials at the /auth page.');
        return;
      }
      return;
    }
    
    if (!authData || !authData.user) {
      console.error('Failed to create user: No user data returned');
      return;
    }
    
    console.log('Auth user created successfully with ID:', authData.user.id);
    
    // Step 3: Create profile record - only include fields we know exist in the schema
    console.log('Creating profile record with fields that match the schema...');
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: authData.user.id,
        name: adminName,
        role: 'admin'
        // Note: email is not included as it's not in the profiles table schema
      }]);
    
    if (profileError) {
      console.error('Error creating profile:', profileError);
      return;
    }
    
    console.log('Profile created successfully!');
    console.log('\n===== ADMIN ACCESS DETAILS =====');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('You can now log in with these credentials at the /auth page.');
    console.log('\nIMPORTANT: Save these credentials securely. You will need them to access the admin dashboard.');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the function
createAdminUser();
