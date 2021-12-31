import { ky } from './ky';

export const deleteAdmin = async (uid: string) =>
  ky.delete(`api/deleteAdmin?uid=${uid}`);
