import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function inspectExistingAuthUser() {
  try {
    const user = await prisma.$queryRawUnsafe(`
      SELECT * FROM auth.users WHERE email = 'hoangmai@gmai.com';
    `);
    console.log("Existing user in auth.users:", JSON.stringify(user, null, 2));

    const identity = await prisma.$queryRawUnsafe(`
      SELECT * FROM auth.identities WHERE email = 'hoangmai@gmai.com';
    `);
    console.log("Existing identity:", JSON.stringify(identity, null, 2));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

inspectExistingAuthUser();
