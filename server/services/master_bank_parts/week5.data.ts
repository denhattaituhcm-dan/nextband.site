/**
 * MASTER ARENA QUESTION BANK - WEEK 5
 * Source: Giáo trình MASTER 2027 - Đã soát lỗi.docx & Giáo án Master 2027 (Teacher Guide)
 * Target: IELTS Band 6.0 | Performance 6.0–6.5
 * 
 * Day 1: Writing (Generating Ideas / Summary Nouns / Fashion Trends Essay Analysis)
 * Day 2: Reading (Prefixes and Roots / The Desolenator Clean Water / Matching Headings & One Word)
 * Day 3: Speaking (Simple Past vs Present Perfect / Since then / Describe a Course)
 */

export const MASTER_WEEK_5_QUESTIONS: Record<string, any[]> = {
  "WEEK 5 – DAY 1": [
    {
      id: "master_w5d1_q01",
      roundIndex: 0,
      prompt: "Trong câu: 'Many students rely heavily on online translation tools instead of learning vocabulary properly. [...] hinders their ability to acquire genuine language competence.' Cụm từ danh từ tóm tắt (Summary Noun) nào sau đây là chuẩn xác nhất?",
      options: [
        { id: "opt_A", label: "A", text: "This overreliance" },
        { id: "opt_B", label: "B", text: "This rely" },
        { id: "opt_C", label: "C", text: "Such reliant" },
        { id: "opt_D", label: "D", text: "That relying" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. This overreliance",
      correctExplanation: "Động từ 'rely' được chuyển hóa thành danh từ trừu tượng 'reliance' kết hợp tiền tố 'over-' chỉ sự phụ thuộc quá mức tạo thành 'This overreliance', là một Summary Noun chuẩn mực của Band 6.5+.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. This rely",
        diagnosticTitle: "Dùng trực tiếp động từ làm danh từ tóm tắt",
        explanation: "'Rely' là động từ, không thể đi trực tiếp sau đại từ chỉ định 'This' để làm cụm danh từ chủ ngữ.",
      }
    },
    {
      id: "master_w5d1_q02",
      roundIndex: 1,
      prompt: "Câu gốc: 'Some employees routinely work overtime without adequate rest to meet aggressive deadlines.' Cụm danh từ tóm tắt nào phản ánh chính xác nhất hành vi này?",
      options: [
        { id: "opt_A", label: "A", text: "This exhausting practice" },
        { id: "opt_B", label: "B", text: "This hard job" },
        { id: "opt_C", label: "C", text: "Such overtime" },
        { id: "opt_D", label: "D", text: "These workers" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. This exhausting practice",
      correctExplanation: "'This exhausting practice' (thói quen làm việc kiệt sức này) vừa tóm tắt hành vi 'routinely work overtime', vừa khái quát bản chất của vấn đề sang một cụm danh từ học thuật trang trọng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. This hard job",
        diagnosticTitle: "Dùng từ ngữ vụng về đời thường thay vì danh từ học thuật",
        explanation: "'Hard job' là từ vựng sơ cấp, không thể hiện được tính chuyên nghiệp của văn phong Task 2.",
      }
    },
    {
      id: "master_w5d1_q03",
      roundIndex: 2,
      prompt: "Chọn Summary Noun phù hợp cho câu: 'Students secretly use smartphones during exams to copy answers. [...] severely undermines academic integrity.'?",
      options: [
        { id: "opt_A", label: "A", text: "This misconduct" },
        { id: "opt_B", label: "B", text: "This bad thing" },
        { id: "opt_C", label: "C", text: "Such mistakes" },
        { id: "opt_D", label: "D", text: "That action" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. This misconduct",
      correctExplanation: "'Misconduct' (hành vi sai trái mang tính kỷ luật) là danh từ học thuật đắt giá trong chủ đề giáo dục và thi cử để tóm tắt cho hành vi gian lận.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. This bad thing",
        diagnosticTitle: "Lạm dụng từ 'thing' và 'bad' chung chung",
        explanation: "Từ 'bad thing' là biểu hiện điển hình của học sinh thiếu vốn từ vựng học thuật.",
      }
    },
    {
      id: "master_w5d1_q04",
      roundIndex: 3,
      prompt: "Với đề bài: 'Young people are spending more and more time and money following fashion trends. What are the reasons? Is this a positive or negative development?', câu nào sau đây phân tích NGUYÊN NHÂN chuẩn xác?",
      options: [
        { id: "opt_A", label: "A", text: "One major catalyst behind this phenomenon is the pervasive influence of social media algorithms and celebrity endorsements." },
        { id: "opt_B", label: "B", text: "Young people buy clothes because they want to look beautiful on Facebook and Instagram." },
        { id: "opt_C", label: "C", text: "The reason is that clothes nowadays are very cheap and fashionable in markets." },
        { id: "opt_D", label: "D", text: "Because young people like fashion so they spend huge money." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. One major catalyst behind this phenomenon is the pervasive influence of social media algorithms and celebrity endorsements.",
      correctExplanation: "Phương án A sử dụng chuỗi từ vựng band cao: 'One major catalyst behind this phenomenon' (một chất xúc tác quan trọng đằng sau hiện tượng này), 'pervasive influence' (ảnh hưởng sâu rộng), 'celebrity endorsements' (sự quảng bá từ người nổi tiếng).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Because young people like fashion so they spend huge money.",
        diagnosticTitle: "Cặp liên từ 'Because... so' và lỗi trùng lặp logic",
        explanation: "Trong tiếng Anh, tuyệt đối không dùng cả 'Because' và 'so' trong cùng một câu.",
      }
    },
    {
      id: "master_w5d1_q05",
      roundIndex: 4,
      prompt: "Chọn câu viết chuẩn để nêu TÁC ĐỘNG TIÊU CỰC của việc giới trẻ mù quáng chạy theo các xu hướng thời trang:",
      options: [
        { id: "opt_A", label: "A", text: "This reckless consumption not only imposes severe financial burdens on youths but also fosters superficial social values." },
        { id: "opt_B", label: "B", text: "Buying clothes too much makes youth poor and have bad thinking about friends." },
        { id: "opt_C", label: "C", text: "It is bad because students do not have money but still buy expensive items." },
        { id: "opt_D", label: "D", text: "Young people will waste money on fashion and then they will be unhappy." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. This reckless consumption not only imposes severe financial burdens on youths but also fosters superficial social values.",
      correctExplanation: "Cấu trúc đảo ngữ kết hợp 'not only... but also', cùng từ vựng sắc bén 'reckless consumption' (sự tiêu thụ liều lĩnh), 'imposes severe financial burdens' (gây gánh nặng tài chính nghiêm trọng) và 'fosters superficial social values' (nuôi dưỡng các giá trị hời hợt).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Buying clothes too much makes youth poor and have bad thinking about friends.",
        diagnosticTitle: "Lối diễn đạt ngô nghê theo tư duy khẩu ngữ",
        explanation: "'Makes youth poor and have bad thinking' là lối dịch nghĩa sơ cấp, không đạt chuẩn tiêu chí Lexical Resource.",
      }
    },
    {
      id: "master_w5d1_q06",
      roundIndex: 5,
      prompt: "Khi một trường học quá chú trọng vào thành tích điểm số mà bỏ quên các kỹ năng sống của học sinh, ta có thể tóm tắt bằng cụm danh từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "This disproportionate emphasis on academic metrics" },
        { id: "opt_B", label: "B", text: "This score loving habit" },
        { id: "opt_C", label: "C", text: "Such test focus" },
        { id: "opt_D", label: "D", text: "Those high points teaching" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. This disproportionate emphasis on academic metrics",
      correctExplanation: "'Disproportionate emphasis' (sự chú trọng mất cân đối) kết hợp 'academic metrics' (các chỉ số học thuật) là cụm từ nâng cấp xuất sắc cho ý 'focus too much on scores'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. This score loving habit",
        diagnosticTitle: "Ghép từ vụng về kiểu từ ghép tự chế",
        explanation: "'Score loving habit' là từ tự sáng chế kỳ dị, vi phạm tính tự nhiên của văn phong học thuật.",
      }
    },
    {
      id: "master_w5d1_q07",
      roundIndex: 6,
      prompt: "Chọn đại từ quy chiếu và danh từ tóm tắt thích hợp: 'Many parents excessively dictate their children's university majors. [...] often breeds deep resentment and stifles personal autonomy.'?",
      options: [
        { id: "opt_A", label: "A", text: "This parental interference" },
        { id: "opt_B", label: "B", text: "These parents saying" },
        { id: "opt_C", label: "C", text: "Such family tell" },
        { id: "opt_D", label: "D", text: "This forced talk" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. This parental interference",
      correctExplanation: "'Parental interference' (sự can thiệp thái quá của phụ huynh) là thuật ngữ học thuật chuẩn xác trong các bài luận chủ đề gia đình và giáo dục.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. These parents saying",
        diagnosticTitle: "Dùng cụm danh động từ vụng về không chuẩn ngữ pháp",
        explanation: "'These parents saying' không phải là danh từ chỉ khái niệm học thuật.",
      }
    },
    {
      id: "master_w5d1_q08",
      roundIndex: 7,
      prompt: "Trong bài luận Task 2 hai câu hỏi (Two-part question): 'What are the reasons? Is this a positive or negative development?', bố cục thân bài chuẩn 6.0+ cần phân chia như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "Body 1 tập trung giải quyết triệt để các nguyên nhân; Body 2 đánh giá toàn diện tác động tích cực hoặc tiêu cực" },
        { id: "opt_B", label: "B", text: "Chỉ viết về nguyên nhân ở cả hai đoạn thân bài và bỏ qua câu hỏi thứ hai" },
        { id: "opt_C", label: "C", text: "Mỗi đoạn thân bài viết lộn xộn vừa nguyên nhân vừa kết quả mà không có ranh giới rõ ràng" },
        { id: "opt_D", label: "D", text: "Viết toàn bộ bài luận thành một đoạn văn duy nhất dài 250 từ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Body 1 tập trung giải quyết triệt để các nguyên nhân; Body 2 đánh giá toàn diện tác động tích cực hoặc tiêu cực",
      correctExplanation: "Với dạng Two-part question, nguyên tắc Task Response bắt buộc: Body 1 trả lời câu hỏi 1 (Reasons), Body 2 trả lời câu hỏi 2 (Positive/Negative). Không được bỏ sót bất kỳ vế nào.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ viết về nguyên nhân ở cả hai đoạn thân bài và bỏ qua câu hỏi thứ hai",
        diagnosticTitle: "Lỗi Under-developed Task Response do bỏ sót một nửa yêu cầu đề bài",
        explanation: "Bỏ sót hoàn toàn một câu hỏi của đề bài sẽ khiến điểm Task Response bị đánh tụt xuống Band 4 hoặc 5.",
      }
    },
    {
      id: "master_w5d1_q09",
      roundIndex: 8,
      prompt: "Chọn câu viết nâng cấp học thuật cho câu kết bài của chủ đề xu hướng thời trang:",
      options: [
        { id: "opt_A", label: "A", text: "In conclusion, while fast fashion trends stem from aggressive marketing, their detrimental effects on youth finances and personal values render them largely negative." },
        { id: "opt_B", label: "B", text: "In conclusion, fashion is popular because of media and it is very bad for everyone." },
        { id: "opt_C", label: "C", text: "To sum up, young people love fashion and they should stop buying clothes right now." },
        { id: "opt_D", label: "D", text: "All in all, I think fashion has reasons and it is not good." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. In conclusion, while fast fashion trends stem from aggressive marketing, their detrimental effects on youth finances and personal values render them largely negative.",
      correctExplanation: "Câu kết bài mẫu mực: tóm tắt nguyên nhân bằng mệnh đề nhượng bộ 'while fast fashion trends stem from...', và tái khẳng định quan điểm dứt khoát 'render them largely negative'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. In conclusion, fashion is popular because of media and it is very bad for everyone.",
        diagnosticTitle: "Kết bài cụt ngủn thiếu cấu trúc ngữ pháp phức hợp",
        explanation: "Cách viết ngắn cũn với 'very bad' không phản ánh năng lực ngôn ngữ của cấp độ Master 6.0.",
      }
    },
    {
      id: "master_w5d1_q10",
      roundIndex: 9,
      prompt: "Từ 'catalyst' trong ngữ cảnh học thuật: 'Social media acts as a catalyst for impulse buying' mang nghĩa gì?",
      options: [
        { id: "opt_A", label: "A", text: "Chất xúc tác hoặc yếu tố thúc đẩy một quá trình diễn ra nhanh chóng hơn" },
        { id: "opt_B", label: "B", text: "Vật cản trở khiến mọi hành động bị ngưng trệ hoàn toàn" },
        { id: "opt_C", label: "C", text: "Công cụ đo lường mức độ hài lòng của khách hàng" },
        { id: "opt_D", label: "D", text: "Biện pháp trừng phạt tài chính của chính phủ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chất xúc tác hoặc yếu tố thúc đẩy một quá trình diễn ra nhanh chóng hơn",
      correctExplanation: "'Catalyst' (chất xúc tác) là từ vựng ẩn dụ cao cấp thường dùng trong Writing để chỉ nguyên nhân làm kích hoạt hoặc tăng tốc một hiện tượng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Vật cản trở khiến mọi hành động bị ngưng trệ hoàn toàn",
        diagnosticTitle: "Hiểu ngược nghĩa của từ xúc tác thành lực cản",
        explanation: "Từ mang nghĩa cản trở là 'obstacle' hoặc 'hindrance', trái ngược hoàn toàn với 'catalyst'.",
      }
    }
  ],

  "WEEK 5 – DAY 2": [
    {
      id: "master_w5d2_q01",
      roundIndex: 0,
      prompt: "Phân tích cấu tạo hình vị của từ học thuật 'Desalination' (Khử mặn):",
      options: [
        { id: "opt_A", label: "A", text: "Tiền tố De mang nghĩa loại bỏ kết hợp gốc từ Salin mang nghĩa muối và hậu tố ation chỉ quá trình" },
        { id: "opt_B", label: "B", text: "Tiền tố Des mang nghĩa ở dưới kết hợp gốc từ Alin mang nghĩa nước ngọt" },
        { id: "opt_C", label: "C", text: "Gốc từ Desalin kết hợp hậu tố tính từ -ation" },
        { id: "opt_D", label: "D", text: "Tiền tố De mang nghĩa lặp lại kết hợp gốc từ Salination mang nghĩa hòa tan" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tiền tố De mang nghĩa loại bỏ kết hợp gốc từ Salin mang nghĩa muối và hậu tố ation chỉ quá trình",
      correctExplanation: "Morphology chuẩn: Tiền tố 'De-' (loại bỏ/đảo ngược) + Gốc 'salin' (muối/mặn, tương tự saline) + Hậu tố '-ation' (quá trình hình thành danh từ) -> Quá trình tách muối ra khỏi nước biển.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tiền tố Des mang nghĩa ở dưới kết hợp gốc từ Alin mang nghĩa nước ngọt",
        diagnosticTitle: "Cắt sai ranh giới hình vị của tiền tố tiếng Anh",
        explanation: "Tiền tố là 'de-', không phải 'des-'; và 'salin' liên quan đến muối (saline solution).",
      }
    },
    {
      id: "master_w5d2_q02",
      roundIndex: 1,
      prompt: "Trong bài đọc 'The Desolenator: producing clean water', ý tưởng ban đầu về thiết bị này được người sáng chế William Janssen lấy cảm hứng từ đâu?",
      options: [
        { id: "opt_A", label: "A", text: "Hệ thống đun nước nóng bằng năng lượng mặt trời trên mái nhà của các hộ dân tại Thái Lan trong những năm 1990" },
        { id: "opt_B", label: "B", text: "Các nhà máy xử lý nước biển khổng lồ sử dụng dầu diesel tại UAE" },
        { id: "opt_C", label: "C", text: "Các phòng thí nghiệm hóa học hiện đại của trường Imperial College London" },
        { id: "opt_D", label: "D", text: "Các bộ lọc nước cầm tay của quân đội Mỹ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Hệ thống đun nước nóng bằng năng lượng mặt trời trên mái nhà của các hộ dân tại Thái Lan trong những năm 1990",
      correctExplanation: "Đoạn A nêu rõ: 'Travelling around Thailand in the 1990s, William Janssen was impressed with the basic rooftop solar heating systems that were on many homes... Two decades later, Janssen developed that basic idea... into a portable device'.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Các nhà máy xử lý nước biển khổng lồ sử dụng dầu diesel tại UAE",
        diagnosticTitle: "Nhầm lẫn giữa nguồn cảm hứng ban đầu và động lực thôi thúc sau này",
        explanation: "Các nhà máy tại UAE là nơi ông nhận ra lượng khí thải carbon khủng khiếp thôi thúc ông thương mại hóa sản phẩm, còn cảm hứng kỹ thuật ban đầu bắt nguồn từ Thái Lan.",
      }
    },
    {
      id: "master_w5d2_q03",
      roundIndex: 2,
      prompt: "Ưu thế cạnh tranh bán hàng cốt lõi (Main selling point) của Desolenator so với các công nghệ khử mặn truyền thống là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Hoạt động hoàn toàn bằng ánh sáng mặt trời mà không cần bất kỳ nguồn cấp điện nhân tạo nào" },
        { id: "opt_B", label: "B", text: "Được phát miễn phí cho 100% người nghèo trên khắp thế giới" },
        { id: "opt_C", label: "C", text: "Có kích thước to lớn như một nhà máy cố định" },
        { id: "opt_D", label: "D", text: "Có thể tạo ra hàng triệu lít nước ngọt mỗi giờ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Hoạt động hoàn toàn bằng ánh sáng mặt trời mà không cần bất kỳ nguồn cấp điện nhân tạo nào",
      correctExplanation: "Đoạn C ghi rõ: 'Its main selling point is that unlike standard desalination techniques, it doesn’t require a generated power supply: just sunlight'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Có thể tạo ra hàng triệu lít nước ngọt mỗi giờ",
        diagnosticTitle: "Thổi phồng công suất thực tế của thiết bị gia đình",
        explanation: "Desolenator là máy mini cho hộ gia đình, chỉ sản xuất khoảng 15 lít nước uống mỗi ngày, đủ cho sinh hoạt cơ bản.",
      }
    },
    {
      id: "master_w5d2_q04",
      roundIndex: 3,
      prompt: "Chọn MỘT TỪ DUY NHẤT từ bài đọc để điền vào chỗ trống: 'The device can be used in different locations, as it has two [...]'?",
      options: [
        { id: "opt_A", label: "A", text: "wheels" },
        { id: "opt_B", label: "B", text: "pipes" },
        { id: "opt_C", label: "C", text: "panels" },
        { id: "opt_D", label: "D", text: "batteries" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. wheels",
      correctExplanation: "Đoạn C nêu: 'it is easy to transport, thanks to its two wheels' (dễ vận chuyển nhờ có 2 bánh xe).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. pipes",
        diagnosticTitle: "Nhầm lẫn giữa bộ phận di chuyển và bộ phận dẫn nước",
        explanation: "Pipes là ống dẫn nước, không phải bộ phận giúp thiết bị di chuyển linh hoạt giữa các địa điểm.",
      }
    },
    {
      id: "master_w5d2_q05",
      roundIndex: 4,
      prompt: "Cơ chế lọc hạt cặn bẩn của thiết bị Desolenator diễn ra như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "Có một bộ lọc đơn giản giữ lại các hạt cặn và có thể lắc nhẹ để loại bỏ chúng" },
        { id: "opt_B", label: "B", text: "Sử dụng hóa chất clo liều cao để phân hủy tạp chất" },
        { id: "opt_C", label: "C", text: "Cần phải thay màng lọc nhập khẩu đắt tiền mỗi tuần" },
        { id: "opt_D", label: "D", text: "Các tạp chất tự động bốc hơi thành khí gas" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Có một bộ lọc đơn giản giữ lại các hạt cặn và có thể lắc nhẹ để loại bỏ chúng",
      correctExplanation: "Đoạn C viết: 'The device has a very simple filter to trap particles, and this can easily be shaken to remove them'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Cần phải thay màng lọc nhập khẩu đắt tiền mỗi tuần",
        diagnosticTitle: "Nghĩ theo các máy lọc nước RO thông thường ở gia đình",
        explanation: "Thiết kế của Janssen hướng tới sự đơn giản cho vùng nghèo, chỉ cần lắc bộ lọc để làm sạch chứ không cần màng đắt đỏ.",
      }
    },
    {
      id: "master_w5d2_q06",
      roundIndex: 5,
      prompt: "Tại thị trường các nước đang phát triển như Ấn Độ, mô hình tài chính nào được đề xuất để các hộ gia đình nghèo có thể sở hữu Desolenator?",
      options: [
        { id: "opt_A", label: "A", text: "Thanh toán từng đợt thông qua dịch vụ tài chính vi mô microfinance hoặc thuê thiết bị" },
        { id: "opt_B", label: "B", text: "Bắt buộc trả thẳng 1000 đô la tiền mặt một lần duy nhất" },
        { id: "opt_C", label: "C", text: "Đổi nông sản lấy thiết bị lọc nước" },
        { id: "opt_D", label: "D", text: "Vay nợ ngân hàng thế chấp bằng bất động sản" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thanh toán từng đợt thông qua dịch vụ tài chính vi mô microfinance hoặc thuê thiết bị",
      correctExplanation: "Đoạn E khẳng định: 'those who cannot afford the money for the device outright and pay through microfinance, and middle-income homes that can lease their own equipment'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bắt buộc trả thẳng 1000 đô la tiền mặt một lần duy nhất",
        diagnosticTitle: "Nhầm lẫn mức giá trả thẳng ở các nước phát triển",
        explanation: "Mức giá 1,000 đô la áp dụng cho thị trường các nước phát triển (developed countries), người nghèo ở Ấn Độ trả góp qua microfinance.",
      }
    },
    {
      id: "master_w5d2_q07",
      roundIndex: 6,
      prompt: "Tiêu đề phù hợp nhất cho Section D (phân tích tình trạng 2/3 dân số thế giới đối mặt với khan hiếm nước trầm trọng) là tiêu đề nào?",
      options: [
        { id: "opt_A", label: "A", text: "The number of people affected by water shortages" },
        { id: "opt_B", label: "B", text: "Getting the finance for production" },
        { id: "opt_C", label: "C", text: "An unexpected benefit" },
        { id: "opt_D", label: "D", text: "Cleaning water from a range of sources" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The number of people affected by water shortages",
      correctExplanation: "Section D tập trung toàn bộ vào số liệu thống kê: 'at least two-thirds of the world’s population lives with severe water scarcity... by 2030, half of the world’s population will be living with water stress'. Heading chính xác là số lượng người bị ảnh hưởng bởi khan hiếm nước.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Cleaning water from a range of sources",
        diagnosticTitle: "Nhầm sang nội dung của Section B",
        explanation: "Nội dung lọc nước từ sông, biển, giếng khoan thuộc về Section B, không phải Section D.",
      }
    },
    {
      id: "master_w5d2_q08",
      roundIndex: 7,
      prompt: "Tiền tố 'Tele-' trong từ 'Teleworking' và 'Teleservices' có nguồn gốc từ tiếng Hy Lạp mang nghĩa gì?",
      options: [
        { id: "opt_A", label: "A", text: "Từ xa hoặc qua khoảng cách địa lý" },
        { id: "opt_B", label: "B", text: "Nhanh chóng vượt bậc" },
        { id: "opt_C", label: "C", text: "Hoàn toàn miễn phí" },
        { id: "opt_D", label: "D", text: "Thuộc về truyền hình giải trí" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Từ xa hoặc qua khoảng cách địa lý",
      correctExplanation: "Tiền tố 'Tele-' có nghĩa là 'từ xa' (distant / far off), xuất hiện trong telephone, telescope, teleport, teleworking (làm việc từ xa).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Thuộc về truyền hình giải trí",
        diagnosticTitle: "Đồng nhất 'tele' với 'television'",
        explanation: "Television chỉ là một ứng dụng của tiền tố tele (nhìn thấy hình ảnh từ xa).",
      }
    },
    {
      id: "master_w5d2_q09",
      roundIndex: 8,
      prompt: "Trong bài đọc 'European transport systems', cụm từ 'flow economy' biểu thị nền kinh tế có đặc điểm gì?",
      options: [
        { id: "opt_A", label: "A", text: "Hàng hóa liên tục luân chuyển và vận chuyển linh hoạt thay vì lưu trữ số lượng lớn trong các kho chứa cố định" },
        { id: "opt_B", label: "B", text: "Nền kinh tế chỉ phụ thuộc hoàn toàn vào đường thủy và sông ngòi" },
        { id: "opt_C", label: "C", text: "Nền kinh tế chỉ cho phép thanh toán bằng tiền mặt lưu thông" },
        { id: "opt_D", label: "D", text: "Các công ty không được phép mở rộng sản xuất ra nước ngoài" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Hàng hóa liên tục luân chuyển và vận chuyển linh hoạt thay vì lưu trữ số lượng lớn trong các kho chứa cố định",
      correctExplanation: "Văn bản đối chiếu 'stock economy' (nền kinh tế tích trữ kho) với 'flow economy' (nền kinh tế luân chuyển liên tục, just-in-time logistics).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nền kinh tế chỉ phụ thuộc hoàn toàn vào đường thủy và sông ngòi",
        diagnosticTitle: "Dịch từ 'flow' theo nghĩa dòng nước chảy",
        explanation: "'Flow' trong kinh tế học chỉ dòng lưu chuyển hàng hóa dịch vụ, không phải dòng sông.",
      }
    },
    {
      id: "master_w5d2_q10",
      roundIndex: 9,
      prompt: "Khi gặp một từ vựng học thuật hoàn toàn xa lạ trong bài Reading, chiến lược hiệu quả nhất được dạy trong khóa Master là:",
      options: [
        { id: "opt_A", label: "A", text: "Bóc tách tiền tố, gốc từ, hậu tố kết hợp quan sát mạch lập luận và từ đồng vị trong câu để suy luận ý nghĩa khái quát" },
        { id: "opt_B", label: "B", text: "Dừng lại 5 phút để cố nhớ xem mình đã học từ này ở đâu" },
        { id: "opt_C", label: "C", text: "Bỏ cuộc và chọn bừa đáp án NOT GIVEN cho mọi câu hỏi chứa từ đó" },
        { id: "opt_D", label: "D", text: "Dịch từng chữ cái trong từ sang bảng chữ cái tiếng Việt" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Bóc tách tiền tố, gốc từ, hậu tố kết hợp quan sát mạch lập luận và từ đồng vị trong câu để suy luận ý nghĩa khái quát",
      correctExplanation: "Kỹ thuật phân tích hình thái từ (Morphological analysis) kết hợp ngữ cảnh (Contextual clues) là công cụ giải mã từ vựng cốt lõi giúp học viên Master tự tin xử lý bài đọc học thuật.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Dừng lại 5 phút để cố nhớ xem mình đã học từ này ở đâu",
        diagnosticTitle: "Tê liệt thời gian vì một từ lạ đơn lẻ",
        explanation: "Dừng lại quá lâu vì một từ lạ là nguyên nhân số 1 dẫn đến việc thiếu giờ làm bài thi Reading.",
      }
    }
  ],

  "WEEK 5 – DAY 3": [
    {
      id: "master_w5d3_q01",
      roundIndex: 0,
      prompt: "Phân biệt bản chất ngữ pháp giữa hai câu: 'I lived in this neighborhood for five years' và 'I have lived in this neighborhood for five years':",
      options: [
        { id: "opt_A", label: "A", text: "Câu 1: Việc sinh sống đã hoàn toàn kết thúc trong quá khứ, hiện nay không còn ở đó nữa; Câu 2: Bắt đầu từ 5 năm trước và hiện tại vẫn đang tiếp tục sinh sống ở đó" },
        { id: "opt_B", label: "B", text: "Cả hai câu đều có nghĩa là hiện tại người nói vẫn đang ở khu phố đó" },
        { id: "opt_C", label: "C", text: "Câu 1 thể hiện sự việc đang xảy ra; Câu 2 thể hiện sự việc sẽ xảy ra ở tương lai" },
        { id: "opt_D", label: "D", text: "Câu 2 là sai ngữ pháp vì 'lived' không được đi với 'have'" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Câu 1: Việc sinh sống đã hoàn toàn kết thúc trong quá khứ, hiện nay không còn ở đó nữa; Câu 2: Bắt đầu từ 5 năm trước và hiện tại vẫn đang tiếp tục sinh sống ở đó",
      correctExplanation: "Bản chất thì tiếng Anh: Quá khứ đơn (Past Simple) diễn tả hành động đã chấm dứt hoàn toàn; Hiện tại hoàn thành (Present Perfect) diễn tả hành động khởi nguồn trong quá khứ và vẫn tiếp diễn ở hiện tại.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Cả hai câu đều có nghĩa là hiện tại người nói vẫn đang ở khu phố đó",
        diagnosticTitle: "Coi mốc 'for five years' luôn kéo dài đến hiện tại bất kể thì của động từ",
        explanation: "Nhiều học sinh cứ thấy 'for + khoảng thời gian' là mặc định hành động vẫn đang diễn ra ở hiện tại, không chú ý động từ ở Quá khứ đơn đã kết thúc hoàn toàn.",
      }
    },
    {
      id: "master_w5d3_q02",
      roundIndex: 1,
      prompt: "Chọn phương án chia thì chính xác cho câu: 'I [...] this learning technique for several years, and I still [...] it indispensable for my studies.'?",
      options: [
        { id: "opt_A", label: "A", text: "have applied and find" },
        { id: "opt_B", label: "B", text: "applied and have found" },
        { id: "opt_C", label: "C", text: "am applying and found" },
        { id: "opt_D", label: "D", text: "had applied and am finding" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. have applied and find",
      correctExplanation: "Hành động áp dụng kéo dài nhiều năm tới nay: dùng Present Perfect ('have applied'); vế sau có 'still' ở hiện tại: dùng Present Simple ('find').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. applied and have found",
        diagnosticTitle: "Đảo ngược vị trí của Quá khứ đơn và Hiện tại hoàn thành",
        explanation: "Vế trước cần nhấn mạnh quá trình liên tục tới nay, vế sau là nhận định trạng thái hiện tại.",
      }
    },
    {
      id: "master_w5d3_q03",
      roundIndex: 2,
      prompt: "Cụm trạng từ liên kết 'Ever since' hoặc 'Since then' thường đóng vai trò gì trong việc chuyển thì giữa quá khứ và hiện tại?",
      options: [
        { id: "opt_A", label: "A", text: "Làm bản lề kết nối một sự kiện bước ngoặt trong quá khứ với hệ quả kéo dài liên tục tới hiện tại" },
        { id: "opt_B", label: "B", text: "Bắt buộc mệnh đề đi sau phải chia ở thì Quá khứ hoàn thành" },
        { id: "opt_C", label: "C", text: "Chỉ được dùng trong câu hỏi nghi vấn" },
        { id: "opt_D", label: "D", text: "Báo hiệu một hành động sẽ xảy ra trong tương lai xa" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Làm bản lề kết nối một sự kiện bước ngoặt trong quá khứ với hệ quả kéo dài liên tục tới hiện tại",
      correctExplanation: "'Since then / Ever since' (Kể từ đó trở đi) là công cụ kết nối cực mạnh: trước đó kể sự kiện thay đổi (Past Simple), sau đó nêu sự duy trì hoặc thói quen tích cực tới hiện tại (Present Perfect).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bắt buộc mệnh đề đi sau phải chia ở thì Quá khứ hoàn thành",
        diagnosticTitle: "Gán 'Since then' cho thì Quá khứ hoàn thành",
        explanation: "'Since then' chỉ mốc bắt đầu từ sự kiện quá khứ hướng tới hiện tại nên mệnh đề chính dùng Hiện tại hoàn thành, không dùng Quá khứ hoàn thành.",
      }
    },
    {
      id: "master_w5d3_q04",
      roundIndex: 3,
      prompt: "Khi được hỏi: 'Have you always had the same morning routine?', câu trả lời nào sau đây thể hiện khả năng phối hợp thì đạt chuẩn 6.5?",
      options: [
        { id: "opt_A", label: "A", text: "Not really. Back in university, I used to stay up late and skip breakfast regularly. However, two years ago I decided to overhaul my habits, and ever since, I have maintained an early workout routine that keeps me energized." },
        { id: "opt_B", label: "B", text: "Yes, I always wake up at 7am every day and wash my face and go to school." },
        { id: "opt_C", label: "C", text: "I have had this routine since long time ago because my mother told me." },
        { id: "opt_D", label: "D", text: "No, I had different routines. Yesterday I wake late, today I wake early." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Not really. Back in university, I used to stay up late and skip breakfast regularly. However, two years ago I decided to overhaul my habits, and ever since, I have maintained an early workout routine that keeps me energized.",
      correctExplanation: "Câu trả lời kết hợp nhuần nhuyễn: quá khứ với 'used to stay up late', mốc bước ngoặt 'decided to overhaul', và 'ever since, I have maintained...' ở Hiện tại hoàn thành, tạo nên mạch tự sự đầy sức sống.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. No, I had different routines. Yesterday I wake late, today I wake early.",
        diagnosticTitle: "Lỗi loạn thì và diễn đạt vụn vặt",
        explanation: "Dùng từ ngữ chắp vá 'Yesterday I wake...' vi phạm ngữ pháp cơ bản.",
      }
    },
    {
      id: "master_w5d3_q05",
      roundIndex: 4,
      prompt: "Trong Speaking Part 2 với chủ đề: 'Describe a course or training program you completed', luận điểm nào sau đây thể hiện rõ tính ứng dụng thực tế (Practical Application) của khóa học?",
      options: [
        { id: "opt_A", label: "A", text: "The hands-on coding workshops equipped me with practical debugging skills that I immediately utilized to build my own web application." },
        { id: "opt_B", label: "B", text: "The course was in a big classroom and had 50 students sitting listening to teacher." },
        { id: "opt_C", label: "C", text: "The course fee was very cheap and the teacher gave us many papers to read." },
        { id: "opt_D", label: "D", text: "I took the course because I had nothing else to do during the summer holiday." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The hands-on coding workshops equipped me with practical debugging skills that I immediately utilized to build my own web application.",
      correctExplanation: "Luận điểm nêu bật cụm từ 'hands-on workshops' (xưởng thực hành trực tiếp), 'equipped me with practical debugging skills' (trang bị kỹ năng sửa lỗi thực chiến) và việc ứng dụng ngay vào xây dựng sản phẩm.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The course was in a big classroom and had 50 students sitting listening to teacher.",
        diagnosticTitle: "Chỉ mô tả bề ngoài phòng học thay vì giá trị chuyên môn thu nhận được",
        explanation: "Thí sinh band thấp chỉ biết tả số lượng bàn ghế học sinh mà không trình bày được kiến thức kỹ năng tiếp thu.",
      }
    },
    {
      id: "master_w5d3_q06",
      roundIndex: 5,
      prompt: "Chọn collocation học thuật phù hợp nhất để mô tả chất lượng giảng dạy của một giảng viên:",
      options: [
        { id: "opt_A", label: "A", text: "an exceptionally engaging pedagogue who breaks down convoluted concepts into digestible insights" },
        { id: "opt_B", label: "B", text: "a very good teacher who speaks very easily and nicely" },
        { id: "opt_C", label: "C", text: "a person teaching very clearly without difficult things" },
        { id: "opt_D", label: "D", text: "a friendly instructor having lots of fun stories" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. an exceptionally engaging pedagogue who breaks down convoluted concepts into digestible insights",
      correctExplanation: "'Exceptionally engaging pedagogue' (nhà sư phạm lôi cuốn xuất sắc), 'breaks down convoluted concepts into digestible insights' (chia nhỏ các khái niệm phức tạp thành kiến thức dễ hiểu) đạt điểm tối đa ở tiêu chí Lexical Resource.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. a very good teacher who speaks very easily and nicely",
        diagnosticTitle: "Lạm dụng tính từ 'very' và các từ mô tả nông cạn",
        explanation: "'Very easily and nicely' là văn nói của trẻ em, không mang sắc thái học thuật.",
      }
    },
    {
      id: "master_w5d3_q07",
      roundIndex: 6,
      prompt: "Chọn câu trả lời tự nhiên nhất khi giám khảo hỏi: 'Have you ever lost something valuable?'?",
      options: [
        { id: "opt_A", label: "A", text: "Unfortunately, yes. A few years ago, I inadvertently misplaced my laptop bag at a coffee shop, which caused me immense anxiety as it contained all my research data." },
        { id: "opt_B", label: "B", text: "Yes I lost my wallet yesterday. It has money." },
        { id: "opt_C", label: "C", text: "I have lost many things because I am a careless person." },
        { id: "opt_D", label: "D", text: "No, losing things is impossible for me." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Unfortunately, yes. A few years ago, I inadvertently misplaced my laptop bag at a coffee shop, which caused me immense anxiety as it contained all my research data.",
      correctExplanation: "Sử dụng từ vựng chính xác: 'inadvertently misplaced' (vô tình để quên), 'caused immense anxiety' (gây ra sự hoảng hốt lo lắng tột độ), giải thích chi tiết lý do giá trị ('contained all my research data').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Yes I lost my wallet yesterday. It has money.",
        diagnosticTitle: "Lỗi lẫn lộn thì hiện tại 'It has' cho ví bị mất hôm qua",
        explanation: "Kể chuyện hôm qua nhưng lại dùng 'It has money' thay vì 'It contained money'.",
      }
    },
    {
      id: "master_w5d3_q08",
      roundIndex: 7,
      prompt: "Thành phần nào sau đây là KHÔNG NÊN làm trong phần thi IELTS Speaking Part 2?",
      options: [
        { id: "opt_A", label: "A", text: "Học thuộc lòng nguyên văn một bài văn mẫu trên mạng rồi trả lời như một cái máy bất chấp gợi ý trên Cue Card" },
        { id: "opt_B", label: "B", text: "Sử dụng các trải nghiệm có thật hoặc đã chuẩn bị sẵn khung từ vựng linh hoạt" },
        { id: "opt_C", label: "C", text: "Duy trì giao tiếp bằng mắt eye contact tự nhiên với giám khảo" },
        { id: "opt_D", label: "D", text: "Nhấn trọng âm câu và ngữ điệu để bài nói có biểu cảm" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Học thuộc lòng nguyên văn một bài văn mẫu trên mạng rồi trả lời như một cái máy bất chấp gợi ý trên Cue Card",
      correctExplanation: "Giám khảo IELTS được đào tạo chuyên sâu để phát hiện các bài nói học vẹt (recited / memorized responses). Thí sinh học vẹt sẽ bị trừ điểm rất nặng ở tiêu chí Fluency và Pronunciation.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Nhấn trọng âm câu và ngữ điệu để bài nói có biểu cảm",
        diagnosticTitle: "Coi ngữ điệu biểu cảm là hành động tiêu cực",
        explanation: "Ngữ điệu tự nhiên và trọng âm câu là tiêu chí chấm điểm cốt lõi của Pronunciation.",
      }
    },
    {
      id: "master_w5d3_q09",
      roundIndex: 8,
      prompt: "Chọn từ điền vào chỗ trống: 'I have followed this online educational channel ever since I [...] across their crash course on statistics.'?",
      options: [
        { id: "opt_A", label: "A", text: "stumbled" },
        { id: "opt_B", label: "B", text: "have stumbled" },
        { id: "opt_C", label: "C", text: "stumble" },
        { id: "opt_D", label: "D", text: "had stumbled" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. stumbled",
      correctExplanation: "Sau liên từ 'since / ever since' chỉ mốc thời gian một sự kiện đã xảy ra và kết thúc trong quá khứ, ta dùng thì Quá khứ đơn: 'stumbled across' (tình cờ bắt gặp).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. have stumbled",
        diagnosticTitle: "Dùng Hiện tại hoàn thành ngay sau liên từ 'since'",
        explanation: "Mệnh đề sau 'since' chỉ mốc thời điểm quá khứ phải chia Quá khứ đơn, chỉ có mệnh đề chính mới chia Hiện tại hoàn thành.",
      }
    },
    {
      id: "master_w5d3_q10",
      roundIndex: 9,
      prompt: "Cụm 'hands-on experience' trong bài nói về giáo dục và kỹ năng mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Kinh nghiệm thực hành thực tế thông qua việc tự tay làm và trải nghiệm" },
        { id: "opt_B", label: "B", text: "Kinh nghiệm được truyền lại thông qua việc bắt tay chào hỏi" },
        { id: "opt_C", label: "C", text: "Việc chép bài bằng tay suốt buổi học" },
        { id: "opt_D", label: "D", text: "Kinh nghiệm học lý thuyết suông từ sách giáo khoa" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Kinh nghiệm thực hành thực tế thông qua việc tự tay làm và trải nghiệm",
      correctExplanation: "'Hands-on experience' là collocation kinh điển biểu thị kinh nghiệm thực tế, thực hành cọ xát trực tiếp, đối lập với 'purely theoretical learning' (học lý thuyết suông).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Việc chép bài bằng tay suốt buổi học",
        diagnosticTitle: "Dịch từ theo nghĩa đen chữ 'hand'",
        explanation: "Hands-on mang tính ẩn dụ là bắt tay vào thực hành, không phải dùng tay chép chữ.",
      }
    }
  ]
};
