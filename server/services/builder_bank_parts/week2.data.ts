/**
 * BUILDER ARENA QUESTION BANK - WEEK 2
 * Source: Giáo trình BUILDER 2027 - Đã soát lỗi.docx & Giáo án Builder 2027
 * Target: Band 5.0 IELTS
 * Day 1: Writing (Adjective Clause / Reduced Relative Clause / Conjunctions)
 * Day 2: Reading (Monitoring Comprehension / The Secret of Staying Young - Ants)
 * Day 3: Speaking (Healthy Lifestyles / Back Vowels & Diphthongs / Collocations)
 */

export const BUILDER_WEEK_2_QUESTIONS: Record<string, any[]> = {
  "WEEK 2 – DAY 1": [
    {
      id: "builder_w2d1_q01",
      roundIndex: 0,
      prompt: "Người nói có nhiều anh trai. Câu nào dùng mệnh đề quan hệ xác định (Defining Clause) KHÔNG có dấu phẩy để phân biệt rõ người anh được nhắc đến?",
      options: [
        { id: "opt_A", label: "A", text: "My brother who works as an architect in Da Nang is visiting us tomorrow." },
        { id: "opt_B", label: "B", text: "My brother, who works as an architect in Da Nang, is visiting us tomorrow." },
        { id: "opt_C", label: "C", text: "My brother, that works as an architect in Da Nang, is visiting us tomorrow." },
        { id: "opt_D", label: "D", text: "My brother whom works as an architect in Da Nang is visiting us tomorrow." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. My brother who works as an architect in Da Nang is visiting us tomorrow.",
      correctExplanation: "Khi cần thông tin bắt buộc để xác định đối tượng (trong số nhiều người anh), ta dùng Defining Relative Clause không có dấu phẩy. Nếu đặt dấu phẩy (câu B), câu sẽ ngụ ý người nói chỉ có duy nhất một người anh.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. My brother, who works as an architect in Da Nang, is visiting us tomorrow.",
        diagnosticTitle: "Lạm dụng dấu phẩy biến Defining thành Non-defining clause",
        explanation: "Học sinh thường nghĩ cứ thấy mệnh đề quan hệ là tùy tiện đặt dấu phẩy mà không hiểu dấu phẩy làm thay đổi bản chất xác định của danh từ đứng trước."
      }
    },
    {
      id: "builder_w2d1_q02",
      roundIndex: 1,
      prompt: "Chọn đại từ quan hệ và dấu câu thích hợp với Danh từ riêng: \"Paris ______ attracts millions of international tourists every year.\"",
      options: [
        { id: "opt_A", label: "A", text: ", which is the capital of France," },
        { id: "opt_B", label: "B", text: "that is the capital of France" },
        { id: "opt_C", label: "C", text: ", that is the capital of France," },
        { id: "opt_D", label: "D", text: "which is the capital of France" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. , which is the capital of France,",
      correctExplanation: "'Paris' là danh từ riêng đã được xác định cụ thể, nên mệnh đề bổ nghĩa bắt buộc phải là Non-defining clause (đặt giữa 2 dấu phẩy và dùng đại từ 'which', tuyệt đối không dùng 'that').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. , that is the capital of France,",
        diagnosticTitle: "Dùng đại từ 'that' trong mệnh đề có dấu phẩy",
        explanation: "Quy tắc ngữ pháp bắt buộc: Đại từ quan hệ 'that' không bao giờ được phép đứng sau dấu phẩy."
      }
    },
    {
      id: "builder_w2d1_q03",
      roundIndex: 2,
      prompt: "Rút gọn mệnh đề quan hệ mang nghĩa chủ động: \"Students who participate in community service develop stronger empathy.\"",
      options: [
        { id: "opt_A", label: "A", text: "Students participating in community service develop stronger empathy." },
        { id: "opt_B", label: "B", text: "Students participated in community service develop stronger empathy." },
        { id: "opt_C", label: "C", text: "Students are participating in community service develop stronger empathy." },
        { id: "opt_D", label: "D", text: "Students to participate in community service develop stronger empathy." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Students participating in community service develop stronger empathy.",
      correctExplanation: "Mệnh đề quan hệ chủ động (who participate) được rút gọn thành V-ing: 'participating'. Động từ chính của câu là 'develop'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Students participated in community service develop stronger empathy.",
        diagnosticTitle: "Rút gọn nhầm sang dạng V3 mang nghĩa bị động",
        explanation: "Học sinh nhầm lẫn giữa dạng rút gọn chủ động (V-ing) và bị động (V3/-ed)."
      }
    },
    {
      id: "builder_w2d1_q04",
      roundIndex: 3,
      prompt: "Rút gọn mệnh đề quan hệ mang nghĩa bị động: \"The residential buildings which were constructed fifty years ago require renovation.\"",
      options: [
        { id: "opt_A", label: "A", text: "The residential buildings constructed fifty years ago require renovation." },
        { id: "opt_B", label: "B", text: "The residential buildings constructing fifty years ago require renovation." },
        { id: "opt_C", label: "C", text: "The residential buildings were constructed fifty years ago require renovation." },
        { id: "opt_D", label: "D", text: "The residential buildings to construct fifty years ago require renovation." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The residential buildings constructed fifty years ago require renovation.",
      correctExplanation: "Mệnh đề bị động 'which were constructed' được rút gọn bằng cách bỏ đại từ quan hệ và to be, chỉ giữ lại quá khứ phân từ 'constructed'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. The residential buildings were constructed fifty years ago require renovation.",
        diagnosticTitle: "Quên bỏ to be gây ra lỗi 2 Finite Verb trong câu",
        explanation: "Nếu giữ lại 'were constructed' thì câu sẽ có tới 2 động từ chính là 'were constructed' và 'require', gây lỗi cú pháp nghiêm trọng."
      }
    },
    {
      id: "builder_w2d1_q05",
      roundIndex: 4,
      prompt: "Trong trường hợp nào dưới đây ta có thể LƯỢC BỎ đại từ quan hệ mà không cần biến đổi động từ thành V-ing hay V3?",
      options: [
        { id: "opt_A", label: "A", text: "Khi đại từ quan hệ đóng vai trò Tân ngữ trong mệnh đề quan hệ" },
        { id: "opt_B", label: "B", text: "Khi đại từ quan hệ đóng vai trò Chủ ngữ chỉ người" },
        { id: "opt_C", label: "C", text: "Khi mệnh đề quan hệ là mệnh đề không xác định có dấu phẩy" },
        { id: "opt_D", label: "D", text: "Khi động từ chính của câu được chia ở các thì Hoàn thành" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khi đại từ quan hệ đóng vai trò Tân ngữ trong mệnh đề quan hệ",
      correctExplanation: "Khi đại từ quan hệ (who/whom/which/that) làm tân ngữ (theo sau là S+V), ta có thể lược bỏ trực tiếp. Ví dụ: 'The novel that I bought' -> 'The novel I bought'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Khi đại từ quan hệ đóng vai trò Chủ ngữ chỉ người",
        diagnosticTitle: "Tự ý bỏ đại từ quan hệ làm Chủ ngữ",
        explanation: "Khi đại từ quan hệ làm Chủ ngữ, bắt buộc phải rút gọn động từ thành V-ing hoặc V3, không thể tùy tiện bỏ đại từ mà giữ nguyên động từ."
      }
    },
    {
      id: "builder_w2d1_q06",
      roundIndex: 5,
      prompt: "Rút gọn câu có tính từ sau to be: \"The engineer who is responsible for the project scheduled a meeting.\"",
      options: [
        { id: "opt_A", label: "A", text: "The engineer responsible for the project scheduled a meeting." },
        { id: "opt_B", label: "B", text: "The engineer being responsible for the project scheduled a meeting." },
        { id: "opt_C", label: "C", text: "The engineer responsibling for the project scheduled a meeting." },
        { id: "opt_D", label: "D", text: "The engineer was responsible for the project scheduled a meeting." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The engineer responsible for the project scheduled a meeting.",
      correctExplanation: "Cấu trúc 'who/which + be + adjective' được rút gọn bằng cách bỏ cả đại từ quan hệ và to be, giữ lại cụm tính từ 'responsible for the project'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The engineer being responsible for the project scheduled a meeting.",
        diagnosticTitle: "Lạm dụng từ 'being' khi rút gọn cụm tính từ",
        explanation: "Trong văn phong học thuật, không cần thiết chèn 'being' trước tính từ trừ khi muốn nhấn mạnh hành vi tạm thời."
      }
    },
    {
      id: "builder_w2d1_q07",
      roundIndex: 6,
      prompt: "Phát hiện lỗi sai trong câu sau: \"Although the state has subsidized tuition fees, but universities still face budget deficits.\"",
      options: [
        { id: "opt_A", label: "A", text: "Thừa liên từ 'but' khi mệnh đề trước đã có 'Although'" },
        { id: "opt_B", label: "B", text: "Động từ 'subsidized' phải chia ở thể bị động" },
        { id: "opt_C", label: "C", text: "Danh từ 'tuition fees' không thể đi với động từ subsidize" },
        { id: "opt_D", label: "D", text: "Phải đổi 'Although' thành 'In spite of' và giữ nguyên 'but'" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thừa liên từ 'but' khi mệnh đề trước đã có 'Although'",
      correctExplanation: "Trong tiếng Anh, 'Although' và 'But' không bao giờ xuất hiện đồng thời trong cùng một câu. Đã dùng 'Although' thì phải bỏ 'but'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Phải đổi 'Although' thành 'In spite of' và giữ nguyên 'but'",
        diagnosticTitle: "Thói quen dịch 'Mặc dù... nhưng...' từ tiếng Việt",
        explanation: "Học sinh bị ảnh hưởng bởi cặp liên từ sóng đôi 'Mặc dù ... nhưng ...' trong tiếng Việt nên cố tình giữ lại cả hai liên từ."
      }
    },
    {
      id: "builder_w2d1_q08",
      roundIndex: 7,
      prompt: "Nhận diện lỗi sai trong câu thứ hai: \"Learning foreign languages is beneficial. Because it broadens personal perspectives.\"",
      options: [
        { id: "opt_A", label: "A", text: "Câu thứ hai là câu cụt Fragment do thiếu mệnh đề độc lập chính" },
        { id: "opt_B", label: "B", text: "Động từ 'broadens' chia sai số ít với chủ ngữ 'it'" },
        { id: "opt_C", label: "C", text: "Tính từ 'beneficial' bắt buộc phải có giới từ 'to'" },
        { id: "opt_D", label: "D", text: "'Learning foreign languages' không thể làm chủ ngữ số ít" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Câu thứ hai là câu cụt Fragment do thiếu mệnh đề độc lập chính",
      correctExplanation: "Mệnh đề bắt đầu bằng 'Because' là Adverbial Subordinate Clause, không thể đứng riêng làm câu hoàn chỉnh. Phải nối liền với mệnh đề trước bằng dấu phẩy.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. 'Learning foreign languages' không thể làm chủ ngữ số ít",
        diagnosticTitle: "Nghi ngờ sự hòa hợp chủ vị của Gerund",
        explanation: "Gerund 'Learning' luôn là danh động từ số ít (đi với 'is'), học sinh nhìn thấy 'languages' số nhiều nên tưởng câu đầu sai."
      }
    },
    {
      id: "builder_w2d1_q09",
      roundIndex: 8,
      prompt: "Điền liên từ chỉ điều kiện mang nghĩa 'nếu không': \"Public health will not improve significantly ______ strict food standards are enforced.\"",
      options: [
        { id: "opt_A", label: "A", text: "unless" },
        { id: "opt_B", label: "B", text: "if" },
        { id: "opt_C", label: "C", text: "because" },
        { id: "opt_D", label: "D", text: "provided that" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. unless",
      correctExplanation: "'Unless' = 'If not' (trừ khi / nếu không). 'Sức khỏe cộng đồng sẽ không cải thiện trừ khi các tiêu chuẩn được thực thi'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. if",
        diagnosticTitle: "Chọn 'if' làm đảo lộn hoàn toàn logic câu",
        explanation: "Nếu dùng 'if', câu sẽ thành 'Sức khỏe không cải thiện nếu tiêu chuẩn được thực thi', hoàn toàn trái ngược với thực tế."
      }
    },
    {
      id: "builder_w2d1_q10",
      roundIndex: 9,
      prompt: "Điền liên từ học thuật nối hai mệnh đề đối lập trong bài luận IELTS: \"______ some individuals favor city life, others choose suburban tranquility.\"",
      options: [
        { id: "opt_A", label: "A", text: "While" },
        { id: "opt_B", label: "B", text: "Despite" },
        { id: "opt_C", label: "C", text: "Because" },
        { id: "opt_D", label: "D", text: "In spite of" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. While",
      correctExplanation: "'While' hoặc 'Whereas' là liên từ phụ thuộc dùng để nối 2 mệnh đề tương phản (While + Clause 1, Clause 2). 'Despite / In spite of' chỉ đi với Noun Phrase.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Despite",
        diagnosticTitle: "Dùng 'Despite' trước một mệnh đề trọn vẹn (Clause)",
        explanation: "Học sinh hay nhầm lẫn chức năng của 'Despite' (giới từ + Noun Phrase) với 'While/Although' (liên từ + Clause)."
      }
    }
  ],

  "WEEK 2 – DAY 2": [
    {
      id: "builder_w2d2_q01",
      roundIndex: 0,
      prompt: "Trong nghiên cứu sinh học về sự lão hóa (Aging), thuật ngữ khoa học 'senescence' dùng để chỉ hiện tượng gì?",
      options: [
        { id: "opt_A", label: "A", text: "Age-related physical and functional decline" },
        { id: "opt_B", label: "B", text: "Rapid reproduction in early adulthood" },
        { id: "opt_C", label: "C", text: "Resistance to fatal contagious diseases" },
        { id: "opt_D", label: "D", text: "Aggressive hunting behavior against predators" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Age-related physical and functional decline",
      correctExplanation: "Theo văn bản bài đọc: 'age-related declines, which biologists call senescence' - sự suy giảm thể lực và chức năng sinh học do tuổi tác.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Rapid reproduction in early adulthood",
        diagnosticTitle: "Nhầm lẫn giữa quá trình lão hóa và sinh sản",
        explanation: "Học sinh không nắm từ vựng học thuật nên đoán mò 'senescence' liên quan đến năng lượng tuổi trẻ."
      }
    },
    {
      id: "builder_w2d2_q02",
      roundIndex: 1,
      prompt: "Theo bài đọc, điểm khác biệt đáng kinh ngạc của loài kiến Pheidole dentata là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Older worker ants perform complex tasks just as well as young ants" },
        { id: "opt_B", label: "B", text: "They are completely immortal and never suffer from natural death" },
        { id: "opt_C", label: "C", text: "They live completely isolated lives without any social organization" },
        { id: "opt_D", label: "D", text: "Their brain size expands three times larger when they grow old" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Older worker ants perform complex tasks just as well as young ants",
      correctExplanation: "Văn bản khẳng định: 'Old worker ants can do everything just as well as the youngsters, and their brains appear just as sharp'. Chúng không hề bất tử (isn't immortal).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. They are completely immortal and never suffer from natural death",
        diagnosticTitle: "Quy chụp kiến không lão hóa là bất tử",
        explanation: "Tác giả nêu rõ ngay đầu bài: 'Pheidole dentata isn't immortal'. Chúng vẫn chết do kẻ thù hoặc môi trường khắc nghiệt."
      }
    },
    {
      id: "builder_w2d2_q03",
      roundIndex: 2,
      prompt: "Nhà nghiên cứu Ysabel Giraldo đã chia kiến thợ thành bao nhiêu nhóm tuổi chính xác để làm thí nghiệm?",
      options: [
        { id: "opt_A", label: "A", text: "Four age ranges" },
        { id: "opt_B", label: "B", text: "Two age ranges" },
        { id: "opt_C", label: "C", text: "Six age ranges" },
        { id: "opt_D", label: "D", text: "Eight age ranges" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Four age ranges",
      correctExplanation: "Văn bản nêu rõ: 'Giraldo focused on ants at four age ranges: 20 to 22 days, 45 to 47 days, 95 to 97 days and 120 to 122 days'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Two age ranges",
        diagnosticTitle: "Chỉ chú ý đến 2 nhóm tuổi được so sánh cụ thể",
        explanation: "Học sinh đọc lướt thấy tác giả so sánh nhóm 20 ngày và 95 ngày nên tưởng thí nghiệm chỉ có 2 nhóm tuổi."
      }
    },
    {
      id: "builder_w2d2_q04",
      roundIndex: 3,
      prompt: "Cấu trúc 'mushroom bodies' trong não bộ của côn trùng có chức năng quan trọng gì?",
      options: [
        { id: "opt_A", label: "A", text: "Processing information, learning, and memory" },
        { id: "opt_B", label: "B", text: "Controlling physical growth and exoskeleton hardness" },
        { id: "opt_C", label: "C", text: "Detecting changes in environmental air pressure" },
        { id: "opt_D", label: "D", text: "Producing toxic secretions to defend against predators" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Processing information, learning, and memory",
      correctExplanation: "Bài đọc nêu rõ: 'structures in their brains called mushroom bodies, which are important for processing information, learning and memory'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Controlling physical growth and exoskeleton hardness",
        diagnosticTitle: "Đoán chức năng sinh học thay vì bám sát bài đọc",
        explanation: "Học sinh suy diễn 'thể nấm' điều khiển sự phát triển cơ thể thay vì đọc đúng chi tiết xử lý thông tin và trí nhớ."
      }
    },
    {
      id: "builder_w2d2_q05",
      roundIndex: 4,
      prompt: "Hai chất dẫn truyền thần kinh trong não kiến KHÔNG hề bị suy giảm khi già đi là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Serotonin and dopamine" },
        { id: "opt_B", label: "B", text: "Melatonin and insulin" },
        { id: "opt_C", label: "C", text: "Adrenaline and hemoglobin" },
        { id: "opt_D", label: "D", text: "Endorphin and glucose" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Serotonin and dopamine",
      correctExplanation: "Văn bản: 'the old ants didn't experience any drop in the levels of either serotonin or dopamine - brain chemicals whose decline often coincides with aging'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Adrenaline and hemoglobin",
        diagnosticTitle: "Nhầm sang các chất sinh học quen thuộc ở người",
        explanation: "Học sinh nhớ mang máng các chất sinh học nên chọn nhầm chất không được đề cập trong bài đọc."
      }
    },
    {
      id: "builder_w2d2_q06",
      roundIndex: 5,
      prompt: "Từ 'deteriorate' trong câu 'the vast majority of animals deteriorate with age' có nghĩa là:",
      options: [
        { id: "opt_A", label: "A", text: "decline in physical condition and health" },
        { id: "opt_B", label: "B", text: "become more resistant to diseases" },
        { id: "opt_C", label: "C", text: "grow more aggressive toward rivals" },
        { id: "opt_D", label: "D", text: "migrate to warmer geographical regions" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. decline in physical condition and health",
      correctExplanation: "'Deteriorate' là động từ học thuật chỉ sự xuống cấp, suy thoái dần về thể lực, sức khỏe hoặc chất lượng theo thời gian.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. become more resistant to diseases",
        diagnosticTitle: "Hiểu ngược hoàn toàn nghĩa của từ deteriorate",
        explanation: "Học sinh nhầm tưởng động vật già đi thì có sức đề kháng cao hơn nên chọn nghĩa tích cực."
      }
    },
    {
      id: "builder_w2d2_q07",
      roundIndex: 6,
      prompt: "Trong thí nghiệm kiểm tra khứu giác, kiến 95 ngày tuổi thể hiện khả năng lần theo mùi thức ăn như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "They could track the scent trail even longer than younger ants" },
        { id: "opt_B", label: "B", text: "They completely lost their sensitivity to scent trails" },
        { id: "opt_C", label: "C", text: "They were easily confused and walked in circular paths" },
        { id: "opt_D", label: "D", text: "They followed the trail at exactly half the speed of young ants" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. They could track the scent trail even longer than younger ants",
      correctExplanation: "Văn bản nêu rõ bất ngờ của thí nghiệm: 'the 95-day-old ants could track the scent even longer than their younger counterparts'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. They completely lost their sensitivity to scent trails",
        diagnosticTitle: "Định kiến người già/kiến già mất khứu giác",
        explanation: "Học sinh suy luận theo lẽ thường rằng già đi thì giác quan kém đi, trong khi bài đọc chỉ ra sự vượt trội của kiến già."
      }
    },
    {
      id: "builder_w2d2_q08",
      roundIndex: 7,
      prompt: "Tại sao loài kiến P. dentata lại có giá trị đặc biệt đối với các nhà khoa học nghiên cứu sự lão hóa ở người?",
      options: [
        { id: "opt_A", label: "A", text: "Their complex social colonies resemble human social organization" },
        { id: "opt_B", label: "B", text: "Their genetic sequence is 99% identical to the human genome" },
        { id: "opt_C", label: "C", text: "They can easily be trained to respond to human voice commands" },
        { id: "opt_D", label: "D", text: "They produce antibodies that can immediately cure human cancer" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Their complex social colonies resemble human social organization",
      correctExplanation: "Văn bản: 'It's this social complexity that makes P. dentata useful for studying aging in people... Humans are also highly social'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Their genetic sequence is 99% identical to the human genome",
        diagnosticTitle: "Suy diễn vô căn cứ về sự tương đồng ADN",
        explanation: "Học sinh quen thuộc với thông điệp ADN của tinh tinh nên tự suy diễn kiến cũng có gen giống người."
      }
    },
    {
      id: "builder_w2d2_q09",
      roundIndex: 8,
      prompt: "Nếu không bị suy giảm thể lực theo tuổi tác, nguyên nhân chính khiến kiến ngoài tự nhiên vẫn chết là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Predators, diseases, and harsh outdoor environments" },
        { id: "opt_B", label: "B", text: "Sudden biological cell death occurring on day 140" },
        { id: "opt_C", label: "C", text: "Younger worker ants expelling elderly ants from the colony" },
        { id: "opt_D", label: "D", text: "Extreme exhaustion caused by laying millions of eggs" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Predators, diseases, and harsh outdoor environments",
      correctExplanation: "Văn bản nêu: 'Out in the wild, the ants probably don't live for a full 140 days thanks to predators, disease and just being in an environment that's much harsher than the comforts of the lab'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Extreme exhaustion caused by laying millions of eggs",
        diagnosticTitle: "Nhầm lẫn giữa kiến chúa và kiến thợ",
        explanation: "Kiến trong nghiên cứu là kiến thợ (worker ants), không phải kiến chúa nên không tham gia việc đẻ trứng."
      }
    },
    {
      id: "builder_w2d2_q10",
      roundIndex: 9,
      prompt: "Thông tin: 'Pheidole dentata ants are the only known animals which remain active for almost their whole lives.' Đánh giá:",
      options: [
        { id: "opt_A", label: "A", text: "FALSE" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" },
        { id: "opt_D", label: "D", text: "AMBIGUOUS" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. FALSE",
      correctExplanation: "Bài đọc nêu rõ: 'Naked mole rats can live for almost 30 years and stay fit for nearly their entire lives'. Do đó kiến P. dentata KHÔNG PHẢI loài duy nhất ('only known animals'). Đáp án là FALSE.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. TRUE",
        diagnosticTitle: "Bỏ sót chi tiết về loài chuột chũi không lông (Naked mole rats)",
        explanation: "Học sinh chỉ tập trung vào nhân vật chính là loài kiến mà quên rằng tác giả đã đề cập đến loài naked mole rat cũng giữ thể lực suốt đời."
      }
    }
  ],

  "WEEK 2 – DAY 3": [
    {
      id: "builder_w2d3_q01",
      roundIndex: 0,
      prompt: "Từ vựng nào dưới đây có nguyên âm phát âm là âm dài /uː/?",
      options: [
        { id: "opt_A", label: "A", text: "food" },
        { id: "opt_B", label: "B", text: "foot" },
        { id: "opt_C", label: "C", text: "cook" },
        { id: "opt_D", label: "D", text: "look" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. food",
      correctExplanation: "Trong 'food', nguyên âm là /uː/ dài (/fuːd/). Trong khi 'foot', 'cook', 'look' đều phát âm là nguyên âm ngắn /ʊ/.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. foot",
        diagnosticTitle: "Nhầm lẫn cặp âm /uː/ dài và /ʊ/ ngắn",
        explanation: "Học sinh thấy chữ 'oo' giống nhau nên nghĩ 'foot' và 'food' phát âm giống hệt nhau."
      }
    },
    {
      id: "builder_w2d3_q02",
      roundIndex: 1,
      prompt: "Từ 'focus' (sự tập trung) có nguyên âm đầu tiên phát âm chuẩn xác là nguyên âm đôi nào?",
      options: [
        { id: "opt_A", label: "A", text: "/əʊ/" },
        { id: "opt_B", label: "B", text: "/ɒ/" },
        { id: "opt_C", label: "C", text: "/ɔː/" },
        { id: "opt_D", label: "D", text: "/ʌ/" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. /əʊ/",
      correctExplanation: "Từ 'focus' phát âm chuẩn IPA là /ˈfəʊkəs/, nguyên âm đầu là nguyên âm đôi /əʊ/.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. /ɒ/",
        diagnosticTitle: "Phát âm theo thói quen tiếng Việt thành /ˈfɒkəs/",
        explanation: "Người học Việt Nam hay đọc âm 'o' thành /ɒ/ ngắn ('pho-cớt') thay vì nguyên âm đôi chuẩn /əʊ/."
      }
    },
    {
      id: "builder_w2d3_q03",
      roundIndex: 2,
      prompt: "Chọn cụm từ chuẩn xác chỉ các loại đồ ăn chế biến công nghiệp chứa nhiều chất bảo quản và muối:",
      options: [
        { id: "opt_A", label: "A", text: "processed foods" },
        { id: "opt_B", label: "B", text: "worked foods" },
        { id: "opt_C", label: "C", text: "treated foods" },
        { id: "opt_D", label: "D", text: "engineered foods" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. processed foods",
      correctExplanation: "Collocation chuẩn quốc tế luôn là 'processed foods' (thực phẩm chế biến sẵn/công nghiệp).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. treated foods",
        diagnosticTitle: "Dịch thô 'đồ ăn được xử lý' thành 'treated foods'",
        explanation: "'Treated' thường dùng cho nước thải (treated water) hoặc điều trị y tế, không dùng cho thực phẩm chế biến."
      }
    },
    {
      id: "builder_w2d3_q04",
      roundIndex: 3,
      prompt: "Chọn động từ kết hợp tự nhiên nhất: \"Regular physical exercise helps to ______ and alleviate stress.\"",
      options: [
        { id: "opt_A", label: "A", text: "boost my mood" },
        { id: "opt_B", label: "B", text: "rise my mood" },
        { id: "opt_C", label: "C", text: "grow my mood" },
        { id: "opt_D", label: "D", text: "push my mood" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. boost my mood",
      correctExplanation: "Collocation tự nhiên là 'boost one's mood' (cải thiện tâm trạng, tinh thần phấn chấn hơn).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. rise my mood",
        diagnosticTitle: "Dùng nội động từ 'rise' trước tân ngữ",
        explanation: "'Rise' là nội động từ không bao giờ có tân ngữ trực tiếp (không thể 'rise my mood')."
      }
    },
    {
      id: "builder_w2d3_q05",
      roundIndex: 4,
      prompt: "Điền động từ học thuật chuẩn Band 5.0+: \"Participating in outdoor activities helps to ______ social interaction.\"",
      options: [
        { id: "opt_A", label: "A", text: "foster" },
        { id: "opt_B", label: "B", text: "force" },
        { id: "opt_C", label: "C", text: "fetch" },
        { id: "opt_D", label: "D", text: "fabricate" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. foster",
      correctExplanation: "'Foster social interaction' là collocation đắt giá mang nghĩa nuôi dưỡng, thúc đẩy sự tương tác gắn kết xã hội.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. force",
        diagnosticTitle: "Nhầm lẫn giữa động từ nuôi dưỡng và ép buộc",
        explanation: "'Force' mang nghĩa ép buộc khiên cưỡng, hoàn toàn sai lệch ngữ cảnh giao tiếp xã hội tự nguyện."
      }
    },
    {
      id: "builder_w2d3_q06",
      roundIndex: 5,
      prompt: "Cụm từ chuẩn xác trong IELTS Speaking để diễn đạt một chế độ dinh dưỡng cân bằng và lành mạnh là:",
      options: [
        { id: "opt_A", label: "A", text: "a balanced diet" },
        { id: "opt_B", label: "B", text: "an equal diet" },
        { id: "opt_C", label: "C", text: "a flat diet" },
        { id: "opt_D", label: "D", text: "a uniform diet" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. a balanced diet",
      correctExplanation: "Cụm danh từ cố định trong tiếng Anh luôn là 'a balanced diet' (chế độ ăn cân đối dưỡng chất).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. an equal diet",
        diagnosticTitle: "Dịch từ 'chế độ ăn đều' thành 'equal diet'",
        explanation: "'Equal' chỉ sự ngang bằng về số lượng/toán học, không dùng miêu tả sự cân đối hài hòa về dinh dưỡng."
      }
    },
    {
      id: "builder_w2d3_q07",
      roundIndex: 6,
      prompt: "Chọn giới từ đúng: \"Fast food is harmful because it is exceptionally high ______ saturated fats and sodium.\"",
      options: [
        { id: "opt_A", label: "A", text: "in" },
        { id: "opt_B", label: "B", text: "with" },
        { id: "opt_C", label: "C", text: "of" },
        { id: "opt_D", label: "D", text: "for" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. in",
      correctExplanation: "Cấu trúc dinh dưỡng luôn là 'high in calories / fat / salt' hoặc 'low in sugar'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. with",
        diagnosticTitle: "Dùng giới từ 'with' sau tính từ high",
        explanation: "Học sinh dịch 'cao với nhiều chất béo' nên chọn nhầm giới từ 'with'."
      }
    },
    {
      id: "builder_w2d3_q08",
      roundIndex: 7,
      prompt: "Chọn cụm thành ngữ thông dụng để nói về việc giữ cơ thể săn chắc, thon gọn và khỏe mạnh:",
      options: [
        { id: "opt_A", label: "A", text: "stay in good shape" },
        { id: "opt_B", label: "B", text: "remain in good body" },
        { id: "opt_C", label: "C", text: "keep in good figure" },
        { id: "opt_D", label: "D", text: "stand in good form" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. stay in good shape",
      correctExplanation: "Thành ngữ chuẩn xác của người bản ngữ là 'stay in shape' hoặc 'keep in good shape'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. keep in good figure",
        diagnosticTitle: "Nhầm lẫn 'figure' (vóc dáng thẩm mỹ) với thành ngữ chỉ sức khỏe",
        explanation: "'Figure' chỉ đường cong hình thể bên ngoài, còn 'in good shape' diễn đạt cả thể lực và sức khỏe dẻo dai."
      }
    },
    {
      id: "builder_w2d3_q09",
      roundIndex: 8,
      prompt: "Cụm Phrasal Verb chuẩn xác có nghĩa là 'cắt giảm số lượng tiêu thụ thức ăn nhanh hoặc đường' là:",
      options: [
        { id: "opt_A", label: "A", text: "cut down on" },
        { id: "opt_B", label: "B", text: "cut off from" },
        { id: "opt_C", label: "C", text: "cut out for" },
        { id: "opt_D", label: "D", text: "cut away at" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. cut down on",
      correctExplanation: "'Cut down on something' là cụm động từ quen thuộc mang nghĩa cắt giảm bớt việc sử dụng thứ gì.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. cut off from",
        diagnosticTitle: "Nhầm lẫn giữa cắt giảm và cắt đứt liên lạc",
        explanation: "'Cut off' nghĩa là cắt nguồn điện/nước hoặc cô lập hoàn toàn, không phải cắt giảm dần số lượng."
      }
    },
    {
      id: "builder_w2d3_q10",
      roundIndex: 9,
      prompt: "Khi giám khảo hỏi 'Do you have any unhealthy habit?', cách trả lời nào đạt chuẩn phản xạ Band 5.0+?",
      options: [
        { id: "opt_A", label: "A", text: "Direct confirmation + Specific habit explanation + Intention to change" },
        { id: "opt_B", label: "B", text: "Only saying 'Yes, I do' and stopping immediately" },
        { id: "opt_C", label: "C", text: "Changing the topic to discuss the government's healthcare policy" },
        { id: "opt_D", label: "D", text: "Saying 'No' and refusing to discuss any lifestyle details" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Direct confirmation + Specific habit explanation + Intention to change",
      correctExplanation: "Công thức chuẩn Part 1: Trả lời trực tiếp câu hỏi (Direct answer) -> Triển khai chi tiết thói quen (Explanation) -> Hướng khắc phục (Action/Intention).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Only saying 'Yes, I do' and stopping immediately",
        diagnosticTitle: "Lỗi trả lời cộc lốc (Under-extension) trong IELTS Speaking",
        explanation: "Thí sinh chỉ trả lời một câu cụt ngủn 'Yes, I do' sẽ bị trừ điểm nặng tiêu chí Fluency & Coherence."
      }
    }
  ]
};
