import type { SupabaseServerClient } from '@utility/supabaseServerClient';

export type Query = {
  token: string;
};

export type Res = ReturnType<SupabaseServerClient['auth']['user']>;
