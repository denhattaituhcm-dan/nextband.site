// UNIT 04: Personality traits — Full dataset with 20 idioms & 5 interactive exercises
// Source: DK English for Everyone: English Idioms (Unit 4, pages 22-25 & Answer Key page 226)

export interface IdiomItem {
  id: string;
  headword: string;
  definition_en: string;
  context_sentence: string;
  page_number: number;
  audio_file: string;
  audio_url: string;
  spoken_text: string;
  vietnamese: {
    meaning: string;
    usage_notes: string;
    ielts_speaking_tip: string;
  };
  usage_pattern: string;
  register: string;
  tone: string;
}

export interface IdiomModule {
  module_id: string;
  module_title: string;
  page_number: number;
  idioms: IdiomItem[];
}

export interface ExerciseQuestion {
  question_number: number;
  [key: string]: any;
}

export interface IdiomExercise {
  exercise_id: string;
  exercise_type:
    | "DEFINITION_MATCHING"
    | "FILL_IN_THE_BLANKS"
    | "MULTIPLE_CHOICE_CONTEXT"
    | "SITUATIONAL_JUDGMENT"
    | "CONCEPTUAL_IMAGE_MATCHING";
  instruction: string;
  page_number: number;
  is_audio_based: boolean;
  description?: string;
  questions: ExerciseQuestion[];
}

export interface UnitIdiomsData {
  unit_number: number;
  unit_number_str: string;
  unit_title: string;
  major_section: string;
  modules: IdiomModule[];
  exercises: IdiomExercise[];
}

export const UNIT_04_DATA: UnitIdiomsData = {
  unit_number: 4,
  unit_number_str: "04",
  unit_title: "Personality traits",
  major_section: "Describing people and things",
  modules: [
    {
      module_id: "4.1",
      module_title: "Describing personality",
      page_number: 22,
      idioms: [
        {
          id: "4_1_vividimagination",
          headword: "have a vivid imagination",
          definition_en: "an ability to think of exciting images and ideas",
          context_sentence: "Lucia has a vivid imagination. Her artworks are so original.",
          page_number: 22,
          audio_file: "id_4_1_vividimagination_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_1_vividimagination_uk.mp3",
          spoken_text: "A vivid imagination. Lucia has a vivid imagination. Her artworks are so original.",
          vietnamese: {
            meaning: "có trí tưởng tượng phong phú, bay bổng và đầy sáng tạo",
            usage_notes: "Thường đi kèm tính từ bổ nghĩa: 'a fertile / vivid imagination'. Dùng rất phổ biến khi khen ngợi trẻ em, nhà văn hoặc họa sĩ.",
            ielts_speaking_tip: "Cực kỳ đắt giá trong Speaking Part 2 khi miêu tả 'A creative person you admire' hoặc 'An interesting book/film'."
          },
          usage_pattern: "have a vivid imagination",
          register: "Neutral / Formal",
          tone: "Appreciative"
        },
        {
          id: "4_1_selfishstreak",
          headword: "have a selfish streak",
          definition_en: "a tendency to be selfish",
          context_sentence: "Gustav has a selfish streak. He won't share his cookies with his friends.",
          page_number: 22,
          audio_file: "id_4_1_selfishstreak_us.mp3",
          audio_url: "/audio/idioms/unit04/id_4_1_selfishstreak_us.mp3",
          spoken_text: "A selfish streak. Gustav has a selfish streak. He won't share his cookies with his friends.",
          vietnamese: {
            meaning: "có một nét tính cách ích kỷ, đôi lúc hẹp hòi chỉ biết nghĩ cho mình",
            usage_notes: "'Streak' là một vệt/nét tính cách bộc phát thỉnh thoảng, không đồng nghĩa người đó xấu xa 100%. Có thể dùng tương tự: 'a stubborn streak', 'a mean streak'.",
            ielts_speaking_tip: "Giúp bài nói Speaking Part 2 trở nên đa chiều, chân thực khi miêu tả tính cách phức tạp của một người quen."
          },
          usage_pattern: "have a selfish streak",
          register: "Neutral",
          tone: "Critical / Observational"
        },
        {
          id: "4_1_twofaced",
          headword: "two-faced",
          definition_en: "insincere or hypocritical; saying one thing to someone and the opposite to others",
          context_sentence: "Arturo is so two-faced. He said he liked my haircut, but told his friends he hated it.",
          page_number: 22,
          audio_file: "id_4_1_twofaced_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_1_twofaced_uk.mp3",
          spoken_text: "Two-faced. Arturo is so two-faced. He said he liked my haircut, but told his friends he hated it.",
          vietnamese: {
            meaning: "hai mặt, giả tạo, trước mặt thì khen ngợi nhưng sau lưng lại nói xấu",
            usage_notes: "Tính từ ghép: 'be two-faced'. Thường mang sắc thái phê phán mạnh mẽ về sự tráo trở, thiếu trung thực.",
            ielts_speaking_tip: "Dùng để diễn tả sự thất vọng về đồng nghiệp hoặc bạn bè thiếu chân thành trong Speaking Part 3."
          },
          usage_pattern: "be two-faced / act two-faced",
          register: "Informal",
          tone: "Critical"
        },
        {
          id: "4_1_downtoearth",
          headword: "down to earth",
          definition_en: "practical, realistic, and unpretentious",
          context_sentence: "Noah is really down to earth. He earns lots of money, but he lives in a little cottage.",
          page_number: 22,
          audio_file: "id_4_1_downtoearth_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_1_downtoearth_uk.mp3",
          spoken_text: "Down to earth. Noah is really down to earth. He earns lots of money, but he lives in a little cottage.",
          vietnamese: {
            meaning: "thực tế, bình dị, khiêm nhường, không hề kênh kiệu dù giàu sang",
            usage_notes: "Thường viết có gạch nối khi đứng trước danh từ: 'a down-to-earth person', nhưng không có gạch nối khi đứng sau to be: 'he is down to earth'.",
            ielts_speaking_tip: "Từ vựng 'vàng' khi miêu tả thần tượng, người nổi tiếng hoặc cấp trên tốt bụng trong IELTS Speaking Part 2."
          },
          usage_pattern: "be down to earth / a down-to-earth person",
          register: "Neutral / Informal",
          tone: "Admiring"
        },
        {
          id: "4_1_toosmartfor",
          headword: "too smart for (one's) own good",
          definition_en: "annoyingly proud of one's intelligence; so clever that it causes problems or annoys others",
          context_sentence: "Zoe loves proving how much she knows. She's too smart for her own good.",
          page_number: 22,
          audio_file: "id_4_1_toosmartfor_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_1_toosmartfor_uk.mp3",
          spoken_text: "Too smart for her own good. Zoe loves proving how much she knows. She's too smart for her own good.",
          vietnamese: {
            meaning: "quá lanh lợi/tự cao về trí tuệ đến mức gây phản cảm hoặc tự rước phiền phức",
            usage_notes: "Thường dùng để cảnh báo hoặc nhận xét những người thích bắt bẻ, thể hiện kiến thức nhưng thiếu sự tinh tế trong giao tiếp.",
            ielts_speaking_tip: "Cách diễn đạt tự nhiên khi thảo luận về kỹ năng xã hội (EQ) so với trí thông minh học thuật (IQ) trong Part 3."
          },
          usage_pattern: "be too smart / clever for one's own good",
          register: "Neutral / Informal",
          tone: "Cautionary / Critical"
        },
        {
          id: "4_1_crybaby",
          headword: "a crybaby",
          definition_en: "someone who cries a lot or complains without good reason",
          context_sentence: "Bob is such a crybaby. He was very upset about not getting a perfect score.",
          page_number: 22,
          audio_file: "id_4_1_crybaby_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_1_crybaby_uk.mp3",
          spoken_text: "A crybaby. Bob is such a crybaby. He was very upset about not getting a perfect score.",
          vietnamese: {
            meaning: "người hay nhõng nhẽo, mè nheo, than vãn yếu đuối trước khó khăn nhỏ",
            usage_notes: "Thường dùng làm danh từ đếm được: 'such a crybaby', 'stop being a crybaby'.",
            ielts_speaking_tip: "Dùng để kể chuyện tương phản hài hước thời đi học hoặc anh chị em trong nhà lúc nhỏ."
          },
          usage_pattern: "be a crybaby / act like a crybaby",
          register: "Informal",
          tone: "Disapproving"
        },
        {
          id: "4_1_barreloflaughs",
          headword: "a barrel of laughs",
          definition_en: "a fun person or situation that provides great entertainment",
          context_sentence: "It was great to see Jasmine at the party. She's always a barrel of laughs.",
          page_number: 22,
          audio_file: "id_4_1_barreloflaughs_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_1_barreloflaughs_uk.mp3",
          spoken_text: "A barrel of laughs. It was great to see Jasmine at the party. She's always a barrel of laughs.",
          vietnamese: {
            meaning: "cây hài, người cực kỳ vui tính và dí dỏm, luôn mang lại tiếng cười",
            usage_notes: "Thường dùng khẳng định để khen ngợi ('she is a barrel of laughs'), hoặc dùng mỉa mai trong thể phủ định ('he is not exactly a barrel of laughs').",
            ielts_speaking_tip: "Thích hợp khi miêu tả 'A friend who makes you laugh' trong Speaking Part 1 & Part 2."
          },
          usage_pattern: "be a barrel of laughs",
          register: "Informal",
          tone: "Playful / Warm"
        },
        {
          id: "4_1_averagejoe",
          headword: "an average Joe",
          definition_en: "a stereotypical man who has ordinary tastes and lifestyle",
          context_sentence: "My dad's just an average Joe. He enjoys burgers and fries, and he loves watching baseball.",
          page_number: 22,
          audio_file: "id_4_1_averagejoe_us.mp3",
          audio_url: "/audio/idioms/unit04/id_4_1_averagejoe_us.mp3",
          spoken_text: "An average Joe. My dad's just an average Joe. He enjoys burgers and fries, and he loves watching baseball.",
          vietnamese: {
            meaning: "người đàn ông bình dân, sống giản dị với những sở thích đại chúng mộc mạc",
            usage_notes: "Từ 'Joe' đại diện cho người bình thường trong văn hóa đại chúng Mỹ. Thường dùng với thái độ thiện cảm, chân chất.",
            ielts_speaking_tip: "Dùng để miêu tả các thành viên trong gia đình hoặc so sánh cuộc sống bình dân với giới thượng lưu."
          },
          usage_pattern: "be just an average Joe",
          register: "Informal",
          tone: "Affectionate / Descriptive"
        },
        {
          id: "4_1_boldasbrass",
          headword: "(as) bold as brass",
          definition_en: "very confident; behaving without fear, hesitation, or shame",
          context_sentence: "Chetan is as bold as brass. He walked up to the actor and asked for an autograph.",
          page_number: 22,
          audio_file: "id_4_1_boldasbrass_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_1_boldasbrass_uk.mp3",
          spoken_text: "As bold as brass. Chetan is as bold as brass. He walked up to the actor and asked for an autograph.",
          vietnamese: {
            meaning: "cực kỳ bạo dạn, tự tin trơ trọi không hề e sợ hay ngại ngùng",
            usage_notes: "Thường dùng vừa để khen sự dũng cảm liều lĩnh, vừa có thể hàm ý chê sự trơ trẽn, thiếu ý tứ tùy ngữ cảnh.",
            ielts_speaking_tip: "Thành ngữ so sánh cực chuẩn để kể về một hành động táo bạo của bản thân hoặc bạn bè trong quá khứ."
          },
          usage_pattern: "(as) bold as brass",
          register: "Informal",
          tone: "Expressive"
        },
        {
          id: "4_1_fuddyduddy",
          headword: "a fuddy-duddy",
          definition_en: "someone who is unwilling to try new things and has old-fashioned attitudes",
          context_sentence: "Norah is such a fuddy-duddy. She never wants to come out with us on Saturday night.",
          page_number: 22,
          audio_file: "id_4_1_fuddyduddy_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_1_fuddyduddy_uk.mp3",
          spoken_text: "A fuddy-duddy. Norah is such a fuddy-duddy. She never wants to come out with us on Saturday night.",
          vietnamese: {
            meaning: "người cổ hủ, bảo thủ, khó tính và không chịu tiếp nhận lối sống hiện đại",
            usage_notes: "Từ ghép mang tính châm chọc nhẹ nhàng: 'be an old fuddy-duddy'.",
            ielts_speaking_tip: "Dùng để bàn về khoảng cách thế hệ (generation gap) hoặc thái độ đối với công nghệ số trong Part 3."
          },
          usage_pattern: "be a fuddy-duddy / an old fuddy-duddy",
          register: "Informal",
          tone: "Mildly critical"
        }
      ]
    },
    {
      module_id: "4.2",
      module_title: "Idioms using vocabulary about animals",
      page_number: 23,
      idioms: [
        {
          id: "4_2_lonewolf",
          headword: "a lone wolf",
          definition_en: "someone who prefers to live or work alone rather than in a group",
          context_sentence: "My uncle is a lone wolf. He lives on his own in a cabin in the forest.",
          page_number: 23,
          audio_file: "id_4_2_lonewolf_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_2_lonewolf_uk.mp3",
          spoken_text: "A lone wolf. My uncle is a lone wolf. He lives on his own in a cabin in the forest.",
          vietnamese: {
            meaning: "kẻ độc hành, người thích làm việc và sống một mình tách biệt khỏi tập thể",
            usage_notes: "Chỉ người có tính tự lập cao, khép kín nhưng có năng lực độc lập giải quyết vấn đề, không nhất thiết là chống đối xã hội.",
            ielts_speaking_tip: "Rất hay khi trả lời câu hỏi 'Do you prefer working alone or in a team?' trong Speaking Part 1 & 3."
          },
          usage_pattern: "be a lone wolf",
          register: "Neutral",
          tone: "Descriptive"
        },
        {
          id: "4_2_bootoagoose",
          headword: "wouldn't say boo to a goose",
          definition_en: "is very timid, shy, and nervous around people",
          context_sentence: "Tony wouldn't say boo to a goose. He gets really shy when he talks to customers.",
          page_number: 23,
          audio_file: "id_4_2_bootoagoose_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_2_bootoagoose_uk.mp3",
          spoken_text: "Wouldn't say boo to a goose. Tony wouldn't say boo to a goose. He gets really shy when he talks to customers.",
          vietnamese: {
            meaning: "nhút nhát như cáy, hiền lành rụt rè không dám ho he hay làm phật lòng ai",
            usage_notes: "Luôn dùng ở dạng phủ định: 'would not / wouldn't say boo to a goose'. Ở Mỹ đôi khi dùng 'say boo to a fly'.",
            ielts_speaking_tip: "Collocation tự nhiên Band 7.5+ khi miêu tả tính cách rụt rè của một người bạn thời thơ ấu."
          },
          usage_pattern: "wouldn't say boo to a goose",
          register: "Informal",
          tone: "Affectionate / Observational"
        },
        {
          id: "4_2_barkworsebite",
          headword: "(someone's) bark is worse than their bite",
          definition_en: "they are not as fierce, scary, or unpleasant as they seem",
          context_sentence: "Don't be afraid of Linda. Her bark is worse than her bite.",
          page_number: 23,
          audio_file: "id_4_2_barkworsebite_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_2_barkworsebite_uk.mp3",
          spoken_text: "Her bark is worse than her bite. Don't be afraid of Linda. Her bark is worse than her bite.",
          vietnamese: {
            meaning: "khẩu xà tâm phật, miệng la mắng to tiếng nhưng lòng dạ hiền lành, không hại ai",
            usage_notes: "Thường dùng để trấn an người khác khi họ lo lắng trước một vị sếp hoặc giáo viên nghiêm khắc.",
            ielts_speaking_tip: "Rất phù hợp khi kể về 'A strict teacher or mentor who helped you succeed' trong Speaking Part 2."
          },
          usage_pattern: "someone's bark is worse than their bite",
          register: "Neutral / Informal",
          tone: "Reassuring"
        },
        {
          id: "4_2_darkhorse",
          headword: "a dark horse",
          definition_en: "someone who hides a surprising skill, quality, or past achievement",
          context_sentence: "Ben never told us he could tap dance. He is such a dark horse.",
          page_number: 23,
          audio_file: "id_4_2_darkhorse_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_2_darkhorse_uk.mp3",
          spoken_text: "A dark horse. Ben never told us he could tap dance. He is such a dark horse.",
          vietnamese: {
            meaning: "ngựa ô, nhân tố bí ẩn, người khiêm nhường nhưng bất ngờ bộc lộ tài năng lớn",
            usage_notes: "Dùng cho cả người có tài lẻ bất ngờ và trong thi đấu thể thao/bầu cử chính trị.",
            ielts_speaking_tip: "Thành ngữ ấn tượng khi kể về một người bạn khiêm tốn nhưng bất ngờ giành giải thưởng lớn."
          },
          usage_pattern: "be a dark horse",
          register: "Neutral",
          tone: "Admiring / Surprised"
        },
        {
          id: "4_2_nothurtfly",
          headword: "wouldn't hurt a fly",
          definition_en: "is completely gentle, harmless, and kind-hearted",
          context_sentence: "I know Rex looks a bit scary, but he wouldn't hurt a fly.",
          page_number: 23,
          audio_file: "id_4_2_nothurtfly_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_2_nothurtfly_uk.mp3",
          spoken_text: "Wouldn't hurt a fly. I know Rex looks a bit scary, but he wouldn't hurt a fly.",
          vietnamese: {
            meaning: "hiền như cục bột, không nỡ làm đau một con muỗi/ruồi, lương thiện tuyệt đối",
            usage_notes: "Thường dùng để đối lập với ngoại hình to lớn, xăm trổ hoặc vẻ ngoài hầm hố của một người/thú cưng.",
            ielts_speaking_tip: "Cực kỳ hiệu quả để tạo độ tương phản trong miêu tả nhân vật: 'He looked intimidating, but in reality he wouldn't hurt a fly.'"
          },
          usage_pattern: "wouldn't hurt a fly",
          register: "Informal",
          tone: "Affectionate"
        },
        {
          id: "4_2_socialbutterfly",
          headword: "a social butterfly",
          definition_en: "a very sociable and outgoing person who flits between different social groups",
          context_sentence: "Claire is a social butterfly. She's always going to parties.",
          page_number: 23,
          audio_file: "id_4_2_socialbutterfly_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_2_socialbutterfly_uk.mp3",
          spoken_text: "A social butterfly. Claire is a social butterfly. She's always going to parties.",
          vietnamese: {
            meaning: "người hướng ngoại, cực kỳ quảng giao, thích bay lượn kết nối nhiều hội nhóm",
            usage_notes: "Mang sắc thái tích cực về sự thân thiện, linh hoạt xã hội, đôi khi hơi thoáng qua.",
            ielts_speaking_tip: "Từ vựng C1 hữu ích khi miêu tả tính cách bản thân hoặc bạn thân trong Speaking Part 1 (Friends/Parties)."
          },
          usage_pattern: "be a social butterfly",
          register: "Informal",
          tone: "Lively / Admiring"
        }
      ]
    },
    {
      module_id: "4.3",
      module_title: "Idioms using vocabulary about food",
      page_number: 23,
      idioms: [
        {
          id: "4_3_toughcookie",
          headword: "a tough cookie",
          definition_en: "determined, resilient, and physically or emotionally strong",
          context_sentence: "Debbie's a tough cookie. She doesn't mind when people criticize her work.",
          page_number: 23,
          audio_file: "id_4_3_toughcookie_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_3_toughcookie_uk.mp3",
          spoken_text: "A tough cookie. Debbie's a tough cookie. She doesn't mind when people criticize her work.",
          vietnamese: {
            meaning: "người kiên cường, cứng cỏi, lì đòn trước khó khăn và không dễ bị gục ngã",
            usage_notes: "Thường dùng để khen ngợi phụ nữ hoặc người vượt qua nghịch cảnh sức khỏe/áp lực công việc.",
            ielts_speaking_tip: "Điểm cộng Band 8.0 khi miêu tả 'A leader or family member who overcame hardship'."
          },
          usage_pattern: "be a tough cookie",
          register: "Informal",
          tone: "Admiring"
        },
        {
          id: "4_3_coolcucumber",
          headword: "(as) cool as a cucumber",
          definition_en: "extremely calm, relaxed, and composed, especially in difficult situations",
          context_sentence: "Kirstie remained as cool as a cucumber throughout her performance.",
          page_number: 23,
          audio_file: "id_4_3_coolcucumber_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_3_coolcucumber_uk.mp3",
          spoken_text: "As cool as a cucumber. Kirstie remained as cool as a cucumber throughout her performance.",
          vietnamese: {
            meaning: "điềm tĩnh lạ lùng, ung dung tự tại, không hề nao núng hay bối rối",
            usage_notes: "Nhấn mạnh khả năng giữ cái đầu lạnh và nhịp tim ổn định trước áp lực biểu diễn, thi cử hoặc khủng hoảng.",
            ielts_speaking_tip: "Dùng để miêu tả cách bạn hoặc ai đó xử lý áp lực trong phòng thi hoặc tình huống khẩn cấp."
          },
          usage_pattern: "(as) cool as a cucumber",
          register: "Informal",
          tone: "Impressed"
        },
        {
          id: "4_3_goodegg",
          headword: "a good egg",
          definition_en: "an honest, reliable, kind, or considerate person",
          context_sentence: "Jim's a good egg. He helped me to move last week.",
          page_number: 23,
          audio_file: "id_4_3_goodegg_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_3_goodegg_uk.mp3",
          spoken_text: "A good egg. Jim's a good egg. He helped me to move last week.",
          vietnamese: {
            meaning: "người tốt bụng, tử tế, đàng hoàng và rất đáng tin cậy",
            usage_notes: "Cách nói thân mật, trìu mến phổ biến trong tiếng Anh Anh. Đối lập với 'a bad egg' (kẻ xấu xa).",
            ielts_speaking_tip: "Tạo cảm giác ngôn ngữ tự nhiên, ấm áp khi nói về một người hàng xóm hoặc đồng nghiệp tốt bụng."
          },
          usage_pattern: "be a good egg / a real good egg",
          register: "Informal",
          tone: "Warm / Friendly"
        },
        {
          id: "4_3_saltearth",
          headword: "the salt of the earth",
          definition_en: "exceptionally kind, honest, unpretentious, and morally upright",
          context_sentence: "Hassan is the salt of the earth. I saw him help an old lady cross the road.",
          page_number: 23,
          audio_file: "id_4_3_saltearth_uk.mp3",
          audio_url: "/audio/idioms/unit04/id_4_3_saltearth_uk.mp3",
          spoken_text: "The salt of the earth. Hassan is the salt of the earth. I saw him help an old lady cross the road.",
          vietnamese: {
            meaning: "người chân chất, lương thiện, khiêm nhường và đáng kính trọng nhất của xã hội",
            usage_notes: "Danh xưng tôn vinh những người lao động thầm lặng, sống mẫu mực và giàu lòng nhân ái.",
            ielts_speaking_tip: "Từ vựng trang trọng, giàu sức nặng trong Speaking Part 3 khi nói về giá trị đạo đức và phẩm hạnh con người."
          },
          usage_pattern: "be the salt of the earth",
          register: "Neutral / Formal",
          tone: "Deeply respectful"
        }
      ]
    }
  ],
  exercises: [
    {
      exercise_id: "4.4",
      exercise_type: "DEFINITION_MATCHING",
      instruction: "MATCH THE IDIOMS TO THEIR CORRECT DEFINITIONS",
      page_number: 25,
      is_audio_based: false,
      questions: [
        {
          question_number: 1,
          term: "a fuddy-duddy",
          target_definition: "someone who is unwilling to try new things",
          source_answer_ref: "page_25_item_4.7_1"
        },
        {
          question_number: 2,
          term: "her bark is worse than her bite",
          target_definition: "she is not as scary or fierce as she seems",
          source_answer_ref: "page_226_item_4.7_1"
        },
        {
          question_number: 3,
          term: "as cool as a cucumber",
          target_definition: "calm, relaxed, and composed under pressure",
          source_answer_ref: "page_226_item_4.7_2"
        },
        {
          question_number: 4,
          term: "as bold as brass",
          target_definition: "very confident; behaving without fear or hesitation",
          source_answer_ref: "page_226_item_4.7_3"
        },
        {
          question_number: 5,
          term: "a barrel of laughs",
          target_definition: "a fun person or situation full of humor",
          source_answer_ref: "page_226_item_4.7_4"
        },
        {
          question_number: 6,
          term: "wouldn't hurt a fly",
          target_definition: "is completely gentle, harmless, and kind-hearted",
          source_answer_ref: "page_226_item_4.7_5"
        }
      ]
    },
    {
      exercise_id: "4.5",
      exercise_type: "FILL_IN_THE_BLANKS",
      instruction: "COMPLETE THE SENTENCES WITH THE CORRECT IDIOMS",
      page_number: 24,
      is_audio_based: false,
      questions: [
        {
          question_number: 1,
          prompt_prefix: "It was great to see Jasmine at the party. She's always ",
          prompt_suffix: ".",
          target_answer: "a barrel of laughs",
          accepted_answers: ["a barrel of laughs", "barrel of laughs"],
          hint: "a very fun person (4 words)",
          source_answer_ref: "page_226_item_4.4_1"
        },
        {
          question_number: 2,
          prompt_prefix: "Bob is such ",
          prompt_suffix: ". He was very upset about not getting a perfect score.",
          target_answer: "a crybaby",
          accepted_answers: ["a crybaby", "crybaby"],
          hint: "someone who complains easily (2 words)",
          source_answer_ref: "page_226_item_4.4_2"
        },
        {
          question_number: 3,
          prompt_prefix: "Don't be afraid of Linda. Her ",
          prompt_suffix: ".",
          target_answer: "bark is worse than her bite",
          accepted_answers: ["bark is worse than her bite", "bark is worse than bite"],
          hint: "she is not as scary as she sounds (6 words)",
          source_answer_ref: "page_226_item_4.4_3"
        },
        {
          question_number: 4,
          prompt_prefix: "Jim's ",
          prompt_suffix: ". He helped me to move last week.",
          target_answer: "a good egg",
          accepted_answers: ["a good egg", "good egg"],
          hint: "an honest, reliable person (3 words)",
          source_answer_ref: "page_226_item_4.4_4"
        },
        {
          question_number: 5,
          prompt_prefix: "Gustav has ",
          prompt_suffix: ". He won't share his cookies with his friends.",
          target_answer: "a selfish streak",
          accepted_answers: ["a selfish streak", "selfish streak"],
          hint: "a tendency to be selfish (3 words)",
          source_answer_ref: "page_226_item_4.4_5"
        },
        {
          question_number: 6,
          prompt_prefix: "Debbie's ",
          prompt_suffix: ". She doesn't mind when people criticize her work.",
          target_answer: "a tough cookie",
          accepted_answers: ["a tough cookie", "tough cookie"],
          hint: "a strong, resilient person (3 words)",
          source_answer_ref: "page_226_item_4.4_6"
        }
      ]
    },
    {
      exercise_id: "4.6",
      exercise_type: "MULTIPLE_CHOICE_CONTEXT",
      instruction: "CHOOSE THE CORRECT IDIOM TO COMPLETE EACH SENTENCE",
      page_number: 25,
      is_audio_based: false,
      questions: [
        {
          question_number: 1,
          prompt: "Noah is really ________. He earns lots of money, but he lives in a little cottage.",
          options: [
            { key: "A", text: "down to earth" },
            { key: "B", text: "two-faced" },
            { key: "C", text: "a crybaby" }
          ],
          correct_key: "A",
          explanation: "'Down to earth' diễn tả người dù rất thành công, giàu có nhưng vẫn giữ lối sống giản dị, chân chất và không kênh kiệu.",
          source_answer_ref: "page_226_item_4.6_1"
        },
        {
          question_number: 2,
          prompt: "My dad's just ________. He enjoys burgers and fries, and he loves watching baseball.",
          options: [
            { key: "A", text: "a lone wolf" },
            { key: "B", text: "an average Joe" },
            { key: "C", text: "a dark horse" }
          ],
          correct_key: "B",
          explanation: "'An average Joe' chỉ người đàn ông bình dân với lối sống mộc mạc và sở thích phổ thông như xem bóng chày và ăn đồ nướng.",
          source_answer_ref: "page_226_item_4.6_2"
        },
        {
          question_number: 3,
          prompt: "Tony ________. He gets really shy when he talks to customers.",
          options: [
            { key: "A", text: "wouldn't say boo to a goose" },
            { key: "B", text: "is a barrel of laughs" },
            { key: "C", text: "is as bold as brass" }
          ],
          correct_key: "A",
          explanation: "'Wouldn't say boo to a goose' diễn tả tính cách cực kỳ rụt rè, nhút nhát và sợ sệt khi phải giao tiếp với người lạ.",
          source_answer_ref: "page_226_item_4.6_3"
        },
        {
          question_number: 4,
          prompt: "Norah is such ________. She never wants to come out with us on Saturday night.",
          options: [
            { key: "A", text: "a social butterfly" },
            { key: "B", text: "a fuddy-duddy" },
            { key: "C", text: "a tough cookie" }
          ],
          correct_key: "B",
          explanation: "'A fuddy-duddy' chỉ người cổ hủ, bảo thủ, thích lối sống khuôn phép cũ và từ chối tham gia các hoạt động vui chơi giải trí hiện đại.",
          source_answer_ref: "page_226_item_4.6_4"
        },
        {
          question_number: 5,
          prompt: "Arturo is so ________. He said he liked my haircut but told his friends he hated it.",
          options: [
            { key: "A", text: "the salt of the earth" },
            { key: "B", text: "down to earth" },
            { key: "C", text: "two-faced" }
          ],
          correct_key: "C",
          explanation: "'Two-faced' miêu tả hành vi đạo đức giả, khen trước mặt nhưng quay lưng lại nói xấu với người khác.",
          source_answer_ref: "page_226_item_4.6_5"
        },
        {
          question_number: 6,
          prompt: "Ben never told us he could tap dance. He is such ________!",
          options: [
            { key: "A", text: "a lone wolf" },
            { key: "B", text: "a dark horse" },
            { key: "C", text: "a crybaby" }
          ],
          correct_key: "B",
          explanation: "'A dark horse' (nhân tố bí ẩn / ngựa ô) dùng để chỉ người khiêm nhường nhưng bất ngờ bộc lộ một tài năng nghệ thuật không ai ngờ tới.",
          source_answer_ref: "page_23_item_4.2_4"
        }
      ]
    },
    {
      exercise_id: "4.7",
      exercise_type: "SITUATIONAL_JUDGMENT",
      instruction: "CHỌN CÁCH DIỄN ĐẠT CHUẨN XÁC NHẤT THEO TÌNH HUỐNG THỰC TẾ",
      page_number: 25,
      is_audio_based: false,
      questions: [
        {
          question_number: 1,
          situation: "Trong phòng thi IELTS Speaking Part 2 miêu tả người thầy giáo nghiêm khắc nhất bạn từng học, bạn muốn giải thích rằng lúc đầu thầy hay to tiếng mắng mỏ khiến cả lớp sợ, nhưng thực chất thầy rất tận tâm và không hề ghét bỏ học sinh.",
          options: [
            {
              key: "A",
              text: "At first we were terrified because of his loud voice, but we soon realized his bark was worse than his bite."
            },
            {
              key: "B",
              text: "He was such a crybaby with a selfish streak whenever we asked questions."
            },
            {
              key: "C",
              text: "He was as bold as brass because he wouldn't say boo to a goose."
            }
          ],
          correct_key: "A",
          explanation: "'His bark was worse than his bite' diễn tả chính xác sự đối lập giữa vẻ ngoài to tiếng, đe dọa với tấm lòng bao dung, tận tâm bên trong."
        },
        {
          question_number: 2,
          situation: "Bạn được giao phỏng vấn một ứng viên cho vị trí xử lý khủng hoảng truyền thông. Ứng viên này nổi tiếng với khả năng giữ bình tĩnh tuyệt đối, xử lý sự cố rành mạch ngay cả khi khách hàng đang giận dữ gào thét.",
          options: [
            {
              key: "A",
              text: "She's a social butterfly who acts like an average Joe under pressure."
            },
            {
              key: "B",
              text: "During severe brand crises, she remains as cool as a cucumber, making decisions with remarkable clarity."
            },
            {
              key: "C",
              text: "She has a vivid imagination so she is too smart for her own good."
            }
          ],
          correct_key: "B",
          explanation: "'As cool as a cucumber' là thành ngữ chuẩn mực Band 8.0 để khen ngợi người giữ được cái đầu lạnh và phong thái ung dung trước áp lực ngàn cân."
        },
        {
          question_number: 3,
          situation: "Bạn muốn khen ngợi một người bác nông dân chất phác ở quê: bác sống giản dị, cần cù, hay giúp đỡ bà con chòm xóm mà không bao giờ đòi hỏi đền đáp hay phô trương.",
          options: [
            {
              key: "A",
              text: "My uncle is a lone wolf who is so two-faced with his neighbors."
            },
            {
              key: "B",
              text: "My uncle is such a fuddy-duddy and a tough cookie at parties."
            },
            {
              key: "C",
              text: "My uncle is truly the salt of the earth—humble, hardworking, and always the first to lend a helping hand."
            }
          ],
          correct_key: "C",
          explanation: "'The salt of the earth' là danh xưng tôn vinh cao quý dành cho những con người bình dị, lương thiện và là trụ cột đạo đức của cộng đồng."
        }
      ]
    },
    {
      exercise_id: "4.8",
      exercise_type: "CONCEPTUAL_IMAGE_MATCHING",
      instruction: "THỬ THÁCH HIỂU NGUYÊN BẢN: KẾT NỐI HÌNH TƯỢNG VÀ NGHĨA BÓNG (UNIT 4)",
      page_number: 25,
      is_audio_based: false,
      description: "Hiểu gốc rễ vì sao hình tượng ban đầu lại tạo nên nghĩa bóng hiện đại.",
      questions: [
        {
          question_number: 1,
          target_idiom: "as cool as a cucumber",
          prompt: "Tại sao quả dưa chuột (cucumber) lại trở thành biểu tượng cho sự điềm tĩnh tuyệt đối trước áp lực?",
          options: [
            {
              key: "A",
              text: "Quả dưa chuột mọc sát mặt đất dưới bóng râm của lá nên không bị ánh nắng hun nóng."
            },
            {
              key: "B",
              text: "Dưa chuột chứa tới 96% là nước; ruột bên trong của nó luôn duy trì nhiệt độ thấp hơn không khí nóng bức xung quanh khoảng 11°C — tượng trưng cho người luôn giữ được cái đầu mát lạnh giữa cơn khủng hoảng."
            },
            {
              key: "C",
              text: "Dưa chuột thời xưa được ngâm trong giấm lạnh để bảo quản thức ăn cho binh lính."
            }
          ],
          correct_key: "B",
          explanation: "Nghiên cứu thực vật học và văn học thế kỷ 17 (John Fletcher, 1615) xác nhận ruột quả dưa chuột có tính hàn tự nhiên, luôn mát lạnh hơn nhiệt độ môi trường, trở thành ẩn dụ hoàn hảo cho tâm trí điềm tĩnh."
        },
        {
          question_number: 2,
          target_idiom: "a dark horse",
          prompt: "Thuật ngữ 'a dark horse' xuất phát từ trường đua ngựa thế kỷ 19 phản ánh điều gì?",
          options: [
            {
              key: "A",
              text: "Những con ngựa có bộ lông đen thường chạy nhanh hơn vào ban đêm."
            },
            {
              key: "B",
              text: "Kỵ sĩ mặc áo choàng đen bí mật để đánh lừa đối thủ trên đường đua."
            },
            {
              key: "C",
              text: "Con ngựa đua xa lạ, không có tên tuổi trên bảng tỷ lệ cá cược (thông tin bị che giấu trong bóng tối), nhưng bất ngờ bứt phá về đích giành chiến thắng ngoạn mục."
            }
          ],
          correct_key: "C",
          explanation: "Bắt nguồn từ trường đua ngựa Anh và tiểu thuyết 'The Young Duke' (1831) của Benjamin Disraeli: con ngựa không ai biết đến ('dark' = chưa được biết) bất ngờ vượt qua tất cả các ứng viên sáng giá."
        },
        {
          question_number: 3,
          target_idiom: "the salt of the earth",
          prompt: "Tại sao 'muối của đất' (the salt of the earth) lại mang nghĩa những con người lương thiện và đáng quý nhất của xã hội?",
          options: [
            {
              key: "A",
              text: "Muối là khoáng chất giữ cho thực phẩm không bị thối rữa và tạo hương vị đậm đà thiết yếu; trong Kinh Thánh (Matthew 5:13), Chúa Jesus ví những người sống đạo đức, lương thiện như muối giữ gìn nền tảng xã hội."
            },
            {
              key: "B",
              text: "Muối thời Trung Cổ đắt hơn vàng nên chỉ có quý tộc mới được dùng."
            },
            {
              key: "C",
              text: "Đất trồng trọt có nhiều muối khoáng thì cây cối sẽ sinh trưởng tốt hơn."
            }
          ],
          correct_key: "A",
          explanation: "Bắt nguồn trực tiếp từ Bài giảng trên núi trong Phúc âm Matthew 5:13: Muối bảo quản thức ăn khỏi sự thối rữa và mang lại giá trị sống, ví von những người chân chất, thuần khiết gìn giữ phẩm hạnh cho toàn nhân loại."
        }
      ]
    }
  ]
} as const;

export default UNIT_04_DATA;
