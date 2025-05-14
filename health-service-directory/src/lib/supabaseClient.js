import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rvljxumyxbrjtlqkcmnj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bGp4dW15eGJyanRscWtjbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzQ2NTksImV4cCI6MjA2MjAxMDY1OX0.bL9W2dAt-nUy0MDng6S6Cq5mVY84zDHV9Rc8tSSy8Cw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 