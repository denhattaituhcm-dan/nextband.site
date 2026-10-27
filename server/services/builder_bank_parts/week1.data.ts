/**
 * BUILDER ARENA QUESTION BANK - WEEK 1
 * Source: Giáo trình BUILDER 2027 - Đã soát lỗi.docx & Giáo án Builder 2027 (Teacher Guide)
 * Target: IELTS Band 5.0
 * 
 * Day 1: Writing (01 câu có bao nhiêu mệnh đề? / Finite Verb / Double-FV / 3 loại động từ Vi - Vt - Vl / Collocation)
 * Day 2: Writing (Modifiers / Adjective & Adverb / Participial Phrase / Prepositional Phrase / Adjective Clause "that" vs "which")
 * Day 3: Speaking (Food & Drink / Vowels / Textures & Flavors / Quán ăn Eatery - Food stall - Dining spot / Speaking Flow)
 */

export const BUILDER_WEEK_1_QUESTIONS: Record<string, any[]> = {
  "WEEK 1 – DAY 1": [
    {
      id: "builder_w1d1_q01",
      roundIndex: 0,
      prompt: "Trong câu: 'My goal is have 6.5 IELTS', lỗi ngữ pháp cốt lõi ở đây là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Lỗi Double Finite Verb (thừa 2 động từ chia thì 'is' và 'have')" },
        { id: "opt_B", label: "B", text: "Thiếu mạo từ 'a' trước 6.5 IELTS" },
        { id: "opt_C", label: "C", text: "Chủ ngữ 'My goal' không đi được với to be 'is'" },
        { id: "opt_D", label: "D", text: "Từ 'goal' phải đổi thành 'target'" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Lỗi Double Finite Verb (thừa 2 động từ chia thì 'is' và 'have')",
      correctExplanation: "Một mệnh đề đơn độc lập chỉ được phép có DUY NHẤT 01 Finite Verb (động từ chia thì). 'Is' đã là Finite Verb đóng vai trò vị ngữ, nên 'have' phải chuyển thành Non-finite Verb (to have 6.5 IELTS hoặc to achieve 6.5 IELTS).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Thiếu mạo từ 'a' trước 6.5 IELTS",
        diagnosticTitle: "L1 Translation & Bỏ qua nguyên tắc Finite Verb",
        explanation: "Học sinh thường dịch nhẩm theo tiếng Việt 'mục tiêu của tôi là có' và không nhận diện được 'have' là động từ nguyên mẫu không thể đứng trơ trọi sau 'is'."
      }
    },
    {
      id: "builder_w1d1_q02",
      roundIndex: 1,
      prompt: "Xác định câu sửa CHUẨN XÁC nhất cho câu sai: 'Learn English helps me can watch films without subtitles.'?",
      options: [
        { id: "opt_A", label: "A", text: "Learning English helps me watch films without subtitles." },
        { id: "opt_B", label: "B", text: "Learn English help me to can watch films without subtitles." },
        { id: "opt_C", label: "C", text: "To learn English helping me can watch films without subtitles." },
        { id: "opt_D", label: "D", text: "Learning English helps me can watch films without subtitles." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Learning English helps me watch films without subtitles.",
      correctExplanation: "Câu gốc có 2 lỗi nghiêm trọng: (1) Động từ 'Learn' đứng đầu làm chủ ngữ phải chuyển thành Gerund 'Learning'; (2) Sau 'helps me' không dùng modal verb 'can' (help someone do/to do something).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Learning English helps me can watch films without subtitles.",
        diagnosticTitle: "Thói quen dịch 'giúp tôi có thể' (help me can)",
        explanation: "Học sinh Việt Nam rất hay dịch word-by-word 'help me can'. Trong tiếng Anh, bản thân 'help' đã hàm ý trao khả năng, theo sau là bare infinitive (watch) hoặc to-infinitive."
      }
    },
    {
      id: "builder_w1d1_q03",
      roundIndex: 2,
      prompt: "Trong câu: 'Many Vietnamese parents proud of their children get a high score at school.', câu này mắc lỗi tử huyệt gì?",
      options: [
        { id: "opt_A", label: "A", text: "Thiếu to be ('are proud of') và thừa Finite Verb 'get'" },
        { id: "opt_B", label: "B", text: "Dùng sai giới từ 'of', phải đổi thành 'proud with'" },
        { id: "opt_C", label: "C", text: "'children' là số ít nên động từ 'get' phải thêm 's'" },
        { id: "opt_D", label: "D", text: "Không được dùng danh từ số nhiều 'parents'" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thiếu to be ('are proud of') và thừa Finite Verb 'get'",
      correctExplanation: "'Proud' là tính từ (Adjective), không thể tự làm vị ngữ mà cần linking verb: 'are proud of'. Sau giới từ 'of' cần V-ing ('getting') hoặc mệnh đề quan hệ ('who get').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Dùng sai giới từ 'of', phải đổi thành 'proud with'",
        diagnosticTitle: "Nhầm lẫn từ loại Tính từ sang Động từ",
        explanation: "Học sinh thường nghĩ 'tự hào' là hành động nên coi 'proud' như động từ chia thì, dẫn đến việc bỏ quên động từ 'to be'."
      }
    },
    {
      id: "builder_w1d1_q04",
      roundIndex: 3,
      prompt: "Xét câu: 'That terrible marketing campaign has declined our sales in the last quarter.' Lỗi sai của động từ 'decline' ở đây là gì?",
      options: [
        { id: "opt_A", label: "A", text: "'Decline' là Nội động từ, không có tân ngữ trực tiếp theo sau" },
        { id: "opt_B", label: "B", text: "'Decline' phải chia ở thì quá khứ đơn thay vì hiện tại hoàn thành" },
        { id: "opt_C", label: "C", text: "'Decline' chỉ dùng cho người, không dùng cho sự vật" },
        { id: "opt_D", label: "D", text: "Phải dùng giới từ 'with' sau 'decline'" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 'Decline' là Nội động từ, không có tân ngữ trực tiếp theo sau",
      correctExplanation: "Động từ 'decline' mang nghĩa sụt giảm là Intransitive Verb (Vi). Ta phải viết: 'Our sales have declined...' hoặc dùng ngoại động từ: 'has reduced / decreased our sales'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. 'Decline' phải chia ở thì quá khứ đơn thay vì hiện tại hoàn thành",
        diagnosticTitle: "Nhầm lẫn giữa Nội động từ (Vi) và Ngoại động từ (Vt)",
        explanation: "Học sinh thường nghĩ từ nào mang nghĩa giảm cũng có thể tác động lên tân ngữ (làm giảm cái gì), dẫn đến sai bản chất cú pháp của Vi."
      }
    },
    {
      id: "builder_w1d1_q05",
      roundIndex: 4,
      prompt: "Câu nào dưới đây dùng SAI cách của Ngoại động từ (Transitive Verb - Vt)?",
      options: [
        { id: "opt_A", label: "A", text: "The managers are discussing about downsizing our department." },
        { id: "opt_B", label: "B", text: "The managers are discussing downsizing our department." },
        { id: "opt_C", label: "C", text: "The committee approved the new environmental policy." },
        { id: "opt_D", label: "D", text: "Modern technology helps individuals access information quickly." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The managers are discussing about downsizing our department.",
      correctExplanation: "'Discuss' là Ngoại động từ (Transitive Verb), đi trực tiếp với tân ngữ [discuss something], KHÔNG ĐI KÈM giới từ 'about'. Câu đúng: 'discussing downsizing...'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The managers are discussing downsizing our department.",
        diagnosticTitle: "Thêm giới từ thừa theo thói quen dịch tiếng Việt (thảo luận về)",
        explanation: "Học sinh Việt Nam nói 'thảo luận về' nên quen tay thêm 'about' sau discuss. Đây là một trong những lỗi trừ điểm Lexical & Grammar điển hình ở Band 5.0."
      }
    },
    {
      id: "builder_w1d1_q06",
      roundIndex: 5,
      prompt: "Trong đoạn trích: 'The canopy prevents surface runoff by intercepting heavy rainfall so that water can drip down slowly...', mệnh đề chính (Main Clause) có trục [Subject + Finite Verb] là gì?",
      options: [
        { id: "opt_A", label: "A", text: "[Subject: The canopy] + [Finite Verb: prevents]" },
        { id: "opt_B", label: "B", text: "[Subject: heavy rainfall] + [Finite Verb: intercepting]" },
        { id: "opt_C", label: "C", text: "[Subject: water] + [Finite Verb: can drip]" },
        { id: "opt_D", label: "D", text: "[Subject: surface runoff] + [Finite Verb: by]" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. [Subject: The canopy] + [Finite Verb: prevents]",
      correctExplanation: "Trục xương sống của câu chính là [The canopy prevents surface runoff]. Phần 'by intercepting...' là cụm giới từ chỉ phương thức (Modifier), và 'so that water can drip...' là mệnh đề trạng ngữ chỉ mục đích.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. [Subject: water] + [Finite Verb: can drip]",
        diagnosticTitle: "Nhầm lẫn giữa Mệnh đề phụ thuộc và Mệnh đề chính",
        explanation: "Học sinh thấy 'water can drip' đứng sau 'so that' có S+V nên tưởng là câu chính, nhưng đây chỉ là adverbial clause of purpose."
      }
    },
    {
      id: "builder_w1d1_q07",
      roundIndex: 6,
      prompt: "Chọn câu dịch chuẩn ngữ pháp và tự nhiên nhất cho câu: 'Nhiều nhân viên văn phòng thừa nhận lướt Facebook trong giờ làm việc'?",
      options: [
        { id: "opt_A", label: "A", text: "Many office workers admit scrolling Facebook during working hours." },
        { id: "opt_B", label: "B", text: "Many office workers admit to scroll Facebook during working hours." },
        { id: "opt_C", label: "C", text: "Many office workers admit that scroll Facebook in work time." },
        { id: "opt_D", label: "D", text: "Many office workers are admit scrolling Facebook during work hours." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Many office workers admit scrolling Facebook during working hours.",
      correctExplanation: "Động từ 'admit' đi với V-ing (admit doing something) hoặc 'admit to doing something'. Không dùng 'admit to + V-nguyên mẫu' và không chêm 'are' trước 'admit'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Many office workers admit to scroll Facebook during working hours.",
        diagnosticTitle: "Nhầm lẫn mẫu động từ (Gerund vs To-infinitive)",
        explanation: "Học sinh thường mặc định 'to' luôn đi với động từ nguyên thể, không phân biệt được động từ bắt buộc đi với V-ing như admit, consider, avoid."
      }
    },
    {
      id: "builder_w1d1_q08",
      roundIndex: 7,
      prompt: "Collocation học thuật trong IELTS Writing: Điền động từ chính xác vào câu: 'The government should ________ greater efforts to preserve the natural habitat.'?",
      options: [
        { id: "opt_A", label: "A", text: "make" },
        { id: "opt_B", label: "B", text: "do" },
        { id: "opt_C", label: "C", text: "take" },
        { id: "opt_D", label: "D", text: "give" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. make",
      correctExplanation: "Collocation chuẩn với 'effort' là 'make an effort / make efforts' (nỗ lực). Không dùng 'do effort'.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. do",
        diagnosticTitle: "Nhầm lẫn kinh điển Make vs Do",
        explanation: "Học sinh Việt Nam thường dùng 'do' cho mọi hành động tạo ra cố gắng, nhưng tiếng Anh quy ước cố định 'make an effort'."
      }
    },
    {
      id: "builder_w1d1_q09",
      roundIndex: 8,
      prompt: "Chọn câu viết chuẩn cấu trúc 1 mệnh đề (Target Band 5.0): 'Dành quá nhiều thời gian cho công việc mà không tập thể dục là một nguyên nhân gây béo phì.'?",
      options: [
        { id: "opt_A", label: "A", text: "Spending too much time on work without exercising is a major cause of obesity." },
        { id: "opt_B", label: "B", text: "Spend too much time for work without exercise is a cause of obesity." },
        { id: "opt_C", label: "C", text: "Spending too much time on work without exercise causes to be obesity." },
        { id: "opt_D", label: "D", text: "Too much time on work without exercising it causes obesity." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Spending too much time on work without exercising is a major cause of obesity.",
      correctExplanation: "Cụm danh động từ 'Spending too much time on work without exercising' đóng vai trò Subject số ít, đi với Finite Verb 'is'. Giới từ 'without' đi với V-ing 'exercising'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Spend too much time for work without exercise is a cause of obesity.",
        diagnosticTitle: "Dùng động từ nguyên mẫu làm chủ ngữ (L1 error)",
        explanation: "Học sinh hay viết 'Spend time... is' thay vì chuyển động từ thành Gerund 'Spending'."
      }
    },
    {
      id: "builder_w1d1_q10",
      roundIndex: 9,
      prompt: "Khi nói về sự liên kết giữa các cấp độ ngôn ngữ trong IELTS, nhận định nào dưới đây là ĐÚNG BẢN CHẤT?",
      options: [
        { id: "opt_A", label: "A", text: "Clause bắt buộc phải có cặp Subject + Finite Verb; Phrase thì không có cặp này." },
        { id: "opt_B", label: "B", text: "Phrase luôn luôn dài hơn và phức tạp hơn Clause." },
        { id: "opt_C", label: "C", text: "Một Sentence chỉ được phép chứa duy nhất một Clause." },
        { id: "opt_D", label: "D", text: "Paragraph chỉ cần tập hợp từ vựng nâng cao mà không cần câu chủ đề Topic Sentence" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Clause bắt buộc phải có cặp Subject + Finite Verb; Phrase thì không có cặp này.",
      correctExplanation: "Theo nấc thang ngôn ngữ: Word -> Phrase (cụm không S+V) -> Clause (mệnh đề CÓ S+FV) -> Sentence (câu hoàn chỉnh 1 hoặc nhiều mệnh đề) -> Paragraph (đoạn văn xoay quanh 1 ý chính).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase luôn luôn dài hơn và phức tạp hơn Clause.",
        diagnosticTitle: "Đánh đồng độ dài với bản chất mệnh đề",
        explanation: "Một cụm danh từ rất dài vẫn chỉ là Phrase nếu nó không có Finite Verb chia thì."
      }
    }
  ],

  "WEEK 1 – DAY 2": [
    {
      id: "builder_w1d2_q01",
      roundIndex: 0,
      prompt: "Modifier (Thành phần bổ nghĩa) trong câu có đặc điểm cốt lõi nào sau đây?",
      options: [
        { id: "opt_A", label: "A", text: "Không bắt buộc về mặt ngữ pháp; nếu bỏ đi thì câu vẫn đúng nhưng ít chi tiết hơn." },
        { id: "opt_B", label: "B", text: "Luôn luôn bắt buộc phải có thì câu mới có nghĩa trọn vẹn." },
        { id: "opt_C", label: "C", text: "Bắt buộc phải đứng ở đầu câu, trước chủ ngữ." },
        { id: "opt_D", label: "D", text: "Chỉ bao gồm tính từ đơn lẻ, không thể là cụm từ hay mệnh đề." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Không bắt buộc về mặt ngữ pháp; nếu bỏ đi thì câu vẫn đúng nhưng ít chi tiết hơn.",
      correctExplanation: "Bản chất của Modifier là cung cấp thêm thông tin chi tiết (thời gian, địa điểm, đặc điểm, nguyên nhân). Bỏ modifier đi thì trục xương sống [S + FV + O] vẫn hoàn chỉnh ngữ pháp.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Luôn luôn bắt buộc phải có thì câu mới có nghĩa trọn vẹn.",
        diagnosticTitle: "Nhầm lẫn giữa thành phần cốt lõi và thành phần bổ trợ",
        explanation: "Học sinh thường nhầm modifier là thành phần nòng cốt như Subject hoặc Verb."
      }
    },
    {
      id: "builder_w1d2_q02",
      roundIndex: 1,
      prompt: "Trong câu: 'The girl, wearing a red dress, is my sister.', cụm 'wearing a red dress' là loại Modifier nào?",
      options: [
        { id: "opt_A", label: "A", text: "Participial Phrase bổ nghĩa cho danh từ The girl" },
        { id: "opt_B", label: "B", text: "Prepositional Phrase" },
        { id: "opt_C", label: "C", text: "Adverbial Clause" },
        { id: "opt_D", label: "D", text: "Main Clause" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Participial Phrase bổ nghĩa cho danh từ The girl",
      correctExplanation: "'Wearing a red dress' bắt đầu bằng hiện tại phân từ V-ing mang nghĩa chủ động (rút gọn từ 'who is wearing...'), đóng vai trò cụm phân từ bổ nghĩa cho danh từ đứng trước 'The girl'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Main Clause",
        diagnosticTitle: "Nhầm V-ing là động từ chính của câu",
        explanation: "Học sinh hay thấy 'wearing' tưởng là hành động chính của câu, bỏ quên vị ngữ thực sự là 'is my sister'."
      }
    },
    {
      id: "builder_w1d2_q03",
      roundIndex: 2,
      prompt: "Trong câu: 'Books written in English are sometimes hard to understand.', từ 'written' có vai trò cú pháp là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Quá khứ phân từ (V3/-ed) mang nghĩa bị động, bổ nghĩa cho danh từ 'Books'" },
        { id: "opt_B", label: "B", text: "Động từ chia thì quá khứ đơn Finite Verb của câu" },
        { id: "opt_C", label: "C", text: "Tân ngữ trực tiếp của câu" },
        { id: "opt_D", label: "D", text: "Trạng từ chỉ thể cách" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Quá khứ phân từ (V3/-ed) mang nghĩa bị động, bổ nghĩa cho danh từ 'Books'",
      correctExplanation: "'Written in English' là cụm quá khứ phân từ bị động rút gọn từ 'which are written in English', bổ nghĩa cho 'Books'. Động từ chính (Finite Verb) của câu là 'are'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Động từ chia thì quá khứ đơn Finite Verb của câu",
        diagnosticTitle: "Nhầm lẫn giữa Past Participle (Modifier) và Past Simple (Finite Verb)",
        explanation: "Học sinh thấy đuôi V3/V-ed thường mặc định đó là thì quá khứ của câu mà không nhận ra nó chỉ là phân từ bổ nghĩa."
      }
    },
    {
      id: "builder_w1d2_q04",
      roundIndex: 3,
      prompt: "Điền giới từ học thuật chính xác: 'The government should invest heavily ________ renewable energy sources.'?",
      options: [
        { id: "opt_A", label: "A", text: "in" },
        { id: "opt_B", label: "B", text: "on" },
        { id: "opt_C", label: "C", text: "into" },
        { id: "opt_D", label: "D", text: "for" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. in",
      correctExplanation: "Cụm cố định trong văn phong học thuật: 'invest in something' (đầu tư vào cái gì).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. on",
        diagnosticTitle: "Ảnh hưởng của giới từ 'on' trong 'spend on'",
        explanation: "Học sinh nhớ 'spend money ON' nên dễ nhầm sang 'invest ON', trong khi chuẩn ngữ pháp là 'invest IN'."
      }
    },
    {
      id: "builder_w1d2_q05",
      roundIndex: 4,
      prompt: "Điền giới từ học thuật chính xác: 'The Internet has a significant influence ________ the way young people communicate.'?",
      options: [
        { id: "opt_A", label: "A", text: "on" },
        { id: "opt_B", label: "B", text: "in" },
        { id: "opt_C", label: "C", text: "to" },
        { id: "opt_D", label: "D", text: "with" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. on",
      correctExplanation: "Cấu trúc danh từ học thuật: 'have an influence / impact / effect ON somebody/something' (có ảnh hưởng lên ai/cái gì).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. to",
        diagnosticTitle: "Dịch 'ảnh hưởng đến' thành 'to'",
        explanation: "Theo thói quen dịch nghĩa tiếng Việt 'đến' -> 'to', học sinh thường chọn sai 'influence to'."
      }
    },
    {
      id: "builder_w1d2_q06",
      roundIndex: 5,
      prompt: "Điền liên từ chỉ nguyên nhân học thuật: '________ technological advances, many repetitive tasks are now automated.'?",
      options: [
        { id: "opt_A", label: "A", text: "Owing to" },
        { id: "opt_B", label: "B", text: "Because" },
        { id: "opt_C", label: "C", text: "Although" },
        { id: "opt_D", label: "D", text: "In spite" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Owing to",
      correctExplanation: "Phía sau chỗ trống là cụm danh từ 'technological advances' (Noun Phrase) nên bắt buộc dùng cụm giới từ 'Due to / Owing to / Thanks to'. 'Because' phải đi với một Clause (S+V).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Because",
        diagnosticTitle: "Nhầm lẫn giữa Liên từ phụ thuộc (Because) và Giới từ (Due to)",
        explanation: "Học sinh Band 4.5 hay dùng 'Because' đi trực tiếp với danh từ mà không có mệnh đề đầy đủ."
      }
    },
    {
      id: "builder_w1d2_q07",
      roundIndex: 6,
      prompt: "Hai câu sau khác nhau thế nào về mặt ngữ nghĩa:\n(1) She rejected the offer which surprised everyone.\n(2) She rejected the offer, which surprised everyone.?",
      options: [
        { id: "opt_A", label: "A", text: "Câu (2) có dấu phẩy: 'which' thay thế cho toàn bộ hành động từ chối; Câu (1) không dấu phẩy: 'which' chỉ bổ nghĩa cho riêng 'the offer'." },
        { id: "opt_B", label: "B", text: "Cả 2 câu hoàn toàn giống nhau, dấu phẩy chỉ để ngắt hơi khi nói." },
        { id: "opt_C", label: "C", text: "Câu (2) bị sai ngữ pháp vì 'which' không được đứng sau dấu phẩy." },
        { id: "opt_D", label: "D", text: "Câu (1) mang tính trang trọng hơn câu (2)." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Câu (2) có dấu phẩy: 'which' thay thế cho toàn bộ hành động từ chối; Câu (1) không dấu phẩy: 'which' chỉ bổ nghĩa cho riêng 'the offer'.",
      correctExplanation: "Non-defining relative clause với dấu phẩy ', which...' có thể thay thế cho CẢ MỆNH ĐỀ ĐỨNG TRƯỚC (việc cô ấy từ chối khiến mọi người bất ngờ). Đây là cấu trúc nâng cao ghi điểm Grammatical Range trong IELTS Writing.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Cả 2 câu hoàn toàn giống nhau, dấu phẩy chỉ để ngắt hơi khi nói.",
        diagnosticTitle: "Coi nhẹ vai trò ngữ pháp của dấu phẩy trong Relative Clause",
        explanation: "Học sinh thường nghĩ dấu phẩy chỉ mang tính thẩm mỹ mà không nhận diện được sự thay đổi đối tượng bổ nghĩa của 'which'."
      }
    },
    {
      id: "builder_w1d2_q08",
      roundIndex: 7,
      prompt: "Quy tắc vàng về đại từ quan hệ 'that' trong mệnh đề quan hệ là gì?",
      options: [
        { id: "opt_A", label: "A", text: "'That' chỉ dùng trong Defining clause, tuyệt đối không dùng sau dấu phẩy" },
        { id: "opt_B", label: "B", text: "'That' bắt buộc phải có dấu phẩy đứng trước." },
        { id: "opt_C", label: "C", text: "'That' chỉ dùng để thay thế cho danh từ chỉ người." },
        { id: "opt_D", label: "D", text: "'That' luôn có thể thay thế cho 'which' trong mọi trường hợp có dấu phẩy." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 'That' chỉ dùng trong Defining clause, tuyệt đối không dùng sau dấu phẩy",
      correctExplanation: "Trong mệnh đề quan hệ không xác định (Non-defining relative clause, có dấu phẩy), luôn dùng 'which/who/whom', cấm kỵ dùng 'that'.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. 'That' luôn có thể thay thế cho 'which' trong mọi trường hợp có dấu phẩy.",
        diagnosticTitle: "Lạm dụng đại từ quan hệ 'that'",
        explanation: "Học sinh quen dùng 'that' tiện lợi nên viết ', that' trong bài thi Writing Task 2 và bị trừ nặng điểm Grammatical Accuracy."
      }
    },
    {
      id: "builder_w1d2_q09",
      roundIndex: 8,
      prompt: "Chọn câu viết chuẩn xác kết hợp Modifier mệnh đề quan hệ: 'Với sự phát triển của công nghệ, nhiều người chọn làm việc tại nhà, điều này ảnh hưởng đến sự tương tác xã hội của họ.'?",
      options: [
        { id: "opt_A", label: "A", text: "With the rise of technology, many people choose to work from home, which affects their social interaction." },
        { id: "opt_B", label: "B", text: "With the rise of technology, many people choose to work from home, that affects their social interaction." },
        { id: "opt_C", label: "C", text: "Because rise of technology, many people work at home which affect their social." },
        { id: "opt_D", label: "D", text: "With the rise of technology, many people choose to work from home, this affects their social interaction." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. With the rise of technology, many people choose to work from home, which affects their social interaction.",
      correctExplanation: "Cấu trúc hoàn hảo Band 5.0: Giới từ mở đầu 'With the rise of technology' + Mệnh đề chính + Mệnh đề quan hệ không xác định ', which affects...' bổ nghĩa cho toàn bộ sự việc phía trước.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. With the rise of technology, many people choose to work from home, this affects their social interaction.",
        diagnosticTitle: "Lỗi Comma Splice (Dùng dấu phẩy nối 2 câu đơn có 'this')",
        explanation: "Dùng ', this affects...' là lỗi nối câu cấm kỵ trong tiếng Anh (Comma Splice). Phải dùng ', which' hoặc chấm phẩy '; this affects'."
      }
    },
    {
      id: "builder_w1d2_q10",
      roundIndex: 9,
      prompt: "Trong câu: 'Children who spend excessive time on social media are at higher risk of depression.', mệnh đề 'who spend excessive time on social media' là loại modifier gì?",
      options: [
        { id: "opt_A", label: "A", text: "Defining Adjective Clause cung cấp thông tin bắt buộc xác định nhóm đối tượng" },
        { id: "opt_B", label: "B", text: "Non-defining Adjective Clause chỉ bổ sung thông tin phụ" },
        { id: "opt_C", label: "C", text: "Adverbial Clause of Result" },
        { id: "opt_D", label: "D", text: "Noun Clause" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Defining Adjective Clause cung cấp thông tin bắt buộc xác định nhóm đối tượng",
      correctExplanation: "Nếu bỏ mệnh đề này, câu sẽ thành 'Children are at higher risk of depression' (Mọi trẻ em đều có nguy cơ trầm cảm -> Sai nghĩa khái quát). Do đó, mệnh đề này là thông tin bắt buộc (Defining), không có dấu phẩy.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Non-defining Adjective Clause chỉ bổ sung thông tin phụ",
        diagnosticTitle: "Nhầm lẫn giữa Defining và Non-defining",
        explanation: "Học sinh hay tưởng cứ có who/which là thông tin phụ có thể bỏ tùy ý, dẫn đến sai lệch logic lập luận Task 2."
      }
    }
  ],

  "WEEK 1 – DAY 3": [
    {
      id: "builder_w1d3_q01",
      roundIndex: 0,
      prompt: "Trong IELTS Speaking chủ đề Food & Drink, khi nói về kết cấu món ăn, từ 'tender' dùng chuẩn nhất cho món nào sau đây?",
      options: [
        { id: "opt_A", label: "A", text: "Steamed chicken or stewed beef" },
        { id: "opt_B", label: "B", text: "French fries" },
        { id: "opt_C", label: "C", text: "Bitter melon" },
        { id: "opt_D", label: "D", text: "Black coffee" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Steamed chicken or stewed beef",
      correctExplanation: "Tính từ 'tender' miêu tả thịt mềm, mọng nước, dễ nhai (ngược nghĩa với 'tough' - dai). Khoai tây chiên dùng 'crispy', mướp đắng dùng 'bitter'.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. French fries",
        diagnosticTitle: "Nhầm lẫn giữa Tender (mềm) và Crispy (giòn)",
        explanation: "Học sinh thường thiếu vốn từ mô tả kết cấu (Texture) món ăn, hay dùng từ 'soft' chung chung hoặc lẫn lộn tính từ đặc thù cho thịt."
      }
    },
    {
      id: "builder_w1d3_q02",
      roundIndex: 1,
      prompt: "Khi nói về món bạn KHÔNG thích vì vị quá nhạt nhẽo, từ vựng Band 5.0 chuẩn xác trong giáo trình là gì?",
      options: [
        { id: "opt_A", label: "A", text: "bland" },
        { id: "opt_B", label: "B", text: "flavorful" },
        { id: "opt_C", label: "C", text: "savory" },
        { id: "opt_D", label: "D", text: "spicy" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. bland",
      correctExplanation: "'Bland' nghĩa là nhạt nhẽo, thiếu gia vị. Ví dụ trong giáo án: 'I don't like boiled pork because it is too bland.' 'Flavorful' là đậm đà, 'savory' là mặn mà thơm ngon.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. flavorful",
        diagnosticTitle: "Nhầm lẫn trái nghĩa tích cực / tiêu cực",
        explanation: "Học sinh thấy đuôi -ful nghĩ là đầy gia vị nên nhầm với vị nhạt, hoặc chỉ biết từ 'not delicious'."
      }
    },
    {
      id: "builder_w1d3_q03",
      roundIndex: 2,
      prompt: "Thành ngữ (Idiom) tự nhiên người bản xứ hay dùng: 'I eat sweets because they satisfy my sweet ________'?",
      options: [
        { id: "opt_A", label: "A", text: "tooth" },
        { id: "opt_B", label: "B", text: "mouth" },
        { id: "opt_C", label: "C", text: "tongue" },
        { id: "opt_D", label: "D", text: "stomach" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. tooth",
      correctExplanation: "Thành ngữ chuẩn: 'have a sweet tooth' (hảo ngọt, thích ăn đồ ngọt). 'Satisfy my sweet tooth' là thỏa mãn cơn thèm ngọt.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. tongue",
        diagnosticTitle: "Dịch từ 'hảo ngọt / ngọt lưỡi' sang 'sweet tongue'",
        explanation: "Người Việt hay liên tưởng đến lưỡi (vị giác) hoặc dạ dày, nhưng người Anh - Mỹ cố định dùng 'sweet tooth'."
      }
    },
    {
      id: "builder_w1d3_q04",
      roundIndex: 3,
      prompt: "Để miêu tả các quán ăn bình dân quen thuộc tại Việt Nam (quán phở, cơm tấm gia đình, lịch sự hơn vỉa hè nhưng không phải nhà hàng sang trọng), từ vựng chính xác là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Eatery" },
        { id: "opt_B", label: "B", text: "Fine dining restaurant" },
        { id: "opt_C", label: "C", text: "Grocery store" },
        { id: "opt_D", label: "D", text: "Food manufacturing" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Eatery",
      correctExplanation: "'Eatery' (/ˈiːtəri/) là danh từ chỉ quán ăn bình dân, gia đình, phục vụ đồ ăn địa phương. Ví dụ: 'There is a local eatery near my house that serves great Phở.'",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Fine dining restaurant",
        diagnosticTitle: "Dùng từ quá trang trọng hoặc chỉ biết mỗi từ 'restaurant'",
        explanation: "Học sinh thường chỉ biết mỗi từ 'restaurant' cho mọi quán ăn, hoặc dùng nhầm các từ cao cấp không đúng ngữ cảnh đời thường."
      }
    },
    {
      id: "builder_w1d3_q05",
      roundIndex: 4,
      prompt: "Quán cóc vỉa hè hoặc các quầy bán thức ăn trong chợ với bàn ghế nhựa bình dị được gọi chính xác trong tiếng Anh là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Food stall" },
        { id: "opt_B", label: "B", text: "Eatery" },
        { id: "opt_C", label: "C", text: "Banquet hall" },
        { id: "opt_D", label: "D", text: "Cafeteria" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Food stall",
      correctExplanation: "'Food stall' (/fuːd stɔːl/) là quầy hàng ăn, quán cóc vỉa hè, xe đẩy đồ ăn đường phố. Ví dụ: 'I love eating at food stalls on the street because the food is cheap and delicious.'",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Cafeteria",
        diagnosticTitle: "Nhầm với căng tin trường học / bệnh viện",
        explanation: "'Cafeteria' là nhà ăn tự phục vụ trong trường học hoặc công ty, không phải quán ăn vỉa hè đường phố."
      }
    },
    {
      id: "builder_w1d3_q06",
      roundIndex: 5,
      prompt: "Từ vựng dùng chung tiện lợi để chỉ 'địa điểm ăn uống' (bao gồm cả nhà hàng, quán ăn, quán cà phê) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Dining spot" },
        { id: "opt_B", label: "B", text: "Eating room" },
        { id: "opt_C", label: "C", text: "Cook location" },
        { id: "opt_D", label: "D", text: "Food space" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Dining spot",
      correctExplanation: "'Dining spot' (/ˈdaɪnɪŋ spɑːt/) là cụm từ tự nhiên và ghi điểm tốt trong Speaking Part 1: 'Haidilao is my favorite dining spot when I hang out with my family.'",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Eating room",
        diagnosticTitle: "Ghép từ thô sơ kiểu tiếng Việt (phòng ăn / chỗ ăn)",
        explanation: "Học sinh hay tự chế từ 'eating place / eating room' thay vì sử dụng cụm chuẩn 'dining spot'."
      }
    },
    {
      id: "builder_w1d3_q07",
      roundIndex: 6,
      prompt: "Trong câu trả lời Speaking Part 1: 'I prefer homemade meals because they are healthier, and I can control the ingredients.', cụm 'control the ingredients' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Kiểm soát được nguồn gốc và chất lượng nguyên liệu nấu ăn" },
        { id: "opt_B", label: "B", text: "Tiết kiệm tiền mua nguyên liệu" },
        { id: "opt_C", label: "C", text: "Ăn ít nguyên liệu hơn" },
        { id: "opt_D", label: "D", text: "Nấu ăn nhanh hơn bình thường" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Kiểm soát được nguồn gốc và chất lượng nguyên liệu nấu ăn",
      correctExplanation: "'Ingredients' là các thành phần/nguyên liệu tạo nên món ăn. 'Control the ingredients' là điểm cộng lớn khi nói về lợi ích của việc tự nấu ăn tại nhà (homemade meals).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tiết kiệm tiền mua nguyên liệu",
        diagnosticTitle: "Suy diễn không đúng trọng tâm nghĩa từ vựng",
        explanation: "Học sinh thường liên hệ tự nấu ăn với tiết kiệm tiền mà không nắm vững nghĩa chính xác của 'ingredients'."
      }
    },
    {
      id: "builder_w1d3_q08",
      roundIndex: 7,
      prompt: "Để đạt điểm Band 5.0+ trong Speaking Part 1 khi được hỏi: 'Do you prefer homemade meals or ready-made food?', thí sinh nên triển khai câu trả lời theo công thức nào?",
      options: [
        { id: "opt_A", label: "A", text: "[Direct Answer: Đưa ra lựa chọn trực tiếp] + [Development: 2 lý do so sánh chi tiết và ví dụ cụ thể]" },
        { id: "opt_B", label: "B", text: "Chỉ trả lời một từ duy nhất: 'Homemade meals' rồi im lặng" },
        { id: "opt_C", label: "C", text: "Kể toàn bộ công thức nấu 5 món ăn truyền thống trong 5 phút" },
        { id: "opt_D", label: "D", text: "Nói về chính sách trợ giá nông nghiệp của chính phủ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. [Direct Answer: Đưa ra lựa chọn trực tiếp] + [Development: 2 lý do so sánh chi tiết và ví dụ cụ thể]",
      correctExplanation: "Công thức chuẩn hóa Speaking Flow: Luôn trả lời thẳng vào câu hỏi ở câu đầu tiên, sau đó mở rộng bằng 2 ý phát triển (taste, health, convenience) để bài nói mạch lạc và tự nhiên.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ trả lời một từ duy nhất: 'Homemade meals' rồi im lặng",
        diagnosticTitle: "Lỗi trả lời cụt lủn (Under-extension)",
        explanation: "Học sinh dưới Band 5.0 thường chỉ trả lời 'Yes/No' hoặc cụm từ ngắn, giám khảo không có đủ mẫu ngôn ngữ để chấm điểm Fluency."
      }
    },
    {
      id: "builder_w1d3_q09",
      roundIndex: 8,
      prompt: "Khi miêu tả món Phở trong bài thi Speaking, cụm từ nào dưới đây kết hợp tự nhiên và chuẩn học thuật nhất?",
      options: [
        { id: "opt_A", label: "A", text: "A traditional dish served with rice noodles, a flavorful broth, and fresh herbs." },
        { id: "opt_B", label: "B", text: "A soup with many white strings and animal water." },
        { id: "opt_C", label: "C", text: "A fast food very salty with beef meat and green vegetables." },
        { id: "opt_D", label: "D", text: "A dry noodle without water or any spices." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. A traditional dish served with rice noodles, a flavorful broth, and fresh herbs.",
      correctExplanation: "Từ vựng đắt giá trong giáo trình: 'rice noodles' (bánh phở), 'flavorful broth' (nước dùng đậm đà), 'fresh herbs' (rau thơm).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. A soup with many white strings and animal water.",
        diagnosticTitle: "Dịch thô L1 sang tiếng Anh khi bí từ",
        explanation: "Học sinh hay dịch buồn cười như 'animal water' thay vì dùng từ đúng chuyên ngành ẩm thực là 'broth' (nước hầm xương/nước dùng)."
      }
    },
    {
      id: "builder_w1d3_q10",
      roundIndex: 9,
      prompt: "Khi phát âm từ 'cereal' (ngũ cốc) và 'cheese' (phô mai), sự khác biệt giữa hai nguyên âm đầu là gì?",
      options: [
        { id: "opt_A", label: "A", text: "'Cereal' có nguyên âm đôi hoặc âm ngắn, còn 'cheese' có nguyên âm dài" },
        { id: "opt_B", label: "B", text: "Cả 2 từ đều đọc giống hệt âm e ngắn như trong 'pen'." },
        { id: "opt_C", label: "C", text: "'Cheese' đọc là âm ngắn /ɪ/ lướt qua." },
        { id: "opt_D", label: "D", text: "'Cereal' không có trọng âm ở âm tiết đầu." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 'Cereal' có nguyên âm đôi hoặc âm ngắn, còn 'cheese' có nguyên âm dài",
      correctExplanation: "'Cheese' có nguyên âm trước kéo dài /tʃiːz/, đòi hỏi kéo khóe miệng; còn 'cereal' /ˈsɪəriəl/ có nguyên âm đôi chuyển động. Việc phát âm chuẩn cặp nguyên âm này giúp cải thiện rõ rệt tiêu chí Pronunciation.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Cả 2 từ đều đọc giống hệt âm e ngắn như trong 'pen'.",
        diagnosticTitle: "Phát âm theo mặt chữ tiếng Việt",
        explanation: "Học sinh thấy chữ 'e' thường đọc bẹt thành âm /e/ tiếng Việt dẫn đến phát âm sai từ."
      }
    }
  ]
};
