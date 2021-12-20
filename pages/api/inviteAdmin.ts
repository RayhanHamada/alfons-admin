import { supabaseServerClient } from '@utility/supabaseServerClient';
import { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const inviteAdmin: NextApiHandler = async (req, res) => {
  await cors(req, res, {
    origin: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const { email } = req.body as { email: string };
  await supabaseServerClient.auth.api
    .inviteUserByEmail(email)
    .then(({ error }) => {
      if (error) {
        return res.status(500).end(JSON.stringify(error));
      }

      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).end(JSON.stringify(err));
    });
};

export default inviteAdmin;
