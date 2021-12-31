import type { Query, Res } from '@customTypes/api/getAdmin';
import { definitions } from '@customTypes/supabase';
import { baseURL } from '@utility/constant';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const getAdmin: NextApiHandler<Res> = async (req, res) => {
  await cors(req, res, {
    origin: baseURL,
  });

  /**
   * ambild data dari table admin
   */
  const { id } = req.query as Query;

  const { data: adminData, error: adminError } = await supabaseServerClient
    .from<definitions['admin']>('admin')
    .select('supabase_user_id')
    .eq('id', id)
    .single();

  if (adminError) return res.status(500).end('Error when fetching from admin');
  if (!adminData) return res.status(404).end();

  /**
   * ambil data dari table users
   */
  const { supabase_user_id } = adminData;

  const { data: listData, error: listError } =
    await supabaseServerClient.auth.api.listUsers();

  if (listError) return res.status(500).end('Error when fetching user list');
  if (!listData) return res.status(500).end();

  const admin = listData.find((a) => a.id === supabase_user_id);

  if (!admin) return res.status(404).end();

  res.json(admin);
};

export default getAdmin;
