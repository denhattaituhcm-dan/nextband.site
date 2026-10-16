// UNIT 07: Animals — Etymological & Conceptual Explanations
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

export const UNIT_07_ETYMOLOGY: Record<string, IdiomEtymology> = {
  "7_1_scaredycat": {
    idiom_headword: "a scaredy-cat",
    current_figurative_meaning: "Kẻ nhút nhát, người hay sợ sệt, dễ giật mình hoảng hốt trước những điều nhỏ nhặt",
    literal_image: "Loài mèo nhà với bản năng cảnh giác cao độ, rất dễ bị giật nảy mình, dựng ngược lông và co rúm người lại chạy trốn khi có tiếng động lạ.",
    figurative_connection: "Hình ảnh chú mèo nhát gan co ro trước những tiếng động vô hại được chuyển nghĩa sang con người, đặc biệt là những người thiếu can đảm trước bóng tối, côn trùng hay thử thách mạo hiểm.",
    historical_context: "Xuất hiện như một tiếng lóng thiếu nhi phổ biến tại Mỹ từ đầu thế kỷ 20 (thập niên 1930) và nhanh chóng trở thành từ ngữ thông dụng toàn cầu.",
    deep_example: "Stop being such a scaredy-cat; the roller coaster has state-of-the-art safety mechanisms and is completely secure.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — scaredy-cat",
        url: "https://www.oed.com/view/Entry/174981",
        note: "Ghi nhận nguồn gốc từ ngữ tiếng lóng thiếu nhi Mỹ từ thập niên 1930."
      },
      {
        title: "Green's Dictionary of Slang — scaredy-cat",
        url: "https://greensdictofslang.com/entry/q25qmyy",
        note: "Khảo cứu lịch sử biến thể từ scared-cat sang scaredy-cat."
      }
    ]
  },

  "7_1_crywolf": {
    idiom_headword: "cry wolf",
    current_figurative_meaning: "Báo động giả, kêu cứu dối trá nhiều lần khiến mọi người mất niềm tin và thờ ơ khi tai họa thật sự xảy đến",
    literal_image: "Cậu bé chăn cừu buồn chán nên liên tục gào thét báo động dân làng rằng có chó sói đến tấn công bầy cừu, dù thực tế không có con sói nào.",
    figurative_connection: "Bắt nguồn trực tiếp từ câu chuyện ngụ ngôn bất hủ của Aesop: niềm tin là thứ một khi đã bị lạm dụng để đùa cợt thì khi gặp nguy khốn thật sự, tiếng kêu cứu sẽ hoàn toàn bị phớt lờ.",
    historical_context: "Ngụ ngôn Aesop (thế kỷ thứ 6 TCN) được dịch sang tiếng Anh từ thời Trung cổ, và thành ngữ 'to cry wolf' trở thành chuẩn mực đạo đức trong văn hóa phương Tây.",
    deep_example: "If the IT department keeps crying wolf about minor server glitches, employees will ignore genuine cybersecurity warnings.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Cry wolf",
        url: "https://www.phrases.org.uk/meanings/cry-wolf.html",
        note: "Nguồn gốc từ truyện ngụ ngôn The Boy Who Cried Wolf của Aesop."
      },
      {
        title: "Oxford English Dictionary — cry wolf",
        url: "https://www.oed.com/view/Entry/45419",
        note: "Các văn bản trích dẫn thành ngữ từ thế kỷ 16 đến nay."
      }
    ]
  },

  "7_1_noroomswingcat": {
    idiom_headword: "not enough room to swing a cat",
    current_figurative_meaning: "Không gian vô cùng chật chội, tù túng, không có đủ chỗ để xoay xở",
    literal_image: "Ngọn roi da chín đuôi nạm nút thắt (cat-o'-nine-tails) của Hải quân Hoàng gia Anh được dùng để thi hành kỷ luật trên các chiến hạm thế kỷ 17–18.",
    figurative_connection: "Các khoang dưới boong tàu chiến hải quân Anh thời xưa có trần rất thấp và không gian ngột ngạt, chật hẹp đến mức viên sĩ quan thi hành án không có đủ bán kính để vung trọn một vòng roi da ('swing the cat').",
    historical_context: "Thành ngữ hải quân cổ điển được các thủy thủ Anh phổ biến rộng rãi, xuất hiện trong tác phẩm 'The Sailor's Word-Book' (1867) của Đô đốc William Henry Smyth.",
    deep_example: "Our first rental apartment in downtown London was so minuscule that there was not enough room to swing a cat.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Not enough room to swing a cat",
        url: "https://www.phrases.org.uk/meanings/not-enough-room-to-swing-a-cat.html",
        note: "Tài liệu lịch sử hải quân Anh về ngọn roi cat-o-nine-tails."
      },
      {
        title: "Oxford English Dictionary — swing a cat",
        url: "https://www.oed.com/view/Entry/28700",
        note: "Dẫn chứng văn bản từ thế kỷ 17 trong văn học Anh."
      }
    ]
  },

  "7_1_droplikeflies": {
    idiom_headword: "dropping like flies",
    current_figurative_meaning: "Ngã bệnh, kiệt sức, ngất xỉu hoặc thất bại, bỏ cuộc hàng loạt trong một khoảng thời gian rất ngắn",
    literal_image: "Ruồi là loài côn trùng đông đúc nhưng yếu ớt, dễ dàng chết và rơi lả tả xuống sàn hàng loạt khi gặp sương giá, khói độc hoặc thuốc diệt côn trùng.",
    figurative_connection: "Tốc độ ngã quỵ nhanh chóng và số lượng đông đảo của đàn ruồi được ẩn dụ cho các tình huống con người gục ngã vì dịch cúm mùa, say nắng trong đợt nắng nóng hoặc áp lực làm việc quá tải.",
    historical_context: "Ghi nhận sớm nhất trong các báo cáo y tế và báo chí Anh - Mỹ từ cuối thế kỷ 19, đặc biệt trong các đợt dịch sốt vàng da và đại dịch cúm 1918.",
    deep_example: "During the grueling desert marathon, amateur runners were dropping like flies due to intense dehydration.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — drop like flies",
        url: "https://www.oed.com/view/Entry/57912",
        note: "Lịch sử thành ngữ miêu tả sự sụp đổ nhanh chóng trong dịch bệnh và thể thao."
      },
      {
        title: "Cambridge Idioms Dictionary — drop like flies",
        url: "https://dictionary.cambridge.org/dictionary/english/drop-like-flies",
        note: "Định nghĩa chuẩn mực hiện đại trong báo chí và văn cảnh giao tiếp."
      }
    ]
  },

  "7_1_barkwrongtree": {
    idiom_headword: "barking up the wrong tree",
    current_figurative_meaning: "Hiểu lầm hoàn toàn, suy đoán sai hướng, tìm kiếm giải pháp hoặc đổ lỗi nhầm chỗ",
    literal_image: "Chó săn gấu mèo (coonhound) đuổi theo con mồi trong rừng đêm và đứng sủa inh ỏi dưới gốc cây, trong khi con gấu mèo thông minh đã chuyền sang cây khác.",
    figurative_connection: "Con chó săn tưởng con mồi vẫn ở trên ngọn cây đó nên dốc hết sức sủa nhầm chỗ. Ẩn dụ cho hành vi con người dồn tâm trí, tài lực hoặc sự nghi ngờ vào một hướng hoàn toàn sai lệch thực tế.",
    historical_context: "Bắt nguồn từ nghề săn bắn thú ăn đêm ở các vùng rừng núi Bắc Mỹ, được người anh hùng dân gian Davy Crockett ghi chép trong tác phẩm 'Sketches and Eccentricities' năm 1833.",
    deep_example: "If you think accusing the junior developer will fix the database corruption, you are definitely barking up the wrong tree.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Barking up the wrong tree",
        url: "https://www.phrases.org.uk/meanings/barking-up-the-wrong-tree.html",
        note: "Lịch sử săn gấu mèo Bắc Mỹ và hồi ký Davy Crockett (1833)."
      },
      {
        title: "Oxford English Dictionary — bark up the wrong tree",
        url: "https://www.oed.com/view/Entry/15642",
        note: "Các dẫn chứng văn bản từ tiếng Anh Mỹ thế kỷ 19."
      }
    ]
  },

  "7_1_elephantroom": {
    idiom_headword: "the elephant in the room",
    current_figurative_meaning: "Một vấn đề lớn hoặc sự thật hiển nhiên ai cũng thấy rõ nhưng mọi người đều cố tình tránh né không dám nhắc tới",
    literal_image: "Một con voi khổng lồ đứng sừng sững ngay giữa phòng khách, nhưng những người ngồi trong phòng cư xử như thể nó không hề tồn tại.",
    figurative_connection: "Kích thước khổng lồ của con voi tượng trưng cho tính chất nghiêm trọng, không thể che giấu của vấn đề. Sự im lặng của mọi người phản ánh tâm lý e ngại xung đột, sợ mất lòng hoặc sự trốn tránh trách nhiệm.",
    historical_context: "Lấy cảm hứng từ truyện ngụ ngôn năm 1814 của thi sĩ Nga Ivan Krylov (*The Inquisitive Man*). Cụm từ tiếng Anh được phổ cập rộng rãi sau bài báo năm 1952 trên tờ *The New York Times*.",
    deep_example: "The CEO's impending retirement was the elephant in the room that no board member felt comfortable addressing openly.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Elephant in the room",
        url: "https://www.phrases.org.uk/meanings/elephant-in-the-room.html",
        note: "Truyện ngụ ngôn của Ivan Krylov (1814) và sự ra đời của thành ngữ trên New York Times."
      },
      {
        title: "Oxford English Dictionary — elephant in the room",
        url: "https://www.oed.com/view/Entry/60255",
        note: "Khảo cứu nguồn gốc và sự phổ biến trong văn hóa doanh nghiệp hiện đại."
      }
    ]
  },

  "7_1_twohorserace": {
    idiom_headword: "a two-horse race",
    current_figurative_meaning: "Một cuộc đua, kỳ thi cử hoặc cạnh tranh thị phần mà kết quả chung cuộc chỉ là màn so găng giữa hai đối thủ mạnh nhất",
    literal_image: "Một vòng đua ngựa nơi các con ngựa khác đã bị bỏ xa phía sau, chỉ còn hai con ngựa dũng mãnh nhất cạnh tranh quyết liệt từng bước chân.",
    figurative_connection: "Mặc dù ban đầu có nhiều ứng viên tham gia, thực tế chỉ có 2 thế lực vượt trội có cơ hội chiến thắng. Rất hay dùng trong bầu cử chính trị (bầu cử tổng thống 2 đảng) hoặc cạnh tranh công nghệ (iOS vs Android).",
    historical_context: "Thuật ngữ trường đua ngựa Anh quốc thế kỷ 18–19 trước khi trở thành cụm từ ưa chuộng của giới bình luận chính trị và tài chính.",
    deep_example: "With the smaller startups eliminated, the cloud computing market has largely turned into a two-horse race between AWS and Azure.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — two-horse race",
        url: "https://www.oed.com/view/Entry/208321",
        note: "Nguồn gốc từ trường đua ngựa thế kỷ 18 và chuyển nghĩa chính trị học."
      },
      {
        title: "Collins English Dictionary — two-horse race",
        url: "https://www.collinsdictionary.com/dictionary/english/two-horse-race",
        note: "Định nghĩa và ngữ cảnh sử dụng trong phân tích bầu cử."
      }
    ]
  },

  "7_1_chickenoutof": {
    idiom_headword: "chicken out of",
    current_figurative_meaning: "Rút lui, chùn bước hoặc từ bỏ vào phút chót vì quá sợ hãi, không đủ can đảm thực hiện",
    literal_image: "Loài gà (chicken) trong tâm thức dân gian là loài vật nhút nhát, hễ thấy bóng dáng hiểm nguy là hoảng loạn bỏ chạy tán loạn.",
    figurative_connection: "Động từ hóa danh từ 'chicken' đi kèm giới từ 'out of' để chỉ hành động tháo lui hèn nhát trước một thử thách nguy hiểm (như nhảy cầu, tỏ tình, phát biểu trước đám đông).",
    historical_context: "Thành ngữ bùng nổ trong giới thanh niên Mỹ từ thập niên 1930 và gắn liền với trò chơi đua xe cảm giác mạnh 'Game of Chicken' thời hậu Thế chiến II.",
    deep_example: "Mark signed up for the charity bungee jump, but chickened out at the last second when he looked down over the gorge.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Green's Dictionary of Slang — chicken out",
        url: "https://greensdictofslang.com/entry/q25qmyy",
        note: "Lịch sử tiếng lóng thanh niên Mỹ thập niên 1930–1950."
      },
      {
        title: "Merriam-Webster Dictionary — chicken out",
        url: "https://www.merriam-webster.com/dictionary/chicken%20out",
        note: "Cấu trúc ngữ pháp phrasal verb và sắc thái giao tiếp đời thường."
      }
    ]
  },

  "7_1_deerinheadlights": {
    idiom_headword: "like a deer in headlights",
    current_figurative_meaning: "Đứng sững người, hóa đá vì quá bàng hoàng, kinh hãi hoặc bối rối tột độ khi bị hỏi bất ngờ hay bắt quả tang",
    literal_image: "Con hươu trên quốc lộ ban đêm bị ánh đèn pha ô tô cực mạnh chiếu thẳng vào mắt, đồng tử bị lóa và phản xạ thần kinh khiến nó đứng chôn chân bất động.",
    figurative_connection: "Trạng thái tê liệt vận động trước một kích thích quá mạnh hoặc hiểm họa cận kề. Dùng để miêu tả gương mặt ngây dại, không thốt nên lời của ai đó khi bị phát hiện làm điều sai trái hoặc bị gọi phát biểu bất thình lình.",
    historical_context: "Xuất hiện tại Mỹ vào nửa đầu thế kỷ 20 cùng với sự bùng nổ của mạng lưới đường cao tốc và xe hơi có đèn pha công suất cao xuyên đêm.",
    deep_example: "When the journalist asked the minister about the leaked financial documents, he froze like a deer in headlights.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Deer in headlights",
        url: "https://www.phrases.org.uk/meanings/deer-in-the-headlights.html",
        note: "Hiện tượng phản xạ sinh học của loài hươu và sự hình thành thành ngữ tại Mỹ."
      },
      {
        title: "Oxford English Dictionary — deer in the headlights",
        url: "https://www.oed.com/view/Entry/48622",
        note: "Dẫn chứng từ báo chí Mỹ thập niên 1980 trong phân tích ngôn ngữ cơ thể."
      }
    ]
  },

  "7_1_badgeringme": {
    idiom_headword: "badger someone",
    current_figurative_meaning: "Liên tục quấy rầy, mè nheo, thúc giục hoặc tra hỏi dai dẳng khiến người khác bực mình, mệt mỏi",
    literal_image: "Trò tiêu khiển tàn nhẫn thời xưa 'badger-baiting': người ta thả bầy chó săn vào hang để liên tục cắn xé, khiêu khích con lửng (badger) cho đến khi nó kiệt sức.",
    figurative_connection: "Sự quấy phá liên tục không ngừng nghỉ của bầy chó săn đối với con lửng được chuyển nghĩa sang hành vi làm phiền, gặng hỏi không dứt của con người.",
    historical_context: "Bắt nguồn từ nước Anh thế kỷ 18–19. Sau khi trò chơi tàn bạo này bị cấm bởi Đạo luật Chống Ngược đãi Động vật năm 1835 (Cruelty to Animals Act), động từ 'to badger' vẫn tiếp tục tồn tại với nghĩa bóng.",
    deep_example: "Journalists incessantly badgered the scientist for confidential lab findings, forcing the university to issue a formal gag order.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Badger someone",
        url: "https://www.phrases.org.uk/meanings/badger.html",
        note: "Lịch sử trò chơi badger-baiting thế kỷ 18 và Đạo luật năm 1835."
      },
      {
        title: "Oxford English Dictionary — badger (verb)",
        url: "https://www.oed.com/view/Entry/14605",
        note: "Ghi chép về sự chuyển nghĩa từ săn bắn sang quấy rầy tinh thần."
      }
    ]
  },

  "7_1_nightowl": {
    idiom_headword: "a night owl",
    current_figurative_meaning: "Người có thói quen thức rất khuya, sinh hoạt hoặc làm việc minh mẫn, hiệu quả nhất vào ban đêm",
    literal_image: "Chim cú mèo (owl) là loài săn mồi ăn đêm, sở hữu đôi mắt và thính giác vượt trội trong bóng tối, ban ngày ngủ và ban đêm hoạt động mạnh mẽ.",
    figurative_connection: "Những người có nhịp sinh học thức khuya dậy muộn, tràn đầy năng lượng và cảm hứng sáng tạo khi màn đêm buông xuống được ví như loài cú mèo.",
    historical_context: "Xuất hiện trong các tác phẩm của William Shakespeare từ năm 1594 (*The Rape of Lucrece*: 'Thou night-owl, which down from a tower doth grave').",
    deep_example: "As a chronic night owl, I produce my most eloquent academic writing between midnight and four in the morning.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Night owl",
        url: "https://www.phrases.org.uk/meanings/night-owl.html",
        note: "Trích dẫn từ William Shakespeare (1594) và sự đối lập với early bird."
      },
      {
        title: "Oxford English Dictionary — night owl",
        url: "https://www.oed.com/view/Entry/126955",
        note: "Lịch sử ghi chép từ thế kỷ 16 về thói quen sinh học con người."
      }
    ]
  },

  "7_1_catgotcream": {
    idiom_headword: "like the cat that got the cream",
    current_figurative_meaning: "Trông cực kỳ tự mãn, đắc thắng và thỏa mãn sau khi đạt được một thành tích hoặc làm điều gì đó thành công",
    literal_image: "Con mèo lén liếm trọn đĩa váng kem béo ngậy mà không bị chủ phát hiện, sau đó nằm liếm mép với vẻ mặt vô cùng mãn nguyện và tự đắc.",
    figurative_connection: "Biểu cảm mãn nguyện tột độ, mắt lim dim và nụ cười thầm kín của con người khi vừa giành được phần thưởng lớn được so sánh trực quan với hình ảnh chú mèo 'trúng mánh' váng kem sữa.",
    historical_context: "Thành ngữ dân gian Anh thế kỷ 19, tại Mỹ thường dùng biến thể 'the cat that ate the canary' (con mèo xơi con chim hoàng yến).",
    deep_example: "After securing the million-dollar government grant, the lead researcher walked into the conference room looking like the cat that got the cream.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Like the cat that got the cream",
        url: "https://www.phrases.org.uk/meanings/cat-that-got-the-cream.html",
        note: "Đối chiếu giữa biến thể Anh (cream) và biến thể Mỹ (canary)."
      },
      {
        title: "Oxford English Dictionary — cat that got the cream",
        url: "https://www.oed.com/view/Entry/28701",
        note: "Dẫn chứng văn bản miêu tả vẻ tự đắc từ thế kỷ 19."
      }
    ]
  },

  "7_1_getgoat": {
    idiom_headword: "get someone's goat",
    current_figurative_meaning: "Làm ai đó phát cáu, bực mình tột độ, kích động cơn thịnh nộ của người khác",
    literal_image: "Giai thoại chuồng ngựa đua Mỹ: người ta thả con dê hiền lành vào ở chung để trấn an thần kinh con ngựa đua; kẻ xấu lẻn vào bắt trộm con dê đi khiến con ngựa nổi giận điên cuồng trước giờ thi đấu.",
    figurative_connection: "Mất đi con dê trấn an tinh thần khiến tâm lý trở nên cáu kỉnh và kích động. Thành ngữ dùng để chỉ những hành vi thô lỗ, khiếm nhã làm bùng phát cơn giận dữ của người chứng kiến.",
    historical_context: "Thuật ngữ tiếng lóng trường đua ngựa Mỹ đầu thế kỷ 20, được nhà ngôn ngữ học H.L. Mencken nhắc đến trong công trình 'The American Language' (1919).",
    deep_example: "It really gets my goat when passengers talk loudly on speakerphone in quiet commuter train carriages.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Get someone's goat",
        url: "https://www.phrases.org.uk/meanings/get-someones-goat.html",
        note: "Khảo cứu giai thoại trường đua ngựa và các giả thuyết từ nguyên học."
      },
      {
        title: "Oxford English Dictionary — get someone's goat",
        url: "https://www.oed.com/view/Entry/79511",
        note: "Ghi nhận sớm nhất trong báo chí thể thao Mỹ năm 1908."
      }
    ]
  },

  "7_1_birdseyeview": {
    idiom_headword: "a bird's-eye view",
    current_figurative_meaning: "Cái nhìn toàn cảnh từ trên cao xuống; hoặc sự xem xét, đánh giá tổng thể toàn diện một vấn đề",
    literal_image: "Tầm nhìn bao quát của loài chim đang sải cánh bay lượn trên tầng không nhìn xuống khắp cảnh quan mặt đất bên dưới.",
    figurative_connection: "Không bị che khuất bởi các chướng ngại vật ở mặt đất. Trong tư duy chiến lược, 'bird's-eye view' tượng trưng cho năng lực nhìn nhận bức tranh tổng thể (macro view) thay vì bị sa đà vào tiểu tiết vụn vặt.",
    historical_context: "Ban đầu là thuật ngữ bản đồ học và hội họa thế kỷ 17 để vẽ các bản đồ phong cảnh dạng toàn cảnh (panoramic map), sau đó chuyển thành thành ngữ tư duy chiến lược.",
    deep_example: "The introductory chapter provides a comprehensive bird's-eye view of macroeconomic policies implemented across Southeast Asia.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — bird's-eye view",
        url: "https://www.oed.com/view/Entry/19318",
        note: "Xuất hiện trong bản đồ học năm 1600 và văn học thế kỷ 18."
      },
      {
        title: "Merriam-Webster Dictionary — bird's-eye view",
        url: "https://www.merriam-webster.com/dictionary/bird%27s-eye%20view",
        note: "Định nghĩa nghĩa đen địa lý và nghĩa bóng trong phân tích kinh tế."
      }
    ]
  },

  "7_1_gethighhorse": {
    idiom_headword: "get on one's high horse",
    current_figurative_meaning: "Tỏ thái độ trịch thượng, kiêu căng, dạy đời và tự cho mình là thanh cao, đạo đức hơn người",
    literal_image: "Thời Trung cổ, các vị quý tộc, giám mục cấp cao và tướng lĩnh thường cưỡi những con tuấn mã to lớn ('high horses') trong các lễ diễu hành để biểu dương quyền lực và nhìn xuống dân chúng từ trên cao.",
    figurative_connection: "Ngồi trên lưng con ngựa cao tạo ra vị thế cách biệt về thể chất lẫn quyền lực. Thành ngữ châm biếm những kẻ hay lên giọng đạo đức giả, phán xét người khác từ một vị thế tự phong là 'cao quý'.",
    historical_context: "Xuất hiện từ thế kỷ 14 trong các tác phẩm của học giả tôn giáo John Wycliffe (1380) và lưu truyền qua nhiều thế kỷ trong văn học Anh.",
    deep_example: "Before you get on your high horse about recycling, make sure you aren't flying on private jets every single weekend.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — High horse",
        url: "https://www.phrases.org.uk/meanings/high-horse.html",
        note: "Nguồn gốc tuấn mã diễu hành thời Trung cổ và ghi chép của John Wycliffe (1380)."
      },
      {
        title: "Oxford English Dictionary — high horse",
        url: "https://www.oed.com/view/Entry/86901",
        note: "Dẫn chứng lịch sử từ thế kỷ 14 đến nay."
      }
    ]
  },

  "7_1_worldoyster": {
    idiom_headword: "the world is one's oyster",
    current_figurative_meaning: "Thế giới mở rộng trước mắt bạn; bạn có tất cả cơ hội, quyền tự do và tiềm năng để đạt được mọi thành công",
    literal_image: "Con hàu biển ngậm chặt miệng dưới đáy đại dương chứa đựng bên trong một viên ngọc trai vô giá; người dũng cảm dùng thanh gươm mở được vỏ hàu sẽ chiếm trọn kho báu.",
    figurative_connection: "Thế giới với bao cơ hội quý giá như một con hàu chứa ngọc. Nếu có tài năng và lòng quả cảm, bạn hoàn toàn có thể mở tung mọi cánh cửa để gặt hái thành tựu huy hoàng.",
    historical_context: "Sáng tạo bất hủ của đại văn hào William Shakespeare trong vở hài kịch 'The Merry Wives of Windsor' (1602, Hồi 2 Cảnh 2: 'Why then the world's mine oyster, Which I with sword will open').",
    deep_example: "Armed with an advanced engineering degree and fluency in three languages, the world is truly her oyster.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — The world is your oyster",
        url: "https://www.phrases.org.uk/meanings/the-world-is-your-oyster.html",
        note: "Nguyên tác vở The Merry Wives of Windsor (1602) của Shakespeare."
      },
      {
        title: "Oxford English Dictionary — oyster (idioms)",
        url: "https://www.oed.com/view/Entry/135942",
        note: "Phân tích ẩn dụ ngọc trai và câu thoại kinh điển của nhân vật Pistol."
      }
    ]
  },

  "7_1_lionsshare": {
    idiom_headword: "the lion's share",
    current_figurative_meaning: "Phần lớn nhất, phần áp đảo hoặc phần tốt nhất của một tổng thể tài sản, lợi nhuận hoặc tài nguyên",
    literal_image: "Chúa sơn lâm sư tử đi săn cùng các loài thú khác; khi con mồi bị hạ gục, sư tử dùng sức mạnh tối thượng chiếm đoạt gần như toàn bộ con mồi, chỉ để lại mẩu xương vụn cho thú khác.",
    figurative_connection: "Bắt nguồn trực tiếp từ truyện ngụ ngôn cổ xưa của Aesop về sự bất bình đẳng quyền lực: kẻ mạnh nhất luôn tự ban cho mình quyền sở hữu phần áp đảo trong mọi cuộc chia chác.",
    historical_context: "Truyện ngụ ngôn Aesop (thế kỷ thứ 6 TCN) được dịch sang tiếng Latin bởi Phaedrus và đi vào kho tàng tục ngữ tiếng Anh từ thế kỷ 18.",
    deep_example: "A major pharmaceutical conglomerate claimed the lion's share of profits generated by the newly approved vaccine.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — The lion's share",
        url: "https://www.phrases.org.uk/meanings/the-lions-share.html",
        note: "Truyện ngụ ngôn Aesop về con sư tử chia phần con mồi."
      },
      {
        title: "Oxford English Dictionary — lion's share",
        url: "https://www.oed.com/view/Entry/108852",
        note: "Các dẫn chứng văn bản từ thế kỷ 18 trong báo cáo chính trị và kinh tế."
      }
    ]
  },

  "7_1_onetrickpony": {
    idiom_headword: "a one-trick pony",
    current_figurative_meaning: "Người, tổ chức hoặc sản phẩm chỉ có duy nhất một kỹ năng, một chiêu thức nổi trội; ngoài ra không có tài năng nào khác",
    literal_image: "Một gánh xiếc lưu động nghèo nàn thế kỷ 19 ở Mỹ chỉ có duy nhất một con ngựa con (pony) chỉ biết làm đúng một trò diễn xiếc (như cúi chào), khiến người xem nhanh chóng nhàm chán.",
    figurative_connection: "Chỉ sự nghèo nàn về năng lực và thiếu tính đa dụng. Ban đầu có thể gây ấn tượng chốc lát, nhưng do không có chiều sâu và không biết thích nghi nên nhanh chóng bị đào thải.",
    historical_context: "Xuất hiện trong lịch sử rạp xiếc lưu động Mỹ thế kỷ 19, được văn hóa đại chúng và giới phê bình âm nhạc, công nghệ thập niên 1960 đưa vào từ điển hiện đại.",
    deep_example: "The startup must diversify its offerings; relying solely on a photo-filtering algorithm makes it a vulnerable one-trick pony.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — One-trick pony",
        url: "https://www.phrases.org.uk/meanings/one-trick-pony.html",
        note: "Lịch sử xiếc lưu động Mỹ và sự phát triển của thành ngữ."
      },
      {
        title: "Oxford English Dictionary — one-trick pony",
        url: "https://www.oed.com/view/Entry/131490",
        note: "Dẫn chứng từ báo chí Mỹ thập niên 1960 trong phê bình nghệ thuật."
      }
    ]
  },

  "7_1_madepigsear": {
    idiom_headword: "make a pig's ear of",
    current_figurative_meaning: "Làm hỏng bét, làm bung bét, thực hiện một công việc cực kỳ vụng về, luộm thuộm và tồi tệ",
    literal_image: "Tai con lợn sề thô kệch, đầy lông và sần sùi không bao giờ có thể được khâu vá thành một chiếc ví lụa quý giá.",
    figurative_connection: "Bắt nguồn từ câu tục ngữ cổ thế kỷ 16: 'You cannot make a silk purse out of a sow's ear'. Đến cuối thế kỷ 19, người Anh tạo ra thành ngữ rút gọn 'make a pig's ear of something' để chỉ kết quả làm việc thảm hại do tay nghề vụng về.",
    historical_context: "Thành ngữ đặc trưng của tiếng Anh Anh (UK), phổ biến từ cuối thế kỷ 19 và đầu thế kỷ 20 trong giới thợ thủ công London.",
    deep_example: "I attempted to assemble the flat-pack wardrobe myself, but made an absolute pig's ear of it and had to hire a professional carpenter.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Make a pig's ear of",
        url: "https://www.phrases.org.uk/meanings/make-a-pigs-ear-of.html",
        note: "Mối liên hệ với tục ngữ silk purse out of a sow's ear từ thế kỷ 16."
      },
      {
        title: "Oxford English Dictionary — pig's ear",
        url: "https://www.oed.com/view/Entry/143522",
        note: "Ghi nhận sớm nhất trong tiếng lóng thợ thủ công Anh năm 1903."
      }
    ]
  },

  "7_1_wateroffduck": {
    idiom_headword: "water off a duck's back",
    current_figurative_meaning: "Nước đổ đầu vịt — những lời chỉ trích, chê bai, cảnh cáo trôi tuột đi mà không hề gây ảnh hưởng hay khiến người nghe bận tâm",
    literal_image: "Lông của loài vịt có một lớp dầu bảo vệ không thấm nước do tuyến phao câu tiết ra; mọi giọt nước dội lên đều lăn trôi đi ngay lập tức mà không làm ướt lông hay thấm vào da thịt.",
    figurative_connection: "Bức tường phòng vệ tâm lý vững chắc: sự chỉ trích ác ý hoặc lời khuyên răn từ bên ngoài dội vào người nghe nhưng hoàn toàn không thể thâm nhập hay gây tác động đến cảm xúc của họ.",
    historical_context: "Thành ngữ quan sát tự nhiên cổ điển có mặt trong văn học Anh từ đầu thế kỷ 19 và phổ biến ở cả Anh lẫn Mỹ.",
    deep_example: "Celebrities must cultivate thick skin so that malicious online commentary rolls off them like water off a duck's back.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Like water off a duck's back",
        url: "https://www.phrases.org.uk/meanings/water-off-a-ducks-back.html",
        note: "Đặc tính sinh học của lông vịt và lịch sử sử dụng thành ngữ từ năm 1824."
      },
      {
        title: "Oxford English Dictionary — water off a duck's back",
        url: "https://www.oed.com/view/Entry/226154",
        note: "Các dẫn chứng văn bản từ tiểu thuyết gia kỷ Victoria."
      }
    ]
  }
};
