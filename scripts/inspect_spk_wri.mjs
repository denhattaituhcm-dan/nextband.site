import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/dump_entrance_exam.json', 'utf8'));

const speaking = data.sections.find(s => s.sectionType === 'speaking');
console.log('SPEAKING GROUPS:');
for (const g of speaking?.questionGroups || []) {
  console.log(`- Group [${g.id}] "${g.title}": passage: "${g.passage}"`);
  for (const q of g.questions) {
    console.log(`    Q [${q.id}]: "${q.questionText}"`);
  }
}

const writing = data.sections.find(s => s.sectionType === 'writing');
console.log('\nWRITING:');
for (const g of writing?.questionGroups || []) {
  console.log(`- Group [${g.id}] "${g.title}": passage: "${g.passage}"`);
  for (const q of g.questions) {
    console.log(`    Q [${q.id}]: "${q.questionText}"`);
  }
}
