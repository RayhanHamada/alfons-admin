import { Body as CreateAdminBody } from '@customTypes/api/createAdmin';
import { Body as UpdatePasswordBody } from '@customTypes/api/updatePassword';
import ogKy from 'ky';
import { baseAPIURL } from './constant';

const ky = ogKy.extend({
  prefixUrl: baseAPIURL,
  mode: 'cors',
});

export const deleteAdmin = async (uid: string) =>
  ky.delete(`deleteAdmin?uid=${uid}`);

export const resetPassword = async (email: string) =>
  ky.post('resetPassword', {
    json: {
      email,
    },
  });

export const updatePassword = async (accessToken: string, password: string) =>
  ky.post('updatePassword', {
    json: {
      accessToken,
      password,
    } as UpdatePasswordBody,
  });

export const createAdmin = async ({
  email,
  name,
  password,
  phone_number,
  cabang_id,
  adminRole,
}: CreateAdminBody) =>
  ky.post('createAdmin', {
    json: {
      email,
      name,
      password,
      phone_number,
      cabang_id,
      adminRole,
    },
  });

export const getAdmin = async (uid: string) => ky.get(`getAdmin?uid=${uid}`);

export const checkAuth = async (token: string) =>
  ky.get(`checkAuth?token=${token}`);
