const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'forecast_2026_q2_full.json');
const targetFile = path.join(__dirname, '../nextband/src/components/admin/speaking-forecast/mockData.ts');

const topics = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const tsContent = `import { Season, ForecastTopic } from './types';

export const initialSeasons: Season[] = [
  {
    id: 'season-2026-q2',
    name: 'Q2 / 2026',
    year: 2026,
    quarter: 2,
    isCurrent: true,
  },
  {
    id: 'season-2026-q1',
    name: 'Q1 / 2026',
    year: 2026,
    quarter: 1,
    isCurrent: false,
  },
  {
    id: 'season-2026-q3',
    name: 'Q3 / 2026',
    year: 2026,
    quarter: 3,
    isCurrent: false,
  },
];

export const initialTopics: ForecastTopic[] = ${JSON.stringify(topics, null, 2)};
`;

fs.writeFileSync(targetFile, tsContent, 'utf8');
console.log('Successfully updated mockData.ts with', topics.length, 'topics!');
