import { AuthProvider } from '@pankod/refine';
import nookies from 'nookies';
import { supabaseClient } from '.';

export type ILoginParam = {
  email: string;
  password: string;
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
  getUserIdentity: async () => {
    const user = supabaseClient.auth.user();

    if (user) {
      return Promise.resolve({
        ...user,
        name: user.email,
      });
    }
  },
};
