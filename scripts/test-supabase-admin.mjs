import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.site" });

async function testSupabaseAdmin() {
  const url = "https://gzpdlqxjggyxlkeatvvf.supabase.co";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  console.log("Supabase URL:", url);
  console.log("Service key exists:", Boolean(key));

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 });
  if (error) {
    console.error("Supabase Admin Error:", error);
  } else {
    console.log("Supabase Admin Success! Total users found in auth:", data.users.length);
  }
}

testSupabaseAdmin();
