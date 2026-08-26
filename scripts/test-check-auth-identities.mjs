import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function checkAuthIdentities() {
  try {
    const cols = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_schema = 'auth' AND table_name = 'identities'
      ORDER BY ordinal_position;
    `);
    console.log("auth.identities columns:", JSON.stringify(cols, null, 2));

    const sampleIdentity = await prisma.$queryRawUnsafe(`
      SELECT * FROM auth.identities LIMIT 1;
    `);
    console.log("Sample identity:", sampleIdentity);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkAuthIdentities();
