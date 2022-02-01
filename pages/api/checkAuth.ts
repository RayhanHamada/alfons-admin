import type { Query, Res } from '@customTypes/api/checkAuth';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const checkAuth: NextApiHandler<Res> = async (req, res) => {
  await cors(req, res, {});

  const { token } = req.query as Query;
  const { user, error } = await supabaseServerClient.auth.api.getUser(token);

  if (error) {
    res.status(500).end();
    return;
  }

  if (!user) {
    res.status(404).end();
    return;
  }

  res.json(user);
};

export default checkAuth;
