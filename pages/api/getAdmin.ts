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

  const { id } = req.query as Query;

  const { data, error } = await supabaseServerClient
    .from<definitions['admin']>('admin')
    .select('supabase_user_id')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).end('Error when fetching from admin');
  }

  if (!data) {
    return res.status(404).end();
  }

  const { supabase_user_id } = data;

  await supabaseServerClient.auth.api
    .listUsers()
    .then(({ error, data }) => {
      if (error) {
        return res.status(500).end('Error when fetching user list');
      }

      if (!data) return res.status(500).end();

      const admin = data.find((a) => a.id === supabase_user_id);

      if (!admin) return res.status(404).end();

      res.json(admin);
    })
    .catch(() => {
      res.status(500).end();
    });
};

export default getAdmin;
