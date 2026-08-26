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
  "supraglacial lake",
  "ice sheet",
  "meltwater",
  "vertical fracture",
  "seismic sensor",
  "satellite radar",
  "acoustic water sensors",
  "ice core sampling",
  "geothermal heat",
  "shock wave",
  "continuous drainage",
  "perimeter ice ridges",
  "horizontal collapse",
  "field research team",
  "water temperature",
  "volcanic warming",
  "mechanical pressure",
  "rapid drop",
  "lake basin"
];

// Rich Contextual Dictionary for Case 001 Scientific Expedition & Climate Anomaly
export const CONTEXTUAL_DICTIONARY: Record<string, VocabularyTerm> = {
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
    meaning_vi: "tầng băng vĩnh cửu / dải băng lục địa",
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
  "drainage": {
    term: "drainage",
    pronunciation: "/ˈdreɪnɪdʒ/",
    pos: "noun",
    meaning_en: "the action or process of draining liquid away",
    meaning_vi: "sự thoát nước / quá trình xả nước",
    context_note: "Lưu lượng thoát nước đạt 1,500 m³/giây.",
  },
  "overflow": {
    term: "overflow",
    pronunciation: "/ˈəʊvəfləʊ/",
    pos: "noun / verb",
    meaning_en: "the flowing over of a liquid beyond its container boundaries",
    meaning_vi: "sự tràn bờ",
    context_note: "Gờ băng quanh hồ không hề có dấu hiệu tràn nước qua bề mặt.",
  },
  "disappeared": {
    term: "disappeared",
    pronunciation: "/ˌdɪsəˈpɪəd/",
    pos: "verb (past)",
    meaning_en: "ceased to be visible or present; vanished completely",
    meaning_vi: "biến mất hoàn toàn",
    context_note: "8 triệu m³ nước biến mất trong chưa đầy 90 phút.",
  },
  "shock wave": {
    term: "shock wave",
    pronunciation: "/ˈʃɒk weɪv/",
    pos: "noun phrase",
    meaning_en: "a sharp, sudden wave of high pressure caused by an explosion or fracture",
    meaning_vi: "sóng xung kích",
    context_note: "Sóng xung kích thẳng đứng ghi nhận lúc 03:12 AM khi khe nứt chính mở toang.",
  },
};

// Comprehensive English-to-Vietnamese vocabulary glossary
export const GENERAL_EN_VI_MAP: Record<string, { vi: string; en: string }> = {
  "acoustic": { vi: "âm học / thủy âm", en: "sound-based" },
  "sensors": { vi: "cảm biến", en: "detecting devices" },
  "sensor": { vi: "cảm biến", en: "detecting device" },
  "recorded": { vi: "đã ghi nhận", en: "logged" },
  "rapid": { vi: "nhanh chóng", en: "fast" },
  "drop": { vi: "sự sụt giảm", en: "decrease" },
  "level": { vi: "mực / mức độ", en: "elevation / quantity" },
  "meltwater": { vi: "nước băng tan", en: "melted ice water" },
  "disappeared": { vi: "biến mất", en: "vanished" },
  "surface": { vi: "bề mặt", en: "outer layer" },
  "basin": { vi: "lòng hồ / bồn trũng", en: "bowl-shaped depression" },
  "empty": { vi: "trống rỗng", en: "containing nothing" },
  "streams": { vi: "dòng suối / dòng chảy", en: "small flowing water" },
  "flowing": { vi: "chảy ra", en: "moving fluidly" },
  "perimeter": { vi: "chu vi / viền quanh", en: "outer edge" },
  "ridges": { vi: "gờ băng / rặng", en: "elevated crests" },
  "overflow": { vi: "tràn bờ", en: "spilling over" },
  "horizontal": { vi: "nằm ngang", en: "parallel to horizon" },
  "collapse": { vi: "sụp đổ", en: "falling inward" },
  "vertical": { vi: "thẳng đứng", en: "perpendicular" },
  "fracture": { vi: "vết nứt gãy", en: "structural crack" },
  "crevasse": { vi: "khe nứt băng sâu", en: "deep ice crack" },
  "extends": { vi: "kéo dài / xuyên suốt", en: "reaches across" },
  "bedrock": { vi: "lớp đá đáy", en: "solid base rock" },
  "drained": { vi: "thoát nước", en: "emptied of liquid" },
  "stable": { vi: "ổn định", en: "steady / secure" },
  "calm": { vi: "yên ả", en: "peaceful / still" },
  "cracks": { vi: "vết rạn nứt", en: "narrow breaks" },
  "shore": { vi: "bờ hồ", en: "edge of water" },
  "manual": { vi: "thủ công", en: "done by hand" },
  "temperature": { vi: "nhiệt độ", en: "heat level" },
  "laboratory": { vi: "phòng thí nghiệm", en: "research lab" },
  "geothermal": { vi: "địa nhiệt", en: "earth heat" },
  "volcanic": { vi: "núi lửa", en: "from volcano" },
  "mechanical": { vi: "cơ học / vật lý", en: "physical forces" },
  "pressure": { vi: "áp suất / áp lực", en: "applied force" },
  "cluster": { vi: "chuỗi / chùm", en: "group together" },
  "micro-fractures": { vi: "vết nứt vi mô", en: "tiny cracks" },
  "confirmed": { vi: "xác nhận", en: "verified" },
  "dome": { vi: "nhô vòm lên", en: "swell upward" },
  "massive": { vi: "khổng lồ", en: "very large" },
  "shock": { vi: "xung kích", en: "sudden impact" },
  "wave": { vi: "sóng", en: "wave" },
  "continuous": { vi: "liên tục", en: "unbroken" },
  "drainage": { vi: "sự xả nước", en: "water discharge" },
  "rate": { vi: "tốc độ / lưu lượng", en: "speed / pace" },
  "constant": { vi: "không đổi / cố định", en: "unchanging" },
  "contradicts": { vi: "mâu thuẫn / bác bỏ", en: "opposes" },
  "evidence": { vi: "bằng chứng", en: "proof" },
  "explanation": { vi: "giải thích / giả thuyết", en: "reasoning" },
  "hypothesis": { vi: "giả thuyết khoa học", en: "scientific theory" },
  "supported": { vi: "được chứng minh", en: "backed by data" },
};

/**
 * Smart lookup function: tries exact match, then lowercase, then stem/lemma match.
 */
export function lookupWord(rawWord: string): VocabularyTerm | null {
  const clean = rawWord.trim();
  const lower = clean.toLowerCase().replace(/[^a-z0-9-]/g, "");

  // 1. Direct contextual dictionary match
  if (CONTEXTUAL_DICTIONARY[lower]) {
    return CONTEXTUAL_DICTIONARY[lower];
  }

  // 2. Multi-word phrase check in dictionary
  if (CONTEXTUAL_DICTIONARY[clean.toLowerCase()]) {
    return CONTEXTUAL_DICTIONARY[clean.toLowerCase()];
  }

  // 3. Check General Word Map
  if (GENERAL_EN_VI_MAP[lower]) {
    return {
      term: clean,
      pronunciation: `/${lower}/`,
      pos: "",
      meaning_en: GENERAL_EN_VI_MAP[lower].en,
      meaning_vi: GENERAL_EN_VI_MAP[lower].vi,
      context_note: "",
    };
  }

  // 4. Simple lemmatization fallbacks (plural -s/es, past tense -ed, progressive -ing)
  const candidates: string[] = [];
  if (lower.endsWith("ies")) candidates.push(lower.slice(0, -3) + "y");
  if (lower.endsWith("es")) candidates.push(lower.slice(0, -2));
  if (lower.endsWith("s")) candidates.push(lower.slice(0, -1));
  if (lower.endsWith("ed")) {
    candidates.push(lower.slice(0, -2));
    candidates.push(lower.slice(0, -1));
  }
  if (lower.endsWith("ing")) {
    candidates.push(lower.slice(0, -3));
    candidates.push(lower.slice(0, -3) + "e");
  }

  for (const cand of candidates) {
    if (CONTEXTUAL_DICTIONARY[cand]) {
      const base = CONTEXTUAL_DICTIONARY[cand];
      return {
        ...base,
        term: clean,
        context_note: base.context_note || ""
      };
    }
    if (GENERAL_EN_VI_MAP[cand]) {
      return {
        term: clean,
        pronunciation: `/${cand}/`,
        pos: "",
        meaning_en: GENERAL_EN_VI_MAP[cand].en,
        meaning_vi: GENERAL_EN_VI_MAP[cand].vi,
        context_note: "",
      };
    }
  }

  // 5. If content word, return clean translation fallback
  if (isContentWord(lower)) {
    return {
      term: clean,
      pronunciation: `/${lower}/`,
      pos: "",
      meaning_en: clean,
      meaning_vi: GENERAL_EN_VI_MAP[lower]?.vi || clean,
      context_note: ""
    };
  }

  return null;
}
