/**
 * BUILDER ARENA QUESTION BANK - WEEK 7
 * Source: Giáo trình BUILDER 2027 - Đã soát lỗi.docx & Giáo án Builder 2027
 * Target: Band 5.0 IELTS
 * Day 1: Writing (Hedging Skills & Conditionals in Task 2)
 * Day 2: Reading (The Thylacine & Sculptor Henry Moore)
 * Day 3: Speaking (Celebrations and Festivals / Word & Sentence Stress)
 */

export const BUILDER_WEEK_7_QUESTIONS: Record<string, any[]> = {
  // ==========================================
  // WEEK 7 - DAY 1 - WRITING: HEDGING SKILLS & CONDITIONALS
  // ==========================================
  "WEEK 7 – DAY 1": [
    {
      id: "builder_w7d1_q01",
      roundIndex: 0,
      prompt: "Trong văn phong học thuật IELTS Writing Task 2, kỹ thuật 'Hedging' có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Sử dụng ngôn từ thận trọng để tránh khẳng định tuyệt đối hóa vấn đề" },
        { id: "opt_B", label: "B", text: "Trích dẫn nguyên văn toàn bộ các câu trong từ điển vào bài viết" },
        { id: "opt_C", label: "C", text: "Khẳng định chắc chắn một trăm phần trăm mọi dự đoán trong tương lai" },
        { id: "opt_D", label: "D", text: "Chỉ viết những câu đơn giản để tránh hoàn toàn mọi lỗi sai chính tả" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Sử dụng ngôn từ thận trọng để tránh khẳng định tuyệt đối hóa vấn đề",
      correctExplanation: "Hedging là kỹ thuật diễn đạt chừng mực, thận trọng (cautious language) bằng cách dùng modal verbs (could, may, might) hoặc adverbs (likely, possibly) nhằm tránh lỗi vơ đũa cả nắm (overgeneralization).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Khẳng định chắc chắn một trăm phần trăm mọi dự đoán trong tương lai",
        diagnosticTitle: "Nhầm lẫn giữa lập luận sắc bén và khẳng định tuyệt đối",
        explanation: "Trong văn phong khoa học quốc tế, việc dùng từ tuyệt đối như 'always', 'definitely will', 'all people' bị xem là thiếu khách quan và thiếu tính học thuật."
      }
    },
    {
      id: "builder_w7d1_q02",
      roundIndex: 1,
      prompt: "Câu nào dưới đây mắc lỗi khẳng định quá tuyệt đối (Overgeneralization) cần phải sửa bằng kỹ thuật Hedging?",
      options: [
        { id: "opt_A", label: "A", text: "Automation in manufacturing will cause all factory workers to become unemployed." },
        { id: "opt_B", label: "B", text: "Automation in manufacturing could lead to job losses among low-skilled workers." },
        { id: "opt_C", label: "C", text: "Automation in manufacturing is likely to affect manual labor significantly." },
        { id: "opt_D", label: "D", text: "Automation in manufacturing may reshape the employment landscape in many sectors." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Automation in manufacturing will cause all factory workers to become unemployed.",
      correctExplanation: "Câu A dùng từ tuyệt đối 'will cause all workers', khẳng định tất cả công nhân đều mất việc là phi thực tế. Các câu B, C, D đều dùng hedging chuẩn mực: 'could', 'is likely to', 'may'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Automation in manufacturing could lead to job losses among low-skilled workers.",
        diagnosticTitle: "Không nhận diện được động từ khuyết thiếu mang tính suy đoán",
        explanation: "'could' là modal verb mang tính suy đoán thận trọng chuẩn mực của kỹ thuật Hedging, hoàn toàn không phải lỗi tuyệt đối hóa."
      }
    },
    {
      id: "builder_w7d1_q03",
      roundIndex: 2,
      prompt: "Phát hiện lỗi ngữ pháp trong câu điều kiện sau: \"Governments would reduce pollution if they will introduce stricter laws.\"",
      options: [
        { id: "opt_A", label: "A", text: "Dùng thừa 'will' trong mệnh đề điều kiện đi sau liên từ 'if'" },
        { id: "opt_B", label: "B", text: "Động từ 'reduce' không thể đứng sau động từ khuyết thiếu 'would'" },
        { id: "opt_C", label: "C", text: "Tính từ 'stricter' bắt buộc phải có từ 'more' đứng phía trước" },
        { id: "opt_D", label: "D", text: "Danh từ 'pollution' bắt buộc phải thêm đuôi số nhiều '-s'" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Dùng thừa 'will' trong mệnh đề điều kiện đi sau liên từ 'if'",
      correctExplanation: "Quy tắc ngữ pháp căn bản của câu điều kiện: Mệnh đề 'if' không bao giờ dùng 'will'. Nếu là điều kiện loại 2: 'if they introduced stricter laws, governments would reduce pollution'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Tính từ 'stricter' bắt buộc phải có từ 'more' đứng phía trước",
        diagnosticTitle: "Nhầm lẫn quy tắc so sánh hơn của tính từ ngắn",
        explanation: "'strict' là tính từ ngắn 1 âm tiết, so sánh hơn chỉ cần thêm '-er' thành 'stricter', không bao giờ thêm 'more'."
      }
    },
    {
      id: "builder_w7d1_q04",
      roundIndex: 3,
      prompt: "Chọn câu điều kiện loại 2 giả định một giải pháp ở hiện tại chuẩn xác nhất trong IELTS Writing:",
      options: [
        { id: "opt_A", label: "A", text: "If the government provided free public transit, traffic congestion would decrease." },
        { id: "opt_B", label: "B", text: "If the government would provide free public transit, traffic congestion decreased." },
        { id: "opt_C", label: "C", text: "If the government provides free public transit, traffic congestion would decrease." },
        { id: "opt_D", label: "D", text: "If the government will provide free public transit, traffic congestion will decrease." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. If the government provided free public transit, traffic congestion would decrease.",
      correctExplanation: "Cấu trúc câu điều kiện loại 2: 'If + S + V2/ed, S + would/could + V-bare'. Câu A tuân thủ chuẩn xác cấu trúc này.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. If the government provides free public transit, traffic congestion would decrease.",
        diagnosticTitle: "Trộn lẫn thì hiện tại đơn ở vế If với 'would' ở vế chính",
        explanation: "Đây là lỗi 'râu ông nọ cắm cằm bà kia' rất phổ biến: vế If dùng hiện tại ('provides') nhưng vế sau lại dùng quá khứ ('would decrease')."
      }
    },
    {
      id: "builder_w7d1_q05",
      roundIndex: 4,
      prompt: "Cụm từ nào dưới đây là công cụ Hedging hiệu quả nhất để làm giảm mức độ tuyệt đối của câu: \"Online education replaces traditional classrooms\"?",
      options: [
        { id: "opt_A", label: "A", text: "is unlikely to completely replace" },
        { id: "opt_B", label: "B", text: "undoubtedly will definitely replace" },
        { id: "opt_C", label: "C", text: "must permanently and fully replace" },
        { id: "opt_D", label: "D", text: "is one hundred percent going to replace" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. is unlikely to completely replace",
      correctExplanation: "'is unlikely to completely replace' (nhiều khả năng khó có thể thay thế hoàn toàn) là cách diễn đạt học thuật sắc sảo, chừng mực và thuyết phục.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. undoubtedly will definitely replace",
        diagnosticTitle: "Tăng cường mức độ tuyệt đối thay vì làm mềm lập luận",
        explanation: "'undoubtedly will definitely' là các trạng từ khẳng định cực đoan, hoàn toàn trái ngược với yêu cầu dùng kỹ thuật Hedging để thận trọng hóa."
      }
    },
    {
      id: "builder_w7d1_q06",
      roundIndex: 5,
      prompt: "Xác định câu dùng Hedging kết hợp động từ xu hướng (trend verbs) chuẩn xác:",
      options: [
        { id: "opt_A", label: "A", text: "People from lower-income backgrounds tend to encounter greater obstacles in higher education." },
        { id: "opt_B", label: "B", text: "People from lower-income backgrounds always encounter all obstacles in higher education." },
        { id: "opt_C", label: "C", text: "People from lower-income backgrounds are forced to fail entirely in higher education." },
        { id: "opt_D", label: "D", text: "People from lower-income backgrounds never manage to achieve success in higher education." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. People from lower-income backgrounds tend to encounter greater obstacles in higher education.",
      correctExplanation: "Cụm 'tend to encounter' (có xu hướng gặp phải) là kỹ thuật Hedging kinh điển, giúp nhận định trở nên chuẩn xác mà không quy chụp tất cả mọi người.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. People from lower-income backgrounds always encounter all obstacles in higher education.",
        diagnosticTitle: "Lỗi dùng từ quy chụp 'always' và 'all'",
        explanation: "Khẳng định 'always encounter all obstacles' là phát biểu cực đoan, vi phạm tiêu chí lập luận học thuật khách quan."
      }
    },
    {
      id: "builder_w7d1_q07",
      roundIndex: 6,
      prompt: "Trong câu: \"It can be argued that artificial intelligence will transform the labor market\", cụm 'It can be argued that' đóng vai trò gì?",
      options: [
        { id: "opt_A", label: "A", text: "Cụm từ rào đón mở đầu để đưa ra quan điểm một cách khách quan" },
        { id: "opt_B", label: "B", text: "Mệnh đề quan hệ xác định bổ nghĩa cho danh từ đứng trước" },
        { id: "opt_C", label: "C", text: "Một thành ngữ dân gian dùng trong văn nói hàng ngày" },
        { id: "opt_D", label: "D", text: "Một mệnh đề trạng ngữ chỉ nguyên nhân trực tiếp của sự việc" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Cụm từ rào đón mở đầu để đưa ra quan điểm một cách khách quan",
      correctExplanation: "'It can be argued that...' (Có thể lập luận rằng...) là cấu trúc khách quan hóa (distancing device/hedging), giúp người viết tránh áp đặt ý kiến chủ quan cá nhân.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Một thành ngữ dân gian dùng trong văn nói hàng ngày",
        diagnosticTitle: "Nhầm lẫn cụm từ học thuật với khẩu ngữ",
        explanation: "Đây là cấu trúc văn phong trang trọng (formal academic style), không phải thành ngữ hay khẩu ngữ thân mật."
      }
    },
    {
      id: "builder_w7d1_q08",
      roundIndex: 7,
      prompt: "Sắp xếp mức độ chắc chắn của 3 từ sau theo thứ tự GIẢM DẦN (từ chắc chắn nhất đến thận trọng nhất):",
      options: [
        { id: "opt_A", label: "A", text: "definitely -> likely -> possibly" },
        { id: "opt_B", label: "B", text: "possibly -> definitely -> likely" },
        { id: "opt_C", label: "C", text: "likely -> possibly -> definitely" },
        { id: "opt_D", label: "D", text: "possibly -> likely -> definitely" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. definitely -> likely -> possibly",
      correctExplanation: "'definitely' (chắc chắn 100%) > 'likely' (có khả năng cao ~70-80%) > 'possibly' (có thể xảy ra nhưng không chắc ~30-40%).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. possibly -> likely -> definitely",
        diagnosticTitle: "Sắp xếp ngược chiều từ yếu đến mạnh",
        explanation: "Phương án D sắp xếp theo thứ tự tăng dần, trong khi đề bài yêu cầu thứ tự GIẢM DẦN từ chắc chắn nhất đến thận trọng nhất."
      }
    },
    {
      id: "builder_w7d1_q09",
      roundIndex: 8,
      prompt: "Chọn phương án viết lại câu: \"Eating fast food makes people fat\" theo phong cách học thuật Band 6.5+ có áp dụng Hedging:",
      options: [
        { id: "opt_A", label: "A", text: "Frequent consumption of fast food may contribute significantly to obesity." },
        { id: "opt_B", label: "B", text: "Eating fast food will definitely make all human beings extremely overweight." },
        { id: "opt_C", label: "C", text: "Fast food is always causing people to become fat without any exception." },
        { id: "opt_D", label: "D", text: "To eat junk food surely forces every consumer into severe fatness." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Frequent consumption of fast food may contribute significantly to obesity.",
      correctExplanation: "Câu A dùng từ vựng học thuật: 'frequent consumption', modal 'may', collocation 'contribute to obesity', tránh lối diễn đạt thô sơ và quy chụp.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Eating fast food will definitely make all human beings extremely overweight.",
        diagnosticTitle: "Lạm dụng trạng từ nhấn mạnh và quy chụp toàn thể",
        explanation: "Câu B dùng 'will definitely' và 'all human beings' là cách hành văn thiếu cẩn trọng, bị trừ điểm ở tiêu chí học thuật."
      }
    },
    {
      id: "builder_w7d1_q10",
      roundIndex: 9,
      prompt: "Tại sao trong bài luận IELTS Task 2 ta nên ưu tiên dùng điều kiện loại 2 hơn điều kiện loại 1 khi đề xuất chính sách?",
      options: [
        { id: "opt_A", label: "A", text: "Vì đó là những giải pháp giả định chưa diễn ra trong thực tế ở thời điểm hiện tại" },
        { id: "opt_B", label: "B", text: "Vì điều kiện loại 2 luôn được cộng thêm điểm ngữ pháp cao gấp đôi loại 1" },
        { id: "opt_C", label: "C", text: "Vì điều kiện loại 1 bị cấm sử dụng hoàn toàn trong các kỳ thi học thuật" },
        { id: "opt_D", label: "D", text: "Vì điều kiện loại 2 chỉ dùng để nói về những sự kiện lịch sử trong quá khứ" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Vì đó là những giải pháp giả định chưa diễn ra trong thực tế ở thời điểm hiện tại",
      correctExplanation: "Khi thí sinh đề xuất 'Nếu chính phủ trợ cấp xe buýt...' thì thực tế chính phủ chưa làm điều đó ở hiện tại, nên việc dùng điều kiện loại 2 mang tính giả định chính sách chuẩn xác hơn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Vì điều kiện loại 2 luôn được cộng thêm điểm ngữ pháp cao gấp đôi loại 1",
        diagnosticTitle: "Hiểu sai tiêu chí chấm điểm ngữ pháp IELTS",
        explanation: "Không có quy định nhân đôi điểm máy móc nào cả; tiêu chí yêu cầu dùng cấu trúc phù hợp chính xác với ngữ cảnh giả định."
      }
    },
  ],

  // ==========================================
  // WEEK 7 - DAY 2 - READING: THE THYLACINE & HENRY MOORE
  // ==========================================
  "WEEK 7 – DAY 2": [
    {
      id: "builder_w7d2_q01",
      roundIndex: 0,
      prompt: "Loài thú có túi Thylacine (chó sói Tasmania) được chính quyền Tasmania chính thức tuyên bố tuyệt chủng vào năm nào?",
      options: [
        { id: "opt_A", label: "A", text: "Năm 1986" },
        { id: "opt_B", label: "B", text: "Năm 1936" },
        { id: "opt_C", label: "C", text: "Năm 1830" },
        { id: "opt_D", label: "D", text: "Năm 2000" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Năm 1986",
      correctExplanation: "Bài đọc: 'The species was declared extinct by the Tasmanian government in 1986.' (Năm 1936 là năm cá thể nuôi nhốt cuối cùng qua đời, nhưng mãi đến 1986 mới tuyên bố chính thức).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Năm 1936",
        diagnosticTitle: "Nhầm lẫn năm cá thể cuối cùng chết với năm tuyên bố tuyệt chủng",
        explanation: "Con thylacine cuối cùng trong vườn thú chết năm 1936, nhưng chính phủ phải chờ 50 năm tìm kiếm không có kết quả mới chính thức tuyên bố tuyệt chủng vào năm 1986."
      }
    },
    {
      id: "builder_w7d2_q02",
      roundIndex: 1,
      prompt: "Kết quả của vô số các cuộc thám hiểm và tìm kiếm thylacine trong tự nhiên nhiều năm qua là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Không có cuộc tìm kiếm nào thu được bằng chứng dứt khoát rằng loài này còn tồn tại" },
        { id: "opt_B", label: "B", text: "Đã tìm thấy một đàn thylacine hoang dã sinh sống biệt lập trên một hòn đảo nhỏ" },
        { id: "opt_C", label: "C", text: "Bắt được hai cá thể sống sót đưa về nhân giống thành công trong vườn thú" },
        { id: "opt_D", label: "D", text: "Phát hiện vết chân tươi mới của chúng trong các hang động ven biển miền nam" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Không có cuộc tìm kiếm nào thu được bằng chứng dứt khoát rằng loài này còn tồn tại",
      correctExplanation: "Đoạn văn khẳng định: '...none of which has produced definitive evidence that thylacines still exist.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đã tìm thấy một đàn thylacine hoang dã sinh sống biệt lập trên một hòn đảo nhỏ",
        diagnosticTitle: "Nhầm đề xuất của Flynn với kết quả thực tế",
        explanation: "Việc di dời ra đảo chỉ là đề xuất chưa thực hiện của giáo sư T.T. Flynn, không phải phát hiện thực tế."
      }
    },
    {
      id: "builder_w7d2_q03",
      roundIndex: 2,
      prompt: "Trong bài đọc về điêu khắc gia Henry Moore, sau khi tốt nghiệp phổ thông, ông đã làm theo ý nguyện của cha mình là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đăng ký học khóa đào tạo để trở thành giáo viên trường học" },
        { id: "opt_B", label: "B", text: "Trở thành một thợ điêu khắc đá cẩm thạch chuyên nghiệp ở London" },
        { id: "opt_C", label: "C", text: "Gia nhập quân đội ngay lập tức để tham gia chiến tranh thế giới" },
        { id: "opt_D", label: "D", text: "Làm việc tại các khu mỏ than đá của thị trấn Castleford" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đăng ký học khóa đào tạo để trở thành giáo viên trường học",
      correctExplanation: "Bài đọc: '...Moore hoped to become a sculptor, but instead he complied with his father’s wish that he train as a schoolteacher.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Trở thành một thợ điêu khắc đá cẩm thạch chuyên nghiệp ở London",
        diagnosticTitle: "Nhầm ước mơ của bản thân với ý nguyện của người cha",
        explanation: "Trở thành điêu khắc gia là nguyện vọng của cá nhân Moore, còn cha ông mong muốn ông theo nghề dạy học ổn định."
      }
    },
    {
      id: "builder_w7d2_q04",
      roundIndex: 3,
      prompt: "Tại trường Nghệ thuật Leeds trong năm học đầu tiên, Henry Moore đã dành phần lớn thời gian làm gì?",
      options: [
        { id: "opt_A", label: "A", text: "Thực hành vẽ tranh vì năm nhất chưa có giáo viên dạy điêu khắc được bổ nhiệm" },
        { id: "opt_B", label: "B", text: "Trực tiếp tạc các khối đá lớn ngoài trời cùng với các nghệ nhân lâu năm" },
        { id: "opt_C", label: "C", text: "Nghiên cứu lịch sử hội họa Phục hưng tại các thư viện công cộng" },
        { id: "opt_D", label: "D", text: "Được cử sang Paris tu nghiệp ngắn hạn tại các xưởng đúc tượng đồng" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thực hành vẽ tranh vì năm nhất chưa có giáo viên dạy điêu khắc được bổ nhiệm",
      correctExplanation: "Bài đọc: 'In his first year, he spent most of his time drawing. Although he wanted to study sculpture, no teacher was appointed until his second year.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Trực tiếp tạc các khối đá lớn ngoài trời cùng với các nghệ nhân lâu năm",
        diagnosticTitle: "Đoán mò dựa trên nghề nghiệp chính của nhân vật",
        explanation: "Dù Moore rất muốn tạc tượng ngay, nhưng trường chưa có giáo viên bộ môn điêu khắc trong năm đầu nên ông phải tập trung học vẽ (drawing)."
      }
    },
    {
      id: "builder_w7d2_q05",
      roundIndex: 4,
      prompt: "Những chuyến thăm Bảo tàng Anh (British Museum) tại London đã mang lại bước ngoặt nghệ thuật nào cho Henry Moore?",
      options: [
        { id: "opt_A", label: "A", text: "Khám phá vẻ đẹp điêu khắc Ai Cập và châu Phi cổ đại, từ bỏ truyền thống điêu khắc châu Âu" },
        { id: "opt_B", label: "B", text: "Quyết định chuyển sang sao chép các bức tượng bán thân thời kỳ Hy Lạp cổ điển" },
        { id: "opt_C", label: "C", text: "Từ bỏ hoàn toàn ngành điêu khắc để theo đuổi sự nghiệp khảo cổ học bảo tàng" },
        { id: "opt_D", label: "D", text: "Bắt đầu sử dụng chất liệu đất sét nung thay vì đục đẽo trên đá tự nhiên" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khám phá vẻ đẹp điêu khắc Ai Cập và châu Phi cổ đại, từ bỏ truyền thống điêu khắc châu Âu",
      correctExplanation: "Bài đọc: '...he discovered the power and beauty of ancient Egyptian and African sculpture. As he became increasingly interested in these ‘primitive’ forms of art, he turned away from European sculptural traditions.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Quyết định chuyển sang sao chép các bức tượng bán thân thời kỳ Hy Lạp cổ điển",
        diagnosticTitle: "Chọn trường phái truyền thống mà Moore đã quay lưng",
        explanation: "Moore đã chủ động quay lưng ('turned away') khỏi truyền thống điêu khắc châu Âu cổ điển để hướng đến nghệ thuật nguyên thủy châu Phi và Ai Cập."
      }
    },
    {
      id: "builder_w7d2_q06",
      roundIndex: 5,
      prompt: "Bản sao bức tượng điêu khắc Maya về thần mưa tại Bảo tàng Trocadero ở Paris có hình dáng đặc trưng gì khiến Moore mê mẩn?",
      options: [
        { id: "opt_A", label: "A", text: "Một nhân vật nam nằm ngửa với hai đầu gối co lên và đầu ngoảnh góc vuông với thân" },
        { id: "opt_B", label: "B", text: "Một chiến binh cưỡi báo đốm đang giương cung tên săn mồi trên đỉnh núi" },
        { id: "opt_C", label: "C", text: "Một nữ thần chim ưng với đôi cánh dang rộng che chở cho dân làng" },
        { id: "opt_D", label: "D", text: "Một vị giáo sĩ đứng thẳng khoác áo choàng lông vũ cầm quyền trượng" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Một nhân vật nam nằm ngửa với hai đầu gối co lên và đầu ngoảnh góc vuông với thân",
      correctExplanation: "Bài đọc: 'It was a male reclining figure with its knees drawn up together, and its head at a right angle to its body. Moore became fascinated with this stone sculpture...'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Một nữ thần chim ưng với đôi cánh dang rộng che chở cho dân làng",
        diagnosticTitle: "Nhầm lẫn với các hình tượng thần thoại khác",
        explanation: "Bức tượng nổi tiếng đó là tượng thần mưa Chac Mool (male reclining figure) với tư thế co gối, trở thành cảm hứng cho loạt tượng người ngả lưng sau này của Moore."
      }
    },
    {
      id: "builder_w7d2_q07",
      roundIndex: 6,
      prompt: "Mục tiêu hoạt động của nhóm nghệ sĩ trẻ 'Unit One' mà Henry Moore tham gia năm 1933 là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Thuyết phục công chúng Anh về giá trị của trào lưu nghệ thuật và kiến trúc hiện đại mới nổi" },
        { id: "opt_B", label: "B", text: "Bảo tồn các di tích kiến trúc cổ thời kỳ Trung cổ trên khắp nước Anh" },
        { id: "opt_C", label: "C", text: "Cạnh tranh thương mại với các phòng tranh lớn của Pháp và Ý" },
        { id: "opt_D", label: "D", text: "Tổ chức các cuộc đấu giá tranh để gây quỹ hỗ trợ thương phế binh" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thuyết phục công chúng Anh về giá trị của trào lưu nghệ thuật và kiến trúc hiện đại mới nổi",
      correctExplanation: "Bài đọc: 'The aim of the group was to convince the English public of the merits of the emerging international movement in modern art and architecture.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bảo tồn các di tích kiến trúc cổ thời kỳ Trung cổ trên khắp nước Anh",
        diagnosticTitle: "Chọn mục tiêu bảo tồn cổ điển thay vì tiên phong hiện đại",
        explanation: "Unit One là nhóm nghệ sĩ tiên phong (modernists), mục đích của họ là lan tỏa nghệ thuật và kiến trúc hiện đại đến công chúng Anh vốn còn bảo thủ."
      }
    },
    {
      id: "builder_w7d2_q08",
      roundIndex: 7,
      prompt: "Đánh giá nhận định: \"Moore thought the Mayan sculpture was similar in certain respects to other stone sculptures.\"",
      options: [
        { id: "opt_A", label: "A", text: "FALSE" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" },
        { id: "opt_D", label: "D", text: "INCOMPLETE" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. FALSE",
      correctExplanation: "Bài đọc ghi rõ Moore tin rằng bức tượng đá này có sức mạnh và tính độc bản không giống bất kỳ pho tượng đá nào khác: 'had a power and originality that no other stone sculpture possessed'. Do đó nói nó 'similar to other sculptures' là FALSE.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. TRUE",
        diagnosticTitle: "Không nhận diện được từ trái nghĩa 'originality' vs 'similar'",
        explanation: "'originality that no other stone sculpture possessed' nghĩa là hoàn toàn độc đáo duy nhất, đối lập 100% với nhận định 'similar in certain respects'."
      }
    },
    {
      id: "builder_w7d2_q09",
      roundIndex: 8,
      prompt: "Từ 'complied with' trong câu \"...instead he complied with his father's wish...\" đồng nghĩa với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "obeyed" },
        { id: "opt_B", label: "B", text: "rejected" },
        { id: "opt_C", label: "C", text: "criticized" },
        { id: "opt_D", label: "D", text: "ignored" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. obeyed",
      correctExplanation: "'comply with' nghĩa là tuân theo, làm theo ý nguyện (obeyed / conformed to).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. rejected",
        diagnosticTitle: "Chọn từ mang nghĩa chống đối",
        explanation: "'reject' nghĩa là từ chối, bác bỏ, trái ngược hoàn toàn với việc làm theo mong muốn của cha."
      }
    },
    {
      id: "builder_w7d2_q10",
      roundIndex: 9,
      prompt: "Sau khi bị cuốn hút bởi tác phẩm điêu khắc Maya, Henry Moore đã bắt đầu tự mình sáng tác các chủ đề nào trên chất liệu đá?",
      options: [
        { id: "opt_A", label: "A", text: "Các hình tượng phụ nữ nằm nghiêng, nhóm mẹ và con, và các mặt nạ" },
        { id: "opt_B", label: "B", text: "Các pho tượng động vật hoang dã như hổ, báo và chim ưng" },
        { id: "opt_C", label: "C", text: "Các vị hoàng đế La Mã và các tướng lĩnh quân đội Anh" },
        { id: "opt_D", label: "D", text: "Các mô hình kiến trúc nhà thờ và lâu đài phong cách Gothic" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Các hình tượng phụ nữ nằm nghiêng, nhóm mẹ và con, và các mặt nạ",
      correctExplanation: "Bài đọc: 'He himself started carving a variety of subjects in stone, including depictions of reclining women, mother-and-child groups, and masks.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Các vị hoàng đế La Mã và các tướng lĩnh quân đội Anh",
        diagnosticTitle: "Nhầm lẫn với điêu khắc tượng đài châu Âu cổ điển",
        explanation: "Các chủ đề gắn liền với tên tuổi Henry Moore là hình tượng phụ nữ ngả lưng (reclining women) và tình mẫu tử (mother-and-child)."
      }
    },
  ],

  // ==========================================
  // WEEK 7 - DAY 3 - SPEAKING: CELEBRATIONS & STRESS
  // ==========================================
  "WEEK 7 – DAY 3": [
    {
      id: "builder_w7d3_q01",
      roundIndex: 0,
      prompt: "Quy tắc ngữ âm căn bản: Trọng âm của từ (word stress) thường có xu hướng rơi vào loại âm nào trong tiếng Anh?",
      options: [
        { id: "opt_A", label: "A", text: "Nguyên âm dài hoặc nguyên âm đôi hoặc âm tiết kết thúc với chùm phụ âm" },
        { id: "opt_B", label: "B", text: "Luôn rơi vào âm schwa ngắn /ə/ ở mọi vị trí của từ" },
        { id: "opt_C", label: "C", text: "Chỉ rơi vào các tiền tố phủ định như un-, dis-, in-" },
        { id: "opt_D", label: "D", text: "Âm tiết ngắn nhất và yếu nhất trong cấu tạo của từ" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nguyên âm dài hoặc nguyên âm đôi hoặc âm tiết kết thúc với chùm phụ âm",
      correctExplanation: "Trọng âm tự nhiên ưu tiên rơi vào nguyên âm dài (như /iː/ trong agreement), nguyên âm đôi (như /eɪ/ trong creative), hoặc âm tiết có đuôi chùm phụ âm (như /nd/ trong comprehend).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Luôn rơi vào âm schwa ngắn /ə/ ở mọi vị trí của từ",
        diagnosticTitle: "Hiểu ngược hoàn toàn bản chất của âm schwa",
        explanation: "Âm schwa /ə/ là âm lướt nhẹ, KHÔNG BAO GIỜ nhận trọng âm chính của từ."
      }
    },
    {
      id: "builder_w7d3_q02",
      roundIndex: 1,
      prompt: "Trong câu: \"I need to have my homework DONE before I can hang out\", người nói nhấn mạnh vào từ 'DONE' nhằm mục đích gì?",
      options: [
        { id: "opt_A", label: "A", text: "Nhấn mạnh vào kết quả hoàn thành bài tập chứ không chỉ là làm dở dang" },
        { id: "opt_B", label: "B", text: "Thể hiện rằng mình không hề có bất kỳ bài tập về nhà nào" },
        { id: "opt_C", label: "C", text: "Thể hiện sự bất mãn và từ chối đi chơi cùng với bạn bè" },
        { id: "opt_D", label: "D", text: "Hỏi lại người nghe xem khi nào thì bạn bè sẽ tới đón" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nhấn mạnh vào kết quả hoàn thành bài tập chứ không chỉ là làm dở dang",
      correctExplanation: "Sentence stress linh hoạt theo ý định người nói. Nhấn vào 'DONE' nhằm nêu bật điều kiện tiên quyết là bài phải xong xuôi trọn vẹn mới đi chơi được.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Thể hiện sự bất mãn và từ chối đi chơi cùng với bạn bè",
        diagnosticTitle: "Suy diễn tiêu cực không có căn cứ ngữ cảnh",
        explanation: "Người nói vẫn có ý định đi chơi ('before I can hang out'), chỉ là nhấn mạnh mức độ hoàn thành bài tập."
      }
    },
    {
      id: "builder_w7d3_q03",
      roundIndex: 2,
      prompt: "Điền giới từ thời gian chuẩn xác khi nói về dịp lễ Giáng sinh: \"We always have a big festive feast [......] Christmas.\"",
      options: [
        { id: "opt_A", label: "A", text: "at" },
        { id: "opt_B", label: "B", text: "in" },
        { id: "opt_C", label: "C", text: "on" },
        { id: "opt_D", label: "D", text: "to" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. at",
      correctExplanation: "Khi nói về kỳ nghỉ lễ dài ngày chung chung ta dùng giới từ 'at': 'at Christmas', 'at Easter', 'at Tet'. (Chỉ khi có từ 'Day' đi kèm như 'on Christmas Day' mới dùng 'on').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. on",
        diagnosticTitle: "Nhầm lẫn giữa dịp lễ nói chung và ngày lễ cụ thể",
        explanation: "'on' chỉ dùng cho ngày cụ thể như 'on Christmas Day' hoặc 'on December 25th'. Đi với 'Christmas' đứng một mình bắt buộc dùng 'at Christmas'."
      }
    },
    {
      id: "builder_w7d3_q04",
      roundIndex: 3,
      prompt: "Điền giới từ chỉ thời điểm cụ thể: \"The fireworks show will begin promptly [......] midnight to welcome the New Year.\"",
      options: [
        { id: "opt_A", label: "A", text: "at" },
        { id: "opt_B", label: "B", text: "on" },
        { id: "opt_C", label: "C", text: "in" },
        { id: "opt_D", label: "D", text: "during" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. at",
      correctExplanation: "Thời điểm cụ thể trong ngày (giờ, thời khắc) luôn đi với giới từ 'at': 'at midnight', 'at noon', 'at 7 o'clock'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. in",
        diagnosticTitle: "Nhầm lẫn với các buổi trong ngày (in the morning)",
        explanation: "'midnight' là một mốc thời gian tức thì (12 giờ đêm), không phải là một khoảng thời gian dài như 'in the morning/afternoon'."
      }
    },
    {
      id: "builder_w7d3_q05",
      roundIndex: 4,
      prompt: "Điền giới từ khi nhắc đến ngày lễ Tình nhân có chữ 'Day': \"I bought a bouquet of red roses [......] Valentine's Day.\"",
      options: [
        { id: "opt_A", label: "A", text: "on" },
        { id: "opt_B", label: "B", text: "at" },
        { id: "opt_C", label: "C", text: "in" },
        { id: "opt_D", label: "D", text: "by" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. on",
      correctExplanation: "Bất cứ danh từ chỉ ngày lễ nào có chứa chữ 'Day' đều đi với giới từ 'on': 'on Valentine's Day', 'on Christmas Day', 'on New Year's Day'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. at",
        diagnosticTitle: "Áp dụng máy móc quy tắc tên lễ hội",
        explanation: "Có chữ 'Day' chỉ một ngày lịch cụ thể thì quy tắc ưu tiên luôn là giới từ 'on'."
      }
    },
    {
      id: "builder_w7d3_q06",
      roundIndex: 5,
      prompt: "Điền giới từ chỉ khoảng thời gian kéo dài: \"I have been thoroughly cleaning my house to prepare for Tet [......] three days.\"",
      options: [
        { id: "opt_A", label: "A", text: "for" },
        { id: "opt_B", label: "B", text: "since" },
        { id: "opt_C", label: "C", text: "at" },
        { id: "opt_D", label: "D", text: "on" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. for",
      correctExplanation: "Trong thì Hiện tại hoàn thành tiếp diễn, 'for + khoảng thời gian' chỉ độ dài hành động diễn ra liên tục ('for three days').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. since",
        diagnosticTitle: "Nhầm lẫn giữa khoảng thời gian và mốc thời gian",
        explanation: "'since' chỉ đi với mốc thời gian (ví dụ: since Monday), không đi với độ dài 'three days'."
      }
    },
    {
      id: "builder_w7d3_q07",
      roundIndex: 6,
      prompt: "Cụm collocation nào chỉ bầu không khí vui tươi, nhộn nhịp đặc trưng của mùa lễ hội?",
      options: [
        { id: "opt_A", label: "A", text: "a festive atmosphere" },
        { id: "opt_B", label: "B", text: "a holiday climate" },
        { id: "opt_C", label: "C", text: "a celebration weather" },
        { id: "opt_D", label: "D", text: "a party temperature" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. a festive atmosphere",
      correctExplanation: "Collocation tự nhiên chuẩn xác trong IELTS Speaking: 'a festive atmosphere' (không khí lễ hội tưng bừng, rộn rã).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. a holiday climate",
        diagnosticTitle: "Dùng từ 'khí hậu thời tiết' để dịch không khí",
        explanation: "Tiếng Việt nói 'bầu không khí', học sinh dịch nhầm sang 'climate' hoặc 'weather'. Trong tiếng Anh, không khí cảm xúc tập thể là 'atmosphere'."
      }
    },
    {
      id: "builder_w7d3_q08",
      roundIndex: 7,
      prompt: "Trong Speaking Part 1, khi được hỏi \"What is your favorite celebration?\", câu trả lời nào dưới đây tự nhiên và mạch lạc nhất?",
      options: [
        { id: "opt_A", label: "A", text: "My favorite celebration is Tet holiday, which takes place annually in late January. It is a wonderful time for family reunions and exchanging lucky money." },
        { id: "opt_B", label: "B", text: "I like Tet very much. Because Tet is very happy and I get much money from my parents." },
        { id: "opt_C", label: "C", text: "I do not know any celebration because every day is the same to me and I am always busy." },
        { id: "opt_D", label: "D", text: "Tet is the best holiday in Vietnam country where everybody eats bánh chưng all day." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. My favorite celebration is Tet holiday, which takes place annually in late January. It is a wonderful time for family reunions and exchanging lucky money.",
      correctExplanation: "Câu A sử dụng mệnh đề quan hệ ', which takes place annually', từ vựng chọn lọc 'family reunions', 'exchanging lucky money', đáp ứng đầy đủ tiêu chí Fluency và Lexical Resource.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. I like Tet very much. Because Tet is very happy and I get much money from my parents.",
        diagnosticTitle: "Câu trả lời vụng về, sơ cấp Band 4.5",
        explanation: "Câu B dùng câu cụt bắt đầu bằng 'Because', lặp từ 'Tet', dùng từ ngữ trẻ con 'very happy' và 'get much money'."
      }
    },
    {
      id: "builder_w7d3_q09",
      roundIndex: 8,
      prompt: "Từ 'commemorate' trong các lễ hội mang ý nghĩa trang trọng là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tưởng niệm, kỷ niệm và tôn vinh một sự kiện lịch sử hoặc một nhân vật vĩ đại" },
        { id: "opt_B", label: "B", text: "Mua sắm thật nhiều đồ giảm giá tại các trung tâm thương mại" },
        { id: "opt_C", label: "C", text: "Yêu cầu chính quyền hủy bỏ các ngày nghỉ lễ toàn quốc" },
        { id: "opt_D", label: "D", text: "Thiết kế các mẫu thiệp chúc mừng điện tử gửi qua email" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tưởng niệm, kỷ niệm và tôn vinh một sự kiện lịch sử hoặc một nhân vật vĩ đại",
      correctExplanation: "'commemorate' là động từ học thuật band 7+: tưởng nhớ, tôn vinh công lao (ví dụ: 'commemorate historical events / war heroes').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Mua sắm thật nhiều đồ giảm giá tại các trung tâm thương mại",
        diagnosticTitle: "Tầm thường hóa ý nghĩa của từ học thuật",
        explanation: "'commemorate' mang sắc thái thiêng liêng, trang nghiêm của lịch sử, không dùng cho các hoạt động thương mại mua sắm."
      }
    },
    {
      id: "builder_w7d3_q10",
      roundIndex: 9,
      prompt: "Từ nào dưới đây có trọng âm rơi vào nguyên âm dài /iː/ ở ÂM TIẾT THỨ HAI?",
      options: [
        { id: "opt_A", label: "A", text: "agreement" },
        { id: "opt_B", label: "B", text: "celebrate" },
        { id: "opt_C", label: "C", text: "festival" },
        { id: "opt_D", label: "D", text: "lantern" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. agreement",
      correctExplanation: "'a-GREE-ment' /əˈɡriːmənt/ có trọng âm rơi vào nguyên âm dài /iː/ ở âm tiết thứ 2. Các từ còn lại có trọng âm ở âm tiết 1: 'CE-le-brate', 'FES-ti-val', 'LAN-tern'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. celebrate",
        diagnosticTitle: "Nhầm lẫn trọng âm của động từ 3 âm tiết",
        explanation: "'celebrate' có trọng âm rơi vào âm tiết đầu tiên /ˈselɪbreɪt/, không phải âm tiết thứ hai."
      }
    },
  ]
};
