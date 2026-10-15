import { UnitConfig } from '../../types';

export const unit12: UnitConfig = {
  unitNumber: 12,
  slug: 'borrowed-words',
  title: 'Borrowed Words',
  category: 'Culture and History',
  audioReadingUrl: '/audio/rc1/23-.mp3',
  audioListeningUrl: '/audio/rc1/24-.mp3',
  wordCount: 241,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. Do you know of any English words that are used in your native language?',
        sampleAnswer: 'There are some English words used in my language, for example, computer, sandwich, and internet.',
        hint: 'Think of common loanwords in technology or modern dining.',
      },
      {
        id: 'pr-2',
        question: '2. Do you know any English words that came from other languages?',
        sampleAnswer: 'There are many words in English from other languages. For example, résumé is from French, and piano is from Italian.',
        hint: 'Consider musical terms, gourmet foods, or cultural concepts.',
      },
      {
        id: 'pr-3',
        question: '3. Why do you think a language borrows words from another language?',
        sampleAnswer: 'Languages borrow words due to global trade, cultural interaction, or when another language has the exact word for a new invention.',
        hint: 'Think of cross-cultural communication and historical contact.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word or phrase.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'Originally, many English words came from German.',
        underlinedWord: 'Originally',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'nguồn gốc ban đầu',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'The flavor of ketchup is like sweet tomatoes.',
        underlinedWord: 'flavor',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'hương vị',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'Anyone can use public restrooms.',
        underlinedWord: 'public',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'công cộng, mở cho mọi người',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'Professional athletes in Finland relaxed in saunas after training.',
        underlinedWord: 'athletes',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'vận động viên thể thao',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'In general, I like Italian food very much.',
        underlinedWord: 'In general',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'nhìn chung, thông thường',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: '“Can you describe him?” “Well, he’s very tall.”',
        underlinedWord: 'describe',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'miêu tả, thuật lại',
      },
    ],
    definitions: [
      { letter: 'a', text: 'taste' },
      { letter: 'b', text: 'people who play sports' },
      { letter: 'c', text: 'in the beginning' },
      { letter: 'd', text: 'not private; for any person' },
      { letter: 'e', text: 'tell about; explain' },
      { letter: 'f', text: 'in most cases' },
    ],
  },

  passageNumberedLines: [
    { text: 'Do you often use shampoo or put ketchup on your food? Have you ever visited' },
    { text: 'a sauna? If you think these words are originally English, you’d better think' },
    { lineNumber: 3, text: 'again. In fact, each of these words comes from a different language!' },
    { lineNumber: 4, text: 'Shampoo, for example, is actually a word from the Hindi language in India. This' },
    { lineNumber: 5, text: 'word originally meant “massage.” In hair shops in India, barbers massage your' },
    { text: 'head while washing your hair. Over time, British people in India used this word to' },
    { lineNumber: 7, text: 'mean a liquid that cleans hair.' },
    { text: 'Almost everyone knows what ketchup is. People all over the world like to pour' },
    { lineNumber: 9, text: 'this tomato sauce on French fries or sandwiches. This word is originally Chinese' },
    { lineNumber: 10, text: '(from ketsiap, a fish sauce). In the 1600s, British and Dutch sailors brought this fish' },
    { text: 'sauce to Europe. Over time, people changed the sauce by adding tomato flavor to it,' },
    { lineNumber: 12, text: 'but the name basically stayed the same.' },
    { text: 'Sauna, a popular type of public steam room and shower facility, comes from' },
    { lineNumber: 14, text: 'the Finnish language. During one of the European Olympics, athletes from Britain' },
    { lineNumber: 15, text: 'and Germany saw Finnish athletes use saunas after training. Later, the general' },
    { text: 'public all over Europe started using this style of bathing, too. Now, we still use this' },
    { lineNumber: 17, text: 'word to describe all kinds of steam rooms.' },
    { text: 'English is full of many wonderful borrowed words from many languages.' },
    { text: 'Perhaps English should change its name to Eng-hin-chi-fin-fre-ger-ital-span-ish!' },
  ],

  passageParagraphs: [
    'Do you often use shampoo or put ketchup on your food? Have you ever visited a sauna? If you think these words are originally English, you’d better think again. In fact, each of these words comes from a different language!',
    'Shampoo, for example, is actually a word from the Hindi language in India. This word originally meant “massage.” In hair shops in India, barbers massage your head while washing your hair. Over time, British people in India used this word to mean a liquid that cleans hair.',
    'Almost everyone knows what ketchup is. People all over the world like to pour this tomato sauce on French fries or sandwiches. This word is originally Chinese (from ketsiap, a fish sauce). In the 1600s, British and Dutch sailors brought this fish sauce to Europe. Over time, people changed the sauce by adding tomato flavor to it, but the name basically stayed the same.',
    'Sauna, a popular type of public steam room and shower facility, comes from the Finnish language. During one of the European Olympics, athletes from Britain and Germany saw Finnish athletes use saunas after training. Later, the general public all over Europe started using this style of bathing, too. Now, we still use this word to describe all kinds of steam rooms.',
    'English is full of many wonderful borrowed words from many languages. Perhaps English should change its name to Eng-hin-chi-fin-fre-ger-ital-span-ish!',
  ],

  glossary: [
    { line: 5, word: 'massage', definition: 'to rub the body in order to relax it', vietnameseMeaning: 'xoa bóp, mát-xa' },
    { line: 5, word: 'barber', definition: 'a person who cuts and styles hair, especially for men', vietnameseMeaning: 'thợ cắt tóc' },
    { line: 7, word: 'liquid', definition: 'a fluid substance', vietnameseMeaning: 'chất lỏng' },
    { line: 10, word: 'Dutch', definition: 'of or relating to the Netherlands', vietnameseMeaning: 'thuộc về Hà Lan' },
    { line: 13, word: 'steam', definition: 'hot water vapor', vietnameseMeaning: 'hơi nước nóng' },
    { line: 13, word: 'facility', definition: 'a place for some service', vietnameseMeaning: 'cơ sở vật chất, tiện nghi' },
    { line: 14, word: 'Finnish', definition: 'of or relating to Finland', vietnameseMeaning: 'thuộc về Phần Lan' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is the main idea of this reading?',
      options: [
        { key: 'a', text: 'English words in other languages' },
        { key: 'b', text: 'Words from India' },
        { key: 'c', text: 'Usage of words from other languages in English' },
        { key: 'd', text: 'The most popular borrowed words' },
      ],
      correctAnswer: 'c',
      explanation: 'The reading explains how everyday English words like shampoo, ketchup, and sauna originated from other languages.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'Which of the following words is from Hindi?',
      options: [
        { key: 'a', text: 'Shampoo' },
        { key: 'b', text: 'Sauna' },
        { key: 'c', text: 'Ketchup' },
        { key: 'd', text: 'Massage' },
      ],
      correctAnswer: 'a',
      explanation: 'Lines 4-5 state that “Shampoo, for example, is actually a word from the Hindi language in India.”',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'What did the original word for ketchup mean?',
      options: [
        { key: 'a', text: 'A red tomato sauce' },
        { key: 'b', text: 'A hair shop' },
        { key: 'c', text: 'Fish' },
        { key: 'd', text: 'A kind of fish sauce' },
      ],
      correctAnswer: 'd',
      explanation: 'Lines 9-10 mention that ketchup originated from Chinese ketsiap, a kind of fish sauce.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'Why did people start to use the word “sauna”?',
      options: [
        { key: 'a', text: 'Athletes made it popular at home.' },
        { key: 'b', text: 'The public liked the Olympics.' },
        { key: 'c', text: 'The Finnish traveled a lot.' },
        { key: 'd', text: 'It was good after training.' },
      ],
      correctAnswer: 'a',
      explanation: 'British and German athletes saw Finnish athletes using saunas, and later the general public started using it (lines 14-16).',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'What does “ital” probably mean in “Eng-hin-chi-fin-fre-ger-ital-span-ish”?',
      options: [
        { key: 'a', text: 'The name of a country' },
        { key: 'b', text: 'The name of a language' },
        { key: 'c', text: 'The name of a group of people' },
        { key: 'd', text: 'The name of people who speak English' },
      ],
      correctAnswer: 'b',
      explanation: 'Each segment refers to a contributing language: Hindi, Chinese, Finnish, French, German, Italian, Spanish.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'over time',
      definition: 'as time passes',
      bookExample: 'Over time, she became a famous model.',
      sentencePrompt: 'Your English skills will improve [BLANK] if you practice hard.',
      correctAnswer: 'over time',
      acceptableAnswers: ['over time'],
      explanation: '“over time” indicates a gradual progression through duration.',
    },
    {
      id: 'id-2',
      idiom: 'pour (something) on',
      definition: 'to cover; to add on top of something',
      bookExample: 'Don’t pour on too much glue. Use just a little.',
      sentencePrompt: 'I like to [BLANK] chocolate sauce [BLANK] my ice cream sundae.',
      correctAnswer: 'pour, on',
      acceptableAnswers: ['pour, on', 'pour on'],
      explanation: '“pour on” means to pour a liquid over the top of food or a surface.',
    },
    {
      id: 'id-3',
      idiom: 'full of',
      definition: 'having many or much of something',
      bookExample: 'The room was full of spiders.',
      sentencePrompt: 'Joanne was [BLANK] joy on her birthday.',
      correctAnswer: 'full of',
      acceptableAnswers: ['full of'],
      explanation: '“full of” denotes being filled with an emotion or items.',
    },
  ],

  summary: {
    instruction: 'Paraphrase the paired sentences from the reading passage to complete the summary.',
    wordBank: [
      '“shampoo” from Hindi',
      '“ketchup” from Chinese',
      '“sauna” from Finnish',
    ],
    passageTemplate: `1. English borrowed the word [BLANK_0], in which the word meant “to massage a person’s head,” but is now known to mean a liquid that cleans hair.
2. English borrowed the word [BLANK_1], in which the word meant a kind of fish sauce, but people changed it by adding tomato flavor to it.
3. English borrowed the word [BLANK_2], in which the word meant a steam room that Finnish athletes used after training.`,
    correctAnswers: [
      '“shampoo” from Hindi',
      '“ketchup” from Chinese',
      '“sauna” from Finnish',
    ],
    vietnameseTranslation: 'Tóm tắt bài đọc: Tiếng Anh vay mượn từ vựng từ nhiều ngôn ngữ khác nhau: “shampoo” từ tiếng Hindi (nghĩa gốc là mát-xa đầu), “ketchup” từ tiếng Trung (nghĩa gốc là một loại nước mắm), và “sauna” từ tiếng Phần Lan (phòng xông hơi được các vận động viên sử dụng sau tập luyện).',
  },

  listeningDictation: {
    dialogTitle: 'Not Really English',
    audioUrl: '/audio/rc1/24-.mp3',
    trackNumber: 24,
    speakers: [
      {
        speaker: 'Man',
        lines: [{ text: 'Can you speak any other languages?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Well, I know some African words.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'What are they?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Cola and zombie.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Get out! Those are both English words. I know that Coca-Cola was first made in the US. And every horror movie has zombies in it!' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'No, really. These words were originally borrowed from Africa. In fact, Coca-Cola was originally made from the kola nut, which came from Africa.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Is that right? What about zombie?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Zombie originally was the name of a snake god. People would eat special plants to celebrate the god. Then they became like a “zombie.”' }],
      },
    ],
    fullTranscript: `Man: Can you speak any other languages?
Woman: Well, I know some African words.
Man: What are they?
Woman: Cola and zombie.
Man: Get out! Those are both English words. I know that Coca-Cola was first made in the US. And every horror movie has zombies in it!
Woman: No, really. These words were originally borrowed from Africa. In fact, Coca-Cola was originally made from the kola nut, which came from Africa.
Man: Is that right? What about zombie?
Woman: Zombie originally was the name of a snake god. People would eat special plants to celebrate the god. Then they became like a “zombie.”`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: '1. The words “cola” and “zombie” originally come from African languages.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'The woman explains that both words originated in Africa (Answer Key: True).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: '2. In its original language, the word “kola” is the name of a nut.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'She notes that Coca-Cola was originally flavored with African kola nuts (Answer Key: True).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: '3. Originally, the word “zombie” described a kind of plant that people ate.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'False',
        explanation: 'Zombie was originally the name of a snake god, not a plant (Answer Key: False).',
      },
    ],
  },

  grammar: {
    title: 'Participles as Adjectives',
    ruleExplanation:
      'A participle can function as an adjective to describe a noun, and it also can be used to form a passive predicate after a be verb. Do not confuse it with a past form of a verb.',
    sampleSentences: [
      'Later, the general public all over Europe started using this bathing style, too.',
      'English is full of many wonderful borrowed words from many languages.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'Later, the general public all over Europe started using this',
        options: ['bathing', 'bathed'],
        correctAnswer: 'bathing',
        sentenceAfter: 'style, too.',
        explanation: '“bathing style” uses the present participle to denote the type or activity.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'English is full of many wonderful',
        options: ['borrowing', 'borrowed'],
        correctAnswer: 'borrowed',
        sentenceAfter: 'words from many languages.',
        explanation: '“borrowed words” uses the past participle with passive sense (words that were borrowed).',
      },
    ],
  },

  guidedWriting: {
    title: 'A Borrowed Word',
    promptQuestions: [
      '(1) What is another borrowed word in English?',
      '(2) Where did this word come from?',
      '(3) Where do/did speakers of this language live?',
      '(4) What does this word mean?',
    ],
    exampleText:
      'Another borrowed word in English is tomato. This word came from the Aztec Indians. They lived in Central America. This word means the red fruit or vegetable that people like to eat.',
    suggestedAnswers: [
      {
        question: 'What is another borrowed word and where did it come from?',
        sample: 'Another borrowed word in English is sushi, which came from the Japanese language.',
      },
      {
        question: 'Where did speakers live and what does it mean?',
        sample: 'Speakers of Japanese live in Japan in East Asia. The word refers to dishes made with specially seasoned rice and fresh seafood.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'It is not easy to _______ the taste of the dish that we had, but it was delicious.',
      options: [
        { key: 'a', text: 'disagree' },
        { key: 'b', text: 'mean' },
        { key: 'c', text: 'bring' },
        { key: 'd', text: 'describe' },
      ],
      correctAnswer: 'd',
      explanation: '“describe” means to explain or tell what something is like.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'My sister has strong hands, so she _______ my sore neck very well.',
      options: [
        { key: 'a', text: 'massages' },
        { key: 'b', text: 'washes' },
        { key: 'c', text: 'pours on' },
        { key: 'd', text: 'detects' },
      ],
      correctAnswer: 'a',
      explanation: '“massages” means rubs muscles to ease soreness and promote relaxation.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'We poured water on the hot rocks in the sauna to make _____.',
      options: [
        { key: 'a', text: 'liquid' },
        { key: 'b', text: 'shower' },
        { key: 'c', text: 'steam' },
        { key: 'd', text: 'ice' },
      ],
      correctAnswer: 'c',
      explanation: 'Water vapor rising from hot sauna stones is “steam”.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'The river becomes deeper in spring when the ice turns to _______.',
      options: [
        { key: 'a', text: 'liquid' },
        { key: 'b', text: 'bath' },
        { key: 'c', text: 'steam' },
        { key: 'd', text: 'sauce' },
      ],
      correctAnswer: 'a',
      explanation: 'When ice melts in warmer weather, it turns into “liquid” water.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'The _______ offered many good services.',
      options: [
        { key: 'a', text: 'language' },
        { key: 'b', text: 'room' },
        { key: 'c', text: 'facility' },
        { key: 'd', text: 'flavor' },
      ],
      correctAnswer: 'c',
      explanation: 'A place designed to provide specific amenities or services is a “facility”.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'That’s a private club for athletes. Only _______ can go in there.',
      options: [
        { key: 'a', text: 'Germans' },
        { key: 'b', text: 'words' },
        { key: 'c', text: 'professionals' },
        { key: 'd', text: 'people' },
      ],
      correctAnswer: 'c',
      explanation: '“professionals” are individuals paid for specialized athletic careers.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'This website gives information about saunas for the _______ public.',
      options: [
        { key: 'a', text: 'original' },
        { key: 'b', text: 'borrowed' },
        { key: 'c', text: 'normal' },
        { key: 'd', text: 'general' },
      ],
      correctAnswer: 'd',
      explanation: '“the general public” denotes the populace as a whole.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: '_______ is more important at my school than mathematics.',
      options: [
        { key: 'a', text: 'Athletes' },
        { key: 'b', text: 'Athletically' },
        { key: 'c', text: 'Athletics' },
      ],
      correctAnswer: 'c',
      explanation: 'The subject noun phrase requires the singular activity noun “Athletics”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'I used strawberry _______ to make this cake.',
      options: [
        { key: 'a', text: 'flavor' },
        { key: 'b', text: 'flavorless' },
        { key: 'c', text: 'flavored' },
      ],
      correctAnswer: 'a',
      explanation: 'Noun “flavor” acts as the direct object of the verb used.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'He _______ his trip as boring.',
      options: [
        { key: 'a', text: 'describing' },
        { key: 'b', text: 'description' },
        { key: 'c', text: 'described' },
      ],
      correctAnswer: 'c',
      explanation: 'Past tense main verb “described” is required after subject He.',
    },
  ],
};
