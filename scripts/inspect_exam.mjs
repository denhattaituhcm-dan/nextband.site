import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
async function run() {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: '01d610ef-c45d-4ead-bc21-698f9c134103' },
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
    console.log('EXAM 01d610ef-c45d-4ead-bc21-698f9c134103:', JSON.stringify({
      id: exam?.id,
      title: exam?.title,
      allowGuestAssessment: exam?.allowGuestAssessment,
      sectionsCount: exam?.sections?.length,
      sections: exam?.sections?.map(s => ({
        id: s.id,
        title: s.title,
        sectionType: s.sectionType,
        audioUrl: s.audioUrl,
        groupsCount: s.questionGroups?.length,
        questionsCount: s.questionGroups?.reduce((acc, g) => acc + g.questions.length, 0),
        firstQuestion: s.questionGroups?.[0]?.questions?.[0],
      })),
    }, null, 2));

    // Also check all exams with "ENTRANCE" or "PLACEMENT" or "DIAGNOSTIC"
    const placementExams = await prisma.exam.findMany({
      where: {
        OR: [
          { title: { contains: 'ENTRANCE', mode: 'insensitive' } },
          { title: { contains: 'PLACEMENT', mode: 'insensitive' } },
          { title: { contains: 'DIAGNOSTIC', mode: 'insensitive' } },
          { title: { contains: 'TEST', mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        allowGuestAssessment: true,
        isActive: true,
        isPublished: true,
      },
    });
    console.log('PLACEMENT EXAMS:', JSON.stringify(placementExams, null, 2));

    // Also check the latest session: 9cceb3be-8aad-48af-8bd3-56520fec0842
    const session = await prisma.assessmentSession.findUnique({
      where: { id: '9cceb3be-8aad-48af-8bd3-56520fec0842' },
    });
    console.log('LATEST SESSION DETAIL:', JSON.stringify(session, null, 2));

  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
