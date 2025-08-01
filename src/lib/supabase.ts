// src/lib/supabase.ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Używamy zwykłego fetch zamiast klienta Supabase, żeby uniknąć WebLocks
export const getTherapists = async () => {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/therapists?is_active=eq.true&order=name`,
    {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    }
  );
  
  if (!response.ok) throw new Error('Failed to fetch therapists');
  return response.json();
};

export const getTherapistBySlug = async (slug: string) => {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/therapists?slug=eq.${slug}&is_active=eq.true&limit=1`,
    {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    }
  );
  
  if (!response.ok) throw new Error('Failed to fetch therapist');
  const data = await response.json();
  return data[0];
};