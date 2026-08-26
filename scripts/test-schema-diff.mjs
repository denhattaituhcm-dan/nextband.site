import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function checkSchema() {
  try {
    const tables = await prisma.$queryRawUnsafe(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);
    console.log("Existing tables in DB:", tables.map(t => t.table_name));

    const columns = await prisma.$queryRawUnsafe(`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `);
    
    // Group columns by table
    const tableCols = {};
    columns.forEach(c => {
      if (!tableCols[c.table_name]) tableCols[c.table_name] = [];
      tableCols[c.table_name].push(c.column_name);
    });

    console.log("\nProfiles columns:", tableCols['profiles']);
    console.log("\nclass_students columns:", tableCols['class_students']);
    console.log("\ncontact_leads columns:", tableCols['contact_leads']);
    console.log("\nclasses columns:", tableCols['classes']);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchema();
