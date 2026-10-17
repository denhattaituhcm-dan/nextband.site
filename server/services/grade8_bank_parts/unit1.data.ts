/**
 * GRADE 8 QUESTION BANK - UNIT 1: LEISURE TIME
 * Source: D:\ARIS IELTS\THCS\Đề kiểm tra lớp 8\De_kiem_tra_Tieng_Anh_8_Unit1.docx
 * Curriculum: Tiếng Anh 8 Global Success
 * Core Competencies:
 *  - Phonetics: /ʊ/ vs /uː/
 *  - Verbs of liking / disliking: enjoy, fancy, detest, love, prefer + V-ing
 *  - Prepositional phrases: be keen on, be fond of, be crazy about, be into
 *  - Everyday English: Inviting & Accepting invitations
 */

export const GRADE8_UNIT1_QUESTIONS: Record<string, any[]> = {
  "UNIT 1 – LEISURE TIME": [
    {
      id: "g8_u1_q01",
      roundIndex: 0,
      prompt: "Chọn từ có phần gạch chân phát âm là /uː/ khác biệt với ba từ còn lại phát âm là /ʊ/:",
      options: [
        { id: "opt_A", label: "A", text: "food" },
        { id: "opt_B", label: "B", text: "book" },
        { id: "opt_C", label: "C", text: "good" },
        { id: "opt_D", label: "D", text: "look" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. food",
      correctExplanation: "'food' phát âm là nguyên âm dài /fuːd/. Ba từ còn lại đều phát âm là nguyên âm ngắn /ʊ/: 'book' /bʊk/, 'good' /ɡʊd/, 'look' /lʊk/.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. book",
        diagnosticTitle: "Không phân biệt được nguyên âm ngắn /ʊ/ và dài /uː/",
        explanation: "Học sinh thường thấy hai chữ 'oo' thì mặc định phát âm giống nhau, quên rằng 'book, good, look, cook' là âm ngắn /ʊ/, còn 'food, school, pool' là âm dài /uː/."
      }
    },
    {
      id: "g8_u1_q02",
      roundIndex: 1,
      prompt: "Điền giới từ thích hợp: \"She is keen _______ cooking and wants to become a chef in the future.\"",
      options: [
        { id: "opt_A", label: "A", text: "on" },
        { id: "opt_B", label: "B", text: "in" },
        { id: "opt_C", label: "C", text: "of" },
        { id: "opt_D", label: "D", text: "about" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. on",
      correctExplanation: "Cấu trúc cố định chỉ sở thích: 'be keen on + V-ing/noun' (thích, đam mê cái gì).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. in",
        diagnosticTitle: "Nhầm lẫn với cấu trúc 'interested in'",
        explanation: "Học sinh thường nhớ 'interested in' rồi áp dụng nhầm giới từ 'in' cho tính từ 'keen'. Với 'keen' bắt buộc phải dùng giới từ 'on'."
      }
    },
    {
      id: "g8_u1_q03",
      roundIndex: 2,
      prompt: "Điền giới từ chính xác: \"I am really fond _______ taking photos of natural landscapes and street life.\"",
      options: [
        { id: "opt_A", label: "A", text: "of" },
        { id: "opt_B", label: "B", text: "at" },
        { id: "opt_C", label: "C", text: "on" },
        { id: "opt_D", label: "D", text: "for" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. of",
      correctExplanation: "Cụm từ cố định: 'be fond of + V-ing/noun' (yêu thích, hứng thú với điều gì).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. at",
        diagnosticTitle: "Nhầm lẫn với cụm từ 'good at'",
        explanation: "Học sinh dễ nhầm 'good at' (giỏi môn gì) sang 'fond at'. 'fond' luôn đi kèm với giới từ 'of'."
      }
    },
    {
      id: "g8_u1_q04",
      roundIndex: 3,
      prompt: "Câu nào dưới đây sử dụng CHUẨN XÁC cặp tính từ và giới từ chỉ sở thích?",
      options: [
        { id: "opt_A", label: "A", text: "I am crazy about doing DIY projects in my spare time." },
        { id: "opt_B", label: "B", text: "She is interested on making paper models with friends." },
        { id: "opt_C", label: "C", text: "He is very keen in playing chess with his grandfather." },
        { id: "opt_D", label: "D", text: "They are fond about skateboarding at the central park." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. I am crazy about doing DIY projects in my spare time.",
      correctExplanation: "'crazy about + V-ing' là chuẩn xác. Các câu còn lại dùng sai giới từ: 'interested in' (chứ không phải on), 'keen on' (chứ không phải in), 'fond of' (chứ không phải about).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. She is interested on making paper models with friends.",
        diagnosticTitle: "Sai giới từ đi với 'interested'",
        explanation: "'interested' bắt buộc đi với giới từ 'in', không bao giờ đi với 'on'."
      }
    },
    {
      id: "g8_u1_q05",
      roundIndex: 4,
      prompt: "Xác định câu CHƯA CHÍNH XÁC về cấu trúc ngữ pháp theo sau động từ chỉ sự yêu thích:",
      options: [
        { id: "opt_A", label: "A", text: "He enjoys to play chess with his brother after school." },
        { id: "opt_B", label: "B", text: "I prefer to stay at home and read books at weekends." },
        { id: "opt_C", label: "C", text: "They love going to the cinema on Saturday evenings." },
        { id: "opt_D", label: "D", text: "She likes to make origami crafts in her free time." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. He enjoys to play chess with his brother after school.",
      correctExplanation: "Động từ 'enjoy' BẮT BUỘC theo sau bởi V-ing ('enjoys playing'), KHÔNG ĐƯỢC đi với to-V. Các động từ like, love, prefer có thể đi với cả to-V lẫn V-ing.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. I prefer to stay at home and read books at weekends.",
        diagnosticTitle: "Nghĩ 'prefer' chỉ đi với V-ing",
        explanation: "'prefer' có thể đi với cả 'to-V' ('prefer to stay') hoặc 'V-ing' ('prefer staying to going out'). Lỗi thực sự nằm ở 'enjoy to play' (enjoy chỉ đi với V-ing)."
      }
    },
    {
      id: "g8_u1_q06",
      roundIndex: 5,
      prompt: "Chọn dạng đúng của động từ: \"My younger brother detests _______ to the dentist.\"",
      options: [
        { id: "opt_A", label: "A", text: "going" },
        { id: "opt_B", label: "B", text: "to go" },
        { id: "opt_C", label: "C", text: "went" },
        { id: "opt_D", label: "D", text: "goes" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. going",
      correctExplanation: "Động từ chỉ sự ghét cay ghét đắng 'detest' luôn bắt buộc đi kèm Danh động từ V-ing ('detest going').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. to go",
        diagnosticTitle: "Đồng nhất 'detest' với động từ 'hate'",
        explanation: "Dù 'hate' có thể đi với to-V, nhưng 'detest' là động từ đặc thù chỉ đi với V-ing trong chương trình Tiếng Anh 8."
      }
    },
    {
      id: "g8_u1_q07",
      roundIndex: 6,
      prompt: "Điền dạng động từ vào lời mời: \"Do you fancy _______ a new animated movie with us tonight?\"",
      options: [
        { id: "opt_A", label: "A", text: "watching" },
        { id: "opt_B", label: "B", text: "to watch" },
        { id: "opt_C", label: "C", text: "watch" },
        { id: "opt_D", label: "D", text: "watched" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. watching",
      correctExplanation: "Cấu trúc đưa ra lời rủ rê, mời mọc: 'Do you fancy + V-ing?' (Bạn có thích/muốn làm gì không?).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. to watch",
        diagnosticTitle: "Nhầm lẫn với cấu trúc 'Do you want to watch'",
        explanation: "Học sinh quen với 'want to watch' nên nhầm chọn 'fancy to watch'. 'fancy' là động từ đòi hỏi V-ing."
      }
    },
    {
      id: "g8_u1_q08",
      roundIndex: 7,
      prompt: "Câu nào dưới đây đồng nghĩa với câu: \"Mai does not like baking cakes at all.\"?",
      options: [
        { id: "opt_A", label: "A", text: "Mai is not into baking cakes." },
        { id: "opt_B", label: "B", text: "Mai is keen on baking cakes." },
        { id: "opt_C", label: "C", text: "Mai is fond of baking cakes." },
        { id: "opt_D", label: "D", text: "Mai is crazy about baking cakes." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Mai is not into baking cakes.",
      correctExplanation: "Thành ngữ 'be into something' = thích điều gì. Dạng phủ định 'be not into something' = không thích điều gì, tương đương với 'does not like'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. Mai is crazy about baking cakes.",
        diagnosticTitle: "Chọn câu mang nghĩa hoàn toàn trái ngược",
        explanation: "'crazy about' là cực kỳ cuồng nhiệt yêu thích, trái ngược 180 độ với 'does not like'."
      }
    },
    {
      id: "g8_u1_q09",
      roundIndex: 8,
      prompt: "Khi bạn nói: \"Would you like to go cycling with me this Sunday?\", câu đáp lại thể hiện sự hào hứng và lịch sự nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "Yes, I would love to." },
        { id: "opt_B", label: "B", text: "You are welcome." },
        { id: "opt_C", label: "C", text: "I beg your pardon." },
        { id: "opt_D", label: "D", text: "Never mind." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Yes, I would love to.",
      correctExplanation: "Đáp lại lời mời 'Would you like to...?', câu trả lời đồng ý tự nhiên và lịch sự là 'Yes, I would love to' (Vâng, tôi rất sẵn lòng).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. You are welcome.",
        diagnosticTitle: "Dùng nhầm câu đáp lại lời cảm ơn",
        explanation: "'You are welcome' (Không có chi) chỉ dùng để đáp lại lời cảm ơn 'Thank you', không thể dùng làm câu đồng ý lời mời."
      }
    },
    {
      id: "g8_u1_q10",
      roundIndex: 9,
      prompt: "Phát hiện lỗi ngữ pháp trong câu sau: \"My older brother not into cooking dinner for the whole family.\"",
      options: [
        { id: "opt_A", label: "A", text: "Thiếu động từ to be 'is' phía trước cụm 'not into'" },
        { id: "opt_B", label: "B", text: "Động từ 'cooking' phải đổi thành dạng nguyên mẫu 'to cook'" },
        { id: "opt_C", label: "C", text: "Cụm 'whole family' không được phép đi kèm với giới từ 'for'" },
        { id: "opt_D", label: "D", text: "Danh từ 'dinner' bắt buộc phải thêm mạo từ 'the'" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thiếu động từ to be 'is' phía trước cụm 'not into'",
      correctExplanation: "'into' đóng vai trò như tính từ/giới từ, bắt buộc phải có động từ to be chia theo chủ ngữ: 'My older brother is not into cooking dinner...'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Động từ 'cooking' phải đổi thành dạng nguyên mẫu 'to cook'",
        diagnosticTitle: "Hiểu sai sau 'into' đi với động từ nguyên mẫu",
        explanation: "'into' là giới từ, sau giới từ bắt buộc động từ phải ở dạng V-ing ('cooking'), không thể đổi thành 'to cook'."
      }
    },
  ]
};
