import { createClient } from '@pankod/refine-supabase';

export const supabaseBrowserClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   TODO ganti NEXT_PUBLIC_TEMP_SERVICE_ROLE_KEY jadi SUPABASE_SERVICE_ROLE_KEY
  process.env.NEXT_PUBLIC_TEMP_SUPABASE_SERVICE_ROLE_KEY
);
