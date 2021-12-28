import type { Body } from '@customTypes/api/updatePassword';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const updatePassword: NextApiHandler = async (req, res) => {
  await cors(req, res, {
    origin: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const { accessToken, password } = req.body as Body;

  await supabaseServerClient.auth.api
    .updateUser(accessToken, { password })
    .then(({ error, user }) => {
      if (error) {
        return res.status(404).end();
      }
      if (!user) return res.status(200).end();

      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).end();
    });
};

export default updatePassword;
