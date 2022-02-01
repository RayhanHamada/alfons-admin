import { dataProvider as supabaseDataProvider } from '@pankod/refine-supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabaseBrowserClient } from '@utility/supabaseBrowserClient';

export const dataProvider = supabaseDataProvider(
  supabaseBrowserClient as unknown as SupabaseClient
);
