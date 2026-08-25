import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const existingExamIds = new Set((await prisma.exam.findMany({ select: { id: true } })).map(e => e.id));
  console.log(`Existing exams in DB: ${existingExamIds.size}`);

  const existingSections = await prisma.examSection.count();
  console.log(`Existing exam sections in DB: ${existingSections}`);

  const existingQuestions = await prisma.question.count();
  console.log(`Existing questions in DB: ${existingQuestions}`);
}

check().finally(() => prisma.$disconnect());
