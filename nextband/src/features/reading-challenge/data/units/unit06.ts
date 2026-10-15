import { UnitConfig } from '../../types';

export const unit06: UnitConfig = {
  unitNumber: 6,
  slug: 'tigers-tale',
  title: "Tiger's Tale",
  category: 'People Profiles',
  audioReadingUrl: '/audio/rc1/11-.mp3',
  audioListeningUrl: '/audio/rc1/12-.mp3',
  wordCount: 224,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. Who is Jack Nicklaus? Why is he famous?',
        sampleAnswer: 'Jack Nicklaus is a famous professional golfer who won many major championships.',
        hint: 'Think of legendary figures in professional golf history.',
      },
      {
        id: 'pr-2',
        question: '2. What is special about Tiger Woods?',
        sampleAnswer: 'The special thing about Tiger Woods is that he was very young when he achieved major worldwide success.',
        hint: 'Consider his record-setting age and championship achievements.',
      },
      {
        id: 'pr-3',
        question: '3. What is a role model?',
        sampleAnswer: 'A role model is someone who I admire and want to act like.',
        hint: 'Think of someone who sets an admirable example for others.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'Most American golfers are white. Golf does not have much diversity.',
        underlinedWord: 'diversity',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'sự đa dạng',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'Tiger Woods is a very famous golfer.',
        underlinedWord: 'famous',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'nổi tiếng, được nhiều người biết đến',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'I am grateful for all the help you have given me.',
        underlinedWord: 'grateful',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'biết ơn, cảm kích',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'Tiger Woods was sometimes prevented from playing golf.',
        underlinedWord: 'prevented',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'bị ngăn cản, bị cấm',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'Some professional golfers make a lot of money.',
        underlinedWord: 'professional',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'chuyên nghiệp, kiếm tiền từ nghề',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'He was the first player to win so many games. He set a record.',
        underlinedWord: 'record',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'kỷ lục',
      },
    ],
    definitions: [
      { letter: 'a', text: 'different kinds; variety' },
      { letter: 'b', text: 'well-known' },
      { letter: 'c', text: 'stopped' },
      { letter: 'd', text: 'something no one else has done' },
      { letter: 'e', text: 'thankful' },
      { letter: 'f', text: 'skilled; earning money for doing work' },
    ],
  },

  passageNumberedLines: [
    { text: 'Tiger Woods started playing golf when he was two years old. Now he is one of' },
    { text: 'the most famous professional golfers in the world. Tiger is from the United' },
    { lineNumber: 3, text: 'States. His father is African-American and his mother is Thai. His real name' },
    { lineNumber: 4, text: 'is Eldrick, but everyone knows him as Tiger, the nickname his father gave him.' },
    { lineNumber: 5, text: 'He started playing golf professionally in 1996, and won all four of the World' },
    { lineNumber: 6, text: 'Golf Championships before he turned 25. He holds the record as the youngest' },
    { text: 'player ever to win all four of these championships. Although he has played on many' },
    { text: 'great golf courses, one of Tiger’s favorite places to play is Pebble Beach.' },
    { lineNumber: 9, text: 'Tiger became a role model at an early age. People look up to him, so he is very' },
    { text: 'grateful. Because many people helped Tiger as a child, he wants to lend a hand to' },
    { lineNumber: 11, text: 'others now. Some people cannot play golf because of their ethnicity, while others' },
    { lineNumber: 12, text: 'do not have enough money. Occasionally, Tiger himself was prevented from playing' },
    { lineNumber: 13, text: 'golf. Because of this, he created the Tiger Woods Foundation to help make golf open' },
    { text: 'to everyone. He likes to see diversity on the golf course, and he wants all children to' },
    { lineNumber: 15, text: 'play golf if they want to. Tiger is happy that many children now want to play golf' },
    { text: 'because of him.' },
  ],

  passageParagraphs: [
    'Tiger Woods started playing golf when he was two years old. Now he is one of the most famous professional golfers in the world. Tiger is from the United States. His father is African-American and his mother is Thai. His real name is Eldrick, but everyone knows him as Tiger, the nickname his father gave him.',
    'He started playing golf professionally in 1996, and won all four of the World Golf Championships before he turned 25. He holds the record as the youngest player ever to win all four of these championships. Although he has played on many great golf courses, one of Tiger’s favorite places to play is Pebble Beach.',
    'Tiger became a role model at an early age. People look up to him, so he is very grateful. Because many people helped Tiger as a child, he wants to lend a hand to others now. Some people cannot play golf because of their ethnicity, while others do not have enough money. Occasionally, Tiger himself was prevented from playing golf. Because of this, he created the Tiger Woods Foundation to help make golf open to everyone. He likes to see diversity on the golf course, and he wants all children to play golf if they want to. Tiger is happy that many children now want to play golf because of him.',
  ],

  glossary: [
    { line: 3, word: 'African-American', definition: 'a black person from the United States', vietnameseMeaning: 'người Mỹ gốc Phi' },
    { line: 3, word: 'Thai', definition: 'a person from Thailand', vietnameseMeaning: 'người Thái Lan' },
    { line: 4, word: 'nickname', definition: 'an extra name', vietnameseMeaning: 'biệt danh' },
    { line: 6, word: 'championship', definition: 'a competition to find the best', vietnameseMeaning: 'giải vô địch' },
    { line: 9, word: 'role model', definition: 'someone who is a good example for others', vietnameseMeaning: 'hình mẫu lý tưởng' },
    { line: 11, word: 'ethnicity', definition: 'racial background', vietnameseMeaning: 'sắc tộc' },
    { line: 12, word: 'occasionally', definition: 'not often; at times', vietnameseMeaning: 'thỉnh thoảng' },
    { line: 13, word: 'foundation', definition: 'an official group with special goals', vietnameseMeaning: 'quỹ tài trợ / tổ chức từ thiện' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is the main idea of this reading?',
      options: [
        { key: 'a', text: "Tiger's golf career" },
        { key: 'b', text: "Tiger's experience and opinions" },
        { key: 'c', text: "Tiger's foundation" },
        { key: 'd', text: "Tiger's best teacher" },
      ],
      correctAnswer: 'b',
      explanation: 'The passage explores both Tiger’s background/achievements and his beliefs about helping others through his foundation.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: "Which is true about Tiger's parents?",
      options: [
        { key: 'a', text: 'Both of them are Asian.' },
        { key: 'b', text: 'His father is famous.' },
        { key: 'c', text: 'One of them is not from America.' },
        { key: 'd', text: 'Neither of them plays golf.' },
      ],
      correctAnswer: 'c',
      explanation: 'His mother is Thai (from Thailand), which is outside the United States.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'What record does Tiger hold?',
      options: [
        { key: 'a', text: 'The youngest to win four important championships' },
        { key: 'b', text: 'The player to finish a game of golf the fastest' },
        { key: 'c', text: 'The first golfer to turn professional as a teenager' },
        { key: 'd', text: 'The first African-American golfer' },
      ],
      correctAnswer: 'a',
      explanation: 'Lines 6-7 note that he holds the record as the youngest player ever to win all four World Golf Championships.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'Where does Tiger like to play golf?',
      options: [
        { key: 'a', text: 'Augusta' },
        { key: 'b', text: 'The United States' },
        { key: 'c', text: 'Pebble Beach' },
        { key: 'd', text: 'The World Golf Championship' },
      ],
      correctAnswer: 'c',
      explanation: 'Line 8 mentions: “one of Tiger’s favorite places to play is Pebble Beach.”',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'What does the Tiger Woods Foundation do?',
      options: [
        { key: 'a', text: 'Sells golf equipment' },
        { key: 'b', text: 'Gives money to professional golfers' },
        { key: 'c', text: 'Helps kids to play golf' },
        { key: 'd', text: 'Makes golf courses' },
      ],
      correctAnswer: 'c',
      explanation: 'Lines 13-15 explain that the foundation helps make golf open to all children.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'lend a hand',
      definition: 'to help someone',
      bookExample: 'Please lend us a hand when we move into our new house.',
      sentencePrompt: 'Can I [BLANK] you [BLANK] with your homework?',
      correctAnswer: 'lend, a hand',
      acceptableAnswers: ['lend, a hand', 'lend a hand'],
      explanation: '“lend a hand” means to provide assistance.',
    },
    {
      id: 'id-2',
      idiom: 'hold the record (as/for)',
      definition: 'to be known as better than anyone else',
      bookExample: 'Hank Aaron holds the record for the most home runs.',
      sentencePrompt: 'John [BLANK] the fastest time in the race.',
      correctAnswer: 'holds the record for',
      acceptableAnswers: ['holds the record for'],
      explanation: 'Third-person singular form: “holds the record for”.',
    },
    {
      id: 'id-3',
      idiom: 'look up to',
      definition: 'to admire someone; to think someone is a good person',
      bookExample: 'I look up to my mother, and I respect my sister.',
      sentencePrompt: 'My son [BLANK] his teacher.',
      correctAnswer: 'looks up to',
      acceptableAnswers: ['looks up to'],
      explanation: '“looks up to” expresses high admiration and respect.',
    },
  ],

  summary: {
    instruction: 'Paraphrase the paired sentences from the passage to create a concise summary.',
    wordBank: [
      'as the youngest player to ever win all four championships',
      'he was helped by so many people as a child',
      'golf would be open to everyone',
    ],
    passageTemplate: `1. Tiger won the World Golf Championships before he turned 25, setting the record [BLANK_0].
2. Woods wants to help others who can't play golf for various reasons because [BLANK_1].
3. Woods created the Tiger Woods Foundation so that [BLANK_2].`,
    correctAnswers: [
      'as the youngest player to ever win all four championships',
      'he was helped by so many people as a child',
      'golf would be open to everyone',
    ],
    vietnameseTranslation: 'Tóm tắt bài đọc: Tiger Woods thắng 4 giải vô địch thế giới trước tuổi 25, lập kỷ lục tuyển thủ trẻ nhất thắng cả 4 giải. Woods muốn giúp đỡ những người có hoàn cảnh khó khăn vì thuở nhỏ anh đã nhận được nhiều sự hỗ trợ. Anh thành lập Quỹ Tiger Woods để môn golf rộng mở cho tất cả trẻ em.',
  },

  listeningDictation: {
    dialogTitle: 'I Like to Watch Tiger',
    audioUrl: '/audio/rc1/12-.mp3',
    trackNumber: 12,
    speakers: [
      {
        speaker: 'Man',
        lines: [{ text: 'Do you like golf?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Not really, but I like to watch Tiger Woods play.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'What do you like about him?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Well, he is young, handsome, and rich!' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: "You're right, he is rich. He has won millions of dollars playing golf." }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'What do you think he does with all of his money?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'I think he gives some of it to charity.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'So, he is a nice person, as well as handsome and rich!' }],
      },
    ],
    fullTranscript: `Man: Do you like golf?
Woman: Not really, but I like to watch Tiger Woods play.
Man: What do you like about him?
Woman: Well, he is young, handsome, and rich!
Man: You're right, he is rich. He has won millions of dollars playing golf.
Woman: What do you think he does with all of his money?
Man: I think he gives some of it to charity.
Woman: So, he is a nice person, as well as handsome and rich!`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: "1. The woman doesn't really like to watch golf.",
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'She says "Not really, but I like to watch Tiger Woods play" (Answer Key: True).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: '2. The woman thinks that Tiger Woods is good-looking.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'She describes him as handsome (Answer Key: True).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: '3. The man knows that Tiger gave millions of dollars to charity.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'False',
        explanation: 'The man only guesses/thinks he gives some to charity, not knows for certain (Answer Key: False).',
      },
    ],
  },

  grammar: {
    title: 'Verbs + Gerund or Infinitive?',
    ruleExplanation:
      'Certain verbs can be followed by a gerund or an infinitive (e.g. start), while other verbs like want require an infinitive with to.',
    sampleSentences: [
      'Tiger Woods started playing golf professionally in 1996.',
      'Because many people helped Tiger as a child, he wants to lend a hand to others now.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'Tiger Woods started',
        options: ['play', 'playing'],
        correctAnswer: 'playing',
        sentenceAfter: 'golf professionally in 1996.',
        explanation: '“start + V-ing” expresses beginning an ongoing activity: started playing.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'Because many people helped Tiger as a child, he wants',
        options: ['to lend', 'lending'],
        correctAnswer: 'to lend',
        sentenceAfter: 'a hand to others now.',
        explanation: '“want” is strictly followed by an infinitive: wants to lend.',
      },
    ],
  },

  guidedWriting: {
    title: 'A Sport I Like',
    promptQuestions: [
      '(1) What is a game or sport that you like?',
      '(2) Where do people play it?',
      '(3) How do they play it?',
      '(4) Why do you like this game or sport?',
    ],
    exampleText:
      'A sport that I like is car racing. People usually do this sport on a special track. They try to finish the race before the other drivers. I like this sport because it is very exciting.',
    suggestedAnswers: [
      {
        question: 'What sport do you like and where do people play it?',
        sample: 'A sport that I like is badminton. People usually play it in an indoor sports hall or outdoor court.',
      },
      {
        question: 'How do they play it and why do you like it?',
        sample: 'Players use rackets to hit a shuttlecock over a net. I like it because it develops quick reflexes and keeps me fit.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'I was very ______ for the help she gave me.',
      options: [
        { key: 'a', text: 'famous' },
        { key: 'b', text: 'open' },
        { key: 'c', text: 'grateful' },
        { key: 'd', text: 'real' },
      ],
      correctAnswer: 'c',
      explanation: '“grateful for” means feeling or showing appreciation; thankful.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'The loud noises outside ______ me from sleeping.',
      options: [
        { key: 'a', text: 'helped' },
        { key: 'b', text: 'stressed' },
        { key: 'c', text: 'detected' },
        { key: 'd', text: 'prevented' },
      ],
      correctAnswer: 'd',
      explanation: '“prevent someone from doing something” means stop from happening.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'My friend lived in Bangkok for two years, so he has many ______ friends.',
      options: [
        { key: 'a', text: 'professional' },
        { key: 'b', text: 'Thai' },
        { key: 'c', text: 'active' },
        { key: 'd', text: 'wealthy' },
      ],
      correctAnswer: 'b',
      explanation: 'Bangkok is the capital of Thailand, whose people are Thai.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'She is a very ______ writer. Many people read her novels.',
      options: [
        { key: 'a', text: 'famous' },
        { key: 'b', text: 'early' },
        { key: 'c', text: 'young' },
        { key: 'd', text: 'cozy' },
      ],
      correctAnswer: 'a',
      explanation: 'Widely known and read by many means “famous”.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'His ______ in elementary school was "Birdy."',
      options: [
        { key: 'a', text: 'information' },
        { key: 'b', text: 'ethnicity' },
        { key: 'c', text: 'nickname' },
        { key: 'd', text: 'foundation' },
      ],
      correctAnswer: 'c',
      explanation: 'An informal familiar name is a “nickname”.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'I am ______ busy today, so I don’t have time to see a movie.',
      options: [
        { key: 'a', text: 'happily' },
        { key: 'b', text: 'occasionally' },
        { key: 'c', text: 'nearly' },
        { key: 'd', text: 'extremely' },
      ],
      correctAnswer: 'd',
      explanation: '“extremely” means to a very great degree.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'He really wants to be like Bill Gates. Bill Gates is his ______.',
      options: [
        { key: 'a', text: 'record' },
        { key: 'b', text: 'foundation' },
        { key: 'c', text: 'insect' },
        { key: 'd', text: 'role model' },
      ],
      correctAnswer: 'd',
      explanation: 'Someone you admire and strive to imitate is a “role model”.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'Los Angeles is a city with great ______. There are many different kinds of people there.',
      options: [
        { key: 'a', text: 'diverse' },
        { key: 'b', text: 'diversity' },
        { key: 'c', text: 'diversify' },
      ],
      correctAnswer: 'b',
      explanation: 'Noun modified by adjective “great”: “diversity”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'My favorite ______ food is Indian.',
      options: [
        { key: 'a', text: 'ethnicity' },
        { key: 'b', text: 'ethnic' },
        { key: 'c', text: 'ethically' },
      ],
      correctAnswer: 'b',
      explanation: 'Adjective modifying “food”: “ethnic”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'My sister wants to become a ______ tennis player.',
      options: [
        { key: 'a', text: 'professional' },
        { key: 'b', text: 'profession' },
        { key: 'c', text: 'professionally' },
      ],
      correctAnswer: 'a',
      explanation: 'Adjective modifying “tennis player”: “professional”.',
    },
  ],
};
