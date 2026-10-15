import { UnitConfig } from '../../types';

export const unit03: UnitConfig = {
  unitNumber: 3,
  slug: 'hurricane-who',
  title: 'Hurricane Who?',
  category: 'Environment',
  audioReadingUrl: '/audio/rc1/05-.mp3',
  audioListeningUrl: '/audio/rc1/06-.mp3',
  wordCount: 239,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. What is a hurricane or typhoon?',
        sampleAnswer: 'A hurricane is a big storm with high winds and lots of rain.',
        hint: 'Think of tropical cyclones that form over ocean waters.',
      },
      {
        id: 'pr-2',
        question: '2. Where do hurricanes usually occur?',
        sampleAnswer: 'I think hurricanes usually occur along the coasts of continents. They always start out in the ocean.',
        hint: 'Consider tropical oceans and coastal regions.',
      },
      {
        id: 'pr-3',
        question: '3. When is the hurricane season in your region?',
        sampleAnswer: 'We usually get hurricanes in my country in the summer and in the fall.',
        hint: 'Recall the stormiest months of the year.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'Strong winds can cause danger.',
        underlinedWord: 'danger',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'sự nguy hiểm, mối đe dọa',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'People try to detect typhoons before they come to land.',
        underlinedWord: 'detect',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'dò tìm, phát hiện',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'I need information about when the storm will begin.',
        underlinedWord: 'information',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'thông tin, dữ liệu',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'Typhoons often occur in summer.',
        underlinedWord: 'occur',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'xảy ra, xuất hiện',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'Hurricane Fred and Hurricane Gloria had similar wind speeds.',
        underlinedWord: 'similar',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'tương tự, gần giống',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'We should decide what to call this typhoon.',
        underlinedWord: 'decide',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'quyết định, lựa chọn',
      },
    ],
    definitions: [
      { letter: 'a', text: 'almost the same; alike' },
      { letter: 'b', text: 'find' },
      { letter: 'c', text: 'facts' },
      { letter: 'd', text: 'big trouble' },
      { letter: 'e', text: 'happen' },
      { letter: 'f', text: 'choose' },
    ],
  },

  passageNumberedLines: [
    { text: 'Tropical cyclones are called typhoons in Asia and hurricanes in North and' },
    { text: 'South America. These storms go around like a wheel turning to the left when' },
    { text: 'they hit in the northern part of the world. They have wind speeds of 60 kph or' },
    { text: 'more. In the United States, the Tropical Prediction Center in Miami, Florida keeps an' },
    { lineNumber: 5, text: 'eye out for hurricanes.' },
    { text: 'When meteorologists detect a hurricane, they give it a name. They can use' },
    { text: 'either a male or female name. Why should tropical cyclones have names? The name' },
    { text: 'makes it easier for people to keep up with information about a hurricane and its possible' },
    { text: 'dangers.' },
    { lineNumber: 10, text: 'The World Meteorological Organization (WMO), an' },
    { text: 'international weather group, decides what names will be' },
    { text: 'used. The WMO makes lists of names using the English' },
    { text: 'alphabet. Each name on the list starts with a different' },
    { text: 'letter. The first hurricane of the year gets the first' },
    { lineNumber: 15, text: "name on that year's list. The second hurricane" },
    { text: 'gets the next name. For example, if the first' },
    { text: 'hurricane is named Abel, the second might be' },
    { text: 'named Betty. The name lists do not include' },
    { text: 'names beginning with the letters Q, U, X, Y, and' },
    { lineNumber: 20, text: "Z. There aren't many names that begin with" },
    { text: 'these letters.' },
    { text: 'Asian countries use a different list, which' },
    { text: "is made up by the WMO's Typhoon Committee." },
    { text: 'This list has a few personal names, but most of the' },
    { lineNumber: 25, text: 'names are of flowers, animals, trees, and other similar' },
    { text: 'things.' },
  ],

  passageParagraphs: [
    'Tropical cyclones are called typhoons in Asia and hurricanes in North and South America. These storms go around like a wheel turning to the left when they hit in the northern part of the world. They have wind speeds of 60 kph or more. In the United States, the Tropical Prediction Center in Miami, Florida keeps an eye out for hurricanes.',
    'When meteorologists detect a hurricane, they give it a name. They can use either a male or female name. Why should tropical cyclones have names? The name makes it easier for people to keep up with information about a hurricane and its possible dangers.',
    "The World Meteorological Organization (WMO), an international weather group, decides what names will be used. The WMO makes lists of names using the English alphabet. Each name on the list starts with a different letter. The first hurricane of the year gets the first name on that year's list. The second hurricane gets the next name. For example, if the first hurricane is named Abel, the second might be named Betty. The name lists do not include names beginning with the letters Q, U, X, Y, and Z. There aren't many names that begin with these letters.",
    "Asian countries use a different list, which is made up by the WMO's Typhoon Committee. This list has a few personal names, but most of the names are of flowers, animals, trees, and other similar things.",
  ],

  glossary: [
    { line: 1, word: 'tropical', definition: 'related to a place that is always warm', vietnameseMeaning: 'thuộc về nhiệt đới' },
    { line: 4, word: 'prediction', definition: 'a smart guess about the future', vietnameseMeaning: 'sự dự đoán' },
    { line: 6, word: 'meteorologist', definition: 'a scientist who studies the weather', vietnameseMeaning: 'nhà khí tượng học' },
    { line: 11, word: 'international', definition: 'in or from different countries', vietnameseMeaning: 'quốc tế' },
    { line: 18, word: 'include', definition: 'to have', vietnameseMeaning: 'bao gồm' },
    { line: 23, word: 'committee', definition: 'a group that decides things', vietnameseMeaning: 'ủy ban' },
    { line: 24, word: 'personal', definition: 'of, or pertaining to, a person', vietnameseMeaning: 'tên riêng của người' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is the main idea of this reading?',
      options: [
        { key: 'a', text: 'Why tropical cyclones are named' },
        { key: 'b', text: 'What tropical cyclones can do' },
        { key: 'c', text: 'How tropical cyclones are named' },
        { key: 'd', text: 'Who watches for tropical cyclones' },
      ],
      correctAnswer: 'c',
      explanation: 'The passage explains the system and rules governing how tropical cyclones receive their names.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'In which direction do tropical cyclones go around in the northern part of the planet?',
      options: [
        { key: 'a', text: 'Down' },
        { key: 'b', text: 'The same direction as a clock' },
        { key: 'c', text: 'The opposite direction of a clock' },
        { key: 'd', text: 'Up' },
      ],
      correctAnswer: 'c',
      explanation: 'Turning to the left in a circle is counter-clockwise (the opposite direction of a clock).',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'The fifth hurricane of 2015 might have the name ______.',
      options: [
        { key: 'a', text: 'Diana' },
        { key: 'b', text: 'Darren' },
        { key: 'c', text: 'Eric' },
        { key: 'd', text: 'Connie' },
      ],
      correctAnswer: 'c',
      explanation: 'The 5th letter of the alphabet is E (A, B, C, D, E), so the 5th storm begins with E (Eric).',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'Which name would a hurricane NOT have?',
      options: [
        { key: 'a', text: 'Rita' },
        { key: 'b', text: 'Veronica' },
        { key: 'c', text: 'William' },
        { key: 'd', text: 'Yanni' },
      ],
      correctAnswer: 'd',
      explanation: 'The name list does not include letters Q, U, X, Y, and Z. Therefore, Yanni is excluded.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'Why should tropical cyclones have names?',
      options: [
        { key: 'a', text: 'It sounds interesting.' },
        { key: 'b', text: 'The names help people.' },
        { key: 'c', text: 'The names are a code for the WMO.' },
        { key: 'd', text: 'It is traditional.' },
      ],
      correctAnswer: 'b',
      explanation: 'Lines 7-9 explain that names make it easier for people to follow storm tracking and warn of dangers.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'make up',
      definition: 'to prepare something',
      bookExample: "I'll make up a new address list for the class.",
      sentencePrompt: 'I will [BLANK] a list of questions to ask the travel agent.',
      correctAnswer: 'make up',
      acceptableAnswers: ['make up'],
      explanation: '“make up” means to compile or prepare a list.',
    },
    {
      id: 'id-2',
      idiom: 'keep up with',
      definition: 'to continue getting useful information',
      bookExample: "It's hard to keep up with fashion these days.",
      sentencePrompt: 'She always [BLANK] the latest music.',
      correctAnswer: 'keeps up with',
      acceptableAnswers: ['keeps up with'],
      explanation: 'Third-person singular present form “keeps up with”.',
    },
    {
      id: 'id-3',
      idiom: 'keep an eye out for',
      definition: 'to watch for trouble or danger',
      bookExample: 'Swimmers need to keep an eye out for sharks.',
      sentencePrompt: 'When you cross the street, [BLANK] cars.',
      correctAnswer: 'keep an eye out for',
      acceptableAnswers: ['keep an eye out for', 'watch out for'],
      explanation: '“keep an eye out for” is an imperative caution meaning to stay alert for danger.',
    },
  ],

  summary: {
    instruction: 'Paraphrase the paired sentences from the passage to complete the summary.',
    wordBank: [
      'both male and female names',
      'names beginning with the letters Q, U, X, Y, and Z',
      'flowers, animals, trees, and other similar things',
    ],
    passageTemplate: `1. Using the letters of the alphabet, the WMO makes a list of names that includes [BLANK_0].
2. The lists are made of names that start with different letters, but the lists do not include [BLANK_1].
3. Asian countries name hurricanes using a list of words that includes [BLANK_2].`,
    correctAnswers: [
      'both male and female names',
      'names beginning with the letters Q, U, X, Y, and Z',
      'flowers, animals, trees, and other similar things',
    ],
    vietnameseTranslation: 'Tóm tắt bài đọc: Tổ chức Khí tượng Thế giới (WMO) lập danh sách tên bão gồm cả tên nam và nữ. Danh sách theo bảng chữ cái nhưng không dùng các chữ Q, U, X, Y, Z. Các nước châu Á đặt tên bão bằng danh sách các từ chỉ hoa, động vật, cây cối.',
  },

  listeningDictation: {
    dialogTitle: 'A Nice Name for a Hurricane',
    audioUrl: '/audio/rc1/06-.mp3',
    trackNumber: 6,
    speakers: [
      {
        speaker: 'Woman',
        lines: [
          { text: "Did you hear on the radio? There's a hurricane coming!" },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: "All right then, we'd better get ready. What's it called?" },
        ],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: "They're calling it Hurricane Connie." },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: 'Why do they choose names like that? It sounds too nice!' },
        ],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: "I think it's only the first letter that's important. It could have been hurricane Catherine or Claire." },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: 'I know, but I think hurricanes should have strong names.' },
        ],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'Well, maybe that would help people take them seriously. What name would you choose?' },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: 'I think Conan would be good.' },
        ],
      },
    ],
    fullTranscript: `Woman: Did you hear on the radio? There's a hurricane coming!
Man: All right then, we'd better get ready. What's it called?
Woman: They're calling it Hurricane Connie.
Man: Why do they choose names like that? It sounds too nice!
Woman: I think it's only the first letter that's important. It could have been hurricane Catherine or Claire.
Man: I know, but I think hurricanes should have strong names.
Woman: Well, maybe that would help people take them seriously. What name would you choose?
Man: I think Conan would be good.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: '1. The hurricane that is coming has a female name.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'Connie is a female name (Answer Key: True).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: "2. The man does not like the hurricane's name.",
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'He thinks it sounds too nice and prefers stronger names (Answer Key: True).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: '3. The man suggests the name Cobra for the hurricane.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'False',
        explanation: 'He suggested Conan, not Cobra (Answer Key: False).',
      },
    ],
  },

  grammar: {
    title: 'Passive Voice',
    ruleExplanation:
      'Passive voice is used when it does not matter who performs an action or when the emphasis is put on the receiver of an action. Form: be + past participle.',
    sampleSentences: [
      'Tropical cyclones are called typhoons in Asia and hurricanes in North and South America.',
      'The World Meteorological Organization decides what names will be used.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'Tropical cyclones',
        options: ['called', 'are called'],
        correctAnswer: 'are called',
        sentenceAfter: 'typhoons in Asia and hurricanes in North and South America.',
        explanation: 'Passive voice with plural subject: “are called”.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'The World Meteorological Organization decides what names will',
        options: ['use', 'be used'],
        correctAnswer: 'be used',
        sentenceAfter: '.',
        explanation: 'Passive future construction following “will”: “will be used”.',
      },
    ],
  },

  guidedWriting: {
    title: 'The Weather I Like the Most',
    promptQuestions: [
      '(1) What kind of weather do you like the most?',
      '(2) When does this weather come in your country?',
      '(3) How does this weather make you feel?',
      '(4) What do you like to do in this weather?',
    ],
    exampleText:
      'I like rainy weather the most. In my country, rainy weather usually comes in July and August. This kind of weather always makes me feel comfortable. When the weather is rainy, I like to read or listen to music.',
    suggestedAnswers: [
      {
        question: 'What weather do you like and when does it come?',
        sample: 'I like cool, sunny autumn weather the most. In Hanoi, it usually arrives in October and November.',
      },
      {
        question: 'How does it make you feel and what do you do?',
        sample: 'It makes me feel relaxed and energized. I love taking long walks around the city and enjoying iced coffee.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: "The teacher decides her students' grades ______ their test scores and homework.",
      options: [
        { key: 'a', text: 'creating' },
        { key: 'b', text: 'deciding' },
        { key: 'c', text: 'according to' },
        { key: 'd', text: 'naming' },
      ],
      correctAnswer: 'c',
      explanation: '“according to” means based on or in agreement with.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'He often uses the Internet to get ______.',
      options: [
        { key: 'a', text: 'information' },
        { key: 'b', text: 'danger' },
        { key: 'c', text: 'taste' },
        { key: 'd', text: 'people' },
      ],
      correctAnswer: 'a',
      explanation: 'People use the Internet to look up information.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'My house is very small. Surprisingly, it does not ______ a bathroom.',
      options: [
        { key: 'a', text: 'keep up' },
        { key: 'b', text: 'catch on' },
        { key: 'c', text: 'list' },
        { key: 'd', text: 'include' },
      ],
      correctAnswer: 'd',
      explanation: '“include” means contain as part of a whole.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'We named our dog George. Then we found out she was a ______ dog!',
      options: [
        { key: 'a', text: 'female' },
        { key: 'b', text: 'possible' },
        { key: 'c', text: 'easy' },
        { key: 'd', text: 'freezing' },
      ],
      correctAnswer: 'a',
      explanation: 'Pronoun “she” indicates a female dog.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: '______ countries like Singapore are hot all the time.',
      options: [
        { key: 'a', text: 'Fantastic' },
        { key: 'b', text: 'Male' },
        { key: 'c', text: 'Tropical' },
        { key: 'd', text: 'International' },
      ],
      correctAnswer: 'c',
      explanation: '“Tropical” describes countries located in warm equatorial zones.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'This street is very busy. You should ______ for cars when you walk across it.',
      options: [
        { key: 'a', text: 'keep up with' },
        { key: 'b', text: 'find out' },
        { key: 'c', text: 'watch out' },
        { key: 'd', text: 'check in' },
      ],
      correctAnswer: 'c',
      explanation: '“watch out for” means to be alert and cautious.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'Hurricanes usually ______ in summer.',
      options: [
        { key: 'a', text: 'occur' },
        { key: 'b', text: 'go around' },
        { key: 'c', text: 'make' },
        { key: 'd', text: 'detect' },
      ],
      correctAnswer: 'a',
      explanation: '“occur” means happen or take place.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'My sister and my mother have very ______ hairstyles.',
      options: [
        { key: 'a', text: 'similarly' },
        { key: 'b', text: 'similar' },
        { key: 'c', text: 'similarity' },
      ],
      correctAnswer: 'b',
      explanation: 'Adjective modifying “hairstyles”: “similar”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: "I can't ______ the problem with my computer.",
      options: [
        { key: 'a', text: 'detect' },
        { key: 'b', text: 'detective' },
        { key: 'c', text: 'detection' },
      ],
      correctAnswer: 'a',
      explanation: 'Bare infinitive verb following modal “can’t”: “detect”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'It is not ______ to swim here. This beach is very safe.',
      options: [
        { key: 'a', text: 'danger' },
        { key: 'b', text: 'dangerous' },
        { key: 'c', text: 'dangerously' },
      ],
      correctAnswer: 'b',
      explanation: 'Adjective complement following “is not”: “dangerous”.',
    },
  ],
};
