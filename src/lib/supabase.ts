import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Debug: show loaded env values (will appear in browser console)
// console.log('Supabase URL (trimmed):', supabaseUrl);
// console.log('Supabase Anon Key (trimmed):', supabaseAnonKey);
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing or empty after trimming.');
}

// This block is now handled above with explicit error logging.

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
