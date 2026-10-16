// UNIT 05: Good things — Full dataset with 20 idioms & 5 interactive exercises
// Source: DK English for Everyone: English Idioms (Unit 5, pages 26-29 & Answer Key pages 226-227)

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
  summary: {
    total_idioms: number;
    total_teaching_modules: number;
    total_practice_exercises: number;
    total_audios: number;
    accent: string;
  };
  modules: IdiomModule[];
  exercises: IdiomExercise[];
}

export const UNIT_05_DATA: UnitIdiomsData = {
  unit_number: 5,
  unit_number_str: "05",
  unit_title: "Good things",
  major_section: "Describing people and things",
  summary: {
    total_idioms: 20,
    total_teaching_modules: 2,
    total_practice_exercises: 5,
    total_audios: 20,
    accent: "US",
  },
  modules: [
    {
      module_id: "5.1",
      module_title: "Praise and Superlatives",
      page_number: 26,
      idioms: [
        {
          id: "5_1_bestslicedbread",
          headword: "the best thing since sliced bread",
          definition_en: "an innovative, useful, or extremely good invention or idea",
          context_sentence: "My kids think this TV show is the best thing since sliced bread.",
          page_number: 26,
          audio_file: "id_5_1_bestslicedbread_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_bestslicedbread_us.mp3",
          spoken_text: "The best thing since sliced bread. My kids think this TV show is the best thing since sliced bread.",
          vietnamese: {
            meaning: "phát minh/ý tưởng tuyệt vời nhất từ trước đến nay, cực kỳ tiện ích",
            usage_notes: "Thường đi kèm cấu trúc: 'think / consider something is the best thing since sliced bread'. Thường dùng với giọng điệu hào hứng hoặc hơi phóng đại.",
            ielts_speaking_tip: "Rất ấn tượng trong Speaking Part 2 khi miêu tả 'An electronic device or mobile app you cannot live without'."
          },
          usage_pattern: "be the best thing since sliced bread",
          register: "Informal",
          tone: "Enthusiastic"
        },
        {
          id: "5_1_stoletheshow",
          headword: "stole the show",
          definition_en: "was the best part of an event, or attracted the most praise and attention",
          context_sentence: "Marcelo stole the show with his amazing singing.",
          page_number: 26,
          audio_file: "id_5_1_stoletheshow_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_stoletheshow_us.mp3",
          spoken_text: "Stole the show. Marcelo stole the show with his amazing singing.",
          vietnamese: {
            meaning: "chiếm trọn ánh hào quang, trở thành tâm điểm được tán thưởng nhiều nhất",
            usage_notes: "Dạng nguyên mẫu: 'steal the show'. Thường chia ở thì quá khứ 'stole the show' khi kể về các buổi biểu diễn nghệ thuật, bài thuyết trình hoặc đám cưới.",
            ielts_speaking_tip: "Cách diễn đạt Band 8.0 khi miêu tả 'A performance, concert, or public event you attended'."
          },
          usage_pattern: "steal the show / stole the show",
          register: "Neutral / Informal",
          tone: "Admiring"
        },
        {
          id: "5_1_beesknees",
          headword: "the bee's knees",
          definition_en: "superb; exceptionally good and outstanding",
          context_sentence: "The ice cream at Giuseppe's parlor really is the bee's knees!",
          page_number: 26,
          audio_file: "id_5_1_beesknees_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_beesknees_us.mp3",
          spoken_text: "The bee's knees. The ice cream at Giuseppe's parlor really is the bee's knees!",
          vietnamese: {
            meaning: "tuyệt đỉnh, ngon hết sảy, chất lượng số 1 không chê vào đâu được",
            usage_notes: "Thường dùng trong văn phong thân mật (đặc biệt trong tiếng Anh Anh): 'think someone/something is the bee's knees'.",
            ielts_speaking_tip: "Dùng tự nhiên khi nói về một món ăn địa phương hoặc quán cà phê yêu thích trong Speaking Part 1."
          },
          usage_pattern: "be the bee's knees",
          register: "Informal",
          tone: "Playful / Highly complimentary"
        },
        {
          id: "5_1_milesahead",
          headword: "miles ahead of",
          definition_en: "much more advanced, skilled, or successful than others",
          context_sentence: "My new TV is miles ahead of my old one.",
          page_number: 26,
          audio_file: "id_5_1_milesahead_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_milesahead_us.mp3",
          spoken_text: "Miles ahead of. My new TV is miles ahead of my old one.",
          vietnamese: {
            meaning: "vượt trội hơn hẳn, bỏ xa một khoảng cách lớn về trình độ hoặc chất lượng",
            usage_notes: "Cấu trúc so sánh hơn: '[A] is miles ahead of [B]'. Rất phổ biến khi đối chiếu công nghệ hoặc năng lực cạnh tranh.",
            ielts_speaking_tip: "Collocation học thuật hữu ích cho Writing Task 2 và Speaking Part 3 khi so sánh giữa các thế hệ công nghệ hoặc nền giáo dục."
          },
          usage_pattern: "be miles ahead of someone / something",
          register: "Neutral / Informal",
          tone: "Objective / Confident"
        },
        {
          id: "5_1_firstclass",
          headword: "first class",
          definition_en: "the very best; of the highest quality and excellence",
          context_sentence: "The workmen have done a first-class job on our kitchen. It looks beautiful.",
          page_number: 26,
          audio_file: "id_5_1_firstclass_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_firstclass_us.mp3",
          spoken_text: "First class. The workmen have done a first-class job on our kitchen. It looks beautiful.",
          vietnamese: {
            meaning: "hạng nhất, chất lượng tuyệt hảo, công việc được thực hiện chuẩn chỉ",
            usage_notes: "Có gạch nối khi làm tính từ đứng trước danh từ: 'a first-class service', không gạch nối khi làm vị ngữ: 'the service was first class'.",
            ielts_speaking_tip: "Từ vựng trang nhã dùng được cho cả IELTS Writing Task 1 (General) khi viết thư khen ngợi dịch vụ khách hàng."
          },
          usage_pattern: "do a first-class job / first-class quality",
          register: "Neutral / Formal",
          tone: "Commendatory"
        },
        {
          id: "5_1_outofthisworld",
          headword: "out of this world",
          definition_en: "extremely good, impressive, enjoyable, or breathtaking",
          context_sentence: "The view from the top of the mountain is totally out of this world. You can see for miles.",
          page_number: 26,
          audio_file: "id_5_1_outofthisworld_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_outofthisworld_us.mp3",
          spoken_text: "Out of this world. The view from the top of the mountain is totally out of this world. You can see for miles.",
          vietnamese: {
            meaning: "tuyệt vời ngoài sức tưởng tượng, đẹp ngoạn mục hoặc ngon mê ly",
            usage_notes: "Thường đi kèm phó từ nhấn mạnh: 'totally / absolutely out of this world'. Thích hợp cho cảnh quan, ẩm thực và âm nhạc.",
            ielts_speaking_tip: "Cực kỳ đắt giá khi miêu tả 'A breathtaking natural landscape or a memorable holiday trip'."
          },
          usage_pattern: "be out of this world / totally out of this world",
          register: "Informal",
          tone: "Awestruck / Enthusiastic"
        },
        {
          id: "5_1_thinkworldof",
          headword: "thinks the world of",
          definition_en: "really likes, loves, respects, or admires someone deeply",
          context_sentence: "Francisco thinks the world of his grandson. He loves spending time with him.",
          page_number: 26,
          audio_file: "id_5_1_thinkworldof_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_thinkworldof_us.mp3",
          spoken_text: "Thinks the world of. Francisco thinks the world of his grandson. He loves spending time with him.",
          vietnamese: {
            meaning: "hết mực yêu quý, coi trọng và tự hào về một ai đó như cả thế giới",
            usage_notes: "Cấu trúc: 'think the world of [person]'. Thể hiện tình cảm gắn bó thiêng liêng giữa ông bà và cháu, cha mẹ và con cái hoặc học trò và người thầy.",
            ielts_speaking_tip: "Tuyệt vời trong Speaking Part 2 khi miêu tả 'A family member or mentor who influenced your life'."
          },
          usage_pattern: "think the world of someone",
          register: "Neutral",
          tone: "Heartfelt / Warm"
        },
        {
          id: "5_1_worldclass",
          headword: "world-class",
          definition_en: "among the best in the world; meeting the highest international standards",
          context_sentence: "World-class athletes need to train for a few hours every day.",
          page_number: 26,
          audio_file: "id_5_1_worldclass_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_worldclass_us.mp3",
          spoken_text: "World-class. World-class athletes need to train for a few hours every day.",
          vietnamese: {
            meaning: "đẳng cấp thế giới, đạt chuẩn quốc tế đỉnh cao",
            usage_notes: "Tính từ ghép: 'world-class facilities', 'world-class education', 'world-class athletes'.",
            ielts_speaking_tip: "Từ vựng C1/C2 tiêu chuẩn cho cả IELTS Writing Task 2 (chủ đề Education, Healthcare, Sports)."
          },
          usage_pattern: "world-class + noun / be world-class",
          register: "Neutral / Formal",
          tone: "Authoritative / Professional"
        },
        {
          id: "5_1_icingcake",
          headword: "the icing on the cake",
          definition_en: "the best part of an already good experience; an added bonus that makes something even better",
          context_sentence: "We had a wonderful boat trip. The icing on the cake was seeing some dolphins.",
          page_number: 26,
          audio_file: "id_5_1_icingcake_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_icingcake_us.mp3",
          spoken_text: "The icing on the cake. We had a wonderful boat trip. The icing on the cake was seeing some dolphins.",
          vietnamese: {
            meaning: "điều tuyệt vời bất ngờ được cộng thêm vào, niềm vui nhân đôi",
            usage_notes: "Ở Anh dùng 'the icing on the cake', ở Mỹ hay dùng 'the frosting on the cake'. Đôi khi cũng có thể dùng mỉa mai.",
            ielts_speaking_tip: "Tạo cấu trúc kể chuyện cuốn hút trong Speaking Part 2 khi kể về một chuyến đi hoặc một sự kiện có cái kết bất ngờ viên mãn."
          },
          usage_pattern: "the icing on the cake / be the icing on the cake",
          register: "Neutral / Informal",
          tone: "Joyful"
        },
        {
          id: "5_1_ofherdreams",
          headword: "of (one's) dreams",
          definition_en: "that one has fantasized about having; ideal and perfect in every way",
          context_sentence: "Elisa just moved into the house of her dreams. It's a fabulous lakeside villa.",
          page_number: 26,
          audio_file: "id_5_1_ofherdreams_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_ofherdreams_us.mp3",
          spoken_text: "Of her dreams. Elisa just moved into the house of her dreams. It's a fabulous lakeside villa.",
          vietnamese: {
            meaning: "trong mơ, lý tưởng như trong giấc mơ bấy lâu hằng ấp ủ",
            usage_notes: "Thường đi sau danh từ: 'the job of my dreams', 'the house of her dreams', 'the holiday of their dreams'.",
            ielts_speaking_tip: "Rất hay trong Speaking Part 1 & 2 khi nói về ước mơ nghề nghiệp tương lai hoặc ngôi nhà lý tưởng bạn muốn sống."
          },
          usage_pattern: "the [noun] of one's dreams",
          register: "Neutral",
          tone: "Aspirational"
        }
      ]
    },
    {
      module_id: "5.2",
      module_title: "Excellence, Advantages, and Peak Performance",
      page_number: 27,
      idioms: [
        {
          id: "5_1_bestofbothworl",
          headword: "the best of both worlds",
          definition_en: "the benefits of two different situations or options at the same time",
          context_sentence: "Walking to work gives me the best of both worlds. It helps me save money and get fit.",
          page_number: 27,
          audio_file: "id_5_1_bestofbothworl_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_bestofbothworl_us.mp3",
          spoken_text: "The best of both worlds. Walking to work gives me the best of both worlds. It helps me save money and get fit.",
          vietnamese: {
            meaning: "vẹn cả đôi đường, được hưởng lợi thế từ cả hai phương án cùng lúc",
            usage_notes: "Thường đi với động từ 'give someone / have the best of both worlds'.",
            ielts_speaking_tip: "Cách diễn đạt Band 8.0 cực chuẩn trong Speaking Part 3 khi thảo luận về Work-Life Balance hoặc Hybrid Learning."
          },
          usage_pattern: "have / get the best of both worlds",
          register: "Neutral / Informal",
          tone: "Satisfied"
        },
        {
          id: "5_1_blessingdisguise",
          headword: "a blessing in disguise",
          definition_en: "something that seems bad or unlucky at first, but produces good results later",
          context_sentence: "Losing my office job was a blessing in disguise. My new job is much more interesting.",
          page_number: 27,
          audio_file: "id_5_1_blessingdisguise_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_blessingdisguise_us.mp3",
          spoken_text: "A blessing in disguise. Losing my office job was a blessing in disguise. My new job is much more interesting.",
          vietnamese: {
            meaning: "trong cái rủi có cái may, tái ông thất mã; họa hóa thành phúc",
            usage_notes: "Dùng để nhìn nhận tích cực về một biến cố không may trong quá khứ đã mở ra cơ hội mới tốt đẹp hơn.",
            ielts_speaking_tip: "Rất đắt giá trong Speaking Part 2 khi miêu tả 'A difficult decision or a difficult period in your life that led to a positive outcome'."
          },
          usage_pattern: "turn out to be a blessing in disguise / be a blessing in disguise",
          register: "Neutral",
          tone: "Reflective / Optimistic"
        },
        {
          id: "5_1_topoftheline",
          headword: "top of the line",
          definition_en: "the highest quality or most expensive version of a product or service",
          context_sentence: "Chan's store only sells watches that are top of the line.",
          page_number: 27,
          audio_file: "id_5_1_topoftheline_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_topoftheline_us.mp3",
          spoken_text: "Top of the line. Chan's store only sells watches that are top of the line.",
          vietnamese: {
            meaning: "cao cấp nhất, hiện đại và đắt giá nhất trong các dòng sản phẩm",
            usage_notes: "Ở Anh có thể dùng 'top of the range'. Có thể viết có gạch nối khi làm tính từ: 'top-of-the-line equipment'.",
            ielts_speaking_tip: "Từ vựng hữu ích khi nói về công nghệ, đồ điện tử hoặc cơ sở vật chất hiện đại trong Speaking Part 1 & 3."
          },
          usage_pattern: "top of the line / top-of-the-line",
          register: "Neutral / Informal",
          tone: "Commercial / Appreciative"
        },
        {
          id: "5_1_todiefor",
          headword: "to die for",
          definition_en: "extremely good, delicious, desirable, or beautiful",
          context_sentence: "The burgers in Max's diner are to die for. And they're huge!",
          page_number: 27,
          audio_file: "id_5_1_todiefor_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_todiefor_us.mp3",
          spoken_text: "To die for. The burgers in Max's diner are to die for. And they're huge!",
          vietnamese: {
            meaning: "ngon mê ly, ngon đỉnh chóp, hấp dẫn đến mức không cưỡng lại được",
            usage_notes: "Thường đứng sau to be: '[Food/Item] is to die for'. Phép nói quá cường điệu phổ biến trong giao tiếp hiện đại.",
            ielts_speaking_tip: "Cực kỳ tự nhiên khi trả lời câu hỏi 'Do you like trying new food / What is your favorite dish?' trong Speaking Part 1."
          },
          usage_pattern: "be to die for",
          register: "Informal",
          tone: "Enthusiastic"
        },
        {
          id: "5_1_mindblowing",
          headword: "mind-blowing",
          definition_en: "overwhelmingly impressive, astounding, or amazing",
          context_sentence: "The gallery has a mind-blowing collection of modern art.",
          page_number: 27,
          audio_file: "id_5_1_mindblowing_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_mindblowing_us.mp3",
          spoken_text: "Mind-blowing. The gallery has a mind-blowing collection of modern art.",
          vietnamese: {
            meaning: "gây kinh ngạc tột độ, sửng sốt và choáng ngợp trước quy mô phi thường",
            usage_notes: "Tính từ ghép: 'a mind-blowing experience', 'a mind-blowing discovery'. Thể hiện sự choáng ngợp tích cực.",
            ielts_speaking_tip: "Rất hay khi miêu tả cảm xúc khi xem một bộ phim khoa học viễn tưởng hoặc thăm bảo tàng ấn tượng trong Speaking Part 2."
          },
          usage_pattern: "mind-blowing + noun / be mind-blowing",
          register: "Informal",
          tone: "Astonished"
        },
        {
          id: "5_1_ravereviews",
          headword: "rave reviews",
          definition_en: "excellent reviews and enthusiastic praise from critics and audiences",
          context_sentence: "Laura's play has received rave reviews. The critics loved it!",
          page_number: 27,
          audio_file: "id_5_1_ravereviews_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_ravereviews_us.mp3",
          spoken_text: "Rave reviews. Laura's play has received rave reviews. The critics loved it!",
          vietnamese: {
            meaning: "cơn mưa lời khen, đánh giá 5 sao nhiệt liệt từ giới chuyên môn",
            usage_notes: "Thường đi với các động từ: 'receive / get / win rave reviews'.",
            ielts_speaking_tip: "Collocation tự nhiên Band 8.0 cho chủ đề 'Describe a film, book, or performance that you enjoyed'."
          },
          usage_pattern: "receive / get rave reviews",
          register: "Neutral / Formal",
          tone: "Celebratory"
        },
        {
          id: "5_1_toughactfollow",
          headword: "a tough act to follow",
          definition_en: "so good that it is difficult for whatever or whoever comes next to match it",
          context_sentence: "Javier's performance will be a tough act to follow. It was incredible.",
          page_number: 27,
          audio_file: "id_5_1_toughactfollow_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_toughactfollow_us.mp3",
          spoken_text: "A tough act to follow. Javier's performance will be a tough act to follow. It was incredible.",
          vietnamese: {
            meaning: "cái bóng quá lớn, người tiền nhiệm quá xuất sắc khiến người kế vị khó lòng vượt qua",
            usage_notes: "Có thể dùng 'a hard act to follow'. Áp dụng cho cả nghệ thuật biểu diễn, thể thao và lãnh đạo doanh nghiệp.",
            ielts_speaking_tip: "Dùng để nhận định sâu sắc về áp lực của thế hệ kế nghiệp hoặc người kế nhiệm lãnh đạo trong Speaking Part 3."
          },
          usage_pattern: "be a tough act to follow",
          register: "Neutral / Informal",
          tone: "Impressed / Challenging"
        },
        {
          id: "5_1_topnotch",
          headword: "top-notch",
          definition_en: "of the highest quality; first-rate; excellent",
          context_sentence: "Abel is a top-notch reporter. He's interviewed some really famous actors.",
          page_number: 27,
          audio_file: "id_5_1_topnotch_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_topnotch_us.mp3",
          spoken_text: "Top-notch. Abel is a top-notch reporter. He's interviewed some really famous actors.",
          vietnamese: {
            meaning: "đỉnh của chóp, xuất sắc bậc nhất, chất lượng thượng hạng",
            usage_notes: "Tính từ ghép: 'top-notch facilities', 'top-notch service', 'top-notch staff'.",
            ielts_speaking_tip: "Thay thế tuyệt vời cho từ 'very good' hay 'excellent' trong cả Speaking và Writing."
          },
          usage_pattern: "be top-notch / a top-notch professional",
          register: "Neutral / Informal",
          tone: "Appreciative"
        },
        {
          id: "5_1_cremedelacreme",
          headword: "the crème de la crème",
          definition_en: "the very best people or things in a group; the elite",
          context_sentence: "The crème de la crème of the fashion world were at the launch party.",
          page_number: 27,
          audio_file: "id_5_1_cremedelacreme_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_cremedelacreme_us.mp3",
          spoken_text: "The crème de la crème. The crème de la crème of the fashion world were at the launch party.",
          vietnamese: {
            meaning: "tinh hoa của tinh hoa, giới tinh hoa kiệt xuất nhất của một lĩnh vực",
            usage_notes: "Từ gốc tiếng Pháp mượn vào tiếng Anh. Đi với danh từ chỉ tập thể: 'the crème de la crème of [industry / society]'.",
            ielts_speaking_tip: "Từ vựng sang trọng, học thuật cho Speaking Part 3 khi nói về giới tinh hoa trong nghệ thuật, khoa học hoặc giáo dục đại học."
          },
          usage_pattern: "the crème de la crème of something",
          register: "Formal / Sophisticated",
          tone: "Respectful"
        },
        {
          id: "5_1_secondtonone",
          headword: "second to none",
          definition_en: "better than all others; having no equal; the absolute best",
          context_sentence: "Karolina's cake is second to none. It looks beautiful, and it tastes delicious.",
          page_number: 27,
          audio_file: "id_5_1_secondtonone_us.mp3",
          audio_url: "/audio/idioms/unit05/id_5_1_secondtonone_us.mp3",
          spoken_text: "Second to none. Karolina's cake is second to none. It looks beautiful, and it tastes delicious.",
          vietnamese: {
            meaning: "vô địch thiên hạ, không ai sánh bằng, đứng số 1 tuyệt đối",
            usage_notes: "Thường dùng làm vị ngữ: '[Quality/Service] is second to none'. Tuyên bố dứt khoát về vị trí dẫn đầu.",
            ielts_speaking_tip: "Cách diễn đạt Band 8.5 để khẳng định thế mạnh vượt trội của một dịch vụ hoặc kỹ năng trong Speaking Part 2 & 3."
          },
          usage_pattern: "be second to none",
          register: "Neutral / Formal",
          tone: "Emphatic / Confident"
        }
      ]
    }
  ],
  exercises: [
    {
      exercise_id: "5.4",
      exercise_type: "DEFINITION_MATCHING",
      instruction: "MATCH THE IDIOMS TO THEIR CORRECT DEFINITIONS",
      page_number: 28,
      is_audio_based: false,
      questions: [
        {
          question_number: 1,
          term: "second to none",
          target_definition: "far better than any others; having no equal",
          source_answer_ref: "page_29_item_5.5_ex"
        },
        {
          question_number: 2,
          term: "top-notch",
          target_definition: "highest quality; first-rate",
          source_answer_ref: "page_227_item_5.5_1"
        },
        {
          question_number: 3,
          term: "the icing on the cake",
          target_definition: "the best part of an already good experience",
          source_answer_ref: "page_227_item_5.5_2"
        },
        {
          question_number: 4,
          term: "rave reviews",
          target_definition: "excellent and enthusiastic reviews from critics",
          source_answer_ref: "page_227_item_5.5_3"
        },
        {
          question_number: 5,
          term: "thinks the world of",
          target_definition: "really likes, loves, or admires someone deeply",
          source_answer_ref: "page_227_item_5.5_4"
        },
        {
          question_number: 6,
          term: "of her dreams",
          target_definition: "that she has fantasized about having; ideal",
          source_answer_ref: "page_227_item_5.5_5"
        }
      ]
    },
    {
      exercise_id: "5.5",
      exercise_type: "FILL_IN_THE_BLANKS",
      instruction: "COMPLETE THE SENTENCES WITH THE CORRECT IDIOMS",
      page_number: 28,
      is_audio_based: false,
      questions: [
        {
          question_number: 1,
          prompt_prefix: "My kids think this TV show is ",
          prompt_suffix: ".",
          target_answer: "the best thing since sliced bread",
          accepted_answers: ["the best thing since sliced bread", "best thing since sliced bread"],
          hint: "an extremely innovative and entertaining creation (6 words)",
          source_answer_ref: "page_226_item_5.2_1"
        },
        {
          question_number: 2,
          prompt_prefix: "We had a wonderful boat trip. ",
          prompt_suffix: " was seeing some dolphins.",
          target_answer: "The icing on the cake",
          accepted_answers: ["The icing on the cake", "the icing on the cake"],
          hint: "the added bonus to a great experience (5 words)",
          source_answer_ref: "page_226_item_5.2_2"
        },
        {
          question_number: 3,
          prompt_prefix: "Chan's store only sells watches that are ",
          prompt_suffix: ".",
          target_answer: "top of the line",
          accepted_answers: ["top of the line", "the top of the line"],
          hint: "the highest quality / most expensive version (4 words)",
          source_answer_ref: "page_226_item_5.2_3"
        },
        {
          question_number: 4,
          prompt_prefix: "Losing my office job was ",
          prompt_suffix: ". My new job is much more interesting.",
          target_answer: "a blessing in disguise",
          accepted_answers: ["a blessing in disguise", "blessing in disguise"],
          hint: "something seemingly bad that had great results (4 words)",
          source_answer_ref: "page_27_item_5.1_12"
        },
        {
          question_number: 5,
          prompt_prefix: "Marcelo ",
          prompt_suffix: " with his amazing singing.",
          target_answer: "stole the show",
          accepted_answers: ["stole the show"],
          hint: "attracted the most praise and attention (3 words)",
          source_answer_ref: "page_227_item_5.6_2"
        },
        {
          question_number: 6,
          prompt_prefix: "The burgers in Max's diner are ",
          prompt_suffix: ". And they're huge!",
          target_answer: "to die for",
          accepted_answers: ["to die for"],
          hint: "extremely delicious and mouthwatering (3 words)",
          source_answer_ref: "page_227_item_5.6_5"
        }
      ]
    },
    {
      exercise_id: "5.6",
      exercise_type: "MULTIPLE_CHOICE_CONTEXT",
      instruction: "CHOOSE THE CORRECT IDIOM TO COMPLETE EACH SENTENCE",
      page_number: 29,
      is_audio_based: false,
      questions: [
        {
          question_number: 1,
          prompt: "The view from the top of the mountain is totally ________. You can see for miles.",
          options: [
            { key: "A", text: "out of this world" },
            { key: "B", text: "second to none" },
            { key: "C", text: "the bee's knees" }
          ],
          correct_key: "A",
          explanation: "'Out of this world' miêu tả khung cảnh đẹp ngoạn mục đến mức vượt qua mọi chuẩn mực trần thế thông thường.",
          source_answer_ref: "page_26_item_5.1_6"
        },
        {
          question_number: 2,
          prompt: "Walking to work gives me ________. It helps me save money and get fit.",
          options: [
            { key: "A", text: "the icing on the cake" },
            { key: "B", text: "the best of both worlds" },
            { key: "C", text: "a tough act to follow" }
          ],
          correct_key: "B",
          explanation: "'The best of both worlds' (vẹn cả đôi đường) diễn tả việc vừa tiết kiệm chi phí đi lại vừa nâng cao sức khỏe thể chất cùng một lúc.",
          source_answer_ref: "page_227_item_5.6_4"
        },
        {
          question_number: 3,
          prompt: "________ of the fashion world were at the launch party.",
          options: [
            { key: "A", text: "The crème de la crème" },
            { key: "B", text: "The bee's knees" },
            { key: "C", text: "A tough act to follow" }
          ],
          correct_key: "A",
          explanation: "'The crème de la crème' là danh xưng tôn vinh những nhân vật tinh hoa xuất chúng nhất trong làng thời trang quốc tế.",
          source_answer_ref: "page_227_item_5.6_3"
        },
        {
          question_number: 4,
          prompt: "Laura's play has received ________. The critics loved it!",
          options: [
            { key: "A", text: "rave reviews" },
            { key: "B", text: "the best of both worlds" },
            { key: "C", text: "first class" }
          ],
          correct_key: "A",
          explanation: "'Receive rave reviews' là collocation chuẩn mực chỉ việc một vở kịch nhận được cơn mưa lời khen nhiệt liệt từ giới phê bình.",
          source_answer_ref: "page_27_item_5.1_16"
        },
        {
          question_number: 5,
          prompt: "Javier's performance will be ________. It was incredible.",
          options: [
            { key: "A", text: "a blessing in disguise" },
            { key: "B", text: "a tough act to follow" },
            { key: "C", text: "top of the line" }
          ],
          correct_key: "B",
          explanation: "'A tough act to follow' diễn tả một màn trình diễn quá xuất sắc khiến bất kỳ ai diễn tiếp sau đó đều gặp áp lực rất lớn.",
          source_answer_ref: "page_27_item_5.1_17"
        },
        {
          question_number: 6,
          prompt: "Karolina's cake is ________. It looks beautiful, and it tastes delicious.",
          options: [
            { key: "A", text: "second to none" },
            { key: "B", text: "miles ahead of" },
            { key: "C", text: "a blessing in disguise" }
          ],
          correct_key: "A",
          explanation: "'Second to none' khẳng định chiếc bánh của Karolina ngon và đẹp số 1, không có đối thủ nào sánh kịp.",
          source_answer_ref: "page_27_item_5.1_20"
        }
      ]
    },
    {
      exercise_id: "5.7",
      exercise_type: "SITUATIONAL_JUDGMENT",
      instruction: "CHỌN CÁCH DIỄN ĐẠT CHUẨN XÁC NHẤT THEO TÌNH HUỐNG THỰC TẾ",
      page_number: 29,
      is_audio_based: false,
      questions: [
        {
          question_number: 1,
          situation: "Trong bài thi IELTS Speaking Part 2 miêu tả một ứng dụng di động thay đổi hoàn toàn cách học tiếng Anh của bạn, bạn muốn nhấn mạnh sự tiện lợi vượt bậc mang tính cách mạng của nó.",
          options: [
            {
              key: "A",
              text: "I genuinely think this vocabulary app is the best thing since sliced bread; it has completely revolutionized how I retain C1 collocations."
            },
            {
              key: "B",
              text: "This app is a tough act to follow because it was a blessing in disguise."
            },
            {
              key: "C",
              text: "This app stole the show by being the icing on the cake of my old laptop."
            }
          ],
          correct_key: "A",
          explanation: "'The best thing since sliced bread' là cách diễn đạt tự nhiên nhất để ca ngợi một sản phẩm công nghệ tiện ích mang tính đột phá."
        },
        {
          question_number: 2,
          situation: "Bạn bị trượt visa du học năm trước nên buộc phải ở lại làm việc tại một công ty công nghệ trong nước. Tại đây bạn học được kỹ năng lập trình thực tế và tích lũy được một khoản vốn lớn trước khi giành học bổng toàn phần vào năm nay.",
          options: [
            {
              key: "A",
              text: "Missing the visa last year turned out to be a blessing in disguise, as it gave me invaluable practical experience and financial independence."
            },
            {
              key: "B",
              text: "Missing the visa was the crème de la crème because I was miles ahead."
            },
            {
              key: "C",
              text: "It was out of this world and top of the line when I missed the flight."
            }
          ],
          correct_key: "A",
          explanation: "'A blessing in disguise' phản ánh trọn vẹn triết lý trong cái rủi có cái may: sự cố trượt visa ban đầu tưởng là bất hạnh nhưng đã dẫn tới kết quả rực rỡ hơn."
        },
        {
          question_number: 3,
          situation: "Bạn miêu tả kỳ nghỉ dưỡng tuyệt vời tại Đà Lạt: không khí trong lành, resort sang trọng, và điều bất ngờ nhất là bạn được tham gia miễn phí một buổi hòa nhạc cổ điển ngoài trời dưới rừng thông.",
          options: [
            {
              key: "A",
              text: "The trip was top-notch, and the surprise classical concert in the pine forest was truly the icing on the cake."
            },
            {
              key: "B",
              text: "The concert was a tough act to follow since the weather was second to none."
            },
            {
              key: "C",
              text: "The trip was the best of both worlds because the food was miles ahead."
            }
          ],
          correct_key: "A",
          explanation: "'The icing on the cake' miêu tả hoàn hảo buổi hòa nhạc như một niềm vui bất ngờ làm cho chuyến đi vốn đã tuyệt vời nay càng thêm trọn vẹn."
        }
      ]
    },
    {
      exercise_id: "5.8",
      exercise_type: "CONCEPTUAL_IMAGE_MATCHING",
      instruction: "THỬ THÁCH HIỂU NGUYÊN BẢN: KẾT NỐI HÌNH TƯỢNG VÀ NGHĨA BÓNG (UNIT 5)",
      page_number: 29,
      is_audio_based: false,
      description: "Hiểu gốc rễ vì sao hình tượng ban đầu lại tạo nên nghĩa bóng hiện đại.",
      questions: [
        {
          question_number: 1,
          target_idiom: "the best thing since sliced bread",
          prompt: "Sự kiện lịch sử công nghiệp nào giải thích vì sao hình tượng 'bánh mì cắt lát' (sliced bread) lại trở thành thước đo cho phát minh tuyệt đỉnh?",
          options: [
            {
              key: "A",
              text: "Bánh mì thời xưa được làm thủ công rất đắt, đến khi cắt lát sẵn mới bán đại trà cho người nghèo."
            },
            {
              key: "B",
              text: "Năm 1928, cỗ máy tự động cắt và đóng gói bánh mì đồng đều của Otto Rohwedder ra đời, giải phóng các bà nội trợ khỏi việc dùng dao cắt bánh vất vả và vụn nát; sự tiện lợi mang tính cách mạng này đã biến nó thành chuẩn mực so sánh cho mọi sáng chế vĩ đại sau đó."
            },
            {
              key: "C",
              text: "Các đầu bếp quý tộc Pháp sáng tạo ra kỹ thuật cắt bánh mì siêu mỏng cho tiệc trà hoàng gia."
            }
          ],
          correct_key: "B",
          explanation: "Sáng chế năm 1928 của Otto Frederick Rohwedder đã thay đổi hoàn toàn cuộc sống thường nhật của hàng triệu gia đình, tạo nên thành ngữ cửa miệng ca ngợi những phát minh tiện ích vượt bậc."
        },
        {
          question_number: 2,
          target_idiom: "the crème de la crème",
          prompt: "Hình tượng vật lý nào trong quá trình sản xuất sữa tạo nên ý niệm 'tinh hoa của tinh hoa' trong cụm từ 'the crème de la crème'?",
          options: [
            {
              key: "A",
              text: "Kem sữa đun sôi bốc hơi lên thành khói trắng tinh khiết."
            },
            {
              key: "B",
              text: "Khi sữa tươi nguyên chất lắng lại tự nhiên, phần váng kem béo ngậy và tinh túy nhất sẽ nổi lên trên cùng; 'kem của lớp kem' đại diện cho phần cô đọng thượng hạng nhất của những gì vốn đã tinh hoa."
            },
            {
              key: "C",
              text: "Nông dân Pháp chỉ dùng loại cỏ đắt nhất trên núi cao cho bò ăn để lấy sữa làm kem."
            }
          ],
          correct_key: "B",
          explanation: "Quy luật tự nhiên của sữa nguyên kem: lớp kem béo nhất nổi lên đỉnh. Mượn từ tiếng Pháp thế kỷ 18, 'kem của kem' trở thành ẩn dụ bất hủ cho tầng lớp kiệt xuất nhất của xã hội."
        },
        {
          question_number: 3,
          target_idiom: "a tough act to follow",
          prompt: "Bối cảnh văn hóa sân khấu nào giải thích cho thành ngữ 'a tough act to follow'?",
          options: [
            {
              key: "A",
              text: "Trong sân khấu tạp kỹ (Vaudeville) đầu thế kỷ 20, khi một tiết mục biểu diễn trước quá xuất sắc và bùng nổ, nghệ sĩ diễn tiết mục ngay sau đó phải chịu áp lực khủng khiếp vì khán giả đã đặt kỳ vọng quá cao và rất khó để làm họ ấn tượng hơn."
            },
            {
              key: "B",
              text: "Các diễn viên kịch Shakespeare phải ghi nhớ kịch bản dài bằng tiếng Latin."
            },
            {
              key: "C",
              text: "Đạo diễn sân khấu thường phạt trừ tiền những diễn viên bước ra sân khấu muộn."
            }
          ],
          correct_key: "A",
          explanation: "Bắt nguồn từ lịch diễn của sân khấu tạp kỹ: tiết mục đi trước (the preceding act) diễn quá hay khiến tiết mục đi sau (the following act) rơi vào thế cực kỳ khó khăn ('tough act to follow')."
        }
      ]
    }
  ]
} as const;

export default UNIT_05_DATA;
