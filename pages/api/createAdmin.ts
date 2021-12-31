import type { Body, Res } from '@customTypes/api/createAdmin';
import { definitions } from '@customTypes/supabase';
import { baseURL } from '@utility/constant';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const createAdmin: NextApiHandler<Res> = async (req, res) => {
  await cors(req, res, {
    origin: baseURL,
  });

  const { email, password, phone_number, name, cabang_id, adminRole } =
    req.body as Body;

  /**
   * daftarkan user ke supabase (table auth.users)
   */
  const { user, error } = await supabaseServerClient.auth.signUp(
    {
      email,
      password,
    },
    {
      data: {
        adminRole,
      },
    }
  );

  if (error) {
    return res.status(500).end(JSON.stringify(error));
  }

  if (!user) {
    return res.status(500).end();
  }

  const { id } = user;

  /**
   * masukkan user admin ke tabel public.admin
   */
  await supabaseServerClient
    .from<definitions['admin']>('admin')
    .insert({
      name,
      phone_number,
      supabase_user_id: id,
      cabang_id,
    })
    .then(({ error }) => {
      if (error) {
        return res.status(500).end(JSON.stringify(error));
      }

      if (!user) {
        return res.status(500).end();
      }

      res.status(200).end();
    });
};

export default createAdmin;
