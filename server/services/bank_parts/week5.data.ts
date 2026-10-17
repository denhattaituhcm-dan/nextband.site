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
      prompt: "Trong bài đọc Karaoke in Vietnam, từ \"communal\" trong cụm \"one of its great communal joys\" ĐỒNG NGHĨA nhất với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "shared / collective (thuộc về tập thể, cộng đồng cùng chia sẻ)" },
        { id: "opt_B", label: "B", text: "private / solitary (riêng tư, đơn độc)" },
        { id: "opt_C", label: "C", text: "commercial (mang tính thương mại)" },
        { id: "opt_D", label: "D", text: "competitive (có tính cạnh tranh gay gắt)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. shared / collective (thuộc về tập thể, cộng đồng cùng chia sẻ)",
      correctExplanation: "\"Communal\" = mang tính cộng đồng, tập thể cùng chung vui, đồng nghĩa với shared/collective.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. private / solitary",
        diagnosticTitle: "Chọn nhầm từ trái nghĩa",
        explanation: "Private/solitary là riêng tư cá nhân, trái ngược hoàn toàn với ý nghĩa cộng đồng của communal."
      }
    },
    {
      id: "doer_w5d2_q02",
      roundIndex: 1,
      prompt: "Từ TRÁI NGHĨA với \"inappropriate\" trong câu \"a karaoke machine pops up at completely inappropriate moments\" là:",
      options: [
        { id: "opt_A", label: "A", text: "suitable / fitting (thích hợp, đúng lúc, phù hợp hoàn cảnh)" },
        { id: "opt_B", label: "B", text: "hilarious (vui nhộn, buồn cười)" },
        { id: "opt_C", label: "C", text: "bizarre (kỳ dị, quái đản)" },
        { id: "opt_D", label: "D", text: "awkward (ngượng ngùng)" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. suitable / fitting (thích hợp, đúng lúc, phù hợp hoàn cảnh)",
      correctExplanation: "Tiền tố in- mang nghĩa phủ định: inappropriate = không thích hợp, vô duyên. Từ trái nghĩa trực tiếp là \"suitable\" hoặc \"fitting\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. bizarre",
        diagnosticTitle: "Nhầm lẫn giữa từ đồng nghĩa và trái nghĩa",
        explanation: "Bizarre (kỳ lạ) mang tính chất tương tự với inappropriate trong ngữ cảnh bất thường. Đề bài yêu cầu tìm từ TRÁI NGHĨA."
      }
    },
    {
      id: "doer_w5d2_q03",
      roundIndex: 2,
      prompt: "Trong câu: \"Vietnamese folk songs are a bit of a nightmare for the untrained tongue\", cụm ẩn dụ \"the untrained tongue\" ám chỉ điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Người nước ngoài chưa được luyện tập phát âm hệ thống thanh điệu tiếng Việt phức tạp" },
        { id: "opt_B", label: "B", text: "Người bị mất giọng sau khi hát quá nhiều bài" },
        { id: "opt_C", label: "C", text: "Thiết bị micro không thu được âm thanh chất lượng cao" },
        { id: "opt_D", label: "D", text: "Ca sĩ chuyên nghiệp từ chối hát nhạc dân gian" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Người nước ngoài chưa được luyện tập phát âm hệ thống thanh điệu tiếng Việt phức tạp",
      correctExplanation: "\"Untrained tongue\" là lối nói ẩn dụ chỉ chiếc lưỡi chưa được tập luyện để uốn âm và phát âm các thanh sắc, hỏi, ngã, nặng trong tiếng Việt.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Người bị mất giọng",
        diagnosticTitle: "Dịch nghĩa đen từ \"tongue\" thành vấn đề cổ họng",
        explanation: "Đây là cách nói tu từ về kỹ năng phát âm ngoại ngữ, không phải bệnh lý mất giọng."
      }
    },
    {
      id: "doer_w5d2_q04",
      roundIndex: 3,
      prompt: "Collocation chuẩn trong bài: \"Singing some traditional songs helps foreigners leave a favorable ______ on the local residents.\"",
      options: [
        { id: "opt_A", label: "A", text: "impression" },
        { id: "opt_B", label: "B", text: "imprint" },
        { id: "opt_C", label: "C", text: "pressure" },
        { id: "opt_D", label: "D", text: "oppression" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. impression",
      correctExplanation: "Collocation học thuật: \"leave a favorable/good impression on somebody\" (để lại ấn tượng tốt đẹp trong lòng ai).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. imprint",
        diagnosticTitle: "Dùng từ dấu ấn vật lý thay vì ấn tượng tâm lý",
        explanation: "Imprint là dấu vết in hằn cơ học, còn tạo ấn tượng cảm xúc với người khác bắt buộc dùng \"impression\"."
      }
    },
    {
      id: "doer_w5d2_q05",
      roundIndex: 4,
      prompt: "Chọn động từ đi với giới từ FROM trong quy định pháp luật: \"Minors are strictly banned ______ engaging in online gaming for more than 3 hours weekly.\"",
      options: [
        { id: "opt_A", label: "A", text: "from" },
        { id: "opt_B", label: "B", text: "to" },
        { id: "opt_C", label: "C", text: "against" },
        { id: "opt_D", label: "D", text: "with" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. from",
      correctExplanation: "Cấu trúc cấm đoán pháp lý: \"be banned / prohibited FROM doing something\" (bị nghiêm cấm làm việc gì).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. to",
        diagnosticTitle: "Dùng to-V sau động từ ban",
        explanation: "Động từ ban không đi với to-V mà bắt buộc dùng giới từ \"from + V-ing\"."
      }
    },
    {
      id: "doer_w5d2_q06",
      roundIndex: 5,
      prompt: "Chọn từ loại đúng để hoàn thành cấu trúc phản thân: \"Players love to ______ themselves in a fantasy virtual universe.\"",
      options: [
        { id: "opt_A", label: "A", text: "immerse" },
        { id: "opt_B", label: "B", text: "immersion" },
        { id: "opt_C", label: "C", text: "immersive" },
        { id: "opt_D", label: "D", text: "immersely" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. immerse",
      correctExplanation: "Cấu trúc động từ nguyên thể sau to: \"immerse oneself in sth\" (đắm chìm bản thân vào điều gì).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. immersion",
        diagnosticTitle: "Dùng nhầm danh từ sau to",
        explanation: "Sau \"love to\" cần một động từ nguyên mẫu (immerse), không dùng danh từ immersion."
      }
    },
    {
      id: "doer_w5d2_q07",
      roundIndex: 6,
      prompt: "Từ vựng chỉ sự kiện kỷ niệm tròn 100 năm: Trong cụm \"celebrating Helen Tungate's centenary\", từ \"centenary\" có nghĩa là:",
      options: [
        { id: "opt_A", label: "A", text: "Lễ kỷ niệm tròn 100 năm (the 100th anniversary)" },
        { id: "opt_B", label: "B", text: "Lễ kỷ niệm 50 năm nửa thế kỷ" },
        { id: "opt_C", label: "C", text: "Lễ tang tưởng niệm người đã khuất" },
        { id: "opt_D", label: "D", text: "Lễ nhậm chức thị trưởng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Lễ kỷ niệm tròn 100 năm (the 100th anniversary)",
      correctExplanation: "Gốc từ Latin \"cent-\" = 100 (như century: thế kỷ). \"Centenary\" là lễ kỷ niệm tròn đúng 100 năm.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Lễ kỷ niệm 50 năm",
        diagnosticTitle: "Nhầm lẫn với golden jubilee (50 năm)",
        explanation: "50 năm là jubilee, 100 năm là centenary / centennial."
      }
    },
    {
      id: "doer_w5d2_q08",
      roundIndex: 7,
      prompt: "Cụm danh từ \"mixed reactions\" trong câu \"The gaming curfew caused mixed reactions among citizens\" mang sắc thái gì?",
      options: [
        { id: "opt_A", label: "A", text: "Các phản ứng trái chiều (người khen người chê, kẻ đồng tình kẻ phản đối)" },
        { id: "opt_B", label: "B", text: "100% người dân đều kịch liệt phản đối" },
        { id: "opt_C", label: "C", text: "Toàn bộ xã hội đồng thuận tuyệt đối không ý kiến" },
        { id: "opt_D", label: "D", text: "Người dân hoàn toàn thờ ơ không ai quan tâm" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Các phản ứng trái chiều (người khen người chê, kẻ đồng tình kẻ phản đối)",
      correctExplanation: "\"Mixed reactions\" miêu tả luồng ý kiến phân hóa: phụ huynh thì vui mừng trong khi giới trẻ coi đó là vi phạm quyền tự do.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Toàn bộ xã hội đồng thuận",
        diagnosticTitle: "Hiểu sai chữ mixed thành hòa hợp đồng thuận",
        explanation: "\"Mixed\" là pha trộn các ý kiến mâu thuẫn trái chiều nhau, không phải đồng thuận một chiều."
      }
    },
    {
      id: "doer_w5d2_q09",
      roundIndex: 8,
      prompt: "VẬN DỤNG NGỮ CẢNH MỚI: Chọn từ thích hợp điền vào câu: \"The interactive theatre play provided an exceptionally ______ experience for the audience, making them feel part of the story.\"",
      options: [
        { id: "opt_A", label: "A", text: "immersive" },
        { id: "opt_B", label: "B", text: "bland" },
        { id: "opt_C", label: "C", text: "exhausted" },
        { id: "opt_D", label: "D", text: "compulsory" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. immersive",
      correctExplanation: "\"An immersive experience\" là tính từ cao cấp chỉ trải nghiệm cuốn hút đến mức người tham gia như hòa mình hoàn toàn vào không gian tác phẩm.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. bland",
        diagnosticTitle: "Chọn tính từ tiêu cực mâu thuẫn ngữ cảnh",
        explanation: "Bland là nhạt nhẽo vô vị, trái ngược với sự cuốn hút của vở kịch tương tác."
      }
    },
    {
      id: "doer_w5d2_q10",
      roundIndex: 9,
      prompt: "PARAPHRASE: Câu \"Music has the capacity to connect us and serves as a means of human connection across cultures\" được diễn đạt lại tương đương nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "Musical expression possesses the unique power to bridge social divides and foster interpersonal bonds." },
        { id: "opt_B", label: "B", text: "Foreigners are strictly prohibited from singing local folk songs without formal artistic certifications." },
        { id: "opt_C", label: "C", text: "Music divides communities because people argue over who misses the high notes." },
        { id: "opt_D", label: "D", text: "Only professional vocalists have the legal right to express themselves in communal gatherings." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Musical expression possesses the unique power to bridge social divides and foster interpersonal bonds.",
      correctExplanation: "\"Bridge social divides and foster interpersonal bonds\" paraphrase tuyệt vời cho \"capacity to connect us and serves as a means of human connection\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Music divides communities",
        diagnosticTitle: "Đảo ngược thông điệp gắn kết thành chia rẽ",
        explanation: "Đoạn văn ca ngợi âm nhạc là cầu nối nhân văn, không hề chia rẽ người nghe."
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
