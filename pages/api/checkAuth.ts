import type { Query, Res } from '@customTypes/api/checkAuth';
import { baseURL } from '@utility/constant';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const checkAuth: NextApiHandler<Res> = async (req, res) => {
  await cors(req, res, {
    origin: baseURL,
  });

  const { token } = req.query as Query;
  const { user, error } = await supabaseServerClient.auth.api.getUser(token);

  if (error) return res.status(500).end();
  if (!user) return res.status(404).end();

  res.json(user);
};

export default checkAuth;
