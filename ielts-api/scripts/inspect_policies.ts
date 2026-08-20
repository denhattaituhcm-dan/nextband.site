import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const policies = await prisma.$queryRaw`
    SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
    FROM pg_policies
    WHERE tablename IN ('courses', 'classes', 'enrollments', 'exam_submissions', 'answers', 'user_roles', 'profiles', 'class_students')
    ORDER BY tablename, policyname;
  `;
  console.log(JSON.stringify(policies, null, 2));
}

main().finally(() => prisma.$disconnect());
