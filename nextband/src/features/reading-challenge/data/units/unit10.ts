import { UnitConfig } from '../../types';

export const unit10: UnitConfig = {
  unitNumber: 10,
  slug: 'bugs-for-sale',
  title: 'Bugs for Sale',
  category: 'Sports and Hobbies',
  audioReadingUrl: '/audio/rc1/19-.mp3',
  audioListeningUrl: '/audio/rc1/20-.mp3',
  wordCount: 219,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. What kinds of things are being sold in unusual machines?',
        sampleAnswer: 'I have seen machines selling worms, live bait, umbrellas, and fresh eggs.',
        hint: 'Think of specialty automated dispensers around the world.',
      },
      {
        id: 'pr-2',
        question: '2. Why would people buy such things from this machine?',
        sampleAnswer: 'People might buy live bait or beetles for fishing or keeping them as unusual pets at any hour.',
        hint: 'Consider convenience and collector hobbies.',
      },
      {
        id: 'pr-3',
        question: '3. What is the strangest thing you have seen in a machine?',
        sampleAnswer: 'The strangest thing I have seen in a vending machine is hot pizzas and gold bars.',
        hint: 'Recall airport or overseas novelty machines.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'I enjoyed my experience in Japan.',
        underlinedWord: 'experience',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'trải nghiệm',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'It was a clever idea to do that. No one had had that idea before.',
        underlinedWord: 'clever',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'thông minh, tài tình',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: "My daughter's hobby is collecting insects.",
        underlinedWord: 'hobby',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'sở thích khi rảnh rỗi',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'They disagree with the pet store. They think those animals should not be sold.',
        underlinedWord: 'disagree',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'bất đồng ý kiến, không đồng ý',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'People built houses on the animals’ homes. Now the animals are very rare.',
        underlinedWord: 'rare',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'quý hiếm, ít thấy',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'She thought it was strange to see insects in a vending machine.',
        underlinedWord: 'strange',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'kỳ lạ, khác thường',
      },
    ],
    definitions: [
      { letter: 'a', text: 'have a different opinion' },
      { letter: 'b', text: 'pastime' },
      { letter: 'c', text: 'smart' },
      { letter: 'd', text: 'something that happens to a person' },
      { letter: 'e', text: 'unexpected; not usual or ordinary' },
      { letter: 'f', text: 'not common' },
    ],
  },

  passageNumberedLines: [
    { text: 'How often have you gone to a vending machine to get a bag of chips? What if' },
    { lineNumber: 2, text: 'you found a pair of live beetles instead? It may sound strange, but a company' },
    { text: 'in Japan sells large beetles through vending machines. The vending machine' },
    { lineNumber: 4, text: 'company and nature conservationists disagree about selling beetles this way.' },
    { lineNumber: 5, text: 'Many school-age children in Japan collect beetles. Other people also enjoy this' },
    { lineNumber: 6, text: 'hobby. However, people are building houses where the beetles live. This destroys' },
    { text: 'the beetles’ homes. Now, it is difficult to find the beetles in the wild.' },
    { text: 'Since 1999, the Mirai Seiko Company has been selling these beetles in vending' },
    { lineNumber: 9, text: 'machines. The company says that it wants to help people own these rare insects. It' },
    { text: 'also says that it takes good care of the beetles in the machines.' },
    { text: 'True or not, the machines are very popular. The machines' },
    { text: 'sell more than 1,500 beetles per month. Sometimes,' },
    { text: 'people buy all the beetles in a machine in just a few' },
    { text: 'minutes.' },
    { text: 'On the other hand, conservationists feel that' },
    { lineNumber: 16, text: 'the machines are harmful. Children may think that' },
    { text: 'living creatures are like soft drinks or boxes of candy.' },
    { text: 'Do you feel that the vending machines give people a rare' },
    { text: 'experience, or that they give children bad ideas? Either' },
    { lineNumber: 20, text: 'way, they show how clever people can be.' },
  ],

  passageParagraphs: [
    'How often have you gone to a vending machine to get a bag of chips? What if you found a pair of live beetles instead? It may sound strange, but a company in Japan sells large beetles through vending machines. The vending machine company and nature conservationists disagree about selling beetles this way.',
    'Many school-age children in Japan collect beetles. Other people also enjoy this hobby. However, people are building houses where the beetles live. This destroys the beetles’ homes. Now, it is difficult to find the beetles in the wild.',
    'Since 1999, the Mirai Seiko Company has been selling these beetles in vending machines. The company says that it wants to help people own these rare insects. It also says that it takes good care of the beetles in the machines. True or not, the machines are very popular. The machines sell more than 1,500 beetles per month. Sometimes, people buy all the beetles in a machine in just a few minutes.',
    'On the other hand, conservationists feel that the machines are harmful. Children may think that living creatures are like soft drinks or boxes of candy. Do you feel that the vending machines give people a rare experience, or that they give children bad ideas? Either way, they show how clever people can be.',
  ],

  glossary: [
    { line: 1, word: 'vending machine', definition: 'a machine that sells things', vietnameseMeaning: 'máy bán hàng tự động' },
    { line: 2, word: 'beetle', definition: 'an insect with a large body', vietnameseMeaning: 'bọ cánh cứng' },
    { line: 4, word: 'nature', definition: 'the world of plants and animals', vietnameseMeaning: 'thiên nhiên' },
    { line: 4, word: 'conservationist', definition: 'a person who wants to help the environment', vietnameseMeaning: 'nhà bảo tồn thiên nhiên' },
    { line: 5, word: 'collect', definition: 'to gather things that you like', vietnameseMeaning: 'sưu tập' },
    { line: 6, word: 'destroy', definition: 'to break into pieces', vietnameseMeaning: 'phá hủy' },
    { line: 9, word: 'own', definition: 'to have personally or privately', vietnameseMeaning: 'sở hữu' },
    { line: 16, word: 'harmful', definition: 'hurtful; damaging', vietnameseMeaning: 'gây hại' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is another good title for this reading?',
      options: [
        { key: 'a', text: '“Expensive Beetles in Japan”' },
        { key: 'b', text: '“Unusual Vending Machines”' },
        { key: 'c', text: '“Japanese Beetles”' },
        { key: 'd', text: '“Japanese Children’s Hobbies”' },
      ],
      correctAnswer: 'b',
      explanation: 'The passage highlights the unusual novelty of vending machines dispensing live insects in Japan.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'Who likes to collect beetles as pets?',
      options: [
        { key: 'a', text: 'Mirai Seiko' },
        { key: 'b', text: 'Many people in Japan' },
        { key: 'c', text: 'Only Japanese schoolchildren' },
        { key: 'd', text: 'Conservationists' },
      ],
      correctAnswer: 'b',
      explanation: 'Lines 5-6 state that school children and other people in Japan enjoy collecting beetles.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'Why is it hard to find beetles in the wild?',
      options: [
        { key: 'a', text: 'They are too fast.' },
        { key: 'b', text: 'They live underground.' },
        { key: 'c', text: 'Their homes are disappearing.' },
        { key: 'd', text: 'They die very easily.' },
      ],
      correctAnswer: 'c',
      explanation: 'Line 6-7 note that house building destroys the natural habitats of the beetles.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'How quickly do the beetles usually sell out?',
      options: [
        { key: 'a', text: 'Within a couple of days' },
        { key: 'b', text: 'Within hours' },
        { key: 'c', text: 'Within a month' },
        { key: 'd', text: 'Within minutes' },
      ],
      correctAnswer: 'd',
      explanation: 'Line 13-14 says people sometimes buy all the beetles in a machine in just a few minutes.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'Why do conservationists dislike the beetle vending machines?',
      options: [
        { key: 'a', text: 'People learn bad ideas about animals.' },
        { key: 'b', text: 'The beetles are too expensive.' },
        { key: 'c', text: 'No one wants the beetles.' },
        { key: 'd', text: 'The beetles don’t get food.' },
      ],
      correctAnswer: 'a',
      explanation: 'Lines 16-17 warn that children may treat living creatures like canned sodas or cheap toys.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: '[a] pair of',
      definition: 'two things, usually two of the same thing',
      bookExample: 'See that pair of ducks? They will stay together for life.',
      sentencePrompt: 'I just bought a [BLANK] skates.',
      correctAnswer: 'pair of',
      acceptableAnswers: ['pair of'],
      explanation: '“pair of” indicates a set of two matching items.',
    },
    {
      id: 'id-2',
      idiom: 'on the other hand',
      definition: 'looking at the opposite side of a matter',
      bookExample: 'He is very smart. On the other hand, he is very lazy.',
      sentencePrompt: 'My sister is really outgoing. [BLANK], I am very shy.',
      correctAnswer: 'On the other hand',
      acceptableAnswers: ['On the other hand', 'on the other hand'],
      explanation: '“On the other hand” introduces contrasting perspective.',
    },
    {
      id: 'id-3',
      idiom: 'take good care of',
      definition: 'to look after someone or something',
      bookExample: 'Please take good care of my dog while I am gone.',
      sentencePrompt: 'She [BLANK] herself. She never gets sick.',
      correctAnswer: 'takes good care of',
      acceptableAnswers: ['takes good care of'],
      explanation: 'Third-person singular present form “takes good care of”.',
    },
  ],

  summary: {
    instruction: 'Fill in the blanks with the correct words from the word bank.',
    wordBank: ['beetles', 'clever', 'disagree', 'rare', 'vending'],
    passageTemplate: `In Japan, many people like to collect [BLANK_0]. However, the beetles have lost their homes in many parts of Japan. They are very [BLANK_1] these days. A Japanese company started selling these beetles in [BLANK_2] machines. The company says that they want to help people own the beetles. However, some people [BLANK_3] with the company. They think that beetles should only live in nature. Even so, it was a [BLANK_4] idea to sell beetles this way.`,
    correctAnswers: ['beetles', 'rare', 'vending', 'disagree', 'clever'],
    vietnameseTranslation: 'Tóm tắt bài đọc: Tại Nhật, nhiều người thích nuôi bọ cánh cứng, nhưng việc phá rừng xây nhà khiến chúng trở nên quý hiếm. Một công ty đã bán bọ trong máy bán hàng tự động để giúp mọi người sở hữu chúng. Các nhà bảo tồn phản đối điều này, dù đây vẫn là một sáng kiến thương mại đầy tài tình.',
  },

  listeningDictation: {
    dialogTitle: 'The Beetle Machine',
    audioUrl: '/audio/rc1/20-.mp3',
    trackNumber: 20,
    speakers: [
      {
        speaker: 'Man',
        lines: [{ text: 'Hey! Look what they’re selling in that machine!' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Are those beetles?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Yes! I think I’m going to get some to keep as pets.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'But they are $4 for a pair of them. Do you want to pay that much?' }],
      },
      {
        speaker: 'Man',
        lines: [
          { text: 'That’s cheap compared to some beetles. I heard that there was a pair of rare giant stag beetles for sale in Tokyo for $50,000!' },
        ],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'What? Who would pay that much?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Who knows? I’d be afraid someone would try to steal them.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'I’d be afraid they would die immediately!' }],
      },
    ],
    fullTranscript: `Man: Hey! Look what they’re selling in that machine!
Woman: Are those beetles?
Man: Yes! I think I’m going to get some to keep as pets.
Woman: But they are $4 for a pair of them. Do you want to pay that much?
Man: That’s cheap compared to some beetles. I heard that there was a pair of rare giant stag beetles for sale in Tokyo for $50,000!
Woman: What? Who would pay that much?
Man: Who knows? I’d be afraid someone would try to steal them.
Woman: I’d be afraid they would die immediately!`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: 'Who wants to buy the beetles?',
        options: [
          { key: 'a', text: 'The man' },
          { key: 'b', text: 'The woman' },
          { key: 'c', text: 'A company' },
          { key: 'd', text: 'The child' },
        ],
        correctAnswer: 'a',
        explanation: 'The man says: “I think I’m going to get some to keep as pets” (Key: a).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: 'How much does a pair of vending machine beetles cost?',
        options: [
          { key: 'a', text: '$4' },
          { key: 'b', text: '$2' },
          { key: 'c', text: '$8' },
          { key: 'd', text: '$50' },
        ],
        correctAnswer: 'a',
        explanation: 'The woman says: “they are $4 for a pair of them” (Key: a).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: 'Why wouldn’t the man buy the rare stag beetles?',
        options: [
          { key: 'a', text: 'He’s afraid he would lose them.' },
          { key: 'b', text: 'He’s afraid someone would take them.' },
          { key: 'c', text: 'He’s afraid they would die.' },
          { key: 'd', text: 'He’s afraid they would run away.' },
        ],
        correctAnswer: 'b',
        explanation: 'He says: “I’d be afraid someone would try to steal them” (Key: b).',
      },
    ],
  },

  grammar: {
    title: 'It (Anticipatory Subject)',
    ruleExplanation:
      '“It” is often used as an anticipatory preparatory subject at the beginning of sentences to introduce a clause or infinitive phrase.',
    sampleSentences: [
      'It may sound strange, but a company in Japan sells large beetles through vending machines.',
      'Now, it is difficult to find the beetles in the wild.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: '',
        options: ['It', 'That'],
        correctAnswer: 'It',
        sentenceAfter: 'may sound strange, but a company in Japan sells large beetles through vending machines.',
        explanation: 'Preparatory subject: “It may sound strange”.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'Now,',
        options: ['this', 'it'],
        correctAnswer: 'it',
        sentenceAfter: 'is difficult to find the beetles in the wild.',
        explanation: 'Anticipatory subject with infinitive: “it is difficult to find”.',
      },
    ],
  },

  guidedWriting: {
    title: 'A Strange Vending Machine',
    promptQuestions: [
      '(1) What would be strange to see for sale in a vending machine?',
      '(2) Would it be OK for that thing to be sold that way?',
      '(3) Why or why not?',
      '(4) Would you buy that thing from a machine?',
    ],
    exampleText:
      'It would be strange to see pets for sale in a vending machine. It would be bad to sell animals this way. This is because animals need room to move. I would never buy a pet from a machine.',
    suggestedAnswers: [
      {
        question: 'What would be strange to see in a machine?',
        sample: 'It would be strange to see fresh puppies or kittens sold in a vending machine.',
      },
      {
        question: 'Would it be OK and would you buy it?',
        sample: 'It would definitely not be OK because living animals experience stress and suffocation in tight spaces. I would never buy a pet that way.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'Riding the horse was a fun ______.',
      options: [
        { key: 'a', text: 'friend' },
        { key: 'b', text: 'hobby' },
        { key: 'c', text: 'experience' },
        { key: 'd', text: 'beetle' },
      ],
      correctAnswer: 'c',
      explanation: 'An enjoyable event that happens to a person is a fun experience.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'These days, pandas are very ______ in China.',
      options: [
        { key: 'a', text: 'rare' },
        { key: 'b', text: 'harmful' },
        { key: 'c', text: 'clever' },
        { key: 'd', text: 'ordinary' },
      ],
      correctAnswer: 'a',
      explanation: 'Not common; low in population: “rare”.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'Too much sunlight can be ______ to your skin.',
      options: [
        { key: 'a', text: 'strange' },
        { key: 'b', text: 'large' },
        { key: 'c', text: 'harmful' },
        { key: 'd', text: 'clever' },
      ],
      correctAnswer: 'c',
      explanation: 'Damaging or hurtful to health is harmful.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: "Hold still. There's a big ______ on your arm.",
      options: [
        { key: 'a', text: 'engine' },
        { key: 'b', text: 'beetle' },
        { key: 'c', text: 'idea' },
        { key: 'd', text: 'home' },
      ],
      correctAnswer: 'b',
      explanation: 'An insect sitting on an arm is a beetle.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'Nothing special happened today. It was just a(n) ______ day.',
      options: [
        { key: 'a', text: 'destructive' },
        { key: 'b', text: 'strange' },
        { key: 'c', text: 'ordinary' },
        { key: 'd', text: 'professional' },
      ],
      correctAnswer: 'c',
      explanation: 'Normal and unexceptional: “ordinary”.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'Animals like bears and monkeys live freely in ______.',
      options: [
        { key: 'a', text: 'machines' },
        { key: 'b', text: 'the wild' },
        { key: 'c', text: 'diversity' },
        { key: 'd', text: 'noise' },
      ],
      correctAnswer: 'b',
      explanation: 'In natural habitats untamed by humans: “in the wild”.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'Her job is cooking food, but her ______ is drawing pictures.',
      options: [
        { key: 'a', text: 'experience' },
        { key: 'b', text: 'beetle' },
        { key: 'c', text: 'hobby' },
        { key: 'd', text: 'record' },
      ],
      correctAnswer: 'c',
      explanation: 'A regular leisure activity is a hobby.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'His father is very interested in old books. He likes to ______ them.',
      options: [
        { key: 'a', text: 'collectable' },
        { key: 'b', text: 'collect' },
        { key: 'c', text: 'collector' },
      ],
      correctAnswer: 'b',
      explanation: 'Infinitive verb after “likes to”: “collect”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'My brother likes meat, but my sister hates it. They always have ______ about food.',
      options: [
        { key: 'a', text: 'disagreements' },
        { key: 'b', text: 'disagrees' },
        { key: 'c', text: 'disagreeable' },
      ],
      correctAnswer: 'a',
      explanation: 'Noun object of “have”: “disagreements”.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: 'The octopus ______ got out of the tank.',
      options: [
        { key: 'a', text: 'clever' },
        { key: 'b', text: 'cleverness' },
        { key: 'c', text: 'cleverly' },
      ],
      correctAnswer: 'c',
      explanation: 'Adverb modifying verb “got out”: “cleverly”.',
    },
  ],
};
