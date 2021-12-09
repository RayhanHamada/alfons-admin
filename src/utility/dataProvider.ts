import { dataProvider as supabaseDataProvider } from '@pankod/refine-supabase';
import { supabaseClient } from '@utility/supabaseClient';

export const dataProvider = supabaseDataProvider(supabaseClient);
