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
    console.log('TRANSFORMED PAYLOAD:');
    console.log('Title:', payload.title);
    console.log('Total Questions:', payload.totalQuestions);
    console.log('Listening Questions count:', payload.skills.listening.questions.length);
    console.log('Listening Audio:', payload.skills.listening.audioUrl);
    console.log('Listening Q1:', JSON.stringify(payload.skills.listening.questions[0], null, 2));

    console.log('\nReading Questions count:', payload.skills.reading.questions.length);
    console.log('Reading Passage length:', payload.skills.reading.passage.length);
    console.log('Reading Q1:', JSON.stringify(payload.skills.reading.questions[0], null, 2));

    console.log('\nGrammar Questions count:', payload.skills.grammar.questions.length);
    console.log('Grammar Q1:', JSON.stringify(payload.skills.grammar.questions[0], null, 2));

    console.log('\nWriting prompt:', payload.skills.writing.prompt);
    console.log('\nSpeaking part1:', payload.skills.speaking.part1Questions);
    console.log('Speaking part2 topic:', payload.skills.speaking.part2Topic);
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
