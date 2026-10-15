import { UnitConfig } from '../../types';

export const unit17: UnitConfig = {
  unitNumber: 17,
  slug: 'seeing-red',
  title: 'Seeing Red',
  category: 'Science Facts',
  audioReadingUrl: '/audio/rc1/33-.mp3',
  audioListeningUrl: '/audio/rc1/34-.mp3',
  wordCount: 231,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. What color is your classroom? Is it a good color for studying?',
        sampleAnswer: 'My classroom is painted light blue and cream, which fosters a quiet and focused environment.',
        hint: 'Describe wall colors and their psychological influence on concentration.',
      },
      {
        id: 'pr-2',
        question: '2. What colors make you feel relaxed?',
        sampleAnswer: 'Shades of light blue and forest green make me feel calm and tranquil.',
        hint: 'Consider cool and nature-inspired hues.',
      },
      {
        id: 'pr-3',
        question: '3. What color clothes do you usually buy?',
        sampleAnswer: 'I usually purchase navy, charcoal, or dark green apparel because they look professional and versatile.',
        hint: 'Think of wardrobe palettes for casual or formal occasions.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'Pictures of green fields and blue lakes give me a peaceful feeling.',
        underlinedWord: 'peaceful',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'bình yên, thanh thản',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'It is too noisy here. I can’t concentrate on my work.',
        underlinedWord: 'concentrate',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'tập trung tư tưởng',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'From her behavior, I did not get the sense that she was a good person for this job.',
        underlinedWord: 'sense',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'cảm giác, ấn tượng',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'The speaker’s words had a powerful effect on the audience.',
        underlinedWord: 'powerful',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'mạnh mẽ, có sức ảnh hưởng lớn',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'I have confidence the new president will be a great leader.',
        underlinedWord: 'confidence',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'sự tin tưởng, lòng tin cậy',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'Her appearance was very clean and tidy.',
        underlinedWord: 'appearance',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'diện mạo, vẻ bề ngoài',
      },
    ],
    definitions: [
      { letter: 'a', text: 'calm; happy' },
      { letter: 'b', text: 'feeling' },
      { letter: 'c', text: 'large; strong' },
      { letter: 'd', text: 'trust; a sure feeling' },
      { letter: 'e', text: 'focus; think deeply' },
      { letter: 'f', text: 'looks' },
    ],
  },

  passageNumberedLines: [
    { text: 'Bright colors stir up active feelings. For example, the color red can cause' },
    { text: 'people to feel excited. In fact, red can even make a person feel hungrier.' },
    { lineNumber: 3, text: 'Yellow can increase energy. Therefore, a room with strong red and yellow' },
    { text: 'colors, would be a good place to eat a lot of food quickly. On the other hand, darker' },
    { lineNumber: 5, text: 'colors, like blue and green, are peaceful. The color blue can help people calm down.' },
    { text: 'So, a blue room can be a good place to study, since people can concentrate more easily.' },
    { lineNumber: 7, text: 'However, it is easier to nod off in a blue room than in a red one.' },
    { text: 'The colors of clothes can also affect feelings. Black and deep-blue clothes can' },
    { lineNumber: 9, text: 'produce a sense of strength and seriousness. Therefore, a person in a black suit can' },
    { text: 'seem like a leader more easily than one wearing white. If a person is wearing a dark' },
    { lineNumber: 11, text: 'suit and a red tie, he or she may seem both powerful and energetic. Perhaps this is' },
    { lineNumber: 12, text: 'why many politicians and businesspeople wear dark suits with red ties. Brown and' },
    { text: 'green clothes can produce a sense of confidence, which means it may seem easier' },
    { lineNumber: 14, text: 'to trust a person wearing such colors. Therefore, many people choose to wear green' },
    { lineNumber: 15, text: 'or brown clothes for meetings or interviews.' },
    { text: 'Choice of color, for rooms as well as clothes, is not simply about appearance.' },
  ],

  passageParagraphs: [
    'Bright colors stir up active feelings. For example, the color red can cause people to feel excited. In fact, red can even make a person feel hungrier. Yellow can increase energy. Therefore, a room with strong red and yellow colors, would be a good place to eat a lot of food quickly. On the other hand, darker colors, like blue and green, are peaceful. The color blue can help people calm down. So, a blue room can be a good place to study, since people can concentrate more easily. However, it is easier to nod off in a blue room than in a red one.',
    'The colors of clothes can also affect feelings. Black and deep-blue clothes can produce a sense of strength and seriousness. Therefore, a person in a black suit can seem like a leader more easily than one wearing white. If a person is wearing a dark suit and a red tie, he or she may seem both powerful and energetic. Perhaps this is why many politicians and businesspeople wear dark suits with red ties. Brown and green clothes can produce a sense of confidence, which means it may seem easier to trust a person wearing such colors. Therefore, many people choose to wear green or brown clothes for meetings or interviews.',
    'Choice of color, for rooms as well as clothes, is not simply about appearance.',
  ],

  glossary: [
    { line: 1, word: 'active', definition: 'energetic; busy', vietnameseMeaning: 'năng động, sôi nổi' },
    { line: 3, word: 'energy', definition: 'power; strength', vietnameseMeaning: 'năng lượng, sinh lực' },
    { line: 8, word: 'deep-blue', definition: 'dark blue, almost black', vietnameseMeaning: 'xanh nước biển thẫm' },
    { line: 9, word: 'seriousness', definition: 'a mood of formality and importance', vietnameseMeaning: 'sự trang nghiêm, đứng đắn' },
    { line: 11, word: 'energetic', definition: 'full of energy', vietnameseMeaning: 'tràn đầy năng lượng' },
    { line: 12, word: 'politician', definition: 'a person working as a leader in the government', vietnameseMeaning: 'chính trị gia' },
    { line: 15, word: 'interview', definition: 'a meeting where people try to get a job', vietnameseMeaning: 'buổi phỏng vấn xin việc' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is the main idea of this reading?',
      options: [
        { key: 'a', text: 'Colors are important.' },
        { key: 'b', text: 'Managers should wear black.' },
        { key: 'c', text: 'Colors can affect feelings.' },
        { key: 'd', text: 'People do not see colors well.' },
      ],
      correctAnswer: 'c',
      explanation: 'The reading illustrates how environmental and clothing colors impact human psychological states and emotions.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'Where would red and yellow be most useful?',
      options: [
        { key: 'a', text: 'In an office' },
        { key: 'b', text: 'In a health club' },
        { key: 'c', text: 'In a department store' },
        { key: 'd', text: 'In a fast food restaurant' },
      ],
      correctAnswer: 'd',
      explanation: 'Lines 3-5 state that red and yellow stimulate hunger and energy, making people eat rapidly.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'According to the reading, what would be the best color for a bedroom?',
      options: [
        { key: 'a', text: 'Blue' },
        { key: 'b', text: 'Yellow' },
        { key: 'c', text: 'Grey' },
        { key: 'd', text: 'Brown' },
      ],
      correctAnswer: 'a',
      explanation: 'Lines 5-7 note that blue is tranquil and calming, making it easier to nod off to sleep.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'According to the reading, green clothes would be most useful for which person?',
      options: [
        { key: 'a', text: 'A professor' },
        { key: 'b', text: 'Someone looking for a job' },
        { key: 'c', text: 'A manager of a large department' },
        { key: 'd', text: 'A doctor' },
      ],
      correctAnswer: 'b',
      explanation: 'Lines 12-15 state that green evokes confidence and trust, making it ideal for job interviews.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'Why would a president wear a black suit?',
      options: [
        { key: 'a', text: 'To seem powerful' },
        { key: 'b', text: 'To scare people' },
        { key: 'c', text: 'To make people feel relaxed' },
        { key: 'd', text: 'To look better in pictures' },
      ],
      correctAnswer: 'a',
      explanation: 'Lines 8-10 mention black produces a sense of strength, seriousness, and leadership.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'stir up',
      definition: 'to produce a strong reaction or provoke feelings',
      bookExample: 'The photograph of my mother stirred up many happy memories.',
      sentencePrompt: 'Don’t [BLANK] problems with the other students.',
      correctAnswer: 'stir up',
      acceptableAnswers: ['stir up'],
      explanation: '“stir up” means incite or provoke agitation.',
    },
    {
      id: 'id-2',
      idiom: 'calm down',
      definition: 'to become relaxed and tranquil',
      bookExample: 'I couldn’t calm down until I saw my grade.',
      sentencePrompt: 'A good way to [BLANK] a child is to sing to him or her.',
      correctAnswer: 'calm down',
      acceptableAnswers: ['calm down'],
      explanation: '“calm down” means soothe and bring emotional peace.',
    },
    {
      id: 'id-3',
      idiom: 'nod off',
      definition: 'to fall asleep gradually or unintentionally',
      bookExample: 'Please don’t nod off in class!',
      sentencePrompt: 'The movie starts at midnight. If it is boring, I might [BLANK].',
      correctAnswer: 'nod off',
      acceptableAnswers: ['nod off'],
      explanation: '“nod off” describes dozing off into sleep.',
    },
  ],

  summary: {
    instruction: 'Scan the passage and complete the chart with the correct information from the word bank.',
    wordBank: ['confident', 'increase', 'meeting', 'peaceful', 'powerful', 'strong'],
    passageTemplate: `Colors and Their Effects:
• Red and yellow: Excited, hungry, 1. [BLANK_0] energy -> A fast food restaurant
• Blue and green: Calm, 2. [BLANK_1] -> A study room
• Deep-blue and black: Serious, 3. [BLANK_2] -> Clothes for a leader (dark suit + red tie = 4. [BLANK_3] + energetic)
• Brown and green: 5. [BLANK_4] -> Clothes for a 6. [BLANK_5] or interview`,
    correctAnswers: ['increase', 'peaceful', 'strong', 'powerful', 'confident', 'meeting'],
    vietnameseTranslation: 'Tóm tắt bài đọc: Tác động của màu sắc: (1) Đỏ và vàng kích thích hào hứng, đói bụng, gia tăng năng lượng — phù hợp với nhà hàng thức ăn nhanh; (2) Xanh dương và xanh lá tạo cảm giác êm dịu, thanh bình — tốt cho phòng học và phòng ngủ; (3) Xanh thẫm và đen thể hiện sự nghiêm túc, mạnh mẽ, quyền lực — trang phục lãnh đạo; (4) Nâu và xanh lá tạo sự tin tưởng, tự tin — phù hợp cho phỏng vấn và các buổi họp.',
  },

  listeningDictation: {
    dialogTitle: 'A Problem at Work',
    audioUrl: '/audio/rc1/34-.mp3',
    trackNumber: 34,
    speakers: [
      {
        speaker: 'Man',
        lines: [{ text: 'I had a strange day at work.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Why, what was the problem?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Well, my boss was wearing a pink and white suit.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'A pink and white suit? That is a little strange. Why did he wear it?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'I don’t know, maybe he likes those colors. But it made me feel nervous.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'So you think men shouldn’t wear bright-colored clothes?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'They can if they want, but I think a boss should wear dark colors! Pink and white seem too soft and weak.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Maybe you should tell him that.' }],
      },
    ],
    fullTranscript: `Man: I had a strange day at work.
Woman: Why, what was the problem?
Man: Well, my boss was wearing a pink and white suit.
Woman: A pink and white suit? That is a little strange. Why did he wear it?
Man: I don’t know, maybe he likes those colors. But it made me feel nervous.
Woman: So you think men shouldn’t wear bright-colored clothes?
Man: They can if they want, but I think a boss should wear dark colors! Pink and white seem too soft and weak.
Woman: Maybe you should tell him that.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: '1. His boss was wearing a ______ suit.',
        options: [
          { key: 'pink and white', text: 'pink and white' },
          { key: 'dark blue', text: 'dark blue' },
          { key: 'black and red', text: 'black and red' },
          { key: 'green and yellow', text: 'green and yellow' },
        ],
        correctAnswer: 'pink and white',
        explanation: 'The speaker specifically mentions a pink and white suit.',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: '2. The clothes his boss wore made him feel ______.',
        options: [
          { key: 'nervous', text: 'nervous' },
          { key: 'confident', text: 'confident' },
          { key: 'relaxed', text: 'relaxed' },
          { key: 'excited', text: 'excited' },
        ],
        correctAnswer: 'nervous',
        explanation: 'He remarks: “it made me feel nervous.”',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: '3. He thought those colors made his boss look ______.',
        options: [
          { key: 'soft and weak', text: 'soft and weak' },
          { key: 'strong and energetic', text: 'strong and energetic' },
          { key: 'friendly and rich', text: 'friendly and rich' },
          { key: 'smart and professional', text: 'smart and professional' },
        ],
        correctAnswer: 'soft and weak',
        explanation: 'He states: “Pink and white seem too soft and weak.”',
      },
    ],
  },

  grammar: {
    title: 'How to Punctuate Conjunctive Adverbs',
    ruleExplanation:
      'Use a semicolon or period before conjunctive adverbs such as however and therefore in order to separate two independent clauses that are logically related. Conjunctive adverbs are followed by a comma at the start of the clause.',
    sampleSentences: [
      'Yellow can increase energy. Therefore, a room with strong red and yellow colors would be a good place to eat a lot of food quickly.',
      'However, it is easier to nod off in a blue room than in a red one.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'Yellow can increase energy.',
        options: ['Therefore', 'Because'],
        correctAnswer: 'Therefore',
        sentenceAfter: ', a room with strong red and yellow colors would be a good place to eat a lot of food quickly.',
        explanation: '“Therefore” links cause and effect between two separate sentences.',
      },
      {
        id: 'gr-2',
        sentenceBefore: '',
        options: ['However', 'Although'],
        correctAnswer: 'However',
        sentenceAfter: ', it is easier to nod off in a blue room than in a red one.',
        explanation: '“However” functions as a conjunctive adverb set off by a comma at the sentence start.',
      },
    ],
  },

  guidedWriting: {
    title: 'My Favorite Color of Clothing',
    promptQuestions: [
      '(1) What color clothes do you like to wear?',
      '(2) What items of clothing do you have in this color?',
      '(3) Why do you like to wear this color?',
      '(4) Are you wearing this color now?',
    ],
    exampleText:
      'I like to wear green and brown clothes. I have lots of green and brown shirts and pants. I like to wear these colors because they seem casual. However, I am not wearing anything green or brown today.',
    suggestedAnswers: [
      {
        question: 'What color clothes do you like and what items do you have?',
        sample: 'I love wearing dark blue clothing. I have several navy blue shirts, sweaters, and denim jackets.',
      },
      {
        question: 'Why do you like it and are you wearing it now?',
        sample: 'I like it because it looks clean and trustworthy. Yes, I am wearing a navy blue sweater right now.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'You would never guess from his _______ that he is rich.',
      options: [
        { key: 'a', text: 'appearance' },
        { key: 'b', text: 'confidence' },
        { key: 'c', text: 'fortune' },
        { key: 'd', text: 'wealth' },
      ],
      correctAnswer: 'a',
      explanation: '“appearance” refers to the way someone looks or dresses.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'The General Manager is the most _______ woman in our company.',
      options: [
        { key: 'a', text: 'energy' },
        { key: 'b', text: 'large' },
        { key: 'c', text: 'powerful' },
        { key: 'd', text: 'strong' },
      ],
      correctAnswer: 'c',
      explanation: '“powerful” describes someone holding commanding authority.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'Many _______ work in city and state governments before working at the national level.',
      options: [
        { key: 'a', text: 'businesspeople' },
        { key: 'b', text: 'heirs' },
        { key: 'c', text: 'inventors' },
        { key: 'd', text: 'politicians' },
      ],
      correctAnswer: 'd',
      explanation: 'Elected officials serving in government offices are “politicians”.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'This medicine may _______ side effects in some patients.',
      options: [
        { key: 'a', text: 'concentrate' },
        { key: 'b', text: 'produce' },
        { key: 'c', text: 'stir up' },
        { key: 'd', text: 'trust' },
      ],
      correctAnswer: 'b',
      explanation: '“produce” means cause or bring about medical effects.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'The _______ I get when I am at the lake is very peaceful.',
      options: [
        { key: 'a', text: 'belief' },
        { key: 'b', text: 'feeling' },
        { key: 'c', text: 'reason' },
        { key: 'd', text: 'person' },
      ],
      correctAnswer: 'b',
      explanation: 'An emotional or physical sensation is a “feeling”.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'White pants seem to be very _______ this year.',
      options: [
        { key: 'a', text: 'active' },
        { key: 'b', text: 'peaceful' },
        { key: 'c', text: 'popular' },
        { key: 'd', text: 'strong' },
      ],
      correctAnswer: 'c',
      explanation: 'Widely favored and fashionable items are described as “popular”.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'Please close the curtains. The sunlight is too _______.',
      options: [
        { key: 'a', text: 'bright' },
        { key: 'b', text: 'enormous' },
        { key: 'c', text: 'ordinary' },
        { key: 'd', text: 'serious' },
      ],
      correctAnswer: 'a',
      explanation: 'Intense luminous light is described as “bright”.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'The audience reacted _______ to the performance.',
      options: [
        { key: 'a', text: 'strength' },
        { key: 'b', text: 'strong' },
        { key: 'c', text: 'strongly' },
      ],
      correctAnswer: 'c',
      explanation: 'The verb “reacted” is modified by the adverb “strongly”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'The loud noise broke the player’s _______.',
      options: [
        { key: 'a', text: 'concentration' },
        { key: 'b', text: 'concentrate' },
        { key: 'c', text: 'concentrated' },
      ],
      correctAnswer: 'a',
      explanation: 'Possessive noun phrase requires head noun “concentration”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'Although few people thought he could win, the player seemed _______.',
      options: [
        { key: 'a', text: 'confidence' },
        { key: 'b', text: 'confident' },
        { key: 'c', text: 'confidently' },
      ],
      correctAnswer: 'b',
      explanation: 'Linking verb “seemed” is complemented by predicate adjective “confident”.',
    },
  ],
};
