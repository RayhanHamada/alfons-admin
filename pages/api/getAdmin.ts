import type { Query, Res } from '@customTypes/api/getAdmin';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const getAdmin: NextApiHandler<Res> = async (req, res) => {
  await cors(req, res, {
    origin: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const { token } = req.query as Query;
  await supabaseServerClient.auth.api
    .getUser(token)
    .then(({ error, user }) => {
      if (error) {
        return res.status(500).end();
      }

      if (!user) return;

      res.json(user);
    })
    .catch(() => {
      res.status(500).end();
    });
};

export default getAdmin;
