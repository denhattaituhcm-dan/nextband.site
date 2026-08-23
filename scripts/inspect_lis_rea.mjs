import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/dump_entrance_exam.json', 'utf8'));

const listening = data.sections.find(s => s.sectionType === 'listening');
console.log('LISTENING QUESTION TEXT:');
console.log(listening?.questionGroups?.[0]?.questions?.[0]?.questionText);

const reading = data.sections.find(s => s.sectionType === 'reading');
console.log('\nREADING PASSAGE (first 300 chars):');
console.log(reading?.questionGroups?.[0]?.passage?.slice(0, 300));
console.log('\nREADING Q1 TEXT:');
console.log(reading?.questionGroups?.[0]?.questions?.[0]?.questionText);
