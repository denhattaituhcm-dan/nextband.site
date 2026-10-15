import { UnitConfig } from '../../types';

export const unit07: UnitConfig = {
  unitNumber: 7,
  slug: 'not-the-normal-news',
  title: 'Not the Normal News',
  category: 'Social Science',
  audioReadingUrl: '/audio/rc1/13-.mp3',
  audioListeningUrl: '/audio/rc1/14-.mp3',
  wordCount: 230,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. What was one thing in the news over the past few days?',
        sampleAnswer: 'One thing in the news was the death of a famous singer in my country.',
        hint: 'Recall recent prominent headlines or cultural events.',
      },
      {
        id: 'pr-2',
        question: '2. Was the information in this report happy, sad, or scary?',
        sampleAnswer: 'The information in this article was sad and a little scary because the singer died from a medical accident.',
        hint: 'Reflect on emotional reactions to typical news broadcasts.',
      },
      {
        id: 'pr-3',
        question: '3. What was a funny story that you heard recently?',
        sampleAnswer: 'One funny story that I heard recently was about research showing how pets can cleverly control their owners.',
        hint: 'Think of amusing human interest or animal behavior stories.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'In reality, many people live in extreme poverty.',
        underlinedWord: 'In reality',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'trên thực tế',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'He had a negative attitude, so he expected bad things to happen.',
        underlinedWord: 'negative',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'tiêu cực, bi quan',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'The journalist wrote about crime and other problems.',
        underlinedWord: 'journalist',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'nhà báo, phóng viên',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'There is a website that links people with the same interests.',
        underlinedWord: 'links',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'kết nối, liên kết',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'He decided to create an online community.',
        underlinedWord: 'community',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'cộng đồng',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'The article will inspire readers to help others.',
        underlinedWord: 'inspire',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'truyền cảm hứng',
      },
    ],
    definitions: [
      { letter: 'a', text: 'thinking about the bad qualities of someone or something' },
      { letter: 'b', text: 'give someone the enthusiasm to do something' },
      { letter: 'c', text: 'a person who writes news reports' },
      { letter: 'd', text: 'connects' },
      { letter: 'e', text: 'a group of people with the same interest' },
      { letter: 'f', text: 'actually' },
    ],
  },

  passageNumberedLines: [
    { text: 'Newspapers and television news programs always seem to report about the' },
    { lineNumber: 2, text: 'bad things happening in society. However, there is a place where readers' },
    { text: 'can find some good news. That place is the website called HappyNews.' },
    { text: 'The man behind HappyNews is Byron Reese. Reese set up HappyNews because' },
    { lineNumber: 5, text: 'he thought other news sources were giving people an unbalanced view of the' },
    { lineNumber: 6, text: 'world. Reese said about HappyNews, "The news media gives you a distorted view' },
    { lineNumber: 7, text: 'of the world by exaggerating bad news, misery, and despair. We’re trying to balance' },
    { text: 'out the scale."' },
    { text: 'Not everyone agrees with Reese’s view, though. Many people think that news' },
    { lineNumber: 10, text: 'sources have a responsibility to provide news that is helpful to people. People need to' },
    { text: 'know about issues or problems in today’s society. Then people are better able to' },
    { text: 'make informed decisions about things that affect their daily lives. Reese said that' },
    { text: 'HappyNews is not trying to stop people from learning about issues or problems.' },
    { text: 'HappyNews is just trying to provide a balanced' },
    { lineNumber: 15, text: 'picture of today’s world.' },
    { text: 'By the end of its first month online, HappyNews' },
    { text: 'had more than 70,000 unique readers. About 60' },
    { text: 'percent of those readers were women. Something' },
    { text: 'else unique makes HappyNews different from' },
    { lineNumber: 20, text: 'any of the other news or information websites' },
    { text: 'that are on the Internet. Unlike many other' },
    { lineNumber: 22, text: 'websites, HappyNews gets fan mail from its' },
    { text: 'readers on a daily basis.' },
  ],

  passageParagraphs: [
    'Newspapers and television news programs always seem to report about the bad things happening in society. However, there is a place where readers can find some good news. That place is the website called HappyNews.',
    'The man behind HappyNews is Byron Reese. Reese set up HappyNews because he thought other news sources were giving people an unbalanced view of the world. Reese said about HappyNews, "The news media gives you a distorted view of the world by exaggerating bad news, misery, and despair. We’re trying to balance out the scale."',
    'Not everyone agrees with Reese’s view, though. Many people think that news sources have a responsibility to provide news that is helpful to people. People need to know about issues or problems in today’s society. Then people are better able to make informed decisions about things that affect their daily lives. Reese said that HappyNews is not trying to stop people from learning about issues or problems. HappyNews is just trying to provide a balanced picture of today’s world.',
    'By the end of its first month online, HappyNews had more than 70,000 unique readers. About 60 percent of those readers were women. Something else unique makes HappyNews different from any of the other news or information websites that are on the Internet. Unlike many other websites, HappyNews gets fan mail from its readers on a daily basis.',
  ],

  glossary: [
    { line: 2, word: 'society', definition: 'a body of individuals living as members of a community', vietnameseMeaning: 'xã hội' },
    { line: 5, word: 'unbalanced', definition: 'not equal; one-sided', vietnameseMeaning: 'mất cân bằng, phiến diện' },
    { line: 6, word: 'news media', definition: 'newspapers, magazines, TV news shows, etc.', vietnameseMeaning: 'phương tiện truyền thông' },
    { line: 6, word: 'distort', definition: 'to not truly represent the facts; to be false', vietnameseMeaning: 'xuyên tạc, bóp méo' },
    { line: 7, word: 'exaggerate', definition: 'to describe something as larger or more extreme than it is', vietnameseMeaning: 'thổi phồng, phóng đại' },
    { line: 7, word: 'misery', definition: 'suffering; sadness', vietnameseMeaning: 'sự khốn khổ' },
    { line: 7, word: 'despair', definition: 'without hope; extreme sadness', vietnameseMeaning: 'sự tuyệt vọng' },
    { line: 22, word: 'fan mail', definition: 'letters or notes from people who enjoy or support something', vietnameseMeaning: 'thư của người hâm mộ' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is another possible title for the reading?',
      options: [
        { key: 'a', text: '“Byron Reese Tells People How to Be Happy”' },
        { key: 'b', text: '“Good News for a Change”' },
        { key: 'c', text: '“Newspapers vs. Online News”' },
        { key: 'd', text: '“Why Women Like HappyNews”' },
      ],
      correctAnswer: 'b',
      explanation: '“Good News for a Change” captures the essence of providing uplifting news rather than relentless tragedy.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'How is HappyNews different than other news sources?',
      options: [
        { key: 'a', text: 'All of the stories are written by Reese.' },
        { key: 'b', text: 'HappyNews does not exaggerate its stories.' },
        { key: 'c', text: 'Its stories are not about bad things.' },
        { key: 'd', text: 'The website only has stories about women.' },
      ],
      correctAnswer: 'c',
      explanation: 'Lines 2-3 explain that readers find good news rather than bad things happening in society.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'Why might some people NOT like HappyNews?',
      options: [
        { key: 'a', text: 'It doesn’t tell them about important issues or problems.' },
        { key: 'b', text: 'Reese’s stories are about misery and despair.' },
        { key: 'c', text: 'Some sources give a balanced view.' },
        { key: 'd', text: 'The stories are from around the world.' },
      ],
      correctAnswer: 'a',
      explanation: 'Lines 9-11 note that critics feel the media must highlight pressing problems so citizens can make informed decisions.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'Which of the following is NOT true about HappyNews after its first month online?',
      options: [
        { key: 'a', text: 'It had thousands of readers.' },
        { key: 'b', text: 'Most of its readers were women.' },
        { key: 'c', text: 'Readers sent in nice letters about it every day.' },
        { key: 'd', text: 'Reese used it to create other websites.' },
      ],
      correctAnswer: 'd',
      explanation: 'The text makes no mention of Reese creating other websites.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'What does “unique” mean in this reading?',
      options: [
        { key: 'a', text: 'Different' },
        { key: 'b', text: 'Interesting' },
        { key: 'c', text: 'One of a kind' },
        { key: 'd', text: 'Awful' },
      ],
      correctAnswer: 'a',
      explanation: 'Lines 18-20 use unique to mean distinct or different from standard websites.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'on a daily basis',
      definition: 'every day',
      bookExample: 'Do you exercise on a daily basis?',
      sentencePrompt: 'It is important to practice your English [BLANK].',
      correctAnswer: 'on a daily basis',
      acceptableAnswers: ['on a daily basis'],
      explanation: '“on a daily basis” means regularly every day.',
    },
    {
      id: 'id-2',
      idiom: 'agree with',
      definition: 'to have the same idea or opinion as someone',
      bookExample: 'I agree with you. Last night’s homework was very difficult.',
      sentencePrompt: 'Not all of the reports [BLANK] each other about the facts of the court case.',
      correctAnswer: 'agree with',
      acceptableAnswers: ['agree with'],
      explanation: '“agree with” means match or concur.',
    },
    {
      id: 'id-3',
      idiom: 'set up',
      definition: 'to create; to start',
      bookExample: 'Henry Ford set up his car company in 1903.',
      sentencePrompt: 'The artist [BLANK] her new studio in her basement.',
      correctAnswer: 'set up',
      acceptableAnswers: ['set up'],
      explanation: 'Past tense “set up” means established or established the arrangement of.',
    },
  ],

  summary: {
    instruction: 'Fill in the blanks with the correct words or phrases from the word bank.',
    wordBank: ['agrees with', 'balanced', 'reports', 'responsibility', 'set up'],
    passageTemplate: `A man named Byron Reese [BLANK_0] an online source of news information. Reese's website is different from other news media because his website only [BLANK_1] happy news. Reese believes that he can provide a more [BLANK_2] view of today's society by reporting stories that don't focus on bad things. Others believe that the news media has the [BLANK_3] to report on issues that people need to know about. Reese [BLANK_4] them, but he also thinks people get a distorted view of the world if they only hear about bad news all the time.`,
    correctAnswers: ['set up', 'reports', 'balanced', 'responsibility', 'agrees with'],
    vietnameseTranslation: 'Byron Reese thành lập trang HappyNews chỉ đưa tin tích cực nhằm tạo góc nhìn cân bằng hơn về cuộc sống. Mặc dù báo chí có trách nhiệm đưa tin về các tệ nạn xã hội, Reese đồng tình nhưng tin rằng chỉ đọc tin xấu sẽ bóp méo nhận thức của công chúng.',
  },

  listeningDictation: {
    dialogTitle: 'Sources of the News',
    audioUrl: '/audio/rc1/14-.mp3',
    trackNumber: 14,
    speakers: [
      {
        speaker: 'Woman',
        lines: [
          { text: 'Where do you think HappyNews gets all of the information it reports on?' },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: 'The information I read said that on the HappyNews website, you will find stories from other news media sources. The stories are just read by the editors who work for HappyNews first to make sure they are OK for the website.' },
        ],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'So, they just look for happy stories from other news sources and collect those on their website?' },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: 'That’s right. Also, they may post stories from regular people, as long as the stories are written like news reports.' },
        ],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'So, I could write a story for HappyNews?' },
        ],
      },
      {
        speaker: 'Man',
        lines: [
          { text: 'You could, but be sure to provide sources for the information in your story. The editors at HappyNews have to check your facts before they’ll post your story.' },
        ],
      },
    ],
    fullTranscript: `Woman: Where do you think HappyNews gets all of the information it reports on?
Man: The information I read said that on the HappyNews website, you will find stories from other news media sources. The stories are just read by the editors who work for HappyNews first to make sure they are OK for the website.
Woman: So, they just look for happy stories from other news sources and collect those on their website?
Man: That’s right. Also, they may post stories from regular people, as long as the stories are written like news reports.
Woman: So, I could write a story for HappyNews?
Man: You could, but be sure to provide sources for the information in your story. The editors at HappyNews have to check your facts before they’ll post your story.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: 'Who reviews news stories before they are posted on HappyNews?',
        options: [
          { key: 'a', text: 'Byron Reese' },
          { key: 'b', text: 'HappyNews editors' },
          { key: 'c', text: 'HappyNews readers' },
          { key: 'd', text: 'Other news sources' },
        ],
        correctAnswer: 'b',
        explanation: 'The man states that HappyNews editors read the stories first (Key: b).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: 'Which of the following statements is true according to the dialog?',
        options: [
          { key: 'a', text: 'Both speakers have written stories for HappyNews.' },
          { key: 'b', text: 'HappyNews stories cannot be found in other news sources.' },
          { key: 'c', text: 'Regular people can write stories for HappyNews.' },
          { key: 'd', text: 'The HappyNews editors rewrite stories from other news sources.' },
        ],
        correctAnswer: 'c',
        explanation: 'He says: "Also, they may post stories from regular people, as long as the stories are written like news reports" (Key: c).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: 'What should a writer be sure to include with his or her story?',
        options: [
          { key: 'a', text: 'Extra copies' },
          { key: 'b', text: 'Other media' },
          { key: 'c', text: 'Photographs' },
          { key: 'd', text: 'Sources' },
        ],
        correctAnswer: 'd',
        explanation: 'He warns: "be sure to provide sources for the information in your story" (Key: d).',
      },
    ],
  },

  grammar: {
    title: 'Frequency Adverbs',
    ruleExplanation:
      'Frequency adverbs (e.g. always, usually, often) are placed before the main verb. Adverbial prepositional phrases like "on a daily basis" appear at the end or beginning of a sentence.',
    sampleSentences: [
      'Newspapers always seem to report about the bad things happening in society.',
      'HappyNews gets fan mail from its readers on a daily basis.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'Newspapers',
        options: ['always seem', 'seem always'],
        correctAnswer: 'always seem',
        sentenceAfter: 'to report about the bad things happening in society.',
        explanation: 'Frequency adverb before main verb: “always seem”.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'HappyNews gets fan mail from its readers',
        options: ['on a daily basis', 'daily on a basis'],
        correctAnswer: 'on a daily basis',
        sentenceAfter: '.',
        explanation: 'Standard idiom meaning every day: “on a daily basis”.',
      },
    ],
  },

  guidedWriting: {
    title: 'Where I Get My News',
    promptQuestions: [
      '(1) Where do you usually hear or read news reports?',
      '(2) Is the news from this source mostly about issues in society or entertainment?',
      '(3) Why do you like to get your news from this source?',
      '(4) Have you heard or read this news source today?',
    ],
    exampleText:
      'I usually read news reports online from an international newspaper’s website. The news from this source is mostly about issues in society. I like to get my news from this source because the articles are short and easy to read. I have not read this news source today, but I will read it tonight before I go to sleep.',
    suggestedAnswers: [
      {
        question: 'Where do you get news and what is it mostly about?',
        sample: 'I usually read news reports on mobile news apps. The news is mostly about global economics and technology.',
      },
      {
        question: 'Why do you like it and did you read it today?',
        sample: 'I like it because push notifications keep me updated instantly. I already read several articles this morning.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'Do you know when people ______ how to make concrete?',
      options: [
        { key: 'a', text: 'discovered' },
        { key: 'b', text: 'prevented' },
        { key: 'c', text: 'provided' },
        { key: 'd', text: 'reported' },
      ],
      correctAnswer: 'a',
      explanation: '“discovered” means found out how to produce.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'He used only his personal money to ______ his new company.',
      options: [
        { key: 'a', text: 'agree with' },
        { key: 'b', text: 'set up' },
        { key: 'c', text: 'shut down' },
        { key: 'd', text: 'move around' },
      ],
      correctAnswer: 'b',
      explanation: '“set up” means found or establish a business.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'No one told me that locking the door at night was my ______.',
      options: [
        { key: 'a', text: 'activity' },
        { key: 'b', text: 'diversity' },
        { key: 'c', text: 'misery' },
        { key: 'd', text: 'responsibility' },
      ],
      correctAnswer: 'd',
      explanation: 'A duty or obligation is a responsibility.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'Sometimes I am not sure if I can really trust the information reported by the ______.',
      options: [
        { key: 'a', text: 'fan mail' },
        { key: 'b', text: 'news media' },
        { key: 'c', text: 'role model' },
        { key: 'd', text: 'view' },
      ],
      correctAnswer: 'b',
      explanation: 'Journalistic outlets are collectively called the news media.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'The essay was too one-sided. It did not give a ______ presentation of the situation.',
      options: [
        { key: 'a', text: 'balanced' },
        { key: 'b', text: 'complex' },
        { key: 'c', text: 'daily' },
        { key: 'd', text: 'distorted' },
      ],
      correctAnswer: 'a',
      explanation: 'A fair, multi-sided presentation is “balanced”.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'When people live together in a ______, they have to agree on certain rules to follow.',
      options: [
        { key: 'a', text: 'behavior' },
        { key: 'b', text: 'despair' },
        { key: 'c', text: 'society' },
        { key: 'd', text: 'stress' },
      ],
      correctAnswer: 'c',
      explanation: 'An organized community of individuals is a society.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'The ______ that you heard was just rain hitting the window.',
      options: [
        { key: 'a', text: 'benefit' },
        { key: 'b', text: 'issue' },
        { key: 'c', text: 'noise' },
        { key: 'd', text: 'source' },
      ],
      correctAnswer: 'c',
      explanation: 'An audible sound is a noise.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: "I don't think all teenagers are ______. Some of them are quite mature and hard-working.",
      options: [
        { key: 'a', text: 'responsibility' },
        { key: 'b', text: 'responsible' },
        { key: 'c', text: 'irresponsible' },
      ],
      correctAnswer: 'c',
      explanation: 'Negative adjective contrasting with “mature”: “irresponsible”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'Lots of people these days belong to ______ networking websites.',
      options: [
        { key: 'a', text: 'society' },
        { key: 'b', text: 'social' },
        { key: 'c', text: 'socially' },
      ],
      correctAnswer: 'b',
      explanation: 'Adjective modifying “networking”: “social”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'The fish could not have been that big. You are ______.',
      options: [
        { key: 'a', text: 'exaggeration' },
        { key: 'b', text: 'exaggerating' },
        { key: 'c', text: 'exaggerated' },
      ],
      correctAnswer: 'b',
      explanation: 'Present continuous verb form after “are”: “exaggerating”.',
    },
  ],
};
