/**
 * MASTER ARENA QUESTION BANK - WEEK 7
 * Source: Giáo trình MASTER 2027 - Đã soát lỗi.docx & Giáo án Master 2027 (Teacher Guide)
 * Target: IELTS Band 6.0 | Performance 6.0–6.5
 * 
 * Day 1: Writing (Causes & Impacts Essay Structure / Gender Roles & Shopping as Leisure)
 * Day 2: Reading (Leonardo da Vinci An Ideal City / Milan Plague 1484 / Two-level Urban Plan / TFNG)
 * Day 3: Speaking (Part 3 Abstract Questions with 'Depends' Structure / Urban vs Rural / Part 2 Dilemmas)
 */

export const MASTER_WEEK_7_QUESTIONS: Record<string, any[]> = {
  "WEEK 7 – DAY 1": [
    {
      id: "master_w7d1_q01",
      roundIndex: 0,
      prompt: "Trong dạng bài Causes and Effects (Nguyên nhân & Tác động) của Task 2, việc tổ chức hai đoạn thân bài chuẩn xác nhất theo giáo trình Master là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Body 1 tập trung phân tích từ 2 nguyên nhân cốt lõi; Body 2 đánh giá từ 2 tác động xã hội quan trọng" },
        { id: "opt_B", label: "B", text: "Trộn lẫn mỗi đoạn một nguyên nhân và một tác động kèm nhau không có ranh giới rõ rệt" },
        { id: "opt_C", label: "C", text: "Chỉ viết nguyên nhân ở cả hai đoạn thân bài và bỏ qua phần tác động" },
        { id: "opt_D", label: "D", text: "Viết toàn bộ nguyên nhân vào phần mở bài và tác động vào phần kết bài" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Body 1 tập trung phân tích từ 2 nguyên nhân cốt lõi; Body 2 đánh giá từ 2 tác động xã hội quan trọng",
      correctExplanation: "Bố cục mẫu mực cho Causes & Effects: Body 1 phân tích thấu đáo các nguyên nhân (Causes), Body 2 mổ xẻ các hệ quả/tác động (Effects). Sự phân định rạch ròi này tối ưu hóa điểm Coherence & Cohesion và Task Response.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Trộn lẫn mỗi đoạn một nguyên nhân và một tác động kèm nhau không có ranh giới rõ rệt",
        diagnosticTitle: "Cấu trúc thân bài chắp vá gây nhiễu loạn mạch logic",
        explanation: "Trộn lẫn nguyên nhân và tác động trong từng đoạn khiến người chấm khó theo dõi tiến triển luận điểm (progression).",
      }
    },
    {
      id: "master_w7d1_q02",
      roundIndex: 1,
      prompt: "Với đề bài: 'In many societies, traditional gender roles are changing rapidly. Discuss the causes and effects of this trend.', câu mở đoạn (Topic Sentence) nào là phù hợp nhất cho Body 1 (Causes)?",
      options: [
        { id: "opt_A", label: "A", text: "There are several compelling factors bringing about this profound transformation in societal gender norms." },
        { id: "opt_B", label: "B", text: "Women are going to work now because they want money." },
        { id: "opt_C", label: "C", text: "Traditional gender roles have many problems in the world today." },
        { id: "opt_D", label: "D", text: "Men do not cook food so women must change their roles." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. There are several compelling factors bringing about this profound transformation in societal gender norms.",
      correctExplanation: "Mẫu câu chủ đề bao quát: 'There are several compelling factors bringing about this profound transformation in societal gender norms' (Có một số yếu tố thuyết phục mang lại sự chuyển biến sâu sắc này trong các chuẩn mực giới tính của xã hội) đạt chuẩn C1.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Women are going to work now because they want money.",
        diagnosticTitle: "Bắt đầu thân bài bằng một chi tiết phụ hẹp hòi thay vì câu chủ đề bao quát",
        explanation: "Phụ nữ đi làm kiếm tiền chỉ là một ý phụ hỗ trợ (Supporting idea), không thể đại diện làm câu chủ đề của toàn bộ đoạn văn.",
      }
    },
    {
      id: "master_w7d1_q03",
      roundIndex: 2,
      prompt: "Chọn câu phân tích NGUYÊN NHÂN sâu sắc cho sự thay đổi vai trò giới trong xã hội hiện đại:",
      options: [
        { id: "opt_A", label: "A", text: "First and foremost, the proliferation of higher education has empowered females to pursue professional careers, thereby dismantling historical domestic expectations." },
        { id: "opt_B", label: "B", text: "First, girls go to universities so they don't want to stay at home and cook." },
        { id: "opt_C", label: "C", text: "Men are very lazy nowadays and they force women to earn income." },
        { id: "opt_D", label: "D", text: "Because modern society is new, everything changes automatically." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. First and foremost, the proliferation of higher education has empowered females to pursue professional careers, thereby dismantling historical domestic expectations.",
      correctExplanation: "Cấu trúc từ vựng học thuật đỉnh cao: 'proliferation of higher education' (sự phổ cập giáo dục đại học), 'empowered females to pursue professional careers' (trao quyền cho phụ nữ theo đuổi sự nghiệp), 'dismantling historical domestic expectations' (xóa bỏ định kiến nội trợ lịch sử).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. First, girls go to universities so they don't want to stay at home and cook.",
        diagnosticTitle: "Lối diễn đạt nôm na mang tính khẩu ngữ đời thường",
        explanation: "'Girls go to universities... don't want to cook' là câu nói chuyện thông tục, không đạt tính trang trọng của IELTS Writing.",
      }
    },
    {
      id: "master_w7d1_q04",
      roundIndex: 3,
      prompt: "Chọn câu mở đoạn (Topic Sentence) chuẩn xác cho Body 2 để chuyển sang phân tích TÁC ĐỘNG (Effects) của sự thay đổi vai trò giới:",
      options: [
        { id: "opt_A", label: "A", text: "This sociological paradigm shift yields substantial repercussions for both family dynamics and national economic productivity." },
        { id: "opt_B", label: "B", text: "Secondly, there are many good and bad results from women working." },
        { id: "opt_C", label: "C", text: "Effects are very important when gender roles change in our country." },
        { id: "opt_D", label: "D", text: "Now I will tell you about the results of this situation." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. This sociological paradigm shift yields substantial repercussions for both family dynamics and national economic productivity.",
      correctExplanation: "'This sociological paradigm shift' (sự chuyển dịch mô thức xã hội học này), 'yields substantial repercussions' (tạo ra những hệ quả đáng kể) cho 'family dynamics' (cấu trúc vận hành gia đình) và 'economic productivity' (năng suất kinh tế).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Now I will tell you about the results of this situation.",
        diagnosticTitle: "Xưng hô 'I will tell you' như văn nói giao tiếp",
        explanation: "Văn phong IELTS Academic tuyệt đối kiêng kỵ việc xưng hô giao tiếp 'Now I will tell you'.",
      }
    },
    {
      id: "master_w7d1_q05",
      roundIndex: 4,
      prompt: "Với đề bài: 'Shopping is becoming more and more popular as a leisure activity. Why is shopping so popular? What effects does it have on individuals and society?', luận điểm nào sau đây lý giải NGUYÊN NHÂN tâm lý của hiện tượng này?",
      options: [
        { id: "opt_A", label: "A", text: "Modern air-conditioned malls provide comprehensive entertainment complexes where retail therapy offers transient stress relief." },
        { id: "opt_B", label: "B", text: "People shop because they have nothing to eat at home." },
        { id: "opt_C", label: "C", text: "Supermarkets are very big and have many colorful lights." },
        { id: "opt_D", label: "D", text: "Governments force citizens to go shopping every weekend." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Modern air-conditioned malls provide comprehensive entertainment complexes where retail therapy offers transient stress relief.",
      correctExplanation: "Khái niệm 'comprehensive entertainment complexes' (khu phức hợp giải trí toàn diện) và 'retail therapy offers transient stress relief' (liệu pháp mua sắm giúp giải tỏa căng thẳng tạm thời) giải thích trực diện và sâu sắc nguyên nhân tâm lý xã hội.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. People shop because they have nothing to eat at home.",
        diagnosticTitle: "Đánh đồng mua sắm giải trí (Leisure shopping) với việc mua thực phẩm sinh tồn cơ bản",
        explanation: "Đề bài nhấn mạnh 'shopping as a leisure activity' (mua sắm như một thú tiêu khiển giải trí), việc mua đồ ăn vì đói là nhu cầu sinh học, không phải leisure.",
      }
    },
    {
      id: "master_w7d1_q06",
      roundIndex: 5,
      prompt: "Chọn câu phân tích TÁC ĐỘNG TIÊU CỰC của việc mua sắm như thú vui đối với cá nhân:",
      options: [
        { id: "opt_A", label: "A", text: "On an individual level, compulsive buying behavior can precipitate crippling personal credit debt and foster chronic materialism." },
        { id: "opt_B", label: "B", text: "People who shop will lose all money and have no clothes to wear." },
        { id: "opt_C", label: "C", text: "Going to malls makes people walk too much and get leg pain." },
        { id: "opt_D", label: "D", text: "It is bad because bags are heavy for consumers to carry home." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. On an individual level, compulsive buying behavior can precipitate crippling personal credit debt and foster chronic materialism.",
      correctExplanation: "'Compulsive buying behavior' (hành vi mua sắm cưỡng chế/nghiện mua sắm), 'crippling personal credit debt' (nợ tín dụng cá nhân tê liệt tài chính) và 'foster chronic materialism' (nuôi dưỡng chủ nghĩa thực dụng vật chất kinh niên).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Going to malls makes people walk too much and get leg pain.",
        diagnosticTitle: "Chọn tiểu tiết thể chất buồn cười thay vì hệ quả tài chính tâm lý học thuật",
        explanation: "'Mỏi chân' là hệ quả tầm thường không có giá trị học thuật trong bài luận IELTS.",
      }
    },
    {
      id: "master_w7d1_q07",
      roundIndex: 6,
      prompt: "Cụm từ nào sau đây đồng nghĩa và trang trọng hơn cụm 'brings about many problems'?",
      options: [
        { id: "opt_A", label: "A", text: "gives rise to a multitude of socio-economic predicaments" },
        { id: "opt_B", label: "B", text: "has many bad troubles" },
        { id: "opt_C", label: "C", text: "makes everything go down badly" },
        { id: "opt_D", label: "D", text: "creates lots of difficult questions" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. gives rise to a multitude of socio-economic predicaments",
      correctExplanation: "'Gives rise to' (làm nảy sinh), 'a multitude of' (vô số), 'socio-economic predicaments' (những vấn đề nan giải về mặt kinh tế xã hội) là cụm nâng cấp chuẩn C1.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. has many bad troubles",
        diagnosticTitle: "Dùng từ 'troubles' và 'bad' sơ đẳng",
        explanation: "'Bad troubles' là lối nói thông tục của người mới học tiếng Anh.",
      }
    },
    {
      id: "master_w7d1_q08",
      roundIndex: 7,
      prompt: "Chọn liên từ thích hợp để điền vào chỗ trống: 'Women have achieved significant autonomy in the workplace. [...], deeply ingrained societal expectations regarding domestic responsibilities continue to impose a double burden on working mothers.'?",
      options: [
        { id: "opt_A", label: "A", text: "Nonetheless" },
        { id: "opt_B", label: "B", text: "Consequently" },
        { id: "opt_C", label: "C", text: "Furthermore" },
        { id: "opt_D", label: "D", text: "Likewise" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nonetheless",
      correctExplanation: "Hai vế thể hiện sự đối lập nhượng bộ: đạt quyền tự chủ ở nơi làm việc nhưng vẫn phải gánh vác việc nhà (gánh nặng kép) -> bắt buộc dùng liên từ chỉ tương phản 'Nonetheless' (Tuy nhiên).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Consequently",
        diagnosticTitle: "Nhầm lẫn giữa quan hệ tương phản và quan hệ nhân quả",
        explanation: "Gánh nặng việc nhà không phải là kết quả tất yếu của quyền tự chủ nơi công sở, mà là một thực tế định kiến đối lập còn tồn đọng.",
      }
    },
    {
      id: "master_w7d1_q09",
      roundIndex: 8,
      prompt: "Trong bài thi IELTS Writing Task 2, tỷ lệ phân bổ thời gian lý tưởng nhất cho 40 phút là gì?",
      options: [
        { id: "opt_A", label: "A", text: "5 phút lập dàn ý, 30-32 phút viết bài tập trung cao độ, 3-5 phút soát lỗi ngữ pháp và chính tả" },
        { id: "opt_B", label: "B", text: "Viết ngay lập tức trong 40 phút mà không cần lập dàn ý hay kiểm tra lại" },
        { id: "opt_C", label: "C", text: "Dành 25 phút lập dàn ý và chỉ có 15 phút để viết cả bài" },
        { id: "opt_D", label: "D", text: "Dành 38 phút để tra từ điển và 2 phút để chép bài mẫu" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 5 phút lập dàn ý, 30-32 phút viết bài tập trung cao độ, 3-5 phút soát lỗi ngữ pháp và chính tả",
      correctExplanation: "Kỷ luật phòng thi chuẩn Master: 5m Planning (Blueprint) -> 30m Timed Writing -> 5m Error Audit. 3-5 phút soát lỗi cuối giờ giúp cứu từ 0.5 đến 1.0 band điểm ngữ pháp do các lỗi ngớ ngẩn (s/es, thì, mạo từ).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Viết ngay lập tức trong 40 phút mà không cần lập dàn ý hay kiểm tra lại",
        diagnosticTitle: "Lao vào viết ngay không lập dàn ý dẫn đến lạc đề hoặc cạn ý giữa chừng",
        explanation: "Viết không có dàn ý thường dẫn đến việc viết lan man, tẩy xóa và mất kiểm soát thời gian.",
      }
    },
    {
      id: "master_w7d1_q10",
      roundIndex: 9,
      prompt: "Chọn câu tóm lược kết bài chuẩn mực cho đề bài về sự thay đổi vai trò giới:",
      options: [
        { id: "opt_A", label: "A", text: "In conclusion, while shifting gender roles are driven by educational empowerment and economic necessity, their ongoing evolution fundamentally redefines societal structures towards greater gender equity." },
        { id: "opt_B", label: "B", text: "In conclusion, men and women are now equal and that is very good for the future." },
        { id: "opt_C", label: "C", text: "To sum up, traditional roles are dead and we should forget them." },
        { id: "opt_D", label: "D", text: "All in all, women will take over all jobs in the upcoming decades." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. In conclusion, while shifting gender roles are driven by educational empowerment and economic necessity, their ongoing evolution fundamentally redefines societal structures towards greater gender equity.",
      correctExplanation: "Một kết bài trọn vẹn: tóm tắt nguyên nhân ('educational empowerment and economic necessity') và khẳng định tác động ('fundamentally redefines societal structures towards greater gender equity').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. To sum up, traditional roles are dead and we should forget them.",
        diagnosticTitle: "Ngôn từ thô lỗ và cực đoan",
        explanation: "'Traditional roles are dead' là phát ngôn cảm tính, không phù hợp văn phong học thuật.",
      }
    }
  ],

  "WEEK 7 – DAY 2": [
    {
      id: "master_w7d2_q01",
      roundIndex: 0,
      prompt: "Bối cảnh lịch sử nào đã thôi thúc Leonardo da Vinci thiết kế bản quy hoạch 'An Ideal City' (Thành phố Lý tưởng) cho Công tước Milan Ludovico Sforza?",
      options: [
        { id: "opt_A", label: "A", text: "Đại dịch hạch Cái Chết Đen hoành hành năm 1484-1485 cướp đi sinh mạng của một phần ba dân số thành phố Milan" },
        { id: "opt_B", label: "B", text: "Một trận hỏa hoạn lớn thiêu rụi toàn bộ các cung điện mùa hè của hoàng gia Ý" },
        { id: "opt_C", label: "C", text: "Cuộc chiến tranh xâm lược từ các đội quân phương Bắc buộc thành phố phải xây thành lũy mới" },
        { id: "opt_D", label: "D", text: "Sự xuất hiện của những chiếc ô tô hơi nước đầu tiên đòi hỏi đường sá rộng hơn" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đại dịch hạch Cái Chết Đen hoành hành năm 1484-1485 cướp đi sinh mạng của một phần ba dân số thành phố Milan",
      correctExplanation: "Bài đọc nêu rõ bối cảnh: Trận dịch hạch thảm khốc năm 1484-1485 tại Milan với mật độ dân cư ngột ngạt và điều kiện vệ sinh tồi tàn đã thúc đẩy Leonardo thiết kế một thành phố văn minh, sạch sẽ và thông thoáng.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Một trận hỏa hoạn lớn thiêu rụi toàn bộ các cung điện mùa hè của hoàng gia Ý",
        diagnosticTitle: "Nhầm lẫn với thảm họa hỏa hoạn London 1666",
        explanation: "Thảm họa ở Milan là dịch hạch (the plague), không phải hỏa hoạn.",
      }
    },
    {
      id: "master_w7d2_q02",
      roundIndex: 1,
      prompt: "Đột phá kiến trúc mang tính cách mạng nhất trong thiết kế Thành phố Lý tưởng của Leonardo da Vinci là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Mô hình đô thị phân tầng hai cấp độ riêng biệt: tầng trên dành cho quý tộc và người đi bộ, tầng dưới kết nối kênh đào dành cho vận tải hàng hóa và hệ thống thoát chất thải" },
        { id: "opt_B", label: "B", text: "Xây dựng các tòa nhà chọc trời bằng kính và khung thép chịu lực" },
        { id: "opt_C", label: "C", text: "Bao bọc toàn bộ thành phố bằng một mái vòm khổng lồ chống thời tiết" },
        { id: "opt_D", label: "D", text: "Đào đường hầm tàu điện ngầm chạy bằng điện ngầm dưới đáy biển" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Mô hình đô thị phân tầng hai cấp độ riêng biệt: tầng trên dành cho quý tộc và người đi bộ, tầng dưới kết nối kênh đào dành cho vận tải hàng hóa và hệ thống thoát chất thải",
      correctExplanation: "Ý tưởng thiên tài của Da Vinci là 'two-level city' (đô thị 2 tầng): tầng trên thoáng mát sạch sẽ đón ánh nắng dành cho cư dân đi bộ, tầng dưới phục vụ hậu cần, rác thải và kênh nước luân chuyển.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Xây dựng các tòa nhà chọc trời bằng kính và khung thép chịu lực",
        diagnosticTitle: "Gán ghép công nghệ hiện đại thế kỷ 20 vào thời kỳ Phục hưng thế kỷ 15",
        explanation: "Thế kỷ 15 chưa có kính chịu lực và thép công nghiệp.",
      }
    },
    {
      id: "master_w7d2_q03",
      roundIndex: 2,
      prompt: "Nhận định sau là TRUE, FALSE hay NOT GIVEN theo bài đọc: 'People first referred to Leonardo da Vinci as a genius 500 years ago.'?",
      options: [
        { id: "opt_A", label: "A", text: "FALSE" },
        { id: "opt_B", label: "B", text: "TRUE" },
        { id: "opt_C", label: "C", text: "NOT GIVEN" },
        { id: "opt_D", label: "D", text: "INAPPLICABLE" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. FALSE",
      correctExplanation: "Bài đọc chỉ ra rằng vào thời của ông (500 năm trước), từ 'genius' chưa được dùng theo nghĩa ngày nay, và mọi người chỉ coi ông là một họa sĩ và kỹ sư phục vụ triều đình. Mãi đến nhiều thế kỷ sau hậu thế mới tôn vinh ông là thiên tài toàn năng -> FALSE.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. TRUE",
        diagnosticTitle: "Mặc định từ 'genius' đã được gắn cho Leonardo từ khi ông còn sống",
        explanation: "Thí sinh suy nghĩ theo cảm tính rằng Leonardo luôn được gọi là thiên tài từ 500 năm trước mà không đọc kỹ sự phân tích lịch sử của bài.",
      }
    },
    {
      id: "master_w7d2_q04",
      roundIndex: 3,
      prompt: "Hệ thống kênh đào (Canal network) trong bản thiết kế của Leonardo phục vụ mục đích vệ sinh dịch tễ nào?",
      options: [
        { id: "opt_A", label: "A", text: "Cung cấp dòng nước chảy liên tục để rửa trôi chất thải sinh hoạt và ngăn chặn nước tù đọng lây lan mầm bệnh" },
        { id: "opt_B", label: "B", text: "Nuôi cá nước ngọt để cung cấp thức ăn cho toàn bộ cư dân nghèo" },
        { id: "opt_C", label: "C", text: "Tạo nơi bơi lội giải trí cho trẻ em thành phố trong mùa hè" },
        { id: "opt_D", label: "D", text: "Làm rào chắn quân sự ngăn chặn kỵ binh đối phương áp sát chân thành" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Cung cấp dòng nước chảy liên tục để rửa trôi chất thải sinh hoạt và ngăn chặn nước tù đọng lây lan mầm bệnh",
      correctExplanation: "Da Vinci nhận ra nguyên nhân dịch bệnh là nước tù đọng và rác thải bốc mùi; hệ thống cống kênh của ông sử dụng dòng chảy tự nhiên kết hợp van điều tiết để liên tục cuốn trôi tạp chất.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Làm rào chắn quân sự ngăn chặn kỵ binh đối phương áp sát chân thành",
        diagnosticTitle: "Nhầm kênh đô thị vệ sinh với hào nước quân sự quanh lâu đài (Moat)",
        explanation: "Đây là mạng lưới kênh đào bên trong khu đô thị (urban canals) phục vụ giao thông và vệ sinh, không phải hào chiến đấu.",
      }
    },
    {
      id: "master_w7d2_q05",
      roundIndex: 4,
      prompt: "Quy chuẩn thiết kế chiều rộng đường phố của Leonardo da Vinci được tính toán dựa trên thông số nào?",
      options: [
        { id: "opt_A", label: "A", text: "Chiều rộng đường phố tối thiểu phải bằng chiều cao của các tòa nhà liền kề để đảm bảo ánh sáng mặt trời chiếu sáng đầy đủ" },
        { id: "opt_B", label: "B", text: "Bằng chiều dài của đúng 10 con ngựa xếp hàng ngang" },
        { id: "opt_C", label: "C", text: "Càng hẹp càng tốt để người dân có thể che nắng cho nhau" },
        { id: "opt_D", label: "D", text: "Quy định cố định 100 mét cho mọi ngõ ngách trong thành phố" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chiều rộng đường phố tối thiểu phải bằng chiều cao của các tòa nhà liền kề để đảm bảo ánh sáng mặt trời chiếu sáng đầy đủ",
      correctExplanation: "Nguyên tắc thiết kế không gian: Leonardo đề ra quy chuẩn chiều rộng lòng đường tương đương chiều cao nhà bên cạnh ('width equal to the height of adjacent buildings') nhằm tối đa hóa luồng gió và ánh nắng diệt khuẩn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Càng hẹp càng tốt để người dân có thể che nắng cho nhau",
        diagnosticTitle: "Nghĩ theo tập quán đường hẹp của các thành phố Trung cổ cũ",
        explanation: "Đường ngõ hẹp Trung cổ chính là nguyên nhân làm dịch bệnh bùng phát mà Leonardo kiên quyết loại bỏ.",
      }
    },
    {
      id: "master_w7d2_q06",
      roundIndex: 5,
      prompt: "Lý do chính khiến bản quy hoạch Thành phố Lý tưởng của Leonardo da Vinci KHÔNG BAO GIỜ được thi công xây dựng trên thực tế vào thời kỳ đó là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Chi phí tài chính quá khổng lồ vượt quá ngân khố của Công tước Sforza và sự hạn chế của công nghệ xây dựng thời bấy giờ" },
        { id: "opt_B", label: "B", text: "Leonardo làm mất toàn bộ các bản vẽ phác thảo thiết kế" },
        { id: "opt_C", label: "C", text: "Người dân thành phố Milan biểu tình phản đối kịch liệt" },
        { id: "opt_D", label: "D", text: "Giáo hội cấm chỉ việc xây dựng cầu thang bộ dạng xoắn ốc" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chi phí tài chính quá khổng lồ vượt quá ngân khố của Công tước Sforza và sự hạn chế của công nghệ xây dựng thời bấy giờ",
      correctExplanation: "Thiết kế của Da Vinci đi trước thời đại hàng trăm năm: ngân sách xây dựng vượt xa tiềm lực tài chính của Milan và đòi hỏi công nghệ cơ khí thủy lực chưa sẵn sàng ở thế kỷ 15.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Leonardo làm mất toàn bộ các bản vẽ phác thảo thiết kế",
        diagnosticTitle: "Suy đoán vô căn cứ trái ngược với ghi chép lịch sử",
        explanation: "Các bản thảo Codex Paris B của Da Vinci vẫn được lưu giữ trọn vẹn đến ngày nay.",
      }
    },
    {
      id: "master_w7d2_q07",
      roundIndex: 6,
      prompt: "Từ 'sanitation' trong câu: 'Leonardo recognized that poor sanitation was the primary catalyst for the epidemic' có nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Điều kiện vệ sinh dịch tễ và hệ thống xử lý rác thải công cộng" },
        { id: "opt_B", label: "B", text: "Chất lượng của các món ăn trong hoàng cung" },
        { id: "opt_C", label: "C", text: "Khả năng chữa bệnh của các bác sĩ tư nhân" },
        { id: "opt_D", label: "D", text: "Hệ thống trường học dành cho trẻ em mồ côi" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Điều kiện vệ sinh dịch tễ và hệ thống xử lý rác thải công cộng",
      correctExplanation: "'Sanitation' (vệ sinh công cộng, điều kiện vệ sinh môi trường) là từ vựng cốt lõi trong các chủ đề sức khỏe cộng đồng và quy hoạch đô thị.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Khả năng chữa bệnh của các bác sĩ tư nhân",
        diagnosticTitle: "Nhầm sanitation (phòng dịch vệ sinh) với cure/treatment (chữa bệnh)",
        explanation: "'Sanitation' là điều kiện phòng ngừa vệ sinh môi trường, không phải việc điều trị thuốc men.",
      }
    },
    {
      id: "master_w7d2_q08",
      roundIndex: 7,
      prompt: "Phương pháp 'Goal-Oriented Reading' (Đọc theo mục tiêu truy vết) giúp thí sinh xử lý các đoạn văn dài có nhiều thuật ngữ lịch sử bằng cách nào?",
      options: [
        { id: "opt_A", label: "A", text: "Xác định rõ câu hỏi đang săn tìm dữ kiện gì như nhân vật, năm tháng hay sự kiện gì và chỉ dừng lại quét sâu khi chạm đúng từ khóa mục tiêu" },
        { id: "opt_B", label: "B", text: "Ngồi dịch toàn bộ bài đọc từ từ từng dòng một" },
        { id: "opt_C", label: "C", text: "Đọc thuộc lòng các danh từ riêng tiếng Ý trong bài" },
        { id: "opt_D", label: "D", text: "Bỏ qua các câu có chứa số liệu hoặc năm" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Xác định rõ câu hỏi đang săn tìm dữ kiện gì như nhân vật, năm tháng hay sự kiện gì và chỉ dừng lại quét sâu khi chạm đúng từ khóa mục tiêu",
      correctExplanation: "Đọc định hướng mục tiêu (Goal-Oriented Reading) là kỹ thuật lọc thông tin chủ động: biến việc đọc bài thành cuộc 'săn lùng dữ liệu đích', giúp tiết kiệm 40% thời gian làm bài.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Ngồi dịch toàn bộ bài đọc từ từ từng dòng một",
        diagnosticTitle: "Dịch xuôi từng dòng gây cháy giờ làm bài",
        explanation: "Dịch từng dòng là thói quen xấu nhất khiến thí sinh không bao giờ kịp làm xong 40 câu hỏi trong 60 phút.",
      }
    },
    {
      id: "master_w7d2_q09",
      roundIndex: 8,
      prompt: "Chọn từ đồng nghĩa với 'unprecedented' trong câu: 'Leonardo proposed an unprecedented vision of urban planning':",
      options: [
        { id: "opt_A", label: "A", text: "groundbreaking chưa từng có tiền lệ" },
        { id: "opt_B", label: "B", text: "ordinary hoàn toàn bình thường" },
        { id: "opt_C", label: "C", text: "outdated đã bị lỗi thời" },
        { id: "opt_D", label: "D", text: "repetitive lặp đi lặp lại nhiều lần" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. groundbreaking chưa từng có tiền lệ",
      correctExplanation: "'Unprecedented' (chưa từng có tiền lệ) đồng nghĩa với 'groundbreaking' (mang tính đột phá mở đường) hoặc 'novel'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. ordinary hoàn toàn bình thường",
        diagnosticTitle: "Hiểu ngược nghĩa với từ đột phá",
        explanation: "'Ordinary' là tầm thường thông thường, trái ngược với 'unprecedented'.",
      }
    },
    {
      id: "master_w7d2_q10",
      roundIndex: 9,
      prompt: "Trong bài đọc, chi tiết về loài chim Dodo bị tuyệt chủng vào năm 1681 ('The last one was killed in 1681') thường được tác giả đưa ra nhằm minh họa cho điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tác động tàn phá vĩnh viễn của con người và các loài thú săn mồi xâm lấn lên hệ sinh thái mong manh của các hòn đảo biệt lập" },
        { id: "opt_B", label: "B", text: "Sự thông minh vượt trội của các loài chim không biết bay" },
        { id: "opt_C", label: "C", text: "Kỹ thuật ướp xác động vật của các thủy thủ Hà Lan" },
        { id: "opt_D", label: "D", text: "Nạn đói xảy ra trên toàn thế giới vào thế kỷ 17" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tác động tàn phá vĩnh viễn của con người và các loài thú săn mồi xâm lấn lên hệ sinh thái mong manh của các hòn đảo biệt lập",
      correctExplanation: "Chim Dodo ở đảo Mauritius là biểu tượng kinh điển của sự tuyệt chủng do con người săn bắt và mang theo lợn, chuột xâm lấn phá hủy trứng chim.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Sự thông minh vượt trội của các loài chim không biết bay",
        diagnosticTitle: "Hiểu sai bản chất sự diệt vong của loài chim Dodo",
        explanation: "Dodo không hề thông minh mà ngược lại quá ngây thơ không sợ con người (do tiến hóa trên đảo không có thú săn mồi) nên dễ dàng bị tiêu diệt.",
      }
    }
  ],

  "WEEK 7 – DAY 3": [
    {
      id: "master_w7d3_q01",
      roundIndex: 0,
      prompt: "Trong Speaking Part 3, cấu trúc 'It depends' được áp dụng để trả lời các câu hỏi trừu tượng như thế nào nhằm đạt điểm 6.5+?",
      options: [
        { id: "opt_A", label: "A", text: "Mở đầu bằng 'It largely depends on...' rồi phân tích hai nhóm đối tượng hoặc hai hoàn cảnh trái ngược nhau bằng 'For those who..., whereas for people who...'" },
        { id: "opt_B", label: "B", text: "Chỉ nói mỗi cụm từ 'It depends' rồi im lặng chờ giám khảo hỏi tiếp" },
        { id: "opt_C", label: "C", text: "Nói rằng mình không biết câu trả lời vì câu hỏi quá khó" },
        { id: "opt_D", label: "D", text: "Luôn luôn khẳng định mọi việc đều đúng 100% trong mọi tình huống" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Mở đầu bằng 'It largely depends on...' rồi phân tích hai nhóm đối tượng hoặc hai hoàn cảnh trái ngược nhau bằng 'For those who..., whereas for people who...'",
      correctExplanation: "Công thức Master 'Depends structure': 'It largely depends on whether... For young people who prioritize career advancement, X is superior; however, for retirees seeking tranquility, Y is far more suitable'. Thể hiện khả năng biện luận hai chiều của Band 6.5–7.0.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ nói mỗi cụm từ 'It depends' rồi im lặng chờ giám khảo hỏi tiếp",
        diagnosticTitle: "Trả lời cụt lủn một câu 'It depends' rồi tắc nghẽn",
        explanation: "Nói 'It depends' mà không giải thích phụ thuộc vào yếu tố gì thì bị coi là câu trả lời cụt ngủn (incomplete response).",
      }
    },
    {
      id: "master_w7d3_q02",
      roundIndex: 1,
      prompt: "Chọn câu trả lời mẫu mực cho câu hỏi: 'Do you think it is better to live in a big city or in the countryside?'?",
      options: [
        { id: "opt_A", label: "A", text: "Well, I believe it largely depends on an individual's stage of life and personal priorities. For ambitious young professionals seeking lucrative careers, metropolitan living is indispensable; however, for retirees craving tranquility and clean air, rural areas are undoubtedly preferable." },
        { id: "opt_B", label: "B", text: "City is better because city has supermarkets and cinemas. Countryside has cows and trees." },
        { id: "opt_C", label: "C", text: "I like both city and countryside because I am a very easy person." },
        { id: "opt_D", label: "D", text: "City living is always 100% best choice for everyone in the world." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Well, I believe it largely depends on an individual's stage of life and personal priorities. For ambitious young professionals seeking lucrative careers, metropolitan living is indispensable; however, for retirees craving tranquility and clean air, rural areas are undoubtedly preferable.",
      correctExplanation: "Phương án A là đỉnh cao của sự mạch lạc và từ vựng phong phú: 'individual's stage of life and personal priorities', 'ambitious young professionals', 'craving tranquility'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. City is better because city has supermarkets and cinemas. Countryside has cows and trees.",
        diagnosticTitle: "Cách diễn đạt ngô nghê và tư duy so sánh trẻ con",
        explanation: "'City has cinemas, countryside has cows' là lối so sánh cực kỳ non nớt của học sinh tiểu học.",
      }
    },
    {
      id: "master_w7d3_q03",
      roundIndex: 2,
      prompt: "Khi được hỏi: 'Do you think students should study abroad or attend domestic universities?', câu trả lời nào vận dụng cấu trúc 'Whether S + V' chuẩn xác?",
      options: [
        { id: "opt_A", label: "A", text: "I suppose it hinges on whether a student possesses sufficient emotional resilience and financial resources to thrive in a foreign environment." },
        { id: "opt_B", label: "B", text: "It depends whether students like abroad or not." },
        { id: "opt_C", label: "C", text: "Whether student go abroad is good question." },
        { id: "opt_D", label: "D", text: "Students must study whether they have money or no money." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I suppose it hinges on whether a student possesses sufficient emotional resilience and financial resources to thrive in a foreign environment.",
      correctExplanation: "Cấu trúc nâng cao: 'It hinges on whether + S + V' (Nó phụ thuộc chặt chẽ vào việc liệu...), kết hợp 'emotional resilience' (bản lĩnh tâm lý vững vàng) và 'financial resources' (tiềm lực tài chính).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. It depends whether students like abroad or not.",
        diagnosticTitle: "Thiếu giới từ 'on' sau 'depends'",
        explanation: "Động từ depend bắt buộc phải đi kèm giới từ: 'depends on whether...'.",
      }
    },
    {
      id: "master_w7d3_q04",
      roundIndex: 3,
      prompt: "Khi giám khảo hỏi: 'Is it easy to find suitable accommodation in your city?', cách trả lời nào nêu bật được thách thức thực tế của đô thị lớn?",
      options: [
        { id: "opt_A", label: "A", text: "Not at all. Skyrocketing rental prices coupled with a severe shortage of affordable housing make house hunting an excruciating ordeal for migrant workers and students." },
        { id: "opt_B", label: "B", text: "Yes very easy, just go on Facebook and search house." },
        { id: "opt_C", label: "C", text: "No, finding house is difficult because my city has many people." },
        { id: "opt_D", label: "D", text: "There are lots of hotels so people can sleep there." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Not at all. Skyrocketing rental prices coupled with a severe shortage of affordable housing make house hunting an excruciating ordeal for migrant workers and students.",
      correctExplanation: "Từ vựng đắt giá: 'Skyrocketing rental prices' (giá thuê nhà tăng chóng mặt phi mã), 'severe shortage of affordable housing' (thiếu hụt nhà ở giá bình dân trầm trọng), 'excruciating ordeal' (một thử thách vô cùng gian nan).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Yes very easy, just go on Facebook and search house.",
        diagnosticTitle: "Coi câu hỏi xã hội học như việc lướt mạng xã hội cá nhân",
        explanation: "Trả lời nông cạn không chạm đến bản chất khó khăn của thị trường bất động sản.",
      }
    },
    {
      id: "master_w7d3_q05",
      roundIndex: 4,
      prompt: "Trong khung bài nói Part 2 kể về một tình huống khó khăn (Difficult situation), phần 'Life lessons' (Bài học rút ra) ở cuối bài nói nên tập trung vào điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Sự trưởng thành về mặt tâm lý, khả năng giải quyết khủng hoảng và tính kiên định mà trải nghiệm đó đã rèn giũa cho bản thân" },
        { id: "opt_B", label: "B", text: "Than vãn rằng số phận của mình quá đen đủi và bất công" },
        { id: "opt_C", label: "C", text: "Kể tội và đổ lỗi cho những người xung quanh đã không giúp đỡ mình" },
        { id: "opt_D", label: "D", text: "Nói rằng nếu được chọn lại thì mình sẽ bỏ cuộc ngay từ đầu" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Sự trưởng thành về mặt tâm lý, khả năng giải quyết khủng hoảng và tính kiên định mà trải nghiệm đó đã rèn giũa cho bản thân",
      correctExplanation: "Phần kết của Storytelling luôn cần thể hiện tinh thần 'Personal Growth & Resilience' (sự trưởng thành cá nhân và lòng kiên cường), mang lại năng lượng tích cực và chiều sâu tư duy.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Than vãn rằng số phận của mình quá đen đủi và bất công",
        diagnosticTitle: "Biến bài thi nói thành buổi than vãn tiêu cực",
        explanation: "Than thở tiêu cực không giúp thể hiện năng lực sử dụng ngôn ngữ học thuật.",
      }
    },
    {
      id: "master_w7d3_q06",
      roundIndex: 5,
      prompt: "Từ 'tranquility' đồng nghĩa với từ nào sau đây?",
      options: [
        { id: "opt_A", label: "A", text: "serenity sự thanh bình yên ả" },
        { id: "opt_B", label: "B", text: "chaos sự hỗn loạn ồn ào" },
        { id: "opt_C", label: "C", text: "congestion sự tắc nghẽn kẹt xe" },
        { id: "opt_D", label: "D", text: "urgency sự khẩn cấp cấp bách" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. serenity sự thanh bình yên ả",
      correctExplanation: "'Tranquility' đồng nghĩa hoàn toàn với 'serenity' (sự yên bình, tĩnh lặng thanh khiết), là từ vựng rất hay khi miêu tả vùng quê hoặc không gian nghỉ ngơi.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. chaos sự hỗn loạn ồn ào",
        diagnosticTitle: "Hiểu ngược nghĩa với từ tĩnh lặng",
        explanation: "'Chaos' (hỗn loạn) trái ngược hoàn toàn với 'tranquility'.",
      }
    },
    {
      id: "master_w7d3_q07",
      roundIndex: 6,
      prompt: "Chọn cách diễn đạt chỉ sự phân vân giữa hai lựa chọn khó khăn trong Speaking:",
      options: [
        { id: "opt_A", label: "A", text: "I found myself at a critical crossroads, torn between pursuing my artistic passion and selecting a lucrative corporate career." },
        { id: "opt_B", label: "B", text: "I did not know what to do because I liked painting and I also liked money." },
        { id: "opt_C", label: "C", text: "It was hard because two roads were in front of my legs." },
        { id: "opt_D", label: "D", text: "My brain was very confusing about my job choice." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I found myself at a critical crossroads, torn between pursuing my artistic passion and selecting a lucrative corporate career.",
      correctExplanation: "Thành ngữ 'at a critical crossroads' (đứng trước ngã rẽ cuộc đời quan trọng) và cấu trúc 'torn between A and B' (bị giằng xé giữa A và B) thể hiện phong cách nói tự nhiên và điêu luyện.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. It was hard because two roads were in front of my legs.",
        diagnosticTitle: "Dịch thô thành ngữ 'ngã rẽ cuộc đời' theo nghĩa đen hai con đường",
        explanation: "Dịch 'crossroads' thành con đường trước chân là lỗi dịch vụng về.",
      }
    },
    {
      id: "master_w7d3_q08",
      roundIndex: 7,
      prompt: "Trong Speaking Part 3, khi giám khảo hỏi câu hỏi suy đoán tương lai: 'Will more people migrate from rural areas to megacities in the next decade?', câu trả lời nào áp dụng chuẩn ngôn ngữ suy đoán (Hedging)?",
      options: [
        { id: "opt_A", label: "A", text: "It is highly probable that urbanization will accelerate, provided that industrial hubs continue to offer superior employment prospects." },
        { id: "opt_B", label: "B", text: "Yes 100%, all farmers will definitely abandon villages tomorrow." },
        { id: "opt_C", label: "C", text: "No, nobody will go to cities because cities are crowded." },
        { id: "opt_D", label: "D", text: "I cannot predict because I am not a fortune teller." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. It is highly probable that urbanization will accelerate, provided that industrial hubs continue to offer superior employment prospects.",
      correctExplanation: "Ngôn ngữ suy đoán học thuật (Hedging): dùng 'It is highly probable that...' (rất có khả năng là...) kết hợp mệnh đề điều kiện 'provided that...' (với điều kiện là...), tránh sự khẳng định chắc nịch nông nổi.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Yes 100%, all farmers will definitely abandon villages tomorrow.",
        diagnosticTitle: "Khẳng định tuyệt đối hóa 100% trong câu hỏi dự đoán tương lai",
        explanation: "Tương lai luôn bất định, việc khẳng định chắc chắn 100% là vi phạm tính khách quan của tư duy học thuật.",
      }
    },
    {
      id: "master_w7d3_q09",
      roundIndex: 8,
      prompt: "Cụm từ 'amenities' trong câu: 'Metropolitan areas boast world-class amenities' chỉ những tiện ích gì?",
      options: [
        { id: "opt_A", label: "A", text: "Các công trình phúc lợi và tiện ích công cộng như bệnh viện, trường học, công viên và trung tâm văn hóa" },
        { id: "opt_B", label: "B", text: "Những chiếc xe tải chở rác chạy ban đêm" },
        { id: "opt_C", label: "C", text: "Các biển hiệu quảng cáo đèn led trên vỉa hè" },
        { id: "opt_D", label: "D", text: "Những cây cầu sắt đã bị rỉ sét" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Các công trình phúc lợi và tiện ích công cộng như bệnh viện, trường học, công viên và trung tâm văn hóa",
      correctExplanation: "'Amenities' (tiện ích cuộc sống, công trình phúc lợi) là từ vựng quen thuộc bậc cao trong chủ đề Urbanization và Living standards.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Các biển hiệu quảng cáo đèn led trên vỉa hè",
        diagnosticTitle: "Hiểu nhầm tiện ích thành đồ vật trang trí đường phố",
        explanation: "Amenities bao hàm các dịch vụ công ích phục vụ đời sống cư dân, không phải biển hiệu quảng cáo.",
      }
    },
    {
      id: "master_w7d3_q10",
      roundIndex: 9,
      prompt: "Để đạt điểm cao trong Speaking Part 3, thí sinh nên tương tác với giám khảo theo tâm thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "Xem như một cuộc thảo luận học thuật bình đẳng, tự tin bảo vệ quan điểm logic và chấp nhận các góc nhìn đa chiều" },
        { id: "opt_B", label: "B", text: "Xem như một cuộc hỏi cung cảnh sát và chỉ dám trả lời Dạ, Vâng ngắn gọn" },
        { id: "opt_C", label: "C", text: "Cố gắng tranh cãi lớn tiếng và ngắt lời giám khảo để chứng tỏ mình biết nhiều" },
        { id: "opt_D", label: "D", text: "Lặp lại từng câu hỏi của giám khảo bằng tiếng Việt" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Xem như một cuộc thảo luận học thuật bình đẳng, tự tin bảo vệ quan điểm logic và chấp nhận các góc nhìn đa chiều",
      correctExplanation: "Bản chất Part 3 là 'Two-way Discussion'. Thí sinh bước vào phòng thi với tâm thế của một học giả tự tin trao đổi ý kiến chuyên môn sẽ đạt điểm Fluency & Pronunciation cao nhất.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Xem như một cuộc hỏi cung cảnh sát và chỉ dám trả lời Dạ, Vâng ngắn gọn",
        diagnosticTitle: "Tâm lý sợ hãi bị động khiến bài thi bị bế tắc",
        explanation: "Thí sinh sợ hãi chỉ trả lời Yes/No sẽ không thể phô diễn được năng lực ngữ pháp và từ vựng.",
      }
    }
  ]
};
