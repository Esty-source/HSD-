import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rvljxumyxbrjtlqkcmnj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGp4dW15eGJyanRscWtjbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzQ2NTksImV4cCI6MjA2MjAxMDY1OX0.bL9W2dAt-nUy0MDng6S6Cq5mVY84zDHV9Rc8tSSy8Cw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple test function to check if Supabase is accessible
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection with URL:', supabaseUrl);
    // Simple health check ping
    const { data, error } = await supabase.from('_config').select('*', { head: true });
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return { success: false, error: error.message };
    }
    
    console.log('Supabase connection test successful');
    return { success: true };
  } catch (err) {
    console.error('Supabase connection test exception:', err);
    return { success: false, error: err.message };
  }
};  