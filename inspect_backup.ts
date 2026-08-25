import fs from 'fs';

const sqlPath = 'd:\\handover\\ielts\\evidence\\database\\nextband_backup.sql';
const sqlContent = fs.readFileSync(sqlPath, 'utf8');

const regex = /INSERT INTO `exams` VALUES\s*(.*?);/gs;
let match;
const courseCounts: Record<string, number> = {};
let total = 0;
while ((match = regex.exec(sqlContent)) !== null) {
  const raw = match[1];
  // Parse rows
  const rows = raw.split(/\),\s*\(/);
  total += rows.length;
}
console.log(`Total exams in backup: ${total}`);

const regexCourses = /INSERT INTO `courses` VALUES\s*(.*?);/gs;
let matchCourses;
while ((matchCourses = regexCourses.exec(sqlContent)) !== null) {
  console.log("Found courses statement in backup");
}
