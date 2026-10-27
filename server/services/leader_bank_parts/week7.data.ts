export interface LeaderQuestionPart {
  id: string;
  prompt: string;
  lesson: string;
  part: string;
  difficulty: string;
  timeLimitSeconds: number;
  points: number;
  options: { id: string; text: string; label?: string }[];
  correctOptionId: string;
  correctAnswerText: string;
  correctExplanation: string;
  misconception?: {
    baitOptionId: string;
    baitOptionText: string;
    diagnosticTitle: string;
    explanation: string;
  };
}

export const LEADER_WEEK_7_QUESTIONS: LeaderQuestionPart[] = [
  // ==========================================
  // WEEK 7 – DAY 1: GROUPING & SIGNPOSTING: NAME FIRST VS FEATURE FIRST & 5-MIN TASK 2 FLASH-DRILL
  // ==========================================
  {
    id: 'L70-W07-D1-Q01',
    prompt: 'In IELTS Writing Task 1, what is the core architectural difference between the "Name-First" (Category-Based) and "Feature-First" (Trend-Based) grouping strategies?',
    lesson: 'WEEK 7 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Name-First allocates body paragraphs by specific entities or countries, whereas Feature-First clusters categories sharing similar trajectories such as upward surges versus downward declines' },
      { id: 'B', text: 'Name-First is used only for maps, while Feature-First is used exclusively for pie charts' },
      { id: 'C', text: 'Name-First requires alphabetical sorting of words, whereas Feature-First requires reverse alphabetical sorting' },
      { id: 'D', text: 'Name-First is penalized by examiners, whereas Feature-First guarantees a score of 9.0' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Name-First allocates body paragraphs by specific entities or countries, whereas Feature-First clusters categories sharing similar trajectories such as upward surges versus downward declines',
    correctExplanation: 'Name-First organizes by entity (e.g. Body 1: UK and France; Body 2: Germany and Italy), while Feature-First organizes by behavior (e.g. Body 1: Entities showing upward trajectories; Body 2: Entities showing downward or static trends).',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Name-First is used only for maps, while Feature-First is used exclusively for pie charts',
      diagnosticTitle: 'Visual Typology Restriction',
      explanation: 'Both grouping models apply universally across dynamic line graphs, bar charts, and data tables.'
    }
  },
  {
    id: 'L70-W07-D1-Q02',
    prompt: 'Why is "Fragmented Item-by-Item Reporting" (describing Category A in 2000, Category B in 2000, then Category A in 2005, etc.) heavily penalized under Coherence and Cohesion?',
    lesson: 'WEEK 7 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'It presents disjointed mechanical data points without synthesis, failing to illuminate comparative relationships or overarching patterns' },
      { id: 'B', text: 'It requires too many commas, which examiners count as grammatical errors' },
      { id: 'C', text: 'It automatically makes the report exceed 500 words in length' },
      { id: 'D', text: 'It violates the chronological progression requirement of the Gregorian calendar' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'It presents disjointed mechanical data points without synthesis, failing to illuminate comparative relationships or overarching patterns',
    correctExplanation: 'Listing figures point-by-point without grouping creates a mechanical catalog rather than an analytical summary, capping Coherence & Cohesion and Task Achievement at Band 5.5.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. It requires too many commas, which examiners count as grammatical errors',
      diagnosticTitle: 'Punctuation Counting Myth',
      explanation: 'The issue is lack of macro-logical synthesis and thematic grouping, not the mechanical frequency of punctuation marks.'
    }
  },
  {
    id: 'L70-W07-D1-Q03',
    prompt: 'Which signposting topic sentence effectively launches a "Feature-First" body paragraph clustering upward trending categories?',
    lesson: 'WEEK 7 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Turning to the categories that exhibited an upward trajectory, both solar and wind power witnessed substantial expansion over the period' },
      { id: 'B', text: 'Now I want to talk about solar energy because it is green and nice' },
      { id: 'C', text: 'Solar was 10 in 1990 and wind was 15 in 1990 and both went up' },
      { id: 'D', text: 'Look at the chart and you will see higher lines for these two things' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Turning to the categories that exhibited an upward trajectory, both solar and wind power witnessed substantial expansion over the period',
    correctExplanation: '"Turning to the categories that exhibited an upward trajectory..." immediately signposts the thematic grouping criterion before synthesizing specific figures.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Solar was 10 in 1990 and wind was 15 in 1990 and both went up',
      diagnosticTitle: 'Data-First Abruptness',
      explanation: 'Starting directly with raw numbers without an organizing signpost leaves the paragraph without a clear topic sentence.'
    }
  },
  {
    id: 'L70-W07-D1-Q04',
    prompt: 'In a 6-line graph with 3 rising lines and 3 falling lines, which grouping strategy produces the cleanest logical structure?',
    lesson: 'WEEK 7 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Feature-First: Body Paragraph 1 synthesizes the 3 rising lines; Body Paragraph 2 synthesizes the 3 declining lines' },
      { id: 'B', text: 'Writing six separate one-sentence paragraphs for each individual line' },
      { id: 'C', text: 'Describing all six lines at the starting year, then all six at the ending year' },
      { id: 'D', text: 'Selecting only one line to describe and discarding the other five lines entirely' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Feature-First: Body Paragraph 1 synthesizes the 3 rising lines; Body Paragraph 2 synthesizes the 3 declining lines',
    correctExplanation: 'Clustering by directional feature (rising vs falling) creates two balanced, logically coherent paragraphs that facilitate natural comparative sentence structures.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Describing all six lines at the starting year, then all six at the ending year',
      diagnosticTitle: 'Chronological Slice Confusion',
      explanation: 'Slicing by time creates two static snapshots rather than tracing the dynamic trajectory of each line, making trend tracking chaotic.'
    }
  },
  {
    id: 'L70-W07-D1-Q05',
    prompt: 'Which cohesive device creates an organic transition when moving from Body Paragraph 1 (growth trends) to Body Paragraph 2 (decline trends)?',
    lesson: 'WEEK 7 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'In sharp contrast to the aforementioned growth, fossil fuel consumption underwent a consistent contraction' },
      { id: 'B', text: 'On the other side of things, oil was going down terribly' },
      { id: 'C', text: 'Secondly, let me mention coal because coal is also in the chart' },
      { id: 'D', text: 'However, moreover, furthermore, petrol decreased' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'In sharp contrast to the aforementioned growth, fossil fuel consumption underwent a consistent contraction',
    correctExplanation: '"In sharp contrast to the aforementioned growth..." links back anaphorically to Body 1 while introducing the contrasting dynamic of Body 2 with academic poise.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. On the other side of things, oil was going down terribly',
      diagnosticTitle: 'Colloquial Transition Slip',
      explanation: '"On the other side of things" is casual spoken English unsuitable for academic Task 1 reporting.'
    }
  },
  {
    id: 'L70-W07-D1-Q06',
    prompt: 'What is the role of the 5-Minute Flash-Slip executed at the start of Day 1 in Week 7?',
    lesson: 'WEEK 7 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'To spend five minutes formulating a Task 2 thesis statement and two main supporting pillars for a fresh essay topic' },
      { id: 'B', text: 'To draw a bar chart from memory using colored pencils' },
      { id: 'C', text: 'To read the coursebook syllabus backwards' },
      { id: 'D', text: 'To practice cursive handwriting speed on blank sheets' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'To spend five minutes formulating a Task 2 thesis statement and two main supporting pillars for a fresh essay topic',
    correctExplanation: 'The 5-min Flash-Slip maintains Task 2 cognitive reflexes during Task 1 units, ensuring candidates never lose thesis-building speed.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. To practice cursive handwriting speed on blank sheets',
      diagnosticTitle: 'Handwriting Mechanics Distraction',
      explanation: 'The Flash-Slip is an intellectual brainstorming and argument-structuring exercise, not a penmanship test.'
    }
  },
  {
    id: 'L70-W07-D1-Q07',
    prompt: 'In Name-First grouping for a comparative chart of 4 countries across 3 categories, how are the body paragraphs organized?',
    lesson: 'WEEK 7 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Body 1 examines the primary pair of countries across all 3 categories; Body 2 examines the remaining pair across the same metrics' },
      { id: 'B', text: 'Body 1 lists all data for Country 1; Body 2 lists Country 2; Body 3 lists Country 3; Body 4 lists Country 4' },
      { id: 'C', text: 'Body 1 discusses the year 2000; Body 2 discusses the year 2010; Body 3 discusses the year 2020' },
      { id: 'D', text: 'All four countries are combined into one massive sentence with forty numbers' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Body 1 examines the primary pair of countries across all 3 categories; Body 2 examines the remaining pair across the same metrics',
    correctExplanation: 'Grouping by paired entities (e.g. developed economies vs emerging economies) allows direct side-by-side comparison across all metrics within each paragraph.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Body 1 lists all data for Country 1; Body 2 lists Country 2; Body 3 lists Country 3; Body 4 lists Country 4',
      diagnosticTitle: 'Over-Segmentation Pitfall',
      explanation: 'Creating four single-country body paragraphs fragments the essay and prevents comparative cross-analysis.'
    }
  },
  {
    id: 'L70-W07-D1-Q08',
    prompt: 'Which sentence integrates three data points into a single cohesive C1 comparative structure?',
    lesson: 'WEEK 7 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Commencing at 25 percent in 2010, renewable energy adoption surged to 42 percent by 2015, before stabilizing at 45 percent at the end of the period' },
      { id: 'B', text: 'In 2010 it was 25 percent. Then in 2015 it was 42 percent. And then in the end it was 45 percent' },
      { id: 'C', text: 'Renewable energy was 25 percent, 42 percent, and 45 percent across those three separate dates' },
      { id: 'D', text: 'The number jumped up and up from 25 to 42 and then stopped at 45' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Commencing at 25 percent in 2010, renewable energy adoption surged to 42 percent by 2015, before stabilizing at 45 percent at the end of the period',
    correctExplanation: 'This structure uses a participial opener ("Commencing at..."), a dynamic action verb ("surged to..."), and a subordinate temporal clause ("before stabilizing at..."), compressing three data points seamlessly.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. In 2010 it was 25 percent. Then in 2015 it was 42 percent. And then in the end it was 45 percent',
      diagnosticTitle: 'Kindergarten Repetitive Syntax',
      explanation: 'Three repetitive simple sentences linked by "then" display Band 4.5 grammatical range.'
    }
  },
  {
    id: 'L70-W07-D1-Q09',
    prompt: 'What signpost signals that a writer is turning to examine the secondary or outlier category in a chart?',
    lesson: 'WEEK 7 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'With regards to the remaining outlier, nuclear power maintained a negligible share of under 3 percent throughout' },
      { id: 'B', text: 'Another thing we must see is nuclear because it is small' },
      { id: 'C', text: 'And nuclear power was also there at the bottom of the picture' },
      { id: 'D', text: 'Lastly, let me tell you about nuclear power' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'With regards to the remaining outlier, nuclear power maintained a negligible share of under 3 percent throughout',
    correctExplanation: '"With regards to the remaining outlier..." and "maintained a negligible share of under 3 percent throughout" establish academic signposting and precise reporting.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Lastly, let me tell you about nuclear power',
      diagnosticTitle: 'Conversational First-Person Intrusion',
      explanation: 'Using first-person conversational phrases ("let me tell you") breaches the objective third-person register mandatory in Task 1.'
    }
  },
  {
    id: 'L70-W07-D1-Q10',
    prompt: 'When deciding between Name-First and Feature-First grouping, what is the best decision rule?',
    lesson: 'WEEK 7 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'If lines exhibit sharply divergent trajectories with clear rises versus drops, choose Feature-First; if categories share identical trajectories and natural geographical or sectoral pairings, choose Name-First' },
      { id: 'B', text: 'Always choose Feature-First because examiners penalize Name-First automatically' },
      { id: 'C', text: 'Flip a coin during the first minute of the test' },
      { id: 'D', text: 'Use Name-First for even-numbered years and Feature-First for odd-numbered years' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'If lines exhibit sharply divergent trajectories with clear rises versus drops, choose Feature-First; if categories share identical trajectories and natural geographical or sectoral pairings, choose Name-First',
    correctExplanation: 'Data geometry dictates structure: divergent trends naturally group into Feature-First (growth vs decline), while clustered trends across distinct entities group cleanly into Name-First.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Always choose Feature-First because examiners penalize Name-First automatically',
      diagnosticTitle: 'Dogmatic Method Bias',
      explanation: 'Both methods are fully endorsed by Cambridge examiners; the choice depends purely on the cleanest logical grouping for that specific dataset.'
    }
  },

  // ==========================================
  // WEEK 7 – DAY 2: BODY CONSTRUCTION FOR DYNAMIC VS STATIC CHARTS & 5-MIN TASK 2 FLASH-DRILL
  // ==========================================
  {
    id: 'L70-W07-D2-Q01',
    prompt: 'What constitutes the critical fatal error in writing a report for a "Static Chart" depicting data for a single year (e.g., 2022)?',
    lesson: 'WEEK 7 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Using time-based dynamic verbs such as "increased", "decreased", "soared", or "plummeted" when no chronological movement has occurred' },
      { id: 'B', text: 'Using comparative structures like "higher than" or "twice as much as"' },
      { id: 'C', text: 'Stating the exact year 2022 in the introduction' },
      { id: 'D', text: 'Writing body paragraphs organized by ranking' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Using time-based dynamic verbs such as "increased", "decreased", "soared", or "plummeted" when no chronological movement has occurred',
    correctExplanation: 'A static chart records a single snapshot in time. There is no passage of time, so claiming that figures "increased" or "plummeted" is factually false and severely penalizes Task Achievement and Lexical Resource.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Using comparative structures like "higher than" or "twice as much as"',
      diagnosticTitle: 'Static Language Inversion',
      explanation: 'Comparative structures ("higher than", "twice as much as") are the EXACT appropriate linguistic tools for static charts.'
    }
  },
  {
    id: 'L70-W07-D2-Q02',
    prompt: 'Which linguistic toolbox is strictly required when describing a Static Chart?',
    lesson: 'WEEK 7 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The Language of Comparison and Proportion: superlatives, multipliers, ranking phrases, and percentage shares' },
      { id: 'B', text: 'The Language of Change: fluctuated wildly, dipped sharply, leveled off, surged' },
      { id: 'C', text: 'Future continuous conditional verb forms' },
      { id: 'D', text: 'First-person personal reflections on consumer lifestyle choices' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The Language of Comparison and Proportion: superlatives, multipliers, ranking phrases, and percentage shares',
    correctExplanation: 'Static charts demand comparative grammar: "accounted for the largest share", "threefold greater than", "in descending order", and "closely trailed by".',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. The Language of Change: fluctuated wildly, dipped sharply, leveled off, surged',
      diagnosticTitle: 'Dynamic vs Static Confusion',
      explanation: 'Trend verbs describe change over time (dynamic); using them in static data demonstrates a failure to understand data representation.'
    }
  },
  {
    id: 'L70-W07-D2-Q03',
    prompt: 'Examine this static data point: "In 2022, Country A consumed 60 liters of water per capita, while Country B consumed 20 liters." Which sentence frames this comparison with Band 7.5+ precision?',
    lesson: 'WEEK 7 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Per capita water consumption in Country A stood at 60 liters, precisely three times the volume recorded for Country B' },
      { id: 'B', text: 'Country A increased by 40 liters more than Country B in the year 2022' },
      { id: 'C', text: 'Water consumption soared up to 60 liters in Country A, but Country B plummeted to 20' },
      { id: 'D', text: 'Country A had 60 liters, which was bigger than Country B which had 20 liters' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Per capita water consumption in Country A stood at 60 liters, precisely three times the volume recorded for Country B',
    correctExplanation: '"Precisely three times the volume recorded for Country B" demonstrates sophisticated proportional comparison without any inappropriate dynamic change verbs.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Water consumption soared up to 60 liters in Country A, but Country B plummeted to 20',
      diagnosticTitle: 'False Dynamic Projection',
      explanation: 'Using "soared" and "plummeted" invents chronological movement where only a static cross-sectional difference exists.'
    }
  },
  {
    id: 'L70-W07-D2-Q04',
    prompt: 'Which ranking structure correctly reports the top three categories in a static table for 2023?',
    lesson: 'WEEK 7 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Engineering constituted the predominant major, accounting for 38 percent of enrollments, closely trailed by Business at 32 percent and Humanities at 18 percent' },
      { id: 'B', text: 'Engineering was first. Then Business went down to second. And then Humanities was third' },
      { id: 'C', text: 'Engineering won the golden medal with 38 percent, defeating Business and Humanities' },
      { id: 'D', text: 'Engineering increased to 38 percent, followed by Business which dropped to 32 percent' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Engineering constituted the predominant major, accounting for 38 percent of enrollments, closely trailed by Business at 32 percent and Humanities at 18 percent',
    correctExplanation: '"Constituted the predominant major", "accounting for 38 percent", and "closely trailed by..." illustrate advanced static ranking without dynamic misnomers.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Engineering won the golden medal with 38 percent, defeating Business and Humanities',
      diagnosticTitle: 'Sporting Cliché Inappropriateness',
      explanation: 'Metaphors like "won the golden medal" and "defeating" belong to sports journalism, not academic statistical reporting.'
    }
  },
  {
    id: 'L70-W07-D2-Q05',
    prompt: 'In a dynamic line graph from 2000 to 2020, what is the correct usage of the verb "fluctuate"?',
    lesson: 'WEEK 7 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Oil prices fluctuated erratically between 40 dollars and 75 dollars per barrel throughout the first decade' },
      { id: 'B', text: 'Oil prices fluctuated from 40 dollars in 2000 down to 20 dollars in 2020 in a straight line' },
      { id: 'C', text: 'Oil prices fluctuated upward continuously without ever going down' },
      { id: 'D', text: 'Oil prices were fluctuated by the OPEC ministers in 2005' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Oil prices fluctuated erratically between 40 dollars and 75 dollars per barrel throughout the first decade',
    correctExplanation: '"Fluctuate" denotes continuous irregular movement up and down within a bounded range; stating that it "fluctuated between X and Y" captures this perfectly.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Oil prices fluctuated from 40 dollars in 2000 down to 20 dollars in 2020 in a straight line',
      diagnosticTitle: 'Linear Movement Contradiction',
      explanation: 'A straight steady decline is a drop or contraction, not a fluctuation. Using "fluctuate" for a monotonic trend reveals vocabulary misunderstanding.'
    }
  },
  {
    id: 'L70-W07-D2-Q06',
    prompt: 'Which prepositional phrase accurately describes reaching an all-time maximum in a dynamic chart?',
    lesson: 'WEEK 7 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'reaching a peak of 85 percent in 2018' },
      { id: 'B', text: 'reaching at a peak of 85 percent in 2018' },
      { id: 'C', text: 'peaking on 85 percent in 2018' },
      { id: 'D', text: 'getting a peak to 85 percent in 2018' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'reaching a peak of 85 percent in 2018',
    correctExplanation: 'The standard collocations are "reach a peak OF [figure]" or "peak AT [figure]". "Reach at a peak" is an erroneous double-preposition construction.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. reaching at a peak of 85 percent in 2018',
      diagnosticTitle: 'Preposition Redundancy',
      explanation: '"Reach" is a transitive verb taking an immediate noun phrase ("reach a peak"); inserting "at" is ungrammatical.'
    }
  },
  {
    id: 'L70-W07-D2-Q07',
    prompt: 'How should a candidate handle a static chart with 12 distinct categories?',
    lesson: 'WEEK 7 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Synthesize by clustering into top performers, intermediate cluster, and negligible minority, reporting key numerical anchors selectively' },
      { id: 'B', text: 'Devote twelve separate sentences to listing every single number sequentially' },
      { id: 'C', text: 'Refuse to write the essay because twelve categories is too many' },
      { id: 'D', text: 'Invent random percentages for the missing numbers' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Synthesize by clustering into top performers, intermediate cluster, and negligible minority, reporting key numerical anchors selectively',
    correctExplanation: 'Official descriptors reward selecting significant features and grouping data logically. Listing 12 data points mechanically is penalized under Task Achievement.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Devote twelve separate sentences to listing every single number sequentially',
      diagnosticTitle: 'Exhaustive Cataloging Trap',
      explanation: 'Task 1 explicitly instructs candidates to "summarize by selecting and reporting the main features, and make comparisons where relevant", not transcribe all raw data.'
    }
  },
  {
    id: 'L70-W07-D2-Q08',
    prompt: 'Which sentence correctly expresses a static difference using the noun "margin"?',
    lesson: 'WEEK 7 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Expenditure on food exceeded that on clothing by a substantial margin of 25 percentage points' },
      { id: 'B', text: 'Expenditure on food exceeded clothing with a margin of 25 percentage points' },
      { id: 'C', text: 'Expenditure on food increased a margin of 25 percentage points than clothing' },
      { id: 'D', text: 'Food expenditure had a margin gap growing bigger over clothing' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Expenditure on food exceeded that on clothing by a substantial margin of 25 percentage points',
    correctExplanation: '"Exceeded that on clothing BY a substantial margin of..." demonstrates flawless academic comparison and accurate pronoun substitution ("that on clothing").',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Expenditure on food exceeded clothing with a margin of 25 percentage points',
      diagnosticTitle: 'Illogical Comparison (Faulty Parallelism)',
      explanation: 'Saying "expenditure exceeded clothing" compares money with physical garments; formal English requires comparing "expenditure on food with that on clothing".'
    }
  },
  {
    id: 'L70-W07-D2-Q09',
    prompt: 'What is the distinction between "percent" and "percentage points"?',
    lesson: 'WEEK 7 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Percentage points measure the absolute arithmetic difference between two percentages, whereas percent measures the relative proportional change' },
      { id: 'B', text: 'Percent is American English and percentage points is British English' },
      { id: 'C', text: 'They are identical and can be swapped freely in any sentence' },
      { id: 'D', text: 'Percentage points is used only when numbers are smaller than five' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Percentage points measure the absolute arithmetic difference between two percentages, whereas percent measures the relative proportional change',
    correctExplanation: 'If a rate moves from 10% to 15%, it has increased by 5 percentage points, but by 50 percent. Confusing these terms indicates statistical innumeracy.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. They are identical and can be swapped freely in any sentence',
      diagnosticTitle: 'Terminology Equivalence Fallacy',
      explanation: 'Claiming an increase from 10% to 15% is a "5 percent increase" is a mathematical error that lowers Task Achievement.'
    }
  },
  {
    id: 'L70-W07-D2-Q10',
    prompt: 'In a dynamic line graph where a figure stays flat between 2005 and 2012, which expression is academically accurate?',
    lesson: 'WEEK 7 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The figure plateaued at approximately 45 percent, remaining virtually unchanged over the seven-year interval' },
      { id: 'B', text: 'The number was sleeping and took a rest between 2005 and 2012' },
      { id: 'C', text: 'The line froze dead at 45 percent because nobody was buying products' },
      { id: 'D', text: 'A zero movement action happened to the percentage from 2005 to 2012' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The figure plateaued at approximately 45 percent, remaining virtually unchanged over the seven-year interval',
    correctExplanation: '"Plateaued at approximately 45 percent" and "remaining virtually unchanged over the seven-year interval" reflect precise academic trend descriptions.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. The number was sleeping and took a rest between 2005 and 2012',
      diagnosticTitle: 'Anthropomorphic Metaphor',
      explanation: 'Numbers do not "sleep" or "take a rest"; personifying data points sounds juvenile in formal academic writing.'
    }
  },

  // ==========================================
  // WEEK 7 – DAY 3: PART 2: MEMORABLE EVENTS / EXPERIENCES & NARRATIVE ARC ARCHITECTURE
  // ==========================================
  {
    id: 'L70-W07-D3-Q01',
    prompt: 'What four sequential stages compose the "Narrative Arc Architecture" for IELTS Speaking Part 2 event monologues?',
    lesson: 'WEEK 7 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Orientation setting the context, Complication introducing the unexpected challenge, Climax marking the pivotal turning point, and Resolution providing the enduring reflective insight' },
      { id: 'B', text: 'Introduction, Definition, Five synonyms, and Goodbye statement' },
      { id: 'C', text: 'Speaking about Monday, Tuesday, Wednesday, and Thursday in order' },
      { id: 'D', text: 'Reciting a poem, telling a joke, singing a song, and asking for a high score' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Orientation setting the context, Complication introducing the unexpected challenge, Climax marking the pivotal turning point, and Resolution providing the enduring reflective insight',
    correctExplanation: 'Structuring personal narratives around Orientation -> Complication -> Climax -> Resolution creates dramatic momentum, sustains fluency, and demonstrates a broad range of narrative tenses.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Introduction, Definition, Five synonyms, and Goodbye statement',
      diagnosticTitle: 'Robotic Speech Formula',
      explanation: 'Speaking Part 2 is a personal monologue, not a dictionary definition exercise; narrative arc frameworks keep stories engaging and natural.'
    }
  },
  {
    id: 'L70-W07-D3-Q02',
    prompt: 'Which sentence demonstrates sophisticated narrative past tenses (Past Perfect Continuous and Past Simple) during the Complication stage?',
    lesson: 'WEEK 7 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'We had been driving through the mountain pass for over four hours when torrential rain suddenly washed out the access bridge' },
      { id: 'B', text: 'We drove on the mountain and rain came down very fast and bridge broke' },
      { id: 'C', text: 'We were drive cars and rain was fall and bridge was broken down' },
      { id: 'D', text: 'We drive, rain falls, and bridge breaks down completely' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'We had been driving through the mountain pass for over four hours when torrential rain suddenly washed out the access bridge',
    correctExplanation: '"Had been driving" (Past Perfect Continuous for background duration) combined with "suddenly washed out" (Past Simple for the disruptive event) showcases Band 8.0 grammatical range.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. We drove on the mountain and rain came down very fast and bridge broke',
      diagnosticTitle: 'Monotonous Past Simple Stacking',
      explanation: 'Relying exclusively on simple past verbs linked by "and" demonstrates limited syntactic range (Band 5.5).'
    }
  },
  {
    id: 'L70-W07-D3-Q03',
    prompt: 'How can a candidate incorporate "Sensory Descriptive Details" into a monologue about an outdoor festival without sounding rehearsed?',
    lesson: 'WEEK 7 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Weave in vivid acoustic, olfactory, or visual impressions that convey the atmosphere: "the pungent aroma of street food mingled with the thunderous resonance of live acoustic percussion"' },
      { id: 'B', text: 'State: "I used my five senses: eye, ear, nose, tongue, and skin to experience the event"' },
      { id: 'C', text: 'List the colors of the clothes worn by twenty different spectators' },
      { id: 'D', text: 'Explain the chemical composition of outdoor soundwaves' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Weave in vivid acoustic, olfactory, or visual impressions that convey the atmosphere: "the pungent aroma of street food mingled with the thunderous resonance of live acoustic percussion"',
    correctExplanation: 'Evocative sensory language ("pungent aroma", "mingled with", "thunderous resonance") paints an authentic mental image, boosting Lexical Resource to Band 8.0.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. State: "I used my five senses: eye, ear, nose, tongue, and skin to experience the event"',
      diagnosticTitle: 'Pedantic Literalism',
      explanation: 'Naming the five senses explicitly sounds awkward and juvenile rather than descriptive and immersive.'
    }
  },
  {
    id: 'L70-W07-D3-Q04',
    prompt: 'In Speaking Part 2, what is the best strategy for the "Resolution and Reflection" stage of a story about a personal setback?',
    lesson: 'WEEK 7 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Reflect philosophically on emotional growth, stating how navigating the ordeal fostered greater adaptability and psychological fortitude' },
      { id: 'B', text: 'Complain that life is completely unfair and blame family members for the failure' },
      { id: 'C', text: 'Ask the examiner whether they have ever had a similar terrible experience' },
      { id: 'D', text: 'End abruptly with "That is all I can remember today"' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Reflect philosophically on emotional growth, stating how navigating the ordeal fostered greater adaptability and psychological fortitude',
    correctExplanation: 'Closing with self-reflection and personal maturity ("fostered adaptability", "psychological fortitude") brings the monologue to an intellectually rich, authoritative finish.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. End abruptly with "That is all I can remember today"',
      diagnosticTitle: 'Abrupt Discourse Collapse',
      explanation: 'Ending abruptly reveals conversational exhaustion and a lack of discourse management strategies.'
    }
  },
  {
    id: 'L70-W07-D3-Q05',
    prompt: 'Which idiomatic phrase naturally conveys overcoming intense nervousness before a public event?',
    lesson: 'WEEK 7 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'I had severe butterflies in my stomach initially, but once I took the stage, my composure completely crystallized' },
      { id: 'B', text: 'My heart was jumping like a kangaroo in Australia because I was so terrified' },
      { id: 'C', text: 'I had cold feet in my shoes and hot head in my brain' },
      { id: 'D', text: 'I died a thousand deaths and then came back alive to speak' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'I had severe butterflies in my stomach initially, but once I took the stage, my composure completely crystallized',
    correctExplanation: '"Butterflies in my stomach" is an idiomatic English expression for anticipatory nervousness, paired with "composure crystallized" for a smooth transition.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. I had cold feet in my shoes and hot head in my brain',
      diagnosticTitle: 'Distorted Idiom Mixing',
      explanation: 'Mashing together idioms like "cold feet" with invented phrases ("hot head in my brain") results in awkward language errors.'
    }
  },
  {
    id: 'L70-W07-D3-Q06',
    prompt: 'In Speaking Part 3, how should a candidate answer: "Why do people attach such profound emotional significance to national anniversary celebrations?"',
    lesson: 'WEEK 7 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Highlight collective historical memory, national cohesion, and the ritualistic reaffirmation of shared civic values across generations' },
      { id: 'B', text: 'Because people get a free day off from work and can go shopping at the mall' },
      { id: 'C', text: 'I only like fireworks because they make loud noise in the sky' },
      { id: 'D', text: 'Governments force everyone to celebrate anniversaries by law' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Highlight collective historical memory, national cohesion, and the ritualistic reaffirmation of shared civic values across generations',
    correctExplanation: 'Analyzing sociological phenomena through "collective historical memory", "national cohesion", and "shared civic values" demonstrates mature, Band 8.0 reasoning.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Because people get a free day off from work and can go shopping at the mall',
      diagnosticTitle: 'Superficial Pragmatism',
      explanation: 'Focusing exclusively on pragmatic perks like a day off misses the profound cultural significance of national commemorations.'
    }
  },
  {
    id: 'L70-W07-D3-Q07',
    prompt: 'Which discourse marker indicates an unexpected plot turn during a personal story?',
    lesson: 'WEEK 7 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Much to our astonishment or Against all foreseeable odds' },
      { id: 'B', text: 'In conclusion or To sum up everything' },
      { id: 'C', text: 'Firstly or In the first place' },
      { id: 'D', text: 'According to Cambridge statistics' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Much to our astonishment or Against all foreseeable odds',
    correctExplanation: '"Much to our astonishment" and "Against all foreseeable odds" inject narrative color and build suspense at the climax of the story.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. In conclusion or To sum up everything',
      diagnosticTitle: 'Essay Linker Misuse in Spoken Story',
      explanation: '"In conclusion" is an essay wrap-up marker, not a narrative device for introducing unexpected events.'
    }
  },
  {
    id: 'L70-W07-D3-Q08',
    prompt: 'What grammatical structure allows a candidate to highlight a specific moment as the most memorable element of an event?',
    lesson: 'WEEK 7 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'A Cleft Sentence: "What struck me most profoundly about the ceremony was the dignified humility of the keynote speaker"' },
      { id: 'B', text: 'A simple list of nouns separated by dashes' },
      { id: 'C', text: 'A passive voice sentence missing a grammatical agent' },
      { id: 'D', text: 'Starting a sentence with the word "So" followed by five exclamation marks' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'A Cleft Sentence: "What struck me most profoundly about the ceremony was the dignified humility of the keynote speaker"',
    correctExplanation: 'Pseudo-cleft sentences ("What struck me most was...") provide dramatic focus and syntactic complexity, scoring high in Grammatical Range.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. A simple list of nouns separated by dashes',
      diagnosticTitle: 'Syntactic Incompleteness',
      explanation: 'Listing nouns without complete clause architecture fails to fulfill grammatical range criteria.'
    }
  },
  {
    id: 'L70-W07-D3-Q09',
    prompt: 'In Speaking Part 3, what is the best approach when evaluating the commercialization of cultural festivals?',
    lesson: 'WEEK 7 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Contrast economic sustainability and tourism revenue against the danger of cultural commodification and spiritual dilution' },
      { id: 'B', text: 'Argue that money is evil and all festivals should be completely free with zero vendors' },
      { id: 'C', text: 'Say you enjoy eating cotton candy at festivals whenever you have cash' },
      { id: 'D', text: 'Describe what your grandparents ate during the New Year festival fifty years ago' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Contrast economic sustainability and tourism revenue against the danger of cultural commodification and spiritual dilution',
    correctExplanation: 'Weighing economic revitalization against "cultural commodification" and "spiritual dilution" demonstrates mature analytical ability.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Say you enjoy eating cotton candy at festivals whenever you have cash',
      diagnosticTitle: 'Trivial Consumer Focus',
      explanation: 'Focusing on snacks treats an institutional policy question as a personal dining preference, dropping the answer out of Part 3 register.'
    }
  },
  {
    id: 'L70-W07-D3-Q10',
    prompt: 'Why should candidates avoid fabricating an outlandish, impossible story (e.g. meeting an astronaut on Mars) in Speaking Part 2?',
    lesson: 'WEEK 7 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Unrealistic fabricated scenarios require immense cognitive load to maintain consistency, causing frequent hesitations, unnatural pauses, and vocabulary breakdowns' },
      { id: 'B', text: 'The examiner will call the police to verify your passport records' },
      { id: 'C', text: 'Examiners subtract ten points for every sci-fi movie reference' },
      { id: 'D', text: 'Personal stories must be verified by a notary public before the test' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Unrealistic fabricated scenarios require immense cognitive load to maintain consistency, causing frequent hesitations, unnatural pauses, and vocabulary breakdowns',
    correctExplanation: 'Inventing wild lies creates high mental friction: candidates spend their cognitive bandwidth fabricating plot details rather than focusing on English fluency, intonation, and grammar.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. The examiner will call the police to verify your passport records',
      diagnosticTitle: 'Institutional Paranoia Myth',
      explanation: 'Examiners assess language, not truthfulness; the danger is communicative collapse due to cognitive overload, not legal consequences.'
    }
  }
];
