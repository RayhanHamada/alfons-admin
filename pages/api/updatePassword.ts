import type { Body } from '@customTypes/api/updatePassword';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const updatePassword: NextApiHandler = async (req, res) => {
  await cors(req, res, {});

  const { accessToken, password } = req.body as Body;

  const { user, error } = await supabaseServerClient.auth.api.updateUser(
    accessToken,
    { password }
  );

  if (error) {
    res.status(500).end();
    return;
  }

  if (!user) {
    res.status(404).end();
    return;
  }

  res.status(200).json(user);
};

export default updatePassword;
