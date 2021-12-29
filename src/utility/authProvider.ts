import type { Res } from '@customTypes/api/checkAuth';
import type { ILoginParam, IUserIdentity } from '@customTypes/authProvider';
import type { definitions } from '@customTypes/supabase';
import type { AuthProvider } from '@pankod/refine';
import nookies from 'nookies';
import { ky } from './ky';
import { supabaseBrowserClient } from './supabaseBrowserClient';

export const authProvider: AuthProvider = {
  login: async ({ email, password }: ILoginParam) => {
    const { user, error, session } = await supabaseBrowserClient.auth.signIn({
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
    const { error } = await supabaseBrowserClient.auth.signOut();

    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: async (ctx) => {
    const { token } = nookies.get(ctx);

    let user: Res = null;

    await ky
      .get(`api/checkAuth?token=${token}`)
      .then(async (res) => {
        user = (await res.json()) as Res;
      })
      .catch(() => {});

    if (user) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: async () => {
    const user = supabaseBrowserClient.auth.user();

    if (user) {
      return Promise.resolve(user.role);
    }
  },
  getUserIdentity: async (): Promise<IUserIdentity | undefined> => {
    const user = supabaseBrowserClient.auth.user();

    if (user) {
      const { data, error } = await supabaseBrowserClient
        .from<definitions['admin']>('admin')
        .select('id,cabang_id', { count: 'exact' })
        .eq('supabase_user_id', user.id);

      if (error || !data) {
        console.log('Error mengambil data user.');
        return undefined;
      }

      return Promise.resolve({
        ...user,
        name: user.email,
        cabangId: data[0].cabang_id,
        adminId: data[0].id,
        adminRole: user.user_metadata.adminRole,
      });
    }

    return undefined;
  },
};
