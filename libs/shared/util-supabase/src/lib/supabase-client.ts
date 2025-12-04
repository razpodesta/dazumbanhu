import { createBrowserClient } from '@supabase/ssr';

/*
 * NOTA: Las variables de entorno deben estar prefijadas con NEXT_PUBLIC_
 * para ser visibles en el navegador.
 */
const SUPABASE_URL = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const SUPABASE_ANON_KEY = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!;

export const createClient = () => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase URL and Anon Key are required in environment variables');
  }

  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};
