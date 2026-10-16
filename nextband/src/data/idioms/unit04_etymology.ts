// UNIT 04: Personality traits — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis

export interface IdiomEtymology {
  idiom_headword: string;
  current_figurative_meaning: string;
  literal_image: string;
  figurative_connection: string;
  historical_context: string;
  deep_example: string;
  evidence_category: "DOCUMENTED ORIGIN" | "PLAUSIBLE IMAGE/MEANING CONNECTION" | "ORIGIN UNCERTAIN";
  sources: {
    title: string;
    url: string;
    note: string;
  }[];
}

export const UNIT_04_ETYMOLOGY: Record<string, IdiomEtymology> = {
  "4_1_vividimagination": {
    idiom_headword: "have a vivid imagination",
    current_figurative_meaning: "Có trí tưởng tượng phong phú, sống động và sáng tạo vượt bậc",
    literal_image: "Từ 'vivid' bắt nguồn từ gốc Latin 'vividus' (tràn đầy sức sống, sống động) kết hợp với 'imagination' (khả năng kiến tạo hình ảnh trong tâm trí). Hình tượng một tâm trí có khả năng vẽ nên những bức tranh tinh thần rực rỡ, chân thực như đang diễn ra trước mắt.",
    figurative_connection: "Khi tâm trí tái hiện hình ảnh sắc nét và giàu màu sắc như sự sống thực thụ, người đó sở hữu năng lực sáng tạo nghệ thuật, viết lách hoặc tư duy giả định rất phong phú.",
    historical_context: "Tính từ 'vivid' du nhập vào tiếng Anh vào thế kỷ 17 để miêu tả ánh sáng và màu sắc rực rỡ, sau đó được các triết gia và nhà văn Khai sáng thế kỷ 18 dùng để miêu tả năng lực tái hiện nội tâm (vivid imagination).",
    deep_example: "Lucia has a vivid imagination; she can take a mundane daily commute and turn it into a captivating fantasy novel.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary (OED) — vivid, adj.",
        url: "https://www.oed.com/view/Entry/224213",
        note: "Ghi nhận nguồn gốc Latin 'vividus' và sự phát triển ngữ nghĩa áp dụng cho trí óc từ thế kỷ 17–18."
      },
      {
        title: "Etymonline — vivid (adj.)",
        url: "https://www.etymonline.com/word/vivid",
        note: "Gốc từ Latin vivere (sống) và bước chuyển sang ý niệm sinh động trong tưởng tượng."
      }
    ]
  },

  "4_1_selfishstreak": {
    idiom_headword: "have a selfish streak",
    current_figurative_meaning: "Có một nét tính cách ích kỷ thỉnh thoảng bộc phát (dù bình thường không hẳn là người xấu)",
    literal_image: "Từ 'streak' ban đầu chỉ một vệt màu, đường sọc dài nổi bật trên một bề mặt đơn sắc (như tia chớp hoặc sọc lông động vật).",
    figurative_connection: "Ẩn dụ coi tính cách tổng thể của một người như một tấm vải; 'selfish streak' là một sợi chỉ hay vệt màu ích kỷ đan xen vào đó. Người này không phải hoàn toàn xấu xa, nhưng thỉnh thoảng nét ích kỷ lại lộ rõ trong các tình huống thử thách lòng hào hiệp.",
    historical_context: "Nghĩa bóng của 'streak' chỉ một nét tính cách hoặc khuynh hướng bộc phát (a streak of cruelty, a winning streak) xuất hiện trong tiếng Anh từ cuối thế kỷ 18 và đầu thế kỷ 19.",
    deep_example: "Gustav is generally a warm colleague, but he has a selfish streak whenever year-end bonuses are being negotiated.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — streak, n.",
        url: "https://www.oed.com/view/Entry/191370",
        note: "Định nghĩa streak như một 'vein, strain, or trace of some quality in character'."
      },
      {
        title: "Merriam-Webster Dictionary — streak (noun)",
        url: "https://www.merriam-webster.com/dictionary/streak",
        note: "Mô tả nghĩa 'a narrow layer or trace of a specified characteristic'."
      }
    ]
  },

  "4_1_twofaced": {
    idiom_headword: "two-faced",
    current_figurative_meaning: "Hai mặt, đạo đức giả, trước mặt nói lời hay ý đẹp nhưng sau lưng lại nói xấu hoặc phản bội",
    literal_image: "Sinh vật hoặc bức tượng có hai khuôn mặt đối lập nhìn về hai hướng khác nhau — bắt nguồn từ hình tượng thần Janus trong thần thoại La Mã cổ đại.",
    figurative_connection: "Một khuôn mặt tươi cười, thân thiện hướng về phía bạn khi bạn có mặt; khuôn mặt thứ hai nham hiểm, quay đi chỗ khác để mỉa mai, nói xấu bạn ngay khi bạn vừa quay lưng.",
    historical_context: "Thần Janus có hai mặt trông coi các cánh cổng và sự khởi đầu. Đến thời kỳ Phục Hưng và đầu thế kỷ 16 tại Anh, hình ảnh 'two-faced' được dùng với nghĩa châm biếm người tráo trở, lừa dối trong văn học Tudor.",
    deep_example: "Arturo smiled and complimented my new presentation, but he's so two-faced that he privately ridiculed it to our director.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Brewer's Dictionary of Phrase and Fable — Janus-faced",
        url: "https://www.oxfordreference.com/display/10.1093/acref/9780199990009.001.0001/acref-9780199990009-e-3841",
        note: "Giải thích gốc tích vị thần Janus hai mặt và sự biến chuyển sang tính từ chỉ kẻ đạo đức giả."
      },
      {
        title: "Etymonline — two-faced (adj.)",
        url: "https://www.etymonline.com/word/two-faced",
        note: "Ghi nhận nghĩa đen từ thập niên 1550 và nghĩa bóng tráo trở từ khoảng năm 1600."
      }
    ]
  },

  "4_1_downtoearth": {
    idiom_headword: "down to earth",
    current_figurative_meaning: "Thực tế, bình dị, khiêm nhường và gần gũi, không hề kiêu ngạo dù giàu có hay nổi tiếng",
    literal_image: "Hai bàn chân đứng vững chắc trên mặt đất (earth), hoàn toàn đối lập với những người 'lơ lửng trên mây' (heads in the clouds) hoặc sống trong ảo tưởng xa hoa.",
    figurative_connection: "Mặt đất đại diện cho thế giới thực của cơm áo gạo tiền và con người bình dị. Người 'down to earth' giữ cho mình liên kết mật thiết với thực tế cuộc sống, giao tiếp chân thành và không tỏ ra thượng đẳng.",
    historical_context: "Cụm từ xuất hiện từ đầu thế kỷ 20 trong tiếng Anh Mỹ, ban đầu dùng trong bối cảnh hạ cánh máy bay hoặc đưa một ý tưởng lý thuyết trừu tượng quay về thực nghiệm khả thi, sau đó mở rộng thành tính từ chỉ phẩm chất con người.",
    deep_example: "Despite amassing a fortune from his tech startup, Noah remains remarkably down to earth, still driving his old pickup truck.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge Advanced Learner's Dictionary — down-to-earth",
        url: "https://dictionary.cambridge.org/dictionary/english/down-to-earth",
        note: "Định nghĩa tính cách thực tế, không giả tạo của con người."
      },
      {
        title: "Oxford English Dictionary — down-to-earth, adj.",
        url: "https://www.oed.com/view/Entry/57321",
        note: "Ghi nhận các tài liệu đầu thế kỷ 20 về quá trình hình thành nghĩa bóng."
      }
    ]
  },

  "4_1_toosmartfor": {
    idiom_headword: "too smart for (one's) own good",
    current_figurative_meaning: "Quá thông minh lanh lợi đến mức tự phụ, làm ra vẻ hiểu biết khiến người khác khó chịu hoặc tự rước họa",
    literal_image: "Sự thông minh (smartness) vượt quá ngưỡng mang lại lợi ích ('own good') cho chính chủ thể, biến sự lanh lợi thành công cụ tự gây bất lợi.",
    figurative_connection: "Một người quá tự tin vào tài trí thường hay bắt bẻ, thể hiện bản thân, xem thường người khác hoặc tìm cách lách luật liều lĩnh, để rồi cuối cùng bị cô lập hoặc vấp ngã cay đắng.",
    historical_context: "Thành ngữ cấu trúc '[Adjective] for one's own good' rất phổ biến từ thế kỷ 19 trong văn hóa Anh - Mỹ nhằm răn đe thói tự phụ trí tuệ và khuyến khích đức tính khiêm tốn.",
    deep_example: "Zoe was constantly correcting her professors in public; she was too smart for her own good and alienated her entire research group.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Collins English Dictionary — too smart for your own good",
        url: "https://www.collinsdictionary.com/dictionary/english/too-smart-for-your-own-good",
        note: "Giải thích sắc thái phê phán người thông minh nhưng thiếu khôn ngoan cảm xúc."
      },
      {
        title: "Oxford Learner's Dictionaries — smart (idioms)",
        url: "https://www.oxfordlearnersdictionaries.com/definition/english/smart_1",
        note: "Phân tích cấu trúc thành ngữ cảnh báo nguy cơ của thói kiêu ngạo tri thức."
      }
    ]
  },

  "4_1_crybaby": {
    idiom_headword: "a crybaby",
    current_figurative_meaning: "Kẻ hay mè nheo, nhõng nhẽo, người lớn nhưng tính khí như trẻ con, hễ gặp thất bại nhỏ là than khóc kể khổ",
    literal_image: "Một em bé sơ sinh đỏ hỏn chỉ biết khóc ré lên mỗi khi không vừa ý một điều nhỏ nhặt.",
    figurative_connection: "Khi áp dụng cho một người trưởng thành, từ này mang tính chế giễu sâu sắc: kẻ thiếu nghị lực kiềm chế cảm xúc, không chịu nhận trách nhiệm mà chỉ biết than vãn ỉ ôi như một đứa trẻ.",
    historical_context: "Từ ghép 'crybaby' xuất hiện phổ biến trong tiếng Anh Mỹ vào giữa thế kỷ 19 (thập niên 1850) trong văn cảnh thể thao và trường học để chế giễu những đứa trẻ thua cuộc hay khóc.",
    deep_example: "Bob threw a tantrum when he scored 98 instead of a perfect 100; what a complete crybaby!",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Etymonline — crybaby (n.)",
        url: "https://www.etymonline.com/word/crybaby",
        note: "Ghi nhận từ ghép xuất hiện từ năm 1851 trong tiếng Anh Mỹ chỉ người hay than vãn."
      },
      {
        title: "Merriam-Webster Dictionary — crybaby",
        url: "https://www.merriam-webster.com/dictionary/crybaby",
        note: "Định nghĩa kẻ yếu đuối hay than phiền về những chuyện cỏn con."
      }
    ]
  },

  "4_1_barreloflaughs": {
    idiom_headword: "a barrel of laughs",
    current_figurative_meaning: "Người cực kỳ vui tính, hóm hỉnh, mang lại bầu không khí tràn ngập tiếng cười cho mọi người (thường cũng dùng châm biếm)",
    literal_image: "Một chiếc thùng gỗ tròn lớn (barrel) chứa đầy ắp những tiếng cười rôm rả, mở nắp ra là tiếng cười trào dâng.",
    figurative_connection: "Thùng gỗ lớn là đơn vị đong đếm hàng hóa dồi dào thời xưa. Ví người đó như 'thùng chứa tiếng cười' diễn tả một nguồn năng lượng hài hước vô tận.",
    historical_context: "Xuất hiện trong tiếng lóng thế kỷ 20 tại Mỹ, biến thể song hành với 'a barrel of fun' và 'a barrel of monkeys' (thập niên 1890). Cụm từ thường được dùng cả nghĩa đen tích cực lẫn mỉa mai phủ định ('he's not exactly a barrel of laughs').",
    deep_example: "Jasmine was a barrel of laughs all evening, keeping the whole dinner party entertained with her witty anecdotes.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Barrel of monkeys / laughs",
        url: "https://www.phrases.org.uk/meanings/barrel-of-monkeys.html",
        note: "Lịch sử dùng danh từ 'barrel' để phóng đại số lượng niềm vui và trò tiêu khiển."
      },
      {
        title: "Green's Dictionary of Slang — barrel of laughs",
        url: "https://greensdictofslang.com/entry/v7v6pcy",
        note: "Ghi nhận các dẫn liệu văn học Anh - Mỹ thế kỷ 20."
      }
    ]
  },

  "4_1_averagejoe": {
    idiom_headword: "an average Joe",
    current_figurative_meaning: "Một người bình thường, người đàn ông bình dân với lối sống mộc mạc và thị hiếu phổ thông",
    literal_image: "'Joe' (tên viết tắt của Joseph) là tên nam giới phổ biến bậc nhất trong tầng lớp công nhân lao động tại Mỹ suốt nhiều thập kỷ.",
    figurative_connection: "Cái tên 'Joe' đại diện cho hàng triệu người đàn ông bình dị trong xã hội — những người chăm chỉ làm công ăn lương, thích xem bóng chày và ăn đồ ăn nhanh, không màng đến giới quý tộc thượng lưu.",
    historical_context: "Hình thành trong tiếng Anh Mỹ đầu thế kỷ 20 (gắn liền với 'Joe Sixpack', 'G.I. Joe'). 'Joe' từ lâu đã là từ lóng chỉ gã đàn ông bất kỳ ('any ordinary guy').",
    deep_example: "My dad isn't interested in fine dining or luxury yachts; he's just an average Joe who loves grilling burgers on the weekend.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Online Etymology Dictionary — Joe (n.)",
        url: "https://www.etymonline.com/word/Joe",
        note: "Giải thích 'Joe' như đại từ phiếm chỉ người đàn ông bình thường từ năm 1846."
      },
      {
        title: "Brewer's Dictionary of Modern Phrase & Fable — Average Joe",
        url: "https://www.oxfordreference.com/display/10.1093/acref/9780199990009.001.0001/acref-9780199990009-e-389",
        note: "Lịch sử định danh nguyên mẫu người bình dân Mỹ trong truyền thông thế kỷ 20."
      }
    ]
  },

  "4_1_boldasbrass": {
    idiom_headword: "(as) bold as brass",
    current_figurative_meaning: "Bạo dạn đến mức trơ tráo, tự tin không hề biết xấu hổ hay sợ hãi",
    literal_image: "Kim loại đồng thau (brass) có bề mặt vàng óng, cứng cáp, trơ trọi và không bị gỉ sét hay biến màu trước thời tiết.",
    figurative_connection: "Khuôn mặt trơ tráo, không hề đỏ mặt hay bối rối trước sự chỉ trích được ví như đúc bằng đồng thau lạnh lùng ('brazen-faced').",
    historical_context: "Có từ nửa cuối thế kỷ 18 ở Anh. Nhiều học giả liên hệ với giai thoại năm 1770 về viên thẩm phán/thị trưởng London kiêm nghị sĩ Brass Crosby, người đã bạo gan tống giam sứ giả của Quốc hội và bảo vệ quyền tự do báo chí.",
    deep_example: "Without an invitation, Chetan walked as bold as brass into the VIP lounge and requested an autograph from the director.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — As bold as brass",
        url: "https://www.phrases.org.uk/meanings/as-bold-as-brass.html",
        note: "Tài liệu lịch sử chi tiết về thị trưởng Brass Crosby (1770) và nguồn gốc từ kim loại brass."
      },
      {
        title: "Oxford English Dictionary — bold as brass",
        url: "https://www.oed.com/view/Entry/22812",
        note: "Ghi nhận văn bản đầu tiên vào năm 1789 của George Parker."
      }
    ]
  },

  "4_1_fuddyduddy": {
    idiom_headword: "a fuddy-duddy",
    current_figurative_meaning: "Người cổ hủ, bảo thủ, khó tính, luôn chối từ cái mới và bảo lưu những thói quen lỗi thời",
    literal_image: "Từ tượng thanh bắt nguồn từ việc mô phỏng những âm thanh lắp bắp lóng ngóng ('fuddle', 'dud') của một ông lão già nua mặc quần áo cũ kỹ luộm thuộm.",
    figurative_connection: "Một người có tư tưởng dậm chân tại chỗ, luôn phàn nàn về xu hướng hiện đại của giới trẻ và chỉ muốn sống theo nề nếp cứng nhắc từ thế kỷ trước.",
    historical_context: "Xuất hiện vào cuối thế kỷ 19 trong tiếng Anh Mỹ (khoảng năm 1871), có thể chịu ảnh hưởng từ tiếng lóng Scotland 'duddy' (quần áo rách rưới) hoặc 'fuddle' (lúng túng, bối rối vì tuổi tác).",
    deep_example: "Norah is such a fuddy-duddy that she refuses to use smartphone banking, insisting on mailing paper checks.",
    evidence_category: "ORIGIN UNCERTAIN",
    sources: [
      {
        title: "Etymonline — fuddy-duddy (n.)",
        url: "https://www.etymonline.com/word/fuddy-duddy",
        note: "Ghi nhận xuất xứ tiếng Anh Mỹ năm 1871; nguồn gốc từ nguyên chính xác vẫn chưa đồng nhất."
      },
      {
        title: "Oxford English Dictionary — fuddy-duddy, n.",
        url: "https://www.oed.com/view/Entry/75267",
        note: "Phân tích giả thuyết nguồn gốc từ phương ngữ miền bắc nước Anh và Scotland."
      }
    ]
  },

  "4_2_lonewolf": {
    idiom_headword: "a lone wolf",
    current_figurative_meaning: "Kẻ độc hành, người thích sống và làm việc một mình, tách biệt khỏi đám đông tập thể",
    literal_image: "Con sói tách khỏi bầy đàn — do bị đuổi, do tính khí đơn độc hoặc để tự đi tìm vùng lãnh thổ săn mồi riêng.",
    figurative_connection: "Loài sói vốn có tập tính bầy đàn rất cao. Một con sói dám tách bầy để sống một mình là biểu tượng cho người có tính tự lập cao, không thích phụ thuộc hay tuân theo quy tắc xã giao thông thường.",
    historical_context: "Ban đầu là thuật ngữ quan sát đời sống hoang dã của người bản địa Bắc Mỹ và các nhà thám hiểm, được phổ biến rộng rãi vào cuối thế kỷ 19 và đầu thế kỷ 20 trong văn học phương Tây.",
    deep_example: "My uncle is a true lone wolf; he spent thirty years writing philosophy in a secluded mountain cabin.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Merriam-Webster Dictionary — lone wolf",
        url: "https://www.merriam-webster.com/dictionary/lone%20wolf",
        note: "Ghi nhận lần đầu sử dụng nghĩa đen năm 1875 và nghĩa bóng độc lập năm 1901."
      },
      {
        title: "Oxford English Dictionary — lone wolf, n.",
        url: "https://www.oed.com/view/Entry/110058",
        note: "Phân tích tập tính tự nhiên của loài sói và ẩn dụ xã hội học hiện đại."
      }
    ]
  },

  "4_2_bootoagoose": {
    idiom_headword: "wouldn't say boo to a goose",
    current_figurative_meaning: "Cực kỳ rụt rè, nhút nhát, hiền lành đến mức không dám cất lời phản kháng hay làm phật lòng ai",
    literal_image: "Ngỗng nhà thời xưa ở các trang trại Anh nổi tiếng là loài hung dữ, hay rượt đuổi và mổ người lạ. 'Boo' là tiếng hô đơn giản nhất để xua đuổi loài chim.",
    figurative_connection: "Một người mà đến cả con ngỗng cũng không dám cất tiếng 'boo' để xua đuổi thì chắc chắn là người nhút nhát, sợ sệt tột cùng trước mọi xung đột.",
    historical_context: "Thành ngữ cổ có từ thế kỷ 16 tại Anh. Được ghi nhận trong tuyển tập tục ngữ của John Ray năm 1670 ('He cannot say bo to a goose') và vở kịch của John Lyly (1590).",
    deep_example: "Tony wouldn't say boo to a goose; whenever a disgruntled customer raises their voice, he just looks at the floor.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Say boo to a goose",
        url: "https://www.phrases.org.uk/meanings/say-boo-to-a-goose.html",
        note: "Tài liệu lịch sử văn bản từ thế kỷ 16 và sự hung hãn tự nhiên của loài ngỗng."
      },
      {
        title: "Oxford English Dictionary — boo, int.",
        url: "https://www.oed.com/view/Entry/21430",
        note: "Ghi chép tục ngữ dân gian 'not say boo to a goose' chỉ tính nhút nhát."
      }
    ]
  },

  "4_2_barkworsebite": {
    idiom_headword: "(someone's) bark is worse than their bite",
    current_figurative_meaning: "Khẩu xà tâm phật, miệng mồm hung dữ gắt gỏng nhưng thực chất rất hiền lành, không bao giờ làm hại ai",
    literal_image: "Con chó sủa ầm ĩ với vẻ ngoài đe dọa đáng sợ, nhưng thực tế nó lại không hề cắn ai.",
    figurative_connection: "Âm thanh la hét, dọa dẫm (bark) chỉ là lớp vỏ tự vệ hoặc thói quen bực dọc bên ngoài; hành động thực tế (bite) lại hoàn toàn vô hại và bao dung.",
    historical_context: "Tục ngữ cổ có từ thời La Mã cổ đại: Quintus Curtius Rufus từng ghi chép 'Canis timidus vehementius latrat quam mordet' (Chó nhát sủa to hơn cắn). John Heywood đưa vào văn bản tiếng Anh năm 1546.",
    deep_example: "Don't be intimidated by the head chef's shouting; his bark is far worse than his bite, and he loves teaching apprentices.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "John Heywood's Proverbs (1546)",
        url: "https://www.gutenberg.org/ebooks/12699",
        note: "Văn bản tục ngữ sớm nhất ghi nhận câu 'His bark is worse than his bite'."
      },
      {
        title: "Brewer's Dictionary of Phrase and Fable — Barking dogs seldom bite",
        url: "https://www.oxfordreference.com/display/10.1093/acref/9780199990009.001.0001/acref-9780199990009-e-612",
        note: "Nguồn gốc tục ngữ La Mã cổ đại từ nhà sử học Quintus Curtius."
      }
    ]
  },

  "4_2_darkhorse": {
    idiom_headword: "a dark horse",
    current_figurative_meaning: "Nhân tố bí ẩn, người ít khi khoe khoang nhưng bất ngờ bộc lộ tài năng hoặc giành chiến thắng ngoạn mục",
    literal_image: "Một chú ngựa đua có bộ lông sẫm màu, chưa từng xuất hiện trên bảng thành tích, không ai biết nguồn gốc xuất xứ hay phong độ thi đấu.",
    figurative_connection: "Vì thông tin bị che giấu trong 'bóng tối' (dark), các nhà cái không thể đánh giá thực lực của chú ngựa, để rồi bất ngờ chú ngựa đó bứt phá về nhất trước sự ngỡ ngàng của tất cả.",
    historical_context: "Bắt nguồn từ trường đua ngựa thế kỷ 19 ở Anh. Nhà văn Benjamin Disraeli (sau này là Thủ tướng Anh) là người đầu tiên đưa cụm từ vào văn học trong tiểu thuyết 'The Young Duke' (1831).",
    deep_example: "Ben never mentioned any musical training, but he sat at the grand piano and played Rachmaninoff flawlessly—what a dark horse!",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Dark horse",
        url: "https://www.phrases.org.uk/meanings/dark-horse.html",
        note: "Trích dẫn nguyên văn tiểu thuyết 'The Young Duke' (1831) của Benjamin Disraeli."
      },
      {
        title: "Oxford English Dictionary — dark horse, n.",
        url: "https://www.oed.com/view/Entry/47291",
        note: "Lịch sử thuật ngữ trường đua ngựa và mở rộng sang chính trị (James K. Polk năm 1844)."
      }
    ]
  },

  "4_2_nothurtfly": {
    idiom_headword: "wouldn't hurt a fly",
    current_figurative_meaning: "Hiền như cục bột, lương thiện tuyệt đối, không nỡ làm tổn thương bất kỳ sinh linh nào",
    literal_image: "Ngay cả một con ruồi (fly) nhỏ bé, phiền toái và bẩn thỉu mà người đó cũng không nỡ xuống tay đập chết.",
    figurative_connection: "Nếu một người không nỡ làm đau một sinh vật bé nhỏ và phiền nhiễu nhất, điều đó chứng minh bản tính của họ cực kỳ nhân từ, không có chút dã tâm hay ác ý nào.",
    historical_context: "Xuất hiện trong các tác phẩm ngụ ngôn và ngạn ngữ châu Âu thời Trung Cổ, được đại học giả Erasmus ghi nhận trong tập 'Adagia' (thế kỷ 16) dưới dạng 'Ne culicem quidem laedere' (Không hại cả con muỗi).",
    deep_example: "Despite his imposing height and tattooed arms, Rex is so gentle that he wouldn't hurt a fly.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Erasmus — Adagia (Collected Works of Erasmus)",
        url: "https://www.oxfordreference.com/display/10.1093/acref/9780199990009.001.0001/acref-9780199990009-e-264",
        note: "Nguồn gốc tục ngữ so sánh lòng nhân từ với côn trùng nhỏ bé."
      },
      {
        title: "Cambridge Idioms Dictionary — wouldn't hurt a fly",
        url: "https://dictionary.cambridge.org/dictionary/english/wouldn-t-hurt-harm-a-fly",
        note: "Định nghĩa tính cách hiền lành vô hại đối lập với ngoại hình đáng sợ."
      }
    ]
  },

  "4_2_socialbutterfly": {
    idiom_headword: "a social butterfly",
    current_figurative_meaning: "Người hướng ngoại, cực kỳ quảng giao, thích bay lượn kết nối nhiều hội nhóm bạn bè trong các buổi tiệc",
    literal_image: "Một chú bướm đầy màu sắc bay lượn thảnh thơi từ bông hoa này sang bông hoa khác, nếm một chút mật ngọt rồi lại bay đi.",
    figurative_connection: "Người quảng giao trong tiệc tùng trò chuyện vài phút với người này, rồi lại bay sang bắt chuyện với nhóm kia, luôn tươi vui và không gắn chặt với riêng một hội kín nào.",
    historical_context: "Xuất hiện trong tiếng Anh Mỹ vào giữa thế kỷ 20 để miêu tả những nhân vật thượng lưu hoặc người trẻ tuổi có đời sống xã hội năng động, thường xuyên xuất hiện ở các sự kiện xã hội.",
    deep_example: "Claire is a natural social butterfly; within ten minutes of arriving at the networking event, she had exchanged contacts with twenty people.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Merriam-Webster — social butterfly",
        url: "https://www.merriam-webster.com/dictionary/social%20butterfly",
        note: "Ghi nhận nguồn gốc tiếng lóng Mỹ thế kỷ 20 về thói quen giao lưu tiệc tùng."
      },
      {
        title: "Oxford Learner's Dictionaries — social butterfly",
        url: "https://www.oxfordlearnersdictionaries.com/definition/english/social-butterfly",
        note: "Định nghĩa người thích giao lưu rộng rãi với nhiều nhóm bạn khác nhau."
      }
    ]
  },

  "4_3_toughcookie": {
    idiom_headword: "a tough cookie",
    current_figurative_meaning: "Người cứng cỏi, kiên cường, lì lợm trước nghịch cảnh, không dễ bị khuất phục hay gục ngã trước áp lực",
    literal_image: "Một chiếc bánh quy (cookie) được nướng quá kỹ nên trở nên rắn đanh, khó có thể bẻ gãy hay cắn vỡ.",
    figurative_connection: "Ẩn dụ tinh thần thép của con người: nghịch cảnh có thể đè nén nhưng không thể làm họ tan vỡ hay nản lòng.",
    historical_context: "Bắt nguồn từ tiếng lóng đô thị Mỹ thập niên 1920–1930. Ban đầu 'cookie' là tiếng lóng chỉ một người phụ nữ lanh lợi, sau đó kết hợp với 'tough' để chỉ người có cá tính mạnh mẽ bất khuất.",
    deep_example: "Debbie received harsh critiques on her doctoral thesis, but she's a tough cookie and immediately began redrafting.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Green's Dictionary of Slang — tough cookie",
        url: "https://greensdictofslang.com/entry/vknf5fq",
        note: "Lịch sử tiếng lóng Mỹ từ thập niên 1920 về tính cách kiên cường."
      },
      {
        title: "Oxford English Dictionary — tough cookie, n.",
        url: "https://www.oed.com/view/Entry/203875",
        note: "Ghi nhận sự chuyển nghĩa từ bánh quy cứng sang người có nghị lực kiên cường."
      }
    ]
  },

  "4_3_coolcucumber": {
    idiom_headword: "(as) cool as a cucumber",
    current_figurative_meaning: "Cực kỳ điềm tĩnh, ung dung tự tại, không hề nao núng hay bối rối trước sóng gió và áp lực",
    literal_image: "Trái dưa chuột (cucumber) chứa đến 96% là nước; các nghiên cứu thực vật học cho thấy ruột dưa chuột trong những ngày hè oi bức luôn mát hơn nhiệt độ không khí bên ngoài khoảng 20°F (~11°C).",
    figurative_connection: "Trong khi mọi người xung quanh đang 'phát hỏa', hoảng loạn và toát mồ hôi vì căng thẳng, người này vẫn giữ được tâm thế 'mát lạnh', sáng suốt và không hề lay chuyển.",
    historical_context: "Thành ngữ văn học cổ xuất hiện từ đầu thế kỷ 17. Nhà viết kịch John Fletcher là người đầu tiên ghi nhận trong vở kịch 'Cupid's Revenge' (1615): 'Young temperate, then, cold as a cucumber'. Sau đó nhà thơ Alexander Pope phổ biến trong bài thơ năm 1732.",
    deep_example: "While the rest of the crew panicked during the engine failure, Kirstie remained as cool as a cucumber and landed the plane safely.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — As cool as a cucumber",
        url: "https://www.phrases.org.uk/meanings/as-cool-as-a-cucumber.html",
        note: "Dẫn liệu lịch sử từ vở kịch của John Fletcher (1615) và thực tế nhiệt độ bên trong quả dưa chuột."
      },
      {
        title: "Oxford English Dictionary — cucumber, n.",
        url: "https://www.oed.com/view/Entry/45532",
        note: "Ghi nhận tục ngữ so sánh nhiệt độ và tính cách điềm tĩnh từ thế kỷ 17."
      }
    ]
  },

  "4_3_goodegg": {
    idiom_headword: "a good egg",
    current_figurative_meaning: "Một người tốt bụng, đàng hoàng, đáng tin cậy và luôn sẵn lòng giúp đỡ người khác",
    literal_image: "Một quả trứng tươi ngon ('good egg'), khi đập ra thì lòng đỏ lòng trắng trong lành, đối lập hoàn toàn với quả trứng ung thối bên trong ('bad egg').",
    figurative_connection: "Vỏ ngoài của quả trứng không thể hiện được chất lượng bên trong; chỉ khi tiếp xúc lâu dài mới biết một người là 'trứng tốt' (người chân thành, tử tế) hay 'trứng ung' (kẻ xấu xa, phản bội).",
    historical_context: "Ban đầu cụm từ 'bad egg' xuất hiện trước tại Mỹ vào những năm 1850. Đến đầu thế kỷ 20, các học sinh trường nội trú tại Anh (như Eton, Harrow) đã tạo ra từ đối lập 'good egg' để khen ngợi bạn bè đáng tin cậy.",
    deep_example: "Jim's a real good egg; when my car broke down at midnight, he drove thirty miles without hesitation to tow me home.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Good egg",
        url: "https://www.phrases.org.uk/meanings/good-egg.html",
        note: "Nguồn gốc tiếng lóng học đường Anh đầu thế kỷ 20 phản đề của cụm từ 'bad egg'."
      },
      {
        title: "Oxford English Dictionary — good egg, n.",
        url: "https://www.oed.com/view/Entry/79925",
        note: "Ghi nhận văn bản đầu tiên vào năm 1903 trong tạp chí Punch."
      }
    ]
  },

  "4_3_saltearth": {
    idiom_headword: "the salt of the earth",
    current_figurative_meaning: "Những con người chân chất, lương thiện, khiêm nhường và đáng kính trọng nhất của xã hội",
    literal_image: "Muối ăn (salt) — khoáng chất thiết yếu bậc nhất của loài người thời cổ đại, dùng để bảo quản thực phẩm khỏi ôi thiu và tạo nên hương vị đậm đà cho cuộc sống.",
    figurative_connection: "Những con người lao động lương thiện, mộc mạc không màng danh lợi chính là 'muối' gìn giữ nền tảng đạo đức và sự thuần khiết cho xã hội loài người.",
    historical_context: "Xuất xứ trực tiếp từ Kinh Thánh Tân Ước, trong Bài giảng trên núi (Sermon on the Mount) của Chúa Jesus trong Phúc âm Matthew 5:13: 'Ye are the salt of the earth: but if the salt have lost his savour, wherewith shall it be salted?'",
    deep_example: "Hassan and his family are the true salt of the earth; despite having very little, they run a soup kitchen for the homeless every weekend.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "King James Bible — Matthew 5:13",
        url: "https://www.biblegateway.com/passage/?search=Matthew+5%3A13&version=KJV",
        note: "Nguồn gốc xuất xứ chính văn của lời dạy 'Ye are the salt of the earth'."
      },
      {
        title: "The Phrase Finder (Phrases.org.uk) — The salt of the earth",
        url: "https://www.phrases.org.uk/meanings/the-salt-of-the-earth.html",
        note: "Phân tích giá trị lịch sử của muối thời cổ đại và ảnh hưởng văn hóa của cụm từ."
      }
    ]
  }
};
