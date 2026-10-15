import { UnitConfig } from '../../types';

export const unit14: UnitConfig = {
  unitNumber: 14,
  slug: 'the-importance-of-water',
  title: 'The Importance of Water',
  category: 'Health',
  audioReadingUrl: '/audio/rc1/27-.mp3',
  audioListeningUrl: '/audio/rc1/28-.mp3',
  wordCount: 226,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. How much water should you drink in a day?',
        sampleAnswer: 'People should drink about 8 glasses of water, or around 1.6 to 2 liters daily.',
        hint: 'Think about standard health recommendations for fluid intake.',
      },
      {
        id: 'pr-2',
        question: '2. Is it better to drink cold water or warm water?',
        sampleAnswer: 'Warm or room-temperature water is often better because it supports comfortable digestion.',
        hint: 'Consider body temperature and stomach comfort.',
      },
      {
        id: 'pr-3',
        question: '3. Why is it important to drink enough water?',
        sampleAnswer: 'Drinking sufficient water keeps our kidneys clear, supports intestines in nutrient absorption, and balances body fluids.',
        hint: 'Think of vital bodily organs like kidneys and intestines.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'It’s very hot today. Do you know the temperature?',
        underlinedWord: 'temperature',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'nhiệt độ',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'My father prepares for exercise by drinking water.',
        underlinedWord: 'prepares',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'chuẩn bị sẵn sàng',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'Meat and vegetables are full of nutrients.',
        underlinedWord: 'nutrients',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'chất dinh dưỡng',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'How can I eliminate this smell from my room?',
        underlinedWord: 'eliminate',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'loại bỏ, bài tiết, khử',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'Music can interfere with my studying. I can only study in a quiet room.',
        underlinedWord: 'interfere with',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'cản trở, can thiệp vào',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'Are you healthy? Maybe you should ask your doctor to check.',
        underlinedWord: 'check',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'kiểm tra, khám',
      },
    ],
    definitions: [
      { letter: 'a', text: 'look at closely; examine' },
      { letter: 'b', text: 'gets ready' },
      { letter: 'c', text: 'remove; get rid of' },
      { letter: 'd', text: 'the degree of heat' },
      { letter: 'e', text: 'delay; prevent' },
      { letter: 'f', text: 'things necessary for life and growth' },
    ],
  },

  passageNumberedLines: [
    { text: 'Some doctors think that you should drink a glass of water each morning. You' },
    { text: 'should drink this water first thing, before doing anything else. The temperature' },
    { lineNumber: 3, text: 'of the water should be similar to body temperature; neither too hot nor too' },
    { text: 'cold.' },
    { lineNumber: 5, text: 'Why should you drink this water? Water helps your body in many ways. It' },
    { lineNumber: 6, text: 'helps clean out your kidneys. It prepares your stomach for digestion. Water can also' },
    { lineNumber: 7, text: 'help your intestines work better. After drinking water, the intestines can more easily' },
    { lineNumber: 8, text: 'take out nutrients from our food. Water also helps us go to the bathroom more easily.' },
    { lineNumber: 9, text: 'Scientists suggest that people take in 1,600 milliliters of water each day. But' },
    { lineNumber: 10, text: 'don’t drink all of that water in one sitting. If you do, your' },
    { lineNumber: 11, text: 'kidneys will have to work much harder to eliminate it.' },
    { lineNumber: 12, text: 'It’s better to drink some in the morning and some in the' },
    { text: 'afternoon. Some people think it’s better to drink between' },
    { lineNumber: 14, text: 'meals and not during meals. They think water dilutes' },
    { text: 'the juices produced in our stomachs. This can interfere' },
    { text: 'with normal digestion.' },
    { lineNumber: 17, text: 'Are you drinking enough water every day? Check the' },
    { lineNumber: 18, text: 'color of your urine. If it is light yellow, you are probably' },
    { text: 'drinking enough. If your urine is very dark yellow, you' },
    { lineNumber: 20, text: 'probably need to drink more water. A little more water' },
    { text: 'each day could make you much healthier!' },
  ],

  passageParagraphs: [
    'Some doctors think that you should drink a glass of water each morning. You should drink this water first thing, before doing anything else. The temperature of the water should be similar to body temperature; neither too hot nor too cold.',
    'Why should you drink this water? Water helps your body in many ways. It helps clean out your kidneys. It prepares your stomach for digestion. Water can also help your intestines work better. After drinking water, the intestines can more easily take out nutrients from our food. Water also helps us go to the bathroom more easily.',
    'Scientists suggest that people take in 1,600 milliliters of water each day. But don’t drink all of that water in one sitting. If you do, your kidneys will have to work much harder to eliminate it. It’s better to drink some in the morning and some in the afternoon. Some people think it’s better to drink between meals and not during meals. They think water dilutes the juices produced in our stomachs. This can interfere with normal digestion.',
    'Are you drinking enough water every day? Check the color of your urine. If it is light yellow, you are probably drinking enough. If your urine is very dark yellow, you probably need to drink more water. A little more water each day could make you much healthier!',
  ],

  glossary: [
    { line: 6, word: 'kidney', definition: 'an organ in the body that removes waste from the blood', vietnameseMeaning: 'quả thận' },
    { line: 6, word: 'digestion', definition: 'the process of breaking down food for use by the body', vietnameseMeaning: 'sự tiêu hóa' },
    { line: 8, word: 'take out', definition: 'to withdraw for use', vietnameseMeaning: 'hấp thu, chiết xuất' },
    { line: 9, word: 'milliliter', definition: 'a unit of liquid volume equal to 0.001 liter', vietnameseMeaning: 'mi-li-lít' },
    { line: 14, word: 'dilute', definition: 'to make weaker', vietnameseMeaning: 'làm loãng' },
    { line: 18, word: 'urine', definition: 'the yellow liquid waste from the body', vietnameseMeaning: 'nước tiểu' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What could be another title for this reading?',
      options: [
        { key: 'a', text: '“Drink Water, Not Soft Drinks”' },
        { key: 'b', text: '“Drink During Meals”' },
        { key: 'c', text: '“Drink Between Meals”' },
        { key: 'd', text: '“Drink Enough Water”' },
      ],
      correctAnswer: 'd',
      explanation: 'The passage comprehensively explains the benefits and best practices of drinking sufficient water daily.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'Why is it helpful to drink water in the morning?',
      options: [
        { key: 'a', text: 'Your kidneys will work harder.' },
        { key: 'b', text: 'Your intestines will work well.' },
        { key: 'c', text: 'Your juices will be diluted.' },
        { key: 'd', text: 'Your urine will be pale yellow.' },
      ],
      correctAnswer: 'b',
      explanation: 'Lines 6-8 state that water in the morning prepares the stomach and helps intestines absorb nutrients smoothly.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'Which of the following is NOT a reason to drink water?',
      options: [
        { key: 'a', text: 'So your intestines will work well' },
        { key: 'b', text: 'To get more nutrients' },
        { key: 'c', text: 'To clean out your kidneys' },
        { key: 'd', text: 'To dilute your stomach juices' },
      ],
      correctAnswer: 'd',
      explanation: 'Diluting stomach juices is listed as a potential negative effect of drinking during meals, not a purpose for drinking water.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'Why is it better to drink between meals?',
      options: [
        { key: 'a', text: 'So you eat enough food' },
        { key: 'b', text: 'So you don’t dilute stomach juices' },
        { key: 'c', text: 'So your urine will not smell bad' },
        { key: 'd', text: 'So you don’t overwork your kidneys' },
      ],
      correctAnswer: 'b',
      explanation: 'Lines 13-16 note that drinking during meals might dilute stomach digestive enzymes and interfere with digestion.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'Why is dark-colored urine a sign to drink more water?',
      options: [
        { key: 'a', text: 'It shows our body is healthy.' },
        { key: 'b', text: 'It means our kidneys are working too hard.' },
        { key: 'c', text: 'Less water makes the color darker.' },
        { key: 'd', text: 'It is the same color as our digestive juices.' },
      ],
      correctAnswer: 'c',
      explanation: 'When the body lacks sufficient fluid, waste is more concentrated, causing a darker yellow shade.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'first thing',
      definition: 'first; before anything else',
      bookExample: 'When you get home, do your homework first thing.',
      sentencePrompt: 'When you see your teacher tomorrow, the [BLANK] you should do is say hello.',
      correctAnswer: 'first thing',
      acceptableAnswers: ['first thing'],
      explanation: '“first thing” means immediately as an initial priority.',
    },
    {
      id: 'id-2',
      idiom: 'take in',
      definition: 'to consume; to eat or drink',
      bookExample: 'Cats and dogs also need to take in enough water each day.',
      sentencePrompt: 'It is important to [BLANK] enough vitamins and minerals each day.',
      correctAnswer: 'take in',
      acceptableAnswers: ['take in'],
      explanation: '“take in” means absorb or ingest food and fluids.',
    },
    {
      id: 'id-3',
      idiom: 'in one sitting',
      definition: 'all at once; during one period of time',
      bookExample: 'She did all her homework in one sitting.',
      sentencePrompt: 'We were all amazed that he could eat the entire cake [BLANK].',
      correctAnswer: 'in one sitting',
      acceptableAnswers: ['in one sitting'],
      explanation: '“in one sitting” means without getting up or taking an extended break.',
    },
  ],

  summary: {
    instruction: 'Scan the passage and complete the chart with the correct information from the word bank.',
    wordBank: ['1,600', 'check', 'digestion', 'light', 'meals', 'nutrients'],
    passageTemplate: `Drinking Water:
• When? In the morning: Prepares the stomach for 1. [BLANK_0], Helps the intestines take 2. [BLANK_1] out of food more easily.
• How much? 3. [BLANK_2] ml/day: Not all at once, Not during 4. [BLANK_3].
• How to tell if you drank enough? 5. [BLANK_4] the color of urine: Dark yellow = not enough water, 6. [BLANK_5] yellow = enough water.`,
    correctAnswers: ['digestion', 'nutrients', '1,600', 'meals', 'check', 'light'],
    vietnameseTranslation: 'Tóm tắt bài đọc: Uống nước: (1) Buổi sáng giúp chuẩn bị dạ dày cho việc tiêu hóa và hỗ trợ ruột hấp thụ dưỡng chất dễ hơn; (2) Liều lượng: khoảng 1.600 ml/ngày, không nên uống dồn dập một lúc và tránh uống trong bữa ăn; (3) Cách kiểm tra: xem màu nước tiểu — vàng sậm là thiếu nước, vàng nhạt là đủ nước.',
  },

  listeningDictation: {
    dialogTitle: 'If You Don’t Like Water',
    audioUrl: '/audio/rc1/28-.mp3',
    trackNumber: 28,
    speakers: [
      {
        speaker: 'Woman',
        lines: [{ text: 'Most scientists say we should drink at least 1,600 milliliters of water each day. That’s about six-and-a-half glasses.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'I don’t really like to drink plain water. Water is boring.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'No problem. Fruit juice, milk, and herbal tea all contain lots of water.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'And that will be enough water for my body?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Well, it isn’t necessary to drink all the water we need. We get water from fruits and vegetables, too. You take in water when you eat salad or watermelon.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'What happens if I drink too much water?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'That’s hard to do. When you go to the bathroom, you eliminate the extra water your body doesn’t need.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'That’s good to know. I was worried that I might damage my kidneys.' }],
      },
    ],
    fullTranscript: `Woman: Most scientists say we should drink at least 1,600 milliliters of water each day. That’s about six-and-a-half glasses.
Man: I don’t really like to drink plain water. Water is boring.
Woman: No problem. Fruit juice, milk, and herbal tea all contain lots of water.
Man: And that will be enough water for my body?
Woman: Well, it isn’t necessary to drink all the water we need. We get water from fruits and vegetables, too. You take in water when you eat salad or watermelon.
Man: What happens if I drink too much water?
Woman: That’s hard to do. When you go to the bathroom, you eliminate the extra water your body doesn’t need.
Man: That’s good to know. I was worried that I might damage my kidneys.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: '1. The man doesn’t like to drink ______ water.',
        options: [
          { key: 'plain', text: 'plain' },
          { key: 'cold', text: 'cold' },
          { key: 'hot', text: 'hot' },
          { key: 'dirty', text: 'dirty' },
        ],
        correctAnswer: 'plain',
        explanation: 'He states: “I don’t really like to drink plain water. Water is boring.”',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: '2. The woman says he can get water from eating ______ and ______.',
        options: [
          { key: 'fruits and vegetables', text: 'fruits and vegetables' },
          { key: 'meat and bread', text: 'meat and bread' },
          { key: 'cookies and cake', text: 'cookies and cake' },
          { key: 'soup and chips', text: 'soup and chips' },
        ],
        correctAnswer: 'fruits and vegetables',
        explanation: 'She explains: “We get water from fruits and vegetables, too.”',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: '3. If he drinks too much water, his body will ______ it when he goes to the bathroom.',
        options: [
          { key: 'eliminate', text: 'eliminate' },
          { key: 'store', text: 'store' },
          { key: 'digest', text: 'digest' },
          { key: 'turn into fat', text: 'turn into fat' },
        ],
        correctAnswer: 'eliminate',
        explanation: 'The woman clarifies: “you eliminate the extra water your body doesn’t need.”',
      },
    ],
  },

  grammar: {
    title: 'Should',
    ruleExplanation: 'Use should when giving advice or making recommendations.',
    sampleSentences: [
      'Some doctors think that you should drink a glass of water each morning.',
      'Scientists suggest that people should take in 1,600 milliliters of water each day.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'Some doctors think that you',
        options: ['should', 'could'],
        correctAnswer: 'should',
        sentenceAfter: 'drink a glass of water each morning.',
        explanation: '“should” is used to give health advice and recommendations.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'Scientists suggest that people',
        options: ['would', 'should'],
        correctAnswer: 'should',
        sentenceAfter: 'take in 1,600 milliliters of water each day.',
        explanation: '“should” provides medical guidelines for proper daily hydration.',
      },
    ],
  },

  guidedWriting: {
    title: 'A Healthy Drink',
    promptQuestions: [
      '(1) What is a healthy thing you drink?',
      '(2) How often do you drink this?',
      '(3) How much do you usually drink?',
      '(4) How is this good for your health?',
    ],
    exampleText:
      'A healthy thing that I drink is green tea. I drink green tea every day. I usually drink one cup, but sometimes I drink two cups. Green tea is very good for your health. It can prevent colds.',
    suggestedAnswers: [
      {
        question: 'What healthy drink do you consume and how often?',
        sample: 'A healthy beverage I drink is fresh orange juice. I drink it three mornings a week.',
      },
      {
        question: 'How much do you drink and how is it beneficial?',
        sample: 'I usually have one large glass. It provides natural vitamin C and boosts my immune system.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'It’s very cold right now. The _______ is -1˚C.',
      options: [
        { key: 'a', text: 'nutrient' },
        { key: 'b', text: 'temperature' },
        { key: 'c', text: 'meal' },
        { key: 'd', text: 'cold' },
      ],
      correctAnswer: 'b',
      explanation: 'The measurement of hotness or coldness in degrees is “temperature”.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'My _______ is very dark. I need to drink more water.',
      options: [
        { key: 'a', text: 'urine' },
        { key: 'b', text: 'digestion' },
        { key: 'c', text: 'flavor' },
        { key: 'd', text: 'yellow' },
      ],
      correctAnswer: 'a',
      explanation: 'Liquid bodily waste is called “urine”.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'Everyone has two _______. They look like beans.',
      options: [
        { key: 'a', text: 'intestines' },
        { key: 'b', text: 'stomachs' },
        { key: 'c', text: 'hobbies' },
        { key: 'd', text: 'kidneys' },
      ],
      correctAnswer: 'd',
      explanation: 'The bean-shaped waste filtration organs are “kidneys”.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: '_______ are very long. They look like sausages in our bodies.',
      options: [
        { key: 'a', text: 'Intestines' },
        { key: 'b', text: 'Stomachs' },
        { key: 'c', text: 'Kidneys' },
        { key: 'd', text: 'Beetles' },
      ],
      correctAnswer: 'a',
      explanation: 'Long digestive tubular organs are the “Intestines”.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: '_______ from food are necessary for us to grow and live.',
      options: [
        { key: 'a', text: 'Meals' },
        { key: 'b', text: 'Nutrients' },
        { key: 'c', text: 'Spices' },
        { key: 'd', text: 'Doctors' },
      ],
      correctAnswer: 'b',
      explanation: '“Nutrients” are the essential substances provided by food.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'If you put in too much spice, it will _______ the flavor of the food.',
      options: [
        { key: 'a', text: 'ruin' },
        { key: 'b', text: 'check' },
        { key: 'c', text: 'taste' },
        { key: 'd', text: 'dilute' },
      ],
      correctAnswer: 'a',
      explanation: 'Over-seasoning can “ruin” or overpower the authentic flavor.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'Please don’t use your cell phone on the plane. It _______ with the plane’s equipment.',
      options: [
        { key: 'a', text: 'turns off' },
        { key: 'b', text: 'interferes' },
        { key: 'c', text: 'takes in' },
        { key: 'd', text: 'eliminates' },
      ],
      correctAnswer: 'b',
      explanation: '“interferes with” means causes disruptive signals.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'My _______ is complete.',
      options: [
        { key: 'a', text: 'prepare' },
        { key: 'b', text: 'preparation' },
        { key: 'c', text: 'prepared' },
      ],
      correctAnswer: 'b',
      explanation: 'Possessive determiner “My” requires the noun “preparation”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'My stomach _______ food.',
      options: [
        { key: 'a', text: 'digests' },
        { key: 'b', text: 'digestion' },
        { key: 'c', text: 'digestive' },
      ],
      correctAnswer: 'a',
      explanation: 'Third-person singular present verb “digests” acts as main predicate.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'Kidneys _______ waste water from our bodies.',
      options: [
        { key: 'a', text: 'eliminate' },
        { key: 'b', text: 'elimination' },
        { key: 'c', text: 'eliminating' },
      ],
      correctAnswer: 'a',
      explanation: 'Plural subject “Kidneys” takes base verb “eliminate”.',
    },
  ],
};
