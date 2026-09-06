import { PrismaClient } from "@prisma/client";
import { ClassService } from "../server/services/class.service.js";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function runVerification() {
  console.log("=== STARTING REMEDIATION BATCH 01 VERIFICATION ===");
  const classService = new ClassService(prisma);

  // 1. Select a class for testing
  const targetClass = await prisma.class.findFirst({
    where: { status: "ACTIVE", isActive: true },
    include: { course: true },
  });

  if (!targetClass) {
    throw new Error("No active class found for testing");
  }
  console.log(`Testing with Class: "${targetClass.name}" (ID: ${targetClass.id}, CourseID: ${targetClass.courseId})`);

  // 2. Select the student with known ID drift: nextband4u@gmail.com
  // profiles.id = 'a8cbf4a1-e532-4992-ad26-e22ce7638055'
  // profiles.user_id = '3ebfb692-cb0e-459f-90a7-43f915c5e47f'
  const driftUser = await prisma.user.findFirst({
    where: { email: "nextband4u@gmail.com" },
  });

  if (!driftUser) {
    throw new Error("User nextband4u@gmail.com not found");
  }

  console.log(`Found Drift User: Email=${driftUser.email}, userId=${driftUser.userId}, id=${driftUser.id}`);

  // Also query raw profiles to confirm surrogate id
  const rawProfile: any = await prisma.$queryRawUnsafe(`
    SELECT id, user_id, email FROM profiles WHERE email = 'nextband4u@gmail.com';
  `);
  const profileRecord = rawProfile[0];
  console.log(`Raw Profile: id=${profileRecord?.id}, user_id=${profileRecord?.user_id}`);

  const adminOperator = { id: "admin-system-test", roles: ["admin"] };

  // TEST CASE 1: Add student using surrogate profile ID (which used to crash with FK violation)
  console.log("\n--- TEST CASE 1: Adding student using surrogate profile.id ---");
  const testSurrogateId = profileRecord?.id;
  console.log(`Calling addStudentsBatch with surrogate profile.id: ${testSurrogateId}`);

  const addResult = await classService.addStudentsBatch(adminOperator, targetClass.id, {
    studentIds: [testSurrogateId],
  });

  console.log(`Add Result: addedCount=${addResult.addedCount}, success=${addResult.success}`);

  // Verify DB record in class_students
  const csRecord = await prisma.classStudent.findUnique({
    where: {
      classId_studentId: {
        classId: targetClass.id,
        studentId: driftUser.userId, // MUST be canonical Auth UID
      },
    },
  });

  if (!csRecord) {
    throw new Error("FAIL: classStudent record was not created with canonical Auth UID!");
  }
  console.log("PASS: classStudent created with canonical Auth UID:", csRecord.studentId);

  // Verify Enrollment cascade
  if (targetClass.courseId) {
    const enrollmentRecord = await prisma.enrollment.findUnique({
      where: {
        courseId_studentId: {
          courseId: targetClass.courseId,
          studentId: driftUser.userId,
        },
      },
    });
    if (!enrollmentRecord) {
      throw new Error("FAIL: course enrollment was not cascaded!");
    }
    console.log("PASS: course enrollment cascaded for courseId:", enrollmentRecord.courseId);
  }

  // Verify Audit Log
  const auditLogs = await prisma.enrollmentAuditLog.findMany({
    where: {
      classId: targetClass.id,
      studentId: driftUser.userId,
    },
    orderBy: { createdAt: "desc" },
    take: 1,
  });
  if (auditLogs.length === 0) {
    throw new Error("FAIL: enrollmentAuditLog not written!");
  }
  console.log("PASS: enrollmentAuditLog verified:", auditLogs[0].action, auditLogs[0].reason);

  // TEST CASE 2: Batch Email Addition with non-existing email (pre-provisioning)
  console.log("\n--- TEST CASE 2: Batch add by email (including pre-provisioning) ---");
  const testRandomEmail = `test_remediation_${Date.now()}@example.com`;
  console.log(`Adding by email: ${testRandomEmail}`);

  const emailResult = await classService.addStudentsBatch(adminOperator, targetClass.id, {
    emails: [testRandomEmail],
  });
  console.log(`Email Batch Result: addedCount=${emailResult.addedCount}, success=${emailResult.success}`);

  // Verify created user in DB
  const createdUser = await prisma.user.findFirst({
    where: { email: testRandomEmail },
  });
  if (!createdUser) {
    throw new Error(`FAIL: user ${testRandomEmail} was not created!`);
  }
  console.log(`PASS: user pre-provisioned with canonical userId: ${createdUser.userId}`);

  // Verify class_student record
  const emailCsRecord = await prisma.classStudent.findUnique({
    where: {
      classId_studentId: {
        classId: targetClass.id,
        studentId: createdUser.userId,
      },
    },
  });
  if (!emailCsRecord) {
    throw new Error("FAIL: classStudent record for email user was not created!");
  }
  console.log("PASS: classStudent record for email user verified:", emailCsRecord.studentId);

  // TEST CASE 3: Remove student (clean up created test records)
  console.log("\n--- TEST CASE 3: Removing student via service ---");
  await classService.removeStudent(adminOperator, targetClass.id, testRandomEmail);
  const droppedCs = await prisma.classStudent.findUnique({
    where: {
      classId_studentId: {
        classId: targetClass.id,
        studentId: createdUser.userId,
      },
    },
  });
  if (droppedCs?.status !== "DROPPED") {
    throw new Error("FAIL: status was not updated to DROPPED!");
  }
  console.log("PASS: Student successfully removed, status is now DROPPED");

  // Clean up the dummy created user and dummy class_student for test cleanliness
  console.log("\nCleaning up test artifacts...");
  await prisma.enrollmentAuditLog.deleteMany({
    where: { studentId: createdUser.userId },
  });
  if (targetClass.courseId) {
    await prisma.enrollment.deleteMany({
      where: { studentId: createdUser.userId },
    });
  }
  await prisma.classStudent.deleteMany({
    where: { studentId: createdUser.userId },
  });
  await prisma.userRole.deleteMany({
    where: { userId: createdUser.userId },
  });
  await prisma.user.deleteMany({
    where: { userId: createdUser.userId },
  });
  await prisma.$queryRawUnsafe(`DELETE FROM auth.users WHERE id = '${createdUser.userId}';`).catch(() => {});
  console.log("Cleanup completed.");

  console.log("\n=== ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ===");
}

runVerification()
  .catch((err) => {
    console.error("VERIFICATION FAILED:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
