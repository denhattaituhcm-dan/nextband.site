import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function checkPermissions() {
  try {
    const grants = await prisma.$queryRawUnsafe(`
      SELECT grantee, privilege_type 
      FROM information_schema.role_table_grants 
      WHERE table_name = 'profiles' AND table_schema = 'public';
    `);
    console.log("Grants on profiles:", grants);

    const fnDef = await prisma.$queryRawUnsafe(`
      SELECT routine_name, routine_definition, security_type, definer
      FROM information_schema.routines
      WHERE routine_name = 'handle_new_user';
    `);
    console.log("handle_new_user definition:", fnDef);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkPermissions();
