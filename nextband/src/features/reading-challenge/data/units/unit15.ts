import { UnitConfig } from '../../types';

export const unit15: UnitConfig = {
  unitNumber: 15,
  slug: 'animal-forecasters',
  title: 'Animal Forecasters',
  category: 'Science Facts',
  audioReadingUrl: '/audio/rc1/29-.mp3',
  audioListeningUrl: '/audio/rc1/30-.mp3',
  wordCount: 240,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. What type of weather is shown in this picture? What is your favorite kind of weather?',
        sampleAnswer: 'Stormy, overcast weather is shown in the picture. My favorite kind of weather is crisp, sunny autumn weather.',
        hint: 'Describe storm clouds and contrast with your preferred climate.',
      },
      {
        id: 'pr-2',
        question: '2. What are some ways that scientists can predict weather patterns?',
        sampleAnswer: 'Scientists analyze barometric air pressure, satellite clouds, radar tracking, and computer forecast simulations.',
        hint: 'Think of weather satellites, pressure readings, and meteorological tools.',
      },
      {
        id: 'pr-3',
        question: '3. Do you have a pet? If yes, does it act differently before or during storms?',
        sampleAnswer: 'My pet dog becomes restless and cowers before heavy thunderstorms because animals perceive subtle seismic or barometric shifts.',
        hint: 'Consider pets reacting to thunder or barometric air pressure drops.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'Can you predict the future?',
        underlinedWord: 'predict',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'dự đoán, tiên đoán',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'Scientists observed the rat’s behavior in their experiment.',
        underlinedWord: 'observed',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'quan sát, theo dõi cẩn thận',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'Researchers say the right brain is connected to musical skills.',
        underlinedWord: 'connected to',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'gắn liền, có liên quan tới',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'Turkey is a traditional holiday food in Canada.',
        underlinedWord: 'traditional',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'mang tính truyền thống, phong tục',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'Her beliefs are very strong.',
        underlinedWord: 'beliefs',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'niềm tin, quan niệm',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'She noticed my new necklace.',
        underlinedWord: 'noticed',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'nhận thấy, để ý thấy',
      },
    ],
    definitions: [
      { letter: 'a', text: 'linked; related' },
      { letter: 'b', text: 'studied; watched' },
      { letter: 'c', text: 'foretell; guess' },
      { letter: 'd', text: 'opinions; ideas; values' },
      { letter: 'e', text: 'relating to customs' },
      { letter: 'f', text: 'saw; noted' },
    ],
  },

  passageNumberedLines: [
    { text: 'Do you think animals can predict the weather or other natural events?' },
    { text: 'Farmers living in the countryside think so. For hundreds of years, they have' },
    { lineNumber: 3, text: 'observed animals and noticed many things about the way animals act. For' },
    { lineNumber: 4, text: 'example, some farmers believe that if they see swans flying into the wind, a hurricane' },
    { lineNumber: 5, text: 'is coming. Or, when cows lie down, a rainstorm is coming. There are many traditional' },
    { text: 'stories connecting animals and natural events. Some scientists are taking another' },
    { lineNumber: 7, text: 'look at animals to see if there is any truth behind these stories and beliefs. They' },
    { text: 'have found some surprising things.' },
    { lineNumber: 9, text: 'Kiyoshi Shimamura is a Japanese earthquake researcher. He noticed an increase' },
    { lineNumber: 10, text: 'in dog bites a short time before earthquakes hit. Then, he did an investigation of twelve' },
    { lineNumber: 11, text: 'public health centers in Kobe, Japan. These health centers treated people after a big' },
    { text: 'earthquake. Shimamura noticed that the month before the big earthquake, treatment' },
    { lineNumber: 13, text: 'for animal bites had increased. In fact, aggressive behavior in dogs, such as biting and' },
    { lineNumber: 14, text: 'barking loudly, jumped 60 percent!' },
    { text: 'Other animals change their behavior before an' },
    { text: 'earthquake as well. For example, fish in ponds or' },
    { text: 'lakes begin swimming together in large groups only' },
    { lineNumber: 18, text: 'in the middle of the water and not near the edges.' },
    { text: 'Also, birds may fly away from their nests for many' },
    { lineNumber: 20, text: 'days, leaving their eggs unprotected. These behaviors' },
    { text: 'suggest that animals may be able to predict natural' },
    { text: 'events, such as earthquakes, better than people.' },
  ],

  passageParagraphs: [
    'Do you think animals can predict the weather or other natural events? Farmers living in the countryside think so. For hundreds of years, they have observed animals and noticed many things about the way animals act. For example, some farmers believe that if they see swans flying into the wind, a hurricane is coming. Or, when cows lie down, a rainstorm is coming. There are many traditional stories connecting animals and natural events. Some scientists are taking another look at animals to see if there is any truth behind these stories and beliefs. They have found some surprising things.',
    'Kiyoshi Shimamura is a Japanese earthquake researcher. He noticed an increase in dog bites a short time before earthquakes hit. Then, he did an investigation of twelve public health centers in Kobe, Japan. These health centers treated people after a big earthquake. Shimamura noticed that the month before the big earthquake, treatment for animal bites had increased. In fact, aggressive behavior in dogs, such as biting and barking loudly, jumped 60 percent!',
    'Other animals change their behavior before an earthquake as well. For example, fish in ponds or lakes begin swimming together in large groups only in the middle of the water and not near the edges. Also, birds may fly away from their nests for many days, leaving their eggs unprotected. These behaviors suggest that animals may be able to predict natural events, such as earthquakes, better than people.',
  ],

  glossary: [
    { line: 9, word: 'earthquake', definition: 'the destructive moving of the land or earth', vietnameseMeaning: 'trận động đất' },
    { line: 9, word: 'increase', definition: 'a greater amount of', vietnameseMeaning: 'sự gia tăng' },
    { line: 10, word: 'bite', definition: 'to grab something with the teeth', vietnameseMeaning: 'cắn, vết cắn' },
    { line: 10, word: 'investigation', definition: 'a research project', vietnameseMeaning: 'cuộc điều tra, khảo sát nghiên cứu' },
    { line: 11, word: 'public', definition: 'not private; available to all people', vietnameseMeaning: 'công lập, công cộng' },
    { line: 13, word: 'aggressive', definition: 'violent; destructive', vietnameseMeaning: 'hung dữ, hiếu chiến' },
    { line: 14, word: 'barking', definition: 'dog noise or sounds', vietnameseMeaning: 'tiếng sủa của chó' },
    { line: 18, word: 'edge', definition: 'the outer side', vietnameseMeaning: 'rìa, mép hồ' },
    { line: 20, word: 'unprotected', definition: 'not secure; open to attack', vietnameseMeaning: 'không được bảo vệ, để hở' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is the main idea of this reading?',
      options: [
        { key: 'a', text: 'What animals do during earthquakes' },
        { key: 'b', text: 'The many earthquakes of Japan' },
        { key: 'c', text: 'Effect of natural events on animals’ actions' },
        { key: 'd', text: 'Folklore and other stories about animals' },
      ],
      correctAnswer: 'c',
      explanation: 'The passage investigates how impending natural events prompt distinct behavioral changes in animals.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'How do dogs begin to behave just before an earthquake?',
      options: [
        { key: 'a', text: 'They lie down in grass.' },
        { key: 'b', text: 'They stay together in large groups.' },
        { key: 'c', text: 'They leave their homes.' },
        { key: 'd', text: 'They hurt people.' },
      ],
      correctAnswer: 'd',
      explanation: 'Lines 9-14 describe an increase in aggressive biting behavior, causing injuries to people.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'According to the passage, what other animals behave strangely before an earthquake?',
      options: [
        { key: 'a', text: 'Pigs' },
        { key: 'b', text: 'Birds' },
        { key: 'c', text: 'Cows' },
        { key: 'd', text: 'All of the above' },
      ],
      correctAnswer: 'b',
      explanation: 'Lines 19-20 mention that birds fly away from nests, leaving eggs unprotected before earthquakes.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'What did Kiyoshi Shimamura look at during his investigation?',
      options: [
        { key: 'a', text: 'Animal clinics treating dogs' },
        { key: 'b', text: 'The number of patients with bites' },
        { key: 'c', text: 'The number of earthquakes a year' },
        { key: 'd', text: 'Places dogs go during earthquakes' },
      ],
      correctAnswer: 'b',
      explanation: 'He investigated records of public health centers treating human patients with animal bites (lines 10-13).',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'Why do you think Japanese researchers are so interested in studying earthquakes?',
      options: [
        { key: 'a', text: 'Japanese people like dogs.' },
        { key: 'b', text: 'Japan has lots of researchers.' },
        { key: 'c', text: 'Japan has lots of earthquakes.' },
        { key: 'd', text: 'Many animals in Japan behave strangely.' },
      ],
      correctAnswer: 'c',
      explanation: 'Geographically located on the Pacific Rim of Fire, Japan experiences frequent seismic tremors.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'take another look',
      definition: 'to re-examine; to check again',
      bookExample: 'Space scientists are taking another look at Mars.',
      sentencePrompt: 'The teacher asked her to [BLANK] at her exam before she handed it in.',
      correctAnswer: 'take another look',
      acceptableAnswers: ['take another look'],
      explanation: '“take another look” means to re-inspect and double check thoroughly.',
    },
    {
      id: 'id-2',
      idiom: 'hit',
      definition: 'to happen quickly; to strike suddenly',
      bookExample: 'The answer to the problem suddenly hit him.',
      sentencePrompt: 'I was [BLANK] with a bad cold last night.',
      correctAnswer: 'hit',
      acceptableAnswers: ['hit'],
      explanation: '“hit” indicates sudden affliction or unexpected arrival of an illness or event.',
    },
    {
      id: 'id-3',
      idiom: 'jump',
      definition: 'to increase suddenly',
      bookExample: 'The price of apartments jumped last year.',
      sentencePrompt: 'The number of cell phone users [BLANK] this year.',
      correctAnswer: 'jumped',
      acceptableAnswers: ['jumped'],
      explanation: '“jumped” indicates a sharp, notable numerical surge.',
    },
  ],

  summary: {
    instruction: 'Paraphrase the paired sentences from the passage to complete the summary.',
    wordBank: [
      'flying into the wind',
      'lying down',
      'biting and barking loudly',
      'swimming together in the middle of the water',
      'flying away and leaving their eggs unprotected',
    ],
    passageTemplate: `1. Farmers believe that swans [BLANK_0] is a sign of a coming hurricane, and cows [BLANK_1] is a sign of a coming rainstorm.
2. Shimamura believes that dogs [BLANK_2] is a sign of a coming earthquake.
3. Other people believe that fish [BLANK_3] and birds [BLANK_4] are signs of earthquakes or other natural events in the near future.`,
    correctAnswers: [
      'flying into the wind',
      'lying down',
      'biting and barking loudly',
      'swimming together in the middle of the water',
      'flying away and leaving their eggs unprotected',
    ],
    vietnameseTranslation: 'Tóm tắt bài đọc: Nông dân tin rằng thiên nga bay ngược gió báo hiệu bão lớn, và bò nằm xuống là dấu hiệu sắp mưa. Nhà nghiên cứu Shimamura nhận thấy chó cắn và sủa dữ dội là điềm báo động đất. Nhiều người cũng quan sát thấy cá bơi tụ lại giữa hồ và chim bỏ tổ bay đi trước khi các sự kiện thiên nhiên xảy ra.',
  },

  listeningDictation: {
    dialogTitle: 'Cat Predictions',
    audioUrl: '/audio/rc1/30-.mp3',
    trackNumber: 30,
    speakers: [
      {
        speaker: 'Man',
        lines: [{ text: 'My cat is sneezing. I think it will rain tomorrow.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Why do you think so, Jamie? There is not even one cloud in the sky.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Well, my grandmother told me that cats can predict the weather. She was from Scotland. Many Scots believe that if a cat sneezes, it will rain soon.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Really? What else did she say?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Well, she said that the English people had a little rhyme. If a cat washes her face over her ear, the weather will be fine and clear.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'So only people from Europe believe cats can predict the weather?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'I don’t think so. My friend, who is American, says that some people in his country believe that if a cat eats grass, it will rain.' }],
      },
    ],
    fullTranscript: `Man: My cat is sneezing. I think it will rain tomorrow.
Woman: Why do you think so, Jamie? There is not even one cloud in the sky.
Man: Well, my grandmother told me that cats can predict the weather. She was from Scotland. Many Scots believe that if a cat sneezes, it will rain soon.
Woman: Really? What else did she say?
Man: Well, she said that the English people had a little rhyme. If a cat washes her face over her ear, the weather will be fine and clear.
Woman: So only people from Europe believe cats can predict the weather?
Man: I don’t think so. My friend, who is American, says that some people in his country believe that if a cat eats grass, it will rain.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: '1. Some people in England and the US believe that cat behavior can predict certain kinds of weather.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'The speaker quotes folklore beliefs from both England and America (Answer Key: True).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: '2. Some Scots believe that if a cat sneezes, it will be a windy day.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'False',
        explanation: 'Scots believe sneezing cats predict rain soon, not wind (Answer Key: False).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: '3. A rhyme says, “If a cat washes over her ear, the weather will be fine and clear.”',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'The man recites this traditional English weather rhyme word for word (Answer Key: True).',
      },
    ],
  },

  grammar: {
    title: 'Before: Conjunction or Preposition?',
    ruleExplanation:
      'Before as a conjunction is followed by a complete clause with subject and verb, while before as a preposition is followed by a noun or noun phrase.',
    sampleSentences: [
      'Shimamura noticed an increase in dog bites a short time before earthquakes hit.',
      'He noticed that the month before the big earthquake, treatment for animal bites had increased.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'Shimamura noticed an increase in dog bites a short time',
        options: ['before', 'in front of'],
        correctAnswer: 'before',
        sentenceAfter: 'earthquakes hit.',
        explanation: '“before” acts as a temporal conjunction followed by clause “earthquakes hit”.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'He noticed that the month',
        options: ['in front of', 'before'],
        correctAnswer: 'before',
        sentenceAfter: 'the big earthquake, treatment for animal bites had increased.',
        explanation: '“before” operates as a temporal preposition preceding the noun phrase “the big earthquake”.',
      },
    ],
  },

  guidedWriting: {
    title: 'An Interesting Animal',
    promptQuestions: [
      '(1) What do you think is the most interesting animal?',
      '(2) How is it interesting?',
      '(3) What can it do?',
      '(4) Where does it usually live?',
      '(5) What is interesting about its living conditions?',
    ],
    exampleText:
      'I think that the most interesting animal is the ant. Ants are very small, but very powerful. They can lift twenty times their own weight. Ants usually live under the ground, in a colony. There can be more than a million ants living in a colony!',
    suggestedAnswers: [
      {
        question: 'What is the most interesting animal and how is it interesting?',
        sample: 'I think the dolphin is the most interesting animal because of its remarkable intelligence and complex communication.',
      },
      {
        question: 'What can it do and where does it live?',
        sample: 'Dolphins use echolocation to navigate open waters and show empathy in pods living across the world’s oceans.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'The police finished their _______.',
      options: [
        { key: 'a', text: 'evidence' },
        { key: 'b', text: 'condition' },
        { key: 'c', text: 'behavior' },
        { key: 'd', text: 'investigation' },
      ],
      correctAnswer: 'd',
      explanation: 'A formal inquiry into a case is an “investigation”.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: '_______ Anna was unexpected. People couldn’t prepare for its strong winds.',
      options: [
        { key: 'a', text: 'Hurricane' },
        { key: 'b', text: 'Earthquake' },
        { key: 'c', text: 'Weather' },
        { key: 'd', text: 'Japanese' },
      ],
      correctAnswer: 'a',
      explanation: 'Severe tropical storms with powerful destructive winds are called “Hurricanes”.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'My mother thinks that intelligence is _______ to the food we eat.',
      options: [
        { key: 'a', text: 'treated' },
        { key: 'b', text: 'noticed' },
        { key: 'c', text: 'connected' },
        { key: 'd', text: 'increased' },
      ],
      correctAnswer: 'c',
      explanation: '“connected to” means linked with or related to.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: '“Did you _______ his watch?” “Yes, it looked very expensive.”',
      options: [
        { key: 'a', text: 'notice' },
        { key: 'b', text: 'observe' },
        { key: 'c', text: 'change' },
        { key: 'd', text: 'suggest' },
      ],
      correctAnswer: 'a',
      explanation: '“notice” means to catch sight of or become aware of.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'I like folklore. Those _______ stories are very interesting.',
      options: [
        { key: 'a', text: 'traditional' },
        { key: 'b', text: 'aggressive' },
        { key: 'c', text: 'natural' },
        { key: 'd', text: 'short' },
      ],
      correctAnswer: 'a',
      explanation: 'Stories passed down through generations are “traditional”.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'There is _______ in approaching a hippo. They kill many people each year.',
      options: [
        { key: 'a', text: 'traditional' },
        { key: 'b', text: 'aggressive' },
        { key: 'c', text: 'connecting' },
        { key: 'd', text: 'danger' },
      ],
      correctAnswer: 'd',
      explanation: '“danger” denotes exposure to harm or peril.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'Scientists _______ animals so they can understand them.',
      options: [
        { key: 'a', text: 'detect' },
        { key: 'b', text: 'observe' },
        { key: 'c', text: 'notice' },
        { key: 'd', text: 'treat' },
      ],
      correctAnswer: 'b',
      explanation: '“observe” means to watch closely and systematically for scientific study.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'The _______ of earthquakes is a difficult science.',
      options: [
        { key: 'a', text: 'predict' },
        { key: 'b', text: 'prediction' },
        { key: 'c', text: 'predicted' },
      ],
      correctAnswer: 'b',
      explanation: 'The noun “prediction” serves as the subject head after the definite article “The”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'That medical _______ really helped my skin problem.',
      options: [
        { key: 'a', text: 'treat' },
        { key: 'b', text: 'treatment' },
        { key: 'c', text: 'treated' },
      ],
      correctAnswer: 'b',
      explanation: 'Noun “treatment” acts as subject modified by adjective “medical”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'Of course I don’t think you’re lying. I ______ you!',
      options: [
        { key: 'a', text: 'believe' },
        { key: 'b', text: 'belief' },
        { key: 'c', text: 'believable' },
      ],
      correctAnswer: 'a',
      explanation: 'The clause requires the finite present verb “believe”.',
    },
  ],
};
