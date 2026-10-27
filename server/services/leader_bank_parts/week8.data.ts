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

export const LEADER_WEEK_8_QUESTIONS: LeaderQuestionPart[] = [
  // ==========================================
  // WEEK 8 – DAY 1: DYNAMIC CHART: ABSOLUTE VS PROPORTIONAL GROWTH & 5-MIN TASK 2 FLASH-DRILL
  // ==========================================
  {
    id: 'L70-W08-D1-Q01',
    prompt: 'In a dynamic line graph, if an unemployment rate rises from 10% in 2010 to 20% in 2020, which statement is mathematically and grammatically accurate?',
    lesson: 'WEEK 8 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The unemployment rate surged by 10 percentage points, representing a two-fold increase over the decade' },
      { id: 'B', text: 'The unemployment rate increased by 10% from 2010 to 2020' },
      { id: 'C', text: 'The unemployment rate experienced a 10 percent elevation to reach 20 percentage points' },
      { id: 'D', text: 'Unemployment doubled by 10 percent points across ten years' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The unemployment rate surged by 10 percentage points, representing a two-fold increase over the decade',
    correctExplanation: 'Moving from 10% to 20% is an absolute arithmetic increase of 10 percentage points (or a relative increase of 100%, doubling the initial rate). Calling it "increased by 10%" is statistically inaccurate.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. The unemployment rate increased by 10% from 2010 to 2020',
      diagnosticTitle: 'Percent vs Percentage Point Confusion',
      explanation: 'An increase of 10% on a base of 10% would only reach 11%, not 20%. The correct term for the subtraction of two percentages is percentage points.'
    }
  },
  {
    id: 'L70-W08-D1-Q02',
    prompt: 'Which sentence correctly demonstrates the use of a multiplier in academic Task 1 reporting?',
    lesson: 'WEEK 8 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Car production grew threefold, escalating from 50,000 units in 2005 to 150,000 units by 2015' },
      { id: 'B', text: 'Car production tripled by three times from 50,000 to 150,000 units' },
      { id: 'C', text: 'Car production increased threefold times between 2005 and 2015' },
      { id: 'D', text: 'Car production had a three times growth up to 150,000' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Car production grew threefold, escalating from 50,000 units in 2005 to 150,000 units by 2015',
    correctExplanation: '"Grew threefold" or "tripled" is the standard academic multiplier structure. Combining "tripled" with "by three times" is redundant.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Car production tripled by three times from 50,000 to 150,000 units',
      diagnosticTitle: 'Tautological Multiplier Redundancy',
      explanation: 'Writing "tripled by three times" repeats the same mathematical concept twice within one predicate.'
    }
  },
  {
    id: 'L70-W08-D1-Q03',
    prompt: 'Examine this trend: A metric drops from 80% to 40%, stays flat for three years, and then climbs back to 65%. Which sentence encapsulates this trajectory?',
    lesson: 'WEEK 8 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Having halved to 40 percent and plateaued for three years, the figure staged a marked rebound to 65 percent' },
      { id: 'B', text: 'The figure dropped down to 40, slept for three years, and woke up to 65' },
      { id: 'C', text: 'First it went to 40 then it stopped and then it increased up again to 65 percent' },
      { id: 'D', text: 'The rate was reduced 40 percent points before bouncing up like a ball' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Having halved to 40 percent and plateaued for three years, the figure staged a marked rebound to 65 percent',
    correctExplanation: 'This sentence compresses three stages into a single elegant structure using a perfect participial opener ("Having halved... and plateaued..."), followed by the main action ("staged a marked rebound").',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. First it went to 40 then it stopped and then it increased up again to 65 percent',
      diagnosticTitle: 'Pedestrian Sequential Coordination',
      explanation: 'Linking actions with "first... then... and then" reflects basic Band 5.0 phrasing.'
    }
  },
  {
    id: 'L70-W08-D1-Q04',
    prompt: 'What is the grammatical distinction between "increased by 20%" and "increased to 20%"?',
    lesson: 'WEEK 8 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Increased by indicates the margin of change, whereas increased to indicates the final terminal destination figure' },
      { id: 'B', text: 'Increased by is used for numbers under one hundred, while increased to is used for numbers over one thousand' },
      { id: 'C', text: 'Increased by is active voice, while increased to is passive voice' },
      { id: 'D', text: 'They are completely interchangeable in all contexts' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Increased by indicates the margin of change, whereas increased to indicates the final terminal destination figure',
    correctExplanation: '"By" indicates the numerical distance traversed (the margin of change); "to" identifies the final level reached. Confusing them distorts the data completely.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. They are completely interchangeable in all contexts',
      diagnosticTitle: 'Preposition Interchangeability Myth',
      explanation: 'If a value moves from 10 to 30, it increased BY 20, but increased TO 30. Swapping them turns a true statement into a factual falsehood.'
    }
  },
  {
    id: 'L70-W08-D1-Q05',
    prompt: 'Which phrase describes a sudden, sharp downward plunge followed by immediate stability in a dynamic chart?',
    lesson: 'WEEK 8 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'plummeted abruptly before leveling off at 15 percent' },
      { id: 'B', text: 'sank down slowly and died at 15 percent' },
      { id: 'C', text: 'jumped down terribly and stayed there forever' },
      { id: 'D', text: 'was falling with high speed to reach 15' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'plummeted abruptly before leveling off at 15 percent',
    correctExplanation: '"Plummeted abruptly" captures the rapid decline, and "leveling off at [figure]" describes the stabilization phase using academic collocations.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. sank down slowly and died at 15 percent',
      diagnosticTitle: 'Morbid Figurative Language',
      explanation: 'Describing numbers as having "died" is inappropriately emotional and informal for IELTS Task 1.'
    }
  },
  {
    id: 'L70-W08-D1-Q06',
    prompt: 'How should a candidate describe an erratic movement that oscillates between 30 and 50 units throughout a 15-year period?',
    lesson: 'WEEK 8 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'exhibited volatile fluctuations within a 20-unit corridor between 30 and 50 units' },
      { id: 'B', text: 'was crazy going up and down every single day' },
      { id: 'C', text: 'changed a lot because the line was unstable' },
      { id: 'D', text: 'increased and decreased fifty times continuously' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'exhibited volatile fluctuations within a 20-unit corridor between 30 and 50 units',
    correctExplanation: '"Exhibited volatile fluctuations within a 20-unit corridor" combines nominalization with precise quantitative parameters.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. was crazy going up and down every single day',
      diagnosticTitle: 'Hyperbolic Slang',
      explanation: 'Describing data as "crazy going up and down" violates the academic objectivity required by Cambridge assessment criteria.'
    }
  },
  {
    id: 'L70-W08-D1-Q07',
    prompt: 'In the 5-Minute Task 2 Flash-Drill, why is writing a full conclusion discouraged?',
    lesson: 'WEEK 8 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The drill is designed specifically to test rapid thesis generation and core argument mapping within five minutes, not full essay completion' },
      { id: 'B', text: 'Conclusions are not scored in Task 2' },
      { id: 'C', text: 'Writing a conclusion in under five minutes causes automatic test disqualification' },
      { id: 'D', text: 'The coursebook instructs students to leave essays unfinished' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The drill is designed specifically to test rapid thesis generation and core argument mapping within five minutes, not full essay completion',
    correctExplanation: 'The 5-min drill tests cognitive agility at the top of the essay hierarchy: decomposing the prompt, taking a stand, and drafting two structural pillars.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Conclusions are not scored in Task 2',
      diagnosticTitle: 'Component Neglect Myth',
      explanation: 'Conclusions are vital in full Task 2 essays; they are omitted in the 5-minute Flash-Drill only because it is a micro-planning exercise.'
    }
  },
  {
    id: 'L70-W08-D1-Q08',
    prompt: 'Which adverbial phrase indicates an upward trend that occurred steadily without sharp interruptions?',
    lesson: 'WEEK 8 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'advanced at a steady, incremental pace' },
      { id: 'B', text: 'shot up like a rocket' },
      { id: 'C', text: 'blew up into big numbers' },
      { id: 'D', text: 'went up without thinking' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'advanced at a steady, incremental pace',
    correctExplanation: '"Advanced at a steady, incremental pace" accurately describes continuous, gradual growth using formal register.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. shot up like a rocket',
      diagnosticTitle: 'Sensational Simile',
      explanation: 'Similes like "shot up like a rocket" are journalistic and informal, unsuited for objective statistical reporting.'
    }
  },
  {
    id: 'L70-W08-D1-Q09',
    prompt: 'Examine this data pair: In 2000, Solar = 5%, Wind = 10%. In 2020, Solar = 30%, Wind = 25%. Which sentence articulates the "Overtaking" event with Band 8.0 precision?',
    lesson: 'WEEK 8 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Despite trailing wind generation at the start of the timeframe, solar energy experienced exponential growth to overtake it by 2020' },
      { id: 'B', text: 'Wind was winning in 2000, but Solar ran faster and beat Wind in 2020' },
      { id: 'C', text: 'Solar was smaller than wind, but then Solar grew bigger and wind was defeated' },
      { id: 'D', text: 'At 2000 wind was 10 and solar was 5, then solar overtook wind to become 30' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Despite trailing wind generation at the start of the timeframe, solar energy experienced exponential growth to overtake it by 2020',
    correctExplanation: 'This sentence contrasts the initial positions using a concessive participial phrase ("Despite trailing..."), followed by the overtaking event described with formal academic vocabulary.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Wind was winning in 2000, but Solar ran faster and beat Wind in 2020',
      diagnosticTitle: 'Athletic Competition Metaphor',
      explanation: 'Describing energy sources as "running faster" and "beating" competitors treats energy generation like an athletic race.'
    }
  },
  {
    id: 'L70-W08-D1-Q10',
    prompt: 'What is the correct preposition in: "Sales peaked ___ 500 units in July, an increase ___ 150 units over June"?',
    lesson: 'WEEK 8 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'at, of' },
      { id: 'B', text: 'in, to' },
      { id: 'C', text: 'on, by' },
      { id: 'D', text: 'to, for' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'at, of',
    correctExplanation: 'The verb "peak" takes the preposition "at" ("peaked AT 500 units"), and the noun "increase" takes "of" when specifying the margin ("an increase OF 150 units").',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. on, by',
      diagnosticTitle: 'Verb vs Noun Preposition Mismatch',
      explanation: 'While the verb form takes "by" (increased BY 150), the noun form takes "of" (an increase OF 150).'
    }
  },

  // ==========================================
  // WEEK 8 – DAY 2: SENTENCE CONDENSATION & COMPLEX MIXED CHARTS & 5-MIN TASK 2 FLASH-DRILL
  // ==========================================
  {
    id: 'L70-W08-D2-Q01',
    prompt: 'In IELTS Task 1 Sentence Condensation, how should the adverb "respectively" be correctly positioned to report data for three countries?',
    lesson: 'WEEK 8 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The recycling rates in France, Germany, and the UK stood at 35 percent, 48 percent, and 52 percent, respectively' },
      { id: 'B', text: 'Respectively, France was 35 percent, Germany was 48 percent, and the UK was 52 percent' },
      { id: 'C', text: 'France, respectively Germany, and the UK had recycling numbers of 35, 48, and 52' },
      { id: 'D', text: 'The rates stood at 35, 48, and 52 percent respectively for France and Germany' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The recycling rates in France, Germany, and the UK stood at 35 percent, 48 percent, and 52 percent, respectively',
    correctExplanation: '"Respectively" is placed at the end of the clause (preceded by a comma) to clarify that the sequence of numbers corresponds one-to-one with the previously listed sequence of entities.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Respectively, France was 35 percent, Germany was 48 percent, and the UK was 52 percent',
      diagnosticTitle: 'Clause-Initial Misplacement',
      explanation: 'Placing "respectively" at the front of a sentence is ungrammatical because it requires an established sequence to refer back to.'
    }
  },
  {
    id: 'L70-W08-D2-Q02',
    prompt: 'When condensing three separate simple sentences: "Car ownership was 40% in 2000. It rose to 55% in 2010. It reached 70% in 2020", which compound-complex structure demonstrates Band 8.0 efficiency?',
    lesson: 'WEEK 8 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Starting at 40 percent in 2000, car ownership rose steadily to 55 percent by 2010, before culminating at 70 percent at the close of the period' },
      { id: 'B', text: 'Car ownership was 40% in 2000, and it rose to 55% in 2010, and then it reached 70% in 2020' },
      { id: 'C', text: 'Car ownership was 40% in 2000, which increased to 55% in 2010, which reached 70% in 2020' },
      { id: 'D', text: 'Car ownership in 2000, 2010, and 2020 had numbers of 40%, 55%, and 70%' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Starting at 40 percent in 2000, car ownership rose steadily to 55 percent by 2010, before culminating at 70 percent at the close of the period',
    correctExplanation: 'This structure uses a participial introductory clause ("Starting at..."), an active main clause ("rose steadily to..."), and a prepositional temporal closure ("before culminating at..."), packaging three years into one fluid sentence.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Car ownership was 40% in 2000, which increased to 55% in 2010, which reached 70% in 2020',
      diagnosticTitle: 'Stacked Relative Clause Trap',
      explanation: 'Stacking nested "which" clauses back-to-back creates clumsy, awkward syntax that degrades Grammatical Range.'
    }
  },
  {
    id: 'L70-W08-D2-Q03',
    prompt: 'In a "Mixed Chart" comprising a Pie Chart showing energy sources in 2020 and a Bar Chart showing greenhouse gas emissions by sector, how should the body paragraphs be logically partitioned?',
    lesson: 'WEEK 8 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Body 1 synthesizes the energy distribution from the Pie Chart; Body 2 analyzes sectoral emissions from the Bar Chart, highlighting any cross-chart correlations' },
      { id: 'B', text: 'Describe one slice of the pie, then one bar from the chart, alternating back and forth sentence by sentence' },
      { id: 'C', text: 'Combine all numbers into a single massive 150-word sentence' },
      { id: 'D', text: 'Ignore the Pie Chart completely and focus entirely on the Bar Chart' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Body 1 synthesizes the energy distribution from the Pie Chart; Body 2 analyzes sectoral emissions from the Bar Chart, highlighting any cross-chart correlations',
    correctExplanation: 'Dedication of one body paragraph to each distinct visual representation establishes clear structural boundaries while enabling cross-referencing in the overview and second body.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Describe one slice of the pie, then one bar from the chart, alternating back and forth sentence by sentence',
      diagnosticTitle: 'Alternating Fragmented Structure',
      explanation: 'Jumping back and forth between different visual formats confuses the reader and destroys paragraph coherence.'
    }
  },
  {
    id: 'L70-W08-D2-Q04',
    prompt: 'What is the optimal length target for an IELTS Task 1 report to maximize data precision and grammatical accuracy?',
    lesson: 'WEEK 8 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: '160 to 190 words' },
      { id: 'B', text: '90 to 110 words' },
      { id: 'C', text: '350 to 400 words' },
      { id: 'D', text: 'Exactly 150 words' }
    ],
    correctOptionId: 'A',
    correctAnswerText: '160 to 190 words',
    correctExplanation: 'Writing 160-190 words satisfies the 150-word minimum, permits thorough data reporting and comparison, and takes roughly 15-18 minutes, leaving ample time for Task 2.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. 350 to 400 words',
      diagnosticTitle: 'Task 1 Overwriting Trap',
      explanation: 'Task 1 counts for only one-third of the total writing mark; spending 30 minutes to write 350 words deprives Task 2 of essential development time.'
    }
  },
  {
    id: 'L70-W08-D2-Q05',
    prompt: 'Which sentence integrates two parallel statistics using a subordinating concessive clause?',
    lesson: 'WEEK 8 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'While agriculture accounted for the lion\'s share of freshwater withdrawal at 68 percent, industrial applications absorbed a modest 12 percent' },
      { id: 'B', text: 'Agriculture had 68 percent. However, industry had only 12 percent' },
      { id: 'C', text: 'Agriculture was 68 percent and industry was 12 percent because water is used differently' },
      { id: 'D', text: 'Although agriculture used 68 percent, but industry used 12 percent' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'While agriculture accounted for the lion\'s share of freshwater withdrawal at 68 percent, industrial applications absorbed a modest 12 percent',
    correctExplanation: '"While [Clause 1], [Clause 2]" balances two contrasting statistics cleanly within a single complex sentence.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Although agriculture used 68 percent, but industry used 12 percent',
      diagnosticTitle: 'Double Conjunction Error',
      explanation: 'Using "Although" and "but" in the same sentence is a severe grammatical error typical of direct L1 translation.'
    }
  },
  {
    id: 'L70-W08-D2-Q06',
    prompt: 'In a mixed visual prompt with a dynamic line graph and a static table, how should the Overview be structured?',
    lesson: 'WEEK 8 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'A two-sentence overview: Sentence 1 captures the macro trend of the dynamic line graph, and Sentence 2 summarizes the dominant category or outlier in the static table' },
      { id: 'B', text: 'A single sentence describing only the line graph and ignoring the table completely' },
      { id: 'C', text: 'A list of every number from both visuals combined into a single paragraph' },
      { id: 'D', text: 'An overview stating that both graphics are too complex to summarize' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'A two-sentence overview: Sentence 1 captures the macro trend of the dynamic line graph, and Sentence 2 summarizes the dominant category or outlier in the static table',
    correctExplanation: 'For mixed charts, the overview must synthesize the overarching message of BOTH graphics to achieve Band 7+ in Task Achievement.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. A single sentence describing only the line graph and ignoring the table completely',
      diagnosticTitle: 'Incomplete Overview Trap',
      explanation: 'Omitting one visual from the overview prevents the response from presenting a comprehensive summary, capping Task Achievement at Band 6.'
    }
  },
  {
    id: 'L70-W08-D2-Q07',
    prompt: 'Which phrase avoids the clumsy repetition of "the percentage of" across consecutive sentences?',
    lesson: 'WEEK 8 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'the proportion of, the relative share of, or the fraction of' },
      { id: 'B', text: 'the amount of numbers of or the quantity of percentages' },
      { id: 'C', text: 'how much persons or the counted total' },
      { id: 'D', text: 'the math calculation of or the percent size' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'the proportion of, the relative share of, or the fraction of',
    correctExplanation: '"The proportion of", "the relative share of", and "the fraction of" are accurate academic synonyms for "the percentage of".',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. the amount of numbers of or the quantity of percentages',
      diagnosticTitle: 'Awkward Invented Phrasing',
      explanation: '"The quantity of percentages" is unidiomatic and confusing in statistical analysis.'
    }
  },
  {
    id: 'L70-W08-D2-Q08',
    prompt: 'Transform this wordy sentence: "There were 15% of students who chose French and there were 25% of students who chose Spanish and there were 40% of students who chose German" into a condensed C1 sentence.',
    lesson: 'WEEK 8 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'French, Spanish, and German were selected by 15 percent, 25 percent, and 40 percent of students, respectively' },
      { id: 'B', text: 'There were students choosing French at 15% and Spanish at 25% and German at 40%' },
      { id: 'C', text: 'Language choices had 15% for French, 25% for Spanish, and German got 40%' },
      { id: 'D', text: 'Students took French, Spanish, German which were 15, 25, and 40 percent' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'French, Spanish, and German were selected by 15 percent, 25 percent, and 40 percent of students, respectively',
    correctExplanation: 'Using passive voice with "respectively" reduces 27 bloated words to 18 precise, academically balanced words.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Language choices had 15% for French, 25% for Spanish, and German got 40%',
      diagnosticTitle: 'Asymmetrical Coordination',
      explanation: 'Shifting from "had 15% for..." to "German got 40%" breaks syntactic parallelism and sounds informal.'
    }
  },
  {
    id: 'L70-W08-D2-Q09',
    prompt: 'What cohesive phrase can introduce an analytical comparison between the findings of two charts?',
    lesson: 'WEEK 8 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'This high level of fossil fuel consumption aligns directly with the elevated emission levels documented in the second chart' },
      { id: 'B', text: 'If you look at Chart 1 and then turn your head to Chart 2, both have big numbers' },
      { id: 'C', text: 'Chart 1 and Chart 2 are best friends because they tell the same story' },
      { id: 'D', text: 'Now let us see what the other picture wants to say to us' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'This high level of fossil fuel consumption aligns directly with the elevated emission levels documented in the second chart',
    correctExplanation: '"Aligns directly with the elevated emission levels documented in the second chart" links the two visuals with sophisticated analytical signposting.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. If you look at Chart 1 and then turn your head to Chart 2, both have big numbers',
      diagnosticTitle: 'Physical Directive Cliché',
      explanation: 'Telling the examiner to "turn your head" is colloquial and inappropriate for formal academic writing.'
    }
  },
  {
    id: 'L70-W08-D2-Q10',
    prompt: 'In Writing Task 1, why is citing raw figures without comparative analysis penalized?',
    lesson: 'WEEK 8 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The prompt explicitly requires candidates to "make comparisons where relevant"; listing figures in isolation fails to fulfill this core criterion' },
      { id: 'B', text: 'Raw numbers must be written out in Latin numerals' },
      { id: 'C', text: 'Examiners subtract points if more than three numbers appear in a report' },
      { id: 'D', text: 'Raw figures are protected by international copyright laws' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The prompt explicitly requires candidates to "make comparisons where relevant"; listing figures in isolation fails to fulfill this core criterion',
    correctExplanation: 'Task 1 requires candidates to summarize and compare data points, not merely transcribe numbers into prose.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Examiners subtract points if more than three numbers appear in a report',
      diagnosticTitle: 'Arbitrary Number Cap Myth',
      explanation: 'Data reporting is essential in Task 1 body paragraphs; the requirement is that numbers must support comparative analysis rather than stand as isolated data dumps.'
    }
  },

  // ==========================================
  // WEEK 8 – DAY 3: PART 3: WH-FRAMEWORK & COUNTER-ARGUMENT SYNTHESIS
  // ==========================================
  {
    id: 'L70-W08-D3-Q01',
    prompt: 'In IELTS Speaking Part 3, how does the "WH-Framework" expand an answer into a comprehensive 40-45 second response?',
    lesson: 'WEEK 8 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Direct Claim, followed by Underlying Rationale, Impacted Demographic, Concrete Real-World Mechanism, and Qualified Caveat' },
      { id: 'B', text: 'Asking the examiner Where, When, and Who they are before answering' },
      { id: 'C', text: 'Listing seven questions without providing any answers' },
      { id: 'D', text: 'Speaking only in questions to keep the examiner guessing' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Direct Claim, followed by Underlying Rationale, Impacted Demographic, Concrete Real-World Mechanism, and Qualified Caveat',
    correctExplanation: 'The WH-Framework structures extended discourse systematically: What (stance), Why (cause), Who (stakeholder), How (implementation), and a concession, sustaining fluent 45-second responses without hesitation.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Asking the examiner Where, When, and Who they are before answering',
      diagnosticTitle: 'Interviewer Role Reversal',
      explanation: 'Candidates should not cross-examine the examiner; the WH framework is a personal ideation tool for structuring answers.'
    }
  },
  {
    id: 'L70-W08-D3-Q02',
    prompt: 'Which opening formula executes a two-sided concession in Speaking Part 3?',
    lesson: 'WEEK 8 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'At first glance, it is easy to assume that [X]... However, upon closer scrutiny, one must also account for [Y]...' },
      { id: 'B', text: 'I agree 100% and anyone who disagrees is completely mistaken' },
      { id: 'C', text: 'Yes, no, maybe, perhaps, I don\'t really care' },
      { id: 'D', text: 'First thing is good, second thing is bad, thank you' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'At first glance, it is easy to assume that [X]... However, upon closer scrutiny, one must also account for [Y]...',
    correctExplanation: '"At first glance, it is easy to assume that... However, upon closer scrutiny..." provides a sophisticated framework for introducing nuance and critical depth.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. I agree 100% and anyone who disagrees is completely mistaken',
      diagnosticTitle: 'Dogmatic Polarized Stance',
      explanation: 'Part 3 questions assess balanced evaluation; aggressive, dogmatic responses lack the analytical depth of Band 7.5+ discourse.'
    }
  },
  {
    id: 'L70-W08-D3-Q03',
    prompt: 'When asked: "Should historic buildings be demolished to construct modern high-rise housing?", which response displays Band 8.0 stakeholder analysis?',
    lesson: 'WEEK 8 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'While urban planners face urgent pressures to alleviate housing shortages, flattening historic architecture risks eroding cultural identity; adaptive reuse provides a more balanced compromise' },
      { id: 'B', text: 'Demolish all old houses because new buildings look shinier and have elevators' },
      { id: 'C', text: 'Keep all old houses forever and let people live on the streets if there is no room' },
      { id: 'D', text: 'Old buildings are haunted so nobody should live in them anyway' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'While urban planners face urgent pressures to alleviate housing shortages, flattening historic architecture risks eroding cultural identity; adaptive reuse provides a more balanced compromise',
    correctExplanation: 'This answer addresses the tension between urban housing pressure and cultural heritage, proposing "adaptive reuse" as a mature policy solution.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Demolish all old houses because new buildings look shinier and have elevators',
      diagnosticTitle: 'Brutalist Simplification',
      explanation: 'Ignoring architectural heritage in favor of superficial traits ("shinier") reflects low-band simplistic reasoning.'
    }
  },
  {
    id: 'L70-W08-D3-Q04',
    prompt: 'In Speaking Part 3, why is giving a purely personal autobiographical answer ("Well, in my house, my brother likes...") often inappropriate?',
    lesson: 'WEEK 8 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Part 3 questions examine broad societal patterns, global trends, and general human behavior, requiring macro-level sociological perspectives rather than individual domestic anecdotes' },
      { id: 'B', text: 'Examiners are legally prohibited from hearing about candidates\' families' },
      { id: 'C', text: 'Personal pronouns like I, my, and we are strictly banned in IELTS Speaking' },
      { id: 'D', text: 'Candidates are required to pretend they are government ministers' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Part 3 questions examine broad societal patterns, global trends, and general human behavior, requiring macro-level sociological perspectives rather than individual domestic anecdotes',
    correctExplanation: 'Part 3 tests abstract discussion. Shifting to trivial family anecdotes reduces the response to Part 1 level, capping Fluency & Coherence.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Personal pronouns like I, my, and we are strictly banned in IELTS Speaking',
      diagnosticTitle: 'Pronoun Prohibition Myth',
      explanation: 'First-person framing ("In my view...", "From what I have observed...") is natural; the issue is discussing domestic anecdotes instead of societal issues.'
    }
  },
  {
    id: 'L70-W08-D3-Q05',
    prompt: 'Which phrase effectively articulates the concept of "Adaptive Reuse" in urban redevelopment?',
    lesson: 'WEEK 8 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Repurposing decommissioned industrial heritage structures into vibrant community hubs while preserving their architectural façade' },
      { id: 'B', text: 'Painting old walls with new colors so they look like modern shops' },
      { id: 'C', text: 'Knocking down old factories and building giant parking lots' },
      { id: 'D', text: 'Letting historic buildings decay naturally until they collapse' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Repurposing decommissioned industrial heritage structures into vibrant community hubs while preserving their architectural façade',
    correctExplanation: '"Repurposing decommissioned industrial heritage structures" and "preserving their architectural façade" showcase technical C1 urban planning collocations.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Painting old walls with new colors so they look like modern shops',
      diagnosticTitle: 'Cosmetic Trivialization',
      explanation: 'Describing adaptive reuse as merely painting walls trivializes an important architectural and engineering discipline.'
    }
  },
  {
    id: 'L70-W08-D3-Q06',
    prompt: 'How can a candidate maintain fluency when formulating a response to an unexpected abstract question?',
    lesson: 'WEEK 8 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Deploying a natural conversational stalling phrase: "That is an intriguing multifaceted issue; looking at it from an economic angle..."' },
      { id: 'B', text: 'Remaining totally silent for 15 seconds while tapping the desk' },
      { id: 'C', text: 'Saying "Repeat, repeat, please repeat" repeatedly' },
      { id: 'D', text: 'Pretending not to hear the question and coughing loudly' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Deploying a natural conversational stalling phrase: "That is an intriguing multifaceted issue; looking at it from an economic angle..."',
    correctExplanation: 'Using natural conversational openers gives the speaker 3-4 seconds of planning time while demonstrating sophisticated discourse management.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Remaining totally silent for 15 seconds while tapping the desk',
      diagnosticTitle: 'Dead Air Panic',
      explanation: 'Long silences over 5 seconds signal communicative breakdown and severely damage Fluency scores.'
    }
  },
  {
    id: 'L70-W08-D3-Q07',
    prompt: 'Which sentence synthesizes both environmental sustainability and corporate profitability in an answer about green business practices?',
    lesson: 'WEEK 8 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Adopting sustainable practices should not be viewed as a drain on resources; rather, it often unlocks operational efficiencies and appeals to eco-conscious consumers' },
      { id: 'B', text: 'Companies must choose between making dollars or saving baby seals' },
      { id: 'C', text: 'Green business is just marketing lies to take more cash from poor shoppers' },
      { id: 'D', text: 'Businesses should spend all their profits on trees until they go bankrupt' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Adopting sustainable practices should not be viewed as a drain on resources; rather, it often unlocks operational efficiencies and appeals to eco-conscious consumers',
    correctExplanation: 'This answer synthesizes environmental and commercial goals, noting how green practices "unlock operational efficiencies and appeal to eco-conscious consumers".',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Companies must choose between making dollars or saving baby seals',
      diagnosticTitle: 'False Dichotomy Trap',
      explanation: 'Framing complex business ethics as a cartoonish either-or choice reflects simplistic thinking.'
    }
  },
  {
    id: 'L70-W08-D3-Q08',
    prompt: 'In Speaking Part 3, how should a candidate respond when asked to suggest solutions for urban traffic congestion?',
    lesson: 'WEEK 8 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Propose a dual-pronged strategy: implementing congestion pricing to disincentivize private car use, while simultaneously expanding high-capacity mass transit systems' },
      { id: 'B', text: 'Ban all cars immediately and make everyone walk twenty miles to work' },
      { id: 'C', text: 'Build fifty-story highway bridges over every house' },
      { id: 'D', text: 'Tell people to stay home and never leave their bedrooms' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Propose a dual-pronged strategy: implementing congestion pricing to disincentivize private car use, while simultaneously expanding high-capacity mass transit systems',
    correctExplanation: 'A "dual-pronged strategy" (congestion pricing disincentive + mass transit incentive) demonstrates pragmatic, structured problem-solving.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Ban all cars immediately and make everyone walk twenty miles to work',
      diagnosticTitle: 'Extreme Unrealistic Mandate',
      explanation: 'Proposing unrealistic, authoritarian extremes shows poor real-world analysis.'
    }
  },
  {
    id: 'L70-W08-D3-Q09',
    prompt: 'Which connective marker is best suited to introduce an illustrative real-world case study in Speaking Part 3?',
    lesson: 'WEEK 8 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'A quintessential illustration of this dynamic can be observed in...' },
      { id: 'B', text: 'For example, my uncle who lives next door told me that...' },
      { id: 'C', text: 'Like what happens in movies sometimes...' },
      { id: 'D', text: 'Example number one is here...' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'A quintessential illustration of this dynamic can be observed in...',
    correctExplanation: '"A quintessential illustration of this dynamic can be observed in..." provides an academic, sophisticated lead-in for concrete case evidence.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. For example, my uncle who lives next door told me that...',
      diagnosticTitle: 'Domestic Hearsay Trap',
      explanation: 'Citing personal hearsay about family members in Part 3 lowers the register from academic discussion to casual gossip.'
    }
  },
  {
    id: 'L70-W08-D3-Q10',
    prompt: 'What tone should a candidate maintain throughout Speaking Part 3 to achieve Band 7.5+ in Fluency and Coherence?',
    lesson: 'WEEK 8 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'An analytical, objective, and conversational academic tone that balances assertiveness with intellectual humility' },
      { id: 'B', text: 'An aggressive, combative tone that seeks to argue with the examiner' },
      { id: 'C', text: 'A submissive, timid whisper that constantly apologizes for bad English' },
      { id: 'D', text: 'A theatrical dramatic performance featuring exaggerated emotional gestures' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'An analytical, objective, and conversational academic tone that balances assertiveness with intellectual humility',
    correctExplanation: 'Part 3 is an intellectual discussion among peers; an analytical yet engaging tone establishes the candidate as a capable academic communicator.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. An aggressive, combative tone that seeks to argue with the examiner',
      diagnosticTitle: 'Confrontational Misconception',
      explanation: 'Being overly confrontational or argumentative with the examiner harms the interactive quality of the test without adding value.'
    }
  }
];
