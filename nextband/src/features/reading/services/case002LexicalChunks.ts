import { VocabularyTerm } from "../types";

/**
 * 32 High-Value Lexical Learning Objects for Case #02 (Warren Buffett & Fast Company)
 * Evaluated by Learning Value Score: Frequency × Reusability × Richness × Difficulty
 * 4 Tiers: Word -> Collocation -> Chunk -> Transfer
 */
export const CASE_002_HIGH_VALUE_CHUNKS: Record<string, VocabularyTerm> = {
  "age remarkably well": {
    term: "age remarkably well",
    pronunciation: "/eɪdʒ rɪˈmɑːkəbli wɛl/",
    pos: "verb phrase / idiom",
    meaning_en: "to maintain validity, relevance, quality or intellectual value over time without becoming obsolete",
    meaning_vi: "vẫn giữ nguyên giá trị đáng kinh ngạc theo thời gian / không hề lỗi thời",
    context_note: "Warren Buffett dành nhiều thập kỷ đưa ra những lời khuyên tuy giản dị nhưng không hề bị thời gian làm mai một.",
    depth: "deep",
    collocation_pattern: "something (advice/design/wisdom/insight) + age + remarkably / exceptionally / well",
    why_it_matters: "Thay vì dùng cụm từ chung chung 'remain good for a long time', người bản xứ dùng động từ 'age' kết hợp phó từ để khen ngợi những giá trị càng qua thời gian càng được chứng minh là đúng đắn.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 4,
      total: 95,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Trí tuệ & Văn hóa",
        example: "Classic literature tends to age remarkably well because it deals with invariant human emotions.",
        explanation_vi: "Văn học kinh điển không hề lỗi thời vì nó bàn về những cảm xúc bất biến của con người.",
      },
      {
        scenario: "IELTS Writing Task 2 / Công nghệ & Thiết kế",
        example: "Simple, minimalist architectural designs often age remarkably well compared to fleeting trendy styles.",
        explanation_vi: "Các thiết kế tối giản thường trường tồn với thời gian hơn là các trào lưu ngắn hạn.",
      },
      {
        scenario: "Công việc / Đầu tư & Chiến lược",
        example: "His advice to focus on cash flow rather than hype has aged remarkably well during market downturns.",
        explanation_vi: "Lời khuyên tập trung vào dòng tiền thay vì thổi phồng giá trị đã chứng minh tính đúng đắn qua thời gian.",
      },
    ],
    humanized: {
      simple_intuition: "Một thứ gì đó không bị mai một hay cũ kỹ, mà càng qua năm tháng người ta càng thấy nó sâu sắc và chính xác.",
      in_context_story: "Lời khuyên của Buffett từ những năm 1950 tới tận kỷ nguyên AI hôm nay vẫn còn nguyên giá trị thực tế.",
      nuance_warning: "Đừng dịch 'age' thô là 'già đi'. Với ý niệm về tư duy, phong cách hoặc tác phẩm, 'age well' mang nghĩa tích cực là trường tồn và không lỗi thời.",
      retrieval_tip: "Khi muốn khen một quan điểm, cuốn sách hoặc thiết kế vẫn tuyệt vời sau hàng chục năm → dùng 'age remarkably well'.",
    },
  },

  "dispensing simple advice": {
    term: "dispensing simple advice",
    pronunciation: "/dɪˈspɛnsɪŋ ˈsɪmpəl ədˈvaɪs/",
    pos: "verb phrase",
    meaning_en: "distributing straightforward, practical wisdom from a position of authority and mastery",
    meaning_vi: "đúc kết và chia sẻ những lời khuyên giản dị nhưng thông thái",
    context_note: "Buffett có thói quen chia sẻ những lời khuyên giản dị từ kho kinh nghiệm phong phú của một bậc thầy.",
    depth: "deep",
    collocation_pattern: "dispense + (simple / sage / practical / sound) + advice",
    why_it_matters: "Từ 'dispense' thể hiện vị thế của một người có thâm niên, uy tín hoặc nguồn lực dồi dào, chủ động chia sẻ tri thức cho người khác thay vì dùng 'give advice' bình dân.",
    learning_value_score: {
      frequency: 4,
      reusability: 4,
      richness: 5,
      difficulty: 4,
      total: 88,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 2 / Mô tả người bạn ngưỡng mộ",
        example: "My grandfather has a knack for dispensing simple advice whenever I face a major dilemma.",
        explanation_vi: "Ông tôi có tài đúc kết những lời khuyên giản dị mỗi khi tôi đứng trước tình thế khó xử.",
      },
      {
        scenario: "IELTS Writing Task 2 / Giáo dục & Cố vấn",
        example: "Effective mentors focus on dispensing practical advice rather than overwhelming novices with theories.",
        explanation_vi: "Người hướng dẫn hiệu quả tập trung trao đi lời khuyên thực chiến hơn là dồn ép lý thuyết.",
      },
    ],
    humanized: {
      simple_intuition: "Chia sẻ những lời khuyên chắt lọc từ sự từng trải, biến những điều phức tạp thành điều dễ hiểu.",
      in_context_story: "Buffett không nói lý thuyết giáo điều mà đúc kết thành các nguyên tắc cốt lõi ai cũng làm theo được.",
      retrieval_tip: "Khi nói về các chuyên gia hay tiền bối chia sẻ kinh nghiệm quý báu → dùng 'dispense advice'.",
    },
  },

  "competitive advantage": {
    term: "competitive advantage",
    pronunciation: "/kəmˈpɛtətɪv ədˈvɑːntɪdʒ/",
    pos: "noun phrase",
    meaning_en: "a condition or capability that puts a person or company in a favorable or superior commercial position",
    meaning_vi: "lợi thế cạnh tranh vượt trội / điểm mạnh độc tôn",
    context_note: "Trong kỷ nguyên AI làm thay mọi việc kỹ thuật, năng lực giao tiếp như một con người thực thụ trở thành lợi thế cạnh tranh sống còn.",
    depth: "deep",
    collocation_pattern: "gain / maintain / build / become a + (genuine / sustainable / decisive) + competitive advantage",
    why_it_matters: "Đây là thuật ngữ nền tảng của kinh tế học doanh nghiệp và sự nghiệp. Dùng được cụm này sẽ nâng band Lexical Resource trong Writing Task 2 ngay lập tức.",
    learning_value_score: {
      frequency: 5,
      reusability: 5,
      richness: 4,
      difficulty: 3,
      total: 92,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Thị trường lao động & Toàn cầu hóa",
        example: "Fluency in multiple languages provides job seekers with a decisive competitive advantage.",
        explanation_vi: "Thành thạo nhiều ngôn ngữ mang lại cho ứng viên một lợi thế cạnh tranh mang tính quyết định.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Doanh nghiệp & Công nghệ",
        example: "High emotional intelligence offers human workers a sustainable competitive advantage over automation.",
        explanation_vi: "Trí tuệ cảm xúc cao mang lại lợi thế cạnh tranh bền vững trước làn sóng tự động hóa.",
      },
    ],
    humanized: {
      simple_intuition: "Một vũ khí hoặc điểm độc đáo giúp bạn nổi trội hơn hẳn đối thủ cạnh tranh trên thị trường.",
      in_context_story: "AI có thể viết nhanh hơn bạn, nhưng sự chân thành và thấu cảm giữa người với người mới là thứ AI không sao chép được.",
      retrieval_tip: "Khi nói về điểm mạnh giúp cá nhân hay công ty chiến thắng → dùng 'competitive advantage'.",
    },
  },

  "force multiplier": {
    term: "force multiplier",
    pronunciation: "/fɔːs ˈmʌltɪplaɪər/",
    pos: "noun phrase",
    meaning_en: "a factor or capability that dramatically increases the effectiveness of an entire system or effort",
    meaning_vi: "đòn bẩy nhân đôi sức mạnh / yếu tố khuếch đại hiệu quả",
    context_note: "Giao tiếp không còn là kỹ năng mềm thông thường mà là 'force multiplier' giúp tăng vọt sức mạnh của mọi kỹ năng khác.",
    depth: "deep",
    collocation_pattern: "act as / serve as / become a + force multiplier for something",
    why_it_matters: "Thuật ngữ quân sự và quản trị cấp cao. Dùng để chỉ một kỹ năng không đứng độc lập mà có tác dụng nhân giá trị của tất cả kỹ năng nền tảng khác lên gấp 5-10 lần.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 4,
      total: 94,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Giáo dục & Kỹ năng số",
        example: "Digital literacy acts as a force multiplier for modern researchers, accelerating discoveries.",
        explanation_vi: "Năng lực kỹ thuật số đóng vai trò là đòn bẩy nhân đôi năng suất cho các nhà nghiên cứu hiện đại.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Lãnh đạo & Tổ chức",
        example: "Clear communication is a true force multiplier because it aligns the entire team instantly.",
        explanation_vi: "Giao tiếp rành mạch là đòn bẩy thực sự vì nó đồng bộ hóa toàn bộ đội ngũ ngay lập tức.",
      },
    ],
    humanized: {
      simple_intuition: "Một chất xúc tác khiến một công cụ hoặc nỗ lực bình thường tạo ra kết quả gấp hàng chục lần.",
      in_context_story: "Nếu bạn có kiến thức chuyên môn 10 điểm nhưng giao tiếp kém thì chỉ đạt 2 điểm kết quả; giao tiếp giỏi sẽ nhân 10 điểm đó lên gấp bội.",
      retrieval_tip: "Khi một yếu tố làm tăng vọt sức mạnh của toàn bộ công việc → dùng 'force multiplier'.",
    },
  },

  "magnified": {
    term: "magnified",
    pronunciation: "/ˈmæɡnɪfaɪd/",
    pos: "verb (past participle)",
    meaning_en: "dramatically amplified, enlarged in scale, impact, or visibility",
    meaning_vi: "được nhân lên gấp bội / được khuếch đại mạnh mẽ",
    context_note: "Buffett nói: Thành quả cuộc đời bạn sẽ được nhân lên gấp bội nếu bạn biết truyền đạt chúng tốt hơn.",
    depth: "deep",
    collocation_pattern: "results / impact / influence + be magnified by something",
    why_it_matters: "Khác với 'increased' chung chung, 'magnified' mang hình ảnh của chiếc thấu kính hội tụ ánh sáng, làm những nỗ lực hiện hữu bừng sáng và vươn xa.",
    learning_value_score: {
      frequency: 4,
      reusability: 4,
      richness: 5,
      difficulty: 3,
      total: 89,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Kinh tế & Đô thị hóa",
        example: "The positive effects of public transit investments are magnified when paired with green urban planning.",
        explanation_vi: "Hiệu quả của việc đầu tư giao thông công cộng được nhân lên gấp bội khi kết hợp quy hoạch đô thị xanh.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Phát triển cá nhân",
        example: "Your technical skills are easily magnified once you master the art of public storytelling.",
        explanation_vi: "Kỹ năng chuyên môn của bạn dễ dàng được nhân rộng sức ảnh hưởng khi bạn làm chủ kỹ năng thuyết trình.",
      },
    ],
    humanized: {
      simple_intuition: "Phóng to hoặc nhân lên quy mô và tầm ảnh hưởng của một thứ vốn có sẵn.",
      in_context_story: "Mọi thành tựu trong học tập và công việc đều cần khả năng diễn đạt để người đời nhìn thấy và tin theo.",
      retrieval_tip: "Khi nói về việc khuếch đại tầm ảnh hưởng hoặc thành quả → dùng 'magnify/magnified'.",
    },
  },

  "compounds over time": {
    term: "compounds over time",
    pronunciation: "/ˈkɒmpaʊndz ˈoʊvər taɪm/",
    pos: "verb phrase",
    meaning_en: "accumulates exponentially, where each gain builds upon previous gains like compound interest",
    meaning_vi: "tích lũy theo nguyên lý lãi kép theo thời gian / sinh lời lũy tiến",
    context_note: "Mỗi cuộc trò chuyện, bài thuyết trình hàng ngày là một hạt mầm sinh lãi kép giúp xây dựng tầm ảnh hưởng lâu dài.",
    depth: "deep",
    collocation_pattern: "knowledge / reputation / advantage + compounds over time",
    why_it_matters: "Chuyển giao từ thuật ngữ tài chính 'compound interest' sang phát triển bản thân. Một collocation cực kỳ học thuật và thuyết phục trong IELTS Task 2.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 4,
      total: 96,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Thói quen học tập & Giáo dục",
        example: "Reading daily creates foundational knowledge that compounds over time into deep expertise.",
        explanation_vi: "Đọc sách hàng ngày tạo nền tảng tri thức tích lũy theo nguyên lý lãi kép thành chuyên môn sâu.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Sự nghiệp & Danh tiếng",
        example: "Professional credibility isn't built overnight; it compounds over time through consistent delivery.",
        explanation_vi: "Uy tín nghề nghiệp không đến sau một đêm; nó sinh lời lũy tiến theo thời gian qua sự kiên định.",
      },
    ],
    humanized: {
      simple_intuition: "Những tiến bộ nhỏ hàng ngày cộng dồn và tự nhân đôi theo thời gian tạo thành bước nhảy vọt khổng lồ.",
      in_context_story: "Buffett là vua lãi kép về tiền bạc, và ông áp dụng đúng nguyên lý đó vào việc rèn giũa kỹ năng giao tiếp hàng ngày.",
      retrieval_tip: "Khi mô tả sự tiến bộ bền bỉ sinh ra kết quả vĩ đại → dùng 'compounds over time'.",
    },
  },

  "earn trust": {
    term: "earn trust",
    pronunciation: "/ɜːn trʌst/",
    pos: "collocation (verb + noun)",
    meaning_en: "to gradually gain another person's confidence and reliability through demonstrable actions",
    meaning_vi: "gây dựng niềm tin / chiếm trọn sự tin cậy",
    context_note: "AI có thể viết mã và vẽ biểu đồ, nhưng không thể gây dựng niềm tin từ con người.",
    depth: "deep",
    collocation_pattern: "earn + (someone's) + trust / confidence / respect",
    why_it_matters: "Người học hay nói 'get trust' hoặc 'have trust' (sai collocation). 'Earn trust' nhấn mạnh niềm tin là thứ phải lao động, giữ chữ tín và cống hiến mới đạt được.",
    learning_value_score: {
      frequency: 5,
      reusability: 5,
      richness: 4,
      difficulty: 2,
      total: 90,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Lãnh đạo",
        example: "A leader cannot demand loyalty; they have to earn trust through consistent integrity.",
        explanation_vi: "Một nhà lãnh đạo không thể đòi hỏi lòng trung thành; họ phải tự mình gây dựng niềm tin qua sự chính trực.",
      },
      {
        scenario: "IELTS Writing Task 2 / Thương mại điện tử",
        example: "Online brands must earn trust by guaranteeing data privacy and transparent return policies.",
        explanation_vi: "Các thương hiệu trực tuyến phải gây dựng niềm tin bằng việc bảo mật dữ liệu và minh bạch chính sách hoàn trả.",
      },
    ],
    humanized: {
      simple_intuition: "Tạo được sự tin tưởng từ người khác bằng chính sự kiên định và hành động có trách nhiệm của mình.",
      in_context_story: "Máy móc có thể làm ra câu từ hoàn hảo nhưng chỉ có con người mới chứng minh được sự đáng tin cậy.",
      retrieval_tip: "Khi nói về việc làm cho người khác tin tưởng mình → dùng 'earn trust', không dùng 'get trust'.",
    },
  },

  "inspire commitment": {
    term: "inspire commitment",
    pronunciation: "/ɪnˈspaɪər kəˈmɪtmənt/",
    pos: "collocation (verb + noun)",
    meaning_en: "to motivate others to dedicate themselves wholeheartedly to a common mission",
    meaning_vi: "thổi bùng lòng cam kết / truyền cảm hứng cống hiến",
    context_note: "Điều mà máy móc không bao giờ làm được là truyền cảm hứng cống hiến nơi nhân viên và cộng sự.",
    depth: "deep",
    collocation_pattern: "inspire + commitment / loyalty / dedication in someone",
    why_it_matters: "Một cụm collocation cao cấp trong chủ đề Leadership & Human Resources thay cho 'make people work hard'.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 4,
      difficulty: 3,
      total: 91,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Quản trị & Nơi làm việc",
        example: "Charismatic leaders inspire commitment rather than enforcing compliance through punitive measures.",
        explanation_vi: "Lãnh đạo truyền cảm hứng khơi gợi lòng cam kết cống hiến thay vì ép buộc phục tùng bằng hình phạt.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Giáo dục",
        example: "Passionate teachers inspire deep commitment to lifelong learning in their pupils.",
        explanation_vi: "Những người thầy tâm huyết thổi bùng sự dấn thân học tập suốt đời nơi học trò.",
      },
    ],
    humanized: {
      simple_intuition: "Thúc đẩy người khác tự nguyện gắn bó và dốc hết tâm sức cho mục tiêu chung.",
      in_context_story: "AI có thể giao việc, nhưng chỉ con người mới có thể chạm đến trái tim để người khác dốc lòng đi theo.",
      retrieval_tip: "Khi nói về nghệ thuật truyền cảm hứng để tập thể gắn bó và dấn thân → dùng 'inspire commitment'.",
    },
  },

  "navigate conflict": {
    term: "navigate conflict",
    pronunciation: "/ˈnævɪɡeɪt ˈkɒnflɪkt/",
    pos: "collocation (verb + noun)",
    meaning_en: "to steer constructively through difficult interpersonal disagreements and tensions",
    meaning_vi: "lèo lái và hóa giải xung đột / xử lý bất đồng khéo léo",
    context_note: "Kỹ năng làm dịu và chuyển hóa mâu thuẫn là năng lực con người độc nhất mà AI không sở hữu.",
    depth: "deep",
    collocation_pattern: "navigate + conflict / difficult conversations / turbulent times",
    why_it_matters: "Dùng ẩn dụ 'navigate' (lèo lái con thuyền qua sóng gió) để chỉ năng lực giải quyết tranh chấp một cách bình tĩnh, chiến lược.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 3,
      total: 93,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Giao tiếp công sở",
        example: "Mature managers know how to navigate conflict without damaging team morale.",
        explanation_vi: "Người quản lý trưởng thành biết cách hóa giải xung đột mà không làm tổn hại tinh thần đồng đội.",
      },
      {
        scenario: "IELTS Writing Task 2 / Quan hệ quốc tế & Xã hội",
        example: "Diplomats must navigate ideological conflicts through continuous and patient dialogue.",
        explanation_vi: "Các nhà ngoại giao phải lèo lái các xung đột ý thức hệ thông qua đối thoại bền bỉ và kiên nhẫn.",
      },
    ],
    humanized: {
      simple_intuition: "Dẫn dắt các bên vượt qua bất đồng căng thẳng để tìm thấy tiếng nói chung hòa hợp.",
      in_context_story: "Khi xảy ra tranh cãi, AI không có xúc giác xã hội để xoa dịu cảm xúc tự ái của con người.",
      retrieval_tip: "Khi nói về việc xử lý mâu thuẫn một cách khôn ngoan → dùng 'navigate conflict'.",
    },
  },

  "make another human feel understood": {
    term: "make another human feel understood",
    pronunciation: "/meɪk əˈnʌðər ˈhjuːmən fiːl ˌʌndərˈstʊd/",
    pos: "chunk / verbal pattern",
    meaning_en: "to connect deeply with another person so they perceive their perspective and emotion are truly recognized",
    meaning_vi: "khiến một người cảm nhận rằng mình thực sự được thấu hiểu",
    context_note: "Trọng tâm của giao tiếp người với người là khả năng làm đối phương cảm thấy tiếng lòng của họ được lắng nghe.",
    depth: "deep",
    collocation_pattern: "make someone feel + understood / valued / heard",
    why_it_matters: "Đây là mẫu câu chuyển giao tâm lý học giao tiếp đỉnh cao. Nó biến một hành vi kỹ thuật thành trải nghiệm cảm xúc sâu sắc.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 3,
      total: 95,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Quan hệ bạn bè & Gia đình",
        example: "A true friend is someone who can make you feel understood without needing endless explanations.",
        explanation_vi: "Một người bạn chân chính là người có thể khiến bạn cảm thấy được thấu cảm mà không cần giải thích dài dòng.",
      },
      {
        scenario: "IELTS Writing Task 2 / Dịch vụ khách hàng & Y tế",
        example: "Doctors who make patients feel understood consistently achieve better recovery outcomes.",
        explanation_vi: "Những bác sĩ khiến bệnh nhân cảm thấy được lắng nghe và thấu hiểu luôn đạt kết quả hồi phục tốt hơn.",
      },
    ],
    humanized: {
      simple_intuition: "Tạo cho người đối diện cảm giác an tâm rằng suy nghĩ và cảm xúc của họ đã chạm tới mình.",
      in_context_story: "Con người không chỉ cần thông tin chính xác từ máy móc; họ khao khát được công nhận cảm xúc.",
      retrieval_tip: "Khi muốn diễn tả đỉnh cao của sự thấu cảm trong giao tiếp → dùng 'make someone feel understood'.",
    },
  },

  "translate complexity into clarity": {
    term: "translate complexity into clarity",
    pronunciation: "/trænzˈleɪt kəmˈplɛksɪti ˈɪntuː ˈklærɪti/",
    pos: "chunk / verbal pattern",
    meaning_en: "to distill intricate, convoluted ideas into clear, digestible, and actionable explanations",
    meaning_vi: "biến điều phức tạp thành sự sáng tỏ / đơn giản hóa vấn đề rối rắm",
    context_note: "Những nhà lãnh đạo tỏa sáng thập kỷ tới là người biết diễn giải những vấn đề nan giải thành định hướng rõ ràng.",
    depth: "deep",
    collocation_pattern: "translate + complexity / technical jargon + into + clarity / actionable insights",
    why_it_matters: "Mẫu câu đối lập 'complexity into clarity' là một trong những rhetorical device (biện pháp tu từ) đắt giá nhất trong văn viết học thuật và diễn thuyết.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 4,
      total: 97,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Giáo dục & Khoa học",
        example: "Great educators possess the rare gift to translate scientific complexity into clarity for young students.",
        explanation_vi: "Những nhà giáo vĩ đại sở hữu năng lực hiếm có là biến sự phức tạp khoa học thành bài học sáng tỏ cho học sinh.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Kỹ năng làm việc",
        example: "In business meetings, the most respected analysts are those who translate data complexity into strategic clarity.",
        explanation_vi: "Trong các buổi họp, chuyên viên được nể trọng nhất là người biến mớ số liệu rối rắm thành định hướng sáng tỏ.",
      },
    ],
    humanized: {
      simple_intuition: "Khả năng lọc sạch những thuật ngữ rườm rà để truyền tải thông điệp cốt lõi một cách mạch lạc.",
      in_context_story: "AI có thể tạo ra văn bản phức tạp, nhưng biến cái phức tạp thành điều ai cũng hiểu mới là tài năng của lãnh đạo.",
      retrieval_tip: "Khi ca ngợi khả năng giải thích sáng tỏ vấn đề hóc búa → dùng 'translate complexity into clarity'.",
    },
  },

  "rally people around a vision": {
    term: "rally people around a vision",
    pronunciation: "/ˈræli ˈpiːpəl əˈraʊnd ə ˈvɪʒən/",
    pos: "chunk / verbal pattern",
    meaning_en: "to unite, motivate, and align individuals toward a compelling shared aspirational goal",
    meaning_vi: "kết nối và quy tụ mọi người xung quanh một tầm nhìn chung",
    context_note: "Lãnh đạo không chỉ phân tích mà phải biết truyền cảm hứng để tập thể chung tay thực hiện tầm nhìn lớn.",
    depth: "deep",
    collocation_pattern: "rally + (people / community / team) + around + a (shared) vision / cause",
    why_it_matters: "Động từ 'rally' mang tinh thần hiệu triệu, gợi hình ảnh tập hợp sức mạnh đồng lòng, sắc sảo hơn rất nhiều so with 'gather people'.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 4,
      difficulty: 3,
      total: 92,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Bảo vệ môi trường",
        example: "Governments must rally citizens around a sustainable vision to tackle plastic pollution effectively.",
        explanation_vi: "Chính phủ cần quy tụ người dân quanh tầm nhìn phát triển bền vững để xử lý ô nhiễm rác thải nhựa.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Khởi nghiệp",
        example: "A founder's primary job is to rally talented engineers around an inspiring product vision.",
        explanation_vi: "Nhiệm vụ hàng đầu của nhà sáng lập là tập hợp những kỹ sư tài năng quanh một tầm nhìn sản phẩm truyền cảm hứng.",
      },
    ],
    humanized: {
      simple_intuition: "Tập hợp và truyền ngọn lửa nhiệt huyết để tất cả mọi người cùng hướng về một đích đến.",
      in_context_story: "Các công ty vĩ đại thành công vì người đứng đầu biết gắn kết mọi người thành một khối thống nhất.",
      retrieval_tip: "Khi nói về việc kêu gọi và gắn kết tập thể vì một lý tưởng cao đẹp → dùng 'rally people around a vision'.",
    },
  },

  "strategic business skill": {
    term: "strategic business skill",
    pronunciation: "/strəˈtiːdʒɪk ˈbɪznɪs skɪl/",
    pos: "noun phrase",
    meaning_en: "a vital, high-level competency directly determining organizational survival, advantage, and revenue",
    meaning_vi: "kỹ năng kinh doanh mang tính chiến lược sống còn",
    context_note: "Giao tiếp đã chuyển hóa từ một 'kỹ năng mềm' thành 'kỹ năng chiến lược' định đoạt thành bại của doanh nghiệp.",
    depth: "standard",
    collocation_pattern: "evolve into a + strategic business skill",
    why_it_matters: "Giúp người học nâng tầm nhận thức: xóa bỏ định kiến xem giao tiếp là thứ phụ trợ, nâng lên thành trụ cột chiến lược.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 4,
      difficulty: 3,
      total: 89,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Tuyển dụng & Đào tạo",
        example: "Critical thinking is no longer an academic exercise; it has evolved into a strategic business skill.",
        explanation_vi: "Tư duy phản biện không còn là bài tập học thuật; nó đã tiến hóa thành một kỹ năng kinh doanh chiến lược.",
      },
    ],
    humanized: {
      simple_intuition: "Một kỹ năng trọng yếu quyết định sự thành bại và sức cạnh tranh của cả một tổ chức.",
      in_context_story: "Buffett xem khả năng thuyết phục là đòn bẩy quyết định giá trị vốn hóa của một con người hay công ty.",
      retrieval_tip: "Dùng để nhấn mạnh tầm quan trọng cốt lõi của một năng lực trong môi trường chuyên nghiệp.",
    },
  },

  "derail communication": {
    term: "derail communication",
    pronunciation: "/dɪˈreɪl kəˌmjuːnɪˈkeɪʃən/",
    pos: "collocation (verb + noun)",
    meaning_en: "to disrupt, obstruct, or completely throw a constructive conversation off course",
    meaning_vi: "làm gián đoạn / khiến giao tiếp chệch hướng hoàn toàn",
    context_note: "Cách nhanh nhất làm đổ vỡ giao tiếp là tự suy diễn rằng mình đã biết tỏng đối phương đang nghĩ gì.",
    depth: "deep",
    collocation_pattern: "derail + communication / negotiations / a process / reform",
    why_it_matters: "Ẩn dụ đoàn tàu trật đường ray ('derail') diễn tả việc một cuộc trò chuyện tốt đẹp bị phá vỡ đột ngột bởi những định kiến hoặc sự nóng vội.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 4,
      total: 94,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Tranh luận & Đàm phán",
        example: "Allowing personal egos into the meeting room will quickly derail constructive communication.",
        explanation_vi: "Để cái tôi cá nhân len lỏi vào phòng họp sẽ nhanh chóng khiến giao tiếp mang tính xây dựng bị chệch hướng.",
      },
      {
        scenario: "IELTS Writing Task 2 / Hợp tác đa phương",
        example: "Deep-seated prejudices frequently derail peace negotiations between conflicting nations.",
        explanation_vi: "Những định kiến thâm căn cố đế thường xuyên làm chệch hướng các cuộc đàm phán hòa bình giữa các quốc gia.",
      },
    ],
    humanized: {
      simple_intuition: "Làm một tiến trình đang êm đẹp bị trật bánh và sụp đổ giữa chừng.",
      in_context_story: "Khi ta áp đặt suy nghĩ của mình lên người khác, cây cầu đối thoại lập tức bị gãy đổ.",
      retrieval_tip: "Khi một cuộc đàm phán hay giao tiếp bị phá hỏng giữa chừng → dùng 'derail communication'.",
    },
  },

  "replace assumptions with curiosity": {
    term: "replace assumptions with curiosity",
    pronunciation: "/rɪˈpleɪs əˈsʌmpʃənz wɪð ˌkjʊəriˈɒsɪti/",
    pos: "chunk / behavioral mindset",
    meaning_en: "to intentionally substitute preconceived beliefs about others with genuine inquiry and open-minded questions",
    meaning_vi: "thay thế định kiến chủ quan bằng sự tò mò học hỏi chân thành",
    context_note: "Thói quen vàng của các bậc thầy giao tiếp: Thay vì phán xét, hãy bắt đầu bằng câu hỏi.",
    depth: "deep",
    collocation_pattern: "replace + assumptions / bias + with + genuine curiosity",
    why_it_matters: "Đây là châm ngôn tư duy (mental model) kinh điển trong lãnh đạo hiện đại. Cấu trúc 'Replace A with B' là một pattern viết văn rất thuyết phục.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 3,
      total: 93,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Kỹ năng sống & Giao tiếp",
        example: "When dealing with cultural differences, it is best to replace assumptions with genuine curiosity.",
        explanation_vi: "Khi đối diện với những khác biệt văn hóa, tốt nhất là thay thế định kiến bằng sự tò mò tìm hiểu chân thành.",
      },
      {
        scenario: "IELTS Writing Task 2 / Phương pháp nghiên cứu khoa học",
        example: "Scientists advance knowledge only when they replace rigid assumptions with empirical curiosity.",
        explanation_vi: "Các nhà khoa học chỉ mở rộng tri thức khi thay thế những giáo điều cứng nhắc bằng sự tò mò thực nghiệm.",
      },
    ],
    humanized: {
      simple_intuition: "Bỏ qua thói quen võ đoán để lắng nghe và đặt câu hỏi mở với tâm thế học hỏi.",
      in_context_story: "Thay vì nghĩ 'hắn cố tình phá mình', hãy hỏi 'điều gì khiến bạn đưa ra quyết định đó?'.",
      retrieval_tip: "Khi khuyên người khác đừng vội phán xét mà hãy mở lòng tìm hiểu → dùng 'replace assumptions with curiosity'.",
    },
  },

  "defending your position": {
    term: "defending your position",
    pronunciation: "/dɪˈfɛndɪŋ jɔː pəˈzɪʃən/",
    pos: "phrase / verbal pattern",
    meaning_en: "stubbornly guarding or justifying one's personal viewpoint against counterarguments",
    meaning_vi: "mải mê bảo vệ quan điểm / cố thủ trong lập trường của mình",
    context_note: "Thay vì khư khư bảo vệ lập trường của mình, hãy nỗ lực thấu hiểu góc nhìn của người khác trước.",
    depth: "standard",
    collocation_pattern: "instead of defending your position + seek to understand",
    why_it_matters: "Diễn tả tâm lý phòng thủ tự nhiên của con người khi tranh cãi. Rất hữu ích khi viết luận bàn về đối thoại và giải quyết bất đồng.",
    learning_value_score: {
      frequency: 4,
      reusability: 4,
      richness: 4,
      difficulty: 3,
      total: 86,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Kỹ năng tranh luận",
        example: "Instead of stubbornly defending your position, consider whether your opponent raised a valid point.",
        explanation_vi: "Thay vì khăng khăng bảo vệ lập trường của mình, hãy cân nhắc xem đối phương có luận điểm xác đáng nào không.",
      },
    ],
    humanized: {
      simple_intuition: "Tâm lý dựng hàng rào che chở cho ý kiến cá nhân dù nó có thể chưa thấu đáo.",
      in_context_story: "Người giao tiếp giỏi không biến cuộc trò chuyện thành chiến hào tự vệ.",
      retrieval_tip: "Dùng để chỉ hành động khăng khăng bênh vực lập trường của mình trong thảo luận.",
    },
  },

  "make feedback an everyday conversation": {
    term: "make feedback an everyday conversation",
    pronunciation: "/meɪk ˈfiːdbæk ən ˈɛvrideɪ ˌkɒnvəˈseɪʃən/",
    pos: "chunk / leadership principle",
    meaning_en: "to normalize continuous, timely guidance rather than postponing discussions to bureaucratic annual reviews",
    meaning_vi: "biến việc góp ý thành cuộc trò chuyện thường nhật tự nhiên",
    context_note: "Những lãnh đạo xuất sắc nhất không để dành góp ý đến kỳ đánh giá cuối năm mà biến nó thành đối thoại hàng ngày.",
    depth: "deep",
    collocation_pattern: "make + (feedback / reflection / learning) + an everyday conversation",
    why_it_matters: "Một khẩu hiệu quản trị nhân sự hiện đại (continuous performance management) thay thế thói quen quan liêu.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 4,
      difficulty: 3,
      total: 90,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Văn hóa doanh nghiệp",
        example: "Progressive workplaces thrive when managers make constructive feedback an everyday conversation.",
        explanation_vi: "Môi trường làm việc tiến bộ phát triển mạnh mẽ khi quản lý biến phản hồi mang tính xây dựng thành đối thoại thường nhật.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Nuôi dạy con & Giáo dục",
        example: "Parents should make open feedback an everyday conversation rather than waiting for report cards.",
        explanation_vi: "Cha mẹ nên biến những lời chia sẻ cởi mở thành chuyện trò hàng ngày thay vì chờ bảng điểm cuối kỳ.",
      },
    ],
    humanized: {
      simple_intuition: "Chia sẻ thẳng thắn, nhẹ nhàng mỗi ngày để cùng tiến bộ, không để dồn nén đến cuối năm.",
      in_context_story: "Góp ý liên tục với tâm thế muốn đồng đội thành công sẽ xua tan nỗi sợ hãi kiểm điểm.",
      retrieval_tip: "Khi nói về việc bình thường hóa việc trao đổi thẳng thắn hàng ngày → dùng cụm này.",
    },
  },

  "annual performance reviews": {
    term: "annual performance reviews",
    pronunciation: "/ˈænjuəl pəˈfɔːməns rɪˈvjuːz/",
    pos: "noun phrase (plural)",
    meaning_en: "formal, once-a-year corporate evaluations assessing an employee's work and compensation",
    meaning_vi: "kỳ đánh giá năng suất định kỳ hàng năm",
    context_note: "Cách quản lý lỗi thời là đợi đến kỳ đánh giá hàng năm mới chỉ ra lỗi sai của nhân viên.",
    depth: "standard",
    collocation_pattern: "save / conduct / undergo + annual performance reviews",
    why_it_matters: "Thuật ngữ chuẩn xác trong môi trường công sở quốc tế (corporate HR).",
    learning_value_score: {
      frequency: 4,
      reusability: 4,
      richness: 3,
      difficulty: 2,
      total: 82,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Môi trường công sở",
        example: "Many tech firms are abolishing rigid annual performance reviews in favor of weekly check-ins.",
        explanation_vi: "Nhiều công ty công nghệ đang xóa bỏ các kỳ đánh giá hiệu suất hàng năm cứng nhắc để chuyển sang đối thoại hàng tuần.",
      },
    ],
    humanized: {
      simple_intuition: "Buổi tổng kết chính thức mỗi năm một lần ở công ty để xét duyệt lương thưởng và năng lực.",
      in_context_story: "Bài viết chỉ ra điểm yếu của việc đợi cả năm mới nói chuyện công việc với cấp dưới.",
      retrieval_tip: "Dùng khi nói về đánh giá nhân viên định kỳ trong doanh nghiệp.",
    },
  },

  "removes uncertainty": {
    term: "removes uncertainty",
    pronunciation: "/rɪˈmuːvz ʌnˈsɜːtənti/",
    pos: "collocation (verb + noun)",
    meaning_en: "eliminates doubt, ambiguity, or hesitation by providing definitive facts or clear directions",
    meaning_vi: "xua tan sự mập mờ / triệt tiêu cảm giác bất an không chắc chắn",
    context_note: "Sự rành mạch tạo nên sự tự tin vững chắc vì nó xua tan mọi nỗi hoang mang mập mờ.",
    depth: "deep",
    collocation_pattern: "clarity / transparent data / open dialogue + removes uncertainty",
    why_it_matters: "Cặp từ nguyên nhân - kết quả rất logic: 'Clarity removes uncertainty'. Cực kỳ hữu dụng trong Writing Task 2 khi lập luận.",
    learning_value_score: {
      frequency: 5,
      reusability: 5,
      richness: 4,
      difficulty: 3,
      total: 92,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Chính sách công & Khủng hoảng",
        example: "Clear communication from health authorities quickly removes uncertainty during epidemics.",
        explanation_vi: "Thông tin rành mạch từ cơ quan y tế nhanh chóng xua tan sự hoang mang trong thời kỳ dịch bệnh.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Lập kế hoạch tương lai",
        example: "Having a structured career roadmap removes uncertainty and reduces academic stress.",
        explanation_vi: "Có một lộ trình sự nghiệp rõ ràng sẽ triệt tiêu cảm giác mông lung và giảm tải căng thẳng học tập.",
      },
    ],
    humanized: {
      simple_intuition: "Làm sáng tỏ mọi thứ để người khác không còn phải băn khoăn hay lo âu mơ hồ.",
      in_context_story: "Nhân viên luôn muốn biết mình đang làm tốt chỗ nào và cần sửa cái gì để an tâm hành động.",
      retrieval_tip: "Khi một điều gì đó mang lại sự chắc chắn và giải tỏa lo âu → dùng 'removes uncertainty'.",
    },
  },

  "active listening": {
    term: "active listening",
    pronunciation: "/ˈæktɪv ˈlɪsənɪŋ/",
    pos: "noun phrase",
    meaning_en: "a conscious, focused communication technique where the listener gives undivided attention and reflects back meaning",
    meaning_vi: "lắng nghe chủ động / lắng nghe thấu cảm",
    context_note: "Lắng nghe chủ động là món quà hiếm có nhất ta có thể trao cho người khác giữa thế giới đầy phân tâm này.",
    depth: "deep",
    collocation_pattern: "practice / demonstrate / cultivate + active listening",
    why_it_matters: "Kỹ năng giao tiếp thượng thừa. Không chỉ đơn thuần là thính giác thụ động (hearing) mà là hành động chủ động thấu hiểu trọn vẹn (listening).",
    learning_value_score: {
      frequency: 5,
      reusability: 5,
      richness: 5,
      difficulty: 3,
      total: 94,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Giao tiếp gia đình",
        example: "Parents who practice active listening foster much deeper emotional bonds with their teenagers.",
        explanation_vi: "Cha mẹ thực hành lắng nghe chủ động sẽ xây dựng được sự gắn kết cảm xúc sâu sắc hơn với con cái.",
      },
      {
        scenario: "IELTS Writing Task 2 / Đào tạo kỹ năng mềm",
        example: "Medical schools now incorporate active listening into curricula to improve patient diagnostic accuracy.",
        explanation_vi: "Các trường y hiện đưa kỹ năng lắng nghe chủ động vào chương trình giảng dạy để nâng cao độ chuẩn xác khi chẩn đoán.",
      },
    ],
    humanized: {
      simple_intuition: "Tập trung 100% tâm trí vào người đang nói mà không ngắt lời hay bấm điện thoại.",
      in_context_story: "Không chỉ nghe từ ngữ, mà còn cảm nhận cảm xúc và ý tứ đằng sau từng câu nói.",
      retrieval_tip: "Khi nói về kỹ năng lắng nghe sâu sắc và chân thành → dùng 'active listening'.",
    },
  },

  "resisting the urge to formulate your response": {
    term: "resisting the urge to formulate your response",
    pronunciation: "/rɪˈzɪstɪŋ ði ɜːdʒ tuː ˈfɔːmjʊleɪt jɔː rɪˈspɒns/",
    pos: "chunk / reusable syntactic frame",
    meaning_en: "disciplining oneself not to mentally prepare a counter-rebuttal while the other person is still speaking",
    meaning_vi: "kìm nén thôi thúc chuẩn bị sẵn câu đáp trả trong khi người khác chưa dứt lời",
    context_note: "Lắng nghe chủ động đòi hỏi ta kìm chế thôi thúc vội vã nghĩ câu trả lời khi người khác đang nói.",
    depth: "deep",
    collocation_pattern: "resisting the urge to + [verb infinitive] (interrupt / check phone / defend oneself)",
    why_it_matters: "Đây là mẫu cấu trúc câu vàng: 'Resisting the urge to do sth'. Người học có thể lập tức tái sử dụng cho vô vàn tình huống Speaking/Writing.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 4,
      total: 98,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Thói quen tập trung",
        example: "Resisting the urge to check my smartphone every ten minutes has doubled my study productivity.",
        explanation_vi: "Kìm nén thôi thúc kiểm tra điện thoại mỗi mười phút đã giúp tôi nhân đôi năng suất học tập.",
      },
      {
        scenario: "IELTS Writing Task 2 / Tâm lý học & Tranh luận",
        example: "Resisting the urge to defend oneself immediately is the hallmark of emotional maturity.",
        explanation_vi: "Kìm nén thôi thúc tự biện hộ ngay lập tức là dấu hiệu tiêu biểu của sự trưởng thành cảm xúc.",
      },
      {
        scenario: "IELTS Speaking Part 2 / Tình huống khó khăn",
        example: "During the debate, resisting the urge to interrupt my opponent allowed me to spot flaws in their logic.",
        explanation_vi: "Trong buổi tranh luận, kìm nén thôi thúc ngắt lời đối thủ đã giúp tôi phát hiện sơ hở trong lập luận của họ.",
      },
    ],
    humanized: {
      simple_intuition: "Giữ mình bình tâm, không nôn nóng chuẩn bị lý lẽ phản đòn trong đầu khi người đối diện đang bộc bạch.",
      in_context_story: "Đa phần chúng ta không nghe để hiểu, mà nghe để chờ lượt mình phản bác; kiềm chế được phản xạ này là bước tiến lớn.",
      retrieval_tip: "Khi bạn muốn dùng mẫu 'kìm nén thôi thúc làm điều gì đó' → dùng 'resisting the urge to do sth'.",
    },
  },

  "reflecting back what you’ve heard": {
    term: "reflecting back what you’ve heard",
    pronunciation: "/rɪˈflɛktɪŋ bæk wɒt juːv hɜːd/",
    pos: "chunk / conversational technique",
    meaning_en: "mirroring and summarizing the speaker's core message to confirm accurate mutual understanding",
    meaning_vi: "nhắc lại và đúc kết những gì vừa lắng nghe để xác nhận thấu hiểu",
    context_note: "Kỹ thuật giao tiếp bậc thầy: Lặp lại ý của đối phương bằng cách diễn đạt của mình trước khi đưa ra lời khuyên.",
    depth: "deep",
    collocation_pattern: "reflecting back + what someone said / the core concerns",
    why_it_matters: "Kỹ thuật 'Mirroring & Reflecting' trong tâm lý trị liệu và đàm phán con tin cấp cao (FBI negotiation tactic).",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 3,
      total: 92,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Kỹ năng làm việc nhóm",
        example: "By simply reflecting back what colleagues propose, team leaders eliminate misunderstandings early.",
        explanation_vi: "Bằng việc nhắc lại và đúc kết ý kiến của đồng nghiệp, trưởng nhóm triệt tiêu hiểu lầm ngay từ đầu.",
      },
      {
        scenario: "IELTS Writing Task 2 / Quan hệ xã hội",
        example: "Reflecting back others' emotions before giving advice builds psychological safety in families.",
        explanation_vi: "Đúc kết và thấu cảm lại cảm xúc của người khác trước khi đưa ra lời khuyên tạo nên sự an toàn tâm lý trong gia đình.",
      },
    ],
    humanized: {
      simple_intuition: "Nói lại thông điệp của người khác bằng lời của mình để kiểm tra xem mình đã hiểu đúng chưa.",
      in_context_story: "Hành động này gửi đi thông điệp mạnh mẽ: 'Tôi đang thực sự coi trọng câu chuyện của bạn'.",
      retrieval_tip: "Khi nói về kỹ thuật phản hồi để xác nhận thông tin và tạo sự tin cậy → dùng cụm này.",
    },
  },

  "how you made them feel": {
    term: "how you made them feel",
    pronunciation: "/haʊ juː meɪd ðɛm fiːl/",
    pos: "clause / humanistic principle",
    meaning_en: "the enduring emotional imprint and resonance left upon someone after an interpersonal interaction",
    meaning_vi: "cảm xúc và ấn tượng sâu đậm mà bạn đã để lại trong lòng họ",
    context_note: "Trích dẫn triết lý bất hủ của Maya Angelou: Mọi người có thể quên lời bạn nói, nhưng không bao giờ quên cảm xúc bạn đem lại cho họ.",
    depth: "deep",
    collocation_pattern: "remember / care about + how you made them feel",
    why_it_matters: "Nguyên lý nhân văn tối thượng trong nghệ thuật ứng xử của con người, biến giao tiếp từ bài tập ngôn từ thành sự kết nối tâm hồn.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 2,
      total: 95,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 2 / Kỷ niệm với một người thầy hoặc bạn bè",
        example: "Years later, I forgot the complex equations my math teacher taught, but I vividly remember how valued he made me feel.",
        explanation_vi: "Nhiều năm sau, tôi quên hết các phương trình toán học phức tạp, nhưng tôi nhớ như in cảm giác được thầy trân trọng.",
      },
      {
        scenario: "IELTS Writing Task 2 / Dịch vụ khách hàng",
        example: "Brand loyalty is ultimately anchored not in advertising slogans, but in how companies make customers feel.",
        explanation_vi: "Lòng trung thành với thương hiệu không nằm ở khẩu hiệu quảng cáo, mà ở cảm xúc doanh nghiệp đem lại cho khách hàng.",
      },
    ],
    humanized: {
      simple_intuition: "Dư âm cảm xúc đọng lại trong lòng một người sau cuộc trò chuyện.",
      in_context_story: "Từ ngữ có thể phai mờ, nhưng cảm giác được tôn trọng hay bị tổn thương thì người ta nhớ suốt đời.",
      retrieval_tip: "Khi bàn về sức mạnh cảm xúc trong các mối quan hệ con người → dùng 'how you make/made them feel'.",
    },
  },

  "buy confidence": {
    term: "buy confidence",
    pronunciation: "/baɪ ˈkɒnfɪdəns/",
    pos: "collocation (verb + noun)",
    meaning_en: "purchasing or investing based primarily on perceived trust, certainty, and psychological reassurance",
    meaning_vi: "mua sự an tâm và niềm tin tưởng vững chắc",
    context_note: "Mọi doanh nhân rồi sẽ hiểu ra: Khách hàng không mua tính năng sản phẩm—họ mua sự an tâm và tự tin.",
    depth: "deep",
    collocation_pattern: "customers don't buy products—they buy confidence",
    why_it_matters: "Nguyên lý bán hàng và tiếp thị đỉnh cao (marketing psychology). Cực kỳ sắc bén cho các bài viết chủ đề Business & Consumerism.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 3,
      total: 91,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Người tiêu dùng & Quảng cáo",
        example: "When selecting insurance policies or healthcare plans, consumers essentially buy confidence in their future.",
        explanation_vi: "Khi lựa chọn gói bảo hiểm hay dịch vụ y tế, người tiêu dùng về bản chất là đang mua sự an tâm cho tương lai.",
      },
      {
        scenario: "IELTS Speaking Part 3 / Kinh doanh & Khởi nghiệp",
        example: "In luxury retail, shoppers do not merely buy goods; they buy confidence and social prestige.",
        explanation_vi: "Trong ngành bán lẻ xa xỉ, người mua không đơn thuần mua hàng hóa; họ mua sự tự tin và vị thế xã hội.",
      },
    ],
    humanized: {
      simple_intuition: "Bỏ tiền ra vì tin tưởng và cảm thấy yên tâm tuyệt đối vào người bán.",
      in_context_story: "Sản phẩm tốt chưa đủ, người mua phải cảm nhận được sự bảo đảm chắc chắn từ người cung cấp.",
      retrieval_tip: "Khi giải thích động lực mua hàng từ góc độ tâm lý an tâm → dùng 'buy confidence'.",
    },
  },

  "fund founders they believe can execute": {
    term: "fund founders they believe can execute",
    pronunciation: "/fʌnd ˈfaʊndəz ðeɪ bɪˈliːv kæn ˈɛksɪkjuːt/",
    pos: "chunk / investment rule",
    meaning_en: "venture capitalists allocate capital to entrepreneurs who demonstrate tangible operational discipline and grit",
    meaning_vi: "rót vốn cho những nhà sáng lập mà họ tin là có năng lực biến ý tưởng thành hiện thực",
    context_note: "Nhà đầu tư không rót tiền cho những ý tưởng hào nhoáng trên giấy—họ đầu tư vào người có khả năng thực thi.",
    depth: "deep",
    collocation_pattern: "fund / back founders + who can execute",
    why_it_matters: "Quy tắc cốt lõi của thung lũng Silicon: Ý tưởng là số 0, năng lực thực thi (execution) mới là số 1.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 4,
      difficulty: 3,
      total: 89,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Đổi mới sáng tạo & Kinh tế",
        example: "Venture capitalists rarely invest in raw ideas; they fund founders they believe can execute effectively.",
        explanation_vi: "Các quỹ mạo hiểm hiếm khi rót tiền vào ý tưởng thô; họ đầu tư vào những nhà sáng lập có năng lực thực thi hiệu quả.",
      },
    ],
    humanized: {
      simple_intuition: "Đầu tư vào con người có khả năng bắt tay vào làm và đưa kế hoạch về đích thành công.",
      in_context_story: "Ai cũng có thể vẽ ra ý tưởng hay, nhưng người biến nó thành sản phẩm thật mới xứng đáng được tin cậy.",
      retrieval_tip: "Dùng để nhấn mạnh tầm quan trọng của năng lực hành động so với ý tưởng lý thuyết.",
    },
  },

  "opportunity to create influence": {
    term: "opportunity to create influence",
    pronunciation: "/ˌɒpəˈtjuːnɪti tuː kriˈeɪt ˈɪnfluəns/",
    pos: "collocation phrase",
    meaning_en: "a valuable moment to shape others' perceptions, attitudes, or decisions positively",
    meaning_vi: "cơ hội quý báu để tạo dựng tầm ảnh hưởng và uy tín",
    context_note: "Mỗi cuộc trò chuyện, buổi phỏng vấn hay họp nhóm đều là cơ hội vàng để kiến tạo tầm ảnh hưởng—hoặc đánh mất nó.",
    depth: "deep",
    collocation_pattern: "seize / become an + opportunity to create influence",
    why_it_matters: "Thay cho 'make people follow you', cụm 'create influence' diễn đạt tinh tế sức mạnh của sự lan tỏa uy tín cá nhân.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 4,
      difficulty: 3,
      total: 90,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Diễn thuyết trước đám đông",
        example: "Every public presentation is a distinct opportunity to create influence and advocate for positive change.",
        explanation_vi: "Mỗi buổi thuyết trình trước công chúng là một cơ hội rõ nét để kiến tạo tầm ảnh hưởng và lan tỏa thay đổi tích cực.",
      },
      {
        scenario: "IELTS Writing Task 2 / Trách nhiệm truyền thông",
        example: "Celebrities should view their social media reach as an opportunity to create positive influence for youth.",
        explanation_vi: "Người nổi tiếng nên xem lượng người theo dõi trên mạng xã hội là cơ hội để tạo tầm ảnh hưởng tích cực cho giới trẻ.",
      },
    ],
    humanized: {
      simple_intuition: "Một dịp thuận lợi để tiếng nói và tư tưởng của mình chạm tới và làm thay đổi suy nghĩ của người khác.",
      in_context_story: "Đừng xem các buổi gặp gỡ là nghĩa vụ xã giao tầm thường; hãy xem đó là dịp để gieo hạt giống uy tín.",
      retrieval_tip: "Khi nói về việc xây dựng sức ảnh hưởng tích cực tới cộng đồng hay đồng nghiệp → dùng cụm này.",
    },
  },

  "skyrocketed": {
    term: "skyrocketed",
    pronunciation: "/ˈskaɪˌrɒkɪtɪd/",
    pos: "verb (past)",
    meaning_en: "increased or rose extremely rapidly and dramatically",
    meaning_vi: "tăng vọt chóng mặt / gia tăng giá trị theo cấp số nhân",
    context_note: "Giá trị của lời khuyên từ Buffett đã tăng vọt chóng mặt trong thời đại bùng nổ của trí tuệ nhân tạo.",
    depth: "standard",
    collocation_pattern: "value / prices / demand + skyrocketed",
    why_it_matters: "Từ vựng đắt giá trong IELTS Writing Task 1 và Task 2 khi muốn diễn tả sự tăng trưởng vọt đỉnh thay cho 'increased very much'.",
    learning_value_score: {
      frequency: 5,
      reusability: 5,
      richness: 3,
      difficulty: 2,
      total: 88,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 1 / Miêu tả biểu đồ",
        example: "Demand for renewable energy skyrocketed over the subsequent five-year period.",
        explanation_vi: "Nhu cầu về năng lượng tái tạo đã tăng vọt chóng mặt trong giai đoạn 5 năm tiếp theo.",
      },
      {
        scenario: "IELTS Writing Task 2 / Kinh tế số",
        example: "The market valuation of generative AI startups has skyrocketed in recent months.",
        explanation_vi: "Định giá thị trường của các công ty khởi nghiệp AI tạo sinh đã tăng vọt trong những tháng gần đây.",
      },
    ],
    humanized: {
      simple_intuition: "Bắn vọt lên như tên lửa, tăng cực nhanh trong thời gian ngắn.",
      in_context_story: "Càng có nhiều công nghệ tự động hóa, kỹ năng thấu cảm con người càng trở nên quý hiếm và đắt giá.",
      retrieval_tip: "Khi miêu tả giá cả, nhu cầu hoặc giá trị tăng đột biến → dùng 'skyrocket'.",
    },
  },

  "convince people to follow you": {
    term: "convince people to follow you",
    pronunciation: "/kənˈvɪns ˈpiːpəl tuː ˈfɒləʊ juː/",
    pos: "chunk / verbal phrase",
    meaning_en: "to persuade others genuinely to embrace your leadership direction and trust your foresight",
    meaning_vi: "thuyết phục mọi người tự nguyện tin tưởng và đồng hành cùng bạn",
    context_note: "Nếu không có kỹ năng truyền đạt, bạn sẽ chẳng thể thuyết phục ai đi theo mình, dù bạn có nhìn xa trông rộng hơn họ.",
    depth: "deep",
    collocation_pattern: "convince / persuade people to follow someone",
    why_it_matters: "Bản chất của thuật lãnh đạo: Không phải là ép buộc (command) mà là thuyết phục bằng trái tim và lý trí.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 4,
      difficulty: 2,
      total: 88,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Nghệ thuật lãnh đạo",
        example: "Vision alone is insufficient; a visionary must convince people to follow them through genuine empathy.",
        explanation_vi: "Chỉ có tầm nhìn thôi là chưa đủ; người có tầm nhìn phải biết thuyết phục mọi người đi theo mình bằng sự thấu cảm.",
      },
    ],
    humanized: {
      simple_intuition: "Làm cho người khác cảm thấy tin tưởng để an tâm đi cùng một con đường với bạn.",
      in_context_story: "Dù bạn nhìn thấy kho báu sau quả núi, nhưng không biết giải thích thì chẳng ai dám leo núi cùng bạn.",
      retrieval_tip: "Khi bàn về năng lực thu phục lòng người trong vai trò dẫn dắt → dùng cụm này.",
    },
  },

  "see over the mountain": {
    term: "see over the mountain",
    pronunciation: "/siː ˈoʊvər ðə ˈmaʊntɪn/",
    pos: "idiom / metaphor",
    meaning_en: "to possess visionary strategic foresight, discerning future opportunities or perils beyond current horizons",
    meaning_vi: "nhìn thấu qua dãy núi / có tầm nhìn xa trông rộng vượt tầm mắt thông thường",
    context_note: "Bạn có thể là người nhìn thấy viễn cảnh phía sau ngọn núi, nhưng người khác thì chưa nhìn thấy được.",
    depth: "deep",
    collocation_pattern: "see over the mountain / see around the corner",
    why_it_matters: "Ẩn dụ hình ảnh giàu chất thơ và tính liên tưởng của Buffett về năng lực nhìn xa trông rộng (strategic foresight).",
    learning_value_score: {
      frequency: 3,
      reusability: 4,
      richness: 5,
      difficulty: 4,
      total: 90,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Tầm nhìn chiến lược",
        example: "Innovative entrepreneurs can see over the mountain long before the general public catches on.",
        explanation_vi: "Các doanh nhân đổi mới sáng tạo có thể nhìn thấu qua ngọn núi rất lâu trước khi công chúng kịp nhận ra.",
      },
    ],
    humanized: {
      simple_intuition: "Khả năng nhìn thấu tương lai và đoán trước những chuyển biến lớn mà người khác chưa thấy.",
      in_context_story: "Người dẫn đầu có tầm mắt cao hơn, nhưng thách thức lớn nhất là mô tả lại quang cảnh đó cho người đứng dưới thung lũng.",
      retrieval_tip: "Khi muốn khen ngợi tầm nhìn xa trông rộng vượt trội của ai đó → dùng 'see over the mountain'.",
    },
  },

  "end goal": {
    term: "end goal",
    pronunciation: "/ɛnd ɡoʊl/",
    pos: "noun phrase",
    meaning_en: "the ultimate intended purpose, final objective, or long-term destination of an endeavor",
    meaning_vi: "mục tiêu tối thượng / đích đến cuối cùng",
    context_note: "Đích đến cuối cùng của những cuộc góp ý chân thành là gì? Chính là sự sáng tỏ và tự tin.",
    depth: "standard",
    collocation_pattern: "what's the end goal? / keep the end goal in mind",
    why_it_matters: "Collocation tự nhiên của người bản xứ thay vì lặp lại 'final aim' hay 'purpose'.",
    learning_value_score: {
      frequency: 5,
      reusability: 5,
      richness: 3,
      difficulty: 2,
      total: 87,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Mục tiêu phát triển",
        example: "The end goal of education should be cultivating independent thinkers rather than test-takers.",
        explanation_vi: "Đích đến cuối cùng của giáo dục nên là đào tạo ra những cá nhân có tư duy độc lập thay vì thợ thi cử.",
      },
    ],
    humanized: {
      simple_intuition: "Cái đích sâu xa nhất mà mọi hành động của bạn hướng tới.",
      in_context_story: "Đừng góp ý chỉ để chỉ trích; đích đến cuối cùng là giúp đồng đội tiến bộ và sáng tỏ con đường phía trước.",
      retrieval_tip: "Khi nói về mục đích cuối cùng quan trọng nhất → dùng 'end goal'.",
    },
  },

  "builds confidence": {
    term: "builds confidence",
    pronunciation: "/bɪldz ˈkɒnfɪdəns/",
    pos: "collocation (verb + noun)",
    meaning_en: "steadily fosters self-assurance, psychological safety, and inner certitude",
    meaning_vi: "củng cố và nuôi dưỡng sự tự tin vững vàng",
    context_note: "Sự rành mạch trong giao tiếp nuôi dưỡng sự tự tin vì nó xua tan mọi nỗi bất an mập mờ.",
    depth: "standard",
    collocation_pattern: "clarity / competence / practice + builds confidence",
    why_it_matters: "Cặp động từ + danh từ chuẩn mực 'build confidence', dùng thường xuyên trong Speaking & Writing.",
    learning_value_score: {
      frequency: 5,
      reusability: 5,
      richness: 3,
      difficulty: 2,
      total: 88,
    },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 1 / Phát triển bản thân",
        example: "Mastering small daily challenges gradually builds lasting confidence.",
        explanation_vi: "Làm chủ những thử thách nhỏ mỗi ngày dần dần nuôi dưỡng sự tự tin bền vững.",
      },
    ],
    humanized: {
      simple_intuition: "Từng bước vun đắp cảm giác vững tâm và tin tưởng vào năng lực của bản thân.",
      in_context_story: "Khi người học hay nhân viên biết chính xác họ cần làm gì, sự tự tin sẽ tự nhiên nảy nở.",
      retrieval_tip: "Khi nói về việc gia tăng sự tự tin một cách bền bỉ → dùng 'build confidence'.",
    },
  },

  "human skill that outperforms AI": {
    term: "human skill that outperforms AI",
    pronunciation: "/ˈhjuːmən skɪl ðæt ˌaʊtpəˈfɔːmz eɪ-aɪ/",
    pos: "clause / thematic motif",
    meaning_en: "an organic interpersonal competency that consistently surpasses algorithmic capabilities in nuanced human domains",
    meaning_vi: "kỹ năng của con người vượt trội hơn hẳn trí tuệ nhân tạo",
    context_note: "Tiêu đề và thông điệp trọng tâm của Case #02: Giao tiếp chân thực là kỹ năng độc tôn của con người đánh bại thuật toán.",
    depth: "deep",
    collocation_pattern: "a human skill that outperforms / transcends AI",
    why_it_matters: "Chủ đề thời sự nóng hổi nhất hiện nay trên các diễn đàn quốc tế và đề thi IELTS: Sự cạnh tranh giữa năng lực con người và máy móc.",
    learning_value_score: {
      frequency: 4,
      reusability: 5,
      richness: 5,
      difficulty: 3,
      total: 95,
    },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Công nghệ & Tương lai việc làm",
        example: "Empathy and ethical judgment remain irreplaceable human skills that consistently outperform AI in leadership roles.",
        explanation_vi: "Sự thấu cảm và phán đoán đạo đức vẫn là những kỹ năng con người không thể thay thế, vượt trội hơn hẳn AI trong vai trò lãnh đạo.",
      },
    ],
    humanized: {
      simple_intuition: "Những năng lực bắt nguồn từ trái tim và linh hồn con người mà không dòng code nào có thể bắt chước.",
      in_context_story: "Máy móc có thể tối ưu hóa quy trình, nhưng sự kết nối giữa người với người mới là thứ tạo ra lòng trung thành.",
      retrieval_tip: "Khi bàn về những năng lực độc tôn của con người trước làn sóng tự động hóa → dùng cụm này.",
    },
  },
};
