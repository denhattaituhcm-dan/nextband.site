import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
async function run() {
  try {
    const exam = await prisma.exam.findFirst({
      where: {
        OR: [
          { allowGuestAssessment: true, isActive: true, isPublished: true },
          { title: { contains: "ENTRANCE TEST", mode: "insensitive" }, isActive: true, isPublished: true },
          { course: { slug: { contains: "placement", mode: "insensitive" } }, isActive: true, isPublished: true },
        ],
      },
      orderBy: [
        { allowGuestAssessment: "desc" },
        { updatedAt: "desc" },
      ],
      include: {
        sections: {
          orderBy: { orderIndex: "asc" },
          include: {
            questionGroups: {
              orderBy: { orderIndex: "asc" },
              include: {
                questions: {
                  orderBy: { orderIndex: "asc" },
                },
              },
            },
          },
        },
      },
    });

    console.log('findDesignatedEntranceExam RESULT:');
    console.log('ID:', exam?.id);
    console.log('Title:', exam?.title);
    console.log('allowGuestAssessment:', exam?.allowGuestAssessment);
  } catch (err) {
    console.error('ERROR in findDesignatedEntranceExam:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
