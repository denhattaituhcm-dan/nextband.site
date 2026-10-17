/**
 * BUILDER ARENA QUESTION BANK - WEEK 1
 * Source: Giáo trình BUILDER 2027 - Đã soát lỗi.docx & Giáo án Builder 2027
 * Target: Band 5.0 IELTS
 * Day 1: Writing (01 câu có bao nhiêu mệnh đề? / Finite Verb / Verb types)
 * Day 2: Writing (Modifiers / Prepositions / Adjective Clauses)
 * Day 3: Speaking (Food & Drink / Vowels / Textures / Venues)
 */

export const BUILDER_WEEK_1_QUESTIONS: Record<string, any[]> = {
  "WEEK 1 – DAY 1": [
    {
      id: "builder_w1d1_q01",
      roundIndex: 0,
      prompt: "Trong 4 cấp độ ngôn ngữ (Word, Phrase, Clause, Sentence), thành phần nào bắt buộc phải có đủ cặp Subject và Finite Verb?",
      options: [
        { id: "opt_A", label: "A", text: "Clause" },
        { id: "opt_B", label: "B", text: "Phrase" },
        { id: "opt_C", label: "C", text: "Word" },
        { id: "opt_D", label: "D", text: "Modifier" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Clause",
      correctExplanation: "Mệnh đề (Clause) luôn bắt buộc phải có đầy đủ cặp Chủ ngữ (Subject) và Động từ chia thì (Finite Verb). Phrase chỉ là cụm từ liên kết không có S+FV.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Nhầm lẫn giữa Cụm từ (Phrase) và Mệnh đề (Clause)",
        explanation: "Học sinh thường nhầm Phrase có nhiều từ là có thể diễn đạt hành động, nhưng Phrase tuyệt đối không chứa cặp Subject và Finite Verb."
      }
    },
    {
      id: "builder_w1d1_q02",
      roundIndex: 1,
      prompt: "Tìm phương án đúng ngữ pháp điền vào chỗ trống: \"My primary goal this semester is ______ an overall band score of 6.5.\"",
      options: [
        { id: "opt_A", label: "A", text: "to achieve" },
        { id: "opt_B", label: "B", text: "achieve" },
        { id: "opt_C", label: "C", text: "achieved" },
        { id: "opt_D", label: "D", text: "will achieve" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. to achieve",
      correctExplanation: "Sau động từ to be 'is', ta dùng to-infinitive đóng vai trò bổ ngữ chủ ngữ (Subject Complement). Dùng động từ nguyên mẫu 'achieve' sẽ mắc lỗi 2 Finite Verb trong 1 mệnh đề.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. achieve",
        diagnosticTitle: "Lỗi Double Finite Verb (hai động từ chia thì đi liền nhau)",
        explanation: "Học sinh dịch thô từ tiếng Việt 'Mục tiêu là đạt được' nên đặt ngay động từ 'achieve' sau 'is', vi phạm quy tắc 1 mệnh đề chỉ có 1 Finite Verb."
      }
    },
    {
      id: "builder_w1d1_q03",
      roundIndex: 2,
      prompt: "Câu nào dưới đây sử dụng đúng dạng Động từ làm Chủ ngữ trong mệnh đề?",
      options: [
        { id: "opt_A", label: "A", text: "Learning English helps students communicate with foreigners." },
        { id: "opt_B", label: "B", text: "Learn English helps students communicate with foreigners." },
        { id: "opt_C", label: "C", text: "To learning English helps students communicate with foreigners." },
        { id: "opt_D", label: "D", text: "Learning English help students communicate with foreigners." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Learning English helps students communicate with foreigners.",
      correctExplanation: "Động từ đứng đầu làm chủ ngữ phải ở dạng Gerund (V-ing) và được tính là chủ ngữ số ít, do đó động từ chính phải chia 'helps'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Learn English helps students communicate with foreigners.",
        diagnosticTitle: "Dùng Bare Infinitive làm Chủ ngữ",
        explanation: "Học sinh giữ nguyên động từ nguyên mẫu 'Learn' làm chủ ngữ mà quên biến đổi thành Gerund 'Learning'."
      }
    },
    {
      id: "builder_w1d1_q04",
      roundIndex: 3,
      prompt: "Chọn cụm từ chính xác làm Chủ ngữ: \"______ is considered a major advantage in the fashion industry.\"",
      options: [
        { id: "opt_A", label: "A", text: "Being good-looking" },
        { id: "opt_B", label: "B", text: "Good-looking" },
        { id: "opt_C", label: "C", text: "Is good-looking" },
        { id: "opt_D", label: "D", text: "Look good" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Being good-looking",
      correctExplanation: "'Good-looking' là tính từ, không thể tự đứng một mình làm chủ ngữ. Cần thêm danh động từ 'Being' để tạo thành cụm Gerund Phrase đóng vai trò Chủ ngữ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Good-looking",
        diagnosticTitle: "Dùng tính từ đơn độc lập làm Chủ ngữ",
        explanation: "Trong tiếng Việt có thể nói 'Đẹp là một lợi thế', dẫn đến việc học sinh đặt ngay tính từ 'Good-looking' làm chủ ngữ trong tiếng Anh."
      }
    },
    {
      id: "builder_w1d1_q05",
      roundIndex: 4,
      prompt: "Câu nào dưới đây mắc lỗi ngữ pháp THIẾU động từ 'to be'?",
      options: [
        { id: "opt_A", label: "A", text: "Many parents proud of their children when they succeed." },
        { id: "opt_B", label: "B", text: "Many parents are proud of their children when they succeed." },
        { id: "opt_C", label: "C", text: "Many parents take pride in their children when they succeed." },
        { id: "opt_D", label: "D", text: "Many parents feel proud of their children when they succeed." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Many parents proud of their children when they succeed.",
      correctExplanation: "'Proud' là tính từ, bắt buộc phải đi kèm với hệ từ (linking verb) như 'are proud of' hoặc 'feel proud of'. Câu A hoàn toàn thiếu Finite Verb trong mệnh đề chính.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Many parents take pride in their children when they succeed.",
        diagnosticTitle: "Nghi ngờ cụm từ thành ngữ 'take pride in'",
        explanation: "'Take pride in' là cụm động từ chuẩn xác (pride là danh từ), học sinh nhầm rằng cụm này sai thay vì nhận diện lỗi thiếu to be ở câu A."
      }
    },
    {
      id: "builder_w1d1_q06",
      roundIndex: 5,
      prompt: "Động từ 'decline' là Nội động từ (Intransitive Verb). Câu nào dưới đây dùng SAI bản chất ngữ pháp của từ này?",
      options: [
        { id: "opt_A", label: "A", text: "The ineffective marketing campaign declined company profits." },
        { id: "opt_B", label: "B", text: "Company profits declined sharply due to the ineffective campaign." },
        { id: "opt_C", label: "C", text: "The campaign caused company profits to decline sharply." },
        { id: "opt_D", label: "D", text: "A severe decline in company profits was recorded recently." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The ineffective marketing campaign declined company profits.",
      correctExplanation: "Khi mang nghĩa suy giảm số liệu, 'decline' là nội động từ (Vi), không bao giờ có tân ngữ trực tiếp (không dùng 'decline profits'). Phải dùng 'profits declined' hoặc dùng ngoại động từ 'decreased/reduced profits'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. The campaign caused company profits to decline sharply.",
        diagnosticTitle: "Nhầm lẫn cấu trúc gây khiến (Causative Verb)",
        explanation: "'Cause sth to decline' là cấu trúc hoàn toàn chuẩn vì 'decline' đứng sau tân ngữ đóng vai trò nội động từ của mệnh đề nguyên mẫu."
      }
    },
    {
      id: "builder_w1d1_q07",
      roundIndex: 6,
      prompt: "Chọn phương án đúng thể bị động: \"After years of hard work, she ______ to department manager last week.\"",
      options: [
        { id: "opt_A", label: "A", text: "was promoted" },
        { id: "opt_B", label: "B", text: "promoted" },
        { id: "opt_C", label: "C", text: "has promoted" },
        { id: "opt_D", label: "D", text: "was promoting" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. was promoted",
      correctExplanation: "Được thăng chức là hành động chịu tác động (bị động: be + V3/ed). Hơn nữa có mốc thời gian quá khứ 'last week' nên dùng thì Quá khứ đơn bị động: 'was promoted'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. promoted",
        diagnosticTitle: "Dùng thể chủ động cho động từ mang nghĩa bị động",
        explanation: "Học sinh quen dịch 'cô ấy thăng chức' thành thể chủ động 'she promoted', trong khi tiếng Anh bắt buộc phải dùng bị động 'she was promoted'."
      }
    },
    {
      id: "builder_w1d1_q08",
      roundIndex: 7,
      prompt: "Động từ 'discuss' là Ngoại động từ (Vt). Điền phương án chính xác: \"The committee met to ______ the upcoming budget cuts.\"",
      options: [
        { id: "opt_A", label: "A", text: "discuss" },
        { id: "opt_B", label: "B", text: "discuss about" },
        { id: "opt_C", label: "C", text: "discuss on" },
        { id: "opt_D", label: "D", text: "discuss with" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. discuss",
      correctExplanation: "'Discuss' là ngoại động từ trực tiếp (Vt + Object), tuyệt đối không đi kèm giới từ 'about' hay 'on'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. discuss about",
        diagnosticTitle: "Chèn giới từ 'about' sau discuss do dịch từ tiếng Việt",
        explanation: "Học sinh thường dịch 'thảo luận về' thành 'discuss about'. Đây là lỗi sai cực kỳ phổ biến trong IELTS Writing Task 2."
      }
    },
    {
      id: "builder_w1d1_q09",
      roundIndex: 8,
      prompt: "Chọn động từ kết hợp (Collocation) chuẩn nhất: \"Modern technology allows students to ______ vital educational resources.\"",
      options: [
        { id: "opt_A", label: "A", text: "gain access to" },
        { id: "opt_B", label: "B", text: "make access to" },
        { id: "opt_C", label: "C", text: "take access to" },
        { id: "opt_D", label: "D", text: "do access to" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. gain access to",
      correctExplanation: "Collocation học thuật chuẩn xác là 'gain access to' hoặc 'have access to' (tiếp cận với nguồn tài nguyên). Không dùng make/take/do với access.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. make access to",
        diagnosticTitle: "Dùng sai động từ kết hợp với danh từ 'access'",
        explanation: "Học sinh thường lạm dụng động từ 'make' cho mọi danh từ mang nghĩa 'tạo ra sự tiếp cận'."
      }
    },
    {
      id: "builder_w1d1_q10",
      roundIndex: 9,
      prompt: "Chọn cụm Collocation tự nhiên và học thuật nhất: \"The government should ______ to combat plastic pollution.\"",
      options: [
        { id: "opt_A", label: "A", text: "make greater efforts" },
        { id: "opt_B", label: "B", text: "do greater efforts" },
        { id: "opt_C", label: "C", text: "take greater efforts" },
        { id: "opt_D", label: "D", text: "pay greater efforts" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. make greater efforts",
      correctExplanation: "Collocation cố định của danh từ 'effort' luôn là 'make an effort' hoặc 'make greater efforts' (nỗ lực nhiều hơn).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. do greater efforts",
        diagnosticTitle: "Nhầm lẫn giữa cặp động từ Make và Do",
        explanation: "Học sinh hay nhầm hành động nỗ lực thuộc nhóm động từ 'do' thay vì cụm cố định 'make an effort'."
      }
    }
  ],

  "WEEK 1 – DAY 2": [
    {
      id: "builder_w1d2_q01",
      roundIndex: 0,
      prompt: "Điền giới từ học thuật chính xác: \"The municipal council plans to invest heavily ______ renewable energy projects.\"",
      options: [
        { id: "opt_A", label: "A", text: "in" },
        { id: "opt_B", label: "B", text: "on" },
        { id: "opt_C", label: "C", text: "for" },
        { id: "opt_D", label: "D", text: "with" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. in",
      correctExplanation: "Động từ 'invest' luôn đi kèm với giới từ 'in' (invest in something: đầu tư vào cái gì).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. on",
        diagnosticTitle: "Dùng giới từ 'on' cho động từ invest",
        explanation: "Học sinh nhầm với động từ 'spend money ON' nên chọn nhầm 'invest ON'."
      }
    },
    {
      id: "builder_w1d2_q02",
      roundIndex: 1,
      prompt: "Điền giới từ chính xác: \"Digital media exerts a profound influence ______ the reading habits of teenagers.\"",
      options: [
        { id: "opt_A", label: "A", text: "on" },
        { id: "opt_B", label: "B", text: "in" },
        { id: "opt_C", label: "C", text: "to" },
        { id: "opt_D", label: "D", text: "at" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. on",
      correctExplanation: "Cụm danh từ 'influence' / 'impact' / 'effect' luôn đi với giới từ 'on' (have / exert an influence ON something).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. in",
        diagnosticTitle: "Dịch 'ảnh hưởng trong' thành 'influence in'",
        explanation: "Học sinh dịch trực tiếp nghĩa tiếng Việt 'ảnh hưởng trong thói quen' nên chọn 'in' thay vì giới từ chuẩn 'on'."
      }
    },
    {
      id: "builder_w1d2_q03",
      roundIndex: 2,
      prompt: "Chọn giới từ đúng ngữ pháp: \"Tertiary education plays an indispensable role ______ shaping critical thinking skills.\"",
      options: [
        { id: "opt_A", label: "A", text: "in" },
        { id: "opt_B", label: "B", text: "for" },
        { id: "opt_C", label: "C", text: "with" },
        { id: "opt_D", label: "D", text: "about" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. in",
      correctExplanation: "Cấu trúc chuẩn luôn là 'play a role / part IN doing something' (đóng vai trò trong việc gì).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. for",
        diagnosticTitle: "Dịch 'vai trò cho việc' thành 'role for'",
        explanation: "Học sinh hay dùng 'for' theo thói quen diễn đạt mục đích thay vì giới từ chuẩn 'in'."
      }
    },
    {
      id: "builder_w1d2_q04",
      roundIndex: 3,
      prompt: "Chọn cụm phân từ chủ động (Active Participial Phrase) thích hợp: \"The scientist ______ the presentation is an expert in robotics.\"",
      options: [
        { id: "opt_A", label: "A", text: "delivering" },
        { id: "opt_B", label: "B", text: "is delivering" },
        { id: "opt_C", label: "C", text: "delivered" },
        { id: "opt_D", label: "D", text: "was delivering" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. delivering",
      correctExplanation: "'Delivering the presentation' là cụm phân từ hiện tại (Present Participle) rút gọn từ 'who is delivering', mang nghĩa chủ động. Nếu chọn 'is delivering' câu sẽ có 2 Finite Verb ('is delivering' và 'is').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. is delivering",
        diagnosticTitle: "Lỗi Double Finite Verb khi rút gọn mệnh đề quan hệ",
        explanation: "Học sinh chọn động từ chia thì đầy đủ 'is delivering' khiến mệnh đề chính bị thừa động từ to be thứ hai ('is an expert')."
      }
    },
    {
      id: "builder_w1d2_q05",
      roundIndex: 4,
      prompt: "Chọn cụm phân từ bị động (Past Participial Phrase): \"Academic essays ______ in simple English are easier for beginners to digest.\"",
      options: [
        { id: "opt_A", label: "A", text: "written" },
        { id: "opt_B", label: "B", text: "writing" },
        { id: "opt_C", label: "C", text: "are written" },
        { id: "opt_D", label: "D", text: "were written" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. written",
      correctExplanation: "Rút gọn từ mệnh đề bị động 'which are written' thành quá khứ phân từ 'written'. Câu đã có động từ chính là 'are easier'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. are written",
        diagnosticTitle: "Giữ nguyên động từ chia thì bị động gây lỗi Double-FV",
        explanation: "Học sinh thấy nghĩa bị động liền chọn cả 'are written' mà không nhận ra câu đã có Finite Verb chính ở phía sau ('are easier')."
      }
    },
    {
      id: "builder_w1d2_q06",
      roundIndex: 5,
      prompt: "Chọn đại từ quan hệ trong mệnh đề không xác định: \"Her latest publication, ______ took two years of fieldwork, won a national award.\"",
      options: [
        { id: "opt_A", label: "A", text: "which" },
        { id: "opt_B", label: "B", text: "that" },
        { id: "opt_C", label: "C", text: "what" },
        { id: "opt_D", label: "D", text: "who" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. which",
      correctExplanation: "Mệnh đề quan hệ không xác định (đặt giữa hai dấu phẩy) chỉ vật bắt buộc phải dùng 'which', tuyệt đối không bao giờ dùng 'that'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. that",
        diagnosticTitle: "Dùng 'that' trong mệnh đề có dấu phẩy",
        explanation: "Quy tắc cơ bản: Đại từ quan hệ 'that' không bao giờ đứng sau dấu phẩy trong Non-defining relative clause."
      }
    },
    {
      id: "builder_w1d2_q07",
      roundIndex: 6,
      prompt: "Chọn cấu trúc mệnh đề quan hệ thay thế cho CẢ mệnh đề đứng trước: \"The company lowered product prices, ______ attracted thousands of customers.\"",
      options: [
        { id: "opt_A", label: "A", text: "which" },
        { id: "opt_B", label: "B", text: "that" },
        { id: "opt_C", label: "C", text: "where" },
        { id: "opt_D", label: "D", text: "this" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. which",
      correctExplanation: "Cấu trúc ', which + V' (Sentential Relative Clause) dùng để thay thế cho toàn bộ sự việc nêu ở mệnh đề trước. 'that' hoặc 'this' không thể dùng nối hai mệnh đề sau dấu phẩy nếu không có liên từ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. this",
        diagnosticTitle: "Lỗi Comma Splice khi dùng đại từ chỉ định 'this'",
        explanation: "Dùng ', this attracted...' mắc lỗi Comma Splice (ghép 2 mệnh đề độc lập chỉ bằng dấu phẩy mà không có liên từ kết hợp)."
      }
    },
    {
      id: "builder_w1d2_q08",
      roundIndex: 7,
      prompt: "Trong câu: \"The manager handed the newly hired intern a detailed assignment\", tân ngữ trực tiếp (Direct Object) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "a detailed assignment" },
        { id: "opt_B", label: "B", text: "the newly hired intern" },
        { id: "opt_C", label: "C", text: "The manager" },
        { id: "opt_D", label: "D", text: "handed" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. a detailed assignment",
      correctExplanation: "Tân ngữ trực tiếp (Direct Object) là vật chịu tác động trực tiếp của hành động giao việc: 'a detailed assignment'. Người nhận ('the newly hired intern') là tân ngữ gián tiếp (Indirect Object).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. the newly hired intern",
        diagnosticTitle: "Nhầm lẫn giữa Tân ngữ trực tiếp và gián tiếp",
        explanation: "Học sinh thấy cụm 'the newly hired intern' đứng ngay sau động từ handed nên nhầm đây là tân ngữ trực tiếp."
      }
    },
    {
      id: "builder_w1d2_q09",
      roundIndex: 8,
      prompt: "Điền cụm từ chỉ nguyên nhân đứng trước một Danh từ: \"______ rapid industrial expansion, air quality has degraded significantly.\"",
      options: [
        { id: "opt_A", label: "A", text: "Due to" },
        { id: "opt_B", label: "B", text: "Because" },
        { id: "opt_C", label: "C", text: "Since" },
        { id: "opt_D", label: "D", text: "As" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Due to",
      correctExplanation: "'Due to' / 'Owing to' là giới từ, theo sau là Noun Phrase ('rapid industrial expansion'). 'Because/Since/As' là liên từ, bắt buộc theo sau phải là Clause (S+V).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Because",
        diagnosticTitle: "Dùng liên từ 'Because' trước một Cụm danh từ",
        explanation: "Học sinh không phân biệt được 'Because + Clause' với 'Due to / Because of + Noun Phrase'."
      }
    },
    {
      id: "builder_w1d2_q10",
      roundIndex: 9,
      prompt: "Câu nào dưới đây chứa Cụm giới từ (Prepositional Phrase) bổ nghĩa cho TOÀN BỘ câu?",
      options: [
        { id: "opt_A", label: "A", text: "In my opinion, renewable energy will replace fossil fuels." },
        { id: "opt_B", label: "B", text: "The documents on the executive desk belong to the director." },
        { id: "opt_C", label: "C", text: "The students walked quietly through the central library." },
        { id: "opt_D", label: "D", text: "He purchased a vintage car with genuine leather seats." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. In my opinion, renewable energy will replace fossil fuels.",
      correctExplanation: "'In my opinion' là cụm giới từ đứng đầu câu có chức năng Sentence Modifier (bổ nghĩa cho toàn bộ mệnh đề). Các câu còn lại cụm giới từ chỉ bổ nghĩa cho danh từ hoặc động từ đơn lẻ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The documents on the executive desk belong to the director.",
        diagnosticTitle: "Nhầm lẫn cụm giới từ bổ nghĩa danh từ với bổ nghĩa câu",
        explanation: "'On the executive desk' chỉ đóng vai trò Modifier bổ nghĩa hạn định cho danh từ 'documents', không bổ nghĩa cho cả câu."
      }
    }
  ],

  "WEEK 1 – DAY 3": [
    {
      id: "builder_w1d3_q01",
      roundIndex: 0,
      prompt: "Từ vựng nào dưới đây có phần gạch chân phát âm là nguyên âm ngắn /e/?",
      options: [
        { id: "opt_A", label: "A", text: "breakfast" },
        { id: "opt_B", label: "B", text: "cereal" },
        { id: "opt_C", label: "C", text: "cheese" },
        { id: "opt_D", label: "D", text: "bean" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. breakfast",
      correctExplanation: "Trong 'breakfast', nhóm chữ 'ea' phát âm là nguyên âm ngắn /e/ (/ˈbrekfəst/). Trong khi 'cheese' và 'bean' phát âm là nguyên âm dài /iː/.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. bean",
        diagnosticTitle: "Nhầm 'ea' trong breakfast phát âm dài /iː/ giống bean",
        explanation: "Học sinh thường nhìn mặt chữ 'ea' và quy chụp phát âm thành /iː/ giống như 'meat' hay 'bean'."
      }
    },
    {
      id: "builder_w1d3_q02",
      roundIndex: 1,
      prompt: "Từ 'cereal' (ngũ cốc) có phiên âm IPA chuẩn xác là:",
      options: [
        { id: "opt_A", label: "A", text: "/ˈsɪəriəl/" },
        { id: "opt_B", label: "B", text: "/ˈseriəl/" },
        { id: "opt_C", label: "C", text: "/ˈsæriəl/" },
        { id: "opt_D", label: "D", text: "/ˈsiːriəl/" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. /ˈsɪəriəl/",
      correctExplanation: "'Cereal' bắt đầu bằng nguyên âm đôi /ɪə/ (/ˈsɪəriəl/).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. /ˈseriəl/",
        diagnosticTitle: "Phát âm theo mặt chữ tiếng Việt thành /ˈseriəl/",
        explanation: "Học sinh hay đọc âm 'ce' thành 'xe' ngắn /ˈseriəl/ thay vì nguyên âm đôi /ɪə/."
      }
    },
    {
      id: "builder_w1d3_q03",
      roundIndex: 2,
      prompt: "Điền thành ngữ (Idiom) chuẩn xác: \"I always order chocolate cake after dinner because I have a ______.\"",
      options: [
        { id: "opt_A", label: "A", text: "sweet tooth" },
        { id: "opt_B", label: "B", text: "sweet mouth" },
        { id: "opt_C", label: "C", text: "sweet tongue" },
        { id: "opt_D", label: "D", text: "sweet taste" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. sweet tooth",
      correctExplanation: "Thành ngữ chuẩn của người bản xứ chỉ người thích ăn đồ ngọt là 'have a sweet tooth'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. sweet mouth",
        diagnosticTitle: "Dịch thô cụm từ 'hảo ngọt' thành 'sweet mouth'",
        explanation: "Học sinh liên tưởng ăn ngọt bằng miệng nên tự ghép 'sweet mouth' thay vì dùng thành ngữ chuẩn 'sweet tooth'."
      }
    },
    {
      id: "builder_w1d3_q04",
      roundIndex: 3,
      prompt: "Chọn tính từ miêu tả kết cấu giòn rụm của khoai tây chiên (French fries) hoặc gà rán:",
      options: [
        { id: "opt_A", label: "A", text: "crispy" },
        { id: "opt_B", label: "B", text: "chewy" },
        { id: "opt_C", label: "C", text: "bland" },
        { id: "opt_D", label: "D", text: "tender" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. crispy",
      correctExplanation: "'Crispy' có nghĩa là giòn, dễ gãy vỡ khi nhai (đặc trưng của khoai chiên, gà rán). 'Chewy' là dai; 'bland' là nhạt nhẽo; 'tender' là mềm.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. chewy",
        diagnosticTitle: "Nhầm lẫn giữa tính từ 'chewy' (dai) và 'crispy' (giòn)",
        explanation: "Học sinh nhớ mang máng âm c-w nên chọn nhầm 'chewy' vốn chỉ đồ ăn dai như kẹo cao su hoặc mực."
      }
    },
    {
      id: "builder_w1d3_q05",
      roundIndex: 4,
      prompt: "Khi món canh nấu thiếu gia vị và muối, vị rất nhạt nhẽo, ta dùng tính từ miêu tả nào?",
      options: [
        { id: "opt_A", label: "A", text: "bland" },
        { id: "opt_B", label: "B", text: "tender" },
        { id: "opt_C", label: "C", text: "spicy" },
        { id: "opt_D", label: "D", text: "flavorful" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. bland",
      correctExplanation: "'Bland' nghĩa là nhạt nhẽo, thiếu hương vị. 'Flavorful' là đậm đà; 'tender' là mềm; 'spicy' là cay.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. tender",
        diagnosticTitle: "Nhầm lẫn giữa tính từ chỉ kết cấu và chỉ hương vị",
        explanation: "'Tender' chỉ độ mềm của thịt, không dùng chỉ vị nhạt của món ăn."
      }
    },
    {
      id: "builder_w1d3_q06",
      roundIndex: 5,
      prompt: "Thịt bò được hầm kỹ, thớ thịt rất mềm và dễ nhai. Tính từ miêu tả chuẩn xác là:",
      options: [
        { id: "opt_A", label: "A", text: "tender" },
        { id: "opt_B", label: "B", text: "chewy" },
        { id: "opt_C", label: "C", text: "crispy" },
        { id: "opt_D", label: "D", text: "bitter" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. tender",
      correctExplanation: "'Tender' chỉ thịt mềm, mọng nước, dễ cắt và nhai. Ngược lại với 'tough' (dai/cứng).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. chewy",
        diagnosticTitle: "Nhầm lẫn giữa 'chewy' (dai khó nhai) và 'tender' (mềm dễ ăn)",
        explanation: "Học sinh chọn 'chewy' vì nghĩ thịt hầm nhai được nhiều, nhưng 'chewy' trong tiếng Anh mang nghĩa tiêu cực là dai nhách."
      }
    },
    {
      id: "builder_w1d3_q07",
      roundIndex: 6,
      prompt: "Để miêu tả nước dùng phở thơm ngon, đậm đà được ninh từ xương và thảo quả, cụm từ chuẩn là:",
      options: [
        { id: "opt_A", label: "A", text: "flavorful broth" },
        { id: "opt_B", label: "B", text: "noisy soup" },
        { id: "opt_C", label: "C", text: "heavy water" },
        { id: "opt_D", label: "D", text: "dense liquid" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. flavorful broth",
      correctExplanation: "'Flavorful broth' là cụm từ ẩm thực cao cấp chỉ nước hầm xương đậm đà hương vị thơm ngon.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. dense liquid",
        diagnosticTitle: "Dịch nghĩa kỹ thuật thay vì dùng Collocation ẩm thực",
        explanation: "Học sinh dịch 'nước đậm đặc' thành 'dense liquid', nghe như thuật ngữ hóa học thay vì ngôn ngữ miêu tả ẩm thực."
      }
    },
    {
      id: "builder_w1d3_q08",
      roundIndex: 7,
      prompt: "Để chỉ các quán ăn truyền thống bình dân, lịch sự (như quán phở, bún chả), danh từ phù hợp nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "local eatery" },
        { id: "opt_B", label: "B", text: "banquet hall" },
        { id: "opt_C", label: "C", text: "presidential lounge" },
        { id: "opt_D", label: "D", text: "culinary palace" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. local eatery",
      correctExplanation: "'Local eatery' /ˈiːtəri/ là danh từ thông dụng để chỉ quán ăn địa phương bình dân, ấm cúng, phục vụ các món ăn quen thuộc.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. banquet hall",
        diagnosticTitle: "Dùng từ quá trang trọng cho quán ăn bình dân",
        explanation: "'Banquet hall' là sảnh tiệc lớn sang trọng dành cho hội nghị hoặc đám cưới."
      }
    },
    {
      id: "builder_w1d3_q09",
      roundIndex: 8,
      prompt: "Một quầy hàng bán thức ăn vỉa hè với xe đẩy và bàn ghế nhựa được gọi chính xác trong tiếng Anh là:",
      options: [
        { id: "opt_A", label: "A", text: "street food stall" },
        { id: "opt_B", label: "B", text: "grocery showroom" },
        { id: "opt_C", label: "C", text: "dining warehouse" },
        { id: "opt_D", label: "D", text: "snack department" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. street food stall",
      correctExplanation: "'Street food stall' là quầy bán đồ ăn đường phố di động hoặc cố định ở vỉa hè.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. grocery showroom",
        diagnosticTitle: "Nhầm lẫn khái niệm sảnh trưng bày với quầy bán thức ăn",
        explanation: "'Showroom' dùng cho nơi trưng bày ô tô hoặc đồ nội thất cao cấp, không dùng cho quán ăn đường phố."
      }
    },
    {
      id: "builder_w1d3_q10",
      roundIndex: 9,
      prompt: "Chọn cụm Collocation tự nhiên để diễn đạt mục đích duy trì lượng nước cần thiết cho cơ thể mỗi ngày:",
      options: [
        { id: "opt_A", label: "A", text: "keep myself hydrated" },
        { id: "opt_B", label: "B", text: "make myself watery" },
        { id: "opt_C", label: "C", text: "fill myself liquid" },
        { id: "opt_D", label: "D", text: "retain my moisture" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. keep myself hydrated",
      correctExplanation: "Collocation tự nhiên của người bản xứ khi nói về việc uống đủ nước là 'stay hydrated' hoặc 'keep oneself hydrated'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. make myself watery",
        diagnosticTitle: "Dịch từng chữ từ tiếng Việt sang tiếng Anh",
        explanation: "'Watery' có nghĩa là lỏng bỏng, nhiều nước (như cháo loãng hay mắt ươn ướt), không dùng để nói về tình trạng sức khỏe đủ nước của cơ thể."
      }
    }
  ]
};
