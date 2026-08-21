import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:anhxtanhmat1@db.gzpdlqxjggyxlkeatvvf.supabase.co:6543/postgres?pgbouncer=true&connection_limit=5",
    },
  },
});

async function checkRemainingPolicies() {
  const tables = [
    "courses",
    "enrollments",
    "homeworks",
    "class_attendance",
    "class_sessions",
    "answers",
    "submission_answers",
    "evidence",
    "academic_records",
    "invitations"
  ];

  const policies = await prisma.$queryRaw`
    SELECT 
      tablename, 
      policyname, 
      cmd, 
      qual, 
      with_check
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = ANY(${tables})
    ORDER BY tablename, policyname;
  `;

  for (const p of policies) {
    console.log(`Table: ${p.tablename} | Policy: ${p.policyname} | CMD: ${p.cmd}`);
    console.log(`  QUAL: ${p.qual}`);
    console.log(`  WITH CHECK: ${p.with_check}\n`);
  }

  // Also check handle_new_user definition!
  const funcDef = await prisma.$queryRaw`
    SELECT pg_get_functiondef(oid) as def
    FROM pg_proc
    WHERE proname = 'handle_new_user';
  `;
  console.log("=== handle_new_user Function Definition ===");
  console.log(funcDef[0]?.def);

  await prisma.$disconnect();
}

checkRemainingPolicies().catch(console.error);
