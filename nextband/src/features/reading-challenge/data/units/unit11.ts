import { UnitConfig } from '../../types';

export const unit11: UnitConfig = {
  unitNumber: 11,
  slug: 'mona-who',
  title: 'Mona Who?',
  category: 'Arts and Leisure',
  audioReadingUrl: '/audio/rc1/21-.mp3',
  audioListeningUrl: '/audio/rc1/22-.mp3',
  wordCount: 224,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. What are the names of some famous artists?',
        sampleAnswer: 'Some famous artists are Michelangelo, Rembrandt, van Gogh, and Picasso.',
        hint: 'Think of world-renowned classical and modern painters.',
      },
      {
        id: 'pr-2',
        question: '2. What are they famous for?',
        sampleAnswer: 'Michelangelo is famous for painting chapel ceilings, Rembrandt for portraits, and van Gogh for starry landscapes.',
        hint: 'Consider iconic masterpieces and signature art styles.',
      },
      {
        id: 'pr-3',
        question: '3. Can you name one famous painting?',
        sampleAnswer: 'One famous painting is the Mona Lisa by Leonardo da Vinci, or Starry Night by Vincent van Gogh.',
        hint: 'Recall paintings housed in world museums like the Louvre.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'Do you know her identity?',
        underlinedWord: 'identity',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'danh tính, thân phận',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'Some people propose that the Mona Lisa is not a real woman.',
        underlinedWord: 'propose',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'đề xuất, đưa ra giả thuyết',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'That painting looks familiar to me.',
        underlinedWord: 'familiar',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'quen thuộc',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'That picture is not of a real apple, but an ideal one.',
        underlinedWord: 'ideal',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'lý tưởng, hình mẫu hoàn hảo',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'He removed the mark from his shirt.',
        underlinedWord: 'removed',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'tẩy, xóa bỏ, cởi bỏ',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'She is an attractive woman.',
        underlinedWord: 'attractive',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'hấp dẫn, ưa nhìn, cuốn hút',
      },
    ],
    definitions: [
      { letter: 'a', text: 'model; perfect' },
      { letter: 'b', text: 'good-looking' },
      { letter: 'c', text: 'known' },
      { letter: 'd', text: 'who she is' },
      { letter: 'e', text: 'took off' },
      { letter: 'f', text: 'suggest' },
    ],
  },

  passageNumberedLines: [
    { text: 'A young woman without eyebrows is seated in front of a beautiful landscape.' },
    { text: 'Does this sound familiar to you? This is one of the most famous works by' },
    { lineNumber: 3, text: 'Leonardo da Vinci. The Mona Lisa is a beautiful painting. However, it was' },
    { lineNumber: 4, text: 'the mystery behind the painting that intrigued people. Who was the woman and' },
    { lineNumber: 5, text: 'why did da Vinci paint her?' },
    { text: 'Different theories have been proposed about her identity. Many art and' },
    { lineNumber: 7, text: 'history buffs thought that it was a portrait of da Vinci himself, but as a woman.' },
    { lineNumber: 8, text: 'Others thought it was not any particular person, but the ideal of a woman. They say' },
    { text: 'this is why she was painted with no eyebrows. This gave her face a more unearthly' },
    { lineNumber: 10, text: 'look. Still, others thought that it was a portrait of an actual woman of the time, the' },
    { text: 'wife of Francesco del Giocondo.' },
    { text: 'In 2005, historian Armin Schlechter of Heidelberg discovered the answer. While' },
    { text: 'looking through an old manuscript, he found a small note. In this, the woman in' },
    { lineNumber: 14, text: 'the Mona Lisa was positively identified as Lisa del Giocondo. The artist had been paid' },
    { text: 'to do her portrait after the birth of her second child. “Mona,” in fact, means' },
    { lineNumber: 16, text: '“madam” in Italian. As for her unearthly look? Historians say women of this time' },
    { text: 'liked to remove their eyebrows. Apparently, they thought eyebrows were not attractive.' },
  ],

  passageParagraphs: [
    'A young woman without eyebrows is seated in front of a beautiful landscape. Does this sound familiar to you? This is one of the most famous works by Leonardo da Vinci. The Mona Lisa is a beautiful painting. However, it was the mystery behind the painting that intrigued people. Who was the woman and why did da Vinci paint her?',
    'Different theories have been proposed about her identity. Many art and history buffs thought that it was a portrait of da Vinci himself, but as a woman. Others thought it was not any particular person, but the ideal of a woman. They say this is why she was painted with no eyebrows. This gave her face a more unearthly look. Still, others thought that it was a portrait of an actual woman of the time, the wife of Francesco del Giocondo.',
    'In 2005, historian Armin Schlechter of Heidelberg discovered the answer. While looking through an old manuscript, he found a small note. In this, the woman in the Mona Lisa was positively identified as Lisa del Giocondo. The artist had been paid to do her portrait after the birth of her second child. “Mona,” in fact, means “madam” in Italian. As for her unearthly look? Historians say women of this time liked to remove their eyebrows. Apparently, they thought eyebrows were not attractive.',
  ],

  glossary: [
    { line: 1, word: 'eyebrow', definition: 'the hair on the face above one’s eye', vietnameseMeaning: 'lông mày' },
    { line: 1, word: 'landscape', definition: 'scenery', vietnameseMeaning: 'phong cảnh' },
    { line: 4, word: 'mystery', definition: 'something that is unexplained', vietnameseMeaning: 'điều bí ẩn' },
    { line: 4, word: 'intrigue', definition: 'to arouse curiosity or interest', vietnameseMeaning: 'kích thích trí tò mò, lôi cuốn' },
    { line: 7, word: 'portrait', definition: 'a picture showing a person’s face', vietnameseMeaning: 'bức chân dung' },
    { line: 8, word: 'particular', definition: 'specific', vietnameseMeaning: 'cụ thể, đặc thù' },
    { line: 14, word: 'manuscript', definition: 'a piece of writing', vietnameseMeaning: 'bản thảo viết tay' },
    { line: 16, word: 'positively', definition: 'absolutely; definitely', vietnameseMeaning: 'chắc chắn, rõ ràng' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is the main idea of this reading?',
      options: [
        { key: 'a', text: 'How da Vinci created a great painting' },
        { key: 'b', text: 'The making of a great mystery' },
        { key: 'c', text: 'Fashion trends long ago' },
        { key: 'd', text: 'The identity of a famous woman' },
      ],
      correctAnswer: 'd',
      explanation: 'The passage explores the theories and historical discovery revealing who the woman in the Mona Lisa really was.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'According to the reading, what is one point about the Mona Lisa that intrigued people?',
      options: [
        { key: 'a', text: 'What kind of woman da Vinci’s ideal was' },
        { key: 'b', text: 'Where it was painted' },
        { key: 'c', text: 'Her hairstyle' },
        { key: 'd', text: 'Her lack of eyebrows' },
      ],
      correctAnswer: 'd',
      explanation: 'People wondered why she had no eyebrows, which contributed to her mysterious, unearthly appearance (lines 8-10).',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'What could the word “unearthly” mean in this reading?',
      options: [
        { key: 'a', text: 'Ideal' },
        { key: 'b', text: 'Frightening' },
        { key: 'c', text: 'Specific' },
        { key: 'd', text: 'Realistic' },
      ],
      correctAnswer: 'a',
      explanation: 'In the context of da Vinci painting an otherworldly or ideal beauty, unearthly connects to “the ideal of a woman.”',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'According to the reading, which of the following was NOT an idea about the identity of the woman in the Mona Lisa?',
      options: [
        { key: 'a', text: 'Leonardo da Vinci painted himself.' },
        { key: 'b', text: 'She was married to Francesco del Giocondo.' },
        { key: 'c', text: 'Leonardo da Vinci painted a member of his own family.' },
        { key: 'd', text: 'She was not a real woman.' },
      ],
      correctAnswer: 'c',
      explanation: 'The reading mentions theories of da Vinci himself, an ideal concept, or Francesco’s wife, but never a family member.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'How do we know who the woman in the Mona Lisa is?',
      options: [
        { key: 'a', text: 'A historian looked closely at the portrait.' },
        { key: 'b', text: 'The name on the portrait tells us.' },
        { key: 'c', text: 'There were no eyebrows.' },
        { key: 'd', text: 'Someone wrote about it long ago.' },
      ],
      correctAnswer: 'd',
      explanation: 'Historian Armin Schlechter found an ancient manuscript note in 2005 documenting the commission.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'a (some subject) buff',
      definition: 'a person who is enthusiastic and knowledgeable about a subject',
      bookExample: 'Bob is a World War II history buff. He knows everything about it.',
      sentencePrompt: 'I’m a movie [BLANK]. I love to read about and see movies.',
      correctAnswer: 'buff',
      acceptableAnswers: ['buff'],
      explanation: '“movie buff” refers to someone who is an avid fan and expert on cinema.',
    },
    {
      id: 'id-2',
      idiom: 'a (some kind of) look',
      definition: 'a certain appearance',
      bookExample: 'You have an angry look on your face. Are you all right?',
      sentencePrompt: 'He has a serious [BLANK] on his face.',
      correctAnswer: 'look',
      acceptableAnswers: ['look'],
      explanation: '“a serious look” describes a facial expression or appearance.',
    },
    {
      id: 'id-3',
      idiom: 'as for',
      definition: 'with respect to; regarding',
      bookExample: 'As for him, he was just happy to be there.',
      sentencePrompt: 'She likes to wear the latest fashions. [BLANK] me, I like wearing jeans and t-shirts.',
      correctAnswer: 'As for',
      acceptableAnswers: ['As for', 'as for'],
      explanation: '“As for” transitions focus to a new subject or person.',
    },
  ],

  summary: {
    instruction: 'Scan the passage and complete the chart with the correct information from the word bank.',
    wordBank: ['da Vinci', 'ideal', 'eyebrows', 'unearthly', 'actual', 'removed'],
    passageTemplate: `Who Was Mona Lisa?
• 1. [BLANK_0] himself: Painted as a woman
• An 2. [BLANK_1] woman: Had no 3. [BLANK_2] to look 4. [BLANK_3]
• An 5. [BLANK_4] woman: Named Lisa del Giocondo. Many women 6. [BLANK_5] their eyebrows at this time.`,
    correctAnswers: ['da Vinci', 'ideal', 'eyebrows', 'unearthly', 'actual', 'removed'],
    vietnameseTranslation: 'Tóm tắt bài đọc: Mona Lisa là ai? Ba giả thuyết gồm: (1) Chính da Vinci vẽ mình thành phụ nữ; (2) Một phụ nữ lý tưởng không có lông mày để tạo vẻ thanh thoát thoát tục; (3) Một phụ nữ có thật tên Lisa del Giocondo, phụ nữ thời đó thường cạo lông mày vì chuộng mốt.',
  },

  listeningDictation: {
    dialogTitle: 'Another Painting',
    audioUrl: '/audio/rc1/22-.mp3',
    trackNumber: 22,
    speakers: [
      {
        speaker: 'Man',
        lines: [{ text: 'You’ve heard of the Mona Lisa, right?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Of course I have. It’s that famous painting by Leonardo da Vinci.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'And have you heard of The Last Supper?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'The Last Supper? Is that the name of a book?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Actually, it’s the name of another famous painting. It’s the picture of a scene from the Bible.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Oh, really? And Leonardo da Vinci also painted this one?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'That’s right.' }],
      },
    ],
    fullTranscript: `Man: You’ve heard of the Mona Lisa, right?
Woman: Of course I have. It’s that famous painting by Leonardo da Vinci.
Man: And have you heard of The Last Supper?
Woman: The Last Supper? Is that the name of a book?
Man: Actually, it’s the name of another famous painting. It’s the picture of a scene from the Bible.
Woman: Oh, really? And Leonardo da Vinci also painted this one?
Man: That’s right.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: '1. The Last Supper is the name of another famous painting.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'The man confirms The Last Supper is another famous painting (Answer Key: True).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: '2. The Last Supper is a picture of a scene from the Bible.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'He says “It’s the picture of a scene from the Bible” (Answer Key: True).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: '3. It was painted by Leonardo da Vinci.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'He affirms that Leonardo da Vinci also painted this artwork (Answer Key: True).',
      },
    ],
  },

  grammar: {
    title: 'That: Relative Pronoun or Subordinating Conjunction?',
    ruleExplanation:
      'That as a relative pronoun is followed by an incomplete clause in which that plays a part, while that as a subordinating conjunction is followed by a complete clause.',
    sampleSentences: [
      'However, it was the mystery behind the painting that intrigued people.',
      'Many art and history buffs thought that it was a portrait of da Vinci himself.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'However, it was the mystery behind the painting',
        options: ['that', 'what'],
        correctAnswer: 'that',
        sentenceAfter: 'intrigued people.',
        explanation: 'Cleft sentence structure “it was ... that intrigued people”.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'Many art and history buffs thought',
        options: ['what', 'that'],
        correctAnswer: 'that',
        sentenceAfter: 'it was a portrait of da Vinci himself.',
        explanation: 'Subordinating conjunction that introduces a noun clause after thought.',
      },
    ],
  },

  guidedWriting: {
    title: 'My Favorite Artist',
    promptQuestions: [
      '(1) Who is your favorite artist?',
      '(2) What kind of art does he or she make?',
      '(3) What style does he or she use?',
      '(4) Why do you like his or her art?',
    ],
    exampleText:
      'My favorite artist is Monet. He was a painter. His style was impressionistic, not realistic. I like his art because of the colors that he used in his paintings. They are very pretty.',
    suggestedAnswers: [
      {
        question: 'Who is your favorite artist and what kind of art does he or she make?',
        sample: 'My favorite artist is Vincent van Gogh. He was a painter of vibrant landscapes and portraits.',
      },
      {
        question: 'What style does he use and why do you like his art?',
        sample: 'He used post-impressionist bold brushstrokes and vivid yellow and blue tones. I like his emotional depth.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'I don’t know how to _______ this cap from the bottle. Do you?',
      options: [
        { key: 'a', text: 'discover' },
        { key: 'b', text: 'remove' },
        { key: 'c', text: 'propose' },
        { key: 'd', text: 'detect' },
      ],
      correctAnswer: 'b',
      explanation: '“remove” means take off or detach.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'Is this a _______ of the old king?',
      options: [
        { key: 'a', text: 'buff' },
        { key: 'b', text: 'portrait' },
        { key: 'c', text: 'mystery' },
        { key: 'd', text: 'theory' },
      ],
      correctAnswer: 'b',
      explanation: 'A painting representing someone’s face is a “portrait”.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'Is there any _______ kind of car that you are interested in?',
      options: [
        { key: 'a', text: 'particular' },
        { key: 'b', text: 'unearthly' },
        { key: 'c', text: 'familiar' },
        { key: 'd', text: 'beautiful' },
      ],
      correctAnswer: 'a',
      explanation: '“particular” means specific.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'The _______ of the jungle is very green and lush.',
      options: [
        { key: 'a', text: 'landscape' },
        { key: 'b', text: 'manuscript' },
        { key: 'c', text: 'machine' },
        { key: 'd', text: 'woman' },
      ],
      correctAnswer: 'a',
      explanation: '“landscape” refers to natural scenery.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'That child has very bad _______. He frequently hits others.',
      options: [
        { key: 'a', text: 'eyebrows' },
        { key: 'b', text: 'theories' },
        { key: 'c', text: 'behavior' },
        { key: 'd', text: 'answers' },
      ],
      correctAnswer: 'c',
      explanation: '“behavior” refers to conduct and actions towards others.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'John _______ that we go to the beach for our holidays.',
      options: [
        { key: 'a', text: 'painted' },
        { key: 'b', text: 'removed' },
        { key: 'c', text: 'tested' },
        { key: 'd', text: 'proposed' },
      ],
      correctAnswer: 'd',
      explanation: '“proposed” means suggested an idea or plan.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'I don’t know the answer, and _______, neither does Sue.',
      options: [
        { key: 'a', text: 'apparently' },
        { key: 'b', text: 'according to' },
        { key: 'c', text: 'however' },
        { key: 'd', text: 'nearly' },
      ],
      correctAnswer: 'a',
      explanation: '“apparently” means as far as one can see; seemingly.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'Can you _______ this picture?',
      options: [
        { key: 'a', text: 'identity' },
        { key: 'b', text: 'identify' },
        { key: 'c', text: 'identification' },
      ],
      correctAnswer: 'b',
      explanation: 'After modal “can”, we need the base verb “identify”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: '_______, England had a lot of influence on other countries throughout the world.',
      options: [
        { key: 'a', text: 'History' },
        { key: 'b', text: 'Historian' },
        { key: 'c', text: 'Historically' },
      ],
      correctAnswer: 'c',
      explanation: 'An adverb “Historically” is needed to modify the whole clause.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'I am _______ with this machine. How do you use it?',
      options: [
        { key: 'a', text: 'familiar' },
        { key: 'b', text: 'unfamiliar' },
        { key: 'c', text: 'familiarize' },
      ],
      correctAnswer: 'b',
      explanation: 'Asking “How do you use it?” shows that the speaker is “unfamiliar” with it.',
    },
  ],
};
