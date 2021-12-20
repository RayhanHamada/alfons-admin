import { definitions } from '@customTypes/supabase';
import { supabaseServerClient } from '@utility/supabaseServerClient';
import { NextApiHandler } from 'next';
import cors from 'nextjs-cors';

type Body = {
  email: string;
  name: string;
  password: string;
  phone_number: string;
  cabang_id: number;
};

type Response = ReturnType<typeof supabaseServerClient.auth.user>;

const createAdmin: NextApiHandler<Response> = async (req, res) => {
  await cors(req, res, {
    origin: process.env.NEXT_PUBLIC_BASE_URL,
  });

  const { email, password, phone_number, name, cabang_id } = req.body as Body;

  /**
   * daftarkan user ke supabase (table auth.users)
   */
  const { data, error } = await supabaseServerClient.auth.api.createUser({
    email,
    password,
  });

  if (error) {
    return res.status(500).end(JSON.stringify(error));
  }

  if (!data) {
    return res.status(500).end();
  }

  const { id } = data;

  /**
   * masukkan data admin ke tabel public.admin
   */
  await supabaseServerClient
    .from<definitions['admin']>('admin')
    .insert({
      name,
      phone_number,
      email,
      supabase_user_id: id,
      cabang_id,
    })
    .then(({ error }) => {
      if (error) {
        return res.status(500).end(JSON.stringify(error));
      }

      if (!data) {
        return res.status(500).end();
      }

      res.status(200).end();
    });
};

export default createAdmin;
