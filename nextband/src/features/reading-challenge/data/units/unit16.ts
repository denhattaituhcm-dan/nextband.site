import { UnitConfig } from '../../types';

export const unit16: UnitConfig = {
  unitNumber: 16,
  slug: 'a-fantastic-mind',
  title: 'A Fantastic Mind',
  category: 'People Profiles',
  audioReadingUrl: '/audio/rc1/31-.mp3',
  audioListeningUrl: '/audio/rc1/32-.mp3',
  wordCount: 239,

  preReading: {
    introPrompt: 'Think about the following questions.',
    questions: [
      {
        id: 'pr-1',
        question: '1. Do you know of any famous animated movies?',
        sampleAnswer: 'Some famous animated movies are Aladdin, The Lion King, and Spirited Away.',
        hint: 'Think of classic Disney, Pixar, or Studio Ghibli feature films.',
      },
      {
        id: 'pr-2',
        question: '2. Do you like comics or animation? Which comics or animation do you like?',
        sampleAnswer: 'I enjoy animated movies like My Neighbor Totoro and superhero comic series like Spider-Man.',
        hint: 'Mention animated films or graphic novels you find visually compelling.',
      },
      {
        id: 'pr-3',
        question: '3. Have you ever heard of any famous Japanese animators?',
        sampleAnswer: 'Hayao Miyazaki is world-famous as the co-founder and director of Studio Ghibli.',
        hint: 'Consider iconic directors celebrated at international film awards.',
      },
    ],
  },

  vocabPreview: {
    instruction: 'Write the letter of the word or phrase with the same meaning as the underlined word.',
    items: [
      {
        id: 'vp-1',
        sentenceWithUnderline: 'Animation is not reality. The characters are not real people.',
        underlinedWord: 'reality',
        correctDefinitionLetter: 'b',
        vietnameseMeaning: 'hiện thực, đời thực',
      },
      {
        id: 'vp-2',
        sentenceWithUnderline: 'Miyazaki is a very original animator. No one makes movies like he does.',
        underlinedWord: 'original',
        correctDefinitionLetter: 'd',
        vietnameseMeaning: 'độc đáo, giàu tính sáng tạo',
      },
      {
        id: 'vp-3',
        sentenceWithUnderline: 'She is very charming, so everyone wants to talk to her.',
        underlinedWord: 'charming',
        correctDefinitionLetter: 'a',
        vietnameseMeaning: 'duyên dáng, đáng yêu, thu hút',
      },
      {
        id: 'vp-4',
        sentenceWithUnderline: 'Totoro is so enormous. He’s bigger than any animal I know.',
        underlinedWord: 'enormous',
        correctDefinitionLetter: 'c',
        vietnameseMeaning: 'khổng lồ, to lớn',
      },
      {
        id: 'vp-5',
        sentenceWithUnderline: 'Some of Miyazaki’s movies are about supernatural things, like ghosts.',
        underlinedWord: 'supernatural',
        correctDefinitionLetter: 'f',
        vietnameseMeaning: 'siêu nhiên, huyền bí',
      },
      {
        id: 'vp-6',
        sentenceWithUnderline: 'Miyazaki’s movies often contain fantasy, like talking animals.',
        underlinedWord: 'fantasy',
        correctDefinitionLetter: 'e',
        vietnameseMeaning: 'sự kỳ ảo, tưởng tượng',
      },
    ],
    definitions: [
      { letter: 'a', text: 'likeable' },
      { letter: 'b', text: 'true life' },
      { letter: 'c', text: 'huge' },
      { letter: 'd', text: 'creative' },
      { letter: 'e', text: 'not real; from a dream or imagination' },
      { letter: 'f', text: 'not in normal life; from the spirit world' },
    ],
  },

  passageNumberedLines: [
    { text: 'Hayao Miyazaki was born in Tokyo on January 5, 1941. As a boy, he liked to' },
    { text: 'read and draw cartoons. After graduating from university in 1963,' },
    { lineNumber: 3, text: 'Miyazaki joined the Toei Animation Company. At Toei, he worked on many' },
    { lineNumber: 4, text: 'animated movies, like the famous Puss in Boots. In 1984, he made Nausicaa of the' },
    { lineNumber: 5, text: 'Valley of Wind, which was based on a comic book he wrote. Because this movie was' },
    { text: 'so successful, Miyazaki was able to start his own animation company, Studio' },
    { lineNumber: 7, text: 'Ghibli.' },
    { text: 'One of Miyazaki’s most loved movies is My Neighbor Totoro, made in 1987. It' },
    { text: 'is a children’s movie, but many adults like it, too. The movie is about two sisters who' },
    { lineNumber: 10, text: 'become friends with an enormous, supernatural animal named Totoro. It is a very' },
    { lineNumber: 11, text: 'warm-hearted story, with many fantastic characters such as Cat Bus, a cat that is' },
    { text: 'also a bus. Miyazaki’s 2001 movie, Spirited Away, was even more popular than' },
    { text: 'Totoro. In fact, it made more money than any other movie in' },
    { lineNumber: 14, text: 'Japanese history.' },
    { text: 'All of Miyazaki’s movies contain strange but charming' },
    { lineNumber: 16, text: 'people and creatures. Many of his stories happen in worlds' },
    { text: 'that are different from ours. However, they still show his' },
    { text: 'ideas about real life. He often points out how humans hurt the' },
    { text: 'natural world. He thinks people should change how they live.' },
    { lineNumber: 20, text: 'Miyazaki’s movies combine fantasy and reality in an original' },
    { text: 'way. This may be why so many people like his movies.' },
  ],

  passageParagraphs: [
    'Hayao Miyazaki was born in Tokyo on January 5, 1941. As a boy, he liked to read and draw cartoons. After graduating from university in 1963, Miyazaki joined the Toei Animation Company. At Toei, he worked on many animated movies, like the famous Puss in Boots. In 1984, he made Nausicaa of the Valley of Wind, which was based on a comic book he wrote. Because this movie was so successful, Miyazaki was able to start his own animation company, Studio Ghibli.',
    'One of Miyazaki’s most loved movies is My Neighbor Totoro, made in 1987. It is a children’s movie, but many adults like it, too. The movie is about two sisters who become friends with an enormous, supernatural animal named Totoro. It is a very warm-hearted story, with many fantastic characters such as Cat Bus, a cat that is also a bus. Miyazaki’s 2001 movie, Spirited Away, was even more popular than Totoro. In fact, it made more money than any other movie in Japanese history.',
    'All of Miyazaki’s movies contain strange but charming people and creatures. Many of his stories happen in worlds that are different from ours. However, they still show his ideas about real life. He often points out how humans hurt the natural world. He thinks people should change how they live. Miyazaki’s movies combine fantasy and reality in an original way. This may be why so many people like his movies.',
  ],

  glossary: [
    { line: 2, word: 'cartoon', definition: 'a drawing that tells a story', vietnameseMeaning: 'phim hoạt hình / tranh vui' },
    { line: 4, word: 'animate', definition: 'to make or design in such a way as to create lifelike movement', vietnameseMeaning: 'làm phim hoạt họa' },
    { line: 11, word: 'fantastic', definition: 'strange and interesting', vietnameseMeaning: 'kỳ diệu, kỳ ảo' },
    { line: 16, word: 'creature', definition: 'a living thing', vietnameseMeaning: 'sinh vật' },
    { line: 20, word: 'combine', definition: 'to put together', vietnameseMeaning: 'kết hợp' },
  ],

  readingComprehension: [
    {
      id: 'rc-1',
      questionNumber: 1,
      questionText: 'What is the main idea of this reading?',
      options: [
        { key: 'a', text: 'The movie My Neighbor Totoro' },
        { key: 'b', text: 'The education of Hayao Miyazaki' },
        { key: 'c', text: 'The most famous movie in Japan' },
        { key: 'd', text: 'The works of Hayao Miyazaki' },
      ],
      correctAnswer: 'd',
      explanation: 'The passage reviews the animation career and famous animated films of Hayao Miyazaki.',
    },
    {
      id: 'rc-2',
      questionNumber: 2,
      questionText: 'How did the success of Nausicaa help Miyazaki?',
      options: [
        { key: 'a', text: 'He could start his own studio.' },
        { key: 'b', text: 'He could publish a comic book.' },
        { key: 'c', text: 'He could join Toei Animation.' },
        { key: 'd', text: 'He could work on more movies.' },
      ],
      correctAnswer: 'a',
      explanation: 'Lines 5-7 explain that because Nausicaa was successful, he was able to launch Studio Ghibli.',
    },
    {
      id: 'rc-3',
      questionNumber: 3,
      questionText: 'Cat Bus is a character in which movie?',
      options: [
        { key: 'a', text: 'Nausicaa of the Valley of Wind' },
        { key: 'b', text: 'My Neighbor Totoro' },
        { key: 'c', text: 'Puss in Boots' },
        { key: 'd', text: 'Spirited Away' },
      ],
      correctAnswer: 'b',
      explanation: 'Lines 8-11 highlight Cat Bus as a charming fantasy character in My Neighbor Totoro.',
    },
    {
      id: 'rc-4',
      questionNumber: 4,
      questionText: 'Who likes My Neighbor Totoro?',
      options: [
        { key: 'a', text: 'Teenage girls' },
        { key: 'b', text: 'Children' },
        { key: 'c', text: 'Adults' },
        { key: 'd', text: 'All of the above' },
      ],
      correctAnswer: 'd',
      explanation: 'Lines 8-9 mention that it is a children’s movie, but many adults and people of all ages love it.',
    },
    {
      id: 'rc-5',
      questionNumber: 5,
      questionText: 'According to the reading, why are Miyazaki’s movies so successful?',
      options: [
        { key: 'a', text: 'Children like them.' },
        { key: 'b', text: 'His movies are unique.' },
        { key: 'c', text: 'His movies have strange creatures.' },
        { key: 'd', text: 'He wants to protect the environment.' },
      ],
      correctAnswer: 'b',
      explanation: 'Lines 20-21 explain that combining fantasy and reality in an original, unique way makes his films beloved worldwide.',
    },
  ],

  idioms: [
    {
      id: 'id-1',
      idiom: 'be based on',
      definition: 'to come from or be adapted from',
      bookExample: 'The book is based on her own life.',
      sentencePrompt: 'That movie [BLANK] a famous folktale.',
      correctAnswer: 'is based on',
      acceptableAnswers: ['is based on', 'was based on'],
      explanation: '“is based on” indicates the source material from which a work was developed.',
    },
    {
      id: 'id-2',
      idiom: 'such as',
      definition: 'for example',
      bookExample: 'She doesn’t like animals such as frogs, lizards, and snakes.',
      sentencePrompt: 'There are many beautiful cities in Europe, [BLANK] Paris or Rome.',
      correctAnswer: 'such as',
      acceptableAnswers: ['such as'],
      explanation: '“such as” introduces specific examples within a category.',
    },
    {
      id: 'id-3',
      idiom: 'point out',
      definition: 'to show something clearly or call attention to',
      bookExample: 'Please point out the new students for me.',
      sentencePrompt: 'Do you think teachers should always [BLANK] students’ mistakes?',
      correctAnswer: 'point out',
      acceptableAnswers: ['point out'],
      explanation: '“point out” means to indicate or bring to notice.',
    },
  ],

  summary: {
    instruction: 'Fill in the blanks with the correct words from the box.',
    wordBank: ['animated', 'supernatural', 'charming', 'reality', 'original'],
    passageTemplate: `Hayao Miyazaki is very famous in Japan. He has made many successful 1. [BLANK_0] movies. One of his most famous films is My Neighbor Totoro, which is about a friendly 2. [BLANK_1] animal. Miyazaki’s movies always have characters that are very unusual. However, they are also 3. [BLANK_2] and warm-hearted. Many parts of his stories are not real, but other parts come from 4. [BLANK_3]. Miyazaki shows new ideas in each of his movies. They are successful because they are so 5. [BLANK_4].`,
    correctAnswers: ['animated', 'supernatural', 'charming', 'reality', 'original'],
    vietnameseTranslation: 'Tóm tắt bài đọc: Hayao Miyazaki rất nổi tiếng ở Nhật Bản với nhiều tác phẩm phim hoạt hình xuất sắc. Phim Hàng xóm tôi là Totoro kể về một sinh vật siêu nhiên thân thiện. Nhân vật trong phim ông vừa kỳ lạ lại vừa duyên dáng, ấm áp. Cốt truyện kết hợp giữa kỳ ảo và hiện thực một cách độc đáo, truyền tải nhiều thông điệp nhân văn sâu sắc.',
  },

  listeningDictation: {
    dialogTitle: 'Not Just for Kids',
    audioUrl: '/audio/rc1/32-.mp3',
    trackNumber: 32,
    speakers: [
      {
        speaker: 'Man',
        lines: [{ text: 'What are you going to do tonight?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'I don’t know. I am kind of bored.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Would you like to go see a movie? There is a terrific animated movie at the theater.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Animation? You mean like a cartoon? Isn’t that just for children?' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Not at all. Many adults also enjoy animation, just like children do.' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'Well, I suppose I could go and see if I like it.' }],
      },
      {
        speaker: 'Man',
        lines: [{ text: 'Great. The movie starts at eight p.m. Should I pick you up?' }],
      },
      {
        speaker: 'Woman',
        lines: [{ text: 'OK. That would be very nice. I’ll see you at 7:30.' }],
      },
    ],
    fullTranscript: `Man: What are you going to do tonight?
Woman: I don’t know. I am kind of bored.
Man: Would you like to go see a movie? There is a terrific animated movie at the theater.
Woman: Animation? You mean like a cartoon? Isn’t that just for children?
Man: Not at all. Many adults also enjoy animation, just like children do.
Woman: Well, I suppose I could go and see if I like it.
Man: Great. The movie starts at eight p.m. Should I pick you up?
Woman: OK. That would be very nice. I’ll see you at 7:30.`,
    questions: [
      {
        id: 'lq-1',
        questionNumber: 1,
        questionText: '1. Which person is bored?',
        options: [
          { key: 'a', text: 'The man' },
          { key: 'b', text: 'The woman' },
          { key: 'c', text: 'Both of them' },
          { key: 'd', text: 'Neither of them' },
        ],
        correctAnswer: 'b',
        explanation: 'The woman says: “I don’t know. I am kind of bored.” (Answer Key: b).',
      },
      {
        id: 'lq-2',
        questionNumber: 2,
        questionText: '2. Why is the woman unsure about going to the movie?',
        options: [
          { key: 'a', text: 'Animation is just for kids.' },
          { key: 'b', text: 'Animation is boring.' },
          { key: 'c', text: 'The movie is too early.' },
          { key: 'd', text: 'She doesn’t have a ride.' },
        ],
        correctAnswer: 'a',
        explanation: 'She asks: “Animation? Isn’t that just for children?” (Answer Key: a).',
      },
      {
        id: 'lq-3',
        questionNumber: 3,
        questionText: '3. What will they do?',
        options: [
          { key: 'a', text: 'Wait to see the video' },
          { key: 'b', text: 'Buy tickets online' },
          { key: 'c', text: 'Choose another movie' },
          { key: 'd', text: 'Watch the movie together' },
        ],
        correctAnswer: 'd',
        explanation: 'They agree the man will pick her up at 7:30 to watch the movie together (Answer Key: d).',
      },
    ],
  },

  grammar: {
    title: 'Adjective Order',
    ruleExplanation:
      'When you write more than one adjective, put them in order: quantity, opinion, size, age, shape, color, origin, material. When using coordinate adjectives of the same type, separate them with a comma.',
    sampleSentences: [
      'The movie is about two sisters who become friends with an enormous, supernatural animal named Totoro.',
      'It is a very warm-hearted story, with many fantastic characters such as Cat Bus.',
    ],
    questions: [
      {
        id: 'gr-1',
        sentenceBefore: 'The movie is about two sisters who become friends with an',
        options: ['enormous supernatural', 'enormous, supernatural'],
        correctAnswer: 'enormous, supernatural',
        sentenceAfter: 'animal named Totoro.',
        explanation: 'Coordinate descriptive adjectives are separated by a comma: enormous, supernatural.',
      },
      {
        id: 'gr-2',
        sentenceBefore: 'It is a very warm-hearted story, with',
        options: ['fantastic many', 'many fantastic'],
        correctAnswer: 'many fantastic',
        sentenceAfter: 'characters such as Cat Bus.',
        explanation: 'Quantity determiners (many) precede descriptive quality adjectives (fantastic).',
      },
    ],
  },

  guidedWriting: {
    title: 'A Famous Character',
    promptQuestions: [
      '(1) What is a popular cartoon character in your country?',
      '(2) What is he/she/it like?',
      '(3) What does he/she/it look like?',
      '(4) Why is this character popular?',
    ],
    exampleText:
      'A popular cartoon character in France is Tintin. He is a very smart young boy. He looks friendly and normal. He is popular because he goes to different countries and has exciting adventures.',
    suggestedAnswers: [
      {
        question: 'What is a popular character and what is it like?',
        sample: 'A popular character is Doraemon, an earless robotic cat from the future with a kind heart.',
      },
      {
        question: 'What does it look like and why is it popular?',
        sample: 'He is round and blue with a magical four-dimensional pocket. He is popular because his futuristic gadgets solve everyday problems.',
      },
    ],
    minWords: 35,
  },

  reviewQuiz: [
    {
      id: 'rq-1',
      part: 'A',
      questionNumber: 1,
      question: 'Oh no! The rain _______ my new bag.',
      options: [
        { key: 'a', text: 'hurt' },
        { key: 'b', text: 'combined' },
        { key: 'c', text: 'ruined' },
        { key: 'd', text: 'stirred up' },
      ],
      correctAnswer: 'c',
      explanation: '“ruined” means spoiled or damaged beyond use.',
    },
    {
      id: 'rq-2',
      part: 'A',
      questionNumber: 2,
      question: 'Many people think _______ food is very healthy.',
      options: [
        { key: 'a', text: 'enormous' },
        { key: 'b', text: 'reality' },
        { key: 'c', text: 'natural' },
        { key: 'd', text: 'strange' },
      ],
      correctAnswer: 'c',
      explanation: 'Food grown without artificial chemicals is “natural”.',
    },
    {
      id: 'rq-3',
      part: 'A',
      questionNumber: 3,
      question: 'He thought she was very _______, so he asked her to dance.',
      options: [
        { key: 'a', text: 'strange' },
        { key: 'b', text: 'supernatural' },
        { key: 'c', text: 'charming' },
        { key: 'd', text: 'useful' },
      ],
      correctAnswer: 'c',
      explanation: '“charming” means delightfully attractive and appealing.',
    },
    {
      id: 'rq-4',
      part: 'A',
      questionNumber: 4,
      question: 'I don’t believe in _______ things like ghosts or spirits.',
      options: [
        { key: 'a', text: 'charming' },
        { key: 'b', text: 'original' },
        { key: 'c', text: 'hurt' },
        { key: 'd', text: 'supernatural' },
      ],
      correctAnswer: 'd',
      explanation: 'Phenomena beyond natural physical laws are “supernatural”.',
    },
    {
      id: 'rq-5',
      part: 'A',
      questionNumber: 5,
      question: 'Flying to the moon is her _______.',
      options: [
        { key: 'a', text: 'fantasy' },
        { key: 'b', text: 'reality' },
        { key: 'c', text: 'animation' },
        { key: 'd', text: 'movie' },
      ],
      correctAnswer: 'a',
      explanation: 'An imaginative wish or daydream is a “fantasy”.',
    },
    {
      id: 'rq-6',
      part: 'A',
      questionNumber: 6,
      question: 'He read _______ instead of studying for the test.',
      options: [
        { key: 'a', text: 'animation' },
        { key: 'b', text: 'cartoons' },
        { key: 'c', text: 'comic books' },
        { key: 'd', text: 'nutrients' },
      ],
      correctAnswer: 'c',
      explanation: 'Printed illustrated stories bound as booklets are “comic books”.',
    },
    {
      id: 'rq-7',
      part: 'A',
      questionNumber: 7,
      question: 'An elephant is a(n) _______ animal.',
      options: [
        { key: 'a', text: 'animated' },
        { key: 'b', text: 'enormous' },
        { key: 'c', text: 'traditional' },
        { key: 'd', text: 'supernatural' },
      ],
      correctAnswer: 'b',
      explanation: '“enormous” denotes massive, colossal size.',
    },
    {
      id: 'rq-8',
      part: 'B',
      questionNumber: 8,
      question: 'That movie is very _______. I haven’t seen anything like it before.',
      options: [
        { key: 'a', text: 'original' },
        { key: 'b', text: 'originally' },
        { key: 'c', text: 'origin' },
      ],
      correctAnswer: 'a',
      explanation: 'Predicate adjective “original” follows the intensifier “very”.',
    },
    {
      id: 'rq-9',
      part: 'B',
      questionNumber: 9,
      question: 'She likes _______ movies because the characters are colorful.',
      options: [
        { key: 'a', text: 'animate' },
        { key: 'b', text: 'animator' },
        { key: 'c', text: 'animated' },
      ],
      correctAnswer: 'c',
      explanation: 'Participial adjective “animated” modifies the noun movies.',
    },
    {
      id: 'rq-10',
      part: 'B',
      questionNumber: 10,
      question: '_______ is not often shown in movies.',
      options: [
        { key: 'a', text: 'Reality' },
        { key: 'b', text: 'Real' },
        { key: 'c', text: 'Realistic' },
      ],
      correctAnswer: 'a',
      explanation: 'Subject noun “Reality” is required before the passive verb phrase.',
    },
  ],
};
