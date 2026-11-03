import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== CLEANING UP TEST EXAMS & DATA ===");
  
  // Find all test exams
  const testExams = await prisma.exam.findMany({
    where: {
      OR: [
        { title: "E2E IELTS Gateway Dedicated Test Exam" },
        { title: { contains: "Dedicated Test Exam" } },
      ],
    },
  });

  console.log(`Found ${testExams.length} test exams to delete.`);

  for (const exam of testExams) {
    console.log(`Deleting exam: ${exam.title} (${exam.id})`);
    
    // Delete exam submissions first (if needed, though cascade handles it)
    const deletedSubs = await prisma.examSubmission.deleteMany({
      where: { examId: exam.id },
    });
    console.log(`Deleted ${deletedSubs.count} submissions.`);

    // Delete the exam (cascades sections, question groups, questions)
    await prisma.exam.delete({
      where: { id: exam.id },
    });
    console.log(`Deleted exam ${exam.id} successfully.`);
  }

  // Delete test courses if any
  const testCourses = await prisma.course.findMany({
    where: {
      title: "E2E IELTS Gateway Test Course",
    },
  });

  for (const course of testCourses) {
    console.log(`Deleting test course: ${course.title} (${course.id})`);
    await prisma.course.delete({
      where: { id: course.id },
    });
  }

  console.log("Cleanup completed successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

