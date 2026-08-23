import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
async function run() {
  try {
    const exams = await prisma.exam.findMany({
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
      select: {
        id: true,
        title: true,
        allowGuestAssessment: true,
        isActive: true,
        isPublished: true,
        updatedAt: true,
        createdAt: true,
        course: { select: { id: true, title: true, slug: true } },
        sections: {
          select: {
            id: true,
            title: true,
            sectionType: true,
            questionGroups: {
              select: {
                id: true,
                questions: { select: { id: true } },
              },
            },
          },
        },
      },
    });

    console.log('MATCHED EXAMS COUNT:', exams.length);
    for (const e of exams) {
      const qCount = e.sections.reduce((sum, s) => sum + s.questionGroups.reduce((gsum, g) => gsum + g.questions.length, 0), 0);
      console.log(`- ID: ${e.id} | Title: "${e.title}" | Guest: ${e.allowGuestAssessment} | Total Qs: ${qCount} | Updated: ${e.updatedAt.toISOString()} | Course: ${e.course?.title} (${e.course?.slug})`);
    }
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
