import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
async function run() {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        course: true,
        sections: {
          include: {
            questionGroups: {
              include: {
                questions: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`Total exams in DB: ${exams.length}`);
    for (const e of exams) {
      const qCount = e.sections.reduce((sum, s) => sum + s.questionGroups.reduce((gsum, g) => gsum + g.questions.length, 0), 0);
      console.log(`- [${e.id}] "${e.title}" | course: "${e.course?.title}" (${e.course?.slug}) | guestAssessment: ${e.allowGuestAssessment} | isPublished: ${e.isPublished} | sections: ${e.sections.length} | questions: ${qCount}`);
    }
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
