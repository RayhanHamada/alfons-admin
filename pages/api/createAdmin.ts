import { CreateAdminBody } from '@customTypes/api/createAdmin';
import { definitions } from '@customTypes/supabase';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

type Response = ReturnType<typeof supabaseServerClient.auth.user>;

const createAdmin: NextApiHandler<Response> = async (req, res) => {
  await cors(req, res, {
    origin: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const { email, password, phone_number, name, cabang_id, adminRole } =
    req.body as CreateAdminBody;

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