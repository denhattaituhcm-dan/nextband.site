import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
async function run() {
  try {
    const exam = await prisma.exam.findUnique({
      where: { id: 'cce291f7-d88b-4976-8ed3-cc21daca7023' },
      include: {
        sections: {
          orderBy: { orderIndex: 'asc' },
          include: {
            questionGroups: {
              orderBy: { orderIndex: 'asc' },
              include: {
                questions: {
                  orderBy: { orderIndex: 'asc' },
                },
              },
            },
          },
        },
      },
    });

    console.log(`EXAM: ${exam?.title} (${exam?.id})`);
    for (const sec of exam.sections) {
      console.log(`\n=== SECTION: ${sec.title} (${sec.sectionType}) ===`);
      console.log(`Audio: ${sec.audioUrl}`);
      for (const grp of sec.questionGroups) {
        console.log(`  -- Group: ${grp.title} (Passage len: ${grp.passage?.length || 0})`);
        for (const q of grp.questions) {
          console.log(`     * Q [${q.id}] (${q.questionType}): ${q.questionText?.slice(0, 70)}`);
          console.log(`       Options:`, q.options);
          console.log(`       CorrectAnswer:`, q.correctAnswer);
        }
      }
    }
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
