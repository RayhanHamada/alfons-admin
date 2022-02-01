import type { Query, Res } from '@customTypes/api/deleteAdmin';
import { definitions } from '@customTypes/supabase';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const deleteAdmin: NextApiHandler<Res> = async (req, res) => {
  await cors(req, res, {});

  const { uid } = req.query as Query;

  const { data: userData, error: userError } =
    await supabaseServerClient.auth.api.deleteUser(uid);

  if (userError) {
    res.status(500).end('Error when deleting from users');
    return;
  }

  if (!userData) {
    res.status(404).end();
    return;
  }

  const { data: adminData, error: adminError } = await supabaseServerClient
    .from<definitions['admin']>('admin')
    .delete({ returning: 'representation' })
    .eq('supabase_user_id', uid);

  if (adminError) {
    res.status(500).end('Error when deleting from admin');
    return;
  }

  if (!adminData) {
    res.status(404).end();
    return;
  }

  res.status(200).end();
};

export default deleteAdmin;
