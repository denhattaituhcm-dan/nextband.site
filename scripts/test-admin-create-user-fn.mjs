import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function checkAdminCreateUserFn() {
  try {
    const res = await prisma.$queryRawUnsafe(`
      SELECT routine_name, routine_type 
      FROM information_schema.routines 
      WHERE routine_schema = 'public' AND routine_name = 'admin_create_user';
    `);
    console.log("admin_create_user in DB:", res);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdminCreateUserFn();
