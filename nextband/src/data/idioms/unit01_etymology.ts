// unit01_etymology_data.ts
export interface IdiomEtymology {
  literal_image: string;
  figurative_connection: string;
  historical_context: string;
  deep_example: string;
  evidence_category: "DOCUMENTED ORIGIN" | "PLAUSIBLE IMAGE/MEANING CONNECTION" | "ORIGIN UNCERTAIN";
  sources: { title: string; url?: string }[];
}

export const UNIT_01_ETYMOLOGY: Record<string, IdiomEtymology> = {
  "1_1_springchicken": {
    literal_image: "Gà tơ nở vào đầu mùa xuân (spring chicken) tại các trang trại truyền thống.",
    figurative_connection: "Trước thời chăn nuôi công nghiệp, gà chỉ ấp nở vào mùa xuân, ăn cỏ non và sâu bọ nên thịt rất mềm, ngọt và bán được giá cao. Đến cuối năm hoặc qua mùa đông, thịt gà trở nên dai ngoách. Khi người mua tại chợ phiên vạch cánh gà ra kiểm tra thấy người bán gian lận gà già giả gà tơ, họ sẽ bảo: 'This is no spring chicken!'. Từ đó hình thành cách nói tự nhận hoặc châm biếm ai đó đã có tuổi, không còn sức vóc thanh xuân.",
    historical_context: "Ghi nhận từ thế kỷ 18 ở Anh; Oxford English Dictionary (OED) dẫn chứng thuật ngữ 'spring chicken' từ năm 1765, và các tài liệu văn học như The Spectator (1711) từng dùng dạng tiền thân 'past a chicken'.",
    deep_example: "So sánh: Một 'spring chicken' là vận động viên 18 tuổi vừa vào nghề; còn người 45 tuổi leo núi thở dốc sẽ cười bảo 'I'm no spring chicken!' để tự trào thể lực.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - spring chicken", url: "https://www.oed.com" },
      { title: "Phrases.org.uk - No spring chicken", url: "https://www.phrases.org.uk/meanings/no-spring-chicken.html" }
    ]
  },
  "1_1_wetbehindears": {
    literal_image: "Thú non (bê, ngựa con) vừa mới lọt lòng mẹ, cơ thể còn đẫm nước ối.",
    figurative_connection: "Khi bò mẹ sinh con, nó sẽ dùng lưỡi liếm sạch nước ối trên khắp cơ thể bê con. Tuy nhiên, hai hốc và nếp gấp sâu ngay phía sau vành tai là vị trí khó chạm tới nhất và khô sau cùng. Một con non mà 'phía sau tai vẫn còn ướt' chứng tỏ nó chỉ mới chào đời được vài giờ, còn hoàn toàn yếu ớt, ngây thơ và thiếu kinh nghiệm sinh tồn.",
    historical_context: "Thành ngữ là một bản dịch vay mượn (calque) từ tiếng Đức '(noch) nass hinter den Ohren' có từ thập niên 1640. Du nhập vào tiếng Anh Mỹ vào giữa thế kỷ 19 (OED trích dẫn từ tờ The Boston Daily Atlas, 1851).",
    deep_example: "Một kỹ sư mới ra trường ngày đầu đi làm chưa biết quy trình thực tế thường được các tiền bối thông cảm: 'He is still a bit wet behind the ears.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - wet behind the ears", url: "https://www.oed.com" },
      { title: "Grammarphobia Etymology Research", url: "https://www.grammarphobia.com" }
    ]
  },
  "1_1_getoninyears": {
    literal_image: "Hành động di chuyển tiến bước về phía trước trên một con đường (phrasal verb 'get on').",
    figurative_connection: "Động từ 'get on' mang nghĩa tiến lên phía trước. Khi kết hợp với 'in years' (trong số năm), thành ngữ vẽ nên hình ảnh một người đang sải bước xa hơn trên trục đo thời gian của đời người. Nhờ hình ảnh trung tính, nó trở thành cách nói giảm nói tránh lịch sự thay vì dùng từ thẳng thừng 'getting old'.",
    historical_context: "Sự phát triển ngữ nghĩa tự nhiên của giới từ và phrasal verb trong tiếng Anh cận đại (tương tự như 'time is getting on' - thời gian đang trôi dần).",
    deep_example: "Thay vì nói kém tế nhị: 'My grandmother is very old', người bản ngữ thường nói: 'My grandmother is getting on in years, so we visit her weekly.'",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      { title: "Cambridge Advanced Learner's Dictionary", url: "https://dictionary.cambridge.org" },
      { title: "Oxford Learner's Dictionaries", url: "https://www.oxfordlearnersdictionaries.com" }
    ]
  },
  "1_1_oldashills": {
    literal_image: "Những quả đồi, dãy núi sừng sững hình thành từ thuở sơ khai của Trái Đất.",
    figurative_connection: "Trong tâm thức nhân loại, đồi núi là biểu tượng của sự trường tồn vĩnh hằng, có mặt trước mọi thế hệ con người. Phép so sánh cường điệu 'as old as the hills' phóng đại tuổi đời của một người hoặc sự lâu đời của một câu chuyện, vật dụng đến mức cổ xưa như chính địa hình thiên nhiên.",
    historical_context: "Bắt nguồn từ ý niệm trong Kinh Thánh, cụ thể là Sách Gióp (Job 15:7): 'Art thou the first man that was born? or wast thou made before the hills?'. Định hình thành thành ngữ cửa miệng từ thế kỷ 18 ở Anh.",
    deep_example: "Khi nghe một câu chuyện cười mà ai cũng biết từ 20 năm trước: 'That joke is as old as the hills!'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - old as the hills", url: "https://www.oed.com" },
      { title: "Phrases.org.uk - As old as the hills", url: "https://www.phrases.org.uk" },
      { title: "The Holy Bible - Book of Job 15:7" }
    ]
  },
  "1_1_brightyoung": {
    literal_image: "Tầng lớp thanh niên quý tộc, nghệ sĩ trẻ tại London vào thập niên 1920 (Jazz Age) với trang phục lộng lẫy và lối sống phóng khoáng.",
    figurative_connection: "Từ 'bright' vừa có nghĩa là sáng sủa, thông minh, vừa chỉ sự rực rỡ, thời thượng. Hình ảnh những người trẻ tuổi tỏa sáng và cuồng nhiệt sau khi thoát khỏi bóng tối của Thế chiến I đã tạo nên cụm từ chỉ những cá nhân trẻ trung đầy hoài bão và tài năng.",
    historical_context: "Thuật ngữ được báo chí Anh (như tờ Daily Mail năm 1924) đặt cho nhóm 'Bright Young People / Bright Young Things' chuyên tổ chức những chuyến săn lùng kho báu bằng ô tô quanh London. Sau đó được văn hào Evelyn Waugh bất tử hóa trong tiểu thuyết trào phúng Vile Bodies (1930).",
    deep_example: "Các sinh viên xuất sắc vừa tốt nghiệp đại học danh tiếng vào làm việc tại thung lũng Silicon thường được gọi là 'the bright young things of tech'.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - bright young thing", url: "https://www.oed.com" },
      { title: "National Portrait Gallery UK - The Bright Young Things" }
    ]
  },
  "1_1_generationgap": {
    literal_image: "Một cây cầu (bridge) bắc qua một khe nứt / vực sâu (gap) chia cắt hai bờ đất đá.",
    figurative_connection: "Khe nứt đại diện cho sự cách biệt về lối sống, quan điểm và công nghệ giữa hai thế hệ; còn nhịp cầu đại diện cho sự giao tiếp, đồng cảm và chia sẻ để đôi bên tìm được tiếng nói chung.",
    historical_context: "Thuật ngữ 'generation gap' chính thức xuất hiện trên báo chí Mỹ vào năm 1962 (OED ghi nhận tháng 7/1962) và được các nhà xã hội học như Kenneth Keniston và Margaret Mead phổ biến rộng rãi trong làn sóng xung đột văn hóa thập niên 1960.",
    deep_example: "Một bộ phim hài gia đình mà cả ông bà 70 tuổi lẫn cháu 10 tuổi đều xem say sưa chính là minh chứng cho việc 'bridging the generation gap'.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED 1962) - generation gap", url: "https://www.oed.com" },
      { title: "Kenneth Keniston, The Uncommitted: Alienated Youth in American Society (1965)" }
    ]
  },
  "1_1_primeoflife": {
    literal_image: "Mùa xuân đâm chồi nảy lộc hoặc canh giờ đầu tiên tràn ngập sinh khí của một ngày mới.",
    figurative_connection: "Từ 'prime' bắt nguồn từ tiếng Latin 'primus' (thứ nhất, đỉnh cao, tuyệt mỹ nhất). Khi ví đời người như một năm có bốn mùa, 'the prime of life' chính là mùa xuân rực rỡ nhất — giai đoạn con người đạt đỉnh cao sung mãn về thể chất, trí tuệ và sự nghiệp (thường ở độ tuổi 30–45).",
    historical_context: "Bắt nguồn từ tiếng Pháp cổ và Latin, cụm từ 'in the prime of life' đã được chuẩn hóa và ghi nhận rộng rãi trong văn học tiếng Anh từ đầu thế kỷ 18.",
    deep_example: "Một vận động viên marathon ở tuổi 32 khi vừa phá kỷ lục thế giới và có sức khỏe dẻo dai nhất chính là đang 'in the prime of his life'.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Online Etymology Dictionary - prime (adj./n.)", url: "https://www.etymonline.com" },
      { title: "Oxford English Dictionary (OED)" }
    ]
  },
  "1_1_kneegrasshop": {
    literal_image: "Chiều cao của một người chỉ ngang tới đầu gối của một con cào cào / châu chấu.",
    figurative_connection: "Cào cào là loài côn trùng nhảy sát mặt cỏ; khớp gối của nó chỉ cách mặt đất vài milimet. Đây là một phép ngoa dụ (hyperbole) dí dỏm của người Mỹ xưa để hình dung một đứa bé còn quá đỗi nhỏ bé, chập chững thuở ấu thơ.",
    historical_context: "Thành ngữ dân gian vùng nông thôn Mỹ xuất hiện vào giữa thế kỷ 19 (khoảng 1850). Trước đó từng tồn tại các biến thể như 'knee-high to a toad' (1814) hay 'knee-high to a mosquito' (1830s), nhưng biến thể châu chấu giàu nhạc điệu và hình tượng nhất.",
    deep_example: "'I used to fish in this river with my grandfather when I was knee-high to a grasshopper.' (Tôi hay câu cá ở sông này với ông nội từ thuở còn bé tí).",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - knee-high", url: "https://www.oed.com" },
      { title: "Phrases.org.uk - Knee-high to a grasshopper", url: "https://www.phrases.org.uk" }
    ]
  },
  "1_1_longtooth": {
    literal_image: "Bộ răng của một con ngựa già bị nhô dài ra và tụt nướu.",
    figurative_connection: "Răng ngựa tiếp tục mọc và mòn theo thời gian; khi ngựa càng già, nướu răng teo rút dần làm chân răng lộ rõ và hướng nghiêng ra phía trước khiến răng trông dài hơn hẳn. Các thương lái buôn ngựa xưa luôn vạch miệng ngựa để xem răng đoán tuổi. Một con ngựa 'long in the tooth' nghĩa là đã già yếu, giảm giá trị.",
    historical_context: "Bắt nguồn từ tập quán chăn nuôi và buôn bán ngựa. Nhà văn William Makepeace Thackeray là người đầu tiên chuyển nghĩa từ ngựa sang miêu tả con người trong cuốn tiểu thuyết The History of Henry Esmond (1852).",
    deep_example: "'I love listening to rock concerts, but I'm a bit too long in the tooth to stand in the mosh pit for four hours!'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - long in the tooth", url: "https://www.oed.com" },
      { title: "William Makepeace Thackeray, Henry Esmond (1852)" },
      { title: "Phrases.org.uk - Long in the tooth" }
    ]
  },
  "1_1_twilightyears": {
    literal_image: "Khoảnh khắc chạng vạng hoàng hôn (twilight) khi mặt trời đã khuất núi nhưng bầu trời vẫn còn vương ánh sáng êm dịu.",
    figurative_connection: "Ẩn dụ kinh điển ví cuộc đời con người như một ngày trọn vẹn: bình minh là tuổi thơ, buổi trưa là thời kỳ thanh xuân hăng say lao động, và hoàng hôn chạng vạng (twilight) là những năm tháng tuổi già an nhàn, bình yên sau khi buông bỏ gánh nặng thế sự.",
    historical_context: "Ẩn dụ thi ca truyền thống phương Tây (dies vitae). Tương tự như 'sunset years' hay 'autumn of one's life', cụm từ mang sắc thái nhẹ nhàng, thi vị và ấm áp hơn rất nhiều so với 'old age'.",
    deep_example: "Sau bốn mươi năm cống hiến cho giảng dạy, hai vợ chồng thầy giáo chuyển về vùng nông thôn ven biển để an hưởng 'their twilight years'.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      { title: "Oxford English Dictionary (OED) - twilight (n.)", url: "https://www.oed.com" },
      { title: "Wiktionary - twilight years", url: "https://en.wiktionary.org" }
    ]
  },
  "1_1_overthehill": {
    literal_image: "Người bộ hành đã leo qua đỉnh của ngọn đồi và đang bước đi xuống dốc ở sườn bên kia.",
    figurative_connection: "Ví hành trình cuộc đời như một ngọn đồi: giai đoạn đầu đời ta dùng hết sức lực leo dốc (phát triển thể chất, xây dựng danh tiếng). Đỉnh đồi là thời kỳ đỉnh cao. Khi đã bước qua đỉnh ('over the hill'), bước chân sẽ bắt đầu đi xuống dốc, biểu thị sự dẻo dai thể lực và phong độ bắt đầu giảm sút.",
    historical_context: "Trong tiếng lóng quân đội Mỹ đầu thế kỷ 20, 'over the hill' từng có nghĩa là đào ngũ (trốn qua ngọn đồi doanh trại). Vào thập niên 1940–1950, nó chuyển nghĩa sang đời sống thường nhật để trêu đùa về tuổi tác, đặc biệt là khi bước qua sinh nhật 40 hoặc 50 tuổi.",
    deep_example: "Khi một cầu thủ bóng đá 36 tuổi không còn bứt tốc qua được hậu vệ đối phương, báo chí thường bình luận anh ấy đã 'over the hill'.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - over the hill", url: "https://www.oed.com" },
      { title: "The Idioms - Over the hill origin", url: "https://www.theidioms.com" }
    ]
  },
  "1_1_youngheart": {
    literal_image: "Trái tim (biểu tượng của cảm xúc, tâm hồn) vẫn giữ nguyên nhịp đập sôi nổi và nhiệt huyết của tuổi trẻ.",
    figurative_connection: "Thành ngữ phân định rạch ròi giữa tuổi tác thể xác (biological age) và tuổi tác tâm hồn (spiritual attitude). Dù tóc có bạc và da có nhăn, nếu trái tim bên trong vẫn chan chứa niềm vui, sự tò mò và yêu đời thì người đó vẫn 'young at heart'.",
    historical_context: "Cụm từ xuất hiện trên báo chí Anh từ năm 1836 (The Albion). Năm 1953, bài hát kinh điển 'Young at Heart' do Frank Sinatra thể hiện (lời của Carolyn Leigh) đã đưa cụm từ này trở thành châm ngôn sống toàn cầu.",
    deep_example: "Bà cụ 80 tuổi vẫn hào hứng học trượt ván cùng các cháu và luôn nở nụ cười rạng rỡ — bà thực sự là một người 'young at heart'.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - young at heart", url: "https://www.oed.com" },
      { title: "Phrases.org.uk - Young at heart", url: "https://www.phrases.org.uk" }
    ]
  },
  "1_2_ripeoldage": {
    literal_image: "Trái cây hoặc bông lúa trên cánh đồng chín muồi (ripe), căng tròn hương vị vào mùa thu hoạch.",
    figurative_connection: "Từ gốc 'rīpe' trong tiếng Anh cổ chỉ nông sản đã phát triển trọn vẹn đến ngưỡng tối đa của tự nhiên trước khi thu hái. Ẩn dụ này ví đời người như một mùa màng: người sống đến 'ripe old age' là người đã trải qua trọn vẹn mọi thăng trầm, tích lũy trọn vẹn trí tuệ và trường thọ mà không bị ngắt gãy giữa chừng.",
    historical_context: "Ẩn dụ nông nghiệp thời Trung Cổ (thế kỷ 14–15). OED ghi nhận 'ripe' được dùng để miêu tả trí tuệ và tuổi thọ viên mãn của con người từ thời Trung Anh (Middle English).",
    deep_example: "'He lived to the ripe old age of 98, surrounded by his loving children and grandchildren.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - ripe (adj.)", url: "https://www.oed.com" },
      { title: "Online Etymology Dictionary - ripe", url: "https://www.etymonline.com" }
    ]
  },
  "1_2_acthisage": {
    literal_image: "Hành động vào vai diễn (act) trên sân khấu kịch tương thích với tuổi tác thật của nhân vật.",
    figurative_connection: "Một diễn viên người lớn nếu đóng vai trẻ con khóc nhè trên sân khấu sẽ khiến khán giả khó chịu. Tương tự trong đời thực, cụm từ này là lời nhắc nhở nghiêm túc yêu cầu một người phải thể hiện sự chững chạc, đúng mực mà xã hội kỳ vọng ở độ tuổi của họ.",
    historical_context: "Thịnh hành như tiếng lóng khẩu ngữ tại Bắc Mỹ vào thập niên 1920 (Jazz Age), thời kỳ thanh niên bắt đầu có những thú vui phá cách và người lớn thường dùng câu 'Act your age!' để răn đe.",
    deep_example: "Khi một người đàn ông 30 tuổi giận dỗi ném đồ đạc xuống sàn chỉ vì thua một ván game: 'Stop screaming and act your age!'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - act (v.)", url: "https://www.oed.com" },
      { title: "Eric Partridge, A Dictionary of Slang and Unconventional English" }
    ]
  },
  "1_2_tenderage": {
    literal_image: "Chồi non, búp mầm của cành cây mới nhú còn mỏng manh, mềm mại (tender).",
    figurative_connection: "Từ 'tender' gốc Latin 'tener' chỉ sự mềm mại, mỏng manh và dễ dập nát. Đặt trước 'age', nó gợi lên hình ảnh một đứa trẻ thơ ấu ngây thơ, tâm hồn như tờ giấy trắng, chưa hề biết đến sự khắc nghiệt của cuộc đời và rất cần được yêu thương nâng niu.",
    historical_context: "Du nhập từ tiếng Pháp cổ và Latin vào thời Trung Anh. William Shakespeare thường xuyên sử dụng 'tender age' và 'tender years' trong các vở kịch lịch sử (như Richard III) để khắc họa sự dễ bị tổn thương của các ấu chúa.",
    deep_example: "Thần đồng âm nhạc Mozart đã sáng tác những bản nhạc đầu tiên 'at the tender age of five'.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - tender (adj.)", url: "https://www.oed.com" },
      { title: "William Shakespeare, The Tragedy of King Richard the Third" }
    ]
  },
  "1_2_feelmyage": {
    literal_image: "Cảm giác đau nhức cơ bắp, khớp xương hoặc sự hụt hơi rõ rệt sau một đợt vận động.",
    figurative_connection: "Tuổi tác trên thẻ căn cước chỉ là một con số vô hình. Nhưng khi bạn tham gia vào một hoạt động thể lực cùng thanh niên và cảm thấy kiệt sức, đó là lúc gánh nặng của năm tháng chuyển hóa thành cảm giác vật lý cụ thể trong cơ thể bạn.",
    historical_context: "Phát triển ngữ nghĩa tự nhiên của động từ tri giác 'feel' (từ tiếng Anh cổ 'fēlan') kết hợp cùng danh từ 'age'. Không gắn liền với một điển cố lịch sử duy nhất.",
    deep_example: "Sau chuyến đi bộ dã ngoại 15km cùng các con: 'My knees were aching so much, I really felt my age.'",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      { title: "Oxford English Dictionary (OED) - feel (v., Phrases P.10)", url: "https://www.oed.com" },
      { title: "Oxford Dictionary of English Idioms" }
    ]
  },
  "1_2_awkwardage": {
    literal_image: "Từ 'awkward' gốc Bắc Âu cổ (ǫfugr) có nghĩa là 'quay ngược hướng, vụng về, lóng ngóng'.",
    figurative_connection: "Giai đoạn dậy thì (adolescence) là thời kỳ mà tay chân phát triển nhanh chóng khiến các bạn trẻ lóng ngóng, giọng nói vỡ tiếng, đồng thời tâm lý tự ti, hay xấu hổ và chưa biết cách giao tiếp sao cho giống người lớn.",
    historical_context: "Thành ngữ thế kỷ 19 ở Anh, được nhà văn Henry James chọn làm nhan đề cho tiểu thuyết kinh điển The Awkward Age (1899) để mổ xẻ sự khó xử của gia đình và xã hội thượng lưu khi ứng xử với thiếu nữ đến tuổi trưởng thành.",
    deep_example: "Cậu bé 14 tuổi thường đỏ mặt, ấp úng và không dám nhìn thẳng khi người lạ chào hỏi — cậu bé đang 'at that awkward age'.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Henry James, The Awkward Age (1899)", url: "https://www.britannica.com" },
      { title: "Oxford English Dictionary (OED) - awkward age" }
    ]
  },
  "1_2_comeofage": {
    literal_image: "Cột mốc thời gian pháp lý khi một cá nhân chính thức bước qua ngưỡng cửa để được công nhận là người lớn.",
    figurative_connection: "Từ thời điểm này, cá nhân không còn là trẻ vị thành niên dưới sự bảo bọc và kiểm soát của cha mẹ nữa, mà tự mình chịu trách nhiệm pháp lý, được quyền bầu cử, ký hợp đồng và kết hôn.",
    historical_context: "Bắt nguồn từ luật phong kiến Anh thời Trung cổ: Một người thừa kế nam chỉ được xem là 'come of age' ở mốc 21 tuổi vì đây là độ tuổi cơ thể đủ phát triển để mặc vừa bộ áo giáp hiệp sĩ nặng nề và mang vũ khí cưỡi chiến mã ra trận. Mốc 21 tuổi được giữ suốt nhiều thế kỷ cho đến khi các đạo luật thế kỷ 20 hạ xuống 18 tuổi.",
    deep_example: "Ở nhiều nền văn hóa phương Tây, sinh nhật tuổi 18 hoặc 21 là lễ kỷ niệm trọng đại đánh dấu thời khắc người trẻ 'comes of age'.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - come of age", url: "https://www.oed.com" },
      { title: "British Feudal Wardship & Medieval Land Law Records" }
    ]
  },
  "1_2_improveage": {
    literal_image: "Những thùng rượu vang nho hoặc bánh phô mai được ủ kỹ trong hầm tối qua nhiều năm tháng.",
    figurative_connection: "Trong tự nhiên, hầu hết thực phẩm hữu cơ để lâu đều bị hỏng. Riêng rượu vang ngon thì quá trình oxy hóa chậm và phản ứng hóa học tự nhiên giúp vị chát gắt dịu đi, hương thơm phức hợp và giá trị tăng vọt. Ẩn dụ này chuyển nghĩa sang con người: một số người càng có tuổi thì giọng hát, kỹ năng sống và thần thái lại càng mặn mà, lôi cuốn.",
    historical_context: "Xuất phát từ nghệ thuật ủ rượu vang truyền thống (viticulture) từ thời Hy Lạp - La Mã cổ đại (như các ghi chép của thi hào Horace về rượu vang Falernian để lâu năm) và đi vào tiếng Anh thành khuôn mẫu ẩn dụ so sánh.",
    deep_example: "Giọng hát trầm ấm của danh ca không hề bị mai một mà trái lại còn 'improves with age' như một chai rượu vang hảo hạng.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      { title: "Oxford English Dictionary (OED) - improve (v.)", url: "https://www.oed.com" },
      { title: "Wiktionary - age like fine wine", url: "https://en.wiktionary.org" }
    ]
  },
  "1_2_greatage": {
    literal_image: "Sự đo lường trường độ vĩ đại ('great' từ tiếng Anh cổ 'grēat') áp dụng cho chiều dài năm tháng của một sinh mệnh.",
    figurative_connection: "Con số tuổi thọ đạt đến mức hiếm thấy trong quần thể đồng loại (thường là 90, 100 tuổi hoặc hơn). Việc dùng tính từ 'great' nhấn mạnh sự kỳ diệu, đáng tôn kính của một chặng đường sống trường thọ.",
    historical_context: "Cụm từ trang trọng xuất hiện trong các văn bản Trung Anh và cận đại (như các bản tiểu sử, chúc thư) thường kết hợp với động từ 'reach / live to a great age'.",
    deep_example: "Cụ bà vừa kỷ niệm sinh nhật 102 tuổi trong sự kính trọng và yêu thương của năm thế hệ con cháu: 'She has reached the great age of 102.'",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      { title: "Oxford English Dictionary (OED) - great (adj.)", url: "https://www.oed.com" },
      { title: "Middle English Compendium" }
    ]
  }
};
