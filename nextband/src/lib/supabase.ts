import { createClient } from "@supabase/supabase-js";

const defaultSupabaseUrl = "https://qxtpbonwjmxmogriyfox.supabase.co";
const defaultSupabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4dHBib253am14bW9ncml5Zm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MDgyMzIsImV4cCI6MjEwNjE4NDIzMn0.q8p_26Lstv2Dh7AaFAFsncEWsqMXAU4lyZrO499wI1I";
const supabaseUrl = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) || (typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL) || defaultSupabaseUrl;
const supabaseAnonKey = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) || (typeof process !== "undefined" && process.env?.VITE_SUPABASE_ANON_KEY) || defaultSupabaseAnonKey;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
