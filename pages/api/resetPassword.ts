import { Body } from '@customTypes/api/resetPassword';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const resetPassword: NextApiHandler = async (req, res) => {
  await cors(req, res, {});

  const { email } = req.body as Body;
  const { data, error } =
    await supabaseServerClient.auth.api.resetPasswordForEmail(email);

  if (error) {
    res.status(500).end();
    return;
  }

  if (!data) {
    res.status(404).end();
    return;
  }

  res.status(200).end();
};

export default resetPassword;
