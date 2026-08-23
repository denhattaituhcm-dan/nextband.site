import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function run() {
  try {
    const entranceExamId = 'cce291f7-d88b-4976-8ed3-cc21daca7023';
    
    // 1. Verify that the entrance exam exists and has questions
    const exam = await prisma.exam.findUnique({
      where: { id: entranceExamId },
      include: {
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
    });

    if (!exam) {
      throw new Error(`Entrance exam ${entranceExamId} not found!`);
    }

    const qCount = exam.sections.reduce(
      (sum, s) => sum + s.questionGroups.reduce((gsum, g) => gsum + g.questions.length, 0),
      0
    );
    console.log(`Verified Entrance Exam: "${exam.title}" (${exam.id}) with ${qCount} questions in ${exam.sections.length} sections.`);

    // 2. Update allowGuestAssessment = true, isActive = true, isPublished = true
    await prisma.exam.update({
      where: { id: entranceExamId },
      data: {
        allowGuestAssessment: true,
        isActive: true,
        isPublished: true,
      },
    });
    console.log('Ensured Entrance Exam allowGuestAssessment = true, isActive = true, isPublished = true.');

    // 3. Update all assessment sessions to point to this exam
    const updated = await prisma.assessmentSession.updateMany({
      where: {
        OR: [
          { examId: { not: entranceExamId } },
          { examId: '01d610ef-c45d-4ead-bc21-698f9c134103' },
        ],
      },
      data: {
        examId: entranceExamId,
      },
    });

    console.log(`Updated ${updated.count} assessment_sessions to examId: ${entranceExamId}`);

    // 4. Verify all assessment sessions
    const sessions = await prisma.assessmentSession.findMany({
      select: {
        id: true,
        fullName: true,
        phone: true,
        examId: true,
        status: true,
      },
    });
    console.log(`Total assessment sessions in DB: ${sessions.length}`);
    for (const s of sessions) {
      console.log(`- Session [${s.id}] | "${s.fullName}" (${s.phone}) | examId: ${s.examId} | status: ${s.status}`);
    }
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
