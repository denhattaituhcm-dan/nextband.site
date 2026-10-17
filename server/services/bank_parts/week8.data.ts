/**
 * Question Bank for Week 8 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_8_QUESTIONS: Record<string, any[]> = {
  "WEEK 8 – DAY 1": [
    {
      id: "doer_w8d1_q01",
      roundIndex: 0,
      prompt: "Trong văn phong học thuật IELTS Writing, câu bị động (Passive voice) thường được sử dụng nhiều nhất trong trường hợp nào?",
      options: [
        { id: "opt_A", label: "A", text: "Khi người viết muốn nhấn mạnh vào hành động/đối tượng chịu tác động hoặc khi chủ thể thực hiện hành động không quan trọng/chưa rõ" },
        { id: "opt_B", label: "B", text: "Chỉ khi người viết muốn câu văn dài thêm nhiều từ để đạt độ dài tối thiểu" },
        { id: "opt_C", label: "C", text: "Trong tất cả mọi câu văn miêu tả quan điểm cá nhân" },
        { id: "opt_D", label: "D", text: "Chỉ khi chủ ngữ là tên một cá nhân cụ thể" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Passive voice được dùng khi trọng tâm thông tin đặt vào hành động hoặc tân ngữ chịu tác động, hoặc khi agent (chủ thể gây ra hành động) không quan trọng, hiển nhiên, hoặc không rõ danh tính."
    },
    {
      id: "doer_w8d1_q02",
      roundIndex: 1,
      prompt: "Chuyển câu sau sang thể bị động (Passive Voice): 'US companies have recently recruited 500,000 workers in August alone.'",
      options: [
        { id: "opt_A", label: "A", text: "500,000 workers have recently been recruited in August alone." },
        { id: "opt_B", label: "B", text: "500,000 workers were recently recruited in August alone." },
        { id: "opt_C", label: "C", text: "500,000 workers have recently recruited by US companies." },
        { id: "opt_D", label: "D", text: "500,000 workers are recently been recruited in August alone." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Câu gốc ở thì Hiện tại hoàn thành (have recruited) -> Thể bị động tương ứng: have/has been + V3/ed -> 'have recently been recruited'."
    },
    {
      id: "doer_w8d1_q03",
      roundIndex: 2,
      prompt: "Chuyển câu sau sang thể bị động: 'The company required all employees to attend the meeting.'",
      options: [
        { id: "opt_A", label: "A", text: "All employees were required to attend the meeting." },
        { id: "opt_B", label: "B", text: "All employees had required to attend the meeting." },
        { id: "opt_C", label: "C", text: "All employees are required to attended the meeting." },
        { id: "opt_D", label: "D", text: "All employees were requiring to attend the meeting." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Thì Quá khứ đơn 'required' -> bị động là 'were required to attend'."
    },
    {
      id: "doer_w8d1_q04",
      roundIndex: 3,
      prompt: "Đối với ngoại động từ có 2 tân ngữ (Vt + O1 + O2) như 'give sb sth': 'Her boyfriend gave her a Rolex on her birthday', câu bị động ưu tiên phổ biến nhất là gì?",
      options: [
        { id: "opt_A", label: "A", text: "She was given a Rolex (by her boyfriend) on her birthday." },
        { id: "opt_B", label: "B", text: "A Rolex gave her on her birthday by boyfriend." },
        { id: "opt_C", label: "C", text: "She gave a Rolex by her boyfriend on birthday." },
        { id: "opt_D", label: "D", text: "Her was given a Rolex on her birthday." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Ưu tiên đưa tân ngữ gián tiếp chỉ người (her -> She) lên làm chủ ngữ: 'She was given a Rolex on her birthday'."
    },
    {
      id: "doer_w8d1_q05",
      roundIndex: 4,
      prompt: "Chuyển sang bị động với động từ có cấu trúc 'expect to do sth': 'Cô ấy kỳ vọng sẽ được thăng chức vào tháng sau.'",
      options: [
        { id: "opt_A", label: "A", text: "She expects to be promoted next month." },
        { id: "opt_B", label: "B", text: "She expects to promote next month." },
        { id: "opt_C", label: "C", text: "She is expected promoting next month." },
        { id: "opt_D", label: "D", text: "She was expected to promote next month." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Cấu trúc chủ động: expect to do sth -> Bị động cho non-finite verb to-infinitive: expect to BE + V3/ed -> 'expects to be promoted'."
    },
    {
      id: "doer_w8d1_q06",
      roundIndex: 5,
      prompt: "Chuyển sang bị động với giới từ 'dream of doing sth': 'Anh ấy mơ về việc được Google tuyển dụng.'",
      options: [
        { id: "opt_A", label: "A", text: "He dreams of being recruited by Google." },
        { id: "opt_B", label: "B", text: "He dreams of recruiting by Google." },
        { id: "opt_C", label: "C", text: "He is dreamed of recruit by Google." },
        { id: "opt_D", label: "D", text: "He dreams of to be recruited by Google." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Sau giới từ 'of' là gerund (V-ing). Dạng bị động của gerund là 'being + V3' -> 'dreams of being recruited'."
    },
    {
      id: "doer_w8d1_q07",
      roundIndex: 6,
      prompt: "Động từ nào sau đây là nội động từ (Intransitive verb) KHÔNG THỂ chia ở thể bị động?",
      options: [
        { id: "opt_A", label: "A", text: "happen" },
        { id: "opt_B", label: "B", text: "build" },
        { id: "opt_C", label: "C", text: "destroy" },
        { id: "opt_D", label: "D", text: "publish" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Nội động từ (intransitive verbs) như happen, occur, arrive, disappear không nhận tân ngữ nên KHÔNG BAO GIỜ có dạng bị động."
    },
    {
      id: "doer_w8d1_q08",
      roundIndex: 7,
      prompt: "Dùng Past Participle (V3/ed) làm tính từ bổ nghĩa: 'Tôi đã quyên góp tiền để hỗ trợ các nạn nhân bị ảnh hưởng bởi bão lũ.'",
      options: [
        { id: "opt_A", label: "A", text: "I donated money to support the victims affected by the flood." },
        { id: "opt_B", label: "B", text: "I donated money to support the victims affecting by the flood." },
        { id: "opt_C", label: "C", text: "I donated money to support the victims are affected by the flood." },
        { id: "opt_D", label: "D", text: "I donated money to support the flood affected victims." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'the victims affected by the flood' là dạng rút gọn của 'victims who were affected by the flood' (Past participle mang nghĩa bị tác động)."
    },
    {
      id: "doer_w8d1_q09",
      roundIndex: 8,
      prompt: "Chuyển câu sau sang bị động thì Hiện tại tiếp diễn: 'He is carrying a chair upstairs.'",
      options: [
        { id: "opt_A", label: "A", text: "A chair is being carried upstairs." },
        { id: "opt_B", label: "B", text: "A chair is carried upstairs." },
        { id: "opt_C", label: "C", text: "A chair has been carried upstairs." },
        { id: "opt_D", label: "D", text: "A chair was being carried upstairs." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Thì Hiện tại tiếp diễn ở thể bị động: is/am/are + BEING + V3 -> 'is being carried'."
    },
    {
      id: "doer_w8d1_q10",
      roundIndex: 9,
      prompt: "Khác biệt bản chất giữa Present Participle (V-ing) và Past Participle (V3/ed) khi đứng bổ nghĩa cho danh từ là gì?",
      options: [
        { id: "opt_A", label: "A", text: "V-ing mang ý nghĩa chủ động thực hiện hành động; V-ed mang ý nghĩa bị tác động bởi hành động" },
        { id: "opt_B", label: "B", text: "V-ing dùng cho đồ vật; V-ed dùng cho con người" },
        { id: "opt_C", label: "C", text: "V-ing dùng trong quá khứ; V-ed dùng trong tương lai" },
        { id: "opt_D", label: "D", text: "Không có sự khác biệt, dùng thay thế nhau được" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "V-ing là phân từ chủ động (active: e.g. sleeping baby, disappointing result); V-ed là phân từ bị động (passive: e.g. affected victims, imported goods)."
    }
  ],

  "WEEK 8 – DAY 2": [
    {
      id: "doer_w8d2_q01",
      roundIndex: 0,
      prompt: "Trong chủ đề Crime & Law, từ \"lucrative\" trong tiêu đề \"Britain's lucrative marijuana trade\" ĐỒNG NGHĨA nhất với:",
      options: [
        { id: "opt_A", label: "A", text: "highly profitable" },
        { id: "opt_B", label: "B", text: "unprofitable" },
        { id: "opt_C", label: "C", text: "legal" },
        { id: "opt_D", label: "D", text: "perilous" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khi người viết muốn nhấn mạnh vào hành động/đối tượng chịu tác động hoặc khi chủ thể thực hiện hành động không quan trọng/chưa rõ",
      correctExplanation: "\"Lucrative\" (tính từ học thuật) mô tả một hoạt động hoặc thương vụ đem lại nguồn lợi nhuận kếch xù (profitable).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Trong tất cả mọi câu văn miêu tả quan điểm cá nhân",
        diagnosticTitle: "Nhầm lẫn giữa tính sinh lời với tính hợp pháp",
        explanation: "Buôn bán ma túy là phạm pháp (illegal) nhưng mang lại lợi nhuận khổng lồ nên gọi là lucrative trade."
      }
    },
    {
      id: "doer_w8d2_q02",
      roundIndex: 1,
      prompt: "Từ TRÁI NGHĨA với \"broke\" trong câu miêu tả tình cảnh khi hồi hương: \"Cuong returned broke and now lives in a modest house\" là:",
      options: [
        { id: "opt_A", label: "A", text: "wealthy" },
        { id: "opt_B", label: "B", text: "penniless" },
        { id: "opt_C", label: "C", text: "reformed" },
        { id: "opt_D", label: "D", text: "imprisoned" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. wealthy",
      correctExplanation: "\"Broke\" (tính từ khẩu ngữ thông dụng) = hoàn toàn rỗng túi, khánh kiệt tài chính. Từ trái nghĩa là \"wealthy\" hoặc \"affluent\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ khi người viết muốn câu văn dài thêm nhiều từ để đạt độ dài tối thiểu",
        diagnosticTitle: "Chọn nhầm từ đồng nghĩa thay vì từ trái nghĩa",
        explanation: "Penniless/bankrupt đồng nghĩa với broke. Đề bài đang yêu cầu tìm từ TRÁI NGHĨA."
      }
    },
    {
      id: "doer_w8d2_q03",
      roundIndex: 2,
      prompt: "Thuật ngữ tội phạm \"human trafficker\" trong bài đọc dùng để chỉ ai?",
      options: [
        { id: "opt_A", label: "A", text: "Kẻ buôn người" },
        { id: "opt_B", label: "B", text: "Cảnh sát điều phối giao thông đường bộ" },
        { id: "opt_C", label: "C", text: "Cán bộ quản lý xuất nhập cảnh tại sân bay" },
        { id: "opt_D", label: "D", text: "Tài xế lái xe buýt du lịch châu Âu" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Kẻ buôn người",
      correctExplanation: "\"Human trafficker\" là tội phạm buôn bán người xuyên quốc gia (trafficking: buôn lậu bất hợp pháp hàng cấm hoặc con người).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ khi người viết muốn câu văn dài thêm nhiều từ để đạt độ dài tối thiểu",
        diagnosticTitle: "Dịch nhầm từ gốc traffic (giao thông)",
        explanation: "Trong hình sự, trafficking là tội phạm buôn lậu/buôn người, không liên quan đến trật tự giao thông đường bộ."
      }
    },
    {
      id: "doer_w8d2_q04",
      roundIndex: 3,
      prompt: "Collocation tố tụng hình sự: \"The defendant was convicted of cultivating illicit plants and ______ to 10 months in prison.\"",
      options: [
        { id: "opt_A", label: "A", text: "sentenced" },
        { id: "opt_B", label: "B", text: "worded" },
        { id: "opt_C", label: "C", text: "phrased" },
        { id: "opt_D", label: "D", text: "scripted" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. sentenced",
      correctExplanation: "Cấu trúc pháp lý chuẩn: \"be sentenced to [time] in prison/jail\" (bị toà tuyên phạt mức án bao lâu).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ khi người viết muốn câu văn dài thêm nhiều từ để đạt độ dài tối thiểu",
        diagnosticTitle: "Dịch nhầm từ nghĩa ngữ pháp của sentence (câu văn)",
        explanation: "Trong luật pháp, \"sentence\" là bản án/tuyên án của thẩm phán, không liên quan đến câu cú ngữ pháp."
      }
    },
    {
      id: "doer_w8d2_q05",
      roundIndex: 4,
      prompt: "Chọn động từ đúng chỉ biện pháp hành chính cưỡng chế trục xuất người nhập cư trái phép: \"The immigration authorities ______ him back to his home country.\"",
      options: [
        { id: "opt_A", label: "A", text: "deported" },
        { id: "opt_B", label: "B", text: "imported" },
        { id: "opt_C", label: "C", text: "supported" },
        { id: "opt_D", label: "D", text: "transported" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. deported",
      correctExplanation: "\"Deport somebody (back to...)\" là thuật ngữ xuất nhập cảnh chỉ hành vi cưỡng chế trục xuất người nhập cư không hợp lệ về nước.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ khi người viết muốn câu văn dài thêm nhiều từ để đạt độ dài tối thiểu",
        diagnosticTitle: "Nhầm lẫn với hành vi nhập khẩu hàng hóa",
        explanation: "Import là nhập khẩu hàng hóa, deport mới là trục xuất con người vi phạm visa/nhập cảnh."
      }
    },
    {
      id: "doer_w8d2_q06",
      roundIndex: 5,
      prompt: "Chọn tính từ phù hợp diễn tả nỗ lực làm lại cuộc đời: \"Now he claims he is fully ______ and hopes to start clean with an honest livelihood.\"",
      options: [
        { id: "opt_A", label: "A", text: "reformed" },
        { id: "opt_B", label: "B", text: "deformed" },
        { id: "opt_C", label: "C", text: "uninformed" },
        { id: "opt_D", label: "D", text: "misinformed" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. reformed",
      correctExplanation: "\"A reformed criminal/character\" chỉ người từng phạm pháp nay đã ăn năn hối cải và hoàn lương sống lương thiện.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ khi người viết muốn câu văn dài thêm nhiều từ để đạt độ dài tối thiểu",
        diagnosticTitle: "Nhầm lẫn từ biến dạng thể xác với cải tạo nhân cách",
        explanation: "Deformed là bị biến dạng hình thể dị tật, hoàn toàn khác với reformed."
      }
    },
    {
      id: "doer_w8d2_q07",
      roundIndex: 6,
      prompt: "Chọn giới từ đúng miêu tả phương thức trốn nguy hiểm của người vượt biên: \"Migrants risked their lives hiding ______ a lorry to cross the English Channel.\"",
      options: [
        { id: "opt_A", label: "A", text: "underneath" },
        { id: "opt_B", label: "B", text: "above" },
        { id: "opt_C", label: "C", text: "along" },
        { id: "opt_D", label: "D", text: "between" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. underneath",
      correctExplanation: "\"Underneath a lorry\" (dưới gầm xe tải): Giới từ chỉ vị trí ẩn nấp nguy hiểm chết người của người tị nạn/di cư chui.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ khi người viết muốn câu văn dài thêm nhiều từ để đạt độ dài tối thiểu",
        diagnosticTitle: "Chọn vị trí trên nóc xe sai sự thật bài đọc",
        explanation: "Họ đu bám dưới trục gầm xe (underneath/under), trèo lên nóc xe (above) sẽ bị camera quét nhiệt phát hiện ngay lập tức."
      }
    },
    {
      id: "doer_w8d2_q08",
      roundIndex: 7,
      prompt: "Cụm danh từ \"fake passport\" trong bài đọc thuộc chủ đề giấy tờ giả mạo được viết chuẩn ngữ pháp là gì?",
      options: [
        { id: "opt_A", label: "A", text: "fake passport" },
        { id: "opt_B", label: "B", text: "untrue passport" },
        { id: "opt_C", label: "C", text: "wrong passport" },
        { id: "opt_D", label: "D", text: "error passport" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. fake passport",
      correctExplanation: "Collocation bất di bất dịch trong tội phạm giấy tờ: \"fake passport\" hoặc thuật ngữ pháp lý \"fraudulent passport\" (hộ chiếu giả mạo).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ khi người viết muốn câu văn dài thêm nhiều từ để đạt độ dài tối thiểu",
        diagnosticTitle: "Dịch từ \"hộ chiếu không thật\"",
        explanation: "Tiếng Anh không dùng untrue hay wrong cho giấy tờ giả, bắt buộc dùng fake/fraudulent/counterfeit."
      }
    },
    {
      id: "doer_w8d2_q09",
      roundIndex: 8,
      prompt: "VẬN DỤNG NGỮ CẢNH MỚI: Chọn từ thích hợp hoàn thành câu: \"International syndicates exploit vulnerable individuals to operate an extensive ______ drug network across borders.\"",
      options: [
        { id: "opt_A", label: "A", text: "illicit" },
        { id: "opt_B", label: "B", text: "campus" },
        { id: "opt_C", label: "C", text: "bland" },
        { id: "opt_D", label: "D", text: "relief" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. illicit",
      correctExplanation: "\"Illicit drug network\" là collocation học thuật band cao trong IELTS: mạng lưới buôn bán chất cấm phi pháp.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Trong tất cả mọi câu văn miêu tả quan điểm cá nhân",
        diagnosticTitle: "Chọn tính từ nhạt nhẽo của thức ăn",
        explanation: "Bland là hương vị thức ăn nhạt, hoàn toàn vô nghĩa trong văn cảnh tội phạm ma túy."
      }
    },
    {
      id: "doer_w8d2_q10",
      roundIndex: 9,
      prompt: "PARAPHRASE: Câu \"Impoverished migrants were coerced by organized gangs into cultivating illegal cannabis in suburban stash houses\" được diễn đạt lại tương đương nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "Criminal cartels exploited desperate laborers from underprivileged backgrounds to maintain clandestine marijuana farms." },
        { id: "opt_B", label: "B", text: "All migrants voluntarily invested millions of dollars into lawful agricultural greenhouses." },
        { id: "opt_C", label: "C", text: "British suburban homeowners regularly hire international botanists to cultivate rare ornamental flowers." },
        { id: "opt_D", label: "D", text: "Immigration authorities offered handsome subsidies to encourage underground cannabis distribution." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Criminal cartels exploited desperate laborers from underprivileged backgrounds to maintain clandestine marijuana farms.",
      correctExplanation: "\"Criminal cartels\" paraphrase cho \"organized gangs\", \"desperate laborers from underprivileged backgrounds\" paraphrase cho \"impoverished migrants coerced\", và \"clandestine marijuana farms\" paraphrase cho \"illegal cannabis in suburban stash houses\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ khi người viết muốn câu văn dài thêm nhiều từ để đạt độ dài tối thiểu",
        diagnosticTitle: "Tẩy trắng hoạt động tội phạm thành đầu tư nông nghiệp hợp pháp",
        explanation: "Bài đọc nêu rõ đây là chuỗi tội phạm ngầm bất hợp pháp với những lao động nghèo khó bị bóc lột."
      }
    }
  ],

  "WEEK 8 – DAY 3": [
    {
      id: "doer_w8d3_q01",
      roundIndex: 0,
      prompt: "Phát biểu nào sau đây là ĐÚNG về Trọng âm câu (Sentence Stress) trong tiếng Anh giao tiếp?",
      options: [
        { id: "opt_A", label: "A", text: "Linh hoạt phụ thuộc vào từ mang thông tin (content words) mà người nói muốn nhấn mạnh" },
        { id: "opt_B", label: "B", text: "Mọi từ trong câu đều phải được nói với cao độ và độ lớn hoàn toàn ngang bằng nhau" },
        { id: "opt_C", label: "C", text: "Chỉ có từ đầu tiên và từ cuối cùng của câu mới được nhấn trọng âm" },
        { id: "opt_D", label: "D", text: "Các mạo từ và giới từ luôn luôn là từ được nhấn mạnh nhất trong câu" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Sentence stress linh hoạt: Người nói nhấn mạnh vào Content Words (nouns, main verbs, adjectives) hoặc từ họ muốn làm nổi bật ý định thông báo.",
    },
    {
      id: "doer_w8d3_q02",
      roundIndex: 1,
      prompt: "Khi nói 'I gave her a BOX of chocolates for her birthday' (nhấn mạnh vào từ BOX), người nói muốn truyền tải ý gì?",
      options: [
        { id: "opt_A", label: "A", text: "Nhấn mạnh quy cách đóng gói (cả một cái hộp lớn chứ không phải thanh kẹo nhỏ)" },
        { id: "opt_B", label: "B", text: "Nhấn mạnh loại quà tặng là sô-cô-la chứ không phải bánh kẹo khác" },
        { id: "opt_C", label: "C", text: "Nhấn mạnh tặng vào dịp sinh nhật chứ không phải ngày lễ khác" },
        { id: "opt_D", label: "D", text: "Nhấn mạnh chính tôi là người tặng chứ không phải người khác" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Nhấn mạnh từ 'BOX' để làm nổi bật quy cách đóng gói (cả 1 hộp lớn)."
    },
    {
      id: "doer_w8d3_q03",
      roundIndex: 2,
      prompt: "Khi nói 'I gave her a box of chocolates for her BIRTHDAY', ý định người nói nhấn mạnh điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Nhấn mạnh vào dịp tặng là ngày sinh nhật của cô ấy" },
        { id: "opt_B", label: "B", text: "Nhấn mạnh loại kẹo được tặng" },
        { id: "opt_C", label: "C", text: "Nhấn mạnh người nhận quà là cô ấy chứ không phải ai khác" },
        { id: "opt_D", label: "D", text: "Nhấn mạnh hộp quà có kích thước lớn" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Nhấn mạnh 'BIRTHDAY' để khẳng định đây là món quà nhân dịp sinh nhật."
    },
    {
      id: "doer_w8d3_q04",
      roundIndex: 3,
      prompt: "Dịch sang tiếng Anh dùng từ 'originates': 'Món Bún Bò có nguồn gốc từ Huế, một thành phố ở miền Trung Việt Nam.'",
      options: [
        { id: "opt_A", label: "A", text: "Bun Bo originates from Hue, a city in the central part of Vietnam." },
        { id: "opt_B", label: "B", text: "Bun Bo is originated by Hue city where in central Vietnam." },
        { id: "opt_C", label: "C", text: "Bun Bo originates at Hue city located at central part." },
        { id: "opt_D", label: "D", text: "Bun Bo originate to Hue city, central Vietnam." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Động từ 'originate from [place]' = có nguồn gốc xuất xứ từ đâu."
    },
    {
      id: "doer_w8d3_q05",
      roundIndex: 4,
      prompt: "Collocation nào trong bài miêu tả món ăn để chỉ 'nước dùng đậm đà hương vị'?",
      options: [
        { id: "opt_A", label: "A", text: "A rich broth" },
        { id: "opt_B", label: "B", text: "A sweet sauce water" },
        { id: "opt_C", label: "C", text: "A tasteless soup liquid" },
        { id: "opt_D", label: "D", text: "A salty mineral drink" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'broth' là nước hầm thịt/xương, nước dùng. 'rich broth' hoặc 'flavorful broth' là nước dùng đậm đà."
    },
    {
      id: "doer_w8d3_q06",
      roundIndex: 5,
      prompt: "Dịch sang tiếng Anh: 'Món ăn này có giá cả rất phải chăng đối với mọi người.'",
      options: [
        { id: "opt_A", label: "A", text: "This dish is very affordable for everyone." },
        { id: "opt_B", label: "B", text: "This dish is too priceless for people." },
        { id: "opt_C", label: "C", text: "This dish costs cheap money with everybody." },
        { id: "opt_D", label: "D", text: "This dish is exorbitant to anyone." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'affordable' là tính từ học thuật chỉ giá cả vừa phải, hợp túi tiền."
    },
    {
      id: "doer_w8d3_q07",
      roundIndex: 6,
      prompt: "Trong câu: 'Nhà hàng này phục vụ món ăn rất ngon nên tôi là khách quen ở đây.' Cụm từ 'khách quen' tiếng Anh là gì?",
      options: [
        { id: "opt_A", label: "A", text: "A regular customer" },
        { id: "opt_B", label: "B", text: "A first-time visitor" },
        { id: "opt_C", label: "C", text: "A passenger" },
        { id: "opt_D", label: "D", text: "A casual pedestrian" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Trong văn nói, 'a regular' (hoặc regular customer) là khách hàng quen thuộc thường xuyên lui tới quán."
    },
    {
      id: "doer_w8d3_q08",
      roundIndex: 7,
      prompt: "Collocation 'thinly sliced beef' trong bài miêu tả món Bún Bò có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Thịt bò thái lát mỏng" },
        { id: "opt_B", label: "B", text: "Thịt bò xay nhuyễn" },
        { id: "opt_C", label: "C", text: "Thịt bò nướng nguyên tảng" },
        { id: "opt_D", label: "D", text: "Xương bò hầm nhừ" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'thinly sliced beef' = thịt bò được thái mỏng (trạng từ thinly bổ nghĩa cho tính từ sliced)."
    },
    {
      id: "doer_w8d3_q09",
      roundIndex: 8,
      prompt: "Cấu trúc chọn lựa: 'Nếu phải chọn một món ăn yêu thích, tôi sẽ chọn Bún Bò.' Trong tiếng Anh nói thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "If I had to choose one, I would go for Bun Bo." },
        { id: "opt_B", label: "B", text: "If I have to choose one, I go to Bun Bo." },
        { id: "opt_C", label: "C", text: "Supposing I choose one, I will pick up Bun Bo." },
        { id: "opt_D", label: "D", text: "When I had choose one, I must take Bun Bo." }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "Câu điều kiện loại 2 giả định lịch sự trong Speaking: 'If I had to choose one, I would go for [dish]...' (go for = chọn/thích)."
    },
    {
      id: "doer_w8d3_q10",
      roundIndex: 9,
      prompt: "Trong câu 'I'd rather drink coffee than boba tea', cấu trúc 'would rather... than...' diễn tả điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Diễn tả sở thích muốn làm việc này hơn là làm việc kia (prefer)" },
        { id: "opt_B", label: "B", text: "Diễn tả sự bắt buộc phải uống cả hai" },
        { id: "opt_C", label: "C", text: "Diễn tả một điều hối tiếc trong quá khứ" },
        { id: "opt_D", label: "D", text: "Diễn tả việc từ chối không uống bất kỳ thứ gì" }
      ],
      correctOptionId: "opt_A",
      timeLimitSeconds: 20,
      points: 1000,
      explanation: "'would rather do sth than do sth else' mang nghĩa thích làm việc A hơn là làm việc B."
    }
  ]
};
