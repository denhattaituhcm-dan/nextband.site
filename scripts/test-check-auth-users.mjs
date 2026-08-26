import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function checkAuthUsersCols() {
  try {
    const cols = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_schema = 'auth' AND table_name = 'users'
      ORDER BY ordinal_position;
    `);
    console.log("auth.users columns:", JSON.stringify(cols, null, 2));

    const sampleUser = await prisma.$queryRawUnsafe(`
      SELECT id, email, aud, role, confirmation_token, recovery_token, email_change_token_new, email_change
      FROM auth.users
      LIMIT 1;
    `);
    console.log("Sample user:", sampleUser);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkAuthUsersCols();
