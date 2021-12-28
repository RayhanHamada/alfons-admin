import { createClient } from '@pankod/refine-supabase';

export const supabaseBrowserClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export type SupabaseBrowserClient = typeof supabaseBrowserClient;
