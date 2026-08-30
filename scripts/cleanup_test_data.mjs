import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== STARTING CLEANUP OF SYSTEM-GENERATED TEST DATA ===");

  // 1. Delete test courses (with cascade to their test exams, submissions, classes, assignments)
  const testCourses = await prisma.course.findMany({
    where: {
      OR: [
        { title: { contains: "Test Course Integrity", mode: "insensitive" } },
        { title: { contains: "P1 IELTS Intensive", mode: "insensitive" } },
        { title: { contains: "E2E IELTS Gateway Test Course", mode: "insensitive" } },
      ],
    },
    select: { id: true, title: true },
  });

  console.log(`Found ${testCourses.length} test courses to remove:`);
  for (const course of testCourses) {
    console.log(`- Deleting test course [${course.id}] "${course.title}"...`);
    // Delete any submissions for exams in this course
    const exams = await prisma.exam.findMany({ where: { courseId: course.id }, select: { id: true } });
    const examIds = exams.map(e => e.id);
    if (examIds.length > 0) {
      const subs = await prisma.examSubmission.findMany({ where: { examId: { in: examIds } }, select: { id: true } });
      const subIds = subs.map(s => s.id);
      if (subIds.length > 0) {
        await prisma.answer.deleteMany({ where: { submissionId: { in: subIds } } });
        await prisma.examSubmission.deleteMany({ where: { id: { in: subIds } } });
      }
      await prisma.examSection.deleteMany({ where: { examId: { in: examIds } } });
      await prisma.exam.deleteMany({ where: { id: { in: examIds } } });
    }

    // Delete classes in this course
    const classes = await prisma.class.findMany({ where: { courseId: course.id }, select: { id: true } });
    const classIds = classes.map(c => c.id);
    if (classIds.length > 0) {
      await prisma.classStudent.deleteMany({ where: { classId: { in: classIds } } });
      await prisma.classSession.deleteMany({ where: { classId: { in: classIds } } });
      await prisma.classAttendance.deleteMany({ where: { classId: { in: classIds } } });
      await prisma.classSchedule.deleteMany({ where: { classId: { in: classIds } } });
      await prisma.classExamAssignment.deleteMany({ where: { classId: { in: classIds } } });
      await prisma.class.deleteMany({ where: { id: { in: classIds } } });
    }

    await prisma.enrollment.deleteMany({ where: { courseId: course.id } });
    await prisma.course.delete({ where: { id: course.id } });
  }

  // 2. Delete test classes (e.g. E2E Gateway Test Class)
  const testClasses = await prisma.class.findMany({
    where: {
      OR: [
        { name: { contains: "E2E Gateway Test Class", mode: "insensitive" } },
        { name: { contains: "P1-Class-", mode: "insensitive" } },
      ],
    },
    select: { id: true, name: true },
  });

  console.log(`\nFound ${testClasses.length} test classes to remove:`);
  for (const cl of testClasses) {
    console.log(`- Deleting test class [${cl.id}] "${cl.name}"...`);
    await prisma.classStudent.deleteMany({ where: { classId: cl.id } });
    await prisma.classSession.deleteMany({ where: { classId: cl.id } });
    await prisma.classAttendance.deleteMany({ where: { classId: cl.id } });
    await prisma.classSchedule.deleteMany({ where: { classId: cl.id } });
    await prisma.classExamAssignment.deleteMany({ where: { classId: cl.id } });
    await prisma.enrollmentAuditLog.deleteMany({ where: { classId: cl.id } });
    await prisma.class.delete({ where: { id: cl.id } });
  }

  // 3. Delete any standalone test exams
  const testExams = await prisma.exam.findMany({
    where: {
      OR: [
        { title: { contains: "WRITING TEST INTEGRITY", mode: "insensitive" } },
        { title: { contains: "Dedicated Test Exam", mode: "insensitive" } },
      ],
    },
    select: { id: true, title: true },
  });

  console.log(`\nFound ${testExams.length} test exams to remove:`);
  for (const exam of testExams) {
    console.log(`- Deleting test exam [${exam.id}] "${exam.title}"...`);
    const subs = await prisma.examSubmission.findMany({ where: { examId: exam.id }, select: { id: true } });
    const subIds = subs.map(s => s.id);
    if (subIds.length > 0) {
      await prisma.answer.deleteMany({ where: { submissionId: { in: subIds } } });
      await prisma.examSubmission.deleteMany({ where: { id: { in: subIds } } });
    }
    await prisma.examSection.deleteMany({ where: { examId: exam.id } });
    await prisma.exam.delete({ where: { id: exam.id } });
  }

  console.log("\n=== CLEANUP COMPLETED SUCCESSFULLY ===");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
