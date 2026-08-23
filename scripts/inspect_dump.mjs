import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/dump_entrance_exam.json', 'utf8'));

console.log('Title:', data.title);
for (const s of data.sections) {
  console.log(`\n=== Section: ${s.title} (${s.sectionType}) ===`);
  console.log('Audio:', s.audioUrl);
  for (const g of s.questionGroups) {
    console.log(`  Group: ${g.title} | Passage len: ${g.passage?.length || 0}`);
    for (const q of g.questions) {
      console.log(`    Q [${q.id}] (${q.questionType}): ${q.questionText?.slice(0, 80)}`);
      console.log(`      Correct:`, q.correctAnswer);
      console.log(`      Options:`, q.options);
    }
  }
}
