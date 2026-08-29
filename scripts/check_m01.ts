import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const m01 = await prisma.class.findFirst({
    where: { name: { contains: "M01" } },
    include: {
      course: true,
      teacher: true,
      students: {
        include: {
          student: true,
        },
      },
      assignments: {
        include: {
          exam: true,
        },
      },
    },
  });

  if (!m01) {
    console.log("Class M01 not found!");
    return;
  }

  console.log("CLASS ID:", m01.id);
  console.log("CLASS NAME:", m01.name);
  console.log("COURSE ID:", m01.courseId, m01.course?.title);
  console.log("TEACHER:", m01.teacher?.fullName, m01.teacherId);
  console.log("STUDENTS IN CLASS:");
  for (const s of m01.students) {
    console.log(`  - Student: [${s.studentId}] ${s.student.fullName} (email: ${s.student.email}, userId: ${s.student.userId})`);
  }
  console.log("ASSIGNMENTS IN CLASS:");
  for (const a of m01.assignments) {
    console.log(`  - Assignment: [${a.id}] "${a.exam.title}" | examId: ${a.examId} | deadline: ${a.deadline}`);
  }

  // Check all submissions from students in this class
  const studentIds = m01.students.map((s) => s.studentId);
  console.log("\nEXAM SUBMISSIONS BY STUDENTS IN M01:");
  const examSubs = await prisma.examSubmission.findMany({
    where: {
      studentId: { in: studentIds },
    },
    include: {
      exam: {
        select: { id: true, title: true, courseId: true },
      },
      student: {
        select: { fullName: true, email: true, userId: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  console.log(`Total exam submissions by M01 students: ${examSubs.length}`);
  for (const es of examSubs) {
    console.log(`  - ExamSub: id=${es.id} | student=${es.student.fullName} (${es.student.email}) | exam="${es.exam.title}" (examId=${es.examId}, courseId=${es.exam.courseId}) | status=${es.status} | submittedAt=${es.submittedAt} | createdAt=${es.createdAt}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
