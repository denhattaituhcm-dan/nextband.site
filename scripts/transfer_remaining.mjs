import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = process.env.DIRECT_URL || process.env.DATABASE_URL || "";
const NEW_DIRECT = process.env.DIRECT_URL || process.env.DATABASE_URL || "";

async function transferRemaining() {
  const oldClient = new Client({ connectionString: OLD_DIRECT, ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });

  await oldClient.connect();
  await newClient.connect();

  console.log("Connected to transfer questions and cognitive_words...");
  await newClient.query("SET session_replication_role = 'replica';");

  // 1. Transfer cognitive_words
  const { rows: cogWords } = await oldClient.query("SELECT * FROM cognitive_words;");
  console.log(`Migrating ${cogWords.length} cognitive_words...`);
  for (const w of cogWords) {
    await newClient.query(`
      INSERT INTO cognitive_words (
        id, word, ipa, audio_url, core_idea, word_formation, collocations, cefr_level, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      ) ON CONFLICT (id) DO NOTHING;
    `, [
      w.id,
      w.headword || w.word || "",
      w.phonetic || w.ipa || null,
      w.audio_url || null,
      w.definition_en || w.core_idea || null,
      w.definition_vi || w.word_formation || null,
      w.collocations || [],
      w.cefr_level || null,
      w.created_at || new Date()
    ]);
  }
  console.log("✓ cognitive_words migrated.");

  // 2. Transfer questions
  const { rows: questions } = await oldClient.query(`
    SELECT id, group_id, question_type, question_text, options, correct_answer, points, order_index, created_at, audio_url 
    FROM questions;
  `);

  console.log(`Migrating ${questions.length} questions...`);

  const BATCH_SIZE = 50;
  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const chunk = questions.slice(i, i + BATCH_SIZE);
    for (const q of chunk) {
      await newClient.query(`
        INSERT INTO questions (
          id, group_id, question_type, question_text, options, correct_answer, points, order_index, created_at, audio_url
        ) VALUES (
          $1, $2, $3::"question_type", $4, $5::jsonb, $6, $7, $8, $9, $10
        ) ON CONFLICT (id) DO NOTHING;
      `, [
        q.id,
        q.group_id,
        q.question_type,
        q.question_text,
        q.options ? JSON.stringify(q.options) : null,
        q.correct_answer,
        q.points !== null ? Math.round(Number(q.points)) : 1,
        q.order_index !== null ? Math.round(Number(q.order_index)) : 0,
        q.created_at,
        q.audio_url
      ]);
    }
  }
  console.log("✓ questions migrated.");

  await newClient.query("SET session_replication_role = 'origin';");

  // Summary check
  const tables = [
    "profiles",
    "user_roles",
    "courses",
    "classes",
    "exams",
    "exam_sections",
    "question_groups",
    "questions",
    "exam_submissions",
    "answers",
    "enrollments",
    "cognitive_words",
    "class_students",
    "class_sessions",
    "class_attendance"
  ];
  console.log("\n=================== VERIFICATION IN NEW DB ===================");
  for (const t of tables) {
    const { rows } = await newClient.query(`SELECT count(*) FROM "${t}";`);
    console.log(`✓ Table "${t}": ${rows[0].count} rows`);
  }

  await oldClient.end();
  await newClient.end();
}

transferRemaining().catch(console.error);
