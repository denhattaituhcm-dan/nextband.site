/**
 * Question Bank for Week 7 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_7_QUESTIONS: Record<string, any[]> = {
  "WEEK 7 – DAY 1": [
    {
      id: "doer_w7d1_q01",
      roundIndex: 0,
      prompt: "Trong mệnh đề quan hệ bổ nghĩa cho danh từ chỉ nơi chốn, cụm 'in which / at which' có thể được thay thế bằng liên từ/đại từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "where" },
        { id: "opt_B", label: "B", text: "when" },
        { id: "opt_C", label: "C", text: "why" },
        { id: "opt_D", label: "D", text: "which" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong Adjective clause: prep + which chỉ nơi chốn (in which, at which) được thay bằng 'where'. Chỉ thời gian (on which, at which) thay bằng 'when', và lý do (for which) thay bằng 'why'."
    },
    {
      id: "doer_w7d1_q02",
      roundIndex: 1,
      prompt: "Xác định lỗi sai trong câu sau: 'Would you lend me the book, which you recommended last week?'",
      options: [
        { id: "opt_A", label: "A", text: "Dấu phẩy không đúng vì 'the book' ở đây cần mệnh đề xác định (defining clause) để người nghe biết đó là cuốn sách nào" },
        { id: "opt_B", label: "B", text: "Sai động từ 'lend', phải dùng 'borrow'" },
        { id: "opt_C", label: "C", text: "'which' phải đổi thành 'where'" },
        { id: "opt_D", label: "D", text: "Phải thêm 'it' sau 'recommended'" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Đây là Defining Adjective Clause (mệnh đề quan hệ xác định) chỉ rõ cuốn sách nào, do đó KHÔNG được dùng dấu phẩy ngăn cách."
    },
    {
      id: "doer_w7d1_q03",
      roundIndex: 2,
      prompt: "Xác định lỗi sai trong câu: 'People, which were invited to the party, didn't turn up.'",
      options: [
        { id: "opt_A", label: "A", text: "Dùng sai 'which' để chỉ người và đặt dấu phẩy sai cho mệnh đề xác định" },
        { id: "opt_B", label: "B", text: "Sai thì của động từ 'didn't turn up'" },
        { id: "opt_C", label: "C", text: "'invited' phải chuyển thành 'inviting'" },
        { id: "opt_D", label: "D", text: "Phải dùng 'person' thay vì 'people'" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'People' là danh từ chỉ người phải dùng 'who'. Đồng thời đây là defining clause xác định rõ nhóm người nào được mời, nên không có dấu phẩy -> 'People who were invited to the party didn't turn up.'"
    },
    {
      id: "doer_w7d1_q04",
      roundIndex: 3,
      prompt: "Quy tắc dùng đại từ quan hệ trong Non-defining adjective clause (mệnh đề quan hệ không xác định, có dấu phẩy) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tuyệt đối không được dùng 'that', bắt buộc dùng 'which' (chỉ vật) hoặc 'who' (chỉ người)" },
        { id: "opt_B", label: "B", text: "Bắt buộc phải dùng 'that' thay cho 'which'" },
        { id: "opt_C", label: "C", text: "Chỉ được dùng 'what'" },
        { id: "opt_D", label: "D", text: "Có thể dùng tự do 'that' hay 'which' đều được" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong Non-defining clause (đặt giữa hai dấu phẩy bổ sung thông tin), quy tắc ngữ pháp cấm dùng 'that', phải dùng 'which' hoặc 'who'."
    },
    {
      id: "doer_w7d1_q05",
      roundIndex: 4,
      prompt: "Rút gọn mệnh đề tính từ chủ động (Active voice) trong câu: 'Children who learn English at a young age can speak fluently.'",
      options: [
        { id: "opt_A", label: "A", text: "Children learning English at a young age can speak fluently." },
        { id: "opt_B", label: "B", text: "Children learned English at a young age can speak fluently." },
        { id: "opt_C", label: "C", text: "Children to learn English at a young age can speak fluently." },
        { id: "opt_D", label: "D", text: "Children learn English at a young age can speak fluently." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Khi relative pronoun làm Subject ở thể chủ động (active voice), ta bỏ relative pronoun và chuyển động từ chính sang dạng V-ing (learning)."
    },
    {
      id: "doer_w7d1_q06",
      roundIndex: 5,
      prompt: "Rút gọn mệnh đề tính từ bị động (Passive voice) trong câu: 'The books that were written by J.K. Rowling are very popular.'",
      options: [
        { id: "opt_A", label: "A", text: "The books written by J.K. Rowling are very popular." },
        { id: "opt_B", label: "B", text: "The books writing by J.K. Rowling are very popular." },
        { id: "opt_C", label: "C", text: "The books were written by J.K. Rowling are very popular." },
        { id: "opt_D", label: "D", text: "The books that written by J.K. Rowling are very popular." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Ở thể bị động (passive voice), khi rút gọn mệnh đề quan hệ ta lược bỏ relative pronoun (that) và trợ động từ be (were), giữ lại Past Participle (V3 - written)."
    },
    {
      id: "doer_w7d1_q07",
      roundIndex: 6,
      prompt: "Rút gọn mệnh đề tính từ khi relative pronoun đóng vai trò tân ngữ (Object): 'This song reminded him of the woman that he used to love.'",
      options: [
        { id: "opt_A", label: "A", text: "This song reminded him of the woman he used to love." },
        { id: "opt_B", label: "B", text: "This song reminded him of the woman loving he used to." },
        { id: "opt_C", label: "C", text: "This song reminded him of the woman loved he used to." },
        { id: "opt_D", label: "D", text: "This song reminded him of the woman was loved by him." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Khi relative pronoun đóng vai trò là tân ngữ (object pronoun), ta có thể lược bỏ trực tiếp đại từ đó (omission of relative pronoun) mà giữ nguyên phần còn lại."
    },
    {
      id: "doer_w7d1_q08",
      roundIndex: 7,
      prompt: "Dịch sang tiếng Anh có sử dụng Non-defining clause: 'Biến đổi khí hậu, một vấn đề môi trường nghiêm trọng, sẽ được thảo luận tại hội thảo.'",
      options: [
        { id: "opt_A", label: "A", text: "Climate change, which is a serious environmental problem, will be discussed at the upcoming conference." },
        { id: "opt_B", label: "B", text: "Climate change that is a serious environmental problem will be discussed at the conference." },
        { id: "opt_C", label: "C", text: "Climate change, where is a serious environmental problem, will discuss at conference." },
        { id: "opt_D", label: "D", text: "Climate change which a serious problem will be discussed in conference." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'Climate change' là danh từ riêng/khái niệm duy nhất đã xác định, nên mệnh đề giải thích phải đặt trong hai dấu phẩy và dùng 'which'."
    },
    {
      id: "doer_w7d1_q09",
      roundIndex: 8,
      prompt: "Rút gọn câu có to be + adj/noun: 'My dad, who is old and sick, never goes out of the house.'",
      options: [
        { id: "opt_A", label: "A", text: "My dad, old and sick, never goes out of the house." },
        { id: "opt_B", label: "B", text: "My dad being old and sick never goes out of the house." },
        { id: "opt_C", label: "C", text: "My dad is old and sick never goes out of the house." },
        { id: "opt_D", label: "D", text: "My dad who old and sick never goes out of the house." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Nếu Finite verb của adjective clause là 'be', khi rút gọn ta bỏ cả relative pronoun và 'be', giữ lại tính từ hoặc cụm danh từ phía sau đặt giữa hai dấu phẩy."
    },
    {
      id: "doer_w7d1_q10",
      roundIndex: 9,
      prompt: "Dịch sang tiếng Anh dùng Reduced clause bị động: 'Để tiết kiệm chi phí, nhà máy đã xả chất thải chưa qua xử lý ra biển.'",
      options: [
        { id: "opt_A", label: "A", text: "To save operating costs, the plant discharged untreated waste into the sea." },
        { id: "opt_B", label: "B", text: "To save operating costs, the plant discharged un-treating waste to sea." },
        { id: "opt_C", label: "C", text: "Saving operating cost, the plant has discharge waste not treat into ocean." },
        { id: "opt_D", label: "D", text: "To save costs, the plant discharge which is not treated waste into sea." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'untreated waste' là dạng rút gọn của 'waste which has not been treated' (chất thải chưa qua xử lý)."
    }
  ],

  "WEEK 7 – DAY 2": [
    {
      id: "doer_w7d2_q01",
      roundIndex: 0,
      prompt: "Trong chủ đề Environment, động từ \"discharge\" trong cụm \"discharged toxic waste into the ocean\" ĐỒNG NGHĨA nhất với:",
      options: [
        { id: "opt_A", label: "A", text: "release" },
        { id: "opt_B", label: "B", text: "recycle" },
        { id: "opt_C", label: "C", text: "purify" },
        { id: "opt_D", label: "D", text: "contain" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. where",
      correctExplanation: "\"Discharge\" chất thải công nghiệp có nghĩa là xả ra môi trường bên ngoài, đồng nghĩa với release hoặc dump.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. why",
        diagnosticTitle: "Nhầm lẫn giữa hành vi gây ô nhiễm và giải pháp xử lý",
        explanation: "Discharge chất thải là nguồn cơn thảm họa ô nhiễm, hoàn toàn trái ngược với purify (làm sạch)."
      }
    },
    {
      id: "doer_w7d2_q02",
      roundIndex: 1,
      prompt: "Từ TRÁI NGHĨA với \"toxic\" trong cụm \"toxic chemical waste\" (chất thải hóa học độc hại) là:",
      options: [
        { id: "opt_A", label: "A", text: "harmless" },
        { id: "opt_B", label: "B", text: "poisonous" },
        { id: "opt_C", label: "C", text: "fatal" },
        { id: "opt_D", label: "D", text: "lethal" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. harmless",
      correctExplanation: "\"Toxic\" = độc hại. Từ trái nghĩa trực tiếp là \"harmless\" (vô hại) hoặc \"non-hazardous\" (không nguy hại).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. when",
        diagnosticTitle: "Chọn nhầm từ đồng nghĩa thay vì từ trái nghĩa",
        explanation: "Poisonous là từ đồng nghĩa trực tiếp với toxic. Đề bài đang yêu cầu tìm từ TRÁI NGHĨA."
      }
    },
    {
      id: "doer_w7d2_q03",
      roundIndex: 2,
      prompt: "Thuật ngữ \"livelihood\" trong câu \"The disaster negatively affected the livelihood of coastal fishermen\" mang nghĩa gì?",
      options: [
        { id: "opt_A", label: "A", text: "Kế sinh nhai, nguồn thu nhập và phương tiện kiếm sống hàng ngày" },
        { id: "opt_B", label: "B", text: "Chiếc thuyền buồm và ngư cụ đánh cá" },
        { id: "opt_C", label: "C", text: "Giấy phép đăng ký cư trú hộ khẩu" },
        { id: "opt_D", label: "D", text: "Bệnh truyền nhiễm từ cá chết" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Kế sinh nhai, nguồn thu nhập và phương tiện kiếm sống hàng ngày",
      correctExplanation: "\"Livelihood\" là kế sinh nhai (a means of securing the necessities of life), nguồn nuôi sống bản thân và gia đình.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. when",
        diagnosticTitle: "Nhầm lẫn tài sản vật chất với kế sinh nhai",
        explanation: "Thuyền bè chỉ là công cụ (gear/vessel), còn livelihood là phương kế kiếm sống toàn diện của con người."
      }
    },
    {
      id: "doer_w7d2_q04",
      roundIndex: 3,
      prompt: "Collocation chuẩn trong bài: \"The industrial plant discharged waste which contained toxins that ______ the permitted safety level.\"",
      options: [
        { id: "opt_A", label: "A", text: "exceeded" },
        { id: "opt_B", label: "B", text: "succeeded" },
        { id: "opt_C", label: "C", text: "receded" },
        { id: "opt_D", label: "D", text: "proceeded" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. exceeded",
      correctExplanation: "Collocation môi trường pháp lý: \"exceed the permitted level / standard\" (vượt quá ngưỡng quy chuẩn an toàn cho phép).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. when",
        diagnosticTitle: "Nhầm lẫn hình thái từ do cùng đuôi -ceed",
        explanation: "Succeed là thành công hoặc kế nhiệm, không mang nghĩa vượt quá ngưỡng chỉ số số lượng."
      }
    },
    {
      id: "doer_w7d2_q05",
      roundIndex: 4,
      prompt: "Collocation chỉ toàn bộ hệ động thực vật dưới đại dương: \"The chemical spill caused catastrophic destruction to ______.\"",
      options: [
        { id: "opt_A", label: "A", text: "marine life" },
        { id: "opt_B", label: "B", text: "navy life" },
        { id: "opt_C", label: "C", text: "sailor life" },
        { id: "opt_D", label: "D", text: "boat life" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. marine life",
      correctExplanation: "\"Marine life\" là thuật ngữ chuẩn xác trong sinh thái học chỉ các loài sinh vật biển và hệ sinh thái đại dương.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. when",
        diagnosticTitle: "Dùng từ lực lượng quân sự hải quân",
        explanation: "Navy là lực lượng quân đội hải quân, không liên quan đến sinh vật sinh thái biển (marine)."
      }
    },
    {
      id: "doer_w7d2_q06",
      roundIndex: 5,
      prompt: "Phân từ rút gọn: Cụm \"chất thải chưa qua xử lý bị xả trực tiếp ra biển\" được viết chuẩn ngữ pháp tiếng Anh là:",
      options: [
        { id: "opt_A", label: "A", text: "untreated waste" },
        { id: "opt_B", label: "B", text: "uncleanable waste" },
        { id: "opt_C", label: "C", text: "not-treating waste" },
        { id: "opt_D", label: "D", text: "unprocessed water" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. untreated waste",
      correctExplanation: "\"Untreated waste\" là quá khứ phân từ làm tính từ mang nghĩa bị động: chất thải chưa từng được qua hệ thống xử lý hóa chất.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. why",
        diagnosticTitle: "Dùng hiện tại phân từ chủ động sai ngữ pháp",
        explanation: "Chất thải là đối tượng được xử lý (bị động), nên phải dùng past participle có tiền tố phủ định \"untreated\"."
      }
    },
    {
      id: "doer_w7d2_q07",
      roundIndex: 6,
      prompt: "Chọn giới từ đúng đi kèm trách nhiệm pháp lý: \"The steel corporation finally accepted full responsibility ______ the devastating fish deaths.\"",
      options: [
        { id: "opt_A", label: "A", text: "for" },
        { id: "opt_B", label: "B", text: "with" },
        { id: "opt_C", label: "C", text: "to" },
        { id: "opt_D", label: "D", text: "at" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. for",
      correctExplanation: "Cấu trúc cố định: \"accept / take responsibility FOR something\" (chịu trách nhiệm về hành vi hoặc hậu quả nào đó).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. when",
        diagnosticTitle: "Dùng giới từ \"with\" do ảnh hưởng tiếng Việt",
        explanation: "Tiếng Việt nói \"chịu trách nhiệm với ai/việc gì\", nhưng tiếng Anh bắt buộc dùng \"responsibility FOR sth\"."
      }
    },
    {
      id: "doer_w7d2_q08",
      roundIndex: 7,
      prompt: "Hiện tượng sinh học \"red tide\" được dịch chuẩn xác sang tiếng Việt là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Hiện tượng thủy triều đỏ" },
        { id: "opt_B", label: "B", text: "Hiện tượng sóng thần do động đất ngầm" },
        { id: "opt_C", label: "C", text: "Sự cố tràn dầu thô nhuộm màu nước biển" },
        { id: "opt_D", label: "D", text: "Nước biển dâng cao vào mùa lũ lụt" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Hiện tượng thủy triều đỏ",
      correctExplanation: "\"Red tide\" là thuật ngữ hải dương học chỉ hiện tượng thủy triều đỏ khi vi tảo nở hoa làm đổi màu nước và tiêu hao dưỡng khí.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. why",
        diagnosticTitle: "Nhầm hiện tượng sinh học với sự cố dầu loang",
        explanation: "Dầu tràn là oil spill, còn red tide là hiện tượng bùng nổ tảo biển."
      }
    },
    {
      id: "doer_w7d2_q09",
      roundIndex: 8,
      prompt: "VẬN DỤNG NGỮ CẢNH MỚI: Chọn từ thích hợp điền vào báo cáo sinh thái: \"The environmental agency placed an immediate ______ on fishing in polluted coastal zones.\"",
      options: [
        { id: "opt_A", label: "A", text: "ban" },
        { id: "opt_B", label: "B", text: "campus" },
        { id: "opt_C", label: "C", text: "burnout" },
        { id: "opt_D", label: "D", text: "itinerary" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. ban",
      correctExplanation: "Collocation: \"place a ban on something\" (áp đặt lệnh cấm đối với hoạt động đánh bắt/mua bán nào đó).",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. which",
        diagnosticTitle: "Ghép từ lịch trình chuyến đi không tương thích",
        explanation: "Itinerary là lịch trình du lịch, không thể đi với hành động quản lý khẩn cấp của cơ quan môi trường."
      }
    },
    {
      id: "doer_w7d2_q10",
      roundIndex: 9,
      prompt: "PARAPHRASE: Câu \"The factory unlawfully discharged untreated chemical toxins into the ocean, decimating local marine ecosystems and ruining fishermen's livelihoods\" được diễn đạt lại tương đương nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "Illicit industrial waste disposal wiped out aquatic habitats and severely compromised the economic survival of coastal communities." },
        { id: "opt_B", label: "B", text: "Marine species flourished because the manufacturing facility installed world-class water purification pipelines." },
        { id: "opt_C", label: "C", text: "Fishermen were fully compensated prior to the scheduled cleaning of underwater drainage pipes." },
        { id: "opt_D", label: "D", text: "Red tide algae blooms were conclusively verified as the exclusive cause of central coastal fish mortality." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Illicit industrial waste disposal wiped out aquatic habitats and severely compromised the economic survival of coastal communities.",
      correctExplanation: "\"Illicit industrial waste disposal\" paraphrase cho \"unlawfully discharged untreated chemical toxins\", \"wiped out aquatic habitats\" paraphrase cho \"decimating marine ecosystems\", và \"compromised economic survival\" paraphrase cho \"ruining fishermen's livelihoods\".",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. which",
        diagnosticTitle: "Chọn giả thuyết đã bị bác bỏ trong điều tra",
        explanation: "Giả thuyết thủy triều đỏ đã bị Hội nghề cá và kết luận chính phủ bác bỏ; nguyên nhân thật sự là do chất độc xả từ nhà máy."
      }
    }
  ],

  "WEEK 7 – DAY 3": [
    {
      id: "doer_w7d3_q01",
      roundIndex: 0,
      prompt: "Đuôi '-s/-es' trong tiếng Anh có bao nhiêu cách phát âm chuẩn?",
      options: [
        { id: "opt_A", label: "A", text: "3 cách: /s/, /z/, và /ɪz/" },
        { id: "opt_B", label: "B", text: "2 cách: /s/ và /z/" },
        { id: "opt_C", label: "C", text: "4 cách: /s/, /z/, /ʃ/, /tʃ/" },
        { id: "opt_D", label: "D", text: "1 cách duy nhất: /s/" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Đuôi -s/-es có 3 cách đọc: /ɪz/ (sau các âm xì/âm gió), /s/ (sau âm vô thanh), và /z/ (sau âm hữu thanh và nguyên âm)."
    },
    {
      id: "doer_w7d3_q02",
      roundIndex: 1,
      prompt: "Các từ có âm tận cùng là /s/, /z/, /ʃ/, /ʒ/, /tʃ/, /dʒ/ khi thêm đuôi '-es' sẽ được phát âm là gì?",
      options: [
        { id: "opt_A", label: "A", text: "/ɪz/" },
        { id: "opt_B", label: "B", text: "/s/" },
        { id: "opt_C", label: "C", text: "/z/" },
        { id: "opt_D", label: "D", text: "Âm câm" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Các âm xuýt/gió sibilants (/s, z, ʃ, ʒ, tʃ, dʒ/) khi thêm -es đều được phát âm thành /ɪz/ (ví dụ: washes, brushes, watches, boxes)."
    },
    {
      id: "doer_w7d3_q03",
      roundIndex: 2,
      prompt: "Khẩu quyết 'thèm cà phê phở tái' ứng với các âm vô thanh nào để nhận biết đuôi '-s' đọc là /s/?",
      options: [
        { id: "opt_A", label: "A", text: "/θ/, /k/, /p/, /f/, /t/" },
        { id: "opt_B", label: "B", text: "/s/, /ʃ/, /tʃ/, /dʒ/, /z/" },
        { id: "opt_C", label: "C", text: "/b/, /d/, /g/, /v/, /m/" },
        { id: "opt_D", label: "D", text: "/l/, /r/, /n/, /ŋ/, /w/" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Mẹo nhớ các âm vô thanh (unvoiced consonants): /θ/ (thèm), /k/ (cà), /p/ (phê), /f/ (phở), /t/ (tái). Khi kết thúc bằng các âm này, -s đọc là /s/."
    },
    {
      id: "doer_w7d3_q04",
      roundIndex: 3,
      prompt: "Từ nào dưới đây có đuôi '-s/-es' được phát âm là /ɪz/?",
      options: [
        { id: "opt_A", label: "A", text: "washes" },
        { id: "opt_B", label: "B", text: "gets" },
        { id: "opt_C", label: "C", text: "books" },
        { id: "opt_D", label: "D", text: "plays" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'wash' kết thúc bằng âm /ʃ/ nên khi thêm -es đọc là /wɒʃɪz/ (/ɪz/)."
    },
    {
      id: "doer_w7d3_q05",
      roundIndex: 4,
      prompt: "Từ nào dưới đây có đuôi '-s' được phát âm là /s/?",
      options: [
        { id: "opt_A", label: "A", text: "gets" },
        { id: "opt_B", label: "B", text: "goes" },
        { id: "opt_C", label: "C", text: "cleans" },
        { id: "opt_D", label: "D", text: "runs" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'get' tận cùng là âm vô thanh /t/ ('tái'), nên đuôi -s phát âm là /s/ -> /ɡets/."
    },
    {
      id: "doer_w7d3_q06",
      roundIndex: 5,
      prompt: "Từ nào dưới đây có đuôi '-es' được phát âm là /z/?",
      options: [
        { id: "opt_A", label: "A", text: "goes" },
        { id: "opt_B", label: "B", text: "watches" },
        { id: "opt_C", label: "C", text: "catches" },
        { id: "opt_D", label: "D", text: "kisses" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'go' kết thúc bằng nguyên âm /oʊ/ (âm hữu thanh/rung), nên đuôi -es được phát âm là /z/ -> /ɡoʊz/."
    },
    {
      id: "doer_w7d3_q07",
      roundIndex: 6,
      prompt: "Trong đoạn văn thực hành: 'He gets up at 6 am, washes his face, brushes his teeth, and exercises for 15 minutes', có bao nhiêu từ chứa đuôi đọc là /ɪz/?",
      options: [
        { id: "opt_A", label: "A", text: "3 từ: washes, brushes, exercises" },
        { id: "opt_B", label: "B", text: "1 từ: washes" },
        { id: "opt_C", label: "C", text: "2 từ: gets, washes" },
        { id: "opt_D", label: "D", text: "4 từ: gets, washes, brushes, exercises" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Washes (/ʃɪz/), brushes (/ʃɪz/), exercises (/saɪzɪz/) đều tận cùng bằng âm gió và phát âm /ɪz/. Riêng 'gets' đọc là /s/."
    },
    {
      id: "doer_w7d3_q08",
      roundIndex: 7,
      prompt: "Trong chủ đề Friendship (Tình bạn), cụm từ 'have a lot in common with someone' mang ý nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Có nhiều điểm chung, cùng sở thích và quan điểm với ai đó" },
        { id: "opt_B", label: "B", text: "Có chung nhiều món nợ tài chính với nhau" },
        { id: "opt_C", label: "C", text: "Sống cùng trong một khu phố tập thể" },
        { id: "opt_D", label: "D", text: "Rất hay cãi vã vì bất đồng tính cách" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'have a lot in common' là collocation quen thuộc trong Speaking topic Friendship: có rất nhiều điểm chung sở thích, thói quen."
    },
    {
      id: "doer_w7d3_q09",
      roundIndex: 8,
      prompt: "Cụm từ nào diễn tả một 'người bạn thân thiết tri kỷ có thể tâm sự mọi điều'?",
      options: [
        { id: "opt_A", label: "A", text: "A close confidant" },
        { id: "opt_B", label: "B", text: "A casual acquaintance" },
        { id: "opt_C", label: "C", text: "A fair-weather friend" },
        { id: "opt_D", label: "D", text: "A stranger on the street" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'close confidant' (người bạn tâm tình, tri kỷ). Trái ngược với 'casual acquaintance' (người quen sơ giao) hay 'fair-weather friend' (bạn cơ hội, chỉ ở bên lúc vui)."
    },
    {
      id: "doer_w7d3_q10",
      roundIndex: 9,
      prompt: "Thành ngữ 'keep in touch with someone' có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Giữ liên lạc thường xuyên với ai đó" },
        { id: "opt_B", label: "B", text: "Chạm tay vào vai ai đó khi gặp mặt" },
        { id: "opt_C", label: "C", text: "Cắt đứt mọi liên lạc vì hiểu lầm" },
        { id: "opt_D", label: "D", text: "Theo dõi vị trí của ai đó trên mạng xã hội" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'keep in touch with sb' (hoặc stay in touch) = duy trì liên lạc với ai đó."
    }
  ]
};
