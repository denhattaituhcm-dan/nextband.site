// UNIT 10: Behavior — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 10, pages 46-49 & Answer Key page 228)

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

export const UNIT_10_ETYMOLOGY: Record<string, IdiomEtymology> = {
  // ==========================================
  // Module 10.1: SYMPATHY AND KINDNESS
  // ==========================================
  "10_1_lendhand": {
    idiom_headword: "lend a hand",
    current_figurative_meaning: "Giúp đỡ, chung tay hỗ trợ ai đó làm một công việc cụ thể",
    literal_image: "Cho ai đó 'mượn' bàn tay cơ bắp của mình để cùng bưng bê, khuân vác hoặc thực hiện thao tác vật lý.",
    figurative_connection: "Bàn tay là công cụ lao động trực tiếp nhất của con người. 'Cho mượn bàn tay' đồng nghĩa với việc đóng góp sức lực, thời gian và sự hiện diện để giảm nhẹ gánh nặng cho người khác mà không đòi hỏi đền đáp.",
    historical_context: "Thành ngữ đã xuất hiện trong văn học Anh từ thời kỳ Trung Cổ và Thời kỳ Cận Đại (Early Modern English). Đại văn hào William Shakespeare và nhiều thi sĩ thế kỷ 16-17 đã sử dụng hình tượng này trong các vở kịch để diễn tả tinh thần hiệp trợ cộng đồng.",
    deep_example: "Whenever our community organizes flood-relief food packaging, dozens of university volunteers arrive early to lend a hand.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — hand (noun, phrases)",
        url: "https://www.oed.com/view/Entry/84687",
        note: "Ghi nhận ngữ liệu 'lend a hand' từ thế kỷ 16 trong văn học phục hưng Anh."
      },
      {
        title: "Merriam-Webster Dictionary — lend a hand",
        url: "https://www.merriam-webster.com/dictionary/lend%20a%20hand",
        note: "Định nghĩa và phân tích ngữ dụng trong tiếng Anh hiện đại."
      }
    ]
  },

  "10_1_feelfor": {
    idiom_headword: "feel for",
    current_figurative_meaning: "Thấu cảm, đồng cảm sâu sắc và cảm thấy thương cảm cho nỗi đau khổ hoặc sự vất vả của ai đó",
    literal_image: "Đưa tay sờ soạng, cảm nhận thể chất hoặc rung động cảm xúc cùng tần số với tâm can của người đối diện.",
    figurative_connection: "Không chỉ đơn thuần là nhìn thấy từ bên ngoài (see), 'feel for' đòi hỏi cơ chế đồng cảm thần kinh (emotional resonance): trái tim người nói cũng cảm nhận được nhịp đập đau đớn, nhọc nhằn như chính bản thân đang trải qua hoàn cảnh đó.",
    historical_context: "Cụm động từ phát triển từ tiếng Anh Trung Đại (Middle English) vào khoảng thế kỷ 14-15, bắt nguồn từ quan niệm triết học đạo đức về lòng trắc ẩn (compassion - gốc Latin có nghĩa là 'cùng chịu đau đớn với người khác').",
    deep_example: "Having worked my way through college on minimum wage, I really feel for young interns struggling with soaring metropolitan rents.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Etymology Online — feel (verb)",
        url: "https://www.etymonline.com/word/feel",
        note: "Quá trình mở rộng ý nghĩa từ xúc giác sang cảm xúc đạo đức và đồng cảm."
      },
      {
        title: "Cambridge English Dictionary — feel for someone",
        url: "https://dictionary.cambridge.org/dictionary/english/feel-for-someone",
        note: "Ngữ nghĩa học về cấu trúc phrasal verb cảm xúc."
      }
    ]
  },

  "10_1_generousfault": {
    idiom_headword: "generous to a fault",
    current_figurative_meaning: "Hào phóng quá mức, rộng rãi đến độ có thể gây thiệt thòi hoặc nguy hại cho chính bản thân mình",
    literal_image: "Một đức tính tốt đẹp (generosity) khi đẩy lên mức cực đoan lại chạm tới ranh giới của một 'lỗi lầm / nhược điểm' (fault).",
    figurative_connection: "Thành ngữ thể hiện triết lý quân bình của triết gia Aristotle (Golden Mean): mọi phẩm hạnh khi thái quá đều có thể biến thành gánh nặng. Cho đi quá nhiều khiến người hào phóng bị kẻ xấu lợi dụng hoặc tự rơi vào túng quẫn.",
    historical_context: "Mẫu câu '...to a fault' (như 'kind to a fault', 'generous to a fault') được ghi nhận lần đầu trong văn chương Anh thế kỷ 18, tiêu biểu trong tiểu thuyết và kịch luân lý của Oliver Goldsmith và Henry Fielding.",
    deep_example: "My grandfather was generous to a fault, often giving his pension savings to distant relatives while refusing to buy himself a winter coat.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — fault (noun, phrases)",
        url: "https://www.oed.com/view/Entry/68595",
        note: "Ngữ liệu thành ngữ 'to a fault' xuất hiện trong văn học thế kỷ 18."
      },
      {
        title: "Collins English Dictionary — generous to a fault",
        url: "https://www.collinsdictionary.com/dictionary/english/generous-to-a-fault",
        note: "Phân tích sắc thái ngưỡng mộ kèm chút lo lắng cho người được miêu tả."
      }
    ]
  },

  "10_1_sympatheticear": {
    idiom_headword: "offered a sympathetic ear",
    current_figurative_meaning: "Lắng nghe một cách kiên nhẫn, thấu hiểu và chia sẻ khi người khác đang trút bầu tâm sự",
    literal_image: "Nghiêng tai về phía người nói với ánh mắt quan tâm, sẵn sàng đón nhận toàn bộ âm thanh và cảm xúc đau buồn.",
    figurative_connection: "Đôi tai trở thành biểu tượng của sự tiếp nhận không phán xét. Trong tâm lý học trị liệu, việc có một người chịu im lặng lắng nghe chân thành thường có giá trị xoa dịu hơn hàng trăm lời khuyên sáo rỗng.",
    historical_context: "Cụm ẩn dụ bắt nguồn từ văn học cổ điển phương Tây, nơi 'lending an ear' hay 'sympathetic ear' tượng trưng cho sự tha thứ, che chở và tiếp nhận nỗi oan khuất của con người trước thần linh hoặc quan tòa nhân từ.",
    deep_example: "When Maya was going through a stressful career transition, her mentor offered a sympathetic ear over a quiet cup of chamomile tea.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Lend an ear / sympathetic ear",
        url: "https://www.phrases.org.uk/meanings/lend-an-ear.html",
        note: "Lịch sử ẩn dụ thính giác và lòng nhân ái trong văn học Anh."
      },
      {
        title: "Macmillan Dictionary — a sympathetic ear",
        url: "https://www.macmillandictionary.com/dictionary/british/a-sympathetic-ear",
        note: "Ngữ dụng và collocation chuẩn mực trong văn phong trang trọng."
      }
    ]
  },

  "10_1_bighearted": {
    idiom_headword: "big hearted",
    current_figurative_meaning: "Có tấm lòng rộng lượng, nhân hậu, luôn tốt bụng và sẵn lòng bao dung che chở người khác",
    literal_image: "Một quả tim có kích thước to lớn phi thường, chứa đựng được tình yêu thương bao la cho muôn loài.",
    figurative_connection: "Từ thời cổ đại, trái tim đã được coi là trung tâm của linh hồn và cảm xúc (Cardiocentric hypothesis). Một quả tim 'rộng lớn' biểu đạt dung lượng tinh thần to lớn, có thể dung nạp, tha thứ và chở che cho nhiều số phận kém may mắn.",
    historical_context: "Từ ghép 'big-hearted' đã xuất hiện trong tiếng Anh từ đầu thế kỷ 17. Trong văn hóa Anglo-Saxon, các vị vua và thủ lĩnh hào hiệp thường được xưng tụng là những người có 'trái tim lớn' vì luôn mở tiệc thết đãi và ban thưởng của cải cho thần dân.",
    deep_example: "The shelter was founded by a remarkably big-hearted couple who spent their retirement savings caring for abandoned animals.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Etymology Online — big-hearted (adj.)",
        url: "https://www.etymonline.com/word/big-hearted",
        note: "Ghi nhận xuất hiện từ khoảng thập niên 1630 trong tiếng Anh."
      },
      {
        title: "Merriam-Webster Dictionary — bighearted",
        url: "https://www.merriam-webster.com/dictionary/bighearted",
        note: "Định nghĩa và lịch sử ngữ nghĩa của cụm từ."
      }
    ]
  },

  // ==========================================
  // Module 10.2: TREATING PEOPLE BADLY
  // ==========================================
  "10_2_leavelurch": {
    idiom_headword: "leave someone in the lurch",
    current_figurative_meaning: "Bỏ rơi ai đó giữa cơn hoạn nạn, để mặc họ đơn độc tự gánh chịu khó khăn mà không hề báo trước",
    literal_image: "Bị mắc kẹt trong tình thế thua trắng, bất lực hoàn toàn trên bàn cờ hoặc ván bài khi đồng đội bỏ chạy.",
    figurative_connection: "Xuất phát từ thuật ngữ trò chơi bàn cờ cổ 'lourche' của Pháp (tương tự như trò Backgammon). Khi một người chơi rơi vào thế 'lurch', nghĩa là họ bị đối thủ dẫn trước cách biệt quá xa đến mức thua nhục nhã và bất khả kháng.",
    historical_context: "Từ 'lourche' du nhập vào Anh vào thế kỷ 16 qua các trò chơi xúc xắc và bài tây. Cụm từ 'leave in the lurch' được ghi chép trong văn học Anh từ thập niên 1580, trở thành ẩn dụ kinh điển cho sự phản bội và bỏ rơi chiến hữu.",
    deep_example: "When the head chef walked out during Friday evening rush hour, he left the young sous-chef in the lurch with seventy hungry customers.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — lurch (noun and idiom)",
        url: "https://www.oed.com/view/Entry/111352",
        note: "Tư liệu về trò chơi bàn cờ Pháp 'lourche' từ thế kỷ 16."
      },
      {
        title: "The Phrase Finder — Left in the lurch",
        url: "https://www.phrases.org.uk/meanings/left-in-the-lurch.html",
        note: "Lịch sử và bằng chứng văn học từ thời Elizabeth I."
      }
    ]
  },

  "10_2_givehardtime": {
    idiom_headword: "give someone a hard time",
    current_figurative_meaning: "Làm khó, cằn nhằn, trách móc hoặc gây áp lực căng thẳng cho ai đó về một sai sót",
    literal_image: "Biến khoảng thời gian sống hoặc làm việc của ai đó thành một trải nghiệm nặng nề, gian nan và ngột ngạt.",
    figurative_connection: "'Time' ở đây đại diện cho trải nghiệm tâm lý. Khi một người liên tục chỉ trích, bới móc lỗi lầm, họ đang tước đoạt sự thanh thản và khiến từng phút giây của đối phương trở nên nặng trĩu áp lực tội lỗi.",
    historical_context: "Thành ngữ hình thành trong tiếng Anh Mỹ vào thế kỷ 19, ban đầu gắn liền với bối cảnh lao động khắc nghiệt trong các xưởng máy và nhà tù (hard labor / serving hard time), sau đó lan tỏa ra văn phong khẩu ngữ chỉ sự rầy rà giữa đồng nghiệp, gia đình.",
    deep_example: "Stop giving Lucas such a hard time about misplacing the office keys; he has already apologized and paid for the replacement.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Merriam-Webster Dictionary — give (someone) a hard time",
        url: "https://www.merriam-webster.com/dictionary/give%20someone%20a%20hard%20time",
        note: "Phân tích ngữ cảnh sử dụng trong giao tiếp hiện đại."
      },
      {
        title: "Cambridge English Dictionary — give someone a hard time",
        url: "https://dictionary.cambridge.org/dictionary/english/give-someone-a-hard-time",
        note: "Sắc thái chỉ trích từ phê bình nghiêm túc đến trêu chọc thân mật."
      }
    ]
  },

  "10_2_treatdirt": {
    idiom_headword: "treat someone like dirt",
    current_figurative_meaning: "Đối xử tệ bạc, coi thường ai đó như rác rưởi, không dành cho họ chút tôn trọng tối thiểu",
    literal_image: "Giẫm đạp lên ai đó dưới chân như đám bùn đất dơ bẩn vô giá trị trên mặt đường.",
    figurative_connection: "'Dirt' (đất bẩn, rác rưởi) là chất liệu thấp hèn nhất dưới chân người. Đối xử với một con người như 'dirt' là hành vi tước đoạt phẩm giá cơ bản nhất (dehumanization), xem họ là vật lót đường để sai khiến.",
    historical_context: "Thành ngữ xuất hiện từ thời kỳ Tân Cổ điển trong văn học Anh (khoảng thế kỷ 18), phản ánh sự phân biệt giai cấp sâu sắc giữa tầng lớp quý tộc kiêu ngạo và những người gia nhân nghèo khổ bị coi như 'bụi đất'.",
    deep_example: "No employee should stay at a firm where abusive managers treat frontline staff like dirt while pocketing massive corporate bonuses.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — dirt (noun, figurative use)",
        url: "https://www.oed.com/view/Entry/53291",
        note: "Ý nghĩa ẩn dụ của 'dirt' về sự khinh miệt xã hội từ thế kỷ 18."
      },
      {
        title: "Collins English Dictionary — treat someone like dirt",
        url: "https://www.collinsdictionary.com/dictionary/english/treat-someone-like-dirt",
        note: "Nhãn ngữ dụng Informative/Emphatic về thái độ bất công."
      }
    ]
  },

  "10_2_belowbelt": {
    idiom_headword: "below the belt",
    current_figurative_meaning: "Chơi xấu, đòn hiểm ác ý, lời nhận xét tàn nhẫn vi phạm quy tắc công bằng hoặc đạo đức",
    literal_image: "Cú đấm phạm quy hiểm hóc giáng thẳng vào vùng hạ bộ dưới thắt lưng của võ sĩ quyền Anh.",
    figurative_connection: "Khu vực dưới thắt lưng chứa những bộ phận cực kỳ nhạy cảm và nguy hiểm đến tính mạng khi bị va đập mạnh. Một hành động hoặc lời nói 'below the belt' tấn công vào điểm yếu chí mạng nhất của đối phương theo cách hèn hạ và phi thể thao.",
    historical_context: "Bắt nguồn từ luật quyền Anh do Hầu tước Queensberry ban hành năm 1867 (Marquess of Queensberry Rules). Điều luật này cấm tuyệt đối mọi đòn đấm dưới thắt lưng ('hitting below the belt') để bảo vệ tính mạng võ sĩ và duy trì danh dự thể thao.",
    deep_example: "Criticizing her speech impediment during a formal debate on macroeconomic policy was completely below the belt.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Encyclopedia Britannica — Marquess of Queensberry Rules (1867)",
        url: "https://www.britannica.com/sports/Queensberry-rules",
        note: "Bộ luật quyền Anh hiện đại cấm đòn đánh dưới thắt lưng."
      },
      {
        title: "The Phrase Finder — Below the belt",
        url: "https://www.phrases.org.uk/meanings/below-the-belt.html",
        note: "Tư liệu lịch sử về sự chuyển dịch từ võ đài sang tranh luận xã hội."
      }
    ]
  },

  "10_2_letdown": {
    idiom_headword: "let someone down",
    current_figurative_meaning: "Làm ai đó thất vọng tràn trề, không thực hiện được lời hứa hoặc kỳ vọng mà họ gửi gắm",
    literal_image: "Thả sợi dây thừng đỡ người khác xuống đột ngột khiến họ rơi tự do hoặc làm xẹp lép quả bóng hy vọng.",
    figurative_connection: "Khi tin tưởng ai đó, chúng ta đặt niềm hy vọng lên vị trí trên cao ('high hopes'). Hành động 'let down' giống như buông tay khỏi bệ đỡ, khiến đối phương rơi tõm xuống mặt đất lạnh lẽo của sự hụt hẫng.",
    historical_context: "Ghi nhận trong văn học Anh từ thời kỳ Trung Cổ và Cận Đại. Trong ngành hàng hải cổ, việc thả dây neo hoặc hạ buồm quá nhanh mà không báo hiệu có thể gây lật thuyền và thảm họa cho thủy thủ đoàn bên dưới.",
    deep_example: "The star striker promised his fans a championship victory, but his reckless red card in the final let the entire nation down.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — let down (phrasal verb)",
        url: "https://www.oed.com/view/Entry/107572",
        note: "Tiến trình chuyển biến nghĩa từ hạ dây vật lý sang làm thất vọng tinh thần."
      },
      {
        title: "Merriam-Webster Dictionary — let down",
        url: "https://www.merriam-webster.com/dictionary/letdown",
        note: "Định nghĩa và các ví dụ ngữ cảnh hiện đại."
      }
    ]
  },

  // ==========================================
  // Module 10.3: TEASING PEOPLE
  // ==========================================
  "10_3_pokefun": {
    idiom_headword: "poke fun at",
    current_figurative_meaning: "Châm chọc, chế giễu, mang ai đó ra làm trò cười hoặc mỉa mai một đặc điểm của họ",
    literal_image: "Lấy một que củi hoặc ngón tay chọc chọc vào sườn ai đó để kích động và xem phản ứng của họ.",
    figurative_connection: "Hành vi chọc (poke) vào người khác mang tính xâm lấn nhẹ, vừa gây khó chịu vừa gợi sự hài hước chế nhạo. Người châm chọc cố ý dùng lời nói 'chọc ngoáy' vào những điểm khuyết của đối phương để đám đông cười cợt.",
    historical_context: "Xuất hiện vào đầu thế kỷ 19 trong tiếng Anh khẩu ngữ (khoảng năm 1810-1820). Ban đầu, động từ 'poke' được dùng với nghĩa khiêu khích hoặc chơi khăm (poke a joke at someone) trước khi cố định thành cụm 'poke fun at'.",
    deep_example: "Good-natured comedians poke fun at national quirks without ever crossing into cruel personal humiliation.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — poke (verb, phrases)",
        url: "https://www.oed.com/view/Entry/146685",
        note: "Lịch sử thành ngữ 'poke fun at' từ đầu thế kỷ 19."
      },
      {
        title: "The Phrase Finder — Poke fun at",
        url: "https://www.phrases.org.uk/meanings/poke-fun-at.html",
        note: "Bằng chứng văn bản từ thời Regency tại Anh và Mỹ."
      }
    ]
  },

  "10_3_ribbedme": {
    idiom_headword: "ribbed me",
    current_figurative_meaning: "Trêu chọc, chọc ghẹo ai đó một cách thân mật, suồng sã (thường trong tiếng Anh Mỹ)",
    literal_image: "Thọc cù lét hoặc thúc nhẹ cùi chỏ vào mạng sườn (ribs) của bạn thân trong lúc đùa giỡn.",
    figurative_connection: "Xương sườn (ribs) là vùng cơ thể vừa nhạy cảm vừa dễ gây cười khi bị kích thích xúc giác. Hành động thúc nhẹ vào sườn là cử chỉ thân mật giữa những người bạn chí cốt khi muốn trêu ghẹo một tật xấu đáng yêu.",
    historical_context: "Bắt nguồn từ tiếng lóng của giới sinh viên và thanh thiếu niên Mỹ vào khoảng thập niên 1920 (Roaring Twenties). Từ danh từ 'rib' (xương sườn) chuyển hóa thành ngoại động từ miêu tả việc trêu đùa không ác ý.",
    deep_example: "My colleagues constantly ribbed me for wearing wool socks with sandals on our summer company retreat.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Etymology Online — rib (verb)",
        url: "https://www.etymonline.com/word/rib",
        note: "Sự ra đời của động từ lóng 'rib' (chọc ghẹo) tại Mỹ vào những năm 1920."
      },
      {
        title: "Merriam-Webster Dictionary — rib (transitive verb)",
        url: "https://www.merriam-webster.com/dictionary/rib",
        note: "Đặc trưng ngữ cảnh văn hóa tiếng Anh Mỹ (US Informal)."
      }
    ]
  },

  "10_3_pullingleg": {
    idiom_headword: "pulling my leg",
    current_figurative_meaning: "Nói đùa, gạt chơi, dựng chuyện không có thật để trêu chọc và xem phản ứng của ai đó",
    literal_image: "Kéo chân khiến một người đang bước đi bị vấp ngã bổ chửng một cách tức cười.",
    figurative_connection: "Một câu chuyện bịa đặt vô hại làm cho người nghe tin sái cổ cũng tương tự như việc làm họ 'hụt chân' bước hụt vào cạm bẫy của sự nhẹ dạ, tạo nên tiếng cười sảng khoái cho người chứng kiến.",
    historical_context: "Xuất hiện trong tiếng lóng đường phố London và Mỹ vào nửa sau thế kỷ 19 (thập niên 1880). Ban đầu có giả thuyết gắn với bọn móc túi ngáng chân nạn nhân (tripping up), nhưng trong từ điển tiếng lóng thế kỷ 19, nó nhanh chóng trở thành từ ngữ thuần túy chỉ sự trêu đùa dí dỏm.",
    deep_example: "When my brother claimed he had won a million-dollar lottery, I instantly knew he was just pulling my leg.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "The Phrase Finder — Pull someone's leg",
        url: "https://www.phrases.org.uk/meanings/pull-someones-leg.html",
        note: "Phân tích tư liệu văn bản từ Ohio và Luân Đôn thập niên 1880."
      },
      {
        title: "Oxford English Dictionary — pull (verb, phrases)",
        url: "https://www.oed.com/view/Entry/154336",
        note: "Ngữ liệu lịch sử về sự tiến hóa của thành ngữ."
      }
    ]
  },

  "10_3_practicaljokes": {
    idiom_headword: "practical jokes",
    current_figurative_meaning: "Trò chơi khăm, trò đùa tai quái bằng hành động thực tế nhằm biến ai đó thành kẻ ngớ ngẩn",
    literal_image: "Một trò đùa không chỉ dừng lại ở lời nói mà được hiện thực hóa bằng hành vi vật lý cụ thể (ghế gãy, xô nước trên cửa).",
    figurative_connection: "Từ 'practical' ở đây bắt nguồn từ gốc Hy Lạp 'praktikos' (thực hành, hành động). Khác với một câu chuyện tiếu lâm hay chơi chữ bằng lời nói (verbal joke), trò chơi khăm đòi hỏi dàn dựng hiện trường thực tế để giăng bẫy nạn nhân.",
    historical_context: "Cụm từ đã được sử dụng rộng rãi từ đầu thế kỷ 18 tại Anh, đặc biệt gắn liền với các lễ hội đường phố và ngày Cá tháng Tư (April Fools' Day), khi người dân được phép chơi khăm nhau công khai.",
    deep_example: "Switching the salt and sugar containers in the office cafeteria was one of the intern's harmless practical jokes.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — practical joke",
        url: "https://www.oed.com/view/Entry/149257",
        note: "Ghi nhận ngữ liệu từ đầu thập niên 1700 trong văn học Anh."
      },
      {
        title: "Merriam-Webster Dictionary — practical joke",
        url: "https://www.merriam-webster.com/dictionary/practical%20joke",
        note: "Định nghĩa và phân biệt giữa practical joke và prank."
      }
    ]
  },

  // ==========================================
  // Module 10.4: EXPRESSIONS WITH BEHAVE AND BEHAVIOR
  // ==========================================
  "10_4_wellbehaved": {
    idiom_headword: "well behaved",
    current_figurative_meaning: "Ngoan ngoãn, cư xử đúng mực, lễ phép và tuân thủ các quy tắc đạo đức xã hội",
    literal_image: "Một người (đặc biệt là trẻ em hoặc thú cưng) luôn giữ cử chỉ đoan trang, trật tự và biết điều.",
    figurative_connection: "Bắt nguồn từ động từ 'have' (nắm giữ, kiểm soát). Người 'well-behaved' là người có khả năng tự kiểm soát tốt các xung động bốc đồng của bản thân, thể hiện sự giáo dục chỉn chu và tôn trọng kỷ cương.",
    historical_context: "Xuất hiện trong tiếng Anh từ thời kỳ Phục hưng khi các quy tắc phong nhã (courtesy books) của giới quý tộc Tudor bắt đầu chuẩn hóa cách hành xử nơi công cộng của trẻ em và giới trẻ.",
    deep_example: "The kindergarten teacher praised the toddlers for being remarkably well behaved during their afternoon museum excursion.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — well-behaved",
        url: "https://www.oed.com/view/Entry/227318",
        note: "Sự phát triển của tính từ ghép trong văn học giáo dục Anh thế kỷ 16-17."
      },
      {
        title: "Cambridge English Dictionary — well-behaved",
        url: "https://dictionary.cambridge.org/dictionary/english/well-behaved",
        note: "Collocation và ngữ pháp tính từ ghép."
      }
    ]
  },

  "10_4_behavebeautif": {
    idiom_headword: "behaved beautifully",
    current_figurative_meaning: "Cư xử hoàn hảo không một tì vết, ngoan ngoãn tuyệt vời vượt trên cả kỳ vọng",
    literal_image: "Hành vi trơn tru, uyển chuyển và hài hòa như một tác phẩm nghệ thuật đẹp đẽ.",
    figurative_connection: "Từ 'beautifully' nâng tầm hành vi từ mức đơn thuần là 'đúng chuẩn' lên mức 'thẩm mỹ'. Khi một đứa trẻ hay chú chó 'behave beautifully', cách hành xử của chúng đem lại sự êm dịu, hài lòng và niềm vui thích cho mọi người xung quanh.",
    historical_context: "Lối nói mang đậm màu sắc văn hóa lịch thiệp của tầng lớp thượng lưu Anh thời Victoria, nơi mọi biểu hiện lễ nghi đúng mực được coi là đỉnh cao của cái đẹp đạo đức gia đình.",
    deep_example: "Despite the bumpy flight and long layover, our six-month-old golden retriever behaved beautifully throughout the entire journey.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — beautifully (adverb)",
        url: "https://www.oed.com/view/Entry/16843",
        note: "Sự mở rộng ý nghĩa của 'beautifully' từ thị giác sang đánh giá hành vi hoàn mỹ."
      },
      {
        title: "Collins English Dictionary — behave beautifully",
        url: "https://www.collinsdictionary.com/dictionary/english/beautifully",
        note: "Cấu trúc trạng từ chỉ mức độ hoàn hảo trong tiếng Anh chuẩn."
      }
    ]
  },

  "10_4_badlybehaved": {
    idiom_headword: "badly behaved",
    current_figurative_meaning: "Hư đốn, ngỗ nghịch, bất hảo, hành xử thô lỗ và không chịu vâng lời",
    literal_image: "Những hành vi ngang ngược, lộn xộn, phá vỡ trật tự và phép tắc nơi công cộng.",
    figurative_connection: "Trái ngược với 'well-behaved', người 'badly behaved' không thể hoặc không thèm kiểm soát cảm xúc và hành vi của mình, gây ra sự hỗn loạn, khó chịu và phiền toái cho cộng đồng.",
    historical_context: "Được ghi nhận từ các ghi chép tư pháp và trường học tại Anh từ thế kỷ 17, phản ánh nỗi bức xúc của xã hội đối với những thanh thiếu niên gây rối trật tự an ninh.",
    deep_example: "The cinema manager had to eject a group of badly behaved teenagers who were kicking seats and shouting during the screening.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — badly (adverb, combinations)",
        url: "https://www.oed.com/view/Entry/14619",
        note: "Ngữ liệu tính từ ghép chỉ hành vi tiêu cực từ thế kỷ 17."
      },
      {
        title: "Macmillan Dictionary — badly behaved",
        url: "https://www.macmillandictionary.com/dictionary/british/badly-behaved",
        note: "Định nghĩa và trường từ vựng liên quan."
      }
    ]
  },

  "10_4_bestbevior": {
    idiom_headword: "on my best behavior",
    current_figurative_meaning: "Cư xử cực kỳ lễ độ, cẩn trọng giữ gìn ý tứ tối đa trong một sự kiện quan trọng",
    literal_image: "Đưa ra phiên bản hoàn thiện nhất, lịch thiệp nhất của bản thân ra để trưng bày trước ánh nhìn của người khác.",
    figurative_connection: "Mỗi người có nhiều mức độ cư xử khác nhau tùy bối cảnh. Khi 'on our best behavior', chúng ta chủ động kích hoạt trạng thái kỷ luật cao nhất, uốn nắn từng lời ăn tiếng nói để tạo ấn tượng tốt đẹp nhất.",
    historical_context: "Bắt nguồn từ thành ngữ pháp lý Anh thế kỷ 18: 'bound over to be of good behavior' (bị tòa án quản chế buộc phải giữ gìn hạnh kiểm tốt). Dân gian sau đó nâng cấp từ 'good' thành 'best' để diễn tả nỗ lực lấy lòng phụ huynh hoặc cấp trên.",
    deep_example: "Knowing how conservative the CEO was, all the junior executives were on their best behavior at the annual shareholders banquet.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — behavior (noun, legal origins)",
        url: "https://www.oed.com/view/Entry/17260",
        note: "Khái niệm pháp lý 'good behavior' và chuyển dịch khẩu ngữ sang 'best behavior'."
      },
      {
        title: "The Phrase Finder — On your best behavior",
        url: "https://www.phrases.org.uk/meanings/on-your-best-behavior.html",
        note: "Tiến trình chuyển dịch từ pháp đình sang lễ nghi xã giao."
      }
    ]
  },

  "10_4_outofcharacter": {
    idiom_headword: "behaved out of character",
    current_figurative_meaning: "Hành xử khác thường, trái ngược hoàn toàn với tính cách hay phong thái điềm tĩnh thường ngày",
    literal_image: "Một diễn viên trên sân khấu bỗng dưng bỏ kịch bản và nói những lời hoàn toàn trái ngược với nhân vật mình đang đóng.",
    figurative_connection: "'Character' ở đây vừa là tính cách vừa là vai diễn kịch nghệ. Khi một người cư xử 'out of character', họ như thể bị mất phương hướng tâm lý hoặc chịu áp lực ghê gớm khiến bản tính quen thuộc bị đảo lộn hoàn toàn.",
    historical_context: "Bắt nguồn từ lý luận kịch nghệ cổ Hy Lạp và kịch nghệ Shakespeare thế kỷ 16-17: một nhân vật phải giữ vững tính nhất quán (decorum/consistency). Bất kỳ hành vi nào đi chệch khỏi quy chuẩn tính cách đều bị coi là 'out of character'.",
    deep_example: "For a normally mild-mannered librarian, throwing a hardcover book across the room was profoundly out of character.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — character (noun, theatrical phrases)",
        url: "https://www.oed.com/view/Entry/30639",
        note: "Nguồn gốc sân khấu của cụm 'in character' và 'out of character'."
      },
      {
        title: "Merriam-Webster Dictionary — out of character",
        url: "https://www.merriam-webster.com/dictionary/out%20of%20character",
        note: "Định nghĩa tâm lý học và ngôn ngữ học ứng dụng."
      }
    ]
  },

  "10_4_unacceptbehav": {
    idiom_headword: "unacceptable behavior",
    current_figurative_meaning: "Hành vi không thể chấp nhận được, xúc phạm quy chuẩn đạo đức, pháp luật hoặc nội quy chung",
    literal_image: "Một lá đơn hoặc món hàng bị từ chối thẳng thừng, bị ném trả lại vì vi phạm các tiêu chuẩn tối thiểu.",
    figurative_connection: "'Acceptable' là ranh giới được cộng đồng đồng thuận tiếp nhận. Hành vi 'unacceptable' đã bước qua lằn ranh đỏ, trở thành mối đe dọa hoặc sự xúc phạm đến phẩm giá và sự bình yên của người khác.",
    historical_context: "Cụm danh ngữ cố định này phát triển trong các quy chế quản trị nhà trường, công sở và luật dân sự phương Tây từ thế kỷ 19, đóng vai trò căn cứ chính thức để cảnh cáo, sa thải hoặc kỷ luật học sinh/nhân viên.",
    deep_example: "The university issued a zero-tolerance statement reminding students that cyberbullying constitutes deeply unacceptable behavior.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — unacceptable (adjective)",
        url: "https://www.oed.com/view/Entry/208889",
        note: "Ngữ nghĩa học về chuẩn mực đạo đức và pháp lý công sở."
      },
      {
        title: "Cambridge English Dictionary — unacceptable behavior",
        url: "https://dictionary.cambridge.org/dictionary/english/unacceptable",
        note: "Collocation hành chính và giáo dục học hiện đại."
      }
    ]
  }
};

export default UNIT_10_ETYMOLOGY;
