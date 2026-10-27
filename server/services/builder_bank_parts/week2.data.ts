/**
 * BUILDER ARENA QUESTION BANK - WEEK 2
 * Source: Giáo trình BUILDER 2027 - Đã soát lỗi.docx & Giáo án Builder 2027 (Teacher Guide)
 * Target: IELTS Band 5.0
 * 
 * Day 1: Writing (Defining vs Non-defining Adjective Clause / Reduced Relative Clauses / Adv Clause & Conjunctions / Comma Splice)
 * Day 2: Reading (Monitoring Comprehension / Deep Reading Facts / The Secret of Staying Young - Ants / Vocabulary)
 * Day 3: Speaking (Healthy Lifestyles / Back Vowels & Diphthongs / Bad habits & Staying healthy / Speaking Structure)
 */

export const BUILDER_WEEK_2_QUESTIONS: Record<string, any[]> = {
  "WEEK 2 – DAY 1": [
    {
      id: "builder_w2d1_q01",
      roundIndex: 0,
      prompt: "Hai câu sau đây khác nhau thế nào về mặt ý nghĩa thực tế:\n(1) 'My father who retired last year spends most of his time gardening.'\n(2) 'My father, who retired last year, spends most of his time gardening.'?",
      options: [
        { id: "opt_A", label: "A", text: "Câu (1) hàm ý người nói có nhiều người cha và đang phân biệt; Câu (2) người nói chỉ có 1 người cha và việc nghỉ hưu chỉ là thông tin bổ sung." },
        { id: "opt_B", label: "B", text: "Hai câu hoàn toàn đồng nghĩa trong mọi hoàn cảnh giao tiếp." },
        { id: "opt_C", label: "C", text: "Câu (2) bị sai ngữ pháp vì không được đặt đại từ 'who' sau dấu phẩy." },
        { id: "opt_D", label: "D", text: "Câu (1) trang trọng hơn câu (2)." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Câu (1) hàm ý người nói có nhiều người cha và đang phân biệt; Câu (2) người nói chỉ có 1 người cha và việc nghỉ hưu chỉ là thông tin bổ sung.",
      correctExplanation: "Bản chất ngữ pháp: 'father' là danh từ đã xác định duy nhất, nên mệnh đề quan hệ phải là Non-defining (có dấu phẩy) như ở câu (2). Nếu viết không dấu phẩy như câu (1), mệnh đề đóng vai trò 'xác định' (defining), ngầm hiểu người nói có nhiều người cha và câu này chỉ nói về 'người cha nghỉ hưu năm ngoái' (vô lý về mặt ngữ nghĩa).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Hai câu hoàn toàn đồng nghĩa trong mọi hoàn cảnh giao tiếp.",
        diagnosticTitle: "Coi nhẹ bản chất giới hạn danh từ của Defining Relative Clause",
        explanation: "Học sinh thường nghĩ có phẩy hay không có phẩy chỉ là thói quen ngắt nghỉ khi viết, mà không hiểu dấu phẩy quyết định danh từ có bị giới hạn (restrictive) hay không."
      }
    },
    {
      id: "builder_w2d1_q02",
      roundIndex: 1,
      prompt: "Trong câu: 'Paris, ________ is the capital of France, attracts millions of tourists every year.', từ điền chính xác vào chỗ trống là gì?",
      options: [
        { id: "opt_A", label: "A", text: "which" },
        { id: "opt_B", label: "B", text: "that" },
        { id: "opt_C", label: "C", text: "where" },
        { id: "opt_D", label: "D", text: "what" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. which",
      correctExplanation: "Paris là danh từ riêng chỉ vật/địa điểm, mệnh đề có dấu phẩy (Non-defining relative clause). Quy tắc bất di bất dịch: KHÔNG BAO GIỜ dùng 'that' sau dấu phẩy. Ở đây làm chủ ngữ cho 'is' nên dùng 'which' (không dùng 'where' vì 'where' là trạng từ nơi chốn không làm chủ ngữ cho to be).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. that",
        diagnosticTitle: "Lỗi dùng 'that' trong mệnh đề có dấu phẩy",
        explanation: "Học sinh thường tiện tay dùng 'that' thay thế cho mọi thứ, vi phạm quy tắc cấm dùng 'that' trong mệnh đề quan hệ không xác định."
      }
    },
    {
      id: "builder_w2d1_q03",
      roundIndex: 2,
      prompt: "Rút gọn mệnh đề quan hệ CHỦ ĐỘNG sau đây: 'Students who are studying at this university must wear uniforms.'?",
      options: [
        { id: "opt_A", label: "A", text: "Students studying at this university must wear uniforms." },
        { id: "opt_B", label: "B", text: "Students studied at this university must wear uniforms." },
        { id: "opt_C", label: "C", text: "Students to study at this university must wear uniforms." },
        { id: "opt_D", label: "D", text: "Students are studying at this university must wear uniforms." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Students studying at this university must wear uniforms.",
      correctExplanation: "Khi đại từ quan hệ làm Chủ ngữ và mệnh đề mang nghĩa CHỦ ĐỘNG (Active voice: who + V), ta rút gọn bằng cách bỏ đại từ quan hệ và chuyển động từ thành V-ing: 'who are studying' -> 'studying'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Students are studying at this university must wear uniforms.",
        diagnosticTitle: "Lỗi bỏ mỗi đại từ quan hệ sinh ra 2 Finite Verbs",
        explanation: "Học sinh chỉ bỏ 'who' rồi để nguyên 'are studying', khiến câu có 2 vị ngữ (are studying và must wear) dẫn đến câu sai ngữ pháp nghiêm trọng."
      }
    },
    {
      id: "builder_w2d1_q04",
      roundIndex: 3,
      prompt: "Rút gọn mệnh đề quan hệ BỊ ĐỘNG sau đây: 'Houses which were built over 100 years ago are still in use.'?",
      options: [
        { id: "opt_A", label: "A", text: "Houses built over 100 years ago are still in use." },
        { id: "opt_B", label: "B", text: "Houses building over 100 years ago are still in use." },
        { id: "opt_C", label: "C", text: "Houses were built over 100 years ago are still in use." },
        { id: "opt_D", label: "D", text: "Houses to be built over 100 years ago are still in use." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Houses built over 100 years ago are still in use.",
      correctExplanation: "Mệnh đề mang nghĩa BỊ ĐỘNG (Passive voice: which + be + V3): Bỏ đại từ quan hệ và to be, giữ lại Past Participle (V3/-ed): 'built over 100 years ago'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Houses building over 100 years ago are still in use.",
        diagnosticTitle: "Nhầm lẫn giữa rút gọn chủ động (V-ing) và bị động (V3)",
        explanation: "Học sinh học vẹt công thức rút gọn là thêm '-ing' cho mọi trường hợp mà không xét xem danh từ thực hiện hay chịu tác động của hành động."
      }
    },
    {
      id: "builder_w2d1_q05",
      roundIndex: 4,
      prompt: "Trong câu: 'The manager who is responsible for the project is currently on leave.', dạng rút gọn đặc biệt là gì?",
      options: [
        { id: "opt_A", label: "A", text: "The manager responsible for the project is currently on leave." },
        { id: "opt_B", label: "B", text: "The manager being responsible for the project is currently on leave." },
        { id: "opt_C", label: "C", text: "The manager responsibility for the project is currently on leave." },
        { id: "opt_D", label: "D", text: "The manager is responsible for the project is currently on leave." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The manager responsible for the project is currently on leave.",
      correctExplanation: "Trường hợp đặc biệt [Relative pronoun + be + Adjective]: Ta có thể lược bỏ cả [who + be] và giữ lại trực tiếp tính từ / cụm tính từ 'responsible for the project' đứng sau danh từ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The manager being responsible for the project is currently on leave.",
        diagnosticTitle: "Thêm 'being' rườm rà không cần thiết",
        explanation: "Học sinh hay chêm 'being' vào trước tính từ, làm câu văn học thuật trở nên nặng nề và không tự nhiên."
      }
    },
    {
      id: "builder_w2d1_q06",
      roundIndex: 5,
      prompt: "Câu nào dưới đây mắc lỗi cú pháp kinh điển của học sinh Việt Nam khi dùng liên từ nhượng bộ?",
      options: [
        { id: "opt_A", label: "A", text: "Although the government has invested a lot of money in education, but the quality of teaching remains poor." },
        { id: "opt_B", label: "B", text: "Although the government has invested heavily in education, the quality of teaching remains unsatisfactory." },
        { id: "opt_C", label: "C", text: "The government has invested heavily in education; however, teaching quality remains poor." },
        { id: "opt_D", label: "D", text: "Despite heavy government investment in education, the quality of teaching remains poor." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Although the government has invested a lot of money in education, but the quality of teaching remains poor.",
      correctExplanation: "Lỗi 'Mặc dù ... nhưng ...': Trong tiếng Anh, đã dùng 'Although' thì KHÔNG ĐƯỢC dùng 'but' ở mệnh đề chính. Dùng cả hai sẽ khiến câu bị thừa liên từ và sai cấu trúc mệnh đề.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. The government has invested heavily in education; however, teaching quality remains poor.",
        diagnosticTitle: "Chuyển dịch nguyên xi mẫu câu tiếng Việt (Although... but...)",
        explanation: "Người Việt có phản xạ 'Mặc dù... nhưng...' nên khi viết tiếng Anh thường đưa cả 'Although' và 'but' vào một câu."
      }
    },
    {
      id: "builder_w2d1_q07",
      roundIndex: 6,
      prompt: "Điền liên từ học thuật thể hiện sự đối lập giữa hai luồng quan điểm trong IELTS Writing Task 2: '________ some believe that online education is more effective, others argue that traditional classrooms provide better interaction.'?",
      options: [
        { id: "opt_A", label: "A", text: "While" },
        { id: "opt_B", label: "B", text: "Because" },
        { id: "opt_C", label: "C", text: "Therefore" },
        { id: "opt_D", label: "D", text: "Unless" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. While",
      correctExplanation: "'While' hoặc 'Whereas' đứng đầu câu để thiết lập mệnh đề trạng ngữ chỉ sự tương phản (contrast), hoàn hảo cho dạng bài Discussion (Thảo luận 2 quan điểm) trong Writing Task 2.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Therefore",
        diagnosticTitle: "Nhầm trạng từ liên kết (Adverbial connector) với liên từ phụ thuộc",
        explanation: "'Therefore' là trạng từ nối chỉ kết quả, không thể đứng đầu câu làm liên từ phụ thuộc nối 2 mệnh đề với dấu phẩy."
      }
    },
    {
      id: "builder_w2d1_q08",
      roundIndex: 7,
      prompt: "Chọn câu viết đúng ngữ pháp và không mắc lỗi phân mảnh câu (Sentence Fragment):",
      options: [
        { id: "opt_A", label: "A", text: "Learning English offers multifaceted benefits because mastering the language helps people expand their horizons." },
        { id: "opt_B", label: "B", text: "Learning English offers multifaceted benefits. Because mastering the language helps people make international friends." },
        { id: "opt_C", label: "C", text: "Mastering English is beneficial. Which helps people find good employment opportunities." },
        { id: "opt_D", label: "D", text: "Because the government invested in infrastructure, so citizens enjoy better transport." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Learning English offers multifaceted benefits because mastering the language helps people expand their horizons.",
      correctExplanation: "Câu (B) mắc lỗi Sentence Fragment (tách mệnh đề 'Because...' đứng một mình sau dấu chấm khi chưa có mệnh đề chính). Câu (C) tách ', which...' thành một câu độc lập sau dấu chấm là sai. Câu (D) thừa cặp 'Because... so...'. Chỉ có (A) là câu phức trọn vẹn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Learning English offers multifaceted benefits. Because mastering the language helps people make international friends.",
        diagnosticTitle: "Lỗi Sentence Fragment (chấm câu ngay trước liên từ phụ thuộc)",
        explanation: "Học sinh Band 4.5 hay có thói quen chấm câu rồi viết 'Because... / Which...' thành một câu riêng biệt."
      }
    },
    {
      id: "builder_w2d1_q09",
      roundIndex: 8,
      prompt: "Dịch sang tiếng Anh đạt chuẩn cấu trúc Task 2: 'Chất lượng cuộc sống sẽ không được cải thiện trừ khi có hành động thiết thực từ chính phủ.'?",
      options: [
        { id: "opt_A", label: "A", text: "The quality of life will not improve unless there is concrete action from the government." },
        { id: "opt_B", label: "B", text: "The quality of life will not improve unless there is not practical action from government." },
        { id: "opt_C", label: "C", text: "Quality of life won't be improved if not have action from the government." },
        { id: "opt_D", label: "D", text: "Life quality not improve unless government don't take action." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The quality of life will not improve unless there is concrete action from the government.",
      correctExplanation: "'Unless' = If not (trừ khi). Bản thân mệnh đề sau 'unless' luôn ở thể khẳng định: 'unless there is concrete action...' (tránh phủ định kép sai ngữ pháp 'unless there is not').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The quality of life will not improve unless there is not practical action from government.",
        diagnosticTitle: "Lỗi phủ định kép sau liên từ 'unless'",
        explanation: "Học sinh dịch 'trừ khi không có' nên cho cả 'not' vào sau 'unless', biến câu thành sai nghĩa."
      }
    },
    {
      id: "builder_w2d1_q10",
      roundIndex: 9,
      prompt: "Trong câu châm ngôn học thuật: 'What you do speaks so loudly that I cannot hear what you say.', câu này có tất cả bao nhiêu mệnh đề (Clauses)?",
      options: [
        { id: "opt_A", label: "A", text: "3 mệnh đề gồm 2 mệnh đề danh từ và 1 mệnh đề chính chỉ kết quả" },
        { id: "opt_B", label: "B", text: "1 mệnh đề duy nhất vì chỉ có một dấu chấm cuối câu" },
        { id: "opt_C", label: "C", text: "2 mệnh đề nối bằng liên từ 'that'" },
        { id: "opt_D", label: "D", text: "4 mệnh đề hoàn toàn độc lập" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 3 mệnh đề gồm 2 mệnh đề danh từ và 1 mệnh đề chính chỉ kết quả",
      correctExplanation: "Phân tích cú pháp chuyên sâu: (1) Mệnh đề danh từ 'What you do' làm Chủ ngữ; (2) Mệnh đề kết quả 'that I cannot hear...'; (3) Mệnh đề danh từ 'what you say' làm tân ngữ cho 'hear'. Đây là câu phức đa tầng mẫu mực.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. 1 mệnh đề duy nhất vì chỉ có một dấu chấm cuối câu",
        diagnosticTitle: "Nhầm lẫn giữa Câu (Sentence) và Mệnh đề (Clause)",
        explanation: "Học sinh thường đếm số dấu câu để đếm mệnh đề thay vì đếm số cặp Subject + Finite Verb."
      }
    }
  ],

  "WEEK 2 – DAY 2": [
    {
      id: "builder_w2d2_q01",
      roundIndex: 0,
      prompt: "Kỹ năng 'Deep Reading' (Đọc sâu tìm Fact) trong bài thi IELTS Reading đòi hỏi tư duy cốt lõi nào?",
      options: [
        { id: "opt_A", label: "A", text: "Bám sát thông tin thực tế được nêu trong bài, tuyệt đối không suy diễn chủ quan" },
        { id: "opt_B", label: "B", text: "Đoán nghĩa và tưởng tượng thêm cảm xúc của tác giả ngoài bài đọc." },
        { id: "opt_C", label: "C", text: "Chỉ đọc lướt câu đầu và câu cuối của mỗi đoạn văn rồi chọn bừa." },
        { id: "opt_D", label: "D", text: "Dịch từng từ sang tiếng mẹ đẻ rồi mới chọn đáp án." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Bám sát thông tin thực tế được nêu trong bài, tuyệt đối không suy diễn chủ quan",
      correctExplanation: "Trong bài thi IELTS Reading, câu hỏi yêu cầu tìm Fact đòi hỏi thí sinh đối chiếu chính xác từ khóa được đề cập thực tế trong bài đọc (Mentioned vs Not Mentioned), không được suy đoán ngoài dữ liệu.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đoán nghĩa và tưởng tượng thêm cảm xúc của tác giả ngoài bài đọc.",
        diagnosticTitle: "Lỗi suy diễn cá nhân (Over-interpretation)",
        explanation: "Học sinh thường mang hiểu biết bên ngoài đời thực vào trả lời thay vì chỉ dựa vào dữ liệu có trong bài đọc."
      }
    },
    {
      id: "builder_w2d2_q02",
      roundIndex: 1,
      prompt: "Từ vựng 'symptom' trong câu: 'symptoms of performance stress at the tournament' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Triệu chứng hoặc biểu hiện ra bên ngoài của một vấn đề áp lực thi đấu" },
        { id: "opt_B", label: "B", text: "Giải pháp điều trị tâm lý" },
        { id: "opt_C", label: "C", text: "Nguyên nhân gốc rễ gây ra giải đấu" },
        { id: "opt_D", label: "D", text: "Kết quả bảng điểm cuối cùng của vận động viên" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Triệu chứng hoặc biểu hiện ra bên ngoài của một vấn đề áp lực thi đấu",
      correctExplanation: "'Symptom' là triệu chứng, dấu hiệu bên ngoài. Trong bài đọc, biểu hiện căng thẳng của Emma Raducanu là 'difficulty regulating her breathing and heart rate' (khó điều hòa nhịp thở và nhịp tim).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Nguyên nhân gốc rễ gây ra giải đấu",
        diagnosticTitle: "Nhầm lẫn giữa Triệu chứng (Symptom) và Nguyên nhân (Cause)",
        explanation: "Học sinh thường nhầm lẫn giữa biểu hiện bề ngoài của sự việc với lý do gốc rễ tạo ra nó."
      }
    },
    {
      id: "builder_w2d2_q03",
      roundIndex: 2,
      prompt: "Trong bài đọc 'The secret of staying young', loài kiến Pheidole dentata được các nhà khoa học chú ý đặc biệt vì lý do gì?",
      options: [
        { id: "opt_A", label: "A", text: "Chúng dường như không có dấu hiệu lão hóa sinh học; kiến già vẫn hoàn thành nhiệm vụ tốt như kiến trẻ." },
        { id: "opt_B", label: "B", text: "Chúng là loài côn trùng bất tử không bao giờ chết." },
        { id: "opt_C", label: "C", text: "Chúng có kích thước cơ thể lớn hơn mọi loài kiến khác." },
        { id: "opt_D", label: "D", text: "Chúng chỉ sống đơn độc một mình trong rừng sâu." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chúng dường như không có dấu hiệu lão hóa sinh học; kiến già vẫn hoàn thành nhiệm vụ tốt như kiến trẻ.",
      correctExplanation: "Bài đọc ghi rõ: 'Pheidole dentata isn’t immortal. But scientists have found that it doesn’t seem to show any signs of aging. Old worker ants can do everything just as well as the youngsters...'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chúng là loài côn trùng bất tử không bao giờ chết.",
        diagnosticTitle: "Bẫy từ vựng 'immortal' (bất tử)",
        explanation: "Bài đọc nêu rõ 'Pheidole dentata ISN'T immortal'. Học sinh đọc lướt thấy chữ immortal liền chọn sai sang bất tử."
      }
    },
    {
      id: "builder_w2d2_q04",
      roundIndex: 3,
      prompt: "Tại sao loài kiến P. dentata lại hữu ích hơn chuột hay ruồi giấm trong việc nghiên cứu sự lão hóa ở con người?",
      options: [
        { id: "opt_A", label: "A", text: "Vì kiến sống trong bầy đàn có tính tổ chức xã hội phức tạp tương tự con người" },
        { id: "opt_B", label: "B", text: "Vì bộ gen của kiến giống con người tới 99%." },
        { id: "opt_C", label: "C", text: "Vì kiến sống lâu hơn chuột và người." },
        { id: "opt_D", label: "D", text: "Vì kiến không cần thức ăn để duy trì sự sống trong phòng thí nghiệm." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Vì kiến sống trong bầy đàn có tính tổ chức xã hội phức tạp tương tự con người",
      correctExplanation: "Trích dẫn bài đọc: 'Like the naked mole rat, ants are social creatures that usually live in highly organized colonies. It’s this social complexity that makes P. dentata useful for studying aging in people.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Vì bộ gen của kiến giống con người tới 99%.",
        diagnosticTitle: "Suy đoán ngoài văn bản",
        explanation: "Học sinh tự liên hệ kiến thức sinh học bên ngoài mà không tìm căn cứ từ khóa 'social complexity' trong bài."
      }
    },
    {
      id: "builder_w2d2_q05",
      roundIndex: 4,
      prompt: "Trong thí nghiệm theo dõi hành vi, kiến già 95 ngày tuổi đã làm điều gì vượt trội hơn cả kiến trẻ 20 ngày tuổi?",
      options: [
        { id: "opt_A", label: "A", text: "Theo dõi vệt mùi dẫn đường tới thức ăn scent trail trong thời gian dài hơn" },
        { id: "opt_B", label: "B", text: "Sinh sản được nhiều trứng hơn trong tổ." },
        { id: "opt_C", label: "C", text: "Bay nhanh hơn để tránh kẻ thù." },
        { id: "opt_D", label: "D", text: "Xây tổ to hơn gấp hai lần." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Theo dõi vệt mùi dẫn đường tới thức ăn scent trail trong thời gian dài hơn",
      correctExplanation: "Bài đọc ghi nhận: 'the 95-day-old ants could track the scent even longer than their younger counterparts.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Sinh sản được nhiều trứng hơn trong tổ.",
        diagnosticTitle: "Nhầm kiến thợ (worker ants) với kiến chúa (queen ants)",
        explanation: "Các cá thể được thí nghiệm là kiến thợ (worker ants), nhiệm vụ của chúng là chăm sóc ấu trùng và kiếm ăn, không phải đẻ trứng."
      }
    },
    {
      id: "builder_w2d2_q06",
      roundIndex: 5,
      prompt: "Nghiên cứu về não bộ của kiến P. dentata phát hiện thấy điều gì ở các hóa chất dẫn truyền thần kinh (serotonin và dopamine)?",
      options: [
        { id: "opt_A", label: "A", text: "Kiến già không hề bị suy giảm mức độ của cả serotonin lẫn dopamine." },
        { id: "opt_B", label: "B", text: "Serotonin bị biến mất hoàn toàn khi kiến bước sang ngày thứ 90." },
        { id: "opt_C", label: "C", text: "Kiến già tiết ra chất độc gây tổn thương các nơ-ron thần kinh." },
        { id: "opt_D", label: "D", text: "Dopamine của kiến tăng vọt khiến chúng bị mất trí nhớ." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Kiến già không hề bị suy giảm mức độ của cả serotonin lẫn dopamine.",
      correctExplanation: "Đoạn 5 nêu rõ: 'What was more, the old ants didn’t experience any drop in the levels of either serotonin or dopamine – brain chemicals whose decline often coincides with aging.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Serotonin bị biến mất hoàn toàn khi kiến bước sang ngày thứ 90.",
        diagnosticTitle: "Hiểu sai nghĩa cụm từ 'didn't experience any drop'",
        explanation: "'didn't experience any drop' nghĩa là không suy giảm. Học sinh nếu không đọc kỹ 'any drop' dễ tưởng lầm là bị sụt giảm hoàn toàn."
      }
    },
    {
      id: "builder_w2d2_q07",
      roundIndex: 6,
      prompt: "Từ học thuật 'senescence' trong câu: 'some studies showed age-related declines, which biologists call senescence' có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Quá trình lão hóa và suy giảm sinh học theo tuổi tác" },
        { id: "opt_B", label: "B", text: "Sự phân chia bầy đàn của côn trùng" },
        { id: "opt_C", label: "C", text: "Khả năng săn mồi sống trong tự nhiên" },
        { id: "opt_D", label: "D", text: "Kỹ năng giao tiếp qua mùi hương" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Quá trình lão hóa và suy giảm sinh học theo tuổi tác",
      correctExplanation: "Theo định nghĩa của tác giả ngay trong văn bản: 'age-related declines, which biologists call senescence'. Đây là từ vựng sinh học cao cấp chỉ sự già đi của tế bào/cơ thể.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Sự phân chia bầy đàn của côn trùng",
        diagnosticTitle: "Không dùng ngữ cảnh mệnh đề quan hệ để suy đoán nghĩa từ",
        explanation: "Học sinh thường hoang mang khi gặp từ chuyên ngành lạ, bỏ qua mệnh đề giải thích ngay liền trước 'age-related declines'."
      }
    },
    {
      id: "builder_w2d2_q08",
      roundIndex: 7,
      prompt: "Xét nhận định dạng TRUE - FALSE - NOT GIVEN: 'Pheidole dentata ants are the only known animals which remain active for almost their whole lives.'? (Đoạn 2 có nhắc đến Naked mole rat sống 30 năm vẫn khỏe mạnh)",
      options: [
        { id: "opt_A", label: "A", text: "FALSE vì văn bản còn nhắc đến chuột chũi không lông cũng có khả năng tương tự" },
        { id: "opt_B", label: "B", text: "TRUE vì kiến là loài duy nhất được kiểm chứng bằng thực nghiệm chính xác" },
        { id: "opt_C", label: "C", text: "NOT GIVEN vì không có thông tin về các loài động vật khác trên thế giới" },
        { id: "opt_D", label: "D", text: "CANNOT BE DETERMINED" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. FALSE vì văn bản còn nhắc đến chuột chũi không lông cũng có khả năng tương tự",
      correctExplanation: "Đoạn 2 viết: 'Such age-defying feats are rare... Naked mole rats can live for almost 30 years and stay fit for nearly their entire lives.' Do đó, tuyên bố kiến là loài DUY NHẤT ('the only known animals') mâu thuẫn trực tiếp với bài -> Đáp án là FALSE.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. NOT GIVEN vì không có thông tin về các loài động vật khác trên thế giới",
        diagnosticTitle: "Bẫy từ tuyệt đối 'the only' trong dạng bài TFNG",
        explanation: "Học sinh hay bị nhầm sang NOT GIVEN khi gặp từ so sánh tuyệt đối, bỏ qua bằng chứng Naked mole rat được nêu rõ ràng ở đoạn 2."
      }
    },
    {
      id: "builder_w2d2_q09",
      roundIndex: 8,
      prompt: "Xét nhận định: 'The ants in Giraldo’s experiments behaved as she had predicted that they would.' (Giraldo dự đoán kiến già sẽ làm bài kiểm tra kém hơn, nhưng thực tế chúng đều làm tốt)?",
      options: [
        { id: "opt_A", label: "A", text: "FALSE vì hành vi thực tế trái ngược hoàn toàn với dự đoán ban đầu của bà" },
        { id: "opt_B", label: "B", text: "TRUE vì kiến già cư xử đúng như kỳ vọng của bà" },
        { id: "opt_C", label: "C", text: "NOT GIVEN vì bà không đưa ra bất kỳ dự đoán nào trước khi bắt đầu" },
        { id: "opt_D", label: "D", text: "PARTIALLY TRUE" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. FALSE vì hành vi thực tế trái ngược hoàn toàn với dự đoán ban đầu của bà",
      correctExplanation: "Đoạn 4 nêu: 'Giraldo expected the older ants to perform poorly in all these tasks. But the elderly insects were all good caretakers and trail-followers...'. Kỳ vọng là làm kém, nhưng thực tế làm tốt -> Đáp án đối lập trực tiếp -> FALSE.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. TRUE vì kiến già cư xử đúng như kỳ vọng của bà",
        diagnosticTitle: "Bỏ qua liên từ đảo chiều 'But'",
        explanation: "Học sinh đọc thấy 'Giraldo expected...' rồi đọc lướt không chú ý chữ 'But' đảo ngược kết quả thực tế."
      }
    },
    {
      id: "builder_w2d2_q10",
      roundIndex: 9,
      prompt: "Nếu loài kiến này không hề suy giảm thể chất khi già đi, tại sao chúng vẫn chết trong tự nhiên?",
      options: [
        { id: "opt_A", label: "A", text: "Do các loài săn mồi, bệnh tật và môi trường sống khắc nghiệt ngoài tự nhiên" },
        { id: "opt_B", label: "B", text: "Do não bộ của chúng tự động phát nổ sau 140 ngày." },
        { id: "opt_C", label: "C", text: "Do thiếu hụt nguồn nước sạch trong rừng." },
        { id: "opt_D", label: "D", text: "Do kiến chúa tiêu diệt toàn bộ kiến thợ lớn tuổi." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Do các loài săn mồi, bệnh tật và môi trường sống khắc nghiệt ngoài tự nhiên",
      correctExplanation: "Đoạn 7 chỉ rõ: 'Out in the wild, the ants probably don’t live for a full 140 days thanks to predators, disease and just being in an environment that’s much harsher than the comforts of the lab.'",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Do kiến chúa tiêu diệt toàn bộ kiến thợ lớn tuổi.",
        diagnosticTitle: "Suy diễn tưởng tượng không có trong văn bản",
        explanation: "Học sinh suy luận theo các bộ phim viễn tưởng về thế giới côn trùng thay vì tìm kiếm 3 từ khóa 'predators, disease, harsher environment'."
      }
    }
  ],

  "WEEK 2 – DAY 3": [
    {
      id: "builder_w2d3_q01",
      roundIndex: 0,
      prompt: "Trong chủ đề Speaking 'Healthy Lifestyles', collocation chuẩn để nói về việc duy trì vóc dáng cân đối là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Stay in good shape" },
        { id: "opt_B", label: "B", text: "Keep my body rectangle" },
        { id: "opt_C", label: "C", text: "Remain good figure shape" },
        { id: "opt_D", label: "D", text: "Make standard weight" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Stay in good shape",
      correctExplanation: "Collocation tự nhiên và phổ biến: 'stay in good shape / keep in shape' (giữ vóc dáng khỏe đẹp cân đối).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Keep my body rectangle",
        diagnosticTitle: "Dịch hình thể theo hình học",
        explanation: "Học sinh hay tự ghép từ tiếng Việt thô kệch thay vì dùng cụm thành ngữ cố định của người bản xứ."
      }
    },
    {
      id: "builder_w2d3_q02",
      roundIndex: 1,
      prompt: "Để diễn đạt ý 'uống đủ 2 lít nước mỗi ngày để giữ cho cơ thể luôn đủ nước', cụm từ chuẩn học thuật là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Keep myself hydrated" },
        { id: "opt_B", label: "B", text: "Keep full water in my body" },
        { id: "opt_C", label: "C", text: "Save water inside skin" },
        { id: "opt_D", label: "D", text: "Prevent dryness" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Keep myself hydrated",
      correctExplanation: "'Hydrated' (/ˈhaɪdreɪtɪd/) là tính từ học thuật chỉ trạng thái cơ thể được cung cấp đủ nước. Cụm 'keep oneself hydrated' ghi điểm từ vựng rất cao ở Band 5.5 - 6.0.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Keep full water in my body",
        diagnosticTitle: "Dịch từ vựng theo kiểu 'full water'",
        explanation: "Học sinh thường chỉ biết từ 'water' và dịch 'giữ đầy nước trong người' thay vì dùng tính từ chuyên biệt 'hydrated'."
      }
    },
    {
      id: "builder_w2d3_q03",
      roundIndex: 2,
      prompt: "Khi được hỏi về thói quen không lành mạnh trong quá khứ: 'Do you have any unhealthy habit?', cách dùng thì ngữ pháp nào dưới đây là CHUẨN XÁC?",
      options: [
        { id: "opt_A", label: "A", text: "I used to eat a lot of fast food when I didn't have time to cook." },
        { id: "opt_B", label: "B", text: "I am used to eat a lot of fast food when I was busy." },
        { id: "opt_C", label: "C", text: "I use to eating a lot of fast food in the past." },
        { id: "opt_D", label: "D", text: "I had habit to eat fast food everyday." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I used to eat a lot of fast food when I didn't have time to cook.",
      correctExplanation: "Cấu trúc 'used to + V-infinitive' diễn tả một thói quen trong quá khứ nay không còn nữa. 'Be used to + V-ing' là quen với điều gì ở hiện tại.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. I am used to eat a lot of fast food when I was busy.",
        diagnosticTitle: "Nhầm lẫn giữa 'used to V' và 'be used to V-ing'",
        explanation: "Học sinh rất hay nhầm lẫn 2 cấu trúc này, cho thêm 'am' trước 'used to' mà động từ phía sau lại để nguyên thể."
      }
    },
    {
      id: "builder_w2d3_q04",
      roundIndex: 3,
      prompt: "Từ vựng diễn tả tình trạng sức khỏe bị suy giảm, tồi tệ đi dần theo thời gian là gì?",
      options: [
        { id: "opt_A", label: "A", text: "deteriorate" },
        { id: "opt_B", label: "B", text: "improve" },
        { id: "opt_C", label: "C", text: "strengthen" },
        { id: "opt_D", label: "D", text: "maintain" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. deteriorate",
      correctExplanation: "'Deteriorate' (/dɪˈtɪəriəreɪt/) = become progressively worse (trở nên tồi tệ hơn). Ví dụ: 'Gradually, my health deteriorated because of a poor diet.'",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. improve",
        diagnosticTitle: "Chọn nhầm từ trái nghĩa",
        explanation: "'Improve' là cải thiện tốt lên, trái ngược hoàn toàn với tình trạng sức khỏe giảm sút do ăn đồ có hại."
      }
    },
    {
      id: "builder_w2d3_q05",
      roundIndex: 4,
      prompt: "Khi nói về việc từ bỏ một thói quen xấu (hút thuốc, thức khuya, ăn vặt), cụm động từ (Phrasal Verb) tự nhiên là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Kick the habit" },
        { id: "opt_B", label: "B", text: "Delete the habit" },
        { id: "opt_C", label: "C", text: "Throw away the habit" },
        { id: "opt_D", label: "D", text: "Cut off habit" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Kick the habit",
      correctExplanation: "'Break / Kick a habit' là cụm cố định của người bản xứ chỉ hành động từ bỏ một thói quen xấu. 'I want to kick this unhealthy habit by having a balanced diet.'",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Delete the habit",
        diagnosticTitle: "Dùng từ ngữ công nghệ thông tin cho đời sống",
        explanation: "Học sinh thời đại số hay dùng 'delete / cancel habit' thay vì dùng thành ngữ chuẩn 'kick / break the habit'."
      }
    },
    {
      id: "builder_w2d3_q06",
      roundIndex: 5,
      prompt: "Trong luyện âm Speaking, cặp từ 'food' (/uː/) và 'foot' (/ʊ/) khác nhau ở đặc tính âm học nào?",
      options: [
        { id: "opt_A", label: "A", text: "'Food' có nguyên âm sau kéo dài hơi, còn 'Foot' có nguyên âm ngắn thả lỏng dứt khoát" },
        { id: "opt_B", label: "B", text: "Cả 2 từ đều đọc là âm 'u' ngắn như tiếng Việt." },
        { id: "opt_C", label: "C", text: "'Food' đọc là âm 'o' kéo dài." },
        { id: "opt_D", label: "D", text: "'Foot' có âm đuôi câm hoàn toàn." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 'Food' có nguyên âm sau kéo dài hơi, còn 'Foot' có nguyên âm ngắn thả lỏng dứt khoát",
      correctExplanation: "Phân biệt nguyên âm ngắn và dài (/uː/ vs /ʊ/) là bài học bản lề ở Tuần 2 giúp học sinh phát âm chuẩn xác, không bị 'flat intonation' (nói giọng bằng bẹt).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Cả 2 từ đều đọc là âm 'u' ngắn như tiếng Việt.",
        diagnosticTitle: "Đồng hóa âm tiếng Anh với âm tiếng Việt",
        explanation: "Học sinh Việt Nam thường phát âm cả food và foot giống hệt chữ 'phút' trong tiếng Việt mà không kéo dài âm /uː/."
      }
    },
    {
      id: "builder_w2d3_q07",
      roundIndex: 6,
      prompt: "Để phát triển câu trả lời Speaking Part 1 đạt chuẩn Fluency & Coherence: 'What do you do to stay healthy?', liên từ nối ý nào dùng tốt nhất để bổ sung thêm ý thứ hai?",
      options: [
        { id: "opt_A", label: "A", text: "Besides that" },
        { id: "opt_B", label: "B", text: "However" },
        { id: "opt_C", label: "C", text: "On the other hand" },
        { id: "opt_D", label: "D", text: "Although" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Besides that",
      correctExplanation: "Khi bổ sung thêm một thói quen tốt thứ hai (ví dụ: vừa chơi cầu lông, vừa uống đủ 2 lít nước), liên từ chỉ sự bổ sung 'On top of that / Besides that' giúp câu nói mượt mà và tự nhiên.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. On the other hand",
        diagnosticTitle: "Dùng nhầm liên từ tương phản khi đang muốn bổ sung ý",
        explanation: "'On the other hand' dùng để nêu mặt trái/ý đối lập, không dùng để bổ sung hai thói quen tốt cùng chiều."
      }
    },
    {
      id: "builder_w2d3_q08",
      roundIndex: 7,
      prompt: "Chọn câu trả lời mở rộng ý tốt nhất cho hoạt động bơi lội: 'I often go swimming because it helps me ________'?",
      options: [
        { id: "opt_A", label: "A", text: "stay flexible, build stamina, and relieve daily stress." },
        { id: "opt_B", label: "B", text: "touch the water and become wet." },
        { id: "opt_C", label: "C", text: "spending all money for swimsuit." },
        { id: "opt_D", label: "D", text: "it make me swimmer very famous." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. stay flexible, build stamina, and relieve daily stress.",
      correctExplanation: "Cụm từ vựng lợi ích sức khỏe phong phú: 'stay flexible' (dẻo dai), 'build stamina' (tăng sức bền), 'relieve stress' (giải tỏa căng thẳng).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. touch the water and become wet.",
        diagnosticTitle: "Nêu các chi tiết hiển nhiên, thiếu chiều sâu học thuật",
        explanation: "Học sinh yếu từ vựng thường nêu các đặc điểm hiển nhiên không mang giá trị lập luận trong IELTS."
      }
    },
    {
      id: "builder_w2d3_q09",
      roundIndex: 8,
      prompt: "Từ vựng 'diet' trong cụm 'a balanced diet' có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Chế độ ăn uống hằng ngày đầy đủ dưỡng chất không chỉ riêng ăn kiêng" },
        { id: "opt_B", label: "B", text: "Nhịn ăn hoàn toàn để giảm béo cấp tốc" },
        { id: "opt_C", label: "C", text: "Chỉ ăn thịt và không bao giờ ăn rau củ" },
        { id: "opt_D", label: "D", text: "Uống thuốc giảm cân theo đơn bác sĩ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chế độ ăn uống hằng ngày đầy đủ dưỡng chất không chỉ riêng ăn kiêng",
      correctExplanation: "Trong tiếng Anh, 'diet' là chế độ dinh dưỡng/khẩu phần ăn uống thông thường của một người. 'A balanced diet' là chế độ ăn cân bằng dinh dưỡng. (Chỉ khi nói 'go on a diet' mới mang nghĩa ăn kiêng giảm cân).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nhịn ăn hoàn toàn để giảm béo cấp tốc",
        diagnosticTitle: "Mặc định 'diet' luôn là ăn kiêng giảm béo",
        explanation: "Học sinh Việt Nam thấy chữ 'diet' là nghĩ ngay đến 'ăn kiêng', dẫn đến hiểu sai câu hỏi của giám khảo về 'daily diet'."
      }
    },
    {
      id: "builder_w2d3_q10",
      roundIndex: 9,
      prompt: "Khi nói về lợi ích của giấc ngủ ngon đối với hiệu suất làm việc ngày hôm sau: 'Good sleep improves my ________ the next day.'?",
      options: [
        { id: "opt_A", label: "A", text: "focus and productivity" },
        { id: "opt_B", label: "B", text: "productive and focused" },
        { id: "opt_C", label: "C", text: "sleepy and tired" },
        { id: "opt_D", label: "D", text: "eye sight speed" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. focus and productivity",
      correctExplanation: "Sau tính từ sở hữu 'my' và động từ 'improves' cần cụm danh từ song hành: 'focus' (sự tập trung) and 'productivity' (năng suất làm việc).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. productive and focused",
        diagnosticTitle: "Lỗi dùng tính từ thay vì danh từ sau tính từ sở hữu",
        explanation: "Học sinh nhớ từ vựng nhưng không kiểm soát từ loại (Part of Speech), dùng tính từ 'productive' thay vì danh từ 'productivity'."
      }
    }
  ]
};
