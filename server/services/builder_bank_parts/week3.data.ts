/**
 * BUILDER ARENA QUESTION BANK - WEEK 3
 * Source: Giáo trình BUILDER 2027 - Đã soát lỗi.docx & Giáo án Builder 2027
 * Target: Band 5.0 IELTS
 * Day 1: Writing (Writing a Body Paragraph / Topic Sentence / Cause-Effect Connectors)
 * Day 2: Reading (Main Idea & Details / Autumn Leaves - Why Leaves Turn Red)
 * Day 3: Speaking (Movies / Consonants / Movie Idioms & Collocations)
 */

export const BUILDER_WEEK_3_QUESTIONS: Record<string, any[]> = {
  "WEEK 3 – DAY 1": [
    {
      id: "builder_w3d1_q01",
      roundIndex: 0,
      prompt: "Trong bài thi IELTS Writing Task 2, dung lượng tiêu chuẩn của MỘT đoạn Thân bài (Body Paragraph) thường dao động trong khoảng nào?",
      options: [
        { id: "opt_A", label: "A", text: "80 – 100 words" },
        { id: "opt_B", label: "B", text: "20 – 30 words" },
        { id: "opt_C", label: "C", text: "150 – 200 words" },
        { id: "opt_D", label: "D", text: "250 – 300 words" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 80 – 100 words",
      correctExplanation: "Một bài Task 2 chuẩn khoảng 250-280 từ gồm 2 đoạn thân bài. Mỗi đoạn body cần khoảng 80-100 từ (khoảng 4-6 câu) để phát triển trọn vẹn luận điểm.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. 150 – 200 words",
        diagnosticTitle: "Nhầm độ dài một đoạn thân bài với dung lượng cả bài",
        explanation: "150-200 từ là độ dài quá lớn cho 1 đoạn đơn lẻ, khiến bài viết mất cân đối hoặc không đủ thời gian làm phần mở và kết bài."
      }
    },
    {
      id: "builder_w3d1_q02",
      roundIndex: 1,
      prompt: "Vai trò cốt lõi của câu Chủ đề (Topic Sentence) đứng ở đầu đoạn Thân bài là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Nêu bật ý tưởng chính và định hướng toàn bộ nội dung của đoạn văn" },
        { id: "opt_B", label: "B", text: "Đưa ra các số liệu thống kê chi tiết từ các cuộc khảo sát thực tế" },
        { id: "opt_C", label: "C", text: "Tóm tắt lại toàn bộ bài luận và đưa ra lời khuyên cá nhân" },
        { id: "opt_D", label: "D", text: "Trích dẫn nguyên văn câu hỏi đề bài đưa ra để kéo dài dung lượng" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nêu bật ý tưởng chính và định hướng toàn bộ nội dung của đoạn văn",
      correctExplanation: "Topic Sentence là câu mở đầu mang ý nghĩa khái quát, trả lời trực tiếp một khía cạnh của đề bài và định hướng cho các câu Supporting Ideas phía sau.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Đưa ra các số liệu thống kê chi tiết từ các cuộc khảo sát thực tế",
        diagnosticTitle: "Nhầm câu chủ đề với câu dẫn chứng (Evidence/Example)",
        explanation: "Số liệu khảo sát là dẫn chứng cụ thể (Supporting Detail), không bao giờ được đặt làm câu chủ đề khái quát của đoạn."
      }
    },
    {
      id: "builder_w3d1_q03",
      roundIndex: 2,
      prompt: "Hai phương thức logic và hiệu quả nhất để phát triển ý bổ trợ (Supporting Idea) sau câu chủ đề là:",
      options: [
        { id: "opt_A", label: "A", text: "Explanation and Example" },
        { id: "opt_B", label: "B", text: "Repetition and Translation" },
        { id: "opt_C", label: "C", text: "Greeting and Apology" },
        { id: "opt_D", label: "D", text: "Rhyming and Storytelling" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Explanation and Example",
      correctExplanation: "Công thức chuẩn phát triển luận điểm: Nêu ý chính -> Giải thích lý do/cơ chế (Explanation) -> Đưa ra ví dụ minh họa hoặc hệ quả thực tế (Example/Impact).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Repetition and Translation",
        diagnosticTitle: "Lỗi lặp ý (Circular reasoning) trong lập luận",
        explanation: "Nhiều học sinh chỉ lặp lại câu chủ đề bằng từ đồng nghĩa (Repetition) mà không hề giải thích lý do hay đưa ví dụ thực tế."
      }
    },
    {
      id: "builder_w3d1_q04",
      roundIndex: 3,
      prompt: "Điền cụm động từ chỉ kết quả: \"Excessive smartphone usage among children can ______ severe vision deterioration.\"",
      options: [
        { id: "opt_A", label: "A", text: "lead to" },
        { id: "opt_B", label: "B", text: "result from" },
        { id: "opt_C", label: "C", text: "stem from" },
        { id: "opt_D", label: "D", text: "originate in" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. lead to",
      correctExplanation: "'Lead to' = dẫn đến (Nguyên nhân -> Kết quả). Các cụm 'result from / stem from / originate in' đều có chiều ngược lại (Kết quả <- Nguyên nhân).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. result from",
        diagnosticTitle: "Đảo ngược chiều nhân quả giữa 'result in' và 'result from'",
        explanation: "Học sinh rất hay nhầm 'result from' (bắt nguồn từ) với 'result in' (dẫn đến)."
      }
    },
    {
      id: "builder_w3d1_q05",
      roundIndex: 4,
      prompt: "Chọn cụm từ đồng nghĩa với 'causes' / 'leads to': \"Chronic sleep deprivation frequently ______ impaired memory and poor concentration.\"",
      options: [
        { id: "opt_A", label: "A", text: "results in" },
        { id: "opt_B", label: "B", text: "results from" },
        { id: "opt_C", label: "C", text: "stems from" },
        { id: "opt_D", label: "D", text: "is attributed to" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. results in",
      correctExplanation: "'Results in' mang nghĩa dẫn đến, gây ra (Cause -> Effect). Ba phương án còn lại đều chỉ nguồn gốc xuất phát từ nguyên nhân.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. results from",
        diagnosticTitle: "Nhầm lẫn giới từ 'in' và 'from' sau result",
        explanation: "Nhớ quy tắc vàng: A results in B (A gây ra B) vs A results from B (A sinh ra từ B)."
      }
    },
    {
      id: "builder_w3d1_q06",
      roundIndex: 5,
      prompt: "Chọn cụm từ chỉ nguồn gốc nguyên nhân: \"Severe traffic congestion in mega cities often ______ rapid population growth.\"",
      options: [
        { id: "opt_A", label: "A", text: "stems from" },
        { id: "opt_B", label: "B", text: "leads to" },
        { id: "opt_C", label: "C", text: "gives rise to" },
        { id: "opt_D", label: "D", text: "brings about" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. stems from",
      correctExplanation: "Ở đây vế trước là Hậu quả (traffic congestion) và vế sau là Nguyên nhân (population growth), do đó phải dùng 'stems from' (bắt nguồn từ).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. leads to",
        diagnosticTitle: "Dùng nhầm chiều nguyên nhân - kết quả",
        explanation: "Nếu dùng 'leads to' câu sẽ biến thành: kẹt xe dẫn đến dân số tăng nhanh (hoàn toàn phi lý)."
      }
    },
    {
      id: "builder_w3d1_q07",
      roundIndex: 6,
      prompt: "Khi nói 'thành công của ai đó được cho là nhờ vào nỗ lực', ta dùng cấu trúc bị động học thuật nào?",
      options: [
        { id: "opt_A", label: "A", text: "can be attributed to" },
        { id: "opt_B", label: "B", text: "can be contributed to" },
        { id: "opt_C", label: "C", text: "can be distributed to" },
        { id: "opt_D", label: "D", text: "can be dedicated to" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. can be attributed to",
      correctExplanation: "'Be attributed to' là cấu trúc học thuật cao cấp có nghĩa 'được quy cho / xuất phát từ nỗ lực của ai'. 'Contribute to' là đóng góp vào.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. can be contributed to",
        diagnosticTitle: "Nhầm lẫn giữa 'attribute to' và 'contribute to'",
        explanation: "Hai từ này nhìn gần giống nhau nhưng 'contribute to' có nghĩa là góp phần tạo nên cái gì, không dùng ở dạng bị động quy nguyên nhân như attribute."
      }
    },
    {
      id: "builder_w3d1_q08",
      roundIndex: 7,
      prompt: "Điền cụm từ học thuật chỉ các căn bệnh có thể phòng tránh được (tiểu đường, béo phì, tim mạch):",
      options: [
        { id: "opt_A", label: "A", text: "preventable diseases" },
        { id: "opt_B", label: "B", text: "avoidable sicknesses" },
        { id: "opt_C", label: "C", text: "escape illnesses" },
        { id: "opt_D", label: "D", text: "dodge conditions" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. preventable diseases",
      correctExplanation: "'Preventable diseases' là thuật ngữ y tế cộng đồng và IELTS Task 2 chuẩn xác để chỉ những căn bệnh có thể phòng ngừa bằng lối sống lành mạnh.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. avoidable sicknesses",
        diagnosticTitle: "Dùng từ đời thường thiếu tính học thuật",
        explanation: "'Sickness' mang sắc thái ngôn ngữ giao tiếp hằng ngày (như say xe car sickness), trong khi bài viết học thuật luôn dùng 'diseases'."
      }
    },
    {
      id: "builder_w3d1_q09",
      roundIndex: 8,
      prompt: "Chọn tính từ học thuật mang nghĩa 'tiết kiệm chi phí và mang lại hiệu quả kinh tế cao hơn chi phí bỏ ra':",
      options: [
        { id: "opt_A", label: "A", text: "cost-effective" },
        { id: "opt_B", label: "B", text: "cheap-priced" },
        { id: "opt_C", label: "C", text: "money-savingly" },
        { id: "opt_D", label: "D", text: "low-budgeted" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. cost-effective",
      correctExplanation: "'Cost-effective' là tính từ ghép chuẩn mực trong IELTS Writing Task 2 để khẳng định một chính sách hay biện pháp mang lại lợi ích vượt trội so với chi phí đầu tư.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. cheap-priced",
        diagnosticTitle: "Dùng từ ghép vụng về không chuẩn từ vựng học thuật",
        explanation: "Học sinh tự ghép 'cheap' với 'priced' tạo ra từ không tự nhiên trong văn viết học thuật."
      }
    },
    {
      id: "builder_w3d1_q10",
      roundIndex: 9,
      prompt: "Điền cụm Collocation học thuật: \"A physically healthy population directly fosters a more ______.\"",
      options: [
        { id: "opt_A", label: "A", text: "productive workforce" },
        { id: "opt_B", label: "B", text: "heavy workforce" },
        { id: "opt_C", label: "C", text: "fast labor" },
        { id: "opt_D", label: "D", text: "crowded staff" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. productive workforce",
      correctExplanation: "'Productive workforce' (lực lượng lao động có năng suất cao) là cụm từ kinh tế học thuật tiêu chuẩn.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. fast labor",
        diagnosticTitle: "Dịch thô từ tiếng Việt 'lao động nhanh'",
        explanation: "Trong kinh tế học, năng suất luôn dùng tính từ 'productive' đi với 'workforce' hoặc 'labor force'."
      }
    }
  ],

  "WEEK 3 – DAY 2": [
    {
      id: "builder_w3d2_q01",
      roundIndex: 0,
      prompt: "Theo bài đọc 'Autumn Leaves', sắc tố hóa học nào trực tiếp tạo nên màu đỏ rực rỡ của lá cây vào mùa thu?",
      options: [
        { id: "opt_A", label: "A", text: "Anthocyanins" },
        { id: "opt_B", label: "B", text: "Chlorophyll" },
        { id: "opt_C", label: "C", text: "Carotenoids" },
        { id: "opt_D", label: "D", text: "Melanin" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Anthocyanins",
      correctExplanation: "Văn bản bài đọc nêu rõ: 'the red pigment is made in autumn leaves... leaves would go to the trouble of making anthocyanins'. Anthocyanins chính là sắc tố đỏ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chlorophyll",
        diagnosticTitle: "Nhầm sắc tố đỏ với chất diệp lục màu xanh",
        explanation: "Chlorophyll là chất diệp lục tạo màu xanh cho lá cây vào mùa hè, không phải sắc tố đỏ được tạo thêm vào mùa thu."
      }
    },
    {
      id: "builder_w3d2_q02",
      roundIndex: 1,
      prompt: "Giả thuyết 'Light screen hypothesis' giải thích mục đích chính của việc tạo ra lá đỏ vào mùa thu là gì?",
      options: [
        { id: "opt_A", label: "A", text: "To protect chlorophyll from being damaged by excess sunlight" },
        { id: "opt_B", label: "B", text: "To attract herbivorous birds to disperse tree seeds" },
        { id: "opt_C", label: "C", text: "To generate heat to prevent tree branches from freezing" },
        { id: "opt_D", label: "D", text: "To accelerate the process of dropping leaves before winter" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. To protect chlorophyll from being damaged by excess sunlight",
      correctExplanation: "Văn bản nêu: 'the red pigment is made in autumn leaves to protect chlorophyll, the light-absorbing chemical, from too much light'. Sắc tố đỏ đóng vai trò như lớp màng chắn chống nắng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. To generate heat to prevent tree branches from freezing",
        diagnosticTitle: "Đoán màu đỏ sinh nhiệt chống đông giá",
        explanation: "Học sinh liên tưởng màu đỏ ấm áp sẽ sưởi ấm cho cây nhưng bài đọc khẳng định câu hỏi này là FALSE."
      }
    },
    {
      id: "builder_w3d2_q03",
      roundIndex: 2,
      prompt: "Tại sao giả thuyết 'Light screen hypothesis' ban đầu lại nghe có vẻ nghịch lý (paradoxical)?",
      options: [
        { id: "opt_A", label: "A", text: "Because it suggests protecting chlorophyll while the tree is dismantling it" },
        { id: "opt_B", label: "B", text: "Because red leaves are proven to absorb far less heat than green leaves" },
        { id: "opt_C", label: "C", text: "Because trees in polar regions never turn red during autumn" },
        { id: "opt_D", label: "D", text: "Because insects actively prefer laying eggs on bright red surfaces" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Because it suggests protecting chlorophyll while the tree is dismantling it",
      correctExplanation: "Văn bản: 'It sounds paradoxical... Why protect chlorophyll at a time when the tree is breaking it down to salvage as much of it as possible?' Cây đang phân hủy chất diệp lục để thu hồi dinh dưỡng nhưng lại tạo sắc tố bảo vệ nó.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Because insects actively prefer laying eggs on bright red surfaces",
        diagnosticTitle: "Nhầm sang giả thuyết thứ hai về côn trùng",
        explanation: "Vấn đề đẻ trứng của côn trùng thuộc giả thuyết cảnh báo sâu bọ (đoạn E), không liên quan đến nghịch lý của 'light screen hypothesis'."
      }
    },
    {
      id: "builder_w3d2_q04",
      roundIndex: 3,
      prompt: "Theo đoạn G, tại sao lá cây mùa thu lại trở nên đặc biệt dễ tổn thương trước ánh nắng mặt trời?",
      options: [
        { id: "opt_A", label: "A", text: "Because absorbed energy cannot be channeled into normal products" },
        { id: "opt_B", label: "B", text: "Because tree roots completely stop absorbing underground moisture" },
        { id: "opt_C", label: "C", text: "Because morning frost has cracked the outer cellular walls of the leaves" },
        { id: "opt_D", label: "D", text: "Because herbivorous insects strip away all natural protective waxes" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Because absorbed energy cannot be channeled into normal products",
      correctExplanation: "Văn bản: 'The energy absorbed by the chlorophyll molecules of the unstable autumn leaf is not immediately channelled into useful products and processes... becomes vulnerable to destructive oxygen'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Because tree roots completely stop absorbing underground moisture",
        diagnosticTitle: "Suy đoán việc thiếu nước là nguyên nhân chính",
        explanation: "Bài đọc nhấn mạnh việc cỗ máy bên trong lá cây đang bị tháo dỡ (dismantling internal machinery) khiến năng lượng ánh sáng bị kích động tạo gốc oxy phá hủy tế bào."
      }
    },
    {
      id: "builder_w3d2_q05",
      roundIndex: 4,
      prompt: "Bằng chứng thực nghiệm đầu tiên ủng hộ giả thuyết 'Light screen' là:",
      options: [
        { id: "opt_A", label: "A", text: "The reddest leaves are found on the side of the tree receiving the most sun" },
        { id: "opt_B", label: "B", text: "Leaves growing in deep shaded forests turn red several weeks earlier" },
        { id: "opt_C", label: "C", text: "Leaves on the lower underside of branches are significantly brighter" },
        { id: "opt_D", label: "D", text: "Only dead leaves fallen onto the ground turn deeply red" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The reddest leaves are found on the side of the tree receiving the most sun",
      correctExplanation: "Văn bản đoạn H: 'One is straightforward: on many trees, the leaves that are the reddest are those on the side of the tree which gets most sun'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Leaves on the lower underside of branches are significantly brighter",
        diagnosticTitle: "Nhầm lẫn giữa bề mặt trên và mặt dưới của lá",
        explanation: "Văn bản khẳng định: 'the red is brighter on the UPPER side of the leaf' (mặt trên đón nắng chứ không phải mặt dưới)."
      }
    },
    {
      id: "builder_w3d2_q06",
      roundIndex: 5,
      prompt: "Điều kiện thời tiết nào tạo ra màu đỏ rực rỡ và đậm đà nhất cho lá cây mùa thu?",
      options: [
        { id: "opt_A", label: "A", text: "Dry, sunny days and cool nights" },
        { id: "opt_B", label: "B", text: "Humid, rainy days and warm nights" },
        { id: "opt_C", label: "C", text: "Stormy, windy days and freezing nights" },
        { id: "opt_D", label: "D", text: "Overcast, cloudy days and mild nights" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Dry, sunny days and cool nights",
      correctExplanation: "Văn bản đoạn H nêu rõ: 'the best conditions for intense red colours are dry, sunny days and cool nights'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Humid, rainy days and warm nights",
        diagnosticTitle: "Chọn điều kiện thời tiết nhiệt đới ẩm",
        explanation: "Thời tiết ẩm ướt nhiều mây làm giảm ánh nắng, khiến cây không có nhu cầu sản sinh sắc tố đỏ để che nắng."
      }
    },
    {
      id: "builder_w3d2_q07",
      roundIndex: 6,
      prompt: "Tại sao cây phong (maples) càng phân bố về phía Bắc bán cầu thì màu lá đỏ lại càng đậm hơn?",
      options: [
        { id: "opt_A", label: "A", text: "It is colder there, chlorophyll is more sensitive and requires more sunblock" },
        { id: "opt_B", label: "B", text: "The northern soil has a unique high concentration of volcanic ash" },
        { id: "opt_C", label: "C", text: "Northern insects carry bacteria that physically dye leaf surfaces" },
        { id: "opt_D", label: "D", text: "Winter daylight hours in northern latitudes are significantly longer" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. It is colder there, chlorophyll is more sensitive and requires more sunblock",
      correctExplanation: "Văn bản: 'It's colder there, they're more stressed, their chlorophyll is more sensitive and they need more sunblock'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The northern soil has a unique high concentration of volcanic ash",
        diagnosticTitle: "Suy diễn về thành phần khoáng sản trong đất",
        explanation: "Bài đọc hoàn toàn không đề cập đến tro núi lửa hay khoáng chất đất ở vùng phía Bắc."
      }
    },
    {
      id: "builder_w3d2_q08",
      roundIndex: 7,
      prompt: "Giả thuyết thay thế ở đoạn E cho rằng lá đỏ có thể đóng vai trò như một tín hiệu cảnh báo đến đối tượng nào?",
      options: [
        { id: "opt_A", label: "A", text: "Herbivorous insects" },
        { id: "opt_B", label: "B", text: "Carnivorous birds" },
        { id: "opt_C", label: "C", text: "Large grazing cattle" },
        { id: "opt_D", label: "D", text: "Nearby competing trees" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Herbivorous insects",
      correctExplanation: "Văn bản: 'convince herbivorous insects that they are healthy and robust and would be easily able to mount chemical defences against infestation'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Carnivorous birds",
        diagnosticTitle: "Nhầm lẫn loài côn trùng ăn cỏ với chim ăn thịt",
        explanation: "Tác giả chỉ nhắc đến loài côn trùng ăn thực vật (herbivorous insects) đẻ trứng trên lá cây."
      }
    },
    {
      id: "builder_w3d2_q09",
      roundIndex: 8,
      prompt: "Lỗ hổng khoa học lớn nhất của giả thuyết 'Cảnh báo côn trùng' (đoạn E) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "There is an absolute lack of scientific proof to support it" },
        { id: "opt_B", label: "B", text: "Insects have been proven to be totally colorblind to red" },
        { id: "opt_C", label: "C", text: "Red leaves actually attract three times more pests than dull leaves" },
        { id: "opt_D", label: "D", text: "Anthocyanins are completely non-toxic to all insect species" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. There is an absolute lack of scientific proof to support it",
      correctExplanation: "Văn bản: 'The flaw in this theory lies in the lack of proof to support it. No one has as yet ascertained whether more robust trees sport the brightest leaves'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Insects have been proven to be totally colorblind to red",
        diagnosticTitle: "Suy diễn khoa học ngoài bài đọc",
        explanation: "Bài đọc nói rằng chưa ai chứng minh được côn trùng có chọn cây dựa trên màu sắc hay không, chứ không khẳng định côn trùng bị mù màu."
      }
    },
    {
      id: "builder_w3d2_q10",
      roundIndex: 9,
      prompt: "Đoạn cuối I khẳng định điều gì về các loài cây KHÔNG chuyển sang màu đỏ mà chỉ có màu vàng hoặc cam?",
      options: [
        { id: "opt_A", label: "A", text: "Science has not fully understood how they prevent overexposure to light" },
        { id: "opt_B", label: "B", text: "They will certainly fail to survive through harsh winter freezes" },
        { id: "opt_C", label: "C", text: "They produce twice as much chlorophyll as red-leaved maple trees" },
        { id: "opt_D", label: "D", text: "They never drop their leaves and remain intact all year round" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Science has not fully understood how they prevent overexposure to light",
      correctExplanation: "Văn bản đoạn I: 'What is still not fully understood, however, is why some trees resort to producing red pigments while others don't bother... Do these trees have other means...'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. They will certainly fail to survive through harsh winter freezes",
        diagnosticTitle: "Kết luận tiêu cực thái quá về cây lá vàng/cam",
        explanation: "Tác giả chỉ nói câu chuyện của các loài cây lá vàng/cam cũng tinh tế và phức tạp (subtle and complex), không nói chúng sẽ chết."
      }
    }
  ],

  "WEEK 3 – DAY 3": [
    {
      id: "builder_w3d3_q01",
      roundIndex: 0,
      prompt: "Từ vựng nào dưới đây có chữ cái 's' được phát âm là âm xát hữu thanh /z/?",
      options: [
        { id: "opt_A", label: "A", text: "releases" },
        { id: "opt_B", label: "B", text: "scripts" },
        { id: "opt_C", label: "C", text: "seats" },
        { id: "opt_D", label: "D", text: "parks" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. releases",
      correctExplanation: "Đuôi 'es' sau âm /s/ trong 'release' được phát âm là /ɪz/ có âm cuối /z/ (/rɪˈliːsɪz/). Trong 'scripts', 'seats', 'parks' đuôi s đứng sau âm vô thanh (/p/, /t/, /k/) nên đọc là /s/.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. scripts",
        diagnosticTitle: "Nhầm lẫn quy tắc phát âm đuôi -s/es",
        explanation: "Âm /p/ là âm vô thanh, đuôi 's' sau nó luôn phải phát âm là /s/, không thể là /z/."
      }
    },
    {
      id: "builder_w3d3_q02",
      roundIndex: 1,
      prompt: "Âm mũi /ŋ/ xuất hiện trong cách phát âm của từ vựng nào dưới đây?",
      options: [
        { id: "opt_A", label: "A", text: "challenging" },
        { id: "opt_B", label: "B", text: "cinema" },
        { id: "opt_C", label: "C", text: "character" },
        { id: "opt_D", label: "D", text: "classic" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. challenging",
      correctExplanation: "Trong đuôi '-ing' của 'challenging', nhóm chữ 'ng' phát âm là phụ âm mũi /ŋ/ (/ˈtʃælɪndʒɪŋ/).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. cinema",
        diagnosticTitle: "Nhầm âm mũi /n/ với âm ng /ŋ/",
        explanation: "Trong 'cinema', chữ 'n' được phát âm là /n/ thông thường, không phải âm ng /ŋ/."
      }
    },
    {
      id: "builder_w3d3_q03",
      roundIndex: 2,
      prompt: "Điền thành ngữ thông dụng chỉ một người cực kỳ đam mê và am hiểu về điện ảnh: \"Lan is a real ______ who watches films every weekend.\"",
      options: [
        { id: "opt_A", label: "A", text: "movie buff" },
        { id: "opt_B", label: "B", text: "movie worm" },
        { id: "opt_C", label: "C", text: "movie addict" },
        { id: "opt_D", label: "D", text: "movie customer" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. movie buff",
      correctExplanation: "'Movie buff' là thành ngữ rất tự nhiên và tích cực trong tiếng Anh để chỉ một người am hiểu, mê phim (mọt phim).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. movie worm",
        diagnosticTitle: "Dịch thô từ 'mọt sách' (bookworm) sang 'mọt phim'",
        explanation: "Tiếng Anh có 'bookworm' nhưng KHÔNG dùng 'movie worm'. Người mê phim luôn được gọi là 'movie buff' hoặc 'film enthusiast'."
      }
    },
    {
      id: "builder_w3d3_q04",
      roundIndex: 3,
      prompt: "Chọn cụm Phrasal Verb mang nghĩa 'xem kịp những bộ phim mới ra rạp mà mình chưa có thời gian xem':",
      options: [
        { id: "opt_A", label: "A", text: "catch up on new releases" },
        { id: "opt_B", label: "B", text: "run after new cinemas" },
        { id: "opt_C", label: "C", text: "pick out new screens" },
        { id: "opt_D", label: "D", text: "hold onto new tickets" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. catch up on new releases",
      correctExplanation: "'Catch up on new releases' là cụm từ chuẩn bản xứ để chỉ việc xem bù, xem kịp các ấn phẩm, bộ phim mới công chiếu.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. run after new cinemas",
        diagnosticTitle: "Dịch thô 'chạy theo rạp chiếu mới'",
        explanation: "'Run after' có nghĩa là đuổi theo thể chất hoặc theo đuổi ai đó, không dùng cho việc cập nhật phim ảnh."
      }
    },
    {
      id: "builder_w3d3_q05",
      roundIndex: 4,
      prompt: "Chọn động từ kết hợp với giới từ chuẩn xác: \"Keanu Reeves ______ numerous critically acclaimed action blockbusters.\"",
      options: [
        { id: "opt_A", label: "A", text: "stars in" },
        { id: "opt_B", label: "B", text: "acts for" },
        { id: "opt_C", label: "C", text: "plays at" },
        { id: "opt_D", label: "D", text: "performs on" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. stars in",
      correctExplanation: "Cụm từ cố định trong giới điện ảnh là 'star in a movie' (đóng vai chính trong bộ phim).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. acts for",
        diagnosticTitle: "Dùng sai giới từ sau động từ act",
        explanation: "'Act for' có nghĩa là hành động thay mặt cho một tổ chức hoặc người ủy quyền, không dùng chỉ vai diễn trong phim."
      }
    },
    {
      id: "builder_w3d3_q06",
      roundIndex: 5,
      prompt: "Chọn cụm Collocation diễn đạt 'nghệ sĩ mà tôi yêu thích nhất từ trước đến nay':",
      options: [
        { id: "opt_A", label: "A", text: "all-time favorite actor" },
        { id: "opt_B", label: "B", text: "every-time favorite actor" },
        { id: "opt_C", label: "C", text: "whole-time favorite actor" },
        { id: "opt_D", label: "D", text: "full-time favorite actor" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. all-time favorite actor",
      correctExplanation: "Thành ngữ chuẩn quốc tế luôn là 'all-time favorite' (được yêu thích nhất mọi thời đại).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. full-time favorite actor",
        diagnosticTitle: "Nhầm lẫn với thuật ngữ làm việc toàn thời gian (full-time)",
        explanation: "'Full-time' chỉ hình thức làm việc 8 tiếng/ngày, không dùng bổ nghĩa cho mức độ yêu thích."
      }
    },
    {
      id: "builder_w3d3_q07",
      roundIndex: 6,
      prompt: "Diễn viên tài năng thường khao khát thể hiện mình qua những 'vai diễn phức tạp, đầy thử thách'. Cụm từ chuẩn là:",
      options: [
        { id: "opt_A", label: "A", text: "challenging roles" },
        { id: "opt_B", label: "B", text: "difficult masks" },
        { id: "opt_C", label: "C", text: "troublesome figures" },
        { id: "opt_D", label: "D", text: "harsh characters" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. challenging roles",
      correctExplanation: "'Challenging role' là collocation học thuật và điện ảnh tiêu chuẩn để chỉ vai diễn đòi hỏi kỹ năng diễn xuất cao.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. difficult masks",
        diagnosticTitle: "Dịch từ 'mặt nạ' sang tiếng Anh thay vì vai diễn",
        explanation: "'Role' mới là vai diễn sân khấu/điện ảnh; 'mask' chỉ chiếc mặt nạ đeo trên mặt."
      }
    },
    {
      id: "builder_w3d3_q08",
      roundIndex: 7,
      prompt: "Thể loại phim khoa học viễn tưởng khám phá vũ trụ, du hành thời gian và trí tuệ nhân tạo được gọi là:",
      options: [
        { id: "opt_A", label: "A", text: "sci-fi" },
        { id: "opt_B", label: "B", text: "romance" },
        { id: "opt_C", label: "C", text: "documentary" },
        { id: "opt_D", label: "D", text: "biopic" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. sci-fi",
      correctExplanation: "'Sci-fi' (viết tắt của Science Fiction) là thể loại phim khoa học viễn tưởng. Romance là phim tình cảm; Documentary là phim tài liệu; Biopic là phim tiểu sử.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. documentary",
        diagnosticTitle: "Nhầm phim tài liệu khoa học với phim viễn tưởng",
        explanation: "Documentary ghi lại sự thật và tư liệu thực tế, không có yếu tố viễn tưởng giả tưởng."
      }
    },
    {
      id: "builder_w3d3_q09",
      roundIndex: 8,
      prompt: "Ưu điểm vượt trội của việc xem phim tại rạp chiếu (cinema) so với ở nhà là:",
      options: [
        { id: "opt_A", label: "A", text: "It offers a much larger screen and superior sound quality" },
        { id: "opt_B", label: "B", text: "It allows audiences to pause and rewind scenes anytime" },
        { id: "opt_C", label: "C", text: "It provides completely free admission for student groups" },
        { id: "opt_D", label: "D", text: "It lets viewers choose personal background music during films" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. It offers a much larger screen and superior sound quality",
      correctExplanation: "Theo bài học: 'It offers a larger screen and better sound quality' - màn hình lớn và chất lượng âm thanh vòm đỉnh cao là lý do chính đến rạp.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. It allows audiences to pause and rewind scenes anytime",
        diagnosticTitle: "Nhầm lẫn tiện ích xem phim tại nhà với ở rạp",
        explanation: "Việc dừng (pause) hoặc tua lại (rewind) chỉ thực hiện được khi xem phim tại nhà trên laptop hoặc TV."
      }
    },
    {
      id: "builder_w3d3_q10",
      roundIndex: 9,
      prompt: "Khi giám khảo hỏi 'What is your favorite type of movie?', câu trả lời nào phát triển ý logic và trọn vẹn nhất?",
      options: [
        { id: "opt_A", label: "A", text: "State preferred genre + Mention a favorite movie title + Explain specific reasons" },
        { id: "opt_B", label: "B", text: "Only list names of five action movies without explaining personal feelings" },
        { id: "opt_C", label: "C", text: "Complain about movie ticket prices without answering the genre preference" },
        { id: "opt_D", label: "D", text: "Say 'I like all films' and stop speaking immediately" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. State preferred genre + Mention a favorite movie title + Explain specific reasons",
      correctExplanation: "Công thức mở rộng câu trả lời chuẩn Band 5.0+: Nêu thể loại yêu thích -> Đưa ví dụ một phim cụ thể -> Giải thích lý do mình say mê bộ phim đó.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Only list names of five action movies without explaining personal feelings",
        diagnosticTitle: "Lỗi liệt kê danh sách (Listing) thiếu chiều sâu",
        explanation: "Liệt kê danh sách phim mà không diễn giải cảm xúc hay lý do sẽ khiến điểm Lexical Resource và Fluency bị giới hạn ở mức thấp."
      }
    }
  ]
};
