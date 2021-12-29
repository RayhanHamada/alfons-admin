import type { SupabaseServerClient } from '@utility/supabaseServerClient';

export type Query = {
  id: string;
};

export type Res = ReturnType<SupabaseServerClient['auth']['user']>;
