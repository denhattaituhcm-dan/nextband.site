import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function checkAuthMigrations() {
  try {
    const authTables = await prisma.$queryRawUnsafe(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'auth'
      ORDER BY table_name;
    `);
    console.log("Auth tables:", authTables.map(t => t.table_name));

    const migrations = await prisma.$queryRawUnsafe(`
      SELECT * FROM auth.schema_migrations ORDER BY version DESC LIMIT 5;
    `);
    console.log("Latest auth schema migrations:", migrations);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkAuthMigrations();
