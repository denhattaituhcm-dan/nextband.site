import { VocabularyTerm } from "../types";

// Standard English function words / stop words to exclude from click-to-lookup
export const FUNCTION_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "can", "can't", "cannot", "could", "couldn't",
  "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during",
  "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
  "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here",
  "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i",
  "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it",
  "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my",
  "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
  "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "per",
  "pm", "am", "same", "shan't", "she", "she'd", "she'll", "she's", "should",
  "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their",
  "theirs", "them", "themselves", "then", "there", "there's", "these", "they",
  "they'd", "they'll", "they're", "they've", "this", "those", "through", "to",
  "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll",
  "we're", "we've", "were", "weren't", "what", "what's", "when", "when's",
  "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's",
  "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're",
  "you've", "your", "yours", "yourself", "yourselves", "also", "since", "although",
  "though", "either", "neither", "nor", "yet", "via", "vs"
]);

export function isContentWord(word: string): boolean {
  const clean = word.toLowerCase().replace(/[^a-z0-9-]/g, "").trim();
  if (!clean || clean.length < 2) return false;
  if (/^\d+$/.test(clean)) return false;
  return !FUNCTION_WORDS.has(clean);
}

// Multi-word phrases priority list (longest matches first)
export const MULTI_WORD_PHRASES: string[] = [
  "acoustic water sensors",
  "perimeter ice ridges",
  "field research team",
  "satellite radar confirmed",
  "sub-ice bedrock temperature",
  "supraglacial lake",
  "ice core sampling",
  "vertical fracture",
  "seismic sensor",
  "satellite radar",
  "geothermal heat",
  "shock wave",
  "continuous drainage",
  "horizontal collapse",
  "surface streams",
  "water temperature",
  "volcanic warming",
  "mechanical pressure",
  "rapid drop",
  "lake basin",
  "micro-fractures",
  "solid ice",
  "southern shore",
  "water level",
  "cubic meters",
  "pressure sensors",
  "ice sheet",
  "rolled in",
  "walked back",
  "straight down",
  "dome upward",
  "woke us"
];

// Rich Contextual Dictionary for Case 001 Scientific Expedition & Climate Anomaly
export const CONTEXTUAL_DICTIONARY: Record<string, VocabularyTerm> = {
  "perimeter ice ridges": {
    term: "perimeter ice ridges",
    pronunciation: "/pəˈrɪmɪtər aɪs ˈrɪdʒɪz/",
    pos: "noun phrase",
    meaning_en: "the elevated outer border of ice surrounding a glacial basin",
    meaning_vi: "các gờ băng xung quanh hồ",
    context_note: "Gờ băng viền quanh hồ G-4 vẫn nguyên vẹn, chứng minh nước không hề tràn qua bề mặt.",
  },
  "horizontal collapse": {
    term: "horizontal collapse",
    pronunciation: "/ˌhɒrɪˈzɒntəl kəˈlæps/",
    pos: "noun phrase",
    meaning_en: "sideways structural breakdown of a boundary wall or ice ridge",
    meaning_vi: "sự sụp đổ theo chiều ngang",
    context_note: "Không có dấu hiệu sụp vách ngang nào xung quanh lòng hồ.",
  },
  "supraglacial lake": {
    term: "supraglacial lake",
    pronunciation: "/ˌsuːprəˈɡleɪʃəl leɪk/",
    pos: "noun phrase",
    meaning_en: "a body of liquid water on top of a glacier or ice sheet formed by melting",
    meaning_vi: "hồ nước trên mặt băng tầng",
    context_note: "Hồ G-4 chứa 8 triệu m³ nước băng tan trước khi bất ngờ biến mất.",
  },
  "ice sheet": {
    term: "ice sheet",
    pronunciation: "/ˈaɪs ʃiːt/",
    pos: "noun phrase",
    meaning_en: "a massive layer of ice covering an extensive tract of land (Greenland / Antarctica)",
    meaning_vi: "tầng băng vĩnh cửu / dải băng",
    context_note: "Dải băng Greenland có độ dày 850m tại khu vực trạm Summit Alpha-4.",
  },
  "meltwater": {
    term: "meltwater",
    pronunciation: "/ˈmɛltˌwɔːtər/",
    pos: "noun",
    meaning_en: "water formed by the melting of snow and glacier ice",
    meaning_vi: "nước băng tan",
    context_note: "8 triệu m³ nước băng tan thoát thẳng xuống đáy trong 90 phút.",
  },
  "crevasse": {
    term: "crevasse",
    pronunciation: "/krɪˈvæs/",
    pos: "noun",
    meaning_en: "a deep open crack or fracture in a glacier or ice sheet",
    meaning_vi: "khe nứt băng sâu thẳng đứng",
    context_note: "Khe nứt sâu 850m xuyên thủng toàn bộ tầng băng tới lớp đá đáy.",
  },
  "vertical fracture": {
    term: "vertical fracture",
    pronunciation: "/ˈvɜːtɪkəl ˈfræktʃər/",
    pos: "noun phrase",
    meaning_en: "a perpendicular structural break or crack in rock or ice",
    meaning_vi: "vết nứt gãy thẳng đứng",
    context_note: "Vết nứt rộng 1.2m mở toang lúc 03:12 AM.",
  },
  "rapid drop": {
    term: "rapid drop",
    pronunciation: "/ˈræpɪd drɒp/",
    pos: "noun phrase",
    meaning_en: "a very fast decrease in water level or quantity",
    meaning_vi: "sự sụt giảm nhanh chóng",
    context_note: "Mực nước hồ giảm đột ngột từ 03:15 AM.",
  },
  "reached": {
    term: "reached",
    pronunciation: "/riːtʃt/",
    pos: "verb (past)",
    meaning_en: "arrived at a destination or location",
    meaning_vi: "đến nơi / tiếp cận hiện trường",
    context_note: "Đội nghiên cứu tiếp cận lòng hồ lúc 05:30 AM.",
  },
  "reach": {
    term: "reach",
    pronunciation: "/riːtʃ/",
    pos: "verb",
    meaning_en: "to arrive at a place",
    meaning_vi: "đến nơi / tiếp cận",
    context_note: "Tiếp cận khu vực nghiên cứu.",
  },
  "seismic sensor": {
    term: "seismic sensor",
    pronunciation: "/ˈsaɪzmɪk ˈsɛnsər/",
    pos: "noun phrase",
    meaning_en: "an instrument that detects ground vibrations, tremors, or micro-cracks",
    meaning_vi: "cảm biến địa chấn / rung chấn ngầm",
    context_note: "Cảm biến B-02 ghi nhận vết rạn nứt vi mô lúc 01:45 AM và sóng xung kích lúc 03:12 AM.",
  },
  "satellite radar": {
    term: "satellite radar",
    pronunciation: "/ˈsætəlaɪt ˈreɪdɑːr/",
    pos: "noun phrase",
    meaning_en: "spaceborne microwave radar used to measure ice surface elevation and changes",
    meaning_vi: "ra-đa vệ tinh viễn thám",
    context_note: "Vệ tinh ghi nhận mặt hồ nhô cao 18cm lúc 02:15 AM do áp lực nước bên dưới.",
  },
  "acoustic water sensors": {
    term: "acoustic water sensors",
    pronunciation: "/əˈkuːstɪk ˈwɔːtər ˈsɛnsəz/",
    pos: "noun phrase",
    meaning_en: "underwater sonic devices that monitor water depth and pressure changes",
    meaning_vi: "cảm biến âm học đo mực nước",
    context_note: "Thiết bị ghi nhận mực nước tụt dốc nhanh chóng từ 03:15 AM.",
  },
  "ice core sampling": {
    term: "ice core sampling",
    pronunciation: "/ˈaɪs kɔːr ˈsɑːmplɪŋ/",
    pos: "noun phrase",
    meaning_en: "extracting cylinders of ice from glaciers to study past climate and temperature",
    meaning_vi: "lấy mẫu lõi băng nghiên cứu",
    context_note: "Đội nghiên cứu của Dr. Vance lấy mẫu lõi băng gần bờ hồ trước 01:30 AM.",
  },
  "geothermal heat": {
    term: "geothermal heat",
    pronunciation: "/ˌdʒiːəʊˈθɜːməl hiːt/",
    pos: "noun phrase",
    meaning_en: "thermal energy generated and stored inside the Earth's crust",
    meaning_vi: "nhiệt địa chất / nhiệt lòng đất",
    context_note: "Giả thuyết của Dr. Vance bị bác bỏ vì nhiệt độ đá đáy đo được chỉ là -1.8°C.",
  },
  "bedrock": {
    term: "bedrock",
    pronunciation: "/ˈbɛdrɒk/",
    pos: "noun",
    meaning_en: "solid rock underlying loose deposits such as soil, snow, or an ice sheet",
    meaning_vi: "lớp đá nền / tầng đá đáy băng",
    context_note: "Nước xả thẳng xuống lớp đá nền bên dưới 850m băng.",
  },
  "continuous drainage": {
    term: "continuous drainage",
    pronunciation: "/kənˈtɪnjuəs ˈdreɪnɪdʒ/",
    pos: "noun phrase",
    meaning_en: "unbroken, non-stop discharging of liquid",
    meaning_vi: "xả nước liên tục",
    context_note: "Lưu lượng thoát nước đạt 1,500 m³/giây.",
  },
  "drainage": {
    term: "drainage",
    pronunciation: "/ˈdreɪnɪdʒ/",
    pos: "noun",
    meaning_en: "the action or process of draining liquid away",
    meaning_vi: "sự xả nước / thoát nước",
    context_note: "Lưu lượng thoát nước đạt 1,500 m³/giây.",
  },
  "overflow": {
    term: "overflow",
    pronunciation: "/ˈəʊvəfləʊ/",
    pos: "noun / verb",
    meaning_en: "the flowing over of a liquid beyond its container boundaries",
    meaning_vi: "sự tràn bờ / nước tràn",
    context_note: "Gờ băng quanh hồ không hề có dấu hiệu tràn nước qua bề mặt.",
  },
  "field research team": {
    term: "field research team",
    pronunciation: "/fiːld rɪˈsɜːtʃ tiːm/",
    pos: "noun phrase",
    meaning_en: "a group of scientists working directly in outdoor field conditions",
    meaning_vi: "đội nghiên cứu thực địa",
    context_note: "Đội nghiên cứu đến kiểm tra lòng hồ lúc 05:30 AM.",
  },
  "lake basin": {
    term: "lake basin",
    pronunciation: "/leɪk ˈbeɪsən/",
    pos: "noun phrase",
    meaning_en: "the bowl-shaped depression holding lake water",
    meaning_vi: "lòng hồ băng / bồn trũng hồ",
    context_note: "Lòng hồ trũng rỗng nước hoàn toàn sau 90 phút.",
  },
  "surface streams": {
    term: "surface streams",
    pronunciation: "/ˈsɜːfɪs striːmz/",
    pos: "noun phrase",
    meaning_en: "water channels flowing on the glacier top",
    meaning_vi: "dòng chảy trên mặt băng",
    context_note: "Không có dòng chảy nào tràn ra bên ngoài.",
  },
  "water temperature": {
    term: "water temperature",
    pronunciation: "/ˈwɔːtər ˈtɛmprɪtʃər/",
    pos: "noun phrase",
    meaning_en: "the thermal measurement of water",
    meaning_vi: "nhiệt độ nước",
    context_note: "Nhiệt độ nước đo được là 0.4°C lúc 02:10 AM.",
  },
  "volcanic warming": {
    term: "volcanic warming",
    pronunciation: "/vɒlˈkænɪk ˈwɔːmɪŋ/",
    pos: "noun phrase",
    meaning_en: "heating caused by magma or subterranean volcanic activity",
    meaning_vi: "sự nóng lên do núi lửa",
    context_note: "Giả thuyết của Dr. Vance về sự nóng lên do núi lửa.",
  },
  "mechanical pressure": {
    term: "mechanical pressure",
    pronunciation: "/mɪˈkænɪkəl ˈprɛʃər/",
    pos: "noun phrase",
    meaning_en: "physical force exerted by the weight of water and ice stress",
    meaning_vi: "áp lực cơ học / áp suất vật lý",
    context_note: "Trọng lượng khổng lồ của 8 triệu m³ nước tạo áp lực ép mở khe nứt.",
  },
  "shock wave": {
    term: "shock wave",
    pronunciation: "/ˈʃɒk weɪv/",
    pos: "noun phrase",
    meaning_en: "a sharp, sudden wave of high pressure caused by an explosion or fracture",
    meaning_vi: "sóng xung kích",
    context_note: "Sóng xung kích thẳng đứng ghi nhận lúc 03:12 AM khi khe nứt chính mở toang.",
  },
  "micro-fractures": {
    term: "micro-fractures",
    pronunciation: "/ˈmaɪkrəʊ ˈfræktʃəz/",
    pos: "noun (plural)",
    meaning_en: "microscopic cracks inside solid material",
    meaning_vi: "vết rạn nứt vi mô",
    context_note: "Cảm biến B-02 phát hiện chùm vết nứt vi mô lúc 01:45 AM.",
  },
  "solid ice": {
    term: "solid ice",
    pronunciation: "/ˈsɒlɪd aɪs/",
    pos: "noun phrase",
    meaning_en: "dense, continuous frozen glacier mass",
    meaning_vi: "khối băng đặc",
    context_note: "Tầng băng nguyên khối dưới lòng hồ.",
  },
  "southern shore": {
    term: "southern shore",
    pronunciation: "/ˈsʌðən ʃɔːr/",
    pos: "noun phrase",
    meaning_en: "the south side perimeter edge of the lake",
    meaning_vi: "bờ phía nam của hồ",
    context_note: "Bờ hồ phía nam không có vết nứt nào trước đó.",
  },
  "water level": {
    term: "water level",
    pronunciation: "/ˈwɔːtər ˈlɛvəl/",
    pos: "noun phrase",
    meaning_en: "the height of the surface of water",
    meaning_vi: "mực nước",
    context_note: "Mực nước hồ giảm tụt dốc.",
  },
  "cubic meters": {
    term: "cubic meters",
    pronunciation: "/ˈkjuːbɪk ˈmiːtəz/",
    pos: "noun phrase",
    meaning_en: "unit of volume equal to a cube one meter on each side",
    meaning_vi: "mét khối (m³)",
    context_note: "8,000,000 mét khối nước.",
  },
  "pressure sensors": {
    term: "pressure sensors",
    pronunciation: "/ˈprɛʃər ˈsɛnsəz/",
    pos: "noun phrase",
    meaning_en: "instruments that measure physical force per unit area",
    meaning_vi: "cảm biến áp suất",
    context_note: "Cảm biến áp suất ghi nhận sóng xung kích lúc 03:12 AM.",
  },
  "dome upward": {
    term: "dome upward",
    pronunciation: "/dəʊm ˈʌpwəd/",
    pos: "verb phrase",
    meaning_en: "to curve or swell upward in the shape of a dome",
    meaning_vi: "phồng nhô lên trên",
    context_note: "Mặt hồ nhô cao 18cm lúc 02:15 AM do áp lực nước bên dưới dâng cao.",
  },
  "straight down": {
    term: "straight down",
    pronunciation: "/streɪt daʊn/",
    pos: "adverb phrase",
    meaning_en: "in a direct perpendicular downward path",
    meaning_vi: "đâm thẳng xuống đáy",
    context_note: "Khe nứt đâm thẳng 850m xuống lớp đá đáy.",
  },
  "perimeter": {
    term: "perimeter",
    pronunciation: "/pəˈrɪmɪtər/",
    pos: "noun",
    meaning_en: "the continuous line forming the boundary of a closed geometric figure",
    meaning_vi: "chu vi / viền xung quanh",
    context_note: "Gờ băng bao quanh hồ nguyên vẹn.",
  },
  "ridges": {
    term: "ridges",
    pronunciation: "/ˈrɪdʒɪz/",
    pos: "noun (plural)",
    meaning_en: "long narrow elevated crests of ice",
    meaning_vi: "các gờ băng / rặng băng",
    context_note: "Các gờ băng viền quanh hồ.",
  },
  "ridge": {
    term: "ridge",
    pronunciation: "/rɪdʒ/",
    pos: "noun",
    meaning_en: "a long narrow crest or edge",
    meaning_vi: "gờ băng",
    context_note: "Gờ băng bao quanh hồ.",
  },
  "horizontal": {
    term: "horizontal",
    pronunciation: "/ˌhɒrɪˈzɒntəl/",
    pos: "adjective",
    meaning_en: "parallel to the plane of the horizon; at right angles to the vertical",
    meaning_vi: "theo chiều ngang",
    context_note: "Không có sự sụp đổ hay nứt gãy theo chiều ngang.",
  },
  "collapse": {
    term: "collapse",
    pronunciation: "/kəˈlæps/",
    pos: "noun / verb",
    meaning_en: "sudden falling down or giving way",
    meaning_vi: "sự sụp đổ",
    context_note: "Không có hiện tượng sụp vách hồ.",
  },
  "vertical": {
    term: "vertical",
    pronunciation: "/ˈvɜːtɪkəl/",
    pos: "adjective",
    meaning_en: "at right angles to a horizontal plane; straight up and down",
    meaning_vi: "thẳng đứng",
    context_note: "Vết nứt thẳng đứng xuyên suốt 850m băng.",
  },
  "fracture": {
    term: "fracture",
    pronunciation: "/ˈfræktʃər/",
    pos: "noun / verb",
    meaning_en: "the cracking or breaking of a hard object or material",
    meaning_vi: "vết nứt gãy",
    context_note: "Vết nứt rộng 1.2m.",
  },
  "disappeared": {
    term: "disappeared",
    pronunciation: "/ˌdɪsəˈpɪəd/",
    pos: "verb (past)",
    meaning_en: "ceased to be visible or present; vanished completely",
    meaning_vi: "biến mất hoàn toàn",
    context_note: "8 triệu m³ nước biến mất trong chưa đầy 90 phút.",
  },
  "recorded": {
    term: "recorded",
    pronunciation: "/rɪˈkɔːdɪd/",
    pos: "verb (past)",
    meaning_en: "logged or registered electronically",
    meaning_vi: "đã ghi nhận",
    context_note: "Cảm biến ghi nhận mực nước tụt giảm.",
  },
  "acoustic": {
    term: "acoustic",
    pronunciation: "/əˈkuːstɪk/",
    pos: "adjective",
    meaning_en: "relating to sound or the sense of hearing",
    meaning_vi: "âm học / thủy âm",
    context_note: "Cảm biến âm thanh đo độ sâu nước.",
  },
  "sensors": {
    term: "sensors",
    pronunciation: "/ˈsɛnsəz/",
    pos: "noun (plural)",
    meaning_en: "devices that detect and respond to physical input",
    meaning_vi: "các cảm biến",
    context_note: "Hệ thống cảm biến của trạm Summit Alpha-4.",
  },
  "sensor": {
    term: "sensor",
    pronunciation: "/ˈsɛnsər/",
    pos: "noun",
    meaning_en: "a device that detects physical input",
    meaning_vi: "cảm biến",
    context_note: "Cảm biến địa chấn B-02.",
  },
  "rapid": {
    term: "rapid",
    pronunciation: "/ˈræpɪd/",
    pos: "adjective",
    meaning_en: "happening in a short time or at a fast pace",
    meaning_vi: "nhanh chóng / đột ngột",
    context_note: "Tốc độ rút nước nhanh chóng.",
  },
  "drop": {
    term: "drop",
    pronunciation: "/drɒp/",
    pos: "noun / verb",
    meaning_en: "a fall in amount, quality, or rate",
    meaning_vi: "sự sụt giảm",
    context_note: "Mực nước sụt giảm nhanh.",
  },
  "surface": {
    term: "surface",
    pronunciation: "/ˈsɜːfɪs/",
    pos: "noun",
    meaning_en: "the outside part or outermost layer of something",
    meaning_vi: "bề mặt băng",
    context_note: "Nước biến mất hoàn toàn khỏi bề mặt.",
  },
  "basin": {
    term: "basin",
    pronunciation: "/ˈbeɪsən/",
    pos: "noun",
    meaning_en: "a wide, open container or depression in the earth",
    meaning_vi: "lòng hồ / bồn trũng",
    context_note: "Lòng hồ trũng rỗng cạn.",
  },
  "empty": {
    term: "empty",
    pronunciation: "/ˈɛmpti/",
    pos: "adjective",
    meaning_en: "containing nothing; not filled or occupied",
    meaning_vi: "trống rỗng / cạn khô",
    context_note: "Lòng chảo băng cạn khô nước.",
  },
  "streams": {
    term: "streams",
    pronunciation: "/striːmz/",
    pos: "noun (plural)",
    meaning_en: "small, narrow rivers or flows of liquid",
    meaning_vi: "dòng suối / dòng chảy",
    context_note: "Không có dòng chảy nào tràn ra bên ngoài.",
  },
  "flowing": {
    term: "flowing",
    pronunciation: "/ˈfləʊɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "moving along in a steady, continuous stream",
    meaning_vi: "chảy ra",
    context_note: "Không có dòng nước nào chảy tràn.",
  },
  "showed": {
    term: "showed",
    pronunciation: "/ʃəʊd/",
    pos: "verb (past)",
    meaning_en: "demonstrated or revealed",
    meaning_vi: "cho thấy / thể hiện",
    context_note: "Cho thấy không có dấu hiệu tràn bờ.",
  },
  "measuring": {
    term: "measuring",
    pronunciation: "/ˈmɛʒərɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "having the dimensions of",
    meaning_vi: "đo được / có kích thước",
    context_note: "Đo được bề rộng 1.2m.",
  },
  "extends": {
    term: "extends",
    pronunciation: "/ɪkˈstɛndz/",
    pos: "verb",
    meaning_en: "reaches or stretches to a certain point",
    meaning_vi: "đâm sâu / kéo dài",
    context_note: "Kéo dài xuyên qua 850m tầng băng.",
  },
  "drained": {
    term: "drained",
    pronunciation: "/dreɪnd/",
    pos: "verb (past)",
    meaning_en: "flowed away; emptied of liquid",
    meaning_vi: "đã thoát nước / xả cạn",
    context_note: "Nước xả thẳng xuống lớp đá đáy.",
  },
  "sampling": {
    term: "sampling",
    pronunciation: "/ˈsɑːmplɪŋ/",
    pos: "noun",
    meaning_en: "the taking of specimens for testing",
    meaning_vi: "lấy mẫu thử nghiệm",
    context_note: "Lấy mẫu lõi băng gần bờ hồ.",
  },
  "calm": {
    term: "calm",
    pronunciation: "/kɑːm/",
    pos: "adjective",
    meaning_en: "not showing or feeling nervousness, anger, or strong emotion; not windy",
    meaning_vi: "yên ả / phẳng lặng",
    context_note: "Mặt nước hồ phẳng lặng lúc 01:30 AM.",
  },
  "cracks": {
    term: "cracks",
    pronunciation: "/kræks/",
    pos: "noun (plural)",
    meaning_en: "lines on the surface of something along which it has split",
    meaning_vi: "các vết rạn nứt",
    context_note: "Không có vết rạn nứt nào nhìn thấy được trên bờ nam.",
  },
  "temperature": {
    term: "temperature",
    pronunciation: "/ˈtɛmprɪtʃər/",
    pos: "noun",
    meaning_en: "the degree or intensity of heat present in a substance or object",
    meaning_vi: "nhiệt độ",
    context_note: "Nhiệt độ đá đáy cố định ở mức -1.8°C.",
  },
  "geothermal": {
    term: "geothermal",
    pronunciation: "/ˌdʒiːəʊˈθɜːməl/",
    pos: "adjective",
    meaning_en: "relating to or produced by the internal heat of the earth",
    meaning_vi: "địa nhiệt / nhiệt lòng đất",
    context_note: "Giả thuyết nhiệt địa nhiệt.",
  },
  "volcanic": {
    term: "volcanic",
    pronunciation: "/vɒlˈkænɪk/",
    pos: "adjective",
    meaning_en: "relating to or produced by a volcano or volcanoes",
    meaning_vi: "núi lửa",
    context_note: "Giả thuyết hoạt động núi lửa ngầm.",
  },
  "mechanical": {
    term: "mechanical",
    pronunciation: "/mɪˈkænɪkəl/",
    pos: "adjective",
    meaning_en: "relating to physical forces and motion",
    meaning_vi: "cơ học / lực vật lý",
    context_note: "Áp lực cơ học từ trọng lượng khối nước.",
  },
  "pressure": {
    term: "pressure",
    pronunciation: "/ˈprɛʃər/",
    pos: "noun",
    meaning_en: "continuous physical force exerted on or against an object",
    meaning_vi: "áp lực / áp suất",
    context_note: "Áp lực nước gia tăng làm mở khe nứt.",
  },
  "seismic": {
    term: "seismic",
    pronunciation: "/ˈsaɪzmɪk/",
    pos: "adjective",
    meaning_en: "relating to earthquakes or other vibrations of the earth and its crust",
    meaning_vi: "địa chấn / rung chấn ngầm",
    context_note: "Dữ liệu vi địa chấn của cảm biến B-02.",
  },
  "satellite": {
    term: "satellite",
    pronunciation: "/ˈsætəlaɪt/",
    pos: "noun",
    meaning_en: "an artificial body placed in orbit around the earth",
    meaning_vi: "vệ tinh",
    context_note: "Vệ tinh viễn thám ESA.",
  },
  "radar": {
    term: "radar",
    pronunciation: "/ˈreɪdɑːr/",
    pos: "noun",
    meaning_en: "a system for detecting the presence, direction, and elevation of objects",
    meaning_vi: "ra-đa",
    context_note: "Ra-đa vệ tinh đo cao độ bề mặt.",
  },
  "continuous": {
    term: "continuous",
    pronunciation: "/kənˈtɪnjuəs/",
    pos: "adjective",
    meaning_en: "forming an unbroken whole; without interruption",
    meaning_vi: "liên tục",
    context_note: "Tốc độ xả nước liên tục 1,500 m³/giây.",
  },
  "constant": {
    term: "constant",
    pronunciation: "/ˈkɒnstənt/",
    pos: "adjective",
    meaning_en: "occurring continuously over a period of time; remaining unchanging",
    meaning_vi: "cố định / không đổi",
    context_note: "Nhiệt độ đá đáy giữ nguyên -1.8°C.",
  },
};

/**
 * Smart lookup function: tries exact phrase with spaces, then normalized, then stem/lemma match.
 */
export function lookupWord(rawWord: string): VocabularyTerm | null {
  if (!rawWord) return null;
  const clean = rawWord.trim().toLowerCase();

  // 1. Direct match with exact phrase
  if (CONTEXTUAL_DICTIONARY[clean]) {
    return CONTEXTUAL_DICTIONARY[clean];
  }

  // 2. Match with punctuation stripped but SPACES PRESERVED
  const normalized = clean.replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  if (CONTEXTUAL_DICTIONARY[normalized]) {
    return CONTEXTUAL_DICTIONARY[normalized];
  }

  // 3. Single-word stripped match
  const singleWord = clean.replace(/[^a-z0-9-]/g, "").trim();
  if (CONTEXTUAL_DICTIONARY[singleWord]) {
    return CONTEXTUAL_DICTIONARY[singleWord];
  }

  // 4. Lemmatization fallbacks (plural -s/es, past tense -ed, progressive -ing)
  const candidates: string[] = [];
  if (singleWord.endsWith("ies")) candidates.push(singleWord.slice(0, -3) + "y");
  if (singleWord.endsWith("es")) candidates.push(singleWord.slice(0, -2));
  if (singleWord.endsWith("s")) candidates.push(singleWord.slice(0, -1));
  if (singleWord.endsWith("ed")) {
    candidates.push(singleWord.slice(0, -2));
    candidates.push(singleWord.slice(0, -1));
  }
  if (singleWord.endsWith("ing")) {
    candidates.push(singleWord.slice(0, -3));
    candidates.push(singleWord.slice(0, -3) + "e");
  }

  for (const cand of candidates) {
    if (CONTEXTUAL_DICTIONARY[cand]) {
      const base = CONTEXTUAL_DICTIONARY[cand];
      return {
        ...base,
        term: rawWord.trim(),
        context_note: base.context_note || ""
      };
    }
  }

  return null;
}
