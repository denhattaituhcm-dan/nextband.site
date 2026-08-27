import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const enums: any = await prisma.$queryRawUnsafe(`
    SELECT t.typname as enum_name, e.enumlabel as enum_value
    FROM pg_type t 
    JOIN pg_enum e ON t.oid = e.enumtypid  
    JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'public'
    ORDER BY enum_name, e.enumsortorder;
  `);
  console.log('Enums:');
  console.log(enums);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
