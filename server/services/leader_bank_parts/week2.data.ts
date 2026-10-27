/**
 * LEADER ARENA QUESTION BANK - WEEK 2
 * Source: Giáo trình LEADER 2027 - Đã soát lỗi.docx & Giáo án Leader 2028 Teacher Guide
 * Target: IELTS Band 6.5 | Training 7.0–7.5
 * 
 * Day 1: Writing (Task 2 Introduction & Causes - Problems - Solutions / Obesity & Sedentary Epidemic)
 * Day 2: Speaking (Developing Answers with Depth / Part 2 Architecture: Describe a Building)
 * Day 3: Reading (Evolutionary Throwbacks & Atavism / Dollo's Law / Silent Genes / Cambridge 10)
 */

export const LEADER_WEEK_2_QUESTIONS: Record<string, any[]> = {
  "WEEK 2 – DAY 1": [
    {
      id: "leader_w2d1_q01",
      roundIndex: 0,
      prompt: "Trong dạng bài Causes - Problems - Solutions của Task 2, nguyên tắc cốt tử để đạt điểm Task Response 7.0+ ở phần Giải pháp (Solutions) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Các giải pháp đề xuất phải giải quyết trực tiếp và tương ứng với chính những nguyên nhân và vấn đề đã được phân tích ở đoạn trước" },
        { id: "opt_B", label: "B", text: "Chỉ cần nêu một giải pháp duy nhất và kêu gọi mọi người tự nâng cao ý thức chung chung" },
        { id: "opt_C", label: "C", text: "Đề xuất các giải pháp không tưởng đòi hỏi ngân sách vượt quá GDP của cả thế giới" },
        { id: "opt_D", label: "D", text: "Chép lại nguyên văn các giải pháp từ một đề thi về bảo vệ môi trường" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Các giải pháp đề xuất phải giải quyết trực tiếp và tương ứng với chính những nguyên nhân và vấn đề đã được phân tích ở đoạn trước",
      correctExplanation: "Quy tắc vàng của Leader: 'Solutions phải đối sánh trực diện với Causes'. Nếu nguyên nhân là thực phẩm chế biến sẵn nhiều đường, thì giải pháp phải là đánh thuế nước ngọt hoặc dán nhãn cảnh báo dinh dưỡng, không thể đưa ra giải pháp lệch pha không liên quan.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ cần nêu một giải pháp duy nhất và kêu gọi mọi người tự nâng cao ý thức chung chung",
        diagnosticTitle: "Lỗi đưa giải pháp sáo rỗng 'nâng cao ý thức' (Vague awareness trap)",
        explanation: "Chỉ nói 'raise awareness' mà không có cơ chế chính sách cụ thể bị giám khảo coi là lập luận hời hợt (under-developed).",
      }
    },
    {
      id: "leader_w2d1_q02",
      roundIndex: 1,
      prompt: "Với đề bài: 'In some countries, the average weight of people is increasing and their health levels are decreasing. What are the causes and what measures can be taken?', câu mở bài nào thể hiện sự tinh gọn và chuẩn mực học thuật?",
      options: [
        { id: "opt_A", label: "A", text: "It is widely observed that obesity rates are escalating while public fitness levels are deteriorating. This alarming trend stems primarily from sedentary work patterns and the ubiquity of fast food, necessitating decisive governmental fiscal and educational interventions." },
        { id: "opt_B", label: "B", text: "People are getting very fat and sick nowadays. I will tell you why and how to fix this." },
        { id: "opt_C", label: "C", text: "In some countries weight is increasing and health is decreasing, so I will discuss causes and solutions." },
        { id: "opt_D", label: "D", text: "Fat people have many problems because eating burgers makes weight go up very high." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. It is widely observed that obesity rates are escalating while public fitness levels are deteriorating. This alarming trend stems primarily from sedentary work patterns and the ubiquity of fast food, necessitating decisive governmental fiscal and educational interventions.",
      correctExplanation: "Paraphrase đỉnh cao: 'obesity rates are escalating' (tỷ lệ béo phì leo thang), 'public fitness levels are deteriorating' (thể lực cộng đồng suy giảm), tóm lược nguyên nhân ('sedentary work patterns', 'ubiquity of fast food') và định hướng giải pháp ('fiscal and educational interventions').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. People are getting very fat and sick nowadays. I will tell you why and how to fix this.",
        diagnosticTitle: "Dùng từ ngữ thô thiển và cấu trúc xưng hô văn nói",
        explanation: "'Getting fat and sick' và 'I will tell you' vi phạm nghiêm trọng tính trang trọng của IELTS Academic.",
      }
    },
    {
      id: "leader_w2d1_q03",
      roundIndex: 2,
      prompt: "Chọn câu phân tích NGUYÊN NHÂN học thuật về tác động của chế độ ăn công nghiệp đối với đại dịch béo phì:",
      options: [
        { id: "opt_A", label: "A", text: "Chief among the causes is the omnipresence of ultra-processed foodstuffs saturated with refined sugars and unhealthy fats, which are heavily marketed yet engineered to induce overconsumption." },
        { id: "opt_B", label: "B", text: "People eat fast food because fast food is very delicious and cheap in supermarkets." },
        { id: "opt_C", label: "C", text: "Cooking at home takes too much time so people buy burgers every day." },
        { id: "opt_D", label: "D", text: "Many foods have bad chemicals that make human body grow fat quickly." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chief among the causes is the omnipresence of ultra-processed foodstuffs saturated with refined sugars and unhealthy fats, which are heavily marketed yet engineered to induce overconsumption.",
      correctExplanation: "Từ vựng C1/C2 xuất sắc: 'omnipresence of ultra-processed foodstuffs' (sự hiện diện khắp nơi của thực phẩm siêu chế biến), 'saturated with refined sugars' (bão hòa đường tinh luyện), 'engineered to induce overconsumption' (được thiết kế để kích thích ăn quá độ).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. People eat fast food because fast food is very delicious and cheap in supermarkets.",
        diagnosticTitle: "Giải thích đơn giản ở mức Band 5.0",
        explanation: "Phương án B đúng nghĩa đời thường nhưng nghèo nàn về thuật ngữ chuyên ngành dinh dưỡng và sức khỏe công cộng.",
      }
    },
    {
      id: "leader_w2d1_q04",
      roundIndex: 3,
      prompt: "Chọn câu phân tích GIẢI PHÁP TÀI CHÍNH (Fiscal Solution) có sức thuyết phục cao nhất để giải quyết tình trạng lạm dụng đồ uống có đường:",
      options: [
        { id: "opt_A", label: "A", text: "To curtail this issue, authorities should implement a progressive tax levy on sugar-sweetened beverages, simultaneously using the accrued revenue to subsidize fresh organic produce." },
        { id: "opt_B", label: "B", text: "Governments must ban all sweet drinks and close all soda factories immediately." },
        { id: "opt_C", label: "C", text: "People should stop buying soda because soda is bad for their teeth." },
        { id: "opt_D", label: "D", text: "Police should arrest anyone who drinks Coca-Cola in public places." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. To curtail this issue, authorities should implement a progressive tax levy on sugar-sweetened beverages, simultaneously using the accrued revenue to subsidize fresh organic produce.",
      correctExplanation: "Giải pháp kinh tế học chính xác: 'implement a progressive tax levy on sugar-sweetened beverages' (áp thuế lũy tiến lên đồ uống có đường), kết hợp dùng nguồn thu 'subsidize fresh organic produce' (trợ giá nông sản tươi sạch).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Governments must ban all sweet drinks and close all soda factories immediately.",
        diagnosticTitle: "Đưa ra giải pháp cực đoan phi thực tế trong nền kinh tế thị trường",
        explanation: "Đòi cấm toàn bộ và đóng cửa nhà máy là chính sách viễn tưởng, thể hiện sự thiếu hiểu biết về vận hành xã hội.",
      }
    },
    {
      id: "leader_w2d1_q05",
      roundIndex: 4,
      prompt: "Khi phân tích nguyên nhân lối sống ít vận động (Sedentary lifestyle), câu nào sau đây mổ xẻ được cơ chế tự động hóa công việc?",
      options: [
        { id: "opt_A", label: "A", text: "The widespread shift toward desk-bound knowledge economies, combined with automated domestic appliances, has drastically eliminated physical exertion from daily routines." },
        { id: "opt_B", label: "B", text: "People sit on chairs all day because computers are very interesting." },
        { id: "opt_C", label: "C", text: "Workers do not walk because cars and motorbikes are everywhere." },
        { id: "opt_D", label: "D", text: "Offices have air conditioning so workers sleep during working hours." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. The widespread shift toward desk-bound knowledge economies, combined with automated domestic appliances, has drastically eliminated physical exertion from daily routines.",
      correctExplanation: "Từ vựng sắc sảo: 'desk-bound knowledge economies' (nền kinh tế tri thức ngồi bàn giấy), 'automated domestic appliances' (thiết bị gia dụng tự động hóa), 'drastically eliminated physical exertion' (triệt tiêu sự vận động thể chất khỏi thói quen hàng ngày).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. People sit on chairs all day because computers are very interesting.",
        diagnosticTitle: "Quy kết nguyên nhân trẻ con 'ngồi vì máy tính hay'",
        explanation: "Cách giải thích ngây ngô không chạm đến bản chất chuyển đổi cơ cấu nền kinh tế và tự động hóa.",
      }
    },
    {
      id: "leader_w2d1_q06",
      roundIndex: 5,
      prompt: "Chọn Topic Sentence cho Body 2 chuyển tiếp mượt mà từ Nguyên nhân sang Giải pháp:",
      options: [
        { id: "opt_A", label: "A", text: "To reverse these alarming epidemiological trends, a multifaceted approach combining regulatory taxation and urban infrastructure remodeling is imperative." },
        { id: "opt_B", label: "B", text: "Now I will discuss some solutions that governments should do." },
        { id: "opt_C", label: "C", text: "Solutions are very important to stop obesity from killing people." },
        { id: "opt_D", label: "D", text: "There are many ways to make people become thin again." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. To reverse these alarming epidemiological trends, a multifaceted approach combining regulatory taxation and urban infrastructure remodeling is imperative.",
      correctExplanation: "Topic Sentence đẳng cấp Leader: 'reverse these alarming epidemiological trends' (đảo ngược các xu hướng dịch tễ học đáng báo động này), 'a multifaceted approach' (cách tiếp cận đa diện), 'regulatory taxation and urban infrastructure remodeling' (thuế điều tiết và tái quy hoạch hạ tầng đô thị).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. There are many ways to make people become thin again.",
        diagnosticTitle: "Dùng từ ngữ bình dân 'make people become thin'",
        explanation: "'Become thin' là văn phong khẩu ngữ, trong y tế học thuật phải dùng 'curb obesity' hoặc 'promote healthy body mass'.",
      }
    },
    {
      id: "leader_w2d1_q07",
      roundIndex: 6,
      prompt: "Từ 'ubiquity' trong cụm 'the ubiquity of high-calorie fast food outlets' đồng nghĩa với từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "omnipresence sự hiện diện tràn ngập khắp mọi nơi" },
        { id: "opt_B", label: "B", text: "scarcity sự khan hiếm ít ỏi" },
        { id: "opt_C", label: "C", text: "expensiveness sự đắt đỏ xa xỉ" },
        { id: "opt_D", label: "D", text: "cleanliness sự sạch sẽ vệ sinh" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. omnipresence sự hiện diện tràn ngập khắp mọi nơi",
      correctExplanation: "'Ubiquity' (tính phổ biến cùng khắp, ở đâu cũng thấy) đồng nghĩa với 'omnipresence', là danh từ C2 đắt giá trong các bài luận về văn hóa đại chúng và tiêu dùng.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. scarcity sự khan hiếm ít ỏi",
        diagnosticTitle: "Hiểu ngược nghĩa với từ phổ biến tràn ngập",
        explanation: "'Scarcity' (sự khan hiếm) là từ trái nghĩa hoàn toàn với 'ubiquity'.",
      }
    },
    {
      id: "leader_w2d1_q08",
      roundIndex: 7,
      prompt: "Khi đề bài hỏi số nhiều: 'What are the causes and what measures can be taken?', thí sinh trình bày bao nhiêu ý trong mỗi thân bài là an toàn và tối ưu nhất?",
      options: [
        { id: "opt_A", label: "A", text: "Đúng 2 nguyên nhân được đào sâu ở Body 1 và đúng 2 giải pháp tương ứng được phát triển đầy đủ ở Body 2" },
        { id: "opt_B", label: "B", text: "Chỉ đúng 1 nguyên nhân duy nhất và 1 giải pháp duy nhất" },
        { id: "opt_C", label: "C", text: "Liệt kê 10 nguyên nhân thật ngắn gọn thành gạch đầu dòng" },
        { id: "opt_D", label: "D", text: "Không cần đưa giải pháp nào cả" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đúng 2 nguyên nhân được đào sâu ở Body 1 và đúng 2 giải pháp tương ứng được phát triển đầy đủ ở Body 2",
      correctExplanation: "Công thức tối ưu: Đề hỏi số nhiều (causes, measures) nên bắt buộc phải có từ 2 ý trở lên. Cấu trúc 2 Causes + 2 Solutions phát triển theo chuỗi Claim -> Why -> Result đảm bảo độ dài 260-280 từ hoàn hảo.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ đúng 1 nguyên nhân duy nhất và 1 giải pháp duy nhất",
        diagnosticTitle: "Lỗi Under-response khi đề bài yêu cầu số nhiều",
        explanation: "Đề bài dùng danh từ số nhiều (causes, measures), nếu chỉ nêu 1 ý sẽ bị trừ điểm Task Response vì chưa trả lời trọn vẹn yêu cầu.",
      }
    },
    {
      id: "leader_w2d1_q09",
      roundIndex: 8,
      prompt: "Chọn câu phân tích giải pháp giáo dục học đường nhằm ngăn ngừa béo phì ở trẻ em:",
      options: [
        { id: "opt_A", label: "A", text: "Furthermore, educational institutions must revise their curricula to mandate rigorous physical education alongside comprehensive nutritional literacy programs." },
        { id: "opt_B", label: "B", text: "Also, schools should force students to run 10 kilometers every morning without resting." },
        { id: "opt_C", label: "C", text: "Teachers must not let children eat lunch at school." },
        { id: "opt_D", label: "D", text: "Schools need to buy expensive sports machines for kids." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Furthermore, educational institutions must revise their curricula to mandate rigorous physical education alongside comprehensive nutritional literacy programs.",
      correctExplanation: "'Revise curricula' (cải cách chương trình giảng dạy), 'mandate rigorous physical education' (bắt buộc giáo dục thể chất bài bản), 'comprehensive nutritional literacy programs' (chương trình phổ cập kiến thức dinh dưỡng toàn diện).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Also, schools should force students to run 10 kilometers every morning without resting.",
        diagnosticTitle: "Đưa ra giải pháp bạo lực phản khoa học",
        explanation: "Bắt trẻ em chạy 10km không nghỉ là biện pháp vô lý, phản tác dụng trong bài viết học thuật.",
      }
    },
    {
      id: "leader_w2d1_q10",
      roundIndex: 9,
      prompt: "Chọn câu Kết luận (Conclusion) mẫu mực cho bài luận về khủng hoảng sức khỏe và cân nặng:",
      options: [
        { id: "opt_A", label: "A", text: "In conclusion, while modern sedentary occupations and processed diets have precipitated widespread physical decline, coordinated efforts encompassing fiscal disincentives on junk food and institutional wellness initiatives can effectively restore public health." },
        { id: "opt_B", label: "B", text: "In conclusion, fat people must eat vegetables and exercise every day to be healthy." },
        { id: "opt_C", label: "C", text: "To sum up, obesity is bad and governments will solve it very soon." },
        { id: "opt_D", label: "D", text: "All in all, weight will decrease if everyone stops eating fast food forever." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. In conclusion, while modern sedentary occupations and processed diets have precipitated widespread physical decline, coordinated efforts encompassing fiscal disincentives on junk food and institutional wellness initiatives can effectively restore public health.",
      correctExplanation: "Kết bài mẫu mực: nén toàn bộ nguyên nhân vào mệnh đề nhượng bộ 'while modern sedentary occupations and processed diets have precipitated...', và tổng hợp trọn vẹn các giải pháp 'fiscal disincentives' và 'institutional wellness initiatives'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. In conclusion, fat people must eat vegetables and exercise every day to be healthy.",
        diagnosticTitle: "Kết bài thiếu tính vĩ mô chính sách xã hội",
        explanation: "Phương án B nhìn nhận vấn đề ở góc độ cá nhân tầm thường, thiếu tầm nhìn chính sách vĩ mô.",
      }
    }
  ],

  "WEEK 2 – DAY 2": [
    {
      id: "leader_w2d2_q01",
      roundIndex: 0,
      prompt: "Trong Speaking Part 2 với chủ đề: 'Describe a notable building or architectural landmark', cấu trúc triển khai nào sau đây giúp thí sinh kiểm soát trọn vẹn 2 phút bài nói?",
      options: [
        { id: "opt_A", label: "A", text: "Định danh công trình và vị trí địa lý -> Phong cách kiến trúc và vật liệu kết cấu đặc trưng -> Chức năng sử dụng và ý nghĩa lịch sử văn hóa -> Trải nghiệm và cảm xúc cá nhân khi chiêm ngưỡng" },
        { id: "opt_B", label: "B", text: "Chỉ mô tả chi tiết chiều cao bằng mét và giá vé vào cổng" },
        { id: "opt_C", label: "C", text: "Kể về một cuộc cãi nhau với nhân viên bảo vệ của tòa nhà đó" },
        { id: "opt_D", label: "D", text: "Liệt kê danh sách 20 tòa nhà khác nhau trong thành phố" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Định danh công trình và vị trí địa lý -> Phong cách kiến trúc và vật liệu kết cấu đặc trưng -> Chức năng sử dụng và ý nghĩa lịch sử văn hóa -> Trải nghiệm và cảm xúc cá nhân khi chiêm ngưỡng",
      correctExplanation: "Khung kiến trúc Part 2 chuẩn Leader: Location & Identification -> Architectural Facade & Aesthetics -> Historical / Socio-cultural Significance -> Personal Impression & Emotional Resonance.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Liệt kê danh sách 20 tòa nhà khác nhau trong thành phố",
        diagnosticTitle: "Lạc đề sang việc liệt kê nhiều tòa nhà thay vì tập trung vào một công trình duy nhất",
        explanation: "Đề bài yêu cầu 'Describe a building' (số ít), liệt kê nhiều tòa nhà vi phạm yêu cầu trọng tâm.",
      }
    },
    {
      id: "leader_w2d2_q02",
      roundIndex: 1,
      prompt: "Chọn cụm collocation học thuật miêu tả vẻ ngoài nguy nga tráng lệ của một công trình kiến trúc biểu tượng:",
      options: [
        { id: "opt_A", label: "A", text: "an awe-inspiring edifice characterized by sleek geometric contours and avant-garde glass facades" },
        { id: "opt_B", label: "B", text: "a very tall house having many big windows with clear glass" },
        { id: "opt_C", label: "C", text: "a high construction which is very beautiful and nice" },
        { id: "opt_D", label: "D", text: "an enormous building that looks like a giant box" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. an awe-inspiring edifice characterized by sleek geometric contours and avant-garde glass facades",
      correctExplanation: "Từ vựng kiến trúc đỉnh cao: 'awe-inspiring edifice' (tòa dinh thự kỳ vĩ truyền cảm hứng), 'sleek geometric contours' (những đường nét hình học bóng bẩy), 'avant-garde glass facades' (mặt tiền bằng kính mang phong cách tiên phong).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. a very tall house having many big windows with clear glass",
        diagnosticTitle: "Dùng từ ngữ mô tả sơ cấp ở mức Band 5.0",
        explanation: "'Very tall house with big windows' là văn phong của trẻ em tiểu học.",
      }
    },
    {
      id: "leader_w2d2_q03",
      roundIndex: 2,
      prompt: "Khi nói về sự hòa quyện giữa nét cổ kính truyền thống và thiết kế hiện đại của một tòa nhà, câu nào thể hiện sự tinh tế nhất?",
      options: [
        { id: "opt_A", label: "A", text: "What strikes me most is how the architects seamlessly integrated neoclassical colonnades with contemporary sustainable materials." },
        { id: "opt_B", label: "B", text: "The building has old columns and new plastic materials together which is cool." },
        { id: "opt_C", label: "C", text: "Old and new styles are mixed like a salad in this house." },
        { id: "opt_D", label: "D", text: "I like it because it looks both old-fashioned and fashionable at the same time." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. What strikes me most is how the architects seamlessly integrated neoclassical colonnades with contemporary sustainable materials.",
      correctExplanation: "Mệnh đề chẻ 'What strikes me most is...', trạng từ 'seamlessly integrated' (tích hợp một cách liền mạch không tì vết), 'neoclassical colonnades' (hàng cột tân cổ điển) và 'contemporary sustainable materials' (vật liệu bền vững đương đại).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Old and new styles are mixed like a salad in this house.",
        diagnosticTitle: "Sử dụng ẩn dụ thô thiển không phù hợp văn cảnh",
        explanation: "So sánh kiến trúc với 'salad' là phép so sánh vụng về làm mất đi tính trang trọng của bài nói.",
      }
    },
    {
      id: "leader_w2d2_q04",
      roundIndex: 3,
      prompt: "Trong Part 1, khi được hỏi: 'Do you prefer living in an old historic house or a modern high-rise apartment?', cách trả lời nào thể hiện cấu trúc đối chiếu có chiều sâu?",
      options: [
        { id: "opt_A", label: "A", text: "I would lean toward a modern apartment primarily because of state-of-the-art security systems and centralized amenities, though I hold immense appreciation for the rustic charm of heritage homes." },
        { id: "opt_B", label: "B", text: "I like modern apartment because old houses have ghosts." },
        { id: "opt_C", label: "C", text: "Both are good. I can live anywhere." },
        { id: "opt_D", label: "D", text: "Apartments are high, houses are low, so I choose apartments." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I would lean toward a modern apartment primarily because of state-of-the-art security systems and centralized amenities, though I hold immense appreciation for the rustic charm of heritage homes.",
      correctExplanation: "Lập luận hai vế cân bằng: chọn căn hộ hiện đại vì 'state-of-the-art security' và 'centralized amenities' nhưng vẫn trân trọng 'the rustic charm of heritage homes' (vẻ duyên dáng mộc mạc của nhà cổ di sản).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. I like modern apartment because old houses have ghosts.",
        diagnosticTitle: "Đưa lý do mê tín dị đoan vào bài thi học thuật",
        explanation: "Lý do 'nhà cổ có ma' thể hiện tư duy thiếu nghiêm túc trong phòng thi.",
      }
    },
    {
      id: "leader_w2d2_q05",
      roundIndex: 4,
      prompt: "Cụm từ 'panoramic vista' trong câu: 'The observation deck affords a breathtaking panoramic vista of the metropolitan skyline' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tầm nhìn toàn cảnh góc rộng bao quát toàn bộ không gian xung quanh" },
        { id: "opt_B", label: "B", text: "Một bức tranh phong cảnh vẽ bằng sơn dầu" },
        { id: "opt_C", label: "C", text: "Một chiếc kính viễn vọng quan sát các vì sao" },
        { id: "opt_D", label: "D", text: "Màn hình tivi siêu mỏng đặt ở sảnh chờ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tầm nhìn toàn cảnh góc rộng bao quát toàn bộ không gian xung quanh",
      correctExplanation: "'Panoramic vista' (tầm nhìn toàn cảnh trải dài ngút ngàn) là collocation C2 sang trọng miêu tả tầm nhìn từ trên các đỉnh tháp cao ốc.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Một bức tranh phong cảnh vẽ bằng sơn dầu",
        diagnosticTitle: "Nhầm lẫn giữa khung cảnh thực tế với bức tranh vẽ",
        explanation: "'Vista' là tầm nhìn quang cảnh thật mở ra trước mắt, không phải bức tranh treo tường.",
      }
    },
    {
      id: "leader_w2d2_q06",
      roundIndex: 5,
      prompt: "Chọn câu diễn đạt cảm xúc ngưỡng mộ khi lần đầu tiên đứng trước một kỳ quan kiến trúc:",
      options: [
        { id: "opt_A", label: "A", text: "Stepping inside the cathedral, I was utterly overwhelmed by the sheer scale of the soaring vaulted ceilings and stained glass windows." },
        { id: "opt_B", label: "B", text: "When I went into the church, I felt very surprised because it was very high." },
        { id: "opt_C", label: "C", text: "The cathedral was big so my eyes became wide." },
        { id: "opt_D", label: "D", text: "I liked the building so much and took 200 selfies." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Stepping inside the cathedral, I was utterly overwhelmed by the sheer scale of the soaring vaulted ceilings and stained glass windows.",
      correctExplanation: "Từ vựng miêu tả cảm xúc sống động: 'utterly overwhelmed by the sheer scale' (hoàn toàn choáng ngợp trước quy mô đồ sộ), 'soaring vaulted ceilings' (mái vòm vút cao), 'stained glass windows' (những ô cửa sổ kính màu tráng lệ).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. When I went into the church, I felt very surprised because it was very high.",
        diagnosticTitle: "Dùng từ ngữ bình dị và cấu trúc câu đơn điệu",
        explanation: "'Very surprised because it was very high' là câu ghép đơn giản không tạo được cảm xúc ấn tượng.",
      }
    },
    {
      id: "leader_w2d2_q07",
      roundIndex: 6,
      prompt: "Từ 'gentrification' trong chủ đề đô thị và kiến trúc chỉ hiện tượng gì?",
      options: [
        { id: "opt_A", label: "A", text: "Quá trình cải tạo và nâng cấp các khu dân cư nghèo cũ kỹ thành khu đô thị hiện đại, thường đẩy giá nhà lên cao và đẩy cư dân nghèo ban đầu ra xa" },
        { id: "opt_B", label: "B", text: "Việc phá hủy toàn bộ cây xanh trong công viên để làm bãi đỗ xe" },
        { id: "opt_C", label: "C", text: "Chính sách miễn giảm thuế cho người nông dân trồng lúa" },
        { id: "opt_D", label: "D", text: "Sự sụp đổ của thị trường chứng khoán quốc tế" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Quá trình cải tạo và nâng cấp các khu dân cư nghèo cũ kỹ thành khu đô thị hiện đại, thường đẩy giá nhà lên cao và đẩy cư dân nghèo ban đầu ra xa",
      correctExplanation: "'Gentrification' (chỉnh trang đô thị kèm tăng giá bất động sản) là một khái niệm xã hội học đô thị kinh điển rất thường xuất hiện trong Speaking Part 3 và Writing Task 2.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Việc phá hủy toàn bộ cây xanh trong công viên để làm bãi đỗ xe",
        diagnosticTitle: "Đồng nhất chỉnh trang đô thị với nạn phá rừng",
        explanation: "Gentrification là sự thay đổi cơ cấu dân cư và hạ tầng xã hội, không phải là việc chặt cây làm bãi xe.",
      }
    },
    {
      id: "leader_w2d2_q08",
      roundIndex: 7,
      prompt: "Trong Speaking Part 3, khi được hỏi: 'Should governments invest heavily in preserving historic buildings or focus on constructing modern infrastructure?', cấu trúc trả lời nào thể hiện tư duy cân bằng đỉnh cao?",
      options: [
        { id: "opt_A", label: "A", text: "It is by no means an either-or dichotomy. While cutting-edge transport networks are critical for economic dynamism, historic monuments embody the cultural soul and collective memory of a nation, justifying sustainable conservation budgets." },
        { id: "opt_B", label: "B", text: "Old buildings are useless, just demolish them all and build modern roads." },
        { id: "opt_C", label: "C", text: "Keep all old buildings and never build any new roads." },
        { id: "opt_D", label: "D", text: "I don't know because I am not the prime minister." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. It is by no means an either-or dichotomy. While cutting-edge transport networks are critical for economic dynamism, historic monuments embody the cultural soul and collective memory of a nation, justifying sustainable conservation budgets.",
      correctExplanation: "Bác bỏ lối tư duy nhị nguyên sai lầm: 'It is by no means an either-or dichotomy' (đây hoàn toàn không phải sự phân đôi được cái này mất cái kia), 'cultural soul and collective memory' (linh hồn văn hóa và ký ức tập thể của dân tộc).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Old buildings are useless, just demolish them all and build modern roads.",
        diagnosticTitle: "Lối tư duy cực đoan phá hủy di sản văn hóa",
        explanation: "Phát biểu phá bỏ mọi di sản văn hóa là lập trường cực đoan thiếu chiều sâu xã hội học.",
      }
    },
    {
      id: "leader_w2d2_q09",
      roundIndex: 8,
      prompt: "Collocation 'architectural marvel' đồng nghĩa với cụm từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "a masterpiece of design and structural engineering" },
        { id: "opt_B", label: "B", text: "a poorly built wooden shack" },
        { id: "opt_C", label: "C", text: "a cheap apartment block" },
        { id: "opt_D", label: "D", text: "an empty construction site" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. a masterpiece of design and structural engineering",
      correctExplanation: "'Architectural marvel' (kỳ quan kiến trúc) đồng nghĩa với 'a masterpiece of design and structural engineering' (kiệt tác thiết kế và kỹ thuật kết cấu).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. a poorly built wooden shack",
        diagnosticTitle: "Chọn cụm từ trái nghĩa chỉ túp lều rách nát",
        explanation: "'Poorly built shack' (túp lều ọp ẹp) trái ngược hoàn toàn với kỳ quan kiến trúc.",
      }
    },
    {
      id: "leader_w2d2_q10",
      roundIndex: 9,
      prompt: "Để kết thúc bài nói Part 2 miêu tả một tòa nhà biểu tượng, câu kết nào sau đây để lại ấn tượng tốt nhất về mặt Fluency?",
      options: [
        { id: "opt_A", label: "A", text: "All in all, this landmark is not merely a testament to human engineering prowess, but a timeless beacon of cultural pride that continues to captivate visitors worldwide." },
        { id: "opt_B", label: "B", text: "That is all the information about this building, thank you for listening." },
        { id: "opt_C", label: "C", text: "I finished my talk, now you can ask me questions." },
        { id: "opt_D", label: "D", text: "I hope you go there one day and buy a souvenir." }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. All in all, this landmark is not merely a testament to human engineering prowess, but a timeless beacon of cultural pride that continues to captivate visitors worldwide.",
      correctExplanation: "Một cái kết nâng tầm triết lý: 'testament to human engineering prowess' (bằng chứng cho năng lực kỹ thuật của con người) và 'timeless beacon of cultural pride' (ngọn hải đăng vượt thời gian của niềm tự hào văn hóa).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. That is all the information about this building, thank you for listening.",
        diagnosticTitle: "Dùng câu đóng bài máy móc kiểu thuyết trình học sinh",
        explanation: "'Thank you for listening' biến bài thi nói tương tác thành bài thuyết trình đơn điệu.",
      }
    }
  ],

  "WEEK 2 – DAY 3": [
    {
      id: "leader_w2d3_q01",
      roundIndex: 0,
      prompt: "Trong bài đọc Cambridge 10 về hiện tượng lại giống sinh học (Atavism / Evolutionary throwbacks), định luật Dollo (Dollo's Law, đề xuất năm 1893) khẳng định điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Tiến hóa sinh học là một quá trình không thể đảo ngược, một khi một đặc tính phức tạp đã bị mất đi qua chọn lọc tự nhiên thì nó sẽ không bao giờ xuất hiện trở lại ở cùng một dòng dõi" },
        { id: "opt_B", label: "B", text: "Mọi loài động vật trên cạn đều sẽ tiến hóa trở lại thành cá bơi dưới đại dương" },
        { id: "opt_C", label: "C", text: "Các loài thú ăn cỏ sẽ biến đổi thành thú ăn thịt trong vòng 100 năm" },
        { id: "opt_D", label: "D", text: "Đột biến gen luôn luôn mang lại lợi ích cho sinh vật" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Tiến hóa sinh học là một quá trình không thể đảo ngược, một khi một đặc tính phức tạp đã bị mất đi qua chọn lọc tự nhiên thì nó sẽ không bao giờ xuất hiện trở lại ở cùng một dòng dõi",
      correctExplanation: "Đoạn 1 nêu định nghĩa cốt lõi: Louis Dollo đề xuất rằng 'evolution was irreversible: that an organism, having lost a complex feature through evolution, could never re-evolve that same feature'.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Mọi loài động vật trên cạn đều sẽ tiến hóa trở lại thành cá bơi dưới đại dương",
        diagnosticTitle: "Suy diễn cực đoan theo hướng ngược lại với định luật Dollo",
        explanation: "Định luật Dollo nhấn mạnh tính một chiều không thể đảo ngược (irreversibility), không nói loài trên cạn biến thành cá.",
      }
    },
    {
      id: "leader_w2d3_q02",
      roundIndex: 1,
      prompt: "Sự kiện con cá voi lưng gù (Humpback whale) bị bắt ngoài khơi đảo Vancouver năm 1919 được nhà thám hiểm Roy Chapman Andrews dẫn chứng nhằm mục đích gì?",
      options: [
        { id: "opt_A", label: "A", text: "Làm bằng chứng ngoại lệ thực tế chứng minh cho hiện tượng lại giống atavism throwback, khi con cá voi này mọc một cặp chi sau dài hơn 1 mét có đầy đủ xương chi như tổ tiên trên cạn" },
        { id: "opt_B", label: "B", text: "Chứng minh loài cá voi lưng gù đang đối mặt với nguy cơ tuyệt chủng" },
        { id: "opt_C", label: "C", text: "Kêu gọi thành lập các khu bảo tồn sinh vật biển ở bờ biển Canada" },
        { id: "opt_D", label: "D", text: "Chứng minh công nghệ săn bắt cá voi của thế kỷ 20 rất hiện đại" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Làm bằng chứng ngoại lệ thực tế chứng minh cho hiện tượng lại giống atavism throwback, khi con cá voi này mọc một cặp chi sau dài hơn 1 mét có đầy đủ xương chi như tổ tiên trên cạn",
      correctExplanation: "Đoạn 2 chỉ ra: con cá voi lưng gù có 'a pair of leglike appendages over a metre long, complete with a full set of limb bones'. Đây là bằng chứng kinh điển bác bỏ tính bất biến tuyệt đối của định luật Dollo.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chứng minh loài cá voi lưng gù đang đối mặt với nguy cơ tuyệt chủng",
        diagnosticTitle: "Bị phân tâm bởi vấn đề bảo tồn sinh vật biển",
        explanation: "Bài đọc là một nghiên cứu sinh học tiến hóa (Evolutionary genetics), không phải bài viết về bảo tồn sinh thái.",
      }
    },
    {
      id: "leader_w2d3_q03",
      roundIndex: 2,
      prompt: "Giả thuyết của nhà di truyền học Rudolf Raff tại Đại học Indiana về cơ chế của các gen 'ngủ yên' (Silent genes) là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Một số biến đổi tiến hóa không phải do mất gen vĩnh viễn mà do gen bị 'tắt đi'; nếu các gen im lặng này được kích hoạt trở lại thì các đặc tính cổ xưa đã biến mất có thể tái xuất hiện" },
        { id: "opt_B", label: "B", text: "Các gen ngủ yên sẽ biến đổi thành các khối u ung thư sau 1 triệu năm" },
        { id: "opt_C", label: "C", text: "Gen im lặng chỉ tồn tại ở các loài bò sát và không có ở động vật có vú" },
        { id: "opt_D", label: "D", text: "Mọi gen ngủ yên đều tự hủy trong vòng một thế hệ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Một số biến đổi tiến hóa không phải do mất gen vĩnh viễn mà do gen bị 'tắt đi'; nếu các gen im lặng này được kích hoạt trở lại thì các đặc tính cổ xưa đã biến mất có thể tái xuất hiện",
      correctExplanation: "Đoạn 3 giải thích cơ chế di truyền: 'others may be the result of genes being switched off. If these silent genes are somehow switched back on... long-lost traits could reappear'.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Mọi gen ngủ yên đều tự hủy trong vòng một thế hệ",
        diagnosticTitle: "Hiểu sai thời gian tồn tại của gen không hoạt động",
        explanation: "Nhóm nghiên cứu của Raff tính toán gen ngủ yên có thể tồn tại từ 6 đến 10 triệu năm trước khi bị đột biến phá hủy hoàn toàn.",
      }
    },
    {
      id: "leader_w2d3_q04",
      roundIndex: 3,
      prompt: "Thời gian tồn tại tối đa ước tính của một gen ngủ yên trước khi các đột biến ngẫu nhiên tích tụ phá hủy nó hoàn toàn là bao lâu?",
      options: [
        { id: "opt_A", label: "A", text: "Khoảng từ 6 đến 10 triệu năm" },
        { id: "opt_B", label: "B", text: "Chỉ khoảng 100 năm" },
        { id: "opt_C", label: "C", text: "Hơn 500 triệu năm đối với mọi loài" },
        { id: "opt_D", label: "D", text: "Chỉ đúng 1 thế hệ cha truyền con nối" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Khoảng từ 6 đến 10 triệu năm",
      correctExplanation: "Đoạn 4 nêu số liệu cụ thể: 'silent genes surviving for up to 6 million years in at least a few individuals in a population, and that some might survive as long as 10 million years'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chỉ khoảng 100 năm",
        diagnosticTitle: "Ước lượng thời gian tiến hóa quá ngắn",
        explanation: "100 năm chỉ là một khoảnh khắc trong tiến hóa; thời gian tồn tại của cấu trúc gen tính bằng hàng triệu năm.",
      }
    },
    {
      id: "leader_w2d3_q05",
      roundIndex: 4,
      prompt: "Nghiên cứu của nhà sinh học Gunter Wagner (Đại học Yale) về loài thằn lằn Bachia ở Nam Mỹ đã phá vỡ giới hạn thời gian 10 triệu năm của Raff như thế nào?",
      options: [
        { id: "opt_A", label: "A", text: "Chứng minh rằng loài thằn lằn này đã tái tiến hóa các ngón chân từ tổ tiên không có ngón trải qua quãng thời gian lên tới hàng chục triệu năm" },
        { id: "opt_B", label: "B", text: "Phát hiện thằn lằn Bachia có thể thở dưới nước như loài cá" },
        { id: "opt_C", label: "C", text: "Khẳng định thằn lằn Bachia là loài khủng long bay còn sống sót" },
        { id: "opt_D", label: "D", text: "Chứng minh thằn lằn không hề có cấu trúc ADN" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Chứng minh rằng loài thằn lằn này đã tái tiến hóa các ngón chân từ tổ tiên không có ngón trải qua quãng thời gian lên tới hàng chục triệu năm",
      correctExplanation: "Đoạn 6 nêu rõ: 'the toed species re-evolved toes from toeless ancestors and, what is more, digit loss and gain has occurred on more than one occasion over tens of millions of years', vượt xa mốc 10 triệu năm.",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Khẳng định thằn lằn Bachia là loài khủng long bay còn sống sót",
        diagnosticTitle: "Suy diễn giả tưởng kỳ dị không có trong bài",
        explanation: "Thằn lằn Bachia là loài bò sát nhỏ chi ngắn, không liên quan đến khủng long bay.",
      }
    },
    {
      id: "leader_w2d3_q06",
      roundIndex: 5,
      prompt: "Chi tiết phôi thai của loài rắn mọc mầm chi sau (hind limb buds) nhưng sau đó tự tiêu biến trong bụng mẹ minh họa cho cơ chế sinh học nào?",
      options: [
        { id: "opt_A", label: "A", text: "Các chương trình phát triển phôi thai vẫn lưu giữ bản thiết kế của tổ tiên, và nếu tín hiệu triệt tiêu bị lỗi thì đặc tính cổ xưa như chi sau sẽ xuất hiện ở con non" },
        { id: "opt_B", label: "B", text: "Rắn là một loài chim đã bị rụng hết lông" },
        { id: "opt_C", label: "C", text: "Rắn có thể tự mọc chân bất kỳ lúc nào nếu thời tiết quá nóng" },
        { id: "opt_D", label: "D", text: "Phôi thai rắn bị nhiễm độc chất phóng xạ trong tự nhiên" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Các chương trình phát triển phôi thai vẫn lưu giữ bản thiết kế của tổ tiên, và nếu tín hiệu triệt tiêu bị lỗi thì đặc tính cổ xưa như chi sau sẽ xuất hiện ở con non",
      correctExplanation: "Đoạn cuối phân tích: phôi thai nhiều loài tái hiện đặc tính tổ tiên; nếu chương trình phát triển ra lệnh 'lose the leg' vì lý do nào đó không hoạt động, con non sinh ra sẽ có chân (atavism).",
      timeLimitSeconds: 25,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. Rắn có thể tự mọc chân bất kỳ lúc nào nếu thời tiết quá nóng",
        diagnosticTitle: "Suy diễn sai lầm về sự thích nghi nhiệt độ tức thời",
        explanation: "Đây là đột biến phát triển phôi học (embryological development), không phải hiện tượng thích nghi thời tiết.",
      }
    },
    {
      id: "leader_w2d3_q07",
      roundIndex: 6,
      prompt: "Từ 'atavism' trong sinh học tiến hóa đồng nghĩa với cụm từ nào?",
      options: [
        { id: "opt_A", label: "A", text: "an evolutionary throwback sự tái hiện đặc tính của tổ tiên xa xưa" },
        { id: "opt_B", label: "B", text: "a lethal genetic defect một dị tật di truyền gây chết non" },
        { id: "opt_C", label: "C", text: "a completely new artificial trait một đặc tính nhân tạo hoàn toàn mới" },
        { id: "opt_D", label: "D", text: "an accelerated extinction sự tuyệt chủng nhanh chóng" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. an evolutionary throwback sự tái hiện đặc tính của tổ tiên xa xưa",
      correctExplanation: "'Atavism' (sự lại giống / hồi tổ) chính là 'evolutionary throwback' - sự tái xuất hiện bất ngờ của một đặc tính hình thái thuộc về tổ tiên xa xôi vốn đã tiêu biến từ lâu.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_C",
        baitOptionText: "C. a completely new artificial trait một đặc tính nhân tạo hoàn toàn mới",
        diagnosticTitle: "Nhầm lẫn giữa đặc tính tổ tiên cổ xưa với đặc tính đột biến mới",
        explanation: "'Atavism' bắt nguồn từ gốc từ Latin atavus (tổ tiên xa), chỉ sự quay lại đặc tính cũ chứ không phải tạo ra cái mới.",
      }
    },
    {
      id: "leader_w2d3_q08",
      roundIndex: 7,
      prompt: "Kỹ năng 'Simultaneous Multi-Question Tracking' (Theo dõi đồng thời nhiều câu hỏi) trong IELTS Reading giúp giải quyết vấn đề gì?",
      options: [
        { id: "opt_A", label: "A", text: "Đọc song song từ khóa của 2-3 câu hỏi cùng lúc để tránh việc đọc lướt qua thông tin của câu sau mà không hề hay biết" },
        { id: "opt_B", label: "B", text: "Làm cả bài thi trong vòng 5 phút" },
        { id: "opt_C", label: "C", text: "Học thuộc đáp án của các kỳ thi trước" },
        { id: "opt_D", label: "D", text: "Chỉ đọc câu hỏi cuối cùng của bài thi" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Đọc song song từ khóa của 2-3 câu hỏi cùng lúc để tránh việc đọc lướt qua thông tin của câu sau mà không hề hay biết",
      correctExplanation: "Kỹ thuật Leader độc quyền: Khi các câu hỏi đi theo thứ tự bài đọc, việc neo sẵn từ khóa của câu kế tiếp sẽ ngăn ngừa việc người đọc bị 'trôi điểm' (overshooting) qua câu tiếp theo mà vẫn mải mê tìm câu trước.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Làm cả bài thi trong vòng 5 phút",
        diagnosticTitle: "Cường điệu hóa tốc độ làm bài phi thực tế",
        explanation: "Phương pháp đọc đa nhiệm câu hỏi giúp tăng độ chính xác và kiểm soát thời gian, không phải mẹo làm trong 5 phút.",
      }
    },
    {
      id: "leader_w2d3_q09",
      roundIndex: 8,
      prompt: "Từ 'appendages' trong câu: 'a humpback whale with a pair of leglike appendages' mang nghĩa là gì?",
      options: [
        { id: "opt_A", label: "A", text: "Các phần phụ hoặc chi mọc chìa ra ngoài cơ thể" },
        { id: "opt_B", label: "B", text: "Các vết sẹo do cá mập cắn" },
        { id: "opt_C", label: "C", text: "Những chiếc răng nanh khổng lồ" },
        { id: "opt_D", label: "D", text: "Những con mắt phụ trên lưng cá voi" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Các phần phụ hoặc chi mọc chìa ra ngoài cơ thể",
      correctExplanation: "'Appendage' (phần phụ cơ thể: tay, chân, đuôi, râu) là thuật ngữ sinh học giải phẫu chỉ các cấu trúc cơ quan gắn liền vào thân mình.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Các vết sẹo do cá mập cắn",
        diagnosticTitle: "Hiểu nhầm phần chi phụ thành vết thương tổn thương",
        explanation: "Bài đọc miêu tả rõ đây là các chi giống chân có xương ('limb bones'), không phải vết cắn sẹo.",
      }
    },
    {
      id: "leader_w2d3_q10",
      roundIndex: 9,
      prompt: "Khi gặp dạng câu hỏi Multiple Choice có đáp án chứa từ phủ định tuyệt đối như 'never, impossible, completely', thí sinh cần lưu ý điều gì?",
      options: [
        { id: "opt_A", label: "A", text: "Cần đặc biệt cảnh giác vì các khẳng định tuyệt đối thường là phương án bẫy, trừ khi bài đọc khẳng định chính xác 100% bằng chứng tương đương" },
        { id: "opt_B", label: "B", text: "Chắc chắn là đáp án đúng trong mọi trường hợp" },
        { id: "opt_C", label: "C", text: "Bỏ qua không cần đọc câu hỏi đó" },
        { id: "opt_D", label: "D", text: "Chỉ chọn nếu từ đó viết bằng mực đỏ" }
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Cần đặc biệt cảnh giác vì các khẳng định tuyệt đối thường là phương án bẫy, trừ khi bài đọc khẳng định chính xác 100% bằng chứng tương đương",
      correctExplanation: "Bẫy Extreme Qualifiers trong Cambridge: Các đáp án chứa từ ngữ tuyệt đối hóa thường sai lệch sắc thái thận trọng của các nhà khoa học trong bài đọc học thuật.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Chắc chắn là đáp án đúng trong mọi trường hợp",
        diagnosticTitle: "Tin rằng các câu mang tính khẳng định mạnh là câu đúng",
        explanation: "Các nhà khoa học trong văn bản học thuật luôn dùng Hedging (ngôn ngữ rào đón), các câu khẳng định tuyệt đối thường là distractor.",
      }
    }
  ]
};
