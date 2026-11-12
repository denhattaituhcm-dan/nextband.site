/**
 * NEXTQUIZ QUESTION REPOSITORY
 * Bộ câu hỏi chuẩn IELTS Collocation & Lexical Resource
 * Tích hợp chẩn đoán bẫy Misconception của học sinh Việt Nam.
 */

export interface ArenaQuestionOption {
  id: string;
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface ArenaQuestion {
  id: string;
  roundIndex: number;
  prompt: string;
  options: ArenaQuestionOption[];
  correctOptionId: string;
  correctAnswerText: string;
  correctExplanation: string;
  misconception: {
    baitOptionId: string;
    baitOptionText: string;
    diagnosticTitle: string;
    explanation: string;
  };
}

function hashSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function shuffleQuestionOptions(question: ArenaQuestion, seedStr?: string): ArenaQuestion {
  if (!question.options || question.options.length < 2) return question;

  const originalCorrect = question.options.find((o) => o.id === question.correctOptionId) || question.options[0];
  const originalBait = question.misconception
    ? question.options.find((o) => o.id === question.misconception.baitOptionId)
    : null;

  const seedNum = hashSeed(seedStr || question.id || 'arena_fallback');
  const shuffled = [...question.options];
  let curSeed = seedNum;

  for (let i = shuffled.length - 1; i > 0; i--) {
    curSeed = (curSeed * 1664525 + 1013904223) % 4294967296;
    const j = Math.floor((curSeed / 4294967296) * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  const labels: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
  const newOptions: ArenaQuestionOption[] = shuffled.map((opt, idx) => ({
    id: `opt_${labels[idx]}`,
    label: labels[idx],
    text: opt.text,
  }));

  const newCorrectIdx = shuffled.findIndex((opt) => opt.text === originalCorrect.text);
  const correctIdxSafe = newCorrectIdx >= 0 ? newCorrectIdx : 0;
  const newCorrectOptionId = newOptions[correctIdxSafe].id;
  const newCorrectAnswerText = `${newOptions[correctIdxSafe].label}. ${newOptions[correctIdxSafe].text}`;

  let newMisconception = question.misconception;
  if (originalBait && question.misconception) {
    const newBaitIdx = shuffled.findIndex((opt) => opt.text === originalBait.text);
    if (newBaitIdx >= 0) {
      newMisconception = {
        ...question.misconception,
        baitOptionId: newOptions[newBaitIdx].id,
        baitOptionText: `${newOptions[newBaitIdx].label}. ${newOptions[newBaitIdx].text}`,
      };
    }
  }

  return {
    ...question,
    options: newOptions,
    correctOptionId: newCorrectOptionId,
    correctAnswerText: newCorrectAnswerText,
    misconception: newMisconception,
  };
}

export const RAW_ARENA_COLLOCATION_QUESTIONS: ArenaQuestion[] = [
  {
    id: 'q_colloc_01',
    roundIndex: 0,
    prompt: 'The enterprise decided to ______ an investment in clean technology.',
    options: [
      { id: 'opt_A', label: 'A', text: 'make an investment' },
      { id: 'opt_B', label: 'B', text: 'do an investment' },
      { id: 'opt_C', label: 'C', text: 'take an investment' },
      { id: 'opt_D', label: 'D', text: 'create an investment' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. make an investment',
    correctExplanation: 'Động từ chuẩn đi với "investment" trong học thuật IELTS là "make" (không dùng do/take/create).',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. do an investment',
      diagnosticTitle: 'Bẫy dịch từ tư duy tiếng Việt (Làm đầu tư)',
      explanation: 'Học viên có thói quen dịch "làm đầu tư" thành "do an investment". Trong tiếng Anh học thuật, "make" đi với quyết định/khoản đầu tư kinh tế mang tính chủ động.',
    },
  },
  {
    id: 'q_colloc_02',
    roundIndex: 1,
    prompt: 'Students need to ______ into account cultural differences when studying abroad.',
    options: [
      { id: 'opt_A', label: 'A', text: 'take' },
      { id: 'opt_B', label: 'B', text: 'make' },
      { id: 'opt_C', label: 'C', text: 'keep' },
      { id: 'opt_D', label: 'D', text: 'bring' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. take',
    correctExplanation: 'Cụm cố định "take something into account" mang nghĩa cân nhắc, tính đến một yếu tố nào đó.',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. make',
      diagnosticTitle: 'Nhầm lẫn với "make account of"',
      explanation: 'Học viên hay nhầm với cấu trúc "make account" hoặc tự ghép "make into account". Thành ngữ chuẩn luôn là "take into account" hoặc "take into consideration".',
    },
  },
  {
    id: 'q_colloc_03',
    roundIndex: 2,
    prompt: 'Recent scientific research has ______ valuable light on how memory functions.',
    options: [
      { id: 'opt_A', label: 'A', text: 'shed' },
      { id: 'opt_B', label: 'B', text: 'dropped' },
      { id: 'opt_C', label: 'C', text: 'shone' },
      { id: 'opt_D', label: 'D', text: 'lighted' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. shed',
    correctExplanation: 'Collocation band 7.0+: "shed light on something" nghĩa là làm sáng tỏ, soi rọi điều gì chưa rõ.',
    misconception: {
      baitOptionId: 'opt_C',
      baitOptionText: 'C. shone',
      diagnosticTitle: 'Bẫy nghĩa đen "Chiếu sáng (Shine/Shone)"',
      explanation: 'Học viên nghĩ ánh sáng phải dùng động từ "shine/shone", nhưng collocation thành ngữ học thuật chỉ chấp nhận "shed light on".',
    },
  },
  {
    id: 'q_colloc_04',
    roundIndex: 3,
    prompt: 'Engaging in regular aerobic workouts helps individuals ______ in good shape.',
    options: [
      { id: 'opt_A', label: 'A', text: 'stay' },
      { id: 'opt_B', label: 'B', text: 'hold' },
      { id: 'opt_C', label: 'C', text: 'run' },
      { id: 'opt_D', label: 'D', text: 'stand' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. stay',
    correctExplanation: 'Cụm từ "stay in shape" hoặc "keep in shape" là collocation chuẩn chỉ việc giữ vóc dáng cân đối và khỏe mạnh.',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. hold',
      diagnosticTitle: 'Nhầm lẫn giữ hình dáng (Hold)',
      explanation: '"Hold" chỉ dùng cho giữ vật lý (hold hands). Để diễn tả trạng thái sức khỏe duy trì ổn định, ta dùng "stay" hoặc "keep".',
    },
  },
  {
    id: 'q_colloc_05',
    roundIndex: 4,
    prompt: 'The international summit aimed to ______ public awareness of climate change.',
    options: [
      { id: 'opt_A', label: 'A', text: 'raise' },
      { id: 'opt_B', label: 'B', text: 'rise' },
      { id: 'opt_C', label: 'C', text: 'lift' },
      { id: 'opt_D', label: 'D', text: 'boost' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. raise',
    correctExplanation: 'Cụm chuẩn "raise awareness of something" (nâng cao nhận thức). "Raise" là ngoại động từ cần tân ngữ "awareness".',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. rise',
      diagnosticTitle: 'Bẫy kinh điển: Ngoại động từ vs Nội động từ (Raise vs Rise)',
      explanation: '"Rise" là nội động từ (không bao giờ có tân ngữ phía sau, ví dụ: the sun rises). Do đó không thể nói "rise awareness".',
    },
  },
  {
    id: 'q_colloc_06',
    roundIndex: 5,
    prompt: 'The government needs to ______ urgent action to curb plastic pollution.',
    options: [
      { id: 'opt_A', label: 'A', text: 'take' },
      { id: 'opt_B', label: 'B', text: 'make' },
      { id: 'opt_C', label: 'C', text: 'do' },
      { id: 'opt_D', label: 'D', text: 'give' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. take',
    correctExplanation: 'Collocation học thuật chuẩn: "take action" (hành động). Tuyệt đối không dùng do/make action.',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. make',
      diagnosticTitle: 'Bẫy dịch từ tiếng Việt (Làm hành động)',
      explanation: 'Học viên hay nhầm "làm hành động" với "make action" hoặc "do action". Cụm cố định của người bản xứ luôn là "take action" hoặc "take measures".',
    },
  },
  {
    id: 'q_colloc_07',
    roundIndex: 6,
    prompt: 'Working parents often struggle to ______ a balance between career and family obligations.',
    options: [
      { id: 'opt_A', label: 'A', text: 'strike' },
      { id: 'opt_B', label: 'B', text: 'hit' },
      { id: 'opt_C', label: 'C', text: 'catch' },
      { id: 'opt_D', label: 'D', text: 'hold' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. strike',
    correctExplanation: 'Collocation band 7.5+: "strike a balance (between A and B)" mang nghĩa đạt được trạng thái cân bằng hoàn hảo.',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. hit',
      diagnosticTitle: 'Nhầm lẫn động từ va chạm (Hit vs Strike)',
      explanation: '"Hit" và "Strike" đều có nghĩa đánh/chạm, nhưng thành ngữ cố định chỉ đi với "strike a balance".',
    },
  },
  {
    id: 'q_colloc_08',
    roundIndex: 7,
    prompt: 'Excessive screen time can ______ a detrimental impact on adolescent mental health.',
    options: [
      { id: 'opt_A', label: 'A', text: 'have' },
      { id: 'opt_B', label: 'B', text: 'give' },
      { id: 'opt_C', label: 'C', text: 'bring' },
      { id: 'opt_D', label: 'D', text: 'create' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. have',
    correctExplanation: 'Cụm chuẩn trong IELTS Writing Task 2: "have an impact / effect on something" (gây ra tác động lên điều gì).',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. give',
      diagnosticTitle: 'Bẫy "Trao/Đem lại tác động" (Give an impact)',
      explanation: 'Học viên dịch nghĩa tiếng Việt "cho/gây ra tác động" thành "give an impact". Trong tiếng Anh học thuật chuẩn, danh từ impact luôn đi với "have an impact on".',
    },
  },
  {
    id: 'q_colloc_09',
    roundIndex: 8,
    prompt: 'In academic writing, candidates are expected to ______ an argument with concrete evidence.',
    options: [
      { id: 'opt_A', label: 'A', text: 'substantiate' },
      { id: 'opt_B', label: 'B', text: 'solidify' },
      { id: 'opt_C', label: 'C', text: 'materialize' },
      { id: 'opt_D', label: 'D', text: 'condense' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. substantiate',
    correctExplanation: 'Collocation C1-C2: "substantiate an argument / a claim" nghĩa là chứng minh, củng cố luận điểm bằng bằng chứng cụ thể.',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. solidify',
      diagnosticTitle: 'Nhầm lẫn nghĩa đen "Làm vững chắc"',
      explanation: '"Solidify" thường dùng cho chất lỏng đông đặc hoặc kế hoạch kết tinh. Với luận điểm học thuật, động từ chuẩn nhất là "substantiate" hoặc "support".',
    },
  },
  {
    id: 'q_colloc_10',
    roundIndex: 9,
    prompt: 'The research team was able to ______ a conclusion based on extensive field data.',
    options: [
      { id: 'opt_A', label: 'A', text: 'draw' },
      { id: 'opt_B', label: 'B', text: 'pull' },
      { id: 'opt_C', label: 'C', text: 'take' },
      { id: 'opt_D', label: 'D', text: 'extract' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. draw',
    correctExplanation: 'Collocation chuẩn: "draw a conclusion" (rút ra kết luận).',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. pull',
      diagnosticTitle: 'Nhầm lẫn động từ kéo/rút (Pull vs Draw)',
      explanation: 'Dù "draw" và "pull" đều có nét nghĩa kéo/rút, nhưng chỉ có "draw a conclusion" mới là collocation chuẩn trong văn phong nghiên cứu.',
    },
  },
  {
    id: 'q_colloc_11',
    roundIndex: 10,
    prompt: 'The factory failed to ______ with international safety standards.',
    options: [
      { id: 'opt_A', label: 'A', text: 'comply' },
      { id: 'opt_B', label: 'B', text: 'obey' },
      { id: 'opt_C', label: 'C', text: 'conform' },
      { id: 'opt_D', label: 'D', text: 'adhere' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. comply',
    correctExplanation: 'Giới từ "with" đi kèm với "comply" (comply with standards). Lưu ý: conform to, adhere to, obey + tân ngữ trực tiếp.',
    misconception: {
      baitOptionId: 'opt_D',
      baitOptionText: 'D. adhere',
      diagnosticTitle: 'Bẫy giới từ (Comply with vs Adhere to)',
      explanation: '"Adhere" luôn đi với giới từ "to" (adhere to standards), trong khi câu có giới từ "with" nên bắt buộc phải chọn "comply with".',
    },
  },
  {
    id: 'q_colloc_12',
    roundIndex: 11,
    prompt: 'Urban planners must ______ measures to prevent suburban sprawl.',
    options: [
      { id: 'opt_A', label: 'A', text: 'adopt' },
      { id: 'opt_B', label: 'B', text: 'accept' },
      { id: 'opt_C', label: 'C', text: 'adapt' },
      { id: 'opt_D', label: 'D', text: 'receive' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. adopt',
    correctExplanation: 'Cụm chuẩn: "adopt measures / adopt policies" mang nghĩa thông qua hoặc áp dụng các biện pháp, chính sách.',
    misconception: {
      baitOptionId: 'opt_C',
      baitOptionText: 'C. adapt',
      diagnosticTitle: 'Bẫy từ vựng chính tả: Adopt vs Adapt',
      explanation: '"Adapt" là thích nghi (adapt to something). "Adopt" là áp dụng, tiếp nhận hoặc nhận nuôi. Ở đây cần động từ mang nghĩa áp dụng giải pháp: "adopt measures".',
    },
  },
  {
    id: 'q_colloc_13',
    roundIndex: 12,
    prompt: 'The minister was pressured to ______ full responsibility for the policy failure.',
    options: [
      { id: 'opt_A', label: 'A', text: 'take' },
      { id: 'opt_B', label: 'B', text: 'get' },
      { id: 'opt_C', label: 'C', text: 'make' },
      { id: 'opt_D', label: 'D', text: 'hold' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. take',
    correctExplanation: 'Collocation học thuật: "take responsibility" hoặc "assume responsibility" (chịu trách nhiệm). Không dùng get/make responsibility.',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. get',
      diagnosticTitle: 'Bẫy dịch từ tiếng Việt (Nhận trách nhiệm = Get)',
      explanation: 'Học viên hay dịch từ "nhận" thành "get". Nhưng trách nhiệm là nghĩa vụ đạo đức/pháp lý, tiếng Anh luôn dùng "take full responsibility".',
    },
  },
  {
    id: 'q_colloc_14',
    roundIndex: 13,
    prompt: 'Educational institutions should ______ a culture of curiosity and critical thinking.',
    options: [
      { id: 'opt_A', label: 'A', text: 'foster' },
      { id: 'opt_B', label: 'B', text: 'raise' },
      { id: 'opt_C', label: 'C', text: 'feed' },
      { id: 'opt_D', label: 'D', text: 'breed' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. foster',
    correctExplanation: 'Collocation band 8.0: "foster a culture / environment of something" (nuôi dưỡng, khuyến khích sự phát triển của môi trường/văn hóa).',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. raise',
      diagnosticTitle: 'Nhầm lẫn nuôi dưỡng con người vs nuôi dưỡng văn hóa',
      explanation: '"Raise" dùng cho nuôi con cái hoặc gia súc (raise children). Đối với giá trị tinh thần, tư duy hay văn hóa tổ chức, từ học thuật chuẩn là "foster".',
    },
  },
  {
    id: 'q_colloc_15',
    roundIndex: 14,
    prompt: 'Uncontrolled deforestation poses an imminent ______ to regional biodiversity.',
    options: [
      { id: 'opt_A', label: 'A', text: 'threat' },
      { id: 'opt_B', label: 'B', text: 'danger' },
      { id: 'opt_C', label: 'C', text: 'risk' },
      { id: 'opt_D', label: 'D', text: 'harm' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. threat',
    correctExplanation: 'Cụm cố định kinh điển trong IELTS Writing: "pose a threat to something" (đặt ra mối đe dọa lớn đối với cái gì).',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. danger',
      diagnosticTitle: 'Bẫy danh từ gần nghĩa (Danger vs Threat)',
      explanation: 'Dù "danger" là sự nguy hiểm, nhưng động từ "pose" chỉ đi cặp tự nhiên với "threat" (pose a threat) hoặc "challenge" (pose a challenge).',
    },
  },
  {
    id: 'q_colloc_16',
    roundIndex: 15,
    prompt: 'Before publishing, the laboratory must ______ conclusive evidence to support its claims.',
    options: [
      { id: 'opt_A', label: 'A', text: 'provide' },
      { id: 'opt_B', label: 'B', text: 'make' },
      { id: 'opt_C', label: 'C', text: 'perform' },
      { id: 'opt_D', label: 'D', text: 'invent' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. provide',
    correctExplanation: 'Collocation chuẩn: "provide / produce conclusive evidence" (cung cấp bằng chứng thuyết phục/chắc chắn).',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. make',
      diagnosticTitle: 'Bẫy "Tạo ra bằng chứng" (Make evidence)',
      explanation: 'Trong nghiên cứu khoa học, bằng chứng không thể "làm ra/chế tạo" (make). Ta phải dùng "provide" hoặc "yield evidence".',
    },
  },
  {
    id: 'q_colloc_17',
    roundIndex: 16,
    prompt: 'Chemical leaks have ______ irreparable damage to the marine habitat.',
    options: [
      { id: 'opt_A', label: 'A', text: 'caused' },
      { id: 'opt_B', label: 'B', text: 'made' },
      { id: 'opt_C', label: 'C', text: 'given' },
      { id: 'opt_D', label: 'D', text: 'done' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. caused',
    correctExplanation: 'Collocation chuẩn: "cause damage to something" (gây thiệt hại cho cái gì). Hoặc dùng "inflict damage".',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. made',
      diagnosticTitle: 'Nhầm lẫn Make vs Cause (Làm hỏng = Make damage)',
      explanation: 'Tuyệt đối không dùng "make damage". Khi nói về sự tàn phá, hủy hoại, tiếng Anh chuẩn luôn dùng "cause damage" hoặc "do damage". Ở đây "cause irreparable damage" là cách diễn đạt phổ biến nhất.',
    },
  },
  {
    id: 'q_colloc_18',
    roundIndex: 17,
    prompt: 'The new emission regulations will ______ into effect on the first of January.',
    options: [
      { id: 'opt_A', label: 'A', text: 'come' },
      { id: 'opt_B', label: 'B', text: 'go' },
      { id: 'opt_C', label: 'C', text: 'bring' },
      { id: 'opt_D', label: 'D', text: 'put' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. come',
    correctExplanation: 'Collocation pháp lý và chính sách: "come into effect" (bắt đầu có hiệu lực). Lưu ý cấu trúc chủ động: "bring something into effect".',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. go',
      diagnosticTitle: 'Nhầm lẫn với "go into operation"',
      explanation: 'Quy định/luật lệ tự thân có hiệu lực luôn dùng "come into effect", không dùng "go into effect" trong văn phong học thuật chuẩn mực.',
    },
  },
  {
    id: 'q_colloc_19',
    roundIndex: 18,
    prompt: 'Working professionals often find it demanding to ______ the competing priorities of career and self-care.',
    options: [
      { id: 'opt_A', label: 'A', text: 'juggle' },
      { id: 'opt_B', label: 'B', text: 'struggle' },
      { id: 'opt_C', label: 'C', text: 'shuttle' },
      { id: 'opt_D', label: 'D', text: 'stumble' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. juggle',
    correctExplanation: 'Ẩn dụ C1-C2: "juggle priorities / demands" (tung hứng, xoay xở nhiều việc cùng một lúc một cách khéo léo).',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. struggle',
      diagnosticTitle: 'Nhầm lẫn ngữ pháp (Struggle with vs Juggle something)',
      explanation: '"Struggle" là nội động từ cần giới từ "with" (struggle with priorities). Ở đây không có "with" mà có tân ngữ trực tiếp, do đó phải dùng ngoại động từ "juggle".',
    },
  },
  {
    id: 'q_colloc_20',
    roundIndex: 19,
    prompt: 'Empirical studies have struggled to ______ a direct causal link between social media and anxiety.',
    options: [
      { id: 'opt_A', label: 'A', text: 'establish' },
      { id: 'opt_B', label: 'B', text: 'build' },
      { id: 'opt_C', label: 'C', text: 'settle' },
      { id: 'opt_D', label: 'D', text: 'construct' },
    ],
    correctOptionId: 'opt_A',
    correctAnswerText: 'A. establish',
    correctExplanation: 'Collocation nghiên cứu đỉnh cao (Band 8.0+): "establish a link / connection / relationship" (chứng minh, thiết lập mối quan hệ nhân quả).',
    misconception: {
      baitOptionId: 'opt_B',
      baitOptionText: 'B. build',
      diagnosticTitle: 'Dịch nghĩa đen "Xây dựng mối liên hệ"',
      explanation: '"Build a relationship" dùng cho mối quan hệ tình cảm/giao tiếp giữa người với người. Trong nghiên cứu học thuật về dữ liệu, ta dùng "establish a link".',
    },
  },
];

export const ARENA_COLLOCATION_QUESTIONS: ArenaQuestion[] = RAW_ARENA_COLLOCATION_QUESTIONS.map((q, idx) =>
  shuffleQuestionOptions({ ...q, roundIndex: idx }, `client_init_${q.id}`)
);

