import { VocabularyTerm } from "../types";

/**
 * High-Value Lexical Learning Objects for Case #001: The Vanishing Glacial Lake
 * Evaluated by Learning Value Score: Frequency × Reusability × Richness × Difficulty
 * 4 Tiers: Word -> Collocation -> Chunk -> Transfer
 */
export const CASE_001_HIGH_VALUE_CHUNKS: Record<string, VocabularyTerm> = {
  "supraglacial lake": {
    term: "supraglacial lake",
    pronunciation: "/ˌsuːprəˈɡleɪʃəl leɪk/",
    pos: "noun phrase (glaciology)",
    meaning_en: "a body of liquid meltwater accumulating on the surface of a glacier or ice sheet",
    meaning_vi: "hồ nước băng tan trên mặt băng tầng",
    context_note: "Hồ G-4 chứa 8 triệu m³ nước băng tan trước khi bất ngờ thoát sạch trong 90 phút.",
    depth: "deep",
    collocation_pattern: "supraglacial lake + forms / expands / drains rapidly / discharges",
    why_it_matters: "Thuật ngữ chuyên ngành địa lý/khí hậu học chuẩn xác trong bài thi IELTS Reading Section 3 (khoa học môi trường), kết hợp tiền tố Latin 'supra-' (ở trên) + 'glacial' (thuộc về sông băng).",
    learning_value_score: { frequency: 4, reusability: 4, richness: 5, difficulty: 4, total: 88 },
    transfer_templates: [
      {
        scenario: "IELTS Academic Writing Task 2 / Biến đổi khí hậu",
        example: "The rapid drainage of supraglacial lakes lubricates the bedrock, thereby accelerating ice sheet movement into the ocean.",
        explanation_vi: "Sự tháo nước nhanh chóng của các hồ trên mặt băng làm bôi trơn lớp đá đáy, từ đó đẩy nhanh tốc độ trôi của dải băng ra đại dương.",
      },
    ],
    humanized: {
      simple_intuition: "Hồ nước tích tụ ngay phía trên bề mặt của tảng băng khổng lồ do băng tan.",
      in_context_story: "Hồ G-4 hình thành vào mùa hè khi ánh nắng làm tan băng mặt trên trạm Alpha-4.",
      retrieval_tip: "Khi đọc bài về hiện tượng tan băng ở hai cực → nhận diện ngay 'supraglacial lake'.",
    },
  },

  "rapid drop": {
    term: "rapid drop",
    pronunciation: "/ˈræpɪd drɒp/",
    pos: "collocation (adjective + noun)",
    meaning_en: "a sudden, dramatic decline or decrease in quantity, level, or metric within a very short timeframe",
    meaning_vi: "sự sụt giảm nhanh chóng / tụt giảm đột ngột",
    context_note: "Cảm biến sóng âm ghi nhận mực nước hồ sụt giảm đột ngột lúc 03:15 sáng.",
    depth: "standard",
    collocation_pattern: "record / experience / register + a rapid drop in + (temperature / pressure / water level / sales)",
    why_it_matters: "Cụm danh từ đắt giá cho IELTS Writing Task 1 (miêu tả biểu đồ xu hướng giảm dốc) và Task 2 khi nói về chỉ số kinh tế.",
    learning_value_score: { frequency: 5, reusability: 5, richness: 4, difficulty: 2, total: 91 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 1 / Miêu tả biểu đồ",
        example: "The chart illustrates a rapid drop in consumer spending following the imposition of new tariffs.",
        explanation_vi: "Biểu đồ minh họa sự sụt giảm nhanh chóng trong chi tiêu tiêu dùng sau khi áp thuế mới.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Thời tiết & Khí hậu",
        example: "High-altitude mountaineers must prepare for a rapid drop in temperature after sunset.",
        explanation_vi: "Các nhà leo núi độ cao lớn phải chuẩn bị sẵn sàng cho sự tụt giảm nhiệt độ đột ngột sau hoàng hôn.",
      },
    ],
    humanized: {
      simple_intuition: "Một sự giảm đi rất nhanh trong thời gian ngắn mà ai cũng nhận thấy rõ.",
      in_context_story: "Chỉ trong 90 phút, 8 triệu mét khối nước biến mất như thể có một nút xả khổng lồ bị giật ra.",
      retrieval_tip: "Dùng để miêu tả chỉ số giảm nhanh thay vì 'decreased quickly'.",
    },
  },

  "perimeter ice ridges": {
    term: "perimeter ice ridges",
    pronunciation: "/pəˈrɪmɪtər aɪs ˈrɪdʒɪz/",
    pos: "noun phrase",
    meaning_en: "elevated crests or barriers of ice surrounding the outer boundary of a glacial basin",
    meaning_vi: "các gờ băng xung quanh hồ / bờ thành băng viền ngoài",
    context_note: "Gờ băng bao quanh hồ G-4 vẫn nguyên vẹn, chứng minh nước không hề tràn qua bờ mặt đất.",
    depth: "standard",
    collocation_pattern: "perimeter + (ice ridges / boundary / fence / wall) + remain intact",
    why_it_matters: "Từ 'perimeter' (chu vi / đường viền ngoài) là academic vocabulary band 7.5+ dùng trong hình học, kỹ thuật và hiện trường quan sát.",
    learning_value_score: { frequency: 4, reusability: 4, richness: 4, difficulty: 3, total: 85 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / An ninh & Quy hoạch",
        example: "Securing the outer perimeter of protected wildlife reserves is vital to combat illegal poaching.",
        explanation_vi: "Bảo đảm vành đai ngoài của các khu bảo tồn thiên nhiên là yếu tố sống còn để chống nạn săn trộm trái phép.",
      },
    ],
    humanized: {
      simple_intuition: "Dãy thành viền cao quanh mép hồ giữ nước lại bên trong giống như miệng của một chiếc bát.",
      in_context_story: "Vì thành băng này không vỡ, đội điều tra biết chắc nước phải chảy đi qua một lối thoát hiểm ngầm dưới đáy.",
      retrieval_tip: "Khi muốn diễn tả đường viền ranh giới bao quanh một khu vực → dùng 'perimeter'.",
    },
  },

  "horizontal collapse": {
    term: "horizontal collapse",
    pronunciation: "/ˌhɒrɪˈzɒntəl kəˈlæps/",
    pos: "collocation (adjective + noun)",
    meaning_en: "lateral structural failure or sideways breakdown of retaining walls, slopes, or ice barriers",
    meaning_vi: "sự sụp đổ theo chiều ngang / vỡ vách ngăn phương ngang",
    context_note: "Không hề có dấu hiệu vỡ vách ngang nào quanh lòng hồ.",
    depth: "standard",
    collocation_pattern: "show no signs of + horizontal / vertical collapse",
    why_it_matters: "Sử dụng cặp tính từ không gian 'horizontal' (ngang) đối lập với 'vertical' (dọc) là tiêu chí phản biện tư duy logic trong lập luận khoa học.",
    learning_value_score: { frequency: 3, reusability: 4, richness: 4, difficulty: 3, total: 82 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Địa chất học & Kỹ thuật xây dựng",
        example: "Engineers reinforced the hillside embankments to prevent horizontal collapse during monsoon flash floods.",
        explanation_vi: "Các kỹ sư đã gia cố bờ kè sườn đồi để ngăn ngừa sự sụp lở ngang trong đợt lũ quét mùa mưa.",
      },
    ],
    humanized: {
      simple_intuition: "Sự đổ sập sang hai bên mép thành hoặc sườn dốc.",
      in_context_story: "Thành hồ không hề bị nứt ngang hay vỡ bờ sang hai bên.",
      retrieval_tip: "Phân biệt sụp phương ngang (horizontal) với nứt phương thẳng đứng (vertical).",
    },
  },

  "vertical fracture": {
    term: "vertical fracture",
    pronunciation: "/ˈvɜːtɪkəl ˈfræktʃər/",
    pos: "collocation (adjective + noun)",
    meaning_en: "a perpendicular, upright structural fissure or cleft splitting through solid rock or ice",
    meaning_vi: "vết nứt gãy thẳng đứng / khe nứt phương đứng xuyên thấu",
    context_note: "Ở giữa lòng hồ cạn, đội khảo sát phát hiện một vết nứt thẳng đứng rộng 1.2 mét xuyên thủng toàn bộ 850 mét băng.",
    depth: "deep",
    collocation_pattern: "develop / open / propagate + a vertical fracture",
    why_it_matters: "'Fracture' là từ chuyên ngành chính xác cao hơn 'crack', thường dùng trong vật lý địa chất, y khoa (gãy xương) và kiểm thử vật liệu.",
    learning_value_score: { frequency: 4, reusability: 4, richness: 5, difficulty: 3, total: 87 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Khoa học vật liệu & Kỹ thuật",
        example: "Seismic vibrations caused a vertical fracture in the concrete dam, prompting immediate evacuations.",
        explanation_vi: "Rung chấn địa chấn gây ra một vết nứt thẳng đứng trên đập bê tông, dẫn đến việc sơ tán khẩn cấp.",
      },
    ],
    humanized: {
      simple_intuition: "Một đường nứt xẻ dọc từ trên đỉnh xuyên thẳng tắp xuống tận đáy sâu.",
      in_context_story: "Khe nứt như một nhát dao rạch thẳng từ mặt băng xuống lớp đá nền cách đó gần 1 cây số.",
      retrieval_tip: "Dùng để miêu tả các vết rạn nứt nứt thẳng đứng sâu hút trong cấu trúc chịu lực.",
    },
  },

  "extends straight down": {
    term: "extends straight down",
    pronunciation: "/ɪkˈstɛndz streɪt daʊn/",
    pos: "verb phrase / directional idiom",
    meaning_en: "reaches perpendicularly downwards without deviation or obstruction through depth",
    meaning_vi: "kéo dài đâm thẳng xuống đáy sâu / xuyên suốt theo phương thẳng đứng",
    context_note: "Khe nứt đâm thẳng xuống xuyên suốt toàn bộ tầng băng dày 850 mét.",
    depth: "standard",
    collocation_pattern: "chasm / crevasse / shaft + extends straight down to + (the seabed / bedrock / depths)",
    why_it_matters: "Cấu trúc định vị không gian mô tả trực quan và sống động (vivid spatial description) trong văn phong học thuật.",
    learning_value_score: { frequency: 4, reusability: 5, richness: 4, difficulty: 2, total: 86 },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 2 / Miêu tả địa danh tự nhiên",
        example: "The limestone cavern extends straight down into an underground subterranean river system.",
        explanation_vi: "Hang động đá vôi đâm thẳng đứng xuống một hệ thống sông ngầm dưới lòng đất.",
      },
    ],
    humanized: {
      simple_intuition: "Chạy thẳng một mạch từ trên mặt đất xuống sâu thẳm không bị gấp khúc.",
      in_context_story: "Nước từ trên hồ không bị vướng mắc ở tầng nào mà lao thẳng xuống lòng đất đá.",
      retrieval_tip: "Khi miêu tả vực thẳm hay đường hầm lao thẳng xuống đáy.",
    },
  },

  "drained directly to the bedrock": {
    term: "drained directly to the bedrock",
    pronunciation: "/dreɪnd daɪˈrɛktli tuː ðə ˈbɛdrɒk/",
    pos: "verbal chunk",
    meaning_en: "discharged all liquid completely to the solid subsurface geological base rock below the glacier",
    meaning_vi: "thoát nước thẳng xuống lớp đá đáy nền địa chất",
    context_note: "Nước hồ không bốc hơi hay chảy tràn mà tháo thẳng xuống đáy đá nền dưới chân sông băng.",
    depth: "deep",
    collocation_pattern: "water / meltwater + drained directly to the bedrock",
    why_it_matters: "'Bedrock' là từ vựng đắt giá mang hai nghĩa: nghĩa đen là lớp đá gốc cứng dưới lòng đất; nghĩa bóng là nền tảng cốt lõi của một lý thuyết hay định chế.",
    learning_value_score: { frequency: 4, reusability: 5, richness: 5, difficulty: 3, total: 91 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Triết học & Xã hội (Nghĩa bóng)",
        example: "Trust in independent judicial institutions is the ultimate bedrock of a democratic society.",
        explanation_vi: "Niềm tin vào các thể chế tư pháp độc lập là nền tảng cốt lõi không thể lay chuyển của một xã hội dân chủ.",
      },
    ],
    humanized: {
      simple_intuition: "Thoát cạn kiệt xuống tận lớp đá tảng nằm sâu nhất dưới tầng băng vĩnh cửu.",
      in_context_story: "8 triệu khối nước làm đệm nước trơn trượt giữa lớp băng và lớp đá nền Trái Đất.",
      retrieval_tip: "Khi nói về lớp đá gốc nền hoặc nền tảng gốc rễ của một sự vật → dùng 'bedrock'.",
    },
  },

  "dome upward": {
    term: "dome upward",
    pronunciation: "/doʊm ˈʌpwəd/",
    pos: "verb phrase (geological motion)",
    meaning_en: "to curve or swell into a convex, rounded dome shape due to underlying vertical pressure",
    meaning_vi: "phồng cong lên thành hình vòm do áp lực đẩy từ bên dưới",
    context_note: "Radar vệ tinh xác nhận mặt hồ phồng cong lên 18cm do áp lực nước trồi lên từ phía dưới trước khi vỡ toang.",
    depth: "deep",
    collocation_pattern: "the surface / ground + began to dome upward by + [measurement]",
    why_it_matters: "Sử dụng danh từ 'dome' (mái vòm) dưới dạng ngoại động từ chỉ chuyển động hình thể học (morphological verbification).",
    learning_value_score: { frequency: 3, reusability: 4, richness: 5, difficulty: 4, total: 88 },
    transfer_templates: [
      {
        scenario: "IELTS Academic Writing Task 2 / Địa chất học & Núi lửa",
        example: "Prior to the volcanic eruption, the caldera floor domed upward significantly as magma gathered below.",
        explanation_vi: "Trước vụ phun trào núi lửa, đáy miệng núi đã phồng cong lên đáng kể do magma dồn ứ bên dưới.",
      },
    ],
    humanized: {
      simple_intuition: "Bị một lực cực mạnh từ dưới đội lên khiến bề mặt phẳng uốn cong vồng lên như chiếc bát úp.",
      in_context_story: "Mặt băng bị nước đội lên 18 phân trước khi áp lực vượt quá giới hạn làm toác vách băng.",
      retrieval_tip: "Khi miêu tả hiện tượng bề mặt bị đội phồng lên như vòm cầu.",
    },
  },

  "continuous drainage rate": {
    term: "continuous drainage rate",
    pronunciation: "/kənˈtɪnjuəs ˈdreɪnɪdʒ reɪt/",
    pos: "noun phrase",
    meaning_en: "the steady volumetric speed of liquid escaping or being cleared per unit of time",
    meaning_vi: "tốc độ thoát nước liên tục và không gián đoạn",
    context_note: "Tốc độ tháo nước liên tục đạt tới 1,500 mét khối trên một giây lúc 03:15 sáng.",
    depth: "standard",
    collocation_pattern: "maintain / reach + a continuous drainage rate of + [volume/time]",
    why_it_matters: "Cụm danh từ đo lường dòng chảy tiêu chuẩn trong thủy văn học (hydrology) và kỹ thuật môi trường.",
    learning_value_score: { frequency: 4, reusability: 4, richness: 4, difficulty: 3, total: 84 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Hạ tầng đô thị chống ngập",
        example: "Modern storm sewers require a massive continuous drainage rate to prevent catastrophic city flooding.",
        explanation_vi: "Cống thoát bão hiện đại đòi hỏi tốc độ thoát nước liên tục cực lớn để ngăn chặn ngập lụt thành phố thảm khốc.",
      },
    ],
    humanized: {
      simple_intuition: "Lượng nước xả ra đều đặn tính trên từng giây mà không hề bị ngắt quãng.",
      in_context_story: "1,500 m³/s tương đương với hàng trăm hồ bơi Olympic được tháo cạn trong chớp mắt.",
      retrieval_tip: "Dùng khi nói về lưu lượng xả chất lỏng hoặc thoát lũ trong quy hoạch.",
    },
  },

  "remained constant": {
    term: "remained constant",
    pronunciation: "/rɪˈmeɪnd ˈkɒnstənt/",
    pos: "collocation (linking verb + adjective)",
    meaning_en: "stayed completely unchanged, uniform, and steady despite external shifts",
    meaning_vi: "giữ nguyên không đổi / duy trì ở mức hằng định",
    context_note: "Nhiệt độ đá đáy vẫn duy trì ổn định ở mức -1.8°C, bác bỏ giả thuyết có núi lửa sưởi ấm từ dưới.",
    depth: "standard",
    collocation_pattern: "temperature / speed / proportion + remained constant at + [value]",
    why_it_matters: "Một trong những cụm miêu tả dữ liệu quan trọng nhất trong IELTS Writing Task 1 khi số liệu giữ đường thẳng nằm ngang.",
    learning_value_score: { frequency: 5, reusability: 5, richness: 4, difficulty: 2, total: 93 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 1 / Miêu tả biểu đồ",
        example: "While fossil fuel consumption fluctuated wildly, hydropower usage remained constant throughout the decade.",
        explanation_vi: "Trong khi việc tiêu thụ nhiên liệu hóa thạch dao động mạnh, mức sử dụng thủy điện vẫn giữ nguyên ổn định trong suốt thập kỷ.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Cuộc sống cá nhân",
        example: "Amid all life's turbulent changes, my parents' unwavering encouragement remained constant.",
        explanation_vi: "Giữa mọi biến động thăng trầm của cuộc đời, sự động viên kiên định của cha mẹ tôi vẫn không hề thay đổi.",
      },
    ],
    humanized: {
      simple_intuition: "Giữ nguyên một trạng thái không suy suyển dù mọi thứ xung quanh biến động.",
      in_context_story: "Nhiệt độ âm 1.8 độ C không nhúc nhích chứng minh đáy băng lạnh ngắt chứ không hề có nguồn nhiệt ngầm.",
      retrieval_tip: "Dùng để miêu tả chỉ số giữ nguyên hằng số thay vì 'did not change'.",
    },
  },
};
