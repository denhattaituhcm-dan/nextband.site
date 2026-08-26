import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function checkFnOwner() {
  try {
    const fn = await prisma.$queryRawUnsafe(`
      SELECT p.proname, r.rolname as owner, p.prosecdef as security_definer
      FROM pg_proc p
      JOIN pg_roles r ON p.proowner = r.oid
      WHERE p.proname = 'handle_new_user';
    `);
    console.log("handle_new_user owner:", fn);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkFnOwner();
