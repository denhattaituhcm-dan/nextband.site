/**
 * Question Bank for Week 4 (Day 1, Day 2, Day 3)
 * DOER Coursebook 2027
 */

export const WEEK_4_QUESTIONS: Record<string, any[]> = {
  "WEEK 4 – DAY 1": [
    {
      id: "doer_w4d1_q01",
      roundIndex: 0,
      prompt: "Chọn vị trí và trật tự từ đúng trong câu: \"Họ vừa mua một ngôi nhà hiện đại, rộng rãi ở ngoại ô.\"",
      options: [
        { id: "opt_A", label: "A", text: "They have just bought a spacious, modern house in the suburbs." },
        { id: "opt_B", label: "B", text: "They have just bought a house spacious modern in the suburbs." },
        { id: "opt_C", label: "C", text: "They just bought a modern spacious house suburbs in." },
        { id: "opt_D", label: "D", text: "They have bought just modern a spacious house in suburbs." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. They have just bought a spacious, modern house in the suburbs.",
      correctExplanation: "Tính từ bổ nghĩa (spacious: kích thước/không gian, modern: thời đại/tuổi thọ) đứng trước danh từ chính \"house\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. a house spacious modern",
        diagnosticTitle: "Lỗi trật tự từ tiếng Việt (Danh từ trước Tính từ)",
        explanation: "Người Việt có thói quen nói danh từ rồi mới đến tính từ (ngôi nhà rộng rãi), trong khi tiếng Anh tính từ đứng trước danh từ."
      }
    },
    {
      id: "doer_w4d1_q02",
      roundIndex: 1,
      prompt: "Chọn từ loại đúng: \"The government took ______ actions against tech companies that violated labor laws.\"",
      options: [
        { id: "opt_A", label: "A", text: "strict" },
        { id: "opt_B", label: "B", text: "strictly" },
        { id: "opt_C", label: "C", text: "strictness" },
        { id: "opt_D", label: "D", text: "stricten" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. strict",
      correctExplanation: "Trước danh từ \"actions\" cần một tính từ (adjective) để bổ nghĩa: \"strict actions\" (những hành động/biện pháp nghiêm khắc).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. strictly",
        diagnosticTitle: "Nhầm vị trí tính từ và trạng từ",
        explanation: "Thấy động từ \"took\" nên tưởng cần trạng từ \"strictly\", nhưng thực chất từ này bổ nghĩa trực tiếp cho danh từ \"actions\"."
      }
    },
    {
      id: "doer_w4d1_q03",
      roundIndex: 2,
      prompt: "Chọn trạng từ bổ nghĩa cho động từ hành động: \"She explained the complicated grammar rule ______ so that everyone understood.\"",
      options: [
        { id: "opt_A", label: "A", text: "clearly" },
        { id: "opt_B", label: "B", text: "clear" },
        { id: "opt_C", label: "C", text: "clarity" },
        { id: "opt_D", label: "D", text: "clearness" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. clearly",
      correctExplanation: "Động từ hành động \"explained\" cần một trạng từ chỉ cách thức (Adverb of manner) bổ nghĩa: explained something clearly.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. clear",
        diagnosticTitle: "Dùng tính từ thay vì trạng từ bổ nghĩa cho động từ",
        explanation: "Clear là tính từ, chỉ đi sau linking verb (The rule is clear); bổ nghĩa cho động từ thường explain phải dùng phó từ clearly."
      }
    },
    {
      id: "doer_w4d1_q04",
      roundIndex: 3,
      prompt: "Chọn câu viết đúng ngữ pháp với trạng từ tần suất: \"Anh ấy hiếm khi thức khuya vào các ngày trong tuần.\"",
      options: [
        { id: "opt_A", label: "A", text: "He rarely stays up late on weekdays." },
        { id: "opt_B", label: "B", text: "He stays rarely up late on weekdays." },
        { id: "opt_C", label: "C", text: "Rarely he stays up late on weekdays." },
        { id: "opt_D", label: "D", text: "He stays up late rarely on weekdays." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. He rarely stays up late on weekdays.",
      correctExplanation: "Trạng từ tần suất (rarely, always, usually, often) đứng trước động từ thường (stays up) và sau động từ to be.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. He stays rarely up late",
        diagnosticTitle: "Chèn trạng từ vào giữa phrasal verb",
        explanation: "Trạng từ tần suất đứng trước toàn bộ cụm động từ thường, không chèn vào giữa verb và particle."
      }
    },
    {
      id: "doer_w4d1_q05",
      roundIndex: 4,
      prompt: "Chọn câu viết đúng cấu trúc: \"Sau nhiều năm làm việc chăm chỉ, anh ấy đã có được công việc trong mơ ở Google.\"",
      options: [
        { id: "opt_A", label: "A", text: "After years of hard work, he landed his dream job at Google." },
        { id: "opt_B", label: "B", text: "After years of work hardly, he got dream job in Google." },
        { id: "opt_C", label: "C", text: "After hard working years, he made dream job at Google." },
        { id: "opt_D", label: "D", text: "After many hardly work years, he took his dream job on Google." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. After years of hard work, he landed his dream job at Google.",
      correctExplanation: "\"Hard work\" (chăm chỉ), thành ngữ \"land a dream job\" (đạt được công việc mơ ước). \"Hardly\" là hiếm khi/hầu như không, không mang nghĩa chăm chỉ.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. work hardly",
        diagnosticTitle: "Nhầm lẫn giữa \"hard\" và \"hardly\"",
        explanation: "\"Hard\" vừa là tính từ vừa là trạng từ mang nghĩa chăm chỉ; \"hardly\" là trạng từ phủ định nghĩa là hầu như không."
      }
    },
    {
      id: "doer_w4d1_q06",
      roundIndex: 5,
      prompt: "Chọn tính từ thích hợp điền vào câu: \"Regular exercise reduces the risk of ______ diseases such as diabetes.\"",
      options: [
        { id: "opt_A", label: "A", text: "chronic" },
        { id: "opt_B", label: "B", text: "chronically" },
        { id: "opt_C", label: "C", text: "chronicle" },
        { id: "opt_D", label: "D", text: "chronology" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. chronic",
      correctExplanation: "Tính từ học thuật: \"chronic diseases\" (các bệnh mãn tính, bệnh kéo dài dai dẳng như tiểu đường, tim mạch).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. chronically",
        diagnosticTitle: "Chọn sai dạng từ loại",
        explanation: "Trước danh từ \"diseases\" phải là một tính từ, không dùng trạng từ chronically."
      }
    },
    {
      id: "doer_w4d1_q07",
      roundIndex: 6,
      prompt: "Chọn câu viết đúng cấu trúc trạng từ chỉ mức độ: \"Bài thi IELTS tương đối khó nhưng cô ấy đã vượt qua xuất sắc.\"",
      options: [
        { id: "opt_A", label: "A", text: "The IELTS test was relatively difficult, but she passed with flying colors." },
        { id: "opt_B", label: "B", text: "The IELTS test was relation difficult, but she passed great." },
        { id: "opt_C", label: "C", text: "The IELTS test was relative difficult, but she passed brilliantly." },
        { id: "opt_D", label: "D", text: "The IELTS test was relatively difficulty, but she passed." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The IELTS test was relatively difficult, but she passed with flying colors.",
      correctExplanation: "Trạng từ mức độ \"relatively\" (tương đối) bổ nghĩa cho tính từ \"difficult\". Thành ngữ \"pass with flying colors\" nghĩa là đạt kết quả rực rỡ.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. relative difficult",
        diagnosticTitle: "Dùng tính từ bổ nghĩa cho tính từ",
        explanation: "Bổ nghĩa cho một tính từ khác (difficult) bắt buộc phải là trạng từ (relatively), không thể dùng tính từ relative."
      }
    },
    {
      id: "doer_w4d1_q08",
      roundIndex: 7,
      prompt: "Chọn cách diễn đạt tính từ đúng trong miêu tả tính cách: \"Cô ấy là một người rất chu đáo và có trách nhiệm cao.\"",
      options: [
        { id: "opt_A", label: "A", text: "She is a highly responsible and considerate person." },
        { id: "opt_B", label: "B", text: "She is a high responsible and consider person." },
        { id: "opt_C", label: "C", text: "She is a responsibly high and considerable person." },
        { id: "opt_D", label: "D", text: "She is a high-responsibly person." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. She is a highly responsible and considerate person.",
      correctExplanation: "Cụm tính từ: highly responsible (rất có trách nhiệm) và considerate (chu đáo).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. considerable person",
        diagnosticTitle: "Nhầm lẫn giữa considerate và considerable",
        explanation: "\"Considerate\" là chu đáo, biết nghĩ cho người khác; còn \"considerable\" là đáng kể/to lớn (về số lượng). Đây là bẫy từ vựng kinh điển."
      }
    },
    {
      id: "doer_w4d1_q09",
      roundIndex: 8,
      prompt: "Chọn từ điền vào chỗ trống: \"The company's profits increased ______ during the last quarter.\"",
      options: [
        { id: "opt_A", label: "A", text: "dramatically" },
        { id: "opt_B", label: "B", text: "dramatic" },
        { id: "opt_C", label: "C", text: "drama" },
        { id: "opt_D", label: "D", text: "dramatize" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. dramatically",
      correctExplanation: "Bổ nghĩa cho động từ tăng \"increased\" trong IELTS Writing Task 1 phải là trạng từ chỉ tốc độ/mức độ: increased dramatically.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. dramatic",
        diagnosticTitle: "Dùng tính từ sau động từ thường",
        explanation: "Chỉ khi dùng danh từ (\"saw a dramatic increase\") mới dùng tính từ; sau động từ thường \"increased\" phải là phó từ dramatically."
      }
    },
    {
      id: "doer_w4d1_q10",
      roundIndex: 9,
      prompt: "Chọn câu dùng đúng tính từ và trạng từ: \"Mặc dù anh ấy lái xe cẩn thận, đường trơn trượt vẫn rất nguy hiểm.\"",
      options: [
        { id: "opt_A", label: "A", text: "Although he drove carefully, the slippery road was still extremely dangerous." },
        { id: "opt_B", label: "B", text: "Although he drove careful, the slippery road was still extreme dangerous." },
        { id: "opt_C", label: "C", text: "Although he drove with carefully, the slipper road was dangerous extremely." },
        { id: "opt_D", label: "D", text: "Although he drove carefully, the slip road was still danger." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Although he drove carefully, the slippery road was still extremely dangerous.",
      correctExplanation: "\"Drove carefully\" (động từ + trạng từ), \"slippery road\" (tính từ + danh từ), \"extremely dangerous\" (trạng từ + tính từ).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. drove careful... extreme dangerous",
        diagnosticTitle: "Quên đuôi -ly ở cả hai vị trí phó từ",
        explanation: "Drove cần phó từ carefully, và dangerous cần phó từ extremely bổ nghĩa."
      }
    }
  ],
  "WEEK 4 – DAY 2": [
    {
      id: "doer_w4d2_q01",
      roundIndex: 0,
      prompt: "Theo nghiên cứu về bữa ăn sáng trong bài đọc \"The truth behind some common health beliefs\", nhóm phụ nữ thừa cân ăn bữa sáng lớn có kết quả gì?",
      options: [
        { id: "opt_A", label: "A", text: "Giảm cân nhiều hơn nhóm ăn bữa sáng ít calo và ăn tối nhiều" },
        { id: "opt_B", label: "B", text: "Tăng cân gấp đôi nhóm ăn bữa tối nhiều" },
        { id: "opt_C", label: "C", text: "Bị mắc bệnh tiểu đường ngay lập tức" },
        { id: "opt_D", label: "D", text: "Không thấy có bất kỳ sự khác biệt nào về thể trọng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Giảm cân nhiều hơn nhóm ăn bữa sáng ít calo và ăn tối nhiều",
      correctExplanation: "Bài đọc nêu: \"those who ate a large breakfast saw greater weight loss than another group who had a low-calorie breakfast and a larger dinner\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tăng cân gấp đôi",
        diagnosticTitle: "Hiểu sai nghĩa của cụm greater weight loss",
        explanation: "\"Greater weight loss\" nghĩa là giảm cân nhiều hơn, mang ý nghĩa tích cực, không phải tăng cân."
      }
    },
    {
      id: "doer_w4d2_q02",
      roundIndex: 1,
      prompt: "Theo nhà nghiên cứu Brady Holmer, tại sao việc bỏ bữa sáng (skipping breakfast) lại có thể dẫn đến việc tăng cân?",
      options: [
        { id: "opt_A", label: "A", text: "Vì nó làm tăng mức độ đói vào cuối ngày, dẫn đến việc ăn quá mức (overeating)" },
        { id: "opt_B", label: "B", text: "Vì cơ thể ngừng đốt cháy calo hoàn toàn trong 24 giờ" },
        { id: "opt_C", label: "C", text: "Vì người bỏ bữa sáng thường không uống nước" },
        { id: "opt_D", label: "D", text: "Vì bỏ bữa sáng làm giảm dung tích dạ dày" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Vì nó làm tăng mức độ đói vào cuối ngày, dẫn đến việc ăn quá mức (overeating)",
      correctExplanation: "Holmer giải thích: \"skipping breakfast leads to increased hunger levels later in the day, and this results in people overeating\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Cơ thể ngừng đốt calo hoàn toàn",
        diagnosticTitle: "Suy đoán phi khoa học",
        explanation: "Bài đọc giải thích rõ ràng nguyên nhân nằm ở tâm lý thèm ăn và ăn bù quá mức vào buổi chiều tối."
      }
    },
    {
      id: "doer_w4d2_q03",
      roundIndex: 2,
      prompt: "Thông điệp kết luận của bài viết về việc có nên ăn bữa sáng hay không là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tùy thuộc vào từng cá nhân; nếu có xu hướng ăn quá độ vào cuối ngày thì một bữa sáng lớn sẽ có ích" },
        { id: "opt_B", label: "B", text: "Bắt buộc 100% mọi người trên thế giới phải ăn thật nhiều vào bữa sáng" },
        { id: "opt_C", label: "C", text: "Tất cả mọi người nên bỏ bữa sáng để thanh lọc cơ thể" },
        { id: "opt_D", label: "D", text: "Bữa sáng chỉ cần một tách cà phê là đủ cho mọi cơ địa" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tùy thuộc vào từng cá nhân; nếu có xu hướng ăn quá độ vào cuối ngày thì một bữa sáng lớn sẽ có ích",
      correctExplanation: "Bài kết luận: \"breakfast is important if it's something that you enjoy... Skipping it may have varying effects for different people. However, if you tend to overeat later in the day, a larger breakfast could help\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bắt buộc 100% mọi người phải ăn nhiều",
        diagnosticTitle: "Tuyệt đối hóa lời khuyên khoa học",
        explanation: "Bài đọc nhấn mạnh tính cá nhân hóa (varying effects for different people), không có công thức cứng nhắc cho tất cả."
      }
    },
    {
      id: "doer_w4d2_q04",
      roundIndex: 3,
      prompt: "Nguồn gốc của con số \"10,000 bước chân mỗi ngày\" xuất hiện lần đầu tiên từ khi nào?",
      options: [
        { id: "opt_A", label: "A", text: "Xuất hiện từ những năm 1960 và ban đầu không dựa trên bất kỳ cơ sở khoa học nào" },
        { id: "opt_B", label: "B", text: "Được Tổ chức Y tế Thế giới (WHO) chứng minh năm 2020" },
        { id: "opt_C", label: "C", text: "Được các vận động viên Olympic Hy Lạp cổ đại phát minh" },
        { id: "opt_D", label: "D", text: "Được kiểm nghiệm tại một bệnh viện tim mạch năm 2022" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Xuất hiện từ những năm 1960 và ban đầu không dựa trên bất kỳ cơ sở khoa học nào",
      correctExplanation: "Đoạn văn viết: \"this number wasn't based on any science when it first came up in the 1960s, but it might be good advice\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Được WHO chứng minh năm 2020",
        diagnosticTitle: "Gán ghép tổ chức y tế cho chiến dịch quảng bá cũ",
        explanation: "Con số 10,000 bước thực chất bắt nguồn từ một chiến dịch tiếp thị máy đếm bước chân ở Nhật thập niên 1960."
      }
    },
    {
      id: "doer_w4d2_q05",
      roundIndex: 4,
      prompt: "Theo nghiên cứu năm 2022, điều gì xảy ra với lợi ích sức khỏe sau khi người đi bộ vượt mốc 10,000 bước?",
      options: [
        { id: "opt_A", label: "A", text: "Lợi ích gia tăng bắt đầu giảm dần (the benefits decrease after hitting the mark)" },
        { id: "opt_B", label: "B", text: "Nguy cơ mắc bệnh tim mạch lập tức tăng vọt" },
        { id: "opt_C", label: "C", text: "Cơ thể bị tổn thương xương khớp vĩnh viễn" },
        { id: "opt_D", label: "D", text: "Lợi ích tăng gấp đôi sau mỗi 1,000 bước tiếp theo" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Lợi ích gia tăng bắt đầu giảm dần (the benefits decrease after hitting the mark)",
      correctExplanation: "Bài viết chỉ ra đường cong hiệu quả đạt ngưỡng: \"However, the benefits decrease after hitting the 10,000-step mark\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nguy cơ mắc bệnh tim mạch tăng vọt",
        diagnosticTitle: "Hiểu sai \"benefits decrease\" thành \"tác hại nguy hiểm\"",
        explanation: "Lợi ích giảm dần (diminishing returns) nghĩa là không thu thêm được nhiều lợi ích tăng thêm, chứ không phải gây hại."
      }
    },
    {
      id: "doer_w4d2_q06",
      roundIndex: 5,
      prompt: "Đi bộ bao nhiêu bước mỗi ngày kết hợp với tốc độ nhanh hơn cũng đã có hiệu quả giảm nguy cơ mắc chứng sa sút trí tuệ (dementia)?",
      options: [
        { id: "opt_A", label: "A", text: "Chỉ khoảng 3,800 bước mỗi ngày" },
        { id: "opt_B", label: "B", text: "Ít nhất 15,000 bước mỗi ngày" },
        { id: "opt_C", label: "C", text: "Chính xác 10,000 bước không hơn không kém" },
        { id: "opt_D", label: "D", text: "500 bước mỗi giờ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chỉ khoảng 3,800 bước mỗi ngày",
      correctExplanation: "Nghiên cứu nêu rõ: \"walking just 3,800 steps per day can be effective in reducing the risk of dementia, but a faster walking pace is also beneficial\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Chính xác 10,000 bước",
        diagnosticTitle: "Cố chấp với con số 10,000 bước",
        explanation: "Nghiên cứu nhấn mạnh ngay cả 3,800 bước với nhịp chân nhanh cũng đã mang lại lợi ích bảo vệ não bộ rõ rệt."
      }
    },
    {
      id: "doer_w4d2_q07",
      roundIndex: 6,
      prompt: "Lý do vì sao nhiều nghiên cứu trước đây kết luận \"thịt đỏ (red meat) có hại cho sức khỏe\" có thể chưa chính xác?",
      options: [
        { id: "opt_A", label: "A", text: "Vì các nghiên cứu đó không phân biệt giữa thịt đỏ chế biến sẵn và thịt đỏ chưa qua chế biến" },
        { id: "opt_B", label: "B", text: "Vì các nhà khoa học đã dùng thịt giả để làm thí nghiệm" },
        { id: "opt_C", label: "C", text: "Vì người tham gia thí nghiệm chỉ ăn toàn mỡ động vật" },
        { id: "opt_D", label: "D", text: "Vì thịt đỏ thực chất không chứa bất kỳ chất béo nào" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Vì các nghiên cứu đó không phân biệt giữa thịt đỏ chế biến sẵn và thịt đỏ chưa qua chế biến",
      correctExplanation: "Đoạn C giải thích: \"many studies don't distinguish between processed (bacon, sausages, burgers) and unprocessed red meat intake\".",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Thịt đỏ không chứa chất béo",
        diagnosticTitle: "Sai kiến thức dinh dưỡng cơ bản",
        explanation: "Thịt đỏ có chứa chất béo, nhưng sự khác biệt sống còn nằm ở các chất bảo quản độc hại trong thịt chế biến sẵn (processed meat)."
      }
    },
    {
      id: "doer_w4d2_q08",
      roundIndex: 7,
      prompt: "Khuyến nghị hiện tại của các tổ chức y tế lớn đối với việc ăn thịt đỏ chưa qua chế biến (unprocessed red meat) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Mọi người vẫn có thể tiếp tục ăn thịt đỏ chưa qua chế biến một cách hợp lý" },
        { id: "opt_B", label: "B", text: "Cấm hoàn toàn việc tiêu thụ bất kỳ loại thịt đỏ nào" },
        { id: "opt_C", label: "C", text: "Chỉ cho phép ăn thịt xông khói và xúc xích" },
        { id: "opt_D", label: "D", text: "Yêu cầu thay thế toàn bộ bằng thức ăn tổng hợp" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Mọi người vẫn có thể tiếp tục ăn thịt đỏ chưa qua chế biến một cách hợp lý",
      correctExplanation: "Bài đọc dẫn lời: \"major health organisations have recommended that people can continue to eat unprocessed red meat\".",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Cấm hoàn toàn",
        diagnosticTitle: "Đánh đồng mọi loại thịt đỏ đều độc hại",
        explanation: "Tổ chức y tế không cấm thịt đỏ tươi sống chưa chế biến mà chỉ cảnh báo thịt chế biến sẵn (processed meats)."
      }
    },
    {
      id: "doer_w4d2_q09",
      roundIndex: 8,
      prompt: "Xét câu True/False/Not Given: \"Major health organizations recommend that people avoid eating all types of red meat.\" Đáp án là:",
      options: [
        { id: "opt_A", label: "A", text: "FALSE" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" },
        { id: "opt_D", label: "D", text: "CANNOT BE DETERMINED" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. FALSE",
      correctExplanation: "Thông tin này trực tiếp đối lập với câu trong bài (\"major health organisations have recommended that people CAN CONTINUE to eat unprocessed red meat\"), do đó là FALSE.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. NOT GIVEN",
        diagnosticTitle: "Không đối chiếu được từ phủ định tuyệt đối \"all types\"",
        explanation: "Bài đã nêu rõ ngoại lệ cho thịt chưa chế biến, nên khẳng định cấm \"all types\" là hoàn toàn sai (FALSE)."
      }
    },
    {
      id: "doer_w4d2_q10",
      roundIndex: 9,
      prompt: "Từ \"cardiovascular\" trong cụm từ \"cardiovascular disease\" chỉ nhóm bệnh liên quan đến cơ quan nào trong cơ thể?",
      options: [
        { id: "opt_A", label: "A", text: "Tim mạch và hệ tuần hoàn máu (heart and blood vessels)" },
        { id: "opt_B", label: "B", text: "Phổi và hệ hô hấp" },
        { id: "opt_C", label: "C", text: "Dạ dày và hệ tiêu hóa" },
        { id: "opt_D", label: "D", text: "Não bộ và hệ thần kinh" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tim mạch và hệ tuần hoàn máu (heart and blood vessels)",
      correctExplanation: "\"Cardiovascular\" (cardio: tim, vascular: mạch máu) chỉ hệ thống tim mạch.",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phổi và hệ hô hấp",
        diagnosticTitle: "Nhầm tim mạch với hô hấp (respiratory)",
        explanation: "Hô hấp là respiratory, còn cardiovascular luôn là tim mạch."
      }
    }
  ],
  "WEEK 4 – DAY 3": [
    {
      id: "doer_w4d3_q01",
      roundIndex: 0,
      prompt: "Để phát âm chuẩn phụ âm khó /θ/ (như trong \"think\", \"math\"), kỹ thuật quan trọng nhất của lưỡi là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đưa đầu lưỡi ra ngoài, đặt giữa hai hàm răng cửa và đẩy luồng hơi tạo ma sát nhẹ" },
        { id: "opt_B", label: "B", text: "Uốn cong đầu lưỡi chạm vào ngạc mềm phía sau" },
        { id: "opt_C", label: "C", text: "Cắn chặt hai môi lại và bật hơi như âm /t/" },
        { id: "opt_D", label: "D", text: "Rút sâu lưỡi vào trong cuống họng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đưa đầu lưỡi ra ngoài, đặt giữa hai hàm răng cửa và đẩy luồng hơi tạo ma sát nhẹ",
      correctExplanation: "Âm răng (dental fricative /θ/): đầu lưỡi bắt buộc phải thè nhẹ ra giữa hai hàng răng, luồng hơi ma sát thổi qua kẽ răng.",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Bật hơi như âm /t/",
        diagnosticTitle: "Phát âm /θ/ thành âm /t/ (lỗi phổ biến của người Việt)",
        explanation: "Người Việt thường phát âm \"think\" thành \"tink\" hoặc \"thinh\" theo tiếng Việt do không đưa đầu lưỡi ra giữa hai răng."
      }
    },
    {
      id: "doer_w4d3_q02",
      roundIndex: 1,
      prompt: "Khác biệt cốt lõi giữa cặp phụ âm /θ/ (trong \"thanks\") và /ð/ (trong \"this\", \"breathe\") là gì?",
      options: [
        { id: "opt_A", label: "A", text: "/θ/ là âm vô thanh (dây thanh không rung), /ð/ là âm hữu thanh (dây thanh rung)" },
        { id: "opt_B", label: "B", text: "/θ/ là âm bật chặn, /ð/ là âm mũi" },
        { id: "opt_C", label: "C", text: "/θ/ cắn môi dưới, /ð/ mím hai môi" },
        { id: "opt_D", label: "D", text: "Khẩu hình miệng hoàn toàn khác nhau về vị trí của răng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. /θ/ là âm vô thanh (dây thanh không rung), /ð/ là âm hữu thanh (dây thanh rung)",
      correctExplanation: "Cả hai đều có cùng vị trí răng-lưỡi, nhưng /θ/ chỉ có luồng gió (voiceless), còn /ð/ kèm theo độ rung thanh quản (voiced).",
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Khẩu hình miệng hoàn toàn khác nhau",
        diagnosticTitle: "Tưởng hai âm có khẩu hình khác nhau",
        explanation: "Khẩu hình giống hệt nhau, chỉ khác nhau duy nhất ở sự rung của dây thanh đới."
      }
    },
    {
      id: "doer_w4d3_q03",
      roundIndex: 2,
      prompt: "Trong câu luyện nói xoắn lưỡi (tongue twister): \"She sells seashells by the seashore\", ta đang luyện tập sự tương phản giữa hai âm nào?",
      options: [
        { id: "opt_A", label: "A", text: "/s/ và /ʃ/" },
        { id: "opt_B", label: "B", text: "/tʃ/ và /dʒ/" },
        { id: "opt_C", label: "C", text: "/θ/ và /s/" },
        { id: "opt_D", label: "D", text: "/f/ và /v/" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. /s/ và /ʃ/",
      correctExplanation: "Sells, seashells (/s/ vs /ʃ/), seashore kết hợp đan xen giữa âm /s/ (răng sát, không chu môi) và /ʃ/ (tròn môi, chu ra phía trước).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. /θ/ và /s/",
        diagnosticTitle: "Nhầm lẫn các cặp âm xát",
        explanation: "Câu văn kinh điển này tập trung 100% vào sự đối lập giữa s nhẹ (/s/) và s nặng (/ʃ/)."
      }
    },
    {
      id: "doer_w4d3_q04",
      roundIndex: 3,
      prompt: "Chọn từ chính xác để nói về thể trạng sức khỏe tổng thể: \"It is important for my overall health and ______.\"",
      options: [
        { id: "opt_A", label: "A", text: "well-being" },
        { id: "opt_B", label: "B", text: "well-doing" },
        { id: "opt_C", label: "C", text: "well-living" },
        { id: "opt_D", label: "D", text: "good-health" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. well-being",
      correctExplanation: "Cụm danh từ cố định trong IELTS: \"health and well-being\" (sức khỏe và thể trạng hạnh phúc tổng thể).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. well-doing",
        diagnosticTitle: "Dịch từ \"sống tốt\" thành well-doing",
        explanation: "Trong tiếng Anh danh từ chuẩn y khoa và đời sống là \"well-being\", không dùng \"well-doing\"."
      }
    },
    {
      id: "doer_w4d3_q05",
      roundIndex: 4,
      prompt: "Chọn động từ đi kèm để nói về việc từ bỏ một thói quen xấu: \"I want to ______ this bad habit of staying up late.\"",
      options: [
        { id: "opt_A", label: "A", text: "break" },
        { id: "opt_B", label: "B", text: "destroy" },
        { id: "opt_C", label: "C", text: "cancel" },
        { id: "opt_D", label: "D", text: "smash" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. break",
      correctExplanation: "Collocation chuẩn xác: \"break a bad habit\" (từ bỏ một thói quen xấu) >< \"form/build a good habit\".",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. cancel",
        diagnosticTitle: "Dịch \"hủy thói quen\" thành cancel",
        explanation: "Cancel dùng cho lịch hẹn/chuyến bay; thói quen dùng \"break a habit\"."
      }
    },
    {
      id: "doer_w4d3_q06",
      roundIndex: 5,
      prompt: "Chọn cụm từ chuẩn để nói về việc giữ gìn vóc dáng thon gọn, khỏe mạnh: \"To ______ in shape, I work out at the gym 3 times a week.\"",
      options: [
        { id: "opt_A", label: "A", text: "stay / keep" },
        { id: "opt_B", label: "B", text: "make" },
        { id: "opt_C", label: "C", text: "have" },
        { id: "opt_D", label: "D", text: "take" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. stay / keep",
      correctExplanation: "Collocation quen thuộc: \"stay in shape\" hoặc \"keep in shape\" (giữ gìn vóc dáng cân đối).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. make",
        diagnosticTitle: "Dịch \"tạo dáng\" thành make in shape",
        explanation: "Giữ vóc dáng cân đối quy chuẩn luôn dùng động từ \"stay / keep in shape\"."
      }
    },
    {
      id: "doer_w4d3_q07",
      roundIndex: 6,
      prompt: "Chọn câu viết đúng cấu trúc thói quen trong quá khứ đã chấm dứt (used to):",
      options: [
        { id: "opt_A", label: "A", text: "I used to eat a lot of junk food, but now I stick to a balanced diet." },
        { id: "opt_B", label: "B", text: "I am used to eat a lot of junk food in the past." },
        { id: "opt_C", label: "C", text: "I used to eating a lot of junk food before." },
        { id: "opt_D", label: "D", text: "I use to ate a lot of junk food." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I used to eat a lot of junk food, but now I stick to a balanced diet.",
      correctExplanation: "Cấu trúc chỉ thói quen quá khứ: used to + Bare Verb (đã từng làm gì và nay không làm nữa).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. used to eating",
        diagnosticTitle: "Nhầm lẫn với cấu trúc \"be/get used to + V-ing\"",
        explanation: "\"Be used to + V-ing\" mang nghĩa quen với việc gì ở hiện tại, còn thói quen quá khứ đã bỏ là \"used to + V nguyên mẫu\"."
      }
    },
    {
      id: "doer_w4d3_q08",
      roundIndex: 7,
      prompt: "Chọn từ điền vào chỗ trống: \"Having a balanced diet allows you to ______ weight effectively and supplies essential nutrients.\"",
      options: [
        { id: "opt_A", label: "A", text: "lose" },
        { id: "opt_B", label: "B", text: "loose" },
        { id: "opt_C", label: "C", text: "loss" },
        { id: "opt_D", label: "D", text: "lost" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. lose",
      correctExplanation: "Động từ giảm cân là \"lose weight\". \"Loose\" là tính từ (lỏng lẻo, rộng thùng thình), \"loss\" là danh từ (sự mất mát).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. loose",
        diagnosticTitle: "Nhầm lẫn chính tả tai hại giữa Lose và Loose",
        explanation: "Đây là một trong những lỗi chính tả bị trừ điểm nặng nhất trong kỳ thi IELTS Writing/Listening."
      }
    },
    {
      id: "doer_w4d3_q09",
      roundIndex: 8,
      prompt: "Chọn câu viết đúng cấu trúc giúp cơ thể dẻo dai hơn: \"Tập yoga 15 phút mỗi ngày giúp tôi trở nên dẻo dai hơn.\"",
      options: [
        { id: "opt_A", label: "A", text: "Doing yoga for 15 minutes daily enables me to be more flexible." },
        { id: "opt_B", label: "B", text: "Do yoga 15 minutes day makes me more flexibility." },
        { id: "opt_C", label: "C", text: "Doing yoga 15 minutes allows me more flexible." },
        { id: "opt_D", label: "D", text: "Doing yoga enables me being flexible." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Doing yoga for 15 minutes daily enables me to be more flexible.",
      correctExplanation: "Gerund \"Doing yoga\" làm chủ ngữ, \"enables me to be more flexible\" (enable sb to-V, tính từ flexible: linh hoạt/dẻo dai).",
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. allows me more flexible",
        diagnosticTitle: "Bỏ quên động từ to be sau allow sb",
        explanation: "Sau allow sb phải là một to-V (\"to be flexible\"), không thể ghép trực tiếp tính từ flexible mà thiếu be."
      }
    },
    {
      id: "doer_w4d3_q10",
      roundIndex: 9,
      prompt: "Khi một người luôn có ý thức chăm lo cẩn thận cho sức khỏe của mình, ta dùng tính từ ghép nào để miêu tả?",
      options: [
        { id: "opt_A", label: "A", text: "health-conscious" },
        { id: "opt_B", label: "B", text: "health-caring" },
        { id: "opt_C", label: "C", text: "health-focusedly" },
        { id: "opt_D", label: "D", text: "health-awarely" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. health-conscious",
      correctExplanation: "Tính từ chuẩn xác trong IELTS Speaking & Writing: \"health-conscious\" (có ý thức cao về sức khỏe).",
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. health-caring",
        diagnosticTitle: "Tự sáng tạo tính từ ghép không chuẩn ngữ cảm",
        explanation: "Trong tiếng Anh từ chuẩn cho người chú trọng ăn uống rèn luyện vì sức khỏe là \"health-conscious\"."
      }
    }
  ]
};
