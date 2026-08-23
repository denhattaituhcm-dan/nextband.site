import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
async function run() {
  try {
    const examSubmissions = await prisma.examSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        answers: true,
        student: true,
      },
    });

    console.log(`ExamSubmissions count: ${examSubmissions.length}`);
    for (const sub of examSubmissions) {
      console.log(`- [${sub.id}] Exam: ${sub.examId} | Student: ${sub.student?.fullName} (${sub.student?.email}) | Answers: ${sub.answers.length} | Score: ${sub.totalScore} | Created: ${sub.createdAt.toISOString()}`);
    }

    const homeworkSubmissions = await prisma.submission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    console.log(`Homework Submissions count: ${homeworkSubmissions.length}`);
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
