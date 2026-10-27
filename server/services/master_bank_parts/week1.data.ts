/**
 * MASTER ARENA QUESTION BANK - WEEK 1
 * Source: Giáo trình MASTER 2027 - Đã soát lỗi.docx & Giáo án Master 2027 (Teacher Guide)
 * Target: IELTS Band 6.0 | Performance 6.0–6.5
 * 
 * Day 1: Writing (Basic Sentence Structure / Vi - Vt - Vl / Academic Collocations / Defining vs Non-defining / Compound Sentences)
 * Day 2: Reading (Scanning Technique / Table Completion / The History of Tea / Adulteration & Monopolies / TFNG)
 * Day 3: Speaking (Part 1 Direct Answers & Reasons - Results / Avoiding Fancy Clunky Vocab / Part 2 Describe a Person Framework)
 */

export const MASTER_WEEK_1_QUESTIONS: Record<string, any[]> = {
  "WEEK 1 – DAY 1": [
    {
      id: "master_w1d1_q01",
      roundIndex: 0,
      prompt: "Trong câu: 'He runs a family company in downtown.', động từ 'run' đóng vai trò là loại động từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "Ngoại động từ Transitive Verb mang nghĩa điều hành hoặc quản lý" },
        { id: "opt_B", label: "B", text: "Nội động từ Intransitive Verb chỉ hành động chạy bộ" },
        { id: "opt_C", label: "C", text: "Động từ liên kết Linking Verb chỉ trạng thái" },
        { id: "opt_D", label: "D", text: "Trợ động từ khuyết thiếu Modal Verb" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Ngoại động từ Transitive Verb mang nghĩa điều hành hoặc quản lý",
      correctExplanation: "Một số động từ tiếng Anh có thể chuyển hóa linh hoạt. Khi 'run' đi với tân ngữ 'a company' (run something), nó là Ngoại động từ (Transitive Verb) mang nghĩa điều hành/quản lý kinh doanh.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nội động từ Intransitive Verb chỉ hành động chạy bộ",
        diagnosticTitle: "Cố định một nét nghĩa cơ bản của từ vựng đa nghĩa",
        explanation: "Học sinh thường chỉ biết 'run' nghĩa là chạy bộ (Vi), không nhận ra 'run' là ngoại động từ học thuật rất phổ biến trong Writing và Speaking."
      }
    },
    {
      id: "builder_w1d1_q02",
      roundIndex: 1,
      prompt: "Chọn câu dịch chuẩn ngữ pháp và văn phong học thuật: 'Chính quyền thành phố đang bàn bạc về việc cấm phương tiện cá nhân đi vào trung tâm thành phố.'?",
      options: [
        { id: "opt_A", label: "A", text: "The city council is discussing banning private vehicles from entering the city center." },
        { id: "opt_B", label: "B", text: "The city council is discussing about banning private vehicles to enter downtown." },
        { id: "opt_C", label: "C", text: "City government discusses about to ban private vehicle entering the center." },
        { id: "opt_D", label: "D", text: "The city council discusses to ban private transport into city center." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The city council is discussing banning private vehicles from entering the city center.",
      correctExplanation: "Hai cấu trúc học thuật trọng tâm: (1) 'Discuss' là ngoại động từ, đi thẳng với V-ing (discuss doing something), KHÔNG dùng 'about'; (2) Cấu trúc 'ban somebody/something from doing something'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The city council is discussing about banning private vehicles to enter downtown.",
        diagnosticTitle: "Lỗi chêm giới từ 'about' sau discuss và dùng sai giới từ sau 'ban'",
        explanation: "Học sinh thường dịch 'bàn về' -> 'discuss about', và 'cấm để vào' -> 'ban to enter' thay vì dùng chuẩn 'from entering'."
      }
    },
    {
      id: "master_w1d1_q03",
      roundIndex: 2,
      prompt: "Chọn câu sử dụng chính xác ngoại động từ 'sentence' ở thể bị động: 'Anh ấy đã bị kết án 5 năm tù vì tội ác đã gây ra.'?",
      options: [
        { id: "opt_A", label: "A", text: "He was sentenced to five years in prison for the crime he committed." },
        { id: "opt_B", label: "B", text: "He was sentenced five years of prison with his crime." },
        { id: "opt_C", label: "C", text: "He sentenced to five years in prison because of his crime." },
        { id: "opt_D", label: "D", text: "The judge was sentenced him five years in jail for crime." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. He was sentenced to five years in prison for the crime he committed.",
      correctExplanation: "Động từ 'sentence' (tuyên án) có cấu trúc bị động chuẩn trong chủ đề Crime & Law: 'be sentenced to + [thời gian] in prison' (bị tuyên án tù).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. He sentenced to five years in prison because of his crime.",
        diagnosticTitle: "Dùng thể chủ động thay vì bị động cho động từ pháp lý",
        explanation: "Bản thân đối tượng không tự tuyên án mà nhận bản án từ thẩm phán, nên bắt buộc phải chia ở thể bị động 'was sentenced to'."
      }
    },
    {
      id: "master_w1d1_q04",
      roundIndex: 3,
      prompt: "Collocation học thuật chuẩn mực trong IELTS: Điền động từ chính xác vào câu: 'Scientists are ________ research on the detrimental effects of air pollution.'?",
      options: [
        { id: "opt_A", label: "A", text: "conducting" },
        { id: "opt_B", label: "B", text: "making" },
        { id: "opt_C", label: "C", text: "creating" },
        { id: "opt_D", label: "D", text: "practicing" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. conducting",
      correctExplanation: "Collocation học thuật cao cấp đi với 'research': 'conduct / carry out / undertake research' (tiến hành nghiên cứu). Không dùng 'make research'.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. making",
        diagnosticTitle: "Dùng từ thông tục 'make' thay vì động từ học thuật",
        explanation: "Học sinh thường dùng 'make research' theo thói quen dịch nghĩa tiếng Việt 'làm nghiên cứu'."
      }
    },
    {
      id: "master_w1d1_q05",
      roundIndex: 4,
      prompt: "Điền động từ học thuật phù hợp diễn đạt ý 'ban hành và thực thi chính sách': 'The government should ________ robust policies to enhance education in rural regions.'?",
      options: [
        { id: "opt_A", label: "A", text: "implement" },
        { id: "opt_B", label: "B", text: "release" },
        { id: "opt_C", label: "C", text: "broadcast" },
        { id: "opt_D", label: "D", text: "publish" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. implement",
      correctExplanation: "Trong chủ đề Government Policies (Writing Task 2), collocation đắt giá là 'implement / enact / adopt policies' (thực thi/ban hành chính sách). 'Broadcast' là phát sóng truyền hình, 'release' là phát hành đĩa/sản phẩm.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. release",
        diagnosticTitle: "Nhầm lẫn giữa ban hành chính sách và phát hành sản phẩm",
        explanation: "'Release' thường dùng cho phát hành phim, album nhạc hoặc phóng thích tù nhân, không phải collocation tự nhiên cho chính sách nhà nước."
      }
    },
    {
      id: "master_w1d1_q06",
      roundIndex: 5,
      prompt: "Collocation chuẩn để diễn đạt ý 'giúp trẻ phát huy tối đa tiềm năng và đạt được ước mơ' trong bài luận giáo dục là gì?",
      options: [
        { id: "opt_A", label: "A", text: "fulfill their potential and achieve their dreams" },
        { id: "opt_B", label: "B", text: "increase their potential and touch their dreams" },
        { id: "opt_C", label: "C", text: "make high their potential and catch their dreams" },
        { id: "opt_D", label: "D", text: "expand their potential and win their dreams" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. fulfill their potential and achieve their dreams",
      correctExplanation: "Collocation tự nhiên Band 6.5: 'fulfill / unlock one's potential' (phát huy tiềm năng) và 'achieve / realize one's dreams' (đạt được ước mơ).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. increase their potential and touch their dreams",
        diagnosticTitle: "Dịch từ vựng hình tượng từ tiếng Việt",
        explanation: "Học sinh Việt hay dịch 'chạm tới ước mơ' -> 'touch dreams', đây là cụm từ gượng gạo không tự nhiên trong văn phong học thuật."
      }
    },
    {
      id: "master_w1d1_q07",
      roundIndex: 6,
      prompt: "Xét câu: 'Some students abuse AI to do their homework, which is a waste of time and money.' Đại từ quan hệ 'which' trong câu này thay thế cho điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Toàn bộ hành vi lạm dụng AI để làm bài tập về nhà" },
        { id: "opt_B", label: "B", text: "Chỉ riêng bài tập về nhà homework" },
        { id: "opt_C", label: "C", text: "Chỉ riêng công nghệ trí tuệ nhân tạo AI" },
        { id: "opt_D", label: "D", text: "Những người học sinh sinh viên students" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Toàn bộ hành vi lạm dụng AI để làm bài tập về nhà",
      correctExplanation: "Trong mệnh đề quan hệ không xác định có dấu phẩy ', which + V...', đại từ 'which' thay thế cho toàn bộ sự việc được diễn đạt ở mệnh đề phía trước (việc lạm dụng AI là lãng phí).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ riêng bài tập về nhà homework",
        diagnosticTitle: "Mặc định đại từ quan hệ chỉ thay thế cho danh từ đứng sát nó",
        explanation: "Học sinh nếu không nắm vững Non-defining relative clause sẽ nghĩ 'which' bổ nghĩa cho 'homework', dẫn đến hiểu sai hoàn toàn ý nghĩa câu luận điểm."
      }
    },
    {
      id: "master_w1d1_q08",
      roundIndex: 7,
      prompt: "Rút gọn mệnh đề tính từ sau đây một cách tinh gọn nhất: 'The essay which was written by an AI tool was not accepted by the instructor.'?",
      options: [
        { id: "opt_A", label: "A", text: "The essay written by an AI tool was not accepted by the instructor." },
        { id: "opt_B", label: "B", text: "The essay writing by an AI tool was not accepted by the instructor." },
        { id: "opt_C", label: "C", text: "The essay was written by an AI tool was not accepted by the instructor." },
        { id: "opt_D", label: "D", text: "The essay been written by an AI tool was not accepted by the instructor." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The essay written by an AI tool was not accepted by the instructor.",
      correctExplanation: "Mệnh đề bị động 'which was written' được rút gọn bằng cách lược bỏ đại từ quan hệ và to be, chỉ giữ lại Past Participle 'written by an AI tool'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. The essay was written by an AI tool was not accepted by the instructor.",
        diagnosticTitle: "Lỗi Double-FV do chỉ bỏ đại từ quan hệ",
        explanation: "Nếu giữ nguyên 'was written', câu sẽ có hai cụm vị ngữ 'was written' và 'was not accepted' gây lỗi ngữ pháp nghiêm trọng."
      }
    },
    {
      id: "master_w1d1_q09",
      roundIndex: 8,
      prompt: "Trong câu: 'My car, ________ I bought last year, has proven exceptionally reliable.', đại từ quan hệ nào là LỰA CHỌN DUY NHẤT hợp lệ?",
      options: [
        { id: "opt_A", label: "A", text: "which" },
        { id: "opt_B", label: "B", text: "that" },
        { id: "opt_C", label: "C", text: "what" },
        { id: "opt_D", label: "D", text: "whom" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. which",
      correctExplanation: "'My car' là danh từ xác định, mệnh đề nằm giữa 2 dấu phẩy (Non-defining). Đại từ 'that' KHÔNG BAO GIỜ được phép dùng trong mệnh đề có dấu phẩy. 'What' không làm đại từ quan hệ nối danh từ.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. that",
        diagnosticTitle: "Lạm dụng đại từ quan hệ 'that' trong mệnh đề có dấu phẩy",
        explanation: "Học sinh thường quen miệng dùng 'that' cho mọi trường hợp đồ vật, vi phạm nguyên tắc cấm dùng 'that' sau dấu phẩy."
      }
    },
    {
      id: "master_w1d1_q10",
      roundIndex: 9,
      prompt: "Xác định câu ghép Compound Sentence chuẩn xác nhất kết hợp bằng liên từ và dấu phẩy:",
      options: [
        { id: "opt_A", label: "A", text: "Sarah enjoys reading novels, but her brother prefers graphic novels." },
        { id: "opt_B", label: "B", text: "Sarah enjoys reading novels but her brother prefers graphic novels." },
        { id: "opt_C", label: "C", text: "Sarah enjoys reading novels, however her brother prefers graphic novels." },
        { id: "opt_D", label: "D", text: "Sarah enjoys reading novels, although her brother prefers graphic novels." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Sarah enjoys reading novels, but her brother prefers graphic novels.",
      correctExplanation: "Khi kết hợp 2 mệnh đề độc lập thành câu ghép bằng liên từ kết hợp FANBOYS (and, but, or, so...), quy tắc dấu câu học thuật bắt buộc phải có DẤU PHẨY trước liên từ: '..., but ...'. Câu (C) mắc lỗi Comma Splice khi dùng 'however' sau dấu phẩy đơn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Sarah enjoys reading novels, however her brother prefers graphic novels.",
        diagnosticTitle: "Lỗi Comma Splice với trạng từ nối however",
        explanation: "'However' là conjunctive adverb, muốn nối 2 mệnh đề độc lập phải dùng chấm phẩy '; however,' chứ không dùng dấu phẩy đơn."
      }
    }
  ],

  "WEEK 1 – DAY 2": [
    {
      id: "master_w1d2_q01",
      roundIndex: 0,
      prompt: "Kỹ thuật 'Scanning' (Đọc quét) trong IELTS Reading được áp dụng hiệu quả nhất khi làm gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đảo nhanh mắt tìm kiếm thông tin cụ thể như con số, tên riêng, năm lịch sử hoặc thuật ngữ chuyên ngành" },
        { id: "opt_B", label: "B", text: "Đọc từng từ từ đầu đến cuối bài và dịch toàn bộ sang tiếng Việt" },
        { id: "opt_C", label: "C", text: "Chỉ đọc lướt tiêu đề và kết bài để nắm đại ý" },
        { id: "opt_D", label: "D", text: "Phân tích cấu trúc ngữ pháp của từng câu văn dài" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đảo nhanh mắt tìm kiếm thông tin cụ thể như con số, tên riêng, năm lịch sử hoặc thuật ngữ chuyên ngành",
      correctExplanation: "Scanning là kỹ thuật định vị từ khóa mục tiêu (Keywords locator). Thí sinh không đọc hiểu từng câu mà đảo mắt quét nhanh tọa độ của mốc thời gian, tên riêng hoặc thuật ngữ.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đọc từng từ từ đầu đến cuối bài và dịch toàn bộ sang tiếng Việt",
        diagnosticTitle: "Thói quen đọc dịch thụ động mất thời gian",
        explanation: "Học sinh dưới Band 6.0 hay nghĩ phải dịch hết bài mới làm được, dẫn đến việc thiếu thời gian làm bài nghiêm trọng."
      }
    },
    {
      id: "master_w1d2_q02",
      roundIndex: 1,
      prompt: "Trong bài đọc 'The History of Tea', theo truyền thuyết Trung Hoa, chén trà đầu tiên ra đời như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "Gió thổi một vài chiếc lá từ cây trà rơi ngẫu nhiên vào nồi nước sôi của hoàng đế Thần Nông" },
        { id: "opt_B", label: "B", text: "Hoàng đế chủ động ra lệnh cho ngự y pha chế lá cây Camellia sinensis" },
        { id: "opt_C", label: "C", text: "Các nhà sư Phật giáo Nhật Bản mang lá trà sang cống nạp" },
        { id: "opt_D", label: "D", text: "Thương nhân Bồ Đào Nha mang trà sang bán cho triều đình" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Gió thổi một vài chiếc lá từ cây trà rơi ngẫu nhiên vào nồi nước sôi của hoàng đế Thần Nông",
      correctExplanation: "Đoạn 1 nêu: '...while his servant boiled drinking water, when some leaves from the tree blew into the water. Shen Nung, a renowned herbalist, decided to try the infusion that his servant had accidentally created.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Hoàng đế chủ động ra lệnh cho ngự y pha chế lá cây Camellia sinensis",
        diagnosticTitle: "Bỏ qua yếu tố tình cờ trong văn bản",
        explanation: "Văn bản khẳng định sự ra đời là 'accidentally created' (ngẫu nhiên, tình cờ) chứ không phải do kế hoạch chủ động."
      }
    },
    {
      id: "master_w1d2_q03",
      roundIndex: 2,
      prompt: "Dưới triều đại nào thì trà chính thức trở thành quốc ẩm (national drink) của Trung Quốc?",
      options: [
        { id: "opt_A", label: "A", text: "Triều đại nhà Đường Tang Dynasty" },
        { id: "opt_B", label: "B", text: "Triều đại nhà Hán Han Dynasty" },
        { id: "opt_C", label: "C", text: "Thời kỳ năm 2737 trước Công nguyên" },
        { id: "opt_D", label: "D", text: "Triều đại nhà Thanh Qing Dynasty" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Triều đại nhà Đường Tang Dynasty",
      correctExplanation: "Đoạn 1 chỉ rõ: 'Containers for tea have been found in tombs dating from the Han Dynasty... but it was under the Tang Dynasty (618—906 AD), that tea became firmly established as the national drink of China.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Triều đại nhà Hán Han Dynasty",
        diagnosticTitle: "Bẫy chi tiết Han Dynasty",
        explanation: "Thời nhà Hán mới chỉ tìm thấy bình đựng trà trong mộ cổ ('containers for tea'), đến thời nhà Đường mới trở thành 'national drink'."
      }
    },
    {
      id: "master_w1d2_q04",
      roundIndex: 3,
      prompt: "Quốc gia châu Âu đầu tiên vận chuyển trà về nước như một mặt hàng nhập khẩu thương mại (commercial import) là quốc gia nào?",
      options: [
        { id: "opt_A", label: "A", text: "Hà Lan The Dutch" },
        { id: "opt_B", label: "B", text: "Bồ Đào Nha The Portuguese" },
        { id: "opt_C", label: "C", text: "Anh Quốc Britain" },
        { id: "opt_D", label: "D", text: "Tây Ban Nha Spain" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Hà Lan The Dutch",
      correctExplanation: "Đoạn 3 phân tích rõ: Mặc dù người Bồ Đào Nha biết đến trà trước, 'it was not the Portuguese who were the first to ship back tea as a commercial import. This was done by the Dutch... in 1606.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Bồ Đào Nha The Portuguese",
        diagnosticTitle: "Bẫy thông tin nhắc đến đầu tiên",
        explanation: "Người Bồ Đào Nha nhắc đến trà đầu tiên nhưng người Hà Lan mới là quốc gia đầu tiên nhập khẩu thương mại."
      }
    },
    {
      id: "master_w1d2_q05",
      roundIndex: 4,
      prompt: "Từ vựng 'adulteration' trong câu: 'taxation also encouraged the adulteration of tea' mang nghĩa học thuật là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Hành vi pha trộn tạp chất hoặc lá giả vào trà để trục lợi" },
        { id: "opt_B", label: "B", text: "Quy trình xuất khẩu trà qua đường biển" },
        { id: "opt_C", label: "C", text: "Sự thưởng thức trà của người trưởng thành" },
        { id: "opt_D", label: "D", text: "Việc giảm giá thuế bán lẻ trà trên thị trường" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Hành vi pha trộn tạp chất hoặc lá giả vào trà để trục lợi",
      correctExplanation: "Văn bản giải thích ngay câu sau: 'Leaves from other plants, or leaves which had already been brewed and then dried, were added to tea leaves.' 'Adulteration' là hành vi pha trộn tạp chất làm giả/bẩn thực phẩm.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Sự thưởng thức trà của người trưởng thành",
        diagnosticTitle: "Nhầm lẫn gốc từ adult (người lớn) sang adulteration (pha trộn tạp chất)",
        explanation: "Học sinh thấy chữ 'adult' trong 'adulteration' liền đoán mò từ này liên quan đến người lớn."
      }
    },
    {
      id: "master_w1d2_q06",
      roundIndex: 5,
      prompt: "Điều gì đã khiến nạn buôn lậu trà (tea smuggling) tại Anh Quốc chấm dứt gần như ngay lập tức vào năm 1784?",
      options: [
        { id: "opt_A", label: "A", text: "Thủ tướng William Pitt cắt giảm mạnh thuế trà từ 119% xuống chỉ còn 12.5%" },
        { id: "opt_B", label: "B", text: "Chính phủ xử tử tất cả các băng đảng buôn lậu trên biển" },
        { id: "opt_C", label: "C", text: "Người dân Anh chuyển hoàn toàn sang uống cà phê" },
        { id: "opt_D", label: "D", text: "Kênh đào Suez chính thức đi vào hoạt động" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thủ tướng William Pitt cắt giảm mạnh thuế trà từ 119% xuống chỉ còn 12.5%",
      correctExplanation: "Đoạn 5 viết: 'The new Prime Minister, William Pitt the Younger, slashed the tax from 119 percent to 12.5 percent. Suddenly legal tea was affordable, and smuggling stopped virtually overnight.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chính phủ xử tử tất cả các băng đảng buôn lậu trên biển",
        diagnosticTitle: "Suy luận bạo lực không có trong dữ liệu",
        explanation: "Biện pháp giải quyết gốc rễ là kinh tế (hạ thuế để trà hợp pháp rẻ hơn trà lậu)."
      }
    },
    {
      id: "master_w1d2_q07",
      roundIndex: 6,
      prompt: "Xét nhận định dạng TRUE - FALSE - NOT GIVEN: 'Tea was popular in Britain in the 16th century.'?",
      options: [
        { id: "opt_A", label: "A", text: "FALSE (Thế kỷ 16 trà hầu như chưa được biết đến rộng rãi tại Anh, mãi sau năm 1650 mới dần xuất hiện)" },
        { id: "opt_B", label: "B", text: "TRUE (Người Anh đã nhập khẩu trà từ thế kỷ 16)" },
        { id: "opt_C", label: "C", text: "NOT GIVEN (Không có dữ liệu về thế kỷ 16 tại Anh)" },
        { id: "opt_D", label: "D", text: "PARTIALLY TRUE" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. FALSE (Thế kỷ 16 trà hầu như chưa được biết đến rộng rãi tại Anh, mãi sau năm 1650 mới dần xuất hiện)",
      correctExplanation: "Đoạn 4 viết: 'Starting in 1600... The first coffee house had been established in London in 1652, and tea was still somewhat unfamiliar...'. Thế kỷ 16 (1500s) trà chưa hề phổ biến ở Anh -> Mâu thuẫn thông tin -> FALSE.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. NOT GIVEN (Không có dữ liệu về thế kỷ 16 tại Anh)",
        diagnosticTitle: "Nhầm lẫn giữa False và Not Given",
        explanation: "Bài đọc có nhắc đến mốc thời gian thế kỷ 16 và nói rõ Anh Quốc lúc đó chưa phải quốc gia uống trà."
      }
    },
    {
      id: "master_w1d2_q08",
      roundIndex: 7,
      prompt: "Xét câu hỏi điền từ (ONE WORD ONLY): 'Lu Yu wrote a ________ about tea before anyone else in the eighth century.'?",
      options: [
        { id: "opt_A", label: "A", text: "book" },
        { id: "opt_B", label: "B", text: "classic" },
        { id: "opt_C", label: "C", text: "letter" },
        { id: "opt_D", label: "D", text: "poem" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. book",
      correctExplanation: "Đoạn 2 nêu rõ: '...a writer called Lu Yu wrote the first book entirely about tea, the Ch’a Ching, or Tea Classic.' Từ khóa cần điền là danh từ 'book'.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. classic",
        diagnosticTitle: "Chọn nhầm tên riêng thay vì danh từ gốc",
        explanation: "'Tea Classic' là tên cuốn sách, còn danh từ chỉ thể loại văn bản là 'book'."
      }
    },
    {
      id: "master_w1d2_q09",
      roundIndex: 8,
      prompt: "Sự kiện nào đã chấm dứt hoàn toàn các cuộc đua thuyền buồm chở trà (Clipper races) vào những năm 1860?",
      options: [
        { id: "opt_A", label: "A", text: "Việc khai thông Kênh đào Suez giúp tàu hơi nước hơi chở hàng nhanh hơn và tiết kiệm quãng đường" },
        { id: "opt_B", label: "B", text: "Cơn bão nhiệt đới phá hủy toàn bộ thuyền buồm trên biển" },
        { id: "opt_C", label: "C", text: "Nước Anh ban hành lệnh cấm nhập khẩu trà từ châu Á" },
        { id: "opt_D", label: "D", text: "Các thương nhân Mỹ ngừng giao thương với Anh" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Việc khai thông Kênh đào Suez giúp tàu hơi nước hơi chở hàng nhanh hơn và tiết kiệm quãng đường",
      correctExplanation: "Đoạn cuối viết: 'But these races soon came to an end with the opening of the Suez Canal, which made the trade routes to China viable for steamships for the first time.'",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Nước Anh ban hành lệnh cấm nhập khẩu trà từ châu Á",
        diagnosticTitle: "Suy diễn sai lệch nguyên nhân lịch sử",
        explanation: "Sự thay đổi về công nghệ giao thông hàng hải (tàu hơi nước + kênh đào Suez) là nguyên nhân kết thúc kỷ nguyên thuyền buồm clipper."
      }
    },
    {
      id: "master_w1d2_q10",
      roundIndex: 9,
      prompt: "Từ vựng 'monopoly' trong cụm 'East India Company's monopoly on trade' có nghĩa học thuật là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đặc quyền độc quyền kinh doanh hoặc kiểm soát toàn bộ thị trường" },
        { id: "opt_B", label: "B", text: "Sự cạnh tranh tự do giữa nhiều công ty" },
        { id: "opt_C", label: "C", text: "Khoản nợ thuế đối với ngân khố quốc gia" },
        { id: "opt_D", label: "D", text: "Hệ thống hiệp hội bảo vệ người tiêu dùng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đặc quyền độc quyền kinh doanh hoặc kiểm soát toàn bộ thị trường",
      correctExplanation: "'Monopoly' là danh từ kinh tế học chỉ sự độc quyền thị trường. 'Hold a monopoly on something' là nắm giữ độc quyền kinh doanh một lĩnh vực.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Sự cạnh tranh tự do giữa nhiều công ty",
        diagnosticTitle: "Chọn nhầm khái niệm đối lập",
        explanation: "Trái ngược với độc quyền (monopoly) là thị trường tự do cạnh tranh (free market competition)."
      }
    }
  ],

  "WEEK 1 – DAY 3": [
    {
      id: "master_w1d3_q01",
      roundIndex: 0,
      prompt: "Trong tiêu chí chấm Speaking Part 1 ở Band 6.0-6.5, triết lý sư phạm quan trọng nhất của giáo viên MASTER là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Keep it simple & Get to the point, dùng từ tự nhiên và triển khai ý mạch lạc" },
        { id: "opt_B", label: "B", text: "Nhồi nhét tối đa từ vựng C2 hiếm gặp để gây ấn tượng mạnh với giám khảo" },
        { id: "opt_C", label: "C", text: "Nói liên tục suốt 5 phút không ngừng nghỉ dù lạc đề" },
        { id: "opt_D", label: "D", text: "Chỉ trả lời đúng một từ Yes hoặc No để giữ an toàn tuyệt đối" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Keep it simple & Get to the point, dùng từ tự nhiên và triển khai ý mạch lạc",
      correctExplanation: "Giáo án MASTER nhấn mạnh: Part 1 cần trực diện, tự nhiên ('keep it simple & get to the point'). Lạm dụng từ C2 kỳ quặc sẽ làm mất tính tự nhiên và dễ sai ngữ cảnh.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nhồi nhét tối đa từ vựng C2 hiếm gặp để gây ấn tượng mạnh với giám khảo",
        diagnosticTitle: "Ảo tưởng nhồi nhét 'từ vựng khủng' (Over-sophistication)",
        explanation: "Thí sinh thường cố dùng những từ như 'perambulating', 'plethora of offspring' khiến câu nói trở nên lố bịch và bị trừ điểm Lexical Resource."
      }
    },
    {
      id: "master_w1d3_q02",
      roundIndex: 1,
      prompt: "Xét câu trả lời Part 1: 'Well, it’s easy to see a plethora of offspring perambulating around massive commerce centers.' Lỗi sư phạm nghiêm trọng của câu này là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Lạm dụng từ vựng hoa mỹ quá mức khiến văn phong gượng gạo và không tự nhiên" },
        { id: "opt_B", label: "B", text: "Sai toàn bộ cấu trúc thì hiện tại đơn" },
        { id: "opt_C", label: "C", text: "Câu quá ngắn không đủ độ dài tối thiểu" },
        { id: "opt_D", label: "D", text: "Thiếu đại từ nhân xưng chủ ngữ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Lạm dụng từ vựng hoa mỹ quá mức khiến văn phong gượng gạo và không tự nhiên",
      correctExplanation: "Giáo trình MASTER trích dẫn câu này như một ví dụ điển hình về việc dùng từ kỳ quặc: 'perambulating' (đi dạo bằng xe đẩy) và 'plethora of offspring' (vô số hậu duệ). Giám khảo bản xứ sẽ đánh giá đây là cách nói không tự nhiên.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Câu quá ngắn không đủ độ dài tối thiểu",
        diagnosticTitle: "Không nhận diện được tính tự nhiên của văn phong khẩu ngữ",
        explanation: "Học sinh thường nghĩ dùng từ càng dài, càng lạ thì điểm càng cao mà không biết tiêu chí Lexical Resource đòi hỏi 'natural and appropriate usage'."
      }
    },
    {
      id: "master_w1d3_q03",
      roundIndex: 2,
      prompt: "Công thức mở rộng câu trả lời Speaking Part 1 chuẩn hóa theo mô hình 'Nguyên nhân - Kết quả' (Reasons - Results) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Direct Answer trả lời thẳng kèm Reason giải thích và Result mở rộng" },
        { id: "opt_B", label: "B", text: "Đọc thuộc lòng một đoạn văn mẫu dài 100 từ" },
        { id: "opt_C", label: "C", text: "Hỏi ngược lại giám khảo để kéo dài thời gian suy nghĩ" },
        { id: "opt_D", label: "D", text: "Chỉ nêu tên các địa điểm nổi tiếng ở thành phố" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Direct Answer trả lời thẳng kèm Reason giải thích và Result mở rộng",
      correctExplanation: "Mô hình chuẩn Band 6.0+: Trả lời trực tiếp bằng cách paraphrase câu hỏi -> Đưa ra lý do (because, since) -> Mở rộng kết quả hoặc so sánh đối chiếu (so, therefore, however).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đọc thuộc lòng một đoạn văn mẫu dài 100 từ",
        diagnosticTitle: "Học vẹt bài mẫu (Memorised response)",
        explanation: "Giám khảo IELTS được đào tạo để nhận diện ngay các câu trả lời học vẹt và sẽ chuyển câu hỏi khác hoặc trừ điểm Fluency."
      }
    },
    {
      id: "master_w1d3_q04",
      roundIndex: 3,
      prompt: "Điền cụm từ tự nhiên diễn đạt cảm giác cực kỳ thèm ăn đồ ngọt: 'My sister always ________ chocolate because of its rich taste.'?",
      options: [
        { id: "opt_A", label: "A", text: "craves for" },
        { id: "opt_B", label: "B", text: "demands on" },
        { id: "opt_C", label: "C", text: "insists at" },
        { id: "opt_D", label: "D", text: "hopes to" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. craves for",
      correctExplanation: "'Crave for something / have a craving for something' là collocation cực kỳ tự nhiên trong Speaking chỉ cảm giác thèm muốn mãnh liệt một món ăn.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. demands on",
        diagnosticTitle: "Dùng từ mang tính đòi hỏi quyền lợi cho sở thích ăn uống",
        explanation: "'Demand' mang nghĩa đòi hỏi quyền lợi hoặc yêu sách chính trị, không dùng cho cảm giác thèm ăn."
      }
    },
    {
      id: "master_w1d3_q05",
      roundIndex: 4,
      prompt: "Trong Speaking Part 2, sau khi nhận Cue Card, thí sinh có bao nhiêu thời gian để chuẩn bị ghi chú và bao nhiêu thời gian tối đa để nói?",
      options: [
        { id: "opt_A", label: "A", text: "1 phút chuẩn bị ghi chú và tối đa 2 phút trình bày độc thoại" },
        { id: "opt_B", label: "B", text: "2 phút chuẩn bị và 1 phút nói" },
        { id: "opt_C", label: "C", text: "30 giây chuẩn bị và 3 phút nói" },
        { id: "opt_D", label: "D", text: "Không có thời gian chuẩn bị và nói không giới hạn" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 1 phút chuẩn bị ghi chú và tối đa 2 phút trình bày độc thoại",
      correctExplanation: "Format chính thức của bài thi IELTS Speaking Part 2: Thí sinh có đúng 1 phút để đọc đề và viết nháp (take notes), sau đó phải nói độc thoại liên tục từ 1.5 đến 2 phút.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. 2 phút chuẩn bị và 1 phút nói",
        diagnosticTitle: "Nhầm lẫn giữa thời gian chuẩn bị và thời gian nói",
        explanation: "Nhiều học sinh nhớ nhầm 2 phút chuẩn bị, đến khi vào phòng thi thật bị giám khảo ngắt sau 1 phút đã hoảng loạn tâm lý."
      }
    },
    {
      id: "master_w1d3_q06",
      roundIndex: 5,
      prompt: "Khi làm bài Speaking Part 2 chủ đề 'Describe a person you admire', sai lầm phổ biến nhất của thí sinh Band 5.0–5.5 là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Liệt kê quá nhiều tính từ miêu tả tính cách mà không đi sâu vào chi tiết hoặc câu chuyện minh chứng" },
        { id: "opt_B", label: "B", text: "Chỉ chọn 1 nét tính cách nổi bật kèm một kỷ niệm cụ thể" },
        { id: "opt_C", label: "C", text: "Dùng thì quá khứ đơn để kể lại một hành động trong quá khứ" },
        { id: "opt_D", label: "D", text: "Nêu rõ mối quan hệ thân thiết với người đó" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Liệt kê quá nhiều tính từ miêu tả tính cách mà không đi sâu vào chi tiết hoặc câu chuyện minh chứng",
      correctExplanation: "Giáo trình MASTER cảnh báo: Thí sinh hay liệt kê một chuỗi tính từ ('hardworking, humorous, determined, passionate, caring...') khiến bài nói nông cạn. Chiến lược đúng là chọn 1-2 nét tính cách và kể sâu chi tiết hành động minh chứng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ chọn 1 nét tính cách nổi bật kèm một kỷ niệm cụ thể",
        diagnosticTitle: "Nhầm lẫn giữa phương pháp tối ưu và sai lầm phổ biến",
        explanation: "Phương án (B) là chiến lược chuẩn mà giáo viên khuyến khích, không phải sai lầm."
      }
    },
    {
      id: "master_w1d3_q07",
      roundIndex: 6,
      prompt: "Khi phát triển ý cho câu: 'I remember her telling me that I should never give up.', cấu trúc ngữ pháp sử dụng sau 'remember' ở đây diễn tả điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Nhớ lại một kỷ niệm hành động đã xảy ra trong quá khứ remember someone doing something" },
        { id: "opt_B", label: "B", text: "Nhớ phải làm một nhiệm vụ trong tương lai remember to do something" },
        { id: "opt_C", label: "C", text: "Quên mất lời khuyên của người khác" },
        { id: "opt_D", label: "D", text: "Bắt buộc người nghe phải nhớ theo mình" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nhớ lại một kỷ niệm hành động đã xảy ra trong quá khứ remember someone doing something",
      correctExplanation: "'Remember doing something' = nhớ đã làm gì trong quá khứ (kỷ niệm). 'Remember to do something' = nhớ cần phải làm bổn phận/nhiệm vụ.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nhớ phải làm một nhiệm vụ trong tương lai remember to do something",
        diagnosticTitle: "Nhầm lẫn giữa Remember V-ing và Remember To-V",
        explanation: "Đây là cặp cấu trúc ngữ pháp kinh điển mà thí sinh hay lẫn lộn khi kể chuyện quá khứ trong Speaking Part 2."
      }
    },
    {
      id: "master_w1d3_q08",
      roundIndex: 7,
      prompt: "Trong cấu trúc nói về sự lựa chọn: 'I prefer to shop online ________ buy things in crowded malls.', từ nối chuẩn xác là gì?",
      options: [
        { id: "opt_A", label: "A", text: "rather than" },
        { id: "opt_B", label: "B", text: "instead" },
        { id: "opt_C", label: "C", text: "than" },
        { id: "opt_D", label: "D", text: "more" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. rather than",
      correctExplanation: "Cấu trúc song hành so sánh sở thích: 'prefer to do something RATHER THAN do something' (thích làm cái này hơn làm cái kia).",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. instead",
        diagnosticTitle: "Dùng thiếu giới từ 'of' trong instead of",
        explanation: "Nếu dùng 'instead' phải là 'instead of buying', không dùng 'instead' đứng trơ trọi nối động từ nguyên thể."
      }
    },
    {
      id: "master_w1d3_q09",
      roundIndex: 8,
      prompt: "Khi miêu tả một người chị mà bạn ngưỡng mộ trong Part 2, từ vựng học thuật 'caring toward others' diễn đạt phẩm chất gì?",
      options: [
        { id: "opt_A", label: "A", text: "Ân cần chu đáo và luôn quan tâm giúp đỡ mọi người xung quanh" },
        { id: "opt_B", label: "B", text: "Nghiêm khắc và hay chỉ trích người khác" },
        { id: "opt_C", label: "C", text: "Thích làm việc độc lập một mình" },
        { id: "opt_D", label: "D", text: "Có khiếu hài hước và kể chuyện vui" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Ân cần chu đáo và luôn quan tâm giúp đỡ mọi người xung quanh",
      correctExplanation: "'Caring toward others' là tính từ ghép tự nhiên miêu tả người có tấm lòng nhân ái, ấm áp, luôn chu đáo chăm sóc người khác.",
      timeLimitSeconds: 15,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Nghiêm khắc và hay chỉ trích người khác",
        diagnosticTitle: "Nhầm lẫn tính từ tích cực sang tiêu cực",
        explanation: "Học sinh nhớ mang máng từ 'care' nên đoán bừa sang kỹ tính, nghiêm khắc."
      }
    },
    {
      id: "master_w1d3_q10",
      roundIndex: 9,
      prompt: "Để đạt điểm cao tiêu chí Fluency trong Part 1 khi được hỏi: 'Do you like shopping?', câu trả lời trực diện và tự nhiên nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "Not really. I find shopping quite time-consuming, so I usually order things online whenever necessary." },
        { id: "opt_B", label: "B", text: "Shopping is my favorite activity because I love it so much every single day." },
        { id: "opt_C", label: "C", text: "Yes, I like shopping." },
        { id: "opt_D", label: "D", text: "As an individual living in modern metropolis, consumerism dominates my financial budget." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Not really. I find shopping quite time-consuming, so I usually order things online whenever necessary.",
      correctExplanation: "Câu trả lời mẫu mực theo chuẩn MASTER: Trả lời thẳng thắn không vòng vo ('Not really') + Nêu lý do bằng từ vựng chất lượng ('time-consuming') + Hệ quả cụ thể ('order online whenever necessary').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. As an individual living in modern metropolis, consumerism dominates my financial budget.",
        diagnosticTitle: "Nói văn viết học thuật trong văn cảnh giao tiếp đời thường",
        explanation: "Thí sinh đem từ vựng Task 2 triết lý cao siêu vào Part 1 khiến bài nói không chân thực và mất điểm giao tiếp."
      }
    }
  ]
};
