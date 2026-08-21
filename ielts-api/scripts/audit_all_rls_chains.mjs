import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:anhxtanhmat1@db.gzpdlqxjggyxlkeatvvf.supabase.co:6543/postgres?pgbouncer=true&connection_limit=5",
    },
  },
});

async function runForensicAudit() {
  console.log("=== [1] AUDITING ALL RLS POLICIES ACROSS ALL TABLES ===");
  const allPolicies = await prisma.$queryRaw`
    SELECT 
      schemaname, 
      tablename, 
      policyname, 
      permissive, 
      roles, 
      cmd, 
      qual, 
      with_check
    FROM pg_policies
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname;
  `;

  console.log(`Total public policies found: ${allPolicies.length}`);
  
  // Detect potential cross-table references in policies
  const tableGraph = {};
  for (const p of allPolicies) {
    const table = p.tablename;
    const expr = (p.qual || "") + " " + (p.with_check || "");
    
    // Find mentioned public tables in SQL expression
    const referencedTables = [];
    const allTableNames = [...new Set(allPolicies.map(x => x.tablename))];
    for (const otherTable of allTableNames) {
      if (otherTable !== table) {
        const regex = new RegExp(`\\b(FROM|JOIN|TABLE)\\s+(public\\.)?${otherTable}\\b`, 'i');
        if (regex.test(expr)) {
          referencedTables.push(otherTable);
        }
      }
    }
    
    tableGraph[table] = tableGraph[table] || {};
    tableGraph[table][p.policyname] = {
      cmd: p.cmd,
      referencedTables,
      qual: p.qual,
    };
  }

  console.log("=== RLS Cross-Table Dependency Graph ===");
  console.log(JSON.stringify(tableGraph, null, 2));

  console.log("\n=== [2] AUDITING ALL TRIGGERS ON AUTH & PUBLIC TABLES ===");
  const triggers = await prisma.$queryRaw`
    SELECT 
      event_object_schema,
      event_object_table,
      trigger_name,
      event_manipulation,
      action_statement,
      action_timing
    FROM information_schema.triggers
    WHERE event_object_schema IN ('public', 'auth')
    ORDER BY event_object_schema, event_object_table, trigger_name;
  `;
  console.log(JSON.stringify(triggers, null, 2));

  console.log("\n=== [3] AUDITING ALL CUSTOM POSTGRESQL FUNCTIONS USED IN POLICIES ===");
  const functions = await prisma.$queryRaw`
    SELECT 
      p.proname,
      p.prosecdef as is_security_definer,
      pg_get_functiondef(p.oid) as def
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
      AND p.proname IN ('has_role', 'is_teacher_of_class', 'is_student_in_class', 'is_admin', 'is_teacher')
    ORDER BY p.proname;
  `;
  console.log(JSON.stringify(functions, null, 2));

  await prisma.$disconnect();
}

runForensicAudit().catch(console.error);
