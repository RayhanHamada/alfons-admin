export type CreateAdminBody = {
  email: string;
  name: string;
  password: string;
  phone_number: string;
  cabang_id: number;
  adminRole: 'admin' | 'superadmin';
};
