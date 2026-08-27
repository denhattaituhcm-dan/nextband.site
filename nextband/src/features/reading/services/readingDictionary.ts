import { VocabularyTerm } from "../types";
import { determineExplanationDepth } from "./semanticValidator";
import { humanizeVocabularyTerm } from "./humanizationEngine";

// Standard English function words / stop words to exclude from click-to-lookup
export const FUNCTION_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "almost", "already",
  "also", "although", "always", "am", "among", "an", "and", "another", "any", "are",
  "aren't", "around", "as", "at", "away", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "can", "can't", "cannot", "could", "couldn't",
  "d", "did", "didn't", "do", "does", "doesn't", "doing", "don", "don't", "down", "during",
  "each", "either", "else", "even", "every", "few", "for", "from", "further", "had",
  "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's",
  "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's",
  "however", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't",
  "it", "it's", "its", "itself", "let's", "ll", "m", "many", "me", "more", "most",
  "mustn't", "my", "myself", "neither", "no", "nor", "not", "of", "off", "on", "once",
  "ones", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over",
  "own", "per", "pm", "re", "s", "same", "shan't", "she", "she'd", "she'll", "she's",
  "should", "shouldn't", "since", "so", "some", "such", "t", "than", "that", "that's",
  "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these",
  "they", "they'd", "they'll", "they're", "they've", "this", "those", "though",
  "through", "to", "too", "under", "until", "up", "us", "ve", "very", "via", "vs",
  "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't",
  "what", "what's", "when", "when's", "where", "where's", "which", "while", "who",
  "who's", "whom", "why", "why's", "will", "with", "without", "won", "won't",
  "would", "wouldn't", "yet", "you", "you'd", "you'll", "you're", "you've", "your",
  "yours", "yourself", "yourselves"
]);

export function isContentWord(word: string): boolean {
  const clean = word.toLowerCase().replace(/[^a-z0-9-]/g, "").trim();
  if (!clean || clean.length < 2) return false;
  if (/^\d+$/.test(clean)) return false;
  return !FUNCTION_WORDS.has(clean);
}

// Multi-word phrases priority list (longest matches first)
export const MULTI_WORD_PHRASES: string[] = [
  "strategic business skill",
  "competitive advantage",
  "force multiplier",
  "active listening",
  "generative ai",
  "performance reviews",
  "sales pitch",
  "marketing copy",
  "business plans",
  "software code",
  "compounds over time",
  "dale carnegie",
  "acoustic water sensors",
  "perimeter ice ridges",
  "field research team",
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
  "meters": {
    term: "meters",
    pronunciation: "/ˈmiːtəz/",
    pos: "noun (plural)",
    meaning_en: "metric units of length equal to 100 centimeters",
    meaning_vi: "mét (đơn vị đo độ dài)",
    context_note: "Độ sâu 200m bên dưới hồ và 850m chiều dày tầng băng.",
  },
  "meter": {
    term: "meter",
    pronunciation: "/ˈmiːtər/",
    pos: "noun",
    meaning_en: "metric unit of length",
    meaning_vi: "mét",
    context_note: "Đơn vị đo độ dài.",
  },
  "centimeters": {
    term: "centimeters",
    pronunciation: "/ˈsɛntɪˌmiːtəz/",
    pos: "noun (plural)",
    meaning_en: "units of length equal to one hundredth of a meter",
    meaning_vi: "xen-ti-mét (cm)",
    context_note: "Mặt hồ bị đội nhô lên 18cm.",
  },
  "centimeter": {
    term: "centimeter",
    pronunciation: "/ˈsɛntɪˌmiːtər/",
    pos: "noun",
    meaning_en: "unit of length equal to 1/100 meter",
    meaning_vi: "xen-ti-mét",
    context_note: "Đơn vị đo độ dài.",
  },
  "began": {
    term: "began",
    pronunciation: "/bɪˈɡæn/",
    pos: "verb (past of begin)",
    meaning_en: "started doing something or occurring",
    meaning_vi: "đã bắt đầu",
    context_note: "Mặt hồ bắt đầu nhô cao lúc 02:15 AM.",
  },
  "begin": {
    term: "begin",
    pronunciation: "/bɪˈɡɪn/",
    pos: "verb",
    meaning_en: "to start doing something",
    meaning_vi: "bắt đầu",
    context_note: "Bắt đầu diễn ra.",
  },
  "rising": {
    term: "rising",
    pronunciation: "/ˈraɪzɪŋ/",
    pos: "adjective / verb (-ing)",
    meaning_en: "increasing in height, level, or pressure",
    meaning_vi: "đang gia tăng / dâng cao",
    context_note: "Áp lực nước dâng cao dưới đáy hồ.",
  },
  "rise": {
    term: "rise",
    pronunciation: "/raɪz/",
    pos: "verb",
    meaning_en: "to increase or move upward",
    meaning_vi: "tăng lên / dâng cao",
    context_note: "Gia tăng áp lực.",
  },
  "center": {
    term: "center",
    pronunciation: "/ˈsɛntər/",
    pos: "noun",
    meaning_en: "the middle point or part of something",
    meaning_vi: "trung tâm / điểm chính giữa",
    context_note: "Điểm chính giữa đáy hồ nơi xuất hiện vết nứt.",
  },
  "below": {
    term: "below",
    pronunciation: "/bɪˈləʊ/",
    pos: "preposition / adverb",
    meaning_en: "at a lower level or layer than",
    meaning_vi: "ở bên dưới",
    context_note: "200m bên dưới khối băng đặc.",
  },
  "indicating": {
    term: "indicating",
    pronunciation: "/ˈɪndɪkeɪtɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "pointing out, showing, or serving as a sign of",
    meaning_vi: "biểu thị / chứng tỏ",
    context_note: "Sóng xung kích chứng tỏ vết nứt lớn đã mở toang.",
  },
  "indicate": {
    term: "indicate",
    pronunciation: "/ˈɪndɪkeɪt/",
    pos: "verb",
    meaning_en: "to point out or show",
    meaning_vi: "chỉ ra / chứng tỏ",
    context_note: "Chứng minh sự kiện diễn ra.",
  },
  "opened": {
    term: "opened",
    pronunciation: "/ˈəʊpənd/",
    pos: "verb (past)",
    meaning_en: "became unclosed or separated",
    meaning_vi: "đã mở ra / toác ra",
    context_note: "Vết nứt chính mở toác tức thì lúc 03:12 AM.",
  },
  "open": {
    term: "open",
    pronunciation: "/ˈəʊpən/",
    pos: "verb",
    meaning_en: "to unclose",
    meaning_vi: "mở ra",
    context_note: "Mở ra vết nứt.",
  },
  "instantly": {
    term: "instantly",
    pronunciation: "/ˈɪnstəntli/",
    pos: "adverb",
    meaning_en: "at once; immediately with zero delay",
    meaning_vi: "ngay lập tức / tức thì",
    context_note: "Vết nứt mở ra tức thì trong nháy mắt.",
  },
  "rate": {
    term: "rate",
    pronunciation: "/reɪt/",
    pos: "noun",
    meaning_en: "a measure or speed of flow over time",
    meaning_vi: "tốc độ / lưu lượng xả",
    context_note: "Lưu lượng thoát nước đạt 1,500 m³/giây.",
  },
  "second": {
    term: "second",
    pronunciation: "/ˈsɛkənd/",
    pos: "noun",
    meaning_en: "a 60th of a minute of time",
    meaning_vi: "giây (đơn vị thời gian)",
    context_note: "Lưu lượng đo trên mỗi giây.",
  },
  "sub-ice": {
    term: "sub-ice",
    pronunciation: "/sʌb aɪs/",
    pos: "adjective",
    meaning_en: "located beneath or under glacial ice",
    meaning_vi: "dưới đáy băng / ngầm dưới lớp băng",
    context_note: "Lớp đá nền nằm ngầm dưới 850m băng.",
  },
  "remained": {
    term: "remained",
    pronunciation: "/rɪˈmeɪnd/",
    pos: "verb (past)",
    meaning_en: "stayed in the same condition without changing",
    meaning_vi: "vẫn duy trì / giữ nguyên",
    context_note: "Nhiệt độ đáy đá vẫn duy trì cố định ở mức -1.8°C.",
  },
  "remain": {
    term: "remain",
    pronunciation: "/rɪˈmeɪn/",
    pos: "verb",
    meaning_en: "to stay unchanged",
    meaning_vi: "duy trì / giữ nguyên",
    context_note: "Duy trì trạng thái.",
  },
  "cluster": {
    term: "cluster",
    pronunciation: "/ˈklʌstər/",
    pos: "noun",
    meaning_en: "a group of similar items occurring closely together",
    meaning_vi: "chuỗi / cụm vết nứt",
    context_note: "Cụm vết rạn nứt vi mô dưới đáy hồ 200m.",
  },
  "confirmed": {
    term: "confirmed",
    pronunciation: "/kənˈfɜːmd/",
    pos: "verb (past)",
    meaning_en: "verified the truth or accuracy of something",
    meaning_vi: "đã xác nhận",
    context_note: "Vệ tinh xác nhận mặt hồ phồng lên 18cm.",
  },
  "confirm": {
    term: "confirm",
    pronunciation: "/kənˈfɜːm/",
    pos: "verb",
    meaning_en: "to verify",
    meaning_vi: "xác nhận",
    context_note: "Xác thực.",
  },
  "found": {
    term: "found",
    pronunciation: "/faʊnd/",
    pos: "verb (past of find)",
    meaning_en: "discovered or located",
    meaning_vi: "đã phát hiện / tìm thấy",
    context_note: "Đội nghiên cứu phát hiện bồn trũng cạn khô lúc 05:30 AM.",
  },
  "find": {
    term: "find",
    pronunciation: "/faɪnd/",
    pos: "verb",
    meaning_en: "to discover",
    meaning_vi: "phát hiện",
    context_note: "Tìm thấy.",
  },
  "deep": {
    term: "deep",
    pronunciation: "/diːp/",
    pos: "adjective",
    meaning_en: "extending far down from the top or surface",
    meaning_vi: "sâu / hun hút",
    context_note: "Vết nứt sâu 850m xuyên thủng tầng băng.",
  },
  "disappear": {
    term: "disappear",
    pronunciation: "/ˌdɪsəˈpɪər/",
    pos: "verb",
    meaning_en: "to vanish",
    meaning_vi: "biến mất",
    context_note: "Biến mất.",
  },
  "completely": {
    term: "completely",
    pronunciation: "/kəmˈpliːtli/",
    pos: "adverb",
    meaning_en: "totally; in every way with nothing remaining",
    meaning_vi: "hoàn toàn",
    context_note: "Biến mất hoàn toàn không còn một giọt nước.",
  },
  "minutes": {
    term: "minutes",
    pronunciation: "/ˈmɪnɪts/",
    pos: "noun (plural)",
    meaning_en: "periods of time equal to 60 seconds",
    meaning_vi: "phút (thời gian)",
    context_note: "Toàn bộ nước rút cạn trong vòng 90 phút.",
  },
  "minute": {
    term: "minute",
    pronunciation: "/ˈmɪnɪt/",
    pos: "noun",
    meaning_en: "a unit of time equal to 60 seconds",
    meaning_vi: "phút",
    context_note: "Thời gian.",
  },
  "million": {
    term: "million",
    pronunciation: "/ˈmɪljən/",
    pos: "number / noun",
    meaning_en: "the number 1,000,000",
    meaning_vi: "triệu (1.000.000)",
    context_note: "8 triệu mét khối nước.",
  },
  "eight": {
    term: "eight",
    pronunciation: "/eɪt/",
    pos: "number",
    meaning_en: "the number 8",
    meaning_vi: "tám (8)",
    context_note: "8 triệu m³.",
  },
  "cubic": {
    term: "cubic",
    pronunciation: "/ˈkjuːbɪk/",
    pos: "adjective",
    meaning_en: "having three dimensions of volume",
    meaning_vi: "khối (thể tích)",
    context_note: "Mét khối.",
  },
  "less": {
    term: "less",
    pronunciation: "/lɛs/",
    pos: "adverb",
    meaning_en: "a smaller amount or duration",
    meaning_vi: "ít hơn / chưa đầy",
    context_note: "Chưa đầy 90 phút.",
  },
  "dry": {
    term: "dry",
    pronunciation: "/draɪ/",
    pos: "adjective",
    meaning_en: "free from moisture or liquid",
    meaning_vi: "khô cạn",
    context_note: "Lòng hồ khô cạn hoàn toàn.",
  },
  "team": {
    term: "team",
    pronunciation: "/tiːm/",
    pos: "noun",
    meaning_en: "a group of people working together",
    meaning_vi: "đội ngũ / đoàn nghiên cứu",
    context_note: "Đội ngũ nghiên cứu thực địa.",
  },
  "field": {
    term: "field",
    pronunciation: "/fiːld/",
    pos: "noun",
    meaning_en: "an area of outdoor practical scientific study",
    meaning_vi: "thực địa",
    context_note: "Nghiên cứu thực địa ngoài trời.",
  },
  "research": {
    term: "research",
    pronunciation: "/rɪˈsɜːtʃ/",
    pos: "noun / verb",
    meaning_en: "systematic investigation into sources and materials",
    meaning_vi: "nghiên cứu khoa học",
    context_note: "Dự án nghiên cứu dải băng Greenland.",
  },
  "southern": {
    term: "southern",
    pronunciation: "/ˈsʌðən/",
    pos: "adjective",
    meaning_en: "situated in or facing the south",
    meaning_vi: "phía nam",
    context_note: "Bờ phía nam của hồ.",
  },
  "zero": {
    term: "zero",
    pronunciation: "/ˈzɪərəʊ/",
    pos: "number",
    meaning_en: "no quantity or number at all",
    meaning_vi: "không có / số không",
    context_note: "Không có bất kỳ vết nứt nào nhìn thấy được.",
  },
  "inside": {
    term: "inside",
    pronunciation: "/ɪnˈsaɪd/",
    pos: "preposition / adverb",
    meaning_en: "within the interior of",
    meaning_vi: "bên trong",
    context_note: "Bên trong phòng thí nghiệm trạm Alpha-4.",
  },
  "station": {
    term: "station",
    pronunciation: "/ˈsteɪʃən/",
    pos: "noun",
    meaning_en: "a base for a specific research purpose",
    meaning_vi: "trạm nghiên cứu",
    context_note: "Trạm Summit Station Alpha-4.",
  },
  "main": {
    term: "main",
    pronunciation: "/meɪn/",
    pos: "adjective",
    meaning_en: "chief in size or importance",
    meaning_vi: "chính / then chốt",
    context_note: "Vết nứt chính xuyên qua tầng băng.",
  },
  "wave": {
    term: "wave",
    pronunciation: "/weɪv/",
    pos: "noun",
    meaning_en: "a disturbance that travels through space and matter",
    meaning_vi: "sóng / xung chấn",
    context_note: "Sóng xung kích thẳng đứng.",
  },
  "shock": {
    term: "shock",
    pronunciation: "/ʃɒk/",
    pos: "noun",
    meaning_en: "a sudden violent impact or disturbance",
    meaning_vi: "xung kích",
    context_note: "Sóng xung kích.",
  },
  "telemetry": {
    term: "telemetry",
    pronunciation: "/tɪˈlɛmɪtri/",
    pos: "noun",
    meaning_en: "the collection of measurements or data from remote sensors",
    meaning_vi: "dữ liệu đo đạc viễn thám",
    context_note: "Dữ liệu đo đạc viễn thám tự động của mạng lưới cảm biến Bắc Cực.",
  },
  "incident": {
    term: "incident",
    pronunciation: "/ˈɪnsɪdənt/",
    pos: "noun",
    meaning_en: "an event or occurrence, especially one that is unusual or significant",
    meaning_vi: "sự cố / hiện tượng bất thường",
    context_note: "Báo cáo sự cố hồ băng biến mất.",
  },
  "report": {
    term: "report",
    pronunciation: "/rɪˈpɔːt/",
    pos: "noun",
    meaning_en: "an official account or statement describing an event",
    meaning_vi: "báo cáo",
    context_note: "Báo cáo sự cố thực địa của trạm Summit Alpha-4.",
  },
  "expedition": {
    term: "expedition",
    pronunciation: "/ˌɛkspɪˈdɪʃən/",
    pos: "noun",
    meaning_en: "a journey undertaken by a group with a scientific purpose",
    meaning_vi: "chuyến thám hiểm / đoàn khảo sát",
    context_note: "Nhật ký đoàn thám hiểm khoa học của Dr. Vance.",
  },
  "journal": {
    term: "journal",
    pronunciation: "/ˈdʒɜːnəl/",
    pos: "noun",
    meaning_en: "a personal daily record of news and events",
    meaning_vi: "nhật ký thực địa",
    context_note: "Nhật ký thực địa của tiến sĩ Alistair Vance.",
  },
  "lead": {
    term: "lead",
    pronunciation: "/liːd/",
    pos: "adjective",
    meaning_en: "holding the principal position; chief",
    meaning_vi: "trưởng đoàn / phụ trách chính",
    context_note: "Nhà nghiên cứu sông băng phụ trách chính.",
  },
  "glaciologist": {
    term: "glaciologist",
    pronunciation: "/ˌɡleɪʃiˈɒlədʒɪst/",
    pos: "noun",
    meaning_en: "a scientist who studies glaciers and ice sheets",
    meaning_vi: "nhà nghiên cứu sông băng / chuyên gia băng tầng",
    context_note: "Chuyên gia địa chất băng tầng Dr. Alistair Vance.",
  },
  "survey": {
    term: "survey",
    pronunciation: "/ˈsɜːveɪ/",
    pos: "noun",
    meaning_en: "a comprehensive examination of a geographical area",
    meaning_vi: "khảo sát thực địa",
    context_note: "Dự án khảo sát dải băng Greenland.",
  },
  "network": {
    term: "network",
    pronunciation: "/ˈnɛtwɜːk/",
    pos: "noun",
    meaning_en: "an interconnected system of measuring stations",
    meaning_vi: "mạng lưới quan trắc",
    context_note: "Mạng lưới quan trắc tự động Bắc Cực.",
  },
  "walked": {
    term: "walked",
    pronunciation: "/wɔːkt/",
    pos: "verb (past)",
    meaning_en: "moved on foot",
    meaning_vi: "đã đi bộ",
    context_note: "Dr. Vance đi bộ về lại trạm.",
  },
  "walk": {
    term: "walk",
    pronunciation: "/wɔːk/",
    pos: "verb",
    meaning_en: "to move on foot",
    meaning_vi: "đi bộ",
    context_note: "Đi bộ.",
  },
  "back": {
    term: "back",
    pronunciation: "/bæk/",
    pos: "adverb",
    meaning_en: "returning to an earlier position",
    meaning_vi: "quay trở lại",
    context_note: "Quay về lại trạm nghiên cứu.",
  },
  "rolled": {
    term: "rolled",
    pronunciation: "/rəʊld/",
    pos: "verb (past)",
    meaning_en: "moved or arrived smoothly in waves",
    meaning_vi: "tràn đến / cuộn vào",
    context_note: "Sương mù tràn đến sau 01:30 AM.",
  },
  "roll": {
    term: "roll",
    pronunciation: "/rəʊl/",
    pos: "verb",
    meaning_en: "to move in waves",
    meaning_vi: "cuộn / tràn",
    context_note: "Tràn đến.",
  },
  "massive": {
    term: "massive",
    pronunciation: "/ˈmæsɪv/",
    pos: "adjective",
    meaning_en: "exceptionally large and powerful",
    meaning_vi: "khổng lồ / cực lớn",
    context_note: "Sóng xung kích cực lớn lúc 03:12 AM.",
  },
  "rather": {
    term: "rather",
    pronunciation: "/ˈrɑːðər/",
    pos: "adverb",
    meaning_en: "used to indicate a preference or contrast",
    meaning_vi: "thay vì / hơn là",
    context_note: "Thay vì áp lực cơ học bề mặt.",
  },

  // CASE 002: Warren Buffett & Fast Company Article Vocabulary
  "offered": {
    term: "offered",
    pronunciation: "/ˈɒfəd/",
    pos: "verb (past of offer)",
    meaning_en: "presented something to someone for acceptance or consideration",
    meaning_vi: "đưa ra / đề nghị / trao cơ hội",
    context_note: "Buffett chủ động đưa ra lời khuyên quý báu để sinh viên Stanford có thể tiếp nhận và suy ngẫm.",
    cognitive: {
      core_concept: "Một người chủ động đưa một thứ gì đó vào khả năng tiếp nhận/lựa chọn của người khác — thứ đó có thể là vật chất, sự giúp đỡ, lời khuyên, cơ hội, tiền bạc, công việc hoặc một hành động.",
      cognitive_frame: {
        actor: "Người chủ động (Warren Buffett)",
        recipient: "Người nghe (Sinh viên tốt nghiệp Stanford)",
        entity: "Lời khuyên kinh nghiệm sống (Advice)",
        direction: "Từ chủ thể ra phía trước người nhận",
        recipient_choice: "Người nhận hoàn toàn tự do tiếp nhận, suy ngẫm hoặc từ chối mà không bị ép buộc.",
        mental_scene: "Buffett có một lời khuyên → chủ động đặt lời khuyên đó trước người nghe → người nghe đón nhận và cân nhắc áp dụng.",
      },
      meaning_in_context: "Trong câu này, 'offered this advice' biểu thị việc chia sẻ lời khuyên chân thành mang tính định hướng cho thế hệ trẻ, không phải mệnh lệnh hay ép buộc.",
      transfer_contexts: [
        {
          domain_label: "Đời sống hàng ngày",
          sentence: "She offered me a cup of warm coffee when I arrived.",
          invariant_connection: "Cô ấy chủ động đưa cà phê vào khả năng tôi có thể nhận hoặc từ chối.",
        },
        {
          domain_label: "Công việc / Business",
          sentence: "The corporation offered her a senior managerial position.",
          invariant_connection: "Công ty chủ động đặt một cơ hội nghề nghiệp trước mặt ứng viên để họ cân nhắc.",
        },
        {
          domain_label: "Hành động sẵn sàng",
          sentence: "He offered to drive me home during the heavy rain.",
          invariant_connection: "Chủ động đưa sự sẵn sàng hành động của mình vào khả năng người khác có thể sử dụng (cấu trúc offer to do sth).",
        },
        {
          domain_label: "Học thuật / Formal",
          sentence: "The research findings offer a compelling explanation for glacial melt.",
          invariant_connection: "Kết quả nghiên cứu mở ra một cách giải thích để giới khoa học xem xét.",
        },
      ],
      contrast: "So với 'give' (tập trung vào việc thứ gì đó đã được chuyển giao hoàn tất), 'offer' nhấn mạnh vào việc chủ động đưa ra một khả năng/lựa chọn để đối phương tự do quyết định tiếp nhận.",
      boundaries: "Không thể dùng 'give to help' ❌ mà phải dùng 'offer to help' ✅ vì 'offer' có thể xây dựng ý niệm đưa một hành động vào cho người khác lựa chọn.",
      retrieval_rule: "Khi bạn muốn diễn tả việc chủ động đưa một vật, lời khuyên, cơ hội hoặc sự sẵn sàng giúp đỡ cho người khác tự do đón nhận hoặc từ chối → Hãy nghĩ đến 'OFFER'.",
    },
  },
  "offer": {
    term: "offer",
    pronunciation: "/ˈɒfər/",
    pos: "verb / noun",
    meaning_en: "to present something for someone to accept or reject",
    meaning_vi: "đưa ra / đề nghị / chào mời",
    context_note: "Chủ động đưa một thực thể vào khả năng tiếp nhận của người khác.",
    cognitive: {
      core_concept: "Chủ động làm cho một thứ (vật chất, cơ hội, lời khuyên, sự giúp đỡ) trở thành một lựa chọn/khả năng có thể được người khác tiếp nhận.",
      cognitive_frame: {
        actor: "Chủ thể đề xuất",
        recipient: "Người tiếp nhận",
        entity: "Cơ hội, vật chất hoặc lời khuyên",
        direction: "Chủ động đưa ra phía trước",
        recipient_choice: "Có toàn quyền chấp nhận hoặc từ chối",
        mental_scene: "Đặt một giá trị/lựa chọn vào tầm tay của người khác để họ quyết định.",
      },
      meaning_in_context: "Chủ động đưa ra đề xuất hoặc cơ hội.",
      transfer_contexts: [
        {
          domain_label: "Thương mại",
          sentence: "The store offers a 20% discount for first-time buyers.",
          invariant_connection: "Đưa ra mức ưu đãi để khách hàng tự do hưởng lợi.",
        },
        {
          domain_label: "Hợp tác",
          sentence: "They offered their assistance throughout the investigation.",
          invariant_connection: "Chủ động đưa sự hỗ trợ vào tầm sử dụng của đối tác.",
        },
      ],
      contrast: "'offer' khác 'provide': 'provide' tập trung vào việc cung cấp cái cần thiết; 'offer' tập trung vào tính chủ động đưa ra để đối phương cân nhắc.",
      boundaries: "Không nhầm lẫn 'offer sth to sb' và 'offer sb sth' — cả 2 đều chuẩn ngữ pháp.",
      retrieval_rule: "Khi xuất hiện tình huống: Chủ thể A có X → A chủ động đưa X ra cho B lựa chọn tiếp nhận → Chọn 'OFFER'.",
    },
  },
  "dispensing": {
    term: "dispensing",
    pronunciation: "/dɪˈspɛnsɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "distributing or providing advice from a position of authority/experience",
    meaning_vi: "chia sẻ / ban phát (lời khuyên kinh nghiệm)",
    context_note: "Warren Buffett dành nhiều thập kỷ chia sẻ những lời khuyên thông thái từ vị thế một bậc thầy đầu tư.",
    depth: "deep",
    humanized: {
      simple_intuition: "dispense là đưa một thứ ra cho người khác nhận hoặc sử dụng, thường từ một nguồn có sẵn và theo một cách khá có tổ chức.",
      in_context_story: "Buffett đang 'phân phát' những lời khuyên của mình. Ở đây 'nguồn' không phải một cái kho vật lý, mà là kiến thức và kho kinh nghiệm dày dặn của ông sau nhiều thập kỷ đúc kết được chia sẻ đều đặn cho người học.",
      real_world_transfers: [
        {
          domain_label: "Y tế",
          sentence: "The hospital pharmacy dispenses vital medication to patients.",
          connection_note: "dispense medication → cấp phát thuốc từ kho dược theo quy trình chuẩn.",
        },
        {
          domain_label: "Tư pháp",
          sentence: "Courts are responsible for dispensing equal justice under the law.",
          connection_note: "dispense justice → thực thi và phân xử công lý từ thẩm quyền của nhà nước.",
        },
        {
          domain_label: "Thiết bị tự động",
          sentence: "The vending machine dispenses hot tea within seconds.",
          connection_note: "dispense drinks → tự động nhả sản phẩm theo từng đơn vị được yêu cầu.",
        },
      ],
      nuance_warning: "Đừng hiểu nhầm dispense = give:\n• 'give' chỉ đơn giản là trao tay bình thường giữa bất kỳ ai.\n• 'dispense' thường gợi cảm giác có một nguồn hoặc thẩm quyền đưa thứ gì đó ra theo quy trình hoặc mang tính biểu tượng sâu sắc hơn.\n\nLưu ý thành ngữ: 'dispense with something' mang nghĩa 'bỏ qua / không cần dùng đến' (ví dụ: Let's dispense with formalities).",
      retrieval_tip: "Khi muốn diễn tả hành động cấp phát thuốc, thực thi công lý hoặc một chuyên gia chia sẻ kinh nghiệm từ nguồn kiến thức uy tín → Hãy nhớ tới 'DISPENSE'.",
    },
  },
  "dispense": {
    term: "dispense",
    pronunciation: "/dɪˈspɛns/",
    pos: "verb",
    meaning_en: "distribute or provide, or manage without",
    meaning_vi: "phân phát / đưa ra (lời khuyên, thuốc men)",
    context_note: "Phân phát hoặc đưa ra có tổ chức từ một nguồn sẵn có.",
    depth: "deep",
    humanized: {
      simple_intuition: "dispense là đưa một thứ ra cho người khác nhận hoặc sử dụng từ một nguồn có sẵn và theo cách có tổ chức.",
      in_context_story: "Trong văn cảnh lãnh đạo, dispense advice thể hiện việc đưa ra các lời khuyên từ nguồn kinh nghiệm đúc kết.",
      real_world_transfers: [
        {
          domain_label: "Đời sống & Công việc",
          sentence: "Experienced mentors regularly dispense practical career advice to junior colleagues.",
          connection_note: "Chia sẻ kinh nghiệm định hướng nghề nghiệp từ người đi trước.",
        },
      ],
      nuance_warning: "Phân biệt 'dispense' (cấp phát) và 'dispense with' (bãi bỏ/bỏ qua thứ gì).",
      retrieval_tip: "Dùng 'dispense' khi hành động đưa ra mang tính chuyên môn, thẩm quyền hoặc quy trình bài bản.",
    },
  },
  "force multiplier": {
    term: "force multiplier",
    pronunciation: "/fɔːs ˈmʌltɪplaɪər/",
    pos: "noun phrase",
    meaning_en: "a factor that dramatically increases the effectiveness of an effort or skill",
    meaning_vi: "đòn bẩy nhân đôi sức mạnh / hệ số nhân sức mạnh",
    context_note: "Kỹ năng giao tiếp là đòn bẩy khuếch đại mọi kết quả trong công việc và cuộc sống.",
    depth: "deep",
    humanized: {
      simple_intuition: "Một yếu tố, công cụ hoặc năng lực khi được kết hợp vào sẽ làm nhân gấp nhiều lần hiệu quả của toàn bộ hệ thống hoặc các năng lực khác, thay vì chỉ tăng theo phép cộng đơn thuần.",
      in_context_story: "Giao tiếp không chỉ là kỹ năng bổ trợ, mà là hệ số nhân giúp mọi ý tưởng kinh doanh hay mã nguồn phần mềm phát huy tối đa giá trị và tầm ảnh hưởng.",
      real_world_transfers: [
        {
          domain_label: "Quân sự & Chiến lược",
          sentence: "Night-vision technology acted as a force multiplier for the tactical team.",
          connection_note: "Công nghệ nhìn đêm nhân đôi hiệu quả tác chiến của cả đội.",
        },
        {
          domain_label: "Công nghệ & AI",
          sentence: "Automation is a force multiplier for modern software developers.",
          connection_note: "Tự động hóa giúp một kỹ sư làm việc với năng suất tương đương cả nhóm.",
        },
      ],
      nuance_warning: "'force multiplier' khác 'addition': Phép nhân (multiplier) tạo sự bùng nổ cấp số nhân (1 biến thành 10), trong khi addition chỉ là phép cộng tích lũy nhỏ lẻ.",
      retrieval_tip: "Khi muốn mô tả một đòn bẩy biến 1 thành 10, khuếch đại toàn bộ sức mạnh tổng thể → Dùng 'FORCE MULTIPLIER'.",
    },
  },
  "competitive advantage": {
    term: "competitive advantage",
    pronunciation: "/kəmˈpɛtɪtɪv ədˈvɑːntɪdʒ/",
    pos: "noun phrase",
    meaning_en: "a condition or circumstance that puts a person or company in a favorable business position",
    meaning_vi: "lợi thế cạnh tranh vượt trội",
    context_note: "Khả năng giao tiếp giữa người với người trở thành lợi thế cạnh tranh cốt lõi trong kỷ nguyên AI.",
    depth: "deep",
    humanized: {
      simple_intuition: "Lợi thế hoặc năng lực độc nhất giúp một cá nhân hoặc tổ chức tạo ra giá trị vượt trội và đứng ở vị trí ưu thế hơn so với đối thủ.",
      in_context_story: "Khi AI san bằng kỹ năng viết lách cơ bản, khả năng thấu cảm và tạo dựng niềm tin giữa người với người trở thành lợi thế cạnh tranh khó sao chép.",
      real_world_transfers: [
        {
          domain_label: "Kinh doanh chiến lược",
          sentence: "Proprietary battery technology gave the automaker a clear competitive advantage.",
          connection_note: "Nắm giữ công nghệ độc quyền giúp duy trì ưu thế thị phần dài hạn.",
        },
        {
          domain_label: "Sự nghiệp cá nhân",
          sentence: "Empathy and clear synthesis provide a decisive competitive advantage in executive roles.",
          connection_note: "Kỹ năng lãnh đạo con người tạo nên điểm khác biệt quyết định.",
        },
      ],
      nuance_warning: "'competitive advantage' khác 'temporary benefit': Lợi thế cạnh tranh mang tính bền vững dài hạn và khó bắt chước, không phải là ưu thế nhất thời.",
      retrieval_tip: "Khi muốn chỉ ra yếu tố độc nhất giúp vượt lên trên đối thủ trong một cuộc đua dài hạn → Dùng 'COMPETITIVE ADVANTAGE'.",
    },
  },
  "strategic business skill": {
    term: "strategic business skill",
    pronunciation: "/strəˈtiːdʒɪk ˈbɪznɪs skɪl/",
    pos: "noun phrase",
    meaning_en: "a high-level capability critical for commercial success and organizational leadership",
    meaning_vi: "kỹ năng kinh doanh mang tính chiến lược",
    context_note: "Giao tiếp đã chuyển hóa từ kỹ năng mềm thành kỹ năng kinh doanh chiến lược bắt buộc.",
  },
  "active listening": {
    term: "active listening",
    pronunciation: "/ˈæktɪv ˈlɪsənɪŋ/",
    pos: "noun phrase",
    meaning_en: "fully concentrating, understanding, responding, and remembering what is being said",
    meaning_vi: "lắng nghe chủ động / lắng nghe thấu cảm",
    context_note: "Lắng nghe để thấu hiểu chứ không phải chuẩn bị sẵn câu phản bác trong đầu.",
    cognitive: {
      core_concept: "Tiến trình giao tiếp mà người nghe chủ động dồn toàn bộ sự chú tâm vào người nói, kìm nén phản xạ chen ngang để giải mã trọn vẹn cả nội dung lẫn cảm xúc của đối phương trước khi phản hồi.",
      cognitive_frame: {
        actor: "Người nghe (Leader / Colleague)",
        recipient: "Người nói",
        mental_scene: "Tạm gác lại ý kiến cá nhân và các thiết bị gây xao nhãng → hoàn toàn hiện diện trong câu chuyện của người nói → phản ánh lại những gì đã hiểu.",
      },
      meaning_in_context: "Buffett và Schwantes nhấn mạnh rằng lãnh đạo xuất sắc lắng nghe để thấu hiểu căn nguyên vấn đề chứ không phải để vội vàng đáp trả.",
      transfer_contexts: [
        {
          domain_label: "Đàm phán & Ngoại giao",
          sentence: "Through active listening, the mediator identified the core fears of both parties.",
          invariant_connection: "Dồn tâm trí lắng nghe để tìm ra điểm nghẽn ẩn sâu bên dưới lời nói.",
        },
      ],
      contrast: "'active listening' khác 'passive hearing': 'Hearing' chỉ là tiếp nhận sóng âm thụ động của đôi tai; 'Active listening' là hành động chủ động của tư duy và sự thấu cảm.",
      retrieval_rule: "Khi nói về việc lắng nghe sâu sắc, có chủ đích và thấu cảm trọn vẹn → Dùng 'ACTIVE LISTENING'.",
    },
  },
  "compounds over time": {
    term: "compounds over time",
    pronunciation: "/kəmˈpaʊndz ˈəʊvər taɪm/",
    pos: "verb phrase",
    meaning_en: "accumulates exponential value progressively like compound interest",
    meaning_vi: "tích lũy sinh lãi kép theo thời gian",
    context_note: "Mỗi cuộc trò chuyện, thuyết trình hay phản hồi đều tích lũy uy tín sinh lãi kép theo năm tháng.",
    cognitive: {
      core_concept: "Sự tích lũy theo cấp số nhân trong đó giá trị tạo ra ở mỗi chu kỳ tiếp tục trở thành nền tảng sinh thêm giá trị mới ở chu kỳ kế tiếp, tạo ra kết quả khổng lồ sau thời gian dài.",
      cognitive_frame: {
        actor: "Hành động / Thói quen nhỏ hàng ngày",
        mental_scene: "Từng tương tác giao tiếp tốt như một khoản gửi tiết kiệm → sinh lãi uy tín → lãi mẹ đẻ lãi con sau nhiều năm.",
      },
      meaning_in_context: "Hiệu quả của việc học giao tiếp không dừng lại ở một sự kiện đơn lẻ mà nhân lên dần theo toàn bộ sự nghiệp.",
      transfer_contexts: [
        {
          domain_label: "Tài chính & Đầu tư",
          sentence: "Reinvesting dividends allows your wealth to compound over time.",
          invariant_connection: "Tái đầu tư lợi nhuận để sinh lãi cấp số nhân.",
        },
        {
          domain_label: "Học tập & Tri thức",
          sentence: "Reading 20 pages a day compounds over time into deep domain mastery.",
          invariant_connection: "Tri thức tích lũy hàng ngày tạo nên bước nhảy vọt chuyên môn.",
        },
      ],
      retrieval_rule: "Khi một hành động nhỏ tích lũy tạo ra sức mạnh tăng trưởng phi mã theo thời gian (lãi kép) → Dùng 'COMPOUND OVER TIME'.",
    },
  },
  "compounds": {
    term: "compounds",
    pronunciation: "/kəmˈpaʊndz/",
    pos: "verb (third person singular)",
    meaning_en: "increases exponentially over successive periods",
    meaning_vi: "sinh lãi kép / tích lũy cấp số nhân",
    context_note: "Sinh lãi kép tích lũy theo thời gian.",
  },
  "compound": {
    term: "compound",
    pronunciation: "/kəmˈpaʊnd/",
    pos: "verb / noun",
    meaning_en: "to make something progressively greater or combine into whole",
    meaning_vi: "sinh lãi kép / kết hợp tạo nên",
    context_note: "Tích lũy theo nguyên lý lãi kép.",
  },
  "magnified": {
    term: "magnified",
    pronunciation: "/ˈmæɡnɪfaɪd/",
    pos: "verb (past participle)",
    meaning_en: "made greater in size, importance, or impact",
    meaning_vi: "được nhân lên gấp bội / khuếch đại",
    context_note: "Thành tựu cuộc đời của bạn sẽ được nhân lên gấp bội nếu biết cách truyền đạt hiệu quả.",
    cognitive: {
      core_concept: "Làm cho một vật thể, năng lực hoặc thành quả vốn có trở nên lớn hơn, rõ ràng hơn và có tầm ảnh hưởng sâu rộng hơn gấp nhiều lần so với kích thước ban đầu.",
      cognitive_frame: {
        actor: "Năng lực giao tiếp (Lens / Amplifier)",
        recipient: "Thành quả cuộc sống (Results in life)",
        mental_scene: "Giống như đặt một thấu kính phóng đại lên một đốm sáng nhỏ → biến nó thành chùm sáng rực rỡ chiếu xa.",
      },
      meaning_in_context: "Buffett giải thích rằng nếu bạn có ý tưởng 10 điểm nhưng chỉ truyền đạt được 2 điểm thì kết quả bị teo nhỏ; nhưng nếu giao tiếp xuất sắc thì kết quả sẽ được nhân lên gấp bội.",
      transfer_contexts: [
        {
          domain_label: "Khoa học & Kính hiển vi",
          sentence: "The microscope magnified the ice bacteria 500 times.",
          invariant_connection: "Phóng to kích thước vật lý để quan sát rõ ràng.",
        },
        {
          domain_label: "Kinh tế & Rủi ro",
          sentence: "High inflation magnified the financial difficulties of small firms.",
          invariant_connection: "Làm cho mức độ nghiêm trọng của vấn đề tăng lên gấp bội.",
        },
      ],
      contrast: "'magnify' khác 'create': 'Magnify' không tự sinh ra cái mới từ hư vô, mà nó phóng đại và nhân rộng thứ vốn đã có sẵn.",
      retrieval_rule: "Khi muốn diễn tả việc làm cho một thành quả, tầm ảnh hưởng hay vấn đề trở nên lớn hơn gấp nhiều lần → Dùng 'MAGNIFY'.",
    },
  },
  "magnify": {
    term: "magnify",
    pronunciation: "/ˈmæɡnɪfaɪ/",
    pos: "verb",
    meaning_en: "to make greater or more impactful",
    meaning_vi: "nhân lên / khuếch đại",
    context_note: "Khuếch đại tầm ảnh hưởng.",
  },
  "curiosity": {
    term: "curiosity",
    pronunciation: "/ˌkjʊərɪˈɒsɪti/",
    pos: "noun",
    meaning_en: "a strong desire to know or learn something",
    meaning_vi: "tính hiếu kỳ / sự tò mò học hỏi chân thành",
    context_note: "Thay thế các định kiến chủ quan bằng sự tò mò chân thành để mở khóa đối thoại.",
    cognitive: {
      core_concept: "Trạng thái tâm trí cởi mở, chủ động muốn khám phá, thấu hiểu nguyên do sâu xa của một hiện tượng hoặc quan điểm của người khác mà không vội vàng phán xét.",
      cognitive_frame: {
        actor: "Người giao tiếp khôn ngoan",
        recipient: "Góc nhìn của đối phương",
        mental_scene: "Thay vì dựng bức tường định kiến 'tôi đã biết hết rồi', chủ thể mở cánh cửa 'hãy kể tôi nghe tại sao bạn lại nghĩ vậy'.",
      },
      meaning_in_context: "Trong giao tiếp lãnh đạo, sự tò mò chân thành giúp dập tắt xung đột và xây dựng niềm tin bền vững.",
      transfer_contexts: [
        {
          domain_label: "Khoa học khám phá",
          sentence: "Scientific breakthrough is driven by relentless curiosity about natural laws.",
          invariant_connection: "Động lực thôi thúc tìm hiểu bản chất thế giới.",
        },
      ],
      contrast: "'curiosity' khác 'inquisitiveness / nosiness': 'Curiosity' là sự tò mò khám phá mang tính xây dựng, còn 'nosiness' là tọc mạch chuyện riêng tư.",
      retrieval_rule: "Khi muốn diễn tả tinh thần cởi mở học hỏi và khám phá không phán xét → Dùng 'CURIOSITY'.",
    },
  },
  "rebuttal": {
    term: "rebuttal",
    pronunciation: "/rɪˈbʌtəl/",
    pos: "noun",
    meaning_en: "a refutation or contradiction in an argument",
    meaning_vi: "lời phản bác / sự đáp trả luận điểm",
    context_note: "Thay vì chuẩn bị sẵn lời phản bác trong đầu, hãy đặt thêm một câu hỏi sâu hơn.",
    cognitive: {
      core_concept: "Một phát biểu hoặc luận cứ được chuẩn bị kỹ lưỡng nhằm chỉ ra điểm sai, vô hiệu hóa hoặc đánh bại lập luận của đối phương trong một cuộc tranh luận.",
      cognitive_frame: {
        actor: "Người phản biện",
        recipient: "Luận điểm của đối thủ",
        mental_scene: "Hai bên đối đầu trên sàn đấu lý lẽ → bên A tung ra đòn lập luận để bẻ gãy đòn tấn công của bên B.",
      },
      meaning_in_context: "Tác giả cảnh báo rằng việc chăm chăm chuẩn bị câu phản bác (rebuttal) trong lúc người khác đang nói sẽ giết chết cuộc đối thoại thấu hiểu.",
      transfer_contexts: [
        {
          domain_label: "Tòa án & Tranh tụng",
          sentence: "The defense attorney presented a fierce rebuttal to the prosecutor's claims.",
          invariant_connection: "Đưa ra bằng chứng bẻ gãy cáo buộc của đối phương.",
        },
      ],
      retrieval_rule: "Khi nói về hành động đưa ra lý lẽ để bác bỏ luận điểm của người khác → Dùng 'REBUTTAL'.",
    },
  },
  "assumptions": {
    term: "assumptions",
    pronunciation: "/əˈsʌmpʃənz/",
    pos: "noun (plural)",
    meaning_en: "things that are accepted as true without proof",
    meaning_vi: "các giả định / định kiến chủ quan",
    context_note: "Giả định sai lầm là cách nhanh nhất làm đổ vỡ giao tiếp.",
  },
  "derail": {
    term: "derail",
    pronunciation: "/dɪˈreɪl/",
    pos: "verb",
    meaning_en: "to obstruct or divert from course",
    meaning_vi: "làm chệch hướng / làm trật bánh",
    context_note: "Làm đổ vỡ tiến trình đối thoại.",
  },
  "replicate": {
    term: "replicate",
    pronunciation: "/ˈrɛplɪkeɪt/",
    pos: "verb",
    meaning_en: "to reproduce or duplicate exactly",
    meaning_vi: "sao chép / tái tạo lại",
    context_note: "AI đơn giản là không thể sao chép được sự đồng cảm và lòng tin giữa con người.",
  },
  "execute": {
    term: "execute",
    pronunciation: "/ˈɛksɪkjuːt/",
    pos: "verb",
    meaning_en: "to carry out or put into effect a plan",
    meaning_vi: "thực thi / triển khai dự án",
    context_note: "Nhà đầu tư rót vốn cho những nhà sáng lập mà họ tin rằng có năng lực thực thi.",
  },
  "founders": {
    term: "founders",
    pronunciation: "/ˈfaʊndəz/",
    pos: "noun (plural)",
    meaning_en: "people who establish businesses or institutions",
    meaning_vi: "các nhà sáng lập",
    context_note: "Nhà sáng lập doanh nghiệp.",
  },
  "perks": {
    term: "perks",
    pronunciation: "/pɜːks/",
    pos: "noun (plural)",
    meaning_en: "special privileges or benefits attached to employment",
    meaning_vi: "phúc lợi / đãi ngộ phụ",
    context_note: "Nhân viên không ở lại chỉ vì phúc lợi mà vì niềm tin vào lãnh đạo.",
  },
  "keynote": {
    term: "keynote",
    pronunciation: "/ˈkiːnəʊt/",
    pos: "noun",
    meaning_en: "a principal address or speech delivering core vision",
    meaning_vi: "bài phát biểu chủ đạo / diễn văn chính",
    context_note: "Mỗi bài phát biểu là một cơ hội tạo dựng tầm ảnh hưởng.",
  },
  "formulate": {
    term: "formulate",
    pronunciation: "/ˈfɔːmjʊleɪt/",
    pos: "verb",
    meaning_en: "to create or prepare systematically",
    meaning_vi: "chuẩn bị sẵn / hình thành (phản hồi)",
    context_note: "Cưỡng lại việc vội vàng hình thành câu đáp trả khi đối phương đang nói.",
  },
  "resisting": {
    term: "resisting",
    pronunciation: "/rɪˈzɪstɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "holding back from or preventing an impulse",
    meaning_vi: "kiềm chế / kìm nén",
    context_note: "Kìm nén sự thôi thúc chen ngang.",
  },
  "urge": {
    term: "urge",
    pronunciation: "/ɜːdʒ/",
    pos: "noun",
    meaning_en: "a strong impulse or desire",
    meaning_vi: "sự thôi thúc / nôn nóng",
    context_note: "Sự thôi thúc phản bác ngay lập tức.",
  },
  "reflecting": {
    term: "reflecting",
    pronunciation: "/rɪˈflɛktɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "mirroring or summarizing back what was understood",
    meaning_vi: "nhắc lại / phản ánh lại",
    context_note: "Nhắc lại và xác nhận lại những gì mình vừa lắng nghe trước khi đưa ra lời khuyên.",
  },
  "uncertainty": {
    term: "uncertainty",
    pronunciation: "/ʌnˈsɜːtənti/",
    pos: "noun",
    meaning_en: "state of being unsure or ambiguous",
    meaning_vi: "sự mơ hồ / tính bất định",
    context_note: "Sự rõ ràng tạo nên tự tin vì nó loại bỏ hoàn toàn sự bất định.",
  },
  "clarity": {
    term: "clarity",
    pronunciation: "/ˈklærɪti/",
    pos: "noun",
    meaning_en: "the quality of being clear and easily understood",
    meaning_vi: "sự rõ ràng / sáng tỏ",
    context_note: "Chuyển hóa sự phức tạp thành sự rõ ràng.",
  },
  "commitment": {
    term: "commitment",
    pronunciation: "/kəˈmɪtmənt/",
    pos: "noun",
    meaning_en: "state or quality of being dedicated to a cause",
    meaning_vi: "sự cam kết / tận tâm cống hiến",
    context_note: "Truyền cảm hứng và tinh thần cam kết cho đội ngũ.",
  },
  "conflict": {
    term: "conflict",
    pronunciation: "/ˈkɒnflɪkt/",
    pos: "noun",
    meaning_en: "serious disagreement or argument",
    meaning_vi: "xung đột / mâu thuẫn",
    context_note: "Khéo léo xử lý và hòa giải các xung đột nội bộ.",
  },
  "influence": {
    term: "influence",
    pronunciation: "/ˈɪnflʊəns/",
    pos: "noun",
    meaning_en: "capacity to have an effect on character or behavior",
    meaning_vi: "tầm ảnh hưởng / uy tín",
    context_note: "Tạo dựng tầm ảnh hưởng lâu dài.",
  },
  "collaborate": {
    term: "collaborate",
    pronunciation: "/kəˈlæbəreɪt/",
    pos: "verb",
    meaning_en: "to work jointly on an activity or project",
    meaning_vi: "hợp tác / cộng tác hiệu quả",
    context_note: "Cộng tác hiệu quả hơn với cộng sự.",
  },
  "trustworthy": {
    term: "trustworthy",
    pronunciation: "/ˈtrʌstˌwɜːði/",
    pos: "adjective",
    meaning_en: "able to be relied on as honest or truthful",
    meaning_vi: "đáng tin cậy / có uy tín",
    context_note: "Được nhìn nhận là người đáng tin cậy.",
  },
  "prompts": {
    term: "prompts",
    pronunciation: "/prɒmpts/",
    pos: "noun (plural)",
    meaning_en: "instructions or inputs given to an AI model",
    meaning_vi: "câu lệnh điều khiển AI",
    context_note: "Người lãnh đạo thành công không nhất thiết là người viết câu lệnh AI giỏi nhất.",
  },
  "entrepreneur": {
    term: "entrepreneur",
    pronunciation: "/ˌɒntrəprəˈnɜːr/",
    pos: "noun",
    meaning_en: "a person who sets up a business taking on financial risks",
    meaning_vi: "doanh nhân / nhà khởi nghiệp",
    context_note: "Mọi doanh nhân đều nhận ra khách hàng mua sự tự tin chứ không đơn thuần mua sản phẩm.",
  },
  "advice": {
    term: "advice",
    pronunciation: "/ədˈvaɪs/",
    pos: "noun (uncountable)",
    meaning_en: "guidance or recommendations offered with regard to prudent future action",
    meaning_vi: "lời khuyên / chỉ dẫn",
    context_note: "Lời khuyên kinh điển của Warren Buffett về rèn luyện kỹ năng giao tiếp.",
  },
  "simple": {
    term: "simple",
    pronunciation: "/ˈsɪmpəl/",
    pos: "adjective",
    meaning_en: "easily understood or done; presenting no difficulty",
    meaning_vi: "đơn giản / mộc mạc",
    context_note: "Những lời khuyên đơn giản nhưng trường tồn qua thời gian.",
  },
  "spent": {
    term: "spent",
    pronunciation: "/spɛnt/",
    pos: "verb (past of spend)",
    meaning_en: "passed time in a specified way or in the specified place",
    meaning_vi: "đã trải qua / dành ra (nhiều thập kỷ)",
    context_note: "Warren Buffett đã dành nhiều thập kỷ đúc kết triết lý lãnh đạo.",
  },
  "spend": {
    term: "spend",
    pronunciation: "/spɛnd/",
    pos: "verb",
    meaning_en: "to pass time or expend resources",
    meaning_vi: "dành ra / tiêu dùng",
    context_note: "Dành thời gian hoàn thiện bản thân.",
  },
  "decades": {
    term: "decades",
    pronunciation: "/ˈdɛkeɪdz/",
    pos: "noun (plural)",
    meaning_en: "periods of ten years",
    meaning_vi: "nhiều thập kỷ (mỗi thập kỷ 10 năm)",
    context_note: "Nhiều thập kỷ chia sẻ lời khuyên.",
  },
  "decade": {
    term: "decade",
    pronunciation: "/ˈdɛkeɪd/",
    pos: "noun",
    meaning_en: "a period of ten years",
    meaning_vi: "thập kỷ (10 năm)",
    context_note: "Thập kỷ tới.",
  },
  "tends": {
    term: "tends",
    pronunciation: "/tɛndz/",
    pos: "verb",
    meaning_en: "regularly or frequently behaves in a particular way",
    meaning_vi: "có xu hướng",
    context_note: "Có xu hướng giữ nguyên giá trị theo năm tháng.",
  },
  "tend": {
    term: "tend",
    pronunciation: "/tɛnd/",
    pos: "verb",
    meaning_en: "to be inclined or have a tendency",
    meaning_vi: "có xu hướng",
    context_note: "Có xu hướng.",
  },
  "age": {
    term: "age",
    pronunciation: "/eɪdʒ/",
    pos: "verb / noun",
    meaning_en: "to mature well or maintain validity over time",
    meaning_vi: "tồn tại qua năm tháng / độ tuổi",
    context_note: "Lời khuyên càng theo năm tháng càng trở nên đúng đắn.",
  },
  "remarkably": {
    term: "remarkably",
    pronunciation: "/rɪˈmɑːkəbli/",
    pos: "adverb",
    meaning_en: "in a way that is worthy of attention; strikingly",
    meaning_vi: "một cách xuất sắc / đáng chú ý",
    context_note: "Giá trị trường tồn một cách xuất sắc qua thời gian.",
  },
  "remarkable": {
    term: "remarkable",
    pronunciation: "/rɪˈmɑːkəbəl/",
    pos: "adjective",
    meaning_en: "worthy of attention; extraordinary",
    meaning_vi: "đáng chú ý / phi thường",
    context_note: "Thành tựu phi thường.",
  },
  "well": {
    term: "well",
    pronunciation: "/wɛl/",
    pos: "adverb",
    meaning_en: "in a good or satisfactory way",
    meaning_vi: "tốt / sâu sắc",
    context_note: "Giữ vững giá trị tốt đẹp.",
  },
  "era": {
    term: "era",
    pronunciation: "/ˈɪərə/",
    pos: "noun",
    meaning_en: "a long and distinct period of history with a particular feature",
    meaning_vi: "kỷ nguyên / thời đại",
    context_note: "Kỷ nguyên trí tuệ nhân tạo (AI).",
  },
  "emails": {
    term: "emails",
    pronunciation: "/ˈiːmeɪlz/",
    pos: "noun (plural)",
    meaning_en: "electronic mail messages",
    meaning_vi: "thư điện tử / email",
    context_note: "AI có thể tự động soạn thảo email.",
  },
  "email": {
    term: "email",
    pronunciation: "/ˈiːmeɪl/",
    pos: "noun / verb",
    meaning_en: "electronic mail",
    meaning_vi: "thư điện tử",
    context_note: "Email.",
  },
  "summarize": {
    term: "summarize",
    pronunciation: "/ˈsʌməraɪz/",
    pos: "verb",
    meaning_en: "to give a brief statement of the main points",
    meaning_vi: "tóm tắt / tổng hợp",
    context_note: "Tóm tắt nội dung các cuộc họp trong vài giây.",
  },
  "meetings": {
    term: "meetings",
    pronunciation: "/ˈmiːtɪŋz/",
    pos: "noun (plural)",
    meaning_en: "gatherings of people for discussion",
    meaning_vi: "các cuộc họp / buổi thảo luận",
    context_note: "Nội dung các cuộc họp.",
  },
  "meeting": {
    term: "meeting",
    pronunciation: "/ˈmiːtɪŋ/",
    pos: "noun",
    meaning_en: "an assembly of people",
    meaning_vi: "cuộc họp",
    context_note: "Cuộc họp.",
  },
  "draft": {
    term: "draft",
    pronunciation: "/drɑːft/",
    pos: "verb / noun",
    meaning_en: "to prepare a preliminary version of a document",
    meaning_vi: "soạn thảo / bản phác thảo",
    context_note: "Soạn thảo kế hoạch kinh doanh.",
  },
  "generate": {
    term: "generate",
    pronunciation: "/ˈdʒɛnəreɪt/",
    pos: "verb",
    meaning_en: "to produce or create",
    meaning_vi: "tạo ra / khởi tạo",
    context_note: "Khởi tạo các bài thuyết trình tức thì.",
  },
  "presentations": {
    term: "presentations",
    pronunciation: "/ˌprɛzənˈteɪʃənz/",
    pos: "noun (plural)",
    meaning_en: "speeches or talks in which a new idea is shown",
    meaning_vi: "các bài thuyết trình",
    context_note: "Các bài thuyết trình ý tưởng.",
  },
  "presentation": {
    term: "presentation",
    pronunciation: "/ˌprɛzənˈteɪʃən/",
    pos: "noun",
    meaning_en: "a formal talk",
    meaning_vi: "bài thuyết trình",
    context_note: "Thuyết trình.",
  },
  "seconds": {
    term: "seconds",
    pronunciation: "/ˈsɛkəndz/",
    pos: "noun (plural)",
    meaning_en: "very short periods of time",
    meaning_vi: "vài giây",
    context_note: "Xử lý trong vài giây.",
  },
  "ability": {
    term: "ability",
    pronunciation: "/əˈbɪlɪti/",
    pos: "noun",
    meaning_en: "possession of the means or skill to do something",
    meaning_vi: "năng lực / khả năng",
    context_note: "Năng lực giao tiếp như một con người thực thụ.",
  },
  "communicate": {
    term: "communicate",
    pronunciation: "/kəˈmjuːnɪkeɪt/",
    pos: "verb",
    meaning_en: "to share or exchange information, news, or ideas",
    meaning_vi: "giao tiếp / truyền đạt thông điệp",
    context_note: "Giao tiếp và truyền cảm hứng cho người khác.",
  },
  "human": {
    term: "human",
    pronunciation: "/ˈhjuːmən/",
    pos: "noun / adjective",
    meaning_en: "relating to or characteristic of humankind",
    meaning_vi: "con người / thuộc về con người",
    context_note: "Giao tiếp chân thực giữa con người với con người.",
  },
  "genuine": {
    term: "genuine",
    pronunciation: "/ˈdʒɛnjʊɪn/",
    pos: "adjective",
    meaning_en: "truly what something is said to be; authentic and not artificial",
    meaning_vi: "thực sự / chân chính / không giả tạo",
    context_note: "Khả năng giao tiếp con người trở thành một lợi thế cạnh tranh thực thụ (genuine competitive advantage) mà AI không thể làm giả.",
    depth: "deep",
    humanized: {
      simple_intuition: "genuine mô tả những giá trị xuất phát từ bản chất thật, hoàn toàn chân thực, không có sự ngụy tạo, sao chép hay phóng đại — trong môi trường kinh doanh, 'genuine advantage' là một ưu thế cạnh tranh thực chất và bền vững từ nội lực.",
      in_context_story: "Khi các công cụ AI có thể viết email và sinh mã nguồn trong vài giây, năng lực kết nối và thấu cảm giữa người với người trở thành lợi thế cạnh tranh chân chính (genuine competitive advantage) mà máy móc không thể mô phỏng.",
      real_world_transfers: [
        {
          domain_label: "Lãnh đạo & Quản trị",
          sentence: "Leaders who show genuine empathy earn deeper loyalty and commitment from their teams.",
          connection_note: "Sự thấu cảm chân thành tạo nên niềm tin bền chặt trong tổ chức.",
        },
        {
          domain_label: "Sản phẩm & Thương hiệu",
          sentence: "Consumers readily distinguish between genuine craftsmanship and cheap mass automation.",
          connection_note: "Khách hàng luôn nhận ra giá trị thủ công đích thực so với hàng tự động hóa đại trà.",
        },
      ],
      nuance_warning: "Phân biệt 'genuine' (chân thực, xuất phát từ gốc rễ) với 'artificial/counterfeit' (nhân tạo, sao chép bên ngoài). Đi với 'competitive advantage' để khẳng định lợi thế có nền móng vững vàng, không phải ưu thế ảo nhất thời.",
      retrieval_tip: "Khi tác giả muốn nhấn mạnh một giá trị, phẩm chất là 'đích thực', 'không thể làm giả' hoặc 'có thật từ bản chất' → Nghĩ ngay đến 'GENUINE'.",
    },
  },
  "convince": {
    term: "convince",
    pronunciation: "/kənˈvɪns/",
    pos: "verb",
    meaning_en: "cause someone to believe firmly in the truth of something or take action",
    meaning_vi: "thuyết phục / làm cho người khác tin và đồng hành",
    context_note: "Buffett nhấn mạnh rằng nếu thiếu kỹ năng truyền đạt, bạn sẽ không thể thuyết phục người khác đồng hành cùng tầm nhìn của bạn.",
    depth: "standard",
    humanized: {
      simple_intuition: "convince là quá trình dùng lập luận, bằng chứng hoặc sự thấu cảm để làm cho người khác thay đổi nhận thức, tin tưởng tuyệt đối và sẵn sàng hành động theo định hướng bạn đưa ra.",
      in_context_story: "Trong bài phát biểu với sinh viên tốt nghiệp, Buffett cảnh báo rằng dù bạn có tầm nhìn xa trông rộng (see over the mountain), nhưng nếu không biết cách giao tiếp thì bạn không thể thuyết phục bất kỳ ai đi theo mình.",
      real_world_transfers: [
        {
          domain_label: "Khởi nghiệp & Gọi vốn",
          sentence: "Founders must convince skeptical venture capitalists that their market thesis is sound.",
          connection_note: "Thuyết phục các nhà đầu tư khó tính tin vào tiềm năng của dự án.",
        },
      ],
      nuance_warning: "Phân biệt 'convince' (thuyết phục về mặt nhận thức, niềm tin) và 'persuade' (thuyết phục dẫn đến hành động cụ thể).",
      retrieval_tip: "Khi muốn diễn tả việc làm cho ai đó tin chắc vào một luận điểm hoặc tầm nhìn → Dùng 'CONVINCE'.",
    },
  },
  "mountain": {
    term: "mountain",
    pronunciation: "/ˈmaʊntɪn/",
    pos: "noun",
    meaning_en: "a large natural elevation of earth, or visionary horizon/barrier",
    meaning_vi: "ngọn núi (ẩn dụ: rào cản tầm nhìn / chân trời tương lai)",
    context_note: "Dù bạn nhìn xa trông rộng qua bên kia ngọn núi nhưng người khác chưa nhận thấy nếu bạn không biết truyền đạt.",
    depth: "standard",
    humanized: {
      simple_intuition: "mountain ở nghĩa đen là ngọn núi cao, nhưng trong văn cảnh ẩn dụ của Buffett, nó đại diện cho đường chân trời xa xôi — biểu tượng của tầm nhìn chiến lược mà người bình thường chưa nhìn thấy được.",
      in_context_story: "Buffett dùng hình tượng 'see over the mountain' để chỉ việc người lãnh đạo có thể thấy trước tương lai, nhưng nếu không diễn đạt thành lời thì người khác vẫn bị ngọn núi che khuất tầm mắt.",
      real_world_transfers: [
        {
          domain_label: "Tầm nhìn chiến lược",
          sentence: "Visionary leaders see over the mountain long before market disruptions materialize.",
          connection_note: "Nhìn thấy trước cơ hội và rủi ro từ trước khi thị trường kịp phản ứng.",
        },
      ],
      retrieval_tip: "Khi gặp cụm 'see over the mountain' trong văn bản IELTS → Hiểu ngay là ẩn dụ về 'tầm nhìn xa trông rộng vượt qua rào cản hiện tại'.",
    },
  },
  "sounds": {
    term: "sounds",
    pronunciation: "/saʊndz/",
    pos: "verb",
    meaning_en: "gives a specified impression when heard",
    meaning_vi: "nghe có vẻ / tạo cảm giác",
    context_note: "Nghe có vẻ hiển nhiên trên lý thuyết nhưng thực tế lại mang sức mạnh phi thường.",
    depth: "concise",
    humanized: {
      simple_intuition: "Tạo ra một cảm nhận hoặc ấn tượng ban đầu khi người nghe tiếp nhận thông điệp.",
      in_context_story: "Lời khuyên của Buffett nghe qua có vẻ hiển nhiên (sounds obvious) nhưng giá trị thực thi lại vô cùng to lớn.",
    },
  },
  "sound": {
    term: "sound",
    pronunciation: "/saʊnd/",
    pos: "verb / adjective",
    meaning_en: "to seem or appear, or based on reason/reliable",
    meaning_vi: "nghe như / vững chắc, hợp lý",
    context_note: "Nghe như / lập luận vững chắc.",
    depth: "concise",
    humanized: {
      simple_intuition: "Có vẻ như khi nghe, hoặc một lập luận có cơ sở vững chắc.",
      in_context_story: "Lập luận chiến lược vững vàng và đáng tin cậy.",
    },
  },
  "obvious": {
    term: "obvious",
    pronunciation: "/ˈɒbvɪəs/",
    pos: "adjective",
    meaning_en: "easily perceived, understood, or self-evident",
    meaning_vi: "hiển nhiên / rõ ràng trước mắt",
    context_note: "Dù lời khuyên nghe có vẻ hiển nhiên và đơn giản nhưng giá trị thực thi của nó lại cực kỳ to lớn.",
    depth: "standard",
    humanized: {
      simple_intuition: "obvious chỉ những điều tưởng chừng như rất đơn giản, dễ hiểu và ai cũng biết trên lý thuyết, nhưng trong thực tế lại ít ai kiên trì rèn luyện để đạt đến mức độ xuất sắc.",
      in_context_story: "Tác giả Marcel Schwantes mở đầu Source 2 bằng nhận định: Lời khuyên của Buffett nghe qua tưởng như hiển nhiên (sounds obvious), nhưng sức mạnh của nó tăng vọt khi thế giới bước vào kỷ nguyên AI.",
      real_world_transfers: [
        {
          domain_label: "Nguyên lý kinh doanh",
          sentence: "Focusing on customer satisfaction sounds obvious, yet few companies execute it flawlessly.",
          connection_note: "Nghe có vẻ hiển nhiên trên lý thuyết nhưng đòi hỏi kỷ luật thực thi rất cao.",
        },
      ],
      retrieval_tip: "Khi tác giả muốn đối lập một chân lý 'nghe qua rất quen thuộc/hiển nhiên' với 'giá trị phi thường khi thực thi' → Chú ý từ 'OBVIOUS'.",
    },
  },
  "value": {
    term: "value",
    pronunciation: "/ˈvæljuː/",
    pos: "noun",
    meaning_en: "the importance, worth, or strategic usefulness of something",
    meaning_vi: "giá trị cốt lõi / tầm quan trọng chiến lược",
    context_note: "Giá trị chiến lược của năng lực giao tiếp con người đã tăng vọt trong kỷ nguyên AI.",
    depth: "standard",
    humanized: {
      simple_intuition: "value là mức độ hữu ích, tầm quan trọng và giá trị thực chất mà một kỹ năng, giải pháp hay con người mang lại cho tổ chức.",
      in_context_story: "Trong bài đọc, 'its value has skyrocketed' nhấn mạnh rằng giá trị của khả năng giao tiếp con người ngày càng trở nên đắt giá và khan hiếm.",
      real_world_transfers: [
        {
          domain_label: "Kinh tế học",
          sentence: "When automation commoditizes basic tasks, human discernment creates unique value.",
          connection_note: "Khi tác vụ cơ bản bị tự động hóa, khả năng đánh giá của con người tạo nên giá trị độc nhất.",
        },
      ],
    },
  },
  "spreadsheets": {
    term: "spreadsheets",
    pronunciation: "/ˈsprɛdʃiːts/",
    pos: "noun (plural)",
    meaning_en: "electronic documents storing data in tables",
    meaning_vi: "bảng tính dữ liệu (Excel / Sheets)",
    context_note: "Phân tích bảng tính tài chính.",
  },
  "software": {
    term: "software",
    pronunciation: "/ˈsɒftweər/",
    pos: "noun",
    meaning_en: "programs and operating information used by a computer",
    meaning_vi: "phần mềm / mã lệnh",
    context_note: "Tạo ra mã nguồn phần mềm.",
  },
  "earn": {
    term: "earn",
    pronunciation: "/ɜːn/",
    pos: "verb",
    meaning_en: "to gain deservedly in return for effort",
    meaning_vi: "tạo dựng / gặt hái (lòng tin)",
    context_note: "Tạo dựng niềm tin từ người khác.",
  },
  "inspire": {
    term: "inspire",
    pronunciation: "/ɪnˈspaɪər/",
    pos: "verb",
    meaning_en: "to fill someone with the urge or ability to do something",
    meaning_vi: "truyền cảm hứng",
    context_note: "Truyền cảm hứng cam kết cống hiến.",
  },
  "navigate": {
    term: "navigate",
    pronunciation: "/ˈnævɪɡeɪt/",
    pos: "verb",
    meaning_en: "to direct or steer a course through a difficult situation",
    meaning_vi: "điều hướng / giải quyết (xung đột)",
    context_note: "Hòa giải các mâu thuẫn phức tạp.",
  },
  "understood": {
    term: "understood",
    pronunciation: "/ˌʌndəˈstʊd/",
    pos: "verb (past participle)",
    meaning_en: "perceived the intended meaning or emotions of",
    meaning_vi: "được thấu hiểu",
    context_note: "Làm cho đối phương cảm thấy họ thực sự được thấu hiểu.",
  },
  "leaders": {
    term: "leaders",
    pronunciation: "/ˈliːdəz/",
    pos: "noun (plural)",
    meaning_en: "people who lead or command groups",
    meaning_vi: "các nhà lãnh đạo",
    context_note: "Những người lãnh đạo xuất chúng trong thập kỷ tới.",
  },
  "leader": {
    term: "leader",
    pronunciation: "/ˈliːdər/",
    pos: "noun",
    meaning_en: "a person who guides or inspires others",
    meaning_vi: "người lãnh đạo",
    context_note: "Lãnh đạo.",
  },
  "thrive": {
    term: "thrive",
    pronunciation: "/θraɪv/",
    pos: "verb",
    meaning_en: "to prosper and flourish; grow vigorously",
    meaning_vi: "thăng hoa / phát triển vượt bậc",
    context_note: "Phát triển mạnh mẽ trong thập kỷ tới.",
  },
  "necessarily": {
    term: "necessarily",
    pronunciation: "/ˌnɛsəˈsɛrɪli/",
    pos: "adverb",
    meaning_en: "as a necessary result; unavoidably",
    meaning_vi: "nhất thiết / nhất định",
    context_note: "Không nhất thiết phải là người giỏi kỹ thuật nhất.",
  },
  "translate": {
    term: "translate",
    pronunciation: "/trænsˈleɪt/",
    pos: "verb",
    meaning_en: "to express the sense of in another form; turn into",
    meaning_vi: "chuyển hóa / dịch chuyển",
    context_note: "Chuyển hóa sự phức tạp thành sự rõ ràng.",
  },
  "rally": {
    term: "rally",
    pronunciation: "/ˈræli/",
    pos: "verb",
    meaning_en: "to bring together for common action or effort",
    meaning_vi: "kết nối / tập hợp mọi người",
    context_note: "Tập hợp mọi người xung quanh một tầm nhìn chung.",
  },
  "vision": {
    term: "vision",
    pronunciation: "/ˈvɪʒən/",
    pos: "noun",
    meaning_en: "the ability to think about or plan the future with imagination or wisdom",
    meaning_vi: "tầm nhìn chiến lược",
    context_note: "Tầm nhìn định hướng tổ chức.",
  },
  "thoughtful": {
    term: "thoughtful",
    pronunciation: "/ˈθɔːtfʊl/",
    pos: "adjective",
    meaning_en: "showing consideration and deep thinking",
    meaning_vi: "sâu sắc / chu đáo",
    context_note: "Đặt những câu hỏi sâu sắc để mở khóa vấn đề.",
  },
  "relationships": {
    term: "relationships",
    pronunciation: "/rɪˈleɪʃənʃɪps/",
    pos: "noun (plural)",
    meaning_en: "the ways in which two or more people are connected",
    meaning_vi: "các mối quan hệ bền vững",
    context_note: "Xây dựng các mối quan hệ mà AI không thể sao chép.",
  },
  "relationship": {
    term: "relationship",
    pronunciation: "/rɪˈleɪʃənʃɪp/",
    pos: "noun",
    meaning_en: "a connection between people",
    meaning_vi: "mối quan hệ",
    context_note: "Mối quan hệ.",
  },
  "evolved": {
    term: "evolved",
    pronunciation: "/ɪˈvɒlvd/",
    pos: "verb (past)",
    meaning_en: "developed gradually over time",
    meaning_vi: "đã tiến hóa / chuyển mình",
    context_note: "Giao tiếp đã chuyển mình từ kỹ năng mềm thành kỹ năng chiến lược.",
  },
  "customers": {
    term: "customers",
    pronunciation: "/ˈkʌstəməz/",
    pos: "noun (plural)",
    meaning_en: "people who buy goods or services",
    meaning_vi: "khách hàng",
    context_note: "Khách hàng mua sự tự tin.",
  },
  "customer": {
    term: "customer",
    pronunciation: "/ˈkʌstəmər/",
    pos: "noun",
    meaning_en: "a buyer of goods",
    meaning_vi: "khách hàng",
    context_note: "Khách hàng.",
  },
  "products": {
    term: "products",
    pronunciation: "/ˈprɒdʌkts/",
    pos: "noun (plural)",
    meaning_en: "articles or substances manufactured for sale",
    meaning_vi: "các sản phẩm",
    context_note: "Sản phẩm thương mại.",
  },
  "product": {
    term: "product",
    pronunciation: "/ˈprɒdʌkt/",
    pos: "noun",
    meaning_en: "an item manufactured for sale",
    meaning_vi: "sản phẩm",
    context_note: "Sản phẩm.",
  },
  "investor": {
    term: "investor",
    pronunciation: "/ɪnˈvɛstər/",
    pos: "noun",
    meaning_en: "a person who invests capital",
    meaning_vi: "nhà đầu tư",
    context_note: "Nhà đầu tư.",
  },
  "fund": {
    term: "fund",
    pronunciation: "/fʌnd/",
    pos: "verb",
    meaning_en: "to provide with money for a purpose",
    meaning_vi: "rót vốn / tài trợ tài chính",
    context_note: "Rót vốn cho các ý tưởng tiềm năng.",
  },
  "ideas": {
    term: "ideas",
    pronunciation: "/aɪˈdɪəz/",
    pos: "noun (plural)",
    meaning_en: "thoughts or suggestions as to a possible course of action",
    meaning_vi: "các ý tưởng sáng tạo",
    context_note: "Ý tưởng khởi nghiệp.",
  },
  "idea": {
    term: "idea",
    pronunciation: "/aɪˈdɪə/",
    pos: "noun",
    meaning_en: "a concept or thought",
    meaning_vi: "ý tưởng",
    context_note: "Ý tưởng.",
  },
  "alone": {
    term: "alone",
    pronunciation: "/əˈləʊn/",
    pos: "adverb",
    meaning_en: "only; solely without anything else",
    meaning_vi: "đơn thuần / chỉ riêng",
    context_note: "Không chỉ riêng vì phúc lợi.",
  },
  "leading": {
    term: "leading",
    pronunciation: "/ˈliːdɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "guiding or directing a group of people",
    meaning_vi: "đang dẫn dắt / lãnh đạo",
    context_note: "Dẫn dắt tổ chức.",
  },
  "arrived": {
    term: "arrived",
    pronunciation: "/əˈraɪvd/",
    pos: "verb (past)",
    meaning_en: "reached a destination or came into existence",
    meaning_vi: "xuất hiện / ra đời",
    context_note: "Rất lâu trước khi AI tạo sinh ra đời.",
  },
  "arrive": {
    term: "arrive",
    pronunciation: "/əˈraɪv/",
    pos: "verb",
    meaning_en: "to come into existence or reach a place",
    meaning_vi: "ra đời / đến",
    context_note: "Ra đời.",
  },
  "classic": {
    term: "classic",
    pronunciation: "/ˈklæsɪk/",
    pos: "adjective",
    meaning_en: "judged over a period of time to be of highest quality; typical",
    meaning_vi: "kinh điển / đặc trưng",
    context_note: "Theo phong cách kinh điển của Warren Buffett.",
  },
  "fashion": {
    term: "fashion",
    pronunciation: "/ˈfæʃən/",
    pos: "noun",
    meaning_en: "a manner of doing something",
    meaning_vi: "phong cách / phương thức",
    context_note: "Phong cách giao tiếp.",
  },
  "principle": {
    term: "principle",
    pronunciation: "/ˈprɪnsəpəl/",
    pos: "noun",
    meaning_en: "a fundamental truth or proposition that serves as the foundation for a system of belief",
    meaning_vi: "nguyên lý cốt lõi / quy luật",
    context_note: "Nguyên lý sinh lãi kép theo thời gian.",
  },
  "difficult": {
    term: "difficult",
    pronunciation: "/ˈdɪfɪkəlt/",
    pos: "adjective",
    meaning_en: "needing much effort or skill to accomplish",
    meaning_vi: "khó khăn / gai góc",
    context_note: "Những buổi phản hồi góp ý gai góc.",
  },
  "session": {
    term: "session",
    pronunciation: "/ˈsɛʃən/",
    pos: "noun",
    meaning_en: "a period devoted to a particular activity",
    meaning_vi: "phiên / buổi làm việc",
    context_note: "Buổi trao đổi góp ý.",
  },
  "podcast": {
    term: "podcast",
    pronunciation: "/ˈpɒdkɑːst/",
    pos: "noun",
    meaning_en: "a digital audio file made available on internet",
    meaning_vi: "chương trình podcast âm thanh",
    context_note: "Xuất hiện trên các kênh truyền thông.",
  },
  "appearance": {
    term: "appearance",
    pronunciation: "/əˈpɪərəns/",
    pos: "noun",
    meaning_en: "an act of performing or being seen in public",
    meaning_vi: "sự xuất hiện / góp mặt",
    context_note: "Góp mặt trên diễn đàn truyền thông.",
  },
  "exceptional": {
    term: "exceptional",
    pronunciation: "/ɪkˈsɛpʃənəl/",
    pos: "adjective",
    meaning_en: "unusually good; outstanding",
    meaning_vi: "xuất chúng / vượt trội",
    context_note: "Kỹ năng giao tiếp xuất chúng.",
  },
  "habits": {
    term: "habits",
    pronunciation: "/ˈhæbɪts/",
    pos: "noun (plural)",
    meaning_en: "settled or regular tendencies or practices",
    meaning_vi: "những thói quen rèn luyện",
    context_note: "3 thói quen phân biệt nhà lãnh đạo xuất chúng.",
  },
  "habit": {
    term: "habit",
    pronunciation: "/ˈhæbɪt/",
    pos: "noun",
    meaning_en: "a regular practice",
    meaning_vi: "thói quen",
    context_note: "Thói quen.",
  },
  "separate": {
    term: "separate",
    pronunciation: "/ˈsɛpəreɪt/",
    pos: "verb",
    meaning_en: "to divide or distinguish between",
    meaning_vi: "phân biệt / tạo sự khác biệt",
    context_note: "Tạo sự khác biệt giữa người xuất sắc và bình thường.",
  },
  "choose": {
    term: "choose",
    pronunciation: "/tʃuːz/",
    pos: "verb",
    meaning_en: "to pick out or select as being preferred",
    meaning_vi: "lựa chọn tin theo",
    context_note: "Người mà mọi người tự nguyện lựa chọn đi theo.",
  },
  "replace": {
    term: "replace",
    pronunciation: "/rɪˈpleɪs/",
    pos: "verb",
    meaning_en: "to take the place of or substitute",
    meaning_vi: "thay thế",
    context_note: "Thay thế định kiến bằng sự tò mò học hỏi.",
  },
  "acted": {
    term: "acted",
    pronunciation: "/ˈæktɪd/",
    pos: "verb (past)",
    meaning_en: "behaved in a specified way",
    meaning_vi: "đã hành động / ứng xử",
    context_note: "Hiểu vì sao họ lại hành xử như vậy.",
  },
  "act": {
    term: "act",
    pronunciation: "/ækt/",
    pos: "verb",
    meaning_en: "to take action or behave",
    meaning_vi: "hành động",
    context_note: "Hành động.",
  },
  "preparing": {
    term: "preparing",
    pronunciation: "/prɪˈpeərɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "making ready for use or consideration",
    meaning_vi: "đang chuẩn bị sẵn",
    context_note: "Thay vì vội vàng chuẩn bị câu phản bác.",
  },
  "defending": {
    term: "defending",
    pronunciation: "/dɪˈfɛndɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "protecting from challenge or maintaining position",
    meaning_vi: "bảo vệ lập trường",
    context_note: "Thay vì cố chấp bảo vệ quan điểm cá nhân.",
  },
  "position": {
    term: "position",
    pronunciation: "/pəˈzɪʃən/",
    pos: "noun",
    meaning_en: "a point of view or attitude on an issue",
    meaning_vi: "quan điểm / lập trường",
    context_note: "Lập trường của đối phương.",
  },
  "seek": {
    term: "seek",
    pronunciation: "/siːk/",
    pos: "verb",
    meaning_en: "to attempt to find or achieve",
    meaning_vi: "tìm kiếm / nỗ lực thấu hiểu",
    context_note: "Nỗ lực thấu hiểu góc nhìn của người khác.",
  },
  "demonstrate": {
    term: "demonstrate",
    pronunciation: "/ˈdɛmənstreɪt/",
    pos: "verb",
    meaning_en: "to clearly show the existence or truth of something",
    meaning_vi: "thể hiện / chứng minh",
    context_note: "Thể hiện sự lắng nghe và tò mò chân thành.",
  },
  "effectively": {
    term: "effectively",
    pronunciation: "/ɪˈfɛktɪvli/",
    pos: "adverb",
    meaning_en: "in such a manner as to achieve a desired result",
    meaning_vi: "một cách hiệu quả",
    context_note: "Hợp tác hiệu quả hơn.",
  },
  "effective": {
    term: "effective",
    pronunciation: "/ɪˈfɛktɪv/",
    pos: "adjective",
    meaning_en: "successful in producing a desired result",
    meaning_vi: "hiệu quả",
    context_note: "Hiệu quả.",
  },
  "viewed": {
    term: "viewed",
    pronunciation: "/vjuːd/",
    pos: "verb (past participle)",
    meaning_en: "regarded in a specified way",
    meaning_vi: "được nhìn nhận / đánh giá",
    context_note: "Được nhìn nhận là người đáng tin cậy.",
  },
  "jumping": {
    term: "jumping",
    pronunciation: "/ˈdʒʌmpɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "moving quickly or abruptly to a state",
    meaning_vi: "vội vàng đưa ra (kết luận)",
    context_note: "Tránh vội vàng suy diễn và kết luận.",
  },
  "conclusions": {
    term: "conclusions",
    pronunciation: "/kənˈkluːʒənz/",
    pos: "noun (plural)",
    meaning_en: "judgments or decisions reached by reasoning",
    meaning_vi: "những kết luận",
    context_note: "Vội vàng kết luận.",
  },
  "conclusion": {
    term: "conclusion",
    pronunciation: "/kənˈkluːʒən/",
    pos: "noun",
    meaning_en: "a final decision or judgment",
    meaning_vi: "kết luận",
    context_note: "Kết luận.",
  },
  "missing": {
    term: "missing",
    pronunciation: "/ˈmɪsɪŋ/",
    pos: "adjective / verb (-ing)",
    meaning_en: "not present or included; lacking",
    meaning_vi: "đang thiếu sót / bỏ quên",
    context_note: "Mình đang thiếu thông tin gì?",
  },
  "prevent": {
    term: "prevent",
    pronunciation: "/prɪˈvɛnt/",
    pos: "verb",
    meaning_en: "to keep from happening or arising",
    meaning_vi: "ngăn ngừa / phòng tránh",
    context_note: "Ngăn ngừa vô số hiểu lầm tai hại.",
  },
  "countless": {
    term: "countless",
    pronunciation: "/ˈkaʊntlɪs/",
    pos: "adjective",
    meaning_en: "too many to be counted; immense",
    meaning_vi: "vô số / rất nhiều",
    context_note: "Vô số hiểu lầm.",
  },
  "misunderstandings": {
    term: "misunderstandings",
    pronunciation: "/ˌmɪsʌndəˈstændɪŋz/",
    pos: "noun (plural)",
    meaning_en: "failures to understand something correctly",
    meaning_vi: "những hiểu lầm / bất đồng",
    context_note: "Tránh các hiểu lầm không đáng có.",
  },
  "misunderstanding": {
    term: "misunderstanding",
    pronunciation: "/ˌmɪsʌndəˈstændɪŋ/",
    pos: "noun",
    meaning_en: "a failure to understand correctly",
    meaning_vi: "sự hiểu lầm",
    context_note: "Hiểu lầm.",
  },
  "strongest": {
    term: "strongest",
    pronunciation: "/ˈstrɒŋɡɪst/",
    pos: "adjective (superlative)",
    meaning_en: "possessing the greatest power or effectiveness",
    meaning_vi: "mạnh mẽ nhất / xuất sắc nhất",
    context_note: "Những người lãnh đạo xuất sắc nhất.",
  },
  "annual": {
    term: "annual",
    pronunciation: "/ˈænjʊəl/",
    pos: "adjective",
    meaning_en: "occurring once every year",
    meaning_vi: "hàng năm / định kỳ",
    context_note: "Đánh giá hiệu suất hàng năm.",
  },
  "reviews": {
    term: "reviews",
    pronunciation: "/rɪˈvjuːz/",
    pos: "noun (plural)",
    meaning_en: "formal assessments of something with intention of instituting change",
    meaning_vi: "các kỳ đánh giá / xem xét",
    context_note: "Kỳ đánh giá nhân sự.",
  },
  "review": {
    term: "review",
    pronunciation: "/rɪˈvjuː/",
    pos: "noun / verb",
    meaning_en: "a formal assessment",
    meaning_vi: "đánh giá",
    context_note: "Đánh giá.",
  },
  "consistently": {
    term: "consistently",
    pronunciation: "/kənˈsɪstəntli/",
    pos: "adverb",
    meaning_en: "in every case or on every occasion; invariably",
    meaning_vi: "nhất quán / đều đặn",
    context_note: "Góp ý đều đặn mỗi ngày.",
  },
  "specifically": {
    term: "specifically",
    pronunciation: "/spəˈsɪfɪkli/",
    pos: "adverb",
    meaning_en: "in a way that is exact and clear",
    meaning_vi: "cụ thể / rõ ràng",
    context_note: "Phản hồi một cách cụ thể.",
  },
  "mind": {
    term: "mind",
    pronunciation: "/maɪnd/",
    pos: "noun",
    meaning_en: "the element of a person that enables them to be aware of the world",
    meaning_vi: "tâm trí / ý hướng",
    context_note: "Với ý hướng giúp người khác thành công.",
  },
  "removes": {
    term: "removes",
    pronunciation: "/rɪˈmuːvz/",
    pos: "verb",
    meaning_en: "eliminates or gets rid of",
    meaning_vi: "xóa bỏ / loại trừ",
    context_note: "Loại bỏ sự hoài nghi và bất định.",
  },
  "remove": {
    term: "remove",
    pronunciation: "/rɪˈmuːv/",
    pos: "verb",
    meaning_en: "to eliminate",
    meaning_vi: "xóa bỏ",
    context_note: "Xóa bỏ.",
  },
  "answers": {
    term: "answers",
    pronunciation: "/ˈɑːnsəz/",
    pos: "verb / noun (plural)",
    meaning_en: "provides answers to",
    meaning_vi: "giải đáp / câu trả lời",
    context_note: "Trả lời 3 câu hỏi then chốt.",
  },
  "answer": {
    term: "answer",
    pronunciation: "/ˈɑːnsər/",
    pos: "noun / verb",
    meaning_en: "a response or solution",
    meaning_vi: "câu trả lời",
    context_note: "Câu trả lời.",
  },
  "matter": {
    term: "matter",
    pronunciation: "/ˈmætər/",
    pos: "verb / noun",
    meaning_en: "to be of importance or have significance",
    meaning_vi: "có ý nghĩa quan trọng",
    context_note: "Tại sao điều đó lại có ý nghĩa quan trọng?",
  },
  "notifications": {
    term: "notifications",
    pronunciation: "/ˌnəʊtɪfɪˈkeɪʃənz/",
    pos: "noun (plural)",
    meaning_en: "informational messages emitted by software or phones",
    meaning_vi: "các thông báo điện thoại / chuông báo",
    context_note: "Hàng loạt thông báo gây xao nhãng.",
  },
  "daily": {
    term: "daily",
    pronunciation: "/ˈdeɪli/",
    pos: "adjective / adverb",
    meaning_en: "done or occurring every day",
    meaning_vi: "hàng ngày / thường nhật",
    context_note: "Những xao nhãng hàng ngày.",
  },
  "attention": {
    term: "attention",
    pronunciation: "/əˈtɛnʃən/",
    pos: "noun",
    meaning_en: "notice taken of someone or something; focus",
    meaning_vi: "sự chú tâm trọn vẹn / tập trung",
    context_note: "Sự chú tâm trọn vẹn là món quà quý giá nhất bạn có thể dành cho người khác.",
  },
  "rarest": {
    term: "rarest",
    pronunciation: "/ˈreərɪst/",
    pos: "adjective (superlative)",
    meaning_en: "most uncommon or infrequent",
    meaning_vi: "hiếm hoi nhất / quý giá nhất",
    context_note: "Món quà hiếm hoi và quý giá nhất.",
  },
  "gifts": {
    term: "gifts",
    pronunciation: "/ɡɪfts/",
    pos: "noun (plural)",
    meaning_en: "things given willingly to someone without payment; presents",
    meaning_vi: "những món quà",
    context_note: "Món quà tinh thần.",
  },
  "gift": {
    term: "gift",
    pronunciation: "/ɡɪft/",
    pos: "noun",
    meaning_en: "a present",
    meaning_vi: "món quà",
    context_note: "Món quà.",
  },
  "speaking": {
    term: "speaking",
    pronunciation: "/ˈspiːkɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "saying words to express thoughts or feelings",
    meaning_vi: "đang nói chuyện / phát biểu",
    context_note: "Trong khi đối phương vẫn đang nói.",
  },
  "speak": {
    term: "speak",
    pronunciation: "/spiːk/",
    pos: "verb",
    meaning_en: "to say words",
    meaning_vi: "nói",
    context_note: "Nói.",
  },
  "putting": {
    term: "putting",
    pronunciation: "/ˈpʊtɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "placing in a specified position",
    meaning_vi: "cất đi / đặt xuống",
    context_note: "Cất điện thoại qua một bên để tập trung lắng nghe.",
  },
  "phone": {
    term: "phone",
    pronunciation: "/fəʊn/",
    pos: "noun",
    meaning_en: "a telephone / smartphone",
    meaning_vi: "điện thoại thông minh",
    context_note: "Điện thoại.",
  },
  "asking": {
    term: "asking",
    pronunciation: "/ˈɑːskɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "requesting information or asking questions",
    meaning_vi: "đặt ra (câu hỏi)",
    context_note: "Đặt thêm các câu hỏi tiếp nối.",
  },
  "ask": {
    term: "ask",
    pronunciation: "/ɑːsk/",
    pos: "verb",
    meaning_en: "to request information",
    meaning_vi: "hỏi / yêu cầu",
    context_note: "Hỏi.",
  },
  "questions": {
    term: "questions",
    pronunciation: "/ˈkwɛstʃənz/",
    pos: "noun (plural)",
    meaning_en: "sentences worded to elicit information",
    meaning_vi: "các câu hỏi",
    context_note: "Đặt các câu hỏi thấu hiểu.",
  },
  "question": {
    term: "question",
    pronunciation: "/ˈkwɛstʃən/",
    pos: "noun",
    meaning_en: "an inquiry",
    meaning_vi: "câu hỏi",
    context_note: "Câu hỏi.",
  },
  "heard": {
    term: "heard",
    pronunciation: "/hɜːd/",
    pos: "verb (past of hear)",
    meaning_en: "perceived with the ear",
    meaning_vi: "đã nghe / tiếp nhận",
    context_note: "Nhắc lại những gì mình vừa lắng nghe.",
  },
  "hear": {
    term: "hear",
    pronunciation: "/hɪər/",
    pos: "verb",
    meaning_en: "to perceive sound",
    meaning_vi: "nghe",
    context_note: "Nghe.",
  },
  "offering": {
    term: "offering",
    pronunciation: "/ˈɒfərɪŋ/",
    pos: "verb (-ing)",
    meaning_en: "presenting or giving advice",
    meaning_vi: "đưa ra (lời khuyên)",
    context_note: "Trước khi vội vàng đưa ra lời khuyên.",
  },
  "rarely": {
    term: "rarely",
    pronunciation: "/ˈreəli/",
    pos: "adverb",
    meaning_en: "not often; seldom",
    meaning_vi: "hiếm khi",
    context_note: "Mọi người hiếm khi nhớ từng câu chữ bạn nói.",
  },
  "remember": {
    term: "remember",
    pronunciation: "/rɪˈmɛmbər/",
    pos: "verb",
    meaning_en: "to have in or be able to bring to mind an awareness of",
    meaning_vi: "ghi nhớ / nhớ lại",
    context_note: "Họ luôn ghi nhớ cảm giác mà bạn mang lại cho họ.",
  },
  "timely": {
    term: "timely",
    pronunciation: "/ˈtaɪmli/",
    pos: "adjective",
    meaning_en: "done or occurring at a favorable or useful time",
    meaning_vi: "hợp thời / đúng lúc",
    context_note: "Lời khuyên của Warren Buffett chưa bao giờ hợp thời và đúng lúc hơn bây giờ.",
  },
  "technology": {
    term: "technology",
    pronunciation: "/tɛkˈnɒlədʒi/",
    pos: "noun",
    meaning_en: "the application of scientific knowledge for practical purposes",
    meaning_vi: "công nghệ",
    context_note: "Công nghệ sẽ tiếp tục chuyển đổi cách chúng ta làm việc.",
  },
  "continue": {
    term: "continue",
    pronunciation: "/kənˈtɪnjuː/",
    pos: "verb",
    meaning_en: "to persist in an activity or process",
    meaning_vi: "tiếp tục / không ngừng",
    context_note: "Tiếp tục phát triển.",
  },
  "transform": {
    term: "transform",
    pronunciation: "/trænsˈfɔːm/",
    pos: "verb",
    meaning_en: "to make a thorough or dramatic change in form or character",
    meaning_vi: "chuyển đổi / làm thay đổi",
    context_note: "Thay đổi phương thức làm việc.",
  },
  "authentic": {
    term: "authentic",
    pronunciation: "/ɔːˈθɛntɪk/",
    pos: "adjective",
    meaning_en: "of undisputed origin; genuine and real",
    meaning_vi: "chân thực / đích thực",
    context_note: "Giao tiếp chân thực giữa con người càng trở nên vô giá.",
  },
  "warren": {
    term: "Warren",
    pronunciation: "/ˈwɒrən/",
    pos: "proper noun",
    meaning_en: "Warren Buffett, famous investor and CEO of Berkshire Hathaway",
    meaning_vi: "Warren (Tỷ phú Warren Buffett)",
    context_note: "Nhà đầu tư huyền thoại Warren Buffett.",
  },
  "buffett": {
    term: "Buffett",
    pronunciation: "/ˈbʌfɪt/",
    pos: "proper noun",
    meaning_en: "Warren Buffett",
    meaning_vi: "Buffett (Tỷ phú Warren Buffett)",
    context_note: "Tỷ phú Warren Buffett.",
  },
  "stanford": {
    term: "Stanford",
    pronunciation: "/ˈstænfəd/",
    pos: "proper noun",
    meaning_en: "Stanford University, prestigious institution in California",
    meaning_vi: "Đại học Stanford (Mỹ)",
    context_note: "Trường Đại học Stanford danh tiếng tại Mỹ.",
  },
  "dale": {
    term: "Dale",
    pronunciation: "/deɪl/",
    pos: "proper noun",
    meaning_en: "Dale Carnegie, pioneer of leadership and interpersonal communication",
    meaning_vi: "Dale (Tác giả Dale Carnegie)",
    context_note: "Bậc thầy nghệ thuật giao tiếp Dale Carnegie.",
  },
  "carnegie": {
    term: "Carnegie",
    pronunciation: "/kɑːˈneɪɡi/",
    pos: "proper noun",
    meaning_en: "Dale Carnegie or Dale Carnegie Training institute",
    meaning_vi: "Carnegie (Học viện Dale Carnegie)",
    context_note: "Khóa đào tạo nghệ thuật diễn thuyết Dale Carnegie.",
  },
  "fast": {
    term: "Fast",
    pronunciation: "/fɑːst/",
    pos: "proper noun / adjective",
    meaning_en: "Fast Company, famous business & innovation media brand",
    meaning_vi: "Fast Company (Tạp chí kinh doanh)",
    context_note: "Tạp chí kinh doanh và đổi mới sáng tạo Fast Company.",
  },
  "company": {
    term: "company",
    pronunciation: "/ˈkʌmpəni/",
    pos: "noun",
    meaning_en: "a commercial business or organization",
    meaning_vi: "công ty / doanh nghiệp",
    context_note: "Doanh nghiệp hoặc tạp chí Fast Company.",
  },
  "marcel": {
    term: "Marcel",
    pronunciation: "/mɑːˈsɛl/",
    pos: "proper noun",
    meaning_en: "Marcel Schwantes, leadership author and contributor",
    meaning_vi: "Marcel (Tác giả bài báo)",
    context_note: "Chuyên gia nghiên cứu lãnh đạo Marcel Schwantes.",
  },
  "schwantes": {
    term: "Schwantes",
    pronunciation: "/ˈʃwɑːnts/",
    pos: "proper noun",
    meaning_en: "Marcel Schwantes",
    meaning_vi: "Schwantes (Chuyên gia nghiên cứu lãnh đạo)",
    context_note: "Tác giả bài phân tích chiến lược trên Fast Company.",
  },
  "ai": {
    term: "AI",
    pronunciation: "/ˌeɪ ˈaɪ/",
    pos: "noun (abbreviation)",
    meaning_en: "Artificial Intelligence",
    meaning_vi: "Trí tuệ nhân tạo (AI)",
    context_note: "Công nghệ trí tuệ nhân tạo trong thời đại mới.",
  },
  "greenland": {
    term: "Greenland",
    pronunciation: "/ˈɡriːnlənd/",
    pos: "proper noun",
    meaning_en: "vast island territory located between Arctic and Atlantic oceans",
    meaning_vi: "Đảo Greenland (Bắc Cực)",
    context_note: "Dải băng khổng lồ tại đảo Greenland.",
  },
  "alistair": {
    term: "Alistair",
    pronunciation: "/ˈælɪstər/",
    pos: "proper noun",
    meaning_en: "Dr. Alistair Vance, lead glaciologist",
    meaning_vi: "Alistair (Trưởng đoàn khảo sát)",
    context_note: "Tiến sĩ Alistair Vance.",
  },
  "vance": {
    term: "Vance",
    pronunciation: "/væns/",
    pos: "proper noun",
    meaning_en: "Dr. Vance",
    meaning_vi: "Vance (Tiến sĩ Địa chất)",
    context_note: "Tiến sĩ Alistair Vance.",
  },
  "alpha-4": {
    term: "Alpha-4",
    pronunciation: "/ˈælfə fɔːr/",
    pos: "proper noun",
    meaning_en: "Summit research station code Alpha-4",
    meaning_vi: "Trạm nghiên cứu Alpha-4",
    context_note: "Trạm nghiên cứu Summit Station Alpha-4.",
  },
  "g-4": {
    term: "G-4",
    pronunciation: "/dʒiː fɔːr/",
    pos: "proper noun",
    meaning_en: "designation of supraglacial lake G-4",
    meaning_vi: "Hồ Băng G-4",
    context_note: "Hồ nước băng trên mặt Supraglacial Lake G-4.",
  },
  "b-02": {
    term: "B-02",
    pronunciation: "/biː zɪərəʊ tuː/",
    pos: "proper noun",
    meaning_en: "seismic sensor unit B-02",
    meaning_vi: "Cảm biến địa chấn B-02",
    context_note: "Cảm biến địa chấn tự động B-02.",
  },
  "june": {
    term: "June",
    pronunciation: "/dʒuːn/",
    pos: "noun",
    meaning_en: "the sixth month of the year",
    meaning_vi: "tháng 6",
    context_note: "Ngày 14 tháng 6.",
  },
  "monitoring": {
    term: "monitoring",
    pronunciation: "/ˈmɒnɪtərɪŋ/",
    pos: "noun / verb (-ing)",
    meaning_en: "observing and checking the progress or quality of something",
    meaning_vi: "hoạt động giám sát / theo dõi liên tục",
    context_note: "Mạng lưới theo dõi và cảnh báo sớm.",
  },
  "audit": {
    term: "audit",
    pronunciation: "/ˈɔːdɪt/",
    pos: "noun",
    meaning_en: "an official inspection or verification of records",
    meaning_vi: "hồ sơ kiểm tra / đối chiếu dữ liệu",
    context_note: "Kiểm tra và đối chiếu tín hiệu vệ tinh và cảm biến viễn trắc.",
  },
  "witness": {
    term: "witness",
    pronunciation: "/ˈwɪtnɪs/",
    pos: "noun",
    meaning_en: "a person who sees an event take place",
    meaning_vi: "nhân chứng / người chứng kiến",
    context_note: "Lời khai của nhân chứng tại hiện trường.",
  },
  "statement": {
    term: "statement",
    pronunciation: "/ˈsteɪtmənt/",
    pos: "noun",
    meaning_en: "a definite or clear expression of something in speech or writing",
    meaning_vi: "lời khai / bản tuyên bố",
    context_note: "Lời khai khoa học.",
  },
  "memoir": {
    term: "memoir",
    pronunciation: "/ˈmɛmwɑːr/",
    pos: "noun",
    meaning_en: "a historical account or biography written from personal knowledge",
    meaning_vi: "hồi ký / lời đúc kết",
    context_note: "Hồi ký chia sẻ kinh nghiệm lãnh đạo.",
  },
  "executive": {
    term: "executive",
    pronunciation: "/ɪɡˈzɛkjʊtɪv/",
    pos: "noun / adjective",
    meaning_en: "relating to or having the power to put plans or actions into effect",
    meaning_vi: "cấp điều hành / lãnh đạo cấp cao",
    context_note: "Chiến lược điều hành và quản trị doanh nghiệp.",
  },
  "leadership": {
    term: "leadership",
    pronunciation: "/ˈliːdəʃɪp/",
    pos: "noun",
    meaning_en: "the action of leading a group or organization",
    meaning_vi: "năng lực lãnh đạo / sự dẫn dắt",
    context_note: "Năng lực lãnh đạo trong kỷ nguyên mới.",
  },
  "archive": {
    term: "archive",
    pronunciation: "/ˈɑːkaɪv/",
    pos: "noun",
    meaning_en: "a collection of historical documents or records",
    meaning_vi: "kho lưu trữ tài liệu",
    context_note: "Kho dữ liệu và tài liệu nghiên cứu.",
  },
  // === FULL CASE VOCABULARY EXTENSION (100% COMPLETE COVERAGE) ===
  "analyze": {
      "term": "analyze",
      "pronunciation": "/ˈænəlaɪz/",
      "pos": "verb",
      "meaning_en": "examine methodically and in detail the constitution or structure of something",
      "meaning_vi": "phân tích dữ liệu / mổ xẻ chi tiết",
      "context_note": "AI có thể phân tích bảng tính và dữ liệu số trong tích tắc.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "analyze là việc xem xét, bóc tách và phân tích kỹ lưỡng từng thành phần của một vấn đề hoặc dữ liệu để hiểu rõ bản chất.",
          "in_context_story": "Trong bài đọc, tác giả chỉ ra AI rất giỏi phân tích bảng tính (analyze spreadsheets) nhưng lại thiếu khả năng thấu hiểu cảm xúc con người.",
          "real_world_transfers": [
              {
                  "domain_label": "Tài chính & Dữ liệu",
                  "sentence": "Data analysts analyze financial trends to forecast quarterly revenue.",
                  "connection_note": "Phân tích xu hướng số liệu để đưa ra dự báo tài chính."
              }
          ],
          "retrieval_tip": "Dùng 'analyze' khi muốn diễn tả hành động nghiên cứu sâu, bóc tách dữ liệu có phương pháp."
      }
  },
  "plans": {
      "term": "plans",
      "pronunciation": "/plænz/",
      "pos": "noun (plural)",
      "meaning_en": "detailed proposals for doing or achieving something",
      "meaning_vi": "các kế hoạch / dự định",
      "context_note": "AI có thể phác thảo các bản kế hoạch kinh doanh trong vài giây.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Định danh các bản kế hoạch, lộ trình hoặc dự án được vạch ra từ trước.",
          "in_context_story": "AI có thể tạo ra các bản kế hoạch kinh doanh nhanh chóng nhưng cần con người thực thi."
      }
  },
  "produce": {
      "term": "produce",
      "pronunciation": "/prəˈdjuːs/",
      "pos": "verb",
      "meaning_en": "make or manufacture from components or raw materials",
      "meaning_vi": "tạo ra / sản xuất / sinh mã",
      "context_note": "AI có thể sinh mã nguồn phần mềm trong vài giây.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "produce là tạo ra hoặc làm xuất hiện một sản phẩm, tài liệu hay mã lệnh từ quá trình xử lý.",
          "in_context_story": "Ở đây, produce software code thể hiện năng lực sinh mã nguồn tự động của các mô hình AI.",
          "real_world_transfers": [
              {
                  "domain_label": "Công nghệ",
                  "sentence": "Generative models produce high-quality code snippets instantly.",
                  "connection_note": "Sinh ra mã lập trình tự động."
              }
          ]
      }
  },
  "marketing": {
      "term": "marketing",
      "pronunciation": "/ˈmɑːkɪtɪŋ/",
      "pos": "noun",
      "meaning_en": "the action or business of promoting and selling products or services",
      "meaning_vi": "tiếp thị / quảng bá thương hiệu",
      "context_note": "Nội dung tiếp thị và quảng cáo sản phẩm.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hoạt động tiếp thị, quảng bá nhằm thu hút khách hàng và xây dựng vị thế thương hiệu.",
          "in_context_story": "Marketing copy là các bài viết bán hàng và quảng bá mà AI có thể soạn thảo nhanh chóng."
      }
  },
  "skyrocketed": {
      "term": "skyrocketed",
      "pronunciation": "/ˈskaɪˌrɒkɪtɪd/",
      "pos": "verb (past)",
      "meaning_en": "increased rapidly and dramatically",
      "meaning_vi": "tăng vọt / tăng phi mã",
      "context_note": "Giá trị của kỹ năng giao tiếp con người đã tăng vọt trong kỷ nguyên AI.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "skyrocket ví như tên lửa phóng vút lên bầu trời — diễn tả sự tăng trưởng cực nhanh và đột biến về giá trị hoặc số lượng.",
          "in_context_story": "Tác giả nhấn mạnh giá trị của lời khuyên từ Buffett không hề giảm đi mà trái lại còn tăng vọt (skyrocketed) khi AI xuất hiện.",
          "real_world_transfers": [
              {
                  "domain_label": "Thị trường & Giá cả",
                  "sentence": "Demand for human leadership skills skyrocketed after the automation wave.",
                  "connection_note": "Nhu cầu tăng đột biến theo cấp số nhân."
              }
          ],
          "retrieval_tip": "Khi muốn mô tả giá trị hoặc số lượng tăng vọt theo phương thẳng đứng → Nghĩ đến 'SKYROCKET'."
      }
  },
  "communication": {
      "term": "communication",
      "pronunciation": "/kəˌmjuːnɪˈkeɪʃən/",
      "pos": "noun",
      "meaning_en": "the imparting or exchanging of information by speaking, writing, or using some other medium",
      "meaning_vi": "giao tiếp / năng lực truyền đạt",
      "context_note": "Năng lực giao tiếp như một con người thực thụ.",
      "depth": "deep",
      "humanized": {
          "simple_intuition": "communication là quá trình truyền đạt, kết nối và trao đổi thông điệp, cảm xúc và niềm tin giữa các chủ thể.",
          "in_context_story": "Trong bài viết của Schwantes và Buffett, giao tiếp không phải là nói nhiều mà là năng lực lắng nghe, thấu cảm và chuyển hóa sự phức tạp thành rõ ràng.",
          "real_world_transfers": [
              {
                  "domain_label": "Lãnh đạo",
                  "sentence": "Authentic communication builds enduring loyalty within high-stakes teams.",
                  "connection_note": "Giao tiếp chân thực tạo nên sự gắn kết bền chặt."
              }
          ],
          "nuance_warning": "Phân biệt 'communication' (giao tiếp hai chiều, tạo sự thấu hiểu) với 'broadcasting' (chỉ phát đi thông tin một chiều).",
          "retrieval_tip": "Dùng 'communication' khi nói về sự kết nối, truyền tải ý niệm và tạo dựng sự hiểu biết chung."
      }
  },
  "communications": {
      "term": "communications",
      "pronunciation": "/kəˌmjuːnɪˈkeɪʃənz/",
      "pos": "noun (plural/discipline)",
      "meaning_en": "the study or field of sharing and conveying information effectively",
      "meaning_vi": "ngành truyền thông / kỹ năng giao tiếp",
      "context_note": "Tấm bằng đào tạo kỹ năng giao tiếp Dale Carnegie năm 1952.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Chỉ lĩnh vực, khóa học hoặc chuyên ngành đào tạo kỹ năng giao tiếp và nghệ thuật truyền đạt.",
          "in_context_story": "Buffett treo tấm bằng tốt nghiệp khóa học giao tiếp (communications diploma) của Dale Carnegie."
      }
  },
  "advantage": {
      "term": "advantage",
      "pronunciation": "/ədˈvɑːntɪdʒ/",
      "pos": "noun",
      "meaning_en": "a condition or circumstance that puts one in a favorable or superior position",
      "meaning_vi": "lợi thế / điểm ưu việt",
      "context_note": "Trở thành lợi thế cạnh tranh thực sự.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "advantage là điểm mạnh hoặc điều kiện thuận lợi giúp một bên vượt trội hơn bên khác trong cùng một hoàn cảnh.",
          "in_context_story": "Trong kỷ nguyên AI, khả năng giao tiếp giữa người với người chính là lợi thế cạnh tranh thật sự (genuine competitive advantage).",
          "real_world_transfers": [
              {
                  "domain_label": "Chiến lược",
                  "sentence": "Speed of execution gives startups a distinct advantage over legacy corporations.",
                  "connection_note": "Tạo ưu thế vượt trội so với đối thủ."
              }
          ]
      }
  },
  "opportunity": {
      "term": "opportunity",
      "pronunciation": "/ˌɒpəˈtjuːnɪti/",
      "pos": "noun",
      "meaning_en": "a set of circumstances that makes it possible to do something",
      "meaning_vi": "cơ hội / thời cơ",
      "context_note": "Mỗi cuộc trò chuyện đều là cơ hội tạo dựng tầm ảnh hưởng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Thời cơ hoặc hoàn cảnh thuận lợi để hành động và tạo ra kết quả tích cực.",
          "in_context_story": "Mỗi buổi thuyết trình hay phỏng vấn đều là cơ hội để tạo dựng ảnh hưởng hoặc đánh mất nó."
      }
  },
  "skills": {
      "term": "skills",
      "pronunciation": "/skɪlz/",
      "pos": "noun (plural)",
      "meaning_en": "the abilities to do something well; expertise",
      "meaning_vi": "các kỹ năng / năng lực chuyên môn",
      "context_note": "Nếu không có kỹ năng giao tiếp tốt, bạn sẽ không thể thuyết phục người khác.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Tập hợp các năng lực hoặc kỹ năng được rèn luyện để thực hiện tốt một công việc.",
          "in_context_story": "Kỹ năng giao tiếp xuất sắc giúp biến ý tưởng thành hiện thực."
      }
  },
  "skill": {
      "term": "skill",
      "pronunciation": "/skɪl/",
      "pos": "noun",
      "meaning_en": "the ability to do something well",
      "meaning_vi": "kỹ năng",
      "context_note": "Giao tiếp là một kỹ năng kinh doanh mang tính chiến lược.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Một năng lực thuần thục đạt được qua học hỏi và rèn luyện.",
          "in_context_story": "Giao tiếp đã chuyển dịch từ soft skill thành strategic business skill."
      }
  },
  "shows": {
      "term": "shows",
      "pronunciation": "/ʃəʊz/",
      "pos": "verb (third person singular)",
      "meaning_en": "allows or causes to be visible; demonstrates",
      "meaning_vi": "chỉ ra / chứng minh",
      "context_note": "Nghiên cứu chỉ ra rằng người có tính tò mò sẽ xây dựng được niềm tin mạnh mẽ hơn.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động chỉ ra, minh chứng hoặc làm lộ rõ một sự thật thông qua dữ liệu hoặc thực tế.",
          "in_context_story": "Các nghiên cứu hành vi chỉ ra lợi ích của việc lắng nghe tích cực."
      }
  },
  "signs": {
      "term": "signs",
      "pronunciation": "/saɪnz/",
      "pos": "noun (plural)",
      "meaning_en": "indications that something exists or is happening",
      "meaning_vi": "các dấu hiệu / chỉ dấu",
      "context_note": "Gờ băng không hề có dấu hiệu tràn bờ hay sụp đổ.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Các hiện tượng hoặc vết tích cụ thể giúp nhận biết trạng thái của sự việc.",
          "in_context_story": "Không tìm thấy bất kỳ dấu hiệu nước tràn qua gờ băng bề mặt hồ."
      }
  },
  "trust": {
      "term": "trust",
      "pronunciation": "/trʌst/",
      "pos": "noun / verb",
      "meaning_en": "firm belief in the reliability, truth, ability, or strength of someone or something",
      "meaning_vi": "niềm tin / sự tin cậy",
      "context_note": "AI không thể tạo dựng được niềm tin giữa con người với nhau.",
      "depth": "deep",
      "humanized": {
          "simple_intuition": "trust là niềm tin chắc chắn vào sự trung thực, năng lực và chữ tín của người khác — thứ chỉ được xây dựng qua thời gian và sự nhất quán.",
          "in_context_story": "Tác giả chỉ ra AI có thể xử lý bảng tính nhưng không thể kiếm được niềm tin (earn trust) từ đồng nghiệp và đối tác.",
          "real_world_transfers": [
              {
                  "domain_label": "Quản trị",
                  "sentence": "High-trust organizations move faster and experience lower friction in decision making.",
                  "connection_note": "Niềm tin giúp tổ chức ra quyết định nhanh chóng và giảm xung đột."
              }
          ],
          "retrieval_tip": "Khi nói về sự tin tưởng cốt lõi làm nền tảng cho mọi mối quan hệ → Dùng 'TRUST'."
      }
  },
  "understand": {
      "term": "understand",
      "pronunciation": "/ˌʌndəˈstænd/",
      "pos": "verb",
      "meaning_en": "perceive the intended meaning of words, a language, or a person",
      "meaning_vi": "thấu hiểu / nắm bắt bản chất",
      "context_note": "Lắng nghe để thấu hiểu chứ không phải để phản bác.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "understand là nắm bắt trọn vẹn ý nghĩa, động cơ và cảm xúc ẩn sâu bên dưới thông điệp.",
          "in_context_story": "Quy tắc cốt lõi: 'Listen to understand, not to respond' — lắng nghe để thấu suốt lòng người.",
          "real_world_transfers": [
              {
                  "domain_label": "Tâm lý học",
                  "sentence": "Empathic leaders seek first to understand before seeking to be understood.",
                  "connection_note": "Chủ động thấu hiểu trước khi đòi hỏi người khác hiểu mình."
              }
          ]
      }
  },
  "listening": {
      "term": "listening",
      "pronunciation": "/ˈlɪsənɪŋ/",
      "pos": "noun / verb (-ing)",
      "meaning_en": "giving one's attention to a sound or message",
      "meaning_vi": "việc lắng nghe / sự lắng nghe",
      "context_note": "Lắng nghe chủ động là món quà hiếm hoi bạn có thể trao tặng cho người khác.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Tiến trình tập trung dồn sự chú ý để giải mã ý niệm và cảm xúc của người nói.",
          "in_context_story": "Active listening là hành động kìm nén phản xạ chen ngang để thấu hiểu câu chuyện của người khác."
      }
  },
  "listen": {
      "term": "listen",
      "pronunciation": "/ˈlɪsən/",
      "pos": "verb",
      "meaning_en": "give one's attention to a sound or speaker",
      "meaning_vi": "lắng nghe",
      "context_note": "Lắng nghe để thấu cảm.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Dành sự chú tâm lắng nghe người khác chia sẻ.",
          "in_context_story": "Lắng nghe với tinh thần cởi mở và không định kiến."
      }
  },
  "reading": {
      "term": "reading",
      "pronunciation": "/ˈriːdɪŋ/",
      "pos": "noun",
      "meaning_en": "a measurement indicated on an instrument, or the action of reading",
      "meaning_vi": "chỉ số đo lường / việc đọc",
      "context_note": "Ghi nhận chỉ số nhiệt độ nước đo thủ công là 0.4°C.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Chỉ số hoặc giá trị đo được hiển thị trên thiết bị đo đạc khoa học.",
          "in_context_story": "Dr. Vance ghi nhận chỉ số nhiệt độ nước (water temperature reading) là 0.4°C lúc 02:10 AM."
      }
  },
  "results": {
      "term": "results",
      "pronunciation": "/rɪˈzʌlts/",
      "pos": "noun (plural)",
      "meaning_en": "consequences, outcomes, or products of something",
      "meaning_vi": "kết quả / thành quả",
      "context_note": "Mọi thành quả trong cuộc đời bạn sẽ được nhân lên gấp bội.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Những thành tựu, giá trị hoặc kết quả đạt được từ nỗ lực và hành động.",
          "in_context_story": "Buffett khẳng định kết quả cuộc đời (results in life) sẽ được khuếch đại nhờ giao tiếp."
      }
  },
  "fastest": {
      "term": "fastest",
      "pronunciation": "/ˈfɑːstɪst/",
      "pos": "adjective (superlative)",
      "meaning_en": "moving or operating at highest speed",
      "meaning_vi": "nhanh nhất",
      "context_note": "Cách nhanh nhất để phá hỏng giao tiếp là suy đoán định kiến.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Chỉ phương thức hoặc con đường có tốc độ diễn ra nhanh nhất.",
          "in_context_story": "Giả định chủ quan là con đường ngắn nhất và nhanh nhất làm đổ vỡ một cuộc đối thoại."
      }
  },
  "stronger": {
      "term": "stronger",
      "pronunciation": "/ˈstrɒŋər/",
      "pos": "adjective (comparative)",
      "meaning_en": "having greater power, intensity, or durability",
      "meaning_vi": "vững chắc hơn / mạnh mẽ hơn",
      "context_note": "Xây dựng những mối quan hệ bền chặt và gắn kết hơn.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Có mức độ bền vững, tin cậy hoặc sức mạnh cao hơn so với thông thường.",
          "in_context_story": "Sự tò mò chân thành giúp tạo nên các mối quan hệ bền vững hơn (stronger relationships)."
      }
  },
  "strategic": {
      "term": "strategic",
      "pronunciation": "/strəˈtiːdʒɪk/",
      "pos": "adjective",
      "meaning_en": "relating to the identification of long-term aims and interests",
      "meaning_vi": "mang tính chiến lược / có tầm nhìn dài hạn",
      "context_note": "Giao tiếp đã trở thành một kỹ năng kinh doanh mang tính chiến lược cốt lõi.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "strategic là những gì liên quan đến định hướng dài hạn, tạo ra lợi thế cạnh tranh bền vững và quyết định sự sống còn của tổ chức.",
          "in_context_story": "Tác giả chỉ ra giao tiếp không còn là kỹ năng bổ trợ phụ mà là kỹ năng chiến lược quyết định thành bại.",
          "real_world_transfers": [
              {
                  "domain_label": "Quản trị",
                  "sentence": "Strategic investments focus on core competencies that compound over decades.",
                  "connection_note": "Đầu tư mang tính chiến lược dài hạn."
              }
          ]
      }
  },
  "sub-glacial": {
      "term": "sub-glacial",
      "pronunciation": "/sʌbˈɡleɪʃəl/",
      "pos": "adjective",
      "meaning_en": "occurring or situated underneath a glacier or ice sheet",
      "meaning_vi": "dưới tầng băng / đáy sông băng",
      "context_note": "Các cảm biến áp suất dưới đáy băng tầng ghi nhận sóng xung kích lớn.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Nằm ở vị trí bên dưới đáy của khối băng vĩnh cửu hoặc sông băng khổng lồ.",
          "in_context_story": "Cảm biến áp suất ngầm dưới đáy băng (sub-glacial sensors) phát hiện rung chấn lúc 03:12 AM."
      }
  },
  "supraglacial": {
      "term": "supraglacial",
      "pronunciation": "/ˌsuːprəˈɡleɪʃəl/",
      "pos": "adjective",
      "meaning_en": "situated on the surface of a glacier",
      "meaning_vi": "trên bề mặt băng tầng",
      "context_note": "Hồ nước nằm trên bề mặt dải băng Greenland.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Tồn tại hoặc hình thành ngay trên lớp mặt trên cùng của khối băng khổng lồ.",
          "in_context_story": "Hồ G-4 là một hồ nước mặt băng tầng (supraglacial lake) chứa 8 triệu m³ nước."
      }
  },
  "warming": {
      "term": "warming",
      "pronunciation": "/ˈwɔːmɪŋ/",
      "pos": "noun",
      "meaning_en": "the process of becoming warmer",
      "meaning_vi": "sự ấm lên / gia nhiệt",
      "context_note": "Sự nóng lên của địa chất ngầm.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Quá trình gia tăng nhiệt độ của môi trường hoặc vật thể.",
          "in_context_story": "Giả thuyết về sự ấm lên dưới đáy băng bị bác bỏ do nhiệt độ đo được là -1.8°C."
      }
  },
  "business": {
      "term": "business",
      "pronunciation": "/ˈbɪznɪs/",
      "pos": "noun",
      "meaning_en": "commercial activity or enterprise",
      "meaning_vi": "kinh doanh / doanh nghiệp",
      "context_note": "Kế hoạch kinh doanh và hoạt động thương mại.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hoạt động thương mại, kinh doanh hoặc doanh nghiệp.",
          "in_context_story": "Giao tiếp là kỹ năng kinh doanh chiến lược trong kỷ nguyên số."
      }
  },
  "buy": {
      "term": "buy",
      "pronunciation": "/baɪ/",
      "pos": "verb",
      "meaning_en": "obtain in exchange for payment, or accept as trustworthy",
      "meaning_vi": "mua sắm / đặt niềm tin vào",
      "context_note": "Khách hàng không mua sản phẩm đơn thuần — họ mua sự an tâm và niềm tin.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "buy ngoài nghĩa đen là trả tiền mua đồ, trong kinh doanh còn mang nghĩa 'chấp nhận và đặt trọn niềm tin' vào một giải pháp hoặc con người.",
          "in_context_story": "Tác giả chỉ ra: 'Customers don't buy products—they buy confidence.' (Khách hàng mua sự an tâm).",
          "real_world_transfers": [
              {
                  "domain_label": "Bán hàng & Đàm phán",
                  "sentence": "Stakeholders buy into the leader's long-term vision before funding execution.",
                  "connection_note": "Đặt trọn niềm tin và sự đồng thuận vào tầm nhìn."
              }
          ]
      }
  },
  "change": {
      "term": "change",
      "pronunciation": "/tʃeɪndʒ/",
      "pos": "verb / noun",
      "meaning_en": "make or become different",
      "meaning_vi": "thay đổi / chuyển biến",
      "context_note": "Sự tò mò chân thành làm thay đổi hoàn toàn tính chất cuộc trò chuyện.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động làm thay đổi cục diện hoặc chuyển biến trạng thái từ dạng này sang dạng khác.",
          "in_context_story": "Curiosity changes the conversation — sự tò mò chân thành đổi hướng cuộc trò chuyện từ đối đầu sang thấu hiểu."
      }
  },
  "changes": {
      "term": "changes",
      "pronunciation": "/tʃeɪndʒɪz/",
      "pos": "verb (third person singular) / noun (plural)",
      "meaning_en": "makes or becomes different; alterations",
      "meaning_vi": "làm thay đổi / những sự đổi thay",
      "context_note": "Sự tò mò làm thay đổi cục diện cuộc đối thoại.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Tác động làm chuyển biến hoặc tạo ra sự khác biệt tích cực.",
          "in_context_story": "Curiosity changes the conversation."
      }
  },
  "code": {
      "term": "code",
      "pronunciation": "/kəʊd/",
      "pos": "noun",
      "meaning_en": "instructions written in a programming language",
      "meaning_vi": "mã nguồn lập trình",
      "context_note": "Mã nguồn phần mềm máy tính.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Đoạn mã lệnh được viết bằng ngôn ngữ lập trình để máy tính thực thi.",
          "in_context_story": "AI có thể viết mã nguồn phần mềm nhưng không thể truyền cảm hứng cho đồng đội."
      }
  },
  "conversation": {
      "term": "conversation",
      "pronunciation": "/ˌkɒnvəˈseɪʃən/",
      "pos": "noun",
      "meaning_en": "a talk between two or more people",
      "meaning_vi": "cuộc trò chuyện / cuộc đối thoại",
      "context_note": "Mỗi cuộc trò chuyện là một cơ hội để tạo dựng uy tín.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Cuộc đối thoại trao đổi trực tiếp giữa hai hay nhiều người.",
          "in_context_story": "Biến việc phản hồi và góp ý thành một cuộc trò chuyện thường nhật."
      }
  },
  "copy": {
      "term": "copy",
      "pronunciation": "/ˈkɒpi/",
      "pos": "noun",
      "meaning_en": "text written for advertising, or a reproduction",
      "meaning_vi": "nội dung bài viết quảng cáo / bản sao",
      "context_note": "Nội dung quảng cáo tiếp thị.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Bản thảo nội dung chữ được viết chuyên biệt cho mục đích quảng bá hoặc truyền thông.",
          "in_context_story": "AI có thể viết marketing copy nhanh chóng trong vài giây."
      }
  },
  "crack": {
      "term": "crack",
      "pronunciation": "/kræk/",
      "pos": "noun / verb",
      "meaning_en": "a line on a surface along which it has split without breaking into parts",
      "meaning_vi": "vết rạn nứt",
      "context_note": "Vết rạn nứt băng chính mở toang lập tức lúc 03:12 AM.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Vết rạn vỡ hoặc đường nứt xuất hiện trên bề mặt chất rắn do áp lực lớn.",
          "in_context_story": "Vết nứt băng chính mở toang xuyên thủng 850m tầng băng."
      }
  },
  "create": {
      "term": "create",
      "pronunciation": "/kriˈeɪt/",
      "pos": "verb",
      "meaning_en": "bring something into existence",
      "meaning_vi": "tạo ra / thiết lập",
      "context_note": "Tạo ra sức ảnh hưởng hoặc đánh mất nó.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động làm xuất hiện hoặc xây dựng nên một giá trị mới.",
          "in_context_story": "Mỗi cuộc trò chuyện là cơ hội để tạo ra tầm ảnh hưởng (create influence)."
      }
  },
  "feel": {
      "term": "feel",
      "pronunciation": "/fiːl/",
      "pos": "verb",
      "meaning_en": "experience an emotion or sensation",
      "meaning_vi": "cảm thấy / cảm nhận",
      "context_note": "Người ta sẽ luôn nhớ cách bạn làm cho họ cảm thấy như thế nào.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Trải nghiệm cảm xúc hoặc nhận thức nội tâm sâu sắc.",
          "in_context_story": "Mọi người có thể quên lời bạn nói, nhưng sẽ nhớ mãi cảm giác bạn mang lại cho họ."
      }
  },
  "follow": {
      "term": "follow",
      "pronunciation": "/ˈfɒləʊ/",
      "pos": "verb",
      "meaning_en": "go or come after; support or accept the leadership of",
      "meaning_vi": "đi theo / đồng hành cùng lãnh đạo",
      "context_note": "Thuyết phục mọi người tin tưởng và đi theo tầm nhìn của bạn.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Đồng hành, ủng hộ và đi theo sự dẫn dắt của một nhà lãnh đạo có tầm nhìn.",
          "in_context_story": "Nếu không biết truyền đạt, bạn sẽ không thể thuyết phục người khác đi theo bạn (convince people to follow you)."
      }
  },
  "goal": {
      "term": "goal",
      "pronunciation": "/ɡəʊl/",
      "pos": "noun",
      "meaning_en": "the object of a person's ambition or effort; an aim or desired result",
      "meaning_vi": "mục tiêu cuối cùng / đích đến",
      "context_note": "Mục tiêu cuối cùng của việc phản hồi là sự rõ ràng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Đích đến hoặc kết quả mong đợi mà mọi nỗ lực hướng tới.",
          "in_context_story": "Mục tiêu tối thượng của việc góp ý là mang lại sự rõ ràng và định hướng hành động."
      }
  },
  "good": {
      "term": "good",
      "pronunciation": "/ɡʊd/",
      "pos": "adjective",
      "meaning_en": "to be desired or approved of; having high standard",
      "meaning_vi": "tốt / xuất sắc",
      "context_note": "Kỹ năng giao tiếp xuất sắc.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Đạt tiêu chuẩn cao, mang lại giá trị tích cực và hiệu quả.",
          "in_context_story": "Kỹ năng giao tiếp tốt là điều kiện tiên quyết để lãnh đạo thành công."
      }
  },
  "heat": {
      "term": "heat",
      "pronunciation": "/hiːt/",
      "pos": "noun",
      "meaning_en": "the quality of being hot; high temperature",
      "meaning_vi": "nhiệt lượng / nhiệt địa chất",
      "context_note": "Nhiệt địa chất dưới đáy băng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Năng lượng nhiệt toả ra làm tăng nhiệt độ của môi trường xung quanh.",
          "in_context_story": "Nhiệt địa chất (geothermal heat) từ lớp đá đáy băng."
      }
  },
  "ice": {
      "term": "ice",
      "pronunciation": "/aɪs/",
      "pos": "noun",
      "meaning_en": "frozen water, a brittle transparent crystalline solid",
      "meaning_vi": "băng tuyết / tầng băng",
      "context_note": "Tầng băng dày 850m tại Greenland.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Khối nước đóng băng dạng rắn ở vùng cực hoặc sông băng.",
          "in_context_story": "Tầng băng dày đặc 850m bao phủ toàn bộ vùng trũng hồ Greenland."
      }
  },
  "keep": {
      "term": "keep",
      "pronunciation": "/kiːp/",
      "pos": "verb",
      "meaning_en": "continue or cause to continue in a specified condition",
      "meaning_vi": "duy trì / tiếp tục phát huy",
      "context_note": "Tôi nên tiếp tục duy trì và phát huy điều gì?",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Duy trì liên tục một hành động hoặc trạng thái tốt đẹp.",
          "in_context_story": "Câu hỏi phản hồi quan trọng: 'Tôi nên tiếp tục làm tốt điều gì?' (What should I keep doing?)."
      }
  },
  "know": {
      "term": "know",
      "pronunciation": "/nəʊ/",
      "pos": "verb",
      "meaning_en": "be aware of through observation, inquiry, or information",
      "meaning_vi": "biết / hiểu rõ",
      "context_note": "Mọi người luôn muốn biết điều gì đang hoạt động hiệu quả.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Nắm bắt thông tin và hiểu rõ thực trạng vấn đề.",
          "in_context_story": "Nhân viên luôn muốn biết rõ định hướng và kết quả công việc của mình."
      }
  },
  "laboratory": {
      "term": "laboratory",
      "pronunciation": "/ləˈbɒrətəri/",
      "pos": "noun",
      "meaning_en": "a room or building equipped for scientific experiments",
      "meaning_vi": "phòng thí nghiệm / trạm nghiên cứu",
      "context_note": "Phòng thí nghiệm tại trạm nghiên cứu Alpha-4.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Không gian làm việc được trang bị máy móc chuyên dụng cho nghiên cứu khoa học.",
          "in_context_story": "Dr. Vance ở trong phòng thí nghiệm trạm Alpha-4 đến khi còi báo động vang lên."
      }
  },
  "lake": {
      "term": "lake",
      "pronunciation": "/leɪk/",
      "pos": "noun",
      "meaning_en": "a large body of water surrounded by land or ice",
      "meaning_vi": "hồ nước / hồ băng",
      "context_note": "Hồ băng G-4 chứa 8 triệu m³ nước.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Vùng trũng chứa khối lượng lớn nước trên mặt đất hoặc bề mặt băng tầng.",
          "in_context_story": "Hồ băng G-4 biến mất hoàn toàn chỉ sau 90 phút xả đáy."
      }
  },
  "level": {
      "term": "level",
      "pronunciation": "/ˈlɛvəl/",
      "pos": "noun",
      "meaning_en": "a horizontal plane or height of something",
      "meaning_vi": "mực nước / mức độ",
      "context_note": "Mực nước hồ sụt giảm nhanh chóng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Độ cao của mặt nước hoặc thang đo mức độ của một hiện tượng.",
          "in_context_story": "Cảm biến ghi nhận mực nước hồ (water level) tụt dốc không phanh."
      }
  },
  "life": {
      "term": "life",
      "pronunciation": "/laɪf/",
      "pos": "noun",
      "meaning_en": "the existence of an individual human being",
      "meaning_vi": "cuộc sống / cuộc đời",
      "context_note": "Mọi thành quả trong cuộc đời bạn sẽ được nhân lên gấp bội.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Toàn bộ tiến trình sống, sự nghiệp và trải nghiệm của một con người.",
          "in_context_story": "Thành tựu cuộc đời (results in life) được khuếch đại nhờ tài năng giao tiếp."
      }
  },
  "likely": {
      "term": "likely",
      "pronunciation": "/ˈlaɪkli/",
      "pos": "adverb / adjective",
      "meaning_en": "probable; such as well might happen",
      "meaning_vi": "nhiều khả năng / có thể",
      "context_note": "Nhiều khả năng là do nhiệt núi lửa ngầm.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Diễn tả khả năng xảy ra cao của một giả thuyết hoặc sự kiện.",
          "in_context_story": "Sự cố thoát nước nhiều khả năng do cơ chế đứt gãy thủy lực."
      }
  },
  "logged": {
      "term": "logged",
      "pronunciation": "/lɒɡd/",
      "pos": "verb (past)",
      "meaning_en": "recorded systematically in a log or record book",
      "meaning_vi": "đã ghi nhật ký / ghi nhận dữ liệu",
      "context_note": "Đã ghi nhận chỉ số nhiệt độ nước lúc 02:10 AM.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động ghi chép dữ liệu đo đạc vào sổ nhật ký nghiên cứu.",
          "in_context_story": "Dr. Vance ghi nhận chỉ số đo nhiệt độ nước vào hệ thống trạm Alpha-4."
      }
  },
  "long": {
      "term": "long",
      "pronunciation": "/lɒŋ/",
      "pos": "adverb / adjective",
      "meaning_en": "for a considerable time, or long before",
      "meaning_vi": "từ rất lâu trước đó",
      "context_note": "Buffett đã thấu hiểu nguyên lý này từ rất lâu trước khi AI xuất hiện.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Khoảng thời gian dài hoặc thời điểm diễn ra từ rất sớm trong quá khứ.",
          "in_context_story": "Buffett hiểu rõ sức mạnh của giao tiếp từ rất lâu trước thời đại AI."
      }
  },
  "lose": {
      "term": "lose",
      "pronunciation": "/luːz/",
      "pos": "verb",
      "meaning_en": "be deprived of or cease to have or retain",
      "meaning_vi": "đánh mất (tầm ảnh hưởng)",
      "context_note": "Mỗi cuộc trò chuyện là cơ hội tạo dựng hoặc đánh mất tầm ảnh hưởng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động để tuột mất hoặc làm suy giảm một giá trị hay vị thế.",
          "in_context_story": "Giao tiếp kém cỏi khiến bạn đánh mất niềm tin và sức ảnh hưởng."
      }
  },
  "make": {
      "term": "make",
      "pronunciation": "/meɪk/",
      "pos": "verb",
      "meaning_en": "form by putting parts together or causing a state",
      "meaning_vi": "làm cho / tạo nên",
      "context_note": "Làm cho người khác cảm thấy được thấu hiểu.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Tạo ra một tác động khiến đối phương chuyển sang trạng thái cảm xúc mới.",
          "in_context_story": "Làm cho một con người cảm thấy thực sự được tôn trọng và thấu hiểu."
      }
  },
  "manual": {
      "term": "manual",
      "pronunciation": "/ˈmænjʊəl/",
      "pos": "adjective",
      "meaning_en": "using human effort, not automated",
      "meaning_vi": "thủ công / bằng tay",
      "context_note": "Chỉ số đo nhiệt độ nước bằng tay là 0.4°C.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Thực hiện trực tiếp bằng sức người, không qua máy móc tự động.",
          "in_context_story": "Phép đo nhiệt độ nước thủ công (manual reading) do Dr. Vance tự tay thực hiện."
      }
  },
  "means": {
      "term": "means",
      "pronunciation": "/miːnz/",
      "pos": "verb (third person) / noun",
      "meaning_en": "signifies or conveys; or an action by which result is achieved",
      "meaning_vi": "có nghĩa là / phương tiện",
      "context_note": "Lắng nghe chủ động có nghĩa là kìm nén phản xạ vội vàng đáp lời.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Chỉ ý nghĩa cốt lõi hoặc định nghĩa hành vi thực chất.",
          "in_context_story": "Lắng nghe tích cực có nghĩa là gác lại điện thoại và tập trung trọn vẹn."
      }
  },
  "melted": {
      "term": "melted",
      "pronunciation": "/ˈmɛltɪd/",
      "pos": "verb (past)",
      "meaning_en": "became liquefied by heat",
      "meaning_vi": "đã làm tan chảy",
      "context_note": "Nhiệt lượng làm tan chảy một đường thoát nước lên trên.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Trạng thái chất rắn biến đổi thành chất lỏng dưới tác động của nhiệt.",
          "in_context_story": "Băng tầng bị tan chảy tạo thành dòng chảy xiết."
      }
  },
  "multiplier": {
      "term": "multiplier",
      "pronunciation": "/ˈmʌltɪplaɪər/",
      "pos": "noun",
      "meaning_en": "a factor by which a quantity is multiplied",
      "meaning_vi": "hệ số nhân / đòn bẩy khuếch đại",
      "context_note": "Hệ số nhân chiến lược trong thời đại số.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Yếu tố làm nhân gấp nhiều lần giá trị ban đầu thay vì chỉ cộng dồn.",
          "in_context_story": "Giao tiếp là hệ số nhân giúp khuếch đại toàn bộ các kỹ năng kỹ thuật khác."
      }
  },
  "path": {
      "term": "path",
      "pronunciation": "/pɑːθ/",
      "pos": "noun",
      "meaning_en": "a way or track laid down for walking or flowing",
      "meaning_vi": "con đường / đường dẫn nước",
      "context_note": "Làm tan chảy mở ra một đường dẫn nước từ đáy lên.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Lối đi hoặc đường dẫn để dòng chảy di chuyển qua.",
          "in_context_story": "Dòng nước xả thẳng theo đường nứt gãy xuyên qua 850m băng."
      }
  },
  "people": {
      "term": "people",
      "pronunciation": "/ˈpiːpəl/",
      "pos": "noun (plural)",
      "meaning_en": "human beings in general or considered collectively",
      "meaning_vi": "mọi người / con người",
      "context_note": "Thuyết phục mọi người đồng hành cùng bạn.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Tập thể con người hoặc cộng đồng xung quanh.",
          "in_context_story": "Lãnh đạo xuất sắc là người biết cách tập hợp và truyền cảm hứng cho mọi người."
      }
  },
  "performance": {
      "term": "performance",
      "pronunciation": "/pəˈfɔːməns/",
      "pos": "noun",
      "meaning_en": "the action or process of carrying out a task; functioning",
      "meaning_vi": "hiệu suất / năng lực thực hiện",
      "context_note": "Đánh giá hiệu suất làm việc định kỳ hàng năm.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hiệu quả và chất lượng hoàn thành công việc của cá nhân hoặc tổ chức.",
          "in_context_story": "Không nên chỉ đợi đến đợt đánh giá hiệu suất cuối năm mới đưa ra lời góp ý."
      }
  },
  "person": {
      "term": "person",
      "pronunciation": "/ˈpɜːsən/",
      "pos": "noun",
      "meaning_en": "a human being regarded as an individual",
      "meaning_vi": "một cá nhân / một con người",
      "context_note": "Món quà quý giá nhất bạn có thể trao cho một người là sự chú tâm lắng nghe.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Một cá nhân con người độc lập.",
          "in_context_story": "Đặt sự thành công và phát triển của từng cá nhân lên hàng đầu."
      }
  },
  "pitch": {
      "term": "pitch",
      "pronunciation": "/pɪtʃ/",
      "pos": "noun",
      "meaning_en": "a form of words used when trying to persuade someone to buy or accept",
      "meaning_vi": "bài thuyết trình thuyết phục",
      "context_note": "Bài thuyết trình bán hàng hoặc kêu gọi đầu tư.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Bài nói ngắn gọn nhằm thuyết phục đối tác mua hàng hoặc rót vốn.",
          "in_context_story": "Sales pitch là cơ hội thể hiện năng lực kết nối và tạo dựng niềm tin."
      }
  },
  "respond": {
      "term": "respond",
      "pronunciation": "/rɪˈspɒnd/",
      "pos": "verb",
      "meaning_en": "say something in reply; react",
      "meaning_vi": "đáp lời / phản hồi",
      "context_note": "Lắng nghe để thấu hiểu chứ không phải để vội vàng đáp lời.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động trả lời hoặc phản ứng lại lời nói của đối phương.",
          "in_context_story": "Đừng vội vàng nghĩ cách đáp lời khi người khác chưa nói hết câu."
      }
  },
  "response": {
      "term": "response",
      "pronunciation": "/rɪˈspɒns/",
      "pos": "noun",
      "meaning_en": "a verbal or written answer; a reaction",
      "meaning_vi": "câu trả lời / sự phản hồi",
      "context_note": "Kìm nén việc soạn sẵn câu trả lời trong đầu.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Lời hồi đáp hoặc phản ứng trước một thông điệp.",
          "in_context_story": "Nhiều người có thói quen chuẩn bị sẵn câu phản hồi thay vì thực sự chú tâm nghe."
      }
  },
  "said": {
      "term": "said",
      "pronunciation": "/sɛd/",
      "pos": "verb (past)",
      "meaning_en": "uttered words so as to convey information",
      "meaning_vi": "đã nói",
      "context_note": "Người ta hiếm khi nhớ từng từ bạn đã nói, nhưng sẽ nhớ cảm xúc bạn đem lại.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Lời nói đã được phát ra trong quá khứ.",
          "in_context_story": "Lời bạn đã nói có thể phai mờ, nhưng cảm xúc và niềm tin sẽ đọng lại lâu dài."
      }
  },
  "sales": {
      "term": "sales",
      "pronunciation": "/seɪlz/",
      "pos": "noun",
      "meaning_en": "the exchange of a commodity for money; activities in selling",
      "meaning_vi": "bán hàng / kinh doanh",
      "context_note": "Hoạt động bán hàng và thuyết phục khách hàng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hoạt động giao thương và bán sản phẩm ra thị trường.",
          "in_context_story": "Trong bán hàng, khách hàng mua sự tự tin trước khi mua sản phẩm."
      }
  },
  "save": {
      "term": "save",
      "pronunciation": "/seɪv/",
      "pos": "verb",
      "meaning_en": "keep safe or reserve for future use",
      "meaning_vi": "dành dụm / để dành",
      "context_note": "Lãnh đạo xuất sắc không để dành phản hồi cho đến đợt đánh giá cuối năm.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Giữ lại hoặc để dành một thứ gì đó cho một dịp đặc biệt.",
          "in_context_story": "Không nên để dành (don't save) những lời góp ý quý giá cho các kỳ đánh giá hàng năm."
      }
  },
  "says": {
      "term": "says",
      "pronunciation": "/sɛz/",
      "pos": "verb (third person singular)",
      "meaning_en": "utters words so as to convey information",
      "meaning_vi": "nói rằng / khẳng định",
      "context_note": "Khi Buffett nói rằng thành quả cuộc đời bạn sẽ được nhân lên gấp bội.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động phát biểu, chia sẻ hoặc khẳng định quan điểm.",
          "in_context_story": "Buffett khẳng định kỹ năng giao tiếp là đòn bẩy lãi kép của sự nghiệp."
      }
  },
  "see": {
      "term": "see",
      "pronunciation": "/siː/",
      "pos": "verb",
      "meaning_en": "perceive with the eyes; discern visually or understand mentally",
      "meaning_vi": "nhìn thấy / nhận thức được",
      "context_note": "Dù bạn nhìn thấu qua bên kia ngọn núi nhưng người khác chưa nhận thấy.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Nhìn thấy bằng mắt hoặc thấu hiểu một tầm nhìn chiến lược trong tư duy.",
          "in_context_story": "Lãnh đạo có thể nhìn thấy tương lai nhưng cần giao tiếp để người khác cùng thấy."
      }
  },
  "sheet": {
      "term": "sheet",
      "pronunciation": "/ʃiːt/",
      "pos": "noun",
      "meaning_en": "an extensive expanse or layer of something (e.g. ice)",
      "meaning_vi": "dải băng / tấm băng tầng",
      "context_note": "Dải băng Greenland có độ dày 850m.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Khối băng vĩnh cửu rộng lớn trải dài hàng ngàn cây số vuông.",
          "in_context_story": "Dải băng Greenland (ice sheet) chứa trữ lượng băng khổng lồ của bán cầu Bắc."
      }
  },
  "shore": {
      "term": "shore",
      "pronunciation": "/ʃɔːr/",
      "pos": "noun",
      "meaning_en": "the land along the edge of a body of water",
      "meaning_vi": "bờ hồ / mép băng",
      "context_note": "Bờ hồ phía Nam hoàn toàn ổn định và không có vết nứt.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Dải đất hoặc gờ băng viền quanh mép hồ nước.",
          "in_context_story": "Bờ phía Nam của hồ băng G-4 không ghi nhận bất kỳ dấu vết rạn nứt bề mặt nào."
      }
  },
  "simply": {
      "term": "simply",
      "pronunciation": "/ˈsɪmpli/",
      "pos": "adverb",
      "meaning_en": "merely; purely; easily and plainly",
      "meaning_vi": "đơn thuần / đơn giản là",
      "context_note": "Những mối quan hệ mà AI đơn giản là không thể sao chép được.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Diễn tả sự thuần túy hoặc không có ngoại lệ.",
          "in_context_story": "AI đơn thuần không thể thay thế sự ấm áp và thấu cảm giữa người với người."
      }
  },
  "soft": {
      "term": "soft",
      "pronunciation": "/sɒft/",
      "pos": "adjective",
      "meaning_en": "easy to mold, or relating to interpersonal rather than technical skills",
      "meaning_vi": "mềm (kỹ năng con người)",
      "context_note": "Không chỉ dừng lại là một kỹ năng mềm.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Chỉ các kỹ năng thiên về con người, giao tiếp và trí tuệ cảm xúc.",
          "in_context_story": "Giao tiếp đã chuyển hóa từ kỹ năng mềm (soft skill) sang kỹ năng kinh doanh sống còn."
      }
  },
  "solid": {
      "term": "solid",
      "pronunciation": "/ˈsɒlɪd/",
      "pos": "adjective",
      "meaning_en": "firm and stable in shape; not liquid or fluid",
      "meaning_vi": "đặc / vững chắc",
      "context_note": "Khối băng đặc cách bề mặt 200m bên dưới lòng hồ.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Có kết cấu rắn chắc, liền khối và không có bọt khí hay rạn vỡ.",
          "in_context_story": "Vết nứt vi mô xuất hiện bên trong khối băng đặc dày hàng trăm mét."
      }
  },
  "someone": {
      "term": "someone",
      "pronunciation": "/ˈsʌmwʌn/",
      "pos": "pronoun",
      "meaning_en": "an unknown or unspecified person",
      "meaning_vi": "một ai đó",
      "context_note": "Giả định rằng bạn đã biết ai đó đang nghĩ gì.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Một người nào đó trong tình huống giao tiếp.",
          "in_context_story": "Đừng vội cho rằng bạn đã thấu hiểu suy nghĩ của người khác."
      }
  },
  "stable": {
      "term": "stable",
      "pronunciation": "/ˈsteɪbəl/",
      "pos": "adjective",
      "meaning_en": "not likely to change or fail; firmly established",
      "meaning_vi": "ổn định / vững vàng",
      "context_note": "Bề mặt băng hoàn toàn ổn định trước 01:30 AM.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Ở trạng thái cân bằng, không có dấu hiệu dao động hay sụp đổ.",
          "in_context_story": "Mặt băng hồ G-4 hoàn toàn ổn định trước khi xảy ra đứt gãy thủy lực."
      }
  },
  "stay": {
      "term": "stay",
      "pronunciation": "/steɪ/",
      "pos": "verb",
      "meaning_en": "remain in the same place or position; continue to be in a state",
      "meaning_vi": "gắn bó / ở lại",
      "context_note": "Nhân viên gắn bó lâu dài vì họ tin vào người lãnh đạo.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Gắn bó lâu dài và tiếp tục đồng hành cùng tổ chức.",
          "in_context_story": "Nhân viên ở lại cống hiến vì họ tin tưởng và nể phục người dẫn dắt mình."
      }
  },
  "straight": {
      "term": "straight",
      "pronunciation": "/streɪt/",
      "pos": "adverb",
      "meaning_en": "in a straight line; directly",
      "meaning_vi": "thẳng đứng / trực tiếp",
      "context_note": "Khe nứt băng kéo dài thẳng đứng xuyên qua toàn bộ 850m băng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Theo một phương thẳng tắp, không lệch hướng.",
          "in_context_story": "Vết nứt sâu đâm thẳng đứng xuống lớp đá đáy của dải băng."
      }
  },
  "success": {
      "term": "success",
      "pronunciation": "/səkˈsɛs/",
      "pos": "noun",
      "meaning_en": "the accomplishment of an aim or purpose",
      "meaning_vi": "sự thành công / bước tiến",
      "context_note": "Đưa ra lời góp ý chân thành vì sự thành công của đối phương.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Việc đạt được mục tiêu và tạo ra kết quả tốt đẹp mỹ mãn.",
          "in_context_story": "Góp ý chân thành xuất phát từ mong muốn nhìn thấy người khác thành công."
      }
  },
  "sudden": {
      "term": "sudden",
      "pronunciation": "/ˈsʌdən/",
      "pos": "adjective",
      "meaning_en": "occurring or done quickly and unexpectedly",
      "meaning_vi": "đột ngột / bất ngờ",
      "context_note": "Sự xả nước đột ngột của hồ băng trong 90 phút.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Diễn ra với tốc độ rất nhanh và không hề báo trước.",
          "in_context_story": "Hiện tượng hồ băng tháo cạn đột ngột làm kinh ngạc các nhà khoa học."
      }
  },
  "thinks": {
      "term": "thinks",
      "pronunciation": "/θɪŋks/",
      "pos": "verb (third person singular)",
      "meaning_en": "has a particular opinion, belief, or idea",
      "meaning_vi": "suy nghĩ / nhận định",
      "context_note": "Giả định rằng bạn đã biết người khác đang nghĩ gì.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Quá trình tư duy và hình thành suy nghĩ của một cá nhân.",
          "in_context_story": "Thay vì đoán người khác nghĩ gì, hãy chủ động đặt câu hỏi mở."
      }
  },
  "three": {
      "term": "three",
      "pronunciation": "/θriː/",
      "pos": "numeral",
      "meaning_en": "the number 3",
      "meaning_vi": "ba (3)",
      "context_note": "Ba thói quen cốt lõi của người giao tiếp xuất sắc.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Số lượng ba đơn vị.",
          "in_context_story": "Ba câu hỏi then chốt định hình chất lượng của lời phản hồi."
      }
  },
  "time": {
      "term": "time",
      "pronunciation": "/taɪm/",
      "pos": "noun",
      "meaning_en": "the indefinite continued progress of existence and events",
      "meaning_vi": "thời gian / thời khắc",
      "context_note": "Tích lũy sinh lãi kép theo thời gian.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Dòng chảy thời gian giúp tích lũy và khuếch đại giá trị của thói quen.",
          "in_context_story": "Hiệu ứng lãi kép của kỹ năng giao tiếp phát huy sức mạnh vượt trội theo thời gian."
      }
  },
  "underground": {
      "term": "underground",
      "pronunciation": "/ˈʌndəɡraʊnd/",
      "pos": "adjective / adverb",
      "meaning_en": "beneath the surface of the ground",
      "meaning_vi": "dưới lòng đất / ngầm bên dưới",
      "context_note": "Sự nóng lên của địa chất ngầm dưới đáy băng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Nằm ẩn sâu bên dưới lớp bề mặt của vỏ Trái Đất hoặc dải băng.",
          "in_context_story": "Hoạt động địa chất ngầm dưới đáy sâu 850m băng."
      }
  },
  "upward": {
      "term": "upward",
      "pronunciation": "/ˈʌpwəd/",
      "pos": "adverb / adjective",
      "meaning_en": "towards a higher place, point, or level",
      "meaning_vi": "hướng lên trên / nhô lên",
      "context_note": "Mặt hồ nhô cong hình vòm hướng lên trên 18cm do áp lực nước bên dưới.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Chuyển động hoặc xu hướng nâng cao dần theo chiều thẳng đứng từ dưới lên.",
          "in_context_story": "Vệ tinh ghi nhận mặt hồ bị đẩy nhô cao lên 18cm do áp lực nước đáy dâng trào."
      }
  },
  "visible": {
      "term": "visible",
      "pronunciation": "/ˈvɪzəbəl/",
      "pos": "adjective",
      "meaning_en": "able to be seen",
      "meaning_vi": "có thể nhìn thấy được",
      "context_note": "Không có vết nứt nào có thể nhìn thấy trên bờ hồ phía Nam.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hiện diện rõ ràng trước mắt và có thể quan sát bằng mắt thường.",
          "in_context_story": "Mặt hồ phẳng lặng và không có bất kỳ vết nứt rạn nào lộ ra trên bề mặt."
      }
  },
  "want": {
      "term": "want",
      "pronunciation": "/wɒnt/",
      "pos": "verb",
      "meaning_en": "have a desire to possess or do something",
      "meaning_vi": "mong muốn / khao khát",
      "context_note": "Mọi người luôn mong muốn biết điều gì đang làm tốt và cần cải thiện.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Mong muốn và nhu cầu tự nhiên của con người.",
          "in_context_story": "Nhân viên luôn mong muốn nhận được sự rõ ràng và phản hồi cụ thể."
      }
  },
  "warmed": {
      "term": "warmed",
      "pronunciation": "/wɔːmd/",
      "pos": "verb (past)",
      "meaning_en": "made or became warm",
      "meaning_vi": "đã làm ấm lên / gia nhiệt",
      "context_note": "Nhiệt lượng địa chất làm ấm lớp đá đáy băng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động làm tăng nhiệt độ của một bề mặt trong quá khứ.",
          "in_context_story": "Giả thuyết cho rằng nhiệt địa chất đã làm ấm lớp đá đáy băng."
      }
  },
  "water": {
      "term": "water",
      "pronunciation": "/ˈwɔːtər/",
      "pos": "noun",
      "meaning_en": "a colorless, transparent, odorless liquid (H2O)",
      "meaning_vi": "nước / khối nước",
      "context_note": "Cảm biến âm học đo mực nước hồ.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Khối lượng nước lỏng chứa trong hồ hoặc sông suối.",
          "in_context_story": "8 triệu mét khối nước băng tan thoát thẳng xuống đáy trong tích tắc."
      }
  },
  "way": {
      "term": "way",
      "pronunciation": "/weɪ/",
      "pos": "noun",
      "meaning_en": "a method, style, or manner of doing something",
      "meaning_vi": "phương thức / cách thức",
      "context_note": "Cách tốt nhất để tự hoàn thiện bản thân.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Phương thức, con đường hoặc cách tiếp cận để đạt kết quả tối ưu.",
          "in_context_story": "Cách tốt nhất để nâng tầm bản thân là học cách truyền đạt rõ ràng."
      }
  },
  "wide": {
      "term": "wide",
      "pronunciation": "/waɪd/",
      "pos": "adjective",
      "meaning_en": "of great or more than average width",
      "meaning_vi": "rộng / có bề rộng",
      "context_note": "Vết nứt thẳng đứng có bề rộng 1.2 mét.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Kích thước đo theo phương ngang của một khe hở hoặc bề mặt.",
          "in_context_story": "Vết nứt băng rộng 1.2m mở toang lúc rạng sáng."
      }
  },
  "without": {
      "term": "without",
      "pronunciation": "/wɪðˈaʊt/",
      "pos": "preposition",
      "meaning_en": "in the absence of",
      "meaning_vi": "nếu không có / thiếu đi",
      "context_note": "Nếu không có kỹ năng giao tiếp tốt, bạn sẽ không thể thuyết phục người khác.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Diễn tả sự vắng mặt hoặc thiếu hụt một yếu tố then chốt.",
          "in_context_story": "Thiếu đi kỹ năng giao tiếp, mọi ý tưởng xuất chúng đều khó thành hiện thực."
      }
  },
  "woke": {
      "term": "woke",
      "pronunciation": "/wəʊk/",
      "pos": "verb (past)",
      "meaning_en": "emerged or caused to emerge from sleep",
      "meaning_vi": "đã đánh thức",
      "context_note": "Hệ thống còi báo động tự động đã đánh thức chúng tôi lúc 03:20 AM.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động đánh thức ai đó dậy khỏi giấc ngủ.",
          "in_context_story": "Chuông báo động tự động réo vang đánh thức cả đội nghiên cứu lúc 03:20 AM."
      }
  },
  "word": {
      "term": "word",
      "pronunciation": "/wɜːd/",
      "pos": "noun",
      "meaning_en": "a single distinct meaningful element of speech or writing",
      "meaning_vi": "lời nói / câu từ",
      "context_note": "Người ta hiếm khi nhớ từng câu từ bạn đã nói.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Đơn vị câu từ cấu thành nên lời nói và văn bản.",
          "in_context_story": "Mọi người có thể quên từng câu từ, nhưng nhớ mãi cảm giác bạn mang lại."
      }
  },
  "working": {
      "term": "working",
      "pronunciation": "/ˈwɜːkɪŋ/",
      "pos": "verb (-ing)",
      "meaning_en": "functioning properly; or being engaged in labor",
      "meaning_vi": "đang vận hành hiệu quả / đang làm việc",
      "context_note": "Mọi người muốn biết điều gì đang hoạt động hiệu quả.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Đang phát huy tác dụng và mang lại hiệu quả trong thực tế.",
          "in_context_story": "Chỉ rõ cho nhân viên thấy những gì họ đang làm rất tốt và hiệu quả."
      }
  },
  "write": {
      "term": "write",
      "pronunciation": "/raɪt/",
      "pos": "verb",
      "meaning_en": "mark letters or words on a surface; compose text",
      "meaning_vi": "viết / soạn thảo",
      "context_note": "AI có thể viết email và soạn thảo các bài tiếp thị.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động soạn thảo và tạo ra nội dung chữ.",
          "in_context_story": "AI có thể viết email và tài liệu trong vài giây ngắn ngủi."
      }
  },
  "years": {
      "term": "years",
      "pronunciation": "/jɪəz/",
      "pos": "noun (plural)",
      "meaning_en": "periods of 365 days; long times",
      "meaning_vi": "nhiều năm / năm tháng",
      "context_note": "Nhiều năm về trước khi trò chuyện cùng sinh viên Stanford.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Khoảng thời gian tính bằng nhiều năm trôi qua.",
          "in_context_story": "Bài học kinh nghiệm được đúc kết và chứng thực qua nhiều năm tháng."
      }
  },
  "ago": {
      "term": "ago",
      "pronunciation": "/əˈɡəʊ/",
      "pos": "adverb",
      "meaning_en": "before the present; earlier",
      "meaning_vi": "trước đây",
      "context_note": "Nhiều năm trước đây.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Chỉ thời điểm trong quá khứ so với hiện tại.",
          "in_context_story": "Nhiều năm về trước, Buffett đã đưa ra lời khuyên này."
      }
  },
  "alarm": {
      "term": "alarm",
      "pronunciation": "/əˈlɑːm/",
      "pos": "noun",
      "meaning_en": "an anxious awareness of danger; or a warning device",
      "meaning_vi": "còi báo động / chuông cảnh báo",
      "context_note": "Chuông báo động tự động réo vang lúc 03:20 AM.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Thiết bị phát âm thanh cảnh báo sự cố khẩn cấp.",
          "in_context_story": "Còi báo động trạm nghiên cứu tự động kích hoạt khi mực nước hồ tụt dốc."
      }
  },
  "already": {
      "term": "already",
      "pronunciation": "/ɔːlˈrɛdi/",
      "pos": "adverb",
      "meaning_en": "before or by now or the time in question",
      "meaning_vi": "đã... rồi / từ trước",
      "context_note": "Cho rằng bạn đã biết trước người khác nghĩ gì.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Diễn tả sự việc đã hoàn thành hoặc tồn tại từ trước.",
          "in_context_story": "Vội vàng cho rằng mình đã hiểu hết suy nghĩ của người khác."
      }
  },
  "assume": {
      "term": "assume",
      "pronunciation": "/əˈsjuːm/",
      "pos": "verb",
      "meaning_en": "suppose to be the case, without proof",
      "meaning_vi": "tự suy đoán / giả định vội vàng",
      "context_note": "Đừng vội giả định rằng bạn đã biết lý do người khác hành động.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "assume là việc vội vàng kết luận hoặc gán ghép suy nghĩ cho người khác mà chưa hề kiểm chứng hay lắng nghe.",
          "in_context_story": "Tác giả khuyên: 'Replace assumptions with curiosity' — hãy thay định kiến bằng sự tò mò chân thành.",
          "real_world_transfers": [
              {
                  "domain_label": "Giao tiếp",
                  "sentence": "Never assume intent in an email; pick up the phone to clarify.",
                  "connection_note": "Không tự suy đoán ý đồ mà hãy trao đổi trực tiếp."
              }
          ]
      }
  },
  "automated": {
      "term": "automated",
      "pronunciation": "/ˈɔːtəmeɪtɪd/",
      "pos": "adjective",
      "meaning_en": "converted to largely automatic operation",
      "meaning_vi": "tự động hóa / tự động",
      "context_note": "Hệ thống cảm biến địa chấn tự động B-02.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Vận hành hoàn toàn tự động bằng máy móc mà không cần con người can thiệp.",
          "in_context_story": "Cảm biến tự động ghi nhận rung chấn dưới lòng băng lúc 01:45 AM."
      }
  },
  "become": {
      "term": "become",
      "pronunciation": "/bɪˈkʌm/",
      "pos": "verb",
      "meaning_en": "begin to be; turn into",
      "meaning_vi": "trở thành / chuyển hóa thành",
      "context_note": "Giao tiếp đã trở thành một lợi thế cạnh tranh thực sự.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Chuyển biến trạng thái để trở thành một giá trị hoặc vị thế mới.",
          "in_context_story": "Khả năng kết nối giữa người với người đã trở thành vũ khí cạnh tranh chiến lược."
      }
  },
  "becomes": {
      "term": "becomes",
      "pronunciation": "/bɪˈkʌmz/",
      "pos": "verb (third person)",
      "meaning_en": "begins to be; grows to be",
      "meaning_vi": "trở thành",
      "context_note": "Mỗi buổi thuyết trình trở thành cơ hội tạo dựng uy tín.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Biến đổi để trở thành một cơ hội mới.",
          "in_context_story": "Mỗi tương tác hàng ngày trở thành đòn bẩy nhân bản tầm ảnh hưởng."
      }
  },
  "believe": {
      "term": "believe",
      "pronunciation": "/bɪˈliːv/",
      "pos": "verb",
      "meaning_en": "accept that something is true, especially without proof",
      "meaning_vi": "tin rằng / có niềm tin",
      "context_note": "Nhà đầu tư rót vốn cho những người sáng lập mà họ tin tưởng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Đặt niềm tin chắc chắn vào năng lực hoặc sự thật của một điều gì đó.",
          "in_context_story": "Khách hàng và nhà đầu tư luôn tìm kiếm những con người họ có thể đặt trọn niềm tin."
      }
  },
  "best": {
      "term": "best",
      "pronunciation": "/bɛst/",
      "pos": "adjective (superlative)",
      "meaning_en": "of the most excellent, effective, or desirable quality",
      "meaning_vi": "tốt nhất / tối ưu nhất",
      "context_note": "Cách tốt nhất để tự hoàn thiện bản thân.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Có chất lượng hoặc giá trị vượt trội nhất so với mọi lựa chọn.",
          "in_context_story": "Lời khuyên tốt nhất của Buffett cho tuổi trẻ là học cách giao tiếp xuất sắc."
      }
  },
  "bottom": {
      "term": "bottom",
      "pronunciation": "/ˈbɒtəm/",
      "pos": "noun",
      "meaning_en": "the lowest point or part",
      "meaning_vi": "đáy / phần dưới cùng",
      "context_note": "Lớp đá đáy bên dưới 850m băng tầng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Vị trí sâu nhất hoặc thấp nhất của một khối vật thể.",
          "in_context_story": "Nước xả thẳng xuống lớp đá nền dưới đáy sâu của dải băng."
      }
  },
  "bowl": {
      "term": "bowl",
      "pronunciation": "/bəʊl/",
      "pos": "noun",
      "meaning_en": "a round, deep dish or basin-shaped depression",
      "meaning_vi": "lòng chảo băng / vùng trũng",
      "context_note": "Một lòng chảo băng trũng rỗng không còn giọt nước nào.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Vùng địa hình trũng hình lòng chảo chứa nước.",
          "in_context_story": "Đội nghiên cứu phát hiện lòng chảo hồ băng rỗng không sau 90 phút."
      }
  },
  "build": {
      "term": "build",
      "pronunciation": "/bɪld/",
      "pos": "verb",
      "meaning_en": "construct something by putting parts or materials together",
      "meaning_vi": "xây dựng / kiến tạo",
      "context_note": "Xây dựng những mối quan hệ bền vững mà AI không thể sao chép.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động bồi đắp và kiến tạo nên những giá trị bền vững.",
          "in_context_story": "Chủ động xây dựng niềm tin và sự thấu cảm trong từng cuộc đối thoại."
      }
  },
  "builds": {
      "term": "builds",
      "pronunciation": "/bɪldz/",
      "pos": "verb (third person)",
      "meaning_en": "constructs or establishes progressively",
      "meaning_vi": "xây dựng / bồi đắp",
      "context_note": "Sự rõ ràng bồi đắp nên sự tự tin.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Bồi đắp và củng cố vững chắc.",
          "in_context_story": "Clarity builds confidence — sự rõ ràng kiến tạo nên niềm tin vững chắc."
      }
  },
  "caused": {
      "term": "caused",
      "pronunciation": "/kɔːzd/",
      "pos": "verb (past)",
      "meaning_en": "made something happen",
      "meaning_vi": "được gây ra bởi",
      "context_note": "Sự thoát nước đột ngột được gây ra bởi cơ chế đứt gãy thủy lực.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Nguyên nhân dẫn đến sự xuất hiện của một hiện tượng.",
          "in_context_story": "Hiện tượng tháo cạn nước được gây ra bởi áp lực thủy tĩnh làm nứt băng."
      }
  },
  "certain": {
      "term": "certain",
      "pronunciation": "/ˈsɜːtən/",
      "pos": "adjective",
      "meaning_en": "specific but not explicitly named",
      "meaning_vi": "cụ thể / nhất định",
      "context_note": "Lý do vì sao họ lại hành động theo một cách nhất định.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Có tính chất cụ thể, rõ ràng.",
          "in_context_story": "Hiểu rõ căn nguyên vì sao một người lại hành xử theo cách thức nhất định."
      }
  },
  "complexity": {
      "term": "complexity",
      "pronunciation": "/kəmˈplɛksɪti/",
      "pos": "noun",
      "meaning_en": "the state or quality of being intricate or complicated",
      "meaning_vi": "sự phức tạp",
      "context_note": "Chuyển hóa sự phức tạp thành thông điệp rõ ràng.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "complexity là trạng thái bao gồm nhiều yếu tố đan xen, rối rắm và khó nắm bắt.",
          "in_context_story": "Lãnh đạo giỏi là người có thể bóc tách sự phức tạp thành những điều đơn giản, dễ hiểu.",
          "real_world_transfers": [
              {
                  "domain_label": "Quản trị",
                  "sentence": "Great engineers reduce system complexity to prevent operational failure.",
                  "connection_note": "Đơn giản hóa sự phức tạp để vận hành trơn tru."
              }
          ]
      }
  },
  "describing": {
      "term": "describing",
      "pronunciation": "/dɪˈskraɪbɪŋ/",
      "pos": "verb (-ing)",
      "meaning_en": "giving an account in words of someone or something",
      "meaning_vi": "đang mô tả / phác họa",
      "context_note": "Buffett đang mô tả một nguyên lý sinh lãi kép theo thời gian.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động diễn giải, khắc họa rõ nét một quy luật hoặc hiện tượng.",
          "in_context_story": "Buffett đang mô tả một quy luật phát triển tự nhiên của năng lực con người."
      }
  },
  "directly": {
      "term": "directly",
      "pronunciation": "/daɪˈrɛktli/",
      "pos": "adverb",
      "meaning_en": "without changing direction or stopping; immediately",
      "meaning_vi": "trực tiếp / thẳng xuống",
      "context_note": "Nước xả thẳng trực tiếp xuống lớp đá nền.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Không qua trung gian hay đường vòng, tác động thẳng vào đối tượng.",
          "in_context_story": "Dòng nước xả thẳng trực tiếp qua vết nứt sâu xuống nền đá."
      }
  },
  "discovers": {
      "term": "discovers",
      "pronunciation": "/dɪˈskʌvərz/",
      "pos": "verb (third person)",
      "meaning_en": "finds unexpectedly or during a search",
      "meaning_vi": "nhận ra / khám phá ra",
      "context_note": "Mọi doanh nhân cuối cùng đều nhận ra khách hàng mua niềm tin.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Nhận thức hoặc khám phá ra một chân lý quan trọng sau quá trình trải nghiệm.",
          "in_context_story": "Mọi nhà sáng lập đều nhận ra sản phẩm tốt cần đi kèm niềm tin từ khách hàng."
      }
  },
  "dome": {
      "term": "dome",
      "pronunciation": "/dəʊm/",
      "pos": "noun / verb",
      "meaning_en": "a rounded vault, or to swell upward in a curve",
      "meaning_vi": "nhô vòm lên / cấu trúc hình vòm",
      "context_note": "Mặt hồ nhô vòm lên 18cm do áp lực dâng cao.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Trạng thái bề mặt bị đội cong tròn hình vòm hướng lên trên.",
          "in_context_story": "Áp lực nước ngầm đội bề mặt hồ nhô vòm lên 18cm trước khi nứt toang."
      }
  },
  "due": {
      "term": "due",
      "pronunciation": "/djuː/",
      "pos": "adjective / preposition",
      "meaning_en": "caused by; owing to",
      "meaning_vi": "do / bởi vì",
      "context_note": "Do áp lực nước dâng cao bên dưới.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Chỉ nguyên nhân trực tiếp dẫn tới hiện tượng.",
          "in_context_story": "Mặt hồ phồng lên do áp lực thủy tĩnh tăng đột biến."
      }
  },
  "entire": {
      "term": "entire",
      "pronunciation": "/ɪnˈtaɪər/",
      "pos": "adjective",
      "meaning_en": "with no part left out; whole",
      "meaning_vi": "toàn bộ / trọn vẹn",
      "context_note": "Xuyên thủng toàn bộ 850m dải băng.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Bao gồm trọn vẹn 100% chiều sâu hoặc quy mô.",
          "in_context_story": "Vết nứt xuyên thủng toàn bộ bề dày của tầng băng Greenland."
      }
  },
  "eventually": {
      "term": "eventually",
      "pronunciation": "/ɪˈvɛntʃuəli/",
      "pos": "adverb",
      "meaning_en": "in the end, especially after a long delay or series of events",
      "meaning_vi": "cuối cùng / rốt cuộc",
      "context_note": "Mọi doanh nhân cuối cùng rồi cũng nhận ra chân lý này.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Kết quả cuối cùng sau một quá trình trải nghiệm và học hỏi.",
          "in_context_story": "Rốt cuộc, niềm tin vẫn là yếu tố quyết định sự gắn kết của khách hàng."
      }
  },
  "everyday": {
      "term": "everyday",
      "pronunciation": "/ˈɛvrɪdeɪ/",
      "pos": "adjective",
      "meaning_en": "daily; ordinary or typical",
      "meaning_vi": "thường nhật / hàng ngày",
      "context_note": "Biến việc phản hồi và góp ý thành cuộc trò chuyện thường nhật.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Diễn ra thường xuyên mỗi ngày, trở thành thói quen tự nhiên.",
          "in_context_story": "Đưa phản hồi và lắng nghe vào các cuộc trò chuyện thường nhật."
      }
  },
  "face": {
      "term": "face",
      "pronunciation": "/feɪs/",
      "pos": "verb / noun",
      "meaning_en": "confront and deal with; or the front of the head",
      "meaning_vi": "đối mặt / đương đầu",
      "context_note": "Với vô vàn thông báo và xao nhãng mà chúng ta phải đối mặt hàng ngày.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Trực tiếp đương đầu và xử lý các tình huống diễn ra xung quanh.",
          "in_context_story": "Chúng ta đối mặt với hàng trăm thông báo gây phân tâm mỗi ngày."
      }
  },
  "fact": {
      "term": "fact",
      "pronunciation": "/fækt/",
      "pos": "noun",
      "meaning_en": "a thing that is known or proved to be true",
      "meaning_vi": "thực tế là / sự thật",
      "context_note": "Trên thực tế, giao tiếp đã trở thành kỹ năng kinh doanh chiến lược.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Sự thật hiển nhiên đã được chứng minh qua thực tiễn.",
          "in_context_story": "In fact — trên thực tế, giao tiếp chính là đòn bẩy khuếch đại thành công."
      }
  },
  "fog": {
      "term": "fog",
      "pronunciation": "/fɒɡ/",
      "pos": "noun",
      "meaning_en": "a thick cloud of tiny water droplets in atmosphere",
      "meaning_vi": "sương mù dày đặc",
      "context_note": "Trước khi màn sương mù tràn tới bao phủ lòng hồ.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Lớp hơi nước dày đặc làm giảm tầm nhìn ở vùng cực.",
          "in_context_story": "Đội lấy mẫu lõi băng hoàn tất công việc trước khi sương mù tràn tới."
      }
  },
  "forward": {
      "term": "forward",
      "pronunciation": "/ˈfɔːwəd/",
      "pos": "adverb",
      "meaning_en": "in the direction that one is facing or travelling; onward",
      "meaning_vi": "tiến về phía trước / phát triển",
      "context_note": "Làm thế nào để tiếp tục tiến về phía trước.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Định hướng phát triển và tiến bước trong tương lai.",
          "in_context_story": "Phản hồi tốt giúp nhân viên biết cách tự tin tiến về phía trước."
      }
  },
  "generative": {
      "term": "generative",
      "pronunciation": "/ˈdʒɛnərətɪv/",
      "pos": "adjective",
      "meaning_en": "capable of producing or creating (e.g. generative AI)",
      "meaning_vi": "tạo sinh / có khả năng tự sinh nội dung",
      "context_note": "Trí tuệ nhân tạo tạo sinh (Generative AI).",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Có năng lực tự động sinh ra nội dung mới như văn bản, hình ảnh, mã nguồn.",
          "in_context_story": "Rất lâu trước khi AI tạo sinh ra đời, Buffett đã hiểu rõ sức mạnh của giao tiếp con người."
      }
  },
  "give": {
      "term": "give",
      "pronunciation": "/ɡɪv/",
      "pos": "verb",
      "meaning_en": "freely transfer the possession of something to someone",
      "meaning_vi": "trao tặng / trao cho",
      "context_note": "Món quà quý giá nhất bạn có thể trao tặng cho người khác.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động trao tặng hoặc chia sẻ một giá trị cho người nhận.",
          "in_context_story": "Sự chú tâm lắng nghe là món quà tuyệt vời nhất bạn có thể trao cho người đối diện."
      }
  },
  "got": {
      "term": "got",
      "pronunciation": "/ɡɒt/",
      "pos": "verb (past)",
      "meaning_en": "received or obtained",
      "meaning_vi": "đã nhận được / đạt được",
      "context_note": "Tấm bằng giao tiếp mà tôi đã nhận được từ Dale Carnegie năm 1952.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Đã tiếp nhận hoặc đạt được một thành quả trong quá khứ.",
          "in_context_story": "Tấm bằng duy nhất Buffett treo trong văn phòng là bằng Dale Carnegie nhận năm 1952."
      }
  },
  "instead": {
      "term": "instead",
      "pronunciation": "/ɪnˈstɛd/",
      "pos": "adverb",
      "meaning_en": "as an alternative or substitute",
      "meaning_vi": "thay vì / thay vào đó",
      "context_note": "Thay vì chuẩn bị lời phản bác, hãy đặt thêm câu hỏi.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Lựa chọn hành động tích cực thay thế cho thói quen cũ.",
          "in_context_story": "Thay vì tranh cãi bảo vệ quan điểm, hãy tò mò tìm hiểu góc nhìn của đối phương."
      }
  },
  "move": {
      "term": "move",
      "pronunciation": "/muːv/",
      "pos": "verb",
      "meaning_en": "change position or progress in a course",
      "meaning_vi": "tiến bước / chuyển động",
      "context_note": "Làm thế nào để tiếp tục tiến bước và hoàn thiện.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động tiến bước và chuyển động về phía trước.",
          "in_context_story": "Làm thế nào để tiếp tục tiến bộ trong công việc (how to move forward)."
      }
  },
  "near": {
      "term": "near",
      "pronunciation": "/nɪər/",
      "pos": "preposition / adjective",
      "meaning_en": "at or to a short distance away",
      "meaning_vi": "gần / cận kề",
      "context_note": "Lấy mẫu lõi băng gần khu vực bờ hồ G-4.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Khoảng cách địa lý cận kề một vị trí cụ thể.",
          "in_context_story": "Đội nghiên cứu lấy mẫu băng gần lòng hồ trước khi sương mù kéo đến."
      }
  },
  "next": {
      "term": "next",
      "pronunciation": "/nɛkst/",
      "pos": "adjective",
      "meaning_en": "coming immediately after the present one in time",
      "meaning_vi": "kế tiếp / tiếp theo",
      "context_note": "Những nhà lãnh đạo sẽ thành công vượt bậc trong thập kỷ tiếp theo.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Khoảng thời gian hoặc sự kiện nối tiếp ngay sau hiện tại.",
          "in_context_story": "Trong thập kỷ kế tiếp, người thành công là người có năng lực thấu cảm con người."
      }
  },
  "outward": {
      "term": "outward",
      "pronunciation": "/ˈaʊtwəd/",
      "pos": "adverb",
      "meaning_en": "towards the outside or away from a center",
      "meaning_vi": "chảy tràn ra ngoài",
      "context_note": "Không hề có dòng suối mặt nào chảy tràn ra ngoài lòng hồ.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hướng di chuyển từ trung tâm tỏa ra các phía bên ngoài.",
          "in_context_story": "Không có bất kỳ dòng chảy bề mặt nào tràn ra ngoài gờ băng."
      }
  },
  "850-meter": {
      "term": "850-meter",
      "pronunciation": "/eɪt ˈhʌndrəd ˈfɪfti ˈmiːtər/",
      "pos": "adjective",
      "meaning_en": "having a thickness or depth of 850 meters",
      "meaning_vi": "dày 850 mét (độ dày dải băng)",
      "context_note": "Độ dày khổng lồ 850 mét của dải băng Greenland.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Chỉ độ dày hoặc chiều sâu 850 mét của khối băng vĩnh cửu Greenland.",
          "in_context_story": "Vết nứt xuyên thủng toàn bộ 850m tầng băng để xả nước xuống đáy."
      }
  },
  "able": {
      "term": "able",
      "pronunciation": "/ˈeɪbəl/",
      "pos": "adjective",
      "meaning_en": "having the power, skill, or opportunity to do something",
      "meaning_vi": "có khả năng / có thể",
      "context_note": "Bạn sẽ không thể thuyết phục được người khác đi theo mình.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Có đủ điều kiện, năng lực hoặc phương tiện để thực hiện một hành động.",
          "in_context_story": "You won't be able to convince people — bạn sẽ không thể thuyết phục được ai nếu thiếu khả năng truyền đạt."
      }
  },
  "active": {
      "term": "active",
      "pronunciation": "/ˈæktɪv/",
      "pos": "adjective",
      "meaning_en": "engaging or ready to engage in physically or mentally energetic pursuits",
      "meaning_vi": "chủ động / tích cực",
      "context_note": "Lắng nghe chủ động (Active listening).",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Có tính chủ động, dồn toàn tâm trí và hành động cụ thể chứ không thụ động.",
          "in_context_story": "Active listening là sự lắng nghe chủ động, thấu cảm bằng cả tư duy và trái tim."
      }
  },
  "added": {
      "term": "added",
      "pronunciation": "/ˈædɪd/",
      "pos": "verb (past)",
      "meaning_en": "joined something to something else so as to increase size or say further",
      "meaning_vi": "bổ sung / nói thêm rằng",
      "context_note": "Buffett nói thêm rằng nếu không có giao tiếp bạn sẽ không thuyết phục được ai.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động chia sẻ thêm một góc nhìn hoặc bổ sung luận điểm mới.",
          "in_context_story": "Buffett added that — Buffett nhấn mạnh thêm tầm quan trọng sống còn của kỹ năng này."
      }
  },
  "competitive": {
      "term": "competitive",
      "pronunciation": "/kəmˈpɛtɪtɪv/",
      "pos": "adjective",
      "meaning_en": "relating to or characterized by competition",
      "meaning_vi": "cạnh tranh / mang tính thi đua",
      "context_note": "Lợi thế cạnh tranh vượt trội.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "competitive là khả năng vươn lên, tạo sự khác biệt và chiến thắng trong cuộc đua so tài.",
          "in_context_story": "Năng lực giao tiếp con người trở thành lợi thế cạnh tranh cốt lõi (competitive advantage).",
          "real_world_transfers": [
              {
                  "domain_label": "Kinh doanh",
                  "sentence": "Innovation provides a competitive edge in fast-moving industries.",
                  "connection_note": "Tạo lợi thế thi đua và thị phần."
              }
          ]
      }
  },
  "completed": {
      "term": "completed",
      "pronunciation": "/kəmˈpliːtɪd/",
      "pos": "verb (past)",
      "meaning_en": "finished making or doing",
      "meaning_vi": "đã hoàn thành / hoàn tất",
      "context_note": "Đội nghiên cứu đã hoàn tất lấy mẫu lõi băng lúc 01:30 AM.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động thực hiện xong xuôi trọn vẹn một nhiệm vụ.",
          "in_context_story": "Dr. Vance hoàn tất lấy mẫu băng trước khi sương mù tràn tới."
      }
  },
  "core": {
      "term": "core",
      "pronunciation": "/kɔːr/",
      "pos": "noun / adjective",
      "meaning_en": "the central or most important part; or a cylindrical sample",
      "meaning_vi": "mẫu lõi băng / phần cốt lõi",
      "context_note": "Lấy mẫu lõi băng hình trụ (Ice core sampling).",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Mẫu hình trụ khoan từ tầng sâu để phân tích cấu trúc địa chất, hoặc phần tinh túy cốt lõi.",
          "in_context_story": "Ice core sampling là phương pháp khoan lấy mẫu lõi băng để đo tuổi và cấu trúc khí hậu cổ đại."
      }
  },
  "end": {
      "term": "end",
      "pronunciation": "/ɛnd/",
      "pos": "noun / adjective",
      "meaning_en": "the furthest point or part; or the final purpose/goal",
      "meaning_vi": "mục tiêu tối hậu / đích đến",
      "context_note": "Mục tiêu tối hậu ở đây là gì? Đó là sự rõ ràng (end goal).",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Đích đến tối hậu hoặc kết quả cuối cùng mong muốn đạt được.",
          "in_context_story": "End goal là đích đến rõ ràng và minh bạch cho mọi nỗ lực của tập thể."
      }
  },
  "follow-up": {
      "term": "follow-up",
      "pronunciation": "/ˈfɒləʊ ʌp/",
      "pos": "adjective / noun",
      "meaning_en": "continuing or repeating something done previously",
      "meaning_vi": "đào sâu thêm / câu hỏi tiếp nối",
      "context_note": "Đặt các câu hỏi đào sâu tiếp nối để hiểu thấu vấn đề.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Hành động hỏi tiếp nối để làm rõ thêm các chi tiết chưa rõ ràng.",
          "in_context_story": "Follow-up questions giúp đối phương cảm nhận được bạn đang thực sự chú tâm nghe họ."
      }
  },
  "force": {
      "term": "force",
      "pronunciation": "/fɔːs/",
      "pos": "noun",
      "meaning_en": "strength or energy as an attribute of physical action; power",
      "meaning_vi": "sức mạnh / lực đòn bẩy",
      "context_note": "Giao tiếp là một lực đòn bẩy nhân bản kết quả (Force multiplier).",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "Nguồn sức mạnh hoặc lực tác động tạo ra sự biến đổi to lớn.",
          "in_context_story": "Force multiplier — lực đòn bẩy khuếch đại mọi kỹ năng chuyên môn."
      }
  },
  "made": {
      "term": "made",
      "pronunciation": "/meɪd/",
      "pos": "verb (past)",
      "meaning_en": "formed or caused someone to feel a certain way",
      "meaning_vi": "đã làm cho / mang lại",
      "context_note": "Họ sẽ luôn nhớ cảm giác bạn đã mang lại cho họ.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Đã tạo ra một trải nghiệm hoặc cảm xúc sâu sắc cho người đối diện.",
          "in_context_story": "How you made them feel — dấu ấn cảm xúc mà bạn đã để lại trong lòng người nghe."
      }
  },
  "still": {
      "term": "still",
      "pronunciation": "/stɪl/",
      "pos": "adverb / adjective",
      "meaning_en": "up to and including the present; or not moving",
      "meaning_vi": "vẫn đang / còn đang tiếp diễn",
      "context_note": "Khi người khác vẫn đang còn nói.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Trạng thái đang tiếp diễn chưa dừng lại tại thời điểm nói.",
          "in_context_story": "Kìm nén thói quen chen ngang khi người khác vẫn còn đang chia sẻ."
      }
  },
  "interview": {
      "term": "interview",
      "pronunciation": "/ˈɪntəvjuː/",
      "pos": "noun",
      "meaning_en": "a formal meeting for consultation, assessment, or strategic discussion",
      "meaning_vi": "cuộc phỏng vấn / buổi trò chuyện",
      "context_note": "Mỗi cuộc phỏng vấn tuyển dụng hoặc trao đổi chiến lược.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Buổi trò chuyện hoặc trao đổi chính thức để đánh giá hoặc chia sẻ góc nhìn.",
          "in_context_story": "Mỗi buổi phỏng vấn (interview) là cơ hội thể hiện năng lực và tạo dựng uy tín."
      }
  },
  "graduate": {
      "term": "graduate",
      "pronunciation": "/ˈɡrædʒuət/",
      "pos": "noun",
      "meaning_en": "a person who has successfully completed a course of study",
      "meaning_vi": "sinh viên tốt nghiệp",
      "context_note": "Trò chuyện cùng sinh viên vừa tốt nghiệp Stanford.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Chỉ người vừa hoàn thành chương trình đào tạo học thuật tại trường đại học.",
          "in_context_story": "Buffett trò chuyện cùng một sinh viên tốt nghiệp Stanford để truyền lại lời khuyên đắt giá nhất."
      }
  },
  "improve": {
      "term": "improve",
      "pronunciation": "/ɪmˈpruːv/",
      "pos": "verb",
      "meaning_en": "to make or become better in skill, quality, or value",
      "meaning_vi": "cải thiện / tự hoàn thiện bản thân",
      "context_note": "Cách tốt nhất để tự hoàn thiện bản thân là học cách giao tiếp tốt hơn.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "improve là hành động chủ động nâng cao năng lực, phẩm chất và kỹ năng của bản thân lên một tầm cao mới.",
          "in_context_story": "Buffett khuyên người trẻ cách tốt nhất để hoàn thiện bản thân (improve yourself) là nâng cao năng lực giao tiếp.",
          "real_world_transfers": [
              {
                  "domain_label": "Phát triển cá nhân",
                  "sentence": "Continuous deliberate practice is the surest path to improve core skills.",
                  "connection_note": "Rèn luyện có chủ đích giúp nâng cao kỹ năng cốt lõi."
              }
          ]
      }
  },
  "learn": {
      "term": "learn",
      "pronunciation": "/lɜːn/",
      "pos": "verb",
      "meaning_en": "to gain knowledge or skill through study, experience, or being taught",
      "meaning_vi": "học hỏi / rèn luyện kỹ năng",
      "context_note": "Học cách giao tiếp và truyền đạt thông điệp hiệu quả.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "learn là quá trình tiếp thu tri thức và rèn luyện thành thục một kỹ năng qua trải nghiệm thực tế.",
          "in_context_story": "Học cách giao tiếp (learn to communicate) là một kỹ năng có thể đào tạo và tích lũy được chứ không phải chỉ do bẩm sinh."
      }
  },
  "learning": {
      "term": "learning",
      "pronunciation": "/ˈlɜːnɪŋ/",
      "pos": "verb (-ing) / noun",
      "meaning_en": "the acquisition of knowledge or skills through experience or study",
      "meaning_vi": "việc học tập / rèn luyện",
      "context_note": "Học cách giao tiếp giúp thành quả cuộc đời nhân lên gấp bội.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Tiến trình tiếp thu và mài giũa kỹ năng qua năm tháng.",
          "in_context_story": "Việc học tập cách giao tiếp hiệu quả đem lại đòn bẩy sự nghiệp bền vững."
      }
  },
  "better": {
      "term": "better",
      "pronunciation": "/ˈbɛtər/",
      "pos": "adverb / adjective",
      "meaning_en": "in a more effective, persuasive, or higher standard manner",
      "meaning_vi": "tốt hơn / hiệu quả hơn",
      "context_note": "Giao tiếp hiệu quả và thuyết phục hơn.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Đạt được mức độ hiệu quả và sức thuyết phục cao hơn trước.",
          "in_context_story": "Communicate better — giao tiếp rõ ràng, thấu cảm và truyền cảm hứng hơn."
      }
  },
  "diploma": {
      "term": "diploma",
      "pronunciation": "/dɪˈpləʊmə/",
      "pos": "noun",
      "meaning_en": "a certificate awarded by an educational establishment to show that someone has completed a course",
      "meaning_vi": "tấm bằng / chứng chỉ tốt nghiệp",
      "context_note": "Tấm bằng duy nhất treo trong văn phòng của Buffett.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Giấy chứng nhận tốt nghiệp khóa đào tạo kỹ năng hoặc học thuật.",
          "in_context_story": "Tấm bằng duy nhất Buffett tự hào treo trong phòng làm việc là chứng chỉ Dale Carnegie 1952."
      }
  },
  "hang": {
      "term": "hang",
      "pronunciation": "/hæŋ/",
      "pos": "verb",
      "meaning_en": "to attach or suspend something on a wall for display",
      "meaning_vi": "treo (trên tường văn phòng)",
      "context_note": "Tấm bằng duy nhất tôi treo trong văn phòng làm việc.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Treo một vật kỷ niệm lên tường để trân trọng và ghi nhớ.",
          "in_context_story": "Buffett không treo bằng đại học danh giá mà chỉ treo tấm bằng rèn luyện kỹ năng giao tiếp."
      }
  },
  "office": {
      "term": "office",
      "pronunciation": "/ˈɒfɪs/",
      "pos": "noun",
      "meaning_en": "a room, set of rooms, or building used as a place for commercial or professional work",
      "meaning_vi": "văn phòng làm việc",
      "context_note": "Văn phòng làm việc của Warren Buffett.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Không gian làm việc và điều hành chiến lược của nhà lãnh đạo.",
          "in_context_story": "Văn phòng làm việc của Warren Buffett tại Berkshire Hathaway."
      }
  },
  "confidence": {
      "term": "confidence",
      "pronunciation": "/ˈkɒnfɪdəns/",
      "pos": "noun",
      "meaning_en": "the feeling or belief that one can have faith in or rely on someone or something",
      "meaning_vi": "sự tự tin / niềm tin cậy tuyệt đối",
      "context_note": "Khách hàng không chỉ mua sản phẩm — họ mua sự an tâm và niềm tin.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "confidence là cảm giác an tâm, tin tưởng tuyệt đối vào uy tín và năng lực của người cung cấp giải pháp.",
          "in_context_story": "Khách hàng chi tiền vì họ mua sự an tâm và tự tin (they buy confidence) mà người bán tạo dựng.",
          "real_world_transfers": [
              {
                  "domain_label": "Bán hàng",
                  "sentence": "Top salespeople instill unwavering confidence before closing strategic deals.",
                  "connection_note": "Truyền sự tự tin và niềm tin trước khi chốt thỏa thuận."
              }
          ]
      }
  },
  "employees": {
      "term": "employees",
      "pronunciation": "/ɪmˈplɔɪiːz/",
      "pos": "noun (plural)",
      "meaning_en": "people employed for wages or salary, especially at non-executive level",
      "meaning_vi": "nhân viên / đội ngũ nhân sự",
      "context_note": "Nhân viên gắn bó lâu dài vì họ tin vào người dẫn dắt mình.",
      "depth": "concise",
      "humanized": {
          "simple_intuition": "Tập thể đội ngũ nhân sự làm việc và cống hiến trong tổ chức.",
          "in_context_story": "Nhân viên ở lại cống hiến vì niềm tin vào tầm nhìn của người lãnh đạo chứ không phải chỉ vì đãi ngộ phụ trợ."
      }
  },
  "distractions": {
      "term": "distractions",
      "pronunciation": "/dɪˈstrækʃənz/",
      "pos": "noun (plural)",
      "meaning_en": "things that prevent someone from giving full attention to something else",
      "meaning_vi": "các yếu tố gây xao nhãng",
      "context_note": "Thời đại ngập tràn thông báo và các yếu tố gây xao nhãng hàng ngày.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "distractions là những tiếng chuông thông báo, thiết bị hay suy nghĩ vụn vặt làm phân tán sự tập trung khỏi cuộc trò chuyện hiện tại.",
          "in_context_story": "Gạt bỏ các thiết bị xao nhãng (daily distractions) là bước đầu tiên để lắng nghe thấu cảm."
      }
  },
  "feedback": {
      "term": "feedback",
      "pronunciation": "/ˈfiːdbæk/",
      "pos": "noun",
      "meaning_en": "helpful information or constructive criticism about performance",
      "meaning_vi": "phản hồi / lời góp ý mang tính xây dựng",
      "context_note": "Biến việc phản hồi thành cuộc trò chuyện thường nhật.",
      "depth": "standard",
      "humanized": {
          "simple_intuition": "feedback là những lời nhận xét, góp ý mang tính xây dựng giúp người khác nhìn rõ điểm mạnh và định hướng hoàn thiện.",
          "in_context_story": "Lãnh đạo xuất sắc đưa ra phản hồi thường xuyên và cụ thể vì sự tiến bộ của người khác.",
          "real_world_transfers": [
              {
                  "domain_label": "Quản trị đội ngũ",
                  "sentence": "Constructive feedback empowers team members to adapt rapidly.",
                  "connection_note": "Góp ý chân thành giúp thành viên tiến bộ nhanh chóng."
              }
          ]
      }
  },
};

/**
 * Dynamic Intelligent Pedagogical Synthesizer
 * Formulates humanized teacher explanations adapted to the word's complexity profile.
 */
export function enrichCognitiveTerm(term: VocabularyTerm): VocabularyTerm {
  const depth = determineExplanationDepth(term);
  
  if (term.humanized) {
    return {
      ...term,
      depth,
    };
  }

  return humanizeVocabularyTerm({
    ...term,
    depth,
  });
}

/**
 * Smart lookup function: tries exact phrase with spaces, then normalized, then stem/lemma match.
 * Always guarantees 100% enriched Cognitive & Semantic Analysis!
 */
export function lookupWord(rawWord: string): VocabularyTerm | null {
  if (!rawWord) return null;
  const clean = rawWord.trim().toLowerCase();

  let foundTerm: VocabularyTerm | null = null;

  // 1. Direct match with exact phrase
  if (CONTEXTUAL_DICTIONARY[clean]) {
    foundTerm = CONTEXTUAL_DICTIONARY[clean];
  }

  // 2. Match with punctuation stripped but SPACES PRESERVED
  if (!foundTerm) {
    const normalized = clean.replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
    if (CONTEXTUAL_DICTIONARY[normalized]) {
      foundTerm = CONTEXTUAL_DICTIONARY[normalized];
    }
  }

  // 3. Single-word stripped match
  if (!foundTerm) {
    const singleWord = clean.replace(/[^a-z0-9-]/g, "").trim();
    if (CONTEXTUAL_DICTIONARY[singleWord]) {
      foundTerm = CONTEXTUAL_DICTIONARY[singleWord];
    }
  }

  // 4. Lemmatization fallbacks (plural -s/es, past tense -ed, progressive -ing)
  if (!foundTerm) {
    const singleWord = clean.replace(/[^a-z0-9-]/g, "").trim();
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
        foundTerm = {
          ...base,
          term: rawWord.trim(),
          context_note: base.context_note || ""
        };
        break;
      }
    }
  }

  if (foundTerm) {
    return enrichCognitiveTerm(foundTerm);
  }

  // Fallback for any content word: dynamically generate rich cognitive profile
  const baseFallback: VocabularyTerm = {
    term: rawWord.trim(),
    pronunciation: "",
    pos: "content word",
    meaning_en: `the academic concept of ${rawWord.trim()}`,
    meaning_vi: rawWord.trim(),
    context_note: `Thuật ngữ học thuật trong văn bản.`,
  };

  return enrichCognitiveTerm(baseFallback);
}
