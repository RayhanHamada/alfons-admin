import { supabaseServerClient } from '@utility/supabaseServerClient';
import { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const updatePassword: NextApiHandler = async (req, res) => {
  await cors(req, res, {
    origin: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const { accessToken, password } = req.body as {
    accessToken: string;
    password: string;
  };
  await supabaseServerClient.auth.api
    .updateUser(accessToken, { password })
    .then(({ error, user }) => {
      if (error) {
        return res.status(404).json({
          msg: 'Email not found',
        });
      }
      if (!user) return res.status(200).end();

      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ msg: 'Internal Error' });
    });
};

export default updatePassword;
