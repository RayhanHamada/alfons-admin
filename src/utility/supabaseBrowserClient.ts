import type { SupabaseClient } from '@bnjmnt4n/supabase-client';
import { definitions } from '@customTypes/supabase';
import { createClient } from '@pankod/refine-supabase';
import { supabaseAnonRoleKey, supabaseApiURL } from './constant';

type Defs = {
  [K in keyof definitions]: definitions[K];
};

export const supabaseBrowserClient = createClient(
  supabaseApiURL,
  supabaseAnonRoleKey
) as unknown as SupabaseClient<Defs>;

export type SupabaseBrowserClient = typeof supabaseBrowserClient;
