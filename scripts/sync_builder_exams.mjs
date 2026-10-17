import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const BUILDER_COURSE_ID = '575e9b58-f55a-4e9b-9416-88a5adbb535f';

const LESSON_DEFINITIONS = [
  // Week 1
  { week: 1, day: 1, skill: 'WRI', title: 'W1 - D1 - WRI: 01 câu có bao nhiêu mệnh đề?' },
  { week: 1, day: 2, skill: 'WRI', title: 'W1 - D2 - WRI: Modifiers & Prepositions' },
  { week: 1, day: 3, skill: 'SPK', title: 'W1 - D3 - SPK: Food & Drink' },
  // Week 2
  { week: 2, day: 1, skill: 'WRI', title: 'W2 - D1 - WRI: Mệnh đề quan hệ & Giản lược' },
  { week: 2, day: 2, skill: 'REA', title: 'W2 - D2 - REA: Monitoring Comprehension' },
  { week: 2, day: 3, skill: 'SPK', title: 'W2 - D3 - SPK: Healthy Lifestyle' },
  // Week 3
  { week: 3, day: 1, skill: 'WRI', title: 'W3 - D1 - WRI: Viết đoạn thân bài Body Paragraph' },
  { week: 3, day: 2, skill: 'REA', title: 'W3 - D2 - REA: Main Ideas & Details' },
  { week: 3, day: 3, skill: 'SPK', title: 'W3 - D3 - SPK: Movies' },
  // Week 4
  { week: 4, day: 1, skill: 'WRI', title: 'W4 - D1 - WRI: Linking Devices & Topic Sentences' },
  { week: 4, day: 2, skill: 'REA', title: 'W4 - D2 - REA: Geoglyphs & Uffington White Horse' },
  { week: 4, day: 3, skill: 'SPK', title: 'W4 - D3 - SPK: Celebrity & Hard Consonants' },
  // Week 5
  { week: 5, day: 1, skill: 'WRI', title: 'W5 - D1 - WRI: Supporting Ideas & Complex Sentences' },
  { week: 5, day: 2, skill: 'REA', title: 'W5 - D2 - REA: Babytalk & Critical Period' },
  { week: 5, day: 3, skill: 'SPK', title: 'W5 - D3 - SPK: Family, Syllables & Stress' },
  // Week 6
  { week: 6, day: 1, skill: 'WRI', title: 'W6 - D1 - WRI: Đa dạng cấu trúc câu' },
  { week: 6, day: 2, skill: 'REA', title: 'W6 - D2 - REA: Stonehenge' },
  { week: 6, day: 3, skill: 'SPK', title: 'W6 - D3 - SPK: Travel & Tourism' },
  // Week 7
  { week: 7, day: 1, skill: 'WRI', title: 'W7 - D1 - WRI: Hedging Skills & Conditionals' },
  { week: 7, day: 2, skill: 'REA', title: 'W7 - D2 - REA: The Thylacine & Henry Moore' },
  { week: 7, day: 3, skill: 'SPK', title: 'W7 - D3 - SPK: Celebrations and Festivals' },
  // Week 8
  { week: 8, day: 1, skill: 'WRI', title: 'W8 - D1 - WRI: Tổng quan Writing Task 1' },
  { week: 8, day: 2, skill: 'REA', title: 'W8 - D2 - REA: Phân biệt thông tin chính - phụ' },
  { week: 8, day: 3, skill: 'SPK', title: 'W8 - D3 - SPK: Environment & Connected Speech' },
  // Week 9
  { week: 9, day: 1, skill: 'WRI', title: 'W9 - D1 - WRI: Task 1 Introduction & Overview' },
  { week: 9, day: 2, skill: 'REA', title: 'W9 - D2 - REA: So sánh & Đối lập' },
  { week: 9, day: 3, skill: 'SPK', title: 'W9 - D3 - SPK: Personal Achievement' },
];

async function syncExams() {
  console.log('Synchronizing BUILDER exams in database...');
  
  // Find current exams for course BUILDER
  const existingExams = await prisma.exam.findMany({
    where: { courseId: BUILDER_COURSE_ID },
    include: { _count: { select: { submissions: true } } }
  });
  
  console.log(`Found ${existingExams.length} existing exams for BUILDER course.`);

  // Delete legacy unused exams with 0 submissions
  for (const ex of existingExams) {
    if (ex._count.submissions === 0) {
      await prisma.exam.delete({ where: { id: ex.id } });
      console.log(`Deleted legacy unused exam: ${ex.title} (${ex.id})`);
    }
  }

  // Create or ensure all 27 standard exams exist
  for (const def of LESSON_DEFINITIONS) {
    const created = await prisma.exam.create({
      data: {
        courseId: BUILDER_COURSE_ID,
        title: def.title,
        examType: 'ielts',
        week: def.week,
        durationMinutes: 15,
        isPublished: true,
        isActive: true,
        isOpen: true,
        isLocked: false,
      }
    });
    console.log(`Created exam: ${created.title} (Week ${def.week}) -> ID: ${created.id}`);
  }

  const finalExams = await prisma.exam.findMany({
    where: { courseId: BUILDER_COURSE_ID },
    select: { id: true, title: true, week: true },
    orderBy: [{ week: 'asc' }, { title: 'asc' }]
  });

  console.log(`\nSuccessfully synchronized! Total BUILDER exams in DB: ${finalExams.length}`);
}

syncExams()
  .catch(err => {
    console.error('Error syncing exams:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
