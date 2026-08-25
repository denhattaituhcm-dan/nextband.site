import fs from 'fs';
import path from 'path';

const sqlPath = 'd:\\handover\\ielts\\evidence\\database\\nextband_backup.sql';
const sqlContent = fs.readFileSync(sqlPath, 'utf8');

const regex = /INSERT INTO `courses` VALUES\s*(.*?);/gs;
let match;
while ((match = regex.exec(sqlContent)) !== null) {
  console.log("=== COURSES INSERT STATEMENT ===");
  console.log(match[1]);
}
