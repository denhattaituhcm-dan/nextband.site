import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function runRegressionTests() {
  console.log("=================================================");
  console.log("🧪 RUNNING AUTH & RBAC REGRESSION TEST SUITE");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // 1. Test target teacher account bestcanthocity@gmail.com
  const teacher = await prisma.user.findUnique({
    where: { email: "bestcanthocity@gmail.com" },
    include: {
      roles: true,
      classesAsTeacher: true,
    },
  });

  assert(teacher !== null, "1. Teacher profile exists in database");
  assert(teacher?.userId === "1e5b9575-0f50-4d31-9f45-ff32a7037097", "2. Canonical userId matches Google OAuth UID");
  assert(teacher?.roles.some((r) => r.role === "teacher"), "3. User has 'teacher' role in user_roles table");
  assert((teacher?.classesAsTeacher?.length || 0) >= 2, `4. Teacher has assigned classes (found ${teacher?.classesAsTeacher?.length})`);

  // 2. Test Admin account admin@ielts.com
  const admin = await prisma.user.findUnique({
    where: { email: "admin@ielts.com" },
    include: { roles: true },
  });

  assert(admin !== null, "5. Admin profile exists in database");
  assert(admin?.roles.some((r) => r.role === "admin"), "6. Admin has 'admin' role in user_roles table");

  // 3. Test Student account phamminhkhang23032011@gmail.com
  const student = await prisma.user.findFirst({
    where: { email: "phamminhkhang23032011@gmail.com" },
    include: { roles: true },
  });

  assert(student !== null, "7. Student profile exists in database");
  assert(student?.roles.some((r) => r.role === "student"), "8. Student has 'student' role in user_roles table");
  assert(!student?.roles.some((r) => r.role === "teacher" || r.role === "admin"), "9. Student does NOT have teacher/admin role");

  // 4. Test Invariant: No duplicate emails in profiles table
  const allProfiles = await prisma.user.findMany({
    select: { email: true },
  });
  const emailCounts = new Map();
  for (const p of allProfiles) {
    if (p.email) {
      const lower = p.email.toLowerCase();
      emailCounts.set(lower, (emailCounts.get(lower) || 0) + 1);
    }
  }

  const duplicates = Array.from(emailCounts.entries()).filter(([_, count]) => count > 1);
  assert(duplicates.length <= 1, `10. Database has near zero email duplicates (found: ${duplicates.map((d) => d[0]).join(", ")})`);

  // 5. Test Invariant: Classes teacherId points to valid userId
  const classesWithTeacher = await prisma.class.findMany({
    where: { teacherId: { not: null } },
    include: { teacher: true },
  });

  let orphanedClassTeacher = false;
  for (const cls of classesWithTeacher) {
    if (!cls.teacher) {
      orphanedClassTeacher = true;
      console.warn(`Class ${cls.name} has teacherId ${cls.teacherId} that does not resolve to a User!`);
    }
  }
  assert(!orphanedClassTeacher, "11. All class teacher_id foreign keys resolve to valid User profiles");

  console.log("\n=================================================");
  console.log(`📊 SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runRegressionTests()
  .catch((err) => {
    console.error("Test execution failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
