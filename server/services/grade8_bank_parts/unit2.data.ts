/**
 * GRADE 8 QUESTION BANK - UNIT 2: LIFE IN THE COUNTRYSIDE
 * Source: D:\ARIS IELTS\THCS\Đề kiểm tra lớp 8\De_kiem_tra_Tieng_Anh_8_Unit2.docx
 * Curriculum: Tiếng Anh 8 Global Success
 * Core Competencies:
 *  - Phonetics: /ə/ vs /ɪ/
 *  - Countryside Vocabulary: paddy field, fruit orchard, herd, combine harvester
 *  - Comparative Adverbs: harder, faster, earlier, more slowly, more frequently, more carefully
 *  - Everyday English: Giving & Responding to compliments
 */

export const GRADE8_UNIT2_QUESTIONS: Record<string, any[]> = {
  "UNIT 2 – LIFE IN THE COUNTRYSIDE": [
    {
      id: "g8_u2_q01",
      roundIndex: 0,
      prompt: "Chọn từ có phần gạch chân phát âm là /ə/ khác biệt với ba từ còn lại phát âm là /ɪ/:",
      options: [
        { id: "opt_A", label: "A", text: "again" },
        { id: "opt_B", label: "B", text: "busy" },
        { id: "opt_C", label: "C", text: "village" },
        { id: "opt_D", label: "D", text: "pretty" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. again",
      correctExplanation: "'again' bắt đầu bằng âm schwa /ə/ (/əˈɡen/). Cả ba từ còn lại đều có nguyên âm phát âm là /ɪ/: 'busy' /ˈbɪzi/, 'village' /ˈvɪlɪdʒ/, 'pretty' /ˈprɪti/.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. busy",
        diagnosticTitle: "Nhầm lẫn cách phát âm đặc biệt của từ 'busy'",
        explanation: "Học sinh thấy chữ cái 'u' trong 'busy' thì hay nhầm với âm /ʌ/ hoặc /uː/, quên rằng 'busy' phát âm là /ɪ/ (/ˈbɪzi/). Đáp án có âm /ə/ duy nhất là 'again'."
      }
    },
    {
      id: "g8_u2_q02",
      roundIndex: 1,
      prompt: "Điền từ thích hợp vào định nghĩa: \"A _______ is an area of land where people grow rice.\"",
      options: [
        { id: "opt_A", label: "A", text: "paddy field" },
        { id: "opt_B", label: "B", text: "fruit orchard" },
        { id: "opt_C", label: "C", text: "water canal" },
        { id: "opt_D", label: "D", text: "country cottage" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. paddy field",
      correctExplanation: "'paddy field' có nghĩa là cánh đồng lúa nước (nơi nông dân trồng lúa). 'orchard' là vườn cây ăn quả, 'canal' là kênh rạch, 'cottage' là nhà tranh.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. fruit orchard",
        diagnosticTitle: "Nhầm lẫn giữa ruộng lúa (paddy field) và vườn cây ăn trái (orchard)",
        explanation: "Học sinh dễ nhầm lẫn các khái niệm đất canh tác ở nông thôn. Nơi trồng cây ăn trái là 'orchard', còn nơi trồng lúa bắt buộc là 'paddy field'."
      }
    },
    {
      id: "g8_u2_q03",
      roundIndex: 2,
      prompt: "Chọn động từ thích hợp: \"Every afternoon after school, Nam helps his grandfather _______ the buffaloes on the pasture.\"",
      options: [
        { id: "opt_A", label: "A", text: "herd" },
        { id: "opt_B", label: "B", text: "catch" },
        { id: "opt_C", label: "C", text: "load" },
        { id: "opt_D", label: "D", text: "feed" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. herd",
      correctExplanation: "Động từ 'herd' có nghĩa là chăn, dắt đàn gia súc ('herd the buffaloes / cows / cattle').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_D",
        baitOptionText: "D. feed",
        diagnosticTitle: "Nhầm lẫn giữa chăn thả (herd) và cho ăn (feed)",
        explanation: "Học sinh thấy trâu bò trên bãi cỏ pasture thì dễ chọn 'feed' (cho ăn), nhưng hành động dẫn dắt cả đàn trâu bò đi ăn cỏ là động từ 'herd'."
      }
    },
    {
      id: "g8_u2_q04",
      roundIndex: 3,
      prompt: "Chọn tên loại máy móc nông nghiệp: \"A _______ is a modern machine that harvests rice and separates the grains from the plant.\"",
      options: [
        { id: "opt_A", label: "A", text: "combine harvester" },
        { id: "opt_B", label: "B", text: "heavy tractor" },
        { id: "opt_C", label: "C", text: "delivery truck" },
        { id: "opt_D", label: "D", text: "water pump" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. combine harvester",
      correctExplanation: "'combine harvester' là máy gặt đập liên hợp (vừa cắt lúa, vừa đập và tách hạt lúa tự động).",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. heavy tractor",
        diagnosticTitle: "Nhầm giữa máy cày (tractor) và máy gặt đập (combine harvester)",
        explanation: "'tractor' là máy cày hoặc đầu kéo, không có chức năng thu hoạch và tuốt hạt lúa như 'combine harvester'."
      }
    },
    {
      id: "g8_u2_q05",
      roundIndex: 4,
      prompt: "Điền dạng so sánh hơn chính xác của trạng từ: \"Life in the countryside seems to move _______ than life in the noisy city.\"",
      options: [
        { id: "opt_A", label: "A", text: "more slowly" },
        { id: "opt_B", label: "B", text: "slowlier" },
        { id: "opt_C", label: "C", text: "more slower" },
        { id: "opt_D", label: "D", text: "most slowly" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. more slowly",
      correctExplanation: "Trạng từ tận cùng là '-ly' như 'slowly' khi chuyển sang so sánh hơn phải dùng cấu trúc 'more + trạng từ' ('more slowly').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. slowlier",
        diagnosticTitle: "Áp dụng sai quy tắc thêm đuôi '-ier' cho trạng từ dài tận cùng -ly",
        explanation: "Học sinh thường áp dụng máy móc quy tắc tính từ có đuôi '-y' sang trạng từ đuôi '-ly'. Với trạng từ 'slowly', dạng so sánh hơn bắt buộc là 'more slowly', không có từ 'slowlier'."
      }
    },
    {
      id: "g8_u2_q06",
      roundIndex: 5,
      prompt: "Chọn câu có cấu trúc so sánh hơn CHUẨN XÁC về trạng từ:",
      options: [
        { id: "opt_A", label: "A", text: "Local farmers work harder during the harvest season." },
        { id: "opt_B", label: "B", text: "Local farmers work more hardly during the harvest season." },
        { id: "opt_C", label: "C", text: "Local farmers work more hard during the harvest season." },
        { id: "opt_D", label: "D", text: "Local farmers work hardlier during the harvest season." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Local farmers work harder during the harvest season.",
      correctExplanation: "'hard' là trạng từ ngắn bất quy tắc, có dạng so sánh hơn là 'harder'. 'hardly' là một từ hoàn toàn khác mang nghĩa phủ định ('hầu như không'), tuyệt đối không dùng 'more hardly'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Local farmers work more hardly during the harvest season.",
        diagnosticTitle: "Nhầm lẫn tai hại giữa 'harder' và 'hardly / more hardly'",
        explanation: "Học sinh nghĩ trạng từ phải có đuôi '-ly' nên ghép 'hardly' rồi thêm 'more'. Thực tế 'hard' vừa là tính từ vừa là trạng từ, so sánh hơn là 'harder'."
      }
    },
    {
      id: "g8_u2_q07",
      roundIndex: 6,
      prompt: "Tìm câu CHƯA CHÍNH XÁC về ngữ pháp so sánh hơn:",
      options: [
        { id: "opt_A", label: "A", text: "She drives more careful than her husband on the narrow road." },
        { id: "opt_B", label: "B", text: "My father usually gets up earlier than everyone else in the house." },
        { id: "opt_C", label: "C", text: "Minh runs faster than all of his classmates in the race." },
        { id: "opt_D", label: "D", text: "Lan speaks English more fluently now than she did last year." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. She drives more careful than her husband on the narrow road.",
      correctExplanation: "Động từ thường 'drives' đòi hỏi trạng từ bổ nghĩa: phải là 'more carefully', không được dùng tính từ 'more careful'. Các câu B, C, D đều chuẩn xác ('earlier', 'faster', 'more fluently').",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. My father usually gets up earlier than everyone else in the house.",
        diagnosticTitle: "Nghi ngờ từ 'earlier' là sai ngữ pháp",
        explanation: "Nhiều học sinh nghĩ trạng từ 'early' phải dùng 'more early'. Thực tế trạng từ 'early' đổi đuôi 'y' thành 'ier' ('earlier'). Lỗi sai thật sự nằm ở câu A: 'drives more carefully'."
      }
    },
    {
      id: "g8_u2_q08",
      roundIndex: 7,
      prompt: "Điền vào chỗ trống: \"Local buses in the city run every 10 minutes, but village buses run every hour. Therefore, city buses operate _______ than village buses.\"",
      options: [
        { id: "opt_A", label: "A", text: "more frequently" },
        { id: "opt_B", label: "B", text: "more frequent" },
        { id: "opt_C", label: "C", text: "frequentlier" },
        { id: "opt_D", label: "D", text: "most frequently" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. more frequently",
      correctExplanation: "Động từ 'operate' (hoạt động, vận hành) cần trạng từ 'more frequently' (thường xuyên hơn) để bổ nghĩa.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. more frequent",
        diagnosticTitle: "Dùng tính từ thay vì trạng từ bổ nghĩa cho động từ",
        explanation: "'frequent' là tính từ (dùng trước danh từ hoặc sau to be). Để bổ nghĩa cho hành động 'operate' khi so sánh hơn, bắt buộc phải dùng trạng từ 'more frequently'."
      }
    },
    {
      id: "g8_u2_q09",
      roundIndex: 8,
      prompt: "Khi người bạn nói: \"You really have a nice shirt, Nam!\", câu đáp lại thể hiện sự lịch sự và tự nhiên nhất là:",
      options: [
        { id: "opt_A", label: "A", text: "Thank you. My mother bought it for me." },
        { id: "opt_B", label: "B", text: "You are welcome." },
        { id: "opt_C", label: "C", text: "Never mind about that." },
        { id: "opt_D", label: "D", text: "No, it is very ugly." },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Thank you. My mother bought it for me.",
      correctExplanation: "Khi nhận được lời khen ngợi (giving compliments), lời đáp lại phù hợp là lời cảm ơn chân thành ('Thank you') kèm thông tin vui vẻ, lịch sự.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. You are welcome.",
        diagnosticTitle: "Dùng nhầm câu đáp lại lời cảm ơn",
        explanation: "'You are welcome' (Không có chi) chỉ dùng để đáp lại khi ai đó cảm ơn mình, không thể dùng làm câu trả lời khi được người khác khen."
      }
    },
    {
      id: "g8_u2_q10",
      roundIndex: 9,
      prompt: "Phát hiện lỗi ngữ pháp trong câu: \"You must ride your bicycle more carefuller on this bumpy village road.\"",
      options: [
        { id: "opt_A", label: "A", text: "Dùng thừa cùng lúc cả 'more' và đuôi '-er' trong 'more carefuller'" },
        { id: "opt_B", label: "B", text: "Động từ khuyết thiếu 'must' bắt buộc phải đổi thành 'should'" },
        { id: "opt_C", label: "C", text: "Động từ 'ride' phải chuyển thành dạng nguyên mẫu có 'to'" },
        { id: "opt_D", label: "D", text: "Giới từ 'on' trước 'this bumpy road' phải đổi thành 'in'" },
      ],
      correctOptionId: "opt_A",
      correctAnswerText: "A. Dùng thừa cùng lúc cả 'more' và đuôi '-er' trong 'more carefuller'",
      correctExplanation: "Đây là lỗi so sánh kép (double comparative). Trạng từ 'carefully' là trạng từ dài, dạng so sánh hơn chỉ là 'more carefully', không bao giờ có dạng 'more carefuller'.",
      timeLimitSeconds: 20,
      points: 1000,
      misconception: {
        baitOptionId: "opt_B",
        baitOptionText: "B. Động từ khuyết thiếu 'must' bắt buộc phải đổi thành 'should'",
        diagnosticTitle: "Nhầm lẫn giữa sắc thái cảnh báo an toàn và lỗi ngữ pháp",
        explanation: "'must' hoàn toàn đúng khi đưa ra yêu cầu an toàn. Lỗi ngữ pháp nghiêm trọng trong câu là 'more carefuller' (phải sửa thành 'more carefully')."
      }
    },
  ]
};
