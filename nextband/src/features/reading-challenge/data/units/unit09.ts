import { UnitConfig } from '../../types';

export const unit09: UnitConfig = {
  unitNumber: 9,
  slug: 'dont-trust-me',
  title: "Don't Trust Me!",
  category: 'Social Science',
  audioReadingUrl: '/audio/rc1/17-.mp3',
  audioListeningUrl: '/audio/rc1/18-.mp3',
  wordCount: 207,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. Do you have important information stored on your computer? What kind?',
        sampleAnswer: 'Yes, I have information about my bank account, passwords, and private documents stored on my computer.',
        hint: 'Think of digital banking, email records, and personal photos.',
      },
      {
        id: 'pr-2',
        question: '2. What helps keep your computer safe?',
        sampleAnswer: 'I have a really long password that I use to log in to my computer, along with updated antivirus software.',
        hint: 'Consider firewalls, strong passwords, and security updates.',
      },
      {
        id: 'pr-3',
        question: '3. What do you think is the biggest danger to your computer?',
        sampleAnswer: 'The biggest danger to my computer is a computer virus or phishing scam that I might encounter on the Internet.',
        hint: 'Think of social engineering tricks, malware, or hackers.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: "It's important to have good computer security.",
        underlinedWord: 'security',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'an ninh, an toàn',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'I trust her. She would never do anything bad to me.',
        underlinedWord: 'trust',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'tin tưởng, đặt niềm tin',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'The robber posed as a police officer.',
        underlinedWord: 'posed as',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'đóng giả là, giả mạo thành',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'James is an expert in computers.',
        underlinedWord: 'expert',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'chuyên gia',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'He uses his skills to help people.',
        underlinedWord: 'skills',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'kỹ năng, tay nghề',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'My father advised me about what university I should go to.',
        underlinedWord: 'advised',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'khuyên bảo, tư vấn',
      },
    ],
    definitions: [
      { letter: 'a', text: 'specialist; knowledgeable person' },
      { letter: 'b', text: 'have confidence in' },
      { letter: 'c', text: 'offered suggestions to' },
      { letter: 'd', text: 'safety from harm or attack' },
      { letter: 'e', text: 'abilities' },
      { letter: 'f', text: 'pretended to be' },
    ],
  },

  passageNumberedLines: [
    { text: 'Companies these days spend thousands of dollars on their computer security.' },
    { lineNumber: 2, text: 'They buy the best firewalls and computer programs. However, Kevin Mitnick' },
    { lineNumber: 3, text: 'thinks the biggest danger these days is not a weakness in technology.' },
    { lineNumber: 4, text: 'In the 1990s, Kevin Mitnick was an infamous hacker. He hacked' },
    { lineNumber: 5, text: 'into government and corporate computer systems. After being sent' },
    { text: 'to prison, Mitnick decided to use his skills in a different way. He' },
    { lineNumber: 7, text: 'started his own computer security firm. He now advises people on' },
    { text: 'how to keep their computers safe.' },
    { text: 'According to Mitnick, the biggest danger to security is people.' },
    { lineNumber: 10, text: 'However, by this he doesn’t mean hackers. In fact, he means the' },
    { text: 'people using the programs. "If an attacker' },
    { text: 'can get one trusting person to give his or' },
    { text: 'her information, the attacker gets in. All' },
    { lineNumber: 14, text: 'that money spent is basically wasted." A' },
    { text: 'hacker can get around everything with' },
    { text: 'just one person within the company.' },
    { text: 'Unfortunately, people are still too' },
    { lineNumber: 18, text: 'trusting. In a recent test of the US tax' },
    { text: 'office (the IRS), security experts called 100' },
    { lineNumber: 20, text: 'managers. They posed as IRS computer' },
    { lineNumber: 21, text: 'technicians. The experts were able to fool' },
    { text: '35 of the managers. They gave both their passwords and IDs. In the hands of real' },
    { text: 'hackers, this would have been a disaster!' },
  ],

  passageParagraphs: [
    'Companies these days spend thousands of dollars on their computer security. They buy the best firewalls and computer programs. However, Kevin Mitnick thinks the biggest danger these days is not a weakness in technology.',
    'In the 1990s, Kevin Mitnick was an infamous hacker. He hacked into government and corporate computer systems. After being sent to prison, Mitnick decided to use his skills in a different way. He started his own computer security firm. He now advises people on how to keep their computers safe.',
    'According to Mitnick, the biggest danger to security is people. However, by this he doesn’t mean hackers. In fact, he means the people using the programs. "If an attacker can get one trusting person to give his or her information, the attacker gets in. All that money spent is basically wasted." A hacker can get around everything with just one person within the company.',
    'Unfortunately, people are still too trusting. In a recent test of the US tax office (the IRS), security experts called 100 managers. They posed as IRS computer technicians. The experts were able to fool 35 of the managers. They gave both their passwords and IDs. In the hands of real hackers, this would have been a disaster!',
  ],

  glossary: [
    { line: 2, word: 'firewall', definition: 'a computer program that acts like a barrier', vietnameseMeaning: 'tường lửa bảo mật' },
    { line: 3, word: 'technology', definition: 'electronic or computer products', vietnameseMeaning: 'công nghệ' },
    { line: 4, word: 'hack into', definition: 'to get into illegally', vietnameseMeaning: 'xâm nhập trái phép' },
    { line: 5, word: 'corporate', definition: 'related to a company', vietnameseMeaning: 'thuộc về doanh nghiệp / tập đoàn' },
    { line: 6, word: 'prison', definition: 'jail', vietnameseMeaning: 'nhà tù' },
    { line: 7, word: 'firm', definition: 'a company', vietnameseMeaning: 'công ty' },
    { line: 14, word: 'waste', definition: 'to throw away without using', vietnameseMeaning: 'lãng phí' },
    { line: 18, word: 'tax office', definition: 'the government department that collects money from people', vietnameseMeaning: 'cơ quan thuế' },
    { line: 20, word: 'manager', definition: 'the boss of a department', vietnameseMeaning: 'người quản lý, trưởng phòng' },
    { line: 21, word: 'technician', definition: 'someone whose job involves fixing technology', vietnameseMeaning: 'chuyên viên kỹ thuật' },
    { line: 21, word: 'fool', definition: 'to trick', vietnameseMeaning: 'lừa gạt' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is the main idea of this reading?',
      options: [
        { key: 'a', text: 'Managers need to be more careful about who they talk to.' },
        { key: 'b', text: 'Hackers can help us make our computers safe.' },
        { key: 'c', text: 'Technology is not helpful if people aren’t careful.' },
        { key: 'd', text: 'It’s important to get the newest technology.' },
      ],
      correctAnswer: 'c',
      explanation: 'Lines 11-14 emphasize that expensive firewalls and software are useless if gullible employees leak passwords.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'What is true about Kevin Mitnick?',
      options: [
        { key: 'a', text: 'He now works for the US government.' },
        { key: 'b', text: 'He thinks security technology is too expensive.' },
        { key: 'c', text: 'He used to be a criminal.' },
        { key: 'd', text: 'He teaches people how to hack computers.' },
      ],
      correctAnswer: 'c',
      explanation: 'Lines 4-6 state he was an infamous hacker who was sent to prison.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'What happened at the IRS?',
      options: [
        { key: 'a', text: 'Hackers stole important information.' },
        { key: 'b', text: 'Employees gave information to the wrong people.' },
        { key: 'c', text: 'The security technology had a problem.' },
        { key: 'd', text: 'Managers tested the computer system.' },
      ],
      correctAnswer: 'b',
      explanation: '35 out of 100 managers gave their passwords and IDs to fake technicians over the phone.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'What is Kevin Mitnick’s advice to us?',
      options: [
        { key: 'a', text: 'Don’t give information to strangers.' },
        { key: 'b', text: 'Buy the newest firewalls.' },
        { key: 'c', text: 'Test your computer systems often.' },
        { key: 'd', text: 'Don’t store important information on computers.' },
      ],
      correctAnswer: 'a',
      explanation: 'Mitnick warns that giving information to attackers compromises the entire system.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'What does the word "they" refer to in line 22?',
      options: [
        { key: 'a', text: 'Experts' },
        { key: 'b', text: 'Technicians' },
        { key: 'c', text: 'Managers' },
        { key: 'd', text: 'Hackers' },
      ],
      correctAnswer: 'c',
      explanation: '“They gave both their passwords and IDs” refers to the 35 fooled managers.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'get around',
      definition: 'to avoid; to bypass',
      bookExample: 'How did you get around that issue?',
      sentencePrompt: 'Sam [BLANK] the problem by using another method.',
      correctAnswer: 'got around',
      acceptableAnswers: ['got around', 'gets around'],
      explanation: 'Past tense: “got around”.',
    },
    {
      id: 'id-2',
      idiom: 'pose as',
      definition: 'to pretend to be',
      bookExample: 'He had to pose as the milkman in order to escape.',
      sentencePrompt: 'The man [BLANK] the president was an obvious fake.',
      correctAnswer: 'posing as',
      acceptableAnswers: ['posing as'],
      explanation: 'Participle phrase modifying “The man”: “posing as”.',
    },
    {
      id: 'id-3',
      idiom: 'in the hands of',
      definition: 'in the possession of',
      bookExample: 'In the hands of criminals, guns are very dangerous.',
      sentencePrompt: "No plants live long [BLANK] my sister. She doesn't know how to take care of them.",
      correctAnswer: 'in the hands of',
      acceptableAnswers: ['in the hands of'],
      explanation: '“in the hands of” indicates under the care or possession of someone.',
    },
  ],

  summary: {
    instruction: 'Paraphrase the paired sentences from the passage to create a concise summary.',
    wordBank: [
      'was sent to prison',
      'people using the programs',
      'gave them both their passwords and IDs',
    ],
    passageTemplate: `1. Mitnick, who [BLANK_0], decided to use his skills to set up a computer security firm.
2. Mitnick believes the biggest danger to security these days is the [BLANK_1].
3. The security experts fooled quite a few managers, who [BLANK_2].`,
    correctAnswers: [
      'was sent to prison',
      'people using the programs',
      'gave them both their passwords and IDs',
    ],
    vietnameseTranslation: 'Tóm tắt bài học: Cựu hacker Kevin Mitnick sau khi ra tù đã lập công ty bảo mật. Ông cho rằng mối nguy lớn nhất không phải do phần mềm mà do chính người sử dụng ngây thơ. Trong một thử nghiệm ở sở thuế IRS, các chuyên gia giả danh kỹ thuật viên đã lừa được 35 quản lý nộp mật khẩu và ID.',
  },

  listeningDictation: {
    dialogTitle: 'Got Her!',
    audioUrl: '/audio/rc1/18-.mp3',
    trackNumber: 18,
    speakers: [
      {
        speaker: 'Woman',
        lines: [{ text: 'Did you hear about Paris Hilton?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'No, why do you ask?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Someone hacked into her phone.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Hacked into her phone? Is that possible?' }],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'Yes, they got her password and ID. They stole photos, email addresses, and phone numbers from her phone.' },
        ],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Wow, how did they get her password and ID?' }],
      },
      {
        speaker: 'Woman',
        lines: [
          { text: 'She gave it to them. She thought they worked for the phone company, so she just told it to them.' },
        ],
      },
    ],
    fullTranscript: `Woman: Did you hear about Paris Hilton?
Man: No, why do you ask?
Woman: Someone hacked into her phone.
Man: Hacked into her phone? Is that possible?
Woman: Yes, they got her password and ID. They stole photos, email addresses, and phone numbers from her phone.
Man: Wow, how did they get her password and ID?
Woman: She gave it to them. She thought they worked for the phone company, so she just told it to them.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: '1. Paris Hilton had her computer hacked.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'False',
        explanation: 'It was her phone, not her computer (Answer Key: False).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: '2. Among other things, the hackers stole email addresses and photos.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'The woman states they stole photos, email addresses, and phone numbers (Answer Key: True).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: '3. Paris Hilton gave her password and ID to the hackers.',
        options: [
          { key: 'True', text: 'True' },
          { key: 'False', text: 'False' },
        ],
        correctAnswer: 'True',
        explanation: 'She thought they worked for the phone company, so she told them directly (Answer Key: True).',
      },
    ],
  },

  grammar: {
    title: 'Expressing Quantity',
    ruleExplanation:
      'Phrases expressing quantity (like thousands of dollars) are followed by a plural noun, while non-count nouns (like money) take singular verbs (is).',
    sampleSentences: [
      'Companies these days spend thousands of dollars on their computer security.',
      'All that money spent is basically wasted.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'Companies these days spend thousands of',
        options: ['dollar', 'dollars'],
        correctAnswer: 'dollars',
        sentenceAfter: 'on their computer security.',
        explanation: '“thousands of” requires a plural count noun: dollars.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'All that money spent',
        options: ['is', 'are'],
        correctAnswer: 'is',
        sentenceAfter: 'basically wasted.',
        explanation: 'Non-count noun “money” takes the singular verb “is”.',
      },
    ],
  },

  guidedWriting: {
    title: 'My Computer',
    promptQuestions: [
      '(1) How much important information do you have stored on your computer?',
      '(2) What kind of information is it?',
      '(3) Do you worry about keeping this information safe?',
      '(4) Why or why not?',
    ],
    exampleText:
      "I have a lot of important information stored on my computer. I have school information and bank information. I don't worry about keeping it safe. My computer is at home, and only a few people can get into or use it.",
    suggestedAnswers: [
      {
        question: 'What important information is on your computer?',
        sample: 'I store university coursework, code repositories, and personal photographs on my laptop.',
      },
      {
        question: 'Do you worry about keeping it safe and why?',
        sample: 'Yes, I do worry about ransomware. That is why I use two-factor authentication and back up files regularly to an external hard drive.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'My cousin fixes pianos. He is a piano ______.',
      options: [
        { key: 'a', text: 'computer' },
        { key: 'b', text: 'technician' },
        { key: 'c', text: 'technology' },
        { key: 'd', text: 'engine' },
      ],
      correctAnswer: 'b',
      explanation: 'A skilled specialist who repairs mechanisms is a technician.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'Bob has a lot of ______ with machines.',
      options: [
        { key: 'a', text: 'skill' },
        { key: 'b', text: 'waste' },
        { key: 'c', text: 'firewall' },
        { key: 'd', text: 'change' },
      ],
      correctAnswer: 'a',
      explanation: 'Proficiency or ability with mechanisms is skill.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'She works in a law ______.',
      options: [
        { key: 'a', text: 'tax office' },
        { key: 'b', text: 'flight' },
        { key: 'c', text: 'government' },
        { key: 'd', text: 'firm' },
      ],
      correctAnswer: 'd',
      explanation: 'A partnership or legal practice company is a law firm.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'Karen ______ passed the bar exam. Now she is a lawyer!',
      options: [
        { key: 'a', text: 'unfortunately' },
        { key: 'b', text: 'usually' },
        { key: 'c', text: 'extremely' },
        { key: 'd', text: 'successfully' },
      ],
      correctAnswer: 'd',
      explanation: '“successfully” means achieving the desired result.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'He stole a car, so he went to ______.',
      options: [
        { key: 'a', text: 'security' },
        { key: 'b', text: 'manager' },
        { key: 'c', text: 'prison' },
        { key: 'd', text: 'firewall' },
      ],
      correctAnswer: 'c',
      explanation: 'Criminal punishment involves being locked in prison.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'My teacher ______ my mistakes so I could fix them.',
      options: [
        { key: 'a', text: 'kept up with' },
        { key: 'b', text: 'pointed out' },
        { key: 'c', text: 'got around' },
        { key: 'd', text: 'gave up' },
      ],
      correctAnswer: 'b',
      explanation: '“pointed out” means drew attention to.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'I believed him, but he totally ______ me.',
      options: [
        { key: 'a', text: 'fooled' },
        { key: 'b', text: 'posed' },
        { key: 'c', text: 'trusted' },
        { key: 'd', text: 'discovered' },
      ],
      correctAnswer: 'a',
      explanation: '“fooled” means tricked or deceived.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'He is a very ______ person. He would never cheat anyone.',
      options: [
        { key: 'a', text: 'trust' },
        { key: 'b', text: 'trusting' },
        { key: 'c', text: 'trustworthy' },
      ],
      correctAnswer: 'c',
      explanation: 'Describing an honest person who does not cheat: “trustworthy”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'What ______ can you give me?',
      options: [
        { key: 'a', text: 'advise' },
        { key: 'b', text: 'advice' },
        { key: 'c', text: 'advised' },
      ],
      correctAnswer: 'b',
      explanation: 'Noun object after “give me”: “advice”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: '______ is a big problem for computer security.',
      options: [
        { key: 'a', text: 'Hacked' },
        { key: 'b', text: 'Hacker' },
        { key: 'c', text: 'Hacking' },
      ],
      correctAnswer: 'c',
      explanation: 'Gerund subject of the sentence: “Hacking”.',
    },
  ],
};
