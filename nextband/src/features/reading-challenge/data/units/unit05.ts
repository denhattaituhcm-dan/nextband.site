import { UnitConfig } from '../../types';

export const unit05: UnitConfig = {
  unitNumber: 5,
  slug: 'a-bugs-sleep',
  title: "A Bug's Sleep",
  category: 'Science Facts',
  audioReadingUrl: '/audio/rc1/09-.mp3',
  audioListeningUrl: '/audio/rc1/10-.mp3',
  wordCount: 220,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. Do you think insects sleep? Why or why not?',
        sampleAnswer: "I don't think insects sleep. They don't have a big enough brain to need sleep.",
        hint: 'Consider whether creatures with simple nervous systems require rest.',
      },
      {
        id: 'pr-2',
        question: '2. How can you tell if an insect is sleeping?',
        sampleAnswer: 'Maybe an insect is very still and quiet with its antennae down if it sleeps.',
        hint: 'Think of physical postures such as stopping movement or lowering antennae.',
      },
      {
        id: 'pr-3',
        question: '3. How many hours of sleep do you need each night? How does your behavior change when you don’t get enough sleep?',
        sampleAnswer: "I usually need 7-8 hours of sleep. If I don't get enough sleep, I get angry very easily.",
        hint: 'Reflect on your personal mood and concentration after poor sleep.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'Scientists are trying to discover how insects sleep.',
        underlinedWord: 'discover',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'khám phá, tìm ra',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'Insects can send messages to each other in complex ways.',
        underlinedWord: 'complex',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'phức tạp, tinh vi',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'Long ago, many people believed that the world was flat.',
        underlinedWord: 'believed',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'tin rằng, cho là',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'Studies show that fruit flies sleep.',
        underlinedWord: 'Studies',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'các nghiên cứu, công trình khoa học',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'Loud noises made the flies start to move.',
        underlinedWord: 'noises',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'tiếng ồn, âm thanh',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'The fly sat in a funny way. Additionally, it kept its antenna down.',
        underlinedWord: 'Additionally',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'ngoài ra, thêm vào đó',
      },
    ],
    definitions: [
      { letter: 'a', text: 'find out' },
      { letter: 'b', text: 'also' },
      { letter: 'c', text: 'complicated; not simple' },
      { letter: 'd', text: 'thought something was true' },
      { letter: 'e', text: 'research; experiments' },
      { letter: 'f', text: 'sounds' },
    ],
  },

  passageNumberedLines: [
    { text: 'Every mammal needs sleep, as do birds and reptiles, such as snakes. But what' },
    { text: 'about insects? Do they need sleep? Scientists have been trying to discover the' },
    { lineNumber: 3, text: 'truth about insect sleep behavior for years. Scientists first thought insects did' },
    { text: 'not need sleep. According to them, the insect brain was not complex enough to need' },
    { lineNumber: 5, text: 'it. Scientists said that some kinds of brain activity, like dreaming, were sleep' },
    { text: 'behaviors. Insects do not dream, so scientists said that they did not sleep. They' },
    { text: 'believed that insects rested, instead.' },
    { text: 'However, new studies have shown that some insects may actually sleep. There' },
    { text: 'are four types of behavior during sleep. First, sleeping people and animals don’t move' },
    { lineNumber: 10, text: 'much. Also, they have a position for sleeping; for example, they lie down. Additionally,' },
    { text: 'they don’t wake up easily when hearing noises or seeing light. Lastly, they are able' },
    { text: 'to come out of sleep quickly in response to some' },
    { lineNumber: 13, text: 'intense stimulant.' },
    { text: 'Scientists have now seen similar behaviors in' },
    { lineNumber: 15, text: 'fruit flies. For example, fruit flies become still every' },
    { text: 'night for about seven hours. At these times, they sit' },
    { lineNumber: 17, text: 'in a different way, let their antennae drop, and do' },
    { text: 'not respond to quiet noises. The flies do begin to' },
    { text: 'move around when louder noises are made. Scientists' },
    { lineNumber: 20, text: 'think that some insects may have their own unique' },
    { text: 'kind of sleep.' },
  ],

  passageParagraphs: [
    'Every mammal needs sleep, as do birds and reptiles, such as snakes. But what about insects? Do they need sleep? Scientists have been trying to discover the truth about insect sleep behavior for years. Scientists first thought insects did not need sleep. According to them, the insect brain was not complex enough to need it. Scientists said that some kinds of brain activity, like dreaming, were sleep behaviors. Insects do not dream, so scientists said that they did not sleep. They believed that insects rested, instead.',
    'However, new studies have shown that some insects may actually sleep. There are four types of behavior during sleep. First, sleeping people and animals don’t move much. Also, they have a position for sleeping; for example, they lie down. Additionally, they don’t wake up easily when hearing noises or seeing light. Lastly, they are able to come out of sleep quickly in response to some intense stimulant.',
    'Scientists have now seen similar behaviors in fruit flies. For example, fruit flies become still every night for about seven hours. At these times, they sit in a different way, let their antennae drop, and do not respond to quiet noises. The flies do begin to move around when louder noises are made. Scientists think that some insects may have their own unique kind of sleep.',
  ],

  glossary: [
    { line: 1, word: 'mammal', definition: 'an animal that has live babies', vietnameseMeaning: 'động vật có vú' },
    { line: 1, word: 'reptile', definition: 'an animal that is cold-blooded, like a lizard', vietnameseMeaning: 'loài bò sát' },
    { line: 2, word: 'insect', definition: 'an animal like a beetle or fly', vietnameseMeaning: 'côn trùng' },
    { line: 3, word: 'behavior', definition: 'a way of acting', vietnameseMeaning: 'hành vi' },
    { line: 10, word: 'position', definition: 'a way of holding or placing the body', vietnameseMeaning: 'tư thế' },
    { line: 13, word: 'stimulant', definition: 'something that makes you feel more active and full of energy', vietnameseMeaning: 'chất kích thích, tác nhân kích thích' },
    { line: 15, word: 'fruit fly', definition: 'a small fly that eats fruit', vietnameseMeaning: 'ruồi giấm' },
    { line: 15, word: 'still', definition: 'not moving', vietnameseMeaning: 'bất động, đứng yên' },
    { line: 17, word: 'antennae', definition: 'the two long, hair-like things on an insect’s head, used for sensing', vietnameseMeaning: 'râu cảm giác của côn trùng' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is the main idea of this reading?',
      options: [
        { key: 'a', text: 'Fruit flies show sleep behavior.' },
        { key: 'b', text: 'Scientists were wrong.' },
        { key: 'c', text: 'Scientists have changed their view about insect sleep.' },
        { key: 'd', text: 'Animals die without sleep.' },
      ],
      correctAnswer: 'c',
      explanation: 'The reading explains how initial assumptions about insects not sleeping were revised due to new studies on fruit flies.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'Which of the following animals do NOT sleep?',
      options: [
        { key: 'a', text: 'Black bears' },
        { key: 'b', text: 'Chickens' },
        { key: 'c', text: 'Rattlesnakes' },
        { key: 'd', text: 'All of these animals sleep' },
      ],
      correctAnswer: 'd',
      explanation: 'Line 1 explicitly confirms that every mammal (bears), bird (chickens), and reptile (snakes) sleeps.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'Why did scientists believe that insects did not need sleep?',
      options: [
        { key: 'a', text: "Insects don't work hard." },
        { key: 'b', text: "Insects can't close their eyes." },
        { key: 'c', text: "Insects don't dream." },
        { key: 'd', text: "Insects don't live very long." },
      ],
      correctAnswer: 'c',
      explanation: 'Lines 5-7 point out that scientists linked sleep with dreaming, and concluded insects did not sleep because they do not dream.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'How did scientists learn that insects sleep?',
      options: [
        { key: 'a', text: 'They used brain scanning machines.' },
        { key: 'b', text: 'They put flies in dark rooms.' },
        { key: 'c', text: 'They watched insects.' },
        { key: 'd', text: 'They took the antennae off flies.' },
      ],
      correctAnswer: 'c',
      explanation: 'Scientists observed and watched the physical behaviors, stillness, and response patterns of fruit flies.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'What do fruit flies do for seven hours each day?',
      options: [
        { key: 'a', text: 'Sleep' },
        { key: 'b', text: 'Eat' },
        { key: 'c', text: 'Make noise' },
        { key: 'd', text: 'Fly' },
      ],
      correctAnswer: 'a',
      explanation: 'Lines 15-16 explain that fruit flies become still in a unique sleep state every night for about seven hours.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'come out of',
      definition: 'to wake up from; to become alert',
      bookExample: 'He came out of a deep sleep because of the loud noise.',
      sentencePrompt: 'It takes some people a very long time to [BLANK] sleep.',
      correctAnswer: 'come out of',
      acceptableAnswers: ['come out of'],
      explanation: '“come out of” means to transition out of sleep.',
    },
    {
      id: 'id-2',
      idiom: 'move around',
      definition: 'to move; to have motion',
      bookExample: 'I want to take your picture. Stop moving around.',
      sentencePrompt: 'My sister [BLANK] a lot when she sleeps.',
      correctAnswer: 'moves around',
      acceptableAnswers: ['moves around'],
      explanation: 'Third-person singular present form “moves around”.',
    },
    {
      id: 'id-3',
      idiom: 'for example',
      definition: 'like; for instance; such as',
      bookExample: 'Most insects, like ants for example, have six legs.',
      sentencePrompt: 'Please wear something nice to the party. [BLANK], a suit would be a good idea.',
      correctAnswer: 'For example',
      acceptableAnswers: ['For example', 'for example'],
      explanation: '“For example” introduces a specific illustration.',
    },
  ],

  summary: {
    instruction: 'Scan the passage and complete the comparison chart of sleep behaviors.',
    wordBank: ['antennae', 'loud', 'position', 'respond to', 'still', 'wake up'],
    passageTemplate: `Sleep Behaviors of Most Animals:
• Don't move much
• Have a [BLANK_0] for sleeping
• Don't [BLANK_1] easily from noise or light
• Come out of sleep quickly when woken up

Sleep Behaviors of Fruit Flies:
• Become [BLANK_2] for about seven hours
• Sit in a different way, let their [BLANK_3] drop
• Do not [BLANK_4] quiet noises
• Start to move around when [BLANK_5] noises are made`,
    correctAnswers: ['position', 'wake up', 'still', 'antennae', 'respond to', 'loud'],
    vietnameseTranslation: 'Bảng đối chiếu hành vi giấc ngủ: Động vật thông thường có tư thế ngủ, không dễ thức giấc trước tiếng ồn nhỏ. Ruồi giấm bất động khoảng 7 tiếng, hạ râu xuống, không phản ứng với tiếng động khẽ nhưng cử động lại khi có âm thanh lớn.',
  },

  listeningDictation: {
    dialogTitle: 'Facts About the Weta',
    audioUrl: '/audio/rc1/10-.mp3',
    trackNumber: 10,
    speakers: [
      {
        speaker: 'Woman',
        lines: [
          { text: 'I was reading about insects on the Internet the other day.' },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: 'Did you find out anything interesting?' },
        ],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'I sure did! Did you know that there is a bug that lives high in the mountains? It freezes solid every night and thaws every morning, and lives!' },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: 'Wow! That’s amazing! What is this insect called?' },
        ],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'It is the New Zealand weta.' },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: 'Oh, I think I’ve heard of it. Is it related to the cricket?' },
        ],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'Yes! How did you know that?' },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: 'I learned about them in my biology class.' },
        ],
      },
    ],
    fullTranscript: `Woman: I was reading about insects on the Internet the other day.
Man: Did you find out anything interesting?
Woman: I sure did! Did you know that there is a bug that lives high in the mountains? It freezes solid every night and thaws every morning, and lives!
Man: Wow! That’s amazing! What is this insect called?
Woman: It is the New Zealand weta.
Man: Oh, I think I’ve heard of it. Is it related to the cricket?
Woman: Yes! How did you know that?
Man: I learned about them in my biology class.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: 'An interesting thing about the New Zealand weta is that it ______ every night.',
        options: [
          { key: 'a', text: 'flies away' },
          { key: 'b', text: 'lays eggs' },
          { key: 'c', text: 'freezes' },
          { key: 'd', text: 'makes loud noises' },
        ],
        correctAnswer: 'c',
        explanation: 'The woman notes that it freezes solid every night and thaws every morning (Key: c).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: 'The man learned that the New Zealand weta is related to ______.',
        options: [
          { key: 'a', text: 'spiders' },
          { key: 'b', text: 'fruit flies' },
          { key: 'c', text: 'beetles' },
          { key: 'd', text: 'crickets' },
        ],
        correctAnswer: 'd',
        explanation: 'The man asked if it is related to the cricket, and the woman confirmed it is (Key: d).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: 'The man found out about the New Zealand weta in ______.',
        options: [
          { key: 'a', text: 'a science book' },
          { key: 'b', text: 'his biology class' },
          { key: 'c', text: 'the newspaper' },
          { key: 'd', text: 'a nature documentary' },
        ],
        correctAnswer: 'b',
        explanation: 'The man stated: “I learned about them in my biology class” (Key: b).',
      },
    ],
  },

  grammar: {
    title: 'Conjunctive Adverbs and Subordinating Conjunctions',
    ruleExplanation:
      'Conjunctive adverbs (like Additionally) are usually followed by a comma at the beginning of a sentence, while subordinating conjunctions (like when) introduce dependent clauses.',
    sampleSentences: [
      'Additionally, they don’t wake up easily when hearing noises or seeing light.',
      'However, they start to move around when louder noises are made.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: '',
        options: ['Additionally', 'In addition to'],
        correctAnswer: 'Additionally',
        sentenceAfter: ', they don’t wake up easily when hearing noises or seeing light.',
        explanation: 'Conjunctive adverb followed by a comma modifying the whole sentence: “Additionally,”.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'However, they start to move around',
        options: ['then', 'when'],
        correctAnswer: 'when',
        sentenceAfter: 'louder noises are made.',
        explanation: 'Subordinating time conjunction introducing the dependent clause: “when”.',
      },
    ],
  },

  guidedWriting: {
    title: 'An Interesting Insect',
    promptQuestions: [
      '(1) What is an interesting insect?',
      '(2) Why is it interesting to you?',
      '(3) What are some interesting facts about it?',
      '(4) What is a surprising fact about it?',
    ],
    exampleText:
      'An interesting insect is the beetle. It is interesting to me because it looks and walks funny. Also, beetles are very strong, and they can walk for a long time. Some beetles even eat dung!',
    suggestedAnswers: [
      {
        question: 'What is an interesting insect and why is it interesting?',
        sample: 'An interesting insect is the honeybee. It is interesting because bees live in complex societies and communicate through dancing.',
      },
      {
        question: 'What are some interesting or surprising facts about it?',
        sample: 'Bees are vital for pollinating human crops. Surprisingly, a worker bee produces only a twelfth of a teaspoon of honey in her entire life.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'Scientists want to ______ new things.',
      options: [
        { key: 'a', text: 'believe' },
        { key: 'b', text: 'come out of' },
        { key: 'c', text: 'discover' },
        { key: 'd', text: 'wake up' },
      ],
      correctAnswer: 'c',
      explanation: '“discover” means to find or learn something previously unknown.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'That is a ______ shirt. I have never seen anything like it.',
      options: [
        { key: 'a', text: 'unique' },
        { key: 'b', text: 'complex' },
        { key: 'c', text: 'quiet' },
        { key: 'd', text: 'loud' },
      ],
      correctAnswer: 'a',
      explanation: '“unique” indicates something one-of-a-kind and unlike anything else.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'Most ______, like ants, are very strong for their size.',
      options: [
        { key: 'a', text: 'mammals' },
        { key: 'b', text: 'insects' },
        { key: 'c', text: 'birds' },
        { key: 'd', text: 'reptiles' },
      ],
      correctAnswer: 'b',
      explanation: 'Ants are classified as insects.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'When my dog shows good ______, I give him a snack.',
      options: [
        { key: 'a', text: 'activity' },
        { key: 'b', text: 'light' },
        { key: 'c', text: 'taste' },
        { key: 'd', text: 'behavior' },
      ],
      correctAnswer: 'd',
      explanation: '“behavior” refers to conduct or how an animal acts.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'I don’t like snakes. In fact, I hate all ______.',
      options: [
        { key: 'a', text: 'mammals' },
        { key: 'b', text: 'insects' },
        { key: 'c', text: 'reptiles' },
        { key: 'd', text: 'frogs' },
      ],
      correctAnswer: 'c',
      explanation: 'Snakes belong to the reptile class.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'The scientist ______ to use rabbits in her study.',
      options: [
        { key: 'a', text: 'believed' },
        { key: 'b', text: 'decided' },
        { key: 'c', text: 'discovered' },
        { key: 'd', text: 'detected' },
      ],
      correctAnswer: 'b',
      explanation: '“decided to” means made a choice.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'This problem is not simple. In fact, it is very ______.',
      options: [
        { key: 'a', text: 'unique' },
        { key: 'b', text: 'complex' },
        { key: 'c', text: 'similar to' },
        { key: 'd', text: 'destructive' },
      ],
      correctAnswer: 'b',
      explanation: '“complex” is the direct antonym of simple.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'What ______ did he give?',
      options: [
        { key: 'a', text: 'respond' },
        { key: 'b', text: 'response' },
        { key: 'c', text: 'responding' },
      ],
      correctAnswer: 'b',
      explanation: 'Noun object of the verb “give”: “response”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'They are building a house nearby, so it is very ______.',
      options: [
        { key: 'a', text: 'noisy' },
        { key: 'b', text: 'noises' },
        { key: 'c', text: 'noiseless' },
      ],
      correctAnswer: 'a',
      explanation: 'Adjective complement following “is very”: “noisy”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'Many animals are ______ at night.',
      options: [
        { key: 'a', text: 'activity' },
        { key: 'b', text: 'active' },
        { key: 'c', text: 'action' },
      ],
      correctAnswer: 'b',
      explanation: 'Adjective complement following “are”: “active”.',
    },
  ],
};
