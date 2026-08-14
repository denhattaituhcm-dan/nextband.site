import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrate() {
  console.log("=== EXECUTING SAFE DATABASE MIGRATION ===");
  try {
    // 1. Add course_id to classes if missing
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE classes ADD COLUMN course_id VARCHAR(191) NULL`);
      console.log("✅ Added course_id column to classes table.");
    } catch (e: any) {
      console.log("Column course_id note:", e.message);
    }

    // Link existing classes to matching courses
    await prisma.$executeRawUnsafe(`
      UPDATE classes c
      JOIN courses crs ON LOWER(c.name) LIKE CONCAT('%', LOWER(crs.title), '%')
      SET c.course_id = crs.id
      WHERE c.course_id IS NULL
    `);
    console.log("✅ Linked existing classes to corresponding courses.");

    // Fallback: If any class still has NULL course_id, assign first course
    const defaultCourse: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM courses LIMIT 1`);
    if (defaultCourse.length > 0) {
      await prisma.$executeRawUnsafe(`UPDATE classes SET course_id = '${defaultCourse[0].id}' WHERE course_id IS NULL`);
    }

    // Make course_id NOT NULL
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE classes MODIFY COLUMN course_id VARCHAR(191) NOT NULL`);
      console.log("✅ Set course_id column to NOT NULL.");
    } catch (e: any) {
      console.log("Modify course_id note:", e.message);
    }

    // 2. Create class_sessions table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS class_sessions (
        id VARCHAR(191) NOT NULL PRIMARY KEY,
        class_id VARCHAR(191) NOT NULL,
        lesson_id VARCHAR(191) NOT NULL,
        session_number INT NOT NULL DEFAULT 1,
        session_date DATE NOT NULL,
        status ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'SCHEDULED',
        title VARCHAR(255) NULL,
        notes TEXT NULL,
        completed_at DATETIME NULL,
        completed_by VARCHAR(191) NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX class_sessions_class_id_session_number_idx (class_id, session_number),
        INDEX class_sessions_class_id_session_date_idx (class_id, session_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✅ Created class_sessions table.");

    // 3. Update class_attendance table columns
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE class_attendance ADD COLUMN session_id VARCHAR(191) NULL`);
      console.log("✅ Added session_id to class_attendance.");
    } catch (e: any) {
      console.log("session_id column note:", e.message);
    }

    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE class_attendance ADD COLUMN teacher_id VARCHAR(191) NULL`);
      console.log("✅ Added teacher_id to class_attendance.");
    } catch (e: any) {
      console.log("teacher_id column note:", e.message);
    }

    // 4. Generate ClassSessions for all existing classes that have 0 sessions
    const classes: any[] = await prisma.$queryRawUnsafe(`SELECT id, name, course_id, start_date FROM classes`);
    for (const c of classes) {
      const existingSessions: any[] = await prisma.$queryRawUnsafe(`SELECT id FROM class_sessions WHERE class_id = '${c.id}'`);
      if (existingSessions.length === 0 && c.course_id) {
        console.log(`\nAuto-generating ClassSessions for class "${c.name}" (Course ID: ${c.course_id})...`);
        const lessons: any[] = await prisma.$queryRawUnsafe(`
          SELECT id, title, lesson_order FROM lessons WHERE course_id = '${c.course_id}' ORDER BY lesson_order ASC
        `);
        console.log(`Found ${lessons.length} lessons for course.`);
        
        let currentDate = c.start_date ? new Date(c.start_date) : new Date();
        for (let i = 0; i < lessons.length; i++) {
          const l = lessons[i];
          const uuid = crypto.randomUUID();
          const dateStr = currentDate.toISOString().slice(0, 10);
          
          await prisma.$executeRawUnsafe(`
            INSERT INTO class_sessions (id, class_id, lesson_id, session_number, session_date, status, title)
            VALUES ('${uuid}', '${c.id}', '${l.id}', ${i + 1}, '${dateStr}', 'SCHEDULED', '${l.title.replace(/'/g, "''")}')
          `);
          // Increment 2 days for next session
          currentDate.setDate(currentDate.getDate() + 2);
        }
        console.log(`✅ Generated ${lessons.length} sessions for class "${c.name}".`);
      }
    }

    console.log("\n=== MIGRATION COMPLETED SUCCESSFULLY ===");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();
