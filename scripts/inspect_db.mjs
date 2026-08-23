import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
async function run() {
  try {
    const exams = await prisma.exam.findMany({
      select: { id: true, title: true, allowGuestAssessment: true, isActive: true, isPublished: true, durationMinutes: true },
    });
    console.log('EXAMS (' + exams.length + '):', JSON.stringify(exams, null, 2));

    const sessions = await prisma.assessmentSession.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
    console.log('SESSIONS (' + sessions.length + '):', JSON.stringify(sessions, null, 2));
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
