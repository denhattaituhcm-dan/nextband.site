import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { AssessmentService } from '../server/services/assessment.service.js';
dotenv.config();

const prisma = new PrismaClient();
const assessmentService = new AssessmentService(prisma);

async function run() {
  try {
    const sessionId = '9cceb3be-8aad-48af-8bd3-56520fec0842';
    const detail = await assessmentService.getAdminAssessmentSessionDetail(sessionId);

    console.log('SESSION DETAIL RESULT:');
    console.log('- Candidate:', detail?.session?.candidateName);
    console.log('- Phone:', detail?.session?.phone);
    console.log('- Exam ID:', detail?.session?.examId);
    console.log('- Test Payload Title:', detail?.testPayload?.title);
    console.log('- Total questions in breakdown:', detail?.questionBreakdown?.length);

    const listeningQs = detail?.questionBreakdown?.filter(q => q.skill === 'listening');
    console.log(`\nLISTENING QUESTION BREAKDOWN (${listeningQs?.length} items):`);
    for (const q of listeningQs || []) {
      console.log(`  [${q.id}] ${q.blankLabel || ''} | Student: "${q.studentAnswer}" | Correct: "${q.correctAnswer}" | isCorrect: ${q.isCorrect}`);
    }

    const readingQs = detail?.questionBreakdown?.filter(q => q.skill === 'reading');
    console.log(`\nREADING QUESTION BREAKDOWN (${readingQs?.length} items):`);
    for (const q of readingQs || []) {
      console.log(`  [${q.id}] ${q.blankLabel || q.prompt?.slice(0, 30)} | Student: "${q.studentAnswer}" | Correct: "${q.correctAnswer}" | isCorrect: ${q.isCorrect}`);
    }

    const grammarQs = detail?.questionBreakdown?.filter(q => q.skill === 'grammar');
    console.log(`\nGRAMMAR QUESTION BREAKDOWN (${grammarQs?.length} items):`);
    for (const q of grammarQs || []) {
      console.log(`  [${q.id}] Prompt: "${q.prompt?.slice(0, 35)}..." | Student: "${q.studentAnswer}" | Correct: "${q.correctAnswer}" | isCorrect: ${q.isCorrect}`);
    }

    console.log('\nWRITING PROMPT:', detail?.testPayload?.skills?.writing?.prompt?.slice(0, 100));
    console.log('SPEAKING TOPIC:', detail?.testPayload?.skills?.speaking?.part2Topic);
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
