import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
async function run() {
  try {
    const sessions = await prisma.assessmentSession.findMany({
      orderBy: { createdAt: 'desc' },
    });
    console.log(`Total sessions: ${sessions.length}`);
    for (const s of sessions) {
      console.log(`Session: ${s.id} | Name: ${s.fullName} | Phone: ${s.phone} | examId: ${s.examId} | answersKeys: ${Object.keys(s.answers || {}).length} | status: ${s.status} | createdAt: ${s.createdAt.toISOString()}`);
    }
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
