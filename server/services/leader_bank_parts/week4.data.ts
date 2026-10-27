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

export const LEADER_WEEK_4_QUESTIONS: LeaderQuestionPart[] = [
  // ==========================================
  // WEEK 4 – DAY 1: ACADEMIC PARAPHRASING, 40-60 APPROACH & COHESION MASTERY
  // ==========================================
  {
    id: 'L70-W04-D1-Q01',
    prompt: 'According to the Band 7.0 "40-60 Paraphrasing Paradigm", which strategy yields the most natural academic transformation of the source sentence: "Governments should spend more money on public transport to stop traffic jams"?',
    lesson: 'WEEK 4 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Authorities ought to expend greater funds on collective transit to halt automotive blockages' },
      { id: 'B', text: 'Allocating increased state funding to public transit infrastructure would significantly alleviate urban traffic congestion' },
      { id: 'C', text: 'If administrations expend capital into communal locomotives, gridlocks will definitely disappear' },
      { id: 'D', text: 'Public transportation should be financed by authorities so that vehicle jamming ceases permanently' }
    ],
    correctOptionId: 'B',
    correctAnswerText: 'Allocating increased state funding to public transit infrastructure would significantly alleviate urban traffic congestion',
    correctExplanation: 'The 40-60 approach preserves core domain vocabulary (public transit, infrastructure, traffic congestion) while transforming 60% of grammar via nominalization (allocating increased state funding) and sophisticated verbs (alleviate).',
    misconception: {
      baitOptionId: 'A',
      baitOptionText: 'A. Authorities ought to expend greater funds on collective transit to halt automotive blockages',
      diagnosticTitle: 'Mechanical Thesaurus Substitution',
      explanation: 'Replacing words one-by-one with obscure synonyms (collective transit, automotive blockages) produces unnatural, distorted collocations penalized under Lexical Resource.'
    }
  },
  {
    id: 'L70-W04-D1-Q02',
    prompt: 'Which revision transforms the clause "When tourism develops too rapidly, it damages the local environment" into an elegant nominalized C1 structure?',
    lesson: 'WEEK 4 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Rapid tourism expansion frequently inflicts severe ecological degradation upon local habitats' },
      { id: 'B', text: 'Because of fast developing tourists, environment around here is ruined terribly' },
      { id: 'C', text: 'Tourism developing very speedy results into nature being broken down by travelers' },
      { id: 'D', text: 'The fact that tourism expands swiftly makes the local green surroundings collapse' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Rapid tourism expansion frequently inflicts severe ecological degradation upon local habitats',
    correctExplanation: 'Nominalization shifts active verbs into compact noun phrases: "tourism develops rapidly" becomes "Rapid tourism expansion", and "damages the environment" becomes "inflicts severe ecological degradation".',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Because of fast developing tourists, environment around here is ruined terribly',
      diagnosticTitle: 'Informal Spoken Register',
      explanation: 'Phrases like "fast developing tourists" and "ruined terribly" use casual spoken syntax and weak lexical choices unsuitable for academic Task 2.'
    }
  },
  {
    id: 'L70-W04-D1-Q03',
    prompt: 'In Band 7.0+ Cohesion, why is transitioning with demonstrative determiners such as "This disparity..." or "Such regulatory measures..." preferred over mechanical transitional adverbs?',
    lesson: 'WEEK 4 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Demonstrative determiners directly encapsulate preceding arguments into a noun phrase, creating organic flow without formulaic front-linking' },
      { id: 'B', text: 'Mechanical transitions like Furthermore and In addition are strictly forbidden by Cambridge examiners' },
      { id: 'C', text: 'Using demonstratives automatically increases sentence word count to satisfy the minimum length' },
      { id: 'D', text: 'Demonstrative pronouns ensure that every sentence starts with an identical subject structure' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Demonstrative determiners directly encapsulate preceding arguments into a noun phrase, creating organic flow without formulaic front-linking',
    correctExplanation: 'Demonstrative reference (this trend, such policies) achieves seamless conceptual cohesion by summarizing prior clauses into topic nouns, avoiding repetitive, mechanical linkers.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Mechanical transitions like Furthermore and In addition are strictly forbidden by Cambridge examiners',
      diagnosticTitle: 'Absolute Rule Fallacy',
      explanation: 'Examiners do not forbid transitions like Furthermore; rather, overusing them mechanically at the start of every sentence caps Coherence and Cohesion at Band 6.'
    }
  },
  {
    id: 'L70-W04-D1-Q04',
    prompt: 'Identify the sentence that suffers from the "Mechanical Linker Stacking" pitfall.',
    lesson: 'WEEK 4 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'First of all, pollution is rising. Moreover, factories release fumes. In addition, cars emit carbon. Furthermore, governments do nothing' },
      { id: 'B', text: 'Rising urban pollution stems largely from unregulated industrial emissions and escalating vehicular density' },
      { id: 'C', text: 'Unchecked industrial activity exacerbates airborne pollutants, a problem compounded by private vehicular reliance' },
      { id: 'D', text: 'While industrial manufacturing accounts for substantial emissions, private transportation represents an equally pressing challenge' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'First of all, pollution is rising. Moreover, factories release fumes. In addition, cars emit carbon. Furthermore, governments do nothing',
    correctExplanation: 'Beginning every short clause with an overt coordinating linker (First of all, Moreover, In addition, Furthermore) is a textbook symptom of Band 5.5 to 6.0 mechanical cohesion.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. While industrial manufacturing accounts for substantial emissions, private transportation represents an equally pressing challenge',
      diagnosticTitle: 'Subordination Confusion',
      explanation: 'Subordinating with "While" introduces a balanced complex clause, demonstrating natural Band 7.5 syntactical flexibility rather than mechanical listing.'
    }
  },
  {
    id: 'L70-W04-D1-Q05',
    prompt: 'Which revision replaces the informal phrase "Companies should put money into training their workers" with precise C1 nominalized vocabulary?',
    lesson: 'WEEK 4 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Enterprises ought to direct capital investment toward workforce upskilling and professional development' },
      { id: 'B', text: 'Big companies should give dollars to teach their employees how to work better' },
      { id: 'C', text: 'Firms need to pay tuition fees so staff become smarter at their jobs' },
      { id: 'D', text: 'Throwing money into worker learning courses must be done by modern corporate entities' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Enterprises ought to direct capital investment toward workforce upskilling and professional development',
    correctExplanation: '"Direct capital investment toward workforce upskilling and professional development" uses precise academic collocations that elevate the register to Band 7.5+.',
    misconception: {
      baitOptionId: 'D',
      baitOptionText: 'D. Throwing money into worker learning courses must be done by modern corporate entities',
      diagnosticTitle: 'Colloquial Metaphor Contamination',
      explanation: '"Throwing money" is an informal idiomatic idiom unsuitable for formal academic writing, despite the fancy appearance of "modern corporate entities".'
    }
  },
  {
    id: 'L70-W04-D1-Q06',
    prompt: 'What is the primary danger of replacing "environmental pollution" with "nature contamination" or "biosphere poisoning" in IELTS Writing Task 2?',
    lesson: 'WEEK 4 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'It creates non-standard collocations that sound artificial and show a lack of awareness of standard academic terminology' },
      { id: 'B', text: 'Examiners deduct one whole band score for every repeated academic phrase' },
      { id: 'C', text: 'Nature contamination is a British English term that American examiners penalize' },
      { id: 'D', text: 'It violates the 250-word minimum requirement by shortening technical jargon' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'It creates non-standard collocations that sound artificial and show a lack of awareness of standard academic terminology',
    correctExplanation: 'Standard collocations (environmental pollution, ecological degradation) are recognized academic terms. Forcing unnatural substitutes like "nature contamination" signals dictionary-swapping.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Examiners deduct one whole band score for every repeated academic phrase',
      diagnosticTitle: 'Myth of Zero Repetition',
      explanation: 'Repeating established technical terms (e.g. environmental pollution, renewable energy) when grammatically appropriate is preferred over inventing bizarre pseudo-synonyms.'
    }
  },
  {
    id: 'L70-W04-D1-Q07',
    prompt: 'Transform the clause "People eat too much fast food, which causes many health problems" using a participial clause and nominalization.',
    lesson: 'WEEK 4 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Excessive consumption of processed foods precipitates numerous chronic ailments, undermining long-term public health' },
      { id: 'B', text: 'People who eat fast foods a lot are having health issues occurring every single day' },
      { id: 'C', text: 'Fast food eating by individuals results in diseases coming up unexpectedly' },
      { id: 'D', text: 'Since people ingest junk food continually, health troubles are caused severely' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Excessive consumption of processed foods precipitates numerous chronic ailments, undermining long-term public health',
    correctExplanation: '"Excessive consumption of processed foods" (nominalization) + "precipitates numerous chronic ailments, undermining..." (participial clause) achieves Band 8.0 grammatical density and precision.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Fast food eating by individuals results in diseases coming up unexpectedly',
      diagnosticTitle: 'Awkward Gerund Construction',
      explanation: '"Fast food eating by individuals" is awkward phrasing; formal English uses "consumption of processed foods" or "dietary reliance on convenience meals".'
    }
  },
  {
    id: 'L70-W04-D1-Q08',
    prompt: 'How does the phrase "This shift in consumer behavior..." function cohesively in a body paragraph discussing eco-friendly purchasing?',
    lesson: 'WEEK 4 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'It acts as an anaphoric summary noun, encapsulating the preceding sentence without needing a conjunction' },
      { id: 'B', text: 'It introduces a completely unrelated counter-argument to meet Band 7 Task Achievement' },
      { id: 'C', text: 'It serves as a decorative transition that disguises grammatical inaccuracies' },
      { id: 'D', text: 'It signals that the writer is quoting an academic journal verbatim' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'It acts as an anaphoric summary noun, encapsulating the preceding sentence without needing a conjunction',
    correctExplanation: 'Summary nouns preceded by demonstratives (This shift, Such developments) perform anaphoric reference, tying previous narrative points into the subject of the next clause effortlessly.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. It serves as a decorative transition that disguises grammatical inaccuracies',
      diagnosticTitle: 'Superficial Stylistic View',
      explanation: 'Cohesive devices are functional semantic links, not decorative flourishes; they clarify the logical hierarchy of the argument.'
    }
  },
  {
    id: 'L70-W04-D1-Q09',
    prompt: 'Choose the best paraphrase for: "Many graduates cannot find work after university because they lack practical skills."',
    lesson: 'WEEK 4 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Widespread post-graduate unemployment frequently stems from a pronounced deficit in vocational competencies' },
      { id: 'B', text: 'Lots of degree holders fail to get hired because their hands-on capabilities are completely zero' },
      { id: 'C', text: 'Due to absent realistic talent, former college attendees cannot locate career opportunities' },
      { id: 'D', text: 'University finishers are suffering worklessness owing to having no real workplace know-how' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Widespread post-graduate unemployment frequently stems from a pronounced deficit in vocational competencies',
    correctExplanation: 'This version replaces vague words with precise academic equivalents: "post-graduate unemployment" (nominalization) and "deficit in vocational competencies" (formal C1 collocation).',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Due to absent realistic talent, former college attendees cannot locate career opportunities',
      diagnosticTitle: 'Literal Inappropriate Synonymy',
      explanation: '"Absent realistic talent" and "former college attendees" sound bizarre in academic English; practical skills are termed "vocational competencies" or "applied skills".'
    }
  },
  {
    id: 'L70-W04-D1-Q10',
    prompt: 'In the Three-Button Revision Protocol for academic essays, which check specifically targets cohesion and coherence?',
    lesson: 'WEEK 4 – DAY 1',
    part: 'WRITING TASK 2',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Checking whether sentence-initial connectives are varied and whether demonstrative referencing binds adjacent ideas smoothly' },
      { id: 'B', text: 'Counting the exact number of words in each body paragraph to ensure identical length' },
      { id: 'C', text: 'Ensuring that every verb is converted into the past perfect continuous tense' },
      { id: 'D', text: 'Verifying that at least five proverbs or idiomatic expressions are included per page' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Checking whether sentence-initial connectives are varied and whether demonstrative referencing binds adjacent ideas smoothly',
    correctExplanation: 'Cohesion checks verify reference chains, pronouns, demonstratives, and sentence openings to eliminate robotic "Furthermore/Moreover" repetition.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Counting the exact number of words in each body paragraph to ensure identical length',
      diagnosticTitle: 'Symmetry Obsession',
      explanation: 'Paragraphs do not need identical word counts; coherence is judged on logical progression, topic sentence clarity, and balanced idea development.'
    }
  },

  // ==========================================
  // WEEK 4 – DAY 2: BASIC INTONATION, ACOUSTIC CHUNKING & FLUENCY RHYTHMS
  // ==========================================
  {
    id: 'L70-W04-D2-Q01',
    prompt: 'What constitutes a "Thought Group" (Acoustic Chunk) in IELTS Speaking, and why is it vital for Band 7.0+ Pronunciation and Fluency?',
    lesson: 'WEEK 4 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'A syntactically coherent cluster of words spoken as a single rhythmic unit with a distinct intonation contour and tonic stress' },
      { id: 'B', text: 'A memorized paragraph recited in one single breath without taking any pauses' },
      { id: 'C', text: 'Speaking every individual syllable with equal length and high volume to project confidence' },
      { id: 'D', text: 'Pausing after every second word to allow the examiner to write notes' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'A syntactically coherent cluster of words spoken as a single rhythmic unit with a distinct intonation contour and tonic stress',
    correctExplanation: 'A thought group (chunk) is a grammatical and meaningful grouping of words pronounced together, allowing natural breathing pauses at syntactic boundaries rather than mid-clause.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. A memorized paragraph recited in one single breath without taking any pauses',
      diagnosticTitle: 'Breathless Delivery Fallacy',
      explanation: 'Speaking continuously without pauses distorts rhythm, flattens intonation, and signals rote memorization, which severely damages Pronunciation and Fluency scores.'
    }
  },
  {
    id: 'L70-W04-D2-Q02',
    prompt: 'Where should natural micro-pauses occur in the sentence: "From my perspective / investing in renewable energy / is the most viable path / toward environmental recovery"?',
    lesson: 'WEEK 4 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'At major syntactic boundaries dividing introductory phrases, gerund subjects, verb phrases, and prepositional complements' },
      { id: 'B', text: 'Directly between the preposition and its immediate object noun' },
      { id: 'C', text: 'Between the auxiliary verb and the main participle verb' },
      { id: 'D', text: 'Randomly whenever the speaker runs out of air regardless of clause grammar' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'At major syntactic boundaries dividing introductory phrases, gerund subjects, verb phrases, and prepositional complements',
    correctExplanation: 'Native English acoustic chunking places brief cognitive pauses at clause and phrase boundaries (adverbial marker, subject noun phrase, verb phrase, prepositional complement).',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Directly between the preposition and its immediate object noun',
      diagnosticTitle: 'Mid-Constituent Hesitation',
      explanation: 'Pausing between a preposition and its noun (investing in ... pause ... renewable energy) fractures the syntactic unit and sounds like hesitant searching for vocabulary.'
    }
  },
  {
    id: 'L70-W04-D2-Q03',
    prompt: 'In native English prosody, what is "Nuclear Stress" (Tonic Prominence)?',
    lesson: 'WEEK 4 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The most prominent pitch change and elongated syllable placed on the key content word within an acoustic chunk' },
      { id: 'B', text: 'Shouting the final word of every sentence to sound enthusiastic and assertive' },
      { id: 'C', text: 'Placing heavy primary stress exclusively on grammatical function words like prepositions and articles' },
      { id: 'D', text: 'A military pronunciation drill that eliminates accents from non-native speakers' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The most prominent pitch change and elongated syllable placed on the key content word within an acoustic chunk',
    correctExplanation: 'Nuclear stress (tonic accent) is the focal pitch glide on the most critical informational word in a tone unit, guiding the listener to the core message.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Placing heavy primary stress exclusively on grammatical function words like prepositions and articles',
      diagnosticTitle: 'Function Word Over-Stressing',
      explanation: 'Function words (the, of, to, in) are typically unstressed and weakened in connected speech; stressing them sounds robotic and jarring.'
    }
  },
  {
    id: 'L70-W04-D2-Q04',
    prompt: 'Which intonation contour is typically expected when listing multiple items in IELTS Speaking (for example: "I enjoy visiting art galleries, historic museums, and local botanical gardens")?',
    lesson: 'WEEK 4 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Rising intonation on non-final listed items, followed by a definitive falling intonation on the final item' },
      { id: 'B', text: 'A sharp falling intonation on every item to indicate certainty after each noun' },
      { id: 'C', text: 'Monotone flat pitch throughout the entire sentence to sound objective' },
      { id: 'D', text: 'Continuous high rising intonation on every word to mimic questioning tone' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Rising intonation on non-final listed items, followed by a definitive falling intonation on the final item',
    correctExplanation: 'In list intonation, non-final items take a rise or fall-rise to signal that more items follow, while the final item takes a decisive terminal fall indicating completion.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. A sharp falling intonation on every item to indicate certainty after each noun',
      diagnosticTitle: 'False Finality Trap',
      explanation: 'Dropping the pitch on each item sounds like a series of separate aborted sentences rather than an integrated communicative list.'
    }
  },
  {
    id: 'L70-W04-D2-Q05',
    prompt: 'How does effective chunking prevent the "Machine-Gun Syllable-Timed Delivery" common among Vietnamese candidates?',
    lesson: 'WEEK 4 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'It creates a stress-timed cadence where unstressed syllables compress and content words receive rhythmic elongation' },
      { id: 'B', text: 'It forces candidates to translate every Vietnamese word into English before speaking' },
      { id: 'C', text: 'It speeds up overall speaking rate to over 250 words per minute' },
      { id: 'D', text: 'It makes all vowels pronounced with an identical short duration' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'It creates a stress-timed cadence where unstressed syllables compress and content words receive rhythmic elongation',
    correctExplanation: 'Vietnamese is syllable-timed, where each syllable gets roughly equal time. English is stress-timed; chunking enables the reduction of weak syllables (schwa) between stressed beats.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. It speeds up overall speaking rate to over 250 words per minute',
      diagnosticTitle: 'Speed Equated with Fluency',
      explanation: 'Speaking too rapidly causes slurred articulation and phonological breakdown. Fluency is rhythm, flow, and smooth chunking, not raw speed.'
    }
  },
  {
    id: 'L70-W04-D2-Q06',
    prompt: 'When expressing a contrast in Speaking Part 3 (e.g., "Older generations prefer printed books, whereas younger people lean toward digital media"), where should contrastive stress fall?',
    lesson: 'WEEK 4 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'On the parallel contrasting elements: "Older" vs "younger", and "printed" vs "digital"' },
      { id: 'B', text: 'Solely on the conjunction "whereas" with extra loud volume' },
      { id: 'C', text: 'On the verbs "prefer" and "lean" while whispering the nouns' },
      { id: 'D', text: 'Evenly distributed across every single word without distinction' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'On the parallel contrasting elements: "Older" vs "younger", and "printed" vs "digital"',
    correctExplanation: 'Contrastive focus highlights the paired divergent lexical terms in the antithesis, sharpening the logical contrast for the examiner.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Solely on the conjunction "whereas" with extra loud volume',
      diagnosticTitle: 'Connector Overemphasis',
      explanation: 'Conjunctions signal logical connections, but the semantic weight lies on the contrasting ideas themselves, not the grammatical glue.'
    }
  },
  {
    id: 'L70-W04-D2-Q07',
    prompt: 'What acoustic cue indicates an "Incomplete Thought" or open clause in English discourse?',
    lesson: 'WEEK 4 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'A slight pitch rise or non-falling level pitch at the end of the clause' },
      { id: 'B', text: 'A deep low drop in pitch accompanied by a long vocal fry' },
      { id: 'C', text: 'An abrupt cessation of vocalization followed by rapid coughing' },
      { id: 'D', text: 'Speaking with an immediate whisper' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'A slight pitch rise or non-falling level pitch at the end of the clause',
    correctExplanation: 'A rising or level tone at clause boundaries signals syntactic dependency ("there is more to come"), keeping the listener engaged across complex sentence structures.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. A deep low drop in pitch accompanied by a long vocal fry',
      diagnosticTitle: 'Terminal Drop Misplacement',
      explanation: 'A deep low drop signals finality (period/full stop). Using it in the middle of a complex sentence creates a disjointed, fragmented impression.'
    }
  },
  {
    id: 'L70-W04-D2-Q08',
    prompt: 'In connected speech, what happens in the phrase "pick it up" during fluent natural acoustic delivery?',
    lesson: 'WEEK 4 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Consonant-to-vowel catenation and linking connects the final consonant of each word to the initial vowel of the next' },
      { id: 'B', text: 'Glottal stops are aggressively inserted between each word to preserve separation' },
      { id: 'C', text: 'The word "it" is entirely omitted to save pronunciation effort' },
      { id: 'D', text: 'Every word is enunciated in isolation with a distinct half-second gap' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Consonant-to-vowel catenation and linking connects the final consonant of each word to the initial vowel of the next',
    correctExplanation: 'Catenation links final consonants to following vowels: "pick it up" sounds like "pi-ki-tup", which is a hallmark of natural English connected speech.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Glottal stops are aggressively inserted between each word to preserve separation',
      diagnosticTitle: 'Choppy Word Separation',
      explanation: 'Inserting glottal stops between words fragments fluent speech and creates a staccato cadence characteristic of low-band phonological delivery.'
    }
  },
  {
    id: 'L70-W04-D2-Q09',
    prompt: 'Why does "Upspeak" (ending declarative factual statements with a questioning high rise) harm a candidate\'s speaking performance?',
    lesson: 'WEEK 4 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'It conveys insecurity, uncertainty, and hesitation, sounding as if the speaker is asking the examiner for validation' },
      { id: 'B', text: 'It causes the recording microphone to produce digital feedback' },
      { id: 'C', text: 'Examiners are instructed to award an automatic zero if upspeak is detected' },
      { id: 'D', text: 'It transforms English into a tonal language like Mandarin' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'It conveys insecurity, uncertainty, and hesitation, sounding as if the speaker is asking the examiner for validation',
    correctExplanation: 'Upspeak (high rising terminal on statements) projects a lack of conviction or mastery over the topic, undermining the authoritative stance required for high bands.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Examiners are instructed to award an automatic zero if upspeak is detected',
      diagnosticTitle: 'Penalty Exaggeration',
      explanation: 'There is no automatic zero rule; upspeak affects the communicative effect and range of intonation under the Pronunciation descriptor.'
    }
  },
  {
    id: 'L70-W04-D2-Q10',
    prompt: 'Which practice drill is most effective for developing acoustic chunking and tonic stress before the IELTS Speaking test?',
    lesson: 'WEEK 4 – DAY 2',
    part: 'SPEAKING & PRONUNCIATION',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Shadowing native audio transcripts while marking thought group slashes and capitalizing nuclear stress syllables' },
      { id: 'B', text: 'Reading a bilingual dictionary aloud from letter A to Z' },
      { id: 'C', text: 'Memorizing 100 idioms and reciting them as fast as possible' },
      { id: 'D', text: 'Writing out answers fifty times on paper without uttering any sound' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Shadowing native audio transcripts while marking thought group slashes and capitalizing nuclear stress syllables',
    correctExplanation: 'Active shadowing with visual prosody annotations trains neuromuscular motor coordination, intonation contours, and breath control simultaneously.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Memorizing 100 idioms and reciting them as fast as possible',
      diagnosticTitle: 'Idiom Memorization Delusion',
      explanation: 'Rapid idiom recitation reinforces unnatural rhythm and inappropriate word choices without cultivating communicative phonology or discourse rhythm.'
    }
  },

  // ==========================================
  // WEEK 4 – DAY 3: LOOKING FOR PARAPHRASE & SYSTEMATIC SEMANTIC TRACKING
  // ==========================================
  {
    id: 'L70-W04-D3-Q01',
    prompt: 'In IELTS Reading, what is the fundamental difference between a "Hard Anchor" and a "Soft Paraphrase Target"?',
    lesson: 'WEEK 4 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'Hard anchors are unchangeable proper nouns, dates, or numbers that guide navigation; soft targets are conceptual words transformed by synonyms' },
      { id: 'B', text: 'Hard anchors are always false in True or False tasks, while soft targets are always true' },
      { id: 'C', text: 'Hard anchors appear only in the first paragraph, while soft targets appear only in the conclusion' },
      { id: 'D', text: 'Hard anchors must be memorized before entering the test room' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Hard anchors are unchangeable proper nouns, dates, or numbers that guide navigation; soft targets are conceptual words transformed by synonyms',
    correctExplanation: 'Hard anchors (e.g. "2004", "Dr. Watson", "Amazon Basin") do not change and pinpoint location in seconds. Soft targets (e.g. "financial support" -> "monetary allocations") confirm the answer.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. Hard anchors are always false in True or False tasks, while soft targets are always true',
      diagnosticTitle: 'Arbitrary Heuristic Fallacy',
      explanation: 'Anchors are navigational coordinates, not indicators of truth values.'
    }
  },
  {
    id: 'L70-W04-D3-Q02',
    prompt: 'Examine this question from the Coursebook Reading: "What primary catalyst sparked the regional ecological transition?" Paragraph 2 states: "The rampant clearance of indigenous timberlands precipitated an unprecedented environmental crisis." What is the correct short answer (NO MORE THAN THREE WORDS)?',
    lesson: 'WEEK 4 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'expert',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'uncontrolled deforestation' },
      { id: 'B', text: 'rampant clearance' },
      { id: 'C', text: 'indigenous timberlands' },
      { id: 'D', text: 'timberlands precipitated' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'uncontrolled deforestation',
    correctExplanation: 'In the Coursebook answer key (Teacher Guide Week 4 Day 3), "uncontrolled deforestation" (or "rampant clearance") directly matches the catalyst that precipitated the ecological crisis.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. indigenous timberlands',
      diagnosticTitle: 'Incomplete Subject Error',
      explanation: '"Indigenous timberlands" names the forest itself, not the action or catalyst ("rampant clearance" / "uncontrolled deforestation") that sparked the transition.'
    }
  },
  {
    id: 'L70-W04-D3-Q03',
    prompt: 'Question asks: "Which demographic experienced the most severe economic displacement?" Text reads: "Traditional coastal fishers suffered catastrophic income collapse following the depletion of inshore habitats." What is the precise answer in the coursebook key?',
    lesson: 'WEEK 4 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'artisanal fishermen' },
      { id: 'B', text: 'commercial trawlers' },
      { id: 'C', text: 'marine scientists' },
      { id: 'D', text: 'coastal tourists' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'artisanal fishermen',
    correctExplanation: '"Traditional coastal fishers" is directly paraphrased in academic literature and the Teacher Guide key as "artisanal fishermen", who suffered catastrophic income collapse.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. commercial trawlers',
      diagnosticTitle: 'Antonym Distractor Trap',
      explanation: 'Commercial trawlers were the cause of overfishing, not the displaced local demographic experiencing economic collapse.'
    }
  },
  {
    id: 'L70-W04-D3-Q04',
    prompt: 'The question asks: "What statutory measure was implemented in 2004?" Text reads: "The enactment of a strict navigational quota system in 2004 curtailed unauthorized maritime incursions." What was the statutory measure?',
    lesson: 'WEEK 4 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'protective maritime quota' },
      { id: 'B', text: 'unauthorized maritime incursions' },
      { id: 'C', text: 'strict commercial embargo' },
      { id: 'D', text: 'penal servitude law' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'protective maritime quota',
    correctExplanation: 'The text notes "The enactment of a strict navigational quota system in 2004", corresponding to "protective maritime quota" (enactment = statutory measure implemented).',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. unauthorized maritime incursions',
      diagnosticTitle: 'Object of Action Confusion',
      explanation: '"Unauthorized maritime incursions" was what the law curtailed, not the statutory measure itself.'
    }
  },
  {
    id: 'L70-W04-D3-Q05',
    prompt: 'Statement: "Indigenous communities opposed the establishment of the marine reserve." Passage states: "Local tribal councils enthusiastically endorsed and participated in the sanctuary\'s demarcation." Is the statement TRUE, FALSE, or NOT GIVEN?',
    lesson: 'WEEK 4 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'FALSE' },
      { id: 'B', text: 'TRUE' },
      { id: 'C', text: 'NOT GIVEN' },
      { id: 'D', text: 'CANNOT BE DETERMINED' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'FALSE',
    correctExplanation: 'The statement asserts they "opposed" the reserve, whereas the passage directly contradicts this by stating they "enthusiastically endorsed and participated in" its demarcation. Therefore, it is FALSE.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. NOT GIVEN',
      diagnosticTitle: 'False vs Not Given Confusion',
      explanation: 'The statement is not Not Given because the passage explicitly addresses tribal attitudes and directly contradicts the assertion.'
    }
  },
  {
    id: 'L70-W04-D3-Q06',
    prompt: 'Statement: "Commercial vessels circumvented radar surveillance using foreign flags." Passage states: "Authorities reported recurrent instances of illicit night-time trawling beyond the radar perimeter." Is the statement TRUE, FALSE, or NOT GIVEN?',
    lesson: 'WEEK 4 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'expert',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'NOT GIVEN' },
      { id: 'B', text: 'TRUE' },
      { id: 'C', text: 'FALSE' },
      { id: 'D', text: 'PARTIALLY TRUE' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'NOT GIVEN',
    correctExplanation: 'While the passage discusses illicit night trawling beyond radar, there is zero mention of vessels "using foreign flags" to circumvent radar. Hence, the specific fact is NOT GIVEN.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. TRUE',
      diagnosticTitle: 'Plausible World Knowledge Inference',
      explanation: 'Test takers often assume commercial poachers fly foreign flags in real life, but IELTS demands strict textual verification; unmentioned facts are NOT GIVEN.'
    }
  },
  {
    id: 'L70-W04-D3-Q07',
    prompt: 'Statement: "Fish stock densities demonstrated measurable recovery within three years." Passage states: "Biomass surveys confirmed a remarkable forty percent resurgence across key species inside thirty-six months." Is the statement TRUE, FALSE, or NOT GIVEN?',
    lesson: 'WEEK 4 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'TRUE' },
      { id: 'B', text: 'FALSE' },
      { id: 'C', text: 'NOT GIVEN' },
      { id: 'D', text: 'INCONCLUSIVE' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'TRUE',
    correctExplanation: '"Biomass surveys confirmed a remarkable forty percent resurgence" = "measurable recovery", and "inside thirty-six months" = "within three years". All propositions align 100%.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. NOT GIVEN',
      diagnosticTitle: 'Numeral Paraphrase Oversight',
      explanation: 'Thirty-six months is an exact semantic equivalent of three years; failing to recognize this simple conversion leads to choosing Not Given.'
    }
  },
  {
    id: 'L70-W04-D3-Q08',
    prompt: 'When tracking paraphrased vocabulary across a C1 academic text, which pair represents a valid "Verb-to-Noun" nominalized transformation?',
    lesson: 'WEEK 4 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'The population declined sharply matched with The species experienced a steep drop' },
      { id: 'B', text: 'The population declined sharply matched with The animals ran away quickly' },
      { id: 'C', text: 'The population declined sharply matched with People hunted the animals down' },
      { id: 'D', text: 'The population declined sharply matched with Birds stopped singing in trees' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'The population declined sharply matched with The species experienced a steep drop',
    correctExplanation: '"Declined sharply" (verb + adverb) is converted into "experienced a steep drop" (verb + adjective + noun), maintaining precise lexical correspondence.',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. The population declined sharply matched with The animals ran away quickly',
      diagnosticTitle: 'Gross Semantic Drift',
      explanation: 'Running away describes movement, whereas declining sharply describes a quantitative reduction in demographic numbers.'
    }
  },
  {
    id: 'L70-W04-D3-Q09',
    prompt: 'Question asks: "Who provided the empirical data for the final environmental report?" Passage: "A multidisciplinary team of external marine scientists supplied verified telemetry datasets to the oversight commission." What is the answer?',
    lesson: 'WEEK 4 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 25,
    points: 1000,
    options: [
      { id: 'A', text: 'independent oceanographers' },
      { id: 'B', text: 'oversight commission' },
      { id: 'C', text: 'maritime enforcement' },
      { id: 'D', text: 'local timberlands' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'independent oceanographers',
    correctExplanation: 'In the Teacher Guide key, "external marine scientists" who supplied datasets corresponds directly to "independent oceanographers".',
    misconception: {
      baitOptionId: 'B',
      baitOptionText: 'B. oversight commission',
      diagnosticTitle: 'Recipient vs Provider Confusion',
      explanation: 'The oversight commission received the datasets; the external scientists (independent oceanographers) provided them.'
    }
  },
  {
    id: 'L70-W04-D3-Q10',
    prompt: 'What systematic trap causes candidates to select NOT GIVEN when the correct answer is FALSE?',
    lesson: 'WEEK 4 – DAY 3',
    part: 'READING & LISTENING',
    difficulty: 'hard',
    timeLimitSeconds: 20,
    points: 1000,
    options: [
      { id: 'A', text: 'Failing to realize that the passage makes a direct claim that contradicts or precludes the statement, not merely omission' },
      { id: 'B', text: 'Reading the entire paragraph backwards line by line' },
      { id: 'C', text: 'Not noticing that the word NOT is capitalized in the instructions' },
      { id: 'D', text: 'Confusing British spellings with American spellings' }
    ],
    correctOptionId: 'A',
    correctAnswerText: 'Failing to realize that the passage makes a direct claim that contradicts or precludes the statement, not merely omission',
    correctExplanation: 'FALSE requires a factual contradiction (Passage says X; Statement says opposite of X). Candidates mistake contradictory evidence for absent evidence when they scan without analyzing the verb polarity.',
    misconception: {
      baitOptionId: 'C',
      baitOptionText: 'C. Not noticing that the word NOT is capitalized in the instructions',
      diagnosticTitle: 'Superficial Distractor',
      explanation: 'Capitalization in instructions does not alter the underlying logical distinction between mutual exclusion (False) and lack of verification (Not Given).'
    }
  }
];
