import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function inspectAndCleanup() {
  console.log("=== INSPECTING CANDIDATE TEST ITEMS ===");

  // Find test courses
  const testCourses = await prisma.course.findMany({
    where: {
      OR: [
        { title: { contains: "Test Course Integrity", mode: "insensitive" } },
        { title: { contains: "P1 IELTS Intensive", mode: "insensitive" } },
      ],
    },
    include: {
      exams: {
        include: {
          submissions: {
            include: { answers: true },
          },
          sections: {
            include: {
              questionGroups: {
                include: { questions: true },
              },
            },
          },
        },
      },
      classes: {
        include: {
          students: true,
          sessions: true,
          assignments: true,
        },
      },
    },
  });

  console.log("Found test courses:", testCourses.length);
  testCourses.forEach((c) => {
    console.log(`Course: [${c.id}] "${c.title}"`);
    c.exams.forEach((e) => {
      console.log(`  Exam: [${e.id}] "${e.title}" (Submissions: ${e.submissions.length})`);
    });
    c.classes.forEach((cl) => {
      console.log(`  Class: [${cl.id}] "${cl.name}" (Students: ${cl.students.length})`);
    });
  });

  // Find test classes
  const testClasses = await prisma.class.findMany({
    where: {
      OR: [
        { name: { contains: "E2E Gateway Test Class", mode: "insensitive" } },
        { name: { contains: "P1-Class-", mode: "insensitive" } },
      ],
    },
    include: {
      students: true,
      sessions: true,
      assignments: true,
    },
  });

  console.log("\nFound test classes:", testClasses.length);
  testClasses.forEach((cl) => {
    console.log(`Class: [${cl.id}] "${cl.name}" (CourseId: ${cl.courseId}, Students: ${cl.students.length})`);
  });

  // Find test exams
  const testExams = await prisma.exam.findMany({
    where: {
      OR: [
        { title: { contains: "WRITING TEST INTEGRITY", mode: "insensitive" } },
      ],
    },
    include: {
      submissions: {
        include: { answers: true },
      },
    },
  });

  console.log("\nFound test exams:", testExams.length);
  testExams.forEach((e) => {
    console.log(`Exam: [${e.id}] "${e.title}" (Submissions: ${e.submissions.length})`);
  });
}

inspectAndCleanup()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
