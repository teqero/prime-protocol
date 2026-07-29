import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://porfqpisbolyepgvxyhr.supabase.co';
// Use the legacy anon key for auth operations
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcmZxcGlzYm9seWVwZ3Z4eWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNjg2NzIsImV4cCI6MjEwMDg0NDY3Mn0.Oltw7MPZkMOsb_dis11YB4WJRHFnMurYBvpYlcwGvn4';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
