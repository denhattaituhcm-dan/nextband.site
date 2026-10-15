import { UnitConfig } from '../../types';

export const unit02: UnitConfig = {
  unitNumber: 2,
  slug: 'food-firsts',
  title: 'Food Firsts',
  category: 'Culture and History',
  audioReadingUrl: '/audio/rc1/03-.mp3',
  audioListeningUrl: '/audio/rc1/04-.mp3',
  wordCount: 230,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: "1. What's your favorite food?",
        sampleAnswer: 'My favorite food is Cajun chicken salad.',
        hint: 'Think of international or local foods you enjoy eating.',
      },
      {
        id: 'pr-2',
        question: "2. What's the most unusual food you have eaten?",
        sampleAnswer: 'The most unusual food I have eaten is fried insects.',
        hint: 'Recall exotic dishes from travel or street markets.',
      },
      {
        id: 'pr-3',
        question: '3. What type of food can you cook?',
        sampleAnswer: 'I can cook many kinds of dishes, from spaghetti to steak.',
        hint: 'Mention dishes you make at home.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word or phrase.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'Chefs today create new dishes by putting together interesting foods.',
        underlinedWord: 'create',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'tạo ra, sáng tạo',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'In reality, curry comes from England, not India.',
        underlinedWord: 'In reality',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'trên thực tế',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'According to this book, people in England cooked curry dishes in the 1300s.',
        underlinedWord: 'According to',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'theo như',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'People in Persia ate pizza nearly 1,000 years before people in Italy.',
        underlinedWord: 'nearly',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'gần như, xấp xỉ',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: "Some kinds of curry taste hot, so some people don't like them.",
        underlinedWord: 'taste',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'có vị',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'Sailors from Europe introduced new foods to Americans.',
        underlinedWord: 'introduced',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'giới thiệu, mang đến lần đầu',
      },
    ],
    definitions: [
      { letter: 'a', text: 'almost; close to' },
      { letter: 'b', text: 'as said by' },
      { letter: 'c', text: 'actually; really' },
      { letter: 'd', text: 'first showed or gave' },
      { letter: 'e', text: 'have the flavor of' },
      { letter: 'f', text: 'make' },
    ],
  },

  passageNumberedLines: [
    { text: 'How much do you know about the history of some of your favorite foods? Do' },
    { text: 'you know when people in England started cooking curry dishes? Do you' },
    { text: 'know in which country pizzas or hamburgers were first made? The facts' },
    { text: 'might surprise you.' },
    { lineNumber: 5, text: 'Many people think the English found out about curry from people in India in' },
    { lineNumber: 6, text: 'the 1600s. In reality, wealthy English people were eating dishes made with curry' },
    { lineNumber: 7, text: 'spices hundreds of years before British ships traveled to India. Cooks of wealthy' },
    { text: 'English families during the time of King Richard I were making curry dishes, and in' },
    { lineNumber: 9, text: "fact, the word 'curry' can be found in an English language cookbook as far back as" },
    { text: '1377.' },
    { lineNumber: 11, text: 'As for pizza, this dish was probably first made in Persia (what is now Iran).' },
    { text: 'The Persians were eating round, flat bread with cheese in the 500s. That was nearly' },
    { text: '1,000 years before pizza caught on in Naples, Italy!' },
    { lineNumber: 14, text: "Finally, let's look at the truth behind hamburgers. Many people think" },
    { text: 'hamburgers are an American food. However, according to' },
    { text: 'some stories, hamburgers came from Hamburg,' },
    { text: 'Germany. A German named Otto Kuasw created' },
    { text: 'the first hamburger in 1891. Four years later,' },
    { lineNumber: 19, text: 'German sailors introduced hamburgers to' },
    { lineNumber: 20, text: 'Americans.' },
    { text: "Where foods come from isn't nearly" },
    { text: 'as important as how they taste; as long as' },
    { text: 'they are delicious! So, go get some of your' },
    { text: 'favorite food and dig in.' },
  ],

  passageParagraphs: [
    'How much do you know about the history of some of your favorite foods? Do you know when people in England started cooking curry dishes? Do you know in which country pizzas or hamburgers were first made? The facts might surprise you.',
    "Many people think the English found out about curry from people in India in the 1600s. In reality, wealthy English people were eating dishes made with curry spices hundreds of years before British ships traveled to India. Cooks of wealthy English families during the time of King Richard I were making curry dishes, and in fact, the word 'curry' can be found in an English language cookbook as far back as 1377.",
    'As for pizza, this dish was probably first made in Persia (what is now Iran). The Persians were eating round, flat bread with cheese in the 500s. That was nearly 1,000 years before pizza caught on in Naples, Italy!',
    "Finally, let's look at the truth behind hamburgers. Many people think hamburgers are an American food. However, according to some stories, hamburgers came from Hamburg, Germany. A German named Otto Kuasw created the first hamburger in 1891. Four years later, German sailors introduced hamburgers to Americans.",
    "Where foods come from isn't nearly as important as how they taste; as long as they are delicious! So, go get some of your favorite food and dig in.",
  ],

  glossary: [
    { line: 6, word: 'wealthy', definition: 'rich', vietnameseMeaning: 'giàu có' },
    { line: 7, word: 'spice', definition: 'a thing used or added to make food taste good', vietnameseMeaning: 'gia vị' },
    { line: 9, word: 'language', definition: 'way of speaking by a certain country or group of people', vietnameseMeaning: 'ngôn ngữ' },
    { line: 11, word: 'dish', definition: 'food', vietnameseMeaning: 'món ăn' },
    { line: 14, word: 'truth', definition: 'fact; reality', vietnameseMeaning: 'sự thật' },
    { line: 19, word: 'sailor', definition: 'a person who works on ships', vietnameseMeaning: 'thủy thủ' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is the main idea of this reading?',
      options: [
        { key: 'a', text: 'Curry was created in England.' },
        { key: 'b', text: 'There are many foods that help your body.' },
        { key: 'c', text: 'People created fast food long ago.' },
        { key: 'd', text: 'Some facts about foods are surprising.' },
      ],
      correctAnswer: 'd',
      explanation: 'The passage reveals surprising and unexpected historical facts about curry, pizza, and hamburgers.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'Which is probably true about British curry dishes in the 1400s?',
      options: [
        { key: 'a', text: 'The dishes did not have meat.' },
        { key: 'b', text: 'The spices cost a lot.' },
        { key: 'c', text: 'People ate curry on special days.' },
        { key: 'd', text: 'British sailors first made curry.' },
      ],
      correctAnswer: 'b',
      explanation: 'Only wealthy families could afford curry spices because imported spices were rare and expensive.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'What did people in Naples learn from Persians?',
      options: [
        { key: 'a', text: 'How to make pizza' },
        { key: 'b', text: 'How to cook cheese' },
        { key: 'c', text: 'How to use spices from Iran' },
        { key: 'd', text: 'How to make flat bread' },
      ],
      correctAnswer: 'a',
      explanation: 'The Persians made round flat bread with cheese nearly 1,000 years before pizza caught on in Naples.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'Who introduced hamburgers to America?',
      options: [
        { key: 'a', text: 'Persians' },
        { key: 'b', text: 'Otto Kuasw' },
        { key: 'c', text: 'Italians' },
        { key: 'd', text: 'German sailors' },
      ],
      correctAnswer: 'd',
      explanation: 'Line 19-20 states that German sailors introduced hamburgers to Americans.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'Which food was probably made first?',
      options: [
        { key: 'a', text: 'Hamburgers' },
        { key: 'b', text: 'Cheesy Persian bread' },
        { key: 'c', text: 'Italian pizza' },
        { key: 'd', text: 'English curry' },
      ],
      correctAnswer: 'b',
      explanation: 'Persian flat bread with cheese dates back to the 500s, far earlier than 1377 curry or 1891 hamburgers.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'find out (about)',
      definition: 'to learn (of)',
      bookExample: 'Hey, I just found out that class is cancelled tomorrow.',
      sentencePrompt: 'Did you [BLANK] what time the movie starts?',
      correctAnswer: 'find out',
      acceptableAnswers: ['find out'],
      explanation: '“find out” means to discover or get information about something.',
    },
    {
      id: 'id-2',
      idiom: 'catch on',
      definition: 'to become popular',
      bookExample: 'In the 1990s, cell phones really caught on.',
      sentencePrompt: 'These days, Latin dancing is [BLANK].',
      correctAnswer: 'catching on',
      acceptableAnswers: ['catching on'],
      explanation: 'Present continuous form “catching on” indicates gaining widespread popularity.',
    },
    {
      id: 'id-3',
      idiom: 'dig in',
      definition: 'to begin eating with excitement',
      bookExample: 'The child was very hungry, so he dug in before his parents sat down.',
      sentencePrompt: 'All of the food is ready. [BLANK]!',
      correctAnswer: 'Dig in',
      acceptableAnswers: ['Dig in', 'dig in'],
      explanation: '“Dig in” is an imperative invitation to enthusiastically start eating.',
    },
  ],

  summary: {
    instruction: 'Scan the passage and complete the food history comparison chart with the correct information.',
    wordBank: ['1377', '1891', '500s', 'created', 'introduced', 'wealthy'],
    passageTemplate: `Curry: Word already in the English language by [BLANK_0]. Cooked for [BLANK_1] English families.
Pizza: [BLANK_2] in Persia. Was eaten in Persia in the [BLANK_3].
Hamburgers: [BLANK_4] to Americans by German sailors. First made in Hamburg in [BLANK_5].`,
    correctAnswers: ['1377', 'wealthy', 'created', '500s', 'introduced', '1891'],
    vietnameseTranslation: 'Cà ri: Xuất hiện trong từ điển tiếng Anh từ năm 1377, được nấu cho các gia đình giàu có. Pizza: Được tạo ra ở Ba Tư từ những năm 500. Hamburger: Được các thủy thủ Đức giới thiệu tới người Mỹ, tạo ra lần đầu tại Hamburg năm 1891.',
  },

  listeningDictation: {
    dialogTitle: 'The First Sandwich',
    audioUrl: '/audio/rc1/04-.mp3',
    trackNumber: 4,
    speakers: [
      {
        speaker: 'Man',
        lines: [{ text: 'What are you doing, Janet?' }],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: "Just surfing the Internet, Mike. Did you know that there's a place in England called Sandwich?" },
        ],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Really? Is that where sandwiches came from?' }],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'Hmm, let me check. No, it says here that sandwiches came from England, but not from that town. They were created by Lord Montagu, the Earl of Sandwich.' },
        ],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'So, did he live in Sandwich?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'No, he just had that name.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'How did he create them?' }],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: "Well, it says that he asked for some meat to be served between some bread. He didn't want to stop gambling to eat." },
        ],
      },
    ],
    fullTranscript: `Man: What are you doing, Janet?
Woman: Just surfing the Internet, Mike. Did you know that there's a place in England called Sandwich?
Man: Really? Is that where sandwiches came from?
Woman: Hmm, let me check. No, it says here that sandwiches came from England, but not from that town. They were created by Lord Montagu, the Earl of Sandwich.
Man: So, did he live in Sandwich?
Woman: No, he just had that name.
Man: How did he create them?
Woman: Well, it says that he asked for some meat to be served between some bread. He didn't want to stop gambling to eat.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: 'Mike found Janet ______ the ______.',
        options: [
          { key: 'a', text: 'reading / newspaper' },
          { key: 'b', text: 'cooking / dinner' },
          { key: 'c', text: 'gambling in / casino' },
          { key: 'd', text: 'surfing / Internet' },
        ],
        correctAnswer: 'd',
        explanation: 'The dialogue opens with Janet surfing the Internet.',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: 'Lord Montagu was the ______ of ______.',
        options: [
          { key: 'a', text: 'King / England' },
          { key: 'b', text: 'Earl / Sandwich' },
          { key: 'c', text: 'Chef / Hamburg' },
          { key: 'd', text: 'Captain / Persia' },
        ],
        correctAnswer: 'b',
        explanation: 'Janet reads that sandwiches were created by Lord Montagu, the Earl of Sandwich.',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: 'The first sandwich was made with ______ and ______.',
        options: [
          { key: 'a', text: 'bread / meat' },
          { key: 'b', text: 'cheese / curry' },
          { key: 'c', text: 'spices / fish' },
          { key: 'd', text: 'butter / jelly' },
        ],
        correctAnswer: 'a',
        explanation: 'He asked for some meat to be served between some bread so he could eat while gambling.',
      },
    ],
  },

  grammar: {
    title: 'Past Continuous',
    ruleExplanation:
      'We use the past continuous in order to talk about past actions in progress. Form: was/were + V-ing.',
    sampleSentences: [
      'Cooks of wealthy English families during the time of King Richard I were making curry dishes.',
      'The Persians were eating round, flat bread with cheese in the 500s.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'Cooks of wealthy English families during the time of King Richard I',
        options: ['were making', 'were made'],
        correctAnswer: 'were making',
        sentenceAfter: 'curry dishes.',
        explanation: 'Active past continuous: the cooks were actively performing the action of making curry.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'The Persians',
        options: ['were eating', 'were eaten'],
        correctAnswer: 'were eating',
        sentenceAfter: 'round, flat bread with cheese in the 500s.',
        explanation: 'Active past continuous with plural subject: “The Persians were eating”.',
      },
    ],
  },

  guidedWriting: {
    title: 'My Favorite Food',
    promptQuestions: [
      '(1) What is your favorite food?',
      '(2) What is it made of?',
      '(3) Can you cook this food?',
      '(4) How often do you cook this food?',
    ],
    exampleText:
      'My favorite food is spaghetti. It is made of noodles and tomato sauce. I can cook it easily. I cook spaghetti once a month.',
    suggestedAnswers: [
      {
        question: 'What is your favorite food and what is it made of?',
        sample: 'My favorite food is Vietnamese Pho. It is made of rice noodles, fresh herbs, and beef soup.',
      },
      {
        question: 'Can you cook this food and how often do you cook it?',
        sample: 'I can cook simple noodle soups easily. I cook this dish once every weekend for my family.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'The man owns three hotels. He is very ______.',
      options: [
        { key: 'a', text: 'comfortable' },
        { key: 'b', text: 'tired' },
        { key: 'c', text: 'unique' },
        { key: 'd', text: 'wealthy' },
      ],
      correctAnswer: 'd',
      explanation: '“wealthy” means having a great deal of money or property; rich.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'People think snakes are dangerous. ______, most snakes are not.',
      options: [
        { key: 'a', text: 'Unusually' },
        { key: 'b', text: 'Finally' },
        { key: 'c', text: 'First' },
        { key: 'd', text: 'Surprisingly' },
      ],
      correctAnswer: 'd',
      explanation: '“Surprisingly” indicates an unexpected fact contrasting with common belief.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: "He knows ______ all of his relatives' birthdays, except for his aunt and uncle's.",
      options: [
        { key: 'a', text: 'in reality' },
        { key: 'b', text: 'before' },
        { key: 'c', text: 'nearly' },
        { key: 'd', text: 'behind' },
      ],
      correctAnswer: 'c',
      explanation: '“nearly” means almost all.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: '______ my mother, washing clothes by hand is better than using a washing machine.',
      options: [
        { key: 'a', text: 'According to' },
        { key: 'b', text: 'Before' },
        { key: 'c', text: 'After' },
        { key: 'd', text: 'In reality' },
      ],
      correctAnswer: 'a',
      explanation: '“According to” introduces an opinion or statement attributed to someone.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'This soup does not ______ right. Did you forget to put in onions?',
      options: [
        { key: 'a', text: 'cook' },
        { key: 'b', text: 'make' },
        { key: 'c', text: 'create' },
        { key: 'd', text: 'taste' },
      ],
      correctAnswer: 'd',
      explanation: '“taste right” refers to whether the flavor meets expectations.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'I do not have enough ______ to make this dish.',
      options: [
        { key: 'a', text: 'fur' },
        { key: 'b', text: 'hamburgers' },
        { key: 'c', text: 'stories' },
        { key: 'd', text: 'spices' },
      ],
      correctAnswer: 'd',
      explanation: 'Spices are cooking ingredients added for flavor.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'We ______ how the magician did the amazing trick.',
      options: [
        { key: 'a', text: 'created' },
        { key: 'b', text: 'found out' },
        { key: 'c', text: 'introduced' },
        { key: 'd', text: 'thought' },
      ],
      correctAnswer: 'b',
      explanation: '“found out” means learned or uncovered the truth.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'I made this sculpture. It is my ______.',
      options: [
        { key: 'a', text: 'creation' },
        { key: 'b', text: 'creates' },
        { key: 'c', text: 'creative' },
      ],
      correctAnswer: 'a',
      explanation: 'Noun form after possessive “my”: “creation”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'How does it taste? Please tell me ______ if it is good or bad.',
      options: [
        { key: 'a', text: 'truth' },
        { key: 'b', text: 'true' },
        { key: 'c', text: 'truthfully' },
      ],
      correctAnswer: 'c',
      explanation: 'Adverb modifying the verb “tell”: “truthfully”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'Let me ______ you to my cousin.',
      options: [
        { key: 'a', text: 'introduction' },
        { key: 'b', text: 'introduce' },
        { key: 'c', text: 'introduced' },
      ],
      correctAnswer: 'b',
      explanation: 'Bare infinitive verb following “let me”: “introduce”.',
    },
  ],
};
