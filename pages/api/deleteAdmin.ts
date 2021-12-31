import type { Query, Res } from '@customTypes/api/deleteAdmin';
import { definitions } from '@customTypes/supabase';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const deleteAdmin: NextApiHandler<Res> = async (req, res) => {
  await cors(req, res, {
    origin: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const { uid } = req.query as Query;

  const { data: userData, error: userError } =
    await supabaseServerClient.auth.api.deleteUser(
      uid,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

  if (userError) return res.status(500).end('Error when deleting from users');
  if (!userData) return res.status(404).end();

  const { data: adminData, error: adminError } = await supabaseServerClient
    .from<definitions['admin']>('admin')
    .delete({ returning: 'representation' })
    .eq('supabase_user_id', uid);

  if (adminError) return res.status(500).end('Error when deleting from admin');
  if (!adminData) return res.status(404).end();

  res.status(200).end();
};

export default deleteAdmin;
