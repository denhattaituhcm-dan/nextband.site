import { PrismaClient } from "@prisma/client";

const oldDirectUrl = "postgresql://postgres.gzpdlqxjggyxlkeatvvf:anhxtanhmat1@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres";
const newDirectUrl = "postgresql://postgres:anhxtanhmat1@db.dmamqxiukfiyhfbbcqsq.supabase.co:5432/postgres";

const prismaOld = new PrismaClient({ datasources: { db: { url: oldDirectUrl } } });
const prismaNew = new PrismaClient({ datasources: { db: { url: newDirectUrl } } });

// List of models in order respecting foreign key constraints
const MODEL_NAMES = [
  "branch",
  "user",
  "userRole",
  "teacherProfile",
  "userBranch",
  "course",
  "courseEnrollment",
  "lesson",
  "lessonResource",
  "lessonProgress",
  "exam",
  "examSection",
  "questionGroup",
  "question",
  "examSubmission",
  "questionAnswer",
  "enrollment",
  "enrollmentAuditLog",
  "class",
  "classStudent",
  "classAttendance",
  "classExamAssignment",
  "highlight",
  "contactLead",
  "assessmentSession",
  "speakingRecordingAsset",
  "studentPeriodicReport",
  "studentInterventionLog",
  "weeklySnapshot",
  "studentMilestoneClaim",
  "referralAttribution",
  "referralReward",
  "userVocabulary",
  "cognitiveWord",
  "arenaRoom",
  "arenaParticipant",
  "notification",
  "invitation",
  "systemSetting"
];

async function migrateData() {
  console.log("Starting full database data migration...");

  // We can query prismaOld dynamic models or raw sql if needed
  // Using prisma raw query to disable foreign keys during insert or insert in dependency order
  // Even safer: SET session_replication_role = 'replica'; in PostgreSQL bypasses foreign key checks during import!
  await prismaNew.$executeRawUnsafe("SET session_replication_role = 'replica';");
  console.log("✓ Disabled foreign key checks on new DB (session_replication_role = replica)");

  // Get all table names in public schema
  const tables = await prismaOld.$queryRaw`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      AND table_name != '_prisma_migrations';
  `;

  console.log(`Found ${tables.length} tables to transfer:`);

  for (const t of tables) {
    const tableName = t.table_name;
    try {
      const rows = await prismaOld.$queryRawUnsafe(`SELECT * FROM "${tableName}";`);
      if (rows.length === 0) {
        console.log(`- ${tableName}: 0 rows (skipped)`);
        continue;
      }

      console.log(`- ${tableName}: migrating ${rows.length} rows...`);

      // Clear new table first just in case
      await prismaNew.$executeRawUnsafe(`TRUNCATE TABLE "${tableName}" CASCADE;`);

      // Insert in chunks of 50
      const chunkSize = 50;
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        
        for (const row of chunk) {
          const keys = Object.keys(row);
          const cols = keys.map(k => `"${k}"`).join(", ");
          const vals = keys.map((_, idx) => `$${idx + 1}`).join(", ");
          const values = keys.map(k => {
            const v = row[k];
            // Format dates or json if needed
            return v;
          });

          const sql = `INSERT INTO "${tableName}" (${cols}) VALUES (${vals}) ON CONFLICT DO NOTHING;`;
          await prismaNew.$queryRawUnsafe(sql, ...values);
        }
      }
      console.log(`  ✓ Successfully migrated ${rows.length} rows into "${tableName}"`);
    } catch (err) {
      console.error(`  ❌ Error migrating table "${tableName}":`, err.message);
    }
  }

  // Restore foreign keys
  await prismaNew.$executeRawUnsafe("SET session_replication_role = 'origin';");
  console.log("✓ Re-enabled foreign key checks (session_replication_role = origin)");

  console.log("\nVerifying migrated data in new DB...");
  const newUsers = await prismaNew.user.count();
  const newExams = await prismaNew.exam.count();
  const newQuestions = await prismaNew.question.count();
  const newSubmissions = await prismaNew.examSubmission.count();

  console.log(`NEW DB Verification:
  - Users: ${newUsers}
  - Exams: ${newExams}
  - Questions: ${newQuestions}
  - ExamSubmissions: ${newSubmissions}
  `);

  await prismaOld.$disconnect();
  await prismaNew.$disconnect();
}

migrateData().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
