import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:anhxtanhmat1@db.gzpdlqxjggyxlkeatvvf.supabase.co:6543/postgres?pgbouncer=true&connection_limit=5",
    },
  },
});

async function checkInvitationsAndHomeworks() {
  const policies = await prisma.$queryRaw`
    SELECT 
      tablename, 
      policyname, 
      cmd, 
      qual, 
      with_check
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('invitations', 'homeworks', 'evidence', 'exam_sections', 'questions')
    ORDER BY tablename, policyname;
  `;

  for (const p of policies) {
    console.log(`Table: ${p.tablename} | Policy: ${p.policyname} | CMD: ${p.cmd}`);
    console.log(`  QUAL: ${p.qual}`);
    console.log(`  WITH CHECK: ${p.with_check}\n`);
  }

  await prisma.$disconnect();
}

checkInvitationsAndHomeworks().catch(console.error);
