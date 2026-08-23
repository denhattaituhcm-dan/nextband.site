import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import fs from 'fs';
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

    fs.writeFileSync('scripts/dump_entrance_exam.json', JSON.stringify(exam, null, 2));
    console.log('Dumped entrance exam to scripts/dump_entrance_exam.json');
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
