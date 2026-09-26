import { createClient } from "@supabase/supabase-js";

const defaultSupabaseUrl = "https://dmamqxiukfiyhfbbcqsq.supabase.co";
const defaultSupabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtYW1xeGl1a2ZpeWhmYmJjcXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MzU4NzIsImV4cCI6MjEwNjAxMTg3Mn0.Krw579Zd0mFo9gL3I_eMRq9UwUeW5BSDQEOkJw3z0pA";
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
