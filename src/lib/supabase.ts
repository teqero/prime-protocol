import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://porfqpisbolyepgvxyhr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcmZxcGlzYm9seWVwZ3Z4eWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyNjg2NzIsImV4cCI6MjEwMDg0NDY3Mn0.Oltw7MPZkMOsb_dis11YB4WJRHFnMurYBvpYlcwGvn4';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Edge Function helpers for admin auth (bypasses PostgREST RPC issues)
const EDGE_BASE = `${supabaseUrl}/functions/v1/admin-auth`;

async function edgePost(path: string, body: object) {
  const res = await fetch(`${EDGE_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export async function adminLogin(email: string, password: string) {
  return edgePost('/login', { email, password });
}

export async function adminVerifyToken(token: string) {
  return edgePost('/verify', { token });
}

export async function adminLogout(token: string) {
  return edgePost('/logout', { token });
}
