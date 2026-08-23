import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { AssessmentService } from '../server/services/assessment.service.js';
dotenv.config();

const prisma = new PrismaClient();
const assessmentService = new AssessmentService(prisma);

async function run() {
  try {
    const dbExam = await prisma.exam.findUnique({
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

    const payload = assessmentService.transformDbExamToPayload(dbExam);
    console.log('LISTENING QUESTIONS:');
    for (const q of payload.skills.listening.questions) {
      console.log(`- ID: ${q.id} | type: ${q.questionType} | blanks: ${q.blankCount} | prompt: ${q.prompt.slice(0, 100)}`);
    }

    console.log('\nREADING QUESTIONS:');
    for (const q of payload.skills.reading.questions) {
      console.log(`- ID: ${q.id} | type: ${q.questionType} | blanks: ${q.blankCount} | prompt: ${q.prompt.slice(0, 100)}`);
    }

    console.log('\nGRAMMAR QUESTIONS:');
    for (const q of payload.skills.grammar.questions) {
      console.log(`- ID: ${q.id} | type: ${q.questionType} | prompt: ${q.prompt.slice(0, 100)} | options:`, q.options);
    }
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
