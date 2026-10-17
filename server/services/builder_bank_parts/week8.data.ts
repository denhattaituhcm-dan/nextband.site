/**
 * BUILDER ARENA QUESTION BANK - WEEK 8
 * Source: Giáo trình BUILDER 2027 - Đã soát lỗi.docx & Giáo án Builder 2027
 * Target: Band 5.0 IELTS
 * Day 1: Writing (Task 1 Overview & Key Features)
 * Day 2: Reading (Tea & Industrial Revolution / European Transport)
 * Day 3: Speaking (Environment / Connected Speech & Intonation)
 */

export const BUILDER_WEEK_8_QUESTIONS: Record<string, any[]> = {
  // ==========================================
  // WEEK 8 - DAY 1 - WRITING: TASK 1 OVERVIEW & KEY FEATURES
  // ==========================================
  "WEEK 8 – DAY 1": [
    {
      id: "builder_w8d1_q01",
      roundIndex: 0,
      prompt: "Trong thang điểm chấm thi IELTS Writing Task 1 (Band Descriptors), điều kiện TIÊN QUYẾT để đạt điểm Task Achievement từ Band 6.0 trở lên là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Bắt buộc phải có một đoạn Overview nêu bật các xu hướng chính và đặc điểm then chốt" },
        { id: "opt_B", label: "B", text: "Phải liệt kê toàn bộ mọi số liệu chi tiết xuất hiện trong đề bài vào từng câu" },
        { id: "opt_C", label: "C", text: "Đưa ra bình luận giải thích nguyên nhân xã hội tại sao số liệu lại tăng giảm" },
        { id: "opt_D", label: "D", text: "Viết bài dài tối thiểu trên 300 từ và sử dụng nhiều từ ngữ văn học tượng hình" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Bắt buộc phải có một đoạn Overview nêu bật các xu hướng chính và đặc điểm then chốt",
      correctExplanation: "Tiêu chí chấm thi chính thức: Nếu thiếu đoạn Overview (tổng quan khái quát xu hướng chính), điểm Task Achievement tối đa chỉ đạt mức Band 5.0 dù các phần khác viết tốt đến đâu.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phải liệt kê toàn bộ mọi số liệu chi tiết xuất hiện trong đề bài vào từng câu",
        diagnosticTitle: "Lỗi chép số liệu dàn trải như bảng thống kê cơ học",
        explanation: "Task 1 kiểm tra kỹ năng tổng hợp và chọn lọc (select key features). Chép mọi con số là lỗi cơ bản bị trừ nặng điểm Task Achievement."
      }
    },
    {
      id: "builder_w8d1_q02",
      roundIndex: 1,
      prompt: "Hai nhóm biểu đồ cơ bản trong Writing Task 1 được phân loại dựa trên tiêu chí nào?",
      options: [
        { id: "opt_A", label: "A", text: "Biểu đồ có thay đổi theo thời gian Dynamic và Biểu đồ so sánh tại một mốc thời gian Static" },
        { id: "opt_B", label: "B", text: "Biểu đồ in màu sặc sỡ và Biểu đồ in đen trắng trên giấy thi" },
        { id: "opt_C", label: "C", text: "Biểu đồ hình tròn chỉ đồ ăn và Biểu đồ đường thẳng chỉ dân số" },
        { id: "opt_D", label: "D", text: "Biểu đồ do giám khảo tự vẽ và Biểu đồ trích xuất từ báo chí" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Biểu đồ có thay đổi theo thời gian Dynamic và Biểu đồ so sánh tại một mốc thời gian Static",
      correctExplanation: "Phân loại chuẩn: Dynamic chart (có yếu tố thời gian, trọng tâm là mô tả xu hướng tăng/giảm/dao động) và Static chart (không có thời gian, trọng tâm là so sánh thứ hạng lớn/nhất/chênh lệch).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Biểu đồ hình tròn chỉ đồ ăn và Biểu đồ đường thẳng chỉ dân số",
        diagnosticTitle: "Phân loại theo hình dáng vẽ thay vì bản chất dữ liệu",
        explanation: "Hình dạng (line, bar, pie, table) chỉ là cách trình bày; bản chất ngôn ngữ bài viết phụ thuộc vào việc có yếu tố thời gian (trend) hay không (comparison)."
      }
    },
    {
      id: "builder_w8d1_q03",
      roundIndex: 2,
      prompt: "Đặc điểm nào dưới đây được xem là một 'Key Feature' (đặc điểm nổi bật) quan trọng cần đưa vào đoạn Overview?",
      options: [
        { id: "opt_A", label: "A", text: "Đối tượng có mức tăng trưởng mạnh nhất hoặc luôn giữ vị trí dẫn đầu toàn giai đoạn" },
        { id: "opt_B", label: "B", text: "Số liệu chi tiết của từng tháng lẻ tẻ trong các năm ở giữa chu kỳ" },
        { id: "opt_C", label: "C", text: "Màu sắc của từng đường nét và độ dày của cột trong biểu đồ" },
        { id: "opt_D", label: "D", text: "Tên phần mềm tin học mà giám khảo dùng để vẽ nên biểu đồ đó" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đối tượng có mức tăng trưởng mạnh nhất hoặc luôn giữ vị trí dẫn đầu toàn giai đoạn",
      correctExplanation: "Key feature là các điểm mấu chốt: đối tượng cao nhất/thấp nhất, thay đổi mạnh nhất, xu hướng chung của các đường, hoặc sự hoán đổi thứ hạng vượt mặt giữa các đối tượng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Số liệu chi tiết của từng tháng lẻ tẻ trong các năm ở giữa chu kỳ",
        diagnosticTitle: "Đưa dữ liệu vi mô vào đoạn tổng quan",
        explanation: "Đoạn Overview tuyệt đối không đưa các số liệu chi tiết hay các tháng lẻ tẻ; Overview chỉ dành cho cái nhìn toàn cảnh vĩ mô."
      }
    },
    {
      id: "builder_w8d1_q04",
      roundIndex: 3,
      prompt: "Quy tắc vàng khi viết đoạn Overview trong Writing Task 1 đối với SỐ LIỆU CỤ THỂ (data numbers) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Không nên đưa số liệu cụ thể chi tiết vào trong đoạn Overview" },
        { id: "opt_B", label: "B", text: "Bắt buộc phải trích dẫn ít nhất năm số liệu kèm đơn vị phần trăm" },
        { id: "opt_C", label: "C", text: "Chỉ ghi các con số lớn hơn một triệu và bỏ qua các con số nhỏ" },
        { id: "opt_D", label: "D", text: "Cộng tổng tất cả các con số trên biểu đồ lại thành một con số duy nhất" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Không nên đưa số liệu cụ thể chi tiết vào trong đoạn Overview",
      correctExplanation: "Overview là khái quát xu hướng chính (general overview). Việc đưa số liệu cụ thể (ví dụ: 'rose by 35% to 500 tons') nên để dành cho hai đoạn thân bài (Body paragraphs).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bắt buộc phải trích dẫn ít nhất năm số liệu kèm đơn vị phần trăm",
        diagnosticTitle: "Hiểu sai chức năng của Overview thành đoạn thân bài",
        explanation: "Thí sinh nhồi nhét con số vào Overview sẽ làm mất tính khái quát của đoạn, vi phạm cấu trúc chuẩn mực của một bài báo cáo khoa học."
      }
    },
    {
      id: "builder_w8d1_q05",
      roundIndex: 4,
      prompt: "Trong biểu đồ tiêu thụ đồ ăn nhanh: Hamburger và Pizza cùng tăng mạnh, trong khi Fish & Chips giảm. Câu mô tả điểm ngoại lệ nào chuẩn xác nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Fish and chips was the only fast food category to experience a downward trend." },
        { id: "opt_B", label: "B", text: "Fish and chips was the only fast food category to having a downward trend." },
        { id: "opt_C", label: "C", text: "Fish and chips were the single fast food category that decreasing over time." },
        { id: "opt_D", label: "D", text: "Fish and chips became the unique fast food category for dropping downwards." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Fish and chips was the only fast food category to experience a downward trend.",
      correctExplanation: "Cấu trúc chuẩn học thuật: 'the only [noun] to experience / witness a downward trend' (nhóm duy nhất trải qua xu hướng giảm sút).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Fish and chips was the only fast food category to having a downward trend.",
        diagnosticTitle: "Lỗi dùng 'to + V-ing' sau cấu trúc 'the only'",
        explanation: "Sau 'the only / the first / the second', động từ rút gọn phải ở dạng to-infinitive ('to experience'), không dùng 'to having'."
      }
    },
    {
      id: "builder_w8d1_q06",
      roundIndex: 5,
      prompt: "Động từ nào dưới đây diễn đạt chính xác việc một đối tượng từ vị trí thấp hơn đã vượt mặt đối tượng khác về thứ hạng số liệu?",
      options: [
        { id: "opt_A", label: "A", text: "overtook" },
        { id: "opt_B", label: "B", text: "underwent" },
        { id: "opt_C", label: "C", text: "encountered" },
        { id: "opt_D", label: "D", text: "remained" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. overtook",
      correctExplanation: "'overtake' (quá khứ: 'overtook') mang nghĩa vượt qua, chiếm lấy vị trí cao hơn của đối tượng khác trên biểu đồ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. underwent",
        diagnosticTitle: "Nhầm lẫn với động từ trải qua thay đổi",
        explanation: "'underwent' nghĩa là trải qua (ví dụ underwent a major transformation), không có nghĩa là vượt mặt đối tượng khác."
      }
    },
    {
      id: "builder_w8d1_q07",
      roundIndex: 6,
      prompt: "Cụm trạng từ mở đầu nào thường được dùng một cách trang trọng nhất để dẫn dắt vào đoạn Overview của Task 1?",
      options: [
        { id: "opt_A", label: "A", text: "Overall, it is clear that" },
        { id: "opt_B", label: "B", text: "In my personal opinion, I think that" },
        { id: "opt_C", label: "C", text: "From my private perspective, it seems that" },
        { id: "opt_D", label: "D", text: "To finish my writing test today, I say that" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Overall, it is clear that",
      correctExplanation: "'Overall, it is clear that / Overall, it is noticeable that' là cụm từ tín hiệu tiêu chuẩn quốc tế giúp giám khảo nhận diện ngay lập tức đoạn Overview.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. In my personal opinion, I think that",
        diagnosticTitle: "Đưa quan điểm cá nhân vào báo cáo Task 1",
        explanation: "Task 1 là báo cáo số liệu khách quan, tuyệt đối KHÔNG được đưa quan điểm cá nhân (personal opinion) như 'In my opinion'."
      }
    },
    {
      id: "builder_w8d1_q08",
      roundIndex: 7,
      prompt: "Một đoạn Overview chuẩn trong bài Writing Task 1 thường có độ dài bao nhiêu câu là tối ưu nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Khoảng 1 đến 2 câu súc tích tóm lược 2 đến 3 đặc điểm nổi bật nhất" },
        { id: "opt_B", label: "B", text: "Ít nhất 6 đến 8 câu dài miêu tả toàn bộ từng năm của quá trình" },
        { id: "opt_C", label: "C", text: "Chỉ đúng 1 từ duy nhất chỉ xu hướng chung như 'Up' hoặc 'Down'" },
        { id: "opt_D", label: "D", text: "Không cần viết câu nào vì chỉ cần lập bảng biểu tóm tắt lại" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khoảng 1 đến 2 câu súc tích tóm lược 2 đến 3 đặc điểm nổi bật nhất",
      correctExplanation: "Overview chuẩn thường gồm 2 câu (hoặc 1 câu phức ghép 2 vế): Câu 1 nêu xu hướng chung (general trend: tăng/giảm), Câu 2 nêu đối tượng dẫn đầu hoặc điểm bất thường/đột biến.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Ít nhất 6 đến 8 câu dài miêu tả toàn bộ từng năm của quá trình",
        diagnosticTitle: "Viết đoạn Overview thành một bài luận nhỏ quá tải",
        explanation: "Overview dài 6-8 câu sẽ làm loãng thông tin và biến thành đoạn thân bài, khiến thí sinh không còn thời gian viết hai đoạn body."
      }
    },
    {
      id: "builder_w8d1_q09",
      roundIndex: 8,
      prompt: "Khi tất cả các hạng mục trên biểu đồ đều tăng, chỉ có một hạng mục giảm thì cách diễn đạt Key feature nào là sắc bén nhất?",
      options: [
        { id: "opt_A", label: "A", text: "While most categories witnessed an upward trend, Category X was the sole exception." },
        { id: "opt_B", label: "B", text: "All categories increased very much but Category X also decreased very much too." },
        { id: "opt_C", label: "C", text: "Every number goes to the sky except Category X which falls down to the ground." },
        { id: "opt_D", label: "D", text: "Although the chart is going up, Category X is completely destroyed." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. While most categories witnessed an upward trend, Category X was the sole exception.",
      correctExplanation: "Câu A dùng liên từ tương phản 'While', collocation 'witnessed an upward trend', và từ vựng band cao 'the sole exception' (ngoại lệ duy nhất).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Every number goes to the sky except Category X which falls down to the ground.",
        diagnosticTitle: "Dùng từ ngữ hình ảnh văn học không phù hợp báo cáo số liệu",
        explanation: "'goes to the sky' và 'falls to the ground' là lối nói ví von hoa mỹ, hoàn toàn cấm kỵ trong văn phong báo cáo dữ liệu khoa học của Task 1."
      }
    },
    {
      id: "builder_w8d1_q10",
      roundIndex: 9,
      prompt: "Vị trí nào trong bài báo cáo Task 1 là nơi ĐƯỢC KHUYẾN NGHỊ đặt đoạn Overview để tạo bố cục bài viết khoa học nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Đặt ngay sau đoạn Mở bài Introduction và đứng trước các đoạn Thân bài" },
        { id: "opt_B", label: "B", text: "Chèn vào giữa câu văn của đoạn thân bài thứ nhất khi đang phân tích số liệu" },
        { id: "opt_C", label: "C", text: "Viết ra mặt sau của tờ giấy thi để làm phần chú thích ngoài lề" },
        { id: "opt_D", label: "D", text: "Không cố định và có thể chia nhỏ rải rác từng từ vào cuối mỗi đoạn" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đặt ngay sau đoạn Mở bài Introduction và đứng trước các đoạn Thân bài",
      correctExplanation: "Cấu trúc tối ưu: Intro -> Overview -> Body 1 -> Body 2. Đặt Overview ngay sau Intro giúp giám khảo thấy ngay góc nhìn khái quát trước khi đọc vào số liệu chi tiết.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chèn vào giữa câu văn của đoạn thân bài thứ nhất khi đang phân tích số liệu",
        diagnosticTitle: "Làm gãy mạch cấu trúc bài viết",
        explanation: "Chèn tổng quan vào giữa thân bài làm người đọc bối rối, làm giảm điểm ở tiêu chí Coherence and Cohesion."
      }
    },
  ],

  // ==========================================
  // WEEK 8 - DAY 2 - READING: TEA & INDUSTRIAL REVOLUTION
  // ==========================================
  "WEEK 8 – DAY 2": [
    {
      id: "builder_w8d2_q01",
      roundIndex: 0,
      prompt: "Theo nghiên cứu của Giáo sư Alan Macfarlane, yếu tố cốt lõi dẫn đến sự bùng nổ dân số tại Anh sau năm 1740 là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tỷ lệ tử vong, đặc biệt là ở trẻ sơ sinh, đã giảm mạnh một cách đáng kể" },
        { id: "opt_B", label: "B", text: "Tỷ lệ sinh con tăng vọt do người dân kết hôn ở độ tuổi trẻ hơn trước" },
        { id: "opt_C", label: "C", text: "Hàng triệu người lao động nhập cư từ châu Mỹ tràn sang làm việc tại các mỏ than" },
        { id: "opt_D", label: "D", text: "Các tiến bộ vượt bậc về vaccine và thuốc kháng sinh đã xuất hiện sớm" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tỷ lệ tử vong, đặc biệt là ở trẻ sơ sinh, đã giảm mạnh một cách đáng kể",
      correctExplanation: "Bài đọc chỉ ra nguyên nhân dân số bùng nổ không phải do sinh nhiều hơn mà do tỷ lệ tử vong ở trẻ em sụt giảm mạnh: 'there was a dramatic drop in the death rate, especially in infant mortality'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tỷ lệ sinh con tăng vọt do người dân kết hôn ở độ tuổi trẻ hơn trước",
        diagnosticTitle: "Chọn giả thuyết truyền thống đã bị bài đọc phản bác",
        explanation: "Bài đọc nêu rõ trước đây các nhà sử học từng nghĩ do tỷ lệ sinh tăng, nhưng dữ liệu nhân khẩu học chứng minh nguyên nhân thực tế là do tỷ lệ tử vong giảm."
      }
    },
    {
      id: "builder_w8d2_q02",
      roundIndex: 1,
      prompt: "Trà và bia đã bảo vệ người dân Anh khỏi các dịch bệnh đường ruột nguy hiểm (như bệnh kiết lỵ) nhờ vào đặc tính nào?",
      options: [
        { id: "opt_A", label: "A", text: "Cả hai đồ uống đều yêu cầu đun sôi nước và đều chứa các chất có đặc tính khử trùng" },
        { id: "opt_B", label: "B", text: "Chất cồn trong bia và chất cafein trong trà tiêu diệt hoàn toàn tế bào ung thư" },
        { id: "opt_C", label: "C", text: "Người dân uống trà thay thế hoàn toàn nhu cầu ăn các loại thực phẩm tươi sống" },
        { id: "opt_D", label: "D", text: "Hương thơm của búp trà có tác dụng đuổi sạch các loài chuột và muỗi lây bệnh" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Cả hai đồ uống đều yêu cầu đun sôi nước và đều chứa các chất có đặc tính khử trùng",
      correctExplanation: "Bài đọc: 'Both tea and beer helped to prevent dysentery... Both involved boiling water, and both contained antiseptic properties (hops in beer and tannins in tea)'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chất cồn trong bia và chất cafein trong trà tiêu diệt hoàn toàn tế bào ung thư",
        diagnosticTitle: "Thêu dệt công dụng chữa bệnh hiện đại",
        explanation: "Bài đọc nói về bệnh kiết lỵ (dysentery) và vi khuẩn đường ruột trong nguồn nước thời Cách mạng công nghiệp, không liên quan đến ung thư."
      }
    },
    {
      id: "builder_w8d2_q03",
      roundIndex: 2,
      prompt: "Sắc thuế đánh vào mạch nha (malt tax) vào đầu thế kỷ 18 đã gián tiếp gây ra hệ quả xã hội nào tại Anh?",
      options: [
        { id: "opt_A", label: "A", text: "Làm giá bia tăng cao, khiến người lao động nghèo chuyển sang uống nước lã và tỷ lệ tử vong tăng" },
        { id: "opt_B", label: "B", text: "Buộc các nhà máy bia phải nhập khẩu toàn bộ lúa mạch từ các thuộc địa châu Á" },
        { id: "opt_C", label: "C", text: "Khiến người dân chuyển sang uống sữa tươi thay vì tất cả các đồ uống khác" },
        { id: "opt_D", label: "D", text: "Khiến chính phủ Anh phải bãi bỏ mọi loại thuế thương mại trong nước" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Làm giá bia tăng cao, khiến người lao động nghèo chuyển sang uống nước lã và tỷ lệ tử vong tăng",
      correctExplanation: "Bài đọc: 'The tax on malt made beer more expensive... Poor people turned to unboiled water, and as a result the mortality rate rose until tea became affordable.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Khiến người dân chuyển sang uống sữa tươi thay vì tất cả các đồ uống khác",
        diagnosticTitle: "Đoán mò chi tiết sữa trong trà",
        explanation: "Người nghèo không đủ tiền mua sữa tươi nguyên chất; họ uống nước lã chưa đun sôi nên bị nhiễm khuẩn đường ruột dẫn đến tỷ lệ tử vong gia tăng."
      }
    },
    {
      id: "builder_w8d2_q04",
      roundIndex: 3,
      prompt: "Tại sao Trung Quốc dù có văn hóa uống trà từ rất sớm nhưng lại không diễn ra Cách mạng Công nghiệp trước nước Anh?",
      options: [
        { id: "opt_A", label: "A", text: "Hệ thống giao thông vận tải của Trung Quốc vào thế kỷ 18 chưa thuận lợi cho tập trung công nghiệp" },
        { id: "opt_B", label: "B", text: "Trà Trung Quốc thời đó không hề được pha bằng nước đun sôi như ở Anh" },
        { id: "opt_C", label: "C", text: "Người dân Trung Quốc chỉ uống trà vào ban đêm trước khi đi ngủ" },
        { id: "opt_D", label: "D", text: "Đất nước Trung Quốc khi đó hoàn toàn không hề có bất kỳ mỏ than đá nào" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Hệ thống giao thông vận tải của Trung Quốc vào thế kỷ 18 chưa thuận lợi cho tập trung công nghiệp",
      correctExplanation: "Bài đọc nêu rõ: Macfarlane so sánh với các quốc gia khác và nhận thấy hệ thống giao thông và khoảng cách địa lý của Trung Quốc vào thế kỷ 18 không phù hợp để hình thành các cụm công nghiệp quy mô lớn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Trà Trung Quốc thời đó không hề được pha bằng nước đun sôi như ở Anh",
        diagnosticTitle: "Sai kiến thức căn bản về trà đạo phương Đông",
        explanation: "Pha trà luôn luôn dùng nước đun sôi. Sự khác biệt nằm ở các điều kiện kinh tế, mạng lưới giao thông và mật độ đô thị hóa."
      }
    },
    {
      id: "builder_w8d2_q05",
      roundIndex: 4,
      prompt: "Trong bài đọc về Hệ thống giao thông châu Âu (European transport systems 1990-2010), xu hướng dịch chuyển nổi bật nhất là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Vận tải đường bộ tăng trưởng mạnh trong khi vận tải đường sắt sụt giảm nghiêm trọng" },
        { id: "opt_B", label: "B", text: "Vận tải đường sắt thay thế hoàn toàn xe tải trên mọi tuyến cao tốc liên bang" },
        { id: "opt_C", label: "C", text: "Vận tải hàng không nội địa chiếm trọn chín mươi phần trăm lượng hàng hóa lưu thông" },
        { id: "opt_D", label: "D", text: "Các nước thành viên EU quyết định cấm tất cả các phương tiện vận tải cơ giới đường bộ" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Vận tải đường bộ tăng trưởng mạnh trong khi vận tải đường sắt sụt giảm nghiêm trọng",
      correctExplanation: "Đoạn văn C: 'the distribution between modes has tipped sharply in favour of road transport... road haulage increased by 19.4%, while during the same period rail haulage decreased by 43.5%'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Vận tải đường sắt thay thế hoàn toàn xe tải trên mọi tuyến cao tốc liên bang",
        diagnosticTitle: "Hiểu ngược hoàn toàn số liệu tăng giảm",
        explanation: "Thực tế là đường bộ (road haulage) tăng 19.4% và lấn át đường sắt (rail haulage vốn giảm tới 43.5%)."
      }
    },
    {
      id: "builder_w8d2_q06",
      roundIndex: 5,
      prompt: "Từ 'antiseptic' trong bài đọc: \"tea and beer contained antiseptic properties\" mang ý nghĩa gì?",
      options: [
        { id: "opt_A", label: "A", text: "Kháng khuẩn, khử trùng và ngăn ngừa vi khuẩn gây bệnh phát triển" },
        { id: "opt_B", label: "B", text: "Gây nghiện và kích thích tinh thần hưng phấn quá mức" },
        { id: "opt_C", label: "C", text: "Làm tăng độ ngọt tự nhiên của các loại đồ uống lên nhiều lần" },
        { id: "opt_D", label: "D", text: "Làm đổi màu nước từ trong suốt sang màu nâu cánh gián" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Kháng khuẩn, khử trùng và ngăn ngừa vi khuẩn gây bệnh phát triển",
      correctExplanation: "'antiseptic' (chất khử trùng/kháng khuẩn), nhờ hoa bia (hops) trong bia và tanin trong trà giúp tiêu diệt mầm bệnh trong nước sinh hoạt.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Gây nghiện và kích thích tinh thần hưng phấn quá mức",
        diagnosticTitle: "Nhầm lẫn với chất kích thích (stimulant)",
        explanation: "'antiseptic' là thuật ngữ y tế chỉ tính kháng khuẩn, không liên quan đến chất kích thích thần kinh."
      }
    },
    {
      id: "builder_w8d2_q07",
      roundIndex: 6,
      prompt: "Đánh giá nhận định: \"Roy Porter disagrees with Professor Macfarlane's findings.\"",
      options: [
        { id: "opt_A", label: "A", text: "FALSE" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" },
        { id: "opt_D", label: "D", text: "INCOMPLETE" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. FALSE",
      correctExplanation: "Trong bài đọc [C10T2], sử gia y tế Roy Porter được trích dẫn là người đồng tình và đánh giá cao phát hiện của Macfarlane ('Porter noted that Macfarlane's case was strong'), do đó nhận định 'disagrees' là FALSE.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. TRUE",
        diagnosticTitle: "Không đối chiếu thái độ của nhân vật trong bài đọc",
        explanation: "Porter ca ngợi nghiên cứu của Macfarlane là thuyết phục, hoàn toàn không phản đối."
      }
    },
    {
      id: "builder_w8d2_q08",
      roundIndex: 7,
      prompt: "Từ 'haulage' trong cụm 'road haulage' và 'rail haulage' nghĩa là gì trong lĩnh vực vận tải?",
      options: [
        { id: "opt_A", label: "A", text: "Hoạt động chuyên chở và vận chuyển hàng hóa thương mại quy mô lớn" },
        { id: "opt_B", label: "B", text: "Chuyến bay du lịch chở khách gia đình vào kỳ nghỉ lễ" },
        { id: "opt_C", label: "C", text: "Hệ thống vé tháng dành riêng cho học sinh đi xe buýt" },
        { id: "opt_D", label: "D", text: "Dịch vụ cứu hộ xe ô tô bị hỏng giữa đường cao tốc" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Hoạt động chuyên chở và vận chuyển hàng hóa thương mại quy mô lớn",
      correctExplanation: "'haulage' là thuật ngữ chuyên ngành chỉ ngành vận tải hàng hóa đường bộ (road haulage: vận tải bằng xe tải nặng) hoặc đường sắt (rail haulage).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chuyến bay du lịch chở khách gia đình vào kỳ nghỉ lễ",
        diagnosticTitle: "Nhầm lẫn giữa vận tải hàng hóa và vận chuyển hành khách du lịch",
        explanation: "'haulage' chuyên dùng cho chuyên chở hàng hóa (freight/goods), không dùng cho du lịch chở người."
      }
    },
    {
      id: "builder_w8d2_q09",
      roundIndex: 8,
      prompt: "Trong phần Listening: Volunteers, hai hoạt động tình nguyện viên thường tham gia giúp đỡ cộng đồng là:",
      options: [
        { id: "opt_A", label: "A", text: "Sơn sửa trang trí nhà cửa decorating và dọn dẹp vệ sinh cleaning" },
        { id: "opt_B", label: "B", text: "Lái máy bay trực thăng và tham gia đua xe địa hình" },
        { id: "opt_C", label: "C", text: "Quản lý sàn giao dịch chứng khoán của thành phố" },
        { id: "opt_D", label: "D", text: "Thẩm định tranh cổ và đấu giá đồ gốm sứ lịch sử" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Sơn sửa trang trí nhà cửa decorating và dọn dẹp vệ sinh cleaning",
      correctExplanation: "Bài nghe về Volunteers đề cập các công việc tình nguyện thực tế giúp người khó khăn gồm: 'decorating' và 'cleaning' các cơ sở cộng đồng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Quản lý sàn giao dịch chứng khoán của thành phố",
        diagnosticTitle: "Chọn công việc tài chính chuyên nghiệp",
        explanation: "Tình nguyện viên cộng đồng làm các việc thiện nguyện xã hội, không làm công việc tài chính chứng khoán."
      }
    },
    {
      id: "builder_w8d2_q10",
      roundIndex: 9,
      prompt: "Hai lợi ích tinh thần lớn nhất mà các tình nguyện viên nhận được sau các dự án công ích là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Học cách phối hợp làm việc nhóm và tìm thấy ý nghĩa mục đích sống" },
        { id: "opt_B", label: "B", text: "Nhận được các khoản tiền thưởng kếch xù từ chính phủ" },
        { id: "opt_C", label: "C", text: "Được miễn thi toàn bộ các kỳ thi đại học quốc gia" },
        { id: "opt_D", label: "D", text: "Được quyền sử dụng miễn phí các khách sạn năm sao" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Học cách phối hợp làm việc nhóm và tìm thấy ý nghĩa mục đích sống",
      correctExplanation: "Theo bài nghe: 'learning how to be part of a team' (kỹ năng làm việc nhóm) và 'having a sense of purpose' (cảm giác có mục đích sống cao đẹp).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nhận được các khoản tiền thưởng kếch xù từ chính phủ",
        diagnosticTitle: "Nhầm lẫn bản chất thiện nguyện với công việc trả lương cao",
        explanation: "Công việc tình nguyện (volunteering) là phi lợi nhuận, phần thưởng lớn nhất là giá trị tinh thần và kỹ năng xã hội."
      }
    },
  ],

  // ==========================================
  // WEEK 8 - DAY 3 - SPEAKING: ENVIRONMENT & CONNECTED SPEECH
  // ==========================================
  "WEEK 8 – DAY 3": [
    {
      id: "builder_w8d3_q01",
      roundIndex: 0,
      prompt: "Trong nối âm (Connected Speech), khi một từ kết thúc bằng phụ âm và từ kế tiếp bắt đầu bằng nguyên âm, hiện tượng gì sẽ xảy ra?",
      options: [
        { id: "opt_A", label: "A", text: "Phụ âm cuối sẽ nối liền mượt mà sang nguyên âm đầu của từ tiếp theo" },
        { id: "opt_B", label: "B", text: "Người nói phải dừng lại một giây giữa hai từ để ngắt nhịp thở" },
        { id: "opt_C", label: "C", text: "Nguyên âm của từ thứ hai sẽ bị triệt tiêu hoàn toàn không phát âm" },
        { id: "opt_D", label: "D", text: "Phụ âm của từ thứ nhất phải được nhân đôi lên gấp hai lần" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Phụ âm cuối sẽ nối liền mượt mà sang nguyên âm đầu của từ tiếp theo",
      correctExplanation: "Quy tắc C-to-V linking kinh điển: Phụ âm cuối nối trực tiếp với nguyên âm đứng sau, ví dụ: 'Look it up' đọc liền thành /lʊ-kɪ-tʌp/.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Người nói phải dừng lại một giây giữa hai từ để ngắt nhịp thở",
        diagnosticTitle: "Lỗi phát âm giật cục từng từ của học sinh Việt",
        explanation: "Người bản xứ không ngắt quãng giữa các từ có liên kết âm; việc dừng lại giật cục là thói quen xấu làm tụt điểm Pronunciation và Fluency."
      }
    },
    {
      id: "builder_w8d3_q02",
      roundIndex: 1,
      prompt: "Cụm từ \"swim across\" khi được phát âm tự nhiên trong câu sẽ được nối âm như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "Phụ âm /m/ nối liền với nguyên âm /ə/ tạo thành /swɪ-mə-krɒs/" },
        { id: "opt_B", label: "B", text: "Nguyên âm /ɪ/ của từ swim bị nuốt hoàn toàn chỉ còn phát âm /sm/" },
        { id: "opt_C", label: "C", text: "Từ across bị bỏ mất âm đầu tiên chỉ còn đọc là /krɒs/" },
        { id: "opt_D", label: "D", text: "Hai từ này không thể nối âm vì thuộc về hai loại từ khác nhau" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Phụ âm /m/ nối liền với nguyên âm /ə/ tạo thành /swɪ-mə-krɒs/",
      correctExplanation: "Phụ âm tận cùng /m/ của 'swim' nối liền sang âm /ə/ của 'across' một cách mượt mà không có khoảng ngắt.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Từ across bị bỏ mất âm đầu tiên chỉ còn đọc là /krɒs/",
        diagnosticTitle: "Nhầm lẫn nối âm với việc nuốt mất âm tiết",
        explanation: "Nối âm (linking) không làm mất âm tiết mà chỉ dời điểm bắt đầu của phụ âm sang âm tiết tiếp theo."
      }
    },
    {
      id: "builder_w8d3_q03",
      roundIndex: 2,
      prompt: "Trong câu nói tự nhiên, dạng yếu (weak form) của giới từ 'to' thường được phát âm như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "Được phát âm lướt nhẹ với âm schwa /tə/" },
        { id: "opt_B", label: "B", text: "Được kéo dài giọng rất to thành âm /tuː/" },
        { id: "opt_C", label: "C", text: "Luôn được đọc to và nhấn mạnh hơn tất cả các danh từ trong câu" },
        { id: "opt_D", label: "D", text: "Được biến đổi hoàn toàn thành âm mũi xát /nə/" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Được phát âm lướt nhẹ với âm schwa /tə/",
      correctExplanation: "Trong ngữ lưu tự nhiên, các từ chức năng (function words) như 'to' ở dạng weak form được phát âm nhẹ thành /tə/ (ví dụ: 'I want to go' -> /ˈwɒn.tə ɡəʊ/).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Được kéo dài giọng rất to thành âm /tuː/",
        diagnosticTitle: "Chỉ biết dạng phát âm mạnh (strong form)",
        explanation: "/tuː/ chỉ xuất hiện khi đứng cuối câu hoặc khi được cố ý nhấn mạnh. Trong câu bình thường luôn đọc ở dạng weak form /tə/."
      }
    },
    {
      id: "builder_w8d3_q04",
      roundIndex: 3,
      prompt: "Khi nói câu: \"I can't believe it\", ngữ điệu (intonation) đi xuống ở cuối câu thể hiện trạng thái cảm xúc nào?",
      options: [
        { id: "opt_A", label: "A", text: "Nỗi buồn bã, sự thất vọng hoặc cảm giác bế tắc" },
        { id: "opt_B", label: "B", text: "Niềm vui sướng tột cùng và sự phấn khích bất ngờ" },
        { id: "opt_C", label: "C", text: "Sự háo hức chờ đợi một món quà sinh nhật" },
        { id: "opt_D", label: "D", text: "Một lời mời đi ăn tối cùng bạn bè thân thiết" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nỗi buồn bã, sự thất vọng hoặc cảm giác bế tắc",
      correctExplanation: "Giọng trầm, ngữ điệu đi xuống ở âm cuối thể hiện sự thất vọng, đau buồn hoặc không thể chấp nhận một sự thật cay đắng ('Tôi thật sự không thể tin nổi...').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Niềm vui sướng tột cùng và sự phấn khích bất ngờ",
        diagnosticTitle: "Nhầm lẫn với ngữ điệu đi lên cao (rising intonation)",
        explanation: "Niềm vui mừng ngạc nhiên đòi hỏi giọng đi lên cao và sáng (rising pitch), không phải đi trầm xuống."
      }
    },
    {
      id: "builder_w8d3_q05",
      roundIndex: 4,
      prompt: "Cụm collocation nào chỉ các nguồn năng lượng sạch có thể tái tạo thay thế cho nhiên liệu hóa thạch?",
      options: [
        { id: "opt_A", label: "A", text: "renewable energy sources" },
        { id: "opt_B", label: "B", text: "exhaustible oil resources" },
        { id: "opt_C", label: "C", text: "fossil combustible elements" },
        { id: "opt_D", label: "D", text: "artificial fuel compounds" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. renewable energy sources",
      correctExplanation: "'renewable energy sources' (các nguồn năng lượng tái tạo: năng lượng mặt trời, gió, thủy triều) là cụm từ cốt lõi của chủ đề môi trường.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. exhaustible oil resources",
        diagnosticTitle: "Chọn cụm từ chỉ tài nguyên có thể cạn kiệt",
        explanation: "'exhaustible' nghĩa là có thể cạn kiệt (dùng cho dầu mỏ than đá), trái ngược với 'renewable' (có thể tái tạo)."
      }
    },
    {
      id: "builder_w8d3_q06",
      roundIndex: 5,
      prompt: "Collocation nào diễn đạt việc cắt giảm lượng khí thải các-bon xả ra bầu khí quyển?",
      options: [
        { id: "opt_A", label: "A", text: "curb carbon emissions" },
        { id: "opt_B", label: "B", text: "multiply smoke discharge" },
        { id: "opt_C", label: "C", text: "accelerate gas release" },
        { id: "opt_D", label: "D", text: "expand carbon footprints" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. curb carbon emissions",
      correctExplanation: "'curb carbon emissions' (kiểm soát/cắt giảm khí thải các-bon) là collocation band 7+ rất được giám khảo Speaking và Writing ưa chuộng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. expand carbon footprints",
        diagnosticTitle: "Chọn cụm từ làm tăng lượng phát thải",
        explanation: "'expand carbon footprints' nghĩa là mở rộng dấu chân các-bon (làm ô nhiễm nhiều hơn), hoàn toàn đối lập với mục tiêu bảo vệ môi trường."
      }
    },
    {
      id: "builder_w8d3_q07",
      roundIndex: 6,
      prompt: "Trong câu: \"We NEED to reduce PLASTIC waste, OTHERWISE the oceans will SUFFER\", các từ viết hoa được nhấn mạnh nhằm tạo hiệu quả gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tạo sự tương phản rõ rệt và nhấn mạnh tính cấp bách của hành động bảo vệ đại dương" },
        { id: "opt_B", label: "B", text: "Báo hiệu rằng người nói sắp kết thúc phần thi Speaking trước thời hạn" },
        { id: "opt_C", label: "C", text: "Đánh lừa người nghe rằng rác thải nhựa hoàn toàn vô hại đối với sinh vật biển" },
        { id: "opt_D", label: "D", text: "Thể hiện rằng người nói đang cảm thấy tức giận đối với giám khảo chấm thi" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tạo sự tương phản rõ rệt và nhấn mạnh tính cấp bách của hành động bảo vệ đại dương",
      correctExplanation: "Nhấn mạnh từ khóa mang nội dung quan trọng (content words: NEED, PLASTIC, OTHERWISE, SUFFER) tạo nhịp điệu thuyết phục và truyền tải cảm xúc cấp bách.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Thể hiện rằng người nói đang cảm thấy tức giận đối với giám khảo chấm thi",
        diagnosticTitle: "Hiểu sai ngữ điệu thuyết phục thành sự tức giận cá nhân",
        explanation: "Việc nhấn giọng đúng trọng tâm câu là kỹ năng thể hiện sự tâm huyết và khả năng làm chủ ngữ điệu, không phải sự tức giận."
      }
    },
    {
      id: "builder_w8d3_q08",
      roundIndex: 7,
      prompt: "Thuật ngữ tiếng Anh nào chỉ các sản phẩm nhựa dùng một lần rồi vứt bỏ gây hại nghiêm trọng cho môi trường?",
      options: [
        { id: "opt_A", label: "A", text: "single-use plastics" },
        { id: "opt_B", label: "B", text: "long-lasting plastics" },
        { id: "opt_C", label: "C", text: "biodegradable utensils" },
        { id: "opt_D", label: "D", text: "multi-purpose polymers" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. single-use plastics",
      correctExplanation: "'single-use plastics' (đồ nhựa dùng một lần như ống hút, túi nilon, hộp xốp) là thuật ngữ chuẩn xác trong mọi cuộc thảo luận về môi trường.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. biodegradable utensils",
        diagnosticTitle: "Chọn sản phẩm thân thiện có thể tự phân hủy",
        explanation: "'biodegradable' nghĩa là tự phân hủy sinh học (thân thiện với môi trường), trái ngược với nhựa dùng một lần khó phân hủy hàng trăm năm."
      }
    },
    {
      id: "builder_w8d3_q09",
      roundIndex: 8,
      prompt: "Khi được hỏi \"What can individuals do to protect the environment?\", cách mở đầu nào dưới đây thể hiện sự lưu loát tự nhiên nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Well, I believe small daily actions can make a huge difference, such as sorting household waste and opting for public transit." },
        { id: "opt_B", label: "B", text: "People must do many things. First do this and second do that, very easy." },
        { id: "opt_C", label: "C", text: "I do not know because environmental problem belongs only to the government responsibility." },
        { id: "opt_D", label: "D", text: "Recycle. That is my only answer because I do not have anything else to say." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Well, I believe small daily actions can make a huge difference, such as sorting household waste and opting for public transit.",
      correctExplanation: "Câu A dùng discourse marker tự nhiên ('Well, I believe...'), cấu trúc 'make a huge difference', và từ vựng chuẩn 'sorting household waste', 'opting for public transit'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. People must do many things. First do this and second do that, very easy.",
        diagnosticTitle: "Câu trả lời ngây ngô, sơ cấp Band 4.0",
        explanation: "Câu B dùng từ vựng sơ cấp ('do this, do that'), ngữ điệu cộc lốc và thiếu tính liên kết học thuật."
      }
    },
    {
      id: "builder_w8d3_q10",
      roundIndex: 9,
      prompt: "Từ nào dưới đây có trọng âm chính rơi vào ÂM TIẾT THỨ BA?",
      options: [
        { id: "opt_A", label: "A", text: "environmental" },
        { id: "opt_B", label: "B", text: "conserve" },
        { id: "opt_C", label: "C", text: "pollution" },
        { id: "opt_D", label: "D", text: "recycle" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. environmental",
      correctExplanation: "'en-vi-ron-MEN-tal' /ɪnˌvaɪrənˈmentl/ có trọng âm chính rơi vào âm tiết thứ 3 (MEN). 'con-SERVE' (2), 'pol-LU-tion' (2), 're-CY-cle' (2).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. pollution",
        diagnosticTitle: "Nhầm lẫn trọng âm của từ có đuôi '-tion'",
        explanation: "Từ có đuôi '-tion' nhận trọng âm ở âm tiết ngay trước nó: pol-LU-tion là âm tiết thứ 2, không phải âm tiết thứ 3."
      }
    },
  ]
};
