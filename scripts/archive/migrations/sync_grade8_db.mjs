import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const GRADE8_EXAMS = [
  {
    unit: 1,
    title: 'Unit 1: Leisure Time',
    description: 'Đề kiểm tra trắc nghiệm Tiếng Anh 8 Unit 1: Leisure Time - Ngữ âm, từ vựng và cấu trúc diễn đạt sở thích.',
    week: 1,
  },
  {
    unit: 2,
    title: 'Unit 2: Life in the Countryside',
    description: 'Đề kiểm tra trắc nghiệm Tiếng Anh 8 Unit 2: Life in the Countryside - Ngữ âm /ə/ & /ɪ/, từ vựng nông thôn và so sánh hơn của trạng từ.',
    week: 2,
  },
];

async function syncGrade8Db() {
  console.log('Connecting to database to check/sync "Trắc nghiệm Lớp 8"...');

  // 1. Check or create Course "Trắc nghiệm Lớp 8"
  let course = await prisma.course.findFirst({
    where: {
      OR: [
        { title: { contains: 'Lớp 8', mode: 'insensitive' } },
        { title: { contains: 'Grade 8', mode: 'insensitive' } },
        { slug: 'trac-nghiem-lop-8' }
      ]
    }
  });

  if (!course) {
    console.log('Course "Trắc nghiệm Lớp 8" not found. Creating new course...');
    course = await prisma.course.create({
      data: {
        title: 'Trắc nghiệm Lớp 8',
        slug: 'trac-nghiem-lop-8',
        level: 'beginner',
        description: 'Bộ câu hỏi trắc nghiệm tiếng Anh Lớp 8 bám sát chương trình Global Success và các đề kiểm tra định kỳ.',
        isPublished: true,
        isActive: true,
        isLocked: false,
      }
    });
    console.log(`Successfully created course: ${course.title} (ID: ${course.id})`);
  } else {
    console.log(`Found existing course: "${course.title}" (ID: ${course.id})`);
    if (!course.isActive || !course.isPublished) {
      course = await prisma.course.update({
        where: { id: course.id },
        data: { isActive: true, isPublished: true }
      });
      console.log('Updated course status to active and published.');
    }
  }

  // 2. Ensure each exam exists
  for (const exDef of GRADE8_EXAMS) {
    let exam = await prisma.exam.findFirst({
      where: {
        courseId: course.id,
        title: { contains: `Unit ${exDef.unit}`, mode: 'insensitive' }
      }
    });

    if (!exam) {
      console.log(`Creating exam "${exDef.title}"...`);
      exam = await prisma.exam.create({
        data: {
          courseId: course.id,
          title: exDef.title,
          description: exDef.description,
          examType: 'ielts',
          week: exDef.week,
          durationMinutes: 15,
          isPublished: true,
          isActive: true,
          isOpen: true,
          isLocked: false,
        }
      });
      console.log(`Successfully created exam: "${exam.title}" (ID: ${exam.id})`);
    } else {
      console.log(`Found existing exam: "${exam.title}" (ID: ${exam.id})`);
      if (!exam.isActive || !exam.isPublished || !exam.isOpen) {
        exam = await prisma.exam.update({
          where: { id: exam.id },
          data: { isActive: true, isPublished: true, isOpen: true }
        });
        console.log(`Updated exam "${exam.title}" status to active, published, and open.`);
      }
    }
  }

  const finalExams = await prisma.exam.findMany({
    where: { courseId: course.id },
    select: { id: true, title: true, week: true },
    orderBy: { week: 'asc' }
  });

  console.log('\n--- SUMMARY ---');
  console.log(`Course: ${course.title} [${course.id}]`);
  console.log(`Total Exams in DB: ${finalExams.length}`);
  finalExams.forEach(e => console.log(` - [Week ${e.week}] ${e.title} (${e.id})`));
}

syncGrade8Db()
  .catch(err => {
    console.error('Error during Grade 8 DB sync:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
