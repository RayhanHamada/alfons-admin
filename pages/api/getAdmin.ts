import type { Query, Res } from '@customTypes/api/getAdmin';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const getAdmin: NextApiHandler<Res> = async (req, res) => {
  await cors(req, res, {});

  const { uid } = req.query as Query;

  /**
   * ambil data dari table users
   */

  const { data: listData, error: listError } =
    await supabaseServerClient.auth.api.listUsers();

  if (listError) {
    res.status(500).end('Error when fetching user list');
    return;
  }

  if (!listData) {
    res.status(500).end();
    return;
  }

  const admin = listData.find((a) => a.id === uid);

  if (!admin) {
    res.status(404).end();
    return;
  }

  res.json(admin);
};

export default getAdmin;
