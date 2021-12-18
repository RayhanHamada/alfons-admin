import { dataProvider as supabaseDataProvider } from '@pankod/refine-supabase';
import { supabaseBrowserClient } from '@utility/supabaseBrowserClient';

export const dataProvider = supabaseDataProvider(supabaseBrowserClient);
