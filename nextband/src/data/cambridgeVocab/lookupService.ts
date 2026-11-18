import {
  CambridgeUnitData,
  LexiconEntry,
  Stage1Magnet,
  Stage3Essay
} from "./types";
import {
  CAMBRIDGE_CONTEXT_GLOSSARY,
  UNIT_BILINGUAL_TRANSLATIONS
} from "./cambridgeContextGlossary";
import { GLOBAL_DICTIONARY } from "@/features/reading/services/readingDictionary";
import { VOCAB_IN_USE_UNITS } from "@/data/vocabInUse";
import { unit01Data } from "./unit01";
import { unit02Data } from "./unit02";
import { unit03Data } from "./unit03";
import { unit04Data } from "./unit04";
import { unit05Data } from "./unit05";
import { unit06Data } from "./unit06";
import { unit07Data } from "./unit07";
import { unit08Data } from "./unit08";
import { unit09Data } from "./unit09";
import { unit10Data } from "./unit10";
import { unit11Data } from "./unit11";
import { unit12Data } from "./unit12";
import { unit13Data } from "./unit13";
import { unit14Data } from "./unit14";
import { unit15Data } from "./unit15";
import { unit16Data } from "./unit16";
import { unit17Data } from "./unit17";
import { unit18Data } from "./unit18";
import { unit19Data } from "./unit19";
import { unit20Data } from "./unit20";

const ALL_UNITS_LIST: CambridgeUnitData[] = [
  unit01Data,
  unit02Data,
  unit03Data,
  unit04Data,
  unit05Data,
  unit06Data,
  unit07Data,
  unit08Data,
  unit09Data,
  unit10Data,
  unit11Data,
  unit12Data,
  unit13Data,
  unit14Data,
  unit15Data,
  unit16Data,
  unit17Data,
  unit18Data,
  unit19Data,
  unit20Data
];

/**
 * Nghĩa tiếng Việt cho các từ nối / giới từ / liên từ hay gây bối rối cho người học B1.
 */
const FUNCTION_WORDS_GLOSSARY: Record<string, LexiconEntry> = {
  while: {
    word: "while",
    ipa: "/waɪl/",
    pos: "conjunction",
    def_en: "Whereas; during the time that.",
    def_vi: "trong khi đó; trái lại (dùng để đối chiếu 2 vế câu)",
    collocations: "while proponents argue...",
    example: "While genes set limits, upbringing shapes habits.",
    ielts_tip: "Từ nối chuẩn để mở câu nhượng bộ/so sánh hai vế."
  },
  although: {
    word: "although",
    ipa: "/ɔːlˈðəʊ/",
    pos: "conjunction",
    def_en: "In spite of the fact that; even though.",
    def_vi: "mặc dù (nhưng)",
    collocations: "although..., yet...",
    example: "Although genetics matter, nurture remains decisive.",
    ielts_tip: "Không dùng 'but' ngay sau mệnh đề có 'although'."
  },
  though: {
    word: "though",
    ipa: "/ðəʊ/",
    pos: "conjunction / adv.",
    def_en: "Despite the fact that; however.",
    def_vi: "dù vậy, mặc dù",
    collocations: "even though",
    example: "Even though challenges arise, families adapt.",
    ielts_tip: "Trong văn viết trang trọng, ưu tiên 'although' hoặc 'even though'."
  },
  whereas: {
    word: "whereas",
    ipa: "/ˌweərˈæz/",
    pos: "conjunction",
    def_en: "In contrast or comparison with the fact that.",
    def_vi: "trong khi ngược lại (so sánh đối lập)",
    collocations: "A..., whereas B...",
    example: "Nurture emphasizes learning, whereas nature stresses DNA.",
    ielts_tip: "Rất hiệu quả khi so sánh số liệu Task 1 hoặc hai quan điểm Task 2."
  },
  despite: {
    word: "despite",
    ipa: "/dɪˈspaɪt/",
    pos: "preposition",
    def_en: "Without being affected by; in spite of.",
    def_vi: "bất chấp, mặc dù (theo sau là danh từ / V-ing)",
    collocations: "despite the fact that",
    example: "Despite initial setbacks, she achieved fluency.",
    ielts_tip: "Không viết 'despite of'. Phải viết 'despite + Noun' hoặc 'in spite of + Noun'."
  },
  regardless: {
    word: "regardless",
    ipa: "/rɪˈɡɑːd.ləs/",
    pos: "adverb / prep.",
    def_en: "Without paying attention to the present situation; despite.",
    def_vi: "bất kể, không màng tới (regardless of)",
    collocations: "regardless of background",
    example: "Every child deserves support regardless of income.",
    ielts_tip: "Cụm 'regardless of' giúp nâng cấp cho 'no matter what'."
  },
  throughout: {
    word: "throughout",
    ipa: "/θruːˈaʊt/",
    pos: "preposition",
    def_en: "All the way through; during the whole course of.",
    def_vi: "xuyên suốt, trong toàn bộ thời gian/không gian",
    collocations: "throughout childhood, throughout history",
    example: "Parental love stays important throughout adolescence.",
    ielts_tip: "Hay hơn 'during all of'."
  },
  within: {
    word: "within",
    ipa: "/wɪˈðɪn/",
    pos: "preposition",
    def_en: "Inside the bounds or limits of.",
    def_vi: "trong phạm vi, ở bên trong",
    collocations: "within the immediate family",
    example: "Values are first taught within the home.",
    ielts_tip: "Trang trọng hơn 'inside'."
  },
  without: {
    word: "without",
    ipa: "/wɪˈðaʊt/",
    pos: "preposition",
    def_en: "In the absence of.",
    def_vi: "mà không có, thiếu vắng",
    collocations: "without consistent guidance",
    example: "Potential cannot flourish without support.",
    ielts_tip: "Thường dùng với V-ing để rút gọn câu điều kiện."
  },
  unless: {
    word: "unless",
    ipa: "/ənˈles/",
    pos: "conjunction",
    def_en: "Except if; only if not.",
    def_vi: "trừ khi, nếu không thì",
    collocations: "unless it is nurtured",
    example: "Talent remains dormant unless it is actively developed.",
    ielts_tip: "Thay thế ngắn gọn và học thuật cho 'if ... not'."
  },
  whether: {
    word: "whether",
    ipa: "/ˈweð.ər/",
    pos: "conjunction",
    def_en: "Expressing a doubt or choice between alternatives.",
    def_vi: "liệu rằng (hay không)",
    collocations: "whether ... or ...",
    example: "Debates center on whether traits are innate or learned.",
    ielts_tip: "Cấu trúc 'regarding whether A or B' rất hay dùng ở Mở bài Writing Task 2."
  },
  between: {
    word: "between",
    ipa: "/bɪˈtwiːn/",
    pos: "preposition",
    def_en: "At, into, or across the space separating two things or people.",
    def_vi: "giữa (hai người/vật/khái niệm)",
    collocations: "between nature and nurture",
    example: "Cooperation between parents and schools benefits learners.",
    ielts_tip: "Dùng 'between' cho 2 đối tượng (hoặc mối quan hệ rạch ròi từng cặp), 'among' cho nhóm nhiều đối tượng."
  },
  among: {
    word: "among",
    ipa: "/əˈmʌŋ/",
    pos: "preposition",
    def_en: "Situated more or less centrally in relation to several other things.",
    def_vi: "trong số, giữa một nhóm nhiều người/vật",
    collocations: "among peers, among siblings",
    example: "Empathy fosters trust among classmates.",
    ielts_tip: "Phân biệt rõ với 'between'."
  },
  rather: {
    word: "rather",
    ipa: "/ˈrɑː.ðər/",
    pos: "adverb",
    def_en: "Used to indicate one's preference or a contrast (rather than).",
    def_vi: "hơn là, thay vì (rather than); khá là",
    collocations: "inherited rather than acquired",
    example: "Guidance rather than punishment builds self-discipline.",
    ielts_tip: "'A rather than B' là cấu trúc so sánh tương phản điểm cao."
  },
  instead: {
    word: "instead",
    ipa: "/ɪnˈsted/",
    pos: "adverb",
    def_en: "As an alternative or substitute.",
    def_vi: "thay vào đó (instead of: thay vì)",
    collocations: "instead of relying on",
    example: "Encourage effort instead of only praising grades.",
    ielts_tip: "Nên đặt 'instead of + V-ing/Noun' để câu gọn."
  },
  towards: {
    word: "towards",
    ipa: "/təˈwɔːdz/",
    pos: "preposition",
    def_en: "In the direction of; contributing to achieving.",
    def_vi: "hướng tới, đối với",
    collocations: "steer towards adulthood",
    example: "Attitudes towards parenting shift across generations.",
    ielts_tip: "Anh–Anh ưu tiên 'towards', Anh–Mỹ hay dùng 'toward'."
  },
  through: {
    word: "through",
    ipa: "/θruː/",
    pos: "preposition",
    def_en: "By means of; moving in one side and out of the other.",
    def_vi: "thông qua, bằng cách; xuyên qua",
    collocations: "through deliberate socialization",
    example: "Children absorb values through daily observation.",
    ielts_tip: "Có thể nâng cấp thành 'via' hoặc 'by means of'."
  },
  across: {
    word: "across",
    ipa: "/əˈkrɒs/",
    pos: "preposition",
    def_en: "From one side to the other; throughout every part of.",
    def_vi: "xuyên suốt, khắp nơi, qua nhiều (thế hệ/quốc gia)",
    collocations: "across generations, across cultures",
    example: "Family traditions pass down across generations.",
    ielts_tip: "'across generations' = qua nhiều thế hệ."
  },
  beyond: {
    word: "beyond",
    ipa: "/bɪˈjɒnd/",
    pos: "preposition",
    def_en: "Further away than; outside the limits or range of.",
    def_vi: "vượt ra ngoài phạm vi",
    collocations: "beyond formal schooling",
    example: "Learning continues well beyond graduation.",
    ielts_tip: "'beyond doubt' / 'beyond expectations' là cụm học thuật hay."
  },
  around: {
    word: "around",
    ipa: "/əˈraʊnd/",
    pos: "preposition / adv.",
    def_en: "Located on every side of; approximately.",
    def_vi: "xung quanh; khoảng chừng",
    collocations: "around the eyes",
    example: "Support networks around a family reduce stress.",
    ielts_tip: "Khi ước lượng số liệu Task 1 có thể thay bằng 'approximately'."
  },
  both: {
    word: "both",
    ipa: "/bəʊθ/",
    pos: "determiner / pron.",
    def_en: "Used to refer to two things or people together.",
    def_vi: "cả hai (both A and B)",
    collocations: "both nature and nurture",
    example: "Both genetics and environment influence growth.",
    ielts_tip: "Cấu trúc song song 'both A and B' bắt buộc A và B cùng từ loại."
  },
  however: {
    word: "however",
    ipa: "/haʊˈev.ər/",
    pos: "adverb",
    def_en: "Used to introduce a statement that contrasts with the previous one.",
    def_vi: "tuy nhiên, dẫu vậy",
    collocations: "However, critics argue...",
    example: "Genetics matter; however, habits are trainable.",
    ielts_tip: "Thường đứng đầu câu (kèm dấu phẩy) hoặc giữa câu (kẹp giữa dấu chấm phẩy và dấu phẩy)."
  },
  therefore: {
    word: "therefore",
    ipa: "/ˈðeə.fɔːr/",
    pos: "adverb",
    def_en: "For that reason; consequently.",
    def_vi: "do đó, vì vậy",
    collocations: "and therefore",
    example: "Early neglect harms trust; therefore, caregivers need support.",
    ielts_tip: "Từ nối chỉ kết quả chuẩn mực trong Writing Task 2."
  },
  moreover: {
    word: "moreover",
    ipa: "/mɔːrˈəʊ.vər/",
    pos: "adverb",
    def_en: "As a further matter; besides.",
    def_vi: "hơn thế nữa, vả lại",
    collocations: "Moreover, studies confirm...",
    example: "Reading builds vocabulary; moreover, it nurtures empathy.",
    ielts_tip: "Dùng để bổ sung luận điểm đồng thuận mạnh mẽ hơn."
  },
  especially: {
    word: "especially",
    ipa: "/ɪˈspeʃ.əl.i/",
    pos: "adverb",
    def_en: "Used to single out one person, thing, or situation over all others.",
    def_vi: "đặc biệt là, nhất là",
    collocations: "especially during infancy",
    example: "Sleep is vital, especially for growing teenagers.",
    ielts_tip: "Đồng nghĩa học thuật: 'particularly' / 'notably'."
  }
};

const IRREGULAR_LEMMAS: Record<string, string[]> = {
  children: ["child"],
  men: ["man"],
  women: ["woman"],
  people: ["person"],
  brought: ["bring up", "bring"],
  "brought up": ["bring up"],
  born: ["bear"],
  borne: ["bear"],
  bears: ["bear"],
  grew: ["grow up", "grow"],
  grown: ["grow up", "grow"],
  grows: ["grow up", "grow"],
  forged: ["forge"],
  forging: ["forge"],
  shaping: ["shape"],
  shaped: ["shape"],
  studies: ["study"],
  studied: ["study"],
  studying: ["study"],
  twins: ["twin"],
  abilities: ["ability"],
  tendencies: ["tendency"],
  responsibilities: ["responsibility"],
  ancestors: ["ancestor"],
  caregivers: ["caregiver"],
  mothers: ["mother"],
  fathers: ["father"],
  brothers: ["brother"],
  sisters: ["sister"],
  parents: ["parent"],
  traditions: ["tradition"],
  traits: ["trait"],
  moods: ["mood"],
  contours: ["contour"],
  challenges: ["challenge"],
  careers: ["career"],
  values: ["value"],
  factors: ["factor"],
  proponents: ["proponent"],
  advocates: ["advocate"],
  parallels: ["parallel"],
  predispositions: ["predisposition"],
  environments: ["environment"],
  responses: ["response"],
  skills: ["skill"],
  individuals: ["individual"],
  adolescents: ["adolescent"],
  adults: ["adult"],
  youngsters: ["youngster"],
  forebears: ["forebear"],
  bloodlines: ["bloodline"],
  blueprints: ["blueprint"],
  newborns: ["newborn"],
  psychologists: ["psychologist"],
  sociologists: ["sociologist"],
  experiences: ["experience"],
  provides: ["provide"],
  providing: ["provide"],
  dissolves: ["dissolve"],
  dissolved: ["dissolve"],
  compels: ["compel"],
  compelled: ["compel"],
  exerts: ["exert"],
  exerted: ["exert"],
  steers: ["steer"],
  steered: ["steer"],
  determines: ["determine"],
  determined: ["determine"],
  materializes: ["materialize"],
  materialized: ["materialize"],
  initiates: ["initiate"],
  initiated: ["initiate"],
  highlights: ["highlight"],
  highlighted: ["highlight"],
  highlighting: ["highlight"],
  reveals: ["reveal"],
  revealed: ["reveal"],
  establishing: ["establish"],
  established: ["establish"],
  cultivating: ["cultivate"],
  cultivated: ["cultivate"],
  enabling: ["enable"],
  enabled: ["enable"],
  involving: ["involve"],
  involved: ["involve"],
  embarking: ["embark"],
  embarked: ["embark"],
  separated: ["separate"],
  separating: ["separate"],
  acquired: ["acquire"],
  acquiring: ["acquire"],
  inherited: ["inherit"],
  inheriting: ["inherit"],
  nurtured: ["nurture"],
  nurturing: ["nurture"],
  deprived: ["deprive"],
  depriving: ["deprive"],
  transmitted: ["transmit"],
  transmitting: ["transmit"],
  dismissed: ["dismiss"],
  dismissing: ["dismiss"],
  focused: ["focus"],
  focusing: ["focus"],
  families: ["family"],
  communities: ["community"],
  influences: ["influence"],
  influenced: ["influence"],
  influencing: ["influence"],
  argues: ["argue"],
  argued: ["argue"],
  arguing: ["argue"],
  observes: ["observe"],
  observed: ["observe"],
  observing: ["observe"],
  matures: ["mature"],
  matured: ["mature"],
  maturing: ["mature"],
  matures_v: ["mature"],
  relies: ["rely"],
  relied: ["rely"],
  relying: ["rely"],
  reaches: ["reach"],
  reached: ["reach"],
  reaching: ["reach"],
  empowers: ["empower"],
  empowered: ["empower"],
  empowering: ["empower"],
  triggers: ["trigger"],
  triggered: ["trigger"],
  triggering: ["trigger"],
  transforms: ["transform"],
  transformed: ["transform"],
  transforming: ["transform"],
  accelerates: ["accelerate"],
  accelerated: ["accelerate"],
  accelerating: ["accelerate"],
  achieves: ["achieve"],
  achieved: ["achieve"],
  achieving: ["achieve"],
  attains: ["attain"],
  attained: ["attain"],
  mastering: ["master"],
  mastered: ["master"],
  safeguards: ["safeguard"],
  safeguarded: ["safeguard"],
  safeguarding: ["safeguard"],
  monitors: ["monitor"],
  monitored: ["monitor"],
  monitoring: ["monitor"],
  accumulates: ["accumulate"],
  accumulated: ["accumulate"],
  accumulating: ["accumulate"],
  maintains: ["maintain"],
  maintained: ["maintain"],
  maintaining: ["maintain"],
  exhibits: ["exhibit"],
  exhibited: ["exhibit"],
  exhibiting: ["exhibit"],
  steps: ["step"],
  activities: ["activity"],
  illnesses: ["illness"],
  campaigns: ["campaign"],
  standards: ["standard"],
  planners: ["planner"],
  hubs: ["hub"],
  arts: ["art"],
  toddlers: ["toddler"],
  codes: ["code"],
  concerns: ["concern"],
  architects: ["architect"],
  shortages: ["shortage"],
  dollars: ["dollar"],
  painters: ["painter"],
  exercises: ["exercise"],
  directives: ["directive"],
  hours: ["hour"],
  cities: ["city"],
  views: ["view"],
  plays: ["play"],
  roles: ["role"],
  reasons: ["reason"],
  words: ["word"],
  needs: ["need"],
  lives: ["life"],
  deeper: ["deep"],
  higher: ["high"],
  greater: ["great"],
  closer: ["close"],
  stronger: ["strong"],
  younger: ["young"],
  earlier: ["early"],
  easier: ["easy"],
  larger: ["large"],
  smaller: ["small"],
  better: ["good"],
  best: ["good"],
  worse: ["bad"],
  worst: ["bad"]
};

function cleanToken(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, "");
}

function extractLabelVietnamese(label: string): string {
  const match = label.match(/\(([^)]+)\)/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return label.trim();
}

function getMorphologyCandidates(clean: string): string[] {
  const candidates: string[] = [];
  if (!clean) return candidates;

  if (IRREGULAR_LEMMAS[clean]) {
    candidates.push(...IRREGULAR_LEMMAS[clean]);
  }

  // Plural & 3rd-person singular verbs
  if (clean.endsWith("ies") && clean.length > 4) {
    candidates.push(clean.slice(0, -3) + "y");
  }
  if (clean.endsWith("ves") && clean.length > 4) {
    candidates.push(clean.slice(0, -3) + "f");
    candidates.push(clean.slice(0, -3) + "fe");
  }
  if (clean.endsWith("es") && clean.length > 3) {
    candidates.push(clean.slice(0, -2));
    candidates.push(clean.slice(0, -1));
  }
  if (clean.endsWith("s") && !clean.endsWith("ss") && !clean.endsWith("us") && !clean.endsWith("is") && clean.length > 3) {
    candidates.push(clean.slice(0, -1));
  }

  // Past tense / past participle (-ed)
  if (clean.endsWith("ied") && clean.length > 4) {
    candidates.push(clean.slice(0, -3) + "y");
  }
  if (clean.endsWith("ed") && clean.length > 3) {
    const stem2 = clean.slice(0, -2);
    const stem1 = clean.slice(0, -1);
    candidates.push(stem2);
    candidates.push(stem1);
    if (stem2.length >= 3 && stem2[stem2.length - 1] === stem2[stem2.length - 2]) {
      candidates.push(stem2.slice(0, -1));
    }
  }

  // Progressive (-ing)
  if (clean.endsWith("ing") && clean.length > 4) {
    const stem3 = clean.slice(0, -3);
    candidates.push(stem3);
    candidates.push(stem3 + "e");
    if (stem3.length >= 3 && stem3[stem3.length - 1] === stem3[stem3.length - 2]) {
      candidates.push(stem3.slice(0, -1));
    }
  }

  // Adverbs (-ly)
  if (clean.endsWith("ily") && clean.length > 4) {
    candidates.push(clean.slice(0, -3) + "y");
  }
  if (clean.endsWith("ally") && clean.length > 5) {
    candidates.push(clean.slice(0, -4));
    candidates.push(clean.slice(0, -2));
  }
  if (clean.endsWith("ly") && clean.length > 3) {
    candidates.push(clean.slice(0, -2));
    candidates.push(clean.slice(0, -2) + "e");
  }

  // Comparatives / superlatives
  if (clean.endsWith("er") && clean.length > 4) {
    candidates.push(clean.slice(0, -2));
    candidates.push(clean.slice(0, -1));
  }
  if (clean.endsWith("est") && clean.length > 5) {
    candidates.push(clean.slice(0, -3));
    candidates.push(clean.slice(0, -2));
  }

  return Array.from(new Set(candidates));
}

interface UnifiedIndex {
  byUnit: Record<number, Record<string, LexiconEntry>>;
  crossUnit: Record<string, LexiconEntry>;
  external: Record<string, LexiconEntry>;
}

let cachedIndex: UnifiedIndex | null = null;

function buildIndexForUnit(unit: CambridgeUnitData): Record<string, LexiconEntry> {
  const map: Record<string, LexiconEntry> = {};

  // 1. Word Arsenal (lowest priority inside unit, superseded by richer notes)
  for (const item of unit.stage3_essay.wordArsenal) {
    const k = item.root.toLowerCase().trim();
    if (!map[k]) {
      map[k] = {
        word: item.root,
        ipa: "",
        pos: item.pos,
        def_en: `Core Unit ${unit.meta.unit} vocabulary (${item.cat}).`,
        def_vi: item.vi,
        collocations: item.root,
        example: `Master "${item.root}" to strengthen lexical variety in Unit ${unit.meta.unit}.`,
        ielts_tip: `Từ vựng cốt lõi Chặng 3 (nhóm ${item.cat}).`
      };
    }
  }

  // 2. Stage 3 Blanks & Variants
  for (const blank of unit.stage3_essay.blanks) {
    for (const v of blank.variants) {
      const k = v.form.toLowerCase().trim();
      const viMeaning = extractLabelVietnamese(v.label);
      if (!map[k]) {
        map[k] = {
          word: v.form,
          ipa: "",
          pos: v.pos,
          def_en: `Morphological variant of "${blank.rootWord}" (${blank.category}).`,
          def_vi: viMeaning,
          collocations: `${v.form} (${blank.category})`,
          example: blank.grammarClue,
          ielts_tip: v.isCorrect
            ? `Đáp án chuẩn trong bài luận: ${blank.grammarClue}`
            : `Biến thể dễ nhầm với "${blank.targetForm}". ${blank.grammarClue}`
        };
      }
    }
  }

  // 3. Stage 2 Timeline Targets
  for (const m of unit.stage2_timeline) {
    const k = m.target.toLowerCase().trim();
    const reconstructed = m.storyEn.replace("[BLANK]", m.target);
    if (!map[k]) {
      map[k] = {
        word: m.target,
        ipa: "",
        pos: m.pos,
        def_en: `Key milestone vocabulary for ${m.stageTag}.`,
        def_vi: m.targetVi,
        collocations: m.title,
        example: reconstructed,
        ielts_tip: m.explanation
      };
    }
  }

  // 4. Stage 1 Magnets Options (captures distractors + targets with rich hints)
  for (const mag of unit.stage1_magnets) {
    const fullSentence = `${mag.sentenceBefore} ${mag.target} ${mag.sentenceAfter}`;
    for (const opt of mag.options) {
      const k = opt.word.toLowerCase().trim();
      const isTarget = k === mag.target.toLowerCase().trim();
      map[k] = {
        word: opt.word,
        ipa: map[k]?.ipa || "",
        pos: opt.pos,
        def_en: isTarget
          ? `Academic target word in "${mag.ieltsInsight.collocation}".`
          : `Contrastive option compared with "${mag.target}" in Unit ${unit.meta.unit}.`,
        def_vi: opt.hint,
        collocations: isTarget ? mag.ieltsInsight.collocation : opt.word,
        example: isTarget ? fullSentence : opt.explanation,
        ielts_tip: isTarget ? `${opt.explanation} ${mag.ieltsInsight.academicTip}` : opt.explanation
      };
    }
  }

  // 5. Explicit lexicon_notes (highest fidelity within the unit)
  for (const [rawKey, entry] of Object.entries(unit.lexicon_notes)) {
    const k = rawKey.toLowerCase().trim();
    map[k] = entry;
    const wordKey = entry.word.toLowerCase().trim();
    if (wordKey !== k && !map[wordKey]) {
      map[wordKey] = entry;
    }
  }

  return map;
}

function getUnifiedIndex(): UnifiedIndex {
  if (cachedIndex) return cachedIndex;

  const byUnit: Record<number, Record<string, LexiconEntry>> = {};
  const crossUnit: Record<string, LexiconEntry> = {};
  const external: Record<string, LexiconEntry> = {};

  // External 1: GLOBAL_DICTIONARY (readingDictionary)
  for (const [rawKey, term] of Object.entries(GLOBAL_DICTIONARY)) {
    const k = rawKey.toLowerCase().trim();
    external[k] = {
      word: term.term || rawKey,
      ipa: term.pronunciation || "",
      pos: term.pos || "vocabulary",
      def_en: term.meaning_en || "",
      def_vi: term.meaning_vi || "",
      collocations: term.term || rawKey,
      example: term.context_note || "",
      ielts_tip: term.humanized?.simple_intuition || ""
    };
  }

  // External 2: VOCAB_IN_USE_UNITS (gives rich IELTS C1/C2 meanings + IPA)
  for (const viuUnit of VOCAB_IN_USE_UNITS) {
    for (const lex of viuUnit.lexicon) {
      const k = lex.word.toLowerCase().trim();
      external[k] = {
        word: lex.word,
        ipa: lex.ipa || "",
        pos: lex.pos || "vocabulary",
        def_en: lex.meaningEn,
        def_vi: lex.meaningVi,
        collocations: lex.word,
        example: lex.example,
        ielts_tip: lex.nuanceTip
      };
    }
  }

  // Build per-unit and merged cross-unit indexes
  for (const unit of ALL_UNITS_LIST) {
    const uMap = buildIndexForUnit(unit);
    byUnit[unit.meta.unit] = uMap;
    for (const [k, entry] of Object.entries(uMap)) {
      const existing = crossUnit[k];
      // Prefer entries that actually carry IPA (from lexicon_notes) over derived entries
      if (!existing || (!existing.ipa && entry.ipa)) {
        crossUnit[k] = entry;
      }
    }
  }

  cachedIndex = { byUnit, crossUnit, external };
  return cachedIndex;
}

function findInMap(
  clean: string,
  map: Record<string, LexiconEntry> | undefined
): LexiconEntry | null {
  if (!clean || !map) return null;
  if (map[clean]) return map[clean];

  const lemmas = getMorphologyCandidates(clean);
  for (const lemma of lemmas) {
    if (map[lemma]) {
      return map[lemma];
    }
  }
  return null;
}

/**
 * Tra cứu thông minh 4 tầng cho bất kỳ từ/cụm từ nào trong Cambridge Vocab B2–C1:
 * 1. Dữ liệu chuyên biệt của Unit hiện tại (lexicon_notes, options, timeline, blanks)
 * 2. Từ điển ngữ cảnh mở rộng (CAMBRIDGE_CONTEXT_GLOSSARY + 250+ distractors)
 * 3. Kho tổng hợp của cả 20 Units Cambridge
 * 4. Kho từ điển hệ thống (VocabInUse + Reading Global Dictionary + Function Words)
 * Không bao giờ trả về chuỗi giả "Thuật ngữ học thuật cần ghi nhớ."
 */
export function lookupCambridgeWord(
  rawWord: string,
  unitId?: number,
  contextSentence?: string
): LexiconEntry {
  const displayRaw = rawWord.trim().replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "") || rawWord.trim();
  const clean = cleanToken(rawWord);
  const index = getUnifiedIndex();

  const unitMap = unitId ? index.byUnit[unitId] : undefined;

  const fromUnit = findInMap(clean, unitMap);
  const fromContext = findInMap(clean, CAMBRIDGE_CONTEXT_GLOSSARY);
  const fromCrossUnit = findInMap(clean, index.crossUnit);
  const fromExternal = findInMap(clean, index.external);
  const fromFunction = findInMap(clean, FUNCTION_WORDS_GLOSSARY);

  // Merge IPA from context/external if unit entry came from options/timeline without IPA
  const primary = fromUnit || fromContext || fromCrossUnit || fromExternal || fromFunction;

  if (primary) {
    const resolvedIpa =
      primary.ipa ||
      fromContext?.ipa ||
      fromCrossUnit?.ipa ||
      fromExternal?.ipa ||
      fromFunction?.ipa ||
      "";
    const resolvedDefEn =
      primary.def_en ||
      fromContext?.def_en ||
      fromExternal?.def_en ||
      "";

    return {
      ...primary,
      ipa: resolvedIpa,
      def_en: resolvedDefEn,
      example: primary.example || contextSentence || ""
    };
  }

  // Fallback for hyphenated compound words (lookup components if whole compound isn't indexed)
  if (clean.includes("-")) {
    const parts = clean.split("-").filter(Boolean);
    const partMeanings = parts
      .map(p => {
        const hit =
          findInMap(p, unitMap) ||
          findInMap(p, CAMBRIDGE_CONTEXT_GLOSSARY) ||
          findInMap(p, index.crossUnit) ||
          findInMap(p, index.external);
        return hit ? `${p}: ${hit.def_vi}` : null;
      })
      .filter((x): x is string => Boolean(x));

    if (partMeanings.length > 0) {
      return {
        word: displayRaw,
        ipa: "",
        pos: "compound word",
        def_en: `Compound expression formed from: ${parts.join(" + ")}.`,
        def_vi: `Từ ghép (${partMeanings.join(" | ")})`,
        collocations: displayRaw,
        example: contextSentence || `Observe how "${displayRaw}" functions in the sentence.`,
        ielts_tip: "Từ ghép học thuật giúp diễn đạt súc tích hơn trong IELTS Writing."
      };
    }
  }

  // Honest fallback (never claims a fake /word/ IPA or "Thuật ngữ học thuật cần ghi nhớ.")
  return {
    word: displayRaw,
    ipa: "",
    pos: "từ tiếng Anh",
    def_en: "",
    def_vi: "Chưa có sẵn trong từ điển offline của bài học — bạn có thể bấm nút tra trực tuyến bên dưới hoặc nghe phát âm.",
    collocations: displayRaw,
    example: contextSentence || "",
    ielts_tip: "Mẹo B1: Đoán nghĩa từ dựa vào các từ xung quanh hoặc bấm 'Tra từ điển trực tuyến'."
  };
}

export function hasOfflineDefinition(entry: LexiconEntry): boolean {
  return !entry.def_vi.startsWith("Chưa có sẵn trong từ điển offline");
}

/**
 * Lấy danh sách các từ cốt lõi của 1 Unit để nạp vào Living Lexicon Deck ("Cần Ôn Tập").
 */
export function getUnitCoreReviewWords(unitData: CambridgeUnitData): string[] {
  const ordered = new Set<string>();
  for (const key of Object.keys(unitData.lexicon_notes)) {
    ordered.add(key.toLowerCase().trim());
  }
  for (const m of unitData.stage1_magnets) {
    ordered.add(m.target.toLowerCase().trim());
  }
  for (const t of unitData.stage2_timeline) {
    ordered.add(t.target.toLowerCase().trim());
  }
  return Array.from(ordered);
}

/**
 * Lấy bản dịch tiếng Việt cho câu đề Chặng 1 (có bản che chỗ trống trước khi làm đúng và bản đầy đủ sau khi làm đúng).
 */
export function getStage1SentenceVi(
  unitId: number,
  magnet: Stage1Magnet,
  solved: boolean
): string | null {
  const unitTrans = UNIT_BILINGUAL_TRANSLATIONS[unitId];
  const entry = unitTrans?.stage1?.[magnet.id];
  if (entry) {
    return solved ? entry.fullVi : entry.maskedVi;
  }
  return null;
}

/**
 * Lấy bản dịch tiếng Việt cho đoạn văn bài luận Chặng 3.
 */
export function getStage3ParagraphVi(
  unitId: number,
  pIndex: number
): string | null {
  const unitTrans = UNIT_BILINGUAL_TRANSLATIONS[unitId];
  return unitTrans?.stage3Paragraphs?.[pIndex] || null;
}

/**
 * Tạo bản tóm tắt nghĩa từ khóa tiếng Việt trong một câu/đoạn văn để hỗ trợ nhanh ngay cả khi chưa có bản dịch văn xuôi đầy đủ (Units 2–20).
 */
export function extractKeyVocabularyHints(
  text: string,
  unitId?: number,
  maxItems = 8
): Array<{ word: string; def_vi: string; ipa: string }> {
  const tokens = text.match(/[a-zA-Z]+(?:-[a-zA-Z]+)*/g) || [];
  const seen = new Set<string>();
  const hints: Array<{ word: string; def_vi: string; ipa: string }> = [];

  for (const token of tokens) {
    const lower = token.toLowerCase();
    if (lower.length <= 3 || lower.startsWith("blank") || seen.has(lower)) continue;
    const entry = lookupCambridgeWord(token, unitId);
    if (hasOfflineDefinition(entry) && !FUNCTION_WORDS_GLOSSARY[lower]) {
      seen.add(lower);
      hints.push({ word: token, def_vi: entry.def_vi, ipa: entry.ipa });
      if (hints.length >= maxItems) break;
    }
  }
  return hints;
}

// In-memory cache for optional online dictionary & translation fallbacks
const onlineWordCache = new Map<string, Partial<LexiconEntry>>();
const onlineTranslationCache = new Map<string, string>();

/**
 * Tra cứu bổ sung trực tuyến cho các từ hiếm chưa có trong từ điển offline.
 * Trả về null an toàn nếu người dùng offline hoặc API bị giới hạn.
 */
export async function fetchOnlineDictionaryFallback(
  rawWord: string
): Promise<Partial<LexiconEntry> | null> {
  const clean = cleanToken(rawWord);
  if (!clean) return null;
  if (onlineWordCache.has(clean)) {
    return onlineWordCache.get(clean) || null;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);

  try {
    const [dictRes, transRes] = await Promise.allSettled([
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`, {
        signal: controller.signal
      }),
      fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=en|vi`,
        { signal: controller.signal }
      )
    ]);

    const result: Partial<LexiconEntry> = { word: clean };

    if (dictRes.status === "fulfilled" && dictRes.value.ok) {
      const json = (await dictRes.value.json()) as Array<{
        phonetic?: string;
        phonetics?: Array<{ text?: string }>;
        meanings?: Array<{
          partOfSpeech?: string;
          definitions?: Array<{ definition?: string; example?: string }>;
        }>;
      }>;
      const first = json?.[0];
      if (first) {
        result.ipa =
          first.phonetic ||
          first.phonetics?.find(p => p.text)?.text ||
          "";
        const firstMeaning = first.meanings?.[0];
        if (firstMeaning) {
          result.pos = firstMeaning.partOfSpeech || "vocabulary";
          const firstDef = firstMeaning.definitions?.[0];
          if (firstDef?.definition) result.def_en = firstDef.definition;
          if (firstDef?.example) result.example = firstDef.example;
        }
      }
    }

    if (transRes.status === "fulfilled" && transRes.value.ok) {
      const tJson = (await transRes.value.json()) as {
        responseData?: { translatedText?: string };
      };
      const vi = tJson?.responseData?.translatedText?.trim();
      if (vi && vi.toLowerCase() !== clean) {
        result.def_vi = vi;
      }
    }

    if (result.def_vi || result.def_en || result.ipa) {
      onlineWordCache.set(clean, result);
      return result;
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Dịch câu/đoạn văn trực tuyến có cache cho các Unit chưa có bản dịch biên soạn sẵn.
 */
export async function fetchOnlineSentenceTranslation(
  text: string
): Promise<string | null> {
  const trimmed = text.trim();
  if (!trimmed) return null;
  if (onlineTranslationCache.has(trimmed)) {
    return onlineTranslationCache.get(trimmed) || null;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=en|vi`,
      { signal: controller.signal }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      responseData?: { translatedText?: string };
    };
    const translated = json?.responseData?.translatedText?.trim();
    if (translated && translated.toLowerCase() !== trimmed.toLowerCase()) {
      onlineTranslationCache.set(trimmed, translated);
      return translated;
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function getStage3SummaryInsight(essay: Stage3Essay): string {
  return essay.wordArsenal.map(w => `${w.root} (${w.vi})`).join(" • ");
}
