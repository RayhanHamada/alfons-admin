import { createClient } from '@pankod/refine-supabase';
import { supabaseAnonRoleKey, supabaseApiURL } from './constant';

export const supabaseBrowserClient = createClient(
  supabaseApiURL,
  supabaseAnonRoleKey
);

export type SupabaseBrowserClient = typeof supabaseBrowserClient;
