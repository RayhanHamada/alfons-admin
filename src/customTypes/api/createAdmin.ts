import type { SupabaseServerClient } from '@utility/supabaseServerClient';

export type Body = {
  email: string;
  name: string;
  password: string;
  phone_number: string;
  cabang_id: number;
  adminRole: 'admin' | 'superadmin';
};

export type Res = ReturnType<SupabaseServerClient['auth']['user']>;
