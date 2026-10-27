/**
 * MASTER ARENA QUESTION BANK - WEEK 8
 * Source: Giáo trình MASTER 2027 - Đã soát lỗi.docx & Giáo án Master 2027 (Teacher Guide)
 * Target: IELTS Band 6.0 | Performance 6.0–6.5
 * 
 * Day 1: Writing (Task 1 Static Data Description / Stood at - Accounted for / Number vs Amount / Superlatives)
 * Day 2: Reading (Mixed-Ability Classes / Pivot Words / Romeo and Juliet Teaching Case / Academic Arguments)
 * Day 3: Speaking (Part 1 Handling Negative Answers with 'Instead of' / Part 2 Describe a Practical Skill)
 */

export const MASTER_WEEK_8_QUESTIONS: Record<string, any[]> = {
  "WEEK 8 – DAY 1": [
    {
      id: "master_w8d1_q01",
      roundIndex: 0,
      prompt: "Trong IELTS Writing Task 1, khi mô tả dữ liệu tĩnh (Static Data) của một biểu đồ tại một năm cụ thể trong quá khứ (ví dụ năm 2015), động từ nào sau đây KHÔNG THỂ sử dụng để biểu thị số liệu?",
      options: [
        { id: "opt_A", label: "A", text: "skyrocketed" },
        { id: "opt_B", label: "B", text: "stood at" },
        { id: "opt_C", label: "C", text: "was recorded at" },
        { id: "opt_D", label: "D", text: "accounted for" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. skyrocketed",
      correctExplanation: "Biểu đồ tĩnh (Static Chart) không có trục thời gian thay đổi, do đó tuyệt đối không được dùng các động từ chỉ xu hướng biến thiên như 'skyrocketed', 'decreased' hay 'fluctuated'. Ta chỉ dùng các cụm tĩnh như 'stood at', 'was recorded at', 'accounted for'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. accounted for",
        diagnosticTitle: "Coi 'accounted for' là động từ xu hướng",
        explanation: "'Accounted for' (chiếm tỷ lệ bao nhiêu %) là động từ tĩnh kinh điển dùng cho biểu đồ tròn hoặc bảng số liệu tĩnh.",
      }
    },
    {
      id: "master_w8d1_q02",
      roundIndex: 1,
      prompt: "Chọn câu viết chuẩn ngữ pháp và văn phong học thuật: 'Lượng du khách Trung Quốc đến Việt Nam trong hai tháng đầu năm đạt mức khoảng 900.000 người.'?",
      options: [
        { id: "opt_A", label: "A", text: "The number of Chinese tourist arrivals in Vietnam stood at approximately 900,000 during the first two months." },
        { id: "opt_B", label: "B", text: "The amount of Chinese visitors in Vietnam was around 900,000 people in first two months." },
        { id: "opt_C", label: "C", text: "Chinese visitors in Vietnam had 900,000 during the first two months." },
        { id: "opt_D", label: "D", text: "There was 900,000 Chinese tourists coming to Vietnam in two months." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The number of Chinese tourist arrivals in Vietnam stood at approximately 900,000 during the first two months.",
      correctExplanation: "Với danh từ đếm được số nhiều (tourists / arrivals), ta bắt buộc phải dùng 'The number of', không dùng 'The amount of'. Cấu trúc 'stood at approximately 900,000' là chuẩn Task 1 Band 6.5.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The amount of Chinese visitors in Vietnam was around 900,000 people in first two months.",
        diagnosticTitle: "Dùng 'The amount of' cho danh từ đếm được người",
        explanation: "'The amount of' chỉ dùng cho danh từ không đếm được (nước, tiền, thời gian), dùng cho người là sai ngữ pháp cơ bản.",
      }
    },
    {
      id: "master_w8d1_q03",
      roundIndex: 2,
      prompt: "Khi đối tượng được đo lường là gạo ('rice produced in Vietnam'), cụm định lượng nào sau đây là chuẩn xác nhất?",
      options: [
        { id: "opt_A", label: "A", text: "The amount of rice produced" },
        { id: "opt_B", label: "B", text: "The number of rice produced" },
        { id: "opt_C", label: "C", text: "The count of rice produced" },
        { id: "opt_D", label: "D", text: "The numbers of rices produced" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The amount of rice produced",
      correctExplanation: "'Rice' là danh từ không đếm được (Uncountable noun), do đó phải dùng 'The amount of rice' hoặc 'The volume of rice', tuyệt đối không dùng 'the number of'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The number of rice produced",
        diagnosticTitle: "Lẫn lộn giữa 'number of' và 'amount of'",
        explanation: "Học sinh thường dùng tùy tiện 'The number of' cho cả danh từ không đếm được.",
      }
    },
    {
      id: "master_w8d1_q04",
      roundIndex: 3,
      prompt: "Chọn câu mô tả số liệu dẫn đầu (Superlative) có cấu trúc ngữ pháp phong phú nhất cho năm 2005:",
      options: [
        { id: "opt_A", label: "A", text: "In 2005, the manufacturing sector made the largest contribution to the national GDP, at 38%." },
        { id: "opt_B", label: "B", text: "In 2005, manufacturing was the biggest and it had 38% of GDP." },
        { id: "opt_C", label: "C", text: "The biggest sector in 2005 was manufacturing which got 38%." },
        { id: "opt_D", label: "D", text: "Manufacturing was higher than any other sectors in 2005 at 38%." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. In 2005, the manufacturing sector made the largest contribution to the national GDP, at 38%.",
      correctExplanation: "Cấu trúc chuẩn mực của Task 1: 'S + made the largest contribution to..., at [figure]%' thể hiện sự tinh tế và tự nhiên vượt trội.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. In 2005, manufacturing was the biggest and it had 38% of GDP.",
        diagnosticTitle: "Dùng từ 'biggest' nôm na và cấu trúc ghép nối vụng về 'and it had'",
        explanation: "'The biggest... and it had' là cách viết của người mới bắt đầu học Task 1.",
      }
    },
    {
      id: "master_w8d1_q05",
      roundIndex: 4,
      prompt: "Khi muốn liên kết số liệu đứng ở vị trí thứ hai ngay sau vị trí dẫn đầu trong cùng một câu, cấu trúc nào sau đây là chuẩn mực nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Wheat production was highest in country A at 50 million tons, closely followed by country B, at 42 million tons." },
        { id: "opt_B", label: "B", text: "Wheat in country A was 50 million tons and then country B was 42 million tons." },
        { id: "opt_C", label: "C", text: "Country A had 50 million tons of wheat, but country B also had 42 million tons." },
        { id: "opt_D", label: "D", text: "Wheat in country A was the most and country B was number two." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Wheat production was highest in country A at 50 million tons, closely followed by country B, at 42 million tons.",
      correctExplanation: "Mệnh đề phân từ rút gọn: '..., closely followed by [Subject], at [figure]' là vũ khí ghi điểm Coherence & Cohesion 7.0 kinh điển của Task 1.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Wheat in country A was the most and country B was number two.",
        diagnosticTitle: "Dùng cụm khẩu ngữ 'was number two' trong bài báo cáo",
        explanation: "'Number two' là từ khẩu ngữ, trong văn viết phải dùng 'ranked second' hoặc 'followed by'.",
      }
    },
    {
      id: "master_w8d1_q06",
      roundIndex: 5,
      prompt: "Trong câu: 'Agriculture accounted for 15% of the total revenue, ranking second to last among the five surveyed industries.' Cụm 'ranking second to last' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đứng ở vị trí áp chót, tức là xếp thứ hai từ dưới đếm lên" },
        { id: "opt_B", label: "B", text: "Đứng ở vị trí thứ hai từ trên xuống" },
        { id: "opt_C", label: "C", text: "Đứng ở vị trí thấp nhất tuyệt đối trong tất cả các ngành" },
        { id: "opt_D", label: "D", text: "Đứng ở vị trí chính giữa biểu đồ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đứng ở vị trí áp chót, tức là xếp thứ hai từ dưới đếm lên",
      correctExplanation: "'Second to last' hoặc 'penultimate' có nghĩa là đứng kế cuối (áp chót). Đây là cách diễn đạt thứ hạng chính xác trong Task 1.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đứng ở vị trí thứ hai từ trên xuống",
        diagnosticTitle: "Bỏ qua chữ 'to last' và chỉ nhìn thấy chữ 'second'",
        explanation: "Thí sinh nhìn thấy chữ 'second' tưởng là xếp hạng nhì (second place) mà không nhận ra cụm 'second to last'.",
      }
    },
    {
      id: "master_w8d1_q07",
      roundIndex: 6,
      prompt: "Chọn mẫu câu đưa dữ liệu vào cuối mệnh đề một cách trang trọng: 'Lượng phát thải khí nhà kính của ngành giao thông vận tải là 25 triệu tấn.'?",
      options: [
        { id: "opt_A", label: "A", text: "The transport sector emitted 25 million tons of greenhouse gases." },
        { id: "opt_B", label: "B", text: "Transport sector was having 25 million tons of greenhouse gases." },
        { id: "opt_C", label: "C", text: "25 million tons of greenhouse gases was made by transport sector." },
        { id: "opt_D", label: "D", text: "Transport sector had greenhouse gases at the number of 25 million tons." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The transport sector emitted 25 million tons of greenhouse gases.",
      correctExplanation: "Sử dụng ngoại động từ chuyên ngành trực tiếp: 'The transport sector emitted [figure]' (ngành giao thông phát thải...) giúp câu văn năng động, cô đọng và tự nhiên hơn nhiều so với việc dùng động từ 'be' hoặc 'have'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Transport sector was having 25 million tons of greenhouse gases.",
        diagnosticTitle: "Dùng thì quá khứ tiếp diễn cho việc sở hữu số liệu tĩnh",
        explanation: "Số liệu tĩnh báo cáo không dùng thì tiếp diễn và ngành giao thông không 'sở hữu' khí thải kiểu 'was having'.",
      }
    },
    {
      id: "master_w8d1_q08",
      roundIndex: 7,
      prompt: "Trong báo cáo Task 1, câu 'Overview' (Tổng quan) của biểu đồ tĩnh cần nêu bật điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Hạng mục có giá trị cao nhất và thấp nhất hoặc sự phân hóa áp đảo giữa các nhóm dữ liệu mà không đưa số liệu chi tiết" },
        { id: "opt_B", label: "B", text: "Tất cả các số lẻ chi tiết của từng hạng mục" },
        { id: "opt_C", label: "C", text: "Ý kiến nhận xét cá nhân của người viết về việc ngành nào nên phát triển hơn" },
        { id: "opt_D", label: "D", text: "Dự đoán xu hướng của 50 năm tiếp theo" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Hạng mục có giá trị cao nhất và thấp nhất hoặc sự phân hóa áp đảo giữa các nhóm dữ liệu mà không đưa số liệu chi tiết",
      correctExplanation: "Quy tắc vàng của Task 1 Overview: Luôn chỉ ra các đặc điểm nổi bật nhất (Key features: highest/lowest, predominant categories) một cách khái quát, TUYỆT ĐỐI KHÔNG đưa số liệu chi tiết vào đoạn Overview.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tất cả các số lẻ chi tiết của từng hạng mục",
        diagnosticTitle: "Đưa số liệu chi tiết vào câu tổng quan Overview",
        explanation: "Đưa số liệu vào Overview biến đoạn tổng quan thành đoạn thân bài chi tiết và bị trừ điểm Task Achievement.",
      }
    },
    {
      id: "master_w8d1_q09",
      roundIndex: 8,
      prompt: "Từ 'constituted' trong câu: 'Renewable energy constituted a mere 5% of global consumption' đồng nghĩa với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "made up chiếm tỷ lệ" },
        { id: "opt_B", label: "B", text: "increased tăng trưởng" },
        { id: "opt_C", label: "C", text: "declined sụt giảm" },
        { id: "opt_D", label: "D", text: "demanded đòi hỏi" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. made up chiếm tỷ lệ",
      correctExplanation: "'Constituted' (cấu thành, chiếm tỷ lệ) đồng nghĩa với 'made up', 'accounted for', 'comprised'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. increased tăng trưởng",
        diagnosticTitle: "Nhầm động từ cấu thành với động từ tăng trưởng",
        explanation: "Constitute là động từ chỉ cấu trúc thành phần, không phải động từ chỉ sự gia tăng.",
      }
    },
    {
      id: "master_w8d1_q10",
      roundIndex: 9,
      prompt: "Khi muốn nhấn mạnh một con số là rất nhỏ bé so với tổng thể trong Task 1, từ bổ trợ (modifier) nào sau đây là chuẩn xác nhất?",
      options: [
        { id: "opt_A", label: "A", text: "a mere chỉ vỏn vẹn" },
        { id: "opt_B", label: "B", text: "a big một lượng lớn" },
        { id: "opt_C", label: "C", text: "an enormous một số khổng lồ" },
        { id: "opt_D", label: "D", text: "a huge một con số đáng sợ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. a mere chỉ vỏn vẹn",
      correctExplanation: "'A mere + [số liệu]' (ví dụ: a mere 3%) là cách viết học thuật tinh tế để diễn tả một tỷ lệ rất nhỏ hoặc không đáng kể.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. a big một lượng lớn",
        diagnosticTitle: "Dùng từ trái ngược hoàn toàn với ý nghĩa nhỏ bé",
        explanation: "'A big' vừa mang nghĩa lớn vừa là từ khẩu ngữ không dùng trong Task 1.",
      }
    }
  ],

  "WEEK 8 – DAY 2": [
    {
      id: "master_w8d2_q01",
      roundIndex: 0,
      prompt: "Trong bài đọc về phương pháp giảng dạy lớp học nhiều trình độ (Mixed-ability classes), tác giả mô tả tiết dạy tác phẩm 'Romeo and Juliet' nhằm mục đích gì?",
      options: [
        { id: "opt_A", label: "A", text: "Chứng minh rằng việc chia nhóm học sinh đa năng lực có thể kích hoạt sự sáng tạo và tương tác hỗ trợ lẫn nhau hiệu quả hơn là việc phân lớp theo trình độ học lực cứng nhắc" },
        { id: "opt_B", label: "B", text: "Kể lại một câu chuyện tình yêu lãng mạn thời Phục hưng" },
        { id: "opt_C", label: "C", text: "Khuyên các giáo viên nên bỏ dạy kịch Shakespeare trong nhà trường" },
        { id: "opt_D", label: "D", text: "So sánh khả năng diễn xuất của các diễn viên kịch chuyên nghiệp" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chứng minh rằng việc chia nhóm học sinh đa năng lực có thể kích hoạt sự sáng tạo và tương tác hỗ trợ lẫn nhau hiệu quả hơn là việc phân lớp theo trình độ học lực cứng nhắc",
      correctExplanation: "Nghiên cứu trường hợp Romeo and Juliet trong bài đọc nhằm đưa ra bằng chứng thực nghiệm (Empirical evidence) cho thấy học sinh yếu và học sinh giỏi khi tương tác chung sẽ cùng tiến bộ vượt bậc.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Kể lại một câu chuyện tình yêu lãng mạn thời Phục hưng",
        diagnosticTitle: "Bị chi phối bởi nội dung cốt truyện văn học thay vì mục đích phương pháp sư phạm",
        explanation: "Bài đọc thuộc chủ đề Giáo dục học (Pedagogy), câu chuyện chỉ là công cụ nghiên cứu sư phạm.",
      }
    },
    {
      id: "master_w8d2_q02",
      roundIndex: 1,
      prompt: "Các từ bản lề đổi hướng (Pivot words) như 'nonetheless', 'conversely', 'whereas', 'by contrast' có vai trò gì quan trọng khi giải mã bài đọc IELTS?",
      options: [
        { id: "opt_A", label: "A", text: "Báo hiệu sự chuyển biến lập luận hoặc đảo chiều quan điểm của tác giả, nơi chứa đựng đáp án then chốt của các câu hỏi khó" },
        { id: "opt_B", label: "B", text: "Chỉ mang tính chất trang trí câu văn cho dài thêm" },
        { id: "opt_C", label: "C", text: "Báo hiệu rằng đoạn văn đã kết thúc và không cần đọc tiếp" },
        { id: "opt_D", label: "D", text: "Báo hiệu thông tin phía sau hoàn toàn vô nghĩa" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Báo hiệu sự chuyển biến lập luận hoặc đảo chiều quan điểm của tác giả, nơi chứa đựng đáp án then chốt của các câu hỏi khó",
      correctExplanation: "Nguyên tắc Master: Các câu hỏi IELTS khó (Band 7+) luôn khai thác điểm chuyển hướng (Pivot points). Tác giả thường nêu quan điểm của phe đối lập trước, sau đó dùng 'However/Conversely' để tung ra luận điểm thực sự của mình.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ mang tính chất trang trí câu văn cho dài thêm",
        diagnosticTitle: "Xem nhẹ giá trị định hướng tư duy của liên từ chuyển ý",
        explanation: "Bỏ qua các từ pivot là nguyên nhân hàng đầu khiến thí sinh chọn nhầm đáp án bẫy của vế trước.",
      }
    },
    {
      id: "master_w8d2_q03",
      roundIndex: 2,
      prompt: "Trong chính sách giáo dục, thuật ngữ 'streaming' hoặc 'setting' (phân luồng học sinh theo năng lực) có hạn chế tâm lý lớn nhất là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Gắn nhãn tiêu cực lên học sinh ở các lớp dưới, làm suy giảm lòng tự trọng và triệt tiêu động lực phấn đấu học tập của các em" },
        { id: "opt_B", label: "B", text: "Làm tăng số lượng bài kiểm tra lên gấp đôi mỗi ngày" },
        { id: "opt_C", label: "C", text: "Khiến nhà trường phải tốn thêm tiền mua bàn ghế mới" },
        { id: "opt_D", label: "D", text: "Học sinh giỏi không được phép đọc sách thư viện" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Gắn nhãn tiêu cực lên học sinh ở các lớp dưới, làm suy giảm lòng tự trọng và triệt tiêu động lực phấn đấu học tập của các em",
      correctExplanation: "Khái niệm 'stigmatization' (sự kỳ thị gắn nhãn) và 'self-fulfilling prophecy' (lời tiên tri tự ứng nghiệm): học sinh bị xếp vào nhóm học lực thấp sẽ tự coi mình kém cỏi và mất hết động lực phấn đấu.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Khiến nhà trường phải tốn thêm tiền mua bàn ghế mới",
        diagnosticTitle: "Nghĩ theo các yếu tố vật chất phụ không liên quan đến tâm lý học sư phạm",
        explanation: "Vấn đề cốt lõi của bài đọc là tâm lý giáo dục và hiệu quả học tập của học sinh, không phải chi phí bàn ghế.",
      }
    },
    {
      id: "master_w8d2_q04",
      roundIndex: 3,
      prompt: "Từ 'disparity' trong câu: 'The wide disparity in academic performance prompted teachers to rethink their strategies' đồng nghĩa với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "inequality sự chênh lệch khoảng cách" },
        { id: "opt_B", label: "B", text: "harmony sự hài hòa đồng điệu" },
        { id: "opt_C", label: "C", text: "similarity sự tương đồng giống nhau" },
        { id: "opt_D", label: "D", text: "stability sự ổn định bền vững" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. inequality sự chênh lệch khoảng cách",
      correctExplanation: "'Disparity' (sự chênh lệch, khoảng cách lớn) đồng nghĩa với 'inequality' hoặc 'gap'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. similarity sự tương đồng giống nhau",
        diagnosticTitle: "Hiểu ngược nghĩa của từ khoảng cách chênh lệch",
        explanation: "'Similarity' là sự tương đồng, hoàn toàn đối lập với 'disparity'.",
      }
    },
    {
      id: "master_w8d2_q05",
      roundIndex: 4,
      prompt: "Trong bài đọc, khi tác giả sử dụng câu: 'Proponents of academic selection claim that gifted pupils are held back in mixed classrooms; however, comprehensive longitudinal data refutes this assertion.'\nQuan điểm thực sự của tác giả là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Bác bỏ luận điểm cho rằng học sinh giỏi bị kìm hãm trong lớp học hỗn hợp dựa trên các dữ liệu theo dõi dài hạn" },
        { id: "opt_B", label: "B", text: "Đồng ý rằng học sinh giỏi nhất định phải được tách riêng ra ngay lập tức" },
        { id: "opt_C", label: "C", text: "Khẳng định rằng các dữ liệu nghiên cứu dài hạn đều không đáng tin cậy" },
        { id: "opt_D", label: "D", text: "Cho rằng tất cả các trường học nên đóng cửa" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Bác bỏ luận điểm cho rằng học sinh giỏi bị kìm hãm trong lớp học hỗn hợp dựa trên các dữ liệu theo dõi dài hạn",
      correctExplanation: "Từ khóa quyết định là 'however, longitudinal data refutes this assertion' (tuy nhiên dữ liệu dài hạn đã bác bỏ khẳng định này). Tác giả đứng về phía chứng cứ bác bỏ.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đồng ý rằng học sinh giỏi nhất định phải được tách riêng ra ngay lập tức",
        diagnosticTitle: "Chỉ đọc vế đầu của phe ủng hộ chọn lọc (Proponents) mà bỏ qua chữ 'however'",
        explanation: "Thí sinh dừng lại ở vế trước 'gifted pupils are held back' mà không đọc mệnh đề phản bác phía sau liên từ 'however'.",
      }
    },
    {
      id: "master_w8d2_q06",
      roundIndex: 5,
      prompt: "Khi làm dạng bài Summary Completion (Điền từ vào đoạn tóm tắt), bước đầu tiên trước khi tra cứu lại bài đọc là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Xác định từ loại cần điền như danh từ, động từ hay tính từ và dự đoán trường ngữ nghĩa dựa vào ngữ pháp của câu tóm tắt" },
        { id: "opt_B", label: "B", text: "Đọc lướt ngẫu nhiên từ đầu đến cuối bài đọc" },
        { id: "opt_C", label: "C", text: "Chọn đại một từ dài nhất trong đoạn đầu tiên để điền vào" },
        { id: "opt_D", label: "D", text: "Dịch toàn bộ bài tóm tắt sang tiếng Việt" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Xác định từ loại cần điền như danh từ, động từ hay tính từ và dự đoán trường ngữ nghĩa dựa vào ngữ pháp của câu tóm tắt",
      correctExplanation: "Kỹ thuật đoán trước từ loại (Grammatical prediction): Biết trước chỗ trống cần một danh từ số ít hay tính từ sẽ giúp thu hẹp phạm vi quét từ trong bài đọc tới 80%.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đọc lướt ngẫu nhiên từ đầu đến cuối bài đọc",
        diagnosticTitle: "Tìm kiếm mù quáng không định hướng từ loại",
        explanation: "Quét bài mà không biết từ cần điền là danh từ hay tính từ sẽ mất rất nhiều thời gian xử lý.",
      }
    },
    {
      id: "master_w8d2_q07",
      roundIndex: 6,
      prompt: "Từ 'homogeneous' trong cụm 'homogeneous grouping of pupils' chỉ điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Nhóm học sinh có trình độ đồng nhất, tương đồng nhau" },
        { id: "opt_B", label: "B", text: "Nhóm học sinh có nhiều quốc tịch khác nhau" },
        { id: "opt_C", label: "C", text: "Nhóm học sinh học cùng một ngôi trường mới xây" },
        { id: "opt_D", label: "D", text: "Nhóm học sinh có tính cách đối lập nhau hoàn toàn" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nhóm học sinh có trình độ đồng nhất, tương đồng nhau",
      correctExplanation: "Tiền tố Hy Lạp 'Homo-' (giống nhau/đồng nhất). 'Homogeneous grouping' là việc chia lớp đồng đều về năng lực, đối lập với 'Heterogeneous' (đa dạng, hỗn hợp).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Nhóm học sinh có tính cách đối lập nhau hoàn toàn",
        diagnosticTitle: "Nhầm homogeneous với heterogeneous",
        explanation: "'Heterogeneous' mới là hỗn hợp khác biệt, 'homogeneous' là đồng nhất.",
      }
    },
    {
      id: "master_w8d2_q08",
      roundIndex: 7,
      prompt: "Trong bài đọc, hiện tượng học sinh khá hỗ trợ giảng giải bài học cho học sinh yếu (Peer tutoring) mang lại lợi ích gì cho chính học sinh khá?",
      options: [
        { id: "opt_A", label: "A", text: "Giúp học sinh khá củng cố và đào sâu kiến thức của bản thân thông qua quá trình diễn đạt và tái cấu trúc thông tin" },
        { id: "opt_B", label: "B", text: "Giúp các em được thầy cô cho điểm 10 miễn phí mà không cần thi" },
        { id: "opt_C", label: "C", text: "Giúp các em được về nhà sớm hơn các bạn khác" },
        { id: "opt_D", label: "D", text: "Không mang lại bất kỳ lợi ích nào mà chỉ làm lãng phí thời gian" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Giúp học sinh khá củng cố và đào sâu kiến thức của bản thân thông qua quá trình diễn đạt và tái cấu trúc thông tin",
      correctExplanation: "Nguyên lý sư phạm 'To teach is to learn twice' (Dạy là học hai lần): Việc giải thích cho bạn giúp học sinh nắm vững bản chất kiến thức ở mức độ siêu nhận thức (metacognition).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Không mang lại bất kỳ lợi ích nào mà chỉ làm lãng phí thời gian",
        diagnosticTitle: "Định kiến cho rằng giúp bạn học là sự hy sinh vô ích",
        explanation: "Các nghiên cứu giáo dục đều chứng minh học sinh giảng bài cho bạn thu nhận được sự thấu hiểu kiến thức sâu sắc nhất.",
      }
    },
    {
      id: "master_w8d2_q09",
      roundIndex: 8,
      prompt: "Chọn từ điền vào câu tóm tắt: 'The study demonstrated that collaborative learning fostered greater [...] among peers than traditional individualistic tasks.'?",
      options: [
        { id: "opt_A", label: "A", text: "empathy sự đồng cảm và thấu hiểu" },
        { id: "opt_B", label: "B", text: "hostility sự thù địch" },
        { id: "opt_C", label: "C", text: "isolation sự cô lập" },
        { id: "opt_D", label: "D", text: "envy sự ghen tị đố kỵ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. empathy sự đồng cảm và thấu hiểu",
      correctExplanation: "Học tập cộng tác (collaborative learning) xây dựng sự thấu hiểu, gắn kết xã hội và 'empathy' (lòng trắc ẩn, sự đồng cảm), trái ngược với môi trường ganh đua cá nhân.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. hostility sự thù địch",
        diagnosticTitle: "Chọn từ tiêu cực đối lập hoàn toàn với bản chất hợp tác",
        explanation: "'Hostility' (thù địch) là tác động tiêu cực, không phải kết quả của hợp tác tích cực.",
      }
    },
    {
      id: "master_w8d2_q10",
      roundIndex: 9,
      prompt: "Khi gặp một câu hỏi Multiple Choice có 4 lựa chọn, trong đó có một lựa chọn dùng từ vựng giống hệt văn bản nhưng bị thay đổi một liên từ điều kiện nhỏ, lựa chọn này thường là:",
      options: [
        { id: "opt_A", label: "A", text: "Một phương án bẫy tinh vi Distractor nhằm trừng phạt thói quen tìm từ khóa trùng lặp cơ học" },
        { id: "opt_B", label: "B", text: "Chắc chắn là đáp án đúng 100%" },
        { id: "opt_C", label: "C", text: "Lỗi in ấn của đề thi" },
        { id: "opt_D", label: "D", text: "Câu hỏi bị hủy kết quả" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Một phương án bẫy tinh vi Distractor nhằm trừng phạt thói quen tìm từ khóa trùng lặp cơ học",
      correctExplanation: "Bẫy Word-matching điển hình trong IELTS: Người ra đề cố tình bê nguyên cụm từ trong bài đọc vào đáp án sai nhưng đảo lộn điều kiện logic để bẫy thí sinh đọc hời hợt.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chắc chắn là đáp án đúng 100%",
        diagnosticTitle: "Tin tưởng mù quáng vào các phương án chứa từ ngữ giống hệt",
        explanation: "Thói quen chọn câu có chữ giống bài đọc là nguyên nhân khiến thí sinh dừng chân ở Band 5.0–5.5.",
      }
    }
  ],

  "WEEK 8 – DAY 3": [
    {
      id: "master_w8d3_q01",
      roundIndex: 0,
      prompt: "Trong Speaking Part 1, khi gặp câu hỏi về một việc mà bản thân HOÀN TOÀN KHÔNG LÀM (ví dụ: 'Have you ever bought mirrors?'), kỹ thuật 'Alternatives with Instead of' được áp dụng như thế nào để tránh câu trả lời bế tắc 'No, never'?",
      options: [
        { id: "opt_A", label: "A", text: "Thừa nhận trung thực mình không tự mua, sau đó chuyển hướng nói về người khác làm việc đó hoặc một giải pháp thay thế: To be honest, I rarely buy mirrors myself; instead, my mother usually selects home decor items..." },
        { id: "opt_B", label: "B", text: "Chỉ trả lời cộc lốc một chữ: No" },
        { id: "opt_C", label: "C", text: "Nói dối rằng mình có một bộ sưu tập 500 chiếc gương đắt tiền" },
        { id: "opt_D", label: "D", text: "Im lặng và đề nghị giám khảo chuyển sang chủ đề khác" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thừa nhận trung thực mình không tự mua, sau đó chuyển hướng nói về người khác làm việc đó hoặc một giải pháp thay thế: To be honest, I rarely buy mirrors myself; instead, my mother usually selects home decor items...",
      correctExplanation: "Kỹ thuật 'Alternatives' chuẩn Master: Tuyệt đối không để câu trả lời chết đứng ở chữ 'No, I don't'. Hãy dùng 'To be honest, I rarely do X; instead, [Alternative/Person]...' để mở rộng câu nói một cách mượt mà và tự nhiên.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ trả lời cộc lốc một chữ: No",
        diagnosticTitle: "Trả lời cộc lốc cụt ngủn bóp chết bài thi nói",
        explanation: "Nói 'No' rồi dừng lại sẽ khiến giám khảo đánh giá thí sinh không đủ vốn từ và độ trôi chảy để duy trì giao tiếp.",
      }
    },
    {
      id: "master_w8d3_q02",
      roundIndex: 1,
      prompt: "Chọn câu trả lời áp dụng hoàn hảo kỹ thuật chuyển hướng thay thế cho câu hỏi: 'Do you play any musical instruments?'?",
      options: [
        { id: "opt_A", label: "A", text: "Regrettably, I have never mastered any musical instrument; instead, I am an enthusiastic listener who spends hours exploring diverse genres on Spotify." },
        { id: "opt_B", label: "B", text: "No, I don't play piano. Piano is very difficult." },
        { id: "opt_C", label: "C", text: "I play all instruments in the world every day." },
        { id: "opt_D", label: "D", text: "No, I hate music because music makes me headache." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Regrettably, I have never mastered any musical instrument; instead, I am an enthusiastic listener who spends hours exploring diverse genres on Spotify.",
      correctExplanation: "Từ chối khéo léo với 'Regrettably, I have never mastered...', sau đó chuyển hướng sang trải nghiệm nghe nhạc với 'instead, I am an enthusiastic listener who...', thể hiện sự linh hoạt tuyệt vời ở Band 6.5.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. No, I don't play piano. Piano is very difficult.",
        diagnosticTitle: "Khuôn câu đơn điệu và cộc lốc",
        explanation: "Phương án B đúng nghĩa nhưng cấu trúc ngắn cũn cỡn không phô diễn được năng lực ngôn ngữ.",
      }
    },
    {
      id: "master_w8d3_q03",
      roundIndex: 2,
      prompt: "Trong Speaking Part 2 với chủ đề: 'Describe a practical skill you learned', cấu trúc thời gian kể chuyện nào sau đây giúp tạo mạch tự sự lôi cuốn nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Lý do cấp bách ban đầu buộc phải học -> Những trở ngại và lúng túng trong giai đoạn đầu -> Phương pháp luyện tập kiên trì -> Cảm giác tự hào và ứng dụng thực tế hiện tại" },
        { id: "opt_B", label: "B", text: "Chỉ mô tả chi tiết giá tiền của người thầy dạy kỹ năng đó" },
        { id: "opt_C", label: "C", text: "Liệt kê 10 kỹ năng khác nhau mà bạn biết làm một cách ngắn ngủi" },
        { id: "opt_D", label: "D", text: "Nói rằng kỹ năng đó rất dễ và học trong 2 giây là xong" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Lý do cấp bách ban đầu buộc phải học -> Những trở ngại và lúng túng trong giai đoạn đầu -> Phương pháp luyện tập kiên trì -> Cảm giác tự hào và ứng dụng thực tế hiện tại",
      correctExplanation: "Khung cốt truyện 4 hồi chuẩn Master: Catalyst (Động lực) -> Initial Hurdles (Trở ngại ban đầu) -> Breakthrough (Đột phá luyện tập) -> Current Impact (Giá trị hiện tại). Đảm bảo bài nói đủ 2 phút liền mạch.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Liệt kê 10 kỹ năng khác nhau mà bạn biết làm một cách ngắn ngủi",
        diagnosticTitle: "Liệt kê nông cạn thay vì đào sâu một kỹ năng duy nhất",
        explanation: "Cue Card yêu cầu 'Describe a skill' (MỘT kỹ năng), nói lan man sang nhiều kỹ năng là lỗi không bám sát đề bài.",
      }
    },
    {
      id: "master_w8d3_q04",
      roundIndex: 3,
      prompt: "Chọn cụm collocation học thuật miêu tả quá trình học một kỹ năng mới từ mức chưa biết gì đến khi thành thạo:",
      options: [
        { id: "opt_A", label: "A", text: "underwent a steep learning curve before attaining a commendable level of proficiency" },
        { id: "opt_B", label: "B", text: "learned very hard and then became very good at it" },
        { id: "opt_C", label: "C", text: "started with zero and then had high points" },
        { id: "opt_D", label: "D", text: "did practice many times until good" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. underwent a steep learning curve before attaining a commendable level of proficiency",
      correctExplanation: "Thành ngữ học thuật đắt giá: 'steep learning curve' (đường cong học tập dốc đứng - giai đoạn đầu đầy khó khăn gian khổ) và 'attaining a commendable level of proficiency' (đạt tới trình độ thành thạo đáng khen ngợi).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. learned very hard and then became very good at it",
        diagnosticTitle: "Lặp lại các tính từ 'hard' và 'good' sơ cấp",
        explanation: "Cách nói bình dân không đem lại điểm cộng từ vựng.",
      }
    },
    {
      id: "master_w8d3_q05",
      roundIndex: 4,
      prompt: "Khi giám khảo hỏi: 'Why do you think some people give up learning new skills easily?', câu trả lời nào chỉ ra NGUYÊN NHÂN TÂM LÝ sâu sắc nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Many individuals lack the patience for gradual mastery and succumb to frustration when they do not experience immediate gratification." },
        { id: "opt_B", label: "B", text: "Because people are lazy and they only want to sleep all day." },
        { id: "opt_C", label: "C", text: "They give up because courses are too expensive to pay." },
        { id: "opt_D", label: "D", text: "Teachers are very bad so students don't want to learn." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Many individuals lack the patience for gradual mastery and succumb to frustration when they do not experience immediate gratification.",
      correctExplanation: "Khái niệm tâm lý học hành vi: 'lack patience for gradual mastery' (thiếu kiên nhẫn cho sự tích lũy dần dần) và 'succumb to frustration when lacking immediate gratification' (đầu hàng trước thất vọng khi không nhận được sự thỏa mãn tức thì).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Because people are lazy and they only want to sleep all day.",
        diagnosticTitle: "Quy kết cảm tính một cách nông cạn",
        explanation: "Đổ lỗi cho 'lười biếng' thể hiện sự nghèo nàn trong tư duy phản biện.",
      }
    },
    {
      id: "master_w8d3_q06",
      roundIndex: 5,
      prompt: "Từ 'daunting' trong câu: 'At first, the thought of speaking in front of hundreds of people seemed utterly daunting' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Vô cùng đáng sợ và gây nản lòng thoái chí" },
        { id: "opt_B", label: "B", text: "Rất dễ dàng và thoải mái" },
        { id: "opt_C", label: "C", text: "Buồn cười và hài hước" },
        { id: "opt_D", label: "D", text: "Hoàn toàn miễn phí" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Vô cùng đáng sợ và gây nản lòng thoái chí",
      correctExplanation: "'Daunting' (nản lòng, gây e sợ, intimidating) là tính từ Band 7.0 rất thường gặp khi nói về những thử thách cam go.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Rất dễ dàng và thoải mái",
        diagnosticTitle: "Hiểu ngược nghĩa của tính từ thử thách",
        explanation: "'Daunting' mang nghĩa đáng sợ, trái ngược với 'easy/comfortable'.",
      }
    },
    {
      id: "master_w8d3_q07",
      roundIndex: 6,
      prompt: "Chọn câu có cấu trúc thì hoàn hảo để diễn đạt việc bạn đã áp dụng kỹ năng bơi lội hoặc lái xe này trong bao lâu:",
      options: [
        { id: "opt_A", label: "A", text: "Ever since I obtained my driver's license, I have navigated through complex urban traffic with burgeoning confidence." },
        { id: "opt_B", label: "B", text: "Since I got my license, I drove my car every day." },
        { id: "opt_C", label: "C", text: "I have driven my car since I was getting my license." },
        { id: "opt_D", label: "D", text: "I drive car from that day until now with confidence." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Ever since I obtained my driver's license, I have navigated through complex urban traffic with burgeoning confidence.",
      correctExplanation: "Sử dụng 'Ever since + Past Simple', mệnh đề chính dùng Present Perfect 'have navigated' kết hợp cụm từ tuyệt đẹp 'with burgeoning confidence' (với sự tự tin ngày càng lớn mạnh).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Since I got my license, I drove my car every day.",
        diagnosticTitle: "Dùng thì Quá khứ đơn ở mệnh đề chính sau 'Since'",
        explanation: "Hành động lái xe kéo dài tới nay sau 'since' phải dùng Hiện tại hoàn thành, không thể dùng 'drove'.",
      }
    },
    {
      id: "master_w8d3_q08",
      roundIndex: 7,
      prompt: "Trong Part 1, khi được hỏi: 'Do you prefer learning new skills alone or with a group?', cách trả lời nào tận dụng cấu trúc so sánh tương phản?",
      options: [
        { id: "opt_A", label: "A", text: "I would lean towards solitary learning because it allows me to progress at my own pace, whereas studying in groups often introduces distracting chatter." },
        { id: "opt_B", label: "B", text: "I like learning alone. Friends talk too much and I cannot study." },
        { id: "opt_C", label: "C", text: "Group is better because we can play games together." },
        { id: "opt_D", label: "D", text: "Both are okay for me, I don't care." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I would lean towards solitary learning because it allows me to progress at my own pace, whereas studying in groups often introduces distracting chatter.",
      correctExplanation: "'Solitary learning' (tự học một mình), 'progress at my own pace' (tiến bộ theo nhịp độ riêng), liên từ tương phản 'whereas' kết hợp 'distracting chatter' (những cuộc tán gẫu gây phân tâm) tạo nên câu trả lời mạch lạc hoàn hảo.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. I like learning alone. Friends talk too much and I cannot study.",
        diagnosticTitle: "Dùng câu đơn vụn vặt và từ ngữ trẻ con",
        explanation: "Nói từng câu đơn ngắn làm giảm điểm ngữ pháp (GRA).",
      }
    },
    {
      id: "master_w8d3_q09",
      roundIndex: 8,
      prompt: "Thành ngữ 'trial and error' trong câu chuyện học một kỹ năng thực hành có ý nghĩa gì?",
      options: [
        { id: "opt_A", label: "A", text: "Quá trình thử nghiệm và liên tục rút kinh nghiệm từ những lần thất bại để hoàn thiện kỹ năng" },
        { id: "opt_B", label: "B", text: "Một phiên tòa xét xử tội phạm vi phạm bản quyền" },
        { id: "opt_C", label: "C", text: "Việc làm sai toàn bộ bài thi và nhận điểm số 0" },
        { id: "opt_D", label: "D", text: "Học thuộc lòng sách lý thuyết mà không làm bài tập" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Quá trình thử nghiệm và liên tục rút kinh nghiệm từ những lần thất bại để hoàn thiện kỹ năng",
      correctExplanation: "'Trial and error' (phương pháp thử và sai / thực nghiệm rút kinh nghiệm) là collocation cực chuẩn để mô tả việc tự học nấu ăn, sửa xe hoặc lập trình máy tính.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Một phiên tòa xét xử tội phạm vi phạm bản quyền",
        diagnosticTitle: "Dịch từ 'trial' theo nghĩa phiên tòa xét xử",
        explanation: "Trong cụm thành ngữ này, 'trial' mang nghĩa sự thử nghiệm, không phải phiên tòa pháp lý.",
      }
    },
    {
      id: "master_w8d3_q10",
      roundIndex: 9,
      prompt: "Để thể hiện sự tự tin và kiểm soát trọn vẹn 2 phút trong Speaking Part 2, thí sinh nên làm gì khi nhận thấy giám khảo ra hiệu dừng lại?",
      options: [
        { id: "opt_A", label: "A", text: "Mỉm cười thân thiện, dừng lại nhẹ nhàng và gật đầu tự tin vì điều đó chứng tỏ bạn đã nói đủ thời lượng 2 phút tối đa" },
        { id: "opt_B", label: "B", text: "Hốt hoảng xin lỗi và cố gắng nói thật nhanh thêm 5 câu nữa" },
        { id: "opt_C", label: "C", text: "Tỏ vẻ tức giận vì nghĩ rằng giám khảo ngắt lời là do mình nói sai" },
        { id: "opt_D", label: "D", text: "Khóc và van xin giám khảo cho thi lại" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Mỉm cười thân thiện, dừng lại nhẹ nhàng và gật đầu tự tin vì điều đó chứng tỏ bạn đã nói đủ thời lượng 2 phút tối đa",
      correctExplanation: "Khi giám khảo ngắt lời ở Part 2, đó là tín hiệu đáng mừng chứng tỏ thí sinh đã hoàn thành xuất sắc bài nói chạm mốc 2 phút. Thí sinh chỉ cần mỉm cười và lắng nghe câu hỏi tiếp theo.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Hốt hoảng xin lỗi và cố gắng nói thật nhanh thêm 5 câu nữa",
        diagnosticTitle: "Tâm lý lo sợ vô cớ khi bị giám khảo ngắt lời ở mốc 2 phút",
        explanation: "Giám khảo buộc phải ngắt lời khi hết 2 phút theo đúng quy chế thi quốc tế, cố cãi hoặc nói chen vào sẽ bị trừ điểm phong thái.",
      }
    }
  ]
};
