import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function checkFnSource() {
  try {
    const fn = await prisma.$queryRawUnsafe(`
      SELECT prosrc FROM pg_proc WHERE proname = 'handle_new_user';
    `);
    console.log("handle_new_user prosrc:", fn);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkFnSource();
