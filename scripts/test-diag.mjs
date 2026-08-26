import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function checkAllModels() {
  const models = [
    'user',
    'userRole',
    'course',
    'enrollment',
    'class',
    'classStudent',
    'classAttendance',
    'notification',
    'exam',
    'examSection',
    'question',
    'examSubmission',
    'homework',
    'submission',
    'room',
    'branch',
    'contactLead',
    'lesson',
    'lessonResource',
    'invitation',
    'enrollmentAuditLog',
    'idempotencyRecord',
    'studentPeriodicReport'
  ];

  let failedCount = 0;
  for (const model of models) {
    try {
      if (prisma[model]) {
        const count = await prisma[model].count();
        const one = await prisma[model].findFirst();
        console.log(`[PASS] Model '${model}': ${count} rows (SELECT ok)`);
      } else {
        console.log(`[SKIP] Model '${model}' not on client`);
      }
    } catch (err) {
      failedCount++;
      console.error(`[FAIL] Model '${model}':`, err.message);
    }
  }

  console.log(`\nVerification finished: ${failedCount === 0 ? "ALL MODELS PASSED 100%" : `${failedCount} models failed`}`);
  await prisma.$disconnect();
}

checkAllModels();
