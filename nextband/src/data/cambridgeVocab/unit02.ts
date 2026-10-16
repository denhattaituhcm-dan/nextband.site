import { CambridgeUnitData } from "./types";

export const unit02Data: CambridgeUnitData = {
  meta: {
    unit: 2,
    title: "MENTAL & PHYSICAL DEVELOPMENT",
    subTitle: "Phát triển Thể chất, Trí não & Cột mốc Tâm sinh lý",
    book: "Cambridge Vocabulary for IELTS - Unit 2 (Human Development)",
    cefr: "B2 - C1 (IELTS 6.5 - 8.5)",
    totalStages: 3,
    speedGoalWpm: 45,
    paperSpeedMultiplier: "7.0x"
  },
  stage1_magnets: [
    {
      id: "s1_u2_m1",
      sentenceBefore: "During early childhood, children make remarkable strides in",
      sentenceAfter: "development, learning to reason logically and grasp abstract concepts.",
      target: "cognitive",
      options: [
        {
          word: "mental",
          pos: "adj.",
          hint: "Chung chung về tinh thần, tâm lý học (mental health, mental stress).",
          explanation: "'mental' là từ rộng nói về sức khỏe tinh thần hoặc suy nghĩ nội tâm, không diễn tả sự tiến hóa cấu trúc nhận thức và xử lý thông tin học thuật."
        },
        {
          word: "cognitive",
          pos: "adj.",
          hint: "Liên quan đến quá trình nhận thức, tư duy logic, tiếp thu và ghi nhớ kiến thức.",
          explanation: "Chính xác! 'cognitive development' là thuật ngữ học thuật chuẩn Band 7.5+ mô tả sự phát triển tư duy, trí khôn và khả năng xử lý thông tin của não bộ."
        },
        {
          word: "intellect",
          pos: "n.",
          hint: "Danh từ chỉ trí năng bẩm sinh hoặc nhà trí thức, không dùng làm tính từ bổ nghĩa cho 'development'.",
          explanation: "'intellect' là danh từ (dạng tính từ là 'intellectual'). Do đó không thể ghép trực tiếp vào vị trí này."
        }
      ],
      ieltsInsight: {
        collocation: "cognitive development / cognitive impairment",
        bandScore: "Band 8.0",
        synonyms: ["intellectual growth", "reasoning capacity"],
        academicTip: "Trong bài viết IELTS về giáo dục mầm non, luôn ưu tiên cụm 'stimulate cognitive development' thay cho cách diễn đạt đơn giản 'help brain think'."
      }
    },
    {
      id: "s1_u2_m2",
      sentenceBefore: "Pediatricians monitor toddlers closely to verify that they achieve each developmental",
      sentenceAfter: "such as taking their first unassisted steps or uttering words.",
      target: "milestone",
      options: [
        {
          word: "target",
          pos: "n.",
          hint: "Mục tiêu định lượng do con người đặt ra để phấn đấu (sales target, test target).",
          explanation: "'target' chỉ mục tiêu chủ động trong kinh doanh hoặc học tập, không chỉ các bước ngoặt phát triển sinh lý tự nhiên của trẻ em."
        },
        {
          word: "milestone",
          pos: "n.",
          hint: "Cột mốc quan trọng, bước ngoặt đánh dấu sự chuyển giao một giai đoạn cuộc đời.",
          explanation: "Chính xác! 'developmental milestone' (cột mốc phát triển sinh lý/nhận thức) là cụm cố định không thể thay thế trong ngữ cảnh phát triển trẻ em."
        },
        {
          word: "boundary",
          pos: "n.",
          hint: "Ranh giới địa lý, giới hạn ngăn cách về mặt không gian hoặc quy tắc ứng xử.",
          explanation: "'boundary' là biên giới hoặc giới hạn chịu đựng, không dùng để biểu đạt các nấc thang phát triển tuổi đời."
        }
      ],
      ieltsInsight: {
        collocation: "reach / achieve a developmental milestone",
        bandScore: "Band 7.5+",
        synonyms: ["turning point", "watershed moment", "critical threshold"],
        academicTip: "'reach a milestone' là cụm collocation cực mạnh dùng để chỉ các thành tựu vượt bậc trong cả Writing Task 1 (tăng trưởng kinh tế) lẫn Task 2 (sự trưởng thành)."
      }
    },
    {
      id: "s1_u2_m3",
      sentenceBefore: "Activities like threading beads and drawing intricate shapes help refine a child's fine",
      sentenceAfter: "skills, which require delicate hand-eye coordination.",
      target: "motor",
      options: [
        {
          word: "motion",
          pos: "n.",
          hint: "Sự chuyển động cơ học trong vật lý hoặc cử chỉ đơn thuần.",
          explanation: "'motion' chỉ sự di chuyển theo nghĩa vật lý học thuần túy (e.g. motion sensor), không dùng trong y học thể chất trẻ em."
        },
        {
          word: "motor",
          pos: "adj. / n.",
          hint: "Liên quan đến hệ thần kinh vận động và sự phối hợp giữa cơ bắp với não bộ.",
          explanation: "Chính xác! 'motor skills' phân biệt thành 'gross motor skills' (vận động thô: chạy nhảy) và 'fine motor skills' (vận động tinh: cầm bút, xâu hạt)."
        },
        {
          word: "kinetic",
          pos: "adj.",
          hint: "Thuộc về động năng trong vật lý (kinetic energy).",
          explanation: "'kinetic' là thuật ngữ vật lý (năng lượng do chuyển động sinh ra), không kết hợp với 'skills' để chỉ khả năng điều khiển bàn tay của trẻ em."
        }
      ],
      ieltsInsight: {
        collocation: "fine / gross motor skills",
        bandScore: "Band 8.0",
        synonyms: ["manual dexterity", "physical coordination"],
        academicTip: "Khi bàn về chương trình học cho mầm non hoặc đồ chơi giáo dục, cụm 'foster fine motor skills' là bảo chứng cho điểm Lexical Resource Band 8.0."
      }
    },
    {
      id: "s1_u2_m4",
      sentenceBefore: "Unlike younger children who rely strictly on tangible objects, teenagers gradually develop",
      sentenceAfter: "reasoning, allowing them to solve theoretical equations and contemplate philosophy.",
      target: "abstract",
      options: [
        {
          word: "imaginary",
          pos: "adj.",
          hint: "Tưởng tượng, hư cấu, không có thật trong đời sống thực tế.",
          explanation: "'imaginary' chỉ những thứ viễn vông hư ảo (imaginary friend), không diễn tả khả năng tư duy khái quát mang tính quy luật học thuật."
        },
        {
          word: "abstract",
          pos: "adj.",
          hint: "Trừu tượng, mang tính lý thuyết phi vật thể, không cần sờ nắm trực tiếp.",
          explanation: "Chính xác! 'abstract thinking/reasoning' là năng lực tư duy trừu tượng, cột mốc nhận thức then chốt chuyển giao từ thiếu nhi sang người lớn."
        },
        {
          word: "vague",
          pos: "adj.",
          hint: "Mơ hồ, không rõ ràng do thiếu bằng chứng hoặc giao tiếp kém.",
          explanation: "'vague' mang sắc thái tiêu cực (lời nói mơ hồ, không rõ nghĩa), đối lập với tư duy khoa học trừu tượng (abstract thinking)."
        }
      ],
      ieltsInsight: {
        collocation: "abstract reasoning / abstract concepts",
        bandScore: "Band 7.5+",
        synonyms: ["conceptual thinking", "theoretical deduction"],
        academicTip: "Sử dụng 'transition from concrete thought to abstract reasoning' để mô tả quá trình phát triển nhận thức của thanh thiếu niên."
      }
    },
    {
      id: "s1_u2_m5",
      sentenceBefore: "During puberty, teenagers experience an unprecedented growth",
      sentenceAfter: "accompanied by rapid skeletal maturation and fluctuating hormonal balances.",
      target: "spurt",
      options: [
        {
          word: "jump",
          pos: "n.",
          hint: "Cú nhảy vật lý hoặc bước tăng đột biến mang tính cơ học.",
          explanation: "'jump' là từ thông tục chỉ bước nhảy vọt (e.g. price jump), không phải thuật ngữ sinh học chỉ sự phát triển chiều cao vượt bậc."
        },
        {
          word: "spurt",
          pos: "n.",
          hint: "Giai đoạn tăng trưởng bộc phát, đột ngột trong khoảng thời gian ngắn.",
          explanation: "Chính xác! 'growth spurt' là cụm từ chuyên môn duy nhất chỉ giai đoạn vọt chiều cao và thể chất thần tốc của tuổi dậy thì."
        },
        {
          word: "surge",
          pos: "n.",
          hint: "Sự dâng trào mạnh mẽ của dòng điện, làn sóng hoặc cảm xúc (a surge of anger).",
          explanation: "'surge' dùng cho dòng năng lượng, sóng biển hoặc hormone (hormonal surge), nhưng với sự tăng trưởng thể chất bắt buộc dùng 'growth spurt'."
        }
      ],
      ieltsInsight: {
        collocation: "growth spurt / sudden spurt of energy",
        bandScore: "Band 7.5+",
        synonyms: ["sudden acceleration", "rapid developmental surge"],
        academicTip: "'experience a sudden growth spurt' là cụm từ miêu tả chính xác giai đoạn chuyển tiếp thể lực tuổi vị thành niên trong các chủ đề Health & Development."
      }
    },
    {
      id: "s1_u2_m6",
      sentenceBefore: "Modern educational toys are scientifically engineered to",
      sentenceAfter: "young brains by challenging their visual and spatial problem-solving faculties.",
      target: "stimulate",
      options: [
        {
          word: "provoke",
          pos: "v.",
          hint: "Khiêu khích, kích động nhằm gây ra phản ứng tiêu cực hoặc cơn giận dữ.",
          explanation: "'provoke' mang nghĩa tiêu cực (chọc giận, gây gổ), ví dụ: provoke a protest hoặc provoke a hostile reaction."
        },
        {
          word: "stimulate",
          pos: "v.",
          hint: "Kích thích, đánh thức tiềm năng phát triển tích cực của giác quan hoặc tư duy.",
          explanation: "Chính xác! 'stimulate intellectual curiosity / stimulate the brain' là cụm từ kinh điển mang ý nghĩa bồi bổ và thúc đẩy nhận thức tích cực."
        },
        {
          word: "ignite",
          pos: "v.",
          hint: "Đốt cháy, bắt lửa theo nghĩa đen hoặc châm ngòi cho ngọn lửa nhiệt huyết.",
          explanation: "'ignite' thường đi với cảm xúc bùng cháy (ignite passion/flame), không phải là động từ sinh học mô tả hoạt động dẫn truyền thần kinh của não."
        }
      ],
      ieltsInsight: {
        collocation: "stimulate brain activity / stimulate intellectual growth",
        bandScore: "Band 7.5+",
        synonyms: ["activate", "foster neural plasticity", "invigorate"],
        academicTip: "Thay vì viết 'make children smarter', hãy diễn đạt: 'Interactive learning games stimulate children's neurological and cognitive faculties'."
      }
    },
    {
      id: "s1_u2_m7",
      sentenceBefore: "By the time individuals cross into middle age, they often acquire unprecedented emotional",
      sentenceAfter: "enabling them to navigate complex social disputes with poise.",
      target: "maturity",
      options: [
        {
          word: "seniority",
          pos: "n.",
          hint: "Thâm niên công tác hoặc sự thâm niên theo tuổi thọ tại một cơ quan.",
          explanation: "'seniority' nói về cấp bậc và số năm làm việc trong công ty (e.g. seniority rights), không phản ánh độ chín chắn về mặt cảm xúc của tâm hồn."
        },
        {
          word: "maturity",
          pos: "n.",
          hint: "Sự trưởng thành, độ chín chắn trọn vẹn cả về tâm lý, nhận thức lẫn sinh học.",
          explanation: "Chính xác! 'emotional maturity' (sự trưởng thành cảm xúc) là đích đến cao nhất của quá trình phát triển nhân cách trưởng thành."
        },
        {
          word: "adulthood",
          pos: "n.",
          hint: "Thời kỳ làm người lớn, giai đoạn trưởng thành sau tuổi vị thành niên về mặt pháp lý.",
          explanation: "'adulthood' là một khoảng thời gian đời người (danh từ chỉ giai đoạn như childhood), không đi chung với 'emotional' như một phẩm chất nội tâm."
        }
      ],
      ieltsInsight: {
        collocation: "emotional maturity / attain full maturity",
        bandScore: "Band 7.5+",
        synonyms: ["psychological equilibrium", "seasoned composure"],
        academicTip: "Cụm 'attain cognitive and emotional maturity' là bảo chứng hoàn hảo cho bài luận Task 2 về độ tuổi kết hôn hoặc độ tuổi trưởng thành công dân."
      }
    },
    {
      id: "s1_u2_m8",
      sentenceBefore: "It is natural for elderly citizens to experience a gradual",
      sentenceAfter: "in short-term memory recall, but active mental exercises can slow this process.",
      target: "decline",
      options: [
        {
          word: "drop",
          pos: "n.",
          hint: "Sự sụt giảm đột ngột hoặc rơi tự do (drop in temperature, price drop).",
          explanation: "'drop' thường dùng cho sự rơi rớt nhanh hoặc giảm định lượng tức thì, không mô tả tiến trình thoái hóa sinh học dần dần theo thời gian."
        },
        {
          word: "decline",
          pos: "n.",
          hint: "Sự suy giảm chậm rãi, dần dần về năng lực, sức khỏe hoặc phẩm chất.",
          explanation: "Chính xác! 'cognitive decline' hoặc 'decline in physical strength' là cách diễn đạt y khoa và học thuật chuẩn xác nhất về sự lão hóa."
        },
        {
          word: "loss",
          pos: "n.",
          hint: "Sự mất mát hoàn toàn không còn nữa (loss of life, job loss).",
          explanation: "'loss' chỉ sự mất trắng hoàn toàn. Người cao tuổi chỉ trải qua suy giảm (decline) trí nhớ ngắn hạn chứ không biến mất hoàn toàn não bộ."
        }
      ],
      ieltsInsight: {
        collocation: "cognitive decline / age-related decline",
        bandScore: "Band 8.0",
        synonyms: ["deterioration", "degeneration", "waning faculties"],
        academicTip: "Trong bài viết IELTS về già hóa dân số (Ageing Population), cụm 'mitigate cognitive decline through lifelong mental stimulation' là cấu trúc ăn điểm tối đa."
      }
    }
  ],
  stage2_timeline: [
    {
      milestoneId: "u2_t1",
      age: "0–12 Tháng",
      title: "Giai đoạn Sơ sinh & Khởi nguồn Cảm xạ",
      icon: "baby",
      stageTag: "Infancy",
      story: "Trong những tháng đầu đời, trẻ sơ sinh bắt đầu hình thành phản xạ không điều kiện [BLANK] để tự bảo vệ sự sống và thích nghi với môi trường.",
      storyEn: "During this delicate window, babies exhibit automatic physiological [BLANK] that safeguard survival from the first moments of life.",
      target: "reflexes",
      targetVi: "phản xạ tự nhiên",
      pos: "noun",
      candidates: ["reflexes", "imitation", "maturity", "mobility"],
      explanation: "'reflexes' (các phản xạ tự nhiên) là nền tảng sinh học bản năng bảo vệ trẻ sơ sinh trước khi tư duy có ý thức hình thành."
    },
    {
      milestoneId: "u2_t2",
      age: "1–3 Tuổi",
      title: "Thời kỳ Chập chững & Tự chủ Vận động",
      icon: "footprints",
      stageTag: "Toddlerhood",
      story: "Trẻ chập chững biết đi đạt được khả năng vận động tự chủ [BLANK], bắt đầu tự do di chuyển và khám phá thế giới xung quanh.",
      storyEn: "Toddlers attain upright locomotion, gaining physical [BLANK] that empowers them to investigate their surroundings with boundless curiosity.",
      target: "mobility",
      targetVi: "khả năng di chuyển/vận động",
      pos: "noun",
      candidates: ["mobility", "reasoning", "senescence", "vocabulary"],
      explanation: "'mobility' (khả năng di chuyển, tính năng động) giải phóng trẻ nhỏ khỏi sự lệ thuộc hoàn toàn vào vòng tay người chăm sóc."
    },
    {
      milestoneId: "u2_t3",
      age: "3–5 Tuổi",
      title: "Bùng nổ Ngôn ngữ & Tư duy Tượng trưng",
      icon: "message-square",
      stageTag: "Early Childhood",
      story: "Lứa tuổi mẫu giáo trải qua đợt bùng nổ vốn từ và sự lĩnh hội [BLANK] ngôn ngữ thần tốc, biết biểu đạt cảm xúc và đối thoại câu hoàn chỉnh.",
      storyEn: "Pre-schoolers experience a linguistic explosion where rapid language [BLANK] enables them to articulate desires and comprehend contextual directives.",
      target: "acquisition",
      targetVi: "sự tiếp thu/lĩnh hội",
      pos: "noun",
      candidates: ["acquisition", "decline", "stagnation", "dexterity"],
      explanation: "'language acquisition' (sự tiếp thu/lĩnh hội ngôn ngữ) là thuật ngữ học thuật chỉ quá trình nạp tiếng mẹ đẻ tự nhiên của trẻ."
    },
    {
      milestoneId: "u2_t4",
      age: "6–11 Tuổi",
      title: "Khéo léo Vận động & Kỷ luật Nhận thức",
      icon: "pencil",
      stageTag: "Middle Childhood",
      story: "Trẻ lứa tuổi tiểu học tôi luyện sự khéo léo [BLANK] của đôi bàn tay và phối hợp mắt - cơ bắp qua việc tập viết, vẽ tranh và chơi thể thao.",
      storyEn: "Schoolchildren hone intricate manual coordination, proving that manual [BLANK] is pivotal for mastering handwriting and delicate tasks.",
      target: "dexterity",
      targetVi: "sự khéo léo của đôi tay",
      pos: "noun",
      candidates: ["dexterity", "puberty", "instinct", "impairment"],
      explanation: "'manual dexterity' (sự khéo léo của các ngón tay) là chỉ số cốt lõi đánh giá mức độ hoàn thiện vận động tinh (fine motor skills)."
    },
    {
      milestoneId: "u2_t5",
      age: "12–17 Tuổi",
      title: "Dậy thì Thần tốc & Tư duy Trừu tượng",
      icon: "zap",
      stageTag: "Adolescence",
      story: "Bước vào thời kỳ [BLANK], thanh thiếu niên trải qua các đợt biến đổi hormone thần tốc, cao vọt chiều cao và định hình tư duy phản biện.",
      storyEn: "The onset of [BLANK] triggers noticeable physical transformations alongside heightened emotional sensitivity and abstract reasoning.",
      target: "puberty",
      targetVi: "tuổi dậy thì",
      pos: "noun",
      candidates: ["puberty", "infancy", "retirement", "equilibrium"],
      explanation: "'puberty' (tuổi dậy thì) là cột mốc biến chuyển sinh học mạnh mẽ nhất biến một đứa trẻ thành một người trưởng thành hoàn chỉnh."
    },
    {
      milestoneId: "u2_t6",
      age: "18–25 Tuổi",
      title: "Đỉnh cao Sinh học & Hoàn thiện Thùy trán",
      icon: "target",
      stageTag: "Early Adulthood",
      story: "Giai đoạn thanh niên đạt mức [BLANK] về thể lực sung mãn, sức bền cơ bắp và hoàn thiện vùng não thùy trán để đưa ra phán đoán chiến lược.",
      storyEn: "Physical stamina and biological reflexes typically function at their [BLANK] capacity during this peak stage of early adulthood.",
      target: "optimal",
      targetVi: "tối ưu/đỉnh cao nhất",
      pos: "adjective",
      candidates: ["optimal", "dormant", "frail", "obsolete"],
      explanation: "'optimal' (tối ưu, ở phong độ đỉnh cao nhất) miêu tả trạng thái sung mãn thể lực và tốc độ phản xạ thần kinh của tuổi trẻ."
    },
    {
      milestoneId: "u2_t7",
      age: "30–55 Tuổi",
      title: "Vững vàng Tâm trí & Đỉnh cao Chuyên môn",
      icon: "shield",
      stageTag: "Middle Adulthood",
      story: "Độ tuổi trung niên tích lũy sức bền [BLANK] tâm lý kiên cường, xử lý áp lực gia đình và khủng hoảng sự nghiệp một cách bình thản, điềm đạm.",
      storyEn: "Emotional and psychological [BLANK] allows seasoned adults to weather stressful career and domestic transitions without succumbing to burnout.",
      target: "resilience",
      targetVi: "sức bền/khả năng thích ứng",
      pos: "noun",
      candidates: ["resilience", "infantilism", "clumsiness", "fragility"],
      explanation: "'psychological resilience' (sức bền tâm lý/khả năng phục hồi) là thước đo độ chín chắn của người trưởng thành khi đối mặt thử thách."
    },
    {
      milestoneId: "u2_t8",
      age: "60+ Tuổi",
      title: "Độ tuổi Vàng & Duy trì Năng lực Não bộ",
      icon: "heart",
      stageTag: "Seniority",
      story: "Người cao tuổi duy trì lối sống năng động và rèn luyện trí tuệ thường xuyên để bảo vệ sức khỏe não bộ và nâng cao tuổi thọ [BLANK].",
      storyEn: "Engaging in intellectual puzzles and light aerobics contributes significantly to preserving cognitive networks and promoting [BLANK].",
      target: "longevity",
      targetVi: "sự trường thọ/tuổi thọ cao",
      pos: "noun",
      candidates: ["longevity", "toddlerhood", "hyperactivity", "distraction"],
      explanation: "'longevity' (sự trường thọ, sống lâu khỏe mạnh) là mục tiêu lớn của y học phát triển và lão khoa hiện đại."
    }
  ],
  stage3_essay: {
    title: "Nature vs Nurture in Cognitive and Physical Growth",
    prompt: "Some people believe that human cognitive ability and athletic prowess are strictly predetermined by genetic inheritance, whereas others argue that purposeful stimulation and dedicated training play a far more decisive role. Discuss both views and give your own opinion.",
    paragraphs: [
      {
        pIndex: 1,
        type: "Introduction",
        text: "The debate over whether biological heredity or environmental stimulation exerts a greater influence on individual development remains intensely contested. While genetic predispositions undoubtedly construct the foundational blueprint for an infant's [BLANK_1] faculties and physical stature, environmental enrichment and deliberate practice serve as the indispensable catalysts that enable individuals to reach their full [BLANK_2] potential throughout their formative years."
      },
      {
        pIndex: 2,
        type: "Body 1 (Genetic Inheritance & Biological Limits)",
        text: "Proponents of biological determinism argue that innate factors strictly govern human capabilities. From birth, a child inherits specific neurological wirings that dictate the speed of neural transmission and baseline [BLANK_3] aptitude. For example, individuals endowed with extraordinary muscle composition naturally demonstrate superior [BLANK_4] coordination from early childhood. Furthermore, medical science confirms that the eventual onset of [BLANK_5] and subsequent physical [BLANK_6] are profoundly orchestrated by intrinsic biological clocks encoded in our DNA."
      },
      {
        pIndex: 3,
        type: "Body 2 (Environmental Enrichment & Neural Plasticity)",
        text: "Conversely, compelling empirical evidence highlights that the brain possesses extraordinary plasticity that can be actively [BLANK_7] by environmental input. When educators provide children with intellectually stimulating toys and rigorous problem-solving tasks, they significantly accelerate the acquisition of [BLANK_8] reasoning abilities. Children who consistently practice fine motor exercises demonstrate far greater manual [BLANK_9] than peers blessed with identical innate potential who lack guided instruction. Therefore, neglecting developmental [BLANK_10] during childhood can permanently handicap an individual's natural talent."
      },
      {
        pIndex: 4,
        type: "Conclusion & Final Stance",
        text: "In conclusion, although human beings inherit fundamental genetic limits, cognitive and physical growth is neither static nor entirely preordained. While genetic heritage provides the raw foundation, it is dedicated nurture, systematic training, and psychological [BLANK_11] that ultimately determine whether a person attains true [BLANK_12] and lifelong intellectual vitality."
      }
    ],
    blanks: [
      {
        id: "u2_b1",
        num: 1,
        rootWord: "cognition",
        category: "Mental Faculties",
        targetForm: "cognitive",
        grammarClue: "Cần tính từ đứng trước danh từ 'faculties' để chỉ năng lực tư duy, nhận thức.",
        variants: [
          { form: "cognitive", pos: "adj.", label: "cognitive (Tính từ thuộc nhận thức)", isCorrect: true },
          { form: "cognitively", pos: "adv.", label: "cognitively (Phó từ một cách nhận thức)", isCorrect: false },
          { form: "cognition", pos: "n.", label: "cognition (Danh từ sự nhận thức)", isCorrect: false }
        ]
      },
      {
        id: "u2_b2",
        num: 2,
        rootWord: "develop",
        category: "Human Growth",
        targetForm: "developmental",
        grammarClue: "Cần tính từ bổ nghĩa cho cụm danh từ 'potential' (tiềm năng phát triển).",
        variants: [
          { form: "developmental", pos: "adj.", label: "developmental (Tính từ thuộc phát triển)", isCorrect: true },
          { form: "developing", pos: "participle", label: "developing (Đang phát triển)", isCorrect: false },
          { form: "development", pos: "n.", label: "development (Danh từ sự phát triển)", isCorrect: false }
        ]
      },
      {
        id: "u2_b3",
        num: 3,
        rootWord: "intellect",
        category: "Mental Aptitude",
        targetForm: "intellectual",
        grammarClue: "Cần tính từ đứng trước danh từ 'aptitude' (năng khiếu trí tuệ).",
        variants: [
          { form: "intellectual", pos: "adj.", label: "intellectual (Tính từ thuộc trí tuệ)", isCorrect: true },
          { form: "intellectually", pos: "adv.", label: "intellectually (Phó từ về mặt trí tuệ)", isCorrect: false },
          { form: "intellect", pos: "n.", label: "intellect (Danh từ trí năng)", isCorrect: false }
        ]
      },
      {
        id: "u2_b4",
        num: 4,
        rootWord: "motor",
        category: "Physical Coordination",
        targetForm: "motor",
        grammarClue: "Cần tính từ sinh học đi cùng 'coordination' (sự phối hợp thần kinh vận động).",
        variants: [
          { form: "motor", pos: "adj.", label: "motor (Tính từ thuộc vận động thần kinh)", isCorrect: true },
          { form: "motorized", pos: "adj.", label: "motorized (Có gắn động cơ xe cộ)", isCorrect: false },
          { form: "motoring", pos: "n.", label: "motoring (Việc lái xe)", isCorrect: false }
        ]
      },
      {
        id: "u2_b5",
        num: 5,
        rootWord: "mature",
        category: "Biological Stage",
        targetForm: "maturity",
        grammarClue: "Sau giới từ 'of' cần một danh từ chỉ trạng thái trưởng thành sinh học.",
        variants: [
          { form: "maturity", pos: "n.", label: "maturity (Danh từ sự trưởng thành)", isCorrect: true },
          { form: "maturely", pos: "adv.", label: "maturely (Phó từ chín chắn)", isCorrect: false },
          { form: "mature", pos: "adj.", label: "mature (Tính từ trưởng thành)", isCorrect: false }
        ]
      },
      {
        id: "u2_b6",
        num: 6,
        rootWord: "mature",
        category: "Biological Progression",
        targetForm: "maturation",
        grammarClue: "Cần danh từ chỉ tiến trình phát triển thể chất tự nhiên (physical maturation).",
        variants: [
          { form: "maturation", pos: "n.", label: "maturation (Danh từ tiến trình hoàn thiện thể chất)", isCorrect: true },
          { form: "matured", pos: "past part.", label: "matured (Đã trưởng thành)", isCorrect: false },
          { form: "matureness", pos: "n.", label: "matureness (Độ chín - ít dùng trong văn cảnh học thuật)", isCorrect: false }
        ]
      },
      {
        id: "u2_b7",
        num: 7,
        rootWord: "stimulate",
        category: "Brain Plasticity",
        targetForm: "stimulated",
        grammarClue: "Cấu trúc bị động sau 'can be actively + V3/ed'.",
        variants: [
          { form: "stimulated", pos: "v-ed / past part.", label: "stimulated (Được kích thích phát triển)", isCorrect: true },
          { form: "stimulating", pos: "adj./participle", label: "stimulating (Mang tính kích thích)", isCorrect: false },
          { form: "stimulate", pos: "base v.", label: "stimulate (Động từ nguyên mẫu)", isCorrect: false }
        ]
      },
      {
        id: "u2_b8",
        num: 8,
        rootWord: "abstract",
        category: "Reasoning Capacity",
        targetForm: "abstract",
        grammarClue: "Cần tính từ đi với 'reasoning abilities' để chỉ khả năng tư duy trừu tượng.",
        variants: [
          { form: "abstract", pos: "adj.", label: "abstract (Tính từ trừu tượng)", isCorrect: true },
          { form: "abstractly", pos: "adv.", label: "abstractly (Phó từ một cách trừu tượng)", isCorrect: false },
          { form: "abstraction", pos: "n.", label: "abstraction (Danh từ sự trừu tượng hóa)", isCorrect: false }
        ]
      },
      {
        id: "u2_b9",
        num: 9,
        rootWord: "dexterous",
        category: "Manual Coordination",
        targetForm: "dexterity",
        grammarClue: "Sau cụm 'greater manual' cần một danh từ chỉ sự khéo léo của bàn tay.",
        variants: [
          { form: "dexterity", pos: "n.", label: "dexterity (Danh từ sự khéo léo của đôi tay)", isCorrect: true },
          { form: "dexterous", pos: "adj.", label: "dexterous (Tính từ khéo tay)", isCorrect: false },
          { form: "dexterously", pos: "adv.", label: "dexterously (Phó từ một cách khéo léo)", isCorrect: false }
        ]
      },
      {
        id: "u2_b10",
        num: 10,
        rootWord: "milestone",
        category: "Growth Benchmarks",
        targetForm: "milestones",
        grammarClue: "Cần danh từ số nhiều chỉ các cột mốc phát triển nói chung của trẻ nhỏ.",
        variants: [
          { form: "milestones", pos: "pl. n.", label: "milestones (Danh từ số nhiều các cột mốc)", isCorrect: true },
          { form: "milestone", pos: "sing. n.", label: "milestone (Danh từ số ít cột mốc)", isCorrect: false },
          { form: "milestoning", pos: "gerund", label: "milestoning (Từ không tồn tại trong từ điển chuẩn)", isCorrect: false }
        ]
      },
      {
        id: "u2_b11",
        num: 11,
        rootWord: "resilient",
        category: "Psychological Strength",
        targetForm: "resilience",
        grammarClue: "Sau tính từ 'psychological' cần một danh từ chỉ sức bền/sức bật tâm lý.",
        variants: [
          { form: "resilience", pos: "n.", label: "resilience (Danh từ sức bền và độ bật tâm lý)", isCorrect: true },
          { form: "resilient", pos: "adj.", label: "resilient (Tính từ kiên cường dẻo dai)", isCorrect: false },
          { form: "resiliently", pos: "adv.", label: "resiliently (Phó từ một cách kiên cường)", isCorrect: false }
        ]
      },
      {
        id: "u2_b12",
        num: 12,
        rootWord: "mature",
        category: "Holistic Development",
        targetForm: "maturity",
        grammarClue: "Sau động từ 'attains' và tính từ 'true' cần một danh từ chỉ sự trưởng thành hoàn thiện.",
        variants: [
          { form: "maturity", pos: "n.", label: "maturity (Danh từ sự trưởng thành chín chắn)", isCorrect: true },
          { form: "mature", pos: "adj.", label: "mature (Tính từ chín chắn)", isCorrect: false },
          { form: "maturing", pos: "gerund", label: "maturing (Quá trình đang trưởng thành)", isCorrect: false }
        ]
      }
    ],
    wordArsenal: [
      { root: "cognition", pos: "n.", vi: "Nhận thức, tư duy trí não", cat: "Cognition" },
      { root: "develop", pos: "v.", vi: "Phát triển, tiến hóa", cat: "Growth" },
      { root: "intellect", pos: "n.", vi: "Trí năng, trí tuệ học thuật", cat: "Intellect" },
      { root: "motor", pos: "adj.", vi: "Vận động thần kinh cơ bắp", cat: "Motor" },
      { root: "mature", pos: "adj./v.", vi: "Trưởng thành, chín chắn", cat: "Maturity" },
      { root: "stimulate", pos: "v.", vi: "Kích thích não bộ", cat: "Cognition" },
      { root: "abstract", pos: "adj.", vi: "Trừu tượng, khái niệm", cat: "Intellect" },
      { root: "dexterous", pos: "adj.", vi: "Khéo léo đôi bàn tay", cat: "Motor" },
      { root: "milestone", pos: "n.", vi: "Cột mốc phát triển sinh học", cat: "Growth" },
      { root: "resilient", pos: "adj.", vi: "Kiên cường, bền bỉ", cat: "Psychology" }
    ],
    xrayHighlights: {
      thesis: [
        "While genetic predispositions undoubtedly construct the foundational blueprint for an infant's cognitive faculties and physical stature, environmental enrichment and deliberate practice serve as the indispensable catalysts that enable individuals to reach their full developmental potential.",
        "In conclusion, although human beings inherit fundamental genetic limits, cognitive and physical growth is neither static nor entirely preordained."
      ],
      cohesion: [
        "The debate over whether biological heredity or environmental stimulation",
        "Proponents of biological determinism argue that",
        "For example",
        "Furthermore, medical science confirms that",
        "Conversely, compelling empirical evidence highlights that",
        "Therefore, neglecting developmental milestones",
        "In conclusion, although human beings inherit"
      ],
      lexical: [
        "cognitive faculties",
        "foundational blueprint",
        "developmental potential",
        "biological determinism",
        "motor coordination",
        "physical maturation",
        "neural plasticity",
        "abstract reasoning",
        "manual dexterity",
        "psychological resilience"
      ]
    }
  },
  lexicon_notes: {
    cognitive: {
      word: "cognitive",
      ipa: "/ˈkɒɡ.nə.tɪv/",
      pos: "adjective",
      def_en: "Connected with mental processes of understanding, learning, and remembering.",
      def_vi: "Thuộc về nhận thức, quá trình tư duy, ghi nhớ và xử lý tri thức của não bộ.",
      collocations: "cognitive development, cognitive skills, cognitive impairment",
      example: "Reading stimulating books from an early age bolsters a child's cognitive development.",
      ielts_tip: "Luôn dùng 'foster cognitive development' thay vì nói 'help children learn'."
    },
    milestone: {
      word: "milestone",
      ipa: "/ˈmaɪl.stəʊn/",
      pos: "noun",
      def_en: "An important stage or event in the development or history of something or someone.",
      def_vi: "Cột mốc quan trọng đánh dấu bước ngoặt phát triển sinh lý, tâm lý hoặc sự nghiệp.",
      collocations: "reach a milestone, developmental milestone, historic milestone",
      example: "Uttering their first recognizable word is a critical developmental milestone for every toddler.",
      ielts_tip: "'reach a milestone' là cụm collocation cực tốt trong cả Writing Task 1 lẫn Task 2."
    },
    motor: {
      word: "motor",
      ipa: "/ˈməʊ.tər/",
      pos: "adjective",
      def_en: "Relating to muscles that produce movement, or the nerves connected with them.",
      def_vi: "Thuộc về hệ thần kinh vận động và sự phối hợp cơ bắp.",
      collocations: "fine motor skills, gross motor skills, motor coordination",
      example: "Drawing with crayons fosters fine motor skills, while climbing trees enhances gross motor agility.",
      ielts_tip: "Phân biệt 'fine motor skills' (vận động tinh như vẽ, cầm thìa) và 'gross motor skills' (vận động thô như nhảy, chạy)."
    },
    abstract: {
      word: "abstract",
      ipa: "/ˈæb.strækt/",
      pos: "adjective",
      def_en: "Existing as an idea, feeling, or quality, not as a physical material object.",
      def_vi: "Trừu tượng, mang tính khái niệm và suy luận phi vật thể.",
      collocations: "abstract reasoning, abstract concept, abstract theory",
      example: "Teenagers gradually shift from literal observations to contemplating abstract philosophical doctrines.",
      ielts_tip: "Dùng 'abstract reasoning' để mô tả năng lực nhận thức cấp cao của thanh thiếu niên."
    },
    spurt: {
      word: "spurt",
      ipa: "/spɜːt/",
      pos: "noun",
      def_en: "A sudden and short period of increased activity, speed, or physical growth.",
      def_vi: "Giai đoạn tăng trưởng chiều cao đột phá trong thời gian ngắn (tuổi dậy thì).",
      collocations: "growth spurt, sudden spurt of energy",
      example: "He shot up by ten centimeters over the summer vacation due to a sudden adolescent growth spurt.",
      ielts_tip: "'growth spurt' là collocation tự nhiên duy nhất chỉ sự vọt chiều cao của tuổi dậy thì."
    },
    stimulate: {
      word: "stimulate",
      ipa: "/ˈstɪm.jə.leɪt/",
      pos: "verb",
      def_en: "To encourage something to grow, develop, or become active and vibrant.",
      def_vi: "Kích thích, khơi dậy và bồi đắp tiềm năng vận động hoặc năng lực tư duy của não.",
      collocations: "stimulate brain activity, stimulate economic growth, stimulate curiosity",
      example: "Tactile puzzles stimulate neural connections in the developing brains of young infants.",
      ielts_tip: "Thay vì 'make children smarter', hãy dùng 'stimulate intellectual curiosity'."
    },
    maturity: {
      word: "maturity",
      ipa: "/məˈtʃʊə.rə.ti/",
      pos: "noun",
      def_en: "The quality of being emotionally and intellectually fully grown and responsible.",
      def_vi: "Sự trưởng thành, độ chín chắn về cảm xúc, nhân cách và trách nhiệm làm người lớn.",
      collocations: "emotional maturity, reach maturity, intellectual maturity",
      example: "Handling disagreements without resorting to tantrums demonstrates profound psychological maturity.",
      ielts_tip: "Cụm 'attain emotional and psychological maturity' là bảo chứng Band 8.0 trong Task 2."
    },
    decline: {
      word: "decline",
      ipa: "/dɪˈklaɪn/",
      pos: "noun",
      def_en: "A continuous gradual decrease in the quality, quantity, or strength of something.",
      def_vi: "Sự suy thoái hoặc giảm sút dần dần theo thời gian.",
      collocations: "cognitive decline, gradual decline, age-related decline",
      example: "Engaging in mental arithmetic helps elderly individuals stave off age-related cognitive decline.",
      ielts_tip: "'stave off cognitive decline' là cụm ăn điểm tuyệt đối khi viết về chủ đề Già hóa dân số."
    },
    dexterity: {
      word: "dexterity",
      ipa: "/dekˈster.ə.ti/",
      pos: "noun",
      def_en: "Skill and speed in using your hands or mind effectively and gracefully.",
      def_vi: "Sự khéo léo, tinh tế của đôi bàn tay hoặc sự nhanh nhạy của tâm trí.",
      collocations: "manual dexterity, mental dexterity, physical dexterity",
      example: "Surgeons and concert pianists both require decades of deliberate practice to develop exceptional dexterity.",
      ielts_tip: "'manual dexterity' là từ vựng C2 chỉ sự khéo tay, cao cấp hơn nhiều so với 'skillful hands'."
    },
    resilience: {
      word: "resilience",
      ipa: "/rɪˈzɪl.jəns/",
      pos: "noun",
      def_en: "The capacity to recover quickly from difficulties, tough challenges, or setbacks.",
      def_vi: "Sức bền, độ dẻo dai và khả năng phục hồi nhanh chóng sau biến cố áp lực cuộc sống.",
      collocations: "emotional resilience, build resilience, remarkable resilience",
      example: "Children who are sheltered excessively may fail to cultivate emotional resilience when facing rejection.",
      ielts_tip: "Từ vựng then chốt trong IELTS Psychology: 'cultivate emotional resilience'."
    },
    acquisition: {
      word: "acquisition",
      ipa: "/ˌæk.wɪˈzɪʃ.ən/",
      pos: "noun",
      def_en: "The process of getting something, especially knowledge, skills, or linguistic fluency.",
      def_vi: "Quá trình lĩnh hội, tiếp thu và làm chủ một kỹ năng hoặc ngôn ngữ.",
      collocations: "language acquisition, knowledge acquisition, skill acquisition",
      example: "Immersion in an English-speaking country noticeably accelerates conversational language acquisition.",
      ielts_tip: "Dùng 'language acquisition' thay cho 'learning a language' trong văn phong học thuật."
    },
    puberty: {
      word: "puberty",
      ipa: "/ˈpjuː.bə.ti/",
      pos: "noun",
      def_en: "The stage in human life when a person's body becomes sexually and physically mature.",
      def_vi: "Tuổi dậy thì, giai đoạn cơ thể biến đổi và hoàn thiện cơ quan sinh học và thể chất.",
      collocations: "reach puberty, onset of puberty, early puberty",
      example: "Navigating the turbulent emotional swings of puberty requires patience and sympathetic guidance from mentors.",
      ielts_tip: "'the onset of puberty' là collocation tự nhiên miêu tả thời điểm bắt đầu dậy thì."
    },
    reflexes: {
      word: "reflexes",
      ipa: "/ˈriː.flek.sɪz/",
      pos: "plural noun",
      def_en: "Physical reactions to something that you do without thinking.",
      def_vi: "Các phản xạ tự nhiên không điều kiện bảo vệ cơ thể.",
      collocations: "lightning reflexes, natural reflexes, infant reflexes",
      example: "The grasping reflex in newborn babies is an evolutionary survival mechanism.",
      ielts_tip: "Dùng để mô tả năng lực thể chất hoặc giai đoạn sơ sinh trong bài luận khoa học."
    },
    mobility: {
      word: "mobility",
      ipa: "/məʊˈbɪl.ə.ti/",
      pos: "noun",
      def_en: "The ability to move freely or be easily moved around one's environment.",
      def_vi: "Khả năng di chuyển, tính năng động và độ linh hoạt tự chủ về thể xác.",
      collocations: "physical mobility, impaired mobility, maintain mobility",
      example: "Daily aquatic exercises help arthritis sufferers maintain joint flexibility and general mobility.",
      ielts_tip: "Rất hay dùng trong đề bài về người cao tuổi: 'preserve physical mobility'."
    },
    longevity: {
      word: "longevity",
      ipa: "/lɒnˈdʒev.ə.ti/",
      pos: "noun",
      def_en: "Living for a long time, or the durability and staying power of a living organism.",
      def_vi: "Sự trường thọ, tuổi thọ dài lâu và sức sống bền bỉ.",
      collocations: "exceptional longevity, promote longevity, human longevity",
      example: "A Mediterranean diet rich in antioxidants correlates strongly with biological longevity.",
      ielts_tip: "Dùng 'longevity' thay cho cách diễn đạt đơn sơ 'living a long life'."
    },
    maturation: {
      word: "maturation",
      ipa: "/ˌmætʃ.ʊˈreɪ.ʃən/",
      pos: "noun",
      def_en: "The biological process of becoming mature and fully developed over time.",
      def_vi: "Tiến trình chín muồi, quá trình phát triển sinh học và hoàn thiện các cơ quan cơ thể.",
      collocations: "physical maturation, skeletal maturation, biological maturation",
      example: "Skeletal maturation in boys often continues well into their early twenties.",
      ielts_tip: "'maturation' nhấn mạnh vào quá trình/tiến trình diễn tiến sinh học theo thời gian."
    },
    intellectual: {
      word: "intellectual",
      ipa: "/ˌɪn.təˈlek.tʃu.əl/",
      pos: "adjective",
      def_en: "Relating to your ability to think and understand things, especially complicated ideas.",
      def_vi: "Thuộc về trí tuệ, khả năng suy luận lý thuyết và nhận thức các ý niệm uyên bác.",
      collocations: "intellectual curiosity, intellectual capacity, intellectual stimulation",
      example: "Chess tournaments provide exceptional intellectual stimulation for young analytical minds.",
      ielts_tip: "'intellectual stimulation' là collocation Band 8.0 cực phổ biến trong chủ đề Education."
    },
    optimal: {
      word: "optimal",
      ipa: "/ˈɒp.tɪ.məl/",
      pos: "adjective",
      def_en: "Best; most likely to bring success or result in the highest possible performance.",
      def_vi: "Tối ưu, đạt trạng thái hoàn hảo nhất để phát huy tối đa công suất và hiệu năng.",
      collocations: "optimal performance, optimal conditions, optimal health",
      example: "Seven to eight hours of sound sleep is optimal for cognitive consolidation and athletic recovery.",
      ielts_tip: "Dùng 'optimal' thay vì nói 'best possible condition'."
    }
  }
};
