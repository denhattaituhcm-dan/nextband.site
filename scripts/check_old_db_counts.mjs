import { PrismaClient } from "@prisma/client";

const oldDirectUrl = "postgresql://postgres.gzpdlqxjggyxlkeatvvf:anhxtanhmat1@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres";
const newDirectUrl = "postgresql://postgres:anhxtanhmat1@db.dmamqxiukfiyhfbbcqsq.supabase.co:5432/postgres";

const prismaOld = new PrismaClient({
  datasources: { db: { url: oldDirectUrl } }
});

const prismaNew = new PrismaClient({
  datasources: { db: { url: newDirectUrl } }
});

async function main() {
  console.log("Checking table record counts in OLD database...");
  const oldUsers = await prismaOld.user.count();
  const oldExams = await prismaOld.exam.count();
  const oldQuestions = await prismaOld.question.count();
  const oldSubmissions = await prismaOld.examSubmission.count();
  const oldClasses = await prismaOld.class.count();
  const oldCourses = await prismaOld.course.count();

  console.log(`OLD DB stats:
  - Users: ${oldUsers}
  - Exams: ${oldExams}
  - Questions: ${oldQuestions}
  - ExamSubmissions: ${oldSubmissions}
  - Classes: ${oldClasses}
  - Courses: ${oldCourses}
  `);

  await prismaOld.$disconnect();
  await prismaNew.$disconnect();
}

main().catch(err => {
  console.error("Error checking old DB:", err);
  process.exit(1);
});
