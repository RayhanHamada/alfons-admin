import type { SupabaseBrowserClient } from '@utility/supabaseBrowserClient';

export type ILoginParam = {
  email: string;
  password: string;
};

export type IUserIdentity = ReturnType<
  SupabaseBrowserClient['auth']['user']
> & {
  name?: string;
  cabangId: number;
  adminId: number;
  adminRole: 'admin' | 'superadmin';
};
