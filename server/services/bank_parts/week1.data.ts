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
        { id: "opt_A", label: "A", text: "Clause (mệnh đề)" },
        { id: "opt_B", label: "B", text: "Phrase (cụm từ)" },
        { id: "opt_C", label: "C", text: "Word (từ đơn)" },
        { id: "opt_D", label: "D", text: "Modifier (thành phần bổ nghĩa)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Clause (mệnh đề)",
      correctExplanation: "Mệnh đề (clause) luôn luôn phải có chủ ngữ (Subject) và động từ chính có chia thì (Finite Verb).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phrase (cụm từ)",
        diagnosticTitle: "Nhầm lẫn giữa Phrase và Clause",
        explanation: "Phrase (cụm từ) chỉ là một tập hợp từ liên kết nhau, không chứa cặp Subject - Finite Verb trọn vẹn."
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
        baitOptionText: "B. equipments",
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
        baitOptionText: "D. (1) Noun - (2) Noun",
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
        baitOptionText: "C. in life -> on life",
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
        baitOptionText: "B. are",
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
        baitOptionText: "B. Know English beneficial to students.",
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
        baitOptionText: "B. My boss makes me to complete the task before 5 PM.",
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
        baitOptionText: "C. to do -> doing",
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
        baitOptionText: "B. Studying abroad allows students know more about different cultures.",
        diagnosticTitle: "Bỏ quên \"to\" sau allow sb",
        explanation: "Khác với make sb do, động từ allow bắt buộc phải đi với to-V: allow sb TO do sth."
      }
    },
    {
      id: "doer_w1d1_q10",
      roundIndex: 9,
      prompt: "Chọn câu có dạng chia động từ đúng cho chủ ngữ \"His advice on careers\":",
      options: [
        { id: "opt_A", label: "A", text: "His advice on careers is very useful to me." },
        { id: "opt_B", label: "B", text: "His advice on careers are very useful to me." },
        { id: "opt_C", label: "C", text: "His advice on careers were very useful to me." },
        { id: "opt_D", label: "D", text: "His advices on careers are very useful to me." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. His advice on careers is very useful to me.",
      correctExplanation: "Advice là danh từ không đếm được (luôn số ít), cụm giới từ \"on careers\" chỉ là bổ ngữ, nên động từ to be chia là \"is\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. His advice on careers are very useful to me.",
        diagnosticTitle: "Bẫy hòa hợp với danh từ bổ ngữ \"careers\"",
        explanation: "Học viên thấy careers có s đứng gần to be nên chọn are, quên mất chủ ngữ chính của câu là danh từ không đếm được advice."
      }
    }
  ],
  "WEEK 1 – DAY 2": [
    {
      id: "doer_w1d2_q01",
      roundIndex: 0,
      prompt: "Chọn từ chính xác để hoàn thành câu: \"We offer affordable tuition ______ and many scholarships for talented students.\"",
      options: [
        { id: "opt_A", label: "A", text: "fees" },
        { id: "opt_B", label: "B", text: "prices" },
        { id: "opt_C", label: "C", text: "costs" },
        { id: "opt_D", label: "D", text: "fares" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. fees",
      correctExplanation: "Collocation chuẩn trong giáo dục: \"tuition fees\" mang nghĩa học phí.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. prices",
        diagnosticTitle: "Dịch từ \"giá cả\" trong tiếng Việt",
        explanation: "Tiếng Việt nói \"giá học phí\", nhưng trong tiếng Anh học thuật, chi phí dịch vụ/trường học dùng \"fees\", không dùng \"prices\"."
      }
    },
    {
      id: "doer_w1d2_q02",
      roundIndex: 1,
      prompt: "Chọn từ thích hợp: \"Students can learn more about the ______ application of their knowledge.\"",
      options: [
        { id: "opt_A", label: "A", text: "practical" },
        { id: "opt_B", label: "B", text: "practice" },
        { id: "opt_C", label: "C", text: "practically" },
        { id: "opt_D", label: "D", text: "practitioner" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. practical",
      correctExplanation: "Trước danh từ \"application\" cần một tính từ bổ nghĩa: \"practical application\" (ứng dụng thực tiễn).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. practice",
        diagnosticTitle: "Nhầm lẫn danh từ ghép với tính từ",
        explanation: "Dù có một số noun adjunct, cụm từ chuẩn học thuật là tính từ practical + application."
      }
    },
    {
      id: "doer_w1d2_q03",
      roundIndex: 2,
      prompt: "Chọn từ đúng: \"You can enjoy the friendly environment of our beautiful university ______.\"",
      options: [
        { id: "opt_A", label: "A", text: "campus" },
        { id: "opt_B", label: "B", text: "yard" },
        { id: "opt_C", label: "C", text: "field" },
        { id: "opt_D", label: "D", text: "ground" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. campus",
      correctExplanation: "Khuôn viên trường đại học gồm giảng đường, thư viện, ký túc xá được gọi là \"campus\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. yard",
        diagnosticTitle: "Dịch từ \"sân trường\"",
        explanation: "Yard chỉ là một khoảng sân nhỏ, toàn bộ khuôn viên trường học thuật phải dùng \"campus\"."
      }
    },
    {
      id: "doer_w1d2_q04",
      roundIndex: 3,
      prompt: "Trong bài đọc Wildfire Fighter, từ \"exhausted\" trong ngữ cảnh \"He was exhausted, but he was still there\" có nghĩa là:",
      options: [
        { id: "opt_A", label: "A", text: "very tired" },
        { id: "opt_B", label: "B", text: "very excited" },
        { id: "opt_C", label: "C", text: "very angry" },
        { id: "opt_D", label: "D", text: "very happy" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. very tired",
      correctExplanation: "\"Exhausted\" là tính từ cực độ (extreme adjective) mang nghĩa kiệt sức, vô cùng mệt mỏi.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. very excited",
        diagnosticTitle: "Nhầm lẫn âm điệu từ với excited",
        explanation: "Âm /ɪɡˈzɔː.stɪd/ dễ làm thí sinh mất tập trung liên tưởng tới excited."
      }
    },
    {
      id: "doer_w1d2_q05",
      roundIndex: 4,
      prompt: "Từ \"optimistic\" trong bài đọc có nghĩa tương đương với:",
      options: [
        { id: "opt_A", label: "A", text: "always expecting good things (lạc quan)" },
        { id: "opt_B", label: "B", text: "feeling afraid (lo sợ)" },
        { id: "opt_C", label: "C", text: "becoming stronger (trở nên mạnh mẽ hơn)" },
        { id: "opt_D", label: "D", text: "working alone (làm việc đơn độc)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. always expecting good things (lạc quan)",
      correctExplanation: "Optimistic có nghĩa là lạc quan, luôn tin tưởng vào những điều tích cực.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. becoming stronger",
        diagnosticTitle: "Đoán nghĩa dựa trên bối cảnh lính cứu hỏa",
        explanation: "Thí sinh suy diễn lính cứu hỏa thì phải kiên cường mạnh mẽ thay vì nghĩa thực của optimistic."
      }
    },
    {
      id: "doer_w1d2_q06",
      roundIndex: 5,
      prompt: "Trong câu \"The camp was really hard, but I passed first time. It was a big relief\", từ \"relief\" có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "a feeling of happiness and relaxation after worry (sự nhẹ nhõm)" },
        { id: "opt_B", label: "B", text: "something dangerous (sự nguy hiểm)" },
        { id: "opt_C", label: "C", text: "a difficult test (bài kiểm tra khó)" },
        { id: "opt_D", label: "D", text: "an important job (công việc quan trọng)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. a feeling of happiness and relaxation after worry (sự nhẹ nhõm)",
      correctExplanation: "\"Relief\" chỉ cảm giác nhẹ nhõm, trút bỏ được gánh nặng hay sự lo lắng.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. a difficult test",
        diagnosticTitle: "Nhầm lẫn cảm xúc với nguyên nhân",
        explanation: "Thí sinh nhầm lẫn cảm giác nhẹ nhõm với bản thân kỳ thi cam go trước đó."
      }
    },
    {
      id: "doer_w1d2_q07",
      roundIndex: 6,
      prompt: "Cụm từ \"vast forests\" mang ý nghĩa là những khu rừng như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "very large (rộng lớn, bao la)" },
        { id: "opt_B", label: "B", text: "very dark (tối tăm)" },
        { id: "opt_C", label: "C", text: "very wet (ẩm ướt)" },
        { id: "opt_D", label: "D", text: "very old (nguyên sinh)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. very large (rộng lớn, bao la)",
      correctExplanation: "Tính từ \"vast\" mô tả diện tích hoặc quy mô vô cùng rộng lớn.",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. very old",
        diagnosticTitle: "Nhầm lẫn quy mô diện tích với độ tuổi của rừng",
        explanation: "Vast hoàn toàn là kích thước/độ mở rộng, không chỉ độ cổ kính."
      }
    },
    {
      id: "doer_w1d2_q08",
      roundIndex: 7,
      prompt: "Cụm từ \"stay alert\" mà lính cứu hỏa bắt buộc phải duy trì nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "pay close attention (luôn cảnh giác, chú ý cao độ)" },
        { id: "opt_B", label: "B", text: "move quickly (di chuyển nhanh nhẹn)" },
        { id: "opt_C", label: "C", text: "work alone (làm việc độc lập)" },
        { id: "opt_D", label: "D", text: "stay silent (giữ im lặng tuyệt đối)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. pay close attention (luôn cảnh giác, chú ý cao độ)",
      correctExplanation: "\"Alert\" là trạng thái tỉnh táo, cảnh giác và tập trung cao độ trước các mối nguy hiểm.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. move quickly",
        diagnosticTitle: "Nhầm lẫn trạng thái tinh thần với hành động thể chất",
        explanation: "Alert là nhận thức tỉnh giác, không phải là hành động chạy hay di chuyển cơ thể."
      }
    },
    {
      id: "doer_w1d2_q09",
      roundIndex: 8,
      prompt: "Theo bài đọc, yêu cầu của bài thi \"pack test\" đối với lính cứu hỏa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đi bộ 5km mang ba lô 20kg trong tối đa 45 phút mà không được chạy" },
        { id: "opt_B", label: "B", text: "Chạy bộ 5km mang ba lô 20kg trong 45 phút" },
        { id: "opt_C", label: "C", text: "Đi bộ 10km mang ba lô 15kg trong 1 giờ" },
        { id: "opt_D", label: "D", text: "Leo núi mang thiết bị cứu hỏa trong 30 phút" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đi bộ 5km mang ba lô 20kg trong tối đa 45 phút mà không được chạy",
      correctExplanation: "Bài đọc nêu rõ: \"a five-kilometre walk while carrying a backpack that weighs twenty kilograms... complete it in 45 minutes without jogging or running\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chạy bộ 5km mang ba lô 20kg trong 45 phút",
        diagnosticTitle: "Bỏ sót chi tiết cấm chạy (without jogging/running)",
        explanation: "Đề thi nhấn mạnh đây là bài test đi bộ bền bỉ, nghiêm cấm chạy hoặc chạy bộ."
      }
    },
    {
      id: "doer_w1d2_q10",
      roundIndex: 9,
      prompt: "Cụm danh từ \"safety procedures\" trong hướng dẫn an toàn cứu hỏa có nghĩa là:",
      options: [
        { id: "opt_A", label: "A", text: "Quy trình, các bước thực hiện an toàn" },
        { id: "opt_B", label: "B", text: "Trang phục bảo hộ lao động" },
        { id: "opt_C", label: "C", text: "Dụng cụ dập lửa chuyên dụng" },
        { id: "opt_D", label: "D", text: "Phương tiện xe cứu hỏa khẩn cấp" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Quy trình, các bước thực hiện an toàn",
      correctExplanation: "\"Procedure\" là quy trình, chuỗi các bước tuần tự được thiết lập để làm việc đúng chuẩn.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Trang phục bảo hộ lao động",
        diagnosticTitle: "Nhầm lẫn quy trình với trang thiết bị bảo hộ",
        explanation: "Procedure là hướng dẫn/quy trình quy tắc, trang phục bảo hộ là gear/protective clothing."
      }
    }
  ],
  "WEEK 1 – DAY 3": [
    {
      id: "doer_w1d3_q01",
      roundIndex: 0,
      prompt: "Cặp nguyên âm /i:/ và /ɪ/ trong tiếng Anh được phân biệt rõ nhất qua cặp từ tối thiểu (minimal pair) nào?",
      options: [
        { id: "opt_A", label: "A", text: "sheep /ʃiːp/ vs. ship /ʃɪp/" },
        { id: "opt_B", label: "B", text: "bed /bed/ vs. bad /bæd/" },
        { id: "opt_C", label: "C", text: "duck /dʌk/ vs. dark /dɑːk/" },
        { id: "opt_D", label: "D", text: "pen /pen/ vs. pain /peɪn/" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. sheep /ʃiːp/ vs. ship /ʃɪp/",
      correctExplanation: "Sheep chứa nguyên âm dài /i:/ căng mép, trong khi ship chứa nguyên âm ngắn /ɪ/ thả lỏng.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. bed /bed/ vs. bad /bæd/",
        diagnosticTitle: "Nhầm cặp /e/ và /æ/",
        explanation: "Bed vs bad là cặp phân biệt giữa âm /e/ mở vừa và âm /æ/ hạ hàm bẹt."
      }
    },
    {
      id: "doer_w1d3_q02",
      roundIndex: 1,
      prompt: "Cặp từ nào sau đây minh họa cho sự đối lập giữa nguyên âm /e/ và /æ/?",
      options: [
        { id: "opt_A", label: "A", text: "bed /bed/ vs. bad /bæd/" },
        { id: "opt_B", label: "B", text: "leave /liːv/ vs. live /lɪv/" },
        { id: "opt_C", label: "C", text: "food /fuːd/ vs. foot /fʊt/" },
        { id: "opt_D", label: "D", text: "hat /hæt/ vs. hot /hɒt/" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. bed /bed/ vs. bad /bæd/",
      correctExplanation: "Bed có nguyên âm /e/ (mở vừa, lưỡi thả lỏng), bad có nguyên âm /æ/ (hạ hàm sâu, khóe miệng căng).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. leave /liːv/ vs. live /lɪv/",
        diagnosticTitle: "Chọn nhầm cặp /i:/ và /ɪ/",
        explanation: "Leave vs live là cặp đối lập của âm i dài và i ngắn."
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
        baitOptionText: "B. /ʌ/",
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
        baitOptionText: "B. I am in a lot of pressure",
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
        baitOptionText: "B. job chances after graduate",
        diagnosticTitle: "Dùng từ thân mật \"chance\" và sai từ loại sau \"after\"",
        explanation: "Chance mang nghĩa cơ hội may rủi hơn là cơ hội nghề nghiệp trang trọng, và sau giới từ after phải là danh từ graduation."
      }
    },
    {
      id: "doer_w1d3_q07",
      roundIndex: 6,
      prompt: "Để diễn đạt \"Công việc của tôi có lương bèo bọt / thấp\", cách nói tự nhiên và chính xác là:",
      options: [
        { id: "opt_A", label: "A", text: "My job is low-paid / poorly-paid." },
        { id: "opt_B", label: "B", text: "My job is cheap salary." },
        { id: "opt_C", label: "C", text: "My job earns small money." },
        { id: "opt_D", label: "D", text: "My salary is very short." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. My job is low-paid / poorly-paid.",
      correctExplanation: "Tính từ miêu tả công việc lương thấp là \"low-paid\" hoặc \"poorly-paid\" (hoặc \"a low salary\").",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. My job is cheap salary.",
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
        baitOptionText: "C. so",
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
        baitOptionText: "B. with",
        diagnosticTitle: "Dịch \"với việc luyện tập\" thành \"with V-ing\"",
        explanation: "Chỉ phương thức hành động để đạt kết quả luôn dùng giới từ \"by + V-ing\", không dùng \"with\"."
      }
    },
    {
      id: "doer_w1d3_q10",
      roundIndex: 9,
      prompt: "Cụm từ nào sau đây diễn đạt mức độ yêu thích cao hơn và học thuật hơn \"I like football\"?",
      options: [
        { id: "opt_A", label: "A", text: "I am a big fan of football / I am really keen on football." },
        { id: "opt_B", label: "B", text: "I very like football." },
        { id: "opt_C", label: "C", text: "I like so much football." },
        { id: "opt_D", label: "D", text: "Football is my favourite love." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I am a big fan of football / I am really keen on football.",
      correctExplanation: "\"To be a big fan of\" hoặc \"to be keen on / passionate about\" là cách diễn đạt tự nhiên, tránh lỗi dịch word-by-word.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. I very like football.",
        diagnosticTitle: "Lỗi ngữ pháp sơ đẳng \"very like\"",
        explanation: "Phó từ \"very\" không bao giờ bổ nghĩa trực tiếp cho động từ thường (không dùng very like, phải là like very much)."
      }
    }
  ]
};
