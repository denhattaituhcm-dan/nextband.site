import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const FORECAST_SETTINGS_KEY = 'speaking_forecast';

const seasons = [
  {
    id: 'season-2026-q3',
    name: 'Q3 / 2026',
    year: 2026,
    quarter: 3,
    isCurrent: true,
    isPublished: true,
  },
  {
    id: 'season-2026-q2',
    name: 'Q2 / 2026',
    year: 2026,
    quarter: 2,
    isCurrent: false,
    isPublished: true,
  },
  {
    id: 'season-2026-q1',
    name: 'Q1 / 2026',
    year: 2026,
    quarter: 1,
    isCurrent: false,
    isPublished: true,
  },
];

async function run() {
  console.log('🚀 Synchronizing all Speaking Forecast data to database...');

  // 1. Load Q2 topics from crawler JSON
  const q2JsonPath = path.join(__dirname, 'archive/speaking_forecast_crawler/forecast_2026_q2_full.json');
  let q2Topics = [];
  if (fs.existsSync(q2JsonPath)) {
    q2Topics = JSON.parse(fs.readFileSync(q2JsonPath, 'utf8'));
    console.log(`📦 Loaded ${q2Topics.length} Q2/2026 topics from JSON.`);
  } else {
    console.warn('⚠️ forecast_2026_q2_full.json not found!');
  }

  // 2. Load Q3 topics from update_speaking_forecast_q3_2026.mjs
  const q3ScriptPath = path.join(__dirname, 'update_speaking_forecast_q3_2026.mjs');
  let q3Topics = [];
  if (fs.existsSync(q3ScriptPath)) {
    const rawScript = fs.readFileSync(q3ScriptPath, 'utf8');
    const startMarker = 'const newQ3Topics = [';
    const endMarker = 'async function run() {';
    const startIdx = rawScript.indexOf(startMarker);
    const endIdx = rawScript.indexOf(endMarker);
    if (startIdx !== -1 && endIdx !== -1) {
      const arrayCode = rawScript.substring(startIdx + 'const newQ3Topics = '.length, endIdx).trim().replace(/;$/, '');
      try {
        q3Topics = eval(arrayCode);
        console.log(`📦 Loaded ${q3Topics.length} Q3/2026 topics from Q3 script.`);
      } catch (err) {
        console.error('Failed to parse Q3 topics via eval:', err);
      }
    }
  }

  // 3. Load existing topics in database to avoid losing any custom topics
  const existingRecord = await prisma.siteSettings.findFirst({
    where: { key: FORECAST_SETTINGS_KEY },
  });

  const existingTopics = (existingRecord?.value?.topics || []);
  const dummyIds = new Set(['topic-ai-technology', 'topic-draft-secret']);

  // Merge topics safely: Q3 topics take precedence, then Q2 topics, then custom preserved topics
  const finalTopics = [];
  const seenIds = new Set();
  const seenSlugs = new Set();

  for (const topic of [...q3Topics, ...q2Topics, ...existingTopics]) {
    if (!topic || !topic.id || dummyIds.has(topic.id)) continue;
    if (seenIds.has(topic.id)) continue;
    if (topic.slug && seenSlugs.has(topic.slug)) continue;

    seenIds.add(topic.id);
    if (topic.slug) seenSlugs.add(topic.slug);
    finalTopics.push(topic);
  }

  const payloadValue = {
    seasons,
    topics: finalTopics,
    selectedSeasonId: 'season-2026-q3',
    updatedAt: new Date().toISOString(),
    updatedBy: 'sync-all-speaking-forecast',
  };

  if (existingRecord) {
    await prisma.siteSettings.update({
      where: { id: existingRecord.id },
      data: { value: payloadValue },
    });
    console.log('✅ Updated existing speaking_forecast in database.');
  } else {
    await prisma.siteSettings.create({
      data: {
        key: FORECAST_SETTINGS_KEY,
        value: payloadValue,
      },
    });
    console.log('✅ Created new speaking_forecast record in database.');
  }

  console.log(`🎉 Total topics synced: ${finalTopics.length}`);
  const bySeason = {};
  for (const t of finalTopics) {
    bySeason[t.seasonId] = (bySeason[t.seasonId] || 0) + 1;
  }
  console.log('📊 Breakdown by season:', bySeason);
}

run()
  .catch((e) => {
    console.error('❌ Error syncing speaking forecast:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
