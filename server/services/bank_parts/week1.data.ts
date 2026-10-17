/**
 * Question Bank for Week 1 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_1_QUESTIONS: Record<string, any[]> = {
  "WEEK 1 – DAY 1": [
    {
      id: "doer_w1d1_q01",
      roundIndex: 0,
      prompt: "Trong 4 cấp độ ngôn ngữ (word, phrase, clause, sentence), thành phần nào bắt buộc phải có cặp Subject và Finite Verb?",
      options: [
        { id: "opt_A", label: "A", text: "Clause" },
        { id: "opt_B", label: "B", text: "Phrase" },
        { id: "opt_C", label: "C", text: "Word" },
        { id: "opt_D", label: "D", text: "Modifier" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Clause",
      correctExplanation: "Mệnh đề (clause) luôn luôn phải có chủ ngữ (Subject) và động từ chính có chia thì (Finite Verb).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Nhầm lẫn giữa Phrase và Clause",
        explanation: "Phrase chỉ là một tập hợp từ liên kết nhau, không chứa cặp Subject - Finite Verb trọn vẹn."
      }
    },
    {
      id: "doer_w1d1_q02",
      roundIndex: 1,
      prompt: "Xét câu: \"The room was filled with expensive ______.\" Chọn danh từ chính xác:",
      options: [
        { id: "opt_A", label: "A", text: "equipment" },
        { id: "opt_B", label: "B", text: "equipments" },
        { id: "opt_C", label: "C", text: "an equipment" },
        { id: "opt_D", label: "D", text: "many equipments" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. equipment",
      correctExplanation: "Equipment là danh từ không đếm được (uncountable noun), không bao giờ có đuôi -s hay mạo từ an.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Thêm -s vào danh từ không đếm được",
        explanation: "Người học thường dịch từ \"nhiều thiết bị\" và tự động thêm số nhiều -s vào equipment, đây là lỗi phổ biến trong IELTS."
      }
    },
    {
      id: "doer_w1d1_q03",
      roundIndex: 2,
      prompt: "Xét từ \"book\" trong 2 câu: (1) \"I will book a flight.\" và (2) \"The book is interesting.\" Từ loại tương ứng là:",
      options: [
        { id: "opt_A", label: "A", text: "(1) Verb - (2) Noun" },
        { id: "opt_B", label: "B", text: "(1) Noun - (2) Verb" },
        { id: "opt_C", label: "C", text: "(1) Verb - (2) Adjective" },
        { id: "opt_D", label: "D", text: "(1) Noun - (2) Noun" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. (1) Verb - (2) Noun",
      correctExplanation: "Trong câu (1), book là động từ (đặt vé). Trong câu (2), book là danh từ (quyển sách).",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Modifier",
        diagnosticTitle: "Định kiến từ loại cố định",
        explanation: "Rất nhiều từ trong tiếng Anh vừa có thể làm danh từ vừa làm động từ tuỳ vị trí và chức năng trong câu."
      }
    },
    {
      id: "doer_w1d1_q04",
      roundIndex: 3,
      prompt: "Xác định lỗi sai trong câu: \"My parents gave me many useful advices in life.\"",
      options: [
        { id: "opt_A", label: "A", text: "many useful advices -> much useful advice" },
        { id: "opt_B", label: "B", text: "gave -> give" },
        { id: "opt_C", label: "C", text: "in life -> on life" },
        { id: "opt_D", label: "D", text: "parents -> parent" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. many useful advices -> much useful advice",
      correctExplanation: "Advice là danh từ không đếm được, không dùng many và không có đuôi -s. Dùng much advice hoặc pieces of advice.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Word",
        diagnosticTitle: "Phân tâm vào giới từ",
        explanation: "Người học thường săm soi giới từ mà bỏ sót lỗi cốt lõi về danh từ không đếm được (advice)."
      }
    },
    {
      id: "doer_w1d1_q05",
      roundIndex: 4,
      prompt: "Chọn dạng động từ đúng: \"One of my sisters ______ going on a trip to France.\"",
      options: [
        { id: "opt_A", label: "A", text: "is" },
        { id: "opt_B", label: "B", text: "are" },
        { id: "opt_C", label: "C", text: "were" },
        { id: "opt_D", label: "D", text: "have been" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. is",
      correctExplanation: "Chủ ngữ thật của câu là đại từ số ít \"One\", không phải \"sisters\", do đó động từ to be phải chia số ít là \"is\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Bẫy danh từ đứng liền kề (Proximity Trap)",
        explanation: "Học viên thấy từ \"sisters\" đứng ngay trước chỗ trống nên chia \"are\", quên mất chủ ngữ chính là \"One of...\"."
      }
    },
    {
      id: "doer_w1d1_q06",
      roundIndex: 5,
      prompt: "Chọn câu viết đúng ngữ pháp Subject - Finite Verb:",
      options: [
        { id: "opt_A", label: "A", text: "Reading books is beneficial to children's development." },
        { id: "opt_B", label: "B", text: "Know English beneficial to students." },
        { id: "opt_C", label: "C", text: "Handsome is important to become a hot Tiktoker." },
        { id: "opt_D", label: "D", text: "He named his son is Tom." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Reading books is beneficial to children's development.",
      correctExplanation: "Danh động từ (Gerund) \"Reading books\" làm Subject số ít, Finite Verb là \"is\", vị ngữ là tính từ \"beneficial to\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Thiếu Finite Verb hoặc dùng Verb nguyên mẫu làm S",
        explanation: "Know không thể làm chủ ngữ (phải là Knowing), và câu thiếu động từ to be \"is beneficial\"."
      }
    },
    {
      id: "doer_w1d1_q07",
      roundIndex: 6,
      prompt: "Chọn câu diễn đạt đúng: \"Sếp tôi bắt tôi phải hoàn thành công việc trước 5 giờ chiều.\"",
      options: [
        { id: "opt_A", label: "A", text: "My boss makes me complete the task before 5 PM." },
        { id: "opt_B", label: "B", text: "My boss makes me to complete the task before 5 PM." },
        { id: "opt_C", label: "C", text: "My boss forces me complete the task before 5 PM." },
        { id: "opt_D", label: "D", text: "My boss make me completing the task before 5 PM." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. My boss makes me complete the task before 5 PM.",
      correctExplanation: "Cấu trúc sai khiến: make someone DO something (động từ nguyên mẫu không to).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Thêm \"to\" sau make sb",
        explanation: "Thói quen dùng \"to-infinitive\" sau mọi tân ngữ là sai lầm phổ biến; sau make sb phải là V nguyên thể."
      }
    },
    {
      id: "doer_w1d1_q08",
      roundIndex: 7,
      prompt: "Xác định lỗi sai trong câu: \"The teacher gave us too many homeworks to do at the weekend.\"",
      options: [
        { id: "opt_A", label: "A", text: "too many homeworks -> too much homework" },
        { id: "opt_B", label: "B", text: "gave -> gives" },
        { id: "opt_C", label: "C", text: "to do -> doing" },
        { id: "opt_D", label: "D", text: "at the weekend -> on weekend" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. too many homeworks -> too much homework",
      correctExplanation: "Homework là danh từ không đếm được trong tiếng Anh, luôn dùng too much homework chứ không có many homeworks.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Word",
        diagnosticTitle: "Nhầm lẫn mục đích to-infinitive",
        explanation: "Homework to do là cấu trúc hoàn toàn chuẩn chỉ mục đích, lỗi sai thực sự nằm ở danh từ không đếm được."
      }
    },
    {
      id: "doer_w1d1_q09",
      roundIndex: 8,
      prompt: "Chọn câu diễn đạt đúng: \"Đi du học cho phép sinh viên hiểu biết thêm về các nền văn hóa khác.\"",
      options: [
        { id: "opt_A", label: "A", text: "Studying abroad allows students to know more about different cultures." },
        { id: "opt_B", label: "B", text: "Studying abroad allows students know more about different cultures." },
        { id: "opt_C", label: "C", text: "Study abroad allow students to knowing more about different cultures." },
        { id: "opt_D", label: "D", text: "Studying abroad allows that students knowing different cultures." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Studying abroad allows students to know more about different cultures.",
      correctExplanation: "Cấu trúc chuẩn: allow someone TO DO something. Chủ ngữ Gerund Studying abroad chia động từ allows.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Bỏ quên \"to\" sau allow sb",
        explanation: "Khác với make sb do, động từ allow bắt buộc phải đi với to-V: allow sb TO do sth."
      }
    },
    {
      id: "doer_w1d1_q10",
      roundIndex: 9,
      prompt: "Xác định câu viết SAI cấu trúc Subject - Finite Verb trong các câu sau:",
      options: [
        { id: "opt_A", label: "A", text: "The course helps him can write professional emails in English." },
        { id: "opt_B", label: "B", text: "Studying abroad allows students to broaden their knowledge of different cultures." },
        { id: "opt_C", label: "C", text: "Not doing regular exercise makes people's physical health poorer." },
        { id: "opt_D", label: "D", text: "His detailed advice on future career choices is very helpful to us." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The course helps him can write professional emails in English.",
      correctExplanation: "Sau cấu trúc help someone, động từ theo sau là V nguyên mẫu (write) hoặc to-V (to write), KHÔNG BAO GIỜ kẹp thêm modal verb \"can\" (lỗi thừa động từ vị ngữ: helps him write).",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Modifier",
        diagnosticTitle: "Bẫy danh từ bổ ngữ số nhiều \"choices\"",
        explanation: "Học viên hay tưởng nhầm câu D sai vì thấy choices là số nhiều đi với is, nhưng chủ ngữ chính thật sự là danh từ không đếm được advice (chia is là hoàn toàn đúng)."
      }
    }
  ],
  "WEEK 1 – DAY 2": [
    {
      id: "doer_w1d2_q01",
      roundIndex: 0,
      prompt: "Trong chủ đề Education, từ ĐỒNG NGHĨA chuẩn xác nhất với \"tuition fees\" (học phí đại học) là:",
      options: [
        { id: "opt_A", label: "A", text: "education costs / college charges" },
        { id: "opt_B", label: "B", text: "travel fares / ticket prices" },
        { id: "opt_C", label: "C", text: "rental deposit / lease fees" },
        { id: "opt_D", label: "D", text: "living expenses / allowances" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. education costs / college charges",
      correctExplanation: "\"Tuition fees\" là tiền học phí, đồng nghĩa với education costs hoặc college charges.",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Modifier",
        diagnosticTitle: "Nhầm học phí với chi phí sinh hoạt",
        explanation: "Living expenses là tiền ăn ở, sinh hoạt cá nhân, hoàn toàn tách biệt với tiền học phí (tuition fees)."
      }
    },
    {
      id: "doer_w1d2_q02",
      roundIndex: 1,
      prompt: "Từ TRÁI NGHĨA với \"optimistic\" trong câu miêu tả tinh thần người lính: \"He was so optimistic and committed\" là:",
      options: [
        { id: "opt_A", label: "A", text: "pessimistic" },
        { id: "opt_B", label: "B", text: "enthusiastic" },
        { id: "opt_C", label: "C", text: "exhausted" },
        { id: "opt_D", label: "D", text: "committed" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. pessimistic",
      correctExplanation: "\"Optimistic\" = lạc quan, tin tưởng vào tương lai tốt đẹp. Trái nghĩa trực tiếp là \"pessimistic\" (bi quan).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Word",
        diagnosticTitle: "Nhầm lẫn giữa trạng thái thể lực kiệt sức và thái độ bi quan",
        explanation: "Exhausted là kiệt sức về thể chất, không phải từ trái nghĩa về mặt thái độ tinh thần của optimistic."
      }
    },
    {
      id: "doer_w1d2_q03",
      roundIndex: 2,
      prompt: "Trong câu: \"The camp was really hard, but I passed first time – which was a big relief to me!\", từ \"relief\" mang nghĩa gì?",
      options: [
        { id: "opt_A", label: "A", text: "Cảm giác nhẹ nhõm, trút bỏ được âu lo, căng thẳng" },
        { id: "opt_B", label: "B", text: "Sự thất vọng tột cùng khi gặp thất bại" },
        { id: "opt_C", label: "C", text: "Sự tức giận vì bài thi quá khắt khe" },
        { id: "opt_D", label: "D", text: "Nỗi hoang mang lo sợ điều nguy hiểm sắp tới" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Cảm giác nhẹ nhõm, trút bỏ được âu lo, căng thẳng",
      correctExplanation: "\"Relief\" (danh từ) mô tả cảm xúc thư thái, nhẹ nhõm sau khi vượt qua một áp lực hay nỗi âu lo lớn.",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Modifier",
        diagnosticTitle: "Nhầm lẫn cảm xúc tích cực sau thi với áp lực lo lắng trước thi",
        explanation: "Relief xuất hiện sau khi bạn đã vượt qua thử thách thành công, mang nghĩa trút bỏ gánh nặng."
      }
    },
    {
      id: "doer_w1d2_q04",
      roundIndex: 3,
      prompt: "Chọn từ điền vào collocation chuẩn: \"Students can learn more about the ______ application of their academic knowledge.\"",
      options: [
        { id: "opt_A", label: "A", text: "practical" },
        { id: "opt_B", label: "B", text: "practice" },
        { id: "opt_C", label: "C", text: "practically" },
        { id: "opt_D", label: "D", text: "practitioner" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. practical",
      correctExplanation: "Collocation học thuật: \"practical application\" (sự ứng dụng mang tính thực tiễn vào đời sống).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Nhầm lẫn danh từ practice với tính từ practical đứng trước danh từ",
        explanation: "Trước danh từ \"application\" cần một tính từ bổ nghĩa là \"practical\"."
      }
    },
    {
      id: "doer_w1d2_q05",
      roundIndex: 4,
      prompt: "Collocation nào trong bài đọc chỉ việc \"bỏ học giữa chừng / thôi học trước khi tốt nghiệp\"?",
      options: [
        { id: "opt_A", label: "A", text: "dropping out of school" },
        { id: "opt_B", label: "B", text: "breaking up with school" },
        { id: "opt_C", label: "C", text: "going on with university" },
        { id: "opt_D", label: "D", text: "falling down the exam" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. dropping out of school",
      correctExplanation: "\"Drop out of school/university\" là phrasal verb chuẩn xác chỉ hành vi bỏ học giữa chừng.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Dùng phrasal verb quan hệ tình cảm cho trường học",
        explanation: "Break up dùng cho chia tay người yêu, không dùng cho việc thôi học."
      }
    },
    {
      id: "doer_w1d2_q06",
      roundIndex: 5,
      prompt: "Cụm collocation \"stay alert\" trong hướng dẫn phòng cháy rừng (\"we always have to stay alert\") có nghĩa là:",
      options: [
        { id: "opt_A", label: "A", text: "luôn tỉnh táo, cảnh giác và chú ý cao độ trước nguy hiểm" },
        { id: "opt_B", label: "B", text: "luôn chạy thật nhanh về phía trước" },
        { id: "opt_C", label: "C", text: "giữ im lặng tuyệt đối không phát ra tiếng động" },
        { id: "opt_D", label: "D", text: "ở yên trong lều không được bước ra ngoài" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. luôn tỉnh táo, cảnh giác và chú ý cao độ trước nguy hiểm",
      correctExplanation: "\"Stay alert\" = duy trì sự tỉnh táo và tập trung cảnh giác cao độ.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Nhầm trạng thái nhận thức tinh thần với hành động thể chất",
        explanation: "Alert là trạng thái tập trung nhận thức của não bộ trước rủi ro, không phải hành vi vận động."
      }
    },
    {
      id: "doer_w1d2_q07",
      roundIndex: 6,
      prompt: "Chọn từ loại thích hợp sau tính từ sở hữu: \"Our university programs encourage students to explore their personal ______.\"",
      options: [
        { id: "opt_A", label: "A", text: "interests" },
        { id: "opt_B", label: "B", text: "interesting" },
        { id: "opt_C", label: "C", text: "interested" },
        { id: "opt_D", label: "D", text: "interestingly" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. interests",
      correctExplanation: "Sau tính từ sở hữu \"their personal\" bắt buộc phải là một danh từ số nhiều: \"interests\" (các mối quan tâm / sở thích).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Word",
        diagnosticTitle: "Nhầm lẫn tính từ cảm xúc đuôi -ed với danh từ",
        explanation: "Interested là tính từ chỉ cảm xúc của người, không thể làm tân ngữ trực tiếp sau explore their."
      }
    },
    {
      id: "doer_w1d2_q08",
      roundIndex: 7,
      prompt: "Từ vựng cực độ (extreme adjective): Thay vì nói \"very tired after five days of firefighting\", tác giả đã dùng từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "exhausted" },
        { id: "opt_B", label: "B", text: "bland" },
        { id: "opt_C", label: "C", text: "relieved" },
        { id: "opt_D", label: "D", text: "vast" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. exhausted",
      correctExplanation: "\"Exhausted\" là tính từ cực độ tương đương với \"extremely tired / completely worn out\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Word",
        diagnosticTitle: "Nhầm cảm giác nhẹ nhõm với kiệt sức",
        explanation: "Relieved là cảm thấy nhẹ nhõm sau khi trút được gánh lo, không chỉ sự cạn kiệt năng lượng."
      }
    },
    {
      id: "doer_w1d2_q09",
      roundIndex: 8,
      prompt: "VẬN DỤNG NGỮ CẢNH MỚI: Chọn từ thích hợp điền vào câu học thuật: \"The new research lab was built in the center of the university ______ to facilitate collaboration.\"",
      options: [
        { id: "opt_A", label: "A", text: "campus" },
        { id: "opt_B", label: "B", text: "yard" },
        { id: "opt_C", label: "C", text: "corridor" },
        { id: "opt_D", label: "D", text: "runway" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. campus",
      correctExplanation: "\"University campus\" là khuôn viên tổng thể của một trường đại học gồm các tòa giảng đường, viện nghiên cứu và tiện ích.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Dịch từ \"sân bãi\" thay vì khuôn viên học thuật",
        explanation: "Yard chỉ khoảnh sân nhỏ trước/sau nhà, không dùng chỉ toàn bộ khuôn viên trường đại học."
      }
    },
    {
      id: "doer_w1d2_q10",
      roundIndex: 9,
      prompt: "PARAPHRASE: Câu \"Even experienced firefighters can find themselves in difficult situations, so they must follow safety procedures carefully\" được diễn đạt lại chuẩn xác nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "Strict adherence to safety guidelines is essential, as even veteran workers are not immune to hazards." },
        { id: "opt_B", label: "B", text: "Experienced firefighters never make mistakes because safety rules are completely unnecessary." },
        { id: "opt_C", label: "C", text: "Firefighters are prohibited from entering dangerous zones without permission from instructors." },
        { id: "opt_D", label: "D", text: "Following procedures guarantees that no wildfire will ever change its direction." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Strict adherence to safety guidelines is essential, as even veteran workers are not immune to hazards.",
      correctExplanation: "\"Strict adherence to safety guidelines\" paraphrase cho \"follow safety procedures carefully\", và \"veteran workers are not immune to hazards\" paraphrase cho \"experienced firefighters can find themselves in difficult situations\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Hiểu sai nghĩa cảnh báo thành khẳng định tuyệt đối",
        explanation: "Đoạn văn cảnh báo người có kinh nghiệm vẫn gặp nguy hiểm, không hề khẳng định họ không bao giờ mắc lỗi."
      }
    }
  ],
  "WEEK 1 – DAY 3": [
    {
      id: "doer_w1d3_q01",
      roundIndex: 0,
      prompt: "Từ nào sau đây có phần gạch chân chứa nguyên âm dài /iː/ khác với các từ còn lại?",
      options: [
        { id: "opt_A", label: "A", text: "colleague" },
        { id: "opt_B", label: "B", text: "biscuit" },
        { id: "opt_C", label: "C", text: "building" },
        { id: "opt_D", label: "D", text: "system" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. colleague",
      correctExplanation: "\"colleague\" phát âm là /ˈkɒliːɡ/ chứa nguyên âm dài /iː/. Trong khi đó, \"biscuit\" /ˈbɪskɪt/, \"building\" /ˈbɪldɪŋ/, \"system\" /ˈsɪstəm/ đều mang nguyên âm ngắn /ɪ/.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Nhầm lẫn chữ 'ui' trong biscuit phát âm dài",
        explanation: "Học viên hay nhầm 'ui' trong biscuit phát âm là âm dài, nhưng thực tế biscuit đọc là âm /ɪ/ ngắn."
      }
    },
    {
      id: "doer_w1d3_q02",
      roundIndex: 1,
      prompt: "Từ nào sau đây có nguyên âm được phát âm là /æ/ (khác với âm /e/ của các từ còn lại)?",
      options: [
        { id: "opt_A", label: "A", text: "plaid" },
        { id: "opt_B", label: "B", text: "bread" },
        { id: "opt_C", label: "C", text: "dead" },
        { id: "opt_D", label: "D", text: "said" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. plaid",
      correctExplanation: "\"plaid\" là trường hợp đặc biệt phát âm là /plæd/ (nguyên âm /æ/). Trong khi \"bread\" /bred/, \"dead\" /ded/, và \"said\" /sed/ đều mang âm /e/ ngắn.",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Modifier",
        diagnosticTitle: "Nhầm lẫn từ nói said mang âm /æ/",
        explanation: "Nhiều người học lầm tưởng 'said' phát âm dạng /seɪd/ hoặc /sæd/, nhưng phiên âm chuẩn là /sed/ (âm /e/)."
      }
    },
    {
      id: "doer_w1d3_q03",
      roundIndex: 2,
      prompt: "Nguyên âm trung tâm ngắn, phổ biến nhất trong tiếng Anh thường xuất hiện trong từ \"today\" /təˈdeɪ/ là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Schwa /ə/" },
        { id: "opt_B", label: "B", text: "/ʌ/" },
        { id: "opt_C", label: "C", text: "/з:/" },
        { id: "opt_D", label: "D", text: "/æ/" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Schwa /ə/",
      correctExplanation: "Âm schwa /ə/ là nguyên âm lướt nhẹ, không bao giờ mang trọng âm, xuất hiện trong today, about, doctor.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Nhầm schwa với âm á /ʌ/",
        explanation: "Âm /ʌ/ (trong cup, duck) có thể mang trọng âm, còn schwa /ə/ luôn ở âm tiết không nhấn."
      }
    },
    {
      id: "doer_w1d3_q04",
      roundIndex: 3,
      prompt: "Trong cuộc hội thoại làm quen công việc, khi bạn Khang nói \"I'm a first-year student\", câu tiếp theo phù hợp về thì hiện tại là:",
      options: [
        { id: "opt_A", label: "A", text: "I don't have a job yet." },
        { id: "opt_B", label: "B", text: "I didn't have a job yet." },
        { id: "opt_C", label: "C", text: "I'm not having a job yet." },
        { id: "opt_D", label: "D", text: "I no have a job yet." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I don't have a job yet.",
      correctExplanation: "Diễn tả thực tế hiện tại với động từ chỉ trạng thái sở hữu: dùng Simple Present phủ định \"don't have\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. I'm not having a job yet.",
        diagnosticTitle: "Dùng Present Continuous với động từ sở hữu (Stative Verb)",
        explanation: "\"Have\" mang nghĩa sở hữu là stative verb, không chia thì tiếp diễn trong ngữ cảnh này."
      }
    },
    {
      id: "doer_w1d3_q05",
      roundIndex: 4,
      prompt: "Để nói \"Tôi đang chịu rất nhiều áp lực trong công việc\", cụm từ tự nhiên chuẩn học thuật là:",
      options: [
        { id: "opt_A", label: "A", text: "I am under a lot of pressure" },
        { id: "opt_B", label: "B", text: "I am in a lot of pressure" },
        { id: "opt_C", label: "C", text: "I have a lot of pressured" },
        { id: "opt_D", label: "D", text: "I take many pressure" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I am under a lot of pressure",
      correctExplanation: "Collocation chuẩn với áp lực là: to be UNDER pressure / under a lot of pressure.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Dùng sai giới từ (in thay vì under)",
        explanation: "Người học tiếng Việt thường dịch \"trong áp lực\" thành \"in pressure\", nhưng tiếng Anh quy chuẩn là \"under pressure\"."
      }
    },
    {
      id: "doer_w1d3_q06",
      roundIndex: 5,
      prompt: "Khi nói về triển vọng nghề nghiệp sau khi tốt nghiệp đại học, cụm từ nào sau đây là chuẩn collocation?",
      options: [
        { id: "opt_A", label: "A", text: "job opportunities after graduation" },
        { id: "opt_B", label: "B", text: "job chances after graduate" },
        { id: "opt_C", label: "C", text: "working possibilities after graduate" },
        { id: "opt_D", label: "D", text: "career occasions after graduating" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. job opportunities after graduation",
      correctExplanation: "\"Job opportunities after graduation\" là cụm từ học thuật chuẩn xác chỉ cơ hội việc làm sau tốt nghiệp.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Dùng từ thân mật \"chance\" và sai từ loại sau \"after\"",
        explanation: "Chance mang nghĩa cơ hội may rủi hơn là cơ hội nghề nghiệp trang trọng, và sau giới từ after phải là danh từ graduation."
      }
    },
    {
      id: "doer_w1d3_q07",
      roundIndex: 6,
      prompt: "Để diễn đạt \"Công việc của tôi có lương bèo bọt / thấp\", cách nói tự nhiên và chính xác là:",
      options: [
        { id: "opt_A", label: "A", text: "My job is low-paid." },
        { id: "opt_B", label: "B", text: "My job is cheap salary." },
        { id: "opt_C", label: "C", text: "My job earns small money." },
        { id: "opt_D", label: "D", text: "My salary is very short." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. My job is low-paid.",
      correctExplanation: "Tính từ miêu tả công việc lương thấp là \"low-paid\" (hoặc \"poorly-paid\", \"a low salary\").",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Dịch \"rẻ\" thành \"cheap salary\"",
        explanation: "Tuyệt đối không dùng \"cheap\" với lương bổng trong tiếng Anh."
      }
    },
    {
      id: "doer_w1d3_q08",
      roundIndex: 7,
      prompt: "Chọn từ điền vào chỗ trống: \"I like studying English ______ it helps me get promoted at work.\"",
      options: [
        { id: "opt_A", label: "A", text: "because" },
        { id: "opt_B", label: "B", text: "although" },
        { id: "opt_C", label: "C", text: "so" },
        { id: "opt_D", label: "D", text: "however" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. because",
      correctExplanation: "Vế sau giải thích nguyên nhân/lý do cho vế trước, do đó sử dụng liên từ \"because\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Word",
        diagnosticTitle: "Đảo lộn nguyên nhân - kết quả",
        explanation: "\"So\" chỉ kết quả, nếu dùng \"so\" thì vế \"helps me get promoted\" phải ở trước."
      }
    },
    {
      id: "doer_w1d3_q09",
      roundIndex: 8,
      prompt: "Chọn giới từ đúng để chỉ phương thức thực hiện hành động: \"I improve my pronunciation ______ practicing with native speakers every day.\"",
      options: [
        { id: "opt_A", label: "A", text: "by" },
        { id: "opt_B", label: "B", text: "with" },
        { id: "opt_C", label: "C", text: "for" },
        { id: "opt_D", label: "D", text: "at" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. by",
      correctExplanation: "Cấu trúc chỉ phương tiện / cách thức: by + V-ing (bằng cách làm gì).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Dịch \"với việc luyện tập\" thành \"with V-ing\"",
        explanation: "Chỉ phương thức hành động để đạt kết quả luôn dùng giới từ \"by + V-ing\", không dùng \"with\"."
      }
    },
    {
      id: "doer_w1d3_q10",
      roundIndex: 9,
      prompt: "Cụm từ nào sau đây diễn đạt mức độ yêu thích cao hơn và học thuật hơn \"I like football\"?",
      options: [
        { id: "opt_A", label: "A", text: "I am really keen on football." },
        { id: "opt_B", label: "B", text: "I very like football." },
        { id: "opt_C", label: "C", text: "I like so much football." },
        { id: "opt_D", label: "D", text: "Football is my favourite love." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I am really keen on football.",
      correctExplanation: "\"To be keen on\" (hoặc \"to be a big fan of / passionate about\") là cách diễn đạt tự nhiên, tránh lỗi dịch word-by-word.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase",
        diagnosticTitle: "Lỗi ngữ pháp sơ đẳng \"very like\"",
        explanation: "Phó từ \"very\" không bao giờ bổ nghĩa trực tiếp cho động từ thường (không dùng very like, phải là like very much)."
      }
    }
  ]
};
