import fs from 'fs';

const sqlPath = 'd:\\handover\\ielts\\evidence\\database\\nextband_backup.sql';
const sqlContent = fs.readFileSync(sqlPath, 'utf8');

function parseTuples(rawString: string): any[][] {
  const results: any[][] = [];
  let currentTuple: any[] = [];
  let currentVal = "";
  let inQuotes = false;
  let quoteChar = "";
  let inTuple = false;
  let escaped = false;

  for (let i = 0; i < rawString.length; i++) {
    const char = rawString[i];
    if (escaped) {
      currentVal += char;
      escaped = false;
      continue;
    }
    if (char === "\\" && inQuotes) {
      escaped = true;
      continue;
    }
    if (!inTuple) {
      if (char === "(") {
        inTuple = true;
        currentTuple = [];
        currentVal = "";
      }
      continue;
    }
    if (inQuotes) {
      if (char === quoteChar) {
        inQuotes = false;
      } else {
        currentVal += char;
      }
      continue;
    }
    if (char === "'" || char === '"') {
      inQuotes = true;
      quoteChar = char;
      continue;
    }
    if (char === ",") {
      currentTuple.push(currentVal.trim());
      currentVal = "";
      continue;
    }
    if (char === ")") {
      currentTuple.push(currentVal.trim());
      results.push(currentTuple);
      inTuple = false;
      currentVal = "";
      continue;
    }
    currentVal += char;
  }
  return results;
}

const regex = /INSERT INTO `exams` VALUES\s*(.*?);/gs;
let match;
const courseIdToExams: Record<string, any[]> = {};

while ((match = regex.exec(sqlContent)) !== null) {
  const tuples = parseTuples(match[1]);
  for (const t of tuples) {
    const examId = t[0].replace(/^'|'$/g, '');
    const courseId = t[1].replace(/^'|'$/g, '');
    const title = t[2].replace(/^'|'$/g, '');
    const week = t[4];
    if (!courseIdToExams[courseId]) courseIdToExams[courseId] = [];
    courseIdToExams[courseId].push({ examId, title, week });
  }
}

for (const [cid, exams] of Object.entries(courseIdToExams)) {
  console.log(`Course ${cid}: ${exams.length} exams`);
}
