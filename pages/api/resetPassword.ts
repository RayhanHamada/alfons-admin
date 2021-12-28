import { Body } from '@customTypes/api/resetPassword';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const resetPassword: NextApiHandler = async (req, res) => {
  await cors(req, res, {
    origin: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const { email } = req.body as Body;
  await supabaseServerClient.auth.api
    .resetPasswordForEmail(email)
    .then(({ error }) => {
      if (error) {
        return res.status(404).end('Email not found');
      }
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).json({ msg: 'Internal Error' });
    });
};

export default resetPassword;
