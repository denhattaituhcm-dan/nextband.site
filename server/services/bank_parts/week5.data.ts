/**
 * Question Bank for Week 5 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_5_QUESTIONS: Record<string, any[]> = {
  "WEEK 5 – DAY 1": [
    {
      id: "doer_w5d1_q01",
      roundIndex: 0,
      prompt: "Chọn câu viết đúng khi dùng Cụm giới từ (Prepositional Phrase) làm thành phần bổ nghĩa cho danh từ: \"Trường y chỉ nhận những học sinh có thành tích xuất sắc trong học tập.\"",
      options: [
        { id: "opt_A", label: "A", text: "Medical schools only accept students with outstanding academic performance." },
        { id: "opt_B", label: "B", text: "Medical schools only accept students have outstanding academic performance." },
        { id: "opt_C", label: "C", text: "Medical schools only accept students about outstanding academic performance." },
        { id: "opt_D", label: "D", text: "Medical schools only accept students of outstanding academic performance." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Medical schools only accept students with outstanding academic performance.",
      correctExplanation: "Cụm giới từ \"with + noun phrase\" (với/sở hữu đặc điểm gì) đứng ngay sau danh từ \"students\" để làm modifier rút gọn.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. accept students have",
        diagnosticTitle: "Lỗi hai động từ vị ngữ đứng liền kề không liên từ (Run-on/Double Verb)",
        explanation: "Students have tạo ra 2 finite verb (accept và have) trong cùng một clause đơn mà không có liên từ hoặc đại từ quan hệ."
      }
    },
    {
      id: "doer_w5d1_q02",
      roundIndex: 1,
      prompt: "Chọn giới từ đúng trong cụm giới từ chỉ địa điểm/tổ chức: \"Họ đang làm việc cho một tổ chức phi lợi nhuận tại Thụy Sĩ.\"",
      options: [
        { id: "opt_A", label: "A", text: "They work for a non-profit organization in Switzerland." },
        { id: "opt_B", label: "B", text: "They work at a non-profit organization into Switzerland." },
        { id: "opt_C", label: "C", text: "They work to a non-profit organization on Switzerland." },
        { id: "opt_D", label: "D", text: "They work of a non-profit organization at Switzerland." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. They work for a non-profit organization in Switzerland.",
      correctExplanation: "\"Work for an organization\" (làm việc cho tổ chức nào) và \"in Switzerland\" (ở quốc gia nào dùng in).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. into Switzerland",
        diagnosticTitle: "Dùng giới từ chỉ chuyển động \"into\" thay vì trạng thái vị trí \"in\"",
        explanation: "Into thể hiện hướng chuyển động đi vào trong, còn vị trí ở một đất nước phải là \"in\"."
      }
    },
    {
      id: "doer_w5d1_q03",
      roundIndex: 2,
      prompt: "Chọn câu có cụm giới từ làm rõ nguyên nhân/nguồn gốc: \"Nhiều loài động vật đang đứng trước nguy cơ tuyệt chủng do sự tàn phá môi trường sống.\"",
      options: [
        { id: "opt_A", label: "A", text: "Many animals are on the verge of extinction due to habitat destruction." },
        { id: "opt_B", label: "B", text: "Many animals are on the verge of extinction because habitat destruction." },
        { id: "opt_C", label: "C", text: "Many animals are at the verge of extinction for habitat destruction." },
        { id: "opt_D", label: "D", text: "Many animals are in the verge of extinction despite habitat destruction." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Many animals are on the verge of extinction due to habitat destruction.",
      correctExplanation: "Cụm thành ngữ \"on the verge of extinction\" (trên bờ vực tuyệt chủng), sau đó là cụm giới từ chỉ nguyên nhân \"due to + noun phrase\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. because habitat destruction",
        diagnosticTitle: "Dùng liên từ because trực tiếp với cụm danh từ",
        explanation: "\"Because\" phải đi kèm với một mệnh đề (clause S+V); đi với cụm danh từ bắt buộc dùng \"due to / because of\"."
      }
    },
    {
      id: "doer_w5d1_q04",
      roundIndex: 3,
      prompt: "Chọn câu viết đúng với cụm giới từ chỉ sự tương phản: \"Bất chấp những khó khăn về tài chính, cô ấy vẫn tiếp tục theo đuổi con đường học vấn.\"",
      options: [
        { id: "opt_A", label: "A", text: "In spite of financial difficulties, she continued to pursue higher education." },
        { id: "opt_B", label: "B", text: "Despite of financial difficulties, she continued to pursue higher education." },
        { id: "opt_C", label: "C", text: "Although financial difficulties, she continued to pursue higher education." },
        { id: "opt_D", label: "D", text: "In spite financial difficulties, she continued to pursue higher education." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. In spite of financial difficulties, she continued to pursue higher education.",
      correctExplanation: "\"In spite of\" luôn có \"of\". Ngược lại, từ đồng nghĩa \"Despite\" thì KHÔNG BAO GIỜ có \"of\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Despite of",
        diagnosticTitle: "Lỗi kinh điển thêm \"of\" sau Despite",
        explanation: "Thí sinh cực kỳ hay nhầm lẫn viết \"Despite of\" do bị ảnh hưởng bởi cụm \"In spite of\"."
      }
    },
    {
      id: "doer_w5d1_q05",
      roundIndex: 4,
      prompt: "Xác định vai trò ngữ pháp của cụm giới từ in đậm trong câu: \"The young girl **with curly hair** is my niece.\"",
      options: [
        { id: "opt_A", label: "A", text: "Adjective phrase (cụm tính từ bổ nghĩa cho danh từ The young girl)" },
        { id: "opt_B", label: "B", text: "Adverb phrase (cụm trạng từ bổ nghĩa cho động từ is)" },
        { id: "opt_C", label: "C", text: "Subject chính của câu" },
        { id: "opt_D", label: "D", text: "Finite Verb của câu" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Adjective phrase (cụm tính từ bổ nghĩa cho danh từ The young girl)",
      correctExplanation: "Cụm giới từ đứng ngay sau danh từ và trả lời cho câu hỏi \"Which girl?\" (Cô gái nào?), do đó đóng vai trò là một Adjective phrase.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Adverb phrase",
        diagnosticTitle: "Nhầm lẫn giữa Adjective phrase và Adverb phrase",
        explanation: "Nếu cụm giới từ bổ nghĩa cho động từ hoặc cả câu (về thời gian, nơi chốn, cách thức) thì mới là trạng từ; bổ nghĩa cho danh từ là tính từ."
      }
    },
    {
      id: "doer_w5d1_q06",
      roundIndex: 5,
      prompt: "Chọn câu diễn đạt chuẩn: \"Cuốn sách trên bàn thuộc về giáo viên của chúng tôi.\"",
      options: [
        { id: "opt_A", label: "A", text: "The book on the table belongs to our teacher." },
        { id: "opt_B", label: "B", text: "The book on the table is belongs to our teacher." },
        { id: "opt_C", label: "C", text: "The book is on the table belongs to our teacher." },
        { id: "opt_D", label: "D", text: "The book on table belong to our teacher." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The book on the table belongs to our teacher.",
      correctExplanation: "Subject là \"The book on the table\" (với \"on the table\" là cụm giới từ bổ nghĩa), Finite Verb là \"belongs to\" (thuộc về ai).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. is belongs to",
        diagnosticTitle: "Thêm to be trước động từ thường belong",
        explanation: "Belong là động từ thường có nghĩa là thuộc về, không bao giờ dùng dạng bị động \"is belonged\" hay thừa to be \"is belongs\"."
      }
    },
    {
      id: "doer_w5d1_q07",
      roundIndex: 6,
      prompt: "Chọn cụm giới từ phù hợp: \"She succeeded in the IELTS examination ______ her teacher's constant guidance.\"",
      options: [
        { id: "opt_A", label: "A", text: "under" },
        { id: "opt_B", label: "B", text: "below" },
        { id: "opt_C", label: "C", text: "beneath" },
        { id: "opt_D", label: "D", text: "down" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. under",
      correctExplanation: "Cụm cố định: \"under someone's guidance / supervision\" (dưới sự chỉ dẫn / giám sát của ai).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. below",
        diagnosticTitle: "Dịch \"dưới sự chỉ dẫn\" thành below",
        explanation: "Below dùng cho vị trí thấp hơn về độ cao hoặc mức độ số liệu; sự che chở/chỉ dẫn quyền hạn quy ước dùng \"under\"."
      }
    },
    {
      id: "doer_w5d1_q08",
      roundIndex: 7,
      prompt: "Chọn câu viết đúng khi dùng cụm giới từ chỉ mục đích/chức năng: \"Công cụ này được thiết kế để phân tích dữ liệu hiệu quả.\"",
      options: [
        { id: "opt_A", label: "A", text: "This tool is designed for analyzing data efficiently." },
        { id: "opt_B", label: "B", text: "This tool is designed to analyze data efficient." },
        { id: "opt_C", label: "C", text: "This tool designed for data analyze efficient." },
        { id: "opt_D", label: "D", text: "This tool is designing for analyze data." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. This tool is designed for analyzing data efficiently.",
      correctExplanation: "Cấu trúc bị động \"is designed for + V-ing / noun phrase\" hoặc \"is designed to analyze data efficiently\" (efficiently là trạng từ).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. analyze data efficient",
        diagnosticTitle: "Dùng tính từ efficient bổ nghĩa cho động từ analyze",
        explanation: "Sau động từ hành động analyze cần phó từ efficiently, phương án B dùng tính từ efficient nên sai."
      }
    },
    {
      id: "doer_w5d1_q09",
      roundIndex: 8,
      prompt: "Chọn giới từ đúng đi kèm cụm: \"Students should focus on their studies ______ social media distractions.\"",
      options: [
        { id: "opt_A", label: "A", text: "instead of" },
        { id: "opt_B", label: "B", text: "instead" },
        { id: "opt_C", label: "C", text: "in place" },
        { id: "opt_D", label: "D", text: "rather" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. instead of",
      correctExplanation: "Giới từ phức hợp: \"instead of + noun/V-ing\" (thay vì cái gì). Nếu chỉ dùng \"instead\" thì nó là trạng từ đứng cuối câu.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. instead",
        diagnosticTitle: "Rơi rụng giới từ \"of\" sau instead",
        explanation: "Đứng trước danh từ hoặc V-ing bắt buộc phải dùng \"instead of\"; không được dùng \"instead\" trơ trọi."
      }
    },
    {
      id: "doer_w5d1_q10",
      roundIndex: 9,
      prompt: "Phân biệt cụm giới từ chỉ địa điểm: Khi nào ta dùng \"at the corner\" thay vì \"in the corner\"?",
      options: [
        { id: "opt_A", label: "A", text: "\"at the corner\" dùng cho góc ngã tư đường phố bên ngoài, còn \"in the corner\" dùng cho góc bên trong một căn phòng" },
        { id: "opt_B", label: "B", text: "Cả hai hoàn toàn giống nhau không có bất kỳ quy tắc nào" },
        { id: "opt_C", label: "C", text: "\"in the corner\" dùng cho góc ngã tư đường lớn" },
        { id: "opt_D", label: "D", text: "\"at the corner\" chỉ dùng cho góc tủ quần áo" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. \"at the corner\" dùng cho góc ngã tư đường phố bên ngoài, còn \"in the corner\" dùng cho góc bên trong một căn phòng",
      correctExplanation: "Quy tắc không gian: in the corner of a room (góc trong phòng khép kín), at the corner of the street (góc ngoài đường phố mở).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Cả hai hoàn toàn giống nhau",
        diagnosticTitle: "Coi nhẹ sự phân biệt giới từ không gian",
        explanation: "Sự phân biệt giữa góc trong (in) và góc ngoài giao lộ (at/on) là điểm kiểm tra ngữ pháp không gian rất chuẩn xác."
      }
    }
  ],
  "WEEK 5 – DAY 2": [
    {
      id: "doer_w5d2_q01",
      roundIndex: 0,
      prompt: "Năm 2021, Trung Quốc đã ban hành lệnh giới hạn trẻ vị thành niên (dưới 18 tuổi) chơi điện tử tối đa bao nhiêu giờ mỗi tuần?",
      options: [
        { id: "opt_A", label: "A", text: "Không quá 3 giờ mỗi tuần" },
        { id: "opt_B", label: "B", text: "Không quá 10 giờ mỗi tuần" },
        { id: "opt_C", label: "C", text: "1 giờ mỗi ngày (tổng 7 giờ/tuần)" },
        { id: "opt_D", label: "D", text: "Cấm vĩnh viễn không được chơi một phút nào" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Không quá 3 giờ mỗi tuần",
      correctExplanation: "Đoạn văn viết: \"children under the age of 18 are banned from playing video games more than three hours per week\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. 1 giờ mỗi ngày",
        diagnosticTitle: "Nhầm 3 giờ/tuần thành mỗi ngày 1 giờ",
        explanation: "Quy định quy định tối đa 3 giờ trong cả tuần (thường chia vào 1 giờ vào các tối thứ 6, thứ 7 và chủ nhật)."
      }
    },
    {
      id: "doer_w5d2_q02",
      roundIndex: 1,
      prompt: "Chọn giới từ đúng đi kèm cấu trúc cấm đoán: \"Children under 18 are banned ______ playing video games more than 3 hours per week.\"",
      options: [
        { id: "opt_A", label: "A", text: "from" },
        { id: "opt_B", label: "B", text: "to" },
        { id: "opt_C", label: "C", text: "against" },
        { id: "opt_D", label: "D", text: "with" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. from",
      correctExplanation: "Cấu trúc bị động chuẩn: be banned FROM doing something (bị cấm làm gì).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. to",
        diagnosticTitle: "Dùng to-infinitive sau ban",
        explanation: "Các động từ ngăn cản/cấm đoán như prevent, ban, prohibit luôn đi với \"from + V-ing\"."
      }
    },
    {
      id: "doer_w5d2_q03",
      roundIndex: 2,
      prompt: "Chọn từ loại đúng để diễn đạt trạng thái đắm chìm: \"Young people love to ______ themselves in a virtual gaming world.\"",
      options: [
        { id: "opt_A", label: "A", text: "immerse" },
        { id: "opt_B", label: "B", text: "immersion" },
        { id: "opt_C", label: "C", text: "immersive" },
        { id: "opt_D", label: "D", text: "immersely" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. immerse",
      correctExplanation: "Cấu trúc phản thân học thuật: \"immerse oneself in something\" (đắm mình/chìm đắm vào thế giới nào đó).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. immersion",
        diagnosticTitle: "Nhầm lẫn giữa động từ và danh từ",
        explanation: "Sau to-infinitive cần động từ nguyên thể \"immerse\", không dùng danh từ immersion."
      }
    },
    {
      id: "doer_w5d2_q04",
      roundIndex: 3,
      prompt: "Theo bài đọc \"Karaoke in Vietnam\", tác giả ngoại quốc đã nhận thấy điều gì về thái độ của đàn ông Việt Nam đối với việc hát karaoke?",
      options: [
        { id: "opt_A", label: "A", text: "Hầu hết đàn ông Việt Nam đều tự tin nghĩ rằng mình hát hay, nhắm mắt phiêu theo bài hát ngay cả khi hát trật nốt" },
        { id: "opt_B", label: "B", text: "Họ luôn e ngại và từ chối cầm mic hát trước đám đông" },
        { id: "opt_C", label: "C", text: "Họ chỉ hát khi được trả thù lao ca hát" },
        { id: "opt_D", label: "D", text: "Họ chỉ thích nghe ca sĩ chuyên nghiệp biểu diễn" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Hầu hết đàn ông Việt Nam đều tự tin nghĩ rằng mình hát hay, nhắm mắt phiêu theo bài hát ngay cả khi hát trật nốt",
      correctExplanation: "Tác giả hóm hỉnh miêu tả: \"Most Vietnamese men think they can sing. You can tell by the way they close their eyes and look to the heavens as they miss the high notes\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Họ luôn e ngại và từ chối",
        diagnosticTitle: "Suy đoán ngược lại hoàn toàn với tính cách vui vẻ cởi mở trong bài",
        explanation: "Bài đọc nhấn mạnh karaoke ở VN là một nét văn hóa bùng nổ, ai cũng say mê cầm mic hát hết mình."
      }
    },
    {
      id: "doer_w5d2_q05",
      roundIndex: 4,
      prompt: "Theo tác giả, bản chất sâu sắc của văn hóa hát Karaoke mà người Việt Nam thấu hiểu rất rõ là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Karaoke là phương tiện gắn kết con người (a means of human connection) và sẻ chia cảm xúc" },
        { id: "opt_B", label: "B", text: "Là cách duy nhất để kiếm tiền thưởng từ các cuộc thi âm nhạc" },
        { id: "opt_C", label: "C", text: "Là hoạt động để cạnh tranh xem ai có giọng hát kỹ thuật tốt hơn" },
        { id: "opt_D", label: "D", text: "Là dịp để quảng cáo các thiết bị loa đài âm thanh đắt tiền" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Karaoke là phương tiện gắn kết con người (a means of human connection) và sẻ chia cảm xúc",
      correctExplanation: "Đoạn F khẳng định: \"Music has the capacity to connect us. Karaoke is a means of human connection - a way for even terrible singers to immerse themselves in a universal art form\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Để cạnh tranh kỹ thuật giọng hát",
        diagnosticTitle: "Hiểu sai tinh thần gắn kết cộng đồng",
        explanation: "Bài viết nhấn mạnh karaoke không phải để phô diễn kỹ thuật chuyên nghiệp mà là để mọi người kết nối và vui cười cùng nhau."
      }
    },
    {
      id: "doer_w5d2_q06",
      roundIndex: 5,
      prompt: "Chọn từ thích hợp: \"Foreigners who can sing some popular Vietnamese songs can leave a good ______ on the locals.\"",
      options: [
        { id: "opt_A", label: "A", text: "impression" },
        { id: "opt_B", label: "B", text: "impressive" },
        { id: "opt_C", label: "C", text: "impress" },
        { id: "opt_D", label: "D", text: "impressively" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. impression",
      correctExplanation: "Collocation bất hủ: \"leave a good impression on somebody\" (để lại ấn tượng tốt đẹp trong lòng ai).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. impressive",
        diagnosticTitle: "Nhầm lẫn tính từ và danh từ sau mạo từ \"a\"",
        explanation: "Sau cụm \"a good + [Noun]\" phải là danh từ impression, không thể dùng tính từ impressive."
      }
    },
    {
      id: "doer_w5d2_q07",
      roundIndex: 6,
      prompt: "Trong bài nghe \"Events during Kenton Festival\", sự kiện lễ hội Kenton bắt đầu vào ngày nào?",
      options: [
        { id: "opt_A", label: "A", text: "16th of May" },
        { id: "opt_B", label: "B", text: "19th of May" },
        { id: "opt_C", label: "C", text: "15th of May" },
        { id: "opt_D", label: "D", text: "20th of May" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 16th of May",
      correctExplanation: "Người phụ trách phòng vé thông báo: \"the festival begins on the 16th of May and goes on till the 19th\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. 15th of May",
        diagnosticTitle: "Nhầm lẫn ngày du khách đến với ngày lễ hội bắt đầu",
        explanation: "Người phụ nữ nói bà ấy sẽ đến Kenton từ ngày 15, nhưng lễ hội chính thức khai mạc vào ngày 16/5."
      }
    },
    {
      id: "doer_w5d2_q08",
      roundIndex: 7,
      prompt: "Nhân vật lịch sử Helen Tungate được tôn vinh tại lễ hội Kenton nhân dịp kỷ niệm 100 năm ngày sinh từng làm nghề gì?",
      options: [
        { id: "opt_A", label: "A", text: "Scientist / Biologist (nhà khoa học / sinh học)" },
        { id: "opt_B", label: "B", text: "Mayor of the town (thị trưởng)" },
        { id: "opt_C", label: "C", text: "Choir singer (ca sĩ hợp xướng)" },
        { id: "opt_D", label: "D", text: "Army officer (sĩ quan quân đội)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Scientist / Biologist (nhà khoa học / sinh học)",
      correctExplanation: "Người phụ nữ nói: \"I certainly have heard of her. She was a scientist... I'm a biologist, so I've always been interested in her\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Mayor of the town",
        diagnosticTitle: "Nhầm với người khai mạc buổi lễ",
        explanation: "Thị trưởng (mayor) là người phát biểu khai mạc, còn vở kịch là nói về nhà khoa học nữ Helen Tungate."
      }
    },
    {
      id: "doer_w5d2_q09",
      roundIndex: 8,
      prompt: "Màn trình diễn pháo hoa (fireworks display) vào buổi tối nên được xem từ địa điểm nào để có góc nhìn đẹp nhất?",
      options: [
        { id: "opt_A", label: "A", text: "The park (công viên)" },
        { id: "opt_B", label: "B", text: "The town hall (tòa thị chính)" },
        { id: "opt_C", label: "C", text: "The central post office (bưu điện)" },
        { id: "opt_D", label: "D", text: "The roof of the library" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The park (công viên)",
      correctExplanation: "Chỉ dẫn trong bài nghe: \"You should go to the park to watch, as you'll get the best view from there, and the display takes place on the opposite side\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The town hall",
        diagnosticTitle: "Chọn vị trí trung tâm hành chính",
        explanation: "Bài nghe khẳng định công viên (the park) mới là nơi quan sát pháo hoa đẹp nhất bên bờ sông."
      }
    },
    {
      id: "doer_w5d2_q10",
      roundIndex: 9,
      prompt: "Từ \"centenary\" trong bài nghe (\"celebrating her centenary\") mang ý nghĩa là lễ kỷ niệm bao nhiêu năm?",
      options: [
        { id: "opt_A", label: "A", text: "100 năm (the 100th anniversary)" },
        { id: "opt_B", label: "B", text: "50 năm" },
        { id: "opt_C", label: "C", text: "200 năm" },
        { id: "opt_D", label: "D", text: "10 năm" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 100 năm (the 100th anniversary)",
      correctExplanation: "Gốc từ Latin \"cent-\" có nghĩa là 100. Centenary là lễ kỷ niệm tròn 100 năm (tròn 1 thế kỷ).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. 50 năm",
        diagnosticTitle: "Nhầm với golden jubilee (50 năm)",
        explanation: "Kỷ niệm 50 năm là golden jubilee, 100 năm là centenary / centennial."
      }
    }
  ],
  "WEEK 5 – DAY 3": [
    {
      id: "doer_w5d3_q01",
      roundIndex: 0,
      prompt: "Từ nào sau đây chứa cụm phụ âm (consonant cluster) gồm 3 phụ âm đứng liền nhau ở đầu từ?",
      options: [
        { id: "opt_A", label: "A", text: "street /str-/" },
        { id: "opt_B", label: "B", text: "play /pl-/" },
        { id: "opt_C", label: "C", text: "bread /br-/" },
        { id: "opt_D", label: "D", text: "clean /kl-/" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. street /str-/",
      correctExplanation: "\"Street\" bắt đầu bằng cụm 3 phụ âm /s-t-r/ (street, spring, scream, splash). Các từ còn lại chỉ có 2 phụ âm đầu.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. play",
        diagnosticTitle: "Chọn cụm chỉ có 2 phụ âm",
        explanation: "/pl-/ chỉ gồm 2 phụ âm p và l."
      }
    },
    {
      id: "doer_w5d3_q02",
      roundIndex: 1,
      prompt: "Từ \"comfortable\" /ˈkʌm.fə.tə.bl/ thường được phát âm chuẩn tự nhiên với bao nhiêu âm tiết (syllables)?",
      options: [
        { id: "opt_A", label: "A", text: "3 hoặc 4 âm tiết (thông dụng nhất là 3 âm tiết: /ˈkʌmf.tə.bl/)" },
        { id: "opt_B", label: "B", text: "Chính xác 5 âm tiết" },
        { id: "opt_C", label: "C", text: "Chỉ có 1 âm tiết" },
        { id: "opt_D", label: "D", text: "6 âm tiết" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 3 hoặc 4 âm tiết (thông dụng nhất là 3 âm tiết: /ˈkʌmf.tə.bl/)",
      correctExplanation: "Người bản xứ thường nuốt âm \"or\" để phát âm thành 3 âm tiết: /ˈkʌmf.tə.bəl/ (comf-ta-ble).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. 5 âm tiết",
        diagnosticTitle: "Đếm từng chữ cái com-for-ta-b-le",
        explanation: "Người học nhìn mặt chữ đếm âm tiết rất dễ phát âm thừa âm tiết làm mất tự nhiên."
      }
    },
    {
      id: "doer_w5d3_q03",
      roundIndex: 2,
      prompt: "Trọng âm chính (primary stress) của từ \"competitive\" nằm ở âm tiết thứ mấy?",
      options: [
        { id: "opt_A", label: "A", text: "Âm tiết thứ 2 (/kəmˈpet.ɪ.tɪv/)" },
        { id: "opt_B", label: "B", text: "Âm tiết thứ 1 (/ˈkɒm.pə.tɪ.tɪv/)" },
        { id: "opt_C", label: "C", text: "Âm tiết thứ 3" },
        { id: "opt_D", label: "D", text: "Âm tiết thứ 4" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Âm tiết thứ 2 (/kəmˈpet.ɪ.tɪv/)",
      correctExplanation: "Competitive có trọng âm rơi vào âm tiết thứ hai \"pet\". (Lưu ý: danh từ \"competition\" lại có trọng âm ở âm tiết thứ 3).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Âm tiết thứ 1",
        diagnosticTitle: "Nhầm với động từ gốc \"compete\" hoặc danh từ \"company\"",
        explanation: "Đây là từ rất hay bị học viên phát âm sai trọng âm vào âm tiết đầu tiên."
      }
    },
    {
      id: "doer_w5d3_q04",
      roundIndex: 3,
      prompt: "Trong cuộc hội thoại khi Khang gặp khó khăn trong quản lý khối lượng công việc, anh ấy nói: \"I'm having a hard time ______ my workload.\"",
      options: [
        { id: "opt_A", label: "A", text: "managing" },
        { id: "opt_B", label: "B", text: "to manage" },
        { id: "opt_C", label: "C", text: "manage" },
        { id: "opt_D", label: "D", text: "for manage" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. managing",
      correctExplanation: "Cấu trúc chuẩn: have a hard time / difficulty / trouble DOING something (V-ing), không dùng to-infinitive.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. to manage",
        diagnosticTitle: "Dùng to-V sau have a hard time",
        explanation: "Thói quen ghép to-V làm sai cấu trúc cố định have a hard time + V-ing."
      }
    },
    {
      id: "doer_w5d3_q05",
      roundIndex: 4,
      prompt: "Chọn dạng đúng của động từ sau \"struggle\": \"I am struggling ______ my English pronunciation.\"",
      options: [
        { id: "opt_A", label: "A", text: "to improve" },
        { id: "opt_B", label: "B", text: "improving" },
        { id: "opt_C", label: "C", text: "for improve" },
        { id: "opt_D", label: "D", text: "with to improve" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. to improve",
      correctExplanation: "Cấu trúc: struggle TO DO something (chật vật/gặp khó khăn để làm gì). (Lưu ý: struggle WITH + Noun).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. improving",
        diagnosticTitle: "Đồng hóa cấu trúc struggle với have a hard time V-ing",
        explanation: "Have a hard time đi với V-ing, nhưng động từ struggle lại đi với TO-infinitive."
      }
    },
    {
      id: "doer_w5d3_q06",
      roundIndex: 5,
      prompt: "Khi đưa ra lời khuyên một cách lịch sự, tinh tế cho bạn bè, mẫu câu nào sau đây phù hợp nhất?",
      options: [
        { id: "opt_A", label: "A", text: "My advice would be to stay calm and set clear goals." },
        { id: "opt_B", label: "B", text: "You must immediately do whatever I say." },
        { id: "opt_C", label: "C", text: "I order you to study 10 hours a day." },
        { id: "opt_D", label: "D", text: "My advice is you have to not talk." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. My advice would be to stay calm and set clear goals.",
      correctExplanation: "Cấu trúc đưa lời khuyên nhã nhặn, tự nhiên: \"My advice would be to + V\" hoặc \"If I were you, I would...\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. You must immediately do...",
        diagnosticTitle: "Dùng mệnh lệnh thô bạo (imperative/must)",
        explanation: "Trong giao tiếp Speaking, dùng must tạo cảm giác áp đặt, thiếu đi tính tương tác mềm mỏng."
      }
    },
    {
      id: "doer_w5d3_q07",
      roundIndex: 6,
      prompt: "Để tăng năng suất làm việc (productivity), lời khuyên nào sau đây được Hân gợi ý cho Khang?",
      options: [
        { id: "opt_A", label: "A", text: "Dùng planner trên Google Calendar, đặt mục tiêu rõ ràng và tắt các thông báo/tab gây xao nhãng" },
        { id: "opt_B", label: "B", text: "Nghỉ việc ngay lập tức để ở nhà chơi game" },
        { id: "opt_C", label: "C", text: "Làm việc thâu đêm suốt sáng không cần ngủ" },
        { id: "opt_D", label: "D", text: "Mở thật nhiều tab mạng xã hội cùng lúc" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Dùng planner trên Google Calendar, đặt mục tiêu rõ ràng và tắt các thông báo/tab gây xao nhãng",
      correctExplanation: "Hân khuyên: \"start using a planner on Google Calendar and set clear goals... limit distractions by turning off your phone and closing unnecessary tabs\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Làm việc thâu đêm",
        diagnosticTitle: "Nhầm thói quen xấu với giải pháp năng suất",
        explanation: "Làm việc thâu đêm chính là nguyên nhân gây mệt mỏi mà bài học đang tìm cách khắc phục."
      }
    },
    {
      id: "doer_w5d3_q08",
      roundIndex: 7,
      prompt: "Chọn câu viết đúng với liên từ chỉ sự tương phản đồng thời \"while\":",
      options: [
        { id: "opt_A", label: "A", text: "While some people prefer working remotely, others thrive in an office environment." },
        { id: "opt_B", label: "B", text: "While some people prefer working remotely, but others thrive in an office." },
        { id: "opt_C", label: "C", text: "While some people prefer to work remote, while others work office." },
        { id: "opt_D", label: "D", text: "Some people prefer remote, while that others office." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. While some people prefer working remotely, others thrive in an office environment.",
      correctExplanation: "Cấu trúc so sánh tương phản: \"While + Clause 1, Clause 2\". Không dùng thêm liên từ \"but\" ở mệnh đề chính.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. While..., but others...",
        diagnosticTitle: "Lỗi dùng cặp liên từ kép \"Although/While... but...\"",
        explanation: "Thói quen dịch tiếng Việt \"Mặc dù... nhưng...\" khiến học viên viết thừa liên từ \"but\"."
      }
    },
    {
      id: "doer_w5d3_q09",
      roundIndex: 8,
      prompt: "Khi gặp một dự án lớn phức tạp, phương pháp chia nhỏ thành các bước dễ quản lý hơn gọi là:",
      options: [
        { id: "opt_A", label: "A", text: "break tasks into smaller steps" },
        { id: "opt_B", label: "B", text: "cut jobs in pieces" },
        { id: "opt_C", label: "C", text: "smash works to parts" },
        { id: "opt_D", label: "D", text: "divide duties in slices" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. break tasks into smaller steps",
      correctExplanation: "Collocation chuẩn trong quản trị thời gian: \"break tasks/goals into smaller steps\" (chia nhỏ nhiệm vụ thành các bước thực hiện).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. cut jobs in pieces",
        diagnosticTitle: "Dịch từ vựng theo nghĩa đen của việc cắt gọt",
        explanation: "Cut jobs in pieces không phải là cụm từ tự nhiên trong quản lý công việc."
      }
    },
    {
      id: "doer_w5d3_q10",
      roundIndex: 9,
      prompt: "Thành ngữ mê tín vui \"touch wood\" (hoặc \"knock on wood\") mà người bản xứ hay nói trong hội thoại mang ý nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Trộm vía, cầu may mắn để điều xui xẻo không xảy ra" },
        { id: "opt_B", label: "B", text: "Yêu cầu mọi người cùng im lặng" },
        { id: "opt_C", label: "C", text: "Chê bai đồ nội thất bằng gỗ" },
        { id: "opt_D", label: "D", text: "Báo hiệu chuẩn bị kết thúc cuộc trò chuyện" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Trộm vía, cầu may mắn để điều xui xẻo không xảy ra",
      correctExplanation: "\"Touch wood\" (gõ vào đồ gỗ) là phong tục văn hóa nói sau khi nhắc đến một điều may mắn để tránh bị vận xui ập đến (tương đương chữ \"trộm vía\" trong tiếng Việt).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Chê bai đồ nội thất gỗ",
        diagnosticTitle: "Hiểu theo nghĩa đen của từ wood (gỗ)",
        explanation: "Đây là một thành ngữ văn hóa dân gian mang hàm nghĩa tâm linh cầu may, không liên quan đến nghề mộc."
      }
    }
  ]
};
