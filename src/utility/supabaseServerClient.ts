import { SupabaseClient } from '@bnjmnt4n/supabase-client';
import { definitions } from '@customTypes/supabase';
import { createClient } from '@supabase/supabase-js';
import { supabaseApiURL, supabaseServiceRoleKey } from './constant';

type Defs = {
  [K in keyof definitions]: definitions[K];
};

export const supabaseServerClient = createClient(
  supabaseApiURL,
  supabaseServiceRoleKey
) as unknown as SupabaseClient<Defs>;

export type SupabaseServerClient = typeof supabaseServerClient;
