import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== STARTING CLEANUP OF ALL SYSTEM TEST DATA ===");

  // 1. DELETE FAKE / TEST NOTIFICATIONS
  console.log("\n--- 1. Cleaning up Test Notifications ---");
  const notifsToDelete = await prisma.notification.findMany({
    where: {
      OR: [
        { title: "Có Lead mới đăng ký tư vấn", message: { contains: "Tran Van Referee" } },
        { title: "Có Lead mới đăng ký tư vấn", message: { contains: "web_study_buddy" } },
        { title: "Khách tư vấn đã chuyển thành Học viên", message: { contains: "Le Thi Friend" } },
        { title: "Khách tư vấn đã chuyển thành Học viên", message: { contains: "example.com" } },
        { title: { contains: "Bộ Quà Tặng ARIS!" } },
        { title: { contains: "Bạn đồng hành đã hoàn tất đăng ký!" } },
        { title: "Kết quả bài thi", message: { contains: "WRITING TEST INTEGRITY" } },
        { title: "Kết quả bài thi", message: { contains: "INTEGRITY" } },
        { message: { contains: "example.com" } },
        { message: { contains: "web_study_buddy" } },
      ],
    },
    select: { id: true },
  });
  console.log(`Found ${notifsToDelete.length} test notifications to delete.`);
  if (notifsToDelete.length > 0) {
    const notifIds = notifsToDelete.map((n) => n.id);
    const delNotifs = await prisma.notification.deleteMany({
      where: { id: { in: notifIds } },
    });
    console.log(`Deleted ${delNotifs.count} test notifications.`);
  }

  // 2. DELETE DUMMY / TEST LEADS
  console.log("\n--- 2. Cleaning up Dummy / Test Leads ---");
  const dummyLeads = await prisma.contactLead.findMany({
    where: {
      OR: [
        { fullName: { in: ["h", "n", "f", "d", "fđ"] } },
        { phone: { in: ["h", "n", "f", "d"] } },
        { fullName: "Tran Van Referee" },
        { fullName: "Le Thi Friend" },
        { email: { contains: "example.com" } },
        { source: "web_study_buddy" },
      ],
    },
    select: { id: true, fullName: true },
  });
  console.log(`Found ${dummyLeads.length} dummy/test leads to delete.`);
  if (dummyLeads.length > 0) {
    const leadIds = dummyLeads.map((l) => l.id);
    // Delete any notifications linked to these leads
    await prisma.notification.deleteMany({
      where: { entityType: "LEAD", entityId: { in: leadIds } },
    });
    // Delete any attributions linked to these leads
    await prisma.referralReward.deleteMany({
      where: { attribution: { refereeLeadId: { in: leadIds } } },
    });
    await prisma.referralAttribution.deleteMany({
      where: { refereeLeadId: { in: leadIds } },
    });
    const delLeads = await prisma.contactLead.deleteMany({
      where: { id: { in: leadIds } },
    });
    console.log(`Deleted ${delLeads.count} dummy/test leads.`);
  }

  // 3. DELETE TEST COURSES & CLASSES
  console.log("\n--- 3. Cleaning up Test Courses & Classes ---");
  const testCourses = await prisma.course.findMany({
    where: {
      OR: [
        { title: { contains: "Test Course", mode: "insensitive" } },
        { title: { contains: "P1 IELTS Intensive", mode: "insensitive" } },
        { title: { contains: "E2E IELTS Gateway", mode: "insensitive" } },
        { title: { contains: "IELTS Intensive Master Course", mode: "insensitive" } },
      ],
    },
    select: { id: true, title: true },
  });
  console.log(`Found ${testCourses.length} test courses to remove:`);
  for (const course of testCourses) {
    console.log(`- Deleting test course [${course.id}] "${course.title}"...`);
    const exams = await prisma.exam.findMany({ where: { courseId: course.id }, select: { id: true } });
    const examIds = exams.map((e) => e.id);
    if (examIds.length > 0) {
      const subs = await prisma.examSubmission.findMany({ where: { examId: { in: examIds } }, select: { id: true } });
      const subIds = subs.map((s) => s.id);
      if (subIds.length > 0) {
        await prisma.speakingAssessmentEvidence.deleteMany({ where: { assessmentId: { in: subIds } } }).catch(() => {});
        await prisma.answer.deleteMany({ where: { submissionId: { in: subIds } } }).catch(() => {});
        await prisma.examSubmission.deleteMany({ where: { id: { in: subIds } } }).catch(() => {});
      }
      await prisma.examSection.deleteMany({ where: { examId: { in: examIds } } }).catch(() => {});
      await prisma.examPolicy.deleteMany({ where: { examId: { in: examIds } } }).catch(() => {});
      await prisma.examVersion.deleteMany({ where: { examId: { in: examIds } } }).catch(() => {});
      await prisma.exam.deleteMany({ where: { id: { in: examIds } } }).catch(() => {});
    }

    const classes = await prisma.class.findMany({ where: { courseId: course.id }, select: { id: true } });
    const classIds = classes.map((c) => c.id);
    if (classIds.length > 0) {
      await prisma.classStudent.deleteMany({ where: { classId: { in: classIds } } }).catch(() => {});
      await prisma.classSession.deleteMany({ where: { classId: { in: classIds } } }).catch(() => {});
      await prisma.classAttendance.deleteMany({ where: { classId: { in: classIds } } }).catch(() => {});
      await prisma.classSchedule.deleteMany({ where: { classId: { in: classIds } } }).catch(() => {});
      await prisma.classExamAssignment.deleteMany({ where: { classId: { in: classIds } } }).catch(() => {});
      await prisma.enrollmentAuditLog.deleteMany({ where: { classId: { in: classIds } } }).catch(() => {});
      await prisma.class.deleteMany({ where: { id: { in: classIds } } }).catch(() => {});
    }

    await prisma.enrollment.deleteMany({ where: { courseId: course.id } }).catch(() => {});
    await prisma.course.delete({ where: { id: course.id } }).catch(() => {});
  }

  // Also check standalone test classes
  const standaloneTestClasses = await prisma.class.findMany({
    where: {
      OR: [
        { name: { contains: "P1-Class-", mode: "insensitive" } },
        { name: { contains: "IELTS Intensive Class", mode: "insensitive" } },
        { name: { contains: "E2E Gateway Test Class", mode: "insensitive" } },
      ],
    },
    select: { id: true, name: true },
  });
  for (const cl of standaloneTestClasses) {
    console.log(`- Deleting standalone test class [${cl.id}] "${cl.name}"...`);
    await prisma.classStudent.deleteMany({ where: { classId: cl.id } }).catch(() => {});
    await prisma.classSession.deleteMany({ where: { classId: cl.id } }).catch(() => {});
    await prisma.classAttendance.deleteMany({ where: { classId: cl.id } }).catch(() => {});
    await prisma.classSchedule.deleteMany({ where: { classId: cl.id } }).catch(() => {});
    await prisma.classExamAssignment.deleteMany({ where: { classId: cl.id } }).catch(() => {});
    await prisma.enrollmentAuditLog.deleteMany({ where: { classId: cl.id } }).catch(() => {});
    await prisma.class.delete({ where: { id: cl.id } }).catch(() => {});
  }

  // 4. DELETE TEST USERS AND ALL ASSOCIATED RECORDS
  console.log("\n--- 4. Cleaning up Test Users ---");
  const testUsers = await prisma.user.findMany({
    where: {
      OR: [
        { email: { endsWith: "@example.com" } },
        { email: { endsWith: "@test.com" } },
        { email: { startsWith: "test-" } },
        { email: { startsWith: "test_" } },
        { email: { startsWith: "admin_p1_" } },
        { email: { startsWith: "student_p1_" } },
        { email: { startsWith: "inviter_" } },
        { email: { startsWith: "admin_" } },
        { email: { startsWith: "referee_convert_" } },
        { fullName: "Tran Van Referee" },
        { fullName: "Le Thi Friend" },
        { fullName: "Nguyen Van Inviter" },
        { fullName: "Phase 1 Admin" },
        { fullName: "Phase 1 Student" },
        { fullName: "System Admin", email: { contains: "example.com" } },
      ],
    },
    select: { id: true, userId: true, email: true, fullName: true },
  });
  console.log(`Found ${testUsers.length} test users to delete.`);

  if (testUsers.length > 0) {
    const userIds = testUsers.map((u) => u.userId);

    // Delete related records for test users
    console.log("Deleting associated records for test users...");
    await prisma.notification.deleteMany({ where: { userId: { in: userIds } } }).catch(() => {});
    await prisma.referralReward.deleteMany({ where: { inviterUserId: { in: userIds } } }).catch(() => {});
    await prisma.referralAttribution.deleteMany({
      where: { OR: [{ inviterUserId: { in: userIds } }, { refereeUserId: { in: userIds } }] },
    }).catch(() => {});
    await prisma.contactLead.deleteMany({
      where: {
        OR: [
          { inviterUserId: { in: userIds } },
          { convertedUserId: { in: userIds } },
          { createdByUserId: { in: userIds } },
          { assignedToUserId: { in: userIds } },
        ],
      },
    }).catch(() => {});
    await prisma.studentMilestoneClaim.deleteMany({ where: { studentId: { in: userIds } } }).catch(() => {});
    await prisma.classStudent.deleteMany({ where: { studentId: { in: userIds } } }).catch(() => {});
    await prisma.classAttendance.deleteMany({
      where: { OR: [{ studentId: { in: userIds } }, { teacherId: { in: userIds } }] },
    }).catch(() => {});
    await prisma.class.deleteMany({ where: { teacherId: { in: userIds } } }).catch(() => {});
    await prisma.enrollment.deleteMany({ where: { userId: { in: userIds } } }).catch(() => {});

    // Submissions
    const userSubs = await prisma.examSubmission.findMany({
      where: { OR: [{ studentId: { in: userIds } }, { gradedBy: { in: userIds } }] },
      select: { id: true },
    });
    const userSubIds = userSubs.map((s) => s.id);
    if (userSubIds.length > 0) {
      await prisma.speakingAssessmentEvidence.deleteMany({ where: { assessmentId: { in: userSubIds } } }).catch(() => {});
      await prisma.answer.deleteMany({ where: { submissionId: { in: userSubIds } } }).catch(() => {});
      await prisma.examSubmission.deleteMany({ where: { id: { in: userSubIds } } }).catch(() => {});
    }

    await prisma.userRole.deleteMany({ where: { userId: { in: userIds } } }).catch(() => {});
    await prisma.userBranch.deleteMany({ where: { userId: { in: userIds } } }).catch(() => {});
    await prisma.userVocabulary.deleteMany({ where: { userId: { in: userIds } } }).catch(() => {});
    await prisma.studentInterventionLog.deleteMany({
      where: { OR: [{ studentId: { in: userIds } }, { authorId: { in: userIds } }] },
    }).catch(() => {});
    await prisma.studentPeriodicReport.deleteMany({
      where: { OR: [{ studentId: { in: userIds } }, { teacherId: { in: userIds } }] },
    }).catch(() => {});
    await prisma.weeklySnapshot.deleteMany({ where: { studentId: { in: userIds } } }).catch(() => {});

    // Finally delete profiles/users
    const delUsers = await prisma.user.deleteMany({
      where: { userId: { in: userIds } },
    });
    console.log(`Deleted ${delUsers.count} test users.`);
  }

  console.log("\n=== CLEANUP COMPLETED SUCCESSFULLY ===");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
