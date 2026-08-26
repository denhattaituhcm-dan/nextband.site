import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function checkAdminCreateUserParams() {
  try {
    const res = await prisma.$queryRawUnsafe(`
      SELECT specific_name, parameter_name, data_type, parameter_mode, ordinal_position
      FROM information_schema.parameters
      WHERE specific_schema = 'public' AND specific_name LIKE '%admin_create_user%'
      ORDER BY specific_name, ordinal_position;
    `);
    console.log("admin_create_user parameters in DB:", JSON.stringify(res, null, 2));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdminCreateUserParams();
