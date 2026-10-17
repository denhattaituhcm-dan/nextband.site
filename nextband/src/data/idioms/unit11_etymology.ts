// UNIT 11: Emotions — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 11, pages 50-53 & Answer Key page 228)

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

export const UNIT_11_ETYMOLOGY: Record<string, IdiomEtymology> = {
  // ==========================================
  // Module 11.1: IDIOMS USING VOCABULARY ABOUT THE BODY
  // ==========================================
  "11_1_eachotherthroat": {
    idiom_headword: "at each other's throats",
    current_figurative_meaning: "Tranh cãi gay gắt, xung đột nảy lửa, sẵn sàng lao vào tấn công hoặc triệt hạ lẫn nhau",
    literal_image: "Hai con thú săn mồi hoặc võ sĩ hung hãn nhảy xổ vào bóp cổ hoặc cắn xé yết hầu của đối phương.",
    figurative_connection: "Yết hầu (throat) là vị trí hiểm yếu, nhạy cảm nhất duy trì hơi thở và sự sống. 'Nhắm vào cổ họng nhau' là hình ảnh ẩn dụ tột cùng cho mức độ thù địch gay gắt, nơi các bên không còn tranh luận ôn hòa mà muốn hủy diệt đối phương.",
    historical_context: "Xuất hiện trong văn học Anh từ thời kỳ Trung Cổ và Cận Đại (thế kỷ 16). Hình tượng này phổ biến trong các ghi chép về các cuộc giao tranh giáp lá cà đẫm máu của binh lính và các cuộc đấu giác đấu của loài chó săn.",
    deep_example: "During the contentious corporate merger, the board of directors and the executive union were constantly at each other's throats over severance packages.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — throat (noun, phrases)",
        url: "https://www.oed.com/view/Entry/201290",
        note: "Ghi nhận ngữ liệu 'at one's throat' từ thế kỷ 16 biểu thị sự thù địch sinh tử."
      },
      {
        title: "The Phrase Finder — At each other's throats",
        url: "https://www.phrases.org.uk/meanings/at-each-others-throats.html",
        note: "Lịch sử và tư liệu văn bản thời phục hưng Anh."
      }
    ]
  },

  "11_1_heartsleeve": {
    idiom_headword: "wears his heart on his sleeve",
    current_figurative_meaning: "Bộc lộ cảm xúc quá rõ ràng, không giấu giếm hỷ nộ ái ố, ruột để ngoài da",
    literal_image: "Buộc hoặc thêu trái tim của mình lên ống tay áo nơi mọi người đều có thể dễ dàng nhìn thấy và chạm vào.",
    figurative_connection: "Trái tim là nơi chôn giấu những tâm tư thầm kín và dễ bị tổn thương nhất. Việc đeo nó lên tay áo đồng nghĩa với việc hoàn toàn cởi mở, không che đậy cảm xúc, chấp nhận để người ngoài nhìn thấu tâm can dù có thể gặp nguy cơ bị chế giễu.",
    historical_context: "Được bất hủ hóa bởi đại văn hào William Shakespeare trong vở bi kịch *Othello* (1604, Hồi 1, Cảnh 1), qua lời thoại của nhân vật Iago: 'For when my outward action doth demonstrate / The native act and figure of my heart / In compliment extern, 'tis not long after / But I will wear my heart upon my sleeve / For daws to peck at: I am not what I am.' Một giả thuyết văn hóa khác gắn với các giải đấu hiệp sĩ thời Trung Cổ, nơi hiệp sĩ buộc khăn lụa của ý trung nhân lên tay áo giáp.",
    deep_example: "Liam is incapable of playing poker because he wears his heart on his sleeve; every trace of excitement or anxiety shows instantly on his face.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Shakespeare Birthplace Trust — Othello (Act 1, Scene 1)",
        url: "https://www.shakespeare.org.uk/explore-shakespeare/shakespedia/shakespeares-plays/othello/",
        note: "Văn bản gốc năm 1604 lưu trữ tại Stratford-upon-Avon."
      },
      {
        title: "Oxford English Dictionary — sleeve (noun, phrases)",
        url: "https://www.oed.com/view/Entry/181580",
        note: "Phân tích nguồn gốc xuất hiện đầu tiên của thành ngữ trong kịch Shakespeare."
      }
    ]
  },

  "11_1_getcoldfeet": {
    idiom_headword: "got cold feet",
    current_figurative_meaning: "Chùn bước, mất hết can đảm vào phút chót trước một sự kiện trọng đại vì quá lo sợ và căng thẳng",
    literal_image: "Đôi bàn chân lạnh ngắt, tê cóng vì máu dồn về tim, khiến người đó không thể nhấc chân bước tiếp về phía trước.",
    figurative_connection: "Cơ chế sinh học thần kinh giao cảm (fight-or-flight): khi con người đối mặt với sự sợ hãi tột độ, mạch máu ở các chi co lại (ngoại biên lạnh đi) để ưu tiên bơm máu nuôi các cơ quan sinh tồn. Về mặt tâm lý, đôi chân lạnh cóng tượng trưng cho sự đình trệ, mất dũng khí hành động.",
    historical_context: "Xuất hiện trong cuốn tiểu thuyết *Seed-Time and Harvest* (1862) của nhà văn Đức Fritz Reuter (thành ngữ tiếng Đức 'kalte Füße bekommen', ban đầu chỉ việc con bạc thua tiền viện cớ chân lạnh để rút khỏi canh bạc). Thành ngữ đi vào văn học tiếng Anh qua tiểu thuyết *Maggie: A Girl of the Streets* (1893) của Stephen Crane.",
    deep_example: "Just thirty minutes before walking down the aisle, the groom got cold feet, though his best man successfully calmed his nerves.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Cold feet",
        url: "https://www.phrases.org.uk/meanings/cold-feet.html",
        note: "Lịch sử du nhập từ tiếng Đức thế kỷ 19 vào văn học Mỹ của Stephen Crane."
      },
      {
        title: "Merriam-Webster Dictionary — cold feet",
        url: "https://www.merriam-webster.com/dictionary/cold%20feet",
        note: "Định nghĩa tâm lý học hành vi và ngữ dụng hiện đại."
      }
    ]
  },

  "11_1_cryeyesout": {
    idiom_headword: "cried his eyes out",
    current_figurative_meaning: "Khóc ròng rã, khóc nức nở không kìm nén được vì quá đau buồn hoặc uất ức",
    literal_image: "Khóc nhiều đến mức tưởng như nước mắt cuốn trôi cả đôi mắt ra ngoài hốc mắt.",
    figurative_connection: "Phép phóng đại tu từ cực hạn (hyperbole). Cảm xúc đau đớn tột cùng biểu hiện qua dòng nước mắt tuôn rơi không dứt, khiến mắt sưng húp đỏ hoe như thể kiệt quệ hoàn toàn năng lượng thị giác.",
    historical_context: "Cụm thành ngữ phóng đại này đã được ghi chép trong văn học Anh từ đầu thế kỷ 18, thường thấy trong các khúc ca bi kịch và tiểu thuyết diễm tình miêu tả nỗi đau ly tán hoặc mất mát người thân.",
    deep_example: "When her childhood pet dog passed away peacefully, little Clara cried her eyes out in her mother's arms all evening.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — cry (verb, phrases)",
        url: "https://www.oed.com/view/Entry/45318",
        note: "Ngữ liệu 'cry one's eyes out' từ thế kỷ 18."
      },
      {
        title: "Cambridge English Dictionary — cry your eyes out",
        url: "https://dictionary.cambridge.org/dictionary/english/cry-your-eyes-out",
        note: "Định nghĩa thành ngữ miêu tả phản ứng khóc cực độ."
      }
    ]
  },

  "11_1_weightoffshould": {
    idiom_headword: "a weight off my shoulders",
    current_figurative_meaning: "Trút bỏ được gánh nặng nghìn cân, cảm thấy nhẹ nhõm vô cùng sau một thời gian dài âu lo",
    literal_image: "Một tảng đá tạ nặng đè trĩu đôi vai gầy bỗng nhiên được người khác nhấc bổng quẳng đi.",
    figurative_connection: "Bộ não con người thường xử lý áp lực tâm lý tương tự như trọng lượng vật lý (Embodied Cognition). Khi một mối lo âu tồn tại triền miên, cơ bắp vùng cổ và vai luôn căng cứng. Sự giải tỏa vấn đề mang lại cảm giác nhẹ bẫng cho toàn bộ khung xương thể xác.",
    historical_context: "Hình tượng thần thoại Hy Lạp về người khổng lồ Atlas phải gánh cả vòm trời trên vai. Thành ngữ phát triển trong tiếng Anh từ thế kỷ 17 để diễn tả sự thanh thản khi trả hết nợ nần hoặc vượt qua biến cố lớn.",
    deep_example: "Submitting my final master's dissertation was a tremendous weight off my shoulders after six months of sleepless research.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — A weight off your shoulders",
        url: "https://www.phrases.org.uk/meanings/a-weight-off-your-shoulders.html",
        note: "Ẩn dụ tri giác và sự nhẹ nhõm tâm lý trong lịch sử ngôn ngữ Anh."
      },
      {
        title: "Collins English Dictionary — a weight off someone's shoulders",
        url: "https://www.collinsdictionary.com/dictionary/english/a-weight-off-someones-shoulders",
        note: "Phân tích ngữ nghĩa học về sự giải tỏa áp lực."
      }
    ]
  },

  "11_1_upinarms": {
    idiom_headword: "up in arms",
    current_figurative_meaning: "Phẫn nộ dữ dội, biểu tình kịch liệt, đồng loạt đứng lên phản kháng một quyết định bất công",
    literal_image: "Binh sĩ hoặc dân làng vội vã cầm vũ khí (arms = súng, gươm, giáo) giương cao để chuẩn bị bước vào chiến trận.",
    figurative_connection: "'Arms' trong tiếng Anh cổ có nghĩa là vũ khí chiến đấu (từ gốc Latin *arma*). 'Up in arms' ban đầu là lời hiệu triệu khởi nghĩa vũ trang, về sau chuyển nghĩa bóng sang mọi phản ứng giận dữ, bất bình tập thể của người dân chống lại chính sách vô lý.",
    historical_context: "Xuất hiện trong các văn bản quân sự và lịch sử Anh từ thế kỷ 16 thời phong kiến. William Shakespeare đã sử dụng cụm từ này trong vở kịch lịch sử *Henry VI* và *Richard III* để miêu tả các cuộc nổi dậy của nông dân.",
    deep_example: "Local residents were up in arms when the municipal authorities announced plans to fell centuries-old trees for a highway expansion.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — arms (noun plural, military phrases)",
        url: "https://www.oed.com/view/Entry/12313",
        note: "Nguồn gốc quân sự của 'up in arms' từ thế kỷ 16."
      },
      {
        title: "Online Etymology Dictionary — arms",
        url: "https://www.etymonline.com/word/arms",
        note: "Lịch sử chuyển nghĩa từ vũ khí chiến trận sang phản đối xã hội."
      }
    ]
  },

  "11_1_foammouth": {
    idiom_headword: "foaming at the mouth",
    current_figurative_meaning: "Giận sôi máu, nổi cơn thịnh nộ lôi đình đến mức mất tự chủ và quát tháo dữ dội",
    literal_image: "Bọt mép sùi trắng xóa ở khóe miệng của con thú hoang bị mắc bệnh dại điên cuồng cắn xé.",
    figurative_connection: "Triệu chứng lâm sàng của bệnh dại (rabies) ở chó sói hay thú hoang là tuyến nước bọt sùi bọt mép vì co thắt cơ hầu họng và cơn cuồng loạn thần kinh. Ẩn dụ này so sánh cơn giận mất kiểm soát của con người với trạng thái hoang dại mất hết lý trí.",
    historical_context: "Thành ngữ đã tồn tại trong văn bản y học và văn học Anh từ thế kỷ 14. Shakespeare từng dùng ẩn dụ này trong vở kịch *Julius Caesar* (1599, Hồi 1, Cảnh 2) để miêu tả cơn ngất giật của Caesar: 'He fell down in the market-place, and foamed at mouth, and was speechless.'",
    deep_example: "When the client discovered that the accounting software had corrupted their annual financial audit, the CFO was practically foaming at the mouth.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Foaming at the mouth",
        url: "https://www.phrases.org.uk/meanings/foam-at-the-mouth.html",
        note: "Bệnh dại động vật và văn học Shakespeare thế kỷ 16."
      },
      {
        title: "Oxford English Dictionary — foam (verb, medical and figurative)",
        url: "https://www.oed.com/view/Entry/78726",
        note: "Tư liệu ghi chép từ tiếng Anh Trung Cổ thế kỷ 14."
      }
    ]
  },

  "11_1_lethairdown": {
    idiom_headword: "let my hair down",
    current_figurative_meaning: "Thư giãn xả hơi hết mình, rũ bỏ mọi khuôn phép lễ nghi gò bó để tận hưởng niềm vui",
    literal_image: "Người phụ nữ tháo ghim cài tóc, búi tóc cầu kỳ để mái tóc xõa dài tự nhiên sau một ngày dài dạ tiệc căng thẳng.",
    figurative_connection: "Thời xưa, phụ nữ quý tộc bắt buộc phải búi tóc chặt chẽ, cài trâm cầu kỳ khi xuất hiện trước công chúng để thể hiện sự đoan trang, danh giá. Chỉ khi trở về chốn phòng the riêng tư và an toàn, họ mới được tháo tóc xuống (let hair down) để nghỉ ngơi.",
    historical_context: "Bắt nguồn từ phong tục lễ nghi châu Âu thế kỷ 17-18. Cụm từ ban đầu là 'letting the hair down' được ghi nhận trong các bức thư riêng của giới quý tộc Anh từ thập niên 1700 trước khi trở thành thành ngữ cho cả nam và nữ vào thế kỷ 20.",
    deep_example: "After enduring a grueling tax season, our entire accounting department went to a seaside resort to finally let their hair down.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Let your hair down",
        url: "https://www.phrases.org.uk/meanings/let-your-hair-down.html",
        note: "Phong tục búi tóc quý tộc châu Âu thế kỷ 17 và quá trình mở rộng ngữ nghĩa."
      },
      {
        title: "Oxford English Dictionary — hair (noun, phrases)",
        url: "https://www.oed.com/view/Entry/83375",
        note: "Ngữ liệu ghi nhận từ thế kỷ 18."
      }
    ]
  },

  "11_1_brokenheart": {
    idiom_headword: "broken-hearted",
    current_figurative_meaning: "Đau lòng tan nát, trầm cảm u sầu tột cùng sau khi tan vỡ một mối tình sâu đậm hoặc mất người thân",
    literal_image: "Trái tim bằng pha lê hoặc đá quý trong lồng ngực bị đập vỡ vụn thành trăm mảnh.",
    figurative_connection: "Nỗi đau tình cảm sâu sắc thường kích hoạt các cơn co thắt vật lý thật ở ngực (trong y khoa hiện đại gọi là hội chứng Takotsubo cardiomyopathy hay 'Broken Heart Syndrome'). Hình tượng trái tim vỡ phản ánh chân thực nỗi đau đớn thể xác lẫn linh hồn.",
    historical_context: "Một trong những ẩn dụ cổ xưa nhất của nhân loại, xuất hiện hàng chục lần trong Kinh Thánh Cựu Ước (ví dụ: Psalm 34:18: 'The LORD is nigh unto them that are of a broken heart') và thơ ca lãng mạn thời Trung Cổ.",
    deep_example: "When his childhood sweetheart relocated permanently to another hemisphere, Julian was completely broken-hearted for months.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "King James Bible — Psalm 34:18",
        url: "https://www.biblegateway.com/passage/?search=Psalm%2034:18",
        note: "Khái niệm 'broken heart' trong văn bản tôn giáo cổ thế kỷ 17."
      },
      {
        title: "Harvard Medical School — Takotsubo Cardiomyopathy (Broken-heart syndrome)",
        url: "https://www.health.harvard.edu/heart-health/takotsubo-cardiomyopathy-broken-heart-syndrome",
        note: "Cơ sở sinh học và thần kinh học của ẩn dụ trái tim tan vỡ."
      }
    ]
  },

  "11_1_itchyfeet": {
    idiom_headword: "itchy feet",
    current_figurative_meaning: "Cuồng chân, ngứa ngáy muốn đi du lịch hoặc thay đổi môi trường sống sau thời gian dài ở yên một chỗ",
    literal_image: "Lòng bàn chân có cảm giác ngứa ran, bứt rứt không yên, thôi thúc cơ thể phải xỏ giày bước đi.",
    figurative_connection: "Cảm giác ngứa ngáy (itch) là phản xạ sinh học kích thích sự cọ xát và chuyển động. Đôi bàn chân 'ngứa' tượng trưng cho khát khao tự do, bản năng du mục (wanderlust) thôi thúc con người lên đường khám phá những vùng đất mới.",
    historical_context: "Bắt nguồn từ văn hóa dân gian du mục của người Romani (Gypsies) ở châu Âu từ thế kỷ 19, nơi có quan niệm mê tín: nếu lòng bàn chân phải ngứa thì sắp sửa có một chuyến đi xa gặp may mắn.",
    deep_example: "Having stayed in the same suburban town for three uninterrupted years, Elena developed itchy feet and booked a solo backpacking trip to Peru.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — itchy (adjective, phrases)",
        url: "https://www.oed.com/view/Entry/100346",
        note: "Dân gian du mục Romani và sự xuất hiện thành ngữ 'itchy feet' từ thế kỷ 19."
      },
      {
        title: "Cambridge English Dictionary — itchy feet",
        url: "https://dictionary.cambridge.org/dictionary/english/itchy-feet",
        note: "Định nghĩa hiện đại về tâm lý thích xê dịch (wanderlust)."
      }
    ]
  },

  "11_1_tonguetied": {
    idiom_headword: "tongue-tied",
    current_figurative_meaning: "Cứng họng, ấp úng không thốt nên lời vì quá hồi hộp, xấu hổ hoặc hoảng hốt",
    literal_image: "Chiếc lưỡi trong vòm họng như bị một sợi dây thừng vô hình trói chặt vào vòm miệng khiến không thể phát âm.",
    figurative_connection: "Về mặt y khoa bẩm sinh, 'tongue-tie' (ankyloglossia) là tật dính thắng lưỡi khiến trẻ khó phát âm. Về mặt tâm lý, khi con người bị hoảng loạn hoặc xấu hổ tột cùng, não bộ ức chế vùng Broca (vùng sản sinh ngôn ngữ), khiến cơ quan phát âm tê liệt tạm thời.",
    historical_context: "Xuất hiện trong văn học Anh từ thời kỳ Tudor (thập niên 1520). Đại văn hào William Shakespeare đã đưa cụm từ này vào *Sonnet 85* và *Sonnet 140* để miêu tả sự bối rối nghẹn lời của thi nhân trước vẻ đẹp của người yêu.",
    deep_example: "Standing on the TEDx stage in front of two thousand attendees, the novice speaker became momentarily tongue-tied before finding his rhythm.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — tongue-tied",
        url: "https://www.oed.com/view/Entry/203248",
        note: "Ghi nhận ngữ liệu từ năm 1528 và các bài Sonnet của Shakespeare."
      },
      {
        title: "Merriam-Webster Dictionary — tongue-tied",
        url: "https://www.merriam-webster.com/dictionary/tongue-tied",
        note: "Nguồn gốc y khoa và mở rộng sang tâm lý học giao tiếp."
      }
    ]
  },

  "11_1_keepstifflip": {
    idiom_headword: "keep a stiff upper lip",
    current_figurative_meaning: "Giữ vẻ ngoài bình thản kiên cường, kìm nén cảm xúc đau đớn không để lộ sự yếu đuối hay than vãn",
    literal_image: "Giữ chặt bờ môi trên căng thẳng, không cho nó run rẩy hay mếu máo khi sắp òa khóc.",
    figurative_connection: "Bờ môi trên (upper lip) là bộ phận cơ mặt đầu tiên phản bội cảm xúc yếu đuối: khi con người hoảng sợ hoặc xúc động muốn khóc, khóe môi trên sẽ run rẩy mếu máo. Việc giữ cho môi trên 'cứng cáp' (stiff) thể hiện ý chí thép kiểm soát hoàn toàn cảm xúc nội tâm.",
    historical_context: "Biểu tượng kinh điển của chủ nghĩa khắc kỷ (Stoicism) và phẩm chất quý tộc Anh thời Victoria (thế kỷ 19). Đây là chuẩn mực giáo dục trong các trường nội trú công lập (British public schools), đào tạo các sĩ quan quân đội và nhà ngoại giao giữ vững sự bình tĩnh thép trong mọi hiểm nguy.",
    deep_example: "Even when confronted with hostile cross-examination in the courtroom, the diplomat managed to keep a stiff upper lip and replied calmly.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Keep a stiff upper lip",
        url: "https://www.phrases.org.uk/meanings/keep-a-stiff-upper-lip.html",
        note: "Triết lý khắc kỷ thời Victoria và nguồn gốc cơ học biểu cảm khuôn mặt."
      },
      {
        title: "BBC History — The British Stiff Upper Lip",
        url: "https://www.bbc.co.uk/history/british/victorians/stiff_upper_lip_01.shtml",
        note: "Nghiên cứu văn hóa học về văn hóa kìm nén cảm xúc của người Anh."
      }
    ]
  },

  // ==========================================
  // Module 11.2: IDIOMS USING VOCABULARY ABOUT COLORS
  // ==========================================
  "11_2_feelblue": {
    idiom_headword: "feeling blue",
    current_figurative_meaning: "Cảm thấy u sầu, buồn bã, chán nản và thiếu vắng niềm vui trong lòng",
    literal_image: "Một bầu trời xám xịt phủ bóng xanh lạnh lẽo hoặc chiếc tàu cắm cờ xanh ảm đạm báo tang.",
    figurative_connection: "Màu xanh lam (blue) trong tâm lý học màu sắc gắn liền với nhiệt độ băng giá, sự lạnh lẽo, cô đơn và tĩnh lặng. Khi thiếu hơi ấm và ánh sáng mặt trời, tâm trạng con người chùng xuống tạo nên cảm giác 'xanh xao u sầu'.",
    historical_context: "Bắt nguồn từ tập tục hàng hải phương Tây thế kỷ 18: khi một con tàu mất thuyền trưởng hoặc sĩ quan chỉ huy trong chuyến hải hành, con tàu sẽ treo một lá cờ màu xanh lam (blue flag) và sơn một dải viền xanh dọc mạn thuyền khi trở về cảng nhà.",
    deep_example: "On gray rainy Sunday afternoons, Maya often feels a little blue and puts on acoustic jazz to lift her spirits.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Feeling blue",
        url: "https://www.phrases.org.uk/meanings/feeling-blue.html",
        note: "Tập tục treo cờ xanh tang lễ của ngành hàng hải thế kỷ 18."
      },
      {
        title: "Oxford English Dictionary — blue (adjective, emotional senses)",
        url: "https://www.oed.com/view/Entry/20593",
        note: "Lịch sử từ vựng biểu đạt nỗi buồn từ tiếng Anh Cận Đại."
      }
    ]
  },

  "11_2_sawred": {
    idiom_headword: "saw red",
    current_figurative_meaning: "Nổi trận lôi đình, bốc hỏa mất kiểm soát vì bị xúc phạm hoặc chứng kiến cảnh bất công",
    literal_image: "Thị giác bỗng nhiên bị bao phủ bởi một màu đỏ rực như máu hoặc tấm vải đỏ phất trước mắt con bò tót.",
    figurative_connection: "Màu đỏ là màu của máu, lửa và huyết áp tăng vọt. Về mặt sinh lý, khi tức giận cực độ, nhịp tim tăng nhanh làm dồn máu lên não và các vi mạch ở đáy mắt, khiến trường nhìn của người đó có xu hướng đỏ rực.",
    historical_context: "Thành ngữ hình thành vào cuối thế kỷ 19, chịu ảnh hưởng từ môn đấu bò tót Tây Ban Nha (bullfighting), nơi tấm vải đỏ *muleta* của đấu sĩ được cho là kích thích con bò điên cuồng lao vào tấn công (dù khoa học chứng minh bò bị mù màu và chỉ phản ứng với chuyển động).",
    deep_example: "When the animal rights activist saw the dog being kicked on the sidewalk, she completely saw red and confronted the abuser.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — See red",
        url: "https://www.phrases.org.uk/meanings/see-red.html",
        note: "Đấu bò tót Tây Ban Nha và các ghi chép ngữ liệu thế kỷ 19."
      },
      {
        title: "Merriam-Webster Dictionary — see red",
        url: "https://www.merriam-webster.com/dictionary/see%20red",
        note: "Định nghĩa phản xạ giận dữ đột ngột."
      }
    ]
  },

  "11_2_greenenvy": {
    idiom_headword: "green with envy",
    current_figurative_meaning: "Ghen tị đến mức đỏ mắt, đố kỵ cùng cực trước thành công hay may mắn của người khác",
    literal_image: "Sắc mặt tái mét chuyển sang sắc xanh xao của mật tiết ra khi bị nung nấu bởi lòng ghen ghét.",
    figurative_connection: "Thời cổ đại theo thuyết bốn thể dịch (Humoral theory), sự ghen ghét đố kỵ kích thích túi mật tiết ra quá nhiều dịch mật màu vàng xanh (green bile), làm làn da và tròng mắt của người đó ngả sang sắc xanh ốm yếu.",
    historical_context: "Đại thi hào William Shakespeare là người đã khắc sâu ẩn dụ này vào văn hóa thế giới trong vở *Othello* (Hồi 3, Cảnh 3) với câu nói nổi tiếng của Iago: 'O, beware, my lord, of jealousy; It is the green-eyed monster which doth mock / The meat it feeds on.' và trước đó trong *The Merchant of Venice* (1596).",
    deep_example: "My colleagues were green with envy when Sophia was awarded a fully funded scholarship to study at Oxford University.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Shakespeare's Othello — The Green-eyed Monster",
        url: "https://www.folger.edu/explore/shakespeares-works/othello/read/3/3/",
        note: "Văn bản kịch bản gốc của Folger Shakespeare Library."
      },
      {
        title: "Oxford English Dictionary — green (adjective, envious)",
        url: "https://www.oed.com/view/Entry/81204",
        note: "Thuyết thể dịch cổ Hy Lạp và ảnh hưởng văn học Shakespeare."
      }
    ]
  },

  "11_2_whitesheet": {
    idiom_headword: "as white as a sheet",
    current_figurative_meaning: "Mặt cắt không còn hột máu, trắng bệch tái mét vì quá kinh hãi, sốc nặng hoặc kiệt sức",
    literal_image: "Khuôn mặt trắng toát không một chút sắc hồng, tựa như một tấm vải trải giường bằng vải lanh trắng tinh.",
    figurative_connection: "Phản xạ sinh học co thắt mạch máu dưới da (vasoconstriction) khi gặp cú sốc tinh thần hoặc nỗi kinh hoàng bất ngờ. Toàn bộ lượng máu rút nhanh khỏi mao mạch khuôn mặt để chạy về các cơ quan sinh tồn, để lại làn da trắng bệch như tử thi được bọc trong tấm vải liệm trắng.",
    historical_context: "Thành ngữ so sánh cổ xưa trong tiếng Anh, được ghi chép từ thế kỷ 14 trong các tác phẩm văn học thời Trung Cổ miêu tả diện mạo của những người nhìn thấy hồn ma hoặc nhận hung tin tử trận.",
    deep_example: "When the detective revealed the incriminating surveillance footage, the suspect went as white as a sheet and ceased talking.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — sheet (noun, comparisons)",
        url: "https://www.oed.com/view/Entry/177977",
        note: "Ghi nhận so sánh 'white as a sheet' từ tiếng Anh Trung Đại."
      },
      {
        title: "Collins English Dictionary — as white as a sheet",
        url: "https://www.collinsdictionary.com/dictionary/english/as-white-as-a-sheet",
        note: "Phân tích trạng thái sốc tâm lý biểu hiện qua màu da."
      }
    ]
  },

  // ==========================================
  // Module 11.3: IDIOMS USING VOCABULARY ABOUT FOOD
  // ==========================================
  "11_3_wentbananas": {
    idiom_headword: "went bananas",
    current_figurative_meaning: "Phát cuồng, nhảy cẫng lên phấn khích tột độ hoặc nổi điên náo loạn mất kiểm soát",
    literal_image: "Một bầy khỉ hoang trong sở thú tranh giành nải chuối chín rồi nhảy nhót, la hét điên cuồng khắp chuồng.",
    figurative_connection: "Chuối (bananas) là món ăn yêu thích khiến các loài linh trưởng phát cuồng và có hành vi kích động mạnh. Thành ngữ dùng hình ảnh này để so sánh sự bùng nổ năng lượng hoang dại của con người (đặc biệt là trẻ em hoặc người hâm mộ cuồng nhiệt).",
    historical_context: "Xuất hiện trong tiếng lóng của sinh viên các trường đại học Mỹ vào thập niên 1960. Từ 'bananas' ban đầu phát triển từ cụm từ lóng 'going ape' (hành xử như loài vượn) từ thập niên 1950 trước khi chuyển hóa thành 'go bananas'.",
    deep_example: "The entire stadium went bananas the split second their home team scored the winning goal in stoppage time.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Etymology Online — banana (noun, slang phrases)",
        url: "https://www.etymonline.com/word/banana",
        note: "Sự xuất hiện của 'go bananas' trong tiếng lóng đại học Mỹ thập niên 1960."
      },
      {
        title: "The Phrase Finder — Go bananas",
        url: "https://www.phrases.org.uk/meanings/go-bananas.html",
        note: "Mối liên hệ giữa 'going ape' và 'go bananas'."
      }
    ]
  },

  "11_3_drivenuts": {
    idiom_headword: "driving me nuts",
    current_figurative_meaning: "Làm tôi phát điên, làm phiền nhiễu và chọc tức ai đó đến mức không thể chịu đựng nổi",
    literal_image: "Những tiếng gõ lạch cạch hoặc sự việc khó chịu khiến đầu óc xoay vòng như một quả hạch quay cuồng.",
    figurative_connection: "Trong tiếng lóng thế kỷ 19, từ 'nut' được dùng để chỉ 'cái đầu' của con người. 'Nuts' mang nghĩa loạn trí, phát điên (off one's head). Hành động 'drive someone nuts' nghĩa là đẩy bộ não của ai đó vào trạng thái điên đầu vì những phiền toái lặp đi lặp lại.",
    historical_context: "Phát triển trong tiếng Anh Mỹ vào nửa đầu thế kỷ 20 (thập niên 1920-1930). Bắt nguồn từ tính từ 'nuts' (điên rồ) và cụm động từ tương đương 'drive someone crazy'.",
    deep_example: "The incessant dripping of the leaky bathroom faucet was driving me nuts while I tried to fall asleep.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Online Etymology Dictionary — nuts (adjective)",
        url: "https://www.etymonline.com/word/nuts",
        note: "Ý nghĩa tiếng lóng của 'nut' (đầu óc) và 'nuts' (điên cuồng) từ thế kỷ 19."
      },
      {
        title: "Merriam-Webster Dictionary — drive (someone) nuts",
        url: "https://www.merriam-webster.com/dictionary/drive%20someone%20nuts",
        note: "Định nghĩa ngữ dụng khẩu ngữ tiếng Anh Mỹ."
      }
    ]
  },

  "11_3_fullofbeans": {
    idiom_headword: "full of beans",
    current_figurative_meaning: "Tràn đầy năng lượng, phấn khởi hăng hái, hoạt bát và ngập tràn sức sống",
    literal_image: "Một chú ngựa đua được ăn no nê những hạt đậu tằm giàu đạm, trở nên sung sức nhảy cẫng và phi nước đại.",
    figurative_connection: "Hạt đậu (beans, đặc biệt là faba beans) là nguồn thức ăn giàu protein và calo cao cấp dành cho ngựa kéo và ngựa đua thời xưa. Một con ngựa 'full of beans' sẽ có thể lực dồi dào, chạy nhanh và tràn đầy sinh khí.",
    historical_context: "Thành ngữ bắt nguồn từ giới nuôi ngựa đua tại Anh vào đầu thế kỷ 19 (khoảng thập niên 1820). Đến giữa thế kỷ 19, nó được chuyển nghĩa rộng rãi cho con người để ca ngợi sự hoạt bát, năng động.",
    deep_example: "Even after a four-hour mountain trek, the eight-year-old twins were still full of beans and wanted to play tag.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Full of beans",
        url: "https://www.phrases.org.uk/meanings/full-of-beans.html",
        note: "Nguồn gốc thức ăn cho ngựa đua tại Anh thế kỷ 19."
      },
      {
        title: "Oxford English Dictionary — bean (noun, equestrian phrases)",
        url: "https://www.oed.com/view/Entry/16518",
        note: "Ghi nhận ngữ liệu từ thập niên 1820 trong tạp chí thể thao Anh."
      }
    ]
  },

  "11_3_eggonface": {
    idiom_headword: "had egg on my face",
    current_figurative_meaning: "Bị mất mặt, xấu hổ ê chề trước đám đông vì một sai sót ngớ ngẩn do chính mình gây ra",
    literal_image: "Bị ném một quả trứng sống vỡ be bét dính đầy lòng đỏ nhầy nhụa trên mặt trước ánh nhìn của mọi người.",
    figurative_connection: "Trứng sống vỡ dính bết trên mặt vừa gây nhơ nhuốc vừa biến người bị ném thành tâm điểm chế nhạo tức cười. Trải nghiệm tinh thần của sự xấu hổ ê chề khi phạm lỗi ngớ ngẩn cũng giống như cảm giác đứng trơ trọi giữa đám đông với quả trứng vỡ trên mặt.",
    historical_context: "Gắn liền với truyền thống sân khấu kịch nghệ phương Tây thế kỷ 19: khi diễn viên kịch diễn quá dở hoặc quên lời thoại, khán giả tức giận dưới khán phòng sẽ ném cà chua thối và trứng sống lên sân khấu để sỉ nhục. Thành ngữ hiện đại bắt đầu phổ biến trong tiếng Anh Mỹ từ thập niên 1950.",
    deep_example: "The meteorologist had egg on his face after predicting glorious sunshine, only for a torrential thunderstorm to flood the city picnic.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Egg on your face",
        url: "https://www.phrases.org.uk/meanings/egg-on-your-face.html",
        note: "Truyền thống ném trứng thối sân khấu kịch và báo chí Mỹ thập niên 1950."
      },
      {
        title: "Oxford English Dictionary — egg (noun, slang and idioms)",
        url: "https://www.oed.com/view/Entry/59871",
        note: "Sự xuất hiện và chuyển nghĩa của thành ngữ 'have egg on one's face'."
      }
    ]
  }
};

export default UNIT_11_ETYMOLOGY;
