import fs from 'fs';

const sqlPath = 'd:\\handover\\ielts\\evidence\\database\\nextband_backup.sql';
const sqlContent = fs.readFileSync(sqlPath, 'utf8');

const tableMatches = [...sqlContent.matchAll(/CREATE TABLE `([^`]+)`/g)];
console.log("Tables in backup:", tableMatches.map(m => m[1]));

const insertMatches = [...sqlContent.matchAll(/INSERT INTO `([^`]+)`/g)];
const insertCounts: Record<string, number> = {};
insertMatches.forEach(m => {
  insertCounts[m[1]] = (insertCounts[m[1]] || 0) + 1;
});
console.log("Insert statements per table:", insertCounts);
