import { definitions } from 'src/types/supabase';

export type ICabang = Omit<definitions['cabang'], 'id'> & { id?: string };
