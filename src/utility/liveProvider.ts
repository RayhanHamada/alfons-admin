import { liveProvider as supabaseLiveProvider } from '@pankod/refine-supabase';
import { supabaseClient } from './supabaseClient';

export const liveProvider = supabaseLiveProvider(supabaseClient);
