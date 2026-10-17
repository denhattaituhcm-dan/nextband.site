// UNIT 10: Behavior — English Idioms Master
// Source: DK English for Everyone: English Idioms (Unit 10, pages 46-49 & Answer Key page 228)
// Complete Academic Data Package with Authentic Audio, Vietnamese Translations, IELTS Band 8.0+ Guidance & Interactive Exercises

export const UNIT_10_DATA = {
  unit_id: 10,
  unit_number_str: "10",
  unit_title: "Behavior",
  major_section: "ATTITUDE",
  page_range: {
    teaching_start: 46,
    teaching_end: 47,
    practice_start: 48,
    practice_end: 49,
    answers_page: 228,
  },
  summary: {
    total_idioms: 20,
    total_teaching_modules: 4,
    total_practice_exercises: 5,
    total_audios: 25,
    accent: "US",
  },
  modules: [
    // ----------------------------------------------------
    // Module 10.1: SYMPATHY AND KINDNESS
    // ----------------------------------------------------
    {
      module_id: "10.1",
      module_title: "SYMPATHY AND KINDNESS",
      page_number: 46,
      page_number_end: 46,
      description_en: "Idioms and expressions used to describe compassionate, generous, and supportive behavior toward others in times of need or daily life.",
      idioms: [
        {
          id: "10_1_lendhand",
          headword: "lend a hand",
          phonetic: "/lend ə hænd/",
          audio_url: "/audio/idioms/unit10/id_10_1_lendhand_us.mp3",
          definition_en: "help someone with an activity or task",
          context_sentence: "Yulia offered to lend a hand with the dishes after the party.",
          page_number: 46,
          audio_file: "id_10_1_lendhand_us.mp3",
          spoken_text: "lend a hand Yulia offered to lend a hand with the dishes after the party",
          vietnamese: {
            meaning: "giúp một tay, chung sức hỗ trợ công việc cụ thể",
            usage_notes: "Thường đi kèm giới từ 'with' ('lend a hand with something') hoặc đứng độc lập để đề nghị giúp đỡ.",
            ielts_speaking_tip: "Rất tự nhiên trong Speaking Part 1 khi nói về thói quen làm việc nhà hoặc tình nguyện cộng đồng."
          },
          usage_pattern: "lend a hand (with something) / lend (someone) a hand",
          register: "Neutral / Informal",
          tone: "Helpful / Cooperative",
          register_info: {
            badge: "Neutral • Safe for Speaking & Informal Writing",
            is_ielts_writing_safe: false,
            guidance: "Tuyệt vời cho Speaking Part 1 và 2. Trong Writing Task 2, nên dùng 'render assistance' hoặc 'provide practical support'."
          },
          cognitive_anchor: {
            metaphor_core: "Cho người khác mượn bàn tay sức lực của mình để cùng bưng bê, giảm nhẹ gánh nặng.",
            visual_equation: "Mượn một bàn tay = San sẻ gánh nặng thể chất ➔ Thể hiện tinh thần tương trợ",
            origin_summary: "Bắt nguồn từ văn học Anh thời kỳ Cận Đại (thế kỷ 16), gắn liền với truyền thống giúp đỡ láng giềng thu hoạch mùa màng."
          },
          micro_check: {
            prompt: "Câu nào dưới đây sử dụng thành ngữ 'lend a hand' chính xác nhất?",
            options: [
              { key: "A", text: "Whenever my roommates prepare dinner, I always offer to lend a hand with chopping vegetables.", is_correct: true },
              { key: "B", text: "He broke his arm so he had to lend a hand to the surgeon.", is_correct: false }
            ],
            feedback: "Chính xác! 'Lend a hand' mang nghĩa chung tay giúp đỡ một công việc cụ thể."
          }
        },
        {
          id: "10_1_feelfor",
          headword: "feel for",
          phonetic: "/fiːl fɔːr/",
          audio_url: "/audio/idioms/unit10/id_10_1_feelfor_us.mp3",
          definition_en: "sympathize with someone experiencing hardship or pain",
          context_sentence: "I really feel for Mario. He has to work so hard in the kitchen.",
          page_number: 46,
          audio_file: "id_10_1_feelfor_us.mp3",
          spoken_text: "feel for I really feel for Mario he has to work so hard in the kitchen",
          vietnamese: {
            meaning: "thấu cảm, thương cảm và thấy xót xa cho nỗi vất vả của ai",
            usage_notes: "Thường dùng với trạng từ nhấn mạnh như 'really feel for', 'deeply feel for'.",
            ielts_speaking_tip: "Thể hiện chiều sâu cảm xúc cao trong Speaking Part 2 khi miêu tả một người bạn vượt khó."
          },
          usage_pattern: "feel for someone",
          register: "Neutral",
          tone: "Empathetic / Compassionate",
          register_info: {
            badge: "Neutral • Safe for Speaking & General Writing",
            is_ielts_writing_safe: false,
            guidance: "Dùng để bày tỏ sự đồng cảm chân thành trong Speaking. Trong Writing Task 2 học thuật nên dùng 'empathize with' hoặc 'show deep compassion for'."
          },
          cognitive_anchor: {
            metaphor_core: "Cảm nhận được nhịp đập đau đớn và mỏi mệt trong tâm can người khác như chính mình đang trải qua.",
            visual_equation: "Feel + For = Rung động cùng tần số cảm xúc ➔ Thấu hiểu trọn vẹn nỗi nhọc nhằn",
            origin_summary: "Tiếng Anh Trung Đại thế kỷ 14 gắn liền với quan niệm triết học về lòng trắc ẩn (compassion)."
          },
          micro_check: {
            prompt: "Khi nói 'I really feel for the flood victims', người nói muốn diễn đạt điều gì?",
            options: [
              { key: "A", text: "Người nói đồng cảm sâu sắc và rất thương xót cho hoàn cảnh mất mát của các nạn nhân lũ lụt.", is_correct: true },
              { key: "B", text: "Người nói đang chạm tay trực tiếp vào người các nạn nhân để sưởi ấm.", is_correct: false }
            ],
            feedback: "Chính xác! 'Feel for someone' là sự thấu cảm tinh thần sâu sắc."
          }
        },
        {
          id: "10_1_generousfault",
          headword: "generous to a fault",
          phonetic: "/ˈdʒen.ər.əs tuː ə fɔːlt/",
          audio_url: "/audio/idioms/unit10/id_10_1_generousfault_us.mp3",
          definition_en: "extremely generous, sometimes even to one's own disadvantage",
          context_sentence: "Semir is generous to a fault. He invited us into his home for a wonderful meal.",
          page_number: 46,
          audio_file: "id_10_1_generousfault_us.mp3",
          spoken_text: "generous to a fault. Semir is generous to a fault. He invited us into his home for a wonderful meal.",
          vietnamese: {
            meaning: "hào phóng quá mức, rộng rãi đến độ có thể gây thiệt thòi cho chính mình",
            usage_notes: "Mẫu câu '...to a fault' dùng để miêu tả một phẩm chất tốt đẹp khi bị đẩy đến mức cực đoan.",
            ielts_speaking_tip: "Từ vựng đắt giá giúp đẩy tiêu chí Lexical Resource lên Band 8.5 khi miêu tả tính cách người thân."
          },
          usage_pattern: "be generous to a fault",
          register: "Neutral / Formal",
          tone: "Admiring / Cautionary",
          register_info: {
            badge: "Formal / Neutral • Safe for Speaking & Writing",
            is_ielts_writing_safe: true,
            guidance: "Cực kỳ chuẩn mực cho cả Speaking Part 2 và Writing khi phân tích tính cách nhân vật lịch sử hoặc đạo đức xã hội."
          },
          cognitive_anchor: {
            metaphor_core: "Đức tính rộng rãi khi vượt qua điểm cân bằng vàng (Golden Mean) sẽ chạm tới ranh giới của một nhược điểm.",
            visual_equation: "Hào phóng + Vượt ngưỡng = Cho đi không tiếc tay ➔ Tự làm khó bản thân",
            origin_summary: "Văn học luân lý Anh thế kỷ 18, tiêu biểu trong tác phẩm của Oliver Goldsmith."
          },
          micro_check: {
            prompt: "Người có tính cách 'generous to a fault' có đặc điểm gì nổi bật?",
            options: [
              { key: "A", text: "Họ quá mức rộng rãi, sẵn sàng chi tiền và thết đãi người khác dù bản thân có thể chịu thiệt thòi.", is_correct: true },
              { key: "B", text: "Họ luôn tính toán chi li từng đồng và chỉ hào phóng khi có người khác nhìn thấy.", is_correct: false }
            ],
            feedback: "Chính xác! Thành ngữ diễn tả sự hào phóng tột độ không hề toan tính."
          }
        },
        {
          id: "10_1_sympatheticear",
          headword: "offered a sympathetic ear",
          phonetic: "/ˈɒf.əd ə ˌsɪm.pəˈθet.ɪk ɪər/",
          audio_url: "/audio/idioms/unit10/id_10_1_sympatheticear_us.mp3",
          definition_en: "offered to listen patiently and kindly to someone's problems",
          context_sentence: "Yoshiko offered a sympathetic ear when my cat went missing.",
          page_number: 46,
          audio_file: "id_10_1_sympatheticear_us.mp3",
          spoken_text: "offered a sympathetic ear Yoshiko offered a sympathetic ear when my cat went missing",
          vietnamese: {
            meaning: "sẵn sàng lắng nghe, kiên nhẫn làm chỗ dựa tinh thần cho người khác trút bầu tâm sự",
            usage_notes: "Có thể dùng với động từ 'lend' ('lend a sympathetic ear') hoặc 'offer'.",
            ielts_speaking_tip: "Rất thích hợp khi nói về phẩm chất quan trọng nhất của một người bạn thân (Speaking Part 1 & 2)."
          },
          usage_pattern: "offer / lend (someone) a sympathetic ear",
          register: "Neutral / Formal",
          tone: "Supportive / Caring",
          register_info: {
            badge: "Neutral • Safe for Speaking & Writing",
            is_ielts_writing_safe: true,
            guidance: "Collocation tự nhiên và trang trọng, thích hợp cho cả bài nói và bài viết miêu tả sự tư vấn tâm lý."
          },
          cognitive_anchor: {
            metaphor_core: "Nghiêng đôi tai thấu cảm về phía người đau khổ, đón nhận mọi tâm sự mà không hề phán xét.",
            visual_equation: "Đôi tai thấu cảm = Lắng nghe không phán xét ➔ Chữa lành tâm hồn",
            origin_summary: "Ẩn dụ thính giác cổ điển trong văn học phục hưng phương Tây."
          },
          micro_check: {
            prompt: "Chọn từ chính xác để hoàn thành cụm từ: 'Yoshiko offered a sympathetic _____ when I was sad.'",
            options: [
              { key: "A", text: "ear", is_correct: true },
              { key: "B", text: "listen", is_correct: false }
            ],
            feedback: "Chính xác! Cụm cố định luôn là 'a sympathetic ear', không dùng 'sympathetic listen'."
          }
        },
        {
          id: "10_1_bighearted",
          headword: "big hearted",
          phonetic: "/ˌbɪɡˈhɑː.tɪd/",
          audio_url: "/audio/idioms/unit10/id_10_1_bighearted_us.mp3",
          definition_en: "kind, warm, generous, and caring",
          context_sentence: "Alex is so big hearted. She bought me a beautiful vase for my new apartment.",
          page_number: 46,
          audio_file: "id_10_1_bighearted_us.mp3",
          spoken_text: "big hearted. Alex is so big hearted. She bought me a beautiful vase for my new apartment.",
          vietnamese: {
            meaning: "nhân hậu, rộng lượng, có tấm lòng thơm thảo và ấm áp",
            usage_notes: "Có thể viết có gạch nối 'big-hearted' hoặc viết rời. Dùng như một tính từ miêu tả phẩm chất con người.",
            ielts_speaking_tip: "Từ vựng tự nhiên thay thế cho 'very kind' hoặc 'nice' trong Speaking Part 2."
          },
          usage_pattern: "be big hearted / a big-hearted person",
          register: "Neutral / Warm",
          tone: "Affectionate",
          register_info: {
            badge: "Neutral • Safe for Speaking",
            is_ielts_writing_safe: false,
            guidance: "Trong Writing Task 2 nên dùng các thuật ngữ học thuật như 'altruistic', 'benevolent' hoặc 'philanthropic'."
          },
          cognitive_anchor: {
            metaphor_core: "Trái tim có dung lượng bao la chứa đựng tình yêu thương che chở cho mọi người.",
            visual_equation: "Trái tim to lớn = Tình thương dạt dào ➔ Luôn hướng về người khác",
            origin_summary: "Ra đời vào đầu thế kỷ 17 trong văn hóa truyền thống Anglo-Saxon ca ngợi sự hào hiệp."
          },
          micro_check: {
            prompt: "Hành động nào sau đây chứng minh một người 'big hearted'?",
            options: [
              { key: "A", text: "Tặng quà tân gia ấm áp và tận tình giúp bạn thích nghi với nơi ở mới mà không hề tính toán.", is_correct: true },
              { key: "B", text: "Luôn từ chối giúp đỡ người khác vì bận rộn với công việc cá nhân.", is_correct: false }
            ],
            feedback: "Chính xác! 'Big-hearted' là người nhân hậu và luôn quan tâm đến hạnh phúc của bạn bè."
          }
        }
      ]
    },

    // ----------------------------------------------------
    // Module 10.2: TREATING PEOPLE BADLY
    // ----------------------------------------------------
    {
      module_id: "10.2",
      module_title: "TREATING PEOPLE BADLY",
      page_number: 46,
      page_number_end: 46,
      description_en: "Idioms describing cruel, unfair, irresponsible, or disappointing treatment of friends, colleagues, and subordinates.",
      idioms: [
        {
          id: "10_2_leavelurch",
          headword: "leaving me in the lurch",
          variation: "leave someone in the lurch",
          phonetic: "/liːv ɪn ðə lɜːtʃ/",
          audio_url: "/audio/idioms/unit10/id _10_2_leavelurch_us.mp3",
          definition_en: "leaving someone to deal with a difficult situation alone and unexpectedly",
          context_sentence: "Pedro quit his job at the store, leaving me in the lurch.",
          page_number: 46,
          audio_file: "id _10_2_leavelurch_us.mp3",
          spoken_text: "leaving me in the lurch Pedro quit his job at the store leaving me in the lurch",
          vietnamese: {
            meaning: "bỏ rơi giữa cơn hoạn nạn, để mặc ai tự xoay xở với khó khăn không báo trước",
            usage_notes: "Thường dùng ở dạng phân từ ('leaving someone in the lurch') hoặc bị động ('was left in the lurch').",
            ielts_speaking_tip: "Rất hay dùng trong Speaking Part 2 khi miêu tả một sự cố làm việc nhóm không như ý."
          },
          usage_pattern: "leave someone in the lurch / be left in the lurch",
          register: "Neutral / Informal",
          tone: "Frustrated / Betrayed",
          register_info: {
            badge: "Neutral • Safe for Speaking",
            is_ielts_writing_safe: false,
            guidance: "Thành ngữ hình ảnh đắt giá cho bài thi Speaking. Trong Writing Task 2 nên dùng 'abandon someone in a predicament'."
          },
          cognitive_anchor: {
            metaphor_core: "Mắc kẹt trong thế thua trắng trên bàn cờ khi đối thủ và đồng đội đều bỏ chạy.",
            visual_equation: "Thế cờ lurch = Bị bỏ rơi không lối thoát ➔ Đơn độc gánh chịu hậu quả",
            origin_summary: "Bắt nguồn từ trò chơi xúc xắc bàn cờ cổ 'lourche' của Pháp thế kỷ 16 du nhập vào Anh."
          },
          micro_check: {
            prompt: "Nếu đồng nghiệp 'left you in the lurch during a project', chuyện gì đã xảy ra?",
            options: [
              { key: "A", text: "Họ đột ngột bỏ ngang công việc khiến bạn phải một mình gánh hết khó khăn vào phút chót.", is_correct: true },
              { key: "B", text: "Họ đã nhiệt tình hỗ trợ bạn hoàn thành xuất sắc dự án trước kỳ hạn.", is_correct: false }
            ],
            feedback: "Chính xác! 'Leave in the lurch' là bỏ mặc ai đó xoay xở trong cơn hoạn nạn."
          }
        },
        {
          id: "10_2_givehardtime",
          headword: "gave me a hard time",
          variation: "give someone a hard time",
          phonetic: "/ɡɪv ə hɑːd taɪm/",
          audio_url: "/audio/idioms/unit10/id _10_2_givehardtime_us.mp3",
          definition_en: "made someone feel guilty, criticized them, or told them off",
          context_sentence: "Phil gave me a hard time about being late for work again.",
          page_number: 46,
          audio_file: "id _10_2_givehardtime_us.mp3",
          spoken_text: "gave me a hard time Phil gave me a hard time about being late for work again",
          vietnamese: {
            meaning: "làm khó, cằn nhằn trách móc, mắng mỏ và khiến ai cảm thấy tội lỗi nặng nề",
            usage_notes: "Thường đi với giới từ 'about' ('give someone a hard time about doing something').",
            ielts_speaking_tip: "Rất phổ biến trong Speaking Part 1 khi nói về mối quan hệ giữa sếp và nhân viên hoặc bố mẹ và con cái."
          },
          usage_pattern: "give someone a hard time (about something)",
          register: "Informal",
          tone: "Reproachful",
          register_info: {
            badge: "Informal • Safe for Speaking",
            is_ielts_writing_safe: false,
            guidance: "Dùng tự nhiên trong văn nói thân mật. Trong văn viết học thuật nên thay bằng 'reprimand' hoặc 'subject someone to severe scrutiny'."
          },
          cognitive_anchor: {
            metaphor_core: "Biến khoảng thời gian của ai đó thành một trải nghiệm ngột ngạt, nặng trĩu áp lực chỉ trích.",
            visual_equation: "Hard time = Khoảng thời gian nặng nề ➔ Trách móc khiến đối phương dằn vặt",
            origin_summary: "Tiếng Anh Mỹ thế kỷ 19, ban đầu liên quan đến lao động khổ sai (serving hard time)."
          },
          micro_check: {
            prompt: "Chọn phương án dùng đúng thành ngữ: 'Phil gave me a _____ time about being late.'",
            options: [
              { key: "A", text: "hard", is_correct: true },
              { key: "B", text: "nasty", is_correct: false }
            ],
            feedback: "Chính xác! Cụm thành ngữ chuẩn luôn là 'give someone a hard time', không dùng 'nasty time'."
          }
        },
        {
          id: "10_2_treatdirt",
          headword: "treats them like dirt",
          variation: "treat someone like dirt",
          phonetic: "/triːts laɪk dɜːt/",
          audio_url: "/audio/idioms/unit10/id _10_2_treatdirt_us.mp3",
          definition_en: "treats people very badly, with utter disrespect and contempt",
          context_sentence: "The boss makes the trainees stay until 11 most nights. She treats them like dirt!",
          page_number: 46,
          audio_file: "id _10_2_treatdirt_us.mp3",
          spoken_text: "treats them like dirt The boss makes the trainees stay until 11 most nights. She treats them like dirt!",
          vietnamese: {
            meaning: "đối xử tệ bạc, coi khinh như rác rưởi, không dành chút tôn trọng tối thiểu",
            usage_notes: "Mang sắc thái lên án mạnh mẽ hành vi bóc lột hoặc ngược đãi tại nơi làm việc.",
            ielts_speaking_tip: "Dùng để diễn tả môi trường làm việc độc hại (toxic workplace culture) trong Speaking Part 3."
          },
          usage_pattern: "treat someone like dirt",
          register: "Informal / Emphatic",
          tone: "Indignant",
          register_info: {
            badge: "Informal / Strong • Safe for Speaking",
            is_ielts_writing_safe: false,
            guidance: "Mang tính biểu cảm cao, phù hợp với Speaking Part 3. Trong Writing Task 2 nên dùng 'exploit subordinates' hoặc 'mistreat staff egregiously'."
          },
          cognitive_anchor: {
            metaphor_core: "Giẫm đạp lên phẩm giá con người như đám bùn đất dơ bẩn dưới chân.",
            visual_equation: "Như bùn đất = Coi rẻ phẩm giá ➔ Bóc lột và khinh miệt",
            origin_summary: "Văn học phê phán xã hội Anh thế kỷ 18 tố cáo sự tàn bạo của tầng lớp quý tộc kiêu ngạo."
          },
          micro_check: {
            prompt: "Hành vi người quản lý bắt thực tập sinh làm thêm tới đêm muộn mà không trả lương thể hiện điều gì?",
            options: [
              { key: "A", text: "She treats them like dirt (Đối xử tệ bạc coi thường họ).", is_correct: true },
              { key: "B", text: "She is generous to a fault (Hào phóng quá mức với họ).", is_correct: false }
            ],
            feedback: "Chính xác! Bóc lột và thiếu tôn trọng là biểu hiện điển hình của 'treat someone like dirt'."
          }
        },
        {
          id: "10_2_belowbelt",
          headword: "below the belt",
          phonetic: "/bɪˈləʊ ðə belt/",
          audio_url: "/audio/idioms/unit10/id _10_2_belowbelt_us.mp3",
          definition_en: "unnecessarily cruel, unfair, or violating recognized ethical rules",
          context_sentence: "Laughing at Sandy's new dress was below the belt.",
          page_number: 46,
          audio_file: "id _10_2_belowbelt_us.mp3",
          spoken_text: "below the belt Laughing at Sandy's new dress was below the belt.",
          vietnamese: {
            meaning: "chơi xấu, đòn hiểm ác ý, lời nhận xét tàn nhẫn vi phạm quy tắc công bằng",
            usage_notes: "Thường dùng làm vị ngữ ('that comment was below the belt') hoặc bổ nghĩa ('a below-the-belt remark').",
            ielts_speaking_tip: "Thành ngữ ấn tượng khi thảo luận về ranh giới đạo đức trong tranh luận hoặc cạnh tranh thương mại."
          },
          usage_pattern: "be below the belt / a below-the-belt remark",
          register: "Neutral / Idiomatic",
          tone: "Critical / Disapproving",
          register_info: {
            badge: "Neutral • Safe for Speaking & Writing",
            is_ielts_writing_safe: true,
            guidance: "Thành ngữ văn hóa phổ biến, hoàn toàn chấp nhận được trong Writing khi bàn về chiến thuật chính trị hay quảng cáo cạnh tranh không lành mạnh."
          },
          cognitive_anchor: {
            metaphor_core: "Cú đấm phạm quy hiểm hóc giáng vào vùng hạ bộ dưới thắt lưng võ sĩ quyền Anh.",
            visual_equation: "Dưới thắt lưng = Đòn hiểm phạm quy ➔ Tấn công ác ý vào điểm yếu",
            origin_summary: "Bộ luật quyền Anh Queensberry năm 1867 nghiêm cấm hành vi đấm dưới thắt lưng."
          },
          micro_check: {
            prompt: "Tại sao việc chê bai một khuyết tật cơ thể trong một cuộc tranh luận lại bị gọi là 'below the belt'?",
            options: [
              { key: "A", text: "Vì đó là hành vi công kích cá nhân tàn nhẫn và hèn hạ, vi phạm đạo đức tranh biện công bằng.", is_correct: true },
              { key: "B", text: "Vì lời nói đó khiến người kia bị tuột thắt lưng quần.", is_correct: false }
            ],
            feedback: "Chính xác! 'Below the belt' chỉ những đòn tấn công bất công và tàn nhẫn."
          }
        },
        {
          id: "10_2_letdown",
          headword: "let us down",
          variation: "let someone down",
          phonetic: "/let daʊn/",
          audio_url: "/audio/idioms/unit10/id _10_2_letdown_us.mp3",
          definition_en: "disappointed someone, or failed to support them as promised",
          context_sentence: "Selma let us down when she canceled the concert at the last minute.",
          page_number: 46,
          audio_file: "id _10_2_letdown_us.mp3",
          spoken_text: "let us down Selma let us down when she canceled the concert at the last minute",
          vietnamese: {
            meaning: "làm thất vọng tràn trề, không làm tròn kỳ vọng hoặc không giữ lời hứa",
            usage_notes: "Cụm động từ tách rời: 'let someone down'. Danh từ ghép là 'a letdown' (sự thất vọng).",
            ielts_speaking_tip: "Cực kỳ hữu ích trong Speaking Part 2 khi kể về một trải nghiệm mua sắm hoặc du lịch thất bại."
          },
          usage_pattern: "let someone down",
          register: "Neutral",
          tone: "Disappointed",
          register_info: {
            badge: "Neutral • Safe for Speaking & General Writing",
            is_ielts_writing_safe: true,
            guidance: "Rất chuẩn mực trong văn nói và viết. Trong bài luận trang trọng có thể dùng thêm 'fail to meet expectations' hoặc 'disappoint supporters'."
          },
          cognitive_anchor: {
            metaphor_core: "Thả sợi dây neo giữ niềm hy vọng xuống khiến mọi sự sụp đổ xuống mặt đất.",
            visual_equation: "Buông dây = Rơi tự do ➔ Hụt hẫng thất vọng tột cùng",
            origin_summary: "Thuật ngữ ngành hàng hải Anh thời kỳ Phục hưng liên quan đến việc hạ dây neo buồm."
          },
          micro_check: {
            prompt: "Khi một ca sĩ hủy buổi biểu diễn vào phút chót mà không có lý do chính đáng, khán giả sẽ cảm thấy thế nào?",
            options: [
              { key: "A", text: "They feel that the artist has let them down.", is_correct: true },
              { key: "B", text: "They feel that the artist has lent them a hand.", is_correct: false }
            ],
            feedback: "Chính xác! 'Let someone down' là làm ai đó thất vọng sâu sắc vì bội ước."
          }
        }
      ]
    },

    // ----------------------------------------------------
    // Module 10.3: TEASING PEOPLE
    // ----------------------------------------------------
    {
      module_id: "10.3",
      module_title: "TEASING PEOPLE",
      page_number: 47,
      page_number_end: 47,
      description_en: "Idioms used to describe making fun of, teasing, playing practical jokes on, or playfully mocking friends and acquaintances.",
      idioms: [
        {
          id: "10_3_pokefun",
          headword: "poked fun at",
          variation: "poke fun at",
          phonetic: "/pəʊk fʌn æt/",
          audio_url: "/audio/idioms/unit10/id _10_3_pokefun_us.mp3",
          definition_en: "laughed at, mocked, or made jokes about someone or something",
          context_sentence: "Paulina poked fun at Mirek's new hairstyle.",
          page_number: 47,
          audio_file: "id _10_3_pokefun_us.mp3",
          spoken_text: "poked fun at Paulina poked fun at Merrick's new hairstyle",
          vietnamese: {
            meaning: "châm chọc, giễu cợt, đem ai hoặc cái gì ra làm trò cười",
            usage_notes: "Thường đi kèm giới từ 'at' ('poke fun at someone / something').",
            ielts_speaking_tip: "Rất hay dùng khi nói về khiếu hài hước hoặc văn hóa trêu đùa giữa bạn bè (Speaking Part 1)."
          },
          usage_pattern: "poke fun at someone / something",
          register: "Neutral / Informal",
          tone: "Mocking / Playful",
          register_info: {
            badge: "Neutral • Safe for Speaking",
            is_ielts_writing_safe: false,
            guidance: "Rất tự nhiên cho Speaking. Trong Writing học thuật nên dùng 'ridicule', 'satirize' hoặc 'deride'."
          },
          cognitive_anchor: {
            metaphor_core: "Lấy que chọc chọc vào sườn người khác để kích động và xem phản ứng của họ.",
            visual_equation: "Chọc que = Kích động trêu ghẹo ➔ Biến đối phương thành tâm điểm cười cợt",
            origin_summary: "Tiếng Anh đầu thế kỷ 19 thời kỳ Nhiếp chính (Regency era)."
          },
          micro_check: {
            prompt: "Chọn câu thành ngữ chính xác: 'Paulina _____ at Mirek's new hairstyle.'",
            options: [
              { key: "A", text: "poked fun", is_correct: true },
              { key: "B", text: "poked laughs", is_correct: false }
            ],
            feedback: "Chính xác! Thành ngữ chuẩn luôn là 'poke fun at', không dùng 'poke laughs'."
          }
        },
        {
          id: "10_3_ribbedme",
          headword: "ribbed me",
          variation: "rib someone",
          phonetic: "/rɪbd miː/",
          audio_url: "/audio/idioms/unit10/id _10_3_ribbedme_us.mp3",
          definition_en: "teased someone good-naturedly or poked friendly fun at them",
          context_sentence: "My friends ribbed me for having such an old phone.",
          page_number: 47,
          audio_file: "id _10_3_ribbedme_us.mp3",
          spoken_text: "ribbed me my friends ribbed me for having such an old phone",
          vietnamese: {
            meaning: "trêu ghẹo, chọc quê một cách vui vẻ và thân mật giữa bạn bè chí cốt",
            usage_notes: "Thường gặp trong tiếng Anh Mỹ (US). Đi với giới từ 'for' hoặc 'about'.",
            ielts_speaking_tip: "Từ vựng bản ngữ đắt giá giúp bài nói Speaking Part 1 thể hiện độ tự nhiên tuyệt đối."
          },
          usage_pattern: "rib someone (for / about something)",
          register: "Informal (US)",
          tone: "Good-natured / Playful",
          register_info: {
            badge: "Informal (US) • Safe for Speaking",
            is_ielts_writing_safe: false,
            guidance: "Đặc trưng tiếng Anh Mỹ thân mật, chỉ dùng cho Speaking, không dùng trong văn viết học thuật."
          },
          cognitive_anchor: {
            metaphor_core: "Thúc nhẹ cùi chỏ vào mạng sườn (ribs) bạn bè trong lúc cùng nhau cười đùa.",
            visual_equation: "Thúc vào sườn = Cử chỉ thân mật ➔ Trêu đùa tật xấu vô hại",
            origin_summary: "Tiếng lóng của sinh viên Mỹ thập niên 1920 (Roaring Twenties)."
          },
          micro_check: {
            prompt: "Khi bạn bè 'ribbed you for your old phone', thái độ của họ như thế nào?",
            options: [
              { key: "A", text: "Họ trêu đùa vui vẻ, vô hại giữa những người bạn thân chứ không có ý ác ý xúc phạm.", is_correct: true },
              { key: "B", text: "Họ ghét bỏ và cô lập bạn khỏi nhóm chơi vì chiếc điện thoại cũ.", is_correct: false }
            ],
            feedback: "Chính xác! 'Rib someone' là sự trêu chọc thân mật, vui vẻ."
          }
        },
        {
          id: "10_3_pullingleg",
          headword: "pulling my leg",
          variation: "pull someone's leg",
          phonetic: "/ˈpʊl.ɪŋ maɪ leɡ/",
          audio_url: "/audio/idioms/unit10/id _10_3_pullingleg_us.mp3",
          definition_en: "joking, teasing, or telling an untrue story just for fun",
          context_sentence: "Aziz told me he'd crashed my car, but he was pulling my leg.",
          page_number: 47,
          audio_file: "id _10_3_pullingleg_us.mp3",
          spoken_text: "pulling my leg Aziz told me he'd crashed my car but he was pulling my leg",
          vietnamese: {
            meaning: "nói đùa, bịa chuyện trêu ngươi, gạt chơi cho vui",
            usage_notes: "Rất thường dùng trong thì tiếp diễn ('Are you pulling my leg?' / 'He was just pulling my leg').",
            ielts_speaking_tip: "Idiom kinh điển ghi điểm tức thì trong IELTS Speaking khi kể lại một câu chuyện hiểu lầm hài hước."
          },
          usage_pattern: "pull someone's leg",
          register: "Informal",
          tone: "Jocular",
          register_info: {
            badge: "Informal • Safe for Speaking",
            is_ielts_writing_safe: false,
            guidance: "Tuyệt đối an toàn và rất tự nhiên trong Speaking. Trong Writing Task 2 nên dùng 'fabricate a story playfully'."
          },
          cognitive_anchor: {
            metaphor_core: "Kéo chân làm người khác bước hụt ngã bổ chửng vào cạm bẫy câu chuyện giả định.",
            visual_equation: "Kéo chân = Bước hụt nhẹ dạ ➔ Bật cười khi nhận ra bị lừa vui",
            origin_summary: "Tiếng lóng đường phố London và Mỹ vào nửa sau thế kỷ 19 (thập niên 1880)."
          },
          micro_check: {
            prompt: "Chọn câu thành ngữ chính xác: 'Aziz told me he crashed my car, but he was pulling my _____.'",
            options: [
              { key: "A", text: "leg", is_correct: true },
              { key: "B", text: "arm", is_correct: false }
            ],
            feedback: "Chính xác! Thành ngữ chuẩn luôn là 'pull someone's leg', không có 'pull someone's arm'."
          }
        },
        {
          id: "10_3_practicaljokes",
          headword: "practical jokes",
          variation: "play a practical joke on someone",
          phonetic: "/ˌpræk.tɪ.kəl ˈdʒəʊks/",
          audio_url: "/audio/idioms/unit10/id _10_3_practicaljokes_us.mp3",
          definition_en: "tricks or pranks played on people to make them look foolish",
          context_sentence: "Brad loves playing practical jokes on his brother.",
          page_number: 47,
          audio_file: "id _10_3_practicaljokes_us.mp3",
          spoken_text: "practical jokes Brad loves playing practical jokes on his brother",
          vietnamese: {
            meaning: "trò chơi khăm, trò đùa tai quái bằng hành vi vật lý thực tế để biến ai thành trò cười",
            usage_notes: "Thường đi kèm với động từ 'play' ('play practical jokes on someone').",
            ielts_speaking_tip: "Thích hợp khi nói về thời thơ ấu hoặc mối quan hệ anh chị em trong nhà (Speaking Part 1 & 2)."
          },
          usage_pattern: "play practical jokes on someone",
          register: "Neutral",
          tone: "Mischievous",
          register_info: {
            badge: "Neutral • Safe for Speaking & Writing",
            is_ielts_writing_safe: true,
            guidance: "Cụm danh từ chuẩn mực trong từ điển, hoàn toàn có thể dùng trong Writing khi bàn về tâm lý học hành vi hoặc văn hóa ngày Cá tháng Tư."
          },
          cognitive_anchor: {
            metaphor_core: "Một trò đùa thực hành (practical) dàn dựng hiện trường thực tế thay vì chỉ nói mồm.",
            visual_equation: "Trò đùa thực tế = Dàn dựng cảnh ngớ ngẩn ➔ Tạo tiếng cười châm biếm",
            origin_summary: "Văn học Anh đầu thế kỷ 18 gắn với truyền thống ngày Cá tháng Tư (April Fools)."
          },
          micro_check: {
            prompt: "Hành động lén dán mẩu giấy 'Hãy vỗ vai tôi' sau lưng đồng nghiệp được gọi là gì?",
            options: [
              { key: "A", text: "Playing a practical joke on a colleague.", is_correct: true },
              { key: "B", text: "Offering a sympathetic ear to a colleague.", is_correct: false }
            ],
            feedback: "Chính xác! Đây là ví dụ điển hình của một 'practical joke' (trò chơi khăm)."
          }
        }
      ]
    },

    // ----------------------------------------------------
    // Module 10.4: EXPRESSIONS WITH BEHAVE AND BEHAVIOR
    // ----------------------------------------------------
    {
      module_id: "10.4",
      module_title: "EXPRESSIONS WITH 'BEHAVE' AND 'BEHAVIOR'",
      page_number: 47,
      page_number_end: 47,
      description_en: "Essential expressions, collocations, and idiomatic phrases built with the core words 'behave' and 'behavior' to describe standards of conduct.",
      idioms: [
        {
          id: "10_4_wellbehaved",
          headword: "well behaved",
          variation: "well-behaved",
          phonetic: "/ˌwel.bɪˈheɪvd/",
          audio_url: "/audio/idioms/unit10/id _10_4_wellbehaved_us.mp3",
          definition_en: "polite, obedient, and conducting oneself properly",
          context_sentence: "The children were very well behaved during the performance.",
          page_number: 47,
          audio_file: "id _10_4_wellbehaved_us.mp3",
          spoken_text: "well behaved The children were very well behaved during the performance.",
          vietnamese: {
            meaning: "ngoan ngoãn, lễ phép, cư xử đúng mực và biết điều",
            usage_notes: "Thường dùng làm tính từ trước danh từ ('well-behaved children') hoặc sau to be ('were well behaved').",
            ielts_speaking_tip: "Từ vựng chuẩn mực để miêu tả trẻ em hoặc thú cưng trong Speaking Part 1 và 2."
          },
          usage_pattern: "be well behaved / a well-behaved child",
          register: "Neutral / Formal",
          tone: "Appreciative",
          register_info: {
            badge: "Formal / Neutral • Safe for Writing & Speaking",
            is_ielts_writing_safe: true,
            guidance: "Cực kỳ chuẩn mực cho cả Speaking và Writing Task 2 trong các chủ đề nuôi dạy con cái (parenting) và kỷ luật học đường."
          },
          cognitive_anchor: {
            metaphor_core: "Khả năng tự kiểm soát tốt các xung động bốc đồng theo chuẩn mực giáo dục chỉn chu.",
            visual_equation: "Kiểm soát bản thân = Tuân thủ kỷ luật ➔ Thái độ ngoan ngoãn đúng mực",
            origin_summary: "Sách phép tắc phong nhã của giới quý tộc Tudor nước Anh thế kỷ 16-17."
          },
          micro_check: {
            prompt: "Trong rạp hát, những đứa trẻ ngồi im chăm chú theo dõi kịch và không la hét được miêu tả là:",
            options: [
              { key: "A", text: "very well behaved", is_correct: true },
              { key: "B", text: "badly behaved", is_correct: false }
            ],
            feedback: "Chính xác! Lễ phép và giữ trật tự nơi công cộng là biểu hiện của 'well behaved'."
          }
        },
        {
          id: "10_4_behavebeautif",
          headword: "behaved beautifully",
          phonetic: "/bɪˈheɪvd ˈbjuː.tɪ.fəl.i/",
          audio_url: "/audio/idioms/unit10/id _10_4_behavebeautif_us.mp3",
          definition_en: "behaved perfectly, impeccably, and delightfully",
          context_sentence: "My dog behaved beautifully when I took him on the train.",
          page_number: 47,
          audio_file: "id _10_4_behavebeautif_us.mp3",
          spoken_text: "behaved beautifully My dog behaved beautifully when I took him on the train.",
          vietnamese: {
            meaning: "cư xử hoàn hảo không chê vào đâu được, ngoan ngoãn tuyệt vời",
            usage_notes: "'Beautifully' nâng tầm mức độ ngoan ngoãn lên mức tạo ra sự hài lòng tuyệt đối cho người xung quanh.",
            ielts_speaking_tip: "Collocation tự nhiên giúp nâng cao điểm Fluency & Lexical trong Speaking Part 2."
          },
          usage_pattern: "behave beautifully",
          register: "Neutral / Polite",
          tone: "Proud / Delighted",
          register_info: {
            badge: "Neutral • Safe for Speaking & Writing",
            is_ielts_writing_safe: true,
            guidance: "Cụm trạng từ tự nhiên và lịch thiệp, an toàn 100% trong mọi bối cảnh giao tiếp và bài thi IELTS."
          },
          cognitive_anchor: {
            metaphor_core: "Hành vi trơn tru, hài hòa đẹp đẽ như một bản nhạc không có nốt lỗi.",
            visual_equation: "Hành xử đẹp = Hoàn hảo không tì vết ➔ Mang lại sự an tâm tuyệt đối",
            origin_summary: "Văn hóa giao tiếp quý phái thời Victoria coi lễ nghi đúng mực là cái đẹp cao quý nhất."
          },
          micro_check: {
            prompt: "Khi nói 'My dog behaved beautifully on the train', người nói ngụ ý điều gì?",
            options: [
              { key: "A", text: "Chú chó cư xử cực kỳ ngoan, không sủa hay quậy phá làm phiền hành khách khác.", is_correct: true },
              { key: "B", text: "Chú chó được mặc quần áo lộng lẫy khi đi tàu.", is_correct: false }
            ],
            feedback: "Chính xác! 'Behave beautifully' là cư xử hoàn hảo, ngoan ngoãn."
          }
        },
        {
          id: "10_4_badlybehaved",
          headword: "badly behaved",
          variation: "badly-behaved",
          phonetic: "/ˌbæd.li bɪˈheɪvd/",
          audio_url: "/audio/idioms/unit10/id _10_4_badlybehaved_us.mp3",
          definition_en: "naughty, disobedient, disruptive, and poorly mannered",
          context_sentence: "Henry can't control his badly behaved students.",
          page_number: 47,
          audio_file: "id _10_4_badlybehaved_us.mp3",
          spoken_text: "badly behaved Henry can't control his badly behaved students.",
          vietnamese: {
            meaning: "ngỗ nghịch, hư đốn, bất hảo, hành xử vô lễ và không chịu vâng lời",
            usage_notes: "Thường dùng trước danh từ ('badly behaved students/children') để chỉ nhóm đối tượng khó bảo.",
            ielts_speaking_tip: "Chủ đề giáo dục và kỷ luật học sinh trong Speaking Part 3 và Writing Task 2."
          },
          usage_pattern: "be badly behaved / badly-behaved children",
          register: "Neutral / Formal",
          tone: "Critical",
          register_info: {
            badge: "Formal / Neutral • Safe for Writing & Speaking",
            is_ielts_writing_safe: true,
            guidance: "Rất phổ biến trong IELTS Writing Task 2 khi thảo luận về tình trạng bạo lực học đường hoặc kỷ luật gia đình."
          },
          cognitive_anchor: {
            metaphor_core: "Hành vi phá vỡ quy chuẩn trật tự, gây rối loạn không gian chung.",
            visual_equation: "Mất kiểm soát hành vi = Phá vỡ kỷ cương ➔ Ngỗ nghịch, khó bảo",
            origin_summary: "Các văn bản tư pháp và quy chế học viện tại Anh từ thế kỷ 17."
          },
          micro_check: {
            prompt: "Một giáo viên phải đối mặt với những học sinh liên tục nói chuyện riêng, vứt rác và không làm bài tập. Giáo viên đó sẽ gọi các em là:",
            options: [
              { key: "A", text: "badly behaved students", is_correct: true },
              { key: "B", text: "big hearted students", is_correct: false }
            ],
            feedback: "Chính xác! 'Badly behaved' là tính từ miêu tả hành vi ngỗ nghịch, bất hảo."
          }
        },
        {
          id: "10_4_bestbevior",
          headword: "on my best behavior",
          variation: "on one's best behavior",
          phonetic: "/ɒn maɪ best bɪˈheɪ.vjər/",
          audio_url: "/audio/idioms/unit10/id _10_4_bestbevior_us.mp3",
          definition_en: "behaving extremely well, politely, and cautiously to make a good impression",
          context_sentence: "I was on my best behavior when I met my boyfriend's parents.",
          page_number: 47,
          audio_file: "id _10_4_bestbevior_us.mp3",
          spoken_text: "on my best behavior I was on my best behavior when I met my boyfriend's parents",
          vietnamese: {
            meaning: "cư xử cực kỳ lễ phép, giữ gìn ý tứ tối đa để gây ấn tượng tốt đẹp",
            usage_notes: "Cấu trúc: 'be on one's best behavior'.",
            ielts_speaking_tip: "Tuyệt vời cho Speaking Part 2 khi kể về lần đầu tiên đi phỏng vấn xin việc hoặc ra mắt phụ huynh."
          },
          usage_pattern: "be on one's best behavior",
          register: "Neutral",
          tone: "Careful / Respectful",
          register_info: {
            badge: "Neutral • Safe for Speaking & Writing",
            is_ielts_writing_safe: true,
            guidance: "Thành ngữ chuẩn mực, rất tự nhiên khi miêu tả tâm lý giữ gìn hình ảnh trong các sự kiện ngoại giao hay ra mắt."
          },
          cognitive_anchor: {
            metaphor_core: "Trưng bày phiên bản đạo đức hoàn thiện nhất của bản thân trước ánh nhìn người khác.",
            visual_equation: "Best behavior = Giữ gìn ý tứ tối đa ➔ Gây ấn tượng tôn trọng sâu sắc",
            origin_summary: "Bắt nguồn từ án lệnh pháp lý thế kỷ 18 'bound over to good behavior'."
          },
          micro_check: {
            prompt: "Chọn câu chính xác: 'I was on my _____ behavior when I met my boyfriend's parents.'",
            options: [
              { key: "A", text: "best", is_correct: true },
              { key: "B", text: "good", is_correct: false }
            ],
            feedback: "Chính xác! Cụm cố định tạo ấn tượng tốt luôn là 'on my best behavior'."
          }
        },
        {
          id: "10_4_outofcharacter",
          headword: "behaved out of character",
          variation: "out of character",
          phonetic: "/aʊt əv ˈkær.ək.tər/",
          audio_url: "/audio/idioms/unit10/id _10_4_outofcharacter_us.mp3",
          definition_en: "behaved in an unusual way, not typical of someone's usual personality",
          context_sentence: "Jean behaved out of character at the office party. She's normally so quiet!",
          page_number: 47,
          audio_file: "id _10_4_outofcharacter_us.mp3",
          spoken_text: "behaved out of character Jean behaved out of character at the office party. She's normally so quiet!",
          vietnamese: {
            meaning: "hành xử khác thường, trái ngược hoàn toàn với phong thái và tính cách thường ngày",
            usage_notes: "Thường dùng: 'be out of character' hoặc 'behave out of character'. Trái nghĩa là 'in character'.",
            ielts_speaking_tip: "Rất hay dùng trong Speaking Part 2 khi miêu tả một sự việc bất ngờ xảy ra với một người bạn."
          },
          usage_pattern: "behave out of character / be out of character for someone",
          register: "Neutral / Formal",
          tone: "Surprised / Observant",
          register_info: {
            badge: "Formal / Neutral • Safe for Writing & Speaking",
            is_ielts_writing_safe: true,
            guidance: "Cực kỳ chuẩn mực cho cả bài viết Task 2 và bài nói Speaking, thể hiện năng lực phân tích tính cách sâu sắc."
          },
          cognitive_anchor: {
            metaphor_core: "Diễn viên trên sân khấu bỗng dưng nói năng trật khỏi kịch bản vai diễn quen thuộc.",
            visual_equation: "Rời khỏi vai diễn = Chệch tính cách thường nhật ➔ Hành vi gây ngạc nhiên",
            origin_summary: "Thuật ngữ sân khấu kịch nghệ Shakespeare thế kỷ 16-17."
          },
          micro_check: {
            prompt: "Một người đồng nghiệp vốn luôn điềm đạm bỗng nhiên nổi giận quát tháo. Hành vi đó được gọi là:",
            options: [
              { key: "A", text: "completely out of character", is_correct: true },
              { key: "B", text: "completely out of person", is_correct: false }
            ],
            feedback: "Chính xác! Cụm cố định chuẩn là 'out of character'."
          }
        },
        {
          id: "10_4_unacceptbehav",
          headword: "unacceptable behavior",
          phonetic: "/ˌʌn.əkˈsep.tə.bəl bɪˈheɪ.vjər/",
          audio_url: "/audio/idioms/unit10/id _10_4_unacceptbehav_us.mp3",
          definition_en: "bad, offensive, disruptive, or intolerable behavior that breaks social rules",
          context_sentence: "Margo explained to her daughter that drawing on the walls was unacceptable behavior.",
          page_number: 47,
          audio_file: "id _10_4_unacceptbehav_us.mp3",
          spoken_text: "unacceptable behavior Margo explained to her daughter that drawing on the walls was unacceptable behavior",
          vietnamese: {
            meaning: "hành vi không thể chấp nhận được, vi phạm quy chuẩn đạo đức hoặc nội quy",
            usage_notes: "Collocation mang tính chính luận và học thuật rất cao.",
            ielts_speaking_tip: "Cụm danh từ chủ chốt cho Writing Task 2 trong chủ đề Luật pháp, Tội phạm và Nội quy học đường."
          },
          usage_pattern: "unacceptable behavior",
          register: "Formal",
          tone: "Firm / Authoritative",
          register_info: {
            badge: "Formal • 100% Safe for Writing & Speaking",
            is_ielts_writing_safe: true,
            guidance: "Cực kỳ chuẩn xác, trang trọng và đạt điểm tối đa cho tiêu chí Academic Collocation trong Writing Task 2."
          },
          cognitive_anchor: {
            metaphor_core: "Vượt qua lằn ranh đỏ của quy ước cộng đồng, bị từ chối tiếp nhận thẳng thừng.",
            visual_equation: "Không thể chấp nhận = Vi phạm lằn ranh đạo đức ➔ Cần chấn chỉnh",
            origin_summary: "Quy chuẩn quản trị hành chính và pháp luật dân sự phương Tây thế kỷ 19."
          },
          micro_check: {
            prompt: "Việc vẽ bậy phá hoại các di tích lịch sử được pháp luật xếp vào loại hành vi nào?",
            options: [
              { key: "A", text: "Unacceptable behavior (Hành vi không thể chấp nhận được).", is_correct: true },
              { key: "B", text: "Best behavior (Hành vi mẫu mực).", is_correct: false }
            ],
            feedback: "Chính xác! Phá hoại tài sản công cộng là 'unacceptable behavior'."
          }
        }
      ]
    }
  ],

  // ----------------------------------------------------
  // Interactive Exercises for Unit 10
  // ----------------------------------------------------
  exercises: [
    // Exercise 10.5: Mark the sentences that are correct
    {
      exercise_id: "10.5",
      exercise_type: "MULTIPLE_CHOICE_CONTEXT",
      instruction: "MARK THE SENTENCES THAT ARE CORRECT",
      description: "Chọn câu thành ngữ có cách dùng từ chính xác • Bám sát Exercise 10.5 trang 48 & Answer Key trang 228 sách gốc DK",
      questions: [
        {
          question_number: 1,
          prompt: "Which sentence correctly uses the idiom about listening kindly to problems?",
          options: [
            { key: "A", text: "Yoshiko offered a sympathetic listen when my cat went missing." },
            { key: "B", text: "Yoshiko offered a sympathetic ear when my cat went missing." }
          ],
          correct_key: "B",
          explanation: "Thành ngữ chuẩn xác luôn là 'offered a sympathetic ear', không dùng từ 'listen'."
        },
        {
          question_number: 2,
          prompt: "Which sentence correctly expresses playful teasing / joking?",
          options: [
            { key: "A", text: "Aziz told me he'd crashed my car, but he was pulling my leg." },
            { key: "B", text: "Aziz told me he'd crashed my car, but he was pulling my arm." }
          ],
          correct_key: "A",
          explanation: "Thành ngữ đùa cợt trêu ngươi chuẩn là 'pulling my leg', không dùng 'pulling my arm'."
        },
        {
          question_number: 3,
          prompt: "Which sentence correctly describes being extremely polite to make a good impression?",
          options: [
            { key: "A", text: "I was on my good behavior when I met my boyfriend's parents." },
            { key: "B", text: "I was on my best behavior when I met my boyfriend's parents." }
          ],
          correct_key: "B",
          explanation: "Thành ngữ cố định chuẩn xác là 'on my best behavior'."
        },
        {
          question_number: 4,
          prompt: "Which sentence correctly describes being abandoned unexpectedly in a difficult situation?",
          options: [
            { key: "A", text: "Pedro quit his job at the store, leaving me in the dumps." },
            { key: "B", text: "Pedro quit his job at the store, leaving me in the lurch." }
          ],
          correct_key: "B",
          explanation: "Thành ngữ chuẩn bỏ rơi giữa cơn hoạn nạn là 'leaving me in the lurch'. ('Down in the dumps' chỉ cảm giác buồn bã)."
        },
        {
          question_number: 5,
          prompt: "Which sentence correctly describes behaving in an unusual way for that person?",
          options: [
            { key: "A", text: "Jean behaved out of character at the office party. She's normally so quiet!" },
            { key: "B", text: "Jean behaved out of person at the office party. She's normally so quiet!" }
          ],
          correct_key: "A",
          explanation: "Thành ngữ chuẩn xác bắt nguồn từ kịch nghệ là 'out of character', không có 'out of person'."
        },
        {
          question_number: 6,
          prompt: "Which sentence correctly describes mocking someone's appearance?",
          options: [
            { key: "A", text: "Paulina poked laughs at Mirek's new hairstyle." },
            { key: "B", text: "Paulina poked fun at Mirek's new hairstyle." }
          ],
          correct_key: "B",
          explanation: "Thành ngữ chuẩn châm chọc ai là 'poked fun at', không dùng 'poked laughs'."
        }
      ]
    },

    // Exercise 10.6: Write the idioms into the correct groups
    {
      exercise_id: "10.6",
      exercise_type: "DEFINITION_MATCHING",
      instruction: "WRITE THE IDIOMS FROM THE PANEL IN THE CORRECT GROUPS",
      description: "Phân loại các thành ngữ vào 2 nhóm hành vi tốt và xấu • Bám sát Exercise 10.6 trang 48 & Answer Key trang 228 sách gốc DK",
      questions: [
        {
          question_number: 1,
          term: "generous to a fault",
          target_definition: "GOOD BEHAVIOR",
          explanation: "Hào phóng, rộng lượng hết mình với bạn bè là hành vi tốt đẹp (Good behavior)."
        },
        {
          question_number: 2,
          term: "behaved beautifully",
          target_definition: "GOOD BEHAVIOR",
          explanation: "Cư xử ngoan ngoãn, lịch thiệp và hoàn hảo thuộc nhóm hành vi tốt (Good behavior)."
        },
        {
          question_number: 3,
          term: "big hearted",
          target_definition: "GOOD BEHAVIOR",
          explanation: "Tấm lòng nhân ái, ấm áp và luôn giúp đỡ người khác thuộc nhóm hành vi tốt (Good behavior)."
        },
        {
          question_number: 4,
          term: "lend a hand",
          target_definition: "GOOD BEHAVIOR",
          explanation: "Chung tay giúp đỡ người khác thuộc nhóm hành vi tốt (Good behavior)."
        },
        {
          question_number: 5,
          term: "below the belt",
          target_definition: "BAD BEHAVIOR",
          explanation: "Công kích cá nhân ác ý và tàn nhẫn thuộc nhóm hành vi xấu (Bad behavior)."
        },
        {
          question_number: 6,
          term: "treats them like dirt",
          target_definition: "BAD BEHAVIOR",
          explanation: "Đối xử tệ bạc, khinh miệt và bóc lột người khác thuộc nhóm hành vi xấu (Bad behavior)."
        },
        {
          question_number: 7,
          term: "let us down",
          target_definition: "BAD BEHAVIOR",
          explanation: "Bội ước và làm thất vọng tràn trề thuộc nhóm hành vi xấu (Bad behavior)."
        },
        {
          question_number: 8,
          term: "unacceptable behavior",
          target_definition: "BAD BEHAVIOR",
          explanation: "Hành vi vi phạm chuẩn mực đạo đức xã hội thuộc nhóm hành vi xấu (Bad behavior)."
        }
      ]
    },

    // Exercise 10.7: Listen to the audio, then number the sentences
    {
      exercise_id: "10.7",
      exercise_type: "SITUATIONAL_JUDGMENT",
      instruction: "LISTEN TO THE AUDIO, THEN NUMBER THE SENTENCES IN THE ORDER YOU HEAR THEM",
      description: "Nghe các đoạn âm thanh và xác định đúng thứ tự câu • Bám sát Exercise 10.7 trang 49 & Answer Key trang 228",
      questions: [
        {
          question_number: 1,
          situation: "🎧 Track 1 (id_10_7_1_us.mp3): Lắng nghe câu đầu tiên và chọn nội dung đã nghe:",
          audio_url: "/audio/idioms/unit10/id_10_7_1_us.mp3",
          options: [
            { key: "A", text: "The children were very well behaved during the performance." },
            { key: "B", text: "Laughing at Sandy's new dress was below the belt." },
            { key: "C", text: "Selma let us down when she canceled the concert at the last minute." },
            { key: "D", text: "Margo explained to her daughter that drawing on the walls was unacceptable behavior." },
            { key: "E", text: "Yulia offered to lend a hand with the dishes after the party." }
          ],
          correct_key: "D",
          explanation: "Theo sách giáo trình và audio gốc, câu nghe số 1 là câu D (Margo explained to her daughter that drawing on the walls was unacceptable behavior)."
        },
        {
          question_number: 2,
          situation: "🎧 Track 2 (id_10_7_2_us.mp3): Lắng nghe câu thứ hai và chọn nội dung đã nghe:",
          audio_url: "/audio/idioms/unit10/id_10_7_2_us.mp3",
          options: [
            { key: "A", text: "The children were very well behaved during the performance." },
            { key: "B", text: "Laughing at Sandy's new dress was below the belt." },
            { key: "C", text: "Selma let us down when she canceled the concert at the last minute." },
            { key: "D", text: "Margo explained to her daughter that drawing on the walls was unacceptable behavior." },
            { key: "E", text: "Yulia offered to lend a hand with the dishes after the party." }
          ],
          correct_key: "B",
          explanation: "Theo audio gốc và Answer key trang 228, câu nghe số 2 là câu B (Laughing at Sandy's new dress was below the belt)."
        },
        {
          question_number: 3,
          situation: "🎧 Track 3 (id_10_7_3_us.mp3): Lắng nghe câu thứ ba và chọn nội dung đã nghe:",
          audio_url: "/audio/idioms/unit10/id_10_7_3_us.mp3",
          options: [
            { key: "A", text: "The children were very well behaved during the performance." },
            { key: "B", text: "Laughing at Sandy's new dress was below the belt." },
            { key: "C", text: "Selma let us down when she canceled the concert at the last minute." },
            { key: "D", text: "Margo explained to her daughter that drawing on the walls was unacceptable behavior." },
            { key: "E", text: "Yulia offered to lend a hand with the dishes after the party." }
          ],
          correct_key: "E",
          explanation: "Theo audio gốc và Answer key trang 228, câu nghe số 3 là câu E (Yulia offered to lend a hand with the dishes after the party)."
        },
        {
          question_number: 4,
          situation: "🎧 Track 4 (id_10_7_4_us.mp3): Lắng nghe câu thứ tư và chọn nội dung đã nghe:",
          audio_url: "/audio/idioms/unit10/id_10_7_4_us.mp3",
          options: [
            { key: "A", text: "The children were very well behaved during the performance." },
            { key: "B", text: "Laughing at Sandy's new dress was below the belt." },
            { key: "C", text: "Selma let us down when she canceled the concert at the last minute." },
            { key: "D", text: "Margo explained to her daughter that drawing on the walls was unacceptable behavior." },
            { key: "E", text: "Yulia offered to lend a hand with the dishes after the party." }
          ],
          correct_key: "A",
          explanation: "Theo audio gốc và Answer key trang 228, câu nghe số 4 là câu A (The children were very well behaved during the performance)."
        },
        {
          question_number: 5,
          situation: "🎧 Track 5 (id_10_7_5_us.mp3): Lắng nghe câu thứ năm và chọn nội dung đã nghe:",
          audio_url: "/audio/idioms/unit10/id_10_7_5_us.mp3",
          options: [
            { key: "A", text: "The children were very well behaved during the performance." },
            { key: "B", text: "Laughing at Sandy's new dress was below the belt." },
            { key: "C", text: "Selma let us down when she canceled the concert at the last minute." },
            { key: "D", text: "Margo explained to her daughter that drawing on the walls was unacceptable behavior." },
            { key: "E", text: "Yulia offered to lend a hand with the dishes after the party." }
          ],
          correct_key: "C",
          explanation: "Theo audio gốc và Answer key trang 228, câu nghe số 5 là câu C (Selma let us down when she canceled the concert at the last minute)."
        }
      ]
    },

    // Exercise 10.8: Fill in the blanks with the appropriate idioms
    {
      exercise_id: "10.8",
      exercise_type: "FILL_IN_THE_BLANKS",
      instruction: "LOOK AT THE PICTURES AND COMPLETE THE SENTENCES",
      description: "Nhìn tranh và điền thành ngữ thích hợp vào chỗ trống • Bám sát Exercise 10.8 trang 49 & Answer Key trang 228",
      questions: [
        {
          question_number: 1,
          prompt_prefix: "Henry can't control his ",
          prompt_suffix: " students.",
          target_answer: "badly behaved",
          accepted_answers: ["badly behaved", "badly-behaved"],
          hint: "naughty, disruptive students (2 words)"
        },
        {
          question_number: 2,
          prompt_prefix: "I really ",
          prompt_suffix: " Mario. He has to work so hard in the kitchen.",
          target_answer: "feel for",
          accepted_answers: ["feel for"],
          hint: "sympathize with (2 words)"
        },
        {
          question_number: 3,
          prompt_prefix: "My friends ",
          prompt_suffix: " for having such an old phone.",
          target_answer: "ribbed me",
          accepted_answers: ["ribbed me"],
          hint: "teased me in US slang (2 words)"
        },
        {
          question_number: 4,
          prompt_prefix: "My dog ",
          prompt_suffix: " when I took him on the train.",
          target_answer: "behaved beautifully",
          accepted_answers: ["behaved beautifully"],
          hint: "behaved perfectly (2 words)"
        },
        {
          question_number: 5,
          prompt_prefix: "Brad loves ",
          prompt_suffix: " his brother.",
          target_answer: "playing practical jokes on",
          accepted_answers: [
            "playing practical jokes on",
            "playing a practical joke on",
            "practical jokes on"
          ],
          hint: "playing tricks to make someone look foolish (4 words)"
        }
      ]
    },

    // Exercise 10.9: Etymological Conceptual & Metaphor Matching (Biên soạn độc quyền NextBand)
    {
      exercise_id: "10.9",
      exercise_type: "CONCEPTUAL_IMAGE_MATCHING",
      instruction: "MATCH THE ORIGINAL HISTORICAL IMAGE TO ITS FIGURATIVE BEHAVIORAL MEANING",
      description: "Giải mã nguồn gốc từ nguyên học & ẩn dụ hành vi • Nghiên cứu OED, luật Queensberry & văn hóa Trung Cổ [Biên soạn độc quyền NextBand]",
      questions: [
        {
          question_number: 1,
          target_idiom: "below the belt",
          prompt: "Thành ngữ 'below the belt' (chơi xấu, tàn nhẫn) bắt nguồn trực tiếp từ điều luật thể thao nào vào năm 1867?",
          options: [
            { key: "A", text: "Luật đấu kiếm hiệp sĩ thời Trung Cổ cấm chém vào chân đối phương." },
            { key: "B", text: "Bộ luật quyền Anh Queensberry nghiêm cấm các cú đấm hiểm hóc dưới thắt lưng." },
            { key: "C", text: "Quy tắc thi đấu vật tự do cổ điển Hy Lạp." }
          ],
          correct_key: "B",
          explanation: "Bộ luật quyền Anh do Hầu tước Queensberry ban hành năm 1867 cấm tuyệt đối mọi cú đấm dưới thắt lưng võ sĩ để ngăn ngừa chấn thương chí mạng."
        },
        {
          question_number: 2,
          target_idiom: "leave someone in the lurch",
          prompt: "Thành ngữ 'leave someone in the lurch' (bỏ rơi giữa cơn hoạn nạn) có nguồn gốc lịch sử từ trò chơi nào ở châu Âu thế kỷ 16?",
          options: [
            { key: "A", text: "Trò chơi bàn cờ 'lourche' của Pháp, nơi người chơi bị dẫn trước quá xa và rơi vào thế thua trắng đơn độc." },
            { key: "B", text: "Trò chơi trốn tìm trong mê cung của các quý tộc Anh thời Elizabeth." },
            { key: "C", text: "Cuộc đua thuyền buồm trên eo biển Manche bị mất gió." }
          ],
          correct_key: "A",
          explanation: "Từ 'lourche' là trò chơi bàn cờ cổ của Pháp; khi bị rơi vào thế 'lurch', người chơi chịu sự thua trắng thảm hại và bất lực hoàn toàn."
        },
        {
          question_number: 3,
          target_idiom: "ribbed me",
          prompt: "Động từ 'rib' mang nghĩa trêu chọc thân mật có nguồn gốc từ cử chỉ cơ thể nào của giới trẻ Mỹ thập niên 1920?",
          options: [
            { key: "A", text: "Cử chỉ thúc nhẹ cùi chỏ vào mạng sườn (ribs) của bạn bè trong lúc cùng cười đùa." },
            { key: "B", text: "Hành động vỗ vai động viên bạn bè khi gặp khó khăn." },
            { key: "C", text: "Điệu nhảy lắc hông và sườn trong các quán rượu jazz." }
          ],
          correct_key: "A",
          explanation: "Mạng sườn là vùng cơ thể nhạy cảm gây buồn cười; hành động thúc nhẹ vào sườn là cử chỉ thân mật để trêu đùa một tật xấu đáng yêu."
        },
        {
          question_number: 4,
          target_idiom: "out of character",
          prompt: "Khái niệm 'out of character' (hành xử khác thường) ban đầu thuộc về lĩnh vực nghệ thuật nào trước khi dùng cho tâm lý học đời sống?",
          options: [
            { key: "A", text: "Nghệ thuật kịch nghệ sân khấu, khi diễn viên hành xử trái ngược với tính cách kịch bản của vai diễn." },
            { key: "B", text: "Nghệ thuật hội họa chân dung thời Phục hưng." },
            { key: "C", text: "Nghệ thuật thư pháp và chạm khắc chữ cổ." }
          ],
          correct_key: "A",
          explanation: "Trong kịch nghệ Shakespeare, mỗi nhân vật (character) phải giữ vững tính nhất quán tính cách. Bất kỳ hành động nào đi chệch kịch bản đều là 'out of character'."
        },
        {
          question_number: 5,
          target_idiom: "generous to a fault",
          prompt: "Thành ngữ 'generous to a fault' phản ánh triết lý đạo đức nào về sự chừng mực của con người?",
          options: [
            { key: "A", text: "Triết lý 'Golden Mean' của Aristotle: ngay cả một đức tính tốt đẹp khi bị đẩy đến mức cực đoan cũng có thể trở thành nhược điểm." },
            { key: "B", text: "Học thuyết vị kỷ: con người không bao giờ nên giúp đỡ người khác." },
            { key: "C", text: "Quy luật bù trừ trong kinh tế học cổ điển." }
          ],
          correct_key: "A",
          explanation: "Triết lý Aristotle nhấn mạnh tính chừng mực; cho đi quá nhiều mà không giữ gìn cho bản thân có thể tự biến lòng hào phóng thành gánh nặng."
        }
      ]
    }
  ]
};

export default UNIT_10_DATA;
