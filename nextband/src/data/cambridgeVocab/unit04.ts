import { CambridgeUnitData } from "./types";

export const unit04Data: CambridgeUnitData = {
  meta: {
    unit: 4,
    title: "LIFESTYLES & WORK-LIFE BALANCE",
    subTitle: "Nhịp sống hiện đại, Cân bằng Công việc & Giải trí",
    book: "Cambridge Vocabulary for IELTS - Unit 4 (Lifestyles)",
    cefr: "B2 - C1 (IELTS 6.5 - 8.5)",
    totalStages: 3,
    speedGoalWpm: 45,
    paperSpeedMultiplier: "7.0x"
  },
  stage1_magnets: [
    {
      id: "s1_u4_m1",
      sentenceBefore: "Residents in major global financial capitals struggle with the relentlessly",
      sentenceAfter: "pace of life, often working over sixty hours a week without adequate rest.",
      target: "hectic",
      options: [
        {
          word: "crowded",
          pos: "adj.",
          hint: "Đông đúc người và phương tiện về mặt không gian vật lý (crowded streets).",
          explanation: "'crowded' nói về mật độ người đông trong không gian, không kết hợp với 'pace of life' (nhịp sống)."
        },
        {
          word: "hectic",
          pos: "adj.",
          hint: "Bận rộn cuồng cuồng, hối hả, dồn dập nhiều việc cần giải quyết.",
          explanation: "Chính xác! 'a hectic pace of life' (nhịp sống bận rộn hối hả) là cụm collocation Band 8.0 kinh điển khi nói về đô thị hóa."
        },
        {
          word: "dense",
          pos: "adj.",
          hint: "Dày đặc, mật độ cao (dense fog, dense population).",
          explanation: "'dense' dùng cho sương mù hoặc mật độ dân số, không dùng để miêu tả nhịp độ sinh hoạt thời gian."
        }
      ],
      ieltsInsight: {
        collocation: "a hectic pace of life / hectic schedule",
        bandScore: "Band 8.0",
        synonyms: ["fast-paced existence", "frenetic tempo of life"],
        academicTip: "Dùng 'escape the hectic pace of life' thay vì cách viết đơn sơ 'get away from busy city life'."
      }
    },
    {
      id: "s1_u4_m2",
      sentenceBefore: "Human resources directors emphasize that maintaining a healthy",
      sentenceAfter: "balance is essential to prevent psychological burnout among software engineers.",
      target: "work-life",
      options: [
        {
          word: "job-home",
          pos: "compound adj.",
          hint: "Cụm tự chế ghép nghĩa đen công việc và nhà ở, không tồn tại trong từ điển chuẩn.",
          explanation: "Tiếng Anh chuẩn không dùng 'job-home balance' mà bắt buộc phải dùng thuật ngữ xã hội học 'work-life balance'."
        },
        {
          word: "work-life",
          pos: "compound adj.",
          hint: "Cân bằng giữa công việc sự nghiệp và đời sống cá nhân, gia đình.",
          explanation: "Chính xác! 'work-life balance' (cân bằng công việc - cuộc sống) là thuật ngữ chuẩn mực toàn cầu trong môi trường làm việc."
        },
        {
          word: "labor-leisure",
          pos: "compound adj.",
          hint: "Cặp thuật ngữ lý thuyết kinh tế học (labor-leisure trade-off), không phải thuật ngữ đời sống.",
          explanation: "'labor-leisure' chỉ mô hình lý thuyết kinh tế học vĩ mô, không dùng trong ngữ cảnh đời sống thường nhật."
        }
      ],
      ieltsInsight: {
        collocation: "achieve a healthy work-life balance / balance career with domestic life",
        bandScore: "Band 7.5+",
        synonyms: ["occupational-personal equilibrium", "lifestyle harmony"],
        academicTip: "Trong bài viết IELTS về giờ làm việc, cụm 'compromise their work-life balance' là cách diễn đạt cực kỳ đắt giá."
      }
    },
    {
      id: "s1_u4_m3",
      sentenceBefore: "Municipal governments are expanding public parks to provide citizens with accessible",
      sentenceAfter: "activities like cycling, birdwatching, and outdoor yoga.",
      target: "recreational",
      options: [
        {
          word: "enjoyable",
          pos: "adj.",
          hint: "Thú vị, mang lại niềm vui chung chung (an enjoyable evening).",
          explanation: "'enjoyable' là tính từ miêu tả cảm xúc thông thường, không phải thuật ngữ phân loại hoạt động thể thao/vui chơi công cộng."
        },
        {
          word: "recreational",
          pos: "adj.",
          hint: "Thuộc về giải trí, tiêu khiển, phục hồi năng lượng thể chất và tinh thần.",
          explanation: "Chính xác! 'recreational activities / recreational facilities' (hoạt động/tiện ích giải trí công cộng) là thuật ngữ quy hoạch đô thị chuẩn."
        },
        {
          word: "re-creating",
          pos: "participle",
          hint: "Hành động tái tạo lại, dựng lại một bối cảnh lịch sử.",
          explanation: "'re-creating' mang nghĩa tái lập/dựng lại, hoàn toàn sai nghĩa của việc giải trí phục hồi sức khỏe."
        }
      ],
      ieltsInsight: {
        collocation: "recreational activities / recreational facilities / open spaces",
        bandScore: "Band 7.5+",
        synonyms: ["leisure pursuits", "pastimes", "diversions"],
        academicTip: "Thay vì 'fun activities', luôn viết 'engaging in wholesome recreational pursuits' trong IELTS Writing."
      }
    },
    {
      id: "s1_u4_m4",
      sentenceBefore: "Psychiatrists warn that acute work-related pressure can trigger clinical",
      sentenceAfter: "depriving professionals of their motivation and physical energy.",
      target: "exhaustion",
      options: [
        {
          word: "tiredness",
          pos: "n.",
          hint: "Cảm giác mệt mỏi thông thường sau một ngày làm việc, chỉ cần ngủ một đêm là khỏi.",
          explanation: "'tiredness' là sự mệt mỏi nhẹ thông thường, không thể hiện tình trạng kiệt quệ suy sụp thần kinh bệnh lý."
        },
        {
          word: "exhaustion",
          pos: "n.",
          hint: "Tình trạng kiệt sức hoàn toàn về thể chất lẫn tinh thần, suy sụp năng lượng.",
          explanation: "Chính xác! 'nervous/physical exhaustion' (sự kiệt quệ thể lực và tinh thần) hoặc 'burnout' mô tả chính xác hậu quả của áp lực quá tải."
        },
        {
          word: "faintness",
          pos: "n.",
          hint: "Cảm giác chóng mặt sắp ngất xỉu trong thoáng chốc.",
          explanation: "'faintness' là cảm giác hoa mắt ngất xỉu tạm thời do đói hoặc sốc nhiệt, không phản ánh tình trạng quá tải công việc kéo dài."
        }
      ],
      ieltsInsight: {
        collocation: "nervous exhaustion / complete exhaustion / physical collapse",
        bandScore: "Band 7.5+",
        synonyms: ["severe burnout", "depletion of energy", "fatigue syndrome"],
        academicTip: "Sử dụng 'succumb to physical and emotional exhaustion' để nhấn mạnh sự nguy hiểm của văn hóa làm việc quá giờ (overwork)."
      }
    },
    {
      id: "s1_u4_m5",
      sentenceBefore: "Living in a close-knit rural hamlet offers a sense of pastoral",
      sentenceAfter: "that is completely absent in loud, overcrowded metropolitan centers.",
      target: "tranquillity",
      options: [
        {
          word: "silence",
          pos: "n.",
          hint: "Sự im lặng, vắng bóng âm thanh đơn thuần (silence in the library).",
          explanation: "'silence' chỉ sự không có tiếng động, không diễn tả được cảm giác bình yên trong tâm hồn và không gian đồng quê thơ mộng."
        },
        {
          word: "tranquillity",
          pos: "n.",
          hint: "Sự thanh bình, tĩnh lặng an nhiên, không bị quấy rầy bởi sự xô bồ.",
          explanation: "Chính xác! 'peace and tranquillity' (sự thanh bình tĩnh tại) là cụm collocation cao cấp Band 8.0 miêu tả lối sống nông thôn."
        },
        {
          word: "vacancy",
          pos: "n.",
          hint: "Chỗ trống phòng khách sạn hoặc vị trí tuyển dụng việc làm còn trống.",
          explanation: "'vacancy' là vị trí trống hoặc phòng trống, hoàn toàn sai lệch ngữ cảnh."
        }
      ],
      ieltsInsight: {
        collocation: "peace and tranquillity / idyllic tranquillity",
        bandScore: "Band 8.0",
        synonyms: ["serenity", "placid environment", "unperturbed calm"],
        academicTip: "Khi so sánh nông thôn và thành thị (City vs Countryside), cụm 'relish pastoral tranquillity' là điểm nhấn từ vựng ấn tượng."
      }
    },
    {
      id: "s1_u4_m6",
      sentenceBefore: "Spending thirty minutes immersed in gardening or listening to classical music helps to",
      sentenceAfter: "accumulated emotional tension after an arduous corporate negotiation.",
      target: "relieve",
      options: [
        {
          word: "dismiss",
          pos: "v.",
          hint: "Sa thải nhân viên hoặc bác bỏ một ý kiến (dismiss an idea/worker).",
          explanation: "'dismiss' mang nghĩa sa thải hoặc gạt bỏ ý kiến, không đi với 'tension' để chỉ việc xoa dịu giải tỏa căng thẳng cơ thể."
        },
        {
          word: "relieve",
          pos: "v.",
          hint: "Giải tỏa, xua tan áp lực, làm nhẹ bớt gánh nặng thần kinh.",
          explanation: "Chính xác! 'relieve tension / relieve stress' là cụm động từ tự nhiên và học thuật nhất để chỉ việc rũ bỏ căng thẳng."
        },
        {
          word: "subtract",
          pos: "v.",
          hint: "Làm phép tính trừ trong toán học (subtract 5 from 10).",
          explanation: "'subtract' là thuật ngữ toán học trừ số lượng, không thể dùng trừu tượng cho cảm xúc."
        }
      ],
      ieltsInsight: {
        collocation: "relieve tension / relieve pressure / stress relief",
        bandScore: "Band 7.5+",
        synonyms: ["dissipate stress", "unwind", "ease psychological strain"],
        academicTip: "'serve as an effective outlet to relieve tension' là cấu trúc tuyệt vời để mô tả lợi ích của các sở thích cá nhân."
      }
    },
    {
      id: "s1_u4_m7",
      sentenceBefore: "In pursuit of higher living standards, many urbanites become workaholics, falling prey to an excessive",
      sentenceAfter: "mindset where material wealth eclipses emotional happiness.",
      target: "materialistic",
      options: [
        {
          word: "commercial",
          pos: "adj.",
          hint: "Thuộc về thương mại kinh doanh (commercial bank, commercial break).",
          explanation: "'commercial' nói về hoạt động buôn bán buôn thương mại, không nói về tư tưởng tâm lý chuộng vật chất của con người."
        },
        {
          word: "materialistic",
          pos: "adj.",
          hint: "Thực dụng, quá coi trọng của cải vật chất hơn các giá trị tinh thần.",
          explanation: "Chính xác! 'a materialistic mindset/society' (tư tưởng/xã hội tôn sùng vật chất) là cụm từ phê phán sâu sắc lối sống hiện đại trong IELTS."
        },
        {
          word: "tangible",
          pos: "adj.",
          hint: "Hữu hình, có thể sờ chạm thấy được (tangible benefits, tangible assets).",
          explanation: "'tangible' nói về tính chất có thể cầm nắm đo đếm được, không phải từ miêu tả tính cách ham mê của cải."
        }
      ],
      ieltsInsight: {
        collocation: "materialistic society / materialistic pursuits",
        bandScore: "Band 7.5+",
        synonyms: ["consumerist culture", "mercenary outlook"],
        academicTip: "Dùng 'shift away from materialistic pursuits towards spiritual enrichment' khi đề xuất giải pháp cho lối sống hiện đại."
      }
    },
    {
      id: "s1_u4_m8",
      sentenceBefore: "To prevent daily friction, individuals must establish clear boundaries and learn to",
      sentenceAfter: "between their professional commitments and their cherished leisure hours.",
      target: "distinguish",
      options: [
        {
          word: "separate",
          pos: "v.",
          hint: "Chia tách vật lý hai đồ vật ra xa nhau (separate the eggs).",
          explanation: "Mặc dù 'separate A from B' đúng ngữ pháp, nhưng trong cấu trúc 'distinguish between A and B' thì 'distinguish' (phân định ranh giới nhận thức) chuẩn xác hơn."
        },
        {
          word: "distinguish",
          pos: "v.",
          hint: "Phân biệt rõ ràng, nhận định ranh giới rạch ròi giữa hai khái niệm.",
          explanation: "Chính xác! 'distinguish between professional commitments and leisure' là cấu trúc học thuật chỉ sự phân định ranh giới nhận thức rạch ròi."
        },
        {
          word: "isolate",
          pos: "v.",
          hint: "Cách ly một cá nhân hoặc khu vực để tránh lây nhiễm hoặc cô lập hoàn toàn.",
          explanation: "'isolate' mang hàm ý tiêu cực về sự cô lập, phong tỏa, không phù hợp cho việc phân bổ thời gian lành mạnh."
        }
      ],
      ieltsInsight: {
        collocation: "distinguish between work and leisure / draw a distinction",
        bandScore: "Band 7.5+",
        synonyms: ["differentiate", "demarcate the line between"],
        academicTip: "Cụm 'draw a distinct line between office obligations and private life' chứng minh khả năng sử dụng ngôn ngữ linh hoạt Band 8.0."
      }
    }
  ],
  stage2_timeline: [
    {
      milestoneId: "u4_t1",
      age: "07:00 (Sáng Sớm)",
      title: "Chuyến Tàu Sáng & Áp Lực Giờ Cao Điểm",
      icon: "train",
      stageTag: "Morning Commute",
      story: "Hàng triệu cư dân đô thị phải đối mặt với chuyến đi làm [BLANK] kéo dài hàng giờ trên những chuyến tàu điện chật kín người.",
      storyEn: "Suburban dwellers endure a grueling daily [BLANK] on congested transit networks before ever reaching their office desks.",
      target: "commute",
      targetVi: "chuyến đi làm/quãng đường đi lại",
      pos: "noun",
      candidates: ["commute", "vacation", "stagnation", "pilgrimage"],
      explanation: "'commute' (quãng đường/chuyến đi lại giữa nhà và nơi làm việc) là một trong những nguồn gây căng thẳng lớn nhất của đời sống đô thị."
    },
    {
      milestoneId: "u4_t2",
      age: "09:30 (Môi Trường Làm Việc)",
      title: "Văn Hóa Áp Lực & Thói Quen Nghiện Việc",
      icon: "laptop",
      stageTag: "Corporate Grind",
      story: "Áp lực đáp ứng chỉ tiêu doanh số khiến nhiều nhân viên vô tình trở thành những người [BLANK] làm việc quên ăn quên ngủ.",
      storyEn: "Unreasonable project deadlines push ambitious professionals to turn into compulsive [BLANK], neglecting family obligations.",
      target: "workaholics",
      targetVi: "những người nghiện việc",
      pos: "noun",
      candidates: ["workaholics", "freelancers", "volunteers", "understudies"],
      explanation: "'workaholics' (những người tham công tiếc việc / nghiện việc) thường hy sinh sức khỏe và các mối quan hệ xã hội cho sự nghiệp."
    },
    {
      milestoneId: "u4_t3",
      age: "12:30 (Giờ Ăn Trưa Vội)",
      title: "Bữa Trưa Qua Loa Bên Bàn Phím",
      icon: "coffee",
      stageTag: "Desk Dining",
      story: "Nhịp sống hối hả khiến nhiều nhân viên văn phòng có thói quen ăn trưa [BLANK] ngay tại bàn làm việc thay vì ra ngoài thư giãn.",
      storyEn: "Working under severe time constraints leads employees to swallow a [BLANK] lunch while still replying to incoming emails.",
      target: "hasty",
      targetVi: "vội vàng/hấp tấp",
      pos: "adjective",
      candidates: ["hasty", "luxurious", "deliberate", "prolonged"],
      explanation: "'a hasty lunch' (bữa trưa vội vã qua loa) là nét đặc trưng của lối sống bận rộn thiếu lành mạnh."
    },
    {
      milestoneId: "u4_t4",
      age: "15:00 (Căng Thẳng Tột Độ)",
      title: "Khủng Hoảng Kiệt Sức & Quá Tải Tinh Thần",
      icon: "flame",
      stageTag: "Burnout Crisis",
      story: "Làm việc quá nhiều giờ liên tục mà không có quãng nghỉ hồi phục tất yếu sẽ đẩy con người tới bờ vực của sự [BLANK].",
      storyEn: "Chronic occupational strain without psychological reprieve drives dedicated staff toward complete physical [BLANK].",
      target: "exhaustion",
      targetVi: "sự kiệt sức/kiệt quệ",
      pos: "noun",
      candidates: ["exhaustion", "exhilaration", "exaltation", "liberation"],
      explanation: "'exhaustion' (sự kiệt quệ hoàn toàn thể chất và tinh thần) đòi hỏi thời gian nghỉ ngơi trị liệu chuyên sâu mới có thể hồi phục."
    },
    {
      milestoneId: "u4_t5",
      age: "18:00 (Rời Công Sở)",
      title: "Ngắt Kết Nối & Tách Biệt Công Việc",
      icon: "power",
      stageTag: "Digital Boundary",
      story: "Học cách tắt thông báo công việc sau giờ hành chính giúp người lao động thiết lập [BLANK] lành mạnh giữa nghề nghiệp và đời sống riêng.",
      storyEn: "Powering down company laptops at sunset enables individuals to establish clear personal [BLANK] against overtime encroachment.",
      target: "boundaries",
      targetVi: "ranh giới/giới hạn",
      pos: "noun",
      candidates: ["boundaries", "anxieties", "penalties", "illusions"],
      explanation: "'set personal boundaries' (đặt ra ranh giới cá nhân) là kỹ năng sống sống còn để duy trì sức khỏe tinh thần trong thời đại số."
    },
    {
      milestoneId: "u4_t6",
      age: "19:30 (Thời Gian Cho Sở Thích)",
      title: "Theo Đuổi Đam Mê Tiêu Khiển",
      icon: "music",
      stageTag: "Leisure Pursuit",
      story: "Dành buổi tối cho các hoạt động giải trí lành mạnh như chơi đàn hay hội họa đóng vai trò như một [BLANK] thư giãn tuyệt vời.",
      storyEn: "Engaging in creative hobbies after dark provides a soothing recreational [BLANK] that calms an overstimulated brain.",
      target: "pastime",
      targetVi: "thú tiêu khiển/trò tiêu khiển",
      pos: "noun",
      candidates: ["pastime", "nuisance", "obligation", "handicap"],
      explanation: "'pastime' (thú tiêu khiển/hoạt động giải trí lúc rảnh rỗi) giúp con người tìm lại sự cân bằng sau áp lực công việc."
    },
    {
      milestoneId: "u4_t7",
      age: "21:30 (Không Gian Yên Bình)",
      title: "Tìm Lại Sự Tĩnh Tại Trong Tâm Hồn",
      icon: "wind",
      stageTag: "Inner Serenity",
      story: "Rời xa tiếng ồn ào còi xe phố thị, tận hưởng không gian tĩnh lặng mang lại cảm giác [BLANK] vô giá cho tâm hồn.",
      storyEn: "Sipping herbal tea in a quiet room restores an enviable aura of domestic [BLANK] before heading to bed.",
      target: "tranquillity",
      targetVi: "sự thanh bình/tĩnh lặng",
      pos: "noun",
      candidates: ["tranquillity", "commotion", "turbulence", "hostility"],
      explanation: "'tranquillity' (sự tĩnh tại, an yên, thanh bình) là liều thuốc chữa lành những vết thương tâm lý do lối sống hiện đại gây ra."
    },
    {
      milestoneId: "u4_t8",
      age: "Cuối Tuần (Dã Ngoại)",
      title: "Hòa Mình Với Thiên Nhiên & Tái Tạo Sinh Lực",
      icon: "compass",
      stageTag: "Weekend Rejuvenation",
      story: "Những chuyến dã ngoại cuối tuần giúp con người thoát khỏi lối sống thực dụng và tìm lại sự cân bằng [BLANK] trọn vẹn trong cuộc đời.",
      storyEn: "Escaping to the countryside on weekends allows urbanites to attain lasting lifestyle [BLANK] and genuine contentment.",
      target: "equilibrium",
      targetVi: "sự cân bằng/trạng thái cân bằng",
      pos: "noun",
      candidates: ["equilibrium", "imbalance", "obsession", "alienation"],
      explanation: "'lifestyle equilibrium' (sự cân bằng, trạng thái hài hòa của cuộc sống) là đích đến cao nhất của việc quản lý phong cách sống."
    }
  ],
  stage3_essay: {
    title: "Modern Lifestyles: Economic Prosperity vs Personal Wellbeing",
    prompt: "In many contemporary societies, people are working longer hours and experiencing greater stress than ever before in order to achieve higher living standards. Do the benefits of this modern lifestyle outweigh the drawbacks?",
    paragraphs: [
      {
        pIndex: 1,
        type: "Introduction",
        text: "In the relentless pursuit of financial affluence, contemporary citizens are dedicating an unprecedented portion of their lives to their vocations. Although this career orientation generates substantial material wealth and fuels national economic prosperity, I firmly argue that the severe drawbacks, particularly the erosion of [BLANK_1] balance and chronic physical [BLANK_2], significantly overshadow these economic benefits."
      },
      {
        pIndex: 2,
        type: "Body 1 (Economic Benefits & Material Living Standards)",
        text: "On the one hand, proponents of competitive capitalism contend that long working hours are indispensable for personal advancement and macroeconomic growth. In prestigious corporate environments, ambitious professionals who endure a relentlessly [BLANK_3] schedule often secure lucrative salaries and rapid institutional promotions. This elevated earning power enables families to afford superior healthcare, premium education, and comfortable modern housing. Furthermore, when an entire workforce is highly industrious, it creates innovative technological goods that enhance general consumer convenience across society."
      },
      {
        pIndex: 3,
        type: "Body 2 (Psychological Strain, Erosion of Relationships & Burnout)",
        text: "On the other hand, the human costs associated with this hyper-competitive lifestyle are profoundly severe. When individuals become compulsive [BLANK_4] who constantly obsess over corporate metrics, they routinely sacrifice vital [BLANK_5] pursuits and meaningful domestic bonding. This perpetual neglect leaves spouses alienated and children emotionally estranged. Moreover, living in high-density urban areas without access to green spaces of natural [BLANK_6] subjects the nervous system to constant sensory overload. Deprived of regular opportunities to [BLANK_7] tension, professionals frequently succumb to clinical anxiety and debilitating cardiac disorders."
      },
      {
        pIndex: 4,
        type: "Conclusion & Final Stance",
        text: "In conclusion, while working extended hours can certainly unlock unprecedented economic rewards, it fosters an overly [BLANK_8] existence that dismantles human health and familial stability. Societies must actively [BLANK_9] between authentic progress and hollow consumerism, establishing statutory policies that protect leisure time and foster true lifestyle [BLANK_10] rather than prioritizing pure productivity."
      }
    ],
    blanks: [
      {
        id: "u4_b1",
        num: 1,
        rootWord: "work-life",
        category: "Lifestyle Equilibrium",
        targetForm: "work-life",
        grammarClue: "Cần tính từ ghép bổ nghĩa cho 'balance' để chỉ sự cân bằng giữa công việc và đời sống.",
        variants: [
          { form: "work-life", pos: "compound adj.", label: "work-life (Cân bằng giữa công việc và đời sống)", isCorrect: true },
          { form: "working-life", pos: "compound adj.", label: "working-life (Thuộc về đời sống làm việc)", isCorrect: false },
          { form: "work-living", pos: "compound adj.", label: "work-living (Cụm sai ngữ pháp chuẩn)", isCorrect: false }
        ]
      },
      {
        id: "u4_b2",
        num: 2,
        rootWord: "exhaust",
        category: "Physical Depletion",
        targetForm: "exhaustion",
        grammarClue: "Sau tính từ 'physical' cần danh từ chỉ tình trạng kiệt quệ sức lực hoàn toàn.",
        variants: [
          { form: "exhaustion", pos: "n.", label: "exhaustion (Danh từ sự kiệt quệ hoàn toàn)", isCorrect: true },
          { form: "exhaustive", pos: "adj.", label: "exhaustive (Tính từ toàn diện, thấu đáo)", isCorrect: false },
          { form: "exhausting", pos: "participle", label: "exhausting (Gây mệt mỏi)", isCorrect: false }
        ]
      },
      {
        id: "u4_b3",
        num: 3,
        rootWord: "hectic",
        category: "Temporal Pace",
        targetForm: "hectic",
        grammarClue: "Sau phó từ 'relentlessly' và trước danh từ 'schedule' cần tính từ chỉ sự bận rộn hối hả.",
        variants: [
          { form: "hectic", pos: "adj.", label: "hectic (Tính từ bận rộn cuồng nhiệt, hối hả)", isCorrect: true },
          { form: "hectically", pos: "adv.", label: "hectically (Phó từ một cách hối hả)", isCorrect: false },
          { form: "hecticness", pos: "n.", label: "hecticness (Danh từ sự hối hả)", isCorrect: false }
        ]
      },
      {
        id: "u4_b4",
        num: 4,
        rootWord: "workaholic",
        category: "Behavioral Tendency",
        targetForm: "workaholics",
        grammarClue: "Sau cụm 'compulsive' cần danh từ số nhiều chỉ những người nghiện làm việc.",
        variants: [
          { form: "workaholics", pos: "pl. n.", label: "workaholics (Danh từ số nhiều người nghiện việc)", isCorrect: true },
          { form: "workaholic", pos: "sing. n.", label: "workaholic (Người nghiện việc số ít)", isCorrect: false },
          { form: "workaholism", pos: "uncount n.", label: "workaholism (Chứng nghiện công việc)", isCorrect: false }
        ]
      },
      {
        id: "u4_b5",
        num: 5,
        rootWord: "recreation",
        category: "Leisure Activities",
        targetForm: "recreational",
        grammarClue: "Cần tính từ đứng trước danh từ 'pursuits' để chỉ các hoạt động vui chơi giải trí.",
        variants: [
          { form: "recreational", pos: "adj.", label: "recreational (Tính từ thuộc về giải trí, tiêu khiển)", isCorrect: true },
          { form: "recreation", pos: "n.", label: "recreation (Danh từ sự giải trí)", isCorrect: false },
          { form: "recreationally", pos: "adv.", label: "recreationally (Phó từ về mặt giải trí)", isCorrect: false }
        ]
      },
      {
        id: "u4_b6",
        num: 6,
        rootWord: "tranquil",
        category: "Environmental Serenity",
        targetForm: "tranquillity",
        grammarClue: "Sau tính từ 'natural' cần một danh từ chỉ sự tĩnh lặng thanh bình của thiên nhiên.",
        variants: [
          { form: "tranquillity", pos: "n.", label: "tranquillity (Danh từ sự thanh bình, tĩnh tại)", isCorrect: true },
          { form: "tranquil", pos: "adj.", label: "tranquil (Tính từ thanh bình)", isCorrect: false },
          { form: "tranquilly", pos: "adv.", label: "tranquilly (Phó từ một cách thanh bình)", isCorrect: false }
        ]
      },
      {
        id: "u4_b7",
        num: 7,
        rootWord: "relieve",
        category: "Stress Dissipation",
        targetForm: "relieve",
        grammarClue: "Cấu trúc 'opportunities to + V(infinitive)' cần động từ nguyên mẫu chỉ việc giải tỏa căng thẳng.",
        variants: [
          { form: "relieve", pos: "base v.", label: "relieve (Động từ giải tỏa, xua tan căng thẳng)", isCorrect: true },
          { form: "relief", pos: "n.", label: "relief (Danh từ sự nhẹ nhõm, cứu trợ)", isCorrect: false },
          { form: "relieved", pos: "past part.", label: "relieved (Cảm thấy nhẹ nhõm)", isCorrect: false }
        ]
      },
      {
        id: "u4_b8",
        num: 8,
        rootWord: "material",
        category: "Philosophical Outlook",
        targetForm: "materialistic",
        grammarClue: "Sau mạo từ 'an overly' và trước danh từ 'existence' cần tính từ phê phán lối sống chuộng vật chất.",
        variants: [
          { form: "materialistic", pos: "adj.", label: "materialistic (Tính từ thực dụng, sùng bái của cải)", isCorrect: true },
          { form: "materially", pos: "adv.", label: "materially (Phó từ về mặt vật chất)", isCorrect: false },
          { form: "materialism", pos: "n.", label: "materialism (Chủ nghĩa thực dụng vật chất)", isCorrect: false }
        ]
      },
      {
        id: "u4_b9",
        num: 9,
        rootWord: "distinguish",
        category: "Cognitive Demarcation",
        targetForm: "distinguish",
        grammarClue: "Sau động từ tình thái 'must actively' cần động từ nguyên mẫu phân biệt rạch ròi giữa A và B.",
        variants: [
          { form: "distinguish", pos: "base v.", label: "distinguish (Động từ phân biệt rõ ràng)", isCorrect: true },
          { form: "distinction", pos: "n.", label: "distinction (Danh từ sự khác biệt/sự xuất chúng)", isCorrect: false },
          { form: "distinguishable", pos: "adj.", label: "distinguishable (Có thể phân biệt được)", isCorrect: false }
        ]
      },
      {
        id: "u4_b10",
        num: 10,
        rootWord: "equilibrium",
        category: "Harmonious State",
        targetForm: "equilibrium",
        grammarClue: "Cần danh từ đi sau tính từ 'lifestyle' để chỉ trạng thái cân bằng nội tại của cuộc sống.",
        variants: [
          { form: "equilibrium", pos: "n.", label: "equilibrium (Danh từ trạng thái cân bằng hài hòa)", isCorrect: true },
          { form: "equilibrate", pos: "v.", label: "equilibrate (Động từ làm cho cân bằng)", isCorrect: false },
          { form: "equilibrated", pos: "adj.", label: "equilibrated (Được giữ cân bằng)", isCorrect: false }
        ]
      }
    ],
    wordArsenal: [
      { root: "work-life", pos: "adj.", vi: "Cân bằng công việc và đời sống", cat: "Lifestyle" },
      { root: "exhaust", pos: "v.", vi: "Làm kiệt sức, cạn kiệt năng lượng", cat: "Fatigue" },
      { root: "hectic", pos: "adj.", vi: "Bận rộn hối hả, cuồng nhiệt", cat: "Pace" },
      { root: "workaholic", pos: "n.", vi: "Người nghiện công việc", cat: "Work" },
      { root: "recreation", pos: "n.", vi: "Giải trí, tiêu khiển phục hồi", cat: "Leisure" },
      { root: "tranquil", pos: "adj.", vi: "Thanh bình, tĩnh lặng an nhiên", cat: "Environment" },
      { root: "relieve", pos: "v.", vi: "Giải tỏa, xua tan căng thẳng", cat: "Wellbeing" },
      { root: "material", pos: "n./adj.", vi: "Vật chất, của cải thực dụng", cat: "Values" },
      { root: "distinguish", pos: "v.", vi: "Phân biệt rạch ròi, tách biệt", cat: "Mindset" },
      { root: "equilibrium", pos: "n.", vi: "Trạng thái cân bằng hài hòa", cat: "Lifestyle" }
    ],
    xrayHighlights: {
      thesis: [
        "Although this career orientation generates substantial material wealth and fuels national economic prosperity, I firmly argue that the severe drawbacks, particularly the erosion of work-life balance and chronic physical exhaustion, significantly overshadow these economic benefits.",
        "In conclusion, while working extended hours can certainly unlock unprecedented economic rewards, it fosters an overly materialistic existence that dismantles human health and familial stability."
      ],
      cohesion: [
        "In the relentless pursuit of financial affluence",
        "On the one hand, proponents of competitive capitalism contend that",
        "In prestigious corporate environments",
        "Furthermore, when an entire workforce is highly industrious",
        "On the other hand, the human costs associated with",
        "Moreover, living in high-density urban areas",
        "In conclusion, while working extended hours can certainly"
      ],
      lexical: [
        "relentless pursuit of affluence",
        "work-life balance",
        "physical exhaustion",
        "hectic schedule",
        "compulsive workaholics",
        "recreational pursuits",
        "pastoral tranquillity",
        "relieve tension",
        "materialistic existence",
        "lifestyle equilibrium"
      ]
    }
  },
  lexicon_notes: {
    hectic: {
      word: "hectic",
      ipa: "/ˈhek.tɪk/",
      pos: "adjective",
      def_en: "Full of incessant activity, frantic rush, excitement, or confusion.",
      def_vi: "Bận rộn, hối hả, cuồng cuộn với nhiều sự kiện dồn dập trong thời gian ngắn.",
      collocations: "hectic schedule, hectic pace of life, hectic lifestyle",
      example: "Living in metropolitan centers inevitably immerses citizens in a hectic pace of daily existence.",
      ielts_tip: "Thay vì 'very busy schedule', luôn dùng 'a hectic daily routine' để nâng band Lexical Resource."
    },
    "work-life balance": {
      word: "work-life balance",
      ipa: "/ˌwɜːk.laɪf ˈbæl.əns/",
      pos: "noun phrase",
      def_en: "The amount of time you spend doing your job compared with the time you spend with family and doing things you enjoy.",
      def_vi: "Sự cân bằng hài hòa giữa thời gian cống hiến cho công việc và đời sống cá nhân.",
      collocations: "maintain a work-life balance, achieve work-life balance, poor work-life balance",
      example: "Companies that actively support a healthy work-life balance experience significantly lower staff turnover.",
      ielts_tip: "Khái niệm trung tâm trong các bài luận về lao động: 'compromise work-life balance'."
    },
    recreational: {
      word: "recreational",
      ipa: "/ˌrek.riˈeɪ.ʃən.əl/",
      pos: "adjective",
      def_en: "Connected with ways of enjoying yourself when you are not working, meant for relaxation and fun.",
      def_vi: "Thuộc về giải trí, vui chơi tiêu khiển nhằm phục hồi thể chất và tinh thần.",
      collocations: "recreational activities, recreational facilities, recreational areas",
      example: "Investing in municipal recreational facilities provides youth with constructive pastimes after school.",
      ielts_tip: "'recreational pursuits' là cách diễn đạt trang trọng Band 8.0 thay cho 'entertainment activities'."
    },
    exhaustion: {
      word: "exhaustion",
      ipa: "/ɪɡˈzɔːs.tʃən/",
      pos: "noun",
      def_en: "The state of being extremely tired physically or mentally, completely depleted of energy.",
      def_vi: "Tình trạng kiệt quệ hoàn toàn về năng lượng thể chất hoặc tinh thần.",
      collocations: "nervous exhaustion, sheer exhaustion, physical exhaustion",
      example: "Suffering from nervous exhaustion, the lead surgeon was forced to take a mandatory three-month sabbatical.",
      ielts_tip: "Dùng 'succumb to physical exhaustion' thay cho việc nói 'get too tired'."
    },
    tranquillity: {
      word: "tranquillity",
      ipa: "/træŋˈkwɪl.ə.ti/",
      pos: "noun",
      def_en: "A peaceful, calm, and quiet state of mind or environment, free from disturbance.",
      def_vi: "Sự thanh bình, tĩnh lặng an nhiên, không bị khuấy động bởi xô bồ.",
      collocations: "peace and tranquillity, idyllic tranquillity, scenic tranquillity",
      example: "Elderly retirees often migrate to coastal villages to savor the unhurried tranquillity of nature.",
      ielts_tip: "Cụm danh từ Band 8.5: 'the restorative tranquillity of rural landscapes'."
    },
    relieve: {
      word: "relieve",
      ipa: "/rɪˈliːv/",
      pos: "verb",
      def_en: "To make an unpleasant feeling or situation less severe or serious, or remove it entirely.",
      def_vi: "Làm thuyên giảm, giải tỏa, xua tan áp lực căng thẳng hoặc cơn đau.",
      collocations: "relieve tension, relieve stress, relieve congestion",
      example: "Practicing mindfulness meditation for fifteen minutes daily helps relieve accumulated occupational tension.",
      ielts_tip: "'relieve tension' tự nhiên và chuẩn văn phong học thuật hơn nhiều so với 'reduce stress'."
    },
    materialistic: {
      word: "materialistic",
      ipa: "/məˌtɪə.ri.əˈlɪs.tɪk/",
      pos: "adjective",
      def_en: "Believing that having money and possessions is the most important thing in life.",
      def_vi: "Thực dụng, quá coi trọng của cải vật chất hơn các giá trị đạo đức và tinh thần.",
      collocations: "materialistic values, materialistic society, materialistic mindset",
      example: "Aggressive advertising campaigns promote a materialistic mindset that equates net worth with self-worth.",
      ielts_tip: "Từ vựng C2 chỉ trích văn hóa tiêu dùng thái quá: 'foster a shallow, materialistic lifestyle'."
    },
    distinguish: {
      word: "distinguish",
      ipa: "/dɪˈstɪŋ.ɡwɪʃ/",
      pos: "verb",
      def_en: "To recognize the difference between two people, things, or concepts clearly.",
      def_vi: "Phân biệt rạch ròi, nhận định ranh giới rõ ràng giữa hai khía cạnh.",
      collocations: "distinguish between A and B, distinguish right from wrong, clearly distinguish",
      example: "Mature professionals learn to distinguish between urgent administrative demands and genuinely vital tasks.",
      ielts_tip: "Cấu trúc: 'distinguish between work commitments and private life'."
    },
    commute: {
      word: "commute",
      ipa: "/kəˈmjuːt/",
      pos: "noun / verb",
      def_en: "A regular journey of some distance to and from your place of work or study.",
      def_vi: "Chuyến đi lại đều đặn mỗi ngày giữa nơi ở và công sở/trường học.",
      collocations: "daily commute, grueling commute, morning commute",
      example: "A two-hour morning commute on congested highways elevates cortisol levels and induces chronic fatigue.",
      ielts_tip: "'daily commute' là thuật ngữ quen thuộc trong chủ đề Giao thông & Đô thị hóa."
    },
    workaholic: {
      word: "workaholic",
      ipa: "/ˌwɜː.kəˈhɒl.ɪk/",
      pos: "noun",
      def_en: "A person who works a lot of the time and finds it difficult not to work, often compulsively.",
      def_vi: "Người tham công tiếc việc, nghiện việc làm đến mức quên cả bản thân và gia đình.",
      collocations: "confessed workaholic, self-professed workaholic, compulsive workaholic",
      example: "Being a relentless workaholic may lead to career accolades but often results in broken marriages.",
      ielts_tip: "Từ vựng sinh động để miêu tả những người cuồng làm việc trong xã hội hiện đại."
    },
    pastime: {
      word: "pastime",
      ipa: "/ˈpɑːs.taɪm/",
      pos: "noun",
      def_en: "An activity that is done for enjoyment, especially when you are not working; a hobby.",
      def_vi: "Thú tiêu khiển, hoạt động giải trí yêu thích lúc rảnh rỗi.",
      collocations: "favorite pastime, popular pastime, outdoor pastime",
      example: "Woodworking served as his favorite evening pastime, allowing his mind to detach from financial spreadsheets.",
      ielts_tip: "Dùng 'pastime' để thay thế từ 'hobby' lặp đi lặp lại trong IELTS Speaking & Writing."
    },
    equilibrium: {
      word: "equilibrium",
      ipa: "/ˌek.wɪˈlɪb.ri.əm/",
      pos: "noun",
      def_en: "A state of balance between opposing forces, influences, or aspects of life.",
      def_vi: "Trạng thái cân bằng, hài hòa và ổn định vững chắc giữa các mặt đối lập.",
      collocations: "restore equilibrium, maintain equilibrium, emotional equilibrium",
      example: "Taking long sabbaticals helps overburdened corporate executives regain their emotional equilibrium.",
      ielts_tip: "Thuật ngữ C2 học thuật cao cấp mô tả sự cân bằng tinh thần: 'achieve psychological equilibrium'."
    },
    hasty: {
      word: "hasty",
      ipa: "/ˈheɪ.sti/",
      pos: "adjective",
      def_en: "Done very quickly, usually too quickly and without sufficient care or thought.",
      def_vi: "Vội vàng, hấp tấp, qua loa vì thiếu thời gian.",
      collocations: "hasty decision, hasty meal, hasty departure",
      example: "Swallowing a hasty breakfast on the train can lead to chronic digestive problems over time.",
      ielts_tip: "'hasty decisions / hasty meals' thể hiện rõ nét áp lực thời gian của nhịp sống hiện đại."
    },
    boundaries: {
      word: "boundaries",
      ipa: "/ˈbaʊn.dər.iz/",
      pos: "plural noun",
      def_en: "Limits that define acceptable behavior, physical edges, or demarcation between domains.",
      def_vi: "Những ranh giới, giới hạn tự đặt ra để bảo vệ không gian riêng và sự tôn trọng.",
      collocations: "set boundaries, personal boundaries, blurred boundaries",
      example: "Telecommuting has unfortunately blurred the traditional boundaries between professional duties and home life.",
      ielts_tip: "'blur the boundaries between office and home' là cụm ăn điểm tuyệt đối về xu hướng Remote Work."
    },
    burnout: {
      word: "burnout",
      ipa: "/ˈbɜːn.aʊt/",
      pos: "noun",
      def_en: "The state of having no energy or enthusiasm because you have been working a great deal too hard.",
      def_vi: "Hội chứng kiệt sức nghề nghiệp, suy sụp tinh thần do áp lực công việc mãn tính.",
      collocations: "suffer from burnout, prevent burnout, employee burnout",
      example: "Implementing flexible working hours is proven to drastically reduce employee burnout in corporate tech firms.",
      ielts_tip: "Thuật ngữ y khoa và xã hội học chuẩn quốc tế mô tả sự quá tải lao động."
    },
    affluence: {
      word: "affluence",
      ipa: "/ˈæf.lu.əns/",
      pos: "noun",
      def_en: "The state of having a lot of money or a high standard of living; wealth.",
      def_vi: "Sự giàu có, sung túc và thịnh vượng về mặt tài chính của cải.",
      collocations: "material affluence, economic affluence, growing affluence",
      example: "Rising societal affluence does not necessarily correlate with higher subjective happiness scores.",
      ielts_tip: "'material affluence' là từ vựng Band 8.0 thay thế hoàn hảo cho 'wealth' hoặc 'richness'."
    },
    sabbatical: {
      word: "sabbatical",
      ipa: "/səˈbæt.ɪ.kəl/",
      pos: "noun",
      def_en: "A period of paid or unpaid leave granted to a worker for study, travel, or rest.",
      def_vi: "Kỳ nghỉ phép dài hạn có lương hoặc không lương để nghiên cứu, đi lại hoặc tái tạo sức lao động.",
      collocations: "take a sabbatical, year-long sabbatical, six-month sabbatical",
      example: "University professors are periodically granted a sabbatical to conduct international fieldwork.",
      ielts_tip: "Dùng để đề xuất giải pháp chống kiệt sức cho người lao động tri thức trong Task 2."
    },
    serenity: {
      word: "serenity",
      ipa: "/səˈren.ə.ti/",
      pos: "noun",
      def_en: "The quality of being peaceful, calm, and untroubled.",
      def_vi: "Sự an nhiên, tĩnh tại và bình yên thanh thản sâu thẳm trong nội tâm.",
      collocations: "inner serenity, serene environment, complete serenity",
      example: "Morning strolls around misty botanical gardens induce a profound sensation of inner serenity.",
      ielts_tip: "Từ đồng nghĩa học thuật thanh nhã của 'calmness' và 'peace of mind'."
    }
  }
};
