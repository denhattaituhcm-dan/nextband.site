const https = require('https');
const fs = require('fs');
const path = require('path');

const URL = 'https://onthiielts.com.vn/bo-de-du-doan-ielts-speaking-forecast-2026/';
const OUTPUT_FILE = path.join(__dirname, 'forecast_2026_q2_full.json');

const seasonId = 'season-2026-q2';
const seasonName = 'Q2 / 2026';
const seasonYear = 2026;
const seasonQuarter = 2;

function cleanText(t) {
  if (!t) return '';
  return t
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseForecastHtml(html) {
  // 1. Separate Part 1 vs Part 2&3 sections
  const part1Start = html.indexOf('<h2 class="wp-block-heading"><span id="Forecast_IELTS_Speaking_Part_1_quy_2_2026">');
  const part2Start = html.indexOf('<h2 class="wp-block-heading"><span id="Forecast_Speaking_Part_2_3_quy_22026">');
  const contentEnd = html.indexOf('<h2 class="wp-block-heading"><span id="Bo_de_du_doan_IELTS_Speaking_quy_2_2026_day_du">');

  const part1Html = html.substring(part1Start, part2Start);
  const part23Html = html.substring(part2Start, contentEnd !== -1 ? contentEnd : html.length);

  const topics = [];
  let topicIndex = 1;

  // 2. PARSE PART 1 (41 topics)
  const part1H3Regex = /<h3 class="wp-block-heading"><span[^>]*>(.*?)<\/span><\/h3>(.*?)(?=(?:<h3 class="wp-block-heading">|$))/gis;
  let match;

  while ((match = part1H3Regex.exec(part1Html)) !== null) {
    const rawTitle = match[1];
    const topicName = cleanText(rawTitle);
    const blockHtml = match[2];

    const liMatches = [...blockHtml.matchAll(/<li[^>]*>(.*?)<\/li>/gis)];
    const questions = liMatches.map(m => cleanText(m[1])).filter(q => q.length > 0);

    if (topicName && questions.length > 0) {
      const id = `topic-${seasonYear}-q${seasonQuarter}-${String(topicIndex++).padStart(3, '0')}`;
      const slug = `q${seasonQuarter}-${seasonYear}-part1-${slugify(topicName)}`;

      topics.push({
        id,
        seasonId,
        topicName,
        category: 'General',
        part: 'Part 1',
        type: 'New',
        status: 'Published',
        updatedAt: '20 Aug 2026',
        questions,
        cueCardPrompt: '',
        cueCardBulletPoints: [],
        part3Questions: [],
        sampleAnswers: {
          band65: '',
          band75: '',
          band65Audio: null,
          band75Audio: null
        },
        keyVocabulary: [],
        ideas: '',
        seoTitle: `IELTS Speaking Forecast ${seasonName} - Topic: ${topicName} (Part 1)`,
        metaDescription: `Trọn bộ câu hỏi dự đoán IELTS Speaking Part 1 chủ đề ${topicName} Quý ${seasonQuarter}/${seasonYear}.`,
        slug
      });
    }
  }

  // 3. PARSE PART 2 & PART 3 BUNDLED (62 topics)
  const part2H3Regex = /<h3 class="wp-block-heading"><span[^>]*>(.*?)<\/span><\/h3>(.*?)(?=(?:<h3 class="wp-block-heading">|$))/gis;

  while ((match = part2H3Regex.exec(part23Html)) !== null) {
    const rawTitle = match[1];
    const cueCardPrompt = cleanText(rawTitle);
    const blockHtml = match[2];

    // Split Part 2 bullets and Part 3 questions
    const p3Index = blockHtml.search(/<strong>Part 3<\/strong>/i);
    let p2Block = blockHtml;
    let p3Block = '';
    if (p3Index !== -1) {
      p2Block = blockHtml.substring(0, p3Index);
      p3Block = blockHtml.substring(p3Index);
    }

    const p2Lis = [...p2Block.matchAll(/<li[^>]*>(.*?)<\/li>/gis)];
    const cueCardBulletPoints = p2Lis.map(m => cleanText(m[1])).filter(b => b.length > 0);

    const p3Lis = [...p3Block.matchAll(/<li[^>]*>(.*?)<\/li>/gis)];
    const part3Questions = p3Lis.map(m => cleanText(m[1])).filter(q => q.length > 0);

    if (cueCardPrompt) {
      const id = `topic-${seasonYear}-q${seasonQuarter}-${String(topicIndex++).padStart(3, '0')}`;
      const slug = `q${seasonQuarter}-${seasonYear}-part2-${slugify(cueCardPrompt).substring(0, 50)}`;

      topics.push({
        id,
        seasonId,
        topicName: cueCardPrompt,
        category: 'Events & Experiences',
        part: 'Part 2',
        type: 'New',
        status: 'Published',
        updatedAt: '20 Aug 2026',
        questions: [],
        cueCardPrompt,
        cueCardBulletPoints,
        part3Questions,
        sampleAnswers: {
          band65: '',
          band75: '',
          band65Audio: null,
          band75Audio: null
        },
        keyVocabulary: [],
        ideas: '',
        seoTitle: `IELTS Speaking Forecast ${seasonName} Part 2 & 3: ${cueCardPrompt}`,
        metaDescription: `Bộ đề dự đoán IELTS Speaking Part 2 & Part 3: ${cueCardPrompt} Quý ${seasonQuarter}/${seasonYear}.`,
        slug
      });
    }
  }

  return topics;
}

// Check local scratch cache first, or fetch live
const scratchPath = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\4fd4b464-5c22-4f39-bca8-90066c4f1f72\\scratch\\full_page.html';

function run() {
  if (fs.existsSync(scratchPath)) {
    console.log('Loading from cache:', scratchPath);
    const html = fs.readFileSync(scratchPath, 'utf8');
    const topics = parseForecastHtml(html);
    console.log(`Successfully parsed ${topics.length} topics!`);
    console.log(`- Part 1: ${topics.filter(t => t.part === 'Part 1').length}`);
    console.log(`- Part 2 (with Part 3): ${topics.filter(t => t.part === 'Part 2').length}`);
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(topics, null, 2), 'utf8');
    console.log('Saved result to:', OUTPUT_FILE);
  } else {
    console.log('Fetching live from:', URL);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(URL, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const topics = parseForecastHtml(data);
        console.log(`Successfully parsed ${topics.length} topics!`);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(topics, null, 2), 'utf8');
        console.log('Saved result to:', OUTPUT_FILE);
      });
    }).on('error', (e) => {
      console.error('Error fetching URL:', e);
    });
  }
}

run();
