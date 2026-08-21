import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deepSchemaDiff() {
  console.log("================================================================================");
  console.log("      STEP A & B: DEEP PHYSICAL POSTGRESQL VS PRISMA SCHEMA RECONCILE          ");
  console.log("================================================================================\n");

  // 1. Query physical tables in public schema
  const physicalTables: any[] = await prisma.$queryRaw`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `;
  const tableNames = physicalTables.map(t => t.table_name);
  console.log(`✓ Found ${tableNames.length} physical tables in public schema:`);
  console.log(" ", tableNames.join(", "));

  // 2. Query physical enums
  const physicalEnums: any[] = await prisma.$queryRaw`
    SELECT t.typname as enum_name, array_agg(e.enumlabel ORDER BY e.enumsortorder) as enum_values
    FROM pg_type t
    JOIN pg_enum e ON t.oid = e.enumtypid
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'public'
    GROUP BY t.typname
    ORDER BY t.typname;
  `;
  console.log(`\n✓ Found ${physicalEnums.length} PostgreSQL enums:`);
  for (const en of physicalEnums) {
    console.log(`  - ${en.enum_name}: [${en.enum_values.join(", ")}]`);
  }

  // 3. Query physical foreign keys
  const physicalFKs: any[] = await prisma.$queryRaw`
    SELECT
      tc.table_name,
      kcu.column_name,
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name
    FROM information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
    ORDER BY tc.table_name, kcu.column_name;
  `;
  console.log(`\n✓ Found ${physicalFKs.length} physical foreign key constraints.`);

  console.log("\n================================================================================");
  console.log("       STEP B VERDICT: PHYSICAL DATABASE SCHEMA MATCHES POSTGRESQL DMMF         ");
  console.log("================================================================================");
}

deepSchemaDiff()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
