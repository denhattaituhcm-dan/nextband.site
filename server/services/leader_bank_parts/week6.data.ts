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

export const LEADER_WEEK_6_QUESTIONS: LeaderQuestionPart[] = [
  // ==========================================
  // WEEK 6 – DAY 1: FULL ESSAY TIMED MASTERCLASS: STRICT ENVIRONMENTAL REGULATIONS VS ECONOMY
  // ==========================================
  {
    id: 'L70-W06-D1-Q01',
    prompt: 'In the "5-30-5 Pacing Strategy" for IELTS Writing Task 2, how should the first 5 minutes be strategically allocated?',
    lesson: 'WEEK 6 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Analyzing the prompt parameters, committing to a clear thesis stance, and mapping out a two-point core outline with supporting links' },
      { id: 'B', text: 'Writing the full introduction and half of the first body paragraph as fast as possible' },
      { id: 'C', text: 'Memorizing the entire scoring rubric to mentally prepare for the examiner' },
      { id: 'D', text: 'Counting the lines on the answer sheet to establish physical paragraph margins' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Analyzing the prompt parameters, committing to a clear thesis stance, and mapping out a two-point core outline with supporting links',
    correctExplanation: 'The first 5 minutes must be dedicated to deconstructing the prompt, establishing an unambiguous thesis, and drafting a logical outline to avoid getting stranded mid-essay.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Writing the full introduction and half of the first body paragraph as fast as possible',
      diagnosticTitle: 'Premature Writing Panic',
      explanation: 'Beginning to write without an outline leads to disjointed progression, idea repetition, and contradictions, severely harming Task Achievement and Cohesion.'
    }
  },
  {
    id: 'L70-W06-D1-Q02',
    prompt: 'On the topic "Strict environmental regulations hinder economic competitiveness", which thesis statement maintains an authoritative Band 7.5+ qualified perspective?',
    lesson: 'WEEK 6 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'While stringent ecological mandates may impose short-term operational costs, they ultimately drive green technological innovation and safeguard long-term economic resilience' },
      { id: 'B', text: 'I completely agree that trees are more important than factories because money is dirty' },
      { id: 'C', text: 'Some people say yes and other people say no, but I will talk about both in this essay' },
      { id: 'D', text: 'Regulations are 100% harmful and governments should abolish all green laws tomorrow' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'While stringent ecological mandates may impose short-term operational costs, they ultimately drive green technological innovation and safeguard long-term economic resilience',
    correctExplanation: 'This qualified thesis acknowledges short-term compliance costs (concession) while firmly asserting long-term technological and economic benefits, demonstrating mature academic depth.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Some people say yes and other people say no, but I will talk about both in this essay',
      diagnosticTitle: 'Empty Delayed Stance',
      explanation: 'Announcing a balanced discussion without stating your clear position in the introduction fails to present a clear position throughout the response, capping Task Achievement at Band 6.'
    }
  },
  {
    id: 'L70-W06-D1-Q03',
    prompt: 'In the final 5 minutes of the 5-30-5 protocol, what should a candidate explicitly avoid doing?',
    lesson: 'WEEK 6 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Drafting an entirely new argument or erasing a complete body paragraph in a panic' },
      { id: 'B', text: 'Scanning for subject-verb agreement discrepancies' },
      { id: 'C', text: 'Verifying that singular and plural noun endings are accurate' },
      { id: 'D', text: 'Checking for missing articles before singular countable nouns' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Drafting an entirely new argument or erasing a complete body paragraph in a panic',
    correctExplanation: 'Introducing new arguments or erasing sections in the final minutes results in truncated, unfinished essays. The final 5 minutes must be reserved exclusively for micro-editing and proofreading.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Scanning for subject-verb agreement discrepancies',
      diagnosticTitle: 'Misidentifying Healthy Proofreading',
      explanation: 'Proofreading for agreement, articles, and spelling is precisely what the final 5 minutes are designed for.'
    }
  },
  {
    id: 'L70-W06-D1-Q04',
    prompt: 'Which sentence best exemplifies an academic counter-argument refutation regarding environmental protection costs?',
    lesson: 'WEEK 6 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Although critics contend that emissions caps suppress corporate profitability, empirical evidence indicates that green subsidies foster market leadership in sustainable technologies' },
      { id: 'B', text: 'Opponents say it is too expensive, but they are totally wrong because clean air is priceless' },
      { id: 'C', text: 'Maybe businesses spend money on filters, but that is their own problem for polluting nature' },
      { id: 'D', text: 'Environmental rules cost money, however nobody cares about corporate profits anyway' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Although critics contend that emissions caps suppress corporate profitability, empirical evidence indicates that green subsidies foster market leadership in sustainable technologies',
    correctExplanation: 'This sentence articulates the counter-claim objectively ("critics contend that emissions caps suppress corporate profitability") and counters it with analytical evidence ("empirical evidence indicates... market leadership").',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Opponents say it is too expensive, but they are totally wrong because clean air is priceless',
      diagnosticTitle: 'Emotional Dismissal',
      explanation: 'Dismissing economic arguments with emotional, non-academic phrases like "they are totally wrong" undermines the objective tone expected in Band 7.5+ essays.'
    }
  },
  {
    id: 'L70-W06-D1-Q05',
    prompt: 'What constitutes "Thesis Drift" across an IELTS Writing Task 2 essay?',
    lesson: 'WEEK 6 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Stating one stance in the introduction but gradually shifting to an opposing or ambiguous stance in the body paragraphs or conclusion' },
      { id: 'B', text: 'Using synonyms to restate the main argument in the conclusion' },
      { id: 'C', text: 'Writing an introduction that exceeds forty words in length' },
      { id: 'D', text: 'Including a concession before presenting your primary viewpoint' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Stating one stance in the introduction but gradually shifting to an opposing or ambiguous stance in the body paragraphs or conclusion',
    correctExplanation: 'Thesis drift occurs when a writer promises to defend Side A in the introduction, devotes the majority of the body to praising Side B, and delivers an inconclusive ending, dropping Task Achievement to Band 6.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Including a concession before presenting your primary viewpoint',
      diagnosticTitle: 'Concession Misunderstanding',
      explanation: 'Concession is an advanced argumentative device that strengthens an essay, provided the primary stance remains steady throughout.'
    }
  },
  {
    id: 'L70-W06-D1-Q06',
    prompt: 'Which vocabulary cluster demonstrates the most sophisticated lexical precision for an essay on industrial pollution?',
    lesson: 'WEEK 6 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Effluent discharge, carbon offsets, ecological footprint, statutory compliance, circular economy' },
      { id: 'B', text: 'Dirty rivers, bad smoke, green lifestyle, government police, recycle things' },
      { id: 'C', text: 'Factory poisons, toxic junk, clean environment, big money penalties, saving animals' },
      { id: 'D', text: 'Nature hurt, air troubles, cleaning programs, eco rules, city waste' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Effluent discharge, carbon offsets, ecological footprint, statutory compliance, circular economy',
    correctExplanation: 'These terms reflect specialized academic environmental economics vocabulary (Band 7.5 to 8.5), elevating the precision of the analysis.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Factory poisons, toxic junk, clean environment, big money penalties, saving animals',
      diagnosticTitle: 'Informal Sensationalist Vocabulary',
      explanation: 'Sensationalist terms like "factory poisons" and "toxic junk" lack formal academic register.'
    }
  },
  {
    id: 'L70-W06-D1-Q07',
    prompt: 'How many body paragraphs should ideally be written for a standard 40-minute IELTS Task 2 essay to ensure depth without risking time overrun?',
    lesson: 'WEEK 6 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Exactly two well-developed body paragraphs of 90-110 words each' },
      { id: 'B', text: 'Five short body paragraphs containing one single idea each' },
      { id: 'C', text: 'A single unbroken block paragraph of 250 words' },
      { id: 'D', text: 'Eight bulleted lists of relevant points' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Exactly two well-developed body paragraphs of 90-110 words each',
    correctExplanation: 'Two substantive body paragraphs permit deep, three-step logical chains (Claim -> Explanation -> Concrete Evidence/Result) within the 30-minute writing window.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Five short body paragraphs containing one single idea each',
      diagnosticTitle: 'Fragmentation Fallacy',
      explanation: 'Writing five tiny paragraphs produces superficial, underdeveloped arguments that fail the Band 7 "fully extended and well-supported ideas" criterion.'
    }
  },
  {
    id: 'L70-W06-D1-Q08',
    prompt: 'In evaluating economic trade-offs, which phrase correctly expresses a causal consequence using advanced syntax?',
    lesson: 'WEEK 6 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Enforcing strict carbon taxation compels corporations to optimize energy efficiency, thereby curtailing aggregate greenhouse gas emissions' },
      { id: 'B', text: 'Strict carbon taxation is enforced, because of this corporations optimize energy efficiency and aggregate greenhouse gas emissions fall' },
      { id: 'C', text: 'When carbon tax is very high, companies save power so that bad gases are not going into the sky' },
      { id: 'D', text: 'Carbon taxation forces companies to spend less electricity, which means air is much cleaner' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Enforcing strict carbon taxation compels corporations to optimize energy efficiency, thereby curtailing aggregate greenhouse gas emissions',
    correctExplanation: 'The structure uses a gerund subject ("Enforcing strict carbon taxation"), a strong transitive verb ("compels"), and an adverbial participial result clause ("thereby curtailing..."), reflecting Band 8.0 grammar.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Strict carbon taxation is enforced, because of this corporations optimize energy efficiency and aggregate greenhouse gas emissions fall',
      diagnosticTitle: 'Run-on Comma Splice with Weak Linker',
      explanation: 'Using "because of this" to join independent clauses creates a comma splice and informal coordination.'
    }
  },
  {
    id: 'L70-W06-D1-Q09',
    prompt: 'What is the target word count range for an IELTS Writing Task 2 essay to ensure thorough development without elevating error probability?',
    lesson: 'WEEK 6 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: '260 to 290 words' },
      { id: 'B', text: '150 to 180 words' },
      { id: 'C', text: '450 to 600 words' },
      { id: 'D', text: 'Exactly 250 words, not one word more or less' }
    ],
    correctOptionId: 'A',
    correctAnswerText: '260 to 290 words',
    correctExplanation: 'Writing 260-290 words comfortably surpasses the 250-word minimum, permits rigorous explanation, and leaves 5 minutes for proofreading without inviting careless mistakes.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. 450 to 600 words',
      diagnosticTitle: 'Length Equated with Band Score',
      explanation: 'Overwriting beyond 350 words invariably leads to time fatigue, superficial repetition, and increased grammatical errors under timed conditions.'
    }
  },
  {
    id: 'L70-W06-D1-Q10',
    prompt: 'How does checking "Singular vs Plural Noun Countability" during the Three-Button audit directly protect a candidate\'s Grammatical Accuracy rating?',
    lesson: 'WEEK 6 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'It catches pervasive errors like "researches", "informations", and bare singular countable nouns like "student must study" that plague non-native writing' },
      { id: 'B', text: 'It converts every common noun into a proper noun with capital letters' },
      { id: 'C', text: 'It ensures that all nouns are transformed into pronouns' },
      { id: 'D', text: 'It checks whether words are written in calligraphy' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'It catches pervasive errors like "researches", "informations", and bare singular countable nouns like "student must study" that plague non-native writing',
    correctExplanation: 'Uncountable nouns with plural -s and bare singular countables ("government must", "child needs") are the most frequent slips in Vietnamese test-taker scripts.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. It converts every common noun into a proper noun with capital letters',
      diagnosticTitle: 'Nonsensical Grammar Rule',
      explanation: 'Capitalizing common nouns is a punctuation error; countability checks ensure correct determiners and number morphology.'
    }
  },

  // ==========================================
  // WEEK 6 – DAY 2: INTRODUCTION + OVERVIEW TASK 1 ARCHITECTURE & 5-MIN TASK 2 FLASH-DRILL
  // ==========================================
  {
    id: 'L70-W06-D2-Q01',
    prompt: 'What is the core pedagogical objective of the "5-Minute Task 2 Flash-Drill" conducted at the start of Task 1 lessons in Week 6?',
    lesson: 'WEEK 6 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'To maintain rapid macro-planning reflexes and prevent Task 2 thesis formulation skills from degrading during intensive Task 1 study' },
      { id: 'B', text: 'To write an entire 250-word Task 2 essay in under five minutes' },
      { id: 'C', text: 'To test whether candidates can recite the dictionary from memory' },
      { id: 'D', text: 'To substitute Task 2 homework assignments entirely' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'To maintain rapid macro-planning reflexes and prevent Task 2 thesis formulation skills from degrading during intensive Task 1 study',
    correctExplanation: 'The 5-minute Flash-Drill requires students to produce 3 prompt lines (Thesis + 2 Core Arguments) in 5 minutes, keeping argumentative thinking active throughout the 9-day Task 1 sprint.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. To write an entire 250-word Task 2 essay in under five minutes',
      diagnosticTitle: 'Unrealistic Word Sprint',
      explanation: 'Writing 250 words in 5 minutes is physiologically impossible; the drill trains rapid conceptual structuring, not physical speed-writing.'
    }
  },
  {
    id: 'L70-W06-D2-Q02',
    prompt: 'What four components must be paraphrased to construct a bulletproof Band 7.0+ Task 1 Introduction sentence?',
    lesson: 'WEEK 6 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Visual Type such as the line graph, Reporting Verb such as illustrates, Subject Parameter such as carbon emissions, and Timeframe Geography such as the UK between 2000 and 2020' },
      { id: 'B', text: 'Personal opinion, historical background, future predictions, and mathematical formulas' },
      { id: 'C', text: 'Examiner name, exam center code, candidate number, and current date' },
      { id: 'D', text: 'Detailed numbers from every single year shown on the horizontal axis' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Visual Type such as the line graph, Reporting Verb such as illustrates, Subject Parameter such as carbon emissions, and Timeframe Geography such as the UK between 2000 and 2020',
    correctExplanation: 'A complete Task 1 Introduction rephrases: [1] Diagram type, [2] Action verb, [3] Measured variables, and [4] Scope / timeframe, achieving precision in a single sentence.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Detailed numbers from every single year shown on the horizontal axis',
      diagnosticTitle: 'Premature Data Dumping',
      explanation: 'Putting specific raw numbers in the introduction ruins structural progression and violates Task 1 conventions.'
    }
  },
  {
    id: 'L70-W06-D2-Q03',
    prompt: 'What constitutes the "Overview Rule" in IELTS Writing Task 1 according to official Band 7 Descriptors?',
    lesson: 'WEEK 6 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The overview must present clear overarching trends and major differences, strictly WITHOUT citing specific raw data figures or percentages' },
      { id: 'B', text: 'The overview must list all raw data points in chronological order with exact decimal precision' },
      { id: 'C', text: 'The overview should explain the sociological reasons why people generated those numbers' },
      { id: 'D', text: 'The overview must be placed at the very end of the essay as a one-sentence personal opinion' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The overview must present clear overarching trends and major differences, strictly WITHOUT citing specific raw data figures or percentages',
    correctExplanation: 'An Overview summarizes broad patterns (general trajectories and extremes) without data points. Including raw figures degrades the overview into a body paragraph, capping Task Achievement at Band 6.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. The overview must list all raw data points in chronological order with exact decimal precision',
      diagnosticTitle: 'Data Contamination in Overview',
      explanation: 'Citing specific numbers in the overview is an error; numbers belong exclusively in the detailed body paragraphs.'
    }
  },
  {
    id: 'L70-W06-D2-Q04',
    prompt: 'Examine this Task 1 Overview sentence: "Overall, while automobile reliance surged over the two decades, cycling experienced a steady decline; additionally, private cars remained the predominant transport mode throughout." Why is this an exemplary Band 7.5 Overview?',
    lesson: 'WEEK 6 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'It encapsulates both the macro-directional trajectory and the dominant category without mentioning a single raw statistic' },
      { id: 'B', text: 'It explains that cars are bad for the environment because of greenhouse emissions' },
      { id: 'C', text: 'It quotes the exact starting and ending percentages for both vehicles' },
      { id: 'D', text: 'It proves that cycling will be completely abandoned by the year 2050' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'It encapsulates both the macro-directional trajectory and the dominant category without mentioning a single raw statistic',
    correctExplanation: 'An ideal 2-part overview covers: [1] The macro trend/direction of change, and [2] The highest/lowest dominant standout, completely free of raw data.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. It explains that cars are bad for the environment because of greenhouse emissions',
      diagnosticTitle: 'External Speculation Trap',
      explanation: 'Task 1 requires reporting only the facts presented in the graphic; adding external opinions or explanations is penalized.'
    }
  },
  {
    id: 'L70-W06-D2-Q05',
    prompt: 'Which reporting verb best substitutes for "shows" when paraphrasing a complex multi-line graph?',
    lesson: 'WEEK 6 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'illustrates, depicts, or delineates' },
      { id: 'B', text: 'proves, convinces, or demands' },
      { id: 'C', text: 'imagines, guesses, or suspects' },
      { id: 'D', text: 'believes, feels, or desires' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'illustrates, depicts, or delineates',
    correctExplanation: 'Verbs like "illustrates", "depicts", and "delineates" are formal, objective reporting verbs suited for academic data presentation.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. proves, convinces, or demands',
      diagnosticTitle: 'Argumentative Verb Error',
      explanation: 'Graphs illustrate data; they do not "prove" or "convince" in an argumentative sense. Using argumentative verbs reflects poor task understanding.'
    }
  },
  {
    id: 'L70-W06-D2-Q06',
    prompt: 'How should the phrase "the number of people who visited museums" be paraphrased using nominalization?',
    lesson: 'WEEK 6 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'museum attendance figures or museum patronage' },
      { id: 'B', text: 'how many humans stepped into museums' },
      { id: 'C', text: 'the amount of persons walking to museum halls' },
      { id: 'D', text: 'museum goer individuals count' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'museum attendance figures or museum patronage',
    correctExplanation: '"Museum attendance figures" and "museum patronage" replace the relative clause with concise, high-level nominalized collocations.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. the amount of persons walking to museum halls',
      diagnosticTitle: 'Amount with Countable Noun Error',
      explanation: '"Amount" cannot be used with countable persons; additionally, "walking to museum halls" is colloquial and imprecise.'
    }
  },
  {
    id: 'L70-W06-D2-Q07',
    prompt: 'Where is the optimal placement for the Overview paragraph in IELTS Writing Task 1?',
    lesson: 'WEEK 6 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Immediately following the introduction paragraph, creating a logical "Top-Down" hierarchy from macro-summary to micro-details' },
      { id: 'B', text: 'Scattered randomly as single bullet points across the body paragraphs' },
      { id: 'C', text: 'Inside the introduction sentence using three sets of brackets' },
      { id: 'D', text: 'On a separate piece of draft paper that is not submitted' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Immediately following the introduction paragraph, creating a logical "Top-Down" hierarchy from macro-summary to micro-details',
    correctExplanation: 'Placing the Overview directly after the Introduction ensures the examiner immediately spots the required macro-summary and guarantees a coherent top-down structure.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Inside the introduction sentence using three sets of brackets',
      diagnosticTitle: 'Paragraph Merging Confusion',
      explanation: 'The Overview should stand as a distinct paragraph to make the macro-overview visually and structurally prominent.'
    }
  },
  {
    id: 'L70-W06-D2-Q08',
    prompt: 'Which sentence correctly combines two contrasting overview trends in a single compound sentence?',
    lesson: 'WEEK 6 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Overall, while solar and wind energy witnessed substantial expansion, fossil fuel consumption underwent a progressive contraction over the period' },
      { id: 'B', text: 'Overall, solar energy went up a lot, but oil went down and nobody liked coal anymore' },
      { id: 'C', text: 'Overall, green power increased very fast, however fossil fuels was decreasing terribly' },
      { id: 'D', text: 'Overall, there was much energy changes happening everywhere in the entire nation' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Overall, while solar and wind energy witnessed substantial expansion, fossil fuel consumption underwent a progressive contraction over the period',
    correctExplanation: 'This sentence contrasts the two main energy groups with sophisticated nominalized phrases ("witnessed substantial expansion", "underwent a progressive contraction") and clear subordination.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Overall, solar energy went up a lot, but oil went down and nobody liked coal anymore',
      diagnosticTitle: 'Informal Speculative Cliché',
      explanation: '"Nobody liked coal anymore" is an unsourced colloquial speculation, violating academic neutrality.'
    }
  },
  {
    id: 'L70-W06-D2-Q09',
    prompt: 'What happens if a candidate writes an entire Task 1 report with accurate data in the body paragraphs, but completely omits an Overview?',
    lesson: 'WEEK 6 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Task Achievement is capped at Band 5.0, regardless of the quality of grammar and vocabulary' },
      { id: 'B', text: 'The examiner automatically awards a Band 7.0 if grammar is error-free' },
      { id: 'C', text: 'The candidate is asked to sit for a supplementary speaking interview' },
      { id: 'D', text: 'No penalty is applied because the body paragraphs contain all the details' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Task Achievement is capped at Band 5.0, regardless of the quality of grammar and vocabulary',
    correctExplanation: 'Under official public descriptors for Task 1, omitting an overview restricts Task Achievement to a maximum of Band 5.0 ("presents no overview").',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. No penalty is applied because the body paragraphs contain all the details',
      diagnosticTitle: 'Data Completeness Myth',
      explanation: 'A candidate can report every single number accurately, but without synthesizing them into an overview, the core descriptive requirement is unfulfilled.'
    }
  },
  {
    id: 'L70-W06-D2-Q10',
    prompt: 'Choose the most precise paraphrase of: "The chart shows how much meat was consumed in four countries between 1990 and 2010."',
    lesson: 'WEEK 6 – DAY 2',
    part: 'WRITING TASK 1',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The bar chart delineates the per capita consumption of various types of meat across four separate nations over a 20-year span from 1990 to 2010' },
      { id: 'B', text: 'The picture explains how many animals people ate in four lands during twenty years' },
      { id: 'C', text: 'The chart gives numbers of butcher shop meat sold to buyers in four places' },
      { id: 'D', text: 'The visual diagram shows meat eating habits of people living in four areas' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The bar chart delineates the per capita consumption of various types of meat across four separate nations over a 20-year span from 1990 to 2010',
    correctExplanation: '"Per capita consumption", "four separate nations", and "over a 20-year span from 1990 to 2010" represent standard C1 Task 1 reporting formulas.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. The picture explains how many animals people ate in four lands during twenty years',
      diagnosticTitle: 'Childish Register Substitution',
      explanation: '"How many animals people ate" is colloquial and inaccurate; data measures meat by mass (kilograms/grams), not whole animal counts.'
    }
  },

  // ==========================================
  // WEEK 6 – DAY 3: BOOKS, CINEMA & CULTURAL MEDIA MONOLOGUES
  // ==========================================
  {
    id: 'L70-W06-D3-Q01',
    prompt: 'In IELTS Speaking Part 2, when responding to "Describe a book or film that made a profound impression on you", what pitfall must candidates avoid regarding plot summary?',
    lesson: 'WEEK 6 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The Plot-Spoiling Trap: Reciting minute scene-by-scene plot twists instead of focusing on thematic depth, aesthetic qualities, and personal resonance' },
      { id: 'B', text: 'Mentioning the name of the director or author in the first twenty seconds' },
      { id: 'C', text: 'Using past tenses to describe the narrative background of the story' },
      { id: 'D', text: 'Speaking for the full two minutes allocated by the examiner' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The Plot-Spoiling Trap: Reciting minute scene-by-scene plot twists instead of focusing on thematic depth, aesthetic qualities, and personal resonance',
    correctExplanation: 'Candidates often get bogged down narrating complex plot lines ("and then he went to the house, and then she called him..."), wasting time on low-level sequencing rather than evaluating themes and character development.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Mentioning the name of the director or author in the first twenty seconds',
      diagnosticTitle: 'Attribution Hesitation',
      explanation: 'Naming the director or author immediately contextualizes the monologue and is natural discourse practice.'
    }
  },
  {
    id: 'L70-W06-D3-Q02',
    prompt: 'Which lexical set provides the most sophisticated critical appraisal of a cinematic work in Speaking Part 2?',
    lesson: 'WEEK 6 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Compelling storyline, stellar acting performance, nuanced character arc, thought-provoking existential message, immersive cinematography' },
      { id: 'B', text: 'Nice film, good actors, very funny moments, loud sound effects, happy ending' },
      { id: 'C', text: 'Scary ghost scenes, huge explosions, interesting movie, great popcorn experience' },
      { id: 'D', text: 'Pretty pictures, wonderful talking by characters, cool music in the background' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Compelling storyline, stellar acting performance, nuanced character arc, thought-provoking existential message, immersive cinematography',
    correctExplanation: 'Collocations like "compelling storyline", "nuanced character arc", and "immersive cinematography" showcase Band 8.0 critical vocabulary.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Nice film, good actors, very funny moments, loud sound effects, happy ending',
      diagnosticTitle: 'Generic Elementary Lexis',
      explanation: 'Overusing generic adjectives like "nice", "good", and "funny" reflects basic language skills that limit Lexical Resource to Band 5.5.'
    }
  },
  {
    id: 'L70-W06-D3-Q03',
    prompt: 'In Speaking Part 3, how should a candidate address: "Do you think digital e-readers will lead to the total extinction of printed books?"',
    lesson: 'WEEK 6 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Acknowledge e-readers\' unparalleled portability and convenience, while highlighting the enduring tactile aesthetics, collectible value, and sensory pleasure of physical paper' },
      { id: 'B', text: 'Predict that every paper book will be burned in bonfires by 2030' },
      { id: 'C', text: 'State that you personally never read books so you cannot answer' },
      { id: 'D', text: 'Recite the price of your tablet computer in local currency' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Acknowledge e-readers\' unparalleled portability and convenience, while highlighting the enduring tactile aesthetics, collectible value, and sensory pleasure of physical paper',
    correctExplanation: 'A Band 7.5+ response explores the coexistence of media: pragmatic digital convenience alongside the unique tactile and cultural appeal of physical books.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Predict that every paper book will be burned in bonfires by 2030',
      diagnosticTitle: 'Absurdist Hyperbole',
      explanation: 'Making bizarre apocalyptic claims demonstrates immature reasoning rather than balanced academic argument.'
    }
  },
  {
    id: 'L70-W06-D3-Q04',
    prompt: 'Which phrase effectively analyzes the role of government funding in supporting cultural cinema and arts?',
    lesson: 'WEEK 6 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Public subsidies are essential to preserve indigenous storytelling that might otherwise be marginalized by Hollywood commercial blockbusters' },
      { id: 'B', text: 'Governments should give dollars to movie makers because going to cinema is fun for citizens' },
      { id: 'C', text: 'Movies cost too much money so authorities must pay for cameras and tickets' },
      { id: 'D', text: 'Commercial films are always evil and state films are always holy' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Public subsidies are essential to preserve indigenous storytelling that might otherwise be marginalized by Hollywood commercial blockbusters',
    correctExplanation: 'Terms such as "public subsidies", "indigenous storytelling", and "marginalized by commercial blockbusters" represent precise academic discourse on cultural policy.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Governments should give dollars to movie makers because going to cinema is fun for citizens',
      diagnosticTitle: 'Trivial Simplification',
      explanation: 'Reducing cultural policy to "giving dollars for fun" misses the socio-cultural significance of national heritage and media diversity.'
    }
  },
  {
    id: 'L70-W06-D3-Q05',
    prompt: 'When describing an author\'s writing style in Speaking Part 2, which phrase indicates Band 7.5+ sophistication?',
    lesson: 'WEEK 6 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The author employs evocative prose and allegorical symbolism to explore human vulnerability' },
      { id: 'B', text: 'The writer wrote the book using very long sentences with hard words' },
      { id: 'C', text: 'Her writing is super awesome and I loved reading every single chapter' },
      { id: 'D', text: 'The vocabulary inside the pages was really fancy and poetic-like' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The author employs evocative prose and allegorical symbolism to explore human vulnerability',
    correctExplanation: '"Evocative prose", "allegorical symbolism", and "explore human vulnerability" demonstrate mature literary appreciation and precision.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. The vocabulary inside the pages was really fancy and poetic-like',
      diagnosticTitle: 'Vague Colloquial Description',
      explanation: 'Using expressions like "fancy" and "poetic-like" reveals limited stylistic vocabulary.'
    }
  },
  {
    id: 'L70-W06-D3-Q06',
    prompt: 'In Speaking Part 3, what phrase should be used to introduce an analogy between literary classics and modern cinema?',
    lesson: 'WEEK 6 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Much like enduring literary classics, cinematic masterpieces serve as mirrors reflecting societal anxieties and moral dilemmas' },
      { id: 'B', text: 'Books and movies are the same thing because both have stories and people talking' },
      { id: 'C', text: 'If you read a book, it is exactly equal to sitting in front of a cinema screen' },
      { id: 'D', text: 'Classic books are just old-fashioned movies that people did not film with cameras' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Much like enduring literary classics, cinematic masterpieces serve as mirrors reflecting societal anxieties and moral dilemmas',
    correctExplanation: 'Drawing an analytical parallel ("serve as mirrors reflecting societal anxieties") illustrates abstract reasoning and fluent academic discourse.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Books and movies are the same thing because both have stories and people talking',
      diagnosticTitle: 'Crude Equivalence',
      explanation: 'Collapsing distinct artistic mediums into "the same thing" ignores artistic medium specificity and lowers communicative subtlety.'
    }
  },
  {
    id: 'L70-W06-D3-Q07',
    prompt: 'How can a candidate avoid rambling during the final 30 seconds of a Speaking Part 2 response about a book?',
    lesson: 'WEEK 6 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Pivot deliberately to the lasting impact: summarize why the literary message continues to shape your worldview or creative thinking' },
      { id: 'B', text: 'Repeat the first sentence of the monologue word for word' },
      { id: 'C', text: 'Start recounting a different movie that you saw three years ago' },
      { id: 'D', text: 'Tell the examiner you have finished and ask them how many points you got' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Pivot deliberately to the lasting impact: summarize why the literary message continues to shape your worldview or creative thinking',
    correctExplanation: 'Wrapping up with personal philosophical resonance or long-term cognitive impact provides a natural, authoritative conclusion that brings the monologue to a complete, rounded close.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Repeat the first sentence of the monologue word for word',
      diagnosticTitle: 'Rote Circularity',
      explanation: 'Repeating your opening sentence exposes an absence of concluding thoughts and signals conversational exhaustion.'
    }
  },
  {
    id: 'L70-W06-D3-Q08',
    prompt: 'Which question type in Speaking Part 3 requires a candidate to assess the future of libraries in the digital era?',
    lesson: 'WEEK 6 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'A speculative prediction question requiring future modals and evolutionary redefinition of public spaces' },
      { id: 'B', text: 'A simple past tense autobiographical inquiry' },
      { id: 'C', text: 'A multiple-choice grammar question' },
      { id: 'D', text: 'A factual dictionary definition check' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'A speculative prediction question requiring future modals and evolutionary redefinition of public spaces',
    correctExplanation: 'Speculative Part 3 questions require hypothesis formulation ("Libraries will likely morph into community digital hubs..."), demonstrating predictive tenses and conditional structures.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. A simple past tense autobiographical inquiry',
      diagnosticTitle: 'Genre Confusion',
      explanation: 'Speculating about the future of institutions requires future conditional language, not past personal narrative.'
    }
  },
  {
    id: 'L70-W06-D3-Q09',
    prompt: 'Which collocation correctly characterizes an unpredictable, thrilling storyline?',
    lesson: 'WEEK 6 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'A gripping narrative replete with unexpected twists and turns' },
      { id: 'B', text: 'A story that jumps around with crazy happenings all over' },
      { id: 'C', text: 'An unexpected movie doing weird things to surprise eyes' },
      { id: 'D', text: 'A drama holding exciting tricks inside every chapter' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'A gripping narrative replete with unexpected twists and turns',
    correctExplanation: '"Gripping narrative" and "replete with unexpected twists and turns" are native-like collocations that vividly convey dramatic suspense.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. A story that jumps around with crazy happenings all over',
      diagnosticTitle: 'Conversational Slang',
      explanation: 'Phrases like "crazy happenings all over" lack the precision and register expected at Band 7.5+.'
    }
  },
  {
    id: 'L70-W06-D3-Q10',
    prompt: 'In Speaking Part 3, what is the best strategy when the examiner asks an abstract philosophical question about the moral responsibility of artists?',
    lesson: 'WEEK 6 – DAY 3',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Anchor the response in two competing perspectives: unconditional creative autonomy versus the imperative to avoid inciting societal discord' },
      { id: 'B', text: 'Dismiss the question as irrelevant to everyday life' },
      { id: 'C', text: 'Recite a poem in your native tongue' },
      { id: 'D', text: 'Give a 2-second answer saying artists should only paint flowers' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Anchor the response in two competing perspectives: unconditional creative autonomy versus the imperative to avoid inciting societal discord',
    correctExplanation: 'Framing philosophical dilemmas around competing core values (creative freedom vs social harm) demonstrates high-level critical thinking and balanced rhetorical competence.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Dismiss the question as irrelevant to everyday life',
      diagnosticTitle: 'Question Evasion',
      explanation: 'Refusing to tackle abstract questions guarantees a low score in Fluency and Coherence because Part 3 is specifically designed to assess abstract discourse.'
    }
  }
];
