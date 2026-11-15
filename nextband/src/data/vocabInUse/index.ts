export * from "./types";
import type { VocabInUseUnit, RoadmapChapter } from "./types";
import { VOCAB_IN_USE_UNITS_4_TO_6 } from "./units4to6";
import { VOCAB_IN_USE_UNITS_7_TO_9 } from "./units7to9";
import { VOCAB_IN_USE_UNITS_10_TO_12 } from "./units10to12";

export const ROADMAP_CHAPTERS: RoadmapChapter[] = [
  {
    chapterNumber: 1,
    titleEn: "Word Formation",
    titleVi: "Cấu tạo từ & Sắc thái hình thái",
    unitRange: "Units 1 – 6",
    sampleTopics: [
      "Unit 1: Abbreviations & Acronyms",
      "Unit 2: Prefixes (over-, under-, cross-, pro-)",
      "Unit 3: Productive Suffixes (-free, -ridden, -worthy)",
      "Unit 4: Word-building & Blending",
      "Unit 5: Global Contact & Loan Words",
      "Unit 6: Confusable Words"
    ],
    status: "live"
  },
  {
    chapterNumber: 2,
    titleEn: "Work and Study",
    titleVi: "Công việc, Sự nghiệp & Học thuật",
    unitRange: "Units 7 – 12",
    sampleTopics: [
      "Unit 7: Colleagues & Routines (flexi-time, job-share)",
      "Unit 8: Career & Promotion (perks, glass ceiling)",
      "Unit 9: Business 1 (niche market, entrepreneurship)",
      "Unit 10: Business 2 (submit a tender, square deal)",
      "Unit 11: Study & Academic Work (dissertation, plagiarism)",
      "Unit 12: Education Debates (elitism, league tables)"
    ],
    status: "live"
  },
  {
    chapterNumber: 3,
    titleEn: "People and Relationships",
    titleVi: "Con người, Tính cách & Tương tác",
    unitRange: "Units 13 – 20",
    sampleTopics: [
      "Self-reflection (diligent, shrewd, sagacious)",
      "Relationships & Passions",
      "Character Traits & Mannerisms"
    ],
    status: "upcoming"
  },
  {
    chapterNumber: 4,
    titleEn: "The Environment",
    titleVi: "Môi trường, Khí hậu & Bảo tồn",
    unitRange: "Units 33 – 38",
    sampleTopics: [
      "Weather & Climate Extremes",
      "Buildings & Nature Metaphors",
      "Conservation & Endangered Ecosystems"
    ],
    status: "upcoming"
  },
  {
    chapterNumber: 5,
    titleEn: "Society and Institutions",
    titleVi: "Xã hội, Pháp luật & Kinh tế vĩ mô",
    unitRange: "Units 39 – 50",
    sampleTopics: [
      "Law & Order, War & Peace",
      "Poverty, GDP & Macroeconomy",
      "World Views & Cultural Festivals"
    ],
    status: "upcoming"
  },
  {
    chapterNumber: 6,
    titleEn: "The Media & Technology",
    titleVi: "Truyền thông, Công nghệ & Tương lai",
    unitRange: "Units 51 – 61",
    sampleTopics: [
      "Print & Digital Media Literacy",
      "Biotechnology & Industrialisation",
      "Future Visions & Ethics"
    ],
    status: "upcoming"
  }
];

export const VOCAB_IN_USE_UNITS: VocabInUseUnit[] = [
  // =========================================================================
  // UNIT 1: ABBREVIATIONS AND ACRONYMS
  // =========================================================================
  {
    unitId: 1,
    chapterTitle: "Word Formation",
    titleEn: "Abbreviations and Acronyms",
    titleVi: "Từ viết tắt Latin, Acronyms & Ngôn ngữ Cô đọng",
    cefr: "C1 – C2",
    estimatedMinutes: 8,
    summaryVi:
      "Làm chủ hệ thống ký hiệu viết tắt học thuật gốc Latin (e.g., i.e., NB, AD), cách phát âm acronyms (VAT, UFO) và quy ước viết tắt trong thông báo, bất động sản hiện đại.",
    passageTitle: "The Architecture of Brevity: Decoding Modern Shorthand",
    passageSubtitle: "ARIS Curated Passage · Tích hợp 16 mục từ trọng tâm Unit 1",
    passageParagraphs: [
      [
        {
          text: "Every bustling metropolis speaks in compressed codes. When you scan rental listings in London or Dublin, space costs money, so landlords pack every detail into cryptic lines: “Bright studio "
        },
        { text: "bedsit", lexiconId: "bedsit" },
        { text: ", completely " },
        { text: "s/c", lexiconId: "sc" },
        { text: ", featuring " },
        { text: "all mod cons", lexiconId: "all-mod-cons" },
        { text: ", £950 " },
        { text: "pcm excl", lexiconId: "pcm-excl" },
        { text: ", £1,100 " },
        { text: "o.n.o.", lexiconId: "ono" },
        { text: "” To an untrained eye, these look like software errors; to a savvy reader, they instantly convey rent terms, privacy, and negotiation room." }
      ],
      [
        {
          text: "Academic prose and formal correspondence rely on an equally tight shorthand inherited from classical Latin. Writers use "
        },
        { text: "e.g.", lexiconId: "eg" },
        { text: " to introduce concrete illustrations, while " },
        { text: "i.e.", lexiconId: "ie" },
        { text: " signals an exact rephrasing or clarification. When an editor adds " },
        { text: "NB", lexiconId: "nb" },
        { text: " in the margin, it warns the reader to pay special attention, just as historians mark dates after the birth of Christ with " },
        { text: "AD", lexiconId: "ad" },
        { text: ". Meanwhile, on conference invitations and university portals, " },
        { text: "RSVP", lexiconId: "rsvp" },
        { text: " politely requests confirmation, and an " },
        { text: "FAQ", lexiconId: "faq" },
        { text: " section resolves recurring questions before you have to email support " },
        { text: "asap", lexiconId: "asap" },
        { text: "." }
      ],
      [
        {
          text: "Spoken English also reshapes long titles into punchy syllables. Viewers relax with a light-hearted "
        },
        { text: "sitcom", lexiconId: "sitcom" },
        { text: " after work, yet news anchors debate serious topics—ranging from changes in " },
        { text: "VAT", lexiconId: "vat" },
        { text: " rates to whether public debates have grown overly " },
        { text: "PC", lexiconId: "pc" },
        {
          text: " or whether a strange radar signal was genuinely a "
        },
        { text: "UFO", lexiconId: "ufo" },
        {
          text: ". Understanding when an abbreviation is spoken letter-by-letter or blended as a single word separates hesitant learners from fluent C1–C2 communicators."
        }
      ]
    ],
    lexicon: [
      {
        id: "eg",
        word: "e.g.",
        ipa: "/ˌiːˈdʒiː/",
        pos: "abbreviation (Latin: exempli gratia)",
        meaningEn: "for example; introducing one or more illustrative examples.",
        meaningVi: "Ví dụ như (dùng để đưa ra một vài minh họa tiêu biểu).",
        registerNote: "Formal & Academic Writing",
        nuanceTip:
          "Đừng nhầm với i.e.! e.g. liệt kê ví dụ (một phần), không phải định nghĩa toàn bộ.",
        example:
          "Renewable sources, e.g. solar and tidal energy, are gaining traction."
      },
      {
        id: "ie",
        word: "i.e.",
        ipa: "/ˌaɪˈiː/",
        pos: "abbreviation (Latin: id est)",
        meaningEn: "that is to say; used to clarify or specify exactly what was meant.",
        meaningVi: "Tức là / Nghĩa là (diễn giải lại cho chính xác tuyệt đối).",
        registerNote: "Academic & Analytical Prose",
        nuanceTip:
          "Dùng khi bạn muốn chốt lại ý nghĩa duy nhất hoặc định nghĩa rõ ràng cụm từ vừa nêu.",
        example:
          "The grant covers tuition fees only, i.e. living expenses are excluded."
      },
      {
        id: "nb",
        word: "NB",
        ipa: "/ˌenˈbiː/",
        pos: "abbreviation (Latin: nota bene)",
        meaningEn: "note well; pay special attention to the following critical point.",
        meaningVi: "Lưu ý quan trọng (cảnh báo điểm không được bỏ sót).",
        registerNote: "Formal Notices & Academic Syllabi",
        nuanceTip:
          "Thường đứng đầu câu hoặc đầu dòng chú thích trong đề thi, hợp đồng và văn bản học thuật.",
        example: "NB: Late submissions without medical documentation incur a penalty."
      },
      {
        id: "ad",
        word: "AD",
        ipa: "/ˌeɪˈdiː/",
        pos: "abbreviation (Latin: Anno Domini)",
        meaningEn: "the year of Our Lord; used for years after the birth of Christ.",
        meaningVi: "Sau Công nguyên (trái nghĩa với BC — Before Christ).",
        registerNote: "Historical & Academic Context",
        nuanceTip:
          "Trong văn phong chuẩn cổ điển, AD thường đứng trước hoặc sau số năm (1500 AD / AD 1500).",
        example: "This antique ceramic vessel dates back to 1500 AD."
      },
      {
        id: "asap",
        word: "asap",
        ipa: "/ˌeɪ.es.eɪˈpiː/",
        pos: "abbreviation",
        meaningEn: "as soon as possible.",
        meaningVi: "Càng sớm càng tốt.",
        registerNote: "Workplace & Semi-formal Emails",
        nuanceTip:
          "Thường đọc từng chữ cái A-S-A-P trong công việc; tránh dùng trong bài luận IELTS Writing Task 2.",
        example: "Please forward the revised manuscript asap."
      },
      {
        id: "bedsit",
        word: "bedsit",
        ipa: "/ˈbed.sɪt/",
        pos: "noun (clipped compound)",
        meaningEn: "one rented room serving as both a bedroom and a sitting room.",
        meaningVi: "Phòng trọ đơn khép kín (kết hợp cả phòng ngủ và phòng khách).",
        registerNote: "British English · Housing",
        nuanceTip:
          "Từ ghép rút gọn (clipped words) từ 'bed-sitting room', rất phổ biến tại Anh.",
        example: "As an undergraduate, she lived in a cramped bedsit in north London."
      },
      {
        id: "sitcom",
        word: "sitcom",
        ipa: "/ˈsɪt.kɒm/",
        pos: "noun (clipped compound)",
        meaningEn: "short for situational comedy, a recurring comedy TV series.",
        meaningVi: "Phim hài tình huống.",
        registerNote: "Media & Everyday Usage",
        nuanceTip:
          "Ghép từ âm tiết đầu của 'situational' và 'comedy' — đặc trưng của hiện tượng clipping.",
        example: "Friends remains one of the most globally exported sitcoms."
      },
      {
        id: "vat",
        word: "VAT",
        ipa: "/væt/ hoặc /ˌviː.eɪˈtiː/",
        pos: "acronym / initialism",
        meaningEn: "value-added tax; an indirect tax levied on goods and services.",
        meaningVi: "Thuế giá trị gia tăng (GTGT).",
        registerNote: "Economics & Business",
        nuanceTip:
          "Có thể phát âm như một từ liền (/væt/) hoặc đọc tách 3 chữ cái (/ˌviː.eɪˈtiː/).",
        example: "Small startups below the revenue threshold are exempt from VAT."
      },
      {
        id: "ufo",
        word: "UFO",
        ipa: "/ˈjuː.fəʊ/ hoặc /ˌjuː.efˈəʊ/",
        pos: "acronym / initialism",
        meaningEn: "unidentified flying object.",
        meaningVi: "Vật thể bay không xác định.",
        registerNote: "Media & General",
        nuanceTip:
          "Giống VAT, người bản ngữ dùng cả hai cách phát âm: thành từ (/ˈjuː.fəʊ/) hoặc đọc từng chữ.",
        example: "Declassified aviation logs sparked renewed debate about UFO sightings."
      },
      {
        id: "pc",
        word: "PC",
        ipa: "/ˌpiːˈsiː/",
        pos: "abbreviation (polysemous)",
        meaningEn:
          "politically correct (avoiding offensive language), personal computer, or Police Constable.",
        meaningVi:
          "Chính trị chuẩn mực (tránh ngôn từ gây tổn thương), máy tính cá nhân, hoặc cảnh sát tuần tra (Anh).",
        registerNote: "Polysemous · Context-dependent",
        nuanceTip:
          "Trong IELTS Speaking/Writing về xã hội, PC thường mang nghĩa 'politically correct'.",
        example:
          "Critics argued the comedy show refused to adopt overly PC phrasing."
      },
      {
        id: "rsvp",
        word: "RSVP",
        ipa: "/ˌɑːr.es.viːˈpiː/",
        pos: "abbreviation (French: répondez s'il vous plaît)",
        meaningEn: "please reply (used on formal invitations).",
        meaningVi: "Vui lòng hồi âm xác nhận tham dự.",
        registerNote: "Formal Invitations & Events",
        nuanceTip:
          "Có nguồn gốc tiếng Pháp, luôn xuất hiện ở góc dưới thiệp mời hội thảo hoặc tiệc trang trọng.",
        example: "RSVP to the academic registrar by Friday noon."
      },
      {
        id: "faq",
        word: "FAQ",
        ipa: "/ˌef.eɪˈkjuː/",
        pos: "abbreviation",
        meaningEn: "frequently asked question(s).",
        meaningVi: "Các câu hỏi thường gặp.",
        registerNote: "Digital & Customer Support",
        nuanceTip:
          "Luôn viết hoa, số nhiều có thể viết FAQs.",
        example: "Consult the admissions FAQ before submitting a support ticket."
      },
      {
        id: "all-mod-cons",
        word: "all mod cons",
        ipa: "/ɔːl ˌmɒd ˈkɒnz/",
        pos: "phrase (clipped abbreviation)",
        meaningEn: "all modern conveniences (washing machine, central heating, dishwasher, etc.).",
        meaningVi: "Đầy đủ tiện nghi hiện đại.",
        registerNote: "Housing & Classified Ads",
        nuanceTip:
          "Viết tắt của 'all modern conveniences' — rất hay xuất hiện trong đề IELTS Listening Part 1 về thuê nhà!",
        example: "The newly renovated townhouse comes equipped with all mod cons."
      },
      {
        id: "ono",
        word: "o.n.o.",
        ipa: "/ˌəʊ.enˈəʊ/",
        pos: "abbreviation",
        meaningEn: "or nearest offer (willing to negotiate slightly below the asking price).",
        meaningVi: "Hoặc mức giá trả gần nhất (có thể thương lượng).",
        registerNote: "Classified Ads & Marketplace",
        nuanceTip:
          "Thường gặp ở cuối tin rao bán đồ cũ hoặc cho thuê nhà tại Anh.",
        example: "Vintage road bike for sale, £250 o.n.o."
      },
      {
        id: "sc",
        word: "s/c",
        ipa: "/ˌself kənˈteɪnd/",
        pos: "abbreviation (housing)",
        meaningEn: "self-contained (having all essential facilities within the unit itself).",
        meaningVi: "Khép kín hoàn toàn (không dùng chung bếp hay phòng tắm).",
        registerNote: "Accommodation Ads",
        nuanceTip:
          "Đối lập với 'shared facilities'. Khi đọc tin thuê phòng, s/c luôn là điểm cộng về sự riêng tư.",
        example: "Seeking a quiet s/c studio within walking distance of campus."
      },
      {
        id: "pcm-excl",
        word: "pcm excl",
        ipa: "/ˌpiː.siːˈem ɪkˈskluːd/",
        pos: "abbreviation (rental)",
        meaningEn: "per calendar month excluding utility bills (gas, electricity, water).",
        meaningVi: "Mỗi tháng dương lịch, chưa bao gồm hóa đơn điện/nước/gas.",
        registerNote: "Rental Contracts & Ads",
        nuanceTip:
          "Đối lập với 'incl' (including bills) và 'pw' (per week).",
        example: "Monthly rent is fixed at £850 pcm excl bills."
      }
    ],
    theorySections: [
      {
        key: "A",
        title: "Latin Abbreviations, Clippings & Acronyms",
        subtitle: "Phân biệt chuẩn gốc Latin, từ rút gọn và quy tắc phát âm viết tắt",
        items: [
          {
            label: "Gốc Latin học thuật",
            detail:
              "e.g. (ví dụ như), i.e. (tức là), NB (lưu ý đặc biệt), AD (sau Công nguyên).",
            example: "Citrus fruits, e.g. lemons, are rich in vitamin C."
          },
          {
            label: "Từ ghép rút gọn (Clipped Words)",
            detail:
              "bedsit (bedroom + sitting room), sitcom (situational comedy), sci-fi (science fiction).",
            example: "The BBC aired a critically acclaimed political sitcom."
          },
          {
            label: "Đọc từng chữ vs Đọc thành từ (Acronyms)",
            detail:
              "EU, ID, BC, asap đọc từng chữ; AIDS /eɪdz/, NATO /ˈneɪ.təʊ/ đọc thành một từ. VAT và UFO dùng được cả 2 cách.",
            example: "NATO representatives met to discuss cross-border security."
          }
        ]
      },
      {
        key: "B",
        title: "Polysemous Abbreviations (Một ký hiệu — Nhiều nghĩa)",
        subtitle: "Suy luận nghĩa chính xác dựa trên ngữ cảnh bài đọc",
        items: [
          {
            label: "AA",
            detail:
              "Alcoholics Anonymous (tổ chức hỗ trợ cai rượu) hoặc Automobile Association (hiệp hội cứu hộ ô tô tại Anh).",
            example: "He called the AA when his engine overheated on the motorway."
          },
          {
            label: "PC & m / p",
            detail:
              "PC: personal computer / Police Constable / politically correct. m: metre, mile, million, male, married. p: per, pence, page (pp. = pages).",
            example: "Read pp. 10–22 before tomorrow's seminar."
          }
        ]
      },
      {
        key: "C",
        title: "Written Correspondence & Digital Shorthand",
        subtitle: "Ngôn ngữ viết trang trọng và tin nhắn điện tử",
        items: [
          {
            label: "Văn bản & Thiệp mời",
            detail: "RSVP (vui lòng hồi âm), PTO (xin xem trang sau), FAQ (câu hỏi thường gặp).",
            example: "Please see PTO for the detailed conference schedule."
          },
          {
            label: "Giao tiếp điện tử",
            detail: "FYI (để bạn nắm thông tin), BTW (nhân tiện), AFK (rời bàn phím).",
            example: "FYI, the deadline has been pushed back to Monday."
          }
        ]
      },
      {
        key: "D",
        title: "Small Ads & Accommodation Shorthand",
        subtitle: "Giải mã mẩu tin bất động sản & IELTS Listening Part 1",
        items: [
          {
            label: "Chi phí & Chu kỳ trả",
            detail: "£300 pcm excl (mỗi tháng chưa gồm hóa đơn) / £60 pw incl (mỗi tuần đã bao gồm).",
            example: "Flat available for £420 pcm excl."
          },
          {
            label: "Tiện ích & Đối tượng",
            detail: "f/f (fully furnished), s/c (self-contained), n/s (non-smoking), all mod cons, c/h (central heating).",
            example: "3rd tenant wanted for s/c f/f flat, suit n/s prof."
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex-1-1",
        kind: "gap_fill",
        title: "Bài tập 1.1 · Chính xác hóa Viết tắt Latin",
        instruction:
          "Chạm chọn ký hiệu viết tắt gốc Latin phù hợp nhất cho từng ngữ cảnh học thuật (Giữ nguyên câu chuẩn từ sách gốc).",
        sourceNote: "Tuyển chọn nguyên bản · Unit 1 (Ex 1.1)",
        wordBank: ["AD", "i.e.", "NB", "e.g."],
        questions: [
          {
            id: "1-1-1",
            promptBefore: "This antique vase dates from 1500",
            promptAfter: ".",
            answer: "AD",
            acceptedAnswers: ["AD", "A.D."],
            hint: "Chỉ mốc thời gian sau Công nguyên",
            explanationVi:
              "AD (Anno Domini) dùng để chỉ niên đại sau Công nguyên (1500 AD)."
          },
          {
            id: "1-1-2",
            promptBefore: "Fruit,",
            promptAfter: "the usually sweet part of a tree or bush which contains seeds, is normally delicious to eat.",
            answer: "i.e.",
            acceptedAnswers: ["i.e.", "ie"],
            hint: "Định nghĩa lại chính xác khái niệm đứng trước",
            explanationVi:
              "i.e. (id est = tức là) dùng để giải thích hoặc định nghĩa chính xác cho danh từ 'Fruit'."
          },
          {
            id: "1-1-3",
            promptBefore: "",
            promptAfter: "fruit cannot be taken across the border into the USA.",
            answer: "NB",
            acceptedAnswers: ["NB", "N.B."],
            hint: "Lời nhắc nhở đặc biệt ở đầu câu",
            explanationVi:
              "NB (nota bene = lưu ý kỹ) thường đứng đầu thông báo để nhấn mạnh quy định quan trọng."
          },
          {
            id: "1-1-4",
            promptBefore: "Fruits,",
            promptAfter: "lemons, pears and grapes, are sometimes added when cooking poultry.",
            answer: "e.g.",
            acceptedAnswers: ["e.g.", "eg"],
            hint: "Liệt kê một số ví dụ minh họa",
            explanationVi:
              "e.g. (exempli gratia = ví dụ như) đưa ra một vài loại quả cụ thể làm minh họa."
          }
        ]
      },
      {
        id: "ex-1-3",
        kind: "gap_fill",
        title: "Bài tập 1.2 & 1.3 · Giải mã Tổ chức Quốc tế & Ký hiệu Đời sống",
        instruction:
          "Chọn tên đầy đủ chuẩn xác của các từ viết tắt thường xuất hiện trên báo chí, bản tin IELTS và văn bản học thuật.",
        sourceNote: "Tuyển chọn tinh gọn · Unit 1 (Ex 1.2 & 1.3)",
        wordBank: [
          "World Health Organisation",
          "United Nations Educational, Scientific and Cultural Organisation",
          "International Monetary Fund",
          "Greenwich Mean Time",
          "International Olympic Committee",
          "pages",
          "miles per hour",
          "before Christ"
        ],
        questions: [
          {
            id: "1-3-1",
            promptBefore: "WHO stands for",
            promptAfter: ".",
            answer: "World Health Organisation",
            acceptedAnswers: [
              "World Health Organisation",
              "World Health Organization"
            ],
            explanationVi: "WHO = Tổ chức Y tế Thế giới (World Health Organisation)."
          },
          {
            id: "1-3-2",
            promptBefore: "UNESCO stands for",
            promptAfter: ".",
            answer:
              "United Nations Educational, Scientific and Cultural Organisation",
            acceptedAnswers: [
              "United Nations Educational, Scientific and Cultural Organisation",
              "United Nations Educational, Scientific and Cultural Organization"
            ],
            explanationVi:
              "UNESCO = Tổ chức Giáo dục, Khoa học và Văn hóa Liên Hợp Quốc."
          },
          {
            id: "1-3-3",
            promptBefore: "IMF stands for",
            promptAfter: ".",
            answer: "International Monetary Fund",
            explanationVi: "IMF = Quỹ Tiền tệ Quốc tế."
          },
          {
            id: "1-3-4",
            promptBefore: "GMT stands for",
            promptAfter: "(standard UK observatory time).",
            answer: "Greenwich Mean Time",
            explanationVi: "GMT = Giờ chuẩn Greenwich."
          },
          {
            id: "1-3-5",
            promptBefore: "In 'Read pp. 10–22 for homework', pp. means",
            promptAfter: ".",
            answer: "pages",
            explanationVi:
              "p. là 'page' (1 trang), còn pp. là dạng số nhiều 'pages' (nhiều trang)."
          },
          {
            id: "1-3-6",
            promptBefore: "In 'Cars must not exceed 30 mph', mph means",
            promptAfter: ".",
            answer: "miles per hour",
            explanationVi:
              "mph = miles per hour (dặm/giờ), phát âm đầy đủ khi đọc thành tiếng."
          }
        ]
      },
      {
        id: "ex-1-7",
        kind: "sentence_upgrade",
        title: "Bài tập 1.7 · Suy luận Acronyms Thông minh",
        instruction:
          "Nhiều tổ chức đặt tên sao cho chữ cái đầu tạo thành một từ tiếng Anh dễ nhớ (hoặc hài hước). Hãy chọn nghĩa giải mã chính xác (Giữ nguyên từ sách gốc).",
        sourceNote: "Tuyển chọn nguyên bản · Unit 1 (Ex 1.7)",
        questions: [
          {
            id: "1-7-1",
            originalSentence: "DUMP — Disposal of ________ Medicines and ________",
            promptCue: "Tên chiến dịch thu gom thuốc hết hạn tại Anh",
            options: [
              "Disposal of Unused Medicines and Pills",
              "Disposal of Urgent Medical Products",
              "Distribution of Universal Medicines and Prescriptions"
            ],
            correctOption: "Disposal of Unused Medicines and Pills",
            explanationVi:
              "DUMP = Disposal of Unused Medicines and Pills — chơi chữ với động từ 'dump' (vứt bỏ an toàn)."
          },
          {
            id: "1-7-2",
            originalSentence: "NOW — National ________ of Women",
            promptCue: "Tổ chức bảo vệ quyền phụ nữ",
            options: [
              "National Organisation of Women",
              "Network Operation of Women",
              "National Office of Welfare"
            ],
            correctOption: "National Organisation of Women",
            explanationVi:
              "NOW = National Organisation of Women (tạo cảm giác hành động ngay lập tức)."
          },
          {
            id: "1-7-3",
            originalSentence: "UNITE — ________ of National Income Tax Employees",
            promptCue: "Công đoàn nhân viên thuế thu nhập quốc gia",
            options: [
              "Union of National Income Tax Employees",
              "United Network for Income Tax Education",
              "Unit of National Investment & Tax Experts"
            ],
            correctOption: "Union of National Income Tax Employees",
            explanationVi:
              "UNITE = Union of National Income Tax Employees — chữ U đứng đầu đại diện cho Union."
          },
          {
            id: "1-7-4",
            originalSentence: "CALL — Computer Assisted ________ Learning",
            promptCue: "Thuật ngữ kinh điển trong giáo dục ngoại ngữ",
            options: [
              "Computer Assisted Language Learning",
              "Computer Automated Logic Learning",
              "Collaborative Academic Literacy Lab"
            ],
            correctOption: "Computer Assisted Language Learning",
            explanationVi:
              "CALL = Computer Assisted Language Learning (Học ngôn ngữ có sự hỗ trợ của máy tính)."
          },
          {
            id: "1-7-5",
            originalSentence:
              "AAAAA — American ________ for the ________ of Abbreviations and Acronyms",
            promptCue: "Một hiệp hội châm biếm chính việc lạm dụng từ viết tắt",
            options: [
              "American Association for the Abolition of Abbreviations and Acronyms",
              "American Academy for the Advancement of Academic Arts",
              "American Alliance for the Analysis of Ancient Alphabets"
            ],
            correctOption:
              "American Association for the Abolition of Abbreviations and Acronyms",
            explanationVi:
              "AAAAA = American Association for the Abolition of Abbreviations and Acronyms (Hiệp hội Mỹ nhằm Xóa bỏ Từ viết tắt!)."
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNIT 2: PREFIXES: CREATING NEW MEANINGS
  // =========================================================================
  {
    unitId: 2,
    chapterTitle: "Word Formation",
    titleEn: "Prefixes: Creating New Meanings",
    titleVi: "Tiền tố Tạo nghĩa Mới (over-, under-, cross-, pro-)",
    cefr: "C1 – C2",
    estimatedMinutes: 10,
    summaryVi:
      "Giải mã bản chất đa tầng của các tiền tố giới từ (over-, under-, up-, cross-) và tiền tố gốc Latin (con-, e-, a(d)-, pro-, ab-, extra-, intra-) để tự suy luận nghĩa từ lạ khi đọc IELTS Reading.",
    passageTitle: "Beneath the Surface: How Prefixes Architect Nuance",
    passageSubtitle: "ARIS Curated Passage · Tích hợp 20 mục từ trọng tâm Unit 2",
    passageParagraphs: [
      [
        {
          text: "In an era when startups are routinely "
        },
        { text: "overrated", lexiconId: "overrated" },
        { text: " by breathless media hype and software subscriptions feel subtly " },
        { text: "overpriced", lexiconId: "overpriced" },
        {
          text: ", seasoned analysts learn never to "
        },
        { text: "underestimate", lexiconId: "underestimate" },
        { text: " hidden structural flaws. Even when a tech giant experiences an unexpected quarterly " },
        { text: "upturn", lexiconId: "upturn" },
        { text: ", its core engineering division may quietly remain " },
        { text: "understaffed", lexiconId: "understaffed" },
        {
          text: ". Whenever leadership relies on "
        },
        { text: "underhand", lexiconId: "underhand" },
        {
          text: " tactics or lets flashy marketing "
        },
        { text: "overshadow", lexiconId: "overshadow" },
        { text: " engineering quality, they risk " },
        { text: "undermining", lexiconId: "undermine" },
        { text: " public trust altogether." }
      ],
      [
        {
          text: "When global teams collaborate across borders, "
        },
        { text: "cross-cultural", lexiconId: "cross-cultural" },
        { text: " friction and " },
        { text: "cross-border", lexiconId: "cross-border" },
        {
          text: " regulatory gaps rarely vanish "
        },
        { text: "overnight", lexiconId: "overnight" },
        { text: ". If a regional director " },
        { text: "oversteps", lexiconId: "overstep" },
        { text: " local protocol, the " },
        { text: "underlying", lexiconId: "underlying" },
        { text: " diplomatic tension can become slippery " },
        { text: "underfoot", lexiconId: "underfoot" },
        { text: " within hours. Fortunately, once communication channels are " },
        { text: "upgraded", lexiconId: "upgrade" },
        {
          text: ", teams in "
        },
        { text: "adjacent", lexiconId: "adjacent" },
        { text: " time zones can strip away " },
        { text: "extraneous", lexiconId: "extraneous" },
        { text: " details and align their strategy." }
      ],
      [
        {
          text: "Classical prefixes add a further layer of precision. As AI tools "
        },
        { text: "proliferate", lexiconId: "proliferate" },
        { text: " across universities, researchers must not " },
        { text: "procrastinate", lexiconId: "procrastinate" },
        { text: " on setting ethical guardrails, nor " },
        { text: "abdicate", lexiconId: "abdicate" },
        { text: " responsibility for verifying every source." }
      ]
    ],
    lexicon: [
      {
        id: "overrated",
        word: "overrated",
        ipa: "/ˌəʊ.vəˈreɪ.tɪd/",
        pos: "adjective",
        meaningEn: "considered to be better or more important than it really is.",
        meaningVi: "Bị đánh giá quá cao so với giá trị thực.",
        nuanceTip: "Tiền tố over- mang nét nghĩa (a) EXCESS (vượt quá mức thực tế).",
        example: "Many critics feel the sequel was wildly overrated."
      },
      {
        id: "overpriced",
        word: "overpriced",
        ipa: "/ˌəʊ.vəˈpraɪst/",
        pos: "adjective",
        meaningEn: "too expensive; costing far more than it is worth.",
        meaningVi: "Đắt cắt cổ / định giá quá cao.",
        nuanceTip: "Thay thế tuyệt vời cho cụm thông thường 'charges too much' trong IELTS.",
        example: "Tourists often complain about overpriced airport cafés."
      },
      {
        id: "overshadow",
        word: "overshadowed",
        ipa: "/ˌəʊ.vəˈʃæd.əʊd/",
        pos: "verb (past / adj)",
        meaningEn: "made someone or something seem less important or successful by comparison.",
        meaningVi: "Làm lu mờ (nghĩa đen: che bóng; nghĩa bóng: làm kém nổi bật hơn).",
        nuanceTip: "Tiền tố over- mang nét nghĩa (b) COVER (che phủ lên trên).",
        example: "Her scientific breakthrough was overshadowed by political scandal."
      },
      {
        id: "overstep",
        word: "overstepped",
        ipa: "/ˌəʊ.vəˈstept/",
        pos: "verb",
        meaningEn: "went beyond acceptable limits or boundaries (e.g. overstep the mark).",
        meaningVi: "Đi quá giới hạn cho phép.",
        nuanceTip: "Tiền tố over- mang nét nghĩa (c) CROSS (bước qua ranh giới).",
        example: "He overstepped the mark by leaking confidential data."
      },
      {
        id: "overnight",
        word: "overnight",
        ipa: "/ˌəʊ.vəˈnaɪt/",
        pos: "adverb / adjective",
        meaningEn: "during the night, or very suddenly / instantaneously.",
        meaningVi: "Qua đêm, hoặc xảy ra nhanh chóng chỉ sau một đêm.",
        nuanceTip: "Mang nét nghĩa CROSS (vượt qua ranh giới từ ngày này sang ngày hôm sau).",
        example: "Sustainable habits rarely form overnight."
      },
      {
        id: "underestimate",
        word: "underestimate",
        ipa: "/ˌʌn.dərˈes.tɪ.meɪt/",
        pos: "verb",
        meaningEn: "fail to appreciate the full value, size, or difficulty of something.",
        meaningVi: "Đánh giá thấp / xem nhẹ.",
        nuanceTip: "Tiền tố under- mang nét nghĩa (a) LESS (ít hơn thực tế).",
        example: "Never underestimate the compound effect of daily reading."
      },
      {
        id: "understaffed",
        word: "understaffed",
        ipa: "/ˌʌn.dərˈstɑːft/",
        pos: "adjective",
        meaningEn: "lacking sufficient personnel to operate effectively.",
        meaningVi: "Thiếu nhân sự.",
        nuanceTip: "Tương tự: underfunded (thiếu vốn), underpaid (trả lương thấp).",
        example: "Rural hospitals remain chronically understaffed."
      },
      {
        id: "underfoot",
        word: "underfoot",
        ipa: "/ˌʌn.dərˈfʊt/",
        pos: "adverb / adjective",
        meaningEn: "on the ground, directly beneath your feet.",
        meaningVi: "Dưới chân (mặt đất ngay dưới bước chân).",
        nuanceTip: "Tiền tố under- mang nét nghĩa (b) BELOW (ở bên dưới).",
        example: "Wet autumn leaves made the cobbled path slippery underfoot."
      },
      {
        id: "underlying",
        word: "underlying",
        ipa: "/ˌʌn.dəˈlaɪ.ɪŋ/",
        pos: "adjective",
        meaningEn: "fundamental or root cause lying beneath the surface, not immediately obvious.",
        meaningVi: "Tiềm ẩn, căn nguyên sâu xa nằm bên dưới bề mặt.",
        nuanceTip: "Từ khóa đắt giá bậc nhất cho IELTS Writing Task 2 ('underlying causes').",
        example: "Subsidies treat symptoms without resolving the underlying economic imbalance."
      },
      {
        id: "undermine",
        word: "undermine",
        ipa: "/ˌʌn.dəˈmaɪn/",
        pos: "verb",
        meaningEn: "gradually weaken, erode, or sabotage confidence, authority, or a position.",
        meaningVi: "Làm suy yếu ngầm, xói mòn từ bên trong.",
        nuanceTip: "Tiền tố under- mang nét nghĩa (c) NEGATIVE (hành động phá hoại/tác động xấu).",
        example: "Inconsistent enforcement undermines public trust in regulations."
      },
      {
        id: "underhand",
        word: "underhand",
        ipa: "/ˈʌn.də.hænd/",
        pos: "adjective",
        meaningEn: "secret, deceitful, and dishonest.",
        meaningVi: "Lén lút, mờ ám, không minh bạch.",
        nuanceTip: "Thường đi với 'tactics', 'methods', 'way'.",
        example: "They secured the contract through underhand lobbying."
      },
      {
        id: "upgrade",
        word: "upgraded",
        ipa: "/ˌʌpˈɡreɪ.dɪd/",
        pos: "verb",
        meaningEn: "raised to a higher standard, rank, or luxury class.",
        meaningVi: "Nâng hạng, nâng cấp lên mức tốt hơn.",
        nuanceTip: "Tiền tố up- thường hàm ý thay đổi tích cực hướng lên.",
        example: "The airline upgraded loyal passengers to business class."
      },
      {
        id: "upturn",
        word: "upturn",
        ipa: "/ˈʌp.tɜːn/",
        pos: "noun",
        meaningEn: "an upward movement or sudden improvement (in economy, sales, popularity).",
        meaningVi: "Sự khởi sắc, bước chuyển biến đi lên.",
        nuanceTip: "Trái nghĩa với 'downturn' (suy thoái).",
        example: "Economists forecast a modest upturn in manufacturing output."
      },
      {
        id: "cross-border",
        word: "cross-border",
        ipa: "/ˌkrɒsˈbɔː.dər/",
        pos: "adjective",
        meaningEn: "involving or operating across the borders of two or more countries.",
        meaningVi: "Xuyên biên giới.",
        nuanceTip: "Tiền tố cross- nối 2 đối tượng tách biệt lại với nhau.",
        example: "Cross-border data flows require harmonised privacy laws."
      },
      {
        id: "cross-cultural",
        word: "cross-cultural",
        ipa: "/ˌkrɒsˈkʌl.tʃər.əl/",
        pos: "adjective",
        meaningEn: "relating to or comparing two or more different cultures.",
        meaningVi: "Liên văn hóa / giữa các nền văn hóa khác nhau.",
        nuanceTip: "Cụm chuẩn: 'cross-cultural misunderstandings / competence'.",
        example: "Multinational teams thrive on cross-cultural empathy."
      },
      {
        id: "adjacent",
        word: "adjacent",
        ipa: "/əˈdʒeɪ.sənt/",
        pos: "adjective",
        meaningEn: "next to or adjoining something else.",
        meaningVi: "Liền kề, sát cạnh (trang trọng).",
        nuanceTip: "Tiền tố a(d)- mang nghĩa thêm vào/gắn kết; hay đi với giới từ 'to'.",
        example: "The new research lab stands adjacent to the main library."
      },
      {
        id: "proliferate",
        word: "proliferate",
        ipa: "/prəˈlɪf.ər.eɪt/",
        pos: "verb",
        meaningEn: "increase rapidly in number or multiply swiftly.",
        meaningVi: "Sinh sôi, bùng nổ nhanh về số lượng.",
        nuanceTip: "Tiền tố pro- mang nét nghĩa đẩy tới/tăng trưởng.",
        example: "Micro-credential platforms have proliferated over the past decade."
      },
      {
        id: "procrastinate",
        word: "procrastinate",
        ipa: "/prəˈkræs.tɪ.neɪt/",
        pos: "verb",
        meaningEn: "delay or postpone doing something that needs immediate attention.",
        meaningVi: "Trì hoãn, lần lữa.",
        nuanceTip: "Danh từ là 'procrastination' — chủ đề quen thuộc trong tâm lý học.",
        example: "Perfectionists often procrastinate out of fear of flawed output."
      },
      {
        id: "abdicate",
        word: "abdicate",
        ipa: "/ˈæb.dɪ.keɪt/",
        pos: "verb",
        meaningEn: "give up a throne, power, or formal responsibility.",
        meaningVi: "Thoái vị, hoặc từ bỏ/thoái thác trách nhiệm.",
        nuanceTip: "Tiền tố ab- chỉ sự rời bỏ/tách khỏi (cùng họ với abscond, abduct).",
        example: "Parents cannot abdicate responsibility for digital literacy."
      },
      {
        id: "extraneous",
        word: "extraneous",
        ipa: "/ɪkˈstreɪ.ni.əs/",
        pos: "adjective",
        meaningEn: "irrelevant or unrelated to the subject being dealt with.",
        meaningVi: "Ngoại lai, rườm rà không liên quan trọng tâm.",
        nuanceTip: "Tiền tố extra- = 'bên ngoài' (ngoài phạm vi cốt lõi).",
        example: "Strict editing removes extraneous clauses from dense essays."
      }
    ],
    theorySections: [
      {
        key: "A",
        title: "Preposition-Based Prefixes (over-, under-, up-, cross-)",
        subtitle: "Ba sắc thái ẩn dụ của tiền tố chỉ vị trí trong tiếng Anh học thuật",
        items: [
          {
            label: "over- = (a) Excess · (b) Cover · (c) Cross",
            detail:
              "(a) Quá mức: overrated, overpriced. (b) Bao trùm/che bóng: overwrite, overshadow, overbearing. (c) Vượt ranh giới: overstep, overnight, overleaf, overboard.",
            example: "Don't let minor setbacks overshadow long-term progress."
          },
          {
            label: "under- = (a) Less · (b) Below · (c) Negative",
            detail:
              "(a) Thiếu hụt: underestimate, understaffed, underfunded. (b) Bên dưới: underfoot, undercarriage, underlying. (c) Tiêu cực/xói mòn: undermine, underhand.",
            example: "The underlying problem was left unresolved."
          },
          {
            label: "up- & cross-",
            detail:
              "up- gợi thay đổi tích cực đi lên (upgrade, upturn). cross- chỉ cầu nối giữa hai phía tách biệt (cross-border, cross-cultural).",
            example: "Cross-border cooperation curbed illegal wildlife trade."
          }
        ]
      },
      {
        key: "B",
        title: "Less Frequent Classical Prefixes",
        subtitle: "Nhận diện nhanh gốc từ học thuật C1–C2",
        items: [
          {
            label: "con-/com- (hòa trộn/cùng nhau) & e- (đẩy ra ngoài)",
            detail: "converse, commiserate, condolences, congeal | ejected, emitted.",
            example: "The device emitted a faint warning tone."
          },
          {
            label: "a(d)- (gắn thêm/kết nối) & pro- (đẩy tới/gia tăng)",
            detail:
              "adjacent, adjoin, annotated, allocate, appertain | promote, proliferate, procrastinate, procreate.",
            example: "An annotated edition helps learners grasp archaic idioms."
          },
          {
            label: "ab- / a- / extra- / inter- / intra-",
            detail:
              "ab- (rời khỏi: abdicate, abscond, abduct); a- (đang diễn ra: ablaze, afloat, adrift); extra- (ngoài: extraneous); inter- (giữa các bên) vs intra- (nội bộ bên trong).",
            example: "An intranet connects staff solely inside one organisation."
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex-2-1",
        kind: "classifier",
        title: "Bài tập 2.1 · Giải mã 3 Sắc thái Tiền tố over- và under-",
        instruction:
          "Xác định từ in đậm mang sắc thái nghĩa (a), (b) hay (c) như trong hệ thống lý thuyết (Giữ nguyên 6 câu gốc từ sách).",
        sourceNote: "Tuyển chọn nguyên bản · Unit 2 (Ex 2.1)",
        categories: [
          {
            key: "a",
            label: "(a) Excess / Less",
            description: "Quá mức (over) hoặc Thiếu hụt (under)"
          },
          {
            key: "b",
            label: "(b) Cover / Below",
            description: "Che phủ/áp đảo (over) hoặc Ở bên dưới (under)"
          },
          {
            key: "c",
            label: "(c) Cross / Negative",
            description: "Vượt qua ranh giới/mép (over) hoặc Hành vi tiêu cực (under)"
          }
        ],
        questions: [
          {
            id: "2-1-1",
            prompt: "I really think she overstated her case, and lost a lot of sympathy.",
            highlightWord: "overstated",
            correctCategory: "a",
            explanationVi:
              "overstated = nói phóng đại quá mức thực tế → sắc thái (a) Excess."
          },
          {
            id: "2-1-2",
            prompt: "The plane's undercarriage failed to open and it crashed.",
            highlightWord: "undercarriage",
            correctCategory: "b",
            explanationVi:
              "undercarriage = bộ phận càng đáp nằm phía dưới thân máy bay → sắc thái (b) Below."
          },
          {
            id: "2-1-3",
            prompt: "A detailed list of awards is given overleaf.",
            highlightWord: "overleaf",
            correctCategory: "c",
            explanationVi:
              "overleaf = lật sang mặt bên kia của trang giấy (vượt qua mép trang) → sắc thái (c) Cross."
          },
          {
            id: "2-1-4",
            prompt: "He has a very overbearing personality.",
            highlightWord: "overbearing",
            correctCategory: "b",
            explanationVi:
              "overbearing = tính cách áp đảo, lấn át người khác (bao trùm lên người khác) → sắc thái (b) Cover/Dominate."
          },
          {
            id: "2-1-5",
            prompt: "The project was underfunded from the outset.",
            highlightWord: "underfunded",
            correctCategory: "a",
            explanationVi:
              "underfunded = thiếu kinh phí đầu tư ngay từ đầu → sắc thái (a) Less."
          },
          {
            id: "2-1-6",
            prompt: "During the cruise, a child fell overboard and drowned.",
            highlightWord: "overboard",
            correctCategory: "c",
            explanationVi:
              "overboard = rơi qua mạn tàu xuống nước (vượt rào chắn tàu) → sắc thái (c) Cross."
          }
        ]
      },
      {
        id: "ex-2-2",
        kind: "sentence_upgrade",
        title: "Bài tập 2.2 · Nâng cấp Diễn đạt với Tiền tố Học thuật",
        instruction:
          "Chuyển hóa các câu diễn đạt thông thường thành câu văn cô đọng, chuẩn học thuật bằng từ có tiền tố (Giữ nguyên 9 câu gốc trong sách).",
        sourceNote: "Tuyển chọn nguyên bản · Unit 2 (Ex 2.2)",
        questions: [
          {
            id: "2-2-1",
            originalSentence:
              "The hotel gave me a luxury room instead of the ordinary one I'd booked.",
            options: [
              "The hotel upgraded me to a luxury room.",
              "The hotel overcharged me for a luxury room.",
              "The hotel adjoined me to a luxury room."
            ],
            correctOption: "The hotel upgraded me to a luxury room.",
            explanationVi:
              "upgraded = nâng hạng lên dịch vụ cao cấp hơn."
          },
          {
            id: "2-2-2",
            originalSentence:
              "Would you like to spend the night there or come back the same day?",
            options: [
              "Would you like to stay there overnight or come back the same day?",
              "Would you like to stay there overleaf or come back the same day?",
              "Would you like to stay there underfoot or come back the same day?"
            ],
            correctOption:
              "Would you like to stay there overnight or come back the same day?",
            explanationVi: "stay overnight = ở lại qua đêm."
          },
          {
            id: "2-2-3",
            originalSentence:
              "The problem that lies under the surface is a very serious one.",
            options: [
              "The underlying problem is a very serious one.",
              "The understaffed problem is a very serious one.",
              "The underhand problem is a very serious one."
            ],
            correctOption: "The underlying problem is a very serious one.",
            explanationVi:
              "underlying = tiềm ẩn, cốt lõi nằm bên dưới bề mặt."
          },
          {
            id: "2-2-4",
            originalSentence:
              "Misunderstandings between cultures are, sadly, very frequent.",
            options: [
              "Cross-cultural misunderstandings are, sadly, very frequent.",
              "Cross-border misunderstandings are, sadly, very frequent.",
              "Overrated misunderstandings are, sadly, very frequent."
            ],
            correctOption:
              "Cross-cultural misunderstandings are, sadly, very frequent.",
            explanationVi:
              "cross-cultural = liên văn hóa (giữa hai hay nhiều nền văn hóa)."
          },
          {
            id: "2-2-5",
            originalSentence: "I think this hotel charges too much.",
            options: [
              "I think this hotel is overpriced.",
              "I think this hotel is overrated.",
              "I think this hotel is overstepped."
            ],
            correctOption: "I think this hotel is overpriced.",
            explanationVi:
              "overpriced = định giá quá đắt; overrated = bị khen quá lời (chú ý đừng nhầm!)."
          },
          {
            id: "2-2-6",
            originalSentence: "It's slippery walking just here. Be careful.",
            options: [
              "It's slippery underfoot just here. Be careful.",
              "It's slippery underlying just here. Be careful.",
              "It's slippery overboard just here. Be careful."
            ],
            correctOption: "It's slippery underfoot just here. Be careful.",
            explanationVi: "underfoot = bề mặt ngay dưới bàn chân khi bước đi."
          },
          {
            id: "2-2-7",
            originalSentence:
              "The company experienced a rise in popularity since it changed its name.",
            options: [
              "The company experienced an upturn in popularity since it changed its name.",
              "The company experienced an upgrade in popularity since it changed its name.",
              "The company experienced an output in popularity since it changed its name."
            ],
            correctOption:
              "The company experienced an upturn in popularity since it changed its name.",
            explanationVi:
              "upturn (n) = sự khởi sắc, đi lên về doanh số hoặc mức độ phổ biến."
          },
          {
            id: "2-2-8",
            originalSentence:
              "I felt that what she said was critical of my position and weakened it somewhat.",
            options: [
              "I felt that what she said undermined my position.",
              "I felt that what she said underestimated my position.",
              "I felt that what she said overshadowed my position."
            ],
            correctOption: "I felt that what she said undermined my position.",
            explanationVi:
              "undermine = làm suy yếu, xói mòn vị thế hoặc uy tín của ai đó."
          },
          {
            id: "2-2-9",
            originalSentence:
              "It would be a mistake to think Frances was less intelligent than she really is.",
            options: [
              "It would be a mistake to underestimate Frances's intelligence.",
              "It would be a mistake to underfund Frances's intelligence.",
              "It would be a mistake to overbear Frances's intelligence."
            ],
            correctOption:
              "It would be a mistake to underestimate Frances's intelligence.",
            explanationVi:
              "underestimate = đánh giá thấp hơn năng lực thực tế."
          }
        ]
      },
      {
        id: "ex-2-3",
        kind: "classifier",
        title: "Bài tập 2.3 & 2.5 · Kiểm tra Ghép Tiền tố a(d)- & Giải mã Gốc từ",
        instruction:
          "Xác định xem gốc từ có thể ghép với tiền tố a(d)- hay không (biến đổi phụ âm đầu thành al-, ad-, ap-) và gõ từ hoàn chỉnh nếu có (Giữ nguyên từ sách gốc).",
        sourceNote: "Tuyển chọn tinh gọn · Unit 2 (Ex 2.3)",
        categories: [
          {
            key: "YES",
            label: "YES · Ghép được a(d)-",
            description: "Có từ tiếng Anh hợp lệ (VD: fix → affix)"
          },
          {
            key: "NO",
            label: "NO · Không ghép được",
            description: "Không tồn tại từ ghép hợp lệ với a(d)-"
          }
        ],
        questions: [
          {
            id: "2-3-1",
            prompt: "Gốc từ: locate",
            highlightWord: "locate",
            correctCategory: "YES",
            subPrompt: "Gõ từ mới sau khi ghép a(d)-:",
            subCorrectAnswer: "allocate",
            explanationVi:
              "YES → allocate (phân bổ nguồn lực). Phụ âm 'd' biến thành 'l' để khớp với 'locate'."
          },
          {
            id: "2-3-2",
            prompt: "Gốc từ: verse",
            highlightWord: "verse",
            correctCategory: "YES",
            subPrompt: "Gõ từ mới sau khi ghép a(d)-:",
            subCorrectAnswer: "adverse",
            explanationVi:
              "YES → adverse (bất lợi, nghịch cảnh — vd: adverse weather conditions)."
          },
          {
            id: "2-3-3",
            prompt: "Gốc từ: state",
            highlightWord: "state",
            correctCategory: "NO",
            explanationVi:
              "NO → Không có từ ghép 'adstate' hay 'astate'."
          },
          {
            id: "2-3-4",
            prompt: "Gốc từ: mission",
            highlightWord: "mission",
            correctCategory: "YES",
            subPrompt: "Gõ từ mới sau khi ghép a(d)-:",
            subCorrectAnswer: "admission",
            explanationVi:
              "YES → admission (sự thừa nhận / việc nhập học, vé vào cửa)."
          },
          {
            id: "2-3-5",
            prompt: "Gốc từ: pertain",
            highlightWord: "pertain",
            correctCategory: "YES",
            subPrompt: "Gõ từ mới sau khi ghép a(d)-:",
            subCorrectAnswer: "appertain",
            explanationVi:
              "YES → appertain (thuộc về, liên quan trực tiếp đến — văn phong pháp lý/học thuật)."
          },
          {
            id: "2-3-6",
            prompt: "Gốc từ: minister",
            highlightWord: "minister",
            correctCategory: "YES",
            subPrompt: "Gõ từ mới sau khi ghép a(d)-:",
            subCorrectAnswer: "administer",
            explanationVi:
              "YES → administer (quản lý, điều hành, hoặc cho uống thuốc)."
          },
          {
            id: "2-3-7",
            prompt: "Gốc từ: drain",
            highlightWord: "drain",
            correctCategory: "NO",
            explanationVi:
              "NO → Không tồn tại từ ghép với tiền tố a(d)- cho gốc từ 'drain'."
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNIT 3: SUFFIXES: PRODUCTIVE SUFFIXES AND WORD CLASSES
  // =========================================================================
  {
    unitId: 3,
    chapterTitle: "Word Formation",
    titleEn: "Suffixes: Productive Suffixes & Word Classes",
    titleVi: "Hậu tố Sản sinh Từ ghép & Phân biệt Từ loại",
    cefr: "C1 – C2",
    estimatedMinutes: 10,
    summaryVi:
      "Tự tin đọc hiểu và chủ động kiến tạo tính từ ghép cao cấp (-free, -rich, -led, -minded, -proof, -ridden, -worthy) cũng như nhận diện chính xác bẫy từ loại đuôi -ly, -en, -ant.",
    passageTitle: "Precision Packaging: How Modern Suffixes Condense Meaning",
    passageSubtitle: "ARIS Curated Passage · Tích hợp 23 mục từ trọng tâm Unit 3",
    passageParagraphs: [
      [
        {
          text: "Walk down any contemporary supermarket aisle or browse a broadsheet newspaper and you immediately encounter a flood of compound adjectives forged by productive suffixes. Packaging now promises "
        },
        { text: "additive-free", lexiconId: "additive-free" },
        { text: " snacks, " },
        { text: "fibre-rich", lexiconId: "fibre-rich" },
        { text: " breakfast cereals, and fully " },
        { text: "washable", lexiconId: "washable" },
        {
          text: " travel gear built to replace wasteful "
        },
        { text: "disposable", lexiconId: "disposable" },
        { text: " plastics. Meanwhile, " },
        { text: "health-conscious", lexiconId: "health-conscious" },
        { text: " citizens join " },
        { text: "like-minded", lexiconId: "like-minded" },
        { text: " neighbours in " },
        { text: "community-led", lexiconId: "community-led" },
        { text: " initiatives to carve out " },
        { text: "stress-free", lexiconId: "stress-free" },
        { text: " urban gardens." }
      ],
      [
        {
          text: "The same linguistic economy drives economics and journalism. Commentators contrast "
        },
        { text: "oil-rich", lexiconId: "oil-rich" },
        {
          text: " nations with "
        },
        { text: "terror-ridden", lexiconId: "terror-ridden" },
        { text: " regions, while banks assess whether every " },
        { text: "applicant", lexiconId: "applicant" },
        { text: " or insurance " },
        { text: "claimant", lexiconId: "claimant" },
        { text: " is genuinely " },
        { text: "creditworthy", lexiconId: "creditworthy" },
        { text: ". In architecture, designers engineer " },
        { text: "soundproof", lexiconId: "soundproof" },
        { text: " studios and " },
        { text: "vandal-proof", lexiconId: "vandal-proof" },
        {
          text: " kiosks; in politics, "
        },
        { text: "career-minded", lexiconId: "career-minded" },
        { text: " advisors fear a " },
        { text: "guilt-ridden", lexiconId: "guilt-ridden" },
        { text: " confession could become a " },
        { text: "newsworthy", lexiconId: "newsworthy" },
        { text: " scandal with " },
        { text: "predictable", lexiconId: "predictable" },
        { text: " fallout. Even art critics coin terms such as " },
        { text: "Picassoesque", lexiconId: "picassoesque" },
        { text: " to capture unmistakable stylistic flair." }
      ],
      [
        {
          text: "Equally vital for Band 7.5+ accuracy is spotting deceptive word-class endings. Not every word ending in -ly is an adverb: a "
        },
        { text: "leisurely", lexiconId: "leisurely" },
        { text: " stroll or a " },
        { text: "miserly", lexiconId: "miserly" },
        {
          text: " budget uses -ly as an adjective. Likewise, -en can turn adjectives into dynamic verbs—light summer breezes "
        },
        { text: "moisten", lexiconId: "moisten" },
        { text: " dry coastal air just as rising prices deepen social frustration." }
      ]
    ],
    lexicon: [
      {
        id: "washable",
        word: "washable",
        ipa: "/ˈwɒʃ.ə.bəl/",
        pos: "adjective",
        meaningEn: "able to be washed without being damaged.",
        meaningVi: "Có thể giặt được mà không bị hỏng.",
        nuanceTip: "Hậu tố -able mang tính sản sinh cao (can be done); khác với -ible không tạo từ mới.",
        example: "All seat covers are removable and machine washable."
      },
      {
        id: "disposable",
        word: "disposable",
        ipa: "/dɪˈspəʊ.zə.bəl/",
        pos: "adjective",
        meaningEn: "designed to be thrown away after one use, or available to spend (disposable income).",
        meaningVi: "Dùng một lần rồi bỏ; hoặc 'thu nhập khả dụng' (disposable income).",
        nuanceTip: "Chú ý 2 collocation đắt giá: disposable cutlery vs disposable income.",
        example: "Rising rents are squeezing households' disposable income."
      },
      {
        id: "predictable",
        word: "predictable",
        ipa: "/prɪˈdɪk.tə.bəl/",
        pos: "adjective",
        meaningEn: "behaving or happening in a way that is easy to foresee.",
        meaningVi: "Có thể đoán trước được.",
        nuanceTip: "Phủ định: unpredictable.",
        example: "The policy shift triggered a predictable downturn in housing starts."
      },
      {
        id: "health-conscious",
        word: "health-conscious",
        ipa: "/ˈhelθˌkɒn.ʃəs/",
        pos: "adjective",
        meaningEn: "caring deeply about and actively managing one's health.",
        meaningVi: "Có ý thức cao về sức khỏe.",
        nuanceTip: "Mô hình N + -conscious: cost-conscious, class-conscious, safety-conscious.",
        example: "Health-conscious consumers scrutinise ingredient labels closely."
      },
      {
        id: "picassoesque",
        word: "Picassoesque",
        ipa: "/pɪˌkæs.əʊˈesk/",
        pos: "adjective",
        meaningEn: "resembling the distinctive artistic style of Pablo Picasso.",
        meaningVi: "Mang đậm phong cách nghệ thuật của Picasso.",
        nuanceTip: "Hậu tố -esque ghép sau tên danh nhân để ví von phong cách tương đồng.",
        example: "The gallery unveiled a series of bold Picassoesque portraits."
      },
      {
        id: "stress-free",
        word: "stress-free",
        ipa: "/ˌstresˈfriː/",
        pos: "adjective",
        meaningEn: "completely without stress or anxiety.",
        meaningVi: "Không có căng thẳng / giải tỏa áp lực.",
        nuanceTip: "N + -free mang nghĩa không chứa yếu tố bất lợi (tax-free, car-free, duty-free).",
        example: "A well-paced morning routine fosters a stress-free commute."
      },
      {
        id: "additive-free",
        word: "additive-free",
        ipa: "/ˈæd.ɪ.tɪv friː/",
        pos: "adjective",
        meaningEn: "containing no artificial chemical additives.",
        meaningVi: "Không chứa chất phụ gia nhân tạo.",
        nuanceTip: "Collocation chuẩn: additive-free foods / drinks.",
        example: "Parents increasingly demand additive-free school lunches."
      },
      {
        id: "fibre-rich",
        word: "fibre-rich",
        ipa: "/ˈfaɪ.bər rɪtʃ/",
        pos: "adjective",
        meaningEn: "containing a high proportion of dietary fibre.",
        meaningVi: "Giàu chất xơ.",
        nuanceTip: "N + -rich diễn tả hàm lượng dồi dào (calcium-rich, nutrient-rich, vitamin-rich).",
        example: "Nutritionists advocate a fibre-rich diet to stabilise blood sugar."
      },
      {
        id: "oil-rich",
        word: "oil-rich",
        ipa: "/ˈɔɪl.rɪtʃ/",
        pos: "adjective",
        meaningEn: "possessing abundant reserves of crude oil.",
        meaningVi: "Giàu tài nguyên dầu mỏ.",
        nuanceTip: "Collocation chuẩn trong kinh tế học: oil-rich economy / country.",
        example: "Several oil-rich states are diversifying into solar infrastructure."
      },
      {
        id: "community-led",
        word: "community-led",
        ipa: "/kəˈmjuː.nə.ti led/",
        pos: "adjective",
        meaningEn: "initiated, organised, and guided by local residents.",
        meaningVi: "Do cộng đồng dẫn dắt / khởi xướng.",
        nuanceTip: "Tương tự: student-led protest, government-led initiative.",
        example: "Community-led reforestation projects show higher long-term survival rates."
      },
      {
        id: "career-minded",
        word: "career-minded",
        ipa: "/kəˈrɪəˌmaɪn.dɪd/",
        pos: "adjective",
        meaningEn: "strongly focused on advancing one's professional career.",
        meaningVi: "Chú tâm vào sự nghiệp / tham vọng công danh.",
        nuanceTip: "Tương tự: money-minded, broad-minded, sports-minded.",
        example: "Ambitious, career-minded graduates often relocate to financial hubs."
      },
      {
        id: "like-minded",
        word: "like-minded",
        ipa: "/ˌlaɪkˈmaɪn.dɪd/",
        pos: "adjective",
        meaningEn: "sharing similar values, tastes, or opinions.",
        meaningVi: "Cùng chí hướng, đồng điệu tư duy.",
        nuanceTip: "Cụm cực hay cho Speaking Part 2/3: 'surround myself with like-minded peers'.",
        example: "The hub connects like-minded researchers across continents."
      },
      {
        id: "soundproof",
        word: "soundproof",
        ipa: "/ˈsaʊnd.pruːf/",
        pos: "adjective",
        meaningEn: "constructed to prevent sound from entering or escaping.",
        meaningVi: "Cách âm chống tiếng ồn.",
        nuanceTip: "N + -proof: chống lại tác hại của N (waterproof, ovenproof, dustproof).",
        example: "Podcasters record interviews inside a compact soundproof booth."
      },
      {
        id: "vandal-proof",
        word: "vandal-proof",
        ipa: "/ˈvæn.dəl pruːf/",
        pos: "adjective",
        meaningEn: "resistant to deliberate destruction or vandalism.",
        meaningVi: "Chống phá hoại.",
        nuanceTip: "Thay thế gọn gàng cho cả mệnh đề dài 'indestructible by vandals'.",
        example: "Transit authorities installed vandal-proof ticket machines."
      },
      {
        id: "guilt-ridden",
        word: "guilt-ridden",
        ipa: "/ˈɡɪltˌrɪd.ən/",
        pos: "adjective",
        meaningEn: "deeply tormented by feelings of guilt.",
        meaningVi: "Dằn vặt tội lỗi nặng nề.",
        nuanceTip: "N + -ridden luôn mang sắc thái tiêu cực dày đặc (crime-ridden, poverty-ridden).",
        example: "The whistleblower had a visibly guilt-ridden expression."
      },
      {
        id: "terror-ridden",
        word: "terror-ridden",
        ipa: "/ˈter.ərˌrɪd.ən/",
        pos: "adjective",
        meaningEn: "dominated or overwhelmed by constant fear and terror.",
        meaningVi: "Bao trùm trong nỗi kinh hoàng, khủng bố.",
        nuanceTip: "Ngoại lệ lưu ý: bedridden nghĩa là nằm liệt giường vì bệnh.",
        example: "Relief convoys struggled to reach the terror-ridden province."
      },
      {
        id: "newsworthy",
        word: "newsworthy",
        ipa: "/ˈnjuːzˌwɜː.ði/",
        pos: "adjective",
        meaningEn: "interesting or significant enough to be reported in the news.",
        meaningVi: "Đáng đưa tin, có giá trị báo chí.",
        nuanceTip: "N + -worthy: đáng được nhận N (praiseworthy = đáng khen, noteworthy = đáng chú ý).",
        example: "Only verified breakthroughs were deemed newsworthy by editors."
      },
      {
        id: "creditworthy",
        word: "creditworthy",
        ipa: "/ˈkred.ɪtˌwɜː.ði/",
        pos: "adjective",
        meaningEn: "considered financially reliable enough to be granted a loan or credit.",
        meaningVi: "Đủ uy tín tín dụng để được cho vay.",
        nuanceTip: "Thuật ngữ chuẩn tài chính ngân hàng.",
        example: "Consistent repayment histories help borrowers appear creditworthy."
      },
      {
        id: "leisurely",
        word: "leisurely",
        ipa: "/ˈleʒ.ə.li/",
        pos: "adjective / adverb",
        meaningEn: "unhurried, relaxed, and unpressured.",
        meaningVi: "Thong thả, thư thái (lưu ý: dù tận cùng -ly nhưng là TÍNH TỪ).",
        nuanceTip: "Cùng nhóm tính từ đuôi -ly: friendly, lively, costly, miserly, masterly.",
        example: "They enjoyed a leisurely breakfast overlooking the bay."
      },
      {
        id: "miserly",
        word: "miserly",
        ipa: "/ˈmaɪ.zə.li/",
        pos: "adjective",
        meaningEn: "extremely stingy or unwilling to spend money.",
        meaningVi: "Keo kiệt, bủn xỉn.",
        nuanceTip: "Không dùng 'miserlily'; diễn đạt bằng 'in a miserly way'.",
        example: "A miserly maintenance budget soon caused equipment failures."
      },
      {
        id: "applicant",
        word: "applicant",
        ipa: "/ˈæp.lɪ.kənt/",
        pos: "noun (from verb + -ant)",
        meaningEn: "a person who formally applies for a job, place, or grant.",
        meaningVi: "Ứng viên, người nộp đơn.",
        nuanceTip: "Hậu tố -ant thường tạo tính từ (relevant) nhưng cũng tạo danh từ chỉ người.",
        example: "Each shortlisted applicant completes a practical case study."
      },
      {
        id: "claimant",
        word: "claimant",
        ipa: "/ˈkleɪ.mənt/",
        pos: "noun (from verb + -ant)",
        meaningEn: "a person making a legal or insurance claim for money or rights.",
        meaningVi: "Người yêu cầu bồi thường / người khiếu nại quyền lợi.",
        nuanceTip: "Nhóm -ant chỉ người: informant, contestant, occupant.",
        example: "Insurance assessors verified every detail submitted by the claimant."
      },
      {
        id: "moisten",
        word: "moisten",
        ipa: "/ˈmɔɪ.sən/",
        pos: "verb (adjective + -en)",
        meaningEn: "make slightly wet or damp.",
        meaningVi: "Làm ẩm.",
        nuanceTip: "-en vừa tạo tính từ (woollen, silken) vừa tạo ĐỘNG TỪ từ tính từ (darken, dampen, roughen).",
        example: "Coastal fog helps moisten arid hillside vegetation."
      }
    ],
    theorySections: [
      {
        key: "A",
        title: "Productive Suffixes (Hậu tố Tạo từ mới linh hoạt)",
        subtitle: "Ghép danh từ hoặc tên riêng để cô đọng cả một mệnh đề quan hệ",
        items: [
          {
            label: "-able · -conscious · -esque",
            detail:
              "-able (có thể làm được: washable, dry-cleanable); -conscious (chú trọng: health-conscious); -esque (phong cách giống danh nhân: Picassoesque).",
            example: "Age-conscious marketing targets demographic shifts."
          },
          {
            label: "-free · -rich · -led · -minded",
            detail:
              "-free (không chứa thứ xấu: additive-free); -rich (dồi dào: fibre-rich); -led (do ai dẫn dắt: community-led); -minded (tâm thế/định hướng: career-minded).",
            example: "Student-led initiatives revitalised campus recycling."
          },
          {
            label: "-proof · -related · -ridden · -worthy",
            detail:
              "-proof (chống chịu: soundproof, vandal-proof); -related (liên quan đến: stress-related); -ridden (đầy rẫy thứ tiêu cực: guilt-ridden); -worthy (xứng đáng: creditworthy, newsworthy).",
            example: "Stress-related absences cost firms billions annually."
          }
        ]
      },
      {
        key: "B",
        title: "Deceptive Word Classes (-ly, -ant, -en)",
        subtitle: "Tránh bẫy nhận diện sai từ loại khi làm Word Formation & Reading",
        items: [
          {
            label: "Tính từ kết thúc bằng -ly",
            detail:
              "lively, costly, leisurely, miserly, friendly, masterly (dù có -ly nhưng là Adjective; riêng 'kindly' vừa là Adverb vừa là Adjective).",
            example: "A masterly performance earned a standing ovation."
          },
          {
            label: "Danh từ chỉ người đuôi -ant & Động từ đuôi -en",
            detail:
              "-ant chỉ người: applicant, claimant, informant, contestant, occupant. -en tạo động từ: moisten, sweeten, worsen, redden, dampen, roughen, darken (khác với tính từ silken, woollen, golden).",
            example: "Storm clouds began to darken the horizon."
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex-3-2",
        kind: "sentence_upgrade",
        title: "Bài tập 3.2 · Ghép Collocations Tính từ ghép chuẩn xác",
        instruction:
          "Chọn cặp danh từ kết hợp tự nhiên nhất với mỗi tính từ ghép (Giữ nguyên tổ hợp chuẩn từ sách gốc).",
        sourceNote: "Tuyển chọn nguyên bản · Unit 3 (Ex 3.2)",
        questions: [
          {
            id: "3-2-1",
            originalSentence: "1. additive-free ________",
            options: [
              "foods, drinks",
              "knives and forks, income",
              "delay, mistake"
            ],
            correctOption: "foods, drinks",
            explanationVi:
              "additive-free (không phụ gia) luôn đi với thực phẩm và đồ uống: additive-free foods / drinks."
          },
          {
            id: "3-2-2",
            originalSentence: "2. disposable ________",
            options: [
              "knives and forks, income",
              "expression, criminal",
              "economy, country"
            ],
            correctOption: "knives and forks, income",
            explanationVi:
              "disposable knives and forks (dao nĩa dùng 1 lần) và disposable income (thu nhập khả dụng sau thuế)."
          },
          {
            id: "3-2-3",
            originalSentence: "3. guilt-ridden ________",
            options: [
              "expression, criminal",
              "glove, dish",
              "room, booth"
            ],
            correctOption: "expression, criminal",
            explanationVi:
              "guilt-ridden expression (vẻ mặt đầy mặc cảm tội lỗi) / guilt-ridden criminal."
          },
          {
            id: "3-2-4",
            originalSentence: "4. high-minded ________",
            options: [
              "speech, principles",
              "illness, problems",
              "story, personality"
            ],
            correctOption: "speech, principles",
            explanationVi:
              "high-minded (cao thượng, lý tưởng) đi với bài diễn văn hoặc nguyên tắc: high-minded speech / principles."
          },
          {
            id: "3-2-5",
            originalSentence: "5. newsworthy ________",
            options: [
              "story, personality",
              "delay, mistake",
              "foods, drinks"
            ],
            correctOption: "story, personality",
            explanationVi:
              "newsworthy story / personality (câu chuyện hoặc nhân vật đáng lên trang báo)."
          },
          {
            id: "3-2-6",
            originalSentence: "6. oil-rich ________",
            options: [
              "economy, country",
              "glove, dish",
              "room, booth"
            ],
            correctOption: "economy, country",
            explanationVi: "oil-rich economy / country (nền kinh tế / quốc gia giàu dầu mỏ)."
          },
          {
            id: "3-2-7",
            originalSentence: "7. ovenproof & soundproof ________",
            options: [
              "glove/dish (ovenproof) & room/booth (soundproof)",
              "speech/principles & delay/mistake",
              "income & criminal"
            ],
            correctOption: "glove/dish (ovenproof) & room/booth (soundproof)",
            explanationVi:
              "ovenproof glove/dish (chịu nhiệt lò nướng); soundproof room/booth (phòng/buồng cách âm)."
          },
          {
            id: "3-2-8",
            originalSentence: "8. stress-related ________",
            options: [
              "illness, problems",
              "foods, drinks",
              "knives and forks, income"
            ],
            correctOption: "illness, problems",
            explanationVi:
              "stress-related illness / problems (bệnh tật và rắc rối phát sinh từ căng thẳng)."
          }
        ]
      },
      {
        id: "ex-3-4",
        kind: "sentence_upgrade",
        title: "Bài tập 3.4 · Cô đọng Câu dài bằng Hậu tố trong ngoặc",
        instruction:
          "Biến đổi các câu miêu tả dài dòng thành câu ngắn gọn, sắc bén chuẩn Band 8.0+ (Giữ nguyên 6 câu gốc trong sách).",
        sourceNote: "Tuyển chọn nguyên bản · Unit 3 (Ex 3.4)",
        questions: [
          {
            id: "3-4-1",
            originalSentence:
              "Poisonous mushrooms can be easily identified. (-able)",
            options: [
              "Poisonous mushrooms are easily identifiable.",
              "Poisonous mushrooms are easily identify-free.",
              "Poisonous mushrooms are easily identify-proof."
            ],
            correctOption: "Poisonous mushrooms are easily identifiable.",
            explanationVi:
              "can be easily identified → are easily identifiable (chú ý bỏ -y đổi thành -iable)."
          },
          {
            id: "3-4-2",
            originalSentence:
              "He thinks so much about his career that he has no time for his family. (-minded)",
            options: [
              "He is so career-minded that he has no time for his family.",
              "He is so career-conscious that he has no time for his family.",
              "He is so career-ridden that he has no time for his family."
            ],
            correctOption:
              "He is so career-minded that he has no time for his family.",
            explanationVi:
              "thinks so much about his career → career-minded (đặt sự nghiệp lên hàng đầu)."
          },
          {
            id: "3-4-3",
            originalSentence:
              "The new phone boxes are supposed to be indestructible by vandals. (-proof)",
            options: [
              "The new phone boxes are supposed to be vandal-proof.",
              "The new phone boxes are supposed to be vandal-free.",
              "The new phone boxes are supposed to be vandal-worthy."
            ],
            correctOption:
              "The new phone boxes are supposed to be vandal-proof.",
            explanationVi:
              "indestructible by vandals → vandal-proof (chống lại hành vi phá hoại)."
          },
          {
            id: "3-4-4",
            originalSentence:
              "During the Civil War, the country was totally overcome by terror. (-ridden)",
            options: [
              "During the Civil War, the country was terror-ridden.",
              "During the Civil War, the country was terror-rich.",
              "During the Civil War, the country was terror-led."
            ],
            correctOption:
              "During the Civil War, the country was terror-ridden.",
            explanationVi:
              "totally overcome by terror → terror-ridden (bao trùm bởi nỗi kinh hoàng)."
          },
          {
            id: "3-4-5",
            originalSentence:
              "The soil on that farm contains a lot of nutrients. (-rich)",
            options: [
              "The soil on that farm is nutrient-rich.",
              "The soil on that farm is nutrient-worthy.",
              "The soil on that farm is nutrient-proof."
            ],
            correctOption: "The soil on that farm is nutrient-rich.",
            explanationVi:
              "contains a lot of nutrients → nutrient-rich (giàu dưỡng chất)."
          },
          {
            id: "3-4-6",
            originalSentence:
              "The bank decided that he did not have enough income to allow him credit. (-worthy)",
            options: [
              "The bank decided that he was not creditworthy.",
              "The bank decided that he was not credit-free.",
              "The bank decided that he was not credit-minded."
            ],
            correctOption: "The bank decided that he was not creditworthy.",
            explanationVi:
              "not have enough income to allow him credit → not creditworthy (viết liền không gạch nối)."
          }
        ]
      },
      {
        id: "ex-3-5",
        kind: "gap_fill",
        title: "Bài tập 3.5 · Thử thách Kiến tạo Từ ghép (Word-Coining)",
        instruction:
          "Ghép hậu tố phù hợp từ Phần A để tạo từ mới khớp chính xác với định nghĩa (Giữ nguyên từ sách gốc).",
        sourceNote: "Tuyển chọn nguyên bản · Unit 3 (Ex 3.5)",
        wordBank: [
          "meat-free",
          "class-related",
          "vitamin-rich",
          "dry-cleanable",
          "clothes-conscious",
          "government-led"
        ],
        questions: [
          {
            id: "3-5-1",
            promptBefore: "Food for vegetarians must be",
            promptAfter: ".",
            answer: "meat-free",
            explanationVi: "Không chứa thịt → meat-free."
          },
          {
            id: "3-5-2",
            promptBefore: "Something connected with social class is",
            promptAfter: ".",
            answer: "class-related",
            explanationVi: "Liên quan đến giai cấp xã hội → class-related."
          },
          {
            id: "3-5-3",
            promptBefore: "Foods containing a lot of vitamins are",
            promptAfter: ".",
            answer: "vitamin-rich",
            explanationVi: "Giàu vitamin → vitamin-rich."
          },
          {
            id: "3-5-4",
            promptBefore: "A garment that can be dry-cleaned is",
            promptAfter: ".",
            answer: "dry-cleanable",
            explanationVi: "Có thể giặt khô → dry-cleanable."
          },
          {
            id: "3-5-5",
            promptBefore: "Someone very aware of people's clothes is",
            promptAfter: ".",
            answer: "clothes-conscious",
            explanationVi: "Rất để ý đến trang phục → clothes-conscious."
          },
          {
            id: "3-5-6",
            promptBefore: "A campaign initiated by the government is",
            promptAfter: ".",
            answer: "government-led",
            explanationVi: "Do chính phủ dẫn dắt/khởi xướng → government-led."
          }
        ]
      },
      {
        id: "ex-3-6",
        kind: "classifier",
        title: "Bài tập 3.6 · Nhận diện Bẫy Từ loại (-ly & -en)",
        instruction:
          "Phân loại chính xác từ loại của các từ có hình thái dễ gây nhầm lẫn (Giữ nguyên 8 từ gốc từ sách).",
        sourceNote: "Tuyển chọn nguyên bản · Unit 3 (Ex 3.6)",
        categories: [
          {
            key: "verb",
            label: "Verb (Động từ)",
            description: "Chỉ hành động / quá trình biến đổi"
          },
          {
            key: "adjective",
            label: "Adjective (Tính từ)",
            description: "Bổ nghĩa cho danh từ"
          },
          {
            key: "adverb",
            label: "Adverb (Trạng từ)",
            description: "Bổ nghĩa cho động từ / tính từ"
          },
          {
            key: "adverb_and_adjective",
            label: "Adverb & Adjective",
            description: "Kiêm cả hai chức năng tùy ngữ cảnh"
          }
        ],
        questions: [
          {
            id: "3-6-1",
            prompt: "1. dampen (vd: dampen enthusiasm)",
            highlightWord: "dampen",
            correctCategory: "verb",
            explanationVi:
              "dampen là động từ (làm ẩm / làm nhụt chí), tạo bởi tính từ damp + -en."
          },
          {
            id: "3-6-2",
            prompt: "2. friendly (vd: a friendly gesture)",
            highlightWord: "friendly",
            correctCategory: "adjective",
            explanationVi:
              "friendly là tính từ (thân thiện), cấu tạo từ danh từ friend + -ly."
          },
          {
            id: "3-6-3",
            prompt: "3. dearly (vd: pay dearly for a mistake)",
            highlightWord: "dearly",
            correctCategory: "adverb",
            explanationVi:
              "dearly là trạng từ (trả giá đắt / yêu thương sâu sắc)."
          },
          {
            id: "3-6-4",
            prompt: "4. silken (vd: silken fabric)",
            highlightWord: "silken",
            correctCategory: "adjective",
            explanationVi:
              "silken là tính từ (mềm mượt như lụa), tạo bởi danh từ silk + -en."
          },
          {
            id: "3-6-5",
            prompt: "5. roughen (vd: roughen the surface)",
            highlightWord: "roughen",
            correctCategory: "verb",
            explanationVi:
              "roughen là động từ (làm nhám, làm thô ráp bề mặt)."
          },
          {
            id: "3-6-6",
            prompt: "6. masterly (vd: a masterly essay)",
            highlightWord: "masterly",
            correctCategory: "adjective",
            explanationVi:
              "masterly là tính từ (bậc thầy, điêu luyện) — danh từ master + -ly."
          },
          {
            id: "3-6-7",
            prompt: "7. kindly (vd: a kindly smile / spoke kindly)",
            highlightWord: "kindly",
            correctCategory: "adverb_and_adjective",
            explanationVi:
              "kindly vừa làm tính từ (tử tế, hiền hậu) vừa làm trạng từ (một cách ân cần)."
          },
          {
            id: "3-6-8",
            prompt: "8. darken (vd: shadows darken the room)",
            highlightWord: "darken",
            correctCategory: "verb",
            explanationVi:
              "darken là động từ (làm tối đi / tối sầm lại)."
          }
        ]
      }
    ]
  },
  ...VOCAB_IN_USE_UNITS_4_TO_6,
  ...VOCAB_IN_USE_UNITS_7_TO_9,
  ...VOCAB_IN_USE_UNITS_10_TO_12
];

export function getVocabInUseUnit(unitId: number): VocabInUseUnit {
  return (
    VOCAB_IN_USE_UNITS.find((u) => u.unitId === unitId) || VOCAB_IN_USE_UNITS[0]
  );
}
