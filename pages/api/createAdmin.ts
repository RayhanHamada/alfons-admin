import type { Body, Res } from '@customTypes/api/createAdmin';
import { definitions } from '@customTypes/supabase';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import type { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

const createAdmin: NextApiHandler<Res> = async (req, res) => {
  await cors(req, res, {});

  const { email, password, phone_number, name, cabang_id, adminRole } =
    req.body as Body;

  /**
   * daftarkan user ke supabase (table auth.users)
   */
  const { user: userData, error: userError } =
    await supabaseServerClient.auth.signUp(
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

  if (userError) {
    res.status(500).end(JSON.stringify(userError));
    return;
  }

  if (!userData) {
    res.status(500).end();
    return;
  }

  const { id } = userData;

  /**
   * masukkan user admin ke tabel public.admin
   */
  const { error: adminError, data: adminData } = await supabaseServerClient
    .from<definitions['admin']>('admin')
    .insert({
      name,
      phone_number,
      supabase_user_id: id,
      cabang_id,
    })
    .single();

  if (adminError) {
    res.status(500).end(JSON.stringify(adminError));
    return;
  }

  if (!adminData) {
    res.status(500).end();
    return;
  }

  res.status(200).end();
};

export default createAdmin;
