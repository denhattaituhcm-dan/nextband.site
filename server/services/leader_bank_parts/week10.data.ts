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

export const LEADER_WEEK_10_QUESTIONS: LeaderQuestionPart[] = [
  // ==========================================
  // WEEK 10 – DAY 1: MAPS & SPATIAL TRANSFORMATION & 5-MIN TASK 2 FLASH-DRILL
  // ==========================================
  {
    id: 'L70-W10-D1-Q01',
    prompt: 'In IELTS Writing Task 1 Map descriptions, which grammatical voice is mandatory when describing anthropogenic urban redevelopment (e.g. constructing buildings or roads)?',
    lesson: 'WEEK 10 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Passive voice: "A modern commercial plaza was erected" or "The derelict warehouse was demolished"' },
      { id: 'B', text: 'Active voice with vague personal subjects: "People built a plaza" or "They knocked down the warehouse"' },
      { id: 'C', text: 'Future continuous tense exclusively' },
      { id: 'D', text: 'First-person active voice: "I planned the city roads"' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Passive voice: "A modern commercial plaza was erected" or "The derelict warehouse was demolished"',
    correctExplanation: 'Because the architectural and town planning changes are carried out by unseen municipal agents, formal passive constructions ("was constructed", "was demolished", "was repurposed") are the academic standard.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Active voice with vague personal subjects: "People built a plaza" or "They knocked down the warehouse"',
      diagnosticTitle: 'Vague Agent Intrusion',
      explanation: 'Using "They built" or "People made" introduces informal, conversational phrasing inappropriate for academic reports.'
    }
  },
  {
    id: 'L70-W10-D1-Q02',
    prompt: 'Which directional phrase correctly describes the relative location of a newly built amenity?',
    lesson: 'WEEK 10 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Situated to the northeast of the town center, adjacent to the railway line' },
      { id: 'B', text: 'Standing on the upper right corner of the paper' },
      { id: 'C', text: 'Located in the north-east side from the town center' },
      { id: 'D', text: 'Placed near the top right hand near the train' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Situated to the northeast of the town center, adjacent to the railway line',
    correctExplanation: 'Using compass coordinates with correct prepositions ("to the northeast of...", "adjacent to...") reflects professional spatial cartography.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Standing on the upper right corner of the paper',
      diagnosticTitle: 'Page-Based Spatial Reference',
      explanation: 'Referring to the physical page ("upper right corner") is a common error; candidates must describe the geographical landscape itself using cardinal directions.'
    }
  },
  {
    id: 'L70-W10-D1-Q03',
    prompt: 'Which verb pair accurately describes replacing an old industrial facility with residential housing?',
    lesson: 'WEEK 10 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The obsolete factory was demolished to make way for a modern residential complex' },
      { id: 'B', text: 'The old factory was murdered and houses were born in its spot' },
      { id: 'C', text: 'The factory died so that people can live in new buildings' },
      { id: 'D', text: 'The industrial area was disappeared to give apartments' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The obsolete factory was demolished to make way for a modern residential complex',
    correctExplanation: '"Was demolished to make way for a modern residential complex" pairs standard urban planning vocabulary with passive syntax.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. The industrial area was disappeared to give apartments',
      diagnosticTitle: 'Ergative Verb Passive Error',
      explanation: '"Disappear" is an intransitive verb that cannot be made passive ("was disappeared" is ungrammatical).'
    }
  },
  {
    id: 'L70-W10-D1-Q04',
    prompt: 'How should the body paragraphs of a comparative Map task (e.g. a town in 1995 vs today) be logically organized?',
    lesson: 'WEEK 10 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Geographical division: Body 1 covers redevelopments in the northern and eastern zones; Body 2 covers redevelopments in the southern and western zones' },
      { id: 'B', text: 'Writing one sentence for every single tree and house visible on the map' },
      { id: 'C', text: 'Describing only the old map in Body 1 and forgetting to mention the new map' },
      { id: 'D', text: 'Writing about roads in Body 1 and colors in Body 2' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Geographical division: Body 1 covers redevelopments in the northern and eastern zones; Body 2 covers redevelopments in the southern and western zones',
    correctExplanation: 'Dividing the town by geographical sector (e.g. North/East vs South/West) enables structured, side-by-side comparison of past and present configurations in each area.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Describing only the old map in Body 1 and forgetting to mention the new map',
      diagnosticTitle: 'Comparative Omission Error',
      explanation: 'Omitting the modern map fails the prompt\'s comparative requirement, capping Task Achievement at Band 5.'
    }
  },
  {
    id: 'L70-W10-D1-Q05',
    prompt: 'What constitutes an effective Overview sentence for an urban development Map?',
    lesson: 'WEEK 10 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Overall, the rural settlement underwent a comprehensive modernization, transforming from a predominantly agrarian community into a commercial and residential hub' },
      { id: 'B', text: 'Overall, there were five houses in 1995 and seven houses in 2020 on the map' },
      { id: 'C', text: 'Overall, the town changed because people wanted more concrete and less trees' },
      { id: 'D', text: 'Overall, the map is very interesting and has many black lines drawn on it' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Overall, the rural settlement underwent a comprehensive modernization, transforming from a predominantly agrarian community into a commercial and residential hub',
    correctExplanation: 'An ideal Map Overview synthesizes the macro-transformation (agrarian to commercial/residential modernization) without getting bogged down in individual buildings.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Overall, there were five houses in 1995 and seven houses in 2020 on the map',
      diagnosticTitle: 'Micro-Detail Counting in Overview',
      explanation: 'Counting individual houses treats micro-details as the overview, failing to convey the overarching transformation.'
    }
  },
  {
    id: 'L70-W10-D1-Q06',
    prompt: 'Which preposition correctly indicates that a road runs alongside a river?',
    lesson: 'WEEK 10 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'A newly constructed dual carriageway runs parallel to the river' },
      { id: 'B', text: 'A newly constructed dual carriageway runs perpendicular inside the river' },
      { id: 'C', text: 'A newly constructed dual carriageway runs across parallel the water' },
      { id: 'D', text: 'A newly constructed dual carriageway runs opposite against the river' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'A newly constructed dual carriageway runs parallel to the river',
    correctExplanation: '"Runs parallel to [feature]" is the standard geographical expression for roads running alongside waterways or railway tracks.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. A newly constructed dual carriageway runs perpendicular inside the river',
      diagnosticTitle: 'Geometric Term Confusion',
      explanation: '"Perpendicular" means at a 90-degree right angle (crossing it), not alongside it.'
    }
  },
  {
    id: 'L70-W10-D1-Q07',
    prompt: 'Which verb indicates that an existing airport runway was made longer?',
    lesson: 'WEEK 10 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'lengthened or extended' },
      { id: 'B', text: 'magnified or inflated' },
      { id: 'C', text: 'widened or thickened' },
      { id: 'D', text: 'multiplied or duplicated' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'lengthened or extended',
    correctExplanation: 'Linear extensions of runways, roads, or railway tracks use "extended" or "lengthened". "Magnified" or "inflated" are lexical errors.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. magnified or inflated',
      diagnosticTitle: 'Inappropriate Dimension Verb',
      explanation: '"Inflate" applies to balloons or currency, and "magnify" applies to optical lenses; neither applies to physical infrastructure length.'
    }
  },
  {
    id: 'L70-W10-D1-Q08',
    prompt: 'In a Map report, which expression accurately describes the total removal of woodland to make space for a car park?',
    lesson: 'WEEK 10 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The forested area in the south was completely cleared to facilitate the construction of an expansive vehicle car park' },
      { id: 'B', text: 'Trees were killed in the south so cars can park their wheels' },
      { id: 'C', text: 'Woodland was cut off down to become an asphalt field' },
      { id: 'D', text: 'Nature was destroyed by humans to put fifty automobiles' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The forested area in the south was completely cleared to facilitate the construction of an expansive vehicle car park',
    correctExplanation: '"Was completely cleared to facilitate the construction of..." uses precise academic register and passive voice.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Trees were killed in the south so cars can park their wheels',
      diagnosticTitle: 'Inappropriate Animate Lexis',
      explanation: 'Describing tree felling as "trees were killed" is melodramatic and unacademic.'
    }
  },
  {
    id: 'L70-W10-D1-Q09',
    prompt: 'What signpost smoothly moves the reader from the northern half of the town to the southern sector?',
    lesson: 'WEEK 10 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Shifting attention to the southern perimeter of the settlement, notable infrastructural alterations were also implemented' },
      { id: 'B', text: 'Now look at the bottom of the picture to see more things' },
      { id: 'C', text: 'And also down here there were other changes happening' },
      { id: 'D', text: 'Let me jump to the south side now' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Shifting attention to the southern perimeter of the settlement, notable infrastructural alterations were also implemented',
    correctExplanation: '"Shifting attention to the southern perimeter..." provides an elegant geographical transition between body paragraphs.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Now look at the bottom of the picture to see more things',
      diagnosticTitle: 'Visual Page Directive',
      explanation: 'Referring to the "bottom of the picture" is unacademic; directional analysis must refer to the cardinal geography ("southern perimeter").'
    }
  },
  {
    id: 'L70-W10-D1-Q10',
    prompt: 'When describing a facility that was converted from a school into a community museum, which verb structure is best?',
    lesson: 'WEEK 10 – DAY 1',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The former secondary school building was repurposed into a community heritage museum' },
      { id: 'B', text: 'The school changed its mind and became a museum' },
      { id: 'C', text: 'They swapped the school inside out to display old things' },
      { id: 'D', text: 'The school was transformed into being a museum by builders' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The former secondary school building was repurposed into a community heritage museum',
    correctExplanation: '"Was repurposed into a community heritage museum" precisely captures functional architectural conversion in formal English.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. The school changed its mind and became a museum',
      diagnosticTitle: 'Anthropomorphic Building Fallacy',
      explanation: 'Buildings do not have minds; personifying infrastructure is unacceptable in formal writing.'
    }
  },

  // ==========================================
  // WEEK 10 – DAY 2: PROCESS & MANUFACTURING CYCLES & 5-MIN TASK 2 FLASH-DRILL
  // ==========================================
  {
    id: 'L70-W10-D2-Q01',
    prompt: 'In IELTS Writing Task 1 Process Diagrams, what is the fundamental grammatical distinction between a man-made manufacturing process and a natural life cycle?',
    lesson: 'WEEK 10 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Man-made manufacturing processes predominantly require passive voice such as the olives are crushed, whereas natural life cycles predominantly require active voice such as the salmon migrates' },
      { id: 'B', text: 'Man-made processes require future tense, while natural cycles require past tense' },
      { id: 'C', text: 'Natural cycles do not require an Overview paragraph' },
      { id: 'D', text: 'Both processes must be written in the first person plural using pronouns like we wash the olives' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Man-made manufacturing processes predominantly require passive voice such as the olives are crushed, whereas natural life cycles predominantly require active voice such as the salmon migrates',
    correctExplanation: 'In manufacturing, human agents perform mechanical operations on raw materials (requiring passive voice); in natural cycles, biological organisms perform actions spontaneously (requiring active voice).',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Both processes must be written in the first person plural using pronouns like we wash the olives',
      diagnosticTitle: 'First-Person Operator Trap',
      explanation: 'Using "we" or "you" in Task 1 violates academic objectivity; impersonal passive constructions must be used instead.'
    }
  },
  {
    id: 'L70-W10-D2-Q02',
    prompt: 'Which sequential sentence avoids mechanical "Then / Next" repetition by using a perfect passive participle?',
    lesson: 'WEEK 10 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Having been thoroughly rinsed in vibrating vats, the harvested olives are subsequently transferred to a mechanical press' },
      { id: 'B', text: 'Then the olives are washed. Next they go to the machine' },
      { id: 'C', text: 'After washing olives, then next step is pressing them with heavy stone' },
      { id: 'D', text: 'Olives are washed and then next they are pressed immediately' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Having been thoroughly rinsed in vibrating vats, the harvested olives are subsequently transferred to a mechanical press',
    correctExplanation: '"Having been thoroughly rinsed in vibrating vats..." uses a past participial clause to express temporal completion, demonstrating Band 8.0 syntactical complexity.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Then the olives are washed. Next they go to the machine',
      diagnosticTitle: 'Choppy Sequential Coordination',
      explanation: 'Stacking "Then... Next..." produces childish, fragmented clauses that limit Grammatical Range to Band 5.0.'
    }
  },
  {
    id: 'L70-W10-D2-Q03',
    prompt: 'What constitutes an exemplary Overview for a 7-stage Olive Oil Manufacturing process diagram?',
    lesson: 'WEEK 10 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Overall, the production cycle comprises seven sequential stages, commencing with manual olive harvesting and culminating in commercial bottling and distribution' },
      { id: 'B', text: 'Overall, olive oil is very delicious and healthy for cooking Mediterranean food' },
      { id: 'C', text: 'Overall, there are seven arrows and six square boxes drawn in this diagram' },
      { id: 'D', text: 'Overall, step one is harvesting and step seven is drinking the oil' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Overall, the production cycle comprises seven sequential stages, commencing with manual olive harvesting and culminating in commercial bottling and distribution',
    correctExplanation: 'A Band 7+ Process Overview summarizes: [1] Total number of distinct stages, [2] The initial starting input, and [3] The final commercial output.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Overall, olive oil is very delicious and healthy for cooking Mediterranean food',
      diagnosticTitle: 'Culinary Opinion Intrusion',
      explanation: 'Task 1 requires reporting the diagram\'s technical stages, not personal culinary evaluations of olive oil.'
    }
  },
  {
    id: 'L70-W10-D2-Q04',
    prompt: 'Which signpost introduces the culminating final phase of an industrial process?',
    lesson: 'WEEK 10 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'In the final phase of production, the refined oil is packaged into airtight glass bottles before being dispatched to retailers' },
      { id: 'B', text: 'At last the factory finishes its work and workers go home' },
      { id: 'C', text: 'Finally, the oil is ready to be sold for money' },
      { id: 'D', text: 'Lastly, end of the diagram has arrived' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'In the final phase of production, the refined oil is packaged into airtight glass bottles before being dispatched to retailers',
    correctExplanation: '"In the final phase of production...", "refined oil is packaged into...", and "dispatched to retailers" use formal manufacturing collocations.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. At last the factory finishes its work and workers go home',
      diagnosticTitle: 'Narrative Storytelling Shift',
      explanation: 'Mentioning workers going home treats the technical process diagram like a fictional narrative.'
    }
  },
  {
    id: 'L70-W10-D2-Q05',
    prompt: 'When two stages occur simultaneously in a manufacturing cycle, which structure expresses this relationship accurately?',
    lesson: 'WEEK 10 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Simultaneously, while the liquid extract undergoes centrifugal separation, the solid pomace is diverted for biofuel conversion' },
      { id: 'B', text: 'At the same time, liquid goes left and solid goes right together' },
      { id: 'C', text: 'Liquid and solid do their jobs at once like two brothers' },
      { id: 'D', text: 'Together both steps happen at the identical second' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Simultaneously, while the liquid extract undergoes centrifugal separation, the solid pomace is diverted for biofuel conversion',
    correctExplanation: '"Simultaneously, while... undergoes centrifugal separation, the solid pomace is diverted..." captures concurrent technical processes with advanced vocabulary.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Liquid and solid do their jobs at once like two brothers',
      diagnosticTitle: 'Informal Personification',
      explanation: 'Using familial similes like "two brothers" is completely inappropriate in an academic technical report.'
    }
  },
  {
    id: 'L70-W10-D2-Q06',
    prompt: 'In a process diagram, what should a candidate do if an unfamiliar technical term appears (e.g. "centrifuge" or "pasteurization chamber")?',
    lesson: 'WEEK 10 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Retain the exact technical term and integrate it into a grammatically accurate passive sentence: "the mixture is directed into a centrifuge"' },
      { id: 'B', text: 'Attempt to guess a bizarre synonym like spinning metallic soup bowl' },
      { id: 'C', text: 'Omit that entire stage from the essay to avoid making a mistake' },
      { id: 'D', text: 'Draw a sketch of the machine on the answer sheet' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Retain the exact technical term and integrate it into a grammatically accurate passive sentence: "the mixture is directed into a centrifuge"',
    correctExplanation: 'Examiners expect candidates to use specific technical labels from the diagram (centrifuge, kiln, hopper) accurately within grammatically sound sentences; paraphrasing established technical terms often creates nonsensical phrasing.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Attempt to guess a bizarre synonym like spinning metallic soup bowl',
      diagnosticTitle: 'Obsessive Paraphrase Trap',
      explanation: 'Attempting to paraphrase specialized machinery names creates laughable, non-standard descriptions.'
    }
  },
  {
    id: 'L70-W10-D2-Q07',
    prompt: 'Which verb accurately describes the action of heating a liquid to eliminate pathogens in a food production process?',
    lesson: 'WEEK 10 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'pasteurized or sterilized' },
      { id: 'B', text: 'burned or roasted' },
      { id: 'C', text: 'fried or baked' },
      { id: 'D', text: 'toasted or melted' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'pasteurized or sterilized',
    correctExplanation: '"Pasteurized" and "sterilized" are the precise scientific verbs for treating liquids with controlled heat to destroy harmful microbes.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. burned or roasted',
      diagnosticTitle: 'Cooking Term Distortion',
      explanation: '"Burned" or "roasted" indicates cooking solid food at high temperatures, which would ruin liquid milk or juice.'
    }
  },
  {
    id: 'L70-W10-D2-Q08',
    prompt: 'How should a candidate partition the body paragraphs of an 8-stage manufacturing process?',
    lesson: 'WEEK 10 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Divide logically at the primary transformation milestone: Body 1 covers stages 1-4 for raw material processing; Body 2 covers stages 5-8 for refinement, packaging, and shipping' },
      { id: 'B', text: 'Write one paragraph for each individual stage, producing an eight-paragraph report' },
      { id: 'C', text: 'Combine all eight stages into a single run-on sentence without punctuation' },
      { id: 'D', text: 'Describe only stages 1 and 8 and ignore stages 2 through 7' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Divide logically at the primary transformation milestone: Body 1 covers stages 1-4 for raw material processing; Body 2 covers stages 5-8 for refinement, packaging, and shipping',
    correctExplanation: 'Splitting an 8-stage process into two balanced paragraphs at a logical milestone (e.g., raw preparation vs chemical/mechanical refinement) creates clear paragraph coherence.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Write one paragraph for each individual stage, producing an eight-paragraph report',
      diagnosticTitle: 'Micro-Paragraphing Trap',
      explanation: 'Writing eight single-sentence paragraphs fragments the report and lowers Coherence and Cohesion.'
    }
  },
  {
    id: 'L70-W10-D2-Q09',
    prompt: 'Which phrase links two continuous stages where one product directly becomes the raw material for the next stage?',
    lesson: 'WEEK 10 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The resulting pulp subsequently serves as the raw input for the second stage of crushing' },
      { id: 'B', text: 'The stuff made before now goes to be crushed again' },
      { id: 'C', text: 'First thing finished so second thing can start right now' },
      { id: 'D', text: 'Then next the machine takes the material inside its mouth' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The resulting pulp subsequently serves as the raw input for the second stage of crushing',
    correctExplanation: '"The resulting pulp subsequently serves as the raw input for..." articulates material continuity with academic elegance.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Then next the machine takes the material inside its mouth',
      diagnosticTitle: 'Childish Personification',
      explanation: 'Machines do not have "mouths"; formal English describes material being "fed into a hopper" or "directed into a chamber".'
    }
  },
  {
    id: 'L70-W10-D2-Q10',
    prompt: 'In a natural lifecycle (e.g. the life cycle of a frog), why is the passive voice generally inappropriate for biological maturation?',
    lesson: 'WEEK 10 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Biological metamorphosis is an autonomous natural process; saying "the tadpole is grown into a frog" falsely implies an external human agent physically altered the creature' },
      { id: 'B', text: 'Frogs are legally protected under wildlife conservation treaties' },
      { id: 'C', text: 'Passive voice can only be used with machines made of steel' },
      { id: 'D', text: 'Examiners forbid passive verbs when discussing amphibians' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Biological metamorphosis is an autonomous natural process; saying "the tadpole is grown into a frog" falsely implies an external human agent physically altered the creature',
    correctExplanation: 'Natural growth occurs spontaneously. Using passive voice ("is grown", "is hatched by humans") misrepresents natural development as artificial human manufacturing.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Passive voice can only be used with machines made of steel',
      diagnosticTitle: 'Arbitrary Material Myth',
      explanation: 'Passive voice depends on whether an agent performs the action on a patient, not on the physical material involved.'
    }
  },

  // ==========================================
  // WEEK 10 – DAY 3: FINAL EXAM MASTERCLASS: FULL SIMULATION & 5 HARD QA GATES VERIFICATION
  // ==========================================
  {
    id: 'L70-W10-D3-Q01',
    prompt: 'In the official IELTS Academic Writing test (60 minutes total for Task 1 and Task 2), what is the gold-standard time allocation rule?',
    lesson: 'WEEK 10 – DAY 3',
    part: 'REVISION & EXAM SIMULATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Dedicate exactly 20 minutes to Task 1 (150+ words) and 40 minutes to Task 2 (250+ words), prioritizing Task 2 because it carries double the weight of Task 1' },
      { id: 'B', text: 'Spend 50 minutes on Task 1 and 10 minutes on Task 2' },
      { id: 'C', text: 'Divide the time equally: 30 minutes for each task' },
      { id: 'D', text: 'Write Task 2 only and leave Task 1 completely blank' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Dedicate exactly 20 minutes to Task 1 (150+ words) and 40 minutes to Task 2 (250+ words), prioritizing Task 2 because it carries double the weight of Task 1',
    correctExplanation: 'Task 2 accounts for 66.7% (two-thirds) of the writing score. Spending more than 20 minutes on Task 1 robs Task 2 of essential development time, almost guaranteeing a lower overall score.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Divide the time equally: 30 minutes for each task',
      diagnosticTitle: 'Equal Weight Fallacy',
      explanation: 'The tasks are not weighted equally. Giving 30 minutes to Task 1 leaves only 30 minutes for Task 2, which requires substantially more depth and word count.'
    }
  },
  {
    id: 'L70-W10-D3-Q02',
    prompt: 'What are the "Five Hard QA Gates" verified before a candidate is declared Band 7.0+ ready in the LEADER curriculum?',
    lesson: 'WEEK 10 – DAY 3',
    part: 'REVISION & EXAM SIMULATION',
    difficulty: 'expert',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Gate 1: Clear position throughout; Gate 2: Well-supported ideas without overgeneralization; Gate 3: Structural Cohesion & no mechanical linking; Gate 4: Precise C1 academic collocations; Gate 5: Strict grammatical accuracy under 60-min timed pressure' },
      { id: 'B', text: 'Gate 1: Memorizing 100 quotes; Gate 2: Writing with black ink only; Gate 3: Filling every blank line; Gate 4: Writing cursive letters; Gate 5: Smiling at the examiner' },
      { id: 'C', text: 'Gate 1: Using five exclamation marks; Gate 2: Using ten idioms; Gate 3: Writing 500 words; Gate 4: Mentioning Oxford University; Gate 5: Drawing diagrams' },
      { id: 'D', text: 'Gate 1: British accent; Gate 2: American spelling; Gate 3: Canadian vocabulary; Gate 4: Australian slang; Gate 5: Irish idioms' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Gate 1: Clear position throughout; Gate 2: Well-supported ideas without overgeneralization; Gate 3: Structural Cohesion & no mechanical linking; Gate 4: Precise C1 academic collocations; Gate 5: Strict grammatical accuracy under 60-min timed pressure',
    correctExplanation: 'The 5 QA Gates correspond directly to the official Band 7.0+ descriptors across Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Gate 1: Using five exclamation marks; Gate 2: Using ten idioms; Gate 3: Writing 500 words; Gate 4: Mentioning Oxford University; Gate 5: Drawing diagrams',
      diagnosticTitle: 'Superficial Checklist Gimmick',
      explanation: 'Exclamation marks and word count padding are penalized; high band scores require academic rigor and logical argument structure.'
    }
  },
  {
    id: 'L70-W10-D3-Q03',
    prompt: 'In Speaking Part 2, what should a candidate do if the examiner lets them continue speaking past the 2-minute mark?',
    lesson: 'WEEK 10 – DAY 3',
    part: 'REVISION & EXAM SIMULATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Keep speaking smoothly and developing your final reflective thoughts until the examiner politely interrupts you with "Thank you"' },
      { id: 'B', text: 'Panic and yell "Time is up! Stop your timer!" at the examiner' },
      { id: 'C', text: 'Immediately stop talking mid-sentence and freeze in silence' },
      { id: 'D', text: 'Start singing the national anthem to fill remaining seconds' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Keep speaking smoothly and developing your final reflective thoughts until the examiner politely interrupts you with "Thank you"',
    correctExplanation: 'Examiners are required to let candidates speak for up to 2 minutes and will say "Thank you" when time expires. Candidates should never stop themselves abruptly before being signaled.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Immediately stop talking mid-sentence and freeze in silence',
      diagnosticTitle: 'Premature Self-Termination',
      explanation: 'Cutting yourself off mid-sentence signals conversational anxiety; continuing fluently until interrupted maximizes your Fluency rating.'
    }
  },
  {
    id: 'L70-W10-D3-Q04',
    prompt: 'Which strategy ensures a candidate maintains a consistent thesis position throughout Writing Task 2 under intense exam pressure?',
    lesson: 'WEEK 10 – DAY 3',
    part: 'REVISION & EXAM SIMULATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Drafting an explicit thesis in the introduction and using topic sentences in both body paragraphs that directly echo and develop that specific thesis' },
      { id: 'B', text: 'Waiting until the final sentence of the conclusion to decide which side you support' },
      { id: 'C', text: 'Praising both sides equally without expressing any personal stance anywhere in the essay' },
      { id: 'D', text: 'Writing two separate essays on two sheets of paper' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Drafting an explicit thesis in the introduction and using topic sentences in both body paragraphs that directly echo and develop that specific thesis',
    correctExplanation: 'A clear position presented throughout the response is the explicit threshold requirement for Band 7 in Task Achievement.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Waiting until the final sentence of the conclusion to decide which side you support',
      diagnosticTitle: 'Delayed Stance Pitfall',
      explanation: 'Revealing your opinion only in the conclusion fails the criterion of presenting a clear position throughout the response.'
    }
  },
  {
    id: 'L70-W10-D3-Q05',
    prompt: 'During the 5-minute proofreading stage of Task 2, which high-frequency error should candidates actively hunt for first?',
    lesson: 'WEEK 10 – DAY 3',
    part: 'REVISION & EXAM SIMULATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Subject-verb agreement discrepancies (e.g. "this trend lead to") and missing plural markers on countable nouns' },
      { id: 'B', text: 'Whether the font size is too small' },
      { id: 'C', text: 'Checking if any sentences could be translated into French' },
      { id: 'D', text: 'Counting if the letter "e" appears more than 100 times' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Subject-verb agreement discrepancies (e.g. "this trend lead to") and missing plural markers on countable nouns',
    correctExplanation: 'Subject-verb agreement and bare singular countables are the most common mechanical slips that drag an otherwise strong Band 7 essay down to Band 6 in Grammatical Accuracy.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Whether the font size is too small',
      diagnosticTitle: 'Typographical Irrelevance',
      explanation: 'Handwritten test scripts are assessed on linguistic accuracy and legibility, not typography.'
    }
  },
  {
    id: 'L70-W10-D3-Q06',
    prompt: 'In Speaking Part 3, how should a candidate react if the examiner challenges their opinion with a strong counter-question?',
    lesson: 'WEEK 10 – DAY 3',
    part: 'REVISION & EXAM SIMULATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Embrace the counter-perspective analytically: "That is a valid counter-argument; nonetheless, when we examine the empirical evidence..."' },
      { id: 'B', text: 'Get offended and tell the examiner they are being disrespectful' },
      { id: 'C', text: 'Immediately abandon your entire argument and agree with everything the examiner said' },
      { id: 'D', text: 'Cover your ears and refuse to listen' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Embrace the counter-perspective analytically: "That is a valid counter-argument; nonetheless, when we examine the empirical evidence..."',
    correctExplanation: 'Part 3 is an interactive intellectual discussion; examiner push-back is an invitation to demonstrate concession, hedging, and high-level debate skills.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Immediately abandon your entire argument and agree with everything the examiner said',
      diagnosticTitle: 'Instant Capitulation',
      explanation: 'Collapsing your argument immediately suggests weak reasoning; intellectual balance means engaging with the counter-point while maintaining your thesis.'
    }
  },
  {
    id: 'L70-W10-D3-Q07',
    prompt: 'What is the consequence of failing to write at least 150 words in Task 1 or 250 words in Task 2?',
    lesson: 'WEEK 10 – DAY 3',
    part: 'REVISION & EXAM SIMULATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Underlength penalties are directly applied to Task Achievement, typically capping the criterion at Band 5.0 or lower' },
      { id: 'B', text: 'The candidate is fined money by the British Council' },
      { id: 'C', text: 'The test paper is burned in front of the candidate' },
      { id: 'D', text: 'No penalty exists because quality is more important than quantity' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Underlength penalties are directly applied to Task Achievement, typically capping the criterion at Band 5.0 or lower',
    correctExplanation: 'Writing under 250 words in Task 2 or under 150 words in Task 1 restricts the candidate\'s ability to fully develop arguments, penalizing Task Achievement heavily.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. No penalty exists because quality is more important than quantity',
      diagnosticTitle: 'Underlength Immunity Myth',
      explanation: 'While raw word counting penalties have been integrated into Task Achievement, an underlength essay cannot sufficiently answer the prompt, capping the score.'
    }
  },
  {
    id: 'L70-W10-D3-Q08',
    prompt: 'Which strategy best prevents candidate fatigue during the intensive 3-hour IELTS test session?',
    lesson: 'WEEK 10 – DAY 3',
    part: 'REVISION & EXAM SIMULATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Practicing full-length timed mock simulations under identical test conditions to build intellectual endurance and pacing habits' },
      { id: 'B', text: 'Drinking four energy drinks right before entering the exam room' },
      { id: 'C', text: 'Staying awake all night before the test to memorize essays' },
      { id: 'D', text: 'Sleeping during the listening section to save energy for writing' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Practicing full-length timed mock simulations under identical test conditions to build intellectual endurance and pacing habits',
    correctExplanation: 'Endurance is built through realistic timed simulations. Repeated practice conditions the mind to maintain focus across the full testing sequence.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Drinking four energy drinks right before entering the exam room',
      diagnosticTitle: 'Chemical Stimulant Crash Trap',
      explanation: 'Excessive caffeine induces jitteriness, elevates anxiety, and causes an energy crash mid-test.'
    }
  },
  {
    id: 'L70-W10-D3-Q09',
    prompt: 'What distinguishes an authentic Band 7.5 Task 2 essay from an over-rehearsed Band 6.0 "Template Essay"?',
    lesson: 'WEEK 10 – DAY 3',
    part: 'REVISION & EXAM SIMULATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The Band 7.5 essay engages directly and deeply with the specific nuances of the prompt using natural collocations, whereas the template essay pastes generic formulaic sentences that loosely skirt the topic' },
      { id: 'B', text: 'The Band 7.5 essay uses at least fifty French loan words' },
      { id: 'C', text: 'The template essay is always written in green pen' },
      { id: 'D', text: 'Examiners cannot distinguish between authentic writing and memorized templates' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The Band 7.5 essay engages directly and deeply with the specific nuances of the prompt using natural collocations, whereas the template essay pastes generic formulaic sentences that loosely skirt the topic',
    correctExplanation: 'Trained examiners immediately detect generic boilerplate ("In this modern era of globalization..."). High-band writing responds organically to the prompt\'s specific parameters.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Examiners cannot distinguish between authentic writing and memorized templates',
      diagnosticTitle: 'Examiner Naivety Myth',
      explanation: 'Examiners read thousands of essays and are specifically trained to identify memorized templates, discounting them under Task Achievement and Lexical Resource.'
    }
  },
  {
    id: 'L70-W10-D3-Q10',
    prompt: 'As a graduating LEADER candidate aiming for Band 7.0-7.5, what is your mindset when walking into the IELTS test room?',
    lesson: 'WEEK 10 – DAY 3',
    part: 'REVISION & EXAM SIMULATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Disciplined academic execution: Apply the 5-30-5 pacing protocol, maintain consistent thesis architecture, deploy precise C1 collocations, and proofread relentlessly' },
      { id: 'B', text: 'Hope for pure luck and pray that the examiner is having a good day' },
      { id: 'C', text: 'Try to remember every single sentence from the coursebook word for word' },
      { id: 'D', text: 'Rush through all tasks as quickly as possible to leave early' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Disciplined academic execution: Apply the 5-30-5 pacing protocol, maintain consistent thesis architecture, deploy precise C1 collocations, and proofread relentlessly',
    correctExplanation: 'Success at Band 7.0+ is a result of methodical academic discipline: structured planning, consistent argumentation, precise vocabulary, and error elimination.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Hope for pure luck and pray that the examiner is having a good day',
      diagnosticTitle: 'Fatalistic Passive Mindset',
      explanation: 'IELTS is a standardized proficiency test evaluated against rigorous criteria; success depends on acquired competence and systematic technique, not luck.'
    }
  }
];
