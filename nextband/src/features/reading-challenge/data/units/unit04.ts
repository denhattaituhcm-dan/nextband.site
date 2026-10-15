import { UnitConfig } from '../../types';

export const unit04: UnitConfig = {
  unitNumber: 4,
  slug: 'how-did-those-get-in-there',
  title: 'How Did Those Get in There?',
  category: 'Science Facts',
  audioReadingUrl: '/audio/rc1/07-.mp3',
  audioListeningUrl: '/audio/rc1/08-.mp3',
  wordCount: 197,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. What kinds of situations make you feel nervous?',
        sampleAnswer: 'When I have to speak in front of my class, I get very nervous.',
        hint: 'Think of public speaking, exams, or major performances.',
      },
      {
        id: 'pr-2',
        question: '2. Which parts of your body are affected by this feeling?',
        sampleAnswer: 'My legs and stomach are affected by this feeling. My legs become weak and shaky.',
        hint: 'Consider sweating palms, butterflies in the stomach, or a racing heartbeat.',
      },
      {
        id: 'pr-3',
        question: '3. What animal or insect do you think of when you feel this way?',
        sampleAnswer: 'Related to this feeling, I think of rabbits or butterflies because they flutter around and seem nervous.',
        hint: 'Think of creatures that move quickly or flutter.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'She does not feel normal right now because she is nervous.',
        underlinedWord: 'normal',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'bình thường, như thường lệ',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'A fun activity may help you forget your worries.',
        underlinedWord: 'activity',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'hoạt động',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'Exercise can benefit both your body and your mind.',
        underlinedWord: 'benefit',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'mang lại lợi ích, giúp ích',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'Fear can produce a strange feeling in your stomach.',
        underlinedWord: 'produce',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'sản sinh ra, tạo nên',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'I usually listen to music or read a book to relax.',
        underlinedWord: 'relax',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'thư giãn, giảm căng thẳng',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'Sometimes you can reduce your fear by talking about it with others.',
        underlinedWord: 'reduce',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'làm giảm bớt, hạ thấp',
      },
    ],
    definitions: [
      { letter: 'a', text: 'thing to do' },
      { letter: 'b', text: 'help' },
      { letter: 'c', text: 'make less or lower' },
      { letter: 'd', text: 'feel less stress or pressure' },
      { letter: 'e', text: 'make' },
      { letter: 'f', text: 'regular; like usual' },
    ],
  },

  passageNumberedLines: [
    { text: 'A young actress is about to go onto the stage. As she waits by the side of the' },
    { lineNumber: 2, text: 'stage, she looks nervous. You might hear her whisper to her friend, "I\'ve' },
    { text: 'got butterflies in my stomach." Butterflies in her stomach? How did those' },
    { lineNumber: 4, text: 'get in there? The feeling of butterflies comes from chemicals produced by the body' },
    { lineNumber: 5, text: 'in stressful situations.' },
    { text: 'One chemical that the body makes under stress' },
    { text: 'is cortisol. This chemical benefits the body in normal' },
    { text: 'situations. In fact, it helps the body start normal activities in' },
    { text: 'the morning after waking up. It also plays a role in helping' },
    { lineNumber: 10, text: 'the body and mind respond well to healthy exercise.' },
    { text: 'However, when the body is under stress, extra cortisol begins' },
    { text: 'to affect the stomach. For some people, cortisol shuts down' },
    { text: 'the stomach, producing the funny feeling of butterflies. For' },
    { lineNumber: 14, text: 'others, cortisol speeds up the way the stomach works, which' },
    { lineNumber: 15, text: 'makes these people feel sick.' },
    { text: 'All you need to do to get rid of a few butterflies in the' },
    { text: 'stomach is just relax. Laughing with, or talking to, others' },
    { text: 'about your stress can help reduce it. Stepping out onto the' },
    { text: 'stage will also help those butterflies fly away.' },
  ],

  passageParagraphs: [
    'A young actress is about to go onto the stage. As she waits by the side of the stage, she looks nervous. You might hear her whisper to her friend, "I\'ve got butterflies in my stomach." Butterflies in her stomach? How did those get in there? The feeling of butterflies comes from chemicals produced by the body in stressful situations.',
    'One chemical that the body makes under stress is cortisol. This chemical benefits the body in normal situations. In fact, it helps the body start normal activities in the morning after waking up. It also plays a role in helping the body and mind respond well to healthy exercise. However, when the body is under stress, extra cortisol begins to affect the stomach. For some people, cortisol shuts down the stomach, producing the funny feeling of butterflies. For others, cortisol speeds up the way the stomach works, which makes these people feel sick.',
    'All you need to do to get rid of a few butterflies in the stomach is just relax. Laughing with, or talking to, others about your stress can help reduce it. Stepping out onto the stage will also help those butterflies fly away.',
  ],

  glossary: [
    { line: 2, word: 'nervous', definition: 'a little afraid or worried', vietnameseMeaning: 'lo lắng, hồi hộp' },
    { line: 4, word: 'chemical', definition: 'a thing that can cause an effect in our body', vietnameseMeaning: 'chất hóa học' },
    { line: 5, word: 'stressful', definition: 'full of, or causing, worry or pressure from work, studying, etc.', vietnameseMeaning: 'gây căng thẳng' },
    { line: 5, word: 'situation', definition: 'a condition; a circumstance', vietnameseMeaning: 'tình huống, hoàn cảnh' },
    { line: 10, word: 'respond', definition: 'to do something because of something else; to react', vietnameseMeaning: 'phản ứng lại' },
    { line: 14, word: 'speed up', definition: 'to make faster', vietnameseMeaning: 'làm tăng tốc' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is the main idea of this reading?',
      options: [
        { key: 'a', text: 'A new kind of medicine called cortisol' },
        { key: 'b', text: 'An illness that nervous people get' },
        { key: 'c', text: 'The cause of butterflies in the stomach' },
        { key: 'd', text: 'The stress that actors have' },
      ],
      correctAnswer: 'c',
      explanation: 'The passage explains how cortisol and stress chemicals produce the fluttering feeling known as butterflies in the stomach.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'According to the reading, what is NOT true about cortisol?',
      options: [
        { key: 'a', text: 'In small amounts, it benefits the body.' },
        { key: 'b', text: 'It can shut down the stomach.' },
        { key: 'c', text: 'It is found in many kinds of food.' },
        { key: 'd', text: 'It is produced by the body.' },
      ],
      correctAnswer: 'c',
      explanation: 'The passage never states that cortisol is found in food; it is an internal hormone produced by the body.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'What helps a body respond well to exercise?',
      options: [
        { key: 'a', text: 'Butterflies' },
        { key: 'b', text: 'Cortisol' },
        { key: 'c', text: 'Stomach acid' },
        { key: 'd', text: 'Stress' },
      ],
      correctAnswer: 'b',
      explanation: 'Lines 9-10 state that cortisol plays a role in helping the body and mind respond well to healthy exercise.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'According to the passage, what makes some people feel sick?',
      options: [
        { key: 'a', text: 'When situations return to normal' },
        { key: 'b', text: 'When the stomach shuts down' },
        { key: 'c', text: 'When the stomach works too fast' },
        { key: 'd', text: 'When there is too little cortisol' },
      ],
      correctAnswer: 'c',
      explanation: 'Lines 14-15 explain that for some people, extra cortisol speeds up the stomach, making them feel sick.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'Which may help a person get over butterflies in the stomach?',
      options: [
        { key: 'a', text: 'Doing the thing that makes him or her nervous' },
        { key: 'b', text: 'Not talking while the butterflies are there' },
        { key: 'c', text: 'Shutting down his or her stomach for some time' },
        { key: 'd', text: 'Taking a small amount of cortisol' },
      ],
      correctAnswer: 'a',
      explanation: 'The final line points out that stepping out onto the stage (facing the situation) helps the butterflies fly away.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'get rid of',
      definition: 'to throw away; to put out of use',
      bookExample: "I didn't like my bag, so I got rid of it.",
      sentencePrompt: "That coat is old and torn. Why don't you [BLANK] it?",
      correctAnswer: 'get rid of',
      acceptableAnswers: ['get rid of'],
      explanation: '“get rid of” means to discard or eliminate.',
    },
    {
      id: 'id-2',
      idiom: 'play a role in',
      definition: 'to have some part in',
      bookExample: "The big storm probably played a role in last night's blackout.",
      sentencePrompt: "How much does luck [BLANK] the success of an artist's career?",
      correctAnswer: 'play a role in',
      acceptableAnswers: ['play a role in'],
      explanation: '“play a role in” means to contribute or participate as a factor.',
    },
    {
      id: 'id-3',
      idiom: 'shut down',
      definition: 'to stop',
      bookExample: 'The company shut down the factory because they were losing a lot of money.',
      sentencePrompt: 'When you are finished working, please [BLANK] the computer.',
      correctAnswer: 'shut down',
      acceptableAnswers: ['shut down'],
      explanation: '“shut down” means to turn off or stop functioning.',
    },
  ],

  summary: {
    instruction: 'Fill in the blanks with the correct words or phrases.',
    wordBank: ['butterflies', 'normal', 'produces', 'respond', 'shut down'],
    passageTemplate: `When a person is under some stress, his or her body may [BLANK_0] to the stress by making too much cortisol. This chemical benefits the body in many ways in [BLANK_1] situations. However, if the body [BLANK_2] a lot of extra cortisol, the cortisol may [BLANK_3] the person's stomach. This can make people feel like they have [BLANK_4] in their stomachs.`,
    correctAnswers: ['respond', 'normal', 'produces', 'shut down', 'butterflies'],
    vietnameseTranslation: 'Khi một người chịu áp lực, cơ thể có thể phản ứng bằng cách tiết ra quá nhiều cortisol. Chất này có lợi trong các tình huống bình thường. Tuy nhiên, nếu cơ thể sản sinh quá nhiều, cortisol có thể làm ngưng trệ dạ dày, gây cảm giác nôn nao như có bươm bướm bay trong bụng.',
  },

  listeningDictation: {
    dialogTitle: 'Another Reason for Butterflies',
    audioUrl: '/audio/rc1/08-.mp3',
    trackNumber: 8,
    speakers: [
      {
        speaker: 'Man',
        lines: [
          { text: 'I heard that a different chemical than cortisol causes butterflies in the stomach.' },
        ],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'What chemical did you hear causes them?' },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: "I read somewhere that the same chemical that makes you feel stronger when you're excited causes butterflies." },
        ],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'Is the process related to that other chemical very different from cortisol shutting down the stomach?' },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: "Not really. The chemical I heard about causes more blood to go to your muscles instead of to your stomach. It's the reduced amount of blood going to the stomach that makes the stomach shut down." },
        ],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'Well, I guess the result is the same in the end. The butterflies come from something shutting down the stomach.' },
        ],
      },
    ],
    fullTranscript: `Man: I heard that a different chemical than cortisol causes butterflies in the stomach.
Woman: What chemical did you hear causes them?
Man: I read somewhere that the same chemical that makes you feel stronger when you're excited causes butterflies.
Woman: Is the process related to that other chemical very different from cortisol shutting down the stomach?
Man: Not really. The chemical I heard about causes more blood to go to your muscles instead of to your stomach. It's the reduced amount of blood going to the stomach that makes the stomach shut down.
Woman: Well, I guess the result is the same in the end. The butterflies come from something shutting down the stomach.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: 'What are the speakers talking about?',
        options: [
          { key: 'a', text: 'A situation that makes them nervous' },
          { key: 'b', text: 'People who have too much stress' },
          { key: 'c', text: 'Something that affects the stomach' },
          { key: 'd', text: 'The way cortisol works with other chemicals' },
        ],
        correctAnswer: 'c',
        explanation: 'They discuss chemicals causing physical sensations in the stomach (Key: c).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: 'Which effect has he read about?',
        options: [
          { key: 'a', text: 'Feeling very large butterflies' },
          { key: 'b', text: 'Less blood flowing to the stomach' },
          { key: 'c', text: 'Reducing the level of cortisol' },
          { key: 'd', text: 'Shutting down different muscles' },
        ],
        correctAnswer: 'b',
        explanation: 'He read that blood redirects to muscles, reducing blood to the stomach (Key: b).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: 'What does the woman say about his explanation?',
        options: [
          { key: 'a', text: 'It does not sound correct.' },
          { key: 'b', text: 'It seems easier to understand.' },
          { key: 'c', text: 'Some parts are confusing.' },
          { key: 'd', text: 'The result is the same.' },
        ],
        correctAnswer: 'd',
        explanation: 'The woman says: "Well, I guess the result is the same in the end" (Key: d).',
      },
    ],
  },

  grammar: {
    title: 'Causative Verbs',
    ruleExplanation:
      'Causative verbs like make, have, or help are followed by an object and a root verb (bare infinitive).',
    sampleSentences: [
      'Cortisol speeds up the way the stomach works, which makes these people feel sick.',
      'Stepping out onto the stage will also help those butterflies fly away.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'Cortisol speeds up the way the stomach works, which makes these people',
        options: ['feel', 'to feel'],
        correctAnswer: 'feel',
        sentenceAfter: 'sick.',
        explanation: 'Causative verb “make + object + bare verb”: makes these people feel sick.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'Stepping out onto the stage will also help those butterflies',
        options: ['fly', 'flying'],
        correctAnswer: 'fly',
        sentenceAfter: 'away.',
        explanation: '“help + object + bare verb”: help those butterflies fly away.',
      },
    ],
  },

  guidedWriting: {
    title: 'What Gave Me Butterflies?',
    promptQuestions: [
      '(1) When was a time that you got butterflies in your stomach?',
      '(2) What did you do in order to calm or relax yourself?',
      '(3) How well did that work?',
      '(4) What happened in that situation?',
    ],
    exampleText:
      'The last time I got butterflies was when I had to give a presentation in class. I kept reading my notes over and over in order to calm myself. I think it worked pretty well. By the time I gave my presentation, I knew it really well, so I hardly looked at my notes while I was speaking.',
    suggestedAnswers: [
      {
        question: 'When did you get butterflies and what did you do?',
        sample: 'The last time I got butterflies was before an English speaking exam. I took deep breaths and listened to soft music.',
      },
      {
        question: 'How well did it work and what happened?',
        sample: 'It helped lower my heart rate and gave me confidence. I answered all the examiner’s questions clearly and scored high.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'He had to take some time off from work because all of the ______ was making him sick.',
      options: [
        { key: 'a', text: 'activity' },
        { key: 'b', text: 'chemical' },
        { key: 'c', text: 'exercise' },
        { key: 'd', text: 'stress' },
      ],
      correctAnswer: 'd',
      explanation: 'Heavy work pressure and emotional strain are referred to as stress.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: "In some cultures, you should not ask ______ questions such as a person's age.",
      options: [
        { key: 'a', text: 'international' },
        { key: 'b', text: 'normal' },
        { key: 'c', text: 'personal' },
        { key: 'd', text: 'tropical' },
      ],
      correctAnswer: 'c',
      explanation: 'Private matters like age and income are personal questions.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'Many patients will ______ from the new treatment.',
      options: [
        { key: 'a', text: 'benefit' },
        { key: 'b', text: 'decide' },
        { key: 'c', text: 'occur' },
        { key: 'd', text: 'produce' },
      ],
      correctAnswer: 'a',
      explanation: '“benefit from” means to receive advantages or help from.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'Sometimes it takes several months or even a year before new technology really ______.',
      options: [
        { key: 'a', text: 'catches on' },
        { key: 'b', text: 'finds out' },
        { key: 'c', text: 'shuts down' },
        { key: 'd', text: 'speeds up' },
      ],
      correctAnswer: 'a',
      explanation: '“catches on” means gains widespread acceptance and popularity.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'The company plans to ______ a new diet cola early next year.',
      options: [
        { key: 'a', text: 'detect' },
        { key: 'b', text: 'introduce' },
        { key: 'c', text: 'relax' },
        { key: 'd', text: 'respond to' },
      ],
      correctAnswer: 'b',
      explanation: '“introduce” means to bring a new product into the market.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'We should try to ______ the amount of electricity we use every month.',
      options: [
        { key: 'a', text: 'create' },
        { key: 'b', text: 'include' },
        { key: 'c', text: 'reduce' },
        { key: 'd', text: 'taste' },
      ],
      correctAnswer: 'c',
      explanation: '“reduce” means to make smaller or use less.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: "Your cheeks are red, and you're sweating. Are you ______?",
      options: [
        { key: 'a', text: 'fantastic' },
        { key: 'b', text: 'nervous' },
        { key: 'c', text: 'unique' },
        { key: 'd', text: 'wealthy' },
      ],
      correctAnswer: 'b',
      explanation: 'Blushing and sweating are physiological indicators of nervousness.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'The jar says that this skin ______ can help reduce lines around your eyes.',
      options: [
        { key: 'a', text: 'relaxation' },
        { key: 'b', text: 'relaxer' },
        { key: 'c', text: 'relaxing' },
      ],
      correctAnswer: 'b',
      explanation: 'Noun naming the product: skin “relaxer”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'Next weekend, the store will sell all of its furniture at ______ prices.',
      options: [
        { key: 'a', text: 'reduction' },
        { key: 'b', text: 'reduces' },
        { key: 'c', text: 'reduced' },
      ],
      correctAnswer: 'c',
      explanation: 'Participial adjective modifying “prices”: “reduced”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'The new program has a lot of ______ over the old program.',
      options: [
        { key: 'a', text: 'benefits' },
        { key: 'b', text: 'benefitted' },
        { key: 'c', text: 'beneficial' },
      ],
      correctAnswer: 'a',
      explanation: 'Plural noun following “a lot of”: “benefits”.',
    },
  ],
};
