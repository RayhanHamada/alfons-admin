import type { Query, Res } from '@customTypes/api/getAdmin';
import { baseURL } from '@utility/constant';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const getAdmin: NextApiHandler<Res> = async (req, res) => {
  await cors(req, res, {
    origin: baseURL,
  });

  const { uid } = req.query as Query;

  /**
   * ambil data dari table users
   */

  const { data: listData, error: listError } =
    await supabaseServerClient.auth.api.listUsers();

  if (listError) return res.status(500).end('Error when fetching user list');
  if (!listData) return res.status(500).end();

  const admin = listData.find((a) => a.id === uid);

  if (!admin) return res.status(404).end();

  res.json(admin);
};

export default getAdmin;
