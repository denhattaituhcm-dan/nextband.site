import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const url = "https://gzpdlqxjggyxlkeatvvf.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cGRscXhqZ2d5eGxrZWF0dnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyOTc3NjMsImV4cCI6MjEwMDg3Mzc2M30.M7uMAo2qJCDQtxQMP-_58VKF1LfSBdwR31gpvqcCN6I";

const supabase = createClient(url, anonKey);

async function testSignIn() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  const testEmail = `test_login_${Date.now()}@test.com`;
  const testPw = "P@ssword123!";

  try {
    const res = await prisma.$queryRawUnsafe(`
      SELECT public.admin_create_user(
        $1::text,
        'Test Login Student',
        '0909999888',
        'female',
        'student',
        $2::text
      ) as result;
    `, testEmail, testPw);

    const userId = res[0].result.user_id;
    console.log("Created user with ID:", userId);


    // Insert identity with id = user_id
    await prisma.$executeRawUnsafe(`
      INSERT INTO auth.identities (
        id, provider_id, user_id, identity_data, provider,
        last_sign_in_at, created_at, updated_at
      ) VALUES (
        $1::uuid,
        $2::text,
        $1::uuid,
        jsonb_build_object('sub', $2::text, 'email', $3::text),
        'email',
        now(),
        now(),
        now()
      );
    `, userId, userId, testEmail);

    console.log("Identity created with id = userId");

    // Test sign in
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPw,
    });

    if (authError) {
      console.error("signInWithPassword Error:", authError);
    } else {
      console.log("signInWithPassword SUCCESS! User ID:", authData.user.id);
      console.log("Session token length:", authData.session.access_token.length);
    }

    // Cleanup
    await prisma.userRole.deleteMany({ where: { user: { email: testEmail } } });
    await prisma.user.deleteMany({ where: { email: testEmail } });
    await prisma.$executeRawUnsafe(`DELETE FROM auth.identities WHERE user_id = $1::uuid`, userId);
    await prisma.$executeRawUnsafe(`DELETE FROM auth.users WHERE email = $1`, testEmail);
    console.log("Cleanup finished.");

  } catch (err) {
    console.error("Error in test:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testSignIn();
