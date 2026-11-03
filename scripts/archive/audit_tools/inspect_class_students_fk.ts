import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function main() {
  // 1. Orphan class_students not in auth.users
  const orphanClassStudentsAuth = await prisma.$queryRawUnsafe(`
    SELECT cs.id, cs.class_id, cs.student_id
    FROM class_students cs
    LEFT JOIN auth.users u ON cs.student_id = u.id
    WHERE u.id IS NULL;
  `);
  console.log('ORPHAN class_students -> auth.users:', orphanClassStudentsAuth);

  // 2. class_students pointing to profiles.id instead of profiles.user_id
  const csPointingToProfileId = await prisma.$queryRawUnsafe(`
    SELECT cs.id, cs.class_id, cs.student_id, p.id as p_id, p.user_id as p_user_id, p.email
    FROM class_students cs
    JOIN profiles p ON cs.student_id = p.id
    WHERE p.id <> p.user_id;
  `);
  console.log('class_students pointing to profiles.id (where id != user_id):', csPointingToProfileId);

  // 3. class_students pointing to profiles.user_id
  const csPointingToProfileUserId = await prisma.$queryRawUnsafe(`
    SELECT cs.id, cs.class_id, cs.student_id, p.id as p_id, p.user_id as p_user_id, p.email
    FROM class_students cs
    JOIN profiles p ON cs.student_id = p.user_id
    WHERE p.id <> p.user_id;
  `);
  console.log('class_students pointing to profiles.user_id (where id != user_id):', csPointingToProfileUserId);

  // 4. Enrollments pointing to profiles.id instead of auth.users.id
  const orphanEnrollments = await prisma.$queryRawUnsafe(`
    SELECT e.id, e.course_id, e.student_id
    FROM enrollments e
    LEFT JOIN auth.users u ON e.student_id = u.id
    WHERE u.id IS NULL;
  `);
  console.log('ORPHAN enrollments -> auth.users:', orphanEnrollments);

  // 5. Total class_students records
  const totalCS = await prisma.$queryRawUnsafe(`SELECT count(*) FROM class_students;`);
  console.log('Total class_students:', totalCS);
}

main().catch(console.error).finally(() => prisma.$disconnect());
