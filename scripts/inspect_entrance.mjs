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

    console.log('EXAM cce291f7-d88b-4976-8ed3-cc21daca7023 (ENTRANCE TEST):');
    console.log('Title:', exam?.title);
    console.log('Sections count:', exam?.sections.length);
    for (const s of exam?.sections || []) {
      console.log(`\nSection: ${s.title} (${s.sectionType}), Audio: ${s.audioUrl}`);
      for (const g of s.questionGroups) {
        console.log(`  Group: ${g.title}, Passage length: ${g.passage?.length || 0}`);
        for (const q of g.questions) {
          console.log(`    [${q.id}] (order: ${q.orderIndex}, type: ${q.questionType}) prompt: ${q.questionText?.slice(0, 60)} | correct: ${q.correctAnswer}`);
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
