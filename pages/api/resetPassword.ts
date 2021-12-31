import { Body } from '@customTypes/api/resetPassword';
import { baseURL } from '@utility/constant';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const resetPassword: NextApiHandler = async (req, res) => {
  await cors(req, res, {
    origin: baseURL,
  });

  const { email } = req.body as Body;
  const { data, error } =
    await supabaseServerClient.auth.api.resetPasswordForEmail(email);

  if (error) return res.status(500).end();
  if (!data) return res.status(404).end();

  res.status(200).end();
};

export default resetPassword;
