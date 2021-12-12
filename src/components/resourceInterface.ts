import { definitions } from 'src/types/supabase';

type GeneratedToProvider<E extends Record<string, unknown>> = Omit<E, 'id'> & {
  id?: string;
};

export type ICabang = GeneratedToProvider<definitions['cabang']>;
export type IServiceCategory = GeneratedToProvider<
  definitions['service_category']
>;

export type IService = GeneratedToProvider<definitions['service']>;
export type IKlien = GeneratedToProvider<definitions['klien']>;
