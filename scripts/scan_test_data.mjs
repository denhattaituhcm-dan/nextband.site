import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== SCANNING FOR ALL TEST LEFTOVERS ===");

  // 1. Exams
  const exams = await prisma.exam.findMany({
    where: {
      OR: [
        { title: { contains: "INTEGRITY", mode: "insensitive" } },
        { title: { contains: "Test Course", mode: "insensitive" } },
        { course: { title: { contains: "Test Course", mode: "insensitive" } } },
        { course: { title: { contains: "INTEGRITY", mode: "insensitive" } } },
      ],
    },
    include: {
      course: true,
      submissions: true,
      sections: true,
    },
  });
  console.log(`\n1. Leftover Exams found: ${exams.length}`);
  exams.forEach((e) => {
    console.log(`   - Exam ID: ${e.id}, Title: "${e.title}", Course: "${e.course?.title}", Submissions: ${e.submissions.length}`);
  });

  // 2. Courses
  const courses = await prisma.course.findMany({
    where: {
      OR: [
        { title: { contains: "Test Course", mode: "insensitive" } },
        { title: { contains: "INTEGRITY", mode: "insensitive" } },
        { title: { contains: "Shadow Course", mode: "insensitive" } },
        { title: { contains: "Gate1 Course", mode: "insensitive" } },
        { title: { contains: "Resilience Course", mode: "insensitive" } },
      ],
    },
    include: {
      exams: true,
      classes: true,
      enrollments: true,
    },
  });
  console.log(`\n2. Leftover Courses found: ${courses.length}`);
  courses.forEach((c) => {
    console.log(`   - Course ID: ${c.id}, Title: "${c.title}", Exams: ${c.exams.length}, Classes: ${c.classes.length}, Enrollments: ${c.enrollments.length}`);
  });

  // 3. Classes
  const classes = await prisma.class.findMany({
    where: {
      OR: [
        { name: { contains: "Test Class", mode: "insensitive" } },
        { name: { contains: "Shadow Class", mode: "insensitive" } },
        { name: { contains: "F1 Test", mode: "insensitive" } },
      ],
    },
  });
  console.log(`\n3. Leftover Classes found: ${classes.length}`);
  classes.forEach((cl) => {
    console.log(`   - Class ID: ${cl.id}, Name: "${cl.name}"`);
  });

  // 4. Users
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: "test-student-", mode: "insensitive" } },
        { email: { contains: "test-user-", mode: "insensitive" } },
        { email: { contains: "shadow-student-", mode: "insensitive" } },
        { email: { contains: "referee_lead_", mode: "insensitive" } },
      ],
    },
  });
  console.log(`\n4. Leftover Users found: ${users.length}`);
  users.forEach((u) => {
    console.log(`   - User ID: ${u.id} (${u.userId}), Email: "${u.email}", Name: "${u.fullName}"`);
  });

  // Print all courses to verify
  const allCourses = await prisma.course.findMany({
    select: { id: true, title: true, _count: { select: { exams: true, classes: true, enrollments: true } } },
  });
  console.log("\n=== ALL COURSES IN SYSTEM ===");
  allCourses.forEach(c => console.log(`[${c.id}] "${c.title}" -> exams: ${c._count.exams}, classes: ${c._count.classes}, enrollments: ${c._count.enrollments}`));

  // Print all classes
  const allClasses = await prisma.class.findMany({
    select: { id: true, name: true, course: { select: { title: true } }, _count: { select: { students: true, sessions: true } } },
  });
  console.log("\n=== ALL CLASSES IN SYSTEM ===");
  allClasses.forEach(cl => console.log(`[${cl.id}] "${cl.name}" (Course: ${cl.course?.title}) -> students: ${cl._count.students}, sessions: ${cl._count.sessions}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
