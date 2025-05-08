import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://rvljxumyxbrjtlqkcmnj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGp4dW15eGJyanRscWtjbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzQ2NTksImV4cCI6MjA2MjAxMDY1OX0.bL9W2dAt-nUy0MDng6S6Cq5mVY84zDHV9Rc8tSSy8Cw';
const supabase = createClient(supabaseUrl, supabaseKey);

// Admin user details
const adminEmail = 'admin@example.com';
const adminPassword = 'admin123'; // You should use a stronger password in production
const adminName = 'System Admin';

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', adminEmail);
    
    if (checkError) {
      throw checkError;
    }
    
    if (existingUsers && existingUsers.length > 0) {
      console.log('Admin user already exists');
      return;
    }
    
    // Create user in Auth
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
      throw signUpError;
    }
    
    console.log('Auth user created:', authData.user.id);
    
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
      throw profileError;
    }
    
    console.log('Admin profile created successfully');
    console.log('Admin email:', adminEmail);
    console.log('Admin password:', adminPassword);
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();
