import { MasteryTopicUnit } from '../types/mastery.types';

/**
 * Validated C1/C2 Academic Unit: Causative & Experiential Have/Get
 *
 * Linguistic Verification:
 * 1. Have someone DO sth: Authoritative/professional delegation or instruction.
 * 2. Get someone TO DO sth: Inducement, negotiation, persuasion or achieving compliance.
 * 3. Have/Get sth DONE: Focus on completed service; 'get' is more informal/conversational.
 * 4. Have sth DONE (Experiential/Adversity): Undergoing an external event or misfortune without agency.
 */
export const CAUSATIVE_HAVE_GET_UNIT: MasteryTopicUnit = {
  id: 'unit-c1-causative-01',
  code: 'CAUS-01',
  title: 'Causative & Experiential Have / Get',
  subtitleVi: 'Phân định Sắc thái Ủy quyền, Thuyết phục & Trải nghiệm Bất khả kháng',
  level: 'C1',
  curriculumCategory: 'Causative Structures',

  contrastivePairs: [
    {
      id: 'cp-01',
      axisTitle: 'TRỤC 1: UỶ QUYỀN CHUYÊN MÔN vs. THUYẾT PHỤC ĐÀM PHÁN',
      formulaA: 'HAVE + người + V (nguyên mẫu không "to")',
      formulaB: 'GET + người + TO V (nguyên mẫu có "to")',
      sentenceA: {
        rawText: 'The operations director had the legal team draft the revised merger contract.',
        prefix: 'The operations director',
        verbTrigger: 'had',
        agentOrObject: 'the legal team',
        verbAction: 'draft',
        suffix: 'the revised merger contract.',
        roleTag: 'CÂU A · GIAO VIỆC CHỨC TRÁCH',
        nuanceVi: 'Uỷ quyền chuyên môn: Đội ngũ pháp chế làm theo chỉ đạo phân công công việc.',
      },
      sentenceB: {
        rawText: 'The operations director got the commercial landlord to reduce the office rental fee.',
        prefix: 'The operations director',
        verbTrigger: 'got',
        agentOrObject: 'the commercial landlord',
        verbAction: 'to reduce',
        suffix: 'the office rental fee.',
        roleTag: 'CÂU B · THUYẾT PHỤC THƯƠNG THẢO',
        nuanceVi: 'Thuyết phục qua đàm phán: Chủ mặt bằng độc lập, ban đầu không có nghĩa vụ giảm giá.',
      },
      checkQuestion: {
        promptVi: 'Quan sát cụm từ được tô màu ở trên: Sự khác biệt cú pháp cốt lõi giữa HAVE và GET khi giao việc là gì?',
        options: [
          {
            id: 'opt-a',
            labelVi: 'GET đòi hỏi "to + động từ" (to reduce), trong khi HAVE đi với động từ nguyên mẫu không "to" (draft).',
            isCorrect: true,
            rationaleVi: 'Chính xác! Cú pháp: HAVE someone DO something vs. GET someone TO DO something.',
          },
          {
            id: 'opt-b',
            labelVi: 'Cả hai đều dùng động từ nguyên mẫu không "to", chỉ khác nhau về thì của câu.',
            isCorrect: false,
            rationaleVi: 'Sai cú pháp: GET ở thể chủ động bắt buộc phải có "to" đi kèm (to reduce).',
          },
        ],
      },
      takeawayFormulaVi: 'ĐÚC KẾT: S + have + người + V (bare inf)  |  S + get + người + to V',
    },
    {
      id: 'cp-02',
      axisTitle: 'TRỤC 2: CHỦ ĐỘNG ĐẶT DỊCH VỤ vs. SỰ CỐ BẤT KHẢ KHÁNG NGOÀI Ý MUỐN',
      formulaA: 'HAVE + vật + V3/ed (Chủ thể chủ động thuê làm)',
      formulaB: 'HAVE + vật + V3/ed (Chủ thể là nạn nhân chịu sự cố)',
      sentenceA: {
        rawText: 'The enterprise had its cloud infrastructure audited by an independent cybersecurity firm.',
        prefix: 'The enterprise',
        verbTrigger: 'had',
        agentOrObject: 'its cloud infrastructure',
        verbAction: 'audited',
        suffix: 'by an independent cybersecurity firm.',
        roleTag: 'CÂU A · THUÊ DỊCH VỤ CHỦ ĐỘNG',
        nuanceVi: 'Dịch vụ: Doanh nghiệp tự liên hệ và chi trả để đối tác kiểm toán an ninh.',
      },
      sentenceB: {
        rawText: 'The enterprise had its proprietary customer records leaked onto a public forum.',
        prefix: 'The enterprise',
        verbTrigger: 'had',
        agentOrObject: 'its proprietary customer records',
        verbAction: 'leaked',
        suffix: 'onto a public forum.',
        roleTag: 'CÂU B · TAI HỌA BẤT KHẢ KHÁNG',
        nuanceVi: 'Sự cố ngoài ý muốn: Dữ liệu bị rò rỉ là tổn thất, doanh nghiệp không hề ra lệnh cho việc này.',
      },
      checkQuestion: {
        promptVi: 'Ở câu B, tại sao dùng "had its customer records leaked" dù doanh nghiệp không thuê ai rò rỉ dữ liệu?',
        options: [
          {
            id: 'opt-a',
            labelVi: 'Cấu trúc "HAVE + vật + V3" còn dùng để diễn tả trải nghiệm tai họa/rủi ro ập đến với chủ thể (Experiential Passive).',
            isCorrect: true,
            rationaleVi: 'Chính xác! Khi chủ thể gặp rủi ro ngoài ý muốn, tiếng Anh C1/C2 dùng "have something done" để diễn đạt trải nghiệm bất lợi.',
          },
          {
            id: 'opt-b',
            labelVi: 'Vì doanh nghiệp đã chi tiền uỷ quyền diễn đàn mạng công khai hồ sơ.',
            isCorrect: false,
            rationaleVi: 'Hoàn toàn sai logic. Đây là vụ việc bảo mật bất khả kháng, không phải dịch vụ chi trả.',
          },
        ],
      },
      takeawayFormulaVi: 'ĐÚC KẾT: "S + have + sth + V3" vừa dùng cho dịch vụ đặt trước, vừa dùng cho tai nạn/rủi ro ngoài ý muốn (Experiential Adversity).',
    },
  ],

  diagnosticItems: [
    {
      id: 'diag-01',
      sentencePrompt: 'After a two-hour presentation, the research lead finally got the academic panel _____ the grant proposal.',
      options: [
        { id: 'd1-a', text: 'to approve', isCorrect: true },
        { id: 'd1-b', text: 'approve', isCorrect: false },
        { id: 'd1-c', text: 'approved', isCorrect: false },
      ],
      explanationVi: 'Quy tắc cú pháp C1: Động từ GET ở thể chủ động (khiến/thuyết phục ai làm gì) bắt buộc đi với "to-infinitive": get + person + TO do sth.',
    },
    {
      id: 'diag-02',
      sentencePrompt: 'During the international summit, the foreign diplomat had her private briefing notes _____ from her hotel suite.',
      options: [
        { id: 'd2-a', text: 'stolen', isCorrect: true },
        { id: 'd2-b', text: 'steal', isCorrect: false },
        { id: 'd2-c', text: 'to steal', isCorrect: false },
      ],
      explanationVi: 'Cấu trúc Experiential Passive: "had + sth + past participle" miêu tả tai nạn/sự cố bị mất cắp xảy ra với chủ thể.',
      whyProbe: {
        questionVi: 'Về mặt ngữ nghĩa, nhà ngoại giao trong câu trên có chủ ý yêu cầu người khác lấy tài liệu không?',
        options: [
          {
            id: 'why-a',
            labelVi: 'Không, đây là tai nạn ngoài ý muốn mà bà ấy phải gánh chịu.',
            isCorrect: true,
            feedbackVi: 'Chính xác! Đây là cấu trúc bị động chỉ trải nghiệm (Experiential / Adversity Causative).',
          },
          {
            id: 'why-b',
            labelVi: 'Có, bà ấy đã thuê ai đó đánh cắp tài liệu của chính mình.',
            isCorrect: false,
            feedbackVi: 'Không đúng. Ngữ cảnh summit và diplomat cho thấy đây là vụ xâm nhập trộm cắp bất ngờ.',
          },
        ],
      },
    },
    {
      id: 'diag-03',
      sentencePrompt: 'In executive business correspondence, writers avoid conversational phrases like "we got our tax returns verified" and prefer "we _____".',
      options: [
        { id: 'd3-a', text: 'had our tax returns verified', isCorrect: true },
        { id: 'd3-b', text: 'got to verify our tax returns', isCorrect: false },
        { id: 'd3-c', text: 'had verified our tax returns by someone', isCorrect: false },
      ],
      explanationVi: 'Về văn phong (Register): Trong giao tiếp thương mại và hành chính trang trọng (executive correspondence), cấu trúc "have something done" là chuẩn mực trung tính, tránh dùng "get something done" vốn mang sắc thái thân mật và khẩu ngữ.',
    },
  ],

  transformationItems: [
    {
      id: 'trans-01',
      title: 'Đàm phán thuyết phục chuyên gia',
      sourceSentence: 'We persuaded an external auditor to inspect our balance sheets before the deadline.',
      targetPrefix: 'We finally',
      targetSuffix: 'our balance sheets before the deadline.',
      keyword: 'GOT',
      minWords: 5,
      maxWords: 6,
      acceptedAnswers: [
        'got an external auditor to inspect',
      ],
      nearMissRules: [
        {
          pattern: /\bgot\s+an\s+external\s+auditor\s+inspect\b/i,
          feedbackVi: 'Thiếu "to". Sau cấu trúc chủ động "GET + tân ngữ người", động từ bắt buộc phải ở dạng "to-infinitive" (to inspect).',
          diagnosticCode: 'MISSING_TO',
        },
        {
          pattern: /\bhad\s+an\s+external\s+auditor\b/i,
          feedbackVi: 'Vi phạm quy tắc: Đề bài yêu cầu giữ nguyên từ khóa in hoa "GOT", không được tự ý đổi thành HAD.',
          diagnosticCode: 'KEYWORD_MUTATED',
        },
      ],
      explanationVi: 'Paraphrase từ "persuaded sb to do" sang cấu trúc C1: got + an external auditor + to inspect.',
      pedagogicalNote: 'Cambridge Use of English Part 4 chuẩn: Đảm bảo đếm đúng 5 từ và giữ nguyên từ khóa GOT.',
      structuralBlueprint: 'GOT + [Tân ngữ người: an external auditor] + TO inspect',
      hintText: 'Cấu trúc GET chủ động: Điền từ khóa "got" + tân ngữ người được thuyết phục (an external auditor) + động từ dạng "to-V" (to inspect).',
    },
    {
      id: 'trans-02',
      title: 'Trải nghiệm tổn hại ngoài ý muốn',
      sourceSentence: 'The airline suffered severe damage to its commercial reputation during the safety scandal.',
      targetPrefix: 'The airline',
      targetSuffix: 'severely damaged during the safety scandal.',
      keyword: 'HAD',
      minWords: 3,
      maxWords: 4,
      acceptedAnswers: [
        'had its commercial reputation',
        'had its reputation',
      ],
      nearMissRules: [
        {
          // Intercepts learner trying to reuse the source verb "suffered"
          pattern: /\bhad\s+suffered\b/i,
          feedbackVi: 'Nhận diện sai cấu trúc! Chữ "severely damaged" (V3/ed) đã có sẵn phía sau ô trống rồi. Với công thức Experiential Causative "HAD + [Thứ bị thiệt hại] + V3", bạn không dùng lại động từ "suffered" nữa, mà cần điền danh từ chỉ thứ bị tổn hại của hãng hàng không (its commercial reputation).',
          diagnosticCode: 'REPEATED_SOURCE_VERB',
        },
        {
          pattern: /\bhad\s+damaged\s+its\b/i,
          feedbackVi: 'Sai cấu trúc ngữ nghĩa! "had damaged" biến hãng hàng không thành kẻ chủ mưu tự phá hoại danh tiếng, thay vì là bên chịu thiệt hại.',
          diagnosticCode: 'WRONG_PARTICIPLE',
        },
        {
          pattern: /\bgot\s+its\s+(commercial\s+)?reputation\b/i,
          feedbackVi: 'Vi phạm quy tắc: Bắt buộc dùng từ khóa in hoa "HAD" được cho trong đề bài.',
          diagnosticCode: 'KEYWORD_MUTATED',
        },
      ],
      explanationVi: 'Cấu trúc Experiential Adversity: "had + its (commercial) reputation + severely damaged" diễn tả thiệt hại mà chủ thể phải gánh chịu.',
      structuralBlueprint: 'HAD + [Thứ bị tổn hại: its (commercial) reputation] + severely damaged (V3 đã có sẵn)',
      hintText: 'Quan sát: Cụm "severe damage" (danh từ) ở câu gốc đã được đổi thành "severely damaged" (V3) nằm sẵn ở sau ô trống! Bạn chỉ cần điền: HAD + [danh từ chỉ thứ bị tổn hại: its commercial reputation].',
    },
    {
      id: 'trans-03',
      title: 'Kế hoạch bảo trì trang thiết bị',
      sourceSentence: 'An authorized contractor is going to calibrate the laboratory sensors next Monday.',
      targetPrefix: 'We are',
      targetSuffix: 'by an authorized contractor next Monday.',
      keyword: 'HAVING',
      minWords: 5,
      maxWords: 5,
      acceptedAnswers: [
        'having the laboratory sensors calibrated',
      ],
      nearMissRules: [
        {
          pattern: /\bhaving\s+the\s+laboratory\s+sensors\s+calibrate\b/i,
          feedbackVi: 'Sai dạng thức động từ. Trong cấu trúc "have sth done", động từ sau vật phải ở dạng quá khứ phân từ (calibrated), không dùng nguyên mẫu (calibrate).',
          diagnosticCode: 'WRONG_PARTICIPLE',
        },
        {
          pattern: /\bgetting\s+the\s+laboratory\s+sensors\b/i,
          feedbackVi: 'Vi phạm quy tắc: Đề bài yêu cầu sử dụng từ khóa in hoa "HAVING".',
          diagnosticCode: 'KEYWORD_MUTATED',
        },
      ],
      explanationVi: 'Biến đổi thì tương lai kế hoạch với bị động sai khiến: We are + having the laboratory sensors calibrated + by an authorized contractor.',
      structuralBlueprint: 'HAVING + [Vật được bảo trì: the laboratory sensors] + calibrated (V3)',
      hintText: 'Cấu trúc HAVE bị động (đặt dịch vụ): Điền từ khóa "having" + danh từ chỉ thiết bị (the laboratory sensors) + quá khứ phân từ V3 (calibrated).',
    },
  ],
};
