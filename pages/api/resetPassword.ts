import { supabaseServerClient } from '@utility/supabaseServerClient';
import { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const resetPassword: NextApiHandler = async (req, res) => {
  await cors(req, res, {
    origin: process.env.NEXT_PUBLIC_BASE_URL,
    methods: ['POST'],
    optionsSuccessStatus: 200,
  });

  const { email } = req.body as { email: string };
  await supabaseServerClient.auth.api
    .resetPasswordForEmail(email)
    .then(({ error }) => {
      if (error) {
        return res.status(404).json({
          msg: 'Email not found',
        });
      }
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).json({ msg: 'Internal Error' });
    });
};

export default resetPassword;
