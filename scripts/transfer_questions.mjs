import pg from "pg";
const { Client } = pg;

const OLD_DIRECT = process.env.DIRECT_URL || process.env.DATABASE_URL || "";
const NEW_DIRECT = process.env.DIRECT_URL || process.env.DATABASE_URL || "";

async function transferQuestions() {
  const oldClient = new Client({ connectionString: OLD_DIRECT, ssl: { rejectUnauthorized: false } });
  const newClient = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });

  await oldClient.connect();
  await newClient.connect();

  console.log("Connected to transfer questions...");
  await newClient.query("SET session_replication_role = 'replica';");

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
          $1, $2, $3::"QuestionType", $4, $5::jsonb, $6, $7, $8, $9, $10
        ) ON CONFLICT (id) DO UPDATE SET
          question_text = EXCLUDED.question_text,
          options = EXCLUDED.options;
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
    console.log(`✓ Processed ${Math.min(i + BATCH_SIZE, questions.length)} / ${questions.length} questions`);
  }

  await newClient.query("SET session_replication_role = 'origin';");

  const { rows: count } = await newClient.query("SELECT count(*) FROM questions;");
  console.log(`\n🎉 Total questions in new DB: ${count[0].count}`);

  await oldClient.end();
  await newClient.end();
}

transferQuestions().catch(console.error);
