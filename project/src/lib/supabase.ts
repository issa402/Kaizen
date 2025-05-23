import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Helper function to handle profile creation
export async function createOrUpdateProfile(userId: string, username: string) {
  const { error } = await supabase
    .from('profiles')
    .upsert(
      { id: userId, username },
      { onConflict: 'id' }
    );
  
  if (error) throw error;
}