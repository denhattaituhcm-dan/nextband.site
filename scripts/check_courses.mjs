import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
async function run() {
  try {
    const exam01 = await prisma.exam.findUnique({
      where: { id: '01d610ef-c45d-4ead-bc21-698f9c134103' },
      include: { course: true },
    });
    console.log('Exam 01d610ef-c45d-4ead-bc21-698f9c134103 course:', exam01?.course);

    const entranceExam = await prisma.exam.findUnique({
      where: { id: 'cce291f7-d88b-4976-8ed3-cc21daca7023' },
      include: { course: true },
    });
    console.log('Entrance Exam cce291f7-d88b-4976-8ed3-cc21daca7023 course:', entranceExam?.course);
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
