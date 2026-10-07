import { VocabularyTerm } from "../types";

/**
 * 20 High-Value Lexical Learning Objects for Cases #004, #005, #006
 * The Guardian Critical Literacy, Ecological Economics & Social Psychology
 */
export const EXTENDED_CASES_HIGH_VALUE_CHUNKS: Record<string, VocabularyTerm> = {
  // CASE 004: EdTech & Deep Reading Literacy
  "pedagogical efficacy": {
    term: "pedagogical efficacy",
    pronunciation: "/ˌpɛdəˈɡɒdʒɪkəl ˈɛfɪkəsi/",
    pos: "academic noun phrase",
    meaning_en: "the genuine capacity of an educational method to produce real, lasting intellectual learning outcomes",
    meaning_vi: "hiệu quả sư phạm thực chất / giá trị giáo dục cốt lõi",
    context_note: "Nhầm lẫn giữa sự hào nhoáng giải trí tức thời với hiệu quả sư phạm thực chất.",
    depth: "deep",
    collocation_pattern: "conflate entertainment with + pedagogical efficacy",
    why_it_matters: "Thuật ngữ sư phạm học thuật đỉnh cao thay cho 'teaching effectiveness' trong Writing Task 2 chủ đề Education.",
    learning_value_score: { frequency: 4, reusability: 5, richness: 5, difficulty: 4, total: 95 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Giáo dục & Trò chơi điện tử",
        example: "Gamified learning apps often prioritize user engagement over genuine pedagogical efficacy.",
        explanation_vi: "Các ứng dụng học tập biến tướng thành trò chơi thường ưu tiên giữ chân người dùng hơn là hiệu quả sư phạm thực chất.",
      },
    ],
    humanized: {
      simple_intuition: "Khả năng thực sự giúp học sinh hiểu sâu và nhớ lâu bài học chứ không chỉ là học vui nhất thời.",
      in_context_story: "Nhiều trường học bỏ tiền mua máy tính bảng đắt tiền nhưng kết quả học tập của học sinh lại tụt dốc.",
      retrieval_tip: "Dùng để đánh giá chất lượng dạy học của một phương pháp giáo dục.",
    },
  },

  "deep reading circuits": {
    term: "deep reading circuits",
    pronunciation: "/diːp ˈriːdɪŋ ˈsɜːkɪts/",
    pos: "neuroscience collocation",
    meaning_en: "the interconnected neural pathways developed through sustained engagement with long-form printed text",
    meaning_vi: "mạng lưới mạch thần kinh đọc sâu và suy ngẫm",
    context_note: "Đọc sách in truyền thống rèn giũa các mạch thần kinh đọc sâu chịu trách nhiệm cho tư duy phản biện.",
    depth: "deep",
    collocation_pattern: "cultivate / rewire / erode + deep reading circuits",
    why_it_matters: "Thuật ngữ của nhà khoa học nhận thức Maryanne Wolf (tác giả cuốn Proust and the Squid). Cực kỳ hữu dụng khi viết về văn hóa đọc.",
    learning_value_score: { frequency: 4, reusability: 5, richness: 5, difficulty: 4, total: 94 },
    transfer_templates: [
      {
        scenario: "IELTS Speaking Part 3 / Thói quen đọc sách",
        example: "Sustained reading of physical novels trains deep reading circuits that skimming social media destroys.",
        explanation_vi: "Đọc tiểu thuyết in giấy bền bỉ rèn giũa các mạch đọc sâu mà thói quen lướt mạng xã hội phá hủy.",
      },
    ],
    humanized: {
      simple_intuition: "Các đường dây liên kết trong não bộ giúp ta kiên nhẫn đọc hiểu những cuốn sách dày và suy ngẫm thấu đáo.",
      in_context_story: "Lướt màn hình khiến não quen đọc nhanh quét từ khóa, làm thui chột khả năng đọc sâu.",
      retrieval_tip: "Dùng khi so sánh văn hóa đọc sách in với thói quen đọc lướt trên màn hình số.",
    },
  },

  "tactile pedagogy": {
    term: "tactile pedagogy",
    pronunciation: "/ˈtæktaɪl ˈpɛdəɡɒdʒi/",
    pos: "educational concept",
    meaning_en: "teaching methods anchored in physical touch, handwriting, paper books, and bodily manipulation of materials",
    meaning_vi: "phương pháp sư phạm dựa trên xúc giác và thao tác vật lý",
    context_note: "Thụy Điển và các nước Bắc Âu quay trở lại với phương pháp sư phạm xúc giác sau khi lạm dụng màn hình số.",
    depth: "deep",
    collocation_pattern: "the irreplaceable primacy of + tactile pedagogy",
    why_it_matters: "Sự kết hợp giữa 'tactile' (thuộc về xúc giác) và 'pedagogy' (phương pháp dạy học) phản ánh xu thế phục hưng sách giấy trên toàn cầu.",
    learning_value_score: { frequency: 4, reusability: 4, richness: 5, difficulty: 4, total: 91 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Trẻ em & Công nghệ số",
        example: "Early childhood development requires tactile pedagogy, such as handwriting and physical blocks, to build motor dexterity.",
        explanation_vi: "Sự phát triển đầu đời của trẻ cần phương pháp sư phạm xúc giác như tập viết tay và ghép khối vật lý để xây dựng sự khéo léo vận động.",
      },
    ],
    humanized: {
      simple_intuition: "Cách dạy học để học sinh chạm tay vào sách vở thật, cầm bút viết trên giấy thật thay vì chỉ vuốt màn hình kính vô hồn.",
      in_context_story: "Trẻ em viết tay trên giấy nhớ bài tốt hơn gõ phím trên màn hình thủy tinh.",
      retrieval_tip: "Khi bàn về việc giữ gìn sách giấy, bút viết và các hoạt động thực hành thủ công trong trường học.",
    },
  },

  // CASE 005: Ecological Political Economy & Climate Techno-Fix
  "technological panacea": {
    term: "technological panacea",
    pronunciation: "/ˌtɛknəˈlɒdʒɪkəl ˌpænəˈsiːə/",
    pos: "critical collocation",
    meaning_en: "the false belief that engineering innovation alone can magically cure all complex societal or environmental crises",
    meaning_vi: "liều thuốc tiên công nghệ / ảo tưởng chữa lành bách bệnh bằng kỹ thuật",
    context_note: "Đổi mới công nghệ thường được vẽ ra như một phương thuốc vạn năng giúp duy trì tăng trưởng vô tận.",
    depth: "deep",
    collocation_pattern: "presented as a + miraculous / technological panacea",
    why_it_matters: "'Panacea' (thần dược chữa bách bệnh trong thần thoại Hy Lạp) là từ vựng band 8.5 dùng để phê phán các giải pháp phi thực tế.",
    learning_value_score: { frequency: 4, reusability: 5, richness: 5, difficulty: 4, total: 96 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Biến đổi khí hậu & Chính sách",
        example: "Carbon capture should not be treated as a technological panacea that excuses continued fossil fuel reliance.",
        explanation_vi: "Công nghệ thu giữ carbon không nên bị coi là phương thuốc vạn năng để biện minh cho việc tiếp tục lệ thuộc vào nhiên liệu hóa thạch.",
      },
    ],
    humanized: {
      simple_intuition: "Ảo tưởng rằng chỉ cần phát minh ra máy móc mới là giải quyết xong mọi rắc rối mà con người không cần thay đổi lối sống.",
      in_context_story: "Nhiều người nghĩ chỉ cần có xe điện là xong chuyện ô nhiễm, quên mất khai thác pin xe điện tàn phá rừng nguyên sinh.",
      retrieval_tip: "Dùng để phản biện quan điểm ngây thơ cho rằng công nghệ giải quyết được tất cả mọi vấn nạn.",
    },
  },

  "biophysical boundaries": {
    term: "biophysical boundaries",
    pronunciation: "/ˌbaɪoʊˈfɪzɪkəl ˈbaʊndəriz/",
    pos: "ecological science collocation",
    meaning_en: "the absolute, non-negotiable physical thresholds of Earth's ecosystems (clean air, freshwater, stable climate)",
    meaning_vi: "những giới hạn sinh lý địa cầu bất khả xâm phạm của Trái Đất",
    context_note: "Ảo tưởng tăng trưởng vô hạn xung đột trực diện với những giới hạn sinh lý hữu hạn của hành tinh.",
    depth: "deep",
    collocation_pattern: "operate within / exceed + finite biophysical boundaries",
    why_it_matters: "Dựa trên mô hình 'Planetary Boundaries' của Viện Nghiên cứu Khả năng Phục hồi Stockholm (Stockholm Resilience Centre).",
    learning_value_score: { frequency: 5, reusability: 5, richness: 5, difficulty: 4, total: 95 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Môi trường & Kinh tế bền vững",
        example: "Global industrial economies must acknowledge that infinite GDP expansion is physically impossible within finite biophysical boundaries.",
        explanation_vi: "Các nền kinh tế công nghiệp toàn cầu phải thừa nhận rằng tăng trưởng GDP vô hạn là bất khả thi về mặt vật lý trong những giới hạn sinh lý hữu hạn của hành tinh.",
      },
    ],
    humanized: {
      simple_intuition: "Sức chịu đựng tối đa của Trái Đất về không khí, nguồn nước và rừng cây — vượt qua lằn ranh này thì thiên nhiên sẽ sụp đổ.",
      in_context_story: "Trái Đất là một chiếc bình có đáy, ta không thể múc mãi nước ra mà không làm cạn bình.",
      retrieval_tip: "Dùng khi khẳng định tài nguyên thiên nhiên của hành tinh là hữu hạn.",
    },
  },

  "jevons paradox": {
    term: "jevons paradox",
    pronunciation: "/ˈdʒɛvənz ˈpærədɒks/",
    pos: "economic theorem (proper noun)",
    meaning_en: "the economic phenomenon where increases in efficiency lower costs, causing overall resource consumption to surge rather than fall",
    meaning_vi: "nghịch lý Jevons (càng tiết kiệm hiệu quả thì tổng lượng tiêu thụ càng tăng vọt)",
    context_note: "Hiệu quả sử dụng năng lượng tăng lên thường kích hoạt nghịch lý Jevons kinh điển: chi phí giảm dẫn tới tiêu dùng bùng nổ.",
    depth: "deep",
    collocation_pattern: "trigger / illustrate + the classic Jevons Paradox",
    why_it_matters: "Nghịch lý kinh tế học môi trường nổi tiếng nhất. Thí sinh sử dụng được nghịch lý này trong Writing Task 2 sẽ tạo ấn tượng học thuật vượt trội.",
    learning_value_score: { frequency: 4, reusability: 5, richness: 5, difficulty: 5, total: 98 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Năng lượng & Ô tô",
        example: "Fuel-efficient engines triggered the Jevons Paradox: because driving became cheaper, people drove significantly longer distances.",
        explanation_vi: "Động cơ tiết kiệm xăng đã kích hoạt nghịch lý Jevons: vì chi phí lái xe rẻ hơn, người ta lại lái xe với quãng đường dài hơn đáng kể.",
      },
    ],
    humanized: {
      simple_intuition: "Càng làm ra máy tiết kiệm điện thì người ta càng xài nhiều đồ điện hơn, kết quả là tiền điện và than đá đốt nhiều hơn trước.",
      in_context_story: "Nhà kinh tế William Jevons phát hiện ra khi động cơ hơi nước dùng ít than hơn thì cả nước Anh lại tiêu thụ lượng than gấp nhiều lần.",
      retrieval_tip: "Dùng khi phân tích hiện tượng công nghệ càng tiết kiệm thì con người càng xài lãng phí hơn.",
    },
  },

  // CASE 006: Hyperconnected Loneliness & Third Places
  "perpetual informational saturation": {
    term: "perpetual informational saturation",
    pronunciation: "/pəˈpɛtʃuəl ˌɪnfəˈmeɪʃənəl ˌsætʃəˈreɪʃən/",
    pos: "sociological noun phrase",
    meaning_en: "the constant, unending inundation of the human mind with notifications, media snippets, and digital data",
    meaning_vi: "trạng thái bão hòa thông tin triền miên và dồn dập",
    context_note: "Chưa bao giờ trong lịch sử loài người lại sống trong trạng thái bão hòa thông tin triền miên như hiện nay.",
    depth: "deep",
    collocation_pattern: "exist in a state of + perpetual informational saturation",
    why_it_matters: "Cụm danh từ miêu tả chính xác căn bệnh thời đại của thế hệ Gen Z: não bộ không bao giờ có một giây phút tĩnh lặng.",
    learning_value_score: { frequency: 4, reusability: 5, richness: 5, difficulty: 4, total: 94 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Sức khỏe tinh thần & Mạng xã hội",
        example: "Living under perpetual informational saturation leads to chronic anxiety and diminished attention spans.",
        explanation_vi: "Sống trong tình trạng bão hòa thông tin triền miên dẫn tới lo âu mãn tính và sự suy giảm khả năng tập trung chú ý.",
      },
    ],
    humanized: {
      simple_intuition: "Đầu óc lúc nào cũng bị ngập lụt trong tin nhắn, video và thông báo mạng xã hội từ sáng tới đêm.",
      in_context_story: "Mở mắt ra là cầm điện thoại, trước khi ngủ cũng nhìn màn hình khiến tâm trí như một miếng bọt biển bị ngâm sũng nước.",
      retrieval_tip: "Dùng khi nói về áp lực quá tải thông tin số lên tâm lý con người.",
    },
  },

  "architecture of belonging": {
    term: "architecture of belonging",
    pronunciation: "/ˈɑːkɪtɛktʃər ɒv bɪˈlɒŋɪŋ/",
    pos: "sociological metaphor",
    meaning_en: "the physical, civic, and urban spaces designed intentionally to nurture human fellowship, community, and social cohesion",
    meaning_vi: "kiến trúc của sự gắn kết cộng đồng / không gian nuôi dưỡng cảm giác thuộc về nhau",
    context_note: "Chữa lành nỗi cô đơn hiện đại đòi hỏi tái đầu tư vào kiến trúc của sự thuộc về: công viên, thư viện và quảng trường công cộng.",
    depth: "deep",
    collocation_pattern: "reinvest in / rebuild + the civic architecture of belonging",
    why_it_matters: "Ẩn dụ kiến trúc xã hội học (Sociological Architecture) lấy cảm hứng từ phong trào New Urbanism và 'Third Places' của Ray Oldenburg.",
    learning_value_score: { frequency: 4, reusability: 5, richness: 5, difficulty: 4, total: 96 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Quy hoạch đô thị & Cộng đồng",
        example: "Urban planners must prioritize the architecture of belonging—such as public plazas and green libraries—to counter urban isolation.",
        explanation_vi: "Các nhà quy hoạch đô thị phải ưu tiên kiến trúc của sự gắn kết cộng đồng—như quảng trường công và thư viện xanh—để chống lại sự cô lập thị thành.",
      },
    ],
    humanized: {
      simple_intuition: "Những không gian công cộng nơi mọi người có thể ngồi lại trò chuyện, vui chơi cùng nhau mà không bị ai đuổi hay bắt mua hàng.",
      in_context_story: "Khi các công viên bị biến thành trung tâm thương mại trả tiền, người nghèo và người già bị cô lập trong bốn bức tường phòng trọ.",
      retrieval_tip: "Dùng khi kêu gọi xây dựng thêm công viên, nhà văn hóa và không gian sinh hoạt cộng đồng mở.",
    },
  },

  "dopamine feedback loops": {
    term: "dopamine feedback loops",
    pronunciation: "/ˈdoʊpəmiːn ˈfiːdbæk luːps/",
    pos: "neurobiology / tech ethics",
    meaning_en: "neurological cycles triggered by variable rewards (likes, shares) that compel users to repeatedly check screens",
    meaning_vi: "vòng lặp phản hồi dopamine gây nghiện màn hình",
    context_note: "Thuật toán mạng xã hội giam giữ người dùng trong các vòng lặp phản hồi dopamine để bòn rút vốn chú ý.",
    depth: "deep",
    collocation_pattern: "trapped in + ephemeral / addictive dopamine feedback loops",
    why_it_matters: "Cơ chế thần kinh học giải thích nguyên nhân gây nghiện điện thoại (Social Media Addiction & Attention Economy).",
    learning_value_score: { frequency: 5, reusability: 5, richness: 4, difficulty: 3, total: 93 },
    transfer_templates: [
      {
        scenario: "IELTS Writing Task 2 / Nghiện game & Mạng xã hội",
        example: "Smartphone apps deliberately engineer dopamine feedback loops to maximize user screen time and ad revenues.",
        explanation_vi: "Các ứng dụng điện thoại thông minh cố tình thiết kế các vòng lặp phản hồi dopamine để tối đa hóa thời gian nhìn màn hình và doanh thu quảng cáo.",
      },
    ],
    humanized: {
      simple_intuition: "Cảm giác hồi hộp ngóng chờ thông báo hoặc lượt thả tim trên mạng, nhận được một cái là lại muốn vuốt thêm cái nữa không dứt ra được.",
      in_context_story: "Như một người chơi máy đánh bạc kéo cần gạt, mỗi lần lướt TikTok não lại tiết ra một chút hưng phấn ngắn ngủi.",
      retrieval_tip: "Dùng khi giải thích cơ chế gây nghiện của mạng xã hội và game số.",
    },
  },
};
