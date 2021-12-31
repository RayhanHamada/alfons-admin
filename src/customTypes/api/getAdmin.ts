import type { SupabaseServerClient } from '@utility/supabaseServerClient';

export type Query = {
  uid: string;
};

export type Res = ReturnType<SupabaseServerClient['auth']['user']>;
