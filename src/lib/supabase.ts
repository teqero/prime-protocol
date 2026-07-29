import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://porfqpisbolyepgvxyhr.supabase.co';
const supabaseKey = 'sb_publishable_WZglRALYRhiAQcXEzc0kFQ_n5MuvZ3O';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
