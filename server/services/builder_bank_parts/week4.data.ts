/**
 * BUILDER ARENA QUESTION BANK - WEEK 4
 * Source: Giáo trình BUILDER 2027 - Đã soát lỗi.docx & Giáo án Builder 2027
 * Target: Band 5.0 IELTS
 */

export const BUILDER_WEEK_4_QUESTIONS: Record<string, any[]> = {
  "WEEK 4 – DAY 1": [
    {
        id: "builder_w4d1_q01",
        roundIndex: 0,
        prompt: "Cấu trúc Topic Sentence nào dưới đây sử dụng danh từ (Noun-based) chuẩn xác để mở đầu một đoạn thân bài về lợi ích?",
        options: [
          { id: "opt_A", label: "A", text: "Modern technology offers several major benefits to contemporary society." },
          { id: "opt_B", label: "B", text: "Modern technology is beneficial for many aspects of contemporary life." },
          { id: "opt_C", label: "C", text: "Modern technology brings people to benefit greatly in various ways." },
          { id: "opt_D", label: "D", text: "Modern technology has very good advantages that make life much better." },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Modern technology offers several major benefits to contemporary society.",
        correctExplanation: "Cấu trúc danh từ chuẩn học thuật: S + offer/bring/provide + several benefits/drawbacks to... Câu B dùng tính từ 'is beneficial', còn C và D dùng từ vụng về, thiếu tự nhiên.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Modern technology is beneficial for many aspects of contemporary life.",
          diagnosticTitle: "Nhầm lẫn giữa cấu trúc danh từ và cấu trúc tính từ",
          explanation: "Câu B dùng tính từ 'is beneficial', trong khi câu hỏi yêu cầu cấu trúc dùng danh từ (benefits as a noun)."
        }
      },
      {
        id: "builder_w4d1_q02",
        roundIndex: 1,
        prompt: "Đoạn văn thảo luận về việc nói chuyện ít đi và mệt mỏi vì điện thoại. Chọn Topic Sentence phù hợp nhất:",
        options: [
          { id: "opt_A", label: "A", text: "The overuse of modern technology causes several notable problems." },
          { id: "opt_B", label: "B", text: "Modern technology offers significant benefits to daily communication." },
          { id: "opt_C", label: "C", text: "People nowadays are spending almost all their free time on mobile phones." },
          { id: "opt_D", label: "D", text: "Social media platforms have transformed human interactions completely." },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. The overuse of modern technology causes several notable problems.",
        correctExplanation: "Đoạn văn liệt kê các tác hại của việc lạm dụng điện thoại, do đó Topic Sentence phải bao quát tác hại: 'The overuse of modern technology causes several notable problems.'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_C",
          baitOptionText: "C. People nowadays are spending almost all their free time on mobile phones.",
          diagnosticTitle: "Chọn câu chi tiết thay vì câu chủ đề bao quát",
          explanation: "Câu C chỉ là một chi tiết dẫn chứng (supporting detail), không đủ tính khái quát để làm Topic Sentence định hướng cho cả đoạn."
        }
      },
      {
        id: "builder_w4d1_q03",
        roundIndex: 2,
        prompt: "Liên từ hoặc cụm liên kết nào dưới đây chuyên dùng để nối giữa HAI SUPPORTING IDEAS trong cùng một đoạn văn?",
        options: [
          { id: "opt_A", label: "A", text: "Furthermore" },
          { id: "opt_B", label: "B", text: "For instance" },
          { id: "opt_C", label: "C", text: "Specifically" },
          { id: "opt_D", label: "D", text: "To illustrate" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Furthermore",
        correctExplanation: "'Furthermore', 'In addition', 'Moreover' dùng để liên kết thêm một supporting idea mới. 'For instance', 'Specifically', 'To illustrate' dùng để phát triển chi tiết từ core idea.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. For instance",
          diagnosticTitle: "Nhầm lẫn giữa liên từ thêm ý và liên từ minh họa",
          explanation: "'For instance' dùng để đưa ra ví dụ minh họa cho ý vừa nói, không dùng để giới thiệu một supporting idea độc lập tiếp theo."
        }
      },
      {
        id: "builder_w4d1_q04",
        roundIndex: 3,
        prompt: "Quy tắc chấm câu chuẩn xác khi dùng trạng từ liên kết 'However' đứng ở đầu câu thứ hai là gì?",
        options: [
          { id: "opt_A", label: "A", text: "Đứng sau dấu chấm của câu trước và có dấu phẩy ngay phía sau" },
          { id: "opt_B", label: "B", text: "Đứng sau dấu phẩy của câu trước mà không cần dấu chấm phẩy" },
          { id: "opt_C", label: "C", text: "Nối liền hai mệnh đề độc lập mà không cần dấu ngăn cách" },
          { id: "opt_D", label: "D", text: "Luôn phải đi kèm với liên từ 'but' để thể hiện sự đối lập" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Đứng sau dấu chấm của câu trước và có dấu phẩy ngay phía sau",
        correctExplanation: "'However' là conjunctive adverb, khi đứng đầu câu phải có dạng: 'Sentence 1. However, Sentence 2.' hoặc 'Sentence 1; however, Sentence 2.'. Dùng dấu phẩy nối hai câu với however là lỗi Comma Splice.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Đứng sau dấu phẩy của câu trước mà không cần dấu chấm phẩy",
          diagnosticTitle: "Lỗi Comma Splice với trạng từ liên kết",
          explanation: "Học sinh thường quen tay viết ', however,' để nối hai câu độc lập, vi phạm ngữ pháp học thuật (phải dùng dấu chấm hoặc chấm phẩy)."
        }
      },
      {
        id: "builder_w4d1_q05",
        roundIndex: 4,
        prompt: "Chọn phương án dùng cụm 'doing so' chính xác để liên kết hai ý sau:\n\"Governments should invest in renewable energy. [......] helps reduce carbon emissions.\"",
        options: [
          { id: "opt_A", label: "A", text: "Doing so" },
          { id: "opt_B", label: "B", text: "Do so" },
          { id: "opt_C", label: "C", text: "Done so" },
          { id: "opt_D", label: "D", text: "To do so" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Doing so",
        correctExplanation: "Ta cần một danh động từ (Gerund) làm Chủ ngữ cho động từ 'helps', do đó phải dùng 'Doing so' (việc làm như vậy = việc đầu tư vào năng lượng tái tạo).",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Do so",
          diagnosticTitle: "Dùng động từ nguyên mẫu không 'to' làm chủ ngữ",
          explanation: "'Do so' là động từ nguyên mẫu trần, không thể đứng làm chủ ngữ của câu độc lập nếu không chuyển thành V-ing."
        }
      },
      {
        id: "builder_w4d1_q06",
        roundIndex: 5,
        prompt: "Trong câu: \"Many people rely on private vehicles for commuting. This contributes to global warming.\", từ 'This' thay thế cho điều gì?",
        options: [
          { id: "opt_A", label: "A", text: "Toàn bộ sự việc nhiều người phụ thuộc vào phương tiện cá nhân đi lại" },
          { id: "opt_B", label: "B", text: "Chỉ riêng đối tượng phương tiện cá nhân của người dân" },
          { id: "opt_C", label: "C", text: "Hiện tượng nóng lên toàn cầu ở câu phía sau" },
          { id: "opt_D", label: "D", text: "Thời điểm hiện tại của xã hội hiện đại" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Toàn bộ sự việc nhiều người phụ thuộc vào phương tiện cá nhân đi lại",
        correctExplanation: "Đại từ chỉ định 'This' ở đầu câu đứng một mình đóng vai trò tham chiếu (anaphoric reference) thay thế cho toàn bộ mệnh đề hành động đứng trước nó.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Chỉ riêng đối tượng phương tiện cá nhân của người dân",
          diagnosticTitle: "Hiểu sai phạm vi tham chiếu của đại từ 'This'",
          explanation: "Nếu chỉ thay thế cho danh từ 'private vehicles' thì đại từ phải là số nhiều 'These/They'. 'This' số ít quy chiếu cho cả một sự việc."
        }
      },
      {
        id: "builder_w4d1_q07",
        roundIndex: 6,
        prompt: "Xác định vai trò ngữ pháp của mệnh đề danh từ được gạch chân: \"When I depart depends on [when the train leaves].\"",
        options: [
          { id: "opt_A", label: "A", text: "Tân ngữ cho giới từ on" },
          { id: "opt_B", label: "B", text: "Chủ ngữ của động từ depends" },
          { id: "opt_C", label: "C", text: "Bổ ngữ cho danh từ train" },
          { id: "opt_D", label: "D", text: "Trạng ngữ chỉ thời gian độc lập" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Tân ngữ cho giới từ on",
        correctExplanation: "'When the train leaves' là một Noun Clause đứng ngay sau giới từ 'on', đóng vai trò là tân ngữ của giới từ (object of preposition).",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_D",
          baitOptionText: "D. Trạng ngữ chỉ thời gian độc lập",
          diagnosticTitle: "Nhầm lẫn giữa mệnh đề trạng ngữ và mệnh đề danh từ",
          explanation: "Mặc dù bắt đầu bằng từ 'when', mệnh đề này không bổ nghĩa thời gian cho một hành động khác mà làm tân ngữ chịu tác động của giới từ 'on'."
        }
      },
      {
        id: "builder_w4d1_q08",
        roundIndex: 7,
        prompt: "Phát hiện lỗi ngữ pháp trong câu sau: \"Although modern technology is useful, but it leads to social isolation.\"",
        options: [
          { id: "opt_A", label: "A", text: "Lỗi dùng thừa liên từ 'but' khi câu đã có 'Although'" },
          { id: "opt_B", label: "B", text: "Động từ 'leads to' phải chia ở thì quá khứ đơn" },
          { id: "opt_C", label: "C", text: "Tính từ 'useful' không thể đứng sau to be" },
          { id: "opt_D", label: "D", text: "Từ 'isolation' không thể kết hợp với 'social'" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Lỗi dùng thừa liên từ 'but' khi câu đã có 'Although'",
        correctExplanation: "Trong tiếng Anh học thuật, 'Although' và 'but' không bao giờ cùng xuất hiện trong một câu ghép. Phải bỏ 'but' để giữ cấu trúc: 'Although Clause 1, Clause 2.'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Động từ 'leads to' phải chia ở thì quá khứ đơn",
          diagnosticTitle: "Đoán mò lỗi thì thay vì phát hiện lỗi liên từ kép",
          explanation: "Câu diễn đạt một sự thật hiển nhiên ở hiện tại nên 'leads to' hoàn toàn chuẩn xác. Lỗi nằm ở cặp liên từ kép dịch từ tiếng Việt 'Mặc dù... nhưng'."
        }
      },
      {
        id: "builder_w4d1_q09",
        roundIndex: 8,
        prompt: "Điền liên từ thích hợp: \"Many people spend excessive time on social media. [......], they become less focused at work.\"",
        options: [
          { id: "opt_A", label: "A", text: "As a result" },
          { id: "opt_B", label: "B", text: "In contrast" },
          { id: "opt_C", label: "C", text: "In addition" },
          { id: "opt_D", label: "D", text: "On the contrary" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. As a result",
        correctExplanation: "Việc giảm tập trung trong công việc là hệ quả trực tiếp từ việc dùng mạng xã hội quá nhiều, do đó phải dùng liên từ chỉ kết quả: 'As a result' hoặc 'Consequently/Therefore'.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_C",
          baitOptionText: "C. In addition",
          diagnosticTitle: "Chọn liên từ bổ sung thay cho liên từ hệ quả",
          explanation: "'In addition' chỉ dùng khi bổ sung thêm một hành động mới cùng loại, không thể hiện được quan hệ nhân quả (cause-effect)."
        }
      },
      {
        id: "builder_w4d1_q10",
        roundIndex: 9,
        prompt: "Xác định câu viết lại chuẩn học thuật và mạch lạc nhất cho ý: \"Học sinh nên học nghề vì điều đó giúp họ có việc làm tốt nhanh chóng.\"",
        options: [
          { id: "opt_A", label: "A", text: "Students should pursue vocational training because doing so enables them to secure decent jobs quickly." },
          { id: "opt_B", label: "B", text: "Students should pursue vocational training because this helps they have a good job very quickly." },
          { id: "opt_C", label: "C", text: "Pursuing vocational training is good for students so that to get high employment without delays." },
          { id: "opt_D", label: "D", text: "Because students pursue vocational training, doing so gives them fast recruitment opportunities." },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Students should pursue vocational training because doing so enables them to secure decent jobs quickly.",
        correctExplanation: "Câu A dùng cụm từ vựng band cao: 'pursue vocational training', liên kết chuẩn 'doing so enables them to', và collocation học thuật 'secure decent jobs'.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Students should pursue vocational training because this helps they have a good job very quickly.",
          diagnosticTitle: "Lỗi đại từ tân ngữ và dùng từ vựng sơ cấp",
          explanation: "Câu B mắc lỗi đại từ 'helps they' (phải là 'helps them') và dùng từ vựng sơ cấp 'have a good job very quickly'."
        }
      },
  ],
  "WEEK 4 – DAY 2": [
    {
        id: "builder_w4d2_q01",
        roundIndex: 0,
        prompt: "Theo đoạn trích, phương pháp để tạo ra các hình vẽ khổng lồ trên đồi (geoglyphs) ở Anh thời xưa là gì?",
        options: [
          { id: "opt_A", label: "A", text: "Gạt bỏ lớp cỏ phía trên để lộ ra lớp phấn trắng lấp lánh bên dưới" },
          { id: "opt_B", label: "B", text: "Vận chuyển và xếp các tảng đá phấn trắng từ nơi khác đến sườn đồi" },
          { id: "opt_C", label: "C", text: "Sơn một lớp hợp chất màu trắng lên bề mặt cỏ tự nhiên trên đồi" },
          { id: "opt_D", label: "D", text: "Đào các rãnh sâu rồi đổ đầy bùn và sỏi trắng nhập khẩu vào rãnh" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Gạt bỏ lớp cỏ phía trên để lộ ra lớp phấn trắng lấp lánh bên dưới",
        correctExplanation: "Đoạn văn nêu rõ: 'The method of cutting these huge figures was simply to remove the overlying grass to reveal the gleaming white chalk below.'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Vận chuyển và xếp các tảng đá phấn trắng từ nơi khác đến sườn đồi",
          diagnosticTitle: "Nhầm lẫn giữa kỹ thuật khắc đất (cutting) và kỹ thuật xếp đá",
          explanation: "Người cổ đại chỉ cần cạo bỏ lớp cỏ mặt đất thì phấn trắng tự nhiên sẵn có dưới lòng đất lộ ra, không phải vận chuyển đá từ nơi khác đến."
        }
      },
      {
        id: "builder_w4d2_q02",
        roundIndex: 1,
        prompt: "Lý do chính khiến đại đa số các hình vẽ trên đồi cổ xưa ở Anh biến mất theo thời gian là gì?",
        options: [
          { id: "opt_A", label: "A", text: "Khi truyền thống phai nhạt, người dân không còn dọn cỏ định kỳ để lộ hình khắc" },
          { id: "opt_B", label: "B", text: "Các trận lũ lụt và biến đổi khí hậu khắc nghiệt đã xóa sạch hoàn toàn mặt đất" },
          { id: "opt_C", label: "C", text: "Các bộ tộc xâm lăng đã chủ ý phá hủy các biểu tượng tôn giáo của cư dân bản địa" },
          { id: "opt_D", label: "D", text: "Chất lượng đất phấn trắng bị phong hóa và biến chất thành đất mùn bình thường" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Khi truyền thống phai nhạt, người dân không còn dọn cỏ định kỳ để lộ hình khắc",
        correctExplanation: "Đoạn trích: 'when the traditions associated with the figures faded, people no longer bothered or remembered to clear away the grass to expose the chalk outline.'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_C",
          baitOptionText: "C. Các bộ tộc xâm lăng đã chủ ý phá hủy các biểu tượng tôn giáo của cư dân bản địa",
          diagnosticTitle: "Suy diễn sai lệch về xung đột chiến tranh",
          explanation: "Bài đọc nhấn mạnh sự biến mất là do người dân địa phương lãng quên việc phát quang cỏ định kỳ khi phong tục mai một, không phải do chiến tranh phá hoại."
        }
      },
      {
        id: "builder_w4d2_q03",
        roundIndex: 2,
        prompt: "Tại sao hình dáng của một số hình khắc trên đồi lại bị thay đổi so với nguyên bản ban đầu?",
        options: [
          { id: "opt_A", label: "A", text: "Người cạo cỏ qua nhiều thế hệ không cắt đúng chính xác vị trí ban đầu" },
          { id: "opt_B", label: "B", text: "Các nghệ nhân thời sau cố tình vẽ thêm các chi tiết mới hiện đại hơn" },
          { id: "opt_C", label: "C", text: "Sự xói mòn do nước mưa đã làm méo mó các đường nét cắt dọc theo sườn dốc" },
          { id: "opt_D", label: "D", text: "Các trận động đất cổ đại làm dịch chuyển các mảng địa chất trên đồi" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Người cạo cỏ qua nhiều thế hệ không cắt đúng chính xác vị trí ban đầu",
        correctExplanation: "Đoạn văn ghi: '...due to people not always cutting in exactly the same place, thus creating a different shape to the original geoglyph.'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_C",
          baitOptionText: "C. Sự xói mòn do nước mưa đã làm méo mó các đường nét cắt dọc theo sườn dốc",
          diagnosticTitle: "Quy kết nguyên nhân cho thời tiết thay vì hành động con người",
          explanation: "Bài đọc chỉ rõ nguyên nhân trực tiếp là do con người khi làm vệ sinh cạo cỏ qua hàng trăm năm không cắt chuẩn vào vị trí cũ."
        }
      },
      {
        id: "builder_w4d2_q04",
        roundIndex: 3,
        prompt: "Hình khắc Ngựa Trắng Uffington (The Uffington White Horse) nằm gần di tích nào dưới đây?",
        options: [
          { id: "opt_A", label: "A", text: "Pháo đài đồi Uffington Castle và con đường cổ Ridgeway" },
          { id: "opt_B", label: "B", text: "Đài quan sát thiên văn hoàng gia và tu viện Westminster" },
          { id: "opt_C", label: "C", text: "Khu định cư thời Đồ Đá Mới nằm sát bờ biển xứ Wales" },
          { id: "opt_D", label: "D", text: "Thung lũng mỏ thiếc và các lò rèn đồ đồng thời Đồ Sắt" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Pháo đài đồi Uffington Castle và con đường cổ Ridgeway",
        correctExplanation: "Bài đọc: 'The horse is situated 2.5 km from Uffington village on a steep close to the Late Bronze Age hillfort of Uffington Castle and below the Ridgeway...'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_C",
          baitOptionText: "C. Khu định cư thời Đồ Đá Mới nằm sát bờ biển xứ Wales",
          diagnosticTitle: "Nhầm lẫn địa danh xứ Wales với vùng đồi nước Anh",
          explanation: "Ngựa Trắng Uffington nằm ở Oxfordshire, miền nam nước Anh, gần pháo đài Uffington Castle và lối đi cổ Ridgeway."
        }
      },
      {
        id: "builder_w4d2_q05",
        roundIndex: 4,
        prompt: "Từ góc độ quan sát, đặc điểm nổi bật nhất khi chiêm ngưỡng Ngựa Trắng Uffington là gì?",
        options: [
          { id: "opt_A", label: "A", text: "Khó nhìn rõ toàn cảnh từ cự ly gần và được thưởng thức trọn vẹn nhất từ trên không" },
          { id: "opt_B", label: "B", text: "Chỉ có thể nhìn thấy khi đứng ở cự ly cực gần dưới chân đồi" },
          { id: "opt_C", label: "C", text: "Hoàn toàn vô hình khi nhìn từ trên không do tán cây che phủ" },
          { id: "opt_D", label: "D", text: "Chỉ phát sáng vào ban đêm khi có ánh trăng rọi vào sườn đồi" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Khó nhìn rõ toàn cảnh từ cự ly gần và được thưởng thức trọn vẹn nhất từ trên không",
        correctExplanation: "Đoạn trích: 'The carving has been placed in such a way as to make it extremely difficult to see from close quarters, and like many geoglyphs is best appreciated from the air.'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Chỉ có thể nhìn thấy khi đứng ở cự ly cực gần dưới chân đồi",
          diagnosticTitle: "Hiểu ngược hoàn toàn thông tin bài đọc",
          explanation: "Bài đọc khẳng định đứng gần ('close quarters') rất khó nhìn thấy tổng thể bức vẽ khổng lồ, phải nhìn từ trên không hoặc từ xa."
        }
      },
      {
        id: "builder_w4d2_q06",
        roundIndex: 5,
        prompt: "Phương pháp kiểm tra OSL (Optically Stimulated Luminescence) năm 1995 đã chứng minh điều gì về niên đại của Ngựa Trắng?",
        options: [
          { id: "opt_A", label: "A", text: "Được tạo ra trong khoảng 1400 đến 600 TCN, sớm hơn nhiều so với suy đoán trước đó" },
          { id: "opt_B", label: "B", text: "Được khắc vào thế kỷ thứ 1 TCN trùng với thời điểm đúc các đồng tiền cổ" },
          { id: "opt_C", label: "C", text: "Mới chỉ xuất hiện vào thời Trung cổ khoảng thế kỷ thứ 11 theo tư liệu tu viện" },
          { id: "opt_D", label: "D", text: "Không thể xác định niên đại do lớp đất bên dưới đã bị xáo trộn hoàn toàn" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Được tạo ra trong khoảng 1400 đến 600 TCN, sớm hơn nhiều so với suy đoán trước đó",
        correctExplanation: "Trước năm 1995 người ta tưởng hình khắc thuộc thế kỷ 1 TCN do giống hình trên đồng tiền, nhưng OSL chứng minh nó có từ 1400 - 600 TCN (Thời Đồ Đồng muộn hoặc Đồ Sắt sớm).",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Được khắc vào thế kỷ thứ 1 TCN trùng với thời điểm đúc các đồng tiền cổ",
          diagnosticTitle: "Chọn giả thuyết cũ đã bị bác bỏ",
          explanation: "Giả thuyết thế kỷ 1 TCN là nhận định cũ dựa trên so sánh đồng xu, đã bị phương pháp khoa học OSL bác bỏ vì niên đại thực tế cổ hơn rất nhiều."
        }
      },
      {
        id: "builder_w4d2_q07",
        roundIndex: 6,
        prompt: "Tại sao giả thuyết coi Ngựa Trắng Uffington là hiện thân của nữ thần Epona lại bị nghi ngờ?",
        options: [
          { id: "opt_A", label: "A", text: "Tín ngưỡng thờ Epona chỉ du nhập vào Anh khoảng 6 thế kỷ sau khi Ngựa Trắng được tạo tác" },
          { id: "opt_B", label: "B", text: "Nữ thần Epona là thần hộ mệnh của loài hươu chứ không phải loài ngựa" },
          { id: "opt_C", label: "C", text: "Người dân vùng Uffington thời đó chưa hề có bất kỳ tín ngưỡng tôn giáo nào" },
          { id: "opt_D", label: "D", text: "Hình khắc con vật trên đồi không hề mang bất cứ đặc điểm nào giống ngựa" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Tín ngưỡng thờ Epona chỉ du nhập vào Anh khoảng 6 thế kỷ sau khi Ngựa Trắng được tạo tác",
        correctExplanation: "Đoạn văn: 'However, the cult of Epona was not imported from Gaul (France) until around the first century CE. This date is at least six centuries after the Uffington Horse was probably carved.'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Nữ thần Epona là thần hộ mệnh của loài hươu chứ không phải loài ngựa",
          diagnosticTitle: "Sai lệch kiến thức bài đọc về vai trò nữ thần",
          explanation: "Epona thực sự là nữ thần bảo hộ loài ngựa, nhưng lý do giả thuyết bị phản bác là do độ lệch thời gian lịch sử tới 600 năm."
        }
      },
      {
        id: "builder_w4d2_q08",
        roundIndex: 7,
        prompt: "Từ 'testament' trong câu: \"...is testament to the strength and continuity of local customs...\" mang ý nghĩa gì?",
        options: [
          { id: "opt_A", label: "A", text: "Bằng chứng rõ ràng cho một điều gì đó" },
          { id: "opt_B", label: "B", text: "Bản di chúc để lại tài sản thừa kế" },
          { id: "opt_C", label: "C", text: "Lời cảnh báo về một hiểm họa tương lai" },
          { id: "opt_D", label: "D", text: "Một nghi lễ tôn giáo thần bí bắt buộc" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Bằng chứng rõ ràng cho một điều gì đó",
        correctExplanation: "Trong ngữ cảnh học thuật: 'be testament to something' = là minh chứng / bằng chứng hùng hồn cho sức sống bền bỉ của phong tục tập quán.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Bản di chúc để lại tài sản thừa kế",
          diagnosticTitle: "Hiểu theo nghĩa đen pháp lý thông thường",
          explanation: "'Testament' trong văn phong học thuật có nghĩa bóng là chứng tích/minh chứng sống động, không phải là bản di chúc chia gia tài."
        }
      },
      {
        id: "builder_w4d2_q09",
        roundIndex: 8,
        prompt: "Đánh giá câu sau dựa trên bài đọc: \"The fame of the Uffington White Horse is due to its size.\"",
        options: [
          { id: "opt_A", label: "A", text: "NOT GIVEN" },
          { id: "opt_B", label: "B", text: "TRUE" },
          { id: "opt_C", label: "C", text: "FALSE" },
          { id: "opt_D", label: "D", text: "INCOMPLETE" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. NOT GIVEN",
        correctExplanation: "Bài đọc nói hình vẽ dài và độc đáo, nhưng KHÔNG hề đề cập rằng sự nổi tiếng của nó là do kích thước to lớn hay do yếu tố nào khác -> NOT GIVEN.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. TRUE",
          diagnosticTitle: "Tự suy diễn dựa trên từ 'huge figures'",
          explanation: "Bài đọc có nhắc các hình khắc là 'huge', nhưng không hề khẳng định 'fame is due to its size'. Học sinh thường tự suy diễn TRUE khi thấy từ liên quan."
        }
      },
      {
        id: "builder_w4d2_q10",
        roundIndex: 9,
        prompt: "Tác giả kết luận điều gì về giá trị của các hình geoglyph ở đoạn cuối cùng?",
        options: [
          { id: "opt_A", label: "A", text: "Chúng là lăng kính kỳ diệu soi tỏ tâm trí và cách nhìn thế giới của người cổ xưa" },
          { id: "opt_B", label: "B", text: "Chúng không còn bất kỳ giá trị lịch sử nào vì chỉ là những nét vẽ tạm bợ" },
          { id: "opt_C", label: "C", text: "Chúng cần được nhà nước xây mái che chắn để chống lại mọi ảnh hưởng khí hậu" },
          { id: "opt_D", label: "D", text: "Chúng chứng minh người tiền sử có công nghệ hàng không nhìn từ trên cao" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Chúng là lăng kính kỳ diệu soi tỏ tâm trí và cách nhìn thế giới của người cổ xưa",
        correctExplanation: "Đoạn cuối: 'These giant carvings are a fascinating glimpse into the minds of their creators and how they viewed the landscape in which they lived.'",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Chúng không còn bất kỳ giá trị lịch sử nào vì chỉ là những nét vẽ tạm bợ",
          diagnosticTitle: "Bỏ qua liên từ phản bác 'But this does not lessen their importance'",
          explanation: "Tác giả nói dù ban đầu có thể là cử chỉ tạm thời ('temporary gestures'), 'But this does not lessen their importance', tức giá trị văn hóa vẫn vô cùng to lớn."
        }
      },
  ],
  "WEEK 4 – DAY 3": [
    {
        id: "builder_w4d3_q01",
        roundIndex: 0,
        prompt: "Cặp âm /θ/ (không rung - vô thanh) và /ð/ (rung - hữu thanh) được thể hiện chính xác trong cặp từ nào dưới đây?",
        options: [
          { id: "opt_A", label: "A", text: "thought (/θ/) và though (/ð/)" },
          { id: "opt_B", label: "B", text: "thank (/ð/) và there (/θ/)" },
          { id: "opt_C", label: "C", text: "three (/ð/) và breathe (/θ/)" },
          { id: "opt_D", label: "D", text: "teeth (/ð/) và breathe (/θ/)" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. thought (/θ/) và though (/ð/)",
        correctExplanation: "'thought' phát âm là /θɔːt/ (vô thanh), còn 'though' phát âm là /ðəʊ/ (hữu thanh). Các cặp còn lại bị gán nhãn ngược hoặc sai âm.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. thank (/ð/) và there (/θ/)",
          diagnosticTitle: "Đảo ngược thuộc tính vô thanh và hữu thanh",
          explanation: "'thank' là /θæŋk/ (vô thanh, không rung dây thanh), trong khi 'there' là /ðeər/ (hữu thanh, rung dây thanh)."
        }
      },
      {
        id: "builder_w4d3_q02",
        roundIndex: 1,
        prompt: "Câu luyện giọng: \"Thirty thirsty thieves thought thoroughly\" được thiết kế để rèn luyện âm phụ âm nào?",
        options: [
          { id: "opt_A", label: "A", text: "Phụ âm vô thanh /θ/" },
          { id: "opt_B", label: "B", text: "Phụ âm hữu thanh /ð/" },
          { id: "opt_C", label: "C", text: "Phụ âm tắc xát /tʃ/" },
          { id: "opt_D", label: "D", text: "Phụ âm mũi xát /s/" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Phụ âm vô thanh /θ/",
        correctExplanation: "Tất cả các từ 'Thirty', 'thirsty', 'thieves', 'thought', 'thoroughly' đều bắt đầu bằng âm răng xát vô thanh /θ/.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Phụ âm hữu thanh /ð/",
          diagnosticTitle: "Không phân biệt được rung và không rung của chùm 'th'",
          explanation: "Học sinh thường phát âm chùm chữ 'th' thành âm d tiếng Việt hoặc /ð/, trong khi các từ trên đòi hỏi đặt lưỡi giữa răng và thổi hơi không rung dây thanh (/θ/)."
        }
      },
      {
        id: "builder_w4d3_q03",
        roundIndex: 2,
        prompt: "Từ nào dưới đây chứa âm /ʒ/ (phụ âm rung) tương tự như trong từ 'measure' và 'pleasure'?",
        options: [
          { id: "opt_A", label: "A", text: "leisure" },
          { id: "opt_B", label: "B", text: "pressure" },
          { id: "opt_C", label: "C", text: "mission" },
          { id: "opt_D", label: "D", text: "fashion" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. leisure",
        correctExplanation: "'leisure' được phát âm là /ˈleʒər/ hoặc /ˈliːʒər/ chứa âm /ʒ/. Trong khi 'pressure', 'mission', 'fashion' đều chứa âm vô thanh /ʃ/.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. pressure",
          diagnosticTitle: "Đồng nhất đuôi '-sure' thành cùng một âm",
          explanation: "Đuôi '-sure' trong 'pressure' phát âm là /ˈpreʃər/ (âm /ʃ/ vô thanh), khác với 'leisure/measure' (âm /ʒ/ hữu thanh)."
        }
      },
      {
        id: "builder_w4d3_q04",
        roundIndex: 3,
        prompt: "Thành ngữ (Idiom) nào diễn đạt việc một nhân vật luôn ở trung tâm của sự chú ý từ công chúng và truyền thông?",
        options: [
          { id: "opt_A", label: "A", text: "In the limelight" },
          { id: "opt_B", label: "B", text: "Behind closed doors" },
          { id: "opt_C", label: "C", text: "Out of the blue" },
          { id: "opt_D", label: "D", text: "Under the weather" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. In the limelight",
        correctExplanation: "'In the limelight' (dưới ánh đèn sân khấu) nghĩa là trở thành tâm điểm của sự chú ý từ dư luận và công chúng.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. Behind closed doors",
          diagnosticTitle: "Chọn thành ngữ mang nghĩa đối lập hoàn toàn",
          explanation: "'Behind closed doors' nghĩa là làm việc bí mật, kín đáo, trái ngược hoàn toàn với sự nổi tiếng công khai."
        }
      },
      {
        id: "builder_w4d3_q05",
        roundIndex: 4,
        prompt: "Điền danh từ phù hợp vào collocation diễn đạt người rất nổi tiếng ai ai cũng biết: \"She has become a [......] name across the country.\"",
        options: [
          { id: "opt_A", label: "A", text: "household" },
          { id: "opt_B", label: "B", text: "domestic" },
          { id: "opt_C", label: "C", text: "family" },
          { id: "opt_D", label: "D", text: "residential" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. household",
        correctExplanation: "Collocation cố định: 'a household name' nghĩa là một cái tên quen thuộc với mọi nhà, người nổi tiếng ai cũng biết.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_C",
          baitOptionText: "C. family",
          diagnosticTitle: "Dịch thô từ 'tên quen thuộc trong gia đình'",
          explanation: "Trong tiếng Anh không có cụm 'family name' với nghĩa người nổi tiếng phổ biến (family name có nghĩa là họ/họ tên)."
        }
      },
      {
        id: "builder_w4d3_q06",
        roundIndex: 5,
        prompt: "Cụm danh từ học thuật nào diễn đạt việc đời tư của người nổi tiếng bị săm soi, đánh mất tự do cá nhân?",
        options: [
          { id: "opt_A", label: "A", text: "Loss of privacy and constant media scrutiny" },
          { id: "opt_B", label: "B", text: "Loss of money and heavy financial burdens" },
          { id: "opt_C", label: "C", text: "Lack of job opportunities and career stagnation" },
          { id: "opt_D", label: "D", text: "Severe isolation from social networking services" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. Loss of privacy and constant media scrutiny",
        correctExplanation: "Mặt trái điển hình của sự nổi tiếng (disadvantages of fame) là 'loss of privacy' (mất tự do riêng tư) và 'constant media scrutiny' (sự săm soi liên tục của truyền thông).",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_D",
          baitOptionText: "D. Severe isolation from social networking services",
          diagnosticTitle: "Chọn bất lợi không phản ánh đúng thực tế của người nổi tiếng",
          explanation: "Người nổi tiếng thường hoạt động rất tích cực trên mạng xã hội chứ không hề bị cô lập khỏi các nền tảng này."
        }
      },
      {
        id: "builder_w4d3_q07",
        roundIndex: 6,
        prompt: "Một người nổi tiếng có lối sống tích cực, truyền cảm hứng và là tấm gương tốt cho giới trẻ được gọi là:",
        options: [
          { id: "opt_A", label: "A", text: "a positive role model" },
          { id: "opt_B", label: "B", text: "a fashion trend follower" },
          { id: "opt_C", label: "C", text: "a commercial advertiser" },
          { id: "opt_D", label: "D", text: "an ordinary influencer" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. a positive role model",
        correctExplanation: "'A positive role model' là hình mẫu tích cực, tấm gương mẫu mực cho người khác noi theo.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_D",
          baitOptionText: "D. an ordinary influencer",
          diagnosticTitle: "Dùng từ phổ thông không mang sắc thái hình mẫu chuẩn mực",
          explanation: "'Influencer' chỉ là người có sức ảnh hưởng nói chung (có thể tốt hoặc xấu), không mang hàm ý tấm gương mẫu mực chuẩn xác như 'role model'."
        }
      },
      {
        id: "builder_w4d3_q08",
        roundIndex: 7,
        prompt: "Từ nào dưới đây có trọng âm chính rơi vào ÂM TIẾT THỨ HAI?",
        options: [
          { id: "opt_A", label: "A", text: "celebrity" },
          { id: "opt_B", label: "B", text: "famous" },
          { id: "opt_C", label: "C", text: "popular" },
          { id: "opt_D", label: "D", text: "glamour" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. celebrity",
        correctExplanation: "'ce-LEB-ri-ty' /səˈlebrəti/ có trọng âm rơi vào âm tiết thứ 2. Các từ còn lại: 'FA-mous' /ˈfeɪməs/ (1), 'PO-pu-lar' /ˈpɒpjələr/ (1), 'GLA-mour' /ˈɡlæmər/ (1).",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_C",
          baitOptionText: "C. popular",
          diagnosticTitle: "Nhầm lẫn trọng âm của từ 3 âm tiết",
          explanation: "Từ 'popular' có trọng âm rơi vào âm tiết thứ nhất /ˈpɒpjələr/, không phải âm tiết thứ hai."
        }
      },
      {
        id: "builder_w4d3_q09",
        roundIndex: 8,
        prompt: "Khi giám khảo hỏi: \"Do you want to become famous?\", câu trả lời nào dưới đây đáp ứng tiêu chí Band 6.0+ Fluency & Coherence?",
        options: [
          { id: "opt_A", label: "A", text: "To be honest, not really. Although fame brings wealth, I highly value my personal privacy and dislike public scrutiny." },
          { id: "opt_B", label: "B", text: "No, I do not want. Because famous people are very tired every day and many people look at them." },
          { id: "opt_C", label: "C", text: "Yes, I really want to become famous because I can have a lot of money and buy expensive clothes." },
          { id: "opt_D", label: "D", text: "I never think about this question before, so maybe yes or maybe no, I do not know." },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. To be honest, not really. Although fame brings wealth, I highly value my personal privacy and dislike public scrutiny.",
        correctExplanation: "Câu A sử dụng diễn ngôn tự nhiên ('To be honest, not really'), mệnh đề đối lập ('Although...'), và từ vựng band tốt ('value personal privacy', 'public scrutiny').",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. No, I do not want. Because famous people are very tired every day and many people look at them.",
          diagnosticTitle: "Câu trả lời cộc lốc và dùng từ vựng sơ cấp Band 4.0",
          explanation: "Câu B dùng cấu trúc vụng về ('No, I do not want'), bắt đầu câu bằng 'Because' cụt ý và từ vựng lặp sơ cấp."
        }
      },
      {
        id: "builder_w4d3_q10",
        roundIndex: 9,
        prompt: "Phụ âm đầu của từ nào dưới đây được phát âm là /dʒ/ (hữu thanh) thay vì /tʃ/ (vô thanh)?",
        options: [
          { id: "opt_A", label: "A", text: "giant" },
          { id: "opt_B", label: "B", text: "cheerful" },
          { id: "opt_C", label: "C", text: "chase" },
          { id: "opt_D", label: "D", text: "chocolate" },
        ],
        correctOptionId: "opt_A",
        correctAnswerText: "A. giant",
        correctExplanation: "'giant' phát âm là /ˈdʒaɪənt/ (chứa âm tắc xát hữu thanh /dʒ/). Các từ 'cheerful', 'chase', 'chocolate' đều bắt đầu bằng âm vô thanh /tʃ/.",
        timeLimitSeconds: 20,
        points: 1000,
        misconception: {
          baitOptionId: "opt_B",
          baitOptionText: "B. cheerful",
          diagnosticTitle: "Nhầm lẫn giữa âm 'ch' (/tʃ/) và âm 'g/j' (/dʒ/)",
          explanation: "Học sinh thường khó phân biệt hai âm tắc xát này khi nói nhanh. 'cheerful' bắt đầu bằng /tʃ/ không rung."
        }
      }
  ]
};
