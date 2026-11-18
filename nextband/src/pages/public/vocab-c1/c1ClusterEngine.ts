import { VocabC1Unit, WordInAction } from "@/data/vocabC1Unit1";

export interface NuanceDilemma {
  id: string;
  wordId: string;
  targetWord: string;
  scenarioEn: string;
  scenarioVi: string;
  options: string[];
  correctWord: string;
  explanationVi: string;
  nuanceHint: string;
  registerHint?: string;
  visualCueType?: string;
}

export interface SemanticPod {
  id: string;
  podNumber: number;
  titleVi: string;
  descVi: string;
  badge: string;
  words: WordInAction[];
  dilemmas: NuanceDilemma[];
}

interface PodDefinition {
  titleVi: string;
  descVi: string;
  badge: string;
  wordKeys: string[];
}

// Pre-defined semantic clusters for all 12 units
const UNIT_POD_MAP: Record<number, PodDefinition[]> = {
  1: [
    {
      titleVi: "Chùm 1: Dấn Thân & Thách Thức",
      descVi: "Sắc thái cởi mở trải nghiệm mới lạ, táo bạo và phá vỡ quy chuẩn.",
      badge: "Phiêu Lưu",
      wordKeys: ["adventurous", "bold", "daring", "audacious"],
    },
    {
      titleVi: "Chùm 2: Can Trường & Kiên Định",
      descVi: "Đối diện trực diện với nghịch cảnh, hiểm nguy và nỗi sợ sinh tử.",
      badge: "Can Trường",
      wordKeys: ["brave", "courageous", "fearless", "intrepid"],
    },
    {
      titleVi: "Chùm 3: Hào Hiệp & Trượng Nghĩa",
      descVi: "Tinh thần hiệp sĩ, che chở kẻ yếu và lòng quả cảm cao quý.",
      badge: "Hiệp Sĩ",
      wordKeys: ["chivalrous", "gallant", "valiant"],
    },
  ],
  2: [
    {
      titleVi: "Chùm 1: Đầy Đặn & Béo Tốt",
      descVi: "Phân biệt từ mũm mĩm dễ thương đến béo phì bệnh lý hay bệ vệ quý tộc.",
      badge: "Dáng Tròn",
      wordKeys: ["plump", "corpulent", "obese", "stout"],
    },
    {
      titleVi: "Chùm 2: Cơ Bắp & Tráng Kiện",
      descVi: "Thân hình vạm vỡ, săn chắc cơ bắp, lực lưỡng và khung xương rắn rỏi.",
      badge: "Vạm Vỡ",
      wordKeys: ["muscular", "hefty", "husky", "burly", "virile", "sturdy", "robust"],
    },
    {
      titleVi: "Chùm 3: Cao Gầy & Khẳng Khiu",
      descVi: "Các cấp độ từ cao lêu nghêu, gầy trơ xương đến thanh mảnh, da bọc xương.",
      badge: "Dáng Gầy",
      wordKeys: ["lanky", "spindly", "skinny", "bony"],
    },
    {
      titleVi: "Chùm 4: Yếu Ớt & Hốc Hác",
      descVi: "Thể trạng mỏng manh, suy nhược, xanh xao tiều tụy vì bệnh tật.",
      badge: "Suy Nhược",
      wordKeys: ["feeble", "delicate", "frail", "gaunt", "sickly"],
    },
    {
      titleVi: "Chùm 5: Già Cỗi & Thoái Hóa",
      descVi: "Sự suy kiệt về thể xác và trí não do tuổi tác xế chiều.",
      badge: "Tuổi Tác",
      wordKeys: ["decrepit", "senile"],
    },
  ],
  3: [
    {
      titleVi: "Chùm 1: Ngăn Chặn Tuyệt Đối",
      descVi: "Hành động chặn đứng từ trong trứng nước, cấm đoán hoặc cầm giữ dòng chảy.",
      badge: "Ngăn Chặn",
      wordKeys: ["prevent", "stem", "prohibit", "restrain"],
    },
    {
      titleVi: "Chùm 2: Gây Chậm Trễ & Cản Bước",
      descVi: "Làm tiến độ khó khăn, bít lối hoặc ức chế tâm lý làm chậm hành vi.",
      badge: "Cản Trở",
      wordKeys: ["hinder", "obstruct", "inhibit", "hamper", "impede"],
    },
    {
      titleVi: "Chùm 3: Khắc Nghiệt & Cực Đoan",
      descVi: "Khuất phục trước khó khăn, chi phí cắt cổ, quy định gắt gao và cùng quẫn.",
      badge: "Khắc Nghiệt",
      wordKeys: ["succumb", "irksome", "destitute", "extol", "exorbitant", "rigorous"],
    },
  ],
  4: [
    {
      titleVi: "Chùm 1: Hủy Bỏ Pháp Lý & Rút Lại",
      descVi: "Bãi bỏ đạo luật, vô hiệu hóa hợp đồng, tước đoạt giấy phép và triệu hồi.",
      badge: "Pháp Lý",
      wordKeys: ["abolish", "repeal", "annul", "revoke", "recall"],
    },
    {
      titleVi: "Chùm 2: Tiêu Diệt & Xóa Sổ",
      descVi: "Nhổ tận gốc dịch bệnh, tàn sát quy mô lớn hoặc hủy diệt hoàn toàn.",
      badge: "Xóa Sổ",
      wordKeys: ["eradicate", "exterminate", "annihilate", "decimate"],
    },
    {
      titleVi: "Chùm 3: Ngôn Từ & Quyền Hạn",
      descVi: "Khẩn cầu tha thiết, xúc phạm miệt thị, đặc quyền và nắm giữ quyền lực.",
      badge: "Quyền Lực",
      wordKeys: ["beseech", "succinct", "derogatory", "prerogative", "congenital", "wield", "hitch"],
    },
  ],
  5: [
    {
      titleVi: "Chùm 1: Vị Giác Chua & Đắng",
      descVi: "Phân biệt vị chua gắt, chua chát, đắng ngắt và vị chát dịu.",
      badge: "Vị Giác",
      wordKeys: ["acid", "sour", "bitter", "tart"],
    },
    {
      titleVi: "Chùm 2: Lời Lẽ Sâu Cay & Khắc Nghiệt",
      descVi: "Lời nói châm chích cay độc, chỉ trích gay gắt và kỷ luật thép.",
      badge: "Sâu Cay",
      wordKeys: ["caustic", "harsh", "cutting", "biting", "stringent"],
    },
    {
      titleVi: "Chùm 3: Xung Đột & Chi Phối",
      descVi: "Khuất phục đối thủ, thay thế độc tôn, mối thâm thù và lấn chiếm.",
      badge: "Xung Đột",
      wordKeys: ["subjugate", "supersede", "feud", "encroach", "elicit", "renown", "cherish"],
    },
  ],
  6: [
    {
      titleVi: "Chùm 1: Đòn Giáng & Nghịch Cảnh",
      descVi: "Cú sốc bất ngờ, sự cố nhỏ, bước lùi bất lợi và thảm họa kinh hoàng.",
      badge: "Nghịch Cảnh",
      wordKeys: ["blow", "misfortune", "adversity", "calamity", "hardship", "mishap", "reverse"],
    },
    {
      titleVi: "Chùm 2: Thống Khổ & Mất Mát",
      descVi: "Nỗi đau quằn quại, tai ương thử thách và nỗi đau mất người thân.",
      badge: "Thống Khổ",
      wordKeys: ["distress", "affliction", "trial", "stroke", "bereavement"],
    },
    {
      titleVi: "Chùm 3: Bần Cùng & Áp Bức",
      descVi: "Cảnh cơ hàn không chốn dung thân, nhà cửa nhếch nhác và phận bị chà đạp.",
      badge: "Cùng Khổ",
      wordKeys: ["destitute", "indigent", "squalid", "downtrodden"],
    },
  ],
  7: [
    {
      titleVi: "Chùm 1: Co Rút, Khô Héo & Hao Mòn",
      descVi: "Sự co lại về kích thước, tàn héo sinh lực, vơi dần tài nguyên và suy giảm.",
      badge: "Suy Giảm",
      wordKeys: ["shrink", "wither", "dwindle", "contract", "decline", "lessen", "impair", "abate"],
    },
    {
      titleVi: "Chùm 2: Giàu Sang Đối Lập Túng Quẫn",
      descVi: "Cảnh sống giàu sang nhung lụa đối lập với sự bần cùng và ít ỏi nghèo nàn.",
      badge: "Tài Lực",
      wordKeys: ["affluence", "indigence", "meager"],
    },
    {
      titleVi: "Chùm 3: Trạng Thái, Giam Giữ & Nguyên Nhân",
      descVi: "Sự thanh bình tĩnh lặng, giam giữ can thiệp và nguyên nhân sụp đổ.",
      badge: "Trạng Thái",
      wordKeys: ["serene", "detain", "token", "scope", "undoing"],
    },
  ],
  8: [
    {
      titleVi: "Chùm 1: Chuyển Biến & Khởi Sắc",
      descVi: "Làm dịu bớt, làm trầm trọng hơn, khởi đầu và phá bỏ công trình.",
      badge: "Biến Chuyển",
      wordKeys: ["abate", "aggravate", "defect", "demolish", "commence"],
    },
    {
      titleVi: "Chùm 2: Khéo Léo, Tự Phụ & Đức Hạnh",
      descVi: "Sự khéo léo tài tình, bắt chuyện táo bạo, kiêu ngạo và sự thuần khiết.",
      badge: "Hành Vi",
      wordKeys: ["adroit", "accost", "arrogance", "brim", "chaste"],
    },
  ],
  9: [
    {
      titleVi: "Chùm 1: Phẩm Chất, Sức Hút & Phản Ứng",
      descVi: "Sức quyến rũ mê hoặc, hành vi xấc xược, phản cảm và tính khí thất thường.",
      badge: "Cá Tính",
      wordKeys: ["alluring", "cheeky", "abhorrent", "slovenly", "whimsical"],
    },
    {
      titleVi: "Chùm 2: Xuống Cấp & Tâm Lý Hoảng Loạn",
      descVi: "Sự hư hỏng suy tàn, mùi hôi thối thấu trời, tâm trạng rối bời và lan man.",
      badge: "Tâm Trạng",
      wordKeys: ["deteriorate", "fetid", "detrimental", "rattled", "discursive"],
    },
  ],
  10: [
    {
      titleVi: "Chùm 1: Nghề Thủ Công & Buôn Bán",
      descVi: "Người bán hàng rong, thợ đóng giày, nghệ nhân gốm, thợ may mũ và bán cá.",
      badge: "Nghề Nghiệp",
      wordKeys: ["peddler", "cobbler", "potter", "milliner", "fishmonger", "hardware dealer"],
    },
    {
      titleVi: "Chùm 2: Thợ Chuyên Môn & Kỹ Thuật",
      descVi: "Nhà viết kịch, thợ sửa khóa, thợ ống nước và thợ lợp mái tranh.",
      badge: "Chuyên Môn",
      wordKeys: ["playwright", "locksmith", "plumber", "thatcher"],
    },
  ],
  11: [
    {
      titleVi: "Chùm 1: Vứt Bỏ & Rời Bỏ Nơi Chốn",
      descVi: "Bỏ đi đồ vật không cần, phụ tình người thương và bỏ rơi đồng đội.",
      badge: "Rời Bỏ",
      wordKeys: ["discard", "forsook", "desert", "abandon"],
    },
    {
      titleVi: "Chùm 2: Từ Bỏ Quyền Lực & Nhượng Bộ",
      descVi: "Thoái vị ngai vàng, từ chức, nhượng lại lãnh thổ và tuyên bố khước từ.",
      badge: "Thoái Vị",
      wordKeys: ["relinquish", "resign", "abdicate", "surrender", "cede", "renounce"],
    },
  ],
  12: [
    {
      titleVi: "Chùm 1: Định Giá & Cân Nhắc Giá Trị",
      descVi: "Đánh giá chất lượng, coi trọng, tính toán cẩn thận và thẩm định tài sản.",
      badge: "Định Giá",
      wordKeys: ["evaluate", "appreciate", "calculated", "esteem", "deem", "estimate", "appraise", "assessed"],
    },
    {
      titleVi: "Chùm 2: Lùng Sục & Truyền Đạt",
      descVi: "Lùng sục tìm kiếm kỹ lưỡng và truyền đạt trao tặng tri thức.",
      badge: "Hành Động",
      wordKeys: ["scour", "impart"],
    },
  ],
};

function cleanExampleToScenario(example: string, word: string): { scenarioEn: string; target: string } {
  // If example has **target**, replace with gap
  if (example.includes("**")) {
    const parts = example.split("**");
    if (parts.length >= 3) {
      const target = parts[1];
      const scenarioEn = parts[0] + "________" + parts.slice(2).join("");
      return { scenarioEn, target };
    }
  }

  // Regex match whole word
  const regex = new RegExp(`\\b${word}\\b`, "i");
  if (regex.test(example)) {
    return {
      scenarioEn: example.replace(regex, "________"),
      target: word,
    };
  }

  return {
    scenarioEn: `The situation called for a truly ________ approach: "${example}"`,
    target: word,
  };
}

function buildDilemmaForWord(wordItem: WordInAction, podWords: WordInAction[], allUnitWords: WordInAction[]): NuanceDilemma {
  // 1. If explicit contrastiveRecall already exists (Units 1-2)
  if (wordItem.contrastiveRecall) {
    const cr = wordItem.contrastiveRecall;
    return {
      id: `dilemma-${wordItem.id}`,
      wordId: wordItem.id,
      targetWord: wordItem.word,
      scenarioEn: cr.scenarioEn,
      scenarioVi: cr.scenarioVi,
      options: cr.options,
      correctWord: cr.correctWord,
      explanationVi: cr.explanationVi,
      nuanceHint: wordItem.nuance,
      registerHint: wordItem.register,
      visualCueType: wordItem.visualCueType,
    };
  }

  // 2. Build high-quality contextual dilemma from example sentence
  const { scenarioEn } = cleanExampleToScenario(wordItem.example, wordItem.word);
  
  // Pick 3 distractors from sibling words in the same pod first, then from the whole unit
  const candidateDistractors = podWords
    .filter((w) => w.word.toLowerCase() !== wordItem.word.toLowerCase())
    .map((w) => w.word);

  if (candidateDistractors.length < 3) {
    const otherUnitWords = allUnitWords
      .filter((w) => w.word.toLowerCase() !== wordItem.word.toLowerCase() && !candidateDistractors.includes(w.word))
      .map((w) => w.word);
    candidateDistractors.push(...otherUnitWords.slice(0, 3 - candidateDistractors.length));
  }

  // Shuffle 3 distractors + 1 correct answer
  const chosenDistractors = candidateDistractors.slice(0, 3);
  const options = [wordItem.word, ...chosenDistractors].sort(() => 0.5 - Math.random());

  const explanationVi = `Đáp án chuẩn là "${wordItem.word}" (${wordItem.nuance}): ${wordItem.viDef}. Phù hợp nhất với ngữ cảnh: "${wordItem.example.replace(/\*\*/g, "")}".`;

  return {
    id: `dilemma-${wordItem.id}`,
    wordId: wordItem.id,
    targetWord: wordItem.word,
    scenarioEn,
    scenarioVi: wordItem.viDef,
    options,
    correctWord: wordItem.word,
    explanationVi,
    nuanceHint: wordItem.nuance,
    registerHint: wordItem.register,
    visualCueType: wordItem.visualCueType,
  };
}

/**
 * Splits a VocabC1Unit's words into Semantic Pods (clusters)
 * and generates nuance dilemmas for every word.
 */
export function getPodsForUnit(unit: VocabC1Unit): SemanticPod[] {
  const definitions = UNIT_POD_MAP[unit.unitId];
  const allWords = unit.wordsInAction;

  if (!definitions || definitions.length === 0) {
    // Fallback: chunk every 4 words into a pod
    const chunkSize = 4;
    const pods: SemanticPod[] = [];
    for (let i = 0; i < allWords.length; i += chunkSize) {
      const slice = allWords.slice(i, i + chunkSize);
      const podNum = Math.floor(i / chunkSize) + 1;
      const dilemmas = slice.map((w) => buildDilemmaForWord(w, slice, allWords));
      pods.push({
        id: `unit-${unit.unitId}-pod-${podNum}`,
        podNumber: podNum,
        titleVi: `Chùm ${podNum}: Nhóm Từ vựng C1`,
        descVi: `Khám phá các sắc thái tương phản của ${slice.length} từ vựng.`,
        badge: `Chùm ${podNum}`,
        words: slice,
        dilemmas,
      });
    }
    return pods;
  }

  return definitions.map((def, idx) => {
    // Find matching words in the unit by keyword or prefix
    const podWords: WordInAction[] = [];
    for (const key of def.wordKeys) {
      const found = allWords.find(
        (w) => w.word.toLowerCase() === key.toLowerCase() || w.targetKeyword?.toLowerCase() === key.toLowerCase()
      );
      if (found) {
        podWords.push(found);
      }
    }

    // If any word key wasn't matched exactly, fallback to any unassigned word
    if (podWords.length === 0) {
      podWords.push(...allWords.slice(idx * 4, idx * 4 + 4));
    }

    const dilemmas = podWords.map((w) => buildDilemmaForWord(w, podWords, allWords));

    return {
      id: `unit-${unit.unitId}-pod-${idx + 1}`,
      podNumber: idx + 1,
      titleVi: def.titleVi,
      descVi: def.descVi,
      badge: def.badge,
      words: podWords,
      dilemmas,
    };
  });
}
