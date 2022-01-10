import { definitions } from 'src/customTypes/supabase';

type GeneratedToProvider<
  E extends Record<string, unknown>,
  ID extends number | string = string
> = Omit<E, 'id'> & {
  id: ID;
};

export type ICabang = GeneratedToProvider<definitions['cabang']>;
export type IServiceCategory = GeneratedToProvider<
  definitions['service_category']
>;

export type IService = GeneratedToProvider<definitions['service']>;
export type IKlien = GeneratedToProvider<definitions['klien']>;
export type IStylish = GeneratedToProvider<definitions['stylish']>;
export type IAdmin = GeneratedToProvider<definitions['admin']>;
export type IAppointment = GeneratedToProvider<definitions['appointment']>;
export type IJam = GeneratedToProvider<definitions['jam']>;
