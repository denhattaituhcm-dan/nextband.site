import { UnitConfig } from '../../types';

export const unit18: UnitConfig = {
  unitNumber: 18,
  slug: 'worth-collecting',
  title: 'Worth Collecting',
  category: 'Sports and Hobbies',
  audioReadingUrl: '/audio/rc1/35-.mp3',
  audioListeningUrl: '/audio/rc1/36-.mp3',
  wordCount: 221,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. Do you know anyone who collects stamps?',
        sampleAnswer: 'Yes, my grandfather had a massive stamp album with specimens from over fifty countries.',
        hint: 'Think of relatives, friends, or hobbyists who collect postage.',
      },
      {
        id: 'pr-2',
        question: '2. What do you do with old letters or stamps?',
        sampleAnswer: 'I store keepsake letters in memory boxes and preserve vintage envelope stamps.',
        hint: 'Consider whether you archive, discard, or preserve correspondence.',
      },
      {
        id: 'pr-3',
        question: '3. Why do you think people like to keep old stamps?',
        sampleAnswer: 'People collect stamps for artistic appreciation, historical connection, and valuable investment potential.',
        hint: 'Think of rarity, aesthetics, and monetary value.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'Why are you late? Do you have a reason?',
        underlinedWord: 'reason',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'nguyên do, lý do',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'My sister collects stamps. She has about 200 of them!',
        underlinedWord: 'collects',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'sưu tầm, thu gom',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'Hinduism is the most practiced religion in India.',
        underlinedWord: 'practiced',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'được theo đuổi, thực hành phổ biến',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'Some stamps are very valuable. They are worth hundreds of dollars.',
        underlinedWord: 'valuable',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'có giá trị lớn, quý giá',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'How did the expert determine the value of the stamp?',
        underlinedWord: 'determine',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'xác định, thẩm định',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'Her car is in good condition. It looks like new.',
        underlinedWord: 'condition',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'tình trạng, trạng thái bảo quản',
      },
    ],
    definitions: [
      { letter: 'a', text: 'worth a lot of money' },
      { letter: 'b', text: 'cause; basis for action' },
      { letter: 'c', text: 'decide; find out' },
      { letter: 'd', text: 'followed; engaged in' },
      { letter: 'e', text: 'state; form; shape' },
      { letter: 'f', text: 'gathers together for a hobby' },
    ],
  },

  passageNumberedLines: [
    { text: 'Would you be worried if your classmate told you that he was a philatelist?' },
    { text: 'Would you call a doctor or call the police? Actually, there is no reason to' },
    { lineNumber: 3, text: 'be concerned. A philatelist is just a person who collects stamps!' },
    { text: 'Stamp collecting has been around for well over 150 years. People began collecting' },
    { lineNumber: 5, text: 'stamps soon after adhesive postage stamps (stamps with glue on the back) were' },
    { lineNumber: 6, text: 'introduced in London in 1840. Today, according to Boys’ Life magazine, stamp' },
    { text: 'collecting is the most practiced hobby in the world.' },
    { text: 'Some people collect stamps just for fun. These people may just want to collect' },
    { text: 'stamps with animals or famous people on them. Or maybe they want to collect all' },
    { lineNumber: 10, text: 'the stamps issued by one particular country. Other people collect stamps that they' },
    { text: 'think will be valuable down the road. Such collectors ask three questions to determine' },
    { text: 'if a stamp is worth collecting and what its value might be.' },
    { text: 'First, how many of a particular' },
    { text: 'stamp were made? Next, how popular is' },
    { lineNumber: 15, text: 'the stamp? Finally, what is the condition' },
    { lineNumber: 16, text: 'of the stamp? If a stamp has a low print' },
    { text: 'run, a popular picture or design, and is in' },
    { text: 'excellent condition, this stamp may be' },
    { lineNumber: 19, text: 'worth a lot of money. In 1980, a one-cent' },
    { text: 'British Guinea stamp issued in 1856 went' },
    { text: 'for $935,000!' },
  ],

  passageParagraphs: [
    'Would you be worried if your classmate told you that he was a philatelist? Would you call a doctor or call the police? Actually, there is no reason to be concerned. A philatelist is just a person who collects stamps!',
    'Stamp collecting has been around for well over 150 years. People began collecting stamps soon after adhesive postage stamps (stamps with glue on the back) were introduced in London in 1840. Today, according to Boys’ Life magazine, stamp collecting is the most practiced hobby in the world.',
    'Some people collect stamps just for fun. These people may just want to collect stamps with animals or famous people on them. Or maybe they want to collect all the stamps issued by one particular country. Other people collect stamps that they think will be valuable down the road. Such collectors ask three questions to determine if a stamp is worth collecting and what its value might be.',
    'First, how many of a particular stamp were made? Next, how popular is the stamp? Finally, what is the condition of the stamp? If a stamp has a low print run, a popular picture or design, and is in excellent condition, this stamp may be worth a lot of money. In 1980, a one-cent British Guinea stamp issued in 1856 went for $935,000!',
  ],

  glossary: [
    { line: 5, word: 'adhesive', definition: 'sticky; coated with glue', vietnameseMeaning: 'có chất dính / có keo dán' },
    { line: 5, word: 'postage', definition: 'related to the post or post office', vietnameseMeaning: 'thuộc về bưu chính / cước bưu điện' },
    { line: 6, word: 'introduce', definition: 'to bring into use', vietnameseMeaning: 'đưa vào áp dụng lần đầu' },
    { line: 10, word: 'issue', definition: 'to produce for use', vietnameseMeaning: 'phát hành' },
    { line: 16, word: 'print run', definition: 'the number made', vietnameseMeaning: 'số lượng bản in' },
    { line: 19, word: 'worth', definition: 'equal in value to', vietnameseMeaning: 'có giá trị bằng' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What does a philatelist enjoy?',
      options: [
        { key: 'a', text: 'Collecting stamps' },
        { key: 'b', text: 'Determining the value of things' },
        { key: 'c', text: 'Writing letters' },
        { key: 'd', text: 'Introducing new stamps' },
      ],
      correctAnswer: 'a',
      explanation: 'Lines 2-3 define a philatelist as someone who collects postage stamps.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'According to the reading, which of the following is true?',
      options: [
        { key: 'a', text: 'People in the 1800s collected stamps.' },
        { key: 'b', text: 'The first stamps were made in America.' },
        { key: 'c', text: 'Boys’ Life is a magazine for philatelists.' },
        { key: 'd', text: 'Most people collect stamps with people on them.' },
      ],
      correctAnswer: 'a',
      explanation: 'Lines 4-6 state people began collecting stamps shortly after they were introduced in London in 1840 (the 1800s).',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'What determines a stamp’s value?',
      options: [
        { key: 'a', text: 'Quantity' },
        { key: 'b', text: 'Popularity' },
        { key: 'c', text: 'Condition' },
        { key: 'd', text: 'All of the above' },
      ],
      correctAnswer: 'd',
      explanation: 'Lines 13-16 list all three critical criteria: quantity printed (print run), popularity, and physical condition.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'What does it mean if a stamp has a low print run?',
      options: [
        { key: 'a', text: 'It was made by Boys’ Life magazine.' },
        { key: 'b', text: 'It has a picture of an animal on it.' },
        { key: 'c', text: 'It is in excellent condition.' },
        { key: 'd', text: 'Not many were made.' },
      ],
      correctAnswer: 'd',
      explanation: 'A low print run means only a limited number of copies were manufactured.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'Why was the 1856 British Guinea stamp worth so much?',
      options: [
        { key: 'a', text: 'It was old and rare.' },
        { key: 'b', text: 'People liked it.' },
        { key: 'c', text: 'It was in good condition.' },
        { key: 'd', text: 'All of the above' },
      ],
      correctAnswer: 'd',
      explanation: 'Its extreme rarity, age, iconic status, and preserved condition culminated in its $935,000 auction value.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'well over',
      definition: 'substantially more than; a large amount over',
      bookExample: 'That jacket is well over a hundred dollars.',
      sentencePrompt: 'His grandfather is [BLANK] ninety years old.',
      correctAnswer: 'well over',
      acceptableAnswers: ['well over'],
      explanation: '“well over” indicates exceeding a quantity or threshold significantly.',
    },
    {
      id: 'id-2',
      idiom: 'down the road',
      definition: 'in the future; at a later point in time',
      bookExample: 'I’m saving this money for a vacation down the road.',
      sentencePrompt: 'I plan on becoming a dentist [BLANK].',
      correctAnswer: 'down the road',
      acceptableAnswers: ['down the road'],
      explanation: '“down the road” idiomatic phrase for future events.',
    },
    {
      id: 'id-3',
      idiom: 'go for',
      definition: 'to cost or sell for a specified price',
      bookExample: 'That painting went for one million dollars!',
      sentencePrompt: 'Today, the artist’s paintings [BLANK] hundreds of dollars.',
      correctAnswer: 'go for',
      acceptableAnswers: ['go for'],
      explanation: '“go for” denotes fetched price in markets or auctions.',
    },
  ],

  summary: {
    instruction: 'Paraphrase the paired sentences from the passage to complete the summary.',
    wordBank: [
      'the most practiced hobby in the world',
      'with certain pictures or stamps from a particular country',
      'with low print runs',
      'have popular designs',
      'are in excellent condition',
    ],
    passageTemplate: `1. After the first adhesive stamps were issued in England in the 1800s, stamp collecting became [BLANK_0].
2. People who enjoy collecting stamps for fun might focus on stamps [BLANK_1].
3. Collectors interested in valuable stamps might look for ones [BLANK_2], ones that [BLANK_3], and ones that [BLANK_4].`,
    correctAnswers: [
      'the most practiced hobby in the world',
      'with certain pictures or stamps from a particular country',
      'with low print runs',
      'have popular designs',
      'are in excellent condition',
    ],
    vietnameseTranslation: 'Tóm tắt bài đọc: Sau khi những con tem dán keo đầu tiên ra mắt ở Anh vào thế kỷ 19, sưu tầm tem đã trở thành sở thích phổ biến nhất trên thế giới. Người chơi tem giải trí thường tập trung vào hình vẽ yêu thích hoặc theo từng quốc gia. Trong khi đó, các nhà sưu tầm tem giá trị tìm kiếm những con tem có số lượng in ít, thiết kế được ưa chuộng và tình trạng bảo quản hoàn hảo.',
  },

  listeningDictation: {
    dialogTitle: 'A Great Gift',
    audioUrl: '/audio/rc1/36-.mp3',
    trackNumber: 36,
    speakers: [
      {
        speaker: 'Man',
        lines: [{ text: 'My grandfather just gave me an old stamp. It’s called a Hawaiian Missionary. Let’s look on the Internet and see how much it’s worth!' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Why does it have such a strange name, John?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'These stamps were first used by Christian missionaries living in Hawaii. They used the stamps to send letters back to the United States.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'This Internet site says that the rarest Hawaiian Missionary stamp is the two-cent stamp. Only sixteen copies of that stamp still exist! Which one do you have?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'I don’t know. Let’s look! Yes, it is the two-cent stamp!' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'John, this stamp website says that your stamp is worth about $760,000!' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Wow!' }],
      },
    ],
    fullTranscript: `Man: My grandfather just gave me an old stamp. It’s called a Hawaiian Missionary. Let’s look on the Internet and see how much it’s worth!
Woman: Why does it have such a strange name, John?
Man: These stamps were first used by Christian missionaries living in Hawaii. They used the stamps to send letters back to the United States.
Woman: This Internet site says that the rarest Hawaiian Missionary stamp is the two-cent stamp. Only sixteen copies of that stamp still exist! Which one do you have?
Man: I don’t know. Let’s look! Yes, it is the two-cent stamp!
Woman: John, this stamp website says that your stamp is worth about $760,000!
Man: Wow!`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: '1. The man’s stamp has a picture of a Hawaiian person on it.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'False',
        explanation: 'The stamp was named Hawaiian Missionary because it was used by Christian missionaries, not because of a picture of a Hawaiian person (Answer Key: False).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: '2. There are only sixteen copies of one kind of these stamps in the world.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'The woman quotes that only sixteen copies of the two-cent issue still exist (Answer Key: True).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: '3. The man’s stamp is only worth about two cents.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'False',
        explanation: 'Although its face value was two cents, its collector value is $760,000 (Answer Key: False).',
      },
    ],
  },

  grammar: {
    title: 'Present Perfect',
    ruleExplanation:
      'Present perfect tense (have/has + past participle) or present perfect continuous (have/has been + V-ing) expresses an action that began in the past and continues up to the present.',
    sampleSentences: [
      'Stamp collecting has been around for well over 150 years.',
      'People have been collecting stamps since adhesive postage stamps were introduced in London in 1840.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'Stamp collecting',
        options: ['was', 'has been'],
        correctAnswer: 'has been',
        sentenceAfter: 'around for well over 150 years.',
        explanation: 'Time duration “for well over 150 years” calls for present perfect has been.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'People',
        options: ['have been collecting', 'were collecting'],
        correctAnswer: 'have been collecting',
        sentenceAfter: 'stamps since adhesive postage stamps were introduced in London in 1840.',
        explanation: 'Preposition “since” marks an ongoing span requiring present perfect continuous.',
      },
    ],
  },

  guidedWriting: {
    title: 'My Collection',
    promptQuestions: [
      '(1) What do you like to collect?',
      '(2) Why do you like to collect this?',
      '(3) How long have you been collecting this?',
      '(4) How many do you have?',
      '(5) What is your favorite one?',
    ],
    exampleText:
      'I like to collect coins. I collect coins because they are small and interesting to look at. I have been collecting coins for five years. I have about 100 coins from over 20 different countries. My favorite coin is from Ireland.',
    suggestedAnswers: [
      {
        question: 'What do you collect and why?',
        sample: 'I like to collect vintage vinyl records because I appreciate the warm analogue sound and cover artwork.',
      },
      {
        question: 'How long have you collected them, how many do you have, and which is your favorite?',
        sample: 'I have been collecting them for four years and now own sixty albums. My favorite is a 1973 Beatles original record.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'He is a(n) _______ boy in our school. Everyone likes him.',
      options: [
        { key: 'a', text: 'famous' },
        { key: 'b', text: 'popular' },
        { key: 'c', text: 'excellent' },
        { key: 'd', text: 'particular' },
      ],
      correctAnswer: 'b',
      explanation: '“popular” means well-liked by many people.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'This _______ works well. It can stick anything together.',
      options: [
        { key: 'a', text: 'stamp' },
        { key: 'b', text: 'magazine' },
        { key: 'c', text: 'adhesive' },
        { key: 'd', text: 'postage' },
      ],
      correctAnswer: 'c',
      explanation: 'A substance that binds or glues materials together is an “adhesive”.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: '“Are you _______ about this class?” “No, I think I did well on the midterm exams.”',
      options: [
        { key: 'a', text: 'determined' },
        { key: 'b', text: 'excellent' },
        { key: 'c', text: 'collected' },
        { key: 'd', text: 'concerned' },
      ],
      correctAnswer: 'd',
      explanation: '“concerned about” means worried or anxious.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'The government _______ the tax rate for the country.',
      options: [
        { key: 'a', text: 'determines' },
        { key: 'b', text: 'introduces' },
        { key: 'c', text: 'prints' },
        { key: 'd', text: 'practices' },
      ],
      correctAnswer: 'a',
      explanation: '“determines” means formally decides or establishes.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'The government _______ new money each year.',
      options: [
        { key: 'a', text: 'issues' },
        { key: 'b', text: 'determines' },
        { key: 'c', text: 'collects' },
        { key: 'd', text: 'practices' },
      ],
      correctAnswer: 'a',
      explanation: '“issues” means officially produces and circulates currency.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'He likes that _______ restaurant. It has excellent food from Greece.',
      options: [
        { key: 'a', text: 'condition' },
        { key: 'b', text: 'valuable' },
        { key: 'c', text: 'spicy' },
        { key: 'd', text: 'ethnic' },
      ],
      correctAnswer: 'd',
      explanation: '“ethnic” designates distinctive national or cultural culinary traditions.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'I have no _______ to worry. I have done everything I should.',
      options: [
        { key: 'a', text: 'activity' },
        { key: 'b', text: 'reason' },
        { key: 'c', text: 'test' },
        { key: 'd', text: 'information' },
      ],
      correctAnswer: 'b',
      explanation: '“no reason to worry” means there is no cause for anxiety.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'The _______ of that artwork is very high.',
      options: [
        { key: 'a', text: 'valuable' },
        { key: 'b', text: 'value' },
        { key: 'c', text: 'valuing' },
      ],
      correctAnswer: 'b',
      explanation: 'Definite noun phrase takes head noun “value”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'You must go to school for many years before you can _____ medicine.',
      options: [
        { key: 'a', text: 'practicing' },
        { key: 'b', text: 'practitioner' },
        { key: 'c', text: 'practice' },
      ],
      correctAnswer: 'c',
      explanation: 'Modal verb “can” takes base infinitive verb “practice”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'My sister has a very large _______ of books.',
      options: [
        { key: 'a', text: 'collect' },
        { key: 'b', text: 'collection' },
        { key: 'c', text: 'collector' },
      ],
      correctAnswer: 'b',
      explanation: 'Noun phrase with adjective “large” requires the noun “collection”.',
    },
  ],
};
