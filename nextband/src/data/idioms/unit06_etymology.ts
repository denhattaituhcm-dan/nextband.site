// UNIT 06: Bad things — Etymological & Conceptual Explanations
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

export const UNIT_06_ETYMOLOGY: Record<string, IdiomEtymology> = {
  "6_1_badtastemouth": {
    idiom_headword: "leave a bad taste in one's mouth",
    current_figurative_meaning: "Để lại dư vị đắng cay, ấn tượng tiêu cực hoặc cảm giác bất an, khó chịu dai dẳng sau một sự việc",
    literal_image: "Khi ăn hoặc uống phải thức ăn ôi thiu, thuốc đắng hoặc chất độc hại, cảm giác khó chịu và vị đắng chát vẫn bám rễ nơi cuống họng rất lâu sau khi đã nuốt.",
    figurative_connection: "Bộ não con người liên kết trực giác giữa vị giác đắng/ghê tởm với phản xạ phòng vệ sinh học. Trong đời sống xã hội, một hành vi dối trá, bất công hoặc trải nghiệm tồi tệ để lại 'dư vị tinh thần' khiến người ta cảm thấy ghê sợ và mất niềm tin dài lâu.",
    historical_context: "Thành ngữ xuất hiện từ thế kỷ 19 trong văn học Anh Mỹ, thường được dùng để chỉ các thỏa thuận làm ăn mờ ám hoặc xung đột đạo đức cá nhân.",
    deep_example: "Even though they settled the lawsuit out of court, the aggressive tactics used by their lawyers left a bad taste in my mouth.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — bad taste",
        url: "https://www.oed.com/view/Entry/198083",
        note: "Ghi chép về cách dùng ẩn dụ của vị giác trong văn học Anh kỷ Victoria."
      },
      {
        title: "Cambridge Idioms Dictionary — leave a bad taste in one's mouth",
        url: "https://dictionary.cambridge.org/dictionary/english/leave-a-bad-taste-in-mouth",
        note: "Định nghĩa và ngữ cảnh sử dụng chuẩn mực hiện đại."
      }
    ]
  },

  "6_1_liveuptoexpect": {
    idiom_headword: "live up to expectations",
    current_figurative_meaning: "Đạt đến tầm vóc, tiêu chuẩn hoặc sự kỳ vọng cao mà mọi người đã đặt ra từ trước (thường dùng ở dạng phủ định khi gây thất vọng)",
    literal_image: "Động từ 'live up to' mang nghĩa đen là vươn tới một tầm cao ngang bằng với chuẩn mực đạo đức hoặc lời hứa.",
    figurative_connection: "Khi một đối tượng, tác phẩm nghệ thuật hay chuyến đi được quảng bá rầm rộ, kỳ vọng của công chúng được đẩy lên một 'tầm cao' (high expectations). Nếu thực tế đạt ngang tầm ấy thì là 'live up to', còn nếu không chạm tới tầm cao đó thì là 'didn't live up to expectations'.",
    historical_context: "Thành ngữ hình thành trong tiếng Anh cận đại từ thế kỷ 17 trong bối cảnh các triết gia bàn về việc sống xứng đáng với lý tưởng tôn giáo ('live up to one's faith'). Đến thế kỷ 19, nó chuyển sang lĩnh vực phê bình nghệ thuật và tiêu dùng.",
    deep_example: "The sequel to the blockbuster movie unfortunately did not live up to expectations; the plot was disjointed and uninspired.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — live up to",
        url: "https://www.oed.com/view/Entry/109355",
        note: "Lịch sử biến đổi nghĩa của cụm động từ live up to từ thế kỷ 17."
      },
      {
        title: "Merriam-Webster Dictionary — live up to expectations",
        url: "https://www.merriam-webster.com/dictionary/live%20up%20to",
        note: "Khảo cứu ngữ pháp và sắc thái biểu đạt văn cảnh trang trọng."
      }
    ]
  },

  "6_1_secondrate": {
    idiom_headword: "second-rate",
    current_figurative_meaning: "Có phẩm chất tầm thường, xoàng xĩnh, thứ phẩm, không đạt chuẩn cao cấp",
    literal_image: "Bắt nguồn từ Hệ thống phân hạng chiến hạm (Rating System) của Hải quân Hoàng gia Anh (Royal Navy) từ thập niên 1650.",
    figurative_connection: "Hải quân Anh phân loại tàu chiến thành 6 hạng: 'First-rate' là tàu chiến tuyến hùng mạnh nhất (trên 100 khẩu đại pháo, 3 tầng đại bác). Tàu 'Second-rate' mang từ 90 đến 98 pháo, tuy vẫn là tàu lớn nhưng hỏa lực và uy lực kém hơn hẳn. Qua thời gian, ngôn ngữ đại chúng hạ thấp sắc thái của 'second-rate' thành đồ thứ phẩm, kém cỏi.",
    historical_context: "Sau các cuộc hải chiến Anh - Hà Lan và chiến tranh Napoleon, từ ngữ hải quân lan truyền vào đời sống thường nhật của người Anh để đánh giá chất lượng hàng hóa và con người.",
    deep_example: "I refuse to stay in second-rate accommodations where basic amenities like hot water and Wi-Fi are unreliable.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Second rate",
        url: "https://www.phrases.org.uk/meanings/second-rate.html",
        note: "Tài liệu lịch sử hải quân Anh và bảng phân hạng tàu chiến thế kỷ 17."
      },
      {
        title: "Oxford English Dictionary — second-rate",
        url: "https://www.oed.com/view/Entry/174431",
        note: "Các dẫn chứng văn bản từ năm 1670 đến nay."
      }
    ]
  },

  "6_1_notcupoftea": {
    idiom_headword: "not one's cup of tea",
    current_figurative_meaning: "Không phải sở thích, không hợp gu hoặc không đem lại hứng thú cho ai đó (lối từ chối lịch thiệp)",
    literal_image: "Tách trà — thức uống quốc hồn quốc túy gắn liền với nếp sống quý tộc và bình dân Anh quốc, nơi mỗi người có khẩu vị pha trà rất riêng biệt.",
    figurative_connection: "Người Anh cực kỳ khắt khe về cách pha trà (độ đậm của lá trà, lượng sữa, đường và thời gian hãm). Một tách trà không vừa khẩu vị sẽ không thể thưởng thức. Ban đầu vào cuối thế kỷ 19, 'my cup of tea' là thứ vừa ý mình; sang Thế chiến II, dạng phủ định 'not my cup of tea' trở thành chuẩn mực lịch thiệp để nói 'tôi không thích' mà không làm phật lòng người khác.",
    historical_context: "Ghi nhận sớm nhất trong văn học thế kỷ 20, đặc biệt phổ biến trong quân đội Anh và Mỹ thời Thế chiến II trước khi trở thành thành ngữ phổ quát toàn cầu.",
    deep_example: "Sci-fi blockbusters are simply not my cup of tea; I much prefer character-driven historical dramas.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Not my cup of tea",
        url: "https://www.phrases.org.uk/meanings/my-cup-of-tea.html",
        note: "Nguồn gốc văn hóa uống trà tại Anh và sự phát triển của dạng thức phủ định."
      },
      {
        title: "Oxford English Dictionary — cup of tea",
        url: "https://www.oed.com/view/Entry/45970",
        note: "Ghi chép về cách dùng tiếng lóng từ những năm 1930."
      }
    ]
  },

  "6_1_notuptoscratch": {
    idiom_headword: "not up to scratch",
    current_figurative_meaning: "Không đạt yêu cầu, không đáp ứng được tiêu chuẩn kỹ thuật hoặc kỳ vọng năng lực tối thiểu",
    literal_image: "Vạch kẻ phấn ('scratch') trên sàn đấu quyền Anh tay trần (Bare-knuckle Boxing) thời kỳ thế kỷ 18 theo luật Jack Broughton.",
    figurative_connection: "Theo luật Broughton năm 1743, một vạch được cào (scratched) ở giữa sàn đấu. Khi võ sĩ bị hạ đo ván và kết thúc 30 giây hồi phục, anh ta phải tự đứng dậy và tự bước chân tới vạch kẻ đó trong 8 giây mà không cần người đỡ. Nếu không làm nổi, anh ta bị xem là 'not up to scratch' (không đủ tư cách tiếp tục thi đấu, bị xử thua).",
    historical_context: "Nền quyền Anh cổ điển thế kỷ 18–19 tại London đã đóng góp rất nhiều thành ngữ nổi tiếng vào tiếng Anh, trong đó 'come up to scratch' và 'not up to scratch' nhanh chóng được dùng trong tuyển dụng và kiểm định chất lượng.",
    deep_example: "The initial draft of the business proposal is not up to scratch; it lacks accurate market analysis and financial forecasting.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Up to scratch",
        url: "https://www.phrases.org.uk/meanings/up-to-scratch.html",
        note: "Luật quyền Anh London Prize Ring Rules (1743) và nguồn gốc vạch scratch."
      },
      {
        title: "Oxford English Dictionary — scratch",
        url: "https://www.oed.com/view/Entry/173322",
        note: "Dẫn chứng văn bản thể thao và chuyển nghĩa kiểm định tiêu chuẩn từ năm 1821."
      }
    ]
  },

  "6_1_pastitsprime": {
    idiom_headword: "past its prime",
    current_figurative_meaning: "Đã qua thời kỳ hoàng kim, phong độ đỉnh cao; đang trong giai đoạn xuống cấp, thoái trào hoặc hao mòn",
    literal_image: "'Prime' bắt nguồn từ tiếng Latin 'primus' (thời kỳ đầu, mùa xuân, thời điểm hoa nở rực rỡ và quả chín mọng nhất của cây cỏ).",
    figurative_connection: "Cũng như một cái cây sau mùa quả ngọt bắt đầu úa tàn, hay một vận động viên qua tuổi sung mãn nhất thể lực, mọi cỗ máy hoặc con người khi đã vượt qua đỉnh phong độ thì năng suất suy giảm và sự hao mòn thể chất xuất hiện rõ rệt.",
    historical_context: "Xuất hiện trong các bài Sonnet của William Shakespeare (thập niên 1590) khi ông than thở về tuổi xuân tàn phai trước sức tàn phá của thời gian.",
    deep_example: "Although the legendary striker is visibly past his prime, his experience and tactical vision remain invaluable to the team.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — prime (noun/adjective)",
        url: "https://www.oed.com/view/Entry/151322",
        note: "Nguồn gốc từ nguyên Latin primus và nghĩa đỉnh cao sinh mệnh trong văn học Phục hưng."
      },
      {
        title: "Cambridge English Corpus — past one's prime",
        url: "https://dictionary.cambridge.org/dictionary/english/past-your-prime",
        note: "Phân tích tần suất và ngữ nghĩa hiện đại trong văn cảnh thể thao và sự nghiệp."
      }
    ]
  },

  "6_1_notallcrackedup": {
    idiom_headword: "not all it's cracked up to be",
    current_figurative_meaning: "Không hề tuyệt vời, xuất sắc như những lời đồn thổi, tán tụng hay quảng cáo rầm rộ",
    literal_image: "Động từ cổ 'to crack' mang nghĩa là tán tụng, khoe khoang hoặc nói toang ra trước công chúng (tương tự như 'to crack a boast').",
    figurative_connection: "Trong tiếng Anh thế kỷ 18, 'to crack someone up' nghĩa là tâng bốc, thổi phồng danh tiếng của ai lên tận mây xanh. Vì vậy, khi một đối tượng thực tế không đáp ứng được danh tiếng được đồn thổi, người ta nói nó 'not all that it is cracked up to be' (chẳng được như người ta tâng bốc).",
    historical_context: "Thành ngữ trở nên cực kỳ thịnh hành tại Mỹ vào thập niên 1830, đặc biệt xuất hiện trong hồi ký của anh hùng dân gian Davy Crockett năm 1835.",
    deep_example: "Living in a bustling metropolis is not all it's cracked up to be; the staggering living expenses and ceaseless noise can be overwhelming.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Cracked up to be",
        url: "https://www.phrases.org.uk/meanings/cracked-up-to-be.html",
        note: "Tài liệu về hồi ký của Davy Crockett (1835) và tiếng lóng thế kỷ 18."
      },
      {
        title: "Oxford English Dictionary — crack (verb)",
        url: "https://www.oed.com/view/Entry/46571",
        note: "Nghĩa cổ của động từ crack về việc ca ngợi và khoác lác."
      }
    ]
  },

  "6_1_nothingwritehome": {
    idiom_headword: "nothing to write home about",
    current_figurative_meaning: "Rất đỗi bình thường, tầm thường, chẳng có gì đặc sắc hay thú vị để đáng bận tâm ca ngợi",
    literal_image: "Những lá thư tay của người lính viễn chinh hoặc di dân gửi về cho gia đình nơi quê nhà xa xôi.",
    figurative_connection: "Thời xưa khi cước bưu chính đắt đỏ và giấy mực quý giá, người ta chỉ dành thư gửi về gia đình để thuật lại những kỳ tích, sự kiện chấn động hay bước ngoặt vĩ đại. Một trải nghiệm tẻ nhạt, vô vị thì 'nothing to write home about' — không đáng bỏ công sức và mực giấy để nhắc tới.",
    historical_context: "Xuất phát từ giới binh lính và thủy thủ người Anh và Mỹ trong thế kỷ 19, đặc biệt bùng nổ trong các chiến hào Thế chiến thứ nhất.",
    deep_example: "The accommodation at the conference venue was clean, but the catering was really nothing to write home about.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Nothing to write home about",
        url: "https://www.phrases.org.uk/meanings/nothing-to-write-home-about.html",
        note: "Nguồn gốc thư tín quân đội và bằng chứng văn bản thế kỷ 19."
      },
      {
        title: "Green's Dictionary of Slang — write home about",
        url: "https://greensdictofslang.com/entry/v7g3sxa",
        note: "Khảo cứu lịch sử tiếng lóng của lính viễn chinh Anh và Mỹ."
      }
    ]
  },

  "6_1_cheapnasty": {
    idiom_headword: "cheap and nasty",
    current_figurative_meaning: "Rẻ tiền nhưng chất lượng tồi tệ, gia công cẩu thả, độc hại hoặc nhanh hỏng",
    literal_image: "Những sản phẩm may mặc hoặc đồ gia dụng công nghiệp thế kỷ 19 được sản xuất từ nguyên liệu phế thải, đường may cẩu thả và nhuộm hóa chất rẻ tiền.",
    figurative_connection: "Sự kết hợp vần điệu nhịp nhàng giữa 'cheap' (rẻ) và 'nasty' (bẩn thỉu, độc hại, tồi tệ) nêu bật chân lý mua sắm: cái giá rẻ ban đầu thường đi đôi với sự bực bội, nguy cơ hỏng hóc và trải nghiệm tồi tệ.",
    historical_context: "Năm 1850, mục sư kiêm tiểu thuyết gia Charles Kingsley xuất bản cuốn sách nổi tiếng 'Cheap Clothes and Nasty', kịch liệt lên án các xưởng may bóc lột công nhân để tạo ra những bộ trang phục rẻ tiền nhưng mau rách của thời kỳ Cách mạng Công nghiệp.",
    deep_example: "Buying cheap and nasty power tools is a false economy; they overheat easily and break down within weeks.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — cheap and nasty",
        url: "https://www.oed.com/view/Entry/31165",
        note: "Tác phẩm 'Cheap Clothes and Nasty' của Charles Kingsley (1850) và sự phổ cập thành ngữ."
      },
      {
        title: "Brewer's Dictionary of Phrase and Fable — Cheap and Nasty",
        url: "https://www.brewersdictionary.com",
        note: "Khảo cứu thành ngữ gắn liền với phong trào cải cách xã hội thời Victoria."
      }
    ]
  },

  "6_1_fateworsedeath": {
    idiom_headword: "a fate worse than death",
    current_figurative_meaning: "Một kết cục hoặc tình cảnh kinh hoàng, cực kỳ phiền toái, tồi tệ khôn cùng (thường dùng phóng đại, hài hước)",
    literal_image: "Mô-típ kinh điển trong văn học cổ đại và kịch thời Victoria: sự mất danh dự, đày ải khổ sai hoặc bị bắt làm nô lệ được xem là còn cay đắng hơn cái chết.",
    figurative_connection: "Trong giao tiếp hiện đại, người bản ngữ sử dụng nghệ thuật phóng đại (hyperbole) để biến mô-típ bi kịch cổ xưa thành cách diễn đạt hài hước về những bất tiện thường nhật, như kẹt xe nhiều giờ hay phải tham dự một buổi họp vô tận.",
    historical_context: "Cụm từ xuất hiện từ thời La Mã cổ đại và thịnh hành trong các vở kịch lãng mạn melodramas của thế kỷ 19 ở London.",
    deep_example: "Having to sit through my aunt's four-hour slideshow of her trip was truly a fate worse than death!",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — A fate worse than death",
        url: "https://www.phrases.org.uk/meanings/a-fate-worse-than-death.html",
        note: "Lịch sử văn học từ Samuel Richardson (Clarissa, 1748) đến kịch nghệ thế kỷ 19."
      },
      {
        title: "Oxford English Dictionary — fate worse than death",
        url: "https://www.oed.com/view/Entry/68516",
        note: "Khảo cứu cách sử dụng châm biếm và phóng đại trong văn học hiện đại."
      }
    ]
  },

  "6_1_seenbetterdays": {
    idiom_headword: "seen better days",
    current_figurative_meaning: "Đã cũ nát, sờn rách, bạc màu hoặc suy sụp so với thời kỳ huy hoàng trước đây",
    literal_image: "Một con người hoặc đồ vật từng sống qua những 'ngày tươi sáng hơn' (better days), nay đã già nua, tàn tạ theo năm tháng.",
    figurative_connection: "Sự đối lập giữa quá khứ lộng lẫy và hiện tại điêu tàn tạo nên chiều sâu cảm xúc. Thành ngữ được dùng phổ biến để miêu tả những bộ âu phục sờn chỉ, căn nhà cổ tróc sơn hoặc chiếc xe cũ kỹ.",
    historical_context: "Được đại văn hào William Shakespeare ghi dấu ấn bất hủ trong vở kịch 'As You Like It' (1599, Hồi 2 Cảnh 7: 'True is it that we have seen better days') và sau đó là vở 'Timon of Athens' (1607).",
    deep_example: "My winter overcoat has clearly seen better days, but it is so warm and comfortable that I cannot bear to throw it away.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Seen better days",
        url: "https://www.phrases.org.uk/meanings/seen-better-days.html",
        note: "Trích dẫn nguyên văn vở As You Like It của William Shakespeare (1599)."
      },
      {
        title: "Oxford English Dictionary — seen better days",
        url: "https://www.oed.com/view/Entry/50530",
        note: "Dẫn chứng từ Shakespeare và văn học Anh thế kỷ 17."
      }
    ]
  },

  "6_1_likewatchpaint": {
    idiom_headword: "like watching paint dry",
    current_figurative_meaning: "Cực kỳ tẻ nhạt, buồn ngủ, tốn thời gian và vô vị đến phát ngấy",
    literal_image: "Việc ngồi bất động hàng giờ để quan sát lớp sơn dầu trên tường khô dần đi từng chút một mà không có bất kỳ chuyển động nào.",
    figurative_connection: "Quá trình hóa rắn của sơn diễn ra qua sự bay hơi của dung môi ở cấp độ vi mô, mắt người không thể nhận biết được chuyển động. Việc bắt ai đó ngồi nhìn quá trình này là biểu tượng tột đỉnh của sự tra tấn về mặt thị giác và cảm xúc.",
    historical_context: "Thành ngữ ra đời vào giữa thế kỷ 20 trong giới truyền thông và phê bình thể thao để chê bai những trận đấu chậm chạp hoặc những chương trình truyền hình buồn ngủ.",
    deep_example: "Listening to that academic lecture on bureaucratic regulations was honestly like watching paint dry.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge Idioms Dictionary — like watching paint dry",
        url: "https://dictionary.cambridge.org/dictionary/english/like-watching-paint-dry",
        note: "Phân tích ngữ nghĩa ẩn dụ của hiện tượng vật lý trong giao tiếp hiện đại."
      },
      {
        title: "Oxford English Dictionary — paint (verb/noun idioms)",
        url: "https://www.oed.com/view/Entry/136085",
        note: "Các trích dẫn báo chí thập niên 1960 về thể thao và truyền hình."
      }
    ]
  },

  "6_1_notsetworldfire": {
    idiom_headword: "not set the world on fire",
    current_figurative_meaning: "Không quá xuất sắc, không tạo ra bước đột phá hay tiếng vang chấn động nào (năng lực chỉ ở mức trung bình)",
    literal_image: "Ý niệm thiêu đốt cả thế giới hay tạo ra một đám cháy khổng lồ thu hút ánh nhìn của toàn nhân loại.",
    figurative_connection: "Hình ảnh ngọn lửa rực sáng thế giới tượng trưng cho một thành tựu vĩ đại làm thay đổi lịch sử. Khi dùng ở dạng phủ định 'not going to set the world on fire', nó nhận xét một cách thẳng thắn rằng đối tượng chỉ ở mức thường thường bậc trung, không có tiềm năng trở thành huyền thoại.",
    historical_context: "Bắt nguồn từ thành ngữ cổ của Anh 'set the Thames on fire' (thế kỷ 18), sau đó biến thể thành 'set the world on fire' tại Mỹ vào thế kỷ 19.",
    deep_example: "His debut novel was reasonably well written, but it is certainly not going to set the world on fire.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Set the world on fire",
        url: "https://www.phrases.org.uk/meanings/set-the-world-on-fire.html",
        note: "Mối liên hệ giữa set the Thames on fire và set the world on fire."
      },
      {
        title: "Brewer's Dictionary of Phrase and Fable — Set the Thames on Fire",
        url: "https://www.brewersdictionary.com",
        note: "Khảo cứu thành ngữ dân gian Anh thế kỷ 18."
      }
    ]
  },

  "6_1_rougharoundedge": {
    idiom_headword: "rough around the edges",
    current_figurative_meaning: "Còn thô ráp, thiếu sự trau chuốt, tinh tế hoặc lịch thiệp bên ngoài dù cốt lõi bên trong rất tiềm năng",
    literal_image: "Một tác phẩm điêu khắc gỗ, đá hoặc đồ gốm thô mới vừa được đẽo gọt định hình, các mép viền vẫn còn sắc nhọn, xù xì và chưa được mài giũa mịn màng.",
    figurative_connection: "Trong giao tiếp, thành ngữ này dùng để miêu tả một ý tưởng thiết kế sơ bộ (cần hoàn thiện thêm) hoặc một người có tấm lòng chân thật, tài năng nhưng phong thái ứng xử còn vụng về, suồng sã.",
    historical_context: "Xuất phát từ thuật ngữ thủ công mỹ nghệ và nghề mộc thời kỳ tiền công nghiệp, được OED ghi nhận sử dụng ẩn dụ rộng rãi từ thế kỷ 19.",
    deep_example: "The prototype software is still a bit rough around the edges, but the core functionality is undeniably robust.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — rough around the edges",
        url: "https://www.oed.com/view/Entry/167900",
        note: "Nguồn gốc từ nghề thủ công cơ khí và điêu khắc gỗ."
      },
      {
        title: "Merriam-Webster Dictionary — rough around the edges",
        url: "https://www.merriam-webster.com/dictionary/rough%20around%20the%20edges",
        note: "Cách dùng hiện đại trong đánh giá năng lực và thẩm mỹ thiết kế."
      }
    ]
  },

  "6_1_motheaten": {
    idiom_headword: "moth-eaten",
    current_figurative_meaning: "Cũ kỹ mục nát, rách rưới thủng lỗ chỗ; hoặc (ý tưởng, chính sách) cổ hủ, lỗi thời và lạc hậu",
    literal_image: "Quần áo len dạ hoặc ghế bọc nỉ bị ấu trùng loài bướm đêm (Tineola bisselliella) cắn phá thủng lỗ chỗ do bị cất giữ trong góc ẩm tối suốt nhiều năm.",
    figurative_connection: "Dấu hiệu những lỗ thủng do bướm đêm ăn đại diện cho sự bỏ bê, quên lãng và mục nát của thời gian. Khi áp dụng cho tư duy hoặc luật lệ, nó phê phán những thứ đã quá già nua và không còn phù hợp với thực tế mới.",
    historical_context: "Ghi nhận từ thời kỳ tiếng Anh trung đại (thế kỷ 14) dưới dạng nghĩa đen, và được các nhà văn thế kỷ 17 dùng như một tính từ châm biếm sự suy đồi của các thiết chế xã hội phong kiến.",
    deep_example: "It is time for the political party to discard its moth-eaten policies and adopt a forward-looking economic vision.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — moth-eaten (adjective)",
        url: "https://www.oed.com/view/Entry/122687",
        note: "Lịch sử từ vựng từ thời Geoffrey Chaucer đến văn học hiện đại."
      },
      {
        title: "Collins English Dictionary — moth-eaten",
        url: "https://www.collinsdictionary.com/dictionary/english/moth-eaten",
        note: "Phân biệt giữa nghĩa đen vật lý và sắc thái phê phán ý thức hệ."
      }
    ]
  },

  "6_1_onitslastlegs": {
    idiom_headword: "on its last legs",
    current_figurative_meaning: "Sắp hỏng hoàn toàn, rệu rã kiệt quệ, chỉ còn thoi thóp hoạt động trước khi sụp đổ hoặc qua đời",
    literal_image: "Một con ngựa già hoặc con người đã đi bộ quãng đường quá xa, hai chân kiệt sức run rẩy sắp quỵ ngã xuống đất.",
    figurative_connection: "Đôi chân là trụ cột nâng đỡ toàn bộ thân thể. Khi một sinh vật chỉ còn trụ được trên 'những cẳng chân cuối cùng', sự sụp đổ là điều không thể tránh khỏi. Mở rộng cho máy móc, ô tô hay doanh nghiệp, nó chỉ trạng thái sắp hỏng hoàn toàn.",
    historical_context: "Xuất hiện trong văn chương Anh từ thập niên 1590, đặc biệt trong các tác phẩm của Thomas Middleton và John Fletcher.",
    deep_example: "My laptop is definitely on its last legs; the hard drive makes strange clicking noises and crashes constantly.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — On its last legs",
        url: "https://www.phrases.org.uk/meanings/on-his-last-legs.html",
        note: "Dẫn chứng từ thế kỷ 16 và các vở kịch thời kỳ Phục hưng."
      },
      {
        title: "Oxford English Dictionary — last legs",
        url: "https://www.oed.com/view/Entry/107010",
        note: "Ghi chép nghĩa bóng về sự kiệt quệ và cận kề hư hoại."
      }
    ]
  },

  "6_1_laststraw": {
    idiom_headword: "the last straw",
    current_figurative_meaning: "Giọt nước tràn ly — sự cố nhỏ cuối cùng trong một chuỗi bất mãn khiến sức chịu đựng đổ vỡ hoàn toàn",
    literal_image: "Hình ảnh một con lạc đà đang chở kiện hàng nặng trĩu tối đa, người ta đặt thêm chỉ một cọng rơm mỏng manh lên lưng và làm gãy sống lưng nó.",
    figurative_connection: "Cọng rơm đơn lẻ thì vô cùng nhẹ, nhưng khi đặt lên một khối lượng đã đạt giới hạn tới hạn (critical threshold), nó kích hoạt sự sụp đổ toàn diện. Thành ngữ mô tả khoảnh khắc một người mất kiên nhẫn sau hàng loạt tổn thương dồn nén.",
    historical_context: "Rút gọn từ câu tục ngữ 'It is the last straw that breaks the camel's back', được nhắc đến trong các tác phẩm của James Hervey (1746) và tiểu thuyết 'Dombey and Son' của Charles Dickens (1848).",
    deep_example: "The pay cut was bad enough, but when management cancelled our annual leave, that was the last straw; half the department resigned.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — The last straw",
        url: "https://www.phrases.org.uk/meanings/the-last-straw.html",
        note: "Lịch sử câu tục ngữ 'the straw that broke the camel's back' từ thế kỷ 18."
      },
      {
        title: "Oxford English Dictionary — last straw",
        url: "https://www.oed.com/view/Entry/190867",
        note: "Dẫn chứng từ tác phẩm Dombey and Son (1848) của Charles Dickens."
      }
    ]
  },

  "6_1_letdown": {
    idiom_headword: "a let-down",
    current_figurative_meaning: "Sự thất vọng ê chề, hụt hẫng to lớn khi thực tế tồi tệ hơn nhiều so với kỳ vọng ban đầu",
    literal_image: "Động từ phrasal verb 'let down' mang nghĩa đen là hạ thấp dây thừng hoặc nới lỏng cơ cấu neo giữ.",
    figurative_connection: "Khi hy vọng được nâng lên trên chín tầng mây, việc thực tế không đáp ứng tạo ra cú rơi tự do xuống mặt đất. Danh từ 'let-down' truyền tải trọn vẹn cảm giác trống rỗng và hụt hẫng sau một sự kiện được mong chờ suốt thời gian dài.",
    historical_context: "Bắt đầu xuất hiện dưới dạng danh từ ghép từ đầu thế kỷ 19 trong tiếng Anh và được sử dụng rộng rãi trong các bài phê bình kịch nghệ và ẩm thực.",
    deep_example: "After months of sensational marketing, the restaurant opening turned out to be an utter let-down.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — let-down (noun)",
        url: "https://www.oed.com/view/Entry/107629",
        note: "Sự chuyển thể từ phrasal verb sang danh từ chỉ trạng thái tâm lý thất vọng."
      },
      {
        title: "Cambridge English Dictionary — letdown",
        url: "https://dictionary.cambridge.org/dictionary/english/letdown",
        note: "Định nghĩa và ví dụ về sự hụt hẫng cảm xúc trong tiếng Anh hiện đại."
      }
    ]
  },

  "6_1_fellshortexpect": {
    idiom_headword: "fall short of expectations",
    current_figurative_meaning: "Không đạt tới mục tiêu kỳ vọng, thua sút đáng kể so với chỉ tiêu hoặc kế hoạch đã đề ra",
    literal_image: "Trong môn bắn cung (archery) thời Trung cổ, mũi tên của cung thủ rơi cắm xuống đất trước bia ngắm vì lực bắn không đủ tầm xa.",
    figurative_connection: "Mục tiêu hay kỳ vọng đóng vai trò như hồng tâm của bia bắn. Khi kết quả công việc hoặc doanh số không vươn tới được cột mốc đó, nó rơi hụt ở phía trước ('fall short').",
    historical_context: "Cụm từ có mặt trong bản dịch Kinh Thánh King James (1611, Romans 3:23: 'fall short of the glory of God') và trở thành thuật ngữ quen thuộc trong báo cáo tài chính kinh doanh ngày nay.",
    deep_example: "Quarterly revenue fell significantly short of expectations due to unexpected supply chain disruptions.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Fall short",
        url: "https://www.phrases.org.uk/meanings/fall-short.html",
        note: "Nguồn gốc từ thuật ngữ bắn cung và lịch sử văn bản từ thế kỷ 16."
      },
      {
        title: "Oxford English Dictionary — fall short",
        url: "https://www.oed.com/view/Entry/67890",
        note: "Các dẫn chứng văn bản từ Kinh Thánh King James đến kinh tế học hiện đại."
      }
    ]
  },

  "6_1_pastsellby": {
    idiom_headword: "past its sell-by date",
    current_figurative_meaning: "Đã quá hạn sử dụng; lỗi thời, lạc hậu, không còn hữu dụng hay phù hợp với xu thế hiện tại",
    literal_image: "Nhãn ghi hạn sử dụng in trên bao bì thực phẩm đóng gói tại các siêu thị (ngày cuối cùng được phép bày bán).",
    figurative_connection: "Thực phẩm quá hạn bày bán sẽ biến chất và không còn tươi ngon. Khi áp dụng cho đồ công nghệ (như máy tính cổ), chính sách pháp lý hoặc thậm chí là tư duy của một nhà quản lý, nó khẳng định đối tượng đó đã hết thời và cần được thay thế khẩn cấp.",
    historical_context: "Khái niệm 'sell-by date' được chuỗi siêu thị Marks & Spencer tiên phong áp dụng rộng rãi tại Anh vào thập niên 1950–1970. Đến thập niên 1980, thành ngữ bước vào ngôn ngữ thường nhật dưới dạng ẩn dụ.",
    deep_example: "That cumbersome software architecture is well past its sell-by date; the company needs a modern cloud-native solution.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder (Phrases.org.uk) — Past sell-by date",
        url: "https://www.phrases.org.uk/meanings/past-sell-by-date.html",
        note: "Lịch sử ngành bán lẻ Anh quốc và sự ra đời của nhãn hạn sử dụng."
      },
      {
        title: "Oxford English Dictionary — sell-by date",
        url: "https://www.oed.com/view/Entry/175249",
        note: "Dẫn chứng chuyển nghĩa ẩn dụ từ năm 1985 trong báo chí Anh."
      }
    ]
  }
};
