import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper do pobierania terapeutów
export const getTherapists = async () => {
  const { data, error } = await supabase
    .from('therapists')
    .select('*')
    .eq('is_active', true)
    .order('name');
  
  if (error) throw error;
  return data;
};

export const getTherapistBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('therapists')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  
  if (error) throw error;
  return data;
};