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

export const LEADER_WEEK_9_QUESTIONS: LeaderQuestionPart[] = [
  // ==========================================
  // WEEK 9 – DAY 1: LINE GRAPH SYNTHESIS & MULTI-LINE TREND CLUSTERING & 5-MIN TASK 2 FLASH-DRILL
  // ==========================================
  {
    id: 'L70-W09-D1-Q01',
    prompt: 'When confronted with a chaotic line graph featuring five intersecting trajectories from 1970 to 2020, what is the most effective Band 7.5+ grouping methodology?',
    lesson: 'WEEK 9 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Trend Clustering: Partitioning the dataset into two coherent clusters representing predominantly upward trajectories versus downward or stagnant trajectories' },
      { id: 'B', text: 'Chronological Diary: Describing what happened to every single line in 1970, then in 1980, continuing through 2020' },
      { id: 'C', text: 'Writing one sentence per line and leaving the body paragraphs unstructured' },
      { id: 'D', text: 'Reporting only the line that finishes at the highest level and ignoring the other four entirely' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Trend Clustering: Partitioning the dataset into two coherent clusters representing predominantly upward trajectories versus downward or stagnant trajectories',
    correctExplanation: 'Trend clustering simplifies visual noise by grouping entities according to net directional movement (growth cluster in Body 1, decline cluster in Body 2), highlighting key crossovers and intersections.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Chronological Diary: Describing what happened to every single line in 1970, then in 1980, continuing through 2020',
      diagnosticTitle: 'Diary-Style Listing Error',
      explanation: 'Tracking year by year for all lines creates an unreadable data inventory, dropping Coherence and Cohesion to Band 5.'
    }
  },
  {
    id: 'L70-W09-D1-Q02',
    prompt: 'Which sentence describes a dynamic "crossover or overtaking" event with academic precision?',
    lesson: 'WEEK 9 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Although Country A initially trailed Country B, its per capita emissions surged dramatically to surpass those of Country B in 2005' },
      { id: 'B', text: 'Country A ran past Country B in 2005 and became the champion' },
      { id: 'C', text: 'Country A intersected Country B like two roads crossing each other' },
      { id: 'D', text: 'Country A was lower than B, but in 2005 Country A jumped over B' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Although Country A initially trailed Country B, its per capita emissions surged dramatically to surpass those of Country B in 2005',
    correctExplanation: '"Surged dramatically to surpass those of Country B in 2005" captures the crossover using standard demographic terminology and correct pronoun substitution ("those of").',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Country A intersected Country B like two roads crossing each other',
      diagnosticTitle: 'Literal Visual Simile',
      explanation: 'Lines intersect on paper, but the real-world metrics they represent "surpass", "overtake", or "eclipse" one another.'
    }
  },
  {
    id: 'L70-W09-D1-Q03',
    prompt: 'Examine this trend: A category starts at 10 tons in 1980, grows steadily to 35 tons in 2010, and finishes at 38 tons in 2020. Which participial structure condenses this history efficiently?',
    lesson: 'WEEK 9 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Having commenced at a modest 10 tons in 1980, emissions rose steadily to 35 tons by 2010, before plateauing at 38 tons at the end of the period' },
      { id: 'B', text: 'Emissions started at 10 tons, after that it climbed to 35 tons, and then it finished at 38 tons in 2020' },
      { id: 'C', text: 'At 10 tons in 1980, emissions were rising to 35 tons in 2010 and then 38 tons was reached' },
      { id: 'D', text: 'Because emissions were 10 tons in 1980, they increased to 35 tons and then 38 tons' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Having commenced at a modest 10 tons in 1980, emissions rose steadily to 35 tons by 2010, before plateauing at 38 tons at the end of the period',
    correctExplanation: 'Using a perfect participial opener ("Having commenced at...") combined with a main clause and temporal prepositional phrase creates an advanced C1 sentence structure.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Emissions started at 10 tons, after that it climbed to 35 tons, and then it finished at 38 tons in 2020',
      diagnosticTitle: 'Repetitive Compound Linking',
      explanation: 'Stringing clauses together with "after that" and "and then" reflects elementary narrative sequencing rather than academic data synthesis.'
    }
  },
  {
    id: 'L70-W09-D1-Q04',
    prompt: 'What constitutes the "Visual Noise Filtering" technique in multi-line graph analysis?',
    lesson: 'WEEK 9 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Focusing on start points, end points, major peaks, troughs, and significant crossovers while omitting insignificant minor zigzag fluctuations' },
      { id: 'B', text: 'Wearing dark sunglasses to dim the brightness of the exam paper' },
      { id: 'C', text: 'Describing every micro-variation from month to month in exhaustive detail' },
      { id: 'D', text: 'Erasing three of the five lines with an eraser before writing' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Focusing on start points, end points, major peaks, troughs, and significant crossovers while omitting insignificant minor zigzag fluctuations',
    correctExplanation: 'Academic reporting requires abstracting overall patterns. Omitting minor zigzags to highlight structural turning points demonstrates data analysis competence.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Describing every micro-variation from month to month in exhaustive detail',
      diagnosticTitle: 'Exhaustive Micro-Tracking Trap',
      explanation: 'Micro-tracking every dip and spike bloats the report with trivial detail and obscures overarching trends.'
    }
  },
  {
    id: 'L70-W09-D1-Q05',
    prompt: 'Which signpost transitions smoothly from the rising cluster in Body 1 to the declining cluster in Body 2?',
    lesson: 'WEEK 9 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Conversely, a completely divergent trend was evident among the remaining two nations, both of which registered substantial declines' },
      { id: 'B', text: 'Now let us turn to the other lines because they went down very fast' },
      { id: 'C', text: 'On the other side of things, two countries lost all their numbers' },
      { id: 'D', text: 'Second part is about the bad countries that could not increase' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Conversely, a completely divergent trend was evident among the remaining two nations, both of which registered substantial declines',
    correctExplanation: '"Conversely, a completely divergent trend was evident..." establishes a clear contrastive topic sentence that prepares the reader for the declining dataset.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Second part is about the bad countries that could not increase',
      diagnosticTitle: 'Evaluative Bias in Task 1',
      explanation: 'Calling declining countries "bad" introduces subjective judgment; Task 1 demands neutral, objective reporting.'
    }
  },
  {
    id: 'L70-W09-D1-Q06',
    prompt: 'In a dynamic line graph, what does "trough" mean and how should it be collocated?',
    lesson: 'WEEK 9 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The lowest numerical point reached before a recovery, collocated as hit a trough of X in Year' },
      { id: 'B', text: 'The highest point on the graph, collocated as peaked at a trough' },
      { id: 'C', text: 'A flat line that never changes, collocated as troughing horizontally' },
      { id: 'D', text: 'A broken line on the diagram, collocated as troughing across years' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The lowest numerical point reached before a recovery, collocated as hit a trough of X in Year',
    correctExplanation: '"Trough" represents the lowest point in a cyclical or fluctuating curve; the standard collocation is "hit a low of" or "hit a trough of [figure]".',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. The highest point on the graph, collocated as peaked at a trough',
      diagnosticTitle: 'Antonym Contradiction',
      explanation: 'Peak is the highest point; trough is the lowest point. Pairing "peaked" with "trough" is an oxymoron.'
    }
  },
  {
    id: 'L70-W09-D1-Q07',
    prompt: 'How should a candidate handle two lines that follow virtually identical trajectories throughout the thirty-year timeframe?',
    lesson: 'WEEK 9 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Synthesize them together using parallel comparative language: "Both Country X and Country Y followed nearly identical trajectories, climbing steadily..."' },
      { id: 'B', text: 'Describe Country X completely, then repeat the exact same sentences for Country Y with different names' },
      { id: 'C', text: 'Ignore Country Y because Country X already represents it' },
      { id: 'D', text: 'Claim that the two countries merged into one single state' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Synthesize them together using parallel comparative language: "Both Country X and Country Y followed nearly identical trajectories, climbing steadily..."',
    correctExplanation: 'Combining parallel lines into a single comparative sentence ("Both Country X and Country Y followed nearly identical trajectories...") showcases high-level data synthesis and prevents tedious repetition.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Describe Country X completely, then repeat the exact same sentences for Country Y with different names',
      diagnosticTitle: 'Duplicative Description Trap',
      explanation: 'Writing identical sentences for paired lines wastes time and exposes limited grammatical flexibility.'
    }
  },
  {
    id: 'L70-W09-D1-Q08',
    prompt: 'Which sentence correctly demonstrates the noun form of "fluctuate" in a Task 1 report?',
    lesson: 'WEEK 9 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Despite recurrent fluctuations between 20 and 35 percent, the figure ended the timeframe on an upward trajectory' },
      { id: 'B', text: 'There was a lot of fluctuates occurring on the chart' },
      { id: 'C', text: 'The fluctuation was fluctuating very fast up and down' },
      { id: 'D', text: 'Fluctuating numbers had an increase in their fluctuating state' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Despite recurrent fluctuations between 20 and 35 percent, the figure ended the timeframe on an upward trajectory',
    correctExplanation: '"Despite recurrent fluctuations between 20 and 35 percent..." uses the noun form inside an academic prepositional concession, demonstrating natural grammatical range.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. There was a lot of fluctuates occurring on the chart',
      diagnosticTitle: 'Morphological Inflection Error',
      explanation: 'Using the verb "fluctuates" after "a lot of" is a fundamental part-of-speech error.'
    }
  },
  {
    id: 'L70-W09-D1-Q09',
    prompt: 'What is the role of the 5-Minute Task 2 Flash-Drill at the start of Week 9 Day 1?',
    lesson: 'WEEK 9 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'To maintain Task 2 argument mapping speed and prevent cognitive atrophy during late-stage Task 1 instruction' },
      { id: 'B', text: 'To grade other students\' handwriting styles' },
      { id: 'C', text: 'To write out twenty irregular verbs from memory' },
      { id: 'D', text: 'To copy a model essay onto tracing paper' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'To maintain Task 2 argument mapping speed and prevent cognitive atrophy during late-stage Task 1 instruction',
    correctExplanation: 'Regular 5-minute flash drills ensure that students remain primed for Task 2 throughout the course.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. To write out twenty irregular verbs from memory',
      diagnosticTitle: 'Mechanical Rote Drill Misconception',
      explanation: 'The Flash-Drill exercises conceptual argument generation, not isolated verb conjugation.'
    }
  },
  {
    id: 'L70-W09-D1-Q10',
    prompt: 'In a dynamic line graph spanning 1990 to 2020, what is the best phrasing for an initial baseline figure?',
    lesson: 'WEEK 9 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Standing at an initial baseline of 12 percent in 1990' },
      { id: 'B', text: 'Born at 12 percent when the chart started in 1990' },
      { id: 'C', text: 'Waking up at 12 percent in the year 1990' },
      { id: 'D', text: 'Being alive at 12 percent in the starting moment' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Standing at an initial baseline of 12 percent in 1990',
    correctExplanation: '"Standing at an initial baseline of 12 percent in 1990" is standard academic terminology for benchmark figures.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Born at 12 percent when the chart started in 1990',
      diagnosticTitle: 'Personification of Data Points',
      explanation: 'Data points are not living organisms; using "born" or "waking up" is unacademic and penalized.'
    }
  },

  // ==========================================
  // WEEK 9 – DAY 2: DYNAMIC & STATIC TABLES: RAW DATA SYNTHESIS & 5-MIN TASK 2 FLASH-DRILL
  // ==========================================
  {
    id: 'L70-W09-D2-Q01',
    prompt: 'In a complex data table containing 20 cells across 5 countries and 3 spending categories, what is "Row Dominance" grouping?',
    lesson: 'WEEK 9 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Organizing the body paragraphs by expenditure sector (e.g. Body 1: Food/Drinks; Body 2: Clothing and Leisure) rather than listing each country one by one' },
      { id: 'B', text: 'Writing about each country in alphabetical order across five separate paragraphs' },
      { id: 'C', text: 'Calculating the mathematical standard deviation of every column' },
      { id: 'D', text: 'Reporting only the numbers in the first column and discarding the remaining columns' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Organizing the body paragraphs by expenditure sector (e.g. Body 1: Food/Drinks; Body 2: Clothing and Leisure) rather than listing each country one by one',
    correctExplanation: 'Row Dominance structures paragraphs by sectoral category (the rows), allowing the writer to compare all 5 countries side-by-side within each sector without repetitive paragraphing.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Writing about each country in alphabetical order across five separate paragraphs',
      diagnosticTitle: 'Country-by-Country Fragmentation',
      explanation: 'Organizing by country results in 5 tiny, repetitive paragraphs that prevent comparative analysis across sectors.'
    }
  },
  {
    id: 'L70-W09-D2-Q02',
    prompt: 'In a static consumer expenditure table for 2002 across 5 European nations, what constitutes the two essential components of an effective Overview?',
    lesson: 'WEEK 9 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Identifying the universally dominant spending sector across all nations (Food/Drink/Tobacco) and the country exhibiting the highest aggregate expenditure overall' },
      { id: 'B', text: 'Listing the exact spending percentages for all five countries in Food and Drinks' },
      { id: 'C', text: 'Explaining that European citizens enjoy eating out on weekends' },
      { id: 'D', text: 'Calculating the total gross domestic product of the European Union in 2002' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Identifying the universally dominant spending sector across all nations (Food/Drink/Tobacco) and the country exhibiting the highest aggregate expenditure overall',
    correctExplanation: 'A Band 7+ Overview highlights: [1] The sector with the highest proportion in every country, and [2] The nation with the highest overall spending level, without citing raw numbers.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Listing the exact spending percentages for all five countries in Food and Drinks',
      diagnosticTitle: 'Data Contamination in Overview',
      explanation: 'Including raw percentages in the overview violates Task 1 conventions and limits Task Achievement to Band 6.'
    }
  },
  {
    id: 'L70-W09-D2-Q03',
    prompt: 'Which sentence presents comparative spending data across two countries without committing grammatical errors?',
    lesson: 'WEEK 9 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'National expenditure on clothing in Italy stood at 9.00 percent, which was considerably higher than the 5.40 percent documented for Sweden' },
      { id: 'B', text: 'National expenditure on clothing in Italy stood at 9.00 percent, which was considerably higher than Sweden' },
      { id: 'C', text: 'Italian clothing spending was 9.00 percent, higher than Sweden clothes' },
      { id: 'D', text: 'Italy spent 9.00 percent on clothes, comparing with Sweden had 5.40 percent' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'National expenditure on clothing in Italy stood at 9.00 percent, which was considerably higher than the 5.40 percent documented for Sweden',
    correctExplanation: 'Comparing "the percentage in Italy" with "the 5.40 percent documented for Sweden" maintains grammatical parallelism and avoids comparing money to a country.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. National expenditure on clothing in Italy stood at 9.00 percent, which was considerably higher than Sweden',
      diagnosticTitle: 'Illogical Comparison (Faulty Parallelism)',
      explanation: 'Saying "expenditure was higher than Sweden" compares a monetary percentage directly to a nation, a common grammatical error.'
    }
  },
  {
    id: 'L70-W09-D2-Q04',
    prompt: 'In a dynamic data table showing figures for 2000, 2010, and 2020, what is the best strategy to prevent excessive data reporting?',
    lesson: 'WEEK 9 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Selectively reporting initial baselines, final terminal figures, and the overall net change, focusing on standout anomalies' },
      { id: 'B', text: 'Transcribing every single number in all 30 cells of the table into consecutive sentences' },
      { id: 'C', text: 'Reporting only the even-numbered years and skipping odd-numbered years' },
      { id: 'D', text: 'Writing about one cell per paragraph for thirty paragraphs' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Selectively reporting initial baselines, final terminal figures, and the overall net change, focusing on standout anomalies',
    correctExplanation: 'Candidates must summarize by reporting key features and trends, not transcribe every cell in the table.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Transcribing every single number in all 30 cells of the table into consecutive sentences',
      diagnosticTitle: 'Table Transcription Pitfall',
      explanation: 'Transcribing all cells produces a tedious, mechanical catalog that fails the summary requirement of Task 1.'
    }
  },
  {
    id: 'L70-W09-D2-Q05',
    prompt: 'Which phrase describes a category that accounts for the smallest proportion across all measured entities in a table?',
    lesson: 'WEEK 9 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'constituted the lowest expenditure category across all five nations, never exceeding 3.5 percent in any individual country' },
      { id: 'B', text: 'was the dead bottom loser category for every single land' },
      { id: 'C', text: 'was so tiny that nobody cared to buy anything in that section' },
      { id: 'D', text: 'dropped into zero percent because it was completely useless' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'constituted the lowest expenditure category across all five nations, never exceeding 3.5 percent in any individual country',
    correctExplanation: '"Constituted the lowest expenditure category across all five nations, never exceeding 3.5 percent..." provides an objective, analytical synthesis of the lowest cluster.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. was the dead bottom loser category for every single land',
      diagnosticTitle: 'Colloquial Slang Inappropriateness',
      explanation: '"Dead bottom loser" is slang, violating academic style guidelines.'
    }
  },
  {
    id: 'L70-W09-D2-Q06',
    prompt: 'How should a candidate describe an outlier cell that is significantly higher than all other entries in a table?',
    lesson: 'WEEK 9 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Turkey stood out as a noticeable exception, allocating a striking 32.14 percent of total outlays to food and beverages, nearly double the proportion observed in the UK' },
      { id: 'B', text: 'Turkey went crazy on food and ate up 32.14 percent of the whole money' },
      { id: 'C', text: 'Turkey had an unexpected monster number that shocked all economists' },
      { id: 'D', text: 'Look at Turkey because its number is bigger than everyone else' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Turkey stood out as a noticeable exception, allocating a striking 32.14 percent of total outlays to food and beverages, nearly double the proportion observed in the UK',
    correctExplanation: '"Stood out as a noticeable exception, allocating a striking 32.14 percent..." highlights the anomaly with academic precision and comparative context.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Turkey went crazy on food and ate up 32.14 percent of the whole money',
      diagnosticTitle: 'Conversational Exaggeration',
      explanation: 'Phrases like "went crazy on food" and "ate up money" are too informal for IELTS academic reports.'
    }
  },
  {
    id: 'L70-W09-D2-Q07',
    prompt: 'What grammatical structure allows a candidate to summarize the middle ranks in a static data table efficiently?',
    lesson: 'WEEK 9 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'A clustered range sentence: "The corresponding figures for the remaining three nations occupied an intermediate bracket, ranging between 15.6 percent and 18.8 percent"' },
      { id: 'B', text: 'Three identical sentences repeating "The number was X" three times' },
      { id: 'C', text: 'A mathematical formula written in algebraic symbols' },
      { id: 'D', text: 'A statement saying that middle numbers do not matter' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'A clustered range sentence: "The corresponding figures for the remaining three nations occupied an intermediate bracket, ranging between 15.6 percent and 18.8 percent"',
    correctExplanation: 'Clustering intermediate values into a bounded range ("occupied an intermediate bracket, ranging between X and Y") demonstrates sophisticated data synthesis.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Three identical sentences repeating "The number was X" three times',
      diagnosticTitle: 'Monotonous List Stacking',
      explanation: 'Repeating simple sentences lowers Grammatical Range and shows a lack of syntactical variety.'
    }
  },
  {
    id: 'L70-W09-D2-Q08',
    prompt: 'When describing a table measuring percentages of national income, which term correctly substitutes for "money spent"?',
    lesson: 'WEEK 9 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'budgetary allocation, consumer expenditure, or financial outlays' },
      { id: 'B', text: 'cash throwing, coin giving, or wallet emptying' },
      { id: 'C', text: 'monetary losing, dollar spending, or bill paying' },
      { id: 'D', text: 'price buying or wealth moving' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'budgetary allocation, consumer expenditure, or financial outlays',
    correctExplanation: '"Budgetary allocation", "consumer expenditure", and "financial outlays" are precise formal economic terms appropriate for Task 1.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. cash throwing, coin giving, or wallet emptying',
      diagnosticTitle: 'Colloquial Invented Phrases',
      explanation: 'Casual expressions like "wallet emptying" are unsuitable for academic Task 1 discourse.'
    }
  },
  {
    id: 'L70-W09-D2-Q09',
    prompt: 'What is the primary danger of using "Column Dominance" when the table has 8 columns and only 2 rows?',
    lesson: 'WEEK 9 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'It forces the writer to divide the text into eight micro-paragraphs or constantly repeat the two row labels eight times, resulting in extreme structural fragmentation' },
      { id: 'B', text: 'It causes the ink to bleed through the test paper' },
      { id: 'C', text: 'Examiners are instructed to award zero for column-first writing' },
      { id: 'D', text: 'It turns the table into a line graph' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'It forces the writer to divide the text into eight micro-paragraphs or constantly repeat the two row labels eight times, resulting in extreme structural fragmentation',
    correctExplanation: 'Structuring along the 8 columns fragments the essay into 8 disconnected units; organizing along the 2 rows allows 2 coherent, comprehensive body paragraphs.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Examiners are instructed to award zero for column-first writing',
      diagnosticTitle: 'Rule Exaggeration',
      explanation: 'Examiners do not award zero; rather, poor organization lowers Coherence and Cohesion due to fragmentation.'
    }
  },
  {
    id: 'L70-W09-D2-Q10',
    prompt: 'Choose the most cohesive sentence to report consumer expenditure on leisure and education in Germany (2.21%) and Spain (1.98%).',
    lesson: 'WEEK 9 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Germany and Spain recorded marginally lower allocations for leisure and education, at 2.21 percent and 1.98 percent, respectively' },
      { id: 'B', text: 'Germany was 2.21% on leisure and education and Spain was 1.98% on leisure and education' },
      { id: 'C', text: 'Leisure and education in Germany took 2.21%, but Spain took 1.98% of the money' },
      { id: 'D', text: 'Both Germany with Spain spent 2.21% and 1.98% on having fun and learning' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Germany and Spain recorded marginally lower allocations for leisure and education, at 2.21 percent and 1.98 percent, respectively',
    correctExplanation: '"Recorded marginally lower allocations for..., at X and Y, respectively" packs the data into a concise, formal academic structure.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Germany was 2.21% on leisure and education and Spain was 1.98% on leisure and education',
      diagnosticTitle: 'Redundant Repetitive Parallelism',
      explanation: 'Repeating "on leisure and education" in both clauses creates clunky, unedited phrasing.'
    }
  },

  // ==========================================
  // WEEK 9 – DAY 3: HANDLING ABSTRACT & COMPLEX TOPICS IN SPEAKING (ART, ETHICS & SOCIAL RESPONSIBILITIES)
  // ==========================================
  {
    id: 'L70-W09-D3-Q01',
    prompt: 'In IELTS Speaking Part 3, why should candidates avoid deploying overly pretentious, obscure C2 philosophical jargon (e.g. "ontological alienation", "existential catharsis") when answering questions about art and society?',
    lesson: 'WEEK 9 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Obscure philosophical terms often sound memorized, unnatural, and impede communicative clarity; practical C1 collocations such as relieve stress and cultural heritage are far more natural and effective' },
      { id: 'B', text: 'Using philosophy terms results in automatic disqualification by Cambridge regulations' },
      { id: 'C', text: 'Examiners are not allowed to possess university degrees in humanities' },
      { id: 'D', text: 'Philosophy words are exclusively reserved for written essays, not speech' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Obscure philosophical terms often sound memorized, unnatural, and impede communicative clarity; practical C1 collocations such as relieve stress and cultural heritage are far more natural and effective',
    correctExplanation: 'Forcing high-level philosophical jargon creates unnatural delivery and obscures communication. Candidates score higher using pragmatic, well-contextualized C1 language naturally.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Using philosophy terms results in automatic disqualification by Cambridge regulations',
      diagnosticTitle: 'Disqualification Myth',
      explanation: 'There is no disqualification; the penalty arises from unnatural delivery, poor collocation, and reduced communicative clarity.'
    }
  },
  {
    id: 'L70-W09-D3-Q02',
    prompt: 'When responding to the Part 2 prompt "Describe an artwork or traditional craft that you admire", which introductory formulation establishes an authoritative C1 context?',
    lesson: 'WEEK 9 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'I would like to share my appreciation for traditional lacquerware, an exquisite handicraft deeply intertwined with our cultural heritage' },
      { id: 'B', text: 'I want to talk about a pretty painting on the wall in my dining room' },
      { id: 'C', text: 'Art is good and I saw one craft last Sunday when I walked around' },
      { id: 'D', text: 'Today I will tell you about an artwork because the card told me to do so' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'I would like to share my appreciation for traditional lacquerware, an exquisite handicraft deeply intertwined with our cultural heritage',
    correctExplanation: '"Traditional lacquerware", "exquisite handicraft", and "deeply intertwined with our cultural heritage" set an elevated, authentic tone for the monologue.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Today I will tell you about an artwork because the card told me to do so',
      diagnosticTitle: 'Meta-Discourse Cue Card Echo',
      explanation: 'Announcing that you are speaking because the cue card instructed you sounds rehearsed and lacks genuine communicative initiative.'
    }
  },
  {
    id: 'L70-W09-D3-Q03',
    prompt: 'In Speaking Part 3, how should a candidate analyze whether governments should subsidize modern public art installations?',
    lesson: 'WEEK 9 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Weigh public funding for civic beautification and communal well-being against the counter-argument that tax revenues should prioritize essential healthcare and infrastructure' },
      { id: 'B', text: 'Argue that governments should spend 100% of national budgets on giant metal statues' },
      { id: 'C', text: 'State that modern art is ugly and nobody should ever look at it' },
      { id: 'D', text: 'Refuse to answer because you do not work for the ministry of finance' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Weigh public funding for civic beautification and communal well-being against the counter-argument that tax revenues should prioritize essential healthcare and infrastructure',
    correctExplanation: 'Balancing the cultural and civic benefits of art with public spending priorities demonstrates balanced, Band 8.0 critical analysis.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. State that modern art is ugly and nobody should ever look at it',
      diagnosticTitle: 'Subjective Aesthetic Dismissal',
      explanation: 'Dismissing public art as "ugly" fails to engage with the socio-economic and policy dimensions of public arts funding.'
    }
  },
  {
    id: 'L70-W09-D3-Q04',
    prompt: 'Which practical C1 collocation pair effectively explains the psychological value of engaging with creative arts?',
    lesson: 'WEEK 9 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'alleviating mental strain and fostering emotional resilience' },
      { id: 'B', text: 'making brain stop hurting and feeling super happy' },
      { id: 'C', text: 'curing all human mental diseases instantly' },
      { id: 'D', text: 'giving happy thoughts so sadness goes away forever' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'alleviating mental strain and fostering emotional resilience',
    correctExplanation: '"Alleviating mental strain" and "fostering emotional resilience" are precise, idiomatic academic collocations for psychological health.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. making brain stop hurting and feeling super happy',
      diagnosticTitle: 'Informal Colloquial Redundancy',
      explanation: 'Conversational phrases like "making brain stop hurting" reflect low-level language unsuited for Part 3 discussion.'
    }
  },
  {
    id: 'L70-W09-D3-Q05',
    prompt: 'When asked: "Do corporate enterprises have an ethical responsibility to protect local communities?", which response provides the most nuanced perspective?',
    lesson: 'WEEK 9 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'While the primary objective of commercial enterprises is shareholder profitability, neglecting corporate social responsibility risks consumer boycotts and reputational damage' },
      { id: 'B', text: 'Businesses exist only to steal money and do not care about anyone at all' },
      { id: 'C', text: 'Companies should give away all their factory machines to poor villagers' },
      { id: 'D', text: 'Yes, because being nice is the best thing in the whole world' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'While the primary objective of commercial enterprises is shareholder profitability, neglecting corporate social responsibility risks consumer boycotts and reputational damage',
    correctExplanation: 'Acknowledging shareholder obligations while emphasizing the practical risks of neglecting social responsibility demonstrates balanced economic reasoning.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Businesses exist only to steal money and do not care about anyone at all',
      diagnosticTitle: 'Cynical Oversimplification',
      explanation: 'Cynical oversimplifications lack academic objectivity and fail to engage with corporate governance realities.'
    }
  },
  {
    id: 'L70-W09-D3-Q06',
    prompt: 'Which discourse marker indicates an ethical dilemma where two valid principles conflict with each other?',
    lesson: 'WEEK 9 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'This presents an acute ethical conundrum where individual liberties clash with collective welfare' },
      { id: 'B', text: 'Both things fight each other and make a big headache' },
      { id: 'C', text: 'It is a boxing match between two different opinions' },
      { id: 'D', text: 'First one is good, second one is bad, but I don\'t know' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'This presents an acute ethical conundrum where individual liberties clash with collective welfare',
    correctExplanation: '"An acute ethical conundrum where individual liberties clash with collective welfare" showcases high-level analytical phrasing.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. It is a boxing match between two different opinions',
      diagnosticTitle: 'Inappropriate Combat Metaphor',
      explanation: 'Describing ethical dilemmas as "a boxing match" is overly colloquial and reduces complex ethics to a sport cliché.'
    }
  },
  {
    id: 'L70-W09-D3-Q07',
    prompt: 'In Speaking Part 2, what technique ensures vivid narration when describing the craftsmanship of a traditional object?',
    lesson: 'WEEK 9 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Detailing the artisanal technique: intricate hand-carved patterns, organic natural pigments, and months of meticulous refinement' },
      { id: 'B', text: 'Repeating that the craftsman was very talented and worked really hard' },
      { id: 'C', text: 'Listing the price tag and the store discount receipt' },
      { id: 'D', text: 'Explaining how many liters of wood glue were purchased' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Detailing the artisanal technique: intricate hand-carved patterns, organic natural pigments, and months of meticulous refinement',
    correctExplanation: 'Terms like "intricate hand-carved patterns", "organic natural pigments", and "meticulous refinement" showcase rich descriptive vocabulary.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Repeating that the craftsman was very talented and worked really hard',
      diagnosticTitle: 'Generic Quality Repetition',
      explanation: 'Repeating that someone is "talented" provides no visual or technical detail, keeping Lexical Resource at Band 5.5.'
    }
  },
  {
    id: 'L70-W09-D3-Q08',
    prompt: 'How should a candidate tackle the abstract question: "Can artificial intelligence ever produce genuine art?"',
    lesson: 'WEEK 9 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Distinguish between generative algorithmic pattern imitation and authentic human intentionality rooted in conscious emotional struggle' },
      { id: 'B', text: 'Say that computers do not have hands, so they cannot paint' },
      { id: 'C', text: 'Predict that AI will become President of the United States' },
      { id: 'D', text: 'State that you hate computers and prefer walking in forests' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Distinguish between generative algorithmic pattern imitation and authentic human intentionality rooted in conscious emotional struggle',
    correctExplanation: 'Distinguishing between pattern imitation and human intentionality provides an intellectually nuanced foundation for discussing generative AI in art.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Say that computers do not have hands, so they cannot paint',
      diagnosticTitle: 'Literal Physicality Fallacy',
      explanation: 'Saying computers lack hands ignores digital art entirely, reflecting a superficial understanding of technology.'
    }
  },
  {
    id: 'L70-W09-D3-Q09',
    prompt: 'Which phrase expresses the social responsibility of citizens in environmental stewardship?',
    lesson: 'WEEK 9 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Civic responsibility entails conscientious consumption habits and active engagement in community recycling initiatives' },
      { id: 'B', text: 'People should just be nice and pick up garbage on the street sometimes' },
      { id: 'C', text: 'Citizens must never throw anything away and keep all trash in their homes' },
      { id: 'D', text: 'Everyone must pay fifty dollars every morning to clean trees' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Civic responsibility entails conscientious consumption habits and active engagement in community recycling initiatives',
    correctExplanation: '"Civic responsibility entails conscientious consumption habits..." demonstrates academic precision and natural register.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. People should just be nice and pick up garbage on the street sometimes',
      diagnosticTitle: 'Informal Colloquial Register',
      explanation: 'Using phrases like "just be nice" lacks the formal precision required for Band 7.5+ discourse.'
    }
  },
  {
    id: 'L70-W09-D3-Q10',
    prompt: 'In Speaking Part 3, what is the best strategy if you need 2-3 seconds to gather your thoughts on a complex ethical question?',
    lesson: 'WEEK 9 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Paraphrase the core tension of the question: "That raises a delicate balance between personal freedom and public accountability; from my perspective..."' },
      { id: 'B', text: 'Stare at the ceiling in complete silence' },
      { id: 'C', text: 'Ask the examiner to explain what ethics means' },
      { id: 'D', text: 'Pretend your throat hurts and request water' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Paraphrase the core tension of the question: "That raises a delicate balance between personal freedom and public accountability; from my perspective..."',
    correctExplanation: 'Reflecting the core tension buys cognitive time while immediately demonstrating sophisticated vocabulary and natural discourse fluency.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Stare at the ceiling in complete silence',
      diagnosticTitle: 'Hesitation Void',
      explanation: 'Silent staring damages Fluency scores; filler phrases maintaining communicative contact are standard native strategies.'
    }
  }
];
