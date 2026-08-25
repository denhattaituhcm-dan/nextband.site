import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allDbExams = await prisma.exam.findMany();
  console.log(`Current DB Exams count: ${allDbExams.length}`);
  console.log("Current DB Exams:", allDbExams.map(e => ({ id: e.id, title: e.title, courseId: e.courseId, week: e.week })));

  const allDbCourses = await prisma.course.findMany();
  console.log("Current DB Courses:", allDbCourses.map(c => ({ id: c.id, title: c.title })));
}

main().finally(() => prisma.$disconnect());
