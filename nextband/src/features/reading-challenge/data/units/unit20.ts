import { UnitConfig } from '../../types';

export const unit20: UnitConfig = {
  unitNumber: 20,
  slug: 'rich-dogs',
  title: 'Rich Dogs',
  category: 'Weird and Bizarre',
  audioReadingUrl: '/audio/rc1/39-.mp3',
  audioListeningUrl: '/audio/rc1/40-.mp3',
  wordCount: 220,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. What do you think the reading is about?',
        sampleAnswer: 'I think this reading is about extraordinary dogs that inherited vast wealth or multimillion-dollar mansions.',
        hint: 'Consider wealthy owners leaving estates to their canine companions.',
      },
      {
        id: 'pr-2',
        question: '2. What kind of gifts do people give their dogs?',
        sampleAnswer: 'Pet owners commonly buy premium treats, plush toys, designer collars, and orthopedic beds.',
        hint: 'Think of everyday pet gifts vs. luxurious gifts.',
      },
      {
        id: 'pr-3',
        question: '3. When talking about dogs, what do you think a “mutt” could be?',
        sampleAnswer: 'A mutt is a beloved dog of mixed parentage rather than a registered pedigree breed.',
        hint: 'Contrast a mixed-breed dog with a purebred show dog.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'When her father died, she inherited a lot of money.',
        underlinedWord: 'inherited',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'thừa kế, hưởng gia tài',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'That is the queen’s son. He is her heir.',
        underlinedWord: 'heir',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'người thừa kế hợp pháp',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'She has lots of money in the bank. She has a small fortune.',
        underlinedWord: 'fortune',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'khối gia tài kếch xù',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'The dog rescued her from a fire. It saved her life.',
        underlinedWord: 'rescued',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'giải cứu khỏi nguy hiểm',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'Many parts of the house are in bad shape. Someone should repair those parts.',
        underlinedWord: 'repair',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'sửa chữa, tu bổ',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'Her husband is a European count. She is a countess.',
        underlinedWord: 'countess',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'nữ bá tước',
      },
    ],
    definitions: [
      { letter: 'a', text: 'fix' },
      { letter: 'b', text: 'valuable amount of money' },
      { letter: 'c', text: 'woman from a high class' },
      { letter: 'd', text: 'a person who will receive power or money' },
      { letter: 'e', text: 'received after a person died' },
      { letter: 'f', text: 'saved from danger or trouble' },
    ],
  },

  passageNumberedLines: [
    { text: 'When wealthy people pass away, they usually leave instructions for what' },
    { text: 'to do with the money or property that they leave behind. Often, the' },
    { lineNumber: 3, text: 'money and property go to their heirs. However, in some cases, rich pet' },
    { text: 'owners leave their wealth to their pets after they die.' },
    { lineNumber: 5, text: 'For example, there is a poodle named Toby. When this poodle’s owner passed' },
    { lineNumber: 6, text: 'away, she left Toby 15 million pounds (about $25 million). Then there is Flossie,' },
    { lineNumber: 7, text: 'a yellow Lab mutt, who is not only rich, but is also famous. In 2001, Flossie made' },
    { text: 'the headlines after she rescued her owner, the actress Drew Barrymore and Drew’s' },
    { text: 'husband, from a house fire. To thank Flossie, Drew gave her house to Flossie. Of' },
    { lineNumber: 10, text: 'course, Drew repaired the fire damage first. Now, Flossie is the owner of a beautiful' },
    { text: '$3 million home.' },
    { text: 'It may seem strange for a dog to own such an expensive' },
    { text: 'home, but Flossie is not the only dog like that. Gunther IV, a' },
    { lineNumber: 14, text: 'German Shepherd, bought his home from Madonna and' },
    { text: 'paid over $7 million for the house. However, this was no' },
    { text: 'big deal for him because Gunther IV has about $200' },
    { lineNumber: 17, text: 'million! This makes him the richest dog in the world.' },
    { text: 'He inherited the money from his father, who was the' },
    { text: 'heir to the fortune of a German countess.' },
  ],

  passageParagraphs: [
    'When wealthy people pass away, they usually leave instructions for what to do with the money or property that they leave behind. Often, the money and property go to their heirs. However, in some cases, rich pet owners leave their wealth to their pets after they die.',
    'For example, there is a poodle named Toby. When this poodle’s owner passed away, she left Toby 15 million pounds (about $25 million). Then there is Flossie, a yellow Lab mutt, who is not only rich, but is also famous. In 2001, Flossie made the headlines after she rescued her owner, the actress Drew Barrymore and Drew’s husband, from a house fire. To thank Flossie, Drew gave her house to Flossie. Of course, Drew repaired the fire damage first. Now, Flossie is the owner of a beautiful $3 million home.',
    'It may seem strange for a dog to own such an expensive home, but Flossie is not the only dog like that. Gunther IV, a German Shepherd, bought his home from Madonna and paid over $7 million for the house. However, this was no big deal for him because Gunther IV has about $200 million! This makes him the richest dog in the world. He inherited the money from his father, who was the heir to the fortune of a German countess.',
  ],

  glossary: [
    { line: 2, word: 'property', definition: 'something that a person owns', vietnameseMeaning: 'tài sản, bất động sản' },
    { line: 5, word: 'poodle', definition: 'a breed of dog with very curly hair', vietnameseMeaning: 'chó săn vịt lông xoăn (Poodle)' },
    { line: 6, word: 'pound', definition: 'money in England; £', vietnameseMeaning: 'đồng bảng Anh' },
    { line: 7, word: 'yellow Lab', definition: 'a breed of dog with yellow fur (Labrador Retriever)', vietnameseMeaning: 'chó tha mồi Labrador lông vàng' },
    { line: 7, word: 'mutt', definition: 'a mixed breed of animal', vietnameseMeaning: 'chó lai, chó cỏ' },
    { line: 14, word: 'German Shepherd', definition: 'a breed of dog that is often employed in police or military roles', vietnameseMeaning: 'chó béc-giê Đức' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What could be another title for this reading?',
      options: [
        { key: 'a', text: '“Taking Care of Your Dog”' },
        { key: 'b', text: '“Homeless Dogs”' },
        { key: 'c', text: '“Dog Millionaires”' },
        { key: 'd', text: '“Expensive Dogs”' },
      ],
      correctAnswer: 'c',
      explanation: 'The passage highlights pets that became genuine millionaires through wills and deeds.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'Why is Flossie famous?',
      options: [
        { key: 'a', text: 'She is a dog in a children’s story.' },
        { key: 'b', text: 'She is a German countess.' },
        { key: 'c', text: 'She inherited $5 million.' },
        { key: 'd', text: 'She saved Drew Barrymore’s life.' },
      ],
      correctAnswer: 'd',
      explanation: 'Lines 7-9 note Flossie made headlines after saving Drew Barrymore and her husband from a house fire.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'What do Flossie and Gunther have in common?',
      options: [
        { key: 'a', text: 'Their owners have passed away.' },
        { key: 'b', text: 'They are both mutts.' },
        { key: 'c', text: 'They both own a house.' },
        { key: 'd', text: 'Their owners are entertainers.' },
      ],
      correctAnswer: 'c',
      explanation: 'Flossie was deeded a $3 million home, and Gunther IV purchased a $7 million estate.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'The price Gunther IV paid for his house was _____.',
      options: [
        { key: 'a', text: 'low compared to the house’s value' },
        { key: 'b', text: 'more than he wanted to pay' },
        { key: 'c', text: 'no problem for him' },
        { key: 'd', text: 'the same amount Madonna paid' },
      ],
      correctAnswer: 'c',
      explanation: 'Lines 15-16 declare paying over $7 million was “no big deal for him” given his $200 million fortune.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'Based on the reading, which of the following is probably true?',
      options: [
        { key: 'a', text: 'Gunther IV lives with Madonna.' },
        { key: 'b', text: 'Drew Barrymore likes poodles.' },
        { key: 'c', text: 'Drew Barrymore sold Flossie.' },
        { key: 'd', text: 'Toby’s owner was British.' },
      ],
      correctAnswer: 'd',
      explanation: 'Toby was left 15 million pounds (£), the official currency of Britain.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'pass away',
      definition: 'to die',
      bookExample: 'My grandparents passed away before I was born, so I never knew them.',
      sentencePrompt: 'The vet said our cat [BLANK] in her sleep.',
      correctAnswer: 'passed away',
      acceptableAnswers: ['passed away'],
      explanation: '“passed away” is a polite idiom meaning deceased.',
    },
    {
      id: 'id-2',
      idiom: 'make headlines',
      definition: 'to become an important, widely reported news story',
      bookExample: 'The singer is old, but he is still making headlines.',
      sentencePrompt: 'Our school’s soccer team [BLANK] last year when we won the national championship.',
      correctAnswer: 'made headlines',
      acceptableAnswers: ['made headlines'],
      explanation: '“made headlines” denotes generating widespread press coverage.',
    },
    {
      id: 'id-3',
      idiom: 'no big deal',
      definition: 'nothing to worry about; of minor significance',
      bookExample: 'She lost her keys, but it is no big deal. She has an extra set.',
      sentencePrompt: 'If you can’t pay me today, it’s [BLANK]. You can pay me tomorrow.',
      correctAnswer: 'no big deal',
      acceptableAnswers: ['no big deal'],
      explanation: '“no big deal” reassures that an event is effortless or inconsequential.',
    },
  ],

  summary: {
    instruction: 'Scan the passage and complete the chart with the correct information from the word bank.',
    wordBank: ['countess', 'fortune', 'inherited', 'owner', 'pounds', 'rescued'],
    passageTemplate: `Rich Dogs:
• Toby: Has a 1. [BLANK_0] worth $25 million (or 15 million 2. [BLANK_1])
• Flossie: 3. [BLANK_2] her owner from a fire. Received a house from her 4. [BLANK_3] worth $3 million
• Gunther IV: Has about $200 million (his father 5. [BLANK_4] the money from a German 6. [BLANK_5]). Owns a house worth $7 million`,
    correctAnswers: ['fortune', 'pounds', 'rescued', 'owner', 'inherited', 'countess'],
    vietnameseTranslation: 'Tóm tắt bài đọc: Những chú chó triệu phú: (1) Toby thừa kế khối gia tài trị giá 25 triệu đô la (tương đương 15 triệu bảng Anh); (2) Flossie cứu chủ nhân khỏi đám cháy và được tặng lại một căn biệt thự trị giá 3 triệu đô la; (3) Gunther IV có khoảng 200 triệu đô la do bố nó thừa kế từ một nữ bá tước người Đức, và đã mua lại căn nhà trị giá 7 triệu đô la từ Madonna.',
  },

  listeningDictation: {
    dialogTitle: 'Flossie to the Rescue',
    audioUrl: '/audio/rc1/40-.mp3',
    trackNumber: 40,
    speakers: [
      {
        speaker: 'Man',
        lines: [{ text: 'How did Flossie rescue Drew and her husband?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Well, the fire started at about 3 a.m., so they were sleeping. Flossie barked and scratched on their bedroom door to wake them up.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Wow, she’s a smart dog. You know, I heard that Drew rescued Flossie first.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'From the fire?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'No, before that. Drew got Flossie from an animal shelter. The people at the shelter were going to put her to sleep, and Drew saved her.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Really? Well, you know what they say.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Yeah. What goes around, comes around.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Maybe we should go to the shelter and get a dog, just in case.' }],
      },
    ],
    fullTranscript: `Man: How did Flossie rescue Drew and her husband?
Woman: Well, the fire started at about 3 a.m., so they were sleeping. Flossie barked and scratched on their bedroom door to wake them up.
Man: Wow, she’s a smart dog. You know, I heard that Drew rescued Flossie first.
Woman: From the fire?
Man: No, before that. Drew got Flossie from an animal shelter. The people at the shelter were going to put her to sleep, and Drew saved her.
Woman: Really? Well, you know what they say.
Man: Yeah. What goes around, comes around.
Woman: Maybe we should go to the shelter and get a dog, just in case.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: '1. In order to wake her sleeping owners, Flossie ______ on the door.',
        options: [
          { key: 'barked and scratched', text: 'barked and scratched' },
          { key: 'jumped and cried', text: 'jumped and cried' },
          { key: 'pushed and pulled', text: 'pushed and pulled' },
          { key: 'whined and ran', text: 'whined and ran' },
        ],
        correctAnswer: 'barked and scratched',
        explanation: 'She barked and scratched on the bedroom door to alert them.',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: '2. Drew rescued Flossie from ______.',
        options: [
          { key: 'an animal shelter', text: 'an animal shelter' },
          { key: 'a pet shop', text: 'a pet shop' },
          { key: 'the street', text: 'the street' },
          { key: 'a neighbour', text: 'a neighbour' },
        ],
        correctAnswer: 'an animal shelter',
        explanation: 'The man explains Drew originally adopted Flossie from an animal shelter.',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: '3. The people at the shelter were going to ______.',
        options: [
          { key: 'put her to sleep', text: 'put her to sleep' },
          { key: 'give her to Madonna', text: 'give her to Madonna' },
          { key: 'sell her for $3 million', text: 'sell her for $3 million' },
          { key: 'train her as a police dog', text: 'train her as a police dog' },
        ],
        correctAnswer: 'put her to sleep',
        explanation: 'The shelter was scheduled to euthanize her before Drew intervened.',
      },
    ],
  },

  grammar: {
    title: 'How to Punctuate Subordinating Conjunctions',
    ruleExplanation:
      'A subordinating conjunction introduces a dependent clause. When the dependent clause precedes the main clause, separate them with a comma. When the dependent clause follows the main clause, no comma is needed.',
    sampleSentences: [
      'When this poodle’s owner passed away, she left Toby about $25 million.',
      'However, this was no big deal for him because Gunther IV has about $200 million!',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'When this poodle’s owner passed',
        options: ['away she', 'away, she'],
        correctAnswer: 'away, she',
        sentenceAfter: 'left Toby about $25 million.',
        explanation: 'The introductory dependent adverb clause requires a following comma: away, she.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'However, this was no big deal for',
        options: ['him, because', 'him because'],
        correctAnswer: 'him because',
        sentenceAfter: 'Gunther IV has about $200 million!',
        explanation: 'Because-clause following the independent main clause does not take a comma: him because.',
      },
    ],
  },

  guidedWriting: {
    title: 'My Cat Betty',
    promptQuestions: [
      '(1) What is a smart animal you know?',
      '(2) When or where did you see this animal?',
      '(3) What did this animal know or do?',
      '(4) Why did it do this?',
    ],
    exampleText:
      'My cat Betty was very smart. Betty was our family’s pet. Betty knew that I had to wake up at 7 a.m. for school. She always meowed at that time until I woke up.',
    suggestedAnswers: [
      {
        question: 'What is a smart animal you know and where did you see it?',
        sample: 'A smart animal I know is my neighbor’s border collie, Max. I see him every day in our local park.',
      },
      {
        question: 'What did this animal do and why?',
        sample: 'He knows how to bring people their slippers and opens garden gates by nudging the latch with his nose.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'Did you see the dress the _______ wore to the party? She looked very royal.',
      options: [
        { key: 'a', text: 'countess' },
        { key: 'b', text: 'German Shepherd' },
        { key: 'c', text: 'poodle' },
        { key: 'd', text: 'inventor' },
      ],
      correctAnswer: 'a',
      explanation: 'A noblewoman of high aristocratic rank is a “countess”.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'I could not build the bookshelf. The _______ were missing.',
      options: [
        { key: 'a', text: 'instructions' },
        { key: 'b', text: 'damages' },
        { key: 'c', text: 'nutrients' },
        { key: 'd', text: 'spices' },
      ],
      correctAnswer: 'a',
      explanation: 'Detailed directional guidelines for assembling furniture are “instructions”.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'Her new haircut really changed her _______.',
      options: [
        { key: 'a', text: 'reason' },
        { key: 'b', text: 'appearance' },
        { key: 'c', text: 'fortune' },
        { key: 'd', text: 'yellow Lab' },
      ],
      correctAnswer: 'b',
      explanation: 'A haircut alters one’s outward look or “appearance”.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'That boy is the _______ to a fortune. He will get $10 million in the future.',
      options: [
        { key: 'a', text: 'heir' },
        { key: 'b', text: 'inventor' },
        { key: 'c', text: 'father' },
        { key: 'd', text: 'owner' },
      ],
      correctAnswer: 'a',
      explanation: 'One entitled to receive inherited property is an “heir”.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'My bicycle does not work. Can you help me _______ it?',
      options: [
        { key: 'a', text: 'determine' },
        { key: 'b', text: 'pass away' },
        { key: 'c', text: 'repair' },
        { key: 'd', text: 'rescue' },
      ],
      correctAnswer: 'c',
      explanation: '“repair” means mend or fix.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'Let me introduce you to my _______.',
      options: [
        { key: 'a', text: 'actress' },
        { key: 'b', text: 'fortune' },
        { key: 'c', text: 'husband' },
        { key: 'd', text: 'mutt' },
      ],
      correctAnswer: 'c',
      explanation: '“husband” is the appropriate personal relational noun.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'When she _______ for the house, I will tell you.',
      options: [
        { key: 'a', text: 'pays' },
        { key: 'b', text: 'inherits' },
        { key: 'c', text: 'thanks' },
        { key: 'd', text: 'gets' },
      ],
      correctAnswer: 'a',
      explanation: '“pays for” means remits the monetary sum due.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'She bought an expensive car. It cost her a _______.',
      options: [
        { key: 'a', text: 'fortune' },
        { key: 'b', text: 'fortunate' },
        { key: 'c', text: 'fortunately' },
      ],
      correctAnswer: 'a',
      explanation: 'Idiomatic expression “cost a fortune” uses the noun “fortune”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'He received the house and a million dollars as his _______.',
      options: [
        { key: 'a', text: 'inheritor' },
        { key: 'b', text: 'inherited' },
        { key: 'c', text: 'inheritance' },
      ],
      correctAnswer: 'c',
      explanation: 'The estate passed down to an heir is an “inheritance”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'None of the people _______ from the fire was hurt.',
      options: [
        { key: 'a', text: 'rescue' },
        { key: 'b', text: 'rescued' },
        { key: 'c', text: 'rescuer' },
      ],
      correctAnswer: 'b',
      explanation: 'Reduced relative clause requires passive participle “rescued” (who were rescued).',
    },
  ],
};
