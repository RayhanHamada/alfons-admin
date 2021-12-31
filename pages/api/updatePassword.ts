import type { Body } from '@customTypes/api/updatePassword';
import { baseURL } from '@utility/constant';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const updatePassword: NextApiHandler = async (req, res) => {
  await cors(req, res, {
    origin: baseURL,
  });

  const { accessToken, password } = req.body as Body;

  const { user, error } = await supabaseServerClient.auth.api.updateUser(
    accessToken,
    { password }
  );

  if (error) return res.status(500).end();
  if (!user) return res.status(404).end();

  res.status(200).json(user);
};

export default updatePassword;
