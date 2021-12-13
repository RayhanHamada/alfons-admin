import { AuthProvider } from '@pankod/refine';
import nookies from 'nookies';
import { definitions } from '../types/supabase';
import { supabaseClient } from './supabaseClient';

export type ILoginParam = {
  email: string;
  password: string;
};

export type IUserIdentity = ReturnType<typeof supabaseClient.auth.user> & {
  name?: string;
  cabangId: number;
};

export const authProvider: AuthProvider = {
  login: async ({ email, password }: ILoginParam) => {
    const { user, error, session } = await supabaseClient.auth.signIn({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return Promise.reject(error);
    }

    if (user && session) {
      nookies.set(null, 'token', session.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      return Promise.resolve();
    }
  },
  logout: async () => {
    nookies.destroy(null, 'token');
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve('/');
  },
  checkError: () => Promise.resolve(),
  checkAuth: async (ctx) => {
    const { token } = nookies.get(ctx);
    const { data: user } = await supabaseClient.auth.api.getUser(token);

    if (user) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: async () => {
    const user = supabaseClient.auth.user();

    if (user) {
      return Promise.resolve(user.role);
    }
  },
  getUserIdentity: async (): Promise<IUserIdentity | undefined> => {
    const user = supabaseClient.auth.user();

    if (user) {
      const { data, error } = await supabaseClient
        .from<definitions['admin']>('admin')
        .select('cabang_id', { count: 'exact' })
        .eq('supabase_user_id', user.id);

      if (error || !data) {
        console.log('Error mengambil data user.');
        return undefined;
      }

      return Promise.resolve({
        ...user,
        name: user.email,
        cabangId: data[0].cabang_id,
      });
    }

    return undefined;
  },
};
