export interface WordInAction {
  id: string;
  word: string;
  ipa: string;
  nuance: string;
  register?: string;
  collocations?: string[];
  enDef: string;
  viDef: string;
  example: string;
  targetKeyword: string;
}

export interface WordFormationItem {
  id: string;
  adjective: string;
  noun: string;
  root: string;
  suffix: string;
  meaningVi: string;
  suffixChoices: string[];
  ruleTip?: string;
}

export interface ConfusablePair {
  id: string;
  pairKey?: string;
  wordA: string;
  wordB: string;
  diffHighlightA: { before: string; highlight: string; after: string };
  diffHighlightB: { before: string; highlight: string; after: string };
  promptSentence: string;
  correctWord: string;
  defA: string;
  defB: string;
  mnemonic?: string;
  distinctionTip?: string;
}

export interface SynonymFilterChallenge {
  id: string;
  targetWord: string;
  targetMeaning: string;
  targetCategory?: string;
  targetMeaningVi?: string;
  note?: string;
  words: {
    word: string;
    isSynonym: boolean;
    meaningVi?: string;
  }[];
}

export interface ClozeGap {
  gapNumber: number;
  options: { label: string; text: string }[];
  correctLabel: string;
  correctWord: string;
  targetWord?: string;
  explanations?: Record<string, string>;
  explanationVi?: string;
}

export interface ClozePassage {
  id: string;
  title: string;
  sourceLabel: string;
  passageTemplate: string; // contains {{gap_X}}
  gaps: ClozeGap[];
}

export interface SpeedBlitzQuestion {
  id: string;
  questionNumber: number;
  prompt: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanations: { key: string; word: string; pos: string; vi: string }[];
}

export interface VocabC1Unit {
  unitId: number;
  title: string;
  subtitle: string;
  wordsInAction: WordInAction[];
  wordFormation: WordFormationItem[];
  confusableWords: ConfusablePair[];
  synonymFilter: SynonymFilterChallenge[];
  clozePassages: ClozePassage[];
  speedBlitz: SpeedBlitzQuestion[];
}

export const VOCAB_C1_UNIT_1: VocabC1Unit = {
  unitId: 1,
  title: "Unit 1: Adjectives Showing Courage",
  subtitle: "The Vocabulary Files - Level C1 (Pages 3-6)",
  
  // 1. Words in Action (11 words from Page 3)
  wordsInAction: [
    {
      id: "wia-1",
      word: "adventurous",
      ipa: "/ədˈven.tʃər.əs/",
      nuance: "[Looks for adventure]",
      register: "General / Neutral",
      collocations: ["adventurous spirit", "adventurous journey", "adventurous cook"],
      enDef: "An adventurous person is eager to visit new places and have new or exciting experiences.",
      viDef: "Thích phiêu lưu, ưa mạo hiểm, luôn tìm kiếm những trải nghiệm mới lạ.",
      example: "An **adventurous** explorer who ventured deep into uncharted territory.",
      targetKeyword: "adventurous"
    },
    {
      id: "wia-2",
      word: "brave",
      ipa: "/breɪv/",
      nuance: "[Self-confident in danger]",
      register: "General / Universal",
      collocations: ["brave face", "brave decision", "put on a brave front"],
      enDef: "Self-confident in the presence of danger and ready to suffer pain.",
      viDef: "Can đảm, tự tin đối mặt hiểm nguy và sẵn sàng đón nhận đau đớn.",
      example: "A **brave** firefighter who ran into the inferno to rescue trapped victims.",
      targetKeyword: "brave"
    },
    {
      id: "wia-3",
      word: "chivalrous",
      ipa: "/ˈʃɪv.əl.rəs/",
      nuance: "[+ Moral element & Protective]",
      register: "Literary / Formal",
      collocations: ["chivalrous conduct", "chivalrous gesture", "chivalrous gentleman"],
      enDef: "Puts himself in danger for the protection of others (noble, respectful of the weak).",
      viDef: "Hào hiệp, trượng nghĩa; sẵn sàng xả thân che chở người khác, đặc biệt là phái yếu.",
      example: "His **chivalrous** conduct won him the respect and admiration of everyone in town.",
      targetKeyword: "chivalrous"
    },
    {
      id: "wia-4",
      word: "bold",
      ipa: "/boʊld/",
      nuance: "[Stands out & Unhesitating]",
      register: "Formal / Written & Spoken",
      collocations: ["bold move", "bold step", "bold statement", "bold stroke"],
      enDef: "Stands out and faces danger bravely, willing to take prominent risks.",
      viDef: "Táo bạo, dũng cảm nổi trội; dám đứng mũi chịu sào không chùn bước.",
      example: "She took a **bold** stand against corruption in her department.",
      targetKeyword: "bold"
    },
    {
      id: "wia-5",
      word: "daring",
      ipa: "/ˈdeə.rɪŋ/",
      nuance: "[Defies any dangers]",
      register: "Written / Expressive",
      collocations: ["daring raid", "daring rescue", "daring feat", "daring innovation"],
      enDef: "Defies any dangers; bold in taking perilous or audacious chances.",
      viDef: "Liều lĩnh, quả cảm; sẵn sàng thách thức bất kỳ hiểm nguy nào.",
      example: "The paratroopers mounted a **daring** raid under the cover of night.",
      targetKeyword: "daring"
    },
    {
      id: "wia-6",
      word: "fearless",
      ipa: "/ˈfɪə.ləs/",
      nuance: "[Shows no fear]",
      register: "General / Written & Spoken",
      collocations: ["fearless fighter", "fearless reporting", "fearless advocacy"],
      enDef: "Shows no fear whatsoever; completely immune to fright or terror.",
      viDef: "Không hề biết sợ hãi; gan góc, can trường tuyệt đối.",
      example: "A **fearless** investigative journalist uncovering cartel activities.",
      targetKeyword: "fearless"
    },
    {
      id: "wia-7",
      word: "intrepid",
      ipa: "/ɪnˈtrep.ɪd/",
      nuance: "[Possesses unshakable nerves]",
      register: "Formal / Journalistic",
      collocations: ["intrepid explorer", "intrepid traveler", "intrepid reporter"],
      enDef: "Possesses unshakable nerves; calmly resolute in the most terrifying conditions.",
      viDef: "Kiên cường bất khuất; sở hữu tinh thần thép, vững vàng không nao núng.",
      example: "The **intrepid** mountaineer reached the summit despite the howling blizzard.",
      targetKeyword: "intrepid"
    },
    {
      id: "wia-8",
      word: "courageous",
      ipa: "/kəˈreɪ.dʒəs/",
      nuance: "[+ Moral purpose & Conviction]",
      register: "Formal / Academic",
      collocations: ["courageous decision", "courageous stand", "courageous leadership"],
      enDef: "More than brave, adding a strong moral conviction and spiritual fortitude to his/her deeds.",
      viDef: "Dũng cảm vì lý tưởng đạo đức; can trường đấu tranh cho chính nghĩa.",
      example: "A **courageous** decision to speak the truth even when facing dismissal.",
      targetKeyword: "courageous"
    },
    {
      id: "wia-9",
      word: "audacious",
      ipa: "/ɔːˈdeɪ.ʃəs/",
      nuance: "[Defiant of law or decorum]",
      register: "Formal / Sophisticated",
      collocations: ["audacious plan", "audacious claim", "audacious move", "audacious audacity"],
      enDef: "Exhibits a fearless spirit, defiant even of established laws, protocol, or decorum.",
      viDef: "Táo tợn, ngang tàng; dám vượt qua mọi khuôn khổ, luật lệ hay lề thói thường tình.",
      example: "An **audacious** escape plan that defied all security measures of the prison.",
      targetKeyword: "audacious"
    },
    {
      id: "wia-10",
      word: "gallant",
      ipa: "/ˈɡæl.ənt/",
      nuance: "[Dashing & Showy courage]",
      register: "Literary / Historical",
      collocations: ["gallant attempt", "gallant effort", "gallant defender"],
      enDef: "Brave in a dashing, chivalric, and showy way; heroic and attentive.",
      viDef: "Quả cảm hào hoa, phong nhã; dũng cảm một cách đĩnh đạc và rực rỡ.",
      example: "The soldiers made a **gallant** attempt to hold off the advancing enemy battalion.",
      targetKeyword: "gallant"
    },
    {
      id: "wia-11",
      word: "valiant",
      ipa: "/ˈvæl.i.ənt/",
      nuance: "[Faces danger & Achieves results]",
      register: "Literary / Formal",
      collocations: ["valiant effort", "valiant battle", "valiant struggle"],
      enDef: "Not only faces great dangers successfully but also achieves heroic, enduring results.",
      viDef: "Anh dũng hiển hách; chiến đấu kiên cường và gặt hái thành quả vẻ vang.",
      example: "Despite their **valiant** efforts, the small garrison was eventually overpowered.",
      targetKeyword: "valiant"
    }
  ],

  // 2. Word Formation (23 pairs from Page 3 Exercise A & Page 4 Task Two)
  wordFormation: [
    {
      id: "wf-1",
      adjective: "adventurous",
      noun: "adventure",
      root: "advent",
      suffix: "-ure",
      meaningVi: "thích phiêu lưu -> chuyến phiêu lưu",
      suffixChoices: ["-ure", "-ness", "-ity", "-ence"],
      ruleTip: "Gốc Latin 'advenire' (đến) ➔ danh từ tận cùng bằng '-ure' (hành trình/thể nghiệm); bỏ hậu tố tính từ '-ous'."
    },
    {
      id: "wf-2",
      adjective: "brave",
      noun: "bravery",
      root: "brav",
      suffix: "-ery",
      meaningVi: "dũng cảm -> lòng dũng cảm",
      suffixChoices: ["-ery", "-ment", "-ness", "-ity"],
      ruleTip: "Tính từ gốc kết thúc bằng 'e' (brave) thêm '-ry' (hoặc gốc 'brav' + '-ery') để tạo danh từ chỉ phẩm chất (như slave ➔ slavery)."
    },
    {
      id: "wf-3",
      adjective: "chivalrous",
      noun: "chivalry",
      root: "chival",
      suffix: "-ry",
      meaningVi: "hào hiệp -> tinh thần hiệp sĩ",
      suffixChoices: ["-ry", "-ism", "-ness", "-ity"],
      ruleTip: "Tương tự nhóm tính từ đuôi '-ous' gốc hiệp sĩ Pháp: lược bỏ '-ous' và nhận hậu tố tập hợp/phẩm chất '-ry'."
    },
    {
      id: "wf-4",
      adjective: "bold",
      noun: "boldness",
      root: "bold",
      suffix: "-ness",
      meaningVi: "táo bạo -> tính táo bạo",
      suffixChoices: ["-ness", "-ity", "-ment", "-ance"],
      ruleTip: "Tính từ gốc German/Anglo-Saxon đơn âm tiết thường trực tiếp gắn hậu tố '-ness' (bold ➔ boldness, cold ➔ coldness)."
    },
    {
      id: "wf-5",
      adjective: "daring",
      noun: "daring",
      root: "dar",
      suffix: "-ing",
      meaningVi: "liều lĩnh -> sự liều lĩnh / thách thức",
      suffixChoices: ["-ing", "-ness", "-ity", "-ance"],
      ruleTip: "Dạng danh động từ (gerund/verbal noun) '-ing' kiêm luôn vai trò danh từ trừu tượng chỉ hành động dám làm (dare ➔ daring)."
    },
    {
      id: "wf-6",
      adjective: "fearless",
      noun: "fearlessness",
      root: "fearless",
      suffix: "-ness",
      meaningVi: "không sợ hãi -> tính can trường",
      suffixChoices: ["-ness", "-ity", "-ance", "-tion"],
      ruleTip: "Mọi tính từ mang hậu tố phủ định '-less' đều biến đổi thành danh từ chỉ trạng thái bằng cách thêm '-ness' (fearless ➔ fearlessness)."
    },
    {
      id: "wf-7",
      adjective: "intrepid",
      noun: "intrepidness",
      root: "intrepid",
      suffix: "-ness",
      meaningVi: "kiên cường -> sự kiên cường không nao núng",
      suffixChoices: ["-ness", "-ity", "-ment", "-tion"],
      ruleTip: "Có thể dùng cả 'intrepidness' (-ness) hoặc 'intrepidity' (-ity); trong Unit 1 này sách tập trung quy tắc phái sinh '-ness'."
    },
    {
      id: "wf-8",
      adjective: "courageous",
      noun: "courage",
      root: "courag",
      suffix: "-e",
      meaningVi: "can trường -> lòng can đảm",
      suffixChoices: ["-e", "-ness", "-ity", "-ment"],
      ruleTip: "Lược bỏ hậu tố tính từ '-ous' trở về danh từ gốc tiếng Pháp 'courage' (gốc 'coeur' = trái tim can trường)."
    },
    {
      id: "wf-9",
      adjective: "audacious",
      noun: "audacity",
      root: "audac",
      suffix: "-ity",
      meaningVi: "ngang tàng -> sự táo tợn, cả gan",
      suffixChoices: ["-ity", "-ness", "-ence", "-our"],
      ruleTip: "Quy tắc ngữ âm Latin: đuôi '-cious' chuyển thành danh từ '-city' /-səti/ (audacious ➔ audacity, tenacious ➔ tenacity)."
    },
    {
      id: "wf-10",
      adjective: "gallant",
      noun: "gallantry",
      root: "gallant",
      suffix: "-ry",
      meaningVi: "hào hoa dũng cảm -> nghĩa khí hiệp sĩ",
      suffixChoices: ["-ry", "-ness", "-ity", "-ance"],
      ruleTip: "Thêm '-ry' vào tính từ gốc để chỉ phẩm chất cao quý hiệp sĩ hoặc hành vi nghĩa hiệp (gallant ➔ gallantry)."
    },
    {
      id: "wf-11",
      adjective: "valiant",
      noun: "valour",
      root: "val",
      suffix: "-our",
      meaningVi: "anh dũng -> lòng dũng cảm hiển hách",
      suffixChoices: ["-our", "-ness", "-ity", "-ance"],
      ruleTip: "Biến đổi gốc từ đặc biệt: 'valiant' phái sinh từ danh từ cổ Norman-French 'valour' (tiếng Anh-Anh có 'u', Anh-Mỹ là 'valor')."
    },
    {
      id: "wf-12",
      adjective: "significant",
      noun: "significance",
      root: "signific",
      suffix: "-ance",
      meaningVi: "đáng kể, quan trọng -> tầm quan trọng",
      suffixChoices: ["-ance", "-ity", "-ness", "-tion"],
      ruleTip: "Cặp biến đổi quen thuộc: tính từ kết thúc bằng '-ant' chuyển sang danh từ đuôi '-ance' (significant ➔ significance)."
    },
    {
      id: "wf-13",
      adjective: "cordial",
      noun: "cordiality",
      root: "cordial",
      suffix: "-ity",
      meaningVi: "thân ái -> sự thân tình ấm áp",
      suffixChoices: ["-ity", "-ness", "-ment", "-ance"],
      ruleTip: "Tính từ kết thúc bằng phụ âm '-al' nhận hậu tố học thuật '-ity' và đổi trọng âm vào âm tiết đứng trước nó (cor'dial ➔ cordi'ality)."
    },
    {
      id: "wf-14",
      adjective: "indecent",
      noun: "indecency",
      root: "indec",
      suffix: "-ency",
      meaningVi: "khiếm nhã -> sự bất lịch sự, khiếm nhã",
      suffixChoices: ["-ency", "-ity", "-ness", "-tion"],
      ruleTip: "Tính từ đuôi '-ent' chuyển hóa thành danh từ đuôi '-ency' hoặc '-ence' (decent ➔ decency, indecent ➔ indecency)."
    },
    {
      id: "wf-15",
      adjective: "obscure",
      noun: "obscurity",
      root: "obscur",
      suffix: "-ity",
      meaningVi: "mờ mịt, ít người biết -> sự tối tăm vô danh",
      suffixChoices: ["-ity", "-ness", "-ance", "-tion"],
      ruleTip: "Bỏ 'e' câm cuối tính từ và thêm '-ity' chỉ trạng thái (obscure ➔ obscurity, pure ➔ purity)."
    },
    {
      id: "wf-16",
      adjective: "pious",
      noun: "piety",
      root: "pie",
      suffix: "-ty",
      meaningVi: "sùng đạo -> lòng mộ đạo",
      suffixChoices: ["-ty", "-ness", "-ity", "-ance"],
      ruleTip: "Lược bỏ '-ous' và thêm '-ty', phát âm đổi từ /ˈpaɪ.əs/ thành /ˈpaɪ.ə.ti/ (pious ➔ piety)."
    },
    {
      id: "wf-17",
      adjective: "illiterate",
      noun: "illiteracy",
      root: "illiter",
      suffix: "-acy",
      meaningVi: "mù chữ -> nạn mù chữ",
      suffixChoices: ["-acy", "-ity", "-ness", "-tion"],
      ruleTip: "Tính từ đuôi '-ate' thường tạo danh từ trạng thái với đuôi '-acy' (literate ➔ literacy, illiterate ➔ illiteracy)."
    },
    {
      id: "wf-18",
      adjective: "hostile",
      noun: "hostility",
      root: "hostil",
      suffix: "-ity",
      meaningVi: "thù địch -> sự hiềm khích thù địch",
      suffixChoices: ["-ity", "-ness", "-ance", "-ment"],
      ruleTip: "Tính từ đuôi '-ile' chuyển sang danh từ bằng cách bỏ 'e' thêm '-ity' (hostile ➔ hostility, agile ➔ agility)."
    },
    {
      id: "wf-19",
      adjective: "wise",
      noun: "wisdom",
      root: "wis",
      suffix: "-dom",
      meaningVi: "thông thái -> sự khôn ngoan trí tuệ",
      suffixChoices: ["-dom", "-ness", "-ity", "-hood"],
      ruleTip: "Hậu tố German cổ '-dom' chỉ lĩnh vực hoặc phẩm chất cao nhất (wise ➔ wisdom [rút ngắn nguyên âm], king ➔ kingdom)."
    },
    {
      id: "wf-20",
      adjective: "versatile",
      noun: "versatility",
      root: "versatil",
      suffix: "-ity",
      meaningVi: "đa năng -> tính linh hoạt đa tài",
      suffixChoices: ["-ity", "-ness", "-ance", "-tion"],
      ruleTip: "Quy tắc đuôi '-ile' ➔ '-ility': chuyển trọng âm rơi vào âm tiết thứ 3 từ cuối lên (versatile ➔ versatility)."
    },
    {
      id: "wf-21",
      adjective: "flexible",
      noun: "flexibility",
      root: "flexibil",
      suffix: "-ity",
      meaningVi: "linh hoạt -> sự mềm dẻo linh hoạt",
      suffixChoices: ["-ity", "-ness", "-ment", "-tion"],
      ruleTip: "Quy tắc vàng: Mọi tính từ đuôi '-ible / -able' đều chuyển thành danh từ '-ibility / -ability' (flexible ➔ flexibility)."
    },
    {
      id: "wf-22",
      adjective: "tolerant",
      noun: "tolerance",
      root: "toler",
      suffix: "-ance",
      meaningVi: "khoan dung -> lòng khoan dung nhẫn nại",
      suffixChoices: ["-ance", "-ity", "-ness", "-ence"],
      ruleTip: "Tính từ đuôi '-ant' chuyển hóa thành danh từ đuôi '-ance' (tolerant ➔ tolerance, observant ➔ observance)."
    },
    {
      id: "wf-23",
      adjective: "defiant",
      noun: "defiance",
      root: "defi",
      suffix: "-ance",
      meaningVi: "thách thức chống đối -> sự khiêu khích ngang ngạnh",
      suffixChoices: ["-ance", "-ity", "-ness", "-ence"],
      ruleTip: "Gốc động từ 'defy' (y ➔ i) + đuôi tính từ '-ant' ➔ danh từ tương ứng luôn là đuôi '-ance' (defiance)."
    }
  ],

  // 3. Confusable Words (8 1v1 Split-Cards from Page 5 Task Three)
  confusableWords: [
    {
      id: "cw-1",
      pairKey: "A",
      wordA: "deceased",
      wordB: "diseased",
      diffHighlightA: { before: "d", highlight: "eceas", after: "ed" },
      diffHighlightB: { before: "d", highlight: "iseas", after: "ed" },
      promptSentence: "Mr. Jones is no longer at this telephone number; I'm afraid he's ______.",
      correctWord: "deceased",
      defA: "deceased (adj/n): (Người) Đã qua đời gần đây",
      defB: "diseased (adj): Bị nhiễm bệnh tật hiểm nghèo",
      mnemonic: "de-cease: 'cease' nghĩa là 'ngừng lại' (ngừng thở, ngừng sống = đã mất); còn 'dis-ease' là 'mất đi sự thoải mái (ease)' = bị bệnh.",
      distinctionTip: "Deceased = tử vong (cease = stop). Diseased = bệnh tật (disease)."
    },
    {
      id: "cw-2",
      pairKey: "B",
      wordA: "locate",
      wordB: "localize",
      diffHighlightA: { before: "loca", highlight: "te", after: "" },
      diffHighlightB: { before: "loca", highlight: "lize", after: "" },
      promptSentence: "I'm trying to ______ Shoreline Drive on the map, but I can't find it.",
      correctWord: "locate",
      defA: "locate (v): Xác định vị trí của ai hoặc vật gì",
      defB: "localize (v): Khoanh vùng, giới hạn trong một khu vực",
      mnemonic: "Locate = tìm ra điểm tọa độ (Location pin). Localize = giữ lại ở phạm vi cục bộ/khoanh vùng ổ dịch (local scope).",
      distinctionTip: "Locate = 'Where is it?' (tìm vị trí). Localize = 'Keep it here!' (khoanh vùng không cho lan)."
    },
    {
      id: "cw-3",
      pairKey: "C",
      wordA: "luxurious",
      wordB: "luxuriant",
      diffHighlightA: { before: "luxuri", highlight: "ous", after: "" },
      diffHighlightB: { before: "luxuri", highlight: "ant", after: "" },
      promptSentence: "Their house was filled with ______ furnishings.",
      correctWord: "luxurious",
      defA: "luxurious (adj): Xa hoa, sang trọng, tiện nghi đắt tiền",
      defB: "luxuriant (adj): (Cây cối) Mọc tươi tốt sum suê, rậm rạp",
      mnemonic: "Luxuri-OUS = Luxury (đồ vật/nhà cửa đắt tiền xa hoa). Luxuri-ANT = Pl-ANT (thực vật tốt tươi, rậm rạp).",
      distinctionTip: "Luxurious dùng cho đồ vật/khách sạn (xa xỉ). Luxuriant dùng cho thảm thực vật/mái tóc (sum sê, dày mượt)."
    },
    {
      id: "cw-4",
      pairKey: "D",
      wordA: "eminent",
      wordB: "imminent",
      diffHighlightA: { before: "", highlight: "e", after: "minent" },
      diffHighlightB: { before: "", highlight: "im", after: "minent" },
      promptSentence: "All the students were nervous about the ______ exams.",
      correctWord: "imminent",
      defA: "eminent (adj): Xuất chúng, lỗi lạc, danh tiếng lẫy lừng",
      defB: "imminent (adj): Sắp xảy ra đến nơi (thường là điều lo âu)",
      mnemonic: "Eminent: 'E' như 'Excellence' (xuất sắc, danh họa/học giả). Imminent: 'IM' như 'Immediate' (sắp ập tới ngay trước mắt).",
      distinctionTip: "Eminent scientist (nhà khoa học lỗi lạc). Imminent danger/exam (hiểm nguy/kỳ thi cận kề)."
    },
    {
      id: "cw-5",
      pairKey: "E",
      wordA: "ingenious",
      wordB: "ingenuous",
      diffHighlightA: { before: "ingen", highlight: "i", after: "ous" },
      diffHighlightB: { before: "ingen", highlight: "u", after: "ous" },
      promptSentence: "Mark has come up with an ______ plan to make a million dollars.",
      correctWord: "ingenious",
      defA: "ingenious (adj): Tài tình, khéo léo, phát minh độc đáo",
      defB: "ingenuous (adj): Chân thật, ngây thơ, không mưu mô che giấu",
      mnemonic: "Ingen-I-ous: chữ 'I' viết tắt của 'IQ / Invention / Intelligence' (thông minh xảo diệu). Ingen-U-ous: chữ 'U' là 'Unsuspecting / U ngây thơ'.",
      distinctionTip: "Ingenious plan/device (kế hoạch/thiết bị tài tình). Ingenuous smile/remark (nụ cười ngây thơ, mộc mạc)."
    },
    {
      id: "cw-6",
      pairKey: "F",
      wordA: "captured",
      wordB: "captivated",
      diffHighlightA: { before: "capt", highlight: "ured", after: "" },
      diffHighlightB: { before: "capt", highlight: "ivated", after: "" },
      promptSentence: "The pirates managed to stop the ship and they ______ the captain and the crew.",
      correctWord: "captured",
      defA: "capture (v): Bắt giữ ai đó làm tù binh",
      defB: "captivate (v): Mê hoặc, quyến rũ, thu hút tâm trí",
      mnemonic: "Captured = bắt giam về thể xác (còng tay/nhà tù). Captivated = bị 'bắt cóc' về tâm trí/trái tim (mê mẩn vì sắc đẹp hay màn diễn).",
      distinctionTip: "Pirates captured the crew (bắt sống). The singer captivated the audience (mê hoặc lòng người)."
    },
    {
      id: "cw-7",
      pairKey: "G",
      wordA: "reign",
      wordB: "rein",
      diffHighlightA: { before: "rei", highlight: "gn", after: "" },
      diffHighlightB: { before: "rei", highlight: "n", after: "" },
      promptSentence: "She led the horse by the ______.",
      correctWord: "rein",
      defA: "reign (n/v): Triều đại thống trị của vua chúa",
      defB: "rein (n): Dây cương dùng để ghì/điều khiển ngựa",
      mnemonic: "Rei-GN: có chữ 'G' như 'sovereiGN' (quốc vương/ngai vàng). REIN: chỉ có dây da thuần túy để ghì (cương ngựa / free rein).",
      distinctionTip: "Under the reign of King Henry (triều đại). Hold the reins of the horse (dây cương)."
    },
    {
      id: "cw-8",
      pairKey: "H",
      wordA: "comment",
      wordB: "commend",
      diffHighlightA: { before: "commen", highlight: "t", after: "" },
      diffHighlightB: { before: "commen", highlight: "d", after: "" },
      promptSentence: "Don't you want to ______ on the political situation?",
      correctWord: "comment",
      defA: "comment (v): Bình luận, bày tỏ ý kiến về điều gì",
      defB: "commend (v): Khen ngợi, tán dương trước công chúng",
      mnemonic: "Commen-T: chữ 'T' như 'Talk / Text' (bình luận, nêu ý kiến). Commen-D: chữ 'D' như 'Decorate / Decent award' (tuyên dương, khen thưởng).",
      distinctionTip: "No comment (miễn bình luận). Commended for bravery (được biểu dương vì lòng quả cảm)."
    }
  ],

  // 4. Synonym Filter (Page 5 Task Four - Cross out words NOT synonymous)
  synonymFilter: [
    {
      id: "sf-1",
      targetWord: "ILLUSTRIOUS",
      targetMeaning: "Lừng lẫy, hiển hách, nổi danh xuất chúng",
      note: "Chọn các từ KHÔNG đồng nghĩa để loại bỏ khỏi danh sách",
      words: [
        { word: "anonymous", isSynonym: false, meaningVi: "Ẩn danh, không ai biết tên" },
        { word: "disreputable", isSynonym: false, meaningVi: "Tai tiếng xấu, không đáng kính" },
        { word: "eminent", isSynonym: true, meaningVi: "Xuất chúng, lỗi lạc" },
        { word: "renowned", isSynonym: true, meaningVi: "Trứ danh, nức tiếng gần xa" },
        { word: "obscure", isSynonym: false, meaningVi: "Mờ mịt, ít ai biết đến" },
        { word: "renewed", isSynonym: false, meaningVi: "Được hồi phục, làm mới lại" },
        { word: "prominent", isSynonym: true, meaningVi: "Nổi bật, giữ vị trí quan trọng" },
        { word: "distinguished", isSynonym: true, meaningVi: "Đáng nể, xuất sắc vượt trội" },
        { word: "outstanding", isSynonym: true, meaningVi: "Xuất chúng, kiệt xuất" },
        { word: "celebrated", isSynonym: true, meaningVi: "Được ca tụng, nổi tiếng vang dội" },
        { word: "imminent", isSynonym: false, meaningVi: "Sắp xảy ra đến nơi" },
        { word: "reputed", isSynonym: true, meaningVi: "Có tiếng tăm tốt, được đồn đại uy tín" }
      ]
    },
    {
      id: "sf-2",
      targetWord: "MOROSE",
      targetMeaning: "Ủ rũ, lầm lì, cáu kỉnh khó tính (dành cho người)",
      note: "Chú ý: 'overcast' chỉ dùng miêu tả thời tiết mây mù, không dùng cho người!",
      words: [
        { word: "overcast", isSynonym: false, meaningVi: "U ám, râm trời (thời tiết mây mù)" },
        { word: "gloomy", isSynonym: true, meaningVi: "U sầu, ủ rũ" },
        { word: "sullen", isSynonym: true, meaningVi: "Lầm lì, phụng phịu, khó chịu" },
        { word: "moody", isSynonym: true, meaningVi: "Tâm trạng thất thường, ủ ê" },
        { word: "cordial", isSynonym: false, meaningVi: "Thân mật, chân tình" },
        { word: "affable", isSynonym: false, meaningVi: "Niềm nở, dễ gần" },
        { word: "sulky", isSynonym: true, meaningVi: "Hờn dỗi, lầm bầm tức tối" },
        { word: "glum", isSynonym: true, meaningVi: "Ủ dột, buồn thiu" },
        { word: "friendly", isSynonym: false, meaningVi: "Thân thiện" },
        { word: "downcast", isSynonym: true, meaningVi: "Cụp mắt chán nản, tuyệt vọng" },
        { word: "amiable", isSynonym: false, meaningVi: "Hòa nhã, đáng mến" },
        { word: "courteous", isSynonym: false, meaningVi: "Lịch thiệp, hòa nhã" }
      ]
    }
  ],

  // 5. Smart Cloze Passage (Passage 1 from Page 3 Exercise B & Passage 2 from Page 6 Part A)
  clozePassages: [
    {
      id: "cp-1",
      title: "Franklin Delano Roosevelt's Travel Habit",
      sourceLabel: "Page 3 — Exercise B",
      passageTemplate: "Franklin Delano Roosevelt loved to travel, but not by air. A gregarious man who {{gap_1}} the company of other people, he preferred to go by rail or ship, savouring the {{gap_2}} and comfort that these familiar means of transport could provide a President of the United States with. His physical {{gap_3}}, moreover, made flying difficult; the aircraft of the thirties and early forties were not {{gap_4}} to accommodate persons in wheelchairs. 'I'm in no hurry,' he once explained. 'The sooner I get where I'm going, the sooner people will be wanting something from me.' So, while Roosevelt {{gap_5}} in the White House longer than any President, he made only three trips by air during his entire time in office.",
      gaps: [
        {
          gapNumber: 1,
          options: [
            { label: "a", text: "avoided" },
            { label: "b", text: "relished" },
            { label: "c", text: "loathed" },
            { label: "d", text: "recognized" }
          ],
          correctLabel: "b",
          correctWord: "relished",
          explanations: {
            a: "avoided (v): Tránh né, né tránh",
            b: "relished (v): Tận hưởng, say mê thích thú (Khớp với 'gregarious' - thích giao lưu)",
            c: "loathed (v): Căm ghét, ghê tởm",
            d: "recognized (v): Nhận ra, công nhận"
          }
        },
        {
          gapNumber: 2,
          options: [
            { label: "a", text: "leisure" },
            { label: "b", text: "hardships" },
            { label: "c", text: "rush" },
            { label: "d", text: "hassle" }
          ],
          correctLabel: "a",
          correctWord: "leisure",
          explanations: {
            a: "leisure (n): Sự thong dong, thư thái ('savouring the leisure and comfort')",
            b: "hardships (n): Những gian nan, khổ cực",
            c: "rush (n): Sự hối hả, vội vã",
            d: "hassle (n): Sự phiền toái, rắc rối"
          }
        },
        {
          gapNumber: 3,
          options: [
            { label: "a", text: "obstacle" },
            { label: "b", text: "capacity" },
            { label: "c", text: "hindrance" },
            { label: "d", text: "handicap" }
          ],
          correctLabel: "d",
          correctWord: "handicap",
          explanations: {
            a: "obstacle (n): Chướng ngại vật trên đường đi",
            b: "capacity (n): Sức chứa, năng lực tiếp nhận",
            c: "hindrance (n): Sự cản trở trừu tượng",
            d: "handicap (n): Khuyết tật thể chất ('physical handicap' là bại liệt ở chân của FDR)"
          }
        },
        {
          gapNumber: 4,
          options: [
            { label: "a", text: "designed" },
            { label: "b", text: "done" },
            { label: "c", text: "promoted" },
            { label: "d", text: "thought" }
          ],
          correctLabel: "a",
          correctWord: "designed",
          explanations: {
            a: "designed (v): Được thiết kế ('designed to accommodate' - thiết kế để phục vụ)",
            b: "done (v): Được hoàn thành",
            c: "promoted (v): Được quảng bá, thăng chức",
            d: "thought (v): Được suy nghĩ"
          }
        },
        {
          gapNumber: 5,
          options: [
            { label: "a", text: "evacuated" },
            { label: "b", text: "occupied" },
            { label: "c", text: "resided" },
            { label: "d", text: "prolonged" }
          ],
          correctLabel: "c",
          correctWord: "resided",
          explanations: {
            a: "evacuated (v): Sơ tán khỏi khu vực nguy hiểm",
            b: "occupied (v): Chiếm đóng lãnh thổ",
            c: "resided (v): Cư ngụ, sinh sống tại ('resided in the White House')",
            d: "prolonged (v): Kéo dài thời gian"
          }
        }
      ]
    },
    {
      id: "cp-2",
      title: "The E-Commerce Retail Revolution",
      sourceLabel: "Page 6 — Part A",
      passageTemplate: "There can be no {{gap_11}} that online shopping is of huge benefit to the consumer. Far from becoming {{gap_12}}, online shoppers are very demanding. Overpriced merchants with poor services should beware. Gone are the days when stores could charge what they liked for goods and get away with it. The same, too, for shady manufacturers: smarter consumers know which products have a good {{gap_13}} and which do not, because online they now read not only the sales {{gap_14}} but also reviews from previous purchasers. And if customers are disappointed, a few {{gap_15}} of the mouse will take them to places where they can let the world know. Nowadays there is nothing more damning than a flood of negative comments on the internet.\n\nHowever, the big boys, as always, are ahead of the game. Some companies are already adjusting their business models to take account of these trends. The stores run by Sony and Apple, for instance, are more like brand showrooms than shops. They are there for people to try out {{gap_16}} and to ask questions to knowledgeable staff. Whether the products are ultimately bought online or offline is of secondary importance.\n\nOnline traders must also adjust. Amazon, for one, is {{gap_17}} turning from being primarily a bookseller to becoming a {{gap_18}} retailer by letting other companies sell products on its site, rather like a marketplace. During America's Thanksgiving weekend last November, Amazon's sales of consumer electronics in the United States {{gap_19}} its book sales for the first time in its history. Other transformations in the retail business are {{gap_20}} to follow.",
      gaps: [
        {
          gapNumber: 11,
          options: [
            { label: "A", text: "query" },
            { label: "B", text: "examination" },
            { label: "C", text: "question" },
            { label: "D", text: "proposal" }
          ],
          correctLabel: "C",
          correctWord: "question",
          explanations: {
            A: "query (n): Câu hỏi truy vấn",
            B: "examination (n): Kỳ thi, sự xem xét kỹ lưỡng",
            C: "question (n): Nghi vấn (Thành ngữ: 'There can be no question that' = Không còn nghi ngờ gì)",
            D: "proposal (n): Đề xuất, lời cầu hôn"
          }
        },
        {
          gapNumber: 12,
          options: [
            { label: "A", text: "complacent" },
            { label: "B", text: "dissatisfied" },
            { label: "C", text: "competent" },
            { label: "D", text: "compassionate" }
          ],
          correctLabel: "A",
          correctWord: "complacent",
          explanations: {
            A: "complacent (adj): Tự mãn, dễ dãi thỏa hiệp (Ngược nghĩa với demanding)",
            B: "dissatisfied (adj): Bất mãn, không hài lòng",
            C: "competent (adj): Có đủ năng lực",
            D: "compassionate (adj): Giàu lòng trắc ẩn"
          }
        },
        {
          gapNumber: 13,
          options: [
            { label: "A", text: "distinction" },
            { label: "B", text: "resolution" },
            { label: "C", text: "opinion" },
            { label: "D", text: "reputation" }
          ],
          correctLabel: "D",
          correctWord: "reputation",
          explanations: {
            A: "distinction (n): Sự phân biệt, nét đặc sắc",
            B: "resolution (n): Nghị quyết, độ phân giải",
            C: "opinion (n): Quan điểm cá nhân",
            D: "reputation (n): Uy tín, danh tiếng ('have a good reputation')"
          }
        },
        {
          gapNumber: 14,
          options: [
            { label: "A", text: "bubble" },
            { label: "B", text: "message" },
            { label: "C", text: "blare" },
            { label: "D", text: "blurb" }
          ],
          correctLabel: "D",
          correctWord: "blurb",
          explanations: {
            A: "bubble (n): Bong bóng",
            B: "message (n): Thông điệp, tin nhắn",
            C: "blare (n): Tiếng om sòm inh ỏi",
            D: "blurb (n): Đoạn văn ngắn quảng bá sản phẩm ('sales blurb')"
          }
        },
        {
          gapNumber: 15,
          options: [
            { label: "A", text: "taps" },
            { label: "B", text: "clucks" },
            { label: "C", text: "clicks" },
            { label: "D", text: "prods" }
          ],
          correctLabel: "C",
          correctWord: "clicks",
          explanations: {
            A: "taps (n): Cú chạm nhẹ bằng ngón tay",
            B: "clucks (n): Tiếng gà cục tác",
            C: "clicks (n): Cú nhấp chuột máy tính ('clicks of the mouse')",
            D: "prods (n): Cú chọc, giục giã"
          }
        },
        {
          gapNumber: 16,
          options: [
            { label: "A", text: "devices" },
            { label: "B", text: "tools" },
            { label: "C", text: "emblems" },
            { label: "D", text: "schemes" }
          ],
          correctLabel: "A",
          correctWord: "devices",
          explanations: {
            A: "devices (n): Thiết bị điện tử/công nghệ (Sony, Apple)",
            B: "tools (n): Dụng cụ cầm tay thô sơ",
            C: "emblems (n): Huy hiệu, biểu tượng",
            D: "schemes (n): Kế hoạch, âm mưu"
          }
        },
        {
          gapNumber: 17,
          options: [
            { label: "A", text: "mistakenly" },
            { label: "B", text: "rapidly" },
            { label: "C", text: "unreasonably" },
            { label: "D", text: "secretly" }
          ],
          correctLabel: "B",
          correctWord: "rapidly",
          explanations: {
            A: "mistakenly (adv): Một cách nhầm lẫn",
            B: "rapidly (adv): Một cách nhanh chóng, thần tốc",
            C: "unreasonably (adv): Một cách vô lý",
            D: "secretly (adv): Một cách lén lút"
          }
        },
        {
          gapNumber: 18,
          options: [
            { label: "A", text: "mass" },
            { label: "B", text: "block" },
            { label: "C", text: "lump" },
            { label: "D", text: "chunk" }
          ],
          correctLabel: "A",
          correctWord: "mass",
          explanations: {
            A: "mass (adj/n): Đại trà, quy mô đại chúng ('mass retailer')",
            B: "block (n): Khối nhà, tảng",
            C: "lump (n): Cục u, miếng",
            D: "chunk (n): Mảnh lớn, khúc"
          }
        },
        {
          gapNumber: 19,
          options: [
            { label: "A", text: "receded" },
            { label: "B", text: "excluded" },
            { label: "C", text: "repressed" },
            { label: "D", text: "exceeded" }
          ],
          correctLabel: "D",
          correctWord: "exceeded",
          explanations: {
            A: "receded (v): Lùi xa, sụt giảm",
            B: "excluded (v): Loại trừ",
            C: "repressed (v): Đè nén cảm xúc",
            D: "exceeded (v): Vượt trội hơn hẳn ('exceeded book sales')"
          }
        },
        {
          gapNumber: 20,
          options: [
            { label: "A", text: "tied" },
            { label: "B", text: "secured" },
            { label: "C", text: "bound" },
            { label: "D", text: "fastened" }
          ],
          correctLabel: "C",
          correctWord: "bound",
          explanations: {
            A: "tied (v/adj): Bị trói buộc",
            B: "secured (v/adj): Được bảo đảm an toàn",
            C: "bound (adj): Chắc chắn sẽ xảy ra (Cụm 'be bound to follow')",
            D: "fastened (v/adj): Được thắt chặt, cài khuy"
          }
        }
      ]
    }
  ],

  // 6. Speed Blitz (Combined 25 questions: Page 4 Task One (15) + Page 6 Part B (10))
  speedBlitz: [
    {
      id: "sb-1",
      questionNumber: 1,
      prompt: "To relish means to ______.",
      options: [
        { key: "1", text: "detest" },
        { key: "2", text: "like" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "detest", pos: "v", vi: "Ghét cay ghét đắng, ghê tởm" },
        { key: "2", word: "like / relish", pos: "v", vi: "Thích thú, say mê tận hưởng" }
      ]
    },
    {
      id: "sb-2",
      questionNumber: 2,
      prompt: "Hardships cause ______.",
      options: [
        { key: "1", text: "discomfort and suffering" },
        { key: "2", text: "advantages and opportunities" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "discomfort & suffering", pos: "n", vi: "Sự khó chịu và đau khổ gian truân" },
        { key: "2", word: "advantages & opportunities", pos: "n", vi: "Lợi thế và cơ hội thuận lợi" }
      ]
    },
    {
      id: "sb-3",
      questionNumber: 3,
      prompt: "To loathe is to ______.",
      options: [
        { key: "1", text: "dislike" },
        { key: "2", text: "enjoy" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "dislike / loathe", pos: "v", vi: "Cực kỳ không thích, ghét cay đắng" },
        { key: "2", word: "enjoy", pos: "v", vi: "Thưởng thức, tận hưởng niềm vui" }
      ]
    },
    {
      id: "sb-4",
      questionNumber: 4,
      prompt: "A hostile attitude is ______.",
      options: [
        { key: "1", text: "friendly" },
        { key: "2", text: "unfriendly" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "friendly", pos: "adj", vi: "Thân thiện, hòa nhã" },
        { key: "2", word: "unfriendly / hostile", pos: "adj", vi: "Thù địch, hung hăng, không thân thiện" }
      ]
    },
    {
      id: "sb-5",
      questionNumber: 5,
      prompt: "A bold person is ______.",
      options: [
        { key: "1", text: "shy" },
        { key: "2", text: "confident" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "shy", pos: "adj", vi: "Nhút nhát, e dè" },
        { key: "2", word: "confident / bold", pos: "adj", vi: "Tự tin, táo bạo, dám nghĩ dám làm" }
      ]
    },
    {
      id: "sb-6",
      questionNumber: 6,
      prompt: "An illustrious writer is ______.",
      options: [
        { key: "1", text: "eminent" },
        { key: "2", text: "imminent" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "eminent / illustrious", pos: "adj", vi: "Lỗi lạc, kiệt xuất, danh tiếng lẫy lừng" },
        { key: "2", word: "imminent", pos: "adj", vi: "Sắp ập đến nơi (sắp xảy ra)" }
      ]
    },
    {
      id: "sb-7",
      questionNumber: 7,
      prompt: "In the event of rain means ______.",
      options: [
        { key: "1", text: "when the rain stops" },
        { key: "2", text: "in case it rains" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "when the rain stops", pos: "phrase", vi: "Khi trời tạnh mưa" },
        { key: "2", word: "in case it rains", pos: "phrase", vi: "Trong trường hợp nếu trời có mưa" }
      ]
    },
    {
      id: "sb-8",
      questionNumber: 8,
      prompt: "A skirmish is ______.",
      options: [
        { key: "1", text: "an open battle" },
        { key: "2", text: "a fight between small parts of armies" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "open battle", pos: "n", vi: "Trận đại chiến trên chiến trường mở" },
        { key: "2", word: "skirmish", pos: "n", vi: "Cuộc đụng độ, giao tranh quy mô nhỏ lẻ" }
      ]
    },
    {
      id: "sb-9",
      questionNumber: 9,
      prompt: "An intriguing story is ______.",
      options: [
        { key: "1", text: "interesting" },
        { key: "2", text: "uninteresting" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "interesting / intriguing", pos: "adj", vi: "Kỳ thú, gợi trí tò mò, hấp dẫn" },
        { key: "2", word: "uninteresting", pos: "adj", vi: "Nhạt nhẽo, không thú vị" }
      ]
    },
    {
      id: "sb-10",
      questionNumber: 10,
      prompt: "A person who defies the law ______ it.",
      options: [
        { key: "1", text: "obeys" },
        { key: "2", text: "disobeys" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "obeys", pos: "v", vi: "Tuân theo, vâng phục pháp luật" },
        { key: "2", word: "disobeys / defies", pos: "v", vi: "Bất tuân, thách thức, chống lại pháp luật" }
      ]
    },
    {
      id: "sb-11",
      questionNumber: 11,
      prompt: "A beauty that captivates you ______ you.",
      options: [
        { key: "1", text: "fascinates" },
        { key: "2", text: "repulses" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "fascinates / captivates", pos: "v", vi: "Mê hoặc, hút hồn, quyến rũ sâu sắc" },
        { key: "2", word: "repulses", pos: "v", vi: "Làm ghê sợ, cự tuyệt" }
      ]
    },
    {
      id: "sb-12",
      questionNumber: 12,
      prompt: "A hindrance is ______.",
      options: [
        { key: "1", text: "whatever obstructs and delays you" },
        { key: "2", text: "whatever facilitates things for you" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "hindrance", pos: "n", vi: "Bất cứ thứ gì gây cản trở và làm chậm trễ" },
        { key: "2", word: "facilitator", pos: "n", vi: "Thứ hỗ trợ tạo điều kiện thuận lợi" }
      ]
    },
    {
      id: "sb-13",
      questionNumber: 13,
      prompt: "Slack discipline is ______.",
      options: [
        { key: "1", text: "hard" },
        { key: "2", text: "relaxed" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "hard", pos: "adj", vi: "Cứng rắn, nghiêm ngặt" },
        { key: "2", word: "relaxed / slack", pos: "adj", vi: "Lỏng lẻo, thiếu kỷ luật, chểnh mảng" }
      ]
    },
    {
      id: "sb-14",
      questionNumber: 14,
      prompt: "An ingenious young man is ______.",
      options: [
        { key: "1", text: "clever" },
        { key: "2", text: "stupid" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "clever / ingenious", pos: "adj", vi: "Tài tình, thông minh, phát minh sáng tạo" },
        { key: "2", word: "stupid", pos: "adj", vi: "Ngốc nghếch, vụng về" }
      ]
    },
    {
      id: "sb-15",
      questionNumber: 15,
      prompt: "An illiterate person is ______.",
      options: [
        { key: "1", text: "educated" },
        { key: "2", text: "unable to read" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "educated", pos: "adj", vi: "Có giáo dục, có học thức" },
        { key: "2", word: "unable to read / illiterate", pos: "adj", vi: "Mù chữ, không biết đọc biết viết" }
      ]
    },
    // Part B (Questions 21-30 from Page 6)
    {
      id: "sb-16",
      questionNumber: 16,
      prompt: "It was imperative for the authorities to ______ the epidemic.",
      options: [
        { key: "1", text: "succeed" },
        { key: "2", text: "localise" },
        { key: "3", text: "spread" },
        { key: "4", text: "define" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "succeed", pos: "v", vi: "Thành công" },
        { key: "2", word: "localise", pos: "v", vi: "Khoanh vùng dịch bệnh, không cho lan rộng" },
        { key: "3", word: "spread", pos: "v", vi: "Lan tràn, làm lây lan" },
        { key: "4", word: "define", pos: "v", vi: "Định nghĩa" }
      ]
    },
    {
      id: "sb-17",
      questionNumber: 17,
      prompt: "His efforts, though futile, are still ______.",
      options: [
        { key: "1", text: "refined" },
        { key: "2", text: "intimidated" },
        { key: "3", text: "pious" },
        { key: "4", text: "commendable" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "refined", pos: "adj", vi: "Tao nhã, tinh luyện" },
        { key: "2", word: "intimidated", pos: "adj", vi: "Bị hoảng sợ, đe dọa" },
        { key: "3", word: "pious", pos: "adj", vi: "Sùng kính tôn giáo, mộ đạo" },
        { key: "4", word: "commendable", pos: "adj", vi: "Đáng khen ngợi, đáng tán dương" }
      ]
    },
    {
      id: "sb-18",
      questionNumber: 18,
      prompt: "To me friendship is a(n) ______ thing.",
      options: [
        { key: "1", text: "precious" },
        { key: "2", text: "insignificant" },
        { key: "3", text: "costly" },
        { key: "4", text: "obscure" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "precious", pos: "adj", vi: "Vô giá, quý báu sâu sắc" },
        { key: "2", word: "insignificant", pos: "adj", vi: "Tầm thường, không quan trọng" },
        { key: "3", word: "costly", pos: "adj", vi: "Tốn kém, đắt đỏ" },
        { key: "4", word: "obscure", pos: "adj", vi: "Mờ mịt, ít ai biết đến" }
      ]
    },
    {
      id: "sb-19",
      questionNumber: 19,
      prompt: "He was reserved by nature, even ______.",
      options: [
        { key: "1", text: "cordial" },
        { key: "2", text: "morose" },
        { key: "3", text: "amiable" },
        { key: "4", text: "approachable" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "cordial", pos: "adj", vi: "Thân mật, ân cần" },
        { key: "2", word: "morose", pos: "adj", vi: "Ủ rũ, lầm lì, khó tính cáu kỉnh" },
        { key: "3", word: "amiable", pos: "adj", vi: "Dễ mến, tử tế" },
        { key: "4", word: "approachable", pos: "adj", vi: "Dễ gần gũi bắt chuyện" }
      ]
    },
    {
      id: "sb-20",
      questionNumber: 20,
      prompt: "Misuse of the world's resources is one of the ______ issues of our times.",
      options: [
        { key: "1", text: "burning" },
        { key: "2", text: "heating" },
        { key: "3", text: "firing" },
        { key: "4", text: "boiling" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "burning", pos: "adj", vi: "Cấp bách, nóng bỏng (Thành ngữ: 'burning issue')" },
        { key: "2", word: "heating", pos: "n/adj", vi: "Hệ thống sưởi nhiệt" },
        { key: "3", word: "firing", pos: "n", vi: "Bắn súng, sa thải" },
        { key: "4", word: "boiling", pos: "adj", vi: "Sôi sùng sục, rất nóng" }
      ]
    },
    {
      id: "sb-21",
      questionNumber: 21,
      prompt: "That was an act of epic ______.",
      options: [
        { key: "1", text: "validity" },
        { key: "2", text: "price" },
        { key: "3", text: "valour" },
        { key: "4", text: "location" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "validity", pos: "n", vi: "Tính hiệu lực, giá trị pháp lý" },
        { key: "2", word: "price", pos: "n", vi: "Giá cả" },
        { key: "3", word: "valour", pos: "n", vi: "Lòng quả cảm hiển hách, anh dũng vô song" },
        { key: "4", word: "location", pos: "n", vi: "Địa điểm, vị trí" }
      ]
    },
    {
      id: "sb-22",
      questionNumber: 22,
      prompt: "What he did to support our cause was a small but ______ gesture.",
      options: [
        { key: "1", text: "significant" },
        { key: "2", text: "stout" },
        { key: "3", text: "obvious" },
        { key: "4", text: "indecent" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "significant", pos: "adj", vi: "Có ý nghĩa to lớn, quan trọng" },
        { key: "2", word: "stout", pos: "adj", vi: "Chắc nịch, mập mạp" },
        { key: "3", word: "obvious", pos: "adj", vi: "Rõ ràng, hiển nhiên" },
        { key: "4", word: "indecent", pos: "adj", vi: "Khiếm nhã, thô bỉ" }
      ]
    },
    {
      id: "sb-23",
      questionNumber: 23,
      prompt: "The vegetation on the island was ______.",
      options: [
        { key: "1", text: "exuberant" },
        { key: "2", text: "chivalrous" },
        { key: "3", text: "overcast" },
        { key: "4", text: "ingenious" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "exuberant", pos: "adj", vi: "Tươi tốt sum suê, rậm rạp xanh mát" },
        { key: "2", word: "chivalrous", pos: "adj", vi: "Hào hiệp nghĩa khí" },
        { key: "3", word: "overcast", pos: "adj", vi: "U ám (thời tiết mây mù)" },
        { key: "4", word: "ingenious", pos: "adj", vi: "Khéo léo, phát minh tài tình" }
      ]
    },
    {
      id: "sb-24",
      questionNumber: 24,
      prompt: "He was regarded as the most ______ of contemporary writers of fiction.",
      options: [
        { key: "1", text: "dense" },
        { key: "2", text: "daring" },
        { key: "3", text: "extensive" },
        { key: "4", text: "imaginary" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "dense", pos: "adj", vi: "Đặc quánh, đần độn" },
        { key: "2", word: "daring", pos: "adj", vi: "Táo bạo, dám đột phá lối mòn sáng tạo" },
        { key: "3", word: "extensive", pos: "adj", vi: "Rộng lớn, sâu rộng" },
        { key: "4", word: "imaginary", pos: "adj", vi: "Hư cấu, không có thật" }
      ]
    },
    {
      id: "sb-25",
      questionNumber: 25,
      prompt: "Ronald had the ______ to blame his teachers for his failure.",
      options: [
        { key: "1", text: "concern" },
        { key: "2", text: "chivalry" },
        { key: "3", text: "regard" },
        { key: "4", text: "audacity" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "concern", pos: "n", vi: "Sự quan ngại, lo lắng" },
        { key: "2", word: "chivalry", pos: "n", vi: "Tinh thần hiệp sĩ" },
        { key: "3", word: "regard", pos: "n", vi: "Sự kính trọng, quan tâm" },
        { key: "4", word: "audacity", pos: "n", vi: "Sự trơ tráo, cả gan ('have the audacity to do sth')" }
      ]
    }
  ]
};


export const VOCAB_C1_UNIT_2: VocabC1Unit = {
  unitId: 2,
  title: "Unit 2: Adjectives Denoting Physique",
  subtitle: "The Vocabulary Files - Level C1 (Pages 7-10)",

  // 1. Words in Action (22 words from Page 7)
  wordsInAction: [
    {
      id: "u2-wia-1",
      word: "plump",
      ipa: "/plʌmp/",
      nuance: "[Fleshy or pleasantly rounded]",
      register: "General / Polite",
      collocations: ["plump cheeks", "plump baby", "plump cushion", "plump figure"],
      enDef: "Fleshy or slightly overweight in a pleasant, rounded way.",
      viDef: "Mũm mĩm, tròn trịa, đầy đặn (thường mang sắc thái dễ thương, tích cực).",
      example: "The nurse held a healthy, **plump** baby with rosy cheeks.",
      targetKeyword: "plump"
    },
    {
      id: "u2-wia-2",
      word: "corpulent",
      ipa: "/ˈkɔː.pjʊ.lənt/",
      nuance: "[Excessively fat — Formal]",
      register: "Formal / Literary",
      collocations: ["corpulent gentleman", "corpulent figure", "grow corpulent"],
      enDef: "Excessively fat; having a large, bulky body.",
      viDef: "Béo phì, phì nhiêu, to béo nặng nề (từ trang trọng dùng cho người).",
      example: "A **corpulent** aristocrat slowly climbed out of the horse-drawn carriage.",
      targetKeyword: "corpulent"
    },
    {
      id: "u2-wia-3",
      word: "obese",
      ipa: "/əʊˈbiːs/",
      nuance: "[Medically very overweight]",
      register: "Medical / Clinical",
      collocations: ["clinically obese", "morbidly obese", "obese patients"],
      enDef: "Medically very overweight, to a degree that threatens health.",
      viDef: "Béo phì ở mức độ bệnh lý (thuật ngữ y khoa chỉ thừa cân nguy hại sức khỏe).",
      example: "Doctors warn that children who consume excessive sugar risk becoming clinically **obese**.",
      targetKeyword: "obese"
    },
    {
      id: "u2-wia-4",
      word: "muscular",
      ipa: "/ˈmʌs.kjʊ.lər/",
      nuance: "[Strong with well-developed muscles]",
      register: "General / Neutral",
      collocations: ["muscular build", "muscular physique", "muscular dystrophy"],
      enDef: "Strong and physically powerful with well-developed muscles.",
      viDef: "Cơ bắp cuồn cuộn, vạm vỡ, săn chắc.",
      example: "Years of rowing had given him a broad, **muscular** physique.",
      targetKeyword: "muscular"
    },
    {
      id: "u2-wia-5",
      word: "stout",
      ipa: "/staʊt/",
      nuance: "[Rather fat and heavy / Solid]",
      register: "General / Literary",
      collocations: ["stout man", "stout figure", "stout heart", "stout defense"],
      enDef: "Rather fat and heavy at the same time; thickset and solid.",
      viDef: "Đậm người, mập chắc, to ngang; (nghĩa bóng) kiên cường, vững chãi.",
      example: "A short, **stout** innkeeper greeted the weary travelers at the door.",
      targetKeyword: "stout"
    },
    {
      id: "u2-wia-6",
      word: "hefty",
      ipa: "/ˈhef.ti/",
      nuance: "[Big, heavy, and strong]",
      register: "Informal / General",
      collocations: ["hefty fellow", "hefty fine", "hefty dose", "hefty price tag"],
      enDef: "Big and strong; large, heavy, and powerful.",
      viDef: "To khỏe, lực lưỡng, đô con; (số tiền/khoản phạt) khổng lồ, nặng nề.",
      example: "Two **hefty** security guards stood at the entrance of the club.",
      targetKeyword: "hefty"
    },
    {
      id: "u2-wia-7",
      word: "husky",
      ipa: "/ˈhʌs.ki/",
      nuance: "[Strong and powerfully built]",
      register: "General",
      collocations: ["husky build", "husky athlete", "husky voice"],
      enDef: "Strong and powerfully built; tall and muscular (or having a low, rough voice).",
      viDef: "Cường tráng, vạm vỡ, to khỏe; (giọng nói) trầm khàn quyến rũ.",
      example: "Several **husky** young farmhands helped load the heavy timber onto the truck.",
      targetKeyword: "husky"
    },
    {
      id: "u2-wia-8",
      word: "burly",
      ipa: "/ˈbɜː.li/",
      nuance: "[Large in body, bulky and stout]",
      register: "General / Descriptive",
      collocations: ["burly man", "burly rugby player", "burly shoulders"],
      enDef: "Large in body, bulky and stout; heavily and strongly built.",
      viDef: "Đô con, vạm vỡ, to lớn lực lưỡng (thường miêu tả nam giới vai u thịt bắp).",
      example: "A **burly** dockworker effortlessly lifted the crate onto his shoulder.",
      targetKeyword: "burly"
    },
    {
      id: "u2-wia-9",
      word: "virile",
      ipa: "/ˈvɪr.aɪl/",
      nuance: "[Physical strength & masculine energy]",
      register: "Formal / Literary",
      collocations: ["virile youth", "virile energy", "virile physique"],
      enDef: "Exhibiting physical strength, masculine vigor, and generative power.",
      viDef: "Cường tráng, sung mãn, tràn đầy sinh lực nam tính.",
      example: "In his twenties, he was an athletic and **virile** young mountaineer.",
      targetKeyword: "virile"
    },
    {
      id: "u2-wia-10",
      word: "sturdy",
      ipa: "/ˈstɜː.di/",
      nuance: "[Possessing excellent health & strength]",
      register: "General / Positive",
      collocations: ["sturdy legs", "sturdy child", "sturdy boots", "sturdy construction"],
      enDef: "Possessing excellent health and strength; strongly and solidly built.",
      viDef: "Cứng cáp, rắn rỏi, khỏe khoắn; (đồ vật) chắc chắn, bền bỉ.",
      example: "Mountain climbers need **sturdy** legs and reliable equipment.",
      targetKeyword: "sturdy"
    },
    {
      id: "u2-wia-11",
      word: "robust",
      ipa: "/rəʊˈbʌst/",
      nuance: "[Strong, healthy with stamina]",
      register: "Formal / Academic",
      collocations: ["robust health", "robust economy", "robust constitution", "robust debate"],
      enDef: "Strong and healthy with great stamina and resilience.",
      viDef: "Tráng kiện, dẻo dai, tràn đầy sức sống; (hệ thống/kinh tế) vững mạnh.",
      example: "Despite being over eighty, my grandfather remains in **robust** health.",
      targetKeyword: "robust"
    },
    {
      id: "u2-wia-12",
      word: "lanky",
      ipa: "/ˈlæŋ.ki/",
      nuance: "[Very thin, tall and ungraceful]",
      register: "General / Descriptive",
      collocations: ["lanky teenager", "lanky frame", "tall and lanky"],
      enDef: "Very thin, tall, and ungraceful or awkward in movement.",
      viDef: "Cao lêu nghêu, gầy gò và hơi lóng ngóng vụng về.",
      example: "A **lanky** teenager with long limbs walked awkwardly onto the basketball court.",
      targetKeyword: "lanky"
    },
    {
      id: "u2-wia-13",
      word: "spindly",
      ipa: "/ˈspɪnd.li/",
      nuance: "[Long, thin, suggesting weakness]",
      register: "Descriptive",
      collocations: ["spindly legs", "spindly branches", "spindly fingers"],
      enDef: "Long and thin in a way that suggests physical weakness or fragility.",
      viDef: "Khẳng khiu, mảnh khảnh yếu ớt (như que củi, thường tả chân tay hoặc cành cây).",
      example: "The newborn foal struggled to stand on its **spindly** legs.",
      targetKeyword: "spindly"
    },
    {
      id: "u2-wia-14",
      word: "feeble",
      ipa: "/ˈfiː.bəl/",
      nuance: "[Weak, lacking muscular or mental power]",
      register: "General / Formal",
      collocations: ["feeble excuse", "feeble pulse", "feeble attempt", "old and feeble"],
      enDef: "Weak, lacking in muscular power; also unconvincing or faint.",
      viDef: "Yếu ớt, thều thào, thiếu sức lực; (lý do/lập luận) nghèo nàn, thiếu thuyết phục.",
      example: "His **feeble** excuses for missing the deadline exasperated the manager.",
      targetKeyword: "feeble"
    },
    {
      id: "u2-wia-15",
      word: "delicate",
      ipa: "/ˈdel.ɪ.kət/",
      nuance: "[Easily injured or easily made ill]",
      register: "General / Formal",
      collocations: ["delicate constitution", "delicate health", "delicate features"],
      enDef: "Easily injured, bruised, or easily made ill; requiring careful handling.",
      viDef: "Mong manh, thanh mảnh, có thể trạng yếu dễ đổ bệnh.",
      example: "Because of her **delicate** health, she was advised to avoid cold climates.",
      targetKeyword: "delicate"
    },
    {
      id: "u2-wia-16",
      word: "frail",
      ipa: "/freɪl/",
      nuance: "[Delicate, usually in poor health]",
      register: "General / Empathetic",
      collocations: ["frail elderly", "frail body", "frail health", "frail voice"],
      enDef: "Physically delicate and weak, usually due to poor health or advanced age.",
      viDef: "Mảnh mai, suy nhược, già yếu mong manh.",
      example: "The **frail** old lady needed assistance walking down the stairs.",
      targetKeyword: "frail"
    },
    {
      id: "u2-wia-17",
      word: "gaunt",
      ipa: "/ɡɔːnt/",
      nuance: "[Thin & extremely weak from hunger/suffering]",
      register: "Literary / Descriptive",
      collocations: ["gaunt face", "gaunt figure", "hollow and gaunt"],
      enDef: "Thin and extremely weak, as though from lack of food, illness, or severe exhaustion.",
      viDef: "Hốc hác, tiều tụy, gầy rộc đi vì đói khát, bệnh tật hoặc đau khổ.",
      example: "After weeks lost in the jungle, the survivors looked pale and **gaunt**.",
      targetKeyword: "gaunt"
    },
    {
      id: "u2-wia-18",
      word: "sickly",
      ipa: "/ˈsɪk.li/",
      nuance: "[Often ill / Prone to sickness]",
      register: "General",
      collocations: ["sickly child", "sickly complexion", "sickly pale"],
      enDef: "Often ill; in habitually poor health, or having an unhealthy pallor.",
      viDef: "Hay đau ốm, ốm yếu quặt quẹo; xanh xao vàng vọt.",
      example: "Although he was a **sickly** child, he grew up to become a marathon runner.",
      targetKeyword: "sickly"
    },
    {
      id: "u2-wia-19",
      word: "bony",
      ipa: "/ˈbəʊ.ni/",
      nuance: "[Bones showing through the skin]",
      register: "General / Descriptive",
      collocations: ["bony fingers", "bony shoulders", "bony fish"],
      enDef: "Very thin, as though the bones show prominently through the skin.",
      viDef: "Gầy trơ xương, khẳng khiu, lộ rõ xương xẩu.",
      example: "The old beggar stretched out a long, **bony** hand toward the passersby.",
      targetKeyword: "bony"
    },
    {
      id: "u2-wia-20",
      word: "skinny",
      ipa: "/ˈskɪn.i/",
      nuance: "[Very thin — Informal]",
      register: "Informal / Everyday",
      collocations: ["skinny legs", "skinny kid", "skinny jeans"],
      enDef: "Very thin, often in an unattractive or underdeveloped way.",
      viDef: "Gầy nhom, ốm nhách (từ thông dụng hằng ngày).",
      example: "You need to eat more nutritious meals; you're getting far too **skinny**.",
      targetKeyword: "skinny"
    },
    {
      id: "u2-wia-21",
      word: "decrepit",
      ipa: "/dɪˈkrep.ɪt/",
      nuance: "[Weak and in bad condition from old age]",
      register: "Formal / Literary",
      collocations: ["decrepit old man", "decrepit building", "decrepit vehicle"],
      enDef: "Weak and in bad condition from old age or long, hard use.",
      viDef: "Già cỗi, suy kiệt, hom hem (người); đổ nát, xập xệ (nhà cửa/đồ vật).",
      example: "They lived in a **decrepit** nineteenth-century house with a leaking roof.",
      targetKeyword: "decrepit"
    },
    {
      id: "u2-wia-22",
      word: "senile",
      ipa: "/ˈsiː.naɪl/",
      nuance: "[Mental & physical weakness from old age]",
      register: "Medical / Formal",
      collocations: ["senile dementia", "grow senile", "senile decay"],
      enDef: "Connected with old age; showing weakness of the body and especially loss of mental faculties.",
      viDef: "Lẫn cẫn, lú lẫn, suy giảm trí tuệ và thể chất do tuổi già.",
      example: "In his final years, the former general became increasingly **senile** and forgetful.",
      targetKeyword: "senile"
    }
  ],

  // 2. Word Formation (20 pairs: 8 from Page 7 Exercise A + 12 from Page 8 Task Two)
  wordFormation: [
    {
      id: "u2-wf-1",
      adjective: "corpulent",
      noun: "corpulence",
      root: "corpul",
      suffix: "-ence",
      meaningVi: "béo phì nặng nề -> sự phì nhiêu, to béo",
      suffixChoices: ["-ence", "-ity", "-ness", "-tion"],
      ruleTip: "Tính từ kết thúc bằng '-ent' chuyển sang danh từ trừu tượng bằng đuôi '-ence' (corpulent ➔ corpulence)."
    },
    {
      id: "u2-wf-2",
      adjective: "obese",
      noun: "obesity",
      root: "obes",
      suffix: "-ity",
      meaningVi: "béo phì bệnh lý -> chứng béo phì",
      suffixChoices: ["-ity", "-ness", "-ence", "-ment"],
      ruleTip: "Bỏ 'e' câm ở cuối tính từ và thêm hậu tố y khoa/học thuật '-ity' (obese ➔ obesity)."
    },
    {
      id: "u2-wf-3",
      adjective: "virile",
      noun: "virility",
      root: "viril",
      suffix: "-ity",
      meaningVi: "cường tráng, nam tính -> sinh lực phái mạnh",
      suffixChoices: ["-ity", "-ness", "-ance", "-dom"],
      ruleTip: "Quy tắc tính từ đuôi '-ile': lược bỏ 'e' và gắn '-ity' (virile ➔ virility, hostile ➔ hostility)."
    },
    {
      id: "u2-wf-4",
      adjective: "decrepit",
      noun: "decrepitude",
      root: "decrepit",
      suffix: "-ude",
      meaningVi: "già yếu, đổ nát -> tình trạng suy kiệt, rệu rã",
      suffixChoices: ["-ude", "-ity", "-ness", "-ance"],
      ruleTip: "Hậu tố Latin đặc biệt '-ude' chỉ trạng thái kéo dài (decrepit ➔ decrepitude, tương tự solit-ude, gratit-ude)."
    },
    {
      id: "u2-wf-5",
      adjective: "stout",
      noun: "stoutness",
      root: "stout",
      suffix: "-ness",
      meaningVi: "mập chắc, đậm người -> sự đẫy đà, rắn chắc",
      suffixChoices: ["-ness", "-ity", "-ery", "-ance"],
      ruleTip: "Tính từ đơn âm tiết gốc Anglo-Saxon nhận trực tiếp hậu tố '-ness' (stout ➔ stoutness)."
    },
    {
      id: "u2-wf-6",
      adjective: "frail",
      noun: "frailty",
      root: "frail",
      suffix: "-ty",
      meaningVi: "mảnh mai, yếu đuối -> sự suy nhược, yếu ớt",
      suffixChoices: ["-ty", "-ness", "-ity", "-ence"],
      ruleTip: "Thêm trực tiếp '-ty' vào sau phụ âm 'l' (frail ➔ frailty, tương tự loyal ➔ loyalty, cruel ➔ cruelty)."
    },
    {
      id: "u2-wf-7",
      adjective: "senile",
      noun: "senility",
      root: "senil",
      suffix: "-ity",
      meaningVi: "lú lẫn tuổi già -> chứng suy giảm trí nhớ tuổi già",
      suffixChoices: ["-ity", "-ness", "-ence", "-dom"],
      ruleTip: "Tính từ đuôi '-ile' bỏ 'e' thêm '-ity' và đổi trọng âm sang âm tiết 'nil' (se'nile ➔ se'nility)."
    },
    {
      id: "u2-wf-8",
      adjective: "muscular",
      noun: "muscle",
      root: "muscl",
      suffix: "-e",
      meaningVi: "cơ bắp vạm vỡ -> cơ bắp (hoặc muscularity)",
      suffixChoices: ["-e", "-ness", "-ance", "-ment"],
      ruleTip: "Trở về danh từ gốc 'muscle' (trong đáp án sách trang 66 là 'muscle'; ngoài ra có thể dùng 'muscularity')."
    },
    {
      id: "u2-wf-9",
      adjective: "chivalrous",
      noun: "chivalry",
      root: "chival",
      suffix: "-ry",
      meaningVi: "hào hiệp -> tinh thần hiệp sĩ",
      suffixChoices: ["-ry", "-ness", "-ity", "-ance"],
      ruleTip: "Bỏ hậu tố tính từ '-ous', gắn '-ry' chỉ phẩm chất hiệp sĩ (chivalrous ➔ chivalry)."
    },
    {
      id: "u2-wf-10",
      adjective: "treacherous",
      noun: "treachery",
      root: "treacher",
      suffix: "-y",
      meaningVi: "phản bội, xảo quyệt -> sự phản bội, mưu phản",
      suffixChoices: ["-y", "-ness", "-ity", "-ment"],
      ruleTip: "Bỏ đuôi tính từ '-ous' và thêm '-y' để tạo danh từ chỉ hành vi (treacherous ➔ treachery)."
    },
    {
      id: "u2-wf-11",
      adjective: "poor",
      noun: "poverty",
      root: "pover",
      suffix: "-ty",
      meaningVi: "nghèo khó -> cảnh nghèo đói, sự thiếu thốn",
      suffixChoices: ["-ty", "-ness", "-ity", "-dom"],
      ruleTip: "Biến đổi gốc từ tiếng Pháp cổ (pauvre ➔ poverty): 'poor' không dùng 'poorness' khi chỉ cảnh nghèo đói xã hội mà dùng 'poverty'."
    },
    {
      id: "u2-wf-12",
      adjective: "prosperous",
      noun: "prosperity",
      root: "prosper",
      suffix: "-ity",
      meaningVi: "thịnh vượng, phát đạt -> sự phồn vinh, giàu có",
      suffixChoices: ["-ity", "-ness", "-ance", "-tion"],
      ruleTip: "Lược bỏ '-ous' và gắn hậu tố danh từ trạng thái '-ity' (prosperous ➔ prosperity, generous ➔ generosity)."
    },
    {
      id: "u2-wf-13",
      adjective: "royal",
      noun: "royalty",
      root: "royal",
      suffix: "-ty",
      meaningVi: "thuộc hoàng gia -> hoàng tộc / tiền bản quyền",
      suffixChoices: ["-ty", "-ness", "-ity", "-dom"],
      ruleTip: "Giữ nguyên gốc 'royal' và thêm '-ty' (royalty vừa có nghĩa là thành viên hoàng gia, vừa là tiền tác quyền)."
    },
    {
      id: "u2-wf-14",
      adjective: "sane",
      noun: "sanity",
      root: "san",
      suffix: "-ity",
      meaningVi: "tỉnh táo, minh mẫn -> sự lành mạnh về tâm thần",
      suffixChoices: ["-ity", "-ness", "-ence", "-ty"],
      ruleTip: "Bỏ 'e' cuối và thêm '-ity'; nguyên âm đôi /eɪ/ trong 'sane' rút ngắn thành /æ/ trong 'sanity' /ˈsæn.ə.ti/."
    },
    {
      id: "u2-wf-15",
      adjective: "notorious",
      noun: "notoriety",
      root: "notorie",
      suffix: "-ty",
      meaningVi: "khét tiếng (tai tiếng) -> sự mang tai tiếng xấu",
      suffixChoices: ["-ty", "-ness", "-ity", "-ance"],
      ruleTip: "Quy tắc đặc biệt cho nhóm '-orious / -ious': chuyển thành '-oriety / -iety' (notorious ➔ notoriety, various ➔ variety, anxious ➔ anxiety)."
    },
    {
      id: "u2-wf-16",
      adjective: "loyal",
      noun: "loyalty",
      root: "loyal",
      suffix: "-ty",
      meaningVi: "trung thành -> lòng trung thành",
      suffixChoices: ["-ty", "-ness", "-ity", "-ance"],
      ruleTip: "Giống như 'royal ➔ royalty', tính từ 'loyal' nhận trực tiếp hậu tố '-ty' (loyalty)."
    },
    {
      id: "u2-wf-17",
      adjective: "fit",
      noun: "fitness",
      root: "fit",
      suffix: "-ness",
      meaningVi: "cân đối, sung sức -> sự khỏe khoắn, thể lực",
      suffixChoices: ["-ness", "-ity", "-ment", "-ance"],
      ruleTip: "Tính từ đơn âm tiết gắn trực tiếp '-ness' để chỉ trạng thái thể chất (fit ➔ fitness)."
    },
    {
      id: "u2-wf-18",
      adjective: "persistent",
      noun: "persistence",
      root: "persist",
      suffix: "-ence",
      meaningVi: "kiên trì, bền bỉ -> sự kiên định, dai dẳng",
      suffixChoices: ["-ence", "-ance", "-ity", "-ness"],
      ruleTip: "Tính từ đuôi '-ent' chuyển sang danh từ đuôi '-ence' (persistent ➔ persistence)."
    },
    {
      id: "u2-wf-19",
      adjective: "noble",
      noun: "nobility",
      root: "nobil",
      suffix: "-ity",
      meaningVi: "cao quý, quý tộc -> giới quý tộc / phẩm chất cao thượng",
      suffixChoices: ["-ity", "-ness", "-ery", "-dom"],
      ruleTip: "Tính từ kết thúc bằng '-ble' biến đổi thành '-bility' (noble ➔ nobility, able ➔ ability)."
    },
    {
      id: "u2-wf-20",
      adjective: "cruel",
      noun: "cruelty",
      root: "cruel",
      suffix: "-ty",
      meaningVi: "độc ác, tàn nhẫn -> sự tàn bạo, nhẫn tâm",
      suffixChoices: ["-ty", "-ness", "-ity", "-dom"],
      ruleTip: "Gắn trực tiếp '-ty' vào sau phụ âm 'l' của tính từ (cruel ➔ cruelty, frail ➔ frailty)."
    }
  ],

  // 3. Confusable Words (7 1v1 Split-Cards from Page 9 Task Three)
  confusableWords: [
    {
      id: "u2-cw-1",
      pairKey: "A",
      wordA: "compulsive",
      wordB: "compulsory",
      diffHighlightA: { before: "compuls", highlight: "ive", after: "" },
      diffHighlightB: { before: "compuls", highlight: "ory", after: "" },
      promptSentence: "A vision test is ______ when you are applying for a driver's license.",
      correctWord: "compulsory",
      defA: "compulsive (adj): Khó cưỡng lại, do cơn nghiện/thôi thúc tâm lý bên trong",
      defB: "compulsory (adj): Bắt buộc theo luật định hoặc quy tắc bên ngoài",
      mnemonic: "Compuls-IVE = Impuls-IVE (thôi thúc tâm lý từ bên trong, như nghiện mua sắm/nói dối). Compuls-ORY = Obligat-ORY (bắt buộc bởi luật lệ).",
      distinctionTip: "Compulsive liar/gambler (thói quen tâm lý khó bỏ). Compulsory education/test (quy định bắt buộc)."
    },
    {
      id: "u2-cw-2",
      pairKey: "B",
      wordA: "plump",
      wordB: "plumber",
      diffHighlightA: { before: "plum", highlight: "p", after: "" },
      diffHighlightB: { before: "plum", highlight: "ber", after: "" },
      promptSentence: "Although Sharon is a bit ______ she still seems fit and healthy.",
      correctWord: "plump",
      defA: "plump (adj): Mũm mĩm, tròn trịa, hơi đầy đặn",
      defB: "plumber (n): Thợ sửa ống nước (chữ 'b' câm: /ˈplʌm.ər/)",
      mnemonic: "Plum-P kết thúc bằng 'P' bật hơi (tròn trịa như quả mận - plum). Plum-BER có đuôi '-er' chỉ nghề nghiệp (gốc Latin 'plumbum' = chì/ống chì).",
      distinctionTip: "A bit plump (hơi mũm mĩm). Call a plumber (gọi thợ ống nước)."
    },
    {
      id: "u2-cw-3",
      pairKey: "C",
      wordA: "stout",
      wordB: "stately",
      diffHighlightA: { before: "st", highlight: "out", after: "" },
      diffHighlightB: { before: "st", highlight: "ately", after: "" },
      promptSentence: "Who do you suppose lives in that ______ mansion?",
      correctWord: "stately",
      defA: "stout (adj): Đậm người, mập chắc, to ngang",
      defB: "stately (adj): Uy nghiêm, bề thế, tráng lệ cổ kính",
      mnemonic: "St-ATE-ly chứa từ 'STATE' (nhà nước/cung điện quốc gia ➔ nguy nga, bề thế). St-OUT dùng cho vóc dáng đậm người.",
      distinctionTip: "Stately home/mansion (dinh thự bề thế). A short, stout man (người đàn ông đậm người)."
    },
    {
      id: "u2-cw-4",
      pairKey: "D",
      wordA: "in high spirits",
      wordB: "in low spirits",
      diffHighlightA: { before: "in ", highlight: "high", after: " spirits" },
      diffHighlightB: { before: "in ", highlight: "low", after: " spirits" },
      promptSentence: "Jason was ______ for weeks after crashing his car.",
      correctWord: "in low spirits",
      defA: "in high spirits (idiom): Phấn chấn, vui vẻ, tràn đầy hứng khởi",
      defB: "in low spirits (idiom): Buồn bã, chán nản, tinh thần đi xuống",
      mnemonic: "Spirits = tinh thần/khí sắc. High = bay cao phấn khởi; Low = trùng xuống ủ rũ (đặc biệt sau tai nạn/thất bại).",
      distinctionTip: "Crashing his car (tai nạn hỏng xe) ➔ tinh thần suy sụp (in low spirits)."
    },
    {
      id: "u2-cw-5",
      pairKey: "E",
      wordA: "capitulate",
      wordB: "recapitulate",
      diffHighlightA: { before: "", highlight: "cap", after: "itulate" },
      diffHighlightB: { before: "", highlight: "recap", after: "itulate" },
      promptSentence: "Can you please ______ that for me; I'm not sure I understood.",
      correctWord: "recapitulate",
      defA: "capitulate (v): Đầu hàng đối phương theo điều kiện",
      defB: "recapitulate (v): Tóm lược lại các điểm chính (viết tắt là 'recap')",
      mnemonic: "RE-capitulate chính là dạng đầy đủ của từ thông dụng 'RECAP' (điểm lại các ý chính - 'caput' = đầu mục). Còn 'capitulate' đứng một mình là đầu hàng.",
      distinctionTip: "Recapitulate = Recap the main points (tóm tắt lại). Capitulate to the enemy (đầu hàng quân địch)."
    },
    {
      id: "u2-cw-6",
      pairKey: "F",
      wordA: "vow",
      wordB: "avow",
      diffHighlightA: { before: "", highlight: "v", after: "ow" },
      diffHighlightB: { before: "", highlight: "av", after: "ow" },
      promptSentence: "Will you ______ to stop smoking if I stop eating chocolate?",
      correctWord: "vow",
      defA: "vow (v/n): Thề nguyện trang trọng sẽ làm điều gì (+ to V)",
      defB: "avow (v): Công khai thừa nhận hoặc tuyên bố điều gì (+ Noun/that)",
      mnemonic: "Vow = lời thề hứa hẹn tương lai (wedding vows / vow to do sth). A-vow = Admit openly (thừa nhận công khai).",
      distinctionTip: "Vow + to-infinitive (thề sẽ làm gì). Avow + danh từ/mệnh đề (tuyên bố/thừa nhận)."
    },
    {
      id: "u2-cw-7",
      pairKey: "G",
      wordA: "curtail",
      wordB: "entail",
      diffHighlightA: { before: "", highlight: "cur", after: "tail" },
      diffHighlightB: { before: "", highlight: "en", after: "tail" },
      promptSentence: "Don't agree to take on the job until you are sure what it ______.",
      correctWord: "entails",
      defA: "curtail (v): Cắt giảm, thu hẹp, hạn chế (chi tiêu, quyền tự do)",
      defB: "entail (v): Đòi hỏi, kéo theo hệ quả tất yếu (công việc, trách nhiệm)",
      mnemonic: "CUR-tail = CUT the tail (cắt bớt đuôi ➔ cắt giảm, thu hẹp). EN-tail = bao hàm bên trong (EN-) những yêu cầu tất yếu.",
      distinctionTip: "Curtail spending/freedom (cắt giảm chi tiêu/quyền lợi). The job entails hard work (công việc đòi hỏi sự vất vả)."
    }
  ],

  // 4. Synonym Filter (Page 9 Task Four + Page 7 Exercise B Categorization)
  synonymFilter: [
    {
      id: "u2-sf-1",
      targetWord: "CHIVALROUS",
      targetMeaning: "Hào hiệp, lịch thiệp, quả cảm trọng danh dự (Page 9 - Task 4A)",
      note: "Loại bỏ 4 từ KHÔNG đồng nghĩa với CHIVALROUS",
      words: [
        { word: "corpulent", isSynonym: false, meaningVi: "Béo phì, to béo nặng nề" },
        { word: "gallant", isSynonym: true, meaningVi: "Quả cảm, hào hoa lịch lãm" },
        { word: "courteous", isSynonym: true, meaningVi: "Lịch sự, nhã nhặn" },
        { word: "courageous", isSynonym: true, meaningVi: "Can trường, dũng cảm" },
        { word: "blunt", isSynonym: false, meaningVi: "Thẳng thừng, cộc lốc thiếu tế nhị" },
        { word: "robust", isSynonym: false, meaningVi: "Tráng kiện, dẻo dai (về thể chất)" },
        { word: "honorable", isSynonym: true, meaningVi: "Đáng kính, trọng danh dự" },
        { word: "double-faced", isSynonym: false, meaningVi: "Hai mặt, tráo trở giả tạo" }
      ]
    },
    {
      id: "u2-sf-2",
      targetWord: "TREACHEROUS",
      targetMeaning: "Phản bội, xảo quyệt, gian dối bất trung (Page 9 - Task 4B)",
      note: "Loại bỏ 4 từ KHÔNG đồng nghĩa với TREACHEROUS",
      words: [
        { word: "false", isSynonym: true, meaningVi: "Giả dối, phản trắc" },
        { word: "disloyal", isSynonym: true, meaningVi: "Bất trung, phản bội" },
        { word: "faithful", isSynonym: false, meaningVi: "Trung thành, chung thủy" },
        { word: "trustworthy", isSynonym: false, meaningVi: "Đáng tin cậy" },
        { word: "dependable", isSynonym: false, meaningVi: "Có thể tin cậy, dựa dẫm" },
        { word: "deceitful", isSynonym: true, meaningVi: "Gian trá, lừa lọc" },
        { word: "underhand", isSynonym: true, meaningVi: "Lén lút, mờ ám, xảo trá" },
        { word: "reliable", isSynonym: false, meaningVi: "Đáng tin cậy, chắc chắn" }
      ]
    },
    {
      id: "u2-sf-3",
      targetWord: "STRONG PHYSIQUE",
      targetMeaning: "Nhóm tính từ miêu tả thể chất Cường tráng & Mạnh mẽ (Page 7 - Exercise B)",
      note: "Loại bỏ các từ chỉ sự Béo phì (FAT) hoặc Yếu ớt (WEAK)",
      words: [
        { word: "burly", isSynonym: true, meaningVi: "Đô con, vạm vỡ lực lưỡng" },
        { word: "hefty", isSynonym: true, meaningVi: "To khỏe, nặng ký" },
        { word: "frail", isSynonym: false, meaningVi: "Mảnh mai, suy nhược (WEAK)" },
        { word: "virile", isSynonym: true, meaningVi: "Cường tráng, tràn đầy sinh lực" },
        { word: "obese", isSynonym: false, meaningVi: "Béo phì bệnh lý (FAT)" },
        { word: "muscular", isSynonym: true, meaningVi: "Cơ bắp cuồn cuộn" },
        { word: "feeble", isSynonym: false, meaningVi: "Yếu ớt, thiếu sức lực (WEAK)" },
        { word: "husky", isSynonym: true, meaningVi: "Cao lớn, cường tráng" },
        { word: "corpulent", isSynonym: false, meaningVi: "To béo nặng nề (FAT)" },
        { word: "robust", isSynonym: true, meaningVi: "Tráng kiện, dẻo dai" },
        { word: "spindly", isSynonym: false, meaningVi: "Khẳng khiu yếu ớt (WEAK)" },
        { word: "gaunt", isSynonym: false, meaningVi: "Hốc hác, tiều tụy (WEAK)" }
      ]
    }
  ],

  // 5. Smart Cloze Passage (Page 10 Part A)
  clozePassages: [
    {
      id: "u2-cp-1",
      title: "Global Warming & Deep Ocean Carbon",
      sourceLabel: "Page 10 — Vocabulary Practice Part A",
      passageTemplate: "Greenhouse gases are being released into the atmosphere 30 times faster than the time when the Earth experienced a {{gap_1}} episode of global warming. A study comparing the rate at which carbon dioxide and methane are being {{gap_2}} now, compared to 55 million years ago when global warming also occurred, has found dramatic differences in the speed of release. James Zachos, professor of earth sciences at the University of California, Santa Cruz, said the speed of the present buildup of greenhouse gases is far greater than during the global warming after the {{gap_3}} of the dinosaurs. 'The emissions that caused this past episode of global warming probably lasted 10,000 years,' Professor Zachos told the American Association for the Advancement of Science at a meeting in St. Louis. 'By burning fossil fuels, we are likely to emit the same amount over the next three centuries.' He warned that studies of global warming events in the geological past {{gap_4}} the Earth's climate passes a {{gap_5}} beyond which climate change accelerates with the help of positive feedbacks - vicious circles of warming. Professor Zachos is a leading {{gap_6}} on the episode of global warming known as the palaeocene-eocene thermal maximum, when average global temperatures increased by up to 5°C due to a massive release of carbon dioxide and methane.\\nHis research into the deep ocean {{gap_7}} suggests at this time that about 4.5 billion tons of carbon entered the atmosphere over 10,000 years. 'This will be the same amount of carbon released into the atmosphere from cars and industrial emissions over the next 300 years if present {{gap_8}} continue', he said. Although carbon can be released suddenly and naturally into the atmosphere from volcanic activity, it takes many thousands of years for it to be removed permanently by natural processes. The ocean is capable of removing carbon, and quickly, but this natural {{gap_9}} can be easily {{gap_10}}, which is probably what happened 55 million years ago. 'It will take tens of thousands of years before atmospheric carbon dioxide comes down to preindustrial levels,' the professor said. 'Even after humans stop burning fossil fuels, the effects will be long-lasting.'",
      gaps: [
        {
          gapNumber: 1,
          options: [
            { label: "a", text: "prearranged" },
            { label: "b", text: "premier" },
            { label: "c", text: "previous" },
            { label: "d", text: "fundamental" }
          ],
          correctLabel: "c",
          correctWord: "previous",
          explanations: {
            a: "prearranged (adj): Được sắp đặt trước",
            b: "premier (adj): Hàng đầu, thứ nhất",
            c: "previous (adj): Trước đây, tiền nhiệm (a previous episode = một đợt nóng lên toàn cầu trước đây trong lịch sử)",
            d: "fundamental (adj): Cơ bản, cốt lõi"
          }
        },
        {
          gapNumber: 2,
          options: [
            { label: "a", text: "emitted" },
            { label: "b", text: "exhaled" },
            { label: "c", text: "incorporated" },
            { label: "d", text: "digested" }
          ],
          correctLabel: "a",
          correctWord: "emitted",
          explanations: {
            a: "emitted (v): Phát thải, thải ra (khí nhà kính carbon dioxide & methane)",
            b: "exhaled (v): Thở ra (dùng cho phổi sinh vật)",
            c: "incorporated (v): Sáp nhập, tích hợp",
            d: "digested (v): Tiêu hóa thức ăn"
          }
        },
        {
          gapNumber: 3,
          options: [
            { label: "a", text: "dementia" },
            { label: "b", text: "demolition" },
            { label: "c", text: "detachment" },
            { label: "d", text: "demise" }
          ],
          correctLabel: "d",
          correctWord: "demise",
          explanations: {
            a: "dementia (n): Chứng mất trí nhớ, sa sút trí tuệ",
            b: "demolition (n): Sự phá hủy công trình xây dựng",
            c: "detachment (n): Sự tách rời, thờ ơ",
            d: "demise (n): Sự diệt vong, sự sụp đổ/qua đời (the demise of the dinosaurs = sự tuyệt chủng của khủng long)"
          }
        },
        {
          gapNumber: 4,
          options: [
            { label: "a", text: "comment" },
            { label: "b", text: "mark" },
            { label: "c", text: "compliment" },
            { label: "d", text: "indicate" }
          ],
          correctLabel: "d",
          correctWord: "indicate",
          explanations: {
            a: "comment (v): Bình luận (đi với 'on')",
            b: "mark (v): Đánh dấu",
            c: "compliment (v): Khen ngợi",
            d: "indicate (v): Chỉ ra rằng, cho thấy rằng (studies indicate [that]...)"
          }
        },
        {
          gapNumber: 5,
          options: [
            { label: "a", text: "barricade" },
            { label: "b", text: "verge" },
            { label: "c", text: "threshold" },
            { label: "d", text: "perimeter" }
          ],
          correctLabel: "c",
          correctWord: "threshold",
          explanations: {
            a: "barricade (n): Chướng ngại vật, rào chắn",
            b: "verge (n): Bờ vực (on the verge of)",
            c: "threshold (n): Ngưỡng giới hạn (pass a threshold beyond which... = vượt qua một ngưỡng mà tại đó...)",
            d: "perimeter (n): Chu vi, vành đai"
          }
        },
        {
          gapNumber: 6,
          options: [
            { label: "a", text: "autocrat" },
            { label: "b", text: "authority" },
            { label: "c", text: "administrator" },
            { label: "d", text: "proprietor" }
          ],
          correctLabel: "b",
          correctWord: "authority",
          explanations: {
            a: "autocrat (n): Kẻ độc tài chuyên chế",
            b: "authority (n): Chuyên gia đầu ngành, học giả uy tín (a leading authority on sth)",
            c: "administrator (n): Người quản trị hành chính",
            d: "proprietor (n): Chủ sở hữu cơ sở kinh doanh"
          }
        },
        {
          gapNumber: 7,
          options: [
            { label: "a", text: "dusts" },
            { label: "b", text: "sediments" },
            { label: "c", text: "dirt" },
            { label: "d", text: "powder" }
          ],
          correctLabel: "b",
          correctWord: "sediments",
          explanations: {
            a: "dusts (n): Bụi bặm",
            b: "sediments (n): Lớp trầm tích dưới đáy đại dương (deep ocean sediments)",
            c: "dirt (n): Đất bẩn",
            d: "powder (n): Bột mịn"
          }
        },
        {
          gapNumber: 8,
          options: [
            { label: "a", text: "trends" },
            { label: "b", text: "gadgets" },
            { label: "c", text: "fads" },
            { label: "d", text: "crazes" }
          ],
          correctLabel: "a",
          correctWord: "trends",
          explanations: {
            a: "trends (n): Xu hướng biến đổi (if present trends continue = nếu các xu hướng hiện tại tiếp diễn)",
            b: "gadgets (n): Thiết bị công nghệ nhỏ",
            c: "fads (n): Trào lưu nhất thời",
            d: "crazes (n): Cơn sốt thị hiếu"
          }
        },
        {
          gapNumber: 9,
          options: [
            { label: "a", text: "capacity" },
            { label: "b", text: "competence" },
            { label: "c", text: "intelligence" },
            { label: "d", text: "bulk" }
          ],
          correctLabel: "a",
          correctWord: "capacity",
          explanations: {
            a: "capacity (n): Sức chứa, khả năng hấp thụ tự nhiên (natural capacity)",
            b: "competence (n): Năng lực chuyên môn của con người",
            c: "intelligence (n): Trí thông minh",
            d: "bulk (n): Khối lượng lớn"
          }
        },
        {
          gapNumber: 10,
          options: [
            { label: "a", text: "overcharged" },
            { label: "b", text: "overstated" },
            { label: "c", text: "overshadowed" },
            { label: "d", text: "overwhelmed" }
          ],
          correctLabel: "d",
          correctWord: "overwhelmed",
          explanations: {
            a: "overcharged (v): Tính quá giá tiền / nạp quá điện",
            b: "overstated (v): Nói quá, phóng đại",
            c: "overshadowed (v): Làm lu mờ",
            d: "overwhelmed (v): Bị quá tải, áp đảo vượt mức chịu đựng (natural capacity can be easily overwhelmed)"
          }
        }
      ]
    }
  ],

  // 6. Speed Blitz (20 questions: 10 from Page 8 Task One + 10 from Page 10 Part B)
  speedBlitz: [
    {
      id: "u2-sb-1",
      questionNumber: 1,
      prompt: "An [ex-convict] is a person ______.",
      options: [
        { key: "1", text: "about to be punished" },
        { key: "2", text: "who has already undergone punishment" },
        { key: "3", text: "who investigates crimes" },
        { key: "4", text: "exempt from the law" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "about to be punished", pos: "phr", vi: "Sắp sửa bị trừng phạt" },
        { key: "2", word: "ex-convict", pos: "n", vi: "Cựu tù nhân (người đã chấp hành xong án phạt tù)" },
        { key: "3", word: "investigator", pos: "n", vi: "Điều tra viên" },
        { key: "4", word: "exempt", pos: "adj", vi: "Được miễn trừ trách nhiệm" }
      ]
    },
    {
      id: "u2-sb-2",
      questionNumber: 2,
      prompt: "A [sane] individual is ______.",
      options: [
        { key: "1", text: "healthy in mind" },
        { key: "2", text: "mad" },
        { key: "3", text: "physically frail" },
        { key: "4", text: "arrogant" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "sane", pos: "adj", vi: "Tỉnh táo, minh mẫn, có tâm thần lành mạnh (healthy in mind)" },
        { key: "2", word: "mad / insane", pos: "adj", vi: "Điên rồ, mất trí" },
        { key: "3", word: "frail", pos: "adj", vi: "Ốm yếu, suy nhược" },
        { key: "4", word: "arrogant", pos: "adj", vi: "Kiêu ngạo" }
      ]
    },
    {
      id: "u2-sb-3",
      questionNumber: 3,
      prompt: "A [naked] person ______.",
      options: [
        { key: "1", text: "has his clothes on" },
        { key: "2", text: "hasn't got his clothes on" },
        { key: "3", text: "wears formal attire" },
        { key: "4", text: "is heavily disguised" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "dressed", pos: "adj", vi: "Đang mặc quần áo" },
        { key: "2", word: "naked", pos: "adj", vi: "Trần truồng, khỏa thân (hasn't got his clothes on)" },
        { key: "3", word: "formal attire", pos: "n", vi: "Trang phục trang trọng" },
        { key: "4", word: "disguised", pos: "adj", vi: "Đã cải trang" }
      ]
    },
    {
      id: "u2-sb-4",
      questionNumber: 4,
      prompt: "An enemy that [capitulates] ______.",
      options: [
        { key: "1", text: "surrenders" },
        { key: "2", text: "fights to the bitter end" },
        { key: "3", text: "launches an ambush" },
        { key: "4", text: "celebrates victory" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "capitulate", pos: "v", vi: "Đầu hàng theo điều kiện (surrenders)" },
        { key: "2", word: "fight to the bitter end", pos: "phr", vi: "Chiến đấu đến cùng" },
        { key: "3", word: "ambush", pos: "n", vi: "Cuộc phục kích" },
        { key: "4", word: "victory", pos: "n", vi: "Chiến thắng" }
      ]
    },
    {
      id: "u2-sb-5",
      questionNumber: 5,
      prompt: "People who [abide by] the law ______.",
      options: [
        { key: "1", text: "observe it" },
        { key: "2", text: "disregard it" },
        { key: "3", text: "abolish it" },
        { key: "4", text: "violate it" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "abide by", pos: "phr.v", vi: "Tuân thủ, chấp hành nghiêm chỉnh (observe / comply with)" },
        { key: "2", word: "disregard", pos: "v", vi: "Phớt lờ, coi thường" },
        { key: "3", word: "abolish", pos: "v", vi: "Bãi bỏ" },
        { key: "4", word: "violate", pos: "v", vi: "Vi phạm" }
      ]
    },
    {
      id: "u2-sb-6",
      questionNumber: 6,
      prompt: "An [unscrupulous] man ______.",
      options: [
        { key: "1", text: "is guided by conscience" },
        { key: "2", text: "is not guided by conscience" },
        { key: "3", text: "is exceptionally generous" },
        { key: "4", text: "is timid and shy" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "scrupulous", pos: "adj", vi: "Tận tâm, có lương tâm đạo đức" },
        { key: "2", word: "unscrupulous", pos: "adj", vi: "Vô lương tâm, bất chấp thủ đoạn (not guided by conscience)" },
        { key: "3", word: "generous", pos: "adj", vi: "Hào phóng" },
        { key: "4", word: "timid", pos: "adj", vi: "Nhút nhát" }
      ]
    },
    {
      id: "u2-sb-7",
      questionNumber: 7,
      prompt: "A [graceful] woman ______.",
      options: [
        { key: "1", text: "is attractive in movement" },
        { key: "2", text: "is unattractive in movement" },
        { key: "3", text: "is clumsy and awkward" },
        { key: "4", text: "is overly talkative" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "graceful", pos: "adj", vi: "Duyên dáng, uyển chuyển, thanh thoát trong cử chỉ (attractive in movement)" },
        { key: "2", word: "ungainly", pos: "adj", vi: "Vụng về, kém duyên" },
        { key: "3", word: "clumsy", pos: "adj", vi: "Hậu đậu" },
        { key: "4", word: "talkative", pos: "adj", vi: "Nói nhiều" }
      ]
    },
    {
      id: "u2-sb-8",
      questionNumber: 8,
      prompt: "A friend [sticking to] his promises ______.",
      options: [
        { key: "1", text: "keeps them" },
        { key: "2", text: "breaks them" },
        { key: "3", text: "forgets them" },
        { key: "4", text: "denies them" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "stick to", pos: "phr.v", vi: "Giữ vững lời hứa, kiên định thực hiện (keeps them)" },
        { key: "2", word: "break", pos: "v", vi: "Thất hứa" },
        { key: "3", word: "forget", pos: "v", vi: "Quên lãng" },
        { key: "4", word: "deny", pos: "v", vi: "Chối bỏ" }
      ]
    },
    {
      id: "u2-sb-9",
      questionNumber: 9,
      prompt: "A [blunt] person ______.",
      options: [
        { key: "1", text: "is invariably polite" },
        { key: "2", text: "doesn't take the trouble to be polite" },
        { key: "3", text: "speaks in riddles" },
        { key: "4", text: "flatters everyone" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "courteous", pos: "adj", vi: "Luôn lịch sự nhã nhặn" },
        { key: "2", word: "blunt", pos: "adj", vi: "Thẳng thừng, bộc trực đến mức cộc lốc, không màng giữ kẽ lịch sự" },
        { key: "3", word: "cryptic", pos: "adj", vi: "Bí hiểm, nói vòng vo" },
        { key: "4", word: "flatter", pos: "v", vi: "Xu nịnh" }
      ]
    },
    {
      id: "u2-sb-10",
      questionNumber: 10,
      prompt: "A [convent] is another word for ______.",
      options: [
        { key: "1", text: "monastery for women" },
        { key: "2", text: "boarding school" },
        { key: "3", text: "royal palace" },
        { key: "4", text: "military fortress" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "convent", pos: "n", vi: "Tu viện dành cho các nữ tu (monastery for women / nuns)" },
        { key: "2", word: "boarding school", pos: "n", vi: "Trường nội trú" },
        { key: "3", word: "palace", pos: "n", vi: "Cung điện" },
        { key: "4", word: "fortress", pos: "n", vi: "Pháo đài" }
      ]
    },
    {
      id: "u2-sb-11",
      questionNumber: 11,
      prompt: "______ is a real health hazard.",
      options: [
        { key: "1", text: "Stupidity" },
        { key: "2", text: "Sturdiness" },
        { key: "3", text: "Animosity" },
        { key: "4", text: "Obesity" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "stupidity", pos: "n", vi: "Sự ngu ngốc" },
        { key: "2", word: "sturdiness", pos: "n", vi: "Sự cứng cáp, khỏe mạnh" },
        { key: "3", word: "animosity", pos: "n", vi: "Sự thù hằn, ác cảm" },
        { key: "4", word: "obesity", pos: "n", vi: "Chứng béo phì (mối nguy hại thực sự cho sức khỏe - health hazard)" }
      ]
    },
    {
      id: "u2-sb-12",
      questionNumber: 12,
      prompt: "The old lady was becoming increasingly affected by ______.",
      options: [
        { key: "1", text: "senility" },
        { key: "2", text: "masculinity" },
        { key: "3", text: "virility" },
        { key: "4", text: "chivalry" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "senility", pos: "n", vi: "Chứng lú lẫn, suy giảm trí tuệ tuổi già" },
        { key: "2", word: "masculinity", pos: "n", vi: "Vẻ nam tính" },
        { key: "3", word: "virility", pos: "n", vi: "Sinh lực cường tráng phái mạnh" },
        { key: "4", word: "chivalry", pos: "n", vi: "Tinh thần hiệp sĩ" }
      ]
    },
    {
      id: "u2-sb-13",
      questionNumber: 13,
      prompt: "His ______ excuses invariably exasperated the manager.",
      options: [
        { key: "1", text: "feeble" },
        { key: "2", text: "frail" },
        { key: "3", text: "robust" },
        { key: "4", text: "wealthy" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "feeble", pos: "adj", vi: "Yếu ớt, thiếu thuyết phục (collocation: feeble excuse = cái cớ nghèo nàn)" },
        { key: "2", word: "frail", pos: "adj", vi: "Mảnh mai, suy nhược (chỉ dùng cho cơ thể/sức khỏe, không đi với excuse)" },
        { key: "3", word: "robust", pos: "adj", vi: "Tráng kiện, vững mạnh" },
        { key: "4", word: "wealthy", pos: "adj", vi: "Giàu có" }
      ]
    },
    {
      id: "u2-sb-14",
      questionNumber: 14,
      prompt: "I don't ______ to be a genius but I am not stupid either.",
      options: [
        { key: "1", text: "permit" },
        { key: "2", text: "agree" },
        { key: "3", text: "compare" },
        { key: "4", text: "claim" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "permit", pos: "v", vi: "Cho phép" },
        { key: "2", word: "agree", pos: "v", vi: "Đồng ý" },
        { key: "3", word: "compare", pos: "v", vi: "So sánh" },
        { key: "4", word: "claim", pos: "v", vi: "Tự nhận, tuyên bố (claim to be a genius = tự nhận là thiên tài)" }
      ]
    },
    {
      id: "u2-sb-15",
      questionNumber: 15,
      prompt: "Smoking can be ______ to your health.",
      options: [
        { key: "1", text: "delightful" },
        { key: "2", text: "harmless" },
        { key: "3", text: "detrimental" },
        { key: "4", text: "indifferent" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "delightful", pos: "adj", vi: "Thú vị, dễ chịu" },
        { key: "2", word: "harmless", pos: "adj", vi: "Vô hại" },
        { key: "3", word: "detrimental", pos: "adj", vi: "Có hại, gây tổn hại nghiêm trọng (detrimental to health)" },
        { key: "4", word: "indifferent", pos: "adj", vi: "Thờ ơ, lãnh đạm" }
      ]
    },
    {
      id: "u2-sb-16",
      questionNumber: 16,
      prompt: "People ______ their spending power when prices rise.",
      options: [
        { key: "1", text: "increase" },
        { key: "2", text: "curtail" },
        { key: "3", text: "prolong" },
        { key: "4", text: "think" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "increase", pos: "v", vi: "Gia tăng" },
        { key: "2", word: "curtail", pos: "v", vi: "Cắt giảm, thắt chặt, thu hẹp (curtail spending)" },
        { key: "3", word: "prolong", pos: "v", vi: "Kéo dài thời gian" },
        { key: "4", word: "think", pos: "v", vi: "Suy nghĩ" }
      ]
    },
    {
      id: "u2-sb-17",
      questionNumber: 17,
      prompt: "He became an outlaw by ______ the law.",
      options: [
        { key: "1", text: "defying" },
        { key: "2", text: "observing" },
        { key: "3", text: "sticking to" },
        { key: "4", text: "abiding by" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "defy", pos: "v", vi: "Bất chấp, thách thức, chống lại pháp luật (defying the law ➔ trở thành kẻ sống ngoài vòng pháp luật)" },
        { key: "2", word: "observe", pos: "v", vi: "Tuân thủ luật" },
        { key: "3", word: "stick to", pos: "phr.v", vi: "Làm đúng theo" },
        { key: "4", word: "abide by", pos: "phr.v", vi: "Chấp hành nghiêm chỉnh" }
      ]
    },
    {
      id: "u2-sb-18",
      questionNumber: 18,
      prompt: "______ is a punishable offense.",
      options: [
        { key: "1", text: "Hunting" },
        { key: "2", text: "Poaching" },
        { key: "3", text: "Jogging" },
        { key: "4", text: "Boxing" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "hunting", pos: "n", vi: "Săn bắn (có thể hợp pháp)" },
        { key: "2", word: "poaching", pos: "n", vi: "Săn bắt trộm động vật hoang dã trái phép (a punishable offense)" },
        { key: "3", word: "jogging", pos: "n", vi: "Chạy bộ" },
        { key: "4", word: "boxing", pos: "n", vi: "Môn quyền Anh" }
      ]
    },
    {
      id: "u2-sb-19",
      questionNumber: 19,
      prompt: "Marian was a beautiful, ______ young lady.",
      options: [
        { key: "1", text: "corpulent" },
        { key: "2", text: "gaunt" },
        { key: "3", text: "slender" },
        { key: "4", text: "bony" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "corpulent", pos: "adj", vi: "Béo phì nặng nề" },
        { key: "2", word: "gaunt", pos: "adj", vi: "Hốc hác, tiều tụy" },
        { key: "3", word: "slender", pos: "adj", vi: "Mảnh mai, thon thả duyên dáng (mang nghĩa khen ngợi đi cùng 'beautiful')" },
        { key: "4", word: "bony", pos: "adj", vi: "Gầy trơ xương" }
      ]
    },
    {
      id: "u2-sb-20",
      questionNumber: 20,
      prompt: "Don't trust him; he's cruel, ______ and unscrupulous.",
      options: [
        { key: "1", text: "loving" },
        { key: "2", text: "slack" },
        { key: "3", text: "treacherous" },
        { key: "4", text: "trustworthy" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "loving", pos: "adj", vi: "Giàu tình yêu thương" },
        { key: "2", word: "slack", pos: "adj", vi: "Lỏng lẻo, chểnh mảng" },
        { key: "3", word: "treacherous", pos: "adj", vi: "Phản bội, xảo quyệt, tráo trở (cùng trường nghĩa tiêu cực với cruel & unscrupulous)" },
        { key: "4", word: "trustworthy", pos: "adj", vi: "Đáng tin cậy" }
      ]
    }
  ]
};



export const VOCAB_C1_UNIT_3: VocabC1Unit = {
  unitId: 3,
  title: "Unit 3: Obstruction & Prevention",
  subtitle: "The Vocabulary Files - Level C1 (Pages 11-14)",

  // 1. Words in Action (15 words from Page 11 & key vocabulary)
  wordsInAction: [
    {
      id: "u3-wia-1",
      word: "prevent",
      ipa: "/prɪˈvent/",
      nuance: "[Stop completely before happening]",
      register: "General / Core",
      collocations: ["prevent accidents", "prevent disease", "prevent from happening", "preventative measures"],
      enDef: "To stop someone from doing something, or stop an event from happening entirely.",
      viDef: "Ngăn chặn, ngăn ngừa hoàn toàn không để sự việc diễn ra.",
      example: "Proper hand hygiene can **prevent** the spread of harmful infections.",
      targetKeyword: "prevent"
    },
    {
      id: "u3-wia-2",
      word: "hinder",
      ipa: "/ˈhɪn.dər/",
      nuance: "[Make progress difficult without stopping entirely]",
      register: "Formal / Academic",
      collocations: ["hinder progress", "hinder growth", "hinder recovery", "severely hindered"],
      enDef: "To make it more difficult for someone to do something or for an action to succeed, causing delay.",
      viDef: "Gây cản trở, làm chậm trễ tiến độ (sự việc vẫn diễn ra nhưng khó khăn, chật vật hơn).",
      example: "A blinding snowstorm may **hinder** the train from arriving on schedule, though it still finishes its route.",
      targetKeyword: "hinder"
    },
    {
      id: "u3-wia-3",
      word: "obstruct",
      ipa: "/əbˈstrʌkt/",
      nuance: "[Block a path, route, view or process]",
      register: "Formal / Official",
      collocations: ["obstruct traffic", "obstruct justice", "obstruct the view", "obstruct the fairway"],
      enDef: "To block a road, passage, or progress with obstacles; to intentionally hinder legal proceedings.",
      viDef: "Làm nghẽn, chắn đường, bít lối (vật lý) hoặc cản trở tiến trình pháp lý/công lý.",
      example: "Fallen boulders and mudslides completely **obstructed** traffic on the motorway for hours.",
      targetKeyword: "obstruct"
    },
    {
      id: "u3-wia-4",
      word: "inhibit",
      ipa: "/ɪnˈhɪb.ɪt/",
      nuance: "[Suppress free expression or slow down reactions]",
      register: "Psychology / Academic",
      collocations: ["feel inhibited", "inhibit growth", "inhibit expression", "inhibit spontaneous speech"],
      enDef: "To make someone feel self-conscious and unable to act or speak freely; to slow biological or chemical action.",
      viDef: "Ức chế, kiềm hãm tự do biểu cảm (khiến rụt rè, bối rối) hoặc làm chậm quá trình phát triển.",
      example: "The strict supervisor's imposing presence **inhibited** the young apprentice from speaking freely.",
      targetKeyword: "inhibit"
    },
    {
      id: "u3-wia-5",
      word: "stem",
      ipa: "/stem/",
      nuance: "[Stop outward flow of liquid or rising trend]",
      register: "Journalistic / Medical",
      collocations: ["stem the bleeding", "stem the flow", "stem the tide", "stem the influx"],
      enDef: "To stop or check the continuous flow or spread of something (especially liquid, flood, or a dangerous trend).",
      viDef: "Cầm lại, chặn đứng dòng chảy (chảy máu, chất lỏng) hoặc ngăn làn sóng tiêu cực lan rộng.",
      example: "The paramedic applied firm pressure to **stem** the severe hemorrhage from the wound.",
      targetKeyword: "stem"
    },
    {
      id: "u3-wia-6",
      word: "prohibit",
      ipa: "/prəˈhɪb.ɪt/",
      nuance: "[Forbid formally by law or official regulation]",
      register: "Legal / Official",
      collocations: ["strictly prohibited", "prohibit by law", "prohibit smoking", "prohibitive costs"],
      enDef: "To officially forbid something by statute, legal decree, or company regulation.",
      viDef: "Cấm chỉ, ngăn cấm chính thức bằng luật pháp hoặc quy chế nghiêm ngặt.",
      example: "National maritime regulations strictly **prohibit** commercial fishing inside the protected sanctuary.",
      targetKeyword: "prohibit"
    },
    {
      id: "u3-wia-7",
      word: "hamper",
      ipa: "/ˈhæm.pər/",
      nuance: "[Make physical movement or practical action awkward]",
      register: "General / C1 Focus",
      collocations: ["hamper movement", "hamper rescue efforts", "hampered by bad weather", "hamper progress"],
      enDef: "To hinder or impede the free movement or practical efficiency of someone or something.",
      viDef: "Gây vướng víu, cản trở cử động thể chất hoặc gây bất tiện cho hành động thực tế.",
      example: "Her long ceremonial evening gown severely **hampered** her free movement across the stage.",
      targetKeyword: "hamper"
    },
    {
      id: "u3-wia-8",
      word: "impede",
      ipa: "/ɪmˈpiːd/",
      nuance: "[Interfere with or delay progress / flow]",
      register: "Formal / C1 Literary",
      collocations: ["impede progress", "impede speech", "impede traffic", "speech impediment"],
      enDef: "To delay or prevent someone or something by creating obstacles; to interfere with natural flow.",
      viDef: "Làm trở ngại, cản bước, làm ngọng/nghẽn (tiến độ, sự lưu thông hoặc giọng nói).",
      example: "A pronounced childhood lisp can severely **impede** clear verbal communication.",
      targetKeyword: "impede"
    },
    {
      id: "u3-wia-9",
      word: "restrain",
      ipa: "/rɪˈstreɪn/",
      nuance: "[Keep emotions or violent actions under control]",
      register: "Formal / Literary",
      collocations: ["restrain anger", "restrain impulses", "restrain yourself", "restrained behavior"],
      enDef: "To hold back someone or oneself from acting; to keep intense emotions or violence under control.",
      viDef: "Kiềm chế, nén lại, tự chủ bản thân (cảm xúc giận dữ, hành vi bộc phát).",
      example: "He took several deep breaths to **restrain** his fiery temper during the heated dispute.",
      targetKeyword: "restrain"
    },
    {
      id: "u3-wia-10",
      word: "succumb",
      ipa: "/səˈkʌm/",
      nuance: "[Yield or die from severe injury, illness or temptation]",
      register: "Formal / Journalistic",
      collocations: ["succumb to injuries", "succumb to illness", "succumb to temptation", "succumb to pressure"],
      enDef: "To fail to resist pressure, temptation, or fatal wounds; to die from a critical injury or disease.",
      viDef: "Không qua khỏi, gục ngã, đầu hàng trước thương tật nguy kịch, bệnh tật hoặc cám dỗ.",
      example: "Despite the surgical team's tireless efforts, the victim **succumbed** to his catastrophic injuries.",
      targetKeyword: "succumb"
    },
    {
      id: "u3-wia-11",
      word: "irksome",
      ipa: "/ˈɜːk.səm/",
      nuance: "[Exasperatingly annoying, tedious and tedious]",
      register: "Formal / Literary",
      collocations: ["irksome chore", "irksome delay", "irksome duty", "find it irksome"],
      enDef: "Irritating, annoying, tedious, and exasperating to deal with repeatedly.",
      viDef: "Phiền toái, gây bực bội khó chịu, tẻ nhạt đến phát cáu.",
      example: "Filling out dozens of redundant customs declarations is an intensely **irksome** formality.",
      targetKeyword: "irksome"
    },
    {
      id: "u3-wia-12",
      word: "destitute",
      ipa: "/ˈdes.tɪ.tʃuːt/",
      nuance: "[Deprived of basic necessities; penniless]",
      register: "Formal / Academic",
      collocations: ["utterly destitute", "destitute families", "destitute refugees", "reduce to destitution"],
      enDef: "Without money, food, home, or possessions; living in absolute poverty and deprivation.",
      viDef: "Cơ cực, bần cùng, túng quẫn (không có tiền tài, nhà cửa, thức ăn tối thiểu).",
      example: "The sudden foreclosure left the entire household homeless and virtually **destitute**.",
      targetKeyword: "destitute"
    },
    {
      id: "u3-wia-13",
      word: "extol",
      ipa: "/ɪkˈstəʊl/",
      nuance: "[Praise enthusiastically and publically]",
      register: "Formal / Rhetorical",
      collocations: ["extol the virtues", "extol the merits", "extol the beauties", "extol loudly"],
      enDef: "To praise someone or something lavishly, enthusiastically, and publicly.",
      viDef: "Tán dương, ca tụng hết lời, ngợi ca phẩm hạnh hoặc vẻ đẹp.",
      example: "Generations of romantic poets have **extolled** the untamed majesty of the Highland mountains.",
      targetKeyword: "extol"
    },
    {
      id: "u3-wia-14",
      word: "exorbitant",
      ipa: "/ɪɡˈzɔː.bɪ.tənt/",
      nuance: "[Prices / fees unreasonably sky-high]",
      register: "Economic / Critical",
      collocations: ["exorbitant prices", "exorbitant fees", "exorbitant rent", "charge exorbitant rates"],
      enDef: "(Of prices, costs, or demands) unreasonably high, astronomical, and far exceeding what is fair.",
      viDef: "Cắt cổ, quá quắt, đắt đỏ vô lý (nói về mức giá hoặc chi phí vượt mức hợp lý).",
      example: "Downtown restaurants often charge **exorbitant** prices for mediocre bottled mineral water.",
      targetKeyword: "exorbitant"
    },
    {
      id: "u3-wia-15",
      word: "rigorous",
      ipa: "/ˈrɪɡ.ər.əs/",
      nuance: "[Extremely thorough, strict and demanding]",
      register: "Academic / Professional",
      collocations: ["rigorous training", "rigorous testing", "rigorous standards", "rigorous analysis"],
      enDef: "Extremely thorough, exhaustive, strictly accurate, and demanding adherence to high standards.",
      viDef: "Nghiêm ngặt, khắt khe, triệt để (về chế độ huấn luyện, kiểm tra hoặc nghiên cứu học thuật).",
      example: "Pilots must undergo **rigorous** emergency simulator training before obtaining flight certification.",
      targetKeyword: "rigorous"
    }
  ],

  // 2. Word Formation (15 pairs from Page 11 Ex. B & Page 12 Task Two)
  wordFormation: [
    {
      id: "u3-wf-1",
      adjective: "prevent (verb)",
      root: "prevent",
      suffix: "-ion",
      noun: "prevention",
      suffixChoices: ["-ion", "-ment", "-ance", "-ure"],
      meaningVi: "Sự ngăn ngừa, biện pháp phòng chống",
      ruleTip: "Động từ kết thúc bằng phụ âm '-t' tạo danh từ chỉ hành động/kết quả bằng cách thêm hậu tố '-ion' (prevent ➔ prevention)."
    },
    {
      id: "u3-wf-2",
      adjective: "hinder (verb)",
      root: "hinder",
      suffix: "-ance",
      noun: "hindrance",
      suffixChoices: ["-ance", "-ence", "-ment", "-ity"],
      meaningVi: "Sự cản trở, chướng ngại vật cản đường",
      ruleTip: "Quy tắc rụng chữ cái đặc thù C1: 'hinder' lược bỏ nguyên âm 'e' trước 'r' khi kết hợp với hậu tố danh từ '-ance' (hinder ➔ hindrance)."
    },
    {
      id: "u3-wf-3",
      adjective: "obstruct (verb)",
      root: "obstruct",
      suffix: "-ion",
      noun: "obstruction",
      suffixChoices: ["-ion", "-ment", "-ance", "-hood"],
      meaningVi: "Sự tắc nghẽn, vật cản trở lối đi hoặc tiến trình",
      ruleTip: "Động từ gốc Latinh tận cùng bằng cụm phụ âm '-ct' luôn kết hợp với hậu tố '-ion' để tạo danh từ hành động (obstruct ➔ obstruction)."
    },
    {
      id: "u3-wf-4",
      adjective: "inhibit (verb)",
      root: "inhibit",
      suffix: "-ion",
      noun: "inhibition",
      suffixChoices: ["-ion", "-ment", "-ness", "-ity"],
      meaningVi: "Sự ức chế tâm lý, cảm giác e dè rụt rè",
      ruleTip: "Thêm hậu tố '-ion' vào động từ 'inhibit' để tạo danh từ trừu tượng tâm lý học 'inhibition'."
    },
    {
      id: "u3-wf-5",
      adjective: "prohibit (verb)",
      root: "prohibit",
      suffix: "-ion",
      noun: "prohibition",
      suffixChoices: ["-ion", "-ment", "-ance", "-dom"],
      meaningVi: "Lệnh nghiêm cấm, sự cấm chỉ bằng luật pháp",
      ruleTip: "Hậu tố pháp lý '-ion' gắn vào gốc động từ 'prohibit' để tạo danh từ chỉ sắc lệnh cấm chính thức (prohibition)."
    },
    {
      id: "u3-wf-6",
      adjective: "obese",
      root: "obes(e)",
      suffix: "-ity",
      noun: "obesity",
      suffixChoices: ["-ity", "-ness", "-ment", "-ance"],
      meaningVi: "Bệnh béo phì, thể trạng thừa cân nghiêm trọng",
      ruleTip: "Tính từ mượn gốc Latinh tận cùng bằng '-e' bỏ 'e' rồi thêm '-ity' để tạo danh từ chỉ tình trạng y khoa (obese ➔ obesity)."
    },
    {
      id: "u3-wf-7",
      adjective: "scrutinise (verb)",
      root: "scrutin(ise)",
      suffix: "-y",
      noun: "scrutiny",
      suffixChoices: ["-y", "-ation", "-ment", "-ance"],
      meaningVi: "Sự soi xét kỹ lưỡng, kiểm tra gắt gao",
      ruleTip: "Động từ đuôi '-ise/-ize' chuyển sang danh từ biểu thị sự giám sát gắt gao bằng cách thay bằng '-y' (scrutinise ➔ scrutiny)."
    },
    {
      id: "u3-wf-8",
      adjective: "impede (verb)",
      root: "imped(e)",
      suffix: "-ment",
      noun: "impediment",
      suffixChoices: ["-ment", "-ance", "-ion", "-ity"],
      meaningVi: "Sự trở ngại, tật nói ngọng/nói lắp (speech impediment)",
      ruleTip: "Động từ 'impede' bỏ nguyên âm 'e' cuối và nhận hậu tố '-ment' để tạo danh từ 'impediment' (chướng ngại / tật bẩm sinh)."
    },
    {
      id: "u3-wf-9",
      adjective: "impartial",
      root: "impartial",
      suffix: "-ity",
      noun: "impartiality",
      suffixChoices: ["-ity", "-ness", "-ance", "-ment"],
      meaningVi: "Tính công tâm, sự vô tư không thiên vị",
      ruleTip: "Tính từ kết thúc bằng '-al' luôn nhận hậu tố danh từ '-ity' để tạo danh từ chỉ phẩm chất trung lập (impartial ➔ impartiality)."
    },
    {
      id: "u3-wf-10",
      adjective: "disclose (verb)",
      root: "disclos(e)",
      suffix: "-ure",
      noun: "disclosure",
      suffixChoices: ["-ure", "-ment", "-ance", "-ion"],
      meaningVi: "Sự vạch trần, việc tiết lộ thông tin mật",
      ruleTip: "Động từ gốc tiếng Pháp/Latinh đuôi '-ose' bỏ 'e' thêm '-ure' để tạo danh từ chỉ hành động công khai bí mật (disclose ➔ disclosure)."
    },
    {
      id: "u3-wf-11",
      adjective: "profound",
      root: "profound",
      suffix: "-ity",
      noun: "profundity",
      suffixChoices: ["-ity", "-ness", "-ment", "-ance"],
      meaningVi: "Sự uyên thâm, bề sâu tri thức, tính sâu sắc",
      ruleTip: "Biến âm nguyên âm C1: Cụm nhị trùng âm '-ound' ở tính từ 'profound' biến đổi thành nguyên âm ngắn '-undity' khi nhận '-ity' (profundity)."
    },
    {
      id: "u3-wf-12",
      adjective: "ingenious",
      root: "ingeni(ous)",
      suffix: "-ity",
      noun: "ingenuity",
      suffixChoices: ["-ity", "-ness", "-ment", "-ance"],
      meaningVi: "Sự tài tình, tính khéo léo, óc sáng tạo vượt trội",
      ruleTip: "Biến đổi chính tả C1: Tính từ 'ingenious' khi sang danh từ sẽ bỏ hậu tố '-ous' và chuyển thành 'ingenuity' (chú ý trọng âm đổi sang âm tiết 3)."
    },
    {
      id: "u3-wf-13",
      adjective: "depart (verb)",
      root: "depart",
      suffix: "-ure",
      noun: "departure",
      suffixChoices: ["-ure", "-ment", "-ance", "-ion"],
      meaningVi: "Sự khởi hành, sự rời đi bất ngờ",
      ruleTip: "Động từ 'depart' kết hợp với hậu tố danh từ '-ure' để chỉ hành động rời đi hoặc chuyến bay/chuyến tàu khởi hành (departure)."
    },
    {
      id: "u3-wf-14",
      adjective: "commit (verb)",
      root: "commit",
      suffix: "-ment",
      noun: "commitment",
      suffixChoices: ["-ment", "-ance", "-ion", "-ity"],
      meaningVi: "Sự cam kết, lòng tận tụy, nghĩa vụ gắn bó",
      ruleTip: "Động từ 'commit' nhận hậu tố '-ment' tạo danh từ chỉ trách nhiệm hoặc lời cam kết gắn bó (commitment)."
    },
    {
      id: "u3-wf-15",
      adjective: "destitute",
      root: "destitut(e)",
      suffix: "-ion",
      noun: "destitution",
      suffixChoices: ["-ion", "-ity", "-ness", "-ment"],
      meaningVi: "Cảnh cơ cực, tình trạng bần cùng khốn khó",
      ruleTip: "Tính từ 'destitute' bỏ 'e' thêm '-ion' tạo danh từ trừu tượng chỉ cảnh sống kiệt quệ tài sản (destitution)."
    }
  ],

  // 3. Confusable Words (8 pairs from Page 13 Task Three)
  confusableWords: [
    {
      id: "u3-cw-1",
      wordA: "flavour",
      wordB: "savour",
      diffHighlightA: { before: "", highlight: "fl", after: "avour" },
      diffHighlightB: { before: "", highlight: "s", after: "avour" },
      defA: "flavour (n): Mùi vị đặc trưng, hương vị của món ăn đồ uống.",
      defB: "savour (v): Thưởng thức chậm rãi, nhấm nháp và tận hưởng trọn vẹn mùi vị.",
      promptSentence: "You couldn't possibly ______ your food when you eat so fast!",
      correctWord: "savour",
      distinctionTip: "FLAVOUR là danh từ (hương vị món ăn). SAVOUR là động từ (thưởng thức, nhấm nháp từng miếng). Ở đây sau trợ động từ 'couldn't possibly' cần một động từ nguyên mẫu.",
      mnemonic: "SAVOUR có chữ S gợi nhớ 'Slowly' — ăn chậm để thưởng thức trọn vẹn hương vị."
    },
    {
      id: "u3-cw-2",
      wordA: "inhibit",
      wordB: "prohibit",
      diffHighlightA: { before: "", highlight: "in", after: "hibit" },
      diffHighlightB: { before: "", highlight: "pro", after: "hibit" },
      defA: "inhibit (v): Ức chế tâm lý, làm ai đó rụt rè không dám tự nhiên thể hiện.",
      defB: "prohibit (v): Nghiêm cấm chính thức bởi luật pháp, quy chế y khoa hoặc văn bản.",
      promptSentence: "His doctor ______ him from drinking alcohol.",
      correctWord: "prohibited",
      distinctionTip: "Bác sĩ đưa ra yêu cầu cấm tiệt vì sức khỏe (pháp lệnh y tế) đi với cấu trúc 'prohibit sb from doing sth'.",
      mnemonic: "PROHIBIT mang tiền tố 'PRO-' như 'Protocol' (quy định/phép tắc chính thức cấm đoán)."
    },
    {
      id: "u3-cw-3",
      wordA: "implicit",
      wordB: "explicit",
      diffHighlightA: { before: "", highlight: "im", after: "plicit" },
      diffHighlightB: { before: "", highlight: "ex", after: "plicit" },
      defA: "implicit (adj): Ngầm hiểu, ẩn ý, không nói toạc móng heo ra ngoài.",
      defB: "explicit (adj): Rõ ràng, dứt khoát, chỉ dẫn từng bước cụ thể không mập mờ.",
      promptSentence: "She didn't give ______ instructions, so she shouldn't be angry with you for doing it wrong.",
      correctWord: "explicit",
      distinctionTip: "IMPLICIT = 'in' (ngụ ý bên trong). EXPLICIT = 'ex' (bộc lộ ra ngoài rõ ràng, rành mạch từng chi tiết).",
      mnemonic: "EXPLICIT bắt đầu bằng EX- (Exit/Express) ➔ nói toạc ra bên ngoài một cách minh bạch."
    },
    {
      id: "u3-cw-4",
      wordA: "superficial",
      wordB: "superfluous",
      diffHighlightA: { before: "super", highlight: "ficial", after: "" },
      diffHighlightB: { before: "super", highlight: "fluous", after: "" },
      defA: "superficial (adj): Nông cạn, hời hợt, chỉ nhìn vẻ bề ngoài mà không sâu sắc.",
      defB: "superfluous (adj): Dư thừa, thừa thãi không cần thiết (vượt quá nhu cầu).",
      promptSentence: "It is ______ to judge people by the clothes they wear.",
      correctWord: "superficial",
      distinctionTip: "SUPERFICIAL có gốc 'surface' (bề mặt) ➔ nông cạn, chỉ nhìn vẻ ngoài. SUPERFLUOUS có gốc 'flow' ➔ nước tràn trề dư thừa.",
      mnemonic: "SUPERFICIAL = Surface (bề mặt) ➔ đánh giá con người qua vẻ bề ngoài là nông cạn."
    },
    {
      id: "u3-cw-5",
      wordA: "pathetic",
      wordB: "apathetic",
      diffHighlightA: { before: "", highlight: "p", after: "athetic" },
      diffHighlightB: { before: "", highlight: "ap", after: "athetic" },
      defA: "pathetic (adj): Đáng thương hại, thảm hại, gợi lòng trắc ẩn hoặc bi đát.",
      defB: "apathetic (adj): Thờ ơ, lãnh đạm, dửng dưng không buồn quan tâm bất cứ điều gì.",
      promptSentence: "Gregory has been ______ since he lost his job; he doesn't seem to want to do anything.",
      correctWord: "apathetic",
      distinctionTip: "Tiền tố A- mang nghĩa phủ định (không có cảm xúc). Apathetic = mất hết ý chí, thờ ơ lãnh đạm, không thiết tha làm gì.",
      mnemonic: "A-PATHETIC = 'A' (không) + 'Pathos' (cảm xúc) ➔ trơ lì, thờ ơ không cảm xúc."
    },
    {
      id: "u3-cw-6",
      wordA: "apprehend",
      wordB: "comprehend",
      diffHighlightA: { before: "", highlight: "ap", after: "prehend" },
      diffHighlightB: { before: "", highlight: "com", after: "prehend" },
      defA: "apprehend (v): Bắt giữ tội phạm (thuật ngữ công an/pháp lý) hoặc lo âu phập phồng.",
      defB: "comprehend (v): Thấu hiểu trọn vẹn bản chất hoặc nguyên nhân sâu xa của sự việc.",
      promptSentence: "I cannot ______ what caused her to act that way.",
      correctWord: "comprehend",
      distinctionTip: "COMPREHEND = hiểu thấu đáo một hành động hay nguyên nhân. APPREHEND = bắt giữ kẻ phạm pháp.",
      mnemonic: "COMPREHEND cùng gốc với 'Comprehensive' (toàn diện) ➔ hiểu thấu đáo mọi khía cạnh."
    },
    {
      id: "u3-cw-7",
      wordA: "statute",
      wordB: "stature",
      diffHighlightA: { before: "stat", highlight: "ute", after: "" },
      diffHighlightB: { before: "stat", highlight: "ure", after: "" },
      defA: "statute (n): Đạo luật, quy chế pháp lý bằng văn bản được quốc hội/cơ quan ban hành.",
      defB: "stature (n): Tầm vóc cơ thể (chiều cao) hoặc tầm ảnh hưởng, vị thế xã hội.",
      promptSentence: "Although Jane is small in ______ she has a commanding personality.",
      correctWord: "stature",
      distinctionTip: "STATURE đi cùng 'small in stature' nghĩa là dáng người thấp bé nhưng phong thái quyền lực. STATUTE là đạo luật.",
      mnemonic: "STATURE có vần giống 'Nature' chỉ vóc dáng con người do tạo hóa ban tặng."
    },
    {
      id: "u3-cw-8",
      wordA: "induce",
      wordB: "deduce",
      diffHighlightA: { before: "", highlight: "in", after: "duce" },
      diffHighlightB: { before: "", highlight: "de", after: "duce" },
      defA: "induce (v): Thuyết phục, dẫn dụ, xui khiến ai đó làm điều gì; gây ra triệu chứng.",
      defB: "deduce (v): Suy luận, suy diễn ra kết luận logic từ các bằng chứng có sẵn.",
      promptSentence: "Nothing could ______ him to move to the city.",
      correctWord: "induce",
      distinctionTip: "INDUCE sb to do sth = thuyết phục/lôi kéo ai làm gì. DEDUCE = suy luận kiểu thám tử Sherlock Holmes.",
      mnemonic: "INDUCE có 'IN' (kéo người khác vào hành động) ➔ thuyết phục, xui khiến."
    }
  ],

  // 4. Synonym Filter (3 challenge rounds)
  synonymFilter: [
    {
      id: "u3-sf-1",
      targetWord: "OBSTRUCTION & HINDRANCE",
      targetMeaning: "Nhóm từ C1 biểu thị hành động CẢN TRỞ / CHẶN ĐỨNG / LÀM NGHẼN",
      note: "Chọn các từ KHÔNG đồng nghĩa để loại bỏ khỏi danh sách",
      targetCategory: "OBSTRUCTION & HINDRANCE",
      targetMeaningVi: "Nhóm từ C1 biểu thị hành động CẢN TRỞ / CHẶN ĐỨNG / LÀM NGHẼN",
      words: [
        { word: "prevent", isSynonym: true },
        { word: "hinder", isSynonym: true },
        { word: "obstruct", isSynonym: true },
        { word: "hamper", isSynonym: true },
        { word: "impede", isSynonym: true },
        { word: "inhibit", isSynonym: true },
        { word: "superfluous", isSynonym: false },
        { word: "apathetic", isSynonym: false }
      ]
    },
    {
      id: "u3-sf-2",
      targetWord: "EXTOL & ACCLAIM",
      targetMeaning: "Nhóm từ biểu thị sự TÁN DƯƠNG / CA TỤNG / KHEN NGỢI HẾT LỜI",
      note: "Chọn các từ KHÔNG đồng nghĩa để loại bỏ khỏi danh sách",
      targetCategory: "EXTOL & ACCLAIM",
      targetMeaningVi: "Nhóm từ biểu thị sự TÁN DƯƠNG / CA TỤNG / KHEN NGỢI HẾT LỜI",
      words: [
        { word: "extol", isSynonym: true },
        { word: "acclaim", isSynonym: true },
        { word: "praise", isSynonym: true },
        { word: "laud", isSynonym: true },
        { word: "commend", isSynonym: true },
        { word: "eulogize", isSynonym: true },
        { word: "irksome", isSynonym: false },
        { word: "succumb", isSynonym: false }
      ]
    },
    {
      id: "u3-sf-3",
      targetWord: "EXCESSIVE & SEVERE",
      targetMeaning: "Nhóm từ biểu thị tính chất KHẮC NGHIỆT / QUÁ QUẮT / ĐÒI HỎI CAO",
      note: "Chọn các từ KHÔNG đồng nghĩa để loại bỏ khỏi danh sách",
      targetCategory: "EXCESSIVE & SEVERE",
      targetMeaningVi: "Nhóm từ biểu thị tính chất KHẮC NGHIỆT / QUÁ QUẮT / ĐÒI HỎI CAO",
      words: [
        { word: "exorbitant", isSynonym: true },
        { word: "harsh", isSynonym: true },
        { word: "rigorous", isSynonym: true },
        { word: "severe", isSynonym: true },
        { word: "acute", isSynonym: true },
        { word: "destitute", isSynonym: true },
        { word: "superficial", isSynonym: false },
        { word: "moderate", isSynonym: false }
      ]
    }
  ],

  // 5. Smart Cloze (Page 14 Part A)
  clozePassages: [
    {
      id: "u3-cp-1",
      title: "Wealth, Desire, and Modern Societies",
      sourceLabel: "Page 14 — Vocabulary Practice Part A",
      passageTemplate: "A solution to {{gap_11}} desires and expectations perhaps lies in the recognition that wealth does not involve having many things. It involves having what we long for. Wealth is not an absolute. It is relative to desire. Every time we seek something we cannot afford, we grow poorer, whatever our resources. And every time we feel satisfied with what we have, we can be {{gap_12}} as rich, however little we may actually own. There are two ways to make people richer: to give them more money or to {{gap_13}} their desires. Modern societies have succeeded spectacularly at the first option but, by continuously inflaming appetites, they have at the same time helped to negate a share of their most impressive achievements.\nThe most effective way to feel wealthy may not be to try to make more money. It can be to {{gap_14}} ourselves - practically and emotionally - from anyone we both consider to be our equal and who has become richer than us. Rather than trying to become bigger fish, we should concentrate our energies on {{gap_15}} around us smaller companions next to whom our own size will not {{gap_16}} us. In so far as advanced societies provide us with historically elevated incomes, they appear to make us richer. But, in truth, the net effect of these societies may be to {{gap_17}} us because, by fostering unlimited expectations, they keep open a permanent gap between what we want and what we can afford, who we are and who we might be. The {{gap_18}} we have paid for expecting to be so much more than our ancestors is the permanent feeling that we are far from being all we might be. We should be careful what we read in the papers and what programmes we watch. No matter what the media {{gap_19}} at us, we must remain realistic in our goals and expectations and not allow ourselves to be {{gap_20}} into a life of materialism.",
      gaps: [
        {
          gapNumber: 11,
          options: [
            { label: "a", text: "coiling" },
            { label: "b", text: "curving" },
            { label: "c", text: "spiralling" },
            { label: "d", text: "revolving" }
          ],
          correctLabel: "c",
          correctWord: "spiralling",
          targetWord: "spiralling",
          explanationVi: "spiralling desires: những ham muốn leo thang theo đường xoắn ốc (ngày càng tăng mất kiểm soát)."
        },
        {
          gapNumber: 12,
          options: [
            { label: "a", text: "counted" },
            { label: "b", text: "added" },
            { label: "c", text: "thought" },
            { label: "d", text: "accounted" }
          ],
          correctLabel: "a",
          correctWord: "counted",
          targetWord: "counted",
          explanationVi: "counted as rich: được xem là / được coi như là giàu có (count as sth)."
        },
        {
          gapNumber: 13,
          options: [
            { label: "a", text: "refer" },
            { label: "b", text: "reassure" },
            { label: "c", text: "recline" },
            { label: "d", text: "restrain" }
          ],
          correctLabel: "d",
          correctWord: "restrain",
          targetWord: "restrain",
          explanationVi: "restrain their desires: kiềm chế / kiểm soát ham muốn của họ."
        },
        {
          gapNumber: 14,
          options: [
            { label: "a", text: "dispute" },
            { label: "b", text: "vary" },
            { label: "c", text: "single" },
            { label: "d", text: "distance" }
          ],
          correctLabel: "d",
          correctWord: "distance",
          targetWord: "distance",
          explanationVi: "distance ourselves from sb: giữ khoảng cách tâm lý và thực tế với những người giàu hơn mình."
        },
        {
          gapNumber: 15,
          options: [
            { label: "a", text: "gathering" },
            { label: "b", text: "heaping" },
            { label: "c", text: "loading" },
            { label: "d", text: "distributing" }
          ],
          correctLabel: "a",
          correctWord: "gathering",
          targetWord: "gathering",
          explanationVi: "gathering around us smaller companions: tụ họp xung quanh mình những bạn bè bình thường hơn."
        },
        {
          gapNumber: 16,
          options: [
            { label: "a", text: "brood" },
            { label: "b", text: "fret" },
            { label: "c", text: "trouble" },
            { label: "d", text: "console" }
          ],
          correctLabel: "c",
          correctWord: "trouble",
          targetWord: "trouble",
          explanationVi: "will not trouble us: sẽ không gây phiền lòng hay bất an cho chúng ta."
        },
        {
          gapNumber: 17,
          options: [
            { label: "a", text: "redeem" },
            { label: "b", text: "impoverish" },
            { label: "c", text: "enrich" },
            { label: "d", text: "augment" }
          ],
          correctLabel: "b",
          correctWord: "impoverish",
          targetWord: "impoverish",
          explanationVi: "impoverish us: làm cho chúng ta nghèo đi về mặt tâm hồn và cảm nhận hạnh phúc."
        },
        {
          gapNumber: 18,
          options: [
            { label: "a", text: "fee" },
            { label: "b", text: "price" },
            { label: "c", text: "fund" },
            { label: "d", text: "charge" }
          ],
          correctLabel: "b",
          correctWord: "price",
          targetWord: "price",
          explanationVi: "The price we have paid: cái giá mà chúng ta đã phải trả."
        },
        {
          gapNumber: 19,
          options: [
            { label: "a", text: "sends" },
            { label: "b", text: "delivers" },
            { label: "c", text: "exploits" },
            { label: "d", text: "throws" }
          ],
          correctLabel: "d",
          correctWord: "throws",
          targetWord: "throws",
          explanationVi: "media throws at us: bất kể truyền thông ném / dội vào chúng ta những thông điệp gì."
        },
        {
          gapNumber: 20,
          options: [
            { label: "a", text: "liberated" },
            { label: "b", text: "quarantined" },
            { label: "c", text: "brainwashed" },
            { label: "d", text: "investigated" }
          ],
          correctLabel: "c",
          correctWord: "brainwashed",
          targetWord: "brainwashed",
          explanationVi: "brainwashed into a life of materialism: bị tẩy não cuốn vào lối sống sùng bái vật chất."
        }
      ]
    }
  ],

  // 6. Speed Blitz (20 questions: 10 from Page 12 Task One + 10 from Page 14 Part B)
  speedBlitz: [
    {
      id: "u3-sb-1",
      questionNumber: 1,
      prompt: "A fatally injured driver:",
      options: [
        { key: "1", text: "pulls through" },
        { key: "2", text: "succumbs to his injuries" },
        { key: "3", text: "walks away unscathed" },
        { key: "4", text: "recovers rapidly" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "pull through", pos: "phr v", vi: "Vượt qua cơn nguy kịch, hồi phục sau bệnh hiểm nghèo" },
        { key: "2", word: "succumb to injuries", pos: "collocation", vi: "Không qua khỏi, tử vong vì vết thương quá nặng (Page 12 Task One)" },
        { key: "3", word: "unscathed", pos: "adj", vi: "Bình yên vô sự, không hề hấn gì" },
        { key: "4", word: "recover rapidly", pos: "phrase", vi: "Hồi phục nhanh chóng" }
      ]
    },
    {
      id: "u3-sb-2",
      questionNumber: 2,
      prompt: "To 'convey' an idea is to:",
      options: [
        { key: "1", text: "prohibit it" },
        { key: "2", text: "conceal it" },
        { key: "3", text: "make it known" },
        { key: "4", text: "distort it" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "prohibit", pos: "v", vi: "Cấm chỉ, ngăn cấm theo luật" },
        { key: "2", word: "conceal", pos: "v", vi: "Che giấu, giấu giếm" },
        { key: "3", word: "make it known", pos: "phrase", vi: "Truyền đạt, làm cho người khác biết và hiểu (convey an idea)" },
        { key: "4", word: "distort", pos: "v", vi: "Bóp méo, xuyên tạc sự thật" }
      ]
    },
    {
      id: "u3-sb-3",
      questionNumber: 3,
      prompt: "A 'boulder' is defined as a:",
      options: [
        { key: "1", text: "small pebble" },
        { key: "2", text: "large rock" },
        { key: "3", text: "brick wall" },
        { key: "4", text: "sand dune" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "small pebble", pos: "n", vi: "Viên sỏi nhỏ" },
        { key: "2", word: "large rock", pos: "n", vi: "Tảng đá tảng lớn (boulder: tảng đá núi to lớn)" },
        { key: "3", word: "brick wall", pos: "n", vi: "Bức tường gạch" },
        { key: "4", word: "sand dune", pos: "n", vi: "Cồn cát sa mạc" }
      ]
    },
    {
      id: "u3-sb-4",
      questionNumber: 4,
      prompt: "The 'infantry' refers to soldiers fighting:",
      options: [
        { key: "1", text: "on horseback" },
        { key: "2", text: "in aircraft" },
        { key: "3", text: "on foot" },
        { key: "4", text: "at naval bases" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "on horseback", pos: "phrase", vi: "Kỵ binh (cavalry: lính cưỡi ngựa)" },
        { key: "2", word: "in aircraft", pos: "phrase", vi: "Không quân (air force)" },
        { key: "3", word: "on foot", pos: "phrase", vi: "Bộ binh (infantry: đội quân chiến đấu đi bộ)" },
        { key: "4", word: "at naval bases", pos: "phrase", vi: "Thủy quân lục chiến (navy/marines)" }
      ]
    },
    {
      id: "u3-sb-5",
      questionNumber: 5,
      prompt: "A 'penitentiary' is a formal term for a:",
      options: [
        { key: "1", text: "mental institution" },
        { key: "2", text: "sanatorium" },
        { key: "3", text: "prison" },
        { key: "4", text: "monastery" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "mental institution", pos: "n", vi: "Viện tâm thần" },
        { key: "2", word: "sanatorium", pos: "n", vi: "Viện điều dưỡng" },
        { key: "3", word: "prison", pos: "n", vi: "Trại giam, nhà tù giam giữ tội phạm (penitentiary)" },
        { key: "4", word: "monastery", pos: "n", vi: "Tu viện dành cho tu sĩ" }
      ]
    },
    {
      id: "u3-sb-6",
      questionNumber: 6,
      prompt: "A 'harsh' punishment is:",
      options: [
        { key: "1", text: "mild" },
        { key: "2", text: "severe" },
        { key: "3", text: "lenient" },
        { key: "4", text: "justified" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "mild", pos: "adj", vi: "Nhẹ nhàng, ôn hòa" },
        { key: "2", word: "severe", pos: "adj", vi: "Khắc nghiệt, nặng nề, nghiêm khắc (harsh = severe)" },
        { key: "3", word: "lenient", pos: "adj", vi: "Khoan hồng, nhân nhượng" },
        { key: "4", word: "justified", pos: "adj", vi: "Hợp lý, chính đáng" }
      ]
    },
    {
      id: "u3-sb-7",
      questionNumber: 7,
      prompt: "When you 'restrain' your anger, you:",
      options: [
        { key: "1", text: "increase it" },
        { key: "2", text: "express it violently" },
        { key: "3", text: "keep it under control" },
        { key: "4", text: "justify it" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "increase it", pos: "phrase", vi: "Làm gia tăng cơn giận" },
        { key: "2", word: "express it violently", pos: "phrase", vi: "Bộc phát cơn giận dữ dội" },
        { key: "3", word: "keep it under control", pos: "phrase", vi: "Kiềm chế, giữ cơn giận trong vòng kiểm soát (restrain anger)" },
        { key: "4", word: "justify it", pos: "phrase", vi: "Bào chữa cho cơn nóng giận" }
      ]
    },
    {
      id: "u3-sb-8",
      questionNumber: 8,
      prompt: "What is described as 'irksome' is:",
      options: [
        { key: "1", text: "exciting" },
        { key: "2", text: "annoying" },
        { key: "3", text: "delightful" },
        { key: "4", text: "fascinating" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "exciting", pos: "adj", vi: "Hào hứng, thú vị" },
        { key: "2", word: "annoying", pos: "adj", vi: "Gây phiền toái, bực mình khó chịu (irksome = annoying)" },
        { key: "3", word: "delightful", pos: "adj", vi: "Thú vị, đáng yêu" },
        { key: "4", word: "fascinating", pos: "adj", vi: "Quyến rũ, hấp dẫn tột cùng" }
      ]
    },
    {
      id: "u3-sb-9",
      questionNumber: 9,
      prompt: "When somebody is taken 'captive', they are taken:",
      options: [
        { key: "1", text: "care of" },
        { key: "2", text: "for granted" },
        { key: "3", text: "prisoner" },
        { key: "4", text: "aback" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "taken care of", pos: "idiom", vi: "Được chăm sóc chu đáo" },
        { key: "2", word: "taken for granted", pos: "idiom", vi: "Bị xem là điều hiển nhiên" },
        { key: "3", word: "taken prisoner", pos: "collocation", vi: "Bị bắt làm tù binh, bị giam cầm (taken captive = taken prisoner)" },
        { key: "4", word: "taken aback", pos: "idiom", vi: "Bị giật mình sửng sốt" }
      ]
    },
    {
      id: "u3-sb-10",
      questionNumber: 10,
      prompt: "When somebody 'drifts' from one job to another, they:",
      options: [
        { key: "1", text: "stay put in the job" },
        { key: "2", text: "often change jobs" },
        { key: "3", text: "earn high promotions" },
        { key: "4", text: "retire early" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "stay put", pos: "idiom", vi: "Ở yên một chỗ, gắn bó lâu dài" },
        { key: "2", word: "often change jobs", pos: "phrase", vi: "Thường xuyên nhảy việc, trôi dạt vô định từ nghề này sang nghề khác" },
        { key: "3", word: "earn promotions", pos: "phrase", vi: "Được thăng chức cao" },
        { key: "4", word: "retire early", pos: "phrase", vi: "Nghỉ hưu sớm" }
      ]
    },
    {
      id: "u3-sb-11",
      questionNumber: 11,
      prompt: "Many poets have ______ the beauties of the countryside.",
      options: [
        { key: "1", text: "extolled" },
        { key: "2", text: "feared" },
        { key: "3", text: "excited" },
        { key: "4", text: "inhibited" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "extolled", pos: "v", vi: "Tán dương, ca tụng hết lời vẻ đẹp đồng quê (extol the beauties)" },
        { key: "2", word: "feared", pos: "v", vi: "Sợ hãi" },
        { key: "3", word: "excited", pos: "v", vi: "Kích thích, khơi dậy" },
        { key: "4", word: "inhibited", pos: "v", vi: "Ức chế, cản trở tự do thể hiện" }
      ]
    },
    {
      id: "u3-sb-12",
      questionNumber: 12,
      prompt: "Hopes of finding the missing climbers are now beginning to ______.",
      options: [
        { key: "1", text: "reduce" },
        { key: "2", text: "faint" },
        { key: "3", text: "dim" },
        { key: "4", text: "fade" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "reduce", pos: "v", vi: "Giảm sút (dùng ngoại động từ)" },
        { key: "2", word: "faint", pos: "v", vi: "Ngất xỉu" },
        { key: "3", word: "dim", pos: "v", vi: "Lờ mờ, tối dần" },
        { key: "4", word: "fade", pos: "collocation", vi: "Tàn lụi, tiêu tan dần (hopes fade: hy vọng vụt tắt)" }
      ]
    },
    {
      id: "u3-sb-13",
      questionNumber: 13,
      prompt: "The team's coach insisted on a program of ______ training before the big game.",
      options: [
        { key: "1", text: "rigorous" },
        { key: "2", text: "slack" },
        { key: "3", text: "severe" },
        { key: "4", text: "positive" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "rigorous", pos: "collocation", vi: "Khắt khe, nghiêm ngặt, rèn luyện bài bản (rigorous training)" },
        { key: "2", word: "slack", pos: "adj", vi: "Uể oải, chểnh mảng" },
        { key: "3", word: "severe", pos: "adj", vi: "Khốc liệt (thường dùng cho thời tiết/hình phạt/bệnh tật)" },
        { key: "4", word: "positive", pos: "adj", vi: "Tích cực" }
      ]
    },
    {
      id: "u3-sb-14",
      questionNumber: 14,
      prompt: "Prices at Greek hotels are still affordable, but in Switzerland they are ______.",
      options: [
        { key: "1", text: "moderate" },
        { key: "2", text: "inaccessible" },
        { key: "3", text: "reasonable" },
        { key: "4", text: "exorbitant" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "moderate", pos: "adj", vi: "Vừa phải, phải chăng" },
        { key: "2", word: "inaccessible", pos: "adj", vi: "Không thể tiếp cận được" },
        { key: "3", word: "reasonable", pos: "adj", vi: "Hợp lý" },
        { key: "4", word: "exorbitant", pos: "adj", vi: "Đắt cắt cổ, cao chót vót vô lý (nói về giá cả khách sạn)" }
      ]
    },
    {
      id: "u3-sb-15",
      questionNumber: 15,
      prompt: "The terrible crash ______ the motorway for several hours.",
      options: [
        { key: "1", text: "prevented" },
        { key: "2", text: "hindered" },
        { key: "3", text: "obstructed" },
        { key: "4", text: "inhibited" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "prevented", pos: "v", vi: "Ngăn chặn (đi với sự việc không xảy ra)" },
        { key: "2", word: "hindered", pos: "v", vi: "Cản trở tiến độ của con người" },
        { key: "3", word: "obstructed", pos: "collocation", vi: "Làm tắc nghẽn, bít lối tuyến đường cao tốc (obstruct the motorway/traffic)" },
        { key: "4", word: "inhibited", pos: "v", vi: "Ức chế tâm lý" }
      ]
    },
    {
      id: "u3-sb-16",
      questionNumber: 16,
      prompt: "After his wife's tragic death, he ______ drinking to numb the grief.",
      options: [
        { key: "1", text: "got to" },
        { key: "2", text: "came to" },
        { key: "3", text: "held to" },
        { key: "4", text: "took to" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "got to", pos: "phr v", vi: "Bắt đầu có cơ hội làm gì" },
        { key: "2", word: "came to", pos: "phr v", vi: "Tỉnh lại sau cơn ngất" },
        { key: "3", word: "held to", pos: "phr v", vi: "Giữ vững nguyên tắc" },
        { key: "4", word: "took to", pos: "idiom", vi: "Bắt đầu hình thành thói quen (xấu) (take to drinking: vùi đầu vào bia rượu)" }
      ]
    },
    {
      id: "u3-sb-17",
      questionNumber: 17,
      prompt: "The plague, otherwise known as the Black Death, was a ______ disease.",
      options: [
        { key: "1", text: "contagious" },
        { key: "2", text: "contiguous" },
        { key: "3", text: "contingent" },
        { key: "4", text: "congenial" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "contagious", pos: "adj", vi: "Bệnh truyền nhiễm, dễ lây lan qua tiếp xúc trực tiếp" },
        { key: "2", word: "contiguous", pos: "adj", vi: "Tiếp giáp, kề bên nhau về địa lý (contiguous states)" },
        { key: "3", word: "contingent", pos: "adj", vi: "Phụ thuộc vào điều kiện ngẫu nhiên (contingent upon)" },
        { key: "4", word: "congenial", pos: "adj", vi: "Hợp tính, thân thiện, dễ mến" }
      ]
    },
    {
      id: "u3-sb-18",
      questionNumber: 18,
      prompt: "The young apprentice felt intensely ______ in the presence of so many distinguished ladies.",
      options: [
        { key: "1", text: "inhospitable" },
        { key: "2", text: "hindered" },
        { key: "3", text: "inhibited" },
        { key: "4", text: "prohibited" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "inhospitable", pos: "adj", vi: "Không hiếu khách, thời tiết khắc nghiệt" },
        { key: "2", word: "hindered", pos: "v", vi: "Bị cản trở tiến độ" },
        { key: "3", word: "inhibited", pos: "collocation", vi: "Cảm thấy e dè, rụt rè, bối rối không tự nhiên (feel inhibited in the presence of)" },
        { key: "4", word: "prohibited", pos: "adj", vi: "Bị luật pháp nghiêm cấm" }
      ]
    },
    {
      id: "u3-sb-19",
      questionNumber: 19,
      prompt: "It was obvious that the child suffered from a serious speech ______.",
      options: [
        { key: "1", text: "handicap" },
        { key: "2", text: "impediment" },
        { key: "3", text: "inhibition" },
        { key: "4", text: "hindrance" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "handicap", pos: "n", vi: "Khuyết tật thể chất chung" },
        { key: "2", word: "speech impediment", pos: "collocation", vi: "Tật nói lắp, tật ngọng bẩm sinh (collocation chuẩn mực: speech impediment)" },
        { key: "3", word: "inhibition", pos: "n", vi: "Sự ức chế tâm lý" },
        { key: "4", word: "hindrance", pos: "n", vi: "Sự cản trở chung" }
      ]
    },
    {
      id: "u3-sb-20",
      questionNumber: 20,
      prompt: "His heavy steel-toe work boots ______ him while trying to run across the muddy site.",
      options: [
        { key: "1", text: "hampered" },
        { key: "2", text: "stemmed" },
        { key: "3", text: "repelled" },
        { key: "4", text: "compelled" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "hampered", pos: "collocation", vi: "Làm vướng víu, cản trở bước chân vận động (hamper movement/running)" },
        { key: "2", word: "stemmed", pos: "v", vi: "Cầm máu, ngăn chặn dòng chảy" },
        { key: "3", word: "repelled", pos: "v", vi: "Đẩy lùi kẻ thù, xua đuổi" },
        { key: "4", word: "compelled", pos: "v", vi: "Bắt buộc, cưỡng bách" }
      ]
    }
  ]
};



export const VOCAB_C1_UNIT_4: VocabC1Unit = {
  unitId: 4,
  title: "Unit 4: Elimination & Nullification",
  subtitle: "The Vocabulary Files - Level C1 (Pages 15-18)",

  // 1. Words in Action (16 words from Page 15 & core C1 vocabulary)
  wordsInAction: [
    {
      id: "u4-wia-1",
      word: "abolish",
      ipa: "/əˈbɒl.ɪʃ/",
      nuance: "[Officially end a system, custom or practice by law]",
      register: "Legal / Historical",
      collocations: ["abolish slavery", "abolish the death penalty", "abolish tariffs", "call to abolish"],
      enDef: "To officially end a law, system, institution, or established custom.",
      viDef: "Bãi bỏ, thủ tiêu (một thể chế, tập tục lâu đời, án tử hình hoặc chế độ nô lệ).",
      example: "Britain officially **abolished** the transatlantic slave trade in the early nineteenth century.",
      targetKeyword: "abolish"
    },
    {
      id: "u4-wia-2",
      word: "repeal",
      ipa: "/rɪˈpiːl/",
      nuance: "[Officially revoke or cancel a legislative Act or law]",
      register: "Parliamentary / Legal",
      collocations: ["repeal a law", "repeal legislation", "repeal an Act", "vote to repeal"],
      enDef: "If a government or parliament repeals a law, it officially states that the law is no longer valid.",
      viDef: "Hủy bỏ, bãi ước một đạo luật hoặc văn bản quy phạm pháp luật (nghị viện/chính phủ thực hiện).",
      example: "The incoming administration immediately campaigned to **repeal** the controversial tax legislation.",
      targetKeyword: "repeal"
    },
    {
      id: "u4-wia-3",
      word: "annul",
      ipa: "/əˈnʌl/",
      nuance: "[Declare formally that a contract or marriage never legally existed]",
      register: "Judicial / Formal",
      collocations: ["annul a marriage", "annul a contract", "annul an agreement", "annul the election results"],
      enDef: "To declare officially that something (such as a marriage or contract) is invalid and legally void.",
      viDef: "Tuyên bố vô hiệu, bãi bỏ tính pháp lý (hợp đồng thương mại, hôn nhân hoặc kết quả bầu cử).",
      example: "The high court granted their petition to **annul** the fraudulent business contract.",
      targetKeyword: "annul"
    },
    {
      id: "u4-wia-4",
      word: "revoke",
      ipa: "/rɪˈvəʊk/",
      nuance: "[Withdraw or take back an official license, permit, or grant]",
      register: "Official / Regulatory",
      collocations: ["revoke a license", "revoke driving privileges", "revoke a passport", "revoke an order"],
      enDef: "To officially take back, cancel, or rescind something granted (such as a license, decree, or order).",
      viDef: "Thu hồi, tước đoạt lại quyền hạn (bằng lái xe, giấy phép hành nghề, hộ chiếu hoặc sắc lệnh).",
      example: "His driving license was permanently **revoked** after multiple dangerous driving convictions.",
      targetKeyword: "revoke"
    },
    {
      id: "u4-wia-5",
      word: "recall",
      ipa: "/rɪˈkɔːl/",
      nuance: "[Summon back a diplomat from abroad or call back defective goods]",
      register: "Diplomatic / Commercial",
      collocations: ["recall an ambassador", "recall a diplomat", "recall defective products", "order a recall"],
      enDef: "To officially order someone (like an ambassador) to return home; to call back flawed goods from the market.",
      viDef: "Triệu hồi (đại sứ ngoại giao về nước khi có biến động) hoặc thu hồi sản phẩm lỗi từ thị trường.",
      example: "The Ministry of Foreign Affairs promptly **recalled** its ambassador after diplomatic ties ruptured.",
      targetKeyword: "recall"
    },
    {
      id: "u4-wia-6",
      word: "eradicate",
      ipa: "/ɪˈræd.ɪ.keɪt/",
      nuance: "[Destroy or wipe out completely by the roots]",
      register: "Public Health / Academic",
      collocations: ["eradicate disease", "eradicate poverty", "eradicate illiteracy", "totally eradicated"],
      enDef: "To get rid of or destroy something bad completely, as if pulling it up by the roots.",
      viDef: "Diệt trừ tận gốc, xóa sổ hoàn toàn (dịch bệnh hiểm nghèo, nạn mù chữ, đói nghèo).",
      example: "Global vaccination campaigns have successfully **eradicated** smallpox across the planet.",
      targetKeyword: "eradicate"
    },
    {
      id: "u4-wia-7",
      word: "exterminate",
      ipa: "/ɪkˈstɜː.mɪ.neɪt/",
      nuance: "[Kill off an entire group of pests, vermin, or living beings]",
      register: "Biological / Severe",
      collocations: ["exterminate pests", "exterminate rats", "exterminate termites", "exterminate populations"],
      enDef: "To kill all the animals, pests, or members of a group completely.",
      viDef: "Tận diệt, tiêu diệt sạch mầm mống (loài gây hại như chuột, gián, mối mọt hoặc một quần thể).",
      example: "The professional pest controller was hired to **exterminate** the extensive termite colony.",
      targetKeyword: "exterminate"
    },
    {
      id: "u4-wia-8",
      word: "annihilate",
      ipa: "/əˈnaɪ.ə.leɪt/",
      nuance: "[Destroy completely with overwhelming military weapons or power]",
      register: "Military / Rhetorical",
      collocations: ["annihilate an army", "annihilate the enemy", "annihilate the human race", "total annihilation"],
      enDef: "To destroy something completely so that nothing is left, especially using bombs or heavy weaponry.",
      viDef: "Hủy diệt hoàn toàn, san phẳng, quét sạch bằng bom đạn hoặc sức mạnh quân sự áp đảo.",
      example: "Nuclear weapons possess sufficient destructive capability to **annihilate** entire metropolises in seconds.",
      targetKeyword: "annihilate"
    },
    {
      id: "u4-wia-9",
      word: "decimate",
      ipa: "/ˈdes.ɪ.meɪt/",
      nuance: "[Drastically destroy a very large proportion of a whole]",
      register: "Formal / Environmental",
      collocations: ["decimate the population", "decimate wildlife", "decimate crops", "severely decimated"],
      enDef: "To destroy, damage, or kill a large proportion of a population, community, or resource.",
      viDef: "Làm suy giảm nghiêm trọng, tàn sát/tiêu hao phần lớn số lượng (dân số, mùa màng, đàn gia súc).",
      example: "Severe droughts and unchecked famine have **decimated** livestock across the pastoral savannah.",
      targetKeyword: "decimate"
    },
    {
      id: "u4-wia-10",
      word: "beseech",
      ipa: "/bɪˈsiːtʃ/",
      nuance: "[Plead or beg earnestly and desperately]",
      register: "Literary / Formal",
      collocations: ["beseech for mercy", "beseech someone to do sth", "earnestly beseech"],
      enDef: "To ask someone for something in an emotional, humble, and urgent way; to plead with.",
      viDef: "Khẩn khoản van xin, cầu xin tha thiết (lòng trắc ẩn, sự khoan dung).",
      example: "The desperate villagers knelt before the governor to **beseech** him for immediate grain aid.",
      targetKeyword: "beseech"
    },
    {
      id: "u4-wia-11",
      word: "succinct",
      ipa: "/səkˈsɪŋkt/",
      nuance: "[Brief, concise and sharply to the point]",
      register: "Academic / Professional",
      collocations: ["succinct summary", "succinct explanation", "succinct account", "keep it succinct"],
      enDef: "Said in a clear, concise, and to-the-point way, without using any unnecessary words.",
      viDef: "Súc tích, ngắn gọn rõ ràng, cô đọng đầy đủ ý mà không thừa thãi.",
      example: "The executive requested a **succinct** two-minute summary of the quarterly financial audit.",
      targetKeyword: "succinct"
    },
    {
      id: "u4-wia-12",
      word: "derogatory",
      ipa: "/dɪˈrɒɡ.ə.tər.i/",
      nuance: "[Disparaging and showing a total lack of respect]",
      register: "Critical / Formal",
      collocations: ["derogatory remark", "derogatory comment", "derogatory term", "highly derogatory"],
      enDef: "Showing strong disapproval and a lack of respect; insulting or disparaging.",
      viDef: "Xúc phạm, miệt thị, mang tính hạ thấp danh dự và thiếu tôn trọng.",
      example: "The panel condemned the politician for uttering openly **derogatory** remarks about immigrants.",
      targetKeyword: "derogatory"
    },
    {
      id: "u4-wia-13",
      word: "prerogative",
      ipa: "/prɪˈrɒɡ.ə.tɪv/",
      nuance: "[Exclusive right or privilege of a specific official or group]",
      register: "Constitutional / Formal",
      collocations: ["royal prerogative", "prime minister's prerogative", "prerogative to decide", "sole prerogative"],
      enDef: "A special right, entitlement, or privilege that belongs exclusively to a person of high rank or power.",
      viDef: "Đặc quyền, đặc lợi độc tôn thuộc về một nguyên thủ hoặc người có chức vụ tối cao.",
      example: "The granting of presidential pardons remains the sovereign **prerogative** of the head of state.",
      targetKeyword: "prerogative"
    },
    {
      id: "u4-wia-14",
      word: "congenital",
      ipa: "/kənˈdʒen.ɪ.təl/",
      nuance: "[Existing from birth (medical) or ingrained chronic trait]",
      register: "Medical / Critical",
      collocations: ["congenital abnormality", "congenital defect", "congenital liar", "congenital disease"],
      enDef: "A medical condition existing since birth; or describing a habitual, deeply ingrained personal trait.",
      viDef: "Bẩm sinh từ lúc chào đời (dị tật y khoa) hoặc thuộc tính thâm căn cố đế (kẻ nói dối bẩm sinh).",
      example: "He is widely known as a **congenital** liar whose promises can never be trusted.",
      targetKeyword: "congenital"
    },
    {
      id: "u4-wia-15",
      word: "wield",
      ipa: "/wiːld/",
      nuance: "[Hold and actively exercise great power, authority or a weapon]",
      register: "Formal / Journalistic",
      collocations: ["wield power", "wield influence", "wield authority", "wield a weapon"],
      enDef: "To hold and use power, authority, or influence effectively; to hold a weapon ready for battle.",
      viDef: "Nắm giữ và thi thố quyền lực, vận dụng ảnh hưởng to lớn hoặc vung vũ khí.",
      example: "Senior media tycoons continue to **wield** an enormous influence over national political debate.",
      targetKeyword: "wield"
    },
    {
      id: "u4-wia-16",
      word: "hitch",
      ipa: "/hɪtʃ/",
      nuance: "[Temporary unforeseen snag or minor problem]",
      register: "Idiomatic / General",
      collocations: ["without a hitch", "technical hitch", "minor hitch", "go off without a hitch"],
      enDef: "A temporary difficulty, snag, or unforeseen minor obstacle.",
      viDef: "Trục trặc nhỏ, sự cố bất ngờ tạm thời (thường dùng trong cụm: 'without a hitch' - suôn sẻ không tì vết).",
      example: "Despite the bad weather, the rocket launch went off smoothly without a single **hitch**.",
      targetKeyword: "hitch"
    }
  ],

  // 2. Word Formation (12 pairs: Adjective to Adverb Transformation with Morphological Rules)
  wordFormation: [
    {
      id: "u4-wf-1",
      adjective: "frequent",
      root: "frequent",
      suffix: "-ly",
      noun: "frequently",
      suffixChoices: ["-ly", "-ally", "-ness", "-ity"],
      meaningVi: "Thường xuyên, xảy ra với tần suất cao (frequent occurrence ➔ occurs frequently)",
      ruleTip: "Quy tắc cơ bản: Thêm hậu tố '-ly' vào tính từ tiêu chuẩn 'frequent' để tạo trạng từ chỉ tần suất 'frequently'."
    },
    {
      id: "u4-wf-2",
      adjective: "remarkable",
      root: "remarkab(le)",
      suffix: "-ly",
      noun: "remarkably",
      suffixChoices: ["-ly", "-ally", "-ity", "-ness"],
      meaningVi: "Một cách phi thường, xuất chúng (remarkable intelligence ➔ remarkably intelligent)",
      ruleTip: "Quy tắc đuôi '-able': Khi chuyển sang trạng từ, bỏ nguyên âm '-e' cuối và thêm '-y' để tạo '-ably' (remarkable ➔ remarkably)."
    },
    {
      id: "u4-wf-3",
      adjective: "full",
      root: "ful(l)",
      suffix: "-ly",
      noun: "fully",
      suffixChoices: ["-ly", "-y", "-ness", "-ity"],
      meaningVi: "Trọn vẹn, hoàn toàn toàn diện (full support ➔ fully support)",
      ruleTip: "Quy tắc gấp đôi phụ âm: Tính từ 'full' khi thêm hậu tố trạng từ chỉ nhận thêm '-y' để giữ cụm 'fully' (không viết ba chữ 'l')."
    },
    {
      id: "u4-wf-4",
      adjective: "possible",
      root: "possib(le)",
      suffix: "-ly",
      noun: "possibly",
      suffixChoices: ["-ly", "-ally", "-ity", "-ness"],
      meaningVi: "Có thể, có khả năng (not possible to sleep ➔ can't possibly sleep)",
      ruleTip: "Quy tắc đuôi '-ible': Tương tự như '-able', tính từ tận cùng '-ible' bỏ 'e' và thêm 'y' để trở thành trạng từ '-ibly' (possibly)."
    },
    {
      id: "u4-wf-5",
      adjective: "serious",
      root: "serious",
      suffix: "-ly",
      noun: "seriously",
      suffixChoices: ["-ly", "-ness", "-ity", "-ally"],
      meaningVi: "Nghiêm trọng, trầm trọng (serious injury ➔ seriously injured)",
      ruleTip: "Gắn hậu tố '-ly' vào sau tính từ kết thúc bằng '-ous' để tạo trạng từ chỉ mức độ nghiêm trọng (seriously injured)."
    },
    {
      id: "u4-wf-6",
      adjective: "absurd",
      root: "absurd",
      suffix: "-ly",
      noun: "absurdly",
      suffixChoices: ["-ly", "-ity", "-ness", "-ally"],
      meaningVi: "Lố bịch, ngớ ngẩn đến nực cười (formality was absurd ➔ absurdly formal)",
      ruleTip: "Tính từ gốc Latinh 'absurd' nhận '-ly' để trở thành trạng từ biến thái mức độ cao (absurdly formal: trang trọng đến nực cười)."
    },
    {
      id: "u4-wf-7",
      adjective: "uncommon",
      root: "uncommon",
      suffix: "-ly",
      noun: "uncommonly",
      suffixChoices: ["-ly", "-ness", "-ity", "-ally"],
      meaningVi: "Khác thường, hiếm thấy một cách xuất sắc (uncommon interest ➔ uncommonly interested)",
      ruleTip: "Hậu tố '-ly' đi với tính từ tiền tố phủ định 'uncommon' tạo trạng từ mức độ trang trọng 'uncommonly' (vô cùng, hiếm thấy)."
    },
    {
      id: "u4-wf-8",
      adjective: "considerable",
      root: "considerab(le)",
      suffix: "-ly",
      noun: "considerably",
      suffixChoices: ["-ly", "-ally", "-ness", "-ity"],
      meaningVi: "Đáng kể, với mức độ rất lớn (considerable rise ➔ risen considerably)",
      ruleTip: "Tính từ đuôi '-able' chuyển thành trạng từ '-ably' khi bổ nghĩa cho động từ xu hướng như 'rise/increase' (risen considerably)."
    },
    {
      id: "u4-wf-9",
      adjective: "congenital",
      root: "congenital",
      suffix: "-ly",
      noun: "congenitally",
      suffixChoices: ["-ally", "-ly", "-ity", "-ness"],
      meaningVi: "Do bẩm sinh, từ thuở lọt lòng (congenital blindness ➔ congenitally blind)",
      ruleTip: "Quy tắc đuôi '-al': Tính từ kết thúc bằng '-al' khi chuyển sang trạng từ phải gấp đôi chữ 'l' thành '-ally' (congenital ➔ congenitally)."
    },
    {
      id: "u4-wf-10",
      adjective: "succinct",
      root: "succinct",
      suffix: "-ly",
      noun: "succinctly",
      suffixChoices: ["-ly", "-ness", "-ity", "-ally"],
      meaningVi: "Một cách súc tích, cô đọng rõ ràng (succinct summary ➔ summarized succinctly)",
      ruleTip: "Hậu tố '-ly' gắn trực tiếp vào tính từ 'succinct' để tạo trạng từ thể cách văn phong học thuật C1 (succinctly)."
    },
    {
      id: "u4-wf-11",
      adjective: "derogatory",
      root: "derogatori(ly)",
      suffix: "-ly",
      noun: "derogatorily",
      suffixChoices: ["-ly", "-ally", "-ness", "-ity"],
      meaningVi: "Một cách xúc phạm, miệt thị (derogatory tone ➔ spoke derogatorily)",
      ruleTip: "Tính từ kết thúc bằng '-y' đổi nguyên âm 'y' thành 'i' trước khi thêm hậu tố trạng từ '-ly' (derogatory ➔ derogatorily)."
    },
    {
      id: "u4-wf-12",
      adjective: "harsh",
      root: "harsh",
      suffix: "-ly",
      noun: "harshly",
      suffixChoices: ["-ly", "-ness", "-ity", "-ally"],
      meaningVi: "Khắc nghiệt, cay độc, tàn nhẫn (harsh criticism ➔ criticized harshly)",
      ruleTip: "Gắn hậu tố '-ly' vào sau tính từ kết thúc bằng âm xuýt '-sh' để tạo trạng từ biểu thị mức độ gay gắt (harshly)."
    }
  ],

  // 3. Confusable Words (6 pairs from Task Two Page 16)
  confusableWords: [
    {
      id: "u4-cw-1",
      wordA: "cute",
      wordB: "acute",
      diffHighlightA: { before: "", highlight: "c", after: "ute" },
      diffHighlightB: { before: "", highlight: "ac", after: "ute" },
      defA: "cute (adj): Duyên dáng, xinh xắn, đáng yêu theo cách dễ mến.",
      defB: "acute (adj): Cực kỳ sắc bén, thính nhạy (acute sense of hearing) hoặc bệnh cấp tính/nghiêm trọng.",
      promptSentence: "Although their vision is poor, bats have an ______ sense of hearing.",
      correctWord: "acute",
      distinctionTip: "ACUTE SENSE OF HEARING là collocation học thuật chỉ thính giác cực kỳ nhạy bén của loài dơi. CUTE mang nghĩa đáng yêu, dễ thương.",
      mnemonic: "ACUTE có tiền tố A- gợi nhớ 'Accurate' (chuẩn xác, sắc sảo từng chi tiết)."
    },
    {
      id: "u4-cw-2",
      wordA: "fierce",
      wordB: "pierce",
      diffHighlightA: { before: "", highlight: "f", after: "ierce" },
      diffHighlightB: { before: "", highlight: "p", after: "ierce" },
      defA: "fierce (adj): Hung dữ, khốc liệt, dữ dội đến nghẹt thở (trận chiến, bão tố).",
      defB: "pierce (v): Đâm xuyên qua, xỏ lỗ, chọc thủng bằng một vật nhọn.",
      promptSentence: "The battle for the ancient fortress was ______.",
      correctWord: "fierce",
      distinctionTip: "FIERCE là tính từ (dữ dội, khốc liệt). PIERCE là động từ (đâm thủng, xỏ lỗ tai). Sau động từ 'was' cần tính từ miêu tả tính chất trận chiến.",
      mnemonic: "FIERCE có chữ F giống 'Fury' (cơn cuồng nộ dữ dội)."
    },
    {
      id: "u4-cw-3",
      wordA: "congenital",
      wordB: "congenial",
      diffHighlightA: { before: "congeni", highlight: "t", after: "al" },
      diffHighlightB: { before: "congeni", highlight: "", after: "al" },
      defA: "congenital (adj): Bẩm sinh (dị tật y khoa có từ lúc sinh) hoặc bản tính kinh niên (congenital liar).",
      defB: "congenial (adj): Hợp tính, tâm đầu ý hợp, dễ chịu hòa hợp với sở thích.",
      promptSentence: "Jack and Mary had a ______ conversation about their future travel plans.",
      correctWord: "congenial",
      distinctionTip: "CONGENIAL CONVERSATION = cuộc trò chuyện tâm đầu ý hợp, thoải mái dễ chịu. CONGENITAL dùng cho bệnh bẩm sinh hoặc tật xấu.",
      mnemonic: "CONGENIAL = 'Genial' (thân thiện, cởi mở) ➔ hòa hợp, hợp gu trò chuyện."
    },
    {
      id: "u4-cw-4",
      wordA: "contagious",
      wordB: "contiguous",
      diffHighlightA: { before: "con", highlight: "tag", after: "ious" },
      diffHighlightB: { before: "con", highlight: "tig", after: "uous" },
      defA: "contagious (adj): Truyền nhiễm qua tiếp xúc cơ thể (bệnh lây lan).",
      defB: "contiguous (adj): Liền kề, tiếp giáp nhau về mặt địa lý không gian.",
      promptSentence: "Washing your hands frequently is the best way to avoid catching ______ illnesses.",
      correctWord: "contagious",
      distinctionTip: "CONTAGIOUS ILLNESSES = các bệnh truyền nhiễm qua chạm tay/tiếp xúc. CONTIGUOUS chỉ các bang/vùng lãnh thổ tiếp giáp nhau.",
      mnemonic: "CONTAGIOUS có cụm 'TAG' (chạm vào người) ➔ lây lan qua tiếp xúc trực tiếp."
    },
    {
      id: "u4-cw-5",
      wordA: "snag",
      wordB: "snug",
      diffHighlightA: { before: "sn", highlight: "a", after: "g" },
      diffHighlightB: { before: "sn", highlight: "u", after: "g" },
      defA: "snag (n): Sự cố bất ngờ, trục trặc nhỏ gây vướng mắc cản trở.",
      defB: "snug (adj): Ấm cúng, vừa vặn dễ chịu, an toàn kín gió.",
      promptSentence: "The elderly couple lived in a small, ______ cottage outside the village.",
      correctWord: "snug",
      distinctionTip: "SNUG là tính từ đứng trước danh từ 'cottage' (ngôi nhà nhỏ ấm cúng). SNAG là danh từ (trục trặc, vướng mắc).",
      mnemonic: "SNUG có chữ U như 'Warm/Cuddle' ➔ ấm cúng, dễ chịu."
    },
    {
      id: "u4-cw-6",
      wordA: "obscene",
      wordB: "obscure",
      diffHighlightA: { before: "obs", highlight: "cene", after: "" },
      diffHighlightB: { before: "obs", highlight: "cure", after: "" },
      defA: "obscene (adj): Tục tĩu, đồi trụy, xúc phạm đạo đức nghiêm trọng.",
      defB: "obscure (adj): Ít người biết tới, lu mờ, khó hiểu, chìm trong bóng tối.",
      promptSentence: "The gallery exhibits masterpieces by Picasso alongside works by more ______ artists.",
      correctWord: "obscure",
      distinctionTip: "OBSCURE ARTISTS = các họa sĩ ít tên tuổi, ít người biết đến (đối lập với Picasso lừng danh). OBSCENE nghĩa là tục tĩu.",
      mnemonic: "OBSCURE bắt nguồn từ bóng tối mịt mờ ➔ ẩn danh, chưa ai biết đến."
    }
  ],

  // 4. Synonym Filter (3 challenge rounds)
  synonymFilter: [
    {
      id: "u4-sf-1",
      targetWord: "ABOLISH & TERMINATE",
      targetMeaning: "Nhóm từ C1 biểu thị hành động BÃI BỎ / THỦ TIÊU / CHẤM DỨT QUY PHẠM",
      note: "Chọn các từ KHÔNG đồng nghĩa để loại bỏ khỏi danh sách",
      targetCategory: "ABOLISH & TERMINATE",
      targetMeaningVi: "Nhóm từ C1 biểu thị hành động BÃI BỎ / THỦ TIÊU / CHẤM DỨT QUY PHẠM",
      words: [
        { word: "abolish", isSynonym: true },
        { word: "repeal", isSynonym: true },
        { word: "annul", isSynonym: true },
        { word: "revoke", isSynonym: true },
        { word: "eradicate", isSynonym: true },
        { word: "annihilate", isSynonym: true },
        { word: "congenial", isSynonym: false },
        { word: "snug", isSynonym: false }
      ]
    },
    {
      id: "u4-sf-2",
      targetWord: "CONCISE & CLEAR",
      targetMeaning: "Nhóm từ biểu thị sự SÚC TÍCH / GỌN GÀNG / RÕ RÀNG KHÔNG DƯ THỪA",
      note: "Chọn các từ KHÔNG đồng nghĩa để loại bỏ khỏi danh sách",
      targetCategory: "CONCISE & CLEAR",
      targetMeaningVi: "Nhóm từ biểu thị sự SÚC TÍCH / GỌN GÀNG / RÕ RÀNG KHÔNG DƯ THỪA",
      words: [
        { word: "succinct", isSynonym: true },
        { word: "concise", isSynonym: true },
        { word: "brief", isSynonym: true },
        { word: "pithy", isSynonym: true },
        { word: "compact", isSynonym: true },
        { word: "terse", isSynonym: true },
        { word: "derogatory", isSynonym: false },
        { word: "obscure", isSynonym: false }
      ]
    },
    {
      id: "u4-sf-3",
      targetWord: "INHERENT & INGRAINED",
      targetMeaning: "Nhóm từ chỉ thuộc tính BẨM SINH / DI TRUYỀN / SÂU TRONG BẢN CHẤT",
      note: "Chọn các từ KHÔNG đồng nghĩa để loại bỏ khỏi danh sách",
      targetCategory: "INHERENT & INGRAINED",
      targetMeaningVi: "Nhóm từ chỉ thuộc tính BẨM SINH / DI TRUYỀN / SÂU TRONG BẢN CHẤT",
      words: [
        { word: "congenital", isSynonym: true },
        { word: "innate", isSynonym: true },
        { word: "inborn", isSynonym: true },
        { word: "inherent", isSynonym: true },
        { word: "hereditary", isSynonym: true },
        { word: "ingrained", isSynonym: true },
        { word: "acute", isSynonym: false },
        { word: "fierce", isSynonym: false }
      ]
    }
  ],

  // 5. Smart Cloze (Page 18 Part A - 10 gaps)
  clozePassages: [
    {
      id: "u4-cp-1",
      title: "The Navajo People: Culture, Tradition, and Beliefs",
      sourceLabel: "Page 18 — Vocabulary Practice Part A",
      passageTemplate: "The Navajo are a peaceful and pastoral people, living by, with and off their flocks of sheep and goats. Though the arid character of their country - good for grazing only - forces them to {{gap_11}} a nomadic life, most of the families have one main home, generally in a well-watered valley, where they raise corn, beans, melons, oats, alfalfa etc. The Navajo women weave the renown Navajo blankets, {{gap_12}} for their durability, beauty and variety of design, and careful execution, whilst a number of men are clever silversmiths, making silver necklaces, belts, bracelets, wristlets, rings and buttons of rare beauty, out of Mexican silver dollars. They have always been self-sufficient. They have little of the sullen, reticent disposition {{gap_13}} to Indians generally, and are cheerful, friendly, hospitable and industrious. Their government is democratic; there is no chief over the whole tribe, and their local chiefs are men of temporary and ill-defined authority, whose power {{gap_14}} largely upon their personal influence, their eloquence and their reputation for wisdom and justice. The tribe is divided into about 58 clans or gentes, grouped under several original or nuclear clans. Marriages with Mexicans, Utes, Apaches, but especially with the neighbouring Pueblo Indians who were captured or enslaved and eventually adopted into the tribe, are responsible for a number of clans. As a {{gap_15}} there is nothing like a pronounced or a prevailing Navajo type. Every variety of form and figure can be found among them. Marriage occurs early in life and polygamy and divorce are prevalent.\nThe elaborate system of pagan worship, expressed in chants, sacrifices, sand painting, dances, ceremonies, some of which last nine days, make the Navajo {{gap_16}} very religious. Though they have no conception of one supreme being, their anthropomorphous deities are numerous and strikingly democratic. The ideas of heaven and hell being unknown to them, they believe in a hereafter {{gap_17}} of a life of happiness with the people of the lower worlds. They are {{gap_18}} believers in their faith system. Diseases are thought to be caused by evil beings, by malign influences of enemies, and by various occult agencies. Their remedies are largely magical and constitute an integral part of their religion. Their superstitions, ceremonies and customs are diligently kept alive by an extraordinarily large number of medicine men who {{gap_19}} a powerful influence among them. Though missionaries have lived among the Navajo since the early 1600s, few Navajo have been {{gap_20}} to Christianity.",
      gaps: [
        {
          gapNumber: 11,
          options: [
            { label: "a", text: "hold" },
            { label: "b", text: "lead" },
            { label: "c", text: "serve" },
            { label: "d", text: "escort" }
          ],
          correctLabel: "b",
          correctWord: "lead",
          targetWord: "lead",
          explanationVi: "lead a nomadic life: sống cuộc đời du mục (collocation chuẩn mực: lead a life)."
        },
        {
          gapNumber: 12,
          options: [
            { label: "a", text: "notorious" },
            { label: "b", text: "famous" },
            { label: "c", text: "conspicuous" },
            { label: "d", text: "obscure" }
          ],
          correctLabel: "b",
          correctWord: "famous",
          targetWord: "famous",
          explanationVi: "famous for their durability: nổi tiếng vì độ bền và vẻ đẹp tinh xảo (notorious mang nghĩa tai tiếng tiêu cực)."
        },
        {
          gapNumber: 13,
          options: [
            { label: "a", text: "attributed" },
            { label: "b", text: "contributed" },
            { label: "c", text: "donated" },
            { label: "d", text: "blamed" }
          ],
          correctLabel: "a",
          correctWord: "attributed",
          targetWord: "attributed",
          explanationVi: "attributed to Indians generally: được quy cho/gán cho người da đỏ nói chung (be attributed to sb)."
        },
        {
          gapNumber: 14,
          options: [
            { label: "a", text: "reckons" },
            { label: "b", text: "determines" },
            { label: "c", text: "trusts" },
            { label: "d", text: "depends" }
          ],
          correctLabel: "d",
          correctWord: "depends",
          targetWord: "depends",
          explanationVi: "depends largely upon: phụ thuộc phần lớn vào uy tín và tài hùng biện cá nhân."
        },
        {
          gapNumber: 15,
          options: [
            { label: "a", text: "connection" },
            { label: "b", text: "sequel" },
            { label: "c", text: "consequence" },
            { label: "d", text: "condition" }
          ],
          correctLabel: "c",
          correctWord: "consequence",
          targetWord: "consequence",
          explanationVi: "As a consequence: kết quả là, do đó (liên từ nguyên nhân - kết quả)."
        },
        {
          gapNumber: 16,
          options: [
            { label: "a", text: "assume" },
            { label: "b", text: "arise" },
            { label: "c", text: "appear" },
            { label: "d", text: "apply" }
          ],
          correctLabel: "c",
          correctWord: "appear",
          targetWord: "appear",
          explanationVi: "make the Navajo appear very religious: làm cho người Navajo biểu hiện ra vẻ hết sức sùng đạo."
        },
        {
          gapNumber: 17,
          options: [
            { label: "a", text: "containing" },
            { label: "b", text: "incorporating" },
            { label: "c", text: "blending" },
            { label: "d", text: "consisting" }
          ],
          correctLabel: "d",
          correctWord: "consisting",
          targetWord: "consisting",
          explanationVi: "consisting of a life of happiness: bao gồm/cấu thành bởi cuộc sống hạnh phúc (consist of sth)."
        },
        {
          gapNumber: 18,
          options: [
            { label: "a", text: "flimsy" },
            { label: "b", text: "firm" },
            { label: "c", text: "drastic" },
            { label: "d", text: "obstinate" }
          ],
          correctLabel: "b",
          correctWord: "firm",
          targetWord: "firm",
          explanationVi: "firm believers: những tín đồ kiên định, có đức tin vững chắc vào tín ngưỡng."
        },
        {
          gapNumber: 19,
          options: [
            { label: "a", text: "wield" },
            { label: "b", text: "hang" },
            { label: "c", text: "fetch" },
            { label: "d", text: "process" }
          ],
          correctLabel: "a",
          correctWord: "wield",
          targetWord: "wield",
          explanationVi: "wield a powerful influence: nắm giữ và tác động một ảnh hưởng to lớn (collocation C1 đỉnh cao)."
        },
        {
          gapNumber: 20,
          options: [
            { label: "a", text: "converted" },
            { label: "b", text: "exchanged" },
            { label: "c", text: "confessed" },
            { label: "d", text: "modified" }
          ],
          correctLabel: "a",
          correctWord: "converted",
          targetWord: "converted",
          explanationVi: "converted to Christianity: cải đạo / quy y sang Kitô giáo (convert to a religion)."
        }
      ]
    }
  ],

  // 6. Speed Blitz (20 questions: 10 from Page 16 Task One + 10 from Page 18 Part B)
  speedBlitz: [
    {
      id: "u4-sb-1",
      questionNumber: 1,
      prompt: "Another synonym for 'beseech' is:",
      options: [
        { key: "1", text: "solicit" },
        { key: "2", text: "elicit" },
        { key: "3", text: "banish" },
        { key: "4", text: "scorn" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "solicit", pos: "v", vi: "Khẩn cầu, nài xin tha thiết (đồng nghĩa với beseech - Page 16 Task One)" },
        { key: "2", word: "elicit", pos: "v", vi: "Khêu gợi, gợi ra câu trả lời hoặc phản ứng" },
        { key: "3", word: "banish", pos: "v", vi: "Trục xuất, đày ải khỏi bờ cõi" },
        { key: "4", word: "scorn", pos: "v", vi: "Khinh bỉ, coi thường" }
      ]
    },
    {
      id: "u4-sb-2",
      questionNumber: 2,
      prompt: "A person going about in the 'nude':",
      options: [
        { key: "1", text: "has his clothes on" },
        { key: "2", text: "has no clothes on" },
        { key: "3", text: "wears armor" },
        { key: "4", text: "wears formal attire" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "has clothes on", pos: "phrase", vi: "Đang mặc quần áo đầy đủ" },
        { key: "2", word: "has no clothes on", pos: "phrase", vi: "Không mặc bất cứ quần áo gì, khỏa thân hoàn toàn (nude)" },
        { key: "3", word: "wears armor", pos: "phrase", vi: "Mặc áo giáp sắt" },
        { key: "4", word: "formal attire", pos: "n", vi: "Lễ phục trang trọng" }
      ]
    },
    {
      id: "u4-sb-3",
      questionNumber: 3,
      prompt: "A 'mere' detail is defined as:",
      options: [
        { key: "1", text: "an essential one" },
        { key: "2", text: "a decisive factor" },
        { key: "3", text: "an unimportant one" },
        { key: "4", text: "a catastrophic flaw" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "essential", pos: "adj", vi: "Cốt yếu, trọng đại" },
        { key: "2", word: "decisive factor", pos: "n", vi: "Yếu tố quyết định" },
        { key: "3", word: "unimportant one", pos: "phrase", vi: "Một chi tiết nhỏ bé, vụn vặt không đáng kể (mere detail)" },
        { key: "4", word: "catastrophic flaw", pos: "n", vi: "Lỗ hổng thảm khốc" }
      ]
    },
    {
      id: "u4-sb-4",
      questionNumber: 4,
      prompt: "A 'derogatory' remark is one that:",
      options: [
        { key: "1", text: "shows respect" },
        { key: "2", text: "shows no respect" },
        { key: "3", text: "praises achievements" },
        { key: "4", text: "remains neutral" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "shows respect", pos: "phrase", vi: "Bày tỏ sự kính trọng" },
        { key: "2", word: "shows no respect", pos: "phrase", vi: "Xúc phạm, tỏ thái độ miệt thị và thiếu tôn trọng (derogatory = disrespectful)" },
        { key: "3", word: "praises", pos: "v", vi: "Khen ngợi" },
        { key: "4", word: "neutral", pos: "adj", vi: "Trung lập" }
      ]
    },
    {
      id: "u4-sb-5",
      questionNumber: 5,
      prompt: "When a contract or marriage is 'nullified', it is declared:",
      options: [
        { key: "1", text: "valid" },
        { key: "2", text: "invalid" },
        { key: "3", text: "profitable" },
        { key: "4", text: "prolonged" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "valid", pos: "adj", vi: "Có hiệu lực pháp lý" },
        { key: "2", word: "invalid", pos: "adj", vi: "Vô hiệu, không còn giá trị pháp lý (nullified = declared invalid)" },
        { key: "3", word: "profitable", pos: "adj", vi: "Sinh lời" },
        { key: "4", word: "prolonged", pos: "adj", vi: "Kéo dài hạn" }
      ]
    },
    {
      id: "u4-sb-6",
      questionNumber: 6,
      prompt: "In a medical context, an 'invalid' refers to a:",
      options: [
        { key: "1", text: "healthy athlete" },
        { key: "2", text: "cripple or disabled person" },
        { key: "3", text: "licensed surgeon" },
        { key: "4", text: "pharmacist" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "healthy athlete", pos: "n", vi: "Vận động viên khỏe mạnh" },
        { key: "2", word: "cripple / disabled", pos: "n", vi: "Người tàn tật, người ốm yếu kinh niên cần chăm sóc (invalid / ˈɪn.və.lɪd/)" },
        { key: "3", word: "surgeon", pos: "n", vi: "Bác sĩ phẫu thuật" },
        { key: "4", word: "pharmacist", pos: "n", vi: "Dược sĩ" }
      ]
    },
    {
      id: "u4-sb-7",
      questionNumber: 7,
      prompt: "A 'lawsuit' is legally defined as a:",
      options: [
        { key: "1", text: "new suit of clothes" },
        { key: "2", text: "police badge" },
        { key: "3", text: "court case" },
        { key: "4", text: "legal degree" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "suit of clothes", pos: "n", vi: "Bộ trang phục âu phục" },
        { key: "2", word: "police badge", pos: "n", vi: "Huy hiệu cảnh sát" },
        { key: "3", word: "court case", pos: "n", vi: "Vụ kiện tụng trước tòa án (lawsuit = court case)" },
        { key: "4", word: "legal degree", pos: "n", vi: "Bằng cấp luật" }
      ]
    },
    {
      id: "u4-sb-8",
      questionNumber: 8,
      prompt: "To 'banish' somebody is to:",
      options: [
        { key: "1", text: "praise him" },
        { key: "2", text: "exile him" },
        { key: "3", text: "reward him" },
        { key: "4", text: "promote him" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "praise", pos: "v", vi: "Khen ngợi" },
        { key: "2", word: "exile", pos: "v", vi: "Trục xuất, phát vãng, đày ải ra khỏi đất nước (banish = exile)" },
        { key: "3", word: "reward", pos: "v", vi: "Ban thưởng" },
        { key: "4", word: "promote", pos: "v", vi: "Thăng chức" }
      ]
    },
    {
      id: "u4-sb-9",
      questionNumber: 9,
      prompt: "An accurate and 'succinct' account is:",
      options: [
        { key: "1", text: "lengthy" },
        { key: "2", text: "brief and concise" },
        { key: "3", text: "convoluted" },
        { key: "4", text: "exaggerated" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "lengthy", pos: "adj", vi: "Dài dòng, lê thê" },
        { key: "2", word: "brief", pos: "adj", vi: "Ngắn gọn, súc tích (succinct = brief and to the point)" },
        { key: "3", word: "convoluted", pos: "adj", vi: "Rối rắm, quanh co" },
        { key: "4", word: "exaggerated", pos: "adj", vi: "Phóng đại, thổi phồng" }
      ]
    },
    {
      id: "u4-sb-10",
      questionNumber: 10,
      prompt: "A 'divine' beauty is considered:",
      options: [
        { key: "1", text: "ordinary" },
        { key: "2", text: "extraordinary" },
        { key: "3", text: "grotesque" },
        { key: "4", text: "artificial" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "ordinary", pos: "adj", vi: "Tầm thường, bình thường" },
        { key: "2", word: "extraordinary", pos: "adj", vi: "Tuyệt mỹ, phi thường tựa thần thánh (divine beauty = extraordinary)" },
        { key: "3", word: "grotesque", pos: "adj", vi: "Kỳ quái, dị hợm" },
        { key: "4", word: "artificial", pos: "adj", vi: "Nhân tạo" }
      ]
    },
    {
      id: "u4-sb-11",
      questionNumber: 11,
      prompt: "Children under the age of 16 are not ______ to enter the championship competition.",
      options: [
        { key: "1", text: "eligible" },
        { key: "2", text: "enabled" },
        { key: "3", text: "legible" },
        { key: "4", text: "promised" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "eligible", pos: "adj", vi: "Đủ tư cách, đạt điều kiện tiêu chuẩn tham dự (eligible to enter)" },
        { key: "2", word: "enabled", pos: "v", vi: "Được kích hoạt" },
        { key: "3", word: "legible", pos: "adj", vi: "Chữ viết rõ ràng dễ đọc" },
        { key: "4", word: "promised", pos: "v", vi: "Được hứa hẹn" }
      ]
    },
    {
      id: "u4-sb-12",
      questionNumber: 12,
      prompt: "The speeding driver's attention was ______ by a stray dog darting across the road.",
      options: [
        { key: "1", text: "deterred" },
        { key: "2", text: "disturbed" },
        { key: "3", text: "distracted" },
        { key: "4", text: "destroyed" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "deterred", pos: "v", vi: "Bị ngăn chặn, chùn bước" },
        { key: "2", word: "disturbed", pos: "v", vi: "Bị quấy rầy, xáo trộn" },
        { key: "3", word: "distracted", pos: "collocation", vi: "Bị phân tâm, sao lãng sự chú ý (attention was distracted)" },
        { key: "4", word: "destroyed", pos: "v", vi: "Bị phá hủy hoàn toàn" }
      ]
    },
    {
      id: "u4-sb-13",
      questionNumber: 13,
      prompt: "He has told so many deceptive lies that we no longer place any ______ on what he says.",
      options: [
        { key: "1", text: "conviction" },
        { key: "2", text: "reliance" },
        { key: "3", text: "prediction" },
        { key: "4", text: "reputation" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "conviction", pos: "n", vi: "Sự kết án hoặc niềm tin mãnh liệt" },
        { key: "2", word: "reliance", pos: "collocation", vi: "Đặt niềm tin cậy (collocation: place reliance on sth)" },
        { key: "3", word: "prediction", pos: "n", vi: "Lời dự đoán" },
        { key: "4", word: "reputation", pos: "n", vi: "Danh tiếng" }
      ]
    },
    {
      id: "u4-sb-14",
      questionNumber: 14,
      prompt: "His commercial driving license has been ______ on the serious grounds of drink driving.",
      options: [
        { key: "1", text: "repealed" },
        { key: "2", text: "revoked" },
        { key: "3", text: "nullified" },
        { key: "4", text: "recalled" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "repealed", pos: "v", vi: "Bãi bỏ (đạo luật của nghị viện)" },
        { key: "2", word: "revoked", pos: "collocation", vi: "Tước đoạt, thu hồi bằng lái xe chính thức (license is revoked)" },
        { key: "3", word: "nullified", pos: "v", vi: "Hủy bỏ tính pháp lý (hợp đồng, hôn nhân)" },
        { key: "4", word: "recalled", pos: "v", vi: "Triệu hồi (đại sứ hoặc sản phẩm lỗi)" }
      ]
    },
    {
      id: "u4-sb-15",
      questionNumber: 15,
      prompt: "The new party declared their firm intention of ______ the controversial Act once in power.",
      options: [
        { key: "1", text: "repulsing" },
        { key: "2", text: "repelling" },
        { key: "3", text: "impelling" },
        { key: "4", text: "repealing" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "repulsing", pos: "v", vi: "Đẩy lùi cuộc tấn công" },
        { key: "2", word: "repelling", pos: "v", vi: "Khước từ, xua đuổi" },
        { key: "3", word: "impelling", pos: "v", vi: "Thúc đẩy, ép buộc" },
        { key: "4", word: "repealing", pos: "collocation", vi: "Hủy bỏ đạo luật (repealing an Act / law)" }
      ]
    },
    {
      id: "u4-sb-16",
      questionNumber: 16,
      prompt: "Through strict policing and education, the issue of petty theft has largely been ______.",
      options: [
        { key: "1", text: "annihilated" },
        { key: "2", text: "exterminated" },
        { key: "3", text: "eradicated" },
        { key: "4", text: "decimated" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "annihilated", pos: "v", vi: "San phẳng bằng bom đạn quân sự" },
        { key: "2", word: "exterminated", pos: "v", vi: "Tận diệt côn trùng, sâu bọ, chuột bọ" },
        { key: "3", word: "eradicated", pos: "collocation", vi: "Xóa bỏ, triệt tiêu tận gốc tệ nạn/dịch bệnh (crime is eradicated)" },
        { key: "4", word: "decimated", pos: "v", vi: "Làm hao mòn, suy giảm lượng lớn" }
      ]
    },
    {
      id: "u4-sb-17",
      questionNumber: 17,
      prompt: "Microscopic bacteria cannot be seen by the ______ eye; you must utilize a microscope.",
      options: [
        { key: "1", text: "nude" },
        { key: "2", text: "naked" },
        { key: "3", text: "bare" },
        { key: "4", text: "mere" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "nude", pos: "adj", vi: "Khỏa thân, không mặc đồ" },
        { key: "2", word: "naked eye", pos: "idiom", vi: "Mắt trần, không dùng kính hiển vi hay kính thiên văn (naked eye)" },
        { key: "3", word: "bare", pos: "adj", vi: "Trần trụi, chân đất (bare feet)" },
        { key: "4", word: "mere", pos: "adj", vi: "Chỉ là, đơn thuần" }
      ]
    },
    {
      id: "u4-sb-18",
      questionNumber: 18,
      prompt: "Mary is a ______ liar who was even arrested for testifying falsely to a sworn officer.",
      options: [
        { key: "1", text: "physical" },
        { key: "2", text: "congenital" },
        { key: "3", text: "naive" },
        { key: "4", text: "abnormal" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "physical", pos: "adj", vi: "Thuộc về thể chất" },
        { key: "2", word: "congenital", pos: "collocation", vi: "Kẻ nói dối bẩm sinh, kinh niên thành tật khó sửa (congenital liar)" },
        { key: "3", word: "naive", pos: "adj", vi: "Ngây thơ, khờ dại" },
        { key: "4", word: "abnormal", pos: "adj", vi: "Bất thường" }
      ]
    },
    {
      id: "u4-sb-19",
      questionNumber: 19,
      prompt: "Fortunately, the international summit went off completely without a single ______.",
      options: [
        { key: "1", text: "hope" },
        { key: "2", text: "solution" },
        { key: "3", text: "alternative" },
        { key: "4", text: "hitch" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "hope", pos: "n", vi: "Hy vọng" },
        { key: "2", word: "solution", pos: "n", vi: "Giải pháp" },
        { key: "3", word: "alternative", pos: "n", vi: "Phương án thay thế" },
        { key: "4", word: "without a hitch", pos: "idiom", vi: "Trôi chảy, suôn sẻ không gặp bất cứ trục trặc nào (without a hitch)" }
      ]
    },
    {
      id: "u4-sb-20",
      questionNumber: 20,
      prompt: "The Prime Minister will decide whether to pardon the prisoner; that is strictly his ______.",
      options: [
        { key: "1", text: "prerogative" },
        { key: "2", text: "derogatory" },
        { key: "3", text: "abdication" },
        { key: "4", text: "humanity" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "prerogative", pos: "n", vi: "Đặc quyền, quyền hạn tối cao duy nhất của nguyên thủ (that's his prerogative)" },
        { key: "2", word: "derogatory", pos: "adj", vi: "Xúc phạm, miệt thị" },
        { key: "3", word: "abdication", pos: "n", vi: "Sự thoái vị, từ bỏ ngai vàng" },
        { key: "4", word: "humanity", pos: "n", vi: "Lòng nhân ái, nhân loại" }
      ]
    }
  ]
};


export const VOCAB_C1_UNIT_5: VocabC1Unit = {
  unitId: 5,
  title: "Unit 5: Sharpness & Severity",
  subtitle: "The Vocabulary Files - Level C1 (Pages 19-22)",

  // 1. Words in Action (16 words from Page 19 & key C1 vocabulary)
  wordsInAction: [
    {
      id: "u5-wia-1",
      word: "acid",
      ipa: "/ˈæs.ɪd/",
      nuance: "[Bitterly sharp, stinging and unkind in tone]",
      register: "Literary / Descriptive",
      collocations: ["acid wit", "acid humor", "acid tongue", "acid remarks"],
      enDef: "Used to describe a remark, tone, or sense of humor that is unkind, sharp, and highly critical.",
      viDef: "Chua cay, cay độc, châm chọc sâu cay (nói về giọng điệu, lời nhận xét hoặc khiếu hài hước).",
      example: "His **acid** humor often left younger colleagues feeling humiliated rather than amused.",
      targetKeyword: "acid"
    },
    {
      id: "u5-wia-2",
      word: "sour",
      ipa: "/saʊər/",
      nuance: "[Morose, bad-tempered, and sullen in disposition]",
      register: "General / Descriptive",
      collocations: ["sour mood", "sour expression", "sour face", "turn sour"],
      enDef: "Having or showing an irritable, morose, unfriendly, or bad-tempered disposition.",
      viDef: "Cau có, khó đăm đăm, ủ dột bực bội (nét mặt, tâm trạng khó ở).",
      example: "The weary dean entered the lecture hall in an unmistakably **sour** mood.",
      targetKeyword: "sour"
    },
    {
      id: "u5-wia-3",
      word: "bitter",
      ipa: "/ˈbɪt.ər/",
      nuance: "[Deeply resentful disappointment or biting cold weather]",
      register: "Core / Emotive",
      collocations: ["bitter disappointment", "bitter wind", "bitter dispute", "bitter tears"],
      enDef: "Feeling profound anger and hurt because of bad experiences; or intensely, freezing cold.",
      viDef: "Cay đắng, ngậm ngùi thất vọng hoặc (gió rét) buốt giá căm căm.",
      example: "Failing the bar exam by a single point was a **bitter** disappointment for the law student.",
      targetKeyword: "bitter"
    },
    {
      id: "u5-wia-4",
      word: "caustic",
      ipa: "/ˈkɔː.stɪk/",
      nuance: "[Sarcastic in a scathing, burning, destructive way]",
      register: "Intellectual / Critical",
      collocations: ["caustic wit", "caustic comments", "caustic remark", "caustic tongue"],
      enDef: "Describing speech or criticism that is extremely sarcastic, biting, and capable of burning hurt.",
      viDef: "Châm chọc cay độc, xỉa xói cay nghiệt (ví như chất ăn mòn da thịt).",
      example: "The critic was notorious for his **caustic** wit, tearing down amateur playwrights without mercy.",
      targetKeyword: "caustic"
    },
    {
      id: "u5-wia-5",
      word: "tart",
      ipa: "/tɑːt/",
      nuance: "[Sharp, snappy and stinging in reply]",
      register: "General / Stylistic",
      collocations: ["tart reply", "tart remark", "tart tongue", "tart response"],
      enDef: "Quick, sharp, and slightly stinging or unkind in manner of speech.",
      viDef: "Chát chúa, đanh đá, sắc nhọn (câu đáp trả cộc lốc, không nể nang).",
      example: "'If you listened the first time, I wouldn't have to repeat myself,' came her **tart** reply.",
      targetKeyword: "tart"
    },
    {
      id: "u5-wia-6",
      word: "harsh",
      ipa: "/hɑːʃ/",
      nuance: "[Severe, cruel, unpleasantly abrasive and unfeeling]",
      register: "General / Severe",
      collocations: ["harsh punishment", "harsh reality", "harsh criticism", "harsh climate"],
      enDef: "Unpleasantly severe, cruel, rigorous, or abrasive to the senses and emotions.",
      viDef: "Khắc nghiệt, tàn nhẫn, nhẫn tâm (hình phạt, sự thật phũ phàng hoặc khí hậu).",
      example: "Studies confirm that overly **harsh** corporal punishment is counterproductive to child development.",
      targetKeyword: "harsh"
    },
    {
      id: "u5-wia-7",
      word: "cutting",
      ipa: "/ˈkʌt.ɪŋ/",
      nuance: "[Deliberately hurtful, piercing through one's emotional defenses]",
      register: "Literary / Descriptive",
      collocations: ["cutting irony", "cutting remark", "cutting comment", "cutting words"],
      enDef: "Said in a way that is intended to injure feelings deeply and painfully.",
      viDef: "Sắc như dao cứa, xúc phạm đau nhói vào lòng tự ái.",
      example: "Josh's **cutting** irony was simply a cowardly mechanism to mask his deep insecurity.",
      targetKeyword: "cutting"
    },
    {
      id: "u5-wia-8",
      word: "biting",
      ipa: "/ˈbaɪ.tɪŋ/",
      nuance: "[Sharply critical and driven by palpable malice or contempt]",
      register: "Formal / Journalistic",
      collocations: ["biting sarcasm", "biting satire", "biting criticism", "biting cold"],
      enDef: "Having a sharply unpleasant or wounding effect, motivated by strong dislike or contempt.",
      viDef: "Châm chích cay độc, châm biếm sâu cay (mang tính đả kích ác ý).",
      example: "Her **biting** sarcasm left the entire boardroom in uncomfortable silence.",
      targetKeyword: "biting"
    },
    {
      id: "u5-wia-9",
      word: "subjugate",
      ipa: "/ˈsʌb.dʒʊ.ɡeɪt/",
      nuance: "[Defeat and bring under total tyrannical control or slavery]",
      register: "Historical / Political",
      collocations: ["subjugate the population", "subjugate indigenous tribes", "subjugate a nation"],
      enDef: "To defeat a person, group, or nation and force them under total political or military control.",
      viDef: "Khuất phục, nô dịch hóa, đè đầu cưỡi cổ dưới ách cai trị.",
      example: "The empire deployed legions to brutally **subjugate** the rebellious northern territories.",
      targetKeyword: "subjugate"
    },
    {
      id: "u5-wia-10",
      word: "supersede",
      ipa: "/ˌsuː.pəˈsiːd/",
      nuance: "[Replace an outdated or obsolete system/tool with a newer one]",
      register: "Academic / Technical",
      collocations: ["superseded by technology", "supersede the old law", "largely superseded"],
      enDef: "To replace something older, less efficient, or obsolete with a newer, superior version.",
      viDef: "Thay thế, thế chỗ (cái mới ưu việt hơn ra đời thay thế cái cũ kỹ, lỗi thời).",
      example: "Traditional combustion engines are gradually being **superseded** by electric powertrains.",
      targetKeyword: "supersede"
    },
    {
      id: "u5-wia-11",
      word: "feud",
      ipa: "/fjuːd/",
      nuance: "[Long-standing, bitter mutual hostility and fighting between families/parties]",
      register: "Literary / Journalistic",
      collocations: ["family feud", "ancient feud", "bitter feud", "long-standing feud"],
      enDef: "An angry, bitter, and long-standing quarrel or dispute between two people, families, or groups.",
      viDef: "Mối thâm thù, mối huyết thù truyền kiếp (hận thù âm ỉ dai dẳng giữa hai gia tộc/phe phái).",
      example: "A deadly **feud** between the rival merchant dynasties had raged for over three generations.",
      targetKeyword: "feud"
    },
    {
      id: "u5-wia-12",
      word: "stringent",
      ipa: "/ˈstrɪn.dʒənt/",
      nuance: "[Extremely tight, rigorous, and strictly enforced (laws/criteria)]",
      register: "Legal / Regulatory",
      collocations: ["stringent requirements", "stringent regulations", "stringent safety laws", "stringent testing"],
      enDef: "(Of rules, regulations, or financial conditions) extremely strict, severe, and strictly enforced.",
      viDef: "Nghiêm ngặt, thắt chặt, khắt khe (tiêu chuẩn an toàn, quy định tuyển dụng hoặc luật pháp).",
      example: "Pharmaceutical laboratories must adhere to exceptionally **stringent** sterility protocols.",
      targetKeyword: "stringent"
    },
    {
      id: "u5-wia-13",
      word: "encroach",
      ipa: "/ɪnˈkrəʊtʃ/",
      nuance: "[Gradually and stealthily intrude beyond rightful limits]",
      register: "Environmental / Legal",
      collocations: ["encroach on rights", "encroach on green belt", "encroach upon land", "slowly encroaching"],
      enDef: "To gradually take away someone's rights, or take over land or space beyond legitimate limits.",
      viDef: "Lấn chiếm, xâm lấn dần dần (đất đai bảo tồn, vành đai xanh hoặc quyền hạn người khác).",
      example: "Unregulated urban sprawl has begun to **encroach** alarmingly upon the ancient woodland reserve.",
      targetKeyword: "encroach"
    },
    {
      id: "u5-wia-14",
      word: "elicit",
      ipa: "/iˈlɪs.ɪt/",
      nuance: "[Manage to draw forth facts, information or emotional response]",
      register: "Investigative / Formal",
      collocations: ["elicit information", "elicit a response", "elicit sympathy", "fail to elicit"],
      enDef: "To succeed in drawing forth information, facts, or a reaction from someone, often with effort.",
      viDef: "Gợi ra, moi được thông tin hoặc khêu gợi phản ứng cảm xúc từ người khác.",
      example: "Despite hours of forensic questioning, the detectives failed to **elicit** any vital confession.",
      targetKeyword: "elicit"
    },
    {
      id: "u5-wia-15",
      word: "renown",
      ipa: "/rɪˈnaʊn/",
      nuance: "[Widespread fame, high acclaim and honored reputation]",
      register: "Formal / Honors",
      collocations: ["international renown", "win renown", "achieve renown", "of great renown"],
      enDef: "The state of being widely famous, celebrated, admired, and respected for exceptional achievements.",
      viDef: "Danh tiếng lẫy lừng, tiếng tăm vang dội (được xã hội tôn vinh ngưỡng mộ).",
      example: "Her stellar **renown** as a master surgeon attracted patients from across the globe.",
      targetKeyword: "renown"
    },
    {
      id: "u5-wia-16",
      word: "cherish",
      ipa: "/ˈtʃer.ɪʃ/",
      nuance: "[Nurture lovingly or hold dearly in mind (hope, memory, illusion)]",
      register: "Emotive / Literary",
      collocations: ["cherish a memory", "cherish an illusion", "cherish a hope", "cherish dearly"],
      enDef: "To hold an idea, hope, dream, or person dear to your heart and protect them tenderly.",
      viDef: "Nâng niu, ấp ủ, tha thiết nuôi dưỡng (kỷ niệm, niềm hy vọng hoặc ảo tưởng trong lòng).",
      example: "He obstinately **cherishes** the naive illusion that fortune will come without industrious toil.",
      targetKeyword: "cherish"
    }
  ],

  // 2. Word Formation (12 pairs from Page 21 Task Three)
  wordFormation: [
    {
      id: "u5-wf-1",
      adjective: "dispose (verb)",
      root: "dispos(e)",
      suffix: "-al",
      noun: "disposal",
      suffixChoices: ["-al", "-ment", "-ion", "-ure"],
      meaningVi: "Sự vứt bỏ, xử lý và tiêu hủy (disposal of nuclear waste)",
      ruleTip: "Quy tắc hậu tố '-al' cho động từ: Nhiều động từ gốc Latinh tận cùng '-ose' bỏ 'e' thêm '-al' tạo danh từ chỉ hành động xử lý (dispose ➔ disposal, propose ➔ proposal)."
    },
    {
      id: "u5-wf-2",
      adjective: "devoted",
      root: "devot(ed)",
      suffix: "-ion",
      noun: "devotion",
      suffixChoices: ["-ion", "-ment", "-ence", "-ity"],
      meaningVi: "Lòng tận tụy, sự hiến dâng hết lòng (devotion to his wife)",
      ruleTip: "Tính từ phân từ 'devoted' (gốc động từ 'devote') nhận hậu tố '-ion' (bỏ '-ed') để tạo danh từ trừu tượng chỉ phẩm chất chung thủy, tận tụy (devotion)."
    },
    {
      id: "u5-wf-3",
      adjective: "inadequate",
      root: "inadequa(te)",
      suffix: "-cy",
      noun: "inadequacy",
      suffixChoices: ["-cy", "-ness", "-tion", "-ment"],
      meaningVi: "Sự thiếu thốn, tính bất cập không thỏa đáng (inadequacy of supplies)",
      ruleTip: "Quy tắc đuôi '-ate': Tính từ tận cùng bằng '-ate' chuyển sang danh từ phẩm chất bằng cách thay thế '-te' bằng '-cy' (inadequate ➔ inadequacy, accurate ➔ accuracy)."
    },
    {
      id: "u5-wf-4",
      adjective: "insane",
      root: "insan(e)",
      suffix: "-ity",
      noun: "insanity",
      suffixChoices: ["-ity", "-ness", "-ment", "-ance"],
      meaningVi: "Sự điên rồ, trạng thái mất trí (insanity of the notion)",
      ruleTip: "Quy tắc hậu tố '-ity': Tính từ kết thúc bằng '-ane' bỏ 'e' và thêm '-ity' (insane ➔ insanity: sự điên khùng, phi lý trí)."
    },
    {
      id: "u5-wf-5",
      adjective: "inept",
      root: "inept",
      suffix: "-itude",
      noun: "ineptitude",
      suffixChoices: ["-itude", "-ity", "-ness", "-ment"],
      meaningVi: "Sự ngớ ngẩn, tính vụng về trơ trẽn (ineptitude of his remark)",
      ruleTip: "Hậu tố trừu tượng C1 '-itude': Gắn vào tính từ 'inept' để tạo danh từ 'ineptitude' (tính vụng về, dại dột không hợp hoàn cảnh)."
    },
    {
      id: "u5-wf-6",
      adjective: "immediate",
      root: "immedia(te)",
      suffix: "-cy",
      noun: "immediacy",
      suffixChoices: ["-cy", "-ness", "-tion", "-ity"],
      meaningVi: "Tính cấp bách, sự cấp thiết trực tiếp tức thì (immediacy of the problem)",
      ruleTip: "Tương tự như 'inadequate', tính từ 'immediate' bỏ '-te' thêm '-cy' để tạo danh từ triết học/thời gian 'immediacy'."
    },
    {
      id: "u5-wf-7",
      adjective: "defer (verb)",
      root: "defer",
      suffix: "-ment",
      noun: "deferment",
      suffixChoices: ["-ment", "-al", "-ance", "-tion"],
      meaningVi: "Sự trì hoãn, sự hoãn lại thời hạn thanh toán (deferment of payment)",
      ruleTip: "Động từ 'defer' kết hợp với hậu tố '-ment' để tạo danh từ hành chính 'deferment' (việc hoãn nghĩa vụ quân sự hoặc giãn nợ)."
    },
    {
      id: "u5-wf-8",
      adjective: "frivolous",
      root: "frivol(ous)",
      suffix: "-ity",
      noun: "frivolity",
      suffixChoices: ["-ity", "-ness", "-ment", "-ance"],
      meaningVi: "Tính phù phiếm, sự cợt nhả nông cạn (frivolity of her remark)",
      ruleTip: "Tính từ đuôi '-ous' bỏ '-ous' và nhận hậu tố '-ity' để tạo danh từ chỉ thói nông nổi, phù phiếm (frivolous ➔ frivolity)."
    },
    {
      id: "u5-wf-9",
      adjective: "astonish (verb)",
      root: "astonish",
      suffix: "-ment",
      noun: "astonishment",
      suffixChoices: ["-ment", "-ance", "-ion", "-ity"],
      meaningVi: "Sự kinh ngạc khôn xiết, trạng thái sững sờ (in sheer astonishment)",
      ruleTip: "Động từ tâm lý 'astonish' thêm hậu tố '-ment' để tạo danh từ cảm xúc 'astonishment'."
    },
    {
      id: "u5-wf-10",
      adjective: "intellectual",
      root: "intellect",
      suffix: "gốc",
      noun: "intellect",
      suffixChoices: ["intellect", "intellectuality", "intellectualness", "intellectualism"],
      meaningVi: "Trí tuệ, trí óc năng lực nhận thức (impoverished intellect)",
      ruleTip: "Từ gốc: Tính từ 'intellectual' được phái sinh từ danh từ cốt lõi 'intellect' (năng lực trí tuệ bẩm sinh)."
    },
    {
      id: "u5-wf-11",
      adjective: "stringent",
      root: "stringen(t)",
      suffix: "-cy",
      noun: "stringency",
      suffixChoices: ["-cy", "-ce", "-ness", "-ity"],
      meaningVi: "Tính nghiêm ngặt, sự thắt chặt gắt gao (stringency of safety rules)",
      ruleTip: "Quy tắc đuôi '-ent': Tính từ '-ent' chuyển sang danh từ trừu tượng bằng cách thay phụ âm 't' bằng 'cy' (stringent ➔ stringency)."
    },
    {
      id: "u5-wf-12",
      adjective: "virtuous",
      root: "virtue",
      suffix: "gốc",
      noun: "virtue",
      suffixChoices: ["virtue", "virtuousness", "virtuality", "virtuosity"],
      meaningVi: "Đức hạnh, phẩm giá cao quý (a person of virtue)",
      ruleTip: "Danh từ gốc Latinh: Tính từ 'virtuous' bắt nguồn từ danh từ đạo đức 'virtue' (phẩm hạnh, đức tính tốt)."
    }
  ],

  // 3. Confusable Words (6 pairs from Page 20 Task Two)
  confusableWords: [
    {
      id: "u5-cw-1",
      wordA: "wary",
      wordB: "weary",
      diffHighlightA: { before: "w", highlight: "a", after: "ry" },
      diffHighlightB: { before: "w", highlight: "ea", after: "ry" },
      defA: "wary (adj): Cảnh giác, thận trọng, đề phòng mối hiểm nguy rình rập.",
      defB: "weary (adj): Mệt lử, rã rời, kiệt sức vì làm việc quá sức hoặc chán chường.",
      promptSentence: "He has been extremely ______ of stray dogs ever since he was severely bitten.",
      correctWord: "wary",
      distinctionTip: "WARY OF STH = đề phòng, cảnh giác trước điều gì nguy hiểm. WEARY OF STH = chán ngấy, mệt mỏi rã rời vì điều gì lặp đi lặp lại.",
      mnemonic: "WARY có chữ A như 'Alert' (luôn tỉnh táo cảnh giác)."
    },
    {
      id: "u5-cw-2",
      wordA: "stinging",
      wordB: "stringent",
      diffHighlightA: { before: "st", highlight: "ing", after: "ing" },
      diffHighlightB: { before: "str", highlight: "ing", after: "ent" },
      defA: "stinging (adj): Cay nhức, châm chích buốt đau (lời phê bình sâu cay, vết ong đốt).",
      defB: "stringent (adj): Nghiêm ngặt, ngặt nghèo, ràng buộc chặt chẽ (luật pháp, tiêu chuẩn).",
      promptSentence: "The executive recruitment advertisement listed dozens of ______ requirements.",
      correctWord: "stringent",
      distinctionTip: "STRINGENT REQUIREMENTS = các tiêu chuẩn tuyển dụng cực kỳ khắt khe. STINGING REMARKS = những lời chỉ trích nhức nhối.",
      mnemonic: "STRINGENT cùng gốc với 'String' (sợi dây siết chặt) ➔ siết chặt quy chế nghiêm ngặt."
    },
    {
      id: "u5-cw-3",
      wordA: "renovate",
      wordB: "innovate",
      diffHighlightA: { before: "", highlight: "re", after: "novate" },
      diffHighlightB: { before: "", highlight: "in", after: "novate" },
      defA: "renovate (v): Sửa sang, trùng tu, tân trang lại nhà cửa/tòa nhà cũ kỹ.",
      defB: "innovate (v): Đổi mới, phát minh, đưa ra ý tưởng hoặc phương pháp hoàn toàn mới mẻ.",
      promptSentence: "It requires a tremendous amount of manual labor to ______ a derelict Victorian mansion.",
      correctWord: "renovate",
      distinctionTip: "RENOVATE A HOUSE = tân trang ngôi nhà cũ. INNOVATE A SYSTEM = đổi mới sáng tạo một hệ thống công nghệ.",
      mnemonic: "RE-NOVATE có tiền tố 'Re-' (làm mới lại cái đã có từ trước)."
    },
    {
      id: "u5-cw-4",
      wordA: "status",
      wordB: "statute",
      diffHighlightA: { before: "stat", highlight: "us", after: "" },
      diffHighlightB: { before: "stat", highlight: "ute", after: "" },
      defA: "status (n): Địa vị xã hội, vị thế nghề nghiệp hoặc tình trạng hiện tại.",
      defB: "statute (n): Đạo luật văn bản chính thức do cơ quan lập pháp ban hành.",
      promptSentence: "Some upwardly mobile individuals believe a prestigious sports car elevates their social ______.",
      correctWord: "status",
      distinctionTip: "SOCIAL STATUS = vị thế/địa vị xã hội. STATUTE = văn bản đạo luật nghị viện.",
      mnemonic: "STATUS có đuôi '-US' chỉ vị thế của 'chúng ta' (Us) trong nấc thang xã hội."
    },
    {
      id: "u5-cw-5",
      wordA: "utility",
      wordB: "utilisation",
      diffHighlightA: { before: "utili", highlight: "ty", after: "" },
      diffHighlightB: { before: "utilis", highlight: "ation", after: "" },
      defA: "utility (n): Tính hữu ích, công năng tiện ích thiết thực (điện, nước, phần mềm).",
      defB: "utilisation (n): Việc đưa vào sử dụng, sự khai thác và tận dụng hiệu quả một nguồn lực.",
      promptSentence: "The optimal ______ of renewable energy is a decisive challenge for the coming century.",
      correctWord: "utilisation",
      distinctionTip: "UTILISATION = hành động khai thác, sử dụng triệt để nguồn lực. UTILITY = tính năng hữu ích.",
      mnemonic: "UTILISATION mang đuôi '-TION' chỉ hành động/quá trình khai thác đưa vào sử dụng."
    },
    {
      id: "u5-cw-6",
      wordA: "virtual",
      wordB: "virtuous",
      diffHighlightA: { before: "virtu", highlight: "al", after: "" },
      diffHighlightB: { before: "virtu", highlight: "ous", after: "" },
      defA: "virtual (adj): Gần như là thực tế (virtual certainty) hoặc thuộc không gian ảo.",
      defB: "virtuous (adj): Có phẩm hạnh cao khiết, đạo đức đoan chính tốt lành.",
      promptSentence: "She was remembered across the parish as a remarkably modest and ______ matriarch.",
      correctWord: "virtuous",
      distinctionTip: "VIRTUOUS PERSON = con người có đạo đức, đức hạnh cao quý. VIRTUAL HEAD = người trên thực tế nắm quyền chỉ đạo.",
      mnemonic: "VIRTUOUS đi từ 'Virtue' (đức tính tốt đẹp của con người)."
    }
  ],

  // 4. Synonym Filter (3 challenge rounds)
  synonymFilter: [
    {
      id: "u5-sf-1",
      targetWord: "CAUSTIC, BITING & SEVERE",
      targetMeaning: "Nhóm từ C1 biểu thị GIỌNG ĐIỆU CAY ĐỘC / CHÂM CHÍCH / CHÂM BIẾM SÂU CAY",
      note: "Chọn các từ KHÔNG đồng nghĩa để loại bỏ khỏi danh sách",
      targetCategory: "CAUSTIC, BITING & SEVERE",
      targetMeaningVi: "Nhóm từ C1 biểu thị GIỌNG ĐIỆU CAY ĐỘC / CHÂM CHÍCH / CHÂM BIẾM SÂU CAY",
      words: [
        { word: "acid", isSynonym: true },
        { word: "caustic", isSynonym: true },
        { word: "biting", isSynonym: true },
        { word: "cutting", isSynonym: true },
        { word: "tart", isSynonym: true },
        { word: "sour", isSynonym: true },
        { word: "virtuous", isSynonym: false },
        { word: "benevolent", isSynonym: false }
      ]
    },
    {
      id: "u5-sf-2",
      targetWord: "DOMINATE & SUPERSEDE",
      targetMeaning: "Nhóm từ biểu thị hành động KHUẤT PHỤC / NÔ DỊCH / THAY THẾ CÁI LỖI THỜI",
      note: "Chọn các từ KHÔNG đồng nghĩa để loại bỏ khỏi danh sách",
      targetCategory: "DOMINATE & SUPERSEDE",
      targetMeaningVi: "Nhóm từ biểu thị hành động KHUẤT PHỤC / NÔ DỊCH / THAY THẾ CÁI LỖI THỜI",
      words: [
        { word: "subjugate", isSynonym: true },
        { word: "enslave", isSynonym: true },
        { word: "supersede", isSynonym: true },
        { word: "supplant", isSynonym: true },
        { word: "overthrow", isSynonym: true },
        { word: "subdue", isSynonym: true },
        { word: "renovate", isSynonym: false },
        { word: "cherish", isSynonym: false }
      ]
    },
    {
      id: "u5-sf-3",
      targetWord: "STRICT & STRINGENT",
      targetMeaning: "Nhóm từ chỉ tính chất NGHIÊM NGẶT / THẮT CHẶT / ĐÒI HỎI TIÊU CHUẨN GẮT GAO",
      note: "Chọn các từ KHÔNG đồng nghĩa để loại bỏ khỏi danh sách",
      targetCategory: "STRICT & STRINGENT",
      targetMeaningVi: "Nhóm từ chỉ tính chất NGHIÊM NGẶT / THẮT CHẶT / ĐÒI HỎI TIÊU CHUẨN GẮT GAO",
      words: [
        { word: "stringent", isSynonym: true },
        { word: "rigorous", isSynonym: true },
        { word: "strict", isSynonym: true },
        { word: "severe", isSynonym: true },
        { word: "harsh", isSynonym: true },
        { word: "rigid", isSynonym: true },
        { word: "weary", isSynonym: false },
        { word: "frivolous", isSynonym: false }
      ]
    }
  ],

  // 5. Smart Cloze (Page 22 Part A - 10 gaps)
  clozePassages: [
    {
      id: "u5-cp-1",
      title: "Managing Soaring Petrol Prices",
      sourceLabel: "Page 22 — Vocabulary Practice Part A",
      passageTemplate: "As petrol prices continue to {{gap_11}}, many people are looking for ways to reduce the {{gap_12}} of higher prices while still doing the driving necessary to their work and other activities. {{gap_13}} are some suggestions which will save you a {{gap_14}} amount of money on petrol.\n1. Ask yourself every time you {{gap_15}} to use your car, truck, SUV, or van, 'Is this trip really necessary?' Every mile you drive your vehicle will cost you at least an {{gap_16}} of 36 cents. If the trip is not necessary, think twice before using your vehicle.\n2. Drive at a {{gap_17}} speed on the motorway. According to the Department of Energy, most automobiles get about 20 per cent more miles per gallon on the motorway at 55 miles per hour than they do at 70 miles per hour.\n3. Consider {{gap_18}} an automobile which gets the best petrol mileage. For example, generally, the following get better petrol mileage: lighter weight vehicles, vehicles with smaller engines, vehicles with manual transmissions, those with four cylinders, and those with fewer accessories. Check the 'fuel economy' labels {{gap_19}} to the windows of new automobiles to find the average estimated miles per gallon for given makes and models.\n4. Decrease the number of short trips you make. Short trips {{gap_20}} reduce petrol mileage. If an automobile gets 20 miles per gallon in general, it may get only 4 miles per gallon on a short trip of 5 miles or less.",
      gaps: [
        {
          gapNumber: 11,
          options: [
            { label: "a", text: "crash" },
            { label: "b", text: "accelerate" },
            { label: "c", text: "escalate" },
            { label: "d", text: "fly" }
          ],
          correctLabel: "c",
          correctWord: "escalate",
          targetWord: "escalate",
          explanationVi: "petrol prices continue to escalate: giá xăng dầu liên tục leo thang phi mã (escalate: leo thang về mức độ hoặc giá cả)."
        },
        {
          gapNumber: 12,
          options: [
            { label: "a", text: "danger" },
            { label: "b", text: "occurrence" },
            { label: "c", text: "burden" },
            { label: "d", text: "chance" }
          ],
          correctLabel: "c",
          correctWord: "burden",
          targetWord: "burden",
          explanationVi: "reduce the burden of higher prices: giảm bớt gánh nặng tài chính do giá tăng cao."
        },
        {
          gapNumber: 13,
          options: [
            { label: "a", text: "Below" },
            { label: "b", text: "After" },
            { label: "c", text: "Coming" },
            { label: "d", text: "Later" }
          ],
          correctLabel: "a",
          correctWord: "Below",
          targetWord: "Below",
          explanationVi: "Below are some suggestions: Dưới đây là một số gợi ý hữu ích."
        },
        {
          gapNumber: 14,
          options: [
            { label: "a", text: "measurable" },
            { label: "b", text: "negotiable" },
            { label: "c", text: "negligible" },
            { label: "d", text: "considerable" }
          ],
          correctLabel: "d",
          correctWord: "considerable",
          targetWord: "considerable",
          explanationVi: "save you a considerable amount of money: tiết kiệm cho bạn một khoản tiền đáng kể (considerable: to lớn, đáng kể)."
        },
        {
          gapNumber: 15,
          options: [
            { label: "a", text: "think" },
            { label: "b", text: "plan" },
            { label: "c", text: "need" },
            { label: "d", text: "arrange" }
          ],
          correctLabel: "c",
          correctWord: "need",
          targetWord: "need",
          explanationVi: "every time you need to use your car: mỗi khi bạn thực sự có nhu cầu phải dùng ô tô."
        },
        {
          gapNumber: 16,
          options: [
            { label: "a", text: "equivalent" },
            { label: "b", text: "average" },
            { label: "c", text: "amount" },
            { label: "d", text: "increase" }
          ],
          correctLabel: "b",
          correctWord: "average",
          targetWord: "average",
          explanationVi: "cost you at least an average of 36 cents: tốn của bạn trung bình ít nhất 36 xu cho mỗi dặm (an average of)."
        },
        {
          gapNumber: 17,
          options: [
            { label: "a", text: "mild" },
            { label: "b", text: "conservative" },
            { label: "c", text: "considerate" },
            { label: "d", text: "substantial" }
          ],
          correctLabel: "b",
          correctWord: "conservative",
          targetWord: "conservative",
          explanationVi: "drive at a conservative speed: lái xe ở tốc độ vừa phải, thận trọng và tiết kiệm nhiên liệu."
        },
        {
          gapNumber: 18,
          options: [
            { label: "a", text: "inquiring" },
            { label: "b", text: "trading" },
            { label: "c", text: "preferring" },
            { label: "d", text: "purchasing" }
          ],
          correctLabel: "d",
          correctWord: "purchasing",
          targetWord: "purchasing",
          explanationVi: "consider purchasing an automobile: cân nhắc mua một chiếc xe có khả năng tiết kiệm xăng tối ưu."
        },
        {
          gapNumber: 19,
          options: [
            { label: "a", text: "attached" },
            { label: "b", text: "selected" },
            { label: "c", text: "stretched" },
            { label: "d", text: "held" }
          ],
          correctLabel: "a",
          correctWord: "attached",
          targetWord: "attached",
          explanationVi: "labels attached to the windows: các tem nhãn tiêu thụ nhiên liệu được dán đính kèm trên kính xe."
        },
        {
          gapNumber: 20,
          options: [
            { label: "a", text: "extensively" },
            { label: "b", text: "exclusively" },
            { label: "c", text: "intensively" },
            { label: "d", text: "drastically" }
          ],
          correctLabel: "d",
          correctWord: "drastically",
          targetWord: "drastically",
          explanationVi: "drastically reduce petrol mileage: làm sụt giảm nghiêm trọng hiệu suất tiêu thụ xăng."
        }
      ]
    }
  ],

  // 6. Speed Blitz (20 questions: 10 from Page 20 Task One + 10 from Page 22 Part B)
  speedBlitz: [
    {
      id: "u5-sb-1",
      questionNumber: 1,
      prompt: "A 'profitable' commercial business:",
      options: [
        { key: "1", text: "incurs debt" },
        { key: "2", text: "makes a profit" },
        { key: "3", text: "breaks even" },
        { key: "4", text: "makes no profit" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "incurs debt", pos: "phrase", vi: "Gánh chịu các khoản nợ" },
        { key: "2", word: "makes a profit", pos: "collocation", vi: "Kinh doanh có lãi, sinh lợi nhuận (profitable business)" },
        { key: "3", word: "breaks even", pos: "idiom", vi: "Hòa vốn" },
        { key: "4", word: "makes no profit", pos: "phrase", vi: "Không có lãi, lỗ vốn" }
      ]
    },
    {
      id: "u5-sb-2",
      questionNumber: 2,
      prompt: "Heavy manual 'labor' is inherently very ______ work.",
      options: [
        { key: "1", text: "easy" },
        { key: "2", text: "frivolous" },
        { key: "3", text: "hard" },
        { key: "4", text: "leisurely" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "easy", pos: "adj", vi: "Dễ dàng" },
        { key: "2", word: "frivolous", pos: "adj", vi: "Phù phiếm" },
        { key: "3", word: "hard", pos: "adj", vi: "Cực nhọc, gian lao nặng nhọc (labor is hard work - Page 20)" },
        { key: "4", word: "leisurely", pos: "adj", vi: "Thư thái nhàn hạ" }
      ]
    },
    {
      id: "u5-sb-3",
      questionNumber: 3,
      prompt: "Another literary synonym for 'slaughter' is to:",
      options: [
        { key: "1", text: "slay" },
        { key: "2", text: "prey" },
        { key: "3", text: "cherish" },
        { key: "4", text: "subjugate" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "slay", pos: "v", vi: "Hạ sát, tàn sát, giết chết dã man (slaughter = slay)" },
        { key: "2", word: "prey", pos: "n/v", vi: "Con mồi / săn mồi" },
        { key: "3", word: "cherish", pos: "v", vi: "Ấp ủ nâng niu" },
        { key: "4", word: "subjugate", pos: "v", vi: "Khuất phục, nô dịch hóa" }
      ]
    },
    {
      id: "u5-sb-4",
      questionNumber: 4,
      prompt: "The exact opposite financial role of a 'debtor' is a:",
      options: [
        { key: "1", text: "credible" },
        { key: "2", text: "creditor" },
        { key: "3", text: "proprietor" },
        { key: "4", text: "auditor" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "credible", pos: "adj", vi: "Đáng tin cậy" },
        { key: "2", word: "creditor", pos: "n", vi: "Chủ nợ (người cho vay tiền - đối lập với debtor: con nợ)" },
        { key: "3", word: "proprietor", pos: "n", vi: "Chủ sở hữu cơ ngơi" },
        { key: "4", word: "auditor", pos: "n", vi: "Kiểm toán viên" }
      ]
    },
    {
      id: "u5-sb-5",
      questionNumber: 5,
      prompt: "To 'enslave' an entire populace is to ______ them.",
      options: [
        { key: "1", text: "irritate" },
        { key: "2", text: "subjugate" },
        { key: "3", text: "renovate" },
        { key: "4", text: "liberate" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "irritate", pos: "v", vi: "Làm bực mình phát cáu" },
        { key: "2", word: "subjugate", pos: "v", vi: "Khuất phục, biến thành nô dịch (enslave = subjugate - Page 20)" },
        { key: "3", word: "renovate", pos: "v", vi: "Sửa sang lại" },
        { key: "4", word: "liberate", pos: "v", vi: "Giải phóng tự do" }
      ]
    },
    {
      id: "u5-sb-6",
      questionNumber: 6,
      prompt: "When governments 'initiate' direct peace negotiations, they:",
      options: [
        { key: "1", text: "terminate them" },
        { key: "2", text: "boycott them" },
        { key: "3", text: "start them" },
        { key: "4", text: "postpone them" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "terminate", pos: "v", vi: "Chấm dứt hoàn toàn" },
        { key: "2", word: "boycott", pos: "v", vi: "Tẩy chay" },
        { key: "3", word: "start them", pos: "phrase", vi: "Khởi xướng, bắt đầu tiến hành đàm phán (initiate = start)" },
        { key: "4", word: "postpone", pos: "v", vi: "Hoãn lại" }
      ]
    },
    {
      id: "u5-sb-7",
      questionNumber: 7,
      prompt: "A 'benevolent' charitable organisation dedicatedly ______ the needy.",
      options: [
        { key: "1", text: "ignores" },
        { key: "2", text: "exploits" },
        { key: "3", text: "helps" },
        { key: "4", text: "scorns" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "ignores", pos: "v", vi: "Ngó lơ, phớt lờ" },
        { key: "2", word: "exploits", pos: "v", vi: "Bóc lột trục lợi" },
        { key: "3", word: "helps", pos: "v", vi: "Giúp đỡ người cơ nhỡ với lòng nhân ái (benevolent society helps the needy)" },
        { key: "4", word: "scorns", pos: "v", vi: "Khinh bỉ" }
      ]
    },
    {
      id: "u5-sb-8",
      questionNumber: 8,
      prompt: "When manual machines are 'superseded' by automated robots:",
      options: [
        { key: "1", text: "the former take the place of the latter" },
        { key: "2", text: "both cease to operate" },
        { key: "3", text: "the latter take the place of the former" },
        { key: "4", text: "they malfunction simultaneously" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "former replaces latter", pos: "error", vi: "Cái cũ thay thế cái mới (sai logic)" },
        { key: "2", word: "cease", pos: "v", vi: "Ngừng hoạt động" },
        { key: "3", word: "the latter takes place of former", pos: "phrase", vi: "Cái sau (mới hơn) đến thế chỗ và thay thế cho cái trước (cũ kỹ hơn)" },
        { key: "4", word: "malfunction", pos: "v", vi: "Bị hỏng hóc" }
      ]
    },
    {
      id: "u5-sb-9",
      questionNumber: 9,
      prompt: "When there is an ancient 'feud' between two clans, it means they:",
      options: [
        { key: "1", text: "trade peacefully" },
        { key: "2", text: "are on good terms" },
        { key: "3", text: "hate each other" },
        { key: "4", text: "intermarry frequently" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "trade peacefully", pos: "phrase", vi: "Buôn bán hòa bình" },
        { key: "2", word: "on good terms", pos: "idiom", vi: "Có mối quan hệ êm đẹp" },
        { key: "3", word: "hate each other", pos: "phrase", vi: "Căm thù, hận thù lẫn nhau sâu sắc qua nhiều thế hệ (long-standing feud)" },
        { key: "4", word: "intermarry", pos: "v", vi: "Kết hôn chéo" }
      ]
    },
    {
      id: "u5-sb-10",
      questionNumber: 10,
      prompt: "Behaving with strict 'propriety' means upholding:",
      options: [
        { key: "1", text: "reckless spontaneity" },
        { key: "2", text: "correct and decorous conduct" },
        { key: "3", text: "insolent rudeness" },
        { key: "4", text: "frivolous antics" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "reckless spontaneity", pos: "n", vi: "Sự bốc đồng liều lĩnh" },
        { key: "2", word: "decorous conduct", pos: "n", vi: "Hành vi đúng mực, nhã nhặn hợp khuôn phép lễ nghi (propriety)" },
        { key: "3", word: "insolence", pos: "n", vi: "Sự xấc láo hỗn xược" },
        { key: "4", word: "frivolous antics", pos: "n", vi: "Các trò hề phù phiếm" }
      ]
    },
    {
      id: "u5-sb-11",
      questionNumber: 11,
      prompt: "This low-lying coastal roadway is particularly ______ to flash floods during severe winter storms.",
      options: [
        { key: "1", text: "fragile" },
        { key: "2", text: "sensitive" },
        { key: "3", text: "leading" },
        { key: "4", text: "unprotected" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "fragile", pos: "adj", vi: "Mong manh, dễ vỡ vụn (đồ gốm sứ)" },
        { key: "2", word: "sensitive to floods", pos: "collocation", vi: "Nhạy cảm, dễ bị tổn thương/ngập lụt (Page 22 Part B)" },
        { key: "3", word: "leading", pos: "adj", vi: "Dẫn đầu" },
        { key: "4", word: "unprotected", pos: "adj", vi: "Không được bảo vệ" }
      ]
    },
    {
      id: "u5-sb-12",
      questionNumber: 12,
      prompt: "Rapid real estate expansion has begun to ______ aggressively on the protected rural green belt.",
      options: [
        { key: "1", text: "reach" },
        { key: "2", text: "encroach" },
        { key: "3", text: "enter" },
        { key: "4", text: "intrude" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "reach", pos: "v", vi: "Chạm tới" },
        { key: "2", word: "encroach on", pos: "collocation", vi: "Lấn chiếm dần dần đất đai được bảo vệ (encroach on the green belt)" },
        { key: "3", word: "enter", pos: "v", vi: "Bước vào (không đi với on)" },
        { key: "4", word: "intrude", pos: "v", vi: "Xâm nhập (thường đi với into/upon cuộc sống riêng tư)" }
      ]
    },
    {
      id: "u5-sb-13",
      questionNumber: 13,
      prompt: "The arresting officer warned the suspect that he would be taken into police ______.",
      options: [
        { key: "1", text: "guardianship" },
        { key: "2", text: "bail" },
        { key: "3", text: "custody" },
        { key: "4", text: "protection" }
      ],
      correctKey: "3",
      explanations: [
        { key: "1", word: "guardianship", pos: "n", vi: "Quyền giám hộ trẻ em" },
        { key: "2", word: "bail", pos: "n", vi: "Tiền bảo lãnh tại ngoại" },
        { key: "3", word: "take into custody", pos: "collocation", vi: "Bắt giữ, tạm giam theo quy trình pháp lý (take into police custody)" },
        { key: "4", word: "protection", pos: "n", vi: "Sự che chở bảo vệ" }
      ]
    },
    {
      id: "u5-sb-14",
      questionNumber: 14,
      prompt: "The inspector's repeated interrogations failed to ______ any confession of real value.",
      options: [
        { key: "1", text: "elicit" },
        { key: "2", text: "arouse" },
        { key: "3", text: "illicit" },
        { key: "4", text: "swell" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "elicit", pos: "collocation", vi: "Moi được, gợi ra được thông tin quý giá (elicit information of value)" },
        { key: "2", word: "arouse", pos: "v", vi: "Khuấy động cảm xúc, khêu gợi ham muốn" },
        { key: "3", word: "illicit", pos: "adj", vi: "Bất hợp pháp, phi pháp (tính từ, không phải động từ)" },
        { key: "4", word: "swell", pos: "v", vi: "Phồng to, phình lên" }
      ]
    },
    {
      id: "u5-sb-15",
      questionNumber: 15,
      prompt: "After weighing diverse corporate career paths, Charles finally ______ for corporate law.",
      options: [
        { key: "1", text: "chose" },
        { key: "2", text: "opted" },
        { key: "3", text: "accepted" },
        { key: "4", text: "selected" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "chose", pos: "v", vi: "Chọn lựa (thường không đi trực tiếp với for)" },
        { key: "2", word: "opted for", pos: "collocation", vi: "Lựa chọn, quyết định theo con đường nào (opt for sth)" },
        { key: "3", word: "accepted", pos: "v", vi: "Chấp nhận" },
        { key: "4", word: "selected", pos: "v", vi: "Tuyển chọn" }
      ]
    },
    {
      id: "u5-sb-16",
      questionNumber: 16,
      prompt: "The professor's ______ sarcasm regarding my thesis completely exasperated me.",
      options: [
        { key: "1", text: "biting" },
        { key: "2", text: "decorous" },
        { key: "3", text: "benevolent" },
        { key: "4", text: "fearful" }
      ],
      correctKey: "1",
      explanations: [
        { key: "1", word: "biting sarcasm", pos: "collocation", vi: "Sự châm chọc sâu cay, xỏ xiên nhức nhối (biting sarcasm)" },
        { key: "2", word: "decorous", pos: "adj", vi: "Trang nhã lịch thiệp" },
        { key: "3", word: "benevolent", pos: "adj", vi: "Nhân hậu độ lượng" },
        { key: "4", word: "fearful", pos: "adj", vi: "Sợ hãi" }
      ]
    },
    {
      id: "u5-sb-17",
      questionNumber: 17,
      prompt: "His distinguished ______ as an indomitable frontline commander spread throughout the nation.",
      options: [
        { key: "1", text: "renovation" },
        { key: "2", text: "renown" },
        { key: "3", text: "pilgrimage" },
        { key: "4", text: "expedition" }
      ],
      correctKey: "2",
      explanations: [
        { key: "1", word: "renovation", pos: "n", vi: "Sự trùng tu sửa sang" },
        { key: "2", word: "renown", pos: "collocation", vi: "Tiếng tăm lừng lẫy, danh tiếng vẻ vang (renown as a brave soldier)" },
        { key: "3", word: "pilgrimage", pos: "n", vi: "Cuộc hành hương" },
        { key: "4", word: "expedition", pos: "n", vi: "Chuyến thám hiểm" }
      ]
    },
    {
      id: "u5-sb-18",
      questionNumber: 18,
      prompt: "The sheltered city dweller found it all but impossible to endure the ______ of nomadic life.",
      options: [
        { key: "1", text: "amenities" },
        { key: "2", text: "sourness" },
        { key: "3", text: "decorum" },
        { key: "4", text: "harshness" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "amenities", pos: "n", vi: "Các tiện nghi cuộc sống" },
        { key: "2", word: "sourness", pos: "n", vi: "Vị chua / sự cáu kỉnh" },
        { key: "3", word: "decorum", pos: "n", vi: "Phép tắc lịch sự" },
        { key: "4", word: "harshness", pos: "collocation", vi: "Sự khắc nghiệt, gian nan cùng cực (harshness of a nomadic life)" }
      ]
    },
    {
      id: "u5-sb-19",
      questionNumber: 19,
      prompt: "Despite mounting clinical evidence, he stubbornly ______ the illusion that his condition is minor.",
      options: [
        { key: "1", text: "grows" },
        { key: "2", text: "relishes" },
        { key: "3", text: "develops" },
        { key: "4", text: "cherishes" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "grows", pos: "v", vi: "Phát triển" },
        { key: "2", word: "relishes", pos: "v", vi: "Thưởng thức say mê (món ăn, cơ hội)" },
        { key: "3", word: "develops", pos: "v", vi: "Phát triển bệnh" },
        { key: "4", word: "cherishes the illusion", pos: "collocation", vi: "Ấp ủ, nuôi dưỡng ảo tưởng trong tâm tưởng (cherish an illusion)" }
      ]
    },
    {
      id: "u5-sb-20",
      questionNumber: 20,
      prompt: "Samantha appeared at the formal reception dressed in a remarkably ______ designer trouser suit.",
      options: [
        { key: "1", text: "contemptible" },
        { key: "2", text: "decorous" },
        { key: "3", text: "stinging" },
        { key: "4", text: "becoming" }
      ],
      correctKey: "4",
      explanations: [
        { key: "1", word: "contemptible", pos: "adj", vi: "Đáng khinh bỉ" },
        { key: "2", word: "decorous", pos: "adj", vi: "Đúng mực (thường dùng cho hành vi hơn là trang phục)" },
        { key: "3", word: "stinging", pos: "adj", vi: "Châm chích" },
        { key: "4", word: "becoming", pos: "collocation", vi: "(Trang phục) Tôn dáng, đẹp mắt, vừa vặn duyên dáng (a becoming trouser suit)" }
      ]
    }
  ]
};


export const VOCAB_C1_UNIT_6: VocabC1Unit = {
  unitId: 6,
  title: "Unit 6: Adversity & Suffering",
  subtitle: "The Vocabulary Files - Level C1 (Pages 23-26)",

  // 1. Words in Action (16 words from Page 23 & 24)
  wordsInAction: [
    {
      id: "u6-wia-1",
      word: "blow",
      ipa: "/bləʊ/",
      nuance: "[Sudden shock or physical stroke]",
      register: "General / Formal & Informal",
      collocations: ["deal sb a blow", "come as a bitter blow", "crushing blow", "soften the blow"],
      enDef: "A violent stroke given by the hand or weapon; also a sudden shock or disaster for somebody or something.",
      viDef: "Cú đánh mạnh bằng tay/vũ khí; hoặc một cú sốc tinh thần đột ngột, tai ương ập tới.",
      example: "His sudden resignation came as a devastating **blow** to the entire research team.",
      targetKeyword: "blow"
    },
    {
      id: "u6-wia-2",
      word: "misfortune",
      ipa: "/mɪsˈfɔː.tʃuːn/",
      nuance: "[Bad luck of serious nature without direct fault]",
      register: "Formal / Academic",
      collocations: ["have the misfortune to", "stroke of misfortune", "bear misfortune with dignity", "misfortunes of war"],
      enDef: "Bad luck, often of a serious and lingering nature, where the sufferer is generally not considered directly responsible.",
      viDef: "Vận rủi, bất hạnh nghiêm trọng (nạn nhân thường không trực tiếp gây ra lỗi lầm).",
      example: "The captain had the **misfortune** to hit an iceberg on his maiden voyage.",
      targetKeyword: "misfortune"
    },
    {
      id: "u6-wia-3",
      word: "adversity",
      ipa: "/ədˈvɜː.sə.ti/",
      nuance: "[Unfavorable outward circumstances]",
      register: "Formal / Literary",
      collocations: ["in the face of adversity", "overcome adversity", "triumph over adversity", "great adversity"],
      enDef: "An unfortunate event or unfavorable situation, usually caused by outward circumstances such as loss of fortune, position, or health.",
      viDef: "Nghịch cảnh, hoàn cảnh trắc trở ngặt nghèo do yếu tố ngoại cảnh gây ra.",
      example: "She showed remarkable courage and cheerfulness in the face of daunting **adversity**.",
      targetKeyword: "adversity"
    },
    {
      id: "u6-wia-4",
      word: "calamity",
      ipa: "/kəˈlæm.ə.ti/",
      nuance: "[Disaster causing massive destruction/damage]",
      register: "Formal / Written",
      collocations: ["calamities of war", "national calamity", "avert a calamity", "economic calamity"],
      enDef: "A serious misfortune or disaster causing a great deal of damage, destruction or human suffering.",
      viDef: "Thảm họa, đại họa gây tàn phá nghiêm trọng, thiệt hại to lớn hoặc đau thương diện rộng.",
      example: "The recent volcanic eruption and subsequent floods were the worst **calamity** in the country's history.",
      targetKeyword: "calamity"
    },
    {
      id: "u6-wia-5",
      word: "hardship",
      ipa: "/ˈhɑːd.ʃɪp/",
      nuance: "[Severe lack of comfort/basic life needs]",
      register: "General / Formal",
      collocations: ["economic hardship", "endure hardship", "hardships of life", "suffer extreme hardship"],
      enDef: "A specific difficult condition of life such as acute lack of food, comfort, money, or shelter.",
      viDef: "Sự gian khổ, thiếu thốn cùng cực về điều kiện sinh hoạt (cơm ăn, áo mặc, tiền bạc).",
      example: "The explorers were forced to turn back due to the unbearable **hardships** of the Arctic winter.",
      targetKeyword: "hardship"
    },
    {
      id: "u6-wia-6",
      word: "mishap",
      ipa: "/ˈmɪs.hæp/",
      nuance: "[Minor, unfortunate incident/accident]",
      register: "General / Written & Spoken",
      collocations: ["slight mishap", "without mishap", "minor mishap", "unfortunate mishap"],
      enDef: "A minor and unfortunate accident or bad break that causes an inconvenience rather than a disaster.",
      viDef: "Sự cố nhỏ không may, trục trặc bất ngờ lặt vặt (như thủng lốp xe, làm rơi khăn quàng).",
      example: "We arrived safely after a minor **mishap** with a flat tyre on the motorway.",
      targetKeyword: "mishap"
    },
    {
      id: "u6-wia-7",
      word: "reverse",
      ipa: "/rɪˈvɜːs/",
      nuance: "[Setback or change for the worse in fortune]",
      register: "Formal / Journalism",
      collocations: ["suffer a reverse", "financial reverses", "political reverses", "reverse of fortune"],
      enDef: "Any adverse change or alteration for the worse, especially an unexpected setback or defeat in one's career or affairs.",
      viDef: "Thất bại, bước lùi, sự đảo chiều theo hướng xấu đi trong công danh sự nghiệp.",
      example: "Despite suffering severe **reverses** in his political career, he staged a sensational comeback.",
      targetKeyword: "reverse"
    },
    {
      id: "u6-wia-8",
      word: "distress",
      ipa: "/dɪˈstres/",
      nuance: "[Acute physical or emotional suffering/danger]",
      register: "General / Formal",
      collocations: ["in acute distress", "distress signal", "cause distress", "signs of distress"],
      enDef: "A state or condition of great suffering, danger, acute anxiety, pain, or discomfort.",
      viDef: "Cơn thống khổ, đau đớn dữ dội (về thể xác hoặc tinh thần); tình trạng nguy nan khẩn cấp.",
      example: "Towards the end of the harrowing ordeal, the stranded miners showed signs of extreme **distress**.",
      targetKeyword: "distress"
    },
    {
      id: "u6-wia-9",
      word: "affliction",
      ipa: "/əˈflɪk.ʃən/",
      nuance: "[Chronic pain, illness, or prolonged suffering]",
      register: "Formal / Literary",
      collocations: ["terrible affliction", "bear an affliction", "afflictions of old age", "physical affliction"],
      enDef: "A state of acute physical or mental suffering, especially a chronic ailment, infirmity, or persistent grief.",
      viDef: "Nỗi khổ sở, tật bệnh kinh niên; nỗi đau triền miên đày đọa thể xác hoặc tinh thần.",
      example: "Paralysis is a terrible **affliction** that robs an active person of physical independence.",
      targetKeyword: "affliction"
    },
    {
      id: "u6-wia-10",
      word: "trial",
      ipa: "/traɪəl/",
      nuance: "[Troublesome person or burden testing endurance]",
      register: "General / Expressive",
      collocations: ["be a trial to sb", "trials and tribulations", "severe trial", "stand trial"],
      enDef: "A troublesome, irritating person, circumstance, or burden that severely tests one's patience or endurance.",
      viDef: "Gánh nặng thử thách tính kiên nhẫn; kẻ quậy phá / việc gây phiền phức đày ải phải chịu đựng.",
      example: "The hyperactive, mischievous boy proved to be a real **trial** to his teachers and parents.",
      targetKeyword: "trial"
    },
    {
      id: "u6-wia-11",
      word: "stroke",
      ipa: "/strəʊk/",
      nuance: "[Sudden medical attack of paralysis or blow]",
      register: "Medical / Formal",
      collocations: ["paralytic stroke", "suffer a stroke", "stroke of misfortune", "stroke of luck"],
      enDef: "A sudden disabling attack caused by interruption of blood flow to the brain; also any sharp blow or sudden ill effect.",
      viDef: "Cơn đột quỵ, tai biến mạch máu não; hoặc đòn giáng đột ngột (stroke of misfortune).",
      example: "His sudden loss of speech and movement was diagnosed as a severe paralytic **stroke**.",
      targetKeyword: "stroke"
    },
    {
      id: "u6-wia-12",
      word: "bereavement",
      ipa: "/bɪˈriːv.mənt/",
      nuance: "[Grief and sorrow resulting from death of loved one]",
      register: "Formal / Compassionate",
      collocations: ["suffer a bereavement", "bereavement leave", "period of bereavement", "time of bereavement"],
      enDef: "The state of intense sorrow and deprivation caused by the death of a close family member or friend.",
      viDef: "Nỗi tang tóc, sự mất mát người thân qua đời (chuyên dùng cho sự lìa trần).",
      example: "The company grants special leave to employees going through the agonizing period of **bereavement**.",
      targetKeyword: "bereavement"
    },
    {
      id: "u6-wia-13",
      word: "destitute",
      ipa: "/ˈdes.tɪ.tʃuːt/",
      nuance: "[Lacking absolute basic necessities of life]",
      register: "Formal / Academic",
      collocations: ["left destitute", "destitute children", "utterly destitute", "render sb destitute"],
      enDef: "Extremely poor, lacking the basic necessities of life such as food, clothing, and shelter.",
      viDef: "Cơ hàn, bần cùng, trắng tay không một tấc đất cắm dùi hay manh áo che thân.",
      example: "The devastating fire left hundreds of families completely **destitute** in the dead of winter.",
      targetKeyword: "destitute"
    },
    {
      id: "u6-wia-14",
      word: "indigent",
      ipa: "/ˈɪn.dɪ.dʒənt/",
      nuance: "[Needy and in persistent poverty]",
      register: "Formal / Legal",
      collocations: ["indigent defendants", "indigent patients", "relief for the indigent", "indigent population"],
      enDef: "Needy, poor, impoverished, lacking the financial resources for ordinary maintenance.",
      viDef: "Bần cùng, nghèo khổ (thường dùng trong văn cảnh pháp lý hoặc hỗ trợ xã hội: indigent defense).",
      example: "The charitable clinic was founded exclusively to provide free medical care to **indigent** citizens.",
      targetKeyword: "indigent"
    },
    {
      id: "u6-wia-15",
      word: "squalid",
      ipa: "/ˈskwɒl.ɪd/",
      nuance: "[Extremely filthy, wretched due to poverty]",
      register: "Formal / Descriptive",
      collocations: ["squalid conditions", "squalid slums", "live in squalid poverty", "squalid tenement"],
      enDef: "Extremely dirty, foul, and unpleasant, especially as a consequence of extreme poverty or neglect.",
      viDef: "Dơ dáy, nhớp nhúa, bẩn thỉu tồi tàn (do cảnh đói nghèo hoặc bỏ bê không ai chăm sóc).",
      example: "Tenants were forced to live in **squalid** and rat-infested rooms without running water.",
      targetKeyword: "squalid"
    },
    {
      id: "u6-wia-16",
      word: "downtrodden",
      ipa: "/ˈdaʊnˌtrɒd.ən/",
      nuance: "[Oppressed, tyrannized by powerful elites]",
      register: "Written / Political",
      collocations: ["downtrodden masses", "downtrodden peasants", "defend the downtrodden", "rights of the downtrodden"],
      enDef: "Treated badly, oppressed, and kept down by tyrannical rulers, social injustice, or corrupt power.",
      viDef: "Bị áp bức, bị chà đạp bóc lột dưới gót sắt thống trị của giai cấp cầm quyền.",
      example: "The charismatic leader championed the rights of the **downtrodden** working masses.",
      targetKeyword: "downtrodden"
    }
  ],

  // 2. Word Formation (12 pairs from Page 24 Task Two + Chapter Derivatives)
  wordFormation: [
    {
      id: "u6-wf-1",
      adjective: "convert",
      noun: "conversion",
      root: "convert",
      suffix: "-ion",
      meaningVi: "chuyển đổi, cải đạo -> sự chuyển đổi / cải đạo",
      suffixChoices: ["-ion", "-ment", "-ance", "-ity"],
      ruleTip: "Động từ kết thúc bằng '-t' thường phái sinh danh từ chỉ tiến trình/hành động với hậu tố '-sion / -tion' (convert ➔ conversion, divert ➔ diversion)."
    },
    {
      id: "u6-wf-2",
      adjective: "destitute",
      noun: "destitution",
      root: "destitut",
      suffix: "-ion",
      meaningVi: "cơ hàn, cùng khổ -> cảnh bần cùng cơ hàn",
      suffixChoices: ["-ion", "-ness", "-ity", "-ment"],
      ruleTip: "Tính từ đuôi '-ute' (Latin) bỏ 'e' thêm '-ion' tạo danh từ trạng thái cùng cực (destitute ➔ destitution, substitute ➔ substitution)."
    },
    {
      id: "u6-wf-3",
      adjective: "indignant",
      noun: "indignation",
      root: "indign",
      suffix: "-ation",
      meaningVi: "phẫn nộ vì bất công -> sự căm phẫn uất ức",
      suffixChoices: ["-ation", "-ity", "-ance", "-ment"],
      ruleTip: "Tính từ gốc '-ant' kết hợp gốc động từ 'indignari' (xúc phạm nhân phẩm) tạo danh từ trừu tượng hậu tố '-ation' (indignant ➔ indignation)."
    },
    {
      id: "u6-wf-4",
      adjective: "mischievous",
      noun: "mischief",
      root: "mischie",
      suffix: "-f",
      meaningVi: "tinh nghịch, quậy phá -> trò tinh nghịch / tai hại",
      suffixChoices: ["-f", "-ness", "-ity", "-ousness"],
      ruleTip: "Hiện tượng biến đổi gốc từ cổ Anglo-French: tính từ 'mischievous' phái sinh từ danh từ gốc 'mischief' (chữ 'f' biến thành '-vous' khi thành tính từ)."
    },
    {
      id: "u6-wf-5",
      adjective: "indict",
      noun: "indictment",
      root: "indict",
      suffix: "-ment",
      meaningVi: "truy tố, buộc tội -> bản cáo trạng",
      suffixChoices: ["-ment", "-tion", "-ance", "-ity"],
      ruleTip: "Động từ pháp lý 'indict' /ɪnˈdaɪt/ trực tiếp nhận hậu tố '-ment' tạo danh từ kết quả pháp lý: 'indictment' /ɪnˈdaɪt.mənt/ (bản cáo trạng)."
    },
    {
      id: "u6-wf-6",
      adjective: "vital",
      noun: "vitality",
      root: "vital",
      suffix: "-ity",
      meaningVi: "thiết yếu, đầy sinh lực -> sức sống, sinh khí",
      suffixChoices: ["-ity", "-ness", "-ment", "-ance"],
      ruleTip: "Tính từ đuôi '-al' chuyển sang danh từ phẩm chất bằng cách thêm '-ity', dịch chuyển trọng âm: 'vital ➔ vi'tality."
    },
    {
      id: "u6-wf-7",
      adjective: "subvert",
      noun: "subversion",
      root: "subvert",
      suffix: "-ion",
      meaningVi: "lật đổ, phá hoại ngầm -> sự lật đổ / phá hoại",
      suffixChoices: ["-ion", "-ment", "-ance", "-ity"],
      ruleTip: "Động từ tiếp đầu ngữ 'sub-' + gốc Latin 'vertere' (quay lật) tạo danh từ hành động tận cùng bằng '-version' (subvert ➔ subversion)."
    },
    {
      id: "u6-wf-8",
      adjective: "indigent",
      noun: "indigence",
      root: "indig",
      suffix: "-ence",
      meaningVi: "bần cùng túng thiếu -> cảnh nghèo khó bần hàn",
      suffixChoices: ["-ence", "-ity", "-ment", "-tion"],
      ruleTip: "Cặp biến đổi chuẩn Latin: tính từ tận cùng '-ent' chuyển hóa thành danh từ phẩm chất đuôi '-ence' (indigent ➔ indigence, diligent ➔ diligence)."
    },
    {
      id: "u6-wf-9",
      adjective: "condemn",
      noun: "condemnation",
      root: "condemn",
      suffix: "-ation",
      meaningVi: "lên án, kết án -> sự lên án công khai",
      suffixChoices: ["-ation", "-ment", "-ity", "-ance"],
      ruleTip: "Động từ 'condemn' kết thúc bằng âm câm 'mn' /-m/, khi gắn hậu tố '-ation' âm /n/ được phát âm rõ: 'condemnation' /ˌkɒn.dəmˈneɪ.ʃən/."
    },
    {
      id: "u6-wf-10",
      adjective: "adverse",
      noun: "adversity",
      root: "advers",
      suffix: "-ity",
      meaningVi: "bất lợi, khắc nghiệt -> nghịch cảnh",
      suffixChoices: ["-ity", "-ness", "-ment", "-tion"],
      ruleTip: "Tính từ chỉ điều kiện bất lợi 'adverse' nhận hậu tố '-ity' tạo danh từ chỉ tình cảnh éo le ngặt nghèo (adverse ➔ adversity)."
    },
    {
      id: "u6-wf-11",
      adjective: "afflict",
      noun: "affliction",
      root: "afflict",
      suffix: "-ion",
      meaningVi: "làm đau đớn đày đọa -> nỗi thống khổ tật nguyền",
      suffixChoices: ["-ion", "-ment", "-ance", "-ity"],
      ruleTip: "Động từ Latin 'affligere' (đánh gục) kết thúc bằng '-ct' nhận hậu tố '-ion' tạo danh từ trạng thái đau khổ (afflict ➔ affliction)."
    },
    {
      id: "u6-wf-12",
      adjective: "hard",
      noun: "hardship",
      root: "hard",
      suffix: "-ship",
      meaningVi: "gian nan khó khăn -> nỗi gian truân vất vả",
      suffixChoices: ["-ship", "-ness", "-ity", "-ment"],
      ruleTip: "Hậu tố gốc German '-ship' khi kết hợp với 'hard' chỉ hoàn cảnh gian lao cơ cực trong đời sống (hard ➔ hardship; khác với 'hardness' là độ cứng vật lý)."
    }
  ],

  // 3. Confusable Words (7 pairs from Page 25 Task Three)
  confusableWords: [
    {
      id: "u6-cw-1",
      pairKey: "cw-indigent-indigenous",
      wordA: "indigent",
      wordB: "indigenous",
      diffHighlightA: { before: "", highlight: "indigent", after: " (adj): bần cùng, túng quẫn (poor)" },
      diffHighlightB: { before: "", highlight: "indigenous", after: " (adj): bản địa, xuất xứ tự nhiên (native)" },
      promptSentence: "The pigeon is not ______, it was originally brought here by European settlers.",
      correctWord: "indigenous",
      defA: "indigent (adj): Extremely poor, needy, destitute.",
      defB: "indigenous (adj): Originating or occurring naturally in a particular place; native.",
      distinctionTip: "'Indigenous' chứa 'gen' (như 'generate/genesis' - cội nguồn sinh ra tại chỗ), còn 'indigent' mang nghĩa bần hàn, túng thiếu.",
      mnemonic: "INDIGENOUS = Gốc bản địa; INDIGENT = Cần tiền khẩn cấp vì bần hàn."
    },
    {
      id: "u6-cw-2",
      pairKey: "cw-diligent-indolent",
      wordA: "diligent",
      wordB: "indolent",
      diffHighlightA: { before: "", highlight: "diligent", after: " (adj): chăm chỉ, cần mẫn, chu đáo" },
      diffHighlightB: { before: "", highlight: "indolent", after: " (adj): lười biếng, biếng nhác, ươn hèn" },
      promptSentence: "He is a ______ student who always starts preparing weeks well before an exam.",
      correctWord: "diligent",
      defA: "diligent (adj): Having or showing care and conscientiousness in one's work.",
      defB: "indolent (adj): Wanting to avoid activity or exertion; lazy, idle.",
      distinctionTip: "'Diligent' = chăm học, cần cù siêng năng; 'Indolent' = lười nhác lười vận động, thích nằm ườn.",
      mnemonic: "DILIGENT là Đi-liên-tục (siêng năng); INDOLENT là Inactive/Idle (nằm lười)."
    },
    {
      id: "u6-cw-3",
      pairKey: "cw-adversity-adversary",
      wordA: "adversity",
      wordB: "adversary",
      diffHighlightA: { before: "", highlight: "adversity", after: " (n): nghịch cảnh, gian nan trắc trở" },
      diffHighlightB: { before: "", highlight: "adversary", after: " (n): đối thủ, kẻ thù địch (enemy/opponent)" },
      promptSentence: "I hear they had an unforgettable time cycling across Africa, even though they had to overcome much ______.",
      correctWord: "adversity",
      defA: "adversity (n): A difficult, unpleasant, or unfortunate situation or event.",
      defB: "adversary (n): One's opponent in a contest, conflict, dispute, or war.",
      distinctionTip: "Hậu tố '-ary' chỉ NGƯỜI (adversary = đối thủ, kẻ thù); hậu tố '-ity' chỉ TÌNH HUỐNG/TRẠNG THÁI (adversity = nghịch cảnh).",
      mnemonic: "ADVERSARY là Người đấu võ đài; ADVERSITY là Bão tuyết cản đường."
    },
    {
      id: "u6-cw-4",
      pairKey: "cw-afflict-inflict",
      wordA: "afflicted",
      wordB: "inflicted",
      diffHighlightA: { before: "", highlight: "afflict", after: " (v): làm đau đớn (thường bị động: afflicted with illness)" },
      diffHighlightB: { before: "", highlight: "inflict", after: " (v): giáng đòn, áp đặt đau thương (inflict sth ON sb)" },
      promptSentence: "Anna won't be able to come to work this entire week because she is ______ with the measles.",
      correctWord: "afflicted",
      defA: "afflict (v): Cause pain, trouble, or distress to (usually passive: be afflicted with an illness).",
      defB: "inflict (v): Cause something unwelcome or painful to be suffered by someone or something (inflict sth ON sb).",
      distinctionTip: "Cấu trúc vàng: 'be afflicted WITH' (mắc bệnh, chịu tật nguyền) đối lập với 'inflict damage/pain ON somebody' (giáng đòn đau lên ai).",
      mnemonic: "Afflicted WITH = Bị bệnh tật đày đọa; Inflict ON = Giáng đòn trừng phạt."
    },
    {
      id: "u6-cw-5",
      pairKey: "cw-rush-rash",
      wordA: "rush",
      wordB: "rash",
      diffHighlightA: { before: "", highlight: "rush", after: " (v/n): vội vã, hối hả di chuyển gấp" },
      diffHighlightB: { before: "", highlight: "rash", after: " (adj): hấp tấp, thiếu suy nghĩ, liều lĩnh bốc đồng" },
      promptSentence: "Don't you think it was rather ______ of Jodie to accept the job overseas without even visiting first?",
      correctWord: "rash",
      defA: "rush (v/n): Move or act with urgent haste; a sudden rapid movement.",
      defB: "rash (adj): Acting or done without careful consideration of the possible consequences.",
      distinctionTip: "'Rush' là hành động di chuyển nhanh; 'rash' là tính từ chỉ quyết định nông nổi, thiếu suy xét chín chắn ('a rash decision').",
      mnemonic: "RASH DECISION = Quyết định bốc đồng; RUSH HOUR = Giờ cao điểm vội vã."
    },
    {
      id: "u6-cw-6",
      pairKey: "cw-avert-divert",
      wordA: "averts",
      wordB: "diverts",
      diffHighlightA: { before: "", highlight: "avert", after: " (v): quay đi (ánh mắt), ngăn ngừa thảm họa" },
      diffHighlightB: { before: "", highlight: "divert", after: " (v): chuyển hướng dòng chảy/chú ý, làm xao nhãng" },
      promptSentence: "He can't stand the sight of blood and always ______ his eyes during gruesome surgical scenes.",
      correctWord: "averts",
      defA: "avert (v): Turn away one's eyes or thoughts; also prevent or ward off an undesirable occurrence.",
      defB: "divert (v): Cause someone or something to change course or turn from one direction to another; distract attention.",
      distinctionTip: "Collocation điển hình: 'avert one's eyes/gaze' (ngoảnh mặt đi không nhìn) hoặc 'avert a crisis' (ngăn chặn khủng hoảng). 'Divert' dùng cho chuyển hướng luồng xe cộ, kênh rạch, hoặc đánh lạc hướng.",
      mnemonic: "AVERT EYES = Quay mặt tránh nhìn; DIVERT TRAFFIC = Phân luồng xe cộ."
    },
    {
      id: "u6-cw-7",
      pairKey: "cw-convert-subvert",
      wordA: "convert",
      wordB: "subvert",
      diffHighlightA: { before: "", highlight: "convert", after: " (v): chuyển đổi công năng; cải đạo tôn giáo" },
      diffHighlightB: { before: "", highlight: "subvert", after: " (v): lật đổ, phá hoại ngầm thẩm quyền/chế độ" },
      promptSentence: "See that man in the dark suit handing out pamphlets? He is trying to ______ passers-by to his religious sect.",
      correctWord: "convert",
      defA: "convert (v): Change form, character, or function; persuade someone to change religious faith or belief.",
      defB: "subvert (v): Undermine the power and authority of an established system or institution.",
      distinctionTip: "'Convert to a religion' = cải đạo tôn giáo; 'Subvert democracy/the government' = phá hoại thể chế ngầm.",
      mnemonic: "CONVERT = Đổi đạo / Chuyển dạng; SUBVERT = Đào chân tường lật đổ."
    }
  ],

  // 4. Synonym Filter (3 Challenges)
  synonymFilter: [
    {
      id: "u6-sf-1",
      targetWord: "CALAMITY & DISASTER",
      targetMeaning: "Đại họa, thảm họa thảm khốc tàn phá nghiêm trọng",
      note: "Chọn 4 từ KHÔNG thuộc nhóm đại họa / thảm họa để loại bỏ khỏi danh sách",
      words: [
        { word: "catastrophe", isSynonym: true, meaningVi: "Đại thảm họa kinh hoàng" },
        { word: "cataclysm", isSynonym: true, meaningVi: "Biến cố thảm họa địa chấn/xã hội" },
        { word: "tragedy", isSynonym: true, meaningVi: "Bi kịch thương tâm" },
        { word: "devastation", isSynonym: true, meaningVi: "Sự tàn phá hoang tàn" },
        { word: "windfall", isSynonym: false, meaningVi: "Món tiền/lộc bất ngờ từ trên trời rơi xuống" },
        { word: "affliction", isSynonym: true, meaningVi: "Nỗi thống khổ tật bệnh đày đọa" },
        { word: "boon", isSynonym: false, meaningVi: "Mối lợi lớn, điều phúc lành may mắn" },
        { word: "bonanza", isSynonym: false, meaningVi: "Cơ hội bội thu / mỏ vàng sinh lời" },
        { word: "misfortune", isSynonym: true, meaningVi: "Bất hạnh, vận hạn lớn" },
        { word: "triumph", isSynonym: false, meaningVi: "Chiến thắng hiển hách vẻ vang" },
        { word: "upheaval", isSynonym: true, meaningVi: "Cơn biến động dữ dội" },
        { word: "adversity", isSynonym: true, meaningVi: "Nghịch cảnh ngặt nghèo" }
      ]
    },
    {
      id: "u6-sf-2",
      targetWord: "DESTITUTE & IMPOVERISHED",
      targetMeaning: "Bần cùng, cơ hàn, túng thiếu cùng cực không nơi nương tựa",
      note: "Chọn 4 từ mang nghĩa GIÀU CÓ, DƯ DẢ để loại trừ",
      words: [
        { word: "indigent", isSynonym: true, meaningVi: "Bần hàn túng quẫn" },
        { word: "penniless", isSynonym: true, meaningVi: "Không một xu dính túi" },
        { word: "opulent", isSynonym: false, meaningVi: "Xa hoa, giàu có nứt đố đổ vách" },
        { word: "hard up", isSynonym: true, meaningVi: "Túng quẫn, kẹt tiền" },
        { word: "affluent", isSynonym: false, meaningVi: "Khá giả, sung túc giàu sang" },
        { word: "impecunious", isSynonym: true, meaningVi: "Nghèo xơ xác, thiếu tiền thường xuyên" },
        { word: "prosperous", isSynonym: false, meaningVi: "Phồn vinh, phát đạt thịnh vượng" },
        { word: "insolvent", isSynonym: true, meaningVi: "Vỡ nợ, mất khả năng thanh toán" },
        { word: "well-heeled", isSynonym: false, meaningVi: "Lắm của nhiều tiền, giàu sụ" },
        { word: "squalid", isSynonym: true, meaningVi: "Tồi tàn nhớp nhúa vì cảnh nghèo" },
        { word: "beggarly", isSynonym: true, meaningVi: "Ăn mày, nghèo rớt mồng tơi" },
        { word: "destitute", isSynonym: true, meaningVi: "Trắng tay, thiếu thốn mọi nhu yếu phẩm" }
      ]
    },
    {
      id: "u6-sf-3",
      targetWord: "DOWNTRODDEN & OPPRESSED",
      targetMeaning: "Bị áp bức bóc lột, bị chà đạp ngược đãi dưới ách thống trị",
      note: "Chọn 4 từ miêu tả sự CƯNG CHIỀU, ĐẶC QUYỀN để loại trừ",
      words: [
        { word: "subjugated", isSynonym: true, meaningVi: "Bị khuất phục, bị biến thành nô dịch" },
        { word: "tyrannized", isSynonym: true, meaningVi: "Bị cai trị bạo tàn chuyên chế" },
        { word: "pampered", isSynonym: false, meaningVi: "Được nuông chiều sung sướng trong nhung lụa" },
        { word: "persecuted", isSynonym: true, meaningVi: "Bị truy bức, ngược đãi tàn nhẫn" },
        { word: "privileged", isSynonym: false, meaningVi: "Đầy đặc quyền đặc lợi" },
        { word: "exploited", isSynonym: true, meaningVi: "Bị bóc lột sức lao động thậm tệ" },
        { word: "lionized", isSynonym: false, meaningVi: "Được tôn sùng, tâng bốc như nhân vật kiệt xuất" },
        { word: "mistreated", isSynonym: true, meaningVi: "Bị đối xử tồi tệ, tệ bạc" },
        { word: "burdened", isSynonym: true, meaningVi: "Bị đè nặng bởi gánh nặng áp bức" },
        { word: "cosseted", isSynonym: false, meaningVi: "Được nâng niu bao bọc như trứng mỏng" },
        { word: "victimized", isSynonym: true, meaningVi: "Bị biến thành nạn nhân oan ức" },
        { word: "maltreated", isSynonym: true, meaningVi: "Bị ngược đãi tàn tệ" }
      ]
    }
  ],

  // 5. Smart Cloze (Passage 1: Page 25 Task 4 | Passage 2: Page 26 Part A)
  clozePassages: [
    {
      id: "u6-cp-1",
      title: "Academic Freedom in Higher Education",
      sourceLabel: "Page 25 — Task Four",
      passageTemplate: "Academic freedom is based on the principle that the {{gap_1}} of an institution of higher learning is to increase and preserve knowledge, evaluate it, and {{gap_2}} it to others. For the institution to {{gap_3}} this function, its scholars must be free to {{gap_4}} and express views which at times can be unpopular or {{gap_5}} mistaken, {{gap_6}} it is only through an open exchange of varying points of view that ideas can be tested and knowledge {{gap_7}}. However, {{gap_8}} interpretations of the limits and {{gap_9}} of academic freedom have often led to {{gap_10}} between teachers and the governing boards of educational institutions.",
      gaps: [
        {
          gapNumber: 1,
          options: [
            { label: "a", text: "function" },
            { label: "b", text: "fraction" }
          ],
          correctLabel: "a",
          correctWord: "function",
          targetWord: "function",
          explanationVi: "the function of an institution: chức năng / sứ mệnh chính của một cơ sở giáo dục đại học."
        },
        {
          gapNumber: 2,
          options: [
            { label: "a", text: "impair" },
            { label: "b", text: "impart" }
          ],
          correctLabel: "b",
          correctWord: "impart",
          targetWord: "impart",
          explanationVi: "impart knowledge to others: truyền đạt / phổ biến tri thức cho người khác ('impart sth to sb')."
        },
        {
          gapNumber: 3,
          options: [
            { label: "a", text: "perform" },
            { label: "b", text: "carry" }
          ],
          correctLabel: "a",
          correctWord: "perform",
          targetWord: "perform",
          explanationVi: "perform a function: thực hiện / hoàn thành chức năng nhiệm vụ (collocation chuẩn: perform a function/role)."
        },
        {
          gapNumber: 4,
          options: [
            { label: "a", text: "do" },
            { label: "b", text: "hold" }
          ],
          correctLabel: "b",
          correctWord: "hold",
          targetWord: "hold",
          explanationVi: "hold and express views: nắm giữ và bày tỏ quan điểm cá nhân (collocation: hold a view/belief)."
        },
        {
          gapNumber: 5,
          options: [
            { label: "a", text: "even" },
            { label: "b", text: "much" }
          ],
          correctLabel: "a",
          correctWord: "even",
          targetWord: "even",
          explanationVi: "even mistaken: thậm chí là sai lầm (phó từ tăng tiến nhấn mạnh mức độ)."
        },
        {
          gapNumber: 6,
          options: [
            { label: "a", text: "which" },
            { label: "b", text: "for" }
          ],
          correctLabel: "b",
          correctWord: "for",
          targetWord: "for",
          explanationVi: "for it is only through...: liên từ chỉ nguyên nhân trang trọng mang nghĩa 'bởi vì' (for = because/since)."
        },
        {
          gapNumber: 7,
          options: [
            { label: "a", text: "advanced" },
            { label: "b", text: "commenced" }
          ],
          correctLabel: "a",
          correctWord: "advanced",
          targetWord: "advanced",
          explanationVi: "knowledge advanced: tri thức được phát triển và nâng cao lên tầm mới (advance knowledge)."
        },
        {
          gapNumber: 8,
          options: [
            { label: "a", text: "conflicting" },
            { label: "b", text: "inflicting" }
          ],
          correctLabel: "a",
          correctWord: "conflicting",
          targetWord: "conflicting",
          explanationVi: "conflicting interpretations: những cách diễn giải mâu thuẫn / xung đột lẫn nhau."
        },
        {
          gapNumber: 9,
          options: [
            { label: "a", text: "prohibitions" },
            { label: "b", text: "negotiations" }
          ],
          correctLabel: "a",
          correctWord: "prohibitions",
          targetWord: "prohibitions",
          explanationVi: "limits and prohibitions: các giới hạn và điều nghiêm cấm quy định."
        },
        {
          gapNumber: 10,
          options: [
            { label: "a", text: "displays" },
            { label: "b", text: "disputes" }
          ],
          correctLabel: "b",
          correctWord: "disputes",
          targetWord: "disputes",
          explanationVi: "led to disputes: dẫn tới các cuộc tranh chấp / bất đồng gay gắt (disputes between A and B)."
        }
      ]
    },
    {
      id: "u6-cp-2",
      title: "Natural Disasters and Historic Calamities in the US",
      sourceLabel: "Page 26 — Part A",
      passageTemplate: "On a yearly {{gap_11}}, the United States is afflicted by hurricanes on the east coast, flooding in the midwest, forest fires, earthquakes, and any number of tornadoes, blizzards and storms. Historically, the weather has {{gap_12}} as harsh a chord in people's lives as any we feel today. Historians list the four major events to wreak devastation on the country as the Chicago fire of 1871, the Johnstown flood of 1889, the Galveston hurricane of 1900, and the San Francisco earthquake of 1906. These disasters provide a(n) {{gap_13}} of the havoc nature's storms have wrecked on humanity, and our reactions to them. Galveston, Texas, located on the island of Galveston in the gulf of New Mexico, thrives on industry and exports. Its over 30,000 citizens in the early 1900s were generally economically successful and comfortable with {{gap_14}} conditions. Until the ill-fated morning of Sept. 7, 1900, the people of Galveston enjoyed their life on the remote island. However, weather watchers had been following a growing storm in the Atlantic for several days and were warning of the impending danger of a hurricane. Unfortunately, people ignored the warnings. A day after the hurricane had hit the island, all that remained of the beautiful city was a mass of crumbled buildings, debris and forlorn, hopeless survivors wandering aimlessly with the stench of rotting flesh all around. It is {{gap_15}} that over 8,000 people and most of the animals died that day, victims of one of the deadliest natural disasters in U.S. history. Chicago's 'storm' of 1871, although {{gap_16}} to the hurricanes of the southeastern coast, was described by poet John Greenleaf Whittier as a 'fiery hurricane' that struck the great city with such {{gap_17}} that two days later, half of the city had been destroyed and 300 lives lost. Those relating the events of that catastrophic 'hurricane' say that too little rain and a strong wind blowing off the prairie had been the cause behind the destruction of the Windy City. According to {{gap_18}}, however, responsibility was placed on one slovenly cow who kicked over a lantern in her barn somewhere in the southwest corner of Chicago, igniting the dry and highly flammable barn and ultimately bringing destruction to a large part of the city. Two days after the sparks ignited, a steady rain on the burning city put out the flames and within days hope had returned. Signs that the city was beginning to heal became {{gap_19}} everywhere: soon new buildings were {{gap_20}} the burned, and the lifeblood of the ravaged city was being restored.",
      gaps: [
        {
          gapNumber: 11,
          options: [
            { label: "A", text: "foundation" },
            { label: "B", text: "theory" },
            { label: "C", text: "basis" },
            { label: "D", text: "institution" }
          ],
          correctLabel: "C",
          correctWord: "basis",
          targetWord: "basis",
          explanationVi: "on a yearly basis: diễn ra trên cơ sở hàng năm / định kỳ mỗi năm (collocation: on a daily/yearly basis)."
        },
        {
          gapNumber: 12,
          options: [
            { label: "A", text: "punched" },
            { label: "B", text: "struck" },
            { label: "C", text: "pinched" },
            { label: "D", text: "played" }
          ],
          correctLabel: "B",
          correctWord: "struck",
          targetWord: "struck",
          explanationVi: "struck as harsh a chord: gảy lên một nốt nhạc chát chúa / gây tác động dữ dội đến đời sống con người (strike a chord)."
        },
        {
          gapNumber: 13,
          options: [
            { label: "A", text: "scent" },
            { label: "B", text: "flavour" },
            { label: "C", text: "recipe" },
            { label: "D", text: "ingredient" }
          ],
          correctLabel: "B",
          correctWord: "flavour",
          targetWord: "flavour",
          explanationVi: "provide a flavour of: mang lại một hình dung cụ thể / cho ta nếm trải hương vị thực tế về sự tàn phá."
        },
        {
          gapNumber: 14,
          options: [
            { label: "A", text: "existing" },
            { label: "B", text: "remaining" },
            { label: "C", text: "enduring" },
            { label: "D", text: "staying" }
          ],
          correctLabel: "A",
          correctWord: "existing",
          targetWord: "existing",
          explanationVi: "existing conditions: các điều kiện hiện có / tình hình thực tế đương thời."
        },
        {
          gapNumber: 15,
          options: [
            { label: "A", text: "anticipated" },
            { label: "B", text: "predicted" },
            { label: "C", text: "estimated" },
            { label: "D", text: "forecast" }
          ],
          correctLabel: "C",
          correctWord: "estimated",
          targetWord: "estimated",
          explanationVi: "it is estimated that: người ta ước tính rằng (ước lượng con số thiệt hại về người và của sau thảm họa)."
        },
        {
          gapNumber: 16,
          options: [
            { label: "A", text: "disconnected" },
            { label: "B", text: "unaccustomed" },
            { label: "C", text: "unrelated" },
            { label: "D", text: "discredited" }
          ],
          correctLabel: "C",
          correctWord: "unrelated",
          targetWord: "unrelated",
          explanationVi: "unrelated to: hoàn toàn không có mối liên quan nào với (vụ hỏa hoạn Chicago không liên quan bão biển)."
        },
        {
          gapNumber: 17,
          options: [
            { label: "A", text: "stimulus" },
            { label: "B", text: "force" },
            { label: "C", text: "charisma" },
            { label: "D", text: "constraint" }
          ],
          correctLabel: "B",
          correctWord: "force",
          targetWord: "force",
          explanationVi: "struck with such force: tấn công với một cường lực khủng khiếp đến mức thiêu rụi nửa thành phố."
        },
        {
          gapNumber: 18,
          options: [
            { label: "A", text: "tradition" },
            { label: "B", text: "culture" },
            { label: "C", text: "phenomenon" },
            { label: "D", text: "legend" }
          ],
          correctLabel: "D",
          correctWord: "legend",
          targetWord: "legend",
          explanationVi: "according to legend: theo giai thoại dân gian truyền miệng (chuyện chú bò đá đổ đèn lồng của bà O'Leary)."
        },
        {
          gapNumber: 19,
          options: [
            { label: "A", text: "concealed" },
            { label: "B", text: "notorious" },
            { label: "C", text: "obscure" },
            { label: "D", text: "evident" }
          ],
          correctLabel: "D",
          correctWord: "evident",
          targetWord: "evident",
          explanationVi: "became evident: trở nên hiển hiện rõ ràng trước mắt mọi người (dấu hiệu phục hồi bắt đầu thấy rõ)."
        },
        {
          gapNumber: 20,
          options: [
            { label: "A", text: "replacing" },
            { label: "B", text: "rebuilding" },
            { label: "C", text: "designing" },
            { label: "D", text: "refurbishing" }
          ],
          correctLabel: "A",
          correctWord: "replacing",
          targetWord: "replacing",
          explanationVi: "new buildings were replacing the burned: các tòa nhà mới xây đã thay thế cho những tàn tích cháy rụi."
        }
      ]
    }
  ],

  // 6. Speed Blitz (20 questions: 10 from Page 24 Task 1 + 10 from Page 26 Part B)
  speedBlitz: [
    {
      id: "u6-sb-1",
      questionNumber: 1,
      prompt: "People living in squalid conditions live in ______.",
      options: [
        { key: "a", text: "wretched conditions" },
        { key: "b", text: "clean conditions" },
        { key: "c", text: "luxurious surroundings" },
        { key: "d", text: "remote rural villages" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "wretched conditions", pos: "collocation", vi: "Chính xác: squalid = tồi tàn, dơ bẩn, khốn cùng tột bậc" },
        { key: "b", word: "clean conditions", pos: "n", vi: "Trái nghĩa hoàn toàn: điều kiện sạch sẽ ngăn nắp" },
        { key: "c", word: "luxurious surroundings", pos: "n", vi: "Không phù hợp: khung cảnh sang trọng xa hoa" },
        { key: "d", word: "remote rural villages", pos: "n", vi: "Lạc đề: làng mạc nông thôn hẻo lánh" }
      ]
    },
    {
      id: "u6-sb-2",
      questionNumber: 2,
      prompt: "A derelict house is ______.",
      options: [
        { key: "a", text: "posh and well-constructed" },
        { key: "b", text: "ramshackle and run-down" },
        { key: "c", text: "solidly built of stone" },
        { key: "d", text: "newly refurbished" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "posh", pos: "adj", vi: "Trái nghĩa: sang chảnh, bề thế" },
        { key: "b", word: "ramshackle and run-down", pos: "collocation", vi: "Chính xác: derelict = hoang tàn, xiêu vẹo, đổ nát bị bỏ hoang" },
        { key: "c", word: "solidly built", pos: "adj", vi: "Sai nghĩa: xây dựng kiên cố" },
        { key: "d", word: "newly refurbished", pos: "adj", vi: "Sai nghĩa: vừa được tân trang mới" }
      ]
    },
    {
      id: "u6-sb-3",
      questionNumber: 3,
      prompt: "If you are hard up, you ______.",
      options: [
        { key: "a", text: "have enough money" },
        { key: "b", text: "are physically exhausted" },
        { key: "c", text: "don't have enough money" },
        { key: "d", text: "are strictly disciplined" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "have enough money", pos: "phrase", vi: "Trái nghĩa: có đủ tiền bạc" },
        { key: "b", word: "exhausted", pos: "adj", vi: "Sai nghĩa: kiệt sức (đó là 'hard-pressed' hoặc 'run down')" },
        { key: "c", word: "don't have enough money", pos: "phrase", vi: "Chính xác: hard up = túng bấn, cháy túi, thiếu thốn tiền tiêu" },
        { key: "d", word: "disciplined", pos: "adj", vi: "Sai nghĩa: kỷ luật nghiêm ngặt" }
      ]
    },
    {
      id: "u6-sb-4",
      questionNumber: 4,
      prompt: "A jerry-built house is ______.",
      options: [
        { key: "a", text: "well constructed" },
        { key: "b", text: "badly constructed" },
        { key: "c", text: "designed by an architect" },
        { key: "d", text: "historically preserved" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "well constructed", pos: "adj", vi: "Trái nghĩa: thi công chắc chắn" },
        { key: "b", word: "badly constructed", pos: "collocation", vi: "Chính xác: jerry-built = xây dựng cẩu thả, bằng vật liệu rẻ tiền kém chất lượng" },
        { key: "c", word: "architect-designed", pos: "adj", vi: "Sai nghĩa: do kiến trúc sư thiết kế" },
        { key: "d", word: "historically preserved", pos: "adj", vi: "Sai nghĩa: bảo tồn di tích" }
      ]
    },
    {
      id: "u6-sb-5",
      questionNumber: 5,
      prompt: "A poor person is ______.",
      options: [
        { key: "a", text: "wealthy and affluent" },
        { key: "b", text: "indigent and destitute" },
        { key: "c", text: "frugal and thrifty" },
        { key: "d", text: "pampered and idle" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "affluent", pos: "adj", vi: "Trái nghĩa: giàu nứt đố đổ vách" },
        { key: "b", word: "indigent and destitute", pos: "collocation", vi: "Chính xác: indigent/destitute = bần cùng nghèo khổ, túng quẫn thiếu thốn" },
        { key: "c", word: "frugal", pos: "adj", vi: "Sai nghĩa: tiết kiệm, chắt chiu" },
        { key: "d", word: "pampered", pos: "adj", vi: "Sai nghĩa: được nuông chiều" }
      ]
    },
    {
      id: "u6-sb-6",
      questionNumber: 6,
      prompt: "A mishap, such as losing one's scarf, is a ______.",
      options: [
        { key: "a", text: "serious misfortune" },
        { key: "b", text: "life-threatening calamity" },
        { key: "c", text: "minor misfortune" },
        { key: "d", text: "deliberate provocation" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "serious misfortune", pos: "n", vi: "Sai cấp độ: bất hạnh nghiêm trọng" },
        { key: "b", word: "calamity", pos: "n", vi: "Sai cấp độ: thảm họa sinh tử" },
        { key: "c", word: "minor misfortune", pos: "collocation", vi: "Chính xác: mishap = rủi ro nhỏ không may, tai nạn lặt vặt" },
        { key: "d", word: "provocation", pos: "n", vi: "Sai nghĩa: hành vi khiêu khích có chủ ý" }
      ]
    },
    {
      id: "u6-sb-7",
      questionNumber: 7,
      prompt: "A mischievous boy behaves in a way people ______.",
      options: [
        { key: "a", text: "approve of" },
        { key: "b", text: "disapprove of" },
        { key: "c", text: "admire greatly" },
        { key: "d", text: "reward handsomely" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "approve of", pos: "v", vi: "Trái nghĩa: tán thành" },
        { key: "b", word: "disapprove of", pos: "collocation", vi: "Chính xác: mischievous = nghịch ngợm, quậy phá gây khó chịu khiến người lớn không đồng tình" },
        { key: "c", word: "admire", pos: "v", vi: "Sai nghĩa: ngưỡng mộ sâu sắc" },
        { key: "d", word: "reward", pos: "v", vi: "Sai nghĩa: thưởng hậu hĩnh" }
      ]
    },
    {
      id: "u6-sb-8",
      questionNumber: 8,
      prompt: "Downtrodden people are invariably ______.",
      options: [
        { key: "a", text: "oppressed" },
        { key: "b", text: "pampered" },
        { key: "c", text: "honored" },
        { key: "d", text: "complacent" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "oppressed", pos: "adj", vi: "Chính xác: downtrodden = bị áp bức, bị chà đạp tàn tệ" },
        { key: "b", word: "pampered", pos: "adj", vi: "Trái nghĩa: được cưng chiều nâng niu" },
        { key: "c", word: "honored", pos: "adj", vi: "Trái nghĩa: được vinh danh" },
        { key: "d", word: "complacent", pos: "adj", vi: "Sai nghĩa: tự mãn, bằng lòng" }
      ]
    },
    {
      id: "u6-sb-9",
      questionNumber: 9,
      prompt: "A brawl is a ______ , usually in a public place.",
      options: [
        { key: "a", text: "peaceful discussion" },
        { key: "b", text: "fight" },
        { key: "c", text: "political rally" },
        { key: "d", text: "business transaction" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "discussion", pos: "n", vi: "Sai nghĩa: cuộc thảo luận hòa bình" },
        { key: "b", word: "fight", pos: "n", vi: "Chính xác: brawl = vụ ẩu đả, đánh nhau ầm ĩ nơi công cộng" },
        { key: "c", word: "rally", pos: "n", vi: "Sai nghĩa: cuộc mít tinh chính trị" },
        { key: "d", word: "transaction", pos: "n", vi: "Sai nghĩa: giao dịch thương mại" }
      ]
    },
    {
      id: "u6-sb-10",
      questionNumber: 10,
      prompt: "When you prove your mettle, you show you are ______ to do things.",
      options: [
        { key: "a", text: "unable" },
        { key: "b", text: "reluctant" },
        { key: "c", text: "able" },
        { key: "d", text: "afraid" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "unable", pos: "adj", vi: "Trái nghĩa: không có năng lực" },
        { key: "b", word: "reluctant", pos: "adj", vi: "Sai nghĩa: miễn cưỡng" },
        { key: "c", word: "able", pos: "adj", vi: "Chính xác: prove one's mettle = chứng tỏ bản lĩnh, năng lực dũng cảm làm được việc" },
        { key: "d", word: "afraid", pos: "adj", vi: "Trái nghĩa: sợ sệt" }
      ]
    },
    {
      id: "u6-sb-11",
      questionNumber: 11,
      prompt: "An international hotel has recently been built on the ______ of the old school.",
      options: [
        { key: "a", text: "expedition" },
        { key: "b", text: "landscape" },
        { key: "c", text: "site" },
        { key: "d", text: "ground" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "expedition", pos: "n", vi: "Sai nghĩa: chuyến thám hiểm" },
        { key: "b", word: "landscape", pos: "n", vi: "Sai nghĩa: phong cảnh" },
        { key: "c", word: "site", pos: "n", vi: "Chính xác: on the site of = trên nền / khu đất của trường cũ" },
        { key: "d", word: "ground", pos: "n", vi: "Không dùng số ít cho khu đất công trình (thường là 'grounds' hoặc 'on the site')" }
      ]
    },
    {
      id: "u6-sb-12",
      questionNumber: 12,
      prompt: "He was ______ manslaughter after the tragic accident.",
      options: [
        { key: "a", text: "indicted for" },
        { key: "b", text: "blamed for" },
        { key: "c", text: "condemned to" },
        { key: "d", text: "respected for" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "indicted for", pos: "collocation", vi: "Chính xác: be indicted for manslaughter = bị khởi tố / truy tố về tội ngộ sát" },
        { key: "b", word: "blamed for", pos: "phrase", vi: "Chỉ mang nghĩa khiển trách đời thường, không mang nghĩa tố tụng pháp lý chính thức" },
        { key: "c", word: "condemned to", pos: "phrase", vi: "Condemned to đi với hình phạt (death/prison), không đi với tên tội danh" },
        { key: "d", word: "respected for", pos: "phrase", vi: "Hoàn toàn trái ngữ cảnh: được tôn trọng" }
      ]
    },
    {
      id: "u6-sb-13",
      questionNumber: 13,
      prompt: "Many tax payers are ______ at what they regard as an illegal use of public funds.",
      options: [
        { key: "a", text: "indifferent" },
        { key: "b", text: "interested" },
        { key: "c", text: "happy" },
        { key: "d", text: "indignant" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "indifferent", pos: "adj", vi: "Sai nghĩa: thờ ơ vô cảm" },
        { key: "b", word: "interested", pos: "adj", vi: "Sai nghĩa: quan tâm" },
        { key: "c", word: "happy", pos: "adj", vi: "Sai ngữ cảnh: vui mừng" },
        { key: "d", word: "indignant", pos: "adj", vi: "Chính xác: indignant at = căm phẫn, bất bình trước điều bất công phi pháp" }
      ]
    },
    {
      id: "u6-sb-14",
      questionNumber: 14,
      prompt: "Due to the nature of the earthquake, a much larger ______ of the population might be affected.",
      options: [
        { key: "a", text: "segment" },
        { key: "b", text: "density" },
        { key: "c", text: "totality" },
        { key: "d", text: "division" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "segment", pos: "collocation", vi: "Chính xác: a segment of the population = một bộ phận dân cư" },
        { key: "b", word: "density", pos: "n", vi: "Sai nghĩa: mật độ dân số (density of population)" },
        { key: "c", word: "totality", pos: "n", vi: "Không tự nhiên: toàn thể" },
        { key: "d", word: "division", pos: "n", vi: "Sai nghĩa: sự phân chia" }
      ]
    },
    {
      id: "u6-sb-15",
      questionNumber: 15,
      prompt: "They continued fighting despite all the ______ they met with.",
      options: [
        { key: "a", text: "adversities" },
        { key: "b", text: "amenities" },
        { key: "c", text: "properties" },
        { key: "d", text: "liabilities" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "adversities", pos: "n", vi: "Chính xác: adversities = những nghịch cảnh, gian nan chông gai trắc trở" },
        { key: "b", word: "amenities", pos: "n", vi: "Trái nghĩa: tiện nghi đời sống" },
        { key: "c", word: "properties", pos: "n", vi: "Sai nghĩa: tài sản, thuộc tính" },
        { key: "d", word: "liabilities", pos: "n", vi: "Sai nghĩa: khoản nợ, gánh nặng pháp lý" }
      ]
    },
    {
      id: "u6-sb-16",
      questionNumber: 16,
      prompt: "He was in an extreme state of ______ when his wife left him.",
      options: [
        { key: "a", text: "calamity" },
        { key: "b", text: "mishap" },
        { key: "c", text: "distress" },
        { key: "d", text: "trial" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "calamity", pos: "n", vi: "Calamity là sự kiện thảm họa khách quan, không dùng 'state of calamity' cho tâm lý cá nhân" },
        { key: "b", word: "mishap", pos: "n", vi: "Sai nghĩa: sự cố lặt vặt" },
        { key: "c", word: "distress", pos: "collocation", vi: "Chính xác: state of distress = trạng thái đau đớn, hoảng loạn tinh thần tột độ" },
        { key: "d", word: "trial", pos: "n", vi: "Trial là gánh nặng thử thách, không đi với 'state of trial'" }
      ]
    },
    {
      id: "u6-sb-17",
      questionNumber: 17,
      prompt: "At length, it ______ him that his life wouldn't take a turn for the better unless he left his present employment.",
      options: [
        { key: "a", text: "dawned on" },
        { key: "b", text: "assumed that" },
        { key: "c", text: "happened to" },
        { key: "d", text: "realized that" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "dawned on", pos: "idiom", vi: "Chính xác: it dawned on sb that... = chợt lóe lên trong đầu ai nhận thức rõ ràng rằng" },
        { key: "b", word: "assumed", pos: "v", vi: "Chủ ngữ giả 'It' không dùng 'it assumed that'" },
        { key: "c", word: "happened to", pos: "v", vi: "Sai nghĩa: tình cờ xảy ra" },
        { key: "d", word: "realized", pos: "v", vi: "Chủ ngữ phải là người ('He realized that'), không dùng 'it realized him'" }
      ]
    },
    {
      id: "u6-sb-18",
      questionNumber: 18,
      prompt: "Unfortunately, not all scientists are working for a good ______.",
      options: [
        { key: "a", text: "end" },
        { key: "b", text: "aim" },
        { key: "c", text: "effect" },
        { key: "d", text: "cause" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "end", pos: "n", vi: "Thường dùng 'to a good end', không dùng 'for a good end'" },
        { key: "b", word: "aim", pos: "n", vi: "Không kết hợp với 'for a good aim'" },
        { key: "c", word: "effect", pos: "n", vi: "Sai nghĩa: hiệu quả" },
        { key: "d", word: "cause", pos: "collocation", vi: "Chính xác: work for a good cause = cống hiến cho một mục đích cao đẹp / chính nghĩa" }
      ]
    },
    {
      id: "u6-sb-19",
      questionNumber: 19,
      prompt: "The media are always keen on reporting ______.",
      options: [
        { key: "a", text: "mishaps" },
        { key: "b", text: "calamities" },
        { key: "c", text: "reverses" },
        { key: "d", text: "hardships" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "mishaps", pos: "n", vi: "Sự cố lặt vặt thường không đủ giật gân để báo chí quan tâm đưa tin rầm rộ" },
        { key: "b", word: "calamities", pos: "collocation", vi: "Chính xác: reporting calamities = đưa tin về các đại thảm họa động trời giật gân" },
        { key: "c", word: "reverses", pos: "n", vi: "Thất bại sự nghiệp cá nhân" },
        { key: "d", word: "hardships", pos: "n", vi: "Nỗi gian khổ trường kỳ" }
      ]
    },
    {
      id: "u6-sb-20",
      questionNumber: 20,
      prompt: "The threat of a general strike can only be ______ through government intervention.",
      options: [
        { key: "a", text: "averted" },
        { key: "b", text: "converted" },
        { key: "c", text: "subverted" },
        { key: "d", text: "diverted" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "averted", pos: "collocation", vi: "Chính xác: averted = ngăn chặn thành công mối hiểm họa (avert a strike/crisis/disaster)" },
        { key: "b", word: "converted", pos: "v", vi: "Sai nghĩa: chuyển đổi" },
        { key: "c", word: "subverted", pos: "v", vi: "Sai nghĩa: lật đổ ngầm" },
        { key: "d", word: "diverted", pos: "v", vi: "Sai nghĩa: chuyển hướng đường đi" }
      ]
    }
  ]
};


export const VOCAB_C1_UNIT_7: VocabC1Unit = {
  unitId: 7,
  title: "Unit 7: Diminution & Decline",
  subtitle: "The Vocabulary Files - Level C1 (Pages 27-30)",

  // 1. Words in Action (16 words from Page 27, 28, 30)
  wordsInAction: [
    {
      id: "u7-wia-1",
      word: "shrink",
      ipa: "/ʃrɪŋk/",
      nuance: "[Becomes smaller due to heat/water or shrinks back]",
      register: "General / Formal & Spoken",
      collocations: ["shrink from doing sth", "shrink in hot water", "shrinking market", "shrink to half its size"],
      enDef: "Become or make smaller in size or amount, especially because of the effect of heat or moisture; also move back in fear.",
      viDef: "Co lại, rút ngắn lại (do nhiệt độ, ngấm nước); hoặc thu hẹp quy mô số lượng.",
      example: "Your woolen jacket is much less likely to **shrink** if you have it professionally dry-cleaned.",
      targetKeyword: "shrink"
    },
    {
      id: "u7-wia-2",
      word: "wither",
      ipa: "/ˈwɪð.ər/",
      nuance: "[Dries up, dies, or loses vitality]",
      register: "Literary / Descriptive",
      collocations: ["wither away", "wither on the vine", "wither under scrutiny", "wither and die"],
      enDef: "Become dry and shriveled; fade away or lose vitality, force, or freshness.",
      viDef: "Khô héo, tàn úa (hoa lá); suy tàn, tiêu biến dần đi vì thiếu dưỡng chất hay sự chăm sóc.",
      example: "During autumn, the golden leaves turn brittle, **wither**, and gently carpet the woodland floor.",
      targetKeyword: "wither"
    },
    {
      id: "u7-wia-3",
      word: "dwindle",
      ipa: "/ˈdwɪn.dəl/",
      nuance: "[Gradual diminution in number or quantity]",
      register: "Formal / Written",
      collocations: ["dwindling resources", "dwindle away to nothing", "dwindling numbers", "dwindle rapidly"],
      enDef: "Diminish gradually in size, amount, or strength over a protracted period.",
      viDef: "Thu hẹp dần, vơi cạn dần, teo tóp dần (về số lượng, tài nguyên, danh tiếng).",
      example: "The number of young apprentices entering the traditional ceramic craft keeps **dwindling** year after year.",
      targetKeyword: "dwindle"
    },
    {
      id: "u7-wia-4",
      word: "contract",
      ipa: "/kənˈtrækt/",
      nuance: "[Becomes tight, narrow, or smaller in volume]",
      register: "Scientific / Formal",
      collocations: ["metals contract when cooled", "contract muscles", "contract the economy", "contract diseases"],
      enDef: "Decrease in size, number, or range; shrink or become narrower when cooled or tightened.",
      viDef: "Co lại, thắt lại (vật lý, cơ bắp); thu hẹp phạm vi kinh tế (trái nghĩa với expand).",
      example: "Physics dictates that most metals **contract** when chilled and expand significantly when heated.",
      targetKeyword: "contract"
    },
    {
      id: "u7-wia-5",
      word: "decline",
      ipa: "/dɪˈklaɪn/",
      nuance: "[Deterioration in quality/health, or polite refusal]",
      register: "Formal / Academic",
      collocations: ["declining health", "politely decline an invitation", "economic decline", "sharp decline"],
      enDef: "Diminish in strength, quality, or value; or politely refuse an offer, invitation, or request.",
      viDef: "Suy giảm, sa sút (về sức khỏe, kinh tế, phẩm chất); hoặc từ chối một cách nhã nhặn lịch thiệp.",
      example: "As his physical health had been rapidly **declining**, the elderly statesman was advised to retire to the country.",
      targetKeyword: "decline"
    },
    {
      id: "u7-wia-6",
      word: "lessen",
      ipa: "/ˈles.ən/",
      nuance: "[Makes less in estimation, value, or intensity]",
      register: "General / Formal",
      collocations: ["lessen the impact", "lessen the burden", "lessen the pain", "lessen the risk"],
      enDef: "Make or become less in size, estimation, degree, or importance.",
      viDef: "Làm giảm bớt, nhẹ bớt (mức độ nghiêm trọng, gánh nặng, nỗi đau, khoảng cách hành trình).",
      example: "Nothing could **lessen** the profound significance of the astronaut's heroic lunar landing.",
      targetKeyword: "lessen"
    },
    {
      id: "u7-wia-7",
      word: "impair",
      ipa: "/ɪmˈpeər/",
      nuance: "[Damages or weakens natural faculties/organs]",
      register: "Medical / Formal",
      collocations: ["impair vision", "impair judgement", "impair cognitive function", "impair hearing"],
      enDef: "Weaken or damage something, especially a human faculty or bodily function.",
      viDef: "Làm suy yếu, làm phương hại, làm hỏng (thị lực, thính giác, nhận thức, khả năng phán đoán).",
      example: "Reading in dim, flickering light for prolonged hours may severely **impair** your eyesight.",
      targetKeyword: "impair"
    },
    {
      id: "u7-wia-8",
      word: "affluence",
      ipa: "/ˈæf.lu.əns/",
      nuance: "[State of having abundant wealth and luxury]",
      register: "Formal / Academic",
      collocations: ["unprecedented affluence", "live in affluence", "affluent society", "growing affluence"],
      enDef: "The state of having a great deal of money, wealth, and material prosperity.",
      viDef: "Sự sung túc, giàu sang phú quý, đời sống nhung lụa dư dả.",
      example: "Many postwar citizens lived lives of comfort and **affluence** unimaginable a century earlier.",
      targetKeyword: "affluence"
    },
    {
      id: "u7-wia-9",
      word: "indigence",
      ipa: "/ˈɪn.dɪ.dʒəns/",
      nuance: "[State of severe poverty and destitution]",
      register: "Formal / Legal",
      collocations: ["plunge into indigence", "state of indigence", "relieve indigence", "poverty and indigence"],
      enDef: "A state of extreme poverty; destitution.",
      viDef: "Cảnh bần hàn, cùng quẫn, thiếu thốn mọi nguồn lực để sinh tồn.",
      example: "Despite the national boom, rural pockets remained trapped in perpetual squalor and **indigence**.",
      targetKeyword: "indigence"
    },
    {
      id: "u7-wia-10",
      word: "meager",
      ipa: "/ˈmiː.ɡər/",
      nuance: "[Lacking in quantity, fullness, or richness]",
      register: "Formal / Descriptive",
      collocations: ["meager wages", "meager diet", "meager resources", "meager earnings"],
      enDef: "Lacking in quantity or quality; lean, thin, or scanty.",
      viDef: "Ít ỏi, còm cõi, đạm bạc, gầy gò (tiền lương còm, khẩu phần ăn ít ỏi).",
      example: "It was astonishing how a family of five could survive on such **meager** monthly wages.",
      targetKeyword: "meager"
    },
    {
      id: "u7-wia-11",
      word: "abate",
      ipa: "/əˈbeɪt/",
      nuance: "[Hostile elements become less intense or cease]",
      register: "Formal / Literary",
      collocations: ["storm abated", "fury abated", "pain abated", "without abating"],
      enDef: "Become less intense, severe, or widespread (especially storms, anger, noise, or suffering).",
      viDef: "Dịu đi, lắng xuống, ngớt dần (cơn bão, cơn thịnh nộ, cơn đau).",
      example: "The sailors were finally able to hoist the sails and navigate out when the tempest **abated**.",
      targetKeyword: "abate"
    },
    {
      id: "u7-wia-12",
      word: "serene",
      ipa: "/səˈriːn/",
      nuance: "[Calm, peaceful, untroubled and tranquil]",
      register: "General / Literary",
      collocations: ["serene surroundings", "serene smile", "serene landscape", "serene atmosphere"],
      enDef: "Calm, peaceful, and untroubled; tranquil.",
      viDef: "Thanh bình, êm ả, thanh tịnh tĩnh lặng (khung cảnh, tâm hồn).",
      example: "I would relish the chance to live in these **serene** lakeside surroundings away from urban clamor.",
      targetKeyword: "serene"
    },
    {
      id: "u7-wia-13",
      word: "detain",
      ipa: "/dɪˈteɪn/",
      nuance: "[Kept in official custody or delayed]",
      register: "Legal / Formal",
      collocations: ["detained for questioning", "detained at the police station", "detained by customs", "unlawfully detained"],
      enDef: "Keep someone in official custody, typically for questioning about a crime; or delay someone.",
      viDef: "Tạm giữ, lưu giữ lại (để thẩm vấn); hoặc cầm chân ai đó.",
      example: "The prime suspect was **detained** at the metropolitan police station for further cross-examination.",
      targetKeyword: "detain"
    },
    {
      id: "u7-wia-14",
      word: "token",
      ipa: "/ˈtəʊ.kən/",
      nuance: "[Visible sign or small symbol of appreciation]",
      register: "Formal / Polite",
      collocations: ["token of gratitude", "token of appreciation", "token gesture", "token fee"],
      enDef: "A thing serving as a visible or tangible representation of a fact, quality, or feeling.",
      viDef: "Vật tượng trưng, biểu trưng, món quà mọn tỏ lòng biết ơn (token of gratitude).",
      example: "Please accept this handcrafted fountain pen as a modest **token** of our sincere gratitude.",
      targetKeyword: "token"
    },
    {
      id: "u7-wia-15",
      word: "scope",
      ipa: "/skəʊp/",
      nuance: "[Extent or opportunity for action/thinking]",
      register: "Academic / Formal",
      collocations: ["scope for creative thinking", "beyond the scope of", "broaden the scope", "limited scope"],
      enDef: "The opportunity or possibility to do or deal with something; or the extent of the area or subject matter.",
      viDef: "Đất diễn, cơ hội phát triển; hoặc phạm vi quy mô xem xét của một chủ đề.",
      example: "This repetitive assembly line occupation offers virtually no **scope** for creative thinking.",
      targetKeyword: "scope"
    },
    {
      id: "u7-wia-16",
      word: "undoing",
      ipa: "/ʌnˈduː.ɪŋ/",
      nuance: "[Fatal cause of ruin or downfall]",
      register: "Literary / Formal",
      collocations: ["be one's undoing", "bring about one's undoing", "fatal undoing", "pride was his undoing"],
      enDef: "A cause of someone's downfall, ruin, or destruction.",
      viDef: "Căn nguyên của sự suy bại, nguyên nhân dẫn tới sự hủy hoại hay sụp đổ cơ đồ.",
      example: "In the end, uncontrollable alcoholism and gambling debts proved to be his ultimate **undoing**.",
      targetKeyword: "undoing"
    }
  ],

  // 2. Word Formation (12 pairs from Page 28, 29, 30 & derivatives)
  wordFormation: [
    {
      id: "u7-wf-1",
      adjective: "deprive",
      noun: "deprivation",
      root: "depriv",
      suffix: "-ation",
      meaningVi: "tước đoạt -> sự tước đoạt, cảnh thiếu thốn",
      suffixChoices: ["-ation", "-ment", "-ence", "-ity"],
      ruleTip: "Động từ 'deprive' nhận hậu tố '-ation' tạo danh từ chỉ tình trạng bị tước mất các nhu yếu phẩm cơ bản (deprive ➔ deprivation)."
    },
    {
      id: "u7-wf-2",
      adjective: "nutrition",
      noun: "nutritional",
      root: "nutrition",
      suffix: "-al",
      meaningVi: "dinh dưỡng -> thuộc về dinh dưỡng",
      suffixChoices: ["-al", "-ic", "-ous", "-ary"],
      ruleTip: "Danh từ 'nutrition' nhận hậu tố quan hệ '-al' để tạo tính từ bổ nghĩa cho danh từ đi kèm: nutritional elements (các yếu tố dinh dưỡng)."
    },
    {
      id: "u7-wf-3",
      adjective: "starve",
      noun: "starvation",
      root: "starv",
      suffix: "-ation",
      meaningVi: "bỏ đói, chết đói -> nạn đói, sự chết đói",
      suffixChoices: ["-ation", "-ment", "-ence", "-ity"],
      ruleTip: "Động từ 'starve' bỏ 'e' thêm '-ation' tạo danh từ chỉ trạng thái suy kiệt cơ thể do đói lả (starve ➔ starvation)."
    },
    {
      id: "u7-wf-4",
      adjective: "deficient",
      noun: "deficiency",
      root: "defici",
      suffix: "-ency",
      meaningVi: "thiếu hụt -> sự thiếu hụt dinh dưỡng/khoáng chất",
      suffixChoices: ["-ency", "-ity", "-ness", "-ment"],
      ruleTip: "Tính từ gốc Latin đuôi '-ent' chuyển hóa thành danh từ phẩm chất hoặc sự thiếu sót với đuôi '-ency' (deficient ➔ deficiency)."
    },
    {
      id: "u7-wf-5",
      adjective: "sustain",
      noun: "sustainable",
      root: "sustain",
      suffix: "-able",
      meaningVi: "duy trì, chống đỡ -> có tính bền vững",
      suffixChoices: ["-able", "-ive", "-ous", "-ful"],
      ruleTip: "Động từ 'sustain' gắn hậu tố khả năng '-able' tạo tính từ cốt lõi trong lâm nghiệp và kinh tế: sustainable forestry (lâm nghiệp bền vững)."
    },
    {
      id: "u7-wf-6",
      adjective: "scarce",
      noun: "scarcity",
      root: "scarc",
      suffix: "-ity",
      meaningVi: "khan hiếm -> sự khan hiếm tài nguyên",
      suffixChoices: ["-ity", "-ness", "-ment", "-ence"],
      ruleTip: "Tính từ 'scarce' /skeəs/ bỏ 'e' nhận hậu tố '-ity' tạo danh từ trừu tượng kinh tế học: scarcity /ˈskeə.sə.ti/."
    },
    {
      id: "u7-wf-7",
      adjective: "prosper",
      noun: "prosperity",
      root: "prosper",
      suffix: "-ity",
      meaningVi: "phát đạt -> sự phồn vinh thịnh vượng",
      suffixChoices: ["-ity", "-ance", "-ment", "-tion"],
      ruleTip: "Gốc từ Latin 'prosper' gắn hậu tố '-ity' tạo danh từ trạng thái phát đạt phồn thịnh (prosper ➔ prosperity)."
    },
    {
      id: "u7-wf-8",
      adjective: "diminish",
      noun: "diminution",
      root: "diminu",
      suffix: "-tion",
      meaningVi: "suy giảm bớt -> sự suy giảm / hạ bớt",
      suffixChoices: ["-tion", "-ment", "-ence", "-ity"],
      ruleTip: "Biến đổi gốc từ cổ Latin: động từ 'diminish' phái sinh danh từ học thuật 'diminution' /ˌdɪm.ɪˈnjuː.ʃən/ (thay đổi đuôi '-ish' thành '-ution')."
    },
    {
      id: "u7-wf-9",
      adjective: "envious",
      noun: "envy",
      root: "env",
      suffix: "-y",
      meaningVi: "đố kỵ ghen tị -> lòng đố kỵ / sự ghen tị",
      suffixChoices: ["-y", "-ness", "-ment", "-tion"],
      ruleTip: "Danh từ gốc 'envy' phái sinh hai tính từ mang sắc thái đối lập: 'envious' (đố kỵ, ghen ghét) và 'enviable' (đáng mơ ước, đáng thèm muốn)."
    },
    {
      id: "u7-wf-10",
      adjective: "prosecute",
      noun: "prosecution",
      root: "prosecut",
      suffix: "-ion",
      meaningVi: "truy tố trước tòa -> sự truy tố, bên công tố",
      suffixChoices: ["-ion", "-ment", "-ance", "-ity"],
      ruleTip: "Động từ tư pháp đuôi '-ute' bỏ 'e' thêm '-ion' tạo danh từ vụ truy tố hoặc bên công tố viên (prosecute ➔ prosecution)."
    },
    {
      id: "u7-wf-11",
      adjective: "persecute",
      noun: "persecution",
      root: "persecut",
      suffix: "-ion",
      meaningVi: "bức hại đàn áp -> sự bức hại ngược đãi",
      suffixChoices: ["-ion", "-ment", "-ance", "-ity"],
      ruleTip: "Phân biệt với 'prosecute': 'persecute' (tiếp đầu ngữ per- = xuyên suốt, triệt để) chỉ hành vi bức hại tín ngưỡng/sắc tộc (persecution)."
    },
    {
      id: "u7-wf-12",
      adjective: "affluent",
      noun: "affluence",
      root: "afflu",
      suffix: "-ence",
      meaningVi: "giàu sang sung túc -> sự giàu sang phú quý",
      suffixChoices: ["-ence", "-ity", "-ment", "-tion"],
      ruleTip: "Tính từ Latin tận cùng '-ent' chuyển sang danh từ chỉ trạng thái dồi dào của cải với đuôi '-ence' (affluent ➔ affluence)."
    }
  ],

  // 3. Confusable Words (7 pairs from Page 29 Task Four)
  confusableWords: [
    {
      id: "u7-cw-1",
      pairKey: "cw-enviable-envious",
      wordA: "enviable",
      wordB: "envious",
      diffHighlightA: { before: "", highlight: "enviable", after: " (adj): đáng mơ ước, khiến người khác thèm muốn" },
      diffHighlightB: { before: "", highlight: "envious", after: " (adj): ghen tị, đố kỵ với người khác" },
      promptSentence: "He has got an ______ service record that any young officer in the battalion would be immensely proud of.",
      correctWord: "enviable",
      defA: "enviable (adj): Very desirable; so good that other people wish they had it.",
      defB: "envious (adj): Feeling or showing envy; jealous of another's advantages.",
      distinctionTip: "Hậu tố '-able' mang nghĩa 'đáng được thèm muốn' (an enviable position/record); 'envious' là tâm trạng ghen ăn tức ở (envious OF sb).",
      mnemonic: "ENVIABLE = Đáng ngưỡng mộ; ENVIOUS = Ghen ghét đố kỵ."
    },
    {
      id: "u7-cw-2",
      pairKey: "cw-persecuted-prosecuted",
      wordA: "persecuted",
      wordB: "prosecuted",
      diffHighlightA: { before: "", highlight: "persecuted", after: " (v): bị bức hại, ngược đãi vì sắc tộc/tôn giáo" },
      diffHighlightB: { before: "", highlight: "prosecuted", after: " (v): bị truy tố, khởi tố trước tòa án" },
      promptSentence: "He was ______ in the municipal magistrate's court for driving a motor vehicle without a valid license.",
      correctWord: "prosecuted",
      defA: "persecuted (v/adj): Subjected to hostility and ill-treatment, especially because of race or religious beliefs.",
      defB: "prosecuted (v): Instituted legal proceedings against someone in respect of a criminal charge.",
      distinctionTip: "'Prosecuted' là quy trình pháp lý tại tòa án (prosecute a crime); 'Persecuted' là bị đàn áp bất công ngoài xã hội.",
      mnemonic: "PROSECUTED có chữ O như CÔNG LÝ (pháp luật truy tố); PERSECUTED là áp bức tàn bạo."
    },
    {
      id: "u7-cw-3",
      pairKey: "cw-hazard-haphazard",
      wordA: "hazard",
      wordB: "haphazard",
      diffHighlightA: { before: "", highlight: "hazard", after: " (n): mối hiểm nguy, nguy cơ rủi ro (a health hazard)" },
      diffHighlightB: { before: "", highlight: "haphazard", after: " (adj): bừa bãi, ngẫu nhiên thiếu kế hoạch" },
      promptSentence: "Public health authorities continuously warn that long-term cigarette smoking is a grave health ______.",
      correctWord: "hazard",
      defA: "hazard (n): A danger or risk; a potential source of harm.",
      defB: "haphazard (adj): Lacking any obvious principle of organization; random.",
      distinctionTip: "'Health hazard' là collocation cố định (nguy cơ sức khỏe). 'Haphazard' là tính từ miêu tả sự bừa bãi không ngăn nắp.",
      mnemonic: "HEALTH HAZARD = Mối nguy sức khỏe; HAPHAZARD ARRANGEMENT = Sắp xếp lộn xộn."
    },
    {
      id: "u7-cw-4",
      pairKey: "cw-prospective-respective",
      wordA: "prospective",
      wordB: "respective",
      diffHighlightA: { before: "", highlight: "prospective", after: " (adj): tiềm năng, kỳ vọng trong tương lai" },
      diffHighlightB: { before: "", highlight: "respective", after: " (adj): tương ứng, riêng rẽ của từng đối tượng" },
      promptSentence: "After the lengthy session adjourned, the committee delegates were courteously escorted to their ______ hotel suites.",
      correctWord: "respective",
      defA: "prospective (adj): Expected or expecting to be something in the future; potential.",
      defB: "respective (adj): Belonging or relating separately to each of the two or more people or things previously mentioned.",
      distinctionTip: "'Respective' luôn đi kèm danh từ số nhiều ám chỉ của riêng từng người (their respective rooms); 'prospective' mang tính dự phóng tương lai (prospective buyer).",
      mnemonic: "RESPECTIVE ROOMS = Phòng riêng từng người; PROSPECTIVE CLIENT = Khách hàng tiềm năng."
    },
    {
      id: "u7-cw-5",
      pairKey: "cw-implicated-complicated",
      wordA: "implicated",
      wordB: "complicated",
      diffHighlightA: { before: "", highlight: "implicated", after: " (adj/v): bị dính líu, dính chàm trong bê bối/tội phạm" },
      diffHighlightB: { before: "", highlight: "complicated", after: " (adj): phức tạp, rắc rối khó hiểu" },
      promptSentence: "Several prominent ministerial officials were deeply ______ in the multi-million-dollar bribery scandal.",
      correctWord: "implicated",
      defA: "implicated (v/adj): Shown to be involved in a crime, conspiracy, or discreditable act.",
      defB: "complicated (adj): Consisting of many interconnected parts or elements; intricate and difficult.",
      distinctionTip: "Cấu trúc: 'be implicated IN a scandal/crime' = dính líu vào tội phạm; 'complicated' miêu tả bài toán hoặc thủ tục rườm rà.",
      mnemonic: "IMPLICATED IN CRIME = Nhúng chàm trong tội phạm; COMPLICATED PROBLEM = Bài toán hóc búa."
    },
    {
      id: "u7-cw-6",
      pairKey: "cw-masterly-masterful",
      wordA: "masterly",
      wordB: "masterful",
      diffHighlightA: { before: "", highlight: "masterly", after: " (adj): tài ba, điêu luyện bậc thầy (chuyên môn)" },
      diffHighlightB: { before: "", highlight: "masterful", after: " (adj): uy quyền, áp đảo, hách dịch ra lệnh" },
      promptSentence: "The imposing headmaster addressed the restless school assembly in an assertive, commanding, and ______ voice.",
      correctWord: "masterful",
      defA: "masterly (adj): Performed with exceptional, consummate skill or mastery.",
      defB: "masterful (adj): Powerful, assertive, and commanding; dominating.",
      distinctionTip: "'Masterly' khen ngợi tay nghề kỹ thuật xuất sắc ('a masterly performance'); 'masterful' nhấn mạnh tính uy quyền áp đặt ('a masterful tone of voice').",
      mnemonic: "MASTERLY PERFORMANCE = Màn trình diễn đỉnh cao; MASTERFUL VOICE = Giọng nói đầy uy quyền."
    },
    {
      id: "u7-cw-7",
      pairKey: "cw-morbid-chivalrous",
      wordA: "morbid",
      wordB: "chivalrous",
      diffHighlightA: { before: "", highlight: "morbid", after: " (adj): bệnh hoạn, u ám, ám ảnh cái chết rùng rợn" },
      diffHighlightB: { before: "", highlight: "chivalrous", after: " (adj): hào hiệp, nghĩa hiệp trọng danh dự" },
      promptSentence: "His fixation on gruesome post-mortem forensic reports reveals that he harbors a profoundly ______ imagination.",
      correctWord: "morbid",
      defA: "morbid (adj): Characterized by an abnormal and unhealthy interest in disturbing and unpleasant subjects, especially death and disease.",
      defB: "chivalrous (adj): Courteous, gallant, and noble, especially towards women.",
      distinctionTip: "'Morbid curiosity / imagination' là sự tò mò/trí tưởng tượng bệnh hoạn về tai nạn, xác chết; 'chivalrous' là tinh thần hiệp sĩ cao đẹp.",
      mnemonic: "MORBID = U ám bệnh hoạn; CHIVALROUS = Hào hiệp trượng nghĩa."
    }
  ],

  // 4. Synonym Filter (3 Challenges)
  synonymFilter: [
    {
      id: "u7-sf-1",
      targetWord: "DWINDLE & DECLINE",
      targetMeaning: "Suy giảm, hao mòn, teo tóp dần về số lượng hoặc quy mô",
      note: "Chọn 4 từ KHÔNG thuộc nhóm suy giảm (mang nghĩa bùng nổ, gia tăng) để loại bỏ",
      words: [
        { word: "shrink", isSynonym: true, meaningVi: "Thu nhỏ, co rút lại" },
        { word: "wane", isSynonym: true, meaningVi: "Khuyết dần, suy tàn dần" },
        { word: "diminish", isSynonym: true, meaningVi: "Giảm sút bớt" },
        { word: "burgeon", isSynonym: false, meaningVi: "Đâm chồi nảy lộc, phát triển bùng nổ" },
        { word: "contract", isSynonym: true, meaningVi: "Co hẹp thể tích lại" },
        { word: "lessen", isSynonym: true, meaningVi: "Làm nhẹ bớt, hạ giảm" },
        { word: "proliferate", isSynonym: false, meaningVi: "Sinh sôi nảy nở nhanh chóng" },
        { word: "subside", isSynonym: true, meaningVi: "Lắng dịu, lún xuống bớt" },
        { word: "escalate", isSynonym: false, meaningVi: "Leo thang dữ dội" },
        { word: "taper off", isSynonym: true, meaningVi: "Vơi dần, nhỏ dần về cuối" },
        { word: "balloon", isSynonym: false, meaningVi: "Phình to nhanh chóng như bong bóng" },
        { word: "dwindle", isSynonym: true, meaningVi: "Cạn dần, thu hẹp dần" }
      ]
    },
    {
      id: "u7-sf-2",
      targetWord: "AFFLUENCE & WEALTH",
      targetMeaning: "Sự giàu sang, nhung lụa, phồn vinh của cải dồi dào",
      note: "Chọn 4 từ mang nghĩa BẦN CÙNG, NGHÈO TÚNG để loại trừ",
      words: [
        { word: "opulence", isSynonym: true, meaningVi: "Sự xa hoa giàu có tột bậc" },
        { word: "prosperity", isSynonym: true, meaningVi: "Sự phồn thịnh phát đạt" },
        { word: "indigence", isSynonym: false, meaningVi: "Cảnh bần hàn túng thiếu" },
        { word: "fortune", isSynonym: true, meaningVi: "Gia sản lớn, cơ đồ giàu có" },
        { word: "destitution", isSynonym: false, meaningVi: "Sự cơ hàn trắng tay" },
        { word: "riches", isSynonym: true, meaningVi: "Của cải giàu sang" },
        { word: "privation", isSynonym: false, meaningVi: "Sự thiếu thốn các tiện nghi tối thiểu" },
        { word: "luxury", isSynonym: true, meaningVi: "Đời sống xa xỉ nhung lụa" },
        { word: "insolvency", isSynonym: false, meaningVi: "Tình trạng vỡ nợ cạn tiền" },
        { word: "abundance", isSynonym: true, meaningVi: "Sự dồi dào sung túc" },
        { word: "affluence", isSynonym: true, meaningVi: "Sự giàu sang phú quý" },
        { word: "plenty", isSynonym: true, meaningVi: "Sự dư dả phong phú" }
      ]
    },
    {
      id: "u7-sf-3",
      targetWord: "ABATE & SUBSIDE",
      targetMeaning: "Lắng dịu, thuyên giảm bớt cường độ gay gắt của bão tố/cơn đau",
      note: "Chọn 4 từ KHÔNG mang nghĩa lắng dịu (mang nghĩa làm trầm trọng thêm) để loại bỏ",
      words: [
        { word: "lessen", isSynonym: true, meaningVi: "Giảm nhẹ bớt" },
        { word: "diminish", isSynonym: true, meaningVi: "Bớt gay gắt đi" },
        { word: "aggravate", isSynonym: false, meaningVi: "Làm trầm trọng thêm, nặng thêm" },
        { word: "recede", isSynonym: true, meaningVi: "Rút lùi dần, lui dần" },
        { word: "intensify", isSynonym: false, meaningVi: "Tăng cường độ mạnh lên" },
        { word: "slacken", isSynonym: true, meaningVi: "Chùng xuống, dịu bớt nhịp" },
        { word: "amplify", isSynonym: false, meaningVi: "Khuếch đại, thổi bùng lên" },
        { word: "wane", isSynonym: true, meaningVi: "Suy tàn dần, tàn đi" },
        { word: "ease", isSynonym: true, meaningVi: "Xoa dịu, bớt đau" },
        { word: "exacerbate", isSynonym: false, meaningVi: "Làm xấu đi, gây tệ hại thêm" },
        { word: "abate", isSynonym: true, meaningVi: "Ngớt bão, dịu cơn giận" },
        { word: "moderate", isSynonym: true, meaningVi: "Hạ bớt mức độ cực đoan" }
      ]
    }
  ],

  // 5. Smart Cloze (Passage 1: Page 28 Task 2 | Passage 2: Page 30 Part A)
  clozePassages: [
    {
      id: "u7-cp-1",
      title: "Malnutrition and Physiological Deterioration",
      sourceLabel: "Page 28 — Task Two",
      passageTemplate: "Malnutrition is the {{gap_1}} of essential {{gap_2}} elements resulting {{gap_3}} severe physiological {{gap_4}} and ultimately death {{gap_5}} not reversed in time. A diet sufficient in calories but {{gap_6}} in protein may lead to {{gap_7}} diseases characterised by loss of skin and hair color, diarrhea, and water-logged tissue cells in which the body chemicals become so diluted that life can no longer be {{gap_8}}. A diet deficient in both calories and protein usually results in marasmus, that is, {{gap_9}}. Victims of malnutrition are usually {{gap_10}} susceptible to infectious diseases.",
      gaps: [
        {
          gapNumber: 1,
          options: [
            { label: "a", text: "deprivation" },
            { label: "b", text: "privation" },
            { label: "c", text: "minimum" }
          ],
          correctLabel: "a",
          correctWord: "deprivation",
          targetWord: "deprivation",
          explanationVi: "deprivation of essential elements: sự tước đoạt / thiếu hụt các nguyên tố dinh dưỡng sống còn."
        },
        {
          gapNumber: 2,
          options: [
            { label: "a", text: "nutrients" },
            { label: "b", text: "nourished" },
            { label: "c", text: "nutritional" }
          ],
          correctLabel: "c",
          correctWord: "nutritional",
          targetWord: "nutritional",
          explanationVi: "nutritional elements: các thành tố dinh dưỡng thiết yếu (cần tính từ bổ nghĩa cho elements)."
        },
        {
          gapNumber: 3,
          options: [
            { label: "a", text: "at" },
            { label: "b", text: "from" },
            { label: "c", text: "in" }
          ],
          correctLabel: "c",
          correctWord: "in",
          targetWord: "in",
          explanationVi: "resulting in: dẫn tới hậu quả là (result in sth đối lập với result from = bắt nguồn từ)."
        },
        {
          gapNumber: 4,
          options: [
            { label: "a", text: "disorders" },
            { label: "b", text: "disturbances" },
            { label: "c", text: "mess" }
          ],
          correctLabel: "a",
          correctWord: "disorders",
          targetWord: "disorders",
          explanationVi: "physiological disorders: các rối loạn chức năng sinh lý học của cơ thể."
        },
        {
          gapNumber: 5,
          options: [
            { label: "a", text: "unless" },
            { label: "b", text: "if" },
            { label: "c", text: "so" }
          ],
          correctLabel: "b",
          correctWord: "if",
          targetWord: "if",
          explanationVi: "if not reversed in time: nếu không được đảo ngược / cứu chữa kịp thời."
        },
        {
          gapNumber: 6,
          options: [
            { label: "a", text: "deficit" },
            { label: "b", text: "defective" },
            { label: "c", text: "deficient" }
          ],
          correctLabel: "c",
          correctWord: "deficient",
          targetWord: "deficient",
          explanationVi: "deficient in protein: thiếu hụt chất đạm (cấu trúc cố định: be deficient in sth)."
        },
        {
          gapNumber: 7,
          options: [
            { label: "a", text: "grand" },
            { label: "b", text: "grave" },
            { label: "c", text: "solemn" }
          ],
          correctLabel: "b",
          correctWord: "grave",
          targetWord: "grave",
          explanationVi: "grave diseases: các chứng bệnh nghiêm trọng, hiểm nghèo đe dọa sinh mạng."
        },
        {
          gapNumber: 8,
          options: [
            { label: "a", text: "sustained" },
            { label: "b", text: "subsisted" },
            { label: "c", text: "helped" }
          ],
          correctLabel: "a",
          correctWord: "sustained",
          targetWord: "sustained",
          explanationVi: "life can no longer be sustained: sự sống không còn có thể duy trì được nữa."
        },
        {
          gapNumber: 9,
          options: [
            { label: "a", text: "famine" },
            { label: "b", text: "starvation" },
            { label: "c", text: "hunger" }
          ],
          correctLabel: "b",
          correctWord: "starvation",
          targetWord: "starvation",
          explanationVi: "marasmus, that is, starvation: suy dinh dưỡng thể teo đét, nghĩa là tình trạng đói kiệt quệ."
        },
        {
          gapNumber: 10,
          options: [
            { label: "a", text: "greatly" },
            { label: "b", text: "highly" },
            { label: "c", text: "totally" }
          ],
          correctLabel: "b",
          correctWord: "highly",
          targetWord: "highly",
          explanationVi: "highly susceptible to: cực kỳ mẫn cảm, rất dễ mắc phải các bệnh truyền nhiễm (collocation chuẩn: highly susceptible)."
        }
      ]
    },
    {
      id: "u7-cp-2",
      title: "Sustainable Forestry and Prouty Woods Conservation",
      sourceLabel: "Page 30 — Part A",
      passageTemplate: "The New England Forestry Foundation (NEFF) now has a place it can use to showcase sustainable forestry. It wasn't easy and NEFF still needs to {{gap_11}} £2.2 million to complete the capital campaign. The Prouty property has been a fixture in the landscape of Littleton for almost a century. In 2002, Donald Prouty, former Littleton town Moderator and town counsel, {{gap_12}}. Landvest was engaged to sell the property. Recognizing the opportunity to protect a significant tract of forestland within the rapidly {{gap_13}} U.S. Route 495 corridor, Landvest introduced NEFF to the property. After walking the property and meeting with representatives of the town, NEFF boldly signed a purchase and sale agreement with the Prouty family. The family generously agreed to a bargain sale price in order to preserve the property and avoid a likely {{gap_14}} war among developers. Valued in {{gap_15}} of £3 million, the family's generous offer demonstrated their commitment to conserving the property. In October 2003, NEFF {{gap_16}} financing at a highly competitive rate and purchased the property. This wonderful community resource was dedicated 'Prouty Woods community forest' at a dedication ceremony in October 2004. NEFF now provides public {{gap_17}} throughout the property and educational opportunities at the William A. King Education Center, located at the top of Wilderness Hill. NEFF continues to manage the land as an active working forest - as Don and Carey Prouty had done for years. {{gap_18}} from Fay Park to Long Lake, the 107-acre Prouty property is a truly unique and significant tract of woodland within minutes of Route 495. The property includes 1600 feet of frontage on Long Lake and the top of Wilderness Hill offers expansive views to the west and north including Mount Monadnock in New Hampshire. The combination of forest, hayfield and riparian zones provide much-needed habitat for a variety of species. The forest has been under professional forest management for many years. Walking trails maintained by the Littleton Conservation Trust connect to a town-wide system of walking trails. The town has protected significant acreage at Long Lake Park and along the {{gap_19}} of Long Lake across from the Prouty property. The town-owned Morgan property adjoins to the north. In addition, the town has purchased a conservation restriction on 85 acres of Prouty Woods Community Forest, further increasing the conservation {{gap_20}} of this property.",
      gaps: [
        {
          gapNumber: 11,
          options: [
            { label: "A", text: "lift" },
            { label: "B", text: "elevate" },
            { label: "C", text: "promote" },
            { label: "D", text: "raise" }
          ],
          correctLabel: "D",
          correctWord: "raise",
          targetWord: "raise",
          explanationVi: "raise money/funds: gây quỹ tài chính (raise £2.2 million to complete the capital campaign)."
        },
        {
          gapNumber: 12,
          options: [
            { label: "A", text: "gave away" },
            { label: "B", text: "passed away" },
            { label: "C", text: "passed off" },
            { label: "D", text: "gave over" }
          ],
          correctLabel: "B",
          correctWord: "passed away",
          targetWord: "passed away",
          explanationVi: "passed away: qua đời, tạ thế (từ trang trọng tránh nói trực tiếp 'died')."
        },
        {
          gapNumber: 13,
          options: [
            { label: "A", text: "developing" },
            { label: "B", text: "devising" },
            { label: "C", text: "deriving" },
            { label: "D", text: "deviating" }
          ],
          correctLabel: "A",
          correctWord: "developing",
          targetWord: "developing",
          explanationVi: "rapidly developing corridor: hành lang kinh tế đang phát triển đô thị hóa nhanh chóng."
        },
        {
          gapNumber: 14,
          options: [
            { label: "A", text: "bidding" },
            { label: "B", text: "proposing" },
            { label: "C", text: "letting" },
            { label: "D", text: "summoning" }
          ],
          correctLabel: "A",
          correctWord: "bidding",
          targetWord: "bidding",
          explanationVi: "bidding war: cuộc chiến đấu giá / tranh mua đất đai quyết liệt giữa các chủ đầu tư."
        },
        {
          gapNumber: 15,
          options: [
            { label: "A", text: "extra" },
            { label: "B", text: "over" },
            { label: "C", text: "excess" },
            { label: "D", text: "profit" }
          ],
          correctLabel: "C",
          correctWord: "excess",
          targetWord: "excess",
          explanationVi: "valued in excess of: được định giá vượt quá con số 3 triệu bảng Anh ('in excess of')."
        },
        {
          gapNumber: 16,
          options: [
            { label: "A", text: "attached" },
            { label: "B", text: "tightened" },
            { label: "C", text: "secured" },
            { label: "D", text: "possessed" }
          ],
          correctLabel: "C",
          correctWord: "secured",
          targetWord: "secured",
          explanationVi: "secured financing: thu xếp / vay được nguồn vốn tài trợ thành công với lãi suất cạnh tranh."
        },
        {
          gapNumber: 17,
          options: [
            { label: "A", text: "passage" },
            { label: "B", text: "acclaim" },
            { label: "C", text: "entrant" },
            { label: "D", text: "access" }
          ],
          correctLabel: "D",
          correctWord: "access",
          targetWord: "access",
          explanationVi: "provides public access: mở cửa cho công chúng ra vào tự do khắp khu rừng bảo tồn."
        },
        {
          gapNumber: 18,
          options: [
            { label: "A", text: "Stretching" },
            { label: "B", text: "Swelling" },
            { label: "C", text: "Pushing" },
            { label: "D", text: "Multiplying" }
          ],
          correctLabel: "A",
          correctWord: "Stretching",
          targetWord: "Stretching",
          explanationVi: "Stretching from... to...: trải dài từ công viên Fay Park đến hồ Long Lake."
        },
        {
          gapNumber: 19,
          options: [
            { label: "A", text: "coast" },
            { label: "B", text: "shore" },
            { label: "C", text: "verge" },
            { label: "D", text: "hem" }
          ],
          correctLabel: "B",
          correctWord: "shore",
          targetWord: "shore",
          explanationVi: "shore of Long Lake: bờ hồ Long Lake (bờ hồ nước ngọt dùng 'shore'; 'coast' dùng cho bờ biển)."
        },
        {
          gapNumber: 20,
          options: [
            { label: "A", text: "fee" },
            { label: "B", text: "value" },
            { label: "C", text: "prize" },
            { label: "D", text: "treasure" }
          ],
          correctLabel: "B",
          correctWord: "value",
          targetWord: "value",
          explanationVi: "conservation value: giá trị bảo tồn sinh thái của vùng đất này."
        }
      ]
    }
  ],

  // 6. Speed Blitz (20 questions: 10 from Page 27 Ex A & B + 10 from Page 30 Part B)
  speedBlitz: [
    {
      id: "u7-sb-1",
      questionNumber: 1,
      prompt: "Your jacket will be less likely to ______ if you have it dry-cleaned.",
      options: [
        { key: "a", text: "contract" },
        { key: "b", text: "shrink" },
        { key: "c", text: "wither" },
        { key: "d", text: "impair" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "contract", pos: "v", vi: "Contract dùng cho kim loại hoặc co cơ bắp, không dùng cho vải vóc quần áo bị co rút sợi" },
        { key: "b", word: "shrink", pos: "collocation", vi: "Chính xác: shrink = vải áo quần co rút sợi khi giặt nước nóng" },
        { key: "c", word: "wither", pos: "v", vi: "Sai nghĩa: khô héo (dùng cho cây cỏ)" },
        { key: "d", word: "impair", pos: "v", vi: "Sai nghĩa: làm suy yếu chức năng cơ thể" }
      ]
    },
    {
      id: "u7-sb-2",
      questionNumber: 2,
      prompt: "Dim light may ______ your eyesight.",
      options: [
        { key: "a", text: "dwindle" },
        { key: "b", text: "impair" },
        { key: "c", text: "shrink" },
        { key: "d", text: "wither" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "dwindle", pos: "v", vi: "Dwindle là giảm dần số lượng / quy mô, không dùng cho thị lực" },
        { key: "b", word: "impair", pos: "collocation", vi: "Chính xác: impair eyesight = làm tổn hại, làm suy giảm thị lực mắt" },
        { key: "c", word: "shrink", pos: "v", vi: "Sai nghĩa: co rút vải" },
        { key: "d", word: "wither", pos: "v", vi: "Sai nghĩa: héo mòn" }
      ]
    },
    {
      id: "u7-sb-3",
      questionNumber: 3,
      prompt: "The number of young people interested in art keeps ______ year after year.",
      options: [
        { key: "a", text: "lessening" },
        { key: "b", text: "dwindling" },
        { key: "c", text: "withering" },
        { key: "d", text: "contracting" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "lessening", pos: "v", vi: "Lessening thường dùng cho gánh nặng, cường độ (lessening the burden), ít tự nhiên khi miêu tả 'number of people keeps...'" },
        { key: "b", word: "dwindling", pos: "collocation", vi: "Chính xác: numbers dwindling = số lượng giảm dần, vơi dần theo thời gian" },
        { key: "c", word: "withering", pos: "v", vi: "Dùng cho hoa lá héo tàn" },
        { key: "d", word: "contracting", pos: "v", vi: "Dùng cho co cơ bắp hoặc kim loại" }
      ]
    },
    {
      id: "u7-sb-4",
      questionNumber: 4,
      prompt: "In autumn, leaves turn yellow, ______ and fall.",
      options: [
        { key: "a", text: "lessen" },
        { key: "b", text: "wither" },
        { key: "c", text: "contract" },
        { key: "d", text: "shrink" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "lessen", pos: "v", vi: "Sai nghĩa: giảm bớt" },
        { key: "b", word: "wither", pos: "collocation", vi: "Chính xác: wither = lá cây khô héo và rụng xuống" },
        { key: "c", word: "contract", pos: "v", vi: "Sai nghĩa: co lại" },
        { key: "d", word: "shrink", pos: "v", vi: "Sai nghĩa: co rút" }
      ]
    },
    {
      id: "u7-sb-5",
      questionNumber: 5,
      prompt: "He suggested that they try to expand rather than ______ the local steel industry.",
      options: [
        { key: "a", text: "impair" },
        { key: "b", text: "contract" },
        { key: "c", text: "wither" },
        { key: "d", text: "dwindle" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "impair", pos: "v", vi: "Sai nghĩa: làm hư hỏng giác quan" },
        { key: "b", word: "contract", pos: "collocation", vi: "Chính xác: expand rather than contract = mở rộng quy mô thay vì thu hẹp lại" },
        { key: "c", word: "wither", pos: "v", vi: "Dùng cho hoa cỏ" },
        { key: "d", word: "dwindle", pos: "v", vi: "Dwindle là nội động từ (không dùng ngoại động từ 'dwindle the industry')" }
      ]
    },
    {
      id: "u7-sb-6",
      questionNumber: 6,
      prompt: "As his health had been ______, he was advised to move to the countryside.",
      options: [
        { key: "a", text: "shrinking" },
        { key: "b", text: "declining" },
        { key: "c", text: "lessening" },
        { key: "d", text: "contracting" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "shrinking", pos: "v", vi: "Không kết hợp với health" },
        { key: "b", word: "declining", pos: "collocation", vi: "Chính xác: declining health = sức khỏe sa sút, suy giảm dần" },
        { key: "c", word: "lessening", pos: "v", vi: "Không dùng 'health was lessening'" },
        { key: "d", word: "contracting", pos: "v", vi: "Contract a disease nghĩa là mắc bệnh, không dùng 'health was contracting'" }
      ]
    },
    {
      id: "u7-sb-7",
      questionNumber: 7,
      prompt: "The sensationalist press tried to ______ the importance of his heroic deed.",
      options: [
        { key: "a", text: "dwindle" },
        { key: "b", text: "shrink" },
        { key: "c", text: "lessen" },
        { key: "d", text: "wither" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "dwindle", pos: "v", vi: "Dwindle là nội động từ, không có tân ngữ trực tiếp" },
        { key: "b", word: "shrink", pos: "v", vi: "Không đi với 'importance'" },
        { key: "c", word: "lessen", pos: "collocation", vi: "Chính xác: lessen the importance of sth = hạ thấp tầm quan trọng, xem nhẹ chiến công" },
        { key: "d", word: "wither", pos: "v", vi: "Sai nghĩa" }
      ]
    },
    {
      id: "u7-sb-8",
      questionNumber: 8,
      prompt: "Thanks to ample natural ______ and advanced technology, citizens enjoyed unprecedented affluence.",
      options: [
        { key: "a", text: "sources" },
        { key: "b", text: "resources" },
        { key: "c", text: "recourse" },
        { key: "d", text: "repercussions" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "sources", pos: "n", vi: "Source là nguồn gốc/nguồn tin (source of information), không đi với 'natural sources'" },
        { key: "b", word: "resources", pos: "collocation", vi: "Chính xác: natural resources = tài nguyên thiên nhiên phong phú" },
        { key: "c", word: "recourse", pos: "n", vi: "Sai nghĩa: sự trông cậy, nơi nương tựa cứu cánh" },
        { key: "d", word: "repercussions", pos: "n", vi: "Sai nghĩa: hậu quả tai hại gián tiếp" }
      ]
    },
    {
      id: "u7-sb-9",
      questionNumber: 9,
      prompt: "After wandering through the snowy blizzard, the lost child was found ______ naked.",
      options: [
        { key: "a", text: "dark" },
        { key: "b", text: "stark" },
        { key: "c", text: "blank" },
        { key: "d", text: "bare" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "dark", pos: "adj", vi: "Không tạo cụm từ cố định" },
        { key: "b", word: "stark", pos: "idiom", vi: "Chính xác: stark naked = trần như nhộng, không mảnh vải che thân" },
        { key: "c", word: "blank", pos: "adj", vi: "Sai nghĩa: trống rỗng" },
        { key: "d", word: "bare", pos: "adj", vi: "Thường dùng 'bare naked' trong văn nói Mỹ nhưng thành ngữ chuẩn Anh-Anh là 'stark naked'" }
      ]
    },
    {
      id: "u7-sb-10",
      questionNumber: 10,
      prompt: "Because of his clumsy footwork, he seems to be accident ______.",
      options: [
        { key: "a", text: "drone" },
        { key: "b", text: "prone" },
        { key: "c", text: "liable" },
        { key: "d", text: "bound" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "drone", pos: "n", vi: "Sai nghĩa: máy bay không người lái / kẻ lười biếng" },
        { key: "b", word: "prone", pos: "collocation", vi: "Chính xác: accident-prone = hay gặp tai nạn, dễ bị sự cố va quệt" },
        { key: "c", word: "liable", pos: "adj", vi: "Liable to do sth, không ghép thành danh-tính từ 'accident-liable'" },
        { key: "d", word: "bound", pos: "adj", vi: "Không đi với 'accident'" }
      ]
    },
    {
      id: "u7-sb-11",
      questionNumber: 11,
      prompt: "Mr. Connors was ______ at the police station for further questioning.",
      options: [
        { key: "a", text: "restrained" },
        { key: "b", text: "detained" },
        { key: "c", text: "contained" },
        { key: "d", text: "taken" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "restrained", pos: "v", vi: "Restrain nghĩa là khống chế thể xác hoặc kiềm chế cảm xúc, không mang nghĩa tạm giữ điều tra" },
        { key: "b", word: "detained", pos: "collocation", vi: "Chính xác: detained at the police station = bị tạm giữ tại đồn cảnh sát để thẩm vấn" },
        { key: "c", word: "contained", pos: "v", vi: "Contain nghĩa là kiểm soát không cho lây lan hoặc chứa đựng" },
        { key: "d", word: "taken", pos: "v", vi: "Không tự nhiên trong văn cảnh pháp lý" }
      ]
    },
    {
      id: "u7-sb-12",
      questionNumber: 12,
      prompt: "I don't know how on earth he can get by on such ______ wages.",
      options: [
        { key: "a", text: "meager" },
        { key: "b", text: "adequate" },
        { key: "c", text: "satisfactory" },
        { key: "d", text: "high" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "meager", pos: "collocation", vi: "Chính xác: meager wages = đồng lương còm cõi, ít ỏi chật vật" },
        { key: "b", word: "adequate", pos: "adj", vi: "Trái nghĩa: đầy đủ, vừa vặn" },
        { key: "c", word: "satisfactory", pos: "adj", vi: "Trái nghĩa: thỏa đáng" },
        { key: "d", word: "high", pos: "adj", vi: "Trái nghĩa: lương cao" }
      ]
    },
    {
      id: "u7-sb-13",
      questionNumber: 13,
      prompt: "Don't read in such dim light; it will ______ your eyesight.",
      options: [
        { key: "a", text: "impair" },
        { key: "b", text: "dwindle" },
        { key: "c", text: "decrease" },
        { key: "d", text: "contract" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "impair", pos: "collocation", vi: "Chính xác: impair eyesight = làm suy giảm, tổn hại thị lực" },
        { key: "b", word: "dwindle", pos: "v", vi: "Không dùng cho mắt" },
        { key: "c", word: "decrease", pos: "v", vi: "Không dùng 'decrease eyesight'" },
        { key: "d", word: "contract", pos: "v", vi: "Không dùng cho suy giảm thị lực" }
      ]
    },
    {
      id: "u7-sb-14",
      questionNumber: 14,
      prompt: "The antique gold fountain pen was a ______ of his gratitude.",
      options: [
        { key: "a", text: "segment" },
        { key: "b", text: "specimen" },
        { key: "c", text: "receipt" },
        { key: "d", text: "token" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "segment", pos: "n", vi: "Sai nghĩa: phân khúc, bộ phận" },
        { key: "b", word: "specimen", pos: "n", vi: "Sai nghĩa: mẫu vật xét nghiệm" },
        { key: "c", word: "receipt", pos: "n", vi: "Sai nghĩa: biên lai thu tiền" },
        { key: "d", word: "token", pos: "collocation", vi: "Chính xác: a token of gratitude = món quà kỷ niệm tượng trưng cho lòng biết ơn" }
      ]
    },
    {
      id: "u7-sb-15",
      questionNumber: 15,
      prompt: "They were able to set sail when the violent storm ______.",
      options: [
        { key: "a", text: "enraged" },
        { key: "b", text: "abated" },
        { key: "c", text: "shrank" },
        { key: "d", text: "permitted" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "enraged", pos: "v", vi: "Sai nghĩa: nổi cơn thịnh nộ" },
        { key: "b", word: "abated", pos: "collocation", vi: "Chính xác: storm abated = cơn bão lắng dịu, ngớt dần cường độ dữ dội" },
        { key: "c", word: "shrank", pos: "v", vi: "Không dùng cho bão" },
        { key: "d", word: "permitted", pos: "v", vi: "Sai nghĩa: cho phép" }
      ]
    },
    {
      id: "u7-sb-16",
      questionNumber: 16,
      prompt: "I'd love to live in these peaceful, ______ surroundings.",
      options: [
        { key: "a", text: "desolate" },
        { key: "b", text: "bashful" },
        { key: "c", text: "gloomy" },
        { key: "d", text: "serene" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "desolate", pos: "adj", vi: "Sai nghĩa: hoang vắng, cô quạnh thê lương" },
        { key: "b", word: "bashful", pos: "adj", vi: "Sai nghĩa: e thẹn, ngượng ngùng (chỉ người)" },
        { key: "c", word: "gloomy", pos: "adj", vi: "Sai nghĩa: u sầu, tối tăm ảm đạm" },
        { key: "d", word: "serene", pos: "collocation", vi: "Chính xác: serene surroundings = khung cảnh thanh bình, êm đềm tĩnh tại" }
      ]
    },
    {
      id: "u7-sb-17",
      questionNumber: 17,
      prompt: "This kind of repetitive manual occupation does not offer any ______ for creative thinking.",
      options: [
        { key: "a", text: "orbit" },
        { key: "b", text: "rope" },
        { key: "c", text: "scope" },
        { key: "d", text: "infection" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "orbit", pos: "n", vi: "Sai nghĩa: quỹ đạo" },
        { key: "b", word: "rope", pos: "n", vi: "Sai nghĩa: sợi dây thừng" },
        { key: "c", word: "scope", pos: "collocation", vi: "Chính xác: scope for creative thinking = đất diễn / cơ hội / phạm vi để phát huy tư duy sáng tạo" },
        { key: "d", word: "infection", pos: "n", vi: "Sai nghĩa: sự lây nhiễm" }
      ]
    },
    {
      id: "u7-sb-18",
      questionNumber: 18,
      prompt: "Mr. Smithers ______ to comment on the controversial news.",
      options: [
        { key: "a", text: "upheld" },
        { key: "b", text: "retained" },
        { key: "c", text: "declined" },
        { key: "d", text: "decreased" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "upheld", pos: "v", vi: "Sai nghĩa: ủng hộ, giữ vững phán quyết" },
        { key: "b", word: "retained", pos: "v", vi: "Sai nghĩa: giữ lại" },
        { key: "c", word: "declined", pos: "collocation", vi: "Chính xác: decline to do sth = từ chối bình luận / phát biểu một cách lịch sự" },
        { key: "d", word: "decreased", pos: "v", vi: "Không dùng 'decreased to comment'" }
      ]
    },
    {
      id: "u7-sb-19",
      questionNumber: 19,
      prompt: "Law-abiding people are the responsible citizens who ______ the law.",
      options: [
        { key: "a", text: "observe" },
        { key: "b", text: "offend" },
        { key: "c", text: "protect" },
        { key: "d", text: "defy" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "observe", pos: "collocation", vi: "Chính xác: observe the law = tuân thủ nghiêm chỉnh pháp luật (observe a rule/law)" },
        { key: "b", word: "offend", pos: "v", vi: "Sai nghĩa: xúc phạm, vi phạm" },
        { key: "c", word: "protect", pos: "v", vi: "Sai sắc thái: bảo vệ" },
        { key: "d", word: "defy", pos: "v", vi: "Trái nghĩa: bất tuân, thách thức pháp luật" }
      ]
    },
    {
      id: "u7-sb-20",
      questionNumber: 20,
      prompt: "The number of spectator fans going to soccer matches seems to be ______ steadily.",
      options: [
        { key: "a", text: "narrowing" },
        { key: "b", text: "withering" },
        { key: "c", text: "dwindling" },
        { key: "d", text: "contracting" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "narrowing", pos: "v", vi: "Narrow dùng cho khoảng cách (narrow the gap), không đi với 'number of people is narrowing'" },
        { key: "b", word: "withering", pos: "v", vi: "Dùng cho cây cối tàn úa" },
        { key: "c", word: "dwindling", pos: "collocation", vi: "Chính xác: dwindling steadily = số lượng người hâm mộ giảm dần đều theo thời gian" },
        { key: "d", word: "contracting", pos: "v", vi: "Dùng cho cơ bắp hoặc kim loại" }
      ]
    }
  ]
};



export const VOCAB_C1_UNIT_8: VocabC1Unit = {
  unitId: 8,
  title: "Unit 8: Progression & Transition",
  subtitle: "The Vocabulary Files - Level C1 (Pages 31-34)",

  // 1. Words in Action (10 core words from Page 31 Exercise A & B)
  wordsInAction: [
    {
      id: "u8-wia-1",
      word: "abate",
      ipa: "/əˈbeɪt/",
      nuance: "[Subside; become less intense, severe or widespread]",
      register: "Formal / Academic",
      collocations: ["storm abates", "pain abates", "fever abates", "without abating"],
      enDef: "To become less strong, severe, or intense; to subside or reduce in degree.",
      viDef: "Dịu đi, lắng xuống, giảm bớt cường độ (bão tố, cơn đau, dịch bệnh, tranh luận).",
      example: "As soon as the raging storm **abated**, the naval rescue ships were allowed to set sail.",
      targetKeyword: "abate"
    },
    {
      id: "u8-wia-2",
      word: "adroit",
      ipa: "/əˈdrɔɪt/",
      nuance: "[Clever or skillful in using the hands or mind; deft]",
      register: "Formal / Literary",
      collocations: ["adroit handling", "adroit politician", "adroit negotiator", "adroitly manage"],
      enDef: "Clever or skillful in using the hands or mind; showing exceptional dexterity or diplomatic tact.",
      viDef: "Khéo léo, tài tình, ứng biến mau lẹ (đặc biệt trong giao tế ngoại giao hoặc xử lý khủng hoảng).",
      example: "The Secretary of State handled the diplomatic dispute **adroitly** and prevented a catastrophic war.",
      targetKeyword: "adroit"
    },
    {
      id: "u8-wia-3",
      word: "accost",
      ipa: "/əˈkɒst/",
      nuance: "[Approach and speak to someone boldly, aggressively or rudely]",
      register: "Formal / Dramatic",
      collocations: ["accosted by strangers", "accosted on the street", "aggressively accost"],
      enDef: "To approach and speak to someone in an assertive, intrusive, or aggressive way.",
      viDef: "Tiếp cận và bắt chuyện đột ngột, suồng sã hoặc thô lỗ (thường bất ngờ trên đường phố).",
      example: "I bumped into John in Athens and he **accosted** me before I even had time to speak first.",
      targetKeyword: "accost"
    },
    {
      id: "u8-wia-4",
      word: "aggravate",
      ipa: "/ˈæɡ.rə.veɪt/",
      nuance: "[Make a disease, problem or injury worse and more serious]",
      register: "Medical / Formal",
      collocations: ["aggravate an injury", "aggravate symptoms", "aggravate a problem", "aggravate the crisis"],
      enDef: "To make an existing illness, wound, pain, or difficult situation worse and more serious.",
      viDef: "Làm trầm trọng thêm, làm bệnh tình hoặc vết thương xấu đi; làm xấu thêm tình hình.",
      example: "The doctor warned him that if he continued to pick the sore, he would severely **aggravate** it.",
      targetKeyword: "aggravate"
    },
    {
      id: "u8-wia-5",
      word: "arrogance",
      ipa: "/ˈær.ə.ɡəns/",
      nuance: "[An offensive attitude of superiority; overbearing haughtiness]",
      register: "General / Formal",
      collocations: ["sheer arrogance", "intellectual arrogance", "arrogant attitude", "know-it-all arrogance"],
      enDef: "An attitude of superior self-importance accompanied by contempt or disdain for others; haughtiness.",
      viDef: "Sự kiêu căng, ngạo mạn, trịch thượng; thái độ tự phụ xem thường người khác.",
      example: "I detest that **arrogant**, know-it-all expression permanently stamped across his face.",
      targetKeyword: "arrogance"
    },
    {
      id: "u8-wia-6",
      word: "brim",
      ipa: "/brɪm/",
      nuance: "[The top edge of a cup, glass, bowl, or hat]",
      register: "Standard / Descriptive",
      collocations: ["brim of a glass", "brim of a hat", "filled to the brim", "brimming with joy"],
      enDef: "The top, outermost rim of a cup, glass, or container; also the projecting edge of a hat.",
      viDef: "Vành, mép trên cùng (của miệng ly, tách, bát đĩa) hoặc vành nón/mũ.",
      example: "The bartender poured the cider until the sparkling liquid reached the very **brim** of the glass.",
      targetKeyword: "brim"
    },
    {
      id: "u8-wia-7",
      word: "chaste",
      ipa: "/tʃeɪst/",
      nuance: "[Morally pure, virtuous, abstaining from extramarital or casual sex]",
      register: "Literary / Ethical",
      collocations: ["chaste life", "chaste kiss", "pure and chaste", "remain chaste"],
      enDef: "Morally pure in thought and conduct; strictly abstaining from illicit or promiscuous relations.",
      viDef: "Trong trắng, thanh khiết, tiết hạnh, đoan trang (về mặt đạo đức và lối sống).",
      example: "The ancient order required its acolytes to lead an austere, humble, and strictly **chaste** existence.",
      targetKeyword: "chaste"
    },
    {
      id: "u8-wia-8",
      word: "defect",
      ipa: "/dɪˈfekt/",
      nuance: "[Abandon one's country, party or allegiance to join an adversary]",
      register: "Political / Military",
      collocations: ["defect to the enemy", "defect from the party", "high-level defector", "political defection"],
      enDef: "To abandon one's cause, political party, country, or allegiance in order to adopt another.",
      viDef: "Đào tẩu, phản bội hàng ngũ, bỏ đảng/tổ quốc để chạy sang phe đối lập hoặc đối phương.",
      example: "The corrupt politician was secretly bribed to **defect** to the opposing party before the ballot.",
      targetKeyword: "defect"
    },
    {
      id: "u8-wia-9",
      word: "demolish",
      ipa: "/dɪˈmɒl.ɪʃ/",
      nuance: "[Completely pull or tear down a building, structure or system]",
      register: "Engineering / Formal",
      collocations: ["demolish a building", "demolish old tenements", "demolition team", "demolish an argument"],
      enDef: "To pull or knock down a building or structure completely; to dismantle or destroy utterly.",
      viDef: "Phá bỏ, san phẳng, đánh sập hoàn toàn (tòa nhà, công trình cũ kỹ hư hỏng).",
      example: "The city council designated a specialized **demolition** team to tear down the dilapidated warehouse.",
      targetKeyword: "demolish"
    },
    {
      id: "u8-wia-10",
      word: "commence",
      ipa: "/kəˈmens/",
      nuance: "[Begin; start formal proceedings or official events]",
      register: "Formal / Ceremonial",
      collocations: ["commence operations", "commence proceedings", "commence work", "due to commence"],
      enDef: "To begin or start an activity, ceremony, legal proceeding, or formal performance.",
      viDef: "Bắt đầu, khởi sự, khai mạc (nghi lễ, buổi diễn, phiên tòa hoặc hoạt động chính thức).",
      example: "Let's hurry to the auditorium; the philharmonic concert is scheduled to **commence** at eight sharp.",
      targetKeyword: "commence"
    }
  ],

  // 2. Word Formation (10 Transformation Items from Page 32 Task Two)
  wordFormation: [
    {
      id: "u8-wf-1",
      adjective: "prefer",
      noun: "have a preference for",
      root: "prefer",
      suffix: "-ence (Noun Phrase)",
      meaningVi: "Thích cái gì hơn (thay prefer bằng cụm danh từ 'have a preference for')",
      suffixChoices: ["have a preference for", "have a preferment to", "have a preferability of", "make a preference in"],
      ruleTip: "Cụm danh từ học thuật C1: 'prefer X' ➔ 'have a preference for X'."
    },
    {
      id: "u8-wf-2",
      adjective: "act positively",
      noun: "take positive action",
      root: "act",
      suffix: "-ion (Noun Phrase)",
      meaningVi: "Hành động tích cực, quyết đoán (thay act bằng 'take positive action')",
      suffixChoices: ["take positive action", "make positive activity", "do positive acting", "have positive enact"],
      ruleTip: "Collocation C1 với động từ TAKE: 'act positively' ➔ 'take positive action'."
    },
    {
      id: "u8-wf-3",
      adjective: "gather",
      noun: "turn out",
      root: "turn",
      suffix: "Phrasal Verb",
      meaningVi: "Tập hợp, tụ họp đông đảo (thay gather bằng 'turn out')",
      suffixChoices: ["turn out", "turn in", "turn up", "turn on"],
      ruleTip: "Phrasal verb C1: 'turn out for sth' = tụ tập, kéo đến tham gia sự kiện số lượng lớn."
    },
    {
      id: "u8-wf-4",
      adjective: "appear",
      noun: "put in an appearance",
      root: "appear",
      suffix: "-ance (Idiom)",
      meaningVi: "Xuất hiện, ghé mặt qua một chốc (thay appear bằng 'put in an appearance')",
      suffixChoices: ["put in an appearance", "make an apparition", "take an appearance", "set an appearance"],
      ruleTip: "Idiom C1: 'put in an appearance' = xuất hiện chớp nhoáng tại một buổi gặp mặt."
    },
    {
      id: "u8-wf-5",
      adjective: "end",
      noun: "come to an end",
      root: "come",
      suffix: "Collocation",
      meaningVi: "Đi đến hồi kết, kết thúc (thay end bằng 'come to an end')",
      suffixChoices: ["come to an end", "bring to an end", "make an end", "get to an end"],
      ruleTip: "Collocation C1 nội động: 'The war ended' ➔ 'The war came to an end'."
    },
    {
      id: "u8-wf-6",
      adjective: "consider",
      noun: "take into consideration",
      root: "consider",
      suffix: "-ation (Idiom)",
      meaningVi: "Cân nhắc, tính đến yếu tố gì (thay consider bằng 'take into consideration')",
      suffixChoices: ["take into consideration", "bring to considering", "put into consider", "make consideration of"],
      ruleTip: "Collocation C1 học thuật: 'consider sth' ➔ 'take sth into consideration / account'."
    },
    {
      id: "u8-wf-7",
      adjective: "survey",
      noun: "make a survey of",
      root: "survey",
      suffix: "Noun Collocation",
      meaningVi: "Tiến hành khảo sát, giám định nhà cửa (thay survey bằng 'make a survey of')",
      suffixChoices: ["make a survey of", "take a survey on", "do a survey for", "give a survey to"],
      ruleTip: "Collocation kỹ thuật C1: 'make a survey of the house' = thực hiện khảo sát kết cấu nhà."
    },
    {
      id: "u8-wf-8",
      adjective: "fit",
      noun: "equip with",
      root: "equip",
      suffix: "Verb Transformation",
      meaningVi: "Trang bị, lắp đặt thiết bị (thay fit safety belts bằng 'equip with')",
      suffixChoices: ["equip with", "furnish into", "install by", "fit out to"],
      ruleTip: "Cấu trúc C1: 'fit X in vehicles' ➔ 'equip all vehicles with X'."
    },
    {
      id: "u8-wf-9",
      adjective: "manage",
      noun: "get by",
      root: "get",
      suffix: "Phrasal Verb",
      meaningVi: "Xoay xở trang trải cuộc sống (thay manage on poor salary bằng 'get by')",
      suffixChoices: ["get by", "get on", "get through", "get over"],
      ruleTip: "Phrasal verb C1: 'get by on a salary/pension' = xoay xở sinh sống với mức tiền ít ỏi."
    },
    {
      id: "u8-wf-10",
      adjective: "attend",
      noun: "drop out of",
      root: "drop",
      suffix: "Phrasal Verb",
      meaningVi: "Bỏ học giữa chừng (thay stop attending college bằng 'drop out of college')",
      suffixChoices: ["drop out of", "drop off", "drop away from", "drop down on"],
      ruleTip: "Phrasal verb C1: 'drop out of college/university' = thôi học, bỏ dở giảng đường."
    }
  ],

  // 3. Confusable Words (7 Pairs from Page 32 Task One)
  confusableWords: [
    {
      id: "u8-cw-1",
      pairKey: "thrive-strive",
      wordA: "thrive",
      wordB: "strive",
      diffHighlightA: { before: "", highlight: "thrive", after: "" },
      diffHighlightB: { before: "", highlight: "strive", after: "" },
      promptSentence: "The stray cat she adopted will ______ now that it has a warm shelter and enough food.",
      correctWord: "thrive",
      defA: "Thrive: Phát triển thịnh vượng, lớn nhanh như thổi, khỏe mạnh sinh sôi nảy nở (prosper, flourish).",
      defB: "Strive: Nỗ lực hết mình, phấn đấu không ngừng để đạt được mục đích (try hard, make great efforts).",
      mnemonic: "TH-rive = Thriving (thịnh vượng); ST-rive = Striving (gắng sức tranh đấu)."
    },
    {
      id: "u8-cw-2",
      pairKey: "sustain-retain",
      wordA: "sustain",
      wordB: "retain",
      diffHighlightA: { before: "", highlight: "sustain", after: "" },
      diffHighlightB: { before: "", highlight: "retain", after: "" },
      promptSentence: "The historic city ______ minor structural damage during the moderate earthquake.",
      correctWord: "sustained",
      defA: "Sustain (damage/injuries): Chịu đựng, gánh chịu tổn thất, thương tích; hoặc duy trì nâng đỡ.",
      defB: "Retain: Giữ lại, tiếp tục sở hữu, duy trì quyền kiểm soát không để mất đi (keep or continue to hold).",
      mnemonic: "Sustain damage = gánh chịu thiệt hại; Retain control = nắm giữ quyền hạn."
    },
    {
      id: "u8-cw-3",
      pairKey: "yoke-yolk",
      wordA: "yoke",
      wordB: "yolk",
      diffHighlightA: { before: "", highlight: "yoke", after: "" },
      diffHighlightB: { before: "", highlight: "yolk", after: "" },
      promptSentence: "The egg ______ is exceptionally nutritious and contains high concentrations of choline.",
      correctWord: "yolk",
      defA: "Yoke: Cái ách nô lệ, sự kìm kẹp áp bức (bondage, servitude) hoặc ách trâu bò kéo cày.",
      defB: "Yolk: Lòng đỏ trứng gà/vịt (phần tròn màu vàng giàu dưỡng chất của quả trứng).",
      mnemonic: "Yolk có chữ 'L' như 'Lòng đỏ trứng'; Yoke tượng trưng cho 'ách nô lệ'."
    },
    {
      id: "u8-cw-4",
      pairKey: "document-documentary",
      wordA: "document",
      wordB: "documentary",
      diffHighlightA: { before: "", highlight: "document", after: "" },
      diffHighlightB: { before: "", highlight: "documentary", after: "" },
      promptSentence: "Last night they watched a captivating ______ on biodiversity in the Amazon rain forest.",
      correctWord: "documentary",
      defA: "Document: Văn kiện, tài liệu, hồ sơ pháp lý hoặc giấy tờ có giá trị bằng chứng.",
      defB: "Documentary: Phim tài liệu (điện ảnh hoặc truyền hình miêu tả đời sống con người, động vật).",
      mnemonic: "Documentary có đuôi -ary = thể loại phim tài liệu điện ảnh/truyền hình."
    },
    {
      id: "u8-cw-5",
      pairKey: "constrain-restrain",
      wordA: "constrain",
      wordB: "restrain",
      diffHighlightA: { before: "", highlight: "constrain", after: "" },
      diffHighlightB: { before: "", highlight: "restrain", after: "" },
      promptSentence: "That aggressive guard dog is a public hazard and should definitely be ______ on a leash.",
      correctWord: "restrained",
      defA: "Constrain: Bắt ép, cưỡng bách làm gì đó bằng áp lực hoặc hoàn cảnh bắt buộc (compel).",
      defB: "Restrain: Kìm chế, xích lại, giữ chặt trong tầm kiểm soát để không gây hại (keep under physical control).",
      mnemonic: "Restrain dog on leash = ghìm giữ, khống chế thể chất; Constrained by budget = bị gò bó bởi ngân sách."
    },
    {
      id: "u8-cw-6",
      pairKey: "soothe-seethe",
      wordA: "soothe",
      wordB: "seethe",
      diffHighlightA: { before: "", highlight: "soothe", after: "" },
      diffHighlightB: { before: "", highlight: "seethe", after: "" },
      promptSentence: "Try applying this aloe vera gel; it will immediately ______ your painful sunburn.",
      correctWord: "soothe",
      defA: "Soothe: Làm dịu cơn đau, xoa dịu vết bỏng hoặc dỗ dành cảm xúc tức giận (calm, ease pain).",
      defB: "Seethe: Sôi sục, tức tối nghẹn họng, giận dữ đến phát cuồng (boil with agitation and hidden fury).",
      mnemonic: "Soothe = xoa dịu mát lành; Seethe = sục sôi lửa giận căm hờn."
    },
    {
      id: "u8-cw-7",
      pairKey: "subside-subsidize",
      wordA: "subside",
      wordB: "subsidize",
      diffHighlightA: { before: "", highlight: "subside", after: "" },
      diffHighlightB: { before: "", highlight: "subsidize", after: "" },
      promptSentence: "It took a very long time for his intense grief to ______ after his beloved grandmother died.",
      correctWord: "subside",
      defA: "Subside: Dịu dần, rút xuống, lắng xuống, sụt giảm mức độ nghiêm trọng (sink to a lower level).",
      defB: "Subsidize: Trợ cấp kinh phí, hỗ trợ tiền bạc cho một tổ chức hoặc hoạt động (fund financially).",
      mnemonic: "Subside = lắng dịu, sụt xuống; Subsidize = cấp bù tiền viện trợ, trợ giá."
    }
  ],

  // 4. Synonym Filter (4 Thematic Sets from Page 33 Task Four)
  synonymFilter: [
    {
      id: "u8-sf-1",
      targetWord: "imminent",
      targetCategory: "Unit 8 Context Vocabulary",
      targetMeaning: "Coming on / about to happen very soon",
      targetMeaningVi: "Sắp xảy ra đến nơi, cận kề (bão táp, hiểm họa, sự cố)",
      note: "Tìm 4 từ đồng nghĩa diễn tả sự việc sắp xảy ra ngay trước mắt và 2 từ KHÔNG cùng nhóm nghĩa.",
      words: [
        { word: "impending", isSynonym: true, meaningVi: "Đang lơ lửng cận kề" },
        { word: "approaching", isSynonym: true, meaningVi: "Đang tiến lại rất gần" },
        { word: "looming", isSynonym: true, meaningVi: "Hiện ra lù lù đe dọa" },
        { word: "forthcoming", isSynonym: true, meaningVi: "Sắp tới, chuẩn bị diễn ra" },
        { word: "distant", isSynonym: false, meaningVi: "Xa xôi, còn lâu mới tới" },
        { word: "retrospective", isSynonym: false, meaningVi: "Hồi tưởng về quá khứ" }
      ]
    },
    {
      id: "u8-sf-2",
      targetWord: "prospering",
      targetCategory: "Unit 8 Context Vocabulary",
      targetMeaning: "Doing exceptionally well / booming economically",
      targetMeaningVi: "Phát đạt thịnh vượng, làm ăn khấm khá vượt bậc",
      note: "Tìm 4 từ đồng nghĩa diễn tả tình trạng kinh doanh hoặc sự sống phát đạt, và 2 từ lạc quẻ.",
      words: [
        { word: "thriving", isSynonym: true, meaningVi: "Phát triển mạnh mẽ sinh sôi" },
        { word: "flourishing", isSynonym: true, meaningVi: "Nở rộ, hưng thịnh rực rỡ" },
        { word: "booming", isSynonym: true, meaningVi: "Bùng nổ tăng trưởng vũ bão" },
        { word: "burgeoning", isSynonym: true, meaningVi: "Đâm chồi nảy lộc, tăng nhanh" },
        { word: "languishing", isSynonym: false, meaningVi: "Mòn mỏi, suy đồi ốm yếu" },
        { word: "stagnating", isSynonym: false, meaningVi: "Đình trệ, dậm chân tại chỗ" }
      ]
    },
    {
      id: "u8-sf-3",
      targetWord: "precarious",
      targetCategory: "Unit 8 Context Vocabulary",
      targetMeaning: "Far from safe / dangerously unstable or risky",
      targetMeaningVi: "Bấp bênh, hiểm nghèo, không an toàn, dễ sụp đổ",
      note: "Tìm 4 từ đồng nghĩa chỉ trạng thái bấp bênh nguy hiểm và 2 từ thể hiện sự kiên định vững vàng.",
      words: [
        { word: "perilous", isSynonym: true, meaningVi: "Hiểm nghèo đầy rủi ro" },
        { word: "insecure", isSynonym: true, meaningVi: "Không vững chắc, bấp bênh" },
        { word: "hazardous", isSynonym: true, meaningVi: "Nguy hại rình rập" },
        { word: "shaky", isSynonym: true, meaningVi: "Lung lay, thiếu ổn định" },
        { word: "unshakable", isSynonym: false, meaningVi: "Vững như bàn thạch, kiên định" },
        { word: "resilient", isSynonym: false, meaningVi: "Kiên cường dẻo dai hồi phục" }
      ]
    },
    {
      id: "u8-sf-4",
      targetWord: "entail",
      targetCategory: "Unit 8 Context Vocabulary",
      targetMeaning: "Have as a necessary result or consequence / involve",
      targetMeaningVi: "Đòi hỏi phải có, tất yếu kéo theo hệ quả là",
      note: "Tìm 4 từ đồng nghĩa biểu thị tính kéo theo hệ quả tất yếu và 2 từ diễn tả sự né tránh, loại trừ.",
      words: [
        { word: "involve", isSynonym: true, meaningVi: "Kéo theo, bao hàm đòi hỏi" },
        { word: "necessitate", isSynonym: true, meaningVi: "Đòi hỏi tất yếu phải có" },
        { word: "imply", isSynonym: true, meaningVi: "Ngụ ý, hàm chứa hệ lụy" },
        { word: "engender", isSynonym: true, meaningVi: "Sinh ra, đem lại kết quả tất yếu" },
        { word: "obviate", isSynonym: false, meaningVi: "Loại trừ, xóa bỏ sự cần thiết" },
        { word: "preclude", isSynonym: false, meaningVi: "Ngăn ngừa, loại bỏ từ trước" }
      ]
    }
  ],

  // 5. Smart Cloze (The Great Depression & Milton Hershey's Utopia - Page 34 Ex A)
  clozePassages: [
    {
      id: "u8-cp-1",
      title: "The Industrial Oasis: Hershey During The Great Depression",
      sourceLabel: "Level C1 Academic Reading (The Vocabulary Files - Page 34)",
      passageTemplate: "Despite the continued {{gap_1}} of those early town perks, it wasn't until the Depression that modern Hershey started to take shape. Perhaps the only town in the country actually to {{gap_2}} during the 1930s, it thrived because Hershey vowed his Utopia would never see a breadline. Instead he {{gap_3}} a massive building boom that gave rise to the most visited buildings in today's Hershey and delivered wages to more than 600 workers. He admitted that his {{gap_4}} were partly selfish: \"If I don't provide work for them, I'll have to feed them. And since building materials are now at their lowest cost levels, I'm going to build and give them jobs.\"\n\nHe seems to have {{gap_5}} no expense; most of the new buildings were strikingly {{gap_6}}. The first to be finished was the three-million-dollar limestone Community Center, home to the 1,904-seat Venetian-style Hershey Community Theater, which has played {{gap_7}} since 1933 to touring Broadway shows and to music, dance, and opera performances. It offers just as much to look at when the lights are on and the curtains closed. The floors in the {{gap_8}} named Grand Lobby are polished Italian lava rock, surrounded by marble walls and capped with a bas-relief ceiling showing sheaves of wheat, beehives, swans, and scenes from Roman mythology. With the {{gap_9}} inner foyer, Hershey thumbed his nose even harder at the ravages of the Depression: The arched ceiling is tiled in gold, the fire curtain bears a painting of Venice, and the ceiling is {{gap_10}} with 88 tiny lightbulbs to re-create a star-lit night.",
      gaps: [
        {
          gapNumber: 1,
          options: [
            { label: "A", text: "flexibility" },
            { label: "B", text: "rigidity" },
            { label: "C", text: "elasticity" },
            { label: "D", text: "resilience" }
          ],
          correctLabel: "D",
          correctWord: "resilience",
          targetWord: "resilience",
          explanations: {
            A: "Flexibility: sự linh hoạt, không hợp ngữ cảnh sức chống chịu bền bỉ của chính sách phúc lợi thị trấn.",
            B: "Rigidity: sự cứng nhắc nhắc nhở, đối lập ý nghĩa với sự bền bỉ tích cực.",
            C: "Elasticity: tính đàn hồi vật lý hoặc co giãn kinh tế lượng.",
            D: "Resilience: sức bật bền bỉ dẻo dai của các đặc quyền phúc lợi (early town perks) qua năm tháng."
          },
          explanationVi: "Resilience diễn tả khả năng phục hồi và đứng vững kiên cường của các chính sách phúc lợi trước biến cố."
        },
        {
          gapNumber: 2,
          options: [
            { label: "A", text: "prosper" },
            { label: "B", text: "decline" },
            { label: "C", text: "get on" },
            { label: "D", text: "flower" }
          ],
          correctLabel: "A",
          correctWord: "prosper",
          targetWord: "prosper",
          explanations: {
            A: "Prosper: phát triển phồn thịnh, ăn nên làm ra giữa bối cảnh đại khủng hoảng (đồng nghĩa với it thrived).",
            B: "Decline: suy giảm tụt dốc, hoàn toàn mâu thuẫn với mệnh đề 'it thrived'.",
            C: "Get on: hòa thuận hoặc tiếp tục sống, không mang tính học thuật phồn vinh kinh tế.",
            D: "Flower: nở rộ (thường dùng ẩn dụ nghệ thuật/văn hóa, không chuẩn ngữ pháp 'town to prosper')."
          },
          explanationVi: "Prosper = phát triển kinh tế thịnh vượng rực rỡ trong giai đoạn suy thoái thập niên 1930."
        },
        {
          gapNumber: 3,
          options: [
            { label: "A", text: "trusted" },
            { label: "B", text: "funded" },
            { label: "C", text: "accounted" },
            { label: "D", text: "stocked" }
          ],
          correctLabel: "B",
          correctWord: "funded",
          targetWord: "funded",
          explanations: {
            A: "Trusted: tin tưởng ai đó, không đi trực tiếp với danh từ tân ngữ chỉ dự án kinh tế 'a massive building boom'.",
            B: "Funded: tài trợ vốn toàn diện, bỏ tiền túi cấp kinh phí cho đợt bùng nổ xây dựng quy mô lớn.",
            C: "Accounted: đi với for = giải trình cho hoặc chiếm tỉ lệ.",
            D: "Stocked: tích trữ hàng hóa."
          },
          explanationVi: "Funded a massive building boom = tài trợ toàn bộ chi phí tài chính cho làn sóng xây dựng khổng lồ."
        },
        {
          gapNumber: 4,
          options: [
            { label: "A", text: "pretensions" },
            { label: "B", text: "objections" },
            { label: "C", text: "preoccupation" },
            { label: "D", text: "intentions" }
          ],
          correctLabel: "D",
          correctWord: "intentions",
          targetWord: "intentions",
          explanations: {
            A: "Pretensions: sự kỳ vọng khoe khoang, tự phụ hão huyền.",
            B: "Objections: lời phản đối bất bình.",
            C: "Preoccupation: mối bận tâm canh cánh trong lòng.",
            D: "Intentions: ý định, mục đích hành động (his intentions were partly selfish = ý đồ tạo việc làm mang động cơ cá nhân)."
          },
          explanationVi: "Intentions = chủ đích, ý đồ dự định trong kế hoạch sử dụng nhân công xây dựng."
        },
        {
          gapNumber: 5,
          options: [
            { label: "A", text: "spared" },
            { label: "B", text: "spent" },
            { label: "C", text: "allowed" },
            { label: "D", text: "justified" }
          ],
          correctLabel: "A",
          correctWord: "spared",
          targetWord: "spared",
          explanations: {
            A: "Spared: Collocation thành ngữ C1 'spare no expense' = không tiếc bất kỳ khoản chi phí nào để đạt chất lượng cao nhất.",
            B: "Spent: Dùng 'spent no expense' sai ngữ pháp thành ngữ cố định tiếng Anh.",
            C: "Allowed: Cho phép.",
            D: "Justified: Biện minh thanh minh."
          },
          explanationVi: "Thành ngữ chuẩn C1: 'spare no expense' = vung tiền không tiếc tay, đầu tư tối đa."
        },
        {
          gapNumber: 6,
          options: [
            { label: "A", text: "impoverished" },
            { label: "B", text: "unattractive" },
            { label: "C", text: "poor" },
            { label: "D", text: "opulent" }
          ],
          correctLabel: "D",
          correctWord: "opulent",
          targetWord: "opulent",
          explanations: {
            A: "Impoverished: nghèo nàn kiệt quệ, trái ngược với 'spared no expense'.",
            B: "Unattractive: xấu xí không thu hút.",
            C: "Poor: nghèo nàn chất lượng thấp.",
            D: "Opulent: cực kỳ xa hoa lộng lẫy, tráng lệ sang trọng (tòa nhà 3 triệu USD thời bấy giờ).",
          },
          explanationVi: "Opulent = xa hoa rực rỡ, trang hoàng lộng lẫy tột bậc bằng đá cẩm thạch và dát vàng."
        },
        {
          gapNumber: 7,
          options: [
            { label: "A", text: "hosting" },
            { label: "B", text: "housing" },
            { label: "C", text: "host" },
            { label: "D", text: "homogeneously" }
          ],
          correctLabel: "C",
          correctWord: "host",
          targetWord: "host",
          explanations: {
            A: "Hosting: sai cấu trúc ngữ pháp sau động từ played.",
            B: "Housing: cung cấp chỗ ở.",
            C: "Host: Collocation C1 'play host to sth' = đứng ra làm địa điểm đăng cai/chào đón các chương trình biểu diễn.",
            D: "Homogeneously: phó từ trạng thái đồng nhất."
          },
          explanationVi: "Collocation C1 cao cấp: 'play host to touring Broadway shows' = đăng cai, tổ chức đón các đoàn diễn Broadway."
        },
        {
          gapNumber: 8,
          options: [
            { label: "A", text: "aptly" },
            { label: "B", text: "inappropriately" },
            { label: "C", text: "seemingly" },
            { label: "D", text: "frightfully" }
          ],
          correctLabel: "A",
          correctWord: "aptly",
          targetWord: "aptly",
          explanations: {
            A: "Aptly: một cách vô cùng thích hợp, hoàn toàn xác đáng (aptly named = được đặt tên rất đúng với tầm vóc hoành tráng).",
            B: "Inappropriately: một cách bất hợp lý, thiếu phù hợp.",
            C: "Seemingly: có vẻ dường như.",
            D: "Frightfully: ghê sợ kinh hoàng."
          },
          explanationVi: "Aptly named = được đặt tên hết sức xứng đáng và phù hợp với thực tế không gian."
        },
        {
          gapNumber: 9,
          options: [
            { label: "A", text: "dizzying" },
            { label: "B", text: "gaudy" },
            { label: "C", text: "dazzling" },
            { label: "D", text: "bland" }
          ],
          correctLabel: "C",
          correctWord: "dazzling",
          targetWord: "dazzling",
          explanations: {
            A: "Dizzying: gây chóng mặt hoa mắt tiêu cực.",
            B: "Gaudy: lòe loẹt, diêm dúa diêm dúa rẻ tiền thiếu tinh tế.",
            C: "Dazzling: chói lọi, lộng lẫy say đắm lòng người (dazzling inner foyer dát vàng tuyệt mỹ).",
            D: "Bland: nhạt nhẽo đơn điệu không điểm nhấn."
          },
          explanationVi: "Dazzling = đẹp rực rỡ lộng lẫy, tỏa sáng lung linh với vòm trần ốp vàng."
        },
        {
          gapNumber: 10,
          options: [
            { label: "A", text: "holed" },
            { label: "B", text: "studded" },
            { label: "C", text: "supported" },
            { label: "D", text: "magnified" }
          ],
          correctLabel: "B",
          correctWord: "studded",
          targetWord: "studded",
          explanations: {
            A: "Holed: bị đục lỗ thủng lỗ chỗ.",
            B: "Studded: Collocation 'studded with' = được đính đầy, khảm kín bởi (88 bóng đèn nhỏ tạo bầu trời ngàn sao).",
            C: "Supported: được chống đỡ hỗ trợ.",
            D: "Magnified: được phóng to qua thấu kính."
          },
          explanationVi: "Studded with lightbulbs = được khảm/đính dày đặc bóng đèn li ti tựa bầu trời đêm đầy sao."
        }
      ]
    }
  ],

  // 6. Speed Blitz (20 Instant-Recall Questions from Page 33 Task Three & Page 34 Ex B)
  speedBlitz: [
    // Questions 1-10: Confusable Words & Context Nuances (Page 33 Task Three)
    {
      id: "u8-sb-1",
      questionNumber: 1,
      prompt: "I knew from the ______ that the ambitious business plan would turn out to be a complete flop.",
      options: [
        { key: "a", text: "onslaught" },
        { key: "b", text: "onset" },
        { key: "c", text: "outburst" },
        { key: "d", text: "outset" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "onslaught", pos: "n", vi: "Sai: cuộc tấn công dữ dội như vũ bão của quân đội" },
        { key: "b", word: "onset", pos: "n", vi: "Chính xác: from the onset = ngay từ thời điểm bắt đầu diễn biến của sự việc" },
        { key: "c", word: "outburst", pos: "n", vi: "Sai: sự bộc phát cơn giận dữ" },
        { key: "d", word: "outset", pos: "n", vi: "At the outset (còn trong đề bài dùng 'from the onset')" }
      ]
    },
    {
      id: "u8-sb-2",
      questionNumber: 2,
      prompt: "We are almost ready to sign the property contract; now, what's the ______?",
      options: [
        { key: "a", text: "snug" },
        { key: "b", text: "snag" },
        { key: "c", text: "slug" },
        { key: "d", text: "smug" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "snug", pos: "adj", vi: "Ấm cúng, vừa vặn" },
        { key: "b", word: "snag", pos: "n", vi: "Chính xác: what's the snag? = Trục trặc hoặc vướng mắc bất ngờ là gì?" },
        { key: "c", word: "slug", pos: "n", vi: "Con sên" },
        { key: "d", word: "smug", pos: "adj", vi: "Tự mãn tự phụ" }
      ]
    },
    {
      id: "u8-sb-3",
      questionNumber: 3,
      prompt: "A reckless driver may even collide with a completely ______ vehicle parked on the kerb.",
      options: [
        { key: "a", text: "stationery" },
        { key: "b", text: "stationary" },
        { key: "c", text: "stagnant" },
        { key: "d", text: "stationed" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "stationery", pos: "n", vi: "Sai chính tả: văn phòng phẩm (tập vở, bút viết)" },
        { key: "b", word: "stationary", pos: "adj", vi: "Chính xác: đứng yên một chỗ, không di chuyển (stationary vehicle)" },
        { key: "c", word: "stagnant", pos: "adj", vi: "Nước tù đọng hoặc kinh tế trì trệ" },
        { key: "d", word: "stationed", pos: "v", vi: "Được điều động đóng quân" }
      ]
    },
    {
      id: "u8-sb-4",
      questionNumber: 4,
      prompt: "No set of unforeseen reverses could ever ______ him from proceeding with his lifelong mission.",
      options: [
        { key: "a", text: "defer" },
        { key: "b", text: "deter" },
        { key: "c", text: "defend" },
        { key: "d", text: "differ" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "defer", pos: "v", vi: "Hoãn lại hoặc chiều theo ý kiến người khác" },
        { key: "b", word: "deter", pos: "collocation", vi: "Chính xác: deter sb from doing sth = ngăn cản, làm thoái chí nản lòng" },
        { key: "c", word: "defend", pos: "v", vi: "Bảo vệ, phòng thủ" },
        { key: "d", word: "differ", pos: "v", vi: "Khác biệt" }
      ]
    },
    {
      id: "u8-sb-5",
      questionNumber: 5,
      prompt: "The champion team has secured their fifth ______ victory this month without a single loss.",
      options: [
        { key: "a", text: "successful" },
        { key: "b", text: "successive" },
        { key: "c", text: "succeeding" },
        { key: "d", text: "successional" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "successful", pos: "adj", vi: "Thành công (không mang nghĩa liên tiếp theo chuỗi)" },
        { key: "b", word: "successive", pos: "adj", vi: "Chính xác: liên tiếp, dồn dập kế tiếp nhau (successive victories/games)" },
        { key: "c", word: "succeeding", pos: "adj", vi: "Kế tục tiếp sau" },
        { key: "d", word: "successional", pos: "adj", vi: "Liên quan đến diễn thế sinh thái" }
      ]
    },
    {
      id: "u8-sb-6",
      questionNumber: 6,
      prompt: "After surviving two train delays and meeting the prime minister, what an ______ day it has been!",
      options: [
        { key: "a", text: "inventive" },
        { key: "b", text: "eventful" },
        { key: "c", text: "eventual" },
        { key: "d", text: "evident" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "inventive", pos: "adj", vi: "Có óc phát minh sáng tạo" },
        { key: "b", word: "eventful", pos: "adj", vi: "Chính xác: eventful day = ngày đầy ắp các sự kiện biến cố sôi động" },
        { key: "c", word: "eventual", pos: "adj", vi: "Rốt cuộc, cuối cùng xảy ra" },
        { key: "d", word: "evident", pos: "adj", vi: "Hiển nhiên rõ ràng" }
      ]
    },
    {
      id: "u8-sb-7",
      questionNumber: 7,
      prompt: "Austere governmental measures invariably mean practising ______ and inflexible economics.",
      options: [
        { key: "a", text: "frigid" },
        { key: "b", text: "rigid" },
        { key: "c", text: "rancid" },
        { key: "d", text: "timid" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "frigid", pos: "adj", vi: "Lạnh buốt, lãnh cảm thờ ơ" },
        { key: "b", word: "rigid", pos: "collocation", vi: "Chính xác: rigid economics = chính sách thắt lưng buộc bụng cứng rắn nghiêm ngặt" },
        { key: "c", word: "rancid", pos: "adj", vi: "Ôi thiu, bốc mùi khét của mỡ" },
        { key: "d", word: "timid", pos: "adj", vi: "Nhút nhát rụt rè" }
      ]
    },
    {
      id: "u8-sb-8",
      questionNumber: 8,
      prompt: "Despite the grim company outlook, the CEO was in an unusually ______ mood that afternoon.",
      options: [
        { key: "a", text: "trivial" },
        { key: "b", text: "jovial" },
        { key: "c", text: "juvenile" },
        { key: "d", text: "jubilant" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "trivial", pos: "adj", vi: "Tầm phào vụn vặt" },
        { key: "b", word: "jovial", pos: "adj", vi: "Chính xác: jovial mood = tâm trạng vui vẻ, cởi mở sảng khoái và ấm áp" },
        { key: "c", word: "juvenile", pos: "adj", vi: "Vị thành niên, trẻ con" },
        { key: "d", word: "jubilant", pos: "adj", vi: "Hân hoan tưng bừng ăn mừng chiến thắng" }
      ]
    },
    {
      id: "u8-sb-9",
      questionNumber: 9,
      prompt: "Unlike ailments transmitted by touch, measles is an exceptionally ______ disease.",
      options: [
        { key: "a", text: "contiguous" },
        { key: "b", text: "contagious" },
        { key: "c", text: "continuous" },
        { key: "d", text: "contingent" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "contiguous", pos: "adj", vi: "Tiếp giáp địa lý, kề sát chung biên giới (contiguous states)" },
        { key: "b", word: "contagious", pos: "adj", vi: "Chính xác: contagious disease = bệnh truyền nhiễm lây lan nhanh qua không khí hoặc tiếp xúc" },
        { key: "c", word: "continuous", pos: "adj", vi: "Liên tục không ngắt quãng" },
        { key: "d", word: "contingent", pos: "adj", vi: "Phụ thuộc vào điều kiện" }
      ]
    },
    {
      id: "u8-sb-10",
      questionNumber: 10,
      prompt: "In navigation, the sailor needs to know how to ______ the boat through narrow reefs.",
      options: [
        { key: "a", text: "stir" },
        { key: "b", text: "steer" },
        { key: "c", text: "stow" },
        { key: "d", text: "stem" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "stir", pos: "v", vi: "Khuấy nước hoặc khơi dậy cảm xúc" },
        { key: "b", word: "steer", pos: "collocation", vi: "Chính xác: steer the boat = bẻ lái, điều khiển hướng đi của con tàu" },
        { key: "c", word: "stow", pos: "v", vi: "Xếp hành lý cất gọn" },
        { key: "d", word: "stem", pos: "v", vi: "Ngăn chặn dòng chảy" }
      ]
    },

    // Questions 11-20: Advanced C1 Practice Multiple-Choice (Page 34 Ex B)
    {
      id: "u8-sb-11",
      questionNumber: 11,
      prompt: "Employees who harbour a legitimate ______ are strongly encouraged to discuss it with HR.",
      options: [
        { key: "a", text: "hindrance" },
        { key: "b", text: "grievance" },
        { key: "c", text: "disturbance" },
        { key: "d", text: "precaution" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "hindrance", pos: "n", vi: "Vật cản trở" },
        { key: "b", word: "grievance", pos: "collocation", vi: "Chính xác: air a grievance = mối bất bình, khiếu nại về đối xử bất công trong việc làm" },
        { key: "c", word: "disturbance", pos: "n", vi: "Sự quấy rầy mất trật tự" },
        { key: "d", word: "precaution", pos: "n", vi: "Biện pháp phòng ngừa" }
      ]
    },
    {
      id: "u8-sb-12",
      questionNumber: 12,
      prompt: "Extreme physical decrepitude and old age seriously ______ both vision and hearing faculties.",
      options: [
        { key: "a", text: "impairs" },
        { key: "b", text: "enhances" },
        { key: "c", text: "withers" },
        { key: "d", text: "shrinks" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "impairs", pos: "collocation", vi: "Chính xác: impair vision/hearing = làm suy yếu, tổn hại chức năng thị giác/thính giác" },
        { key: "b", word: "enhances", pos: "v", vi: "Trái nghĩa: tăng cường nâng cao" },
        { key: "c", word: "withers", pos: "v", vi: "Tàn héo (hoa lá hoặc sự tàn phai danh tiếng)" },
        { key: "d", word: "shrinks", pos: "v", vi: "Co lại về kích thước" }
      ]
    },
    {
      id: "u8-sb-13",
      questionNumber: 13,
      prompt: "The audit committee ______ his financial proposal under a microscope before accepting it.",
      options: [
        { key: "a", text: "rejected" },
        { key: "b", text: "ignored" },
        { key: "c", text: "overlooked" },
        { key: "d", text: "scrutinised" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "rejected", pos: "v", vi: "Bác bỏ (sau đó lại nói before accepting it)" },
        { key: "b", word: "ignored", pos: "v", vi: "Phớt lờ bỏ qua" },
        { key: "c", word: "overlooked", pos: "v", vi: "Bỏ sót không nhìn thấy" },
        { key: "d", word: "scrutinised", pos: "collocation", vi: "Chính xác: scrutinised his proposal = thẩm định, soi xét kỹ lưỡng đến từng chi tiết" }
      ]
    },
    {
      id: "u8-sb-14",
      questionNumber: 14,
      prompt: "A few political extremists deliberately ______ the agitated crowd to attack the riot police.",
      options: [
        { key: "a", text: "incited" },
        { key: "b", text: "animated" },
        { key: "c", text: "stirred" },
        { key: "d", text: "agitated" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "incited", pos: "collocation", vi: "Chính xác: incite the crowd to do sth = kích động, xúi giục đám đông bạo lực" },
        { key: "b", word: "animated", pos: "v", vi: "Làm sống động vui tươi" },
        { key: "c", word: "stirred", pos: "v", vi: "Stir up a crowd (thiếu giới từ)" },
        { key: "d", word: "agitated", pos: "v", vi: "Làm bồn chồn (agitate for rights)" }
      ]
    },
    {
      id: "u8-sb-15",
      questionNumber: 15,
      prompt: "He spent his entire adventurous youth ______ round the world, never settling down anywhere.",
      options: [
        { key: "a", text: "scattering" },
        { key: "b", text: "roaming" },
        { key: "c", text: "exploring" },
        { key: "d", text: "transporting" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "scattering", pos: "v", vi: "Rải rác phân tán" },
        { key: "b", word: "roaming", pos: "collocation", vi: "Chính xác: roam round the world = phiêu bạt, lang bạt khắp năm châu bốn bể" },
        { key: "c", word: "exploring", pos: "v", vi: "Exploring the world (không đi với giới từ round the world)" },
        { key: "d", word: "transporting", pos: "v", vi: "Vận chuyển hàng hóa" }
      ]
    },
    {
      id: "u8-sb-16",
      questionNumber: 16,
      prompt: "The examiner's piercing cold stare completely ______ Mary, making her forget her lines.",
      options: [
        { key: "a", text: "amazed" },
        { key: "b", text: "dumbfounded" },
        { key: "c", text: "imperiled" },
        { key: "d", text: "disconcerted" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "amazed", pos: "v", vi: "Làm kinh ngạc thán phục" },
        { key: "b", word: "dumbfounded", pos: "v", vi: "Làm chết lặng vì sốc" },
        { key: "c", word: "imperiled", pos: "v", vi: "Làm nguy hiểm đến tính mạng" },
        { key: "d", word: "disconcerted", pos: "v", vi: "Chính xác: disconcert sb = làm ai đó lúng túng, bối rối mất hết tự chủ" }
      ]
    },
    {
      id: "u8-sb-17",
      questionNumber: 17,
      prompt: "It's high time we ______ the formal surgical procedure in the operating room.",
      options: [
        { key: "a", text: "tortured" },
        { key: "b", text: "occurred" },
        { key: "c", text: "commenced" },
        { key: "d", text: "soothed" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "tortured", pos: "v", vi: "Tra tấn hành hạ" },
        { key: "b", word: "occurred", pos: "v", vi: "Xảy ra diễn ra" },
        { key: "c", word: "commenced", pos: "collocation", vi: "Chính xác: commence the procedure = bắt đầu tiến hành quy trình phẫu thuật trang nghiêm" },
        { key: "d", word: "soothed", pos: "v", vi: "Làm dịu vết đau" }
      ]
    },
    {
      id: "u8-sb-18",
      questionNumber: 18,
      prompt: "Due to late filing of evidence, the judge decided to ______ the high-profile trial till next week.",
      options: [
        { key: "a", text: "admire" },
        { key: "b", text: "admit" },
        { key: "c", text: "adjust" },
        { key: "d", text: "adjourn" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "admire", pos: "v", vi: "Ngưỡng mộ kính trọng" },
        { key: "b", word: "admit", pos: "v", vi: "Thừa nhận dung nạp" },
        { key: "c", word: "adjust", pos: "v", vi: "Điều chỉnh cân đối" },
        { key: "d", word: "adjourn", pos: "collocation", vi: "Chính xác: adjourn a trial = hoãn phiên tòa đến một ngày giờ khác" }
      ]
    },
    {
      id: "u8-sb-19",
      questionNumber: 19,
      prompt: "Under no circumstances would I ever like to ______ my hard-earned professional reputation.",
      options: [
        { key: "a", text: "enrich" },
        { key: "b", text: "jeopardise" },
        { key: "c", text: "constrain" },
        { key: "d", text: "prolong" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "enrich", pos: "v", vi: "Làm giàu thêm" },
        { key: "b", word: "jeopardise", pos: "collocation", vi: "Chính xác: jeopardise one's reputation = gây nguy hiểm, liều mạng hủy hoại danh tiếng" },
        { key: "c", word: "constrain", pos: "v", vi: "Gò ép bắt buộc" },
        { key: "d", word: "prolong", pos: "v", vi: "Kéo dài thời gian" }
      ]
    },
    {
      id: "u8-sb-20",
      questionNumber: 20,
      prompt: "If I was reckless enough to do that, it would certainly ______ my employer's wrath and displeasure.",
      options: [
        { key: "a", text: "occur" },
        { key: "b", text: "incur" },
        { key: "c", text: "recur" },
        { key: "d", text: "concur" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "occur", pos: "v", vi: "Xảy ra" },
        { key: "b", word: "incur", pos: "collocation", vi: "Chính xác: incur sb's displeasure / wrath / debts = tự rước lấy cơn thịnh nộ, gánh chịu hậu quả bất lợi" },
        { key: "c", word: "recur", pos: "v", vi: "Tái diễn định kỳ" },
        { key: "d", word: "concur", pos: "v", vi: "Đồng thuận nhất trí" }
      ]
    }
  ]
};



export const VOCAB_C1_UNIT_9: VocabC1Unit = {
  unitId: 9,
  title: "Unit 9: Character, Conduct & Reaction",
  subtitle: "The Vocabulary Files - Level C1 (Pages 35-39)",

  // 1. Words in Action (10 Core Lexical Sets with Synonyms & Antonyms from Page 35 Exercise A & B)
  wordsInAction: [
    {
      id: "u9-wia-1",
      word: "alluring",
      ipa: "/əˈlʊə.rɪŋ/",
      nuance: "[Powerfully and mysteriously attractive, enticing or tempting]",
      register: "Literary / Descriptive",
      collocations: ["alluring smile", "alluring prospect", "alluring fragrance", "highly alluring"],
      enDef: "Powerfully and mysteriously attractive, fascinating, or seductive.",
      viDef: "Quyến rũ, lôi cuốn, mê hoặc (nụ cười, viễn cảnh đầy cám dỗ).",
      example: "The mysterious stranger gave an **alluring** smile before disappearing into the crowd.",
      targetKeyword: "alluring"
    },
    {
      id: "u9-wia-2",
      word: "deteriorate",
      ipa: "/dɪˈtɪə.ri.ə.reɪt/",
      nuance: "[Progressively become worse in quality, health or condition; degenerate]",
      register: "Medical / Formal",
      collocations: ["condition deteriorates", "health deteriorates", "relations deteriorate", "rapidly deteriorate"],
      enDef: "To become progressively worse, weaker, or inferior in character, condition, or value.",
      viDef: "Xấu đi, suy thoái, chuyển biến trầm trọng hơn (sức khỏe, thời tiết, quan hệ ngoại giao).",
      example: "Her medical condition seems to be **deteriorating** rapidly; she must be moved to intensive care.",
      targetKeyword: "deteriorate"
    },
    {
      id: "u9-wia-3",
      word: "cheeky",
      ipa: "/ˈtʃiː.ki/",
      nuance: "[Insolent, disrespectful or impudent in an endearing or provocative way]",
      register: "Informal / Expressive",
      collocations: ["cheeky grin", "cheeky remark", "cheeky behavior", "cheeky youngster"],
      enDef: "Showing a bold, impudent lack of respect, often in a saucy or cheeky manner.",
      viDef: "Hỗn láo, xấc xược, táo tợn (thái độ vô phép, lời nói cộc lốc của đứa trẻ).",
      example: "I can't bear such audacity in a child; her insolent **cheek** will not go unpunished.",
      targetKeyword: "cheeky"
    },
    {
      id: "u9-wia-4",
      word: "fetid",
      ipa: "/ˈfet.ɪd/",
      nuance: "[Smelling extremely unpleasant, pungent, foul and offensive; putrid]",
      register: "Formal / Medical",
      collocations: ["fetid breath", "fetid odor", "fetid swamp", "fetid air"],
      enDef: "Smelling extremely unpleasant, stale, and offensive; foul-smelling from decay.",
      viDef: "Hôi thối, nồng nặc mùi xú uế (hơi thở sâu răng, đầm lầy ô nhiễm, thức ăn phân hủy).",
      example: "A chronically **fetid** breath is often a clinical indication of advanced dental cavities.",
      targetKeyword: "fetid"
    },
    {
      id: "u9-wia-5",
      word: "detrimental",
      ipa: "/ˌdet.rɪˈmen.təl/",
      nuance: "[Tending to cause definite harm, damage or disadvantage; noxious]",
      register: "Academic / Formal",
      collocations: ["detrimental effect", "detrimental impact", "highly detrimental", "detrimental to health"],
      enDef: "Causing harm, injury, damage, or prejudice; deleterious or adverse in effect.",
      viDef: "Có hại, gây tổn hại bất lợi (tác động tiêu cực đến sức khỏe, môi trường hoặc sự nghiệp).",
      example: "Prolonged sleeplessness exerts a severely **detrimental** effect on cognitive performance.",
      targetKeyword: "detrimental"
    },
    {
      id: "u9-wia-6",
      word: "rattled",
      ipa: "/ˈræt.əld/",
      nuance: "[Nervous, confused, flustered or embarrassed by unexpected pressure]",
      register: "Standard / Expressive",
      collocations: ["visibly rattled", "easily rattled", "rattled by questions", "rattled witness"],
      enDef: "Flustered, unnerved, agitated, or unsettled through shock, confusion, or aggressive probing.",
      viDef: "Bị làm hoảng hốt, bối rối lúng túng, mất bình tĩnh (khi bị đối chất dồn dập).",
      example: "The defense lawyer's fierce and relentless questioning completely **rattled** the witness on the stand.",
      targetKeyword: "rattled"
    },
    {
      id: "u9-wia-7",
      word: "abhorrent",
      ipa: "/əbˈhɒr.ənt/",
      nuance: "[Inspiring utter disgust and loathing; repugnant and morally despicable]",
      register: "Ethical / Formal",
      collocations: ["morally abhorrent", "abhorrent behavior", "abhorrent crimes", "utterly abhorrent"],
      enDef: "Inspiring feelings of utter disgust, loathing, or moral outrage; repugnant.",
      viDef: "Ghê tởm, đáng kinh tởm, đáng ghét cay ghét đắng (hành vi tàn bạo, tư tưởng độc ác).",
      example: "His despotic cruelty was so utterly **abhorrent** that even his closest kin came to despise him.",
      targetKeyword: "abhorrent"
    },
    {
      id: "u9-wia-8",
      word: "slovenly",
      ipa: "/ˈslʌv.ən.li/",
      nuance: "[Untidy, slipshod, messy, and careless in appearance or work habits]",
      register: "Formal / Critical",
      collocations: ["slovenly appearance", "slovenly habits", "slovenly work", "slovenly dress"],
      enDef: "Habitually untidy, messy, or careless in personal appearance, manners, or work execution.",
      viDef: "Nhếch nhác, lôi thôi lếch thếch, cẩu thả luộm thuộm (về ăn mặc hoặc tác phong).",
      example: "Her supervisor reprimanded him for his consistently **slovenly** attire and careless paperwork.",
      targetKeyword: "slovenly"
    },
    {
      id: "u9-wia-9",
      word: "discursive",
      ipa: "/dɪˈskɜː.sɪv/",
      nuance: "[Digressing ramblingly from subject to subject; wandering and rambling]",
      register: "Academic / Literary",
      collocations: ["discursive essay", "discursive style", "discursive rambling", "discursive lecture"],
      enDef: "Moving from topic to topic without clear order or coherence; digressing or rambling loosely.",
      viDef: "Lan man, dông dài, lạc đề, không mạch lạc tập trung (bài luận, cuộc trò chuyện).",
      example: "His seminar degenerated into an excessively **discursive** speech that strayed far from the core thesis.",
      targetKeyword: "discursive"
    },
    {
      id: "u9-wia-10",
      word: "whimsical",
      ipa: "/ˈwɪm.zɪ.kəl/",
      nuance: "[Playfully quaint, fanciful, or caprice-driven in an endearing manner]",
      register: "Literary / Descriptive",
      collocations: ["whimsical sense of humor", "whimsical smile", "whimsical charm", "whimsical notion"],
      enDef: "Playfully quaint, unusual, fanciful, or appealingly eccentric in behavior or appearance.",
      viDef: "Kỳ quặc một cách hóm hỉnh, thất thường tinh nghịch, ngộ nghĩnh đáng yêu.",
      example: "The mischievous child turned back and gave us an enchanting, **whimsical** smile.",
      targetKeyword: "whimsical"
    }
  ],

  // 2. Word Formation (8 Sentence Transformations into Adjectives from Page 36 Task One)
  wordFormation: [
    {
      id: "u9-wf-1",
      adjective: "tearful",
      noun: "tearful eyes",
      root: "tear",
      suffix: "-ful (Adjective)",
      meaningVi: "Đầm đìa nước mắt (thay 'eyes filled with tears' bằng 'tearful eyes')",
      suffixChoices: ["tearful", "tearing", "teared", "tearless"],
      ruleTip: "Chuyển cụm giới từ 'with eyes filled with tears' ➔ 'with tearful eyes'."
    },
    {
      id: "u9-wf-2",
      adjective: "likely",
      noun: "He is likely to come",
      root: "likelihood",
      suffix: "-ly (Adjective of Probability)",
      meaningVi: "Có khả năng cao (thay 'In all likelihood, he will come' bằng 'He is likely to come')",
      suffixChoices: ["likely", "likable", "liking", "likelier"],
      ruleTip: "Cấu trúc tương đương: 'In all likelihood, S + V' ➔ 'S is likely to + V'."
    },
    {
      id: "u9-wf-3",
      adjective: "disrespectful",
      noun: "disrespectful of elders",
      root: "respect",
      suffix: "dis- ... -ful (Opposite Adjective)",
      meaningVi: "Bất kính, vô lễ (thay 'shows no respect for' bằng 'is disrespectful of')",
      suffixChoices: ["disrespectful", "unrespectable", "irrespective", "respectless"],
      ruleTip: "Chuyển cụm 'shows no respect for his elders' ➔ 'is disrespectful of his elders'."
    },
    {
      id: "u9-wf-4",
      adjective: "contemptuous",
      noun: "contemptuous of thieves",
      root: "contempt",
      suffix: "-uous (Adjective)",
      meaningVi: "Khinh bỉ, coi thường (thay 'feels nothing but contempt for' bằng 'is contemptuous of')",
      suffixChoices: ["contemptuous", "contemptible", "contempting", "contemptive"],
      ruleTip: "Phân biệt C1: 'contemptuous of sb' (khinh miệt ai) vs 'contemptible' (đáng khinh)."
    },
    {
      id: "u9-wf-5",
      adjective: "molten",
      noun: "molten iron",
      root: "melt",
      suffix: "-en (Archaic Adjective)",
      meaningVi: "Nóng chảy (thay 'melted the iron and poured it' bằng 'poured molten iron')",
      suffixChoices: ["molten", "melting", "melty", "meltable"],
      ruleTip: "Kim loại nung chảy ở nhiệt độ cao dùng tính từ đặc thù C1: 'molten iron / molten lava'."
    },
    {
      id: "u9-wf-6",
      adjective: "inexplicable",
      noun: "inexplicable behaviour",
      root: "explain",
      suffix: "in- ... -able (Negative Adjective)",
      meaningVi: "Không thể giải thích nổi (thay 'couldn't explain his behaviour' bằng 'was inexplicable')",
      suffixChoices: ["inexplicable", "unexplainable", "non-explanatory", "inexplicative"],
      ruleTip: "Chuyển thành tính từ học thuật C1: 'His behaviour was inexplicable'."
    },
    {
      id: "u9-wf-7",
      adjective: "impossible",
      noun: "impossible for him to pass",
      root: "possibility",
      suffix: "im- ... -ible (Adjective)",
      meaningVi: "Bất khả thi (thay 'There is no possibility of his passing' bằng 'It's not possible / impossible')",
      suffixChoices: ["impossible", "impassable", "non-possible", "unpossible"],
      ruleTip: "Cấu trúc C1: 'It's not possible / impossible for him to pass the exam'."
    },
    {
      id: "u9-wf-8",
      adjective: "fallible",
      noun: "often fallible",
      root: "fail",
      suffix: "-ible (Adjective of Frailty)",
      meaningVi: "Dễ mắc sai lầm, có thể hỏng hóc (thay 'often fail' bằng 'are often fallible')",
      suffixChoices: ["fallible", "failure-prone", "faulty", "fallacious"],
      ruleTip: "Tính từ triết học C1: 'fallible' = con người hoặc máy móc ai cũng có lúc sai sót."
    }
  ],

  // 3. Confusable Words (10 Pairs from Page 37 Task Three)
  confusableWords: [
    {
      id: "u9-cw-1",
      pairKey: "convert-pervert",
      wordA: "convert",
      wordB: "pervert",
      diffHighlightA: { before: "", highlight: "convert", after: "" },
      diffHighlightB: { before: "", highlight: "pervert", after: "" },
      promptSentence: "Christian missionaries historically journeyed overseas to ______ pagan tribes to their faith.",
      correctWord: "convert",
      defA: "Convert: Cải đạo, chuyển hóa niềm tin tôn giáo, thay đổi mục đích sử dụng tích cực.",
      defB: "Pervert: Xuyên tạc, làm sai lệch công lý/sự thật, hoặc làm suy đồi tha hóa nhân cách.",
      mnemonic: "Convert = chuyển biến niềm tin; Pervert = làm bại hoại xuyên tạc."
    },
    {
      id: "u9-cw-2",
      pairKey: "convention-conviction",
      wordA: "convention",
      wordB: "conviction",
      diffHighlightA: { before: "", highlight: "convention", after: "" },
      diffHighlightB: { before: "", highlight: "conviction", after: "" },
      promptSentence: "It is my deep personal ______ that the self-proclaimed guru is an absolute financial fraud.",
      correctWord: "conviction",
      defA: "Convention: Quy ước xã hội, tục lệ truyền thống; hoặc hội nghị, hiệp định công ước.",
      defB: "Conviction: Niềm tin vững chắc, xác tín sâu sắc trong tâm can; hoặc phán quyết kết án có tội.",
      mnemonic: "Conviction = xác tín sắt đá / bản án; Convention = hội nghị / quy ước thông lệ."
    },
    {
      id: "u9-cw-3",
      pairKey: "coach-couch",
      wordA: "coach",
      wordB: "couch",
      diffHighlightA: { before: "", highlight: "coach", after: "" },
      diffHighlightB: { before: "", highlight: "couch", after: "" },
      promptSentence: "Mr. Jones is our dedicated varsity baseball ______ who led the team to state finals.",
      correctWord: "coach",
      defA: "Coach: Huấn luyện viên thể thao, người rèn luyện; hoặc xe khách đường dài.",
      defB: "Couch: Ghế trường kỷ, ghế sofa nệm dài để nằm nghỉ ngơi xem ti vi.",
      mnemonic: "Coach = thầy huấn luyện; Couch potato = kẻ lười nằm ườn trên sofa."
    },
    {
      id: "u9-cw-4",
      pairKey: "reverted-retorted",
      wordA: "reverted",
      wordB: "retorted",
      diffHighlightA: { before: "", highlight: "reverted", after: "" },
      diffHighlightB: { before: "", highlight: "reverted", after: "" },
      promptSentence: "Unfortunately, under stressful family circumstances he ______ to heavy drinking again.",
      correctWord: "reverted",
      defA: "Reverted: Quay trở lại thói quen xấu hoặc trạng thái nguyên thủy tiêu cực (revert to old habits).",
      defB: "Retorted: Đáp trả đanh thép, cãi lại bằng lời lẽ sắc sảo ngay lập tức.",
      mnemonic: "Revert to drinking = tái nghiện; Retort = đối đáp đanh thép."
    },
    {
      id: "u9-cw-5",
      pairKey: "cross-gross",
      wordA: "cross",
      wordB: "gross",
      diffHighlightA: { before: "", highlight: "cross", after: "" },
      diffHighlightB: { before: "", highlight: "gross", after: "" },
      promptSentence: "I truly dislike people who are constantly ______ and irritable with me for no reason.",
      correctWord: "cross",
      defA: "Cross (with sb): Bực mình, càu nhàu, khó chịu gắt gỏng với ai đó (annoyed, irritable).",
      defB: "Gross: Thô bỉ ghê tởm; hoặc tổng doanh thu trước thuế (gross income).",
      mnemonic: "Cross with me = cáu gắt với tôi; Gross = kinh tởm / tổng doanh thu."
    },
    {
      id: "u9-cw-6",
      pairKey: "localise-locate",
      wordA: "localise",
      wordB: "locate",
      diffHighlightA: { before: "", highlight: "localise", after: "" },
      diffHighlightB: { before: "", highlight: "locate", after: "" },
      promptSentence: "Highly virulent contagious diseases are notoriously difficult to ______ within one province.",
      correctWord: "localise",
      defA: "Localise: Khoanh vùng, cô lập và khống chế ổ dịch trong một phạm vi hẹp không để lan rộng.",
      defB: "Locate: Định vị, xác định tọa độ hoặc tìm ra vị trí chính xác của đồ vật bị mất.",
      mnemonic: "Localise disease = khoanh vùng dịch tễ; Locate = tìm ra vị trí."
    },
    {
      id: "u9-cw-7",
      pairKey: "wipe-weep",
      wordA: "wipe",
      wordB: "weep",
      diffHighlightA: { before: "", highlight: "wipe", after: "" },
      diffHighlightB: { before: "", highlight: "weep", after: "" },
      promptSentence: "When the doctor gently broke the tragic news to her, she began to ______ inconsolably.",
      correctWord: "weep",
      defA: "Wipe: Lau chùi, quét qua, gạt đi (wipe away tears).",
      defB: "Weep: Rơi lệ, khóc nức nở, than khóc thảm thiết vì đau buồn sâu sắc.",
      mnemonic: "Weep = khóc thương sầu não; Wipe = lau chùi giọt lệ."
    },
    {
      id: "u9-cw-8",
      pairKey: "ledges-sledges",
      wordA: "ledges",
      wordB: "sledges",
      diffHighlightA: { before: "", highlight: "ledges", after: "" },
      diffHighlightB: { before: "", highlight: "sledges", after: "" },
      promptSentence: "In harsh arctic winters, Eskimos traditionally used dog-drawn ______ to travel across ice.",
      correctWord: "sledges",
      defA: "Ledges: Gờ đá cheo leo, mỏm đá nhô ra ở vách núi; hoặc gờ cửa sổ.",
      defB: "Sledges: Xe trượt tuyết (do chó kéo hoặc người đẩy trượt trên băng tuyết).",
      mnemonic: "Sledges có chữ S như 'Snow sled' = xe trượt tuyết; Ledge = gờ đá cheo leo."
    },
    {
      id: "u9-cw-9",
      pairKey: "mop-mob",
      wordA: "mop",
      wordB: "mob",
      diffHighlightA: { before: "", highlight: "mop", after: "" },
      diffHighlightB: { before: "", highlight: "mob", after: "" },
      promptSentence: "The bloodthirsty and frenzied ______ stormed the courthouse gates demanding revenge.",
      correctWord: "mob",
      defA: "Mop: Cây chổi lau sàn nhà, búi giẻ lau.",
      defB: "Mob: Đám đông bạo loạn cuồng loạn, quần chúng quá khích mất kiểm soát.",
      mnemonic: "Angry mob = đám đông bạo loạn hung hãn; Mop = cây lau nhà."
    },
    {
      id: "u9-cw-10",
      pairKey: "inclusive-conclusive",
      wordA: "inclusive",
      wordB: "conclusive",
      diffHighlightA: { before: "", highlight: "inclusive", after: "" },
      diffHighlightB: { before: "", highlight: "conclusive", after: "" },
      promptSentence: "Forensic detectives now possess ______ DNA evidence as to who committed the murder.",
      correctWord: "conclusive",
      defA: "Inclusive: Bao hàm toàn diện, tính trọn gói không chừa ai (inclusive of all fees).",
      defB: "Conclusive: Có tính quyết định, chứng cứ đanh thép không thể chối cãi (conclusive evidence).",
      mnemonic: "Conclusive proof = bằng chứng kết luận sắt đá; Inclusive = bao gồm trọn gói."
    }
  ],

  // 4. Synonym Filter (4 Thematic Lexical Clusters from Page 35 Exercise A)
  synonymFilter: [
    {
      id: "u9-sf-1",
      targetWord: "abhorrent",
      targetCategory: "Unit 9 Morality & Evaluation",
      targetMeaning: "Despicable, loathsome / inspiring moral disgust",
      targetMeaningVi: "Đáng kinh tởm, ghê sợ, đáng ghét cay ghét đắng",
      note: "Chọn 4 từ đồng nghĩa chỉ sự ghê tởm đáng khinh bỉ và 2 từ thể hiện sự đáng yêu, tôn quý.",
      words: [
        { word: "loathsome", isSynonym: true, meaningVi: "Kinh tởm đáng tởm lợm" },
        { word: "despicable", isSynonym: true, meaningVi: "Đáng khinh miệt đê hèn" },
        { word: "repulsive", isSynonym: true, meaningVi: "Đáng ghê sợ xua đuổi" },
        { word: "odious", isSynonym: true, meaningVi: "Đáng căm ghét tột cùng" },
        { word: "amiable", isSynonym: false, meaningVi: "Dễ thương, hòa nhã đáng mến" },
        { word: "lovable", isSynonym: false, meaningVi: "Đáng yêu, dễ cảm mến" }
      ]
    },
    {
      id: "u9-sf-2",
      targetWord: "alluring",
      targetCategory: "Unit 9 Aesthetic & Charm",
      targetMeaning: "Attractive, tempting, enchanting",
      targetMeaningVi: "Quyến rũ, lôi cuốn, mê đắm lòng người",
      note: "Chọn 4 từ đồng nghĩa chỉ vẻ đẹp lôi cuốn hấp dẫn và 2 từ mang nghĩa kinh dị, xua đuổi.",
      words: [
        { word: "enticing", isSynonym: true, meaningVi: "Mời gọi cám dỗ khó cưỡng" },
        { word: "beguiling", isSynonym: true, meaningVi: "Mê hoặc làm say đắm" },
        { word: "captivating", isSynonym: true, meaningVi: "Hút hồn cuốn hút ánh nhìn" },
        { word: "seductive", isSynonym: true, meaningVi: "Quyến rũ khiêu gợi say mê" },
        { word: "repugnant", isSynonym: false, meaningVi: "Kinh tởm, làm dội ngược lại" },
        { word: "repellent", isSynonym: false, meaningVi: "Đáng ghét làm người khác tránh xa" }
      ]
    },
    {
      id: "u9-sf-3",
      targetWord: "slovenly",
      targetCategory: "Unit 9 Habit & Discipline",
      targetMeaning: "Slipshod, slatternly, untidy, negligent",
      targetMeaningVi: "Lôi thôi, nhếch nhác, cẩu thả luộm thuộm",
      note: "Chọn 4 từ đồng nghĩa miêu tả tính cách cẩu thả luộm thuộm và 2 từ gọn gàng tươm tất.",
      words: [
        { word: "slipshod", isSynonym: true, meaningVi: "Cẩu thả tắc trách qua loa" },
        { word: "slatternly", isSynonym: true, meaningVi: "Luộm thuộm nhếch nhác bừa bãi" },
        { word: "unkempt", isSynonym: true, meaningVi: "Đầu bù tóc rối bê bối" },
        { word: "disheveled", isSynonym: true, meaningVi: "Xốc xếch lôi thôi bừa bộn" },
        { word: "fastidious", isSynonym: false, meaningVi: "Kỹ tính, tươm tất chỉn chu tuyệt đối" },
        { word: "meticulous", isSynonym: false, meaningVi: "Tỉ mỉ, cẩn trọng từng li từng tí" }
      ]
    },
    {
      id: "u9-sf-4",
      targetWord: "discursive",
      targetCategory: "Unit 9 Discourse & Speech",
      targetMeaning: "Digressive, deviating, wandering from topic",
      targetMeaningVi: "Lan man, dông dài, lạc đề thiếu mạch lạc",
      note: "Chọn 4 từ đồng nghĩa chỉ cách nói/viết dông dài lan man và 2 từ ngắn gọn súc tích mạch lạc.",
      words: [
        { word: "rambling", isSynonym: true, meaningVi: "Nói dông dài lòng vòng" },
        { word: "digressive", isSynonym: true, meaningVi: "Lạc đề nhảy cóc chủ đề" },
        { word: "circuitous", isSynonym: true, meaningVi: "Quanh co luẩn quẩn" },
        { word: "desultory", isSynonym: true, meaningVi: "Tản mạn không đầu không đuôi" },
        { word: "succinct", isSynonym: false, meaningVi: "Ngắn gọn súc tích trúng trọng tâm" },
        { word: "coherent", isSynonym: false, meaningVi: "Mạch lạc kết nối chặt chẽ" }
      ]
    }
  ],

  // 5. Smart Cloze (New Orleans, Cultural Fusion & The Louisiana Purchase - Page 38 Ex A)
  clozePassages: [
    {
      id: "u9-cp-1",
      title: "New Orleans & The Louisiana Purchase: Cultural Transition",
      sourceLabel: "Level C1 Academic Reading (The Vocabulary Files - Page 38)",
      passageTemplate: "Slavery was not the only {{gap_1}} of life in New Orleans that would have been unfamiliar to men like Captain Amos Stoddard, a New Englander who became one of the {{gap_2}} of the new lands. Stoddard might have been {{gap_3}} by the odd cultural mix that New Orleans represented, and which it still {{gap_4}}, in some forms, to this day. After the Spanish ceded Louisiana to the French, much of the Spanish population in New Orleans departed for Cuba. As they left and French immigrants came in from Francophone {{gap_5}} like San Domingue, New Orleans took on a Gallic tinge. At the same time, traces of Spanish occupation remained strong, with luxurious homes in the city built in Spanish style, around courtyards and with stucco walls. As a further {{gap_6}} of the territory's past governments, the Louisiana State Legislature met in the former palace of the Spanish governors, until it burned down in 1827. In what might {{gap_7}} readers today as a particularly chilling reminder of the city's previous masters, two pillories stood on Chartres Street. The Spanish authorities had locked prisoners in those stocks and sometimes publicly humiliated and abused them.\n\nThomas Jefferson, the American President, in purchasing Louisiana and bringing about the {{gap_8}} of control that occurred on December 20, opened a new {{gap_9}} in American history and closed the old one, of which he had been a principal author. Only a few years before, he had rejected Alexander Hamilton's proposal for a national bank by {{gap_10}} that the Constitution didn't empower the U.S. government to create such an institution. By 1803 he seems to have changed his feelings about the problem of \"implied powers\" or at least been excited enough about the possible uses of 828,000 square miles of property to set aside any legal qualms.",
      gaps: [
        {
          gapNumber: 1,
          options: [
            { label: "A", text: "aspect" },
            { label: "B", text: "position" },
            { label: "C", text: "view" },
            { label: "D", text: "look" }
          ],
          correctLabel: "A",
          correctWord: "aspect",
          targetWord: "aspect",
          explanations: {
            A: "Aspect: khía cạnh, mặt đời sống xã hội (the only aspect of life).",
            B: "Position: vị trí địa lý hoặc quan điểm lập trường.",
            C: "View: tầm nhìn hoặc quan điểm.",
            D: "Look: diện mạo bên ngoài."
          },
          explanationVi: "Aspect of life = khía cạnh, góc độ đời sống tại New Orleans."
        },
        {
          gapNumber: 2,
          options: [
            { label: "A", text: "slave traders" },
            { label: "B", text: "numbers" },
            { label: "C", text: "governors" },
            { label: "D", text: "many" }
          ],
          correctLabel: "C",
          correctWord: "governors",
          targetWord: "governors",
          explanations: {
            A: "Slave traders: kẻ buôn bán nô lệ, sai chức vụ của Đại úy Amos Stoddard.",
            B: "Numbers: con số, sai ngữ cảnh vị trí lãnh đạo chính quyền.",
            C: "Governors: các thống đốc, quan chức toàn quyền cai quản vùng đất mới sáp nhập.",
            D: "Many: nhiều người."
          },
          explanationVi: "One of the governors of the new lands = một trong những nhà toàn quyền của vùng lãnh thổ mới."
        },
        {
          gapNumber: 3,
          options: [
            { label: "A", text: "interested" },
            { label: "B", text: "frightened" },
            { label: "C", text: "perplexed" },
            { label: "D", text: "humoured" }
          ],
          correctLabel: "C",
          correctWord: "perplexed",
          targetWord: "perplexed",
          explanations: {
            A: "Interested: quan tâm (đi với in, ở đây dùng bị động 'perplexed by').",
            B: "Frightened: khiếp sợ, quá mạnh so với sự bỡ ngỡ văn hóa.",
            C: "Perplexed: hoang mang, bối rối không hiểu nổi trước sự pha trộn văn hóa kỳ lạ.",
            D: "Humoured: chiều chuộng theo ý người khác."
          },
          explanationVi: "Perplexed by = cảm thấy bối rối, ngỡ ngàng trước bản sắc văn hóa đa nguyên kỳ lạ."
        },
        {
          gapNumber: 4,
          options: [
            { label: "A", text: "refrains" },
            { label: "B", text: "retains" },
            { label: "C", text: "relinquishes" },
            { label: "D", text: "replaces" }
          ],
          correctLabel: "B",
          correctWord: "retains",
          targetWord: "retains",
          explanations: {
            A: "Refrains: kiềm chế, nhịn không làm gì (đi với from).",
            B: "Retains: vẫn bảo lưu, giữ gìn được nét độc đáo này cho tới tận ngày nay.",
            C: "Relinquishes: từ bỏ buông xuôi quyền kiểm soát.",
            D: "Replaces: thay thế."
          },
          explanationVi: "Retains = tiếp tục gìn giữ, duy trì bản sắc độc đáo này đến tận hôm nay."
        },
        {
          gapNumber: 5,
          options: [
            { label: "A", text: "continents" },
            { label: "B", text: "industries" },
            { label: "C", text: "colonies" },
            { label: "D", text: "pasts" }
          ],
          correctLabel: "C",
          correctWord: "colonies",
          targetWord: "colonies",
          explanations: {
            A: "Continents: lục địa.",
            B: "Industries: các ngành công nghiệp.",
            C: "Colonies: các thuộc địa nói tiếng Pháp như Saint-Domingue (Haiti ngày nay).",
            D: "Pasts: quá khứ."
          },
          explanationVi: "Francophone colonies = các xứ thuộc địa nói tiếng Pháp tại vùng Caribe."
        },
        {
          gapNumber: 6,
          options: [
            { label: "A", text: "examination" },
            { label: "B", text: "reference" },
            { label: "C", text: "plunder" },
            { label: "D", text: "reminder" }
          ],
          correctLabel: "D",
          correctWord: "reminder",
          targetWord: "reminder",
          explanations: {
            A: "Examination: cuộc thi cử, sự giám định kiểm tra.",
            B: "Reference: sự tham khảo, tài liệu tham chiếu.",
            C: "Plunder: chiến lợi phẩm cướp bóc.",
            D: "Reminder: vật gợi nhớ, dấu tích lịch sử nhắc nhớ về chính quyền tiền nhiệm."
          },
          explanationVi: "A further reminder of = một dấu ấn lịch sử nhắc nhở sâu sắc về các triều đại cai trị cũ."
        },
        {
          gapNumber: 7,
          options: [
            { label: "A", text: "present" },
            { label: "B", text: "strike" },
            { label: "C", text: "inspire" },
            { label: "D", text: "instill" }
          ],
          correctLabel: "B",
          correctWord: "strike",
          targetWord: "strike",
          explanations: {
            A: "Present: trình diện, không có cấu trúc 'present readers as a chilling reminder'.",
            B: "Strike: Cấu trúc C1 'strike somebody as something' = gây ấn tượng cho ai như là một điều gì.",
            C: "Inspire: truyền cảm hứng tích cực.",
            D: "Instill: thấm nhuần tư tưởng (instill sth in sb)."
          },
          explanationVi: "Cấu trúc C1 chuẩn xác: 'what might strike readers today as...' = điều có thể tạo cảm giác cho độc giả ngày nay là..."
        },
        {
          gapNumber: 8,
          options: [
            { label: "A", text: "hand-over" },
            { label: "B", text: "transaction" },
            { label: "C", text: "ownership" },
            { label: "D", text: "transfer" }
          ],
          correctLabel: "D",
          correctWord: "transfer",
          targetWord: "transfer",
          explanations: {
            A: "Hand-over: bàn giao thông thường, ít tính văn bản pháp lý chính thống bằng transfer.",
            B: "Transaction: giao dịch tài chính.",
            C: "Ownership: quyền sở hữu (không dùng 'ownership of control').",
            D: "Transfer: Sự chuyển giao quyền lực kiểm soát chính trị (transfer of control)."
          },
          explanationVi: "Transfer of control = cuộc chuyển giao quyền lực quản lý chính trị lịch sử."
        },
        {
          gapNumber: 9,
          options: [
            { label: "A", text: "chapter" },
            { label: "B", text: "book" },
            { label: "C", text: "piece" },
            { label: "D", text: "paragraph" }
          ],
          correctLabel: "A",
          correctWord: "chapter",
          targetWord: "chapter",
          explanations: {
            A: "Chapter: Collocation ẩn dụ C1 'open a new chapter in history' = mở ra một chương mới trong lịch sử dân tộc.",
            B: "Book: cuốn sách.",
            C: "Piece: mảnh ghép.",
            D: "Paragraph: đoạn văn."
          },
          explanationVi: "Collocation lịch sử: 'opened a new chapter in American history' = mở ra một trang sử/chương lịch sử mới."
        },
        {
          gapNumber: 10,
          options: [
            { label: "A", text: "registering" },
            { label: "B", text: "arguing" },
            { label: "C", text: "bickering" },
            { label: "D", text: "demanding" }
          ],
          correctLabel: "B",
          correctWord: "arguing",
          targetWord: "arguing",
          explanations: {
            A: "Registering: đăng ký ghi danh.",
            B: "Arguing: lập luận, biện luận có lý lẽ pháp lý (arguing that the Constitution didn't empower).",
            C: "Bickering: cãi vặt trẻ con.",
            D: "Demanding: yêu sách đòi hỏi."
          },
          explanationVi: "Arguing that = đưa ra lập luận pháp lý rằng Hiến pháp không trao quyền lập ngân hàng quốc gia."
        }
      ]
    }
  ],

  // 6. Speed Blitz (20 Instant-Recall Questions from Page 36 Task Two, Page 37 Task Four & Page 39 Ex B)
  speedBlitz: [
    // Questions 1-10: Prepositions & Phrasal Idioms (Page 36 Task Two & Page 37 Task Four)
    {
      id: "u9-sb-1",
      questionNumber: 1,
      prompt: "Did the manager promise you a raise? — Yes, he committed himself ______ it some time ago.",
      options: [
        { key: "a", text: "with" },
        { key: "b", text: "to" },
        { key: "c", text: "for" },
        { key: "d", text: "on" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "with", pos: "prep", vi: "Sai giới từ" },
        { key: "b", word: "to", pos: "collocation", vi: "Chính xác: commit oneself to sth = cam kết gắn bó / cam hứa thực hiện điều gì" },
        { key: "c", word: "for", pos: "prep", vi: "Sai giới từ" },
        { key: "d", word: "on", pos: "prep", vi: "Sai giới từ" }
      ]
    },
    {
      id: "u9-sb-2",
      questionNumber: 2,
      prompt: "Sweden is widely known to be rich in natural resources; indeed, it abounds ______ iron ore and timber.",
      options: [
        { key: "a", text: "in" },
        { key: "b", text: "with" },
        { key: "c", text: "of" },
        { key: "d", text: "by" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "in", pos: "collocation", vi: "Chính xác: abound in / with sth = tràn trề dồi dào tài nguyên khoáng sản" },
        { key: "b", word: "with", pos: "collocation", vi: "Abound with cũng đúng nhưng đáp án sách gốc dùng 'in' (hoặc with)" },
        { key: "c", word: "of", pos: "prep", vi: "Sai giới từ" },
        { key: "d", word: "by", pos: "prep", vi: "Sai giới từ" }
      ]
    },
    {
      id: "u9-sb-3",
      questionNumber: 3,
      prompt: "John's sports car was badly mangled in the crash; he may as well write it ______.",
      options: [
        { key: "a", text: "away" },
        { key: "b", text: "down" },
        { key: "c", text: "off" },
        { key: "d", text: "out" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "away", pos: "prep", vi: "Sai phrasal verb" },
        { key: "b", word: "down", pos: "prep", vi: "Write down = ghi chép" },
        { key: "c", word: "off", pos: "collocation", vi: "Chính xác: write off a car = xóa sổ xem như hư hỏng hoàn toàn không thể sửa" },
        { key: "d", word: "out", pos: "prep", vi: "Write out = viết chi tiết chi phiếu" }
      ]
    },
    {
      id: "u9-sb-4",
      questionNumber: 4,
      prompt: "To accede ______ such an unreasonable ultimatum would establish a catastrophic precedent.",
      options: [
        { key: "a", text: "with" },
        { key: "b", text: "to" },
        { key: "c", text: "for" },
        { key: "d", text: "in" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "with", pos: "prep", vi: "Sai giới từ" },
        { key: "b", word: "to", pos: "collocation", vi: "Chính xác: accede to a demand / request = bằng lòng chấp thuận yêu sách" },
        { key: "c", word: "for", pos: "prep", vi: "Sai giới từ" },
        { key: "d", word: "in", pos: "prep", vi: "Sai giới từ" }
      ]
    },
    {
      id: "u9-sb-5",
      questionNumber: 5,
      prompt: "Do you like the new literature teacher? — Yes, I think I have a secret crush ______ him.",
      options: [
        { key: "a", text: "on" },
        { key: "b", text: "in" },
        { key: "c", text: "at" },
        { key: "d", text: "for" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "on", pos: "collocation", vi: "Chính xác: have a crush on sb = thầm thương trộm nhớ ai đó" },
        { key: "b", word: "in", pos: "prep", vi: "Sai giới từ" },
        { key: "c", word: "at", pos: "prep", vi: "Sai giới từ" },
        { key: "d", word: "for", pos: "prep", vi: "Have feelings for, nhưng crush đi với ON" }
      ]
    },
    {
      id: "u9-sb-6",
      questionNumber: 6,
      prompt: "Did you take on the directorship eventually? — I did, but it calls ______ tremendous endurance.",
      options: [
        { key: "a", text: "in" },
        { key: "b", text: "for" },
        { key: "c", text: "out" },
        { key: "d", text: "up" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "in", pos: "prep", vi: "Call in = triệu tập" },
        { key: "b", word: "for", pos: "collocation", vi: "Chính xác: call for sth = đòi hỏi, cần đến rất nhiều nỗ lực và thời gian" },
        { key: "c", word: "out", pos: "prep", vi: "Call out = chỉ trích công khai" },
        { key: "d", word: "up", pos: "prep", vi: "Call up = gọi điện hoặc gọi nhập ngũ" }
      ]
    },
    {
      id: "u9-sb-7",
      questionNumber: 7,
      prompt: "Can we entrust Gary with company funds? — Oh yes, he is a gentleman ______ impeccable integrity.",
      options: [
        { key: "a", text: "with" },
        { key: "b", text: "of" },
        { key: "c", text: "in" },
        { key: "d", text: "for" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "with", pos: "prep", vi: "Sai giới từ tạo thuộc tính tính cách" },
        { key: "b", word: "of", pos: "collocation", vi: "Chính xác: a man of impeccable honesty/integrity = người có phẩm hạnh trung thực vẹn toàn" },
        { key: "c", word: "in", pos: "prep", vi: "Sai giới từ" },
        { key: "d", word: "for", pos: "prep", vi: "Sai giới từ" }
      ]
    },
    {
      id: "u9-sb-8",
      questionNumber: 8,
      prompt: "He's in complete disagreement with our proposal; it'll take time before I bring him ______ to our view.",
      options: [
        { key: "a", text: "around" },
        { key: "b", text: "round" },
        { key: "c", text: "over" },
        { key: "d", text: "up" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "around", pos: "prep", vi: "Mang nghĩa tương đương nhưng sách C1 chuẩn Anh dùng 'round'" },
        { key: "b", word: "round", pos: "collocation", vi: "Chính xác: bring sb round to sth = thuyết phục ai đồng ý với góc nhìn của mình" },
        { key: "c", word: "over", pos: "prep", vi: "Bring sb over = rủ ai qua nhà chơi" },
        { key: "d", word: "up", pos: "prep", vi: "Bring up = nuôi nấng hoặc nêu vấn đề" }
      ]
    },
    {
      id: "u9-sb-9",
      questionNumber: 9,
      prompt: "What about your startup project? Did you pull it off? — No, it fell ______ like all the others.",
      options: [
        { key: "a", text: "apart" },
        { key: "b", text: "out" },
        { key: "c", text: "through" },
        { key: "d", text: "down" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "apart", pos: "prep", vi: "Fall apart = vỡ vụn từng mảnh" },
        { key: "b", word: "out", pos: "prep", vi: "Fall out = cãi cọ bất hòa" },
        { key: "c", word: "through", pos: "collocation", vi: "Chính xác: fall through = kế hoạch / dự án bị đổ bể, thất bại không thành" },
        { key: "d", word: "down", pos: "prep", vi: "Fall down = ngã quỵ" }
      ]
    },
    {
      id: "u9-sb-10",
      questionNumber: 10,
      prompt: "The furious attack dog came ______ me all of a sudden when I casually strolled past their hedge.",
      options: [
        { key: "a", text: "into" },
        { key: "b", text: "at" },
        { key: "c", text: "over" },
        { key: "d", text: "up" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "into", pos: "prep", vi: "Come into money = thừa kế" },
        { key: "b", word: "at", pos: "collocation", vi: "Chính xác: come at sb = lao vào tấn công ai đó hung hãn bất ngờ" },
        { key: "c", word: "over", pos: "prep", vi: "Come over = ghé qua" },
        { key: "d", word: "up", pos: "prep", vi: "Come up = xuất hiện nảy sinh" }
      ]
    },

    // Questions 11-20: Advanced Academic Practice (Page 39 Ex B)
    {
      id: "u9-sb-11",
      questionNumber: 11,
      prompt: "It's my unshakeable ______ that the self-acclaimed guru is a fraudulent opportunist.",
      options: [
        { key: "a", text: "conviction" },
        { key: "b", text: "choice" },
        { key: "c", text: "indignation" },
        { key: "d", text: "mistrust" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "conviction", pos: "collocation", vi: "Chính xác: it's my conviction that... = tôi tin chắc một cách tuyệt đối rằng..." },
        { key: "b", word: "choice", pos: "n", vi: "Lựa chọn cá nhân" },
        { key: "c", word: "indignation", pos: "n", vi: "Cơn phẫn nộ bất bình" },
        { key: "d", word: "mistrust", pos: "n", vi: "Sự ngờ vực thiếu tin tưởng" }
      ]
    },
    {
      id: "u9-sb-12",
      questionNumber: 12,
      prompt: "Throughout his youth, he ______ tirelessly and sacrificed all leisure to make a success of his life.",
      options: [
        { key: "a", text: "saved" },
        { key: "b", text: "plunged" },
        { key: "c", text: "strove" },
        { key: "d", text: "throve" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "saved", pos: "v", vi: "Tiết kiệm" },
        { key: "b", word: "plunged", pos: "v", vi: "Lao dốc đâm sầm" },
        { key: "c", word: "strove", pos: "collocation", vi: "Chính xác: strive hard (quá khứ strove) = nỗ lực phấn đấu hết sức mình" },
        { key: "d", word: "throve", pos: "v", vi: "Phát triển thịnh vượng (không đi với 'throve hard')" }
      ]
    },
    {
      id: "u9-sb-13",
      questionNumber: 13,
      prompt: "Despite my earnest warnings about the risks, the reckless investor took no ______ of what I said.",
      options: [
        { key: "a", text: "advice" },
        { key: "b", text: "revenge" },
        { key: "c", text: "warning" },
        { key: "d", text: "notice" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "advice", pos: "n", vi: "Take advice (không đi với of what I said theo cấu trúc này)" },
        { key: "b", word: "revenge", pos: "n", vi: "Báo thù trả đũa" },
        { key: "c", word: "warning", pos: "n", vi: "Lời cảnh báo" },
        { key: "d", word: "notice", pos: "collocation", vi: "Chính xác: take no notice of sth = hoàn toàn phớt lờ, không màng để tâm" }
      ]
    },
    {
      id: "u9-sb-14",
      questionNumber: 14,
      prompt: "I am urgently scheduled for surgery; could you possibly ______ me at the regional committee meeting?",
      options: [
        { key: "a", text: "stand in for" },
        { key: "b", text: "make up for" },
        { key: "c", text: "go back on" },
        { key: "d", text: "keep in with" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "stand in for", pos: "collocation", vi: "Chính xác: stand in for sb = đại diện thay mặt ai, thế chỗ tạm thời" },
        { key: "b", word: "make up for", pos: "v", vi: "Bù đắp cho thiệt hại" },
        { key: "c", word: "go back on", pos: "v", vi: "Nuốt lời thất hứa" },
        { key: "d", word: "keep in with", pos: "v", vi: "Giữ mối quan hệ hòa hảo với ai" }
      ]
    },
    {
      id: "u9-sb-15",
      questionNumber: 15,
      prompt: "Sophisticated corporate tax ______ deprives the national treasury of several billion dollars annually.",
      options: [
        { key: "a", text: "retention" },
        { key: "b", text: "evasion" },
        { key: "c", text: "invasion" },
        { key: "d", text: "desertion" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "retention", pos: "n", vi: "Sự giữ lại lưu giữ" },
        { key: "b", word: "evasion", pos: "collocation", vi: "Chính xác: tax evasion = hành vi trốn thuế bất hợp pháp gây thất thoát ngân sách" },
        { key: "c", word: "invasion", pos: "n", vi: "Cuộc xâm lăng quân sự" },
        { key: "d", word: "desertion", pos: "n", vi: "Tội đào ngũ rời bỏ vị trí" }
      ]
    },
    {
      id: "u9-sb-16",
      questionNumber: 16,
      prompt: "After malicious lies were printed in the tabloid, the government minister announced he would sue for ______.",
      options: [
        { key: "a", text: "praise" },
        { key: "b", text: "diligence" },
        { key: "c", text: "deface" },
        { key: "d", text: "defamation" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "praise", pos: "n", vi: "Lời khen ngợi" },
        { key: "b", word: "diligence", pos: "n", vi: "Sự cần cù siêng năng" },
        { key: "c", word: "deface", pos: "v", vi: "Làm bôi bẩn biến dạng" },
        { key: "d", word: "defamation", pos: "collocation", vi: "Chính xác: sue for defamation = khởi kiện vì tội phỉ báng bôi nhọ danh dự" }
      ]
    },
    {
      id: "u9-sb-17",
      questionNumber: 17,
      prompt: "Her spiteful and derisive remark instantly ______ the already hostile mob in the town square.",
      options: [
        { key: "a", text: "engulfed" },
        { key: "b", text: "engrossed" },
        { key: "c", text: "enlivened" },
        { key: "d", text: "enraged" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "engulfed", pos: "v", vi: "Nhấn chìm bao trùm trong biển lửa" },
        { key: "b", word: "engrossed", pos: "v", vi: "Cuốn hút tâm trí say mê" },
        { key: "c", word: "enlivened", pos: "v", vi: "Làm sống động vui tươi" },
        { key: "d", word: "enraged", pos: "v", vi: "Chính xác: enrage the crowd = chọc giận điên cuồng, làm bùng phát cơn thịnh nộ" }
      ]
    },
    {
      id: "u9-sb-18",
      questionNumber: 18,
      prompt: "She was so thoroughly infuriated that she found it almost impossible to ______ her explosive temper.",
      options: [
        { key: "a", text: "contain" },
        { key: "b", text: "abstain" },
        { key: "c", text: "retain" },
        { key: "d", text: "detain" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "contain", pos: "collocation", vi: "Chính xác: contain one's temper / anger = nén cơn giận, kìm chế cơn thịnh nộ" },
        { key: "b", word: "abstain", pos: "v", vi: "Kiêng cử (abstain from alcohol)" },
        { key: "c", word: "retain", pos: "v", vi: "Giữ lại quyền sở hữu" },
        { key: "d", word: "detain", pos: "v", vi: "Tạm giam giữ" }
      ]
    },
    {
      id: "u9-sb-19",
      questionNumber: 19,
      prompt: "The eccentric theory he advanced concerning human evolution was widely ______ by the scientific community.",
      options: [
        { key: "a", text: "disgraced" },
        { key: "b", text: "discredited" },
        { key: "c", text: "debased" },
        { key: "d", text: "dishonored" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "disgraced", pos: "adj", vi: "Bị ruồng bỏ vì bê bối ô nhục" },
        { key: "b", word: "discredited", pos: "collocation", vi: "Chính xác: discredited theory = lý thuyết bị bác bỏ, bị chứng minh là sai và mất uy tín" },
        { key: "c", word: "debased", pos: "adj", vi: "Bị làm giảm giá trị hoặc phẩm chất" },
        { key: "d", word: "dishonored", pos: "adj", vi: "Bị thất hứa hoặc làm nhục" }
      ]
    },
    {
      id: "u9-sb-20",
      questionNumber: 20,
      prompt: "Ruthless political warfare all too often involves deliberately defaming one's ______.",
      options: [
        { key: "a", text: "friends" },
        { key: "b", text: "relatives" },
        { key: "c", text: "colleagues" },
        { key: "d", text: "opponents" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "friends", pos: "n", vi: "Bạn bè" },
        { key: "b", word: "relatives", pos: "n", vi: "Người thân họ hàng" },
        { key: "c", word: "colleagues", pos: "n", vi: "Đồng nghiệp" },
        { key: "d", word: "opponents", pos: "collocation", vi: "Chính xác: defame one's opponents = bôi nhọ thanh danh của đối thủ chính trị" }
      ]
    }
  ]
};



export const VOCAB_C1_UNIT_10: VocabC1Unit = {
  unitId: 10,
  title: "Unit 10: Occupations, Crimes & Collective Entities",
  subtitle: "The Vocabulary Files - Level C1 (Pages 40-45)",

  // 1. Words in Action (10 Traditional Occupations from Page 40 Exercise A)
  wordsInAction: [
    {
      id: "u10-wia-1",
      word: "peddler",
      ipa: "/ˈped.lər/",
      nuance: "[Wandering merchant traveling around selling small wares and trinkets]",
      register: "Historical / Descriptive",
      collocations: ["itinerant peddler", "peddler of wares", "street peddler", "peddler of rumors"],
      enDef: "A person who travels from place to place selling small items, wares, or trinkets; a hawker.",
      viDef: "Người bán hàng rong, kẻ đi chào bán đồ lặt vặt lưu động từ nơi này sang nơi khác.",
      example: "In eighteenth-century villages, an itinerant **peddler** would arrive periodically selling ribbons and needles.",
      targetKeyword: "peddler"
    },
    {
      id: "u10-wia-2",
      word: "cobbler",
      ipa: "/ˈkɒb.lər/",
      nuance: "[Craftsman who mends, patches, and repairs worn shoes and boots]",
      register: "Traditional / Craft",
      collocations: ["village cobbler", "master cobbler", "cobbler's bench", "mend by a cobbler"],
      enDef: "A craftsman whose job is mending, patching, and repairing shoes and footwear.",
      viDef: "Thợ đóng/sửa giày dép (chuyên vá víu và phục hồi đế giày hỏng).",
      example: "He brought his favourite leather hiking boots to the neighborhood **cobbler** to be resoled.",
      targetKeyword: "cobbler"
    },
    {
      id: "u10-wia-3",
      word: "potter",
      ipa: "/ˈpɒt.ər/",
      nuance: "[Artisan who molds earthenware vessels and clay pots on a wheel]",
      register: "Craft / Artistic",
      collocations: ["master potter", "potter's wheel", "earthenware potter", "potter's clay"],
      enDef: "A skilled person who makes clay pots, dishes, and artistic earthenware on a spinning wheel.",
      viDef: "Thợ gốm, nghệ nhân nặn đồ gốm và đồ sành sứ từ đất sét.",
      example: "The **potter** skillfully shaped the spinning lump of damp clay into an exquisite ornamental vase.",
      targetKeyword: "potter"
    },
    {
      id: "u10-wia-4",
      word: "playwright",
      ipa: "/ˈpleɪ.raɪt/",
      nuance: "[Author who crafts and composes theatrical drama scripts]",
      register: "Literary / Formal",
      collocations: ["prolific playwright", "celebrated playwright", "modern playwright", "playwright's script"],
      enDef: "A person who writes theatrical plays and dramatic texts for stage performance; a dramatist.",
      viDef: "Nhà soạn kịch, tác giả kịch bản sân khấu chuyên nghiệp.",
      example: "Shakespeare remains the most universally acclaimed **playwright** in the history of English literature.",
      targetKeyword: "playwright"
    },
    {
      id: "u10-wia-5",
      word: "milliner",
      ipa: "/ˈmɪl.ɪ.nər/",
      nuance: "[Specialist artisan designing, making and trimming women's hats]",
      register: "Fashion / Haute Couture",
      collocations: ["exclusive milliner", "high-end milliner", "hats from a milliner", "milliner's boutique"],
      enDef: "A person who designs, makes, trims, or sells women's hats, bonnets, and formal headwear.",
      viDef: "Thợ may/bán mũ nón thời trang (đặc biệt là mũ kiểu cách quý phái cho phụ nữ).",
      example: "The royal bride commissioned an internationally famous **milliner** to design her wedding headdress.",
      targetKeyword: "milliner"
    },
    {
      id: "u10-wia-6",
      word: "fishmonger",
      ipa: "/ˈfɪʃˌmʌŋ.ɡər/",
      nuance: "[Merchant or shopkeeper who cleans and sells fresh edible fish]",
      register: "Commerce / Traditional",
      collocations: ["local fishmonger", "fishmonger's slab", "fishmonger's shop", "licensed fishmonger"],
      enDef: "A merchant or shopkeeper whose business is the sale of raw fish, seafood, and crustaceans.",
      viDef: "Người bán cá, chủ tiệm kinh doanh hải sản tươi sống.",
      example: "Every dawn the chef visits the harbor **fishmonger** to purchase fresh catch straight from trawlers.",
      targetKeyword: "fishmonger"
    },
    {
      id: "u10-wia-7",
      word: "locksmith",
      ipa: "/ˈlɒk.smɪθ/",
      nuance: "[Technician who designs, installs, opens, and repairs locks and keys]",
      register: "Technical / Practical",
      collocations: ["call a locksmith", "emergency locksmith", "locksmith's tools", "licensed locksmith"],
      enDef: "A specialist maker, repairer, and installer of locks, deadbolts, and security keys.",
      viDef: "Thợ khóa (chuyên gia chế tạo, sửa chữa hoặc mở ổ khóa khi bị kẹt).",
      example: "Having locked her car keys in the trunk, she had no choice but to summon an emergency **locksmith**.",
      targetKeyword: "locksmith"
    },
    {
      id: "u10-wia-8",
      word: "plumber",
      ipa: "/ˈplʌm.ər/",
      nuance: "[Tradesman who fits and repairs water, sewage pipes and sanitary fixtures]",
      register: "Trades / Construction",
      collocations: ["qualified plumber", "call a plumber", "leaking pipe plumber", "emergency plumber"],
      enDef: "A tradesperson who installs, connects, and repairs water supply, drainage pipes, and sanitation facilities.",
      viDef: "Thợ sửa ống nước (lắp đặt đường cấp thoát nước, bồn cầu, vòi sen).",
      example: "When the central bathroom pipe burst at midnight, we desperately needed a licensed **plumber**.",
      targetKeyword: "plumber"
    },
    {
      id: "u10-wia-9",
      word: "thatcher",
      ipa: "/ˈθætʃ.ər/",
      nuance: "[Roofer building cottage roofs with bundled dried straw, rushes or reeds]",
      register: "Traditional / Architectural",
      collocations: ["master thatcher", "thatcher's craft", "thatcher repairing roof", "rural thatcher"],
      enDef: "A specialist artisan who covers and repairs roofs of rustic cottages with straw, reeds, or heather.",
      viDef: "Thợ lợp nhà tranh, thợ lợp mái bằng rơm rạ hoặc cây sậy khô kiểu thôn dã.",
      example: "The historic English country cottage needed a seasoned **thatcher** to overhaul its deteriorating reed roof.",
      targetKeyword: "thatcher"
    },
    {
      id: "u10-wia-10",
      word: "hardware dealer",
      ipa: "/ˈhɑːd.weər ˈdiː.lər/",
      nuance: "[Shopkeeper trading in metal tools, household fasteners and building gear]",
      register: "Commerce / Retail",
      collocations: ["local hardware dealer", "visit the hardware dealer", "hardware dealer's store", "hardware supplies"],
      enDef: "A merchant or retailer who sells metal tools, household implements, screws, and building hardware.",
      viDef: "Chủ cửa hàng kim khí điện máy, người bán dụng cụ cơ khí và thiết bị kim loại gia dụng.",
      example: "He picked up a box of masonry anchors and a new spirit level from the town's **hardware dealer**.",
      targetKeyword: "hardware dealer"
    }
  ],

  // 2. Word Formation (10 Sentence Transformations into Adjectives from Page 43 Task Two)
  wordFormation: [
    {
      id: "u10-wf-1",
      adjective: "senile",
      noun: "becoming increasingly senile",
      root: "senility",
      suffix: "-ile (Adjective)",
      meaningVi: "Mắc chứng suy giảm trí nhớ tuổi già (thay 'affected by senility' bằng 'becoming senile')",
      suffixChoices: ["senile", "senilous", "senilary", "seniled"],
      ruleTip: "Biến danh từ 'senility' thành tính từ chỉ bệnh lão suy: 'senile'."
    },
    {
      id: "u10-wf-2",
      adjective: "juvenile",
      noun: "A juvenile, aged 11",
      root: "age",
      suffix: "Adjective/Noun Shift",
      meaningVi: "Thiếu niên vị thành niên (thay 'A juvenile of 11 years of age' bằng 'A juvenile, aged 11')",
      suffixChoices: ["aged 11", "aging 11", "ageable 11", "ageless 11"],
      ruleTip: "Rút gọn cụm chỉ độ tuổi: 'of 11 years of age' ➔ ', aged 11,'."
    },
    {
      id: "u10-wf-3",
      adjective: "illustrative",
      noun: "is illustrative of",
      root: "illustrate",
      suffix: "-ive (Adjective)",
      meaningVi: "Mang tính minh họa, chứng thực rõ nét (thay 'illustrates' bằng 'is illustrative of')",
      suffixChoices: ["illustrative of", "illustrational with", "illustrative to", "illustrated for"],
      ruleTip: "Cấu trúc học thuật C1: 'illustrates X' ➔ 'is illustrative of X'."
    },
    {
      id: "u10-wf-4",
      adjective: "conducive",
      noun: "is conducive to",
      root: "conduce",
      suffix: "-ive (Adjective)",
      meaningVi: "Có lợi cho, dẫn đến điều tốt (thay 'conduces to good health' bằng 'is conducive to good health')",
      suffixChoices: ["conducive to", "conducive for", "conduction with", "conductive at"],
      ruleTip: "Collocation C1 học thuật: 'is conducive to good health / progress'."
    },
    {
      id: "u10-wf-5",
      adjective: "knowledgeable",
      noun: "is knowledgeable about",
      root: "knowledge",
      suffix: "-able (Adjective)",
      meaningVi: "Am hiểu sâu rộng (thay 'has good knowledge of computers' bằng 'is knowledgeable about computers')",
      suffixChoices: ["knowledgeable about", "knowing of", "knowable to", "knowledgeful in"],
      ruleTip: "Biến đổi câu C1: 'has good knowledge of X' ➔ 'is knowledgeable about X'."
    },
    {
      id: "u10-wf-6",
      adjective: "inventive and resourceful",
      noun: "inventive and resourceful",
      root: "invention / resources",
      suffix: "-ive / -ful (Dual Adjectives)",
      meaningVi: "Sáng tạo và tháo vát (thay 'powers of invention and a person of resources' bằng 'inventive and resourceful')",
      suffixChoices: ["inventive and resourceful", "inventable and resourced", "inventing and resource-rich", "inventionist and resourceless"],
      ruleTip: "Biến cặp danh từ thuộc tính thành cặp tính từ cao cấp C1: 'inventive and resourceful'."
    },
    {
      id: "u10-wf-7",
      adjective: "thoughtful",
      noun: "looked thoughtful",
      root: "thought",
      suffix: "-ful (Adjective)",
      meaningVi: "Trầm ngâm đăm chiêu suy nghĩ (thay 'looked lost in thought' bằng 'looked thoughtful')",
      suffixChoices: ["thoughtful", "thoughtless", "thought-filled", "thinking"],
      ruleTip: "Chuyển thành ngữ 'lost in thought' sang tính từ miêu tả diện mạo: 'looked thoughtful'."
    },
    {
      id: "u10-wf-8",
      adjective: "rapid",
      noun: "evolutionary process was rapid",
      root: "rapidly",
      suffix: "Adjective Shift",
      meaningVi: "Diễn ra nhanh chóng (thay 'proceeded rapidly' bằng 'was rapid')",
      suffixChoices: ["rapid", "rapidness", "rapidity", "rapacious"],
      ruleTip: "Chuyển trạng từ 'proceeded rapidly' thành vị ngữ tính từ 'was rapid'."
    },
    {
      id: "u10-wf-9",
      adjective: "expansive",
      noun: "have become expansive",
      root: "expand",
      suffix: "-ive (Adjective)",
      meaningVi: "Trở nên rộng mênh mông, bành trướng (thay 'deserts have expanded' bằng 'have become expansive')",
      suffixChoices: ["expansive", "expandable", "expanding", "expansionist"],
      ruleTip: "Tính từ chỉ độ bao la mở rộng: 'have become / are expansive'."
    },
    {
      id: "u10-wf-10",
      adjective: "extinct",
      noun: "have become extinct",
      root: "extinction",
      suffix: "-ct (State Adjective)",
      meaningVi: "Tuyệt chủng (thay 'were driven to extinction' bằng 'have become / are extinct')",
      suffixChoices: ["extinct", "extinctive", "extinguishable", "extinctual"],
      ruleTip: "Biến ngữ danh từ 'driven to extinction' thành tính từ C1: 'have become extinct'."
    }
  ],

  // 3. Confusable Words (10 Pairs from Page 43 Task Three)
  confusableWords: [
    {
      id: "u10-cw-1",
      pairKey: "conceited-deceitful",
      wordA: "conceited",
      wordB: "deceitful",
      diffHighlightA: { before: "", highlight: "conceited", after: "" },
      diffHighlightB: { before: "", highlight: "deceitful", after: "" },
      promptSentence: "An excessively arrogant and boastful person who thinks too highly of himself is thoroughly ______.",
      correctWord: "conceited",
      defA: "Conceited: Tự phụ, tự cao tự đại, kiêu căng hợm mình (excessively proud of oneself).",
      defB: "Deceitful: Lừa lọc, dối trá, xảo quyệt không đáng tin cậy (guilty of misleading others).",
      mnemonic: "Conceited = tự phụ hợm hĩnh; Deceitful = dối trá lừa đảo."
    },
    {
      id: "u10-cw-2",
      pairKey: "lurked-larked",
      wordA: "lurked",
      wordB: "larked",
      diffHighlightA: { before: "", highlight: "lurked", after: "" },
      diffHighlightB: { before: "", highlight: "larked", after: "" },
      promptSentence: "The stealthy street mugger ______ menacingly in the dark alley, ready to pounce on his prey.",
      correctWord: "lurked",
      defA: "Lurked: Rình rập, ẩn nấp trong bóng tối chờ thời cơ ra tay hại người.",
      defB: "Larked: Đùa giỡn, bày trò vui đùa vô hại nghêu ngao (lark about/around).",
      mnemonic: "Lurk in the dark = rình rập trong bóng tối; Lark = đùa vui tinh nghịch."
    },
    {
      id: "u10-cw-3",
      pairKey: "exhausting-exhaustive",
      wordA: "exhausting",
      wordB: "exhaustive",
      diffHighlightA: { before: "", highlight: "exhausting", after: "" },
      diffHighlightB: { before: "", highlight: "exhaustive", after: "" },
      promptSentence: "The federal police have conducted ______ and painstaking inquiries in their effort to track down the syndicate.",
      correctWord: "exhaustive",
      defA: "Exhaustive: Thấu đáo, toàn diện, rà soát cặn kẽ không bỏ sót chi tiết nào (comprehensive).",
      defB: "Exhausting: Mệt nhoài, làm kiệt sức hao tổn thể lực (tiring, fatiguing).",
      mnemonic: "Exhaustive inquiry = điều tra toàn diện thấu đáo; Exhausting trip = chuyến đi mệt nhoài."
    },
    {
      id: "u10-cw-4",
      pairKey: "apprehensive-comprehensive",
      wordA: "apprehensive",
      wordB: "comprehensive",
      diffHighlightA: { before: "", highlight: "apprehensive", after: "" },
      diffHighlightB: { before: "", highlight: "comprehensive", after: "" },
      promptSentence: "Are you feeling at all ______ about any unexpected pitfalls in the forthcoming examination?",
      correctWord: "apprehensive",
      defA: "Apprehensive: Lo âu, thấp thỏm bất an, sợ điều xui rủi xảy ra (anxious, fearful).",
      defB: "Comprehensive: Toàn diện, bao quát mọi mặt đầy đủ (covering completely).",
      mnemonic: "Apprehensive about exam = lo sợ thấp thỏm; Comprehensive guide = cẩm nang toàn diện."
    },
    {
      id: "u10-cw-5",
      pairKey: "inspirations-aspirations",
      wordA: "inspirations",
      wordB: "aspirations",
      diffHighlightA: { before: "", highlight: "inspirations", after: "" },
      diffHighlightB: { before: "", highlight: "aspirations", after: "" },
      promptSentence: "Naive youthful ______ and idealistic dreams of global fame hardly ever come to full fruition.",
      correctWord: "aspirations",
      defA: "Aspirations: Khát vọng, hoài bão vươn tới thành công trong tương lai (ambitions, hopes).",
      defB: "Inspirations: Nguồn cảm hứng sáng tạo đột phá xuất thần (sudden creative impulses).",
      mnemonic: "Youthful aspirations = hoài bão tuổi trẻ; Moment of inspiration = phút thăng hoa cảm hứng."
    },
    {
      id: "u10-cw-6",
      pairKey: "pathetic-apathetic",
      wordA: "pathetic",
      wordB: "apathetic",
      diffHighlightA: { before: "", highlight: "pathetic", after: "" },
      diffHighlightB: { before: "", highlight: "apathetic", after: "" },
      promptSentence: "It was a truly ______ and heart-rending sight to see the once-wealthy tycoon reduced to begging.",
      correctWord: "pathetic",
      defA: "Pathetic: Đáng thương cảm, gợi lòng xót xa thương hại; hoặc thảm hại bi đát.",
      defB: "Apathetic: Thờ ơ, lãnh cảm vô cảm, không quan tâm đoái hoài (indifferent, uninterested).",
      mnemonic: "Pathetic sight = cảnh tượng thảm thương; Apathetic voter = cử tri thờ ơ lãnh đạm."
    },
    {
      id: "u10-cw-7",
      pairKey: "flatter-flutter",
      wordA: "flatter",
      wordB: "flutter",
      diffHighlightA: { before: "", highlight: "flatter", after: "" },
      diffHighlightB: { before: "", highlight: "flutter", after: "" },
      promptSentence: "When she received the urgent telegram, she was all in a frantic ______ wondering what went wrong.",
      correctWord: "flutter",
      defA: "Flutter (all in a flutter): Trạng thái xốn xang, hoang mang nhấp nhổm, bồn chồn đứng ngồi không yên.",
      defB: "Flatter: Tâng bốc, nịnh hót xu nịnh để lấy lòng (praise insincerely).",
      mnemonic: "All in a flutter = đứng ngồi không yên; Flatter boss = nịnh bợ sếp."
    },
    {
      id: "u10-cw-8",
      pairKey: "illicit-elicit",
      wordA: "illicit",
      wordB: "elicit",
      diffHighlightA: { before: "", highlight: "illicit", after: "" },
      diffHighlightB: { before: "", highlight: "elicit", after: "" },
      promptSentence: "The clandestine and ______ sale of narcotics constitutes a severely punishable felony.",
      correctWord: "illicit",
      defA: "Illicit: Bất hợp pháp, lậu, phi pháp, bị luật pháp và đạo đức cấm đoán.",
      defB: "Elicit: Khêu gợi ra, khơi gợi phản hồi hoặc rút ra thông tin từ ai đó (evoke, draw out).",
      mnemonic: "Illicit trade = buôn bán phi pháp; Elicit a confession = gợi moi lời thú tội."
    },
    {
      id: "u10-cw-9",
      pairKey: "implicate-complicate",
      wordA: "implicate",
      wordB: "complicate",
      diffHighlightA: { before: "", highlight: "implicate", after: "" },
      diffHighlightB: { before: "", highlight: "complicate", after: "" },
      promptSentence: "Under interrogation, the embezzler tried to ______ a high-ranking ministry official in the bribery ring.",
      correctWord: "implicate",
      defA: "Implicate: Kéo ai đó vào vòng lao lý, dính líu tố cáo ai là đồng phạm (involve in a crime).",
      defB: "Complicate: Làm mọi chuyện trở nên phức tạp, rối rắm khó giải quyết (make complex).",
      mnemonic: "Implicate in a crime = kéo ai dính líu tội phạm; Complicate matters = làm phức tạp hóa."
    },
    {
      id: "u10-cw-10",
      pairKey: "crumbled-stumbled",
      wordA: "crumbled",
      wordB: "stumbled",
      diffHighlightA: { before: "", highlight: "crumbled", after: "" },
      diffHighlightB: { before: "", highlight: "stumbled", after: "" },
      promptSentence: "Running too hurriedly across the rocky pathway, the small toddler ______ over a loose stone and fell.",
      correctWord: "stumbled",
      defA: "Stumbled: Vấp chân té ngã, trượt bước loạng choạng (trip or momentarily lose balance).",
      defB: "Crumbled: Vụn nát thành từng mảnh nhỏ, sụp đổ tan tành (bánh quy vụn, đế chế sụp đổ).",
      mnemonic: "Stumbled over a rock = vấp đá ngã; Empire crumbled = đế chế sụp đổ vụn vỡ."
    }
  ],

  // 4. Synonym Filter (Collective Nouns & Group Classifiers from Page 41 Exercise C)
  synonymFilter: [
    {
      id: "u10-sf-1",
      targetWord: "shoal",
      targetCategory: "Unit 10 Collective Aquatic Nouns",
      targetMeaning: "A large number of fish swimming together",
      targetMeaningVi: "Đàn cá bơi cùng nhau (tập hợp sinh vật dưới nước)",
      note: "Chọn các danh từ tập hợp chuẩn xác chỉ đàn cá dưới nước và loại trừ các tập hợp trên cạn/trên trời.",
      words: [
        { word: "school", isSynonym: true, meaningVi: "Đàn cá (a school of fish)" },
        { word: "shoal", isSynonym: true, meaningVi: "Đàn cá (a shoal of mackerel)" },
        { word: "draft", isSynonym: true, meaningVi: "Mẻ lưới cá lớn được kéo lên" },
        { word: "run", isSynonym: true, meaningVi: "Đàn cá di cư theo mùa vượt thác" },
        { word: "constellation", isSynonym: false, meaningVi: "Chòm sao trên bầu trời đêm" },
        { word: "congregation", isSynonym: false, meaningVi: "Giáo đoàn đi lễ nhà thờ" }
      ]
    },
    {
      id: "u10-sf-2",
      targetWord: "congregation",
      targetCategory: "Unit 10 Human Assembly Nouns",
      targetMeaning: "A gathered group of worshippers or attendees",
      targetMeaningVi: "Hội chúng, giáo đoàn tín đồ tụ họp hành lễ",
      note: "Chọn các danh từ tập hợp người tụ họp có trật tự tôn giáo/nghị trường và loại trừ đám đông vô trật tự.",
      words: [
        { word: "assembly", isSynonym: true, meaningVi: "Đại hội đoàn tụ họp" },
        { word: "convocation", isSynonym: true, meaningVi: "Đoàn hội tụ tập chính thức" },
        { word: "flock", isSynonym: true, meaningVi: "Đoàn chiên con / tín đồ giáo xứ" },
        { word: "fellowship", isSynonym: true, meaningVi: "Hội đồng thông công gắn kết" },
        { word: "mob", isSynonym: false, meaningVi: "Đám đông cuồng loạn bạo động" },
        { word: "rabble", isSynonym: false, meaningVi: "Đám thảo khấu dân đen hỗn tạp" }
      ]
    },
    {
      id: "u10-sf-3",
      targetWord: "cluster",
      targetCategory: "Unit 10 Aggregation Nouns",
      targetMeaning: "A group of trees, bushes or buildings situated close together",
      targetMeaningVi: "Cụm, khóm, chùm (cây cối, nhà cửa mọc sát nhau)",
      note: "Chọn 4 danh từ chỉ sự tập hợp thành cụm/chùm khóm và 2 từ lạc nghĩa.",
      words: [
        { word: "clump", isSynonym: true, meaningVi: "Khóm cây bụi mọc sát" },
        { word: "copse", isSynonym: true, meaningVi: "Rặng cây bụi nhỏ" },
        { word: "grove", isSynonym: true, meaningVi: "Lùm cây, vườn cây nhỏ" },
        { word: "bunch", isSynonym: true, meaningVi: "Chùm, bó gom lại" },
        { word: "dispersion", isSynonym: false, meaningVi: "Sự phân tán rải rác rời rạc" },
        { word: "solitary", isSynonym: false, meaningVi: "Đơn độc trơ trọi một mình" }
      ]
    },
    {
      id: "u10-sf-4",
      targetWord: "horde",
      targetCategory: "Unit 10 Collective Crowds",
      targetMeaning: "A large, tumultuous or disorderly crowd of people or invaders",
      targetMeaningVi: "Đoàn lũ ồ ạt, đám đông tràn ngập hung hãn",
      note: "Chọn 4 danh từ đồng nghĩa chỉ đám đông tràn ngập và 2 danh từ chỉ cấu trúc phân tầng đơn lẻ.",
      words: [
        { word: "mob", isSynonym: true, meaningVi: "Đám đông quá khích cuồng nộ" },
        { word: "swarm", isSynonym: true, meaningVi: "Bầy đàn lúc nhúc tràn ngập" },
        { word: "throng", isSynonym: true, meaningVi: "Dòng người đông đúc chen chúc" },
        { word: "pack", isSynonym: true, meaningVi: "Bầy chó săn/lang sói tụ tập" },
        { word: "individual", isSynonym: false, meaningVi: "Cá nhân đơn lẻ" },
        { word: "hierarchy", isSynonym: false, meaningVi: "Hệ thống trật tự thứ bậc" }
      ]
    }
  ],

  // 5. Smart Cloze (The Great Peshtigo Firestorm of 1871 - Page 44 Ex A)
  clozePassages: [
    {
      id: "u10-cp-1",
      title: "The Forgotten Holocaust: The Great Peshtigo Fire of 1871",
      sourceLabel: "Level C1 Academic Reading (The Vocabulary Files - Page 44)",
      passageTemplate: "Many separate fires {{gap_1}} in the humus of the forest floor. Smoke sometimes {{gap_2}} the sun, which was often visible only at midday. On September 30, flames came within three miles of the town of Green Bay, {{gap_3}} 1,200 cords of wood stored at a charcoal kiln. The settlements in the area were becoming increasingly {{gap_4}} from both the outside world and one another as railroad and telegraph lines burned. The fires seemed to wax and wane, {{gap_5}} on the wind and chance. On September 30 the Marinette and Peshtigo Eagle reported hopefully that \"the fires have nearly {{gap_6}} now in this vicinity.\"\n\nBut the paper was wrong, and the fires were growing. By October 4, the smoke was so thick on Green Bay that ships had to use their foghorns and {{gap_7}} by compass. On October 7, the paper, reduced to looking for any scrap of good news, noted that at least the smoke had greatly reduced the mosquito population and that \"a certain establishment down on the bay shore that has been {{gap_8}} to the respectable citizens\" had burned.\n\nThe paper's editor, {{gap_9}} by the burning of the telegraph line, could not know it, but a large, deep low-pressure area was moving in from the west. The winds circling it would turn the smoldering forest of northeast-ern Wisconsin into {{gap_10}} on earth.",
      gaps: [
        {
          gapNumber: 1,
          options: [
            { label: "A", text: "extinguished" },
            { label: "B", text: "engulfed" },
            { label: "C", text: "spread" },
            { label: "D", text: "smoldered" }
          ],
          correctLabel: "D",
          correctWord: "smoldered",
          targetWord: "smoldered",
          explanations: {
            A: "Extinguished: bị dập tắt, mâu thuẫn hoàn toàn với khói bốc lên.",
            B: "Engulfed: nuốt chửng (cần có tân ngữ).",
            C: "Spread: lan tỏa, nhưng chưa diễn tả đúng trạng thái cháy ngấm ngầm âm ỉ.",
            D: "Smoldered: Cháy âm ỉ, cháy ngún trong lớp mùn thảm mục rừng mà chưa bùng ngọn lửa lớn."
          },
          explanationVi: "Smoldered = cháy âm ỉ ngùn ngụt khói dưới lớp đất mùn rừng rậm."
        },
        {
          gapNumber: 2,
          options: [
            { label: "A", text: "obscured" },
            { label: "B", text: "burnt" },
            { label: "C", text: "illuminated" },
            { label: "D", text: "exposed" }
          ],
          correctLabel: "A",
          correctWord: "obscured",
          targetWord: "obscured",
          explanations: {
            A: "Obscured: che khuất, che mờ ánh sáng mặt trời làm chỉ thấy mờ mờ vào giữa trưa.",
            B: "Burnt: đốt cháy.",
            C: "Illuminated: thắp sáng bừng lên.",
            D: "Exposed: phơi bày ra."
          },
          explanationVi: "Obscured the sun = khói dày đặc che khuất hoàn toàn ánh nắng mặt trời."
        },
        {
          gapNumber: 3,
          options: [
            { label: "A", text: "damaging" },
            { label: "B", text: "consuming" },
            { label: "C", text: "avoiding" },
            { label: "D", text: "licking" }
          ],
          correctLabel: "B",
          correctWord: "consuming",
          targetWord: "consuming",
          explanations: {
            A: "Damaging: làm hư hại nhẹ.",
            B: "Consuming: thiêu rụi hoàn toàn (ngọn lửa nuốt trọn 1.200 súc gỗ tích trữ).",
            C: "Avoiding: né tránh.",
            D: "Licking: liếm láp ngọn lửa (licking at)."
          },
          explanationVi: "Consuming 1,200 cords of wood = ngọn lửa nuốt chửng, thiêu rụi toàn bộ kho củi gỗ."
        },
        {
          gapNumber: 4,
          options: [
            { label: "A", text: "frightened" },
            { label: "B", text: "lonely" },
            { label: "C", text: "isolated" },
            { label: "D", text: "inundated" }
          ],
          correctLabel: "C",
          correctWord: "isolated",
          targetWord: "isolated",
          explanations: {
            A: "Frightened: sợ hãi.",
            B: "Lonely: cô đơn tâm lý.",
            C: "Isolated: bị cô lập hoàn toàn về mặt địa lý do đường sắt và điện báo bị đứt.",
            D: "Inundated: bị ngập lụt dưới nước."
          },
          explanationVi: "Isolated from the outside world = bị cô lập, cắt đứt liên lạc với thế giới bên ngoài."
        },
        {
          gapNumber: 5,
          options: [
            { label: "A", text: "depending" },
            { label: "B", text: "independent" },
            { label: "C", text: "waiting" },
            { label: "D", text: "from" }
          ],
          correctLabel: "A",
          correctWord: "depending",
          targetWord: "depending",
          explanations: {
            A: "Depending: đi với giới từ on = tùy thuộc vào chiều gió và cơ may rủi.",
            B: "Independent: độc lập (đi với of).",
            C: "Waiting: chờ đợi.",
            D: "From: từ đâu."
          },
          explanationVi: "Depending on the wind and chance = phụ thuộc vào sức gió và sự may rủi."
        },
        {
          gapNumber: 6,
          options: [
            { label: "A", text: "increased" },
            { label: "B", text: "died out" },
            { label: "C", text: "flared" },
            { label: "D", text: "diminished" }
          ],
          correctLabel: "B",
          correctWord: "died out",
          targetWord: "died out",
          explanations: {
            A: "Increased: gia tăng nguy hiểm.",
            B: "Died out: Phrasal verb C1 chỉ ngọn lửa đã lụi tàn, tắt hẳn (fires have nearly died out).",
            C: "Flared: bùng cháy dữ dội.",
            D: "Diminished: giảm bớt (nhưng cấu trúc 'nearly died out' là thành ngữ chuẩn)."
          },
          explanationVi: "Died out = ngọn lửa đã lụi tắt gần hết trong khu vực lân cận."
        },
        {
          gapNumber: 7,
          options: [
            { label: "A", text: "steer" },
            { label: "B", text: "drive" },
            { label: "C", text: "guess" },
            { label: "D", text: "navigate" }
          ],
          correctLabel: "D",
          correctWord: "navigate",
          targetWord: "navigate",
          explanations: {
            A: "Steer: bẻ lái vô lăng (thường cần tân ngữ 'steer the ship').",
            B: "Drive: lái xe trên đường bộ.",
            C: "Guess: đoán mò.",
            D: "Navigate: hải hành, định hướng hải trình hoàn toàn bằng la bàn trong sương khói mịt mù."
          },
          explanationVi: "Navigate by compass = hải hành, định hướng đường đi của tàu thủy bằng la bàn."
        },
        {
          gapNumber: 8,
          options: [
            { label: "A", text: "frequented" },
            { label: "B", text: "obnoxious" },
            { label: "C", text: "open" },
            { label: "D", text: "ignorant" }
          ],
          correctLabel: "B",
          correctWord: "obnoxious",
          targetWord: "obnoxious",
          explanations: {
            A: "Frequented: hay lui tới.",
            B: "Obnoxious: chướng tai gai mắt, đáng ghét tởm đối với công dân đoan trang (nhà chứa/quán rượu bất chính).",
            C: "Open: mở cửa.",
            D: "Ignorant: dốt nát thiếu hiểu biết."
          },
          explanationVi: "Obnoxious to respectable citizens = cơ sở chướng mắt, gây khó chịu cho người dân lương thiện."
        },
        {
          gapNumber: 9,
          options: [
            { label: "A", text: "cut-off" },
            { label: "B", text: "burnt" },
            { label: "C", text: "dismissed" },
            { label: "D", text: "chased" }
          ],
          correctLabel: "A",
          correctWord: "cut-off",
          targetWord: "cut-off",
          explanations: {
            A: "Cut-off: bị cô lập thông tin, cắt đứt đường dây điện báo nên không hay biết bão tới.",
            B: "Burnt: bị thiêu rụi.",
            C: "Dismissed: bị sa thải.",
            D: "Chased: bị săn đuổi."
          },
          explanationVi: "Cut-off by the burning of the telegraph line = bị cắt đứt nguồn tin do đường điện báo cháy rụi."
        },
        {
          gapNumber: 10,
          options: [
            { label: "A", text: "peace" },
            { label: "B", text: "heaven" },
            { label: "C", text: "hell" },
            { label: "D", text: "paradise" }
          ],
          correctLabel: "C",
          correctWord: "hell",
          targetWord: "hell",
          explanations: {
            A: "Peace: thanh bình.",
            B: "Heaven: thiên đường.",
            C: "Hell: Collocation văn học C1 'turn into hell on earth' = biến thành địa ngục trần gian.",
            D: "Paradise: cõi tiên."
          },
          explanationVi: "Hell on earth = cơn bão lửa biến cả vùng rừng thành hỏa ngục trần gian."
        }
      ]
    }
  ],

  // 6. Speed Blitz (20 Instant-Recall Questions from Page 40 Ex B & Page 45 Ex B)
  speedBlitz: [
    // Questions 1-10: Criminal Categories & Societal Roles (Page 40 Exercise B)
    {
      id: "u10-sb-1",
      questionNumber: 1,
      prompt: "Someone who unlawfully shoots deer or catches salmon on strictly private estates is a(n) ______.",
      options: [
        { key: "a", text: "poacher" },
        { key: "b", text: "forger" },
        { key: "c", text: "usurper" },
        { key: "d", text: "hobo" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "poacher", pos: "n", vi: "Chính xác: kẻ săn bắn/đánh bắt trộm động vật trái phép trên đất tư nhân" },
        { key: "b", word: "forger", pos: "n", vi: "Kẻ làm giả chữ ký giấy tờ" },
        { key: "c", word: "usurper", pos: "n", vi: "Kẻ cướp ngôi soán vị" },
        { key: "d", word: "hobo", pos: "n", vi: "Người vô gia cư sống lang bạt" }
      ]
    },
    {
      id: "u10-sb-2",
      questionNumber: 2,
      prompt: "A criminal who alters a genuine check or fakes someone else's legal signature is a(n) ______.",
      options: [
        { key: "a", text: "quack" },
        { key: "b", text: "forger" },
        { key: "c", text: "usurer" },
        { key: "d", text: "trespasser" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "quack", pos: "n", vi: "Lang băm bán thuốc dạo giả danh" },
        { key: "b", word: "forger", pos: "n", vi: "Chính xác: kẻ làm đồ giả, giả mạo chữ ký hoặc văn kiện tài chính" },
        { key: "c", word: "usurer", pos: "n", vi: "Kẻ cho vay nặng lãi cắt cổ" },
        { key: "d", word: "trespasser", pos: "n", vi: "Kẻ xâm phạm gia cư bất hợp pháp" }
      ]
    },
    {
      id: "u10-sb-3",
      questionNumber: 3,
      prompt: "A violent assailant who attacks pedestrians in dark streets from behind to rob them is a(n) ______.",
      options: [
        { key: "a", text: "mugger" },
        { key: "b", text: "poacher" },
        { key: "c", text: "stowaway" },
        { key: "d", text: "vagrant" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "mugger", pos: "n", vi: "Chính xác: kẻ trấn lột đường phố, hành hung nạn nhân từ phía sau để cướp tiền" },
        { key: "b", word: "poacher", pos: "n", vi: "Kẻ săn trộm thú rừng" },
        { key: "c", word: "stowaway", pos: "n", vi: "Kẻ đi lậu vé trốn trên tàu" },
        { key: "d", word: "vagrant", pos: "n", vi: "Kẻ sống lang thang đầu đường xó chợ" }
      ]
    },
    {
      id: "u10-sb-4",
      questionNumber: 4,
      prompt: "A fanatic hired to murder an eminent politician or head of state for ideological motives is a(n) ______.",
      options: [
        { key: "a", text: "assassin" },
        { key: "b", text: "perjurer" },
        { key: "c", text: "hijacker" },
        { key: "d", text: "hooligan" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "assassin", pos: "n", vi: "Chính xác: sát thủ chính trị ám sát nhân vật tai to mặt lớn" },
        { key: "b", word: "perjurer", pos: "n", vi: "Kẻ thề man khai man trước tòa" },
        { key: "c", word: "hijacker", pos: "n", vi: "Không tặc cướp máy bay" },
        { key: "d", word: "hooligan", pos: "n", vi: "Côn đồ bóng đá phá phách" }
      ]
    },
    {
      id: "u10-sb-5",
      questionNumber: 5,
      prompt: "A loan shark who illegally lends money at extortionate and ruinous interest rates is a(n) ______.",
      options: [
        { key: "a", text: "quack" },
        { key: "b", text: "usurer" },
        { key: "c", text: "usurper" },
        { key: "d", text: "forger" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "quack", pos: "n", vi: "Thầy thuốc lang băm" },
        { key: "b", word: "usurer", pos: "n", vi: "Chính xác: kẻ cho vay nặng lãi, bóc lột lãi suất cắt cổ bất hợp pháp" },
        { key: "c", word: "usurper", pos: "n", vi: "Kẻ tiếm quyền đoạt ngôi vua" },
        { key: "d", word: "forger", pos: "n", vi: "Kẻ làm giả giấy tờ" }
      ]
    },
    {
      id: "u10-sb-6",
      questionNumber: 6,
      prompt: "A rebellious general who violently deposes the monarch and seizes the throne is a(n) ______.",
      options: [
        { key: "a", text: "usurper" },
        { key: "b", text: "perjurer" },
        { key: "c", text: "hijacker" },
        { key: "d", text: "vagrant" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "usurper", pos: "n", vi: "Chính xác: kẻ tiếm ngôi, soán quyền vương triều bằng vũ lực" },
        { key: "b", word: "perjurer", pos: "n", vi: "Kẻ khai man trước tòa" },
        { key: "c", word: "hijacker", pos: "n", vi: "Kẻ cướp phương tiện giao thông" },
        { key: "d", word: "vagrant", pos: "n", vi: "Người sống vô gia cư" }
      ]
    },
    {
      id: "u10-sb-7",
      questionNumber: 7,
      prompt: "A dishonest witness who knowingly gives false testimony under sacred oath in court is a(n) ______.",
      options: [
        { key: "a", text: "perjurer" },
        { key: "b", text: "tax-evader" },
        { key: "c", text: "stowaway" },
        { key: "d", text: "mugger" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "perjurer", pos: "n", vi: "Chính xác: kẻ phạm tội thề man, làm chứng gian dối hữu thệ trước tòa án" },
        { key: "b", word: "tax-evader", pos: "n", vi: "Kẻ trốn thuế" },
        { key: "c", word: "stowaway", pos: "n", vi: "Kẻ trốn vé đi lậu tàu" },
        { key: "d", word: "mugger", pos: "n", vi: "Kẻ cướp giật" }
      ]
    },
    {
      id: "u10-sb-8",
      questionNumber: 8,
      prompt: "A person who secretes himself in a cargo ship's hold to travel across the ocean without a ticket is a(n) ______.",
      options: [
        { key: "a", text: "stowaway" },
        { key: "b", text: "vagrant" },
        { key: "c", text: "hobo" },
        { key: "d", text: "poacher" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "stowaway", pos: "n", vi: "Chính xác: kẻ đi lậu vé, trốn chui trốn lủi trong khoang tàu thủy / càng máy bay" },
        { key: "b", word: "vagrant", pos: "n", vi: "Kẻ sống vất vưởng lang thang" },
        { key: "c", word: "hobo", pos: "n", vi: "Người lang bạt tìm việc làm tạm" },
        { key: "d", word: "poacher", pos: "n", vi: "Kẻ săn trộm" }
      ]
    },
    {
      id: "u10-sb-9",
      questionNumber: 9,
      prompt: "An uncredentialed impostor who pretends to possess magical ointments and medical cures is a(n) ______.",
      options: [
        { key: "a", text: "quack" },
        { key: "b", text: "cobbler" },
        { key: "c", text: "peddler" },
        { key: "d", text: "milliner" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "quack", pos: "n", vi: "Chính xác: lang băm lang vườn giả mạo y bác sĩ bịp bợm thuốc thang" },
        { key: "b", word: "cobbler", pos: "n", vi: "Thợ sửa giày" },
        { key: "c", word: "peddler", pos: "n", vi: "Người bán dạo" },
        { key: "d", word: "milliner", pos: "n", vi: "Thợ làm nón" }
      ]
    },
    {
      id: "u10-sb-10",
      questionNumber: 10,
      prompt: "An armed terrorist who forcibly takes command of a passenger jet in mid-flight is a(n) ______.",
      options: [
        { key: "a", text: "hijacker" },
        { key: "b", text: "hooligan" },
        { key: "c", text: "assassin" },
        { key: "d", text: "trespasser" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "hijacker", pos: "n", vi: "Chính xác: không tặc, kẻ khống chế cướp quyền điều khiển phi cơ đang bay" },
        { key: "b", word: "hooligan", pos: "n", vi: "Kẻ gây rối bạo loạn" },
        { key: "c", word: "assassin", pos: "n", vi: "Sát thủ" },
        { key: "d", word: "trespasser", pos: "n", vi: "Kẻ xâm nhập tư gia" }
      ]
    },

    // Questions 11-20: Advanced C1 Practice Multiple-Choice (Page 45 Exercise B)
    {
      id: "u10-sb-11",
      questionNumber: 11,
      prompt: "Eloquent and precise use of language inherently ______ its cultural beauty and communicative power.",
      options: [
        { key: "a", text: "detracts from" },
        { key: "b", text: "deteriorates" },
        { key: "c", text: "enhances" },
        { key: "d", text: "lessens" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "detracts from", pos: "v", vi: "Làm giảm sút giá trị" },
        { key: "b", word: "deteriorates", pos: "v", vi: "Làm suy thoái" },
        { key: "c", word: "enhances", pos: "collocation", vi: "Chính xác: enhance its beauty = tôn thêm vẻ đẹp và nâng tầm phát triển" },
        { key: "d", word: "lessens", pos: "v", vi: "Làm suy yếu bớt" }
      ]
    },
    {
      id: "u10-sb-12",
      questionNumber: 12,
      prompt: "Applicants must carefully fill out the visa application form exactly as ______ in the official instructions.",
      options: [
        { key: "a", text: "insisted" },
        { key: "b", text: "specified" },
        { key: "c", text: "implied" },
        { key: "d", text: "devised" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "insisted", pos: "v", vi: "Khăng khăng đòi hỏi" },
        { key: "b", word: "specified", pos: "collocation", vi: "Chính xác: as specified in the notes = đúng như đã được nêu rõ chi tiết trong hướng dẫn" },
        { key: "c", word: "implied", pos: "v", vi: "Ngụ ý ẩn ý" },
        { key: "d", word: "devised", pos: "v", vi: "Được phát minh sáng chế" }
      ]
    },
    {
      id: "u10-sb-13",
      questionNumber: 13,
      prompt: "He perpetually shuns any strenuous academic effort because he is such an exceptionally ______ student.",
      options: [
        { key: "a", text: "indolent" },
        { key: "b", text: "diligent" },
        { key: "c", text: "indigent" },
        { key: "d", text: "indigenous" }
      ],
      correctKey: "a",
      explanations: [
        { key: "a", word: "indolent", pos: "collocation", vi: "Chính xác: indolent student = học sinh lười biếng, biếng nhác ngại động tay động chân" },
        { key: "b", word: "diligent", pos: "adj", vi: "Cần cù chăm chỉ (trái ngược với shuns work)" },
        { key: "c", word: "indigent", pos: "adj", vi: "Nghèo khó bần cùng" },
        { key: "d", word: "indigenous", pos: "adj", vi: "Bản địa thổ sản" }
      ]
    },
    {
      id: "u10-sb-14",
      questionNumber: 14,
      prompt: "His thoughts tumbled out in complete disarray; indeed, the student's essay grammar was hopelessly ______.",
      options: [
        { key: "a", text: "well-constructed" },
        { key: "b", text: "incoherent" },
        { key: "c", text: "jerry-built" },
        { key: "d", text: "highbrow" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "well-constructed", pos: "adj", vi: "Được kết cấu chặt chẽ" },
        { key: "b", word: "incoherent", pos: "collocation", vi: "Chính xác: incoherent grammar = ngữ pháp rời rạc, lủng củng không ra thể thống nào" },
        { key: "c", word: "jerry-built", pos: "adj", vi: "Xây dựng cẩu thả ọp ẹp (nhà cửa)" },
        { key: "d", word: "highbrow", pos: "adj", vi: "Trí thức cao siêu" }
      ]
    },
    {
      id: "u10-sb-15",
      questionNumber: 15,
      prompt: "The candidate failed the preliminary screening because his English spelling was utterly ______.",
      options: [
        { key: "a", text: "ferocious" },
        { key: "b", text: "incongruous" },
        { key: "c", text: "apprehensive" },
        { key: "d", text: "atrocious" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "ferocious", pos: "adj", vi: "Hung dữ tàn bạo" },
        { key: "b", word: "incongruous", pos: "adj", vi: "Lạc quẻ khập khiễng" },
        { key: "c", word: "apprehensive", pos: "adj", vi: "Lo lắng bất an" },
        { key: "d", word: "atrocious", pos: "collocation", vi: "Chính xác: atrocious spelling = chính tả tệ hại khủng khiếp, sai be bét" }
      ]
    },
    {
      id: "u10-sb-16",
      questionNumber: 16,
      prompt: "The stern warning sign erected on the boundary wall read: '______ will be vigorously prosecuted.'",
      options: [
        { key: "a", text: "Muggers" },
        { key: "b", text: "Hijackers" },
        { key: "c", text: "Stowaways" },
        { key: "d", text: "Trespassers" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "Muggers", pos: "n", vi: "Kẻ trấn lột" },
        { key: "b", word: "Hijackers", pos: "n", vi: "Không tặc" },
        { key: "c", word: "Stowaways", pos: "n", vi: "Kẻ đi lậu vé" },
        { key: "d", word: "Trespassers", pos: "collocation", vi: "Chính xác: 'Trespassers will be prosecuted' = thành ngữ pháp lý biển báo cấm xâm phạm đất đai" }
      ]
    },
    {
      id: "u10-sb-17",
      questionNumber: 17,
      prompt: "Having lied under solemn oath in the murder trial, the witness was subsequently prosecuted for ______.",
      options: [
        { key: "a", text: "poaching" },
        { key: "b", text: "forgery" },
        { key: "c", text: "perjury" },
        { key: "d", text: "usury" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "poaching", pos: "n", vi: "Săn bắn trộm" },
        { key: "b", word: "forgery", pos: "n", vi: "Làm giả tài liệu" },
        { key: "c", word: "perjury", pos: "collocation", vi: "Chính xác: charged with perjury = bị truy tố về tội khai man hữu thệ trước tòa" },
        { key: "d", word: "usury", pos: "n", vi: "Cho vay nặng lãi" }
      ]
    },
    {
      id: "u10-sb-18",
      questionNumber: 18,
      prompt: "Not only was the young pupil's grammar incoherent and spelling atrocious, but his punctuation was completely ______.",
      options: [
        { key: "a", text: "slothful" },
        { key: "b", text: "sluggish" },
        { key: "c", text: "hazard" },
        { key: "d", text: "haphazard" }
      ],
      correctKey: "d",
      explanations: [
        { key: "a", word: "slothful", pos: "adj", vi: "Lười chảy thây" },
        { key: "b", word: "sluggish", pos: "adj", vi: "Chậm chạp lờ đờ" },
        { key: "c", word: "hazard", pos: "n", vi: "Mối hiểm nguy" },
        { key: "d", word: "haphazard", pos: "collocation", vi: "Chính xác: haphazard punctuation = chấm câu bạ đâu đặt đấy, tùy tiện lộn xộn không quy tắc" }
      ]
    },
    {
      id: "u10-sb-19",
      prompt: "I am certainly not a habitual chain smoker, but I occasionally ______ in an expensive Cuban cigar.",
      questionNumber: 19,
      options: [
        { key: "a", text: "enjoy" },
        { key: "b", text: "indulge" },
        { key: "c", text: "divulge" },
        { key: "d", text: "decline" }
      ],
      correctKey: "b",
      explanations: [
        { key: "a", word: "enjoy", pos: "v", vi: "Enjoy a cigar (không đi với giới từ in)" },
        { key: "b", word: "indulge", pos: "collocation", vi: "Chính xác: indulge in sth = tự buông thả, nuông chiều bản thân tận hưởng cái thú gì đó" },
        { key: "c", word: "divulge", pos: "v", vi: "Tiết lộ bí mật" },
        { key: "d", word: "decline", pos: "v", vi: "Từ chối" }
      ]
    },
    {
      id: "u10-sb-20",
      questionNumber: 20,
      prompt: "Through the dense maritime fog, the lookout could faintly discern a picturesque ______ of thatched cottages.",
      options: [
        { key: "a", text: "constellation" },
        { key: "b", text: "clutter" },
        { key: "c", text: "cluster" },
        { key: "d", text: "piled" }
      ],
      correctKey: "c",
      explanations: [
        { key: "a", word: "constellation", pos: "n", vi: "Chòm sao trên trời" },
        { key: "b", word: "clutter", pos: "n", vi: "Mớ đồ đạc bề bộn" },
        { key: "c", word: "cluster", pos: "collocation", vi: "Chính xác: a cluster of cottages = một cụm nhà mái tranh quây quần kề sát nhau" },
        { key: "d", word: "piled", pos: "adj", vi: "Chất đống" }
      ]
    }
  ]
};


export const VOCAB_C1_UNITS: VocabC1Unit[] = [VOCAB_C1_UNIT_1, VOCAB_C1_UNIT_2, VOCAB_C1_UNIT_3, VOCAB_C1_UNIT_4, VOCAB_C1_UNIT_5, VOCAB_C1_UNIT_6, VOCAB_C1_UNIT_7, VOCAB_C1_UNIT_8, VOCAB_C1_UNIT_9, VOCAB_C1_UNIT_10];




