import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function introspectAllTextColumns() {
  console.log("🔍 Introspecting PostgreSQL information_schema for all text/character columns...");

  const columns: Array<{ table_name: string; column_name: string; data_type: string }> =
    await prisma.$queryRaw`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND data_type IN ('text', 'character varying')
        AND table_name NOT LIKE '_prisma%'
      ORDER BY table_name, column_name;
    `;

  console.log(`Found ${columns.length} text columns across all public tables in database.\n`);

  const tablesMap = new Map<string, string[]>();
  for (const col of columns) {
    if (!tablesMap.has(col.table_name)) {
      tablesMap.set(col.table_name, []);
    }
    tablesMap.get(col.table_name)!.push(col.column_name);
  }

  for (const [table, cols] of tablesMap.entries()) {
    console.log(`Table '${table}': [${cols.join(", ")}]`);
  }

  return tablesMap;
}

introspectAllTextColumns()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
