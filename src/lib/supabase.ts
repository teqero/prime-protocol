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

// Admin users RPC helpers
export async function listAdminUsers() {
  const { data, error } = await supabase.rpc('list_admin_users');
  return { data, error };
}

export async function createAdminUser(email: string, password: string) {
  const { data, error } = await supabase.rpc('create_admin_user', { p_email: email, p_password: password });
  return { data, error };
}

export async function deleteAdminUser(id: string) {
  const { data, error } = await supabase.rpc('delete_admin_user', { p_id: id });
  return { data, error };
}

// Direct table inserts
export async function createEvent(event: { name: string; client: string; event_type: string; event_date: string; description?: string; status?: string }) {
  const { data, error } = await supabase.from('events').insert([event]).select().single();
  return { data, error };
}

export async function createContact(contact: { name: string; email: string; phone?: string; service?: string; message?: string; status?: string }) {
  const { data, error } = await supabase.from('contacts').insert([contact]).select().single();
  return { data, error };
}

// Update & Delete helpers
export async function updateEvent(id: string, event: Partial<{ name: string; client: string; event_type: string; event_date: string; description: string; status: string }>) {
  const { data, error } = await supabase.from('events').update(event).eq('id', id).select().single();
  return { data, error };
}

export async function deleteEvent(id: string) {
  const { error } = await supabase.from('events').delete().eq('id', id);
  return { error };
}

export async function updateContact(id: string, contact: Partial<{ name: string; email: string; phone: string; service: string; message: string; status: string }>) {
  const { data, error } = await supabase.from('contacts').update(contact).eq('id', id).select().single();
  return { data, error };
}

export async function deleteContact(id: string) {
  const { error } = await supabase.from('contacts').delete().eq('id', id);
  return { error };
}
  const { data, error } = await supabase.from('contacts').insert([contact]).select().single();
  return { data, error };
}
