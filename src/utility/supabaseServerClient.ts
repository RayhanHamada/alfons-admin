import { createClient } from '@supabase/supabase-js';
import { supabaseApiURL, supabaseServiceRoleKey } from './constant';

export const supabaseServerClient = createClient(
  supabaseApiURL,
  supabaseServiceRoleKey
);

export type SupabaseServerClient = typeof supabaseServerClient;
