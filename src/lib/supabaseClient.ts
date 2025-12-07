import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars are missing: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Configure default PostgREST schema to 'rezkyyayang' so we can call .from('rsvp')
// Supabase anon client operates on the 'public' schema by default.
// If you need to access a non-public schema, expose it via a `public` view or move the table to `public`.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'rezkyyayang' },});
