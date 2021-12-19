import { supabaseServerClient } from '@utility/supabaseServerClient';
import { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

type Query = {
  token: string;
};

type Response = ReturnType<typeof supabaseServerClient.auth.user>;

const getAdmin: NextApiHandler<Response> = async (req, res) => {
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
