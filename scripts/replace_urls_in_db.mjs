import pg from "pg";
const { Client } = pg;

const NEW_DIRECT = process.env.DIRECT_URL || process.env.DATABASE_URL || "";

async function updateUrls() {
  const client = new Client({ connectionString: NEW_DIRECT, ssl: { rejectUnauthorized: false } });
  await client.connect();

  console.log("Replacing old Supabase domain in database tables...");
  const oldDomain = "gzpdlqxjggyxlkeatvvf.supabase.co";
  const newDomain = "dmamqxiukfiyhfbbcqsq.supabase.co";

  const r1 = await client.query(`
    UPDATE question_groups 
    SET audio_url = REPLACE(audio_url, $1, $2)
    WHERE audio_url LIKE '%' || $1 || '%';
  `, [oldDomain, newDomain]);
  console.log(`✓ Updated question_groups audio_url: ${r1.rowCount} rows`);

  const r2 = await client.query(`
    UPDATE questions 
    SET audio_url = REPLACE(audio_url, $1, $2)
    WHERE audio_url LIKE '%' || $1 || '%';
  `, [oldDomain, newDomain]);
  console.log(`✓ Updated questions audio_url: ${r2.rowCount} rows`);

  const r3 = await client.query(`
    UPDATE questions 
    SET question_text = REPLACE(question_text, $1, $2)
    WHERE question_text LIKE '%' || $1 || '%';
  `, [oldDomain, newDomain]);
  console.log(`✓ Updated questions question_text: ${r3.rowCount} rows`);

  const r4 = await client.query(`
    UPDATE question_groups 
    SET passage = REPLACE(passage, $1, $2)
    WHERE passage LIKE '%' || $1 || '%';
  `, [oldDomain, newDomain]);
  console.log(`✓ Updated question_groups passage: ${r4.rowCount} rows`);

  const r5 = await client.query(`
    UPDATE answers 
    SET audio_url = REPLACE(audio_url, $1, $2)
    WHERE audio_url LIKE '%' || $1 || '%';
  `, [oldDomain, newDomain]);
  console.log(`✓ Updated answers audio_url: ${r5.rowCount} rows`);

  const r6 = await client.query(`
    UPDATE speaking_recording_assets 
    SET storage_path = REPLACE(storage_path, $1, $2)
    WHERE storage_path LIKE '%' || $1 || '%';
  `, [oldDomain, newDomain]);
  console.log(`✓ Updated speaking_recording_assets: ${r6.rowCount} rows`);

  await client.end();
  console.log("🎉 URL updates in Database finished!");
}

updateUrls().catch(console.error);
