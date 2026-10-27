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

export const LEADER_WEEK_5_QUESTIONS: LeaderQuestionPart[] = [
  // ==========================================
  // WEEK 5 – DAY 1: PREPOSITIONAL COLLOCATIONS & GENERALIZED TASK 2 BLUEPRINT
  // ==========================================
  {
    id: 'L70-W05-D1-Q01',
    prompt: 'Which sentence correctly demonstrates the academic prepositional collocation for "contribute" and "impact" in IELTS Writing Task 2?',
    lesson: 'WEEK 5 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Excessive smartphone usage contributes to sedentary habits and exerts an adverse impact on adolescent sleep cycles' },
      { id: 'B', text: 'Excessive smartphone usage contributes for sedentary habits and exerts an adverse impact to adolescent sleep cycles' },
      { id: 'C', text: 'Excessive smartphone usage contributes in sedentary habits and exerts an adverse impact with adolescent sleep cycles' },
      { id: 'D', text: 'Excessive smartphone usage contributes toward sedentary habits and exerts an adverse impact at adolescent sleep cycles' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Excessive smartphone usage contributes to sedentary habits and exerts an adverse impact on adolescent sleep cycles',
    correctExplanation: 'The standard academic collocations are "contribute TO something" and "have or exert an impact ON something". Confusing these with "for" or "to" is a typical L1 transfer error.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Excessive smartphone usage contributes for sedentary habits and exerts an adverse impact to adolescent sleep cycles',
      diagnosticTitle: 'L1 Direct Translation Trap',
      explanation: 'Vietnamese speakers often translate "ảnh hưởng đến" as "impact to" and "đóng góp cho" as "contribute for", producing invalid English collocations.'
    }
  },
  {
    id: 'L70-W05-D1-Q02',
    prompt: 'Select the sentence that accurately uses prepositional collocations for "allocate" and "attribute".',
    lesson: 'WEEK 5 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Municipalities must allocate adequate budget to green initiatives, as scholars attribute urban wellness to accessible parklands' },
      { id: 'B', text: 'Municipalities must allocate adequate budget for green initiatives, as scholars attribute urban wellness from accessible parklands' },
      { id: 'C', text: 'Municipalities must allocate adequate budget into green initiatives, as scholars attribute urban wellness with accessible parklands' },
      { id: 'D', text: 'Municipalities must allocate adequate budget toward green initiatives, as scholars attribute urban wellness at accessible parklands' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Municipalities must allocate adequate budget to green initiatives, as scholars attribute urban wellness to accessible parklands',
    correctExplanation: 'Both verbs govern the preposition "to": "allocate something TO something" and "attribute X TO Y" (meaning X is caused by Y).',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Municipalities must allocate adequate budget for green initiatives, as scholars attribute urban wellness from accessible parklands',
      diagnosticTitle: 'Faulty Causal Preposition',
      explanation: '"Attribute X from Y" is ungrammatical; English requires "attribute X to Y" or "derive X from Y".'
    }
  },
  {
    id: 'L70-W05-D1-Q03',
    prompt: 'Which common error violates standard English collocation rules when writing about social issues?',
    lesson: 'WEEK 5 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Writing "This essay will discuss about the environmental consequences" instead of "discuss the environmental consequences"' },
      { id: 'B', text: 'Writing "The committee agreed upon the proposed legislation"' },
      { id: 'C', text: 'Writing "Citizens depend on public infrastructure"' },
      { id: 'D', text: 'Writing "Subsidies are invested in renewable energy"' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Writing "This essay will discuss about the environmental consequences" instead of "discuss the environmental consequences"',
    correctExplanation: '"Discuss" is a transitive verb that takes a direct object without the preposition "about". Writing "discuss about" is a chronic Band 6 grammatical error.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Writing "Citizens depend on public infrastructure"',
      diagnosticTitle: 'False Error Identification',
      explanation: '"Depend on" is entirely standard and correct; "discuss about" is the erroneous transitive verb error.'
    }
  },
  {
    id: 'L70-W05-D1-Q04',
    prompt: 'In the "Universal Task 2 Blueprint", how should a balanced 4-paragraph essay be structurally proportioned for maximum Task Achievement?',
    lesson: 'WEEK 5 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Introduction (approx 45 words), Body Paragraph 1 (approx 90-100 words), Body Paragraph 2 (approx 90-100 words), Conclusion (approx 35-40 words)' },
      { id: 'B', text: 'Introduction (120 words), Body 1 (40 words), Body 2 (40 words), Conclusion (100 words)' },
      { id: 'C', text: 'Introduction (20 words), Body 1 (250 words), no Body 2, Conclusion (10 words)' },
      { id: 'D', text: 'Seven micro-paragraphs containing two sentences each' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Introduction (approx 45 words), Body Paragraph 1 (approx 90-100 words), Body Paragraph 2 (approx 90-100 words), Conclusion (approx 35-40 words)',
    correctExplanation: 'The 4-paragraph blueprint balances concise contextualization in the introduction and conclusion with deep, well-developed core arguments in two substantial body paragraphs totalling 260-280 words.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Introduction (120 words), Body 1 (40 words), Body 2 (40 words), Conclusion (100 words)',
      diagnosticTitle: 'Inverted Priority Trap',
      explanation: 'Overloading the introduction and conclusion while leaving body arguments undeveloped results in an automatic Band 5.5 in Task Achievement.'
    }
  },
  {
    id: 'L70-W05-D1-Q05',
    prompt: 'Fill in the correct prepositions: "Vulnerable households rely heavily ___ state welfare, yet policymakers hesitate to invest ___ preventative healthcare programs."',
    lesson: 'WEEK 5 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'on, in' },
      { id: 'B', text: 'of, to' },
      { id: 'C', text: 'with, for' },
      { id: 'D', text: 'at, into' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'on, in',
    correctExplanation: 'Standard verb preposition pairings are "rely ON" and "invest IN". Any other combination deviates from standard academic usage.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. of, to',
      diagnosticTitle: 'Preposition Confusion',
      explanation: '"Rely of" does not exist in English, and "invest to" is incorrect when followed by a noun phrase.'
    }
  },
  {
    id: 'L70-W05-D1-Q06',
    prompt: 'Which topic sentence best initiates Body Paragraph 1 on the premise that automation threatens white-collar employment?',
    lesson: 'WEEK 5 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The foremost concern regarding rapid automation is its unprecedented capacity to displace skilled knowledge workers' },
      { id: 'B', text: 'First of all, computers and robots will take all jobs because they are smarter than people' },
      { id: 'C', text: 'I want to write about machines in this paragraph because machines are everywhere today' },
      { id: 'D', text: 'Secondly, technology is good but sometimes robots can replace clerical staff in modern firms' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The foremost concern regarding rapid automation is its unprecedented capacity to displace skilled knowledge workers',
    correctExplanation: 'This sentence establishes a clear controlling idea using academic register ("foremost concern", "unprecedented capacity", "displace skilled knowledge workers") without colloquialisms.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. First of all, computers and robots will take all jobs because they are smarter than people',
      diagnosticTitle: 'Unhedged Informal Assertion',
      explanation: 'Overgeneralizing with "take all jobs" and conversational vocabulary limits the band score to 5.5 for Task Achievement and Lexical Resource.'
    }
  },
  {
    id: 'L70-W05-D1-Q07',
    prompt: 'What grammatical structure allows an IELTS candidate to connect an action to its consequence smoothly in a single compound-complex sentence?',
    lesson: 'WEEK 5 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'An active main clause followed by a non-finite present participial clause of result' },
      { id: 'B', text: 'Three independent clauses joined by exclamation points' },
      { id: 'C', text: 'A series of rhetorical questions followed by a single adjective' },
      { id: 'D', text: 'Beginning every clause with the word because without an independent clause' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'An active main clause followed by a non-finite present participial clause of result',
    correctExplanation: 'Using an -ing participial clause of result (e.g., "...thereby precipitating a drop in living standards") compresses cause and effect into an advanced C1 syntactic structure.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Beginning every clause with the word because without an independent clause',
      diagnosticTitle: 'Sentence Fragment Error',
      explanation: 'Starting with "Because" without providing an independent main clause results in a fragmented clause, heavily penalized in Grammatical Range and Accuracy.'
    }
  },
  {
    id: 'L70-W05-D1-Q08',
    prompt: 'Which prepositional phrase is correctly formed to indicate attribution of blame in academic discourse?',
    lesson: 'WEEK 5 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Economists attribute the widening wage gap to structural changes in international trade' },
      { id: 'B', text: 'Economists attribute the widening wage gap for structural changes in international trade' },
      { id: 'C', text: 'Economists attribute the widening wage gap into structural changes in international trade' },
      { id: 'D', text: 'Economists attribute the widening wage gap on structural changes in international trade' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Economists attribute the widening wage gap to structural changes in international trade',
    correctExplanation: 'The verb "attribute" requires the preposition "to": attribute [effect] TO [cause].',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Economists attribute the widening wage gap on structural changes in international trade',
      diagnosticTitle: 'Collocation Contamination from Blame',
      explanation: 'Learners confuse "attribute X to Y" with "blame X on Y", producing the hybrid error "attribute X on Y".'
    }
  },
  {
    id: 'L70-W05-D1-Q09',
    prompt: 'In a Task 2 concluding paragraph, what should NEVER be introduced according to the Universal Blueprint?',
    lesson: 'WEEK 5 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Brand new arguments, novel evidence, or unrelated sub-topics not analyzed in the body paragraphs' },
      { id: 'B', text: 'A paraphrased restatement of the central thesis' },
      { id: 'C', text: 'A brief synthesis of the primary supporting arguments' },
      { id: 'D', text: 'A concluding forward-looking thought or recommendation' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Brand new arguments, novel evidence, or unrelated sub-topics not analyzed in the body paragraphs',
    correctExplanation: 'The conclusion must synthesize and close existing arguments. Introducing novel unelaborated ideas violates paragraph unity and lowers Task Achievement.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. A concluding forward-looking thought or recommendation',
      diagnosticTitle: 'Recommendation Restriction Myth',
      explanation: 'A forward-looking recommendation or prospective summary based on earlier points is acceptable and encouraged; only novel unsupported arguments are forbidden.'
    }
  },
  {
    id: 'L70-W05-D1-Q10',
    prompt: 'What is the role of the "Three-Button Checklist" at the end of the writing process?',
    lesson: 'WEEK 5 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'A systematic 3-minute final scan focusing on subject-verb agreement, preposition accuracy, and singular-plural noun countability' },
      { id: 'B', text: 'A method for erasing half the essay and starting over if the word count is too high' },
      { id: 'C', text: 'A scoring calculator used by examiners to determine spelling penalties' },
      { id: 'D', text: 'A proofreading technique restricted exclusively to computer-delivered IELTS tests' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'A systematic 3-minute final scan focusing on subject-verb agreement, preposition accuracy, and singular-plural noun countability',
    correctExplanation: 'The 3-button checklist directs the candidate\'s remaining minutes toward high-frequency mechanical errors (agreement, prepositions, plurals) that drag Band 7.5 down to Band 6.5.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. A method for erasing half the essay and starting over if the word count is too high',
      diagnosticTitle: 'Drastic Erasure Panic',
      explanation: 'Erasing paragraphs in the final minutes ruins time management and leaves incomplete essays. Targeted editing of high-frequency errors is the correct practice.'
    }
  },

  // ==========================================
  // WEEK 5 – DAY 2: TECHNOLOGY, AUTOMATION & DIGITAL SOCIETY MONOLOGUES
  // ==========================================
  {
    id: 'L70-W05-D2-Q01',
    prompt: 'In IELTS Speaking Part 2, when answering the prompt "Describe an application or digital innovation you find indispensable", which strategic framework ensures a coherent 2-minute response?',
    lesson: 'WEEK 5 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The Chronological Narrative Arc: Initial adoption context, core functional utility, a memorable dilemma resolved, and reflective long-term impact' },
      { id: 'B', text: 'Listing thirty technical specifications and RAM requirements of your smartphone' },
      { id: 'C', text: 'Reciting the full commercial advertisement transcript from memory' },
      { id: 'D', text: 'Repeating the name of the app forty times to fill the full two minutes' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The Chronological Narrative Arc: Initial adoption context, core functional utility, a memorable dilemma resolved, and reflective long-term impact',
    correctExplanation: 'Following a structured progression (context -> utility -> narrative anecdote -> personal reflection) ensures smooth transitions and sustains fluent delivery for the full 120 seconds.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Listing thirty technical specifications and RAM requirements of your smartphone',
      diagnosticTitle: 'Spec Sheet Monologue',
      explanation: 'Listing hardware specs turns the monologue into a dry, disconnected inventory with zero narrative development or communicative range.'
    }
  },
  {
    id: 'L70-W05-D2-Q02',
    prompt: 'Which advanced collocation elevates a discussion regarding the impact of artificial intelligence on white-collar jobs?',
    lesson: 'WEEK 5 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Automating routine cognitive tasks while necessitating robust human oversight and ethical governance' },
      { id: 'B', text: 'Making computers do hard thinking so people do not have to work anymore' },
      { id: 'C', text: 'Robots stealing the bread and butter of common office workers' },
      { id: 'D', text: 'Using intelligent software to delete annoying office assignments completely' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Automating routine cognitive tasks while necessitating robust human oversight and ethical governance',
    correctExplanation: 'Phrases such as "routine cognitive tasks", "robust human oversight", and "ethical governance" display native-like C1 register appropriate for high-scoring speaking performance.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Robots stealing the bread and butter of common office workers',
      diagnosticTitle: 'Informal Idiom Inappropriateness',
      explanation: 'Idioms like "stealing the bread and butter" sound overly folksy and clichéd, failing to provide the analytical nuance of academic Band 7.5 discourse.'
    }
  },
  {
    id: 'L70-W05-D2-Q03',
    prompt: 'In Speaking Part 3, how should a candidate structure a nuanced response to: "Will automated algorithms eventually replace human educators?"',
    lesson: 'WEEK 5 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Acknowledge diagnostic efficiency in customized content delivery, followed by highlighting the irreplaceable human elements of empathy, moral mentorship, and emotional resonance' },
      { id: 'B', text: 'Give a categorical one-word answer of "Yes" and wait silently for the next question' },
      { id: 'C', text: 'Argue that teachers are useless because internet search engines have all the answers' },
      { id: 'D', text: 'Describe what your favorite teacher wore in elementary school' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Acknowledge diagnostic efficiency in customized content delivery, followed by highlighting the irreplaceable human elements of empathy, moral mentorship, and emotional resonance',
    correctExplanation: 'A Band 7.5+ answer examines both the strengths of algorithmic systems and the irreplaceable socio-emotional mentorship provided by human educators.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Describe what your favorite teacher wore in elementary school',
      diagnosticTitle: 'Part 1 Personal Anecdote in Part 3',
      explanation: 'Speaking Part 3 requires abstract societal analysis, not personal autobiographical anecdotes from childhood.'
    }
  },
  {
    id: 'L70-W05-D2-Q04',
    prompt: 'Which phrase demonstrates effective epistemic hedging when evaluating technological forecasts in Speaking Part 3?',
    lesson: 'WEEK 5 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'It is plausible that generative systems will streamline clerical workflows, though complete workforce obsolescence remains highly improbable' },
      { id: 'B', text: 'All humans will 100% lose their jobs by next year without any doubt whatsoever' },
      { id: 'C', text: 'I am totally sure that robots will rule the universe soon' },
      { id: 'D', text: 'Computers will definitely make humans extinct in the next few months' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'It is plausible that generative systems will streamline clerical workflows, though complete workforce obsolescence remains highly improbable',
    correctExplanation: 'Modal hedging ("It is plausible that...", "remains highly improbable") demonstrates sophisticated academic stance, avoiding juvenile absolutism.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. All humans will 100% lose their jobs by next year without any doubt whatsoever',
      diagnosticTitle: 'Absolutist Assertion Trap',
      explanation: 'Overconfident assertions without nuance indicate weak critical thinking, dragging down both Fluency and Lexical Resource ratings.'
    }
  },
  {
    id: 'L70-W05-D2-Q05',
    prompt: 'When asked about privacy concerns surrounding smart home devices, which response displays the strongest Lexical Resource?',
    lesson: 'WEEK 5 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Constant ambient voice recording poses grave threats regarding unauthorized data harvesting and corporate surveillance' },
      { id: 'B', text: 'Devices listen to talk in the house which is very scary and bad for people' },
      { id: 'C', text: 'Big companies hear what we say in bedroom and take our secrets' },
      { id: 'D', text: 'Smart gadgets are annoying because they always record sound without asking nicely' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Constant ambient voice recording poses grave threats regarding unauthorized data harvesting and corporate surveillance',
    correctExplanation: '"Ambient voice recording", "unauthorized data harvesting", and "corporate surveillance" represent precise, context-specific C1/C2 collocations.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Devices listen to talk in the house which is very scary and bad for people',
      diagnosticTitle: 'Elementary Lexical Range',
      explanation: 'Words like "scary", "bad", and "talk in the house" reflect A2/B1 vocabulary, failing to satisfy the lexical demands of Band 7.0+.'
    }
  },
  {
    id: 'L70-W05-D2-Q06',
    prompt: 'What discourse signpost should be deployed when introducing a counterbalancing consideration in Speaking Part 3?',
    lesson: 'WEEK 5 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Having said that, one cannot disregard the psychological toll of digital hyper-connectivity' },
      { id: 'B', text: 'On the other face of the coin, people get sad because of internet' },
      { id: 'C', text: 'But another point I want to tell you is that phone is bad' },
      { id: 'D', text: 'Moreover, in addition, furthermore, phones make stress' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Having said that, one cannot disregard the psychological toll of digital hyper-connectivity',
    correctExplanation: '"Having said that, one cannot disregard..." is an idiomatic, natural academic concession marker that introduces nuance effortlessly.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. On the other face of the coin, people get sad because of internet',
      diagnosticTitle: 'Distorted Idiom Error',
      explanation: 'The idiom is "on the other side of the coin", not "other face". Distorting fixed idioms damages lexical accuracy.'
    }
  },
  {
    id: 'L70-W05-D2-Q07',
    prompt: 'In Speaking Part 2, what technique prevents running out of ideas before the 2-minute timer elapses?',
    lesson: 'WEEK 5 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Unpacking sensory details and contrasting the situation with what life was like prior to adopting the technology' },
      { id: 'B', text: 'Pausing for thirty seconds in complete silence to think of vocabulary' },
      { id: 'C', text: 'Asking the examiner to repeat the question five times' },
      { id: 'D', text: 'Switching to your native language to explain the complex technical features' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Unpacking sensory details and contrasting the situation with what life was like prior to adopting the technology',
    correctExplanation: 'Contrasting "before vs after" provides a rich narrative reservoir, allowing candidates to demonstrate multiple tenses (used to, had been, currently) smoothly.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Asking the examiner to repeat the question five times',
      diagnosticTitle: 'Stalling Tactic Fallacy',
      explanation: 'The examiner cannot answer questions during your Part 2 monologue; stalling attempts lead to an immediate score downgrade.'
    }
  },
  {
    id: 'L70-W05-D2-Q08',
    prompt: 'Which expression best articulates the concept of "information overload" in contemporary digital society?',
    lesson: 'WEEK 5 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Experiencing cognitive fatigue due to the incessant barrage of algorithmic notifications and fragmented data streams' },
      { id: 'B', text: 'Having too much internet stuff entering the brain so it gets tired quickly' },
      { id: 'C', text: 'Looking at screens until eyes hurt and brain explodes with information' },
      { id: 'D', text: 'Reading too many news articles on mobile phones during lunch' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Experiencing cognitive fatigue due to the incessant barrage of algorithmic notifications and fragmented data streams',
    correctExplanation: 'Collocations such as "cognitive fatigue", "incessant barrage", and "fragmented data streams" showcase native-like conceptual depth.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Looking at screens until eyes hurt and brain explodes with information',
      diagnosticTitle: 'Hyperbolic Colloquialism',
      explanation: 'Hyperbolic statements like "brain explodes" are too informal and childish for an advanced academic assessment.'
    }
  },
  {
    id: 'L70-W05-D2-Q09',
    prompt: 'How should a candidate handle unfamiliarity with a specific high-tech topic in Speaking Part 3?',
    lesson: 'WEEK 5 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Use a metacognitive hedge acknowledging non-expertise, then extrapolate from general principles or public debate' },
      { id: 'B', text: 'Refuse to answer and instruct the examiner to change the subject' },
      { id: 'C', text: 'Fabricate false statistics about computer microchips with complete conviction' },
      { id: 'D', text: 'Say "I don\'t know" and stare blankly at the table' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Use a metacognitive hedge acknowledging non-expertise, then extrapolate from general principles or public debate',
    correctExplanation: 'Phrases like "While I am not an expert in quantum mechanics, from what I have gathered in mainstream reporting..." demonstrate fluent conversational maneuvering.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Say "I don\'t know" and stare blankly at the table',
      diagnosticTitle: 'Defeatist Shutdown',
      explanation: 'IELTS tests communicative English, not technical expertise; shutting down forfeits your opportunity to demonstrate fluency and grammar.'
    }
  },
  {
    id: 'L70-W05-D2-Q10',
    prompt: 'Which sentence demonstrates natural prosodic intonation when summarizing the double-edged nature of technology?',
    lesson: 'WEEK 5 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'While technology undeniably enhances connectivity, it paradoxically fosters social isolation' },
      { id: 'B', text: 'Technology is good. Technology is bad. Technology makes us lonely. That is all' },
      { id: 'C', text: 'Technology good and bad because of computers and internet phones' },
      { id: 'D', text: 'Because connectivity is higher, therefore we are completely alone forever' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'While technology undeniably enhances connectivity, it paradoxically fosters social isolation',
    correctExplanation: 'This sentence establishes sophisticated antithesis with a subordinate concessive clause ("While... connectivity") leading to the main clause ("paradoxically fosters social isolation").',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Technology is good. Technology is bad. Technology makes us lonely. That is all',
      diagnosticTitle: 'Choppy Elementary Syntax',
      explanation: 'Short, fragmented simple sentences lack syntactic complexity and prosodic rhythm, keeping the score around Band 5.0.'
    }
  },

  // ==========================================
  // WEEK 5 – DAY 3: INFORMATION COMPRESSION & CORE CLAUSE EXTRACTION IN ACADEMIC TEXTS
  // ==========================================
  {
    id: 'L70-W05-D3-Q01',
    prompt: 'In academic IELTS Reading, what is the core purpose of "Clause Stripping" (Information Compression)?',
    lesson: 'WEEK 5 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'Temporarily discarding parenthetical clauses, relative clauses, and non-essential modifiers to isolate the central Subject-Verb-Object proposition' },
      { id: 'B', text: 'Crossing out all adjectives in the reading passage permanently with a black marker' },
      { id: 'C', text: 'Reading only the vowels in each paragraph to locate key terminology faster' },
      { id: 'D', text: 'Deleting paragraph headings to test whether the text still makes sense' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Temporarily discarding parenthetical clauses, relative clauses, and non-essential modifiers to isolate the central Subject-Verb-Object proposition',
    correctExplanation: 'Academic sentences often span 40+ words with nested modifiers. Stripping non-essential clauses reveals the underlying assertion and eliminates syntactic confusion.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Crossing out all adjectives in the reading passage permanently with a black marker',
      diagnosticTitle: 'Literal Physical Destruction',
      explanation: 'Clause stripping is a mental cognitive filtering technique, not a destructive physical marking of the booklet.'
    }
  },
  {
    id: 'L70-W05-D3-Q02',
    prompt: 'Coursebook Reading Passage on Hydrothermal Vents: Paragraph A details extreme benthic environments where "thermal equilibrium is rigidly preserved across all seasons." Statement 33 asks: "The water temperature remains constant throughout the year." What is the correct answer?',
    lesson: 'WEEK 5 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'YES' },
      { id: 'B', text: 'NO' },
      { id: 'C', text: 'NOT GIVEN' },
      { id: 'D', text: 'INCONCLUSIVE' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'YES',
    correctExplanation: '"Thermal equilibrium is rigidly preserved" directly matches "temperature remains constant", and "across all seasons" directly corresponds to "throughout the year". Therefore, the statement is YES.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. NOT GIVEN',
      diagnosticTitle: 'Specialized Jargon Hesitation',
      explanation: 'Candidates unfamiliar with "thermal equilibrium" often assume temperature is Not Given, failing to recognize it as a scientific synonym for temperature stability.'
    }
  },
  {
    id: 'L70-W05-D3-Q03',
    prompt: 'Passage on Hydrothermal Vents (Paragraph B): "Unlike phototrophic organisms that harness sunlight, vent-dwelling archaebacteria rely exclusively on sulfur compounds to fuel chemosynthesis." Question 4 asks to complete the sentence (ONE WORD ONLY): "Vent archaebacteria generate energy primarily by metabolizing _____."',
    lesson: 'WEEK 5 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'sulfur' },
      { id: 'B', text: 'sunlight' },
      { id: 'C', text: 'compounds' },
      { id: 'D', text: 'phototrophic' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'sulfur',
    correctExplanation: 'The passage explicitly states that the archaebacteria "rely exclusively on sulfur compounds to fuel chemosynthesis". The required single word is "sulfur".',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. sunlight',
      diagnosticTitle: 'Antithesis Distractor Trap',
      explanation: 'Sunlight is what "phototrophic organisms" use, which the text explicitly contrasts with vent archaebacteria ("Unlike phototrophic organisms...").'
    }
  },
  {
    id: 'L70-W05-D3-Q04',
    prompt: 'Passage notes: "To survive boiling hydrostatic pressures, these extremophiles possess specialized thermal-resistant enzymes that maintain catalytic stability." Question 5 asks (ONE WORD ONLY): "The survival of extremophiles at extreme depths is facilitated by unique _____."',
    lesson: 'WEEK 5 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'enzymes' },
      { id: 'B', text: 'pressures' },
      { id: 'C', text: 'extremophiles' },
      { id: 'D', text: 'depths' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'enzymes',
    correctExplanation: 'The text attributes catalytic stability and survival to "specialized thermal-resistant enzymes". "Unique" paraphrases "specialized", yielding the single noun "enzymes".',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. pressures',
      diagnosticTitle: 'Environmental Factor vs Biological Mechanism',
      explanation: 'Hydrostatic pressure is the hostile environmental condition, not the biological feature that facilitates survival.'
    }
  },
  {
    id: 'L70-W05-D3-Q05',
    prompt: 'Statement 34: "Microbial samples replicated faster in laboratory cultures than in nature." Passage (Paragraph B) states: "Subsequent in-vitro replication rates were significantly sluggish compared to natural habitat metrics." Is the statement YES, NO, or NOT GIVEN?',
    lesson: 'WEEK 5 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'NO' },
      { id: 'B', text: 'YES' },
      { id: 'C', text: 'NOT GIVEN' },
      { id: 'D', text: 'UNCERTAIN' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'NO',
    correctExplanation: 'The passage asserts in-vitro (laboratory) replication was "significantly sluggish" (slower) than natural habitat metrics. The statement claims they replicated "faster", directly contradicting the text.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. YES',
      diagnosticTitle: 'Vocabulary Antonym Confusion',
      explanation: 'Failing to understand that "sluggish" means slow leads candidates to guess YES.'
    }
  },
  {
    id: 'L70-W05-D3-Q06',
    prompt: 'Statement 35: "Governmental agencies have monopolized patent rights on enzymes extracted from deep-sea vent microbes." Passage (Paragraph E) states: "International consortium agreements ensure that all genetic sequencing and patenting protocols remain open-source." Is the statement YES, NO, or NOT GIVEN?',
    lesson: 'WEEK 5 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'NO' },
      { id: 'B', text: 'YES' },
      { id: 'C', text: 'NOT GIVEN' },
      { id: 'D', text: 'PARTIALLY TRUE' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'NO',
    correctExplanation: 'If patenting protocols "remain open-source", governmental agencies have NOT monopolized them. The statement contradicts the author\'s assertion directly, so the answer is NO.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. NOT GIVEN',
      diagnosticTitle: 'Term Not Found Trap',
      explanation: 'Candidates who search only for the word "monopolized" and miss "open-source" mistakenly conclude the information is Not Given.'
    }
  },
  {
    id: 'L70-W05-D3-Q07',
    prompt: 'Statement 32: "Initial deep-sea expeditions failed due to inadequate underwater equipment." Passage states: "The inaugural dive was conducted in 1977, revealing hydrothermal plumes hitherto unrecorded in oceanographic logs." What is the correct answer?',
    lesson: 'WEEK 5 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'expert',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'NOT GIVEN' },
      { id: 'B', text: 'YES' },
      { id: 'C', text: 'NO' },
      { id: 'D', text: 'IRRELEVANT' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'NOT GIVEN',
    correctExplanation: 'The passage describes the 1977 dive and its discoveries, but makes no mention of whether earlier expeditions failed or suffered from equipment inadequacy. The statement is NOT GIVEN.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. NO',
      diagnosticTitle: 'Extrapolated Assumption',
      explanation: 'Because the 1977 dive revealed plumes, candidates might assume earlier expeditions didn\'t fail, but the passage never discusses prior equipment failures at all.'
    }
  },
  {
    id: 'L70-W05-D3-Q08',
    prompt: 'Which heading corresponds to Paragraph A, which begins with unexpected temperature spikes and anomalous mineral formations that puzzled geologists?',
    lesson: 'WEEK 5 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'Anomalous empirical observations challenging initial models' },
      { id: 'B', text: 'Commercial harvesting of oceanic minerals' },
      { id: 'C', text: 'Extinction events in terrestrial ecosystems' },
      { id: 'D', text: 'Government legislation on deep-sea tourism' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Anomalous empirical observations challenging initial models',
    correctExplanation: '"Anomalous empirical observations" precisely summarizes unexpected temperature readings and bizarre mineral formations that contradicted pre-existing geophysical theories.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Commercial harvesting of oceanic minerals',
      diagnosticTitle: 'Keyword Glimpse Distractor',
      explanation: 'While minerals are mentioned, there is no discussion of commercial harvesting operations in Paragraph A.'
    }
  },
  {
    id: 'L70-W05-D3-Q09',
    prompt: 'When extracting the core clause from: "Despite extensive preliminary field calibrations conducted across six research vessels, the primary telemetry sensor malfunctioned", what is the grammatical core?',
    lesson: 'WEEK 5 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The primary telemetry sensor malfunctioned' },
      { id: 'B', text: 'Extensive preliminary calibrations were conducted' },
      { id: 'C', text: 'Across six research vessels' },
      { id: 'D', text: 'Despite calibrations' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The primary telemetry sensor malfunctioned',
    correctExplanation: 'The entire first clause is a prepositional concession modifier. The grammatical core of the sentence is the main clause: "the primary telemetry sensor (Subject) malfunctioned (Verb)".',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Extensive preliminary calibrations were conducted',
      diagnosticTitle: 'Subordinate Modifier Primacy Error',
      explanation: 'The concessive phrase provides background context; the main informational weight and syntactic spine resides in the independent clause.'
    }
  },
  {
    id: 'L70-W05-D3-Q10',
    prompt: 'In List of Headings tasks, why should candidates avoid matching solely based on an isolated keyword found in the first sentence?',
    lesson: 'WEEK 5 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Examiners frequently place distractor keywords in opening sentences to introduce a counter-point before pivoting to the paragraph\'s true main idea' },
      { id: 'B', text: 'The first sentence of an IELTS paragraph is never related to the heading' },
      { id: 'C', text: 'Headings only match words found in the exact middle of the paragraph' },
      { id: 'D', text: 'First sentences in academic texts are always direct quotes from other books' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Examiners frequently place distractor keywords in opening sentences to introduce a counter-point before pivoting to the paragraph\'s true main idea',
    correctExplanation: 'Academic paragraphs frequently use contrastive discourse: opening with a commonly held view (the distractor) before introducing the paragraph\'s true thesis via "However" or "Nonetheless".',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. The first sentence of an IELTS paragraph is never related to the heading',
      diagnosticTitle: 'Opposite Extreme Generalization',
      explanation: 'First sentences often contain topic sentences; however, blind keyword matching without reading the full sentence and pivot words causes heading mismatches.'
    }
  }
];
