/**
 * MASTER ARENA QUESTION BANK - WEEK 4
 * Source: Giáo trình MASTER 2027 - Đã soát lỗi.docx & Giáo án Master 2027 (Teacher Guide)
 * Target: IELTS Band 6.0 | Performance 6.0–6.5
 * 
 * Day 1: Writing (Paraphrasing and Referencing / Synonym Nuances / Nominalization / Demonstrative Cohesion)
 * Day 2: Reading (Space Travel and Health / Paragraph Functions / Matching Headings / Biomedical Impacts)
 * Day 3: Speaking (Talking about the Past / Used to vs Past Simple / -ed Endings / Describe a City)
 */

export const MASTER_WEEK_4_QUESTIONS: Record<string, any[]> = {
  "WEEK 4 – DAY 1": [
    {
      id: "master_w4d1_q01",
      roundIndex: 0,
      prompt: "Trong các cặp từ đồng nghĩa sau đây, cặp từ nào bị dùng SAI ngữ cảnh học thuật và sắc thái nghĩa (Nuance)?",
      options: [
        { id: "opt_A", label: "A", text: "His health decreased rapidly during the expedition." },
        { id: "opt_B", label: "B", text: "His health declined rapidly during the expedition." },
        { id: "opt_C", label: "C", text: "The demand for fossil fuels has decreased steadily." },
        { id: "opt_D", label: "D", text: "The demand for fossil fuels has declined steadily." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. His health decreased rapidly during the expedition.",
      correctExplanation: "'Decline' dùng để chỉ sự suy giảm về chất lượng hoặc sức khỏe (health declined, eyesight declined). 'Decrease' dùng cho số lượng, kích thước hoặc mức độ đo đếm được. Do đó 'health decreased' là sai ngữ cảnh tự nhiên.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. His health declined rapidly during the expedition.",
        diagnosticTitle: "Coi 'decline' và 'decrease' có thể hoán đổi tùy tiện mọi trường hợp",
        explanation: "Học sinh thường nghĩ decline và decrease là từ đồng nghĩa 100%, không nhận ra collocation đặc thù của sức khỏe."
      }
    },
    {
      id: "master_w4d1_q02",
      roundIndex: 1,
      prompt: "Chọn câu paraphrase học thuật chuẩn xác nhất cho câu gốc: 'The demand for fossil fuels is increasing rapidly.'?",
      options: [
        { id: "opt_A", label: "A", text: "The global appetite for non-renewable energy sources is escalating at an unprecedented pace." },
        { id: "opt_B", label: "B", text: "The need of fossil fuels is going up very fast every day." },
        { id: "opt_C", label: "C", text: "People want to buy more and more fossil fuels quickly." },
        { id: "opt_D", label: "D", text: "Fossil fuels are having a big increase in people's wanting." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The global appetite for non-renewable energy sources is escalating at an unprecedented pace.",
      correctExplanation: "Phương án A thể hiện khả năng paraphrase xuất sắc ở Band 6.5+: 'demand' -> 'appetite for non-renewable energy sources', 'increasing rapidly' -> 'escalating at an unprecedented pace'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The need of fossil fuels is going up very fast every day.",
        diagnosticTitle: "Dùng từ nối khẩu ngữ 'going up very fast' và sai giới từ 'need of'",
        explanation: "Cụm danh từ chuẩn phải là 'need for', và 'going up very fast' mang tính khẩu ngữ thường ngày."
      }
    },
    {
      id: "master_w4d1_q03",
      roundIndex: 2,
      prompt: "Chọn câu sử dụng kỹ thuật Danh từ hóa (Nominalization) để nâng cấp câu: 'Because universities charge exorbitant tuition fees, poor students cannot access higher education.'?",
      options: [
        { id: "opt_A", label: "A", text: "Exorbitant tuition fees hinder underprivileged students from accessing higher education." },
        { id: "opt_B", label: "B", text: "Universities charge fees very high so poor people cannot go to study." },
        { id: "opt_C", label: "C", text: "Because of fees are expensive, poor students do not enter universities." },
        { id: "opt_D", label: "D", text: "Having expensive money in universities makes students poor cannot study." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Exorbitant tuition fees hinder underprivileged students from accessing higher education.",
      correctExplanation: "Kỹ thuật danh từ hóa biến mệnh đề 'universities charge exorbitant tuition fees' thành cụm danh từ làm chủ ngữ 'Exorbitant tuition fees', đồng thời thay thế động từ bằng 'hinder somebody from doing something' ở Band 6.5.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Because of fees are expensive, poor students do not enter universities.",
        diagnosticTitle: "Dùng mệnh đề có chủ ngữ và vị ngữ sau 'Because of'",
        explanation: "'Because of' chỉ đi kèm danh từ hoặc danh động từ (N/V-ing), dùng 'Because of fees are expensive' là lỗi sai ngữ pháp cơ bản."
      }
    },
    {
      id: "master_w4d1_q04",
      roundIndex: 3,
      prompt: "Trong đoạn văn Task 2: 'Many students increasingly depend on artificial intelligence to complete assignments. [...], this overreliance poses serious threats to their critical thinking.' Cụm từ nào tạo liên kết quy chiếu tự nhiên nhất?",
      options: [
        { id: "opt_A", label: "A", text: "In the long run" },
        { id: "opt_B", label: "B", text: "Furthermore" },
        { id: "opt_C", label: "C", text: "On the contrary" },
        { id: "opt_D", label: "D", text: "In addition" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. In the long run",
      correctExplanation: "'In the long run' (về lâu dài) kết hợp với danh từ tóm tắt 'this overreliance' tạo thành mối liên kết chặt chẽ về mặt hệ quả thời gian và tác động tiêu cực tới tư duy phản biện.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Furthermore",
        diagnosticTitle: "Mặc định liên từ bổ sung cho mọi vị trí nối câu",
        explanation: "'Furthermore' chỉ có chức năng liệt kê thêm ý mới, trong khi câu thứ hai là sự phân tích hệ quả của hành vi phụ thuộc AI ở câu trước."
      }
    },
    {
      id: "master_w4d1_q05",
      roundIndex: 4,
      prompt: "Chọn cách paraphrase phù hợp nhất cho từ 'popular' trong câu: 'Electric cars are becoming increasingly popular among urban residents.'?",
      options: [
        { id: "opt_A", label: "A", text: "widespread" },
        { id: "opt_B", label: "B", text: "notorious" },
        { id: "opt_C", label: "C", text: "infamous" },
        { id: "opt_D", label: "D", text: "crowded" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. widespread",
      correctExplanation: "'Widespread' (phổ biến rộng rãi) phản ánh chính xác sự thịnh hành của xe điện. 'Notorious' và 'infamous' mang nghĩa tai tiếng tiêu cực, 'crowded' mang nghĩa đông đúc người.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. notorious",
        diagnosticTitle: "Nhầm lẫn giữa từ đồng nghĩa tích cực và từ chỉ tiếng xấu tiêu cực",
        explanation: "Nhiều học sinh tra từ điển thấy 'notorious' được dịch là 'nổi tiếng' nhưng không biết nó chỉ mang sắc thái tai tiếng do tội lỗi hoặc thói xấu."
      }
    },
    {
      id: "master_w4d1_q06",
      roundIndex: 5,
      prompt: "Với đề bài: 'Some people argue that online learning is more effective than traditional classroom learning. To what extent do you agree or disagree?', câu Thesis Statement nào thể hiện lập trường dứt khoát chuẩn 6.5?",
      options: [
        { id: "opt_A", label: "A", text: "While virtual education offers unprecedented geographical flexibility, I firmly contend that conventional classroom learning remains superior due to real-time interpersonal interaction." },
        { id: "opt_B", label: "B", text: "Online learning has advantages and traditional learning also has benefits, so I will discuss both in this essay." },
        { id: "opt_C", label: "C", text: "Some people think online is good and others think classroom is good." },
        { id: "opt_D", label: "D", text: "I totally agree with the statement because Internet is very fast nowadays." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. While virtual education offers unprecedented geographical flexibility, I firmly contend that conventional classroom learning remains superior due to real-time interpersonal interaction.",
      correctExplanation: "Phương án A là một Thesis Statement mẫu mực ở Band 6.5–7.0: thừa nhận mặt mạnh của học trực tuyến bằng mệnh đề nhượng bộ 'While...', sau đó khẳng định dứt khoát quan điểm ủng hộ lớp học truyền thống kèm lý do cốt lõi 'real-time interpersonal interaction'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Online learning has advantages and traditional learning also has benefits, so I will discuss both in this essay.",
        diagnosticTitle: "Viết mở bài nước đôi thiếu lập trường rõ ràng (Band 5.0)",
        explanation: "Nói chung chung 'tôi sẽ bàn về cả hai' mà không nêu rõ lập trường người viết vi phạm tiêu chí Task Response 6.0."
      }
    },
    {
      id: "master_w4d1_q07",
      roundIndex: 6,
      prompt: "Chọn câu viết lại giữ nguyên ý nghĩa học thuật cho: 'The government should invest heavily in public transport to reduce traffic congestion.'?",
      options: [
        { id: "opt_A", label: "A", text: "Substantial state expenditure allocated to mass transit systems could play a pivotal role in alleviating road congestion." },
        { id: "opt_B", label: "B", text: "The government must put huge money into buses so people do not get jammed." },
        { id: "opt_C", label: "C", text: "Investing heavily into transport is necessary for the government to make traffic smaller." },
        { id: "opt_D", label: "D", text: "Public transport should be bought by governments to stop traffic jams completely." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Substantial state expenditure allocated to mass transit systems could play a pivotal role in alleviating road congestion.",
      correctExplanation: "Sử dụng chuỗi từ vựng học thuật C1/B2: 'state expenditure allocated to mass transit' thay cho 'invest heavily in public transport', và 'play a pivotal role in alleviating road congestion' thay cho 'reduce traffic congestion'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. The government must put huge money into buses so people do not get jammed.",
        diagnosticTitle: "Dịch thô vụng theo lối văn nói đời thường",
        explanation: "'Put huge money' và 'people do not get jammed' là văn nói thông tục không được dùng trong bài viết học thuật."
      }
    },
    {
      id: "master_w4d1_q08",
      roundIndex: 7,
      prompt: "Xác định từ loại thích hợp để điền vào chỗ trống: 'The rapid [...] of urban areas has put tremendous pressure on infrastructure.'?",
      options: [
        { id: "opt_A", label: "A", text: "expansion" },
        { id: "opt_B", label: "B", text: "expand" },
        { id: "opt_C", label: "C", text: "expansively" },
        { id: "opt_D", label: "D", text: "expandable" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. expansion",
      correctExplanation: "Sau tính từ 'rapid' và mạo từ 'The', ta bắt buộc phải điền một danh từ ('expansion' - sự mở rộng).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. expand",
        diagnosticTitle: "Nhầm lẫn giữa động từ nguyên mẫu và danh từ",
        explanation: "'Expand' là động từ, không thể đứng làm chủ ngữ trực tiếp sau mạo từ The + tính từ rapid."
      }
    },
    {
      id: "master_w4d1_q09",
      roundIndex: 8,
      prompt: "Câu nào dưới đây thể hiện sự phối hợp chuẩn xác giữa cụm từ chỉ nguyên nhân và hệ quả?",
      options: [
        { id: "opt_A", label: "A", text: "Excessive screen time often leads to digital eye strain and chronic sleep deprivation." },
        { id: "opt_B", label: "B", text: "Excessive screen time causes for digital eye strain." },
        { id: "opt_C", label: "C", text: "Excessive screen time results in because of digital eye strain." },
        { id: "opt_D", label: "D", text: "Excessive screen time leads that people cannot sleep well." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Excessive screen time often leads to digital eye strain and chronic sleep deprivation.",
      correctExplanation: "Cấu trúc chuẩn: 'lead to + Noun phrase' (dẫn đến cái gì). Phương án B sai vì 'cause' là ngoại động từ, không đi với 'for'. Phương án C thừa 'because of'. Phương án D sai vì 'lead' không đi với mệnh đề that.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Excessive screen time causes for digital eye strain.",
        diagnosticTitle: "Thêm giới từ 'for' sau ngoại động từ 'cause'",
        explanation: "Động từ 'cause' đi thẳng với tân ngữ (cause something), việc thêm 'for' là lỗi phổ biến do ảnh hưởng của từ 'reason for'."
      }
    },
    {
      id: "master_w4d1_q10",
      roundIndex: 9,
      prompt: "Kỹ thuật 'Summary Noun' (danh từ tóm tắt) mang lại lợi ích gì lớn nhất cho tiêu chí Coherence & Cohesion?",
      options: [
        { id: "opt_A", label: "A", text: "Nén toàn bộ thông điệp của câu trước thành một danh từ cô đọng để làm bệ phóng phát triển câu tiếp theo" },
        { id: "opt_B", label: "B", text: "Tăng độ dài của bài viết lên nhiều nhất có thể" },
        { id: "opt_C", label: "C", text: "Giúp bài viết không cần sử dụng bất kỳ dấu câu nào" },
        { id: "opt_D", label: "D", text: "Thay thế hoàn toàn sự cần thiết của câu kết luận" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Nén toàn bộ thông điệp của câu trước thành một danh từ cô đọng để làm bệ phóng phát triển câu tiếp theo",
      correctExplanation: "Summary Noun (như 'This phenomenon', 'This overreliance', 'Such disparities') gói ghém cả một quá trình được mô tả trước đó thành một khái niệm học thuật, tạo sự liền mạch tuyệt đối giữa các câu.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tăng độ dài của bài viết lên nhiều nhất có thể",
        diagnosticTitle: "Coi danh từ tóm tắt là công cụ kéo dài từ ngữ vô nghĩa",
        explanation: "Summary Noun giúp câu văn súc tích và cô đọng hơn, không phải để kéo dài số từ."
      }
    }
  ],

  "WEEK 4 – DAY 2": [
    {
      id: "master_w4d2_q01",
      roundIndex: 0,
      prompt: "Theo phương pháp nhận diện chức năng đoạn văn trong bài thi Reading, 6 chức năng cơ bản của một đoạn học thuật bao gồm những loại nào?",
      options: [
        { id: "opt_A", label: "A", text: "Define, Why, Effect, Problem, Solution, Method" },
        { id: "opt_B", label: "B", text: "Noun, Verb, Adjective, Adverb, Pronoun, Preposition" },
        { id: "opt_C", label: "C", text: "Introduction, Body 1, Body 2, Body 3, Conclusion, Summary" },
        { id: "opt_D", label: "D", text: "True, False, Not Given, Yes, No, Not Stated" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Define, Why, Effect, Problem, Solution, Method",
      correctExplanation: "Khung nhận diện chức năng đoạn văn chuẩn của Master bao gồm: Định nghĩa (Define), Lý do (Why), Tác động (Effect), Vấn đề (Problem), Giải pháp (Solution), Phương pháp nghiên cứu (Method).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Introduction, Body 1, Body 2, Body 3, Conclusion, Summary",
        diagnosticTitle: "Nhầm lẫn giữa bố cục bài luận Task 2 và chức năng logic của đoạn đọc",
        explanation: "Introduction hay Body chỉ là cấu trúc phân đoạn vật lý, không phải chức năng ngữ nghĩa logic của đoạn văn."
      }
    },
    {
      id: "master_w4d2_q02",
      roundIndex: 1,
      prompt: "Trong bài đọc 'Space Travel and Health', đoạn A mở đầu: 'Space biomedicine is a relatively new area of research both in the USA and in Europe. Its main objectives are to study the effects of space travel on the human body...'\nĐoạn A mang chức năng nào sau đây?",
      options: [
        { id: "opt_A", label: "A", text: "Define nêu định nghĩa và mục tiêu nghiên cứu của ngành y sinh không gian" },
        { id: "opt_B", label: "B", text: "Method giải thích thí nghiệm nằm bất động trên giường" },
        { id: "opt_C", label: "C", text: "Solution đưa ra thuốc chữa bệnh teo cơ cho phi hành gia" },
        { id: "opt_D", label: "D", text: "Why lý giải tại sao việc tìm thấy băng trên sao Hỏa lại quan trọng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Define nêu định nghĩa và mục tiêu nghiên cứu của ngành y sinh không gian",
      correctExplanation: "Đoạn A giới thiệu 'Space biomedicine is...' và nêu các mục tiêu trọng tâm ('Its main objectives are...'), đây là chức năng Định nghĩa (Define) kinh điển.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Why lý giải tại sao việc tìm thấy băng trên sao Hỏa lại quan trọng",
        diagnosticTitle: "Bị phân tâm bởi chi tiết sao Hỏa thuộc về đoạn B phía sau",
        explanation: "Thí sinh nhớ mang máng chi tiết sao Hỏa mà không chú ý câu định nghĩa mở đầu của chính đoạn A."
      }
    },
    {
      id: "master_w4d2_q03",
      roundIndex: 2,
      prompt: "Đoạn C trích: 'The blood and other fluids are no longer dragged down towards the feet by the gravity of Earth, so they accumulate higher up in the body, creating what is sometimes called fat face, together with the contrasting chicken legs syndrome...'\nHiện tượng 'fat face' và 'chicken legs' xảy ra do nguyên nhân vật lý nào?",
      options: [
        { id: "opt_A", label: "A", text: "Môi trường không trọng lực khiến máu và chất lỏng không bị hút về phía bàn chân mà dồn ngược lên phần trên cơ thể" },
        { id: "opt_B", label: "B", text: "Phi hành gia ăn quá nhiều thức ăn đóng hộp chứa hàm lượng chất béo cao" },
        { id: "opt_C", label: "C", text: "Nhiệt độ ngoài không gian quá lạnh làm cơ bắp chân bị co rút vĩnh viễn" },
        { id: "opt_D", label: "D", text: "Tác động của bức xạ mặt trời làm sưng phù khuôn mặt" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Môi trường không trọng lực khiến máu và chất lỏng không bị hút về phía bàn chân mà dồn ngược lên phần trên cơ thể",
      correctExplanation: "Bài đọc nêu rõ: 'The blood and other fluids are no longer dragged down towards the feet by the gravity of Earth, so they accumulate higher up in the body...'.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Phi hành gia ăn quá nhiều thức ăn đóng hộp chứa hàm lượng chất béo cao",
        diagnosticTitle: "Suy đoán theo nghĩa đen từ chữ 'fat' trong 'fat face'",
        explanation: "Thí sinh thấy chữ 'fat' vội nghĩ tới chất béo trong thức ăn thay vì cơ chế dồn dịch thể do mất trọng lực."
      }
    },
    {
      id: "master_w4d2_q04",
      roundIndex: 3,
      prompt: "Theo đoạn D, hậu quả y tế nghiêm trọng nào xảy ra với thận khi phi hành gia sống nhiều tháng trong không gian không trọng lực?",
      options: [
        { id: "opt_A", label: "A", text: "Xương bị yếu đi giải phóng lượng lớn canxi vào máu, gây quá tải cho thận và có thể dẫn tới suy thận" },
        { id: "opt_B", label: "B", text: "Thận bị teo nhỏ lại do thiếu nước uống trên tàu con thoi" },
        { id: "opt_C", label: "C", text: "Bức xạ vũ trụ phá hủy trực tiếp các tế bào thận trong vài ngày đầu" },
        { id: "opt_D", label: "D", text: "Thận ngừng lọc độc tố do áp suất không khí trong khoang lái quá cao" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Xương bị yếu đi giải phóng lượng lớn canxi vào máu, gây quá tải cho thận và có thể dẫn tới suy thận",
      correctExplanation: "Dữ liệu chính xác từ đoạn D: 'the bones weaken, releasing calcium into the bloodstream. This extra calcium can overload the kidneys, leading ultimately to renal failure'.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Thận bị teo nhỏ lại do thiếu nước uống trên tàu con thoi",
        diagnosticTitle: "Nhầm lẫn giữa hiện tượng tim teo nhỏ với bệnh lý của thận",
        explanation: "Bài đọc nói tim nhỏ lại ('heart becomes smaller'), còn thận bị quá tải canxi gây suy thận (renal failure)."
      }
    },
    {
      id: "master_w4d2_q05",
      roundIndex: 4,
      prompt: "Trong đoạn B: 'The discovery of ice on Mars, for instance, means that there is now no necessity to design and develop a spacecraft large and powerful enough to transport the vast amounts of water...'\nPhát biểu nào sau đây là TRUE?",
      options: [
        { id: "opt_A", label: "A", text: "Việc phát hiện ra băng trên sao Hỏa giúp giảm bớt nhu cầu phải vận chuyển khối lượng nước khổng lồ từ Trái Đất" },
        { id: "opt_B", label: "B", text: "Băng trên sao Hỏa có thể uống trực tiếp ngay lập tức mà không cần bất kỳ xử lý y sinh nào" },
        { id: "opt_C", label: "C", text: "Các kỹ sư đã chế tạo thành công một tàu vũ trụ đủ lớn để chở nước cho cả thế kỷ" },
        { id: "opt_D", label: "D", text: "Con người không thể du hành tới sao Hỏa vì thiếu công nghệ tên lửa đẩy" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Việc phát hiện ra băng trên sao Hỏa giúp giảm bớt nhu cầu phải vận chuyển khối lượng nước khổng lồ từ Trái Đất",
      correctExplanation: "Văn bản khẳng định: 'there is now no necessity to design and develop a spacecraft large and powerful enough to transport the vast amounts of water...'.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Con người không thể du hành tới sao Hỏa vì thiếu công nghệ tên lửa đẩy",
        diagnosticTitle: "Hiểu sai nhận định về rào cản kỹ thuật và sinh học",
        explanation: "Bài đọc nhấn mạnh rào cản không còn là kỹ thuật ('no longer limited by engineering constraints') mà là sức chịu đựng của cơ thể con người."
      }
    },
    {
      id: "master_w4d2_q06",
      roundIndex: 5,
      prompt: "Nhận định sau là YES, NO hay NOT GIVEN: 'Astronauts are required to exercise for at least four hours every day in space to prevent heart disease.'?",
      options: [
        { id: "opt_A", label: "A", text: "NOT GIVEN" },
        { id: "opt_B", label: "B", text: "YES" },
        { id: "opt_C", label: "C", text: "NO" },
        { id: "opt_D", label: "D", text: "INVALID" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. NOT GIVEN",
      correctExplanation: "Bài đọc chỉ nhắc tim bị yếu đi do thiếu vận động cơ bắp, hoàn toàn không có bất kỳ con số cụ thể nào nói về việc phi hành gia 'phải tập thể dục ít nhất 4 giờ mỗi ngày'. Do đó là NOT GIVEN.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. YES",
        diagnosticTitle: "Tự bổ sung thông tin từ phim ảnh hoặc hiểu biết ngoài đời",
        explanation: "Thí sinh có thể từng xem tin tức về phi hành gia tập thể dục trên trạm ISS nên tưởng bài đọc có nói chi tiết này."
      }
    },
    {
      id: "master_w4d2_q07",
      roundIndex: 6,
      prompt: "Để làm dạng bài Matching Headings hiệu quả và tiết kiệm thời gian, quy tắc cứng của giáo trình Master là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đọc 1-2 câu đầu và câu cuối đoạn để xác định chức năng chính của đoạn văn thay vì đọc chi tiết từng từ" },
        { id: "opt_B", label: "B", text: "Đọc kỹ từng dòng một từ đầu đến cuối đoạn và dịch sang tiếng Việt" },
        { id: "opt_C", label: "C", text: "Chỉ chọn tiêu đề nào có chứa nhiều từ vựng giống hệt trong đoạn nhất" },
        { id: "opt_D", label: "D", text: "Điền tiêu đề ngẫu nhiên theo thứ tự chữ số La Mã" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đọc 1-2 câu đầu và câu cuối đoạn để xác định chức năng chính của đoạn văn thay vì đọc chi tiết từng từ",
      correctExplanation: "Quy tắc vàng của Master: 'Không đọc chi tiết khi làm heading -> chỉ đọc đầu đoạn + 1 câu hỗ trợ để trả lời câu hỏi đoạn này đang làm gì (Define, Why, Effect, Problem, Solution, Method)'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Chỉ chọn tiêu đề nào có chứa nhiều từ vựng giống hệt trong đoạn nhất",
        diagnosticTitle: "Sập bẫy từ khóa trùng lặp nguyên xi (Word-spotting trap)",
        explanation: "Các tiêu đề chứa từ vựng giống hệt thường là 'bẫy chi tiết phụ' (distractor) của người ra đề IELTS."
      }
    },
    {
      id: "master_w4d2_q08",
      roundIndex: 7,
      prompt: "Từ 'unremittingly' trong cụm 'unremittingly hostile environment of space' đồng nghĩa với từ nào sau đây?",
      options: [
        { id: "opt_A", label: "A", text: "relentlessly liên tục không ngừng nghỉ" },
        { id: "opt_B", label: "B", text: "temporarily tạm thời từng lúc" },
        { id: "opt_C", label: "C", text: "peacefully hòa bình êm dịu" },
        { id: "opt_D", label: "D", text: "scarcely hầu như không bao giờ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. relentlessly liên tục không ngừng nghỉ",
      correctExplanation: "'Unremittingly' (từ gốc remit - giảm bớt; tiền tố un- phủ định) mang nghĩa không ngừng, liên miên dữ dội, đồng nghĩa hoàn hảo với 'relentlessly' hoặc 'constantly'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. temporarily tạm thời từng lúc",
        diagnosticTitle: "Đoán mò ngữ nghĩa ngược lại hoàn toàn",
        explanation: "Môi trường không gian luôn khắc nghiệt liên tục chứ không phải tạm thời."
      }
    },
    {
      id: "master_w4d2_q09",
      roundIndex: 8,
      prompt: "Tại sao phương pháp nằm bất động trên giường nghiêng (Bed rest simulation) lại được các nhà nghiên cứu y sinh sử dụng?",
      options: [
        { id: "opt_A", label: "A", text: "Để mô phỏng tình trạng không trọng lực và theo dõi sự thoái hóa của xương và cơ bắp ngay trên Trái Đất" },
        { id: "opt_B", label: "B", text: "Để giúp phi hành gia ngủ ngon hơn trước ngày phóng tên lửa" },
        { id: "opt_C", label: "C", text: "Để chữa trị dứt điểm chứng say tàu xe cho phi công" },
        { id: "opt_D", label: "D", text: "Để kiểm tra chất lượng của các tấm đệm dùng trên trạm vũ trụ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Để mô phỏng tình trạng không trọng lực và theo dõi sự thoái hóa của xương và cơ bắp ngay trên Trái Đất",
      correctExplanation: "Nghiên cứu 'bed rest simulation' là phương pháp kinh điển (Method) giúp tái tạo sự dồn dịch thể và tình trạng bất hoạt cơ xương tương tự môi trường không trọng lực mà không tốn kém chi phí đưa người lên vũ trụ.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Để giúp phi hành gia ngủ ngon hơn trước ngày phóng tên lửa",
        diagnosticTitle: "Nghĩ theo nghĩa đen thông thường của chiếc giường ngủ",
        explanation: "Đây là một thiết kế thí nghiệm sinh y học chuyên sâu chứ không phải liệu pháp hỗ trợ giấc ngủ thông thường."
      }
    },
    {
      id: "master_w4d2_q10",
      roundIndex: 9,
      prompt: "Khi một đoạn văn chứa cả hai ý: một câu nói về nguyên nhân và toàn bộ phần còn lại phân tích các hậu quả nặng nề, tiêu đề Heading chính xác phải là:",
      options: [
        { id: "opt_A", label: "A", text: "Tiêu đề bao quát hậu quả vì đó là trọng tâm phân tích chiếm dung lượng lớn nhất của đoạn" },
        { id: "opt_B", label: "B", text: "Tiêu đề về nguyên nhân vì nó xuất hiện ở câu đầu tiên" },
        { id: "opt_C", label: "C", text: "Không chọn tiêu đề nào cả vì đoạn văn có hai ý mâu thuẫn nhau" },
        { id: "opt_D", label: "D", text: "Chọn tiêu đề có chứa nhiều số liệu nhất" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tiêu đề bao quát hậu quả vì đó là trọng tâm phân tích chiếm dung lượng lớn nhất của đoạn",
      correctExplanation: "Quy tắc Master: '1 đoạn = 1 chức năng duy nhất. Nếu thấy 2 ý thì phải chọn ý chính bao quát phần lớn nội dung phát triển của đoạn văn'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Tiêu đề về nguyên nhân vì nó xuất hiện ở câu đầu tiên",
        diagnosticTitle: "Cơ học chọn ngay ý câu đầu mà không kiểm tra mạch phát triển của đoạn",
        explanation: "Câu đầu có thể chỉ là câu dẫn nhập hoặc câu bản lề (pivot), phần thân đoạn mới là nội dung chính của heading."
      }
    }
  ],

  "WEEK 4 – DAY 3": [
    {
      id: "master_w4d3_q01",
      roundIndex: 0,
      prompt: "Trong các câu trả lời Speaking Part 1 về trải nghiệm quá khứ, cách mở đầu nào sau đây thể hiện khả năng thiết lập mốc thời gian tự nhiên (Temporal Anchor) ở trình độ 6.0+?",
      options: [
        { id: "opt_A", label: "A", text: "Back when I was in my early teens, I used to spend hours reading comic books after school." },
        { id: "opt_B", label: "B", text: "In the past time of my life, I read books every day." },
        { id: "opt_C", label: "C", text: "Before many years ago, I was reading comic books." },
        { id: "opt_D", label: "D", text: "Long time previously, comic books were read by me." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Back when I was in my early teens, I used to spend hours reading comic books after school.",
      correctExplanation: "Cụm 'Back when I was in my early teens' là lối mở đầu cực kỳ tự nhiên của người bản xứ, kết hợp chuẩn xác cấu trúc 'used to + V' chỉ thói quen trong quá khứ đã chấm dứt.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. In the past time of my life, I read books every day.",
        diagnosticTitle: "Dịch thô cụm từ 'Trong quá khứ' thành 'In the past time of my life'",
        explanation: "'In the past time of my life' là cách ghép từ vụng về, không tồn tại trong tiếng Anh chuẩn."
      }
    },
    {
      id: "master_w4d3_q02",
      roundIndex: 1,
      prompt: "Quy tắc phát âm đuôi '-ed' của động từ có quy tắc chia quá khứ được xác định như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "Được phát âm là /ɪd/ sau âm /t/ và /d/; là /t/ sau các âm vô thanh; và là /d/ sau các âm hữu thanh còn lại" },
        { id: "opt_B", label: "B", text: "Mọi động từ có đuôi '-ed' đều phải phát âm rõ từng chữ là /ed/" },
        { id: "opt_C", label: "C", text: "Đuôi '-ed' luôn luôn là âm câm không được phát âm" },
        { id: "opt_D", label: "D", text: "Tùy thuộc vào việc từ đó đứng ở đầu câu hay cuối câu" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Được phát âm là /ɪd/ sau âm /t/ và /d/; là /t/ sau các âm vô thanh; và là /d/ sau các âm hữu thanh còn lại",
      correctExplanation: "Quy tắc phát âm -ed chuẩn IPA: đuôi /ɪd/ cho động từ tận cùng bằng âm /t/ hoặc /d/ (wanted, decided); đuôi /t/ sau phụ âm vô thanh /p, k, f, s, ʃ, tʃ/ (watched, booked); đuôi /d/ cho các trường hợp còn lại.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Mọi động từ có đuôi '-ed' đều phải phát âm rõ từng chữ là /ed/",
        diagnosticTitle: "Phát âm sai kiểu 'look-ed', 'watch-ed' phổ biến của người mới học",
        explanation: "Phát âm rõ '-ed' thành một âm tiết riêng biệt cho mọi động từ là lỗi phát âm cơ bản khiến điểm Pronunciation bị chặn ở 5.0."
      }
    },
    {
      id: "master_w4d3_q03",
      roundIndex: 2,
      prompt: "Từ nào sau đây có phần gạch chân đuôi '-ed' được phát âm là /ɪd/?",
      options: [
        { id: "opt_A", label: "A", text: "graduated" },
        { id: "opt_B", label: "B", text: "developed" },
        { id: "opt_C", label: "C", text: "worked" },
        { id: "opt_D", label: "D", text: "passed" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. graduated",
      correctExplanation: "Động từ 'graduate' tận cùng là âm /t/, do đó khi thêm -ed sẽ phát âm thành /ɡrædʒueɪtɪd/. Các từ còn lại tận cùng bằng âm vô thanh /p/, /k/, /s/ nên -ed phát âm là /t/.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. developed",
        diagnosticTitle: "Nhầm lẫn đuôi kết thúc âm /p/ với âm /d/",
        explanation: "'Developed' kết thúc bằng âm /p/ vô thanh nên -ed phát âm là /t/ (/dɪˈveləpt/).",
      }
    },
    {
      id: "master_w4d3_q04",
      roundIndex: 3,
      prompt: "Chọn câu trả lời chuẩn xác cho câu hỏi Speaking: 'Did you enjoy going to school when you were younger?'?",
      options: [
        { id: "opt_A", label: "A", text: "To be frank, I struggled quite a bit during high school because I felt immense pressure to outperform my peers academically." },
        { id: "opt_B", label: "B", text: "No, I did not like school because school was boring and teacher was strict." },
        { id: "opt_C", label: "C", text: "I enjoy school very much when I was young girl." },
        { id: "opt_D", label: "D", text: "Yes I enjoyed because I had many good friends in the classroom." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. To be frank, I struggled quite a bit during high school because I felt immense pressure to outperform my peers academically.",
      correctExplanation: "Phương án A sử dụng cụm từ 'struggled quite a bit', chia thì quá khứ hoàn hảo 'felt', kết hợp từ vựng cao cấp 'immense pressure to outperform my peers academically' chuẩn Band 6.5.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. I enjoy school very much when I was young girl.",
        diagnosticTitle: "Lỗi chia thì hiện tại cho trải nghiệm quá khứ",
        explanation: "Thí sinh quên chia thì quá khứ ('enjoy' thay vì 'enjoyed') và thiếu mạo từ 'a young girl'."
      }
    },
    {
      id: "master_w4d3_q05",
      roundIndex: 4,
      prompt: "Để mô tả một thành phố bạn từng ghé thăm trong Speaking Part 2, cụm tính từ - danh từ nào thể hiện tốt nhất đặc trưng đô thị sầm uất?",
      options: [
        { id: "opt_A", label: "A", text: "a bustling metropolis renowned for its vibrant culinary scene and efficient transit network" },
        { id: "opt_B", label: "B", text: "a very crowded city having many cars and people eating on streets" },
        { id: "opt_C", label: "C", text: "a big city with plenty of high buildings and noise" },
        { id: "opt_D", label: "D", text: "an enormous town which is very famous about food" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. a bustling metropolis renowned for its vibrant culinary scene and efficient transit network",
      correctExplanation: "'Bustling metropolis' (đô thị sầm uất), 'vibrant culinary scene' (nền ẩm thực sôi động), 'efficient transit network' (hệ thống giao thông hiệu quả) là các collocations đắt giá giúp tối ưu điểm Lexical Resource.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. an enormous town which is very famous about food",
        diagnosticTitle: "Dùng sai giới từ 'famous about' thay vì 'famous for'",
        explanation: "Collocation chuẩn là 'famous for' hoặc 'renowned for', dùng 'famous about' là lỗi dịch thô."
      }
    },
    {
      id: "master_w4d3_q06",
      roundIndex: 5,
      prompt: "Phân biệt cách dùng giữa 'used to + V' và thì Quá khứ đơn (Past Simple):",
      options: [
        { id: "opt_A", label: "A", text: "'Used to + V' nhấn mạnh vào thói quen hoặc trạng thái thường xuyên xảy ra trong quá khứ nhưng nay ĐÃ HOÀN TOÀN CHẤM DỨT" },
        { id: "opt_B", label: "B", text: "'Used to + V' chỉ dùng cho các sự việc đang tiếp diễn ở hiện tại" },
        { id: "opt_C", label: "C", text: "'Used to + V' bắt buộc phải đi kèm với mốc năm cụ thể như in 2020" },
        { id: "opt_D", label: "D", text: "Hai hình thức này hoàn toàn có thể thay thế cho nhau trong mọi câu mà không có sắc thái riêng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. 'Used to + V' nhấn mạnh vào thói quen hoặc trạng thái thường xuyên xảy ra trong quá khứ nhưng nay ĐÃ HOÀN TOÀN CHẤM DỨT",
      correctExplanation: "'Used to' diễn tả sự tương phản rõ rệt giữa quá khứ và hiện tại (trước đây từng làm thường xuyên, bây giờ không còn làm nữa).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. 'Used to + V' bắt buộc phải đi kèm với mốc năm cụ thể như in 2020",
        diagnosticTitle: "Gán ghép mốc thời gian cụ thể vào 'used to'",
        explanation: "Nếu có mốc thời gian cụ thể trong một lần duy nhất (e.g. yesterday at 5pm), ta dùng thì Quá khứ đơn, không dùng 'used to'."
      }
    },
    {
      id: "master_w4d3_q07",
      roundIndex: 6,
      prompt: "Chọn câu diễn đạt mốc thời gian trong quá khứ chuẩn xác nhất khi kể về kỷ niệm thời thơ ấu:",
      options: [
        { id: "opt_A", label: "A", text: "During my primary school years, my grandfather often walked me home through the village park." },
        { id: "opt_B", label: "B", text: "When my primary school years, my grandfather often walked me home." },
        { id: "opt_C", label: "C", text: "In the period of primary school times, my grandfather walk me home." },
        { id: "opt_D", label: "D", text: "For my primary school, my grandfather was walking me home." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. During my primary school years, my grandfather often walked me home through the village park.",
      correctExplanation: "Cấu trúc chuẩn: 'During + [Noun phrase chỉ giai đoạn]' ('During my primary school years'). Phương án B sai vì 'When' phải đi kèm một mệnh đề có S + V ('When I was in primary school').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. When my primary school years, my grandfather often walked me home.",
        diagnosticTitle: "Dùng liên từ 'When' trực tiếp với cụm danh từ mà không có mệnh đề",
        explanation: "'When' là liên từ nối mệnh đề (conjunction), không thể thay thế cho giới từ 'during'."
      }
    },
    {
      id: "master_w4d3_q08",
      roundIndex: 7,
      prompt: "Khi nói về sự tương phản giữa vẻ cổ kính và hiện đại của một thành phố du lịch, câu nào sau đây có cách dùng từ tinh tế nhất?",
      options: [
        { id: "opt_A", label: "A", text: "What captivated me most was the fascinating juxtaposition between centuries-old temples and futuristic skyscrapers." },
        { id: "opt_B", label: "B", text: "I liked the city because it has old pagodas and also has modern tall buildings next to each other." },
        { id: "opt_C", label: "C", text: "The city was very strange with historic buildings and new buildings together." },
        { id: "opt_D", label: "D", text: "Old things and new things are mixed in this city very wonderfully." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. What captivated me most was the fascinating juxtaposition between centuries-old temples and futuristic skyscrapers.",
      correctExplanation: "Từ vựng 'fascinating juxtaposition' (sự đan xen tương phản kỳ thú) và mệnh đề chẻ 'What captivated me most was...' thể hiện cấu trúc ngữ pháp và từ vựng vượt trội ở Band 6.5–7.0.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. I liked the city because it has old pagodas and also has modern tall buildings next to each other.",
        diagnosticTitle: "Dùng từ ngữ mô tả bằng phẳng thiếu sức biểu cảm học thuật",
        explanation: "Phương án B đúng nghĩa nhưng lối diễn đạt đơn giản ở mức Band 5.0."
      }
    },
    {
      id: "master_w4d3_q09",
      roundIndex: 8,
      prompt: "Chọn dạng đúng của động từ trong ngoặc để hoàn thành câu: 'As soon as the plane [...] at the airport, we [...] a wave of tropical heat hitting our faces.'?",
      options: [
        { id: "opt_A", label: "A", text: "touched down and felt" },
        { id: "opt_B", label: "B", text: "touch down and feel" },
        { id: "opt_C", label: "C", text: "had touched down and had felt" },
        { id: "opt_D", label: "D", text: "was touching down and felt" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. touched down and felt",
      correctExplanation: "Hai hành động nối tiếp nhau trong quá khứ trong câu kể chuyện (Storytelling) đều được chia ở thì Quá khứ đơn: 'touched down' (hạ cánh) và 'felt' (cảm nhận được).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. had touched down and had felt",
        diagnosticTitle: "Lạm dụng thì quá khứ hoàn thành cho cả hai vế",
        explanation: "Quá khứ hoàn thành chỉ dùng khi một hành động hoàn tất trước một hành động khác trong quá khứ, không dùng hàng loạt cho hai hành động liên tiếp."
      }
    },
    {
      id: "master_w4d3_q10",
      roundIndex: 9,
      prompt: "Trong phần thi Speaking Part 2, khi đồng hồ bấm giờ 1 phút chuẩn bị bắt đầu chạy, thí sinh nên ghi chú những gì trên tờ giấy nháp?",
      options: [
        { id: "opt_A", label: "A", text: "Từ khóa chính cho từng phần như địa điểm, thời gian, hoạt động trọng tâm và cảm xúc nổi bật kèm 2-3 collocations đắt giá" },
        { id: "opt_B", label: "B", text: "Cố gắng viết thành từng câu văn hoàn chỉnh dài ngoằng và đọc lại từ giấy" },
        { id: "opt_C", label: "C", text: "Vẽ một bức tranh minh họa chi tiết về thành phố đó" },
        { id: "opt_D", label: "D", text: "Không ghi gì cả và ngồi nhìn giám khảo để tiết kiệm năng lượng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Từ khóa chính cho từng phần như địa điểm, thời gian, hoạt động trọng tâm và cảm xúc nổi bật kèm 2-3 collocations đắt giá",
      correctExplanation: "Chiến thuật chuẩn bị 1 phút hiệu quả: chỉ viết 'Keywords & Advanced Collocations' theo dàn bài logic để làm điểm tựa khi nói, tuyệt đối không viết cả câu hoàn chỉnh vì sẽ không đủ thời gian.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Cố gắng viết thành từng câu văn hoàn chỉnh dài ngoằng và đọc lại từ giấy",
        diagnosticTitle: "Cố viết nguyên văn cả câu trong 1 phút chuẩn bị",
        explanation: "1 phút chỉ đủ viết từ khóa; viết cả câu sẽ không kịp chuẩn bị các phần sau và biến bài nói thành bài đọc trả lời máy móc."
      }
    }
  ]
};
